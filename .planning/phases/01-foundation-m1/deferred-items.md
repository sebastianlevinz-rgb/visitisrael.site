# Phase 1 Foundation — Deferred Items (Out-of-Scope Discoveries)

Items found during plan execution that are caused by code OUTSIDE the current plan's scope. Tracked here per execute-plan.md `<deviation_rules>` SCOPE BOUNDARY — do NOT auto-fix.

## Logged during plan 03 (photo-credits)

**Date:** 2026-05-11

**Item 1: `pnpm typecheck` reports missing `lib/schema/*` and `lib/seo/*` modules**

- **Where:** `lib/schema/__tests__/*.test.ts(*)` and `lib/seo/__tests__/canonical.test.ts(8,30)`
- **What:** Plan 04 (schema-baseline) is running in parallel (Wave 2) and has staged its RED-phase tests but not yet committed the implementation files (`lib/schema/breadcrumb.ts`, `lib/seo/canonical.ts`, `lib/schema/organization.ts`, etc.). Plan 03 (photo-credits) typecheck observes the half-built state.
- **Why not in plan 03 scope:** Plan 03 only owns `lib/photo-credits.ts`, `lib/photo-credits-schema.ts`, `scripts/qa/check-credits.mjs`, `data/photo-credits.json`. None of the failing files are owned by plan 03.
- **Resolution path:** Plan 04 (schema-baseline) finishes its GREEN phase → these errors disappear. If plan 04 doesn't complete, this becomes Phase 1 blocker (but it's not plan 03's blocker).
- **Action taken in plan 03:** None — explicitly out of scope. Plan 03 ships its own files green; the test-suite filter `pnpm test --run tests/photo-credits/*.test.ts` exits 0 cleanly.

**Item 2: `cheerio@^1.2.0` appears in package.json but was not added by plan 03**

- **Where:** `package.json` devDependencies.
- **What:** Cheerio was added by plan 04 (schema baseline — needed for parsing JSON-LD out of built HTML in `scripts/qa/validate-schema.mjs`).
- **Why not in plan 03 scope:** Plan 03 doesn't use cheerio; plan 04 needs it.
- **Action taken:** None — left in place; plan 04 owns the rationale.

## Logged during plan 07 (quality-profiles)

**Date:** 2026-05-11

**Item 3: `pnpm typecheck` errors in `lib/seo/__tests__/metadata.test.ts(80,26)` — Twitter `card` property**

- **Where:** `lib/seo/__tests__/metadata.test.ts(80,26): error TS2339: Property 'card' does not exist on type 'Twitter'.`
- **What:** Plan 08 (seo-config, parallel Wave 5) is mid-implementation. Its WIP `lib/seo/metadata.ts` + tests appear untracked in the working tree but reference Next.js's `Twitter` type without the `card` property (likely an outdated Next 15 metadata typing assumption).
- **Why not in plan 07 scope:** Plan 07 owns only `scripts/audit/profiles/**`. The failing file lives in `lib/seo/__tests__/` — plan 08's exclusive territory per environment notes ("plan 08 also touches… stay away from layout files — just stay in `scripts/audit/profiles/`").
- **Resolution path:** Plan 08 owns the Twitter metadata typing fix — likely needs `card` re-cast or Next 15 type-import update. Will self-resolve when plan 08 completes.
- **Action taken in plan 07:** None. Focused-tsc on plan 07's 8 new files (`scripts/audit/profiles/{types,region_canonical,sub_destination,guide_or_winery,utility,hub,detect,index}.ts`) compiles clean with strict mode. The plan-07 file set is independent of `lib/seo/**`.

**Item 4: Plan 08 WIP test failures in `tests/middleware/middleware.test.ts` + `components/__tests__/footer-a11y.test.tsx`**

- **Where:**
  - `tests/middleware/middleware.test.ts` — 3 failures referencing missing `REDIRECTS` map + 301 status codes (plan 08 owns `middleware.ts` modifications for FND-06).
  - `components/__tests__/footer-a11y.test.tsx` — 2 failures expecting `/accessibility-statement` but Footer is mid-refactor between `accessibility` and `accessibility-statement` slug.
- **What:** Plan 08 (parallel Wave 5) is mid-build. Footer.tsx is modified (unstaged) to import `accessibilityStatementHref` from `lib/seo/accessibility-link` which doesn't exist yet. middleware.test.ts expects features plan 08 will add.
- **Why not in plan 07 scope:** Plan 07 owns only `scripts/audit/profiles/**`. `components/layout/Footer.tsx`, `middleware.ts`, `lib/seo/**` are all plan-08 deliverables per RESEARCH §1.8 + plan-08 frontmatter. Environment notes explicitly say "Stay away from layout files — just stay in `scripts/audit/profiles/`".
- **Resolution path:** Self-resolves when plan 08 completes — it will commit Footer.tsx + middleware.ts changes together with the `lib/seo/accessibility-link.ts` helper.
- **Action taken in plan 07:** None. The plan-07 test surface (29 tests across detect/profiles/region-canonical-score) all pass independently. Verified via `pnpm test --run scripts/audit/profiles/__tests__/` → 29/29 green.
