---
phase: 03-region-replication-m3
plan: 06
subsystem: content
tags:
  - phase-3
  - region-canonical
  - nazareth
  - basilica-of-the-annunciation
  - marys-well
  - greek-orthodox
  - catholic-franciscan
  - ecumenical-christian
  - arab-israeli
  - hebrew
  - mdx
  - velite
  - region-gate
  - soft-gate
  - place-of-worship
  - schema-emission-dual
  - sub-destinations
  - wave-3
dependency_graph:
  requires:
    - phase-02/01-en-canonical (renderer + Velite + audit wiring)
    - phase-02/02-he-canonical (hebrew-content-writer Business-Casual register; ktiv maleh)
    - phase-02/03-sub-destinations (region-prefixed Velite slug + short URL + parentRegion + religiousSiteId opt-in)
    - phase-03/01-tel-aviv (region-gate.mjs infrastructure validated end-to-end; shared photo-credits append-only pattern)
    - phase-03/03-galilee (PlaceOfWorship dual-schema canary already validated at scale — 3 sub-dests at Galilee; Nazareth reuses the pattern with 2 sub-dests)
  provides:
    - nazareth-region-canonical (production-depth /nazareth EN + HE; ecumenical Christian-pilgrimage + Arab-Israeli editorial)
    - nazareth-sub-destinations (4 EN + 4 HE paired sub-dest pages)
    - basilica-of-the-annunciation-religious-site-entry (new entry in data/religious-sites.json)
    - marys-well-religious-site-entry (new entry in data/religious-sites.json; Greek Orthodox Annunciation tradition)
    - nazareth-region-gate-report (data/region-gates/nazareth.md Verdict: PASS)
  affects:
    - Phase 3 Wave 3 (negev/nazareth/caesarea parallel execution — Nazareth completion confirms 3-way parallel-write pattern)
    - Phase 3 plan 11 Bethlehem (Church of the Nativity — same PlaceOfWorship pattern + administrativeStatus extension)
    - Phase 4 long-tail sweep (extended Christian-pilgrimage sub-dest authoring at scale)
tech_stack:
  added: []
  patterns:
    - "Two-tradition Christian-pilgrimage editorial: every reference to the Annunciation names both the Catholic Latin tradition (centred at the Basilica) AND the Greek Orthodox tradition (centred at Mary's Well + the adjacent Greek Orthodox Church of the Annunciation) in the same paragraph. Single-tradition framing is an explicit anti-pattern in Nazareth, even more so than at Galilee, because the two Annunciation traditions are physically separated by 10 minutes' walk and any visitor itinerary visits both consecutively."
    - 'Arab-Israeli editorial register: "largest Arab city in Israel" / "Arab citizens of Israel" / "Arab-Israeli residents" all used as factual phrasings. AUD-018 biased framings ("Israeli Arab town", "occupied Arab") explicitly forbidden. The Old City page leads with the "working bazaar for the city''s Arab-Israeli residents" framing rather than treating the souq as primarily a pilgrim arcade.'
    - 'Dual PlaceOfWorship schema emission with companion religious-site entries: basilica-of-the-annunciation + marys-well both added to data/religious-sites.json with full denomination strings + coordinates + restrictedAccess: false + pairedNamingRequired: false. The legacy basilica-of-annunciation entry (Phase 2 plan 04) is retained as an alias with a notes-field cross-reference.'
    - "Mount of Precipice as Place semantics (NOT PlaceOfWorship): the cliff is the Luke 4 tradition site but is open-air, has no church, and is treated as a panoramic viewpoint with Gospel-tradition significance. religiousSiteId frontmatter omitted; renderer emits TouristAttraction-only. This is the explicit distinction between active worship sites (Basilica, Mary's Well) and outdoor tradition sites (Mount of Precipice) at sub-destination scale."
    - 'Mid-band HE ratio targeting at sub-dest scale: 4 of 4 HE sub-dest first drafts at 0.81-0.93 ratios; one (marys-well) required 50w of native HE expansion (history of the spring + Crusader stratigraphy chapter) to lift from 0.807 to 0.884. Phase 3 standard practice from Galilee plan locked: budget 50-130w native HE expansion per page in advance.'
    - 'EN canonical trimming pattern: first draft landed at 2598 words (above 2500 max). Trimmed 125 words from intro + Where to Eat sections to reach 2473 (mid-band of 1500-2500 with cushion for ratio movement). Trimming EN raised HE/EN ratio from 0.840 (below floor) to 0.882 (in band) without HE expansion required for the canonical.'
    - "Parallel-execution coordination event handled at scale: Nazareth Task 1 photo-credits.json entries were lost twice to overlapping Write-tool invocations by the Negev parallel agent. Re-appended each time via Edit (surgical), with the third commit absorbed by Negev's git add scope (commit 69ad67c contains BOTH Negev test scaffolding AND Nazareth Wave 0 deliverables — attribution-confused but data-complete)."
    - "Pre-commit-hook qa:credits cascade: Negev's invalid CC-BY-SA-2.0 license enum value blocked qa:credits for ALL regions (Zod parse failure → empty ledger → every disk image flagged orphan). Caesarea agent observed and documented; Negev agent fixed independently. Wave 3 deferred-items.md cross-cascade entry locks the policy: agents do NOT fix each other's schema bugs unless they are explicitly blocking the agent's own task pipeline."
key_files:
  created:
    - 'content/en/regions/nazareth.mdx'
    - 'content/he/regions/nazareth.mdx'
    - 'content/en/sub-destinations/nazareth-basilica-of-the-annunciation.mdx'
    - 'content/en/sub-destinations/nazareth-old-city.mdx'
    - 'content/en/sub-destinations/nazareth-marys-well.mdx'
    - 'content/en/sub-destinations/nazareth-mount-of-precipice.mdx'
    - 'content/he/sub-destinations/nazareth-basilica-of-the-annunciation.mdx'
    - 'content/he/sub-destinations/nazareth-old-city.mdx'
    - 'content/he/sub-destinations/nazareth-marys-well.mdx'
    - 'content/he/sub-destinations/nazareth-mount-of-precipice.mdx'
    - 'data/region-gates/nazareth.md'
    - 'public/images/regions/nazareth/{hero,basilica,old-city,mount-of-precipice}.jpg'
    - 'public/images/regions/nazareth/generate-images.mjs'
    - 'public/images/sub-destinations/nazareth/{basilica-of-the-annunciation,old-city,marys-well,mount-of-precipice}.jpg'
    - 'public/images/sub-destinations/nazareth/generate-images.mjs'
    - 'tests/content/nazareth-region.test.ts'
  modified:
    - 'data/religious-sites.json (added basilica-of-the-annunciation + marys-well entries)'
    - 'data/photo-credits.json (8 Nazareth ledger entries appended)'
    - 'app/sitemap.ts (5 Nazareth paths added)'
    - 'data/region-replication-report.md (nazareth row populated + Latest Gate Outcomes mirror entry)'
    - '.planning/phases/03-region-replication-m3/deferred-items.md (Wave 3 Negev cross-cascade + TransportInfo blocker observations)'
decisions:
  - "Two religious-site entries for Nazareth rather than one: basilica-of-the-annunciation (Catholic Franciscan; 1969 building over 4th-c Byzantine + 12th-c Crusader) AND marys-well (Greek Orthodox tradition of the Annunciation; the adjacent Greek Orthodox Church of the Annunciation aka St. Gabriel's Church is the architectural anchor). The two traditions correspond to two physical sites 10 minutes' walk apart and the standard pilgrim itinerary visits both consecutively. The legacy Phase-2 basilica-of-annunciation entry (dash-less) is retained as an alias with a notes-field cross-reference to basilica-of-the-annunciation for backward compatibility."
  - 'Mount of Precipice emits TouristAttraction-only (no PlaceOfWorship). The cliff is the canonical pilgrim site for the Luke 4 narrative of Jesus being driven from the Nazareth synagogue, but the site itself is open-air with no church, no active worship, and the Byzantine-era tradition rests on tradition rather than archaeological evidence. Decision pattern: when a site has Gospel-narrative significance but is treated by visitors as a panoramic viewpoint rather than an active worship space, omit religiousSiteId. The Jesus Trail formal trailhead at the cliff is treated as a hiking access point, not a liturgical anchor.'
  - "Ecumenical Christian editorial tone locked at every Christian-tradition reference: the canonical and both PlaceOfWorship sub-dests explicitly name (a) Catholic Franciscan custody at the Basilica, (b) Greek Orthodox jurisdiction at Mary's Well + the adjacent Greek Orthodox Church of the Annunciation, AND (c) Protestant + Evangelical pilgrim groups visiting both sites freely. Vatican II ecumenical-dialogue context is referenced in the Basilica HE sub-dest as a structural explanation for why the 1969 Barluzzi building was possible. This is the Phase 3.3 Galilee lesson #2 applied at the city-scale in Nazareth, where the two Annunciation traditions are unusually physically separated rather than blended in the same complex."
  - 'Arab-Israeli editorial register: "largest Arab city in Israel" (factual; ~80,000 residents; ~30% Christian, ~70% Muslim per CONTEXT.md briefing) named in both the canonical and the Old City sub-dest. The forbidden AUD-018 phrasings ("Israeli Arab town", "occupied Arab") verified absent via Vitest assertion in tests/content/nazareth-region.test.ts. The Old City page leads with the "working bazaar for the city''s Arab-Israeli residents" framing rather than treating the souq as primarily a pilgrim arcade — the cultural-tissue framing is structural to the page''s purpose.'
  - 'EN canonical trimming over HE expansion for the canonical ratio: first draft EN landed at 2598 words (above 2500 max) and HE at 2182 words → ratio 0.840 (below 0.85 floor). Trimmed 125 words from EN intro + Where to Eat sections to reach EN=2473 / HE=2182 → ratio 0.882 (in band). For sub-destinations, the standard 50-130w native HE expansion pattern applied (marys-well needed 50w; the other 3 pairs reached mid-band on first HE draft). Decision pattern: when both EN max and HE floor are at risk, trim EN first; HE expansion is reserved for cases where EN is already in mid-band.'
  - 'Caesarea + Negev parallel agents'' Wave 3 build failures (Caesarea HE TouristDestination missing field; Negev HE TransportInfo malformed prop) blocked the Nazareth Task 4 build for ~20 minutes. Per CONTEXT.md "does NOT cascade per CONTEXT.md" (per-region halt does not propagate to other regions), waited for parallel agents to fix their own bugs. Both fixed within the 30-minute observation window; clean build then succeeded, qa:audit ran clean (163 pages scanned, 929 issues across all phases, 0 blocking for Nazareth), region-gate PASS. Wave 3 three-way parallel pattern (Negev + Nazareth + Caesarea) holds.'
  - "Photo-credits.json append-only protocol survives parallel Write-tool clobber: Nazareth's 8 ledger entries were appended twice (lost once to Negev's stale-Read-then-Write race; lost once to Caesarea's stale-Read-then-Write race; re-appended the third time and persisted to commit 69ad67c via Negev's git add scope). Pattern: when a parallel agent overwrites your photo-credits entries, re-Edit (surgical) rather than re-Write (full file). The pre-commit hook's qa:credits gate caught the Negev license-enum cascade and forced fix-attempt-then-retry by the Negev agent — the gate is working as designed."
  - 'religious-sites.json key naming convention: plan 03-06 introduces basilica-of-the-annunciation (with-the) as the canonical religiousSiteId reference in PLAN.md, alongside the legacy basilica-of-annunciation (without-the) from Phase 2 plan 04. Both keys present; both valid Zod records. Future Phase 4+ should use the with-the variant; the without-the legacy key carries a notes-field cross-reference. This is the first inconsistency surfaced in religious-sites.json keying since Phase 2; if a third variant appears (e.g. nazareth-basilica vs basilica-of-the-annunciation) Phase 4 should consolidate via an explicit migration commit.'
metrics:
  duration_min: 51
  tasks: 4
  files_created: 18
  files_modified: 5
  commits: 5
  audit_score_nazareth_en: 100
  audit_score_nazareth_he: 100
  audit_score_sub_dest_avg: 100
  audit_blocking_issues: 0
  word_count_canonical_en: 2473
  word_count_canonical_he: 2182
  he_en_canonical_ratio: 0.882
  word_count_sub_dest_en_avg: 1089
  word_count_sub_dest_he_avg: 976
  he_en_sub_dest_ratio_avg: 0.897
  h2_sections_canonical_en: 10
  h2_sections_canonical_he: 10
  affiliate_card_placements_canonical: 7
  distinct_affiliate_partners_canonical: 6
  distinct_affiliate_partners_phase: 6
  faq_entries_canonical: 7
  place_of_worship_emission_pages: 4
  tourist_attraction_only_pages: 6
  region_gate_verdict: PASS
completed: 2026-05-11
---

# Phase 3 Plan 06: Nazareth Region Replication Summary

**Nazareth canonical (EN+HE, 2473w/2182w) + 4 paired sub-destinations (8 MDX pages) + dual PlaceOfWorship schema emission validated on Basilica of the Annunciation + Mary's Well + soft-gate PASS — Wave 3 Nazareth complete in parallel with Negev + Caesarea.**

## Performance

- **Duration:** 51 min
- **Started:** 2026-05-11T14:31:57Z
- **Completed:** 2026-05-11T15:23:09Z
- **Tasks:** 4
- **Files created:** 18
- **Files modified:** 5

## Accomplishments

- **Task 1 (Wave 0) — religious-sites + 8 image ledger entries**. Added `basilica-of-the-annunciation` and `marys-well` to `data/religious-sites.json` as the two PlaceOfWorship-schema-emission anchors for Nazareth (Catholic Franciscan + Greek Orthodox traditions of the Annunciation respectively). Generated 4 Nazareth region + 4 sub-dest placeholder JPEGs via Sharp at documented dimensions; appended 8 photo-credits.json ledger entries with real Wikimedia + IGPO sourceUrls (CC-BY-SA-3.0 / CC-BY-4.0 / IGPO-CC). `pnpm qa:credits` 0 violations after Negev's license-enum cascade resolved.
- **Task 2 — Nazareth EN canonical**. `/en/nazareth/` 2473 words, 10 H2 sections following PITFALLS §4.7 H-tag scaffolding (When to Visit, Where to Stay, Top Things to Do, Christian Pilgrimage Routes, Arab-Israeli Culture, Day Trips, How to Get There, Where to Eat, Practical Info, Frequently Asked Questions), 6 distinct AffiliateCard partners + 1 TransportInfo composite, 7 FAQ entries, schema TouristDestination + BreadcrumbList + FAQPage. **Editorial register: ecumenical Christian-pilgrimage** (acknowledges Catholic Franciscan custody at the Basilica + Greek Orthodox jurisdiction at Mary's Well + Protestant + Evangelical pilgrim groups visiting both freely) **+ Arab-Israeli factual framing** (largest Arab city in Israel; ~80,000 residents; ~30% Christian / ~70% Muslim heritage in shared Old City). EN first draft at 2598w required trim of 125w from intro + Where to Eat sections to reach mid-band. REGION_CANONICAL profile score **100/100** with 0 blocking.
- **Task 2 — Nazareth HE canonical**. `/nazareth/` 2182 words via native HE rewrite using hebrew-content-writer Business-Casual register; ktiv maleh consistent; Latin brands wrapped `<span dir="ltr" lang="en">`. H-tag scaffolding mirrors EN. HE/EN word-count ratio **0.882** (mid-band per AUD-007 [0.85, 1.40]). Trim of EN raised the ratio from 0.840 (below floor) into the band without HE expansion required for the canonical. Same 6-partner AffiliateCard mix as EN. נצרת density >=5 confirmed via Vitest. REGION_CANONICAL profile score **100/100** with 0 blocking.
- **Task 3 — 4 sub-destinations EN+HE pairs**. 8 MDX files at `/nazareth/{basilica-of-the-annunciation, old-city, marys-well, mount-of-precipice}/` in both locales. **Dual PlaceOfWorship schema-emission validated**: 2 of 4 sub-dests carry religiousSiteId frontmatter (`basilica-of-the-annunciation`, `marys-well`) and the renderer emits PlaceOfWorship JSON-LD in addition to TouristAttraction on all 4 expected pages (2 EN + 2 HE). The other 2 sub-dests (old-city, mount-of-precipice) emit TouristAttraction-only as designed — mount-of-precipice specifically chosen as TouristAttraction-only because it is an open-air Gospel-tradition viewpoint rather than an active worship site. Each page 1033-1131w EN, 0.875-0.933 HE/EN ratios per pair (marys-well required 50w of native HE expansion to lift from 0.807 to 0.884), ≥1 AffiliateCard, SUB_DESTINATION profile score **100/100** across all 8 pages, 0 blocking issues, 0 AUD-006/007/009/012/017-020/024/025/031 violations.
- **Task 4 — per-region soft gate PASS**. `pnpm qa:region-gate nazareth` exits 0 with Verdict: PASS. `data/region-gates/nazareth.md` written with full per-page breakdown (EN=100/HE=100 canonical, 4 sub-dest pairs all 100). EN+HE parity 5/5. Blocking 0. Lighthouse DEFERRED-CI-owns. `data/region-replication-report.md` nazareth row populated. **Wave 3 Nazareth completes the parallel execution alongside Negev and Caesarea.**

## Task Commits

Each task was committed atomically (Task 1 absorbed into Negev's commit scope during parallel-write race):

1. **Task 1 (Wave 0): religious-sites + 8 image ledger entries** — `69ad67c` (combined with Negev test scaffolding; attribution-confused but data-complete; see Decisions #7)
2. **Task 2 RED: failing test for Nazareth canonical + 4 sub-dest pairs** — `af7eceb` (test)
3. **Task 2 GREEN: Nazareth EN + HE canonical** — `26b8f63` (feat)
4. **Task 3: 4 sub-destinations EN+HE pairs** — `28c8f53` (feat)
5. **Task 4: nazareth soft-gate PASS** — `495a32f` (feat)

_Task 2 used TDD per `tdd="true"` on the plan task; the RED+GREEN cadence produced two commits as expected. Task 3 inherited the same test file (sub-dest assertions were already written in Task 2 RED but skipped on missing MDX); files appeared during Task 3 so the existing assertions exited skip and asserted pass._

## Files Created/Modified

### Created (18)

**Nazareth canonical content (2):**

- `content/en/regions/nazareth.mdx` — EN canonical 2473 words, 10 H2 sections, 6 affiliate partners, 7 FAQs
- `content/he/regions/nazareth.mdx` — HE canonical 2182 words, native rewrite, 0.882 HE/EN ratio, same partner mix

**Nazareth sub-destinations (8):**

- `content/en/sub-destinations/nazareth-{basilica-of-the-annunciation, old-city, marys-well, mount-of-precipice}.mdx` (4)
- `content/he/sub-destinations/nazareth-{basilica-of-the-annunciation, old-city, marys-well, mount-of-precipice}.mdx` (4)

**Region gate report (1):**

- `data/region-gates/nazareth.md` — Nazareth gate report Verdict: PASS

**Test file (1):**

- `tests/content/nazareth-region.test.ts` — 66 content invariants pinning canonical EN+HE + 4 sub-dest pairs (PlaceOfWorship canary tests for basilica + marys-well + TouristAttraction-only tests for old-city + mount-of-precipice)

**Images (8 JPEGs + 2 generators):**

- `public/images/regions/nazareth/{hero,basilica,old-city,mount-of-precipice}.jpg` (4 region images; hero 1920x1080, inline 1600x1067)
- `public/images/sub-destinations/nazareth/{basilica-of-the-annunciation,old-city,marys-well,mount-of-precipice}.jpg` (4 sub-dest images; each 1600x1067)
- `public/images/regions/nazareth/generate-images.mjs` + `public/images/sub-destinations/nazareth/generate-images.mjs` (Sharp placeholder generators)

### Modified (5)

- `data/religious-sites.json` — Added `basilica-of-the-annunciation` + `marys-well` entries (Catholic Franciscan + Greek Orthodox traditions of the Annunciation respectively); legacy `basilica-of-annunciation` entry retained with notes-field cross-reference
- `data/photo-credits.json` — 8 Nazareth ledger entries (real Wikimedia + IGPO source URLs; CC-BY-SA-3.0 / CC-BY-4.0 / IGPO-CC)
- `app/sitemap.ts` — 5 Nazareth paths added (canonical + 4 sub-dest, each ×2 locales = 10 URL entries)
- `data/region-replication-report.md` — Nazareth row populated + Latest Gate Outcomes mini-table mirror entry
- `.planning/phases/03-region-replication-m3/deferred-items.md` — Wave 3 cross-cascade observations (Negev license-enum + TransportInfo malformed-prop blockers; neither in Nazareth scope)

## Decisions Made

See frontmatter `decisions` array for the 8 key decisions. Top five:

1. **Two religious-site entries for Nazareth — Basilica + Mary's Well.** The two Annunciation traditions correspond to two physical sites 10 minutes' walk apart; the standard pilgrim itinerary visits both consecutively. Both entries added to `data/religious-sites.json` with full denomination strings + coordinates + restrictedAccess + pairedNamingRequired. The legacy `basilica-of-annunciation` Phase-2 key is retained as an alias.
2. **Mount of Precipice emits TouristAttraction-only (no PlaceOfWorship).** The cliff is the canonical Luke 4 pilgrim site but is open-air, has no church, no active worship; the visitor experience is panoramic + the Jesus Trail trailhead. Decision pattern: when a site has Gospel-narrative significance but is treated as a viewpoint rather than active worship, omit religiousSiteId.
3. **Ecumenical Christian editorial tone locked.** The canonical and both PlaceOfWorship sub-dests explicitly name (a) Catholic Franciscan custody at the Basilica, (b) Greek Orthodox jurisdiction at Mary's Well + the adjacent Greek Orthodox Church of the Annunciation, AND (c) Protestant + Evangelical pilgrim groups visiting both freely. Phase 3.3 Galilee lesson #2 applied at city-scale in Nazareth where the two Annunciation traditions are unusually physically separated.
4. **Arab-Israeli editorial register: factual + respectful.** "Largest Arab city in Israel" / "Arab citizens of Israel" / "Arab-Israeli residents" used as factual phrasings; AUD-018 forbidden phrasings ("Israeli Arab town", "occupied Arab") verified absent via Vitest. The Old City page leads with "working bazaar for the city's Arab-Israeli residents" framing rather than pilgrim-arcade framing.
5. **EN canonical trimming over HE expansion for the canonical ratio.** EN first draft 2598w (above 2500 max), HE 2182w → ratio 0.840 (below floor). Trimmed 125w from EN intro + Where to Eat sections to reach EN=2473 / ratio=0.882. Decision pattern: when both EN max and HE floor are at risk, trim EN first; HE expansion is reserved for sub-dests where EN is already in mid-band.

## Validation Results

| Check                                                   | Status                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------ |
| `pnpm qa:region-gate nazareth`                          | **PASS — exit 0 — Verdict: PASS in data/region-gates/nazareth.md** |
| `pnpm qa:audit` Nazareth EN canonical                   | **100** (threshold ≥80)                                            |
| `pnpm qa:audit` Nazareth HE canonical                   | **100** (threshold ≥80)                                            |
| `pnpm qa:audit` 8 sub-dest pages                        | **all 100** (threshold ≥75)                                        |
| `pnpm qa:audit` blocking issues                         | **0** across all 10 Nazareth pages                                 |
| AUD-006 (sub-dest H1 has entity+qualifier)              | 0 violations on all 8 sub-dests                                    |
| AUD-007 (HE/EN word-count parity)                       | 0 violations (canonical 0.882; 4 sub-dest pairs at 0.875-0.933)    |
| AUD-009 (FTC disclosure DOM precedes affiliate)         | 0 violations                                                       |
| AUD-012 (helper-routed affiliate URLs)                  | 0 violations                                                       |
| AUD-017 (no "Wailing Wall")                             | 0 violations                                                       |
| AUD-018 (no biased framing)                             | 0 violations                                                       |
| AUD-019 (Temple Mount paired) — n/a Nazareth            | 0 violations (Temple Mount not mentioned)                          |
| AUD-020 (admin-status frontmatter) — n/a Nazareth       | 0 violations (Nazareth in Israel proper)                           |
| AUD-024 (HE+Latin bidi)                                 | 0 violations (Booking.com / TLV / Mount of Precipice bidi-wrapped) |
| AUD-025 (ktiv chaser)                                   | 0 violations                                                       |
| AUD-031 (Israeli accessibility-statement link)          | 0 violations                                                       |
| AUD-032 (hreflang reciprocity)                          | 0 violations                                                       |
| **PlaceOfWorship schema emission (2 EN pages)**         | **PASS — basilica-of-the-annunciation + marys-well emit**          |
| **PlaceOfWorship schema emission (2 HE pages)**         | **PASS — basilica-of-the-annunciation + marys-well emit**          |
| **TouristAttraction-only sites**                        | **PASS — old-city + mount-of-precipice emit no PlaceOfWorship**    |
| `pnpm qa:credits`                                       | PASS — 82 entries; all ledgered                                    |
| `pnpm qa:hebrew-content`                                | PASS — 51 HE pages scanned, 0 violations                           |
| `pnpm test --run tests/content/nazareth-region.test.ts` | 66/66 pass                                                         |

## Region Gate Details

| Criterion            | Verdict          | Detail                                                                                            |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| 1. Canonical EN ≥80  | PASS             | /en/nazareth score 100                                                                            |
| 2. Canonical HE ≥80  | PASS             | /he/nazareth score 100                                                                            |
| 3. Sub-dest ≥75      | PASS             | All 8 sub-dest pages score 100 (basilica + marys-well + old-city + mount-of-precipice ×2 locales) |
| 4. 0 blocking issues | PASS             | 0 blocking issues across all 10 Nazareth pages                                                    |
| 5. EN+HE parity      | PASS             | 5 EN / 5 HE; no missing counterparts                                                              |
| 6. Lighthouse        | DEFERRED-CI-owns | data/lighthouse-results.json empty baseline; CI workflow owns runs per PR                         |

**Verdict:** **PASS** — Phase 3 Wave 3 Nazareth branch complete; runs in parallel with Negev and Caesarea (both also PASS).

## Sub-destination Selection Rationale

4 entities selected from CONTEXT.md's Nazareth target (Christian-pilgrimage anchor city; the four entities are the canonical visitor mix):

| Slug                                  | Entity                                              | Affiliate Partner | Schema Emission   | Word Count EN/HE | Ratio |
| ------------------------------------- | --------------------------------------------------- | ----------------- | ----------------- | ---------------- | ----- |
| nazareth-basilica-of-the-annunciation | Basilica of the Annunciation (Catholic Franciscan)  | viator            | + PlaceOfWorship  | 1065 / 955       | 0.897 |
| nazareth-old-city                     | Nazareth Old City + souq (Arab-Israeli market)      | civitatis         | TouristAttraction | 1033 / 964       | 0.933 |
| nazareth-marys-well                   | Mary's Well + Greek Orthodox Church of Annunciation | getYourGuide      | + PlaceOfWorship  | 1125 / 995       | 0.884 |
| nazareth-mount-of-precipice           | Mount of Precipice (Luke 4 cliff; Jesus Trail head) | viator            | TouristAttraction | 1131 / 990       | 0.875 |

All HE/EN ratios in [0.85, 1.40] AUD-007 band; mean ratio **0.897** (mid-band per Phase 2.2/2.3/3.1/3.3 standard practice).

## Schema Emission Validation

The Nazareth plan validates the dual-schema renderer path for the second Phase 3 region (Galilee was the first; Bethlehem will be the third):

**Pages emitting PlaceOfWorship JSON-LD (in addition to TouristAttraction):**

- `.next/server/app/en/nazareth/basilica-of-the-annunciation.html`
- `.next/server/app/en/nazareth/marys-well.html`
- `.next/server/app/he/nazareth/basilica-of-the-annunciation.html`
- `.next/server/app/he/nazareth/marys-well.html`

**Pages emitting TouristAttraction-only (no PlaceOfWorship):**

- `.next/server/app/{en,he}/nazareth/old-city.html`
- `.next/server/app/{en,he}/nazareth/mount-of-precipice.html`

Nazareth confirms the dual-schema branching path works at scale across regions with different sub-dest distributions. Galilee had 3 of 6 PlaceOfWorship; Nazareth has 2 of 4. Bethlehem (plan 11) will have 1 of 2 (Church of the Nativity).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 — Bug] EN canonical first draft at 2598 words (above 2500 max)**

- **Found during:** Task 2 (Vitest assertion `word count between 1500 and 2500`)
- **Issue:** EN canonical first draft 2598w; HE 2182w → ratio 0.840 (below AUD-007 0.85 floor) AND EN above 2500 max.
- **Fix:** Trimmed 125 words from EN intro paragraph (removed redundant rewording of the H-tag scaffolding) + Where to Eat section (compressed knafeh/hummus/kebab paragraphs to single-sentence summaries). EN=2473; HE/EN ratio raised to 0.882.
- **Files modified:** `content/en/regions/nazareth.mdx`
- **Verification:** Both `word count between 1500 and 2500` and `HE/EN ratio in [0.85, 1.40]` Vitest assertions pass.
- **Committed in:** 26b8f63 (Task 2 GREEN commit)

**2. [Rule 1 — Bug] HE marys-well sub-dest first draft at 0.807 ratio**

- **Found during:** Task 3 (running pair word-count check)
- **Issue:** HE marys-well sub-dest first draft at 908w against EN 1125w → ratio 0.807 (below AUD-007 0.85 floor).
- **Fix:** Added 50w of native HE expansion in a new section ("ההיסטוריה של המעיין ושכבות הבנייה" — history of the spring + Crusader stratigraphy + 1907/1956 archaeological excavations). Ratio moved to 0.884.
- **Files modified:** `content/he/sub-destinations/nazareth-marys-well.mdx`
- **Verification:** Vitest assertion `HE/EN word-count ratio in [0.85, 1.40]` passes for all 4 sub-dest pairs.
- **Committed in:** 28c8f53 (Task 3 commit)

**3. [Rule 1 — Bug] HE mount-of-precipice description below Velite 120-char minimum**

- **Found during:** Task 3 (Velite compilation warning on `description min(120)`)
- **Issue:** First-draft HE description 115 chars; Velite Zod schema requires 120-160.
- **Fix:** Extended description by 14 chars (added "והר תבור" reference to the panorama and "מסומן" descriptor for the visitor centre).
- **Files modified:** `content/he/sub-destinations/nazareth-mount-of-precipice.mdx`
- **Verification:** `pnpm velite` clean compile, no `description min` warnings.
- **Committed in:** 28c8f53 (Task 3 commit)

### Parallel-Execution Coordination Events (not bugs)

**[Wave 3 Parallel] Concurrent edits to data/photo-credits.json — entries lost twice + re-appended**

- **Context:** Negev (plan 05) and Caesarea (plan 09) executors ran in parallel with Nazareth per Phase 3 Wave 3 design.
- **Behavior:** Nazareth's 8 photo-credits.json entries were lost twice to Write-tool clobbers by parallel agents (Negev wrote a stale-Read version; Caesarea did the same). Re-appended each time via Edit (surgical). The third commit absorbed into Negev's git add scope — commit `69ad67c` is attributed as `test(03-05)` but contains BOTH Negev test scaffolding AND the Nazareth Wave 0 deliverables (religious-sites entries, photo-credits ledger entries, 8 JPEGs, 2 generators, deferred-items.md update).
- **Recovery:** No data loss; all Nazareth artefacts present in commit `69ad67c`. Pattern locked: photo-credits.json append-only protocol survives parallel Write clobbers via repeated Edit-surgical re-application.

**[Wave 3 Parallel] Negev license-enum cascade blocked qa:credits for ALL regions**

- **Context:** Negev plan-05 entered `CC-BY-SA-2.0` in `data/photo-credits.json` (line `/images/regions/negev/desert.jpg`); the project Zod License enum only accepts CC-BY-2.0/3.0/4.0 + CC-BY-SA-3.0/4.0. Zod parse failure → ledger replaced with `{}` → every disk image flagged orphan for ~10 minutes.
- **Recovery:** Caesarea agent observed first and documented in `deferred-items.md`. Negev agent fixed independently (changed 2.0 → 3.0). Nazareth observation appended.
- **Impact on plan:** None beyond ~5-minute Task 1 delay; pre-commit-hook qa:credits caught the issue cleanly.

**[Wave 3 Parallel] Negev HE TransportInfo malformed-prop blocked build for ~20 minutes**

- **Context:** Negev plan-05 originally invoked `<TransportInfo partner="skyscanner" />` in `content/he/regions/negev.mdx` — but the `TransportInfo` component requires `airport: { code: string; name: string }` and `transportOptions: ReadonlyArray<TransportOption>`. The malformed invocation caused Next.js prerender to throw `TypeError: Cannot read properties of undefined (reading 'code')` on `/he/negev`, halting the build.
- **Recovery:** Negev agent fixed independently within the Nazareth Task 4 window (provided full `airport` + `transportOptions` props as Galilee + Tel Aviv canonicals do). Build retry succeeded; `pnpm qa:audit` ran clean; `pnpm qa:region-gate nazareth` exited 0.
- **Impact on plan:** Nazareth Task 4 deferred by ~20 minutes pending build unblock. Total plan duration extended from estimated 35-40 min to 51 min as a result.

### Build-Cache Race Window (transient, not a bug)

**[Wave 3 Parallel] `.next/server/pages-manifest.json` cleared mid-build by parallel build**

- **Context:** While running `pnpm build` after Negev's fix, a parallel executor's own `pnpm build` cleared and rebuilt `.next/`, briefly exposing the missing-pages-manifest race documented in the Galilee SUMMARY.
- **Recovery:** Allowed parallel build to finish, then re-ran `pnpm build` against the new state. Build succeeded with 173 pages generated; `pnpm qa:audit` then scanned 163 HTML files (admin/\* + content pages).
- **Impact on plan:** None — final verification passed; build-cache race is a transient Windows + Next.js + parallel-build artefact rather than a Nazareth-specific issue. Pattern triple-confirmed (Galilee documented, Caesarea inherited, Nazareth observed).

---

**Total deviations:** 3 auto-fixed (1 critical Velite gate; 2 word-count bugs); 3 coordination events (parallel-write clobber + Negev cascade + build-cache race — none Nazareth bugs)
**Impact on plan:** All auto-fixes essential for correctness. The HE marys-well expansion is the Phase 2/Phase 3 standard practice locked since plan 2.2. The EN canonical trim is a new variant of the same word-count-ratio management pattern.

## Issues Encountered

None beyond the auto-fixed deviations above. Wave 3 parallel-execution coordination held as designed; the shared-file append-only patterns and pre-commit Zod gate worked together to prevent data loss across three concurrent agents.

## Auth Gates

None encountered.

## Phase 3 Velocity Trend

- Phase 2 baseline (Jerusalem pilot): 173 min for 6 plans / 28.8 min average per plan
- Phase 3 Plan 01 (Tel Aviv solo): 47 min for 4 tasks
- Phase 3 Plan 02 (Dead Sea parallel): 45 min for 4 tasks
- Phase 3 Plan 03 (Galilee parallel): 44 min for 4 tasks
- Phase 3 Plan 04 (Eilat parallel): 44 min for 4 tasks
- Phase 3 Plan 05 (Negev parallel; in flight)
- **Phase 3 Plan 06 (Nazareth parallel): 51 min for 4 tasks** — 6-7 min slower than Wave 2 average; ~20 min spent waiting for Negev's TransportInfo fix to unblock the build

The Nazareth duration includes the parallel-execution coordination overhead. Without the Negev build blocker, the plan would have completed in ~32 min — comparable to the Wave 2 baseline. The infra-amortization prediction continues to validate; coordination overhead is the principal source of variance.

## Lessons for Plans 07-11

1. **Two religious-site entries are correct when two physical Christian-tradition sites are visited consecutively.** Bethlehem (plan 11) Church of the Nativity is a single complex with multiple denominational shares (Greek Orthodox + Armenian + Roman Catholic per the 1852 Status Quo) — one religious-site entry with a denomination-string list. Nazareth's pattern (separate sites, separate entries) doesn't apply unless the sites are physically distinct as in Capernaum (Galilee plan) and Nazareth.
2. **The "outdoor tradition site, no church" pattern emits TouristAttraction-only.** Mount of Precipice is the canonical Luke 4 cliff but has no church. Similarly Mount of Olives in Jerusalem (already Phase 2). Future plans with similar sites (e.g. Mount of Temptation near Jericho, if it appears in Phase 4) should follow.
3. **EN canonical trimming over HE expansion when EN is above max.** When EN first-draft lands above 2500 max AND HE/EN ratio is below 0.85, trim EN first. HE expansion is reserved for sub-dest scale or for canonical when EN is already in mid-band.
4. **Parallel-write clobber on photo-credits.json survives via Edit-surgical re-application.** When a parallel agent's Write tool overwrites your entries, re-Edit (surgical) rather than re-Write (full file). Pre-commit Zod gate catches the cascade and forces fix-attempt-then-retry by the offending agent.
5. **Pre-commit hook qa:credits is the right place for schema validation.** Negev's CC-BY-SA-2.0 typo was caught at commit time; the gate prevented invalid data from landing in main. Pattern: ALL data/\*.json files with Zod schemas should have a pre-commit hook validating against the canonical schema.
6. **Cross-region build failures cascade to all regions' Task 4.** Negev's malformed TransportInfo blocked Nazareth + Caesarea + future Wave 4 plans until fixed. Mitigation: prioritise build-blocking fixes; non-build failures (e.g. ratio below floor) only block the responsible plan. Future plans should defer the Task 4 region-gate until after the Wave's last build-fix lands.

## Self-Check

Confirmed file existence + commit presence + content invariants:

- All 18 declared created files exist on disk (verified via git ls-files + ls).
- All 5 task commits (69ad67c, af7eceb, 26b8f63, 28c8f53, 495a32f) present in git log.
- `data/region-gates/nazareth.md` exists with `Verdict: PASS` content.
- `data/region-replication-report.md` nazareth row matches regex `/\|\s*nazareth\s*\|.*PASS \|/`.
- `pnpm qa:region-gate nazareth` exits 0 with Verdict: PASS.
- `pnpm test --run tests/content/nazareth-region.test.ts` 66/66 pass.
- PlaceOfWorship schema emission: 4 pages (2 EN + 2 HE) emit; 4 pages (2 EN + 2 HE) do not — as designed.
- AUD-017..020 = 0 violations on all 10 Nazareth pages.

## What's Next (downstream consumers)

- **Phase 3 Wave 3 completion** — Negev (plan 05) and Caesarea (plan 09) run in parallel with this plan; their independent gates determine Wave 3 PASS overall (both also PASS per data/region-replication-report.md).
- **Phase 3 Wave 4** (plans 07 Haifa / 08 Golan / 10 Akko) — eligible once Wave 3 completes. Haifa has Bahá'í policy caveat; Akko has Bahá'í Mansion at Bahjí.
- **Phase 3 Wave 5** (plan 11 Bethlehem) — eligible after Wave 4. Reuses PlaceOfWorship (Church of the Nativity) PLUS administrativeStatus extension (the only Phase 3 page with `administrativeStatus: 'palestinian-authority'`).
- **Phase 4 long-tail sweep** — sub-dest authoring pattern at production scale now quadruple-validated (Jerusalem pilot + Tel Aviv + Galilee + Nazareth).
- **Phase 6 monitoring** — `data/region-gates/nazareth.md` feeds the Phase 6 cron for ongoing audit-score regression detection.

## Self-Check: PASSED

All declared files exist on disk (verified via shell ls + git ls-files). All 5 task commits present in git log. `data/region-gates/nazareth.md` exists with `Verdict: PASS` content. `data/region-replication-report.md` nazareth row regex matches. `pnpm qa:region-gate nazareth` exits 0. `pnpm test --run tests/content/nazareth-region.test.ts` 66/66 green. PlaceOfWorship schema emission validated on all 4 expected pages; TouristAttraction-only verified on the 4 non-religiousSiteId pages.

---

_Phase: 03-region-replication-m3_
_Plan: 06 (nazareth)_
_Completed: 2026-05-11_
