# LOOP STATE

- iteration: 241
- lastMode: BUILD (monetization)
- lastItem: eilat-hotels-guide
- lastResult: COMPLETE — SHA 785ab1d; /eilat-hotels-guide live; 417 pages; 524/524 e2e+a11y pass
- nextRotationCategory: 242%5==2 → seo-content
- higgsfieldSpent: 0
- updatedAt: 2026-07-02
- branch context: work on master; feature work on auto/<slug>

Notes: iter 241 BUILD (monetization) — eilat-hotels-guide:
  New /eilat-hotels-guide companion to eilat-travel-guide.md (iter231). Covers Eilat's
  3 hotel zones (North Beach resort strip, Coral Beach South, city-centre budget area)
  with hotel picks at 3 price tiers: budget ₪350-600 (Amdar Hostel, Manta Ray Inn, city-
  centre guesthouses), mid-range ₪600-1,200 (Prima Music Hotel, Orchid Hotel+Resort,
  U Boutique), luxury ₪1,200+ (Dan Eilat, Isrotel Royal Beach+Yam Suf, Princess Hotel).
  Seasonal pricing table (Jan cheapest ~₪640/night, June peak ~₪2,300/night). Booking
  decision matrix by priority. 2× Booking.com CTAs + 1× GYG. Dense cross-links to
  eilat-travel-guide, eilat-diving-snorkeling, eilat-tours-compared, petra-from-eilat-vs-amman.
  eilat-travel-guide.md updated with corrected price ranges + companion guide cross-link.
  Gate: pnpm check 0 errors; build 417 pages; 524/524 e2e+a11y pass.
  Commit: 785ab1d on master; pushed to origin.

Notes: iter 240 RESEARCH — competitor-gap-scan-240:
  3 net-new backlog items after thorough dedup vs ~140 existing items.
  eilat-hotels-guide (P2, monetization, S): hotel picks at 3 tiers for Eilat's
    distinct zones; companion to eilat-travel-guide.md (iter231).
  best-hotels-tel-aviv (P2, monetization, S): hotel picks at 3 tiers by TLV area;
    companion to tel-aviv-neighborhoods-guide.md (iter157).
  tel-aviv-budget-guide (P3, seo-content, S): "free & cheap things to do in Tel Aviv";
    distinct from free-things-to-do-israel (national hub) and israel-cost-budget (cost overview).
  Backlog fully saturated; 3 new items appropriate after 240 iterations.
  No gate needed (RESEARCH mode). .loop/ files committed to master.

Notes: iter 239 REVIEW — meta-desc-fix-239 shipped:
  Full EN guide frontmatter audit: all guides checked against ≤65-char title / ≤160-char
  description limits. Found and fixed 39 violations (4 title + 35 description).
  Title fixes: church-holy-sepulchre-guide 71→57, haifa-travel-guide 92→61,
  jordan-river-baptism 66→60, yad-vashem-visitor-guide 75→54.
  Description fixes: 35 guides trimmed; keyword intent preserved throughout.
  Gate: pnpm check 0 errors; build 416 pages; 524/524 e2e+a11y pass.
  Commit 957afaf on master; pushed to origin; CI in_progress at state-write time.

Notes: iter 238 BUILD (technical→seo-content fallthrough) — cycling-in-israel shipped:
  New guide /cycling-in-israel (715ce8f); 416 pages; 524/524 tests pass

Notes: iter 237 BUILD (tools→seo-content fallthrough) — israel-in-summer shipped:
  New guide /israel-in-summer (5ee2ab3); 415 pages; 523/523 tests pass

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
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 23 EN guides + 3 tools-monetization + 5 accuracy-fix + VAT-refund + israel-museum + golan-heights + review(204-title-fix) + research(205-6-items) + traveling-israel-jewish-holidays(206) + western-wall-tunnels-guide(207) + tower-of-david-guide(208) + review/meta-desc-fix(209) + research(210-5-items) + israeli-breakfast-guide(211) + netanya-guide(212) + jericho-day-trip-from-jerusalem(213) + review/meta-desc-fix(214) + research(215-6-items) + jaffa-food-guide(216) + mahane-yehuda-market-guide(217);
herodion-guide(218) + review/meta-desc-fix(219) + research(220-6-items) + galilee-christian-sites-circuit(221) + israel-eta-guide(222) + haifa-neighborhoods-guide(223) + review/meta-desc-fix(224) + research(225-6-items) + 1-day-tel-aviv-itinerary(226) + tel-aviv-things-to-do(227) + layover-jerusalem(228) + review/meta-desc-fix(229);
research(230-6-items) + eilat-travel-guide(231) + ein-gedi-guide(232) + israel-with-teenagers(233) + review/meta-desc-fix(234) + research(235-6-items) + israel-craft-beer(236) + israel-in-summer(237) + cycling-in-israel(238) + review/meta-desc-fix(239).
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235.
