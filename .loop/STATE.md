# LOOP STATE

- iteration: 267
- lastMode: BUILD (seo-content)
- lastItem: israel-travel-tips — new /israel-travel-tips guide (P2, M); 435 pages; 554/554 tests; commit d5c66ef
- lastResult: GREEN — pnpm check 0 errors · build 435 pages (+1) · 554/554 e2e+a11y pass; pushed to master
- nextRotationCategory: 268%5==3 → BUILD (tools rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-03T15:40Z
- branch context: work on master; feature work on auto/<slug>

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
