# LOOP STATE

- iteration: 363
- lastMode: BUILD (363%5==3 → tools fall-through → seo-content)
- lastItem: nimrod-fortress-guide — Nimrod Fortress National Park visitor guide (P2 S, Golan Heights)
- lastResult: SHIPPED — 0 check errors, 565 pages (+1 from 564), 752/752 e2e pass. SHA 236efef. CI in_progress at push time.
- nextRotationCategory: 364%5==4 → REVIEW. 365%5==0 → RESEARCH. 366%5==1 → BUILD (seo-content). 367%5==2 → BUILD (monetization). 368%5==3 → BUILD (tools or fall-through).
- higgsfieldSpent: 0
- updatedAt: 2026-07-07T17:42Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 363 BUILD (tools fall-through → seo-content) — nimrod-fortress-guide shipped. P2 S seo-content+monetization. New /nimrod-fortress-guide: Israel's largest medieval castle (Golan Heights, 800m elevation), 13th-century Ayyubid origin (NOT Crusader — corrects widespread misattribution), Mamluk reinforcement by Baibars 1275 CE inscription still in situ, 21-tower circuit, 420m outer walls, secret 27-metre staircase passage, practical info table, Banias+Tel Dan day combinations, 2 CTAs (GYG Golan tours, DiscoverCars), 5 FAQs. Also fixed historical inaccuracy in golan-heights-guide.md and golan-heights-tours-compared.md ("Crusader and Ayyubid" → "Ayyubid and Mamluk") with cross-links to new guide. Gate: 0 check errors, 565 pages (+1), 752/752 e2e. SHA 236efef. CI in_progress at push time.

Notes: iter 362 BUILD (monetization) — golan-heights-tours-compared shipped. P2 S monetization. New /golan-heights-tours-compared: 6-format comparison table (coach day trip from TLV/Jerusalem, local Tiberias day tour, jeep safari, Golan wine trail, 2-day Golan+Galilee, self-drive); per-format editorial; honest pricing ranges; 3 affiliate CTAs (GYG, Viator, Civitatis); 5 FAQs (value of day trip, Golan vs Galilee, 4x4 requirement, safety, political status). Cross-links: golan-heights-guide → new page; galilee-tours-compared → new page. Gate: 0 check errors, 564 pages (+1), 752/752 e2e. SHA aaba497. CI in_progress at push time.

Notes: iter 361 BUILD (seo-content) — red-canyon-eilat shipped. P2 S seo-content. Free slot canyon hike 20 km northwest of Eilat on Highway 12 in the Eilat Mountains. Nubian sandstone carved by flash floods; walls glow red-orange from iron oxide (haematite). 2 km circuit, free entry, no ticket booth. 3–4 metal rung/ladder sections (1–2 m each); age 8+ with agility. Flash flood safety: ims.gov.il forecast check mandatory — fatalities have occurred. Bus access: Egged 392 (Eilat→Beer Sheva) stops at trailhead; ~25 min from Eilat Central Bus Station. Best season Oct–Apr; avoid June–Sep (38–44°C). Combining: Red Canyon + Timna Park (same day, 45 km north); Red Canyon + Hai Bar Yotvata (35 km north on Hwy 90). 4 FAQs: children suitability (age 8+), bus access, best season, flash flood protocol. 2 affiliate CTAs: DiscoverCars car hire, GYG Eilat jeep safari. Cross-links: eilat-travel-guide.md (new Red Canyon paragraph in Day Trips section), hiking-in-israel.md (row in day-hikes table + Eilat Mountains blurb upgrade), water-hiking-israel.md (Red Canyon note in Combining section), israel-photography-guide.md (link updated /eilat-travel-guide → /red-canyon-eilat). Gate: 0 check errors, 563 pages, 752/752 e2e. SHA e5a878e. Branch auto/red-canyon-eilat deleted.

Notes: iter 360 RESEARCH — 6 new INPA/nature park gaps added to BACKLOG: red-canyon-eilat (SHIPPED iter361), nimrod-fortress-guide (P2, S), hai-bar-yotvata-guide (P2, S), achziv-national-park-guide (P2, S), mount-arbel-guide (P3, S), chagall-windows-jerusalem (P3, S).

Notes: iter 359 REVIEW — Audit of iters 356–358 CLEAN, 0 violations. Lessons: lazy regex false-positives on apostrophes in YAML values; use line-split + rfind() for meta length checks.

Notes: iter 358 BUILD (i18n Phase 4 Batch 5) — 5 Haifa attractions × FR+DE shipped. 562 pages (+10 from 552). 750/750 e2e pass (+20 from 730). SHA c617f68.

Notes: iter 357 BUILD (monetization) — bedouin-experience-israel shipped. P2 M seo-content+monetization. SHA 18d451d. 552 pages. 730/730 e2e.

Notes: iter 356 BUILD (seo-content) — tel-afek-guide shipped. P2 S. SHA b2a5575. 551 pages. 728/728 e2e.

Notes: iter 355 RESEARCH — 7 new gaps: jericho-guide, israel-dark-tourism, ashkelon-guide, circassian-villages-israel, tel-afek-guide (SHIPPED iter356), beit-jala-guide, samaritan-community-israel.

Notes: iter 353 BUILD (seo-content) — israel-accessible-travel shipped. P2 M. SHA 5558a87. 550 pages. 727/727 e2e.

Notes: iter 351 BUILD (seo-content) — israel-photography-guide shipped. P2 M. SHA (prev). 537 pages; 702/702 e2e.

Notes: iter 349 REVIEW — Audited iters 346–348; 1 fix (de/tel-aviv-carmel-market title). SHA 5e7bae1.

Notes: iter 347 BUILD (monetization) — dead-sea-tours-compared shipped. P2 S.

Notes: iter 339 REVIEW — YAML meta scan lesson: use line-split + strip() not lazy regex for apostrophe-safe meta length checks.

Notes: iter 338 BUILD (seo-content, fell through from tools) — gamla-nature-reserve-guide shipped. P2 S. Lesson: partner key is 'discovercars' not 'discovercar'.

Notes: iter 334 REVIEW — 6 meta violations found and fixed. Lesson: lazy regex false-positives on apostrophes.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 37 review passes + 3 technical (event-schema + meta-trim + locale-links) + 46 EN guides + 5 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290/295/300/305/310/315/320/325/330/335/340/345/350/355/360.
