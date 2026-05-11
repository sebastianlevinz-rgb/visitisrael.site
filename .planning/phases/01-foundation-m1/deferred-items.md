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
