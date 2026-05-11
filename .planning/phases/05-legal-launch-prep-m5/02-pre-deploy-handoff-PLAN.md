---
phase: 05-legal-launch-prep-m5
plan: 02
type: execute
wave: 2
depends_on:
  - 01-launch-readiness-audit
files_modified:
  - data/pre-deploy-checklist.md
  - data/env-vars-template.md
  - .planning/phases/05-legal-launch-prep-m5/02-pre-deploy-handoff-SUMMARY.md
autonomous: true
requirements:
  - DEP-01
must_haves:
  truths:
    - 'data/pre-deploy-checklist.md exists with itemized user-action steps for Vercel Pro provisioning + domain DNS + HTTPS/HSTS + basic-auth credentials + env vars + Search Console verify + Cron Jobs activation'
    - 'data/env-vars-template.md exists enumerating every required production env var (ADMIN_USER, ADMIN_PASS, NEXT_PUBLIC_<partner>_<AID> for 9 affiliate partners + Plausible domain + IndexNow key, etc.) with format spec + where-to-get-it pointer'
    - 'Both docs explicitly state they are USER-INPUT-GATED — do NOT auto-execute; surface for human after launch-readiness PASS'
    - 'Checklist references existing data/admin-credentials.md (referenced not committed — pointer only)'
    - 'NO secrets committed — env vars are template/placeholder strings only'
  artifacts:
    - path: 'data/pre-deploy-checklist.md'
      provides: 'Operational user-action checklist for the deploy phase — Vercel + DNS + creds + env + GSC + Cron'
      min_lines: 60
      contains: 'Vercel'
    - path: 'data/env-vars-template.md'
      provides: 'Production env var template — every NEXT_PUBLIC_* + private var documented with format + source'
      min_lines: 40
      contains: 'NEXT_PUBLIC'
  key_links:
    - from: 'data/pre-deploy-checklist.md'
      to: 'data/env-vars-template.md'
      via: 'cross-reference: env vars step points to template'
      pattern: 'env-vars-template'
---

<objective>
Plan 05-02 — Pre-deploy handoff documentation (Phase 5 Wave 2, autonomous docs).

The actual deploy actions (Vercel Pro provisioning + DNS + creds + env-var population + Search Console verify + Cron Jobs toggle) all require user-account credentials and external-service authentication. This plan ships TWO documentation artifacts that turn the deploy from "Claude figures it out" into "user follows a checklist":

1. `data/pre-deploy-checklist.md` — every user-action step ordered + acceptance criteria per step
2. `data/env-vars-template.md` — every required env var with format + source/where-to-obtain pointer

**Out of scope (handled by user post-launch-readiness PASS):**

- Actual Vercel project creation
- DNS A/AAAA/CNAME records
- HTTPS cert provisioning (Vercel-managed)
- Affiliate AID enrollment + dashboard sign-up at each partner
- Google Search Console account verify
- Vercel Cron Jobs toggle

**No code/MDX changes.** Pure documentation.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/REQUIREMENTS.md
@.planning/research/STACK.md
@.planning/phases/01-foundation-m1/04-affiliate-helpers-SUMMARY.md
@.planning/phases/05-legal-launch-prep-m5/01-launch-readiness-audit-SUMMARY.md
@lib/affiliate
@data/affiliate-availability.json
@middleware.ts
@next.config.ts
</context>

<tasks>

<task>
<name>Task 1: Author data/pre-deploy-checklist.md operational steps</name>
<action>
Create `data/pre-deploy-checklist.md` enumerating user-action steps in execution order:

1. **Vercel Pro provisioning** — sign up at vercel.com/pricing; cost ~$20/month; required for: production env vars, custom domain, HTTPS + HSTS, basic-auth on /admin, Cron Jobs, 90-day analytics retention
2. **Connect repo** — vercel.com → New Project → Import git repo (visitisrael.site); set framework=Next.js; build=`pnpm build`; output=`.next`
3. **Domain DNS** — point visitisrael.site → Vercel via A 76.76.21.21 + AAAA + CNAME `cname.vercel-dns.com.` ; verify in Vercel Domains tab
4. **HTTPS + HSTS** — Vercel auto-provisions Let's Encrypt; verify HSTS header in `next.config.ts` (already configured); test with `curl -I https://visitisrael.site` after DNS propagates
5. **Basic-auth on /admin/** — set production env vars `ADMIN_USER` + `ADMIN_PASS` (strong passphrase); refer to data/env-vars-template.md
6. **Affiliate AIDs** — populate 9 NEXT*PUBLIC*<partner>\_<AID> env vars (booking, civitatis, viator, getYourGuide, rentalcars, safetyWing, skyscanner, hostelworld, discoverCars); sign up at each partner dashboard; refer to data/env-vars-template.md
7. **Plausible Analytics** — sign up at plausible.io; verify domain visitisrael.site; set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var
8. **Google Search Console** — verify visitisrael.site (DNS TXT record OR HTML file upload); submit sitemap at `https://visitisrael.site/sitemap.xml`; configure IndexNow ping
9. **Vercel Cron Jobs** — enable affiliate-health weekly cron via `vercel.json` cron block (Phase 6 task — keep cron code scaffold in repo; Vercel toggle activates it)
10. **Lighthouse CI history** — `LHCI_TOKEN` env var + `LHCI_SERVER` URL (or use treosh/lighthouse-ci-action GitHub Action which is already wired in `.github/workflows/lighthouse.yml`)
11. **Smoke-test prod** — `curl -I https://visitisrael.site/jerusalem/` returns 200 + Content-Language: he + reciprocal hreflang Link header; `/en/jerusalem/` returns 200 + en
12. **Lighthouse production sample** — run lhci against 5 production URLs; verify perf ≥85, a11y ≥95, best-practices ≥95, seo = 1.00

Each step gets format:

```
### Step N: <title>
- **Action:** <what user does>
- **Acceptance:** <how to verify it's done>
- **Cost:** <one-line $$$ if applicable>
- **Source:** <link/doc reference>
- **Depends on:** <previous step number>
```

Closing section: "When all 12 steps PASS, run `/gsd:execute-phase 06` for automated post-launch monitoring activation (Phase 6 plans 01-04 — most are autonomous; 06-02 Search Console verify is user-gated)."
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/pre-deploy-checklist.md','utf8'); if(c.split('\\n').length<60)process.exit(1); if(!/Vercel/.test(c))process.exit(1); if(!/env-vars-template/.test(c))process.exit(1)"</automated>
</verify>
<done>data/pre-deploy-checklist.md ships with all 12 user-action steps + acceptance criteria + dependency chain; references data/env-vars-template.md for env var detail.</done>
</task>

<task>
<name>Task 2: Author data/env-vars-template.md production env var spec</name>
<action>
Create `data/env-vars-template.md` enumerating every required production env var:

**Public (NEXT*PUBLIC*) — visible to client bundle:**

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = visitisrael.site (the canonical domain you track)
- `NEXT_PUBLIC_BOOKING_AID` = `<aid-from-booking-affiliate-dashboard>` (format: 9-digit number)
- `NEXT_PUBLIC_CIVITATIS_AID` = `<aid-from-civitatis>` (format: alphanumeric)
- `NEXT_PUBLIC_VIATOR_AID` = `<aid-from-viator-partners>` (format: 5-7 digit number)
- `NEXT_PUBLIC_GETYOURGUIDE_AID` = `<aid-from-getyourguide>` (format: partner_id alphanumeric)
- `NEXT_PUBLIC_RENTALCARS_AID` = `<aid-from-rentalcars-affiliates>` (format: affcode alphanumeric)
- `NEXT_PUBLIC_SAFETYWING_AID` = `<aid-from-safetywing>` (format: referral code)
- `NEXT_PUBLIC_SKYSCANNER_AID` = `<aid-from-skyscanner-partners-only-after-5K-visits-month>` (gate: 5K visitors/mo threshold per Phase 1.4 lesson; fallback: travelpayouts aggregator)
- `NEXT_PUBLIC_HOSTELWORLD_AID` = `<aid-from-hostelworld-affiliates>`
- `NEXT_PUBLIC_DISCOVERCARS_AID` = `<aid-from-discovercars-affiliates>`
- `NEXT_PUBLIC_TRAVELPAYOUTS_AID` = `<aid-from-travelpayouts>` (aggregator; per AFF-08)

**Private (server-only):**

- `ADMIN_USER` = strong username (NOT admin/root) — for basic-auth on /admin/\*
- `ADMIN_PASS` = strong passphrase (32+ chars) — for basic-auth on /admin/\*
- `INDEXNOW_KEY` = randomly-generated 32-char hex string — exposed at `/<key>.txt` per IndexNow protocol
- `LHCI_TOKEN` = optional — for self-hosted Lighthouse history server
- `LHCI_SERVER` = optional — Lighthouse CI server URL

**Each var section:**

```
### NEXT_PUBLIC_<partner>_AID
- **Required:** yes
- **Format:** <regex or example>
- **Where to obtain:** <partner dashboard URL>
- **Without it:** helper renders public partner URL (no commission tracking); product remains functional, monetization disabled
- **Phase 1.4 helper:** `lib/affiliate/<partner>.ts` — `<partner>Link({...})`
```

Closing: "Once all vars populated in Vercel Project Settings → Environment Variables → Production scope, redeploy via Vercel dashboard or `vercel --prod`."

**Do NOT commit any real secrets** — every value is `<placeholder>` or template format.
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/env-vars-template.md','utf8'); if(c.split('\\n').length<40)process.exit(1); if(!/NEXT*PUBLIC_BOOKING/.test(c))process.exit(1); if(!/ADMIN_USER/.test(c))process.exit(1); if(/secret|sk*|aid-from._-real/i.test(c.replace(/aid-from-[a-z]+-(affiliate|partner|dashboard)/g,''))){console.error('possible-real-secret');process.exit(1)}"</automated>
</verify>
<done>data/env-vars-template.md ships with 11 NEXT*PUBLIC*_ + 3-5 private vars enumerated + format + source pointer; 0 real secrets committed.</done>
</task>

</tasks>

<success_criteria>
Phase 5 Plan 02 complete: deploy handoff is fully documented; user has unambiguous step-by-step + env var template; site is "ready for human deploy" status.
</success_criteria>

<output>
Create `.planning/phases/05-legal-launch-prep-m5/02-pre-deploy-handoff-SUMMARY.md` summarizing:
- 12 deploy steps documented
- 11+ env vars enumerated with sources
- 0 secrets committed (verified)
- Phase 5 COMPLETE (1+2 plans) — site is launch-ready pending user deploy
- Phase 6 unblock confirmation (06-04 post-launch backlog autonomous; 06-01/02/03 user-gated)
</output>
