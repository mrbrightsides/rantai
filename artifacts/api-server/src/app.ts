import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

declare module "express-session" {
  interface SessionData {
    address?: string;
    chainId?: number;
  }
}

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET environment variable is required");
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

// Build an explicit allowlist from the environment.
// In dev: allow localhost and the Replit preview domain.
// In production: allow domains from REPLIT_DOMAINS env var.
function getAllowedOrigins(): string[] {
  const origins: string[] = [];
  // Replit domains (comma-separated in production)
  const replitDomains = process.env.REPLIT_DOMAINS;
  if (replitDomains) {
    for (const d of replitDomains.split(",")) {
      const domain = d.trim();
      if (domain) {
        origins.push(`https://${domain}`);
      }
    }
  }
  // Replit dev domain (preview proxy in development)
  const devDomain = process.env.REPLIT_DEV_DOMAIN;
  if (devDomain) {
    origins.push(`https://${devDomain}`);
  }
  // Fallback for local development without Replit env vars
  if (origins.length === 0) {
    origins.push("http://localhost", "http://127.0.0.1");
  }
  return origins;
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin requests (no Origin header) and requests from
      // explicitly allowed origins.
      if (!origin) {
        callback(null, true);
        return;
      }
      const allowed = getAllowedOrigins();
      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
