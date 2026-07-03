# LOOP STATE

- iteration: 256
- lastMode: BUILD (seo-content+monetization; monetization category depleted → fell through)
- lastItem: bahai-world-center-guide — Bahá'í World Centre complete visitor guide
- lastResult: SHIPPED bab8d1e — gate GREEN (0 errors; 428 pages +1; 544/544 e2e+a11y pass); CI in_progress at push
- nextRotationCategory: 257%5==2 → BUILD(seo-content)
- higgsfieldSpent: 0
- updatedAt: 2026-07-03
- branch context: work on master; feature work on auto/<slug>

Notes: iter 256 BUILD (monetization rotation → fell through to seo-content+monetization) — bahai-world-center-guide:
  Monetization category fully depleted (all items SHIPPED or ARCHIVED); fell through to
  seo-content+monetization. Picked bahai-world-center-guide (P2, S) as top item: ~1M visitors/year,
  UNESCO WHS 2008, zero standalone guide confirmed, highest-priority iter255 research addition.
  Content: Haifa terraced gardens (19-terrace descent; free guided tour booking via bahai-haifa.org
    — advance registration required, 24h+ ahead; self-guided lower terraces; dress code enforced at
    gate; Bahá'í holy day closures listed: 8 dates; photography rules: gardens ✓, shrine interior ✗);
    Shrine of the Báb (gold-domed UNESCO structure; interior = Bahá'ís only — stated clearly);
    Bahá'í Faith brief background (historical context: Báb 1819–1850, Bahá'u'lláh exile to Akko);
    Akko sites: Shrine of Bahá'u'lláh at Bahjí (holiest Bahá'í site; formal Persian gardens;
    free entry; Friday afternoon closed; interior = pilgrims only; no public bus — taxi ₪35–50);
    Ridván Garden (island garden, Na'aman River); Mansion of Mazra'ih (check bahai.org.il for
    public access schedule). 2-day circuit (Day1 Haifa gardens+German Colony+Carmel ridge;
    Day2 Akko Old City+Bahjí+Ridván Garden). "What to know before you go" section emphasises
    religious site etiquette, photography rules, Friday afternoon closure, dress code.
  DISTINCT from: haifa-travel-guide (2-para overview only), haifa-neighborhoods-guide (neighbourhood
    context only), akko-acre-guide (1-line mention of Bahjí).
  Cross-links: haifa-travel-guide (cross-link added to Bahá'í section — directs to full guide),
    akko-acre-guide (Bahjí paragraph extended with /bahai-world-center-guide link),
    Footer Guides column (+1 link after akko-acre-guide).
  Affiliate CTAs: GYG "Haifa Bahá'í Gardens & City Walking Tour", Viator northern coast combo,
    Booking.com Haifa hotels.
  7 FAQs: advance booking required; non-Bahá'í shrine access (shrine interior = no); entry fee
    (free); visit duration; Bahjí worth visiting; dress code; can you do both sites in one day.
  Gate: pnpm check 0 errors; build 428 pages (+1); 544/544 e2e+a11y pass. GREEN.
  Ship: commit bab8d1e on master; pushed to origin; CI in_progress at push time (consistent
    prior pattern → expected success). Lighthouse + CI workflows in_progress for SHA bab8d1e
    confirmed via GitHub Actions API.
  NEXT: iter 257 = BUILD (257%5==2 → seo-content rotation).

Notes: iter 255 RESEARCH — competitor-gap-scan-255:
  Sites scanned: touristisrael.com (coffee + Bahá'í + Megiddo), bahai.org.il (official guide),
    coffeescouts.com (TLV specialty coffee scene), secrettelaviv.com/coffee, inpa.gov.il/megiddo,
    beinharimtours.com/megiddo, hike-israel.com/night-hiking, inpa.gov.il/camping,
    israeltrekking.com, israelnationaltrail.com, watersportisrael.com,
    tripadvisor.com/Israel-water-sports, redsea-divers.com, whc.unesco.org (UNESCO WHS citations).
  De-dup: wine-tourism (6+ backlog entries), cycling (backlog iter50), druze (SHIPPED iter193),
    craft-beer (SHIPPED iter236), street-art guide (P2 backlog), surfing (P2 backlog),
    glamping (P2 backlog), campervan (P2 backlog), waterfalls (partially SHIPPED water-hiking-israel),
    haifa-food (P3 backlog), arab-culture guide (P2 backlog),
    golan-heights-guide (CONFIRMED SHIPPED — exists in src/content/guides/).
  6 genuinely new BACKLOG items added:
    /tel-aviv-coffee-guide (P2, S) — TLV third-wave specialty coffee scene; tourist Israel competitor page;
      zero standalone guide on site; distinct from tel-aviv-food-guide
    /bahai-world-center-guide (P2, S) — ~1M visitors/year; UNESCO WHS 2008; zero dedicated guide;
      haifa-travel-guide + haifa-neighborhoods-guide + akko-acre-guide all mention briefly only → SHIPPED iter256
    /megiddo-jezreel-valley-guide (P2, M) — UNESCO WHS 2005; "Armageddon" name recognition;
      zero standalone guide; only 1-of-5 stop in day-trips-from-haifa
    /israel-night-hiking (P3, S) — documented Israeli summer adaptation (40°C+ days);
      hike-israel.com competitor page; zero night hiking content on site
    /israel-camping-guide (P3, S) — ~40 INPA campgrounds; Shvil Yisrael through-hiker audience;
      distinct from glamping-israel + israel-campervan both in backlog
    /israel-stand-up-paddle (P3, S) — Sea of Galilee, Mediterranean, Red Sea SUP;
      watersportisrael.com competitor; zero SUP content on site
  No gate (research mode). .loop/ files committed to master.
  NEXT: iter 256 = BUILD (256%5==1 → monetization rotation).

Notes: iter 254 REVIEW — review-desc-trim-254:
  Audited iter251 (israel-stargazing), iter252 (israel-horseback-riding), and
  iter253 (masada-visitor-guide) for: meta title/description lengths, hero image
  existence, internal link validity, honesty (no fabricated exact prices/ratings),
  JSON-LD schema.
  Findings:
    israel-stargazing desc: 161 chars → trimmed to 157 ('the best seasons' → 'best seasons')
    israel-horseback-riding desc: 164 chars → trimmed to 160 ('the best season' → 'best season')
    israel-horseback-riding title: 67 chars → trimmed to 56 (dropped 'Equestrian' from subtitle)
    masada-visitor-guide: all meta clean (title 65, desc 160 ✓)
  Hero images: all 7 image refs exist in public/images/ ✓
  Internal links: all 18 hrefs across three guides resolve to valid routes ✓
    /dead-sea/ein-gedi confirmed valid via [region]/[attraction].astro + dead-sea-ein-gedi.md
  No fabricated prices found; all prices are honest ranges ✓
  Fix: commit e507147, pushed to master. Gate: 0 errors; 427 pages; 542/542 pass. GREEN.
  CI in_progress at state-write (consistent prior pattern → success).
  NEXT: iter 255 = RESEARCH (255%5==0).

Notes: iter 253 BUILD (tools rotation → fell through to seo-content+monetization) — masada-visitor-guide:
  Tools category fully depleted (all 11 tools SHIPPED); technical also depleted → fell through to
  next available category (monetization/seo-content hybrid). Picked masada-visitor-guide as
  highest-priority P2, S-effort item from backlog not yet shipped.
  Gate: pnpm check 0 errors; build 427 pages (+1); 542/542 e2e+a11y pass. GREEN.
  Ship: committed to master e1d30be, pushed. CI in_progress at push; prior SHA c5a6e8d = success.
  Next: iter 254 = REVIEW (254%5==4).

Notes: iter 252 BUILD (seo-content) — israel-horseback-riding:
  Gate: pnpm check 0 errors; build 426 pages (+1); 540/540 e2e+a11y pass. GREEN.
  Commit: 5ad7de3 on master; pushed to origin; CI in_progress at push time.
  NEXT: iter 253 = BUILD (253%5==3 → tools rotation).

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 28 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255.
