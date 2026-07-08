# LOOP STATE

- iteration: 370
- lastMode: RESEARCH (370%5==0)
- lastItem: research-370-adventure-hotels-archaeology
- lastResult: RESEARCH — 8 net-new items added to BACKLOG (all grep-confirmed zero prior hits): arava-mountain-biking (P2 S), best-hotels-tiberias (P2 M), best-hotels-mitzpe-ramon (P2 M), nahal-pratzim-guide (P2 S), jerusalem-pilgrimage-road (P2 S), via-ferrata-israel (P2 S), knesset-museum-jerusalem (P3 S), new-luxury-hotels-israel-2026 (P2 M). Key 2026 finding: Jerusalem Pilgrimage Road (Pool of Siloam → Temple Mount, opened Jan 2026) is entirely unguided on English travel sites. Major English publishers (LP, Timeout, TripAdvisor) frozen at pre-Oct 2023 Israel content — systematic gap opportunity. COMPETITORS.md updated. No code shipped.
- nextRotationCategory: 371%5==1 → BUILD (seo-content). 372%5==2 → BUILD (monetization). 373%5==3 → BUILD (tools/i18n).
- higgsfieldSpent: 0
- updatedAt: 2026-07-08T00:35Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 369 REVIEW — audited iters 366–368. 1 meta violation found and fixed: yam-caesarea-guide description was 165 chars (5 over 160 limit). Removed trailing " from Tel Aviv or Haifa" → 142 chars. All other checks clean: 19 internal links resolved, hero images present, partner keys valid, no fabricated data, FR/DE Golan "Croisés" refs historically accurate. Gate: 0 errors, 577 pages, 772/772 e2e. SHA b4024aa. CI pending.

Notes: iter 368 BUILD (tools fall-through → i18n Phase 4 Batch 6) — 5 Golan attractions × FR+DE (10 locale pages): banias, druze-villages, mount-bental, mount-hermon, nimrod-fortress. EN golan-nimrod-fortress.md historical fix (Crusader→Ayyubid) as Rule 1 auto-fix. smoke.spec.ts + a11y.spec.ts +10 routes each. Gate: 0 check errors, 577 pages (+10), 772/772 e2e (+20). SHA 523dea6. CI in_progress at push time. FR+DE Golan attractions now complete (5/5).

Notes: iter 367 BUILD (monetization) — israel-medical-tourism shipped. P2 M seo-content+monetization. New /israel-medical-tourism: hospital-based medical tourism guide covering Sheba Medical Center (Newsweek world's best hospitals, 7+ consecutive years), Assuta Hospital (JCI-accredited, IVF specialist), Rambam (Haifa, cardiac/ortho), Sourasky/Ichilov (central TLV). IVF cost context (~USD 3–4.5k per cycle vs $15–25k US); oncology second opinions; cardiac surgery; orthopaedic procedures. Practical: how to arrange visit (ShebaOnline portal, Assuta international inquiry), visa/entry (tourist entry covers medical stays), accommodation strategy (Ramat Gan for Sheba, northern TLV for Assuta), insurance reality (planned treatment not covered by standard travel insurance). Combining with touring: TLV, Jerusalem (1h rail), Dead Sea, Caesarea. 4 CTAs: Booking (Ramat Gan + TLV), GYG (TLV tours), Abraham (day trips). 6 FAQs. Cross-links added to: dead-sea-medical-tourism (sibling guide pointer), israel-for-seniors (see also footer), israel-travel-insurance (end-of-guide pointer). Link bug fixed: /bahai-world-center → /bahai-world-center-guide. Gate: 0 check errors, 567 pages (+1), 752/752 e2e. SHA 71c6948. CI pending.

Notes: iter 366 BUILD (seo-content) — yam-caesarea-guide shipped. P2 S seo-content+monetization. New /yam-caesarea-guide: Israel's first marine national park (INPA designated Nov 25, 2024); 267 acres of Mediterranean waters west of Caesarea Antiquities NP. Dual mandate: ecological (coral reefs, seagrass meadows) + heritage (submerged Herodian Sebastos harbour, 20 BCE). Snorkel access via Old Caesarea Diving Center (sole INPA-permitted operator); 4 colour-coded rope trails (blue/yellow = snorkel accessible; green/red = certified dive). Content: NP designation context, what you see underwater (breakwaters, column drums, anchors, marine life), practical planning table, seasonal guidance (Apr–Oct), getting there (Caesarea–Pardes Hanna train + taxi), marine park rules (no anchoring, guided-only access, no collection). 2 CTAs (GYG snorkeling tour, DiscoverCars). 5 FAQs (what is Yam Caesarea, dive cert needed, best time, marine life, INPA pass). Cross-links: caesarea-guide (inline + footer), israel-national-parks-pass, eilat-diving-snorkeling, water-hiking-israel, day-trips-from-tel-aviv, day-trips-from-haifa. Gate: 0 check errors, 566 pages (+1), 752/752 e2e pass. SHA b86066a. CI in_progress at push time.

Notes: iter 365 RESEARCH — 2026-specific INPA designations focus. Primary finding: Yam Caesarea Marine National Park (designated Nov 25, 2024); Israel's first marine national park; 267 acres west of Caesarea Antiquities NP; protects submerged Herodian harbor (20 BCE) + coral reefs + seagrass meadows. Distinct from existing israel-mediterranean-diving backlog item (iter190): adds "Israel's first marine NP" PR hook, ecological protection angle, INPA visitor infrastructure under development. All other 2026 candidates (Skyfield, Schottenstein National Campus, Rosh Hanikra cable car, new hotels) confirmed already in backlog. 1 new item added to BACKLOG: yam-caesarea-guide (P2 S seo-content+monetization). COMPETITORS.md updated.

Notes: iter 364 REVIEW — meta description length audit of iters 362–363. Found 2 violations: nimrod-fortress-guide (166→147 chars, removed "INPA park circuit, ") and golan-heights-tours-compared (172→144 chars, removed "from Tel Aviv and Jerusalem, "). All internal links resolved, hero images confirmed, partner keys valid, no fabricated data. Quick fix shipped as ed37b2c. Gate: 0 check errors, 565 pages, 752/752 e2e. CI in_progress at push time.

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
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 38 review passes + 3 technical (event-schema + meta-trim + locale-links) + 47 EN guides + 5 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290/295/300/305/310/315/320/325/330/335/340/345/350/355/360/365.
