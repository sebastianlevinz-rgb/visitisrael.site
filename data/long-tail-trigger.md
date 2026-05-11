---
status: REACTIVATION-PENDING
created: 2026-05-11
phase: 04-long-tail-sweep-m4
plan: 01
companion: data/long-tail-backlog.md
---

# Long-Tail Reactivation Trigger — Operational Handoff

This file documents **exactly what to do** when R3 keyword data lands and substantive Phase 4 long-tail execution is unblocked. Phase 4 Plan 01 shipped only the scaffold (this file + `data/long-tail-backlog.md`); real per-region long-tail plans are produced by re-entering planning **after** measured volumes exist.

---

## Reactivation Trigger

Re-enter Phase 4 planning **when both** of the following hold:

1. **R3 keyword data is purchased** (see Decision section below for which vendor)
2. **Measured volumes land in `data/keyword-data.json`** (or an equivalent path documented at the time — e.g., `data/dataforseo-export.json`, `data/ahrefs-lite-export.csv`)

Until both conditions are met, the backlog in `data/long-tail-backlog.md` remains **observational** — proxied composite scores are insufficient justification for shipping content (Argentina lesson #9 — see Anti-Pattern section below).

---

## Decision: Which Vendor to Purchase

Two viable options were costed during Phase 2 STATE.md Gap §6.1. The choice depends on cadence intent.

| Option             | Cost                   | Cadence                      | Best For                                                                                                                                                            |
| ------------------ | ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DataForSEO API** | **$50** one-shot batch | Single export, run on demand | Recommended if R3 is a one-time pre-launch validation and quarterly re-runs are NOT planned for v1                                                                  |
| **Ahrefs Lite**    | **$129/month**         | Continuous, query as needed  | Recommended if quarterly re-runs are planned (catches keyword landscape shifts post-launch), OR if competitive SERP analysis will be reused for v2 region expansion |

**Default recommendation: DataForSEO API ($50)** — minimal commitment, sufficient for the one-shot ranking pass that this backlog needs. Upgrade to Ahrefs Lite if the v1 launch shows enough organic momentum to justify quarterly re-validation.

---

## Once Data Lands: Execute

After measured volumes are in place, run:

```
/gsd:plan-phase 4 --gaps
```

This command:

1. Reads `data/long-tail-backlog.md` (52 candidate entries across 11 regions)
2. Reads the measured-volume export (DataForSEO JSON or Ahrefs Lite CSV)
3. Re-ranks every backlog candidate by `(measured_volume × difficulty⁻¹)` — proxied composites become tie-breakers only
4. Produces per-region Phase 4 plans (one plan per region, mirroring Phase 3's plan structure)
5. Drops candidates below a hard volume floor (default: `< 50 monthly searches` for English, `< 30` for Hebrew given thinner Hebrew search baseline)

---

## Selection Rubric (Per Phase 4 Success Criteria #1)

For each region, after re-ranking, pick the top **N** candidates where:

```
N = ⌈existing_sub_dest_count × 0.5⌉
```

Applied to current shipped state:

| Region    | Shipped sub-dests | Long-tail N target       |
| --------- | ----------------- | ------------------------ |
| tel-aviv  | 14                | 7                        |
| galilee   | 12                | 6                        |
| eilat     | 10                | 5                        |
| dead-sea  | 10                | 5                        |
| negev     | 10                | 5                        |
| haifa     | 10                | 5                        |
| akko      | 10                | 5                        |
| golan     | 10                | 5                        |
| caesarea  | 8                 | 4                        |
| nazareth  | 8                 | 4                        |
| bethlehem | 0                 | 0 (canonical-only in v1) |

**Total v1 long-tail target: ~51 pages × 2 langs = ~102 pages.** The backlog currently has 50 v1-eligible candidates, which is a near-exact match to the target — measured volumes will determine which 50 → which 51 (with 1–2 substitutions expected).

---

## Anti-Pattern to Avoid (Argentina Lesson #9)

> Argentina shipped ~70% of its long-tail pages with **proxied/inferred volumes**. Within 3 months of launch:
>
> - ~70% of those pages **ranked for the wrong intent** (e.g., a "buenos-aires-tango-shows-night" page ranked for "tango shoes Buenos Aires")
> - Rewriting them cost more engineering time than authoring them fresh would have
> - The velocity gain from shipping-without-data was completely wiped out
>
> **Lesson:** Do not author long-tail MDX without measured search volumes. Region canonicals and the top-3-to-8 sub-destinations per region are robust to proxied scoring (they target head/torso intent that's editorially obvious). Long-tail (volume <500/month) is where intent mismatch is catastrophic — and only measured data prevents it.

---

## Quarterly Re-Run Cadence (If Ahrefs Lite is Chosen)

If R3 budget is approved for monthly Ahrefs Lite ($129/month), schedule a **90-day re-run**:

- Re-export Ahrefs Lite keyword tracking
- Re-run `/gsd:plan-phase 4 --gaps` against the (potentially expanded) backlog
- Catch new cluster emergences (example: a post-pandemic "Eilat marine diving certifications" surge that wasn't visible in the initial pull)
- Catch cluster decay (example: an "Akko festival" cluster that ran high in 2026 spring but flatlined by 2026 autumn — re-allocate effort)

If DataForSEO ($50 one-shot) is chosen, skip the cadence — single export is sufficient for v1; revisit budget for v2.

---

## Handoff Checklist (For The Operator Running `/gsd:plan-phase 4 --gaps`)

- [ ] Vendor chosen (DataForSEO $50 OR Ahrefs Lite $129) and purchase confirmed
- [ ] Export file landed at `data/keyword-data.json` (or documented alternative path)
- [ ] `data/long-tail-backlog.md` reviewed for staleness (any candidates that became obsolete since 2026-05-11?)
- [ ] `/gsd:plan-phase 4 --gaps` run with explicit `--source data/keyword-data.json` argument if path differs
- [ ] Generated plans reviewed for Argentina-lesson-9 compliance — each plan must cite the measured volume for each slug it ships
- [ ] Phase 5 (Legal + Launch Prep) status confirmed unblocked or completed before Phase 4 substantive execution begins (no dependency, but launch is a higher priority if budget contention exists)

---

_Last reviewed: 2026-05-11 — Phase 4 Plan 01 minimal-deferral close. This trigger remains live until R3 purchase + reactivation cycle is executed._
