# LOOP STATE

- iteration: 221
- lastMode: BUILD (monetization rotation)
- lastItem: galilee-christian-sites-circuit — new guide /galilee-christian-sites-circuit shipped; 513/513 e2e pass; commit 5fd40d4
- lastResult: COMPLETE — pnpm check 0 errors; build 405 pages (+1); 513/513 e2e+a11y pass; squash-merged to master; CI in_progress at state-write time
- nextRotationCategory: 222%5==2 → BUILD (seo-content rotation)
- higgsfieldSpent: 0
- updatedAt: 2026-07-01
- branch context: work on master; feature work on auto/<slug>

Notes: iter 221 BUILD (monetization) — galilee-christian-sites-circuit shipped:
  - New guide: /galilee-christian-sites-circuit — Galilee Christian sites self-drive
      circuit; P2 seo-content+monetization, M; picked from iter190 research backlog
  - Content: anti-clockwise ~45km loop from Tiberias hitting 5+1 NT sites:
      (1) Capernaum INPA park (Peter's house + 5th-c synagogue, ~₪35 INPA pass valid)
      (2) Church of the Multiplication (Tabgha) — original 5th-c Byzantine loaves mosaic,
          free, closes midday Fri
      (3) Church of the Beatitudes — 1938 octagonal Franciscan chapel, Galilee panorama, free
      (4) Church of the Primacy of Peter (Tabgha) — Mensa Christi rock, black basalt lakeside
          chapel, John 21 tradition, free
      (5) Magdala — 1st-c synagogue + Ark of Magdala + Duc in Altum centre, free
      (6) Kursi NP (optional extension, northeast shore, INPA pass valid)
  - Driving logistics: Route 90 anti-clockwise, all sites have car parks, timing guide
  - Heat/dress/photography practical tips; Nazareth combination guide
  - HONESTY: Transfiguration/Peter's house traditions clearly framed; no miracle claims
      beyond quoting scripture; no fabricated prices beyond INPA ~₪35 range
  - Affiliate CTAs: GYG Galilee Christian full-day tour, discovercars.com car rental,
      Booking Tiberias hotels
  - heroImage: /images/regions/galilee/capernaum.jpg (verified exists)
  - Cross-links added: christian-pilgrimage-holy-land.md → new circuit guide;
      galilee-tours-compared.md → new circuit guide (self-drive section)
  - Smoke test extended with /galilee-christian-sites-circuit route (512→513 total)
  - Gate: pnpm check 0 errors; build 405 pages (+1 vs 404); 513/513 e2e+a11y pass
  - Commit 5fd40d4 on master; pushed to origin; CI in_progress at state-write time
  - galilee-christian-heritage (P2 S, iter220 research duplicate) also consumed by this ship

Notes: iter 220 RESEARCH — 6 net-new backlog items:
  - israel-eta-guide (P2 S) — ETA-IL step-by-step guide; Jan 2025 mandatory for all visa-exempt
      visitors; official portal only (israel-entry.piba.gov.il); scam-site warnings required
  - haifa-neighborhoods-guide (P2 S) — 6 Haifa neighborhoods + where to stay; parallel to shipped
      /tel-aviv-neighborhoods-guide; haifa-travel-guide (iter192) covers activities but not areas
  - israel-by-month (P2 M) — month-by-month hub (12 cards); touristisrael.com/thingstodoinisrael.com
      both have format; distinct from best-time-to-visit-israel seasonal overview
  - israel-in-summer (P2 S) — companion to backlog /israel-in-winter; Jul-Aug families/school hols;
      heat safety angle differentiator; Masada/Negev/Dead Sea caveats; beach/festival highlights
  - temple-mount-visitor-guide (P2 M) — most-asked Jerusalem FAQ; PAIRED NAMING required throughout;
      plaza access only (never mosque interior); roughguides/lonelyplanet/timeout all rank; zero
      comprehensive coverage on site
  - galilee-christian-heritage (P2 S+monetization) — Capernaum→Tabgha→Mount of Beatitudes circuit;
      SHIPPED as galilee-christian-sites-circuit (iter221); this entry consumed
  - No gate / no ship (RESEARCH mode)
  - iter219 CI: fe074df pushed; CI in_progress at prior state-write time

Notes: iter 219 REVIEW — meta title/desc audit (iter216-218 guides):
  - Audited: jaffa-food-guide, mahane-yehuda-market-guide, herodion-guide
  - Violations fixed (3 meta + 1 dead link):
      jaffa-food-guide title 68→55 chars (dropped "in Old Jaffa" clause)
      mahane-yehuda desc 165→158 chars (dropped "famous ")
      herodion desc 204→148 chars (rewrote to fit 160-char limit)
      mahane-yehuda dead [guided food tour](#) → /israel-food-tours-cooking-classes
  - All hero images verified (4/4 exist); all internal link targets OK (11/11)
  - Gate: pnpm check 0 errors; build 404 pages (unchanged); 512/512 e2e+a11y pass
  - Commit fe074df on master; pushed; CI in_progress at state-write time
  - iter218 CI: 5b2a72b/5fb563d both show "success" in completed workflow list

Notes: iter 218 BUILD (seo-content, fallthrough from tools) — herodion-guide shipped:
  - New guide: /herodion-guide — King Herod's burial mountain, 12 km south of Jerusalem
  - Gate: pnpm check 0 errors; build 404 pages (+1); 512/512 e2e+a11y pass
  - Commit 5b2a72b on master; pushed to origin; CI in_progress at state-write time

Notes: iter 217 BUILD (seo-content) — mahane-yehuda-market-guide shipped:
  - Gate: pnpm check 0 errors; build 403 pages (+1); 511/511 e2e+a11y pass
  - Commit d6a84f9 on master; pushed to origin; CI in_progress at state-write time

Notes: iter 216 BUILD (monetization) — jaffa-food-guide shipped:
  - Gate: pnpm check 0 errors; build 402 pages (+1); 510/510 e2e+a11y pass
  - Commit 0eed122 on master; pushed to origin

Active items from recent research (all in BACKLOG, ready):
  iter200: /tel-aviv-street-art [P3 S]
  iter205: /israel-in-winter [P2 M], /hanukkah-in-israel [P3 S], /mount-carmel-hiking-guide [P3 S], /shavuot-in-israel [P3 S]
  iter210: /pet-friendly-israel [P2 M], /israel-with-baby [P2 S], /israel-by-train [P3 S]
  iter215: /easter-in-jerusalem [P2 M], /east-jerusalem-guide [P2 M], /beit-guvrin-caves-guide [P2 S], /galilee-food-guide [P3 S]
  iter220: /israel-eta-guide [P2 S], /haifa-neighborhoods-guide [P2 S], /israel-by-month [P2 M], /israel-in-summer [P2 S], /temple-mount-visitor-guide [P2 M]
  iter190: /galilee-christian-sites-circuit [SHIPPED iter221], /mount-tabor-guide [P2 S]

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 30 review passes + 3 technical (event-schema + meta-trim + locale-links) + 23 EN guides + 3 tools-monetization + 5 accuracy-fix + VAT-refund + israel-museum + golan-heights + review(204-title-fix) + research(205-6-items) + traveling-israel-jewish-holidays(206) + western-wall-tunnels-guide(207) + tower-of-david-guide(208) + review/meta-desc-fix(209) + research(210-5-items) + israeli-breakfast-guide(211) + netanya-guide(212) + jericho-day-trip-from-jerusalem(213) + review/meta-desc-fix(214) + research(215-6-items) + jaffa-food-guide(216) + mahane-yehuda-market-guide(217);
herodion-guide(218) + review/meta-desc-fix(219) + research(220-6-items) + galilee-christian-sites-circuit(221);
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220.
