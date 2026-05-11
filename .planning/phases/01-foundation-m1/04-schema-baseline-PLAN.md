---
phase: 01-foundation-m1
plan: 04
type: execute
wave: 2
depends_on:
  - 01-scaffold
files_modified:
  - lib/schema/index.ts
  - lib/schema/types.ts
  - lib/schema/organization.ts
  - lib/schema/touristDestination.ts
  - lib/schema/touristAttraction.ts
  - lib/schema/religiousBuilding.ts
  - lib/schema/place.ts
  - lib/schema/localBusiness.ts
  - lib/schema/breadcrumb.ts
  - lib/schema/faq.ts
  - lib/schema/webSite.ts
  - lib/schema/collectionPage.ts
  - lib/schema/webPage.ts
  - components/JsonLd.tsx
  - data/religious-sites.json
  - lib/seo/canonical.ts
  - scripts/qa/validate-schema.mjs
  - package.json
  - lint-staged.config.js
  - lib/schema/__tests__/builders.test.ts
  - lib/schema/__tests__/religiousBuilding.test.ts
  - lib/schema/__tests__/breadcrumb.test.ts
  - lib/schema/__tests__/faq.test.ts
  - lib/schema/__tests__/jsonld.test.tsx
  - tests/schema/validate-schema.test.ts
  - velite.config.ts
autonomous: true
requirements:
  - SEO-01
  - SEO-02
  - SEO-03
  - SEO-05
  - SEO-06
  - I18N-06
must_haves:
  truths:
    - "11 schema generators export typed `WithContext<T>` objects from `lib/schema/index.ts`"
    - "`<JsonLd schema={...} />` RSC renders `<script type=\"application/ld+json\">` with JSON-stringified payload"
    - "`lib/seo/canonical.ts` returns self-referential URLs per locale (HE never points to EN)"
    - "`data/religious-sites.json` contains paired naming (HE/EN/AR) + Wikidata IDs for ~25 sites"
    - "`scripts/qa/validate-schema.mjs` exits NON-ZERO on malformed JSON-LD fixture; exits 0 on valid build"
    - "Velite schema asserts `title ≤ 70 chars` AND `description ∈ [120, 160] chars`"
    - "`inLanguage` field matches input lang in every generator's output"
  artifacts:
    - path: "lib/schema/index.ts"
      provides: "Barrel export for 11 generators"
      contains: "export"
    - path: "components/JsonLd.tsx"
      provides: "RSC that injects native JSON-LD script tag"
      contains: "application/ld+json"
    - path: "lib/schema/religiousBuilding.ts"
      provides: "Generator with paired-naming logic for contested sites"
      contains: "alternateName"
    - path: "data/religious-sites.json"
      provides: "HE/EN/AR + Wikidata + denomination for ~25 sites"
      contains: "Western Wall"
    - path: "lib/seo/canonical.ts"
      provides: "Self-referential canonical URL generator per locale"
      contains: "canonicalUrl"
    - path: "scripts/qa/validate-schema.mjs"
      provides: "Pre-commit / pre-push gate validating JSON-LD in built HTML"
      contains: "ld+json"
  key_links:
    - from: "lib/schema/touristDestination.ts"
      to: "lib/seo/canonical.ts"
      via: "imports canonicalUrl for @id"
      pattern: "canonicalUrl"
    - from: "lib/schema/religiousBuilding.ts"
      to: "data/religious-sites.json"
      via: "lookup by siteId"
      pattern: "religious\\["
    - from: "scripts/qa/validate-schema.mjs"
      to: "schema-dts typed shapes"
      via: "asserts required fields per @type"
      pattern: "@context"
---

<objective>
Stand up 11 typed schema-dts JSON-LD generators (Organization, TouristDestination, TouristAttraction, ReligiousBuilding, Place, LocalBusiness, BreadcrumbList, FAQPage, WebSite, CollectionPage, WebPage), the `<JsonLd>` RSC component for native injection, the paired-naming dictionary `data/religious-sites.json`, the self-referential canonical URL helper, and the pre-commit schema validator script.

Purpose: Argentina lesson #6 (schema chaos / generators-via-strings) is fixed by typing every generator to schema-dts. Religious-site dual naming (Temple Mount / Haram al-Sharif; Western Wall not Wailing Wall) is encoded via `religious-sites.json` lookup — AUD-017..AUD-020 enforcement starts here at the data layer.

Output: Working schema generators with Vitest snapshot tests, `<JsonLd>` component ready for plan 05 use in `app/[locale]/layout.tsx` and content pages, and the validator script wired into pre-push.
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
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.agents/skills/next-best-practices/SKILL.md

<interfaces>
APIs published by this plan:

```ts
// lib/schema/index.ts barrel
export { getOrganizationSchema } from './organization';
export { buildTouristDestination } from './touristDestination';
export { buildTouristAttraction } from './touristAttraction';
export { buildReligiousBuilding } from './religiousBuilding';
export { buildPlace } from './place';
export { buildLocalBusiness } from './localBusiness';
export { buildBreadcrumb } from './breadcrumb';
export { buildFAQ } from './faq';
export { buildWebSite } from './webSite';
export { buildCollectionPage } from './collectionPage';
export { buildWebPage } from './webPage';

// components/JsonLd.tsx
export function JsonLd<T extends Thing>({ schema }: { schema: WithContext<T> }): JSX.Element;

// lib/seo/canonical.ts
export function canonicalUrl(slug: string, lang: 'he' | 'en'): string;
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Build 11 schema-dts generators, `<JsonLd>` RSC, `canonicalUrl` helper</name>
  <files>lib/schema/index.ts, lib/schema/types.ts, lib/schema/organization.ts, lib/schema/touristDestination.ts, lib/schema/touristAttraction.ts, lib/schema/religiousBuilding.ts, lib/schema/place.ts, lib/schema/localBusiness.ts, lib/schema/breadcrumb.ts, lib/schema/faq.ts, lib/schema/webSite.ts, lib/schema/collectionPage.ts, lib/schema/webPage.ts, components/JsonLd.tsx, lib/seo/canonical.ts, lib/schema/__tests__/builders.test.ts, lib/schema/__tests__/jsonld.test.tsx, lib/schema/__tests__/breadcrumb.test.ts, lib/schema/__tests__/faq.test.ts</files>
  <behavior>
    - Test: Each of 11 builders produces an object with `@context: 'https://schema.org'` + correct `@type`
    - Test: Each builder's `inLanguage` field matches the input `lang`
    - Test: Each builder's `@id` includes the canonical URL produced by `canonicalUrl(slug, lang)`
    - Test: `buildTouristDestination` includes `geo.latitude` + `geo.longitude` from input
    - Test: `buildBreadcrumb` produces `itemListElement` with ≥2 items
    - Test: `buildFAQ` produces `mainEntity` of `Question[]`
    - Test: `getOrganizationSchema('he')` differs from `getOrganizationSchema('en')` (at least inLanguage + name)
    - Test: `<JsonLd schema={...}>` renders a `<script type="application/ld+json">` whose innerHTML is `JSON.stringify(schema)`
    - Test: `canonicalUrl('jerusalem', 'he')` returns `https://visitisrael.site/jerusalem` (HE = default = no prefix)
    - Test: `canonicalUrl('jerusalem', 'en')` returns `https://visitisrael.site/en/jerusalem`
    - Test: `canonicalUrl(slug, 'he') !== canonicalUrl(slug, 'en')` for any slug (never cross-locale — SEO-06)
  </behavior>
  <action>
Per RESEARCH.md §1.6:

Create `lib/seo/canonical.ts`:
```ts
import { defaultLocale, locales } from '../../i18n-config';
const ORIGIN = 'https://visitisrael.site';

export function canonicalUrl(slug: string, lang: typeof locales[number]): string {
  const cleanSlug = slug.replace(/^\//, '').replace(/\/$/, '');
  const path = lang === defaultLocale ? `/${cleanSlug}` : `/${lang}/${cleanSlug}`;
  return `${ORIGIN}${path}`.replace(/\/$/, '');
}
```

Create `components/JsonLd.tsx` VERBATIM from RESEARCH §1.6:
```tsx
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
(This is an RSC — no `'use client'`. Native injection per SEO-01.)

Create 11 schema generators in `lib/schema/`:

1. **`organization.ts`** — `getOrganizationSchema(lang)` returns `WithContext<Organization>` with name, url, inLanguage (used in root layout only per ARCHITECTURE §4.2)
2. **`touristDestination.ts`** — `buildTouristDestination(input)` per RESEARCH §1.6 verbatim example, with `geo.latitude/longitude` + `includesAttraction[]`
3. **`touristAttraction.ts`** — similar shape, no `includesAttraction`
4. **`religiousBuilding.ts`** — paired-naming logic per RESEARCH §1.6 verbatim example. For `site.contested === true`: type = 'Place' (NOT ReligiousBuilding), name = paired (`"Temple Mount / Haram al-Sharif"`); for non-contested: type = 'ReligiousBuilding', name = single. Always emit `alternateName: [HE, EN, AR]` with falsy values filtered. Use `sameAs: ['https://www.wikidata.org/wiki/Q...']` when Wikidata ID present.
5. **`place.ts`** — generic Place builder for hubs / general locations
6. **`localBusiness.ts`** — for winery/guide pages (used by GUIDE_OR_WINERY profile)
7. **`breadcrumb.ts`** — `buildBreadcrumb(pathSegments, lang)` produces `BreadcrumbList` with `itemListElement: ListItem[]` containing position + name + item URL
8. **`faq.ts`** — `buildFAQ({questions, lang})` produces `FAQPage` with `mainEntity: Question[]`, each Question has `acceptedAnswer: Answer`
9. **`webSite.ts`** — homepage-only; emits `potentialAction: SearchAction` (sitelinks searchbox)
10. **`collectionPage.ts`** — for `/regions/` and `/en/regions/` hubs
11. **`webPage.ts`** — minimal fallback for utility/legal pages

Create `lib/schema/types.ts` with shared input prop shapes (e.g., `BreadcrumbInput`, `FaqInput`, etc.) — use TS interfaces, not Zod.

Create `lib/schema/index.ts` barrel exporting all 11 + JsonLd component.

Write Vitest snapshot tests:
- `lib/schema/__tests__/builders.test.ts` — one block per builder; calls with sample input; asserts `@context`, `@type`, `inLanguage`, `@id` presence; uses `toMatchSnapshot()`
- `lib/schema/__tests__/jsonld.test.tsx` — uses `@testing-library/react` to render `<JsonLd>` and asserts script tag + content
- `lib/schema/__tests__/breadcrumb.test.ts` — focused on `itemListElement` shape (position + name + item)
- `lib/schema/__tests__/faq.test.ts` — focused on `mainEntity` Question/Answer shape

For Open Question 5 (schema-dts lagging schema.org): If a needed type/property is missing from schema-dts 1.x, use `as unknown as WithContext<T>` cast with a documented comment.
  </action>
  <verify>
    <automated>pnpm test --run lib/schema</automated>
  </verify>
  <done>All 11 generators export; snapshots committed; `<JsonLd>` renders correct script tag; `canonicalUrl` is self-referential per locale; all behavior tests pass.</done>
</task>

<task type="auto">
  <name>Task 2: Author `data/religious-sites.json` paired-naming dictionary</name>
  <files>data/religious-sites.json, lib/schema/__tests__/religiousBuilding.test.ts</files>
  <action>
Create `data/religious-sites.json` with ~25 entries covering all Phase 2 + Phase 3 religious sites. Schema per site:

```json
{
  "<siteId>": {
    "contested": <bool>,
    "name": { "he": "...", "en": "...", "ar": "..." },
    "alternateName": { "he": "...", "en": "...", "ar": "..." },
    "denomination": "<denomination or null>",
    "religion": "<religion or null>",
    "wikidataId": "<Q-number or null>",
    "administrativeStatus": "<israel-proper | east-jerusalem | west-bank-paa | west-bank-area-c | golan-heights | null>",
    "notes": "<editorial note>"
  }
}
```

Required entries (minimum 25):

**Jerusalem area:**
- `western-wall` (contested=false; name.en="Western Wall", alternateName.en="Kotel"; SEO-04: NEVER "Wailing Wall")
- `temple-mount` (contested=TRUE; name.en="Temple Mount", alternateName.en="Haram al-Sharif"; SEO-04 paired naming on first reference)
- `holy-sepulchre` (contested=false; alternateName.en="Church of the Resurrection")
- `dome-of-the-rock` (contested=false)
- `al-aqsa-mosque`
- `garden-tomb`
- `tower-of-david`
- `yad-vashem` (museum, contested=false; religion=null)
- `mount-of-olives`
- `cenacle` (contested=false; Last Supper room)
- `city-of-david`

**Nazareth/Galilee:**
- `basilica-of-annunciation` (Nazareth)
- `church-of-multiplication` (Tabgha)
- `mount-of-beatitudes`
- `capernaum`

**Bethlehem (west-bank-paa administrative status):**
- `church-of-nativity` (administrativeStatus = "west-bank-paa")

**Haifa:**
- `bahai-gardens` (contested=false; religion="Bahá'í"; SEO-04: image rights restricted per IMG-05)
- `stella-maris-monastery`

**Akko:**
- `el-jazzar-mosque`

**Tiberias:**
- `tomb-of-maimonides`

**Negev / Bedouin / Israeli sites:**
- `mount-sodom` (place)
- `masada` (place; not strictly religious but historical-religious)
- `qumran` (Dead Sea Scrolls site)

**Golan (golan-heights status):**
- `mount-bental` (administrativeStatus = "golan-heights")

Write `lib/schema/__tests__/religiousBuilding.test.ts`:
- Test: `buildReligiousBuilding({ siteId: 'temple-mount', lang: 'en' })` returns `@type: 'Place'` (contested → Place per ARCHITECTURE) with `name: 'Temple Mount / Haram al-Sharif'`
- Test: Same input with `lang: 'he'` returns `name: 'הר הבית / אל-חרם א-שריף'`
- Test: `buildReligiousBuilding({ siteId: 'western-wall', lang: 'en' })` returns `@type: 'ReligiousBuilding'` with `name: 'Western Wall'`; `alternateName` includes 'Kotel'
- Test: Unknown siteId throws `Error('Unknown religious site: ...')`
- Test: `church-of-nativity` entry has `administrativeStatus: 'west-bank-paa'` — used by AUD-020 enforcement (plan 09 will read this)

Reference for Hebrew names: use upstream `hebrew-content-writer/SKILL.md` conventions; names are SEO-04 critical.

Reference for Arabic names: use Wikidata cross-checks (e.g., الحرم القدسي الشريف for Temple Mount Arabic).
  </action>
  <verify>
    <automated>pnpm test --run lib/schema/__tests__/religiousBuilding.test.ts</automated>
  </verify>
  <done>`data/religious-sites.json` has ≥25 entries; paired-naming logic verified via Vitest; `Temple Mount / Haram al-Sharif` returned for contested site; `Western Wall` (never "Wailing Wall") for the Kotel.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Build `scripts/qa/validate-schema.mjs` pre-commit gate + Velite SEO length enforcement</name>
  <files>scripts/qa/validate-schema.mjs, package.json, lint-staged.config.js, tests/schema/validate-schema.test.ts, velite.config.ts</files>
  <behavior>
    - Test: Given a built HTML file with valid `<script type="application/ld+json">` containing a complete `TouristDestination` → script exits 0
    - Test: Given malformed JSON in the script tag → exits non-zero
    - Test: Given missing `@context` field → exits non-zero
    - Test: Given `TouristDestination` missing `name` field → exits non-zero
    - Test: Given duplicate `@id` across multiple JSON-LD blocks on same page → exits non-zero
    - Test: Given `inLanguage='he'` on `/en/jerusalem/` page → exits non-zero (locale mismatch)
    - Test: Velite collection rejects `title` of 80 chars (too long; max 70 per SEO-05)
    - Test: Velite collection rejects `description` of 100 chars (too short; min 120) AND 200 chars (too long; max 160)
  </behavior>
  <action>
Per RESEARCH.md §1.6 "scripts/qa/validate-schema.mjs outline":

Create `scripts/qa/validate-schema.mjs`:
1. Use `cheerio` or `linkedom` to parse HTML; `pnpm add -D cheerio`
2. Walk `.next/server/app/**/*.html` (Next.js 15 output) or `out/**/*.html` (if static export — Phase 1 is NOT static)
3. For each HTML file:
   - Extract every `<script type="application/ld+json">` block
   - JSON.parse → on parse error, push error
   - Assert `@context === 'https://schema.org'`
   - Assert `@type` present
   - Required fields per @type (hand-rolled table):
     - `TouristDestination` → name, description, image, geo
     - `TouristAttraction` → name, description, image
     - `ReligiousBuilding` → name
     - `BreadcrumbList` → itemListElement with ≥2 items
     - `FAQPage` → mainEntity with ≥1 Question (each with acceptedAnswer)
     - `Organization` → name, url (and only in layout output)
     - `WebSite` → name, url, potentialAction
   - Assert `@id` uniqueness across the page
   - Assert `inLanguage` matches the page's locale (parse from URL prefix: `/en/...` → 'en'; otherwise → 'he')
4. Exit non-zero with formatted error list; clean exit with `Schema validation OK (N pages, M scripts)`

Add `qa:schema` script: `"qa:schema": "node scripts/qa/validate-schema.mjs"`.

Add to `lint-staged.config.js`:
```js
'lib/schema/**/*.ts': () => 'pnpm qa:schema',
```
(Note: function form invokes regardless of staged file list; ensures schema validator runs whenever generator code changes.)

Update `.husky/pre-push` to confirm it includes `pnpm qa:schema` (already added in plan 01).

**Velite schema update (SEO-05 enforcement):**

Update `velite.config.ts` to enforce SEO-05 length constraints:
- `title: s.string().max(70)` (50-60 chars target; 70 max for SERP safety; Hebrew counted as chars not bytes)
- `description: s.string().min(120).max(160)` (meta description 120-160 chars)

For each collection (`regions`, `subDestinations`, `guides`, `legal`), confirm the title + description rules are applied. Add a test fixture (an MDX file with over-long title) to the test suite; assert Velite throws.

Create `tests/schema/validate-schema.test.ts`:
- For each behavior in the block, set up an HTML fixture in a temp dir, spawn the script as child process, assert exit code + stderr substring
- Use fixtures stored in `tests/schema/fixtures/` (commit alongside test)
  </action>
  <verify>
    <automated>pnpm test --run tests/schema/validate-schema.test.ts &amp;&amp; pnpm qa:schema</automated>
  </verify>
  <done>VALIDATION rows SEO-03, SEO-05, I18N-06 verification commands pass; all 8 behaviors green; lint-staged + pre-push hooks include schema validator.</done>
</task>

</tasks>

<verification>
End of plan 04 checks:

1. **SEO-01**: `pnpm test lib/schema --run` passes; `<JsonLd>` renders `<script type="application/ld+json">`.
2. **SEO-02**: `lib/schema/index.ts` exports all 11 generators; each produces typed `WithContext<T>` shape.
3. **SEO-03**: `pnpm qa:schema` exits non-zero on malformed fixture; clean on valid build.
4. **SEO-05**: Velite rejects over-long title / out-of-range description (length-enforcement).
5. **SEO-06**: `canonicalUrl('jerusalem', 'he')` !== `canonicalUrl('jerusalem', 'en')`; never cross-locale.
6. **I18N-06**: Velite collection `lang` enum confirmed in tests.
7. Religious-site dual naming: Temple Mount returns paired name; Western Wall never "Wailing Wall".
8. Pre-commit + pre-push hooks include `pnpm qa:schema`.
</verification>

<success_criteria>
- 11 schema generators in `lib/schema/` exporting typed `WithContext<T>` shapes
- `<JsonLd>` RSC for native JSON-LD injection
- `data/religious-sites.json` with ~25 entries (paired naming + Wikidata + administrativeStatus)
- `lib/seo/canonical.ts` returns self-referential URLs per locale
- `scripts/qa/validate-schema.mjs` validates JSON-LD shape + uniqueness + locale match
- Velite enforces title/description length per SEO-05
- All Vitest tests green (11 generator tests + paired-naming + validator script + Velite schema)
- VALIDATION rows SEO-01, SEO-02, SEO-03, SEO-05, SEO-06, I18N-06 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/04-schema-baseline-SUMMARY.md` summarizing: 11 generators wired, religious-sites.json site count, validator script command, `canonicalUrl` exported (will be consumed by plans 05, 09, 10).
</output>
