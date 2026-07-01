# LOOP STATE

- iteration: 217
- lastMode: BUILD / seo-content
- lastItem: mahane-yehuda-market-guide — new /mahane-yehuda-market-guide content page (d6a84f9)
- lastResult: SHIPPED — gate passed (0 check errors, 403 pages built, 511/511 e2e+a11y pass); committed to master; pushed
- nextRotationCategory: 218%5==3 → BUILD mode / tools rotation
- higgsfieldSpent: 0
- updatedAt: 2026-07-01
- branch context: work on master; feature work on auto/<slug>

Notes: iter 217 BUILD (seo-content) — mahane-yehuda-market-guide shipped:
  - New guide: /mahane-yehuda-market-guide — Mahane Yehuda (the Shuk) Jerusalem standalone
      visitor guide, mirroring the shipped /tel-aviv-carmel-market format
  - Content: market layout (covered iron-roofed hall, open-air spice lanes, outer ring,
      Beit Yaakov restaurant strip); what to eat (Marzipan rugelach, burekas, knafeh,
      fresh-pressed juices, spices to take home, halva); evening transformation
      (Thursday/Friday/Saturday-after-Havdalah bar district); seasonal events (Passover,
      Sukkot sukkahs, Hanukkah sufganiyot); Beit Yaakov restaurants (Machneyuda booking
      caveats, Azura Iraqi-Jewish hummus); 8 FAQs covering hours, best time, what to eat,
      evening scene, holiday events, safety, getting there, kashrut
  - Affiliate CTAs: GYG food tour, Viator Jerusalem market+Old City combo, Booking Jerusalem
  - heroImage: /images/sub-destinations/jerusalem/mahane-yehuda.jpg (distinct from
      jerusalem-food-guide which uses /images/regions/jerusalem/mahane-yehuda.jpg)
  - Smoke test extended with /mahane-yehuda-market-guide route
  - Cross-link added: jerusalem-food-guide.md → new standalone guide
  - Note: iter216 rejected mahane-yehuda as duplicate of jerusalem-food-guide; iter217 ships
      it as standalone (same logic as carmel-market vs tel-aviv-food-guide — distinct page,
      dedicated keyword target for "Mahane Yehuda market guide" queries)
  - Gate: pnpm check 0 errors; build 403 pages (+1); 511/511 e2e+a11y pass
  - Commit d6a84f9 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 216 BUILD (monetization) — jaffa-food-guide shipped:
  - New guide: /jaffa-food-guide — Jaffa culinary/food guide distinct from:
      * jaffa-travel-guide.md (history/architecture, one-day walking guide)
      * jerusalem-food-guide.md (has Machane Yehuda section; different city)
  - Content: Abu Hassan hummus (morning-only, cash only), Said (local alternative),
    Dr. Shakshuka (Libyan-Jewish, North African cuisine), Old Man and the Sea (seafood mezze),
    Abouelafia bakery (24h, open Shabbat), port fish restaurants, flea market bar scene
  - 8 FAQs, getyourguide+viator+booking affiliate CTAs
  - heroImage: /images/sub-destinations/tel-aviv/old-jaffa.jpg (distinct from jaffa-travel-guide hero)
  - Smoke + a11y tests extended with /jaffa-food-guide route
  - Gate: pnpm check 0 errors; build 402 pages (+1); 510/510 e2e+a11y pass
  - Commit 0eed122 on master; pushed to origin

Notes: iter 215 RESEARCH — 6 net-new backlog items:
  - easter-in-jerusalem (P2 M) — Holy Week pilgrim guide; itraveljerusalem.com, vaticannews.va rank;
    church-holy-sepulchre-guide.md has only 1 sentence on Good Friday; confirmed NOT in backlog
  - east-jerusalem-guide (P2 M) — East Jerusalem visitor guide; Garden Tomb, Rockefeller Museum,
    Zedekiah's Cave, Damascus Gate souk, American Colony Hotel; all our Jerusalem content is W-centric
  - beit-guvrin-caves-guide (P2 S) — UNESCO WHS 2014; Bell Caves + Sidonian murals; Bein Harim ranks;
    referenced only in hidden-gems hub cluster, no standalone backlog entry confirmed
  - galilee-food-guide (P3 S) — Druze flatbread, Saint Peter's Fish framing, Golan wines, Nazareth
    Arab cuisine; jerusalem/tel-aviv food guides shipped; Galilee equivalent confirmed gap
  - mahane-yehuda-market-guide (P2 S) — Jerusalem shuk standalone; mirrors shipped /tel-aviv-carmel-
    market format; /israel-markets-guide hub too broad; /mahane-yehuda slug confirmed NOT in backlog
  - jaffa-food-guide (P2 S) — Jaffa culinary guide; jaffa-travel-guide.md covers history only;
    Abu Hassan, Dr. Shakshuka, Old Man and the Sea; confirmed NOT in backlog as standalone

Notes: iter 214 REVIEW (meta title/description fix):
  - Audited iter211-213 guides: internal links all OK, images exist, cross-links verified
  - Found 3 violations: israeli-breakfast-guide title 72→58 chars + desc 188→139 chars;
    netanya-guide title 80→60 chars; jericho-day-trip desc 201→135 chars
  - All fixed in one branch (auto/meta-desc-fix-214), gate passed, squash-merged to master
  - iter213 CI: run 28508085647 in_progress at state-write time

Notes: iter 213 BUILD (tools rotation → fell through to monetization+seo-content):
  - Tools category fully shipped; fell through to monetization/seo-content
  - Picked /jericho-day-trip-from-jerusalem (P2 monetization+seo-content, M) from iter205 research backlog
  - New guide: world's oldest city framing (Tell es-Sultan 10,000+ BCE), Mount of Temptation
    cable car, Hisham's Palace Tree of Life mosaic (world-class Islamic art), Qasr el-Yahud
    cross-link, Jericho Medjool dates market
  - HONESTY: Area A status for Israeli citizens prominently explained (cannot legally enter);
    rental car restriction explained (most agreements prohibit Area A); sherut sherut alternative;
    heat warnings for July/August; site hours caveat; safety advisory links
  - Affiliate CTAs: GYG Jericho+Dead Sea combo, Viator Jericho+Qumran+Dead Sea, Abraham Bethlehem+Jericho
  - Cross-links added to: day-trips-from-jerusalem (new Jericho bullet with Area A caveat)
  - Smoke test extended with /jericho-day-trip-from-jerusalem route
  - Gate: pnpm check 0 errors; build 401 pages (+1); 508/508 e2e+a11y pass
  - CI run in_progress at state-write; next iter start-check should confirm

  iter212 CI: in_progress at prior state-write; run in_progress — check next iter

Active items from recent research (all in BACKLOG, ready):
  iter200: /tel-aviv-street-art [P3 S]
  iter205: /israel-in-winter [P2 M], /hanukkah-in-israel [P3 S], /mount-carmel-hiking-guide [P3 S], /shavuot-in-israel [P3 S]
  iter210: /pet-friendly-israel [P2 M], /israel-with-baby [P2 S], /israel-by-train [P3 S], /herodion-guide [P2 S]

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 30 review passes + 3 technical (event-schema + meta-trim + locale-links) + 23 EN guides + 3 tools-monetization + 5 accuracy-fix + VAT-refund + israel-museum + golan-heights + review(204-title-fix) + research(205-6-items) + traveling-israel-jewish-holidays(206) + western-wall-tunnels-guide(207) + tower-of-david-guide(208) + review/meta-desc-fix(209) + research(210-5-items) + israeli-breakfast-guide(211) + netanya-guide(212) + jericho-day-trip-from-jerusalem(213) + review/meta-desc-fix(214) + research(215-6-items) + jaffa-food-guide(216) + mahane-yehuda-market-guide(217);
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215.
