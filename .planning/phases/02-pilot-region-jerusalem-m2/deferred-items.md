# Deferred Items — Phase 2 (Pilot Jerusalem)

Out-of-scope issues discovered while executing plans in this phase. NOT
auto-fixed (deviation Rule scope boundary). Tracked here for triage by
the relevant plan owner.

## Plan 05 (hubs + legal)

### Pre-existing ESLint warnings in `lib/schema/__tests__/religiousBuilding.test.ts`

```
lib/schema/__tests__/religiousBuilding.test.ts
  157:5  Warning: Unused eslint-disable directive (no problems were reported
         from '@typescript-eslint/no-require-imports').
  164:5  Warning: Unused eslint-disable directive (no problems were reported
         from '@typescript-eslint/no-require-imports').
```

**Source:** Plan 04 (`schema-baseline`) — pre-existing before plan 05.
**Effect:** Two `// eslint-disable-next-line` directives where the rule is
no longer firing. Build still exits 0 because they are warnings, not errors.
**Resolution path:** Remove the two unused directives in a follow-up commit
(any plan touching that file qualifies).

### Schema validation — homepage BreadcrumbList itemListElement < 2

**Found during:** Plan 05 Task 4 — `pnpm qa:schema` run after build
**Pre-existing check:** Verified via `git stash` + re-run that the errors
exist BEFORE Task 3 changes; introduced by Task 2 commit `9d410c7`
(homepage authoring).

**Error:**

```
✗ .next/server/app/en.html [script #2]: BreadcrumbList.itemListElement
   must be an array with >=2 items
✗ .next/server/app/he.html [script #2]: BreadcrumbList.itemListElement
   must be an array with >=2 items
```

**Root cause:** The homepage (`/` and `/en/`) emits a BreadcrumbList
JSON-LD with only ONE itemListElement. Schema.org requires ≥2 items.
The homepage IS the root, so a single-item breadcrumb is semantically
awkward — Schema.org's validator rejects it nonetheless.

**Fix options:**

1. Omit BreadcrumbList entirely on `/` and `/en/` (homepage doesn't need
   breadcrumbs — it's the root). Cleanest semantics.
2. Add a synthetic "Home" + "Israel" pair so the trail has ≥2 nodes.

**Recommended:** Option 1.

**Defer to:** Plan 06 (QA + Quality Gate) — covered by the broader Phase
2 QA sweep. Out-of-scope for Plan 05 per scope-boundary deviation rule
(this rule is the THIRD layer of compliance; Task 3 swapped 4
placeholder values, Task 4 verified AUD-027 + AUD-028 — homepage
breadcrumb is a separate concern under a different rule, AUD-014 /
schema-validation rather than IS-5568 footer-link).

**Impact:** Quality Gate `gate:report` Criterion 9 (schema validation)
will FAIL until fixed. Does NOT block Plan 05 SUMMARY.
