---
phase: 5
slug: legal-launch-prep-m5
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-11
---

# Phase 5 — Validation Strategy

> Phase 5 = launch readiness + deploy handoff. Consolidates the ROADMAP's 4 plans down to 2 (5.01 launch audit consolidates editorial gap-fill + IS 5568 sweep + QA sweep; 5.02 is the deploy handoff docs that replace the user-gated 05-04). Substantive site code does NOT change in Phase 5 unless the audit surfaces gaps.

---

## Test Infrastructure

| Property               | Value                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**          | Vitest (existing) + the full pnpm qa:\* gate suite (no new infra)                                                                              |
| **Quick run command**  | Inline node checks on launch-readiness-report.md + pre-launch-checklist.md + pre-deploy-checklist.md                                           |
| **Full suite command** | `pnpm typecheck && pnpm lint && pnpm test --run && pnpm build && pnpm qa:credits && pnpm qa:schema && pnpm qa:audit && pnpm qa:hebrew-content` |
| **Estimated runtime**  | ~45-90 min total (1 plan × full QA pipeline = ~30-45 min; 1 plan × 2 docs tasks = ~20-30 min)                                                  |

---

## Sampling Rate

- **5.01 Task 1:** every gate's exit code + output captured to data/launch-readiness-report.md
- **5.01 Task 2:** every PITFALLS §13 item executed; PASS/DEFER/FAIL captured to data/pre-launch-checklist.md
- **5.02 Task 1 & 2:** inline node checks on each output doc (line count, key substring presence, no-real-secret check)

---

## Per-Task Verification Map

| Plan  | Wave | Task   | Requirement(s)   | Test Type         | Status     |
| ----- | ---- | ------ | ---------------- | ----------------- | ---------- |
| 05-01 | 1    | Task 1 | A11Y-04, DEP-03  | full-pipeline     | ⬜ pending |
| 05-01 | 1    | Task 2 | A11Y-03, A11Y-04 | checklist-audit   | ⬜ pending |
| 05-02 | 2    | Task 1 | DEP-01           | docs-handoff      | ⬜ pending |
| 05-02 | 2    | Task 2 | DEP-01           | env-vars-template | ⬜ pending |

**Coverage check:** 3/3 phase requirement IDs (A11Y-03, A11Y-04, DEP-01, DEP-03) mapped. ✓

---

## Wave 0 Requirements

None — Phase 5 has no new infrastructure; everything reuses Phase 1+2+3 gates.

---

## Manual-Only Verifications

| Behavior                                                                                | Requirement | Why Manual                            | Test Instructions                                                                    |
| --------------------------------------------------------------------------------------- | ----------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| Vercel Pro provisioning + DNS + Affiliate AID enrollment + Search Console + Cron toggle | DEP-01..06  | External-service auth + procurement   | User follows `data/pre-deploy-checklist.md` post-Phase-5                             |
| Statement notarization (if required for IS 5568)                                        | A11Y-03     | Legal action requires human signature | User verifies coordinator can be contacted at the published number/email post-launch |

---

## Validation Sign-Off

- [x] Both plans have automated verify on every task
- [x] Wave 0 N/A (no infra)
- [x] No watch-mode flags
- [x] Feedback latency < 90s (qa:audit is the longest; <60s)
- [x] `nyquist_compliant: true` — site has been verifiable at every Phase 1-3 step; Phase 5 is a final-sweep + handoff close

**Approval:** APPROVED 2026-05-11. Phase 5 closes the autonomous-runway; Phase 6 user-gated steps (01/02/03) follow per data/pre-deploy-checklist.md.
