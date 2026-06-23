# BACKLOG (prioritized; loop pulls top ready item by rotating category)

Format: `- [P1] (category, effort S/M/L) Title — why valuable — impl sketch — status`
Priorities P0 (highest) → P3. Status: ready | blocked:<reason> | in-progress.

## i18n epic (fr + de) — USER PRIORITY, phased; see .loop/I18N-PLAN.md
Interleave one i18n phase roughly every other BUILD iteration (don't do only i18n). Each phase is a
bounded, gated BUILD item. Full architecture + honesty rules + progress tracker live in I18N-PLAN.md.
- [x] Phase 0 — i18n infrastructure + localized home. DONE iter12 (5b80c35). Sitemap-hreflang deferred to Phase 6.
- [x] Phase 1a — Header chrome localized (fr/de). DONE iter15 (83379f9).
- [x] Phase 1b — Footer chrome localized (fr/de). DONE iter17 (360ded7).
- [x] Phase 1c — mobile-menu nav labels localized (fr/de); all shared chrome done. DONE iter22 (2a3868d). (/plan-your-trip + 404 BODY copy moved into Phase 2 — need /fr//de/ route variants.)
- [P1] (i18n, L) Phase 2 — guides ×39 in fr+de, batches of ~4–6/iteration, highest-intent first (first-time, visa/ETA, best-time, transportation, cost-budget, tours, day-trips). status: ready
- [P2] (i18n, M) Phase 3 — regions ×11 in fr+de (2–3 batches). status: ready
- [P2] (i18n, L) Phase 4 — attractions ×63 in fr+de (batches of ~8–10). status: ready
- [P2] (i18n, M) Phase 5 — itineraries ×4 + tools-island UI strings; legal pages decision. status: ready
- [P2] (i18n, S) Phase 6 — QA sweep: sitemap hreflang, hreflang coverage, missing-translation fallbacks, per-locale sitemap, a11y + dead-link check across fr/de. status: ready

## monetization
- [SHIPPED iter32] Cruise port shore excursions guide → b50ad64
- [P2] (monetization, M) MORE per-hub tours-comparison pages (Masada tours compared, Petra options compared, Galilee tours) — extend the /jerusalem-tours-compared pattern; mind overlap with existing day-trip guides (enhance those with a table instead where overlap is high). status: ready
- [P2] (monetization, S) "Is the <X> tour worth it?" verdict boxes added to top attraction/day-trip pages — conversion + dwell time — reusable verdict component. status: ready
- [P2] (monetization, M) Attraction "tickets & how to visit / skip-the-line" blocks on top attraction pages (Masada cable car, Western Wall tunnels, Bahá'í Gardens, etc.) — capture ticket-booking intent on existing high-traffic pages — honest "how to get tickets" note (price RANGES only, link live booking) + Tiqets/GetYourGuide CTA. HONESTY: prices drift — no hard-coded exact prices. [iter10 research] status: ready
- [P2] (monetization, S) Deepen travel-insurance + car-rental pages with plan-tier/comparison tables (eSIM done iter26 781630a) — same pattern; honest ranges. status: ready

## seo-content
- [P1] (seo-content, M) Jewish heritage travel guide — PRIMARY AUDIENCE GAP: Jewish diaspora is Israel's #1 inbound segment; we have christian-pilgrimage but zero Jewish heritage guide; Tourist Israel/Bein Harim/America Israel Tours all rank for this. Key sites: Yad Vashem (free, book ahead), ANU Diaspora Museum (TLV), Western Wall + Jewish Quarter, Safed (Kabbalah, Ha'Ari + Caro synagogues), Mount Herzl, Masada, Gamla. Monetization: Bein Harim/Abraham Tours/Viator Jewish heritage day tours + tour packages CTA. Dense cross-links to existing attractions/regions. FAQ + Article JSON-LD. HONESTY: Hebron excluded; Safed holy city — evergreen; no fabricated prices/ratings. [iter30 research] status: ready
- [P2] (seo-content, S) Layover in Tel Aviv guide — Tourist Israel has explicit layover page; we have airport-transfers (HOW to reach city) but not WHAT TO DO during layover; high-intent from transit passengers; format: 4h/6h/8–10h/24h+ options mapped to reachable attractions (Jaffa port at 6h+, beaches + Carmel market at 8h+); ETA-IL note for 24h+; dense links to existing airport-transfers/food/beaches/nightlife guides. HONESTY: transit requirements vary by nationality — link official PIBA portal; no universal rules. [iter30 research] status: ready
- [P2] (seo-content, M) Photography guide: best photo spots in Israel — Walk My World, locationscout, PhotoHound, sillysuitcase, israel21c all rank for "instagrammable Israel"; we have 63 attraction pages but no visual hub. Format: sunrise spots (Masada summit, Dead Sea shore, Eilat Red Sea), golden-hour/sunset spots (Mount of Olives over Old City, Caesarea Aqueduct, Jaffa port, TLV beach, Mitzpe Ramon crater), cultural compositions (Bahá'í Gardens terraces, Akko marina/Crusader city, Red Canyon narrows); timing notes + season (spring/autumn best); photography etiquette. Use existing /images/ assets; avoid fabricating accessibility of specific viewpoints; restrictedSiteAcknowledgment required for any Dome/Wall/Holy Sepulchre hero image. [iter30 research] status: ready
- [P2] (seo-content, M) Accessible travel in Israel guide — Tourist Israel, Access Israel, Atij specialist org all rank; underserved niche with strong word-of-mouth. Key facts: by law all public spaces must be accessible; city buses accessible (intercity NOT); ~900 licensed accessible taxis with ramps/lifts; Apollonia, Akko Crusader city, most major museums wheelchair-friendly; Jerusalem Old City mixed (cobblestones, no lifts on Ramparts Walk). Format: transport overview, top accessible sites by city, accommodation tips, useful orgs (Access Israel, Atij). HONESTY: verify site-specific claims; cite Access Israel/official sources; no fabricated accessibility ratings; frame as "increasing number of accessible options" not blanket accessibility guarantee. [iter30 research] status: ready
- [P1] (seo-content, L) City & short itineraries ("3 Days in Jerusalem", "2 Days in Tel Aviv", "3 Days in Israel", "1 Day in <city>") — heavily-ranked itinerary long-tail we lack (only have 5/7/10-day whole-country) — new day-by-day pages (itineraries collection or guides) w/ TouristTrip/Itinerary schema, dense links to attraction/region pages, cross-link the 5/7/10-day set. Start with 3-days-in-jerusalem + 2-days-in-tel-aviv + 3-days-in-israel. [iter10 research] status: ready
- [P2] (seo-content, M) "Things to know before visiting Israel" / mistakes-to-avoid tips hub — classic top-of-funnel listicle competitors rank (NextLevel/Walk My World/travelnotesandbeyond) — aggregate evergreen practical tips (dress code, don't overpack, Shabbat, Passover crowds, Temple Mount access times, rental-car West Bank restriction, tap water, ETA) with dense internal links + FAQ schema; complements (not duplicates) first-time-in-israel. [iter10 research] status: ready
- [P2] (seo-content, M) "Best beaches in Israel" guide (Tel Aviv: Banana/Gordon-Frishman/Hilton/Alma; Eilat Red Sea; Herzliya; Caesarea) — high-intent seasonal — beach roundup table (vibe, free/paid, facilities, swim safety) + internal links to regions. [iter5 research] status: ready
- [P3] (seo-content, S) Israel practical-info FAQ (Type H plug / 230V / adapters; tap water safe to drink; SIM/eSIM; currency) — cheap long-tail capture — add a "practical info" FAQ section/page with FAQPage schema; cross-link esim/transportation/tipping. [iter5 research] status: ready
- [P2] (seo-content, S) MORE transport routes (Eilat↔Petra, Jerusalem↔Nazareth/Galilee, BG airport↔Jerusalem/TLV, Haifa↔Akko) — extend the shipped /transport/[route] template with more ROUTES entries + footer/hub links + smoke routes. status: ready
- [P1] (seo-content, M) Neighborhood guides for Tel Aviv (Florentin already an attraction; add Neve Tzedek/Rothschild/Jaffa as where-to-stay+eat hubs) and Jerusalem quarters — internal-link depth. status: ready
- [P2] (seo-content, M) "Best time to visit <region>" + month-by-month weather/events pages — seasonal long-tail — BestTimeTable + climate ranges + festival calendar links. status: ready
- [P2] (seo-content, S) Expand FAQ schema coverage + add HowTo/TouristTrip schema where missing (itineraries → TouristTrip). status: ready
- [P3] (seo-content, M) Pilgrimage/Christian sub-routes, wine-region deep pages, hiking trail detail pages (build on existing hubs). status: ready
- [P3] (seo-content, M) Digital nomad in Israel guide — psimonmyway, nomadglory, terravan, nomads.com rank for this; 131 coworking spaces in TLV (WeWork/Mindspace ~₪1,000+/month); avg internet 200–500 Mbps (top-20 globally); no official digital-nomad visa (90-day tourist — legal gray area); Tel Aviv = world's 3rd most expensive city; integrate with existing transport/where-to-stay/food/cost-budget pages. HONESTY: visa gray area — frame factually, recommend official advice, no overstay encouragement. [iter30 research] status: ready
- [P3] (seo-content, M) "Solo travel in Israel" guide — net-new traveler segment (have with-kids + LGBTQ, not solo) — evergreen safety/social/logistics angle, hostels + sherut + meeting people + Shabbat-as-solo, dense internal links + FAQ schema. [iter20 research] status: ready
- [P3] (seo-content, M) "Israel honeymoon / romantic getaway" guide — net-new, commercial intent (luxury stays, couples experiences, Dead Sea spa, wine country) → affiliate — roundup + where-to-stay/private-tours cross-links; honest, no fabricated prices. [iter20 research] status: ready

## tools
- [P2] (tools, M) Month-by-month weather & "what to pack" widget by region — engagement — static climate data table + interactive month selector. status: ready
- [P3] (tools, M) Kosher / vegan restaurant finder (filterable list from curated data) — niche high-intent. status: ready

## technical
- [P3] (technical, S) Add `@axe-core` keyboard-nav + color-contrast checks to more routes; performance budget assertion. status: ready

## discovered (research mode appends here)
<!-- loop adds competitor-derived opportunities below -->
- iter30 (2026-06-23) added 6 items into category sections above (see [iter30 research] tags):
  seo-content=Jewish heritage guide (P1), photography spots (P2), accessible travel (P2), layover
  guide (P2), digital nomad (P3); monetization=cruise port excursions (P2). De-duped vs DONE+backlog.
  Full findings + sources in COMPETITORS.md.
- iter5 (2026-06-22) added 6 items into the category sections above (see [iter5 research] tags):
  monetization=Holy Land tours money page (P1); seo-content=ETA-IL coverage (P1), things-to-do hub
  (P1), beaches guide (P2), practical-info FAQ (P3); tools=how-many-days recommender (P2).
  Full findings + sources in COMPETITORS.md. [Holy Land tours + ETA-IL since SHIPPED.]
- iter10 (2026-06-22) added 3 curated items (see [iter10 research] tags): seo-content=city & short
  itineraries (P1), things-to-know/mistakes tips hub (P2); monetization=attraction ticket/skip-the-
  line blocks (P2). Backlog kept curated (already full). Findings + sources in COMPETITORS.md.
- iter20 (2026-06-23) added 2 net-new traveler-segment items (see [iter20 research]): seo-content=
  solo travel (P3) + honeymoon/romantic (P3). De-duped: budget/cost already covered by
  israel-cost-budget (NOT re-added). Backlog full → minimal add. Findings in COMPETITORS.md.
