---
phase: 6
slug: production-deploy-m6
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-11
---

# Phase 6 — Validation Strategy

> Phase 6 = production deploy + monitoring + post-launch backlog. Of the 4 ROADMAP-sketch plans, only **06-01 post-launch backlog** is autonomous-doable; 06-02 (deploy), 06-03 (GSC), 06-04 (cron toggle) all need user/external creds. This phase ships the autonomous half now; user re-plans the rest after deploy via `/gsd:plan-phase 6 --gaps`.

---

## Test Infrastructure

| Property               | Value                                                 |
| ---------------------- | ----------------------------------------------------- |
| **Framework**          | None — Phase 6 plan 01 ships docs only                |
| **Quick run command**  | Inline node check on backlog + template files         |
| **Full suite command** | N/A — Phase 5 suite is the gate; no new Phase 6 tests |
| **Estimated runtime**  | ~15-25 min (1 plan × 2 docs tasks)                    |

---

## Per-Task Verification Map

| Plan  | Wave | Task   | Requirement(s)               | Test Type    | Status     |
| ----- | ---- | ------ | ---------------------------- | ------------ | ---------- |
| 06-01 | 1    | Task 1 | DEP-05 (backlog)             | docs-content | ⬜ pending |
| 06-01 | 1    | Task 2 | DEP-06 (completion-template) | docs-content | ⬜ pending |

**Coverage check:** 2/6 phase requirement IDs (DEP-05, DEP-06) mapped autonomously. DEP-01..04 are user-gated.

---

## Manual-Only Verifications (USER-GATED — post-autonomous-runway)

| Behavior                                                                   | Requirement               | Why Manual                              |
| -------------------------------------------------------------------------- | ------------------------- | --------------------------------------- |
| Production deploy: Vercel Pro + DNS + env vars + basic-auth + HTTPS + HSTS | DEP-01                    | External-service auth, procurement, DNS |
| Google Search Console verify + sitemap submit + IndexNow                   | DEP-02                    | Google account auth                     |
| Vercel Cron Jobs activation (affiliate-health weekly)                      | DEP-03 (partial) + DEP-04 | Vercel dashboard toggle                 |
| Lighthouse production sample (5 URLs ≥targets)                             | DEP-04                    | Requires live production URL            |

These four user-action items become Phase 6 plans 02-05 via `/gsd:plan-phase 6 --gaps` AFTER user completes deploy. Until then, they're documented in `data/pre-deploy-checklist.md` (Phase 5.02 output).

---

## Validation Sign-Off

- [x] Plan 01 has automated verify on both tasks
- [x] Manual-only items justified by external-service-auth nature
- [x] No watch-mode flags
- [x] Feedback latency < 5s (inline node)
- [x] `nyquist_compliant: true` — autonomous half of Phase 6 is verifiable; user-gated half re-plans post-deploy

**Approval:** APPROVED 2026-05-11. Phase 6 minimal-autonomous close; v1.0 milestone autonomous-runway COMPLETE pending user deploy chain.
