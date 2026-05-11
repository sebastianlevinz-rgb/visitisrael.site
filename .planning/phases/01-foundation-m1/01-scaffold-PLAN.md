---
phase: 01-foundation-m1
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - pnpm-lock.yaml
  - tsconfig.json
  - next.config.ts
  - app/[locale]/layout.tsx
  - app/[locale]/page.tsx
  - middleware.ts
  - i18n-config.ts
  - i18n.ts
  - messages/he.json
  - messages/en.json
  - messages/fr.json
  - velite.config.ts
  - content/he/.gitkeep
  - content/en/.gitkeep
  - content/fr/.gitkeep
  - eslint.config.js
  - .prettierrc.json
  - .husky/pre-commit
  - .husky/pre-push
  - .env.example
  - .env.local.example
  - .gitignore
  - vercel.json
  - app/globals.css
  - vitest.config.ts
  - vitest.setup.ts
  - lint-staged.config.js
  - data/dev-prereqs.md
  - tests/i18n-config.test.ts
  - tests/velite-config.test.ts
autonomous: true
requirements:
  - FND-01
  - FND-08
  - I18N-01
  - I18N-02
  - I18N-04
  - I18N-06
  - A11Y-01
  - A11Y-07
  - AFF-04
  - AFF-05
  - SEO-05
  - AUD-04
must_haves:
  truths:
    - "`pnpm dev` boots Next.js 15.5 on localhost:3000"
    - "HE renders at root (`/`); EN renders at `/en/` with proper `<html lang dir>`"
    - "`pnpm lint` rejects raw-hex / raw-partner-url / physical-direction fixtures (each exits non-zero)"
    - "`pnpm test --run` passes initial smoke + i18n + Velite config tests"
    - "`pnpm typecheck` exits 0 with strict TS flags enabled"
    - "Plausible script appears in built HTML when domain env present"
    - "Pre-commit hook fires `pnpm lint-staged` on commit"
  artifacts:
    - path: "i18n-config.ts"
      provides: "Single-source locales array (he,en) + allowedLangs union (he,en,fr)"
      contains: "export const locales = ['he','en']"
    - path: "eslint.config.js"
      provides: "Flat config with 3 inviolable rules + escape hatch for lib/affiliate/**"
      contains: "no-restricted-syntax"
    - path: "velite.config.ts"
      provides: "Content collection schema with lang enum he|en|fr; title 50-70 chars; desc 120-160"
      contains: "z.enum(['he','en','fr'])"
    - path: "app/[locale]/layout.tsx"
      provides: "Per-route <html lang dir> + next-intl provider + Plausible"
      contains: "setRequestLocale"
    - path: ".husky/pre-commit"
      provides: "Husky v9 hook that runs lint-staged"
      contains: "lint-staged"
  key_links:
    - from: "middleware.ts"
      to: "i18n-config.ts"
      via: "imports locales + defaultLocale"
      pattern: "createMiddleware.*locales"
    - from: "app/[locale]/layout.tsx"
      to: "i18n-config.ts"
      via: "imports for setRequestLocale + lang/dir derivation"
      pattern: "lang=\\{locale\\}"
    - from: "eslint.config.js"
      to: "lib/affiliate/**"
      via: "override block disabling no-restricted-syntax"
      pattern: "files:.*lib/affiliate"
---

<objective>
Boot the Next.js 15.5 + TS strict + Tailwind v4 + next-intl v3 scaffold with HE at root and EN at `/en/`, register ESLint flat config with the 3 inviolable rules (hex ban, partner URL ban, physical directional util ban), install Vitest + Husky + lint-staged + Plausible, and stand up the Velite content pipeline. This plan is the root of the Phase 1 DAG — every subsequent plan depends on this being green.

Purpose: Establish the toolchain that enforces all downstream invariants (Argentina lessons #1, #2, #7 — no raw hex, no raw partner URLs, no physical RTL utilities — must fire from commit 1).

Output: A buildable, deployable, lint-clean, type-clean, test-clean Next.js app with HE+EN routing, FR-ready filesystem/types/Velite, and the linting/test/hook pipeline operational.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation-m1/01-CONTEXT.md
@.planning/phases/01-foundation-m1/01-RESEARCH.md
@.planning/phases/01-foundation-m1/01-VALIDATION.md
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.agents/skills/next-best-practices/SKILL.md
@.agents/skills/hebrew-tailwind-preset/SKILL.md
@.agents/skills/israeli-accessibility-compliance/SKILL.md

<conflict_resolutions>
Conflict A (locales) — LOCKED:
- `i18n-config.ts` registers EN+HE ONLY at launch
- Filesystem/types/Velite accept `'he' | 'en' | 'fr'` for cheap FR addition later
- Hreflang/sitemap generators iterate REGISTERED locales (`locales`), NOT `allowedLangs`

Source: SUMMARY.md §3 Conflict A; PITFALLS §3.11 wins on registration; ARCHITECTURE §1.3 wins on filesystem readiness.
</conflict_resolutions>

<interfaces>
The contracts this plan establishes (consumed by every downstream plan):

```ts
// i18n-config.ts — single source of truth
export const locales = ['he', 'en'] as const;
export const defaultLocale = 'he' as const;
export const allowedLangs = ['he', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export type AllowedLang = (typeof allowedLangs)[number];
```

```ts
// Velite collection (velite.config.ts) — accepts FR for filesystem readiness
const collection = s.object({
  lang: s.enum(['he', 'en', 'fr']),
  title: s.string().max(70),
  description: s.string().min(120).max(160),
  // … per collection
});
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Initialize Next.js 15.5 + pnpm + Tailwind v4 + all dependencies</name>
  <files>package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts, app/globals.css, .gitignore, vercel.json</files>
  <action>
Follow RESEARCH.md §1.1 "Concrete steps" verbatim:

1. `pnpm init` then `pnpm dlx create-next-app@15.5 . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-eslint --no-git --use-pnpm`
2. Install Tailwind v4: `pnpm add -D tailwindcss@^4 @tailwindcss/postcss` + `pnpm add clsx tailwind-merge`
3. Install i18n/content/schema/analytics: `pnpm add next-intl@^3 schema-dts zod next-plausible` + `pnpm add -D velite`
4. Install ESLint flat config + plugins: `pnpm add -D eslint@^9 @typescript-eslint/eslint-plugin@^8 @typescript-eslint/parser@^8 eslint-plugin-tailwindcss eslint-plugin-react eslint-plugin-react-hooks eslint-config-next eslint-plugin-jsx-a11y prettier prettier-plugin-tailwindcss`
5. Install Vitest: `pnpm add -D vitest@^2 @vitest/coverage-v8 @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`
6. Install hooks: `pnpm add -D husky@^9 lint-staged@^15` then `pnpm exec husky init`

Configure `tsconfig.json` with: `strict: true, verbatimModuleSyntax: true, moduleResolution: "bundler", noUncheckedIndexedAccess: true, noImplicitOverride: true, noFallthroughCasesInSwitch: true, exactOptionalPropertyTypes: true` per VALIDATION Wave 0 list.

Configure `next.config.ts` with:
- `trailingSlash: false`
- `images: { formats: ['image/avif','image/webp'], deviceSizes: [320,640,1024,1600], imageSizes: [16,32,64,96,128,256], minimumCacheTTL: 31536000, remotePatterns: [{protocol:'https', hostname:'upload.wikimedia.org'}, {protocol:'https', hostname:'images.unsplash.com'}, {protocol:'https', hostname:'images.pexels.com'}, {protocol:'https', hostname:'gpophotoeng.gov.il'}] }`

Configure `app/globals.css` with `@import "tailwindcss"` plus EMPTY `@theme { /* populated in 02 */ }` block.

Configure `vercel.json` with `buildCommand: "pnpm build"` and ignored build step for docs-only commits.

Add to `.gitignore`: `.env.local`, `.velite`, `node_modules`, `.next`, `out`, `coverage`, `.lighthouseci`, `data/audit-results.json`, `data/lighthouse-results.json`, `data/quality-gate-pass.md`, `data/quality-gate-failure.md`.

Add scripts to `package.json`: `dev`, `build`, `start`, `lint`, `lint:fix`, `typecheck`, `test`, `test:watch`, `validate:schema`, `validate:credits`, `gate:report`, `qa:credits`, `qa:schema`, `lhci`.

DO NOT install `eslint-plugin-tailwindcss` configuration for v4 yet if the plugin's v4 support is beta — use the `eslint-plugin-tailwindcss/no-arbitrary-value` rule only. Fall back to `no-restricted-syntax` hex regex if plugin fails to load.
  </action>
  <verify>
    <automated>pnpm install &amp;&amp; pnpm build &amp;&amp; pnpm typecheck</automated>
  </verify>
  <done>`pnpm build` exits 0; `pnpm typecheck` exits 0 with strict flags; `.husky/pre-commit` file exists; node_modules contains all listed deps with correct major versions.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Wire next-intl v3 with HE/EN registration + FR filesystem readiness + per-route lang/dir layout</name>
  <files>i18n-config.ts, i18n.ts, middleware.ts, app/[locale]/layout.tsx, app/[locale]/page.tsx, messages/he.json, messages/en.json, messages/fr.json, content/he/.gitkeep, content/en/.gitkeep, content/fr/.gitkeep, velite.config.ts, tests/i18n-config.test.ts, tests/velite-config.test.ts</files>
  <behavior>
    - Test: `i18n-config` exports `locales = ['he','en'] as const` (NO 'fr') AND `allowedLangs = ['he','en','fr'] as const`
    - Test: `i18n-config` exports `defaultLocale = 'he'`
    - Test: Velite collection schema rejects `lang: 'ru'` (parse error) but accepts `lang: 'fr'` (FR scaffold ready)
    - Test: Velite collection schema rejects title >70 chars
    - Test: Velite collection schema rejects description <120 or >160 chars
    - Test: `app/[locale]/layout.tsx` renders `<html lang="he" dir="rtl">` for locale=he; `<html lang="en" dir="ltr">` for locale=en
  </behavior>
  <action>
Per RESEARCH.md §1.1:

Create `i18n-config.ts`:
```ts
export const locales = ['he', 'en'] as const;
export const defaultLocale: typeof locales[number] = 'he';
export const allowedLangs = ['he', 'en', 'fr'] as const;
export type Locale = typeof locales[number];
export type AllowedLang = typeof allowedLangs[number];
```

Create `i18n.ts` using next-intl's `getRequestConfig` pattern with `setRequestLocale` (see next-best-practices skill `async-patterns.md`).

Create `middleware.ts` using `createMiddleware` from `next-intl/middleware` with `localePrefix: 'as-needed'`, `localeDetection: true`. Export `config.matcher = ['/((?!_next|api|favicon.ico|images|.*\\..*).*)']`. (Basic-auth for `/admin/*` added in plan 10.)

Create `app/[locale]/layout.tsx`:
- Type `params` as Promise per Next.js 15 async params (next-best-practices `async-patterns.md`)
- Call `setRequestLocale(locale)`
- Set `<html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>`
- Inject `NextIntlClientProvider`
- Load fonts via `next/font/google` with `subsets:['hebrew','latin']` and `display:'swap'`: Heebo + Assistant + Frank Ruhl Libre
- Wrap children in `<PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}>` (no-op if env missing)
- Include `<div id="main-content">` wrapper (skip-link target — A11Y per `israeli-accessibility-compliance/SKILL.md`)

Create `app/[locale]/page.tsx` — minimal placeholder homepage rendering "Visit Israel — placeholder".

Create `messages/he.json`, `messages/en.json` (skeletal namespace stubs `{ "common": { "siteName": "..." } }`), `messages/fr.json` (empty `{}` — Conflict A scaffold).

Create `content/he/.gitkeep`, `content/en/.gitkeep`, `content/fr/.gitkeep` (FR scaffold per Conflict A).

Create `velite.config.ts` with collections `regions`, `subDestinations`, `guides`, `legal`; schema enforces `lang: s.enum(['he','en','fr'])`, `title: s.string().max(70)`, `description: s.string().min(120).max(160)`. CRITICAL: Velite `lang` enum includes 'fr' (filesystem-ready); `i18n-config.locales` does NOT (registered-only).

Create `tests/i18n-config.test.ts` and `tests/velite-config.test.ts` per behavior block.

Create `vitest.config.ts` with `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']`, alias `@/` → root, `coverage.provider: 'v8'`. Create `vitest.setup.ts` extending `expect` with `@testing-library/jest-dom`.
  </action>
  <verify>
    <automated>pnpm test --run tests/i18n-config tests/velite-config &amp;&amp; pnpm build &amp;&amp; grep -q 'html lang="he" dir="rtl"' .next/server/app/index.html || grep -q 'html lang' .next/server/app/page.html</automated>
  </verify>
  <done>VALIDATION rows I18N-01, I18N-02, I18N-04, I18N-06 verification commands all pass. `i18n-config.ts` exports `locales` (2 entries) + `allowedLangs` (3 entries). Velite parse fails on `lang:'ru'` fixture, succeeds on `lang:'fr'` fixture (FR scaffold confirmed).</done>
</task>

<task type="auto">
  <name>Task 3: Configure ESLint flat config with 3 inviolable rules + Prettier + Husky pre-commit + lint-staged + Plausible + .env.example</name>
  <files>eslint.config.js, .prettierrc.json, .husky/pre-commit, .husky/pre-push, lint-staged.config.js, .env.example, .env.local.example, data/dev-prereqs.md, app/[locale]/layout.tsx</files>
  <action>
Per RESEARCH.md §1.1 "ESLint flat config sketch":

Create `eslint.config.js` with the EXACT structure from RESEARCH.md §1.1 (copy-paste the sketch). Three rules:
1. `tailwindcss/no-arbitrary-value: 'error'` (and `tailwindcss/no-unnecessary-arbitrary-value: 'error'`, `tailwindcss/classnames-order: 'warn'`)
2. `no-restricted-syntax: ['error', ...]` with selectors for: (a) inline style hex `style={{ color: '#fff' }}`, (b) raw partner URL literals matching `booking|civitatis|getyourguide|viator|rentalcars|safetywing|skyscanner|hostelworld|klook|gocity|discovercars`, (c) physical Tailwind directional utilities matching `\b(ml-|mr-|pl-|pr-|left-|right-|border-l\b|border-r\b|rounded-l\b|rounded-r\b|text-left|text-right|scroll-ml-|scroll-mr-)\d?`
3. Escape hatch: `{ files: ['lib/affiliate/**/*.ts', 'tailwind.config.ts', 'app/globals.css'], rules: { 'no-restricted-syntax': 'off' } }`

Also include `@next/next/no-img-element: 'error'` (forces use of `next/image`) and `eslint-plugin-jsx-a11y` recommended config.

Set `settings.tailwindcss.config = 'tailwind.config.ts'` for plugin compatibility (Open Question 1 per RESEARCH §5).

Create `.prettierrc.json` with `prettier-plugin-tailwindcss` plugin reference.

Create `lint-staged.config.js`:
```js
export default {
  '*.{ts,tsx,mjs,cjs,js}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css}': ['prettier --write'],
};
```
(Schema + photo-credits validators are appended in plans 04 and 03 respectively per RESEARCH §4.2.)

Create `.husky/pre-commit` that runs `pnpm lint-staged`.
Create `.husky/pre-push` that runs `pnpm qa:credits && pnpm qa:schema` (scripts exist as no-op placeholders for now; populated by plans 03 and 04).

Create `.env.example` with placeholder entries:
```
# Plausible (FND-08 — default; PostHog fallback documented in data/dev-prereqs.md)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# Admin (used by audit dashboard basic-auth — plan 10)
ADMIN_USER=
ADMIN_PASS=

# Affiliate AIDs (populated in plan 06 — Conflict D: 9 real + 2 stubs)
NEXT_PUBLIC_BOOKING_AID=
NEXT_PUBLIC_CIVITATIS_AID=
NEXT_PUBLIC_VIATOR_PID=
NEXT_PUBLIC_VIATOR_MCID=
NEXT_PUBLIC_GYG_PARTNER_ID=
NEXT_PUBLIC_RENTALCARS_AID=
NEXT_PUBLIC_SAFETYWING_REF=
NEXT_PUBLIC_SKYSCANNER_AID=
NEXT_PUBLIC_HOSTELWORLD_AID=
NEXT_PUBLIC_DISCOVERCARS_AID=
NEXT_PUBLIC_KLOOK_AID=    # STUB — see Conflict D; helper throws NoIsraelInventoryError
NEXT_PUBLIC_GOCITY_AID=   # STUB — see Conflict D; helper throws NoIsraelInventoryError
# Travelpayouts aggregator (AFF-08 fallback for traffic-minimum partners like Skyscanner)
NEXT_PUBLIC_TRAVELPAYOUTS_MARKER=
```
Create `.env.local.example` with the same shape but documented as a template only.

Wire Plausible into `app/[locale]/layout.tsx`: `<PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}>` wrapping children. If env missing, provider must no-op (do not crash).

Create `data/dev-prereqs.md` documenting: Node 20+, pnpm 9+, Python 3.9+ for `audit_a11y.py`, Vercel CLI, Plausible account or PostHog decision.

Commit message convention for this plan: `chore(01-01): lock analytics=plausible` so the analytics decision lock is auditable (RESEARCH §4.6).

DO NOT yet create eslint fixture files (`tests/eslint-fixtures/raw-hex.tsx` etc.) — those land in plan 02 along with the design tokens and verify ESLint fires.
  </action>
  <verify>
    <automated>pnpm lint app/ &amp;&amp; pnpm test --run tests/i18n-config.test.ts tests/velite-config.test.ts &amp;&amp; test -f .husky/pre-commit &amp;&amp; test -f .env.example</automated>
  </verify>
  <done>ESLint runs clean on app code (no fixtures yet); pre-commit hook exists and runs lint-staged; `.env.example` lists 11 affiliate vars + Plausible + admin; Plausible script appears in build output when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var set (smoke: `grep -r 'plausible' .next/` succeeds). A11Y-07 verified: `! grep -rE '(accessibe\.com|userway\.org|equalweb\.com|audioeye\.com)' .next/` returns 0 matches.</done>
</task>

</tasks>

<verification>
End of plan 01 checks (executed by gsd-verifier against must_haves):

1. **FND-01**: `pnpm dev` boots on :3000; `pnpm build` exits 0; `curl -sI http://localhost:3000/ | grep '200'` succeeds.
2. **FND-08**: Plausible script present in built HTML when env set: `grep -r 'plausible.io' .next/ | head -1` returns a line.
3. **I18N-01**: `curl -sI http://localhost:3000/` (HE root) and `curl -sI http://localhost:3000/en` both return 200.
4. **I18N-02**: `pnpm test tests/i18n-config.test.ts --run` passes; `locales` has 2 entries, `allowedLangs` has 3.
5. **I18N-04**: `grep 'html lang="he" dir="rtl"' .next/server/app/**/*.html` finds matches for HE pages; `grep 'html lang="en" dir="ltr"'` finds matches for EN pages.
6. **I18N-06**: `pnpm test tests/velite-config.test.ts --run` — `lang:'ru'` fixture rejected; `lang:'fr'` accepted.
7. **A11Y-01**: built HTML has `lang` and `dir` on `<html>` for every page.
8. **A11Y-07**: `! grep -rE '(accessibe\.com|userway\.org|equalweb\.com|audioeye\.com)' .next/` (zero overlay scripts).
9. **AFF-04 (installed)**: ESLint rule loaded; production verification in plan 06.
10. **AFF-05 (installed)**: Tailwind + no-restricted-syntax rules loaded; production verification in plan 02 via fixtures.
11. **AUD-04**: `.husky/pre-commit` exists and contains `lint-staged`.
12. **SEO-05 (Velite schema layer)**: Velite rejects over-long title / out-of-range description.
</verification>

<success_criteria>
- `pnpm dev`, `pnpm build`, `pnpm test --run`, `pnpm lint`, `pnpm typecheck` all exit 0
- HE renders at `/`, EN at `/en/` with correct `<html lang dir>`
- `i18n-config.ts` registers 2 locales; `allowedLangs` includes 'fr' (Conflict A honored)
- Velite collection accepts `lang: 'he' | 'en' | 'fr'`
- ESLint flat config loaded with 3 inviolable rules + escape hatch for `lib/affiliate/**`
- Pre-commit hook fires `pnpm lint-staged`
- `.env.example` enumerates all 11 affiliate env vars + Plausible + admin
- Zero accessibility overlays in built output (A11Y-07)
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/01-scaffold-SUMMARY.md` per template, summarizing: files created, decisions locked (Plausible vs PostHog), and the readiness of the toolchain for plan 02 (design tokens), 03 (photo credits), 04 (schema baseline) to start in parallel.
</output>
