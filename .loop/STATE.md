# LOOP STATE

- iteration: 278
- lastMode: BUILD
- lastItem: fix-jewish-holiday-dates-2026-2027 — corrected 2026/2027 Jewish holiday dates in traveling-israel-jewish-holidays.md (RH, YK, Sukkot, Hanukkah, Purim 2027, Passover 2027)
- lastResult: BUILD COMPLETE — gate green (check 0 errors · build 441 pages · 566/566 tests); commit a61ab47 pushed to master
- nextRotationCategory: 279%5==4 → REVIEW pass
- higgsfieldSpent: 0
- updatedAt: 2026-07-04T04:10Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 278 BUILD (technical/content-accuracy) — fix-jewish-holiday-dates-2026-2027:
  tools rotation (278%5==3) had no ready items (all 11 tools shipped); fell through to technical.
  Chose P2/S item: fix incorrect 2026/2027 Jewish holiday dates in traveling-israel-jewish-holidays.md.
  Dates verified via Chabad.org / timeanddate.com searches before editing.
  2026 corrections: RH Sep 11-12 (was Oct 11-12); YK Sep 20 (was Oct 20);
    Sukkot Sep 25-Oct 2 (was Oct 15-22); Hanukkah Dec 4-12 (was Dec 14-22).
  2027 corrections: Purim Mar 22-23 (was Feb 20-21); Passover Apr 22-29 (was Mar 22-29);
    RH Oct 2-3 (was Sep 30-Oct 1); YK Oct 10 (was Oct 9); Sukkot Oct 15-22 (was Oct 4-11);
    Hanukkah Dec 25-Jan 1 2028 (was Dec 4-12).
  5 edits total: frontmatter updatedAt, FAQ answer, RH When, YK When, Sukkot When, Hanukkah When.
  Gate: pnpm check 0 errors (118 files) · build 441 pages · 566/566 e2e+a11y pass. GREEN.
  Ship: commit a61ab47 on master; pushed to origin/master.
  NEXT: iter 279 = REVIEW (279%5==4 → review pass).

Notes: iter 277 BUILD (seo-content) — rosh-hashanah-in-israel:
  New /rosh-hashanah-in-israel — dedicated High Holiday travel guide for diaspora visitors timing
  a trip around the Jewish New Year. 2026 dates: Sep 11-12 (begins evening Sep 10); Yom Kippur
  Sep 21. Covers: Western Wall Musaf service logistics (crowds, timing, access), Tashlich at
  Yarkon River TLV + City of David Jerusalem + Sea of Galilee Tiberias, holiday food (honey+
  apples, round challah, lekach, pomegranate), Kol Nidre + Ten Days of Awe, transport closures,
  accommodation booking (6-12 months ahead Jerusalem; Yom Tov packages). 3 affiliate CTAs:
  Booking.com Jerusalem + GYG Rosh Hashanah tours + Viator High Holidays. 6 FAQs.
  Footer Essentials +1; cross-link from traveling-israel-jewish-holidays.md.
  Side note: existing traveling-israel-jewish-holidays.md has date error (says "October 11-12"
  for RH 2026; correct is Sep 11-12 based on 354-day year from RH 5786 = Sep 22, 2025).
  Date error noted in JOURNAL for a dedicated REVIEW fix.
  Gate: pnpm check 0 errors (118 files) · build 441 pages (+1) · 566/566 e2e+a11y pass (+2).
  Ship: commit adbfd22 on master; pushed to origin/master; CI in_progress at push
  (prior run cd80fd1 SUCCESS confirmed).
  NEXT: iter 278 = BUILD (278%5==3 → tools rotation).

Notes: iter 276 BUILD (monetization) — shopping-in-israel:
  New /shopping-in-israel guide — four market cultures (Machane Yehuda/Jerusalem,
  Carmel+Nahalat Binyamin+Levinsky/TLV, Jaffa Flea Market, Old City bazaars by quarter).
  What-to-buy: spices, Dead Sea cosmetics (Ahava authenticity guidance), Israeli wine,
  Medjool dates, Safed ceramics, olive wood, Judaica. 6 FAQs. 3 CTAs: GYG Machane Yehuda
  food tour + GYG TLV Carmel Market/Levinsky spice tour + Viator Jaffa Flea Market.
  Footer Essentials +1; cross-links from jaffa-travel-guide + mahane-yehuda-market-guide.
  Gate: pnpm check 0 errors (118 files) · build 440 pages (+1) · 564/564 e2e+a11y pass (+2).
  Ship: commit 48302b8 on master; pushed to origin/master; CI in_progress at push
  (prior run 9f7531 SUCCESS confirmed).
  Note: YAML apostrophe-escaping required 4 fix cycles (7 errors total); standard pattern.
  NEXT: iter 277 = BUILD (277%5==2 → seo-content rotation).

Notes: iter 275 RESEARCH — competitor-gap-scan-275:
  Mode RESEARCH (275%5==0). No code changed. Scanned: touristisrael.com, secrettelaviv.com,
  beinharimtours.com, itraveljerusalem.com, timeout.com/israel, goisrael.com, thekotel.org,
  planitisrael.com, traveler forums (holiday, food allergy, neighborhood queries).
  Backlog extremely saturated (174+ ready items); focused on niche holiday content + neighborhood
  guides + practical traveler-need gaps. 6 net-new items verified absent from backlog via grep:
    (1) rosh-hashanah-in-israel (P2 S seo-content+monetization) — diaspora travelers' most-sought
        holiday experience; Western Wall Kol Nidre/Musaf; Tashlich; advance hotel booking essential;
        Sep 11-13 2026. Competitors: touristisrael.com, secrettelaviv.com, iTravelJerusalem all
        have dedicated guides.
    (2) kerem-hateimanim-tel-aviv (P2 S seo-content+monetization) — historic Yemenite Quarter SW of
        Carmel Market; jachnun/malawach/lachuch/hilbe cuisine; vibrant LGBTQ-friendly creative scene;
        distinct from tel-aviv-carmel-market.md. Competitors: beinharimtours.com, timeout.com/israel,
        Fodor's, igoogledisrael.com all have standalone content.
    (3) egypt-jordan-israel-itinerary (P2 M seo-content+monetization) — distinct from 2-country
        iters in backlog (israel-jordan-itinerary, israel-egypt-guide); 3-country Middle East circuit
        (Israel + Petra/Wadi Rum + Cairo/Pyramids); $5k–8k/person packages = high commercial intent.
        touristisrael.com has THREE dedicated packages (10/12/14-day); TourRadar lists 10+ operators.
    (4) israel-food-allergies-guide (P3 S seo-content) — no mandatory EU-style allergen labeling in
        Israel; sesame ubiquitous (tahini, challah, burekas, dressings); labeling only in Hebrew/Arabic;
        practical Hebrew allergy cards (allergyisrael.org.il); distinct from celiac/gluten-free guide
        (separate backlog P2 entry). No editorial guide on our site.
    (5) tisha-bav-in-israel (P3 S seo-content) — goisrael.com + thekotel.org + planitisrael.com have
        dedicated pages; 25-hour fast; unique empty-Old-City-streets atmosphere; tens of thousands at
        Western Wall Plaza for Eicha reading; July 22-23 2026. Zero backlog matches for "tisha/Tisha".
    (6) mea-shearim-guide (P3 S seo-content) — beinharimtours.com + Danny the Digger + America Israel
        Tours + goguided.tours all have standalone guides; GYG has "Mea Shearim hidden gems" tours;
        only current site mention is inside SHIPPED israel-film-tv-tourism (Shtisel filming location),
        not a standalone guide. Critical honesty notes: frame as living community not tourist attraction;
        photography requires explicit permission; some residents object to tourism; guided tour preferred.
  De-duped against backlog: shavuot already present; all 6 items confirmed absent.
  COMPETITORS.md updated with iter275 scan results. No gate required (research only).
  No commit to master beyond state update.
  NEXT: iter 276 = BUILD (276%5==1 → monetization rotation).

Notes: iter 274 REVIEW — review-seo-meta-274:
  Mode REVIEW (274%5==4). Reviewed work from iters 270-273.
  Defects found and fixed: 3 SEO meta overruns:
    (1) israel-film-tv-tourism title: 66→65 chars (removed " & " between Shtisel and Screen Locations,
        replaced with ","; no meaning lost)
    (2) israel-tour-operators-guide desc: 164→131 chars (reworded tail: "so you book with the right
        operator for your trip" → "and book with the right operator")
    (3) sea-of-galilee-boat-tour desc: 169→157 chars (removed "the" before "Jesus Boat" and "ancient"
        before "1st-century" — no meaning lost)
  No dead links found (21 internal links across 3 guides, all resolve).
  No missing smoke/a11y spec routes (all 3 pages already covered).
  Gate: pnpm check 0 errors (118 files) · build 439 pages · 562/562 e2e+a11y pass. GREEN.
  Ship: commit 1e698c8 on master; pushed to origin/master; CI in_progress at push
  (prior run d923ac8 SUCCESS confirmed).
  NEXT: iter 275 = RESEARCH (275%5==0 → competitor gap scan).

Notes: iter 273 BUILD (seo-content+monetization) — sea-of-galilee-boat-tour:
  tools rotation empty (all shipped); fell through technical (all shipped) → seo-content+monetization.
  New /sea-of-galilee-boat-tour — on-water experience guide for the Kinneret.
  Covers: Kinneret Sailing Company pier crossing (Tiberias→Ein Gev, ₪50–90 range, Hava Nagila
  performance, April-Oct peak, Ein Gev kibbutz lunch); Jesus Boat replica sailing at Kibbutz Nof
  Ginosar (flag-raising ceremony, advance booking required, ₪300–500 semi-private range);
  Yigal Alon Museum (genuine 1st-century CE vessel, honest non-attribution framing).
  Christian Galilee context section (Gospels events set on this lake). 6 FAQs.
  3 affiliate CTAs (GYG Sea of Galilee boat tour + Viator Christian Galilee + Booking.com Tiberias).
  Footer Essentials: +1 "Sea of Galilee boat tours" link. Cross-link added in tiberias-guide.md.
  Dense internal links: tiberias-guide, galilee-christian-sites-circuit, nazareth-sea-of-galilee-
  day-trip, galilee-tours-compared, jordan-river-baptism, transportation, national-parks-pass.
  Gate: pnpm check 0 errors (118 files) · build 439 pages (+1) · 562/562 e2e+a11y pass (+2).
  Ship: commit a0ece75 on master; pushed to origin/master; CI in_progress at push
  (prior run 0a401c6 SUCCESS confirmed).
  Note: local master was at iter 172 (fresh clone); had to git reset --hard origin/master first.
  NEXT: iter 274 = REVIEW (274%5==4 → review pass on iters 270-273).

Notes: iter 272 BUILD (seo-content) — israel-film-tv-tourism:
  New /israel-film-tv-tourism — Israeli screen tourism guide targeting Netflix/Apple TV+ audience.
  Covers: Fauda (Kfar Kasim self-guided + guided Fauda Experience tours via GYG/Viator),
  Shtisel (Mea She'arim walk with dress-code + photography rules, Geula Market),
  Tehran (Jerusalem Old City as Tehran double, Old City Muslim+Christian Quarters),
  Beauty Queen of Jerusalem (Mahane Yehuda market + Jewish Quarter),
  Our Boys (East Jerusalem context + safety note). Self-guided screen walk table (5 locations).
  7 FAQs. 3 affiliate CTAs (GYG Fauda tours + Viator Jerusalem walking tours + Abraham cultural).
  Dense cross-links: jerusalem-food-guide, mahane-yehuda-market-guide,
  holy-sites-dress-code-etiquette, is-israel-safe, best-tours-in-israel,
  israel-tour-operators-guide, western-wall-tunnels-guide, jerusalem-old-city-walking-tour.
  Footer Essentials: +1 "Film & TV screen tourism" link.
  Gate: pnpm check 0 errors (118 files) · build 438 pages (+1 from 437) · 560/560 e2e+a11y pass (+2).
  Ship: commit 4577629 on master; pushed to origin/master; CI in_progress at push
  (prior run c2f7a81 SUCCESS confirmed).
  NEXT: iter 273 = BUILD (273%5==3 → tools rotation).

Notes: iter 271 BUILD (monetization) — israel-tour-operators-guide:
  Operator buyer's guide: Abraham Tours (budget solo/social), Bein Harim (cruise/large groups),
  GetYourGuide marketplace (free-cancellation filter), Viator (verified-review depth), Keshet/Egged
  (structured packages), IMTA private guides (one-on-one licensed). 6-row comparison table.
  3 affiliate CTAs (GYG + Viator + Abraham). Verdict box. 6 FAQs. Dense cross-links to all 6
  tours-compared pages + private-tours-israel + best-tours-in-israel (cross-link added).
  Footer Essentials: "Tour operators compared" link added.
  Gate: pnpm check 0 errors (118 files) · build 437 pages (+1 from 436) · 558/558 e2e+a11y pass (+2).
  Ship: commit e097ed7 on master; pushed to origin/master; CI in_progress at push
  (prior run 61351eb SUCCESS confirmed).
  NEXT: iter 272 = BUILD (272%5==2 → seo-content rotation).

Notes: iter 270 RESEARCH — competitor-gap-scan-270:
  Mode RESEARCH (270%5==0). No code changed. Scanned: touristisrael.com, timeout.com/israel,
  secrettelaviv.com, israel21c.org, neveshalom.org, traveler forums (airport sherut status),
  fishing/dairy/coexistence specialist sites. Backlog now 183+ ready items — extremely saturated
  after 270 iterations; most major Israel travel content gaps documented. De-duped 15+ candidates
  already present. 5 net-new items added: israel-wine-bars (P3 S), israel-fishing-guide (P3 S),
  israel-cheese-dairy-guide (P3 S), ben-gurion-transfers-2026-update (P2 S content-accuracy-review
  for sherut service changes), israel-coexistence-guide (P3 S). COMPETITORS.md updated with iter270
  scan results. No gate required (research only). No commit to master beyond state update.
  NEXT: iter 271 = BUILD (271%5==1 → monetization rotation).

Notes: iter 269 REVIEW — review-desc-trim-269:
  Review covers iters 265-268 (RESEARCH + israel-rooftop-bars + israel-travel-tips + glamping-israel).
  Defects fixed: (1) israel-travel-tips desc 178→150 chars; (2) Footer Essentials missing rooftop-bars
  link added; (3) tel-aviv-nightlife cross-link to /israel-rooftop-bars added in 'Plan your trip' section.
  All internal links verified clean; smoke+a11y specs already covered all 3 new guides.
  Gate: pnpm check 0 errors · build 436 pages · 556/556 e2e+a11y pass.
  Ship: commit d7801a9 on master; pushed to origin/master.
  NEXT: iter 270 = RESEARCH (270%5==0).

Notes: iter 268 BUILD (tools rotation fallthrough → seo-content) — glamping-israel:
  Tools backlog empty (all shipped); fell through to seo-content per playbook. Chose
  /glamping-israel (P2, seo-content, S) — Negev desert & Galilee eco-stays guide.
  Covers: Selina Ramon (crater-rim hybrid eco-lodge/social hub), Desert Shade eco-camp
  (deeper wilderness immersion), Kibbutz Lotan (Arava Valley geodesic domes + composting
  toilets honestly disclosed), Sea of Galilee kibbutz-farm glamping briefly. Season table
  (spring/autumn = ideal; summer heat warning for Negev clearly stated; winter = coldest/
  darkest skies). Packing checklist table. Dead-link fix: removed /bedouin-experience-israel
  link (not yet built) before gate. Cross-link added from /israel-stargazing accommodation
  paragraph. Footer Essentials: +1 "Glamping in Israel" link. 2 affiliate CTAs (Booking.com
  Negev glamping + GYG Negev experiences). 6 FAQs. YAML frontmatter closing --- missing
  on first write — fixed on one-fix attempt; gate passed clean.
  Gate: pnpm check 0 errors · build 436 pages (+1 from 435) · 556/556 e2e+a11y pass.
  Ship: commit 4881bf8 on master; pushed to origin/master; CI in_progress at push (prior
  run 710c3e5 SUCCESS confirmed).
  NEXT: iter 269 = REVIEW (269%5==4 → review pass on iters 265-268).

Notes: iter 267 BUILD (seo-content rotation) — israel-travel-tips:
  New /israel-travel-tips — "20 Things to Know Before Visiting Israel". Top-of-funnel listicle
  capturing 'things to know before visiting Israel', 'Israel travel tips', 'Israel travel mistakes'
  intent — distinct from first-time-in-israel.md (trip-planning framework). 20 numbered tips in
  6 thematic sections: entry/docs (ETA-IL, passport stamps, health insurance), money/connectivity
  (ATM/DCC, cards, SIM/eSIM), Shabbat reality (transport shutoff, Jerusalem vs TLV differences),
  religious sites/dress code (scarf tip, Temple Mount hours, bazaar haggling), transport practicalities
  (Rav-Kav, rental car West Bank void, driving/traffic), health/food/culture (tap water, kosher
  dynamics, address precision, Israeli directness), mistakes to avoid (August heat, skip Jaffa).
  Quick-reference table (tap water/ETA-IL/currency/voltage/tipping/emergency/language/Shabbat/holidays).
  FAQ JSON-LD (7 Qs). Booking.com + GYG affiliate CTAs. Dense internal links to 14 existing guides.
  Wired: footer Plan column ('20 things to know' link) + first-time-in-israel.md cross-link.
  Gate: pnpm check 0 errors (118 files) · build 435 pages (+1 from 434) · 554/554 e2e+a11y pass.
  Ship: commit d5c66ef on master; pushed to origin/master; CI in_progress at push (prior run 2c022f9 SUCCESS).
  NEXT: iter 268 = BUILD (268%5==3 → tools rotation).

Notes: iter 266 BUILD (monetization) — israel-rooftop-bars:
  Gate: pnpm check 0 errors · build 434 pages (+1) · 552/552 e2e+a11y pass. GREEN.
  Ship: commit 84b45fd on master; pushed to origin/master; CI SUCCESS confirmed.
  NEXT: iter 267 = BUILD (267%5==2 → seo-content rotation).

Notes: iter 265 RESEARCH — competitor-gap-scan-265:
  Sites scanned: touristisrael.com, secrettelaviv.com, timeout.com/israel, worldjewishtravel.org,
  israelwineexp.com, winetourism.com, agritourism-israel resources, viator.com/israel,
  getyourguide.com/israel, igoogledisrael.com, aish.com, chabad.org/israel.
  6 net-new BACKLOG items added:
    - tel-aviv-white-night (P3, seo-content, S) — events-festivals.md has 1 line; competitors have full standalone pages
    - israel-wine-harvest-season (P3, seo-content+monetization, S) — wine geography guides exist; no seasonal harvest experience guide
    - israel-hot-air-balloon (P3, seo-content+monetization, S) — adventure-sports.md mentions in 1 line; no standalone guide
    - israel-olive-harvest (P3, seo-content, S) — zero backlog entries; agrotourism gap
    - hanukkah-in-israel (P3, seo-content, S) — jewish-holidays guide covers in 2-3 sentences only
    - lag-baomer-israel (P3, seo-content, S) — jewish-holidays guide covers in ~2 lines; no standalone
  All confirmed non-duplicates via grep scan of backlog. COMPETITORS.md updated.

Notes: iter 264 REVIEW — review-desc-trim-264:
  Audited iters 261-263 guides: kibbutz-hotels-israel, best-beaches-israel, israel-wellness-spa.
  Defects found and fixed: best-beaches-israel desc trimmed (170→147); /kibbutz-hotels-israel added to
  smoke.spec.ts; /best-beaches-israel and /kibbutz-hotels-israel added to a11y.spec.ts.
  Gate: pnpm check 0 errors · build 433 pages · e2e 550/550 pass. GREEN. Ship: commit 0687680.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 31 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265.
