# LOOP STATE

- iteration: 377
- lastMode: BUILD (monetization) (377%5==2)
- lastItem: western-galilee-guide
- lastResult: BUILD — new /western-galilee-guide shipped. Multi-site touring guide for Western Galilee: Lohamei HaGeta'ot Holocaust museum (free entry; Warsaw Ghetto Uprising survivors' kibbutz, 10km north of Akko), Beit She'arim UNESCO necropolis (2nd-4th century CE Jewish catacombs, INPA pass valid), Montfort Castle (Teutonic Knights fortress, Crusader/Ayyubid 13th century, 2-3h hike from Hila), Nahal Kziv water hike (spring-fed forested gorge Oct-May), Peqi'in multi-faith village (Druze+Maronite+Christian+Jewish; cave synagogue of Bar Yochai; women's Druze pita cooperative), Achzivland eccentric detour. Half-day and full-day itineraries with drive-time table. 3 affiliate CTAs (GYG Western Galilee tours, Viator private tours, DiscoverCars). Cross-links to akko-acre-guide.md + day-trips-from-haifa.md. Tests: +1 route each smoke.spec.ts + a11y.spec.ts. Gate: 0 check errors; 591 pages (+1); 800/800 e2e+a11y pass (+2). SHA 5064347. CI in_progress at push time.
- nextRotationCategory: 378%5==3 → BUILD (tools/i18n). 379%5==4 → REVIEW. 380%5==0 → RESEARCH. 381%5==1 → BUILD (seo-content).
- higgsfieldSpent: 0
- updatedAt: 2026-07-08T07:45Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 377 BUILD (monetization) — western-galilee-guide shipped. P2 M seo-content+monetization. Filled the gap BETWEEN akko-acre-guide and rosh-hanikra (not yet shipped) with the cluster of lesser-visited Western Galilee sites. Key content: Lohamei HaGeta'ot (free, group bookings recommended, gfh.org.il); Beit She'arim (UNESCO 2015, INPA pass, dark narrow catacombs — bring torch); Montfort (Teutonic Knights, 1229 CE acquired, captured Baybars 1271, 2-3h hike rocky descent from Hila); Nahal Kziv (Oct-May season, flash flood warning, water shoes); Peqi'in (continuous Jewish settlement since 70 CE claimed, multi-faith coexistence, Druze pita coop, Bar Yochai cave synagogue); Achzivland (Eli Avivi, 1970s breakaway, call ahead). Half-day: Lohamei HaGeta'ot + Akko (train-accessible). Full day from Haifa: Beit She'arim → Lohamei HaGeta'ot → Rosh Hanikra → Achziv → Nahal Kziv with drive-time table. Hill+village day: Peqi'in + Montfort + Nahal Kziv. 3 CTAs: GYG, Viator, DiscoverCars (car essential for inland sites). Cross-links added: akko-acre-guide.md footer, day-trips-from-haifa.md car rental paragraph. Gate: 0 check errors, 591 pages (+1), 800/800 e2e+a11y (+2). SHA 5064347. CI in_progress at push time.

Notes: iter 376 BUILD (seo-content) — tabgha-church-guide shipped. New /tabgha-church-guide: standalone guide for Tabgha's two northwestern Sea of Galilee pilgrimage churches. Church of Multiplication: Benedictine monastery church built 1982 over 4th/5th-century foundations; in-situ 5th-century Byzantine mosaic floor (loaves+fish central panel, water birds, botanical surround). Church of Primacy of St. Peter: small Franciscan black-basalt chapel lakeside, Mensa Christi flat rock (John 21 post-Resurrection breakfast). 3 affiliate CTAs (GYG Galilee Christian tour, Viator Sea of Galilee+Tabgha, Booking Tiberias). 6 FAQs. Cross-links to galilee-christian-sites-circuit, sea-of-galilee-guide, christian-pilgrimage-holy-land, capernaum visitor context, tiberias. Image: /images/regions/galilee/capernaum.jpg (no Tabgha-specific image available). Gate: 0 check errors; 590 pages (+1); 798/798 e2e+a11y (+2). SHA 8a36764. CI in_progress at push time.

Notes: iter 375 RESEARCH — 3 net-new items added to BACKLOG (grep-confirmed zero prior hits): tabgha-church-guide (P2 S; standalone guide for Tabgha's two Galilee pilgrimage churches — no visitisrael.site coverage vs seetheholyland.net/beinharimtours.com ranking competitors), eilat-beach-guide (P2 S; North Beach vs Coral Beach vs Almog Beach comparison; all major English editorial frozen since Oct 2023), yom-haatzmaut-in-israel (P2 S; Israel Independence Day visitor guide; LP/Timeout silent; GYG sells tour with zero editorial companion). English editorial freeze (LP/Timeout/TripAdvisor) since Oct 2023 = ongoing structural SERP gap confirmed. No code shipped.

Notes: iter 374 REVIEW — meta title/desc audit of iters 371-373. 13 violations fixed in 11 files (EN best-hotels-tiberias desc, EN jerusalem-pilgrimage-road title, FR+DE 5 Akko attractions with widespread description overruns). Lesson: FR+DE descriptions tend to run 15-20% longer than English for same content — budget tighter at authoring time. All internal links on new guides resolved OK. Gate: 0 errors, 589 pages (no change), 796/796 e2e. SHA a012490. CI in_progress at push time.

Notes: iter 373 BUILD (tools fall-through → i18n Phase 4 Batch 7) — 5 Akko attractions × FR+DE. Tools category empty (all 11 tools shipped); fell through to i18n. Akko cluster chosen (5 items = natural batch; bahai-mansion has religiousSiteId = haifa-bahai-gardens precedent from Batch 5). DE Khan FAQ reworded to avoid German-typographic-quote YAML collision (recurring lesson from iters 137/142/147/343/348/358/368). FR+DE Akko attractions: 5/5 COMPLETE. Remaining untranslated EN attractions: Caesarea (4), Dead Sea (3 remaining: ein-gedi, mineral-beach, qumran), Eilat (5), Nazareth (4), Negev (5) = 21 total (excluding deferred holy-sepulchre + temple-mount = 23 total remaining). fr pages: ~100/~158. de pages: ~100/~158.

Notes: iter 372 BUILD (monetization) — best-hotels-tiberias shipped. P2 M. New /best-hotels-tiberias: Sea of Galilee where-to-stay guide covering Scots Hotel (5-star; 19th-century Scottish Presbyterian mission hospital; wine cellar; lake-view terrace; Church of Scotland), U Boutique Kinneret (4-star; minimalist design; rooftop bar views), Nof Ginosar Kibbutz Hotel (3-star; private lake beach; Jesus Boat Museum on grounds; family-friendly), Leonardo Club (4-star; all-inclusive; beach), Ein Gev Holiday Resort (east shore; ferry/northern-road access logistics). Decision matrix table, booking context (pilgrimage-season demand spikes, hotel quality warning on dated 4-star stock), Shabbat note. 2 CTAs: Booking.com Tiberias hotels + GYG Sea of Galilee boat tour. 6 FAQs. Cross-links: tiberias-guide.md, sea-of-galilee-guide.md, galilee-tours-compared.md. Tests: +1 route each in smoke.spec.ts + a11y.spec.ts. Gate: 0 check errors, 579 pages (+1), 776/776 e2e (+2). SHA a6bdbf1. CI in_progress at push time.

Notes: iter 370 RESEARCH — 8 net-new items added to BACKLOG (all grep-confirmed zero prior hits): arava-mountain-biking (P2 S), best-hotels-tiberias (P2 M), best-hotels-mitzpe-ramon (P2 M), nahal-pratzim-guide (P2 S), jerusalem-pilgrimage-road (P2 S, SHIPPED iter371), via-ferrata-israel (P2 S), knesset-museum-jerusalem (P3 S), new-luxury-hotels-israel-2026 (P2 M). Key 2026 finding: Jerusalem Pilgrimage Road (Pool of Siloam → Temple Mount, opened Jan 2026) is entirely unguided on English travel sites. Major English publishers (LP, Timeout, TripAdvisor) frozen at pre-Oct 2023 Israel content — systematic gap opportunity. COMPETITORS.md updated. No code shipped.

Notes: iter 369 REVIEW — audited iters 366–368. 1 meta violation found and fixed: yam-caesarea-guide description was 165 chars (5 over 160 limit). Removed trailing " from Tel Aviv or Haifa" → 142 chars. All other checks clean: 19 internal links resolved, hero images present, partner keys valid, no fabricated data, FR/DE Golan "Croisés" refs historically accurate. Gate: 0 errors, 577 pages, 772/772 e2e. SHA b4024aa. CI pending.

Notes: iter 368 BUILD (tools fall-through → i18n Phase 4 Batch 6) — 5 Golan attractions × FR+DE (10 locale pages): banias, druze-villages, mount-bental, mount-hermon, nimrod-fortress. EN golan-nimrod-fortress.md historical fix (Crusader→Ayyubid) as Rule 1 auto-fix. smoke.spec.ts + a11y.spec.ts +10 routes each. Gate: 0 check errors, 577 pages (+10), 772/772 e2e (+20). SHA 523dea6. CI in_progress at push time. FR+DE Golan attractions now complete (5/5).

Notes: iter 367 BUILD (monetization) — israel-medical-tourism shipped. P2 M seo-content+monetization. SHA 71c6948. CI pending.

Notes: iter 366 BUILD (seo-content) — yam-caesarea-guide shipped. P2 S. SHA b86066a. CI in_progress at push time.

Notes: iter 365 RESEARCH — 2026-specific INPA designations focus. Primary finding: Yam Caesarea Marine National Park. 1 new item added to BACKLOG: yam-caesarea-guide (P2 S seo-content+monetization). COMPETITORS.md updated.

Notes: iter 364 REVIEW — meta description length audit of iters 362–363. Found 2 violations fixed. SHA ed37b2c.

Notes: iter 363 BUILD (tools fall-through → seo-content) — nimrod-fortress-guide shipped. P2 S. SHA 236efef.

Notes: iter 362 BUILD (monetization) — golan-heights-tours-compared shipped. P2 S monetization. SHA aaba497.

Notes: iter 361 BUILD (seo-content) — red-canyon-eilat shipped. P2 S seo-content. SHA e5a878e.

Notes: iter 360 RESEARCH — 6 new INPA/nature park gaps added to BACKLOG.

Notes: iter 359 REVIEW — CLEAN, 0 violations. Lessons: lazy regex false-positives on apostrophes in YAML values.

Notes: iter 358 BUILD (i18n Phase 4 Batch 5) — 5 Haifa attractions × FR+DE shipped. SHA c617f68.

Notes: iter 357 BUILD (monetization) — bedouin-experience-israel shipped. SHA 18d451d.

Notes: iter 356 BUILD (seo-content) — tel-afek-guide shipped. SHA b2a5575.

Notes: iter 355 RESEARCH — 7 new gaps added to BACKLOG.

Notes: iter 353 BUILD (seo-content) — israel-accessible-travel shipped. SHA 5558a87.

Notes: iter 351 BUILD (seo-content) — israel-photography-guide shipped.

Notes: iter 349 REVIEW — 1 fix (de/tel-aviv-carmel-market title). SHA 5e7bae1.

Notes: iter 347 BUILD (monetization) — dead-sea-tours-compared shipped. P2 S.

Notes: iter 339 REVIEW — YAML meta scan lesson.

Notes: iter 338 BUILD (seo-content, fell through from tools) — gamla-nature-reserve-guide shipped. Lesson: partner key is 'discovercars' not 'discovercar'.

Notes: iter 334 REVIEW — 6 meta violations found and fixed. Lesson: lazy regex false-positives on apostrophes.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 38 review passes + 3 technical (event-schema + meta-trim + locale-links) + 49 EN guides + 5 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290/295/300/305/310/315/320/325/330/335/340/345/350/355/360/365/370/375.
