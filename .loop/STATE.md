# LOOP STATE

- iteration: 285
- lastMode: RESEARCH
- lastItem: competitor-gap-scan-285
- lastResult: research — 6 net-new items added to BACKLOG; no gate required
- nextRotationCategory: monetization (286%5==1 → BUILD · monetization rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-04T12:10Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 285 RESEARCH (285%5==0 → competitor gap scan):
  Mode RESEARCH. No code changed. Backlog at ~187 ready items (extremely saturated;
  extensive de-dup required before finding new gaps).
  Scanned: timeout.com/israel, secrettelaviv.com, touristisrael.com, beinharimtours.com,
  tripadvisor.com, ramatgandiamond.com, visithamatgader.co.il, tourism.gov.il, batiment.co.il.
  6 net-new items confirmed absent from backlog via grep count analysis:
    (1) neve-tzedek-guide P2 S — Tel Aviv's 1887 first Jewish neighborhood; Suzanne Dellal
        Centre, Shabazi St boutiques, Nahum Gutman Museum; 0 standalone backlog entries (grep
        count confirmed); only sub-section in SHIPPED neighborhoods hub + 1-day TLV itinerary
    (2) israel-hummus-trail P2 S — restaurant circuit: Abu Hassan Jaffa + Abu Shukri Jerusalem
        + Abu Gosh + Hummus Said Akko + Afteem Bethlehem; 16 BACKLOG hummus mentions but ALL
        in other guides' text, 0 standalone circuit guide
    (3) israel-diamonds-jewelry P3 S — Ramat Gan Diamond Exchange tourist visit + Eilat Stone;
        0 BACKLOG matches for diamond/jewelry guide
    (4) israel-thermal-baths P3 S — Hamat Gader 38°C pools + crocodile farm (Golan); Hamat
        Tiberias national park springs; distinct from Dead Sea spa hotels; only 3 BACKLOG refs
    (5) rishon-lezion-guide P3 S — Israel's City of Firsts (1882 moshav); Carmel Winery est.
        1882; Hebrew kindergarten; 15 min from TLV by light rail; only 2 BACKLOG refs
    (6) bat-yam-guide P3 S — TLV's affordable beach neighbor; BISC street theater festival;
        street art; authentic Mizrahi neighborhood; only 1 BACKLOG ref (cross-reference)
  De-duped confirmed covered and skipped: pet-friendly-israel (iter210), startup-tech-tour
  (iter160), mount-of-olives-guide (iter185), photography-guide (iter30), honeymoon-israel
  (iter20), israel-wellness-spa (iter35), sarona-market-tel-aviv (iter110), tel-aviv-museums
  (iter85), jerusalem-museums (iter130).
  COMPETITORS.md updated. BACKLOG.md updated (+6 items + iter285 audit note).
  NEXT: iter 286 = BUILD (286%5==1 → monetization rotation). Top monetization candidates:
    neve-tzedek-guide (P2 S, just added), israel-agritourism-guide (P2 M), dead-sea-hotels-guide
    (P2 S), egypt-jordan-israel-itinerary (P2 M), herzliya-hotels (if separate from guide),
    bat-yam-guide (P3 S, just added).

Notes: iter 284 REVIEW (284%5==4 → review pass on iters 281-283):
  Mode REVIEW. Audited: kerem-hateimanim-tel-aviv (iter281), herzliya-guide (iter282),
  tel-aviv-beach-guide (iter283). research-only iter280 (no code) excluded from code audit.
  Startup: git reset --hard origin/master needed (fresh cloud checkout; remote at iter283 92e614a).
  pnpm install clean. STOP flag absent.
  Checks performed:
    (1) SEO meta length — title ≤65 chars, desc ≤160 chars (Python unicode len):
        kerem-hateimanim-tel-aviv: title=58 ✓, desc=149 ✓
        herzliya-guide: title=61 ✓, desc=153 ✓
        tel-aviv-beach-guide: title=63 ✓, desc=166 ✗ → DEFECT
    (2) Internal link resolution — all 19 links across 3 guides verified against content/ files:
        kerem-hateimanim: 7 links (all OK)
        herzliya-guide: 6 links (all OK)
        tel-aviv-beach-guide: 10 links (all OK, incl. /kerem-hateimanim-tel-aviv → newly shipped)
    (3) Cross-link back-wiring verified:
        tel-aviv-carmel-market.md → /kerem-hateimanim-tel-aviv ✓ (line 122)
        day-trips-from-tel-aviv.md → /herzliya-guide ✓ (line 54)
        best-beaches-israel.md → /tel-aviv-beach-guide ✓ (line 70)
    (4) Footer links verified:
        /herzliya-guide ✓ (line 107)
        /kerem-hateimanim-tel-aviv ✓ (line 125)
        /tel-aviv-beach-guide ✓ (line 130)
    (5) smoke.spec.ts + a11y.spec.ts coverage:
        all 3 routes present in both specs ✓
  Defect fixed: tel-aviv-beach-guide description 166 chars → 159 chars.
    Removed "flags, " from "with flags, jellyfish season, surfing..." → "with jellyfish season, surfing..."
    Flag system still fully described in guide body; no meaning lost.
  Gate: pnpm check 0 errors (118 files) · pnpm build 444 pages · 572/572 e2e+a11y pass. GREEN.
  Ship: commit e10cf65 on master; pushed to origin/master; CI in_progress at push time
    (prior iter283 SHA 92e614a = SUCCESS confirmed).
  NEXT: iter 285 = RESEARCH (285%5==0 → competitor gap scan).

Notes: iter 283 BUILD (tools fallthrough → seo-content+monetization) — tel-aviv-beach-guide:
  Mode BUILD (283%5==3 → tools rotation). Tools section entirely SHIPPED (all 11 tools); fell
  through to technical (also all SHIPPED); fell through to monetization/seo-content rotation.
  Chose tel-aviv-beach-guide (P2 M) — dedicated Tel Aviv-only beach guide, DISTINCT from
  best-beaches-israel.md (all-Israel). July 4 = peak summer beach season = max traffic relevance.
  New /tel-aviv-beach-guide — covers all named Tel Aviv beaches north→south: Hilton Beach
  (LGBTQ+ community; dog-friendly north end; since 1980s), Gordon Beach (central city hub;
  tourist hotel zone; volleyball), Frishman Beach (family-oriented; gentle slope), Banana Beach
  (young crowd; beach bars; Jaffa combo), Jerusalem Beach/Bograshov (surf schools; TLV Surf Club;
  ~₪80/hr lesson + board hire; best wave break on city strip), Alma Beach (quietest; near Old Jaffa;
  local neighbourhood feel), Nordau Beach (gender-separated bathing; check Tel Aviv municipality
  schedule before visiting; days and hours rotate seasonally).
  Practical sections: flag system (white/red/black); jellyfish season (Jul–Oct, peak Aug–Sep;
  rinse with seawater not fresh water; ask lifeguards); disabled access (beach wheelchairs from
  municipality, free, pre-book); Shabbat (beaches fully operational; intercity transport stops);
  seasonal notes (May–Jun + Sep–Oct = ideal; Jul–Aug = crowded + jellyfish; Nov–Apr cool).
  2 affiliate CTAs: Booking.com TLV beachfront hotels + GYG beach kayak/bike/sunset experiences.
  Footer Essentials: +1 "Tel Aviv beach guide" link (near Eilat diving).
  Cross-links: cross-link added in best-beaches-israel.md Tel Aviv section → /tel-aviv-beach-guide;
  internal links in guide: lgbtq-travel-israel, tel-aviv-white-city, jaffa-travel-guide,
  tel-aviv-carmel-market, kerem-hateimanim-tel-aviv, tel-aviv-neighborhoods-guide,
  best-beaches-israel, cycling-in-israel, shabbat-guide, transportation.
  Gate: pnpm check 0 errors (118 files) · build 444 pages (+1) · 572/572 e2e+a11y pass (+2). GREEN.
  Ship: commit 78c7ff7 on master; pushed to origin/master; CI in_progress at push
  (prior run 28699398241 SUCCESS confirmed for iter282 sha 153d39f).
  NEXT: iter 284 = REVIEW (284%5==4 → review pass on iters 280-283).

Notes: iter 282 BUILD (seo-content) — herzliya-guide:
  Mode BUILD (282%5==2 → seo-content rotation). Chose herzliya-guide (P2 S) — top
  seo-content candidate from STATE.md iter281 notes. New /herzliya-guide — Herzliya
  day trip and beach city guide. Covers: Apollonia National Park (Crusader Château
  d'Arsuf + Byzantine/Hellenistic ruins; INPA pass valid; clifftop trail; ~₪35-45
  entry; 1–2h visit; sea views); Herzliya Marina (modern waterfront; restaurants +
  cafés + boutiques; lunch stop after Apollonia); Acadia Beach (Blue Flag; June–Sep
  lifeguards; quieter than TLV beaches); Herzliya Museum of Contemporary Art (optional
  1h add-on). Getting there: Green Line light rail TLV Center → Herzliya Station
  ~20 min ₪6.90; Egged 501/502 ~30 min; car Highway 2 north ~15-20 min. Day plans:
  half-day (Apollonia + Marina) and full-day (add Acadia Beach + optional museum).
  Northern coast circuit: Herzliya → Caesarea → Netanya by car. 6 FAQs.
  2 affiliate CTAs: GYG northern coast day tour + Booking.com Herzliya hotels.
  Cross-link: day-trips-from-tel-aviv.md new Herzliya bullet (before Netanya).
  Footer Essentials: +1 "Herzliya guide" link. Smoke +1 / a11y +1 routes.
  Gate: pnpm check 0 errors (118 files) · build 443 pages (+1) · 570/570 e2e+a11y pass (+2). GREEN.
  Ship: commit 8933b7b on master; pushed to origin/master; CI in_progress at push
  (prior run 28698164186 SUCCESS confirmed for iter281 sha 9f30d35).
  NEXT: iter 283 = BUILD (283%5==3 → tools rotation). Top tools candidates:
    review recently shipped tools for enhancements; new tools from backlog:
    israel-visa-checker (P2 M), galilee-weather-tool (P3 S), or next-ready tools item.

Notes: iter 281 BUILD (monetization) — kerem-hateimanim-tel-aviv:
  Mode BUILD (281%5==1 → monetization rotation). Chose kerem-hateimanim-tel-aviv (P2 S) —
  top candidate from STATE.md iter280 notes. New /kerem-hateimanim-tel-aviv — Tel Aviv's
  Yemenite Quarter food and neighbourhood guide. Covers: Yemenite-Israeli food culture
  (jachnun = Saturday morning slow-baked rolled pastry with grated tomato + egg + z'hug;
  malawach = flaky pan-fried flatbread; lachuch = spongy crumpet-style bread; kubbaneh =
  overnight Shabbat bread; hilbe + merak); neighbourhood history (founded 1904 by Yemenite
  Jewish immigrants; distinct low-rise whitewashed architecture); bar and café scene on
  HaKovshim Street (LGBTQ-friendly, creative community); photography and community-respect
  notes (living community, not tourist attraction). 6 FAQs. 2 affiliate CTAs (GYG Yemenite
  Quarter food tour + Booking.com TLV hotels). Cross-link added in tel-aviv-carmel-market.md
  "Plan your visit" section. Footer Essentials: +1 "Kerem HaTeimanim (Yemenite Quarter)" link.
  YAML apostrophe fix: 2 FAQ answers converted from single-quoted to double-quoted strings
  (z'hug + community's possessive inside single-quoted YAML breaks parser — standard pattern).
  Gate: pnpm check 0 errors (118 files) · build 442 pages (+1) · 568/568 e2e+a11y pass (+2). GREEN.
  Ship: commit e1f9d2a on master; pushed to origin/master; CI in_progress at push
  (prior run 28696966030 SUCCESS confirmed for iter280 sha).
  NEXT: iter 282 = BUILD (282%5==2 → seo-content rotation). Top seo-content candidates:
    herzliya-guide (P2 S), israel-hidden-gems (P2 M), christmas-in-israel (P2 M),
    israel-jordan-itinerary (P2 M), self-drive-israel-road-trip (P2 M).

Notes: iter 280 RESEARCH — competitor-gap-scan-280:
  Mode RESEARCH (280%5==0). No code changed. Scanned: tripadvisor.com Herzliya, isrotel.com,
  beinharimtours.com (nachalat-binyamin/farming/galilee-christian-sites), abrahamtours.com
  pub-crawl, getyourguide.com t445735, d-tlv.com, breakingtravelnews.com + travelandtourworld.com
  (13M ILS agro-tourism 2026 investment), yardenit.com, parks.org.il/qasr-el-yahud,
  laidbacktrip.com/sachne-warm-springs, christiansintheland.com/galilee-circuit, touristisrael.com.
  Backlog at ~174 ready items; methodical grep de-dup across full 671-line BACKLOG.md.
  7 net-new items confirmed absent from backlog:
    (1) herzliya-guide P2 S — Apollonia NP + Marina + Acadia Beach; Green Line 20 min from TLV
    (2) nachalat-binyamin-market P3 S — 200+ artists Tue/Fri; distinct from Carmel/Jaffa markets;
        shopping-in-israel.md (iter276) covers in 1 sentence
    (3) israel-agritourism-guide P2 M — year-round picking calendar; 13M ILS 2026 govt investment
    (4) tel-aviv-pub-crawl P3 S — Abraham Tours + D-TLV + GYG t445735; distinct from nightlife/rooftop-bars
    (5) galilee-christian-sites-circuit P2 M — 7 NT sites self-drive loop; referenced in STATE.md
        iter273 as cross-link target but never in backlog
    (6) gan-hashlosha-guide P3 S — 28°C springs INPA; referenced in megiddo guide as day-combo only
    (7) jordan-river-baptism-site P3 S — Yardenit vs. Qasr el-Yahud dual-site guide; referenced in
        STATE.md iter273 cross-links but no standalone backlog entry
  COMPETITORS.md updated with iter280 scan results. No gate required (research only).
  Backlog now ~181 ready items.
  NEXT: iter 281 = BUILD (281%5==1 → monetization rotation). Top monetization candidates:
    kerem-hateimanim-tel-aviv (P2 S), egypt-jordan-israel-itinerary (P2 M), herzliya-guide (P2 S),
    dead-sea-hotels-guide (P2 S), israel-agritourism-guide (P2 M).

Notes: iter 279 REVIEW — review-desc-trim-279:
  Reviewed iters 276-278 (shopping-in-israel, rosh-hashanah-in-israel, holiday-date-fix).
  1 defect: rosh-hashanah-in-israel desc 169→158 chars (trimmed tail clause, 9 chars saved).
  All internal links verified (20 links, 0 dead). Hero images present. Both pages in smoke+a11y tests.
  traveling-israel-jewish-holidays.md iter278 date fix confirmed correct.
  Gate: check 0 errors · build 441 pages · 566/566 pass. GREEN.
  Ship: commit 0f7c9c1 on master; CI in_progress at push (prior run eb5a70c SUCCESS confirmed).
  NEXT: iter 280 = RESEARCH (280%5==0 → competitor gap scan).

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

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 31 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285.
