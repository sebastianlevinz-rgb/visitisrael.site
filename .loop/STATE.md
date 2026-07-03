# LOOP STATE

- iteration: 255
- lastMode: RESEARCH
- lastItem: competitor-gap-scan-255 — 6 new BACKLOG items (coffee guide, Bahá'í guide, Megiddo guide, night hiking, camping, SUP)
- lastResult: NO-SHIP (research mode) — 6 net-new BACKLOG items appended; no gate; .loop/ files committed to master
- nextRotationCategory: 256%5==1 → BUILD(monetization)
- higgsfieldSpent: 0
- updatedAt: 2026-07-03
- branch context: work on master; feature work on auto/<slug>

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
      haifa-travel-guide + haifa-neighborhoods-guide + akko-acre-guide all mention briefly only
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
  Content: Three access methods (Snake Path hike; cable car; predawn sunrise hike) with detailed
    comparison table; step-by-step sunrise hike DIY guide (04:00 gate open, head-torch required,
    advance ticket via parks.org.il); what to see inside fortress (Northern Palace/mosaics, Western
    Palace, ancient synagogue, Byzantine church, Roman siege wall, cisterns); Masada Sound+Light
    Show logistics (Tue+Thu evenings Mar–Oct, ~21:00 west side entrance); INPA National Parks Pass
    compatibility (pass covers entry; cable car not included — cross-link to calculator); practical
    tips (heat + timing, water, photo advice, combined visits). 6 FAQs. TourVerdict box.
    Event JSON-LD for Sound and Light Show 2026 (Mar–Oct).
  DISTINCT from: dead-sea-masada.md (attraction overview), masada-dead-sea-day-trip.md (organised
    tour booking), masada-tours-compared.md (operator comparison).
  Affiliate CTAs: GYG sunrise tours, Viator cable-car daytime, Booking.com Dead Sea hotels (Ein Bokek).
  Cross-links: national-parks-pass-calculator, israel-golden-hour, masada-tours-compared,
    masada-dead-sea-day-trip (added cross-link). Attraction page dead-sea-masada.md +cross-link.
    Footer Day Trips column +1 link (/masada-visitor-guide).
  Gate: pnpm check 0 errors; build 427 pages (+1); 542/542 e2e+a11y pass. GREEN.
  Ship: committed to master e1d30be, pushed. CI in_progress at push; prior SHA c5a6e8d = success.
  Prod: CI in_progress at state-write (consistent prior pattern → success).
  Next: iter 254 = REVIEW (254%5==4).

Notes: iter 252 BUILD (seo-content) — israel-horseback-riding:
  Picked top P2, S seo-content+monetization item (confirmed in BACKLOG twice via iter110 + iter250
  research; both entries now marked SHIPPED below).
  Content: 4 main riding centres (Vered HaGalil/Upper Galilee est.1961; Habokrim Ranch/Kibbutz
    Merom Golan; Moshav Ramot/southern Golan; Kibbutz Ein Dor/Jezreel Valley); what to expect on
    a trail ride; all-levels guidance; Jesus Trail cross-link angle (Galilee Christian pilgrimage
    overlap); season/planning table (Galilee/Golan vs Negev); weight/age limits (honest);
    booking advice; getting there (rental car required). 6 FAQs. TourVerdict box.
  Affiliate CTAs: GYG Galilee riding tours, Viator Israel horse experiences, Booking.com Galilee stays.
  Cross-links: Footer Essentials (after /hiking-in-israel); israel-adventure-sports end note.
  Gate: pnpm check 0 errors; build 426 pages (+1); 540/540 e2e+a11y pass. GREEN.
  Commit: 5ad7de3 on master; pushed to origin; CI in_progress at push time.
  NEXT: iter 253 = BUILD (253%5==3 → tools rotation).

Notes: iter 251 BUILD (monetization) — israel-stargazing:
  Picked highest-priority P2, S, seo-content+monetization item from iter250 BACKLOG additions.
  haifa-neighborhoods-guide skipped — confirmed SHIPPED iter223 (b60e624) via DONE.md grep;
  iter250 research had erroneously added it to BACKLOG without checking DONE.md. Marked ARCHIVED-DUPE.
  Chose israel-stargazing (P2, S) as first in-BACKLOG monetization item.
  Content: Mitzpe Ramon IDA-certified International Dark Sky Park (first in Middle East);
    operators (Desert Prime, Deep Desert Israel, Astronomy Israel); season/moon-phase table;
    guided vs self-guided; Summer of Stars August festival (Event schema); equipment checklist;
    getting there (car 2.5h TLV, bus Beersheba→Mitzpe); overnight vs day-trip;
    beyond Mitzpe (Arava, Eilat Mountains, Galilee). 6 FAQs. TourVerdict box.
  Affiliate CTAs: GYG stargazing tours, Viator Negev night sky, Booking.com Mitzpe Ramon hotels.
  Cross-links: Footer Essentials column; israel-evening-activities (Mitzpe section extended);
    israel-adventure-sports (end of guide).
  Gate: pnpm check 0 errors; build 425 pages (+1); 538/538 e2e+a11y pass. GREEN.
  Commit: 9c7cb08 on master; pushed to origin; CI in_progress at push time.
  NEXT: iter 252 = BUILD (252%5==2 → seo-content rotation).

Notes: iter 250 RESEARCH — competitor-gap-scan-250:
  Scanned: hike-israel.com, ecoisraeltours.com, aardvarkisrael.com, natureisrael.org,
  buckettripper.com, touristisrael.com (birdwatching + Haifa neighborhoods + rooftop bars),
  mukikapupstravels.com, desert-prime.com, deepdesertisrael.com, deserttimeisrael.com,
  astronomyisrael.com, ride-israel.com, hiddentrails.com, tripadvisor.com/Israel-horse-riding,
  therooftopguide.com/tel-aviv, timeout.com/israel/nightlife, igoogledisrael.com.
  5 confirmed new gaps (ZERO prior backlog entries for each):
    /israel-birdwatching (P2, M): Hula Valley (BBC Wildlife top-10 global site; 2M+ birds/day
      peak; Agamon Hula safari wagon sunrise tours); Eilat Bird Festival (March) + Hula Valley
      Birds Festival (November); 500+ species; ecoisraeltours.com tour affiliate angle.
    /haifa-neighborhoods-guide (P2, S): Natural 3rd in the series (TLV iter157 + Jerusalem
      iter246 SHIPPED); DISTINCT from haifa-travel-guide.md (iter192 general). German Colony
      (Bahá'í access, restaurants, Colony Hotel), Upper Carmel (views, hotels), Bat Galim
      (beachfront), Hadar (local/budget, Madatech), Downtown/Port (cruise). Carmelit funicular
      + cable car logistics = key differentiator. [NOTE: was already SHIPPED iter223 — iter250
      research error; marked ARCHIVED-DUPE in BACKLOG]
    /israel-stargazing (P2, S): Mitzpe Ramon = first IDA-certified International Dark Sky Park
      Middle East. Operators: Desert Prime, Deep Desert Israel, Astronomy Israel. Summer of Stars
      August event. DISTINCT from mitzpe-ramon-guide (general destination). → SHIPPED iter251.
    /israel-horseback-riding (P2, S): ride-israel.com + 15+ TripAdvisor operators. Vered
      HaGalil (est. 1961, Sea of Galilee views), Habokrim/Kibbutz Merom Golan, Moshav Ramot,
      Kibbutz Ein Dor. Jesus Trail overlap angle. DISTINCT from israel-adventure-sports.md
      (SHIPPED — horse riding not covered). → SHIPPED iter252.
    /israel-rooftop-bars-views (P3, S): Competitors: therooftopguide.com/tel-aviv,
      timeout.com, igoogledisrael.com. TLV: Haiku Sky Bar/Poli House/2C Azrieli Tower/SuraMare.
      Jerusalem: Mamilla Hotel/Austrian Hospice (free entry)/Galitzia Roof. Haifa: Dan Carmel.
      Free viewpoints sidebar adds practical value.
  No gate (research mode). .loop/ files committed to master.
  NEXT: iter 251 = BUILD (251%5==1 → monetization rotation).

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

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 31 review passes + 3 technical (event-schema + meta-trim + locale-links) + 27 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250.
