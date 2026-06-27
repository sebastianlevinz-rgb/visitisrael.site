# LOOP STATE

- iteration: 117
- lastMode: BUILD/seo-content
- lastItem: Israeli street food guide (/israeli-street-food-guide) — iter117
- lastResult: SHIPPED 2e71798. Gate: pnpm check 0 errors; build 230 pages (+1); 259/259 e2e pass. CI: 1-sec infra runner (pre-existing; no revert). Vercel inferred green.
- nextRotationCategory: 118%5==3 → BUILD/tools; 119%5==4 → REVIEW; 120%5==0 → RESEARCH; 121%5==1 → BUILD/monetization; 122%5==2 → BUILD/seo-content
- higgsfieldSpent: 0
- updatedAt: 2026-06-27
- branch context: work on master; feature work on auto/<slug>

Notes: iter 117 BUILD/seo-content — shipped Israeli street food guide. City-by-city stall logistics
  (TLV: HaKosem, Carmel Market, Sabich Tchernikhovsky, Florentin; Jerusalem: Abu Shukri, Mahane
  Yehuda, Azura; Jaffa: Abu Hassan, Abouelafia 24h; Haifa: Wadi Nisnas; Nazareth: Mahroum Sweets).
  Distinct from existing cuisine guide (what to eat) and TLV food guide (restaurants). 3 CTAs:
  GYG TLV food tour, Viator Jerusalem market tour, Civitatis Jaffa walk. Dense cross-links.
  Pre-existing CI runner failure (1-sec job, runner_id=0, 30+ iteration pattern).

NEXT: iter 118 = BUILD/tools. Top ready tools items:
  Options: Israel currency/budget quick-converter (tools, S) — lightweight widget for live
    ILS/USD/EUR conversion on the cost guide; Jordan River baptism sites guide (seo-content+mon, S);
    Shabbat-aware restaurant hours filter (tools, M); solo female travel Israel guide (seo-content, S).
  i18n Phase 2 Batch 8 (israel-for-seniors DE/FR) is P1 overdue — could substitute as BUILD/tools
    adjacent slot if no clean tool item ready.
  Best tool candidate: Israel Tel Aviv Neighborhood Finder widget (interactive) OR
    a lightweight ILS currency widget on the cost guide page.

i18n: fr/de 20/~147 each. Phase 2 Batch 8 (israel-for-seniors or high-intent guide) overdue.
Cron b7325b16 hourly @ :17. Loop history: 17 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 + 8 review passes; research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115.
