# Phase 1: Foundation (M1) — Research

**Researched:** 2026-05-11
**Domain:** Greenfield Next.js 15.5 App Router scaffold with bilingual HE/EN i18n, 3-layer Tailwind v4 design tokens, 9+2 affiliate helpers, photo-credits CI gate, schema-dts generators, 34-rule audit dashboard, Lighthouse CI gate, NER detection
**Confidence:** HIGH overall — every "what to build" decision is locked upstream; this document synthesizes "how to build, in what order, with what proof."
**Researcher:** gsd-phase-researcher
**Scope:** Phase 1 sub-phases 1.1 through 1.11 covering 40 v1 requirements (FND-01..08, AFF-01..08, I18N-01..06, A11Y-01/02/06/07/08, SEO-01/02/03/05/06, IMG-01/02/03/06, AUD-01..05).

> **Reading order:** Section 1 is the meat — concrete steps per sub-phase. Section 2 is the wave graph (drives parallel execution). Section 3 is the Nyquist dim-8 validation contract. Section 4 covers cross-cutting infra. Section 5 lists genuine open items (deliberately short). Skip Section 6 — upstream research already has full citations.

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

All decisions below are LOCKED by research convergence (SUMMARY.md §2, 13 HIGH-confidence convergences across STACK/FEATURES/ARCHITECTURE/PITFALLS). The planner treats these as inputs, not open questions.

**Tech stack (Phase 1.1 — FND-01)**
- Framework: Next.js 15.5.x App Router + TypeScript 5.6+ strict + React 19
- NOT Next.js 16 until Phase 3 (avoids middleware→proxy rename, Turbopack default, React Compiler default mid-foundation)
- Styling: Tailwind CSS v4 with `@theme` directive (3-layer tokens) + `hebrew-tailwind-preset` skill applied
- Package manager: pnpm (lockfile committed)
- Deploy target: Vercel; placeholder domain at scaffold; production domain in Phase 6
- No Storybook — `/admin/components/` noindex playground per ARCHITECTURE §5.4

**i18n & RTL (Phase 1.1, 1.3 — I18N-01..06, FND-03)**
- Library: `next-intl` v3 (NOT `next-i18next`, NOT Pages-Router patterns)
- Locale prefix: `'as-needed'` → HE at root (`/jerusalem/`), EN at `/en/jerusalem/`
- Registered locales at launch: `he`, `en` ONLY (Conflict A — PITFALLS §3.11 wins on registration)
- Filesystem readiness for FR: `content/fr/` exists empty; Velite collection accepts `lang: z.enum(['he','en','fr'])`; schema/sitemap generators iterate REGISTERED locales (single source of truth in `i18n-config.ts`)
- Slugs: English in BOTH locales at launch (Conflict B clarified — defer Hebrew slug aliases to v2)
- `<html>` attributes: `lang="he" dir="rtl"` for HE; `lang="en" dir="ltr"` for EN — set per-route via locale layout
- Logical CSS only: `ms-/me-/ps-/pe-/start-/end-/inset-inline-start` — ESLint bans physical `ml-/pr-/border-l/text-left`
- Hreflang: Reciprocal `<link rel="alternate" hreflang="he">`, `hreflang="en"`, + `x-default` to `/en/` — only for built locales

**Affiliate infrastructure (Phase 1.4 — AFF-01..08)**
- 9 verified-operational helpers as real: `bookingLink`, `civitatisLink`, `viatorLink`, `getYourGuideLink`, `rentalcarsLink`, `safetyWingLink`, `skyscannerLink`, `hostelworldLink`, `discoverCarsLink`
- 2 stubs that throw documented error: `klookLink` and `goCityLink` (Conflict D resolution)
- Env vars in `.env.example` with TODOs; `.env.local` gitignored
- `data/affiliate-availability.json`: state ∈ `{pending, applied, active, sparse, absent}`; Klook/GoCity = `absent` at launch
- `data/affiliate-status.json`: AID receipt date per partner; quarterly cron in Phase 6
- Tests: ≥4 Vitest tests per real helper (44 minimum) + 4 stub-throws tests
- Travelpayouts aggregator account: fallback for traffic-minimum partners

**Photo credits ledger (Phase 1.5 — IMG-01..06)**
- Ledger: `data/photo-credits.json` with Zod schema `{ src, author, license, sourceUrl, region, slug, width, height, subjectType, restrictedSiteAcknowledgment?, licenseProof? }`
- CI gate (highest-leverage build per SUMMARY §1.8): walks every `next/image` ref, cross-refs ledger, validates width ≥1200px via Sharp. Build FAILS on undocumented, orphaned, or width violation.
- Helper: `getCredit(src)` throws `Error` if entry missing
- Image formats: AVIF + WebP + JPEG fallback via `next/image`
- `srcset` widths: 320 / 640 / 1024 / 1600
- Hero images: `priority` + `fetchpriority="high"`
- Restricted sites: `restrictedSiteAcknowledgment` REQUIRED for Western Wall, Holy Sepulchre, Dome of the Rock, Bahá'í Gardens — validator hard-fails if missing
- Primary sources: Wikimedia Commons CC-BY/CC-BY-SA; IGPO supplementary; Unsplash/Pexels only for abstract heroes

**Schema markup (Phase 1.6 — SEO-01..06)**
- Library: `schema-dts` (Google-maintained, typed JSON-LD)
- Injection: Native `<script type="application/ld+json">` from RSC (NOT `next-seo`)
- Page-level for content; ONLY `Organization` in root layout
- Generators: `TouristDestination`, `TouristAttraction`, `ReligiousBuilding`, `Place`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`, `WebSite`, `CollectionPage`, `WebPage`, `Organization`
- Validation: `scripts/qa/validate-schema.mjs` pre-commit; supplementary Google Rich Results Test sampling in CI
- Religious-site dual naming: "Temple Mount / Haram al-Sharif" paired first-reference; "Western Wall" not "Wailing Wall"; `Bethlehem/Hebron/Jericho` carry `administrativeStatus` frontmatter
- `data/religious-sites.json`: HE/EN/AR names + Wikidata IDs

**ESLint enforcement (Phase 1.1 + 1.4 — AFF-04, AFF-05)**
- Flat config (`eslint.config.js`)
- Three inviolable rules: (1) `tailwindcss/no-arbitrary-value` (2) `no-restricted-syntax` ban inline-hex + raw partner URLs (escape hatch `lib/affiliate/**`) (3) `no-restricted-syntax` ban physical directional utilities
- Pre-commit: Husky + lint-staged runs ESLint + `tsc --noEmit` + schema validator + photo-credits validator

**Quality scoring profiles (Phase 1.7 — FND-05)**
5 profiles with distinct weights — fixes Argentina lesson #5:
| Profile | Schema | Affiliates | Length | Photos | Hreflang |
|---|---|---|---|---|---|
| `REGION_CANONICAL` | ✓ required | ✓ 5+ | 1500w+ | ✓ | ✓ |
| `SUB_DESTINATION` | ✓ required | ✓ 1+ | 800w+ | ✓ | ✓ |
| `GUIDE_OR_WINERY` | Article + LocalBusiness | ✓ 1+ | 600w+ | ✓ | ✓ |
| `UTILITY` | WebPage minimal | not required | not enforced | optional | ✓ |
| `HUB` | CollectionPage | not required | not enforced | optional | ✓ |

**Audit dashboard (Phase 1.9 — AUD-01..05)**
- Route: `/admin/audit/` (noindex via robots.ts, basic auth middleware via env vars)
- 34 rules AUD-001..AUD-034 from PITFALLS §6 (001-016 generic; 017-034 Israel-specific)
- Architecture (ARCHITECTURE §7): Hybrid — build-time scanner writes JSON consumed by RSC route
- Per-page score 0–100 using one of 5 profiles; gate ≥85 pilot, ≥80 replicated
- Quality Gate report generator: writes `data/quality-gate-{pass|failure}.md` before Phase 3 advance

**Lighthouse CI (Phase 1.10 — AUD-03)**
- Tool: `@lhci/cli` (Google-official)
- Config: `numberOfRuns: 3` + `aggregationMethod: 'median'` + assertions
- Thresholds: Mobile perf ≥0.90, a11y ≥0.95, best-practices ≥0.95, SEO 1.00
- Hard gate pre-deploy; History retained 90 days

**Analytics (Phase 1.1 — FND-08)**
- Default: Plausible (privacy-first, cookie-less, EU-compliant)
- Fallback: PostHog if product analytics need surfaces in 1.1
- UTM tracking via affiliate helper, not browser

**Build order (Phase 1.1 → 1.11 — ARCHITECTURE §8 DAG)**

```
1.1 Scaffold
    ↓
[1.2 Design tokens] [1.5 Photo ledger] [1.6 Schema lib]  ← parallel
                ↓
1.3 Component lib
                ↓
1.4 Affiliate helpers
                ↓
[1.7 Quality profiles] [1.8 SEO config]  ← parallel
                ↓
1.11 NER detection
                ↓
1.9 Audit dashboard
                ↓
1.10 Lighthouse CI gate
```

### Claude's Discretion

The planner has flexibility on:
- Exact ESLint plugin versions — pin major.minor at planning time, latest patch
- Pre-commit hook ordering within lint/typecheck/schema/credits set
- Test runner config detail — Vitest config beyond "run on commit"
- Token naming within 3-layer scheme (e.g., `primary` vs `brand` vs `accent` is style)
- `/admin/components/` page structure — list-style vs tab-style vs grid-style is open
- Audit dashboard UI — JSON output schema is locked (AUD rules) but presentation HTML is open
- NER dictionary seed size — start with mega-prompt suggested classes; add as MDX reveals patterns
- Exact Vercel project config — env var sync, preview branch settings
- Husky vs simple-git-hooks vs lefthook — Husky recommended in STACK.md but planner can swap

### Deferred Ideas (OUT OF SCOPE for Phase 1)

- **FR locale registration** — Scaffold only (filesystem, types, Velite collection); register + content in M3
- **RU locale** — Defer until 2026/2027 inbound tourism data shifts
- **Hebrew slug aliases** (`/ירושלים/` → `/jerusalem/`) — v2
- **`<ShabbatNotice>` runtime widget** — Static (props-driven) in 1.3; runtime via Hebcal deferred to Phase 6+
- **Reg-35 a11y preferences widget** — Deferred unless legal exposure changes (DIF-V2-02)
- **Klook + GoCity activation** — Stubs only in 1.4; activation v2
- **Headless CMS migration** — Velite + MDX for v1
- **NER relation extraction** — 1.11 builds entity classification only; relations post-MVP
- **Vercel Pro deployment protection native** — Basic-auth middleware in 1.9 works on Hobby
- **Real-time price/FX conversion** — `<Price>` static (ILS+USD+EUR daily-cached FX) in 1.3
- **Long-tail keyword research / paid Ahrefs/DataForSEO** — Phase 2.1 prerequisite, NOT Phase 1

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Primary sub-phase | Research support |
|----|-------------|-------------------|------------------|
| FND-01 | Next.js 15.5 + TS strict + Tailwind v4 + pnpm + Vercel scaffold | 1.1 | STACK §1.1, §1.4 install commands |
| FND-02 | 3-layer design tokens (foundation/semantic/component) in Tailwind v4 `@theme`, zero raw hex in components | 1.2 | ARCHITECTURE §5.1, hebrew-tailwind-preset SKILL §1 |
| FND-03 | 7 primitives + 12 travel composites with CVA variants | 1.3 | ARCHITECTURE §5.3 |
| FND-04 | `/admin/components/` noindex playground (default + edge-case states) | 1.3 | ARCHITECTURE §5.4 |
| FND-05 | 5 quality scoring profiles with distinct weights | 1.7 | CONTEXT §Quality scoring profiles |
| FND-06 | Dynamic sitemap (registered locales only); robots; canonical/hreflang generators; 301 map | 1.8 | STACK §6, ARCHITECTURE §1.4 |
| FND-07 | NER `data/entity-dict.json` + regex detector → audit dashboard | 1.11 | CONTEXT, ARCHITECTURE §7.1 flow |
| FND-08 | Plausible (default) wired with UTM tracking; no cookie banner | 1.1 | CONTEXT §Analytics |
| AFF-01 | 9 real helpers (Booking/Civitatis/Viator/GYG/Rentalcars/SafetyWing/Skyscanner/Hostelworld/DiscoverCars) | 1.4 | STACK §3.1, §3.4 codemod pattern |
| AFF-02 | 2 stub helpers (Klook/GoCity) that throw documented error | 1.4 | STACK §3.1, SUMMARY §3 Conflict D |
| AFF-03 | ≥4 Vitest tests per real helper (44+) + 4 stub-throw tests | 1.4 | STACK §3.4 |
| AFF-04 | ESLint `no-restricted-syntax` ban raw partner URLs (escape hatch `lib/affiliate/**`) | 1.4 | STACK §7.2 |
| AFF-05 | ESLint ban raw hex + physical directional utilities | 1.2 | STACK §7.1, §7.3 |
| AFF-06 | FTC inline disclosure within 1 viewport-height of FIRST affiliate link | 1.4 | PITFALLS §1.4 |
| AFF-07 | `data/affiliate-status.json` per-partner state + AID receipt date | 1.4 | CONTEXT §Affiliate |
| AFF-08 | Travelpayouts aggregator configured as traffic-minimum fallback | 1.4 | STACK §3.2 |
| I18N-01 | `next-intl` v3 + App Router; `localePrefix: 'as-needed'` | 1.1 | STACK §2, ARCHITECTURE §2.1 |
| I18N-02 | `i18n-config.ts` registers `he`+`en`; filesystem+types allow `he`/`en`/`fr` | 1.1 | SUMMARY §3 Conflict A |
| I18N-03 | Hebrew Tailwind preset applied; logical CSS site-wide | 1.2 | hebrew-tailwind-preset SKILL |
| I18N-04 | `<html lang dir>` per-route via layout | 1.1 | STACK §2 finding 1 |
| I18N-05 | Hreflang generator: `he`+`en`+`x-default`; reciprocal; only built locales | 1.8 | ARCHITECTURE §1.4 |
| I18N-06 | Velite + MDX per-locale directories; collection enforces `lang` enum | 1.1 | ARCHITECTURE §6.2 |
| A11Y-01 | Every page declares `lang` and `dir` correctly | 1.1 | israeli-accessibility-compliance SKILL §3 |
| A11Y-02 | Hebrew skip-nav (`דלג לתוכן הראשי`) first focusable; EN counterpart | 1.3 | israeli-accessibility-compliance SKILL §3 |
| A11Y-06 | Form labels + aria-labels + role="alert" Hebrew errors | 1.3 | israeli-accessibility-compliance SKILL §5 |
| A11Y-07 | ZERO accessibility overlays — project policy | 1.1 | STACK §10, israeli-accessibility-compliance SKILL §Avoiding Overlay |
| A11Y-08 | Lighthouse a11y ≥95 mobile (3-run-median); axe-core CI; `audit_a11y.py` | 1.10 | STACK §5.2 |
| SEO-01 | `schema-dts` + native `<script type="application/ld+json">` from RSC | 1.6 | STACK §6.1 |
| SEO-02 | 11 schema generators | 1.6 | ARCHITECTURE §4.1 |
| SEO-03 | `scripts/qa/validate-schema.mjs` pre-commit; supplementary RR Test sampling | 1.6 | ARCHITECTURE §4.3 |
| SEO-05 | Title 50-60 chars (HE ~50); meta-desc 120-160; H1 once; H2 every 200-300w | 1.8 | Velite schema enforces title/desc lengths |
| SEO-06 | Canonical self-referential per locale; never cross-locale | 1.8 | ARCHITECTURE §1.4 |
| IMG-01 | `data/photo-credits.json` Zod schema | 1.5 | STACK §4.4 |
| IMG-02 | CI gate fails on missing/undersized/orphaned image | 1.5 | STACK §4.4 |
| IMG-03 | `srcset` 320/640/1024/1600w; AVIF+WebP+JPEG via `next/image` | 1.5 | STACK §4.1 |
| IMG-06 | Sources allowlist: Wikimedia primary; IGPO supplementary; Unsplash/Pexels for abstracts | 1.5 | PITFALLS §5.1 |
| AUD-01 | `/admin/audit/` (noindex, basic-auth) runs 34 rules; produces JSON + HTML | 1.9 | ARCHITECTURE §7 |
| AUD-02 | Per-page 0-100 score using one of 5 profiles | 1.9 | CONTEXT §Audit dashboard |
| AUD-03 | Lighthouse CI 3-run-median config + thresholds; deploy blocked on fail | 1.10 | STACK §5.2 |
| AUD-04 | Pre-commit hooks: ESLint + tsc + schema + credits | 1.1 | STACK §8 |
| AUD-05 | Quality Gate report generator writes `data/quality-gate-{pass\|failure}.md` | 1.9 | ROADMAP §Quality Gate |

</phase_requirements>

---

## 1. Per-Sub-Phase Implementation Details

### 1.1 Tech-Stack Scaffold (Wave 1)

**Goal:** Boot a Next.js 15.5 + TS-strict + Tailwind v4 + next-intl v3 app on Vercel with HE at root and EN at `/en/`, pre-commit hooks live, Plausible installed, ESLint flat config running the 3 inviolable rules.

**Maps to req IDs:** FND-01, FND-08, I18N-01, I18N-02, I18N-04, I18N-06, A11Y-01, A11Y-07, AFF-04 (partial — the ESLint rule installs here), AFF-05 (layer A — tailwindcss/no-arbitrary-value installs here; layer B inline-hex ban also lives here), AUD-04.

**Wave:** 1 (no parallel siblings; nothing else compiles without scaffold).

**Inputs from prior sub-phases:** none (this is the root).

**Outputs (files produced):**
- `package.json` with `next@^15.5`, `react@^19`, `react-dom@^19`, `typescript@^5.6`, `next-intl@^3`, `tailwindcss@^4`, `@tailwindcss/postcss`, `clsx`, `tailwind-merge`, `zod`, `eslint@^9`, `@typescript-eslint/*@^8`, `eslint-plugin-tailwindcss`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-config-next`, `eslint-plugin-jsx-a11y`, `prettier`, `prettier-plugin-tailwindcss`, `husky@^9`, `lint-staged@^15`, `vitest@^2`, `@vitest/coverage-v8`, `velite`, `schema-dts`, `next-plausible`
- `pnpm-lock.yaml` committed
- `tsconfig.json` (strict: true, verbatimModuleSyntax: true, moduleResolution: "bundler")
- `next.config.ts` (trailingSlash: false; remotePatterns for `upload.wikimedia.org`; deviceSizes [320,640,1024,1600]; formats ['image/avif','image/webp']; minimumCacheTTL 31536000)
- `app/[locale]/layout.tsx` (calls `setRequestLocale(locale)`; sets `<html lang={locale} dir={locale==='he'?'rtl':'ltr'}>`; injects `next-intl` provider; loads Heebo + Assistant + Frank Ruhl Libre via `next/font/google` with `subsets:['hebrew','latin']` and `display:'swap'`; injects PlausibleProvider)
- `app/[locale]/page.tsx` (minimal homepage placeholder)
- `middleware.ts` (uses `createMiddleware` from `next-intl/middleware` with `localePrefix: 'as-needed'`, `localeDetection: true`)
- `i18n-config.ts` — single source of truth: `export const locales = ['he','en'] as const; export const defaultLocale = 'he'; export const allowedLangs = ['he','en','fr'] as const;` (filesystem-allowed superset for FR scaffold)
- `i18n.ts` (`next-intl` getRequestConfig with `setRequestLocale` pattern)
- `messages/he.json`, `messages/en.json` (skeletal namespace stubs); `messages/fr.json` empty file present
- `velite.config.ts` (collections: `regions`, `subDestinations`, `guides`, `legal`; schema enforces `lang: s.enum(['he','en','fr'])`, `title: s.string().max(70)`, `description: s.string().min(120).max(160)`)
- `content/he/`, `content/en/`, `content/fr/` empty directories (with `.gitkeep`)
- `eslint.config.js` (flat config with 3 inviolable rules installed; escape hatch override `files: ['lib/affiliate/**']` disables `no-restricted-syntax`)
- `.prettierrc.json` + `prettier-plugin-tailwindcss` configured
- `.husky/pre-commit` runs `pnpm lint-staged`
- `.husky/pre-push` runs `pnpm qa:credits && pnpm qa:schema`
- `package.json` scripts: `lint`, `typecheck`, `test`, `qa:credits`, `qa:schema`, `lhci`, `dev`, `build`, `start`
- `.env.example` (placeholder for Plausible domain, all 11 affiliate env vars TODO, ADMIN_USER, ADMIN_PASS)
- `.env.local.example` (template; `.env.local` gitignored)
- `vercel.json` (build command `pnpm build`, ignored build step for docs-only commits)
- `app/globals.css` with `@import "tailwindcss"` and `@theme { /* placeholder; populated in 1.2 */ }`

**Concrete steps (copy-pasteable):**

```powershell
# 1. Init
pnpm init
pnpm dlx create-next-app@15.5 . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-eslint --no-git --use-pnpm

# 2. Tailwind v4 + RTL preset
pnpm add -D tailwindcss@^4 @tailwindcss/postcss
pnpm add clsx tailwind-merge

# 3. i18n + content + schema + analytics
pnpm add next-intl@^3 schema-dts zod next-plausible
pnpm add -D velite

# 4. ESLint flat config + plugins
pnpm add -D eslint@^9 @typescript-eslint/eslint-plugin@^8 @typescript-eslint/parser@^8 `
  eslint-plugin-tailwindcss eslint-plugin-react eslint-plugin-react-hooks `
  eslint-config-next eslint-plugin-jsx-a11y prettier prettier-plugin-tailwindcss

# 5. Tests
pnpm add -D vitest@^2 @vitest/coverage-v8

# 6. Hooks
pnpm add -D husky@^9 lint-staged@^15
pnpm exec husky init
```

**ESLint flat config sketch** (`eslint.config.js`):

```js
import next from 'eslint-config-next';
import tailwind from 'eslint-plugin-tailwindcss';
import a11y from 'eslint-plugin-jsx-a11y';

const partnerDomainRegex = String.raw`booking\.com|civitatis\.com|getyourguide\.com|viator\.com|rentalcars\.com|safetywing\.com|skyscanner\.|hostelworld\.com|klook\.com|gocity\.com|discovercars\.com`;
const physicalUtilRegex = String.raw`\b(ml-|mr-|pl-|pr-|left-|right-|border-l\b|border-r\b|rounded-l\b|rounded-r\b|text-left|text-right|scroll-ml-|scroll-mr-)\d?`;

export default [
  ...next,
  ...tailwind.configs['flat/recommended'],
  a11y.flatConfigs.recommended,
  {
    settings: { tailwindcss: { config: 'tailwind.config.ts' } },
    rules: {
      'tailwindcss/no-arbitrary-value': 'error',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      'tailwindcss/classnames-order': 'warn',
      'no-restricted-syntax': ['error',
        {
          selector: "JSXAttribute[name.name='style'] Property[key.name=/^(color|backgroundColor|borderColor|fill|stroke)$/] Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
          message: 'Raw hex codes banned in inline styles. Use Tailwind design tokens.',
        },
        {
          selector: `Literal[value=/^https?:\\/\\/(www\\.)?(${partnerDomainRegex.replace(/\\./g, '\\\\.')})/]`,
          message: 'Hard-coded partner URL detected. Use lib/affiliate/ helper.',
        },
        {
          selector: `JSXAttribute[name.name='className'] Literal[value=/${physicalUtilRegex}/]`,
          message: 'Physical directional utility used. Use logical equivalent (ms-, me-, ps-, pe-, ...). See hebrew-tailwind-preset.',
        },
      ],
      '@next/next/no-img-element': 'error',
    },
  },
  {
    files: ['lib/affiliate/**/*.ts', 'tailwind.config.ts', 'app/globals.css'],
    rules: { 'no-restricted-syntax': 'off' },
  },
];
```

**`lint-staged` config (`package.json`):**

```json
{
  "lint-staged": {
    "*.{ts,tsx,mjs,cjs,js}": ["eslint --fix", "prettier --write"],
    "*.{json,md,mdx,css}": ["prettier --write"],
    "data/photo-credits.json": ["node scripts/qa/check-credits.mjs --full"]
  }
}
```

**Skill invocations:**
- `next-best-practices` — at step "Create `app/[locale]/layout.tsx`" — apply async params + setRequestLocale pattern; apply JSON-LD pattern (deferred to 1.6); apply `next/font` self-hosting
- `hebrew-tailwind-preset` — at step "Tailwind v4 init" — apply `@theme` Hebrew font stack + leading-hebrew tokens (placeholder; real tokens go to 1.2)
- `israeli-accessibility-compliance` — at step "Create `app/[locale]/layout.tsx`" — confirm `<html lang dir>` set + skip-link target `#main-content` exists in layout

**Decision-lock notes for planner:**
- Lock Plausible vs PostHog HERE (default: Plausible per CONTEXT §Analytics). One commit `chore(1.1): lock analytics=plausible` so trail is auditable.
- Husky vs simple-git-hooks vs lefthook: default Husky per STACK §1.2; planner may swap if simpler at install time.

---

### 1.2 Design Tokens (Wave 2 — parallel with 1.5, 1.6)

**Goal:** Materialize 3-layer Tailwind v4 `@theme` token system; install Hebrew Tailwind preset; verify ESLint hex-ban + physical-util-ban fire on test fixtures.

**Maps to req IDs:** FND-02, I18N-03, AFF-05 (Layer B verification — rule was installed in 1.1; this sub-phase produces the test fixture that confirms it fires).

**Wave:** 2 (parallel with 1.5 and 1.6 — disjoint surface area per ARCHITECTURE §8.3 Bundle A).

**Inputs from prior sub-phases:**
- 1.1 must have produced `app/globals.css` with empty `@theme` block
- 1.1 must have installed `eslint-plugin-tailwindcss`

**Outputs:**
- `app/globals.css` populated with 3 layers (foundation/semantic/component) per ARCHITECTURE §5.1
- `tailwind.config.ts` (minimal — Tailwind v4 reads `@theme` directly; this file holds content paths + future plugin slots)
- `tests/eslint-fixtures/raw-hex.tsx` (intentionally violates Layer A → confirms ESLint exit non-zero)
- `tests/eslint-fixtures/inline-hex.tsx` (intentionally violates Layer B)
- `tests/eslint-fixtures/physical-util.tsx` (intentionally violates RTL rule)
- `tests/eslint-fixtures/README.md` documenting why these files exist and how to run `pnpm lint tests/eslint-fixtures/` expecting failure
- `app/[locale]/admin/tokens/page.tsx` (noindex; renders every token visually — verifies color contrast at a glance, useful for design review and IS 5568 contrast spot-check)

**Concrete steps:**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* === LAYER 1 — FOUNDATION (raw HSL ramps; no semantic meaning) === */
  --color-stone-50:  oklch(0.985 0 0);
  --color-stone-100: oklch(0.965 0 0);
  --color-stone-200: oklch(0.925 0 0);
  --color-stone-300: oklch(0.870 0 0);
  --color-stone-400: oklch(0.720 0 0);
  --color-stone-500: oklch(0.560 0 0);
  --color-stone-600: oklch(0.440 0 0);
  --color-stone-700: oklch(0.340 0 0);
  --color-stone-800: oklch(0.250 0 0);
  --color-stone-900: oklch(0.165 0 0);
  --color-stone-950: oklch(0.090 0 0);

  --color-blue-50:  oklch(0.970 0.015 240);
  /* … blue-100..950 … */

  --color-sand-50:  oklch(0.975 0.010 75);
  /* … sand-100..950 — Israeli earth-tone per ARCHITECTURE §5.1 … */

  --color-olive-50: oklch(0.975 0.012 120);
  /* … olive-100..950 … */

  --spacing-1:  0.25rem;
  --spacing-2:  0.5rem;
  --spacing-section: 6rem;
  --spacing-card: 1.5rem;
  /* … */

  --radius-xs: 0.125rem;
  /* … */

  /* Hebrew fonts (from hebrew-tailwind-preset) */
  --font-hebrew:        'Heebo', 'Assistant', 'Noto Sans Hebrew', sans-serif;
  --font-hebrew-serif:  'Frank Ruhl Libre', 'David Libre', serif;
  --font-mono:          'Fira Code', 'Source Code Pro', monospace;

  --leading-hebrew-tight:    1.4;
  --leading-hebrew:          1.7;
  --leading-hebrew-relaxed:  1.9;

  /* === LAYER 2 — SEMANTIC (purpose-driven; components consume THESE) === */
  --color-primary:        var(--color-blue-700);
  --color-primary-hover:  var(--color-blue-800);
  --color-accent:         var(--color-sand-600);
  --color-surface:        var(--color-stone-50);
  --color-surface-elevated: white;
  --color-ink:            var(--color-stone-900);
  --color-ink-muted:      var(--color-stone-600);
  --color-border:         var(--color-stone-200);
  --color-success:        var(--color-olive-600);
  --color-warning:        var(--color-sand-700);
  --color-danger:         oklch(0.55 0.22 30);

  /* === LAYER 3 — COMPONENT (only where component has unique need) === */
  --button-bg-primary:   var(--color-primary);
  --button-text-primary: white;
  --card-bg:             var(--color-surface-elevated);
  --card-border:         var(--color-border);
  --hero-overlay:        oklch(0 0 0 / 0.35);
}
```

**ESLint fixture verification commands:**

```powershell
# Each must exit NON-ZERO (= ESLint caught it):
pnpm lint tests/eslint-fixtures/raw-hex.tsx       # Layer A — tailwindcss/no-arbitrary-value
pnpm lint tests/eslint-fixtures/inline-hex.tsx    # Layer B — no-restricted-syntax inline-style-hex
pnpm lint tests/eslint-fixtures/physical-util.tsx # RTL rule
```

**Skill invocations:**
- `hebrew-tailwind-preset` — primary reference for `@theme` block; copy font-stack and leading scale verbatim
- `tailwind-design-system` (wshobson) — reference for 3-layer architecture rationale (already encoded in ARCHITECTURE §5.1)

---

### 1.5 Photo-Credits Ledger (Wave 2 — parallel with 1.2, 1.6)

**Goal:** Establish the CI gate that fails build on any undocumented/orphaned/undersized image; ship `getCredit(src)` helper; allowlist Wikimedia + Unsplash + IGPO remote patterns.

**Maps to req IDs:** IMG-01, IMG-02, IMG-03, IMG-06.

**Wave:** 2 (parallel with 1.2 and 1.6).

**Inputs from prior sub-phases:**
- 1.1 must have `next.config.ts` with `images` block and remotePatterns

**Outputs:**
- `data/photo-credits.json` (empty `{}` at end of phase; populated Phase 2)
- `lib/photo-credits.ts` with `getCredit(src: string)` (throws `Error` on missing)
- `lib/photo-credits-schema.ts` (Zod schema — src, author, license enum, sourceUrl, region, slug, width≥1200, height, subjectType enum, restrictedSiteAcknowledgment optional but REQUIRED for subjectType ∈ {westernWall, holySepulchre, domeOfTheRock, bahaiGardens})
- `scripts/qa/check-credits.mjs` (the CI gate — walks `app/**/*.{tsx,mdx}` + `content/**/*.mdx` + `components/**/*.tsx`; cross-refs against ledger; probes each `public/images/**` with Sharp metadata)
- `package.json` script `qa:credits`
- `tests/photo-credits/check-credits.test.ts` (Vitest — fixtures: missing entry, orphaned file, sub-1200 width, missing restrictedSiteAcknowledgment for restricted subject — each must cause the script to exit non-zero)
- `data/photo-credits-fixtures/` (test images used by check-credits tests — must include one ≥1200px valid + one <1200px invalid; both committed; not consumed by app)

**Concrete steps:**

```ts
// lib/photo-credits-schema.ts
import { z } from 'zod';

export const License = z.enum([
  'CC0', 'CC-BY-2.0', 'CC-BY-3.0', 'CC-BY-4.0',
  'CC-BY-SA-3.0', 'CC-BY-SA-4.0',
  'PD', 'IGPO-CC', 'OWN', 'UNSPLASH', 'PEXELS',
]);

export const SubjectType = z.enum([
  'westernWall', 'holySepulchre', 'domeOfTheRock', 'bahaiGardens',
  'religious-general', 'landscape', 'cityscape', 'food', 'people', 'abstract',
]);

const RESTRICTED = new Set(['westernWall', 'holySepulchre', 'domeOfTheRock', 'bahaiGardens']);

export const CreditEntry = z.object({
  src: z.string().regex(/^\/images\/.+\.(avif|webp|jpg|jpeg|png)$/),
  author: z.string().min(1),
  license: License,
  sourceUrl: z.string().url(),
  region: z.string(),
  slug: z.string(),
  width: z.number().int().min(1200),
  height: z.number().int().min(1),
  subjectType: SubjectType,
  restrictedSiteAcknowledgment: z.string().optional(),
  licenseProof: z.string().url().optional(),
}).superRefine((v, ctx) => {
  if (RESTRICTED.has(v.subjectType) && !v.restrictedSiteAcknowledgment) {
    ctx.addIssue({
      code: 'custom',
      path: ['restrictedSiteAcknowledgment'],
      message: `restrictedSiteAcknowledgment REQUIRED for subjectType=${v.subjectType}`,
    });
  }
});

export const Ledger = z.record(z.string(), CreditEntry);
```

```js
// scripts/qa/check-credits.mjs — outline
import sharp from 'sharp';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { Ledger } from '../../lib/photo-credits-schema.js';

const errs = [];
const ledger = JSON.parse(await readFile('data/photo-credits.json', 'utf8'));
const parsed = Ledger.safeParse(ledger);
if (!parsed.success) { errs.push(...parsed.error.issues); }

// 1. Walk references
const refRegex = /<(?:Image|HeroImage|PhotoGallery)[^>]+src=["']([^"']+)["']/g;
const sourceFiles = await glob(['app/**/*.{tsx,mdx}', 'content/**/*.mdx', 'components/**/*.tsx']);
const referenced = new Set();
for (const f of sourceFiles) {
  const txt = await readFile(f, 'utf8');
  for (const m of txt.matchAll(refRegex)) referenced.add(m[1]);
}

// 2. Walk filesystem
const onDisk = new Set(await glob('public/images/**/*.{avif,webp,jpg,jpeg,png}', { dot: false }));

// 3. Cross-check
for (const src of referenced) if (!(src in ledger)) errs.push(`UNDOCUMENTED: ${src}`);
for (const file of onDisk) {
  const webPath = '/' + file.replace(/^public\//, '');
  if (!(webPath in ledger)) errs.push(`ORPHANED: ${webPath}`);
}

// 4. Probe widths
for (const [src, entry] of Object.entries(ledger)) {
  const fsPath = 'public' + src;
  try {
    const meta = await sharp(fsPath).metadata();
    if (meta.width !== entry.width) errs.push(`WIDTH MISMATCH ${src}: ledger=${entry.width} actual=${meta.width}`);
    if ((meta.width ?? 0) < 1200) errs.push(`UNDERSIZED ${src}: ${meta.width}px < 1200`);
  } catch (e) {
    errs.push(`UNREADABLE ${src}: ${e.message}`);
  }
}

if (errs.length) {
  console.error('Photo credits check FAILED:\n' + errs.map(e => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`Photo credits check OK (${Object.keys(ledger).length} entries).`);
```

**`next.config.ts` updates:**

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [320, 640, 1024, 1600],
  imageSizes: [16, 32, 64, 96, 128, 256],
  minimumCacheTTL: 31536000,
  remotePatterns: [
    { protocol: 'https', hostname: 'upload.wikimedia.org' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'images.pexels.com' },
    { protocol: 'https', hostname: 'gpophotoeng.gov.il' },
  ],
}
```

**Skill invocations:**
- `image-optimization` (aj-geddes) — confirms format ranking AVIF > WebP > JPEG
- `responsive-images` (oakoss) — confirms srcset width breakpoint set [320,640,1024,1600] is industry-standard
- `next-best-practices` — image priority pattern (deferred to 1.3 RegionHero, mentioned here so the hand-off is explicit)

---

### 1.6 Schema-Markup Baseline (Wave 2 — parallel with 1.2, 1.5)

**Goal:** Stand up `schema-dts`-typed JSON-LD generators for 11 Schema.org types, the `<JsonLd>` RSC component, the local validator script, and the `data/religious-sites.json` paired-naming dictionary.

**Maps to req IDs:** SEO-01, SEO-02, SEO-03, SEO-05 (Velite schema enforces title/desc lengths — additional enforcement in 1.8), SEO-06 (canonical generator stub), I18N-06 (Velite `lang` enum reinforced).

**Wave:** 2 (parallel with 1.2 and 1.5).

**Inputs from prior sub-phases:**
- 1.1 installed `schema-dts`, Velite, Zod

**Outputs:**
- `lib/schema/index.ts` (barrel)
- `lib/schema/types.ts` (input-prop shapes for each builder)
- `lib/schema/organization.ts` — `getOrganizationSchema(lang)` returning typed `WithContext<Organization>`
- `lib/schema/touristDestination.ts` — `buildTouristDestination(input)`
- `lib/schema/touristAttraction.ts`
- `lib/schema/religiousBuilding.ts` — handles paired-naming via `data/religious-sites.json` lookup
- `lib/schema/place.ts`
- `lib/schema/localBusiness.ts`
- `lib/schema/breadcrumb.ts` — `buildBreadcrumb(pathSegments, lang)`
- `lib/schema/faq.ts`
- `lib/schema/webSite.ts` (homepage-only; emits `potentialAction` SearchAction)
- `lib/schema/collectionPage.ts`
- `lib/schema/webPage.ts` (utility/legal pages)
- `components/JsonLd.tsx` (RSC; renders `<script type="application/ld+json">` with `dangerouslySetInnerHTML`)
- `data/religious-sites.json` (HE/EN/AR names + denomination + Wikidata IDs for ~25 sites — Temple Mount/Haram al-Sharif, Western Wall, Holy Sepulchre, Dome of the Rock, Al-Aqsa, Garden Tomb, Bahá'í Gardens, etc.)
- `scripts/qa/validate-schema.mjs` — extracts JSON-LD from built HTML and validates against `schema-dts`-typed shapes + page-profile requirements
- `lib/schema/__tests__/*.test.ts` — Vitest snapshot per builder; one test per builder asserts `inLanguage` matches input lang and `@id` includes the canonical URL

**Concrete steps:**

```tsx
// components/JsonLd.tsx
import type { Thing, WithContext } from 'schema-dts';

export function JsonLd<T extends Thing>({ schema }: { schema: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

```ts
// lib/schema/touristDestination.ts
import type { TouristDestination, WithContext } from 'schema-dts';
import { canonicalUrl } from '../seo/canonical';

interface Input {
  slug: string;
  name: string;
  description: string;
  lang: 'he' | 'en';
  lat: number;
  lng: number;
  images: string[];
  attractions: Array<{ slug: string; name: string }>;
}

export function buildTouristDestination(i: Input): WithContext<TouristDestination> {
  const url = canonicalUrl(i.slug, i.lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${url}#destination`,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    url,
    image: i.images,
    geo: { '@type': 'GeoCoordinates', latitude: i.lat, longitude: i.lng },
    includesAttraction: i.attractions.map(a => ({
      '@type': 'TouristAttraction',
      '@id': `${canonicalUrl(`${i.slug}/${a.slug}`, i.lang)}#attraction`,
      name: a.name,
    })),
  };
}
```

```ts
// lib/schema/religiousBuilding.ts — paired-naming logic
import religious from '../../data/religious-sites.json';

export function buildReligiousBuilding(input: { siteId: string; lang: 'he' | 'en'; ... }) {
  const site = religious[input.siteId];
  if (!site) throw new Error(`Unknown religious site: ${input.siteId}`);
  // For Temple Mount / Haram al-Sharif use type=Place (not ReligiousBuilding alone)
  const type = site.contested ? 'Place' : 'ReligiousBuilding';
  const name = site.contested
    ? `${site.name[input.lang]} / ${site.alternateName[input.lang]}`
    : site.name[input.lang];
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    alternateName: [site.name.he, site.name.en, site.name.ar].filter(Boolean),
    sameAs: site.wikidataId ? [`https://www.wikidata.org/wiki/${site.wikidataId}`] : undefined,
    // ... do NOT set `religion` when contested
  };
}
```

**`scripts/qa/validate-schema.mjs` outline:**

```js
// 1. Crawl built HTML in .next/ (or out/ for static export)
// 2. Extract every <script type="application/ld+json"> via cheerio/linkedom
// 3. JSON.parse; assert @context === 'https://schema.org'; @type present
// 4. Required fields per @type (from a hand-rolled table referencing schema.org spec):
//    TouristDestination -> name, description, image, geo
//    TouristAttraction  -> name, description, image
//    BreadcrumbList     -> itemListElement[] with at least 2 items
//    FAQPage            -> mainEntity[] with @type Question
//    Organization       -> name, url (only in root layout)
// 5. Assert @id uniqueness across the page
// 6. Assert inLanguage matches the page's locale (read from URL prefix)
// 7. Exit non-zero on any failure
```

**Skill invocations:**
- `next-best-practices` — JSON-LD pattern guide

---

### 1.3 Component Library (Wave 3 — after 1.2, 1.5, 1.6)

**Goal:** Ship 7 primitives + 12 travel composites with CVA variants, RTL-safe markup, A11Y-02/A11Y-06 baked in; produce `/admin/components/` playground.

**Maps to req IDs:** FND-03, FND-04, I18N-03, A11Y-02, A11Y-06.

**Wave:** 3 (depends on 1.2 tokens + 1.5 photo-credits helper for `<HeroImage>` + 1.6 `<JsonLd>` for embeds).

**Inputs from prior sub-phases:**
- 1.2 tokens published in `@theme`
- 1.5 `getCredit(src)` available
- 1.6 `<JsonLd>` available

**Outputs:**
- `components/ui/Button.tsx` (CVA variants: variant=primary|secondary|ghost, size=sm|md|lg)
- `components/ui/Card.tsx`, `Tag.tsx`, `Badge.tsx`, `Section.tsx`, `Container.tsx`, `Grid.tsx`
- `components/travel/RegionHero.tsx` (props: `creditId`, `title`, `subtitle`; renders `next/image` with `priority` + `fetchpriority="high"`)
- `components/travel/AttractionGrid.tsx`
- `components/travel/AffiliateCard.tsx` (props: `partner`, `destination`, others; renders link via partner helper; includes `data-aff-disclosed="true"`)
- `components/travel/PhotoGallery.tsx` (emits srcset 320/640/1024/1600w; requires `sizes` prop)
- `components/travel/StickyCTA.tsx`
- `components/travel/ItineraryCard.tsx`
- `components/travel/WhereToStay.tsx`
- `components/travel/TransportInfo.tsx`
- `components/travel/BestTimeToVisit.tsx`
- `components/travel/ShabbatNotice.tsx` (STATIC props-driven — fri/sat hours injected via MDX frontmatter; runtime Hebcal deferred)
- `components/travel/Price.tsx` (props: `ils`, `usd`, `eur` — all three displayed; daily-FX cached at build)
- `components/travel/AffiliateDisclosure.tsx` (FTC inline disclosure; HE+EN copy)
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx` (links to `/accessibility-statement` per current locale — A11Y-05 footer-link generator)
- `components/layout/LanguageSwitcher.tsx` (uses `next-intl`'s `Link` with `locale` prop, preserves pathname)
- `components/layout/SkipNav.tsx` (HE: "דלג לתוכן הראשי" / EN: "Skip to main content"; first focusable; targets `#main-content`)
- `components/layout/Icon.tsx` (`directional?: boolean` adds `rtl:rotate-180`)
- `components/layout/Ltr.tsx` (wraps phone numbers, dates, prices, URLs in `<bdo dir="ltr">`)
- `app/[locale]/admin/components/page.tsx` (renders every primitive + composite in default + edge-case states for both directions)
- `app/[locale]/admin/components/[component]/page.tsx` (drill-down — focused per-component view; useful for visual debugging)
- `components/__tests__/*.test.tsx` (smoke tests; assert no console.error on render; assert ARIA roles present)

**Concrete steps — CVA example:**

```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const button = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--button-bg-primary)] text-[var(--button-text-primary)] hover:bg-[var(--color-primary-hover)]',
        secondary: 'bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)]',
        ghost: 'bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface)]',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-md',
        lg: 'h-12 px-6 text-lg rounded-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}
```

> **Note on `bg-[var(...)]`**: the `tailwindcss/no-arbitrary-value` rule blocks `bg-[#abc]` but allows `bg-[var(...)]` because that's a CSS variable reference, not a raw hex. Confirm with a test fixture.

**Skill invocations:**
- `hebrew-rtl-best-practices` — primary reference for primitive + composite RTL patterns (icon mirroring, bidi number wrapping, form patterns)
- `hebrew-tailwind-preset` — confirms logical utility usage
- `next-best-practices` — confirms `priority` + `fetchpriority="high"` pattern in `<RegionHero>`
- `israeli-accessibility-compliance` — drives `<SkipNav>` Hebrew text + RTL form patterns in `<AffiliateDisclosure>` and form components

---

### 1.4 Affiliate Infrastructure (Wave 4 — after 1.3)

**Goal:** Ship 9 real + 2 stub affiliate helpers with ≥4 Vitest tests each (44 + 4 = 48 tests minimum); `data/affiliate-availability.json` + `data/affiliate-status.json`; Travelpayouts aggregator scaffolded; `<AffiliateDisclosure>` rendered in `<AffiliateCard>` per AFF-06.

**Maps to req IDs:** AFF-01, AFF-02, AFF-03, AFF-04 (completion — rule installed in 1.1 verified by fixture; production tests in 1.4), AFF-06, AFF-07, AFF-08.

**Wave:** 4 (depends on 1.3 — `<AffiliateCard>` consumes these helpers).

**Inputs from prior sub-phases:**
- 1.1 `.env.example` already lists 11 env vars
- 1.1 Vitest configured
- 1.3 `<AffiliateCard>` exists awaiting helper integration

**Outputs:**
- `lib/affiliate/booking.ts` → `bookingLink({ destination, checkin?, checkout?, label? })`
- `lib/affiliate/civitatis.ts` → `civitatisLink({ city, productId? })`
- `lib/affiliate/viator.ts` → `viatorLink({ destinationCode, productId?, mcid? })`
- `lib/affiliate/getYourGuide.ts` → `getYourGuideLink({ locationCode, productId? })`
- `lib/affiliate/rentalcars.ts` → `rentalcarsLink({ pickupLocation, dropCountry? })`
- `lib/affiliate/safetyWing.ts` → `safetyWingLink({ /* none required */ })`
- `lib/affiliate/skyscanner.ts` → `skyscannerLink({ origin, destination })`
- `lib/affiliate/hostelworld.ts` → `hostelworldLink({ city, dateFrom?, dateTo? })`
- `lib/affiliate/discoverCars.ts` → `discoverCarsLink({ city })`
- `lib/affiliate/klook.ts` → `klookLink()` throws `NoIsraelInventoryError('Klook Israel SKU coverage is thin; defer activation per Conflict D')`
- `lib/affiliate/goCity.ts` → `goCityLink()` throws `NoIsraelInventoryError('GoCity has no Israel destination as of May 2026')`
- `lib/affiliate/types.ts` — `NoIsraelInventoryError extends Error`
- `lib/affiliate/index.ts` — barrel
- `lib/affiliate/__tests__/booking.test.ts` (4 tests: AID-tagged URL OK; graceful degrade w/o AID; destination URL-encoded; Zod rejects invalid input) — same shape for all 9 real
- `lib/affiliate/__tests__/klook.test.ts` (4 tests: throws on call; throws specific error type; doesn't crash if env var present; documents intent)
- `lib/affiliate/__tests__/goCity.test.ts` (4 tests, mirror Klook)
- `data/affiliate-availability.json` — JSON Zod-shaped, 11 partners with `state ∈ {pending, applied, active, sparse, absent}`; Klook/GoCity = `absent`
- `data/affiliate-status.json` — JSON: `{ partner: { aidReceivedAt: string|null, appliedAt: string|null, lastReviewedAt: string } }` for all 11
- `lib/affiliate/availability.ts` — `affiliateAvailability(partner): State` helper; `<AffiliateCard>` hides UI if `absent`
- `.env.example` finalized with 11 entries + Travelpayouts marker, plus README pointer in `.env.example` describing fallback path
- `scripts/codemods/flip-affiliate-aid.mjs` — placeholder script that, given a partner key, reads `data/affiliate-status.json` and confirms the env var rotation didn't drift; documented but not exercised until Phase 6

**Concrete steps — booking helper:**

```ts
// lib/affiliate/booking.ts
import { z } from 'zod';

const Opts = z.object({
  destination: z.string().min(1),
  checkin: z.date().optional(),
  checkout: z.date().optional(),
  label: z.string().optional(),
});

export type BookingLinkOpts = z.infer<typeof Opts>;

export function bookingLink(opts: BookingLinkOpts): string {
  const p = Opts.parse(opts);
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID;
  const url = new URL('https://www.booking.com/searchresults.html');
  url.searchParams.set('ss', p.destination);
  if (p.checkin)  url.searchParams.set('checkin',  p.checkin.toISOString().slice(0, 10));
  if (p.checkout) url.searchParams.set('checkout', p.checkout.toISOString().slice(0, 10));
  if (aid) {
    url.searchParams.set('aid', aid);
    if (p.label) url.searchParams.set('label', p.label);
  }
  return url.toString();
}
```

```ts
// lib/affiliate/__tests__/booking.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookingLink } from '../booking';

beforeEach(() => { vi.unstubAllEnvs(); });

describe('bookingLink', () => {
  it('returns URL with aid when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_BOOKING_AID', '1234567');
    const url = bookingLink({ destination: 'Jerusalem', label: 'jerusalem-canonical' });
    expect(url).toContain('aid=1234567');
    expect(url).toContain('label=jerusalem-canonical');
  });
  it('gracefully degrades to public URL without aid', () => {
    const url = bookingLink({ destination: 'Jerusalem' });
    expect(url).not.toContain('aid=');
    expect(url).toContain('ss=Jerusalem');
  });
  it('URL-encodes the destination', () => {
    const url = bookingLink({ destination: 'Tel Aviv' });
    expect(url).toContain('ss=Tel+Aviv');
  });
  it('rejects empty destination via Zod', () => {
    expect(() => bookingLink({ destination: '' } as any)).toThrow();
  });
});
```

```ts
// lib/affiliate/klook.ts
export class NoIsraelInventoryError extends Error {}
export function klookLink(): never {
  throw new NoIsraelInventoryError(
    'klookLink() is stubbed: Klook Israel SKU coverage is thin (<10 tours). ' +
    'Per Conflict D resolution, this helper is intentionally non-functional. ' +
    'Re-evaluate quarterly via data/affiliate-status.json.'
  );
}
```

```json
// data/affiliate-availability.json (initial)
{
  "booking":      { "state": "pending", "regions": [],          "notes": "CJ vs Awin to be confirmed in Phase 1.4 application" },
  "civitatis":    { "state": "pending", "regions": [],          "notes": "Direct program; EUR payouts" },
  "viator":       { "state": "pending", "regions": [],          "notes": "Tripadvisor; PID+MCID" },
  "getYourGuide": { "state": "pending", "regions": [],          "notes": "Direct or Awin merchant 18925" },
  "rentalcars":   { "state": "pending", "regions": [],          "notes": "Booking subsidiary; CJ or Awin" },
  "safetyWing":   { "state": "pending", "regions": [],          "notes": "Direct; Nomad Insurance" },
  "skyscanner":   { "state": "pending", "regions": [],          "notes": "Impact; 5K mo visitor threshold" },
  "hostelworld":  { "state": "pending", "regions": [],          "notes": "Partnerize; 18-22% commission" },
  "discoverCars": { "state": "pending", "regions": [],          "notes": "Direct or Travelpayouts; 365-day cookie" },
  "klook":        { "state": "absent",  "regions": [],          "notes": "Conflict D — thin Israel SKU" },
  "goCity":       { "state": "absent",  "regions": [],          "notes": "Conflict D — no Israel destination as of May 2026" }
}
```

**Skill invocations:**
- `affiliate-marketing` (kostja94) — helper pattern + FTC disclosure positioning
- `affiliate-page-generator` (kostja94) — template patterns for inline disclosure inside `<AffiliateCard>`

---

### 1.7 Quality Scoring Profiles (Wave 5 — parallel with 1.8, after 1.4)

**Goal:** Materialize the 5 profiles with weight matrices; produce profile-selector logic for the audit dashboard (`detectProfile(mdxFrontmatter): Profile`).

**Maps to req IDs:** FND-05.

**Wave:** 5 (parallel with 1.8; both depend on 1.4 completion because profiles reference affiliate-coverage rules).

**Inputs from prior sub-phases:**
- 1.4 affiliate helpers shipped (profiles reference partner availability)
- 1.6 schema generator names defined (profiles reference required schema types)

**Outputs:**
- `scripts/audit/profiles/region_canonical.ts` — exports `RegionCanonical: ProfileSpec`
- `scripts/audit/profiles/sub_destination.ts`
- `scripts/audit/profiles/guide_or_winery.ts`
- `scripts/audit/profiles/utility.ts`
- `scripts/audit/profiles/hub.ts`
- `scripts/audit/profiles/types.ts` — `ProfileSpec = { id, weights, minLength, requiresSchema, requiresAffiliates, scoreCutoff }`
- `scripts/audit/profiles/detect.ts` — `detectProfile(frontmatter): ProfileId` reads Velite-output frontmatter and picks one
- `scripts/audit/profiles/__tests__/*.test.ts` — Vitest: given sample frontmatter, returns expected profile; given a TouristDestination page with 0 affiliates, REGION_CANONICAL scores it below threshold

**Concrete steps:**

```ts
// scripts/audit/profiles/types.ts
export type ProfileId = 'REGION_CANONICAL' | 'SUB_DESTINATION' | 'GUIDE_OR_WINERY' | 'UTILITY' | 'HUB';

export interface RuleWeight {
  rule: string;        // AUD-001..AUD-034
  weight: number;      // 0..100 contribution
  required: boolean;   // hard-fail if false
}

export interface ProfileSpec {
  id: ProfileId;
  minWordCount: number;       // 0 if not enforced
  minAffiliates: number;
  requiredSchemaTypes: readonly string[];
  weights: readonly RuleWeight[];
  scoreCutoffPilot: number;       // ≥85 pilot
  scoreCutoffReplicated: number;  // ≥80 replicated
}
```

```ts
// scripts/audit/profiles/region_canonical.ts
import type { ProfileSpec } from './types';

export const RegionCanonical: ProfileSpec = {
  id: 'REGION_CANONICAL',
  minWordCount: 1500,
  minAffiliates: 5,
  requiredSchemaTypes: ['TouristDestination', 'BreadcrumbList', 'FAQPage'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    { rule: 'AUD-001', weight: 5,  required: true  },  // no raw hex
    { rule: 'AUD-002', weight: 5,  required: true  },  // no raw partner URL
    { rule: 'AUD-003', weight: 8,  required: true  },  // documented image
    { rule: 'AUD-004', weight: 5,  required: true  },  // image width
    { rule: 'AUD-005', weight: 3,  required: false },  // srcset
    { rule: 'AUD-006', weight: 3,  required: false },  // sub-destination H1 cannibalize
    { rule: 'AUD-007', weight: 3,  required: false },  // HE/EN ratio
    { rule: 'AUD-008', weight: 5,  required: true  },  // pre-hydration HTML
    { rule: 'AUD-009', weight: 5,  required: true  },  // FTC disclosure
    // … all 34 rules; weights sum to 100 …
  ],
};
```

**`detectProfile` heuristic (ARCHITECTURE §6.2 frontmatter shape):**

```ts
// scripts/audit/profiles/detect.ts
export function detectProfile(fm: { collection: string; isHub?: boolean; isUtility?: boolean }): ProfileId {
  if (fm.isUtility) return 'UTILITY';
  if (fm.isHub) return 'HUB';
  if (fm.collection === 'regions') return 'REGION_CANONICAL';
  if (fm.collection === 'subDestinations') return 'SUB_DESTINATION';
  if (fm.collection === 'guides') return 'GUIDE_OR_WINERY';
  throw new Error(`Cannot detect profile for collection=${fm.collection}`);
}
```

**Skill invocations:**
- None directly; pure project policy file

---

### 1.8 SEO Config (Wave 5 — parallel with 1.7, after 1.4)

**Goal:** Dynamic `app/sitemap.ts` (only built locales), `app/robots.ts` (disallow `/admin/`, `/api/`), hreflang generator (bidirectional + `x-default`), canonical generator (self-referential per locale), 301 redirect map in `middleware.ts`, footer accessibility-statement link generator (A11Y-05 infra).

**Maps to req IDs:** FND-06, I18N-05, SEO-04 (paired-naming AUD rules wire-in — fully enforced from 1.9), SEO-05 (metadata API setup), SEO-06, A11Y-01 (verified — `<html lang dir>` rendered correctly because layout sets it from layout, here we test that `pnpm build` output preserves it), A11Y-05 (footer link generator — actual rendering is in 1.3 Footer, but the per-locale slug for the statement page is locked here).

**Wave:** 5 (parallel with 1.7).

**Inputs from prior sub-phases:**
- 1.1 `i18n-config.ts` `locales` array (single source of truth)
- 1.6 canonical URL helper exists in stub form (`lib/seo/canonical.ts`)

**Outputs:**
- `app/sitemap.ts` — iterates `locales` (NOT `allowedLangs`); emits XML
- `app/robots.ts` — `User-agent: *`, `Disallow: /admin/`, `Disallow: /api/`, `Sitemap: https://visitisrael.site/sitemap.xml`
- `lib/seo/canonical.ts` — `canonicalUrl(slug, lang): string` (self-referential per locale; never cross-locale)
- `lib/seo/hreflang.ts` — `hreflangAlternates(slug): Array<{ hreflang, href }>` emits both `he` and `en` + `x-default` to EN; only built locales
- `lib/seo/metadata.ts` — `generateMetadataFor(slug, lang): Metadata` (uses `next/metadata` Metadata type; sets title/description from Velite frontmatter; sets `alternates.canonical` + `alternates.languages`)
- `middleware.ts` updated — 301 redirect map (`const REDIRECTS: Record<string,string> = { '/old-jerusalem-page': '/jerusalem' }`); falls through to next-intl middleware
- `lib/seo/__tests__/canonical.test.ts` — asserts HE slug → `https://visitisrael.site/jerusalem`; EN → `https://visitisrael.site/en/jerusalem`; never the other way
- `lib/seo/__tests__/hreflang.test.ts` — asserts FR not present (registered locales only); `x-default` exactly once
- `lib/seo/__tests__/sitemap.test.ts` — asserts only `he` and `en` paths emitted

**Concrete steps:**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '../i18n-config';

const ORIGIN = 'https://visitisrael.site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // At Phase 1 end, content is empty; Phase 2+ populates from Velite output.
  // Generator MUST iterate locales (built) NOT allowedLangs (filesystem-allowed).
  const staticPaths = ['', '/about', '/contact', '/privacy', '/affiliate-disclosure', '/accessibility-statement'];
  const urls: MetadataRoute.Sitemap = [];
  for (const lang of locales) {
    for (const p of staticPaths) {
      const path = lang === defaultLocale ? p : `/${lang}${p}`;
      urls.push({
        url: `${ORIGIN}${path || '/'}`,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [
              l === defaultLocale ? 'he' : l,
              `${ORIGIN}${l === defaultLocale ? p : `/${l}${p}`}` || `${ORIGIN}/`,
            ])
          ),
        },
      });
    }
  }
  return urls;
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: ['/admin/', '/api/'] }],
    sitemap: 'https://visitisrael.site/sitemap.xml',
  };
}
```

```ts
// lib/seo/canonical.ts
import { defaultLocale, locales } from '../../i18n-config';
const ORIGIN = 'https://visitisrael.site';

export function canonicalUrl(slug: string, lang: typeof locales[number]): string {
  const path = lang === defaultLocale ? `/${slug}` : `/${lang}/${slug}`;
  return `${ORIGIN}${path}`.replace(/\/$/, '');
}
```

```ts
// lib/seo/hreflang.ts
import { canonicalUrl } from './canonical';
import { locales, defaultLocale } from '../../i18n-config';

export function hreflangAlternates(slug: string) {
  const out = locales.map(l => ({ hreflang: l, href: canonicalUrl(slug, l) }));
  out.push({ hreflang: 'x-default', href: canonicalUrl(slug, 'en') });
  return out;
}
```

**Skill invocations:**
- `next-best-practices` — metadata API guidance (`generateMetadata`, `alternates.canonical`, `alternates.languages`)

---

### 1.11 NER Mention Detection (Wave 6 — after 1.7, 1.8)

**Goal:** Build the entity dictionary + regex scanner that surfaces unmonetized mentions (e.g., MDX content mentions "Abraham Hostel" without an `<AffiliateCard partner="hostelworld">` link nearby) to the audit dashboard. Phase 1 ships scaffolding + seed dictionary; Phase 2 MDX content exercises it.

**Maps to req IDs:** FND-07.

**Wave:** 6 (needs 1.7 profiles to know which entity-class mentions matter per profile; needs 1.8 canonical-URL helper to suggest the correct sub-destination link).

**Inputs from prior sub-phases:**
- 1.7 profile definitions (what entity classes each profile expects)
- 1.8 canonical generator (used to suggest internal-link targets when a mention is detected)

**Outputs:**
- `data/entity-dict.json` — seed dictionary with classes: `tour | hotel | restaurant | museum | transport | religious_site` and ~30 starter entities each (Abraham Hostel, Mahane Yehuda Market, Yad Vashem, …)
- `lib/ner/detector.ts` — `detectMentions(mdxBody: string, lang: 'he' | 'en'): Mention[]`
- `lib/ner/types.ts` — `Mention = { entity: string, class: EntityClass, span: [start, end], suggestedAction: 'add-affiliate'|'add-internal-link'|'no-action' }`
- `lib/ner/__tests__/detector.test.ts` — Vitest: given sample MDX mentioning "Abraham Hostel" without `<AffiliateCard partner="hostelworld">` nearby → emits `{ class: 'hotel', suggestedAction: 'add-affiliate' }`
- `scripts/audit/scan-ner.mjs` — integration script that runs detector across all built Velite output and writes `data/ner-results.json`; consumed by audit dashboard

**Concrete steps:**

```json
// data/entity-dict.json (seed)
{
  "tour":            ["Abraham Tours", "Bein Harim", "Tourist Israel"],
  "hotel":           ["Abraham Hostel", "Dan Tel Aviv", "King David Hotel", "Mamilla Hotel"],
  "restaurant":      ["Machneyuda", "Eucalyptus", "Adom"],
  "museum":          ["Yad Vashem", "Israel Museum", "Tower of David Museum"],
  "transport":       ["Egged", "Israel Railways", "Ben Gurion Airport", "Ramon Airport"],
  "religious_site":  ["Western Wall", "Holy Sepulchre", "Dome of the Rock", "Mahane Yehuda", "Mount of Olives"]
}
```

```ts
// lib/ner/detector.ts (outline)
import dict from '../../data/entity-dict.json';

export function detectMentions(body: string, lang: 'he' | 'en') {
  const found: Mention[] = [];
  for (const [klass, entities] of Object.entries(dict)) {
    for (const ent of entities) {
      const re = new RegExp(`\\b${escapeRegex(ent)}\\b`, 'gi');
      for (const m of body.matchAll(re)) {
        const span: [number, number] = [m.index!, m.index! + ent.length];
        // Heuristic: scan ±300 chars for <AffiliateCard or <Link> referencing this entity
        const ctx = body.slice(Math.max(0, span[0] - 300), span[1] + 300);
        const hasAffiliate = /<AffiliateCard\s+partner=/.test(ctx);
        const hasInternalLink = /<Link\s+href=["'][^"']+["']/.test(ctx);
        const suggestedAction = (klass === 'hotel' || klass === 'tour') && !hasAffiliate
          ? 'add-affiliate'
          : !hasInternalLink ? 'add-internal-link' : 'no-action';
        found.push({ entity: ent, class: klass as EntityClass, span, suggestedAction });
      }
    }
  }
  return found;
}
```

**Skill invocations:** none — this is custom logic

---

### 1.9 Audit Dashboard (Wave 7 — after 1.11)

**Goal:** Hybrid build-time scanner + RSC route at `/admin/audit/` running all 34 rules; per-page scoring using the 5 profiles; basic-auth middleware; `AUD-05` quality-gate report generator.

**Maps to req IDs:** AUD-01, AUD-02, A11Y-06 (form-pattern audit baked into dashboard rule), A11Y-07 (overlay-presence audit — should always be 0), A11Y-08 (axe-core results merged into dashboard), AUD-04 (verification — pre-commit was installed in 1.1; here we test it fires on a violation fixture), AUD-05.

**Wave:** 7 (depends on 1.7 profiles + 1.8 SEO config + 1.11 NER).

**Inputs from prior sub-phases:**
- 1.7 profile definitions and `detectProfile` heuristic
- 1.8 canonical + hreflang generators (audit verifies their output appears in built HTML)
- 1.11 NER results

**Outputs:**
- `scripts/audit/run.mjs` — orchestrator. Walks `.next/server/app/**/*.html` (or static export `out/`); applies rules AUD-001..AUD-034; writes `data/audit-results.json` and `data/audit-results.html` (the second is consumed by RSC route as fallback if JSON parsing fails)
- `scripts/audit/rules/AUD-001.mjs` … `AUD-034.mjs` — one file per rule, each exports `{ id, severity, description, scan(html, frontmatter): Issue[] }`
- `scripts/audit/quality-gate.mjs` — generates `data/quality-gate-pass.md` or `data/quality-gate-failure.md` based on the 10 Quality Gate criteria from ROADMAP.md
- `app/[locale]/admin/audit/page.tsx` — RSC reads `data/audit-results.json`; renders sortable/filterable HTML table
- `app/[locale]/admin/audit/[slug]/page.tsx` — drill-down per-page failures
- `app/[locale]/admin/audit/quality-gate/page.tsx` — runs `pnpm qa:quality-gate` server-side and renders the report
- `middleware.ts` extended — basic-auth on `/admin/*` matcher
- `lib/auth/basic.ts` — `verifyBasicAuth(req)` helper reading `ADMIN_USER` / `ADMIN_PASS` env vars
- `package.json` scripts: `qa:audit`, `qa:quality-gate`
- `scripts/audit/__tests__/rules.test.ts` — Vitest: feed each rule a known-failing HTML fixture and assert it returns an Issue
- `tests/audit-fixtures/violations.html` — synthetic HTML containing one violation per rule (used by rules test suite + AUD-04 verification of pre-commit hook)
- `app/api/admin/audit/route.ts` — `GET` returns the JSON; useful for external monitoring

**Concrete steps:**

```js
// scripts/audit/run.mjs (orchestrator outline)
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import { rules } from './rules/index.mjs';
import { detectProfile, profiles } from './profiles/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';

const htmlFiles = await glob('.next/server/app/**/*.html');
const results = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const $ = cheerio.load(html);
  const slug = inferSlug(file);
  const lang = inferLang(file);
  const fm = await loadFrontmatter(slug, lang);  // from Velite output
  const profile = detectProfile(fm);
  const spec = profiles[profile];

  const issues = [];
  for (const rule of rules) {
    const ruleIssues = await rule.scan(html, $, fm, lang);
    issues.push(...ruleIssues);
  }

  const score = computeScore(issues, spec);
  results.push({ slug, lang, profile, score, issues });
}

await writeFile('data/audit-results.json', JSON.stringify(results, null, 2));
```

**Per-rule example — AUD-017 (Wailing Wall regex):**

```js
// scripts/audit/rules/AUD-017.mjs
export default {
  id: 'AUD-017',
  severity: 'major',
  description: 'No "Wailing Wall" — use "Western Wall" or pair-name with "Kotel".',
  scan(html /* , $, fm, lang */) {
    if (/\bWailing Wall\b/.test(html)) {
      return [{ rule: 'AUD-017', severity: 'major', message: 'Found "Wailing Wall" — use "Western Wall".' }];
    }
    return [];
  },
};
```

**Quality Gate generator (`scripts/audit/quality-gate.mjs`):**

```js
// Reads:
//   data/audit-results.json    (from qa:audit)
//   data/lighthouse-results.json (from 1.10 lhci)
// Evaluates the 10 Quality Gate criteria from ROADMAP.md
// Writes data/quality-gate-pass.md OR data/quality-gate-failure.md
// Exits non-zero if failure (so CI blocks Phase 3)
```

**Basic-auth middleware:**

```ts
// middleware.ts (extended)
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

const intl = createMiddleware({ locales, defaultLocale, localePrefix: 'as-needed', localeDetection: true });

const REDIRECTS: Record<string, string> = {
  // '/old-jerusalem': '/jerusalem',
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. 301 redirects
  if (REDIRECTS[path]) {
    return NextResponse.redirect(new URL(REDIRECTS[path], req.url), 301);
  }

  // 2. Admin basic-auth
  if (path.startsWith('/admin')) {
    const auth = req.headers.get('authorization');
    const expected = `Basic ${Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString('base64')}`;
    if (auth !== expected) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }
  }

  // 3. i18n
  return intl(req);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\..*).*)'],
};
```

**Skill invocations:**
- `israeli-accessibility-compliance` — `scripts/audit_a11y.py` integration: a wrapper script invokes the skill's Python audit, parses the output, and merges into `data/audit-results.json` as severity=critical entries
- `accessibility` (addyosmani) — generic WCAG cross-check rules (informs which axe-core rule families to whitelist in the audit script)

---

### 1.10 Lighthouse CI Gate (Wave 8 — after 1.9)

**Goal:** Ship `@lhci/cli` with 3-run-median config + assertions; GitHub Action that blocks PR merge on threshold failure; `data/lighthouse-results.json` persisted; basic 2-page sample at end of Phase 1.

**Maps to req IDs:** AUD-03, AUD-05 (Lighthouse runs feed into Quality Gate report generator).

**Wave:** 8 (depends on 1.9 — dashboard merges Lighthouse JSON into audit view; depends on 1.1+1.2+1.3 — needs a deployable build).

**Inputs from prior sub-phases:**
- 1.1 buildable app (`pnpm build && pnpm start` works)
- 1.9 dashboard ready to consume Lighthouse JSON

**Outputs:**
- `.lighthouserc.cjs` (the canonical config from STACK §5.2 verbatim)
- `.github/workflows/lighthouse.yml` (GitHub Actions invoking `treosh/lighthouse-ci-action`)
- `data/lighthouse-results.json` (committed empty `{}`; populated by CI runs)
- `package.json` script `lhci`
- `scripts/qa/regression-test.mjs` — verification harness: intentionally injects a perf regression (adds 5MB image to a sample page), runs lhci, expects exit non-zero; reverts the regression. This is the Nyquist proof that the gate fires.
- `app/[locale]/admin/lighthouse/page.tsx` — RSC view of latest median scores per page
- `scripts/audit_a11y_wrapper.mjs` — invokes `python3 .agents/skills/israeli-accessibility-compliance/scripts/audit_a11y.py --url $BASE_URL` and writes results to `data/a11y-il-results.json`; called from CI after deploy preview is up

**Concrete steps:**

```js
// .lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',       // HE homepage
        'http://localhost:3000/en',     // EN homepage
        // Phase 2 adds region pages
      ],
      numberOfRuns: 3,
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      settings: {
        chromeFlags: '--no-sandbox',
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
        throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
      },
    },
    assert: {
      assertions: {
        'categories:performance':    ['error', { minScore: 0.90, aggregationMethod: 'median' }],
        'categories:accessibility':  ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:seo':            ['error', { minScore: 1.00, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};
```

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on:
  pull_request: { branches: [main] }
  push: { branches: [main] }
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: ./.lighthouserc.cjs
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**Regression-test harness (Nyquist proof of gate-firing):**

```js
// scripts/qa/regression-test.mjs (runs once during 1.10 sub-phase to verify the gate fires)
// 1. Save current state of public/images/regression-test-hero.jpg
// 2. Replace with a deliberately massive (5MB) version
// 3. pnpm build && pnpm exec lhci collect && pnpm exec lhci assert
// 4. Expect exit code != 0
// 5. Restore original image
// 6. Print PASS if step-4 was non-zero, else FAIL
```

**Skill invocations:**
- `performance-lighthouse-runner` — present but stub; STACK §5.2 is authoritative
- `israeli-accessibility-compliance` — `scripts/audit_a11y.py` invoked from CI wrapper as supplementary IS-5568 check beyond Lighthouse a11y

---

## 2. Wave Assignments

| Wave | Sub-phases | Why they're parallelizable | Approx min completion order |
|------|-----------|----------------------------|------------------------------|
| **1** | 1.1 Scaffold | Root of DAG; nothing else compiles without it | 1.1 alone |
| **2** | 1.2 Design tokens, 1.5 Photo ledger, 1.6 Schema baseline | Disjoint file trees: tokens touch `app/globals.css` + `tailwind.config.ts`; ledger touches `data/photo-credits.json` + `lib/photo-credits.ts` + `scripts/qa/check-credits.mjs`; schema touches `lib/schema/` + `data/religious-sites.json` + `scripts/qa/validate-schema.mjs` | 1.2 ‖ 1.5 ‖ 1.6 (all start once 1.1 finishes) |
| **3** | 1.3 Component lib | Depends on 1.2 (tokens) + 1.5 (getCredit helper) + 1.6 (`<JsonLd>` component) | 1.3 alone (sequential after Wave 2) |
| **4** | 1.4 Affiliate infra | Depends on 1.3 (`<AffiliateCard>` exists) | 1.4 alone |
| **5** | 1.7 Quality profiles, 1.8 SEO config | Disjoint: 1.7 touches `scripts/audit/profiles/`; 1.8 touches `app/sitemap.ts`, `app/robots.ts`, `lib/seo/`, `middleware.ts` | 1.7 ‖ 1.8 |
| **6** | 1.11 NER detection | Depends on 1.7 profiles + 1.8 canonical helper | 1.11 alone |
| **7** | 1.9 Audit dashboard | Depends on 1.7 + 1.8 + 1.11; consumes their outputs | 1.9 alone |
| **8** | 1.10 Lighthouse CI gate | Depends on 1.9 (dashboard merges Lighthouse JSON) and a fully deployable build | 1.10 alone |

**Effective wall-clock waves: 8 sequential gates with 2 internal parallel bundles (Wave 2 and Wave 5).** With `parallelization=true` and 3 concurrent executors:
- Wave 2 saves ~2 sub-phase durations
- Wave 5 saves ~1 sub-phase duration
- Total: ~8 sub-phase units of wall-clock time vs 11 sequential

---

## 3. Validation Architecture (Nyquist dim 8 — REQUIRED)

### Test Framework

| Property | Value |
|----------|-------|
| Framework | **Vitest 2.x** (TS/JS) + **Playwright 1.48+** (E2E, light usage in 2.6) + **Python 3.9+** for `audit_a11y.py` |
| Config file | `vitest.config.ts` (created in 1.1); `playwright.config.ts` deferred to Phase 2.6 |
| Quick run command | `pnpm test` (runs all Vitest suites) |
| Per-area quick run | `pnpm test lib/affiliate` ; `pnpm test lib/schema` ; `pnpm test lib/seo` ; `pnpm test components` |
| Full suite command | `pnpm test && pnpm qa:credits && pnpm qa:schema && pnpm qa:audit && pnpm lhci` |
| Lint gate | `pnpm lint && pnpm typecheck` |
| Phase gate (hard) | `pnpm qa:quality-gate` writes pass/fail to `data/quality-gate-{pass,failure}.md` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test type | Automated command | File exists at end of phase? |
|--------|----------|-----------|-------------------|------------------------------|
| FND-01 | `pnpm dev` boots Next.js 15.5 on `localhost:3000`; HE at `/`, EN at `/en/` | smoke | `pnpm build && curl -sI http://localhost:3000/ \| grep '200'` + `curl -sI http://localhost:3000/en \| grep '200'` | ✅ smoke command runnable end of 1.1 |
| FND-02 | 3-layer tokens render; ESLint fires on raw hex | unit + lint | `pnpm lint tests/eslint-fixtures/raw-hex.tsx` (expect non-zero) ; `pnpm lint tests/eslint-fixtures/inline-hex.tsx` (expect non-zero) | ✅ end of 1.2 |
| FND-03 | All 7 primitives + 12 composites render without console error in both directions | smoke | `pnpm test components -- --run` | ✅ end of 1.3 |
| FND-04 | `/admin/components/` route renders all primitives/composites | E2E-lite | `pnpm build && pnpm start &` then `curl -s -u admin:pass http://localhost:3000/admin/components \| grep -E "Button\|Card\|RegionHero"` | ✅ end of 1.3 |
| FND-05 | 5 profiles defined; `detectProfile` returns correct ID per fixture | unit | `pnpm test scripts/audit/profiles` | ✅ end of 1.7 |
| FND-06 | sitemap iterates `locales` only; robots disallows `/admin/`+`/api/`; canonical self-ref; hreflang reciprocal | unit | `pnpm test lib/seo` | ✅ end of 1.8 |
| FND-07 | NER detector flags "Abraham Hostel" mention without `<AffiliateCard partner="hostelworld">` | unit | `pnpm test lib/ner` | ✅ end of 1.11 |
| FND-08 | Plausible script injected in layout when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set | smoke | `pnpm build && grep -r 'plausible.io' .next/ \| head -1` | ✅ end of 1.1 |
| AFF-01 | 9 real helpers exist and return AID-tagged URL when env present, public URL otherwise | unit | `pnpm test lib/affiliate -- --run --coverage` ; coverage report shows 100% of exports exercised | ✅ end of 1.4 |
| AFF-02 | klookLink + goCityLink throw `NoIsraelInventoryError` | unit | `pnpm test lib/affiliate/__tests__/klook.test.ts lib/affiliate/__tests__/goCity.test.ts` | ✅ end of 1.4 |
| AFF-03 | ≥44 helper tests + ≥4 stub-throw tests | unit | `pnpm test lib/affiliate -- --run --reporter=verbose \| grep -c '✓'` (expect ≥48) | ✅ end of 1.4 |
| AFF-04 | ESLint rule fires on raw `<a href="https://www.booking.com/...">` outside `lib/affiliate/**` | lint | `pnpm lint tests/eslint-fixtures/raw-partner-url.tsx` (expect non-zero) ; same file inside `lib/affiliate/sample.ts` exits zero | ✅ end of 1.1 (rule installed) + 1.4 (verified via fixture) |
| AFF-05 | ESLint rule fires on `bg-[#abc]` + `style={{color:'#fff'}}` + `ml-4` | lint | 3× fixtures all exit non-zero | ✅ end of 1.2 |
| AFF-06 | `<AffiliateCard>` renders disclosure within 1 viewport-height; testable via DOM order test | unit | `pnpm test components/travel/AffiliateCard` — assert disclosure DOM-precedes affiliate `<a>` | ✅ end of 1.4 |
| AFF-07 | `data/affiliate-status.json` parses against Zod schema; all 11 partners present | unit | `pnpm test data/affiliate-status -- --run` (load + validate) | ✅ end of 1.4 |
| AFF-08 | `.env.example` contains Travelpayouts comment block | smoke | `grep -i travelpayouts .env.example` | ✅ end of 1.4 |
| I18N-01 | `localePrefix:'as-needed'`; `/jerusalem/` = HE; `/en/jerusalem/` = EN | smoke | `pnpm build && curl -sI http://localhost:3000/ \| grep 'Content-Language: he'` ; `curl -sI http://localhost:3000/en \| grep 'Content-Language: en'` | ✅ end of 1.1 (no content yet, but headers should be correct on layout-only page) |
| I18N-02 | `i18n-config.ts` exports `locales=['he','en']` + `allowedLangs=['he','en','fr']` | unit | `pnpm test i18n-config.test.ts` | ✅ end of 1.1 |
| I18N-03 | No physical directional utilities in `components/**`; logical only | lint | `pnpm lint components/` (must exit zero) ; `pnpm lint tests/eslint-fixtures/physical-util.tsx` (must exit non-zero) | ✅ end of 1.2 (rule) + 1.3 (clean components) |
| I18N-04 | `<html lang="he" dir="rtl">` at `/`; `<html lang="en" dir="ltr">` at `/en` | smoke | `pnpm build && grep 'html lang="he" dir="rtl"' .next/server/app/index.html` ; `grep 'html lang="en" dir="ltr"' .next/server/app/en/index.html` | ✅ end of 1.1 |
| I18N-05 | Hreflang generator emits exactly 3 alternates (`he`,`en`,`x-default`) per page; FR absent | unit | `pnpm test lib/seo/__tests__/hreflang.test.ts` | ✅ end of 1.8 |
| I18N-06 | Velite config enforces `lang: z.enum(['he','en','fr'])`; build fails on `lang:'ru'` fixture | unit | `pnpm test velite-config -- --run` (loads invalid frontmatter fixture, expects parse error) | ✅ end of 1.1 |
| A11Y-01 | `pnpm build` output preserves `lang` and `dir` on `<html>` | smoke | `grep -E 'html lang=.{he\|en}. dir=.{rtl\|ltr}.' .next/server/app/**/*.html \| wc -l` (expect ≥ page count) | ✅ end of 1.1 |
| A11Y-02 | `<SkipNav>` renders Hebrew text on HE pages, English on EN pages; is the first focusable | unit + smoke | `pnpm test components/layout/SkipNav` ; Playwright: `await page.keyboard.press('Tab'); expect(await page.activeElement.textContent()).toMatch(/דלג\|Skip/)` (Playwright check deferred to 2.6) | ✅ end of 1.3 (Vitest); E2E in 2.6 |
| A11Y-06 | Form components emit `aria-required`, `aria-describedby`, `role="alert"` error siblings | unit | `pnpm test components` ; specifically `components/__tests__/form-a11y.test.tsx` | ✅ end of 1.3 |
| A11Y-07 | ZERO overlay scripts (`accessibe.com\|userway.org\|equalweb.com\|audioeye.com`) in built HTML | smoke | `! grep -rE '(accessibe\.com\|userway\.org\|equalweb\.com\|audioeye\.com)' .next/` (must exit zero — no matches) | ✅ end of 1.1 + every subsequent build |
| A11Y-08 | Lighthouse a11y ≥0.95 3-run-median ; axe-core CI gate green ; `audit_a11y.py` passes | E2E | `pnpm lhci` (asserts a11y≥0.95) ; `python3 .agents/skills/israeli-accessibility-compliance/scripts/audit_a11y.py --url http://localhost:3000` | ✅ end of 1.10 |
| SEO-01 | `<JsonLd>` renders `<script type="application/ld+json">`; `Organization` schema present in layout output | unit + smoke | `pnpm test components/JsonLd` ; `grep -c 'application/ld+json' .next/server/app/**/*.html` (expect ≥ page count) | ✅ end of 1.6 |
| SEO-02 | 11 schema builders exported from `lib/schema/index.ts`; snapshot tests for each | unit | `pnpm test lib/schema` | ✅ end of 1.6 |
| SEO-03 | `scripts/qa/validate-schema.mjs` exits non-zero on malformed JSON-LD fixture | unit + smoke | `pnpm qa:schema` (against synthetic broken fixture) → expect exit non-zero ; `pnpm qa:schema` (against valid build) → expect exit zero | ✅ end of 1.6 |
| SEO-05 | Velite collection asserts `title ≤ 70` chars and `description ∈ [120, 160]` chars | unit | `pnpm test velite-config` (load over-long-title fixture, expect parse error) | ✅ end of 1.1 (Velite schema); plus `lib/seo/metadata.ts` test in 1.8 |
| SEO-06 | `canonicalUrl(slug, 'he')` ≠ `canonicalUrl(slug, 'en')` ; canonical never cross-locale | unit | `pnpm test lib/seo/__tests__/canonical.test.ts` | ✅ end of 1.8 |
| IMG-01 | `data/photo-credits.json` parses against Zod schema | unit | `pnpm test lib/photo-credits-schema` | ✅ end of 1.5 |
| IMG-02 | `pnpm qa:credits` exits non-zero on (a) missing ledger entry (b) orphaned file (c) <1200px width | unit + smoke | `pnpm test scripts/qa/check-credits` ; manual: stage an undocumented image, `pnpm lint-staged` should fail | ✅ end of 1.5 |
| IMG-03 | `next/image` `deviceSizes`=[320,640,1024,1600]; formats=AVIF+WebP | unit | `pnpm test next-config.test.ts` (parses next.config.ts, asserts shape) | ✅ end of 1.5 |
| IMG-06 | Ledger `license` enum allows only documented sources; rejects "STOLEN" | unit | `pnpm test lib/photo-credits-schema` (license enum check) | ✅ end of 1.5 |
| AUD-01 | `/admin/audit/` route renders all 34 rules executed against sample build | smoke + E2E-lite | `pnpm qa:audit && curl -s -u admin:pass http://localhost:3000/admin/audit \| grep -c 'AUD-0'` (expect ≥34) | ✅ end of 1.9 |
| AUD-02 | Audit JSON includes per-page profile + score field | unit | `pnpm test scripts/audit -- --run` ; `jq '.[0].profile, .[0].score' data/audit-results.json` returns both | ✅ end of 1.9 |
| AUD-03 | `pnpm lhci` fails when one URL drops below threshold (proven via regression test) | smoke (intentional regression) | `pnpm exec node scripts/qa/regression-test.mjs` (intentionally adds 5MB image, runs lhci, expects fail, reverts) | ✅ end of 1.10 |
| AUD-04 | Pre-commit hook runs ESLint + tsc + schema + credits on staged files | smoke | Stage an undocumented image + run `git commit -m test --dry-run` via hook simulator: `pnpm lint-staged` against staged fixture → expect non-zero | ✅ end of 1.1 (hook) + 1.5 (credits gate) + 1.6 (schema gate) |
| AUD-05 | `pnpm qa:quality-gate` writes `data/quality-gate-{pass,failure}.md` | smoke | Run against synthetic green build → expect `data/quality-gate-pass.md` created ; against synthetic failing build → expect `data/quality-gate-failure.md` | ✅ end of 1.9 |

### Sampling Rate

- **Per task commit:** `pnpm lint-staged` (ESLint + Prettier + schema + credits on staged files only — sub-second)
- **Per sub-phase merge:** `pnpm test && pnpm lint && pnpm typecheck` (full Vitest + ESLint + TS check)
- **Per wave merge:** Full suite — `pnpm test && pnpm qa:credits && pnpm qa:schema && pnpm qa:audit`
- **Phase gate (end of 1.10):** `pnpm build && pnpm lhci && pnpm qa:quality-gate` — must produce `data/quality-gate-pass.md` (or HALT for `failure.md`)

### Wave 0 Gaps

Phase 1 starts from greenfield (no test infrastructure exists yet). The Wave-0 work IS sub-phase 1.1 — Vitest, ESLint, Husky, and lint-staged all install there. No separate Wave-0 prerequisite exists.

**Pre-1.1 prerequisite gaps:**
- [ ] `pnpm` must be installable (Node 20+, pnpm 9+) — operator responsibility
- [ ] Vercel CLI authenticated (`vercel login`) — operator responsibility
- [ ] Python 3.9+ installed for `audit_a11y.py` skill — operator responsibility
- [ ] Plausible account created OR PostHog decision made — operator responsibility (locked in 1.1 commit)

**In-phase test-infra additions (NOT gaps — these are the work):**
- `vitest.config.ts` created in 1.1
- `tests/eslint-fixtures/*` created in 1.2
- `data/photo-credits-fixtures/*` test images committed in 1.5
- `tests/audit-fixtures/violations.html` created in 1.9
- `scripts/qa/regression-test.mjs` created in 1.10

---

## 4. Cross-Cutting Concerns

### 4.1 ESLint enforcement timeline

| Rule | Installed in | Verified-firing in | Req ID |
|------|-------------|-------------------|--------|
| `tailwindcss/no-arbitrary-value` (Layer A — bans `bg-[#abc]`) | 1.1 | 1.2 (fixture exits non-zero) | AFF-05 |
| `no-restricted-syntax` inline-hex (Layer B — bans `style={{color:'#fff'}}`) | 1.1 | 1.2 (fixture exits non-zero) | AFF-05 |
| `no-restricted-syntax` raw partner URL (escape hatch `lib/affiliate/**`) | 1.1 | 1.4 (fixture exits non-zero outside helper; zero inside) | AFF-04 |
| `no-restricted-syntax` physical directional util | 1.1 | 1.2 (fixture exits non-zero) | I18N-03 |
| `@next/next/no-img-element` | 1.1 | implicit (next-config-next preset) | IMG-03 |
| `eslint-plugin-jsx-a11y/recommended` (lang, label, etc.) | 1.1 | 1.3 (clean components pass) | A11Y-01, A11Y-06 |

All rules INSTALLED in 1.1. Verification fixtures appear in 1.2, 1.3, 1.4. This means lint is enforcing from commit 1 of Phase 1.

### 4.2 Pre-commit hooks timeline

| Hook | Established in | What runs | Req ID |
|------|---------------|-----------|--------|
| `.husky/pre-commit` runs `pnpm lint-staged` | 1.1 | ESLint --fix, Prettier on staged code | AUD-04 |
| lint-staged adds `pnpm qa:credits --staged` on `data/photo-credits.json` change | 1.5 | Credits validator | AUD-04 + IMG-02 |
| lint-staged adds `pnpm qa:schema` on changes touching `lib/schema/**` | 1.6 | Schema validator | AUD-04 + SEO-03 |
| `.husky/pre-push` runs `pnpm qa:credits && pnpm qa:schema` (full, not staged) | 1.6 | Both validators full-sweep | AUD-04 |

Established progressively, not all-at-once. Each sub-phase EXTENDS the pre-commit set as its tools come online. Documented in `package.json` `lint-staged` block — planner can read the deltas to verify.

### 4.3 Type strictness timeline

| TS strict flag | Enabled in | Note |
|---------------|-----------|------|
| `strict: true` (all sub-options) | 1.1 | Non-negotiable per CONTEXT |
| `verbatimModuleSyntax: true` | 1.1 | Reduces import bugs |
| `noUncheckedIndexedAccess: true` | 1.1 | Catches `array[idx]` returning T undefined |
| `exactOptionalPropertyTypes: true` | 1.1 | Catches `{ x?: T \| undefined }` confusion |

All enabled in 1.1. `pnpm typecheck` (`tsc --noEmit`) green by end of 1.1; remains green throughout phase.

### 4.4 Test-runner setup

- **Vitest 2.x** installed in 1.1
- `vitest.config.ts` created in 1.1 with: `environment: 'jsdom'` (for component tests), `coverage.provider: 'v8'`, `coverage.thresholds.functions: 80`
- First tests written in 1.2 (`tests/eslint-fixtures/*` lint-fixture documentation)
- First production tests written in 1.5 (`scripts/qa/check-credits.test.ts`)
- 44 affiliate tests written in 1.4 — establishes the project's "test density" benchmark
- All sub-phases ≥1.4 contribute tests for their outputs; cumulative test count at end of phase ≈ 100+

### 4.5 CI matrix

| Stage | Runs in | Sub-phase establishing it |
|-------|---------|---------------------------|
| ESLint + TypeScript | GitHub Actions on every PR | 1.1 |
| Vitest unit suite | Every PR | 1.1 (config); tests accumulate per sub-phase |
| Photo-credits gate | Every PR + pre-push | 1.5 |
| Schema validator | Every PR + pre-push | 1.6 |
| Audit dashboard scan | Every PR (writes artifact, doesn't block) | 1.9 |
| Lighthouse CI | Every PR (blocks merge if threshold fails) | 1.10 |
| `audit_a11y.py` IS-5568 supplementary | Every PR after deploy preview ready | 1.10 |

### 4.6 Plausible vs PostHog decision lock

CONTEXT says default Plausible. Planner MUST treat this as locked unless the user explicitly opts to PostHog during execution. The decision SHOULD be committed as `chore(1.1): lock analytics=plausible` so the trail is auditable. If PostHog is chosen instead, the only swap is `next-plausible` → PostHog's JS snippet in `app/[locale]/layout.tsx` plus env var rename — nothing downstream changes.

### 4.7 Vercel deployment specifics

- Phase 1 deploys to Vercel with a **placeholder domain** (auto-generated `*.vercel.app`)
- `vercel link` and `vercel env pull` set up in 1.1
- Production domain (`visitisrael.site`) DNS + HTTPS + HSTS deferred to Phase 6.01
- Branch deploys = preview deploys for every PR
- Lighthouse CI runs against preview URLs (`$PREVIEW_URL` injected by Vercel GitHub integration)

### 4.8 Pre-commit + pre-push integration with skills

The `israeli-accessibility-compliance` skill's `scripts/audit_a11y.py` is invoked from CI (1.10) NOT pre-commit (would slow local dev). The skill expects Python 3.9+ + selenium + axe.min.js. Document in `data/dev-prereqs.md` (created in 1.1) so operator can pre-install.

---

## 5. Open Technical Questions

Items NOT covered by upstream research, surfaced during synthesis. All have a recommended default — the planner can proceed without resolving any of them.

1. **`eslint-plugin-tailwindcss` compatibility with Tailwind v4.**
   - As of late 2025 / early 2026, `eslint-plugin-tailwindcss` v3.18+ supports Tailwind v4 in beta. The `settings.tailwindcss.config` key must point to either `tailwind.config.ts` (legacy) OR the CSS file containing `@theme`.
   - **Recommended:** Point to `tailwind.config.ts` (which we keep as a stub holding content paths only) for plugin compatibility; rely on `@theme` in `app/globals.css` for actual tokens. If `eslint-plugin-tailwindcss` fails to load v4 tokens, fall back to disabling `tailwindcss/no-custom-classname` and rely solely on `no-arbitrary-value` + the `no-restricted-syntax` hex regex.
   - **Risk:** LOW — Layer B (`no-restricted-syntax`) covers the actual goal regardless.

2. **Husky v9 init syntax.**
   - Husky v9 changed install path. Use `pnpm exec husky init` (NOT `husky install`). The init command creates `.husky/` + adds `prepare` script to `package.json`.
   - **Recommended:** Run `pnpm exec husky init` during 1.1 scaffold. Do not hand-roll `.husky/_/husky.sh`.

3. **Velite + next-intl interop.**
   - Velite emits a `.velite/` directory consumed at build time. `next-intl` reads `messages/{locale}.json` at request time. They DO NOT overlap functionally.
   - **Recommended:** Velite handles MDX content collections (`content/{he,en,fr}/`); next-intl handles UI strings (`messages/{he,en}.json`). Keep them strictly separated. The Velite collection schema includes `lang` for the content's locale; the `messages/{locale}.json` is for the locale's UI vocabulary.

4. **Tailwind v4 `@theme` + `dark:` variant.**
   - Tailwind v4 still supports the `dark:` variant via `@media (prefers-color-scheme: dark)`. NOT in scope for Phase 1 (CONTEXT doesn't mention dark mode), but the planner should NOT preemptively define a dark variant token set — leave Layer 2 light-mode only.

5. **`schema-dts` types vs schema.org 2024+ additions.**
   - `schema-dts` 1.x lags schema.org by months. Likely-needed types missing as of 1.x: none for Phase 1 (we use only mature types). If a type isn't in schema-dts at Phase 2+, fall back to `as unknown as WithContext<T>` with a documented justification.

6. **Vercel Hobby vs Pro for Phase 1.**
   - STACK §4.3 recommends Pro ($20/mo). For Phase 1 (no production traffic, no image-transformation volume), Hobby is sufficient. Promote to Pro before Phase 2 hero-image-heavy pages ship. Document in `data/deploy-decisions.md`.

7. **`audit_a11y.py` Selenium dependency on CI.**
   - The skill's audit script uses Selenium + headless Chrome. GitHub Actions has Chrome pre-installed on `ubuntu-latest` (since 2024). `pip install selenium axe-selenium-python`. Confirm during 1.10.

8. **`treosh/lighthouse-ci-action` v12 with Next.js 15.5.**
   - The action expects a static `out/` OR a running server. We use the running-server path (Next.js doesn't statically export when using `next-intl` middleware). Set `startServerCommand: 'pnpm start'` + `startServerReadyPattern: 'Ready in'` in `.lighthouserc.cjs`. Verified pattern in STACK §5.2.

None of these block planning. All have recommended defaults.

---

## 6. References

All citations live in upstream research:

- **Tech stack canon:** `.planning/research/STACK.md` §0–§13
- **Architecture decisions + DAG:** `.planning/research/ARCHITECTURE.md` §1–§11
- **34 audit rules:** `.planning/research/PITFALLS.md` §6 (AUD-001..AUD-034)
- **Conflict resolutions:** `.planning/research/SUMMARY.md` §3 (Conflict A, B, C, D)
- **Gap inventory:** `.planning/research/SUMMARY.md` §6
- **Quality Gate criteria:** `.planning/ROADMAP.md` "Quality Gate" section
- **Skills bundle:** `data/skills-inventory.md` + each `.agents/skills/*/SKILL.md`

---

## Metadata

**Confidence breakdown:**
- Per-sub-phase steps: HIGH — every command, file path, config snippet has a canonical upstream source
- Wave assignments: HIGH — derived directly from ARCHITECTURE §8.3 Bundle A/B/C/D/E/F
- Validation Architecture: HIGH — every req ID has a runnable command; planner can convert each row to a verification task
- Cross-cutting timing: HIGH — derived from CONTEXT §code_context + STACK §8
- Open questions: MEDIUM — all are minor and have defaults; LOW risk if any default proves wrong

**Research date:** 2026-05-11
**Valid until:** 2026-08-11 (90 days; Next.js + Tailwind + next-intl release cadence; Lighthouse 12 stable)
**Researcher:** gsd-phase-researcher

---

## RESEARCH COMPLETE
