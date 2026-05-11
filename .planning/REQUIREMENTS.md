# Requirements: Discover Israel

**Defined:** 2026-05-11
**Core Value:** Every tourist who lands on the site finds a credible, monetized path to booking what they came to research — without the structural debt that plagued the prior Discover Argentina project.

Derived from:

- `MEGA-PROMPT-NEW-COUNTRY.md` (full mission + phase plan)
- `.planning/research/SUMMARY.md` (synthesized findings + headline decisions)
- `.planning/research/{STACK,FEATURES,ARCHITECTURE,PITFALLS}.md` (research streams)
- `.planning/PROJECT.md` (project context)

Conflict resolutions adopted from SUMMARY §3: Conflict A (locale registration), Conflict C (Jerusalem pilot with Phase 2.2 checkpoint), Conflict D (9 real + 2 stub affiliate helpers).

---

## v1 Requirements

Requirements for initial production launch. Each maps to roadmap phases (traceability section at bottom).

### Foundation

The 11 sub-phases of Phase 1 (mega-prompt Fase 1). All must complete and pass before any region canonical is written.

- [x] **FND-01**: Next.js 15.5 + App Router + TypeScript 5.6+ strict + Tailwind v4 + pnpm scaffold deployed to Vercel with placeholder domain
- [ ] **FND-02**: 3-layer design tokens (foundation / semantic / component) in Tailwind v4 `@theme`, all color usage routed through semantic tokens — zero raw hex codes in components
- [ ] **FND-03**: Component primitives (`Button`, `Card`, `Tag`, `Badge`, `Section`, `Container`, `Grid`) with CVA variants and travel composites (`RegionHero`, `AttractionGrid`, `AffiliateCard`, `PhotoGallery`, `StickyCTA`, `ItineraryCard`, `WhereToStay`, `TransportInfo`, `BestTimeToVisit`, `ShabbatNotice`, `Price`, `SkipNav`)
- [ ] **FND-04**: `/admin/components/` noindex playground showing every primitive + composite in default + edge-case states
- [ ] **FND-05**: 5 quality scoring profiles implemented (`REGION_CANONICAL`, `SUB_DESTINATION`, `GUIDE_OR_WINERY`, `UTILITY`, `HUB`) with distinct weights — fixes Argentina lesson #5
- [ ] **FND-06**: Dynamic `sitemap.ts` enumerates ONLY registered locales; `robots.ts` disallows `/admin/` and `/api/`; canonical URL generator; hreflang generator with reciprocal `<link>` tags + `x-default`; 301 redirects map in `middleware.ts`
- [ ] **FND-07**: NER / mention-detection dictionary (`data/entity-dict.json` with tour/hotel/restaurant/museum/transport classes) + regex-based detector that surfaces unmonetized mentions in MDX to the audit dashboard — fixes Argentina lesson #6
- [x] **FND-08**: `Plausible` (or PostHog if user decides otherwise in Phase 1.1) wired with UTM tracking on every CTA; no cookie banner needed (Plausible is cookie-less)

### Affiliate Infrastructure

Day-1 strategy fix to Argentina lesson #2 (one partner reached 92%, another 18%).

- [ ] **AFF-01**: Affiliate helpers for 9 verified-operational Israel partners: `bookingLink()`, `civitatisLink()`, `viatorLink()`, `getYourGuideLink()`, `rentalcarsLink()`, `safetyWingLink()`, `skyscannerLink()`, `hostelworldLink()`, `discoverCarsLink()` — each reads its env var and returns either AID-tagged URL or public URL (codemod-ready to flip)
- [ ] **AFF-02**: Stub helpers `klookLink()` and `goCityLink()` that throw a documented "no Israel inventory" error; placeholder env vars in `.env.example`; `data/affiliate-availability.json` flag set to `'absent'`
- [ ] **AFF-03**: ≥4 Vitest unit tests per real helper (36 tests = 4 × 9 real helpers) + 8 stub-throw tests (4 × 2 stubs) + 4 affiliate-availability tests = **48 total tests** passing in `lib/affiliate/`
- [ ] **AFF-04**: ESLint `no-restricted-syntax` rule prohibits raw partner URLs (`href="https://www.booking.com/..."`) in component JSX — escape hatch only for `lib/affiliate/**`
- [ ] **AFF-05**: ESLint rules prohibit raw hex (`bg-[#abc]`, `text-[#fff]`, `style={{color: '#fff'}}`) and physical Tailwind directional utilities (`ml-`, `pr-`, `border-l`, `text-left`) in components
- [ ] **AFF-06**: FTC affiliate disclosure rendered INLINE within 1 viewport-height of FIRST affiliate link on every monetized page (not footer-only) — audit rule AUD-009
- [ ] **AFF-07**: `data/affiliate-status.json` tracks AID receipt date and `state ∈ {pending, applied, active, sparse, absent}` per partner — re-evaluated quarterly
- [ ] **AFF-08**: Travelpayouts aggregator account configured as fallback for partners with traffic minimums (Skyscanner 5K visitors/mo requirement)

### Internationalization & RTL

Argentina lesson #7 fix — i18n NOT bolted-on.

- [x] **I18N-01**: `next-intl` v3 wired with App Router; `localePrefix: 'as-needed'` — HE at root, EN at `/en/`
- [x] **I18N-02**: `i18n-config.ts` registers ONLY `he` and `en` at launch (Conflict A resolution); filesystem + types + Velite collection allow `'he' | 'en' | 'fr'` for cheap FR addition later
- [ ] **I18N-03**: Hebrew Tailwind preset from `skills-il/localization@hebrew-tailwind-preset` applied; all components use logical CSS properties (`ms-/me-/ps-/pe-/start-/end-/inset-inline-start`) — zero physical directional utilities
- [x] **I18N-04**: `<html lang="he" dir="rtl">` for Hebrew pages and `<html lang="en" dir="ltr">` for English pages, set per-route via layout
- [ ] **I18N-05**: Hreflang generator emits `<link rel="alternate" hreflang="he" />` and `<link rel="alternate" hreflang="en" />` + `x-default` only for built locales; reciprocal tagging audited (AUD-014)
- [x] **I18N-06**: Velite + MDX content pipeline with per-locale directories (`content/{he,en}/regions/*.mdx`); Velite collection schema enforces `lang: z.enum(['he','en','fr'])` future-readiness

### Accessibility (IS 5568)

Beyond WCAG 2.1 AA — Israeli law mandates additional items. Up to 50,000 NIS damages per violation.

- [x] **A11Y-01**: Every page declares `lang` and `dir` correctly (AUD-027)
- [ ] **A11Y-02**: Hebrew skip-navigation link (`דלג לתוכן הראשי`) is the first focusable element on every Hebrew page; English skip link on English pages
- [ ] **A11Y-03**: `/accessibility-statement` (English) + `/הצהרת-נגישות` (Hebrew, transliterated slug allowed if Hebrew slug deferred) pages exist with all IS 5568 required content (commitment, standard, features, limitations, coordinator contact, last-audit date)
- [ ] **A11Y-04**: Named accessibility coordinator (real person, real phone, real email — placeholder NOT acceptable) listed on accessibility statement page; same person reachable via `mailto:` and `tel:` links
- [ ] **A11Y-05**: Footer of every page links to accessibility statement in current locale (AUD-028)
- [ ] **A11Y-06**: All form inputs have associated labels; all interactive elements have aria-labels or accessible names; error messages use `role="alert"` and are rendered in Hebrew for Hebrew forms, English for English forms
- [x] **A11Y-07**: ZERO accessibility overlays (accessiBe / UserWay / EqualWeb / AudioEye) — overlay-based remediation is explicitly prohibited (FTC $1M precedent + IS 5568 ineffectiveness)
- [ ] **A11Y-08**: Lighthouse a11y score ≥95 mobile (3-run-median) per page; supplementary axe-core checks run in CI; Israeli-specific checks via `audit_a11y.py` from `israeli-accessibility-compliance` skill

### Schema & SEO

- [ ] **SEO-01**: `schema-dts` library wired; native `<script type="application/ld+json">` injection from RSC; page-level injection (not layout) except `Organization` schema in root layout
- [ ] **SEO-02**: Schema generators implemented for `TouristDestination`, `TouristAttraction`, `ReligiousBuilding`, `Place`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`, `WebSite`, `CollectionPage`, `WebPage`, `Organization`
- [ ] **SEO-03**: Local validator script (`scripts/qa/validate-schema.mjs`) catches malformed JSON-LD pre-commit; supplementary Google Rich Results Test sampling in CI for changed pages
- [ ] **SEO-04**: Religious-site naming convention: paired naming on first reference (`Temple Mount / Haram al-Sharif`), `Western Wall` not `Wailing Wall`, `Bethlehem/Hebron/Jericho` carry `administrativeStatus` frontmatter; audit rules AUD-017..AUD-020
- [x] **SEO-05**: Title tags 50–60 chars (Hebrew: ~50 chars accounting for character width); meta description 120–160 chars; H1 once per page; H2 every 200–300 words
- [ ] **SEO-06**: Canonical URLs self-referential per locale (never cross-locale); no canonical pointing from EN page to HE page or vice versa

### Image Pipeline & Credits

Argentina lesson #3 fix — image contract enforced day-1.

- [x] **IMG-01**: `data/photo-credits.json` with schema `{ src, author, license, sourceUrl, region, slug, width, height, subjectType, restrictedSiteAcknowledgment?, licenseProof? }`; Zod validates on every commit
- [x] **IMG-02**: CI gate fails build if any imported image lacks a credits ledger entry, has width <1200px, or is referenced but missing from filesystem
- [x] **IMG-03**: PhotoGallery and all `<Image>` usages emit `srcset` at 320w / 640w / 1024w / 1600w; AVIF + WebP + JPEG fallback via `next/image`
- [ ] **IMG-04**: Hero images on canonical pages use `priority` + `fetchpriority="high"` (AUD-012)
- [ ] **IMG-05**: `restrictedSiteAcknowledgment` field populated for every image from Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í Gardens; ledger validator fails if missing for those subjects
- [x] **IMG-06**: Primary source: Wikimedia Commons CC-BY/CC-BY-SA; supplementary: IGPO archive; abstract heroes from Unsplash/Pexels — origin tracked in `license` field

### Audit Dashboard & Quality Gate

- [ ] **AUD-01**: `/admin/audit/` route (noindex, basic-auth middleware) runs all 34 audit rules (AUD-001..AUD-034 from PITFALLS §6) over built pages; produces cached JSON + HTML view
- [ ] **AUD-02**: Per-page score (0–100) using one of the 5 quality profiles (FND-05); score gate ≥85 per page on pilot, ≥80 on replicated regions
- [ ] **AUD-03**: Lighthouse CI (`@lhci/cli`) configured with `numberOfRuns: 3` + `aggregationMethod: 'median'`; thresholds: mobile perf ≥0.90, a11y ≥0.95, best-practices ≥0.95, SEO 1.00; deploy blocked on fail
- [ ] **AUD-04**: Pre-commit hooks (Husky + lint-staged) run ESLint + TypeScript check + schema validator + photo-credits validator
- [ ] **AUD-05**: Quality Gate report generator: writes `data/quality-gate-{pass|failure}.md` summarizing every criterion result before Phase 3 advance

### Pilot Region (Jerusalem)

- [ ] **CNT-01**: Jerusalem region canonical (EN, `/en/jerusalem/`) — hero with editorial photo from ledger, 8–12 sections (best time, top attractions, where to stay [Booking affiliate], tours [Civitatis/Viator/GYG], how to get there [Skyscanner/RentalCars], food, day trips, FAQ), 1500–2500 words, 5+ active affiliates, schema `TouristDestination` + `BreadcrumbList` + `FAQPage`
- [ ] **CNT-02**: Jerusalem region canonical (HE, `/jerusalem/`) — native Hebrew rewrite via `hebrew-content-writer` skill (NOT literal translation), ≥85% of EN word count, full schema parity, paired religious naming where applicable
- [ ] **CNT-03**: Phase 2.2 checkpoint executed (post-CNT-02): AUD-017..AUD-020 editorial style passes + Old City restricted-site image sourcing cleared + Hebrew translation throughput acceptable for sub-dests; if any fails, pilot region switches to Tel Aviv before sub-dest writing
- [ ] **CNT-04**: 5–10 Jerusalem sub-destination pages (EN + HE) — each 800–1200 words, schema `TouristAttraction`, ≥1 affiliate per page, credited photos, breadcrumb back to Jerusalem canonical
- [ ] **CNT-05**: At least 1 Jerusalem itinerary page (e.g., "3 days in Jerusalem", "7 days in Israel including Jerusalem") that ties pilot region to day-trip neighbors
- [ ] **CNT-06**: Hub pages: homepage (region grid + main CTAs), `/regions/` index, `/en/regions/`
- [ ] **CNT-07**: Legal pages (in both EN + HE): About, Contact, Privacy, Affiliate Disclosure, Accessibility Statement — A11Y-03/A11Y-04 satisfied here

### Region Replication

- [ ] **REG-01**: 10 additional region canonicals built (EN + HE pairs) in order: Tel Aviv, Dead Sea, Galilee, Eilat, Negev, Nazareth, Haifa, Golan Heights, Caesarea, Akko (Masada deferred to sub-destination of Dead Sea or Negev per FEATURES taxonomy)
- [ ] **REG-02**: Per region: 3–8 sub-destinations (EN + HE), prioritized by R3 keyword volume; total sub-destination count 30–80 across all regions
- [ ] **REG-03**: Per region soft gate: audit ≥80 per page, Lighthouse mobile (3-run-median) ≥85 per page; Quality Gate hard was at pilot only
- [ ] **REG-04**: Bethlehem covered as `/west-bank/bethlehem/` with editorial `administrativeStatus` framing (Palestinian Authority), separate from Israel-proper regions; Hebron explicitly excluded for editorial sensitivity (out of scope, see below)
- [ ] **REG-05**: Region-specific image gaps addressed: Haifa Bahá'í photography policy confirmed in writing before commissioning; Negev/Galilee image commissioning budget ($1,500–$3,000) approved or alternative sources sourced from IGPO

### Deploy & Monitoring

- [ ] **DEP-01**: Vercel production deploy on owned domain with HTTPS + HSTS
- [ ] **DEP-02**: Google Search Console verified; sitemap submitted; IndexNow ping configured
- [ ] **DEP-03**: Audit dashboard accessible at `/admin/audit/` behind basic auth (middleware via env-stored credentials)
- [ ] **DEP-04**: Lighthouse CI history retained for 90 days (regression detection)
- [ ] **DEP-05**: Affiliate health monitor: weekly cron via Vercel Cron Jobs that HEAD-checks every affiliate URL pattern and writes failures to `data/affiliate-health.json`
- [ ] **DEP-06**: `data/post-launch-backlog.md` enumerates everything punted (FR locale, Hebrew slugs, RU locale, Klook activation, GoCity activation, user accounts, AI itineraries) with rationale and re-evaluation trigger

---

## v2 Requirements

Acknowledged but deferred. Tracked, not in current roadmap.

### Additional Languages

- **I18N-V2-01**: French (FR) locale content + registration in `i18n-config.ts` — scaffold ready (per Conflict A resolution); content + activation deferred until M3 decision based on Christian pilgrimage SERP capture analysis
- **I18N-V2-02**: Russian (RU) locale — defer further; re-evaluate if 2026/2027 Israel inbound tourism shifts toward post-Soviet diaspora trends
- **I18N-V2-03**: Hebrew slug aliases for high-volume regions (e.g., `/ירושלים/` redirecting to `/jerusalem/`) — pending R3 paid keyword data showing meaningful Hebrew exonym search advantage

### Long-tail Sub-destinations

- **SUB-V2-01**: Phase 4 long-tail sub-destination sweep — sub-destinations beyond the 30–80 built in REG-02, prioritized by validated keyword volume from Ahrefs/DataForSEO data. **Promoted to Phase 4 (v1 execution scope)** in ROADMAP.md after roadmap analysis confirmed long-tail is essential to the "compete on SEO" core value but only after canonicals stabilize per Argentina lesson #9.

### Klook + GoCity Activation

- **AFF-V2-01**: Activate Klook helper from stub to real if Klook expands Israel SKU breadth above per-tour-ID gate threshold
- **AFF-V2-02**: Activate GoCity helper from stub to real once GoCity launches an Israel destination pass

### Editorial Content

- **EDT-V2-01**: Long-form blog/editorial content — only if SEO research detects competitive gaps that affiliates don't cover

### Optional Differentiators

- **DIF-V2-01**: Real-time `<ShabbatNotice>` widget consuming Hebcal API on every applicable region page (currently scoped as static content; runtime widget deferred)
- **DIF-V2-02**: Reg-35 accessibility preferences widget per `israeli-accessibility-compliance` skill (preferences store + FOUC bootstrap + cycling toggles for contrast/text-size/line-spacing/cursor/motion) — not legally mandatory for affiliate sites under 25 employees, deferred unless legal exposure changes

---

## Out of Scope

Explicitly excluded for v1 AND v2. Documented to prevent scope creep.

| Feature                                                   | Reason                                                                                        |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Real-time chat / community / forum                        | Not core to affiliate value; high complexity; moderation cost                                 |
| Video content production                                  | Storage/bandwidth costs; embedded YouTube OK if existing CC license                           |
| Hotel/tour inventory ownership                            | We are an affiliate, not a marketplace; never store availability or process payments          |
| Mobile native apps                                        | Web-first responsive design covers use case; PWA only if install rate justifies               |
| AI-generated travel itineraries                           | Quality risk; defer until v2+ with curation layer                                             |
| User accounts / saved trips                               | Affiliate model doesn't require accounts; adds GDPR scope                                     |
| OAuth / email-password authentication                     | No user state means no auth needed                                                            |
| Political content / news commentary                       | Google News/Discover distribution risk; not core editorial value                              |
| Hebron coverage                                           | Editorial sensitivity beyond mitigation budget; risk vs reward unfavorable                    |
| Gaza-adjacent communities coverage (Sderot, etc.)         | Travel advisory + editorial sensitivity beyond v1 scope                                       |
| Accessibility overlay products (accessiBe, UserWay, etc.) | FTC $1M precedent + IS 5568 ineffectiveness; native semantic HTML only                        |
| `next-i18next` / Pages Router                             | App Router patterns only; legacy library                                                      |
| `next-seo` for JSON-LD                                    | App Router support patchy; use schema-dts + native injection                                  |
| Headless CMS (Sanity / Payload / Strapi) for v1           | One-writer team; Velite + MDX in repo sufficient; revisit if team grows >3 editors            |
| Display ad networks (AdSense / Mediavine)                 | Conflicts with affiliate-first monetization strategy; performance hit                         |
| Currency conversion as user-toggle widget                 | Show ILS + USD + EUR statically with daily FX update (AUD-022); no runtime conversion service |
| Storybook                                                 | `/admin/components/` noindex playground sufficient at this scale per ARCHITECTURE §5.4        |

---

## Traceability

Per-requirement phase mapping (filled during roadmap creation 2026-05-11). Every v1 requirement maps to exactly one primary phase. Some requirements have a secondary phase where they are first satisfied at infrastructure level (Phase 1) and re-verified or first observably-exercised at content level (Phase 2+); the "Phase" column shows the primary phase responsible for completion.

| Requirement | Phase   | Notes / Cross-references                                                                                                                           | Status  |
| ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| FND-01      | Phase 1 | Plan 01-01 (scaffold)                                                                                                                              | Pending |
| FND-02      | Phase 1 | Plan 01-02 (design tokens)                                                                                                                         | Pending |
| FND-03      | Phase 1 | Plan 01-03 (component lib)                                                                                                                         | Pending |
| FND-04      | Phase 1 | Plan 01-03 (component lib playground)                                                                                                              | Pending |
| FND-05      | Phase 1 | Plan 01-07 (quality scoring profiles)                                                                                                              | Pending |
| FND-06      | Phase 1 | Plan 01-08 (SEO config)                                                                                                                            | Pending |
| FND-07      | Phase 1 | Plan 01-11 (NER detection)                                                                                                                         | Pending |
| FND-08      | Phase 1 | Plan 01-01 (Plausible decision lock-in)                                                                                                            | Pending |
| AFF-01      | Phase 1 | Plan 01-04 (9 real helpers — Conflict D)                                                                                                           | Pending |
| AFF-02      | Phase 1 | Plan 01-04 (Klook + GoCity stubs — Conflict D)                                                                                                     | Pending |
| AFF-03      | Phase 1 | Plan 01-04 (Vitest tests, 44+4)                                                                                                                    | Pending |
| AFF-04      | Phase 1 | Plan 01-04 (ESLint no-restricted-syntax for partner URLs)                                                                                          | Pending |
| AFF-05      | Phase 1 | Plan 01-02 (ESLint hex + directional utility rules)                                                                                                | Pending |
| AFF-06      | Phase 1 | Plan 01-04 (FTC inline disclosure component); first-rendered in Phase 2                                                                            | Pending |
| AFF-07      | Phase 1 | Plan 01-04 (`data/affiliate-status.json` scaffold); operationally maintained in Phase 6                                                            | Pending |
| AFF-08      | Phase 1 | Plan 01-04 (Travelpayouts fallback configured)                                                                                                     | Pending |
| I18N-01     | Phase 1 | Plan 01-01 (next-intl v3, localePrefix as-needed)                                                                                                  | Pending |
| I18N-02     | Phase 1 | Plan 01-01 (Conflict A: 2 locales registered, 3-locale filesystem)                                                                                 | Pending |
| I18N-03     | Phase 1 | Plan 01-02 (Hebrew Tailwind preset, logical properties)                                                                                            | Pending |
| I18N-04     | Phase 1 | Plan 01-01 (lang/dir per route via layout)                                                                                                         | Pending |
| I18N-05     | Phase 1 | Plan 01-08 (hreflang generator); first-verified live in Phase 2                                                                                    | Pending |
| I18N-06     | Phase 1 | Plan 01-01 (Velite config with 3-locale enum)                                                                                                      | Pending |
| A11Y-01     | Phase 1 | Plan 01-01 (layout enforcement); verified in Phase 2                                                                                               | Pending |
| A11Y-02     | Phase 1 | Plan 01-03 (`<SkipNav>` component HE+EN); rendered live in Phase 2                                                                                 | Pending |
| A11Y-03     | Phase 2 | Plan 02-05 (Accessibility Statement page EN + HE)                                                                                                  | Pending |
| A11Y-04     | Phase 2 | Plan 02-05 (named coordinator on statement page — operational blocker per Gap §6.7)                                                                | Pending |
| A11Y-05     | Phase 2 | Plan 02-05 (footer link sweep); re-verified site-wide in Phase 5                                                                                   | Pending |
| A11Y-06     | Phase 1 | Plan 01-03 (component-level form/error patterns)                                                                                                   | Pending |
| A11Y-07     | Phase 1 | Plan 01-01 (project policy — no overlays installed ever)                                                                                           | Pending |
| A11Y-08     | Phase 1 | Plan 01-10 (Lighthouse CI a11y ≥0.95 threshold); enforced from Phase 2 onward                                                                      | Pending |
| SEO-01      | Phase 1 | Plan 01-06 (schema-dts + `<JsonLd>` RSC component)                                                                                                 | Pending |
| SEO-02      | Phase 1 | Plan 01-06 (11 schema generators)                                                                                                                  | Pending |
| SEO-03      | Phase 1 | Plan 01-06 (`scripts/qa/validate-schema.mjs`)                                                                                                      | Pending |
| SEO-04      | Phase 2 | Plan 02-01 + 02-02 (Jerusalem paired religious naming, first editorial application); AUD-017..AUD-020 enforced from Phase 1.9 onward               | Pending |
| SEO-05      | Phase 1 | Plan 01-08 (metadata API setup); enforced per-page from Phase 2                                                                                    | Pending |
| SEO-06      | Phase 1 | Plan 01-08 (canonical generator self-referential)                                                                                                  | Pending |
| IMG-01      | Phase 1 | Plan 01-05 (Zod schema for photo-credits.json)                                                                                                     | Pending |
| IMG-02      | Phase 1 | Plan 01-05 (`scripts/qa/check-credits.mjs` CI gate)                                                                                                | Pending |
| IMG-03      | Phase 1 | Plan 01-05 + 01-03 (`next/image` config + PhotoGallery contract)                                                                                   | Pending |
| IMG-04      | Phase 2 | Plan 02-01 (hero image `priority` on Jerusalem canonical); enforced sitewide from Phase 3                                                          | Pending |
| IMG-05      | Phase 2 | Plan 02-01 (`restrictedSiteAcknowledgment` for Old City sites — Western Wall, Holy Sepulchre, Dome of the Rock); schema enforcement from Phase 1.5 | Pending |
| IMG-06      | Phase 1 | Plan 01-05 (source allowlist + license enum)                                                                                                       | Pending |
| AUD-01      | Phase 1 | Plan 01-09 (audit dashboard with 34 rules)                                                                                                         | Pending |
| AUD-02      | Phase 1 | Plan 01-09 (per-page scoring using 5 profiles from FND-05)                                                                                         | Pending |
| AUD-03      | Phase 1 | Plan 01-10 (Lighthouse CI 3-run-median config + thresholds)                                                                                        | Pending |
| AUD-04      | Phase 1 | Plan 01-01 (Husky + lint-staged pre-commit)                                                                                                        | Pending |
| AUD-05      | Phase 1 | Plan 01-09 (quality-gate report generator); executed end of Phase 2.6                                                                              | Pending |
| CNT-01      | Phase 2 | Plan 02-01 (Jerusalem EN canonical)                                                                                                                | Pending |
| CNT-02      | Phase 2 | Plan 02-02 (Jerusalem HE canonical via hebrew-content-writer)                                                                                      | Pending |
| CNT-03      | Phase 2 | Plan 02-02 (pilot-switch checkpoint — Conflict C resolution)                                                                                       | Pending |
| CNT-04      | Phase 2 | Plan 02-03 (5-10 sub-destinations EN + HE)                                                                                                         | Pending |
| CNT-05      | Phase 2 | Plan 02-04 (Jerusalem itinerary page)                                                                                                              | Pending |
| CNT-06      | Phase 2 | Plan 02-05 (homepage + `/regions/` hubs)                                                                                                           | Pending |
| CNT-07      | Phase 2 | Plan 02-05 (legal pages EN + HE)                                                                                                                   | Pending |
| REG-01      | Phase 3 | Plans 03-01..03-10 (10 region canonicals in scoring order)                                                                                         | Pending |
| REG-02      | Phase 3 | Per-region plans (3-8 sub-dests each, total 30-80)                                                                                                 | Pending |
| REG-03      | Phase 3 | Per-region soft gate enforced by `gsd-verifier` against ROADMAP success criterion                                                                  | Pending |
| REG-04      | Phase 3 | Plan 03-11 (Bethlehem under `/west-bank/` with administrativeStatus framing)                                                                       | Pending |
| REG-05      | Phase 3 | Plan 03-05 (Negev image budget) + Plan 03-07 (Haifa Bahá'í policy) — research blockers per Gap §6.3, §6.4                                          | Pending |
| DEP-01      | Phase 6 | Plan 06-01 (Vercel prod + HTTPS + HSTS)                                                                                                            | Pending |
| DEP-02      | Phase 6 | Plan 06-02 (GSC + sitemap submit + IndexNow)                                                                                                       | Pending |
| DEP-03      | Phase 6 | Plan 06-03 (basic-auth verified in prod); scaffolded in Phase 1.9                                                                                  | Pending |
| DEP-04      | Phase 6 | Plan 06-03 (Lighthouse CI history 90-day retention)                                                                                                | Pending |
| DEP-05      | Phase 6 | Plan 06-03 (affiliate health cron via Vercel Cron Jobs)                                                                                            | Pending |
| DEP-06      | Phase 6 | Plan 06-04 (`data/post-launch-backlog.md` + executive summary)                                                                                     | Pending |

**Coverage Validation:**

| Category                          | Count  | Mapped | Phase distribution                                                                                                     |
| --------------------------------- | ------ | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| Foundation (FND)                  | 8      | 8      | Phase 1: 8                                                                                                             |
| Affiliate Infrastructure (AFF)    | 8      | 8      | Phase 1: 8                                                                                                             |
| Internationalization & RTL (I18N) | 6      | 6      | Phase 1: 6                                                                                                             |
| Accessibility (A11Y)              | 8      | 8      | Phase 1: 6, Phase 2: 2 (A11Y-03, A11Y-04, A11Y-05 → 2 as A11Y-05 secondary; primary: A11Y-03 Phase 2, A11Y-04 Phase 2) |
| Schema & SEO (SEO)                | 6      | 6      | Phase 1: 5, Phase 2: 1 (SEO-04 paired naming first applied in pilot)                                                   |
| Image Pipeline (IMG)              | 6      | 6      | Phase 1: 4, Phase 2: 2 (IMG-04, IMG-05)                                                                                |
| Audit & Quality Gate (AUD)        | 5      | 5      | Phase 1: 5                                                                                                             |
| Pilot Region (CNT)                | 7      | 7      | Phase 2: 7                                                                                                             |
| Region Replication (REG)          | 5      | 5      | Phase 3: 5                                                                                                             |
| Deploy & Monitoring (DEP)         | 6      | 6      | Phase 6: 6                                                                                                             |
| **Total v1**                      | **53** | **53** | **100% mapped ✓**                                                                                                      |

- v1 requirements: 53 total — **all mapped to exactly one primary phase**
- v2 requirements: 9 total (one promoted: SUB-V2-01 → Phase 4 execution scope)
- Out of Scope items: 16

**Phase totals (primary mapping):**

- Phase 1 (Foundation): 40 requirements
- Phase 2 (Pilot Jerusalem): 9 requirements (CNT-01..07 + A11Y-03, A11Y-04; plus secondary verification of A11Y-05, SEO-04, IMG-04, IMG-05)
- Phase 3 (Region Replication): 5 requirements (REG-01..05)
- Phase 4 (Long-tail Sweep): 0 primary v1 requirements (SUB-V2-01 promoted from v2)
- Phase 5 (Legal + Launch Prep): 0 primary v1 requirements (executes verification sweeps on Phase 1/2 requirements + DEP-01 prep work)
- Phase 6 (Production Deploy + Monitoring): 6 requirements (DEP-01..06)

**Note:** Phase 4 and Phase 5 have 0 primary v1 requirement mappings because (a) Phase 4's scope is SUB-V2-01 promoted from v2, and (b) Phase 5 is a verification/launch-prep phase whose success criteria are observable consequences of Phase 1/2/3/4 requirements satisfied site-wide. Their success criteria in ROADMAP.md are still derived from requirements (just transitively).

---

_Requirements defined: 2026-05-11_
_Traceability updated: 2026-05-11 during roadmap creation_
_Source: MEGA-PROMPT-NEW-COUNTRY.md + .planning/research/SUMMARY.md + conflict resolutions_
