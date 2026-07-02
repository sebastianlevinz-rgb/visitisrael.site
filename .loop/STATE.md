# LOOP STATE

- iteration: 237
- lastMode: BUILD (tools→seo-content fallthrough)
- lastItem: israel-in-summer
- lastResult: COMPLETE — new guide /israel-in-summer (5ee2ab3); 415 pages; 523/523 tests pass
- nextRotationCategory: 238%5==3 → BUILD (technical→seo-content fallthrough likely)
- higgsfieldSpent: 0
- updatedAt: 2026-07-02
- branch context: work on master; feature work on auto/<slug>

Notes: iter 237 BUILD (tools→seo-content fallthrough) — israel-in-summer shipped:
  - New guide: /israel-in-summer — summer heat strategy guide for visitors who must
    travel in July–August. Heat geography map (coast 28–32°C, Jerusalem dry heat,
    Dead Sea 40–45°C, Negev 38–44°C trail closures, Galilee north 28–34°C);
    early-morning-first strategy (Masada by 3:30am, Western Wall pre-10am, Old City
    markets); midday refuge options (Mahane Yehuda, Carmel Market covered, Israel
    Museum, Tel Aviv Museum of Art, Sarona Market food hall); Dead Sea dawn-only
    window (viable 5–9am only, Kalia Beach from 8am, combine with Masada sunrise);
    Tel Aviv as summer home base (beach morning, Old Jaffa afternoon, Florentin
    evening, Carmel Market Thursday evening bar scene); Sea of Galilee and Upper
    Galilee summer circuit (kayaking, Jordan River float, Achziv NP, Rosh Hanikra);
    Jerusalem heat management (Temple Mount strictly pre-10am, Yad Vashem midday
    indoor, Israel Museum midday, Tower of David early-morning ramparts); Eilat Red
    Sea water activities (snorkelling Coral Beach, diving, Underwater Observatory);
    practical heat management (water 1.5L/person minimum, 50+ SPF, clothing, Shabbat
    summer timing); 7-day summer itinerary table.
  - HONESTY upheld: Masada path closure dates linked to INPA (not hardcoded); Dead Sea
    temperatures are ranges not exact; restaurant/beach details framed as current state
    with 'check before visiting'; Negev hiking clearly warned against in summer.
  - Three affiliate CTAs: GYG Tel Aviv tours + GYG Masada sunrise + Booking.com Israel.
  - Seven FAQs: Israel summer heat, coolest city, Masada, Tel Aviv beach, Dead Sea
    summer timing, Negev hiking, Tel Aviv evenings.
  - Cross-link added from best-time-to-visit-israel.md summer section → /israel-in-summer.
  - Smoke test route added (+1 to ROUTES array; 523 total).
  - Gate: pnpm check 0 errors; build 415 pages (+1 vs 414); 523/523 e2e+a11y pass
  - Commit 5ee2ab3 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 236 BUILD (seo-content fallthrough from monetization) — israel-craft-beer shipped:
  New guide /israel-craft-beer (a6d5558); 414 pages; 522/522 tests pass

Notes: iter 235 RESEARCH — 6 new backlog items: 2026-specific new attractions + niche events:
  - /skyfield-extreme-park-jaffa (P2, S, seo-content+monetization): Israel's first fully accessible
    extreme park on Bloomfield Stadium roof; Via Ferrata, 35m bungee, giant swing; opened 2025/2026;
    GYG bookable; accessible angle for all abilities; zero prior coverage.
  - /schottenstein-campus-jerusalem (P2, S, seo-content): New IAA national archaeology campus (Moshe
    Safdie design); 2M artifacts + 15,000 Dead Sea Scroll fragments; major 2026 Jerusalem attraction;
    distinct from Israel Museum Dead Sea Scrolls wing; HONESTY: opening schedule per official IAA.
  - /midburn-festival-israel (P3, S, seo-content): Israel's Burning Man regional event in the Negev;
    10,000+ participants; second-largest globally after Africa Burns; late November annual; camping-
    required logistics; art cars, fire performances, themed camps. Zero prior backlog coverage.
  - /tlvfest-guide (P3, S, seo-content): TLVFest — Tel Aviv International LGBTQ Film Festival
    Oct 22-31 2026; Tel Aviv Cinematheque; distinct from Gay Pride parade + lgbtq-travel guide;
    films, panels, parties; no prior entry despite lgbtq-travel guide being SHIPPED.
  - /indnegev-festival (P3, S, seo-content): InDNegev — Israel's largest indie music festival;
    Oct 15-17 2026; Kibbutz Gvulot western Negev; 100+ acts, camping, eco-focus; competitor
    carnifest.com + haaretz.com coverage; zero prior backlog entry.
  - /israel-festival-jerusalem-guide (P3, S, seo-content): The Israel Festival — performing arts
    est. 1961; July 16–Aug 1 2026; Sultan's Pool amphitheatre + Jerusalem Theatre; international
    artists; our-site has zero coverage of Jerusalem's premier annual arts event.
  De-duped (already in backlog or SHIPPED): maccabiah-games-2026 (iter120), israel-music-festivals
    (iter110), jerusalem-festival-of-light (iter100), startup-tech-tourism (iter160), cooking-classes
    (SHIPPED), digital-nomad (iter30), eco-tourism (iter70), druze-villages (iter165).

Notes: iter 233 BUILD (tools→seo-content fallthrough) — israel-with-teenagers shipped:
  New guide /israel-with-teenagers (68c82cf); 413 pages; 521/521 tests pass

Notes: iter 232 BUILD (seo-content) — ein-gedi-guide shipped:
  New guide /ein-gedi-guide (9afd319); 412 pages; 520/520 tests pass

Notes: iter 231 BUILD (monetization) — eilat-travel-guide shipped:
  New guide /eilat-travel-guide (92b8239); 411 pages; 519/519 tests pass

Notes: iter 230 RESEARCH — 6 new backlog items: new tourist segments + niche destination gaps:
  - /ein-gedi-guide (P2, S): standalone visitor guide for Israel's most-visited nature reserve; 2026 flood damage note (Wadi David upper trail); water-hiking-israel.md covered it in 200 words only; competitors deadsea.com, hike-israel.com, touristisrael.com all have full guides
  - /israel-for-gulf-travelers (P2, M): Abraham Accords (UAE/Bahrain/Morocco) new tourist segment; practical halal food + mosque + ETA-IL + direct flight logistics; no competitor has comprehensive editorial guide for this segment; high-spend audience
  - /israel-monasteries-guide (P2, M): Judean Wilderness monastery circuit (St George/Wadi Qelt, Mar Saba, Latrun winery, Abu Gosh Benedictine); distinct from galilee-christian-sites-circuit (SHIPPED) and christian-pilgrimage-holy-land; HONESTY: Mar Saba women excluded from interior; Area C access context
  - /akko-food-guide (P3, S): Uri Buri + Al-Marsa + souk + Hummus Sa'id; parallel to jaffa-food-guide + mahane-yehuda-market-guide format; akko-acre-guide.md is history-only
  - /ramla-lod-guide (P3, S): Pool of St Helena underground boat ride, White Tower, Lod Mosaic (ex-Louvre/Met), Church of St George/Al-Omari Mosque co-existence site; ZERO prior coverage; "hidden gems near TLV" angle
  - /india-to-israel-guide (P3, M): El Al TLV-Mumbai 2024 launch; ETA-IL for Indian passport; vegetarian-friendliness; Bene Israel Jewish diaspora; Indian Christian pilgrims; ZERO prior backlog entry

Active items from recent research (all in BACKLOG, ready):
  iter200: /tel-aviv-street-art [P3 S]
  iter205: /israel-in-winter [P2 M], /hanukkah-in-israel [P3 S], /mount-carmel-hiking-guide [P3 S], /shavuot-in-israel [P3 S]
  iter210: /pet-friendly-israel [P2 M], /israel-with-baby [P2 S], /israel-by-train [P3 S]
  iter215: /easter-in-jerusalem [P2 M], /east-jerusalem-guide [P2 M], /beit-guvrin-caves-guide [P2 S], /galilee-food-guide [P3 S]
  iter220: /israel-by-month [P2 M], /temple-mount-visitor-guide [P2 M]
  iter225: /ashdod-cruise-port-excursions [P2 S], /israel-music-guide [P3 M]
  iter190: /mount-tabor-guide [P2 S]
  iter230: /israel-for-gulf-travelers [P2 M], /israel-monasteries-guide [P2 M], /akko-food-guide [P3 S], /ramla-lod-guide [P3 S], /india-to-israel-guide [P3 M]
  iter235: /skyfield-extreme-park-jaffa [P2 S], /schottenstein-campus-jerusalem [P2 S], /midburn-festival-israel [P3 S], /tlvfest-guide [P3 S], /indnegev-festival [P3 S], /israel-festival-jerusalem-guide [P3 S]

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 30 review passes + 3 technical (event-schema + meta-trim + locale-links) + 23 EN guides + 3 tools-monetization + 5 accuracy-fix + VAT-refund + israel-museum + golan-heights + review(204-title-fix) + research(205-6-items) + traveling-israel-jewish-holidays(206) + western-wall-tunnels-guide(207) + tower-of-david-guide(208) + review/meta-desc-fix(209) + research(210-5-items) + israeli-breakfast-guide(211) + netanya-guide(212) + jericho-day-trip-from-jerusalem(213) + review/meta-desc-fix(214) + research(215-6-items) + jaffa-food-guide(216) + mahane-yehuda-market-guide(217);
herodion-guide(218) + review/meta-desc-fix(219) + research(220-6-items) + galilee-christian-sites-circuit(221) + israel-eta-guide(222) + haifa-neighborhoods-guide(223) + review/meta-desc-fix(224) + research(225-6-items) + 1-day-tel-aviv-itinerary(226) + tel-aviv-things-to-do(227) + layover-jerusalem(228) + review/meta-desc-fix(229);
research(230-6-items) + eilat-travel-guide(231) + ein-gedi-guide(232) + israel-with-teenagers(233) + review/meta-desc-fix(234) + research(235-6-items) + israel-craft-beer(236) + israel-in-summer(237).
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235.
