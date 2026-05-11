---
phase: 4
slug: long-tail-sweep-m4
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-11
---

# Phase 4 — Validation Strategy

> Phase 4 is a **minimal deferral phase** — documentation/backlog scaffolding only. Single plan; no test infrastructure changes; no MDX content. Phase 5 (Legal + Launch Prep) unblocks once Phase 4's single plan completes.

---

## Test Infrastructure

| Property               | Value                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Framework**          | None — Phase 4 ships docs only                                                             |
| **Quick run command**  | Inline `node -e "..."` checks on the 2 docs files (existence + key-substring + line count) |
| **Full suite command** | Phase 3 suite remains the gate; no new Phase 4 tests                                       |
| **Estimated runtime**  | ~15-25 min (1 plan × 2 tasks of pure authoring)                                            |

---

## Sampling Rate

- After Task 1 (backlog): inline node check for frontmatter + section count + slug count
- After Task 2 (trigger): inline node check for substring + line count
- No watch mode; no Vitest

---

## Per-Task Verification Map

| Plan  | Task   | Requirement         | Test Type | Automated Command                                                                                 | Status     |
| ----- | ------ | ------------------- | --------- | ------------------------------------------------------------------------------------------------- | ---------- |
| 04-01 | Task 1 | SUB-V2-01 (backlog) | smoke     | inline node — `DEFERRED-AWAITING-R3-VALIDATION` + `\$50\|\$129` + ≥10 region sections + ≥30 slugs | ⬜ pending |
| 04-01 | Task 2 | SUB-V2-01 (handoff) | smoke     | inline node — `gsd:plan-phase 4 --gaps` + DataForSEO/Ahrefs + ≥20 lines                           | ⬜ pending |

**Coverage check:** 1/1 phase requirement IDs mapped. ✓

---

## Wave 0 Requirements

None — Phase 4 has no new infrastructure.

---

## Manual-Only Verifications

| Behavior                                                          | Requirement       | Why Manual                                      | Test Instructions                                                   |
| ----------------------------------------------------------------- | ----------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| R3 keyword purchase decision (DataForSEO $50 vs Ahrefs Lite $129) | SUB-V2-01 trigger | Procurement decision; budget/cadence preference | User decides post-launch; documented in `data/long-tail-trigger.md` |

---

## Validation Sign-Off

- [x] Single plan has automated verify on both tasks
- [x] Wave 0 N/A (no infra)
- [x] No watch-mode flags
- [x] Feedback latency < 5s (inline node checks)
- [x] `nyquist_compliant: true` — phase is intentionally minimal; SUB-V2-01 partially satisfied (backlog scaffolded; substantive plans deferred to R3-data-availability gap-closure cycle)

**Approval:** APPROVED 2026-05-11. Phase 4 is a deliberate minimal-deferral close; substantive long-tail authoring re-plans via `/gsd:plan-phase 4 --gaps` after R3 data lands.
