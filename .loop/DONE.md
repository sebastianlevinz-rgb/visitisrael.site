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
