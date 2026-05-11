# Pre-Deploy Checklist — visitisrael.site

**Status:** USER-INPUT-GATED — do NOT auto-execute. Surface this checklist to the human operator AFTER `data/launch-readiness-report.md` returns PASS (Phase 5 Plan 01).

**Purpose:** Every action below requires user-account credentials, external-service authentication, or a financial commitment (Vercel Pro, Plausible). They cannot be performed by Claude. Follow steps in order; the dependency chain is load-bearing (DNS must propagate before HTTPS verification; env vars must populate before smoke-test).

**Companion doc:** `data/env-vars-template.md` enumerates every required environment variable with format spec + where-to-obtain pointer. Step 5–7 + Step 10 reference it.

**Time estimate:** ~3–4 hours wall-clock end-to-end (most of which is DNS propagation + waiting for affiliate-program approvals, which can run in parallel with later steps).

---

## Step 1: Vercel Pro provisioning

- **Action:** Sign up at https://vercel.com/pricing and select the **Pro** plan ($20/month per member). Hobby plan is NOT sufficient — its image-optimization transformation quota will be exhausted within weeks for a 200+ page bilingual site, and Hobby does not support Vercel Cron Jobs (Step 9) or production-grade analytics retention.
- **Acceptance:** Vercel dashboard at https://vercel.com/dashboard shows account billing = "Pro" with a valid payment method attached. Team scope (if creating one): you can invite teammates later.
- **Cost:** $20/month/member (annual prepay = $16/month/member). First charge prorates from signup date.
- **Source:** https://vercel.com/pricing — see "Pro" column.
- **Depends on:** none (start here).

---

## Step 2: Connect git repo to Vercel

- **Action:** vercel.com → New Project → Import Git Repository → select `visitisrael.site` from your GitHub/GitLab account. On the import form: **Framework Preset = Next.js** (auto-detected), **Build Command = `pnpm build`**, **Output Directory = `.next`** (default), **Install Command = `pnpm install`**, **Production Branch = `master`** (matches `vercel.json` `git.deploymentEnabled.master`). Do NOT deploy yet — click "Deploy" only AFTER Step 5 (env vars) is complete; the initial build will fail without `ADMIN_USER`/`ADMIN_PASS` if you preview /admin/, and any AffiliateCard render is non-fatal but emits warnings.
- **Acceptance:** Vercel Project Settings → General shows: Framework = Next.js, Production Branch = master, Build Command = `pnpm build`, Root Directory = `./` (empty/default). Settings → Git shows the connected repo + a "Deploy hooks" section (do not configure hooks yet).
- **Cost:** $0 (included in Pro).
- **Source:** https://vercel.com/docs/projects/overview
- **Depends on:** Step 1.

---

## Step 3: Domain DNS — point visitisrael.site to Vercel

- **Action:** In Vercel Project → Settings → Domains, add `visitisrael.site` AND `www.visitisrael.site`. Vercel will display the DNS records you need to set at your registrar. The canonical setup for a root domain:
  - **A record:** `@` → `76.76.21.21` (Vercel's Anycast IP)
  - **AAAA record:** `@` → `2606:4700::6810:84e5` (IPv6; only if your registrar supports AAAA)
  - **CNAME record:** `www` → `cname.vercel-dns.com.`
  - Set redirect: `www.visitisrael.site` → `visitisrael.site` (apex preferred) in Vercel Domains UI.
- **Acceptance:** Vercel Domains tab shows both `visitisrael.site` and `www.visitisrael.site` with green "Valid Configuration" indicator. Run `dig visitisrael.site +short` and `dig www.visitisrael.site +short` from your terminal — should return `76.76.21.21` and `cname.vercel-dns.com.` respectively. DNS propagation typically takes 15 min to 2 hours, occasionally longer for ALIAS/ANAME hacks at certain registrars.
- **Cost:** $0 (Vercel DNS is included). Domain registration ~$10–30/year at your registrar.
- **Source:** https://vercel.com/docs/projects/domains/add-a-domain
- **Depends on:** Step 2.

---

## Step 4: HTTPS + HSTS verification

- **Action:** Vercel auto-provisions Let's Encrypt TLS certificates the moment DNS resolves correctly (no manual cert work required). HSTS is already configured in `next.config.ts` via Next.js's built-in security headers — once HTTPS is live, the `Strict-Transport-Security` header is emitted automatically per the project's existing config. Wait ~5 min after Step 3's "Valid Configuration" indicator before testing.
- **Acceptance:** Run `curl -I https://visitisrael.site` (any path). Expect:
  - `HTTP/2 200` (or `301` if redirect rule applies)
  - `strict-transport-security: max-age=63072000; includeSubDomains; preload`
  - Valid TLS certificate (browser address bar shows lock icon; no "Not Secure" warning)
  - `https://www.visitisrael.site` returns `301 → https://visitisrael.site` (or the apex direction you chose in Step 3)
- **Cost:** $0 (Let's Encrypt is free; renewals automatic).
- **Source:** https://vercel.com/docs/edge-network/headers#strict-transport-security
- **Depends on:** Step 3 (DNS must resolve before Vercel can issue cert).

---

## Step 5: Basic-auth credentials on /admin/\*

- **Action:** In Vercel Project Settings → Environment Variables → Production scope, add:
  - `ADMIN_USER` = a strong username (NOT `admin`, `root`, `administrator`, or any dictionary word — pick something opaque like a 12-char alphanumeric)
  - `ADMIN_PASS` = a strong passphrase (32+ characters; use a password manager to generate). Store these credentials in a password manager — they gate access to `/admin/audit/`, `/admin/lighthouse/`, `/admin/photo-credits/`, and all future admin views.
  - Refer to `data/env-vars-template.md` § "ADMIN\_\*" for format spec.
- **Acceptance:** After deploy (Step 11), `curl -I https://visitisrael.site/admin/` returns `401 Unauthorized` with `WWW-Authenticate: Basic realm="Admin", charset="UTF-8"`. `curl -I -u <ADMIN_USER>:<ADMIN_PASS> https://visitisrael.site/admin/audit/` returns `200`. The `middleware.ts` `isAdminPath` gate is the canonical enforcement point.
- **Cost:** $0.
- **Source:** `middleware.ts` (lines 38–53); `lib/auth/basic.ts`; `data/env-vars-template.md`.
- **Depends on:** Step 2.

---

## Step 6: Affiliate AIDs — 9 partner enrollments + Travelpayouts marker

- **Action:** Apply at each affiliate program. Each application is independent and can run in parallel with Steps 7–11; many take 1–7 business days to approve. As each AID arrives, set it in Vercel Project Settings → Environment Variables → Production scope. The 9 helpers (`lib/affiliate/{partner}.ts`) read these at runtime — empty value = public URL (graceful degrade); populated value = AID-tagged URL with commission tracking.
  - **Booking.com** — apply at https://www.booking.com/affiliate-program/v2/index.html or via CJ Affiliate (Middle East region). Env var: `NEXT_PUBLIC_BOOKING_AID`.
  - **Civitatis** — apply at https://www.civitatis.com/en/partners/. Env var: `NEXT_PUBLIC_CIVITATIS_AID`.
  - **Viator (Tripadvisor)** — apply at https://partnerresources.viator.com/. Env vars: `NEXT_PUBLIC_VIATOR_PID` + optional `NEXT_PUBLIC_VIATOR_MCID`.
  - **GetYourGuide** — apply at https://partner.getyourguide.com/ (or via Awin merchant 18925). Env var: `NEXT_PUBLIC_GYG_PARTNER_ID`.
  - **Rentalcars.com** — apply via Awin or CJ Affiliate. Env var: `NEXT_PUBLIC_RENTALCARS_AID`.
  - **SafetyWing** — apply at https://safetywing.com/affiliates. Env var: `NEXT_PUBLIC_SAFETYWING_REF`.
  - **Skyscanner** — apply via Impact at https://www.partners.skyscanner.net/product/affiliates. **Gate: 5,000 visitors/month threshold** — apply AFTER launch when you have traffic. Fallback: Travelpayouts aggregator (below). Env var: `NEXT_PUBLIC_SKYSCANNER_AID`.
  - **Hostelworld** — apply via Partnerize at https://signup.partnerize.com/signup/en/hostelworld. Env var: `NEXT_PUBLIC_HOSTELWORLD_AID`.
  - **DiscoverCars** — apply at https://www.discovercars.com/affiliate (365-day cookie window — highest LTV in the matrix). Env var: `NEXT_PUBLIC_DISCOVERCARS_AID`.
  - **Travelpayouts** (aggregator fallback per AFF-08) — apply at https://www.travelpayouts.com/. Env var: `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER`. Useful for the pre-traffic phase when direct partners have not yet approved.
  - **Klook + GoCity** — DO NOT apply for v1. Both are Conflict D stub helpers (thin Israel SKU / no Israel destination); helpers throw `NoIsraelInventoryError`. Re-review quarterly per `data/affiliate-availability.json`.
- **Acceptance:** Each populated env var visible in Vercel Project Settings → Environment Variables → Production scope (values masked). After redeploy (Step 11), view-source on any region page (e.g., `/jerusalem`) and confirm at least one `<a href="https://www.booking.com/...?aid=<your-aid>">` link exists for an approved partner. Each receipt should be recorded in `data/affiliate-status.json` (`aidReceivedAt` + `appliedAt`).
- **Cost:** $0 (all 9 programs are commission-only; no upfront fee). Indirect cost: time spent on each application + waiting for approval.
- **Source:** `data/env-vars-template.md` § "Affiliate AIDs"; `lib/affiliate/index.ts` barrel; `data/affiliate-availability.json` for current state.
- **Depends on:** Step 5 (Vercel env-var infrastructure exists). Approval timing is partner-controlled — start applications in parallel with Steps 7–11.

---

## Step 7: Plausible Analytics — domain registration + env var

- **Action:** Sign up at https://plausible.io/ (or self-host at https://plausible.io/self-hosted-web-analytics). Add `visitisrael.site` as a tracked domain. Plausible is GDPR + Israeli Privacy Protection Law compliant (no cookies, no PII, IP anonymization built-in) and is the canonical analytics choice per FND-08 stack research. Set the env var in Vercel Project Settings → Environment Variables → Production scope: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN = visitisrael.site`. The tracking snippet in `app/[locale]/layout.tsx` reads this var at render time.
- **Acceptance:** Plausible dashboard at https://plausible.io/visitisrael.site shows `Status: Site is receiving data` after first production page-view post-deploy. View-source on production homepage and confirm `<script defer data-domain="visitisrael.site" src="https://plausible.io/js/script.js">` is present in `<head>`.
- **Cost:** Plausible-hosted: $9/month for the Growth plan (up to 10K pageviews/month). Self-hosted: $0 + ~$5/month VPS. Per CONTEXT.md the hosted plan is the v1 default.
- **Source:** https://plausible.io/docs/plausible-script ; `app/[locale]/layout.tsx` line ~57.
- **Depends on:** Step 5 (Vercel env-var infrastructure exists).

---

## Step 8: Google Search Console — verify domain + submit sitemap + IndexNow

- **Action:** Three sub-steps:
  - **8a. Verify:** Sign in at https://search.google.com/search-console and add a property of type "Domain" for `visitisrael.site`. Google will require a DNS TXT record (preferred — covers all subdomains) OR an HTML file upload to verify ownership. The DNS TXT method needs another DNS round-trip (5–60 min propagation).
  - **8b. Submit sitemap:** Once verified, GSC → Sitemaps → Add new sitemap → enter `https://visitisrael.site/sitemap.xml`. The sitemap is auto-generated by `next-sitemap` at build time and currently lists ~156 URLs (verified in `data/launch-readiness-report.md`).
  - **8c. IndexNow key:** Generate a 32-char hex string (e.g., via `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`). Set `INDEXNOW_KEY` in Vercel Production env vars. Per the IndexNow protocol the site must serve `https://visitisrael.site/<INDEXNOW_KEY>.txt` containing the key as plain text — this is wired via the Phase 1 scaffold's IndexNow route handler. After IndexNow is live, every new/updated URL gets pushed to Bing + Yandex automatically; Google has not yet implemented IndexNow (May 2026) so GSC sitemap is still the primary path for Google.
- **Acceptance:** GSC → Domain property → "Ownership verified" status. GSC → Sitemaps → `sitemap.xml` shows "Success" with discovered URL count matching the build (156 ± few). `curl https://visitisrael.site/<INDEXNOW_KEY>.txt` returns the key string with `200 OK`.
- **Cost:** $0 (GSC + IndexNow both free).
- **Source:** https://search.google.com/search-console ; https://www.indexnow.org/documentation ; `data/env-vars-template.md` § "INDEXNOW_KEY".
- **Depends on:** Step 4 (HTTPS must be live so GSC can verify); Step 11 (deploy must be live so sitemap.xml + IndexNow key endpoint are reachable).

---

## Step 9: Vercel Cron Jobs — affiliate-health weekly probe

- **Action:** Phase 6 plan 02 ships the `vercel.json` cron block + the route handler under `app/api/cron/affiliate-health/route.ts` (currently empty — Phase 6 work). Once Phase 6 lands, **no Vercel-dashboard toggle is needed** — Vercel auto-activates cron jobs declared in `vercel.json` on Pro plans. The weekly probe pings each affiliate partner's deeplink, validates redirect response (200 or 30x), and emits a webhook on failure. Until Phase 6, this step is a placeholder.
- **Acceptance:** Vercel Project → Settings → Cron Jobs shows the affiliate-health entry with last-run timestamp and "Success" status. Logs visible at Project → Functions → cron/affiliate-health.
- **Cost:** $0 for first 100 cron invocations/month on Pro; weekly = 4/month, well under the cap.
- **Source:** https://vercel.com/docs/cron-jobs ; Phase 6 plan 02 (when shipped).
- **Depends on:** Phase 6 plan 02 implementation (deferred — not blocking deploy). Skip this step at launch; revisit when Phase 6 cron code lands.

---

## Step 10: Lighthouse CI history — optional self-hosted server

- **Action:** The GitHub Action at `.github/workflows/lighthouse.yml` uses `treosh/lighthouse-ci-action@v12` with `temporary-public-storage` as the default upload target. This is sufficient for per-PR diff comments + 7-day retention. If you want long-term Lighthouse history, deploy the open-source LHCI Server (https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/server.md) to a Vercel-hosted Node app or Heroku free tier, then set: `LHCI_TOKEN` (per-project token from the LHCI server) + `LHCI_SERVER` (the server URL). Both are GitHub Actions repository secrets, NOT Vercel env vars — Lighthouse runs in CI, not in the production runtime. Refer to `data/env-vars-template.md` § "LHCI_TOKEN" + "LHCI_SERVER".
- **Acceptance:** GitHub Actions → Lighthouse workflow → most recent run posts a comment on the PR with mobile median performance / accessibility / best-practices / SEO scores. Assertion thresholds (perf ≥ 0.90, a11y ≥ 0.95, bp ≥ 0.95, seo = 1.00) are enforced as `error` per `.lighthouserc.cjs`. If self-hosted server is configured, the LHCI dashboard shows historical run data per branch.
- **Cost:** $0 default (temporary-public-storage); $0–5/month for self-hosted LHCI server VPS.
- **Source:** https://github.com/GoogleChrome/lighthouse-ci ; `.github/workflows/lighthouse.yml` ; `.lighthouserc.cjs`.
- **Depends on:** none (CI-side concern, separate from production runtime).

---

## Step 11: Smoke-test production after first deploy

- **Action:** After Steps 1–8 are complete, trigger a production deploy: push to `master` branch OR Vercel Dashboard → Deployments → Redeploy. Wait for the build to complete (typically 90–180 seconds for this codebase). Then run the following smoke probes from your terminal:
  - `curl -I https://visitisrael.site/jerusalem/` → expect `200 OK`, `content-language: he`, `Link: <https://visitisrael.site/en/jerusalem/>; rel="alternate"; hreflang="en"` (reciprocal hreflang).
  - `curl -I https://visitisrael.site/en/jerusalem/` → expect `200 OK`, `content-language: en`, reciprocal hreflang to the HE URL.
  - `curl -s https://visitisrael.site/sitemap.xml | grep -c '<loc>'` → expect ≥ 150.
  - `curl -s https://visitisrael.site/robots.txt | head -20` → expect `Disallow: /admin/` and `Sitemap: https://visitisrael.site/sitemap.xml`.
  - Open https://visitisrael.site/jerusalem/ in a real browser (Chrome + Safari, mobile + desktop) — verify hero image renders, AffiliateCard CTAs appear (URLs include AIDs if Step 6 populated), accessibility-statement link in footer is present, Plausible tracking pixel fires (DevTools → Network → script.js to plausible.io).
- **Acceptance:** All 4 curl probes pass; browser test confirms no JS errors in DevTools console; no broken images; no Plausible 404. If any probe fails, redeploy is NOT yet smoke-test-PASS — investigate via Vercel function logs.
- **Cost:** $0.
- **Source:** `data/launch-readiness-report.md` (Phase 5 plan 01); production URLs above.
- **Depends on:** Steps 1–8 complete.

---

## Step 12: Lighthouse production sample (post-deploy validation)

- **Action:** From your local machine (macOS or Linux preferred — Windows has the EPERM gotcha documented in Phase 2.6 lesson), run Lighthouse against 5 production URLs:
  - `npx @lhci/cli@0.15 collect --url=https://visitisrael.site/jerusalem/ --url=https://visitisrael.site/tel-aviv/ --url=https://visitisrael.site/en/jerusalem/ --url=https://visitisrael.site/en/tel-aviv/ --url=https://visitisrael.site/en/legal/accessibility-statement --numberOfRuns=3 --upload.target=temporary-public-storage`
  - The CI workflow runs against `localhost:3000` (build artifacts). Running against production captures real-world CDN + image-optimization behavior.
- **Acceptance:** Median scores across the 5 URLs satisfy:
  - performance ≥ 0.85 (production mobile is harder than CI localhost; the .lighthouserc.cjs threshold of 0.90 is for CI, this sample target is 0.85)
  - accessibility ≥ 0.95
  - best-practices ≥ 0.95
  - seo = 1.00
  - If any URL fails, capture the report URL from the LHCI output and file a Phase 6 post-launch issue.
- **Cost:** $0.
- **Source:** `.lighthouserc.cjs` ; https://github.com/GoogleChrome/lighthouse-ci/tree/main/packages/cli
- **Depends on:** Step 11.

---

## When all 12 steps PASS

Run `/gsd:execute-phase 06` for automated post-launch monitoring activation (Phase 6 plans 01–04). Most of Phase 6 is autonomous; 06-02 (Search Console verify validation) is user-gated. Once Phase 6 closes, the site is in steady-state operation.

**Phase 5 COMPLETE checklist:**

- [ ] Step 1 (Vercel Pro) — billing active
- [ ] Step 2 (Repo connected) — Project Settings show Next.js + master
- [ ] Step 3 (DNS) — Vercel Domains "Valid Configuration"
- [ ] Step 4 (HTTPS + HSTS) — `curl -I` confirms TLS + HSTS header
- [ ] Step 5 (Basic-auth) — `ADMIN_USER` + `ADMIN_PASS` in Production scope
- [ ] Step 6 (Affiliate AIDs) — at minimum Booking + Civitatis + GYG approved (others can arrive post-launch)
- [ ] Step 7 (Plausible) — dashboard receiving data
- [ ] Step 8 (GSC + IndexNow) — Domain verified + sitemap submitted + IndexNow key endpoint live
- [ ] Step 9 (Cron) — deferred to Phase 6 plan 02; skip at launch
- [ ] Step 10 (LHCI history) — optional; defaults are fine
- [ ] Step 11 (Smoke-test) — 4 curl probes + browser test PASS
- [ ] Step 12 (Lighthouse production sample) — 5-URL median meets thresholds

When 11/12 boxes are checked (Step 9 deferred-by-design), the site is launched. Welcome to operation.
