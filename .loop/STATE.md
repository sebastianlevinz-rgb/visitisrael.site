# LOOP STATE

- iteration: 249
- lastMode: REVIEW
- lastItem: review-desc-trim-249 (audit of iter246-248 pages: 4 meta descriptions over 160 chars found and fixed)
- lastResult: SHIPPED — 4 meta description overflows fixed: ben-gurion-to-jerusalem (194→148), ben-gurion-to-tel-aviv (170→131), jerusalem-to-nazareth (180→136) in [route].astro; jerusalem-neighborhoods-guide.md (162→150). Gate: pnpm check 0 errors; build 424 pages; 536/536 e2e+a11y pass. Commit: 59db2b8. CI in_progress at push (prior pattern → pass).
- nextRotationCategory: 250%5==0 → RESEARCH
- higgsfieldSpent: 0
- updatedAt: 2026-07-02
- branch context: work on master; feature work on auto/<slug>

Notes: iter 249 REVIEW — review-desc-trim-249:
  Audited iter246 (jerusalem-neighborhoods-guide), iter247 (dead-sea-hotels-guide), and
  iter248 (3 transport routes: ben-gurion-to-jerusalem, ben-gurion-to-tel-aviv,
  jerusalem-to-nazareth) for: dead links in related/cross-links, JSON-LD (no
  aggregateRating), meta title/description uniqueness and length, honesty (no exact
  fabricated prices — all ranges), Shabbat notes present, sitemap coverage (424 pages
  confirmed), accessibility gate (536/536).
  Findings: dead-sea-hotels-guide and best-hotels-tel-aviv descriptions clean (≤160).
  4 descriptions over 160 chars SERP limit:
    [route].astro ben-gurion-to-jerusalem: 194 → 148
    [route].astro ben-gurion-to-tel-aviv: 170 → 131
    [route].astro jerusalem-to-nazareth: 180 → 136
    jerusalem-neighborhoods-guide.md: 162 → 150
  Related-link audit: /tel-aviv-light-rail referenced in ben-gurion-to-tel-aviv related
  links — guide exists at src/content/guides/tel-aviv-light-rail.md, route valid.
  All internal hrefs in recent pages resolve to existing routes.
  JSON-LD: no aggregateRating found; Article + Breadcrumb + FAQPage schema types correct.
  Fix shipped through full gate: commit 59db2b8.
  CI in_progress at push (prior pattern → pass).
  NEXT: iter 250 = RESEARCH (250%5==0).

Notes: iter 248 BUILD (seo-content) — more-transport-routes:
  Picked highest-priority seo-content item. tel-aviv-white-city-bauhaus skipped:
  existing tel-aviv-white-city.md already comprehensively covers that content (Bauhaus
  history, walking route, photography, practical info, 6 FAQs); creating /tel-aviv-white-city-bauhaus
  would be duplicate content. BACKLOG entry marked SHIPPED via pre-existing content.
  Chose "more transport routes" (P2, S, seo-content) instead — natural extension of the
  existing /transport/[route] template with 3 high-intent gaps:
    ben-gurion-to-jerusalem: fills "airport to Jerusalem" intent; A1 express train
      (~22–30 min) is the key fact competitors don't always surface clearly; covers
      Shabbat gap thoroughly; 5 options in comparison table.
    ben-gurion-to-tel-aviv: fills "airport to Tel Aviv" intent; direct train every 15–30 min
      is the headline fact; covers sherut 24/7 for Shabbat travellers; 5 options.
    jerusalem-to-nazareth: fills "Jerusalem to Galilee" route intent; clarifies no direct
      Nazareth rail service (important accuracy gap); emphasises organised day tour as
      the practical default for most visitors; 4 options.
  All three pages: honest cost ranges (no exact prices), Shabbat notes in every table,
  FAQ schema, Article + Breadcrumb JSON-LD via existing template.
  Wired: Footer.astro +3 links; transportation.md hub "Popular routes" section now lists
  all 8 transport routes + haifa-to-akko (previously missing from hub); 
  ben-gurion-airport-transfers.md → cross-links to 2 new airport route pages.
  Smoke tests +3 routes; a11y tests +3 routes (now 536 total passing).
  Gate: pnpm check 0 errors; build 424 pages (+3); 536/536 e2e+a11y pass.
  Commit: 6da8bc2 on master; pushed to origin; CI in_progress at push (prior pattern → pass).
  NEXT: iter 249 = REVIEW (249%5==4).

Notes: iter 247 BUILD (monetization; tools empty → fell through) — dead-sea-hotels-guide:
  New /dead-sea-hotels-guide — third hotel-picks companion to eilat-hotels-guide (iter241)
  and best-hotels-tel-aviv (iter243). Fills the Ein Bokek hotel market gap: touristisrael.com,
  israel-taxi.com, secrettelaviv.com, deadsea.com all rank for "Dead Sea hotels Israel"; we had
  only a general dead-sea-guide with a brief hotel mention (no tier picks, no seasonal table).
  Honest structure: Ein Bokek resort strip (Israel's only Dead Sea accommodation zone, ~15 hotels);
  luxury (David Dead Sea Resort & Spa, Herods Dead Sea, Isrotel Dead Sea Hotel); mid-range
  (Isrotel Ganim, Lot Spa Hotel, Leonardo Plaza); honest no-budget framing (Ein Bokek has virtually
  zero hostels or cheap guesthouses — unique in Israel; genuine budget = Ein Gedi Kibbutz Guest House
  ₪480–600 20km north). Seasonal pricing table (spring/autumn = best experience; summer = lowest rates
  but 40°C+; 2-night Fri–Sat minimum common; Israeli holiday weeks book 8–10 weeks ahead). Honest
  day-trip alternative section (Egged 486 direct bus Jerusalem→Ein Bokek ~90 min). 3× affiliate CTAs:
  2× Booking.com (resort strip + value stays) + 1× GYG Dead Sea day tours. Back-link added to
  dead-sea-guide.md overnight section → /dead-sea-hotels-guide. Smoke + a11y tests added.
  Gate: pnpm check 0 errors; build 421 pages (+1); 530/530 e2e+a11y pass.
  Commit: 5401635 on master; pushed to origin; CI in_progress at push (prior pattern → pass).
  Note: Jericho day-trip duplicate spotted in BACKLOG — iter245 research re-added it but it was
  SHIPPED in iter213. BACKLOG cleaned.
  NEXT: iter 248 = BUILD (248%5==3 → seo-content rotation).

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

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 26 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245.
