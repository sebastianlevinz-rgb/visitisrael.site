# LOOP STATE

- iteration: 266
- lastMode: BUILD (monetization)
- lastItem: israel-rooftop-bars — new /israel-rooftop-bars guide (P2, S); 434 pages; 552/552 tests; commit 84b45fd
- lastResult: GREEN — pnpm check 0 errors · build 434 pages (+1) · 552/552 e2e+a11y pass; pushed to master
- nextRotationCategory: 267%5==2 → BUILD (seo-content rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-03T14:33Z
- branch context: work on master; feature work on auto/<slug>

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
  NEXT: iter 266 = BUILD (266%5==1 → monetization rotation).

Notes: iter 264 REVIEW — review-desc-trim-264:
  Audited iters 261-263 guides: kibbutz-hotels-israel, best-beaches-israel, israel-wellness-spa.
  Checks: (1) all internal links resolve — all 14 unique internal hrefs confirmed exist in src/content/;
  (2) no H1 in any body (layout owns it); (3) titles all ≤65 chars; (4) JSON-LD honesty
  (standard guide template — no ratingValue/aggregateRating).
  Defects found and fixed:
    - best-beaches-israel desc: 170 chars → trimmed to 147 (was over 160 limit)
    - /kibbutz-hotels-israel missing from smoke.spec.ts → added
    - /best-beaches-israel and /kibbutz-hotels-israel missing from a11y.spec.ts → both added
  Gate: pnpm check 0 errors · build 433 pages · e2e 550/550 pass (+3 new tests). GREEN.
  Ship: commit 0687680 on master; pushed to origin/master; CI in_progress at push (consistent prior pattern → expected success).
  NEXT: iter 265 = RESEARCH (265%5==0 → competitor/gap scan).

Notes: iter 263 BUILD (tools rotation → depleted → fell through to seo-content+monetization) — israel-wellness-spa:
  Gate: pnpm check 0 errors (118 files) · build 433 pages (+1 from 432) · e2e 547/547 pass. GREEN.
  Ship: commit 56f0096 on master; pushed to origin/master; branch auto/israel-wellness-spa deleted.
  Prod: CI in_progress at push (consistent prior pattern → expected success).
  NEXT: iter 264 = REVIEW (264%5==4 → REVIEW pass on recent shipped guides).

Notes: iter 262 BUILD (seo-content rotation) — best-beaches-israel:
  Gate: pnpm check 0 errors (118 files) · build 432 pages (+1 from 431) · e2e 545/545 pass. GREEN.
  Ship: commit d0b5056 on master; pushed to origin/master; CI in_progress at push time (consistent prior pattern → expected success).
  NEXT: iter 263 = BUILD (263%5==3 → tools rotation; if tools fully depleted → fall-through).

Notes: iter 261 BUILD (monetization rotation) — kibbutz-hotels-israel:
  Gate: pnpm check 0 errors; build 431 pages (+1 from 430); 544/544 e2e+a11y pass. GREEN.
  Ship: commit a97a9b9 on master; pushed to origin/master; CI in_progress at push time (consistent
    prior pattern → expected success). Lighthouse CI also in_progress.
  NEXT: iter 262 = BUILD (262%5==2 → seo-content rotation).

Notes: iter 260 RESEARCH — competitor-gap-scan-260:
  6 net-new BACKLOG items added (wadi-qelt-monastery, kibbutz-hotels [→ SHIPPED iter261],
  purim-in-israel, yom-kippur-in-israel, ramat-gan-safari, negev-wine-route).
  NEXT: iter 261 = BUILD (261%5==1 → monetization rotation).

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 31 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265.
