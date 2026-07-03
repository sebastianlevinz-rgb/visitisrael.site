# LOOP STATE

- iteration: 272
- lastMode: BUILD
- lastItem: israel-film-tv-tourism — new /israel-film-tv-tourism seo-content guide (commit 4577629)
- lastResult: shipped-4577629 — gate green (0 check errors, 438 pages, 560/560 e2e+a11y pass); pushed to origin/master; CI in_progress at push (prior run c2f7a81 SUCCESS)
- nextRotationCategory: 273%5==3 → BUILD (tools rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-03T20:40Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 272 BUILD (seo-content) — israel-film-tv-tourism:
  New /israel-film-tv-tourism — Israeli screen tourism guide targeting Netflix/Apple TV+ audience.
  Covers: Fauda (Kfar Kasim self-guided + guided Fauda Experience tours via GYG/Viator),
  Shtisel (Mea She'arim walk with dress-code + photography rules, Geula Market),
  Tehran (Jerusalem Old City as Tehran double, Old City Muslim+Christian Quarters),
  Beauty Queen of Jerusalem (Mahane Yehuda market + Jewish Quarter),
  Our Boys (East Jerusalem context + safety note). Self-guided screen walk table (5 locations).
  7 FAQs. 3 affiliate CTAs (GYG Fauda tours + Viator Jerusalem walking tours + Abraham cultural).
  Dense cross-links: jerusalem-food-guide, mahane-yehuda-market-guide,
  holy-sites-dress-code-etiquette, is-israel-safe, best-tours-in-israel,
  israel-tour-operators-guide, western-wall-tunnels-guide, jerusalem-old-city-walking-tour.
  Footer Essentials: +1 "Film & TV screen tourism" link.
  Gate: pnpm check 0 errors (118 files) · build 438 pages (+1 from 437) · 560/560 e2e+a11y pass (+2).
  Ship: commit 4577629 on master; pushed to origin/master; CI in_progress at push
  (prior run c2f7a81 SUCCESS confirmed).
  NEXT: iter 273 = BUILD (273%5==3 → tools rotation).

Notes: iter 271 BUILD (monetization) — israel-tour-operators-guide:
  Operator buyer's guide: Abraham Tours (budget solo/social), Bein Harim (cruise/large groups),
  GetYourGuide marketplace (free-cancellation filter), Viator (verified-review depth), Keshet/Egged
  (structured packages), IMTA private guides (one-on-one licensed). 6-row comparison table.
  3 affiliate CTAs (GYG + Viator + Abraham). Verdict box. 6 FAQs. Dense cross-links to all 6
  tours-compared pages + private-tours-israel + best-tours-in-israel (cross-link added).
  Footer Essentials: "Tour operators compared" link added.
  Gate: pnpm check 0 errors (118 files) · build 437 pages (+1 from 436) · 558/558 e2e+a11y pass (+2).
  Ship: commit e097ed7 on master; pushed to origin/master; CI in_progress at push
  (prior run 61351eb SUCCESS confirmed).
  NEXT: iter 272 = BUILD (272%5==2 → seo-content rotation).

Notes: iter 270 RESEARCH — competitor-gap-scan-270:
  Mode RESEARCH (270%5==0). No code changed. Scanned: touristisrael.com, timeout.com/israel,
  secrettelaviv.com, israel21c.org, neveshalom.org, traveler forums (airport sherut status),
  fishing/dairy/coexistence specialist sites. Backlog now 183+ ready items — extremely saturated
  after 270 iterations; most major Israel travel content gaps documented. De-duped 15+ candidates
  already present. 5 net-new items added: israel-wine-bars (P3 S), israel-fishing-guide (P3 S),
  israel-cheese-dairy-guide (P3 S), ben-gurion-transfers-2026-update (P2 S content-accuracy-review
  for sherut service changes), israel-coexistence-guide (P3 S). COMPETITORS.md updated with iter270
  scan results. No gate required (research only). No commit to master beyond state update.
  NEXT: iter 271 = BUILD (271%5==1 → monetization rotation).

Notes: iter 269 REVIEW — review-desc-trim-269:
  Review covers iters 265-268 (RESEARCH + israel-rooftop-bars + israel-travel-tips + glamping-israel).
  Defects fixed: (1) israel-travel-tips desc 178→150 chars; (2) Footer Essentials missing rooftop-bars
  link added; (3) tel-aviv-nightlife cross-link to /israel-rooftop-bars added in 'Plan your trip' section.
  All internal links verified clean; smoke+a11y specs already covered all 3 new guides.
  Gate: pnpm check 0 errors · build 436 pages · 556/556 e2e+a11y pass.
  Ship: commit d7801a9 on master; pushed to origin/master.
  NEXT: iter 270 = RESEARCH (270%5==0).

Notes: iter 268 BUILD (tools rotation fallthrough → seo-content) — glamping-israel:
  Tools backlog empty (all shipped); fell through to seo-content per playbook. Chose
  /glamping-israel (P2, seo-content, S) — Negev desert & Galilee eco-stays guide.
  Covers: Selina Ramon (crater-rim hybrid eco-lodge/social hub), Desert Shade eco-camp
  (deeper wilderness immersion), Kibbutz Lotan (Arava Valley geodesic domes + composting
  toilets honestly disclosed), Sea of Galilee kibbutz-farm glamping briefly. Season table
  (spring/autumn = ideal; summer heat warning for Negev clearly stated; winter = coldest/
  darkest skies). Packing checklist table. Dead-link fix: removed /bedouin-experience-israel
  link (not yet built) before gate. Cross-link added from /israel-stargazing accommodation
  paragraph. Footer Essentials: +1 "Glamping in Israel" link. 2 affiliate CTAs (Booking.com
  Negev glamping + GYG Negev experiences). 6 FAQs. YAML frontmatter closing --- missing
  on first write — fixed on one-fix attempt; gate passed clean.
  Gate: pnpm check 0 errors · build 436 pages (+1 from 435) · 556/556 e2e+a11y pass.
  Ship: commit 4881bf8 on master; pushed to origin/master; CI in_progress at push (prior
  run 710c3e5 SUCCESS confirmed).
  NEXT: iter 269 = REVIEW (269%5==4 → review pass on iters 265-268).

Notes: iter 267 BUILD (seo-content rotation) — israel-travel-tips:
  New /israel-travel-tips — "20 Things to Know Before Visiting Israel". Top-of-funnel listicle
  capturing 'things to know before visiting Israel', 'Israel travel tips', 'Israel travel mistakes'
  intent — distinct from first-time-in-israel.md (trip-planning framework). 20 numbered tips in
  6 thematic sections: entry/docs (ETA-IL, passport stamps, health insurance), money/connectivity
  (ATM/DCC, cards, SIM/eSIM), Shabbat reality (transport shutoff, Jerusalem vs TLV differences),
  religious sites/dress code (scarf tip, Temple Mount hours, bazaar haggling), transport practicalities
  (Rav-Kav, rental car West Bank void, driving/traffic), health/food/culture (tap water, kosher
  dynamics, address precision, Israeli directness), mistakes to avoid (August heat, skip Jaffa).
  Quick-reference table (tap water/ETA-IL/currency/voltage/tipping/emergency/language/Shabbat/holidays).
  FAQ JSON-LD (7 Qs). Booking.com + GYG affiliate CTAs. Dense internal links to 14 existing guides.
  Wired: footer Plan column ('20 things to know' link) + first-time-in-israel.md cross-link.
  Gate: pnpm check 0 errors (118 files) · build 435 pages (+1 from 434) · 554/554 e2e+a11y pass.
  Ship: commit d5c66ef on master; pushed to origin/master; CI in_progress at push (prior run 2c022f9 SUCCESS).
  NEXT: iter 268 = BUILD (268%5==3 → tools rotation).

Notes: iter 266 BUILD (monetization) — israel-rooftop-bars:
  Gate: pnpm check 0 errors · build 434 pages (+1) · 552/552 e2e+a11y pass. GREEN.
  Ship: commit 84b45fd on master; pushed to origin/master; CI SUCCESS confirmed.
  NEXT: iter 267 = BUILD (267%5==2 → seo-content rotation).

Notes: iter 265 RESEARCH — competitor-gap-scan-265:
  Sites scanned: touristisrael.com, secrettelaviv.com, timeout.com/israel, worldjewishtravel.org,
  israelwineexp.com, winetourism.com, agritourism-israel resources, viator.com/israel,
  getyourguide.com/israel, igoogledisrael.com, aish.com, chabad.org/israel.
  6 net-new BACKLOG items added:
    - tel-aviv-white-night (P3, seo-content, S) — events-festivals.md has 1 line; competitors have full standalone pages
    - israel-wine-harvest-season (P3, seo-content+monetization, S) — wine geography guides exist; no seasonal harvest experience guide
    - israel-hot-air-balloon (P3, seo-content+monetization, S) — adventure-sports.md mentions in 1 line; no standalone guide
    - israel-olive-harvest (P3, seo-content, S) — zero backlog entries; agrotourism gap
    - hanukkah-in-israel (P3, seo-content, S) — jewish-holidays guide covers in 2-3 sentences only
    - lag-baomer-israel (P3, seo-content, S) — jewish-holidays guide covers in ~2 lines; no standalone
  All confirmed non-duplicates via grep scan of backlog. COMPETITORS.md updated.

Notes: iter 264 REVIEW — review-desc-trim-264:
  Audited iters 261-263 guides: kibbutz-hotels-israel, best-beaches-israel, israel-wellness-spa.
  Defects found and fixed: best-beaches-israel desc trimmed (170→147); /kibbutz-hotels-israel added to
  smoke.spec.ts; /best-beaches-israel and /kibbutz-hotels-israel added to a11y.spec.ts.
  Gate: pnpm check 0 errors · build 433 pages · e2e 550/550 pass. GREEN. Ship: commit 0687680.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 31 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265.
