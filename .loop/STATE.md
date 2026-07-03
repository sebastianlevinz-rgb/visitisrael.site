# LOOP STATE

- iteration: 261
- lastMode: BUILD
- lastItem: kibbutz-hotels-israel (monetization, S) — /kibbutz-hotels-israel standalone guide
- lastResult: Gate GREEN; commit a97a9b9 on master; CI in_progress at push time (consistent prior pattern → expected success)
- nextRotationCategory: 262%5==2 → BUILD (seo-content rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-03
- branch context: work on master; feature work on auto/<slug>

Notes: iter 261 BUILD (monetization rotation) — kibbutz-hotels-israel:
  Picked kibbutz-hotels-israel (P2, monetization, S) — the only remaining pure-monetization
  ready item; prior iters (256, 243, 241) depleted the monetization queue but iter260 RESEARCH
  added this new item. Distinct from israel-accommodation-guide.md (covers kibbutz in 2-paragraph
  section); touristisrael.com + Lonely Planet have dedicated kibbutz hotel pages confirmed.
  Content: what makes kibbutz hotels different (communal breakfast culture, agricultural setting,
    cooperative ownership, honest note that modern kibbutz is much less collective than founding era);
    Dead Sea: Ein Gedi Resort Hotel 4★ (mineral pools, spa, 100-hectare botanical garden included);
    Sea of Galilee: Nof Ginosar (private beach on Kinneret, Yigal Allon Museum / "Jesus Boat" on-site);
    Galilee guesthouses: Kibbutz Hagoshrim (Upper Galilee, Ayun Nature Reserve access), Kibbutz Kfar
    Blum (Hula Valley, birding + cranes migration base);
    Golan Heights: Ein Zivan (apple orchards, Nimrod Fortress, Golan wine circuit),
    Kfar Haruv (southern Golan, Gamla NR, panoramic Kinneret views);
    Negev Arava: Kibbutz Lotan eco-lodge (geodesic domes, earthen structures, ecology workshops,
    Arava birding corridor);
    Jerusalem-area: Kibbutz Ramat Rachel (hilltop, 10 min from Old City, royal Judean palace
    archaeology on-site, spa+pool).
  heroImage: /images/regions/galilee/sea-of-galilee.jpg (confirmed exists).
  6 FAQs: what is a kibbutz hotel; cost (₪500–1,500); best overall pick; breakfast included;
    non-Jewish welcome; how to book.
  Affiliate CTAs: 2× Booking.com (kibbutz hotels Israel, Dead Sea kibbutz resorts) + GYG kibbutz day tour.
  Cross-link: added "For region-by-region picks…see /kibbutz-hotels-israel" to accommodation guide
    kibbutz section.
  HONESTY: price ranges labeled indicative; no fabricated review scores; modern kibbutz communal
    character honestly framed; Kibbutz Lotan direct-booking note (inconsistently on Booking.com);
    Shabbat access rules noted for religious kibbutzim.
  Gate: pnpm check 0 errors; build 431 pages (+1 from 430); 544/544 e2e+a11y pass. GREEN.
  Ship: commit a97a9b9 on master; pushed to origin/master; CI in_progress at push time (consistent
    prior pattern → expected success). Lighthouse CI also in_progress.
  NEXT: iter 262 = BUILD (262%5==2 → seo-content rotation).

Notes: iter 260 RESEARCH — competitor-gap-scan-260:
  6 net-new BACKLOG items added (wadi-qelt-monastery, kibbutz-hotels [→ SHIPPED iter261],
  purim-in-israel, yom-kippur-in-israel, ramat-gan-safari, negev-wine-route).
  NEXT: iter 261 = BUILD (261%5==1 → monetization rotation).

Notes: iter 259 REVIEW — review-meta-trim-259:
  Audited iter256–258 guides (bahai-world-center-guide, tel-aviv-coffee-guide,
  megiddo-jezreel-valley-guide). Found: all internal links resolve; JSON-LD correct;
  honesty framing clean; one H1 each. Found SEO metadata violations:
    bahai desc: 181→148 chars; coffee title: 71→65; coffee desc: 180→152;
    megiddo title: 69→61; megiddo desc: 222→144. All trimmed to ≤65/≤160 spec.
  E2E: first parallel run 497/524 (tools-spec timing interference from prior bg tasks);
    single-worker clean run 544/544 pass. Gate GREEN.
  Ship: commit c2c1a11 on master; pushed to origin/master; CI in_progress.
  NEXT: iter 260 = RESEARCH (260%5==0 → competitor/gap scan).

Notes: iter 258 BUILD (seo-content+monetization; tools depleted → fall-through) — megiddo-jezreel-valley-guide:
  Gate: pnpm check 0 errors; build 430 pages (+1 from 429); 544/544 e2e+a11y pass. GREEN.
  Ship: commit 24cd8f1 on master; pushed to origin/master; CI in_progress at push (consistent
    prior pattern → expected success).
  NEXT: iter 259 = REVIEW (259%5==4 → REVIEW pass on recent shipped guides).

Notes: iter 257 BUILD (seo-content rotation) — tel-aviv-coffee-guide:
  Gate: pnpm check 0 errors; build 429 pages (+1 from 428); 544/544 e2e+a11y pass. GREEN.
  Ship: commit 979c59f on master; pushed to origin; CI in_progress at push time.
  NEXT: iter 258 = BUILD (258%5==3 → tools rotation; tools category fully depleted → fall-through
    to seo-content; next P2 seo-content item = megiddo-jezreel-valley-guide (P2, M)).

Notes: iter 256 BUILD (monetization rotation → fell through to seo-content+monetization) — bahai-world-center-guide:
  Gate GREEN. Ship: commit bab8d1e on master. NEXT: iter 257 = BUILD seo-content.

Notes: iter 255 RESEARCH — competitor-gap-scan-255:
  6 genuinely new BACKLOG items added (3 SHIPPED in iters 256-258).
  NEXT: iter 256 = BUILD.

Notes: iter 254 REVIEW — review-desc-trim-254:
  Audited iter251–253. 3 meta fixes. Gate GREEN e507147. NEXT: iter 255 RESEARCH.

Notes: iter 253 BUILD (tools → fell through to seo-content+monetization) — masada-visitor-guide:
  Gate GREEN e1d30be. NEXT: iter 254 REVIEW.

Notes: iter 252 BUILD (seo-content) — israel-horseback-riding:
  Gate GREEN 5ad7de3. NEXT: iter 253 BUILD tools.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 30 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260.
