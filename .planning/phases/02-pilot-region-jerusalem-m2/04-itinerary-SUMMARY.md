---
phase: 02-pilot-region-jerusalem-m2
plan: 04
subsystem: content
tags:
  - phase-2
  - itinerary
  - jerusalem
  - mdx
  - velite
  - schema-injection
  - tourist-trip
  - guide-or-winery-profile
  - hebrew-content-writer
  - paired-religious-naming
  - affiliate-density
dependency_graph:
  requires:
    - phase-02/01-en-canonical (renderer + Velite + audit wiring + EN canonical to link to)
    - phase-02/02-he-canonical (HE Business-Casual register + qa:hebrew-content + pilot-checkpoint PASS)
    - phase-02/03-sub-destinations (7 sub-dest pages provide the internal-link targets for the itinerary; renderer pattern; Velite schema)
    - phase-01/04-schema-baseline (schema-dts v2 types + `as unknown as WithContext<T>` cast pattern)
    - phase-01/06-velite (collection registration pattern + s.mdx() body compilation)
    - phase-01/07-quality-profiles (GUIDE_OR_WINERY profile + scorer; min word count 600, min affiliates 1)
    - phase-01/10-audit-dashboard (34 AUD rules + loadVeliteIndex pattern; detectProfile)
  provides:
    - dynamic-itinerary-renderer (consumed by Phase 4 long-tail itinerary expansion: "5 days in Israel", "10 days northern Israel", etc.)
    - velite-itinerary-collection (durationDays + regions[] + startRegion + stops[] + heroImage + body — pattern reusable for every Phase 4 itinerary)
    - itinerary-schema-generator (lib/schema/itinerary.ts emits typed TouristTrip with itinerary[] of TouristAttraction stops + additionalProperty durationDays)
    - guide-or-winery-profile-validation (first content page exercising GUIDE_OR_WINERY profile; scored 100/100 EN+HE — promotes confidence that an ITINERARY-specific profile is NOT needed yet)
    - audit-detectprofile-itineraries (itineraries collection → GUIDE_OR_WINERY mapping locked at detectProfile level)
    - qa-hebrew-content-itinerary-scope (qa:hebrew-content now scans itineraries collection alongside regions + subDestinations)
    - bethlehem-deferred-pattern (mention with administrativeStatus framing + NO internal link to /west-bank/bethlehem/ — pattern reusable for Hebron, Jericho mentions in Phase 3+)
  affects:
    - Phase 2.5 hub + legal (/itineraries/ hub page can pull this entry as the seed card; BreadcrumbList middle segment already provisional)
    - Phase 2.6 Quality Gate (AUD-007 + AUD-017..020 + AUD-024/025 + AUD-031 + AUD-032 + AUD-033 all pass on the EN/HE pair; criterion 2 audit score extends from 16 pages to 18 pages)
    - Phase 3 region replication (every region can ship a "3 days in <region>" itinerary on this exact renderer with no code change; pattern locked)
    - Phase 4 long-tail (multi-region itineraries: "7 days in Israel anchored on Jerusalem", "Northern Israel from Haifa" — the renderer's stops[] cross-collection resolution generalises to any startRegion)
tech_stack:
  added: []
  patterns:
    - 'Itinerary route renderer mirrors region + sub-dest renderers; uses Velite stops[] frontmatter (not body parsing) for schema TouristTrip.itinerary[] resolution'
    - 'Cross-collection Velite lookup: itinerary stops resolved via subDestinations collection (filtered to shipped pages); missing entries excluded gracefully so Phase 4 long-tail stops can be added incrementally'
    - 'TouristTrip schema with additionalProperty PropertyValue for durationDays — preserves structural value while staying within schema-dts v2 type constraints'
    - 'GUIDE_OR_WINERY profile reused for itineraries (Plan 2.4 lock per RESEARCH §8 OQ2); a dedicated ITINERARY profile remains deferred unless scoring misleads. EN + HE both score 100 — validation that the existing profile fits.'
    - 'AffiliateCard density target: 6 distinct partners on 1789-word EN (lodging + transport + insurance + 3 tour partners; tour partners segmented by editorial day theme)'
    - 'Bethlehem mention with administrativeStatus framing but NO link — same pattern as plan 2.3 EN canonical day-trips section; deferred until Phase 3 /west-bank/bethlehem/ ships'
    - 'HE word-count mid-band targeting (~0.93 ratio): first draft hit 0.828 → native HE expansion of 3 in-domain passages (Western Wall plaza history; Yad Vashem architecture; Masada mineral floor) moved ratio to 0.928 (mid-band)'
key_files:
  created:
    - 'app/[locale]/itineraries/[slug]/page.tsx'
    - 'lib/schema/itinerary.ts'
    - 'tests/schema/itinerary-schema.test.ts'
    - 'tests/content/jerusalem-itinerary.test.ts'
    - 'content/en/itineraries/3-days-in-jerusalem.mdx'
    - 'content/he/itineraries/3-days-in-jerusalem.mdx'
    - 'public/images/itineraries/jerusalem/3-days-in-jerusalem.jpg'
    - 'public/images/itineraries/jerusalem/generate-images.mjs'
  modified:
    - 'velite.config.ts'
    - 'lib/schema/index.ts'
    - 'scripts/audit/profiles/detect.ts'
    - 'scripts/audit/run.ts'
    - 'scripts/qa/hebrew-content.mjs'
    - 'app/sitemap.ts'
    - 'data/photo-credits.json'
    - 'data/hebrew-content-results.json'
decisions:
  - 'Audit profile reused: itineraries collection routed to GUIDE_OR_WINERY in detectProfile (Plan 2.4 lock per RESEARCH §8 OQ2; new ITINERARY profile deferred). EN and HE both score 100/100 with 0 blocking — validates the lock. Promote to a dedicated profile only if Phase 4 long-tail scoring misleads.'
  - 'Schema generator emits TouristTrip with @id #trip + itinerary[] (TouristAttraction stops) + additionalProperty PropertyValue carrying durationDays — preserves structured value access for downstream consumers (plan 10 audit + plan 6 monitoring) while staying within schema-dts v2 type constraints. `as unknown as WithContext<T>` cast applied uniformly with the other 11 generators (Plan 1.4 lock).'
  - 'Stops resolved via Velite cross-collection lookup, NOT body parsing: frontmatter stops: [{slug, day, period}] drives the schema generator. Missing sub-destinations (Phase 4 long-tail) are filtered gracefully — schema reflects shipped pages only. Decision recorded at the renderer level and pinned by tests/content/jerusalem-itinerary.test.ts assertion that all linked sub-dests are in the Phase 2.3 shipped set.'
  - 'Velite slug stays flat (no region prefix needed because itineraries live under their own top-level /itineraries/ segment, not under a parent /<region>/). The audit walker key construction adds the "itineraries/" prefix in loadVeliteIndex so inferSlug output and Velite key agree — mirrors the plan-2.3 sub-dest prefix-stripping pattern in mirror form (prefix-adding here).'
  - 'BreadcrumbList provisional middle segment: Home → Itineraries → <Itinerary>. The /itineraries/ hub page does not exist yet — Phase 2.5 ships it; for now the breadcrumb structurally reflects the URL hierarchy. When the hub lands, the breadcrumb link will resolve to a real page without any renderer change.'
  - 'AffiliateCard density: 6 distinct partners on the 1789-word EN page (well above ≥3 floor). Partners segmented by editorial day theme: Day 0 prep (booking + skyscanner + safetyWing) → Day 1 (civitatis Old City tour) → Day 2 (getYourGuide Yad Vashem + viator Mahane Yehuda food tour) → Day 3 (getYourGuide Dead Sea + Masada). HE mirrors the same 6 partners; no partner-mix drift between locales.'
  - 'Bethlehem framing in HE: "תחת מינהל הרשות הפלסטינית" explicit. PITFALLS §3.3 admin-status requirement on Bethlehem (West Bank) mentions. NO link to /west-bank/bethlehem/ in either locale — deferred to Phase 3. Pattern reusable for Hebron and Jericho mentions when Phase 3 covers them.'
  - 'HE word-count mid-band targeting (0.928): first HE draft hit 0.828 (below AUD-007 0.85 floor). Added 3 native-domain passages — Western Wall plaza historical context (Mughrabi Quarter), Yad Vashem Safdie architecture + Avenue of the Righteous Among the Nations, Masada mineral-floor low-elevation note — each in-domain expansion, not filler. Pattern lock matches plan 2.2 + 2.3 mid-band rule.'
metrics:
  duration_min: 19
  tasks: 2
  files_created: 8
  files_modified: 8
  commits: 2
  tests_added: 31
  tests_total: 713
  tests_skipped: 1
  audit_score_en_itinerary: 100
  audit_score_he_itinerary: 100
  audit_blocking_issues: 0
  itineraries_shipped: 1
  paired_pages_shipped: 2
  word_count_en: 1789
  word_count_he: 1660
  he_en_ratio: 0.928
  affiliate_card_placements_total: 12
  distinct_affiliate_partners_used: 6
  internal_link_target_sub_dests: 7
  schema_types_emitted: 2
  schema_payloads_per_page: 2
completed: 2026-05-11
---

# Phase 2 Plan 04: Jerusalem Itinerary Summary

**"3 Days in Jerusalem" itinerary pair (EN 1789w + HE 1660w, ratio 0.928) shipped on a brand-new TouristTrip schema generator + itineraries Velite collection + dynamic /[locale]/itineraries/[slug] route — both pages score GUIDE_OR_WINERY 100/100 with 0 blocking, 6 distinct affiliate partners per page (booking lodging + skyscanner transport + safetyWing insurance + civitatis/getYourGuide/viator tours), 7 internal links to Phase 2.3 sub-destinations, Bethlehem mention with explicit Palestinian Authority framing and no internal link (deferred), and the audit walker + qa:hebrew-content + detectProfile all extended to recognise the new collection.**

## Performance

- **Duration:** 19 min
- **Started:** 2026-05-11T08:41:46Z
- **Completed:** 2026-05-11T09:00:52Z
- **Tasks:** 2 (1 Wave-0 + 1 content authoring)
- **Files created:** 8
- **Files modified:** 8

## Accomplishments

- First itinerary page pair on the site, validating the GUIDE_OR_WINERY profile against real content
- Velite Itinerary collection + lib/schema/itinerary.ts + dynamic route renderer all reusable for Phase 4 long-tail itinerary expansion
- 6 distinct affiliate partners on a single page (above the ≥3 floor, lifts internal-link graph density)
- HE/EN ratio 0.928 mid-band on first content-only iteration (one expansion pass)
- Audit walker + qa:hebrew-content + detectProfile extended to recognise the new collection — pattern repeatable for every new Velite collection

## Task Commits

1. **Task 1: Wave 0 — itineraries collection + lib/schema/itinerary.ts + route renderer + tests** — `1ff1337` (feat)
2. **Task 2: Author EN + HE "3 Days in Jerusalem" itinerary MDX** — `fa91b36` (feat)

**Plan metadata:** (commit lands as part of final orchestrator step)

_Note: Task 2 is content-authoring on top of the Task 1 scaffold; tests scaffolded in Task 1 (HAS_MDX-gated skip) auto-unblock when MDX lands in Task 2._

## Files Created/Modified

### Created (8)

- `app/[locale]/itineraries/[slug]/page.tsx` — dynamic itinerary RSC; Velite Itinerary lookup; TouristTrip + BreadcrumbList JSON-LD; cross-collection stop resolution
- `lib/schema/itinerary.ts` — itinerarySchema() generator emitting WithContext<TouristTrip> with itinerary[] of TouristAttraction stops + additionalProperty durationDays
- `tests/schema/itinerary-schema.test.ts` — 8 tests covering schema shape, lang, durationDays, geo conditionals, empty stops, @id fragment
- `tests/content/jerusalem-itinerary.test.ts` — 23 tests covering EN + HE per-page invariants (frontmatter, day H2s, internal links to plan 2.3 set, affiliate density + partner-mix, word count, Bethlehem framing, no /west-bank link) + AUD-007 ratio test
- `content/en/itineraries/3-days-in-jerusalem.mdx` — 1789 words, 3 H2 day sections, 6 distinct AffiliateCard partners, 7 internal-link target sub-dests
- `content/he/itineraries/3-days-in-jerusalem.mdx` — 1660 words native HE rewrite (Business-Casual register + Option C gender-neutral + ktiv maleh + Latin brand bidi-wrap), HE/EN ratio 0.928
- `public/images/itineraries/jerusalem/3-days-in-jerusalem.jpg` — Sharp placeholder 1920×1080; REAL Wikimedia ledger metadata (Andrew Shiva CC-BY-SA-4.0 cityscape)
- `public/images/itineraries/jerusalem/generate-images.mjs` — Sharp placeholder generator (mirrors plan 2.1 + 2.3 pattern)

### Modified (8)

- `velite.config.ts` — itineraries collection added (durationDays + regions[] + startRegion + heroImage + stops[] + faqs[3-10] + body: s.mdx()); itineraryStop sub-schema
- `lib/schema/index.ts` — itinerarySchema + types re-exported
- `scripts/audit/profiles/detect.ts` — itineraries → GUIDE_OR_WINERY mapping
- `scripts/audit/run.ts` — loadVeliteIndex mappings extended to include itineraries.json; lookup key construction adds 'itineraries/' prefix to match inferSlug output
- `scripts/qa/hebrew-content.mjs` — main() loads .velite/itineraries.json alongside regions + subDestinations (pure-helper contract preserved)
- `app/sitemap.ts` — /itineraries/3-days-in-jerusalem path added; replicates to /he + /en/ via the localizedUrl loop
- `data/photo-credits.json` — +1 itinerary hero entry (14 entries total)
- `data/hebrew-content-results.json` — regenerated; 9 HE pages scanned, 0 violations

## Decisions Made

See the `decisions:` frontmatter block (8 entries) for the full list with rationale. Headline decisions:

1. **GUIDE_OR_WINERY profile reused (Plan 2.4 lock per RESEARCH §8 OQ2):** Both EN + HE itinerary pages score 100/100 with 0 blocking against the existing GUIDE_OR_WINERY rubric. A dedicated ITINERARY profile remains deferred — promote only if Phase 4 long-tail scoring misleads.
2. **TouristTrip schema generator with `additionalProperty` for `durationDays`:** preserves structured value access without fighting schema-dts v2 type constraints. `as unknown as WithContext<T>` cast applied uniformly with the other 11 generators (Plan 1.4 lock).
3. **Stops resolved via cross-collection Velite lookup, NOT body parsing:** frontmatter `stops: [{ slug, day, period }]` drives the schema generator. Missing sub-destinations (Phase 4 long-tail) are filtered gracefully — schema reflects shipped pages only. Test asserts all linked sub-dests are in the Phase 2.3 shipped set.
4. **Bethlehem mention with administrativeStatus framing but NO internal link:** same pattern as plan 2.3 EN canonical day-trips section; deferred until Phase 3 /west-bank/bethlehem/ ships. Pattern reusable for Hebron, Jericho.
5. **HE word-count mid-band targeting (0.928):** first HE draft hit 0.828 (below AUD-007 floor). Added 3 native-domain passages — Western Wall plaza historical context, Yad Vashem Safdie architecture, Masada mineral-floor low-elevation note. Mid-band targeting matches plan 2.2 + 2.3 lock.
6. **AffiliateCard density: 6 distinct partners on 1789-word EN page** (well above ≥3 floor). Partners segmented by editorial day theme — prep-day lodging/transport/insurance + day-themed tours.
7. **Provisional Breadcrumb middle segment `/itineraries/`:** Phase 2.5 hub page does not exist yet but the breadcrumb structurally reflects the URL hierarchy. When the hub lands, the link resolves without any renderer change.

## Deviations from Plan

None - plan executed exactly as written.

The plan was specified with high precision — task 1 scope (Wave 0 collection + schema + renderer + tests) and task 2 scope (content authoring with explicit affiliate-mix and internal-link contracts) both shipped without surprises. The one item that needed a deliberate decision in flight was the HE word-count expansion to clear the 0.85 AUD-007 floor; that's the locked mid-band pattern from plans 2.2 + 2.3 and was anticipated.

## Issues Encountered

None.

## Audit Score Breakdown

```
EN /itineraries/3-days-in-jerusalem:
  profile: GUIDE_OR_WINERY
  score:   100 / 100
  issues:  4 (all severity=info, deferred to Phase 6 monitoring)
  blocking: 0

HE /itineraries/3-days-in-jerusalem:
  profile: GUIDE_OR_WINERY
  score:   100 / 100
  issues:  4 (all severity=info, deferred)
  blocking: 0
```

The 4 info-level issues per page are deferred audit rules (AUD-010 affiliate-URL health monitor, AUD-011 conversion-rate anomaly, AUD-013 + AUD-034 Lighthouse). These are all Phase 6 / production-monitoring concerns and do not affect score.

| Rule    | Behavior                                                                              |
| ------- | ------------------------------------------------------------------------------------- |
| AUD-001 | 0 violations (no raw hex)                                                             |
| AUD-002 | 0 violations (no raw partner URLs)                                                    |
| AUD-007 | 0 violations (HE/EN ratio 0.928 in mid-band)                                          |
| AUD-008 | 0 violations (pre-hydration HTML emitted)                                             |
| AUD-009 | 0 violations (AffiliateDisclosure DOM-precedes first AffiliateCard, renderer-wired)   |
| AUD-017 | 0 violations (no "Wailing Wall" / כותל הדמעות in either locale)                       |
| AUD-018 | 0 violations (no biased framing)                                                      |
| AUD-019 | 0 violations (Temple Mount / Haram al-Sharif paired on first reference EN + HE)       |
| AUD-020 | 0 violations (Bethlehem mention carries Palestinian Authority framing)                |
| AUD-024 | 0 violations (HE+Latin bidi spans on Booking.com, TLV, Visa, Mastercard, Beer Bazaar) |
| AUD-025 | 0 violations (ktiv maleh consistent)                                                  |
| AUD-031 | 0 violations (≥3 affiliate placements per page; actual: 6)                            |
| AUD-032 | 0 violations (hreflang reciprocity)                                                   |
| AUD-033 | 0 violations (canonical + schema + meta + OG + hreflang)                              |

## Internal-Link Wiring

All 7 Phase 2.3 sub-destinations are linked from the EN + HE itinerary:

| Sub-dest        | Day | Period    | Editorial role                                      |
| --------------- | --- | --------- | --------------------------------------------------- |
| western-wall    | 1   | morning   | Day 1 opener — religious-tourism anchor             |
| holy-sepulchre  | 1   | morning   | Christianity's holiest site, same morning           |
| old-city        | 1   | afternoon | Old City Quarters walking tour link target          |
| yad-vashem      | 2   | morning   | West Jerusalem morning — memorial visit             |
| mount-of-olives | 2   | afternoon | Late-afternoon panorama (sunset over Old City)      |
| mahane-yehuda   | 2   | evening   | Day 2 closer — food market evening                  |
| city-of-david   | 3   | morning   | Bonus half-day add-on (if trip extends to 3.5 days) |

The frontmatter `stops[]` carries the same 7 (sans Old City for day-3 bonus), driving the TouristTrip.itinerary[] schema generator's array. Internal-link graph density: 7 → all 7 shipped sub-dests covered.

## Affiliate Partner Mix

6 distinct partners on each of EN + HE (above the ≥3 GUIDE_OR_WINERY floor):

| Partner      | Placement                          | Editorial role                      |
| ------------ | ---------------------------------- | ----------------------------------- |
| booking      | Day 0 prep — Where to Stay         | Lodging — 3-night Jerusalem         |
| skyscanner   | Day 0 prep — How to get to TLV     | Transport — flights                 |
| safetyWing   | Day 0 prep — Travel insurance      | Insurance — pre-trip                |
| civitatis    | Day 1 afternoon — Old City tour    | Tour — walking-tour specialist      |
| getYourGuide | Day 2 morning + Day 3 sunrise      | Tour — Yad Vashem + Dead Sea/Masada |
| viator       | Day 2 evening — Mahane Yehuda food | Tour — food/bar tour                |

Booking + Skyscanner + RentalCars + SafetyWing are the canonical-page partners from plan 2.1; itinerary lifts 3 of 4 (no rental car — train + sherut + tours cover transport, and rental for a 3-day Jerusalem visit is overkill per editorial guidance). Civitatis + Viator + GetYourGuide are the tour partners; mix segmented by editorial day theme rather than partner concentration. Argentina lesson #2 (single-partner ≥85% concentration risk) is structurally avoided.

## GUIDE_OR_WINERY Profile Fit (Open Question 2 Resolution)

RESEARCH §8 Open Question 2 asked whether the itinerary needs a dedicated ITINERARY profile or whether GUIDE_OR_WINERY suffices. **Resolution: GUIDE_OR_WINERY suffices.** Both EN and HE pages score 100/100 — the profile's weight philosophy (lower AUD-006 cannibalize, higher AUD-018 bias risk, lower AUD-009 affiliate-density requirement, higher AUD-007 word-count parity weight) fits an itinerary just as cleanly as it fits a "best-of" guide or a single-winery deep-dive. The 1500-2500 word-count band (vs the profile's ≥600 floor) and the ≥3 affiliate density (vs the profile's ≥1 floor) are the only itinerary-specific over-deliveries; both are content-layer concerns, not profile-layer.

**Promote to a dedicated ITINERARY profile only if:**

- Phase 4 long-tail itineraries (5-7 day, multi-region) consistently score below 95 on GUIDE_OR_WINERY (signal that the rubric is misfiring)
- AUD-035-class future rules need itinerary-specific weighting (e.g. "stops per day balance", "day-trip recommendation density")

Until then, GUIDE_OR_WINERY is locked.

## Second Itinerary Considered

Per the PLAN output spec: a second itinerary ("7 Days in Israel anchored on Jerusalem") was considered for this plan but deferred for two reasons:

1. **Wave 4 wall-clock budget.** 1 itinerary pair (EN + HE) was the contract. Adding a second would have pushed the plan to ~30 min wall-clock and started bumping against the Phase 2.5 hub+legal start time.
2. **Cross-region itineraries are Phase 3+.** "7 Days in Israel" necessarily covers Tel Aviv, Galilee, the Dead Sea, and the Negev — none of which have canonical pages shipped (only Jerusalem does, until Phase 3). A 7-day itinerary anchored on Jerusalem with 5 day-trip mentions but no internal-link targets would be a 50%-stub editorially.

Phase 4 long-tail itinerary candidates (estimated 4-6 itineraries per pilot region; this is Jerusalem's allocation):

- **5 Days in Jerusalem (Deeper)** — adds Mount Zion, Tower of David, Israel Museum, Ein Karem as full-day sub-dests once Phase 4 ships them.
- **3 Days in Jerusalem for First-Time Christian Pilgrims** — alternative day-by-day emphasising Holy Sepulchre, Via Dolorosa, Garden Tomb, Bethlehem (when Phase 3 lands).
- **3 Days in Jerusalem for Family Travellers** — alternative emphasising Israel Museum + Bloomfield Science Museum + biblical-themed sites.
- **7 Days in Israel Anchored on Jerusalem** — multi-region Phase 4 candidate; depends on Phase 3 Tel Aviv + Galilee canonical pages.

## Self-Check: PASSED

All 8 declared created files exist on disk:

- `app/[locale]/itineraries/[slug]/page.tsx` ✓
- `lib/schema/itinerary.ts` ✓
- `tests/schema/itinerary-schema.test.ts` ✓
- `tests/content/jerusalem-itinerary.test.ts` ✓
- `content/en/itineraries/3-days-in-jerusalem.mdx` ✓
- `content/he/itineraries/3-days-in-jerusalem.mdx` ✓
- `public/images/itineraries/jerusalem/3-days-in-jerusalem.jpg` ✓
- `public/images/itineraries/jerusalem/generate-images.mjs` ✓

Both task commits in git log: `1ff1337` (Task 1 Wave 0 scaffold), `fa91b36` (Task 2 EN + HE content). All 23 itinerary content tests + 8 schema tests green; total suite 712 pass + 1 skipped (was 681 + 1 baseline; +31 net new). `.next/server/app/{he,en}/itineraries/3-days-in-jerusalem.html` produced by pnpm build. Audit dashboard scored 100/100 on both with 0 blocking issues.

## Next Phase Readiness

- **Phase 2.5 hub + legal** ready. The `/itineraries/` hub page can pull this entry as the seed card; the BreadcrumbList middle segment in the renderer is already provisioned for the hub page's eventual landing. The renderer + Velite collection + audit-walker + qa:hebrew-content scope are all stable.
- **Phase 2.6 Quality Gate** ready. AUD-007/017..020/024/025/031/032/033 all clean on the EN/HE pair. Criterion 2 (audit ≥85) extends from 16 pages to 18 pages (canonical pair + 7 sub-dest pairs + 1 itinerary pair). Criterion 5 (EN+HE parity) extends to 9 pairs.
- **Phase 3 region replication** ready. Every region can ship a "3 days in <region>" itinerary on this exact renderer with no code change — the `startRegion` frontmatter field drives the cross-collection stops[] lookup.
- **Phase 4 long-tail** ready. Multi-region itineraries ("7 days in Israel anchored on Jerusalem") can land on the same renderer once Phase 3 ships Tel Aviv + Galilee + Negev canonicals.

CNT-05 complete.

---

_Phase: 02-pilot-region-jerusalem-m2_
_Plan: 04 (itinerary)_
_Completed: 2026-05-11_
