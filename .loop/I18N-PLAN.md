# I18N / TRANSLATION EPIC — en · fr · de · es

> Updated 2026-07-27: user request to ensure full translation into **es (Spanish)**, plus
> complete the fr + de guide catch-up (307 guides each were added to EN after Phase 6 closed).
> English (en) is the default at root. fr at /fr/..., de at /de/..., es at /es/...
>
> One bounded slice per loop iteration. NEVER bulk-translate in one shot.

## Current status snapshot (2026-07-30 iter876 BUILD es-phase-18)

| Locale | Guides | Attractions | Regions | Itineraries |
|--------|--------|-------------|---------|-------------|
| en     | 397    | 65          | 11      | 6           |
| fr     | 132    | 61          | 11      | 6           |
| de     | 127    | 61          | 11      | 6           |
| es     | 95     | 61          | 11      | 6           |

**Gaps to close:**
- es guides: **302 missing** (95/397 done — Phase ES-18 SHIPPED iter876 5cf2bf65; **Phase ES-19 TBD**)
- fr guides: **265 missing** (132/397 done — Phase FR-9 SHIPPED iter873; **Phase FR-10 ready iter875**)
- de guides: **270 missing** (127/397 done — Phase DE-8 SHIPPED iter868 3f8807e4; **Phase DE-9 ready iter875**)
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

### ES guides (95 / 397)
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

### Phase DE-9 (127 → 132/397) — ready
Guides: `ashdod-cruise-port-excursions.md`, `best-hotels-sea-of-galilee.md`, `vegan-vegetarian-israel.md`, `israel-for-german-travelers.md`, `best-hotels-negev.md`
- ashdod-cruise-port-excursions: AIDA/TUI/MSC German cruise market; Germany = Europe's largest cruise market; zero DE editorial
- best-hotels-sea-of-galilee: completes DE Galilee cluster; DACH Christian tourism; Nof Ginosar + Ein Gev kibbutz; EN iter536
- vegan-vegetarian-israel: "Israel vegan/vegetarisch" popular DACH searches; Germany = #1 per-capita vegan in Europe; EN iter242
- israel-for-german-travelers: specific airport protocols + direct flights; historical sensitivity handled; EN exists; zero SERP
- best-hotels-negev: DACH eco-tourism; Beresheet + Mitzpe Ramon; pairs with de/3-days-in-negev
Quality: Standard Hochdeutsch; YAML double-quotes; /de/* prefix confirmed-existing pages only; no fabricated prices.

### Phase FR-10 (132 → 137/397) — ready
Guides: `masada-visitor-guide.md`, `haifa-travel-guide.md`, `galilee-christian-sites-circuit.md`, `day-trips-from-eilat.md`, `birdwatching-in-israel.md`
- masada-visitor-guide: "Masada guide français" zero FR editorial confirmed; France = #3 Israel tourism source; most iconic Israeli landmark; 3 ascent methods (cable car/snake path/Roman ramp side); Sound & Light show Tue+Thu Mar–Oct; pairs with FR dead-sea cluster (dead-sea-guide, dead-sea-tours-compared, dead-sea-hotels-guide, dead-sea-day-trip-comparison all shipped) + bethlehem-tours-compared; high GYG/Viator affiliate value
- haifa-travel-guide: FR cluster has 3-days-in-haifa + best-hotels-haifa + bahai-world-center-guide + day-trips-from-haifa but MISSING the city anchor guide; "Haïfa guide complet / guide de voyage Haïfa"; would anchor the full FR Haifa cluster; Carmel + Bahá'í terrasses + marché Wadi Nisnas + Deutsche Kolonie + téléphérique du Carmel + port
- galilee-christian-sites-circuit: "Circuit chrétien Galilée" zero FR editorial confirmed; exists in ES (Phase ES-15, iter856); France strong Catholic pilgrim market; Capernaum/Tabgha/Mont des Béatitudes/Magdala/Yardenit self-drive circuit; pairs with FR sea-of-galilee-guide + 3-days-in-galilee + best-hotels-sea-of-galilee already shipped
- day-trips-from-eilat: "Excursions depuis Eilat" / "Excursion Pétra depuis Eilat" zero FR editorial confirmed; Petra day trip, Timna Park, Ravin Rouge, Aqaba day trip; Eilat cluster completer (FR has eilat-travel-guide + eilat-beach-guide + eilat-hotels-guide + eilat-diving-snorkeling + aqaba-from-eilat); pairs with FR eilat-travel-guide for excursion cross-links
- birdwatching-in-israel: France = LPO (Ligue pour la Protection des Oiseaux, ~45K members, one of Europe's largest bird protection organizations); "ornithologie Israël" / "observation oiseaux Israël" zero FR editorial confirmed; Israel's tri-continental Afro-Eurasian flyway + Eilat IBRCE + Hula Valley = world-class sites; exists in EN + ES (Phase ES-12, iter841); ecotourism/nature market growing in France
Quality: metropolitan French; YAML double-quotes; /fr/* prefix confirmed-existing pages only; no fabricated prices.

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

## Updated status snapshot (iter876 BUILD 2026-07-30)

| Locale | Guides | Note |
|--------|--------|------|
| en     | 397    | stable |
| fr     | 132    | 265 missing — Phase FR-9 SHIPPED iter873; **Phase FR-10 ready iter875** |
| de     | 127    | 270 missing — Phase DE-9 ready iter875; **all 5 confirmed missing** |
| es     | 95     | 302 missing — Phase ES-18 SHIPPED iter876 5cf2bf65; **Phase ES-19 TBD** |

**ES-phase-18 (iter876) shipped:** ES guides now 95/397.
**Next phases ready:**
- Phase FR-10: masada-visitor-guide, haifa-travel-guide, galilee-christian-sites-circuit, day-trips-from-eilat, birdwatching-in-israel
- Phase DE-9: ashdod-cruise-port-excursions, best-hotels-sea-of-galilee, vegan-vegetarian-israel, israel-for-german-travelers, best-hotels-negev
**Freshness (iter875):** Gordonia Zichron Yaakov confirmed opened February 1, 2026 (141 rooms, 81m infinity pool, adults 10+, Gordonia Hotels brand). BACKLOG Gordonia item upgraded P3→P2 with confirmed date. InterContinental Jerusalem: still "late summer 2026" per IHG listing; check August/September 2026. easyJet TLV: guide correctly shows suspended/late-October-2026 due to Operation Rising Lion (Iran conflict June 2026).
