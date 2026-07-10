# RANTAI Communities — Landing Page

Landing page resmi untuk **RANTAI Communities**, komunitas open innovation Web3 Indonesia yang berfokus pada smart contract, IoT, token economy, dan adopsi teknologi desentralisasi di Nusantara.

🌐 **Live:** [rantai.elpeef.com](https://rantai.elpeef.com)

---

## Stack

| Layer | Teknologi |
|---|---|
| Frontend | React 19 + Vite 7, TypeScript, Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion |
| Wallet | wagmi v2 + RainbowKit + viem |
| Auth | Sign-In with Ethereum (SIWE) |
| Backend | Express 5, express-session |
| API Contract | Zod schemas + Orval codegen (typed hooks) |
| Monorepo | pnpm workspaces |

---

## Struktur Monorepo

```
/
├── artifacts/
│   ├── rantai-landing/     # Frontend React + Vite
│   └── api-server/         # Express API server
├── lib/
│   ├── api-client-react/   # Generated typed hooks (Orval)
│   └── api-zod/            # Zod schemas (shared contract)
└── README.md
```

---

## Fitur

### Landing Page
- **Hero** — tagline, dua CTA button (Explore Ecosystem → showcase.elpeef.com, Join the Network → GitHub)
- **Ecosystem Pillars** — 4 pilar: Smart Contracts, Token Economy, IoT Integration, Open Innovation
- **Active Initiatives** — 8 produk komunitas (EXPLODA, BUSI, MODEL PREDI, ETHIKA, Nexus, Diva, Learn3, BlockPedia) dengan status badge (live / beta / dev)
- **About / ELPEEF** — latar belakang gerakan dan link ke elpeef.com
- **Manifesto Modal** — 6 bagian manifesto, dibuka via tombol "Read the Manifesto"
- **Footer** — link website, email, GitHub

### Wallet Auth (SIWE)
- Connect wallet via MetaMask / WalletConnect (RainbowKit)
- Sign-In with Ethereum: nonce CSPRNG → sign message → verify di backend → session cookie
- Nonce one-time use, TTL 5 menit
- Session 7 hari (in-memory, server-side)
- Logout otomatis clear session + disconnect wallet

### Member Panel
- Slide-in panel dari kanan setelah login
- Menampilkan: avatar gradient, ENS name, role badge, address + copy, network, Etherscan link
- Role khusus: `0x17A1e4875...` → **RANTAI Lead** (amber / Crown icon)
- Default: RANTAI Member (cyan / Shield icon)
- Accessible: Escape to close, focus trap, focus restore

---

## Catatan Teknis

- **RPC:** Menggunakan Cloudflare public Ethereum RPC (`https://cloudflare-eth.com`) karena wagmi default (`eth.merkle.io`) block CORS dari browser
- **Session cookie:** `SameSite=None; Secure` di production untuk mendukung cross-origin (kalau frontend dan API beda domain)
- **SIWE cache fix:** Setelah verify berhasil, data session langsung ditulis ke React Query cache via `setQueryData` — tidak bergantung pada GET `/session` round-trip yang rawan 304 browser cache
- **WalletConnect projectId:** Saat ini pakai placeholder — mobile wallet tidak akan bekerja sampai projectId asli dari [cloud.walletconnect.com](https://cloud.walletconnect.com) diset di `artifacts/rantai-landing/src/App.tsx`
- **Sessions:** In-memory — restart server akan clear semua session aktif. Untuk production jangka panjang, pertimbangkan Redis atau database session store

---

## Links

| | |
|---|---|
| 🌐 Website | [elpeef.com](https://elpeef.com) |
| 🐙 GitHub | [github.com/RANTAI-com](https://github.com/RANTAI-com) |
| 🐙 GitHub (maintainer) | [github.com/mrbrightsides](https://github.com/mrbrightsides) |
| 🔭 Showcase | [showcase.elpeef.com](https://showcase.elpeef.com) |
| ✉️ Email | [community@rantai.elpeef.com](mailto:community@rantai.elpeef.com) |
| 💬 Telegram | [@khudriakhmad](https://t.me/khudriakhmad) |
| 🎮 Discord | [khudri_61362](https://discord.com/channels/@khudri_61362) |

---

*RANTAI Communities — Indonesia's Open Innovation Movement. Building the Decentralized Future Together.*
