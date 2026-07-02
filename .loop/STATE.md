# LOOP STATE

- iteration: 233
- lastMode: BUILD (tools→seo-content fallthrough)
- lastItem: israel-with-teenagers
- lastResult: COMPLETE — /israel-with-teenagers shipped; 413 pages; 521/521 e2e+a11y pass; commit 68c82cf
- nextRotationCategory: 234%5==4 → REVIEW
- higgsfieldSpent: 0
- updatedAt: 2026-07-02
- branch context: work on master; feature work on auto/<slug>

Notes: iter 233 BUILD (tools→seo-content fallthrough) — israel-with-teenagers shipped:
  - New guide: /israel-with-teenagers — teen-specific Israel travel (ages 13–18), distinct from
    israel-with-kids (ages 2–12). Covers: Masada Snake Path sunrise challenge; Dead Sea float +
    mud ritual (salt brine eye-sting safety briefing); Tel Aviv surf lessons at Gordon Beach +
    HaPisgah Gardens skate park + Florentin street art; Judean Desert rappelling/canyoning (age 12+);
    water hiking in Nahal David + Nahal Arugot + Nahal Kziv; Sea of Galilee kayaking + Achziv NP;
    Nimrod Fortress in the Golan; Yad Vashem for teens (age 14+, emotional framing, pre-book required).
    Planning tips: let teens lead some decisions; balance sightseeing+unstructured time; 7-day
    sample itinerary.
  - HONESTY upheld: legal drinking age 18 clearly stated; Birthright 18–32 (not for teens);
    Masada summer heat danger prominently warned; Yad Vashem emotional weight flagged; no fabricated
    prices (ranges only).
  - Three affiliate CTAs: GYG surf lessons TLV + GYG Judean Desert rappelling + Booking.com family rooms.
  - Seven FAQs: Masada age/heat, safety for teens, Dead Sea, Yad Vashem, drinking age, Birthright, car.
  - Cross-link added to israel-with-kids.md (first paragraph of body, linking to /israel-with-teenagers).
  - Smoke test route added (+1 to ROUTES array; 521 total).
  - Gate: pnpm check 0 errors; build 413 pages (+1 vs 412); 521/521 e2e+a11y pass
  - Commit 68c82cf on master; pushed to origin; CI in_progress at state-write time

Notes: iter 232 BUILD (seo-content) — ein-gedi-guide shipped:
  - New guide: /ein-gedi-guide — standalone visitor guide for Ein Gedi Nature Reserve,
    Israel's most-visited nature reserve on the western Dead Sea shore.
    Covers Wadi David trail (3km loop to David's Waterfall, year-round spring-fed,
    2026 flood damage note: upper trail closed — check parks.org.il before visiting),
    Nahal Arugot gorge (6.6km return, advance booking required during peak periods),
    wildlife (Nubian ibex, rock hyrax, heron, kingfisher), Kibbutz Ein Gedi botanical
    garden (900+ species), practical transport (Bus 486 from Jerusalem ~90min, car via
    Route 90), opening hours, National Parks Pass coverage, seasonal guide, Dead Sea
    combination table (Kalia Beach 30min south, Ein Bokek 30min south), overnight at
    Kibbutz Ein Gedi Hotel angle.
  - Three affiliate CTAs: GYG Ein Gedi day tours + Abraham Tours Judean Desert +
    Booking.com Kibbutz Ein Gedi Hotel.
  - Seven FAQs: 2026 trail status, Wadi David vs Nahal Arugot, transport without car,
    parks pass, best time, Dead Sea combination, wildlife.
  - Cross-links added from dead-sea-guide.md (after Ein Gedi mention in transport section)
    and water-hiking-israel.md (after Wadi David practical tips).
  - Smoke test route added (+1 to ROUTES array; 520 total).
  - Gate: pnpm check 0 errors; build 412 pages (+1 vs 411); 520/520 e2e+a11y pass
  - Commit 9afd319 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 231 BUILD (monetization) — eilat-travel-guide shipped:
  - New guide: /eilat-travel-guide — practical Eilat city guide for first-time visitors.
    Covers North Beach promenade vs Coral Beach Nature Reserve (snorkel distinction),
    Dolphin Reef with honest semi-wild expectations framing (encounters not guaranteed),
    Underwater Observatory Marine Park (800+ species; rain-free alternative), Timna Park
    (25km north; seasonal heat warning for summer; King Solomon's Pillars + Mushroom Rock
    + copper mines; car required or guided jeep tour), tax-free shopping zone (17% VAT
    exempt; Ahava/cosmetics/alcohol angle), getting there (fly 50min vs drive 4-5hrs via
    Route 90 Dead Sea road or Route 40 Negev highlands), trip-length planning table
    (1-day/2-day/3-day/weekend templates), hotel tier overview (North Beach strip for
    first-timers; budget options behind strip). Day trips: Petra (long but feasible),
    Wadi Rum, Negev self-drive.
  - Three affiliate CTAs: Booking.com Eilat hotels + GYG activities (Red Sea/Timna) +
    Viator (Dolphin Reef/Timna).
  - Cross-link added to eilat.md region page (after existing tours-compared link).
  - Smoke test route added (+1 to ROUTES array; 519 total).
  - Gate: pnpm check 0 errors; build 411 pages (+1 vs 410); 519/519 e2e+a11y pass
  - Commit 92b8239 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 230 RESEARCH — 6 new backlog items: new tourist segments + niche destination gaps:
  - /ein-gedi-guide (P2, S): standalone visitor guide for Israel's most-visited nature reserve; 2026 flood damage note (Wadi David upper trail); water-hiking-israel.md covered it in 200 words only; competitors deadsea.com, hike-israel.com, touristisrael.com all have full guides
  - /israel-for-gulf-travelers (P2, M): Abraham Accords (UAE/Bahrain/Morocco) new tourist segment; practical halal food + mosque + ETA-IL + direct flight logistics; no competitor has comprehensive editorial guide for this segment; high-spend audience
  - /israel-monasteries-guide (P2, M): Judean Wilderness monastery circuit (St George/Wadi Qelt, Mar Saba, Latrun winery, Abu Gosh Benedictine); distinct from galilee-christian-sites-circuit (SHIPPED) and christian-pilgrimage-holy-land; HONESTY: Mar Saba women excluded from interior; Area C access context
  - /akko-food-guide (P3, S): Uri Buri + Al-Marsa + souk + Hummus Sa'id; parallel to jaffa-food-guide + mahane-yehuda-market-guide format; akko-acre-guide.md is history-only
  - /ramla-lod-guide (P3, S): Pool of St Helena underground boat ride, White Tower, Lod Mosaic (ex-Louvre/Met), Church of St George/Al-Omari Mosque co-existence site; ZERO prior coverage; "hidden gems near TLV" angle
  - /india-to-israel-guide (P3, M): El Al TLV-Mumbai 2024 launch; ETA-IL for Indian passport; vegetarian-friendliness; Bene Israel Jewish diaspora; Indian Christian pilgrims; ZERO prior backlog entry

Notes: iter 229 REVIEW — meta title/desc audit of iter226-228 guides:
  - Audited 3 guides: 1-day-tel-aviv-itinerary, tel-aviv-things-to-do, layover-jerusalem
  - 1-day-tel-aviv-itinerary: title 57 OK, desc 160 OK, hero OK, links 17/17 OK, H1 clean, smoke ✓
  - tel-aviv-things-to-do: title 63 OK, desc 163 OVER → trimmed to 154 ✓, hero OK, links 14/14 OK, H1 clean, smoke ✓
  - layover-jerusalem: title 59 OK, desc 197 OVER → trimmed to 148 ✓, hero OK, links all verified (apparent "missing" were valid dynamic routes: /jerusalem/western-wall, /jerusalem/holy-sepulchre, /where-to-stay/jerusalem, /tel-aviv all resolve via [region], [attraction], [city] dynamic pages), H1 clean, smoke ✓
  - Gate: pnpm check 0 errors; build 410 pages (unchanged); 518/518 e2e+a11y pass
  - Commit ab5c16e on master; pushed to origin; CI state=unknown at journal-write time

Notes: iter 228 BUILD (tools → seo-content fallthrough) — layover-jerusalem shipped:
  - New guide: /layover-jerusalem — Jerusalem layover guide for travellers with long Ben Gurion
    connections. Honest transit math: train is 50 min total each way (28 min train + platform
    egress); 3h security buffer on return; yields ~80 min city time on 6h layover, ~3.5h on 8h,
    ~5h on 10h. Timed walking circuits for each window: 6h (Western Wall only), 8h (Wall +
    Holy Sepulchre), 10h (full Old City circuit — Jewish/Armenian/Christian/Muslim quarters),
    24h (full Jerusalem + Yad Vashem + City of David options). Shabbat transport logistics (no
    trains, taxi ₪250–350 each way). Cross-links to layover-tel-aviv (reciprocal link added),
    1-day-jerusalem-itinerary, ben-gurion-airport-guide, western-wall-tunnels-guide.
  - Three affiliate CTAs: GYG layover tours + WelcomePickups transfer + Booking.com Jerusalem hotels.
  - Six FAQs covering minimum length, transit time, visa, Shabbat, minimum feasible layover, safety.
  - Smoke test route added (+1 to ROUTES array, 518 total).
  - Gate: pnpm check 0 errors; build 410 pages (+1 vs 409); 518/518 e2e+a11y pass
  - Commit 34df41e on master; pushed to origin; CI in_progress at state-write time

Notes: iter 227 BUILD (seo-content) — tel-aviv-things-to-do shipped:
  - New guide: /tel-aviv-things-to-do — complete Tel Aviv activity and attractions hub targeting
    head term "things to do in Tel Aviv". Covers: Old Jaffa (port, flea market, eating), beaches
    (Gordon, Hilton, Metzitzim, Alma, tayelet promenade), White City / Bauhaus UNESCO district
    (self-guided route Rothschild → Dizengoff Square), neighbourhoods (Neve Tzedek, Florentin,
    Dizengoff), food & markets (Carmel Market, Levinsky, Sarona), culture & museums (Museum of
    Art, Eretz Israel Museum, Independence Hall, Palmach Museum), nightlife (Florentin, Port,
    Rothschild bar strip), day trips (Jerusalem, Dead Sea, Caesarea, Haifa), getting around
    (Light Rail, scooters, bikes). Dense internal links to all existing TLV sub-guides.
  - Affiliate CTAs: GYG free walking tour + Viator city highlights + Booking.com TLV hotels.
  - Six FAQs covering free things, days needed, best beach, walkability, White City, timing, families.
  - Smoke test route added (+1 to ROUTES array, 517 total).
  - Gate: pnpm check 0 errors; build 409 pages (+1 vs 408); 517/517 e2e+a11y pass
  - Commit 062f3b6 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 226 BUILD (monetization) — 1-day-tel-aviv-itinerary shipped:
  - New guide: /1-day-tel-aviv-itinerary — morning-to-evening tested itinerary for first-timers
    covering Old Jaffa port (7:30am), seafront promenade walk (9:30am), Carmel Market lunch
    (11:30am), White City Bauhaus walk (1:30pm), beach/museum option (4pm), Neve Tzedek or
    Florentin dinner (7pm). Mirrors 1-day-jerusalem-itinerary.md format with time-stamped
    sections and practical transport notes.
  - Three affiliate CTAs: GYG Old Jaffa walking tour, Viator TLV city highlights, Booking.com
    TLV central hotels. Six FAQs. At-a-glance table. Cross-link added to 1-day-jerusalem-itinerary.
  - One broken internal link caught and fixed: /ashdod-cruise-port-excursions → not yet built;
    replaced with /cruise-shore-excursions-israel which covers both ports.
  - Smoke test route added (+1 to ROUTES array).
  - Gate: pnpm check 0 errors; build 408 pages (+1 vs 407); 516/516 e2e+a11y pass
  - Commit 9b5fd01 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 225 RESEARCH — 6 new items: tel-aviv-things-to-do, israel-with-teenagers, ashdod-cruise-port-excursions, 1-day-tel-aviv-itinerary, layover-jerusalem, israel-music-guide

Notes: iter 224 REVIEW — meta title/desc audit of iter221-223 guides:
  - Audited 3 guides: galilee-christian-sites-circuit, israel-eta-guide, haifa-neighborhoods-guide
  - galilee-christian-sites-circuit: title 63 chars OK, desc 142 chars OK — clean
  - israel-eta-guide: title 81 chars (OVER 65) → trimmed to 61; desc 166 chars (OVER 160) → trimmed to 131
  - haifa-neighborhoods-guide: desc 196 chars (OVER 160) → trimmed to 152
  - All hero images verified (4/4 exist); all internal links verified (12/12 OK); no H1 violations; smoke tests present (3/3)
  - Gate: pnpm check 0 errors; build 407 pages (unchanged); 515/515 e2e+a11y pass
  - Commit c76082d on master; pushed to origin; CI in_progress at state-write time

Notes: iter 223 BUILD (tools → seo-content fallthrough) — haifa-neighborhoods-guide shipped:
  - New guide: /haifa-neighborhoods-guide — Haifa neighborhoods & where-to-stay guide. 6 neighborhood
    sections (German Colony, Wadi Nisnas, Hadar HaCarmel, Merkaz HaCarmel, Bat Galim, Old City/Port)
    each with character, eat, stay-here-if and key streets. Navigation table showing neighborhood →
    Bahá'í Gardens transit time. Carmelit logistics (₪7, Shabbat operation, 6 stations). Holiday of
    Holidays (Wadi Nisnas December festival) noted accurately per HONESTY rules. Cross-link added to
    haifa-travel-guide Planning section. Booking.com + GYG CTAs. Smoke test route +1 (514→515).
  - Tools rotation had nothing ready (all 11 tools shipped in prior iterations) → fell through to seo-content.
  - Gate: pnpm check 0 errors; build 407 pages (+1 vs 406); 515/515 e2e+a11y pass
  - Commit b60e624 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 222 BUILD (seo-content) — israel-eta-guide shipped:
  - New guide: /israel-eta-guide — Israel ETA-IL Electronic Travel Authorization step-by-step
  - Gate: pnpm check 0 errors; build 406 pages (+1 vs 405); 514/514 e2e+a11y pass
  - Commit c4cc58e on master; pushed to origin

Notes: iter 221 BUILD (monetization) — galilee-christian-sites-circuit shipped:
  - New guide: /galilee-christian-sites-circuit — Galilee Christian sites self-drive circuit
  - Gate: pnpm check 0 errors; build 405 pages (+1); 513/513 e2e+a11y pass
  - Commit 5fd40d4 on master; pushed to origin

Notes: iter 220 RESEARCH — 6 net-new backlog items:
  iter220: /israel-eta-guide (P2 S) — SHIPPED iter222
  iter220: /haifa-neighborhoods-guide (P2 S) — SHIPPED iter223
  iter220: /israel-by-month (P2 M), /israel-in-summer (P2 S), /temple-mount-visitor-guide (P2 M)
  iter220: /galilee-christian-heritage (P2 S+monetization) — SHIPPED iter221

Active items from recent research (all in BACKLOG, ready):
  iter200: /tel-aviv-street-art [P3 S]
  iter205: /israel-in-winter [P2 M], /hanukkah-in-israel [P3 S], /mount-carmel-hiking-guide [P3 S], /shavuot-in-israel [P3 S]
  iter210: /pet-friendly-israel [P2 M], /israel-with-baby [P2 S], /israel-by-train [P3 S]
  iter215: /easter-in-jerusalem [P2 M], /east-jerusalem-guide [P2 M], /beit-guvrin-caves-guide [P2 S], /galilee-food-guide [P3 S]
  iter220: /israel-by-month [P2 M], /israel-in-summer [P2 S], /temple-mount-visitor-guide [P2 M]
  iter225: /israel-with-teenagers [P2 S], /ashdod-cruise-port-excursions [P2 S], /israel-music-guide [P3 M]
  iter190: /mount-tabor-guide [P2 S]
  iter230: /israel-for-gulf-travelers [P2 M], /israel-monasteries-guide [P2 M], /akko-food-guide [P3 S], /ramla-lod-guide [P3 S], /india-to-israel-guide [P3 M]

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 30 review passes + 3 technical (event-schema + meta-trim + locale-links) + 23 EN guides + 3 tools-monetization + 5 accuracy-fix + VAT-refund + israel-museum + golan-heights + review(204-title-fix) + research(205-6-items) + traveling-israel-jewish-holidays(206) + western-wall-tunnels-guide(207) + tower-of-david-guide(208) + review/meta-desc-fix(209) + research(210-5-items) + israeli-breakfast-guide(211) + netanya-guide(212) + jericho-day-trip-from-jerusalem(213) + review/meta-desc-fix(214) + research(215-6-items) + jaffa-food-guide(216) + mahane-yehuda-market-guide(217);
herodion-guide(218) + review/meta-desc-fix(219) + research(220-6-items) + galilee-christian-sites-circuit(221) + israel-eta-guide(222) + haifa-neighborhoods-guide(223) + review/meta-desc-fix(224) + research(225-6-items) + 1-day-tel-aviv-itinerary(226) + tel-aviv-things-to-do(227) + layover-jerusalem(228) + review/meta-desc-fix(229);
research(230-6-items) + eilat-travel-guide(231) + ein-gedi-guide(232).
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230.
