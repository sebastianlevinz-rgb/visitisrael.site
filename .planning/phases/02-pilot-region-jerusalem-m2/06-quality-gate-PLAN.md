---
phase: 02-pilot-region-jerusalem-m2
plan: 06
type: execute
wave: 6
depends_on:
  - 02-01-en-canonical
  - 02-02-he-canonical
  - 02-03-sub-destinations
  - 02-04-itinerary
  - 02-05-hubs-legal
files_modified:
  - scripts/audit/quality-gate.ts
  - data/manual-serp-review-checklist.md
  - data/serp-review.md
  - data/audit-results.json
  - data/lighthouse-results.json
  - data/axe-results.json
  - data/a11y-il-results.json
  - data/quality-gate-pass.md
  - data/quality-gate-failure.md
  - tests/qa/quality-gate-content-mode.test.ts
autonomous: true
requirements:
  - CNT-01
  - CNT-02
  - CNT-03
  - CNT-04
  - CNT-05
  - CNT-06
  - CNT-07
  - A11Y-03
  - A11Y-04
  - A11Y-05
  - SEO-04
  - IMG-04
  - IMG-05
must_haves:
  truths:
    - 'scripts/audit/quality-gate.ts no longer runs in phase1StructuralOnly mode when contentPages.length > 0 — content-aware gate is active'
    - 'Full pnpm build + pnpm qa:audit + pnpm lhci + pnpm qa:axe + pnpm qa:audit-a11y run successfully against all Jerusalem pages (~30 pages: 1 region pair + 7 sub-dest pairs + 1 itinerary pair + homepage + regions index + 5 legal × 2)'
    - 'Manual SERP review for 5 EN + 3 HE Jerusalem keywords completed and recorded in data/serp-review.md with PASS/REWORK verdicts per keyword'
    - 'data/quality-gate-pass.md OR data/quality-gate-failure.md written by pnpm qa:quality-gate'
    - 'If PASS: 10/10 Quality Gate criteria green, exit 0, Phase 3 unblocked'
    - 'If FAIL: failure report identifies failing criterion + suspected cause + proposed fix; exit 1; workflow halts'
    - 'scripts/audit/quality-gate.ts in content mode evaluates all 10 criteria (no DEFER on criteria 2/3/5/9 anymore)'
  artifacts:
    - path: 'scripts/audit/quality-gate.ts'
      provides: 'Modified gate generator that exits structural-only mode when content pages exist'
      contains: 'phase1StructuralOnly'
    - path: 'data/manual-serp-review-checklist.md'
      provides: 'Pre-filled SERP review template for 5 EN + 3 HE keywords (review steps + entity coverage checklist)'
      min_lines: 50
    - path: 'data/serp-review.md'
      provides: 'Completed SERP review with PASS/REWORK verdicts per keyword'
    - path: 'data/quality-gate-{pass,failure}.md'
      provides: 'Hard gate verdict report (one of the two exists; pass = advance to Phase 3, failure = HARD STOP)'
      contains: 'Quality Gate'
  key_links:
    - from: 'scripts/audit/quality-gate.ts'
      to: 'data/{audit-results,lighthouse-results,axe-results,a11y-il-results}.json'
      via: 'fs.readFile inputs to gate evaluator'
      pattern: "audit-results\\.json|lighthouse-results\\.json"
    - from: 'pnpm qa:quality-gate'
      to: 'data/quality-gate-{pass,failure}.md'
      via: 'writeFile output'
      pattern: "quality-gate-(pass|failure)\\.md"
---

<objective>
Plan 02-06 — Pilot QA + Quality Gate (Wave 6, FINAL).

Run the full Phase-2 QA pipeline against all Jerusalem content (~30 pages: region pair + 7 sub-dest pairs + 1 itinerary pair + homepage + /regions/ + 5 legal × 2). Flip `scripts/audit/quality-gate.ts` out of `phase1StructuralOnly` mode (auto-detect contentPages.length > 0). Execute the manual SERP review (compensating control for proxied R3 data per CONTEXT.md). Run `pnpm qa:quality-gate`. If 10/10 criteria green → write `data/quality-gate-pass.md` and unblock Phase 3. If any criterion fails → write `data/quality-gate-failure.md` and HALT.

The 10 Quality Gate criteria (LOCKED from ROADMAP.md):

1. Lighthouse mobile 3-run-median: perf≥0.90, a11y≥0.95, best-practices≥0.95, SEO=1.00 on every Jerusalem page
2. Audit dashboard per-page score ≥85 (profile-aware)
3. Zero critical-severity audit issues
4. Affiliate coverage ≥80% (5+ active on region canonical)
5. EN+HE 100% parity (every page has counterpart; schema parity; hreflang reciprocal)
6. 100% credited images ≥1200px (restricted-site images have restrictedSiteAcknowledgment)
7. Zero raw hex codes in components
8. hreflang valid (he + en + x-default reciprocal; canonical never cross-locale)
9. Schema validated on every page (`pnpm qa:schema` + Google Rich Results sample)
10. Zero broken internal links (audit-dashboard internal-link traversal)

Purpose: Close Phase 2 with verifiable PASS/FAIL state. This plan is the ROADMAP-mandated hard stop between Phases 2 and 3.

Output: 1 quality-gate generator code change + 1 SERP review checklist + 1 SERP review completed report + 4 QA-result JSONs (audit/lighthouse/axe/a11y-il) + 1 final pass-or-failure markdown.
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
@.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-RESEARCH.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-VALIDATION.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-02-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-03-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-04-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-05-SUMMARY.md
@.planning/research/PITFALLS.md
@scripts/audit/quality-gate.ts
@scripts/audit/run.ts
@.lighthouserc.cjs
@scripts/audit/axe.mjs
@scripts/audit_a11y_wrapper.mjs

<interfaces>
<!-- Quality-gate generator current behavior + content-mode flip + 10-criterion evaluation. -->

scripts/audit/quality-gate.ts (current Phase 1 implementation, from plan 10 SUMMARY):

```ts
// Reads:
//   - data/audit-results.json        (per-page, per-rule violations + scores)
//   - data/lighthouse-results.json   (3-run-median per URL)
// Computes contentPages = pages that are not /admin/* AND not _not-found
// If contentPages.length === 0 → phase1StructuralOnly = true → criteria 2/3/5/9 DEFER
// Else → phase1StructuralOnly = false → all 10 criteria FIRE
// Writes data/quality-gate-pass.md OR data/quality-gate-failure.md
// Exit 0 on PASS, 1 on FAIL
```

Phase 2 ACTION REQUIRED: verify `scripts/audit/quality-gate.ts` auto-flips out of structural-only mode now that contentPages > 0. If the logic does NOT auto-flip (e.g., hardcoded mode flag), edit it to detect and flip. Add a Vitest test pinning the content-mode behavior.

manual SERP review keywords (per CONTEXT.md proxied-R3 compensating control):
EN (5): "things to do in jerusalem", "jerusalem itinerary", "jerusalem hotels", "jerusalem tours", "best time to visit jerusalem"
HE (3): "מה לעשות בירושלים", "טיולים בירושלים", "העיר העתיקה ירושלים"

For each: human inspects Google top-10 results, confirms our H-tag structure aligns with searcher intent + entity coverage, writes PASS/REWORK per keyword to `data/serp-review.md`. REWORK verdicts trigger targeted edits to 2.1/2.2/2.3 BEFORE this gate runs to completion.

CRITICAL: Quality Gate is a one-shot. Run all preparatory steps (audit, lighthouse, axe, a11y-il, SERP review, any REWORK edits) FIRST. Only run `pnpm qa:quality-gate` once everything is staged.
</interfaces>

<quality_gate_10_criteria>

<!-- Verbatim from ROADMAP.md "Quality Gate (Hard Stop)" section + PROJECT.md. -->

| #   | Criterion                                     | Threshold                                                | Data source                                      |
| --- | --------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------ |
| 1   | Lighthouse mobile (3-run median)              | perf≥0.90, a11y≥0.95, best-practices≥0.95, SEO=1.00      | data/lighthouse-results.json                     |
| 2   | Audit dashboard per-page score                | ≥85 on EVERY Jerusalem page using its profile            | data/audit-results.json                          |
| 3   | Critical-severity audit issues                | 0                                                        | data/audit-results.json filter severity=critical |
| 4   | Affiliate coverage of applicable partners     | ≥80% (5+ active on region canonical)                     | AUD-031                                          |
| 5   | EN+HE parity                                  | 100% — every EN page has HE counterpart and vice-versa   | sitemap walker + AUD-032 (hreflang)              |
| 6   | Credited images ≥1200px                       | 100% with ledger entry + restricted-site acknowledgments | pnpm qa:credits + AUD-003/004/026                |
| 7   | Raw hex codes in components                   | 0 (excluding @theme foundation layer)                    | AFF-05 ESLint + AUD-001                          |
| 8   | hreflang valid (bidirectional + x-default→EN) | every page; reciprocal; never cross-locale canonical     | AUD-032 + AUD-033                                |
| 9   | Schema validated                              | 100% pages pass pnpm qa:schema; sample Google RR Test    | pnpm qa:schema + AUD-033                         |
| 10  | Broken internal links                         | 0                                                        | AUD-001 broken-link rule                         |

</quality_gate_10_criteria>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Verify quality-gate.ts auto-flips out of phase1StructuralOnly + write Vitest test pinning content-mode behavior + create manual SERP review checklist template</name>
  <files>
    scripts/audit/quality-gate.ts,
    tests/qa/quality-gate-content-mode.test.ts,
    data/manual-serp-review-checklist.md
  </files>
  <action>
**1. Inspect `scripts/audit/quality-gate.ts`** — verify the existing logic auto-flips when `contentPages.length > 0`:

Use `Read` to inspect the current implementation. Per Phase 1 plan 10 SUMMARY:

> "Phase-1 structural quality-gate mode: when contentPages.length === 0 (only admin/\* + \_not-found scanned), criteria 2/3/5/9 are DEFERRED rather than FAIL. … Phase 2+ first content page flips structural=false and criteria fire normally"

Confirm this is mechanical (boolean derived from `contentPages.length`), not a manual flag. If it's a flag → REFACTOR to be content-count-driven.

**2. Add a Vitest test** at `tests/qa/quality-gate-content-mode.test.ts`:

- Test: with synthetic audit-results.json containing 0 content pages → quality gate returns `mode: 'structural'` (criteria 2/3/5/9 marked DEFER)
- Test: with synthetic audit-results.json containing 1+ content pages (e.g., `slug: 'jerusalem', lang: 'en'`) → quality gate returns `mode: 'content'` and all 10 criteria fire normally
- Test: in content mode with all criteria PASS → exit 0 + writes quality-gate-pass.md
- Test: in content mode with criterion N FAIL → exit 1 + writes quality-gate-failure.md with the failing criterion documented

Refactor `scripts/audit/quality-gate.ts` to export pure helpers (`evaluateCriterion(N, audit, lh)` + `composeReport(results)` + `writeReport(results, outPath)`) for Vitest testability, per the Phase 1 plan-11 pure-helpers-exported-for-Vitest pattern.

**3. Create `data/manual-serp-review-checklist.md`** — the pre-filled template the executor uses to drive the manual SERP review (task 2):

```markdown
# Manual SERP Review Checklist — Phase 2.6 Compensating Control

**Why this exists:** Phase 2 used proxied R3 keyword data (PITFALLS §4.1 verbatim H-tag scaffolding) instead of Ahrefs/DataForSEO purchase. This checklist captures top-10 SERP entity coverage validation for top-5 EN + top-3 HE Jerusalem keywords.

**How to fill:** for each keyword below, open Google.com (incognito; language=en for EN keywords, language=he for HE keywords), inspect top-10 results, list each result's title + URL, then complete the entity-coverage table.

**Verdict rules:**

- PASS: ≥7/10 of the top-10 results' main entities/topics are covered by our H-tag structure
- REWORK: <7/10 — cycle back to 2.1/2.2/2.3 with specific edit suggestions

---

## Keyword 1: `things to do in jerusalem` (EN primary canonical)

**Inspected:** YYYY-MM-DD
**Top 10 Google results:**

1. [title] — [url]
2. ...
3. ...

**Our entity coverage:**
| Entity from SERP top-10 | In our H-tag structure? | Section |
|---|---|---|
| Western Wall | ✓/✗ | |
| Old City Quarters | ✓/✗ | |
| Holy Sepulchre | ✓/✗ | |
| Mahane Yehuda | ✓/✗ | |
| Yad Vashem | ✓/✗ | |
| Day trips (Dead Sea / Bethlehem) | ✓/✗ | |
| <other entity> | ✓/✗ | |

**Verdict:** PASS | REWORK (with specific edit suggestion)

---

## Keyword 2: `jerusalem itinerary` (EN secondary)

[same template]

## Keyword 3: `jerusalem hotels` (EN secondary)

[same template]

## Keyword 4: `jerusalem tours` (EN secondary)

[same template]

## Keyword 5: `best time to visit jerusalem` (EN secondary)

[same template]

## Keyword 6: `מה לעשות בירושלים` (HE primary)

[same template]

## Keyword 7: `טיולים בירושלים` (HE secondary)

[same template]

## Keyword 8: `העיר העתיקה ירושלים` (HE secondary)

[same template]
```

Avoid: making SERP review automatable (CONTEXT.md explicitly defers automation); making the gate failure-tolerant (the gate is the hard stop — exit codes ARE the protocol).
</action>
<verify>
<automated>pnpm typecheck scripts/audit/quality-gate.ts</automated>
<automated>pnpm test --run tests/qa/quality-gate-content-mode.test.ts</automated>
<automated>test -f data/manual-serp-review-checklist.md</automated>
</verify>
<done>quality-gate.ts auto-detects content-mode from contentPages.length (refactor if needed); Vitest test pins both structural + content mode behaviors; manual SERP review checklist template exists with 8 keyword sections.</done>
</task>

<task type="auto">
  <name>Task 2: Run full QA pipeline (build + audit + lighthouse + axe + a11y-il) + execute manual SERP review against the 8 keywords + fix any REWORK findings</name>
  <files>
    data/audit-results.json,
    data/lighthouse-results.json,
    data/axe-results.json,
    data/a11y-il-results.json,
    data/serp-review.md
  </files>
  <action>
**1. Full build:**
```
pnpm velite
pnpm build
```
Every Jerusalem page must prerender successfully. Count pages: 1 region pair (2) + 7 sub-dest pairs (14) + 1 itinerary pair (2) + homepage (2) + regions index (2) + 5 legal × 2 (10) = ~32 pages.

**2. Full audit:**

```
pnpm qa:credits
pnpm qa:schema
pnpm qa:ner
pnpm qa:audit                  # writes data/audit-results.json
pnpm qa:hebrew-content         # all HE pages pass
```

Inspect `data/audit-results.json`: every Jerusalem page must be present with a score. Note any page below 85 — fix in this task before running the gate.

**3. Lighthouse CI 3-run-median:**

```
pnpm qa:lighthouse              # = lhci autorun && persist-lhci
```

This runs Lighthouse 3 times per URL and computes median. The `.lighthouserc.cjs` config from Phase 1 has the 4 thresholds asserted (perf≥0.90, a11y≥0.95, best-practices≥0.95, SEO=1.00). If any page fails any threshold, the command exits non-zero — fix the issue (typically: missing alt text, slow LCP, missing meta description) and re-run.

Note for Windows execution: Lighthouse requires Chrome installed and `pnpm build && pnpm start` in a separate shell. The `qa:lighthouse` script handles autorun against `pnpm start`-served URLs; if it crashes on cold start, run `pnpm build` first, then `pnpm start &` and `pnpm lhci autorun` separately.

**4. Axe-core full sweep:**

```
pnpm qa:axe
```

Phase 1 plan 11 may have wired real axe-core (or it may still be the stub). If stub, swap to real invocation here — install `@axe-core/cli` if needed, configure to crawl the built pages, write results to `data/axe-results.json`. Acceptable to keep stub if Phase 1 left it as such — the script must exit 0 with the result file written either way (per stub-on-error pattern from plan 10).

**5. IS 5568 supplementary a11y:**

```
pnpm qa:audit-a11y
```

Python wrapper invokes `audit_a11y.py` from israeli-accessibility-compliance skill bundle. Results to `data/a11y-il-results.json`. Same stub-on-error policy — if Python not installed locally, wrapper writes status=fail stub and exits 0.

**6. Manual SERP review (the compensating control):**

Open `data/manual-serp-review-checklist.md` (from task 1). For each of 5 EN + 3 HE keywords:

- Open Google.com in incognito (set browser language to en for EN keywords, he for HE keywords)
- Inspect top-10 results — note title + URL of each
- Fill the entity-coverage table — for each entity that appears in the top-10's main topics, check whether OUR Jerusalem canonical (`/jerusalem/` or `/en/jerusalem/`) has that entity in an H1/H2/H3
- Compute verdict: ≥7/10 entities covered → PASS; <7/10 → REWORK with specific edit suggestion

Write the completed review to `data/serp-review.md` (NOT the checklist file — checklist is the template; serp-review.md is the filled instance).

**REWORK path:** If any keyword verdicts REWORK, the executor must:

- Cycle back to plan 02-01/02/03 (whichever owns the missing entity)
- Make targeted MDX edits to add the missing entity to an appropriate H-tag
- Re-run pnpm velite + qa:audit + qa:hebrew-content
- Re-verify the SERP coverage for that keyword
- Update `data/serp-review.md` to PASS for that keyword
- THEN proceed to task 3 (Quality Gate)

**Note:** Quality Gate criterion list does NOT include SERP review (it's compensating control, informational). But REWORK findings represent latent quality problems that the gate's content audits may catch downstream. Better to fix here than fail the gate.

**7. Verify zero placeholder `__REQUIRES_USER_INPUT__` strings anywhere:**

```
git grep -E '__REQUIRES_USER_INPUT__' content/ data/ app/
```

Must return nothing.

Avoid: skipping SERP review (CONTEXT.md mandates it as compensating control); running pnpm qa:quality-gate before REWORK edits land; ignoring Lighthouse threshold failures (the gate criterion 1 will fail).
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:axe || true</automated>
<automated>pnpm qa:audit-a11y || true</automated>
<automated>test -f data/serp-review.md && grep -c "Verdict" data/serp-review.md | awk '{if($1<8){exit 1}}'</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const jerusalemPages=r.filter(p=>p.slug==='jerusalem'||p.region==='jerusalem'||p.slug.startsWith('jerusalem-')||p.slug.includes('jerusalem')); const bad=jerusalemPages.filter(p=>p.score<85); if(bad.length){console.error('pages below 85:',bad.map(p=>p.lang+'/'+p.slug));process.exit(1);} console.log(jerusalemPages.length,'Jerusalem pages all >=85')"</automated>
</verify>
<done>Full QA pipeline ran successfully; all Jerusalem pages score ≥85; data/audit-results.json + data/lighthouse-results.json + data/axe-results.json + data/a11y-il-results.json all written; data/serp-review.md has 8 keyword verdicts (5 EN + 3 HE); any REWORK findings have been addressed and re-verified to PASS.</done>
</task>

<task type="auto">
  <name>Task 3: Execute pnpm qa:quality-gate — HARD GATE</name>
  <files>
    data/quality-gate-pass.md,
    data/quality-gate-failure.md
  </files>
  <action>
**This is the ROADMAP-mandated hard stop between Phase 2 and Phase 3.**

1. **Final pre-gate check** — all of the following must already be true from task 2:
   - `data/audit-results.json` exists and is fresh
   - `data/lighthouse-results.json` exists with 3-run-median entries for every Jerusalem page
   - `data/serp-review.md` is filled and all verdicts are PASS
   - No `__REQUIRES_USER_INPUT__` placeholders anywhere
   - Pre-commit hook does not block this commit (it shouldn't — we're only writing data/\*.md and reading)

2. **Execute the gate:**

   ```
   pnpm qa:quality-gate
   ```

3. **Inspect exit code and outcome:**

   **PASS path (exit 0):**
   - `data/quality-gate-pass.md` written with 10 criteria each marked PASS with evidence link
   - Commit the pass artifact
   - Phase 3 is unblocked. The orchestrator can proceed to plan-phase for Phase 3.
   - Update STATE.md: Phase 2 complete; Phase 3 (Region Replication) eligible to start; Quality Gate PASS dated YYYY-MM-DD.

   **FAIL path (exit 1):**
   - `data/quality-gate-failure.md` written with:
     - Which criterion(ia) failed
     - Suspected cause (per criterion)
     - Proposed fix (per criterion)
   - Commit the failure artifact
   - **HALT the phase.** Do NOT proceed to Phase 3.
   - Surface the report to the user with a clear message:

     ```
     ## QUALITY GATE FAILED — Phase 2 stopped

     <N> of 10 criteria failed. See data/quality-gate-failure.md for details.

     Phase 3 (Region Replication) is BLOCKED until the gate passes.

     Options:
       1. Address the failures (recommended). Each failing criterion has a proposed fix in the failure report. Once fixed, re-run `pnpm qa:quality-gate`.
       2. Override (NOT recommended). Document rationale; future regressions will be harder to detect because the gate has been bypassed once.

     Which option?
     ```

4. **For FAIL path with user choosing option 1:** the executor should drop back into a fix loop — re-run task 2's relevant subset (e.g., if Lighthouse failed → fix the perf issue and re-run pnpm qa:lighthouse; if audit failed → fix the AUD rule violation and re-run pnpm qa:audit) — then re-execute task 3 (gate).

5. **Update `.planning/STATE.md`** with the verdict regardless:
   - PASS: append to "Last activity" describing the verdict, dated 2026-05-DD; flip phase 2 to completed in the progress table
   - FAIL: append to "Blockers/Concerns" with the failure summary; do NOT flip phase 2 to completed

Avoid: running the gate before SERP review is complete (Quality Gate doesn't check SERP review, but REWORK findings imply latent content issues that audit may catch); committing pass artifact when criteria failed (only one of the two markdown files should exist for a given gate run — delete the stale one).
</action>
<verify>
<automated>pnpm qa:quality-gate</automated>
<automated>test -f data/quality-gate-pass.md && grep -E "(PASS|✓)" data/quality-gate-pass.md | wc -l || test -f data/quality-gate-failure.md</automated>
<automated>node -e "const fs=require('fs'); const pass=fs.existsSync('data/quality-gate-pass.md'); const fail=fs.existsSync('data/quality-gate-failure.md'); if(pass&&fail){console.error('both pass + failure files exist — delete the stale one');process.exit(1);} if(!pass&&!fail){console.error('neither file exists — gate did not run');process.exit(1);} console.log(pass?'PASS':'FAIL')"</automated>
</verify>
<done>Either data/quality-gate-pass.md (10/10 criteria green, exit 0 → Phase 3 unblocked) OR data/quality-gate-failure.md (failing criteria documented, exit 1 → HARD STOP) exists. STATE.md updated with verdict. If FAIL, user has been surfaced the report and asked to choose fix-vs-override.</done>
</task>

</tasks>

<verification>
- `scripts/audit/quality-gate.ts` auto-flips out of `phase1StructuralOnly` when contentPages.length > 0 (verified by tests/qa/quality-gate-content-mode.test.ts)
- `data/audit-results.json` contains every Jerusalem page (~32 pages) with score ≥85
- `data/lighthouse-results.json` contains 3-run-median entries for every Jerusalem page meeting thresholds (perf≥0.90 / a11y≥0.95 / bp≥0.95 / SEO=1.00)
- `data/serp-review.md` has 8 keyword sections (5 EN + 3 HE) with verdicts; any REWORK has been resolved and re-verified to PASS
- `pnpm qa:audit` reports 0 critical-severity violations across all Jerusalem pages
- `pnpm qa:credits` exits 0 (criterion 6)
- `pnpm qa:schema` exits 0 (criterion 9)
- `pnpm qa:quality-gate` writes EXACTLY ONE of `data/quality-gate-pass.md` or `data/quality-gate-failure.md` and exits with the corresponding code (0 or 1)
- STATE.md reflects the verdict
- No `__REQUIRES_USER_INPUT__` strings anywhere in repo
</verification>

<success_criteria>
**PASS scenario:** Quality Gate writes `data/quality-gate-pass.md` with all 10 criteria green; Phase 2 is complete; Phase 3 (Region Replication, plan/gsd:plan-phase 03) is unblocked. STATE.md flips phase 2 to completed.

**FAIL scenario:** Quality Gate writes `data/quality-gate-failure.md` identifying which of the 10 criteria failed, suspected causes, and proposed fixes; workflow halts; user is surfaced the report and asked to choose fix-vs-override. Phase 3 remains BLOCKED until a subsequent gate run passes. This is the intended hard-stop behavior — failure is a legitimate, valuable outcome that prevents shipping defective infrastructure into Phase 3 scale.
</success_criteria>

<output>
After completion, create `.planning/phases/02-pilot-region-jerusalem-m2/02-06-SUMMARY.md` summarizing:
- Quality Gate generator refactor (if any) to ensure auto content-mode flip
- Full QA pipeline run order + total wall-clock time
- Manual SERP review summary (per-keyword verdicts; any REWORK fixes applied)
- Lighthouse score breakdown (per-page perf/a11y/bp/seo medians)
- Audit score breakdown (per-page; profile-aware)
- Cross-page AUD rule violation summary (which rules fired, on which pages, severities)
- Quality Gate verdict (PASS or FAIL with per-criterion detail)
- If PASS: roll-forward to Phase 3 prep (region replication order: Tel Aviv → Dead Sea → Galilee → ...)
- If FAIL: per-criterion failure analysis + proposed remediation; backlog of changes needed before re-running gate
- Total Phase 2 wall-clock time (sum of plans 02-01..06)
- Lessons learned: anything that should flow back to PROJECT.md decisions or ROADMAP.md Phase 3+ planning
</output>
