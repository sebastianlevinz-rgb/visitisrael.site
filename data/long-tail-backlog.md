---
status: DEFERRED-AWAITING-R3-VALIDATION
created: 2026-05-11
reactivation_trigger: R3 keyword data purchased (Ahrefs Lite $129 OR DataForSEO API $50) per Phase 2 STATE.md Gap §6.1
gap_closure_command: /gsd:plan-phase 4 --gaps
phase: 04-long-tail-sweep-m4
plan: 01
sources:
  - .planning/research/FEATURES.md
  - .planning/research/PITFALLS.md
  - .planning/phases/03-region-replication-m3/03-CONTEXT.md
  - data/region-replication-report.md
---

# Long-Tail Sub-Destination Backlog — DEFERRED

> **Status: DEFERRED-AWAITING-R3-VALIDATION.** This file is a structured queue of candidate long-tail slugs per region, scored with **proxied composite values** derived from `FEATURES.md` editorial scoring + `PITFALLS.md` editorial-gem flags + Phase 3 cut-list residuals. These are **NOT measured search volumes.** Do not author MDX content for any entry below until R3 keyword data is purchased and a real `/gsd:plan-phase 4 --gaps` cycle ranks candidates by `(volume × difficulty⁻¹)`.

---

## Deferral Rationale (Argentina Lesson #9)

Phase 4's success criteria #1 requires **validated keyword volume** before substantive long-tail authoring. The Argentina retrospective (lesson #9) documents that ~70% of long-tail pages shipped with proxied/inferred volumes ranked for the **wrong intent** and required rewrite within 3 months — wiping out the velocity gain that motivated shipping in the first place.

Proxied composite scores (from this backlog) are **sufficient** to answer "is this candidate worth building at all" — but **insufficient** to answer "which 5 of these 30 candidates to write first, and at what depth." The latter question requires per-keyword volume distribution within each region cluster, which only R3 (Ahrefs Lite $129 or DataForSEO API $50) provides.

**Confidence on proxied composites below:** MEDIUM-LOW. Use this backlog as a planning surface, not an execution roadmap.

**Trigger to substantive execution:** R3 data lands in `data/keyword-data.json` (or equivalent DataForSEO/Ahrefs export), then operator runs `/gsd:plan-phase 4 --gaps` per `data/long-tail-trigger.md`.

---

## Scoring Convention

Each candidate carries:

- **slug:** lowercase, hyphenated, parent-region prefix included for URL clarity (the eventual MDX file will follow Phase 3 naming pattern `{region}-{subdest}.mdx`)
- **proxied composite:** ~5 to ~8 scale, mirroring `FEATURES.md` composite scoring (a hand-derived blend of "demand × monetizability × content-feasibility × Israel-distinctiveness"); **NOT a search volume**
- **source:** which research doc surfaced the candidate (FEATURES §X, PITFALLS §Y, or CONTEXT cut-list)
- **justification:** 1-line editorial reasoning
- **affiliate angle:** the monetization vector that justifies inclusion (booking, civitatis, viator, getYourGuide, skyscanner, rentalcars, safetyWing, etc.)

---

## Per-Region Backlog

### Tel Aviv (parent: tel-aviv)

Already shipped in Phase 3 (14 sub-dests). Long-tail expansion targets **niche intent** and **event/seasonal** clusters that the canonical 14 don't cover.

- **slug:** tel-aviv-bauhaus-architecture-tour | proxied composite: ~7 | source: FEATURES §3.1 | justification: White City UNESCO 2003 — commercial guided-tour intent under-served at /tel-aviv/; English-speaking architecture-tourism is a discrete audience | affiliate: getYourGuide architecture tours + Civitatis Bauhaus walking tour
- **slug:** tel-aviv-shabbat-friendly-nightlife | proxied composite: ~6 | source: PITFALLS §6.2 | justification: Shabbat-aware TLV is a niche but high-converting cluster — visitors arriving Friday night need actionable "which clubs stay open" content; competitive gap | affiliate: booking weekend-stay packages
- **slug:** tel-aviv-jaffa-flea-market-shuk-hapishpeshim | proxied composite: ~6 | source: FEATURES §3.1 | justification: editorial gem from FEATURES; vintage/design shopping audience converts on guided market tours and adjacent restaurant bookings | affiliate: Civitatis Jaffa market tours + Booking adjacent Jaffa boutique hotels
- **slug:** tel-aviv-sarona-market-food-hall | proxied composite: ~6 | source: PITFALLS §6.2 | justification: high-end indoor market with curated stalls; "where to eat in Tel Aviv" long-tail captures conversion-ready audience | affiliate: Viator food tours + Booking nearby Sarona accommodation
- **slug:** tel-aviv-pride-week-june | proxied composite: ~7 | source: FEATURES §3.1 | justification: largest Pride event in Middle East; well-defined annual cluster (early June); strong commercial intent (accommodation + tours) | affiliate: Booking June pride-week packages + Civitatis pride parade experiences

### Dead Sea (parent: dead-sea)

Already shipped 10 sub-dests. Long-tail focuses on **health-tourism niche** (Israeli specialty) and **multi-day pilgrimage routing**.

- **slug:** dead-sea-ein-bokek-medical-spa-cluster | proxied composite: ~7 | source: FEATURES §4.2 | justification: psoriasis/dermatology medical tourism is a distinct Israeli health-tourism niche; commercial intent for multi-night spa packages | affiliate: Booking Ein Bokek 4–5★ resorts (Isrotel, Leonardo Plaza, David)
- **slug:** dead-sea-masada-sunrise-tour | proxied composite: ~8 | source: FEATURES §4.2 | justification: hero attraction — sunrise-cable-car combo is the highest-converting Masada SKU; deserves dedicated long-tail page distinct from the canonical Masada sub-dest | affiliate: GetYourGuide / Viator Masada-sunrise day tours from Jerusalem and Tel Aviv
- **slug:** dead-sea-flotation-photography-tips | proxied composite: ~5 | source: PITFALLS §6.1 | justification: low-monetization but high-traffic informational long-tail; captures top-of-funnel visitors who then convert on package booking | affiliate: light Booking placement only; primarily informational/SEO
- **slug:** dead-sea-mud-and-mineral-beach-comparison | proxied composite: ~6 | source: CONTEXT.md cut | justification: cut from Phase 3 (10-sub-dest cap); decision-stage content — "Ein Bokek vs Mineral Beach vs Ein Gedi" is a clear long-tail search-intent | affiliate: Booking + DiscoverCars for self-drive beach-hopping itineraries
- **slug:** dead-sea-jordan-border-crossing-guide | proxied composite: ~5 | source: PITFALLS §6.3 | justification: cross-border traveler audience (Jordan-Israel combined trips); informational with affiliate transport upside | affiliate: SafetyWing travel insurance + DiscoverCars for border-friendly rentals

### Galilee (parent: galilee)

Already shipped 12 sub-dests. Long-tail focuses on **multi-stop Christian pilgrimage routing** and **active outdoor** clusters.

- **slug:** galilee-capernaum-to-tabgha-walking-pilgrimage | proxied composite: ~7 | source: FEATURES §3.3 | justification: well-defined pilgrimage walk (~4 km); high commercial intent for guided pilgrimage tours and adjacent kibbutz lodging | affiliate: Viator pilgrimage tours + Booking kibbutz accommodation (Nof Ginosar, Ein Gev)
- **slug:** galilee-tiberias-hot-springs-hamat-tiberias | proxied composite: ~6 | source: FEATURES §3.3 | justification: ancient hot-spring baths cluster; complements Tiberias canonical with a wellness-vertical long-tail | affiliate: Booking Tiberias spa hotels + Civitatis spring-day tickets
- **slug:** galilee-sea-of-galilee-kayaking | proxied composite: ~6 | source: PITFALLS §6.2 | justification: active-outdoor audience that the contemplative-pilgrimage cluster doesn't serve; clear summer-season conversion window | affiliate: GetYourGuide watersport rentals + DiscoverCars
- **slug:** galilee-jesus-trail-thru-hike | proxied composite: ~7 | source: FEATURES §3.3 | justification: 65 km waymarked trail Nazareth→Capernaum; serves a discrete thru-hike audience under-served by daily-tour content | affiliate: Booking trail-town accommodations + SafetyWing hiking insurance + GetYourGuide guided sections
- **slug:** galilee-yardenit-baptism-site-vs-qasr-el-yahud | proxied composite: ~6 | source: PITFALLS §3.1 | justification: decision-stage pilgrimage content; respectful comparison between the two main baptism sites is high-value | affiliate: Viator pilgrimage day tours including both sites

### Eilat (parent: eilat)

Already shipped 10 sub-dests. Long-tail focuses on **diving certification** and **cross-border** clusters.

- **slug:** eilat-red-sea-diving-certification-padi | proxied composite: ~7 | source: FEATURES §5.1 | justification: certification courses are 3–5 day stays with explicit accommodation + course bundling; high-value commercial intent | affiliate: GetYourGuide PADI courses + Booking Eilat dive-resort stays (Coral Beach area)
- **slug:** eilat-dolphin-reef-snorkeling | proxied composite: ~7 | source: FEATURES §5.1 | justification: iconic Eilat experience that visitors search by name; cut from Phase 3 cap; high-converting single-page intent | affiliate: GetYourGuide / Viator dolphin-reef tickets + Booking adjacent stays
- **slug:** eilat-to-petra-day-trip-via-taba | proxied composite: ~7 | source: PITFALLS §6.3 | justification: cross-border Petra day-trip is a major Eilat-stay justification; well-defined audience needing border-logistics content | affiliate: Viator / GetYourGuide Petra-from-Eilat tours + SafetyWing
- **slug:** eilat-egypt-border-sinai-context | proxied composite: ~5 | source: PITFALLS §6.3 | justification: lower commercial intent but addresses common safety/logistics questions; supports informational-trust signal | affiliate: SafetyWing only; primarily content/trust
- **slug:** eilat-coral-beach-snorkeling-guide | proxied composite: ~6 | source: FEATURES §5.1 | justification: free public snorkeling alternative to the underwater observatory; serves budget audience that the canonical doesn't | affiliate: Booking budget Eilat stays + RentalCars

### Negev (parent: negev)

Already shipped 10 sub-dests. Long-tail focuses on **dark-sky tourism**, **wine route**, and **multi-day hiking**.

- **slug:** negev-mitzpe-ramon-dark-sky-reserve | proxied composite: ~7 | source: FEATURES §4.3 | justification: UNESCO 2017 dark-sky designation; astronomy-tourism niche with clear overnight-stay conversion (Beresheet, Ramon Inn) | affiliate: Booking Mitzpe Ramon astronomy-friendly lodges + GetYourGuide stargazing tours
- **slug:** negev-wine-route-carmey-avdat | proxied composite: ~6 | source: FEATURES §4.3 | justification: emerging Negev wine region; boutique-winery cluster around Sde Boker; food-and-wine audience under-served | affiliate: Civitatis wine tours + Booking boutique winery stays + DiscoverCars
- **slug:** negev-israel-national-trail-southern-section | proxied composite: ~6 | source: FEATURES §4.3 | justification: thru-hiker audience; multi-day desert section requires specific accommodation/transport planning | affiliate: Booking trail-adjacent zimmer stays + SafetyWing + DiscoverCars
- **slug:** negev-bedouin-hospitality-experience | proxied composite: ~6 | source: FEATURES §4.3 | justification: respectful cultural-tourism cluster; under-served editorially with mostly low-quality content available; opportunity for trust-building | affiliate: GetYourGuide Bedouin tent experiences + Booking adjacent stays
- **slug:** negev-makhtesh-ramon-hiking-trails | proxied composite: ~6 | source: FEATURES §4.3 | justification: complements canonical Mitzpe Ramon sub-dest with trail-specific content (specific routes, difficulty, season) | affiliate: GetYourGuide guided crater hikes + Booking + SafetyWing

### Nazareth (parent: nazareth)

Already shipped 8 sub-dests. Long-tail focuses on **archaeological adjacency** and **pilgrimage circuit extensions**.

- **slug:** nazareth-sepphoris-tzippori-archaeology | proxied composite: ~6 | source: FEATURES §3.4 | justification: Roman-Byzantine mosaic site 6 km from Nazareth; archaeology-tourism niche that complements the religious canonical | affiliate: Viator combined Nazareth+Sepphoris tours + Booking Nazareth stays
- **slug:** nazareth-cana-of-galilee-water-to-wine | proxied composite: ~6 | source: FEATURES §3.4 | justification: pilgrimage extension to nearby Kafr Kanna; clear commercial intent for combined-site tours | affiliate: Viator Nazareth+Cana pilgrimage day tours + Civitatis
- **slug:** nazareth-mt-precipice-views | proxied composite: ~5 | source: CONTEXT.md cut | justification: scenic-overlook cluster; lower commercial intent but valid editorial-completeness candidate | affiliate: light GetYourGuide placement
- **slug:** nazareth-arab-cuisine-old-city-food-tour | proxied composite: ~6 | source: PITFALLS §6.2 | justification: Arab-Israeli food cluster; under-served editorially with respectful framing; Old City food tours convert well | affiliate: GetYourGuide / Civitatis Nazareth food tours + Booking
- **slug:** nazareth-christian-pilgrimage-3-day-itinerary | proxied composite: ~6 | source: FEATURES §3.4 | justification: multi-day pilgrimage routing combining Nazareth + Galilee sites; itinerary-style long-tail | affiliate: Booking multi-night stays + Viator pilgrimage packages

### Haifa (parent: haifa)

Already shipped 10 sub-dests. Long-tail focuses on **active outdoor** and **respectful Druze cultural** clusters (Bahá'í already deeply covered in canonical+sub-dest set).

- **slug:** haifa-bahai-terrace-tour-booking | proxied composite: ~6 | source: FEATURES §3.5 | justification: tour-booking-specific content distinct from the architectural canonical; addresses operational questions (free tours, schedule, dress code) | affiliate: trust-content only; no commercial affiliate (per Bahá'í policy in data/haifa-bahai-policy.md)
- **slug:** haifa-mount-carmel-hiking-trails | proxied composite: ~6 | source: FEATURES §3.5 | justification: nature-tourism cluster; complements urban canonical with active-outdoor vertical | affiliate: GetYourGuide guided Carmel hikes + Booking
- **slug:** haifa-daliyat-al-karmel-druze-cuisine | proxied composite: ~7 | source: PITFALLS §6.2 | justification: Druze food and hospitality is a distinct cultural-tourism cluster; respectful framing opportunity; under-served editorially | affiliate: Civitatis Druze village food tours + Booking
- **slug:** haifa-german-colony-architecture-walk | proxied composite: ~6 | source: FEATURES §3.5 | justification: Templer-era architecture cluster; complements Bahá'í terraces with secular-history vertical | affiliate: GetYourGuide architecture walks + Booking German Colony boutique hotels
- **slug:** haifa-stella-maris-monastery-pilgrimage | proxied composite: ~5 | source: FEATURES §3.5 | justification: Carmelite pilgrimage site; lower commercial intent but completes the religious-coverage map for Haifa | affiliate: Viator pilgrimage tours

### Golan Heights (parent: golan)

Already shipped 10 sub-dests. Long-tail focuses on **active outdoor** (Hermon ski, hiking) and **Druze cuisine** clusters with `administrativeStatus: 'golan-heights'` framing.

- **slug:** golan-banias-nature-reserve-hiking-trails | proxied composite: ~6 | source: FEATURES §3.6 | justification: waterfall+Roman ruins cluster; complements canonical with trail-specific content | affiliate: GetYourGuide guided Banias hikes + DiscoverCars (region requires self-drive)
- **slug:** golan-druze-cuisine-majdal-shams | proxied composite: ~6 | source: PITFALLS §6.2 | justification: Druze culinary cluster in the northern Golan; respectful cultural-tourism content with clear food-tour conversion | affiliate: Civitatis Druze village tours + Booking Mt Hermon area lodges
- **slug:** golan-mt-hermon-ski-season-guide | proxied composite: ~7 | source: FEATURES §3.6 | justification: Israel's only ski mountain; tight winter season (Dec–Mar) but high commercial intent for combined ski+lodging packages | affiliate: Booking Mt Hermon area resorts + DiscoverCars + SafetyWing
- **slug:** golan-winery-tours-northern-region | proxied composite: ~6 | source: FEATURES §3.6 | justification: Golan boutique wineries (Bahat, Pelter, Bazelet HaGolan) form a regional wine route; food-and-wine audience | affiliate: Civitatis winery tours + Booking + DiscoverCars
- **slug:** golan-nimrod-fortress-crusader-history | proxied composite: ~5 | source: CONTEXT.md cut | justification: Crusader-era fortress; complements the natural-attractions cluster with medieval history vertical | affiliate: light GetYourGuide placement + DiscoverCars

### Caesarea (parent: caesarea)

Already shipped 8 sub-dests. Long-tail focuses on **underwater archaeology** (Israel-distinctive) and **event** clusters.

- **slug:** caesarea-maritima-underwater-diving | proxied composite: ~7 | source: FEATURES §3.7 | justification: Caesarea Maritima underwater archaeology park — Israel-distinctive dive site (Roman ruins underwater); clear commercial intent for certified divers | affiliate: GetYourGuide underwater archaeology dives + Booking Caesarea boutique stays
- **slug:** caesarea-amphitheater-summer-concerts | proxied composite: ~6 | source: FEATURES §3.7 | justification: Roman amphitheater hosts annual summer concert series; ticketed-event audience with clear seasonal window | affiliate: Booking concert-week stays + Viator pre-concert dinner-tours
- **slug:** caesarea-crusader-fortress-reenactment | proxied composite: ~5 | source: PITFALLS §6.1 | justification: scheduled medieval reenactment events; family-tourism cluster with seasonal cadence | affiliate: GetYourGuide family tickets + Booking
- **slug:** caesarea-roman-aqueduct-photography | proxied composite: ~5 | source: FEATURES §3.7 | justification: photography-tourism niche; lower commercial intent but high-traffic informational | affiliate: light Booking placement only
- **slug:** caesarea-port-and-ralli-museum-combined | proxied composite: ~5 | source: CONTEXT.md cut | justification: Latin American art museum + Crusader port combined-ticket cluster; under-served editorially | affiliate: Civitatis combined-site tours

### Akko / Acre (parent: akko)

Already shipped 10 sub-dests. Long-tail focuses on **annual cultural events** and **combined-ticket** clusters.

- **slug:** akko-old-city-rooftop-tours | proxied composite: ~6 | source: FEATURES §3.8 | justification: rooftop-perspective tour cluster on the UNESCO Old City; distinct experiential niche | affiliate: Civitatis Akko rooftop tours + Booking Old City boutique stays (Efendi, Akkotel)
- **slug:** akko-festival-alternative-israeli-theater | proxied composite: ~6 | source: PITFALLS §6.1 | justification: annual Sukkot-week alternative theater festival; event-tourism cluster with tight booking window | affiliate: Booking festival-week stays + Viator festival-themed walking tours
- **slug:** akko-templar-tunnel-hospitaller-combined | proxied composite: ~6 | source: FEATURES §3.8 | justification: combined-ticket Crusader-history cluster; complements individual sub-dest pages with itinerary-style routing | affiliate: GetYourGuide combined-ticket tours + Civitatis
- **slug:** akko-turkish-bath-hammam-al-basha | proxied composite: ~5 | source: FEATURES §3.8 | justification: Ottoman-era hammam museum; complements the UNESCO Old City cluster with Ottoman-period vertical | affiliate: Civitatis Ottoman Akko tours + Booking
- **slug:** akko-fishing-port-seafood | proxied composite: ~6 | source: PITFALLS §6.2 | justification: seafood food-tourism cluster around the active fishing port; complements the religious/historical canonical with culinary vertical | affiliate: GetYourGuide / Civitatis Akko food tours + Booking

### Bethlehem (parent: west-bank/bethlehem)

**Long-tail intentionally deferred to v2 per CONTEXT.md.** Bethlehem ships as canonical-only in v1 (no sub-destinations). Long-tail candidates (Shepherd's Field, Aida camp, Bethlehem food culture) all carry editorial sensitivity beyond v1's mitigation budget. Listed below for future v2 reactivation only — **DO NOT** include in any R3-driven `/gsd:plan-phase 4 --gaps` for v1.

- **slug:** west-bank-bethlehem-shepherds-field | proxied composite: ~5 | source: PITFALLS §3.2 | justification: pilgrimage site adjacent to Bethlehem canonical; defer to v2 alongside broader West Bank coverage decision | affiliate: defer
- **slug:** west-bank-bethlehem-manger-square-christmas | proxied composite: ~6 | source: PITFALLS §3.2 | justification: Christmas-Eve event-tourism cluster; defer to v2 — operational sensitivity around checkpoint access during peak season | affiliate: defer

---

## When R3 Data Lands

See `data/long-tail-trigger.md` for the operational handoff:

1. Purchase decision (DataForSEO API **$50** one-shot OR Ahrefs Lite **$129/month** for quarterly cadence)
2. Land measured volumes in `data/keyword-data.json`
3. Run `/gsd:plan-phase 4 --gaps` against this backlog — that command reads measured volumes, re-ranks candidates by `(volume × difficulty⁻¹)`, and writes real per-region Phase 4 plans
4. Per Phase 4 success criteria #1, pick top N per region where `N = ⌈existing_sub_dest_count × 0.5⌉` — so Tel Aviv (14 shipped) → ~7 long-tail, Galilee (12) → ~6, etc.

**Until then, this backlog is observational only.** No MDX authoring against these slugs.

---

## Backlog Summary

| Region              | Candidates | Avg Proxied Composite | Notes                                            |
| ------------------- | ---------- | --------------------- | ------------------------------------------------ |
| tel-aviv            | 5          | ~6.4                  | Niche/event focus                                |
| dead-sea            | 5          | ~6.2                  | Health-tourism + pilgrimage routing              |
| galilee             | 5          | ~6.4                  | Pilgrimage routing + active outdoor              |
| eilat               | 5          | ~6.4                  | Diving + cross-border (Petra/Sinai)              |
| negev               | 5          | ~6.2                  | Dark-sky + wine route + thru-hike                |
| nazareth            | 5          | ~5.8                  | Archaeology + pilgrimage extensions              |
| haifa               | 5          | ~6.0                  | Active outdoor + Druze cultural                  |
| golan               | 5          | ~6.0                  | Ski + Druze cuisine + wine                       |
| caesarea            | 5          | ~5.6                  | Underwater archaeology + events                  |
| akko                | 5          | ~5.8                  | Events + combined-ticket + culinary              |
| west-bank/bethlehem | 2 (v2)     | ~5.5                  | DEFERRED TO v2 — sensitivity beyond v1 budget    |
| **TOTAL**           | **52**     | **~6.1**              | 50 v1-eligible + 2 v2-deferred Bethlehem entries |

---

_Last reviewed: 2026-05-11 — Phase 4 Plan 01 (minimal deferral close). Reactivation requires R3 keyword purchase per `data/long-tail-trigger.md`._
