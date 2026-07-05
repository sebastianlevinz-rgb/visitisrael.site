# LOOP STATE

- iteration: 309
- lastMode: REVIEW (309%5==4)
- lastItem: review-309-desc-fix — audited latrun-guide+dead-sea-medical-tourism+zichron-yaakov-guide; fixed 2 description overflows (164→160 latrun, 184→142 zichron); all links/images/H1/honesty clean; 458 pages; 593/593 pass
- lastResult: SHIPPED 08cd250 — CI in_progress at state-update time (prior run ba7c04df success)
- nextRotationCategory: 310%5==0 → RESEARCH mode
- higgsfieldSpent: 0
- updatedAt: 2026-07-05T11:40Z
- branch context: work on master; feature work on auto/<slug>

Notes: iter 309 REVIEW · review-309-desc-fix:
  Mode REVIEW (309%5==4). Audited iters 306-308 output (latrun-guide, dead-sea-medical-tourism,
  zichron-yaakov-guide). Two SEO desc overflows found and fixed:
  (1) latrun-guide.md: 164→160 chars (removed 'the ' before 'Trappist monastery winery').
  (2) zichron-yaakov-guide.md: 184→142 chars (rewritten: "Zichron Yaakov: Israel's oldest wine
      village, founded 1882. Carmel Winery tastings, Hameyasdim Street, Ramat Hanadiv gardens,
      Nili spy museum.").
  All internal links, hero/CTA images, H1 checks, honesty framing clean for all three guides.
  dead-sea-medical-tourism EU insurance claims well-caveated; no fabricated data detected.
  Gate: pnpm check 0 errors (119 files) · build 458 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: committed 08cd250 to master; pushed origin/master.
  NEXT: iter 310 → RESEARCH mode (310%5==0). Candidates: competitor scan for profitable new
    patterns; galilee-wine-trail + sea-of-galilee-guide (P2, M backlog items); fall/winter 2026
    season gaps; new comparison format opportunities; check backlog aging items.

Notes: iter 308 BUILD (tools→seo-content fallthrough) · zichron-yaakov-guide:
  Mode BUILD (308%5==3 → tools rotation). Tools category exhausted (all 11 items SHIPPED); technical
  also exhausted; fell through to seo-content. Picked zichron-yaakov-guide (P2, S) — explicitly
  named in STATE iter307 as top seo-content candidate; fills Carmel coast corridor gap between
  caesarea-guide and haifa-travel-guide (planned).
  New guide: /zichron-yaakov-guide. Content: Hameyasdim Street Ottoman-era pedestrian main street
  (Rothschild-planted eucalyptus, stone buildings, wine bars, artisan market); Carmel Winery visitor
  centre (Israel's oldest winery est. 1882; cellar tours + tastings ₪50-80; book at carmelwines.co.il;
  kosher; closed Shabbat); Ramat Hanadiv memorial gardens (free; Rothschild tomb + terraced rose/olive
  gardens + panoramic sea view; ramat-hanadiv.org.il); Nili Museum/Beit Aaronson (Aaron Aaronson + WWI
  spy network; limited hours; call ahead); getting there by train (Binyamina station, ~50 min TLV,
  ~40 min Haifa) and car (Route 2 + Route 70); Caesarea+Zichron one-day itinerary; seasonal table;
  7 FAQs. Affiliate CTAs: GYG Carmel wine tours + Discovercars coastal self-drive + Booking Zichron
  stays. Cross-links upgraded: day-trips-from-haifa (link added to /zichron-yaakov-guide text),
  caesarea-guide (Wikipedia link → /zichron-yaakov-guide with improved description),
  israel-wine-wineries (new sentence in Shomron/Mount Carmel section linking to guide).
  YAML fix: description used single-quoted YAML with apostrophe in "Israel's" — fixed to double quotes.
  Link fix: /where-to-stay/haifa doesn't exist (only jerusalem/tel-aviv/dead-sea) — replaced with
  /haifa region link.
  Gate: pnpm check 0 errors (119 files) · build 458 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master 7c67a4e; pushed origin/master.
  Prod: CI in_progress at state-update (prior 2 CI runs both success — 5bf7413, f862a88).
  NEXT: iter 309 → REVIEW mode (309%5==4). Candidates: audit iters 305-308 output:
    latrun-guide (iter307), dead-sea-medical-tourism (iter306), research-305, zichron-yaakov-guide (iter308).
    Top picks for audit: verify latrun-guide and zichron-yaakov-guide internal links, SEO meta,
    honesty framing, JSON-LD; check dead-sea-medical-tourism EU insurance claim accuracy.

Notes: iter 307 BUILD (seo-content) · latrun-guide:
  Mode BUILD (307%5==2 → seo-content). Picked latrun-guide (P2, S) — Route 1 corridor cluster
  between Tel Aviv and Jerusalem with zero prior editorial coverage on the site.
  New guide: /latrun-guide. Content: Yad La-Shiryon Armored Corps Museum (200+ AFVs, one of
  largest in Middle East, site of the decisive 1948 Battle of Latrun — multiple IDF assaults repulsed
  by Jordanian Arab Legion guarding the Jerusalem road; Burma Road workaround story); Trappist
  Monastery founded 1890 by French Cistercian monks (kosher wine + olive oil shop, open Mon-Sat);
  Mini Israel (350+ scale models at 1:25, family-oriented, summer evening visits); combined visit
  planning (all 3 sites within 3 km of each other at the Latrun junction on Route 3/Route 1);
  driving from Tel Aviv (~40 min) and Jerusalem (~35 min); public transport note (limited — car or
  guided tour recommended); seasonal planning; 7 FAQs. Affiliate CTAs: GYG guided tours +
  Viator private tours + DiscoverCars self-drive (car rental essential for Latrun).
  Cross-links added from: day-trips-from-tel-aviv.md, day-trips-from-jerusalem.md,
  israel-agritourism-guide.md. Dense internal links in body: car-rental-israel, transportation,
  israel-wine-wineries, best-tours-in-israel, itineraries.
  YAML bug fixed: Sha'ar HaGai apostrophe in single-quoted YAML broke frontmatter; switched to
  double-quoted answer string for the Jerusalem FAQ.
  Gate: pnpm check 0 errors (119 files) · build 457 pages (+1) · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master f862a88; pushed origin/master.
  Prod: CI in_progress at state-update (prior 2 CI runs success — b9d4e8b, 6e003dc both success).
  NEXT: iter 308 → BUILD (308%5==3 → tools rotation). Top tools candidates: free-day-trip-planner
    (P2, M — interactive day-trip composer), israel-visa-checker (P2, S — interactive ETA/visa
    tool), itinerary-builder-premium (P2, L). Also eligible: i18n Phase 3 (regions fr+de) or
    continuing batch 18 remainder. zichron-yaakov-guide (P2, S) remains next seo-content candidate.

Notes: iter 306 BUILD (monetization) · dead-sea-medical-tourism:
  Mode BUILD (306%5==1 → monetization). Picked dead-sea-medical-tourism (P2, M) — highest
  hotel-nights conversion potential: medical-stay patients book 21–28 nights vs 1-night leisure.
  New guide: /dead-sea-medical-tourism. Content: UVB mechanism at 430m below sea level explained
  (filters UVA, allows therapeutic UVB); clinical evidence summary (70–90% psoriasis clearance in
  peer-reviewed studies; honest remission framing); conditions treated (psoriasis, eczema, vitiligo,
  psoriatic arthritis); medical infrastructure at Ein Bokek (Paula Dead Sea Clinic, David Dead Sea
  Resort, Isrotel); EU insurance reimbursement by country (German GKV, Danish, Swiss, UK=not covered);
  cost table (₪500–1,200/night hotel + ₪300–600/week clinic fees; ~€4,500–7,500 all-in); seasonal
  planning; 7 FAQs. Cross-links from dead-sea-guide, israel-wellness-spa, israel-for-seniors. Footer
  link added. Affiliate CTAs: Booking.com Dead Sea + GYG day tours.
  Gate: pnpm check 0 errors (119 files) · build 456 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: squash-merged to master 6e003dc; pushed origin/master.
  Prod: Lighthouse completed success 6e003dc; CI in_progress at state-update (standard; all prior CIs green).
  NEXT: iter 307 → BUILD (307%5==2 → seo-content rotation). Top candidates: latrun-guide (P2, S),
    zichron-yaakov-guide (P2, S), sea-of-galilee-guide (P2, M), self-drive-road-trip (P2, M),
    backpacking-israel (P2, M), accessible-travel-israel (P2, M).
    i18n rotation: i18n Phase 3 (regions ×11 in fr+de) remains P2 ready — consider for iter 307 or 308.

Notes: iter 305 RESEARCH — research-305:
  Mode RESEARCH (305%5==0). Backlog extremely saturated (200+ ready items from 61+ passes).
  25+ candidate topics de-duped before confirming 5 genuine new gaps.
  Research methods: web-search agent + targeted grep de-duplication.
  Net-new items added (all grep-confirmed 0 hits in BACKLOG.md before adding):
  1. /zichron-yaakov-guide (P2, S) — Rothschild wine town 1882; Ha-Meyasdim Street; Carmel
     Winery visitor centre; Ramat HaNadiv gardens; Nili Museum; fills Carmel coast corridor
     gap between caesarea-guide.md and haifa-travel-guide.md
  2. /dead-sea-medical-tourism (P2, M) — climatotherapy for psoriasis/eczema; 3–4 week stays;
     EU health insurance schemes (German, Danish, Swiss); distinct from dead-sea-guide.md,
     israel-wellness-spa.md, dead-sea-hotels-guide.md; highest hotel-nights conversion potential
  3. /latrun-guide (P2, S) — Route 1 Tel Aviv–Jerusalem corridor cluster: Trappist monastery
     + Latrun wine (1890); Yad La-Shiryon tank museum (150+ AFVs — world class); Mini Israel;
     zero editorial coverage despite prime Route 1 position
  4. /galilee-wine-trail (P3, M) — Upper Galilee wine sub-region (Dalton, Galil Mountain, Adir,
     Lueria); 2-day self-drive circuit from Rosh Pina/Tiberias; distinct from golan-heights-
     wineries and judean-hills-wine-trail already in backlog
  5. /sea-of-galilee-guide (P2, M) — full lake circuit guide (all 4 shores + beaches ranked +
     Christian pilgrimage circuit + cycling + Hamat Gader); extends tiberias-guide.md (city only)
     to the whole lake; 4 shores = Ginosar/Capernaum/Tabgha west; Yardenit/Migdal north;
     Ein Gev/Kursi east; Tzemach/Hamat Gader south
  De-duped and skipped: beit-shean (iter90), mitzpe-ramon (iter80), rosh-pina (iter145),
    israel-cruise-ports (iter50), accessible-travel (iter215), rooftop-bars-tlv (iter255),
    autumn/spring (BACKLOG), chocolate-trail (iter240).
  Gate: N/A (research only — no code changes, no branch, no gate run).
  NEXT: iter 306 → BUILD (306%5==1 → monetization rotation). Top P1/P2 BUILD candidates:
    dead-sea-medical-tourism (P2, M — just added, high commercial intent, high nights-value),
    zichron-yaakov-guide (P2, S — fills Carmel coast corridor gap),
    latrun-guide (P2, S — quick S-effort, Route 1 corridor),
    sea-of-galilee-guide (P2, M — extends shipped tiberias-guide context),
    tel-dan-nature-reserve (P2, S — from iter300, still ready),
    safed-klezmer-festival (P2, S — from iter300, still ready).
    i18n rotation: check if i18n BUILD is due (every other BUILD iter); review I18N-PLAN.md
    for current batch status (fr 89/~147, de 89/~147; remaining untranslated EN guides).

Notes: iter 304 REVIEW — review-304-desc-fix:
  Mode REVIEW (304%5==4). Audited iters 301-303 output:
  - galilee-vs-golan-weekend (iter301) — comparison guide
  - dead-sea-vs-eilat (iter302) — comparison guide
  - fix-2027-holiday-dates (iter303) — technical fix to israel-effective-days.astro
  Findings:
  (1) CONFIRMED BUG: dead-sea-vs-eilat.md description was 165 chars (>160 limit).
      FIXED: removed "the " before "float" and before "Red Sea reef" → 157 chars.
  (2) CLEAN: galilee-vs-golan-weekend.md — title 55 chars ✓, desc 154 chars ✓;
      all internal links resolve (galilee, golan, golan/nimrod-fortress attraction,
      galilee-tours-compared, car-rental-israel, transportation, is-israel-safe);
      all 7 hero images present; affiliates (discovercars, booking) valid; no H1 in body;
      Golan disputed-territory note present; no fabricated data.
  (3) CLEAN: 2027 holiday dates in israel-effective-days.astro verified against
      Hebrew calendar arithmetic: RH Oct 1-2 ✓, YK Oct 10 ✓, Sukkot Oct 15+ ✓,
      Hanukkah Dec 24 ✓, Passover Apr 21 ✓, Yom HaZikaron May 11 ✓ (Iyar 4=Sunday,
      moved to Iyar 5=Monday per Shabbat-adjacency rule). Tisha B'Av Aug 12 consistent
      with iter303 Chabad verification (Cheshvan+Kislev both full = max length = Aug 12).
  (4) INFO: Shavuot marked as 2-day full for 2027 (Jun 10-11) — consistent with 2026
      convention (May 21-22); Israel observes 1 day but 2-day convention is pre-existing,
      not introduced by iter303. Not corrected (would require understanding original intent).
  (5) CLEAN: dead-sea-vs-eilat.md internal links verified (attraction URLs /dead-sea/masada,
      /dead-sea/ein-gedi, /dead-sea/qumran confirmed in attractions/ dir); all hero images
      present; affiliates (booking×2, getyourguide×2) valid; no H1 in body; no fabricated data.
      External link kalia.co.il is a legitimate beach reference, not affiliate.
  Gate: pnpm check 0 errors (119 files) · build 455 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: commit c192dba to master; pushed origin/master; CI Lighthouse in_progress (normal).
  NEXT: iter 305 → RESEARCH mode (305%5==0). Candidates: competitor scan for profitable
    new patterns; review backlog for items aging >3 months; fall/winter 2026-2027 season
    content gaps; i18n Phase 3 (regions in fr+de) assessment; new comparison-format opportunities.

Notes: iter 303 BUILD (tools→technical fallthrough) · fix-2027-holiday-dates:
  P1 technical: all 16 HOLIDAYS entries for 2027 were wrong — 5787 is a Hebrew leap year (Adar I + Adar II)
  but the original dataset used non-leap positions, placing every holiday ~1 month too early.
  Root cause confirmed via Hebcal Israel (i=on) + Chabad calendar searches.
  All corrections: Tu BiShvat Jan 22, Purim Mar 22 (Adar II), Passover Apr 21-28, Yom HaZikaron May 11,
  Yom Ha'atzmaut May 12, Shavuot Jun 10-11, Tisha B'Av Aug 12 only (fast day), RH Oct 1-2, YK Oct 10,
  Sukkot Oct 15-23, Hanukkah Dec 24-Jan 1 2028. Backlog suggested Jul 11 for Tisha B'Av (wrong calc) —
  actual correct date is Aug 12 per Chabad (9 Av 5787).
  Gate: pnpm check 0 errors (119 files) · build 455 pages · 593/593 e2e+a11y pass. GREEN.
  Ship: commit 392b4b2 to master; pushed origin/master; CI in_progress at commit time (standard).
  NEXT: iter 304 → REVIEW mode (304%5==4). Candidates: audit iters 301-303 output (galilee-vs-golan-weekend, dead-sea-vs-eilat, fix-2027-holiday-dates).

Notes: iter 300 RESEARCH — research-300:
  Mode RESEARCH (300%5==0). Backlog at iter300 extremely saturated (195+ items from 60+ research passes).
  Systematic grep de-duplication required across 30+ candidate topics before confirming 6 genuine new gaps.
  Research methods: local grep across 711-line BACKLOG.md + background web-search agent scanning competitors.
  Net-new items added (all verified 0 hits in BACKLOG.md before adding):
  1. /safed-klezmer-festival (P2, S) — annual klezmer festival in Safed; 0 klezmer hits confirmed
  2. /galilee-vs-golan-weekend (P2, S) — comparison format; 0 Galilee vs Golan comparison items confirmed
  3. /dead-sea-vs-eilat (P2, S) — comparison format; 0 Dead Sea vs Eilat comparison items confirmed
  4. /tel-dan-nature-reserve (P2, S) — standalone nature reserve guide; 0 tel-dan hits confirmed
  5. /israel-multigenerational-travel (P3, M) — 3-gen family travel; 0 multigenerational hits confirmed
  6. /jewish-quarter-jerusalem (P3, S) — archaeological dimension of Jewish Quarter; 0 standalone guide
  De-duped and skipped: israel-honeymoon (iter20), bachelorette (iter105), south-israel-itinerary (iter100),
    sports-events-israel (iter50), digital-nomad (iter30), northern-israel-road-trip (iter145),
    schottenstein-campus (iter235), israel-in-winter (SHIPPED iter292), haifa-food-guide (backlog),
    archaeological campus (backlog iter235), tel-aviv-budget (iter240), ein-gedi (SHIPPED iter232).
  Gate: N/A (research only — no code changes, no branch, no gate run).
  NEXT: iter 301 → BUILD (301%5==1 → monetization rotation). Top P1/P2 monetization BUILD candidates:
    egypt-jordan-israel-itinerary (P2 M), dead-sea-hotels-guide (P2 S), israel-galilee-agritourism (P2 M),
    israel-zimmer-guide (P2 M), galilee-vs-golan-weekend (P2 S — new, comparison = fast S-effort).
    i18n rotation: ~every other BUILD iter → Phase 3 regions (11 region pages in fr+de) or remaining
    untranslated EN guides. Check I18N-PLAN.md for current batch status before BUILD.

Notes: iter 299 REVIEW — review-299-fixes:
  Mode REVIEW (299%5==4). Audited iters 296–298 output: maccabiah-games-2026,
  israel-hidden-gems, jerusalem-nightlife.
  Findings:
  (1) CONFIRMED BUG: israel-hidden-gems.md — Nimrod Fortress practical section linked
      "Banias waterfall" to /caesarea-guide (a Mediterranean coast city guide).
      Banias waterfall is in the Golan Heights, near Nimrod Fortress. The correct
      link is /golan-heights-guide, which has a full Banias Nature Reserve section.
      FIXED: [Banias waterfall](/caesarea-guide) → [Banias waterfall](/golan-heights-guide)
  (2) SEO: maccabiah-games-2026.md description was 185 chars (>160 target). Trimmed to 139 chars.
      Note: the STATE.md entry for iter 296 recorded "163 chars ✓" which was incorrect — the
      actual description in the file was 185 chars after the "in Israel —" expansion. Fixed.
  (3) SEO: jerusalem-nightlife.md description was 162 chars (>160 target). Trimmed to 145 chars.
  (4) CLEAN: all internal links in all three files verified; all resolve correctly. Transport
      link /transport/jerusalem-to-dead-sea handled by dynamic [route].astro — valid. All hero
      images in expected paths. No H1 nodes in markdown bodies. No fabricated data detected.
      Affiliate rel attributes correct (generated by layout). Honesty framing appropriate.
  Gate: pnpm check 0 errors (119 files) · build 453 pages · 591/591 e2e+a11y pass. GREEN.
  Ship: commit 88f467a to master; pushed origin/master; CI Lighthouse + CI workflows in_progress
  at ship time (standard — these are unchanged-logic content-only fixes).
  NEXT: iter 300 → RESEARCH mode (300%5==0). Candidates: competitor scan for profitable new
    content patterns not yet in backlog; review backlog for items with >3 months since last
    research update; check for new Israel tourism initiatives/events for 2026-2027 season;
    scan for emerging keyword opportunities (Maccabiah aftermath, fall 2026 season content).

Cron b7325b16 hourly @ :17. Loop history: 19 tools + sitemap-lastmod + link-checker(+depth) + i18n
Phase0/1a/1b/1c/2 Batches1-18(COMPLETE) + 33 review passes + 3 technical (event-schema + meta-trim + locale-links) + 35 EN guides + 4 tools-monetization;
research iters 5/10/20/30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/105/110/115/120/125/130/135/140/145/150/155/160/165/170/175/180/185/190/195/200/205/210/215/220/225/230/235/240/245/250/255/260/265/270/275/280/285/290/295/300/305.
