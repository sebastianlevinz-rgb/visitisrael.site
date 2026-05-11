---
phase: 03-region-replication-m3
plan: 08
subsystem: content
tags:
  - phase-3
  - region-canonical
  - golan
  - golan-heights
  - mount-hermon
  - banias
  - caesarea-philippi
  - nimrod-fortress
  - druze-villages
  - hebrew
  - mdx
  - velite
  - region-gate
  - soft-gate
  - sub-destinations
  - tourist-attraction
  - place-archaeology
  - aud-018
  - neutral-framing
  - wave-4
dependency_graph:
  requires:
    - phase-03/01-tel-aviv (region-gate.mjs + 11-row report scaffold + Wave 1 PASS template)
    - phase-03/09-caesarea (reciprocal Caesarea Maritima / Caesarea Philippi disambiguation lock — Caesarea side shipped first)
    - phase-02/01-en-canonical (renderer + Velite + audit wiring)
    - phase-02/02-he-canonical (hebrew-content-writer skill register + ktiv maleh + native HE rewrite pattern)
    - phase-02/03-sub-destinations (region-prefixed slug + parentRegion + TouristAttraction-only emission)
  provides:
    - golan-region-canonical (production-depth /golan EN + HE; native HE rewrite; AUD-018 neutral framing; 6-partner affiliate mix; reciprocal Caesarea Maritima/Philippi disambiguation; Druze respectful framing)
    - golan-sub-destinations (5 EN + 5 HE paired sub-dest pages — mount-bental, banias, nimrod-fortress, druze-villages, mount-hermon; banias + nimrod emit TouristAttraction + Place archaeology; 3 others TouristAttraction-only; NO PlaceOfWorship anywhere)
    - golan-soft-gate-pass (data/region-gates/golan.md Verdict: PASS)
    - aud-018-golan-neutral-framing-template (Internationally-disputed-region phrasing pattern; reusable for plan 11 Bethlehem)
    - banias-caesarea-philippi-reciprocal-lock (mirror of plan 09 Caesarea Maritima disambiguation; lock prevents conflation regardless of arrival page)
  affects:
    - Phase 3 Wave 5 (plan 11 Bethlehem — inherits AUD-018 neutral-framing template for politically sensitive content)
    - Phase 3 plan 09 Caesarea (reciprocal disambiguation: Caesarea Maritima vs Caesarea Philippi / Banias; plan 09 side already locked, this is the Golan-side mirror)
    - Phase 4 long-tail (Druze cultural-tourism pattern locked + community-partnership operator framing reusable)
    - Phase 6 monitoring (data/region-gates/golan.md feeds Phase 6 cron)
tech_stack:
  added: []
  patterns:
    - "AUD-018 neutral framing for internationally-disputed regions: Golan Heights toponym used WITHOUT political adjective consistently; 1967 annexation framed factually with US-only-since-2019 international recognition note; NO 'Israeli-occupied' / NO 'Judea and Samaria' / NO 'occupied territories' (EN); NO 'יהודה ושומרון' (HE). Pattern reusable for plan 11 Bethlehem (West Bank Area A administered by Palestinian Authority — different administrativeStatus framing but same AUD-018 zero-tolerance contract)."
    - "Druze community framing — respectful + factual: 25K residents in 4 villages (Majdal Shams, Buq'ata, Mas'ade, Ein Qiniyye); mixed Israeli/Syrian/permanent-resident civic-status patterns mentioned factually; religious tradition acknowledged as private (no khalwat or religious-figure photography); community-partnership operators (Druze tourism cooperative + Hermon Brothers network) preferred for bookings to ensure fair-wage village hosts. NO internal Syrian-Druze identity politics discussion. Cuisine (taboon bread, labneh with za'atar, Druze pita with cheese) factual menu."
    - "Reciprocal Maritima/Philippi disambiguation: golan-banias page first-reference pairs 'Banias' with 'Caesarea Philippi' and explicitly distinguishes from 'Caesarea Maritima on the Mediterranean coast (45 minutes north of Tel Aviv — a separate Herodian Roman port covered in our Caesarea travel guide)'. Plan 09 Caesarea side already shipped the reciprocal first-reference + dedicated H2 + FAQ #2. Both pages now reference each other; lock prevents conflation regardless of arrival page. Pattern reusable for any future ambiguous Israeli toponym pair."
    - "Banias + Nimrod Fortress emit TouristAttraction + Place schema (archaeological); Mount Bental + Druze villages + Mount Hermon TouristAttraction-only. NO PlaceOfWorship anywhere — Banias is pre-Christian Roman cult site (Pan grotto archaeology), Druze religious tradition is private (no khalwat photography), Mount Bental is a viewpoint, Mount Hermon is a ski resort. Same pattern as Caesarea plan 09 (TouristAttraction-only across all 4 sub-dests; even Crusader Cathedral is reconstruction)."
    - "YAML bare-colon ambiguity in MDX frontmatter FAQ answers: scalar values containing bare colons followed by space+word are parsed as nested mappings by grey-matter's YAML parser. Fix pattern: replace bare colon with em-dash (—) on the offending text. Encountered twice in this plan: my golan-druze-villages HE 'הכבוד התרבותי הדדי:' and Wave 4 cross-region fixes for Haifa EN/HE bare-colon (north-coast loop: → north-coast loop —) and Haifa german-colony '12:00 tour' → 'noon tour'. Reusable: scan FAQ answers for /[a-zA-Z]: [A-Z]/ pattern before commit."
    - "Wave 4 parallel-execution proven across 3 agents (Haifa + Golan + Akko): zero merge conflicts on shared files (data/photo-credits.json, app/sitemap.ts, data/region-replication-report.md). Trivial-merge model from Wave 2 confirmed at Wave 4 scale. Cross-region cooperative fixes (Rule 3 blocking): Akko HE WhereToStay shortcut → AffiliateCard (unblocked my build), Haifa german-colony YAML time-scalar (unblocked my Velite). Same precedent as Wave 3 Caesarea agent fixing Negev TransportInfo."
key_files:
  created:
    - 'content/en/regions/golan.mdx (EN canonical, 2492 words)'
    - 'content/he/regions/golan.mdx (HE canonical, 2255 words, 0.905 ratio)'
    - 'content/en/sub-destinations/golan-mount-bental.mdx'
    - 'content/en/sub-destinations/golan-banias.mdx'
    - 'content/en/sub-destinations/golan-nimrod-fortress.mdx'
    - 'content/en/sub-destinations/golan-druze-villages.mdx'
    - 'content/en/sub-destinations/golan-mount-hermon.mdx'
    - 'content/he/sub-destinations/golan-mount-bental.mdx'
    - 'content/he/sub-destinations/golan-banias.mdx'
    - 'content/he/sub-destinations/golan-nimrod-fortress.mdx'
    - 'content/he/sub-destinations/golan-druze-villages.mdx'
    - 'content/he/sub-destinations/golan-mount-hermon.mdx'
    - 'public/images/regions/golan/{hero,mount-bental,banias,nimrod-fortress,druze-villages}.jpg'
    - 'public/images/regions/golan/generate-images.mjs'
    - 'public/images/sub-destinations/golan/{mount-bental,banias,nimrod-fortress,druze-villages,mount-hermon}.jpg'
    - 'public/images/sub-destinations/golan/generate-images.mjs'
    - 'tests/content/golan-region.test.ts (66 invariants)'
    - 'data/region-gates/golan.md (Verdict: PASS)'
  modified:
    - 'app/sitemap.ts (6 Golan paths added — canonical + 5 sub-dests)'
    - 'data/photo-credits.json (10 Golan ledger entries — real Wikimedia Commons sourceUrls)'
    - 'data/region-replication-report.md (golan row populated + Latest Gate Outcomes appended)'
    - "content/en/regions/haifa.mdx (Rule 3 cross-region cooperative fix: 'north-coast loop: Haifa' → 'north-coast loop — Haifa' — YAML bare-colon fix for Velite parse)"
    - "content/he/regions/haifa.mdx (mirror Rule 3 fix for HE side: 'לולאת חוף צפוני: חיפה' → 'לולאת חוף צפוני — חיפה')"
    - "content/en/sub-destinations/haifa-german-colony.mdx (Rule 3 cross-region cooperative fix: 'free 12:00 tour' → 'free noon tour' — YAML bare-time-scalar collision)"
decisions:
  - "AUD-018 neutral framing locked: Golan Heights toponym used WITHOUT political adjective; 1967 annexation framed factually with US-only-since-2019 international recognition note. Zero occurrences of 'Israeli-occupied', 'Judea and Samaria', 'occupied territories' (EN) or 'יהודה ושומרון' (HE) across all 12 Golan pages. Pattern locked for plan 11 Bethlehem (West Bank Area A under Palestinian Authority administration — different administrativeStatus but same zero-tolerance contract)."
  - "Druze community framing — respectful + factual: 25K residents in 4 villages mentioned with their names (Majdal Shams, Buq'ata, Mas'ade, Ein Qiniyye); mixed civic-status patterns (Israeli/Syrian/permanent-resident) noted factually; religious tradition acknowledged as private (khalwat not photographed); community-partnership operators (Druze tourism cooperative + Hermon Brothers) preferred for fair-wage village host routing. NO internal Syrian-Druze identity politics discussion. The standalone golan-druze-villages sub-dest page is cultural/culinary tourism only — no religious-site or community-political framing."
  - "Reciprocal Caesarea Maritima / Caesarea Philippi disambiguation: golan-banias page first-reference pairs both names and explicitly distinguishes from Caesarea Maritima (Mediterranean coast, plan 09 cross-reference). golan canonical body + Banias/Caesarea Philippi dedicated H2 section + FAQ entry all reinforce the disambiguation. Plan 09 Caesarea side already shipped the reciprocal lock (first-reference + dedicated H2 + FAQ #2). Both pages now reference each other; conflation prevented regardless of arrival page."
  - "Sub-dest schema decisions (5 entities): Banias + Nimrod Fortress emit TouristAttraction + Place (archaeological — Pan grotto cult site + Crusader/Mamluk 13c fortification). Mount Bental + Druze villages + Mount Hermon TouristAttraction-only. NO religiousSiteId frontmatter on any sub-dest. NO PlaceOfWorship anywhere — Banias is pre-Christian Roman cult site (not active religious building), Druze religious tradition is private, Mount Bental is a viewpoint, Mount Hermon is a ski resort."
  - "Affiliate partner mix: 6 distinct on canonical (booking + viator + getYourGuide + skyscanner + rentalcars + safetyWing) + complete TransportInfo composite with TLV airport + 3 transportOptions. Lower than Caesarea (7) because Civitatis is not a strong Golan operator; the Druze hospitality network is community-partnership-focused rather than Civitatis-marketed. Per-sub-dest distribution: mount-bental→viator, banias→civitatis, nimrod-fortress→getYourGuide, druze-villages→getYourGuide, mount-hermon→viator."
  - "Native HE expansion budget for archaeological + community content: 3 of 5 sub-dest first drafts (mount-bental at 0.823, banias at 0.811, nimrod-fortress at 0.839) landed below the AUD-007 [0.85, 1.40] floor. Added 50-65w native HE expansion per page (mount-bental volcanic-geology context, banias gomchot-detail descriptions, nimrod-fortress wall-photography lighting). All 5 pairs now in band (0.851-0.885). Canonical first draft EN was 2792w (above 2500 ceiling); trimmed to 2492w by tightening Druze Culture H3s, Day Trips H3s and Practical Tips. Pattern matches Phase 2/3 lesson — Hebrew first drafts run dense; budget +50-70w per sub-dest pair to clear floor."
  - "YAML bare-colon hazard pattern: MDX frontmatter FAQ scalar values with /[a-zA-Z]: [A-Z]/ or /[א-ת]: [א-ת]/ pattern (text colon space CapitalLetter) are parsed by grey-matter as nested mappings and break Velite compile. Encountered: my golan EN 'Public transport is thin: Egged' + golan HE 'דלילה: אגד' + golan-druze-villages HE 'הכבוד התרבותי הדדי:' + golan-druze-villages EN 'cultural respect is mutual:'. Plus 3 cross-region fixes in Haifa (EN/HE 'north-coast loop:' + EN '12:00 tour'). Fix: replace bare colon with em-dash (—). Pattern reusable: scan FAQ answers before commit."
  - "Cross-region cooperative fixes (Rule 3 blocking): Per Caesarea SUMMARY lesson 6 + Wave 3 precedent, when parallel-state agent content blocks my build/Velite, fix inline with explicit commit-message attribution. Applied: (1) Haifa EN+HE 'north-coast loop: Haifa' → '— Haifa' for Velite YAML parse; (2) Haifa german-colony '12:00 tour' → 'noon tour' for YAML time-scalar collision; (3) Akko EN+HE WhereToStay shortcut → AffiliateCard for Next.js prerender (TransportInfo component contract). Same Wave 3 precedent (Caesarea agent fixed Negev TransportInfo for build unblocking)."
  - "Image sourcing per PITFALLS §4.11: 5 Golan region images (hero Banias waterfall + 4 inline) + 5 sub-dest hero images = 10 total. CRITICAL filter applied — NO military installations, IDF tanks, border-zone fortifications. Mount Bental viewpoint OK (tourism viewpoint over Quneitra valley, not a military site). Druze villages framed as rooftops/panoramic angles (no private religious gatherings). All 10 ledger entries reference real Wikimedia Commons sourceUrls with CC-BY-3.0/CC-BY-4.0/CC-BY-SA-3.0 licenses (avoided CC-BY-SA-2.0 per Wave 3 Negev lesson — not in Zod License enum). Sharp-generated placeholders at documented dimensions; Phase 6 swaps binaries while ledger holds steady."
  - "Mount Hermon editorial: ski-season Dec-Mar factually framed; novelty-tourism positioning (only ski resort in Israel) honest; bilingual signage + falafel-in-lodge as cultural-context experience detail; no military photography; cable-car summer alternative noted. Mount Bental: 1973 Yom Kippur War context factual ('Valley of Tears' fighting), no glorification, framed as tourism viewpoint with historical signage rather than military memorial. Both pages avoid border-zone-respect language overshadowing tourism content."
requirements-completed: [REG-01, REG-02, REG-03]
metrics:
  duration_min: 67
  tasks: 4
  files_created: 18
  files_modified: 6
  commits: 5
  tests_added: 66
  audit_score_golan_en: 100
  audit_score_golan_he: 100
  audit_score_sub_dest_avg: 100
  audit_blocking_issues: 0
  word_count_canonical_en: 2492
  word_count_canonical_he: 2255
  he_en_canonical_ratio: 0.905
  word_count_sub_dest_en_avg: 1091
  word_count_sub_dest_he_avg: 938
  he_en_sub_dest_ratio_avg: 0.866
  h2_sections_canonical_en: 9
  h2_sections_canonical_he: 9
  affiliate_card_placements_canonical: 7
  distinct_affiliate_partners_canonical: 6
  faq_entries_canonical: 8
  region_gate_verdict: PASS
  region_gate_lighthouse_status: DEFERRED-CI-owns
  aud_018_violations: 0
completed: 2026-05-11
---

# Phase 3 Plan 08: Golan Heights Region Replication Summary

**Golan Heights volcanic-plateau region canonical (EN+HE, 2492w/2255w, 0.905 ratio) + 5 paired sub-destinations (10 MDX pages — Mount Bental viewpoint, Banias/Caesarea Philippi Pan grotto archaeology, Nimrod Fortress Crusader/Mamluk 13c fortification, Druze villages, Mount Hermon ski) + soft-gate PASS — AUD-018 neutral political framing 0 violations across all 12 pages; reciprocal Maritima/Philippi disambiguation locked with plan 09 Caesarea.**

## Performance

- **Duration:** 67 min
- **Started:** 2026-05-11T15:30:00Z
- **Completed:** 2026-05-11T16:37:35Z
- **Tasks:** 4 (all complete)
- **Files created:** 18 (12 MDX + 1 test + 1 gate report + 4 image generators/aggregates)
- **Files modified:** 6 (sitemap.ts, photo-credits.json, region-replication-report.md + 3 Haifa cross-region cooperative fixes)
- **Commits:** 5 (1f03c26 Wave 0 + fa390da RED test + 7540444 canonicals GREEN + d1f6170 sub-dests + 39a176b soft-gate)

## Accomplishments

- **Wave 0 image infrastructure** — 10 Golan ledger entries (5 region + 5 sub-dest), 10 Sharp-generated placeholder JPEGs at documented dimensions (hero 1920x1080 + 9 inline 1600x1067), 2 generator scripts. All ledger entries reference real Wikimedia Commons sourceUrls with subjectType=cityscape (Nimrod Fortress, Druze villages) or landscape (hero, Mount Bental, Banias, Mount Hermon). CRITICAL filter applied — NO military installations, IDF tanks, soldiers, or border-zone fortifications. Druze villages framed respectfully as village rooftops / panoramic angles. License-enum compliance: CC-BY-3.0 / CC-BY-4.0 / CC-BY-SA-3.0 (avoided CC-BY-SA-2.0 per Wave 3 Negev lesson — not in Zod License enum).
- **Golan EN canonical authored** — `/en/golan` 2492 words (mid-band 1500-2500 after trim from 2792w first draft), 9 H2 sections per PITFALLS §4.11 H-tag scaffolding (When to Visit / Where to Stay / Top Things / Druze Culture / Banias-Caesarea Philippi Disambiguation / Day Trips / How to Get / Where to Eat / Practical Tips / FAQ), 6 distinct AffiliateCard partners (booking + viator + getYourGuide + skyscanner + rentalcars + safetyWing) + complete TransportInfo composite with TLV airport + 3 transportOptions, 8 FAQ entries, schema TouristDestination + BreadcrumbList + FAQPage. REGION_CANONICAL profile score **100/100** with 0 blocking. AUD-018 0 violations: 0 instances of 'Israeli-occupied', 'Judea and Samaria', 'occupied territories'.
- **Golan HE canonical authored** — `/golan` 2255 words via native HE rewrite using hebrew-content-writer Business-Casual register; ktiv maleh consistent; Latin brands (Booking.com, TLV) bidi-wrapped `<span dir="ltr" lang="en">`. H-tag scaffolding mirrors EN. HE/EN word-count ratio **0.905** (mid-band per Phase 2/3 lesson). Same 6-partner affiliate mix as EN with HE labels. REGION_CANONICAL profile score **100/100** with 0 blocking. AUD-018 HE-side: 0 instances of 'יהודה ושומרון'.
- **5 sub-destinations EN+HE pairs authored** — 10 MDX files at `/golan/{mount-bental, banias, nimrod-fortress, druze-villages, mount-hermon}/` in both locales. **Banias + Nimrod Fortress emit Place schema** (Pan grotto archaeological cult site + Crusader/Mamluk 13c fortification) — no religiousSiteId frontmatter on any sub-dest. NO PlaceOfWorship anywhere — Druze religious tradition is private, Banias is pre-Christian Roman, Mount Bental is a viewpoint, Mount Hermon is a ski resort. Each page 955-1154 words EN, 845-1021 words HE, 0.851-0.885 HE ratio per pair (3 of 5 needed +50-65w HE expansion to clear AUD-007 floor), ≥1 AffiliateCard, SUB_DESTINATION profile score **100/100** across all 10 pages, 0 blocking issues, 0 AUD-018 violations.
- **Per-region soft gate PASS** — `pnpm qa:region-gate golan` exits 0 with Verdict: PASS. `data/region-gates/golan.md` written with full per-page breakdown (EN=100/HE=100 canonical, 5 sub-dest pairs all 100). EN+HE parity 6/6. Blocking 0. Lighthouse DEFERRED-CI-owns. `data/region-replication-report.md` golan row populated + Latest Gate Outcomes row appended. **Phase 3 Wave 4 (Haifa + Golan + Akko) all PASS — Wave 5 (Bethlehem) structurally unblocked.**
- **Reciprocal Caesarea Maritima / Caesarea Philippi disambiguation locked** — golan-banias page first-reference pairs both names and explicitly distinguishes from Caesarea Maritima (Mediterranean coast, plan 09 cross-reference). golan canonical body + Banias/Caesarea Philippi dedicated H2 section + FAQ entry all reinforce. Plan 09 Caesarea side already shipped the reciprocal lock. Both pages now reference each other; conflation prevented regardless of arrival page.

## Task Commits

Each task was committed atomically (5 commits total — 4 Golan + 3 cross-region fixes bundled):

1. **Task 1 (Wave 0): Golan image infrastructure** — `1f03c26` (feat). 5 region + 5 sub-dest JPEGs + 2 Sharp generators + 10 ledger entries committed atomically.
2. **Task 2 RED: failing test for Golan canonical + 5 sub-dest pairs** — `fa390da` (test). 66 invariants pinning canonical structure + AUD-018 neutral framing + Banias/Caesarea Philippi disambiguation + sub-dest TouristAttraction-only schema.
3. **Task 2 GREEN: Golan EN + HE canonical + sitemap + Haifa YAML fix** — `7540444` (feat). 2492w/2255w, 6 distinct affiliate partners, complete TransportInfo composite, Banias disambiguation. Includes Haifa EN+HE 'north-coast loop:' → '—' YAML fix (Rule 3 cross-region cooperative).
4. **Task 3: 5 sub-destinations EN+HE pairs + Haifa german-colony YAML fix** — `d1f6170` (feat). 10 MDX files all 100/100, +50-65w HE expansion on 3 sub-dest pairs, 5 HE descriptions padded to 120+ chars. Includes Haifa german-colony '12:00 tour' → 'noon tour' YAML fix (Rule 3 cross-region cooperative).
5. **Task 4: Golan soft-gate report** — `39a176b` (feat). data/region-gates/golan.md Verdict: PASS, aggregate report row populated + Latest Gate Outcomes row appended.

## Files Created/Modified

### Created (18)

**Golan canonical content (2):**

- `content/en/regions/golan.mdx` — EN canonical 2492 words, 9 H2 sections, 6 affiliate partners, 8 FAQs, AUD-018 neutral framing, Banias/Caesarea Philippi reciprocal disambiguation
- `content/he/regions/golan.mdx` — HE canonical 2255 words, native rewrite, 0.905 HE/EN ratio, same partner mix

**Golan sub-destinations (10):**

- `content/en/sub-destinations/golan-{mount-bental, banias, nimrod-fortress, druze-villages, mount-hermon}.mdx` (5)
- `content/he/sub-destinations/golan-{mount-bental, banias, nimrod-fortress, druze-villages, mount-hermon}.mdx` (5)

**Image artifacts (10 JPEGs + 2 generators):**

- `public/images/regions/golan/{hero,mount-bental,banias,nimrod-fortress,druze-villages}.jpg` (5 region images)
- `public/images/sub-destinations/golan/{mount-bental,banias,nimrod-fortress,druze-villages,mount-hermon}.jpg` (5 sub-dest images)
- `public/images/regions/golan/generate-images.mjs` + `public/images/sub-destinations/golan/generate-images.mjs` (Sharp generators)

**Tests + gate report (2):**

- `tests/content/golan-region.test.ts` — 66 content invariants
- `data/region-gates/golan.md` — Golan gate report Verdict: PASS

### Modified (6)

- `app/sitemap.ts` — 6 Golan paths added (canonical + 5 sub-dest, each × 2 locales = 12 URL entries)
- `data/photo-credits.json` — 10 Golan ledger entries (real Wikimedia Commons sourceUrls)
- `data/region-replication-report.md` — golan row populated + Latest Gate Outcomes minimal row appended
- `content/en/regions/haifa.mdx` — Rule 3 cross-region cooperative fix: 'north-coast loop: Haifa' → '— Haifa' (YAML bare-colon parse blocker)
- `content/he/regions/haifa.mdx` — mirror Rule 3 fix for HE side: 'לולאת חוף צפוני: חיפה' → '— חיפה'
- `content/en/sub-destinations/haifa-german-colony.mdx` — Rule 3 cross-region cooperative fix: 'free 12:00 tour' → 'free noon tour' (YAML bare-time-scalar collision)

## Decisions Made

See frontmatter `decisions` array for the 10 key decisions. Top six:

1. **AUD-018 neutral framing locked.** Golan Heights toponym without political adjective; 1967 annexation factual with US-only-since-2019 recognition note. 0 occurrences of biased framing across all 12 Golan pages. Pattern reusable for plan 11 Bethlehem.
2. **Druze community framing respectful + factual.** 25K residents in 4 named villages; mixed civic-status patterns mentioned factually; religious tradition acknowledged as private; community-partnership operators preferred; NO internal Syrian-Druze identity politics. Sub-dest page is cultural/culinary tourism only.
3. **Reciprocal Caesarea Maritima / Caesarea Philippi disambiguation.** golan-banias page first-reference + golan canonical Banias-Caesarea Philippi dedicated H2 + FAQ entry. Plan 09 Caesarea side already shipped the reciprocal lock. Both pages reference each other.
4. **Sub-dest schema decisions.** Banias + Nimrod Fortress emit TouristAttraction + Place archaeological; Mount Bental + Druze villages + Mount Hermon TouristAttraction-only. NO PlaceOfWorship anywhere.
5. **Native HE expansion budget.** 3 of 5 sub-dest first drafts below AUD-007 floor; added 50-65w native HE expansion per page. Canonical first draft EN was 2792w (above 2500 ceiling); trimmed to 2492w. Matches Phase 2/3 standard practice.
6. **Cross-region cooperative fixes (Rule 3 blocking).** Per Caesarea SUMMARY lesson 6 + Wave 3 precedent, fixed Haifa EN+HE YAML bare-colon and Haifa german-colony YAML time-scalar inline to unblock my Velite + build. Same Wave 3 precedent (Caesarea agent fixed Negev TransportInfo).

## Validation Results

| Check                                                | Status                                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| `pnpm qa:region-gate golan`                          | **PASS — exit 0 — Verdict: PASS in data/region-gates/golan.md**                   |
| `pnpm qa:audit` Golan EN canonical                   | **100** (threshold ≥80)                                                           |
| `pnpm qa:audit` Golan HE canonical                   | **100** (threshold ≥80)                                                           |
| `pnpm qa:audit` 10 sub-dest pages                    | **all 100** (threshold ≥75)                                                       |
| `pnpm qa:audit` blocking issues                      | **0** across all 12 Golan pages                                                   |
| AUD-006 (sub-dest H1 entity+qualifier)               | 0 violations on all 10 sub-dests                                                  |
| AUD-007 (HE/EN word-count parity)                    | 0 violations (canonical 0.905; 5 sub-dest pairs 0.851-0.885)                      |
| AUD-009 (FTC disclosure DOM precedes affiliate)      | 0 violations                                                                      |
| AUD-012 (helper-routed affiliate URLs)               | 0 violations                                                                      |
| AUD-017 (no "Wailing Wall")                          | 0 violations                                                                      |
| **AUD-018 (no biased framing — Golan-critical)**     | **0 violations** across all 12 Golan pages                                        |
| AUD-019 (Temple Mount paired) — n/a Golan            | 0 violations (Temple Mount not mentioned)                                         |
| AUD-020 (admin-status frontmatter) — n/a Golan       | 0 violations (Golan has no contested-admin entities in our framing)               |
| AUD-024 (HE+Latin bidi)                              | 0 violations (TLV/Booking.com bidi-wrapped)                                       |
| AUD-025 (ktiv chaser)                                | 0 violations                                                                      |
| AUD-031 (Israeli accessibility-statement link)       | 0 violations                                                                      |
| AUD-032 (hreflang reciprocity)                       | 0 violations                                                                      |
| `pnpm qa:schema`                                     | PASS — 199 pages, schema validated                                                |
| `pnpm test --run tests/content/golan-region.test.ts` | **66/66 pass** (0 skipped)                                                        |
| `pnpm build`                                         | PASS — 209 pages prerendered after Akko WhereToStay + Haifa YAML cross-region fix |

## Region Gate Details

| Criterion            | Verdict          | Detail                                                                                                      |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| 1. Canonical EN ≥80  | PASS             | /en/golan score 100                                                                                         |
| 2. Canonical HE ≥80  | PASS             | /golan score 100                                                                                            |
| 3. Sub-dest ≥75      | PASS             | All 10 sub-dest pages score 100 (banias, druze-villages, mount-bental, mount-hermon, nimrod-fortress × EN+HE) |
| 4. 0 blocking issues | PASS             | 0 blocking issues across all 12 Golan pages                                                                 |
| 5. EN+HE parity      | PASS             | 6 EN / 6 HE; no missing counterparts                                                                        |
| 6. Lighthouse        | DEFERRED-CI-owns | data/lighthouse-results.json empty baseline; CI workflow owns runs per PR                                   |

**Verdict:** **PASS** — Phase 3 Wave 4 region 'golan' complete; sibling parallel agents Haifa + Akko also PASS.

## Sub-destination Selection Rationale + Affiliate Mix

5 entities selected (in the 4-5 target band per CONTEXT.md, since Golan has relatively dispersed attractions):

| Slug                  | Entity                                              | Schema                  | Affiliate Partner | Word Count EN/HE | Ratio |
| --------------------- | --------------------------------------------------- | ----------------------- | ----------------- | ---------------- | ----- |
| golan-mount-bental    | 1,171m volcanic crater viewpoint                    | TouristAttraction       | viator            | 955 / 845        | 0.885 |
| golan-banias          | Caesarea Philippi Pan grotto + waterfall            | TouristAttraction+Place | civitatis         | 1140 / 980       | 0.860 |
| golan-nimrod-fortress | Largest Crusader/Mamluk 13c fortification in Israel | TouristAttraction+Place | getYourGuide      | 1074 / 921       | 0.858 |
| golan-druze-villages  | Cultural visit to 4 Druze villages                  | TouristAttraction       | getYourGuide      | 1154 / 1021      | 0.885 |
| golan-mount-hermon    | Israel's only ski resort + summer cable car         | TouristAttraction       | viator            | 1134 / 965       | 0.851 |

All HE/EN ratios in [0.85, 1.40] AUD-007 band; mean ratio **0.866** (mid-band per Phase 2/3 lesson).

## AUD-018 Framing Compliance Audit

**EN canonical body + sub-dest pages (6 EN total):** 0 occurrences of 'Israeli-occupied', 'Judea and Samaria', or 'occupied territories'. Golan Heights toponym used WITHOUT political adjective throughout. 1967 annexation framed factually as "captured by Israel from Syria in 1967 and annexed in 1981 — the annexation is not internationally recognised except by the United States since 2019". No editorial commentary on the political status.

**HE canonical body + sub-dest pages (6 HE total):** 0 occurrences of 'יהודה ושומרון'. Mirror neutral framing in Hebrew — "נכבשה על ידי ישראל מסוריה ב-1967 וסופחה ב-1981 — הסיפוח אינו מוכר בינלאומית למעט על ידי ארצות הברית מאז 2019".

**Druze community framing:** 25K residents in 4 villages mentioned with their names (Majdal Shams, Buq'ata, Mas'ade, Ein Qiniyye); mixed civic-status patterns (Israeli/Syrian/permanent-resident) noted factually; religious tradition acknowledged as private. NO internal Syrian-Druze identity politics discussion.

**Mount Bental editorial:** 1973 Yom Kippur War context factual ('Valley of Tears' fighting), no glorification, framed as tourism viewpoint with historical signage rather than military memorial.

**Result:** AUD-018 0 violations across all 12 Golan pages.

## Banias / Caesarea Philippi Reciprocal Disambiguation

The reciprocal lock with plan 09 Caesarea is enforced at three places on the Golan side:

1. **golan canonical first-reference body prose**: "Banias spring and waterfall (the Caesarea Philippi archaeological site, not to be confused with Caesarea Maritima on the Mediterranean coast — see our Caesarea travel guide)"
2. **golan canonical dedicated H2 "Banias / Caesarea Philippi — Disambiguation"**: walks through the dynastic naming pattern (Herod the Great founded Maritima around 25 BCE; his son Herod Philip founded Philippi around 2 BCE), the 200 km geographical separation, and the Christian Caesarea Philippi context.
3. **golan-banias sub-dest first-reference + FAQ #1**: "Yes — Banias is the modern Arabic name and Caesarea Philippi is the Roman-era name. The site is in the Golan Heights at the foot of Mount Hermon, at the headwaters of the Jordan River. This is NOT to be confused with Caesarea Maritima on the Mediterranean coast (45 minutes north of Tel Aviv — a separate Herodian Roman port covered in our Caesarea travel guide)."

Plan 09 Caesarea side already shipped the reciprocal lock (first-reference + dedicated H2 + FAQ #2). Both pages now reference each other; conflation prevented regardless of which page a visitor arrives at first.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 — Bug] EN canonical word count above 2500 ceiling on first draft**

- **Found during:** Task 2 GREEN (Vitest word-count assertion)
- **Issue:** First EN canonical draft landed at 2792w (above 2500 ceiling); my Vitest assertion required body word count in [1500, 2500].
- **Fix:** Trimmed ~300 words by tightening Druze Culture subsection H3s (combined three sub-headings into one paragraph), tightening Day Trips subsection H3s (combined into 3 paragraphs without sub-headings), and trimming Where to Eat / Practical Tips for redundancy. Final EN: 2492w.
- **Files modified:** content/en/regions/golan.mdx
- **Verification:** Vitest word-count assertion green; AUD-007 ratio improved from 0.823 (first draft) to 0.905 final.
- **Committed in:** 7540444

**2. [Rule 1 — Bug] HE canonical description below 120-char floor**

- **Found during:** Task 2 GREEN (Velite frontmatter validation)
- **Issue:** First HE canonical description at 108 chars (below 120 floor).
- **Fix:** Added '2026' year + 'הצלבנית' (Crusader) descriptor to lift to 124 chars.
- **Files modified:** content/he/regions/golan.mdx
- **Verification:** Velite compile clean.
- **Committed in:** 7540444

**3. [Rule 1 — Bug] HE word-count below 0.85 floor on 3 of 5 sub-dest first drafts**

- **Found during:** Task 3 (per-pair ratio check before commit)
- **Issue:** HE first drafts of mount-bental (0.823), banias (0.811), nimrod-fortress (0.839) below AUD-007 floor.
- **Fix:** Added 50-65w native HE expansion per page (mount-bental volcanic-geology context, banias gomchot-detail descriptions, nimrod-fortress wall-photography lighting). All 5 pairs now in [0.851, 0.885] band.
- **Files modified:** content/he/sub-destinations/golan-{mount-bental,banias,nimrod-fortress}.mdx
- **Verification:** All ratios in band; pnpm qa:audit clean.
- **Committed in:** d1f6170

**4. [Rule 1 — Bug] 5 HE sub-dest descriptions below 120-char floor**

- **Found during:** Task 3 (Velite compile after sub-dest authoring)
- **Issue:** All 5 HE sub-dest descriptions ran 103-117 chars (below 120 floor).
- **Fix:** Padded each with 1-2 explanatory words. Final lengths 120-127.
- **Files modified:** content/he/sub-destinations/golan-{mount-bental,banias,nimrod-fortress,druze-villages,mount-hermon}.mdx
- **Verification:** Velite compile clean.
- **Committed in:** d1f6170

**5. [Rule 1 — Bug] YAML bare-colon parse blockers in golan EN + HE FAQ answers**

- **Found during:** Task 2 GREEN (initial Velite compile)
- **Issue:** Two FAQ answers contained text patterns `[a-zA-Z]: [A-Z]` ('Public transport is thin: Egged bus 843') and `[א-ת]: [א-ת]` ('דלילה: אגד 843') and one more in druze-villages EN+HE ('cultural respect is mutual: visitors' / 'הכבוד התרבותי הדדי: מבקרים'). grey-matter's YAML parser interprets these as nested mappings inside scalars, triggering 'Nested mappings are not allowed in compact mappings' errors.
- **Fix:** Replaced bare colons with em-dashes (—). Pattern reusable: scan FAQ answers for /[a-zA-Z]: [A-Z]/ pattern before commit.
- **Files modified:** content/en/regions/golan.mdx, content/he/regions/golan.mdx, content/en/sub-destinations/golan-druze-villages.mdx, content/he/sub-destinations/golan-druze-villages.mdx
- **Verification:** Velite compile clean for all golan files.
- **Committed in:** 7540444 + d1f6170

**6. [Rule 3 — Blocking] Cross-region cooperative fix: Haifa EN+HE YAML bare-colon**

- **Found during:** Task 2 GREEN (Velite compile against full content tree)
- **Issue:** content/en/regions/haifa.mdx + content/he/regions/haifa.mdx FAQ answer line 26 had 'north-coast loop: Haifa morning' / 'לולאת חוף צפוני: חיפה בבוקר' — same YAML bare-colon pattern. Velite halt blocked compile for entire content tree including my Golan files.
- **Fix:** Replaced bare colon with em-dash in both Haifa locale files. Same fix pattern as my own files.
- **Files modified:** content/en/regions/haifa.mdx, content/he/regions/haifa.mdx
- **Verification:** Velite compile clean.
- **Precedent:** Wave 3 Caesarea agent fixed Negev TransportInfo for build unblocking (same Rule 3 cooperative pattern).
- **Committed in:** 7540444

**7. [Rule 3 — Blocking] Cross-region cooperative fix: Haifa german-colony YAML time-scalar**

- **Found during:** Task 3 (Velite compile after sub-dest authoring)
- **Issue:** content/en/sub-destinations/haifa-german-colony.mdx FAQ answer at line 30 contained 'free 12:00 tour' — YAML interprets `12:00` after space as a key:value mapping inside a scalar. Velite halt blocked compile for entire content tree including my Golan files.
- **Fix:** Replaced '12:00 tour' with 'noon tour' (semantically equivalent, avoids YAML time-scalar collision).
- **Files modified:** content/en/sub-destinations/haifa-german-colony.mdx
- **Verification:** Velite compile clean.
- **Committed in:** d1f6170

**8. [Rule 3 — Blocking] Cross-region cooperative fix: Akko EN+HE WhereToStay shortcut → AffiliateCard**

- **Found during:** Task 4 (running pnpm build for HTML emission)
- **Issue:** content/en/regions/akko.mdx + content/he/regions/akko.mdx had `<WhereToStay city="Akko" partner="booking" />` shortcut. The WhereToStay component contract requires `priceRange` + `neighborhoods[]` props; the shortcut crashed Next.js prerender of /he/akko with 'TypeError: Cannot read properties of undefined (reading map)'. Akko's prerender failure aborted the entire build BEFORE Golan HTML was generated. My audit needs Golan HTML to exist in .next/server/app/.
- **Fix:** Replaced WhereToStay shortcut with plain AffiliateCard in both EN and HE Akko canonicals (same fix Caesarea applied in plan 09).
- **Files modified:** content/en/regions/akko.mdx, content/he/regions/akko.mdx (subsequently overwritten by Akko agent's own commit fd971c1 — my fix was a brief intermediate state)
- **Verification:** Build completed for all 209 pages including Golan.
- **Precedent:** Wave 3 Caesarea agent fixed Negev TransportInfo for build unblocking; this is the Wave 4 mirror.
- **Committed in:** Intermediate (Akko agent commit fd971c1 superseded with their proper version).

---

**Total deviations:** 8 auto-fixed (5 Rule 1 bugs + 3 Rule 3 blocking)
**Impact on plan:** All auto-fixes essential for correctness. The HE word-count expansions, description-length padding, and YAML bare-colon fixes follow the Phase 2/3 standard practice. The 3 cross-region Rule 3 fixes (Haifa YAML × 2 + Akko WhereToStay) unblock Velite + build for the entire content tree; same precedent as Wave 3 Caesarea-Negev cooperative fix. No scope creep.

## Issues Encountered

**Windows .next build race condition**: One transient build failure with "ENOENT pages-manifest.json" / "ENOENT build-manifest.json" during the build cycle. Resolved by `rm -rf .next/*` + retry. The next build attempt completed cleanly. Same pattern as Dead Sea SUMMARY lesson 6.

**Audit JSON empty after first build**: The first qa:audit run reported "199 pages scanned" but wrote `[]` to data/audit-results.json. Diagnosed as parallel-state .next wipe by another agent's concurrent build that ran between my prerender and audit. Resolved by `rm -rf .next/*` + fresh build + immediate qa:audit. Pattern: under parallel Wave 4 execution, build artifacts can be transiently invalidated; isolate build + audit on a single fresh tree.

## Auth Gates

None encountered.

## Wave 4 Parallel-Execution Outcome

| Region | Plan  | Status                                                                                  |
| ------ | ----- | --------------------------------------------------------------------------------------- |
| Haifa  | 03-07 | **PASS** — sibling commits daf9ec7 (canonicals) + further Wave 4 commits                |
| Golan  | 03-08 | **PASS** — this plan                                                                    |
| Akko   | 03-10 | **PASS** — sibling commits 988e3b6 (canonicals) + fd971c1 (sub-dests + WhereToStay fix) |

**Wave 4 fully complete.** Wave 5 (plan 11 Bethlehem) structurally unblocked. The trivial-merge model under parallel execution proven at Wave 4 scale (same precedent as Wave 2 and Wave 3) — 3 agents modified shared files concurrently with zero merge conflicts on data/photo-credits.json + app/sitemap.ts + data/region-replication-report.md.

## Lessons for Plan 11 (Bethlehem)

1. **AUD-018 neutral framing transferable.** Golan AUD-018 zero-violation pattern (toponym without political adjective; factual annexation note; no editorial commentary) maps directly to Bethlehem treatment: 'Bethlehem (in the West Bank, administered by the Palestinian Authority)' on first mention; checkpoint transport practicalities; foreign tourists may enter Area A; pre-booked tours handle crossing; no political commentary. AUD-020 administrativeStatus frontmatter REQUIRED for Bethlehem (different framing from Golan; Golan doesn't carry administrativeStatus).
2. **YAML bare-colon hazard pattern.** Scan FAQ answers for /[a-zA-Z]: [A-Z]/ pattern (text colon space CapitalLetter) and similar /[א-ת]: [א-ת]/ before commit. Replace with em-dash. Encountered in this plan 4 times in my own content + 3 cross-region cooperative fixes; expect similar in Bethlehem FAQ content.
3. **YAML time-scalar collision.** '12:00 tour' in unquoted scalar values triggers nested-mapping error. Replace bare time literals with semantic alternatives ('noon tour', 'midnight closure', 'mid-afternoon') OR wrap the entire answer value in single quotes.
4. **HE word-count expansion budget for sensitive-content pages.** Golan needed +50-65w on 3 of 5 sub-dest pairs. Bethlehem single-canonical will likely need +150-200w on the HE canonical to clear AUD-007 floor for the Church of the Nativity + neutral-framing prose density.
5. **TouristAttraction-only baseline for archaeological/cultural sites.** Banias is pre-Christian Roman cult site (Pan grotto → TouristAttraction + Place, NOT PlaceOfWorship); Druze villages are cultural/culinary (TouristAttraction-only, NOT PlaceOfWorship — religious tradition is private). Bethlehem's Church of the Nativity WILL emit PlaceOfWorship (active religious building, UNESCO 2012 — clear contrast with Golan's archaeological-only or cultural-only pattern).
6. **Cross-region cooperative fixes (Rule 3 blocking) are now Wave 4-locked policy.** When parallel-state agent content blocks Velite/build, fix inline with explicit commit-message attribution. Apply minimal fix; do not refactor. Precedent: Wave 3 Caesarea-Negev TransportInfo, Wave 4 Golan-Haifa YAML × 3 + Golan-Akko WhereToStay.

## Self-Check: PASSED

All 18 declared created files exist on disk (verified via `git ls-files | grep golan`). All 5 task commits (1f03c26 Wave 0 images, fa390da RED test, 7540444 canonical, d1f6170 sub-dests, 39a176b soft-gate report) present in `git log`. `data/region-gates/golan.md` exists with `Verdict: PASS` content; verify regex `/Verdict:\s*PASS/` matches. `data/region-replication-report.md` golan row regex `/\|\s*golan\s*\|.*PASS \|/` matches. `pnpm qa:region-gate golan` exits 0. `pnpm test --run tests/content/golan-region.test.ts` 66/66 green. Audit scores: EN=100, HE=100 (canonical); all 10 sub-dest pages 100. AUD-018 0 violations across all 12 pages.

## What's Next (downstream consumers)

- **Phase 3 Wave 5** (plan 11 Bethlehem) — unblocked by Wave 4 completion. Single-region wave; no parallel coordination overhead. Inherits AUD-018 neutral framing template from this plan; administrativeStatus frontmatter pattern REQUIRED (different from Golan; Bethlehem carries 'palestinian-authority' admin status while Golan does not).
- **Phase 4 long-tail sweep** — Druze cultural-tourism pattern + community-partnership operator framing reusable for Carmel/Galilee Druze coverage. Banias/Caesarea Philippi disambiguation pattern reusable for any future ambiguous Israeli toponym.
- **Phase 6 monitoring** — `data/region-gates/golan.md` per-region report feeds Phase 6 cron for ongoing audit-score regression detection alongside the other Wave 1/2/3/4 regions.

---

_Phase: 03-region-replication-m3_
_Plan: 08 (golan)_
_Completed: 2026-05-11_
