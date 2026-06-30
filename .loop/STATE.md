# LOOP STATE

- iteration: 193
- lastMode: BUILD (193%5==3) — tools category exhausted (all shipped); fell through to seo-content
- lastItem: iter193 BUILD/seo-content (tools fallthrough) — /druze-villages-carmel Mount Carmel Druze Villages guide. Daliyat el-Carmel market, Druze pita on saj, Isfiya, Carmel National Park, El-Muhraka Monastery. 380 pages (+1). Gate: GREEN 475/475 tests.
- lastResult: SHIPPED — commit 1c842fa pushed to master. Cross-links updated: haifa-travel-guide + day-trips-from-haifa.
- nextRotationCategory: 194%5==4 → REVIEW mode
- higgsfieldSpent: 0
- updatedAt: 2026-06-30
- branch context: work on master; feature work on auto/<slug>

Notes: iter 193 BUILD/seo-content (tools fallthrough) — shipped /druze-villages-carmel:
  - P2/S seo-content item; tools category fully exhausted (all 11 tool pages shipped)
  - Fills gap: Carmel Druze villages mentioned in 3 places in haifa-travel-guide but had
    no standalone editorial guide; Golan Druze villages attraction existed but Carmel is
    far more accessible from Haifa (40 min vs 2h+)
  - Content: Druze community intro (monotheistic minority, IDF service, khalwat photography
    rules, no-doctrine-probing etiquette); Daliyat el-Carmel market (za'atar, spices,
    embroidery, honey, Druze Heritage Museum); Druze pita on the saj (defining culinary
    experience, Saturday = busiest); Isfiya (quieter, Haifa Bay panorama, maqlouba);
    Carmel National Park trailheads; El-Muhraka Monastery (1 Kings 18 Elijah site, Jezreel
    Valley rooftop panorama, restricted hours caveat); transport logistics (car recommended;
    no convenient direct bus); full-day Haifa+Druze combo itinerary
  - 7 FAQs covering: what the villages are, Druze pita, getting there, Shabbat visit,
    El-Muhraka, photography rules, best combination
  - 3 affiliate CTAs: GYG Haifa+Druze tour, Viator northern Israel day trip, Booking.com Haifa
  - Cross-links updated: haifa-travel-guide → /druze-villages-carmel (direct link); 
    day-trips-from-haifa → /druze-villages-carmel (added to trip list + car table)
  - smoke.spec.ts +1, a11y.spec.ts +1
  - Broken link fix: /golan-druze-villages → /golan/druze-villages (attraction URL pattern)

i18n batch 18 reminder: 3 guides still untranslated (petra-from-eilat-vs-amman, private-tours-israel,
  cheap-flights-to-israel) + 5 newly-shipped EN guides not yet in i18n
  (church-holy-sepulchre-guide, jerusalem-old-city-walking-tour, yad-vashem-visitor-guide,
  haifa-travel-guide, druze-villages-carmel).
NOTE for future DE iterations: watch for ASCII digraph substitutions (ae/oe/ue) in DE content.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(partial) + 26 review passes + 3 technical (event-schema + meta-trim + locale-links) + 19 EN guides + 3 tools-monetization + 4 accuracy-fix;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190.
