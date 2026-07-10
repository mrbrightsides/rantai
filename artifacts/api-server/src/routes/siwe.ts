import { Router, type IRouter } from "express";
import { randomBytes } from "crypto";
import { SiweMessage } from "siwe";
import {
  GetSiweNonceResponse,
  VerifySiweSignatureBody,
  VerifySiweSignatureResponse,
  GetSiweSessionResponse,
  SiweLogoutResponse,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Simple in-memory nonce store (nonce → expiry timestamp)
const nonceStore = new Map<string, number>();
const NONCE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function generateNonce(): string {
  // CSPRNG — crypto.randomBytes is cryptographically secure
  return randomBytes(24).toString("hex");
}

function pruneExpiredNonces(): void {
  const now = Date.now();
  for (const [nonce, expiry] of nonceStore.entries()) {
    if (now > expiry) nonceStore.delete(nonce);
  }
}

// GET /siwe/nonce
router.get("/siwe/nonce", async (req, res): Promise<void> => {
  pruneExpiredNonces();
  const nonce = generateNonce();
  nonceStore.set(nonce, Date.now() + NONCE_TTL_MS);
  req.log.info({ nonce }, "Generated SIWE nonce");
  res.json(GetSiweNonceResponse.parse({ nonce }));
});

// POST /siwe/verify
router.post("/siwe/verify", async (req, res): Promise<void> => {
  const parsed = VerifySiweSignatureBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { message, signature } = parsed.data;

  let siweMessage: SiweMessage;
  try {
    siweMessage = new SiweMessage(message);
  } catch {
    res.status(400).json({ error: "Invalid SIWE message format" });
    return;
  }

  // Check nonce exists and is not expired
  const nonceExpiry = nonceStore.get(siweMessage.nonce);
  if (!nonceExpiry || Date.now() > nonceExpiry) {
    res.status(401).json({ error: "Invalid or expired nonce" });
    return;
  }

  // Enforce expected domain constraints server-side
  const expectedDomain = process.env.REPLIT_DEV_DOMAIN ?? process.env.REPLIT_DOMAINS?.split(",")[0]?.trim() ?? req.hostname;
  if (siweMessage.domain !== expectedDomain && siweMessage.domain !== req.hostname) {
    req.log.warn({ domain: siweMessage.domain, expected: expectedDomain }, "SIWE domain mismatch");
    res.status(401).json({ error: "Domain mismatch in SIWE message" });
    return;
  }

  try {
    const result = await siweMessage.verify({ signature, domain: siweMessage.domain, nonce: siweMessage.nonce });
    if (!result.success) {
      res.status(401).json({ error: "Signature verification failed" });
      return;
    }

    // Consume nonce (one-time use)
    nonceStore.delete(siweMessage.nonce);

    // Store in session
    req.session.address = siweMessage.address;
    req.session.chainId = siweMessage.chainId;

    req.log.info({ address: siweMessage.address }, "SIWE verification successful");

    res.json(
      VerifySiweSignatureResponse.parse({
        address: siweMessage.address,
        chainId: siweMessage.chainId,
      })
    );
  } catch (err) {
    req.log.error({ err }, "SIWE verification error");
    res.status(401).json({ error: "Signature verification failed" });
  }
});

// GET /siwe/session
router.get("/siwe/session", async (req, res): Promise<void> => {
  const address = req.session.address ?? null;
  const chainId = req.session.chainId ?? null;
  res.json(GetSiweSessionResponse.parse({ address, chainId }));
});

// POST /siwe/logout
router.post("/siwe/logout", async (req, res): Promise<void> => {
  req.session.destroy((err) => {
    if (err) {
      logger.error({ err }, "Failed to destroy session");
    }
  });
  res.json(SiweLogoutResponse.parse({ ok: true }));
});

export default router;
