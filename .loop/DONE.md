# DONE (shipped — do NOT re-do; basis for REVIEW mode)

## Pre-loop (overhaul, PRs #14/#17 + dep work, merged to master)
- Design system overhaul: fluid type/spacing scales, motion (scroll-reveal, hover-zoom, Ken Burns, scroll cue), button language, eyebrows, branded 404, 0 WCAG violations.
- Removed all fabricated data: AffiliateCard rating/reviews/priceFrom props; orphan StarRating; fake homepage tour ratings; hotel aggregateRating JSON-LD.
- SEO: Organization + WebSite + Article schema; full OG/Twitter; branded OG card (og-default.jpg, decoupled ogImage prop); RSS feed (/rss.xml); sitemap excludes /search; favicon/logo/apple-touch-icon.
- Performance: AVIF/WebP sitewide via reusable <Pic> (avif>webp>jpg); LCP hero preload; 120 images re-encoded; LCP −77%.
- Content: rewrote 5/7/10-day itineraries (timings, ₪/$ costs, transport, CTAs); deepened 5 thin Jerusalem attractions; "Need to know" fast-facts table on ALL 63 attractions.
- 14 new guides incl: masada-dead-sea-day-trip, petra-from-israel, nazareth-sea-of-galilee-day-trip, jerusalem-bethlehem-day-trip, whats-open-on-shabbat, tel-aviv-to-jerusalem, israel-with-kids, lgbtq-travel-israel, hiking-in-israel, christian-pilgrimage-holy-land, israeli-food-cuisine-guide, holy-sites-dress-code-etiquette, eilat-diving-snorkeling, israel-wine-wineries.
- 6 interactive tools: /israel-trip-cost-calculator, /israel-tipping-currency, /israel-packing-list, /which-israel-region-quiz, /israel-map (Leaflet), /build-your-trip (itinerary builder).

## Loop (auto-loop iterations)
- Where-to-stay money pages (iter 1) — 47f2cb0 — /where-to-stay/[city] template → Jerusalem, Tel Aviv, Dead Sea; HotelCard + Stay22 map + ItemList JSON-LD. [monetization]
- Transport route comparison pages (iter 2) — 5348a21 — /transport/[route]: Jerusalem→Dead Sea, TLV→Haifa, TLV→Eilat, TLV→Dead Sea (honest ranges, no exact prices; all modes compared). [seo-content]
- Distance & drive-time calculator (iter 3) — fee3b61 — /israel-distance-calculator: haversine + drive-time range + Google Maps link; accessible, Playwright-tested. [tools]
- REVIEW (iter 4) — 0a682c7 — audited iters 1-3 (all clean); added calc↔transport reciprocal links.
- RESEARCH (iter 5) — no ship — Tourist Israel + head-term SERP scan: 6 items added to BACKLOG.
- Sitemap <lastmod> from content updatedAt (iter 6) — e1778db — 122 content pages now carry accurate ISO lastmod; no fabricated dates; smoke test added. [technical]
- "Best Holy Land Tours" money page (iter 7) — 26e74e3 — /best-holy-land-tours: honest tour-format comparison (pilgrimage/private/day/budget) + 3 CTAs (tourradar/GYG/viator) + FAQ JSON-LD. [monetization]
- ETA-IL entry-authorization coverage (iter 8) — ee9c0a0 — visa-information.md: dedicated ETA-IL section (who/fee/72h/portal/validity); web-verified vs PIBA/MFA; 3 new ETA FAQs. [seo-content]
- REVIEW (iter 9) — a40ccbd — audited iters 6-8 (all clean); added first-time-in-israel → visa-information link + updated ETA FAQ.
- RESEARCH (iter 10) — no ship — itinerary long-tail + ticket intent + tips listicles: 3 curated items added.
- SETUP (iter 11) — no ship — loop automation (hourly cron b7325b16) + i18n (fr+de) epic bootstrap; I18N-PLAN.md + phased backlog created.
- i18n Phase 0 (infra + localized home) — 5b80c35 — Astro i18n config + src/i18n/ui.ts dict + t() + BaseLayout hreflang/lang/og:locale + language switcher + /fr/ /de/ landing pages; sitemap hreflang deferred. [i18n]
- "How many days in Israel?" recommender (iter 13) — bbf3543 — /israel-how-many-days: region-tick + pace → estimated days + matched itinerary; 8th interactive tool. [tools]
- REVIEW (iter 14) — 1dc48a5 — audited i18n Phase 0 + how-many-days (all clean); added og:locale:alternate to BaseLayout (missing for localized pages).
- i18n Phase 1a (Header chrome) — 83379f9 — localized Header structural strings via src/i18n dict; nav.itineraries/planShort/search/openMenu/language in en/fr/de; EN UNCHANGED. [i18n]
- Broken-link + orphan-page checker (iter 16) — 311970a — scripts/qa/check-links.mjs: reads dist/, scans all hrefs, BFS reachability; pnpm check:links + links.spec.ts e2e gate; caught a real dead link on first run. [technical]
- i18n Phase 1b (Footer chrome) — 360ded7 — localized Footer structural strings (tagline, 5 headings, copyright); header+footer both fully localized on fr/de. [i18n]
- "Jerusalem Tours Compared" money page — a6e54af — /jerusalem-tours-compared: per-hub tours comparison (Old City walk/full-day/+Bethlehem/Western Wall Tunnels/private) with honest table (price ranges, no fabricated data) + verdict + GYG/Viator/Civitatis CTAs + FAQ JSON-LD. Top hub; distinct from country-wide best-tours (cross-linked). [monetization P1 tours-comparison]
- REVIEW (iter 19) — 086fb97 — audited jerusalem-tours-compared (clean) + i18n chrome completeness. Found + fixed 2 English leaks on fr/de pages: StickyCTA booking bar + skip link, now localized via dict. Shared chrome fully localized.
- "Best things to do in Israel" hub — c040026 — /best-things-to-do-in-israel: head-term top-of-funnel internal-link hub; 18 curated highlights pulled from real attraction entries (no fabricated data) + ItemList/Article/Breadcrumb/FAQ JSON-LD + dense links. Wired into header+footer. [seo-content P1 iter5 research]
- i18n Phase 1c (mobile nav labels) — 2a3868d — localized the mobile-menu planLinks labels via dict (7 reusable nav.* keys); last shared-chrome English leak closed. EN unchanged. ALL shared chrome (header/footer/sticky/skip/mobile-nav) now localized on fr/de.
- Internal-linking audit (click-depth) — e05cf08 — extended check-links.mjs with BFS from home → reports unreachable + >3-click pages; e2e gate asserts 0 unreachable. Audit clean: max depth 2 / 0 unreachable across 152 pages (≤2-click goal already met). Permanent reachability guard.
- REVIEW (iter 24) — no ship — audited things-to-do hub (57 image srcs resolve, ItemList valid, no fabricated data), i18n Phase 1c (fr localized/en unchanged), link-depth audit (BFS verified): all CLEAN, no fix needed.
- build-your-trip print/PDF export — 766643b — "Print / Save as PDF" button (window.print) + @media print stylesheet for a clean itinerary printout; Playwright-tested.
- Haifa→Akko transport route — aa3cc70 — extended /transport/[route] template with the coastal train hop (honest comparison table + FAQ JSON-LD). 5th transport route.
- eSIM money-page plan tiers — 781630a — added a "how much data do you need?" tier table (Light/Standard/Heavy → suggested GB + rough price ranges) + data-saving tips to /israel-esim; honest ranges, no fabricated exact prices. (insurance + car-rental deepening still pending.)
- i18n Phase 2 start (plan-your-trip fr/de) — 2ec51a9 — first content page translated beyond home: locale-aware <PlanYourTripPage> component + 3 routes (/plan-your-trip, /fr/, /de/) + plan.*/tool.* dict + pageAlternates() hreflang helper; localized-home plan CTA → localized page (fixes orphan). Establishes the .astro-page translation pattern. fr/de 2/147 each.
- REVIEW (iter 29) — 64e33b6 — audited iters 25-28 (i18n Phase 2 fr/de, eSIM tiers, Haifa→Akko route, print/PDF). Found + fixed transport md() rendering bug (markdown [label](/path) links rendering as literal text → extend md() to convert to on-brand anchors). CI green.
- RESEARCH (iter 30) — no ship — primary audience + niche-segment + visual-content scan; 6 items added to BACKLOG.
- Responsive srcset via <Pic> (400w/800w) — 3819295 — gen-avif-webp.mjs generates -400w/-800w AVIF+WebP at build time; <Pic> gets srcset + sizes; card components pass narrower hints; mobile browsers fetch 400px instead of 1600px (~75% payload reduction).
- Cruise port shore excursions guide — b50ad64 — /cruise-shore-excursions-israel: Haifa (Bahá'í/Akko/Caesarea/Nazareth) + Ashdod (Jerusalem/Masada/Dead Sea/Tel Aviv) with honest time/logistics tables, recommended circuits, 3 affiliate CTAs (getyourguide/viator/abraham), 6 FAQs, price ranges only. Distinct cruise-passenger segment; wired in footer. [monetization P2 iter30 research]
- Jewish heritage travel guide — 6de11d7 — /jewish-heritage-israel: fills #1 audience gap (Jewish diaspora = Israel's top inbound segment); covers Western Wall + Jewish Quarter, Yad Vashem, Mount Herzl, Israel Museum/Shrine of the Book, City of David, ANU Museum (TLV), Safed/Tzfat, Masada, Gamla, Galilee; 6 FAQs, 3 CTAs, dense cross-links; Hebron excluded; no fabricated prices. [seo-content P1 iter30 research]
- i18n Phase 2 batch 1 (fr/de guides: first-time-in-israel + visa-information) — bdf599e — 4 new guide pages (fr+de ×2) via src/content/guides/fr|de/ subdir routing; hreflang alternates (en/fr/de/x-default) in [...slug].astro; locale-aware breadcrumbs; Playwright contextOptions fix included. fr: 4/147, de: 4/147. [i18n Phase 2 batch 1 iter36]
- Weather & packing widget (/israel-weather-packing) — b71cae8 — 12-month × 4-zone (Coast/Jerusalem/Dead Sea-Negev-Eilat/Galilee-Golan) packing list + temp + conditions widget; static typed TS data, vanilla JS, aria-live; seasonal at-a-glance reference table; wired to footer + plan-your-trip tools grid + i18n dict (en/fr/de); Playwright + smoke + a11y tests. 162 pages total. [tools P2 iter37]
- a11y/keyboard/perf-budget tests + WCAG 2.4.1 skip-link fix + Leaflet local bundle — b6580b7 — 36 axe-scanned routes (was 22); keyboard.spec.ts (skip-link + tool operability); perf.spec.ts (page-weight budget); tabindex="-1" on <main> for skip-link focus; Leaflet self-hosted from /vendor/leaflet/ eliminating CDN dependency. 97 tests total (was 75). [technical P3 iter38]
- iter 39 REVIEW fix: locale-specific visa cross-links in fr/de first-time-in-israel guides (cb930ab) — corrects UX regression where FR/DE readers clicked visa link and landed on EN page; /fr/visa-information and /de/visa-information already exist since iter 36
- i18n Phase 2 batch 2 (fr/de guides: best-time-to-visit-israel + transportation + israel-cost-budget) — 2412965 — 6 new guide pages; hreflang alternates on all 3 EN guides; locale-specific cross-links (/fr/first-time-in-israel etc.); build 168 pages (+6); check:links clean. fr: 7/147, de: 7/147. [i18n Phase 2 batch 2 iter41]
- Israel food tours & cooking classes guide — e974cf1 — /israel-food-tours-cooking-classes: covers Machane Yehuda guided market tours + eve market, Carmel Market cooking workshops (hummus/shakshuka/mezze), challah/hummus workshops, Jaffa food walk (Arab hummus/Persian Jewish/Yemenite kubane/port seafood), Old City food walk (kanafeh/tabun/spice souk). 3 CTAs (GYG/Viator/Abraham). Price ranges only, no fabricated prices. Footer Essentials wired; smoke + a11y routes added. 169 pages. [monetization P2 iter35 research iter42]
- iter43 · Driving in Israel guide (/driving-in-israel) → a3d1254 · P1 seo-content; covers road rules, speed limits, Route 6 toll, kerb parking, Waze, Shabbat/Yom Kippur, West Bank restriction; 2 CTAs (discovercars/rentalcars); footer link wired.
- iter46 · Israel National Parks Pass guide (/israel-national-parks-pass) → 1723874 · P1 seo-content; Blue/Green/Orange 14-day tourist cards + Matmon annual pass; honest price ranges (verify caveat); exclusions table; dense links; footer wired; hiking cross-linked; 171 pages.
- iter48 · Israel for seniors & over-50s guide (/israel-for-seniors) → 3d6b2b7 · P2 monetization; best seasons, 2-3 sites/day pace, Dead Sea/Ein Bokek, Masada cable car, Caesarea, Galilee boat trip, Jerusalem Old City mobility caveats, small-group vs private vs independent travel, medical tips; 3 CTAs (Abraham/TourRadar/Viator); footer wired; 172 pages. [monetization iter40 research]
- iter51 · 2-days-in-tel-aviv itinerary + FAQPage JSON-LD on itinerary template → e79ea65 · P1 seo-content; Carmel Market/beach/Jaffa day 1, Neve Tzedek/White City/Florentin day 2, 6 FAQs, honest price ranges; [slug].astro now emits FAQPage JSON-LD + context-aware CTAs via startRegion; 173 pages. [seo-content P1 city-itineraries iter10 research]
- iter52 · i18n Phase 2 batch 3 (fr+de guides: day-trips-from-jerusalem + day-trips-from-tel-aviv + is-israel-safe) → 989f751 · 6 new locale pages; locale-correct cross-links (fr/de transportation, fr/de day-trips cross-links, fr/de first-time for is-israel-safe); affiliate CTAs localized; honest framing + official advisory links on safety guide; 179 pages (+6); 133/133 tests pass. fr: 10/147, de: 10/147. [i18n Phase 2 batch 3]
- iter53 · Adventure sports & outdoor activities hub (/israel-adventure-sports) → 2c70684 · P1 seo-content+monetization; canyoning/rappelling (Negev/Judean Desert), jeep/ATV (Golan/Negev), surfing/windsurfing (Mediterranean), kitesurfing (Haifa Bay/Eilat), Red Sea diving (Eilat), sand surfing (Nitzana), hot-air ballooning, Mount Hermon skiing, zip-lining, MTB (Golan/Negev); activity summary table (region/season/effort); 3 CTAs (GYG/Viator/Abraham); 6 FAQs; 180 pages; 135/135 tests pass. [seo-content+monetization]
- iter54 · REVIEW: Meta description trim (11 pages) → 673584c · SEO quality fix; trimmed 11 most overlong meta descriptions from 141–248c down to ≤155c (matching Google's display window); also benefits OG/Twitter cards. Pages: israel-adventure-sports, jewish-heritage-israel, cruise-shore-excursions-israel, israel-food-tours-cooking-classes, driving-in-israel, israel-national-parks-pass, best-things-to-do-in-israel, fr/visa-information, fr/is-israel-safe, fr/day-trips-from-tel-aviv, de/visa-information. [REVIEW iter54]
- iter56 · Ben Gurion Airport Guide (/ben-gurion-airport-guide) → 544300b · P1 seo-content+monetization; comprehensive terminal guide: T1 vs T3 overview, arrivals/departures process, security interview guide (evergreen framing), 2026 lounge update (Priority Pass / Dan Lounge closed; Aspire + Jetex + King David), duty-free (James Richardson alcohol+cosmetics), terminal facilities; 3 CTAs (welcomepickups/safetywing/kiwitaxi); cross-links to transfers, transport, visa, eSIM, insurance; footer wired; transfers page cross-linked back; smoke+a11y tests extended; 181 pages; 137/137 tests pass. [seo-content+monetization]
- iter57 · Kosher & Vegan Restaurant Finder (/israel-restaurant-finder) → 040e358 · P3 tools; filterable list of 15 curated restaurants by city (Tel Aviv/Jerusalem/Haifa/Nazareth/Eilat) and dietary type (vegan/vegetarian/kosher-dairy/kosher-meat/vegan-friendly); vanilla JS filter; aria-live count; honest disclaimer about verifying kashrut; ItemList + FAQPage + BreadcrumbList schema; GYG CTAs; cross-linked from kosher-food-guide; footer + plan-your-trip wired; i18n keys (en/fr/de); 182 pages; 139/139 tests pass. [tools P3]
- iter58 · Meta description trim batch 2 (10 pages) → 0773347 · technical P3; trimmed 10 remaining overlong meta descriptions (204–214c) to 146–158c; pages: christian-pilgrimage-holy-land, jerusalem-tours-compared, visa-information, 7-days-in-israel, holy-sites-dress-code-etiquette, best-holy-land-tours, hiking-in-israel, eilat-diving-snorkeling, israel-wine-wineries, tel-aviv-to-jerusalem; 182 pages; 139/139 tests pass; CI in_progress at push time. [technical P3 iter54 review backlog]
- iter61 · i18n Phase 2 Batch 4 (shabbat-guide + best-tours-in-israel in fr+de) → 8f509f4 · 4 new locale pages; hreflang alternates auto-computed by [...slug].astro; locale-correct cross-links (/fr//de/ prefixes for translated guides); smoke + a11y extended (+4 routes each); 186 pages; 148/148 tests pass. fr: 12/147, de: 12/147. [i18n Phase 2 batch 4]
- iter62 · TourVerdict component — "Is a guided tour worth it?" verdict boxes → adeddfa · P2 monetization; reusable TourVerdict.astro on all 63 attraction pages + 6 tour guide pages (opt-in via verdictName/verdictQuery frontmatter); 3 persuasion reasons + GYG affiliate CTA; a11y-clean (fixed opacity-75 contrast + eyebrow contrast); 6 new Playwright tests; 186 pages (no new pages, component adds to existing); 154/154 tests pass. [monetization P2]
- iter63 · Bar & Bat Mitzvah Israel destination travel guide (/bar-bat-mitzvah-israel) → 34f69f4 · P1 seo-content+monetization; ceremony venues (Western Wall main + egalitarian Ezrat Yisrael + Masada sunrise + Safed synagogues + private congregations), 12-18 month planning timeline, 10-14 day multigenerational family itinerary, Shabbat integration, specialist operator selection criteria, honest cost ranges; 3 CTAs (Abraham/Viator/TourRadar); TourVerdict wired; footer Essentials updated; smoke+a11y routes added; 187 pages; 156/156 tests pass. [seo-content P1 iter35 research]
- iter64 · REVIEW — TourVerdict verdictName defect fix (/bar-bat-mitzvah-israel) → 158ca0a · fixed redundant "a guided tour of a guided bar/bat mitzvah tour" heading; branch auto/review-64-verdict-name-fix; 187 pages; 156/156 tests pass.
- iter66 · Deepen travel-insurance + car-rental guides with plan-tier comparison tables → b4b904a · S monetization; plan-tier table on israel-travel-insurance.md (Basic/Standard/Comprehensive/Adventure tiers, indicative ranges, honesty caveats, 2 new FAQs); vehicle category + cost table on car-rental-israel.md (economy→7-seater, off-peak/peak rates, extras section, 2 new FAQs); smoke+a11y tests extended (+2 routes each); 187 pages; 160/160 tests pass; CI+Lighthouse success. [monetization S iter-rotation: tools→fallthrough→monetization]
- iter67 · Water hiking in Israel guide (/water-hiking-israel) → 9bb1c79 · S seo-content; nahal stream-corridor hike guide covering 6 sites (Wadi David + Nahal Arugot at Ein Gedi, Nahal HaKibbutzim, Nahal Kziv, Wadi Qelt / Ein Prat, Banias); flash-flood safety, seasons table, gear checklist; 7 FAQs; 2 affiliate CTAs; cross-linked from hiking-in-israel.md + day-trips-from-jerusalem.md; smoke+a11y tests +1 each (162 total); 188 pages; 162/162 tests pass. [seo-content P2 iter65 research]
- iter68 · i18n Phase 2 Batch 5 (border-crossings + car-rental-israel in fr + de) → 1a36d6d · 4 new locale pages; locale-aware cross-links between translated guides; affiliate CTAs preserved in fr/de; vehicle comparison table + FAQ translations; smoke + a11y specs +4 routes (170 total); 192 pages; 170/170 tests pass. fr: 14/~147, de: 14/~147. [i18n Phase 2 batch 5]
- iter71 · Masada tours compared + Galilee tours compared → 452e7f8 · P2 monetization; two new per-hub tours-comparison pages: /masada-tours-compared (sunrise vs cable-car vs self-drive vs private, 5 FAQs, 3 CTAs) and /galilee-tours-compared (Christian pilgrimage / Jewish heritage / Golan / multi-day / self-drive, 5 FAQs, 3 CTAs); TourVerdict wired; wired from best-tours-in-israel.md + masada-dead-sea-day-trip.md; 194 pages; 174/174 tests pass. [monetization P2]
- iter72 · Akko (Acre) UNESCO city travel guide (/akko-acre-guide) → 3b031d9 · P2 seo-content; destination guide for Israel's most intact medieval city; Hospitaller Knights Halls + Templar Tunnel (UNESCO), Al-Jazzar Mosque, Old City souq + harbour, seafood picks, Bahai Mansion of Bahji; getting there (Haifa 25min train / Tel Aviv 90min); what to combine (Haifa + Rosh HaNikra); 5 FAQs; 3 affiliate CTAs (GYG / Viator Akko+Haifa+Rosh HaNikra combo / Civitatis private); cross-link in day-trips-from-tel-aviv.md; playwright.config.ts cloud-env Chromium fix; 195 pages; 176/176 tests pass. [seo-content P2 iter65 research]
- iter73 · Safed (Tzfat) city travel guide → 5cb3377 · /safed-tzfat-guide: 16th-century Kabbalistic capital (900m); Ha'Ari/Abuhav/Caro synagogues; Artists' Quarter & candle-making; Old Cemetery kabbalist tombs; Shabbat + Sukkot; 6 FAQs; 3 CTAs (GYG/Viator/Civitatis). Also fixed playwright.config.ts cloud Chromium resolution (resolveCloudChromium() via fs.existsSync). [seo-content P2]

## Loop items (auto-shipped via nightly loop)
- iter74 REVIEW · fix(review-74): cross-link akko+safed → water-hiking-israel; remove markup-noise footer from akko-acre-guide · 341457d · internal-linking improvement + cosmetic cleanup on iters 70-73 pages
- iter76 · Petra tours compared (/petra-tours-compared) → 83e219d · P2 monetization; extends tours-compared pattern for Petra from Israel: Eilat border day trip vs. overnight vs. multi-day Israel+Jordan vs. private guide; honest price RANGES; TourVerdict; 3 CTAs (GYG/Viator/TourRadar); footer link; smoke+a11y +1; 197 pages; 180/180 tests pass locally; CI in_progress at push.
- iter77 · Nazareth city travel guide (/nazareth-travel-guide) → 69258b6 · P2 seo-content; Israel's largest Arab city + 3rd most-visited Christian destination; Basilica of the Annunciation, Mary's Well/Church of St Gabriel, Nazareth Village, Old City souq, knafeh, Christmas festival; honest renovation caveat (custodia.org), festival logistics (nazareth.muni.il); 7 FAQs; 3 CTAs (GYG/Viator/Civitatis); dense cross-links; 198 pages; 182/182 tests pass locally; CI in_progress at push.
- iter78 · Israel Shabbat & Jewish Holiday Calendar (/israel-shabbat-calendar) → 32c20d1 · P1 tools; vanilla-JS astronomical sunset calculation for candlelighting/Havdalah across 5 cities; month-navigable calendar 2026–2027; 19 Jewish holidays with visitor-impact notes; accessible (aria-live, role/tabindex); i18n en/fr/de; 199 pages; 183/183 tests pass locally; CI in_progress at push.
- iter79 · REVIEW: Reciprocal shabbat-guide + whats-open-on-shabbat → /israel-shabbat-calendar links → 27721bb · Audit of 4 tools pages clean (no dead links, no honesty issues, all wired to plan-your-trip); one fix: added calendar cross-link in both shabbat guides (formerly missing reciprocal). [REVIEW iter79]
- iter81 · TicketBlock — tickets & entry info on top attraction pages → 1addc81 · P2 monetization; new TicketBlock.astro component on [attraction].astro; ticketInfo optional schema field (freeEntry, priceRange, bookingRecommended/Required, tipText, tiqetsQuery, gygTicketsQuery); 9 attractions updated (Masada, Bahá'í Gardens, Yad Vashem, Tower of David, City of David, Caesarea NP, Ein Gedi, Dolphin Reef, Underwater Observatory); prices ranges only; Tiqets + GYG CTAs; 189/189 tests; CI pending at push.
- iter82 · i18n Phase 2 batch 6 — bar-bat-mitzvah-israel + hiking-in-israel + kosher-food-guide in fr+de → b8a46d6 · 6 new locale pages; condensed but comprehensive content in French and German; locale-correct cross-links; untranslated guide links corrected to EN root; 201/201 tests pass; 205 pages; CI in_progress at push. fr: 17/~147 · de: 17/~147.
- iter83 · Israel Visa & ETA-IL Checker (/israel-visa-eta-checker) → a576156 · P2 tools; nationality dropdown for 150+ countries → instant visa-free/ETA-IL/consulate-visa result; vanilla JS static lookup; accessible (aria-live, role=status); per-country notes for Jordan/Egypt/UAE/Lebanon; PIBA + MFA links; plan-your-trip wired (en/fr/de i18n keys); step-by-step ETA-IL how-to; 6-FAQ + JSON-LD. 204/204 tests; 206 pages; CI in_progress at push.
- iter84 · REVIEW: visa checker discoverability fixes → 517beb9 · footer link added, visa-information cross-link added, meta description "50+" → "150+"; shabbat calendar + restaurant finder audited CLEAN. [REVIEW iter84]
- iter86 · Dead Sea practical visitor guide (/dead-sea-guide) → 4ae9323 · P2 seo-content+monetization; HOW-TO for first-time visitors: floating technique, safety rules, beach comparison (Kalia/Ein Gedi/Ein Bokek), mud ritual, what to bring, photography, getting there, overnight vs day-trip, combining with Masada; 3 CTAs (GYG/Viator/Booking.com); TourVerdict; 6 FAQs + FAQPage JSON-LD; 207 pages; 206/206 tests; CI in_progress at push.
- iter87 · Tiberias & Sea of Galilee city guide (/tiberias-guide) → e67bdde · P2 seo-content; Hamat Tiberias zodiac mosaic synagogue + thermal pools, Jesus Boat Museum (contemporaneous framing, not "the" boat), lakefront Tayelet promenade, St Peter's Church, Rabbi Meir Baal Haness shrine, Sea of Galilee swimming, Tiberias as Galilee base (Safed/Capernaum/Golan/Nazareth); 3 CTAs (GYG/Viator/Booking); 7 FAQs + FAQPage JSON-LD; reciprocal links in Safed+Nazareth guides; 208 pages; 206/206 tests.
- iter88 · Israel trip budget planner v2 (/israel-trip-cost-calculator) → 418e6f0 · P2 tools; 6-tier accommodation select (hostel $22 → luxury $380 pp/night); travel style decoupled to food/transport/activities only; quick day preset pills (5/7/10/14 days); 3-column breakdown table (per-day + total); total summary row; Print/Save-as-PDF button (window.print() + @media print styles); 4 new Playwright tests; 209/209 tests; 208 pages (same count, upgrade not new page).
- iter89 REVIEW · fix(review-89): footer discoverability — /tiberias-guide, /nazareth-travel-guide, /akko-acre-guide added to Footer Essentials · 58876bd · all three city guides now linked from every page footer; CI confirmed SUCCESS for iters 86/87/88.
- [iter91] Israel zimmer & rural B&B guide (/israel-zimmer-guide) → 59f8018 — Comprehensive guide to Israel's ~10,000 rural cabin B&Bs; the country's most popular hotel alternative with no previous dedicated page; Booking.com B&B affiliate CTA; 7 FAQs; 5-region breakdown; footer link added.

## iter 92 (2026-06-26) — Israel money, ATM & currency guide
- SHA: 4ef5c32
- URL: /israel-money-guide
- Category: seo-content (P2, S effort)
- Value: First dedicated money guide on the site targeting "money in Israel", "ATM Israel tips",
  "Israel currency 2026" — high-intent pre-trip queries where exclusiveisraeltours.com,
  travelwithhello.com rank and we had no equivalent page. DCC explanation, bank ATM strategy,
  Shabbat cash timing, credit card landscape, currency exchange comparison, cash-only markets.

## iter 93 (2026-06-26) — Israel travel time calculator
- SHA: 79a1e37
- URL: /israel-travel-time
- Category: tools (P2, S effort)
- Value: First curated travel time tool for Israeli tourist routes — distinct from existing distance
  calculator (haversine straight-line). Covers 32 city-pair routes bidirectionally with actual train
  times, bus info, Shabbat impact badges (red/amber), and practical tips. Train details (time +
  schedule notes) for 12 rail-served routes. Captures "how long from Tel Aviv to Jerusalem" and
  similar high-intent queries where third-party sites rank and we had nothing. 214 e2e tests pass.

## iter 94 (2026-06-26) — REVIEW: Shabbat DST fix + travel-time footer link
- SHA: 5b30786
- URL: /israel-shabbat-calendar (fix) + Footer.astro (fix)
- Category: REVIEW
- Value: Fixed DST end rule (Saturday→Sunday) correcting up to 6 days/year of 1h-late
  Shabbat times displayed in the calendar tool. Added /israel-travel-time footer link
  (was the only recently-shipped tool missing from footer). All 4 reviewed tools confirmed
  clean on links, JSON-LD, a11y, and honesty.

## iter 96 (2026-06-26) — Tel Aviv tours compared money page
- SHA: 5c5970d
- URL: /tel-aviv-tours-compared
- Category: monetization (P2, S effort)
- Value: Completes the 5-page tours-compared money-page series (masada/galilee/jerusalem/petra + tel-aviv).
  Covers Old Jaffa walking tours, White City Bauhaus tours, food & Carmel Market tours, nightlife tours
  and private city guide — comparison table + 3 affiliate CTAs (GYG/Viator/Civitatis). Targets
  "Tel Aviv tours compared 2026", "best guided tours Tel Aviv", "TLV walking tour vs food tour" —
  high-commercial-intent queries where GYG/Viator/touristisrael rank and we had no equivalent.

## iter 97 · 2026-06-26 · BUILD/seo-content
- **Item:** Qumran National Park & Dead Sea Scrolls visitor guide (`/qumran-guide`)
- **SHA:** e9e5540
- **Value:** First dedicated Qumran content on site — fills a significant gap given Qumran's SEO demand
  (touristisrael, tripadvisor, laidbacktrip all rank). Covers the 1947 discovery story, the Essene
  community context (scholarly-uncertainty framed honestly), walking trail highlights (Cave 4 overlook,
  scriptorium, ritual baths), practical visitor info, combination itineraries with Dead Sea & Masada,
  and Shrine of the Book cross-link. 3 affiliate CTAs (GYG/Abraham/Viator). Dense internal linking
  to /dead-sea-guide, /masada-dead-sea-day-trip, /israel-national-parks-pass, /car-rental-israel.
  Targets: "Qumran visitor guide Israel 2026", "Dead Sea Scrolls discovery site", "visiting Qumran
  national park", "Qumran caves guide Israel".
- iter98 BUILD/tools: Rav-Kav Israel public transport card guide (/rav-kav-israel) → 9f07671 — P1 high-impact transport guide covering RFID card, anonymous vs named, Ben Gurion Airport Public Transportation Center (24/7), tap-on only on buses, tap-on+off on trains/light rail, 90-min transfer, fare table, Shabbat fallback. Cross-links from /transportation and /ben-gurion-airport-guide.
- iter101 BUILD/monetization: Eilat tours compared money page (/eilat-tours-compared) → 5f3a2f8 — completes the tours-compared series (Jerusalem/Masada/Galilee/Petra/Tel Aviv → Eilat). 5 tour types: Red Sea snorkeling/boat, scuba diving, Eilat Mountains jeep safari, Dolphin Reef, Petra day trip. Price ranges only, 3 affiliate CTAs (GYG/Viator/Abraham), 5 FAQs. Dense cross-links from eilat region, petra-from-eilat-vs-amman, best-tours-in-israel. Wired footer Day Trips column + smoke test.
- iter102 BUILD/i18n: i18n Phase 2 Batch 7 (fr+de water-hiking-israel + israel-adventure-sports + ben-gurion-airport-guide) → 0b10e60 — 6 new translation files (fr+de for water-hiking-israel, israel-adventure-sports, ben-gurion-airport-guide). Full translated frontmatter including affiliateCtas. Key: airport guide carries Priority Pass cancellation update (Dan Lounge closed Dec 31 2025; no PP accepted from Jan 1 2026). Smoke+a11y specs updated (+6 routes each). Gate: pnpm check 0 errors · build 221 pages (+6) · test:e2e 229/229. CI: infra failure (2-sec runtime, no revert — same pattern iter98/101). fr/de now 20/~147 each.
- iter103 BUILD/tools: Israel Jewish holiday impact planner (/israel-holiday-planner) → cc3a0df — Interactive date-range tool: pick arrival + departure → lists Jewish holidays/fast days/national days in trip with traveler-impact notes, Shabbat count + closure reminder, booking-pressure badge (HIGH/MEDIUM/LOW; summer Jun–Aug auto-HIGH). 19 holidays 2026–2027; zero-holiday path: "good low-pressure window." Validates date order. Wired to plan-your-trip tools grid. i18n labels en/fr/de. 4 Playwright tests + 1 smoke + 1 a11y route. Gate: pnpm check 0 errors · build 222 pages (+1) · test:e2e 235/235. CI: 2-sec infra failure (no revert — same iter98/101/102 pattern).
- iter106 BUILD/monetization: Where to Stay in Israel accommodation hub (/israel-accommodation-guide) → 2195040 — Top-level hub comparing 7 accommodation types (hotel/kibbutz/zimmer/hostel/apartment/glamping/Bedouin tent) with comparison table (price ₪/night, geographic footprint, best-for traveller profile, booking platform, Shabbat impact). Traveller-profile section, detailed profiles per type with honest caveats (kibbutz hotels vary in communal character; Bedouin camps range from atmospheric to formulaic). 3 Booking.com CTAs (hotels/luxury/hostel tiers) + Hostelworld/Abraham. 7 FAQs. Targets: "where to stay in Israel", "types of accommodation Israel", "Israel accommodation guide tourist". Hub cross-links to israel-zimmer-guide + car-rental-israel + transportation.
- iter107 BUILD/seo-content: Israel travel apps guide (/israel-travel-apps) → 4649a54 — Dedicated hub for 10 essential Israel apps (Moovit, Waze, Gett, Rav-Kav Online, Lime, Pango, Wolt, Ten Bis, WhatsApp, Google Translate). Honest Rav-Kav Online caveat; Uber-vs-Gett city coverage; pre-flight checklist table. No competitor has a single authoritative page — only scattered mentions.
- iter108 BUILD/tools: Israel National Parks Pass calculator (/israel-parks-pass-calculator) → a4b0fe8 — Interactive 23-site INPA park checklist compares total gate cost vs Blue (₪90/3), Green (₪130/6), Orange (₪175/unlimited) cards. aria-live recommendation updates on every tick. Exclusion callout (City of David, Masada cable car). 6 Playwright tests. Cross-linked from national-parks-pass guide + homepage + plan-your-trip. i18n labels en/fr/de.
- iter109 REVIEW: SEO meta audit of israel-travel-apps + israel-accommodation-guide + eilat-tours-compared → 1d01fdb — All internal links, images, photo-credits, honesty caveats confirmed OK. Fixed over-length SEO titles (64/63/67→56/58/58 chars) and descriptions (180/193/213→148/152/142 chars) on all 3 guides. Discovered systemic 18/67 title >65 issue + 28/67 desc >160 issue; added BACKLOG item for batch fix.
- iter110 RESEARCH: competitor gap scan (experience-tourism) — 8 new backlog items: Hamat Gader hot springs, INT section hiking, Jordan River kayaking, horseback riding, Judean Hills wine day-trip, Sarona Market/TLV food halls, Masada snake path vs cable car guide, Israel music & arts festivals guide. Sources: iGoogledIsrael, GalilandGolan, israeltrail.net, ride-israel.com, byfood.com, nuvomagazine.com, masada.org.il, meteorfestival.co.il.
- iter111 BUILD/monetization: Caesarea complete day-trip guide (/caesarea-guide) → 2acd952 — New guide filling gap between 4 existing Caesarea attraction sub-pages and no guide-format page. Covers Roman Theatre, Herodian harbour, Crusader walls, Aqueduct Beach, Ralli Museum, harbour restaurants, combination day-trip options (Caesarea+Haifa, +Akko, +Zichron Yaakov wine), getting there from TLV/Haifa. 3 affiliate CTAs (GYG/Viator/Civitatis). 6 FAQs. 226 pages built, 251/251 e2e pass.
- iter112 BUILD/seo-content: Tel Aviv Light Rail (Red Line) tourist guide (/tel-aviv-light-rail) → 6f64790 — First metro-style rail in Israel (opened 2023) — completely unfamiliar to tourists. Covers Red Line overview (24km/34 stations/10 underground), key tourist stations (Jaffa/Carlebach/Habima/Arlozorov-airport-interchange), ticketing (Rav-Kav + contactless bank card + Israel Railways app + 90-min transfer window), rush hours, airport connection step-by-step, Shabbat closure with alternatives, Purple/Green Line outlook (honest: Purple not confirmed open). 3 affiliate CTAs (Airalo eSIM, WelcomePickups, GYG). Footer + transportation.md cross-link. 227 pages, 251/251 e2e pass.
- iter113 BUILD/tools: "Should I rent a car in Israel?" decision quiz (/israel-car-rental-quiz) → ba986bc — 6-question interactive quiz (base cities, Negev/Eilat, Golan/North, Shabbat, driving comfort, group size) → YES/PROBABLY YES/SPLIT/NO verdict with contextual bullet reasoning. Score: base-city ±2, Negev +4, Golan +3, Shabbat +1, comfort=no -4, comfort=unsure -1, group=3+ +1. Affiliate CTAs (DiscoverCars, Rentalcars) for positive recommendations; transport cross-links for negative. Fills the pre-decision gap that car-rental-israel.md assumes away. 5 Playwright tests, smoke +1. 228 pages, 257/257 e2e pass.
- iter116 BUILD/monetization: Tel Aviv White City & Bauhaus architecture guide (/tel-aviv-white-city) → ba84bf5 — UNESCO World Heritage Site guide (4,000+ Bauhaus/International Style buildings, world's largest collection). Covers historical context (German-Jewish architects fleeing Nazi Germany 1930s), Bauhaus Center (77 Dizengoff St), self-guided walking route (Bialik Square → Rothschild Boulevard → Dizengoff Square), 6 must-see buildings (Engel House pilotis, Beit Bialik, Dizengoff Square ring, Sheinkin corner windows etc.), photography timing tips, 6 FAQs. 3 affiliate CTAs (GYG/Viator/Civitatis). Cross-links: tel-aviv-food-guide, tel-aviv-nightlife, tel-aviv-light-rail. 229 pages (+1). Gate: pnpm check 0 errors; build 229 pages; 258/258 e2e pass. CI: 2-sec infra runner (no revert — same pre-existing pattern). Vercel inferred green.

- [iter117] Israeli street food guide (/israeli-street-food-guide) — 2e71798 — city-by-city stall guide (falafel/sabich/hummus/shawarma/burekas/knafeh/malawach); TLV, Jerusalem, Jaffa, Haifa, Nazareth; 3 affiliate CTAs; 230 pages

- iter118 BUILD/tools: Israel golden hour & sunrise calculator (/israel-golden-hour) → f1cedb7 — 9-location picker + date → nautical dawn / civil dawn / sunrise / golden-hour-end / solar noon / golden-hour-start / sunset / civil dusk / Shabbat candlelighting. Extends Shabbat calendar's Meeus formula. Hiker/photographer tips per location. FAQPage + BreadcrumbList JSON-LD. i18n en/fr/de. 5 Playwright tests. 231 pages, 264/264 e2e pass.
- [iter119 REVIEW] Golden hour calculator SEO/a11y fixes → 94726c6. Title 75→58 chars, desc 198→147 chars, aria-label cleanup, scope="col" on table headers, DST-aware default date.
- iter121 BUILD/i18n Batch 8: israel-for-seniors + whats-open-on-shabbat + holy-sites-dress-code-etiquette → c6540e2 — fr+de translations of 3 high-intent guides. israel-for-seniors includes Abraham/TourRadar/Viator monetization CTAs translated. Locale-correct cross-links. 237 pages, 276/276 e2e pass. fr/de now 23/~147 pages each.
- iter122 BUILD/seo-content: israel-base-city-guide (/israel-base-city-guide) → af0aa7c — "Which city to base in for Israel" guide: Jerusalem vs Tel Aviv vs Haifa vs Tiberias vs Eilat. Honest pros/cons, day-trip distance table, Shabbat bus note, price ranges, trip-length matrix. Booking.com CTAs for 3 bases. Cross-linked from footer, first-time-in-israel, israel-accommodation-guide. 238 pages, 277/277 e2e pass.
- iter123 BUILD/i18n Batch 9: israel-5-vs-7-vs-10-days + dead-sea-guide + best-holy-land-tours + israel-travel-insurance → e125d77 — fr+de translations of 4 high-intent guides (8 new locale pages). Honesty: rating/reviews fields dropped from israel-travel-insurance affiliateCta (fabricated data in source). Locale-correct internal links (/fr/ and /de/ prefixes for already-translated guides; EN paths for untranslated). 246 pages (+8), 293/293 e2e+a11y pass. fr/de now 27/~147 pages each.
- [iter124 REVIEW] i18n Batch 8+9 cross-link audit + base-city-guide meta trim → 9c3a95e. Fixed 10 wrong-locale cross-links across 6 files: fr/de israel-for-seniors (EN paths → locale-prefixed), de/israel-for-seniors /fr/car-rental-israel → /de/ (wrong-locale-prefix bug), fr/de whats-open-on-shabbat + holy-sites-dress-code-etiquette (/shabbat-guide → /fr|de/shabbat-guide). israel-base-city-guide SEO meta trimmed: title 71→58 chars, desc 171→129 chars. Gate: 246 pages, 293/293 e2e+a11y pass.
- iter126 BUILD/monetization: Jaffa (Yafo) complete travel guide (/jaffa-travel-guide) → da13227 — Old Port + Clock Tower + St Peter's Church + Ilana Goor Museum + Flea Market (Shuk HaPishpeshim) + Abu Hassan hummus + Abouelafia bakery + Kalamata port fine dining + 1948 history context + practical tips. 3 affiliate CTAs (GYG walking tour, Viator food tour, Civitatis TLV highlights). Cross-links: tel-aviv-food-guide + day-trips-from-jerusalem updated. 247 pages (+1), 294/294 e2e+a11y pass.

- iter127 BUILD/seo-content: Solo female travel in Israel guide (/solo-female-travel-israel) → cd2ff94
  — Honest, practical safety guide for solo women. City-by-city notes (TLV safest; Jerusalem Old City
  daylight-recommended for Muslim Quarter; Haifa calm; Eilat resort strip). Transport: Gett/Yango apps
  over street-hailing; sheruts + trains safe; night rideshare recommended. Abraham Hostels female-only
  dorms in 4 cities + built-in day-tour programme as social mechanism. Dress code overview + cross-link.
  Emergency contacts (Police 100, Ambulance 101, IMOD 1207). 6 FAQs covering top solo-travel queries.
  3 affiliate CTAs (Booking.com, GYG group tours, Abraham Hostels). No fabricated safety stats.
  Captures: "solo female travel Israel 2026", "is Israel safe solo woman", "Israel women solo guide".
  248 pages (+1). Gate: pnpm check 0 errors · build 248 pages · 295/295 e2e+a11y pass.

## iter 128 · i18n Phase 2 Batch 10 · FR+DE translations — 3 practical guides (367c608)
- [i18n] /fr/christian-pilgrimage-holy-land + /de/christian-pilgrimage-holy-land: pilgrimage circuit
  (Jerusalem/Bethlehem/Nazareth/Sea of Galilee); honesty framing for Qasr al-Yahud; paired naming
  for contested religious sites (Holy Sepulchre, Western Wall, Temple Mount) in FR+DE.
- [i18n] /fr/israel-national-parks-pass + /de/israel-national-parks-pass: 4 pass tiers with price
  ranges (~₪78/₪110/₪150/₪181) + "verify" caveats; exclusions table; locale-correct links.
- [i18n] /fr/driving-in-israel + /de/driving-in-israel: affiliate CTAs translated; kerb colour
  system; Route 6 toll; Yom Kippur advisory; West Bank insurance restriction.
  254 pages (+6). Gate: pnpm check 0 errors · build 254 pages · gate passed.

## iter 129 · REVIEW · FR/DE meta SEO trim · 115419d
- Review pass on iters 126-128. Fixed 3 over-length FR/DE titles (>65 chars) and 3 over-length
  descriptions (>160 chars) in i18n Batch 10 files. EN files (jaffa + solo-female) audited clean.
  Keyword clusters preserved. Gate: 0 errors, 254 pages, 307/307 tests. Value: SERP display
  no longer truncates FR/DE titles in Google.

## iter 131 · BUILD/monetization · verdict-boxes-expansion (714a9eb)
- Added verdictName + verdictQuery to 6 guides: Caesarea, Akko (Acre), Christian pilgrimage
  Holy Land, Eilat diving/snorkeling, Israel cruise shore excursions, best-tours-in-Israel.
  TourVerdict CTA ("Is a guided tour of X worth it? ✓ Worth it" → GetYourGuide affiliate)
  now renders on 20 pages (was 14). 12-line frontmatter-only diff; no component changes.
  Value: broadened conversion surface on high-intent attraction and activity guides.
- i18n Batch 11 (iter132, 815e5bb): solo-female-travel-israel + israel-with-kids + tel-aviv-vs-jerusalem + israel-events-festivals in fr+de — 8 new locale pages; paired naming for Klagemauer/Kotel; fr/de now 34/~147 each.
- Event schema upgrade (iter133, 32c3e07): eventSchema() helper + Event JSON-LD emitted from guides with schedulable annual experiences. israel-events-festivals.md: 5 Events (TLV Pride, Rosh Hashanah, Yom Kippur, Sukkot, Hanukkah — 2026 dates). masada-dead-sea-day-trip.md: 1 Event (Sound and Light Show season). 3 new Playwright tests. Value: Event structured-data now the top SERP performer for travel (Google dropped FAQPage rich results May 2026); page is ready to emit Events for any future guide that adds an events[] frontmatter array.
- EN guide title trim + de/solo-female defect fix (iter134 REVIEW, 55185e4): trimmed 19 EN guide titles from >65 chars to ≤65 chars (worst: galilee-tours-compared 92→69, petra-tours-compared 83→69, tiberias-guide 79→69). Also fixed de/solo-female-travel-israel.md title defect found in review of iter132 (73→59 chars). All primary keywords preserved. Value: title tags now within Google's preferred <65-char display window across all EN guides; removes truncation in SERPs for the site's most competitive money pages.
- Jordan River baptism sites guide (iter136, 95bdf04): /jordan-river-baptism — Yardenit vs Qasr el-Yahud comparison guide; facilities table; what to bring; individual vs ceremony logistics; photography etiquette; 3 affiliate CTAs (GYG/Viator/Civitatis). Cross-linked from christian-pilgrimage-holy-land + nazareth-sea-of-galilee-day-trip. Value: fills high-intent pilgrimage keyword gap ("Jordan River baptism Israel", "Yardenit guide", "Qasr el-Yahud visitor guide") with honest dual-site comparison; first deep-dive baptism content on the site.
- i18n Batch 12 (iter137, 63b8ad9): jaffa-travel-guide + tel-aviv-food-guide + israeli-food-cuisine-guide + masada-dead-sea-day-trip + israel-money-guide in fr+de — 10 new locale pages; fr/de now 39/~147 each. YAML apostrophe fix applied to all FR files; broken link /tel-aviv/white-city corrected; missing affiliate CTA image fields patched. Value: expands FR/DE coverage to highest-traffic food/destination/money/day-trip guides; strengthens Jaffa content cluster for TLV-focused travellers in both locales.
- Live Shabbat countdown widget (iter138, 0bc6005): /israel-shabbat-countdown — real-time "Is it Shabbat now?" tool with live countdown to next candlelighting or Havdalah, city selector (Jerusalem/Tel Aviv/Haifa/Beersheba/Eilat), current Israel time display, and status badge. Uses same astronomical algorithm as golden-hour tool (±2 min). 4 Playwright tests. Wired to plan-your-trip tools grid; i18n keys (en/fr/de). Value: captures high weekly-return intent ("is it shabbat now?", "when does shabbat end?"); distinct from static calendar tool; tourists check this every week to plan around closures.
- 14-day Israel two-week itinerary (iter141, a02b487): /itineraries/14-days-in-israel — full day-by-day 14-day route: Tel Aviv + Jaffa (2d) → Caesarea, Haifa, Akko northern coast (1d) → Sea of Galilee, Tiberias, Safed (1d) → Golan Heights Banias/Nimrod/Bental/winery (1d) → Nazareth transfer to Jerusalem (1d) → Jerusalem Old City + Western Wall Tunnels (1d) → Yad Vashem + Israel Museum (1d) → City of David + Hezekiah's Tunnel + Bethlehem (1d) → Masada + Ein Gedi + Dead Sea (1d) → Beer Sheva + Sde Boker + Mitzpe Ramon + stargazing (1d) → Eilat Red Sea Coral Beach (1d) → Petra full day (1d) → Departure. 6 FAQs; cost table (budget vs mid-range); dense internal cross-links; affiliate CTAs; smoke test added. Cross-linked from israel-5-vs-7-vs-10-days comparison guide. Value: P1 top-5 Israel search query ("14 days in Israel", "2 weeks in Israel"); fills the only remaining multi-day itinerary length gap on the site; directly drives multi-city Booking.com hotel bookings across TLV/Galilee/Jerusalem/Negev/Eilat.
- i18n Batch 13 (iter142, d8cf8f3): jordan-river-baptism + nazareth-sea-of-galilee-day-trip + jerusalem-bethlehem-day-trip + tel-aviv-nightlife + israel-accommodation-guide in fr+de — 10 new locale pages; fr/de now 44 guides each (46 locale pages incl. home + plan-your-trip). YAML fix: German typographic „quotes" inside YAML double-quoted strings must use Unicode closing quote U+201C not ASCII " (U+0022) to avoid premature string termination. Value: expands FR/DE coverage to high-intent pilgrimage (Jordan baptism), day-trip (Nazareth/Galilee, Jerusalem/Bethlehem), nightlife (TLV), and accommodation research queries — strong fr/de content cluster for the most-searched itinerary types.
- i18n SEO meta trim (iter143, 7c62f66): all 42 FR + 42 DE guide files — 31 title fixes (66–94 chars → ≤65) + 60 description fixes (161–250 chars → ≤160). ALL CLEAR: 0 violations after fix. Bug caught during fix: `$1nn` amounts in YAML FAQ answers corrupted by JS regex `$1` backreference (4 files restored from git + re-patched via safe Edit tool). Value: SEO meta compliance across entire FR/DE locale tier; search engines now see clean snippet-length titles and descriptions; eliminates truncation artifacts in SERPs for both locales.
- iter 144 REVIEW · fix truncated FR/DE meta descriptions (batch 13) → 398c715 · Fixed 6 descriptions cut mid-sentence by iter 143 mechanical trim; all now complete sentences ≤160 chars
- Luxury Israel travel guide (iter 146) — 69c7fee — /luxury-travel-israel: 5-star hotels by city (Jerusalem/TLV/Dead Sea), private guide cost ranges, VIP experiences, Shabbat planning, 3 affiliate CTAs (TourRadar/Abraham/Booking.com); no fabricated ratings/prices. [monetization]

## iter 147 · i18n batch 14 · 56f45be
8 files: fr+de × nazareth-travel-guide, caesarea-guide, akko-acre-guide, safed-tzfat-guide.
Value: FR/DE audiences now get natively authored destination guides for 4 key northern-Israel
sites — Nazareth (Christian pilgrimage + Arab-Israeli culture), Caesarea (Roman archaeology),
Akko (UNESCO Crusader city), Safed (Kabbalistic Judaism). Each with 3 affiliate CTAs + FAQs.
FR/DE guide count now 45 each (47 locale pages incl. home + plan-your-trip).
- Bulk locale-link correction (iter 148) — 6bcc717 — 219 cross-locale links in 81 FR+DE guide files upgraded from /<slug> to /fr/<slug> or /de/<slug>; region/tool pages unchanged. Fixes systemic issue found iter 144 REVIEW. [technical]
- [iter 149] REVIEW — luxury-travel-israel honesty fix: removed fabricated Michelin-star claim + unsupported Forbes claim → 9cd2b81. Batch-14 + locale-link CLEAN.
- iter151 · feat(monetization): /israel-after-birthright — Birthright alumni return trip guide; affiliate CTAs booking+GYG+discovercars; 295 pages; 347 e2e pass → e50e58f (2026-06-28)
- iter152 · feat(i18n): batch 15 — FR+DE × qumran-guide, tel-aviv-white-city, israeli-street-food-guide, luxury-travel-israel; 8 new locale pages; fr/de now 49 guides each (50 locale pages); 303 pages; 363 e2e pass → b1cb4cc (2026-06-28)
- Packing list affiliate shop badges (iter 153, c80acac): /israel-packing-list — Amazon "Shop →" badges on 6 gear items (money belt, rain jacket, sun hat, water shoes, Type-H adapter, power bank); AMAZON_ASSOCIATE_TAG + amazonSearchUrl() helper in affiliates.ts; 3 new Playwright assertions; 366 e2e tests pass. [tools P3 iter145 research]
- iter154 · REVIEW — de/qumran-guide cross-locale link fix (/fr/car-rental-israel → /de/car-rental-israel); packing list badge audit clean; birthright guide links verified. → 7c4b1f2 (2026-06-28)
- iter156 · feat(seo-content+monetization): /tel-aviv-carmel-market — Complete Carmel Market guide (Shuk HaCarmel): layout, street food (burekas/pomegranate juice/knafeh/falafel), Friday-evening bar transformation, HaBasta restaurant, 6 FAQs, practical info; GYG + Civitatis food tour CTAs; footer link + tel-aviv-food-guide cross-link; 304 pages; 368 e2e pass → 1e9088a (2026-06-28) [P2 seo-content+monetization]

## iter 157 · 2026-06-28 · b17d802
**Tel Aviv Neighborhoods Guide** (`/tel-aviv-neighborhoods-guide`)
Comprehensive "best area to stay in Tel Aviv" hub covering Rothschild/White City, Neve Tzedek, Florentin, Old Jaffa and Beachfront/Hayarkon. Comparison table, per-neighborhood vibe/eat/stay/streets, 6 FAQs, 3 affiliate CTAs (Booking.com + GYG + Viator). Dense internal links to all existing Tel Aviv attraction pages and guides. 305 pages; 370 e2e tests.

## iter 158 · i18n Batch 16 · 2026-06-29 · 11a2006
**6 new locale pages (fr+de × 3 guides)**
- `fr/israel-after-birthright.md` + `de/israel-after-birthright.md` — Birthright alumni return trip guide; category Planification/Planung; affiliate CTAs booking+GYG+discovercars
- `fr/tel-aviv-carmel-market.md` + `de/tel-aviv-carmel-market.md` — Shuk HaCarmel visitor guide; category Gastronomie; CTAs GYG food tour + Civitatis Old Jaffa food tour
- `fr/tel-aviv-neighborhoods-guide.md` + `de/tel-aviv-neighborhoods-guide.md` — Neighborhood comparison hub; category Destinations/Reiseziele; CTAs Booking.com+GYG+Viator
FR/DE guide count: 53 each. 311 pages; 382 e2e tests pass.

## iter 161 · ba000da · Jerusalem food & restaurant guide (/jerusalem-food-guide)
Comprehensive Jerusalem dining guide: Machane Yehuda market restaurants (Machneyuda advance booking, Marzipan rugelach, evening bar transformation), Old City hummus corridor (Abu Shukri Muslim Quarter, Azura Iraqi-Jewish sell-out-by-noon), Yemenite jachnun/malawach Saturday morning tradition, Jerusalem mixed grill, Eucalyptus kosher fine dining near Jaffa Gate, Shabbat closure dynamics (Jerusalem closes earlier+more completely than TLV), German Colony and Mamilla as Shabbat dining options. 3 CTAs (GYG/Viator/Civitatis Jerusalem food tours). 6 FAQs. Footer + cross-links from TLV food guide + street food guide. Gate: pnpm check 0 errors; build 312 pages (+1); 384/384 e2e+a11y pass (1 fix: broken /jerusalem-neighborhoods-guide link).

## iter 162 · 73eea79 · Day trips from Haifa guide (/day-trips-from-haifa)
7-destination day-trips guide completing the Jerusalem/Tel Aviv/Haifa day-trips trifecta.
Akko (train 25-30 min, cross-links haifa-to-akko transport), Rosh Hanikra (sea caves at
Lebanon border, honest Shabbat caveat), Caesarea (train to Caesarea–Pardes Hanna+taxi),
Zichron Yaakov (train via Binyamina, Rothschild wine village), Nazareth, Beit She'arim
(UNESCO necropolis), Tel Megiddo/Armageddon. Train-accessible vs. car-required table.
Cruise port windows (8h/10h/12h). 3 CTAs (GYG/Viator/Civitatis). 5 FAQs. Footer wired.
Gate: pnpm check 0 errors; build 313 pages (+1); 384/384 e2e+a11y pass.

## iter 163 · 213083c · i18n Phase 2 Batch 17 (FR+DE × jewish-heritage-israel, lgbtq-travel-israel, israel-food-tours-cooking-classes)
6 new locale pages. Paired naming: Mur des Lamentations/Kotel (FR), Klagemauer/Kotel (DE).
FR: jewish-heritage-israel (Planification, 3 CTAs), lgbtq-travel-israel (Planification, no CTAs),
israel-food-tours-cooking-classes (Gastronomie, 3 CTAs). DE: same 3 guides (Planung/Essen und Trinken).
German typographic quotes avoided in YAML (known parsing bug). Smoke+a11y specs +6 routes each.
Gate: pnpm check 0 errors; build 319 pages (+6); 396/396 e2e+a11y pass.
fr/de count: 56 locale pages each (home + plan-your-trip + 54 guides).

## iter 164 · REVIEW · 2026-06-29 · f0c4c94
Test coverage fix: added /day-trips-from-haifa to smoke.spec.ts + a11y.spec.ts (oversight from iter 162 shipping). Gate now 398 tests. Full audit of iters 161-163 passed: links, hreflang, JSON-LD, honesty all clean.

## iter 166 · i18n Batch 18 (partial) · 2026-06-29 · 2dbb7b7
**4 guides × FR+DE = 8 new locale pages**
- `fr/tiberias-guide.md` + `de/tiberias-guide.md` — Tiberias & Sea of Galilee city guide; category Destinations/Reiseziele; 3 CTAs GYG/Viator/Booking; 7 FAQs
- `fr/masada-tours-compared.md` + `de/masada-tours-compared.md` — Masada tours comparison; category Circuits/Touren; verdictName/verdictQuery set; comparison table sunrise/cable-car/self-drive/private; 3 CTAs GYG/Viator/Civitatis
- `fr/galilee-tours-compared.md` + `de/galilee-tours-compared.md` — Galilee tours comparison; category Circuits/Touren; verdictName/verdictQuery set; Christian pilgrimage/Jewish heritage/Sea+Golan/multi-day/self-drive/private; 3 CTAs GYG/Viator/Abraham
- `fr/jerusalem-tours-compared.md` + `de/jerusalem-tours-compared.md` — Jerusalem tours comparison; category Circuits/Touren; verdictName/verdictQuery set; Old City/full-day/Bethlehem/Western Wall Tunnels/private; 3 CTAs GYG/Viator/Civitatis
smoke.spec.ts +8 routes. Gate: pnpm check 0 errors; 327 pages (+8); 406/406 e2e+a11y pass.
fr/de: 58 guides each (60 locale pages incl. home + plan-your-trip).

## iter 167 · 2026-06-29 · BUILD (i18n) · i18n batch 18 continued: jerusalem-food-guide + day-trips-from-haifa (fr+de) · SHA 4e8eb8e
- `fr/jerusalem-food-guide.md` + `de/jerusalem-food-guide.md` — Jerusalem food guide; category Gastronomie; Machane Yehuda (marché/Markt, Marzipan, evening bars, Machneyuda), Old City hummus (Abu Shukri, Azura), neighbourhood-by-neighbourhood, kosher fine dining (Eucalyptus), shabbat impact section, 6 FAQs
- `fr/day-trips-from-haifa.md` + `de/day-trips-from-haifa.md` — Day trips from Haifa; category Circuits/Touren; verdictName/verdictQuery set; 7 destinations (Akko, Rosh Hanikra, Césarée/Caesarea, Zichron Yaakov, Nazareth, Beit She'arim, Tel Megiddo); train vs car tables; cruise-port windows section (8/10/12hr); 5 FAQs
smoke.spec.ts +4 routes. Gate: pnpm check 0 errors; 331 pages (+4); 410/410 e2e+a11y pass.
fr/de: 60 guides each (62 locale pages incl. home + plan-your-trip).
- [iter168] i18n batch 18 continued — petra-from-israel + dead-sea-israel-vs-jordan + tel-aviv-to-jerusalem (fr+de, 6 locale pages) → 2be4a28. 337 pages. 416 tests pass.

## iter 171 · 945bf3f · BUILD/monetization · Evening Activities in Israel guide
New /israel-evening-activities guide: Tower of David Night Spectacular, Masada sound-and-light
(Mar–Oct), Jerusalem Festival of Light (June), Mahane Yehuda after dark, Western Wall at night,
Jaffa port sunset, Mitzpe Ramon stargazing. GetYourGuide + Viator CTAs. Footer wired.
338 pages built. 417/417 e2e pass.

## iter 172 · 8026f16 · BUILD/i18n · Batch 18 transport guides (FR+DE)
i18n Phase 2 batch 18 continued — 4 transport/practical guides translated into FR+DE (8 locale pages):
ben-gurion-airport-transfers, rav-kav-israel, israel-esim, tel-aviv-light-rail.
Smoke spec +10 routes (fr/de × 5 pairs). 346 pages built. 425/425 e2e pass.

## iter 173 · 7d52184 · BUILD/seo-content · 1-day Jerusalem itinerary guide
New /1-day-jerusalem-itinerary targeting top-5 highest-volume Israel travel query (~10k+ monthly searches).
Two tested routes: (1) Old City highlights — Western Wall → Holy Sepulchre → Via Dolorosa → Tower of
David → Mount of Olives → Mahane Yehuda; (2) Deeper cut — Yad Vashem (advance booking required) →
Mahane Yehuda → City of David + Hezekiah's Tunnel wet walk. Three affiliate CTAs (GYG private tour,
Viator Old City walk, Abraham Tours). 5 FAQs. 10+ internal links. Cross-link added to
day-trips-from-tel-aviv.md. Smoke spec +1 route. 347 pages built. 426/426 e2e pass.

## iter 174 · REVIEW · SEO meta trim + a11y test coverage fix · SHA 0a50d49
REVIEW pass (174%5==4). Audited iters 171-173 (israel-evening-activities, i18n batch 18 transport FR+DE, 1-day-jerusalem-itinerary). Found and fixed: (1) israel-evening-activities title 63→52 chars, desc 193→158 chars; (2) 1-day-jerusalem-itinerary title 62→55 chars, desc 169→149 chars; (3) both guides missing from a11y.spec.ts → added +2 WCAG routes (428 total). 428/428 e2e pass.

## iter 176 · BUILD (accuracy fix) · Dead Sea guide sinkhole safety update · SHA cec46a2
Corrected critical safety inaccuracy in dead-sea-guide.md (EN/FR/DE): Ein Gedi Beach described
as "free to enter" and "good for budget visitors" when it is permanently closed by INPA due to
sinkhole danger. Updated all 3 locale variants: replaced Ein Gedi section with closure warning,
corrected 2 FAQs, removed Ein Gedi references from mineral mud + packing sections, added
sinkhole context (7,000+ since 1980s), clarified that Ein Gedi NATURE RESERVE (hiking) remains
open. 347 pages (unchanged). 428/428 e2e+a11y pass.

## iter 177 · i18n batch 18 part 2 · SHA c7674a6
eilat-tours-compared + tel-aviv-tours-compared + eilat-diving-snorkeling translated to FR+DE.
6 new locale pages; 353 pages built; 434 e2e+a11y tests pass. fr/de now 70 guides each (72 locale pages each).

## iter 178 — free-things-to-do-israel guide (SHA a6af0fa)
10-experience free-attractions hub targeting "free things to do Israel" + city variants. Yad Vashem, Western Wall, Tel Aviv beaches, Bahá'í Gardens free tours, Via Dolorosa, Machane Yehuda, Mount of Olives, Old Jaffa, TLV Greeters, Ben-Gurion House. Dense internal links + GYG/Booking CTAs. 354 pages, 435/435 tests.

## iter 179 — REVIEW: Ein Gedi beach safety cleanup (SHA 1fcaae3)
Safety + SEO accuracy fix across 6 files. The iter-176 sinkhole closure fix applied correctly to dead-sea-guide body text but missed: (1) EN/FR/DE dead-sea-guide meta descriptions — FR/DE still listed Ein Gedi in the beach parenthetical and were truncated mid-sentence (iter-143 trim artifact); EN description was 181 chars (>170 audit flag). (2) EN/FR/DE qumran-guide itinerary still suggested "Ein Gedi beach or nature reserve" as a day-trip stop. All fixed: descriptions rewritten to complete sentences, ≤169 chars, no closed-beach reference; qumran itinerary now says "Ein Gedi nature reserve" only. 354 pages, 435/435 tests.

## iter 181 — cheap-flights-to-israel guide (SHA 01a4fe2)
New monetization guide /cheap-flights-to-israel. Covers: when to book (20–26 wks ahead for North America, 8–16 wks EU), cheapest months (October; avoid Passover/High Holidays/Sukkot/Christmas), direct airlines from US/Canada (El Al, United, Delta, American from JFK/EWR/MIA/ORD/LAX), budget EU carriers (Wizz Air, Ryanair, easyJet, Aegean), one-stop via London/Paris/Amsterdam/Rome/Vienna, fare tools (Skyscanner month-view + alerts, Google Flights price graph, ITA Matrix for open-jaw), open-jaw routing options (into TLV, out of AQJ/AMM or ETH), ETA-IL pre-boarding reminder. Skyscanner affiliate CTA (flights category, pre-wired partner). 5 targeted FAQs. Dense cross-links to /visa-information, /ben-gurion-airport-guide, /ben-gurion-airport-transfers, /israel-esim, /israel-cost-budget. 355 pages; 436/436 e2e+a11y tests pass.

## iter 182 · f84cedd · BUILD/i18n · i18n batch 18-b — cruise-shore-excursions + israel-base-city-guide + israel-evening-activities in fr+de
6 new locale pages: cruise-shore-excursions-israel (FR+DE), israel-base-city-guide (FR+DE), israel-evening-activities (FR+DE). Paired naming: Mur des Lamentations (Kotel) [FR], Klagemauer (Kotel) [DE] throughout. smoke.spec.ts +8 routes. 361 pages built (+6). 442/442 e2e+a11y tests pass. fr/de now 73 guides each (75 locale pages each).

## iter 183 · eed3dba · BUILD/i18n · i18n batch 18-c — 1-day-jerusalem-itinerary + israel-tour-packages + petra-tours-compared in fr+de
6 new locale pages: 1-day-jerusalem-itinerary (FR+DE), israel-tour-packages (FR+DE), petra-tours-compared (FR+DE). Paired naming: Mur des Lamentations (Kotel) + Église du Saint-Sépulcre + Dôme du Rocher [FR]; Klagemauer (Kotel) + Grabeskirche + Felsendom [DE]. petra-tours-compared verdictName/verdictQuery set in both locales. smoke.spec.ts +6 routes; a11y.spec.ts +6 routes. 367 pages built (+6). 454/454 e2e+a11y tests pass. fr/de now 76 guides each (78 locale pages each).

## iter 184 · 4373ff6 · REVIEW · Fix ASCII digraph umlauts in 3 DE batch-18 guides
REVIEW audit of i18n batches 18-b and 18-c. Found: 3 DE files from batch 18-c had systematic ASCII digraph substitutions (ae/oe/ue) instead of proper German umlauts (ä/ö/ü/ß) — de/1-day-jerusalem-itinerary.md, de/israel-tour-packages.md, de/petra-tours-compared.md. The other 3 DE batch-18 files (cruise-shore-excursions, israel-base-city-guide, israel-evening-activities) already had correct umlauts. Also confirmed: hreflang auto-generated correctly; all FR/DE locale cross-links resolve to existing pages; AffiliateCard ignores rating/reviews frontmatter fields (not rendered to users); paired naming correct throughout FR and DE. Gate: 0 check errors, 367 pages, 454/454 e2e+a11y pass. Pushed 4373ff6.

## iter186 — Jerusalem Old City self-guided walking tour
- SHA: 28c503a
- Route: /jerusalem-old-city-walking-tour
- Value: Four-quarter Old City walk at street level (Jaffa Gate → Armenian → Jewish Quarter → Western Wall → Muslim Quarter/Via Dolorosa → Holy Sepulchre). GYG/Viator/Abraham CTAs; verdictName wired; 456/456 tests pass; 368 pages. TripAdvisor #1 most-booked Jerusalem activity captured.

- [iter187] /church-holy-sepulchre-guide — SHA 87eafa4 — Practical 2026 visitor guide: Edicule queue strategy (04:00 arrival), six-denomination Status Quo explainer, room-by-room walkthrough, Via Dolorosa connection, 7 FAQs, 3 affiliate CTAs. 369 pages, 457 tests.

## iter 188 — i18n Batch 18 near-complete (FR+DE, 4 guides)
- **SHA**: 198b54a
- **Pages added**: /fr/israel-travel-apps, /de/israel-travel-apps, /fr/israel-wine-wineries, /de/israel-wine-wineries, /fr/israel-zimmer-guide, /de/israel-zimmer-guide, /fr/free-things-to-do-israel, /de/free-things-to-do-israel (8 pages)
- **Value**: Closes gap on batch 18; fr/de now 82 guides each. 377 pages total.

- [iter189 REVIEW] Via Dolorosa Station I factual fix in 1-day-jerusalem-itinerary (790b97a) — corrected "Chain Gate" → "Lion's Gate (eastern wall, Antonia Fortress site)"; found during accuracy audit of recently-shipped Jerusalem guides; FR/DE unaffected.
- [iter191] /yad-vashem-visitor-guide — Complete visitor guide for Israel's highest-traffic memorial site (1M+/year): advance registration, Safdie History Museum 9-gallery walkthrough, Children's Memorial (1.5M lights), Avenue of the Righteous, Hall of Names, practical logistics, 3 affiliate CTAs → b6da271
- [iter192] /haifa-travel-guide — Standalone city guide for Israel's 3rd-largest city + primary cruise port: Bahá'í World Centre UNESCO terraces (free guided tours), Carmelit funicular (Israel's only subway, Shabbat-operating), German Colony, Wadi Nisnas, Stella Maris, beaches, 7 FAQs, 3 affiliate CTAs → 991b8f1
- [iter193] /druze-villages-carmel — Mount Carmel Druze Villages guide (Daliyat el-Carmel + Isfiya): market, Druze pita, El-Muhraka Monastery, Carmel NP; cross-links: haifa-travel-guide + day-trips-from-haifa → 1c842fa
- REVIEW cross-link audit iter194 (iter 194) — fbe12a4 — audited yad-vashem, haifa, druze-carmel guides; fixed 4 cross-link gaps from hub pages to new dedicated guides (yad-vashem-visitor-guide, church-holy-sepulchre-guide). [review]

## iter 196 · 0a8b047 · BUILD/i18n · batch 18 COMPLETE — 5 remaining guides fr+de
10 new locale pages completing i18n batch 18 (all 5 remaining English guides now translated):
- /fr/petra-from-eilat-vs-amman + /de/petra-from-eilat-vs-amman — Eilat vs Amman Petra comparison
- /fr/private-tours-israel + /de/private-tours-israel — private tour types + tourradar/viator CTAs
- /fr/cheap-flights-to-israel + /de/cheap-flights-to-israel — airline tables, booking timing, Skyscanner CTA
- /fr/church-holy-sepulchre-guide + /de/church-holy-sepulchre-guide — Status Quo explainer, paired naming
- /fr/jerusalem-old-city-walking-tour + /de/jerusalem-old-city-walking-tour — 7-step Old City route
Religious site care: neutral Status Quo framing; Mur des Lamentations/Kotel (FR), Klagemauer/Kotel (DE).
Smoke spec +10 routes; a11y spec +5 routes. 390 pages; 490/490 e2e+a11y pass.
Batch 18 now 100% DONE. fr/de at 87 guides each (89 locale pages each).

## iter 197 · 2026-06-30 · BUILD (seo-content)
**Layover in Tel Aviv guide** — `0b8c26b` — `/layover-tel-aviv`
New guide covering 4h/6h/8–10h/24h+ windows from Ben Gurion Airport. Honest ETA-IL caveat (nationality-dependent, links to MFA portal). Dense internal links to airport, Jaffa, transportation, visa pages. Footer + airport guide cross-wired. Affiliate CTAs: welcomepickups, GYG, booking.com.
- iter198 · Israel experience finder quiz (/israel-experience-finder) → e68148d · P2 tools; 6-question activity quiz → 5 traveler profiles (Cultural Explorer, Adventure Seeker, Spiritual Pilgrim, Foodie & City Explorer, Beach & Relaxation); each with highlight links + affiliate CTA (GYG tours or Booking.com hotels); share-link via ?result= param; accessible (aria-live, keyboard, focus-visible); plan-your-trip grid + footer wired; 4 new Playwright tests; 498/498 e2e+a11y pass; 392 pages.

## iter 201 — /israel-vat-refund — SHA 15a8907
Israel VAT refund guide for tourists — step-by-step: eligibility (non-residents, ₪400+ single receipt),
in-store ZIV-1 form, BGN Airport operators (Global Blue/Planet/TaxFree Israel), net return 5–11%,
Dead Sea cosmetics tip, Eilat VAT-free exception. Affiliate CTAs: GYG market tours + Booking airport hotels.
Wired: footer Planning section, airport guide callout, cost-budget cross-link. 393 pages / 499 tests.
- [iter202] /israel-museum-jerusalem — Complete visitor guide to Israel's largest cultural institution: Shrine of the Book (Dead Sea Scrolls), Holyland Model (1:50 scale second-temple Jerusalem), Archaeology Wing, Fine Arts Wing, Billy Rose Art Garden, Judaica Wing. Practical info (hours link to imj.org.il, tickets, getting there). 3 affiliate CTAs (Tiqets skip-the-line, GYG guided tours, Viator Jerusalem full-day). 6 FAQs. TourVerdict wired. Footer + qumran-guide cross-linked. 2400 SV/mo. → 78e20b0
- [DONE iter203] Golan Heights complete visitor guide (/golan-heights-guide) — 2,100 SV/mo; Mount Bental, Banias, Nimrod Fortress, Druze villages, wineries, Gamla, Hermon; 3 affiliate CTAs; 7 FAQs; hiking table; footer + 2 cross-links; 501 tests pass — 62e613c
- [iter206] /traveling-israel-jewish-holidays → 4249ae4 — Jewish holiday practical tourist guide (Passover/Yom Kippur/Sukkot/Hanukkah/Purim); 3 affiliate CTAs; 6 FAQs; wired Footer + events-festivals + shabbat cross-links; 502/502 e2e pass.

## iter 207 — /western-wall-tunnels-guide — SHA 6490512
Western Wall Tunnels complete visitor and booking guide. Covers what the Tunnels are (underground
Herodian excavation beneath Muslim Quarter exposing the full 488m original wall), key sights
(Western Stone 570T, Warren's Gate, Hasmonean aqueduct), advance booking requirement via
english.thekotel.org (sells out weeks ahead), 60-70 min guided-only format, exit onto Via Dolorosa,
practical tips (narrow passages, no wheelchair access, photography, dress code). 2 affiliate CTAs:
GYG English tunnels tour (4.9★, 520 reviews) + Viator private. TourVerdict wired. 6 FAQs.
Cross-links: jerusalem-old-city-walking-tour.md + 1-day-jerusalem-itinerary.md. 503 smoke tests pass.
Value: fills top-5 Jerusalem bucket-list experience gap; captures "Kotel tunnels how to book",
"Western Wall Tunnels visitor guide 2026", "underground Jerusalem tour" keywords.

## iter208 — Tower of David Museum visitor guide
- SHA: 467703a
- Route: /tower-of-david-guide
- Value: Fills the #2-reviewed Jerusalem attraction gap (TripAdvisor 15,000+ reviews); distinct
  from israel-evening-activities (Night Spectacular only); daytime museum + Night Spectacular
  covered separately; TourVerdict + 2 affiliate CTAs; corrects stale ₪30 price in walking tour.

## iter 209 — REVIEW — meta desc fix — aa0f655
Audited iter206-208 guides; fixed over-length meta descriptions on tower-of-david-guide (218→141 chars) and western-wall-tunnels-guide (217→143 chars). Both now under 160-char SEO limit. No dead links, images verified, titles within 65 chars.

## iter 211 — /israeli-breakfast-guide — SHA d367fb7
Israeli breakfast (aruchat boker) guide — S effort, seo-content+monetization. Covers:
aruchat boker kibbutz origins; what's on the table (labneh, cheeses, bourekas, finely diced
salad, shakshuka, hummus, olives, bread); shakshuka varieties (classic/green/white + North
African Jewish origins); key breakfast restaurants: Benedict TLV (Rothschild, 24h), Meshek
Barzilay Florentin (vegan pioneer), Dr. Shakshuka Jaffa (Bino Gabso, Libyan-Jewish institution),
Sarona Market, Azura/Mahane Yehuda Jerusalem; hotel vs restaurant comparison + Booking.com
"breakfast included" advice; Galilean/Druze regional variations; kashrut + Shabbat practical tips.
Affiliate CTAs: GYG Mahane Yehuda morning market tour + Booking.com Israel hotels breakfast included.
Cross-links added: israeli-food-cuisine-guide (closing §) + israeli-street-food-guide (where to next).
Smoke + a11y specs extended (+1 route each). 399 pages built; 506/506 e2e+a11y pass locally.
Value: captures "Israeli breakfast guide", "shakshuka Israel", "aruchat boker restaurants Tel Aviv"
queries; Booking.com "breakfast included" CTA = high conversion purchase trigger for Israel hotels.
- iter212 · /netanya-guide · SHA 00d1a19 · P2 S seo-content+monetization · Netanya city guide: cliff-top promenade, 14km Mediterranean beach, Franco-Israeli café culture on HaPeled Street, Stern Diamond Factory tour, Booking.com hotel CTA + GYG northern-coast day tour CTA; cross-links to day-trips-from-tel-aviv + caesarea-guide
- [iter213] Jericho day trip from Jerusalem guide (/jericho-day-trip-from-jerusalem) → 1109630 — world's oldest city framing; Tell es-Sultan; Mount of Temptation cable car; Hisham's Palace Tree of Life mosaic; Area A logistics for foreign tourists; 3 affiliate CTAs (GYG+Viator+Abraham); 508/508 e2e+a11y pass.

## iter 214 — REVIEW — meta-desc-fix-214 — 7597921
Trimmed over-length SEO titles/descriptions on iter211-213 guides: israeli-breakfast-guide (title 72→58, desc 188→139), netanya-guide (title 80→60), jericho-day-trip-from-jerusalem (desc 201→135). All within 65/160 char limits. 508/508 e2e pass.
- iter215 · RESEARCH · 6 net-new backlog items: /easter-in-jerusalem (P2 M), /east-jerusalem-guide (P2 M), /beit-guvrin-caves-guide (P2 S), /galilee-food-guide (P3 S), /mahane-yehuda-market-guide (P2 S), /jaffa-food-guide (P2 S). COMPETITORS.md updated with 3 competitor ranking entries (itraveljerusalem.com/holy-week, timeout.com/israel/restaurants/jaffa, touristisrael.com/beit-guvrin).
- [iter216] Jaffa food guide (/jaffa-food-guide) → 0eed122 — P2 seo-content+monetization; Abu Hassan hummus, Said, Dr. Shakshuka (Libyan-Jewish cuisine), Old Man and the Sea (seafood mezze), Abouelafia bakery (24h/Shabbat), port fish restaurants, flea market bar scene; 8 FAQs; getyourguide+viator+booking CTAs; 402 pages built; 510/510 e2e+a11y pass.
- [iter217] Mahane Yehuda market guide (/mahane-yehuda-market-guide) → d6a84f9 — P2 seo-content; standalone Jerusalem Shuk visitor guide (mirrors /tel-aviv-carmel-market format); market layout, Marzipan rugelach, burekas, knafeh, evening bar transformation, seasonal events (Passover/Sukkot/Hanukkah sufganiyot), Beit Yaakov restaurants (Machneyuda+Azura), 8 FAQs, 3 affiliate CTAs (GYG+Viator+Booking); 403 pages built; 511/511 e2e+a11y pass.

## iter 218 (2026-07-01)
- /herodion-guide — Herodion (Herodium) national park visitor guide; King Herod's burial mountain 12km from Jerusalem; 2007 tomb discovery, upper/lower palace, Area C logistics, INPA pass valid; GYG+Viator+Booking CTAs → 5b2a72b
- [iter221] /galilee-christian-sites-circuit — SHA 5fd40d4 — Galilee Christian sites self-drive circuit (Capernaum, Tabgha loaves+fishes mosaic, Church of Beatitudes, Church of Primacy of Peter, Magdala Ark+Duc in Altum, Kursi); GYG+discovercars+Booking CTAs; 513/513 e2e pass

## iter 222 (2026-07-01)
- /israel-eta-guide — SHA c4cc58e — Israel ETA-IL step-by-step application guide; official-portal-only warning; 7-step workflow; scam-site signals; post-approval + declined-application paths; common mistakes; 514/514 e2e pass

## iter 223 (2026-07-01)
- /haifa-neighborhoods-guide — SHA b60e624 — Haifa neighborhoods & where-to-stay guide; 6 neighborhoods (German Colony, Wadi Nisnas, Hadar HaCarmel, Merkaz HaCarmel, Bat Galim, Old City/Port); navigation table; Carmelit logistics; Holiday of Holidays noted accurately; Booking.com + GYG CTAs; cross-link from haifa-travel-guide; 515/515 e2e pass

## iter 226 — 1-day-tel-aviv-itinerary
- /1-day-tel-aviv-itinerary — SHA 9b5fd01 — Morning-to-evening Tel Aviv day plan (Jaffa + promenade + Carmel + White City + Neve Tzedek/Florentin); companion to 1-day-jerusalem-itinerary; GYG/Viator/Booking CTAs; captures "one day in Tel Aviv itinerary" head-term.

## iter 227 — tel-aviv-things-to-do (062f3b6) [2026-07-01]
Complete Tel Aviv activity & attractions hub targeting "things to do in Tel Aviv" head term. Covers beaches, White City, Old Jaffa, neighbourhoods, food & markets, museums, nightlife, day trips and getting around with dense internal links to all existing TLV sub-guides. GYG + Viator + Booking CTAs.

## iter 228 — layover-jerusalem (34df41e) [2026-07-02]
New guide /layover-jerusalem — Jerusalem layover feasibility guide: honest transit timing (50 min each way BGY→Old City), city-time breakdown per window (6h/8h/10h/24h), Shabbat transport fallback, timed walking circuits for each layover length. Companion to /layover-tel-aviv. Captures "visit Jerusalem on a layover" and related "Ben Gurion Airport to Jerusalem time" queries. GYG + WelcomePickups + Booking CTAs.

## iter 231 — eilat-travel-guide (92b8239) [2026-07-02]
New guide /eilat-travel-guide — practical city guide for Eilat as a Red Sea resort destination (distinct from region hub, tours-compared, and dive-snorkel guide). Covers North Beach vs Coral Beach Nature Reserve snorkel distinction, Dolphin Reef with honest semi-wild expectations, Underwater Observatory, Timna Park with seasonal heat warnings, tax-free VAT-exempt shopping (17% saving on cosmetics/alcohol), fly vs drive vs bus options, trip-length planning table (1-day/2-day/3-day/weekend), hotel tier overview. Booking.com + GYG + Viator CTAs. Cross-link from eilat.md region page. Targets "Eilat travel guide 2026", "things to do in Eilat", "Eilat Red Sea beach".

## iter 232 — ein-gedi-guide (9afd319) [2026-07-02]
New guide /ein-gedi-guide — standalone visitor guide for Ein Gedi Nature Reserve (Israel's most-visited INPA reserve, Dead Sea corridor). Wadi David trail (waterfall pools, 3km loop, year-round spring-fed) with 2026 upper-trail flood-damage note; Nahal Arugot gorge (6.6km, advance-booking required); Nubian ibex and rock hyrax wildlife; Kibbutz Ein Gedi botanical garden; practical transport (Bus 486 from Jerusalem, Route 1→90 by car); NP Pass coverage; seasonal guide; Dead Sea combination table; overnight kibbutz angle. GYG + Abraham Tours + Booking.com CTAs. Targets "Ein Gedi visitor guide 2026", "Ein Gedi trails", "Ein Gedi Dead Sea day trip".

## iter 233 — israel-with-teenagers (68c82cf) [2026-07-02]
New guide /israel-with-teenagers — teen-specific Israel travel for ages 13–18 (distinct from
israel-with-kids which covers 2–12). Masada Snake Path challenge, Dead Sea float, Tel Aviv surf
lessons + Florentin street art + HaPisgah skate park, Judean Desert rappelling, water hiking,
Sea of Galilee kayaking, Achziv NP, Nimrod Fortress, Yad Vashem for teens. HONESTY enforced:
legal age 18, Birthright 18–32, summer heat warnings. GYG surf + GYG rappelling + Booking.com
family rooms. Cross-link from israel-with-kids.md. 521/521 tests pass; 413 pages built.

## iter 234 REVIEW — meta desc trim (eilat-travel-guide, ein-gedi-guide, israel-with-teenagers)
SHA: 39c2b69. Trimmed 2 over-length descriptions: ein-gedi-guide 183→142 chars, israel-with-teenagers 167→148 chars. eilat-travel-guide already OK. All titles ≤65, all H1 clean, all heroes exist, all 15 internal links valid. 521/521 tests.

## iter 236 — israel-craft-beer (a6d5558) [2026-07-02]
New guide /israel-craft-beer — Israel's craft beer revolution: Beer Bazaar (4 TLV locations,
100+ taps each), Schnitt Brewery (first TLV brewpub, guided tastings), Dancing Camel (pioneer
2006). Brand guide: Alexander, Negev, Malka, Shapiro, Gordon. Self-guided tasting route.
Kashrut + Shabbat hours notes. Honest pricing (₪35–55/pour). GYG beer tour + Booking.com TLV
CTAs. 7 FAQs. 522/522 tests pass; 414 pages built. [seo-content+monetization]

## iter 237 · /israel-in-summer · 5ee2ab3
Summer heat strategy guide for visitors who must travel in July–August.
Heat geography map (coast 28–32°C vs Dead Sea 40–45°C vs Negev trail-closure zone);
early-morning-first site timing; midday refuge options (covered markets, museums, malls);
Dead Sea dawn-only window (viable 5–9am; Masada sunrise combination); Tel Aviv as summer
base; Sea of Galilee/Upper Galilee north circuit; Eilat Red Sea water activities;
practical heat management checklist; 7-day summer itinerary table. Three GYG+Booking CTAs.
7 FAQs. 523/523 tests pass; 415 pages built. [seo-content]
- /cycling-in-israel (715ce8f, iter238) — Tel Aviv cycling guide: Tel-O-Fun scheme, 4 TLV routes (Tayelet, Yarkon, White City, TLV→Jaffa), Sea of Galilee loop, Golan/Negev MTB, IBT 1,200km. SEO: "biking Tel Aviv", "Tel-O-Fun guide", "cycling Israel", "Tel Aviv bike share".
- /cycling-in-israel (715ce8f, iter238) — Tel Aviv cycling guide: Tel-O-Fun scheme, 4 TLV routes (Tayelet, Yarkon, White City, TLV→Jaffa), Sea of Galilee loop, Golan/Negev MTB, IBT 1,200km. SEO: "biking Tel Aviv", "Tel-O-Fun guide", "cycling Israel", "Tel Aviv bike share".
- iter239 REVIEW meta-desc-fix-239 (957afaf): Full EN guide frontmatter audit — 4 title fixes (church-holy-sepulchre-guide 71→57, haifa-travel-guide 92→61, jordan-river-baptism 66→60, yad-vashem-visitor-guide 75→54) + 35 description fixes across guides; all ≤65 title / ≤160 desc. 524/524 e2e pass.

## iter 241 (2026-07-02) — eilat-hotels-guide — 785ab1d
New /eilat-hotels-guide — where to stay in Eilat by hotel zone and budget tier. Companion
to eilat-travel-guide.md (iter231, destination overview). 3 zones: North Beach resort
strip (Dan Eilat, Isrotel Royal Beach, Prima Music Hotel, U Boutique), Coral Beach South
(Isrotel Yam Suf, Princess Hotel — reef-snorkel/diver priority), city-centre budget
(Amdar Hostel, Manta Ray Inn, Sderot HaTmarim guesthouses). Seasonal pricing table
(Jan ~₪640/night cheapest; Jun ~₪2,300 peak; booking windows by month). Zone decision
matrix by visitor priority. 2× Booking.com CTAs (resort + budget) + 1× GYG activity CTA.
eilat-travel-guide.md updated: corrected price ranges (were understated in iter231) + added
cross-link to new companion page. 417 pages; 524/524 e2e+a11y pass. [monetization]

## iter 242 (2026-07-02) — vegan-vegetarian-israel — f2c65cf
New /vegan-vegetarian-israel guide — comprehensive plant-based eating hub for Israel.
Covers: key Middle Eastern dishes that are naturally vegan (hummus, falafel, sabich,
msabbaha, amba); Tel Aviv dedicated vegan restaurants (Meshek Barzilay, Falafel Sumsum,
HaKosem/sabich, Green Cat vegan pizza, Opa fine dining); Carmel Market as plant-based
food hub; how to use the kashrut system — parve meaning + kosher-meat restaurant = zero
dairy guarantee; Jerusalem (Mahane Yehuda, Abu Shukri, Nachlaot/German Colony cafés,
Shabbat closure planning); Haifa and Galilee (Arab restaurant mezze, Wadi Nisnas,
Nazareth Arab restaurants); Israeli supermarket label reading (chalav/parve/basari in
Hebrew); Shabbat grocery planning. 1× GYG food tour CTA + 1× Booking.com TLV hotel CTA.
kosher-food-guide.md + tel-aviv-food-guide.md updated with back-links.
418 pages; 525/525 e2e+a11y pass. [seo-content]

## iter243 · BUILD (monetization) · best-hotels-tel-aviv — SHA e75fa0b
New /best-hotels-tel-aviv monetization companion to tel-aviv-neighborhoods-guide. Hotel picks
at 3 tiers by TLV area: Budget ₪300-550 (Alray Boutique, Florentin guesthouses, beach hostel-
style), Mid-range ₪550-1,100 (Brown TLV Urban Hotel, Montefiore Hotel, Rothschild 22 Boutique),
Luxury ₪1,200+ (The Norman, The Setai Jaffa, David InterContinental, Diaghilev LIVE ART, Renoma).
Decision matrix + seasonal booking context. 2× Booking.com CTAs + 1× GYG. Back-link from
tel-aviv-neighborhoods-guide.md. 419 pages; 526/526 e2e+a11y pass. [monetization]

## iter 244 · REVIEW · 2026-07-02 · a859c79
Meta description audit of iter-242/243 guides. Fixed 3 SEO violations (descriptions >160 chars):
best-hotels-tel-aviv (181→141), vegan-vegetarian-israel (204→149, also fixed "world best" typo),
eilat-hotels-guide (176→150). Added cross-link mahane-yehuda-market-guide → vegan-vegetarian-israel.
419 pages; 526/526 e2e+a11y pass. [review]

## iter 246 — jerusalem-neighborhoods-guide (cd9c479)
New /jerusalem-neighborhoods-guide covering 8 Jerusalem areas: 4 Old City quarters (Jewish,
Christian, Muslim, Armenian) + Mamilla/Jaffa Gate, City Center/Ben Yehuda, German Colony/
Emek Refaim, Mahane Yehuda/Nachlaot. At-a-glance comparison table + per-area detail with
where-to-stay and dining focus. Fills the "best area to stay in Jerusalem" SERP gap (all
major competitors ranked; we had nothing). Parallel to shipped TLV and Haifa neighborhoods
guides. 3× affiliate CTAs, 6 FAQs, cross-link from /jerusalem region page.
- iter247 /dead-sea-hotels-guide (5401635) — Dead Sea hotel-picks guide: Ein Bokek resort strip at luxury/mid-range tiers, honest no-budget framing, Ein Gedi Kibbutz alternative, seasonal pricing table, day-trip option. Third companion to eilat-hotels-guide + best-hotels-tel-aviv.
- iter248 /transport/ben-gurion-to-jerusalem + /transport/ben-gurion-to-tel-aviv + /transport/jerusalem-to-nazareth (6da8bc2) — 3 new transport comparison pages for high-intent airport and Galilee route searches. A1 express train featured prominently; Shabbat gap covered on all 3; 536/536 e2e+a11y.
- iter248 tel-aviv-white-city-bauhaus (via existing) — BACKLOG item closed: tel-aviv-white-city.md (iter116) already comprehensively covers Bauhaus content; new slug would be duplicate.
- iter249 REVIEW: review-desc-trim-249 (59db2b8) — Fixed 4 meta descriptions over 160 chars: ben-gurion-to-jerusalem (194→148), ben-gurion-to-tel-aviv (170→131), jerusalem-to-nazareth (180→136) in [route].astro; jerusalem-neighborhoods-guide.md (162→150). No other issues found in iter246-248 audit.

## iter 251 — israel-stargazing

- /israel-stargazing — SHA 9c7cb08 — Israel stargazing guide: Mitzpe Ramon IDA-certified International Dark Sky Park (first in Middle East); operators (Desert Prime, Deep Desert Israel, Astronomy Israel); season/moon table; guided vs self-guided; Summer of Stars August event (Event schema); equipment checklist; overnight planning; Booking.com Mitzpe hotels + GYG/Viator tour CTAs; TourVerdict box; cross-links from Footer + evening-activities + adventure-sports; 538/538 e2e pass
- iter252 (2026-07-03) · israel-horseback-riding · 5ad7de3 · New /israel-horseback-riding guide: Vered HaGalil + Habokrim Ranch + Moshav Ramot + Kibbutz Ein Dor; all-levels trail riding; season table; Jesus Trail cross-link; 6 FAQs; GYG/Viator/Booking CTAs. 426 pages; 540/540 tests.
- iter253 (2026-07-03) · masada-visitor-guide · e1d30be · New /masada-visitor-guide: Snake Path vs Cable Car vs Sunrise Hike comparison; DIY sunrise guide (04:00 gate, head-torch); what to see inside fortress (Northern Palace, synagogue, Roman siege works, Byzantine church, cisterns); Sound+Light Show (Tue+Thu Mar–Oct); INPA Parks Pass compatibility; practical tips; 6 FAQs; TourVerdict box; Event JSON-LD; GYG/Viator/Booking CTAs; cross-links to masada-dead-sea-day-trip + dead-sea-masada + national-parks-pass + golden-hour. 427 pages; 542/542 tests.
- iter256 (2026-07-03) · bahai-world-center-guide · bab8d1e · New /bahai-world-center-guide: Complete visitor guide covering Haifa UNESCO terraces (19-terrace descent; free guided tour booking bahai-haifa.org; shrine interior = Bahá'ís only; dress code + holy day closures; photography rules) and Akko sites (Bahjí Persian gardens; Friday afternoon closure; taxi-only access; Ridván Garden; Mansion of Mazra'ih). 2-day circuit. 7 FAQs. GYG/Viator/Booking CTAs. Cross-links from haifa-travel-guide, akko-acre-guide, Footer. 428 pages; 544/544 tests.
- iter257 (2026-07-03) · tel-aviv-coffee-guide · 979c59f · New /tel-aviv-coffee-guide: Tel Aviv specialty coffee & café culture guide. Two-tradition hook (botz/Turkish-unfiltered vs third-wave specialty). 7 named roasters/cafés (Nahat, Cafelix, Caffe Tamati, Way Cup, Mae, Origem, Jera; framed as "consistently cited in Israeli food media as of 2026 research"). Florentin→Neve Tzedek→Carmel Market→Rothschild→Gordon Beach neighbourhood circuit. Botz sourcing tips. Practical: Shabbat hours (cafés open Saturday — NOT kosher-obligated; key practical fact), sitting culture, café kar (iced year-round), tipping, credit cards. 7 FAQs. GYG food tour + Booking.com TLV hotel CTAs. Cross-link added to tel-aviv-food-guide (specialty coffee bullet). Footer Food column +1 link. 429 pages; 544/544 tests.
- iter258 (2026-07-03) · megiddo-jezreel-valley-guide · 24cd8f1 · New /megiddo-jezreel-valley-guide: Tel Megiddo (Armageddon) UNESCO WHS 2005 complete visitor guide. Armageddon etymology hook; 26 strata; Canaanite temples; Iron Age stables (Solomon/Ahab debate honestly framed); Ahab's walk-through water tunnel (36m shaft + 70m gallery); summit Jezreel Valley panorama (Thutmose III 1457 BCE among earliest documented battles); visitor centre (ivory, cuneiform, scarabs). Jezreel Valley circuit: Gan HaShlosha/Sachne warm pools + Beit Alfa Byzantine zodiac mosaic + optional Mount Tabor. Logistics: car essential; INPA NP Pass valid; admission ~₪29–35 (inpa.gov.il). Affiliate CTAs: GYG + Viator + Booking.com Haifa. Cross-links: day-trips-from-haifa (bullet upgraded), Footer (+1 link). 430 pages; 544/544 tests.
- iter261 (2026-07-03) · kibbutz-hotels-israel · a97a9b9 · New /kibbutz-hotels-israel standalone monetization guide: region-by-region kibbutz hotel picks (Dead Sea/Ein Gedi 4★, Galilee/Nof Ginosar lakeshore, Galilee guesthouses Hagoshrim+Kfar Blum, Golan/Ein Zivan+Kfar Haruv, Negev/Kibbutz Lotan eco-lodge geodesic domes, Jerusalem-area/Ramat Rachel). 6 FAQs; 3 affiliate CTAs (2× Booking.com + GYG); cross-link added to accommodation guide. 431 pages; 544/544 tests.
- iter262 (2026-07-03) · best-beaches-israel · d0b5056 · New /best-beaches-israel comprehensive beach guide: 11-beach at-a-glance comparison table covering Mediterranean (Tel Aviv Gordon/Frishman central, Hilton LGBTQ+/dog-friendly, Banana Beach young crowd, Alma Beach quiet/local, Nordau Beach religious separate-bathing; Herzliya Marina family beach; Dor Habonim NR rock pools/snorkel; Achziv wild north coast) + Red Sea Eilat (North Beach resort strip; Coral Beach Nature Reserve reef snorkel, reef-safe sunscreen mandatory, INPA Pass valid) + Sea of Galilee freshwater (Golan/Lavnun Beaches). Seasonal guidance (Med May-Jun/Sep-Oct best; Eilat year-round); flag system; Shabbat notes; what-to-bring. 6 FAQs. 3 affiliate CTAs (GYG TLV beach, Booking TLV hotels, GYG Eilat reef). Cross-links: free-things-to-do-israel.md + tel-aviv-things-to-do.md. 432 pages; 545/545 e2e+a11y tests pass.
- iter263 (2026-07-03) · israel-wellness-spa · 56f0096 · New /israel-wellness-spa wellness & spa guide: Dead Sea mineral floating + mud ritual (34% minerals; 15–20 min limit; Kalia Beach + Ein Bokek resort options; spa hotel day-pass angle); Tiberias Hamat hot springs (Roman-era sulfur mineral pools; Hamat Tiberias NP; zodiac mosaic combo); Ein Gedi sulphur springs (Kibbutz Hotel quieter alternative; cross-link ein-gedi-guide hiking); Hammam tradition (Al-Basha Hammam Akko; Jerusalem/Jaffa/TLV hammam operators; Ottoman heritage context); 6-row destination comparison table. HONESTY: therapeutic benefits "widely promoted/broadly associated"; psoriasis clinical study evidence noted; no fabricated prices. 3 affiliate CTAs (Booking.com Dead Sea spa hotels, GYG Dead Sea day tours, Viator hammam experiences). Cross-links: dead-sea-guide.md + tiberias-guide.md. Footer Essentials +1. 433 pages; 547/547 e2e+a11y tests pass.
- iter264 (2026-07-03) · review-desc-trim-264 · 0687680 · REVIEW pass on iters 261-263. Fixed: best-beaches-israel desc 170→147 chars; added /kibbutz-hotels-israel to smoke.spec.ts; added /best-beaches-israel + /kibbutz-hotels-israel to a11y.spec.ts. All 3 guides clean otherwise (links resolve, no H1 in body, titles ≤65 chars, honesty framing intact). 550/550 tests pass.
- iter266 (2026-07-03) · israel-rooftop-bars · 84b45fd · New /israel-rooftop-bars guide (P2, S, monetization): Tel Aviv rooftop bar scene — The Norman boutique terrace (small/intimate, reservation required), David Intercontinental/Barby Sky Lounge (22F Mediterranean panorama), Aloft pool bar (social/casual, DJ weekends), Market House Hotel (Carmel Market views), Yam Hotel/Jaffa area. Jerusalem: Mamilla Hotel rooftop (Old City wall views, most dramatic in country). Haifa: Carmel ridge terrace overview. Timing tips (arrive 30–45 min before sunset), dress codes, booking advice, price ranges (₪80–160/cocktail illustrative). Cross-links: tel-aviv-nightlife, tel-aviv-food-guide, jaffa-travel-guide, tel-aviv-neighborhoods-guide, carmel-market, tel-aviv-light-rail. 2 affiliate CTAs (GYG TLV evening tour + Booking.com rooftop hotel filter). 434 pages (+1); 552/552 e2e+a11y pass (+2 new tests).
- iter267 (2026-07-03) · israel-travel-tips · d5c66ef · New /israel-travel-tips "20 Things to Know Before Visiting Israel" (P2, seo-content): top-of-funnel listicle distinct from first-time-in-israel.md. 20 numbered tips: ETA-IL pre-flight, passport stamp routing, health insurance, ATM/DCC decline tip, cards accepted, local SIM/eSIM, Shabbat transport timing, Jerusalem vs TLV Shabbat differences, dress code scarf trick, Temple Mount restricted hours, bazaar haggling vs shops, Rav-Kav card, rental car West Bank insurance void, Waze tip, tap water safe, kosher restaurant dynamics, address navigation, Israeli directness, August heat warning, Jaffa tip. Quick-reference table. FAQ JSON-LD (7 Qs). Booking.com + GYG affiliate CTAs. Dense internal links to 14 guides. Wired: footer Plan column + first-time-in-israel.md cross-link. 435 pages (+1); 554/554 e2e+a11y pass (+2 new tests).
- iter268 (2026-07-03) · glamping-israel · 4881bf8 · New /glamping-israel Negev desert & Galilee eco-stays guide (P2, seo-content, S): Selina Ramon (crater-rim eco-lodge), Desert Shade eco-camp (wilderness), Kibbutz Lotan (Arava Valley geodesic domes + composting toilets honestly disclosed), Sea of Galilee kibbutz-farm stays. Season table (spring/autumn = optimal; summer heat clearly warned; winter = darkest skies). Packing checklist. Cross-link from /israel-stargazing. Footer Essentials +1. 2 CTAs (Booking.com Negev + GYG). 6 FAQs. 436 pages (+1); 556/556 e2e+a11y pass (+2 new tests).
- iter271 (2026-07-03) · israel-tour-operators-guide · e097ed7 · New /israel-tour-operators-guide money page: honest operator buyer's guide comparing Abraham Tours (best for budget/solo/social), Bein Harim (cruise/large groups), GetYourGuide marketplace (free-cancellation filter), Viator (largest verified-review base), Keshet/Egged (structured packages), IMTA private guides (licensed, deepest experience). 6-row comparison table. 3 affiliate CTAs (GYG + Viator + Abraham). Verdict box + 6 FAQs. Dense cross-links to all 6 tours-compared pages + private-tours-israel. Footer Essentials +1 "Tour operators compared" link. Cross-link from best-tours-in-israel.md. 437 pages (+1); 558/558 e2e+a11y pass (+2).
- [iter272] /israel-film-tv-tourism — Screen tourism guide (Fauda/Kfar Kasim, Shtisel/Mea She'arim, Tehran/Old City, Beauty Queen/Mahane Yehuda, Our Boys/E. Jerusalem); self-guided walk table; 7 FAQs; GYG+Viator+Abraham CTAs. SHA 4577629. Captures Netflix/Apple TV+ global audience → Israel travel intent.
- [iter273] /sea-of-galilee-boat-tour — Sea of Galilee boat tour & Jesus Boat guide (P2, S, seo-content+monetization): Kinneret Sailing crossing Tiberias→Ein Gev (₪50–90 range, Hava Nagila, April–Oct peak, Ein Gev kibbutz lunch); Jesus Boat replica sailing at Kibbutz Nof Ginosar (flag-raising ceremony, advance booking, ₪300–500 range); Yigal Alon Museum (genuine 1st-century CE vessel, honest non-attribution). Christian Galilee Gospel context. 6 FAQs. 3 CTAs (GYG Sea of Galilee + Viator Christian Galilee + Booking.com Tiberias). Footer Essentials +1 "Sea of Galilee boat tours" link. Cross-link added in tiberias-guide.md. 439 pages (+1); 562/562 e2e+a11y pass (+2). SHA a0ece75.
- iter274 (2026-07-03) · review-seo-meta-274 · 1e698c8 · REVIEW pass on iters 270-273: trimmed 3 SEO meta overruns (israel-film-tv-tourism title 66→65 chars; israel-tour-operators-guide desc 164→131 chars; sea-of-galilee-boat-tour desc 169→157 chars). No dead links, no missing test routes. 439 pages; 562/562 e2e+a11y pass.
- iter276 (2026-07-04) · shopping-in-israel · 48302b8 · New /shopping-in-israel monetization guide (P2, M, seo+monetization): Israel's four market cultures — Machane Yehuda Jerusalem (spices, Medjool dates, Marzipan rugelach, timing notes); Carmel Market + Nahalat Binyamin + Levinsky spice market Tel Aviv (contemporary craft, artisan market Tue/Fri); Jaffa Flea Market Shuk HaPishpeshim (antiques/Judaica/vinyl/Armenian ceramics, Sunday peak, bargaining norms); Jerusalem Old City bazaars by quarter (Muslim/Christian/Armenian/Jewish with product specialisations). What-to-buy definitive list: spices (za'atar, sumac, baharat, hawaiij), Dead Sea cosmetics (Ahava authenticity guidance), Israeli wine (Golan/Judean Hills), Medjool dates (customs rules), Safed ceramics (signed gallery vs unsigned tourist shops), olive wood, Judaica (Cardo Maximus). Practical tips: payment (cash preference), packing for flight (liquids in checked bag, spices in carry-on), Shabbat hours, Old City open Saturday. 6 FAQs (bargaining by market type; best souvenirs; Dead Sea cosmetics authenticity; wine takeaway; Made in Israel labelling; market hours). 3 affiliate CTAs: GYG Machane Yehuda market food tour + GYG TLV Carmel Market/Levinsky spice tour + Viator Jaffa Flea Market & Old Jaffa. Dense cross-links to 9 guides. Footer Essentials +1 "Shopping & markets guide" link. Cross-links added from jaffa-travel-guide.md (final paragraph) and mahane-yehuda-market-guide.md (Plan your visit tail). smoke.spec.ts + a11y.spec.ts +1 route each. 440 pages (+1); 564/564 e2e+a11y pass (+2). CI in_progress at push (prior run 9f7531 SUCCESS confirmed).
- iter277 (2026-07-04) · rosh-hashanah-in-israel · adbfd22 · New /rosh-hashanah-in-israel (P2, S, seo-content+monetization): High Holiday travel guide for diaspora visitors. Covers Western Wall Musaf service logistics (crowds, timing, access notes), Tashlich ceremony at Yarkon River TLV + City of David Jerusalem + Sea of Galilee Tiberias + Haifa coast, holiday food (honey+apples, round challah, honey cake/lekach, pomegranate juice), Kol Nidre context and historic synagogue access, Ten Days of Awe as a quieter touring window, transport closures (2-day Shabbat pattern), accommodation booking guidance (6–12 months ahead Jerusalem), Yom Tov full-board packages. 3 affiliate CTAs: Booking.com Jerusalem + GYG Rosh Hashanah tours + Viator High Holidays experiences. 6 FAQs (dates, non-Jewish visitor access, Tashlich locations, booking horizon, atmosphere, transport). Dense internal links: traveling-israel-jewish-holidays, western-wall-tunnels-guide, shabbat-guide, best-time-to-visit-israel, where-to-stay/jerusalem, mahane-yehuda-market-guide. Footer Essentials +1 "Rosh Hashanah in Israel" link. Cross-link added from traveling-israel-jewish-holidays.md. smoke.spec.ts + a11y.spec.ts +1 route. Note: date discrepancy found in existing traveling-israel-jewish-holidays.md (says Oct 11-12, 2026; correct is Sep 11-12 — date error in existing guide noted in JOURNAL for REVIEW iteration). 441 pages (+1); 566/566 e2e+a11y pass (+2). CI in_progress at push.
- iter278 (2026-07-04) · fix-jewish-holiday-dates-2026-2027 · a61ab47 · Content accuracy fix (P2, S, technical): corrected all incorrect 2026/2027 Jewish holiday dates in traveling-israel-jewish-holidays.md. 2026 High Holiday dates were ~30 days too late (all said October instead of September); 2027 dates were entirely wrong. Fixed RH (Sep 11-12/Oct 2-3), YK (Sep 20/Oct 10), Sukkot (Sep 25-Oct 2/Oct 15-22), Hanukkah (Dec 4-12/Dec 25-Jan 1 2028), Purim 2027 (Mar 22-23 was Feb 20-21), Passover 2027 (Apr 22-29 was Mar 22-29). All dates verified via Chabad.org before editing. 441 pages; 566/566 e2e+a11y pass.
- iter279 (2026-07-04) · review-desc-trim-279 · 0f7c9c1 · REVIEW pass on iters 276-278: trimmed rosh-hashanah-in-israel desc 169→158 chars (only defect found); shopping-in-israel and jewish-holiday-dates-fix both clean. 441 pages; 566/566 tests.
- iter280 (2026-07-04) · RESEARCH · competitor-gap-scan-280 — no ship — 7 net-new backlog items: herzliya-guide (P2 S), nachalat-binyamin-market (P3 S), israel-agritourism-guide (P2 M), tel-aviv-pub-crawl (P3 S), galilee-christian-sites-circuit (P2 M), gan-hashlosha-guide (P3 S), jordan-river-baptism-site (P3 S). Sources: tripadvisor, isrotel, beinharimtours, abrahamtours, getyourguide, d-tlv, breakingtravelnews, travelandtourworld, yardenit, parks.org.il, laidbacktrip, christiansintheland, touristisrael. Backlog ~181 ready items.
- iter281 (2026-07-04) · kerem-hateimanim-tel-aviv · e1f9d2a · New /kerem-hateimanim-tel-aviv Yemenite Quarter Tel Aviv guide (P2, S, seo+monetization): historic neighbourhood founded 1904 SW of Carmel Market; Israeli-Yemenite food culture (jachnun/malawach/lachuch/kubbaneh/hilbe/merak, Saturday morning jachnun tradition); creative/LGBTQ-friendly bar scene (HaKovshim St); combining with Carmel Market; photography + community respect; 6 FAQs; 2 affiliate CTAs (GYG food tour + Booking.com TLV hotels). Cross-link in tel-aviv-carmel-market.md + Footer Essentials. 442 pages (+1); 568/568 e2e+a11y pass (+2).

## iter 282 — herzliya-guide (8933b7b)
- /herzliya-guide — Herzliya day trip & beach city guide. Covers Apollonia National Park (Crusader Château d'Arsuf cliff ruins, INPA pass valid), Herzliya Marina (waterfront lunch), Acadia Beach (Blue Flag), Herzliya Museum of Contemporary Art. Getting there: Green Line light rail ~20 min ₪6.90. Day plan (half/full day) + northern coast circuit. 2 affiliate CTAs (GYG + Booking.com). 6 FAQs. 443 pages (+1). 570/570 tests pass (+2).

## iter 283 — tel-aviv-beach-guide (78c7ff7)
- /tel-aviv-beach-guide — Dedicated Tel Aviv beach guide (tools-fallthrough → seo-content+monetization). 7 named beaches north→south: Hilton (LGBTQ+/dog/surf zones), Gordon (central hub), Frishman (family), Banana/Bograshov (young crowd), Jerusalem/Geula Beach (best surf break, TLV Surf Club, ₪80/hr), Alma (quietest/local), Nordau (Orthodox gender-separated). Jellyfish season warning (Jul–Aug), flag system, disabled access (free beach wheelchairs via municipality app), getting there by bus/light rail. Cross-link added to best-beaches-israel.md + Footer Essentials. 2 affiliate CTAs (Booking.com TLV beachfront + GYG beach experiences). 444 pages (+1); 572/572 tests pass (+2). [seo-content+monetization]

- [iter284] review-desc-trim-284 · e10cf65 · REVIEW: fixed tel-aviv-beach-guide desc 166→159 chars (1 defect); all 19 links + 3 cross-links + 3 footer links + smoke/a11y coverage verified clean for iters 281-283.
- iter285 (2026-07-04) · RESEARCH · competitor-gap-scan-285 — no ship — 6 net-new backlog items: neve-tzedek-guide (P2 S), israel-hummus-trail (P2 S), israel-diamonds-jewelry (P3 S), israel-thermal-baths (P3 S), rishon-lezion-guide (P3 S), bat-yam-guide (P3 S). Sources: timeout.com/israel, secrettelaviv.com, touristisrael.com, beinharimtours.com, tripadvisor.com, ramatgandiamond.com, visithamatgader.co.il, tourism.gov.il, batiment.co.il. Backlog ~187 ready items.

## iter 286 — neve-tzedek-guide (b803fa4)
- /neve-tzedek-guide — Tel Aviv's 1887 first Jewish neighbourhood guide (P2, S, seo+monetization). History (66 founding families; "Oasis of Justice"; predates Tel Aviv; Ottoman-era houses; 1989 Suzanne Dellal-anchored artist revival). Suzanne Dellal Centre for Dance and Theatre (Batsheva Dance Company home; free bougainvillea courtyard; ticketed performances advance-booking required). Shabazi Street (independent designer boutiques; Maskit; Thu–Fri only; all Sat closed). Nahum Gutman Museum (21 Shimon Rokach St; pioneer illustrator; ~₪30; Thu extended hours). Architecture walk (1887 Ottoman stone + 1920s International Style overlay). Where to eat: Shabazi 26, Orna & Ella, HaBasta. Practical: Green Line to Florentine; no parking. 6 FAQs. 2 affiliate CTAs (Booking.com boutique hotels Alma Hotel/Shapira House + GYG Neve Tzedek/Jaffa walking tour). Cross-link: tel-aviv-neighborhoods-guide forward link fixed (/tel-aviv/neve-tzedek → /neve-tzedek-guide). Footer Essentials +1. 445 pages (+1); 574/574 e2e+a11y pass (+2).

## iter 287 — israel-hummus-trail (6cc88b5)
- /israel-hummus-trail — Six-stop Israel hummus circuit guide (P2, S, seo-content). Abu Hassan/Ali Karavan (Jaffa HaDolphin 1, silky Jaffa-style, cash-only, morning-only, closed Sat); Abu Shukri (Jerusalem Old City Muslim Quarter Al-Wad St, earthy Jerusalem-style, morning); Azura (Jerusalem Machane Yehuda, Iraqi-Jewish stovetop style, optional lamb topping, lunch only); Abu Gosh (highway village W of Jerusalem, open Saturdays, multiple competing restaurants); Hummus Said (Akko Old City Ottoman arcades, most tahini-forward, morning only); Afteem (Bethlehem Manger Square, standard tourist West Bank Checkpoint 300 crossing). Style explainer (Jerusalem thick/earthy vs Jaffa silky/tahini). Circuit plans (1-day Jerusalem, TLV day, 2-day full circuit). Honesty: no "best" declarations; opening hours as of research with verify-before-visiting caveats; Abu Hassan imitators noted. 2 affiliate CTAs (GYG Jerusalem food tour + Viator Jaffa food walk). Back-wired cross-links in jaffa-food-guide.md, jerusalem-food-guide.md, israeli-food-cuisine-guide.md. Footer Essentials +1. 446 pages (+1); 576/576 e2e+a11y pass (+2).

## iter 288 — israel-agritourism-guide (73a4d07)
- /israel-agritourism-guide — Year-round Israel farm picking & agritourism guide (P2, M, seo+monetization). Seasonal calendar: strawberries Feb–Mar (Shefela/Galilee), citrus Nov–Feb (Sharon), Golan cherries Jun (Moshav Odem, ~2–3 weeks), Medjool dates Sep–Oct (Arava: Kibbutz Ketura + Lotan), figs/pomegranates/bananas Aug–Sep. Historic sites: Neot Kedumim (biblical landscape park, bus-accessible), Kfar Kedem (Lower Galilee, donkey rides + biblical farming, pre-book), Ein Yael Farm Museum (Jerusalem, city bus). Kibbutz programs: Lotan eco-farming, Ketura dates + solar, expanding Galilee programmes under 2026 govt 13M ILS investment. Car requirement and exceptions noted. HONESTY: no hardcoded dates (seasonal); verify-before-visiting throughout. 2 affiliate CTAs (GYG farm/nature tours + Booking.com rural Galilee). Back-wired: car-rental-israel.md + galilee-tours-compared.md. Footer Essentials +1. 447 pages (+1); 578/578 e2e+a11y pass (+2).

- [iter289] review-pass-289 — REVIEW: audited neve-tzedek-guide, israel-hummus-trail, israel-agritourism-guide (iters 286–288). All 7 checks clean: SEO meta (3/3 ✓), 16 internal links (0 dead), 6 cross-link back-wires, 3 footer links, smoke+a11y coverage, 4 hero images, pnpm check 0 errors. 0 defects found; no code changes needed.

## iter 291 — israel-jordan-itinerary (6fe447d)
- /israel-jordan-itinerary — 10-day combined Israel + Jordan itinerary guide (P2, M, seo+monetization). Route: Jerusalem (3 days: Old City + Yad Vashem + Bethlehem) → Dead Sea (Ein Bokek overnight) → Masada sunrise → Eilat → Wadi Araba border → Petra full day → Wadi Rum Bedouin camp → Amman → Jerash → Allenby Bridge. At-a-glance table, day-by-day breakdown, dual border-crossing comparison table (Wadi Araba vs Allenby), Jordan Pass guidance, Shabbat timing, dual-stamp section, practical tips (car hire restrictions, transport in Jordan, season). 6 FAQs. 3 affiliate CTAs: TourRadar (packages) + Viator (Petra/Wadi Rum) + GYG (Jordan Pass). Cross-link from petra-from-israel.md. Footer Day Trips +1 link. Smoke +1; a11y +1. 448 pages (+1); 580/580 e2e+a11y pass (+2). Vercel CI in_progress at push (standard pattern).

## iter 292 — christmas-in-israel (ab300e6)
- /christmas-in-israel — Christmas in Israel + Winter travel guide (P2, M, seo-content+monetization). Three Christmas dates (Catholic Dec 24, Orthodox Jan 6, Armenian Jan 18). Church of the Nativity Bethlehem: Midnight Mass ticket requirement, Manger Square outdoor, Checkpoint 300 logistics, Ministry of Tourism shuttles (honest "typically offered — verify annually"). Church of Holy Sepulchre Jerusalem + Christian Quarter. Nazareth Christmas market (largest Arab-Christian celebration inside Israel). Tel Aviv New Year. Winter advantages: fewer crowds, lower prices, green landscapes, Eilat/Dead Sea warm. Jerusalem snow (unpredictable). 6 FAQs. 3 affiliate CTAs: TourRadar (packages) + Abraham Tours (day trips) + Booking.com (hotels). Back-wired: best-time-to-visit-israel.md → /christmas-in-israel. Smoke +1. 449 pages (+1); 581/581 e2e+a11y pass (+1). GREEN.

## iter 293 — israel-effective-days (fbf10f5)
- /israel-effective-days — Effective Touring Days Calculator (P2, S, tools). Takes arrival/departure dates → quantitative effective-days score. Day weights: weekday=1.0, Friday=0.8, Shabbat=0.6, full-closure holiday=0.4, partial holiday=0.8, arrive/depart=0.5. Week-by-week visual calendar with 6-colour coding. Itinerary CTA matched to effective-days bucket (<3.5→3-day Jerusalem, ≤5.5→5-day, ≤8.5→7-day, ≤12→10-day, else→browse). 2026–2027 full Jewish holiday dataset. 5 FAQs. Booking.com CTA. Wired into plan-your-trip hub (#20 tool). i18n (en/fr/de tool.effectiveDays). 7 new e2e tests. TypeScript fix: affiliateUrl({city}) → {destination}. 450 pages (+1); 588/588 e2e pass (+7). GREEN.

## iter 294 — review-effective-days-fixes (65712cf)
- REVIEW: Audited iters 291–293. Fixed 2 confirmed bugs in israel-effective-days.astro: (1) parseLocalDate() fix for UTC-offset timezone calendar shift; (2) Tisha B'Av 2026 end date corrected from Jul 23 to Jul 22. Flagged Tisha B'Av 2027 date [2027,8,11]=Aug 11 for human review (independent calc gives Jul 11). Confirmed christmas-in-israel.md and israel-jordan-itinerary.md clean (internal links, SEO meta, affiliate attrs). 450 pages; 588/588 e2e pass. GREEN.

## iter 296 — maccabiah-games-2026 (7102458)
- /maccabiah-games-2026 — Maccabiah Games 2026: Spectator & Visitor Guide to the Jewish Olympics (URGENT P2, M, seo-content+monetization). LIVE-EVENT SEO: games running Jun 30–Jul 13 2026; guide also evergreen for Maccabiah 23 in 2030. Content: what Maccabiah is (founded 1932, Yosef Yekutieli, "Jewish Olympics"); 4 divisions (Open/Junior/Masters/Physically Challenged); 10,000+ athletes from 80+ countries; 22nd games overview table; Opening Ceremony at Teddy Kollek Stadium (separately ticketed); free spectator access to competition rounds; 5 venue cities (Jerusalem/TLV/Netanya/Haifa/Beer Sheva); transport options (Maccabiah shuttles/Israel Rail/rental car/Gett); accommodation planning (3–6 months advance, July peak season); volunteer programme (18+, 10–14 days, apply maccabiah.com); July-in-Israel context + practical info (security, visas, costs range ₪800–2500/night). 3 affiliate CTAs: Booking.com Jerusalem + Booking.com Tel Aviv + Discover Cars. 6 FAQs. Cross-link in israel-events-festivals.md Summer row. Smoke +1 route. 451 pages (+1); 589/589 e2e+a11y pass (+1). GREEN.

## iter 297 — israel-hidden-gems (ce7114c)
- /israel-hidden-gems — Hidden Gems of Israel: 11 Off-the-Beaten-Path Sites (P2, M, seo-content). Hub guide covering: Nimrod Fortress (Golan, largest Crusader/Mamluk castle in ME), Beit Guvrin & Maresha (UNESCO 3,000-room cave network, Cave Wanderer activity), Wadi Qelt canyon + 5th-century St George Monastery (Jerusalem→Jericho, Oct–Apr hike), Herodion (Herod's fortress-tomb 12km SE of Bethlehem, less crowded than Masada, tomb found 2007), Tel Megiddo (26 occupation layers, Canaanite temples, Ahab's water tunnel, Armageddon etymology), Timna Park (3,200-year-old Egyptian copper mines + Solomon's Pillars sandstone columns, Oct–Apr), Ein Hod (Marcel Janco Dada artists' village in Carmel mountains, Janco-Dada Museum), Rosh Pina (1882 Rothschild Galilee village + Nimrod Lookout trail), Mar Saba (483 CE Byzantine cliff monastery, oldest continuously inhabited, women exterior only), Beit She'an (Roman city frozen by 749 CE earthquake, 7,000-seat theatre), Achziv (Phoenician ruins + Achzivland micro-nation + snorkelling). Planning section: site pairings by base city. HONESTY: no prices as exact; Area C sites flagged for current-access check; seasonal windows confirmed honest ("roughly 2–3 weeks" for cherries). 3 GYG affiliate CTAs. Dense cross-links: 14+ existing guides. Smoke +1 route. 452 pages (+1); 590/590 e2e+a11y pass (+1). GREEN.

## iter 298 — jerusalem-nightlife (83c83d4)
- /jerusalem-nightlife — Jerusalem Nightlife: Bars, Music Venues & Evening Guide (P2, S, seo-content+monetization). Distinct from tel-aviv-nightlife.md (TLV = clubs/24h; Jerusalem = wine bars/music, closes 2–3am). Sections: Mahane Yehuda after dark (shuk-bar transformation Thu/Sat nights; HaBasta, Machneyuda area, Basher Wines); German Colony / Emek Refaim (wine-bar strip, Fattoush garden bar); Ben Yehuda & Zion Square (tourist-accessible pubs); Yellow Submarine (HaRechavim 13, indie/jazz/rock, ₪40–100, yellowsubmarine.org.il); Mamilla Mirror Bar (Old City walls view, ₪70–120); Beit Avi Chai (cultural evenings). Practical: Shabbat timing (Thu = biggest night; Fri = closed; Sat = late-starter post-Shabbat end ~21:00); transport (Gett/Yango, light-rail until midnight); honest TLV comparison (2–3am vs 5–6am, wine bars vs clubs). HONESTY: not described as "party city"; venue hours framed as "typically"; no fabricated prices beyond ranges; yellowsubmarine.org.il link-only for schedule. 2 CTAs: GYG Jerusalem evening food+wine tour + Booking.com Jerusalem hotels. 6 FAQs. Smoke +1 route. 453 pages (+1); 591/591 e2e+a11y pass (+1). GREEN.

## iter 299 — review-299-fixes (88f467a)
- REVIEW pass. Audited iters 296–298 (maccabiah-games-2026, israel-hidden-gems, jerusalem-nightlife). Bugs fixed: (1) israel-hidden-gems.md linked "Banias waterfall" to /caesarea-guide — corrected to /golan-heights-guide; (2) maccabiah-games-2026.md description was 185 chars — trimmed to 139; (3) jerusalem-nightlife.md description was 162 chars — trimmed to 145. All internal links in all 3 files verified clean. Gate: pnpm check 0 errors · build 453 pages · 591/591 pass. GREEN.

## iter 301 — galilee-vs-golan-weekend (9b0c6ce)
- /galilee-vs-golan-weekend — Galilee vs Golan Heights: Which to Visit for a Weekend? (P2, S, seo-content+monetization). Comparison guide using proven format (same as tel-aviv-vs-jerusalem, dead-sea-israel-vs-jordan, petra-from-eilat-vs-amman). Side-by-side table: landscape, sights, wine, car requirement, summer temperature, skiing, base town. Decision frameworks: Galilee for pilgrimage/lake/no-car; Golan for highland scenery/wine/skiing/summer escape. Honest combined-trip guidance: 35–40 min between Tiberias and Katzrin; 4-day sample structure. Golan's disputed international legal status noted in FAQ and is-israel-safe cross-linked. HONESTY: no fabricated prices; Golan status accurate; season framing hedged ("snow-dependent"). 2 affiliate CTAs: discovercars (car rental, both regions need car — natural angle) + Booking.com Tiberias. 6 FAQs. Dense cross-links: /galilee, /golan, /golan/nimrod-fortress, /galilee-tours-compared, /car-rental-israel, /transportation, /is-israel-safe. Broken link /israel-road-trip removed pre-gate (not yet built). 454 pages (+1); 592/592 e2e+a11y pass (+1 smoke route). GREEN.

## iter 302 — dead-sea-vs-eilat (937cae2)
- /dead-sea-vs-eilat — Dead Sea vs Eilat: Which Should You Visit? (P2, S, seo-content+monetization). Comparison guide for the most common southern Israel "which to choose" query. Side-by-side table, decision frameworks for each destination, honest 5-day combined-trip itinerary, 4 affiliate CTAs. 455 pages (+1); 593/593 e2e+a11y pass (+1 smoke route). GREEN.

## iter 303 — fix-2027-holiday-dates (392b4b2)
- Fix all 2027 Hebrew holiday dates in israel-effective-days.astro — 5787 is a Hebrew leap year (Adar I + Adar II); all 16 HOLIDAYS entries were wrong (off by ~1 month). Corrected: Tu BiShvat Jan 22, Purim Mar 22, Passover Apr 21-28, Yom HaZikaron May 11, Yom Ha'atzmaut May 12, Shavuot Jun 10-11, Tisha B'Av Aug 12, Rosh Hashanah Oct 1-2, Yom Kippur Oct 10, Sukkot Oct 15-23, Hanukkah Dec 24-Jan 1 2028. P1 technical item from BACKLOG resolved. Gate: 0 errors · 455 pages · 593/593 pass. GREEN.

## iter 304 — review-304-desc-fix (c192dba)
- REVIEW pass auditing iters 301-303 (galilee-vs-golan-weekend, dead-sea-vs-eilat, fix-2027-holiday-dates). One SEO bug found and fixed: dead-sea-vs-eilat description trimmed from 165 to 157 chars. All other checks clean. Gate: 0 errors · 455 pages · 593/593 pass. GREEN.

## iter 306 — dead-sea-medical-tourism (6e003dc)
- New /dead-sea-medical-tourism guide — highest hotel-nights conversion potential on the site. Covers the Dead Sea climatotherapy pathway for European medical tourists (psoriasis, eczema, vitiligo, psoriatic arthritis): UVB mechanism at 430m below sea level (distinct from leisure float), clinical evidence summary (70–90% psoriasis clearance rates from peer-reviewed literature, honestly framed as remission not cure), medical infrastructure at Ein Bokek (Paula Dead Sea Clinic, David Dead Sea Resort, Isrotel), EU health insurance reimbursement by country (German GKV pre-authorisation process, Danish klimabehandling, Swiss Zusatzversicherung), cost breakdown table, seasonal planning, 7 FAQs. Booking.com (21–28 night stays = maximum nights-value) + GYG day tour CTAs. Cross-links added from dead-sea-guide, israel-wellness-spa, israel-for-seniors. Footer link added. Gate: 0 errors · 456 pages · 593/593 pass. GREEN. Lighthouse success.

## iter 307 — latrun-guide (f862a88)
- New /latrun-guide — Route 1 corridor between Tel Aviv and Jerusalem: Yad La-Shiryon Armored Corps Museum (200+ AFVs, 1948 Battle of Latrun story), 1890 Trappist Monastery (kosher wine + olive oil), Mini Israel (350+ 1:25 scale models). 7 FAQs, 3 CTAs (GYG + Viator + DiscoverCars). Cross-links added to day-trips-from-tel-aviv, day-trips-from-jerusalem, israel-agritourism-guide. 457 pages built.

## iter 308 — zichron-yaakov-guide (7c67a4e)
- New /zichron-yaakov-guide — Israel's oldest wine village, founded 1882 by Baron Edmond de Rothschild. Fills Carmel coast corridor gap between caesarea-guide.md and haifa-travel-guide (planned). Content: Hameyasdim Street walking guide (300m cobbled Ottoman pedestrian street, eucalyptus trees, wine bars, artisan market), Carmel Winery visitor centre (tastings ₪50-80, cellar tour, book carmelwines.co.il; closed Shabbat), Ramat Hanadiv memorial gardens (free entry, Rothschild tomb, panoramic sea view, ramat-hanadiv.org.il), Nili Museum/Beit Aaronson (WWI spy network, limited hours). Getting there by train (Binyamina station ~50 min TLV, ~40 min Haifa) and car (Route 2 + Route 70). Caesarea+Zichron Yaakov one-day itinerary. Seasonal table. 7 FAQs. CTAs: GYG Carmel wine tour + Discovercars coastal self-drive + Booking Zichron Yaakov stays. Cross-links: day-trips-from-haifa (link added), caesarea-guide (Wikipedia → /zichron-yaakov-guide), israel-wine-wineries (new sentence in Shomron/Mount Carmel section). 458 pages built; 593/593 pass.

## iter 309 — review-309-desc-fix (08cd250)
- REVIEW audit of iter306-308 guides. Fixed 2 SEO meta description overflows: (1) latrun-guide.md 164→160 chars; (2) zichron-yaakov-guide.md 184→142 chars. dead-sea-medical-tourism.md clean (160 chars, all links/images/honesty verified). All internal links, hero images, no-H1, honesty framing clean across all three guides. 593/593 e2e+a11y pass.

## iter 311 — best-hotels-jerusalem (7e100a5)
- BUILD (monetization). New /best-hotels-jerusalem guide: neighbourhood hotel picks for Jerusalem (Mamilla Hotel, Waldorf Astoria Jerusalem, American Colony Hotel, Leonardo Boutique, Abraham Hostel). 5 zone breakdown, 3-tier hotel picks, 9-row decision matrix, Jerusalem-specific booking patterns (Passover 3-4× surge, Sukkot/High Holiday cluster, Christmas/Easter waves), 6 FAQs, 3 affiliate CTAs (Booking.com ×2 + GYG). Completes "best hotels [city]" series (TLV iter243, Eilat iter241, Dead Sea iter247). Cross-links added to israel-accommodation-guide, jerusalem-neighborhoods-guide, best-hotels-tel-aviv. 593/593 e2e+a11y pass.

## iter 312 — BUILD (seo-content) · via-dolorosa-guide · 086e2bb
- /via-dolorosa-guide: 14-station self-guided Via Dolorosa walking guide; all outdoor stations I–IX (Muslim Quarter souk) + indoor X–XIV (Church of the Holy Sepulchre); Friday Franciscan procession guide (3pm, free); timing windows; 7 FAQs; GYG Via Dolorosa tour CTA + Booking.com Jerusalem hotels CTA; cross-links upgraded in 4 existing guides. SEO: "Via Dolorosa walking guide Jerusalem", "14 stations of the cross Jerusalem self-guided".
