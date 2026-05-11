---
phase: 01-foundation-m1
plan: 09
subsystem: audit
tags:
  [
    ner,
    mention-detection,
    regex,
    audit,
    tsx,
    monetization-gaps,
    argentina-lesson-6,
  ]

# Dependency graph
requires:
  - phase: 01-foundation-m1
    provides: Velite content-pipeline shape (plan 04), AffiliateCard partner wiring (plan 06), 5 quality-scoring profiles (plan 07), canonical-URL helper + paired-naming dictionary (plan 08)
provides:
  - data/entity-dict.json — 6 entity classes × 113 starter entries
  - lib/ner/types.ts — EntityClass, Mention, NerResultEntry contract
  - lib/ner/detector.ts — detectMentions(body, lang) regex scanner with suggestedAction policy
  - scripts/audit/scan-ner.ts — Velite-walking integration script (run via tsx)
  - pnpm qa:ner CLI — writes data/ner-results.json for plan 10 audit dashboard
affects: [10-audit-dashboard, Phase 2 region-canonical, Phase 6 NER monitoring]

# Tech tracking
tech-stack:
  added: [] # tsx already in devDeps from plan 01; glob already in deps from plan 03
  patterns:
    - 'Dictionary-backed regex NER (RESEARCH §1.11): one regex per (class, entity) pair, case-insensitive + word-boundary, sorted output by source position'
    - '±300 char coverage window heuristic: <AffiliateCard partner=> ⇒ no-action; <Link href=> ⇒ no-action; else suggestedAction by class'
    - 'Phase-1 greenfield-tolerant audit scripts: empty .velite/ → empty JSON output, exit 0 (NOT non-zero); plan 10 can wire qa:ner into pre-deploy CI today'
    - 'TypeScript audit scripts via tsx (.ts not .mjs): scripts/audit/scan-ner.ts imports detector.ts directly with no JS shim — single source of truth for Mention type'

key-files:
  created:
    - data/entity-dict.json
    - lib/ner/types.ts
    - lib/ner/detector.ts
    - lib/ner/__tests__/entity-dict.test.ts
    - lib/ner/__tests__/detector.test.ts
    - scripts/audit/scan-ner.ts
    - tests/ner/scan-ner.test.ts
  modified:
    - package.json
    - .gitignore

key-decisions:
  - 'Entity dict structure: 6 classes (tour/hotel/restaurant/museum/transport/religious_site) keyed top-level; _meta block documents schema/convention without being iterated as a class'
  - 'Suggestion policy three-bucket: hotel|tour|transport ⇒ add-affiliate (when no nearby AffiliateCard); museum|religious_site|restaurant ⇒ add-internal-link (when no nearby Link); otherwise no-action'
  - '.ts (not .mjs) for scripts/audit/scan-ner.ts — invoked via tsx so detector.ts imports without compilation; filename and `pnpm qa:ner` invocation agree (iteration-1 fix landed)'
  - 'Greenfield scan-ner returns [] + exits 0 (not error): the empty case is the Phase 1 success case and plan 10 must consume the file unconditionally'
  - 'religious_site entries overlap religious-sites.json EN names ≥8 (test-pinned) — same canonical entities, two consumers (NER detector + religious-naming audit AUD-017..020)'
  - "process.cwd() over import.meta.url for repo-root resolution in scan-ner.test.ts: Vite's test transform doesn't always yield a file: URL under jsdom; vitest cwd is reliably repo root"

patterns-established:
  - 'Pattern: audit-scripts colocate JSON output in data/ and add to .gitignore (consistent with audit-results.json, lighthouse-results.json, quality-gate-*.md)'
  - 'Pattern: tsx-based TypeScript script files in scripts/audit/ that import lib/* directly (no compile step) — extension agreement between filename and CLI invocation'
  - 'Pattern: detector outputs sorted by source span (start ascending) — readers (plan 10 dashboard, future codemods) get source-order traversal for free'

requirements-completed: [FND-07]

# Metrics
duration: 11 min
completed: 2026-05-11
---

# Phase 1 Plan 09: NER Detection Summary

**Dictionary-backed regex mention detector with ±300-char `<AffiliateCard>`/`<Link>` coverage heuristic, 113-entity seed dict, and tsx-based Velite scanner producing `data/ner-results.json` for the audit dashboard.**

## Performance

- **Duration:** 11 min
- **Started:** 2026-05-11T02:56:27Z
- **Completed:** 2026-05-11T03:07:28Z
- **Tasks:** 3 (1 standard + 2 TDD)
- **Files created:** 7
- **Files modified:** 2
- **Net new tests:** 41 (17 entity-dict + 19 detector + 5 scan-ner)
- **Total tests in repo:** 380 (was 339)

## Accomplishments

- **FND-07 closed.** Argentina lesson #6 (monetization opportunities buried in content) now has a structural fix: every mention of a known entity in any MDX body gets a `Mention` record with a `suggestedAction` hint surfaced to the audit dashboard.
- **6-class seed dictionary** with 113 starter entries — tour (14), hotel (24), restaurant (21), museum (18), transport (16), religious_site (23). `religious_site` overlaps `data/religious-sites.json` EN names by ≥8 entries (test-pinned).
- **Regex detector** with case-insensitive word-boundary matching, source-order output, ±300-char coverage heuristic, and ±50-char `contextSample` for dashboard rendering.
- **Integration script `scripts/audit/scan-ner.ts`** runs via `pnpm qa:ner` — walks `.velite/*.json`, scans each `{ slug, lang, body }` entry, writes `data/ner-results.json` sorted by slug. Phase 1 greenfield (no Velite output) → writes `[]` and exits 0.
- **Iteration-1 plan fix honored:** filename is `.ts` (not `.mjs`) so `pnpm qa:ner` (= `tsx scripts/audit/scan-ner.ts`) and the actual file extension agree.

## Task Commits

1. **Task 1: entity-dict.json seed + structural tests** — `ddadcd5` (feat)
2. **Task 2 RED: failing detector tests + Mention types** — `f059583` (test)
3. **Task 2 GREEN: detectMentions implementation** — `c59c242` (feat)
4. **Task 3 RED: failing scan-ner integration tests** — `fd9367e` (test)
5. **Task 3 GREEN: scan-ner.ts + qa:ner CLI + .gitignore** — `b657e6a` (feat)

**Plan metadata:** (next commit — final docs)

## Files Created/Modified

### Created

- `data/entity-dict.json` — 6-class entity seed (113 entries) + `_meta` documentation block. Canonical English names; detector matches case-insensitive.
- `lib/ner/types.ts` — `EntityClass`, `SuggestedAction`, `Mention`, `NerResultEntry`. Single source of truth for the NER contract consumed by plan 10.
- `lib/ner/detector.ts` — `detectMentions(body, lang): Mention[]`. Walks dict × body via case-insensitive word-boundary regex; classifies via `suggestActionFor(klass, ctx)`; sorts by source position.
- `lib/ner/__tests__/entity-dict.test.ts` — 17 structural tests (class set, ≥10 entries each, uniqueness, religious_site overlap, FND-07 anchor presence).
- `lib/ner/__tests__/detector.test.ts` — 19 behavioral tests (all 9 PLAN.md behaviors + case-insensitive, word-boundary, contextSample window, source-ordered output, repeated-entity spans).
- `scripts/audit/scan-ner.ts` — Velite-walking integration script. Invoked via `tsx`. Defensive: skips non-array files, malformed entries, invalid `lang`.
- `tests/ner/scan-ner.test.ts` — 5 integration tests via temp-sandbox child-process spawn pattern (mirrors plan 03's `check-credits` sandbox tests).

### Modified

- `package.json` — added `"qa:ner": "tsx scripts/audit/scan-ner.ts"` script.
- `.gitignore` — added `data/ner-results.json` (ephemeral, regenerated per CI run).

## Decisions Made

(Captured in frontmatter `key-decisions`; expanded below.)

### Entity-dict structure: keyed top-level by class, `_meta` block documents schema

The JSON has 6 top-level array keys plus a `_meta` documentation block. Detector filters `_meta` out via `key === '_meta'` rather than via a deeper nested `classes: {...}` shape because:

- Plan 10 will read this file directly with no wrapper; a flat shape lets the dashboard surface "classes" without extra unwrapping.
- The `_meta` block keeps the schema/convention/seed-size rationale right next to the data — no separate README needed.

### Three-bucket suggestion policy with named constants

```ts
const AFFILIATE_CLASSES = new Set(['hotel', 'tour', 'transport']);
const INTERNAL_LINK_CLASSES = new Set([
  'museum',
  'religious_site',
  'restaurant',
]);
```

vs. an inline ternary chain like the RESEARCH §1.11 outline. The Set abstraction makes Phase 2 expansion (e.g., adding `cuisine` to add-internal-link) one line instead of refactoring nested ternaries. Both `AFFILIATE_CARD_RE` and `INTERNAL_LINK_RE` are case-insensitive and match the actual JSX form the rest of the codebase uses (`<AffiliateCard partner=...>`, `<Link href=...>`).

### `.ts` over `.mjs` for `scripts/audit/scan-ner.ts`

The PLAN.md was revised in iteration 1 because the original `.mjs` filename couldn't import `detector.ts` directly without a JS shim. Standardizing on `.ts` + tsx for audit scripts means:

- One source of truth for the `Mention` type.
- `pnpm qa:ner` script entry (`tsx scripts/audit/scan-ner.ts`) matches the actual filename.
- Future audit scripts (plan 10) can adopt the same pattern uniformly.

### Greenfield empty → success (not error)

The Phase 1 reality is that `.velite/` does not exist (content hasn't been built yet). The script returns `[]` and exits 0, not 1. This lets plan 10 wire `pnpm qa:ner` into pre-deploy CI today, and lets the plan-10 dashboard render the "0 mentions" empty state cleanly without conditional file existence checks.

### `process.cwd()` over `import.meta.url` in test path resolution

The Vite test transform under jsdom doesn't always yield a `file:` URL for `import.meta.url`, causing `fileURLToPath()` to throw `TypeError: The URL must be of scheme file`. Since vitest sets `cwd` = repo root, `process.cwd()` is a reliable substitute. Pattern reusable for future audit-script sandbox tests.

### Defensive entry filtering in scan-ner.ts

Each `.velite/*.json` file is parsed and entries are filtered three ways:

1. `Array.isArray(data)` — Velite's object-shaped collections are skipped (some collections emit object maps).
2. Per-entry `isPlainObject` + non-empty `slug` + non-empty `body` checks.
3. `lang in {'he','en'}` literal check — the detector signature demands this union, so anything else is dropped.

Defensive filtering means a single broken Velite output never crashes the audit pipeline.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] `import.meta.url` not a file URL under Vite/jsdom test transform**

- **Found during:** Task 3 RED (first attempt to run `tests/ner/scan-ner.test.ts`)
- **Issue:** Initial test used `fileURLToPath(new URL('.', import.meta.url))` to find repo root. Vite's test transform under jsdom yielded a non-`file:` URL, throwing `TypeError: The URL must be of scheme file`. All 5 tests failed at suite-collect time before they could exercise the script.
- **Fix:** Switched to `const REPO_ROOT = process.cwd();` since vitest runs with cwd at repo root. Added platform-aware `tsx.cmd` selection for the Windows binary path.
- **Files modified:** `tests/ner/scan-ner.test.ts` (path resolution block, lines 30–40)
- **Verification:** RED then re-ran — tests now correctly fail with "scripts/audit/scan-ner.ts not found" (RED proven) before GREEN.
- **Committed in:** `fd9367e` (Task 3 RED commit, after the fix)

**2. [Rule 3 - Blocking] Unused `eslint-disable no-console` directives in scan-ner.ts**

- **Found during:** Task 3 post-GREEN lint check
- **Issue:** Initial scan-ner.ts had three `// eslint-disable-next-line no-console` comments above `console.log`/`console.error` calls. The `no-console` rule isn't enabled in this codebase's eslint.config.js, so each directive triggered an "unused eslint-disable" warning (3 warnings, 0 errors).
- **Fix:** Removed all three disable directives. console calls run unimpeded; no rule changes.
- **Files modified:** `scripts/audit/scan-ner.ts`
- **Verification:** `pnpm lint` exits clean (0 warnings, 0 errors); `pnpm qa:ner` still succeeds.
- **Committed in:** part of `b657e6a` (Task 3 GREEN — the disables were removed before staging).

---

**Total deviations:** 2 auto-fixed (2 blocking).
**Impact on plan:** Both fixes were diagnostic-quality issues that didn't change the deliverable shape. No scope creep, no architectural change.

## Issues Encountered

None. Linter (prettier-plugin-tailwindcss + eslint --fix via lint-staged) reformatted two files post-commit; content semantics unchanged.

## User Setup Required

None — no external service configuration required by plan 09.

## Next Phase Readiness

**Ready for plan 10 (audit dashboard).** The contract for plan 10 is:

- Read `data/ner-results.json` (sorted by slug; `[]` if no content yet).
- Per-page, surface `Mention` records with `suggestedAction !== 'no-action'` as a "monetization gap" row.
- Treat `mentions.length` per page as an input to the FND-05 quality-profile scoring (Argentina lesson #6 closure).
- `pnpm qa:ner` can be invoked from `scripts/audit/run.mjs` orchestrator before scoring, OR plan 10 can require qa:ner to have run as a prereq step (recommend the latter — `run.mjs` should not spawn subprocesses).

**Wave 7 (plan 10 audit dashboard) is unblocked.** All Wave 6 dependencies satisfied:

- `lib/ner/detector.ts` and `data/ner-results.json` contract: published.
- `lib/seo/canonicalUrl` (plan 08) for suggesting internal-link targets: published.
- `scripts/audit/profiles/*` (plan 07) for per-profile scoring: published.

---

_Phase: 01-foundation-m1_
_Completed: 2026-05-11_

## Self-Check: PASSED

All 8 files exist on disk; all 5 task commits present in git log.
