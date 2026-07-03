# LOOP STATE

- iteration: 257
- lastMode: BUILD (seo-content rotation)
- lastItem: tel-aviv-coffee-guide — Tel Aviv specialty coffee & café culture guide
- lastResult: SHIPPED 979c59f — gate GREEN (0 errors; 429 pages +1; 544/544 e2e+a11y pass); CI in_progress at push
- nextRotationCategory: 258%5==3 → BUILD(tools) — but tools category depleted; expect fall-through to seo-content
- higgsfieldSpent: 0
- updatedAt: 2026-07-03
- branch context: work on master; feature work on auto/<slug>

Notes: iter 257 BUILD (seo-content rotation) — tel-aviv-coffee-guide:
  Picked tel-aviv-coffee-guide (P2, S) as top seo-content item: TLV third-wave specialty coffee
  scene; touristisrael.com competitor page confirmed; zero standalone guide on site; distinct from
  tel-aviv-food-guide (restaurants/markets only; no coffee depth) and vegan-vegetarian-israel.
  Content: Two-tradition hook (botz/Turkish-unfiltered vs third-wave specialty); 7 named cafés/
    roasters (Nahat, Cafelix, Caffe Tamati, Way Cup, Mae, Origem, Jera) — all framed as
    "consistently cited in Israeli food media as of 2026 research; verify current operations before
    visiting" (honesty: no fabricated ratings/follower counts/competition placements);
    Florentin→Neve Tzedek→Carmel Market→Rothschild→Gordon Beach neighbourhood circuit;
    botz (traditional) sourcing tips (market kiosks, Jaffa cafés, hummusiyot, Levinsky Market);
    Café culture: Shabbat opening (NOT kosher-obligated → open Saturday; key practical fact for
    tourists), sitting culture (Israeli 1-hour single-coffee etiquette), café kar (iced coffee
    year-round), tipping (10% table service), credit cards universal at specialty cafés;
    Coffee + food pairing section (cross-refs food guide + vegan guide).
  Affiliate CTAs: GYG "Tel Aviv Food Market Tour" (café stops on food tour circuits);
    Booking.com TLV boutique hotels (Florentin/Neve Tzedek/Rothschild corridor).
  7 FAQs: what TLV coffee is known for (botz + third-wave); Shabbat hours; cost (₪18–28 range);
    neighbourhood circuit; best roasters; iced coffee; guided tours.
  heroImage: /images/sub-destinations/tel-aviv/florentin.jpg (confirmed exists).
  Cross-links added: tel-aviv-food-guide (specialty coffee bullet +1); Footer Food column (+1 link).
    In body: tel-aviv-neighborhoods-guide, tel-aviv-carmel-market, vegan-vegetarian-israel,
    tel-aviv/old-jaffa all cross-linked.
  DISTINCT from: tel-aviv-food-guide (restaurants/markets; coffee added as 1 bullet pointing here);
    tel-aviv-carmel-market (market guide; Caffe Tamati mentioned as example + link back);
    vegan-vegetarian-israel (dietary preferences; not café culture); tel-aviv-nightlife (evening scene).
  Gate: pnpm check 0 errors; build 429 pages (+1 from 428); 544/544 e2e+a11y pass. GREEN.
  Ship: commit 979c59f on master; pushed to origin; CI in_progress at push time (consistent
    prior pattern; latest completed run for prior SHA = success).
  NEXT: iter 258 = BUILD (258%5==3 → tools rotation; tools category fully depleted → fall-through
    to seo-content; next P2 seo-content item = megiddo-jezreel-valley-guide (P2, M)).

Notes: iter 256 BUILD (monetization rotation → fell through to seo-content+monetization) — bahai-world-center-guide:
  Monetization category fully depleted (all items SHIPPED or ARCHIVED); fell through to
  seo-content+monetization. Picked bahai-world-center-guide (P2, S) as top item: ~1M visitors/year,
  UNESCO WHS 2008, zero standalone guide confirmed, highest-priority iter255 research addition.
  Gate: pnpm check 0 errors; build 428 pages (+1); 544/544 e2e+a11y pass. GREEN.
  Ship: commit bab8d1e on master; pushed to origin; CI in_progress at push time (consistent
    prior pattern → expected success). Lighthouse + CI workflows in_progress for SHA bab8d1e
    confirmed via GitHub Actions API.
  NEXT: iter 257 = BUILD (257%5==2 → seo-content rotation).

Notes: iter 255 RESEARCH — competitor-gap-scan-255:
  6 genuinely new BACKLOG items added:
    /tel-aviv-coffee-guide (P2, S) → SHIPPED iter257
    /bahai-world-center-guide (P2, S) → SHIPPED iter256
    /megiddo-jezreel-valley-guide (P2, M) — UNESCO WHS 2005; "Armageddon" name recognition
    /israel-night-hiking (P3, S) — summer adaptation; hike-israel.com competitor page
    /israel-camping-guide (P3, S) — ~40 INPA campgrounds; Shvil Yisrael through-hiker audience
    /israel-stand-up-paddle (P3, S) — Sea of Galilee, Mediterranean, Red Sea SUP
  NEXT: iter 256 = BUILD.

Notes: iter 254 REVIEW — review-desc-trim-254:
  Audited iter251–253. 3 meta fixes. Gate GREEN e507147. NEXT: iter 255 RESEARCH.

Notes: iter 253 BUILD (tools → fell through to seo-content+monetization) — masada-visitor-guide:
  Gate GREEN e1d30be. NEXT: iter 254 REVIEW.

Notes: iter 252 BUILD (seo-content) — israel-horseback-riding:
  Gate GREEN 5ad7de3. NEXT: iter 253 BUILD tools.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 29 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255.
