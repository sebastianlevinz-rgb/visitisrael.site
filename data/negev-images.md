# Negev Desert — Image Sourcing Policy (REG-05)

**Phase:** 03-region-replication-m3 / plan 05
**Status:** v1 thin-gallery acceptable; Phase 6 commission gap documented
**Last Reviewed:** 2026-05-11 — Phase 3 plan 05 Wave 0

## Why This Doc Exists (REG-05)

Negev is the **image-gap canary** for the region-replication system. CONTEXT.md
locks Wikimedia coverage at **40-50%** for this region — significantly thinner
than Jerusalem (80-90%) or Tel Aviv (75-85%). Rather than blocking the launch
on missing photography, we:

1. Accept a **thinner 3-4 photo gallery** (vs Jerusalem's 6+) for v1
2. Use **Sharp-generated placeholder JPEGs** at documented dimensions
3. Anchor each placeholder to a **REAL Wikimedia / IGPO sourceUrl** in
   `data/photo-credits.json` — so when the Phase 6 image-replace pass downloads
   the production binaries, dimensions remain compatible
4. **Document the gap here** + flag specific subjects for Phase 6 commission

The canary value: this plan proves the replication workflow handles photo-poor
regions without halting. The pattern is reusable for plan 11 (Bethlehem) and
any future region where Wikimedia coverage is thin.

## Wikimedia Coverage Estimate (CONTEXT.md / PITFALLS §5.2)

| Subject                       | Wikimedia coverage | Source quality                     |
| ----------------------------- | ------------------ | ---------------------------------- |
| Mitzpe Ramon / Makhtesh Ramon | 70-80%             | Well-covered geological feature    |
| Avdat Nabataean UNESCO        | 65-75%             | Well-covered archaeological        |
| Sde Boker / Ben-Gurion grave  | 50-60%             | National-historical thin           |
| Ein Avdat canyon              | 40-50%             | Niche hiking; few wide-format      |
| Bedouin hospitality scenes    | 20-30%             | RESPECTFUL coverage especially thin |
| Generic Negev landscape       | 60-70%             | Adequate placeholder pool          |

**Aggregate v1 coverage: 40-50%** (image-gap canary acknowledged).

## v1 Decision

- **Accept thinner 3-4 photo gallery** for the canonical (vs Jerusalem's 6+).
- **Synthetic Sharp-generated placeholder JPEGs** at documented dimensions
  with REAL Wikimedia / IGPO URLs in `data/photo-credits.json` ledger.
- All ledger entries valid (width >= 1200, real sourceUrl, license known).
- `pnpm qa:credits` audit passes; soft-gate accepts thinner gallery because it
  evaluates audit scores, not image count.

## Phase 6 Commission Budget

- **Budget approved: $1,500–$3,000 USD**
- **Subjects requiring real-image commission** (in priority order):
  1. **Bedouin hospitality scenes** — respectful + consensual portraiture;
     community-partnership photographer (e.g. Rahat-based or Lakiya Negev
     Weaving cooperative referral). Fair-wage rate. Khan al-Sultan / Kfar
     Hanokdim-style hosts willing to license — NOT touristic "exotic native"
     framing. **Highest priority** because Wikimedia coverage is the thinnest
     here AND the subject requires the most editorial care.
  2. **Mitzpe Ramon crater rim panorama at golden hour** — Wikimedia has
     day-shots but no golden-hour wide-format. Professional landscape
     photographer with crater-rim access permits.
  3. **Avdat ruins drone shot (where airspace permitted)** — Israel Civil
     Aviation Authority drone-flight clearance required; Avdat is INPA
     (Israel Nature & Parks Authority) administered — separate INPA filming
     permit.
  4. **Sde Boker kibbutz + Ben-Gurion grave area** — wide architectural shot
     of the memorial site; respectful (national memorial framing, NOT
     touristic). Many existing Wikimedia images are narrow snapshots; one
     wide-format from a single licensed source preferred.
  5. **Ein Avdat canyon hike POV** — hiking photographer with permission to
     shoot the marked trail; INPA permit if commercial.

- **Alternative path:** IGPO archive sourcing (free; subject to availability
  + `restrictedSiteAcknowledgment` where appropriate). IGPO has historical
  Bedouin coverage from the 1960s-80s that may be reusable with respectful
  caption framing.

## Synthetic Placeholder Entries Flagged for Phase 6 Swap

These ledger entries (in `data/photo-credits.json`) currently point to
Wikimedia/IGPO URLs but the **on-disk binary is a Sharp placeholder**. Phase 6
must download the real binaries (or commission new photography) and replace
the placeholder JPEGs:

- `public/images/regions/negev/hero.jpg` — Makhtesh Ramon (Wikimedia URL real;
  swap to higher-resolution golden-hour commission if budget allows)
- `public/images/regions/negev/mitzpe-ramon.jpg` — visitor center (Wikimedia
  URL real; placeholder until binary download)
- `public/images/regions/negev/avdat.jpg` — Nabataean ruins (Wikimedia URL
  real; placeholder until binary download or drone commission)
- `public/images/regions/negev/desert.jpg` — generic Negev landscape (Wikimedia
  URL real; **Phase 6 candidate for swap to Bedouin hospitality** once
  consensual portraiture commission lands)
- `public/images/sub-destinations/negev/bedouin-hospitality.jpg` —
  **HIGHEST PHASE 6 PRIORITY**: currently an IGPO archive reference;
  Phase 6 should commission REAL photography from a community-partnership
  photographer working with named Bedouin hosts who have signed model-release
  forms. Fair-wage compensation. NEVER use as touristic "exotic" imagery.
- `public/images/sub-destinations/negev/{mitzpe-ramon,avdat,sde-boker,ein-avdat}.jpg`
  — all currently placeholders pointing to real Wikimedia URLs; Phase 6 binary
  download routine will replace.

## Editorial Framing Lock (CONTEXT.md §4.6)

Independent of which photographer ships the binaries, the editorial framing
on all Bedouin hospitality imagery must:

- Acknowledge **Bedouin Israeli citizenship** (not "tribal" or "exotic native")
- Name **community-partnership operators** when known (Khan al-Sultan, Kfar
  Hanokdim, Lakiya Negev Weaving, Drijat eco-village)
- Use **fair-wage commercial framing**: tea-and-coffee tradition is
  hospitality, not folklore performance
- Avoid identifying individuals without explicit consensual model release
- Acknowledge multi-generational hosts in Rahat / Lakiya / Tel Sheva when
  factually accurate

## Verification

`data/negev-images.md` must:

- Exist at `data/negev-images.md` (path-checked by plan 05 Task 1 + Task 4 verify regex)
- Contain the substring `$1,500` (literal — checked by plan 05 verify)
- Document Wikimedia coverage estimate + Phase 6 commission budget +
  synthetic placeholder swap list (informational; not regex-checked but
  required by REG-05 deliverable)

## Last Reviewed

2026-05-11 — Phase 3 plan 05 Wave 0 (image-gap canary validation)
