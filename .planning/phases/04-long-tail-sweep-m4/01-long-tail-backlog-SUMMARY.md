---
phase: 04-long-tail-sweep-m4
plan: 01
subsystem: planning
tags: [seo, long-tail, deferral, keyword-research, dataforseo, ahrefs]

# Dependency graph
requires:
  - phase: 03-region-replication-m3
    provides: 11 region canonicals + ~100 sub-destinations across 10 regions + Bethlehem (the proxied-composite scoring baseline for this backlog)
  - phase: 02-pilot-region-jerusalem-m2
    provides: STATE.md Gap §6.1 — R3 keyword purchase deferral rationale ($50/$129 options)
provides:
  - data/long-tail-backlog.md (53 candidate slugs across 11 regions; proxied composite scoring; DEFERRED-AWAITING-R3-VALIDATION status)
  - data/long-tail-trigger.md (operational handoff for /gsd:plan-phase 4 --gaps reactivation cycle)
affects:
  - phase 5 (Legal + Launch Prep) — unblocks immediately since Phase 4 minimally complete
  - phase 6 (Production Deploy) — long-tail expansion remains an open post-launch workstream contingent on R3 purchase

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'Proxied-vs-measured separation: docs explicitly mark composite scores as MEDIUM-LOW confidence; do not author content against proxied volumes'
    - 'Argentina lesson #9 enforcement: long-tail authoring requires measured search volume, not editorial scoring'
    - 'Reactivation handoff doc pattern: when a phase defers substantive work pending external input, ship a trigger doc with explicit re-entry command (/gsd:plan-phase X --gaps)'

key-files:
  created:
    - data/long-tail-backlog.md
    - data/long-tail-trigger.md
    - .planning/phases/04-long-tail-sweep-m4/01-long-tail-backlog-SUMMARY.md
  modified: []

key-decisions:
  - 'Ship Phase 4 as a minimal-deferral close (1 plan / 2 docs) rather than authoring long-tail MDX against proxied volumes — Argentina lesson #9 prevention'
  - 'Default vendor recommendation: DataForSEO API $50 one-shot over Ahrefs Lite $129/mo subscription — minimal commitment, sufficient for v1 ranking pass'
  - 'Selection rubric for the reactivation cycle locked: N = ceil(existing_subdest_count * 0.5) per region — yields ~51 v1 long-tail pages, near-exact match to backlog candidate count'
  - 'Bethlehem long-tail explicitly deferred to v2 (not eligible for /gsd:plan-phase 4 --gaps in v1) — editorial sensitivity beyond v1 mitigation budget per Phase 3 CONTEXT'

patterns-established:
  - 'Deferral-with-handoff over deferral-with-blocker: instead of leaving Phase 4 open, ship the scaffold + trigger so re-entry is one command'
  - 'Per-region backlog entry contract: slug + proxied composite + source citation + 1-line justification + affiliate-monetization angle (5 fields, all required)'
  - 'Vendor decision tables in handoff docs: cost / cadence / best-for columns force the operator to choose deliberately rather than copy-paste the first option'

requirements-completed:
  - SUB-V2-01

# Metrics
duration: 4min
completed: 2026-05-11
---

# Phase 4 Plan 01: Long-Tail Backlog Summary

**Phase 4 closed minimally with 53 proxied long-tail candidates scaffolded across 11 regions plus a reactivation-trigger doc — substantive authoring deferred pending R3 keyword purchase (DataForSEO $50 default, Ahrefs Lite $129/mo alternative).**

## Performance

- **Duration:** 4 min
- **Started:** 2026-05-11T19:26:28Z
- **Completed:** 2026-05-11T19:30:18Z
- **Tasks:** 2 / 2 complete
- **Files modified:** 2 created (both pure docs)

## Accomplishments

- `data/long-tail-backlog.md` — 53 candidate slugs across 11 regions (10 v1-eligible × 5 each = 50, plus 2 v2-deferred Bethlehem entries plus 1 Tel Aviv overflow), each tagged with proxied composite (~5–8 scale), source citation (FEATURES §X / PITFALLS §Y / CONTEXT cut-list), 1-line justification, and an affiliate-monetization angle (Booking / Civitatis / Viator / getYourGuide / Skyscanner / RentalCars / DiscoverCars / SafetyWing)
- `data/long-tail-trigger.md` — operational handoff documenting vendor decision (DataForSEO $50 vs Ahrefs Lite $129/mo), the `/gsd:plan-phase 4 --gaps` reactivation command, the selection rubric (`N = ⌈existing_subdest × 0.5⌉`), an Argentina-lesson-9 anti-pattern callout, the 90-day re-run cadence (if Ahrefs Lite path is chosen), and a 6-item operator handoff checklist
- Phase 4 status: **1 / 1 plans complete** (intentional minimal close); Phase 5 (Legal + Launch Prep) unblocks immediately

## Task Commits

Each task was committed atomically:

1. **Task 1: Author data/long-tail-backlog.md** — `8eace8a` (docs)
2. **Task 2: Author data/long-tail-trigger.md** — `a9b0def` (docs)

Plan metadata commit (this SUMMARY + STATE.md + ROADMAP.md) lands separately via the gsd-tools commit helper.

## Backlog Entry Distribution

| Region              | Candidates | Avg Proxied Composite | Editorial Focus                                                                                      |
| ------------------- | ---------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| tel-aviv            | 5          | ~6.4                  | Bauhaus, Shabbat nightlife, Jaffa flea, Sarona, Pride                                                |
| dead-sea            | 5          | ~6.2                  | Ein Bokek medical spa, Masada sunrise, photography, beach comparison, Jordan border                  |
| galilee             | 5          | ~6.4                  | Capernaum–Tabgha walk, Tiberias hot springs, kayaking, Jesus Trail, baptism sites                    |
| eilat               | 5          | ~6.4                  | Red Sea PADI, dolphin reef, Petra day trip, Sinai context, Coral Beach                               |
| negev               | 5          | ~6.2                  | Mitzpe Ramon dark-sky, Carmey Avdat wine, INT southern section, Bedouin hospitality, Makhtesh hiking |
| nazareth            | 5          | ~5.8                  | Sepphoris, Cana, Mt of Precipice, Arab cuisine, 3-day pilgrimage                                     |
| haifa               | 5          | ~6.0                  | Bahá'í tour booking, Mt Carmel hiking, Druze cuisine, German Colony, Stella Maris                    |
| golan               | 5          | ~6.0                  | Banias, Druze cuisine, Mt Hermon ski, wineries, Nimrod Fortress                                      |
| caesarea            | 5          | ~5.6                  | Underwater diving, amphitheater concerts, reenactment, aqueduct photography, Ralli combined          |
| akko                | 5          | ~5.8                  | Rooftop tours, alt-theater festival, Templar+Hospitaller combined, Turkish bath, fishing port        |
| west-bank/bethlehem | 2 (v2)     | ~5.5                  | DEFERRED TO v2 — Shepherds Field, Manger Square Christmas                                            |
| **TOTAL**           | **52**     | **~6.1**              | 50 v1-eligible + 2 v2-deferred                                                                       |

## Proxied Composite Distribution

- **~8 (single entry):** Masada sunrise tour (Dead Sea) — hero attraction with highest-converting SKU
- **~7 (10 entries):** White City Bauhaus, Tel Aviv Pride, Ein Bokek medical spa, Capernaum–Tabgha, Jesus Trail, Red Sea PADI, dolphin reef, Petra day trip, Mitzpe Ramon dark-sky, Daliyat Druze cuisine, Mt Hermon ski
- **~6 (28 entries):** the meat of the backlog — editorial gems with moderate proxied demand
- **~5 (11 entries):** completeness-of-coverage long-tails (photography, reenactments, context-pages); lower commercial intent but valid for SEO breadth
- **Sanity check:** distribution is appropriately skewed toward `~6` (the central tendency for "good-but-needs-measurement" candidates), with only one `~8` outlier — reflects MEDIUM-LOW confidence honestly

## Decisions Made

1. **Phase 4 ships as minimal deferral (1 plan / 2 docs), not as substantive long-tail authoring.** Argentina lesson #9 (proxied volumes → ~70% wrong-intent rankings within 3 months) explicitly precludes authoring against the proxied composites in this backlog. Trade-off: Phase 4 looks "thin" in commit history vs Phase 3's 11 plans, but the alternative (premature authoring) carries an order-of-magnitude higher cost in 3-month rewrite churn.
2. **Default vendor recommendation: DataForSEO API $50 one-shot.** Minimal commitment; sufficient for v1's single ranking-pass need. Ahrefs Lite ($129/mo) is documented as the alternative for operators who want quarterly cadence — but quarterly cadence is itself a v2-grade decision (depends on launch organic momentum), so v1 should not default to the more expensive option.
3. **Selection rubric `N = ⌈existing_subdest × 0.5⌉` locked.** Yields ~51 v1 long-tail pages across the 10 v1-eligible regions, matching the ~50 candidate-count in the backlog within ±2 entries — the small slack absorbs substitutions when measured volumes contradict the proxied composite.
4. **Bethlehem long-tail explicitly deferred to v2.** The 2 listed entries (Shepherds Field, Manger Square Christmas) are kept in the backlog as planning surface only — `/gsd:plan-phase 4 --gaps` in v1 must NOT pick them up (documented in the Bethlehem region heading).

## Deviations from Plan

None — plan executed exactly as written. Both tasks completed with their plan-specified verify checks passing. The PowerShell `$`-escaping artifact encountered during inline verify (regex `(\$50|\$129)` consumed the backslash) was a verification-harness issue not a content issue — the file content satisfies the literal regex when executed by node directly (e.g., via gsd-tools internal verify or a `.cjs` script), as confirmed by writing the same regex to a temporary `.cjs` file and running it.

## Issues Encountered

- **PowerShell shell-escaping consumed `\$` in inline `node -e` calls.** Verify-1's regex `(\$50|\$129)` failed when invoked as `node -e "...regex..."` from the Bash tool (which runs via PowerShell on Windows). Worked around by writing the verify script to a temporary `.cjs` file and `node`-ing it directly. The plan's `<automated>` block would not hit this issue when executed by gsd-tools or another verifier that doesn't shell-escape — this is purely an interactive-harness artifact and required no changes to the file content. Cleanup: temp files removed after each verify pass.

## User Setup Required

None — no external service configuration required for Phase 4 Plan 01 itself. However, the **R3 keyword purchase** is an operator-managed external decision (DataForSEO $50 or Ahrefs Lite $129/mo) documented in `data/long-tail-trigger.md`. That purchase is a v2/post-launch workstream, not a v1 launch dependency.

## Phase 4 Status

- **Plans complete:** 1 / 1 (intentional minimal close — Phase 4 is a deferral phase per `04-VALIDATION.md` and Phase 2 STATE.md Gap §6.1)
- **MDX content shipped:** 0 (Argentina lesson #9 prevention)
- **Backlog candidates ready for reactivation:** 50 v1-eligible + 2 v2-deferred
- **Reactivation trigger live:** yes (`data/long-tail-trigger.md`)

## Next Phase Readiness

- **Phase 5 (Legal + Launch Prep) unblocks immediately.** Phase 4 minimal close releases the dependency.
- **Long-tail expansion remains an open post-launch workstream.** When operator purchases R3 data (DataForSEO $50 or Ahrefs Lite $129/mo), one command (`/gsd:plan-phase 4 --gaps`) re-enters Phase 4 planning with real volumes and produces per-region long-tail plans.
- **No outstanding blockers** for the milestone v1.0 critical path.

## Self-Check: PASSED

- data/long-tail-backlog.md FOUND (8eace8a, 188 insertions; subsequently prettier-formatted)
- data/long-tail-trigger.md FOUND (a9b0def, 121 insertions; subsequently prettier-formatted)
- Commit 8eace8a FOUND on master
- Commit a9b0def FOUND on master
- No content/ MDX created (verified via `git diff master~2..master --name-only` returning only the two `data/` files)
- All 5 verify conditions for Task 1 PASS (DEFERRED string, $50/$129 prices, ≥10 region sections at 11, ≥30 slugs at 53, ≥3000 bytes at ~23k)
- All 3 verify conditions for Task 2 PASS (`gsd:plan-phase 4 --gaps`, DataForSEO/Ahrefs, ≥20 lines at 122)

---

_Phase: 04-long-tail-sweep-m4_
_Completed: 2026-05-11_
