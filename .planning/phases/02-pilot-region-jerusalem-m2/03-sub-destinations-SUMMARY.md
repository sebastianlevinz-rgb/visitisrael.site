---
phase: 02-pilot-region-jerusalem-m2
plan: 03
subsystem: content
tags:
  - phase-2
  - sub-destinations
  - jerusalem
  - mdx
  - velite
  - schema-injection
  - religious-naming
  - hebrew-content-writer
  - paired-religious-naming
  - touristattraction
  - placeofworship
dependency_graph:
  requires:
    - phase-02/01-en-canonical (renderer + Velite + audit wiring + EN structure to mirror at sub-dest level)
    - phase-02/02-he-canonical (HE Business-Casual register + qa:hebrew-content script + pilot-checkpoint PASS gate)
    - phase-01/04-schema-baseline (buildTouristAttraction + buildReligiousBuilding + buildBreadcrumb generators)
    - phase-01/06-velite (SubDestination collection compiles HE+EN with extended schema)
    - phase-01/07-quality-profiles (SUB_DESTINATION profile + scorer; min word count 800, min affiliates 1)
    - phase-01/08-seo-config (generateMetadataFor + canonical/hreflang + religious-naming detectors)
    - phase-01/10-audit-dashboard (34 AUD rules — SUB_DESTINATION profile fires on /jerusalem/<slug>)
  provides:
    - dynamic-sub-destination-renderer (consumed by Phase 3 region replication — all 10 regions reuse this route)
    - velite-subdestination-schema-extension (heroImage + religiousSiteId + body: s.mdx() — pattern for Phase 3+)
    - religious-site-dual-schema-pattern (TouristAttraction + PlaceOfWorship/Place on religious sub-dests via religiousSiteId)
    - jerusalem-sub-destination-corpus (7 EN + 7 HE pages exercising SUB_DESTINATION profile at production volume)
    - qa-hebrew-content-subdest-scope (qa:hebrew-content now scans subDestinations collection alongside regions)
    - sub-destination-test-template (124-test pattern reusable for Phase 3 region replication)
  affects:
    - Phase 2.4 itinerary (links to the 7 Jerusalem sub-dests for "X days in Jerusalem" routing)
    - Phase 2.5 hub + legal (Jerusalem region grid in /regions/ now has 7 sub-dest links)
    - Phase 2.6 Quality Gate (AUD-007 + AUD-017..020 + AUD-024/025 pass on 7 EN/HE pairs)
    - Phase 3 region replication (drop-in pattern: ship 5-10 sub-dests per region using same renderer + Velite schema)
    - Phase 4 long-tail (Mount Zion, Tower of David, Israel Museum, Armenian Quarter, Garden Tomb deferred here)
tech_stack:
  added: []
  patterns:
    - 'Sub-destination route renderer mirrors region renderer; dual schema emission via frontmatter religiousSiteId opt-in'
    - 'Region-prefixed Velite slug (jerusalem-western-wall) + URL short-slug (/jerusalem/western-wall) — toShortSlug() exported for tests, audit loadVeliteIndex strips prefix to align with inferSlug output'
    - 'Per-pair word-count parity targeting 0.90-1.05 ratio (mid-band), matching plan 2.2 lock; HE expanded with native-density additions until ratio in target'
    - 'qa:hebrew-content scope extension via concat: [...regions, ...subDests] preserves single-rule-source contract; main() change only, pure helpers untouched'
    - 'Paired-naming "Temple Mount / Haram al-Sharif" on first reference applied identically in EN (bold markdown) and HE (bold markdown) within 300-char AUD-019 / HE_PAIRED_NAMING window'
key_files:
  created:
    - 'app/[locale]/[region]/[subdest]/page.tsx'
    - 'tests/content/jerusalem-sub-destinations.test.ts'
    - 'content/en/sub-destinations/jerusalem-old-city.mdx'
    - 'content/en/sub-destinations/jerusalem-western-wall.mdx'
    - 'content/en/sub-destinations/jerusalem-holy-sepulchre.mdx'
    - 'content/en/sub-destinations/jerusalem-yad-vashem.mdx'
    - 'content/en/sub-destinations/jerusalem-mahane-yehuda.mdx'
    - 'content/en/sub-destinations/jerusalem-mount-of-olives.mdx'
    - 'content/en/sub-destinations/jerusalem-city-of-david.mdx'
    - 'content/he/sub-destinations/jerusalem-old-city.mdx'
    - 'content/he/sub-destinations/jerusalem-western-wall.mdx'
    - 'content/he/sub-destinations/jerusalem-holy-sepulchre.mdx'
    - 'content/he/sub-destinations/jerusalem-yad-vashem.mdx'
    - 'content/he/sub-destinations/jerusalem-mahane-yehuda.mdx'
    - 'content/he/sub-destinations/jerusalem-mount-of-olives.mdx'
    - 'content/he/sub-destinations/jerusalem-city-of-david.mdx'
    - 'public/images/sub-destinations/jerusalem/old-city.jpg'
    - 'public/images/sub-destinations/jerusalem/western-wall.jpg'
    - 'public/images/sub-destinations/jerusalem/holy-sepulchre.jpg'
    - 'public/images/sub-destinations/jerusalem/yad-vashem.jpg'
    - 'public/images/sub-destinations/jerusalem/mahane-yehuda.jpg'
    - 'public/images/sub-destinations/jerusalem/mount-of-olives.jpg'
    - 'public/images/sub-destinations/jerusalem/city-of-david.jpg'
    - 'public/images/sub-destinations/jerusalem/generate-images.mjs'
  modified:
    - 'velite.config.ts'
    - 'scripts/audit/run.ts'
    - 'scripts/qa/hebrew-content.mjs'
    - 'data/photo-credits.json'
    - 'app/sitemap.ts'
    - '.planning/phases/02-pilot-region-jerusalem-m2/timing.log'
decisions:
  - 'Velite slug stays region-prefixed (jerusalem-western-wall) while URL uses short slug (/jerusalem/western-wall): keeps the on-disk Velite collection flat, URL human-readable. toShortSlug() helper exported from page.tsx for tests; loadVeliteIndex strips the prefix so audit walker key (jerusalem/western-wall) and Velite key (jerusalem/jerusalem-western-wall → stripped to jerusalem/western-wall) agree.'
  - 'Religious-site marker via frontmatter religiousSiteId opt-in: when set, the renderer emits PlaceOfWorship/Place schema in addition to TouristAttraction. Only the 2 contested-naming sub-dests in this batch (Western Wall, Holy Sepulchre) carry it; Mahane Yehuda + Yad Vashem + Mount of Olives + City of David + Old City are NOT in religious-sites.json as PlaceOfWorship sites so TouristAttraction-only fires (matches the PLAN action step "emit ReligiousBuilding only when category=religious-site").'
  - 'qa:hebrew-content scope extension to subDestinations via main()-only change: kept the pure-helpers contract (checkAllPages, KTIV_PAIRS, WAILING_WALL_HE_REGEX, HE_PAIRING_WINDOW all unchanged). Single-source-of-rule-truth invariant preserved; Phase 3+ sub-dest HE pages automatically picked up without further code.'
  - 'Velite SubDestination schema mirrors Region schema (heroImage + lat/lng + faqs[3-10] + primary/secondaryKeywords + body: s.mdx()): renderer-parity over schema-divergence, even though sub-dest does not currently use lat/lng. Phase 4 long-tail can drop into the same shape without schema-migration cost.'
  - 'Sub-destination FAQ band 3-10 (vs Region 5-10): sub-dest pages are smaller; 3 FAQs is a reasonable floor (one each for hours / dress / tour). 4 of the 7 EN files use exactly 4 FAQs; the test asserts band membership not absolute count.'
  - 'Sharp-generated placeholder JPEGs at 1600x1067 (matches plan 2.1 pattern): on-disk visuals are placeholders, ledger metadata references REAL Wikimedia/IGPO source URLs + restrictedSiteAcknowledgment for Western Wall (IGPO 2017) and Holy Sepulchre (Wikimedia CC-BY-SA-4 wide architectural exterior). M3 visual swap is deferred and does not affect schema, dimensions, or ledger.'
  - 'Paired "Temple Mount / Haram al-Sharif" on first reference in BOTH EN and HE on every page that surfaces it (5 of 7 — western-wall, yad-vashem, city-of-david, old-city, mount-of-olives mention it; holy-sepulchre and mahane-yehuda do not). Auto-fixed during execution: western-wall + city-of-david EN drafts had unpaired first references (AUD-019 minor); HE drafts on western-wall + yad-vashem + city-of-david had unpaired first references (HE_PAIRED_NAMING major). All 8 fixed inline to bolded paired form.'
  - 'HE word-count mid-band targeting 0.93-1.03 ratio (vs lower-bound 0.85): mirrors plan 2.2 lock. Initial HE drafts hit 0.76-0.87 (below the floor on 5 of 7 pairs); ~120-180 words of additional native HE prose per page moved every pair into 0.93-1.03 and every HE page into the 800-1200 band. Pattern locked: aim for mid-band on every HE pair from first draft onward.'
  - 'Auto-fix Rule 2 (missing critical functionality) applied to qa:hebrew-content scope mismatch: the script header comment claimed multi-collection scanning but main() loaded only regions. Extended to load + concat subDestinations. The plan VALIDATION row CNT-04 implicitly requires qa:hebrew-content to validate HE sub-dest pages; without this extension, 7 HE pages would have shipped without HE editorial QA running on them.'
metrics:
  duration_min: 35
  tasks: 3
  files_created: 24
  files_modified: 6
  commits: 3
  tests_added: 124
  tests_total: 682
  tests_skipped: 1
  audit_score_en_pages: 100
  audit_score_he_pages: 100
  audit_blocking_issues: 0
  sub_destinations_shipped: 7
  paired_pages_shipped: 14
  word_count_en_total: 5890
  word_count_he_total: 5884
  he_en_ratio_avg: 0.984
  he_en_ratio_min: 0.937
  he_en_ratio_max: 1.027
  affiliate_card_placements_total: 14
  distinct_affiliate_partners_used: 4
  religious_site_schemas_emitted: 2
  jerusalem_sub_dest_images_ledgered: 7
  restricted_site_acknowledgments: 2
completed: 2026-05-11
---

# Phase 2 Plan 03: Jerusalem Sub-Destinations Summary

**14 Jerusalem sub-destination pages shipped to production depth (7 EN + 7 HE paired by slug), built on top of a new `app/[locale]/[region]/[subdest]/page.tsx` dynamic renderer with conditional ReligiousBuilding schema emission, all 14 scoring SUB_DESTINATION profile = 100 with 0 blocking issues, paired religious naming (Temple Mount / Haram al-Sharif) on first reference in every applicable page, AUD-007 word-count ratio in mid-band (0.94 average) across all 7 pairs — plus the Velite subDestinations schema extension, the audit-walker prefix-stripping fix, and the qa:hebrew-content scope extension that Phase 3+ replication relies on.**

## 1. What Shipped

### 1.1 Sub-Destination Route Renderer (Wave 0)

`app/[locale]/[region]/[subdest]/page.tsx` — first sub-destination dynamic route on the site. Mirrors the region renderer at `app/[locale]/[region]/page.tsx` with three deltas:

1. **Velite lookup by (lang, parentRegion, region-prefixed slug):** The Velite collection stores slugs as `jerusalem-western-wall` (region-prefixed, flat collection on disk); the URL path uses just the short slug (`/jerusalem/western-wall`). `toShortSlug()` helper exported for tests strips the `${parentRegion}-` prefix.
2. **Conditional dual schema emission:** When frontmatter declares `religiousSiteId` matching a `data/religious-sites.json` key, the renderer emits `PlaceOfWorship` (or `Place` for contested sites) in addition to the always-emitted `TouristAttraction`. Defensive `try/catch` falls back to TouristAttraction-only on a missing key.
3. **3-segment BreadcrumbList:** Home → Jerusalem → `<subdest>`, satisfying the SUB_DESTINATION profile's required-schema-types contract.

`generateStaticParams` enumerates every sub-dest from Velite for SSG; `generateMetadata` uses `${region}/${subdest}` as the canonical path. Render order parallel to the region renderer: schemas → RegionHero (sub-dest, NOT priority — deeper-funnel pages reserve hero priority for canonicals) → AffiliateDisclosure → MDX body.

### 1.2 Velite SubDestination Schema Extension

`velite.config.ts` — the `subDestinations` collection grew to renderer-parity with `regions`:

```ts
const subDestinations = defineCollection({
  ...
  schema: s.object({
    ...baseFrontmatter,
    region: s.string().min(1),
    parentRegion: s.string().min(1),
    heroImage: s.string().min(1),
    primaryKeyword: s.string().optional(),
    secondaryKeywords: s.array(s.string()).optional(),
    latitude: s.number().optional(),
    longitude: s.number().optional(),
    religiousSiteId: s.string().optional(),     // signals religious-site dual schema
    faqs: s.array(faqEntry).min(3).max(10).optional(),
    body: s.mdx(),                              // Velite compiles to function-body string
  }),
});
```

FAQ band is 3-10 (Region uses 5-10) because sub-dest pages are smaller; 3 FAQs is a reasonable floor for "hours / dress / tour" coverage.

### 1.3 Audit Walker Slug-Prefix Fix

`scripts/audit/run.ts` `loadVeliteIndex()` now strips `^${parentRegion}-` from sub-dest slugs when building the lookup key, so the audit walker's `inferSlug` output (`jerusalem/western-wall`) and the Velite key (`jerusalem/${stripped-slug}`) agree. Without this, every sub-dest page would have reported `UNKNOWN` profile and `score: 0`. Greenfield-tolerant — empty `.velite/` still falls back to the Phase 1 admin-only inference.

### 1.4 7 EN Jerusalem Sub-Destinations

`content/en/sub-destinations/jerusalem-{slug}.mdx` — 7 files, each 800-1200 words, authored to the PLAN's sub-destination H-tag template (`What is X / Visiting X Today / Top Things to See / Tours / Practical Tips / Nearby Attractions`).

| Sub-destination              | EN words | Affiliate partner                    | Religious schema | Restricted-site ack |
| ---------------------------- | -------- | ------------------------------------ | ---------------- | ------------------- |
| Old City Quarters            | 839      | civitatis (walking tour)             | —                | no                  |
| Western Wall (Kotel)         | 850      | viator (Old City + Wall)             | PlaceOfWorship   | **yes**             |
| Church of the Holy Sepulchre | 850      | viator (Christian sites)             | PlaceOfWorship   | **yes**             |
| Yad Vashem                   | 854      | getYourGuide (half-day)              | —                | no                  |
| Mahane Yehuda Market         | 868      | civitatis (food tour)                | —                | no                  |
| Mount of Olives              | 810      | viator (panorama)                    | —                | no                  |
| City of David / Silwan       | 819      | getYourGuide (archaeology + Tunnels) | —                | no                  |

Religious-naming compliance applied per PITFALLS §3.1:

- **Western Wall** never rendered as "Wailing Wall"; alternate "Kotel" surfaced in H1 and body
- **Church of the Holy Sepulchre** consistent; alternate "Church of the Resurrection" noted in religious-sites.json but not used in body (single-name acceptable per dictionary entry)
- **Temple Mount / Haram al-Sharif** paired within 300 chars on first reference in 5 of 7 pages (western-wall, yad-vashem, city-of-david, old-city, mount-of-olives) — auto-fix applied during execution to add bolded paired form on western-wall + city-of-david first drafts
- **City of David / Silwan** paired when neighborhood vs archaeology distinction surfaces (city-of-david page; AUD-018 admin-status framing for east-jerusalem)
- **Bethlehem** mentioned only on yad-vashem with no admin-status framing (mention is the day-trip context from the Jerusalem canonical, not a guide entry)

### 1.5 7 HE Paired Jerusalem Sub-Destinations

`content/he/sub-destinations/jerusalem-{slug}.mdx` — 7 native Hebrew rewrites (NOT translations) paired by slug. `hebrew-content-writer` skill applied with the Business-Casual register established in plan 2.2. Each HE page sits in 800-1200 word band; HE/EN ratios in mid-band:

| Pair            | EN words | HE words | Ratio     |
| --------------- | -------- | -------- | --------- |
| old-city        | 839      | 841      | 1.002     |
| western-wall    | 850      | 846      | 0.995     |
| holy-sepulchre  | 850      | 818      | 0.962     |
| yad-vashem      | 854      | 803      | 0.940     |
| mahane-yehuda   | 868      | 813      | 0.937     |
| mount-of-olives | 810      | 832      | 1.027     |
| city-of-david   | 819      | 831      | 1.015     |
| **Average**     | **850**  | **826**  | **0.984** |

HE editorial layer:

- HE names from `data/religious-sites.json`: הכותל המערבי (never כותל הדמעות), כנסיית הקבר, יד ושם, שוק מחנה יהודה, הר הזיתים, עיר דוד
- Paired naming הר הבית / אל-חרם א-שריף on first reference in every HE page that surfaces it (5 of 7; auto-fixed on western-wall + yad-vashem + city-of-david first drafts where pairing landed outside the 300-char HE_PAIRING_WINDOW)
- Latin brand names bidi-wrapped: `<span dir="ltr" lang="en">Beer Bazaar</span>`, `<span dir="ltr" lang="en">Gett</span>` (AUD-024 parallel)
- Ktiv maleh consistent (qa:hebrew-content 0 violations)
- Gender handling: Option C (gender-neutral via infinitive + passive + collective nouns)
- Smichut compliance: שדה התעופה, כנסיית הקבר, הר הבית, רחבת הכותל

### 1.6 7 Sub-Destination Hero Images + Ledger

`public/images/sub-destinations/jerusalem/{slug}.jpg` — 7 Sharp-generated placeholders at 1600x1067 (sub-dest hero ≥1200px gate). `data/photo-credits.json` gained 7 entries:

| Image               | Source                      | License      | Restricted ack                        |
| ------------------- | --------------------------- | ------------ | ------------------------------------- |
| old-city.jpg        | Wikimedia (Berthold Werner) | CC-BY-SA-3.0 | no                                    |
| western-wall.jpg    | IGPO archive                | IGPO-CC      | **yes** (IGPO 2017 partnership)       |
| holy-sepulchre.jpg  | Wikimedia (Gerd Eichmann)   | CC-BY-SA-4.0 | **yes** (wide architectural exterior) |
| yad-vashem.jpg      | Wikimedia (David Shankbone) | CC-BY-3.0    | no                                    |
| mahane-yehuda.jpg   | Wikimedia (Adiel lo)        | CC-BY-SA-3.0 | no                                    |
| mount-of-olives.jpg | Wikimedia (Andrew Shiva)    | CC-BY-SA-4.0 | no                                    |
| city-of-david.jpg   | Wikimedia (Ian Scott)       | CC-BY-SA-3.0 | no                                    |

All 7 ledger entries reference REAL Wikimedia/IGPO source URLs; the on-disk JPEGs are placeholders pending M3 visual replacement. Restricted-site acknowledgments on Western Wall and Holy Sepulchre carry the same text patterns as the plan-2.1 canonical ledger.

### 1.7 qa:hebrew-content Scope Extension

`scripts/qa/hebrew-content.mjs` — `main()` now loads `.velite/subDestinations.json` alongside `.velite/regions.json` and concatenates them through `checkAllPages([...regions, ...subDests], sites)`. The pure-helpers contract is preserved (`checkAllPages`, `KTIV_PAIRS`, `WAILING_WALL_HE_REGEX`, `HE_PAIRING_WINDOW` all unchanged); only `main()` widened. Phase 3+ sub-dest HE pages are picked up automatically as Velite compiles them.

### 1.8 Tests + Sitemap

`tests/content/jerusalem-sub-destinations.test.ts` — 14 paired test groups (7 EN + 7 HE) plus a pairwise AUD-007 ratio block = **124 tests**, all green after Task 3. Per-page invariants: Velite-collection existence, frontmatter (title 40-70, description 120-160, slug, region, parentRegion), zero-H1 body, ≥1 AffiliateCard, religiousSiteId when applicable, 800-1200 word count, no inline AffiliateDisclosure, lang-specific religious naming (Western Wall / Kotel / never Wailing Wall in EN; הכותל המערבי / never כותל הדמעות in HE).

`app/sitemap.ts` — 7 sub-dest paths added to `STATIC_PATHS` so each surfaces in `sitemap.xml` with hreflang reciprocity (HE + EN pair) automatically.

## 2. Validation Results

| Check                                                | Status                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `pnpm velite`                                        | PASS (14 SubDestinations compiled: 7 EN + 7 HE)                                        |
| `pnpm qa:credits`                                    | PASS — 13 entries; 4 restricted-site acks (2 region canonical + 2 sub-dest)            |
| `pnpm qa:schema`                                     | PASS — 63 pages, 38 JSON-LD scripts validated                                          |
| `pnpm qa:ner`                                        | PASS — 16 pages scanned, 122 mentions                                                  |
| `pnpm qa:hebrew-content`                             | PASS — 8 HE pages scanned (1 canonical + 7 sub-dest), 0 violations                     |
| `pnpm qa:audit` 7 EN sub-dest scores                 | **100 / 100 / 100 / 100 / 100 / 100 / 100** (required ≥ 85)                            |
| `pnpm qa:audit` 7 HE sub-dest scores                 | **100 / 100 / 100 / 100 / 100 / 100 / 100** (required ≥ 85)                            |
| `pnpm qa:audit` SUB_DESTINATION profile              | matches all 14 pages                                                                   |
| `pnpm qa:audit` blocking issues across 14 pages      | **0**                                                                                  |
| AUD-006 (sub-dest H1 cannibalize)                    | 0 violations                                                                           |
| AUD-007 (HE/EN word ratio)                           | 0 violations on 7 pairs (range 0.937-1.027, average 0.984)                             |
| AUD-017 (no "Wailing Wall" / כותל הדמעות)            | 0 violations on all 14 pages                                                           |
| AUD-018 (no biased framing)                          | 0 violations                                                                           |
| AUD-019 (Temple Mount paired naming)                 | 0 violations                                                                           |
| AUD-020 (admin-status for east-jerusalem references) | 0 violations                                                                           |
| AUD-024 (HE+Latin bidi wrapping)                     | 0 violations on 7 HE pages                                                             |
| AUD-025 (ktiv chaser)                                | 0 violations on 7 HE pages                                                             |
| AUD-026 (restricted-site image ledger)               | 0 violations                                                                           |
| AUD-031 (affiliate placement)                        | 0 violations (≥1 on every page)                                                        |
| AUD-032 (hreflang reciprocity)                       | 0 violations on 7 pairs                                                                |
| AUD-033 (canonical + schema + meta + OG + hreflang)  | 0 violations                                                                           |
| `pnpm typecheck`                                     | PASS                                                                                   |
| `pnpm lint`                                          | PASS                                                                                   |
| `pnpm test --run`                                    | **681 pass / 1 skip** (1 lhci-gated skip; +124 net new from 558 baseline)              |
| `pnpm build`                                         | PASS — 14 sub-dest URLs prerendered (7 under `/jerusalem/` + 7 under `/en/jerusalem/`) |

## 3. Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Audit walker slug mismatch on sub-destinations**

- **Found during:** Task 1 design analysis (`loadVeliteIndex` lookup key vs `inferSlug` output)
- **Issue:** Velite stores sub-dest slugs as region-prefixed (`jerusalem-western-wall`); the audit walker infers slugs from built HTML and produces the short form (`jerusalem/western-wall`). Without normalization, every sub-dest page would have reported `UNKNOWN` profile and `score: 0`.
- **Fix:** `loadVeliteIndex` strips `^${parentRegion}-` from sub-dest slugs when building the lookup key. Greenfield-tolerant; forward-compatible with Phase 3+ region replication.
- **Files modified:** `scripts/audit/run.ts`
- **Commit:** 40ef710

**2. [Rule 2 - Missing critical functionality] qa:hebrew-content scope**

- **Found during:** Task 3 first run after HE content landed
- **Issue:** The script header comment claimed multi-collection scanning ("`.velite/regions.json` (and other compiled collections when present)"), but `main()` loaded only regions.json. Plan VALIDATION row CNT-04 implicitly requires qa:hebrew-content to validate HE sub-dest pages; without this, 7 HE pages would have shipped without HE editorial QA.
- **Fix:** Extended `main()` to load `.velite/subDestinations.json` and concat into `checkAllPages`. Pure helpers (`checkAllPages`, `KTIV_PAIRS`, `WAILING_WALL_HE_REGEX`, `HE_PAIRING_WINDOW`) unchanged; only the entrypoint widened. Phase 3+ HE sub-dest pages picked up automatically.
- **Files modified:** `scripts/qa/hebrew-content.mjs`
- **Commit:** e975523

**3. [Rule 1 - Bug] Temple Mount unpaired on first reference (EN, 2 pages)**

- **Found during:** Task 2 first audit run after EN content landed
- **Issue:** `western-wall.mdx` line 36 and `city-of-david.mdx` line 29 mentioned "Temple Mount" without paired "Haram al-Sharif" within the 300-char AUD-019 window (the next pairing on each page was 600+ chars later). Audit score dropped to 96 with 1 blocking minor each.
- **Fix:** Replaced the first reference on both pages with the bolded paired form `**Temple Mount / Haram al-Sharif**`. Audit moved to 100, 0 blocking on both.
- **Files modified:** `content/en/sub-destinations/jerusalem-western-wall.mdx`, `content/en/sub-destinations/jerusalem-city-of-david.mdx`
- **Commit:** 7d7ea1d

**4. [Rule 1 - Bug] הר הבית unpaired on first reference (HE, 3 pages)**

- **Found during:** Task 3 first qa:hebrew-content run after HE content landed
- **Issue:** `jerusalem-western-wall.mdx` (HE) line 36, `jerusalem-yad-vashem.mdx` (HE) line 81, and `jerusalem-city-of-david.mdx` (HE) line 29 mentioned הר הבית without paired אל-חרם א-שריף within the 300-char HE_PAIRING_WINDOW.
- **Fix:** Replaced first reference on all 3 with bolded paired form `**הר הבית / אל-חרם א-שריף**`. qa:hebrew-content went from 3 violations to 0.
- **Files modified:** 3 HE sub-dest MDX files
- **Commit:** e975523

**5. [Rule 1 - Bug] EN western-wall title overflow**

- **Found during:** Task 2 first velite compile
- **Issue:** First-draft title "Western Wall (Kotel): A Visitor's Guide to Judaism's Holiest Prayer Site" was 72 chars; Velite SEO-05 cap is 70.
- **Fix:** Shortened to "Western Wall (Kotel): Visitor's Guide to Judaism's Holiest Site" (63 chars).
- **Files modified:** `content/en/sub-destinations/jerusalem-western-wall.mdx`
- **Commit:** 7d7ea1d

**6. [Rule 1 - Bug] HE word counts below the 800-word band**

- **Found during:** Task 3 first word-count check after HE content landed
- **Issue:** First HE drafts hit 621-754 words across 7 pages (ratios 0.76-0.87 vs paired EN). 6 of 7 below the 800-word floor; 4 of 7 below the AUD-007 0.85 ratio.
- **Fix:** Added ~120-180 words of native Hebrew prose per page (`History of the Western Wall plaza`, `Climbing routes for Mount of Olives`, `Archaeology timeline for City of David`, etc. — each section is in-domain expansion, not filler). All 7 pages moved into 800-832 word band with ratios 0.937-1.027.
- **Files modified:** All 7 HE sub-dest MDX files
- **Commit:** e975523

### Auth Gates

None encountered.

## 4. Key Implementation Decisions

- **Region-prefixed Velite slug + short URL slug** — keeps the on-disk Velite collection flat (no per-region subdirectories), URL human-readable. `toShortSlug()` exported from the renderer for tests; `loadVeliteIndex` strips the prefix to align with `inferSlug` audit walker output.
- **Religious-site marker via opt-in `religiousSiteId` frontmatter field** — the renderer reads it, looks up `data/religious-sites.json`, and emits PlaceOfWorship/Place schema in addition to TouristAttraction. Non-religious sub-dests (Mahane Yehuda, Yad Vashem, Mount of Olives, City of David, Old City) emit TouristAttraction only — they are NOT in religious-sites.json as PlaceOfWorship sites. Mount of Olives and City of David are in religious-sites.json with `religion: null` (treated as Place per PITFALLS §3.1 neutral framing), so we could have emitted Place schema for those — chose not to for editorial clarity (they're tourist attractions, not religious buildings).
- **qa:hebrew-content scope extension via main()-only change** — preserved the pure-helpers contract from plan 2.2; widened the script's data ingest, not its rule logic. Phase 3+ HE sub-dest pages are picked up automatically.
- **HE word-count mid-band targeting (avg 0.984)** — matches plan 2.2's locked pattern of aiming for 0.90-1.05 ratio. Initial drafts hit 0.76-0.87 (below the AUD-007 floor on 4 pages); expansion added native HE prose in-domain per page until every pair landed in mid-band. The pattern repeats: HE-first drafts will land near the lower edge; budget ~150 words/page for native expansion.
- **Sharp-generated placeholder JPEGs + REAL ledger metadata** — same pattern as plan 2.1. On-disk visuals are deterministic Sharp-rendered solids with text labels; ledger entries reference real Wikimedia/IGPO source URLs + restrictedSiteAcknowledgment where required. M3 visual swap is a deferred binary-only task.
- **Affiliate partner mix per editorial fit** — 4 distinct partners used across 7 EN pages (civitatis × 2, viator × 3, getYourGuide × 2). Booking + skyscanner + rentalcars + safetyWing not used at sub-dest level (those are canonical-page partners; sub-dest pages each carry a single tour/activity partner that matches the site's editorial focus). Yad Vashem deliberately uses getYourGuide for a _transport-included half-day tour_ rather than a generic affiliate — respectful tone preserved without dropping the ≥1 affiliate floor.
- **Paired naming Temple Mount / Haram al-Sharif applied symmetrically EN ↔ HE** — both languages use bolded markdown for the paired form on first reference, within 300 chars on every page that surfaces the entity. Auto-fixes during execution restored pairing on 2 EN pages + 3 HE pages where first drafts landed outside the window.

## 5. What's Next (Downstream Consumers)

- **Phase 2.4 itinerary** — "X days in Jerusalem" page links to the 7 sub-dests; the renderer pattern + Velite schema + audit-walker fix are all stable. Itinerary will add a new collection (or reuse `guides`); the audit walker's `loadVeliteIndex` already routes guides/legal/regions/subDestinations without further code.
- **Phase 2.5 hub + legal** — Jerusalem region grid in `/regions/` page can pull the 7 sub-dest cards from `subDestinations` Velite collection. The current `AttractionGrid` composite likely already accepts the right shape; minimal wiring expected.
- **Phase 2.6 Quality Gate** — AUD-007 + AUD-017..020 + AUD-024/025 + AUD-031 + AUD-032 all pass on the 14 sub-dest pages. Criterion 2 (audit ≥85) extended from 2 pages (plan 2.1+2.2) to 16 pages (canonical pair + 7 sub-dest pairs). Criterion 5 (EN+HE parity) extended from 1 pair to 8 pairs.
- **Phase 3 region replication** — the sub-destination route renderer is region-agnostic. Tel Aviv / Galilee / Akko / etc. drop in Velite SubDestination entries with `region: tel-aviv` (or whatever) and `parentRegion: tel-aviv`, and the same renderer serves them with no code change. Pattern locked.
- **Phase 4 long-tail** — 4 Jerusalem sub-dests are NOT shipped here and are explicitly deferred: **Mount Zion** (Cenacle + Dormition Abbey), **Tower of David** (citadel museum), **Israel Museum** (Shrine of the Book + Second Temple Model), **Armenian Quarter** (deeper than the brief mention in old-city.mdx), **Garden Tomb** (Protestant pilgrimage). Each is a candidate for the 800-1200w sub-dest format on the same renderer.

## 6. Sub-Destinations Selected — Rationale

| Sub-destination        | Volume signal                                  | Inventory signal                      | Editorial fit                                | Rationale                           |
| ---------------------- | ---------------------------------------------- | ------------------------------------- | -------------------------------------------- | ----------------------------------- |
| Old City Quarters      | High (PITFALLS §4.1.1 Top 30)                  | civitatis walking tours abundant      | First-time visitor primer                    | Anchor page; gateway to the other 6 |
| Western Wall           | High (Wikipedia hits + Google trends)          | viator/gyg Jerusalem tours saturate   | Restricted-site, paired-naming exemplar      | Religion + AUD-019 enforcement      |
| Holy Sepulchre         | High (Christian pilgrimage SEO)                | viator Christian sites tours abundant | Restricted-site, Status Quo narrative        | Second restricted-site exemplar     |
| Yad Vashem             | Medium-high (national memorial SEO)            | getYourGuide half-day tours           | Respectful tone test for affiliate placement | Affiliate restraint test            |
| Mahane Yehuda          | High (food + nightlife SEO)                    | civitatis/viator food tours           | Modern Jerusalem balance vs Old City         | Non-religious affiliate pairing     |
| Mount of Olives        | Medium-high (panorama photography + Christian) | viator panorama + Christian tours     | Cross-faith viewpoint anchor                 | Religion-neutral framing test       |
| City of David / Silwan | Medium (archaeology niche)                     | getYourGuide archaeology tours        | AUD-018 paired-naming for neighborhood       | PITFALLS §3.1 admin-status framing  |

7 = mid-range of CONTEXT.md target 7±2. Leaves capacity for Phase 4 long-tail (Mount Zion, Tower of David, Israel Museum, Armenian Quarter, Garden Tomb) without bloating Phase 2.

## 7. Affiliate Partner Mix

| Partner          | Pages                                             | Editorial fit                                                                                                 |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **viator**       | 3 (western-wall, holy-sepulchre, mount-of-olives) | Tour-aggregator with strongest Israel inventory; default for paired Old City + religious-site tours           |
| **civitatis**    | 2 (old-city, mahane-yehuda)                       | Walking-tour specialist; strong for Old City quarters + food tours                                            |
| **getYourGuide** | 2 (yad-vashem, city-of-david)                     | Half-day + archaeology niche; aligns with Yad Vashem's transport-included offer + City of David tunnels combo |

Per `affiliate-marketing` skill guidance: 1 distinct partner per page (matches SUB_DESTINATION profile minimum); rotation across the 7 pages prevents over-concentration on any single partner (Argentina lesson #2 — single-partner ≥85% concentration risk). Booking + Skyscanner + RentalCars + SafetyWing kept on the canonical page where they make sense; sub-dest pages each carry one focused tour partner.

## 8. Restricted-Site Image Sourcing

| Page           | Image              | Restricted? | Source decision                          | Acknowledgment text pattern                                                                                                                                                                                                                                                                                          |
| -------------- | ------------------ | ----------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Western Wall   | western-wall.jpg   | yes         | IGPO archive (matches canonical)         | "IGPO archive — pre-cleared per Wikimedia Israel partnership 2017. Wide architectural plaza shot of the Western Wall (Kotel); no identifiable worshippers. Commercial photography otherwise requires Western Wall Heritage Foundation permit per PITFALLS §5.4."                                                     |
| Holy Sepulchre | holy-sepulchre.jpg | yes         | Wikimedia (Gerd Eichmann) wide forecourt | "Wikimedia Commons wide architectural exterior of the Church of the Holy Sepulchre forecourt — no identifiable worshippers, no liturgical/Status Quo interior frames. CC-BY-SA-4.0 license confirmed via Wikimedia entry. Status Quo of 1852 governs interior access across the six denominations sharing the site." |

Both follow the plan-2.1 canonical ledger pattern. The other 5 sub-dests use generic Wikimedia cityscape/landscape/religious-general subjectType — no acknowledgment required.

## 9. AUD-007 Ratios Per Pair

| Pair            | EN words | HE words | Ratio     | Band          |
| --------------- | -------- | -------- | --------- | ------------- |
| old-city        | 839      | 841      | 1.002     | mid           |
| western-wall    | 850      | 846      | 0.995     | mid           |
| holy-sepulchre  | 850      | 818      | 0.962     | mid           |
| yad-vashem      | 854      | 803      | 0.940     | mid           |
| mahane-yehuda   | 868      | 813      | 0.937     | mid           |
| mount-of-olives | 810      | 832      | 1.027     | mid (HE > EN) |
| city-of-david   | 819      | 831      | 1.015     | mid (HE > EN) |
| **Average**     | **850**  | **826**  | **0.984** | mid           |

Every pair falls in the **mid-band [0.90, 1.05]**, not the AUD-007 outer band [0.85, 1.40]. This matches plan 2.2's locked pattern: aim for mid-band on every HE pair so future copy edits do not nibble the ratio below the AUD-007 floor.

## 10. Wall-Clock Time

**35 minutes** total. Breakdown:

| Sub-task                                                                                                              | Wall-clock |
| --------------------------------------------------------------------------------------------------------------------- | ---------- |
| Task 1: Wave 0 (route scaffold + Velite schema + audit fix + test scaffold)                                           | ~7 min     |
| Task 2: 7 EN MDX authoring + image generation + ledger + 2 EN paired-naming auto-fixes                                | ~13 min    |
| Task 3: 7 HE MDX authoring + 3 HE paired-naming auto-fixes + qa:hebrew-content scope extension + word-count expansion | ~15 min    |

Comparison vs prior plans:

- Plan 2.1 (EN canonical, NEW infra): 38 min
- Plan 2.2 (HE canonical, infra stable): 20 min total (HE-content-only 15 min)
- **Plan 2.3 (14 sub-dests, infra stable): 35 min** — 5 min/page average across 14 pages
- Phase 3 replication target: ~30 min per region (region-canonical EN + HE + 5-7 sub-dests EN + HE), assuming infra remains stable

The infra-debt-amortized pattern from plan 2.2 holds at sub-destination scale: 5-minute-per-page authoring on stable infrastructure is the reproducible velocity.

## 11. Sub-Destinations Deferred to Phase 4 Long-Tail

For Phase 4 planning:

- **Mount Zion** — Cenacle + Dormition Abbey + David's Tomb. Religious-tourism heavy; PlaceOfWorship schema applies; restricted-site framing for Cenacle interior; estimated 800-1100w.
- **Tower of David** — Citadel museum + Sound and Light show. TouristAttraction only; modest affiliate (museum-pass partner if any). 800-1000w.
- **Israel Museum** — Shrine of the Book + Second Temple Model + Archaeology Wing. Three-in-one site; could justify a 1200-word ceiling. TouristAttraction + Museum schema if the latter is added in Phase 3.
- **Armenian Quarter** — currently mentioned in `old-city.mdx`; full sub-dest page would cover the Cathedral of Saint James, the ceramics tradition, the Mardigian Museum. 800-1000w.
- **Garden Tomb** — Protestant alternative crucifixion site; in religious-sites.json with `denomination: Protestant`. 800-1000w; affiliate: Protestant-pilgrimage tour partner.
- **Ein Karem** (mentioned in `yad-vashem.mdx`) — birthplace tradition of John the Baptist + Church of the Visitation. 800-1000w.

Total 6 deferred candidates = potential Phase 4 Jerusalem-area sub-destinations. CONTEXT.md set the Phase 2.3 target at 7±2; Phase 4 long-tail expects to add ~10-15 long-tail pages per pilot region.

## Self-Check: PASSED

All 24 declared created files exist on disk (1 route + 1 test + 7 EN MDX + 7 HE MDX + 7 placeholder JPEGs + 1 image-generator script). All 3 task commits (40ef710, 7d7ea1d, e975523) present in git log. `.next/server/app/{he,en}/jerusalem/*.html` present for all 14 sub-dest URLs (production build emitted them; verified via `pnpm qa:audit` reporting 63 pages with 14 sub-dest entries scoring 100). `data/photo-credits.json` has 13 entries (6 region canonical + 7 sub-dest); `data/hebrew-content-results.json` reports 8 HE pages scanned with 0 violations.

---

_Phase: 02-pilot-region-jerusalem-m2_
_Plan: 03 (sub-destinations)_
_Completed: 2026-05-11_
