---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
stopped_at: Completed .planning/phases/01-foundation-m1/09-ner-detection-PLAN.md
last_updated: '2026-05-11T03:09:23.126Z'
last_activity: '2026-05-11 — Plan 09 (ner-detection) complete: data/entity-dict.json 6 classes × 113 starter entries (tour/hotel/restaurant/museum/transport/religious_site) + lib/ner/detector.ts dictionary-backed regex scanner with ±300 char suggestedAction heuristic + lib/ner/types.ts Mention contract + scripts/audit/scan-ner.ts (tsx, NOT mjs — iteration-1 fix) + pnpm qa:ner CLI writing data/ner-results.json for plan 10; 11 min, 5 commits (2 TDD cycles + 1 standard), 41 net new tests (380/380 total green). 2 auto-fixed deviations (import.meta.url under jsdom; unused eslint-disable). FND-07 complete. Wave 7 (plan 10 audit dashboard) eligible to start.'
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 11
  completed_plans: 9
  percent: 82
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-11)

**Core value:** Every tourist who lands on the site finds a credible, monetized path to booking what they came to research — without the structural debt that plagued the prior Discover Argentina project.
**Current focus:** Phase 1 (Foundation, M1)

## Current Position

Phase: 1 of 6 (Foundation — M1)
Plan: 9 of 11 in current phase complete (01 scaffold + 02 design-tokens + 03 photo-credits + 04 schema-baseline + 05 component-lib + 06 affiliate-helpers + 07 quality-profiles + 08 seo-config + 09 ner-detection); Wave 6 fully green (plan 09 done), Wave 7 (plan 10 audit dashboard) eligible to start
Status: Executing — Wave 6 fully green; Wave 7 (plan 10 audit dashboard) eligible to start
Last activity: 2026-05-11 — Plan 09 (ner-detection) complete: data/entity-dict.json 6 classes × 113 starter entries (tour/hotel/restaurant/museum/transport/religious_site) + lib/ner/detector.ts dictionary-backed regex scanner with ±300 char suggestedAction heuristic + lib/ner/types.ts Mention contract + scripts/audit/scan-ner.ts (tsx, NOT mjs — iteration-1 fix) + pnpm qa:ner CLI writing data/ner-results.json for plan 10; 11 min, 5 commits (2 TDD cycles + 1 standard), 41 net new tests (380/380 total green). 2 auto-fixed deviations (import.meta.url under jsdom; unused eslint-disable). FND-07 complete.

Progress: [████████░░] 82% (9/11 plans in Phase 1; ~14% overall)

## Performance Metrics

**Velocity:**

- Total plans completed: 9
- Average duration: ~17 min
- Total execution time: ~2.55 hours

**By Phase:**

| Phase                  | Plans | Total   | Avg/Plan |
| ---------------------- | ----- | ------- | -------- |
| 1. Foundation          | 9/11  | 153 min | ~17 min  |
| 2. Pilot Jerusalem     | 0/6   | —       | —        |
| 3. Region Replication  | 0/11  | —       | —        |
| 4. Long-tail Sweep     | 0/TBD | —       | —        |
| 5. Legal + Launch Prep | 0/4   | —       | —        |
| 6. Production Deploy   | 0/4   | —       | —        |

**Recent Trend:** Plan 09 (ner-detection) — 11 min — 7 files created + 2 modified, 5 commits (2 TDD cycles RED→GREEN + 1 standard), 41 net new tests (380/380 total green). data/entity-dict.json 6 classes × 113 starter entries (religious_site overlaps religious-sites.json EN names ≥8 — single-source-of-truth coherence pin); lib/ner/detector.ts dictionary-backed regex with case-insensitive word-boundary + ±300 char AffiliateCard/Link coverage heuristic + ±50 char contextSample window, source-ordered output; scripts/audit/scan-ner.ts via tsx (not mjs — iteration-1 fix landed) with defensive entry filtering (non-array files, malformed entries, lang≠'he'|'en'); greenfield Phase 1 reality → empty [] + exit 0 so plan 10 wires qa:ner today. 2 auto-fixed deviations (import.meta.url not file URL under Vite/jsdom — switched to process.cwd(); unused eslint-disable no-console directives — removed). FND-07 complete; Wave 7 (plan 10 audit dashboard) unblocked.

_Updated after each plan completion_

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table and SUMMARY.md §1 (Headline Decisions) + §3 (Conflict Resolutions).

Recent decisions affecting current work:

- **Plan 08 — Sitemap config-driven, NOT filesystem-driven:** The generator iterates `locales` from i18n-config.ts and a Phase-1 static path list — it does NOT walk content/{he,en,fr}/. Rationale: a filesystem-walking generator would silently emit FR URLs the moment a single test MDX file lands in content/fr/. Config-driven means Conflict A is structural, not defensive. Adding FR later = one-line change in i18n-config.ts; nothing here updates.
- **Plan 08 — Hreflang x-default → EN, not HE:** HE is `defaultLocale` (URL routing — no prefix). EN is global hreflang `x-default` (international visitor fallback). Two different roles. ARCHITECTURE §6.2 explicitly: English is the global fallback for an Israel-focused property; an English-speaking visitor with no `Accept-Language: he` header should land on /en/ not /. Documented in hreflang.ts so future "fix" attempts don't reverse it.
- **Plan 08 — Religious-naming detectors case-insensitive + 300-char pairing window:** WAILING_WALL_REGEX, BIASED_FRAMING_REGEX both `/i`; detectTempleMountPaired uses 300-char window for "Temple Mount / Haram al-Sharif" first-reference heuristic (PITFALLS §3.1 says "first reference" literally — 300 chars allows a bilingual lead paragraph but rejects unpaired later paragraphs). detectUnpairedReligiousNaming returns structured ReligiousNamingViolation[] (rule + message + match) for plan-10 dashboard consumption.
- **Plan 08 — accessibility-link.ts is single source of truth for A11Y-05 + AUD-028:** consumed by BOTH the Footer (render path) AND plan-10 audit scanner (audit path). Hebrew slug deferred to v2 per A11Y-03 — HE + EN both use English slug 'accessibility-statement' at launch. Footer.footerLinkHref retained as backward-compat export but delegates to accessibilityStatementHref for the accessibility slug.
- **Plan 08 — Metadata length checks warn, don't throw:** Velite frontmatter validators (SEO-05) are primary enforcement at content-build time. Runtime console.warn is defense-in-depth — catches drift between Velite and runtime if frontmatter is generated dynamically. Throwing would crash a Phase 2 page render on first drift; warning surfaces in dev logs + CI without breaking visitor UX. Two-layer enforcement.
- **Plan 08 — 301 redirect map runs BEFORE next-intl in middleware:** order-of-operations is load-bearing — if locale negotiation rewrote /old-slug → /en/old-slug first, our redirect map (keyed on literal request path) would miss the entry. Body comments document the order so a future contributor doesn't reorder for "logical grouping". Middleware test stubs next-intl (`vi.doMock('next-intl/middleware')`) rather than running it against fake NextRequest — next-intl's resolveLocale reads accept-language headers/cookies that don't exist in jsdom. Pattern reusable for plan-10 basic-auth additions.
- **Plan 07 — Sum-≤100 with documented cushions over rigid sum-to-100:** REGION_CANONICAL + SUB_DESTINATION sum to exactly 100; GUIDE_OR_WINERY/UTILITY/HUB sum to 95/94/92 with 5/6/8-point cushions documented as trailing comments. Cushion magnitudes correlate with how likely each profile is to absorb future AUD-035-class rules — HUB has the largest reserve because future "internal-link density" / "breadcrumb depth" rules will land there first. Pattern lets plan 10's audit dashboard add rules without breaking the sum invariant.
- **Plan 07 — Omit-rule-to-signal-irrelevance over weight: 0 entries:** UTILITY + HUB profiles OMIT AUD-009 (FTC disclosure) from their `weights` arrays entirely rather than including it with `weight: 0`. Two tests pin this — `profiles.UTILITY.weights.find(w => w.rule === 'AUD-009')` must return `undefined`. The signal is: this rule is intentionally inapplicable, not just zero-weight. Plan 10 scorer treats absent rules as weight 0, so the math works out identically; the difference is what future maintainers READ when scanning the file.
- **Plan 07 — Fail-loud detectProfile over silent default:** When frontmatter has an unknown `collection` AND no override flag, `detectProfile` THROWS with `Cannot detect profile for collection=<x>` rather than fall back to a default profile. Argentina lesson #5 root cause was silent defaulting — every page got the same generic rubric. Two test cases pin the failure mode (`collection: 'unknown'` and `collection: ''`).
- **Plan 07 — Cross-profile differential scoring tests over single-profile unit tests:** `region_canonical-score.test.ts` does NOT just test REGION in isolation — it asserts the SAME issue produces DIFFERENT scores under UTILITY vs REGION_CANONICAL (e.g., AUD-027 → -4 vs -12; AUD-009 → -8 vs 0-impact). This proves the profiles aren't cosmetic; they materially change scoring outcomes. Without this test, two profiles could drift to identical scoring behavior and still pass.
- **Plan 07 — GUIDE.requiredSchemaTypes includes 'Article' even though plan 04 didn't ship an Article generator:** Deliberate forward-reference. Plan 10 audit dashboard will report a `requiredSchemaTypes` miss when GUIDE pages first land, surfacing the Phase 3 task to add `articleSchema()` to `lib/schema/`. Deferred-by-design over deferred-by-accident — the audit dashboard is the surfacing mechanism.
- **Plan 07 — Co-located `__tests__` under `scripts/audit/profiles/` mirrors `lib/affiliate/__tests__/`:** First plan to put tests under `scripts/` required adding `scripts/**/__tests__/**/*.test.ts` to vitest.config.ts include array. Pattern locked: scripts/ tests live next to their subject (same as lib/), not in a separate tests/ tree.

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
- [Phase 01-foundation-m1]: Plan 09 — Entity dict structure: 6 classes keyed top-level + \_meta documentation block; detector filters \_meta out via key === '\_meta' rather than nesting under classes:{} so plan 10 dashboard reads flat without unwrapping
- [Phase 01-foundation-m1]: Plan 09 — Three-bucket suggestion policy with Set constants over inline ternary: AFFILIATE_CLASSES = hotel/tour/transport (add-affiliate when no AffiliateCard), INTERNAL_LINK_CLASSES = museum/religious_site/restaurant (add-internal-link when no Link), otherwise no-action. Set abstraction makes Phase 2 expansion one-line
- [Phase 01-foundation-m1]: Plan 09 — .ts (not .mjs) for scripts/audit/scan-ner.ts via tsx: detector.ts imports without compile step or JS shim; filename and 'pnpm qa:ner' (= tsx scripts/audit/scan-ner.ts) extensions agree. Pattern adoptable for plan 10 audit scripts
- [Phase 01-foundation-m1]: Plan 09 — Greenfield empty is success not error: scan-ner returns [] + exits 0 when .velite/ has no content. Lets plan 10 wire qa:ner into pre-deploy CI today and dashboard render the 0-mentions empty state without file-existence conditionals
- [Phase 01-foundation-m1]: Plan 09 — religious_site overlap with religious-sites.json EN names ≥8 (test-pinned): same canonical entities, two consumers (NER detector + religious-naming audit AUD-017..020). Drift between dicts would silently disable cross-rule gating in plan 10
- [Phase 01-foundation-m1]: Plan 09 — process.cwd() over import.meta.url in test path resolution: Vite test transform under jsdom doesn't always yield file: URL, causing fileURLToPath to throw. Vitest sets cwd to repo root reliably. Pattern reusable for future audit-script sandbox tests

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- **Phase 2 research blocker (Gap §6.1):** R3 keyword volumes are MEDIUM-LOW confidence (proxied, not measured). MUST buy Ahrefs Lite ($129) or DataForSEO API ($50) BEFORE writing Phase 2.1 Jerusalem canonical. Tracked as Phase 2 `needs_research: true`.
- **Phase 3 research blocker (Gap §6.3, §6.4):** Haifa Bahá'í photography policy requires email to `press@bahai.org` before Phase 3 Haifa region; Negev image commissioning ($1,500–$3,000 budget) or IGPO archive sourcing required before Phase 3 Negev region.
- **Phase 2.5 operational blocker (Gap §6.7):** Named accessibility coordinator (real name + phone + email) must be designated BEFORE Phase 2.5 legal pages — placeholder NOT acceptable per A11Y-04 / IS 5568 mandate.

## Session Continuity

Last session: 2026-05-11T03:09:23.117Z
Stopped at: Completed .planning/phases/01-foundation-m1/09-ner-detection-PLAN.md
Resume file: None
