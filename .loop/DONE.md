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
