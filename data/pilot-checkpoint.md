# Pilot-Switch Checkpoint (Phase 2.2 → 2.3)

**Evaluated:** 2026-05-11T07:45:04.099Z
**Verdict:** PASS

## Criterion 1: Editorial Style (AUD-017..AUD-020)

- AUD-017 (Wailing Wall regex): EN=0 violations, HE=0 violations
- AUD-018 (biased framing): EN=0 violations, HE=0 violations
- AUD-019 (Temple Mount paired): EN=0 violations, HE=0 violations
- AUD-020 (administrativeStatus frontmatter): EN=0 violations, HE=0 violations
  **Result:** PASS — all AUD-017..020 rules report 0 violations on both /en/jerusalem and /jerusalem

## Criterion 2: Restricted-Site Image Sourcing

- Total restricted-site Jerusalem images: 2
- With cleared restrictedSiteAcknowledgment: 2 (100%)
  **Result:** PASS — 2/2 restricted-site Jerusalem images cleared (100%)

## Criterion 3: Hebrew Translation Throughput

- 2.1 EN wall-clock: 38 min
- 2.2 HE wall-clock: 15 min
- Ratio: 0.39×
  **Result:** PASS — HE/EN ratio 0.39 ≤ 2.0

## Verdict

All 3 criteria PASS. Phase 2.3 (Jerusalem sub-destinations EN+HE pairs)
is unblocked. Jerusalem remains the pilot region; the Israel-specific
differentiators (paired religious naming in Hebrew, RTL rendering,
native-Hebrew register, restricted-site image clearance) all functioned
end-to-end at production depth.

## Suggested next action

Proceed to Phase 2.3 (Jerusalem sub-destinations). The pilot region
is locked as Jerusalem; Tel Aviv remains the documented v2 fallback
only if a future Quality Gate flags rework needs.
