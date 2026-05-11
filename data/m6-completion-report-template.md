---
status: TEMPLATE-AWAITING-DEPLOY
purpose: Filled in by user after 06-02 production deploy + 06-03 GSC + 06-04 monitoring activation complete
fill_command: edit this file in place; rename to data/m6-completion-report.md and commit when deploy is verified
created: 2026-05-11
phase: 06-production-deploy-m6
plan: 01
---

# M6 Completion Report — Visit Israel v1.0

> **STATUS:** TEMPLATE — fill in after user-driven deploy completes.
> **DEPLOY DATE:** <fill in>
> **VERIFIER:** <user name>
>
> This template is the post-deploy completion artifact for the v1.0 milestone. The autonomous-runway shipped through Phase 5 Plan 02 (`data/pre-deploy-checklist.md`); this template captures the user-driven deploy chain's results. Fill in each section as steps complete; rename to `data/m6-completion-report.md` and commit when the deploy is verified.

---

## 1. Site URL + DNS

- **Production URL:** <e.g., https://visitisrael.site>
- **DNS verified:** <date>
- **Apex + www behavior:** <e.g., www.visitisrael.site 301 → visitisrael.site>
- **HTTPS + HSTS:** <verified via `curl -I https://visitisrael.site`; paste header excerpt — expect `strict-transport-security: max-age=63072000; includeSubDomains; preload`>
- **TLS certificate:** <Let's Encrypt auto-issued; renewal automatic; first issuance date>
- **Vercel deploy URL:** <e.g., visitisrael-site.vercel.app — should redirect to production domain>

## 2. Google Search Console

- **Property:** <visitisrael.site or sc-domain:visitisrael.site>
- **Verification method:** <DNS TXT / HTML upload / Google Analytics / Google Tag Manager>
- **Verification date:** <fill in>
- **Sitemap submitted:** <date; URL — e.g., https://visitisrael.site/sitemap.xml>
- **Sitemap parse status:** <Success / Couldn't fetch / Has errors — paste GSC reading>
- **Submitted URLs (first crawl 7-day window):** <total submitted / total indexed>
- **IndexNow ping configured:** <yes/no; key reference (NOT the real key — reference data/env-vars-template.md INDEXNOW_KEY)>
- **robots.txt verification:** <https://visitisrael.site/robots.txt — confirm /admin/ + /api/ disallowed; sitemap reference present>

## 3. Affiliate AID enrollment

- **9 partner helpers populated (status snapshot at deploy):**

| Partner      | Helper                          | Env var(s)                                                | Status                                       | Approval date |
| ------------ | ------------------------------- | --------------------------------------------------------- | -------------------------------------------- | ------------- |
| Booking.com  | `lib/affiliate/booking.ts`      | `NEXT_PUBLIC_BOOKING_AID`                                 | <approved / pending / fallback>              | <date>        |
| Civitatis    | `lib/affiliate/civitatis.ts`    | `NEXT_PUBLIC_CIVITATIS_AID`                               | <approved / pending / fallback>              | <date>        |
| Viator       | `lib/affiliate/viator.ts`       | `NEXT_PUBLIC_VIATOR_PID` + `NEXT_PUBLIC_VIATOR_MCID` opt. | <approved / pending / fallback>              | <date>        |
| GetYourGuide | `lib/affiliate/getYourGuide.ts` | `NEXT_PUBLIC_GYG_PARTNER_ID`                              | <approved / pending / fallback>              | <date>        |
| Rentalcars   | `lib/affiliate/rentalcars.ts`   | `NEXT_PUBLIC_RENTALCARS_AID`                              | <approved / pending / fallback>              | <date>        |
| SafetyWing   | `lib/affiliate/safetyWing.ts`   | `NEXT_PUBLIC_SAFETYWING_REF`                              | <approved / pending / fallback>              | <date>        |
| Skyscanner   | `lib/affiliate/skyscanner.ts`   | `NEXT_PUBLIC_SKYSCANNER_AID`                              | <approved / pending / **THRESHOLD (5K/mo)**> | <date or N/A> |
| Hostelworld  | `lib/affiliate/hostelworld.ts`  | `NEXT_PUBLIC_HOSTELWORLD_AID`                             | <approved / pending / fallback>              | <date>        |
| DiscoverCars | `lib/affiliate/discoverCars.ts` | `NEXT_PUBLIC_DISCOVERCARS_AID`                            | <approved / pending / fallback>              | <date>        |

- **Skyscanner 5K/mo threshold:** <NOT YET — Travelpayouts aggregator fallback active via `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER` / APPROVED on date X>
- **Conflict D stubs unchanged:** Klook + GoCity remain `availability: "absent"` in `data/affiliate-availability.json` per Phase 1.4 decision; revisit quarterly per `data/post-launch-backlog.md`.
- **Launch bar:** Booking + Civitatis + GetYourGuide approved is the minimum per Phase 5 Plan 02 decision; others can trickle in post-launch.

## 4. Lighthouse production sample

- **Sample size:** 5 production URLs (recommended): `/`, `/jerusalem/`, `/en/`, `/en/jerusalem/`, `/en/regions/`
- **Date run:** <fill in>
- **Method:** <CI GitHub Actions / local `pnpm qa:lighthouse` against production / Vercel Speed Insights — paste run reference>
- **Median scores (3-run-median per URL, then median across 5 URLs):**
  - Performance: <X> (target ≥85 production sample; ≥90 CI gate)
  - Accessibility: <X> (target ≥95)
  - Best Practices: <X> (target ≥95)
  - SEO: <X> (target 1.00)
- **All ≥ targets:** <yes/no — list any underperforming URL>
- **Mobile/Desktop:** <mobile baseline per project standard; desktop run optional>
- **Run artifact:** <link to `.lighthouseci/` / GitHub Actions run / Vercel report>

## 5. Smoke-test prod

Run these against the live production URL after deploy. Paste outputs.

- `curl -I https://visitisrael.site/jerusalem/`
  - Expected: `HTTP/2 200` + `content-language: he` + `Link: <https://visitisrael.site/en/jerusalem/>; rel="alternate"; hreflang="en"`
  - Actual: <paste>

- `curl -I https://visitisrael.site/en/jerusalem/`
  - Expected: `HTTP/2 200` + `content-language: en` + reciprocal alternate link to HE
  - Actual: <paste>

- `curl -I https://visitisrael.site/admin/audit/` (no credentials)
  - Expected: `HTTP/2 401` + `WWW-Authenticate: Basic realm="Admin"`
  - Actual: <paste>

- `curl -I -u <ADMIN_USER>:<ADMIN_PASS> https://visitisrael.site/admin/audit/`
  - Expected: `HTTP/2 200`
  - Actual: <paste>

- `curl -I https://visitisrael.site/robots.txt`
  - Expected: `HTTP/2 200` + body disallows `/admin/` + `/api/` + sitemap reference present
  - Actual: <paste>

- `curl -I https://visitisrael.site/sitemap.xml`
  - Expected: `HTTP/2 200` + XML body with 150+ `<loc>` entries + 0 Hebron references
  - Actual: <paste>

## 6. Affiliate health first run

- **Cron schedule:** weekly via `vercel.json` cron block + `app/api/cron/affiliate-health/route.ts` (Phase 6 plan 02 code surface; toggled in Vercel dashboard per Phase 6 plan 04 — Step 9 of pre-deploy-checklist deferred-by-design)
- **Date of first run:** <first weekly trigger after deploy>
- **All 9 helpers green:** <yes / no — paste data/affiliate-health.json verdict>
- **Failures (if any):** <partner / status code / URL pattern / action taken>
- **Alert routing:** <email / Slack / Linear / none — paste configuration if any>

## 7. Post-launch backlog status

- **`data/post-launch-backlog.md` reviewed:** <date of first quarterly grooming session OR launch-day initial review>
- **High-priority items count:** <count at launch — should match `Priority: high` entries in backlog>
- **Items promoted to active tracker:** <count + tracker name (GitHub Issues / Linear / Jira / etc.)>
- **First reactivation trigger expected:** <e.g., long-tail substantive execution when R3 keyword data lands at $50 DataForSEO purchase OR manual SERP review within 2 weeks of launch>
- **Next scheduled review:** <Q3 2026 first week — or specified quarterly cadence date>

## 8. M6 sign-off

- **All Phase 6 success criteria PASS:**
  - Criterion 1 (DNS + HTTPS + HSTS + hreflang headers): <PASS / FAIL — reference §1 + §5>
  - Criterion 2 (GSC + sitemap + IndexNow): <PASS / FAIL — reference §2>
  - Criterion 3 (admin basic-auth + LHCI history): <PASS / FAIL — reference §5 + project LHCI config>
  - Criterion 4 (affiliate health cron weekly + 9 helpers green): <PASS / FAIL — reference §6>
  - Criterion 5 (`data/post-launch-backlog.md` enumerates v1 deferrals): PASS (shipped 2026-05-11 in Phase 6 plan 01; this template is the §5 companion artifact)
- **v1.0 milestone COMPLETE:** <date>
- **Next milestone:** <v1.1 / v2 — TBD; reference `data/post-launch-backlog.md` quarterly grooming for promotion candidates>
- **Operator name + sign-off:** <name / date>

---

## Closing workflow — once filled in

1. Rename this file: `git mv data/m6-completion-report-template.md data/m6-completion-report.md`
2. Commit:
   ```
   docs(06): complete M6 — v1.0 deployed YYYY-MM-DD
   ```
3. Mark phase complete:
   ```
   node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" phase complete 06
   ```
4. Archive milestone:
   ```
   /gsd:complete-milestone v1.0
   ```
5. Schedule the post-launch quarterly grooming session per `data/post-launch-backlog.md` "Closing — Review Cadence".
6. Confirm `data/post-launch-backlog.md` "Manual SERP review" entry SLA is set (within 2 weeks of launch).

---

_Template version: 1.0 (Phase 6 plan 01 autonomous output)._
_To be filled by user post-deploy chain (06-02 deploy + 06-03 GSC + 06-04 monitoring)._
