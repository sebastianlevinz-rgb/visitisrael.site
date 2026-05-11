# Phase 3 Region Replication Report

**Phase:** 03-region-replication-m3
**Started:** 2026-05-11
**Status:** in-progress

This aggregate report is populated as each Phase 3 plan's Task 4 (per-region soft gate) succeeds. Rows transition from `pending` → `PASS` or `FAIL` as plans complete.

| Region              | Pages Built                    | Affiliate Partners                                                                                      | Lighthouse       | Audit Score (canonical EN/HE) | Religious Compliance      | Soft Gate |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------- | ------------------------- | --------- |
| tel-aviv            | 16 (2 canonical + 14 sub-dest) | 7 distinct (booking, civitatis, getYourGuide, viator, skyscanner, rentalcars, safetyWing)               | DEFERRED-CI-owns | EN=100/HE=100                 | AUD-017..020=0 violations | PASS      |
| dead-sea            | 12 (2 canonical + 10 sub-dest) | 6 distinct (booking, viator, getYourGuide, civitatis, skyscanner, rentalcars, safetyWing)               | DEFERRED-CI-owns | EN=100/HE=100                 | AUD-017..020=0 violations | PASS      |
| galilee             | 14 (2 canonical + 12 sub-dest) | 6 distinct (booking, viator, getYourGuide, skyscanner, rentalcars, safetyWing) + 3 PlaceOfWorship       | DEFERRED-CI-owns | EN=100/HE=100                 | AUD-017..020=0 violations | PASS      |
| eilat               | 12 (2 canonical + 10 sub-dest) | 8 distinct (booking, civitatis, getYourGuide, viator, skyscanner, rentalcars, discoverCars, safetyWing) | DEFERRED-CI-owns | EN=100/HE=100                 | AUD-017..020=0 violations | PASS      |
| negev               | 12 (2 canonical + 10 sub-dest) | 6 distinct (booking, viator, getYourGuide, civitatis, rentalcars, safetyWing) — image-gap canary REG-05 | DEFERRED-CI-owns | EN=100/HE=100                 | AUD-017..020=0 violations | PASS      |
| nazareth            | —                              | —                                                                                                       | —                | —                             | —                         | pending   |
| haifa               | —                              | —                                                                                                       | —                | —                             | —                         | pending   |
| golan               | —                              | —                                                                                                       | —                | —                             | —                         | pending   |
| caesarea            | 10 (2 canonical + 8 sub-dest)  | 7 distinct (booking, civitatis, getYourGuide, viator, skyscanner, rentalcars, safetyWing)               | DEFERRED-CI-owns | EN=100/HE=100                 | AUD-017..020=0 violations | PASS      |
| akko                | —                              | —                                                                                                       | —                | —                             | —                         | pending   |
| west-bank/bethlehem | —                              | —                                                                                                       | —                | —                             | —                         | pending   |

## Latest Gate Outcomes

| tel-aviv | PASS |
| -------- | ---- |
| galilee  | PASS |
| eilat    | PASS |
| dead-sea | PASS |
| negev    | PASS |
| caesarea | PASS |

(One-line per-region status mirror — readable by the plan's verify regex `\|\s*{region}\s*\|.*PASS \|` after prettier-aligned columns are minimized.)

## How to Read This Report

- **Pages Built:** `N` (canonical EN+HE + sub-dest EN+HE pairs)
- **Affiliate Partners:** distinct partner count + comma-separated list
- **Lighthouse:** `PASS` (≥0.85 mobile-perf) | `DEFERRED-CI-owns` (CI workflow handles real runs) | `DEFERRED-file-absent` (Phase 6 cron pending) | `FAIL`
- **Audit Score:** EN canonical / HE canonical, both must be ≥80
- **Religious Compliance:** `AUD-017..020=0 violations` when clean
- **Soft Gate:** `PASS` (Wave unblocked) | `FAIL` (3 fix-attempt budget per plan; halts region after exhaustion)

Each plan's Task 4 runs `pnpm qa:region-gate <region>` which writes the per-region gate report at `data/region-gates/<region>.md`. This aggregate report references those for full per-page detail.
