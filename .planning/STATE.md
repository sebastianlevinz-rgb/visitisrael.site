---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
stopped_at: Completed .planning/phases/01-foundation-m1/02-design-tokens-PLAN.md
last_updated: '2026-05-11T01:33:40.053Z'
last_activity: '2026-05-11 — Plan 02 (design-tokens) complete: 3-layer @theme (44 OKLCH foundation + 11 semantic + 5 component) + Hebrew font/leading scale + scripts/lint.mjs dispatcher + 3 ESLint fixtures + /admin/tokens visual review; 21 min, 4 commits.'
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 11
  completed_plans: 3
  percent: 27
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-11)

**Core value:** Every tourist who lands on the site finds a credible, monetized path to booking what they came to research — without the structural debt that plagued the prior Discover Argentina project.
**Current focus:** Phase 1 (Foundation, M1)

## Current Position

Phase: 1 of 6 (Foundation — M1)
Plan: 3 of 11 in current phase complete (01 scaffold + 02 design-tokens + 03 photo-credits); remaining wave 2 plan: 04 (schema baseline) in flight
Status: Executing — plan 02 green, Wave 2 nearly complete (only 04 remaining)
Last activity: 2026-05-11 — Plan 02 (design-tokens) complete: 3-layer @theme (44 OKLCH foundation + 11 semantic + 5 component) + Hebrew font/leading scale + scripts/lint.mjs dispatcher + 3 ESLint fixtures + /admin/tokens visual review; 21 min, 4 commits.

Progress: [███░░░░░░░] 27% (3/11 plans in Phase 1; ~5% overall)

## Performance Metrics

**Velocity:**

- Total plans completed: 3
- Average duration: ~20 min
- Total execution time: ~1.02 hours

**By Phase:**

| Phase                  | Plans | Total  | Avg/Plan |
| ---------------------- | ----- | ------ | -------- |
| 1. Foundation          | 3/11  | 61 min | ~20 min  |
| 2. Pilot Jerusalem     | 0/6   | —      | —        |
| 3. Region Replication  | 0/11  | —      | —        |
| 4. Long-tail Sweep     | 0/TBD | —      | —        |
| 5. Legal + Launch Prep | 0/4   | —      | —        |
| 6. Production Deploy   | 0/4   | —      | —        |

**Recent Trend:** Plan 02 (design-tokens) — 21 min — 8 files, 4 commits, 4/4 fixture-contract tests green, full repo lint/typecheck/build all green; 3 deviations (1 bug + 2 blocking) all auto-fixed.

_Updated after each plan completion_

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table and SUMMARY.md §1 (Headline Decisions) + §3 (Conflict Resolutions).

Recent decisions affecting current work:

- **Plan 02 — Token names follow tailwind-design-system canon (primary/accent/ink/surface):** CONTEXT §4 (Claude's Discretion) explicitly delegated naming. Chose canonical over inventing project-specific terms (e.g., `israel-blue`); the earth-tone Israeliness lives in foundation ramps (`sand`, `olive`) where it's appropriate, not at semantic layer.
- **Plan 02 — `pnpm lint <file>` contract requires dispatcher (`scripts/lint.mjs`):** ESLint flat config `ignores` skips files even when explicitly passed. Dispatcher: empty argv → `eslint .` (preserves full-repo crawl, keeps Husky/lint-staged behavior); non-empty argv → `eslint --no-warn-ignored --no-ignore <args>` (bypasses fixture global-ignore so deliberately-broken files fire their rules). VALIDATION rows + must_haves contract literally bind on `pnpm lint <fixture>` — dispatcher is the cleanest path.
- **Plan 02 — `--color-danger` is direct OKLCH (no foundation ref):** Adding a full red-50..950 ramp for ONE semantic use was premature. Semantic-layer OKLCH documented as explicit exception in `app/globals.css`.
- **Plan 03 — Zod schema duplicated between TS source-of-truth and CI-gate mirror:** `lib/photo-credits-schema.ts` is canonical; `scripts/qa/check-credits.mjs` inlines an identical Zod schema. Rationale: zero TypeScript runtime dep in CI gate (`.mjs` only, no tsx spawn cost). Drift caught by cross-test `check-credits.test.ts` case 5 (restricted-site enforcement).
- **Plan 03 — Sharp + glob installed with `pnpm.onlyBuiltDependencies` allowlist:** pnpm 10 blocks postinstall scripts by default; explicit allowlist (`[esbuild, sharp, unrs-resolver]`) approves prebuilt-binary install non-interactively. Resolves plan 01's "Issues Encountered" note about Sharp build-script warning.
- **Plan 03 — Test sandbox uses absolute script path:** ESM does not honor NODE_PATH. Spawn `node <repo-absolute-path>/scripts/qa/check-credits.mjs` with `cwd: <sandbox>`. Script uses `process.cwd()`-relative paths internally, so this gives full module resolution from the repo's node_modules.
- **Plan 03 — lint-staged uses function-form for photo-credits triggers:** `data/photo-credits.json` + `public/images/**/*.{img}` + `{app,components,content}/**/*.{tsx,mdx}` all trigger `() => 'pnpm qa:credits'` (full sweep, not partial scan). Cross-file failure modes (orphan/undocumented) require full visibility.
- **Plan 01 — Plausible locked as v1 analytics (FND-08):** Single audit-trail commit `3a97015 chore(01-01): lock analytics=plausible`. PostHog kept as fallback in `data/dev-prereqs.md` for Phase 6 if product-analytics needs surface.
- **Plan 01 — next-plausible downgraded to v3:** v4 broke the API (uses `src`, not `domain`). Documented choice; pinned at `next-plausible@^3` in package.json.
- **Plan 01 — eslint-plugin-tailwindcss NOT loaded in v4 (RESEARCH §1.1 fallback):** Plugin v3.x cannot parse Tailwind v4's CSS-first @theme config — crashes ESLint startup. Replaced rule 1 (`tailwindcss/no-arbitrary-value`) with `no-restricted-syntax` regex selector against `className=".*\[#...\]"`. Plugin package still installed for plan 02 to re-evaluate.
- **Plan 01 — ESLint flat-config plugin scoping:** Rules referencing plugins from `eslint-config-next` (`@next/next/...`, `react/...`, `@typescript-eslint/...`) must live in the same block. Used `Array.map()` to augment the next-config blocks rather than redeclaring plugins.
- **Phase 1.1 (Conflict A resolution):** Register only `he` + `en` in `i18n-config.ts` at launch; filesystem/types/Velite collection allow `'he' | 'en' | 'fr'` for cheap FR addition later. PITFALLS wins on registration, ARCHITECTURE wins on filesystem readiness.
- **Phase 1.4 (Conflict D resolution):** Build 9 real affiliate helpers (Booking, Civitatis, Viator, GYG, Rentalcars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars) + 2 stubs (Klook, GoCity) that throw documented "no Israel inventory" errors with placeholder env vars.
- **Phase 2 pilot (Conflict C resolution):** Jerusalem with Phase 2.2 fallback checkpoint to Tel Aviv if AUD-017..AUD-020 / Old City image sourcing / Hebrew translation throughput fails.
- **Quality Gate between Phase 2 and 3:** Hard stop with 10 explicit criteria (Lighthouse 3-run-median, audit ≥85, 0 critical bugs, ≥80% affiliate coverage, EN+HE 100% parity, 100% credited images ≥1200px, 0 raw hex, hreflang valid, schema validated, 0 broken links). Failure writes `data/quality-gate-failure.md` and halts.
- **Granularity = coarse, Model = quality (Opus), Parallelization = on:** Per config.json. Phase 1 sub-phases parallelizable per ARCHITECTURE §8 bundles A-F.

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- **Phase 2 research blocker (Gap §6.1):** R3 keyword volumes are MEDIUM-LOW confidence (proxied, not measured). MUST buy Ahrefs Lite ($129) or DataForSEO API ($50) BEFORE writing Phase 2.1 Jerusalem canonical. Tracked as Phase 2 `needs_research: true`.
- **Phase 3 research blocker (Gap §6.3, §6.4):** Haifa Bahá'í photography policy requires email to `press@bahai.org` before Phase 3 Haifa region; Negev image commissioning ($1,500–$3,000 budget) or IGPO archive sourcing required before Phase 3 Negev region.
- **Phase 2.5 operational blocker (Gap §6.7):** Named accessibility coordinator (real name + phone + email) must be designated BEFORE Phase 2.5 legal pages — placeholder NOT acceptable per A11Y-04 / IS 5568 mandate.

## Session Continuity

Last session: 2026-05-11T01:33:40.042Z
Stopped at: Completed .planning/phases/01-foundation-m1/02-design-tokens-PLAN.md
Resume file: None
