---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
stopped_at: Completed .planning/phases/01-foundation-m1/06-affiliate-helpers-PLAN.md
last_updated: '2026-05-11T02:28:09.750Z'
last_activity: '2026-05-11 — Plan 06 (affiliate-helpers) complete: 9 real helpers + 2 stubs (Conflict D) + 12 partner state JSON entries + 9 partner-URL ESLint fixtures + AffiliateCard wired (no more #TODO-PLAN-06); 12 min, 3 commits, 61 net new tests (249/249 total green). AFF-01..04, AFF-06..08 complete.'
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 11
  completed_plans: 6
  percent: 55
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-11)

**Core value:** Every tourist who lands on the site finds a credible, monetized path to booking what they came to research — without the structural debt that plagued the prior Discover Argentina project.
**Current focus:** Phase 1 (Foundation, M1)

## Current Position

Phase: 1 of 6 (Foundation — M1)
Plan: 6 of 11 in current phase complete (01 scaffold + 02 design-tokens + 03 photo-credits + 04 schema-baseline + 05 component-lib + 06 affiliate-helpers); Wave 4 complete, Wave 5 next (plans 07 quality-profiles + 08 seo-config)
Status: Executing — Wave 4 fully green, Wave 5 (plans 07 + 08) eligible to start
Last activity: 2026-05-11 — Plan 06 (affiliate-helpers) complete: 9 real helpers + 2 stubs (Conflict D) + 12 partner state JSON entries + 9 partner-URL ESLint fixtures + AffiliateCard wired (no more #TODO-PLAN-06); 12 min, 3 commits, 61 net new tests (249/249 total green). AFF-01..04, AFF-06..08 complete.

Progress: [██████░░░░] 55% (6/11 plans in Phase 1; ~11% overall)

## Performance Metrics

**Velocity:**

- Total plans completed: 6
- Average duration: ~20 min
- Total execution time: ~1.97 hours

**By Phase:**

| Phase                  | Plans | Total   | Avg/Plan |
| ---------------------- | ----- | ------- | -------- |
| 1. Foundation          | 6/11  | 118 min | ~20 min  |
| 2. Pilot Jerusalem     | 0/6   | —       | —        |
| 3. Region Replication  | 0/11  | —       | —        |
| 4. Long-tail Sweep     | 0/TBD | —       | —        |
| 5. Legal + Launch Prep | 0/4   | —       | —        |
| 6. Production Deploy   | 0/4   | —       | —        |

**Recent Trend:** Plan 06 (affiliate-helpers) — 12 min — 41 files created + 5 modified + 1 removed, 3 commits, 249/249 tests green (+61 net new: 36 real helper tests + 8 stub tests + 4 availability + 10 fixture + 7 wired-AffiliateCard − 4 superseded stub). pnpm lint / typecheck / build all green; 3 auto-fixed deviations (1 blocking on typecheck of widened return type, 2 bugs from upstream stub contract). 9 real affiliate helpers (booking, civitatis, viator, gyg, rentalcars, safetywing, skyscanner, hostelworld, discovercars) + 2 stubs (klook, gocity throwing NoIsraelInventoryError per Conflict D). AffiliateCard wired (no more #TODO-PLAN-06).

_Updated after each plan completion_

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table and SUMMARY.md §1 (Headline Decisions) + §3 (Conflict Resolutions).

Recent decisions affecting current work:

- **Plan 06 — Codemod-ready AID pattern over per-deploy edits:** Each helper reads `process.env.NEXT_PUBLIC_<PARTNER>_<AID>` at call time. Setting the env var in Vercel project settings flips every call site from public URL to AID-tagged URL with zero code change. `scripts/codemods/flip-affiliate-aid.mjs` is a placeholder for the JSON-tracker update only (Phase 6 monitoring concern); never rewrites source files. Argentina lesson #2 (one affiliate dominating at 92%) is structurally prevented because every helper is symmetric and AID-aware.
- **Plan 06 — Conflict D stubs throw with documented messages, never silently return:** klookLink + goCityLink each throw NoIsraelInventoryError with a 4-part message (partner name + rationale + quarterly review pointer + activation criterion). Self-documenting at runtime — anyone tracing the error reads the rationale directly without re-reading SUMMARY.md §3.
- **Plan 06 — Two-layer availability gate (component-level + helper-level):** `<AffiliateCard>` reads `affiliateAvailability(partner)` FIRST; absent → return null without invoking helper. Stub error throw is the second line of defense (survives availability JSON drift). Either layer alone is sufficient; both layered are robust against single-source drift.
- **Plan 06 — Per-partner ESLint fixture files (9 separate fixtures, not 1 omnibus):** Each `raw-partner-url-{partner}.tsx` exercises ONE partner URL; lint runs per-file. If `skyscanner.` regex group breaks but `booking.com` matches, only Skyscanner test fails — fast diagnostic. Explicit per-partner naming makes AFF-04 coverage matrix obvious from the file listing.
- **Plan 06 — Travelpayouts as 12th availability entry (AFF-08 marker, not a helper):** Travelpayouts is an aggregator dashboard, not a direct affiliate program. Lives in `data/affiliate-availability.json` so Phase 6 monitoring sees ALL revenue-touching state (including the 5K visitors/mo Skyscanner gate fallback) in one view. No helper file — configured via partner dashboard, not a URL pattern.
- **Plan 06 — AffiliateCard return type widened to `ReactElement | null`:** Signaling "this component may legitimately render nothing" is preferable to silently rendering an unavailable-partner card. Auto-fix Rule 3 (blocking) during execution: typecheck flagged the admin drill-down page; widened `renderComponent` return type to match.
- **Plan 05 — Async-component resolution at consumer (await call-form, not JSX-form):** AffiliateCard / Header / admin playground all use `const x = await AsyncComponent(props)` instead of `<AsyncComponent />` when assembling JSX trees. Reason: React 19 RSC streaming handles nested async components natively in production, but the test renderer (jsdom) and any non-RSC payload renderer leave them as unresolved Promises. Resolving inline keeps the tree flat for tests + future renderers; production RSC behavior is unchanged (same payload either way).
- **Plan 05 — AffiliateCard STUB uses literal sentinel `#TODO-PLAN-06`:** plan 06 will `grep -r '#TODO-PLAN-06' components/` to swap the href for `partnerLink({...})`. Sentinel + Vitest assertion (affiliatecard-stub.test.tsx) ensure the codemod is detectable + verifiable.
- **Plan 05 — `footerLinkHref(slug, locale)` exported as named function:** plan 10 AUD-028 (accessibility-statement link presence) calls this directly during scanning rather than re-parsing Footer DOM. Pattern: layout components export their URL-builder helpers.
- **Plan 05 — RegionHero / AttractionGrid / PhotoGallery omitted from /admin/components playground:** the components require ledgered images and `data/photo-credits.json` is empty at end of Phase 1. Tests cover them via `vi.mock('@/lib/photo-credits')` with synthetic credit. Phase 2 region MDX exercises them with real images.
- **Plan 05 — Test-only `<img>` for next/image mock with inline ESLint disable:** `@next/next/no-img-element` disabled ONLY on the two mock-factory lines (composites.test.tsx + photogallery-srcset.test.tsx). Production code paths keep the rule active.
- **Plan 04 — schema-dts v2 vocabulary change (ReligiousBuilding → PlaceOfWorship):** schema-dts v2 dropped the historical `ReligiousBuilding` vocabulary entry. PlaceOfWorship used for non-contested holy sites; contested sites (Temple Mount, etc.) use Place per PITFALLS §3.1 neutral framing. Both validate as Google Rich Results.
- **Plan 04 — `as unknown as WithContext<T>` cast applied uniformly across 11 generators:** schema-dts v2 doesn't type `inLanguage` on Place/Organization/LocalBusiness leaves (it's on CreativeWork-derived shapes in the spec). RESEARCH §1.6 Open Question 5 documented this exact gap; the escape hatch is used with a justifying comment in each generator.
- **Plan 04 — Religious-site administrativeStatus surfaces as schema.org additionalProperty PropertyValue:** Bethlehem (west-bank-paa), Qumran (west-bank-area-c), Mount Bental (golan-heights), east-Jerusalem sites all carry their administrative status as a structured property. Plan 09 NER + plan 10 audit dashboard consume this for AUD-020 transparency.
- **Plan 04 — Validator locale inference: URL path /en/ → en, else he:** Mirrors the Conflict A scaffold (HE default has no prefix, EN at /en/). When plan 05 wires real schemas onto pages, the validator will automatically catch any cross-locale schema leak.
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

Last session: 2026-05-11T02:28:09.741Z
Stopped at: Completed .planning/phases/01-foundation-m1/06-affiliate-helpers-PLAN.md
Resume file: None
