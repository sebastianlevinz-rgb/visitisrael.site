---
phase: 01-foundation-m1
plan: 05
type: execute
wave: 3
depends_on:
  - 01-scaffold
  - 02-design-tokens
  - 03-photo-credits
  - 04-schema-baseline
files_modified:
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
  - components/__tests__/affiliatecard-stub.test.tsx
  - components/__tests__/photogallery-srcset.test.tsx
autonomous: true
requirements:
  - FND-03
  - FND-04
  - I18N-03
  - A11Y-02
  - A11Y-06
must_haves:
  truths:
    - "All 7 UI primitives (Button, Card, Tag, Badge, Section, Container, Grid) export CVA-typed components"
    - "All 12 travel composites + 6 layout components render in both `dir=\"ltr\"` and `dir=\"rtl\"` without console errors"
    - "`<SkipNav>` renders Hebrew text on HE pages, English text on EN pages, and is the first focusable element (A11Y-02)"
    - "Form components emit `aria-required`, `aria-describedby`, `role=\"alert\"` for errors (A11Y-06)"
    - "`<PhotoGallery>` emits srcset `320w 640w 1024w 1600w` via `next/image` `sizes` prop"
    - "`<RegionHero>` uses `priority` + `fetchpriority=\"high\"` (IMG-04 contract â€” first applied in Phase 2)"
    - "`<AffiliateCard>` includes `<AffiliateDisclosure>` DOM-preceding the affiliate `<a>` (AFF-06 contract)"
    - "`<ShabbatNotice>` is STATIC (props-driven; runtime Hebcal API deferred to v2)"
    - "`<Price>` displays ILS+USD+EUR statically (no runtime conversion)"
    - "`/admin/components/` route renders all primitives + composites in default + edge-case states"
    - "Zero physical directional utilities in `components/**` (verified by lint)"
  artifacts:
    - path: "components/ui/Button.tsx"
      provides: "CVA Button with variant=primary|secondary|ghost, size=sm|md|lg"
      contains: "cva"
    - path: "components/travel/AffiliateCard.tsx"
      provides: "Card that consumes affiliate helper + renders FTC disclosure"
      contains: "AffiliateDisclosure"
    - path: "components/layout/SkipNav.tsx"
      provides: "First focusable element, Hebrew/English per locale, targets `#main-content`"
      contains: "×“×œ×’"
    - path: "components/travel/PhotoGallery.tsx"
      provides: "next/image-based gallery with srcset 320/640/1024/1600w"
      contains: "sizes"
    - path: "app/[locale]/admin/components/page.tsx"
      provides: "Noindex playground rendering all primitives + composites"
      contains: "robots"
  key_links:
    - from: "components/ui/Button.tsx"
      to: "tokens (--button-bg-primary)"
      via: "Tailwind CVA + var(...) references"
      pattern: "var\\(--"
    - from: "components/travel/RegionHero.tsx"
      to: "lib/photo-credits.ts (getCredit)"
      via: "credit lookup"
      pattern: "getCredit"
    - from: "components/travel/RegionHero.tsx"
      to: "next/image with priority"
      via: "fetchpriority high on hero"
      pattern: "fetchpriority"
    - from: "components/travel/AffiliateCard.tsx"
      to: "components/travel/AffiliateDisclosure.tsx"
      via: "renders disclosure DOM-precedes affiliate `<a>`"
      pattern: "AffiliateDisclosure"
---

<objective>
Ship 7 UI primitives (Button/Card/Tag/Badge/Section/Container/Grid) + 12 travel composites (RegionHero/AttractionGrid/AffiliateCard/PhotoGallery/StickyCTA/ItineraryCard/WhereToStay/TransportInfo/BestTimeToVisit/ShabbatNotice/Price/AffiliateDisclosure) + 6 layout components (Header/Footer/LanguageSwitcher/SkipNav/Icon/Ltr) with CVA-typed variants, RTL-safe markup using logical CSS only, A11Y-02 + A11Y-06 baked in, plus the `/admin/components/` noindex playground.

Purpose: Establish the component contract â€” every Phase 2+ page composes from these. No content page can introduce raw hex, physical directional utilities, or untyped variants because they consume CVA + tokens via this library.

Output: 25 components rendered in `/admin/components/` playground in both LTR and RTL, Vitest smoke tests confirming no console errors + ARIA roles + RTL safety, and the `<AffiliateCard>` stub awaiting helper integration (plan 06).
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-foundation-m1/01-CONTEXT.md
@.planning/phases/01-foundation-m1/01-RESEARCH.md
@.planning/phases/01-foundation-m1/01-VALIDATION.md
@.planning/phases/01-foundation-m1/01-scaffold-SUMMARY.md
@.planning/phases/01-foundation-m1/02-design-tokens-SUMMARY.md
@.planning/phases/01-foundation-m1/03-photo-credits-SUMMARY.md
@.planning/phases/01-foundation-m1/04-schema-baseline-SUMMARY.md
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.agents/skills/hebrew-rtl-best-practices/SKILL.md
@.agents/skills/hebrew-rtl-best-practices/references/css-logical-properties.md
@.agents/skills/hebrew-tailwind-preset/SKILL.md
@.agents/skills/israeli-accessibility-compliance/SKILL.md
@.agents/skills/next-best-practices/SKILL.md
@.agents/skills/next-best-practices/image.md
@.agents/skills/affiliate-marketing/SKILL.md
@.agents/skills/affiliate-page-generator/SKILL.md
@.agents/skills/responsive-images/references/srcset-sizes.md

<interfaces>
Existing APIs consumed by this plan:

```ts
// from lib/photo-credits.ts (plan 03)
export function getCredit(src: string): CreditEntry;  // throws on missing

// from components/JsonLd.tsx (plan 04)
export function JsonLd<T>({ schema }: { schema: WithContext<T> }): JSX.Element;

// from app/globals.css (plan 02) â€” tokens via Tailwind @theme
--color-primary, --button-bg-primary, --card-bg, --card-border, --font-hebrew, etc.

// from i18n-config (plan 01)
export const locales: readonly ['he', 'en'];
export const defaultLocale: 'he';
```

Plan 05 publishes (consumed by plan 06 + Phase 2):

```tsx
// components/ui/Button.tsx
export function Button(props: ButtonProps): JSX.Element;
// variants: primary | secondary | ghost; sizes: sm | md | lg

// components/travel/AffiliateCard.tsx (STUB â€” plan 06 wires helpers)
export function AffiliateCard(props: {
  partner: 'booking' | 'civitatis' | 'viator' | 'getYourGuide' | 'rentalcars' | 'safetyWing' | 'skyscanner' | 'hostelworld' | 'discoverCars';
  destination: string;
  productId?: string;
  label?: string;
  // ... per-partner extra props
}): JSX.Element;

// components/travel/PhotoGallery.tsx
export function PhotoGallery(props: {
  images: Array<{ src: string; alt: string }>;
  sizes: string;  // required
}): JSX.Element;

// components/layout/SkipNav.tsx
export function SkipNav(): JSX.Element;  // reads locale from next-intl, renders Hebrew or English text
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Build 7 UI primitives with CVA variants + `lib/cn.ts` helper + smoke tests</name>
  <files>lib/cn.ts, components/ui/Button.tsx, components/ui/Card.tsx, components/ui/Tag.tsx, components/ui/Badge.tsx, components/ui/Section.tsx, components/ui/Container.tsx, components/ui/Grid.tsx, components/__tests__/primitives.test.tsx</files>
  <behavior>
    - Test: `<Button variant="primary" size="md">Click</Button>` renders with `--button-bg-primary` styling (no raw hex)
    - Test: `<Button>` accepts native `onClick`, `disabled`, `type` props (extends `ButtonHTMLAttributes`)
    - Test: All primitives render without `console.error` in both `dir="ltr"` and `dir="rtl"` modes
    - Test: All primitives use ONLY logical Tailwind utilities (verified by grep â€” no `ml-`, `pr-`, `text-left`, etc.)
    - Test: `<Card>` accepts children + className; uses `--card-bg` + `--card-border` (no raw hex)
    - Test: `<Section>` semantic `<section>` element with optional `as` prop for `<article>` etc.
    - Test: `<Container>` provides max-width + horizontal padding via logical utilities (`ps-`/`pe-`)
    - Test: `<Grid>` accepts `cols={number|object}` + responsive breakpoints
  </behavior>
  <action>
Install CVA: `pnpm add class-variance-authority`.

Create `lib/cn.ts`:
```ts
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

Create all 7 primitives per RESEARCH.md Â§1.3 "Concrete steps â€” CVA example":

1. **`Button.tsx`** â€” verbatim from RESEARCH Â§1.3 (CVA: variant=primary|secondary|ghost, size=sm|md|lg; uses `bg-[var(--button-bg-primary)]` etc.). All references via `var(--...)` â€” NOT raw hex.
2. **`Card.tsx`** â€” CVA: variant=default|elevated|interactive; uses `bg-[var(--card-bg)]` + `border-[var(--card-border)]`
3. **`Tag.tsx`** â€” small pill with variant=neutral|success|warning|danger using semantic color tokens
4. **`Badge.tsx`** â€” similar to Tag but smaller/numeric
5. **`Section.tsx`** â€” semantic `<section>` with `as?: 'section'|'article'|'div'`, `padded?: boolean`
6. **`Container.tsx`** â€” max-width wrapper + logical horizontal padding (`ps-4 pe-4` becoming `mx-auto px-4` is OK since `px-` is logical-equivalent in Tailwind v4)
7. **`Grid.tsx`** â€” accepts `cols` + responsive breakpoints; uses `grid-cols-*` Tailwind utilities

CRITICAL: All className strings MUST use logical CSS utilities only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `inset-inline-start`). NO `ml-`, `pr-`, `border-l`, `text-left`, etc. (ESLint will catch but write correctly first time.)

CRITICAL: ALL color references via `var(--...)` or via Tailwind tokens that map to semantic layer. Zero raw hex.

Create `components/__tests__/primitives.test.tsx`:
- Render each primitive with `@testing-library/react`
- Snapshot tests for default + variant combinations
- Spy on `console.error`; assert zero calls during render
- For RTL: wrap render in `<div dir="rtl">` (using a custom render helper) and re-assert
- AST scan: read each file via `fs.readFileSync`; assert no match for `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, `text-right`, `border-l`, `border-r`, `rounded-l`, `rounded-r`

Reference: `hebrew-rtl-best-practices/SKILL.md` and `hebrew-tailwind-preset/references/rtl-config.md` for logical utility names.
  </action>
  <verify>
    <automated>pnpm test --run components/__tests__/primitives.test.tsx &amp;&amp; pnpm lint components/ui/</automated>
  </verify>
  <done>All 7 primitives render in both directions; CVA variants work; zero physical directional utilities; zero raw hex; tests + lint green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Build 12 travel composites + 6 layout components (incl. SkipNav, AffiliateDisclosure, PhotoGallery, RegionHero stub, AffiliateCard STUB awaiting plan 06)</name>
  <files>components/travel/RegionHero.tsx, components/travel/AttractionGrid.tsx, components/travel/AffiliateCard.tsx, components/travel/PhotoGallery.tsx, components/travel/StickyCTA.tsx, components/travel/ItineraryCard.tsx, components/travel/WhereToStay.tsx, components/travel/TransportInfo.tsx, components/travel/BestTimeToVisit.tsx, components/travel/ShabbatNotice.tsx, components/travel/Price.tsx, components/travel/AffiliateDisclosure.tsx, components/layout/Header.tsx, components/layout/Footer.tsx, components/layout/LanguageSwitcher.tsx, components/layout/SkipNav.tsx, components/layout/Icon.tsx, components/layout/Ltr.tsx, components/__tests__/composites.test.tsx, components/__tests__/skipnav.test.tsx, components/__tests__/form-a11y.test.tsx, components/__tests__/photogallery-srcset.test.tsx, components/__tests__/affiliatecard-stub.test.tsx</files>
  <behavior>
    - Test: `<SkipNav>` on HE locale renders Hebrew text "×“×œ×’ ×œ×ª×•×›×Ÿ ×”×¨××©×™"
    - Test: `<SkipNav>` on EN locale renders English "Skip to main content"
    - Test: `<SkipNav>` is the FIRST focusable element via `tabIndex={0}` and structural position
    - Test: `<SkipNav>` href is `#main-content` (which exists in layout)
    - Test: `<AffiliateDisclosure>` renders FTC-compliant copy in HE and EN
    - Test: `<AffiliateCard>` STUB renders `<AffiliateDisclosure>` BEFORE the (currently placeholder) affiliate `<a>` â€” DOM order asserted via `compareDocumentPosition`
    - Test: `<PhotoGallery images={[...]} sizes="(max-width: 768px) 100vw, 50vw">` renders `<Image>` with `sizes={sizes}`; built HTML has `srcset` with `320w 640w 1024w 1600w` (per `next.config.ts` deviceSizes)
    - Test: `<RegionHero creditId="..." title="..." />` renders `<Image priority fetchpriority="high">` and calls `getCredit(creditId)` (throw bubbles if missing)
    - Test: `<ShabbatNotice friStart="..." satEnd="...">` renders STATIC content (no API call; no `'use client'` directive)
    - Test: `<Price ils={123} usd={32} eur={29}>` renders all three statically; no client-side fetch
    - Test: `<Ltr>` wraps phone numbers etc. in `<bdo dir="ltr">`
    - Test: `<Icon directional>` adds `rtl:rotate-180` Tailwind variant
    - Test: Form component pattern (sample form) emits `aria-required`, `aria-describedby`, `role="alert"` for errors (A11Y-06)
    - Test: Zero `console.error` calls when rendering all 18 components
  </behavior>
  <action>
Per RESEARCH.md Â§1.3 and `hebrew-rtl-best-practices/SKILL.md`:

Build all 12 travel composites + 6 layout components:

**Travel composites** (in `components/travel/`):
1. **`RegionHero.tsx`** â€” props: `creditId`, `title`, `subtitle?`, `alt?`. Calls `getCredit(creditId)` to resolve the image, renders `<Image priority fetchpriority="high" sizes="100vw">`. Uses `<JsonLd>` for the schema if `schema?` prop passed.
2. **`AttractionGrid.tsx`** â€” props: `attractions: Array<{slug, name, imageSrc, alt}>`. Uses `<Grid>` primitive.
3. **`AffiliateCard.tsx`** (STUB awaiting plan 06): props: `partner`, `destination`, `productId?`, `label?`. Renders a stub `<a href="#TODO-PLAN-06">` PLUS `<AffiliateDisclosure>` DOM-preceding the link. The link is intentionally `#TODO-PLAN-06` so executing plan 06 swaps it for `bookingLink({...})` etc. Add a comment: `// TODO(plan 06): swap href for partner helper invocation`.
4. **`PhotoGallery.tsx`** â€” props: `images`, `sizes` (required string). Renders `<Image>` per item with the `sizes` prop. srcset emission is automatic via `next/image` + the deviceSizes config from plan 03.
5. **`StickyCTA.tsx`** â€” sticky-positioned button using logical `inset-inline-end-4` etc.
6. **`ItineraryCard.tsx`** â€” props: `days`, `title`, `summary`. Renders `<Card>`-based.
7. **`WhereToStay.tsx`** â€” props: `priceRange`, `neighborhoods`, `affiliateCards` (consumed in Phase 2; here stubbed).
8. **`TransportInfo.tsx`** â€” props: `airport`, `transportOptions`, `affiliateCards` (Skyscanner/RentalCars).
9. **`BestTimeToVisit.tsx`** â€” props: `months`, `seasonHighlights`. Uses Hebrew-aware month names if locale=he.
10. **`ShabbatNotice.tsx`** â€” STATIC; props: `friStart`, `satEnd`, `notes?`. Renders informational card. NO `'use client'`. NO Hebcal API call. Runtime widget deferred to v2.
11. **`Price.tsx`** â€” STATIC; props: `ils` (required), `usd?`, `eur?`. Renders all 3 in `<Ltr>` wrappers. NO conversion service. Comment: `// TODO: build-time FX update on Phase 6 cron`.
12. **`AffiliateDisclosure.tsx`** â€” FTC-compliant inline disclosure. Hebrew: "×’×™×œ×•×™ × ××•×ª: ×”×§×™×©×•×¨×™× ×©×œ×”×œ×Ÿ ×”× ×§×™×©×•×¨×™× ×©×•×ª×¤×™×. ×× ×• ×¢×©×•×™×™× ×œ×§×‘×œ ×¢×ž×œ×” ×× ×ª×–×ž×™× ×• ×“×¨×›×, ×œ×œ× ×¢×œ×•×ª × ×•×¡×¤×ª ×œ×›×." English: "Disclosure: The links below are affiliate links. We may earn a commission if you book through them, at no extra cost to you." Inline (not footer-only) per AFF-06.

**Layout components** (in `components/layout/`):
13. **`Header.tsx`** â€” top nav; uses `<LanguageSwitcher>` + main menu.
14. **`Footer.tsx`** â€” links to legal pages (Privacy, About, Contact, Affiliate Disclosure, Accessibility Statement); accessibility-statement link uses locale-aware slug (A11Y-05 â€” actual page exists in Phase 2; here the link generator is locked).
15. **`LanguageSwitcher.tsx`** â€” uses `next-intl`'s `<Link>` component with `locale` prop; preserves pathname; visually a HEâ†”EN toggle.
16. **`SkipNav.tsx`** â€” first child of `<body>`. Reads locale via `useLocale` from `next-intl`; emits Hebrew text on HE pages, English on EN. Targets `#main-content`. CSS: `sr-only focus:not-sr-only` so it's only visible when focused. Per `israeli-accessibility-compliance/SKILL.md`.
17. **`Icon.tsx`** â€” generic SVG icon wrapper; accepts `directional?: boolean` which adds `rtl:rotate-180` (Tailwind variant).
18. **`Ltr.tsx`** â€” wraps children in `<bdo dir="ltr">`; use for phone numbers, dates, prices, URLs in HE pages to prevent bidi mishaps.

CRITICAL component constraints:
- ALL components use only logical CSS utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `inset-inline-*`)
- ALL color references via `var(--...)` or Tailwind semantic-token-mapped classes
- NO `'use client'` directive unless the component genuinely needs interactivity (most should be RSC)
- All TSX files have at minimum a Vitest smoke test verifying render + zero console errors

Add `<div id="main-content">` to `app/[locale]/layout.tsx` (after `<SkipNav>`) â€” already added in plan 01, verify.

Add `<SkipNav>` as the FIRST element inside `<body>` in `app/[locale]/layout.tsx`.

Add `<Footer>` to `app/[locale]/layout.tsx`.

Create the test files per the behavior block:
- `components/__tests__/composites.test.tsx` â€” smoke tests for all 12 travel composites
- `components/__tests__/skipnav.test.tsx` â€” A11Y-02 specifics (Hebrew text, first focusable, href target)
- `components/__tests__/form-a11y.test.tsx` â€” A11Y-06 specifics (uses a sample form; asserts ARIA roles)
- `components/__tests__/photogallery-srcset.test.tsx` â€” renders, builds, checks built HTML for srcset widths
- `components/__tests__/affiliatecard-stub.test.tsx` â€” asserts AffiliateDisclosure DOM-precedes the affiliate `<a>` (AFF-06 DOM-order proof)
  </action>
  <verify>
    <automated>pnpm test --run components &amp;&amp; pnpm lint components/</automated>
  </verify>
  <done>All 18 composites + layout components render in both directions; SkipNav meets A11Y-02; AffiliateCard stub has disclosure DOM-precedence (AFF-06); PhotoGallery emits srcset; RegionHero uses priority+fetchpriority; ShabbatNotice + Price are static (no client directive); zero physical utils; zero raw hex.</done>
</task>

<task type="auto">
  <name>Task 3: Build `/admin/components/` noindex playground with all primitives + composites in default + edge-case states</name>
  <files>app/[locale]/admin/components/page.tsx, app/[locale]/admin/components/[component]/page.tsx</files>
  <action>
Per RESEARCH.md Â§1.3:

Create `app/[locale]/admin/components/page.tsx` as an RSC index that renders EVERY primitive + composite + layout component in:
- Default state
- Each variant of each variant-having primitive (Button: 3 variants Ã— 3 sizes = 9; Card: 3 variants; Tag: 4 variants; etc.)
- Edge cases: long text, empty state, error state, RTL mode (wrap a duplicate copy in `<div dir="rtl">`)
- For composites: realistic sample props (e.g., RegionHero with a placeholder image from `data/photo-credits-fixtures/valid-1600w.jpg`)

Structure: tabbed or sectioned page. Each section has a heading like "## Button" with all variants below. Designer can review the entire system visually in one scroll.

Add `<meta name="robots" content="noindex">` via:
```ts
export const metadata = { robots: { index: false, follow: false } };
```

Create `app/[locale]/admin/components/[component]/page.tsx` â€” per-component drill-down (e.g., `/admin/components/Button/`). Uses `generateStaticParams` to enumerate every component name.

The `/admin/*` basic-auth middleware is added in plan 10 (audit dashboard). At end of plan 05, the route is reachable without auth â€” fine; not in robots.txt either way.

After build, the route must work: `pnpm build && pnpm start` then visit `http://localhost:3000/en/admin/components` and `http://localhost:3000/admin/components` (HE root) â€” both render.
  </action>
  <verify>
    <!--
      Cross-platform structural gate. The full E2E curl/grep test belongs in
      GitHub Actions on ubuntu-latest (plan 11 owns the Lighthouse + a11y CI),
      not in this plan's local verify step. pnpm typecheck (run in task 2)
      already proves RSC structure; pnpm lint here proves the admin RSC routes
      are lint-clean.
    -->
    <automated>pnpm build &amp;&amp; pnpm lint app/[locale]/admin/components/</automated>
  </verify>
  <done>`/admin/components/` renders index of all primitives + composites; `/admin/components/Button/` drills into per-component view; `<meta name="robots" content="noindex">` emitted; route reachable in built output.</done>
</task>

</tasks>

<verification>
End of plan 05 checks:

1. **FND-03**: All 7 primitives + 12 travel composites + 6 layout components export and render in both directions.
2. **FND-04**: `/admin/components/` renders with noindex meta; index + drill-down routes work.
3. **I18N-03**: `pnpm lint components/` exits 0 â€” zero physical directional utilities in production code.
4. **A11Y-02**: `<SkipNav>` is first focusable; Hebrew on HE pages; English on EN; targets `#main-content`.
5. **A11Y-06**: Form sample emits `aria-required`, `aria-describedby`, `role="alert"`.
6. **AFF-06 (preparation)**: `<AffiliateCard>` STUB has `<AffiliateDisclosure>` DOM-preceding the link â€” verified by composedPosition. Production wiring + real-helper integration in plan 06.
7. **IMG-03 (component-side)**: `<PhotoGallery>` emits srcset 320/640/1024/1600w via `next/image`.
8. **IMG-04 (component-side)**: `<RegionHero>` uses `priority` + `fetchpriority="high"`; first applied in Phase 2 content.
9. All component snapshot + smoke tests green.
</verification>

<success_criteria>
- 7 primitives + 12 travel composites + 6 layout components shipped (25 components total)
- All render in both `dir="ltr"` and `dir="rtl"` without console errors
- All use logical Tailwind utilities only (zero physical directional utils)
- All use semantic tokens or component-layer tokens (zero raw hex)
- `<SkipNav>`, `<AffiliateDisclosure>`, `<PhotoGallery>`, `<RegionHero>`, `<ShabbatNotice>` (static), `<Price>` (static) all meet locked contracts
- `<AffiliateCard>` shipped as STUB; plan 06 swaps `#TODO-PLAN-06` href for real helper invocations
- `/admin/components/` playground renders all 25 components with default + edge-case states; noindex meta
- VALIDATION rows FND-03, FND-04, I18N-03, A11Y-02, A11Y-06 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/05-component-lib-SUMMARY.md` documenting: 25 components shipped, AffiliateCard awaiting plan 06 helper wiring, `<SkipNav>` Hebrew text locked, `/admin/components/` URL.
</output>
