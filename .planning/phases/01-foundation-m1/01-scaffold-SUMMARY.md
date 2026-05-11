---
phase: 01-foundation-m1
plan: 01
subsystem: infra
tags: [next.js, typescript, tailwind-v4, next-intl, velite, eslint-flat, vitest, husky, lint-staged, plausible, vercel, i18n, rtl, hebrew]

requires: []
provides:
  - "Next.js 15.5 App Router scaffold with TypeScript 5.9 strict (verbatimModuleSyntax, noUncheckedIndexedAccess, exactOptionalPropertyTypes)"
  - "Tailwind v4 via @tailwindcss/postcss with empty @theme placeholder for plan 02 design tokens"
  - "next-intl v3 routing with HE at root, EN at /en/, FR scaffolded but NOT registered (Conflict A locked)"
  - "Per-route <html lang dir> via app/[locale]/layout.tsx + Heebo/Assistant/Frank Ruhl Libre fonts"
  - "Velite v0.3 collection schema (regions/subDestinations/guides/legal) with lang enum he|en|fr + title max 70 + description 120-160"
  - "ESLint 9 flat config with 4 inviolable rules (arbitrary-hex / inline-hex / partner-URL / physical-RTL-utility) + escape hatch for lib/affiliate/**"
  - "Husky v9 pre-commit (lint-staged) + pre-push (qa:credits + qa:schema placeholders)"
  - "Vitest 2 with jsdom env, @ alias, jest-dom matchers, v8 coverage"
  - "next-plausible@3 PlausibleProvider wired (no-op when env unset)"
  - "Vercel deploy config (pnpm build, docs-only ignoreCommand)"
  - ".env.example + .env.local.example documenting 11 affiliate AID vars + Plausible + admin"
  - "Skip-link target #main-content + Hebrew/English skip text"

affects: [02-design-tokens, 03-photo-credits, 04-schema-baseline, 05-component-lib, 06-affiliate-helpers, 07-quality-profiles, 08-seo-config, 09-ner-detection, 10-audit-dashboard, 11-lighthouse-ci]

tech-stack:
  added:
    - "next@15.5.18 + react@19.2.6 + typescript@5.9.3"
    - "tailwindcss@4.3 + @tailwindcss/postcss + clsx + tailwind-merge"
    - "next-intl@3.26 + schema-dts@2 + zod@4.4 + next-plausible@3"
    - "velite@0.3"
    - "eslint@9.39 + eslint-config-next@16 + typescript-eslint@8.59 + eslint-plugin-react@7 + eslint-plugin-react-hooks@7 + eslint-plugin-jsx-a11y@6 + prettier + prettier-plugin-tailwindcss"
    - "vitest@2.1 + @vitest/coverage-v8@2.1 + @vitejs/plugin-react@4 + @testing-library/react@16 + @testing-library/jest-dom@6 + jsdom@29"
    - "husky@9.1 + lint-staged@15.5"
  patterns:
    - "Single source of truth for locales in i18n-config.ts (locales registered + allowedLangs filesystem-ready superset)"
    - "Per-route <html lang dir> via async params + setRequestLocale + localeDirection map"
    - "ESLint flat config with explicit plugin-rule co-location (eslint-config-next 'next' block augmented via map() to inject @next/next/no-img-element + react/jsx-key)"
    - "Inviolable rules as no-restricted-syntax AST selectors with same-file regex constants for partnerDomainRegex + physicalUtilRegex"
    - "Velite lang enum (he|en|fr) DIVERGES from i18n-config locales ([he,en]) — Conflict A filesystem-readiness pattern"
    - "Plausible injected as <head> child; no-op rendering when NEXT_PUBLIC_PLAUSIBLE_DOMAIN unset"

key-files:
  created:
    - package.json
    - tsconfig.json
    - next.config.ts
    - postcss.config.mjs
    - next-env.d.ts
    - app/globals.css
    - app/[locale]/layout.tsx
    - app/[locale]/page.tsx
    - i18n-config.ts
    - i18n.ts
    - middleware.ts
    - messages/he.json
    - messages/en.json
    - messages/fr.json
    - content/he/.gitkeep
    - content/en/.gitkeep
    - content/fr/.gitkeep
    - velite.config.ts
    - eslint.config.js
    - .prettierrc.json
    - lint-staged.config.js
    - .husky/pre-commit
    - .husky/pre-push
    - .env.example
    - .env.local.example
    - vercel.json
    - vitest.config.ts
    - vitest.setup.ts
    - tests/i18n-config.test.ts
    - tests/velite-config.test.ts
    - data/dev-prereqs.md
  modified:
    - .gitignore
    - next-env.d.ts (Next.js auto-augmented with routes.d.ts reference during first build)

key-decisions:
  - "Plausible locked as v1 analytics provider (FND-08) — privacy-first, cookie-less, EU-compliant; PostHog fallback documented but unused"
  - "Conflict A registration honored — i18n-config.locales = ['he','en']; allowedLangs = ['he','en','fr']; Velite schema accepts FR; content/fr/ exists empty"
  - "next-plausible downgraded to v3 (v4 broke API — uses `src` not `domain` prop)"
  - "eslint-plugin-tailwindcss NOT loaded — its v3.x branch cannot parse Tailwind v4 CSS-first @theme config. Replaced rule 1 (no-arbitrary-value) with no-restricted-syntax regex selector against className=`[#...]` patterns per RESEARCH §1.1 fallback note"
  - "@vitest/coverage-v8 + @vitejs/plugin-react downgraded to v2 / v4 majors to match vitest@^2 peer constraint"
  - "ESLint inviolable rules implemented as no-restricted-syntax with same-block plugin-rule co-location (flat config requires this) — eslint-config-next 'next' block augmented via Array.map() rather than separate config object"

patterns-established:
  - "Conflict A scaffold pattern: registered (locales) vs allowed (allowedLangs) — adding FR later = single-line edit to locales array"
  - "Per-route locale layout: async params -> setRequestLocale -> localeDirection map -> <html lang dir>"
  - "ESLint flat config plugin scoping: rules referencing plugins from eslint-config-next must be added inside the matching block (via map mutation) — separate custom blocks cannot reference @next/next, @typescript-eslint, react plugins"
  - "Inviolable rule structure: shared regex constants at top of eslint.config.js (partnerDomainRegex covers all 11 Conflict D partners; physicalUtilRegex covers all 14 banned utility prefixes), referenced from no-restricted-syntax selectors"
  - "Escape hatch files: lib/affiliate/**, tailwind.config.ts, app/globals.css, velite.config.ts, next.config.ts — affiliate helpers + token files + framework config files exempt from no-restricted-syntax"
  - "Test fixture handling: tests/eslint-fixtures/** globally ignored (so `pnpm lint` stays clean) but explicit `pnpm lint tests/eslint-fixtures/foo.tsx` invocation produces the expected error"

requirements-completed:
  - FND-01
  - FND-08
  - I18N-01
  - I18N-02
  - I18N-04
  - I18N-06
  - A11Y-01
  - A11Y-07
  - SEO-05

duration: 27min
completed: 2026-05-11
---

# Phase 1 Plan 01: Scaffold Summary

**Next.js 15.5 + TypeScript strict + Tailwind v4 + next-intl v3 (HE root, EN /en/, FR filesystem-ready) + ESLint flat with 4 inviolable rules + Vitest + Husky v9 + lint-staged + Plausible + Vercel deploy config — Foundation toolchain operational and ready for plans 02, 03, 04 to start in parallel.**

## Performance

- **Duration:** 27 min
- **Started:** 2026-05-11T00:37:38Z
- **Completed:** 2026-05-11T01:04:13Z
- **Tasks:** 3 (1 standard + 1 TDD with split RED/GREEN commits + 1 standard, plus 1 analytics-lock commit)
- **Files created:** 31
- **Files modified:** 2 (.gitignore, next-env.d.ts via Next.js auto-update)
- **Total commits in this plan:** 5

## Accomplishments

- `pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test --run` all exit 0
- HE renders at `/` with `<html lang="he" dir="rtl">`; EN renders at `/en` with `<html lang="en" dir="ltr">`; HE `/he` 307-redirects to `/` (`as-needed` strips default-locale prefix); hreflang link headers emitted for he/en/x-default
- 12/12 Vitest tests pass: 4 for i18n-config (locales+allowedLangs+defaultLocale+const tuples) + 8 for Velite collection schema (lang enum he|en|fr, title max 70, description 120-160)
- 4 ESLint inviolable rules fire on synthetic fixtures; escape hatch (`lib/affiliate/**`) silences them
- Pre-commit hook runs `pnpm lint-staged` (verified by manual `pnpm exec lint-staged --diff="HEAD~1 HEAD"` invocation — both ESLint and Prettier ran across staged files)
- Plausible script appears in built HTML when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set; A11Y-07 verified zero overlay-script domains in `.next/`

## Task Commits

Each task was committed atomically (one TDD task split into RED + GREEN commits):

1. **Task 1: Initialize Next.js + pnpm + all dependencies** — `972c875` (feat) — package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts, postcss.config.mjs, next-env.d.ts, app/globals.css, vercel.json, .gitignore, default .husky/pre-commit scaffold
2. **Task 2 (RED): failing tests for i18n-config + Velite schema** — `20cc837` (test) — vitest.config.ts, vitest.setup.ts, tests/i18n-config.test.ts, tests/velite-config.test.ts
3. **Task 2 (GREEN): wire next-intl + per-route layout + Velite + Plausible** — `de7029a` (feat) — i18n-config.ts, i18n.ts, middleware.ts, app/[locale]/layout.tsx, app/[locale]/page.tsx, messages/*.json, content/*/.gitkeep, velite.config.ts (next-plausible downgraded to v3)
4. **Analytics lock** — `3a97015` (chore) — data/dev-prereqs.md documenting Plausible vs PostHog decision (per RESEARCH §4.6 — separate audit-trail commit)
5. **Task 3: ESLint flat config + Prettier + Husky + lint-staged + .env** — `babbf0e` (feat) — eslint.config.js, .prettierrc.json, lint-staged.config.js, .husky/pre-commit (lint-staged), .husky/pre-push, .env.example, .env.local.example

## Files Created/Modified

### Created (31)

**Build / config**
- `package.json` — scripts (dev, build, start, lint, lint:fix, typecheck, test, test:watch, validate:schema, validate:credits, qa:credits, qa:schema, gate:report, lhci, prepare); dependencies pinned per RESEARCH §1.1
- `pnpm-lock.yaml` — committed lockfile
- `tsconfig.json` — strict + verbatimModuleSyntax + noUncheckedIndexedAccess + noImplicitOverride + noFallthroughCasesInSwitch + exactOptionalPropertyTypes + bundler moduleResolution
- `next.config.ts` — trailingSlash:false, image formats avif+webp, deviceSizes [320,640,1024,1600], remotePatterns (Wikimedia, Unsplash, Pexels, IGPO), next-intl plugin
- `postcss.config.mjs` — @tailwindcss/postcss
- `next-env.d.ts` — Next.js type references
- `vercel.json` — pnpm build + docs-only ignoreCommand

**App / i18n**
- `app/globals.css` — `@import "tailwindcss"` + empty `@theme {}` placeholder (populated in plan 02)
- `app/[locale]/layout.tsx` — async params, setRequestLocale, fonts (Heebo + Assistant + Frank Ruhl Libre with `subsets:['hebrew','latin']`), NextIntlClientProvider, PlausibleProvider, skip-link
- `app/[locale]/page.tsx` — placeholder homepage with useTranslations
- `i18n-config.ts` — single-source-of-truth: locales (he, en), defaultLocale (he), allowedLangs (he, en, fr), localeDirection map, Locale/AllowedLang types
- `i18n.ts` — next-intl getRequestConfig with async requestLocale + dynamic messages import
- `middleware.ts` — createMiddleware (localePrefix='as-needed', localeDetection=true, matcher excluding _next/api/static-files)
- `messages/he.json`, `messages/en.json` — skeletal `common.{siteName,placeholder}` namespace
- `messages/fr.json` — empty `{}` stub (Conflict A scaffold)
- `content/{he,en,fr}/.gitkeep` — Velite collection roots

**Content schema**
- `velite.config.ts` — collections (regions, subDestinations, guides, legal); `lang: s.enum(['he','en','fr'])`; title max 70; description 120-160 (SEO-05 schema layer)

**Linting / formatting / hooks**
- `eslint.config.js` — flat config with 4 inviolable rules + escape hatch + global ignores
- `.prettierrc.json` — semi/singleQuote/trailingComma=all + prettier-plugin-tailwindcss
- `lint-staged.config.js` — eslint+prettier for code; prettier for docs (validators appended in plans 03/04)
- `.husky/pre-commit` — `pnpm lint-staged`
- `.husky/pre-push` — `pnpm qa:credits && pnpm qa:schema` (placeholders)

**Env / docs**
- `.env.example` + `.env.local.example` — Plausible domain, admin user/pass, 11 affiliate AID vars + Travelpayouts marker (Conflict D notes inline)
- `data/dev-prereqs.md` — Node 20+, pnpm 9+, Python 3.9+, Vercel CLI, Plausible/PostHog decision

**Tests**
- `vitest.config.ts` — jsdom env, @ alias, jest-dom matchers, v8 coverage
- `vitest.setup.ts` — `@testing-library/jest-dom/vitest` import
- `tests/i18n-config.test.ts` — 4 tests (locales=['he','en'], defaultLocale='he', allowedLangs=['he','en','fr'], const tuple narrowing)
- `tests/velite-config.test.ts` — 8 tests (lang enum he/en/fr accepted, ru rejected, title max 70, description 120-160, boundary values)

### Modified (2)

- `.gitignore` — added `.velite/`, `data/audit-results.json`, `data/lighthouse-results.json`, `data/quality-gate-{pass,failure}.md`
- `next-env.d.ts` — Next.js build auto-added `.next/types/routes.d.ts` reference

## Decisions Made

1. **Plausible locked as v1 analytics** — separate `chore(01-01): lock analytics=plausible` commit per RESEARCH §4.6 audit-trail requirement. Reasons: privacy-first, cookie-less (no UX cost of cookie banner), EU-compliant, low blocking rate from privacy plugins. PostHog kept as documented fallback (in `data/dev-prereqs.md`) for Phase 6 product-analytics needs.

2. **next-plausible downgraded to v3** — v4 broke the API (uses `src` URL, not `domain` prop). Plan and CONTEXT both expected the v3 `domain` API. Downgrade keeps the documented contract.

3. **eslint-plugin-tailwindcss NOT used in v4** — RESEARCH §1.1 noted this as a contingency: the plugin's v3.x branch cannot resolve Tailwind v4's CSS-first `@theme` config (crashed with "Could not resolve tailwindcss" at startup). Fallback: rule 1 (no-arbitrary-value) implemented as a `no-restricted-syntax` AST selector matching `className=".*\[#[0-9a-fA-F]{3,8}\]"`. Plugin package is still installed but unloaded — keeps the option open to re-enable when v4 support stabilizes.

4. **ESLint plugin scoping resolved via Array.map() mutation of next-config blocks** — flat config requires rules and plugins to live in the same block. Instead of redeclaring `@next/next`, `react`, `@typescript-eslint` plugins (which throws "Cannot redefine plugin"), I extend the eslint-config-next array entries by name: 'next' block gets `@next/next/no-img-element` + `react/jsx-key`; 'next/typescript' block gets `@typescript-eslint/no-explicit-any`.

5. **@vitest/coverage-v8 + @vitejs/plugin-react pinned to majors that match vitest@^2** — installer defaulted to v4 / v6 which expected `vitest@4` and `vite@^8`. Downgraded to `@vitest/coverage-v8@^2` + `@vitejs/plugin-react@^4` per the plan's `vitest@^2` directive.

6. **Skip-link Hebrew text uses literal `'דלג לתוכן הראשי'` per israeli-accessibility-compliance skill A11Y-02 reference** — even though A11Y-02 (skip-nav as first focusable) lives in plan 03 / 05, the layout-level target `<div id="main-content">` is here. Hardcoded the bilingual skip text in `app/[locale]/layout.tsx` so it works from commit 1 without needing the message dictionary.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] eslint-plugin-tailwindcss incompatible with Tailwind v4**
- **Found during:** Task 3 (ESLint config first run)
- **Issue:** Plugin v3.18.3 crashes at startup with "Could not resolve tailwindcss" — its TailwindUtils.loadConfigV4 cannot parse the @theme CSS-first config that Tailwind v4 expects.
- **Fix:** Removed `import tailwind from 'eslint-plugin-tailwindcss'` and the `...tailwind.configs['flat/recommended']` spread. Replaced the `tailwindcss/no-arbitrary-value` rule with a `no-restricted-syntax` selector matching `className=".*\[#[0-9a-fA-F]{3,8}\].*"` (smoke-tested against `<div className="bg-[#abc]">` — produces the expected error).
- **Files modified:** eslint.config.js
- **Verification:** `pnpm lint` exits 0 on clean source; manual smoke-test fixture `<div className="bg-[#abc]">` produces the expected "Arbitrary hex value in className banned" error.
- **Committed in:** `babbf0e` (Task 3 commit)

**2. [Rule 1 - Bug] next-plausible@^4 API mismatch**
- **Found during:** Task 2 (typecheck after wiring PlausibleProvider)
- **Issue:** pnpm resolved `next-plausible` to v4.0.0, which removed the `domain` prop in favor of `src`. Plan and CONTEXT both use `domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}`.
- **Fix:** `pnpm add next-plausible@^3` to restore the documented v3 API; type-checked successfully after.
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** `pnpm typecheck` exit 0; `<PlausibleProvider domain=... trackOutboundLinks taggedEvents>` renders without prop-type error.
- **Committed in:** `de7029a` (Task 2 GREEN commit)

**3. [Rule 3 - Blocking] eslint-config-next plugin redeclaration error**
- **Found during:** Task 3 (ESLint config first run after removing tailwind plugin)
- **Issue:** Original RESEARCH sketch added `a11y.flatConfigs.recommended` as a separate block; eslint-config-next ^16 already registers `jsx-a11y`, so re-adding produces "Cannot redefine plugin 'jsx-a11y'".
- **Fix:** Removed the redundant import + spread. Rules that depend on eslint-config-next-owned plugins (`@next/next/no-img-element`, `react/jsx-key`, `@typescript-eslint/no-explicit-any`) are injected by mapping over the next-config array and augmenting the matching block's `rules` object.
- **Files modified:** eslint.config.js
- **Verification:** `pnpm lint` exit 0 after the augment-via-map pattern; manual smoke-test confirms `@next/next/no-img-element` still fires (would catch `<img>` in JSX).
- **Committed in:** `babbf0e` (Task 3 commit)

**4. [Rule 2 - Missing Critical] Skip-link target was undocumented in plan**
- **Found during:** Task 2 (writing app/[locale]/layout.tsx)
- **Issue:** Plan task copy mentioned "Include `<div id="main-content">` wrapper (skip-link target — A11Y per `israeli-accessibility-compliance/SKILL.md`)" but did not specify the `<a href="#main-content">` element itself. A11Y-02 explicitly requires the skip-link be the first focusable element.
- **Fix:** Added `<a href="#main-content" className="sr-only focus:not-sr-only">` with bilingual Hebrew/English label INSIDE the NextIntlClientProvider, immediately before `<div id="main-content">`. Uses `sr-only` + `focus:not-sr-only` so it only appears when keyboard-focused (Lighthouse-accepted pattern).
- **Files modified:** app/[locale]/layout.tsx
- **Verification:** Built HTML contains `<a href="#main-content"` and `<div id="main-content">` for both HE and EN pages.
- **Committed in:** `de7029a` (Task 2 GREEN commit)

---

**Total deviations:** 4 auto-fixed (2 blocking, 1 bug, 1 missing critical)
**Impact on plan:** All four auto-fixes are necessary for the plan to compile/lint/run. None alter the locked decisions (Conflict A locale registration, Conflict D affiliate coverage, Plausible analytics choice, 4 inviolable rules). Plan 02 (design tokens) will revisit `eslint-plugin-tailwindcss` to see if v4 support has landed; the regex-selector fallback is in place until then.

## Issues Encountered

- **Default `husky init` writes `pnpm test` to pre-commit** — overwrote with `pnpm lint-staged` in Task 3 per plan.
- **Long file-line conversion warnings (LF -> CRLF on Windows)** — informational only; Git uses .gitattributes defaults. No action taken.
- **Sharp build-script ignored warning** during `pnpm install` — pnpm 10 requires explicit `pnpm approve-builds` for native binaries. Not needed for Phase 1 (sharp is only used by the photo-credits validator in plan 03). Will approve in plan 03 when actually invoked.
- **`pnpm dev` defaults to port 3000 but tests had to use port 3010** because port 3000 was occupied during smoke-test (another dev process). Verified routes on 3010 instead — same behavior.

## User Setup Required

None — Plausible domain placeholder (`visitisrael.site`) used in `.env.local.example`; real Plausible account creation can wait until Phase 6 production deploy. AID env vars are intentionally blank in `.env.local.example` (helpers will fall back to public URLs until plan 06 affiliate signups complete).

## Next Phase Readiness

**Ready to start in parallel (Wave 2 per ARCHITECTURE §8 DAG):**
- **Plan 02 (design tokens)** — `app/globals.css` `@theme` placeholder is empty; ESLint rule 1 (arbitrary-hex regex) is loaded and will catch any violations. Plan 02 will also create `tests/eslint-fixtures/raw-hex.tsx` + `physical-util.tsx` to confirm rules fire from CI.
- **Plan 03 (photo credits)** — `data/` directory exists; `lint-staged.config.js` is ready to receive the `photo-credits.json` validator hook; `qa:credits` script is a placeholder ready to populate.
- **Plan 04 (schema baseline)** — `lint-staged.config.js` is ready to receive the schema validator hook; `qa:schema` script is a placeholder ready to populate; `schema-dts` and `zod` are already installed.

**Notes for downstream plans:**
- Plan 02 may attempt to re-enable `eslint-plugin-tailwindcss` if v4 support has landed (currently installed but unloaded).
- Plan 06 (affiliate helpers) will create `lib/affiliate/*.ts` — the escape hatch is already configured in `eslint.config.js`.
- Plan 10 (audit dashboard) will populate `pnpm exec husky init` was already run; the pre-push hook for credits + schema is in place.

## Self-Check: PASSED

Verifications performed:

| Check | Command | Result |
|---|---|---|
| Task 1 commit exists | `git log --oneline \| grep 972c875` | FOUND |
| Task 2 RED commit exists | `git log --oneline \| grep 20cc837` | FOUND |
| Task 2 GREEN commit exists | `git log --oneline \| grep de7029a` | FOUND |
| Analytics-lock commit exists | `git log --oneline \| grep 3a97015` | FOUND |
| Task 3 commit exists | `git log --oneline \| grep babbf0e` | FOUND |
| `package.json` exists | `[ -f package.json ]` | FOUND |
| `i18n-config.ts` exports `locales` (2 entries) | grep | FOUND |
| `i18n-config.ts` exports `allowedLangs` (3 entries with 'fr') | grep | FOUND |
| `eslint.config.js` exists with no-restricted-syntax | grep | FOUND |
| `.husky/pre-commit` contains `lint-staged` | cat | FOUND |
| `.env.example` lists 11 affiliate vars | grep | FOUND (BOOKING_AID, CIVITATIS_AID, VIATOR_PID/MCID, GYG_PARTNER_ID, RENTALCARS_AID, SAFETYWING_REF, SKYSCANNER_AID, HOSTELWORLD_AID, DISCOVERCARS_AID, KLOOK_AID, GOCITY_AID + TRAVELPAYOUTS_MARKER) |
| `pnpm typecheck` | exit 0 | PASS |
| `pnpm lint` | exit 0 | PASS |
| `pnpm test --run` | 12/12 | PASS |
| `pnpm build` | exit 0 | PASS |
| HE root `/` | 200 OK | PASS |
| EN `/en` | 200 OK | PASS |
| `<html lang="he" dir="rtl">` in he.html | grep | FOUND |
| `<html lang="en" dir="ltr">` in en.html | grep | FOUND |
| Plausible script in HTML when domain env set | grep | FOUND (plausible.io/js/script.outbound-links.tagged-events.js) |
| Zero overlay scripts in `.next/` | grep -rE accessibe / userway / equalweb / audioeye | NOT FOUND (A11Y-07 PASS) |

---

*Phase: 01-foundation-m1*
*Plan: 01 (scaffold)*
*Completed: 2026-05-11*
