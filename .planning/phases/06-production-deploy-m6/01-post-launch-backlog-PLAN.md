---
phase: 06-production-deploy-m6
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - data/post-launch-backlog.md
  - data/m6-completion-report-template.md
  - .planning/phases/06-production-deploy-m6/01-post-launch-backlog-SUMMARY.md
autonomous: true
requirements:
  - DEP-05
  - DEP-06
must_haves:
  truths:
    - 'data/post-launch-backlog.md exists enumerating every v1-deferred item from ROADMAP / PROJECT.md / Phase 1-5 SUMMARYs with: item name + rationale + reactivation trigger + estimated effort + priority'
    - 'Backlog covers AT MINIMUM the items called out in ROADMAP Phase 6 success criterion #5: FR locale activation, Hebrew slug aliases (v2), RU locale, Klook activation criterion, GoCity activation criterion, user accounts, AI itineraries, real-time ShabbatNotice widget, Reg-35 a11y preferences widget'
    - "Backlog ALSO covers Phase-3-emerged items: Phase 4 long-tail substantive execution (gated on R3 keyword purchase), Phase 2 editorial polish backlog (Plan 06 deferred items), R3 manual SERP review (post-launch human SLA), Negev professional photography commission, Bahá'í Gardens commissioned imagery (press@bahai.org email path)"
    - 'data/m6-completion-report-template.md exists as a skeleton for the post-deploy fill-in: site URL + GSC verification status + Lighthouse production sample results + smoke-test results + affiliate health first-run + post-launch backlog status'
    - 'NO real production data populated yet (m6 completion report fills post-deploy)'
  artifacts:
    - path: 'data/post-launch-backlog.md'
      provides: 'v1-deferred items enumerated with rationale + reactivation trigger + priority'
      min_lines: 100
      contains: 'reactivation_trigger'
    - path: 'data/m6-completion-report-template.md'
      provides: 'Post-deploy completion-report template; user fills in actual values after 06-01..03 user-actions complete'
      min_lines: 40
      contains: 'TEMPLATE'
  key_links:
    - from: 'data/post-launch-backlog.md'
      to: '.planning/PROJECT.md + .planning/ROADMAP.md + .planning/research/SUMMARY.md'
      via: 'every backlog entry cites its v1-deferral source decision'
      pattern: 'PROJECT|ROADMAP|SUMMARY'
---

<objective>
Plan 06-01 — Post-launch backlog + completion-report template (Phase 6 Wave 1, autonomous; final autonomous-runway plan).

**Why this is autonomous:** Backlog enumeration is pure synthesis of existing project artifacts (ROADMAP, PROJECT.md, SUMMARY.md, Phase 1-5 SUMMARYs) — no external services, no creds. The completion-report template is a skeleton that user fills in post-deploy.

**Out of scope (user-gated, NOT this plan):**

- Plan 06-02 production deploy (Vercel + DNS + env vars) — user follows data/pre-deploy-checklist.md
- Plan 06-03 GSC verification + sitemap submit + IndexNow — user
- Plan 06-04 monitoring activation (Vercel Cron toggle for affiliate-health weekly) — user

When user completes those, they re-plan: `/gsd:plan-phase 6 --gaps` reads VERIFICATION.md gaps + this backlog + spawns plans to fill in. Or `/gsd:execute-phase 6` re-runs and surfaces autonomous=false plans as checkpoints.

**Output:** 2 docs files. Phase 6 formally 1/4 complete (minimal autonomous close).
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/research/SUMMARY.md
@.planning/phases/05-legal-launch-prep-m5/01-launch-readiness-audit-SUMMARY.md
@.planning/phases/05-legal-launch-prep-m5/02-pre-deploy-handoff-SUMMARY.md
@data/long-tail-backlog.md
@data/pre-deploy-checklist.md
@data/serp-review.md
@data/negev-images.md
@data/haifa-bahai-policy.md
</context>

<tasks>

<task>
<name>Task 1: Author data/post-launch-backlog.md enumerating v1-deferred items</name>
<action>
Create `data/post-launch-backlog.md` with frontmatter:
```
---
status: ACTIVE
created: 2026-05-11
purpose: Enumerate every v1-deferred item with rationale + reactivation trigger + estimated effort + priority
review_cadence: quarterly OR when reactivation trigger fires
---
```

Then enumerate each deferred item in this format:

```
## <Item Name>

- **Source:** <ROADMAP phase / PROJECT.md decision / SUMMARY §N>
- **Rationale:** <why deferred from v1 — usually scope / budget / external blocker>
- **Reactivation trigger:** <when this becomes worth doing>
- **Estimated effort:** <S/M/L; 1-line description>
- **Priority:** <high/medium/low — for product backlog grooming>
- **Dependencies:** <other backlog items or external factors>
```

Items to enumerate (gather from sources):

**Locale expansion (v2):**

- FR locale activation (Conflict A — filesystem ready, not in i18n-config)
- RU locale (PITFALLS §10.2 — not validated in research)
- Hebrew slug aliases for top regions (PROJECT.md key decision — v2)

**Affiliate inventory:**

- Klook Israel activation (Conflict D stub — when Israel SKUs cross threshold; quarterly re-check per RESEARCH §1.5)
- GoCity Israel destination launch (Conflict D stub — when GoCity launches Israel destination; press-release watch)

**Content backlog (substantive):**

- Phase 4 long-tail substantive execution (gated on R3 keyword purchase $50-129 — see data/long-tail-backlog.md + data/long-tail-trigger.md)
- Phase 2 editorial polish backlog (about/en AUD-017+018; accessibility-statement/he AUD-024; 3 Jerusalem sub-dest AUD-022; all non-gate-failing — see Phase 2.6 STATE notes)
- R3 manual SERP review (8 keywords flagged — see data/serp-review.md; post-launch human SLA within 2 weeks of launch)

**Image commission (real photography):**

- Negev professional photography ($1,500-$3,000 budget — see data/negev-images.md)
- Bahá'í Gardens commissioned imagery (requires press@bahai.org written permission — see data/haifa-bahai-policy.md)
- Region-by-region binary image swap (replace Sharp-generated placeholders with real Wikimedia downloads — Phase 6 image-replace pass)

**Feature backlog (v2+):**

- User accounts (login, saved itineraries — PROJECT.md v2 scope)
- AI-generated itineraries (PROJECT.md v3 scope — gated on user accounts + LLM budget)
- Real-time ShabbatNotice widget (PROJECT.md — currently STATIC; v2 candidate)
- Reg-35 a11y preferences widget (per A11Y-08 statutory hint; v2 candidate)

**Operational ongoing:**

- Quarterly Ahrefs/DataForSEO re-run if budget approved (post-Phase-4 substantive execution)
- Quarterly Klook/GoCity Israel-inventory check (queue re-evaluation triggers)
- Affiliate health monitor weekly (Vercel Cron — activated post-deploy as 06-04)
- Lighthouse CI history (90-day retention via .github/workflows/lighthouse.yml)

Each item must include all 6 fields (source + rationale + trigger + effort + priority + deps).

Closing section: "Review cadence: quarterly grooming session + ad-hoc re-evaluation when any reactivation trigger fires. Track high-priority items in product issue tracker (TBD by user — GitHub Issues / Linear / etc.)."
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/post-launch-backlog.md','utf8'); if(c.split('\\n').length<100)process.exit(1); if(!/reactivation_trigger/.test(c))process.exit(1); const sections=c.match(/^## /gm)||[]; if(sections.length<10)process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/post-launch-backlog.md','utf8'); const required=['FR locale','RU locale','Klook','GoCity','long-tail','SERP','Negev','Bahá','ShabbatNotice']; for(const k of required){if(!c.includes(k)){console.error('missing:',k);process.exit(1)}}"</automated>
</verify>
<done>data/post-launch-backlog.md ships with ≥10 backlog items covering every v1-deferral surfaced across PROJECT/ROADMAP/research/phase-1-5; each item has 6 structured fields.</done>
</task>

<task>
<name>Task 2: Author data/m6-completion-report-template.md post-deploy skeleton</name>
<action>
Create `data/m6-completion-report-template.md` (≥40 lines) as a skeleton the USER fills in after Phase 6 user-actions (deploy, GSC, monitoring) complete.

Format:

```
---
status: TEMPLATE-AWAITING-DEPLOY
purpose: Filled in by user after 06-02 production deploy + 06-03 GSC + 06-04 monitoring activation complete
fill_command: edit this file in place; rename to data/m6-completion-report.md and commit when deploy is verified
---

# M6 Completion Report — Visit Israel v1.0

> **STATUS:** TEMPLATE — fill in after user-driven deploy completes
> **DEPLOY DATE:** <fill in>
> **VERIFIER:** <user name>

## 1. Site URL + DNS

- **Production URL:** <e.g., https://visitisrael.site>
- **DNS verified:** <date>
- **HTTPS + HSTS:** <verified via curl -I; paste output>

## 2. Google Search Console

- **Verification method:** <DNS TXT / HTML upload>
- **Verification date:** <fill in>
- **Sitemap submitted:** <date; URL>
- **Submitted URLs (first crawl):** <total>
- **IndexNow ping configured:** <yes/no; key reference (NOT real key)>

## 3. Affiliate AID enrollment

- **9 AIDs populated:** booking + civitatis + viator + getYourGuide + rentalcars + safetyWing + skyscanner-OR-travelpayouts + hostelworld + discoverCars
- **Per-partner enrollment date:** <table>
- **Skyscanner threshold (5K/mo):** <NOT YET / Travelpayouts fallback active>

## 4. Lighthouse production sample

- **Sample size:** 5 production URLs (recommended: /, /jerusalem/, /en/, /en/jerusalem/, /en/regions/)
- **Date run:** <fill in>
- **Median scores:** perf=<X>, a11y=<X>, best-practices=<X>, seo=<X>
- **All ≥ targets:** perf≥85, a11y≥95, best-practices≥95, seo=1.00 <yes/no>

## 5. Smoke-test prod

- `curl -I https://visitisrael.site/jerusalem/` → <Status + Content-Language + hreflang Link>
- `curl -I https://visitisrael.site/en/jerusalem/` → <Status + Content-Language + hreflang Link>
- /admin/ basic-auth challenges anonymous → <yes/no>

## 6. Affiliate health first run

- **Date:** <first cron run after deploy>
- **All 9 helpers green:** <yes/no — see data/affiliate-health.json>
- **Failures:** <list any>

## 7. Post-launch backlog status

- **Reviewed:** <date>
- **High-priority items in tracker:** <count>
- **First reactivation trigger expected:** <e.g., Phase 4 long-tail when R3 data lands>

## 8. M6 sign-off

- **All Phase 6 success criteria PASS:** <yes/no>
- **v1.0 milestone COMPLETE:** <date>
- **Next milestone:** <v1.1 / v2 — TBD>

---

Once filled in:
1. Rename this file to `data/m6-completion-report.md`
2. Commit with `docs(phase-6): complete M6 — v1.0 deployed YYYY-MM-DD`
3. Run `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" phase complete 06`
4. Run `/gsd:complete-milestone v1.0` to archive
```

</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/m6-completion-report-template.md','utf8'); if(c.split('\\n').length<40)process.exit(1); if(!/TEMPLATE/.test(c))process.exit(1); if(!/Lighthouse|Affiliate|Search Console/.test(c))process.exit(1)"</automated>
</verify>
<done>data/m6-completion-report-template.md ships with 8 fill-in sections + completion workflow instructions; ready for user to populate post-deploy.</done>
</task>

</tasks>

<success_criteria>
Phase 6 Plan 01 complete: backlog enumerated, completion-report template scaffolded. Phase 6 formally 1/N plans complete (N=1 since 06-02/03/04 are user-gated and not scaffolded here). v1.0 milestone is autonomous-runway COMPLETE.
</success_criteria>

<output>
Create `.planning/phases/06-production-deploy-m6/01-post-launch-backlog-SUMMARY.md` summarizing:
- Backlog item count + categorization
- Template scaffolded for post-deploy completion
- Phase 6 status: 1/1 autonomous plans complete; 3 user-gated plans NOT scaffolded (gap-closure path: /gsd:plan-phase 6 --gaps after deploy)
- v1.0 milestone status: autonomous-runway COMPLETE → ready for user-driven deploy chain
</output>
