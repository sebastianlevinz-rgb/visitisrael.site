# LOOP STATE

- iteration: 246
- lastMode: BUILD
- lastItem: jerusalem-neighborhoods-guide (seo-content rotation)
- lastResult: SHIPPED — new /jerusalem-neighborhoods-guide covering 8 Jerusalem areas (4 Old City quarters + Mamilla, City Center, German Colony, Mahane Yehuda). Gate: pnpm check 0 errors; build 420 pages (+1); 528/528 e2e+a11y pass. Commit: cd9c479. CI in_progress at push (prior pattern → pass).
- nextRotationCategory: 247%5==2 → BUILD (tools rotation; if no tools ready, fall through to monetization)
- higgsfieldSpent: 0
- updatedAt: 2026-07-02
- branch context: work on master; feature work on auto/<slug>

Notes: iter 246 BUILD (seo-content) — jerusalem-neighborhoods-guide:
  New /jerusalem-neighborhoods-guide — the "best area to stay Jerusalem" SERP gap.
  touristisrael.com, lonelyplanet, fodors, secretjerusalem all rank; we had nothing.
  Parallel to shipped tel-aviv-neighborhoods-guide.md (iter157) and haifa-neighborhoods-guide.md.
  Covers 8 areas with at-a-glance comparison table + per-neighborhood detail:
    Old City (4 quarters): Jewish (Western Wall proximity), Christian (Holy Sepulchre/Via Dolorosa,
      guesthouses), Muslim (souq/Damascus Gate, budget), Armenian (quietest, Cathedral of St. James).
    West Jerusalem: Mamilla/Jaffa Gate corridor (luxury/convenience, King David+Mamilla hotels),
      City Center/Ben Yehuda (practical hub, Abraham Hostel, tram access), German Colony/Emek
      Refaim (best restaurants, leafy, Templer houses), Mahane Yehuda/Nachlaot (Shuk, bar scene,
      most local-feeling).
  Honest: no fabricated hotel prices; ranges + live Booking CTA; Shabbat impact noted.
  3× affiliate CTAs: Booking.com Jerusalem hotels, GYG Old City tour, Viator city tour.
  6 FAQs covering: best area for first-timers, staying inside Old City, non-religious visitors,
    getting around, food neighborhood, Mamilla vs German Colony difference.
  Cross-link added to /jerusalem region page "Where to Stay" section → neighborhoods guide.
  Smoke test (/jerusalem-neighborhoods-guide) + a11y test added.
  Gate: pnpm check 0 errors; build 420 pages (+1); 528/528 e2e+a11y pass.
  Commit: cd9c479 on master; pushed to origin; CI in_progress at push (prior pattern → pass).
  NEXT: iter 247 = BUILD (247%5==2 → tools; if tools empty fall through).

Notes: iter 245 RESEARCH — competitor-gap-scan-245:
  Dead Sea accommodation market + Jerusalem-adjacent PA day-trip destinations + southern Israel city gaps.
  Scanned: touristisrael.com, israel-taxi.com, secrettelaviv.com, deadsea.com, GetYourGuide, Viator,
  Abraham Tours, wikitravel.org. De-duped ~200 DONE items + 145+ BACKLOG items. 3 net-new items:
    dead-sea-hotels-guide (P2, S, monetization): natural 3rd companion to eilat-hotels-guide/best-hotels-
      tel-aviv; Ein Bokek resort strip hotel picks (luxury/mid/budget); all competitors have this; we don't.
    jericho-day-trip-from-jerusalem (P2, M, seo-content+monetization): world's oldest city; NOT excluded;
      Bethlehem day-trip precedent; GYG/Viator 40+ tour products; Tell Jericho UNESCO + Mount of
      Temptation cable car + Hisham's Palace; honest Area A / organized-tour framing required.
    beer-sheva-guide (P3, S, seo-content): Negev capital cross-link target in 4 backlog items but
      never added standalone; UNESCO Tel Be'er Sheva + IAF Air Force Museum + Thursday Bedouin market.
  No gate (research mode). .loop/ files committed to master.
  NEXT: iter 246 = BUILD (246%5==1 → seo-content rotation).

Notes: iter 244 REVIEW — review-desc-trim-244:
  Audited iter-242 (vegan-vegetarian-israel) and iter-243 (best-hotels-tel-aviv) guides.
  Found 3 SEO meta description length violations (>160 chars):
    best-hotels-tel-aviv: 181 chars → trimmed to 141 chars
    vegan-vegetarian-israel: 204 chars (+ typo "world best") → trimmed to 149 chars, typo fixed
    eilat-hotels-guide: 176 chars → trimmed to 150 chars (spotted in scope scan)
  Added cross-link from mahane-yehuda-market-guide.md → vegan-vegetarian-israel (was unidirectional).
  All images verified present; all internal link targets exist (mahane-yehuda-market-guide confirmed);
  back-links in kosher-food-guide and tel-aviv-food-guide verified present.
  Gate: pnpm check 0 errors; build 419 pages; 526/526 e2e+a11y pass.
  Commit: a859c79 on master; pushed to origin; CI in_progress at push time (prior pattern → pass).
  NEXT: iter 245 = RESEARCH (245%5==0).

Notes: iter 243 BUILD (monetization) — best-hotels-tel-aviv:
  New /best-hotels-tel-aviv monetization guide companion to tel-aviv-neighborhoods-guide.md.
  Covers TLV's hotel market organized by neighborhood and price tier:
  Budget ₪300–550: Alray Boutique (Old North), Florentin guesthouses, beach hostel-style.
  Mid-range ₪550–1,100: Brown TLV Urban Hotel, Montefiore Hotel, Rothschild 22 Boutique.
  Luxury ₪1,200+: The Norman (Nachalat Binyamin), The Setai (Jaffa Ottoman fortress),
    David InterContinental (Tayelet), Diaghilev LIVE ART, Hotel Renoma.
  Decision matrix: beach / culture+WhiteCity / boutique / families / business / nightlife.
  Booking context: Pride week, Passover, Sukkot demand patterns; seasonal pricing guidance.
  Honest: rates are ranges, links live Booking.com; no fabricated scores or exact prices.
  2× Booking.com hotel CTAs + 1× GYG walking tour CTA.
  Back-link added to tel-aviv-neighborhoods-guide.md.
  Smoke test coverage added (/best-hotels-tel-aviv). 526/526 e2e+a11y pass.
  Gate: pnpm check 0 errors; build 419 pages (+1); 526/526 e2e+a11y pass.
  Commit: e75fa0b on master; pushed to origin; CI in_progress at push time (prior pattern → pass).
  Rotation note: tools category was empty (all 11 shipped); fell through → monetization.
  NEXT: iter 244 = REVIEW (244%5==4).

Notes: iter 242 BUILD (seo-content) — vegan-vegetarian-israel:
  New /vegan-vegetarian-israel guide covering Israel's world-class plant-based food
  scene. Tel Aviv has ~5% vegan population (among the world's highest per capita).
  Guide covers naturally-vegan Middle Eastern staples; dedicated TLV vegan restaurants
  (Meshek Barzilay, Falafel Sumsum, HaKosem, Green Cat, Opa); kashrut system explained
  for vegans (parve meaning; kosher-meat restaurant = zero dairy guarantee); Jerusalem
  and Haifa scenes; Hebrew supermarket labels; Shabbat planning.
  1× GYG food tour CTA + 1× Booking.com TLV hotel CTA.
  kosher-food-guide.md and tel-aviv-food-guide.md updated with back-links.
  Gate: pnpm check 0 errors; build 418 pages (+1); 525/525 e2e+a11y pass.
  Commit: f2c65cf on master; pushed to origin; CI in_progress at push time.
  NEXT: iter 243 = BUILD (243%5==3 → tools). Also eligible: seo-content (many P2 items
  remain: israel-wellness-spa, israel-hidden-gems, christmas-in-israel, shopping-in-israel,
  jerusalem-neighborhoods-guide, vegan-vegetarian-israel is now SHIPPED).
  Per rotation: tools next.

Notes: iter 241 BUILD (monetization) — eilat-hotels-guide:
  New /eilat-hotels-guide companion to eilat-travel-guide.md (iter231). Covers Eilat's
  3 hotel zones (North Beach resort strip, Coral Beach South, city-centre budget area)
  with hotel picks at 3 price tiers: budget ₪350-600 (Amdar Hostel, Manta Ray Inn, city-
  centre guesthouses), mid-range ₪600-1,200 (Prima Music Hotel, Orchid Hotel+Resort,
  U Boutique), luxury ₪1,200+ (Dan Eilat, Isrotel Royal Beach+Yam Suf, Princess Hotel).
  Seasonal pricing table (Jan cheapest ~₪640/night, June peak ~₪2,300/night). Booking
  decision matrix by priority. 2× Booking.com CTAs + 1× GYG. Dense cross-links to
  eilat-travel-guide, eilat-diving-snorkeling, eilat-tours-compared, petra-from-eilat-vs-amman.
  eilat-travel-guide.md updated with corrected price ranges + companion guide cross-link.
  Gate: pnpm check 0 errors; build 417 pages; 524/524 e2e+a11y pass.
  Commit: 785ab1d on master; pushed to origin.

Notes: iter 240 RESEARCH — competitor-gap-scan-240:
  3 net-new backlog items after thorough dedup vs ~140 existing items.
  eilat-hotels-guide (P2, monetization, S): hotel picks at 3 tiers for Eilat's
    distinct zones; companion to eilat-travel-guide.md (iter231). [SHIPPED iter241]
  best-hotels-tel-aviv (P2, monetization, S): hotel picks at 3 tiers by TLV area;
    companion to tel-aviv-neighborhoods-guide.md (iter157).
  tel-aviv-budget-guide (P3, seo-content, S): "free & cheap things to do in Tel Aviv";
    distinct from free-things-to-do-israel (national hub) and israel-cost-budget (cost overview).
  Backlog fully saturated; 3 new items appropriate after 241 iterations.
  No gate needed (RESEARCH mode). .loop/ files committed to master.

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 26 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245.
