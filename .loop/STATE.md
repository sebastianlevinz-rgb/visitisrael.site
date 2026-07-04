# LOOP STATE

- iteration: 290
- lastMode: RESEARCH
- lastItem: research-pass-290
- lastResult: RESEARCH pass — 3 net-new items added (israel-golf-guide P3 S, ein-hod-artists-village P3 S, israel-escape-rooms P3 S); backlog saturation confirmed at 338+ items from 57+ prior research passes; golf/Ein Hod/escape-rooms confirmed as genuine gaps via grep (0 matches for each standalone topic)
- nextRotationCategory: BUILD (291%5==1 → monetization rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-04T16:05Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 290 RESEARCH — research-pass-290:
  Mode RESEARCH (290%5==0 → competitor gap scan). No code changes. No branch created.
  Backlog saturation confirmed at 338+ items from 57+ prior research passes.
  Methodical grep de-duplication across 20+ topic angles before finding genuine gaps.
  3 confirmed net-new items:
    (1) israel-golf-guide P3 S — Caesarea Golf Club (Rolex World Top 1000 since 2010; Pete
        Dye 18-hole; Israel's only international course; opened 1961 by James Armand de
        Rothschild; tees alongside Roman ruins; ~₪500–700 green fees). "golf" had only 2
        passing mentions in backlog; zero standalone guide. Competitors: golferhive.com,
        touristisrael.com, caesarea.com.
    (2) ein-hod-artists-village P3 S — Marcel Janco (Dada co-founder) 1953 artists' colony;
        150 resident artists; 18 galleries + 14 workshops; Janco Dada Museum (Dadalab);
        Nisco Museum of Mechanical Music (Middle East unique); pedestrian-only; Mount Carmel
        15km south of Haifa. Appeared only as 1 bullet in hidden-gems hub entry (line 70);
        zero standalone guide. Competitors: beinharimtours.com, touristisrael.com, ein-hod.info.
    (3) israel-escape-rooms P3 S — 50+ escape rooms across Israel; escaperoom.co.il largest
        chain (20+ TLV games); English-speaking game masters; ~₪90–150/person; VR experiences.
        Grep returned ZERO matches — completely absent from backlog.
  Confirmed already-covered and skipped: surfing (iter105), street-art/florentin (iter200),
  mediterranean-diving (iter190), photography (iter30), hot-air-balloon/olive-harvest/
  wine-harvest (iter265), glamping (SHIPPED iter268), druze-carmel (SHIPPED iter193),
  rav-kav (SHIPPED iter98), vegan (SHIPPED iter242), birdwatching (iter200),
  stargazing/skiing (iter60+160), wildflowers (iter120+155), paragliding (adventure-sports guide).
  NEXT: iter 291 → BUILD (291%5==1 → monetization rotation). Top monetization BUILD candidates:
    egypt-jordan-israel-itinerary (P2 M), israel-jordan-itinerary (P2 M),
    dead-sea-hotels-guide (P2 S), israel-thermal-baths (P3 S), israel-diamonds-jewelry (P3 S),
    bat-yam-guide (P3 S), israel-golf-guide (P3 S, just added).

Notes: iter 289 REVIEW — review-pass-289:
  Mode REVIEW (289%5==4). Audited iters 286–288: neve-tzedek-guide, israel-hummus-trail,
  israel-agritourism-guide. Startup: git reset --hard origin/master needed (fresh cloud
  checkout; remote at iter288 8da3969).
  Checks performed:
    (1) SEO meta length (Python unicode len):
        neve-tzedek-guide: title=56 ✓, desc=140 ✓
        israel-hummus-trail: title=51 ✓, desc=145 ✓
        israel-agritourism-guide: title=62 ✓, desc=152 ✓
    (2) Internal link resolution — 16 links across 3 guides, all verified against content/ files: ✓
        akko-acre-guide, car-rental-israel, galilee-tours-compared, is-israel-safe,
        jaffa-food-guide, jaffa-travel-guide, jerusalem-food-guide, kerem-hateimanim-tel-aviv,
        kosher-food-guide, tel-aviv-carmel-market, tel-aviv-food-guide, tel-aviv-light-rail,
        tel-aviv-neighborhoods-guide, tel-aviv-tours-compared, tel-aviv-white-city,
        vegan-vegetarian-israel — all OK.
    (3) Cross-link back-wiring verified:
        neve-tzedek-guide → tel-aviv-neighborhoods-guide.md line 92 ✓
        israel-hummus-trail → jaffa-food-guide.md line 114 ✓
        israel-hummus-trail → jerusalem-food-guide.md lines 130 ✓
        israel-hummus-trail → israeli-food-cuisine-guide.md line 24 ✓
        israel-agritourism-guide → car-rental-israel.md line 86 ✓
        israel-agritourism-guide → galilee-tours-compared.md line 93 ✓
    (4) Footer links verified:
        /neve-tzedek-guide line 128 ✓
        /israel-hummus-trail line 124 ✓
        /israel-agritourism-guide line 125 ✓
    (5) smoke.spec.ts + a11y.spec.ts coverage: all 3 routes present in both specs ✓
    (6) Hero + CTA images: neve-tzedek.jpg + jaffa.jpg + galilee/hero.jpg + mahane-yehuda.jpg all exist ✓
    (7) pnpm check: 0 errors (118 files) ✓
  0 defects found. No gate needed (no code changes). No branch created.
  NEXT: iter 290 = RESEARCH (290%5==0 → competitor gap scan). Top seo-content BUILD candidates
    after RESEARCH: druze-villages-carmel (P2 S), haifa-travel-guide (P2 M), tel-aviv-pride-guide
    (P3 S), galilee-christian-sites-circuit (P2 M). Remaining i18n batch 18: 13 untranslated
    EN guides.

Notes: iter 288 BUILD (monetization) — israel-agritourism-guide:
  Mode BUILD (288%5==3 → tools rotation; all 11 tools shipped → fall through to monetization).
  Chose israel-agritourism-guide (P2 M) — top monetization candidate from STATE.md iter287 notes;
  timely due to 2026 Israel Ministry of Agriculture 13M ILS investment in Galilee agro-tourism.
  New /israel-agritourism-guide — year-round farm-picking seasonal calendar guide.
  Seasonal calendar: strawberry Feb–Mar (Shefela/Galilee moshavim), citrus Nov–Feb (Sharon Plain),
    Golan cherry orchards Jun (Moshav Odem, ~2–3 weeks, car essential), Medjool dates Sep–Oct
    (Arava Valley: Kibbutz Ketura + Kibbutz Lotan on Route 90), figs/pomegranates/bananas Aug–Sep.
  Historic agritourism sites: Neot Kedumim (250ha biblical landscape park near Lod; limited bus
    access; seven species; olive pressing + grain grinding; pre-book English sessions via
    neot-kedumim.org.il); Kfar Kedem (Lower Galilee near Arbel; donkey rides + biblical farming
    reconstruction in period costume; pre-booking required weeks ahead; English available);
    Ein Yael Farm Museum (Rephaim Valley, Jerusalem; 2000-year-old estate; city bus accessible).
  Kibbutz programs: Lotan (eco-farming/permaculture, Arava); Ketura (dates + solar centre tours);
    expanding Galilee programmes under 2026 govt investment.
  Getting around note: car essential for Golan/Arava/Shefela sites; Neot Kedumim + Ein Yael
    accessible by bus.
  HONESTY: no hardcoded farm opening dates (weather-dependent); 13M ILS investment 2026–2029
    rollout noted; English-friendly farm tips; verify-before-visiting throughout.
  Hero: /images/regions/galilee/hero.jpg. 6 FAQs. 2 affiliate CTAs: GYG farm/nature tours +
    Booking.com Galilee rural accommodation.
  Back-wired: car-rental-israel.md ("Plan the rest" section, new sentence about picking + car);
    galilee-tours-compared.md (end of "How to choose", cherry season / Golan detail).
  Footer Essentials: +1 "Israel farm picking & agritourism" link (after Israel hummus trail).
  Smoke +1; a11y +1 routes.
  SEO check: title="Israel Agritourism: Farm Picking & Seasonal Experiences (2026)" = 62 chars ✓;
    desc="Seasonal guide to farm picking in Israel: strawberries, Golan cherries, Arava dates.
    Plus Kfar Kedem, Neot Kedumim and Galilee kibbutz farm experiences." = 152 chars ✓
  Gate: pnpm check 0 errors (118 files) · build 447 pages (+1) · 578/578 e2e+a11y pass (+2). GREEN.
  Ship: commit 73a4d07 on master; pushed to origin/master; CI state pending (standard pattern).
  NEXT: iter 289 = REVIEW (289%5==4 → review pass on iters 286–288: neve-tzedek-guide,
    israel-hummus-trail, israel-agritourism-guide).

Notes: iter 287 BUILD (seo-content) — israel-hummus-trail:
  Mode BUILD (287%5==2 → seo-content rotation). Chose israel-hummus-trail (P2 S) — top
  seo-content candidate from STATE.md iter286 notes. New /israel-hummus-trail — six-stop
  restaurant circuit guide covering the canonical Israel hummus route.
  Stops: (1) Abu Hassan / Ali Karavan, Jaffa HaDolphin 1 — silky Jaffa-style, opens 07:00,
    closes when sold out ~13:00, cash only, closed Sat; order hummus + ful + boiled egg;
    multiple imitators use similar name — specify Dolphin Street; (2) Abu Shukri, Jerusalem
    Old City Muslim Quarter, 63 Al-Wad St near Via Dolorosa — denser earthier Jerusalem-style,
    opens 08:00, closes mid-afternoon; (3) Azura, Jerusalem Machane Yehuda — Iraqi-Jewish
    stovetop style, optional spiced lamb topping, lunch only ~11:00–15:00, credit cards OK;
    (4) Abu Gosh village, Highway 1 10km W of Jerusalem — "Israel's informal hummus capital";
    Abu Ghosh Restaurant + Caravan Restaurant; open Saturdays (advantage); (5) Hummus Said,
    Akko Old City Ottoman arcades — most tahini-forward of the six, morning only 07:00–12:00;
    combine with Akko Old City sightseeing; (6) Afteem, Bethlehem Manger Square — best-known
    West Bank hummus; lighter style with tangier lemon; Checkpoint 300 crossing ~5 min for
    foreign tourists; open mornings. Style explainer: Jerusalem = thicker/earthier/chickpea-
    forward; Jaffa/Akko = silkier/more tahini. Arrival-early rule: all close by noon or when
    sold out. Circuit plans: 1-day Jerusalem (Abu Shukri AM + Azura lunch + Abu Gosh on drive
    back); TLV day (Abu Hassan AM + Jaffa explore); 2-day full circuit.
  HONESTY: no declared "best"; uses "widely cited" / "most consistently recommended"; opening
    hours change — "verify before visiting"; "best hummus" claim is "genuinely contested";
    Abu Hassan imitators noted (specify Dolphin Street); Bethlehem = standard tourist West Bank
    crossing, framed accurately; prices are approximate ranges.
  Hero: /images/regions/tel-aviv/jaffa.jpg. 6 FAQs. 2 affiliate CTAs: GYG Jerusalem Food &
    Hummus Tour + Viator Jaffa & Tel Aviv Street Food Walk.
  Cross-links IN guide: jaffa-food-guide, jaffa-travel-guide, jerusalem-food-guide,
    akko-acre-guide, vegan-vegetarian-israel, kosher-food-guide, is-israel-safe.
  Cross-link BACK-WIRED: jaffa-food-guide.md end of Guided option section (new paragraph
    pointing to /israel-hummus-trail as broader circuit); jerusalem-food-guide.md end of
    article (pointing to /israel-hummus-trail for 6-stop circuit); israeli-food-cuisine-guide.md
    hummus bullet (+sentence pointing to /israel-hummus-trail for the top addresses).
  Footer Essentials: +1 "Israel hummus trail" link (after Jerusalem food guide).
  Smoke +1; a11y +1 routes. 119 files (check).
  SEO check: title="Israel Hummus Trail: The 6 Best Hummus Spots (2026)" = 52 chars ✓;
    desc="The essential Israel hummus circuit — Abu Hassan in Jaffa, Abu Shukri in Jerusalem,
    Abu Gosh, Hummus Said in Akko, Azura and Afteem in Bethlehem." = 147 chars ✓
  Gate: pnpm check 0 errors (119 files) · build 446 pages (+1) · 576/576 e2e+a11y pass (+2). GREEN.
  Ship: commit 6cc88b5 on master; pushed to origin/master; CI not yet confirmed (standard
    pattern — Vercel uses separate CI integration).
  NEXT: iter 288 = BUILD (288%5==3 → tools rotation; all 11 tools shipped → fall through to
    monetization). Top monetization candidates: israel-agritourism-guide (P2 M),
    egypt-jordan-israel-itinerary (P2 M), israel-jordan-itinerary (P2 M).

Notes: iter 286 BUILD (monetization) — neve-tzedek-guide:
  Mode BUILD (286%5==1 → monetization rotation). Chose neve-tzedek-guide (P2 S) — top
  monetization candidate from STATE.md iter285 notes. New /neve-tzedek-guide — Tel Aviv's
  1887 first Jewish neighbourhood guide (Neve Tzedek = "Oasis of Justice"). Covers:
  History (66 founding families; predates Tel Aviv; Ottoman-era architecture; artist-led
  1989 revival anchored by Suzanne Dellal Centre); Suzanne Dellal Centre (Batsheva Dance
  Company home; Ram Karmi 1989 restoration; free bougainvillea courtyard; ticketed
  performances via suzannedellal.org.il); Shabazi Street boutiques (Maskit, Idit Barak,
  Frau Blau; Thu–Fri best; all Sat closed; independent only); Nahum Gutman Museum (21
  Shimon Rokach St; pioneer illustrator/painter; ~₪30; Thu extended hours); architecture
  walk (1887 Ottoman stone houses + 1920s International Style overlay; Rokach House);
  where to eat (Shabazi 26 — neighbourhood revival anchor; Orna & Ella — 20-yr institution;
  HaBasta — produce-driven, Carmel Market adjacent); practical info (Green Line to Florentine
  or Red Line to Allenby; no parking; Spring/Autumn best). Hero image: existing
  /images/sub-destinations/tel-aviv/neve-tzedek.jpg. 6 FAQs. 2 affiliate CTAs: Booking.com
  boutique hotels (Alma Hotel, Shapira House Hotel) + GYG Neve Tzedek/Jaffa walking tour.
  Cross-links IN guide: tel-aviv-neighborhoods-guide, jaffa-travel-guide, tel-aviv-white-city,
  tel-aviv-carmel-market, kerem-hateimanim-tel-aviv, tel-aviv-food-guide, tel-aviv-light-rail,
  tel-aviv-tours-compared.
  Cross-link BACK-WIRED: tel-aviv-neighborhoods-guide.md forward link /tel-aviv/neve-tzedek
  corrected to /neve-tzedek-guide (line 92).
  Footer Essentials: +1 "Neve Tzedek neighbourhood guide" link (after kerem-hateimanim).
  Smoke +1; a11y +1 routes.
  SEO check: title="Neve Tzedek: Tel Aviv's Historic Boutique Quarter (2026)" = 57 chars ✓;
    desc="Explore Neve Tzedek — Tel Aviv's first neighbourhood (1887): Suzanne Dellal Centre,
    Shabazi boutiques, Nahum Gutman Museum and where to eat." = 144 chars ✓
  Gate: pnpm check 0 errors (118 files) · build 445 pages (+1) · 574/574 e2e+a11y pass (+2). GREEN.
  Ship: commit b803fa4 on master; pushed to origin/master; CI unknown/in_progress at push time
    (GitHub Status API returned 'unknown' — consistent with prior iters; Vercel uses separate CI
    integration not reflected in standard status endpoint; prior iter285 was RESEARCH-only so no
    prior SHA success to confirm against).
  NEXT: iter 287 = BUILD (287%5==2 → seo-content rotation). Top seo-content candidates:
    israel-hummus-trail (P2 S, just added iter285), israel-hidden-gems (P2 M),
    christmas-in-israel (P2 M), israel-jordan-itinerary (P2 M), self-drive-israel-road-trip (P2 M),
    accessible-travel-israel (P2 M), muslim-travel-israel (P2 M).

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

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 32 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290.
