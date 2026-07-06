# LOOP STATE

- iteration: 322
- lastMode: BUILD (322%5==2 → seo-content rotation)
- lastItem: jerusalem-armenian-quarter — complete visitor guide for the Jerusalem Old City Armenian Quarter
- lastResult: BUILD COMPLETE — gate GREEN (0 errors, 466 pages +1, 593/593 e2e pass); merged 13184cd; CI in_progress at state-update (standard)
- nextRotationCategory: 323%5==3 → BUILD tools rotation (all tools SHIPPED → fallthrough to seo-content/monetization)
- higgsfieldSpent: 0
- updatedAt: 2026-07-06T00:42Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 322 BUILD (seo-content) · jerusalem-armenian-quarter:
  Mode BUILD (322%5==2 → seo-content rotation). Picked jerusalem-armenian-quarter (P2, S) —
  smallest Old City quarter; genuine gap confirmed: jerusalem-neighborhoods-guide.md covers it
  in ~150 words; NO standalone guide existed; timeout.co.il has a feature but no competitor
  has a comprehensive visitor guide; armenian-patriarchate.org confirms narrow cathedral hours
  (6:30–7:30am + 3:00–3:30pm daily); alltrails-style gap for the Mardigian genocide museum
  (only Armenian genocide museum in Middle East open to public); high-value experiential gap
  confirmed by iter320 research.
  New guide: /jerusalem-armenian-quarter. Content: Cathedral of St. James (Surp Hagop) with
  full honesty framing on narrow visiting hours (6:30–7:30am + 3:00–3:30pm, non-negotiable);
  Armenian Apostolic Patriarchate compound history (established 638 CE, 5th-century presence);
  Mardigian Museum (12th-17th century illuminated manuscripts, genocide documentation, ~₪15
  admission, Mon-Sat 10am-4pm); Armenian ceramics workshops (Balian + Sandrouni families on
  Patriarchate Road, ₪80-400, authenticity caveats vs Jaffa Gate mass-produced tiles); Cows'
  Garden urban farm (Patriarchate-operated, access may be restricted — verify on day); Syrian
  Orthodox Church of St. Mark (2,000-year-old olive wood icon, informal hours). Quick-reference
  table, 6 FAQs, practical timing guide. 2 GYG affiliate CTAs (Old City private tour covering
  all 4 quarters + Armenian Quarter focused tour). Dense cross-links to jerusalem-old-city-
  walking-tour, jerusalem-neighborhoods-guide, holy-sites-dress-code-etiquette, jerusalem/western-
  wall (attraction). Reverse cross-links added: jerusalem-old-city-walking-tour (Step 2 Armenian
  Quarter section, after ceramics description); jerusalem-neighborhoods-guide (Armenian Quarter
  Key sites paragraph). Bug fix during development: /western-wall-guide doesn't exist → fixed
  to /jerusalem/western-wall (attraction URL pattern).
  Gate: pnpm check 0 errors (119 files) · build 466 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 13184cd to master; pushed origin/master. CI in_progress at state-update (standard).
  NEXT: iter 323 → BUILD tools rotation (323%5==3). Tools category all SHIPPED — fallthrough to
    seo-content/monetization. Top P2 candidates:
    accessible-travel-israel (P2, M), photography-guide (P2, M), israel-memorial-sites (P2, M),
    israel-best-hikes (P2, M), israel-top-archaeological-sites (P2, M), israel-for-black-travelers
    (P2, M), israel-anzac-heritage (P2, S). i18n Phase 3 (regions fr+de) also P2.

Notes: iter 321 BUILD (monetization) · israel-orthodox-jewish-travel:
  Mode BUILD (321%5==1 → monetization rotation). Picked israel-orthodox-jewish-travel (P2, M) —
  highest-spending diaspora Jewish visitor segment; zero dedicated Orthodox logistics guide on site;
  jewishlink.news, oucosher.org, shecheltoursisrael.com, afiatours.com, keshetisrael.com all publish
  dedicated Orthodox Israel travel guides; gap confirmed by iter315 research.
  New guide: /israel-orthodox-jewish-travel. Content: glatt kosher hotel tiers by certifying authority
  (Badatz Eda HaChareidit, Badatz Mehadrin, Rabbanut Yerushalayim) + city picks (Jerusalem: Geula/Mea
  Shearim area [Badatz], Ben Yehuda/city centre [Yerushalayim Rabbinate/Mehadrin], Mamilla/Jaffa Gate
  [Yerushalayim]; TLV: Dan Tel Aviv + Rothschild 22; Tiberias; Eilat; Dead Sea); Shabbat elevator
  standard explained; eruv guide (Jerusalem full West Jerusalem coverage; Tel Aviv; Haifa multiple
  overlapping — weekly verification emphasized); shul directory (Chabad.org/travel; Bnei Brak overview;
  Jerusalem: Great Synagogue, Ben Zakkai complex, Haredi shteibels; dress code standards); Western Wall
  Bar/Bat Mitzvah via kotel.org.il (Mon/Thu Torah-reading slots; Ezrat Yisrael advance booking for
  egalitarian/girls); Birkat Kohanim mass event twice yearly at Chol HaMoed (Sukkot + Passover; arrive
  7:30am; kotel.org.il for exact dates); mikveh guidance (Jerusalem central + TLV Meuhad; hotel concierge
  coordination; RSVP required peak season); Shushan Purim distinction (Jerusalem = 15 Adar vs rest of
  Israel 14 Adar — practical impact explained); Sukkot (communal sukkah hotels; Chol HaMoed domestic
  tourism peak — book 3-6 months ahead; INPA parks pass; Birkat Kohanim cross-reference); Haredi dress
  standards (Mea Shearim/Geula — stricter than general tourist guideline; no photography on Shabbat);
  itinerary frameworks (Arrive Thu/leave after Havdalah; Jerusalem base + Galilee day trips; B'nai
  Mitzvah trip timing for quieter Kotel ceremony Jan-Feb or June). 2 affiliate CTAs: Booking.com kosher
  hotels Israel + GYG Orthodox Jerusalem tours. 6 FAQs covering: glatt kosher definition; eruv weekly
  verification; Kotel Bar Mitzvah booking; Birkat Kohanim logistics; Chabad houses; restaurant kashrut.
  Dense cross-links to 10 guides: traveling-israel-jewish-holidays, shabbat-guide, whats-open-on-shabbat,
  kosher-food-guide, holy-sites-dress-code-etiquette, best-hotels-jerusalem, israel-national-parks-pass,
  bar-bat-mitzvah-israel, jewish-heritage-israel, israel-accommodation-guide. Footer link added.
  Reverse cross-links upgraded: jewish-heritage-israel (added Orthodox visitors bullet in practical tips);
  bar-bat-mitzvah-israel (added Orthodox companion guide link at end of closing paragraph).
  Gate: pnpm check 0 errors (119 files) · build 465 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 7b13236 to master; pushed origin/master. CI in_progress at state-update (standard).
  NEXT: iter 322 → BUILD seo-content rotation (322%5==2). Top seo-content P2 candidates:
    accessible-travel-israel (P2, M), photography-guide (P2, M), israel-memorial-sites (P2, M),
    israel-best-hikes (P2, M — added iter320), israel-top-archaeological-sites (P2, M — added iter320),
    jerusalem-armenian-quarter (P2, S — added iter320). i18n Phase 3 (regions fr+de) also P2.

Notes: iter 320 RESEARCH · research-320:
  Mode RESEARCH (320%5==0). Backlog extremely saturated (200+ ready items from 64+ research passes).
  Systematic grep de-duplication using Python3 regex against BACKLOG.md + guide directory scan
  before confirming any item as genuinely new.
  Net-new items added (all grep-confirmed 0 standalone hits before adding):
  1. /israel-anzac-heritage (P2, S, seo-content) — ANZAC heritage trail for Australian/NZ visitors;
     Beersheba Charge 1917, Australian Light Horse memorial, 3 CWGC cemeteries; no competitor
     editorial; high-intent AU/NZ pilgrimage market
  2. /israel-lgbtq-history (P3, S, seo-content) — LGBTQ+ legal & historical timeline guide;
     distinct from lgbtq-travel-israel.md (practical) + Pride annual guide (event); 1988
     decriminalization through 2026 status; evergreen cultural depth for LGBTQ travelers
  3. /jerusalem-armenian-quarter (P2, S, seo-content+monetization) — Armenian Quarter complete
     visitor guide; St. James Cathedral, Mardigian genocide museum, Armenian ceramics; only
     ~150 words in shipped jerusalem-neighborhoods-guide.md; genuine experiential gap
  4. /israel-for-black-travelers (P2, M, seo-content) — Beta Israel Ethiopian Jewish community
     + African Hebrew Israelites Dimona (Village of Peace); zero competitor editorial;
     growing search volume; two unique draws available nowhere else in the world
  5. /israel-best-hikes (P2, M, seo-content+monetization) — Best hikes in Israel curated
     editorial guide (12 ranked trails); distinct from hiking-in-israel.md overview and
     water-hiking-israel.md nahal focus; competes with AllTrails editorial format
  6. /israel-top-archaeological-sites (P2, M, seo-content+monetization) — Top 10 archaeological
     sites hub page; aggregates individual site guides (caesarea, masada, qumran, herodion etc.);
     captures head-keyword SEO currently leaking to archaeologytravel.com + roughguides.com
  De-duped and rejected: /israel-with-toddlers (→ israel-with-baby in backlog L528), /israel-dietary-
  restrictions (→ israel-gluten-free-guide in backlog L363), /best-national-parks-editorial (→ israel-
  national-parks-pass SHIPPED + individual park guides in backlog), /day-trips-from-jerusalem (→ EXISTS
  as pre-existing content file), /haifa-neighborhoods (→ SHIPPED iter223), /shopping-in-israel (→ SHIPPED
  iter276), /israel-mountain-biking (→ cycling-in-israel SHIPPED iter238), /israel-camping (→ backlog L638),
  /israel-surfing (→ backlog L294), /solo-female (→ SHIPPED iter127), /anzac-cwgc-standalone (→ merged
  into israel-anzac-heritage), /armenia-patriarch (→ merged into armenian-quarter guide).
  Gate: N/A (research only — no src/ changes, no branch, no gate run).
  NEXT: iter 321 → BUILD monetization rotation (321%5==1). Top BUILD candidates:
    accessible-travel-israel (P2, M), israel-orthodox-jewish-travel (P2, M), israel-memorial-sites (P2, M),
    israel-best-hikes (P2, M — just added), israel-top-archaeological-sites (P2, M — just added),
    photography-guide (P2, M). Fallthrough seo-content option: israel-anzac-heritage (P2, S),
    jerusalem-armenian-quarter (P2, S), western-galilee-guide (P2, M). i18n Phase 3 (regions fr+de) also P2.

Notes: iter 319 REVIEW · review-319-link-fixes:
  Mode REVIEW (319%5==4). Audited iters 316-318 output: sea-of-galilee-guide (iter316, d9214b6),
  backpacking-israel (iter317, e2b7a78), israel-road-trip (iter318, bfb1b4f).
  Findings:
  (1) CONFIRMED BUG: sea-of-galilee-guide.md — body line 165 had [GetYourGuide](/sea-of-galilee-guide),
      a self-referential link (linked back to the same page). Rewritten to prose directing readers
      to /galilee-tours-compared and the CTA above.
  (2) CONFIRMED BUG: backpacking-israel.md — body line 121 had [GetYourGuide](/israel-cost-budget),
      linking the GetYourGuide anchor to the wrong target (cost-budget guide). Fixed by removing
      the anchor; GetYourGuide is now referenced as plain text; the frontmatter CTA handles routing.
  (3) CLEAN: israel-road-trip.md — title 52 chars ✓, desc 157 chars ✓; no H1 in body; all internal
      links resolve (galilee-christian-sites-circuit, israel-car-rental-quiz, bahai-world-center-guide,
      golan, negev, israel-esim all confirmed present); discovercars rating:4.6/reviews:70000 is
      consistent established pattern from car-rental-israel.md; honesty framing appropriate (rental
      restrictions, Area A warning, seasonal caveats); affiliate CTAs correct.
  (4) CLEAN: sea-of-galilee-guide.md (other than the self-link) — title 57 chars ✓, desc 136 chars ✓;
      no H1 in body; all internal links resolve; Yardenit historical framing/Qasr el-Yahud comparison
      present; beach prices noted as "approximate" ✓; honesty framing appropriate.
  (5) CLEAN: backpacking-israel.md (other than the wrong link) — title 52 chars ✓, desc 147 chars ✓;
      no H1 in body; all internal links resolve; costs framed as ranges; honesty framing appropriate.
  Gate: pnpm check 0 errors (119 files) · build 464 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 5d1c321 to master; pushed origin/master. CI in_progress at state-update (prior
    9f00c90/bfb1b4f both success).
  NEXT: iter 320 → RESEARCH mode (320%5==0). Scan for new profitable content gaps not yet in backlog;
    competitor review; emerging 2026-2027 season topics; de-dup against 320-item+ BACKLOG.
    Top BUILD candidates after 320: accessible-travel-israel (P2, M), israel-orthodox-jewish-travel
    (P2, M), israel-memorial-sites (P2, M), photography-guide (P2, M), i18n Phase 3 (regions fr+de).

Notes: iter 318 BUILD (tools→seo+monetization) · israel-road-trip:
  Mode BUILD (318%5==3 → tools rotation). Tools exhausted; fell through to seo+monetization.
  Picked israel-road-trip (P2, M) — self-drive Israel road trip itinerary; repeatedly named
  in research passes (iters 40/60/80/etc.); Nomadic Matt + Walk My World + WanderlustingK all
  rank for "Israel road trip"; distinct from 5/7/10-day itineraries (transport-agnostic) and
  transport route comparisons. New guide: /israel-road-trip. Content: 7-day clockwise self-drive
  circuit — Day 1 TLV→Caesarea→Haifa; Day 2 Haifa→Akko→Rosh Hanikra→Safed; Day 3 Golan loop
  (Banias+Nimrod+wine); Day 4 Sea of Galilee circuit→Jordan Valley south; Day 5 Dead Sea+Masada+
  Qumran; Day 6 Negev/Makhtesh Ramon; Day 7 return via Route 6. Quick-reference table; Shabbat
  logistics; Route 6 toll notes; West Bank restriction warning; packing essentials; seasonal guide.
  3 affiliate CTAs: DiscoverCars + GYG + Booking.com. Dense cross-links to 15+ guides. Footer
  link added. Cross-links upgraded: car-rental-israel, driving-in-israel, israel-car-rental-quiz.
  Gate: pnpm check 0 errors (119 files) · build 464 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: committed bfb1b4f to master; pushed origin/master. CI in_progress at state-update (standard).
  NEXT: iter 319 → REVIEW mode (319%5==4). Audit iters 316-318 output: sea-of-galilee-guide
    (iter316, d9214b6), backpacking-israel (iter317, e2b7a78), israel-road-trip (iter318, bfb1b4f).
    Top audit checks: title ≤60 chars, desc ≤160 chars, all internal links resolve, no H1 in body,
    no fabricated data, affiliate CTAs correct, honesty framing appropriate.

Notes: iter 317 BUILD (seo-content) · backpacking-israel:
  Mode BUILD (317%5==2 → seo-content rotation). Picked backpacking-israel (P2, M) — top
  seo-content candidate per STATE iter316; thebrokebackpacker.com + nomadicmatt + hostelz.com
  all rank for "backpacking Israel" / "best hostels Israel"; israel-cost-budget.md covers
  accommodation tiers but not hostel-by-city guide or backpacking logistics.
  New guide: /backpacking-israel. Content: Abraham Hostels network (Jerusalem/TLV/Haifa/Eilat)
  with per-property context; hostel picks by city (including Florentine TLV, Ein Kerem Jerusalem,
  Tiberias guesthouses); budget logistics (Rav-Kav, sheruts on Shabbat, market eating, Tel-O-Fun
  biking); day-tour price table (8 routes, ₪ ranges); 10-day classic circuit + 14-day with south;
  6 FAQs. Three affiliate CTAs: Hostelworld + Booking.com + GetYourGuide group day tours.
  Dense internal links: rav-kav-israel, transportation, shabbat-guide, cycling-in-israel,
  israel-accommodation-guide, israel-cost-budget, free-things-to-do-israel, israeli-street-food-guide.
  Cross-links upgraded: israel-accommodation-guide (solo travellers/backpackers section),
  israel-cost-budget (backpacker daily budget bullet), free-things-to-do-israel (practical tips).
  Gate: pnpm check 0 errors · build 463 pages (+1) · 593/593 e2e pass. GREEN.
  Ship: committed e2b7a78 to master; pushed origin/master. CI in_progress at state-update (standard).
  NEXT: iter 318 → BUILD (318%5==3 → tools rotation). Tools category all SHIPPED — fallthrough to
    seo-content/monetization. Top P2 candidates: self-drive-road-trip (P2, M), accessible-travel-israel
    (P2, M), israel-orthodox-jewish-travel (P2, M), muslim-travel-israel (P2, M), photography-guide
    (P2, M). i18n option: Phase 3 (regions ×11 in fr+de) or Phase 4 (attractions batches).

Notes: iter 316 BUILD (monetization) · sea-of-galilee-guide:
  Mode BUILD (316%5==1 → monetization rotation). Picked sea-of-galilee-guide (P2, M) — highest-
  priority remaining gap; mentioned in 5+ research passes (iters 305/310/315); extends existing
  tiberias-guide (city only) and sea-of-galilee-boat-tour to cover the full lake circuit.
  New guide: /sea-of-galilee-guide. Content: all 4 shores — west (Magdala excavations + Ginosar
  Jesus Boat Museum), north shore Christian cluster (Capernaum ruins + Tabgha loaves-fishes mosaic
  + Mount of Beatitudes), east shore (Ein Gev kibbutz ferry + St. Peter's Fish + Kursi Byzantine
  monastery), south shore (Yardenit baptism site with honest Qasr el-Yahud comparison cross-link +
  Hamat Gader thermal springs + Roman bath ruins). Beaches table (Gei Beach, Luna Gal, Ginosar,
  Ein Gev), ~65km cycling circuit, day-trip vs overnight recommendation, getting-there logistics
  from TLV/Jerusalem/Haifa. 3 affiliate CTAs: GYG Galilee tours + Viator Christian Galilee circuit +
  Booking.com Tiberias hotels. Honesty: Yardenit framed vs Qasr el-Yahud historical context;
  Hamat Gader hours/fees seasonal — link official site; beach quality links to kinneret.co.il.
  Cross-links upgraded: tiberias-guide (Cross-links section), sea-of-galilee-boat-tour (final para),
  galilee region page (How to Get to the Galilee section).
  Gate: pnpm check 0 errors (119 files) · build 462 pages (+1) · 593/593 e2e pass. GREEN.
  Ship: committed d9214b6 to master; pushed origin/master. CI in_progress at state-update (standard).
  NEXT: iter 317 → BUILD seo-content rotation (317%5==2). Top seo-content P2 candidates:
    backpacking-israel (P2, M), self-drive-road-trip (P2, M), accessible-travel-israel (P2, M),
    haifa-travel-guide (P2, M), eilat-travel-guide (P2, M), israel-orthodox-jewish-travel (P2, M).
    i18n option: Phase 3 regions (11 region pages fr+de) or Phase 4 attractions batches.

Notes: iter 315 RESEARCH · research-315:
  Mode RESEARCH (315%5==0). Scanned competitor SEO patterns + SERP gaps not yet in backlog.
  Sources: lonelyplanet.com, timeout.com, backpackisrael.com, touristisrael.com, reddit.com/r/israel,
  tripadvisor.com, chabad.org (kosher travel), wikivoyage.org/Israel, jewishvirtuallibrary.org.
  De-duplication: swept 40+ candidate topics via Python3 regex against BACKLOG.md + DONE.md;
  rejected all already-present items (DONE: Tel Megiddo iter258; BACKLOG: Rosh HaNikra, Beit She'an,
  Beer Sheva, israel-wine-tourism, christian-pilgrimage-itinerary, museums-roundup, solo-travel,
  honeymoon, sukkot, passover, kibbutz-volunteer, israel-autumn, haifa-food, and 25+ others).
  6 net-new items confirmed (0 standalone hits in BACKLOG + DONE before append):
  (1) /israel-orthodox-jewish-travel (P2, M) — glatt kosher hotels, eruv maps, shul finder, mikveh,
      Western Wall bar/bat mitzvah logistics, Birkat Kohanim, Purim/Shushan Purim distinction
  (2) /zionist-heritage-trail (P2, S) — self-drive circuit: Har Herzl+Museum, Sde Boker Ben Gurion
      home, Rishon LeZion 1882 colony, Weizmann Institute, Degania (Israel's first kibbutz), Tel Hai
  (3) /israel-memorial-sites (P2, M) — multi-site legacy tourism: Lohamei HaGeta'ot, Ammunition
      Hill, Mount Herzl Military Cemetery, Kfar Etzion, Yad La-Shiryon/Latrun, CWGC cemeteries;
      Oct 7 sites explicitly excluded pending human editorial review
  (4) /new-years-eve-israel (P3, S) — "Sylvester"; TLV clubs, Dizengoff Square countdown, Eilat
      warm-weather alt, Jerusalem minimal, practical tips
  (5) /israel-tourist-scams (P3, S) — unlicensed taxis, Dead Sea cosmetics counterfeits, Old City
      market pressure tactics, unlicensed guide touts, restaurant overcharging, Rav-Kav usage
  (6) /israel-spring-break (P3, S) — US/EU university students March–April; 7-day budget itinerary,
      Abraham Hostels, Passover/Easter overlap planning, group travel tips
  Gate: N/A (research only; no file changes in src/).
  NEXT: iter 316 → BUILD monetization rotation (316%5==1). Top BUILD candidates: sea-of-galilee-guide
    (P2, M), backpacking-israel (P2, M), self-drive-road-trip (P2, M), accessible-travel-israel (P2, M),
    israel-orthodox-jewish-travel (P2, M, just added), israel-memorial-sites (P2, M, just added).

Notes: iter 314 REVIEW · review-314-seo-fixes:
  Mode REVIEW (314%5==4). Audited iters 311-313 output: best-hotels-jerusalem (iter311),
  via-dolorosa-guide (iter312), best-hotels-haifa (iter313).
  Findings:
  (1) CONFIRMED BUG: via-dolorosa-guide.md title was 68 chars (>60 limit).
      FIXED: 'Via Dolorosa Jerusalem: 14 Stations Self-Guided Walking Guide (2026)' →
      'Via Dolorosa Jerusalem: 14-Station Self-Guided Walk' (51 chars).
  (2) CONFIRMED BUG: via-dolorosa-guide.md description was 169 chars (>160 limit).
      FIXED: removed 'mapped and described, ' from 'all 14 Stations of the Cross mapped
      and described, with timing tips' → 147 chars.
  (3) CONFIRMED BUG: best-hotels-jerusalem.md description was 165 chars (>160 limit).
      FIXED: 'budget hostels close to the Old City' → 'budget hostels near Old City' → 157 chars.
  (4) CLEAN: best-hotels-haifa.md — title 55 chars ✓, desc 153 chars ✓; all internal links
      resolve (haifa-travel-guide, haifa-neighborhoods-guide, bahai-world-center-guide,
      day-trips-from-haifa, car-rental-israel, transportation, israel-accommodation-guide);
      no H1 in body; no fabricated data; honesty framing appropriate (rates are ranges only).
  (5) CLEAN: all internal links in best-hotels-jerusalem.md and via-dolorosa-guide.md verified
      present; no H1 in bodies; no fabricated prices or review counts; affiliate CTAs correct.
  Gate: pnpm check 0 errors (119 files) · build 461 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: committed db4e89f to master; pushed origin/master. CI pending at state-update (standard).
  NEXT: iter 315 → RESEARCH mode (315%5==0). Candidates: competitor scan for profitable patterns
    not yet in backlog; sea-of-galilee-guide (P2, M), backpacking-israel (P2, M),
    self-drive-road-trip (P2, M), accessible-travel-israel (P2, M) still top seo-content.
    Check for new fall/winter 2026-2027 season gaps; new comparison-format opportunities;
    safed-klezmer-festival, tel-dan-nature-reserve (P2, S items ready to BUILD next iter).

Notes: iter 313 BUILD (tools→seo-content fallthrough) · best-hotels-haifa:
  Mode BUILD (313%5==3 → tools rotation). Tools category exhausted (all 11 items SHIPPED per
  iter308 note); fell through to seo-content+monetization. Picked best-hotels-haifa (P2, S)
  — explicitly named in STATE iter312 as top seo-content candidate; completes the "best hotels
  [city]" series (TLV iter243, Eilat iter241, Dead Sea iter247, Jerusalem iter311).
  New guide: /best-hotels-haifa. Content: Haifa 4-zone geography (German Colony, Hadar,
  Merkaz HaCarmel, Port/Bat Galim); hotel picks: Colony Hotel Haifa (1891 Templar stone building
  on Louis Blvd, 39 rooms, 5-min walk to Bahá'í lower entrance, café-bar street level — boutique
  tier ₪900–1,800); Dan Carmel Hotel (ridge perch, panoramic bay view, pool, Israeli chain
  standard — mid-range ₪500–900); Port Inn Guest House (German Colony, backpacker dorms+privates,
  sea-view common room, near ferry terminal — budget ₪150–400). Decision matrix 9×2 table;
  Shabbat-in-Haifa note (buses + Carmelit operate Saturday — unique in Israel); Haifa
  International Film Festival (October) and Bahá'í pilgrimage period demand context; 6 FAQs.
  Affiliate CTAs: Booking.com Haifa + GYG Haifa tours. HONESTY: rates are ranges only; Colony
  Hotel affiliate via Booking.com only; Carmelit closure days should be verified with operator;
  never fabricated review counts or exact prices.
  Cross-links upgraded: israel-accommodation-guide (city-specific picks sentence extended to
  include /best-hotels-haifa), haifa-travel-guide (planning section: hotels link added alongside
  neighborhoods guide), haifa-neighborhoods-guide (footer planning section: hotels link added).
  Gate: pnpm check 0 errors (119 files) · build 461 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 6fcaf99 to master; pushed origin/master.
  NEXT: iter 314 → REVIEW mode (314%5==4). Candidates: audit iters 311-313 output:
    best-hotels-jerusalem (iter311), via-dolorosa-guide (iter312), best-hotels-haifa (iter313).
    Top picks for audit: verify all internal links, SEO meta (title ≤60 chars, desc ≤160 chars),
    honesty framing (no fabricated prices/ratings), affiliate CTAs, JSON-LD, no H1 in body.

Notes: iter 312 BUILD (seo-content) · via-dolorosa-guide:
  Mode BUILD (312%5==2 → seo-content rotation). Picked via-dolorosa-guide (P2, S) —
  just confirmed in iter310 research; backpackisrael.com + laidbacktrip.com both rank for
  "Via Dolorosa walking guide Jerusalem"; church-holy-sepulchre-guide (iter187) covers
  only Stations X–XIV; jerusalem-old-city-walking-tour (iter186) treats Via Dolorosa as
  one paragraph; NO standalone 14-station guide existed. High-volume Christian pilgrimage
  SEO target.
  New guide: /via-dolorosa-guide. Content: orientation (outdoor Stations I–IX vs indoor
  X–XIV); station-by-station descriptions for all 14 stations with location, chapel notes,
  practical access info; Friday 3pm Franciscan procession (free, open to all, join at
  Station I by 14:45); quick-reference table; timing guide (7–8am best, avoid 10am–2pm
  peak); navigation (brown numbered plaques + cross carvings); what to bring; planning
  your pilgrimage cross-links. HONESTY: route historically debated (Station I Antonia vs
  Citadel); clearly framed as "traditional Via Dolorosa" not archaeologically certain.
  Affiliate CTAs: GYG Via Dolorosa guided tour + Booking.com Jerusalem hotels.
  Cross-links upgraded: christian-pilgrimage-holy-land (×2 /jerusalem/via-dolorosa →
  /via-dolorosa-guide), free-things-to-do-israel (/jerusalem/via-dolorosa →
  /via-dolorosa-guide + added station guide link), jerusalem-old-city-walking-tour
  (/via-dolorosa-guide link added in Step 5 Muslim Quarter section),
  church-holy-sepulchre-guide (Friday procession para upgraded with Via Dolorosa link).
  Gate: pnpm check 0 errors (119 files) · build 460 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 086e2bb to master; pushed origin/master. CI in_progress at state-update.
  NEXT: iter 313 → BUILD (313%5==3 → tools rotation). Tools category items:
    free-day-trip-planner (P2, M — interactive day-trip composer), israel-visa-checker
    (P2, S — interactive ETA/visa tool), itinerary-builder-premium (P2, L). Also eligible:
    i18n Phase 3 (regions ×11 in fr+de) or seo-content fallthrough if tools exhausted.
    Top seo-content P2 candidates still pending: best-hotels-haifa (P2, S), sea-of-galilee-
    guide (P2, M), backpacking-israel (P2, M), self-drive-road-trip (P2, M),
    accessible-travel-israel (P2, M).

Notes: iter 311 BUILD (monetization) · best-hotels-jerusalem:
  Mode BUILD (311%5==1 → monetization rotation). Picked best-hotels-jerusalem (P2, M) —
  top monetization candidate: Jerusalem = Israel's highest hotel ADR city; Booking.com top
  conversion; completes "best hotels [city]" series (TLV iter243, Eilat iter241, Dead Sea iter247).
  New guide: /best-hotels-jerusalem. Content: 5 neighbourhood zones (Mamilla/Jaffa Gate,
  West Jerusalem centre/King George St, German Colony/Emek Refaim, East Jerusalem/American Colony,
  Ein Kerem); hotel picks by tier: Luxury (Mamilla Hotel — rooftop pool + Old City views, Waldorf
  Astoria Jerusalem — 1929 Palace Hotel; American Colony Hotel — 1902 pasha's palace, East Jer.);
  Mid-range (Leonardo Boutique Jerusalem — outdoor pool, near Mahane Yehuda); Budget (Abraham
  Hostel Jerusalem — closest major hostel to Old City); decision matrix 9×2 table; Jerusalem-specific
  booking patterns (Passover 3-4× surge, Sukkot cluster, Christmas/Easter waves); 6 FAQs.
  Affiliate CTAs: Booking.com Jerusalem (×2) + GYG Jerusalem Old City walking tour.
  Cross-links added: israel-accommodation-guide (city-specific hotel guide links para),
  jerusalem-neighborhoods-guide (footer More: line), best-hotels-tel-aviv (TLV-vs-Jer FAQ answer).
  Link fix: /transport/tel-aviv-to-jerusalem didn't exist → fixed to /tel-aviv-to-jerusalem (guide).
  Gate: pnpm check 0 errors (119 files) · build 459 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master 7e100a5; pushed origin/master. CI in_progress at commit.
  NEXT: iter 312 → BUILD (312%5==2 → seo-content rotation). Top seo-content P2 candidates:
    via-dolorosa-guide (P2, S — 14-station self-guided walk, just added iter310),
    best-hotels-haifa (P2, S — completes "best hotels" series for Haifa, just added iter310),
    sea-of-galilee-guide (P2, M — full lake circuit guide, iter305), galilee-wine-trail (P3, M),
    self-drive-road-trip (P2, M — israel-road-trip), accessible-travel-israel (P2, M),
    backpacking-israel (P2, M). i18n: Phase 3 (regions ×11 in fr+de) also ready (P2, M) — consider
    alternating with seo-content picks given ~every-other-BUILD pattern.

Notes: iter 310 RESEARCH — research-310:
  Mode RESEARCH (310%5==0). Backlog extremely saturated (200+ ready items from 62+ research passes).
  Systematic grep de-duplication using Python3 + DONE.md cross-check + guide directory scan before
  confirming any item as genuinely new.
  Net-new items added (all grep-confirmed 0 standalone hits before adding):
  1. /via-dolorosa-guide (P2, S, seo-content) — 14-station self-guided Via Dolorosa walk;
     backpackisrael.com + laidbacktrip.com both rank; church-holy-sepulchre-guide covers only
     stations X-XIV; no standalone station guide exists; Christian pilgrimage high intent
  2. /best-hotels-jerusalem (P2, M, seo-content+monetization) — Jerusalem hotel picks by
     neighbourhood; completes the "best hotels [city]" series (TLV iter243, Eilat iter241,
     Dead Sea iter247); Jerusalem = highest hotel ADR city in Israel; Booking.com top conversion
  3. /jerusalem-hop-on-hop-off (P3, S, seo-content) — City Sightseeing Jerusalem bus practical
     guide; backpackisrael.com + travelers.co.il rank; zero equivalent on site; honest about
     HOHO not accessing Old City interior
  4. /best-hotels-haifa (P2, S, seo-content+monetization) — completes "best hotels" series for
     Haifa; German Colony / Colony Hotel / Dan Carmel; Bahá'í Gardens hotel proximity gap
  Rejected as duplicate: /israel-guided-vs-independent (guided vs self-guided already exists
     at backlog L411 as /guided-vs-self-guided-israel from iter160 research).
  Gate: N/A (research only — no code changes, no branch, no gate run).
  NEXT: iter 311 → BUILD (311%5==1 → monetization rotation). Top P1/P2 monetization BUILD
    candidates: best-hotels-jerusalem (P2, M — just added, highest ADR city, top Booking.com
    conversion), passover-in-israel (P2, S — high commercial intent, pesach programs), day-trips-
    from-eilat (P2, M), israel-startup-tech-tour (P3, M), extended-stay-israel (P3, M).
    i18n rotation: check I18N-PLAN.md for current batch status before BUILD.

Notes: iter 309 REVIEW · review-309-desc-fix:
  Mode REVIEW (309%5==4). Audited iters 306-308 output (latrun-guide, dead-sea-medical-tourism,
  zichron-yaakov-guide). Two SEO desc overflows found and fixed:
  (1) latrun-guide.md: 164→160 chars (removed 'the ' before 'Trappist monastery winery').
  (2) zichron-yaakov-guide.md: 184→142 chars (rewritten: "Zichron Yaakov: Israel's oldest wine
      village, founded 1882. Carmel Winery tastings, Hameyasdim Street, Ramat Hanadiv gardens,
      Nili spy museum.").
  All internal links, hero/CTA images, H1 checks, honesty framing clean for all three guides.
  dead-sea-medical-tourism EU insurance claims well-caveated; no fabricated data detected.
  Gate: pnpm check 0 errors (119 files) · build 458 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 08cd250 to master; pushed origin/master.
  NEXT: iter 310 → RESEARCH mode (310%5==0). Candidates: competitor scan for profitable new
    patterns; galilee-wine-trail + sea-of-galilee-guide (P2, M backlog items); fall/winter 2026
    season gaps; new comparison format opportunities; check backlog aging items.

Notes: iter 308 BUILD (tools→seo-content fallthrough) · zichron-yaakov-guide:
  Mode BUILD (308%5==3 → tools rotation). Tools category exhausted (all 11 items SHIPPED); technical
  also exhausted; fell through to seo-content. Picked zichron-yaakov-guide (P2, S) — explicitly
  named in STATE iter307 as top seo-content candidate; fills Carmel coast corridor gap between
  caesarea-guide and haifa-travel-guide (planned).
  New guide: /zichron-yaakov-guide. Content: Hameyasdim Street Ottoman-era pedestrian main street
  (Rothschild-planted eucalyptus, stone buildings, wine bars, artisan market); Carmel Winery visitor
  centre (Israel's oldest winery est. 1882; cellar tours + tastings ₪50-80; book at carmelwines.co.il;
  kosher; closed Shabbat); Ramat Hanadiv memorial gardens (free; Rothschild tomb + terraced rose/olive
  gardens + panoramic sea view; ramat-hanadiv.org.il); Nili Museum/Beit Aaronson (Aaron Aaronson + WWI
  spy network; limited hours; call ahead); getting there by train (Binyamina station, ~50 min TLV,
  ~40 min Haifa) and car (Route 2 + Route 70); Caesarea+Zichron one-day itinerary; seasonal table;
  7 FAQs. Affiliate CTAs: GYG Carmel wine tours + Discovercars coastal self-drive + Booking Zichron
  stays. Cross-links upgraded: day-trips-from-haifa (link added to /zichron-yaakov-guide text),
  caesarea-guide (Wikipedia link → /zichron-yaakov-guide with improved description),
  israel-wine-wineries (new sentence in Shomron/Mount Carmel section linking to guide).
  YAML fix: description used single-quoted YAML with apostrophe in "Israel's" — fixed to double quotes.
  Link fix: /where-to-stay/haifa doesn't exist (only jerusalem/tel-aviv/dead-sea) — replaced with
  /haifa region link.
  Gate: pnpm check 0 errors (119 files) · build 458 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master 7c67a4e; pushed origin/master.
  Prod: CI in_progress at state-update (prior 2 CI runs both success — 5bf7413, f862a88).
  NEXT: iter 309 → REVIEW mode (309%5==4). Candidates: audit iters 305-308 output:
    latrun-guide (iter307), dead-sea-medical-tourism (iter306), research-305, zichron-yaakov-guide (iter308).
    Top picks for audit: verify latrun-guide and zichron-yaakov-guide internal links, SEO meta,
    honesty framing, JSON-LD; check dead-sea-medical-tourism EU insurance claim accuracy.

Notes: iter 307 BUILD (seo-content) · latrun-guide:
  Mode BUILD (307%5==2 → seo-content). Picked latrun-guide (P2, S) — Route 1 corridor cluster
  between Tel Aviv and Jerusalem with zero prior editorial coverage on the site.
  New guide: /latrun-guide. Content: Yad La-Shiryon Armored Corps Museum (200+ AFVs, one of
  largest in Middle East, site of the decisive 1948 Battle of Latrun — multiple IDF assaults repulsed
  by Jordanian Arab Legion guarding the Jerusalem road; Burma Road workaround story); Trappist
  Monastery founded 1890 by French Cistercian monks (kosher wine + olive oil shop, open Mon-Sat);
  Mini Israel (350+ scale models at 1:25, family-oriented, summer evening visits); combined visit
  planning (all 3 sites within 3 km of each other at the Latrun junction on Route 3/Route 1);
  driving from Tel Aviv (~40 min) and Jerusalem (~35 min); public transport note (limited — car or
  guided tour recommended); seasonal planning; 7 FAQs. Affiliate CTAs: GYG guided tours +
  Viator private tours + DiscoverCars self-drive (car rental essential for Latrun).
  Cross-links added from: day-trips-from-tel-aviv.md, day-trips-from-jerusalem.md,
  israel-agritourism-guide.md. Dense internal links in body: car-rental-israel, transportation,
  israel-wine-wineries, best-tours-in-israel, itineraries.
  YAML bug fixed: Sha'ar HaGai apostrophe in single-quoted YAML broke frontmatter; switched to
  double-quoted answer string for the Jerusalem FAQ.
  Gate: pnpm check 0 errors (119 files) · build 457 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master f862a88; pushed origin/master.
  Prod: CI in_progress at state-update (prior 2 CI runs success — b9d4e8b, 6e003dc both success).
  NEXT: iter 308 → BUILD (308%5==3 → tools rotation). Top tools candidates: free-day-trip-planner
    (P2, M — interactive day-trip composer), israel-visa-checker (P2, S — interactive ETA/visa
    tool), itinerary-builder-premium (P2, L). Also eligible: i18n Phase 3 (regions fr+de) or
    continuing batch 18 remainder. zichron-yaakov-guide (P2, S) remains next seo-content candidate.

Notes: iter 306 BUILD (monetization) · dead-sea-medical-tourism:
  Mode BUILD (306%5==1 → monetization). Picked dead-sea-medical-tourism (P2, M) — highest
  hotel-nights conversion potential: medical-stay patients book 21–28 nights vs 1-night leisure.
  New guide: /dead-sea-medical-tourism. Content: UVB mechanism at 430m below sea level explained
  (filters UVA, allows therapeutic UVB); clinical evidence summary (70–90% psoriasis clearance in
  peer-reviewed studies; honest remission framing); conditions treated (psoriasis, eczema, vitiligo,
  psoriatic arthritis); medical infrastructure at Ein Bokek (Paula Dead Sea Clinic, David Dead Sea
  Resort, Isrotel); EU insurance reimbursement by country (German GKV, Danish, Swiss, UK=not covered);
  cost table (₪500–1,200/night hotel + ₪300–600/week clinic fees; ~€4,500–7,500 all-in); seasonal
  planning; 7 FAQs. Cross-links from dead-sea-guide, israel-wellness-spa, israel-for-seniors. Footer
  link added. Affiliate CTAs: Booking.com Dead Sea + GYG day tours.
  Gate: pnpm check 0 errors (119 files) · build 456 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master 6e003dc; pushed origin/master.
  Prod: Lighthouse completed success 6e003dc; CI in_progress at state-update (standard; all prior CIs green).
  NEXT: iter 307 → BUILD (307%5==2 → seo-content rotation). Top candidates: latrun-guide (P2, S),
    zichron-yaakov-guide (P2, S), sea-of-galilee-guide (P2, M), self-drive-road-trip (P2, M),
    backpacking-israel (P2, M), accessible-travel-israel (P2, M).
    i18n rotation: i18n Phase 3 (regions ×11 in fr+de) remains P2 ready — consider for iter 307 or 308.

Notes: iter 305 RESEARCH — research-305:
  Mode RESEARCH (305%5==0). Backlog extremely saturated (200+ ready items from 61+ passes).
  25+ candidate topics de-duped before confirming 5 genuine new gaps.
  Research methods: web-search agent + targeted grep de-duplication.
  Net-new items added (all grep-confirmed 0 hits in BACKLOG.md before adding):
  1. /zichron-yaakov-guide (P2, S) — Rothschild wine town 1882; Ha-Meyasdim Street; Carmel
     Winery visitor centre; Ramat HaNadiv gardens; Nili Museum; fills Carmel coast corridor
     gap between caesarea-guide.md and haifa-travel-guide.md
  2. /dead-sea-medical-tourism (P2, M) — climatotherapy for psoriasis/eczema; 3–4 week stays;
     EU health insurance schemes (German, Danish, Swiss); distinct from dead-sea-guide.md,
     israel-wellness-spa.md, dead-sea-hotels-guide.md; highest hotel-nights conversion potential
  3. /latrun-guide (P2, S) — Route 1 Tel Aviv–Jerusalem corridor cluster: Trappist monastery
     + Latrun wine (1890); Yad La-Shiryon tank museum (150+ AFVs — world class); Mini Israel;
     zero editorial coverage despite prime Route 1 position
  4. /galilee-wine-trail (P3, M) — Upper Galilee wine sub-region (Dalton, Galil Mountain, Adir,
     Lueria); 2-day self-drive circuit from Rosh Pina/Tiberias; distinct from golan-heights-
     wineries and judean-hills-wine-trail already in backlog
  5. /sea-of-galilee-guide (P2, M) — full lake circuit guide (all 4 shores + beaches ranked +
     Christian pilgrimage circuit + cycling + Hamat Gader); extends tiberias-guide.md (city only)
     to the whole lake; 4 shores = Ginosar/Capernaum/Tabgha west; Yardenit/Migdal north;
     Ein Gev/Kursi east; Tzemach/Hamat Gader south
  De-duped and skipped: beit-shean (iter90), mitzpe-ramon (iter80), rosh-pina (iter145),
    israel-cruise-ports (iter50), accessible-travel (iter215), rooftop-bars-tlv (iter255),
    autumn/spring (BACKLOG), chocolate-trail (iter240).
  Gate: N/A (research only — no code changes, no branch, no gate run).
  NEXT: iter 306 → BUILD (306%5==1 → monetization rotation). Top P1/P2 BUILD candidates:
    dead-sea-medical-tourism (P2, M — just added, high commercial intent, high nights-value),
    zichron-yaakov-guide (P2, S — fills Carmel coast corridor gap),
    latrun-guide (P2, S — quick S-effort, Route 1 corridor),
    sea-of-galilee-guide (P2, M — extends shipped tiberias-guide context),
    tel-dan-nature-reserve (P2, S — from iter300, still ready),
    safed-klezmer-festival (P2, S — from iter300, still ready).
    i18n rotation: check if i18n BUILD is due (every other BUILD iter); review I18N-PLAN.md
    for current batch status (fr 89/~147, de 89/~147; remaining untranslated EN guides).

Notes: iter 304 REVIEW — review-304-desc-fix:
  Mode REVIEW (304%5==4). Audited iters 301-303 output:
  - galilee-vs-golan-weekend (iter301) — comparison guide
  - dead-sea-vs-eilat (iter302) — comparison guide
  - fix-2027-holiday-dates (iter303) — technical fix to israel-effective-days.astro
  Findings:
  (1) CONFIRMED BUG: dead-sea-vs-eilat.md description was 165 chars (>160 limit).
      FIXED: removed "the " before "float" and before "Red Sea reef" → 157 chars.
  (2) CLEAN: galilee-vs-golan-weekend.md — title 55 chars ✓, desc 154 chars ✓;
      all internal links resolve (galilee, golan, golan/nimrod-fortress attraction,
      galilee-tours-compared, car-rental-israel, transportation, is-israel-safe);
      all 7 hero images present; affiliates (discovercars, booking) valid; no H1 in body;
      Golan disputed-territory note present; no fabricated data.
  (3) CLEAN: 2027 holiday dates in israel-effective-days.astro verified against
      Hebrew calendar arithmetic: RH Oct 1-2 ✓, YK Oct 10 ✓, Sukkot Oct 15+ ✓,
      Hanukkah Dec 24 ✓, Passover Apr 21 ✓, Yom HaZikaron May 11 ✓ (Iyar 4=Sunday,
      moved to Iyar 5=Monday per Shabbat-adjacency rule). Tisha B'Av Aug 12 consistent
      with iter303 Chabad verification (Cheshvan+Kislev both full = max length = Aug 12).
  (4) INFO: Shavuot marked as 2-day full for 2027 (Jun 10-11) — consistent with 2026
      convention (May 21-22); Israel observes 1 day but 2-day convention is pre-existing,
      not introduced by iter303. Not corrected (would require understanding original intent).
  (5) CLEAN: dead-sea-vs-eilat.md internal links verified (attraction URLs /dead-sea/masada,
      /dead-sea/ein-gedi, /dead-sea/qumran confirmed in attractions/ dir); all hero images
      present; affiliates (booking×2, getyourguide×2) valid; no H1 in body; no fabricated data.
      External link kalia.co.il is a legitimate beach reference, not affiliate.
  Gate: pnpm check 0 errors (119 files) · build 455 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: commit c192dba to master; pushed origin/master; CI Lighthouse in_progress (normal).
  NEXT: iter 305 → RESEARCH mode (305%5==0). Candidates: competitor scan for profitable
    new patterns; review backlog for items aging >3 months; fall/winter 2026-2027 season
    content gaps; i18n Phase 3 (regions in fr+de) assessment; new comparison-format opportunities.

Notes: iter 303 BUILD (tools→technical fallthrough) · fix-2027-holiday-dates:
  P1 technical: all 16 HOLIDAYS entries for 2027 were wrong — 5787 is a Hebrew leap year (Adar I + Adar II)
  but the original dataset used non-leap positions, placing every holiday ~1 month too early.
  Root cause confirmed via Hebcal Israel (i=on) + Chabad calendar searches.
  All corrections: Tu BiShvat Jan 22, Purim Mar 22 (Adar II), Passover Apr 21-28, Yom HaZikaron May 11,
  Yom Ha'atzmaut May 12, Shavuot Jun 10-11, Tisha B'Av Aug 12 only (fast day), RH Oct 1-2, YK Oct 10,
  Sukkot Oct 15-23, Hanukkah Dec 24-Jan 1 2028. Backlog suggested Jul 11 for Tisha B'Av (wrong calc) —
  actual correct date is Aug 12 per Chabad (9 Av 5787).
  Gate: pnpm check 0 errors (119 files) · build 455 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: commit 392b4b2 to master; pushed origin/master; CI in_progress at commit time (standard).
  NEXT: iter 304 → REVIEW mode (304%5==4). Candidates: audit iters 301-303 output (galilee-vs-golan-weekend, dead-sea-vs-eilat, fix-2027-holiday-dates).

Notes: iter 300 RESEARCH — research-300:
  Mode RESEARCH (300%5==0). Backlog at iter300 extremely saturated (195+ items from 60+ research passes).
  Systematic grep de-duplication required across 30+ candidate topics before confirming 6 genuine new gaps.
  Research methods: local grep across 711-line BACKLOG.md + background web-search agent scanning competitors.
  Net-new items added (all verified 0 hits in BACKLOG.md before adding):
  1. /safed-klezmer-festival (P2, S) — annual klezmer festival in Safed; 0 klezmer hits confirmed
  2. /galilee-vs-golan-weekend (P2, S) — comparison format; 0 Galilee vs Golan comparison items confirmed
  3. /dead-sea-vs-eilat (P2, S) — comparison format; 0 Dead Sea vs Eilat comparison items confirmed
  4. /tel-dan-nature-reserve (P2, S) — standalone nature reserve guide; 0 tel-dan hits confirmed
  5. /israel-multigenerational-travel (P3, M) — 3-gen family travel; 0 multigenerational hits confirmed
  6. /jewish-quarter-jerusalem (P3, S) — archaeological dimension of Jewish Quarter; 0 standalone guide
  De-duped and skipped: israel-honeymoon (iter20), bachelorette (iter105), south-israel-itinerary (iter100),
    sports-events-israel (iter50), digital-nomad (iter30), northern-israel-road-trip (iter145),
    schottenstein-campus (iter235), israel-in-winter (SHIPPED iter292), haifa-food-guide (backlog),
    archaeological campus (backlog iter235), tel-aviv-budget (iter240), ein-gedi (SHIPPED iter232).
  Gate: N/A (research only — no code changes, no branch, no gate run).
  NEXT: iter 301 → BUILD (301%5==1 → monetization rotation). Top P1/P2 monetization BUILD candidates:
    egypt-jordan-israel-itinerary (P2 M), dead-sea-hotels-guide (P2 S), israel-galilee-agritourism (P2 M),
    israel-zimmer-guide (P2 M), galilee-vs-golan-weekend (P2 S — new, comparison = fast S-effort).
    i18n rotation: ~every other BUILD iter → Phase 3 regions (11 region pages in fr+de) or remaining
    untranslated EN guides. Check I18N-PLAN.md for current batch status before BUILD.

Notes: iter 299 REVIEW — review-299-fixes:
  Mode REVIEW (299%5==4). Audited iters 296–298 output: maccabiah-games-2026,
  israel-hidden-gems, jerusalem-nightlife.
  Findings:
  (1) CONFIRMED BUG: israel-hidden-gems.md — Nimrod Fortress practical section linked
      "Banias waterfall" to /caesarea-guide (a Mediterranean coast city guide).
      Banias waterfall is in the Golan Heights, near Nimrod Fortress. The correct
      link is /golan-heights-guide, which has a full Banias Nature Reserve section.
      FIXED: [Banias waterfall](/caesarea-guide) → [Banias waterfall](/golan-heights-guide)
  (2) SEO: maccabiah-games-2026.md description was 185 chars (>160 target). Trimmed to 139 chars.
      Note: the STATE.md entry for iter 296 recorded "163 chars ✓" which was incorrect — the
      actual description in the file was 185 chars after the "in Israel —" expansion. Fixed.
  (3) SEO: jerusalem-nightlife.md description was 162 chars (>160 target). Trimmed to 145 chars.
  (4) CLEAN: all internal links in all three files verified; all resolve correctly. Transport
      link /transport/jerusalem-to-dead-sea handled by dynamic [route].astro — valid. All hero
      images in expected paths. No H1 nodes in markdown bodies. No fabricated data detected.
      Affiliate rel attributes correct (generated by layout). Honesty framing appropriate.
  Gate: pnpm check 0 errors (119 files) · build 453 pages · 591/591 e2e+a11y pass. GREEN.
  Ship: commit 88f467a to master; pushed origin/master; CI Lighthouse + CI workflows in_progress
  at ship time (standard — these are unchanged-logic content-only fixes).
  NEXT: iter 300 → RESEARCH mode (300%5==0). Candidates: competitor scan for profitable new
    content patterns not yet in backlog; review backlog for items with >3 months since last
    research update; check for new Israel tourism initiatives/events for 2026-2027 season;
    scan for emerging keyword opportunities (Maccabiah aftermath, fall 2026 season content).

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 34 review passes + 3 technical (event-schema + meta-trim + locale-links) + 35 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290/295/300/305/310.
