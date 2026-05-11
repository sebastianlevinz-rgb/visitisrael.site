---
phase: 05-legal-launch-prep-m5
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - data/pre-launch-checklist.md
  - data/launch-readiness-report.md
  - .planning/phases/05-legal-launch-prep-m5/01-launch-readiness-audit-SUMMARY.md
autonomous: true
requirements:
  - A11Y-03
  - A11Y-04
  - DEP-03
must_haves:
  truths:
    - 'pnpm qa:audit full-site sweep across all built pages (~200 routes) — 0 critical + each page meets profile threshold (REGION_CANONICAL ≥80, SUB_DESTINATION ≥75, HUB profile applicable to homepage/regions index, UTILITY for legal, GUIDE_OR_WINERY for itinerary)'
    - 'pnpm qa:schema 0 errors across all built pages'
    - 'pnpm qa:credits 0 violations (every image has ledger entry, ≥1200px width or documented hero, sourceUrl, license, author)'
    - 'pnpm qa:hebrew-content 0 violations (HE/EN ratios within 0.85-1.40; paired naming on contested sites; ktiv maleh OK)'
    - 'pnpm typecheck + pnpm lint clean (or: any pre-existing baseline violations enumerated in launch-readiness-report.md with rationale — but NEW violations from this audit pass = 0)'
    - 'pnpm test --run all green (1500+ tests at this point)'
    - 'pnpm build succeeds — every route prerenders without error'
    - 'AUD-027 + AUD-028 (accessibility-statement footer link presence) = 0 violations site-wide'
    - 'AUD-019 + AUD-020 (Bethlehem administrativeStatus) = 0 violations on /west-bank/bethlehem/'
    - "AUD-026 (restrictedSiteAcknowledgment on Bahá'í + restricted-site images) = 0 violations"
    - 'data/pre-launch-checklist.md exists with PITFALLS §13 checklist executed — every item PASS or DOCUMENTED-DEFERRED with rationale'
    - 'data/launch-readiness-report.md aggregates all gate verdicts with timestamps + sample sizes + per-criterion PASS/DEFER/FAIL'
    - 'Accessibility coordinator details (Sebastian Levin / +972-53-371-3838 / accessibility@visitisrael.site / 2026-05-11) verified intact on /accessibility-statement and /en/accessibility-statement (still real, no sentinel reversion)'
  artifacts:
    - path: 'data/pre-launch-checklist.md'
      provides: 'PITFALLS §13 launch-readiness checklist executed across all ~200 pages — itemized with PASS/DEFER/FAIL + evidence'
      min_lines: 60
      contains: 'PASS'
    - path: 'data/launch-readiness-report.md'
      provides: 'Aggregate report — schema/credits/hebrew/audit/build/typecheck/lint/test/lighthouse all run + verdicts captured'
      min_lines: 50
      contains: 'launch'
  key_links:
    - from: 'data/pre-launch-checklist.md'
      to: '.planning/research/PITFALLS.md §13'
      via: 'checklist items derived from PITFALLS §13 "Looks done but isn''t" — every item mapped'
      pattern: 'PITFALLS|§13'
---

<objective>
Plan 05-01 — Consolidated launch readiness audit (Phase 5 Wave 1, autonomous).

Replaces ROADMAP's separate 05-01 (editorial gap-fill) + 05-02 (IS 5568 final form) + 05-03 (pre-launch QA sweep) with one consolidated plan. Rationale: these three plans share the same input (full-site Phase 3 codebase) and same execution shape (run gates → enumerate gaps → fix or defer). Splitting adds orchestration overhead without independent execution value. Plan 05-02 (separate plan) covers deploy-prep handoff (user-gated).

**Scope:**

1. **Editorial gap-fill (PITFALLS §13 checklist):** run the §13 "Looks done but isn't" checklist across all ~200 routes. Items include: 404 page presence, sitemap valid, robots correct, OG image per page, hreflang reciprocal, schema validates, every image credited ≥1200px, 0 raw hex in components, 0 physical directional utilities, 0 unmonetized partner URLs, 0 missing alt, 0 broken internal links. If any item fails: fix in this plan (Rule 1/2 deviations OK) OR document deferred with rationale.
2. **IS 5568 site-wide sweep:** AUD-027 + AUD-028 across all ~200 pages. Verify coordinator details still real (NOT regressed to sentinel). Verify last_audit_date within 90 days of launch (today = 2026-05-11; valid through 2026-08-09).
3. **Full QA pipeline:** `pnpm typecheck`, `pnpm lint`, `pnpm test --run`, `pnpm build`, `pnpm qa:credits`, `pnpm qa:schema`, `pnpm qa:audit`, `pnpm qa:hebrew-content`, `pnpm qa:ner`. All green or explicitly defer-with-rationale.
4. **Aggregate report:** `data/launch-readiness-report.md` summarizes every gate verdict + sample size + per-criterion PASS/DEFER/FAIL. `data/pre-launch-checklist.md` documents PITFALLS §13 execution.

**Output:** 2 docs files + any fixes to surface bugs. NO new MDX content.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/research/PITFALLS.md
@.planning/phases/03-region-replication-m3/03-VERIFICATION.md
@data/region-replication-report.md
@content/en/legal/accessibility-statement.mdx
@content/he/legal/accessibility-statement.mdx
@scripts/audit/quality-gate.ts
@scripts/qa/check-credits.mjs
@scripts/qa/validate-schema.mjs
@scripts/qa/hebrew-content.mjs
</context>

<tasks>

<task>
<name>Task 1: Run full QA pipeline + capture verdicts</name>
<action>
Run each gate in sequence; capture exit codes + key output. If any gate fails, follow Rule 1/2 (auto-fix bug / fill missing functionality) for fast fixes; for Rule 3+ (blocking architectural change) document the gap and defer:

1. `pnpm typecheck` — capture errors, fix any new ones introduced by Phase 3
2. `pnpm lint` — capture errors, fix any new ones
3. `pnpm test --run` — capture failure count; fix flakes; pin any new behavior
4. `pnpm build` — must succeed; capture warnings
5. `pnpm qa:credits` — Zod schema validation across photo-credits.json
6. `pnpm qa:schema` — JSON-LD validation across all built pages
7. `pnpm qa:audit` — full AUD-001..AUD-034 sweep across all ~200 pages; check each scores ≥ profile threshold
8. `pnpm qa:hebrew-content` — HE/EN ratio + paired naming + ktiv maleh
9. `pnpm qa:ner` — entity coverage check (≤ thresholds)
10. (Skip qa:lighthouse on Windows — DEFERRED-CI-owns per Phase 2.6 lesson; document this)

For each gate: write a row to `data/launch-readiness-report.md` with: gate name + exit code + sample size + verdict + timestamp + any deferred-with-rationale entries.

Commit with `feat(05-01): launch-readiness audit pipeline — N/M gates PASS`
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/launch-readiness-report.md','utf8'); if(c.split('\\n').length<50)process.exit(1); if(!/typecheck|lint|test|build|credits|schema|audit|hebrew/.test(c))process.exit(1)"</automated>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:schema</automated>
<automated>pnpm qa:credits</automated>
</verify>
<done>data/launch-readiness-report.md captures verdicts for all ~10 QA gates with timestamps + sample sizes; site-wide qa:audit + qa:schema + qa:credits exit 0.</done>
</task>

<task>
<name>Task 2: Execute PITFALLS §13 checklist + capture verdicts</name>
<action>
Read `.planning/research/PITFALLS.md` §13 "Looks done but isn't" — enumerate every item. For each, run the appropriate check:

- 404 page exists with correct lang + dir → `app/not-found.tsx` (verified Phase 2.5)
- Sitemap valid XML → `curl -s http://localhost:3000/sitemap.xml | xmllint --noout -` (skip on Windows; check `app/sitemap.ts` static config-driven generator output via Velite+build)
- Robots.txt → check `app/robots.ts` disallows /admin/ + /api/
- OG-image per page → audit dashboard AUD rule; sample 10 routes
- hreflang reciprocal + x-default → AUD-032 + AUD-033 across all pages
- Schema validates → covered by qa:schema in Task 1
- 100% credited images → covered by qa:credits in Task 1
- 0 raw hex in components → AUD-001 audit rule
- 0 physical directional utilities → AUD-030 audit rule
- 0 unmonetized partner URLs → AUD-029 audit rule + ESLint AFF-04
- 0 missing alt text → AUD-002 audit rule
- 0 broken internal links → AUD-001 audit rule
- IS 5568 accessibility statement (AUD-027 + AUD-028) → AUD audit + verify coordinator details intact
- Accessibility coordinator NOT regressed to `REQUIRES_USER_INPUT` sentinel — read `content/{en,he}/legal/accessibility-statement.mdx` and confirm Sebastian Levin / +972-53-371-3838 / accessibility@visitisrael.site / 2026-05-11
- Each region canonical has 5+ distinct affiliate partners — covered by qa:audit + report
- Each sub-dest has ≥1 affiliate — covered by qa:audit

Write `data/pre-launch-checklist.md` with each item as a checklist row: `- [x] {item} — {evidence/cmd} — {verdict PASS/DEFER/FAIL} — {sample/timestamp}`

For DEFER-with-rationale items (e.g., Lighthouse on Windows, manual SERP review), reference the existing data/serp-review.md or equivalent.

Commit with `feat(05-01): PITFALLS §13 launch-readiness checklist executed`
</action>
<verify>
<automated>node -e "const fs=require('fs'); const c=fs.readFileSync('data/pre-launch-checklist.md','utf8'); if(c.split('\\n').length<60)process.exit(1); if(!/PASS/.test(c))process.exit(1); if(!/PITFALLS|§13/.test(c))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); const en=fs.readFileSync('content/en/legal/accessibility-statement.mdx','utf8'); const he=fs.readFileSync('content/he/legal/accessibility-statement.mdx','utf8'); if(/REQUIRES_USER_INPUT/.test(en))process.exit(1); if(/REQUIRES_USER_INPUT/.test(he))process.exit(1); if(!/Sebastian Levin/.test(en))process.exit(1)"</automated>
</verify>
<done>data/pre-launch-checklist.md ships with every PITFALLS §13 item resolved (PASS or DEFER-with-rationale); accessibility coordinator details verified intact on both locales; site is launch-readiness PASS or surfaces a clear gap-closure plan.</done>
</task>

</tasks>

<success_criteria>
Phase 5 Plan 01 complete: full-site audit run, PITFALLS §13 checklist executed, accessibility coordinator verified intact, all QA gates PASS or explicitly defer-with-rationale. Plan 02 (deploy prep handoff) is the only remaining Phase 5 work; site is ready for user-driven deploy.
</success_criteria>

<output>
Create `.planning/phases/05-legal-launch-prep-m5/01-launch-readiness-audit-SUMMARY.md` summarizing:
- Per-gate verdict + sample size
- PITFALLS §13 items executed (count PASS / DEFER / FAIL)
- Any auto-fixes applied (Rule 1/2 deviations)
- Any deferred items with rationale + reactivation trigger
- Accessibility coordinator verify result
- Site launch-readiness status: PASS / GAPS / FAIL
</output>
