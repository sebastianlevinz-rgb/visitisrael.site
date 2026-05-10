# Architecture Research — Discover Israel

**Domain:** Multi-region tourism affiliate website (bilingual EN+HE, RTL-capable, Next.js 15 App Router)
**Researched:** 2026-05-11
**Overall Confidence:** HIGH (stack & i18n & schema), MEDIUM (R6 language strategy — pre-war 2023 data is solid; 2024–25 data distorted by war), MEDIUM (CMS choice — opinionated)

---

## TL;DR — Eight Decisions

| # | Decision | Choice | Confidence |
|---|----------|--------|-----------|
| 1 | URL structure | `/[lang]/[region]/[sub]/` with `lang=he` default un-prefixed, `lang=en` prefixed | HIGH |
| 2 | Trailing slash | **No trailing slash** (Next.js default), enforce via 308 redirect | HIGH |
| 3 | Slug language | **English slugs in both locales** (`/tel-aviv/`, `/en/tel-aviv/`) — defer transliterated Hebrew slugs to v2 | MEDIUM |
| 4 | i18n library | **next-intl** (latest stable, App Router + RSC native) | HIGH |
| 5 | R6 language priority | **EN + HE at launch; FR scaffolded but content deferred to M3**; RU monitored, not built | MEDIUM-HIGH |
| 6 | Schema injection | **Page-level via `<JsonLd>` component**, validated by local `scripts/qa/validate-schema.mjs` in CI | HIGH |
| 7 | Design tokens | **3-layer** (foundation → semantic → component) in Tailwind v4 `@theme` directive | HIGH |
| 8 | Content pipeline | **Velite + MDX, per-locale files** (`/content/en/*.mdx`, `/content/he/*.mdx`) | MEDIUM-HIGH |

Build-order dependency graph at the bottom locks in Phase 1 sub-phase ordering.

---

## 1. URL Structure

### 1.1 Decision

**Pattern:**

```
visitisrael.site/                              ← HE homepage (default locale)
visitisrael.site/[region]/                     ← HE region canonical (e.g. /jerusalem/)
visitisrael.site/[region]/[sub-destination]/   ← HE sub (e.g. /jerusalem/old-city/)
visitisrael.site/en/                           ← EN homepage
visitisrael.site/en/[region]/                  ← EN region canonical
visitisrael.site/en/[region]/[sub-destination]/← EN sub
visitisrael.site/regions/                      ← HE hub
visitisrael.site/en/regions/                   ← EN hub
visitisrael.site/about/, /contact/, /privacy/, /affiliate-disclosure/
visitisrael.site/en/about/, etc.
```

**Why default-locale-un-prefixed (HE at root):**

- Mega prompt's deliverable example (lines 333–349 of MEGA-PROMPT) shows `/{region-1}/` for local lang and `/en/{region-1}/` for EN — explicit instruction.
- The local domain `.site` + Israeli geo signal + `dir="rtl"` at root reinforces HE-first identity.
- Avoids a meaningless `/he/` segment for the audience that will dominate Google's IL geo serving.
- `x-default` will point to EN (international fallback), HE has its own hreflang declaration (see §1.4).

**Trade-off accepted:** mixed URL shapes (`/jerusalem/` HE vs `/en/jerusalem/` EN) complicate the i18n config slightly. `next-intl` v3.x supports this via `localePrefix: 'as-needed'` configuration.

### 1.2 Trailing Slash Policy — NO trailing slash

**Choice:** `trailingSlash: false` (Next.js default).

**Rationale:**

- Next.js's default is to 308-redirect `/about/` → `/about`. Reversing this requires `trailingSlash: true` and breaks `.well-known/` paths, static files, and several Vercel edge optimizations.
- Modern Google treats both equivalently *if* canonical tags are self-referential and consistent. The 308 redirect resolves all duplicate-content risk.
- The mega prompt's example sitemap uses trailing slashes purely as a directory-tree visualization, not as the literal URL. Confirmed by re-reading lines 333–349: those are file-tree drawings, not URL strings.

**Implementation:**

```ts
// next.config.ts
const nextConfig = {
  trailingSlash: false, // default, explicit for clarity
};
```

Canonical tag generators in `lib/seo/canonical.ts` MUST emit URLs without trailing slash. Sitemap generator (Phase 1.8) MUST emit URLs without trailing slash.

### 1.3 Slug Language Policy

**Choice:** **English slugs in BOTH locales at launch.**

| URL | Locale | Why |
|-----|--------|-----|
| `/jerusalem/` | HE page | EN slug, HE content, HE meta |
| `/en/jerusalem/` | EN page | EN slug, EN content, EN meta |
| `/tel-aviv/` | HE page | EN slug |
| `/old-city/` | HE sub | EN slug |

**Rationale:**

1. **Non-Latin slug fragility.** Hebrew slugs (`/ירושלים/`) become `%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D` in social-media shares, mail clients, and analytics tools. Yoast and several i18n guides recommend against this for production. *(MEDIUM confidence — multiple sources but largely opinion.)*
2. **Transliteration ambiguity.** "Jerusalem" has at least 3 common Latin spellings (`yerushalayim`, `yerushalaim`, `jerusalem`). The English exonym wins on search volume (cf. R3 keyword research, pending). *(MEDIUM confidence — Hebrew exonyms have less search volume than English equivalents for most regions.)*
3. **Schema parity.** Same slug → identical `BreadcrumbList` IDs across locales → easier hreflang.
4. **Future flexibility.** If R3 reveals Hebrew slugs actually outperform on `.co.il` SERPs, we can add a localized slug map in a future milestone without rewriting the page tree.

**Deferred (v2, post-Quality-Gate):** locale-specific slug aliases (`/יהדים-זקנה-של-ירושלים/` → 301 → `/old-city/`) if R3 keyword volume in Hebrew justifies. Track in `data/post-launch-backlog.md`.

### 1.4 hreflang Strategy

**Per-page `<head>`** (auto-generated by a shared helper):

```html
<link rel="alternate" hreflang="he" href="https://visitisrael.site/jerusalem" />
<link rel="alternate" hreflang="he-IL" href="https://visitisrael.site/jerusalem" />
<link rel="alternate" hreflang="en" href="https://visitisrael.site/en/jerusalem" />
<link rel="alternate" hreflang="x-default" href="https://visitisrael.site/en/jerusalem" />
<link rel="canonical" href="https://visitisrael.site/jerusalem" />
```

**Rules (Google Search Central):**

- Each locale variant lists ITSELF + all peers (bidirectional).
- URLs are absolute, https.
- `x-default` → EN (international fallback for users whose Accept-Language is neither HE nor EN).
- Self-referential canonical, NOT cross-locale (Google explicitly warns: a HE page canonical pointing to EN suppresses HE from index).

**Validation:** add a script `scripts/qa/validate-hreflang.mjs` that crawls built `/out/` and asserts:
- Every page emits both `he` and `en` alternates.
- Every alternate URL returns 200 (no orphan).
- Canonical never points cross-locale.
- `x-default` is present exactly once per page.

Confidence: **HIGH** — Google's own docs (`developers.google.com/search/docs/specialty/international/localized-versions`).

---

## 2. i18n Implementation

### 2.1 Library Choice — `next-intl`

**Choice:** `next-intl` (latest stable, ≥ 3.x).

**Why not Next.js native i18n:** removed/never-shipped in App Router. The old `i18n` key in `next.config.js` is a Pages-Router-only feature. Confirmed by Next.js official docs ("Guides: Internationalization") and a vercel/next.js discussion #75928 confirming the i18n config block adds latency in App Router.

**Why not `next-international`:** smaller community, no clear advantage; my WebSearch for "next-international 2026 comparison" returned only `next-intl` results — suggests the library is either niche or under-discussed. **LOW confidence on declaring it dead**, but ecosystem momentum is clearly behind `next-intl`.

**Why not `next-i18next`:** explicitly Pages-Router-era; the App Router moved translation loading into RSC, which `next-i18next` does not handle natively.

**Why not hand-rolled middleware:** we would re-implement (a) locale detection, (b) message catalog loading per-RSC, (c) ICU plural support, (d) hreflang helpers. Mega prompt forbids new tech debt; reinventing i18n is exactly the debt to avoid (Discover Argentina lesson #7 "i18n bolted-on").

**`next-intl` advantages confirmed in research:**
- Native App Router + RSC + Server Component support.
- On-demand locale message loading (smaller bundles).
- Type-safe message keys via TypeScript codegen.
- Static rendering opt-in via `setRequestLocale()` to avoid forced dynamic rendering on every page.
- `localePrefix: 'as-needed'` mode supports our "HE un-prefixed, EN prefixed" URL pattern.

**Known limitation (mitigated):** by default, calls to `useTranslations` in a Server Component opt the route into dynamic rendering. Fix: call `setRequestLocale(locale)` at the top of every `layout.tsx` / `page.tsx` (documented in next-intl docs). Phase 1.1 must scaffold this pattern as a template.

Confidence: **HIGH** — multiple 2026 comparison articles converge on `next-intl` for App Router + RSC.

### 2.2 Locale Detection on First Visit

**Choice:** **Accept-Language header + cookie persistence + ZERO IP geo.**

| Step | Behavior |
|------|----------|
| First visit to `/` | Read `Accept-Language`. If matches `he*`, stay on `/`. If matches `en*`, 308 → `/en/`. Otherwise (x-default user), 308 → `/en/`. |
| Subsequent visit | Read `NEXT_LOCALE` cookie set by `next-intl` middleware; honor it. |
| Manual switch | Language switcher in nav sets cookie + navigates. |

**Why no IP geo:**
- Adds latency (third-party MaxMind call or Vercel `geo` lookup).
- Inaccurate for VPN users (high overlap with the diaspora target audience).
- Google's crawler reads pages without an `Accept-Language` — IP-based redirects can hide HE content from googlebot-US, hurting hreflang signals.

**Implementation:** `middleware.ts` uses `createMiddleware` from `next-intl/middleware` with `localeDetection: true` (its default) — covers Accept-Language + cookie automatically.

Confidence: **HIGH** — this is the documented `next-intl` pattern.

### 2.3 Content Storage Per Locale

See §6 (Content Sourcing Pipeline) — per-locale MDX files in `/content/en/` and `/content/he/`.

For UI strings (button labels, error messages, accessibility statements): JSON message catalogs at `/messages/en.json`, `/messages/he.json`. The Hebrew accessibility-statement page (IS 5568 mandate) lives as both MDX content AND with its mandatory legal text in `messages/he.json` for reuse in error states.

---

## 3. Language Strategy — R6 Data Check

### 3.1 Pre-War (2023) Inbound Tourism by Source Country

Using 2023 Israel Ministry of Tourism data (the last "normal" year before Oct 2023):

| Rank | Country | Approx. visitors | % of 3M total | Primary languages |
|------|---------|------------------|---------------|-------------------|
| 1 | USA | ~900,000 | ~30% | English |
| 2 | France | ~300,000 | ~10% | French (Catholic + Jewish-French) |
| 3 | Germany | ~280,000 | ~9% | German (often English-comfortable) |
| 4 | UK | ~220,000 | ~7% | English |
| 5 | Russia | ~160,000 | ~5% | Russian |
| 6–10 | Italy, Romania, Poland, Canada, Spain | ~50–100k each | ~15% combined | Mixed (English for tier-2) |

Confidence: **HIGH** for 2023 numbers (multiple corroborating sources: Tourist Israel, JNS.org, Statista).

### 3.2 2025 Recovery Data

2025: 1.3M tourists (still ~43% of 2023 baseline). USA + France + UK = ~55% of total. Russia dropped due to flight cancellations + ruble crisis + war-related Russian state advisories. *(MEDIUM confidence — single-year recovery data is noisy.)*

### 3.3 Domestic Audience (Hebrew speakers)

- ~9M Israelis. Domestic tourism volume (Israelis traveling within Israel) is *also* substantial. The site monetizes them via hotel/tour bookings — Hebrew content is mandatory.
- Russian-speaking community in Israel: ~1.3–1.5M (15–17% of population), heaviest in Tel Aviv, Haifa, Ashdod. They generally read Hebrew or English fluently — **a Russian UI would not capture meaningful incremental traffic from this audience.**
- Pilgrimage-French audience: ~10% of arrivals, and Catholic pilgrimage groups frequently book in French through French operators; French-language landing pages would defend SEO share in French SERPs against `holylandpilgrimages.org` etc.

### 3.4 R6 Decision Matrix

| Language | Audience case | Marginal cost | Decision at launch |
|----------|--------------|---------------|--------------------|
| **HE** | Domestic tourism (~9M speakers) + IS 5568 legal mandate + skills `hebrew-rtl-best-practices`, `hebrew-tailwind-preset` already installed | Built-in to plan | **REQUIRED** |
| **EN** | 40%+ of inbound tourists (USA + UK + Anglophone Canada + tier-2 English speakers), x-default fallback, schema language | Plan already budgets EN translation in Phase 2.2 | **REQUIRED** |
| **FR** | ~10% of inbound, Catholic pilgrimage SERP capture, Jewish-French diaspora | Translation: ~25 native words/$ × 5000 words × 6 pilot pages = ~$750. RTL: not needed. Schema: parity reuses generators. hreflang: one extra alternate per page. **No new infrastructure beyond a third locale wired into `next-intl`.** | **SCAFFOLD at Phase 1.1; defer content to M3** |
| **RU** | ~5% of inbound (2023; lower 2025), but Russian-speaking diaspora in Israel reads HE/EN fine, so the case is *incremental* not *captive* | Same as FR | **NOT at launch. Re-evaluate post-Quality-Gate.** |

**Final R6 recommendation:**

1. **Launch (M1 + M2 Quality Gate):** EN + HE only. Full parity. Pilot region in both languages.
2. **Phase 1.1 scaffold:** wire `next-intl` for **3 locales** (`he`, `en`, `fr`) so the routing tree, hreflang generator, schema generator, and sitemap accommodate FR from day one. Empty `messages/fr.json`. Empty `/content/fr/`. **No FR pages built**, but the system doesn't have to be refactored to add them later.
3. **Phase 3 / M3 onwards:** translate pilot region into FR as the first non-blocking expansion experiment. If FR traffic + affiliate conversions warrant, replicate to other regions. If not, deprecate FR scaffolding cleanly (delete the locale config + redirect).
4. **RU:** track in `data/post-launch-backlog.md`. Revisit only if (a) Russian arrivals recover to 2014 levels (~500k/year), or (b) competitor analysis (R2) shows a Russian-only competitor capturing share.

**Why scaffold-not-build for FR:** the Discover Argentina lesson #7 ("i18n bolted-on") was that adding languages *after* the fact required restructuring. Scaffolding for 3 locales while building content for 2 is the cheapest insurance policy — `next-intl` and our schema generators care about the locale list, not the content existence.

**Phase 2.2 (EN translation) is GATED.** It cannot be planned until R6 is confirmed by the user. This research provides the data; the user/orchestrator confirms the decision.

Confidence: **MEDIUM-HIGH** — 2023 numbers are well-sourced; the decision to defer FR/RU is a judgment call balancing reach × translation cost × maintenance overhead.

---

## 4. Schema / JSON-LD Topology

### 4.1 Schema Mapping by Page Profile

| Profile (from Phase 1.7) | Required schema | Optional schema | Notes |
|--------------------------|-----------------|-----------------|-------|
| `REGION_CANONICAL` | `TouristDestination` + `BreadcrumbList` + `FAQPage` | `Place` (sameAs Wikipedia/Wikidata) | `includesAttraction` array references sub-destination `TouristAttraction`s by `@id` |
| `SUB_DESTINATION` | `TouristAttraction` + `BreadcrumbList` | `ReligiousBuilding` (if Western Wall, Church of Holy Sepulchre, Al-Aqsa, etc.); `LocalBusiness` extension (if a restaurant/hotel page); `Place` | `containedInPlace` references parent region's `TouristDestination` `@id` |
| `GUIDE_OR_WINERY` | `Article` (or `TouristTrip` if itinerary) + `BreadcrumbList` | `LocalBusiness` (winery itself) | Author = `Organization` for now (no human bylines yet) |
| `UTILITY` (about, contact, legal, privacy, affiliate-disclosure) | `WebPage` + `Organization` | — | Minimal. SEO score profile accepts no afiliate, no length req. |
| `HUB` (`/regions/`, homepage) | `CollectionPage` + `BreadcrumbList` + (homepage only) `WebSite` with `potentialAction` SearchAction | — | Homepage `WebSite` schema is the *only* `WebSite` instance site-wide; do NOT emit on sub-pages |

### 4.2 Schema Generation Architecture

**Layout vs page injection:**

- **`<JsonLd>` at page level** (not layout). Each `page.tsx` calls a typed builder from `lib/schema/` and renders `<JsonLd data={...} />`.
- **Why not layout-level:** layouts cascade; a region's `TouristDestination` schema would leak into sub-destination pages whose schema should be `TouristAttraction`. Page-level injection keeps schema tight to page semantics.
- **Exception:** the `Organization` schema (constant — name, logo, sameAs to social profiles) is emitted in `app/[locale]/layout.tsx` once. This is the only schema that genuinely applies to every page.

**Generator structure:**

```
lib/schema/
  types.ts                      ← strict TS types per schema.org type
  organization.ts               ← getOrganizationSchema() (constant)
  touristDestination.ts         ← buildTouristDestination({ region, lang, parentId })
  touristAttraction.ts
  breadcrumb.ts                 ← buildBreadcrumb(pathSegments, lang)
  faq.ts
  webSite.ts                    ← homepage only
  index.ts                      ← barrel
  __tests__/                    ← Vitest, snapshot per builder
```

Every builder takes `lang` and emits `inLanguage: lang`. URLs in `@id`/`url` fields use the canonical URL helper (which respects the locale-prefix rule from §1.1).

### 4.3 Schema Validation Strategy — Local Validator + CI

**Choice:** Local validator script (mega prompt 1.6 explicit) over Google Rich Results Test API.

**Reasons:**
1. **No API quota** — Google's Rich Results Test API is rate-limited; running it on every PR for every page is expensive.
2. **Offline reproducibility** — local validator runs in CI without internet, faster, deterministic.
3. **Mega prompt directive** — explicit `scripts/qa/validate-schema.mjs` reference.

**Implementation:**

```
scripts/qa/validate-schema.mjs
  ├── npm: schema-dts-gen or hand-rolled JSON Schema for schema.org types
  ├── For each built HTML in /out/, extract <script type="application/ld+json">
  ├── Parse, validate against schema-dts types
  ├── Assert: @context, @type present; required fields per type; URL fields are valid HTTPS; @id uniqueness
  └── Exit non-zero on failure
```

**Supplementary (manual):** during pilot region QA (Phase 2.6), run a sample of pages through Google Rich Results Test (web UI) and Schema.org validator (web UI) to catch anything our local validator misses. Document any divergences as patches to the local validator.

Confidence: **HIGH** — well-trodden pattern.

### 4.4 Religious Sites — Naming Sensitivity

Mega prompt + PROJECT.md call out neutrality. Schema field `name` and on-page H1 must use the established dual-name convention:

| Site | name (HE) | name (EN) |
|------|-----------|-----------|
| Temple Mount / Haram al-Sharif | הר הבית / חרם א-שריף | Temple Mount / Haram al-Sharif |
| Church of the Holy Sepulchre / Anastasis | כנסיית הקבר | Church of the Holy Sepulchre |
| Western Wall / Kotel | הכותל המערבי | Western Wall (Kotel) |
| West Bank Bethlehem | (defer editorially — list under "day trips from Jerusalem" without political framing) | (same) |

**Build a `data/religious-sites.json`** with `nameHe`, `nameEn`, `nameAr` (for `sameAs`/Wikidata cross-reference), `denomination` (jewish | christian | muslim | druze | baha'i | mixed), `wikidataId`. Schema generator reads from it.

Confidence: **MEDIUM** on the dual-name convention adoption; we are not Wikipedia, so we will follow the most-cited naming on en.wikipedia.org as ground truth.

---

## 5. Design System Architecture

### 5.1 Three-Layer Tokens

**Choice:** 3-layer (foundation → semantic → component), implemented in Tailwind v4 `@theme` directive.

**Layers:**

```
Layer 1 — Foundation (raw values, no meaning)
  --color-stone-50  through --color-stone-950
  --color-blue-50   through --color-blue-950
  --color-sand-50   through --color-sand-950   ← Israeli earth-tone hue (R5 confirms)
  --color-olive-50  through --color-olive-950
  --space-1 (0.25rem) through --space-32 (8rem)
  --radius-xs through --radius-full
  --font-size-xs through --font-size-7xl

Layer 2 — Semantic (purpose-driven, MOST components consume these)
  --color-primary: var(--color-blue-700)
  --color-primary-hover: var(--color-blue-800)
  --color-accent: var(--color-sand-600)
  --color-surface: var(--color-stone-50)
  --color-surface-elevated: white
  --color-ink: var(--color-stone-900)
  --color-ink-muted: var(--color-stone-600)
  --color-border: var(--color-stone-200)
  --color-success / --color-warning / --color-danger
  --space-section: var(--space-24)
  --space-card: var(--space-6)

Layer 3 — Component (only when component has unique need)
  --button-bg-primary: var(--color-primary)
  --button-text-primary: white
  --card-bg: var(--color-surface-elevated)
  --card-border: var(--color-border)
  --hero-overlay: rgb(0 0 0 / 0.35)
```

**Why 3 layers (not 2):**
- 2-layer (foundation → component) skips semantic and forces every component to know about raw color names — re-themes become 100-touchpoint codemods.
- 4-layer (adding a "feature-context" tier) is overkill at <50 pages.
- 3-layer is the consensus pattern across Tailwind v4 token system guides surveyed.

**Hex code prohibition (mega prompt constraint):**
- ESLint rule `no-restricted-syntax` blocks `Literal[value=/^#[0-9a-f]{3,8}$/i]` inside JSX/TSX components.
- A second ESLint rule blocks `bg-\[#...\]` arbitrary-value Tailwind classes.
- Allow `data/photo-credits.json` and `tailwind.config.ts` / `app/globals.css` as exceptions (literal hex IS allowed there — it's the foundation layer source).

Confidence: **HIGH** — 3-layer is the modern Tailwind v4 default.

### 5.2 CSS-in-JS vs Tailwind-only vs Hybrid

**Choice:** **Tailwind-only** (utility classes + `@theme` tokens). No CSS-in-JS.

**Why:**
- Mega prompt says Tailwind.
- Vercel + Next.js 15 RSC stack performs best with static CSS (no runtime).
- Tailwind v4's `@theme` directive *is* the design-token store; CSS variables are emitted natively, available to all components.
- One layer of CSS (Tailwind utilities + generated tokens) eliminates dual-source-of-truth bugs.

**Hebrew/RTL handling:** Tailwind v4 supports logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) which auto-mirror with `dir="rtl"` on `<html>`. The skill `hebrew-tailwind-preset` provides a preset; integrate in Phase 1.1.

**One exception:** truly dynamic styles (e.g., a calculated hero parallax offset) use inline `style={{ ... }}` with values pulled from CSS variables — never raw hex.

### 5.3 Component Primitives Location & Variants

**Folder structure (Phase 1.2 / 1.3):**

```
components/
  ui/                  ← primitives (mega-prompt 1.2)
    Button.tsx
    Card.tsx
    Tag.tsx
    Badge.tsx
    Section.tsx
    Container.tsx
    Grid.tsx
  travel/              ← composite (mega-prompt 1.3)
    RegionHero.tsx
    AttractionGrid.tsx
    AffiliateCard.tsx
    PhotoGallery.tsx
    StickyCTA.tsx
    ItineraryCard.tsx
    WhereToStay.tsx
    TransportInfo.tsx
    BestTimeToVisit.tsx
  layout/
    Header.tsx
    Footer.tsx
    LanguageSwitcher.tsx
    SkipNav.tsx        ← Hebrew + English; mandatory IS 5568
  schema/
    JsonLd.tsx         ← from §4.2
```

**Variant library:** **`class-variance-authority` (CVA)** over `tailwind-variants`.

| Criterion | CVA | tailwind-variants |
|-----------|-----|-------------------|
| Type safety with TS | strong | strong |
| Bundle size | minimal | minimal |
| Tailwind-specific features (slots, compound variants) | basic | richer slot API |
| Ecosystem | larger (Radix, shadcn use it) | smaller |
| Lock-in to Tailwind | none | requires Tailwind |

CVA wins on ecosystem alignment (shadcn/ui patterns are the de-facto Next.js idiom) and avoids any lock-in if we want to swap CSS systems. Slot API isn't needed for our component palette.

Confidence: **MEDIUM-HIGH** — both are fine; CVA is the safer default.

### 5.4 Storybook vs `/admin/components/` Noindex Playground

**Choice:** `/admin/components/` noindex route (mega prompt 1.3 explicit).

**Why not Storybook:**
- Adds a parallel build system, dev server, and dependency tree (Webpack-on-top-of-Vite-on-top-of-Turbopack-confusion).
- Stories live in a separate render context — they lie about RSC behavior (Storybook components are client-side; a RSC-only component throws on render in Storybook without complex shims).
- Adds CI surface area we won't pay for at <50-page scale.

**Why `/admin/components/` works:**
- Real Next.js render context → catches RSC/client-boundary bugs.
- Server-rendered with the production fonts, tokens, and i18n setup.
- Behind basic auth (§7), no SEO leak.
- One less tool to maintain.

**Trade-off accepted:** no visual regression snapshots (Storybook + Chromatic patterns). Mitigated by Lighthouse CI screenshot diffs in Phase 1.10 if/when needed.

Confidence: **HIGH** — the mega-prompt directive is unambiguous AND it's the right call for project scale.

---

## 6. Content Sourcing Pipeline

### 6.1 MDX vs Headless CMS — Choose MDX

**Choice:** **MDX-in-repo with Velite as the type-safe processor.**

| Option | Pro | Con | Verdict |
|--------|-----|-----|---------|
| MDX + Velite | Type-safe, ships with code, zero ops, git-versioned, deploys atomically with the app, free | Edits require PR | **CHOSEN** |
| MDX + Contentlayer | Battle-tested API | **Effectively unmaintained since Stackbit→Netlify acquisition** | REJECTED |
| MDX + Content Collections | Velite-alternative, drop-in for ex-Contentlayer | Smaller community than Velite | runner-up |
| `@next/mdx` raw | No build step | No schema validation, no type safety, frontmatter is manual | REJECTED — Discover Argentina lesson #1 (no day-1 structure) applies |
| Sanity | Real-time collab, hosted Studio | Adds ~80ms TTFB per query, $$ at scale, network dependency, learning curve | REJECTED for this project's scale |
| Payload CMS | Next.js-native, self-hosted, local DB queries (~10ms) | Requires a DB (Postgres or Mongo) — new infra; v3 is recent | DEFER (re-evaluate if content team grows to >3 editors) |
| Decap CMS | Git-based, free | UI is dated, slower release cadence | REJECTED |

**Why MDX wins for this project:**

1. **One-writer team** — no concurrent-edit conflicts to worry about.
2. **Affiliate links embedded inline** — MDX lets us drop `<AffiliateCard partner="booking" destination="Jerusalem" />` directly in content, exactly the helper-pass-through pattern the mega prompt enforces.
3. **No runtime CMS = better Lighthouse** — every Phase 1.10 Lighthouse improvement is more achievable when content is statically built into HTML.
4. **Discover Argentina lesson #9 reversed** — repo content versioning means rolling back a bad edit is `git revert`, not a CMS history diff.
5. **Skill `hebrew-content-writer` is installed** — we have a content-authoring agent; it writes to disk, not to a CMS API.

### 6.2 Velite Configuration

```
velite.config.ts (Phase 1.1)
  collections:
    regions:
      pattern: 'content/**/regions/*.mdx'
      schema:
        slug: s.slug()
        lang: s.enum(['he', 'en', 'fr'])
        title: s.string().max(70)         ← SEO meta title bound
        description: s.string().min(120).max(160)  ← meta description
        heroImage: s.string()             ← key into photo-credits.json
        bestTime: s.string()
        featured: s.boolean().default(false)
        affiliates: s.array(s.enum(['booking', 'civitatis', 'viator', 'gyg', 'rentalcars', 'safetywing', 'skyscanner']))
        body: s.mdx()
    subDestinations: { ... similar ... }
    guides: { ... }
    legal: { ... }
```

**Per-locale file layout:**

```
content/
  he/
    regions/
      jerusalem.mdx
      tel-aviv.mdx
      ...
    sub/
      jerusalem/
        old-city.mdx
        mahane-yehuda.mdx
    legal/
      accessibility-statement.mdx      ← IS 5568 mandatory
      affiliate-disclosure.mdx
      privacy.mdx
  en/
    regions/
      jerusalem.mdx
      ...
  fr/                                  ← empty at launch; scaffolded
```

### 6.3 Image Handling Within Content

**Image credit attachment pattern:**

MDX content references images by **key**, not by path:

```mdx
<HeroImage credit="jerusalem-old-city-sunrise" alt="..." />
```

The `<HeroImage>` component (or the photo-credits helper from Phase 1.5) looks up the key in `data/photo-credits.json`:

```json
{
  "jerusalem-old-city-sunrise": {
    "src": "/img/jerusalem/old-city-sunrise-1600.jpg",
    "srcSet": {
      "320w": "/img/jerusalem/old-city-sunrise-320.jpg",
      "640w": "/img/jerusalem/old-city-sunrise-640.jpg",
      "1024w": "/img/jerusalem/old-city-sunrise-1024.jpg",
      "1600w": "/img/jerusalem/old-city-sunrise-1600.jpg"
    },
    "author": "Andrew Shiva",
    "license": "CC-BY-SA-4.0",
    "sourceUrl": "https://commons.wikimedia.org/wiki/...",
    "region": "jerusalem",
    "minWidth": 1600
  }
}
```

**Build-time check (`scripts/qa/validate-photo-credits.mjs`):**
- Walk MDX content for all `credit="..."` references.
- Assert: each key exists in `photo-credits.json`.
- Assert: each entry has `author`, `license`, `sourceUrl`, `minWidth >= 1200`.
- Assert: each `srcSet` resolution exists on disk.

Confidence: **HIGH** — this is the mega-prompt 1.5 spec, slightly elaborated.

---

## 7. Audit Dashboard Architecture

### 7.1 Build-Time JSON + Server Component Render

**Choice:** **Hybrid — build-time scanner produces JSON, server-component route renders it.**

**Flow:**

```
1. Build:
   npm run build (Next.js production build) → writes static HTML to .next/server/app/
   ↓
2. Post-build script (scripts/audit/run.mjs):
   - Walks all built HTML files
   - For each: extract head (hreflang, canonical, JSON-LD blocks, meta description, OG tags)
   - For each: parse body (img alt text, image src widths, internal links, hex codes in inlined styles)
   - For each: read the corresponding MDX frontmatter from velite output → identify page profile
   - For each: score against profile rules (Phase 1.7)
   - Write data/audit-results.json
   ↓
3. /admin/audit/ route (server component):
   - reads data/audit-results.json
   - renders sortable/filterable table per page
   - drill-down per page shows specific failures
   ↓
4. Lighthouse CI sidecar (Phase 1.10):
   - lhci autorun runs in CI on preview deploys
   - writes 3-run-median results to data/lighthouse-results.json
   - /admin/audit/ merges this into the table
```

**Why hybrid (not real-time):**

- **Real-time** (audit runs on each request): wasteful — page hasn't changed since last build. Adds 200–500ms per audit page hit.
- **Build-time** (scanner runs at build, consumed at runtime): exactly the freshness signal you want (audit = state at deploy).
- **Pure-static** (precomputed HTML): can't filter/sort interactively; bad UX.

Hybrid = static JSON data, dynamic rendering for the table UI.

### 7.2 Lighthouse CI Data Flow

```
.github/workflows/lighthouse.yml (Phase 1.10)
  on: pull_request to main, push to staging branch
  steps:
    - deploy preview to Vercel
    - lhci collect --numberOfRuns=3 --url=$PREVIEW_URL/... (per page)
    - lhci assert --preset=lighthouse:recommended --assertions='{
        "categories:performance": ["error", {"minScore": 0.90}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 1.00}]
      }'
    - On main branch: lhci upload to LHCI server (Vercel-hosted Lighthouse CI server, or hosted lhci-server)
    - Write median scores to data/lighthouse-results.json (committed to a sidecar branch or stored as artifact)
```

3-run-median is `numberOfRuns: 3` plus LHCI's default `--assert-on-median`.

### 7.3 Auth — Vercel-Pro Password Protection (fallback: middleware basic auth)

**Choice ranked by preference:**

1. **Vercel Deployment Protection (Pro plan):** zero code, password set in dashboard, applies to specific paths via `vercel.json`. **$20/mo Pro plan covers it; the optional Advanced Deployment Protection addon is $150/mo and NOT needed for this case.** Best UX.
2. **Middleware basic auth (free tier):** `middleware.ts` reads `Authorization: Basic` header; if missing or mismatched, returns 401 + `WWW-Authenticate: Basic realm="Admin"`. Credentials in env vars (`ADMIN_USER`, `ADMIN_PASS`). Apply via middleware matcher: `matcher: ['/admin/:path*']`. Vulnerable to brute force but acceptable for a non-production-data dashboard.
3. **NextAuth + a user table:** overkill for one viewer.

**Recommendation:** Phase 1.9 implements **option 2** (middleware) as the no-cost default. If Vercel Pro is on the project plan, swap to option 1 by simply enabling protection on the `/admin/*` path pattern.

Confidence: **HIGH** — both patterns documented in Vercel + Next.js official docs.

---

## 8. Build-Order Dependency Graph (Phase 1 Sub-Phases)

### 8.1 Dependency Map

```
                  ┌─────────────────────────────┐
                  │ 1.1 Tech stack scaffold     │
                  │ (Next.js 15, TS, Tailwind,  │
                  │  next-intl 3-locale wiring, │
                  │  ESLint rules, Vercel cfg)  │
                  └────────────┬────────────────┘
                               │ depends on
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
   ┌────────────────────┐ ┌──────────────┐ ┌───────────────────┐
   │ 1.2 Design system  │ │ 1.5 Photo    │ │ 1.6 Schema markup │
   │  (tokens 3-layer,  │ │  credits     │ │  baseline         │
   │  CVA, Hebrew RTL)  │ │  ledger      │ │ (generators +     │
   └────────┬───────────┘ └──────┬───────┘ │  <JsonLd> + local │
            │                    │         │  validator)       │
            │                    │         └─────────┬─────────┘
            ▼                    │                   │
   ┌────────────────────┐        │                   │
   │ 1.3 Component lib  │◄───────┘ (uses ledger)     │
   │  (primitives +     │                            │
   │   travel composite,│                            │
   │   /admin/components│                            │
   │   noindex)         │                            │
   └────────┬───────────┘                            │
            │                                        │
            ├────────────────────────┬───────────────┤
            ▼                        ▼               ▼
   ┌────────────────────┐ ┌──────────────────┐ ┌───────────────┐
   │ 1.4 Affiliate      │ │ 1.7 Quality       │ │ 1.8 SEO config │
   │  infrastructure    │ │  scoring profiles │ │ (sitemap.ts,   │
   │  (helpers + tests +│ │  (per-profile     │ │  robots.ts,    │
   │   codemod scripts +│ │   rule sets)      │ │  hreflang gen, │
   │   ESLint rule)     │ │                   │ │  canonical gen,│
   └────────┬───────────┘ └─────────┬─────────┘ │  redirect map) │
            │                       │           └───────┬───────┘
            └─────────┬─────────────┘                   │
                      ▼                                 │
            ┌────────────────────────┐                  │
            │ 1.11 NER / mention     │                  │
            │  detection (regex +    │                  │
            │  dictionary; surfaces  │                  │
            │  in dashboard)         │                  │
            └────────────┬───────────┘                  │
                         │                              │
                         ▼                              │
                ┌──────────────────────┐                │
                │ 1.9 Audit dashboard  │◄───────────────┘
                │  (scanner + JSON +   │
                │  /admin/audit route) │
                └────────────┬─────────┘
                             │
                             ▼
                ┌──────────────────────────┐
                │ 1.10 Lighthouse CI gate  │
                │  (GH Actions, 3-run-     │
                │  median, thresholds)     │
                └──────────────────────────┘
                             │
                             ▼
                ┌──────────────────────────┐
                │  M1 done → /gsd:audit-   │
                │  milestone M1 must pass  │
                └──────────────────────────┘
```

### 8.2 Critical-Path Reasoning

- **1.1 first, alone.** Nothing else compiles without scaffold.
- **1.2, 1.5, 1.6 are parallel-safe** after 1.1 — they touch independent surface area (tokens, JSON ledger, schema lib).
- **1.3 depends on 1.2 + 1.5** — components consume tokens, components consume photo-credits helper.
- **1.4 depends on 1.3** — `AffiliateCard` is a primitive that helpers attach to.
- **1.7 depends on 1.6** — profile rules reference "must have X schema."
- **1.8 depends on 1.6 + 1.2** — sitemap/hreflang generators use schema's URL helpers + design system's locale awareness.
- **1.11 depends on 1.4 + 1.7** — NER suggests affiliates per profile, needs both alive.
- **1.9 depends on 1.7, 1.8, 1.11** — dashboard aggregates everything.
- **1.10 last** — Lighthouse needs a deployable thing to measure.

### 8.3 Parallelizable Bundles

If executing in `/gsd:autonomous` with the right concurrency:

| Bundle | Phases | Why parallel-safe |
|--------|--------|-------------------|
| **Bundle A (after 1.1)** | 1.2, 1.5, 1.6 | Disjoint files |
| **Bundle B (after Bundle A)** | 1.3, 1.4 | 1.4 uses primitives but its file tree is in `lib/affiliate/`, no overlap |
| **Bundle C (after Bundle B)** | 1.7, 1.8 | Disjoint |
| **Bundle D (after Bundle C)** | 1.11 | — |
| **Bundle E (after Bundle D)** | 1.9 | — |
| **Bundle F (after Bundle E)** | 1.10 | — |

### 8.4 Content Cannot Start Until M1 is Green

The mega-prompt's #1 inviolable rule is "foundation before content." Phase 2.1 (region canonical local) starts only after `/gsd:audit-milestone M1` passes. This forces:

- All design tokens exist before any page imports a color.
- All schema generators exist before any page is built and validated.
- All affiliate helpers exist before any inline link is written.
- The audit dashboard exists before any page can be declared "complete."

This ordering is the structural fix to Discover Argentina's nine root causes.

---

## 9. Anti-Patterns (Israel-Specific + Inherited)

### 9.1 Locale-Switcher Throws Away Path

**What people do:** Language switcher links to `/en/` (the EN homepage) regardless of current page.
**Why it's wrong:** A user reading `/jerusalem/old-city/` who switches to English lands on the EN homepage, loses context, abandons.
**Do this instead:** Switcher constructs the parallel URL using `next-intl`'s `Link` with `locale` prop, which preserves the pathname. Add a fallback: if the parallel page doesn't exist (e.g., FR scaffolded but no `/fr/jerusalem/old-city/` yet), 302 → FR homepage with a flash message.

### 9.2 Mirrored Icons Without Override

**What people do:** Assume RTL auto-flips chevron icons.
**Why it's wrong:** SVG icons inside Tailwind don't auto-mirror; an "→" stays pointing right in HE, looking wrong.
**Do this instead:** Use `rtl:rotate-180` on directional icons (`<ChevronRight className="rtl:rotate-180" />`). Encoded in `components/ui/Icon.tsx` via a `directional?: boolean` prop. From the `hebrew-rtl-best-practices` skill.

### 9.3 Bidi Numbers in Hebrew Content

**What people do:** Write `התקשרו ל-03-555-1234` in MDX, browser renders the phone number reversed.
**Why it's wrong:** Hebrew has RTL base direction; pure-digit substrings inherit it.
**Do this instead:** MDX content must wrap phone numbers, prices, dates, URLs in `<bdo dir="ltr">` or a `<Ltr>` component shipped in Phase 1.3. Audit script (1.9) flags any phone-number-shaped or date-shaped regex hit in HE content not wrapped.

### 9.4 Schema in Layout Cascades Wrongly

**What people do:** Drop `TouristDestination` schema in `app/[locale]/layout.tsx` to "save repetition."
**Why it's wrong:** Sub-destination pages inherit it; Google sees the same `TouristDestination` schema on both `/jerusalem/` and `/jerusalem/old-city/`, then `TouristAttraction` schema added on the sub page. Conflicting schema confuses the rich-result classifier.
**Do this instead:** Page-level schema only (§4.2). Layout only emits the constant `Organization` schema.

### 9.5 Affiliate Links Bypassing Helpers

**What people do:** Drop `<a href="https://booking.com/jerusalem">Book here</a>` directly into MDX.
**Why it's wrong:** No AID parameter → zero attribution → zero revenue. Lesson #2 from Discover Argentina (92% coverage on one partner, 18% on another).
**Do this instead:** ESLint rule blocks raw partner URLs site-wide. MDX content authors use `<AffiliateLink partner="booking" />`. Audit dashboard flags any raw partner URL it finds in built HTML.

### 9.6 Photo Without 1200px Source

**What people do:** Drop a 600px-wide hero image from a quick Unsplash search.
**Why it's wrong:** Looks blurry on Retina, fails Lighthouse "Properly size images," no `srcset` data.
**Do this instead:** CI fails on any image in `/img/` with width < 1200px. Photo-credits validator enforces (§6.3).

### 9.7 Accessibility Statement in EN Only

**What people do:** Translate the legal accessibility page only when EN translation pass happens.
**Why it's wrong:** IS 5568 mandates the Hebrew statement; absence = statutory damages.
**Do this instead:** The Hebrew accessibility-statement page is the FIRST content page written, alongside region pilot (Phase 2.1). EN translation follows. Audit script flags any deploy where `/accessibility-statement/` (HE) returns 404 or non-200.

---

## 10. Scaling Considerations

| Scale | What changes |
|-------|--------------|
| **Launch** (1 region × 2 langs + legal) | Static export friendly; Vercel Hobby tier works. ~15 pages. |
| **Phase 3 fill-out** (~12 regions × 2 langs + ~80 sub-destinations) | ~200 pages. Vercel Pro recommended for ISR + image optimization quotas. |
| **Long-tail sweep** (Phase 4: ~500 sub-destinations × 2 langs) | ~1000+ pages. Velite build time becomes the bottleneck (Zod schema compile + MDX parse). Consider `incremental: true` in Velite config; investigate sharding `velite.config.ts` by collection. |
| **Add FR** | +33% page count; LCH CI run time + Velite build scale linearly. Already scaffolded (§3.4); cost is content authoring + image-credit replication. |
| **Add RU** | Same as FR. Plus: re-evaluate Cyrillic-script search behavior in Russian SERPs (Hebrew exonyms vs transliteration vs English-loanwords). |

**First bottleneck (predicted):** Velite build time once page count > 500. Mitigation: enable Velite incremental builds + cache; if not enough, split `content/` into per-region directories and process in parallel CI jobs.

**Second bottleneck (predicted):** Lighthouse CI run time once page count > 100. Mitigation: LHCI's `--collect.numberOfRuns=3` × all pages × 3 categories = minutes. Solution: run Lighthouse only on a representative sample per region in CI; full sweep nightly.

**Third bottleneck (predicted):** Affiliate-link-rot. Booking and Viator URLs change formats; we wrap them in helpers (Phase 1.4) so any URL-format change is one PR, but link-rot detection needs the audit dashboard's broken-link scanner (Phase 1.9).

---

## 11. Confidence Assessment Summary

| Decision | Confidence | Why this level |
|----------|------------|----------------|
| URL structure (HE root, EN prefixed) | HIGH | Mega-prompt explicit + Google docs corroborate |
| Trailing slash policy | HIGH | Next.js default + Vercel-validated pattern |
| English slugs in both locales | MEDIUM | Sound reasoning but unproven; R3 keyword data may revise |
| `next-intl` choice | HIGH | Multiple 2026 comparisons converge; App Router + RSC official recommendation |
| R6 language decision (EN + HE launch, FR scaffold) | MEDIUM-HIGH | 2023 numbers solid; FR-defer-not-skip is judgment call |
| Schema topology | HIGH | Mega-prompt + Google docs + schema.org explicit |
| 3-layer design tokens | HIGH | Consensus 2026 pattern, fits Tailwind v4 `@theme` |
| CVA over tailwind-variants | MEDIUM-HIGH | Both work; CVA has bigger ecosystem |
| `/admin/components/` over Storybook | HIGH | Mega-prompt + scale justifies |
| Velite + MDX over CMS | MEDIUM-HIGH | Right for this scale + team; revisit if content team grows |
| Audit dashboard hybrid (build-JSON + RSC) | HIGH | Standard pattern |
| Middleware basic auth | HIGH | Documented |
| Build-order graph | HIGH | Derived from mega-prompt's stated dependencies |

---

## Sources

### Israel tourism data (R6)
- [Tourist Israel — Israel Travel & Tourism Statistics for 2023](https://www.touristisrael.com/israel-travel-tourism-statistics/53929/) — 2023 country breakdown (HIGH confidence)
- [JNS — 3 million tourists visited Israel in 2023 before Hamas war](https://www.jns.org/3-million-tourists-visited-israel-in-2023-before-hamas-war/)
- [JNS — 1.3 million tourists visited Israel in 2025](https://www.jns.org/1-3-million-tourists-visited-israel-in-2025/) — 2025 recovery data (MEDIUM, single-year)
- [Jerusalem Post — Tourism rebounds with 1.3 million visitors](https://www.jpost.com/israel-news/article-881915)
- [Roadgenius — Israel Tourism Statistics 2025](https://roadgenius.com/statistics/tourism/israel/)
- [Wikipedia — Russian language in Israel](https://en.wikipedia.org/wiki/Russian_language_in_Israel) — diaspora demographics (HIGH)
- [Catholic World Report — current state of religious tourism in Holy Land](https://www.catholicworldreport.com/2024/06/04/where-are-all-the-pilgrims-the-current-state-of-religious-tourism-in-the-holy-land/) — French pilgrimage context (MEDIUM)

### i18n
- [Next.js — Guides: Internationalization](https://nextjs.org/docs/app/guides/internationalization) — official confirmation that built-in i18n is Pages-Router-only (HIGH)
- [next-intl docs — App Router setup](https://next-intl.dev/docs/getting-started/app-router) (HIGH)
- [vercel/next.js Discussion #75928 — i18n latency in App Router](https://github.com/vercel/next.js/discussions/75928)
- [DEV.to — Best i18n Libraries for Next.js 2026](https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f)
- [Intlpull — Next.js i18n Tutorial 2026: App Router](https://intlpull.com/blog/nextjs-internationalization-tutorial-2026)

### Hreflang & URL
- [Google Search Central — Localized Versions of your Pages](https://developers.google.com/search/docs/specialty/international/localized-versions) — authoritative hreflang spec (HIGH)
- [Next.js — trailingSlash config](https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash) (HIGH)
- [Medium — Next.js SEO Playbook 2025](https://medium.com/@CookieDuster_N/the-next-js-seo-playbook-2025-edition-dcd1113b79fb)
- [Yoast — Bad slug for Arabic URLs](https://yoast.com/video/ask-yoast-slug-for-arabic-urls/) — non-Latin slug fragility (MEDIUM)

### Schema
- [schema.org — TouristDestination](https://schema.org/TouristDestination) (HIGH)
- [Google — General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) (HIGH)
- [SearchEngineLand — SEO breadcrumbs guide](https://searchengineland.com/guide/seo-breadcrumbs)
- [Black Bear Media — Travel schema strategies](https://blackbearmedia.io/11-powerful-schema-markup-strategies-for-travel-websites/)

### Design system
- [Tailwind CSS — Theme variables](https://tailwindcss.com/docs/theme) — `@theme` directive (HIGH)
- [Mavik Labs — Design Tokens That Scale 2026 (Tailwind v4 + CSS Variables)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/)
- [CVA docs](https://cva.style/docs) (HIGH)
- [Tailwind Variants — Comparison](https://www.tailwind-variants.org/docs/comparison)

### Content pipeline
- [Velite — Introduction](https://velite.js.org/guide/introduction) (HIGH)
- [Wisp CMS — ContentLayer has been Abandoned](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives) — contentlayer status (MEDIUM-HIGH)
- [Content Collections — Quickstart Next.js](https://www.content-collections.dev/docs/quickstart/next)
- [Char Blog — Choosing a CMS in 2026](https://char.com/blog/choosing-a-cms/)
- [React Libraries — Payload CMS vs Sanity for Next.js 15](https://www.reactlibraries.com/blog/payload-cms-vs-sanity-for-next-js-15-a-technical-comparison)

### Auth
- [Vercel — Basic Auth Password Protection template](https://vercel.com/templates/next.js/basic-auth-password)
- [vercel/next.js Discussion #50538 — basic HTTP auth in App Router](https://github.com/vercel/next.js/discussions/50538)
- [HashBuilds — Next.js Middleware Authentication 2025](https://www.hashbuilds.com/articles/next-js-middleware-authentication-protecting-routes-in-2025)

### Local skills consulted (HIGH confidence — locally installed and vetted)
- `.agents/skills/hebrew-rtl-best-practices/SKILL.md` — RTL/Hebrew CSS logical properties, font stacks, bidi handling
- `.agents/skills/next-best-practices/SKILL.md` — Next.js 15 App Router conventions, RSC boundaries, async APIs

---

*Architecture research for: Discover Israel (tourism affiliate, Next.js 15, EN+HE bilingual)*
*Researched: 2026-05-11*
*Authored by: gsd-project-researcher (Architecture dimension, R6-enriched)*
