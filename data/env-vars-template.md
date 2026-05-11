# Production Environment Variables Template — visitisrael.site

**Status:** USER-INPUT-GATED — do NOT auto-execute. This is a template/reference doc; every value below is a `<placeholder>` or format spec. NO real secrets are committed to git.

**Purpose:** Companion to `data/pre-deploy-checklist.md`. Enumerates every required production environment variable with format spec + where-to-obtain pointer.

**Where to set:** Vercel Project Settings → Environment Variables → Production scope. Each var is added once, then propagates to every production deploy.

**Two-tier scoping:**

- `NEXT_PUBLIC_*` vars are inlined into the client JavaScript bundle at build time. Visible to any visitor via "view source". NEVER put secret tokens here. ONLY put values that are already public (a domain name, an affiliate ID, an IndexNow key designed for public exposure).
- Server-only vars (no `NEXT_PUBLIC_` prefix) are only accessible from server-side code (RSC, route handlers, middleware). Safe for tokens, passphrases, API keys.

**Source of truth:** `.env.example` in the repo root mirrors this list with empty values. Keep both in sync when adding new vars.

---

## Public — NEXT*PUBLIC*\* (client-visible)

### NEXT_PUBLIC_PLAUSIBLE_DOMAIN

- **Required:** yes
- **Format:** bare domain (no scheme, no trailing slash) — e.g., `visitisrael.site`
- **Where to obtain:** the canonical domain you registered with Plausible at https://plausible.io (Step 7 of `data/pre-deploy-checklist.md`)
- **Without it:** Plausible `<script>` tag in `app/[locale]/layout.tsx` does not render; no analytics collected. Site otherwise functions normally.
- **Read by:** `app/[locale]/layout.tsx` line ~57.

### NEXT_PUBLIC_BOOKING_AID

- **Required:** no (graceful degrade)
- **Format:** numeric string, typically 7–10 digits (e.g., `<aid-from-booking-affiliate-dashboard>`)
- **Where to obtain:** Booking.com Affiliate Partner Hub → Account → AID. Apply at https://www.booking.com/affiliate-program/v2/index.html or via CJ Affiliate (Middle East region).
- **Without it:** `bookingLink()` returns the public `booking.com` URL (no `aid` query param). Product remains functional, commission tracking disabled.
- **Phase 1.6 helper:** `lib/affiliate/booking.ts` — `bookingLink({ destination, checkin, checkout, label })`.

### NEXT_PUBLIC_CIVITATIS_AID

- **Required:** no (graceful degrade)
- **Format:** alphanumeric partner code (e.g., `<aid-from-civitatis-affiliate>`)
- **Where to obtain:** Civitatis Partners dashboard at https://www.civitatis.com/en/partners/. EUR-denominated payouts.
- **Without it:** `civitatisLink()` returns the public URL without `aid` param.
- **Phase 1.6 helper:** `lib/affiliate/civitatis.ts` — `civitatisLink({ citySlug, productSlug })`.

### NEXT_PUBLIC_VIATOR_PID

- **Required:** no (graceful degrade)
- **Format:** 5–7 digit number (e.g., `<pid-from-viator-partner>`)
- **Where to obtain:** Viator Partner Resources at https://partnerresources.viator.com/ (auto-join if you have a Tripadvisor account).
- **Without it:** `viatorLink()` returns the public Viator URL without `pid`. Commission disabled but page renders.
- **Phase 1.6 helper:** `lib/affiliate/viator.ts` — `viatorLink({ destinationId, productCode })`.

### NEXT_PUBLIC_VIATOR_MCID

- **Required:** no (optional campaign tracking)
- **Format:** alphanumeric campaign ID (e.g., `<mcid-from-viator-partner>`)
- **Where to obtain:** same Viator Partner dashboard; MCID is per-campaign granularity.
- **Without it:** Viator link still tracks via PID (just no per-campaign attribution).
- **Phase 1.6 helper:** consumed by `lib/affiliate/viator.ts` alongside PID.

### NEXT_PUBLIC_GYG_PARTNER_ID

- **Required:** no (graceful degrade)
- **Format:** alphanumeric partner_id (e.g., `<partner-id-from-getyourguide>`)
- **Where to obtain:** GetYourGuide Partner Portal at https://partner.getyourguide.com/ or via Awin (merchant 18925).
- **Without it:** `getYourGuideLink()` returns public URL without `partner_id`. 8% minimum commission lost on each click.
- **Phase 1.6 helper:** `lib/affiliate/getYourGuide.ts` — `getYourGuideLink({ locationId, productId })`.

### NEXT_PUBLIC_RENTALCARS_AID

- **Required:** no (graceful degrade)
- **Format:** alphanumeric affiliate code (e.g., `<aid-from-rentalcars-affiliate>`)
- **Where to obtain:** Awin merchant program or CJ Affiliate (Booking.com is consolidating Rentalcars under unified Awin distribution).
- **Without it:** `rentalcarsLink()` returns public URL. 6% commission disabled.
- **Phase 1.6 helper:** `lib/affiliate/rentalcars.ts` — `rentalcarsLink({ pickupLocation, dropoffLocation, pickupDate, dropoffDate })`.

### NEXT_PUBLIC_SAFETYWING_REF

- **Required:** no (graceful degrade)
- **Format:** alphanumeric referral ID (e.g., `<ref-from-safetywing-affiliate>`)
- **Where to obtain:** SafetyWing Ambassador or Impact program at https://safetywing.com/affiliates.
- **Without it:** `safetyWingLink()` returns public Nomad Insurance URL without `referenceID`.
- **Phase 1.6 helper:** `lib/affiliate/safetyWing.ts` — `safetyWingLink({ product })`.

### NEXT_PUBLIC_SKYSCANNER_AID

- **Required:** no (graceful degrade; **GATED on 5K visitors/month**)
- **Format:** alphanumeric Impact associate ID (e.g., `<aid-from-skyscanner-partner>`)
- **Where to obtain:** Skyscanner Partner Programme via Impact Radius at https://www.partners.skyscanner.net/product/affiliates. **Threshold: 5,000 monthly visitors required to apply** (per Phase 1.4 lesson). Apply only post-launch when analytics confirm threshold. Until then, use Travelpayouts aggregator (below) as the AFF-08 fallback.
- **Without it:** `skyscannerLink()` returns public Skyscanner URL. No commission until application approved.
- **Phase 1.6 helper:** `lib/affiliate/skyscanner.ts` — `skyscannerLink({ origin, destination, departDate, returnDate })`.

### NEXT_PUBLIC_HOSTELWORLD_AID

- **Required:** no (graceful degrade)
- **Format:** alphanumeric affiliate ID (e.g., `<aid-from-hostelworld-partner>`)
- **Where to obtain:** Partnerize at https://signup.partnerize.com/signup/en/hostelworld OR CJ Affiliate (regional).
- **Without it:** `hostelworldLink()` returns public URL. 18–22% commission disabled (highest in the matrix).
- **Phase 1.6 helper:** `lib/affiliate/hostelworld.ts` — `hostelworldLink({ city, dateFrom, dateTo })`.

### NEXT_PUBLIC_DISCOVERCARS_AID

- **Required:** no (graceful degrade)
- **Format:** alphanumeric partner ID (e.g., `<aid-from-discovercars-affiliate>`)
- **Where to obtain:** DiscoverCars affiliate program at https://www.discovercars.com/affiliate. **365-day cookie window** (longest in matrix); ~$20–50 per sale.
- **Without it:** `discoverCarsLink()` returns public URL without `a_aid` param.
- **Phase 1.6 helper:** `lib/affiliate/discoverCars.ts` — `discoverCarsLink({ citySlug })`.

### NEXT_PUBLIC_TRAVELPAYOUTS_MARKER

- **Required:** no (AFF-08 aggregator fallback per CONFLICT-D resolution)
- **Format:** alphanumeric marker (e.g., `<marker-from-travelpayouts-affiliate>`)
- **Where to obtain:** Travelpayouts dashboard at https://www.travelpayouts.com/. Aggregates Booking, GetYourGuide, Viator, Hostelworld, DiscoverCars under one contract — useful for pre-traffic phase before individual partners approve (no traffic minimums).
- **Without it:** aggregator links not wired; rely on direct partner helpers above.
- **Phase 1.6 reference:** `data/affiliate-availability.json` entry `travelpayouts.state = pending`.

### NEXT_PUBLIC_KLOOK_AID (STUB — Conflict D)

- **Required:** no (DO NOT populate for v1)
- **Format:** N/A — helper throws `NoIsraelInventoryError` regardless of var presence
- **Where to obtain:** N/A — Klook has thin Israel SKU (<10 tours as of May 2026). Re-evaluate quarterly per `data/affiliate-availability.json`.
- **Without it:** `klookLink()` throws documented error; `<AffiliateCard partner="klook">` renders null via two-layer availability gate.
- **Phase 1.6 helper:** `lib/affiliate/klook.ts` (stub).

### NEXT_PUBLIC_GOCITY_AID (STUB — Conflict D)

- **Required:** no (DO NOT populate for v1)
- **Format:** N/A — helper throws `NoIsraelInventoryError` regardless of var presence
- **Where to obtain:** N/A — GoCity has no active Israel destination card as of May 2026. Re-evaluate quarterly.
- **Without it:** `goCityLink()` throws documented error; `<AffiliateCard partner="goCity">` renders null.
- **Phase 1.6 helper:** `lib/affiliate/goCity.ts` (stub).

---

## Private (server-only — no NEXT*PUBLIC* prefix)

### ADMIN_USER

- **Required:** yes
- **Format:** strong username, 8+ chars, NOT a dictionary word (e.g., `<opaque-12-char-alphanumeric>`). NEVER use `admin`, `root`, `administrator`, `superuser`, or any common name.
- **Where to obtain:** generate yourself; store in a password manager (1Password, Bitwarden, KeePassXC).
- **Without it:** in production, the middleware basic-auth gate at `middleware.ts` returns 401 for every `/admin/*` request, locking out the audit dashboard. In dev (`NODE_ENV !== 'production'`), the gate bypasses to keep `pnpm dev` painless.
- **Read by:** `middleware.ts` → `evaluateBasicAuth()` → `lib/auth/basic.ts`.

### ADMIN_PASS

- **Required:** yes
- **Format:** strong passphrase, 32+ characters, mixed case + digits + symbols (e.g., `<32-char-passphrase-from-password-manager>`). Use your password manager's generator with full-symbols option.
- **Where to obtain:** generate yourself; store with `ADMIN_USER` in the same password-manager entry.
- **Without it:** same as `ADMIN_USER` — 401 lockout in production.
- **Read by:** `middleware.ts` → `evaluateBasicAuth()`.

### INDEXNOW_KEY

- **Required:** yes (for IndexNow protocol participation)
- **Format:** 32-char hex string. Generate via `node scripts/indexnow-key.mjs` — script writes `public/<key>.txt` AND prints the key to stdout in one shot.
- **Where to obtain:** generate yourself; the key is intentionally PUBLIC (it gets served at `https://visitisrael.site/<INDEXNOW_KEY>.txt` as part of the IndexNow ownership-proof handshake). The "secret" property is that you control the value at build time and the file at the URL must match.
- **Without it:** `lib/indexnow.ts` → `indexNowConfigFromEnv()` returns `null` and `indexNowPing()` is never called. New URLs are not auto-pushed to Bing/Yandex. GSC sitemap (Step 8b) still works as the primary indexing path.
- **Read by:** `lib/indexnow.ts` helper (call sites wire into content-publish flow post-launch).

### CRON_SECRET

- **Required:** yes (for `/api/cron/affiliate-health` weekly cron — see `vercel.json` `crons` block)
- **Format:** strong opaque token, 32+ characters. Vercel can generate one or you can use `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`.
- **Where to obtain:** generate yourself; Vercel passes it as `Authorization: Bearer <CRON_SECRET>` on cron invocations.
- **Without it:** the cron route accepts unauthenticated requests in dev. In production with the var unset, anyone can trigger the affiliate-health check (low risk — read-only HEAD requests to public partner pages — but not ideal).
- **Read by:** `app/api/cron/affiliate-health/route.ts` → bearer-token check.

### LHCI_TOKEN

- **Required:** no (only for self-hosted Lighthouse history server)
- **Format:** alphanumeric token issued by the LHCI server's admin panel (e.g., `<token-from-self-hosted-lhci-server>`)
- **Where to obtain:** if you stand up an LHCI Server instance (https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/server.md), the admin CLI prints a per-project build token. Add it as a GitHub Actions repository secret (NOT a Vercel env var — Lighthouse runs in CI, not in production runtime).
- **Without it:** Lighthouse CI defaults to `upload.target = 'temporary-public-storage'`, which is fine for per-PR diffs but only retains reports for 7 days. No long-term trend dashboard.
- **Read by:** `.lighthouserc.cjs` → `upload.token` if `LHCI_TOKEN` is set in the GitHub Actions environment.

### LHCI_SERVER

- **Required:** no (paired with `LHCI_TOKEN`)
- **Format:** full URL to LHCI server (e.g., `<lhci-server-url-from-self-hosted-deploy>`, typically `https://lhci.yourdomain.tld`)
- **Where to obtain:** the URL of your self-hosted LHCI server (Vercel-hosted Node app, Heroku, or a small VPS).
- **Without it:** same as `LHCI_TOKEN` — defaults to temporary-public-storage.
- **Read by:** `.lighthouserc.cjs` → `upload.serverBaseUrl` if `LHCI_SERVER` is set.

---

## Deployment workflow

Once all vars above are populated in Vercel Project Settings → Environment Variables → Production scope, redeploy via Vercel Dashboard → Deployments → "Redeploy" on the latest production deployment, or push a new commit to `master`. Env-var changes do NOT auto-trigger redeploys — you must manually redeploy for new values to take effect.

**Verification:** After redeploy completes, view-source on the production homepage. If a `NEXT_PUBLIC_*` value is populated correctly, it appears in the JS bundle. If a server-only var is populated correctly, `curl -I https://visitisrael.site/admin/` returns 401 (for `ADMIN_*`) or `curl https://visitisrael.site/<INDEXNOW_KEY>.txt` returns the key (for `INDEXNOW_KEY`).

**Rotation:** treat `ADMIN_PASS` as a normal credential — rotate quarterly, or immediately after any team-member departure with admin access. `INDEXNOW_KEY` rotation requires re-verifying ownership at Bing Webmaster Tools (rare).

**Audit:** every populated env var should also be recorded in `data/affiliate-status.json` (AID receipt timestamp + applied-to-Vercel timestamp) for the Phase 6 monitoring loop.

---

## Cross-reference

- Operational checklist: `data/pre-deploy-checklist.md`
- Phase 1.6 helper implementations: `lib/affiliate/*.ts`
- Phase 1 affiliate-availability state: `data/affiliate-availability.json`
- Stack research: `.planning/research/STACK.md` § 3 (Affiliate Matrix)
- Middleware auth gate: `middleware.ts` + `lib/auth/basic.ts`
- Plausible script wiring: `app/[locale]/layout.tsx`
- `.env.example` (repo root) — empty-value mirror of this template
