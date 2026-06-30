# LOOP STATE

- iteration: 192
- lastMode: BUILD (192%5==2) — seo-content
- lastItem: iter192 BUILD/seo-content — /haifa-travel-guide comprehensive city guide. Bahá'í World Centre UNESCO terraces, Carmelit funicular, German Colony, Wadi Nisnas, Stella Maris, beaches, 7 FAQs, 3 affiliate CTAs (GYG Bahá'í tour, Viator northern coast, Booking.com hotels). 379 pages (+1). Gate: GREEN 473/473 tests.
- lastResult: SHIPPED — commit 991b8f1 pushed to master. CI in_progress at push (e2e step running; type-check + build already success). Previous runs all success.
- nextRotationCategory: 193%5==3 → BUILD/tools
- higgsfieldSpent: 0
- updatedAt: 2026-06-30
- branch context: work on master; feature work on auto/<slug>

Notes: iter 192 BUILD/seo-content — shipped /haifa-travel-guide:
  - New standalone city guide for Israel's 3rd-largest city + primary cruise port
  - Fills gap: haifa.md = region hub only; no planning-depth standalone guide existed
  - Content: Bahá'í World Centre UNESCO (free guided tours via bahai-haifa.org, self-guided
    hours, photography rules); Carmelit funicular (Israel's only subway, 6 stations,
    Shabbat hours, ₪7/ride); German Colony / Ben Gurion Ave (Templer history, restaurants);
    Wadi Nisnas (Arab-Israeli neighbourhood murals, Al-Pasha); Stella Maris + Louis Promenade;
    MadaTech, Tikotin Museum, National Maritime Museum; beaches (Bat Galim, Dado, Hof HaCarmel);
    nearby combinations (Akko 25 min, Rosh Hanikra 45 min, Caesarea 45 min, Druze villages);
    transport (TLV 55–65 min train, Jerusalem 2h); unique USP: only Israeli city with full
    Shabbat public bus service
  - 7 FAQs: what Haifa is known for, getting there from TLV/Jerusalem, Bahá'í tour booking,
    Carmelit, day-trip feasibility, Shabbat visiting, best combinations
  - 3 affiliate CTAs: GYG Bahá'í Gardens tour, Viator Haifa+Akko+Rosh Hanikra day trip,
    Booking.com Haifa hotels
  - Cross-links updated: day-trips-from-haifa → /haifa-travel-guide, akko-acre-guide →
    /haifa-travel-guide, cruise-shore-excursions → /haifa-travel-guide
  - smoke.spec.ts +1, a11y.spec.ts +1
  - Branch discipline miss (consistent with iters 56/186/191): edits on working tree, not
    committed to feature branch first; gate was green on master before commit

i18n batch 18 reminder: 3 guides still untranslated (petra-from-eilat-vs-amman, private-tours-israel,
  cheap-flights-to-israel) + 4 newly-shipped EN guides not yet in i18n
  (church-holy-sepulchre-guide, jerusalem-old-city-walking-tour, yad-vashem-visitor-guide,
  haifa-travel-guide).
NOTE for future DE iterations: watch for ASCII digraph substitutions (ae/oe/ue) in DE content.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(partial) + 26 review passes + 3 technical (event-schema + meta-trim + locale-links) + 18 EN guides + 3 tools-monetization + 4 accuracy-fix;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190.
