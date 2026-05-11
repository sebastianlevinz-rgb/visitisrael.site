---
phase: 3
slug: region-replication-m3
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-05-11
---

# Phase 3 — Validation Strategy

> Per-phase validation contract. Phase 3 = scale-up; infrastructure operational from Phase 1+2; soft per-region gates replace the hard Phase 2 gate.

---

## Test Infrastructure

| Property                 | Value                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**            | Vitest 2.x (from Phase 1) + `@lhci/cli` (CI-deferred per Phase 2.6 Windows lesson) + `axe-core`                                  |
| **Config file**          | `vitest.config.ts` + `eslint.config.js` + `.lighthouserc.cjs` (no new infra except Phase 3 Wave 0)                               |
| **Quick run command**    | `pnpm test --run`                                                                                                                |
| **Per-region soft gate** | `pnpm qa:region-gate {region-slug}` (NEW Wave 0 of plan 01)                                                                      |
| **Full suite command**   | `pnpm lint && pnpm typecheck && pnpm test --run && pnpm qa:credits && pnpm qa:schema && pnpm qa:audit && pnpm qa:hebrew-content` |
| **Estimated runtime**    | ~90s full suite · 5min Lighthouse on CI · ~20-30min per region authoring + soft gate                                             |

---

## Sampling Rate

- **After every task commit:** `pnpm test --run` (≤30s)
- **After every region's plan completes:** `pnpm qa:region-gate {slug}` (≤10s — reads existing audit-results.json)
- **After every WAVE completes:** full suite + audit + region-gate for each region in wave
- **Before Phase 3 close:** `pnpm qa:audit` site-wide; aggregate `data/region-replication-report.md` shows all 11 regions soft-gate-passed
- **Max feedback latency:** 30s unit · 90s suite · 10s region-gate

---

## Per-Task Verification Map

> 5 phase req IDs × verification commands. Each region's plan exercises all 5 — by the time wave 5 completes, every req has been verified ~11 times across regions.

| Plan (region)     | Wave | Requirement         | Test Type | Automated Command                                                                                                                                      | Status     |
| ----------------- | ---- | ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| 03-01 (Tel Aviv)  | 1    | REG-01 (canonical)  | smoke     | `pnpm qa:audit` shows `/en/tel-aviv/` and `/tel-aviv/` as REGION_CANONICAL ≥80                                                                         | ⬜ pending |
| 03-01             | 1    | REG-02 (sub-dests)  | smoke     | `pnpm qa:audit` shows 6-8 sub-dest pairs at SUB_DESTINATION ≥75                                                                                        | ⬜ pending |
| 03-01             | 1    | REG-03 (soft gate)  | smoke     | `pnpm qa:region-gate tel-aviv` exits 0 with PASS verdict                                                                                               | ⬜ pending |
| 03-02 (Dead Sea)  | 2    | REG-01..03          | smoke     | same pattern: `pnpm qa:region-gate dead-sea` exits 0                                                                                                   | ⬜ pending |
| 03-03 (Galilee)   | 2    | REG-01..03          | smoke     | `pnpm qa:region-gate galilee` exits 0                                                                                                                  | ⬜ pending |
| 03-04 (Eilat)     | 2    | REG-01..03          | smoke     | `pnpm qa:region-gate eilat` exits 0                                                                                                                    | ⬜ pending |
| 03-05 (Negev)     | 3    | REG-01..03 + REG-05 | smoke     | `pnpm qa:region-gate negev` exits 0; `data/negev-images.md` exists with Phase 6 commission notes                                                       | ⬜ pending |
| 03-06 (Nazareth)  | 3    | REG-01..03          | smoke     | `pnpm qa:region-gate nazareth` exits 0; religious-naming AUD-017..020 = 0 violations                                                                   | ⬜ pending |
| 03-09 (Caesarea)  | 3    | REG-01..03          | smoke     | `pnpm qa:region-gate caesarea` exits 0                                                                                                                 | ⬜ pending |
| 03-07 (Haifa)     | 4    | REG-01..03 + REG-05 | smoke     | `pnpm qa:region-gate haifa` exits 0; `data/haifa-bahai-policy.md` exists with Wikimedia-only note                                                      | ⬜ pending |
| 03-08 (Golan)     | 4    | REG-01..03          | smoke     | `pnpm qa:region-gate golan` exits 0                                                                                                                    | ⬜ pending |
| 03-10 (Akko)      | 4    | REG-01..03          | smoke     | `pnpm qa:region-gate akko` exits 0                                                                                                                     | ⬜ pending |
| 03-11 (Bethlehem) | 5    | REG-04              | smoke     | `pnpm qa:audit` AUD-019 = 0 violations on `/west-bank/bethlehem/`; `administrativeStatus: 'palestinian-authority'` frontmatter validates; no sub-dests | ⬜ pending |
| Phase close       | 5    | All REG             | aggregate | `data/region-replication-report.md` lists all 11 regions with verdict + audit scores + Lighthouse status (DEFERRED to CI acceptable)                   | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

**Coverage check:** 5/5 phase requirement IDs mapped to verification commands. ✓

---

## Wave 0 Requirements

### Plan 01 (Tel Aviv) Wave 0

- [ ] `scripts/qa/region-gate.mjs` — per-region soft gate evaluator (filter audit-results by region prefix; check ≥80 canonical / ≥75 sub-dest / 0 blocking / EN+HE parity)
- [ ] `package.json` script `qa:region-gate` invocable as `pnpm qa:region-gate {region-slug}`
- [ ] Vitest tests for region-gate (pass scenario, fail scenario, missing-region scenario)

### Plan 11 (Bethlehem) Wave 0

- [ ] `app/[locale]/west-bank/[slug]/page.tsx` — new route family renderer
- [ ] Velite `westBank` collection (or extend regions schema with administrativeStatus discriminator)
- [ ] Test that route renders `/en/west-bank/bethlehem/` and `/west-bank/bethlehem/`

### Per-region Wave 0 (each plan)

- [ ] Wikimedia source survey for 4-8 images per region — log results
- [ ] Synthetic placeholder generation script (reuse Phase 2.1 `generate-images.mjs` pattern) for unsourceable subjects
- [ ] Photo credits ledger entries for all region images

---

## Manual-Only Verifications

| Behavior                                                       | Requirement | Why Manual                                                                                              | Test Instructions                                                                                               |
| -------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Hebrew typography correct rendering per region                 | REG-01..02  | Vitest jsdom can verify structure but not real browser RTL artifacts                                    | Spot-check 2-3 regions in Chrome + Firefox after Phase 3 close                                                  |
| Lighthouse actual gate execution                               | REG-03      | Local Chrome EPERM on Windows; CI workflow handles                                                      | Open trivial PR after wave 5; verify `.github/workflows/lighthouse.yml` runs; check perf ≥85 on sampled regions |
| Religious-naming sensitivity review for Nazareth/Caesarea/Akko | REG-01..02  | AUD-017..020 detector catches mechanical rules but native-speaker editorial review confirms naturalness | Optional: spot-review 1-2 religious-site sub-dests post-Phase-3                                                 |
| Bethlehem admin-status framing review                          | REG-04      | Editorial tone for politically-sensitive content requires human review                                  | Read /west-bank/bethlehem/ EN+HE before Phase 5 launch prep; confirm factual + non-political                    |
| Image policy confirmation for Haifa Bahá'í                     | REG-05      | Real commissioning requires email + written response from press@bahai.org                               | Phase 6 task; v1 ships Wikimedia-only photos with policy note doc                                               |

---

## Validation Sign-Off

- [x] All tasks have automated verify OR Wave 0 dependencies OR documented manual verification (5 manual items justified by browser-rendering / CI / editorial / external-policy nature)
- [x] Sampling continuity: each plan has at least 1 automated verify per task
- [x] Wave 0 covers all missing references (region-gate script, west-bank route, per-region image surveys)
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter — flipped 2026-05-11 after 11 PLANs committed + gsd-plan-checker confirmed all 5 REG IDs verified + 1 blocker (verify-regex typo `PASS\s\*\|` → `PASS\s*\|`) + 2 minor inconsistencies (plan-11 frontmatter `files_modified` added `scripts/audit/run.ts`; RESEARCH/CONTEXT filename `baha-i-photo-policy.md` → `haifa-bahai-policy.md`) resolved.

**Approval:** APPROVED 2026-05-11. All 5 REG req IDs map to working verification commands across 11 plans. Phase 3 execute eligible (`/gsd:execute-phase 03`).
