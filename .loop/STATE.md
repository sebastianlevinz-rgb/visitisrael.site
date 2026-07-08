# LOOP STATE

- iteration: 391
- lastMode: BUILD (seo-content) (391%5==1)
- lastItem: israel-vs-turkey
- lastResult: SHIPPED a2baa0e. /israel-vs-turkey — Israel vs Turkey comparison guide. 620 pages. 854/854 e2e+a11y pass. CI=success.
- nextRotationCategory: 392%5==2 → BUILD (monetization). 393%5==3 → BUILD (tools/i18n). 394%5==4 → REVIEW. 395%5==0 → RESEARCH.
- higgsfieldSpent: 0
- updatedAt: 2026-07-08T21:55Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 391 BUILD (seo-content) — /israel-vs-turkey shipped. First Israel vs Turkey comparison guide on the site; confirmed genuine gap (0 matches in 50+ BACKLOG searches). 2,000-word head-to-head guide covering costs, beaches, history, food, safety, visas, nightlife, getting there. Side-by-side table. 6 FAQs. 3 affiliate CTAs (Booking.com hotels, Skyscanner flights, GetYourGuide tours). Footer wired + cross-links added to first-time-in-israel.md and israel-cost-budget.md. Smoke +1 (/israel-vs-turkey), a11y +1. 620 pages (+1). 854/854 e2e+a11y pass. CI=success (a2baa0e).

Notes: iter 390 RESEARCH (390%5==0) — 6 new items added to BACKLOG. Research covered americaisraeltours.com (guided vs independent already in backlog), roughguides.com/israel (content frozen since 2023, no new gaps), Mediterranean cruise lines (confirmed cruise destination planning gap), multi-country combination travel (Israel+Greece, Israel+Cyprus confirmed as genuine gaps after 50+ BACKLOG searches). Pattern: after 77 research iterations the backlog is extraordinarily comprehensive; genuinely new items now trend toward multi-destination combo guides and format-specific comparison angles. No code shipped.

Notes: iter 389 REVIEW (389%5==4) — meta title/desc audit of iters 386-388 (israel-in-autumn, getyourguide-vs-viator-israel, 10 FR+DE Eilat attractions from Batch 10). Findings: 11 meta violations across 11 files. israel-in-autumn clean (58c title, 159c desc, 15 internal links all resolve). getyourguide-vs-viator-israel: title 65c → 51c; all 21 internal links resolve (incl /dead-sea/masada, /akko/old-city, /tel-aviv/old-jaffa — these all work via [region]/[attraction] routing which strips region prefix from filename). All 10 FR+DE Eilat locale descs: 142-195c → all ≤130c (target). fr/eilat-timna-park title also 61c → 53c. Pattern confirmed: FR/DE descs verbose even when EN clean; target ≤130c for locale pages.

Notes: iter 388 BUILD (tools/i18n) — i18n Phase 4 Batch 10 shipped. Eilat 5 attractions now in FR+DE: coral-beach, dolphin-reef, red-canyon, timna-park, underwater-observatory. ticketInfo translated on dolphin-reef (~₪75 adulte/Erwachsene, bookingRequired: true) and underwater-observatory (~₪119/₪99, bookingRequired: false). smoke.spec.ts + a11y.spec.ts +10 routes each (10 new routes added to both specs). 619 pages; 852/852 e2e+a11y. Remaining untranslated EN attractions: Nazareth (4: basilica-of-the-annunciation, marys-well, mount-of-precipice, old-city), Negev (5: avdat, bedouin-hospitality, ein-avdat, mitzpe-ramon, sde-boker) = 9 ready + 2 deferred (jerusalem/holy-sepulchre, jerusalem/temple-mount). fr pages: ~124/~158. de pages: ~124/~158.

Notes: iter 387 BUILD (monetization) — getyourguide-vs-viator-israel shipped. First Israel-specific GYG-vs-Viator comparison on the web (confirmed gap in iter385 RESEARCH). 5-criterion table + platform strengths + trip-type decision matrix + 2 affiliate CTAs. Broken links (/jerusalem/masada → /dead-sea/masada; /akko/akko-old-city → /akko/old-city) caught by link-check gate and fixed before merge. Item removed from BACKLOG; added to DONE.

Notes: iter 386 BUILD (seo-content) — israel-in-autumn shipped. Fills confirmed SERP gap first identified in iter195 RESEARCH and re-confirmed in iter385 RESEARCH ("biggest seasonal gap"). Distinct from best-time-to-visit-israel.md (month-by-month overview) and israel-in-summer.md (beat-the-heat tactics). israel-in-autumn item removed from BACKLOG; added to DONE.

Notes: iter 385 RESEARCH — Researched 2 agent tracks: (1) Content gaps — checked touristisrael, kimkim, lonelyplanet, beinharim, photohound, locationscout; (2) Tools/monetization — checked GYG, Viator, tourscanner, airport-bengurion, tripadvisor. 8 new high-value items added to BACKLOG. Key gap patterns: tour platform comparison pages (no Israel-specific GYG vs Viator exists anywhere), Dead Sea departure comparison money page, car rental company comparison (Eldan vs Hertz etc), military history tourism hub (Latrun/Palmach/Haganah/Ammunition Hill/IAF Hatzerim), autumn/October guide (peak season, biggest seasonal gap), Golan wine route self-drive (distinct from national wine overview), Israel diving hub (all sites: Eilat Red Sea + Caesarea archaeological + Mediterranean). Confirmed site is very comprehensive — many items agents flagged already exist.

Notes: iter 384 REVIEW — meta title/desc audit of iters 381–383 (eilat-beach-guide, day-trips-from-eilat, 6 FR+DE Dead Sea attractions). 6 violations fixed in 6 files. All internal links clean. Hanukkah BACKLOG dedup (iter205 vs iter265) resolved — kept iter265 (more complete, 2026+2027 dates). Pattern confirmed: FR/DE descs systematically verbose; author to ≤130 char target for desc in locale pages.

Notes: iter 383 BUILD (tools/i18n) — i18n Phase 4 Batch 9 shipped. Dead Sea 3/3 attractions now in FR+DE (ein-gedi, mineral-beach, qumran). Remaining untranslated EN attractions: Eilat (5: coral-beach, dolphin-reef, red-canyon, timna-park, underwater-observatory), Nazareth (4: basilica-of-the-annunciation, marys-well, mount-of-precipice, old-city), Negev (5: avdat, bedouin-hospitality, ein-avdat, mitzpe-ramon, sde-boker) = 14 ready + 2 deferred (jerusalem/holy-sepulchre, jerusalem/temple-mount). fr pages: ~114/~158. de pages: ~114/~158.

Notes: iter 382 BUILD (monetization) — day-trips-from-eilat shipped. Fills the Eilat excursion hub gap. Naturally clusters with eilat-beach-guide (iter381) and eilat-travel-guide. Broken link to /timna-park-guide caught and fixed before gate (Timna guide is in BACKLOG, not yet shipped). day-trips-from-eilat item removed from BACKLOG; added to DONE.

Notes: iter 381 BUILD (seo-content) — eilat-beach-guide shipped. Fills confirmed SERP gap first identified in iter375 RESEARCH. eilat-beach-guide item removed from BACKLOG; added to DONE.

Notes: iter 380 RESEARCH — 2 net-new items added to BACKLOG: Terminal Park Eilat (P2 S seo-content+monetization) and Lumagica Tel Aviv (P3 S seo-content). 14 candidates de-duped already in backlog. Hanukkah guide has a duplicate entry (iter205 + iter265) — flag for dedup in next REVIEW.

Notes: iter 379 REVIEW — meta title/desc audit of iters 376-378. 9 violations fixed in 7 files (FR+DE Caesarea aqueduct-beach/harbour/ralli-museum + western-galilee-guide). Recurring lesson: FR+DE titles/descs verbose; target ≤55 char titles when authoring to leave a safety margin for both locales. All links OK. 599 pages unchanged. SHA 6eb94d6.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 39 review passes + 3 technical (event-schema + meta-trim + locale-links) + 52 EN guides + 5 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290/295/300/305/310/315/320/325/330/335/340/345/350/355/360/365/370/375/380/385.
