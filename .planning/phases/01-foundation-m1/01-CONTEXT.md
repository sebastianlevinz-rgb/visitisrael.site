# Phase 1: Foundation (M1) - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning
**Mode:** YOLO auto — phase exhaustively pre-decided by upstream research; no interactive questioning needed.

<domain>
## Phase Boundary

Deliver all 11 Foundation sub-phases (1.1 through 1.11) that prevent Discover Argentina's 9 structural debt root causes. Every infrastructure piece needed to write a region canonical must exist and be enforced (linting, CI gates, ledger validation, audit rules) BEFORE Phase 2 (Pilot Jerusalem) writes a single content page.

**In scope:** 11 sub-phases of mega-prompt Fase 1 covering 40 v1 requirements (FND-01..08, AFF-01..08, I18N-01..06, A11Y-01/02/06/07/08, SEO-01/02/03/05/06, IMG-01/02/03/06, AUD-01..05).

**Out of scope (this phase):**
- Any region content (Jerusalem canonical is Phase 2.1)
- Accessibility statement page content (Phase 2.5; infra A11Y-07 + A11Y-08 belong here)
- Affiliate AID activation (apply during Phase 1.4; AIDs arrive on partner timeline — fallback to public URLs is the day-1 behavior)
- Long-tail sub-destination keyword data (Phase 4 — driven by paid Ahrefs data bought before Phase 2.1)

</domain>

<decisions>
## Implementation Decisions

All decisions below are LOCKED by research convergence (SUMMARY.md §2, 13 HIGH-confidence convergences across STACK/FEATURES/ARCHITECTURE/PITFALLS). The planner should treat these as inputs, not open questions.

### Tech stack (Phase 1.1 — FND-01)

- **Framework:** Next.js 15.5.x App Router + TypeScript 5.6+ strict + React 19
- **NOT Next.js 16** until Phase 3 — avoid mid-foundation breaking changes (middleware→proxy rename, Turbopack default, React Compiler default)
- **Styling:** Tailwind CSS v4 with `@theme` directive (3-layer tokens) + `hebrew-tailwind-preset` skill applied
- **Package manager:** pnpm (lockfile committed)
- **Deploy target:** Vercel; placeholder domain at scaffold; production domain in Phase 6
- **No Storybook** — `/admin/components/` noindex playground per ARCHITECTURE §5.4 (sufficient at one-writer scale)

### i18n & RTL (Phase 1.1, 1.3 — I18N-01..06, FND-03)

- **Library:** `next-intl` v3 (NOT `next-i18next`, NOT Pages-Router patterns)
- **Locale prefix:** `'as-needed'` → HE at root (`/jerusalem/`), EN at `/en/jerusalem/`
- **Registered locales at launch:** `he`, `en` ONLY (Conflict A resolution — PITFALLS §3.11 wins on registration)
- **Filesystem readiness for FR:** `content/fr/` exists empty; Velite collection accepts `lang: z.enum(['he','en','fr'])`; schema/sitemap generators iterate the REGISTERED locales array (single source of truth in `i18n-config.ts`)
- **Slugs:** English in BOTH locales at launch (Conflict B clarified — not a true conflict; defer Hebrew slug aliases to v2)
- **`<html>` attributes:** `lang="he" dir="rtl"` for HE pages; `lang="en" dir="ltr"` for EN pages — set per route via locale layout
- **Logical CSS only:** `ms-/me-/ps-/pe-/start-/end-/inset-inline-start` — ESLint bans physical `ml-/pr-/border-l/text-left` etc.
- **Hreflang:** Reciprocal `<link rel="alternate" hreflang="he" />`, `hreflang="en"`, + `x-default` pointing to `/en/` — only for built locales

### Affiliate infrastructure (Phase 1.4 — AFF-01..08)

- **9 verified-operational helpers built as real:** `bookingLink()`, `civitatisLink()`, `viatorLink()`, `getYourGuideLink()`, `rentalcarsLink()`, `safetyWingLink()`, `skyscannerLink()`, `hostelworldLink()`, `discoverCarsLink()` — each reads its env var and returns either AID-tagged URL or public URL (codemod-ready)
- **2 stubs that throw documented error:** `klookLink()` (thin Israel SKU) and `goCityLink()` (no Israel destination yet) — Conflict D resolution
- **Env vars:** All in `.env.example` with TODOs; `.env.local` is gitignored
- **`data/affiliate-availability.json`:** Tracks per-partner state ∈ `{pending, applied, active, sparse, absent}`; Klook/GoCity = `absent` at launch
- **`data/affiliate-status.json`:** Tracks AID receipt date per partner; quarterly review cron in Phase 6
- **Tests:** ≥4 Vitest tests per real helper (44 minimum) + 4 stub-throws tests
- **Travelpayouts aggregator account:** Configured as fallback for traffic-minimum partners (Skyscanner 5K visitors/mo)

### Photo credits ledger (Phase 1.5 — IMG-01..06)

- **Ledger location:** `data/photo-credits.json` with Zod schema: `{ src, author, license, sourceUrl, region, slug, width, height, subjectType, restrictedSiteAcknowledgment?, licenseProof? }`
- **CI gate (highest-leverage build per SUMMARY §1.8):** Walks every `next/image` reference, cross-references ledger, validates width ≥1200px against actual file metadata via Sharp. Build FAILS on undocumented image, orphaned image, or width violation.
- **Helper:** `getCredit(src)` throws `Error` if entry missing
- **Image formats:** AVIF + WebP + JPEG fallback via `next/image`
- **`srcset` widths:** 320 / 640 / 1024 / 1600
- **Hero images:** `priority` + `fetchpriority="high"` (AUD-012)
- **Restricted sites:** `restrictedSiteAcknowledgment` field required for Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í Gardens; ledger validator hard-fails if missing for those subject types
- **Primary sources:** Wikimedia Commons CC-BY/CC-BY-SA; IGPO archive supplementary; Unsplash/Pexels only for abstract heroes

### Schema markup (Phase 1.6 — SEO-01..06)

- **Library:** `schema-dts` (Google-maintained, typed JSON-LD)
- **Injection pattern:** Native `<script type="application/ld+json">` from RSC (NOT `next-seo` — its App Router support is patchy)
- **Page-level vs layout:** Page-level for content schemas (`TouristDestination`, `TouristAttraction`, etc.); ONLY `Organization` schema in root layout
- **Generators:** `TouristDestination`, `TouristAttraction`, `ReligiousBuilding`, `Place`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`, `WebSite`, `CollectionPage`, `WebPage`, `Organization`
- **Validation:** `scripts/qa/validate-schema.mjs` runs pre-commit; supplementary Google Rich Results Test sampling for changed pages in CI
- **Religious-site dual naming:** "Temple Mount / Haram al-Sharif" paired first-reference; "Western Wall" not "Wailing Wall"; `Bethlehem/Hebron/Jericho` carry `administrativeStatus` frontmatter — AUD-017..AUD-020
- **`data/religious-sites.json`:** HE/EN/AR names + Wikidata IDs (Phase 1.6 sub-task; feeds schema generators)

### ESLint enforcement (Phase 1.1 + 1.4 — AFF-04, AFF-05)

- **Flat config** (`eslint.config.js`), not legacy `.eslintrc`
- **Three inviolable rules:**
  1. `eslint-plugin-tailwindcss/no-arbitrary-value` — bans `bg-[#abc]`, `text-[#fff]` in className
  2. `no-restricted-syntax` (custom AST selector) — bans `style={{ color: '#fff' }}` and direct partner URLs (`href="https://www.booking.com/..."`) in JSX — escape hatch only for `lib/affiliate/**`
  3. `no-restricted-syntax` (custom AST selector) — bans physical Tailwind utilities (`ml-`, `pr-`, `border-l`, `text-left`, etc.)
- **Pre-commit hooks:** Husky + lint-staged runs ESLint + `tsc --noEmit` + schema validator + photo-credits validator

### Quality scoring profiles (Phase 1.7 — FND-05)

5 profiles with distinct weights (fixes Argentina lesson #5):

| Profile | Schema | Affiliates | Length | Photos | Hreflang |
|---|---|---|---|---|---|
| `REGION_CANONICAL` | ✓ required | ✓ 5+ | 1500w+ | ✓ | ✓ |
| `SUB_DESTINATION` | ✓ required | ✓ 1+ | 800w+ | ✓ | ✓ |
| `GUIDE_OR_WINERY` | Article + LocalBusiness | ✓ 1+ | 600w+ | ✓ | ✓ |
| `UTILITY` | WebPage minimal | not required | not enforced | optional | ✓ |
| `HUB` | CollectionPage | not required | not enforced | optional | ✓ |

### Audit dashboard (Phase 1.9 — AUD-01..05)

- **Route:** `/admin/audit/` (noindex via robots.ts, basic auth middleware via env vars)
- **34 rules:** AUD-001..AUD-034 from PITFALLS §6 — AUD-001..016 generic/Argentina-inherited; AUD-017..034 Israel-specific (religious naming, Shabbat, RTL, IS 5568, image rights)
- **Architecture (ARCHITECTURE §7):** Hybrid — build-time scanner writes JSON consumed by RSC route (NOT runtime crawler)
- **Per-page score:** 0–100 using one of the 5 quality profiles; gate ≥85 pilot, ≥80 replicated regions
- **Quality Gate report generator:** Writes `data/quality-gate-{pass|failure}.md` summarizing 10-criterion result before Phase 3 advance

### Lighthouse CI (Phase 1.10 — AUD-03)

- **Tool:** `@lhci/cli` (Google-official; NOT Unlighthouse — that's single-run; NOT PSI API — no gating; NOT Treo — overpriced at this scale)
- **Config:** `numberOfRuns: 3` + `aggregationMethod: 'median'` + assertions
- **Thresholds:** Mobile performance ≥0.90, a11y ≥0.95, best-practices ≥0.95, SEO 1.00
- **Hard gate:** Pre-deploy; deploy blocked on regression
- **History:** Retained 90 days for regression detection (Phase 6 DEP-04)

### Build order (Phase 1.1 → 1.11 — ARCHITECTURE §8 DAG)

Locked dependency graph — must drive plan-phase wave structure:

```
1.1 Scaffold (Next.js + TS + Tailwind + next-intl + ESLint flat + Vercel)
        │
        ▼
[1.2 Design tokens] [1.5 Photo ledger] [1.6 Schema lib]  ← parallel
                │
                ▼
1.3 Component lib (primitives + composites)
        │
        ▼
1.4 Affiliate helpers (9 real + 2 stubs)
        │
        ▼
[1.7 Quality profiles] [1.8 SEO config (sitemap/robots/hreflang/canonical/301s)]  ← parallel
                │
                ▼
1.11 NER detection
        │
        ▼
1.9 Audit dashboard
        │
        ▼
1.10 Lighthouse CI gate
```

Sub-pages cannot be built before canonical pattern stabilizes (Argentina lesson #9 — encoded as ARCHITECTURE §8.4).

### Analytics & Tracking (Phase 1.1 — FND-08)

- **Default choice:** Plausible (privacy-first, no cookie banner needed, EU-compliant)
- **Fallback:** PostHog if explicit product analytics needs surface during 1.1
- **UTM tracking:** Every CTA tagged via affiliate helper; tracked at affiliate-link generation, not browser

### Claude's Discretion (planner + execution flexibility)

The planner has flexibility on:
- **Exact ESLint plugin versions** — pin major.minor at planning time, latest patch
- **Pre-commit hook ordering** — within the lint/typecheck/schema/credits set
- **Test runner config detail** — Vitest config beyond "run on commit"
- **Token naming within the 3-layer scheme** — e.g., `primary` vs `brand` vs `accent` is style; semantic vs foundation layer split is locked
- **`/admin/components/` page structure** — list-style vs tab-style vs grid-style is open
- **Audit dashboard UI** — JSON output schema is locked (AUD rules) but presentation HTML is open
- **NER dictionary seed size** — start with mega-prompt suggested classes; add categories as MDX reveals patterns
- **Exact Vercel project config** — env var sync, preview branch settings, etc.
- **Husky vs simple-git-hooks vs lefthook** — Husky is recommended in STACK.md but planner can swap if simpler at install time

</decisions>

<specifics>
## Specific Ideas

References and "I want it like X" moments from upstream research, captured here so planner doesn't have to re-derive:

- **Photo credits ledger gate is the single highest-leverage build** (SUMMARY §1.8) — execute before any image import becomes possible
- **Affiliate helper escape hatch** is `lib/affiliate/**` — ESLint rule should not break the helpers themselves
- **Religious-site naming style** follows BBC/AP convention (paired-on-first-reference, neutral terminology) — see CAMERA-UK reference in STACK.md sources
- **Hebcal API endpoint pattern:** `https://www.hebcal.com/shabbat/?cfg=json&geonameid=` — relevant for `<ShabbatNotice>` in Phase 1.3 component lib
- **FTC inline disclosure positioning:** within 1 viewport-height of FIRST affiliate link (AUD-009) — not footer-only
- **Israeli a11y enforcement layered:** Lighthouse a11y ≥95 + axe-core CI checks + `audit_a11y.py` from `israeli-accessibility-compliance` skill (covers IS 5568-specific cases Lighthouse misses)
- **Vercel basic auth pattern:** middleware-based (works on Hobby plan) for `/admin/*` — see Vercel template reference in research sources
- **Plausible cookie-less stance:** intentional choice over GA4 — avoids cookie banner UX cost AND analytics blocking from privacy plugins

</specifics>

<code_context>
## Existing Code Insights

This is a true greenfield — git was initialized in this session, no prior code committed. The "existing code" is the **skills installed at `.agents/skills/`** plus the **research documents** that bake in conventions.

### Reusable Assets (from installed skills)

| Skill | What it provides for Phase 1 | Used in sub-phase |
|---|---|---|
| `next-best-practices` (Vercel official) | App Router patterns, JSON-LD pattern, image priority pattern | 1.1, 1.6 |
| `hebrew-tailwind-preset` (skills-il) | Tailwind config snippet + logical utilities | 1.1, 1.2 |
| `hebrew-rtl-best-practices` (skills-il) | RTL component patterns for primitives + composites | 1.3 |
| `tailwind-design-system` (wshobson, 40.4K installs) | 3-layer token architecture reference | 1.2 |
| `israeli-accessibility-compliance` (skills-il) | `audit_a11y.py` script + IS 5568 audit rules | 1.9, 1.10 |
| `accessibility` (addyosmani, 21.5K installs) | Generic WCAG cross-check rules | 1.9, 1.10 |
| `affiliate-marketing` + `affiliate-page-generator` (kostja94) | Helper patterns + FTC disclosure conventions | 1.4 |
| `performance-lighthouse-runner` | `.lighthouserc.cjs` pattern | 1.10 |
| `image-optimization` (aj-geddes) + `responsive-images` (oakoss) | srcset + AVIF/WebP recipes | 1.5 |

### Established Patterns (from research, not yet in code)

- **3-layer design tokens:** foundation (raw HSL) → semantic (primary/accent/surface/ink) → component (button-bg-primary) — Tailwind v4 `@theme`
- **Single source of truth for locales:** `i18n-config.ts` `locales` array drives middleware + hreflang + sitemap + language switcher
- **Helper-first affiliate pattern:** every partner URL goes through `lib/affiliate/{partner}.ts`; ESLint enforces site-wide
- **JSON-LD page-level, Organization layout-level:** prevents schema cascade conflicts (ARCHITECTURE §4.2)
- **Build-time audit JSON:** scanner produces `.planning/audit/results.json` that RSC route renders; no runtime crawl

### Integration Points

- **`middleware.ts`:** owns locale routing (next-intl), 301 redirects, basic auth for `/admin/*`
- **`app/[locale]/layout.tsx`:** owns `<html lang dir>`, `next-intl` provider, theme provider, root-layout `Organization` JSON-LD
- **`tailwind.config.ts` + `app/globals.css`:** 3-layer tokens land here
- **`lib/affiliate/`:** helper escape hatch from ESLint rules; one file per partner
- **`lib/schema/`:** generator functions per schema type; tested via Vitest
- **`data/`:** `photo-credits.json`, `affiliate-availability.json`, `affiliate-status.json`, `entity-dict.json`, `religious-sites.json` (all created Phase 1)
- **`scripts/qa/`:** `validate-schema.mjs`, `validate-photo-credits.mjs`, audit dashboard scanner
- **`scripts/codemods/`:** placeholder for affiliate AID flip codemods (when AIDs arrive)
- **`content/{he,en}/`:** Velite collection root (empty at end of Phase 1; populated Phase 2)
- **`.lighthouserc.cjs`:** Lighthouse CI config — points at preview deploy URLs

</code_context>

<deferred>
## Deferred Ideas

Ideas surfaced during research that belong in later phases or v2 — captured here so the planner doesn't accidentally pull them into Phase 1.

- **FR locale registration** — Scaffold only in Phase 1.1 (filesystem, types, Velite collection); register + content in M3 (post-pilot, see Gap §6 of SUMMARY).
- **RU locale** — Defer until 2026/2027 inbound tourism data shifts (SUMMARY §6 Gap unresolved).
- **Hebrew slug aliases** — Defer to v2 (Hebrew slug aliases like `/ירושלים/` redirecting to `/jerusalem/`).
- **`<ShabbatNotice>` runtime widget** — Component scaffolded in Phase 1.3 as STATIC (props-driven); promote to RUNTIME consuming Hebcal API only if Phase 6 monitoring shows demand (DIF-V2-01).
- **Reg-35 accessibility preferences widget** — Per `israeli-accessibility-compliance` SKILL.md, deferred unless legal exposure changes (DIF-V2-02). Not legally mandatory for affiliate sites under 25 employees.
- **Klook + GoCity activation** — Stubs in Phase 1.4; activation deferred to v2 when SKU coverage materializes (AFF-V2-01/02).
- **Headless CMS migration** — Velite + MDX in repo for v1; revisit if content team grows >3 editors.
- **NER expansion to relation extraction** — Phase 1.11 builds entity classification only; relation extraction is post-MVP.
- **Vercel Pro deployment protection** — Basic-auth middleware in Phase 1.9 works on Hobby; if project commits to Pro, swap to native Deployment Protection later (no Phase 1 work).
- **Real-time price/FX conversion** — Phase 1.3 builds `<Price>` as STATIC (ILS+USD+EUR with daily-cached FX); no runtime conversion service.
- **Long-tail keyword research** — Phase 4 work; Phase 1 builds the infra to host long-tail pages, not the data.
- **Paid Ahrefs/DataForSEO buy** — Phase 2.1 prerequisite, NOT Phase 1; identified as SUMMARY §6 Gap #1.

</deferred>

---

*Phase: 01-foundation-m1*
*Context gathered: 2026-05-11*
*Mode: YOLO auto — context pre-extracted from research convergence, no interactive questioning required*
