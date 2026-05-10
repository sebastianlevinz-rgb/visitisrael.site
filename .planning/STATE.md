# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-11)

**Core value:** Every tourist who lands on the site finds a credible, monetized path to booking what they came to research — without the structural debt that plagued the prior Discover Argentina project.
**Current focus:** Phase 1 (Foundation, M1)

## Current Position

Phase: 1 of 6 (Foundation — M1)
Plan: 0 of 11 in current phase
Status: Ready to plan
Last activity: 2026-05-11 — Roadmap + STATE initialized after research synthesis

Progress: [░░░░░░░░░░] 0% (0/37 plans across 6 phases; plan count for Phase 4 TBD during plan-phase)

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: —
- Total execution time: 0.0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 0/11 | — | — |
| 2. Pilot Jerusalem | 0/6 | — | — |
| 3. Region Replication | 0/11 | — | — |
| 4. Long-tail Sweep | 0/TBD | — | — |
| 5. Legal + Launch Prep | 0/4 | — | — |
| 6. Production Deploy | 0/4 | — | — |

**Recent Trend:** None yet (no plans executed).

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table and SUMMARY.md §1 (Headline Decisions) + §3 (Conflict Resolutions).

Recent decisions affecting current work:

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

Last session: 2026-05-11
Stopped at: Roadmap created and STATE.md initialized; awaiting `/gsd:plan-phase 1` invocation.
Resume file: None
