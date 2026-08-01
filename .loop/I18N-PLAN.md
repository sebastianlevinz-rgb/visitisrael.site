# I18N / TRANSLATION EPIC — en · fr · de · es

> Updated 2026-07-27: user request to ensure full translation into **es (Spanish)**, plus
> complete the fr + de guide catch-up (307 guides each were added to EN after Phase 6 closed).
> English (en) is the default at root. fr at /fr/..., de at /de/..., es at /es/...
>
> One bounded slice per loop iteration. NEVER bulk-translate in one shot.

## Current status snapshot (2026-08-01 iter923 BUILD — FR-15 SHIPPED; iter924 REVIEW next)

| Locale | Guides | Attractions | Regions | Itineraries |
|--------|--------|-------------|---------|-------------|
| en     | 398    | 65          | 11      | 6           |
| fr     | 162    | 61          | 11      | 6           |
| de     | 157    | 61          | 11      | 6           |
| es     | 150    | 61          | 11      | 6           |

**Gaps to close:**
- es guides: **248 missing** (150/398 done — Phase ES-29 SHIPPED iter926 b9ec8b3a; **Phase ES-30 TBD**)
- fr guides: **236 missing** (162/398 done — Phase FR-15 SHIPPED iter923 c6b16be9; **Phase FR-16 TBD**)
- de guides: **241 missing** (157/398 done — Phase DE-14 SHIPPED iter922 ae700f9b; **Phase DE-15 TBD**)
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
| fr     | 162    | 236 missing — Phase FR-15 SHIPPED iter923 c6b16be9; **Phase FR-16 defined iter925** |
| de     | 157    | 241 missing — Phase DE-14 SHIPPED iter922 ae700f9b; **Phase DE-15 defined iter925** |
| es     | 150    | 248 missing — Phase ES-29 SHIPPED iter926 b9ec8b3a; **Phase ES-30 TBD** |

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

### Phase FR-16 (162 → 167/398) — DEFINED iter925

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

### Phase DE-15 (157 → 162/398) — DEFINED iter925

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
