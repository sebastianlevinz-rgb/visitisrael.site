# Developer Prerequisites

This document captures the local-machine + cloud-service prerequisites needed
to build and verify the Discover Israel site end-to-end.

## Local Tooling

| Tool | Minimum | Notes |
|------|---------|-------|
| Node.js | **20.x** | Phase 1 verified on Node 24.11.1 (LTS-equivalent); 20.x LTS is the floor |
| pnpm | **9.x** | Phase 1 verified on pnpm 10.33.2; `corepack enable` or `npm i -g pnpm` |
| Git | 2.40+ | for Husky v9 (`prepare` script wires the hooks) |
| Python | **3.9+** | for `audit_a11y.py` from `israeli-accessibility-compliance` skill (plan 10) |
| Vercel CLI | latest | `npm i -g vercel` for preview deploys + env sync |
| GitHub CLI | optional | useful for PR review during multi-region waves |

## Hooks (Husky v9)

The `prepare` script in `package.json` runs on `pnpm install` and ensures
`.husky/` hooks are installed. If hooks stop firing, run `pnpm exec husky init`.

## Cloud Services

### Analytics — Plausible (default)

- **Decision:** Plausible is locked as the analytics provider (FND-08).
  - **Why:** privacy-first, cookie-less, EU-compliant (avoids cookie-banner UX cost and analytics-blocking by privacy plugins).
  - **Where:** `app/[locale]/layout.tsx` wraps children in `<PlausibleProvider domain={NEXT_PUBLIC_PLAUSIBLE_DOMAIN}>`.
  - **Account setup:** create a Plausible site at `plausible.io/sites/new`; copy the domain (e.g., `visitisrael.site`) into `.env.local` and Vercel env.
- **Fallback:** PostHog — if product-analytics needs surface during Phase 1 (funnel analysis, session recording).
  - Swap is a single env-var + provider-import change in `app/[locale]/layout.tsx`.
  - Re-decide in Phase 6 if user research needs richer behavioral data.

### Deploy — Vercel

- Repository → Vercel project link (Hobby plan ok through Phase 5; Pro from Phase 6 if Deployment Protection or higher build minutes are needed).
- Set the 11 affiliate AID env vars + `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` + `ADMIN_USER` / `ADMIN_PASS` in Vercel dashboard once values are known.

### Affiliate accounts (deferred to plan 06)

- Booking.com Partner Hub, Civitatis, Viator, GetYourGuide, Rentalcars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars — apply during plan 06 execution.
- Klook and GoCity are stubs (Conflict D) — no signup needed.
- Travelpayouts aggregator account — fallback for traffic-minimum partners (Skyscanner 5K visitors/mo minimum).

## Verification

After cloning and `pnpm install`:

```bash
pnpm typecheck      # exits 0
pnpm lint           # exits 0 on clean source
pnpm test --run     # 12 tests pass (i18n-config + Velite schema)
pnpm build          # exits 0; .next/server/app/he.html + en.html present
```

A test commit that introduces a raw hex value or hard-coded partner URL must
fail the pre-commit hook (lint-staged → ESLint).
