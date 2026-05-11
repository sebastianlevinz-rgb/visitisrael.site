# Phase 01 — Deferred Items (out-of-scope discoveries during plan execution)

Each entry was found while executing a plan but does NOT belong to that plan's scope. Address in a dedicated cleanup pass.

---

## 1. ROADMAP plan-numbering drift (logged 2026-05-11 during plan 09 execution)

**Found during:** Plan 09 (ner-detection) — STATE/ROADMAP update step.

**Issue:** `.planning/ROADMAP.md` Phase 1 plan list numbers the plans `01-09 Audit dashboard`, `01-10 Lighthouse CI`, `01-11 NER detection`. The actual filenames are `09-ner-detection-PLAN.md`, `10-audit-dashboard-PLAN.md`, `11-lighthouse-ci-PLAN.md`. The legacy numbering predates plan 09; the planner appears to have re-ordered into wave-priority order when generating PLAN.md files but didn't update ROADMAP.

**Impact:** Cosmetic — does not break execution. `gsd-tools roadmap update-plan-progress` counts PLAN/SUMMARY files on disk so the progress table (`9/11`) is correct; only the per-plan checkbox list is mislabeled.

**Recommended fix:** Renumber the three ROADMAP entries to match filenames:

- `01-09: NER detection ...`
- `01-10: Audit dashboard ...`
- `01-11: Lighthouse CI gate ...`

Single edit in `.planning/ROADMAP.md` lines ~103-105. Best done in a dedicated `docs(roadmap): renumber Phase 1 plan list` commit, NOT mixed into plan execution work.
