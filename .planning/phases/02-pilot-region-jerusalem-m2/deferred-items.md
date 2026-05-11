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
