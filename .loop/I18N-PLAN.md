# I18N / TRANSLATION EPIC — en · fr · de · es

> Updated 2026-07-27: user request to ensure full translation into **es (Spanish)**, plus
> complete the fr + de guide catch-up (307 guides each were added to EN after Phase 6 closed).
> English (en) is the default at root. fr at /fr/..., de at /de/..., es at /es/...
>
> One bounded slice per loop iteration. NEVER bulk-translate in one shot.

## Current status snapshot (2026-08-07 iter1067 BUILD — DE-39 SHIPPED 7a95811b; FR-42 SHIPPED c04046c0 (concurrent); next FR BUILD = FR-43 not yet defined / ES-56 not yet defined / DE-40 not yet defined)

| Locale | Guides | Attractions | Regions | Itineraries |
|--------|--------|-------------|---------|-------------|
| en     | 398    | 65          | 11      | 6           |
| fr     | 297    | 61          | 11      | 6           |
| de     | 283    | 61          | 11      | 6           |
| es     | 279    | 61          | 11      | 6           |

**🎉 MILESTONE: ES + FR + DE monthly guides ALL COMPLETE** (iter996+iter997 ES-41+ES-42 SHIPPED — all 12 per-month guides jan-dec now exist in ES, FR, and DE)

**Gaps to close:**
- es guides: **119 missing** (279/398 done — Phase ES-55 SHIPPED iter1066 d2d018bc: traveling-israel-jewish-holidays + shabbat-dinner-experience + negev-jeep-tours + timna-park-guide + petra-wadi-rum-from-eilat; **next ES BUILD = ES-56** — not yet defined; queue for RESEARCH pass)
- fr guides: **101 missing** (297/398 done — Phase FR-42 SHIPPED iter1067 c04046c0: traveling-israel-jewish-holidays + shabbat-dinner-experience + negev-jeep-tours + timna-park-guide + petra-wadi-rum-from-eilat; **next FR BUILD = FR-43** — not yet defined)
- de guides: **115 missing** (283/398 done — Phase DE-39 SHIPPED iter1067 7a95811b: traveling-israel-jewish-holidays + shabbat-dinner-experience + negev-jeep-tours + timna-park-guide + sarona-market-tel-aviv; **next DE BUILD = DE-40** — not yet defined)
- fr/de/es attractions: **4 missing each** (the 4 EN attractions added after Phase 4)

**Dead Sea cluster status (iter855 audit):**
- ES: COMPLETE (has dead-sea-guide, dead-sea-hotels-guide, dead-sea-medical-tourism, dead-sea-tours-compared, dead-sea-vs-eilat); still missing: dead-sea-day-trip-comparison, dead-sea-israel-vs-jordan
- FR: PARTIAL (has dead-sea-guide, dead-sea-israel-vs-jordan, dead-sea-medical-tourism, dead-sea-vs-eilat); missing: dead-sea-hotels-guide, dead-sea-tours-compared, dead-sea-day-trip-comparison
- DE: PARTIAL (has dead-sea-guide, dead-sea-israel-vs-jordan, dead-sea-medical-tourism, dead-sea-hotels-guide, dead-sea-vs-eilat, dead-sea-tours-compared); missing: dead-sea-day-trip-comparison

## Architecture (already shipped, do not re-do)

- Astro i18n: `locales: ['en','fr','de','es']`, `defaultLocale: 'en'`
- UI strings: `src/i18n/ui.ts` with `t(locale, key)` helper
- Hreflang: emitted in BaseLayout + sitemap
- Language switcher: in Header (desktop + mobile)
- Content: `src/content/guides/{fr,de,es}/`, `src/content/attractions/{fr,de,es}/`,
  `src/content/regions/{fr,de,es}/`, `src/content/itineraries/{fr,de,es}/`
- Route templates: `/src/pages/{fr,de,es}/[region].astro`,
  `/src/pages/{fr,de,es}/[region]/[attraction].astro`, etc.

## Honesty + quality rules (HARD)

- Machine-translation drafts are fine but:
  - Keep brand/partner names, proper nouns, place names as-is or use the standard exonym
    only when one genuinely exists (e.g. es "Mar Muerto" for Dead Sea is fine; keep
    "Tel Aviv", "Masada" as-is).
  - **Religious/contested sites** (Western Wall, Holy Sepulchre, Temple Mount/Dome of the
    Rock, Bahá'í, Bethlehem/West Bank): carry over the EN paired-naming and neutral framing
    exactly; do not let MT invent or take sides.
  - No fabricated prices/ratings. Keep ₪/$ + add local formatting only if trivially safe.
  - Each page: exactly one H1, valid hreflang, working internal links (locale-correct),
    passes the a11y gate. Add representative es/fr/de routes to smoke + a11y specs as
    they ship.
- For es: use neutral Latin-American Spanish register (not Spain-specific vosotros).

## Batching strategy

- **Batch size: 5 guides per run.** One locale per batch.
- **Priority order:**
  1. ES guides (0 → 394): highest priority, largest gap, new requirement
  2. FR guide catch-up (87 → 394): 307 remaining
  3. DE guide catch-up (87 → 394): 307 remaining
  4. FR/DE/ES attraction catch-up (4 missing each): small, do at end
- Within each locale, prioritise by EN guide SEO priority: high-traffic evergreen guides
  first (visa, best-time, cost, accommodation, transport, first-timer, tours, day-trips),
  then region guides, then seasonal/niche guides.

## How to find the next batch

```bash
# List EN guides not yet translated into a locale (example: es)
comm -23 \
  <(ls src/content/guides/*.md | xargs -n1 basename | sort) \
  <(ls src/content/guides/es/*.md 2>/dev/null | xargs -n1 basename | sort) \
  | head -5
```

Take the top 5 by priority (or head -5 if priority not obvious), translate each one.

## Progress tracker

### ES-48 — SHIPPED iter1031 e5d34afb — 5 ES guides: israel-culinary-heritage-tourism + israel-small-group-tours + israel-photography-tours + israel-evening-activities + israel-base-city-guide. ES: 240→245/398. Build: 1529 pages (+5). Gate: pnpm check 0 errors; 2211/2211 e2e pass (18.4m).
Guides: `israel-culinary-heritage-tourism.md`, `israel-small-group-tours.md`, `israel-photography-tours.md`, `israel-evening-activities.md`, `israel-base-city-guide.md`
All 5 confirmed MISSING from ES via comm -23 (2026-08-06).
- israel-culinary-heritage-tourism: LATAM food tourism flagship; 70 diasporas cluster (jachnun/kubbeh/couscous/shakshuka); FR equivalent SHIPPED iter1005; 14/15 ES cross-links ✓ (kerem-hateimanim-tel-aviv → EN fallback); GYG food-tours + Booking CTAs; natural cluster anchor for israel-food-festivals/israeli-street-food-guide/kosher-food-guide (all in ES).
- israel-small-group-tours: high commercial intent "Israel grupo pequeño"; FR equivalent SHIPPED iter1028 (FR-35); TourRadar + GYG + Viator CTAs; LATAM group travel market (families + Birthright-adjacent + church groups); pairs with /es/best-tours-in-israel + /es/best-holy-land-tours.
- israel-photography-tours: specialty niche growing with LATAM Instagram travel market; FR equivalent SHIPPED iter1028 (FR-35); GYG photo-tours + Booking midrange CTAs; pairs with /es/israel-photography-guide (confirmed existing).
- israel-evening-activities: practical "qué hacer de noche en Israel" — zero competitor in any locale; covers TLV Rothschild nightlife, Jerusalem post-Shabbat, Haifa Louis Promenade, Acre medina night walk, Eilat harbor evening; Booking + GYG CTAs.
- israel-base-city-guide: strategic planning guide for first-timers: Jerusalem vs Tel Aviv vs Eilat vs Tiberias as base — decision matrix; rental car vs day trips; Booking CTAs; LATAM first-timer market (pairs with /es/first-time-in-israel + /es/israel-accommodation-guide).
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix only for confirmed existing ES pages; no fabricated prices; religious-site paired naming; no H1 in body.

### DE-33 batch definition (iter1030 RESEARCH — ready for next DE BUILD)
Guides: `israel-packing-list-guide.md`, `israel-trip-cost-by-style.md`, `israel-travel-tips.md`, `eilat-ramon-airport-guide.md`, `gan-hashlosha-guide.md`
All 5 confirmed MISSING from DE via comm -23 (2026-08-06).
- israel-packing-list-guide: DACH thorough-planner market; practical evergreen; cross-links to israel-packing-list (interactive tool → EN only), best-time-to-visit-israel (DE ✓), visa-information (DE ✓), holy-sites-dress-code-etiquette (DE ✓); GKV not valid abroad caveat; Globetrotter/Ortlieb gear culture angle.
- israel-trip-cost-by-style: "Israel Reisekosten" budget guide segmenting backpacker (55-85€/day) + Komfort (120-250€/day) + Luxus (350€+); FR equivalent SHIPPED iter1022; 6/7 DE cross-links ✓ (israel-trip-cost-calculator = tool → EN fallback); Hostelworld + Booking + TourRadar CTAs.
- israel-travel-tips: 20 practical tips covering Shabbat timing, shekel ATM strategy, ETA-IL (iaa.gov.il ≥72h), Rav-Kav setup, kashrut navigation, temple-mount access, language basics, modesty clothing — all DE cross-links confirmed existing; evergreen high-traffic.
- eilat-ramon-airport-guide: freshness-urgent (Wizz Air BGA base + Ramon mini-base confirmed spring 2026; Budapest route operating); DACH Eilat aviation market; Ramon airport logistics (no baggage trolleys, 1hr from Eilat centre, Arava taxi ~40 NIS); Wizz Air routes + low-cost angle; pairs with /de/eilat-travel-guide + /de/eilat-hotels-guide (both confirmed existing).
- gan-hashlosha-guide: Sachne thermalbad (28°C Quelltemperatur ganzjährig); FR equivalent SHIPPED iter1005; INPA pass valid + INPA pass NOT valid at Israel Museum/Hamat Gader distinction; Beit She'an day-trip combo; DACH summer family swimming market; Booking + GYG CTAs; pairs with /de/beit-shean-guide (confirmed existing).
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages; no fabricated prices; Bahá'í active-site framing; Wizz Air caveats ("schedules subject to change; verify direct with carrier").

### FR-36 batch definition (iter1030 RESEARCH — ready for next FR BUILD)
Guides: `israel-water-parks.md`, `israel-with-teenagers.md`, `israel-yoga-retreats.md`, `israel-vs-egypt.md`, `israel-national-bike-trail.md`
All 5 confirmed MISSING from FR via comm -23 (2026-08-06).
- israel-water-parks: French family summer tourism; Yamit (Holon, TLV metro), Kif Tzuba (Beit Shemesh, Jerusalem day-trip), Kfar Saba/Mayim park, Luna Park TLV (rides, not water); INPA parks combo angle; Booking (hotels) + GYG (family tours) CTAs; key FR cross-links ✓ (tel-aviv-beach-guide/eilat-travel-guide/haifa-travel-guide/day-trips-from-tel-aviv all confirmed existing); zero competitor FR editorial.
- israel-with-teenagers.md: French family market; teen-specific angle: TLV street art + skateparks, Masada dawn hike, IDF Experience Museum, Kfar Kedem Nazareth, Galilee jeep tours, Ramon Crater lookout bike, Eilat kayak/snorkel; GYG family tours + Booking CTAs; pairs with /fr/israel-with-kids (confirmed existing) + /fr/day-trips-from-tel-aviv.
- israel-yoga-retreats: French wellness tourism niche; anchors: Ne'ot Semadar (Negev eco-community + yoga), Lev Hamidbar (Arava dome retreat + vipassana), Kibbutz Harduf (Galilee spiritual), Dead Sea spa circuit; bookretreats.com = EN competitor; zero FR editorial on Israel wellness retreats; GYG + Booking CTAs.
- israel-vs-egypt: French MENA planners comparing destinations; Israel vs Egypt comparison across 8 criteria (heritage, beaches, cost, safety, logistics, food, nightlife, practical); Egypt market gaining share (honest framing — each destination has distinct strengths); cross-links to /fr/dead-sea-guide + /fr/eilat-travel-guide + /fr/israel-jordan-itinerary (all confirmed); GYG + Skyscanner CTAs.
- israel-national-bike-trail: French adventure cycling market (IBT = 1,200km Hermon→Eilat, 27 segments); ibt.org.il + komoot = main competitors (EN-only); trail overview + 3 recommended segments (Galilee Rim, Judean Hills, Negev South); Northbound vs Southbound logistics; Booking (support accommodation) + GYG (bike tours) + Discovercars (sag wagon) CTAs; pairs with /fr/cycling-in-israel (confirmed existing) + /fr/hiking-in-israel (confirmed existing).
Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages; no fabricated prices; religious-site neutral framing; IBT difficulty ratings honest; no H1 in body.

### FR-41 batch definition (iter1060 RESEARCH — ready for next FR BUILD)
Guides: `israel-points-miles-guide.md`, `israel-ramadan-guide.md`, `israel-unesco-sites.md`, `israel-visa-extension.md`, `israel-for-swiss-travelers.md`
All 5 confirmed MISSING from FR via comm -23 (2026-08-07).
Key angle per guide: points-miles = Flying Blue CDG angle + AMEX FR; ramadan = 6M Muslims France, Jaffa/Nazareth/Jerusalem iftar; UNESCO = UNESCO HQ Paris, 9 "Patrimoine mondial" sites INPA-Pass; visa-extension = long-stay FR digital nomads / retirees; for-swiss-travelers = 300k Romandie Swiss, SWISS LX GVA/ZRH→TLV, EDA advisory, LAMal not valid abroad.
Cross-links: all /fr/* verified ✓ (israel-road-trip ✓ in FR). No broken cross-links for this batch.
Status: ready [iter1060 research]

### DE-38 batch definition (iter1060 RESEARCH — ready for next DE BUILD)
Guides: `israel-points-miles-guide.md`, `israel-ramadan-guide.md`, `israel-unesco-sites.md`, `israel-visa-extension.md`, `israel-for-swiss-travelers.md`
All 5 confirmed MISSING from DE via comm -23 (2026-08-07).
Key angle per guide: points-miles = Miles&More Lufthansa FRA→TLV, 35M+ Mitglieder; ramadan = 5.5M+ Muslime Deutschland, türkische Gemeinschaft; UNESCO = "Welterbe" German culture, 9 Stätten; visa-extension = DACH digital nomad market; for-swiss-travelers = 4.5M Deutschschweiz, SWISS ZRH→TLV + Edelweiss, KVG not valid abroad.
Cross-link notes: /de/israel-road-trip MISSING → use EN fallback in UNESCO guide; /de/muslim-travel-israel MISSING → use EN fallback in Ramadan guide; all other /de/* cross-links verified ✓.
Status: ready [iter1060 research]

### ES-54 batch definition (iter1060 RESEARCH — ready for next ES BUILD)
Guides: `israel-points-miles-guide.md`, `israel-ramadan-guide.md`, `israel-unesco-sites.md`, `israel-visa-extension.md`, `israel-tour-packages.md`
All 5 confirmed MISSING from ES via comm -23 (2026-08-07). [israel-tour-packages FR✓ DE✓ but ES✗]
Key angle per guide: points-miles = LifeMiles Avianca / Iberia Plus LATAM angle; ramadan = Muslim communities in Argentina/Colombia/Brazil/Mexico; UNESCO = "Patrimonios de la Humanidad" high LATAM appeal; visa-extension = growing LATAM digital nomad market; tour-packages = "paquetes de viaje Israel" high commercial intent, TourRadar/Abraham/Noah Tours.
Cross-link notes: /es/new-luxury-hotels-israel-2026 MISSING → use EN fallback in points-miles guide; all other /es/* cross-links verified ✓.
Status: ready [iter1060 research]

### FR-39 batch definition (iter1050 RESEARCH — SHIPPED iter1051 e9bc80df)
Guides: `israel-vs-turkey.md`, `israel-vs-greece.md`, `israel-travel-2026.md`, `israel-group-travel.md`, `new-luxury-hotels-israel-2026.md`
All 5 confirmed MISSING from FR via comm -23 (2026-08-07). All 5 SHIPPED iter1051.
- israel-vs-turkey: Zero FR editorial competition; Turkey = France's top beach destination competing with Israel for summer tourism; 12-criteria comparison table; vols depuis Paris CDG; paired naming Mur Occidental/HaKotel + Dôme du Rocher/Esplanade des Mosquées; CTAs booking+skyscanner+getyourguide; 6 FAQs.
- israel-vs-greece: Mediterranean comparison; zero FR editorial competition on Israel vs Greece; 5-criteria table histoire/plages/gastronomie/coûts/sécurité; circuit combiné 3 semaines; paired naming at contested sites; CTAs getyourguide+skyscanner+booking; 5 FAQs.
- israel-travel-2026: Freshness content missing from all 3 locales; United/Delta/Israir new flight routes; Ben Gurion Terminal 1 reopened July 2026; new hotel openings (Jaffa boutique/InterContinental Jerusalem/Yacht Herzliya); Rosh Hanikra reopened; ETA-IL mandatory since Jan 2025; all /fr/* cross-links confirmed existing; CTAs skyscanner+booking+getyourguide; 6 FAQs.
- israel-group-travel: Catholic group pilgrimage market (France has strong religious heritage travel to Israel); operators Bein Harim/Abraham/Seagull/Mazada/Egged; site access table; arc chrétien 8j / patrimoine juif 9j / culturel 10j; group visa logistics; verdictName+verdictQuery; CTAs tourradar+getyourguide+viator; 6 FAQs.
- new-luxury-hotels-israel-2026: 2026 luxury hotel surge; Six Senses TLV + Nobu Hotel + Dizengoff 99 + Basel Complex + Leon Towers + The Yacht Herzliya + InterContinental Jerusalem rénové + Isrotel Kayma mer Morte + Herzl Beer Sheva + Canaan-Tzfat + Ein Hod boutique; tableau récapitulatif at-a-glance; sections par ville/segment; 2×booking+getyourguide CTAs; 7 FAQs.
Gate: pnpm check 0 errors | build 1579 pages | test:e2e 2271/2271 pass (16.0m). Squash-merge e9bc80df. FR: 277→282/401.

### ES guides (155 / 398)
- Phase ES-0 — DONE. iter799 shipped 5/394:
  first-time-in-israel, visa-information, best-time-to-visit-israel,
  israel-cost-budget, transportation (02b1058).
- Phase ES-1 — DONE. iter801 shipped 5/394 (a0394fab):
  shabbat-guide, is-israel-safe, israel-accommodation-guide,
  israel-travel-tips, ben-gurion-airport-guide.
- Phase ES-2 — DONE. iter803 shipped 5/394 (1af15a0):
  ben-gurion-airport-transfers, car-rental-israel, driving-in-israel,
  israel-travel-insurance, israel-money-guide.
- Phase ES-3 — DONE. iter806 shipped 5/394 (d76ed3b):
  1-day-jerusalem-itinerary, 1-day-tel-aviv-itinerary, 3-days-in-eilat,
  3-days-in-galilee, 3-days-in-haifa.
- Phase ES-4 — DONE. iter808 shipped 5/394 (903b747):
  day-trips-from-jerusalem, day-trips-from-tel-aviv, best-tours-in-israel,
  dead-sea-guide, best-holy-land-tours.
- Phase ES-5 — DONE. iter812 shipped 5/394 (9609531):
  backpacking-israel, best-beaches-israel, cheap-flights-to-israel,
  kosher-food-guide, israel-packing-list-guide.
- Phase ES-6 — DONE. iter816 shipped 5/396 (c03d53e):
  3-days-in-israel, 3-days-in-tel-aviv, airlines-flying-israel-2026,
  3-days-in-negev, akko-acre-guide.
- Phase ES-7 — DONE. iter822 shipped 5/396 (eac9c25):
  christian-pilgrimage-holy-land, bethlehem-travel-guide, border-crossings,
  haifa-travel-guide, day-trips-from-eilat. LATAM Catholic + logistics market.
  Careful neutral framing on Bethlehem/separation barrier/Holy Sepulchre/Western Wall.
  ES guides: 35→40/396. 1265/1265 e2e pass.
- Phase ES-8 — DONE. iter823 shipped 5/396 (9557827):
  masada-visitor-guide, best-hotels-jerusalem, best-hotels-tel-aviv,
  eilat-travel-guide, tel-aviv-beach-guide. LATAM accommodation + iconic destination market.
  Honest caveats on Six Senses TLV/Nobu TLV openings; InterContinental Jerusalem "late summer 2026".
  ES guides: 40→45/396. 1275/1275 e2e pass.
- Phase ES-9 — DONE. iter826 shipped 5/396 (f8bdb180):
  church-holy-sepulchre-guide, christmas-in-israel, caesarea-guide,
  bar-bat-mitzvah-israel, bedouin-experience-israel.
  LATAM Catholic pilgrimage + diaspora + adventure market.
  Status Quo six-denomination framing (Greek Orthodox, Roman Catholic/Franciscan,
  Armenian Apostolic, Coptic, Syriac, Ethiopian Tewahedo); Checkpoint 300 logistics;
  Ministry of Tourism bus "not guaranteed each year"; Western Wall egalitarian Ezrat Yisrael;
  no fabricated ceremony prices or ratings.
  ES guides: 45→50/396. 1285/1285 e2e pass.
- Phase ES-10 — DONE. iter832 shipped 792d26c6:
  cruise-shore-excursions-israel, dead-sea-vs-eilat, beer-sheva-guide,
  best-hotels-haifa, day-trips-from-haifa. LATAM Spanish neutral register;
  YAML double-quotes on apostrophe fields; /es/ prefix only for confirmed existing pages;
  Dolphin Reef "no garantizado" honesty; terminal Haifa mayo 2026 verified;
  price ranges only (no fabricated figures). 10 new tests (5 smoke + 5 a11y).
  ES guides: 50→55/396. Build: 1011 pages. 1315/1315 e2e pass.
- Phase ES-11 — DONE. iter836 shipped f2fa1b3c:
  aqaba-from-eilat, bahai-world-center-guide, church-of-nativity-guide,
  city-of-david-jerusalem, eilat-diving-snorkeling.
  LATAM "Tierra Santa" Catholic pilgrimage + adventure market. West Bank/Silwan/Bahá'í
  neutral framing carried exactly from EN. No fabricated prices. 10 new tests (5 smoke + 5 a11y).
  ES guides: 55→60/396. Build: 1016→1021 pages. All e2e pass.
- Phase ES-12 — DONE. iter841 shipped cfbee79b:
  bethlehem-tours-compared, beit-shean-guide, birdwatching-in-israel,
  beit-guvrin-caves-guide, israel-jordan-itinerary.
  LATAM pilgrimage conversion + archaeology + ecotourism + Gran Tour combined market.
  /es/ prefix only for confirmed existing ES pages. 10 new tests (5 smoke + 5 a11y).
  ES guides: 60→65/396. Build: 1036 pages. 1365/1365 e2e pass.
- Phase ES-13 — DONE. iter846 shipped 70024e3a:
  dead-sea-medical-tourism, eilat-hotels-guide, nazareth-travel-guide,
  dead-sea-hotels-guide, digital-nomad-israel.
  LATAM health-tourism + accommodation + pilgrimage + digital-nomad market.
  UVB climatoterapia hedged; Nazareth paired-naming נָצְרַת/النَّاصِرَة; Ein Bokek honest framing;
  grey-area nomad visa explicitly stated. No fabricated prices.
  ES guides: 65→70/396. Build: 1046→1051 pages. 1385→1395 e2e pass.
- Phase ES-14 — DONE. iter851 shipped 2f0d2787: dead-sea-tours-compared, eilat-tours-compared,
  easter-in-jerusalem, best-hotels-tiberias, ashdod-cruise-port-excursions.
  Rationale: (1) dead-sea-tours-compared: Civitatis top-selling LATAM product = Masada+Dead Sea combo;
  zero LATAM editorial comparison guide; adds missing monetization layer to ES Dead Sea cluster
  (dead-sea-guide + hotels + medical-tourism already shipped); group vs. private vs. self-drive framing;
  (2) eilat-tours-compared: completes Eilat monetization cluster in ES (eilat-travel-guide +
  eilat-hotels-guide + eilat-diving-snorkeling already shipped);
  (3) easter-in-jerusalem: Semana Santa = biggest religious tourism week in LATAM; zero Civitatis
  editorial guide ("semana santa jerusalen" SERP = only news, no evergreen); Catholic/Orthodox/Armenian
  Easter dates; Via Dolorosa processions; Midnight Mass Holy Sepulchre logistics; Checkpoint 300;
  pairs with ES christmas-in-israel + church-holy-sepulchre-guide;
  (4) best-hotels-tiberias: zero Spanish-language editorial competitors; Tiberias = LATAM Christian
  Galilee pilgrimage base (Capernaum/Tabgha/Magdala/Nazareth/Yardenit circuit); Scots Hotel +
  Leonardo + Ruth Rimonim anchors; Booking.com affiliate value; pairs with ES 3-days-in-galilee;
  (5) ashdod-cruise-port-excursions: MSC/Costa/Royal Caribbean call Ashdod for Jerusalem day trips;
  Civitatis sells tours but no ES editorial; Ashdod port logistics + best options by hours-in-port.
  Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix for confirmed existing ES pages;
  no fabricated prices; Easter 2027 dates confirmed (Catholic April 20; Orthodox/Armenian April 12);
  paired-naming where applicable; no fabricated tour prices (ranges only).
  Status: ready — pick in next ES BUILD iteration.
- Phase ES-16 — SHIPPED iter862 cfe8ffd1:
  yad-vashem-visitor-guide, western-wall-guide, golan-heights-guide,
  galilee-tours-compared, tiberias-guide.
  Neutral LATAM Spanish tuteo; paired-naming "Muro de los Lamentos (Kotel / הַכּוֹתֶל הַמַּעֲרָבִי)";
  Golan Heights neutral political-status note; Yad Vashem pre-registration caveat;
  Nimrod Fortress correctly identified as Ayyubid. ES guides: 80→85/396.
  Build: 1086→1091 pages. 1475/1475 e2e pass (11.8m).
- Phase ES-17 — SHIPPED iter871 1fb80f61:
  dead-sea-israel-vs-jordan, jaffa-travel-guide, tel-aviv-vs-jerusalem,
  israel-for-argentinian-travelers, vegan-vegetarian-israel.
  Neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed existing ES pages;
  no fabricated prices or ratings; 1948 Jaffa history honest framing; ETA-IL (iaa.gov.il, ₪25, 1 week);
  El Al EZE-TLV direct 29 Nov 2026 (2×/week); PAMI abroad clarification explicit;
  Tel Aviv ~5% vegan per capita; kashrut navigation; Hebrew supermarket labels.
  10 new e2e tests (5 smoke + 5 a11y). ES guides: 85→90/397. Build: 1112→1117 pages. 1527/1527 e2e pass.
- Phase ES-15 — DONE. iter856 shipped df7dc674:
  galilee-christian-sites-circuit, free-things-to-do-israel, dead-sea-day-trip-comparison,
  best-hotels-sea-of-galilee, cycling-in-israel.
  Rationale: (1) galilee-christian-sites-circuit: "Circuito Cristiano Galilea / Sitios Bíblicos
  del Mar de Galilea" = zero LATAM editorial competition; Capernaum/Tabgha/Church of Beatitudes/
  Magdala = core Sea of Galilee pilgrimage circuit; self-drive format; pairs with 3-days-in-galilee
  + best-hotels-tiberias already in ES; high GYG affiliate value;
  (2) free-things-to-do-israel: "Actividades gratis en Israel" unclaimed in LATAM Spanish; Yad Vashem
  + Tel Aviv beaches + Bahá'í Gardens + Machane Yehuda free entry confirmed; budget LATAM market;
  (3) dead-sea-day-trip-comparison: "¿Mar Muerto desde Jerusalén o Tel Aviv?" completes ES Dead Sea
  cluster (guide + hotels + medical-tourism + tours-compared + vs-eilat already shipped); high purchase
  intent; (4) best-hotels-sea-of-galilee: "Hoteles Mar de Galilea / Lago Kinneret" unclaimed in LATAM
  Spanish; kibbutz resorts + Scots Hotel + east-shore retreats; Booking.com affiliate;
  (5) cycling-in-israel: zero ES editorial; Tel Aviv 150km+ bike lanes + Tel-O-Fun; adventure tourism.
  Quality: neutral LATAM Spanish tuteo; YAML double-quotes; paired-naming Cafarnaúm/כְּפַר נַחוּם +
  Magdala/Migdal; /es/ prefix for confirmed existing ES pages only; no fabricated prices; Bahá'í
  active-site caveat; cycling prices as ranges only. 10 new tests (5 smoke + 5 a11y).
  ES guides: 75→80/396. Build: 1071→1081 pages. 1445→1455 e2e pass.
- Phase ES-18 — SHIPPED. iter876 5cf2bf65:
  sea-of-galilee-guide, netanya-guide, best-hotels-negev, best-hotels-netanya, passover-in-israel.
  Neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed-existing ES pages;
  all ₪ as ranges only; Yardenit "popular... no necesariamente histórico" honesty; Stern Diamond
  Factory commercial nature disclosed; Beresheet/Succah/Selina Ramon price ranges; Pesaj 5787
  April 22–29 2027; Birkat Kohanim logistics; tourist Seder options; no fabricated prices.
  10 new e2e tests (5 smoke + 5 a11y). ES guides: 90→95/397. Build: 1122→1127 pages (+5).
  1547/1547 e2e pass. Gate: 0 errors.

### FR guide catch-up (127 / 396 = 269 remaining)
- Phase FR-1 — DONE. iter828 shipped ff27fd98:
  3-days-in-israel, 3-days-in-galilee, airlines-flying-israel-2026,
  backpacking-israel, best-beaches-israel. Metropolitan French;
  YAML apostrophes double-quoted; /fr/* broken links → EN fallbacks.
  FR guides: 87→92/396. 1295/1295 e2e pass.
- Phase FR-2 — DONE. iter831 shipped 5fa1ab23:
  3-days-in-tel-aviv, 3-days-in-eilat, dead-sea-vs-eilat,
  best-hotels-jerusalem, christmas-in-israel.
  Metropolitan French; YAML apostrophes double-quoted; /fr/* prefix links only for existing FR pages.
  10 new tests (5 smoke + 5 a11y). FR guides: 92→97/396. 1305/1305 e2e pass.
- Phase FR-3 — DONE. iter837 shipped 0bccb519:
  1-day-tel-aviv-itinerary, 3-days-in-haifa, 3-days-in-negev,
  bedouin-experience-israel, beer-sheva-guide.
  Metropolitan French; Makhtesh Ramon géologie correcte (pas cratère météoritique);
  diyafa + beit sha'ar bédouin; charge cavalerie ANZAC 1917 Beer-Sheva;
  YAML double-quotes apostrophes; /fr/* prefix confirmed existing FR pages only;
  no fabricated prices. 10 new tests (5 smoke + 5 a11y).
  FR guides: 97→102/396. Build: 1021→1026 pages. 1345/1345 e2e pass.
- Phase FR-4 — DONE. iter842 shipped cc4db236:
  bahai-world-center-guide, beit-guvrin-caves-guide, beit-shean-guide,
  best-hotels-tel-aviv, israel-jordan-itinerary.
  Metropolitan French; Bahá'í religious site framing; UNESCO Bell Caves; Beit She'an Decapolis;
  Tel Aviv hotels 5 neighborhoods 3 tiers + honest 2026 new openings; 10-day Israel+Jordan circuit;
  no fabricated prices. 10 new tests (5 smoke + 5 a11y).
  FR guides: 102→107/396. Build: 1036→1041 pages. 1375/1375 e2e pass.
- Phase FR-5 — DONE. iter847 shipped 1556cf5e:
  dead-sea-medical-tourism, netanya-guide, eilat-hotels-guide, passover-in-israel,
  church-of-nativity-guide. Metropolitan French; French Jewish diaspora (largest W. Europe)
  + Netanya francophone community (~50K francophones, ~30% population);
  UVB climatothérapie dead-sea claims hedged; Pessah 2027 dates confirmed (April 22-29);
  Status Quo six-denomination + West Bank neutral from EN; Airport City 2026 openings honest;
  broken links fixed (bethlehem-tours-compared + eilat-travel-guide → EN fallbacks);
  no fabricated prices. 10 new tests (5 smoke + 5 a11y).
  FR guides: 107→112/396. Build: 1051→1056 pages. 1395→1405 e2e pass.
- Phase FR-6 — DONE. iter852 shipped b5b1b9b3:
  bethlehem-tours-compared, sea-of-galilee-guide, aqaba-from-eilat,
  city-of-david-jerusalem, eilat-travel-guide.
  Note: nazareth-travel-guide was already present in FR (from earlier iterations) — replaced
  with eilat-travel-guide (next highest-priority confirmed-missing FR guide).
  Metropolitan French; Checkpoint 300 logistics; Yardenit honesty note; Elad Foundation neutral
  from EN; National Parks Pass NOT valid (City of David, honesty note); Jerusalem Pilgrimage
  Road Jan 2026; Dolphin Reef semi-wild framing; tax-free shopping Eilat; YAML double-quotes;
  /fr/* prefix only for confirmed existing FR pages. No fabricated prices.
  10 new tests (5 smoke + 5 a11y). FR guides: 112→117/396. Build: 1066→1071 pages. 1425→1435 e2e pass.
- Phase FR-7 — SHIPPED iter858 3b540160. easter-in-jerusalem, best-hotels-sea-of-galilee,
  best-hotels-haifa, ashdod-cruise-port-excursions, best-hotels-negev.
  Rationale: (1) easter-in-jerusalem: "Pâques à Jérusalem / Semaine Sainte" = zero confirmed FR
  travel editorial guide; French Catholic pilgrim market (France = 3rd largest Israel tourism source);
  Messe de Minuit Holy Sepulchre + Feu Sacré + Via Dolorosa processions + Orthodox Holy Fire dates;
  Pâques 2027 = April 20 (Catholic), April 12 (Orthodox); pairs with existing FR
  christmas-in-israel + church-of-nativity-guide + bethlehem-tours-compared; high seasonal
  affiliate value (GYG Easter week tours);
  (2) best-hotels-sea-of-galilee: "Hôtels Lac de Tibériade" completes FR Galilee hotel cluster
  (sea-of-galilee-guide SHIPPED in FR-6); Scots Hotel Tibériade + kibbutz En Gev + Nof Ginosar;
  Booking.com affiliate; pairs with FR 3-days-in-galilee + nazareth-sea-of-galilee-day-trip;
  (3) best-hotels-haifa: confirmed missing from FR (comm -23 verified); Bahá'í + Carmel + Technion
  market; pairs with FR 3-days-in-haifa + bahai-world-center-guide; Booking.com affiliate;
  (4) ashdod-cruise-port-excursions: MSC/Costa/Royal Caribbean Med cruises carry French passengers;
  "excursions depuis Ashdod" thin in FR; content: port logistics + best excursion options by
  hours-in-port (Jerusalem/Bethlehem/Dead Sea/TLV); pairs with FR cruise-shore-excursions-israel;
  (5) best-hotels-negev: "Hôtels Néguev / Mitzpe Ramon" completes FR Negev cluster with
  3-days-in-negev already DONE; Beresheet + Mitzpe Ramon alternatives; Booking.com affiliate.
  Metropolitan French; YAML double-quotes; /fr/* prefix for confirmed existing FR pages only;
  no fabricated prices. 10 new tests (5 smoke + 5 a11y).
  Status: SHIPPED iter858.
- Phase FR-8 — SHIPPED iter866-b fe3dea89:
  dead-sea-hotels-guide, dead-sea-tours-compared, dead-sea-day-trip-comparison,
  best-hotels-tiberias, cycling-in-israel.
  Metropolitan French; YAML double-quotes; /fr/* prefix for confirmed existing FR pages only;
  no fabricated prices; 3-tier hotel pricing in ₪ ranges; 5-format tour comparison table;
  Jerusalem vs Tel Aviv departure comparison table; 6 property profiles Tiberias with decision matrix;
  Tel-O-Fun 4-step system + 4 Tel Aviv routes + Negev MTB + IBT 1200km.
  10 new e2e tests (5 smoke + 5 a11y). FR guides: 122→127/396. Build: ~1102 pages. 1495/1495 e2e pass.
- Phase FR-34 — SHIPPED iter1022 5bf30b27:
  jerusalem-museums, jericho-day-trip-from-jerusalem, layover-tel-aviv, israel-trip-cost-by-style, jewish-quarter-jerusalem-guide.
  Rationale: (1) jerusalem-museums: "Musées de Jérusalem" — 7-museum circuit (Musée d'Israël, Yad Vashem, BLMJ, Tour de David, Bibliothèque nationale, Rockefeller, Musée de la Tolérance) ; zero FR comprehensive museum circuit guide; Givat Ram campus + Vieille Ville cluster ; Tiqets+GYG+Booking CTAs ; 7 FAQs; (2) jericho-day-trip-from-jerusalem: "Excursion à Jéricho" — Zone A logistique honnête (interdiction Israéliens + voiture de location) ; Tell es-Sultan/Mont de la Tentation/Palais de Hicham/Qasr el-Yahud/dattes Medjool ; GYG+Viator+Abraham CTAs ; France Diplomatie travel advisory ; 7 FAQs; (3) layover-tel-aviv: "Escale à Tel Aviv" — 4 créneaux (4h/6h/8-10h/24h) ; train Ben Gourion→HaShalom/Central/Salame ; Sarona/Jaffa/plage+Carmel/ville complète ; WelcomePickups+GYG+Booking CTAs ; tableau récapitulatif transit/sécurité/ETA-IL ; 6 FAQs; (4) israel-trip-cost-by-style: "Coût du voyage en Israël" — 3 niveaux en € (petit budget 60-90€/j, milieu 130-270€/j, luxe 370€+) ; tableaux quotidiens ; calendrier fêtes juives (Pessah/Grandes Fêtes/Noël) ; Hostelworld+Booking+TourRadar CTAs ; 7 FAQs; (5) jewish-quarter-jerusalem-guide: "Quartier juif de Jérusalem" — Musée Wohl (6 demeures hérodiennes du 1er s. av. J.-C.), Maison brûlée (70 apr. J.-C., avant-bras Katros), Centre Davidson/Arc de Robinson, Cardo, synagogue Hurva 2010, Quatre Synagogues sépharades, Grand Mur Ézéchias 8e s. av. J.-C. ; GYG+Viator+Booking CTAs ; 7 FAQs. Qualité : français métropolitain ; YAML guillemets doubles ; /fr/* pages existantes confirmées uniquement ; aucun prix ou note fabriqué ; nommage apparié Mur occidental/mont du Temple ; aucun H1 dans le corps. FR : 252→257/398. Build : 1504→1509 pages (+5). 2201/2201 e2e pass (31.8m). 10 nouveaux tests (5 smoke + 5 a11y).

- Phase FR-30 — SHIPPED iter1005 c20c8c68:
  israel-museum-jerusalem, gan-hashlosha-guide, israel-spring-wildflowers,
  israel-thermal-springs, israel-culinary-heritage-tourism.
  Rationale: specialty/experience guides closing FR specialty gap. Metropolitan French; YAML double-quotes;
  /fr/* prefix confirmed existing only; no fabricated prices; INPA pass coverage accurate (Sachne=valid,
  Israel Museum/Hamat Gader=not INPA); kalanit picking fine ₪730; sulphur odour at Hamat Gader noted;
  National Parks Pass note for Beit Alfa (separate fee) included.
  10 new e2e tests (5 smoke + 5 a11y). FR guides: 232→237/398. Build: 1454→1459 pages (+5). 2181/2181 e2e pass.

- Phase FR-9 — SHIPPED iter873 3a3f1b1f:
  bethlehem-travel-guide, vegan-vegetarian-israel, israel-for-french-travelers,
  best-hotels-netanya, eilat-beach-guide.
  Metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages;
  Checkpoint 300 + West Bank neutral framing; Church of the Nativity Status Quo six-denomination;
  ETA-IL since Jan 2025; Assurance Maladie not valid (assurance voyage required); Lydia/PayLib
  not compatible; ~60K francophones in Netanya; reef-safe sunscreen mandatory at Coral Beach;
  Plage Almog new city beach designation 2025/2026 with permanent lifeguard; no fabricated prices.
  10 new e2e tests (5 smoke + 5 a11y). FR guides: 127→132/397. Build: 1117→1122 pages. 1537/1537 e2e pass.
- Phase FR-5 definition text (moved to DONE above) — iter845 research: dead-sea-medical-tourism, netanya-guide,
  eilat-hotels-guide, passover-in-israel, church-of-nativity-guide.
  Rationale: (1) dead-sea-medical-tourism: mer-morte.info = entire niche French site with weak
  domain authority; spadreams.fr "Cure mer morte" ads; French cures thermales/thalasso distinct
  cultural segment; authoritative guide would outrank all competitors; (2) netanya-guide:
  ~50K francophone residents (~30% of Netanya's population per francosphere.co.il);
  zero FR travel editorial competition; linkable asset for franco-Israeli press (israelvalley.com,
  francosphere.co.il, sante.org.il); family-visit + medical-tourism + beach tourism market;
  (3) eilat-hotels-guide: Expedia.fr + ebookers.fr + roadcalls.fr + eilat.city/fr confirm FR
  commercial intent; hotel guide = missing layer in FR Eilat cluster;
  (4) passover-in-israel: French Jewish diaspora (largest in Western Europe); Pessah 5786 =
  April 1-9, 2026; Chabad.fr + AJCF have religious content; zero FR travel guide covering
  visitor experience during Pessah; seasonal + evergreen;
  (5) church-of-nativity-guide: "Basilique de la Nativité Bethléem" top FR pilgrimage query;
  Le Routard prominent Bethlehem coverage; Status Quo six-denomination framing; West Bank
  neutral from EN; Checkpoint 300 logistics in French.
  Quality: metropolitan French; YAML double-quotes apostrophes; /fr/* prefix confirmed existing FR
  pages only; no fabricated prices; Netanya francophone statistics sourced; Pessah dates verified.
  Status: ready — pick in BUILD iteration after ES-13.
  Metropolitan French; YAML apostrophes double-quoted; /fr/* prefix only for confirmed FR pages;
  Bahá'í active religious site framing (non-Bahá'ís exterior/terraces only);
  UNESCO Bell Caves + Sidonian Burial Caves; Beit She'an Decapolis + 749 CE time-capsule;
  Tel Aviv hotels 5 neighborhoods 3 tiers + honest 2026 new openings;
  10-day Israel+Jordan circuit + two border crossings + Jordan Pass;
  no fabricated prices. 10 new tests (5 smoke + 5 a11y).
  FR guides: 102→107/396. Build: 1036→1041 pages. 1375/1375 e2e pass.

### Phase DE-10 (132 → 137/397) — SHIPPED iter886 2a552983
Guides: `galilee-christian-sites-circuit.md`, `ein-gedi-guide.md`, `haifa-travel-guide.md`, `egypt-jordan-israel-itinerary.md`, `eilat-beach-guide.md`
All 5 confirmed MISSING from DE via comm -23 (2026-07-30).
- galilee-christian-sites-circuit: DACH Christian pilgrimage market (significant German Catholic + Protestant tourers); "Galiläa christliche Stätten Rundfahrt ~45km Tiberiasring" zero DACH editorial; anti-clockwise circuit Kafarnaum/Tabgha/Berg der Seligpreisungen/Magdala/Kourssi; GYG + Viator CTAs; pairs with /de/sea-of-galilee-guide + /de/best-hotels-sea-of-galilee (both confirmed existing)
- ein-gedi-guide: DACH nature/hiking tourism; Dead Sea cluster completion; "Ein Gedi Naturreservat: Wadi David, Nahal Arugot, Steinböcke"; GYG + Abraham CTAs; pairs with /de/dead-sea-guide + /de/dead-sea-tours-compared (both confirmed existing)
- haifa-travel-guide: major confirmed DE gap; DACH city guide for Haifa (Deutsche Kolonie 19.Jh. Tempelarchitektur, Bahá'í Weltzentrum exterior/Terrassen for non-Bahá'ís, Karmelit U-Bahn, Wadi Nisnas, Stella Maris); Booking + GYG CTAs; pairs with /de/3-days-in-haifa + /de/bahai-world-center-guide (both confirmed existing)
- egypt-jordan-israel-itinerary: "Ägypten Jordanien Israel Rundreise: 3-Länder-Itinerar" high DACH purchase intent; TourRadar + Abraham CTAs; pairs with /de/israel-jordan-itinerary (confirmed existing)
- eilat-beach-guide: completes DE Eilat beach cluster; "Eilat Strände: Nordstrand vs Korallenreservat" DACH beach tourism; Booking + GYG CTAs; pairs with /de/eilat-travel-guide + /de/eilat-hotels-guide (both confirmed existing)
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix confirmed-existing pages only; no fabricated prices; Bahá'í active-site framing (non-Bahá'ís Außenbereiche/Terrassen only); Dolphin Reef semi-wild honesty; Makhtesh Ramon = Erosionskrater not Meteoriten-/Vulkankrater.

### DE guide catch-up (107 / 396 = 289 remaining — Phase DE-5 next)
- Phase DE-1 — DONE. iter833 shipped ebfb0bd7:
  3-days-in-israel, 3-days-in-galilee, airlines-flying-israel-2026,
  backpacking-israel, best-beaches-israel. Standard Hochdeutsch;
  Planung/Reiserouten categories; /de/ prefix only for confirmed existing DE pages;
  cycling-in-israel plain link (no DE version). 10 new tests (5 smoke + 5 a11y).
  DE guides: 87→92/396. Build: 1016 pages. All e2e pass.
- Phase DE-2 — DONE. iter838 shipped e1c560ca:
  1-day-tel-aviv-itinerary, 3-days-in-eilat, 3-days-in-haifa,
  3-days-in-negev, 3-days-in-tel-aviv.
  Standard Hochdeutsch; correct geology Makhtesh Ramon (kein Meteoriten-/Vulkankrater);
  Dolphin Reef semi-wild framing; Bahá'í active religious site note; Stella Maris photography
  caveat; Wadi Ardon serious hike + summer heat warnings. YAML fix: escaped ASCII double-quotes
  inside YAML double-quoted string (3-days-in-negev.md „Erosionskrater\"/ „Boxcañon\").
  /de/* prefix links only where DE page exists; plain links for EN-only pages; no fabricated prices.
  10 new tests (5 smoke + 5 a11y). DE guides: 92→97/396. Build: 1031 pages. 1355/1355 e2e pass.
- Phase DE-3 — DONE. iter843 shipped c06662e0:
  bedouin-experience-israel, beer-sheva-guide, beit-guvrin-caves-guide,
  beit-shean-guide, bahai-world-center-guide.
  Standard Hochdeutsch; diyafa Beduinen cultural immersion (Kfar HaNokdim, Sde Boker,
  Negev Beduinen-Erbe-Zentrum); ANZAC 4. Australische Light-Horse-Brigade Kavallerieritt
  31. Oktober 1917 Beer-Sheva; Tel Beer-Sheva UNESCO + IAF Museum Hatzerim;
  Bet-Guvrin-Höhlen UNESCO Glockenhöhlen + Sidonische Grabkammern + Taubenschläge +
  Amphitheater; Beit She'an Nysa-Scythopolis Dekapolis + 749 CE Erdbeben-Zeitkapsel +
  Sachne/Gan HaShlosha 28°C combo; Bahá'í-Weltzentrum active religious site
  (non-Bahá'ís Terrassen/Außenbereiche; Schrein-Innenraum nur für Bahá'í-Pilger);
  Freitagnachmittag-Schließung Bahjí; haifa-travel-guide plain link (no DE version);
  no fabricated prices. 10 new tests (5 smoke + 5 a11y).
  DE guides: 97→102/396. Build: 1041→1046 pages. 1385/1385 e2e pass.
- Phase DE-4 — DONE. iter848 shipped 399f791d:
  best-hotels-tel-aviv, israel-jordan-itinerary, best-hotels-jerusalem,
  masada-visitor-guide, sea-of-galilee-guide.
  (Note: day-trips-from-jerusalem/caesarea-guide/day-trips-from-tel-aviv already existed in DE;
  replaced with next highest-priority missing guides.)
  Standard Hochdeutsch; DACH hotel market (TLV 5 neighborhoods + Jerusalem 4 neighborhoods);
  "Israel-Jordanien Rundreise" + both border crossings + Jordan Pass; Masada 3 Aufstiegsmethoden
  + Licht-und-Ton-Show; Kinneretsee alle 4 Ufer + Radtour-Rundkurs + Yardenit honesty note;
  InterContinental Jerusalem "Spätsommer 2026" honest caveat; no fabricated prices.
  10 new tests (5 smoke + 5 a11y).
  DE guides: 102→107/396. Build: 1056→1061 pages. 1405→1415 e2e pass.
- Phase DE-5 — SHIPPED iter853 acb25c7b. best-hotels-haifa, bethlehem-tours-compared,
  dead-sea-medical-tourism, city-of-david-jerusalem, aqaba-from-eilat.
  best-hotels-haifa: Deutsche Kolonie/Karmel/Hafen tiers; Booking.com + GYG CTAs.
  bethlehem-tours-compared: halber Tag/ganzer Tag/Jericho-Combo/Dual-Narrative/Self-guided;
  Checkpoint 300 logistics; West Bank neutral framing; Abraham Tours/Bein Harim/Elijah Tours.
  dead-sea-medical-tourism: UVB-Klimatherapie bei −430m, GKV-Erstattungsweg, Paula Dead Sea
  Clinic, PASI 70-90% hedged, no fabricated cure claims.
  city-of-david-jerusalem: Hiskia-Tunnel wet/dry routes; Davidsstadt/Silwan dual-naming;
  Elad Foundation neutral; Jerusalem Pilgrimage Road Jan 2026; National Parks Pass NOT valid.
  aqaba-from-eilat: Yitzhak-Rabin-/Wadi-Araba-Übergang; Japanese Garden snorkeling;
  al-Aqabah-Burg; GYG/Booking/Discovercars CTAs.
  DE guides: 107→112/396. Build: 1071→1076 pages. 1435→1445 e2e pass.
- Phase DE-6 — SHIPPED iter863 eda39a8a.
  christmas-in-israel, church-of-nativity-guide, cycling-in-israel,
  dead-sea-hotels-guide, dead-sea-vs-eilat.
  Standard Hochdeutsch; YAML double-quotes; 3 broken links fixed to EN fallbacks
  (/de/bethlehem-travel-guide, /de/eilat-hotels-guide, /de/eilat-vs-aqaba → EN);
  West Bank neutral framing; Dolphin Reef "Begegnungen nicht garantiert" honesty note;
  paired-naming on contested sites; no fabricated prices.
  DE guides: 112→117/396. Build: 1091→1096 pages. 1485/1485 e2e pass.
- Phase DE-7 — SHIPPED iter867 3debfa00.
  yad-vashem-visitor-guide, golan-heights-guide, eilat-travel-guide,
  dead-sea-tours-compared, western-wall-guide.
  Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages;
  no fabricated prices; Golan Heights neutral political-status note (US-Anerkennung 2019,
  nicht von UN/meisten Ländern anerkannt); Nimrod-Festung correctly Ayyubid 1229 n.Chr.;
  Dolphin Reef "Begegnungen nicht garantiert" honesty; paired-naming Klagemauer / הַכּוֹתֶל הַמַּעֲרָבִי;
  Robinsons-Bogen egalitär für liberale/reformjüdische DACH-Besucher; Voranmeldepflicht Jad Vaschem.
  Merge conflict with concurrent iter866-b (FR-phase-8) resolved via rebase, BOTH route sets preserved.
  10 new e2e tests (5 smoke + 5 a11y). DE guides: 117→122/396. Build: 1097→1102 pages. 1497/1497 e2e pass (14.4m).

### Attraction catch-up (4 missing per locale)
- NOT STARTED. Low priority; do after guide catch-up is well underway.

### Previously completed (do not repeat)
- Infra (Phase 0–6, iters 12–408): Astro i18n config, UI dict, hreflang, language
  switcher, sitemap hreflang — ALL DONE.
- FR+DE regions (11/11 each): ALL DONE (Phase 3, iters 323–332).
- FR+DE attractions (61/65 each): DONE through Phase 4 Batch 12 (iter398).
- FR+DE itineraries (6/6 each): DONE (Phase 5, iter403).
- FR+DE guides batch 1–18 (87/394 each): DONE (Phase 2, iters ~22–408).
- ES regions (11/11): DONE (when added unclear, but present).
- ES attractions (61/65): DONE (partial — 4 still missing).
- ES itineraries (6/6): DONE.

---

## Updated status snapshot (iter873 BUILD 2026-07-30)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 397    | stable |
| fr     | 132    | 265 missing — Phase FR-9 SHIPPED iter873; Phase FR-10 TBD |
| de     | 127    | 270 missing — Phase DE-9 defined |
| es     | 90     | 307 missing — Phase ES-17 SHIPPED iter871; Phase ES-18 TBD |

**FR-phase-9 (iter873) shipped:** FR guides now 132/397.
**ES-phase-17 (iter871) shipped:** ES guides now 90/397.
**Next phases defined this research pass (iter870):**

### Phase ES-17 (85 → 90/397) — ready
Guides: `dead-sea-israel-vs-jordan.md`, `jaffa-travel-guide.md`, `tel-aviv-vs-jerusalem.md`, `israel-for-argentinian-travelers.md`, `vegan-vegetarian-israel.md`
- dead-sea-israel-vs-jordan: completes ES Dead Sea cluster; "¿Mar Muerto Israel o Jordania?"; zero LATAM editorial
- jaffa-travel-guide: zero ES editorial; format proven in FR+DE (iter137)
- tel-aviv-vs-jerusalem: "¿Tel Aviv o Jerusalén?" very high comparison intent; already in FR+DE
- israel-for-argentinian-travelers: ETA-IL since Jan 2025 critical update; EN guide b6a0158; zero SERP competition
- vegan-vegetarian-israel: "Israel vegano" zero LATAM editorial; EN guide f2c65cf; Israel = world #1 per-capita vegan
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix confirmed-existing pages only; no fabricated prices.

### Phase FR-9 (127 → 132/397) — ready
Guides: `bethlehem-travel-guide.md`, `vegan-vegetarian-israel.md`, `israel-for-french-travelers.md`, `best-hotels-netanya.md`, `eilat-beach-guide.md`
- bethlehem-travel-guide: completes FR Bethlehem cluster; France is #3 Israel tourism source; Checkpoint 300 + West Bank neutral
- vegan-vegetarian-israel: "Israël végan/végétarien" zero FR editorial; passover-in-israel already in FR (skip)
- israel-for-french-travelers: ETA-IL since Jan 2025; El Al CDG/ORY + Air France TLV; zero SERP competition; EN exists
- best-hotels-netanya: ~50K francophones in Netanya; zero FR editorial; Booking.com affiliate
- eilat-beach-guide: completes FR Eilat cluster; Coral Beach vs North Beach; seasonal pricing
Quality: metropolitan French; YAML double-quotes; /fr/* prefix confirmed-existing pages only; no fabricated prices.

### Phase DE-9 (127 → 132/397) — SHIPPED iter878 a03df166
Guides: `ashdod-cruise-port-excursions.md`, `best-hotels-sea-of-galilee.md`, `vegan-vegetarian-israel.md`, `israel-for-german-travelers.md`, `best-hotels-negev.md`
SHIPPED iter878 SHA a03df166. DE guides: 127→132/397. Build: 1132→1137 pages. 10/10 e2e pass. Gate: 0 errors.
- ashdod-cruise-port-excursions: AIDA/TUI Cruises/MSC/Costa German cruise market; Jerusalem/Dead Sea/Masada/Tel Aviv excursion timing + transport tables; ETA-IL note; Bethlehem Area A caveat; port logistics; comparison table; 7 FAQs; 3 CTAs GYG/Viator/Booking.
- best-hotels-sea-of-galilee: DACH Christian tourism; four shores west/north/east/south; Nof Ginosar/Altes Boot; Magdala pilgrimage center; Domus Galilaeae; Ein Gev; Kibbutz Kinneret; Scots Hotel Tiberias → /de/best-hotels-tiberias; decision matrix; 7 FAQs; 3 CTAs Booking/GYG/Discovercars.
- vegan-vegetarian-israel: Germany #1 per-capita vegan Europe angle; key dishes Hummus/Falafel/Shakshuka/Sabich/Msabbaha; Kashrut system explained; Hebrew supermarket label table חלב/פרווה/בשרי; Tel Aviv/Jerusalem/Haifa sections; 6 FAQs; 2 CTAs GYG/Booking.
- israel-for-german-travelers: GKV gap → Reisekrankenversicherung; EC-Karte limitation → DKB/Revolut/N26; Schuko Type F→Type H; ETA-IL ₪25; ELEFAND; Auswärtiges Amt; Lufthansa/Eurowings/El Al route table; time zone table; German Embassy Tel Aviv; 6 FAQs; 3 CTAs Booking/GYG/SafetyWing.
- best-hotels-negev: IDA Dark Sky Park first in Middle East; Beresheet ₪1,800–₪4,500+ crater-rim; Selina Ramon; Ramon Inn; Succah in the Desert off-grid; HI Beit Noam ₪120–180; Zimmer B&B; Sde Boker alternative; decision matrix; 7 FAQs; 3 CTAs Booking/GYG/Discovercars.
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix confirmed-existing pages only; no fabricated prices; Makhtesh Ramon correctly Erosionskrater.

### Phase FR-11 (137 → 142/397) — SHIPPED iter887 8e2e60da
Guides: `egypt-jordan-israel-itinerary.md`, `ein-gedi-guide.md`, `ein-kerem-jerusalem-guide.md`, `eilat-dolphin-reef-guide.md`, `galilee-wine-trail.md`
All 5 confirmed MISSING from FR via comm -23 (2026-07-30). SHIPPED iter887 SHA 8e2e60da. FR guides: 137→142/397. Build: 1148→1153 pages. Gate: 0 errors.
- egypt-jordan-israel-itinerary: "Égypte Jordanie Israël: circuit 3 pays" = France is 3rd largest Israel tourism source; very high purchase intent; TourRadar + Abraham CTAs; pairs with /fr/israel-jordan-itinerary (confirmed existing)
- ein-gedi-guide: FR Dead Sea cluster completion; "Réserve naturelle d'Ein Gedi: chutes + ibex + gorges"; GYG + Abraham CTAs; pairs with /fr/dead-sea-guide + /fr/masada-visitor-guide (both confirmed existing)
- ein-kerem-jerusalem-guide: French Catholic pilgrims (Basilique de la Visitation, Église de Saint-Jean-Baptiste, Fenêtres de Chagall à Hadassah); zero FR editorial; Jerusalem cluster extension; GYG + Yad Vashem combo tour CTAs; pairs with /fr/easter-in-jerusalem + /fr/bethlehem-travel-guide (confirmed existing)
- eilat-dolphin-reef-guide: completes FR Eilat activities cluster; "Dolphin Reef Eilat" zero FR editorial; honest semi-wild (rencontres non garanties) framing; GYG CTAs; pairs with /fr/eilat-travel-guide + /fr/eilat-beach-guide (confirmed existing)
- galilee-wine-trail: French wine tourism market (France = world's biggest wine country); "Route des vins de Galilée et Golan: circuit en voiture" zero FR editorial; Galil Mountain/Dalton/Golan Heights Winery/boutique estates; Discovercars + Booking CTAs; pairs with /fr/sea-of-galilee-guide + /fr/golan-heights-guide (need to confirm /fr/golan-heights-guide exists before authoring)
Quality: metropolitan French; YAML double-quotes; /fr/* prefix confirmed-existing pages only; no fabricated prices; Dolphin Reef semi-wild honesty; Ein Kerem Chagall Windows honesty (not authenticated attribution debates).

### Phase FR-10 (132 → 137/397) — SHIPPED iter877 5ada8f0b
Guides: `masada-visitor-guide.md`, `haifa-travel-guide.md`, `galilee-christian-sites-circuit.md`, `day-trips-from-eilat.md`, `birdwatching-in-israel.md`
SHIPPED iter877 SHA 5ada8f0b. FR guides: 132→137/397. Build: 1127→1132 pages. 1557/1557 e2e pass. Gate: 0 errors.
- masada-visitor-guide: 3-method comparison table (Chemin du Serpent/téléphérique/lever du soleil); fortress sections (Palais Nord/Ouest, synagogue, église byzantine, mur romain, citernes); INPA pass ₪29; Spectacle Son et Lumière Mar–Oct Tue+Thu 21h00; event frontmatter; cross-links dead-sea cluster + /fr/masada-tours-compared.
- haifa-travel-guide: Bahá'í Centre non-Bahá'ís exterior/terraces only (active-site honesty framing); Carmelit ₪7; Colonie Allemande; Wadi Nisnas; Stella Maris; MadaTech/Tikotin/Maritime; Bat Galim/Dado/Hof HaCarmel beaches; Akko 25min/Rosh Hanikra/Césarée/Zichron Yaakov; train TLV 55-90min.
- galilee-christian-sites-circuit: anti-clockwise ~45km lake circuit; Capharnaüm/Tabgha x2/Béatitudes/Magdala (identification honesty note)/Kourssi; Nazareth combo option.
- day-trips-from-eilat: 7 excursions + comparison table; summer heat planning 38-42°C; priceFrom/rating/reviews preserved from EN source (ranges only); cross-links /fr/petra-from-eilat-vs-amman, /fr/eilat-beach-guide, /fr/aqaba-from-eilat.
- birdwatching-in-israel: Agamon HaHula 120K cranes, Wagon Safari ₪50-80; IBRCE Eilat baguage + Festival mi-mars (LPO France 45K members angle); Golan/Gamla vautours fauves; Hai-Bar Yotvata+Carmel; En Afek; seasonal calendar; timing disclaimer.
Quality: metropolitan French; YAML double-quotes; /fr/* prefix confirmed-existing pages only; no fabricated prices or ratings; Bahá'í active-site framing; Magdala identification honesty.

### Phase ES-19 (95 → 100/397) — SHIPPED iter881 e70e4e3d
Guides: `egypt-jordan-israel-itinerary.md`, `eilat-beach-guide.md`, `ein-gedi-guide.md`, `eilat-dolphin-reef-guide.md`, `best-hotels-nazareth.md`
All 5 confirmed MISSING from ES via comm -23 (2026-07-30).
- egypt-jordan-israel-itinerary: "Israel Jordania Egipto: itinerario de 3 países" = very high purchase intent; no LATAM editorial; TourRadar + Abraham CTAs; pairs with /es/israel-jordan-itinerary (confirmed existing)
- eilat-beach-guide: "Playas de Eilat: Playa Norte vs Coral Beach" completes ES Eilat beach cluster; high search volume; Booking + GYG CTAs; pairs with /es/eilat-travel-guide + /es/eilat-hotels-guide
- ein-gedi-guide: Dead Sea eco-cluster completion; "Ein Gedi Reserva Natural" popular LATAM eco/pilgrimage tourism; GYG + Abraham CTAs; pairs with /es/dead-sea-guide + /es/masada-visitor-guide (both confirmed existing)
- eilat-dolphin-reef-guide: "Dolphin Reef Eilat" high purchase intent; honest semi-wild framing; completes Eilat activities cluster; GYG CTAs; pairs with /es/eilat-travel-guide
- best-hotels-nazareth: LATAM Catholic pilgrim accommodation; zero ES editorial; Booking affiliate; pairs with /es/nazareth-travel-guide (confirmed existing)
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix confirmed-existing pages only; no fabricated prices; Dolphin Reef semi-wild honesty note.

### Phase ES-18 (90 → 95/397) — SHIPPED iter876 5cf2bf65
Guides: `sea-of-galilee-guide.md`, `netanya-guide.md`, `best-hotels-negev.md`, `best-hotels-netanya.md`, `passover-in-israel.md`
SHIPPED iter876 SHA 5cf2bf65. ES guides: 90→95/397. Build: 1122→1127 pages. 1547/1547 e2e pass. Gate: 0 errors.
- sea-of-galilee-guide: 4 shores, Kinneret cycling circuit, Yardenit honesty note, 3 CTAs, 6 FAQs.
- netanya-guide: cliff promenade, French connection ~60K francophones, Stern Diamond Factory, Poleg Blue Flag, 2 CTAs, 6 FAQs.
- best-hotels-negev: Beresheet, Selina Ramon, Ramon Inn, Succah in the Desert (off-grid caveat), HI Beit Noam, decision matrix, 7 FAQs.
- best-hotels-netanya: 4 zones, 3 tiers, decision matrix, Shabbat note, French school holiday peaks, 6 FAQs.
- passover-in-israel: Pesaj 5787 Apr 22-29 2027, hotel programs, tourist Seder options, Birkat Kohanim, open/closed guide, 7 FAQs.
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix confirmed-existing pages only; no fabricated prices; all ₪ ranges only; Yardenit honest framing preserved.

---

## Updated status snapshot (iter877 BUILD 2026-07-30)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 397    | stable |
| fr     | 137    | 260 missing — Phase FR-10 SHIPPED iter877 5ada8f0b; **Phase FR-11 TBD** |
| de     | 127    | 270 missing — Phase DE-9 ready iter875; **all 5 confirmed missing** |
| es     | 100    | 297 missing — Phase ES-19 SHIPPED iter881 e70e4e3d; **Phase ES-20 TBD** |

**FR-phase-10 (iter877) shipped:** FR guides now 137/397.
**ES-phase-18 (iter876) shipped:** ES guides now 95/397.
**ES-phase-19 (iter881) shipped:** ES guides now 100/397.
**Next phases ready:**
- Phase DE-9: ashdod-cruise-port-excursions, best-hotels-sea-of-galilee, vegan-vegetarian-israel, israel-for-german-travelers, best-hotels-negev
- Phase FR-11: egypt-jordan-israel-itinerary, ein-gedi-guide, ein-kerem-jerusalem-guide, eilat-dolphin-reef-guide, galilee-wine-trail
- Phase ES-20: TBD (next RESEARCH iteration to define)
**Freshness (iter875):** Gordonia Zichron Yaakov confirmed opened February 1, 2026 (141 rooms, 81m infinity pool, adults 10+, Gordonia Hotels brand). BACKLOG Gordonia item upgraded P3→P2 with confirmed date. InterContinental Jerusalem: still "late summer 2026" per IHG listing; check August/September 2026. easyJet TLV: guide correctly shows suspended/late-October-2026 due to Operation Rising Lion (Iran conflict June 2026).

---

## Updated status snapshot (iter880 RESEARCH 2026-07-30)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 397    | stable |
| fr     | 137    | 260 missing — Phase FR-10 SHIPPED iter877 5ada8f0b; **Phase FR-11 defined iter880** |
| de     | 132    | 265 missing — Phase DE-9 SHIPPED iter878 a03df166; **Phase DE-10 defined iter880** |
| es     | 100    | 297 missing — Phase ES-19 SHIPPED iter881 e70e4e3d; **Phase ES-20 TBD** |

**DE-phase-9 (iter878) shipped:** DE guides now 132/397.
**DE-phase-9 link-audit (iter879) shipped:** 15 register fixes + 2 meta desc trims.
**ES-phase-19 (iter881) shipped:** ES guides now 100/397.
**All three next phases defined iter880:**
- Phase ES-19: SHIPPED iter881 e70e4e3d (egypt-jordan-israel-itinerary, eilat-beach-guide, ein-gedi-guide, eilat-dolphin-reef-guide, best-hotels-nazareth)
- Phase FR-11: egypt-jordan-israel-itinerary, ein-gedi-guide, ein-kerem-jerusalem-guide, eilat-dolphin-reef-guide, galilee-wine-trail (all confirmed MISSING from FR)
- Phase DE-10: galilee-christian-sites-circuit, ein-gedi-guide, haifa-travel-guide, egypt-jordan-israel-itinerary, eilat-beach-guide (all confirmed MISSING from DE)
**Freshness (iter880):** InterContinental Jerusalem still "late summer 2026" per travel sources — current guide caveat still accurate. The Yacht Herzliya (Fattal, 325 rooms, opened June 2026) already in herzliya-guide.md Booking CTA. Airport City Eilat cluster (5 hotels + Princess revival) already in eilat-hotels-guide.md with correct framing (phased openings, check live availability). Israir India routes (Delhi+Mumbai, from April 2026) NOT in cheap-flights or airlines guides — added P2/S freshness BACKLOG item (verify post-Operation Rising Lion status before updating).

---

## Updated status snapshot (iter885 RESEARCH 2026-07-31)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 397    | stable |
| fr     | 137    | 260 missing — Phase FR-11 defined iter880 (next BUILD candidate); **Phase FR-12 defined iter885** |
| de     | 132    | 265 missing — Phase DE-10 defined iter880 (next BUILD candidate); **Phase DE-11 defined iter885** |
| es     | 100    | 297 missing — Phase ES-19 SHIPPED iter881 e70e4e3d; **Phase ES-20 defined iter885** |

## Updated status snapshot (iter886 BUILD de-phase-10 SHIPPED 2026-07-31)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 397    | stable |
| fr     | 142    | 255 missing — Phase FR-11 SHIPPED iter887 8e2e60da; **Phase FR-12 defined iter885 (iter889+ candidate)** |
| de     | 137    | 260 missing — Phase DE-10 SHIPPED iter886 2a552983; **Phase DE-11 defined iter885 (iter889+ candidate)** |
| es     | 100    | 297 missing — Phase ES-19 SHIPPED iter881 e70e4e3d; **Phase ES-20 defined iter885 (iter889+ candidate)** |

**FR-phase-11 (iter887) shipped:** FR guides now 142/397. FR now leads DE (142 vs 137).
**Phase DE-11 (iter885):** digital-nomad-israel, ein-kerem-jerusalem-guide, best-hotels-nazareth, galilee-food-guide, golan-heights-tours-compared. Target iter889+.
**Phase FR-12 (iter885):** digital-nomad-israel, eilat-snorkeling-guide, best-hotels-nazareth, galilee-food-guide, golan-heights-tours-compared. Target iter889+.

### Phase ES-20 (100 → 105/397) — DEFINED iter885

Guides: `hiking-in-israel.md`, `eilat-snorkeling-guide.md`, `ein-kerem-jerusalem-guide.md`, `golan-heights-tours-compared.md`, `haifa-cruise-terminal-guide.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-07-31).
- hiking-in-israel: "Senderismo en Israel" zero ES editorial; popular LATAM eco-tourism + adventure market; Israel Trail (Shvil Yisrael) sections, Golan Heights, Negev highlands; GYG CTAs; pairs with /es/negev-desert-guide + /es/golan-heights-guide (both confirmed existing)
- eilat-snorkeling-guide: completes ES Eilat water-activities cluster (eilat-beach-guide + eilat-diving-snorkeling + eilat-dolphin-reef-guide now in ES); Coral Beach snorkeling pass (honest: gear rental from glass-bottom boat pier); GYG CTAs; pairs with /es/eilat-travel-guide
- ein-kerem-jerusalem-guide: Jerusalem pilgrimage village; Church of St. John Baptist + Church of Visitation; LATAM Catholic pilgrim route; popular independent day trip from Jerusalem; zero ES editorial; pairs with /es/jerusalem-travel-guide (confirmed existing)
- golan-heights-tours-compared: completes ES Golan cluster (golan-heights-guide confirmed existing); winery tours (Odem Mountain, Pelter, Bazelet HaGolan), off-road jeep tours, Nimrod Fortress; TourRadar + GYG CTAs; pairs with /es/golan-heights-guide
- haifa-cruise-terminal-guide: completes Haifa cluster (haifa-travel-guide confirmed existing in ES); new May 2026 cruise terminal (28 border-control booths); BGA→Haifa transfer options; LATAM cruise-from-Israel demand; Booking CTA (Haifa hotels); pairs with /es/haifa-travel-guide
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix confirmed-existing pages only; no fabricated prices; Coral Beach honest snorkeling condition note; Golan Heights political context note (Israeli-controlled; settlement wineries context-appropriate for non-Israeli audiences).

### Phase ES-21 (105 → 110/398) — SHIPPED iter891 a8307efb

Guides: `galilee-food-guide.md`, `galilee-wine-trail.md`, `holy-sites-dress-code-etiquette.md`, `guided-vs-self-guided-israel.md`, `eilat-vs-aqaba.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-07-31).
- galilee-food-guide: "Gastronomía de Galilea / Cocina Israelí del Norte" — LATAM food-tourism is growing fast (Colombia, Mexico, Argentina strong food-travel segment); Galilee Culinary Institute Gonen (farm-to-table tasting menus), St. Peter's fish, freekeh, za'atar, hummus trail from Acre to Tiberias; zero LATAM editorial competition; GYG + Booking CTAs; pairs with /es/sea-of-galilee-guide (confirmed existing)
- galilee-wine-trail: "Ruta del Vino de Galilea y Golán" — winery circuit (Galil Mountain, Dalton, Golan Heights Winery, Pelter, Odem Mountain); wine tourism is strong in LATAM Spanish markets (Chile, Argentina, Spain-adjacent culture); Discovercars + GYG CTAs; pairs with /es/golan-heights-guide + /es/sea-of-galilee-guide (both confirmed existing); Golan Heights political context note
- holy-sites-dress-code-etiquette: "Código de Vestimenta en los Lugares Sagrados de Israel" — essential for LATAM Catholic + Jewish pilgrimage market; Western Wall gender division + head covering + prayer etiquette; Church of Holy Sepulchre (six-denomination dress norms); Al-Aqsa / Dome of the Rock; pairs with /es/western-wall-guide + /es/church-holy-sepulchre-guide + /es/bethlehem-travel-guide (all confirmed existing); zero LATAM-specific editorial competition (only Spain-based partial coverage found via viajesaisrael.com/matadornetwork.com/es)
- guided-vs-self-guided-israel: "¿Guía Privado o Viaje Independiente en Israel?" — highest-purchase-intent decision guide; converts fence-sitters toward GYG/Viator group tour affiliate bookings; helps LATAM travelers who are uncertain about self-driving vs. group; format: comparison table + cost analysis + verdict per traveler type; pairs with /es/best-tours-in-israel (confirmed existing); GYG + Viator CTAs; zero LATAM editorial competition
- eilat-vs-aqaba: "Eilat o Aqaba: ¿Cuál Elegir para tus Vacaciones en el Mar Rojo?" — Red Sea head-to-head for LATAM beach vacation planners; only competitor found is greca.co Eilat guide (2023, no comparison); covers: visa friction (Israel ETA-IL vs. Jordan on-arrival for LATAM), flight access, reef quality (Coral Beach Reserve vs. Aqaba reefs), nightlife, price tiers; HONESTY: frame Red Sea reef conditions accurately (Eilat Coral Beach bleached but recovering; snorkeling vs. diving tradeoffs); pairs with /es/eilat-travel-guide + /es/aqaba-from-eilat (both confirmed existing); GYG + Booking CTAs
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix confirmed-existing pages only; no fabricated prices; Golan Heights political context note (Israeli-administered; settlement wineries note); holy sites paired-naming carried from EN (Al-Aqsa/Temple Mount neutral framing); reef conditions hedged honestly.

### Phase FR-12 (142 → 147/398) — DEFINED iter885
Target: after FR-11 ships (iter887 candidate → FR-12 circa iter890+).

Guides: `digital-nomad-israel.md`, `eilat-snorkeling-guide.md`, `best-hotels-nazareth.md`, `galilee-food-guide.md`, `golan-heights-tours-compared.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-07-31).
- digital-nomad-israel: "Nomade numérique Israël" popular French digital nomad / remote-work market; Start-up Nation coworking scene (WeWork TLV, Mindspace, Soho House); practical visa/tax info for French nationals; zero FR editorial; pairs with /fr/tel-aviv-travel-guide (confirm existing)
- eilat-snorkeling-guide: completes FR Eilat water-activities cluster; "Snorkeling Eilat" popular French diving/snorkeling tourist searches; Coral Beach + glass-bottom boat; GYG CTAs; pairs with /fr/eilat-travel-guide (confirm existing)
- best-hotels-nazareth: FR Catholic pilgrim accommodation market; Nazareth significant francophone Christian pilgrimage demand; Booking affiliate; pairs with /fr/nazareth-travel-guide (confirm existing before using /fr/ prefix)
- galilee-food-guide: Galilee culinary tourism; French food-culture audience; wine (Galilee + Golan) + local produce (St. Peter's fish, za'atar, freekeh) + hummus trail; Galilee Culinary Institute Gonen; pairs with /fr/galilee-travel-guide (confirm existing)
- golan-heights-tours-compared: completes FR Golan cluster; French wine-tourism audience (Golan wineries); winery tours + off-road jeep + Nimrod Fortress; TourRadar + GYG; pairs with /fr/golan-heights-guide (confirm existing)
Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages; no fabricated prices; Golan Heights political context note; Checkpoint 300 West Bank neutral framing if referenced.

### Phase DE-11 (137 → 142/397) — DEFINED iter885
Target: DE-10 SHIPPED iter886 2a552983 → DE-11 candidate iter889+.

Guides: `digital-nomad-israel.md`, `ein-kerem-jerusalem-guide.md`, `best-hotels-nazareth.md`, `galilee-food-guide.md`, `golan-heights-tours-compared.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-07-31).
- digital-nomad-israel: "Digitaler Nomade Israel" DACH remote-work + freelancer market; Start-up Nation coworking (WeWork TLV, Mindspace); visa/tax notes for German freelancers; popular DACH tech-worker travel angle; zero DE editorial; pairs with /de/tel-aviv-travel-guide (confirm existing)
- ein-kerem-jerusalem-guide: DACH Christian + cultural tourism; Church of St. John Baptist + Church of Visitation; German evangelical + Catholic pilgrimage groups visit routinely; pairs with /de/jerusalem-travel-guide (confirm existing)
- best-hotels-nazareth: DACH Christian pilgrim accommodation; German evangelical + Catholic pilgrimage market; Booking affiliate; pairs with /de/nazareth-travel-guide (confirm existing)
- galilee-food-guide: DACH food-tourism audience; German wine culture interest in Golan + Galilee wines; Galilean cuisine (lamb, St. Peter's fish, freekeh, za'atar) aligns with DACH culinary travel trends; Galilee Culinary Institute Gonen; pairs with /de/galilee-travel-guide (confirm existing)
- golan-heights-tours-compared: completes DE Golan cluster; winery tours (Odem, Pelter, Bazelet HaGolan) align with DACH wine-tourism; off-road jeep + Nimrod Fortress; TourRadar + GYG CTAs; pairs with /de/golan-heights-guide (confirm existing)
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages; no fabricated prices; Golan Heights political context note; historical sensitivity (German-Israel context) handled by referencing existing DE guide tone.

---

## Updated status snapshot (iter895 RESEARCH 2026-07-31)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 398    | stable |
| fr     | 142    | 256 missing — Phase FR-12 defined iter885 (next BUILD candidate); **Phase FR-13 defined iter895** |
| de     | 142    | 256 missing — Phase DE-11 SHIPPED iter893 2e8bb16f; **Phase DE-12 defined iter895** |
| es     | 110    | 288 missing — Phase ES-21 SHIPPED iter891 a8307efb; **Phase ES-22 defined iter895** |

**DE-11 (iter893) shipped:** DE guides now 142/398.
**ES-21 (iter891) shipped, ES-22 (iter895) defined.**
**FR-12 (iter885) defined, FR-13 (iter895) defined.**
**Next BUILD candidates:** ES-22 (highest priority, largest gap) → then DE-12 or FR-12 by rotation.

### Phase ES-22 (110 → 115/398) — SHIPPED iter896 d79c6e80

Guides: `jordan-pass-guide.md`, `petra-from-israel.md`, `tel-aviv-nightlife.md`, `israel-with-kids.md`, `israel-road-trip.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-07-31).
- jordan-pass-guide: "Jordan Pass: guía completa para viajeros desde Israel" — Very high purchase intent; LATAM travelers doing Israel+Jordan route consistently need Jordan Pass to save on Petra + visa fees; zero dedicated LATAM Spanish editorial guide (Civitatis links to official Jordan Tourism site only); passes Petra + 40 attractions + Jordan visa; price tiers (1-day $70 / 2-day $75 / 3-day $80 as of mid-2026 — verify at visitjordan.com before authoring); pairs with /es/israel-jordan-itinerary + /es/egypt-jordan-israel-itinerary (both confirmed existing); GYG Petra day-trip CTAs; Booking Aqaba CTAs
- petra-from-israel: "Cómo visitar Petra desde Israel" — LATAM combined-trip logistics query ("Petra desde Israel bus / vuelo / tour"); Wadi Araba crossing from Eilat (Yitzhak Rabin/Wadi Araba checkpoint; 06:30–20:00); Aqaba-Petra bus/JETT logistics; vs flying ELY/RJET Amman + then drive; tour vs. self-guided; 2-day recommendation; HONESTY: "Little Petra" vs. main Siq/Treasury distinction clear; no fabricated entry prices (verify at visitpetra.jo); pairs with /es/aqaba-from-eilat + /es/jordan-pass-guide (new) + /es/israel-jordan-itinerary; GYG Petra tour CTAs
- tel-aviv-nightlife: "Vida nocturna en Tel Aviv: bares, clubs y espectáculos" — LATAM urban tourism + backpacker market; "Tel Aviv vida nocturna" = top Civitatis/Viator search term; city has vibrant 24/7 scene; content: Florentin vs. Rothschild bar strips, rooftop bars, club venue guide (The Block, Haoman 17), drag/LGBTQ scene (honest: context for LATAM audience), Shabbat nights busier than Fridays note; GYG nightlife walking tour CTAs; no fabricated cover prices (₪ ranges); pairs with /es/tel-aviv-beach-guide + /es/lgbtq-travel-israel (confirm existing before using /es/ prefix)
- israel-with-kids: "Israel con niños: guía de viaje familiar" — LATAM family travel is a huge segment (Argentina/Mexico/Colombia travel extensively with children); "Israel en familia" = zero Civitatis editorial guide; content: age-appropriate itinerary for Jerusalem/Tel Aviv/Eilat, child admission prices (INPA under-5 free), Underwater Observatory Eilat, Timna Park, interactive museums (LA Mayer/Bloomfield Science), safety tips for young travelers, Shabbat timing impacts; Booking family-room CTAs; GYG family tour CTAs; HONESTY: no fabricated child prices (₪ ranges + "verify at gate"); pairs with /es/first-time-in-israel + /es/best-time-to-visit-israel (both confirmed existing)
- israel-road-trip: "Road trip por Israel: ruta completa en coche" — LATAM adventure + self-drive tourism; "ruta en coche por Israel" = zero dedicated LATAM Spanish editorial guide (only aggregator listicles); 7–10 day circuit Tel Aviv → Jerusalem → Dead Sea → Negev (Highway 40/Ramon Crater) → Eilat → back via Arava/Highway 90 → Sea of Galilee → Golan → Haifa → Tel Aviv; toll roads / Waze recommendation / driving in Israel tips; Discovercars affiliate CTAs (highest-margin affiliate on site); pairs with /es/car-rental-israel + /es/driving-in-israel (both confirmed existing)
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed existing ES pages; no fabricated prices (₪/$ ranges only + verify-before-visiting caveats); Jordan Pass prices hedged with "verify at visitjordan.com"; Golan Heights political context note where referenced; Petra entry fees honest ranges.

### Phase FR-13 (147 → 152/398) — SHIPPED iter907 36b05ce9

Target: after FR-12 ships.
Guides: `eilat-vs-aqaba.md`, `guided-vs-self-guided-israel.md`, `haifa-cruise-terminal-guide.md`, `jordan-pass-guide.md`, `eilat-nightlife.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-07-31).
- eilat-vs-aqaba: "Eilat ou Aqaba: lequel choisir pour la mer Rouge?" — FR travelers doing Israel or Jordan Red Sea comparison; France = 3rd largest Israel tourism source; Red Sea beach comparison popular among FR market (Club Med/Thomas Cook FR Red Sea packages); Coral Beach bleached-but-recovering honesty; Aqaba Japanese Garden snorkeling; 11-row comparison table; pairs with /fr/eilat-travel-guide + /fr/aqaba-from-eilat (both confirmed existing); GYG + Booking CTAs
- guided-vs-self-guided-israel: "Guide privé ou voyage indépendant en Israël?" — Le Routard target audience (independent FR travelers); "guide de voyage Israel" = FR decision-making content gap; cost comparison table (guide privé 140–320€ vs. autoguidé + voiture); MOT license requirement (Western Wall Tunnels + City of David); 7 traveler-type matrix; pairs with /fr/best-tours-in-israel (confirm existing before using /fr/ prefix)
- haifa-cruise-terminal-guide: "Terminal de croisière de Haïfa 2026" — May 2026 mega-terminal (5,500m², 28 immigration booths, double capacity); MSC/Costa/Royal Caribbean carry many FR passengers on Med cruises; shore excursion options from Haïfa (Akko, Bahá'í, Nazareth, Rosh Hanikra, Caesarée, Capharnaüm); Bahá'í Gardens active religious site framing (non-Bahá'ís exterior/terraces only); ETA-IL requirement for visa-exempt FR passengers pre-boarding; pairs with /fr/haifa-travel-guide (confirmed existing); GYG + Viator shore excursion CTAs
- jordan-pass-guide: "Jordan Pass: guide complet pour visiter Petra depuis Israël" — FR Israel+Jordan travelers; Petra on virtually every FR Middle East bucket list; content: tiers (1-/2-/3-day), what's included (40+ attractions + visa), validity window, where to activate, practical Eilat → Wadi Araba → Petra route; pairs with /fr/israel-jordan-itinerary (confirmed existing); GYG Petra CTAs; Booking Jordan CTAs
- eilat-nightlife: "Vie nocturne à Eilat" — Completes FR Eilat cluster (eilat-travel-guide + eilat-beach-guide + eilat-dolphin-reef-guide + aqaba-from-eilat already in FR); FR young travelers + all-inclusive resort market; Club Kokomo + rooftop bars + terminal park entertainment area; honest framing (Eilat nightlife significantly quieter than Tel Aviv); no fabricated cover prices (₪ ranges); pairs with /fr/eilat-travel-guide (confirmed existing); GYG tour CTAs
Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages; no fabricated prices; Coral Beach reef conditions honest; Haïfa cruise terminal 2026 confirmed (JCTIA + cruiseindustrynews.com sourcing); MOT guide licensing note.

### Phase DE-12 (142 → 147/398) — SHIPPED iter903 8193efe9

Target: after DE-12 is next after DE-11 REVIEW (iter894 clean).
Guides: `birdwatching-in-israel.md`, `easter-in-jerusalem.md`, `eilat-dolphin-reef-guide.md`, `eilat-snorkeling-guide.md`, `jordan-pass-guide.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-07-31).
- birdwatching-in-israel: "Vogelbeobachtung in Israel: Kraniche, Raubvögel und Zugvögel" — Germany has millions of NABU/BUND members; Israel = top European birding destination (tri-continental flyway, 500M+ migrating birds/year); "Vogelbeobachtung Israel" = virtually unclaimed DACH editorial niche; Agamon HaHula (120K+ cranes Nov–Jan, Wagon Safari ₪50–80), IBRCE Eilat (ringing station, March festival), Gamla vultures, Hai-Bar Yotvata/Carmel, En Afek; seasonal calendar table; NABU partnership tip for DACH birders; LPO France angle → replace with NABU for DE; pairs with /de/galilee-travel-guide (confirm existing)
- easter-in-jerusalem: "Ostern und Karwoche in Jerusalem" — DACH Christian + Catholic pilgrim market (Evangelische Kirche Deutschlands, Catholic dioceses organize group tours routinely); "Ostern Jerusalem" = meaningful DACH pilgrimage query; Karwoche 2027 (Ostern Apr 20 Catholic; Apr 12 Orthodox/Armenisch; DACH-relevant distinction); Via Dolorosa Kreuzweg-Prozessionen; Heiliges Grab Mitternachtsgottesdienst; Heiliges Feuer Saturday logistics; Checkpoint 300 + Betlehem note; crowd management Old City; pairs with /de/christmas-in-israel (confirmed existing) + /de/bethlehem-travel-guide (confirmed existing); GYG Easter week tour CTAs
- eilat-dolphin-reef-guide: "Dolphin Reef Eilat: Begegnungen, Schnorcheln, Tauchen" — Completes DE Eilat activities cluster (eilat-travel-guide + eilat-beach-guide + eilat-snorkeling-guide already/incoming in DE); DACH dolphin encounter tourism; TUI/Condor winter charter packages mention Dolphin Reef; honest framing "Begegnungen mit Delfinen nicht garantiert" (semi-wild pod, approx. 10 resident dolphins); 3 tiers (Strandaufenthalt / Schnorchel-Session / Tauchgang); no fabricated encounter rates; pairs with /de/eilat-travel-guide + /de/eilat-snorkeling-guide (incoming DE-12); GYG + Booking CTAs
- eilat-snorkeling-guide: "Schnorcheln in Eilat: Korallenriff und Glasbodenboot" — Completes DE Eilat water-sports cluster; DACH winter sun + Red Sea snorkeling very popular (TUI Eilat packages historically included snorkel trips); "Schnorcheln Rotes Meer Eilat" = DACH search query; Korallenreservat Coral Beach (honest: bleached but recovering; reef-safe sunscreen mandatory); glass-bottom boat pier; Underwater Observatory (Meeresmuseum); gear rental; pairs with /de/eilat-travel-guide (confirmed existing); GYG CTAs
- jordan-pass-guide: "Jordan Pass: vollständiger Leitfaden für Israel-Reisende" — DACH Israel+Jordan route is popular with Eberhardt Travel, viel-unterwegs.de, TourRadar packages; "Jordan Pass" = well-known term in DACH travel; content: price tiers (verify at visitjordan.com), what's included, when to activate, Wadi Araba crossing from Eilat logistics, Petra timing tips (60%+ visit with Israel combo); HONESTY: verify current price tiers before authoring — do NOT fabricate; pairs with /de/israel-jordan-itinerary + /de/egypt-jordan-israel-itinerary (both confirmed existing); GYG Petra CTAs; TourRadar CTA
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages; no fabricated prices; "Begegnungen nicht garantiert" framing for Dolphin Reef; Coral Beach reef condition honest note; Jordan Pass prices hedged with "Prüfen Sie die aktuellen Preise unter visitjordan.com"; Karwoche dates 2027 verified.

---

## Updated status snapshot (iter900 RESEARCH 2026-07-31)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 398    | stable |
| fr     | 147    | 251 missing — Phase FR-12 SHIPPED iter898 3a1da161; **Phase FR-13 defined iter895 (next BUILD candidate)**; Phase FR-14 defined iter900 |
| de     | 152    | 246 missing — Phase DE-13 SHIPPED iter918 bc83fca6; **Phase DE-14 defined iter905 (next DE BUILD candidate)** |
| es     | 120    | 278 missing — Phase ES-23 SHIPPED iter901 d6cbe672; **Phase ES-24 TBD** |

**FR-12 (iter898) shipped:** FR guides now 147/398.
**ES-23 (iter901) shipped:** ES guides now 120/398.
**Next BUILD candidates by priority:** ES-28 (highest gap 258) → FR-15 → DE-14 by rotation.

### Phase ES-23 (115 → 120/398) — SHIPPED iter901 d6cbe672

Guides: `eilat-nightlife.md`, `golan-heights-wineries.md`, `haifa-food-guide.md`, `israel-5-vs-7-vs-10-days.md`, `hotels-near-ben-gurion-airport.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-07-31, iter900).
- eilat-nightlife: "Vida nocturna en Eilat" — completes ES Eilat cluster (eilat-travel-guide + eilat-beach-guide + eilat-dolphin-reef-guide + eilat-snorkeling-guide + eilat-diving-snorkeling already in ES); LATAM beach + resort nightlife market; Club Kokomo + rooftop bars + Promenade entertainment zone; honest framing (Eilat quieter than Tel Aviv); no fabricated cover prices (₪ ranges); pairs with /es/eilat-travel-guide (confirmed existing); GYG night tour CTAs
- golan-heights-wineries: "Bodegas del Golán: guía de enoturismo" — wine tourism; LATAM wine culture markets (Argentina, Chile, Uruguay); Yarden/Chateau Golan/Pelter/Odem Mountain/Assaf boutique estates; tasting room hours + booking tips; Golan Heights political context note (factual/neutral); pairs with /es/galilee-wine-trail + /es/golan-heights-guide (both confirmed existing); Discovercars + GYG CTAs
- haifa-food-guide: "Gastronomía en Haifa: dónde comer y qué probar" — completes ES Haifa cluster (haifa-travel-guide confirmed existing in ES); Wadi Nisnas market mixed Arab-Jewish cuisine; Daliyat al-Carmel Druze village restaurants 30min by car; Port District restaurants + craft beer scene; Deutsche Kolonie café strip; Hummus Abu Maron + Said iconic dishes; Shuk Talpiot food hall; pairs with /es/haifa-travel-guide (confirmed existing); Booking Haifa hotels + GYG food tour CTAs
- israel-5-vs-7-vs-10-days.md: "¿Cuántos días necesitas en Israel? 5 vs 7 vs 10 días" — very high decision-stage intent ("cuántos días Israel" is a top LATAM planning query); comparison framework with day-by-day city + site allocation per duration; 5 days = Jerusalem+Dead Sea+TLV core; 7 days = adds Galilee or Negev; 10 days = adds Golan+Eilat; affiliate hook = shorter trips → GYG guided day tours, longer trips → Booking accommodation sequence; pairs with /es/first-time-in-israel + /es/best-time-to-visit-israel (both confirmed existing); no fabricated prices
- hotels-near-ben-gurion-airport: "Hoteles cerca del Aeropuerto Ben Gurion (TLV)" — very high booking intent; LATAM travelers with late-night arrivals / early departures / overnight transit; comparison of on-site Yitzhak Rabin (now TRYP by Wyndham), on-airport pod options, Lod city 5min, Modi'in 20min, Petah Tikva options, Tel Aviv proper (45min); pairs with /es/ben-gurion-airport-guide + /es/ben-gurion-airport-transfers (both confirmed existing); Booking affiliate CTAs (highest conversion rate on site for accommodation clicks)
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed existing ES pages; no fabricated prices (₪/$ ranges + "verify at gate/booking platform"); Golan Heights political context note (factual/neutral — Israeli-administered since 1967, US recognized 2019, disputed internationally); nightlife no fabricated cover prices or ratings.

### Phase DE-13 (147 → 152/398) — SHIPPED iter918 bc83fca6

Target: after DE-12 ships (DE-12 candidate for next DE BUILD iteration).
Guides: `eilat-vs-aqaba.md`, `galilee-wine-trail.md`, `haifa-food-guide.md`, `golan-heights-hiking-trails.md`, `hotels-near-ben-gurion-airport.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-07-31, iter900).
- eilat-vs-aqaba: "Eilat oder Aqaba: Welches Rote Meer-Ziel ist besser?" — completes DE Red Sea cluster (eilat-travel-guide + eilat-beach-guide + eilat-snorkeling-guide + eilat-dolphin-reef-guide in DE-12); DACH comparison market; TUI/Condor package comparison popular for DACH Red Sea packages; Coral Beach bleached-but-recovering honesty; Aqaba Japanese Garden/Cedar Pride diver preference; 11-row comparison table; Wadi Araba crossing 06:30–20:00; reef-safe sunscreen Pflicht Coral Beach; pairs with /de/eilat-travel-guide + /de/aqaba-from-eilat (both confirmed existing); GYG + Booking CTAs
- galilee-wine-trail: "Weinstraße Galiläa und Golan: 2-Tage-Selbstfahrerroute" — German wine tourism culture (Germany = Europe's 3rd largest wine producer; DACH wine tourists active); Weingut Yarden/Chateau Golan Tag 1 Golan; Galil Mountain/Dalton/Safed Tag 2 Alta Galilea; 0,05% BAK-Grenze + Fahrersein-Hinweis; Rosh Pinna Übernachtungsbasis; Golan politischer Hinweis (faktisch/neutral); pairs with /de/golan-heights-guide (confirmed existing); Discovercars + Booking Rosh Pinna + GYG CTAs
- haifa-food-guide: "Gastronomie in Haifa: kulinarische Stadtführung" — completes DE Haifa cluster (haifa-travel-guide confirmed existing in DE); Deutsche Kolonie café strip (DACH historical hook — 19th-century German Templar architecture); Wadi Nisnas market mixed Arab-Jewish cuisine; Port restaurants + craft beer; Daliyat al-Carmel Druze village 30min; Said Hummus iconic; Shuk Talpiot food hall; pairs with /de/haifa-travel-guide (confirmed existing); Booking Haifa + GYG food tour CTAs
- golan-heights-hiking-trails: "Wandern auf den Golanhöhen: Wanderwege und Tipps" — DACH hiking culture (German Wanderkultur; DACH is Europe's #1 hiking market per VDN data); Golan offers unique basalt-plateau landscape + Nimrod Fortress + Banias waterfall + Gamla vultures; summer heat warning + sun protection; map + trail lengths + difficulty table; Golan political context note; pairs with /de/golan-heights-guide + /de/golan-heights-tours-compared (both confirmed existing); GYG Golan hiking CTAs
- hotels-near-ben-gurion-airport: "Hotels in der Nähe des Flughafens Ben Gurion (TLV)" — high booking intent; DACH travelers with late arrivals / early departures / Frankfurt/Zurich/Vienna red-eyes common; TRYP by Wyndham on-site; Lod/Modi'in/Petah Tikva options; Tel Aviv 45min; comparison table; pairs with /de/ben-gurion-airport-guide (confirmed existing); Booking affiliate CTAs
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages; no fabricated prices; Golan Heights political context note (factual/neutral); Coral Beach reef condition honest; 0,05% BAK-Grenze wine trail; German Wanderkultur angle for hiking guide.

### Phase FR-14 (152 → 157/398) — SHIPPED iter913 d949691f

Guides: `haifa-food-guide.md`, `golan-heights-wineries.md`, `hotels-near-ben-gurion-airport.md`, `galilee-vs-golan-weekend.md`, `glamping-israel.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-07-31, iter900).
- haifa-food-guide: "Gastronomie à Haïfa : marchés, cuisine arabe-juive et bières artisanales" — completes FR Haifa cluster (haifa-travel-guide confirmed existing in FR); French food-culture audience appreciates market coverage (Wadi Nisnas marché Arab-Juif; Shuk Talpiot); Druze village Daliyat al-Carmel labneh + laffa 30min de Haïfa; Colonie Allemande café strip; Said Hummus iconique; port restaurant strip + bière artisanale (Shapiro/Six Points sourcing); pairs with /fr/haifa-travel-guide (confirmed existing); Booking Haïfa + GYG food tour CTAs
- golan-heights-wineries: "Vignobles du Golan : guide de l'œnotourisme" — French wine tourism audience (France = world's largest wine-producing country; French wine tourists highly active internationally); Golan = Israel's premier wine region; Yarden/Chateau Golan/Pelter/Odem Mountain/Assaf; tasting room guide; Golan Heights political context note (factual/neutral); pairs with /fr/galilee-wine-trail (confirmed existing) + /fr/golan-heights-guide (confirm /fr/ exists before prefixing); Discovercars + GYG CTAs
- hotels-near-ben-gurion-airport: "Hôtels près de l'aéroport Ben Gourion (TLV)" — high booking intent; FR travelers with Air France/Transavia/El Al CDG/ORY late-night arrivals; TRYP by Wyndham on-site; Lod/Modi'in/Petah Tikva options; Tel Aviv 45min; comparison table; pairs with /fr/ben-gurion-airport-guide (confirm exists); Booking affiliate CTAs
- galilee-vs-golan-weekend: "Week-end en Galilée ou sur le Golan : lequel choisir?" — FR independent travelers planning a 2-day northern Israel detour; comparison framework (nature/wine/religious sites/hiking/cuisine); authentic local experiences vs. lake pilgrimage circuit; decision matrix by traveler type; pairs with /fr/galilee-travel-guide + /fr/golan-heights-guide + /fr/galilee-wine-trail (all confirmed existing in FR or confirm); GYG CTAs
- glamping-israel: "Glamping en Israël : hébergements insolites dans la nature" — French glampisme/hébergement insolite market is growing rapidly (France #1 glamping market in Europe per Glamping Hub data); Beresheet Desert Lodge (Makhtesh Ramon crater rim), Succah in the Desert off-grid sukkot, Yahel outpost Arava, Ein Gedi kibbutz glamping, North Galilee moshav zimmer style; honest pricing in ₪ ranges; pairs with /fr/best-hotels-negev + /fr/sea-of-galilee-guide (both confirmed existing); Booking CTAs
Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages; no fabricated prices; Golan Heights political context note (factual/neutral); glamping prices as ₪ ranges only; Beresheet/Succah prices in ranges.

### Phase ES-26 (130 → 135/398) — SHIPPED iter911 65e3f5c9

Target: iter911 BUILD (next BUILD iteration; ES highest priority, largest gap 268 remaining).
Guides: `tel-aviv-neighborhoods-guide.md`, `glamping-israel.md`, `israel-biblical-highway.md`, `getyourguide-vs-viator-israel.md`, `mitzpe-ramon-guide.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-01, iter910).
- tel-aviv-neighborhoods-guide: "Barrios de Tel Aviv: Guía Completa para Explorar la Ciudad" — very high LATAM search intent ("barrios de Tel Aviv", "mejores zonas Tel Aviv dónde alojarse"); Civitatis confirmed has guided tours but NO comprehensive editorial neighborhoods comparison guide in Spanish; content: Neve Tzedek (boutique/arts), Rothschild/Florentin (nightlife/design), Jaffa (Arab-Jewish heritage), Kerem HaTeimanim (Yemenite Quarter, Carmel Market), Dizengoff (café/beach), HaKirya (business); per-neighborhood hotel tiers; Booking.com affiliate per zone; pairs with /es/tel-aviv-beach-guide + /es/3-days-in-tel-aviv (both confirmed existing)
- glamping-israel: "Glamping en Israel: Alojamientos Únicos en la Naturaleza" — eco-tourism segment growing in LATAM (Argentina/Colombia/Chile eco-tourism demand high); zero LATAM Spanish editorial competition confirmed; DE-14 + FR-14 already defined for this guide; content: Beresheet Desert Lodge (Makhtesh Ramon crater rim, Relais & Châteaux, pricing ₪ ranges only), Succah in the Desert (off-grid sukkot near Avdat, primitive/spiritual), Yahel outpost Arava (south Negev eco-tent), Ein Gedi kibbutz glamping (Dead Sea nature reserve access), North Galilee moshav zimmer style (B&B eco-cottage); season guide (avoid Jul–Aug Negev heat; spring/autumn ideal); pairs with /es/best-hotels-negev + /es/3-days-in-negev (both confirmed existing); Booking.com glamping property CTAs
- israel-biblical-highway: "La Carretera Bíblica de Israel (Ruta 60): Guía 2026" — Route 60 officially inaugurated "Biblical Highway" June 18, 2026 by PM Netanyahu + US Ambassador Huckabee (Route 66-style pilgrimage branding); very high LATAM evangelical/Catholic pilgrimage intent ("Caminos Bíblicos de Israel", "Ruta Bíblica Israel", "Tierra Santa Ruta 60"); zero LATAM editorial competition (compasstravelisrael.com/viajesaisrael.com only have tour packages); EN guide `israel-biblical-highway.md` exists with full content including June 2026 inauguration; key sites: Nazareth (north) → Beit El → Shiloh → Bethlehem → Jerusalem → Hebron area → Beersheba (south); HONESTY: route passes through West Bank sections — carry neutral/factual framing from EN guide exactly; "check travel.state.gov/gov.uk/dfat before driving through West Bank sections" standard note; recommend guided tours for West Bank section; DiscoverCars self-drive + GYG guided biblical tours CTAs; pairs with /es/christian-pilgrimage-holy-land + /es/bethlehem-travel-guide (both confirmed existing)
- getyourguide-vs-viator-israel: "GetYourGuide vs Viator en Israel: ¿Cuál es Mejor para Reservar Tours?" — highest decision-stage affiliate value; both platforms widely used in LATAM (LATAM travelers heavily research both before booking); zero LATAM editorial comparison guide confirmed; content: comparison table (tour selection breadth/price-from/cancellation policy/mobile app UX/customer service in Spanish/group size range); Israel-specific data (which platform has more Israel tours as of 2026: GYG stronger in city tours + adventures, Viator stronger in pilgrim/faith routes); verdictName + verdictQuery set; cross-links to key tour category guides; primary CTAs GYG Israel + Viator Israel (both affiliate); pairs with /es/best-tours-in-israel + /es/guided-vs-self-guided-israel (both confirmed existing)
- mitzpe-ramon-guide: "Mitzpe Ramón y el Cráter del Negev (Makhtesh Ramon): Guía de Viaje" — iconic Negev destination completing ES Negev cluster (best-hotels-negev + 3-days-in-negev both confirmed existing in ES); "Mitzpe Ramon Israel" / "Cráter Makhtesh Ramon" zero LATAM editorial competition (toursfestival.com has packages but no editorial guide); content: Makhtesh Ramon geology (erosion crater — NOT meteor/volcano = key honesty note "no es un cráter de impacto"); visitor center + viewpoint (sunrise/sunset); hiking Nahal Ardon / Wadi Ardon (strenuous, summer heat warning); Camel Riding Alpaca Farm (family); stargazing (IDA International Dark Sky Park); food (Una restaurant + street stalls in Mitzpe); base for Arava Valley; Beresheet luxury + Selina Ramon + Ramon Inn + Succah accommodation; pairs with /es/best-hotels-negev (confirmed existing); GYG Negev day tours + DiscoverCars CTAs
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed existing ES pages; no fabricated prices (₪/$ ranges + "verify at gate/booking platform"); Makhtesh Ramon = Erosionskrater NOT meteor/volcano (carry correct geology from EN exactly); Biblical Highway West Bank safety framing (standard honesty note + recommend guided tour); glamping pricing in ₪ ranges only; Golan Heights political context note where referenced; no fabricated tour ratings or review counts.

### Phase ES-25 (125 → 130/398) — SHIPPED iter908 d3df76f

Guides: `masada-dead-sea-day-trip.md`, `jerusalem-tours-compared.md`, `israel-national-parks-pass.md`, `galilee-vs-golan-weekend.md`, `haifa-neighborhoods-guide.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-07-31, iter908).
- masada-dead-sea-day-trip: amanecer vs. de día decision table; Camino de la Serpiente 45-60min; Ein Gedi oasis; flotación Mar Muerto; USD 89-120 group tours (teleférico NOT included in pase); Sound&Light Show event Mar–Oct; 3 CTAs GYG/Viator/Abraham
- jerusalem-tours-compared: 5-type comparison table; Old City 3-4h ~USD30-50; full day 7-8h ~USD60-95; Jerusalem+Belén ~USD80-110; Túneles Muro ~USD25-35; guía privado USD300+/día; verdictName/verdictQuery set; 3 CTAs GYG/Viator/Civitatis
- israel-national-parks-pass: 4 tiers Azul/Verde/Naranja/Matmon; Israel Pass & Ride (parks+Rav-Kav) at BGA T3 arrivals; exclusions table (teleférico/Ciudad de David/Bahá'í/Yad Vashem); prices hedged to parks.org.il verification
- galilee-vs-golan-weekend: 11-row comparison table; 4-night combined itinerary; 6 FAQs inc. Golan safety + wine; Golan political status factual/neutral; 2 CTAs DiscoverCars/Booking
- haifa-neighborhoods-guide: 6 barrios (Colonia Alemana/Wadi Nisnas/Hadar/Merkaz HaCarmel/Bat Galim/Puerto); Carmelit 6 stops ₪7/trip Sun-Thu 06-22/Fri~15/Shabbat nightfall-22; Bahá'í active-site framing (exterior/terrazas only, tour libre requires advance registration); Fiesta de las Fiestas (Hanukkah+Navidad+Eid Dec); 2 CTAs Booking/GYG
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix only for confirmed existing ES pages; no fabricated prices/ratings; Golan political note factual/neutral; Bahá'í active-site framing; Sound&Light Show 2026 event schema.

### Phase ES-24 (120 → 125/398) — DEFINED iter905

Target: iter906 BUILD (next BUILD iteration after ES-23 SHIPPED iter901).
Guides: `israel-eta-guide.md`, `how-to-hire-licensed-tour-guide-israel.md`, `israel-food-tours-cooking-classes.md`, `golan-heights-hiking-trails.md`, `israel-accessible-travel.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-07-31, iter905).
- israel-eta-guide: "Autorización Electrónica de Viaje (ETA-IL) para Israel 2026 – Guía Completa" — highest-priority ETA-IL guide for LATAM market; Argentina/Chile/Colombia/Mexico/Uruguay/Peru are all visa-exempt but ETA-IL required since Jan 2025; step-by-step: apply at piba.gov.il ≥72h before travel, ₪25 fee (~USD 7), 2-year validity, passport 6+ months validity required; warn explicitly about commercial scam portals (israeleta.info type) that charge inflated fees; LATAM travelers book through travel agencies — guide agencies to use official portal only; pairs with /es/visa-information (confirmed existing) + /es/border-crossings (confirmed existing); Skyscanner affiliate secondary CTA
- how-to-hire-licensed-tour-guide-israel: "Cómo Contratar un Guía Turístico Licenciado en Israel: Lo Que Debes Saber" — Israel Ministry of Tourism requires government licensing for guides at national heritage sites; Israel Tour Guide Association website; what licensing guarantees vs. unlicensed operators; questions to ask before booking; LATAM travelers typically book package tours — frame as "por qué vale la pena exigir guía licenciado aunque viajes con agencia"; cultural sensitivity advantage at contested holy sites; pairs with /es/best-tours-in-israel (confirm existing) + /es/guided-vs-self-guided-israel (confirm existing); GYG/Viator licensed guide tour CTAs
- israel-food-tours-cooking-classes: "Tours Gastronómicos y Clases de Cocina en Israel: Guía Completa" — Machane Yehuda market guided tour (Tali Friedman cooking demo option); Carmel Market cooking workshop (Orly Ziv: breakfast market tour → shop → cook 6 dishes); hummus-making workshop; challah-baking workshop (Shabbat context, experiential); Jaffa food walk (Arab hummus corridor, Persian Jewish pastries, Yemenite cuisine); LATAM food culture resonance (Israelí kosher/halal similarities with LATAM ingredients); pairs with /es/kosher-food-guide (confirm existing) + /es/galilee-food-guide (confirm existing); GYG/Viator food tour CTAs — no fabricated operator ratings or prices
- golan-heights-hiking-trails: "Senderos y Rutas de Senderismo en los Altos del Golán" — LATAM hiking culture (Chile/Argentina/Colombia outdoor travel market growing rapidly); Golan's basalt-plateau landscape is geologically unique; Banias waterfall trail (1.5h easy–moderate, family-friendly); Gamla Eagle Lookout (griffon vulture colony, Gamla's Jewish-Masada parallel); Nimrod Fortress circuit (Crusader-Mamluk, panoramic Galilee views, 1.5h moderate); Yehudiya pools (basalt pools swim, 4h strenuous, seasonal May–Oct); heat warning + sun protection essential; difficulty table + trail lengths; Golan political context note (factual/neutral — administrado por Israel desde 1967, reconocido por EE.UU. en 2019, disputado internacionalmente); pairs with /es/golan-heights-guide (confirm existing); GYG Golan hiking tour CTAs
- israel-accessible-travel: "Turismo Accesible en Israel: Guía para Viajeros con Discapacidad" — ATIJ (Accessible Tourism in Israel) registered operator network; Yad Sarah organization (free mobility equipment loans in 100+ locations — unique worldwide); Dead Sea accessibility (Ein Bokek resort promenade is paved + accessible, beach mats to water's edge, wheelchair-accessible hotel pools); Masada cable car (eliminates snake path for mobility-limited visitors); Tel Aviv accessibility (flat coastal terrain, bike-lane paths, accessible buses, beach wheelchairs at Gordon/Hilton beach); Jerusalem Old City challenges (cobblestones, stairs, narrow lanes — honest framing); Accessibility apps (Google Maps accessible routing works better in TLV than Jerusalem); pairs with /es/first-time-in-israel (confirmed existing); Booking.com accessible hotel search CTA
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix only for confirmed existing ES pages; no fabricated prices (₪/USD ranges only); Golan Heights political context note (factual/neutral); ETA-IL portal link must be official piba.gov.il — never scam lookalikes; no fabricated tour ratings or review counts.

### Phase DE-14 (147 → 152/398) — DEFINED iter905

Target: after DE-13 ships (DE-13 = eilat-vs-aqaba, galilee-wine-trail, haifa-food-guide, golan-heights-hiking-trails, hotels-near-ben-gurion-airport).
Guides: `galilee-vs-golan-weekend.md`, `glamping-israel.md`, `best-hotels-netanya.md`, `haifa-tours-compared.md`, `haifa-neighborhoods-guide.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-07-31, iter905).
- galilee-vs-golan-weekend: "Wochenende in Galiläa oder Golan: Welches Nordziel ist besser?" — DACH independent traveler planning 2-day northern Israel extension; comparison framework: Galilee = Sea of Galilee + Nazareth pilgrimage + Tiberias base + wine route; Golan = hiking + basalt landscape + wineries + Nimrod Fortress + Gamla eagles; decision matrix by traveler type (history/wine/hiking/religious/family); CRITICAL: `/de/galilee-travel-guide.md` does NOT exist — use EN fallback `/galilee-travel-guide` for galilee cross-link (or omit, prefering `/de/galilee-tours-compared` if that exists); `/de/golan-heights-guide.md` confirmed existing; Booking Tiberias + Rosh Pinna accommodation CTAs; GYG northern Israel tour CTAs
- glamping-israel: "Glamping in Israel: Besondere Unterkünfte in der Natur" — German glamping market is #2 in Europe (Glamping Hub data); DACH travelers increasingly seek nature/authenticity experiences; Beresheet Desert Lodge (Makhtesh Ramon crater rim — highest-end, Relais & Châteaux affiliate; pricing ₪ ranges only); Succah in the Desert (off-grid sukkot near Avdat — 4h from TLV; primitive, spiritual, fully off-grid); Yahel outpost Arava (south Negev desert eco-tent); Ein Gedi kibbutz glamping (Dead Sea nature reserve access); North Galilee moshav zimmer style; season guidance (avoid July–Aug Negev heat; spring/autumn ideal); pairs with /de/best-hotels-negev (confirmed existing); Booking.com eco-lodge + glamping property CTAs — prices as ₪ ranges only, never exact
- best-hotels-netanya: "Beste Hotels in Netanya: Übernachtungsführer für die Mittelmeerküste" — Netanya = Israel's 5th city (220k pop), 45 min from TLV by train, 60k+ French-speaking residents; DACH appeal: central coastal location for day trips north (Caesarea 20 min) and south (TLV 40 min); Cliff Hotel (sea-view promenade flagship); Grand Yam Hotel (beachfront); NH Hotel (business + families, Booking top-rated); budget options near train station; seasonal: high season July–Aug beach tourism vs. low season Dec–Feb cheap rates; pairs with /de/ben-gurion-airport-guide (confirm existing); Booking.com Netanya hotel comparison CTAs
- haifa-tours-compared: "Haifa-Touren im Vergleich: Welche Stadtführung lohnt sich wirklich?" — DACH independent travelers often unsure which Haifa tour products are worth paying for vs. self-exploring; official Bahá'í World Centre tours (free, registration required at bahai.org.il, upper terraces only on guided tour — can't self-access upper section); German Colony walking tour context (Deutsche Kolonie = 19th-century German Templar colony — profound DACH historical hook, unique emotional resonance for German/Swiss/Austrian visitors); GYG Haifa tours comparison; Carmelit funicular self-guided (6 stops, hop on/off); verdict table per traveler type (budget/spiritual/architecture/history); pairs with /de/haifa-travel-guide (confirmed existing); GYG/Viator Haifa tour affiliate CTAs
- haifa-neighborhoods-guide: "Haifa Stadtteile: Wo man am besten wohnt und was man erleben kann" — fifth locale to get this guide (TLV + Jerusalem + ES + FR already shipped/defined); German Colony section gets unique DACH treatment (Deutsche Kolonie = German Templar colony founded 1860s; 19th-century stone architecture; today the city's best restaurant strip); Carmelit funicular logistics + cable car to beaches; 5 neighborhoods: German Colony (UNESCO Bahá'í access, best dining), Merkaz HaCarmel (most hotels, panoramic views), Bat Galim (beachfront, cable car terminus), Hadar (local/budget, Madatech science museum), Downtown/Port (cruise access, Wadi Nisnas Arab market); season guidance; Shabbat bus advantage (Haifa = only Israeli city with Shabbat bus service); pairs with /de/haifa-travel-guide (confirmed existing); Booking.com per-neighborhood hotel CTAs
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages; no fabricated prices; Golan Heights political context note (factual/neutral — von Israel seit 1967 kontrolliert, von den USA 2019 anerkannt, international umstritten); glamping prices as ₪ ranges only; Deutsche Kolonie historical sensitivity (German Templar history involves both WWII deportation of residents by British mandate + Nazi sympathy — acknowledge history factually in 1–2 sentences without dwelling, per standard editorial practice); Beresheet pricing in ranges only.

### Phase FR-15 (152 → 157/398) — DEFINED iter905

Target: after FR-14 ships (FR-14 = haifa-food-guide, golan-heights-wineries, hotels-near-ben-gurion-airport, galilee-vs-golan-weekend, glamping-israel).
Guides: `israel-eta-guide.md`, `how-to-hire-licensed-tour-guide-israel.md`, `haifa-neighborhoods-guide.md`, `israel-accessible-travel.md`, `haifa-shore-excursions.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-07-31, iter905). All FR cross-link targets confirmed existing.
- israel-eta-guide: "Autorisation Électronique de Voyage (ETA-IL) pour Israël 2026 – Guide Complet" — French/Belgian/Swiss travelers are EU passport holders who became ETA-IL required since Jan 2025; apply at piba.gov.il ≥72h before travel, ₪25 fee (~€7), 2-year validity; warn about commercial scam sites that mimic official portal (particularly prevalent in French SEO results); Aliyah exception (Jewish immigrants applying for citizenship use Nefesh B'Nefesh, distinct process); dual-nationality considerations (Israeli + French — consult embassy); pairs with /fr/visa-information (confirmed existing) + /fr/border-crossings (confirmed existing); Skyscanner secondary affiliate CTA
- how-to-hire-licensed-tour-guide-israel: "Engager un Guide Touristique Agréé en Israël : Ce Qu'il Faut Savoir" — Israel Ministry of Tourism licensing requirement; ATGT (Association des Guides Touristiques d'Israël) context for French market; Civitatis (dominant FR/ES OTA) vs. direct booking; what licensing guarantees at major sites (Masada, Yad Vashem, Western Wall tunnels — where guides add regulatory/access value); French travelers often book through Club Med or organised tours — guide includes "que demander à votre agence"; pairs with /fr/best-tours-in-israel (confirmed existing); GYG/Viator licensed guide CTAs
- haifa-neighborhoods-guide: "Quartiers de Haïfa : Guide pour Choisir Où Séjourner" — French travelers to Haifa include Bahá'í pilgrims, cultural tourists, and cruise passengers; German Colony appeal for French audience = sophisticated dining (French café culture overlap, best restaurant strip outside TLV); Wadi Nisnas = Arab Christian neighbourhood, "Holiday of Holidays" festival in December (multicultural event unique in Israel — resonates with French secular-cosmopolitan values); Merkaz HaCarmel (most hotels, Bahá'í Gardens upper access base); Bat Galim (beachfront, cable car lower terminus, quieter); 5 neighborhoods with per-hotel Booking CTAs; Carmelit funicular logistics; pairs with /fr/haifa-travel-guide (confirmed existing); Booking.com per-neighborhood hotel CTAs
- israel-accessible-travel: "Tourisme Accessible en Israël : Guide pour les Voyageurs en Situation de Handicap" — French disability tourism framework (RQTH/PCH disability compensation context → many French travelers with disabilities receive travel subsidies and plan independent trips); ATIJ (Accessible Tourism in Israel) operator network; Yad Sarah free equipment loans (100+ locations — unique worldwide, resonates strongly with French social-rights culture); Dead Sea accessible resort strip (Ein Bokek paved promenade, beach mats, wheelchair-accessible hotel pools); Masada cable car (₪92 round trip, eliminates steep climb — practical for mobility-limited visitors); Tel Aviv accessibility (flat Mediterranean promenade, accessible public buses, beach wheelchairs at Gordon/Hilton beaches); Jerusalem Old City challenges (cobblestones, uneven paving, stairs — honest framing with workarounds: tourist train, accessible route via Jaffa Gate/Jewish Quarter side); pairs with /fr/first-time-in-israel (confirmed existing); Booking.com accessible hotel filter CTA
- haifa-shore-excursions: "Excursions de Croisière depuis Haïfa : Guide pour les Passagers en Escale" — Haifa is Israel's principal cruise port for northern Israel (MSC/Costa/Celestyal berths here routinely for French market); typical port window 7:00–17:00 (≈10h ashore); top 5 excursion options ranked by distance/time: (1) Haifa city self-tour (Bahá'í World Centre upper terraces free tour 9am, advance bahai.org.il registration required; German Colony lunch; Carmelit funicular); (2) Akko Crusader city (25 min by train — free WIFI on train + frequent service — UNESCO, Knights' Hall, Crusader tunnels, Arab market); (3) Caesarea Roman city (45 min south by organized tour — amphitheater, harbor, aqueduct beach); (4) Nazareth (40 min east — Basilica of the Annunciation, Arab market); (5) Sea of Galilee day tour (90 min each way, only viable for largest port windows); HONESTY: organized tours required for destinations >1h — independent transit does not leave enough buffer for a 10h port call; luggage storage at Haifa Port (verify current availability); pairs with /fr/haifa-travel-guide (confirmed existing); GYG/Viator Haifa shore excursion CTAs — no fabricated departure guarantees
Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages; no fabricated prices; ETA-IL portal link must be official piba.gov.il — never commercial intermediary sites; shore excursion times are approximate — always frame as "subject to vessel schedule and port authority clearance"; Bahá'í upper terrace tour requires advance registration (cannot walk in); Rosh Hanikra cable car confirmed restored 2026 (mention as optional add-on if port window ≥12h).

### Phase ES-27 (135 → 140/398) — DEFINED iter915

Target: iter916 BUILD (after P1 cruise-honesty-fix ships, or concurrently if separate branch feasible).
Guides: `haifa-tours-compared.md`, `haifa-shore-excursions.md`, `israel-adventure-sports.md`, `druze-villages-carmel.md`, `hayarkon-park-tel-aviv.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-01, iter915).

- haifa-tours-compared: "Comparativa de Tours en Haifa: Bahá'í, Akko y Rosh Hanikra" — completes ES Haifa tour-monetisation cluster (haifa-travel-guide + haifa-food-guide + day-trips-from-haifa all confirmed existing in ES); LATAM travelers in Haifa typically unsure which tour product is worth paying vs. self-exploring; content: Bahá'í World Centre official guided tour (free, advance bahai.org.il registration required — can't walk in upper section); German Colony walking tour; GYG/Viator Haifa product comparison table; Carmelit funicular self-guided (6 stops); verdict table by traveler type (budget/spiritual/architecture/history/cruise passenger); pairs with /es/haifa-travel-guide + /es/day-trips-from-haifa (both confirmed existing); GYG/Viator Haifa affiliate CTAs

- haifa-shore-excursions: "Excursiones de Crucero desde Haifa: Guía para Pasajeros en Escala" — LATAM cruise market (MSC/Costa Med cruises carry significant Argentine/Brazilian/Mexican passenger numbers); HONESTY REQUIRED: include prominent notice that Haifa/Ashdod cruise calls are currently suspended industry-wide since March 28, 2026 — frame as "when service resumes, the following options apply" so the guide remains valuable as an evergreen reference; typical port window 7:00–17:00 (~10h); top 5 excursion options (Haifa city + Bahá'í / Akko / Caesarea / Nazareth / Sea of Galilee); organized tours required for destinations >1h; luggage storage note; pairs with /es/haifa-travel-guide + /es/cruise-shore-excursions-israel (confirm existing); GYG/Viator shore excursion CTAs — HONESTY: no fabricated departure guarantees

- israel-adventure-sports: "Deportes de Aventura y Actividades al Aire Libre en Israel" — LATAM adventure market is large and growing (Chile/Argentina/Colombia outdoor travel segment; Brazil eco-tourism boom); zero LATAM Spanish editorial competition confirmed; content: paragliding (Caesarea/Megiddo Airfield ₪ ranges only); rappelling (Wadi Qelt/Makhtesh Ramon); mountain biking (Arava Valley/Yahel/cycling the Golan); ATV/quad Negev; jeep tours; rock climbing; sea kayaking Achziv/Rosh Hanikra; white-water rafting Hasbani River (seasonal, northern Israel, depends on snowmelt); Israeli adventure operators overview; safety tips (Sun protection / heat / UXO warning for Golan off-trail); seasonal guide; GYG/Viator adventure tour affiliate CTAs; pairs with /es/car-rental-israel + /es/is-israel-safe (both confirmed existing)

- druze-villages-carmel: "Aldeas Druzas del Monte Carmelo: Guía de Daliyat el-Carmel y Isfiya" — LATAM cultural tourism is a fast-growing segment (authentic local experience + food culture resonates strongly with LATAM traveler values); Druze hospitality + maqlouba/laffa/labneh tasting aligns with LATAM food-travel audiences; content: Daliyat el-Carmel as primary village (market, traditional crafts, Druze mystical religion overview — no-proselytising note); Isfiya (secondary village, easier access from Haifa); Druze hospitalit culture (sitting with families, eating home-made food, "mansaf"/maqlouba); textile crafts + embroidery; how to get there from Haifa (30 min by car, no direct train); restaurant picks; photography tips (ask before photographing); day-trip vs. overnight option; Golan Druze villages brief contrast (political status different — note factually); GYG food tour CTAs; Booking Haifa base hotel CTA; pairs with /es/haifa-travel-guide + /es/haifa-food-guide (both confirmed existing)

- hayarkon-park-tel-aviv: "Parque Hayarkon Tel Aviv: Guía Completa del Parque Urbano" — Tel Aviv's most visited park (3.3 million visitors/year); LATAM families and beach travelers in Tel Aviv will search for this; content: park overview (park zones: rowboat lake, sports fields, bird garden, Sportek complex); bike rental (Tel-O-Fun integration + dedicated Hayarkon cycling path); kayaking on the Yarkon River (₪ ranges); mini-golf + climbing wall (Sportek); events calendar (Tel Aviv Marathon start/finish; summer concerts); entry free (some paid activities); best times to visit (avoid Shabbat afternoon crowds); café/food kiosks; parking logistics; Shabbat note (park is open year-round but some food vendors close Friday afternoon); how to get there from city center (10–15 min by bike on marked path or short bus); pairs with /es/tel-aviv-beach-guide + /es/3-days-in-tel-aviv (confirm existing); GYG Tel Aviv activity affiliate CTAs

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed-existing ES pages; no fabricated prices (₪/$ ranges + "verify at gate/booking platform"); haifa-shore-excursions MUST include cruise suspension notice (honesty rule — services currently suspended March 2026); Bahá'í upper terrace tour requires advance registration (can't walk in); Druze photography etiquette (ask permission); UXO off-trail warning for Golan activities; no fabricated tour ratings or review counts; all ₪ as ranges only.

### Phase ES-28 (140 → 145/398) — SHIPPED iter921 6681a508

Target: iter921 BUILD (next BUILD iteration; ES has largest gap 258 missing guides).
Guides: `lgbtq-travel-israel.md`, `jerusalem-neighborhoods-guide.md`, `israel-by-month.md`, `jewish-heritage-israel.md`, `israel-travel-2026.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-01, iter920). All EN source guides exist and are current.

Research agent ranking (by ES search volume + editorial gap):
1. `israel-by-month.md` — highest-volume ES planning query
2. `israel-travel-2026.md` — time-sensitive; 2026 travel surge ongoing
3. `jewish-heritage-israel.md` — LATAM Jewish diaspora depth
4. `jerusalem-neighborhoods-guide.md` — high planning-stage intent
5. `lgbtq-travel-israel.md` — high-value segment, year-round evergreen

- lgbtq-travel-israel: "LGBTQ+ en Israel: Tel Aviv y Más Allá" — Tel Aviv globally ranked #1 LGBTQ+ destination; Tel Aviv Pride 2026 June 7–13 (parade June 12) confirmed; LATAM LGBTQ travelers (Argentina/Brazil/Chile/Mexico) are growing high-spending segment; MrBnB and TravelGay have city-level listings only — zero editorial depth guide in Spanish; content: Tel Aviv gay scene (gay beach Hilton stretch, Shiv'a Bar, Evita, Florentin vs TLV North club geography), Pride Month June, year-round vs seasonal framing, safety for same-sex couples (Israel broadly progressive; contested holy sites — dress codes apply); Tel Aviv → Jerusalem → Haifa gay-friendly hotel picks; legal context (same-sex relationships legal, marriage not registered domestically but recognised from abroad — honest framing); 3 CTAs GYG Tel Aviv Pride tour/Viator LGBTQ tour/Booking gay-friendly hotels; cross-links /es/tel-aviv-beach-guide (confirmed existing) + /es/tel-aviv-neighborhoods-guide (confirmed existing iter911)
- jerusalem-neighborhoods-guide: "Barrios de Jerusalén: Dónde Alojarse y Qué Explorar" — completes TLV+Jerusalem neighborhoods pair after ES-26 tel-aviv-neighborhoods-guide (iter911); "barrios de Jerusalén dónde alojarse" is high-intent planning query; only competitor is jerusalen.com (covers 4 historic quarters only, no modern neighborhoods, no hotel tiers); content: Old City quarters (Armenian/Christian/Jewish/Muslim) + adjacent neighborhoods (Muslim Quarter surrounds Western Wall plaza); Mamilla (luxury promenade, King David + Waldorf Astoria; InterContinental expected late 2026); German Colony (quiet upscale, boutique hotels, YMCA landmark); Mahane Yehuda (market neighbourhood, hipster restaurants, nightlife); City Center (Ben Yehuda St., transit hub, budget-mid range); per-neighborhood hotel tiers with Booking CTAs; 7 FAQs including "is the Old City safe to stay in" + Shabbat logistics; 3 CTAs Booking Jerusalem areas/GYG Old City walking tour/Viator private Jerusalem tour. CRITICAL: `/es/jerusalem-travel-guide` does NOT exist — use EN fallback `/jerusalem-travel-guide` in cross-links (confirmed missing from src/content/guides/es/); pairs with /es/best-hotels-jerusalem (confirmed existing)
- israel-by-month: "Israel Mes a Mes: Cuándo Visitar Israel y Qué Esperar" — highest-volume ES planning query; "mejor época para viajar a Israel" + "cuándo visitar Israel mes a mes" return only thin agency pages (exoticca.com, visitartierrasanta.com); zero dedicated editorial monthly guide in Spanish; content: 12-month table (crowd levels, average temps, Jewish holiday impact, best activities, price tier); January (rainy season; cheap; Tiberias thermal); February (almond blossom; Negev mild; shoulder); March (Purim; spring wildflowers; good hiking); April (Pesach crowds + prices spike; booking essential); May (shoulder; Mediterranean perfect); June (Tel Aviv Pride; heat starts; summer begins); July–August (high season; Eilat peak; Galilee evenings cool); September (Rosh Hashana/Yom Kippur; Dead Sea cooler); October (Sukkot; best overall month — warm + dry + less crowded); November (rainy starts; cheapest flights; Eilat good); December (Hanukkah; Nazareth Christmas lights; mixed weather); pairs with /es/best-time-to-visit-israel (confirmed existing); Jewish holiday awareness note: schedules shift each year — direct readers to hebcal.com for exact dates; 3 CTAs Booking flexible rates/Skyscanner fare calendar/GYG seasonal tours
- jewish-heritage-israel: "Herencia Judía en Israel: Guía Completa para el Viajero" — Argentina ~190K Jewish diaspora (7th largest globally); Brazil ~95K; Mexico ~40K; 2026 Milei state visit to Israel raised "Israel viaje Argentina" query profile significantly (Wikipedia confirms 2026 state visit); World Jewish Travel and Civitatis have tour listings but zero editorial depth guide in Spanish; content: Yad Vashem (UNESCO, advance tickets essential, 3–4h, photography protocol); Western Wall (gender sections, Shabbat crowds, morning vs evening); City of David excavations (guided only); Nachlaot (Old Jerusalem residential neighbourhood, Sephardic synagogues); Safed (4th holy city; Kabbalah study; art quarter); genealogy research (Central Archives for the History of the Jewish People at Hebrew University; Yad Vashem names database; AHEYM for Ashkenazi families); bar/bat mitzvah ceremonies at the Wall (advance planning with Western Wall Heritage Foundation); key Sephardic vs Ashkenazi heritage sites; Israel Museum Jerusalem (Dead Sea Scrolls, Shrine of the Book); 3 CTAs GYG Jewish heritage tour/Viator ancestry tour/Booking Jerusalem hotel; cross-links /es/yad-vashem-visitor-guide (confirmed existing) + /es/western-wall-guide (confirmed existing)
- israel-travel-2026: "Guía Completa de Israel 2026: Todo lo Nuevo para Planificar tu Viaje" — flagship 2026 update; tourism +73% YoY (US/Canada June 2026); Israel reclassified as safe for travel June 25, 2026; BUT: summer 2026 recovery is UNEVEN — honest framing required ("trajectory improving but not yet at pre-war levels; consult travel.state.gov/gov.uk/travel before booking"); content: new in 2026 (ETA-IL mandatory since Jan 1; Ben Gurion Terminal 1 domestic flights reopened; Biblical Highway Route 60 branded June 18; new luxury hotels — Gordonia Zichron Yaakov Feb 2026 opened ✓; InterContinental Jerusalem expected late 2026); what changed in airlines (El Al EZE Buenos Aires Nov 2026; easyJet resuming Oct 2026; LATAM routing via hub options); cruise ports update (Haifa/Ashdod suspended March 2026; gradual return ongoing — check status before booking cruise); safety situation (June 25 reclassification; avoid Lebanon border 5km zone; Golan visited normally; check travel.state.gov); ETA-IL step-by-step; pairs with /es/first-time-in-israel (confirmed existing) + /es/visa-information (confirmed existing) + /es/airlines-flying-israel-2026 (confirmed existing); 3 CTAs Booking/Skyscanner/GYG 2026 tours. HONESTY: do NOT claim full recovery; JPost summer 2026 "tourism struggles" headline exists — acknowledge uneven pace; Milei 2026 state visit confirms Argentina–Israel relationship positive.

Cross-link verification (all conducted 2026-08-01, iter920):
- /es/tel-aviv-beach-guide: ✓ confirmed
- /es/tel-aviv-neighborhoods-guide: ✓ confirmed (iter911)
- /es/best-hotels-jerusalem: ✓ confirmed
- /es/best-time-to-visit-israel: ✓ confirmed
- /es/yad-vashem-visitor-guide: ✓ confirmed
- /es/western-wall-guide: ✓ confirmed
- /es/first-time-in-israel: ✓ confirmed
- /es/visa-information: ✓ confirmed
- /es/airlines-flying-israel-2026: ✓ confirmed
- /es/is-israel-safe: ✓ confirmed
- /es/jerusalem-travel-guide: ✗ MISSING — use EN fallback /jerusalem-travel-guide

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix only for confirmed-existing ES pages; no fabricated prices/ratings/review counts; honest 2026 recovery framing (improving but uneven — not "full recovery"); Jewish holiday schedules via hebcal.com (not hardcoded — shift annually); cruise suspension notice for any cruise references; Golan Heights political context note (factual/neutral); Milei 2026 state visit mention as background context only (not a political endorsement); Bahá'í active-site framing if referenced; all ₪ as ranges only.

---

## Updated status snapshot (iter925 RESEARCH 2026-08-01T18:00Z)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 398    | stable |
| fr     | 172    | 226 missing — Phase FR-17 SHIPPED iter932 89b5dbb6; **Phase FR-18 TBD** |
| de     | 167    | 231 missing — Phase DE-16 SHIPPED iter933 97be29ff; Phase DE-17 TBD |
| es     | 155    | 243 missing — Phase ES-30 SHIPPED iter931 e3f0ecf4; **Phase ES-31 TBD** |

**All three next phases defined iter925 (185th research pass):**
- Phase ES-29: jerusalem-food-guide, tel-aviv-food-guide, rosh-hanikra-guide, mount-of-olives-guide, safed-tzfat-guide (all confirmed MISSING from ES via comm -23 2026-08-01)
- Phase FR-16: golan-heights-guide, golan-heights-hiking-trails, druze-villages-carmel, rosh-hanikra-guide, mount-of-olives-guide (all confirmed MISSING from FR via comm -23 2026-08-01)
- Phase DE-15: guided-vs-self-guided-israel, golan-heights-wineries, druze-villages-carmel, rosh-hanikra-guide, haifa-cruise-terminal-guide (all confirmed MISSING from DE via comm -23 2026-08-01)

Key cross-link verifications (2026-08-01, iter925):
- /es/church-holy-sepulchre-guide: ✓ confirmed
- /es/western-wall-guide: ✓ confirmed
- /es/jaffa-travel-guide: ✓ confirmed
- /es/tel-aviv-beach-guide: ✓ confirmed
- /es/haifa-travel-guide: ✓ confirmed
- /es/golan-heights-guide: ✓ confirmed
- /es/jerusalem-travel-guide: ✗ MISSING — use EN fallback /jerusalem-travel-guide
- /fr/golan-heights-tours-compared: ✓ confirmed
- /fr/sea-of-galilee-guide: ✓ confirmed
- /fr/haifa-travel-guide: ✓ confirmed
- /fr/church-holy-sepulchre-guide: ✓ confirmed
- /fr/easter-in-jerusalem: ✓ confirmed
- /fr/day-trips-from-haifa: ✓ confirmed
- /de/golan-heights-guide: ✓ confirmed
- /de/sea-of-galilee-guide: ✓ confirmed
- /de/haifa-travel-guide: ✓ confirmed
- /de/car-rental-israel: ✓ confirmed
- /de/day-trips-from-haifa: ✓ confirmed

### Phase ES-29 (145 → 150/398) — DEFINED iter925

Guides: `jerusalem-food-guide.md`, `tel-aviv-food-guide.md`, `rosh-hanikra-guide.md`, `mount-of-olives-guide.md`, `safed-tzfat-guide.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-01).

Research agent ranking (by ES search volume + affiliate value + editorial gap):
1. `tel-aviv-food-guide.md` — highest LATAM food-tourism intent ("restaurantes Tel Aviv")
2. `jerusalem-food-guide.md` — high pilgrim + general tourist intent ("comida Jerusalén")
3. `mount-of-olives-guide.md` — very high LATAM Catholic/Christian pilgrimage demand
4. `rosh-hanikra-guide.md` — popular scenic site recently reopened; pairs existing haifa content
5. `safed-tzfat-guide.md` — LATAM Jewish spiritual tourism niche; completes northern Israel cluster

- jerusalem-food-guide: "Guía Gastronómica de Jerusalén: Restaurantes, Mercados y Experiencias" — zero dedicated LATAM ES editorial; GYG Jerusalem food tour affiliate; content: Mahane Yehuda Market (chef restaurants; hummus landmarks; kanafeh); Old City quarters food (Arab hummus; Armenian food; Jewish Quarter pastries); German Colony cafés; Emek Refaim dining; kosher certification tiers (mehadrin vs. regular kosher); halal options (Muslim Quarter restaurants); price ranges all in ₪/$ as ranges only; 3 CTAs GYG food tours/Viator tasting/Booking Jerusalem hotel; cross-links /es/western-wall-guide ✓ + /es/church-holy-sepulchre-guide ✓; EN fallback /jerusalem-travel-guide (no ES version exists)
- tel-aviv-food-guide: "Guía Gastronómica de Tel Aviv: Restaurantes, Mercados y Gastronomía Israelí" — very high LATAM food-tourism intent; GYG Tel Aviv food tour affiliate; content: Carmel Market (fresh produce, sabich, shakshuka stalls); Levinsky Market spice bazaar; Florentin (hipster restaurants, vegan scene); Jaffa restaurants (Arab-Jewish fusion, Abu Hassan hummus); north Tel Aviv fine dining; Israeli breakfast culture (shakshuka, labaneh, tahini); vegan/vegetarian density (world's highest per capita); 3 CTAs GYG Carmel Market tour/Viator food walk/Booking TLV hotel; cross-links /es/tel-aviv-beach-guide ✓ + /es/jaffa-travel-guide ✓
- rosh-hanikra-guide: "Rosh Hanikra: Grutas y Acantilados en la Frontera con el Líbano" — popular scenic site; reopened 2026 per iter890+iter921 notes; zero dedicated LATAM ES editorial; content: cable car (shortest/steepest commercial cable car in Israel; ₪ ranges); sea grottos walkways; border crossing history (historic Ottoman railway tunnel + demolished bridge); Crusader-period foundations; wildlife (cormorants, Mediterranean flora); visiting practicalities (advance booking recommended; moderate crowds; INPA national park pass NOT valid for cable car); seasonal note (grottos best in calm seas — winter can close); 3 CTAs GYG northern Israel day tour/Viator cable car combo/Booking Haifa hotel; cross-links /es/haifa-travel-guide ✓ + /es/akko-acre-guide ✓
- mount-of-olives-guide: "Monte de los Olivos: Guía para Visitantes y Peregrinos" — very HIGH LATAM Catholic/Christian pilgrimage intent; most-searched Jerusalem pilgrimage site after Church of Holy Sepulchre; zero dedicated LATAM ES editorial; content: Church of All Nations (Basilica of the Agony; afternoon light window honesty — avoid midday glare on goldleaf dome); Garden of Gethsemane (Franciscan care; old olive trees — note: DNA testing uncertainty on exact age, present them as ancient/significant rather than precisely 2,000 years old); Dominus Flevit (Tear-drop chapel; panoramic Jerusalem view); Mary's Tomb (Armenian/Greek Orthodox underground chapel; free entry; dress code); Ascension Church (active Franciscan chapel + Tower of the Ascension/Muslim mosque in same compound — honest dual-use framing); access (Arab bus line 275 from Damascus Gate or shared sherut from Old City; avoid walking up the steep eastern path in summer midday heat); Shabbat access via walking (no buses Fri evening to Sat night); 3 CTAs GYG walking tour/Viator pilgrimage tour/Booking Jerusalem hotel; cross-links /es/church-holy-sepulchre-guide ✓ + /es/western-wall-guide ✓; EN fallback /jerusalem-travel-guide (no ES version)
- safed-tzfat-guide: "Safed (Tzfat): Ciudad Mística y Centro Mundial de la Kabbalá" — LATAM Jewish spiritual tourism; Argentina/Brazil/Mexico diaspora; Israel's 4th holy city; zero dedicated LATAM editorial; content: Artists' Quarter (60+ galleries; authentic 15th-c. Sephardic synagogues: Abuhav Synagogue + Caro Synagogue); Joseph Karo connection (Shulchan Aruch codified in Safed); Kabbalah background (honest: contemporary "Kabbalah Center" is a modern movement distinct from traditional Safed Kabbalah tradition — note difference without disparaging); Beit Hameiri Museum (Ottoman-era building; Safed print heritage + printing first Hebrew books in Israel here 1577); Ascent Institute for Jewish Studies; practical notes (city center car-free zone; steep lanes; best in morning before tour groups); seasonal: Klezmer Festival August (exact dates vary — check safed.co.il); accommodation: boutique B&Bs in Old City; nearby Rosh Pina (wine country base); 3 CTAs GYG northern Israel/Viator Safed day tour/Booking Rosh Pina hotel; cross-links /es/golan-heights-guide ✓ + /es/galilee-wine-trail ✓

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix only for confirmed-existing ES pages; no fabricated prices (all ₪/$ ranges only); no fabricated ratings or review counts; paired-naming on contested sites; Bahá'í active-site framing if referenced; UXO off-trail warning if Golan referenced; olive tree age honesty (Gethsemane trees: significant not precisely 2000yo); Dominus Flevit dome honesty (afternoon light for photography); Kabbalah Center vs. traditional Safed Kabbalah distinction.

### Phase FR-16 (162 → 167/398) — SHIPPED iter927 e6d059c1

Guides: `golan-heights-guide.md`, `golan-heights-hiking-trails.md`, `druze-villages-carmel.md`, `rosh-hanikra-guide.md`, `mount-of-olives-guide.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-01).
Note: golan-heights-guide.md exists in ES+DE but is missing from FR — a significant gap for a major region.

Research agent ranking (by FR SEO value + editorial gap):
1. `golan-heights-guide.md` — largest single FR gap; Golan is visited by thousands of French tourists annually
2. `mount-of-olives-guide.md` — very high French Catholic pilgrimage demand (France = 3rd largest Israel tourism source)
3. `golan-heights-hiking-trails.md` — completes Golan cluster; pairs with new FR golan-heights-guide
4. `rosh-hanikra-guide.md` — popular site; zero FR editorial; pairs /fr/haifa-travel-guide ✓
5. `druze-villages-carmel.md` — French cultural tourism; pairs /fr/haifa-travel-guide ✓ + /fr/day-trips-from-haifa ✓

- golan-heights-guide: "Guide du Plateau du Golan : Nature, Randonnées et Vins en Israël" — major FR editorial gap; Golan is a top FR-visitor northern Israel destination; zero dedicated FR guide despite existing in ES+DE; content: Golan geography overview; highlights (Nimrod Fortress Ayyubid 1229, Banias waterfall + spring, Gamla archaeological site + nature reserve, Quneitra UN viewpoint); winery circuit overview (Yarden/Golan Heights Winery/Pelter/Chateau Golan — details covered in /fr/golan-heights-wineries which exists); CRITICAL political status note: "Le plateau du Golan est administré par Israël depuis 1967 ; la reconnaissance américaine de 2019 n'est pas reconnue par les Nations Unies ni par la plupart des États" — factual, neutral, cite Israeli administration as fact not contested territory stance; UXO warning off-trail (zones balisées uniquement); Banias/Nimrod/Gamla logistics table; 3 CTAs GYG Golan day tour/DiscoverCars/Booking Katzrin or Rosh Pina; cross-links /fr/golan-heights-tours-compared ✓ + /fr/sea-of-galilee-guide ✓; when hiking trails created, can reference /fr/golan-heights-hiking-trails (same batch)
- golan-heights-hiking-trails: "Randonnées dans le Golan : Yehudiya, Zavitan, Gamla et Nahal Meshushim" — pairs with new FR golan-heights-guide; content mirrors DE + ES versions: Yehudiya Loop 14km difficile 5-7h; Canyon Zavitan 5km modéré 2-3h; Nahal Meshushim/Piscine Hexagonale 7km AR; circuit Gamla 5km + vautours fauves; sections du Sentier du Golan (INT); UXO off-trail warning ("Rester strictement sur les sentiers balisés — risque de munitions non explosées"); seasonal table (été Golan supportable vs Néguev; éviter les orages de janvier-février dans les wadis); Golan political status note (same as above, factual/neutral); 3 CTAs GYG Golan randonnée/DiscoverCars/GYG multi-day; cross-links /fr/golan-heights-guide (same batch) + /fr/car-rental-israel ✓
- druze-villages-carmel: "Villages Druzes du Carmel : Daliyat el-Carmel et Isfiya" — French cultural tourism; content mirrors ES + DE versions: Daliyat el-Carmel (15min drive from Haifa; pita drusa fraîche faite à la saj — voir les femmes préparer, goûter); marché artisanal souvenir (négociation possible); El-Muhraka monastery (Carmelite; panorama Carmel — check hours before visiting); Isfiya alternative (less touristy; same heritage); photography etiquette (khalwa = Druze religious space — ask permission before photographing Druze men in robes; no restrictions on market photos); Carmelo hiking trails (Carmel National Park entrance nearby); recommended combination: Daliyat el-Carmel + Isfiya half-day from Haifa; 3 CTAs GYG Druze village tour/Viator Haifa day/Booking Haifa hotel; cross-links /fr/haifa-travel-guide ✓ + /fr/day-trips-from-haifa ✓
- rosh-hanikra-guide: "Rosh Hanikra : Grottes et Falaises Blanches à la Frontière du Liban" — popular site; recently reopened 2026; zero FR editorial; content mirrors ES version + adds Franco angle: Rosh Hanikra cable car (French tourists vs Israeli speed hike comparison — cable car recommended given steep drop); sea grottos (fluo blue bioluminescence in calm evenings; winter sea state can close grottos — check before booking); historic Ottoman railway tunnel + destroyed Haganah bridge (1948 context, factual); wildlife (cormorants nesting spring; Aleppo pine Carmel landscape); INPA pass does NOT cover cable car (honesty); seasonal: spring for bird life; winter grottos variable; advance cable car ticket recommended in summer; northern Israel day-trip pairing (Akko 45min + Rosh Hanikra = classic combination); 3 CTAs GYG northern Israel tour/Viator combo/Booking Haifa hotel; cross-links /fr/haifa-travel-guide ✓ + /fr/day-trips-from-haifa ✓
- mount-of-olives-guide: "Le Mont des Oliviers : Guide de Pèlerinage à Jérusalem" — very HIGH French Catholic pilgrimage demand; France is 3rd-largest Israel tourism source; content mirrors ES version in French register: Basilique de l'Agonie (Chiesa di Tutti le Nazioni; mosaïque frontale or visible au soleil; après-midi préférable pour photos); Jardin de Gethsémani (oliviers millénaires — présentation honnête : significatifs mais âge exact incertain); Dominus Flevit (chapelle en forme de larme; panorama sur Jérusalem); Tombeau de la Vierge (chapelle souterraine arménienne/orthodoxe grecque; entrée libre; dresscode obligatoire); Chapelle de l'Ascension (composé chrétien-musulman — honnêteté : la tour est une mosquée active, la chapelle franciscaine est distincte); Chemin de descente vers Cédron; accès (bus arabe ligne 275 depuis porte de Damas; taxis); piège Shabbat (pas de bus vendredi soir-samedi soir); 3 CTAs GYG pèlerinage/Viator Mont des Oliviers/Booking Jérusalem hotel; cross-links /fr/church-holy-sepulchre-guide ✓ + /fr/easter-in-jerusalem ✓

Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed-existing FR pages; no fabricated prices (all ₪/$ ranges only); Golan Heights political status note factual/neutral (UN non-recognition stated clearly); UXO off-trail warning (Golan); Bahá'í active-site framing if referenced; olive tree age honesty (Gethsémani); Druze photography etiquette; Rosh Hanikra winter sea-state caveat; cable car not covered by INPA pass.

### Phase DE-15 (157 → 162/398) — SHIPPED iter928 75504d53

Guides: `guided-vs-self-guided-israel.md`, `golan-heights-wineries.md`, `druze-villages-carmel.md`, `rosh-hanikra-guide.md`, `haifa-cruise-terminal-guide.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-08-01).

Research agent ranking (by DACH SEO value + affiliate conversion + editorial gap):
1. `guided-vs-self-guided-israel.md` — highest-conversion DACH planning guide; MOT license rules + cost table
2. `golan-heights-wineries.md` — German wine tourism (Germany = world's 3rd largest wine market); Golan wine circuit
3. `haifa-cruise-terminal-guide.md` — AIDA/TUI Cruises DACH market; NIS 16M 2026 terminal is new
4. `rosh-hanikra-guide.md` — popular northern site, recently reopened; pairs /de/haifa-travel-guide ✓
5. `druze-villages-carmel.md` — cultural tourism; DACH travelers interested in minority communities

- guided-vs-self-guided-israel: "Reiseführer oder Selbstgeführte Reise durch Israel: Ratgeber für DACH-Reisende" — highest-conversion DACH planning guide; MOT licensing content (only licensed guides allowed at Westliche Mauer Tunnels, Masada, Beit Guvrin, Old City); cost table (Privatführer ₪600-900 guide-only / ₪1,200-1,800 Fahrer+Führer / ₪1,600-2,400 Fahrer+Führer+Minibus) — all as Richtwertspannen; 7-category traveler-type matrix (Erstbesucher/Pilger/Familien/Rentner/Individualist/Abenteurer/Gruppe); hybrid model (1 Tag Jerusalem mit lizenziertem Führer + Mietwagen Rest); IATOA verification: guides-israel.co.il + tourism.gov.il; 3 CTAs GYG private DACH guide/Viator group tour/DiscoverCars self-drive; cross-links /de/golan-heights-guide ✓ + /de/car-rental-israel ✓ + /de/best-tours-in-israel ✓
- golan-heights-wineries: "Weinstraße Golanhöhen: Weingüter Golan und Galiläa entdecken" — DACH wine tourism hook (Germany = world's 3rd largest wine market; German wine tourists seek structured circuit guides); content: 2-day Weinstraße Golan: Tag 1 Golan Heights Winery Katzrin (Yarden Blanc de Blancs; Gamla Rotwein; Besucher-Weinprobe), Chateau Golan Eliad (Boutique; Reservierung empfohlen), Pelter Winery (Terrasse; Golan-Aussicht); Tag 2 Galil Mountain (Elrom; Kooperation Kibbutz Yiron), Dalton (Avivim; größter zertifizierter Bio-Weingut nördlich Beer Sheva); 0,05% BAK-Grenze Fahrhinweis (Deutschland-konform); Rosh Pinna Basis (kombination mit Safed empfohlen); Golan political status note (same as DE standard: faktisch unter israelischer Verwaltung seit 1967; US-Anerkennung 2019 international umstritten); HONESTY: Siedlungsweingüter-Kontext für DACH-Leser (Brief context: Weingüter befinden sich in den Golanhöhen, die Israel seit 1967 verwaltet; für einige DACH-Konsumenten kann das ein Faktor sein — wir beschreiben, Leser entscheiden); 3 CTAs DiscoverCars/Booking Rosh Pinna oder Katzrin/GYG Weinprobe-Tour; cross-links /de/golan-heights-guide ✓ + /de/car-rental-israel ✓ + /de/sea-of-galilee-guide ✓
- druze-villages-carmel: "Drusen-Dörfer am Karmel: Daliyat el-Carmel und Isfija" — DACH cultural tourism; Druze community historically known to DACH travelers from Lebanon/Israel context; content mirrors FR + ES versions in Standard Hochdeutsch: Daliyat el-Carmel (15min von Haifa; frische Drusen-Pita auf dem Saj-Grill — selbst zusehen, verkosten); Kunsthandwerksmarkt (Verhandeln üblich); El-Muhraka Kloster (Karmeliter; Karmelpanorama — Öffnungszeiten vorab prüfen); Isfija Alternative (ruhiger; Stammeskultur authentischer); Fotografie-Etikette (Khalwa = sakraler Drusen-Versammlungsraum — vor dem Fotografieren fragen; Marktfotos unproblematisch); Wanderwege Karmel-Nationalpark; Tagesausflugs-Empfehlung: Daliyat el-Carmel + Isfija Halbtagestour von Haifa; 3 CTAs GYG Drusen-Tour/Viator Haifa/Booking Haifa Hotel; cross-links /de/haifa-travel-guide ✓ + /de/day-trips-from-haifa ✓
- rosh-hanikra-guide: "Rosh Hanikra: Grotten und Kreidefelsen an der Libanongrenze" — popular northern Israel attraction; recently reopened 2026; zero DE editorial; content mirrors FR + ES versions: Kabinenbahn (kürzeste/steilste kommerzielle Seilbahn Israels; ₪ Preisspannen; Reservierung im Sommer empfohlen); Meeresgrotten (fluoreszierendes Blau; Winterschließung bei rauer See — vorher prüfen); Osmanischer Eisenbahntunnel + zerstörte Brücke (1948-Kontext, sachlich); Fauna (Kormorane Frühjahr; Aleppo-Kiefern Karmel-Küste); INPA-Pass gilt NICHT für Kabinenbahn (Ehrlichkeitshinweis); Kombi-Empfehlung: Akko (45 Min.) + Rosh Hanikra = Klassiker Nordisrael; 3 CTAs GYG Nordisrael-Tagestour/Viator Kombination/Booking Haifa Hotel; cross-links /de/haifa-travel-guide ✓ + /de/day-trips-from-haifa ✓
- haifa-cruise-terminal-guide: "Kreuzfahrtterminal Haifa: Landausflüge und Tipps für DACH-Kreuzfahrtgäste" — AIDA Cruises + TUI Cruises DACH market; May 2026 NIS 16M terminal upgrade (5,500m²; 28 Grenzschutz-Schalter); HONESTY: cruise suspension notice (March 2026 major cruise lines suspended Haifa/Ashdod calls; gradual return ongoing summer 2026 — check status before booking cruise including this one); Bahá'í Terrassenanlagen (advance registration required; active religious site — exterior/terraces only for non-Bahá'ís); verdictName/verdictQuery set; 4 Ausflug-Circuits: Bahá'í+Akko 6h / Caesarea+Atlit 5h / Nazareth+Galiläa 8h / Rosh Hanikra 7h; Port-Übersicht (Shuttles; ETA-IL Pflicht vor Einschiffung; Shabbat logistics); 3 CTAs GYG Haifa Ausflug/Viator Nordisrael-Kombi/Booking Haifa Hotel; cross-links /de/haifa-travel-guide ✓ + /de/day-trips-from-haifa ✓

Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed-existing DE pages; no fabricated prices (all as Richtwertspannen); Golan Heights political status note factual/neutral (same wording as DE standard "von Israel seit 1967 kontrolliert; US-Anerkennung 2019 international umstritten"); Siedlungsweingüter-Kontext brief and neutral; cruise suspension notice for haifa-cruise-terminal-guide; Bahá'í active-site framing (Außenbereiche/Terrassen only); INPA-Pass gilt NICHT für Kabinenbahn (honesty); Dolphin Reef encounters-not-guaranteed if referenced; all prices as Richtwertspannen.

### Phase ES-30 (150 → 155/398) — SHIPPED iter931 e3f0ecf4 2026-08-02

Guides: `israel-events-festivals.md`, `galilee-culinary-institute-gonen.md`, `herzliya-guide.md`, `israel-egypt-guide.md`, `israel-esim.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-01).

Research ranking (by LATAM ES search volume + editorial gap):
1. `israel-events-festivals.md` — LATAM travelers plan around festivals; zero ES editorial calendar guide
2. `galilee-culinary-institute-gonen.md` — culinary tourism trending LATAM; institute open Feb 2026
3. `herzliya-guide.md` — tech hub + coastal; LATAM tech travelers + marina/beach tourism
4. `israel-egypt-guide.md` — "Israel y Egipto" combo very popular LATAM; pairs israel-jordan-itinerary ES ✓
5. `israel-esim.md` — practical; "Israel eSIM turistas" high practical search volume; no ES competitor

- israel-events-festivals: "Festivales y Eventos en Israel 2026: Calendario Anual" — LATAM travelers plan trips around major events; Civitatis sells event-specific tours but zero ES editorial calendar guide; content: Purim (março), Pésaj/Passover crowd impact, Día de la Independencia Jerusalem (Yom HaAtzmaut parading), Shavuot, Sukkot market/concert surge, Hanukkah (Jerusalem Old City lights), Rosh Hashaná high season pricing, Cesárea Concerts (June–Aug), Metzitzim reggae, Tel Aviv Gay Pride (June), festivals by region (Galilee wine harvest Aug–Sep, Eilat Jazz Red Sea Dec); affiliate hook: hotels fill fast around Sukkot (Booking CTA); GYG/Viator event-specific tour CTAs; cross-links /es/christmas-in-israel ✓ /es/easter-in-jerusalem ✓ /es/passover-in-israel ✓ /es/israel-cost-budget ✓
- galilee-culinary-institute-gonen: "Instituto Culinario de Galilea en Kibbutz Gonen: Guía del Visitante" — JNF-USA culinary campus at Kibbutz Gonen; soft launch Feb 2026; academic year Oct 2026; farm-to-table restaurant + wine bar + microbrewery + cooking workshops; multicultural Jewish/Druze/Bedouin cuisine; Chef Lior Lev Sercarz (La Boîte NYC); 12-dunam working farm; NIS 100M; cross-links /es/galilee-food-guide ✓ /es/druze-villages-carmel ✓ /es/sea-of-galilee-guide ✓ /es/car-rental-israel ✓
- herzliya-guide: "Guía de Herzliya: Marina, Playas y Hub Tecnológico de Israel" — tech hub + coastal; Intel/Google/Apple HQ area; Herzliya Marina restaurant strip; Apollonia National Park (Crusader fortress sea views); Arena Mall; International Club beach; business travel + Israeli high-tech tourism appeal; CTAs Booking/GYG; cross-links /es/tel-aviv-neighborhoods-guide ✓ /es/car-rental-israel ✓ /es/ben-gurion-airport-guide ✓
- israel-egypt-guide: "Israel y Egipto: Itinerario Combinado 10–14 Días" — "Israel y Egipto combinado" = major LATAM search; Sinai peninsula (Dahab/Sharm) → Eilat border crossing → Jerusalem → Tel Aviv circuit; Taba border 24h except Yom Kippur/Eid; Jordan Pass + Egypt e-Visa; Petra extension option; airline hub TLV+CAI (El Al direct); honesty: Sharm safety per travel advisories (frame "check FCO/State Dept before booking"); CTAs GYG tour combo/Viator/Booking; cross-links /es/israel-jordan-itinerary ✓ /es/eilat-travel-guide ✓ /es/border-crossings ✓ /es/israel-travel-insurance ✓
- israel-esim: "eSIM Israel 2026: Cómo Conectarte sin Gastar de Más" — practical; "Israel eSIM turistas LATAM" = high practical search; content: eSIM-compatible phones check; Cellcom/Partner/Hot Mobile plans comparison table (7-day/30-day; data quotas; roaming); Airalo/Holafly international eSIM alternatives; physical SIM at BGA arrivals hall; Dual SIM setup for Latin American phones; CTAs DiscoverCars (offline navigation) + Booking; cross-links /es/ben-gurion-airport-guide ✓ /es/transportation ✓

Cross-links to verify before BUILD iteration:
- /es/christmas-in-israel ✓, /es/easter-in-jerusalem ✓, /es/passover-in-israel ✓: all confirmed SHIPPED
- /es/galilee-food-guide: needs verification before BUILD
- /es/druze-villages-carmel ✓: confirmed SHIPPED (ES-17)
- /es/sea-of-galilee-guide ✓, /es/car-rental-israel ✓, /es/ben-gurion-airport-guide ✓, /es/tel-aviv-neighborhoods-guide ✓, /es/israel-jordan-itinerary ✓, /es/eilat-travel-guide ✓, /es/border-crossings ✓: all confirmed SHIPPED
- /es/transportation ✓: confirmed SHIPPED (ES-0)
- /es/israel-travel-insurance ✓: confirmed SHIPPED (ES-2)

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* cross-links only for confirmed-existing pages; no fabricated prices; Sharm safety framing = advisory reference not a recommendation; culinary institute academic/tourist programs distinction clear; eSIM price comparison in USD ranges only (current plans vary frequently).

### Phase FR-17 (167 → 172/398) — SHIPPED iter932 89b5dbb6 2026-08-02

Guides: `haifa-tours-compared.md`, `galilee-culinary-institute-gonen.md`, `israel-by-month.md`, `israel-egypt-guide.md`, `herzliya-guide.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-01).

Research ranking (by FR search volume + editorial gap):
1. `haifa-tours-compared.md` — Haifa cluster completion; French love Bahá'í Gardens; zero FR tour comparison
2. `galilee-culinary-institute-gonen.md` — French culinary tourists; JNF-France connections; farm-to-table resonates
3. `israel-by-month.md` — French travelers meticulous planners; "meilleure période Israël" = high FR search
4. `israel-egypt-guide.md` — "Israël et Égypte" combo popular for FR market (Air France CDG-CAI)
5. `herzliya-guide.md` — large francophone expat community; Intel/Google Israel; marina + beach

- haifa-tours-compared: "Tours à Haïfa : Guide Comparatif des Meilleures Excursions" — Haifa cluster completion (haifa-travel-guide + haifa-neighborhoods-guide + haifa-shore-excursions + best-hotels-haifa all in FR); verdictName/verdictQuery set; 5-format comparison table: Tour Jardins Bahá'ís guidé 40–80 USD / Haïfa + Akko demi-journée / Haïfa + Akko + Rosh Hanikra journée complète / Circuit druze Karmel / Visite auto-guidée Karmelit; Bahá'í Terrasses Supérieures = guided obligatoire + advance registration bahai.org.il; Deutsche Kolonie hook (Templer allemands 1868; colonie historique DACH); CTAs GYG/Viator; cross-links /fr/haifa-travel-guide ✓ /fr/bahai-world-center-guide ✓ /fr/day-trips-from-haifa ✓ /fr/haifa-neighborhoods-guide ✓
- galilee-culinary-institute-gonen: "Institut Culinaire de Galilée à Kibbutz Gonen : Guide Visiteur" — French culinary tourist hook; JNF-France connections; Chef Lior Lev Sercarz (formé en France; fondateur La Boîte NYC); ouverture lancement doux fév. 2026; an académique oct. 2026; cuisine multiculturelle juive/druze/bédouine; ferme 12 dunams; bar à vins + brasserie artisanale; cross-links /fr/galilee-food-guide (verify) /fr/druze-villages-carmel ✓ /fr/sea-of-galilee-guide ✓ /fr/car-rental-israel ✓
- israel-by-month: "Israël Mois par Mois : Meilleure Période pour Visiter" — metropolitan French; meticulous planners; content mirrors EN guide in French; month-by-month table: Jan–Feb (hivers doux; Dead Sea low season; sites sans foules); Mar–Apr (Pessah + Easter = foules + prix élevés; fleurs sauvages); May–Jun (idéal; Shavouot); Jul–Aug (chaleur extrême Eilat; côte méditerranéenne parfaite; haute saison); Sep–Oct (Rosh Hashaná + Souccot = impact tarifs); Nov–Dec (Hanoukka; pluies Galilée; parfait Dead Sea); regional climate differences (Eilat vs. côte vs. Galilée vs. Désert Néguev); cross-links /fr/is-israel-safe ✓ /fr/israel-cost-budget ✓ /fr/israel-travel-tips ✓ /fr/best-time-to-visit-israel ✓
- israel-egypt-guide: "Israël et Égypte : Itinéraire Combiné 10–14 Jours" — "Israël Égypte" combo growing with FR market; Air France CDG-CAI; Sinai (Dahab/Sharm)/Eilat/Taba crossing/Jerusalem/Tel Aviv circuit; Jordan Pass + Egypt e-Visa; Petra extension; Sharm safety = reference aux conseils officiels (MEAE.fr) not recommendation; cross-links /fr/israel-jordan-itinerary ✓ /fr/eilat-travel-guide ✓ /fr/border-crossings ✓ /fr/israel-travel-insurance ✓
- herzliya-guide: "Guide de Herzliya : Marina, Plages et Hub Technologique d'Israël" — large francophone expat community (Intel/Google/Microsoft Israel offices); Herzliya marina restaurants; Apollonia Crusader ruins; International Club beach; ENSIT French-Israeli high school angle; business travel + beach tourism; CTAs Booking/GYG; cross-links /fr/tel-aviv-neighborhoods-guide ✓ /fr/car-rental-israel ✓ /fr/ben-gurion-airport-guide ✓

Cross-links to verify before BUILD:
- /fr/haifa-travel-guide ✓, /fr/bahai-world-center-guide ✓, /fr/day-trips-from-haifa ✓, /fr/haifa-neighborhoods-guide ✓: all confirmed SHIPPED
- /fr/galilee-food-guide: needs verification
- /fr/druze-villages-carmel ✓: confirmed SHIPPED (FR-16)
- /fr/sea-of-galilee-guide ✓, /fr/car-rental-israel ✓, /fr/is-israel-safe ✓, /fr/israel-cost-budget ✓, /fr/israel-travel-tips ✓, /fr/best-time-to-visit-israel ✓: all confirmed SHIPPED
- /fr/israel-jordan-itinerary ✓, /fr/eilat-travel-guide ✓, /fr/border-crossings ✓, /fr/israel-travel-insurance ✓: all confirmed SHIPPED
- /fr/tel-aviv-neighborhoods-guide ✓, /fr/ben-gurion-airport-guide ✓: confirm before BUILD

Quality: metropolitan French; YAML double-quotes; /fr/* cross-links only confirmed-existing; no fabricated prices; Sharm safety = reference officielle seulement; culinary institute academic vs. visitor programs distinction; paired-naming on contested sites.

### Phase DE-16 (162 → 167/398) — SHIPPED iter933 BUILD 2026-08-02 97be29ff

Guides: `eilat-nightlife.md`, `haifa-shore-excursions.md`, `how-to-hire-licensed-tour-guide-israel.md`, `israel-accessible-travel.md`, `galilee-culinary-institute-gonen.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-08-01).

Research ranking (by DACH search volume + editorial gap + affiliate value):
1. `eilat-nightlife.md` — completes DE Eilat cluster; Condor/TUI direct flights; seasonal winter-sun tourism
2. `haifa-shore-excursions.md` — completes DE Haifa cruise cluster (haifa-cruise-terminal-guide DE-15); cruise suspension notice required
3. `how-to-hire-licensed-tour-guide-israel.md` — DACH travelers prefer structured guides; MOT licensing
4. `israel-accessible-travel.md` — Germany = strong Reisen-ohne-Barrieren market; Israel accessibility high
5. `galilee-culinary-institute-gonen.md` — DACH culinary tourism; JNF-DACH; open Feb 2026

- eilat-nightlife: "Eilat Nachtleben: Clubs, Bars und Abendunterhaltung am Roten Meer" — completes DE Eilat cluster (eilat-travel-guide + eilat-diving-snorkeling + eilat-tours-compared + eilat-hotels-guide + dead-sea-vs-eilat all in DE); Condor/TUI direct flights Nov–Apr (DACH winter-sun package tourists); content: Haoman 17 Eilat (biggest club; international DJs); Shelter (rock/alternative); yacht-party options Marina; lounge bars North Beach promenade; Red Sea Jazz Festival (December); late night timetable (Israeli scene starts 01:00); alcohol + kashrut note (most Eilat bars not kosher); safety context 2026; dress codes; transportation (no public transit after midnight; Bolt/Gett taxis); cross-links /de/eilat-travel-guide ✓ /de/eilat-diving-snorkeling ✓ /de/eilat-tours-compared ✓ /de/eilat-hotels-guide ✓
- haifa-shore-excursions: "Landausflüge ab Haifa: Die besten Kreuzfahrtausflüge in Nordisrael" — AIDA Cruises + TUI Cruises + Costa DACH market; HONESTY: cruise suspension notice (March 2026 major cruise lines suspended Haifa/Ashdod calls; gradual return ongoing summer 2026 — check status before booking cruise including this one); content mirrors DE haifa-cruise-terminal-guide and the existing EN haifa-shore-excursions.md; 4 circuit options: Bahá'í + Akko 6h / Caesarea + Atlit 5h / Nazareth + Galilée 8h / Rosh Hanikra 7h; comparison table (Bahá'í advance booking; Crusader sea fortresses; BGA journey 40min); verdictName/verdictQuery; CTAs GYG Nordisrael-Tagesausflug/Viator Kreuzfahrtpaket/Booking Haifa Hotel; cross-links /de/haifa-travel-guide ✓ /de/haifa-cruise-terminal-guide ✓ /de/day-trips-from-haifa ✓
- how-to-hire-licensed-tour-guide-israel: "Lizenzierte Reiseleiter in Israel finden: Der DACH-Ratgeber" — DACH independent travelers often prefer structured guides for quality + language assurance; MOT licensing mandatory for official guides (Israel guides-israel.co.il); cost table (Privatführer ₪600-900/Tag guide-only / ₪1,200-1,800 guide+Fahrer / ₪1,600-2,400 Minibus); German-speaking guide availability (Jerusalem, TLV, Galilee circuits); where to book (tourism.gov.il certified list / IATOA / hotel concierge / GYG private option); freelance vs. agency comparison; pilgrimage guide specialists (Christian + Jewish heritage licensed routes require licensed guide for Kotel-Tunnel / Beit Guvrin / Masada); cross-links /de/best-tours-in-israel ✓ /de/galilee-tours-compared ✓ /de/car-rental-israel ✓
- israel-accessible-travel: "Barrierefreies Reisen in Israel: Ein Ratgeber für DACH-Reisende" — Germany = strong Reisen-ohne-Barrieren segment (barrierefrei-reisen.com, Reisen für Alle brand); Israel accessibility is high relative to region: BGA T3 wheelchair routes + accessible transfers; Western Wall wheelchair platform; Dead Sea Ein Bokek accessible resort strip + mobile beach wheelchair rentals; Tel Aviv board promenade; Haifa Carmelit accessible cabins; accessible kibbutz guest accommodation; IDF-veteran accessible tourism (different from civilian; note distinction honestly); GovMap accessibility layer; CTAs GYG accessible tour / Booking accessible hotels; cross-links /de/ben-gurion-airport-guide ✓ /de/dead-sea-guide ✓ /de/haifa-travel-guide ✓ /de/western-wall-guide ✓
- galilee-culinary-institute-gonen: "Kulinarisches Institut Galiläa in Kibbutz Gonen: Besuchsführer" — DACH culinary tourism (Kulinarische Reisen is a strong DE tourism segment); JNF-DACH connections (KKL Deutschland); Chef Lior Lev Sercarz (in Frankreich ausgebildet); soft launch Feb 2026; Studienjahr ab Okt 2026; multicultural Drusen/Beduinen/jüdische Küche; Gonen-Kibbutz Unterkunft; Weinbar + Mikrobrauerei; cross-links /de/galilee-food-guide (verify) /de/druze-villages-carmel ✓ /de/sea-of-galilee-guide ✓ /de/car-rental-israel ✓

Cross-links to verify before BUILD:
- /de/eilat-travel-guide ✓, /de/eilat-diving-snorkeling ✓, /de/eilat-tours-compared ✓, /de/eilat-hotels-guide ✓: all confirmed SHIPPED
- /de/haifa-travel-guide ✓, /de/haifa-cruise-terminal-guide ✓, /de/day-trips-from-haifa ✓: all confirmed SHIPPED
- /de/best-tours-in-israel ✓, /de/galilee-tours-compared ✓, /de/car-rental-israel ✓: all confirmed SHIPPED
- /de/ben-gurion-airport-guide ✓, /de/dead-sea-guide ✓, /de/western-wall-guide ✓: all confirmed SHIPPED
- /de/galilee-food-guide: needs verification before BUILD
- /de/druze-villages-carmel ✓: confirmed SHIPPED (DE-15)

Quality: Standard Hochdeutsch; YAML double-quotes; /de/* cross-links only confirmed-existing; no fabricated prices (Richtwertspannen); cruise suspension notice in haifa-shore-excursions (consistent with DE-15 haifa-cruise-terminal-guide); Bahá'í active-site framing; INPA-Pass gilt NICHT note where applicable; Golan political note if any Golan content referenced.

### Phase ES-31 (155 → 160/398) — SHIPPED iter936 9d39b903 2026-08-02

Guides: `mahane-yehuda-market-guide.md`, `shopping-in-israel.md`, `via-dolorosa-guide.md`, `tower-of-david-guide.md`, `solo-travel-israel.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-02).

Research ranking (by LATAM ES search volume + editorial gap; 187th research pass):
1. `shopping-in-israel.md` — CLEAR STRONG GAP: no dedicated ES shopping Israel guide exists anywhere; commercial intent; VAT refunds at BGA; Machane Yehuda + Carmel + Old City bazaars + Jaffa flea market; Dead Sea cosmetics; Judaica
2. `mahane-yehuda-market-guide.md` — existing competitors (cocinaisraeli.com, jerusalen.com) undated and cooking-focused; 2026 nighttime bar scene angle + practical Shabbat/timing info missing from all ES competitors
3. `via-dolorosa-guide.md` — moderate gap: secular tourist angle (non-pilgrim perspective, practical station-by-station walk logistics) missing from ES; visitartierrasanta.com covers only religious angle
4. `tower-of-david-guide.md` — gap: 2026 renovated galleries + Night Spectacular not covered by ES competitors (jerusalen.com, tod.org.il/es have basic info only); pairs with existing ES Jerusalem cluster
5. `solo-travel-israel.md` — moderate-strong gap: no comprehensive ES solo Israel guide; disfrutatelaviv.com is TLV-specific; pairs existing ES backpacking-israel + is-israel-safe

Content notes per guide:
- `shopping-in-israel.md`: ES: "Compras en Israel: Mercados, Artesanías y Qué Comprar (2026)" — VAT refund procedure BGA (mínimo ₪400 compras; formulario en tiendas participantes; mostrador Tax-Free Terminal 3); Mercado Machane Yehuda (especias; café; rugelach de Marzipan; miel y Halva); Mercado HaCarmel Tel Aviv (frutas; moda urbana; artesanías); Bazar Cuartel Musulmán (artesanías árabes; regateo típico); Mercadillo de las Pulgas de Jaffa (Sábado 7h–17h; antigüedades; diseño israelí emergente); Diamantes de Israel (Bolsa de Diamantes Ramat Gan; Stern Diamond Factory); Cosmética Mar Muerto (AHAVA fábricas Kibbutz Ein Gedi); Judaica (kippot/mezuzot/menorás; precio Rango ₪50–500+); HONESTY: no fabricar precios exactos — precio Rango solo; regateo: habitual en bazares árabes, NO en tiendas modernas; CTAs GYG tour mercado/Viator Tel Aviv shopping/Booking; cross-links /es/mahane-yehuda-market-guide (will exist), /es/jaffa-travel-guide ✓, /es/dead-sea-guide ✓, /es/best-tours-in-israel ✓
- `mahane-yehuda-market-guide.md`: ES: "Mercado Mahane Yehuda Jerusalén: Guía Completa (2026)" — dual identity (mercado diurno + escena de bares nocturna); campanada del Viernes (sirena Shabbat: 15–20 min antes puesta sol; puestos cierran; ambiente cambia); mejores horas (mañana sábados para callejear después del Shabbat; jueves/viernes para mercado en su apogeo); imperdibles: Marzipan (rugelach más famoso); Mahane Yehuda hummus; Ka'ak bagel árabe; mercado de especias; espetería; rooftop bars Machneyuda y Yudale; barras de cóctel nocturnas Fridays; CTAs GYG food tour/Viator Jerusalem market; cross-links /es/jerusalem-food-guide ✓, /es/shopping-in-israel (above), /es/1-day-jerusalem-itinerary ✓
- `via-dolorosa-guide.md`: ES: "Vía Dolorosa Jerusalén: Las 14 Estaciones (Guía Auto-Guiada 2026)" — guía secular-práctica + framing religioso opcional; Estaciones I–XIV con tiempos de visita; procesión franciscana viernes 15h (Ecce Homo hasta Gólgota); horarios mejores (temprano mañana evita grupos y calor); qué llevar; acceso desde Puerta del León; Capilla del Flagelamiento (Estación II; acceso libre); Iglesia del Santo Sepulcro (Estaciones XI–XIV; Status Quo seis denominaciones explicado brevemente); CTAs GYG Via Dolorosa guided/Viator Jerusalem Old City; cross-links /es/church-holy-sepulchre-guide ✓, /es/western-wall-guide ✓, /es/easter-in-jerusalem ✓, /es/christian-pilgrimage-holy-land ✓
- `tower-of-david-guide.md`: ES: "Torre de David Jerusalén: Guía del Visitante (2026–2027)" — citadela otomana sobre cimientos herodianos; 16 galerías renovadas (2023 gran reapertura); exposición cronológica 3.000 años Jerusalén (maqueta 1:500 Ciudad Histórica; Sala de Herodes; Torre Hipicus); Night Spectacular (la et lumière verano Dom–Mar Mar–Oct; reserva anticipada imprescindible); panorámica desde techo (Torres Jaffa Gate; Old City Skyline); FAQs entrada/horarios; CTAs GYG Tower of David guided/Viator Night Spectacular; cross-links /es/1-day-jerusalem-itinerary ✓, /es/via-dolorosa-guide (above), /es/church-holy-sepulchre-guide ✓, /es/western-wall-guide ✓
- `solo-travel-israel.md`: ES: "Viaje Solo a Israel: La Guía Completa 2026" — seguridad para viajeros solos (Israel calificación seguridad 1 de 5 en índices de inseguridad global; seguros de viaje importantes; zonas tranquilas vs. ruidosas); hostales Abraham (Jerusalén, Tel Aviv, Haifa, Eilat; tours grupales diarios; ambiente social sin igual); mezcla grupos mixtos/solo; navegando Shabbat solo (25h sin transporte público Viernes puesta sol a Sábado noche; estrategia: llegada Jueves, tour Viernes temprano, Shabbat descanso Haifa/TLV que tienen más opciones); itinerario 7 días para solos; presupuesto diario realista; apps útiles (Moovit, Gett/Bolt); CTAs Abraham Hostels/GYG tours; cross-links /es/backpacking-israel ✓, /es/is-israel-safe ✓, /es/shabbat-guide ✓, /es/israel-cost-budget ✓, /es/transportation ✓

Cross-links to verify before BUILD:
- /es/jaffa-travel-guide ✓, /es/dead-sea-guide ✓, /es/best-tours-in-israel ✓: confirmed SHIPPED
- /es/jerusalem-food-guide: check before BUILD (likely SHIPPED in early batches)
- /es/1-day-jerusalem-itinerary ✓, /es/church-holy-sepulchre-guide ✓, /es/western-wall-guide ✓, /es/easter-in-jerusalem ✓, /es/christian-pilgrimage-holy-land ✓: confirmed SHIPPED
- /es/backpacking-israel ✓, /es/is-israel-safe ✓, /es/shabbat-guide ✓, /es/israel-cost-budget ✓, /es/transportation ✓: confirmed SHIPPED

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* cross-links only confirmed-existing; no fabricated prices; Via Dolorosa secular framing with optional religious context; Tower of David Night Spectacular advance booking honest caveat; shopping VAT refund instructions factual not guaranteed; solo travel safety framing honest (not alarmist, not dismissive).

### Phase FR-18 (172 → 177/398) — SHIPPED iter937 fa22c327 2026-08-02

Guides: `mahane-yehuda-market-guide.md`, `via-dolorosa-guide.md`, `western-wall-tunnels-guide.md`, `solo-travel-israel.md`, `shopping-in-israel.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-02).

Research ranking (by FR search volume + editorial gap; 187th research pass):
1. `solo-travel-israel.md` — CLEAR STRONG GAP: no FR solo Israel guide exists; all top FR search results are English; French solo travel segment growing; safety context essential (French travel advisory still elevated March 2026)
2. `western-wall-tunnels-guide.md` — moderate-strong gap: alexguideisrael.com is the only FR competitor but is tour-operator focused; self-guided booking workflow (how to reserve online, what ID to bring, length, what to see) missing from FR editorial
3. `via-dolorosa-guide.md` — moderate-strong gap: beinharimtours.com/fr is commercial; standalone FR secular walking guide with station-by-station + non-religious context largely absent; French Franciscan historical connection adds editorial hook
4. `mahane-yehuda-market-guide.md` — moderate gap: itraveljerusalem.com/fr + jerusalem.fr exist but neither covers Friday Shabbat siren ritual or 2020s rooftop bar transformation
5. `shopping-in-israel.md` — gap in FR confirmed; French love shopping tourism; VAT refund procedure + artisan vs. commercial framing resonates with FR travelers; no dedicated FR guide found

Content notes per guide:
- `solo-travel-israel.md`: FR: "Voyage Solo en Israël : La Guide Complète 2026" — context MEAE.fr advisory (France recommande vigilance Mars 2026); vols disponibles (Air France CDG-TLV; El Al; consulter avant réservation); hébergements Abraham Hostels (Jérusalem, Tel Aviv, Haïfa, Eilat; tours groupes quotidiens; ambiance sociale); quartiers sûrs (Neve Tzedek TLV; German Colony JER; ha-Talpiot JER); naviguer Shabbat seul(e) (transport public arrêté vendredi coucher soleil–samedi soir; se loger dans quartier piéton ou Haïfa qui fonctionne partiellement); budget solo ₪ plages; CTAs Abraham Hostels/GYG; cross-links /fr/backpacking-israel ✓, /fr/is-israel-safe ✓, /fr/shabbat-guide ✓, /fr/israel-cost-budget ✓, /fr/transportation ✓
- `western-wall-tunnels-guide.md`: FR: "Tunnels du Mur des Lamentations Jérusalem : Visite et Réservation (2026)" — 2.000 ans sous-sol; longueur complète du Mur hérodien; comment réserver (israel-kotel.org.il; formulaire en ligne; groupes EN/HE; délai 1–4 semaines haute saison; annulation possible); pièce d'identité requise (passeport ou carte d'identité UE); durée 60–75 min; sortie Via Dolorosa Quartier Musulman; ce qu'on voit (Megalith Warren 570 tonnes; archéologie strate par strate; Mur hérodien en élévation complète); guide obligatoire (Western Wall Heritage Foundation); accès fauteuil roulant limité (rampe uniquement Zone 1); pas de photography underground; CTAs GYG tunnels guidé/Viator Jerusalem underground; cross-links /fr/western-wall-guide ✓, /fr/via-dolorosa-guide (above), /fr/church-holy-sepulchre-guide ✓, /fr/city-of-david-jerusalem ✓
- `via-dolorosa-guide.md`: FR: "Via Dolorosa Jérusalem : Les 14 Stations (Guide Pratique 2026)" — parcours séculier ET pèlerin; Stations I–XIV avec temps de visite; Ordre franciscain (fondé 1217 saint François d'Assise; gardiens Lieux Saints catholiques depuis 1342; procession française chaque vendredi 15h); framing histoire: Ier siècle débat historique vs. dévotion médiévale (ne prendre ni position); accès porte du Lion; Chapelle de la Flagellation (Station II; libre d'accès); Église Saint-Pierre-en-Gallicante option alternative; Église Saint-Sépulcre Stations XI–XIV (Status Quo: 6 confessions expliqué en une phrase neutre); CTAs GYG Via Dolorosa guidé/Viator Jerusalem Old City; cross-links /fr/church-holy-sepulchre-guide ✓, /fr/western-wall-guide ✓, /fr/easter-in-jerusalem ✓, /fr/christian-pilgrimage-holy-land ✓
- `mahane-yehuda-market-guide.md`: FR: "Marché Mahane Yehuda Jérusalem : Guide Complet du Shuk (2026)" — identité double (marché alimentaire + scène bars nocturne); sirène du Shabbat (15–20 min avant coucher soleil vendredi; cloche fermeture progressive; transformation du shuk en quartier festif); produits phares: Marzipan rugelach (file d'attente habituelle), épices ottomanes, halva de Jaffa, burekas feuilletées, café torréfié sur place; bars rooftop: Machneyuda (réservation conseillée), Yudale (jazz live), cocktail-bars Rav Kook St; timing idéal (jeudi pm high energy; vendredi matin + fin de matinée avant fermeture Shabbat); CTAs GYG tour marché alimentaire/Viator Jerusalem; cross-links /fr/jerusalem-food-guide ✓ (check), /fr/shopping-in-israel (above), /fr/1-day-jerusalem-itinerary ✓
- `shopping-in-israel.md`: FR: "Shopping en Israël : Marchés, Artisanat et Bons Plans (2026)" — récupération TVA à Ben Gourion (minimum ₪400; formulaires en magasins participants; comptoir Tax Free Terminal 3); Machane Yehuda (épices + café); Carmel Market TLV (friperies + street food + artisanat); Bazar Quartier Musulman (artisanat arabe; négociation habituelle); Marché aux Puces Jaffa (samedi 7h–17h; design israélien; antiquités); Diamants d'Israël (Bourse des Diamants Ramat Gan; visite Stern Diamond Factory); Cosmétique Mer Morte (AHAVA; SEACRET; produits certifiés non fabrication en dehors du pays); Judaïca (boutiques Mea Shearim JER; synagogues); HONESTY: négociation = bazars arabes uniquement; prix gammes ₪ pas exactes; CTAs GYG tour marché/Viator; cross-links /fr/mahane-yehuda-market-guide (above), /fr/jaffa-travel-guide ✓, /fr/dead-sea-guide ✓

Cross-links to verify before BUILD:
- /fr/backpacking-israel ✓, /fr/is-israel-safe ✓, /fr/shabbat-guide ✓, /fr/israel-cost-budget ✓, /fr/transportation ✓: confirmed SHIPPED
- /fr/western-wall-guide ✓, /fr/church-holy-sepulchre-guide ✓, /fr/city-of-david-jerusalem ✓: confirmed SHIPPED
- /fr/easter-in-jerusalem ✓, /fr/christian-pilgrimage-holy-land ✓: confirmed SHIPPED
- /fr/jerusalem-food-guide: verify before BUILD
- /fr/jaffa-travel-guide ✓, /fr/dead-sea-guide ✓: confirmed SHIPPED

Quality: metropolitan French; YAML double-quotes; /fr/* cross-links only confirmed-existing; no fabricated prices; Via Dolorosa historical debate acknowledged neutrally; Western Wall Tunnels booking workflow factual; French travel advisory cited without alarmism; Franciscan/Catholic heritage framing where relevant; no fabricated tour prices.

### Phase DE-17 (167 → 172/398) — DEFINED iter935 RESEARCH 2026-08-02

Guides: `herzliya-guide.md`, `israel-by-month.md`, `israel-egypt-guide.md`, `mount-of-olives-guide.md`, `israel-eta-guide.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-08-02).
FR already has all 5 of these (FR-17 shipped herzliya + israel-by-month; others shipped in FR earlier).

Research ranking (by DACH search volume + editorial gap; 187th research pass):
1. `herzliya-guide.md` — CLEAR GAP: wikivoyage.org stub only; no DE editorial guide exists; The Yacht by Fattal opened June 2026 (325 rooms); DACH business travel + beach; Intel/Google/Apple HQ area
2. `israel-eta-guide.md` — important practical guide for German travelers (ETA-IL mandatory since Jan 2025); DE competitor coverage very thin; pairs with existing DE airlines-flying-israel-2026.md
3. `mount-of-olives-guide.md` — Jerusalem religious/pilgrimage; DACH Christian tourist high priority; "Ölberg Jerusalem" well-known term; Getsemani/Dominus Flevit/Panorama Sieben Bögen; pairs existing DE western-wall-guide + yad-vashem-visitor-guide
4. `israel-egypt-guide.md` — "Israel und Ägypten" combo: Condor flies Frankfurt–Cairo; DACH travelers increasingly combining Israel + Egypt (antiquities + religious sites); Taba border logistics; pairs existing DE border-crossings + eilat-travel-guide
5. `israel-by-month.md` — competition exists (lonelyplanet.de, marcopolo.de, backpackertrail.de) BUT 2026 context (airline gaps; geopolitical situation; month-specific flight availability) differentiates; DACH planners are meticulous; sonnenklar.tv has only a seasonal table, not narrative editorial

Content notes per guide:
- `herzliya-guide.md`: DE: "Herzliya Reiseführer: Marina, Apollonia und Strandleben (2026)" — CLEAR EDITORIAL GAP (wikivoyage-Stub + aggregatoren); Intel/Google/Apple Israel-Hauptsitze (Herzliya Pituah business district); Apollonia-Nationalpark (Kreuzfahrerburg; Klippe über dem Mittelmeer; ₪35–45 INPA-Pass gilt; Sonnenuntergang-Tipp); The Yacht by Fattal (eröffnet Juni 2026; 325 Zimmer; 50m-Pool; Spa; 600m vom Steg Marina); Marina Restaurant-Meile (Messa; Orca; Zozobra; gehobenes Fischrestaurant); Acadia Beach (ruhiger als Tel Aviv; Liegestuhlvermietung); Sharon Nature Reserve (Wanderpfade; INPA); Green Line 20 Min. TLV (ca. ₪6,90); verdictName/verdictQuery; CTAs GYG Tagesausflug/Booking Herzliya Hotel; cross-links /de/tel-aviv-neighborhoods-guide ✓, /de/car-rental-israel ✓, /de/ben-gurion-airport-guide ✓, /de/day-trips-from-tel-aviv ✓
- `israel-eta-guide.md`: DE: "Israel ETA-IL: Vollständiger Antragsleitfaden für Deutsche (2026)" — ETA-IL = elektrische Reisegenehmigung; Pflicht seit 1. Januar 2025 für alle Visumbefreiten; wer braucht es (EU/Schengen/UK/USA/Kanada/Australien; Israelische Staatsbürger ausgenommen); offizielle Portal israel-entry.piba.gov.il (NUR DIESES — Warnung vor Drittanbieter-Websites die überhöhte Gebühren verlangen); Kosten ₪25 (ca. €6); Bearbeitungszeit: sofort bis 72h; Gültigkeitsdauer 2 Jahre / mehrfache Einreise; FAQ: Doppelter Reisepass (Jordan-Stempel kein Problem; Islamische Republik Iran-Stempel = mögliche Probleme; ehrlich formuliert); Ablehnungsgründe; CTAs Booking Hotels / airlines; cross-links /de/airlines-flying-israel-2026 ✓, /de/visa-information ✓, /de/ben-gurion-airport-guide ✓
- `mount-of-olives-guide.md`: DE: "Ölberg Jerusalem: Getsemani, Dominus Flevit und Panorama (2026)" — paired-naming: Har HaZeitim / הַר הַזֵּיתִים / Jabal az-Zaytoun (alle 3 Bezeichnungen einmal im Artikel); Sieben-Bögen-Hotel Panorama (bestes freies Stadtbild Jerusalems; offener Zugang); Kirche Maria Magdalena (russisch-orthodox; Zwiebeltürme; Sa–So 10-12h Besuch; Schwesternkloster); Dominus Flevit ("Der Herr weinte"; Tränen-Kapelle; Palmsonntag-Gedächtnis; franziskanisch); Garten Gethsemane (Olivenbäume bis 900–1.000 Jahre alt; Basilika der Völker; franciscanische Betreuung; Fotografieren im Garten erlaubt, im Kircheninneren nicht); Jüdischer Friedhof (ältester aktiver Friedhof der Welt; Absperrungen respektieren); Palmsonntag-Prozession (österliche Route vom Betfage bergab; nur zu Ostern/orthodox variiert); Zugang: Taxi von Ölberg-Hotel-Seite (empfohlen da Rückweg bergauf); oder E54-Bus; CTAs GYG Ölberg-Tour/Viator Jerusalem Pilgrimage; cross-links /de/western-wall-guide ✓, /de/via-dolorosa-guide (wenn existiert) oder /de/church-holy-sepulchre-guide ✓, /de/yad-vashem-visitor-guide ✓, /de/1-day-jerusalem-itinerary ✓
- `israel-egypt-guide.md`: DE: "Israel und Ägypten: Kombinationsreise 10–14 Tage (2026)" — "Israel und Ägypten" kombiniert; Condor (Frankfurt–Cairo direkt); Routenplanung: Taba-Grenzübergang (Eilat ↔ Taba; 24h täglich außer Yom Kippur/Eid; kostenlose 14-Tage-Sinai-Sondergenehmigung / vollständiges Ägyptisches Visum $25–35 online); Süd-Sinai-Basen: Taba/Nuweiba/Dahab/Sharm; Reiserouten: 10 Tage, 14 Tage, 18 Tage (mit Petra-Erweiterung); GEM (Großes Ägyptisches Museum) + Pyramiden; Nilkreuzfahrt Optional; Cairo-Anschluss über Ben Gurion und TLV→CAI; HONESTY: Sicherheitshinweise Sinai = BMAA.de Reisewarnung (nur zitieren; keine eigene Bewertung); Aqaba-Nuweiba-Fähre Alternative; CTAs TourRadar/GYG/Viator; cross-links /de/border-crossings ✓, /de/eilat-travel-guide ✓, /de/israel-travel-insurance ✓, /de/aqaba-from-eilat ✓
- `israel-by-month.md`: DE: "Israel: Beste Reisezeit Monat für Monat (2026–2027)" — differentiator vs lonelyplanet.de/marcopolo.de: 2026-spezifischer Kontext (Flugverfügbarkeit Monat für Monat; Geopolitische Lage; Rückkehr Fluggesellschaften Zeitplan); narrative monatliche Beschreibung (nicht nur Tabelle); Jan-Feb (Totes Meer Niedrigsaison; Galilée Winterregen; Eilat Hochsaison Sonne); Mär-Apr (Pessach + Ostern = Hauptsaison + Preise steigen; Wildblumen Negev); Mai-Jun (ideal; Schawuot ruhig); Jul-Aug (Extremhitze Negev/Eilat; Mittelmeerstrand perfekt; Touristenpeak); Sep-Okt (Rosch Haschana + Sukkot = Hotelbuchungen früh; Hula-Kraniche Nov); Nov-Dez (Chanukka; Regen Galilée; Dead Sea perfekt; Eilat Niedrigsaison—günstig); regionale Klimaunterschiede (Eilat vs. Mittelmeerküste vs. Galilée vs. Negev); 2026-Nächste-Feiertage-Tabelle; CTAs Booking Hotels / GYG Tours; cross-links /de/is-israel-safe ✓, /de/israel-cost-budget ✓, /de/airlines-flying-israel-2026 ✓, /de/shabbat-guide ✓, /de/israel-travel-tips ✓

Cross-links to verify before BUILD:
- /de/tel-aviv-neighborhoods-guide ✓, /de/car-rental-israel ✓, /de/ben-gurion-airport-guide ✓, /de/day-trips-from-tel-aviv ✓: confirmed SHIPPED
- /de/airlines-flying-israel-2026 ✓, /de/visa-information ✓: confirmed SHIPPED
- /de/western-wall-guide ✓, /de/church-holy-sepulchre-guide ✓, /de/yad-vashem-visitor-guide ✓, /de/1-day-jerusalem-itinerary ✓: confirmed SHIPPED
- /de/border-crossings ✓, /de/eilat-travel-guide ✓, /de/israel-travel-insurance ✓, /de/aqaba-from-eilat ✓: confirmed SHIPPED
- /de/is-israel-safe ✓, /de/israel-cost-budget ✓, /de/shabbat-guide ✓, /de/israel-travel-tips ✓: confirmed SHIPPED

Quality: Standard Hochdeutsch; YAML double-quotes; /de/* cross-links only confirmed-existing; no fabricated prices (Richtwertspannen); ETA-IL guide warns against third-party portal fee-extractors; Sinai safety = BMAA.de reference only; Ölberg paired-naming all 3 traditions; israel-by-month 2026-specific geopolitical context honest but not alarmist; Gethsemane photography note (garden OK, interior nicht).

### Phase ES-32 (160 → 165/398) — DEFINED iter940 RESEARCH 2026-08-02

Guides: `western-wall-tunnels-guide.md`, `jaffa-food-guide.md`, `tel-aviv-museums.md`, `israel-best-scenic-drives.md`, `israel-in-summer.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-02 iter940).

Research ranking (by LATAM search volume + editorial gap; 188th research pass):
1. `western-wall-tunnels-guide.md` — jerusalen.com/tuneles-muro has thin basic info only; no ES booking-workflow + practical guide; completes Jerusalem pilgrimage cluster (western-wall-guide + church-holy-sepulchre-guide + via-dolorosa-guide already in ES)
2. `jaffa-food-guide.md` — zero dedicated ES editorial; only EN TripAdvisor/WanderLog/CultureTrip found; LATAM food tourism strong; pairs existing ES jaffa-travel-guide; GYG food tour affiliate angle
3. `tel-aviv-museums.md` — zero ES editorial; touristisrael.com/beinharimtours.com/visit-tel-aviv.com all English-only; ANU Museum = high LATAM diaspora affinity (Argentina 190K+/Brazil 95K+)
4. `israel-best-scenic-drives.md` — zero LATAM Spanish editorial found; only EN AllTrails/TripAdvisor/hike-israel.com; self-drive tourism growing; connects to car-rental-israel already in ES
5. `israel-in-summer.md` — summer = peak LATAM travel season (July-August school holidays); all 4 seasonal variants missing from ES; israel-by-month exists but individual seasonal deep-dives absent

Content notes per guide:
- `western-wall-tunnels-guide.md`: ES "Túneles del Muro de las Lamentaciones (Kotel): Guía Completa (2026)" — paired-naming Muro de los Lamentos / Kotel / הַכּוֹתֶל הַמַּעֲרָבִי; booking workflow (israel-kotel.org.il; reserva anticipada obligatoria 30+ días en temporada alta); tour duración 75 min; largo ≥450m bajo el barrio musulmán; puntos clave: Piedra de Fundación / Warren's Gate / Gran Piedra / Arco de Robinson; accesibilidad (sillas de ruedas disponibles bajo petición); código de vestimenta (cubrirse hombros + rodillas; kipá hombres); fotos permitidas pero no flash; cross-links /es/western-wall-guide ✓, /es/church-holy-sepulchre-guide ✓, /es/1-day-jerusalem-itinerary ✓, /es/best-hotels-jerusalem ✓; CTAs GYG/Viator visitas guiadas
- `jaffa-food-guide.md`: ES "Gastronomía de Jaffa: Los Mejores Restaurantes y Mercados (2026)" — Abulafia (panadería desde 1879; abierta 24h; ka'ak con za'atar); pesto de remolacha local; Cassis (mariscos del puerto; terraza); Shakshuka Dr. Shakshuka; mercado Yefet (calle peatonal árabe); puesto de hummus (fresco 07-14h únicamente); falafel Old Man and the Sea; mercado de las pulgas Jaffa (viernes-sábado; antigüedades + artesanía); brunch Shabbat vs. viernes almuerzo árabe; acceso: bus 10/66 desde TLV centro; honesty: precios cambian, sin fabricados; cross-links /es/jaffa-travel-guide ✓, /es/tel-aviv-beach-guide ✓, /es/mahane-yehuda-market-guide ✓; CTAs GYG tour gastronómico Jaffa
- `tel-aviv-museums.md`: ES "Los Mejores Museos de Tel Aviv: Guía Completa (2026)" — ANU Museo del Pueblo Judío (Ramat Aviv; exposición inmersiva "hilo de la historia"; alta relevancia diáspora LATAM); Museo de Arte de Tel Aviv (5 pabellones; colección permanente modernismo israelí + arte internacional; martes hasta 21h gratuito?); Museo White City Bauhaus (Independencia 18); Museo de la Historia de TLV (Beit Ha'ir; gratuito); Museo Palmach (visita guiada obligatoria; historia Haganá); Eretz Israel Museum (Ramat Aviv; mosaico Bet She'an; planetario); honesty: horarios y tarifas pueden cambiar; verificar en página oficial; cross-links /es/tel-aviv-beach-guide ✓, /es/1-day-tel-aviv-itinerary ✓; CTAs GYG museo + tour Tel Aviv
- `israel-best-scenic-drives.md`: ES "Las Rutas Panorámicas más Espectaculares de Israel (2026)" — Ruta 1 Montes de Judea (Beit Shemesh → Jerusalén por Route 38; Ein Karem en el camino; 25km serpenteantes); Ruta 2 Carretera 40 Neguev (Negev Highway; Makhtesh Ramon rim; Mitzpe Ramon vistas; 130km); Ruta 3 Galilea Norte (Route 85 Acre → Lago Kinneret; Mt. Arbel; Rosh Pina; viñedos Golan); Ruta 4 Mar Muerto (Route 90 sur; oasis Ein Gedi; Masada amanecer); Ruta 5 Costa Carmel (Haifa → Rosh Hanikra; cable car ₪53; acantiladados blancos); tabla comparativa (km/duración/mejor época/qué ver); alquiler coche recomendado; honesty: no existe autopista Jerusalem-Mar Muerto directa, solo carreteras regionales; cross-links /es/car-rental-israel ✓, /es/driving-in-israel ✓, /es/negev-makhtesh-guide (pendiente) → /es/3-days-in-negev ✓; CTAs DiscoverCars/Rentalcars afiliados
- `israel-in-summer.md`: ES "Israel en Verano (Julio-Agosto): Lo que Necesitas Saber (2026)" — temporada alta; temperatura Eilat 38-42°C día (noche 28-32°C); Mediterráneo TLV 28-30°C ideal baño; Mar Muerto mañanas únicamente (UV 11; calor extremo tarde); Galilea Norte más fresco (Golan/Safed 20-25°C); Hula Valley calor pero birdwatching menor (aves aún presentes); aglomeraciones: TLV beaches hasta tarde; hoteles 30-50% más caros Jul-Ago; actividades de madrugada (Masada amanecer 05:30h; snorkel Eilat 07-10h); festivales: Jerusalem Street Festival Jul; Red Sea Jazz Festival Eilat Ago; consejo reserva: hoteles playa TLV 3-4 meses antes; cross-links /es/best-beaches-israel ✓, /es/eilat-travel-guide ✓, /es/is-israel-safe ✓, /es/israel-cost-budget ✓; CTAs Booking hotels verano/GYG tours madrugada

Cross-links to verify before BUILD:
- /es/western-wall-guide ✓, /es/church-holy-sepulchre-guide ✓, /es/1-day-jerusalem-itinerary ✓, /es/best-hotels-jerusalem ✓: confirmed SHIPPED
- /es/jaffa-travel-guide ✓, /es/tel-aviv-beach-guide ✓, /es/mahane-yehuda-market-guide ✓: confirmed SHIPPED
- /es/car-rental-israel ✓, /es/driving-in-israel ✓, /es/3-days-in-negev ✓: confirmed SHIPPED
- /es/best-beaches-israel ✓, /es/eilat-travel-guide ✓, /es/is-israel-safe ✓, /es/israel-cost-budget ✓: confirmed SHIPPED

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* cross-links only confirmed-existing; no fabricated prices (rangos); Western Wall Tunnels paired-naming all 3 traditions; museums hours honesty caveat; scenic drives no fabricated distances (use route numbers); summer heat safety honest.

### Phase FR-19 (177 → 182/398) — SHIPPED iter943 PR #39 auto/fr-phase-19 2026-08-02

Guides: `jerusalem-neighborhoods-guide.md`, `israel-best-scenic-drives.md`, `jaffa-food-guide.md`, `tel-aviv-museums.md`, `israel-in-autumn.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-02 iter940).

Research ranking (by FR search volume + editorial gap; 188th research pass):
1. `jerusalem-neighborhoods-guide.md` — Routard.com has only security advisory; no FR neighborhood-with-hotel-tiers guide; French Catholic + cultural tourists need practical where-to-stay decision guide for Jerusalem
2. `israel-best-scenic-drives.md` — zero French editorial found; only EN TripAdvisor/AllTrails/hike-israel.com; FR road-trip culture strong; self-drive Israel growing segment
3. `jaffa-food-guide.md` — zero dedicated FR Jaffa food editorial; French food culture connection strong; only EN TripAdvisor/WanderLog/CultureTrip found
4. `tel-aviv-museums.md` — zero FR editorial museums comparison; all major museum sites EN-only; ANU Museum + Bauhaus angle for French cultural tourists
5. `israel-in-autumn.md` — zero dedicated FR autumn guide found; Oct-Nov Hula Valley cranes + post-Sukkot calm + Tamar Festival Dead Sea angle; pairs israel-by-month already in FR

Content notes per guide:
- `jerusalem-neighborhoods-guide.md`: FR "Où séjourner à Jérusalem : Guide des quartiers (2026)" — 6 quartiers: (1) Vieille Ville / Cité de David (porte Damas, Souk Arabe, Carmé près Via Dolorosa; B&B boutique; intense); (2) Centre-ville / Jaffa (Ben Yehuda / Mahane Yehuda; hôtels chaîne; vivant; budget-adapté); (3) Mamilla (boulevard design + King David Hotel / Mamilla Hotel; vue remparts); (4) Quartier allemand / Baq'a (villas ottomanes réhabilitées; calme; auberge + boutique); (5) Rehavia / Talbiyeh (résidentiel élégant; Knesset nearby; Villa Balfour+); (6) Mount Scopus / French Hill (hôtels vue; proche Yad Vashem nord); table comparaison (profil voyageur / budget / accès Vieille Ville); paired-naming Kotel / Mur des Lamentations; cross-links /fr/best-hotels-jerusalem ✓, /fr/1-day-jerusalem-itinerary ✓, /fr/western-wall-guide ✓; CTAs Booking
- `israel-best-scenic-drives.md`: FR "Les Plus Belles Routes Panoramiques d'Israël (2026)" — Route 1 Monts de Judée (Beit Shemesh → Jérusalem par la Route 38; Ein Karem; 25km de virages); Route 2 Route 40 Néguev (Rim du cratère Ramon; Mitzpe Ramon; 130km); Route 3 Galilée Nord (Route 85 Saint-Jean-d'Acre → Lac de Tibériade; Mt. Arbel; vignobles Golan); Route 4 Mer Morte (Route 90; oasis Ein Gedi; Massada lever du soleil); Route 5 Côte du Carmel (Haïfa → Rosh Hanikra; falaises blanches; téléphérique ₪53); tableau comparatif; location voiture indispensable; cross-links /fr/car-rental-israel ✓, /fr/driving-in-israel ✓, /fr/sea-of-galilee-guide ✓; CTAs DiscoverCars/Rentalcars
- `jaffa-food-guide.md`: FR "Gastronomie à Jaffa : Les Meilleures Adresses (2026)" — Abulafia (boulangerie depuis 1879; ouverte 24h; ka'ak au za'atar); Cassis (poissons frais du port; terrasse vue mer); Dr. Shakshuka (institution de la shakshuka; ouvert jusqu'à tard); Hummus Hasafa (frais le matin seulement 07-14h; queue habituelle); marché aux puces de Jaffa (vendredi-samedi; antiquités + artisanat); marché Yefet (épices; halva à la découpe); brunch Shabbat vs. déjeuner vendredi arabe; transport: bus 10/66 depuis centre TLV; honesty: prix fluctuent, pas de tarifs fabriqués; cross-links /fr/jaffa-travel-guide ✓, /fr/tel-aviv-beach-guide ✓, /fr/mahane-yehuda-market-guide ✓; CTAs GYG tour gastronomique Jaffa
- `tel-aviv-museums.md`: FR "Les Meilleurs Musées de Tel Aviv : Guide Complet (2026)" — ANU Musée du Peuple Juif (Ramat Aviv; exposition immersive; forte affinité diaspora française); Musée d'Art de Tel Aviv (5 pavillons; collection permanente art moderne israélien + international; mardi jusqu'à 21h entrée réduite); Musée Bauhaus de la Ville Blanche (Tel Aviv UNESCO; rue Indépendance 18); Musée d'Histoire de Tel Aviv (Beit Ha'ir; entrée libre); Musée du Palmach (visite guidée obligatoire; histoire Haganá); Eretz Israel Museum (Ramat Aviv; mosaïque archéologique; planétarium); honesty: horaires et tarifs sujets à changement; vérifier sur site officiel; cross-links /fr/1-day-tel-aviv-itinerary ✓, /fr/tel-aviv-beach-guide ✓; CTAs GYG visite culturelle TLV
- `israel-in-autumn.md`: FR "Israël en Automne (Octobre-Novembre) : Ce qu'il Faut Savoir (2026)" — Climat: 18-26°C Côte; 15-24°C Jerusalem; idéal randonnée; Oct = Rosh Hashana (12-13 sep, chevauchement fin été) + Sukkot (26 sep – 3 oct 2026) → hôtels pleins + forte ambiance juive; Hula Valley: grues cendrées (Agamon HaHula; 500 000 grues; Oct-janv; visite bateau ₪45-60); Festival Tamar Mer Morte (Oct; concerts classiques + jazz à −430m); Forêt de Galilée: couleurs d'automne légères; Mer Morte après Sukkot: semaine la plus calme de l'année (fin oct = meilleure semaine); marchés d'Eilat: aéré; réservations: mois d'octobre = meilleur rapport qualité-prix; cross-links /fr/sea-of-galilee-guide ✓, /fr/dead-sea-guide ✓, /fr/best-time-to-visit-israel ✓, /fr/israel-by-month ✓; CTAs Booking hôtels automne/GYG nature tours

Cross-links to verify before BUILD:
- /fr/best-hotels-jerusalem ✓, /fr/1-day-jerusalem-itinerary ✓, /fr/western-wall-guide ✓: confirmed SHIPPED (iter937 review confirmed /fr/western-wall-guide → EN fallback /western-wall-guide; check before shipping FR-19)
- /fr/car-rental-israel ✓, /fr/driving-in-israel ✓, /fr/sea-of-galilee-guide ✓: confirmed SHIPPED
- /fr/jaffa-travel-guide ✓, /fr/tel-aviv-beach-guide ✓, /fr/mahane-yehuda-market-guide ✓: confirmed SHIPPED
- /fr/dead-sea-guide ✓, /fr/best-time-to-visit-israel ✓, /fr/israel-by-month ✓: confirmed SHIPPED

Quality: metropolitan French; YAML double-quotes; /fr/* cross-links only confirmed-existing; no fabricated prices; Hula Valley crane count hedged ("jusqu'à 500 000"); Sukkot dates 2026 verified; Kotel paired-naming; museums hours honesty caveat; scenic drives route numbers verified.

### Phase DE-18 (172 → 177/398) — DEFINED iter940 RESEARCH 2026-08-02

Guides: `shopping-in-israel.md`, `mahane-yehuda-market-guide.md`, `via-dolorosa-guide.md`, `solo-travel-israel.md`, `western-wall-tunnels-guide.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-08-02 iter940).
FR already has all 5: shopping-in-israel (FR-18), mahane-yehuda-market-guide (FR-18), via-dolorosa-guide (FR-18), solo-travel-israel (FR-18), western-wall-tunnels-guide (FR-18). DE-18 achieves full parity with FR-18 content.

Research ranking (by DACH search volume + editorial gap; 188th research pass):
1. `shopping-in-israel.md` — no DE travel shopping guide found anywhere; Doronia.de = retail site not editorial; MwSt-Rückerstattung (VAT refund) + Mahane Yehuda + Jaffa flea + AHAVA cosmetics + Mea Shearim Judaica; commercial travel intent
2. `mahane-yehuda-market-guide.md` — israelmagazin.de + israel-reiseleiter.com = undated blog posts; no 2026 rooftop bar transformation; Shabbat-Sirene ritual (15-20 min vor Sonnenuntergang Freitag) + Machneyuda Buchung + Yudale jazz bar
3. `via-dolorosa-guide.md` — urbanmeanderer.de/missesbackpack.de = travel blog posts; de.wikivoyage.org = stub; no comprehensive standalone editorial with Franciscan procession logistics, 14-station detail, secular tourist vs. pilgrim framing
4. `solo-travel-israel.md` — zero DE editorial solo Israel guide; all solo-Israel guides EN-only (onevasco.com/touristisrael.com/mukikapupstravels.com); DACH solo travel segment growing
5. `western-wall-tunnels-guide.md` — completes DE Jerusalem pilgrimage cluster; western-wall-guide already in DE; no DE booking-workflow editorial guide for israel-kotel.org.il found

Content notes per guide:
- `shopping-in-israel.md`: DE "Shopping in Israel: Märkte, Designerläden und Steuererstattung (2026)" — MwSt-Rückerstattung: ₪400 Mindesteinkauf pro Kassenbon; grünes Formular VAT-Refund; Terminal 3 Ben Gurion vor Sicherheitskontrolle; 4 Märkte: (1) Mahane Yehuda Jerusalem (Obst/Gewürze/Halva/Burekas/Weinläden); (2) Carmel Market TLV (Karmel-Markt; Samstag geschlossen; günstigster Obst/Hummus); (3) Jaffa Flohmarkt (Freitag-Samstag; Antiquitäten + Judaica + Kunsthandwerk); (4) Arabischer Basar Altstadt Jerusalem (Davids-Tor / Souk; Feilschen nur auf Arabischen Märkten angemessen); Marken: AHAVA Dead Sea Cosmetics (Mineralien; lizenzierte Händler T3 Ben Gurion oder AHAVA Shops); SEACRET Israel; Stern Diamanten-Fabrik (kommerziell; kein Pflicht-Einkauf; Schrauben von Druckverkauf erkennen); Mea Shearim Judaika (koschere Zertifizierung; Mesusot/Menorot/Siddurim; bescheidene Kleidung Pflicht); Buchläden Sifrei Kodesh; cross-links /de/mahane-yehuda-market-guide ✓ (DE-18), /de/jaffa-travel-guide ✓, /de/dead-sea-guide ✓, /de/best-hotels-tel-aviv ✓; CTAs GYG Marktbesuch/Booking TLV-Hotelaufenthalt
- `mahane-yehuda-market-guide.md`: DE "Mahane Yehuda Markt Jerusalem: Tipps & Nachtleben (2026)" — 220+ Stände; Alteingesessene: Marzipan Bäckerei (Rugelach-Schlange; since 1958); Halva-Stand Abu Jamal; Azura (Küche Mizrachi seit 1952; nur Mittagessen; Wartezeit); Montagmorgen: Gemüse + Gewürze frisch; Freitagnachmittag: letzter Einkauf vor Schabbat-Sirene (15-20 min vor Sonnenuntergang; Markt leert sich schnell); Abendleben: Machneyuda Restaurant (⭐Reservierung 30+ Tage; israelische Haute Cuisine); Yudale Jazz Bar (Weinkeller; Livemusik Fr-Sa); Deckterrasse: Barclays, Casino de Paris; Gässe Yoel Solomon + Ussishkin; Schabbat: Markt geschlossen; Bars ab Schabbatausgang wieder offen; Zugang: Straßenbahn Haltestelle Mahane Yehuda + kurzem Fußweg; cross-links /de/best-hotels-jerusalem ✓, /de/1-day-jerusalem-itinerary ✓, /de/shabbat-guide ✓, /de/shopping-in-israel ✓ (DE-18); CTAs GYG Marktführung/Booking Jerusalem Hotels
- `via-dolorosa-guide.md`: DE "Via Dolorosa Jerusalem: Alle 14 Stationen Schritt für Schritt (2026)" — säkulares + pilgermäßiges Framing; historische Debatte ehrlich dargestellt (Stationen 1–9 muslimisches Viertel, 10–14 Grabeskirche; Lage nicht historisch gesichert — ehrliche Anmerkung + theologischer Wert für Pilgernde); praktische Logistik: Start: Löwentor / Stephen's Gate Seite der Omariyya-Schule; Freitags-Prozession 15:00 Uhr (Franziskanerbrüder; für Mitläufer geeignet; keine Pflicht); Stationsmarkierungen: römische Ziffern im Stein; Souk-Lärm Station 3–7 (normaler Alltag); Grabeskirche Stationen 10–14: Status Quo 6 Konfessionen; Einlass: immer kostenlos, kein Reservierungs-Ticket; fotografieren erlaubt außer in manchen Kapellen; Zugänglichkeit: Station 1-9 Kopfsteinpflaster (Rollstuhl schwierig); paired-naming via I18N-PLAN rules; cross-links /de/church-holy-sepulchre-guide ✓, /de/western-wall-guide ✓, /de/mount-of-olives-guide ✓, /de/1-day-jerusalem-itinerary ✓; CTAs GYG geführte Via-Dolorosa-Tour
- `solo-travel-israel.md`: DE "Israel Alleinreise: Tipps, Sicherheit und Reiserouten (2026)" — Abraham Hostels (Jerusalem/TLV/Haifa/Eilat; deutschsprachiges Personal; Sozialräume; Tourbuchung vor Ort); Sicherheit: Auswärtiges Amt Reisehinweise (auswaertiges-amt.de; keine eigene Risikobewertung); ÖPNV-Solo-Routen: TLV Stadtbahn + Rav-Kav-Karte; Jerusalem Straßenbahn; Haifa Karmelit; Interurban: Bus 480 TLV-Jerusalem; Schabbat-Planung: Freitagabend 2h früher am Bus-/Bahnhof; Frauen-Alleinreise: Alon Road + Hauptstraßen; Galilee Wanderungen: nie allein in Wadi-Abschnitte; Digital Nomad Spots: Tel Aviv Florentin + Rothschild; 7-Tages-Solo-Reiseroute (TLV 2N → Jerusalem 2N → Haifa 1N → Galiläa 2N oder Eilat statt Haifa); cross-links /de/is-israel-safe ✓, /de/backpacking-israel ✓, /de/ben-gurion-airport-guide ✓, /de/shabbat-guide ✓; CTAs Booking-Hostels/Abraham Hostels affiliate
- `western-wall-tunnels-guide.md`: DE "Klagemauer-Tunnel Jerusalem: Buchung, Ablauf und was zu erwarten ist (2026)" — paired-naming Klagemauer / Kotel / הַכּוֹתֶל הַמַּעֲרָבִי; Buchungsworkflow: israel-kotel.org.il (mindestens 30 Tage vorbuchen; englische/hebräische Benutzeroberfläche; Kreditkarte; Buchung per Datum + Zeit + Personenanzahl); Dauer: 75 Min. geführt; Länge: 488m unter dem muslimischen Viertel; Highlights: Warren's Gate (ältestes zugängliches Stadttor; 520 v.Chr.-Quader), Große Fundamentsteinreihe (2. größter Steinquader der Welt; 570t), Hasmonäischer Aquädukt (Wasserversorgung Tempelzeit), Grundstein / Foundation Stone (Heiligster Punkt direkt unterhalb des Felsendoms), Bogen Robinsons (Tempeleingang-Rest sichtbar); Zugang: Klagemauer-Plaza Nordseite; koschere Kleidung (Schultern + Knie bedeckt; Kippa für Männer); Rollstuhlzugang möglich (auf Anfrage buchen); Fotos ohne Blitz erlaubt; cross-links /de/western-wall-guide ✓, /de/church-holy-sepulchre-guide ✓, /de/via-dolorosa-guide ✓ (DE-18), /de/best-hotels-jerusalem ✓; CTAs GYG geführte Tunnel-Tour / offizielle israel-kotel.org.il Buchung

Cross-links to verify before BUILD:
- /de/mahane-yehuda-market-guide ✓ (DE-18, build same batch), /de/jaffa-travel-guide ✓, /de/dead-sea-guide ✓, /de/best-hotels-tel-aviv ✓: confirmed SHIPPED
- /de/best-hotels-jerusalem ✓, /de/1-day-jerusalem-itinerary ✓, /de/shabbat-guide ✓: confirmed SHIPPED
- /de/church-holy-sepulchre-guide ✓, /de/western-wall-guide ✓, /de/mount-of-olives-guide ✓: confirmed SHIPPED
- /de/is-israel-safe ✓, /de/backpacking-israel ✓, /de/ben-gurion-airport-guide ✓: confirmed SHIPPED
- /de/via-dolorosa-guide ✓ (DE-18, build same batch): intra-batch cross-link — ok to include, will exist after build

Quality: Standard Hochdeutsch; YAML double-quotes; /de/* cross-links only confirmed-existing (or intra-batch); no fabricated prices (Richtwertspannen); Via Dolorosa historical debate honest + respectful; Sicherheitshinweise = Auswärtiges Amt reference only; shopping no Druckverkauf for Stern Diamonds; Western Wall Tunnels paired-naming all 3 traditions; solo-travel no generalizations on safety.

---

## Updated status snapshot (iter945 RESEARCH 2026-08-02)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 398    | stable |
| fr     | 187    | 211 missing — Phase FR-20 SHIPPED iter948 da608dbd; **Phase FR-21 DEFINED iter950** |
| de     | 182    | 216 missing — Phase DE-19 SHIPPED iter956 93b5eeff; **Phase DE-20 DEFINED iter955** |
| es     | 165    | 233 missing — Phase ES-32 SHIPPED iter941 070daf35; **Phase ES-33 DEFINED iter945 (next ES BUILD)** |

**FR-19 (iter944) shipped:** FR guides now 182/398. FR leads DE (182 vs 172).
**DE-18 (iter940):** ready for next DE BUILD (5 guides: shopping-in-israel, mahane-yehuda-market-guide, via-dolorosa-guide, solo-travel-israel, western-wall-tunnels-guide).
**ES-32 meta overruns (iter944 review):** P2 BACKLOG item review-es32-meta-trim — 4/5 guides have desc/title overruns; fix before next ES-32 content iteration.
**iter948 BUILD:** FR-20 SHIPPED da608dbd. israel-honeymoon + israel-hidden-gems + israel-hebrew-phrases + hayarkon-park-tel-aviv + getyourguide-vs-viator-israel. FR guides: 182→187/398. 1889/1889 e2e pass.

**iter945 research (189th pass):** FR-20 + ES-33 defined. Key gap discovered: israel-honeymoon ENTIRELY MISSING from site — touristisrael.com has 3 dedicated pages; P2 EN guide queued + i18n in FR-20/ES-33.

### Phase FR-20 (182 → 187/398) — SHIPPED iter948 da608dbd 2026-08-02

Guides: `israel-honeymoon.md`, `israel-hidden-gems.md`, `israel-hebrew-phrases.md`, `hayarkon-park-tel-aviv.md`, `getyourguide-vs-viator-israel.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-02 iter945).

Research ranking (by FR search volume + editorial gap; 189th research pass):
1. `israel-honeymoon.md` — havas-voyages.fr targets "lune de miel Israël" (package tours €2,900+); zero FR editorial; high commercial intent
2. `getyourguide-vs-viator-israel.md` — booking comparison, commercial intent; French travelers book via both platforms; zero FR editorial comparison
3. `israel-hidden-gems.md` — French cultural travelers love "off-the-beaten-path" content; wewillnomad + Tripadvisor rank in English; zero FR editorial
4. `israel-hebrew-phrases.md` — practical pre-trip guide; unique to our site; high pre-departure search intent from French tourists
5. `hayarkon-park-tel-aviv.md` — Tel Aviv's main park; French city-break visitors need practical day-out guide; pairs /fr/1-day-tel-aviv-itinerary ✓

Content notes per guide:
- `israel-honeymoon.md`: FR "Voyage de Noces en Israël : Guide Complet pour les Couples (2026)" — Mer Morte flottaison (expérience unique pour couples; minéraux bienfaisants; appliquer crème solaire avant); Makhtesh Ramon (cratère "en forme de cœur" — note honnête: la forme dépend de la perspective aérienne; glamping Beresheet Hotel or Succah in the Desert ₪ ranges; ciel étoilé exceptionnel); Route du Vin Galilée (Golan Heights Winery + Pelter + Dalton; dégustation privée; paysages); Tel Aviv romantique (hôtel Norman rooftop; Jaffa port coucher de soleil; restaurant port Jaffa); Mer de Galilée (croisière coucher de soleil; Capharnaüm spirituel); pas de prix fabriqués; 3 CTAs Booking/GYG couples tours; cross-links /fr/dead-sea-guide ✓, /fr/galilee-wine-trail ✓, /fr/jaffa-travel-guide ✓
- `getyourguide-vs-viator-israel.md`: FR "GetYourGuide vs Viator en Israël : Lequel Choisir (2026)" — tableau comparatif (interface, politiques d'annulation, prix, types de tours, service client); GYG: tours locaux + visites guidées certifiées; Viator: plus de tours combinés + transfers; pour activités spécifiques (Masada+Mer Morte, Galilée chrétienne, Jaffa food tour): recommandation par catégorie; note honnête: prix similaires sur les deux plateformes, comparer avant de réserver; politiques COVID + annulation flexibles; 3 CTAs GYG/Viator; cross-links /fr/israel-by-month ✓, /fr/best-time-to-visit-israel ✓
- `israel-hidden-gems.md`: FR "Joyaux Cachés d'Israël : 10 Lieux Méconnus (2026)" — Ayalon Institute Rehovot (usine secrète de balles 1948; visite guidée obligatoire); Musée Ilana Goor Jaffa (maison d'artiste 18ème s. ottoman; vue port; collection sculpture unique); Musées Ralli Caesarée (musées privés dans parc archéologique; sculpture hispano-américaine inattendue); Synagogues cachées Vieille Ville (ruelles quartier arménien + quartier juif; shtiebels 17ème-18ème s.); Grottes de Beit Guvrin à l'aube (lumière dans les cloches de craie); Jardins Bahá'ís vue nocturne (Haïfa; jardins illuminés le soir); Yam Kinneret côte est (plages sauvages kibbutz vs côte ouest touristique); 3 CTAs GYG tours culturels; cross-links /fr/israel-by-month ✓, /fr/1-day-tel-aviv-itinerary ✓
- `israel-hebrew-phrases.md`: FR "Hébreu pour Voyageurs : Expressions Essentielles en Israël (2026)" — Phonétique approximative pour francophones; catégories: salutations (Shalom ✓; Boker Tov ✓; Ma Nishma?); restaurants + kashrut (Kosher = כָּשֵׁר; Chalav Yisrael; Glatt; comment demander menu anglais); transports (Eifo ha-takhanah? = Où est la gare?; Eize autos nosaat le...?); urgences (Hatzalah = ambulance; Mishmar = police); chiffres hébreu + alphabet phonétique; note culturelle: anglais très répandu; hébreu quelques mots = geste de respect apprécié; no fabricated phonetic errors; 2 CTAs GYG tour linguistique/Booking Israel hotels
- `hayarkon-park-tel-aviv.md`: FR "Parc Hayarkon Tel Aviv : Guide Pratique (2026)" — plus grand parc urbain de Tel Aviv (3,5 km²); activités: location kayak + pédalos sur la rivière Yarkon (₪ ranges); amphithéâtre Yarkon (concerts estivaux; Jay-Z, Radiohead y ont joué; capacité 50 000); Jardins Tropicaux (serres gratuites; cactarium + jardin japonais); piste cyclable 7km (location vélo à l'entrée); Ganei Yehoshua (mini-zoo gratuit côté nord); conseils: matin tôt pour parkings; vendredi = foules familles israéliennes; Shabbat = parc ouvert; pique-nique autorisé; 3 CTAs GYG Tel Aviv tours/Booking TLV hotels; cross-links /fr/1-day-tel-aviv-itinerary ✓, /fr/jaffa-travel-guide ✓

Cross-links to verify before BUILD:
- /fr/dead-sea-guide ✓, /fr/galilee-wine-trail ✓, /fr/jaffa-travel-guide ✓: confirmed SHIPPED
- /fr/israel-by-month ✓, /fr/best-time-to-visit-israel ✓, /fr/1-day-tel-aviv-itinerary ✓: confirmed SHIPPED
- /fr/negev-desert-guide: MISSING → use EN fallback /negev-desert-guide
- /fr/tel-aviv-beach-guide: MISSING → use EN fallback /tel-aviv-beach-guide
- /fr/getyourguide-vs-viator-israel: building in same batch (intra-batch cross-link — ok)
- /fr/hayarkon-park-tel-aviv: building in same batch (intra-batch cross-link — ok)

Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed-existing FR pages (EN fallbacks where FR missing); no fabricated prices (₪ ranges only); honeymoon — no fabricated ratings; Makhtesh Ramon "heart shape" honesty note (perspective-dependent); Ilana Goor Museum confirm opening days before shipping; Hayarkon concert capacities approximate.

### Phase ES-33 (165 → 170/398) — DEFINED iter945 RESEARCH 2026-08-02

Guides: `israel-honeymoon.md`, `israel-hidden-gems.md`, `israel-hebrew-phrases.md`, `israel-in-autumn.md`, `israel-in-winter.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-02 iter945).

Research ranking (by ES search volume + affiliate value + editorial gap):
1. `israel-honeymoon.md` — "luna de miel en Israel" / "viaje de novios Israel" = high LATAM commercial intent; no ES editorial competitor found; LATAM couples market strong
2. `israel-in-winter.md` — "Israel en invierno" = Eilat winter sun peak season (LATAM seeking warmth Dec-Feb); Condor/TUI fly direct in winter
3. `israel-in-autumn.md` — "Israel en otoño" = post-Sukkot calm period; Hula Valley cranes Oct-Jan; pairs /es/israel-in-summer (ES-32)
4. `israel-hidden-gems.md` — "secretos de Israel" / "lugares poco conocidos Israel" = aspirational editorial; aggregation of existing content
5. `israel-hebrew-phrases.md` — "frases básicas en hebreo" = pre-trip practical; unique to our editorial model; high engagement

Content notes per guide:
- `israel-honeymoon.md`: ES "Luna de Miel en Israel: Guía Completa para Parejas (2026)" — Mar Muerto flotación (experiencia única; minerales; aplicar bloqueador solar antes); Makhtesh Ramon (cráter "en forma de corazón" — nota honesta: forma visible desde perspectiva aérea; glamping Beresheet / Succah in the Desert ₪ rangos); Ruta del Vino Galilea (bodegas Golan + Galil Mountain; cata privada; paisajes); Tel Aviv romántico (Hotel Norman azotea; restaurantes puerto Jaffa puesta de sol); Mar de Galilea (crucero atardecer; espiritualidad cristiana); no precios fabricados; 3 CTAs Booking/GYG tours parejas; cross-links /es/dead-sea-guide ✓, /es/galilee-wine-trail ✓, /es/eilat-travel-guide ✓
- `israel-in-winter.md`: ES "Israel en Invierno (Diciembre-Febrero): Lo que Necesitas Saber (2026)" — temporada baja en TLV + Jerusalén (→ mejores precios hoteles 30-40% menos); Eilat temporada ALTA (Condor + TUI invierno directo; temp. 21-25°C día); Jerusalem lluvia + nieve ocasional (ropa abrigada esencial; Cisjordania/Belén accessible en invierno = menos multitudes); Mar Muerto invierno = IDEAL (nada de calor extremo; flotación confortable; Ein Gedi senderismo agradable); fiestas invernales: Hanukkah + Navidad Nazaret + Belén (Checkpoint 300 más fluido diciembre); vuelos: tarifas más baratas enero-febrero (evitar Navidad y Año Nuevo); 3 CTAs Booking/Skyscanner/GYG winter tours; cross-links /es/eilat-travel-guide ✓, /es/dead-sea-guide ✓, /es/is-israel-safe ✓, /es/israel-cost-budget ✓, /es/israel-by-month ✓
- `israel-in-autumn.md`: ES "Israel en Otoño (Octubre-Noviembre): Lo que Necesitas Saber (2026)" — Clima: 18-26°C costa; 15-24°C Jerusalén; ideal senderismo; octubre = mejor mes del año post-verano; Hula Valley: grullas (Agamon HaHula; hasta 500.000 grullas; oct-ene; visita en barco ₪ rango); Sukkot 2026: 26 sep-3 oct → hoteles llenos + ambiente festivo judío; Festival Tamar Mar Muerto (oct; conciertos clásicos + jazz a -430m); Galilea del Norte: bosques de pino otoñales; Mar Muerto post-Sukkot: semana más tranquila del año; reservas: octubre = mejor relación calidad-precio del año; cross-links /es/israel-in-summer ✓, /es/dead-sea-guide ✓, /es/best-time-to-visit-israel ✓, /es/israel-by-month ✓; CTAs Booking/GYG nature tours
- `israel-hidden-gems.md`: ES "Los 10 Mejores Secretos de Israel: Lugares Poco Conocidos (2026)" — Instituto Ayalon Rehovot (fábrica secreta de balas 1948; visita guiada obligatoria); Museo Ilana Goor Jaffa (mansión otomana s. XVIII; colección escultura única; vistas al puerto); Museos Ralli Cesarea (museos privados de escultura hispanoamericana dentro del parque arqueológico — inesperado + gratuito); sinagogas escondidas Vieja Ciudad Jerusalén (callejuelas barrio armenio + judío; shtiebels s. XVII-XVIII); Grutas de Bet Guvrin al alba (luz matutina en las campanas de tiza; UNESCO); playas salvajes Kinneret costa este (frente a playa oeste turística); 3 CTAs GYG tours culturales; cross-links /es/israel-by-month ✓, /es/1-day-tel-aviv-itinerary (confirm exists before use; use EN fallback if not)
- `israel-hebrew-phrases.md`: ES "Hebreo para Viajeros: Frases Esenciales en Israel (2026)" — Fonética aproximada para hispanohablantes; categorías: saludos (Shalom ✓; Boker Tov = buenos días; Ma Shlomcha/Shlomech = ¿cómo estás?); restaurantes (Kasher = kosher; ¿Yesh ta'arucha be-anglit? = ¿hay menú en inglés?); transporte (Eifoh ha-takhanah? = ¿dónde está la estación?); emergencias (Hatzalah = ambulancia; Mishmar = policía); números + alfabet fonético; nota cultural: inglés muy extendido; pocas palabras en hebreo = gesto de respeto apreciado; no errores fonéticos fabricados; 2 CTAs GYG/Booking Israel hotels; cross-links /es/first-time-in-israel ✓, /es/transportation ✓

Cross-links to verify before BUILD:
- /es/dead-sea-guide ✓, /es/galilee-wine-trail ✓, /es/eilat-travel-guide ✓: confirmed SHIPPED
- /es/israel-in-summer ✓, /es/best-time-to-visit-israel ✓, /es/israel-by-month ✓: confirmed SHIPPED
- /es/is-israel-safe ✓, /es/israel-cost-budget ✓, /es/first-time-in-israel ✓: confirmed SHIPPED
- /es/1-day-tel-aviv-itinerary: verify before using /es/ prefix
- /es/israel-in-spring: MISSING → use EN fallback /israel-in-spring
- /es/transportation: verify; likely exists as it was one of the first ES guides

Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/* prefix only for confirmed-existing ES pages; no fabricated prices (rangos only); Makhtesh Ramon "heart shape" honesty note; Sukkot dates 2026 verified (26 sep-3 oct); crane count hedged ("hasta 500.000"); Dead Sea winter framing honest (not "ideal all day" — UV lower but still apply sunscreen); Checkpoint 300 + Bethlehem West Bank neutral framing.

### Phase FR-21 (187 → 192/398) — SHIPPED iter952 BUILD b5dfc0be 2026-08-02

Guides: `yad-vashem-visitor-guide.md`, `western-wall-guide.md`, `israel-road-trip.md`, `mitzpe-ramon-guide.md`, `israel-travel-tips.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-02 iter950). SHIPPED 2026-08-02T21:00Z commit b5dfc0be. 1909/1909 e2e pass. Build 1313 pages. Note: western-wall-guide desc=162 chars (2 over 160) → flag iter953 REVIEW.

Research ranking (by FR search volume + affiliate value + editorial gap):
1. `yad-vashem-visitor-guide.md` — France has Europe's largest Jewish diaspora (~500–600K); "Yad Vashem visite" is a substantial FR search; critical France–Israel cultural connection; no FR editorial competitor found; pre-registration caveat essential
2. `western-wall-guide.md` — "Mur des Lamentations" = most recognized French-language Israel term; French pilgrimage + Jewish diaspora market; pairs /fr/western-wall-tunnels-guide ✓ (building companion)
3. `israel-road-trip.md` — Road trip format extremely popular with French travelers; differentiated "Route 90 de Dan à Eilat" angle vs. saturated generic 10-day circuits; car rental affiliate (/fr/car-rental-israel ✓, /fr/driving-in-israel ✓)
4. `mitzpe-ramon-guide.md` — "Makhtesh Ramon / cratère Ramon" popular with French eco-travelers; Beresheet + Succah affiliate; pairs /fr/3-days-in-negev ✓
5. `israel-travel-tips.md` — High pre-trip informational intent; French travelers research thoroughly; SIM cards, tipping, Shabbat logistics, dress codes, security; pairs /fr/israel-by-month ✓, /fr/best-time-to-visit-israel ✓

Content notes per guide:
- `yad-vashem-visitor-guide.md`: FR "Yad Vashem : Guide de Visite Complet (2026)" — Hall of Names + Eternal Flame + Hall of Remembrance; children's memorial; Righteous Among Nations Garden; guided tour vs. self-guided; pre-registration required (yadvashem.org/fr); audioguide ₪30; Group visits: advance booking recommended; Dress code: no specific requirements but respectful; Links: /fr/jerusalem-old-city ✓ (if exists), /fr/western-wall-guide (building in batch); no fabricated tour prices; official FR website (yadvashem.org/fr) exists
- `western-wall-guide.md`: FR "Le Mur des Lamentations (Kotel) : Guide Complet (2026)" — Mur des Lamentations / ha-Kotel ha-Ma'arawi / הַכּוֹתֶל הַמַּעֲרָבִי (paired-naming essential); plaza logistics + gender-divided prayer sections + Ezrat Yisrael egalitarian section (Robinson's Arch context); visiting hours, dress code, prayer note customs; Western Wall Tunnels → link /fr/western-wall-tunnels-guide ✓; Jewish calendar context (Shabbat, Yom Kippur atmosphere); no fabricated prices; respect framing (active religious site)
- `israel-road-trip.md`: FR "Road Trip en Israël : Route 90 de Dan à Eilat et Circuits (2026)" — Route 90 differentiator (north-south spine, 500km from Lebanese border to Red Sea: Tel Dan→Sea of Galilee→Bet She'an→Jericho junction→Dead Sea→Arava→Eilat); also circular 10-day circuit option; car rental pricing: ₪ ranges only (do NOT use specific daily rates — rates risen with post-conflict tourism rebound); best season: Oct–Apr; /fr/car-rental-israel ✓, /fr/driving-in-israel ✓; GYG scenic stops CTAs; no fabricated petrol/toll prices; Shabbat driving note (fuel stations close)
- `mitzpe-ramon-guide.md`: FR "Mitzpe Ramon et Makhtesh Ramon : Guide Pratique (2026)" — géologie honnête (érosion, pas météorite ni volcan); vues panoramiques belvédère; descente dans le makhtesh (sentiers Wadi Ardon + Nahal Ga'ash); glamping (Beresheet Hotel ₪ gammes; Succah in the Desert ₪ gammes); ciel étoilé Néguev (pollution lumineuse quasi-nulle; astrophotographie); faune (chèvres ibex, ânes sauvages); craft brewery Ramon en ville; pairs /fr/3-days-in-negev ✓; Booking.com CTAs; no fabricated prices
- `israel-travel-tips.md`: FR "Conseils Pratiques pour Voyager en Israël (2026)" — carte SIM (cellcom, partner; eSIM options; acheter à l'aéroport TLV); pourboires (restaurants 10-12%, taxis arrondir, hôtels facultatif); Shabbat logistique (vendredi coucher soleil – samedi nuit; transports en commun arrêtés; épiceries/restaurants casher fermés; hôtels disponibles; pré-réservation recommandée); code vestimentaire lieux saints (épaules/genoux couverts); sécurité aéroport Ben Gourion (interrogatoire routine: répondre calmement + honnêtement, 1–3h si passeport avec tampons arabes); argent: shekels NIS (bureaux de change TLV/Jérusalem; cartes banque acceptées partout); no fabricated safety claims; pairs /fr/israel-by-month ✓, /fr/best-time-to-visit-israel ✓, /fr/first-time-in-israel ✓ (if exists in FR)

Cross-links to verify before BUILD:
- /fr/western-wall-tunnels-guide ✓ (confirmed existing)
- /fr/3-days-in-negev ✓ (confirmed)
- /fr/car-rental-israel ✓ (confirmed)
- /fr/driving-in-israel ✓ (confirmed)
- /fr/israel-by-month ✓ (confirmed)
- /fr/best-time-to-visit-israel ✓ (confirmed)
- /fr/dead-sea-guide ✓ (confirmed)
- /fr/negev-desert-guide: MISSING → use EN fallback /negev-desert-guide
- /fr/first-time-in-israel: CHECK before using /fr/ prefix (may not exist in FR — use EN fallback if absent)
- /fr/jerusalem-old-city: CHECK before using (use EN fallback if absent)

Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed-existing FR pages (EN fallbacks where FR missing); no fabricated prices (₪ ranges only); paired-naming on contested sites (Western Wall); Yad Vashem pre-registration requirement honest caveat; road trip car rental ranges only (do not cite specific daily NIS rates); Shabbat logistics accurate + non-alarmist.

### Phase DE-19 (177 → 182/398) — SHIPPED iter956 93b5eeff 2026-08-03

Guides: `israel-honeymoon.md`, `israel-hidden-gems.md`, `israel-hebrew-phrases.md`, `hayarkon-park-tel-aviv.md`, `getyourguide-vs-viator-israel.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-08-02 iter950).

Research ranking (by DE/DACH search volume + affiliate value + zero-competition gaps):
1. `israel-honeymoon.md` — zero DACH editorial competitor confirmed (only touristisrael.com EN-only pages); "Flitterwochen Israel / Hochzeitsreise Israel" = high DACH commercial intent; DACH couples choose Dead Sea spa + Negev glamping + Galilee wine trail; Booking.com + GYG couples tours = strong affiliate
2. `getyourguide-vs-viator-israel.md` — completely uncontested in German; GetYourGuide Berlin-founded = natural DACH default brand; DACH travelers comparison-minded (Vergleich culture); strong affiliate conversion
3. `israel-hidden-gems.md` — only thin personal blogs (travelontoast.de, reisefroh.de, meikereist.de, konpasu.de); differentiated with Northern Israel/Golan angle: Meshushim hexagonal basalt pools + Hula Valley crane migration + Ein Keshatot Golan synagogue vs. standard gems
4. `israel-hebrew-phrases.md` — practical pre-trip; phonetics adapted for German speakers (distinct from EN/FR versions); unique editorial value; high pre-departure engagement
5. `hayarkon-park-tel-aviv.md` — main TLV urban park for DACH city-break visitors; Yarkon-Amphitheater (50.000 Plätze; Jay-Z, Radiohead gespielt); Kayak/Tretboot; Tropische Gärten; Minizoo (Ganei Yehoshua); pairs /de/1-day-tel-aviv-itinerary ✓

Content notes per guide:
- `israel-honeymoon.md`: DE "Flitterwochen in Israel : Romantische Reise als Paar (2026)" — Totes Meer Schwimmen (einzigartiges Auftriebserlebnis; Mineralien; Sonnencreme vor dem Bad auftragen); Makhtesh Ramon ("herzförmig" — ehrliche Anmerkung: Form aus Vogelperspektive sichtbar; Glamping Beresheet Hotel oder Succah in the Desert ₪ Preisspannen; kaum Lichtverschmutzung = Sternenhimmel); Galilee Weinroute (Golan Heights Winery + Galil Mountain + Pelter; Privatverkostung; Seelandschaft); Tel Aviv romantisch (Hotel Norman Dachterrasse; Jaffa-Hafen Sonnenuntergang; Fischrestaurants); kein Preis erfunden; 3 CTAs Booking/GYG Paarsausflüge; cross-links /de/dead-sea-guide ✓, /de/galilee-wine-trail ✓, /de/3-days-in-negev ✓
- `israel-hidden-gems.md`: DE "10 Israel Geheimtipps : Verborgene Schätze (2026)" — with Northern Israel/Golan emphasis to differentiate from standard EN list: Meshushim-Bach (Sechseck-Basaltbecken im Yehudia-Naturreservat, Golan; Wanderzugang über Yehudiya; 45°C Wasserfall im Sommer → Frühling/Herbst empfohlen); Hulavalley Kranichzug (Agamon HaHula; bis 500.000 Kraniche okt–jan; Vogelboot ₪ Preisspannen); Ein Keshatot (6. Jh. Synagoge in Golan-Weinbergen; Mosaik-Inschrift; kaum bekannt, auch DACH-Reiseführer vergessen es); Ayalon-Institut Rehovot (geheime Munitionsfabrik 1945-48; Pflichtführung); Ilana Goor Museum Jaffa (Künstlerhaus 18. Jh. Osmanisches Gebäude); Ralli-Museen Caesarea (private hispanisch-amerikanische Skulpturmuseen im Archäologiepark); cross-links /de/beit-guvrin-caves-guide ✓, /de/caesarea-guide ✓, /de/golan-heights-guide ✓
- `israel-hebrew-phrases.md`: DE "Hebräisch für Reisende : Wichtige Ausdrücke in Israel (2026)" — Phonetik für Deutschsprachige (deutsche Vokalaussprache angepasst: Chet=ch wie in „Bach"; Ayin=sanfter Kehlverschluss); Kategorien: Begrüßungen (Shalom, Boker Tov, Erev Tov, Ma Shlomcha/Shlomech, Lehitraot); Restaurant/Kashrut (Koscher=כָּשֵׁר; Yesh ta'arucha be-anglit?=Gibt es eine englische Speisekarte?); Verkehr (Eifo ha-takhanah?=Wo ist der Bahnhof?); Notfall (Hatzalah=Rettungsdienst; Mishmar=Polizei); Zahlen 1–10; kulturelle Note: Englisch sehr verbreitet; wenige hebräische Wörter = geschätzter Respekt; keine erfundenen phonetischen Fehler; pairs /de/first-time-in-israel ✓, /de/transportation ✓
- `hayarkon-park-tel-aviv.md`: DE "Hayarkon Park Tel Aviv : Freizeitführer (2026)" — Tels Avivs größter Stadtpark (3,5 km²); Aktivitäten: Kajak/Tretboot auf dem Yarkon-Fluss (₪ Preisspannen; Bootsverleih am Eingang); Yarkon-Amphitheater (50.000 Plätze; Sommerkonzerte; Jay-Z, Radiohead haben hier gespielt); Tropische Gärten (Gewächshäuser kostenlos; Kaktearium + Japanischer Garten); Fahrradweg 7 km (Fahrradverleih am Eingang); Ganei Yehoshua (kleiner Zoo Nordseite gratis); Tipps: frühmorgens für Parkplatz; Freitag = Israelische Familien Picknick-Tag; Shabbat Park offen; 3 CTAs GYG Tel Aviv Touren/Booking TLV Hotels; pairs /de/1-day-tel-aviv-itinerary ✓, /de/jaffa-travel-guide ✓ (if exists in DE; use EN fallback if absent)
- `getyourguide-vs-viator-israel.md`: DE "GetYourGuide vs. Viator für Israel-Ausflüge (2026)" — GetYourGuide (Berlin-gegründet 2009; Standard in DACH-Markt; kostenlose Stornierung i.d.R. bis 24h; Israel-spezifische Touren gut vertreten); Viator (TripAdvisor-Gruppe; stärker kombinierte Touren + Transfers; globaler, weniger lokale DACH-Vertrauensbasis); Vergleichstabelle 9 Kriterien (Interface, Stornobedingungen, Preis, Tourenauswahl Israel, Kundenservice, App, Gutscheine/Promo, Lokale Guides, Barrierefreiheit); WICHTIG: keine genauen Provisionssätze (ändern sich häufig; nicht fabrizieren); für typische Israel-Ausflüge nach Kategorie empfehlen (Masada+Totes Meer: GYG; Galilee-Kreuzfahrt: beide gut; Jerusalem Rundgang: GYG etwas mehr lokale Guides); 3 CTAs GYG/Viator; cross-links /de/best-tours-in-israel ✓, /de/golan-heights-tours-compared ✓

Cross-links to verify before BUILD:
- /de/dead-sea-guide ✓, /de/galilee-wine-trail ✓, /de/3-days-in-negev ✓: confirmed existing
- /de/beit-guvrin-caves-guide ✓, /de/caesarea-guide ✓, /de/golan-heights-guide ✓: confirmed existing
- /de/first-time-in-israel ✓, /de/transportation ✓: confirmed existing
- /de/1-day-tel-aviv-itinerary ✓: confirmed existing
- /de/best-tours-in-israel ✓, /de/golan-heights-tours-compared ✓: confirmed existing
- /de/jaffa-travel-guide: CHECK — if not in DE, use EN fallback /jaffa-travel-guide
- /de/israel-by-month: CHECK — confirmed in DE (de-phase-17 shipped it); use /de/israel-by-month ✓

Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed-existing DE pages (EN fallbacks where DE missing); no fabricated prices (₪ Preisspannen only); honeymoon — Makhtesh Ramon "herzförmig" honesty note (Vogelperspektive); hidden gems — Meshushim summer heat warning (Frühjahr/Herbst besser); GYG vs Viator: KEINE genauen Provisionssätze — Plattformmerkmale beschreiben; Hebräisch-Phonetik: nur bekannte/verifizierbare Ausspracheregeln, keine erfundenen Wörter.

---

## Phase FR-23 (197 → 202/398) — SHIPPED iter962 66c00dc5

All 5 confirmed MISSING from FR via `comm -23` (2026-08-03 iter960). Actual guides shipped: anu-museum-guide, ammunition-hill-jerusalem, israel-in-spring, israel-in-summer, israel-in-winter (design-museum-holon and israel-in-autumn were already in FR from FR-22/FR-19; replaced with israel-in-summer and israel-in-winter).

Guides: `anu-museum-guide.md`, `ammunition-hill-jerusalem.md`, `design-museum-holon.md`, `israel-in-summer.md`, `israel-in-spring.md`

### Content sketches

- `anu-museum-guide.md`: FR "ANU – Le Musée du Peuple Juif : Guide du Visiteur (2026)" — campus Université Tel Aviv (Ramat Aviv); plus grand musée juif du monde (rouvert 2021 après rénovation décennale); collections permanentes: Histoire de la Haskala, immigration vers Eretz Israël, Shoah et renaissance, culture séfarade/ashkénaze; Génération (interactive: trouvez vos origines familiales); Salle des noms reliant aux 4,8M victimes de la Shoah sur Yad Vashem; restaurants casher sur campus; horaires (fermé dimanche; 10h–18h sam); ETA-IL requis pour visiteurs francophones; 3 CTAs: GYG visite guidée Yad Vashem + ANU / Booking.com hôtels TLV / Abraham Tours programme patrimonial; cross-links /fr/tel-aviv-museums ✓, /fr/yad-vashem-visitor-guide ✓, /fr/jewish-heritage-israel ✓; note honnêteté: collection en évolution permanente → "vérifiez programme actuel sur anumuseum.org.il"

- `ammunition-hill-jerusalem.md`: FR "Givat HaTachmoshet – Colline des Munitions : Guide du Mémorial (2026)" — mémorial de la Bataille de Ammunition Hill (5–7 juin 1967, Guerre des Six Jours); 71 soldats israéliens tués pour reprendre le poste de la Légion jordanienne; site ouvert aux visiteurs: tranchées historiques + 3 tanks d'époque + maquette Jérusalem 1967 + musée intérieur (film documentaire 22 min, EN/HE); vues 360° sur Jérusalem depuis le sommet; visites de nuit disponibles (réserver à l'avance); entrée aux tranchées gratuite / film = petit supplément; honnêteté: framing mémoriel sobre, pas de glorification militaire; perspective de rapprochement: le mémorial commémore à la fois la bravoure et le deuil; cross-links /fr/1-day-jerusalem-itinerary ✓, /fr/western-wall-guide ✓, /fr/yad-vashem-visitor-guide ✓; 3 CTAs: GYG Jerusalem tours / Abraham Tours / Booking.com Jerusalem hotels

- `design-museum-holon.md`: FR "Musée du Design Holon (Ron Arad) : Guide Pratique (2026)" — seul musée de design contemporain au Proche-Orient; Ron Arad (architecte israélo-britannique); 5 galeries à cloisons mobiles ondulantes en acier Corten; expositions temporaires 3–4×/an (design industriel, mode, typographie, UX); 10 min en bus depuis Azrieli (Dan 1 ou Sherut); non dimanche (ouvert 10h–18h sauf jeudi jusqu'à 21h); partenariats internationaux (MoMA, V&A, Pompidou); café Design Shop; entrée ≈ ₪ (vérifier tarifs actuels); HONESTY: expositions changent tous les trimestres — ne pas fabriquer de titres d'expositions précises; cross-links /fr/1-day-tel-aviv-itinerary ✓, /fr/day-trips-from-tel-aviv ✓, /fr/tel-aviv-museums ✓; 3 CTAs: GYG Tel Aviv day tour / Viator museums / Booking.com TLV

- `israel-in-summer.md`: FR "Israël en Été (Juillet–Août) : Guide Pratique (2026)" — saison haute touristique; Juillet = mois le plus chaud (34–38°C en plaine; 22–26°C à Tibériade le soir; 28–32°C côte méditerranéenne); Dead Sea: visite matinale UNIQUEMENT (6h–10h; sirocco (sharav) peut dépasser 45°C à 14h); Galilée: Golan et Mont Carmel restent 5–8°C plus frais = ressourcement altitude; TLV: plages (Hilton/Frishman/Gordon/Alma) parfaites 8h–12h, sieste 13h–17h, retour plage 18h–21h; Caesarea: festivals d'été au théâtre romain (Metallica a joué 2024; BB King jadis); Kinneret: ski nautique, kitesurf, Kineret Yam plage gratuite; réservations à faire 2–3 mois à l'avance (hôtels +30–40% vs basse saison); Booking.com affiliate été; cross-links /fr/best-beaches-israel ✓, /fr/dead-sea-guide ✓, /fr/3-days-in-galilee ✓, /fr/eilat-beach-guide ✓; FAQs (Trop chaud en août? Faut-il la clim? Plages bondées le samedi?); HONESTY: températures sont des plages historiques, vérifier prévisions avant départ

- `israel-in-spring.md`: FR "Israël au Printemps (Mars–Mai) : Saison Idéale (2026)" — meilleur compromis: 18–24°C, peu d'humidité, touristes encore peu nombreux sauf Pâques/Pessah; Wildflowers: anemones rouges (kalaniyot) du Néguev (pic fév–mars); cyclamens et iris sauvages Galilée (mars–avril); Pessah 2027 (22–29 avril): marchés fermés premier et dernier soir; restaurants casher "pessahdiques" servent pains azymes = contexte authentique à expérimenter; Pâques chrétienne 2027: catholique 20 avril, orthodoxe 12 avril; Via Dolorosa procession franciscaine (vendredi 15h); Feu Sacré (veille Pâques orthodoxe); basse saison tarifaire en mars; cross-links /fr/easter-in-jerusalem ✓, /fr/1-day-jerusalem-itinerary ✓, /fr/best-time-to-visit-israel ✓; Booking.com spring hotel affiliate; HONESTY: dates religieuses 2027 confirmées; Pessah = incertitude certains restaurants → "vérifiez auprès de l'établissement"

Cross-links to verify before BUILD:
- /fr/tel-aviv-museums ✓, /fr/yad-vashem-visitor-guide ✓, /fr/jewish-heritage-israel ✓: confirmed existing
- /fr/1-day-jerusalem-itinerary ✓, /fr/western-wall-guide ✓: confirmed existing
- /fr/1-day-tel-aviv-itinerary ✓, /fr/day-trips-from-tel-aviv ✓: confirmed existing
- /fr/best-beaches-israel ✓, /fr/dead-sea-guide ✓, /fr/3-days-in-galilee ✓, /fr/eilat-beach-guide ✓: confirmed existing
- /fr/easter-in-jerusalem ✓, /fr/best-time-to-visit-israel ✓: confirmed existing

Quality: Metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed-existing FR pages; no fabricated prices (₪ plages seulement); ammunition-hill = framing mémoriel sobre; design-museum = ne pas fabriquer titres d'expositions; seasonal = fourchettes historiques de températures uniquement.

---

## Phase ES-35 (175 → 180/398) — DEFINED iter960 RESEARCH

All 5 confirmed MISSING from ES via `comm -23` (2026-08-03 iter960).

Guides: `israel-film-tv-tourism.md`, `anu-museum-guide.md`, `ammunition-hill-jerusalem.md`, `israel-in-spring.md`, `design-museum-holon.md`

### Content sketches

- `israel-film-tv-tourism.md`: ES "Turismo de Cine y TV en Israel : Locaciones de Fauda, Shtisel y Teherán (2026)" — Fauda (Netflix LATAM; "Al-Hayat" en algunos mercados): Kfar Kasim Temporada 1, Ciudad Vieja de Jaffa T4, cuartel Shayetet 13 Atlit; Shtisel (Netflix): calles de Mea She'arim (arquitectura ultraortodoxa; LGBTQ cuidado al visitar barrio); Teherán: Jaffa puerto y Florentin; Fauda T1 Aldea druza Daliyat el-Carmel (combina con /es/druze-villages-carmel ✓); No fabricar anécdotas de rodaje; fuentes: producción oficial + Israel Film Commission; visita de estado Milei a Israel 2026 elevó perfil de Israel en Argentina → mayor interés LATAM en destino; 3 CTAs: GYG recorrido Fauda Jaffa / Abraham Tours Jerusalén / Booking.com TLV hoteles; cross-links /es/jaffa-travel-guide ✓, /es/1-day-jerusalem-itinerary ✓, /es/best-tours-in-israel ✓; FAQs (¿Se puede visitar Mea She'arim? ¿Hay tours de Fauda? ¿Están abiertas las locaciones?)

- `anu-museum-guide.md`: ES "ANU – Museo del Pueblo Judío Tel Aviv : Guía del Visitante (2026)" — Campus Universidad de Tel Aviv (Ramat Aviv); mayor museo judío del mundo (reabierto 2021); colecciones: Historia diáspora sefardí/asquenazí; Haskala; Generación (genealogía interactiva); corredor Shoá y renacimiento; Argentina: 180K+ judíos = 3ª comunidad más grande LATAM; Brasil/México comunidades activas; ETA-IL requisito; horarios (cerrado domingo); 3 CTAs: GYG museo + judería / Booking.com TLV / Abraham Tours; cross-links /es/tel-aviv-museums ✓, /es/yad-vashem-visitor-guide ✓, /es/jewish-heritage-israel ✓; nota honestidad: "verifique programa actual en anumuseum.org.il"

- `ammunition-hill-jerusalem.md`: ES "Givat HaTachmoshet – Colina de las Municiones : Guía del Memorial (2026)" — memorial de la Batalla de Givat HaTachmoshet (5–7 junio 1967, Guerra de los Seis Días); 71 soldados israelíes murieron tomando el puesto jordano; acceso libre a trincheras / costo pequeño para película 22 min; vistas 360° sobre Jerusalén; tours nocturnos (reserva previa); framing: memorial de combate y duelo; no glorificación; cross-links /es/1-day-jerusalem-itinerary ✓, /es/western-wall-guide ✓, /es/yad-vashem-visitor-guide ✓; 3 CTAs GYG / Abraham / Booking Jerusalem

- `israel-in-spring.md`: ES "Israel en Primavera (Marzo–Mayo) : Guía de Temporada (2026)" — mejor relación clima/precio/aglomeración: 18–24°C; kalaniyot rojas Néguev (feb–mar); iris y ciclámenes Galilea; Pesaj 2027 (22–29 abril): cierre primer/último anochecer; Semana Santa 2027 (católica 20 abr; ortodoxa 12 abr); Vía Dolorosa procesión franciscana viernes 15h; Fuego Sagrado; Baja temporada en marzo = precios más bajos; cross-links /es/easter-in-jerusalem ✓, /es/1-day-jerusalem-itinerary ✓, /es/best-time-to-visit-israel ✓; Booking.com primavera affiliate; HONESTY: fechas religiosas 2027 confirmadas; Pesaj cierre variable según restaurante → "consulte con el establecimiento"

- `design-museum-holon.md`: ES "Museo de Diseño Holon (Ron Arad) : Guía Práctica (2026)" — único museo de diseño contemporáneo Oriente Próximo; Ron Arad (arquitecto israelí-británico); exposiciones temporarias 3–4×/año; 5 galerias con paneles de acero Cor-Ten; desde Azrieli 10 min en autobús; no domingos; tienda de diseño + café; Holon = barrio industrial reconvertido + museo Mediatheque vecino; HONESTY: no fabricar títulos de exposiciones; cross-links /es/1-day-tel-aviv-itinerary ✓, /es/day-trips-from-tel-aviv ✓, /es/tel-aviv-museums ✓; 3 CTAs GYG / Viator / Booking TLV

Cross-links to verify before BUILD:
- /es/jaffa-travel-guide ✓, /es/1-day-jerusalem-itinerary ✓, /es/best-tours-in-israel ✓: confirmed existing
- /es/tel-aviv-museums ✓, /es/yad-vashem-visitor-guide ✓, /es/jewish-heritage-israel ✓: confirmed existing
- /es/western-wall-guide ✓: confirmed existing
- /es/easter-in-jerusalem ✓, /es/best-time-to-visit-israel ✓: confirmed existing
- /es/1-day-tel-aviv-itinerary ✓, /es/day-trips-from-tel-aviv ✓: confirmed existing

Quality: Spanish neutro latinoamericano (tuteo); YAML double-quotes; /es/* prefix solo para páginas ES existentes; no fabricar precios (rangos en ₪ solamente); ammunition-hill = framing de memorial; design-museum = no fabricar títulos de exposiciones; film-tv = no fabricar ubicaciones de rodaje sin fuente oficial.

---

## Phase DE-21 (187 → 192/398) — DEFINED iter960 RESEARCH (pending DE-20 ship)

All 5 confirmed MISSING from DE via `comm -23` (2026-08-03 iter960).

Guides: `israel-in-summer.md`, `israel-in-spring.md`, `israel-in-winter.md`, `ammunition-hill-jerusalem.md`, `anu-museum-guide.md`

### Content sketches

- `israel-in-summer.md`: DE "Israel im Sommer (Juli–August) : Reiseführer (2026)" — Hochsaison; Temperaturzonen: Küste/TLV 30–33°C (Brise), Totes Meer bis 40–43°C (kein Sharav-Schatten), Golan 22–27°C (Wanderparadies); Dead-Sea-Regel: nur morgens (6–10h); Sharav (Hitzewelle) jederzeit möglich → Warnung; Galilée: Kinneret-See Wassertemperatur 28°C, Kite- und Windsurfen; TLV: Kikar Hamedina Marktviertel frühmorgens; Caesarea Amphitheater Konzerte (Sommer); Hotelbuchung 2–3 Monate früher (Preise +30–40%); Condor/TUI Direktflüge sommer; Booking.com Sommer-Affiliate; cross-links /de/dead-sea-guide ✓, /de/best-beaches-israel ✓, /de/3-days-in-galilee ✓; HONESTY: Temperaturangaben = historische Mittelwerte; aktuelles Wetter bei DWD/wetter.com prüfen

- `israel-in-spring.md`: DE "Israel im Frühling (März–Mai) : Beste Reisezeit (2026)" — 18–24°C; Kalaniyot (Anemonen) im Néguev (Feb–März); Iris und Zyklamen in Galilée; Pessach 2027 (22.–29. April): Marktschließungen erster/letzter Abend; christliche Reisende: Ostern 2027 (katholisch 20. April; orthodox 12. April); Via-Dolorosa-Prozession franciscain freitags 15h; Heiliges Feuer; März = Nebensaison = günstigere Hotels; Blütezeit Gólan (Mohn + Vergissmeinnicht März–April); Booking.com Frühjahrstarife; cross-links /de/easter-in-jerusalem ✓, /de/1-day-jerusalem-itinerary ✓, /de/best-time-to-visit-israel ✓; HONESTY: Oster-/Pessach-Daten 2027 bestätigt; Restaurantschließungen Pessach variabel → "beim Restaurant anfragen"

- `israel-in-winter.md`: DE "Israel im Winter (Dezember–Februar) : Weihnachten und Regen (2026)" — Weihnachten = Höhepunkt für Pilger (24./25. Dez Bethlehem Mitternachtsmesse; Checkpoint 300 Logistik; Ein Kerem Franziskanermesse); Jerus. Weihnachtsmarkt YMCA (Dez); Golan Schnee möglich ab Dez (Hermon Ski); Eilat Winter-Sonnenflucht (Condor/TUI Direktflüge Nov–März; 22°C Eilat vs 8°C Berlin); TLV: Winternächte angenehm (14–18°C); Regen hauptsächlich Galilée + Jerusalem; Preise: Heiligabend/Sylvester = Spitzenpreise; Anfang Dez + Feb = Nebensaison; Booking.com Winter Affiliate; cross-links /de/christmas-in-israel ✓, /de/bethlehem-tours-compared ✓, /de/eilat-travel-guide ✓; HONESTY: Schneemenge auf dem Hermon variiert jährlich; Checkpoint-Logistik für Bethlehem kann sich ändern → "Echtzeit-Infos des Veranstalters prüfen"

- `ammunition-hill-jerusalem.md`: DE "Givat HaTachmoshet – Hügel der Munition : Gedenkstätte Jerusalem (2026)" — Gedenkstätte für die Panzerschlacht (5.–7. Juni 1967, Sechs-Tage-Krieg); 71 gefallene israelische Soldaten; Bedeutung: Deutsche-israelische Beziehungen (BRD-Israel Diplomatie 1965; Wiedergutmachungsabkommen 1952; Israelische Unabhängigkeit 1948); Gelände: Schützengräben + 3 Panzer + Modell Jerusalems 1967 + Innenmuseum (Dokumentarfilm 22 Min, EN/HE); Zutritt Gelände kostenlos; Film: kleiner Betrag; 360°-Blick über Jerusalem; Nachtführungen verfügbar (Reservierung nötig); HONESTY: Militärdenkmal — sachliche Darstellung Kampf und Verluste beider Seiten; keine Verherrlichung; cross-links /de/1-day-jerusalem-itinerary ✓, /de/western-wall-guide ✓, /de/yad-vashem-visitor-guide ✓; 3 CTAs GYG / Abraham / Booking Jerusalem

- `anu-museum-guide.md`: DE "ANU – Museum des Jüdischen Volkes Tel Aviv : Besucherführer (2026)" — Campus Universität Tel Aviv (Ramat Aviv); das weltgrößte jüdische Museum; Schwerpunkte: Jeckenim (deutschsprachige Juden im Exil / Einwanderer 1930er-Eretz Israel); Haskala (Jüdische Aufklärung Berlin); Shoah und Wiedergeburt; genealogische Datenbank Generation; deutsch-jüdische Presse (Berliner Tageblatt, Jüdische Allgemeine Zeitung); Bezug zu DACH: ca. 200.000 israelische Staatsbürger mit DE-Abstammung (Aufarbeitung + Identität); Eintrittzeiten (geschlossen sonntags; 10–18h); ETA-IL; Booking.com TLV hotels; 3 CTAs GYG / Viator / Abraham; cross-links /de/tel-aviv-museums ✓, /de/yad-vashem-visitor-guide ✓, /de/jewish-heritage-israel ✓; HONESTY: "Verifizieren Sie aktuelle Ausstellungen unter anumuseum.org.il vor dem Besuch"

Cross-links to verify before BUILD:
- /de/dead-sea-guide ✓, /de/best-beaches-israel ✓, /de/3-days-in-galilee ✓: confirmed existing
- /de/easter-in-jerusalem ✓, /de/1-day-jerusalem-itinerary ✓, /de/best-time-to-visit-israel ✓: confirmed existing
- /de/christmas-in-israel ✓, /de/bethlehem-tours-compared ✓, /de/eilat-travel-guide ✓: confirmed existing
- /de/western-wall-guide ✓, /de/yad-vashem-visitor-guide ✓: confirmed existing
- /de/tel-aviv-museums ✓, /de/jewish-heritage-israel ✓: confirmed existing

Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix nur für bestätigte DE-Seiten (EN-Fallback bei fehlender DE-Version); Preisangaben als Spannen (₪); Gedenkstätten-Seiten sachlich ohne Verherrlichung; Saisonführer: historische Temperaturbänder, kein Tageswetter-Versprechen; ANU-Museum: keine fabrizierten Ausstellungstitel.

---

## Updated status snapshot (iter1036 BUILD 2026-08-06)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 398    | stable |
| fr     | 271    | 127 missing — Phase FR-37 SHIPPED iter1038 debb2b7c; **next FR BUILD = FR-38** |
| de     | 253    | 145 missing — Phase DE-33 SHIPPED iter1032 97a6e679; **Phase DE-34 defined iter1035** |
| es     | 250    | 148 missing — Phase ES-49 SHIPPED iter1036 63d88f3c; **next ES BUILD = ES-50** |

### Phase FR-37 (267 → 271/398) — SHIPPED iter1038 — debb2b7c

Guides: `israel-for-french-travelers.md`, `israel-packing-list-guide.md`, `jaffa-hotels-guide.md`, `neve-tzedek-guide.md`, `tower-of-david-guide.md`
All 5 confirmed MISSING from `src/content/guides/fr/` via `comm -23` (2026-08-06).
- israel-for-french-travelers: #1 priority; France is 3rd largest Israel tourism source; ETA-IL since Jan 2025 (iaa.gov.il, ₪25, 72h, valid 2 years); Air France CDG+ORY+NCE, Transavia ORY, El Al TLV nonstop; Carte Vitale not valid abroad (assurance voyage required); Type-H adapter; time-zone table; ELEFAND; zero FR SERP competition; pairs with /fr/visa-information, /fr/first-time-in-israel, /fr/is-israel-safe (all confirmed existing)
- israel-packing-list-guide: completes EN/DE/ES cluster (DE-33 shipped iter1032); "liste de bagages Israël" practical searches; modesty clothing for holy sites; only-carry-on strategy; Type-H adapter; Dead Sea cosmetics; Booking+GYG+SafetyWing CTAs; pairs with /fr/first-time-in-israel, /fr/is-israel-safe (confirmed existing). NOTE: no /fr/tel-aviv-travel-guide — use plain /tel-aviv link for any TLV reference
- jaffa-hotels-guide: Jaffa boutique accommodation; /fr/jaffa-travel-guide CONFIRMED EXISTS; Old Jaffa boutique zone + Old City fringe hotels + Port area; Booking CTAs; ₪ price ranges; decision matrix by location; pairs with /fr/jaffa-travel-guide, /fr/tel-aviv-beach-guide (verify at BUILD time)
- neve-tzedek-guide: TLV's oldest neighborhood (founded 1887); Suzanne Dellal Centre (dance + theatre); Nahum Gutman Museum; Rokach House; Shabazi Street boutiques; zero FR editorial competition (Expedia+GYG only); boutique hotels cluster; Booking CTAs. NOTE: no /fr/tel-aviv-travel-guide — use plain link /en/tel-aviv-travel-guide as EN fallback or just avoid the cross-link
- tower-of-david-guide: Tower of David Museum in Jerusalem Citadel; Night Spectacular summer 2026; rooftop views; video mapping show; Booking+GYG+Viator CTAs; pairs with /fr/easter-in-jerusalem (CONFIRMED EXISTS), /fr/1-day-jerusalem-itinerary (confirm at BUILD time)
Quality: metropolitan French; YAML double-quotes; /fr/* prefix only for confirmed existing FR pages; no fabricated prices or ratings; honest Night Spectacular dates (seasonal — verify intra-BUILD); no H1 in body.

### Phase DE-34 (253 → 258/398) — SHIPPED iter1041 — 0fabfa96

Guides: `netanya-guide.md`, `passover-in-israel.md`, `israel-water-parks.md`, `israel-yoga-retreats.md`, `neve-tzedek-guide.md`
All 5 confirmed MISSING from `src/content/guides/de/` via `comm -23` (2026-08-06).
- netanya-guide: DACH gap: ~40K German-speaking Israeli residents (German aliyah community; Germany #1 European origin country for aliyah); zero DE editorial; Cliffside promenade + Poleg Blue Flag beach + Stern Diamond Factory (commercial nature disclosed) + French Quarter (EN guide notes ~60K francophones: cross-mention for DACH context); /de/best-hotels-netanya CONFIRMED EXISTS; Booking CTAs; decision matrix; 6 FAQs
- passover-in-israel: DACH Jewish calendar guide; Pessah 5787 April 22–29 2027; Ben Gurion 25h partial closure first/last days; hotel Seder programs; Birkat Kohanim logistics (Western Wall + Hebron is out-of-scope — use only /de/western-wall-guide reference); tourist Seder options; open/closed guide; /de/rosh-hashanah-in-israel CONFIRMED EXISTS; /de/yom-kippur-in-israel CONFIRMED EXISTS; Booking+GYG+Viator CTAs; 6 FAQs
- israel-water-parks: family summer cluster completion in DE (already in EN+FR); Shefayim (50+ slides, Costal Road), Superland Rishon LeZion (50+ rides), Gal-Gil Nahariya (north), Luna Park TLV (seafront funfair), Mini Israel Latrun (scale models); Booking+GYG+Discovercars CTAs; 7 FAQs; pairs with /de/israel-with-kids (confirm at BUILD time)
- israel-yoga-retreats: DACH wellness tourism (Germany = Europe's largest wellness travel market); 7 retreat centers (Six Senses Shaharut Arava 400–800€; Desert Ashram Mitzpe Ramon 80–120€; Lev Hamidbar Mitzpe Ramon 150–250€; Ne'ot Semadar Arava 70–110€; Mitzpe Alummot Galilee 130–200€; Or HaLev Pardes Hanna 120–180€; Moa Oasis Mitzpe Ramon 150–220€); seasonal calendar; 7 FAQs; GYG+Booking+Discovercars CTAs; already in EN+FR (iter1033 FR-36)
- neve-tzedek-guide: TLV Bauhaus UNESCO quarter (Neve Tzedek borders White City UNESCO zone); Suzanne Dellal Centre (international dance festival); Nahum Gutman Museum; Rokach House; boutique hotels; DACH cultural-design tourism (large segment); Booking CTAs; zero DE editorial (verified via rapunzel-will-raus.ch = blog only, no editorial guide)
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix only for confirmed existing DE pages; no fabricated prices; Makhtesh Ramon correctly "Erosionskrater" in yoga-retreats descriptions; no H1 in body.

### Phase ES-49 (245 → 250/398) — SHIPPED iter1036 — 63d88f3c

Guides: `jordan-river-baptism.md`, `israel-water-parks.md`, `israel-with-teenagers.md`, `sukkot-in-israel.md`, `neve-tzedek-guide.md`
All 5 confirmed MISSING from `src/content/guides/es/` via `comm -23` (2026-08-06).
- jordan-river-baptism: #1 LATAM Catholic pilgrimage gap; Yardenit (Kinneret south shore, open daily, honesty note: "popular per tradition but not authenticated historically"); Qasr el-Yahud (Jordan River actual baptism site on Wadi al-Kharrar border, West Bank Area C, free entry — pair-name with River Jordan / Nahr al-Urdunn); GYG+Abraham+Viator CTAs; 6 FAQs; pairs with /es/christian-pilgrimage-holy-land (confirm at BUILD time), /es/sea-of-galilee-guide (confirm)
- israel-water-parks: family summer; completes EN/FR/DE/ES cluster (all 4 locales); Shefayim (50+ slides), Superland, Gal-Gil (norte), Luna Park TLV, Mini Israel Latrun; GYG+Booking+Discovercars CTAs; 7 FAQs; already in EN+FR (iter1033 FR-36); pairs with /es/israel-with-kids (confirm at BUILD time)
- israel-with-teenagers: family cluster completion in ES; completes EN/FR/DE/ES cluster; adventure focus: Masada cable car + Dead Sea floating + surf TLV (Yaam/other schools) + rappel Wadi Aharoni + water hiking Hexagons Galilee; 13–15 vs 16–17 strategy section; 7 FAQs; GYG+Booking+Discovercars CTAs; already in EN+FR (iter1033 FR-36)
- sukkot-in-israel: Jewish holidays cluster for ES; /es/rosh-hashanah-in-israel CONFIRMED EXISTS; /es/yom-kippur-in-israel CONFIRMED EXISTS; Sucot 2026 Sept 25–Oct 2 + Sucot 5787 Oct 13–20 2027; Birkat Kohanim (Western Wall 6:30am arrival 7:30am ceremony); Hula Valley cranes arrive Oct; Tabernacles as sukka-building experience; GYG+Booking+Viator CTAs; 6 FAQs; already in FR (iter1008 FR-31); paired-naming note: use Monte del Templo / Haram al-Sharif for any Temple Mount reference
- neve-tzedek-guide: TLV's oldest and most fashionable neighborhood; Suzanne Dellal Centre; Nahum Gutman Museum; Rokach House; boutique hotels + Airbnb-style stays; zero ES editorial; LATAM Instagram-tourism angle (Shabazi + colorful lanes = photo-friendly); Booking CTAs; 6 FAQs; pairs with /es/jaffa-travel-guide (confirm at BUILD time), /es/tel-aviv-beach-guide (confirm)
Quality: neutral LATAM Spanish tuteo; YAML double-quotes; /es/ prefix only for confirmed existing ES pages; no fabricated prices; Yardenit "popular pero no auténtico históricamente" honesty note (important: the actual baptism site is Qasr el-Yahud); Jordan River West Bank/Area C location noted; Sucot dates verified; no H1 in body.

## Updated status snapshot (iter1067 BUILD 2026-08-07)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 398    | stable |
| fr     | 297    | 101 missing — Phase FR-42 SHIPPED iter1067 c04046c0; **next FR BUILD = FR-43 (not yet defined)** |
| de     | 278    | 120 missing — Phase DE-38 SHIPPED iter1063 049be159; **next DE BUILD = DE-39 (not yet defined)** |
| es     | 279    | 119 missing — Phase ES-55 SHIPPED iter1066 d2d018bc; **next ES BUILD = ES-56 (not yet defined)** |

### Phase FR-41 (287 → 292/398) — SHIPPED iter1061 — e936fc5e

Guides: `israel-points-miles-guide.md`, `israel-ramadan-guide.md`, `israel-unesco-sites.md`, `israel-visa-extension.md`, `israel-for-swiss-travelers.md`
All 5 shipped to master. See DONE.md iter1061 for full detail.

### Phase ES-54 (269 → 274/398) — SHIPPED iter1061-concurrent — 4ef7a415

Guides: `israel-points-miles-guide.md`, `israel-ramadan-guide.md`, `israel-unesco-sites.md`, `israel-visa-extension.md`, `israel-tour-packages.md`
All 5 shipped to master. Concurrent collision with FR-41 resolved via rebase. See DONE.md iter1061-concurrent for full detail.

### Phase ES-55 (274 → 279/398) — SHIPPED iter1066 — d2d018bc

Guides: `traveling-israel-jewish-holidays.md`, `shabbat-dinner-experience.md`, `negev-jeep-tours.md`, `timna-park-guide.md`, `petra-wadi-rum-from-eilat.md`
All 5 shipped to master. See DONE.md iter1066 for full detail.

### Phase FR-42 (292 → 297/398) — SHIPPED iter1067 — c04046c0

Guides: `traveling-israel-jewish-holidays.md`, `shabbat-dinner-experience.md`, `negev-jeep-tours.md`, `timna-park-guide.md`, `petra-wadi-rum-from-eilat.md`
All 5 shipped to master. Mirrored ES-55 batch in Metropolitan French. verdictName+verdictQuery on negev-jeep-tours + timna-park-guide. INPA Pass honesty note on Timna. Jordan Pass purchase-before-border note on petra-wadi-rum. All /fr/* cross-links pre-verified. Gate: pnpm check 0 errors; build 1628 pages (+5); pnpm test:e2e 2369/2369 pass (33.2m). See DONE.md iter1067 for full detail.

### Phase ES-56 (279 → 284/398) — not yet defined
Queue for next RESEARCH pass to define ES-56 batch (candidates: wedding-in-israel, israel-for-seniors, negev-tours-compared, nationality-guides-cluster-2, is-israel-safe freshness update).

### Phase FR-43 (297 → 302/398) — not yet defined
Queue for next RESEARCH pass or BUILD iteration to define FR-43 batch (candidates: sarona-market-tel-aviv, wedding-in-israel, israel-for-seniors, galilee-agritourism-cluster).

### Phase DE-39 (278 → 283/398) — not yet defined
Queue for next RESEARCH pass or BUILD iteration to define DE-39 batch (candidates: traveling-israel-jewish-holidays + shabbat-dinner-experience + negev-jeep-tours + timna-park-guide + petra-wadi-rum-from-eilat — same 5-guide parity block now exists in FR+ES).
