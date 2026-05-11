---
phase: 01-foundation-m1
plan: 07
subsystem: audit
tags:
  [
    quality-profiles,
    fnd-05,
    audit-rules,
    argentina-lesson-5,
    profile-distinctness,
    rule-weights,
    detect-heuristic,
    aud-001-to-034,
  ]

requires:
  - phase: 01-foundation-m1/01-scaffold
    provides: 'Velite collections frontmatter shape (lang, collection, isHub?, isUtility?) consumed by detectProfile heuristic'
  - phase: 01-foundation-m1/04-schema-baseline
    provides: 'schema-dts type names (TouristDestination, TouristAttraction, BreadcrumbList, FAQPage, CollectionPage, WebPage, LocalBusiness) referenced by each profile`s requiredSchemaTypes'
  - phase: 01-foundation-m1/06-affiliate-helpers
    provides: 'AUD-002 (raw partner URL) + AUD-009 (FTC disclosure within first viewport-height) + AUD-031 (Israel affiliate fixture) audit rules whose weights this plan assigns per profile'

provides:
  - '5 ProfileSpec objects in `scripts/audit/profiles/`: REGION_CANONICAL, SUB_DESTINATION, GUIDE_OR_WINERY, UTILITY, HUB — each with distinct weight matrix across the 5 audit rule categories (schema, affiliates, photos, length, hreflang/canonical/a11y)'
  - 'Profile distinctness on every meaningful axis: minWordCount (1500/800/600/0/0), minAffiliates (5/1/1/0/0), requiredSchemaTypes (5 disjoint sets), weight matrices (5 unique fingerprints)'
  - '`detectProfile(frontmatter): ProfileId` heuristic with fail-loud dispatch — throws on unknown collection rather than silently defaulting (fixes Argentina lesson #5 root cause)'
  - '`profiles` barrel record keyed by ProfileId — plan 10 imports `{ profiles, detectProfile, type ProfileSpec }` from a single surface'
  - '29 Vitest tests (9 detectProfile + 11 distinctness + 9 scoring math) proving the profiles MATTER: same AUD-009 finding scores -8 on REGION but 0-impact on UTILITY; same AUD-027 finding scores -4 on REGION but -12 on UTILITY'
  - 'Profile-specific weight choices documented inline in each spec file so plan 10 (audit dashboard) and future maintainers see the rationale at the call site, not buried in a separate doc'

affects:
  [
    08-seo-config,
    09-ner-detection,
    10-audit-dashboard,
    11-lighthouse-ci,
    02-pilot-jerusalem (Phase 2),
    03-region-replication (Phase 3),
  ]

tech-stack:
  added:
    - '(none — pure TypeScript spec files; no runtime deps added)'
  patterns:
    - 'ProfileSpec-as-data pattern: profiles are plain TypeScript objects with `as const` widening, not classes/factories. Plan 10`s scorer reads `.weights` directly — no constructor overhead, fully tree-shakable, zero ambiguity about which weight applies when. Inline `as const` preserves precise literal types so the typechecker catches typos in rule IDs (`AUD-001` vs `AUD-001 `).'
    - 'Sum-≤100 with reserved cushion pattern: REGION_CANONICAL sums to exactly 100; SUB_DESTINATION 100; GUIDE_OR_WINERY 95; UTILITY 94; HUB 92. Cushions (5/6/8 points) are intentional reservations for future AUD-035-class rules that will be added without busting the cap. Documented in each profile file`s trailing comment.'
    - 'Omit-rule-to-signal-irrelevance pattern: UTILITY + HUB profiles intentionally OMIT AUD-009 from their weights arrays (rather than weighting it 0). Plan 10`s scorer treats absent rules as weight 0, so utility pages with affiliate-disclosure findings won`t be penalized. Two contracts test this explicitly: `UTILITY.weights.find(w => w.rule === "AUD-009")` must return undefined.'
    - 'Fail-loud detectProfile pattern: when frontmatter has an unknown collection AND no override flag, throw `Cannot detect profile for collection=<x>` rather than fall back to a default. Argentina lesson #5 root cause was silent defaulting — every page got the same generic rubric. Tests pin this behavior on `collection: "unknown"` and `collection: ""`.'
    - 'Co-located test directory pattern: `scripts/audit/profiles/__tests__/` mirrors `lib/affiliate/__tests__/`. Required adding `scripts/**/__tests__/**/*.test.ts` to vitest.config.ts include array — first plan to put tests under `scripts/`. Pattern matches plan 03 photo-credits, plan 04 schema-baseline conventions.'
    - 'Profile-distinctness fingerprint pattern: `profiles.test.ts` serializes each profile`s weights array via `JSON.stringify` into a Set; expects size === 5. If two profiles ever drift to byte-identical weights (the lesson-#5 anti-pattern resurfacing), this test fails immediately. Belt-and-suspenders alongside individual rule-by-rule comparisons.'
    - 'Cross-profile differential scoring proof: `region_canonical-score.test.ts` does NOT just test REGION in isolation — it asserts that the SAME issue produces DIFFERENT scores under UTILITY vs REGION_CANONICAL (e.g., AUD-027 → -4 vs -12). This proves the profiles aren`t cosmetic; they materially change scoring outcomes.'

key-files:
  created:
    - scripts/audit/profiles/types.ts
    - scripts/audit/profiles/region_canonical.ts
    - scripts/audit/profiles/sub_destination.ts
    - scripts/audit/profiles/guide_or_winery.ts
    - scripts/audit/profiles/utility.ts
    - scripts/audit/profiles/hub.ts
    - scripts/audit/profiles/detect.ts
    - scripts/audit/profiles/index.ts
    - scripts/audit/profiles/__tests__/detect.test.ts
    - scripts/audit/profiles/__tests__/profiles.test.ts
    - scripts/audit/profiles/__tests__/region_canonical-score.test.ts
  modified:
    - vitest.config.ts
    - .planning/phases/01-foundation-m1/deferred-items.md

key-decisions:
  - 'REGION_CANONICAL.minAffiliates=5 / SUB+GUIDE.minAffiliates=1 / UTILITY+HUB.minAffiliates=0 enforces affiliate-portfolio diversity at the top of the funnel only — Argentina lesson #2 (one partner at 92%) is structurally addressed because the page archetype that drives the most clicks (REGION_CANONICAL) DEMANDS 5 distinct partners.'
  - 'SUB_DESTINATION boosts AUD-006 (sub-dest H1 cannibalization) from weight 3 to weight 7 vs REGION_CANONICAL — Argentina lesson #4 (Mendoza canonical out-ranked by Mendoza wineries page for "Mendoza" keyword) is structurally addressed because the profile most likely to commit cannibalization is the one penalized hardest for it.'
  - 'UTILITY profile heavily weights AUD-027 (lang/dir), AUD-028 (a11y-statement footer link), AUD-033 (canonical+schema+meta+OG+hreflang) each at ≥10 points — utility pages ARE the a11y/compliance surface, so the scoring reflects that. Same rules on REGION_CANONICAL weight 4/3/5 (still required but proportional to less-concentrated surface).'
  - 'HUB profile boosts AUD-026 (restricted-site image rights) from weight 5 (REGION) to weight 7 — hub tiles are the thumbnail surface where Western Wall / Bahá`í Gardens / Dome of the Rock images first appear in the user journey. AUD-026 weight ordering: HUB(7) > SUB(6) = GUIDE(6) > REGION(5) > UTILITY(0) reflects where the rule fires most frequently.'
  - 'GUIDE_OR_WINERY requires Article + LocalBusiness schema — schema-dts v2 ships the Article type but plan 04 didn`t build an `articleSchema()` generator (only TouristDestination/Place/etc.). Plan 10 audit dashboard will report a `requiredSchemaTypes` miss when GUIDE pages first land, which drives the Phase 3 task to add the Article generator. Deferred-by-design rather than deferred-by-accident.'
  - 'detectProfile throws on unknown collection — never silently falls back. Encoded TWO failure modes (unknown name + empty string) in detect.test.ts to prevent regression. This is the structural fix for Argentina lesson #5 (uniform scoring → no signal).'
  - 'UTILITY + HUB OMIT AUD-009 from their weights arrays (rather than setting weight: 0) — explicit omission documents that the rule is intentionally inapplicable, not just zero-weight. Tests assert `find(w => w.rule === "AUD-009")` returns undefined for both profiles. Future maintainers reading the file see absent rather than zero.'
  - 'Weight sums ≤ 100 with documented cushions: REGION/SUB at 100, GUIDE at 95, UTILITY at 94, HUB at 92. Cushion magnitudes (5/6/8) correlate with how likely each profile is to need new rules — HUB has the largest reserve because future "internal-link density" / "breadcrumb depth" rules (AUD-035 class) will land there first.'

patterns-established:
  - 'ProfileSpec-as-data over factory functions — readable at call site, tree-shakable, type-precise'
  - 'Omit-to-signal-irrelevance over weight-zero — explicit absence beats silent zero in the source'
  - 'Cross-profile differential scoring tests over single-profile unit tests — proves the design works, not just compiles'
  - 'Co-located tests under `scripts/audit/profiles/__tests__/` matches `lib/affiliate/__tests__/` precedent'
  - 'Fail-loud heuristic dispatch over silent fallback — every Argentina lesson #5 regression vector closed at the boundary'

requirements-completed:
  - FND-05

duration: 10min
completed: 2026-05-11
---

# Phase 1 Plan 07: Quality Scoring Profiles Summary

**5 ProfileSpec objects (REGION_CANONICAL / SUB_DESTINATION / GUIDE_OR_WINERY / UTILITY / HUB) with distinct weight matrices across AUD-001..034 audit rules, plus fail-loud `detectProfile(frontmatter)` heuristic — fixes Argentina lesson #5 (uniform scoring punished utility/hub pages unfairly).**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-05-11T02:34:43Z
- **Completed:** 2026-05-11T02:44:33Z
- **Tasks:** 3 of 3 complete
- **Files created:** 11 (8 profile/type/dispatch + 3 test files)
- **Files modified:** 2 (vitest.config.ts include array + deferred-items.md)
- **Tests added:** 29 (all green)

## Accomplishments

- 5 ProfileSpec objects exported with distinct weights, minWordCount, minAffiliates, requiredSchemaTypes — every meaningful axis differentiates the 5 page archetypes
- `detectProfile` heuristic dispatches Velite frontmatter → ProfileId with isUtility/isHub precedence over collection; throws fail-loud on unknown
- Cross-profile differential scoring tests prove the profiles MATTER: same AUD-009 finding scores -8 on REGION but 0-impact on UTILITY; same AUD-027 scores -4 on REGION but -12 on UTILITY
- Argentina lesson #5 (uniform rubric → no signal) structurally fixed: utility pages no longer penalized for missing FTC disclosure; sub-destinations no longer punished for not meeting region-canonical word-count
- Barrel export at `scripts/audit/profiles/index.ts` locks plan 10's import surface — `import { profiles, detectProfile, type ProfileSpec }` is the only surface plan 10 needs

## Task Commits

Each task was committed atomically:

1. **Task 1: ProfileSpec types + detectProfile heuristic + 5 profile spec files** — `553cead` (feat)
2. **Task 2: detectProfile contract tests (9 tests)** — `978f09e` (test)
3. **Task 3: profile distinctness + scoring math tests (20 tests across 2 files)** — `a8ed7d1` (test)

**Plan metadata commit:** TBD on final docs commit (this SUMMARY + STATE.md + ROADMAP.md + REQUIREMENTS.md).

## Files Created/Modified

### Created (11 files)

- `scripts/audit/profiles/types.ts` — ProfileSpec + RuleWeight + ProfileId contract (frozen interface for plan 10)
- `scripts/audit/profiles/region_canonical.ts` — REGION_CANONICAL spec (1500w, 5+ aff, sum=100)
- `scripts/audit/profiles/sub_destination.ts` — SUB_DESTINATION spec (800w, 1+ aff, sum=100, AUD-006 boosted)
- `scripts/audit/profiles/guide_or_winery.ts` — GUIDE_OR_WINERY spec (600w, 1+ aff, sum=95, AUD-018 boosted)
- `scripts/audit/profiles/utility.ts` — UTILITY spec (0w/0-aff, sum=94, AUD-027/028/033 each ≥10)
- `scripts/audit/profiles/hub.ts` — HUB spec (0w/0-aff, sum=92, AUD-026 boosted to 7 for thumbnails)
- `scripts/audit/profiles/detect.ts` — fail-loud heuristic with isUtility > isHub > collection precedence
- `scripts/audit/profiles/index.ts` — barrel: profiles record + detectProfile + types
- `scripts/audit/profiles/__tests__/detect.test.ts` — 9 tests covering all 7 dispatch behaviors + 2 throw cases
- `scripts/audit/profiles/__tests__/profiles.test.ts` — 11 tests: invariants (sum ≤ 100, cutoffs 85/80) + distinctness (5 unique fingerprints, AUD-009 omission proofs, AUD-026/027 boost proofs)
- `scripts/audit/profiles/__tests__/region_canonical-score.test.ts` — 9 tests: scoring math + cross-profile differential scoring (proves UTILITY ≠ REGION on same finding)

### Modified (2 files)

- `vitest.config.ts` — added `scripts/**/__tests__/**/*.test.ts` to include array (first plan to put tests under `scripts/`)
- `.planning/phases/01-foundation-m1/deferred-items.md` — logged out-of-scope plan-08 typecheck + test failures

## Decisions Made

Key decisions extracted to frontmatter `key-decisions`. Highlights:

- **Sum-≤100 with documented cushions** (5/6/8 points for GUIDE/UTILITY/HUB respectively) — intentional reservation for future AUD-035-class rules without busting the cap
- **Omit-rule-to-signal-irrelevance** over weight: 0 for AUD-009 on UTILITY+HUB — explicit absence documents the design intent ("affiliates don't appear on these pages")
- **Fail-loud `detectProfile`** throws on unknown collection — direct structural fix for Argentina lesson #5 (silent defaulting to a generic rubric)
- **Cross-profile differential scoring tests** prove the profiles change outcomes, not just exist
- **GUIDE.requiredSchemaTypes includes 'Article'** even though plan 04 didn't ship an Article schema generator — deliberately surfaces the Phase 3 task to add it

## Deviations from Plan

None — plan executed exactly as written. All 3 tasks shipped per the specified `<action>` blocks, all `<done>` criteria met. Profile attribute values match the plan's `must_haves.truths` exactly (1500/5/TouristDestination+BreadcrumbList+FAQPage for REGION; 800/1/TouristAttraction+BreadcrumbList for SUB; 600/1/Article+LocalBusiness for GUIDE; 0/0/WebPage for UTILITY; 0/0/CollectionPage for HUB).

The plan's verification step `<automated>pnpm typecheck</automated>` flagged a pre-existing error in `lib/seo/__tests__/metadata.test.ts(80,26)` — Twitter `card` property typing — that belongs to parallel-wave plan 08 (seo-config). Logged to deferred-items.md per SCOPE BOUNDARY rule; not a plan-07 deviation. Focused-tsc on plan 07's 11 files compiles clean with strict mode.

## Issues Encountered

**Issue 1: Vitest config doesn't discover `scripts/**/**tests**/**` by default**

- **Where:** `vitest.config.ts` `include` array.
- **Symptom:** First `pnpm test --run scripts/audit/profiles/__tests__/detect.test.ts` would have skipped the test if I hadn't pre-emptively added the glob.
- **Resolution:** Added `'scripts/**/__tests__/**/*.test.ts'` to the include array with an explanatory comment. Same plan also adds the first tests under `scripts/` — future maintainers see why the glob exists.
- **Verification:** `pnpm test --run scripts/audit/profiles/__tests__/` → 3 test files / 29 tests green.

**Issue 2: Full `pnpm test --run` shows 5 unrelated failures (plan 08 WIP)**

- **Where:** `tests/middleware/middleware.test.ts` (3 failures), `components/__tests__/footer-a11y.test.tsx` (2 failures).
- **Symptom:** Plan 08 (parallel Wave 5) has unstaged Footer.tsx modifications + untracked `lib/seo/accessibility-link.ts` + middleware test expectations for FND-06 features not yet implemented.
- **Resolution:** Logged to `deferred-items.md` Item 4 per SCOPE BOUNDARY rule. Plan 07 owns only `scripts/audit/profiles/**`; layout/middleware/seo are plan-08 territory per environment notes. Self-resolves when plan 08 completes its commit.
- **Verification:** Focused `pnpm test --run scripts/audit/profiles/__tests__/` → 29/29 green (plan-07 test surface independent of plan-08 WIP).

## User Setup Required

None — pure TypeScript spec files, no external services, no environment variables, no codemods.

## Next Phase Readiness

**Plan 08 (seo-config, parallel Wave 5):** Independent of plan 07's `scripts/audit/profiles/`. Plan 08 will complete its own Wave 5 deliverables (sitemap, robots, hreflang, canonical, 301s, accessibility-statement Footer wiring) without coordinating with plan 07.

**Plan 09 (NER detection, Wave 6):** Depends on plan 07's profile definitions to know which entity-class mentions matter per profile. Plan 07's `requiredSchemaTypes` arrays + `weights[].rule` references give plan 09 the shape it needs.

**Plan 10 (audit dashboard, Wave 7):** Primary consumer of this plan's deliverables.

```ts
// Plan 10 imports this single surface:
import {
  profiles,
  detectProfile,
  type ProfileSpec,
  type ProfileId,
  type RuleWeight,
} from '@/scripts/audit/profiles';

// Plan 10 scorer skeleton:
const id = detectProfile(velite.entry.frontmatter);
const spec = profiles[id];
const score = computeScore(findings, spec); // mirrors region_canonical-score.test.ts helper
```

**Plan 11 (Lighthouse CI, Wave 7):** Reads `profiles[id].scoreCutoffPilot` and `.scoreCutoffReplicated` for gate decisions (85 pilot / 80 replicated).

**Phase 2 (Pilot Jerusalem):** Jerusalem canonical will be scored against REGION_CANONICAL (1500w, 5 affiliates, TouristDestination+BreadcrumbList+FAQPage required, cutoff 85). Phase 2 Quality Gate Phase 2.6 reports against this profile.

**No blockers** for downstream plans.

## Self-Check

**Files created (verification):**

- `scripts/audit/profiles/types.ts` — FOUND
- `scripts/audit/profiles/region_canonical.ts` — FOUND
- `scripts/audit/profiles/sub_destination.ts` — FOUND
- `scripts/audit/profiles/guide_or_winery.ts` — FOUND
- `scripts/audit/profiles/utility.ts` — FOUND
- `scripts/audit/profiles/hub.ts` — FOUND
- `scripts/audit/profiles/detect.ts` — FOUND
- `scripts/audit/profiles/index.ts` — FOUND
- `scripts/audit/profiles/__tests__/detect.test.ts` — FOUND
- `scripts/audit/profiles/__tests__/profiles.test.ts` — FOUND
- `scripts/audit/profiles/__tests__/region_canonical-score.test.ts` — FOUND

**Commits verified (via `git log --oneline`):**

- `553cead` — Task 1 (feat: 5 profiles + types + detect + barrel)
- `978f09e` — Task 2 (test: detectProfile 9 tests)
- `a8ed7d1` — Task 3 (test: distinctness + scoring 20 tests)

**Test status:** 29/29 plan-07 tests green via `pnpm test --run scripts/audit/profiles/__tests__/`.

## Self-Check: PASSED

---

_Phase: 01-foundation-m1_
_Plan: 07-quality-profiles_
_Completed: 2026-05-11_
