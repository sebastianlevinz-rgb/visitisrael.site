---
phase: 01-foundation-m1
plan: 05
subsystem: ui
tags:
  [
    cva,
    component-library,
    primitives,
    composites,
    rtl,
    a11y,
    skip-nav,
    affiliate-card-stub,
    admin-playground,
    fnd-03,
    fnd-04,
    i18n-03,
    a11y-02,
    a11y-06,
  ]

requires:
  - phase: 01-foundation-m1/02-design-tokens
    provides: '3-layer @theme tokens — `--button-bg-primary`, `--card-bg`, `--color-primary`, `--color-ink`, `--color-surface*`, Hebrew font + leading scale'
  - phase: 01-foundation-m1/03-photo-credits
    provides: 'getCredit(src) — throws on missing ledger entry; consumed by RegionHero / AttractionGrid / PhotoGallery'
  - phase: 01-foundation-m1/04-schema-baseline
    provides: '<JsonLd> component + canonicalUrl() — available for plan 05 to consume on hero schema injection (not exercised in Phase 1; first applied in Phase 2)'

provides:
  - '7 UI primitives in `components/ui/` with CVA variants: Button (3×3 variant×size), Card (3), Tag (4), Badge (4), Section (semantic-as), Container (size), Grid (cols×gap)'
  - '12 travel composites in `components/travel/`: RegionHero (priority+fetchpriority IMG-04), AttractionGrid, AffiliateCard (STUB for plan 06 — disclosure DOM-precedes link AFF-06), PhotoGallery (IMG-03 sizes), StickyCTA, ItineraryCard, WhereToStay, TransportInfo, BestTimeToVisit, ShabbatNotice (STATIC; runtime widget deferred), Price (STATIC ILS+USD+EUR), AffiliateDisclosure (FTC bilingual + data-component for AUD-009)'
  - '6 layout components in `components/layout/`: Header, Footer (locale-aware accessibility-statement href via footerLinkHref export), LanguageSwitcher, SkipNav (Hebrew on HE / English on EN; first body child A11Y-02), Icon (rtl:rotate-180 directional escape hatch), Ltr (<bdo dir="ltr"> bidi isolator)'
  - 'lib/cn.ts — clsx + tailwind-merge helper; consumed by every CVA component'
  - '/admin/components — sectioned playground rendering all 20 components in LTR + RTL side-by-side; noindex/nofollow (FND-04)'
  - '/admin/components/[component] — per-component drill-down (20 entries × 2 locales = 40 static pages); noindex/nofollow'
  - 'Layout wiring: app/[locale]/layout.tsx now renders <SkipNav /> as the first body child and <Footer /> at the end (A11Y-02 first-focusable proof)'
  - 'messages/{he,en}.json now carry the `footer` namespace (navLabel, privacy, about, contact, affiliate, accessibility, copyright)'
  - 'Type export `PartnerId` from components/travel/AffiliateCard.tsx — the 9 real partners ready for plan 06 helper consumption'

affects:
  [
    06-affiliate-helpers,
    08-seo-config,
    09-ner-detection,
    10-audit-dashboard,
    11-lighthouse-ci,
    02-pilot-jerusalem (Phase 2),
  ]

tech-stack:
  added:
    - 'class-variance-authority@0.7.1 — CVA helper; clsx + tailwind-merge already in deps'
  patterns:
    - 'CVA pattern: cva(base, { variants, defaultVariants }) per primitive; tokens via `bg-[var(--…)]` bracket-class so Tailwind v4 statically extracts them; exports `xVariants` for downstream composition'
    - 'Async-component resolution at consumer: `const x = await AsyncComponent(props)` instead of `<AsyncComponent />` when JSX caller needs flat tree (non-RSC tests + admin playground use this; production RSC streams them natively). Used in AffiliateCard, Header, /admin/components route.'
    - 'Logical CSS only: `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `inset-inline-*`, `border-s-`, `text-start/end`. Px-/py-/mx-/my- are OK because v4 expands them to padding-inline / margin-inline. Physical (ml-, pr-, text-left, border-l, rounded-l, left-, right-) is BANNED in components/** (lint enforces + AST scan inside the test suite enforces twice).'
    - 'Token-only colors: bracket-class `bg-[var(--color-primary)]` / inline `style={{ color: "var(--color-ink)" }}` only. Zero `bg-[#abc]`, zero raw hex literals. Inviolable rule 1 + rule 2 enforce.'
    - 'AffiliateCard STUB contract: `href="#TODO-PLAN-06"` is a literal marker — plan 06 greps for this string and replaces with `partnerLink({...})`. Disclosure DOM-precedes the link via `await AffiliateDisclosure({})` resolution inside the async AffiliateCard component (AFF-06 proof tested with compareDocumentPosition).'
    - 'SkipNav locale resolution: `await getLocale()` from next-intl/server — works at RSC render time without a Suspense boundary. SKIP_LABEL[locale] returns Hebrew on HE, English on EN (test-verified with two locale mocks).'
    - 'Locale-aware footer link generator (`footerLinkHref(slug, locale)`) exported so plan 10 audit rule AUD-028 (accessibility-statement link presence) can directly invoke + assert.'

key-files:
  created:
    - lib/cn.ts
    - components/ui/Button.tsx
    - components/ui/Card.tsx
    - components/ui/Tag.tsx
    - components/ui/Badge.tsx
    - components/ui/Section.tsx
    - components/ui/Container.tsx
    - components/ui/Grid.tsx
    - components/travel/RegionHero.tsx
    - components/travel/AttractionGrid.tsx
    - components/travel/AffiliateCard.tsx
    - components/travel/PhotoGallery.tsx
    - components/travel/StickyCTA.tsx
    - components/travel/ItineraryCard.tsx
    - components/travel/WhereToStay.tsx
    - components/travel/TransportInfo.tsx
    - components/travel/BestTimeToVisit.tsx
    - components/travel/ShabbatNotice.tsx
    - components/travel/Price.tsx
    - components/travel/AffiliateDisclosure.tsx
    - components/layout/Header.tsx
    - components/layout/Footer.tsx
    - components/layout/LanguageSwitcher.tsx
    - components/layout/SkipNav.tsx
    - components/layout/Icon.tsx
    - components/layout/Ltr.tsx
    - app/[locale]/admin/components/page.tsx
    - app/[locale]/admin/components/[component]/page.tsx
    - components/__tests__/primitives.test.tsx
    - components/__tests__/composites.test.tsx
    - components/__tests__/skipnav.test.tsx
    - components/__tests__/form-a11y.test.tsx
    - components/__tests__/photogallery-srcset.test.tsx
    - components/__tests__/affiliatecard-stub.test.tsx
  modified:
    - app/[locale]/layout.tsx (wired SkipNav + Footer)
    - messages/he.json (added footer namespace)
    - messages/en.json (added footer namespace)
    - vitest.config.ts (include components/**/__tests__)
    - package.json (added class-variance-authority dep)
    - pnpm-lock.yaml

key-decisions:
  - "AffiliateCard ships as async function returning Promise<ReactElement>, NOT a sync component with <AffiliateDisclosure /> inside. Rationale: AffiliateDisclosure is itself async (reads locale); in React 19 RSC streaming, nesting one async component inside another's JSX is valid but does NOT auto-resolve in the test renderer or in any non-RSC consumer (admin playground page itself). Resolving inline with `await AffiliateDisclosure({})` keeps the returned tree flat — works in RSC, in tests, and in any future RSC-payload-renderer consumer. Same pattern applied to Header.tsx (`await LanguageSwitcher()`) and the admin playground page."
  - "AffiliateCard href is the literal string '#TODO-PLAN-06' (not a TODO comment). Rationale: gives plan 06 a grep-able marker — `grep -r '#TODO-PLAN-06' components/` finds every call site, and the codemod is a 1-liner. Plan 06 will swap `'#TODO-PLAN-06'` for `partnerLink({partner, destination, productId})` invocation."
  - "ShabbatNotice + Price are STATIC, no 'use client' directive. CONTEXT.md → Deferred Ideas explicitly puts the Hebcal runtime widget at DIF-V2-01 and runtime FX at Phase 6. Plan 05's job is to ship the component contract so Phase 2 region MDX can call `<ShabbatNotice closesAt='Fri 18:00' reopensAt='Sat 19:30' />` immediately."
  - "Footer's accessibility-statement link generator (`footerLinkHref`) is EXPORTED so plan 10 audit dashboard's AUD-028 rule can directly call it during scanning, rather than re-parsing the Footer component's DOM. Pattern: layout components export their URL-builder helpers."
  - "Logical CSS pattern: SkipNav uses `focus:start-2 focus:top-2` (NOT `focus:left-2`). top/bottom are direction-agnostic so they stay physical; start/end are logical. Verified by the skipnav.test.tsx 'logical positioning' test (asserts focus:start-* present AND focus:left-/focus:right- absent)."
  - "Test mocking strategy for next/image: vi.mock returns a plain <img> with all next-specific props (priority, fetchPriority, sizes, fill) projected to data-* attributes. Allows tests to assert on the IMG-04 fetchPriority='high' contract without spinning up Next.js. Single eslint-disable for @next/next/no-img-element on the mock — production code stays clean (rule still fires everywhere outside the mocks)."
  - 'RegionHero / AttractionGrid / PhotoGallery deliberately omitted from /admin/components playground (Task 3) because they require ledgered images and `data/photo-credits.json` is empty at end of Phase 1. Phase 2 region MDX exercises them with real images. Tests cover them via mocked getCredit (composites.test.tsx).'
  - 'Logical-CSS AST scan duplicated in tests (primitives.test.tsx + composites.test.tsx) on top of the ESLint Rule 4. Defense in depth: lint catches at commit time; test catches at CI time. The two layers fire on DIFFERENT regex (ESLint uses ESQuery selector against JSXAttribute Literal; tests use plain regex on file contents) so they catch different escape attempts.'
  - "Mock data for composites uses fake credit (`{author: 'Test Author', license: 'CC-BY-4.0', width: 1600, height: 900}`) via vi.mock('@/lib/photo-credits'). Real photo-credits.json is empty — the runtime contract is tested separately in plan 03; plan 05's job is render-shape verification."

patterns-established:
  - 'CVA-typed primitive pattern: file exports `xVariants` (cva instance) + `XProps` interface + `X` component using `cn(xVariants({…}), className)`. Reuse via composition; downstream pages can call `cn(buttonVariants({ variant: "ghost" }), …)` for custom contexts.'
  - 'Async-resolve-at-consumer pattern: async components return Promise<ReactElement>; their JSX consumers either await them at the top of their own function body, or are themselves async. Eliminates nested-promise-in-JSX issues entirely. Reverse-applied: if a component is `async`, its caller must be aware (typed via the return-type annotation).'
  - 'Stub-then-grep-swap pattern: plan-N component ships with a sentinel string href/marker; plan-N+1 (which owns the helper) greps the sentinel and rewrites. Avoids a forwarding-shim or a feature-flag for cross-wave coordination.'
  - "Data-component attribute for audit dashboard: every interesting component carries `data-component='kebab-name'` so plan 10's AUD scanner can find instances without parsing TSX. Today: affiliate-disclosure, affiliate-card, photo-gallery, region-hero, attraction-grid, sticky-cta, itinerary-card, where-to-stay, transport-info, best-time-to-visit, shabbat-notice, price."
  - 'Locale-aware URL-builder export: each layout helper that emits locale-conditional URLs (Footer, LanguageSwitcher in Phase 1; Phase 2 will add more) exports its builder as a named function (footerLinkHref) so audit dashboard + canonical generators can compose them directly.'

requirements-completed:
  - FND-03
  - FND-04
  - I18N-03
  - A11Y-02
requirements-partial:
  - A11Y-06
  # A11Y-06 — form-input ARIA pattern is proven by form-a11y.test.tsx (4 tests
  # covering aria-required, aria-invalid, aria-describedby, role=alert). Full
  # coverage requires plan 10 audit-dashboard rules to fire on a live form
  # surface, which doesn't exist until Phase 2.5 (contact form on accessibility
  # statement page). Phase 1 ships the pattern + the test contract.

duration: 20min
completed: 2026-05-11
---

# Phase 1 Plan 05: Component Library Summary

**25 UI components shipped — 7 CVA primitives + 12 travel composites (incl. AffiliateCard STUB awaiting plan 06) + 6 layout components — all RTL-safe via logical CSS, all token-driven via the 3-layer `@theme`, all renderable in `/admin/components` playground in both directions, with 98 new Vitest cases enforcing render + variant + AST-scan contracts on every file. SkipNav (A11Y-02) and AffiliateDisclosure (data-component for AUD-009) wired into the locale layout so every Phase 2 page picks them up automatically.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-11T01:44:47Z
- **Completed:** 2026-05-11T02:04:59Z
- **Tasks:** 3 (Task 1 + Task 2 TDD with combined commits + Task 3)
- **Files created:** 34 (1 cn helper + 7 primitives + 12 composites + 6 layout + 6 test files + 2 admin route pages)
- **Files modified:** 5 (locale layout, both messages files, vitest.config.ts, package.json)
- **Total commits:** 3 (1 per task)

## Accomplishments

- `lib/cn.ts` — typed clsx + tailwind-merge helper used by every CVA component.
- **7 UI primitives** in `components/ui/`, each with CVA variants:
  - `Button` — variant × size = 9 combinations (primary/secondary/ghost × sm/md/lg), uses `--button-bg-primary` / `--button-text-primary` / `--color-primary-hover`.
  - `Card` — 3 variants (default/elevated/interactive), `as` semantic override, consumes `--card-bg` / `--card-border`.
  - `Tag` — 4 semantic variants (neutral/success/warning/danger) using `--color-{success,warning,danger,ink-muted}`.
  - `Badge` — 4 variants tuned for inline numeric indicators.
  - `Section` — semantic `<section>` with `as` (article/div/aside/main) + `padded` toggle.
  - `Container` — `size: sm|md|lg|xl|full` max-width wrapper with mx-auto.
  - `Grid` — `cols: 1|2|3|4` × `gap: none|sm|md|lg|xl` responsive grid.
- **12 travel composites** in `components/travel/`:
  - `RegionHero` — `<Image priority fetchpriority="high" sizes="100vw">` calling `getCredit(imageSrc)`. IMG-04 component contract locked.
  - `AttractionGrid` — Grid + Card composition; each cell links to canonical attraction page.
  - `AffiliateCard` — STUB awaiting plan 06. Href is the literal string `#TODO-PLAN-06`. AffiliateDisclosure DOM-precedes the link (AFF-06 proven by `compareDocumentPosition`). Type `PartnerId` exported.
  - `PhotoGallery` — `<Image sizes={sizes}>` per item; auto-emits srcset 320/640/1024/1600w from `next.config.ts.images.deviceSizes`.
  - `StickyCTA` — fixed bottom-end of viewport (logical `inset-inline-end`) using Button under the hood.
  - `ItineraryCard` — `<Card>`-based day-by-day list.
  - `WhereToStay`, `TransportInfo`, `BestTimeToVisit` — region-content composites with affiliate-card slots stubbed for Phase 2 wiring.
  - `ShabbatNotice` — STATIC props-driven notice (no `'use client'`, no Hebcal API). Runtime widget deferred to DIF-V2-01.
  - `Price` — STATIC ILS + USD + EUR rendering via `<Ltr>` wrappers. No conversion service.
  - `AffiliateDisclosure` — bilingual FTC copy (Hebrew + English) with `role="note"` + `data-component="affiliate-disclosure"` for AUD-009.
- **6 layout components** in `components/layout/`:
  - `Header` — site name + LanguageSwitcher inside Container; `role="banner"`.
  - `Footer` — 5 locale-aware legal links (Privacy / About / Contact / Affiliate Disclosure / Accessibility Statement) + copyright; `role="contentinfo"`; exports `footerLinkHref(slug, locale)` for plan 10 AUD-028.
  - `LanguageSwitcher` — HE↔EN toggle with `hreflang` attributes + `aria-current`.
  - `SkipNav` — first body child; Hebrew text `דלג לתוכן הראשי` on HE, English `Skip to main content` on EN; targets `#main-content`; uses `focus:start-2 focus:top-2` (logical positioning, A11Y-02).
  - `Icon` — generic SVG wrapper; `directional` prop adds `rtl:rotate-180` (Tailwind variant) for chevrons/arrows; missing `label` → `aria-hidden`.
  - `Ltr` — `<bdo dir="ltr">` wrapper for phone numbers, dates, prices in Hebrew paragraphs (bidi isolation).
- **Layout wiring:** `app/[locale]/layout.tsx` now renders `<SkipNav />` as the first child of `<body>` and `<Footer />` at the end. The hard-coded inline `<a href="#main-content">` from plan 01 was replaced.
- **`/admin/components/`** — sectioned playground rendering every primitive + composite + layout component in LTR + RTL side-by-side. 16 sections (RegionHero / AttractionGrid / PhotoGallery deliberately excluded — they need real ledgered images, which arrive in Phase 2 region MDX).
- **`/admin/components/[component]/`** — per-component drill-down route. `generateStaticParams` enumerates all 20 component names → 40 static pages (20 × 2 locales). Each drill-down emits noindex metadata.
- **Vitest tests added:** 98 new test cases across 6 files (primitives 31, composites 53, skipnav 4, form-a11y 4, photogallery-srcset 2, affiliatecard-stub 4). Total project suite: **188/188 tests green** (90 baseline + 98 new).
- **Lint + typecheck + build all green.** `pnpm lint` (full repo), `pnpm lint components/`, `pnpm lint app/[locale]/admin/components/`, `pnpm typecheck`, `pnpm build` (49 static pages) — all exit 0.

## Task Commits

1. **Task 1: UI primitives + cn helper** — `14770f1` (feat) — lib/cn.ts + 7 primitives + primitives.test.tsx (31 tests).
2. **Task 2: composites + layout + tests** — `89b44e8` (feat) — 12 travel composites + 6 layout components + 5 new test files (67 new tests), layout.tsx wiring SkipNav + Footer, footer i18n keys.
3. **Task 3: /admin/components playground** — `9f09019` (feat) — sectioned index + [component] drill-down (40 generated pages); robots noindex/nofollow.

**Plan-metadata commit:** appended after this SUMMARY.md lands (covers SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md).

## Files Created/Modified

### Created (34)

**Helper**

- `lib/cn.ts`

**UI primitives (7)**

- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/Tag.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Section.tsx`
- `components/ui/Container.tsx`
- `components/ui/Grid.tsx`

**Travel composites (12)**

- `components/travel/RegionHero.tsx`
- `components/travel/AttractionGrid.tsx`
- `components/travel/AffiliateCard.tsx`
- `components/travel/PhotoGallery.tsx`
- `components/travel/StickyCTA.tsx`
- `components/travel/ItineraryCard.tsx`
- `components/travel/WhereToStay.tsx`
- `components/travel/TransportInfo.tsx`
- `components/travel/BestTimeToVisit.tsx`
- `components/travel/ShabbatNotice.tsx`
- `components/travel/Price.tsx`
- `components/travel/AffiliateDisclosure.tsx`

**Layout (6)**

- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/LanguageSwitcher.tsx`
- `components/layout/SkipNav.tsx`
- `components/layout/Icon.tsx`
- `components/layout/Ltr.tsx`

**Tests (6)**

- `components/__tests__/primitives.test.tsx`
- `components/__tests__/composites.test.tsx`
- `components/__tests__/skipnav.test.tsx`
- `components/__tests__/form-a11y.test.tsx`
- `components/__tests__/photogallery-srcset.test.tsx`
- `components/__tests__/affiliatecard-stub.test.tsx`

**Admin playground (2)**

- `app/[locale]/admin/components/page.tsx`
- `app/[locale]/admin/components/[component]/page.tsx`

### Modified (5)

- `app/[locale]/layout.tsx` — wired `<SkipNav />` + `<Footer />`; removed inline `<a href="#main-content">` from plan 01.
- `messages/he.json` — added `footer` namespace (navLabel, privacy, about, contact, affiliate, accessibility, copyright).
- `messages/en.json` — same shape, English copy.
- `vitest.config.ts` — added `components/**/__tests__/**/*.test.{ts,tsx}` to the include list.
- `package.json` — added `class-variance-authority@0.7.1` (production dependency).

## Decisions Made

1. **Async-component resolution at consumer.** AffiliateCard, Header, and the /admin/components playground all use `await AsyncComponent(props)` (function-call form) instead of `<AsyncComponent />` (JSX form) when assembling their trees. Rationale: React 19 RSC streams nested async components natively in production, but the test renderer and any non-RSC payload renderer leave them as unresolved Promises in the JSX tree. Resolving inline keeps the returned tree flat — works in RSC, tests, and any future story renderer. This is the cleanest fix for the "A suspended resource finished loading … not wrapped in act()" + "is an async Client Component" errors that surfaced during Task 2 verification.

2. **AffiliateCard STUB uses literal sentinel `#TODO-PLAN-06`.** Plan 06 will `grep -r '#TODO-PLAN-06' components/` to find every call site for the codemod. A code-comment TODO would not be grep-safe because comments get reformatted by prettier. The literal string is also covered by a Vitest assertion (`affiliatecard-stub.test.tsx`) so the plan-06 codemod fails loudly if it ever leaves a `#TODO-PLAN-06` behind.

3. **Logical CSS only, enforced at three layers.** (a) ESLint rule 4 (`no-restricted-syntax` selector against className strings — plan 02 fixture-tested). (b) Vitest AST scan inside `primitives.test.tsx` + `composites.test.tsx` regex-asserts no `\bml-\d`, `\bpl-\d`, `\btext-left\b`, `\bborder-l\b`, etc. (c) The `/admin/components` playground side-by-side LTR + RTL view gives the human reviewer a third opportunity to catch any mirror bug.

4. **Test-only `<img>` for `next/image` mock.** `vi.mock('next/image')` returns a plain `<img>` projecting `priority` / `fetchPriority` / `sizes` to `data-*` attributes. The `@next/next/no-img-element` ESLint rule is disabled with a single inline directive ONLY on the mock — production code paths keep the rule active. This lets the tests assert on the IMG-04 (`data-fetch-priority="high"`) and IMG-03 (`data-sizes` forwarding) contracts without spinning up the Next.js server.

5. **RegionHero / AttractionGrid / PhotoGallery omitted from /admin/components.** They require ledgered images and `data/photo-credits.json` is empty at the end of Phase 1 (per plan 03 — "populated in Phase 2 with Jerusalem canonical images"). Calling `getCredit('/images/jerusalem-hero.jpg')` would throw at build time. The components are still TESTED via `vi.mock('@/lib/photo-credits')` in composites.test.tsx with a synthetic credit; the playground exclusion is just a build-safety choice. Phase 2 region pages exercise them with real images.

6. **`footerLinkHref(slug, locale)` exported.** Plan 10's AUD-028 rule needs to check that every page links to the locale-correct accessibility statement (`/accessibility` on HE pages; `/en/accessibility` on EN pages). Rather than have plan 10 re-parse the Footer DOM, the helper is a named export — AUD-028 directly invokes `footerLinkHref('accessibility', 'he')` and asserts the value matches what its scanner found.

7. **SkipNav uses logical `focus:start-2 focus:top-2` (not `focus:left-2`).** Per israeli-accessibility-compliance/SKILL.md the skip nav must appear in the focus-flow corner; on HE pages that's top-right (start-2 + top-2 with `dir="rtl"` makes start-2 resolve to right), and on EN pages that's top-left. Using physical `left-2` would put it on the LEFT on both directions — wrong for HE. The test `skipnav.test.tsx > "uses logical positioning"` asserts presence of `focus:start-` AND absence of `focus:left-/focus:right-`.

8. **/admin/components playground statically generates 40 drill-down pages.** Each component × each locale. Static generation works because every component renders without client-side state (no `'use client'`). Page size: 128 B First Load JS per route (tiny — most of the JS is shared chunks). Total build output: 49 static pages (was 7 pre-plan-05).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Test renderer cannot resolve nested async RSC components**

- **Found during:** Task 2 first test run — `<Header>` test reported "A suspended resource finished loading inside a test, but the event was not wrapped in act(...)" + "<LanguageSwitcher> is an async Client Component"; `<AffiliateCard>` test reported the same.
- **Issue:** React 19 supports `<AsyncComponent />` natively in RSC streaming — `<Header>` returns JSX containing `<LanguageSwitcher />` and React figures out the await pathway. But the Vitest jsdom environment renders synchronously; nested async components stay as unresolved Promises in the JSX tree.
- **Fix:** Made AffiliateCard itself async (it was already, but now its body resolves AffiliateDisclosure inline via `await AffiliateDisclosure({})`). Made Header's JSX use `{await LanguageSwitcher()}` (function-call form) instead of `<LanguageSwitcher />` (JSX form). The admin playground page applies the same pattern (`await AffiliateCard(...)` once per instance, then renders the resolved element).
- **Files modified:** `components/travel/AffiliateCard.tsx`, `components/layout/Header.tsx`, `app/[locale]/admin/components/page.tsx`, `app/[locale]/admin/components/[component]/page.tsx`.
- **Verification:** All 98 component tests green. Production RSC stream behavior unchanged (async-as-Promise is the same payload either way; await-then-embed just resolves at render time instead of stream time).
- **Committed in:** `89b44e8` (Task 2) — caught + fixed before commit.

**2. [Rule 2 - Critical] `pnpm test --run components` was not in vitest.config.ts include list**

- **Found during:** Task 1 first test run — `components/__tests__/primitives.test.tsx` was not discovered.
- **Issue:** Plan 03 / plan 04 only included `tests/**` + `lib/**/__tests__/**`. `components/**/__tests__/**` was unspecified.
- **Fix:** Added two more patterns to `vitest.config.ts`: `components/**/__tests__/**/*.test.ts` and `components/**/__tests__/**/*.test.tsx`. Test discovery works.
- **Files modified:** `vitest.config.ts`.
- **Verification:** `pnpm test --run components/__tests__/primitives.test.tsx` discovers + runs the file.
- **Committed in:** `14770f1` (Task 1).

**3. [Rule 1 - Bug] Test mock for `next/image` triggered `@next/next/no-img-element` lint error**

- **Found during:** Task 2 lint pass after composites.test.tsx + photogallery-srcset.test.tsx landed.
- **Issue:** The `vi.mock('next/image', ...)` factory uses a plain `<img>` element so the test can inspect data-\* attributes. Production-mode ESLint correctly flags this with `@next/next/no-img-element`.
- **Fix:** Added single-line `// eslint-disable-next-line @next/next/no-img-element` directly above each `<img>` in the two test mocks (plus a comment explaining "this is a test mock; production uses next/image"). Tightly scoped — the rule still fires everywhere outside the two mocks.
- **Files modified:** `components/__tests__/composites.test.tsx`, `components/__tests__/photogallery-srcset.test.tsx`.
- **Verification:** `pnpm lint components/` exits 0.
- **Committed in:** `89b44e8` (Task 2).

**4. [Rule 1 - Bug] `import type { ReactNode } from 'next'` is not a valid export**

- **Found during:** Task 3 first typecheck run.
- **Issue:** I typed `import type { Metadata, ReactNode } from 'next'` in `app/[locale]/admin/components/page.tsx`; `Metadata` is exported from `next` but `ReactNode` is from `react`. TypeScript error TS2614.
- **Fix:** Split the import — `Metadata` from `next`, `ReactNode` from `react`.
- **Files modified:** `app/[locale]/admin/components/page.tsx`.
- **Verification:** `pnpm typecheck` exits 0.
- **Committed in:** `9f09019` (Task 3).

---

**Total deviations:** 4 auto-fixed (1 blocking, 1 critical, 2 bug). All necessary to deliver the locked must-haves. No scope creep. No architectural changes — every fix preserved the plan's design decisions (CVA + async-component + token-driven + logical-CSS).

**Plan-architecture impact:** None. The async-component-resolution-at-consumer pattern is a sharpening of a pattern that was IMPLIED by the plan (RSC + async layout components), not a new direction. Plan 06 + Phase 2 inherit this pattern unchanged.

## Issues Encountered

- **DEP0190 deprecation warning** continues from plans 02/03 (Vitest fixture spawning pnpm with `shell: true` on Windows). Unchanged here. Not in scope for plan 05.
- **CRLF line-ending warnings** on every commit. Inherited from plans 02-04; happens because lint-staged runs prettier which writes LF, then git on Windows applies CRLF. Not blocking. Cleanup target for plan 11 (full repo `.gitattributes` audit).
- **Test runtime: ~100s for the components/ folder.** Mostly environment-init overhead (jsdom). Each test runs in ~5ms; the overhead is the JSDOM bootstrap × 6 test files. Acceptable for `pnpm test --run` (single batch). Watch-mode reuse would amortize it. Not blocking.

## User Setup Required

None — every component renders without external services. To browse the playground manually:

- `pnpm dev` then visit `http://localhost:3000/admin/components` (HE) or `http://localhost:3000/en/admin/components` (EN)
- Per-component drill-down: `http://localhost:3000/admin/components/button`, `/admin/components/itinerary-card`, etc.

Both routes carry `noindex, nofollow` meta. Plan 10 (audit dashboard) adds basic-auth middleware over `/admin/*`.

## Next Phase Readiness

**Wave 3 (this plan) complete. Wave 4 (plan 06 — affiliate helpers) is now unblocked.**

**Ready for plan 06 (affiliate helpers):**

- `AffiliateCard` STUB shipped. Plan 06 swaps `href="#TODO-PLAN-06"` for `href={partnerLink({...})}` calls. Sentinel + Vitest assertion (`affiliatecard-stub.test.tsx`) ensure the swap is detectable + verifiable.
- `PartnerId` type already exports the 9 real partners — plan 06's helper signature can `import type { PartnerId } from '@/components/travel/AffiliateCard'` instead of redefining.
- `AffiliateDisclosure` ships with `data-component="affiliate-disclosure"` — plan 10 AUD-009 scanner can detect it via `[data-component='affiliate-disclosure']` CSS selector.
- `footerLinkHref(slug, locale)` is an exported named function — plan 10 AUD-028 can directly invoke + assert.

**Notes for downstream plans:**

- **Plan 06:** also needs to wire `<AffiliateCard>` rel="sponsored nofollow noopener" + target="\_blank" — already in the STUB; codemod just swaps the href.
- **Plan 08 (SEO config):** the canonical / hreflang generators should use `footerLinkHref`-like locale-aware URL builders for consistency.
- **Plan 09 (NER):** can `import { religiousSiteName } from 'data/religious-sites.json'` (plan 04) but should NOT need to read components — the entity dictionary is data-only, not component-driven.
- **Plan 10 (audit dashboard):** scan `[data-component]` attributes in built HTML rather than parsing TSX. The data-component vocabulary is now: affiliate-disclosure, affiliate-card, photo-gallery, region-hero, attraction-grid, sticky-cta, itinerary-card, where-to-stay, transport-info, best-time-to-visit, shabbat-notice, price.
- **Plan 11 (Lighthouse CI):** the `/admin/components` playground is a STABLE page — every component, all variants, both directions. Phase 6 could add it to the LHCI URL list as a smoke-screen run (catch a primitive regressing on its color contrast without waiting for a real page to surface the bug).
- **Phase 2.5 (legal pages):** Footer's accessibility-statement link points to `/accessibility` (HE) and `/en/accessibility` (EN). Those routes MUST exist by Phase 2.5 launch or AUD-028 will fire across every page.

## Self-Check

Verifications performed:

| Check                                                                                        | Command                                                                                | Result                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task 1 commit exists                                                                         | `git log --oneline                                  \| grep 14770f1`                   | FOUND                                                                                                                                                                                     |
| Task 2 commit exists                                                                         | `git log --oneline                                  \| grep 89b44e8`                   | FOUND                                                                                                                                                                                     |
| Task 3 commit exists                                                                         | `git log --oneline                                  \| grep 9f09019`                   | FOUND                                                                                                                                                                                     |
| `lib/cn.ts` exists                                                                           | `[ -f lib/cn.ts ]`                                                                     | FOUND                                                                                                                                                                                     |
| 7 UI primitive files present                                                                 | `ls components/ui/`                                                                    | FOUND (Badge, Button, Card, Container, Grid, Section, Tag)                                                                                                                                |
| 12 travel composite files present                                                            | `ls components/travel/`                                                                | FOUND (all 12: AffiliateCard, AffiliateDisclosure, AttractionGrid, BestTimeToVisit, ItineraryCard, PhotoGallery, Price, RegionHero, ShabbatNotice, StickyCTA, TransportInfo, WhereToStay) |
| 6 layout component files present                                                             | `ls components/layout/`                                                                | FOUND (Footer, Header, Icon, LanguageSwitcher, Ltr, SkipNav)                                                                                                                              |
| 6 component test files present                                                               | `ls components/__tests__/`                                                             | FOUND (affiliatecard-stub, composites, form-a11y, photogallery-srcset, primitives, skipnav)                                                                                               |
| Admin playground page exists                                                                 | `[ -f app/[locale]/admin/components/page.tsx ]`                                        | FOUND                                                                                                                                                                                     |
| Admin drill-down page exists                                                                 | `[ -f app/[locale]/admin/components/[component]/page.tsx ]`                            | FOUND                                                                                                                                                                                     |
| SkipNav wired in layout.tsx                                                                  | grep `<SkipNav />` app/[locale]/layout.tsx                                             | FOUND                                                                                                                                                                                     |
| Footer wired in layout.tsx                                                                   | grep `<Footer />` app/[locale]/layout.tsx                                              | FOUND                                                                                                                                                                                     |
| AffiliateCard stub uses `#TODO-PLAN-06`                                                      | grep `#TODO-PLAN-06` components/travel/AffiliateCard.tsx                               | FOUND                                                                                                                                                                                     |
| AffiliateDisclosure has data-component                                                       | grep `data-component="affiliate-disclosure"` components/travel/AffiliateDisclosure.tsx | FOUND                                                                                                                                                                                     |
| `pnpm typecheck` exits 0                                                                     | manual run                                                                             | PASS                                                                                                                                                                                      |
| `pnpm lint` (full repo) exits 0                                                              | manual run                                                                             | PASS                                                                                                                                                                                      |
| `pnpm lint components/` exits 0                                                              | manual run                                                                             | PASS                                                                                                                                                                                      |
| `pnpm lint app/[locale]/admin/components/` exits 0                                           | manual run                                                                             | PASS                                                                                                                                                                                      |
| `pnpm build` exits 0 with 49 static pages                                                    | manual run                                                                             | PASS                                                                                                                                                                                      |
| `pnpm test --run components` — 98/98 pass                                                    | manual run                                                                             | PASS                                                                                                                                                                                      |
| `pnpm test --run` (full suite) — 188/188 pass                                                | manual run                                                                             | PASS (90 baseline + 98 new, no regressions)                                                                                                                                               |
| `<meta name="robots" content="noindex">` present in built `/en/admin/components.html`        | grep `.next/server/app/en/admin/components.html`                                       | FOUND                                                                                                                                                                                     |
| `<meta name="robots" content="noindex">` present in built `/he/admin/components/button.html` | grep `.next/server/app/he/admin/components/button.html`                                | FOUND                                                                                                                                                                                     |
| ESLint fixture contract still fires (no regression from Wave 2)                              | `pnpm test --run tests/eslint-fixtures/fixtures.test.ts`                               | PASS (4/4)                                                                                                                                                                                |

## Self-Check: PASSED

All 23 checks pass.

---

_Phase: 01-foundation-m1_
_Plan: 05 (component-lib)_
_Completed: 2026-05-11_
