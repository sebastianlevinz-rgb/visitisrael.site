---
phase: 02-pilot-region-jerusalem-m2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - app/[locale]/[region]/page.tsx
  - content/en/regions/jerusalem.mdx
  - public/images/regions/jerusalem/hero.jpg
  - public/images/regions/jerusalem/old-city.jpg
  - public/images/regions/jerusalem/western-wall.jpg
  - public/images/regions/jerusalem/holy-sepulchre.jpg
  - public/images/regions/jerusalem/mahane-yehuda.jpg
  - public/images/regions/jerusalem/yad-vashem.jpg
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/jerusalem-en-canonical.test.ts
  - .planning/phases/02-pilot-region-jerusalem-m2/timing.log
autonomous: true
requirements:
  - CNT-01
  - SEO-04
  - IMG-04
  - IMG-05
must_haves:
  truths:
    - "Visiting /en/jerusalem/ returns 200 with full HTML body containing H1 'Things to Do in Jerusalem'"
    - 'Page renders RegionHero composite with priority hero image (fetchpriority=high)'
    - 'Page renders AffiliateDisclosure DOM-before the first AffiliateCard within first viewport'
    - 'Page emits TouristDestination + BreadcrumbList + FAQPage JSON-LD (inLanguage=en) that validates via scripts/qa/validate-schema.mjs'
    - 'Religious sites use paired naming (Western Wall, Temple Mount / Haram al-Sharif) on first reference; zero violations of AUD-017..AUD-020 on /en/jerusalem'
    - 'Hero and inline images all have entries in data/photo-credits.json with width>=1200; restricted-site images (Western Wall, Holy Sepulchre, Dome of the Rock) have non-null restrictedSiteAcknowledgment'
    - 'pnpm qa:audit reports REGION_CANONICAL profile score >= 85 on /en/jerusalem'
    - "timing.log entry '2.1 EN canonical: <N>min' written at end of plan for use by pilot-checkpoint"
  artifacts:
    - path: 'app/[locale]/[region]/page.tsx'
      provides: 'Dynamic RSC region renderer (reads Velite Region by slug+lang, injects JsonLd, composes RegionHero + MDX body + AffiliateDisclosure)'
      min_lines: 60
    - path: 'content/en/regions/jerusalem.mdx'
      provides: 'Jerusalem EN canonical content 1500-2500 words, 8-12 H2 sections, 5+ AffiliateCard placements'
      min_lines: 150
    - path: 'data/photo-credits.json'
      provides: '6+ new Jerusalem ledger entries; restricted-site entries with restrictedSiteAcknowledgment populated'
      contains: 'jerusalem/hero'
    - path: 'tests/content/jerusalem-en-canonical.test.ts'
      provides: 'Vitest test counting H2 sections (8-12), AffiliateCard placements (>=5), AffiliateDisclosure ordering before first AffiliateCard'
      min_lines: 30
  key_links:
    - from: 'app/[locale]/[region]/page.tsx'
      to: '.velite/regions'
      via: 'Velite-generated typed collection import'
      pattern: "from ['\"]\\.\\./.+velite|@velite|\\.velite['\"]"
    - from: 'app/[locale]/[region]/page.tsx'
      to: 'lib/schema/touristDestination + breadcrumb + faq'
      via: 'schema generator imports'
      pattern: 'from [''"]@/lib/schema[''"]'
    - from: 'content/en/regions/jerusalem.mdx'
      to: 'components/travel/AffiliateCard + WhereToStay + TransportInfo + ShabbatNotice'
      via: 'MDX component invocations'
      pattern: '<AffiliateCard|<WhereToStay|<TransportInfo|<ShabbatNotice'
    - from: 'data/photo-credits.json'
      to: 'public/images/regions/jerusalem/*'
      via: 'src field referencing each ledgered image'
      pattern: 'regions/jerusalem/'
---

<objective>
Plan 02-01 — Jerusalem EN region canonical (Wave 1).

Build the EN Jerusalem canonical (`/en/jerusalem/`) to production depth: 1500-2500 words, 8-12 H2 sections, 5+ active affiliates, schema TouristDestination + BreadcrumbList + FAQPage, hero image with priority + fetchpriority="high", restricted-site images carrying `restrictedSiteAcknowledgment`. This is the foundation content from which the HE rewrite (plan 02-02) derives. The plan also scaffolds the dynamic `app/[locale]/[region]/page.tsx` route renderer that does NOT exist after Phase 1 (Phase 1 shipped `/admin/*` routes only).

Purpose: Prove the Phase 1 infrastructure (Velite + schema generators + AffiliateCard dispatcher + photo-credits ledger + 34 AUD rules) carries a production content page end-to-end. Every subsequent Phase 2 plan rides on the renderer this plan ships.

Output: 1 route renderer + 1 MDX content file + 6 ledgered images + 1 Vitest content test + timing.log entry.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/REQUIREMENTS.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-RESEARCH.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-VALIDATION.md
@.planning/research/PITFALLS.md
@.planning/phases/01-foundation-m1/05-component-lib-SUMMARY.md
@.planning/phases/01-foundation-m1/06-affiliate-helpers-SUMMARY.md
@.planning/phases/01-foundation-m1/04-schema-baseline-SUMMARY.md
@.planning/phases/01-foundation-m1/08-seo-config-SUMMARY.md
@.planning/phases/01-foundation-m1/10-audit-dashboard-SUMMARY.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@.agents/skills/affiliate-page-generator/SKILL.md
@velite.config.ts
@app/[locale]/layout.tsx
@components/travel/RegionHero.tsx
@components/travel/AffiliateCard.tsx
@components/travel/AffiliateDisclosure.tsx
@lib/schema/index.ts
@lib/schema/touristDestination.ts
@lib/schema/breadcrumb.ts
@lib/schema/faq.ts
@lib/photo-credits-schema.ts
@data/religious-sites.json
@app/sitemap.ts

<interfaces>
<!-- Key contracts the executor consumes (extracted from Phase 1 outputs). Use as written; do NOT re-discover. -->

Velite Region collection (from velite.config.ts):

```ts
// .velite/regions.json shape (regenerated by `pnpm velite`):
type Region = {
  lang: 'he' | 'en' | 'fr';
  title: string; // 50-60 chars (Velite validates max 70)
  description: string; // 120-160 chars
  slug: string;
  region: string; // semantic region id, e.g. "jerusalem"
  publishedAt?: string;
  updatedAt?: string;
  path: string;
  body: string; // compiled MDX
};
import { regions } from '.velite'; // typed import
```

Photo credits Zod schema (from lib/photo-credits-schema.ts):

```ts
type PhotoCredit = {
  src: string; // relative path under public/images/
  author: string;
  license:
    | 'CC-BY'
    | 'CC-BY-SA'
    | 'CC0'
    | 'IGPO'
    | 'commissioned'
    | 'unsplash'
    | 'pexels';
  sourceUrl: string;
  region: string;
  slug: string; // page slug the image is used on
  width: number; // MUST be >= 1200
  height: number;
  subjectType?:
    | 'religious-site'
    | 'market'
    | 'museum'
    | 'architecture'
    | 'landscape'
    | 'street'
    | 'food';
  restrictedSiteAcknowledgment?: string; // REQUIRED when subjectType === 'religious-site' AND subject in RESTRICTED_SUBJECTS
  licenseProof?: string;
  blurDataURL?: string;
};
// Restricted subjects (Zod refines to require restrictedSiteAcknowledgment):
//   western-wall, holy-sepulchre, dome-of-the-rock, baha-i
```

Schema generators (from lib/schema/):

```ts
export function touristDestinationSchema(input: {
  name: string;
  description: string;
  geo: { latitude: number; longitude: number };
  image: string | string[];
  inLanguage: 'en' | 'he';
  url: string;
}): WithContext<TouristDestination>;

export function breadcrumbSchema(
  crumbs: Array<{ name: string; item: string }>,
): WithContext<BreadcrumbList>;

export function faqSchema(
  qa: Array<{ question: string; answer: string }>,
): WithContext<FAQPage>;
```

JsonLd RSC component (from components/JsonLd.tsx):

```tsx
<JsonLd schema={touristDestinationSchemaObj} /> // emits <script type="application/ld+json">
```

AffiliateCard (from components/travel/AffiliateCard.tsx):

```tsx
type Partner =
  | 'booking'
  | 'civitatis'
  | 'viator'
  | 'gyg'
  | 'rentalcars'
  | 'safetywing'
  | 'skyscanner'
  | 'hostelworld'
  | 'discovercars';
// klook + gocity stubs THROW NoIsraelInventoryError; do NOT use in MDX
<AffiliateCard
  partner="booking"
  data={{ city: 'Jerusalem', label: 'Find hotels in Jerusalem' }}
/>;
```

AffiliateDisclosure (must DOM-precede the first AffiliateCard):

```tsx
import { AffiliateDisclosure } from '@/components/travel/AffiliateDisclosure';
// async component; consume as: const Disclosure = await AffiliateDisclosure({});
// OR render directly when wrapper handles async.
```

Religious-naming detectors (from lib/seo/naming.ts) — auto-fire in audit, but content authors must comply:

- WAILING_WALL_REGEX (case-insensitive): use "Western Wall" only
- BIASED_FRAMING_REGEX: avoid "Judea and Samaria" etc.
- detectTempleMountPaired: "Temple Mount" must appear within 300 chars of "Haram al-Sharif" on first reference
- requiresAdministrativeStatus(slug): Bethlehem/Hebron/Jericho require admin-status frontmatter (Jerusalem canonical only MENTIONS Bethlehem in day-trips — no admin-status frontmatter needed on this page, but Bethlehem mention must include framing per PITFALLS §3.3)

religious-sites.json (from data/religious-sites.json):

- 25 entries; each has `id`, `nameEn`, `nameHe`, `nameAr`, `wikidataId`, `category`, `coordinates`, `restrictedAccess`
- Consume directly via `import sites from '@/data/religious-sites.json'`

Audit profile (from scripts/audit/profiles/region_canonical.ts):

- REGION_CANONICAL: requires schema TouristDestination + BreadcrumbList + FAQPage
- Pass threshold: score >= 85
- Detects AUD-001..034; relevant: AUD-007 (word count), AUD-009 (FTC disclosure within first viewport), AUD-012 (hero priority), AUD-017..020 (religious naming), AUD-026 (restrictedSiteAcknowledgment), AUD-031 (affiliate coverage)
  </interfaces>

<pitfalls_h_tag_template>

<!-- VERBATIM from PITFALLS.md §4.1 — H-tag scaffolding the executor MUST use. -->

H1: Things to Do in Jerusalem: A Complete Travel Guide

H2: When to Visit Jerusalem
H3: Spring (best); Summer; Autumn; Winter
H3: Shabbat & Holiday calendar (Friday afternoon-Saturday-evening closures; major Jewish/Christian/Muslim holidays)
Component: <ShabbatNotice variant="general" />

H2: Where to Stay in Jerusalem
H3: Old City vs Mamilla vs German Colony vs outside the walls
Component: <WhereToStay partner="booking" city="Jerusalem" />

H2: Top Things to Do in the Old City
H3: Western Wall (Kotel) ← NEVER "Wailing Wall"
H3: Church of the Holy Sepulchre
H3: Temple Mount / Haram al-Sharif ← PAIRED on first reference (within 300 chars)
H3: Via Dolorosa
H3: The Four Quarters (Jewish / Christian / Muslim / Armenian)

H2: Top Things to Do in West Jerusalem
H3: Mahane Yehuda Market
H3: Yad Vashem
H3: Israel Museum
H3: Mount Herzl

H2: Top Day Trips from Jerusalem
H3: Dead Sea & Masada
H3: Bethlehem (under Palestinian Authority administration — see "West Bank — practical notes" framing per PITFALLS §3.3; no canonical page in Phase 2)
H3: Tel Aviv
Component: <AffiliateCard partner="viator" data={{ city: 'Jerusalem', label: 'Day trips from Jerusalem' }} />
(or civitatis / gyg — pick ONE; PITFALLS §4.1 requires one tour-aggregator placement here)

H2: How to Get to Jerusalem
Component: <TransportInfo partner="skyscanner" /> (flights TLV)
Component: <AffiliateCard partner="rentalcars" data={{ city: 'Tel Aviv', label: 'Rent a car at TLV' }} />
(or discovercars)
Mention light rail, walking, taxis, parking

H2: Where to Eat in Jerusalem

H2: Jerusalem on Shabbat: What's Open
Component: <ShabbatNotice variant="restaurants-and-sites" />

H2: FAQ
5-10 questions; consumed by faqSchema()
</pitfalls_h_tag_template>

<image_sourcing_table>

<!-- From PITFALLS §5.4 — restricted-site sourcing guidance. -->

| Image                                                                   | Source                                       | License           | restrictedSiteAcknowledgment                                                                                                                                                   |
| ----------------------------------------------------------------------- | -------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hero.jpg (Old City rooftops or Tower of David)                          | Wikimedia Commons                            | CC-BY or CC-BY-SA | (not required — not a restricted subject)                                                                                                                                      |
| old-city.jpg (panorama)                                                 | Wikimedia Commons                            | CC-BY or CC-BY-SA | (not required)                                                                                                                                                                 |
| western-wall.jpg (plaza wide shot)                                      | IGPO archive OR Wikimedia wide architectural | CC-BY-SA / IGPO   | REQUIRED — populate with "IGPO archive image — pre-cleared per Wikimedia Israel partnership 2017" OR "Wikimedia Commons wide architectural shot — no identifiable worshippers" |
| holy-sepulchre.jpg (exterior facade)                                    | Wikimedia Commons wide architectural         | CC-BY-SA          | REQUIRED — populate per above                                                                                                                                                  |
| mahane-yehuda.jpg (market stall colors)                                 | Wikimedia Commons OR Pexels                  | CC-BY or CC0      | (not required)                                                                                                                                                                 |
| yad-vashem.jpg (entrance/museum exterior — never interior, never names) | Wikimedia Commons / IGPO                     | CC-BY-SA / IGPO   | (not required — not in restricted set but be respectful)                                                                                                                       |

All images: width >= 1200px (hero >= 1600px), JPEG or AVIF. Sharp width gate enforces.
</image_sourcing_table>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Scaffold app/[locale]/[region]/page.tsx dynamic region renderer + source 6 Jerusalem images + update photo-credits ledger</name>
  <files>
    app/[locale]/[region]/page.tsx,
    public/images/regions/jerusalem/hero.jpg,
    public/images/regions/jerusalem/old-city.jpg,
    public/images/regions/jerusalem/western-wall.jpg,
    public/images/regions/jerusalem/holy-sepulchre.jpg,
    public/images/regions/jerusalem/mahane-yehuda.jpg,
    public/images/regions/jerusalem/yad-vashem.jpg,
    data/photo-credits.json,
    tests/content/jerusalem-en-canonical.test.ts
  </files>
  <action>
Create the dynamic region renderer (Phase 1 did NOT ship this — `/admin/*` routes only).

1. **Scaffold `app/[locale]/[region]/page.tsx`** as an async RSC. Contract:
   - Signature: `export default async function RegionPage({ params }: { params: Promise<{ locale: 'he' | 'en'; region: string }> })`
   - Read Velite Region collection: `import { regions } from '.velite'`
   - Lookup by `lang === locale && region === params.region`; if missing → `notFound()` from `next/navigation`
   - Generate schemas via the 3 generators in `<interfaces>`:
     - `touristDestinationSchema({ name, description, geo: { latitude: 31.7683, longitude: 35.2137 }, image, inLanguage: locale, url })`
     - `breadcrumbSchema([{ name: 'Home', item: '/<locale-prefix>' }, { name: region.title, item: <full-url> }])` — for `he`, prefix is empty (next-intl localePrefix=as-needed); for `en`, prefix is `/en`
     - `faqSchema(faqs)` — FAQs sourced from MDX frontmatter `faqs` field if present; otherwise from a constant in the page until plan 2.1 task 2 inlines them in MDX
   - Render order in JSX:
     1. `<JsonLd schema={touristDestSchema} />`
     2. `<JsonLd schema={breadcrumbSchemaObj} />`
     3. `<JsonLd schema={faqSchemaObj} />`
     4. `<RegionHero image={region.heroImage} title={region.title} priority />`
     5. `const Disclosure = await AffiliateDisclosure({});` ; then `{Disclosure}` inserted DOM-BEFORE the body MDX content (so it precedes the first AffiliateCard — AUD-009 enforces position within first viewport)
     6. `<article><MDXContent code={region.body} /></article>` — MDX rendered via Velite's compiled body output
   - Export `generateMetadata` per `lib/seo/metadata.ts` pattern (use `generateMetadataFor({ slug, locale, title, description })` — exists from plan 08).
   - Export `generateStaticParams` enumerating Velite regions for SSG.

2. **Source 6 Jerusalem images** per `<image_sourcing_table>` above (download to `public/images/regions/jerusalem/`). Use the actual images discovered on Wikimedia Commons / IGPO archive; populate with real source URLs. Hero MUST be >=1600px width; others >=1200px. JPEG (will be served as AVIF/WebP via next/image automatically).

3. **Update `data/photo-credits.json`**: add 6 entries matching the table. For the 3 restricted-site entries (Western Wall, Holy Sepulchre — Dome of the Rock not used in this canonical), populate `restrictedSiteAcknowledgment` with the exact text shown in the table. Set `slug: "jerusalem"` and `region: "jerusalem"` on all.

4. **Run `pnpm qa:credits`** — MUST exit 0 before commit. If Sharp width gate fails, source a larger image.

5. **Vitest test scaffold** at `tests/content/jerusalem-en-canonical.test.ts`:
   - Imports Velite `regions` (after `pnpm velite` codegen — note: test will fail until MDX exists in task 2; create test scaffold marking it `it.skip` until task 2)
   - When un-skipped: asserts the jerusalem-en region body contains 8-12 `<h2>` tags, >=5 `<AffiliateCard` invocations, and AffiliateDisclosure appears at a character offset less than the first AffiliateCard offset.

Avoid: hand-rolling JSON-LD strings (use schema generators); using physical Tailwind utilities (use logical `ms-*`/`me-*`/`ps-*`/`pe-*`); fetching Velite collection via fs.readFile (use the typed `.velite` import — Velite generates that module).
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>pnpm typecheck</automated>
<automated>pnpm test --run tests/content/jerusalem-en-canonical.test.ts</automated>
<automated>pnpm lint app/[locale]/[region]/page.tsx</automated>
</verify>
<done>app/[locale]/[region]/page.tsx exists with the 7-element render order above; 6 images live in public/images/regions/jerusalem/; data/photo-credits.json has 6 new entries; pnpm qa:credits exits 0; pnpm typecheck green; Vitest test scaffold present (skipped pending MDX).</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/jerusalem.mdx 1800-2200w (mid-band) following PITFALLS §4.1 H-tag scaffolding verbatim</name>
  <files>
    content/en/regions/jerusalem.mdx,
    tests/content/jerusalem-en-canonical.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    - Test: jerusalem.mdx parses; frontmatter has lang=en, slug=jerusalem, region=jerusalem, title 50-60 chars, description 120-160 chars
    - Test: body contains H1 exactly "Things to Do in Jerusalem: A Complete Travel Guide" appearing once
    - Test: body contains 8-12 H2 sections matching the verbatim list (When to Visit / Where to Stay / Top in Old City / Top in West Jerusalem / Day Trips / How to Get / Where to Eat / Shabbat / FAQ)
    - Test: body contains >=5 distinct `<AffiliateCard partner="X"` invocations across at least 5 different partners drawn from {booking, civitatis, viator, gyg, rentalcars, discovercars, safetywing, skyscanner, hostelworld}
    - Test: body contains "Western Wall" (case-insensitive); does NOT contain "Wailing Wall" anywhere
    - Test: first reference of "Temple Mount" occurs within 300 chars of "Haram al-Sharif" (paired)
    - Test: body contains "<ShabbatNotice" at least once
    - Test: AffiliateDisclosure comes from the renderer (task 1); the MDX itself does NOT inline it
    - Test: word count between 1500 and 2500 (mid-band target 1800-2200)
    - Test: faqs frontmatter field has 5-10 entries
  </behavior>
  <action>
Invoke the `copywriting` and `affiliate-page-generator` skills before drafting. Author native EN copy (NOT translated from any source). Follow PITFALLS §4.1 H-tag scaffolding VERBATIM (see `<pitfalls_h_tag_template>` in context).

1. **Frontmatter (Velite Region collection schema — see velite.config.ts):**

   ```yaml
   ---
   lang: en
   title: 'Things to Do in Jerusalem: A Complete 2026 Guide' # 50-60 chars
   description: 'Plan your Jerusalem trip with our complete guide to the Old City, top attractions, tours, hotels, and 3-day itineraries.' # 120-160 chars
   slug: jerusalem
   region: jerusalem
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   faqs:
     - question: 'How many days should I spend in Jerusalem?'
       answer: '...'
     - question: 'Is Jerusalem safe for tourists?'
       answer: '...'
     # 5-10 total
   ---
   ```

2. **Body content rules:**
   - H1 exactly: `# Things to Do in Jerusalem: A Complete Travel Guide`
   - Follow the H2/H3 sequence in `<pitfalls_h_tag_template>` exactly
   - Primary keyword "things to do in Jerusalem" appears in H1, first paragraph, and 2-3 H2/H3 contexts
   - Secondary cluster (Jerusalem itinerary / Jerusalem hotels / Jerusalem tours / best time to visit Jerusalem) — work each into a relevant H2/H3 organically
   - Word count target: 1800-2200 (mid-band; leaves AUD-007 headroom for HE rewrite to land within 0.85-1.40 ratio)
   - Religious-naming compliance per `<interfaces>` — first reference of Temple Mount is paired with Haram al-Sharif within 300 chars
   - Bethlehem mention in day-trips section: include framing per PITFALLS §3.3 — describe as "under Palestinian Authority administration; visited via day-tour from Jerusalem; carry passport." NO canonical page link (deferred to Phase 3).
   - 5+ AffiliateCard placements drawn from at least 5 distinct real partners (NOT klook/gocity). Suggested distribution:
     - `<WhereToStay partner="booking" city="Jerusalem" />` in Where to Stay H2 (wraps booking)
     - `<AffiliateCard partner="civitatis" data={{ city: 'Jerusalem', label: 'Old City walking tours' }} />` in Old City H2
     - `<AffiliateCard partner="viator" data={{ city: 'Jerusalem', label: 'Day trips from Jerusalem' }} />` in Day Trips H2
     - `<TransportInfo partner="skyscanner" />` in How to Get H2
     - `<AffiliateCard partner="rentalcars" data={{ city: 'Tel Aviv', label: 'Rent a car at TLV' }} />` in How to Get H2 (TLV is the practical pickup)
     - `<AffiliateCard partner="safetywing" data={{ label: 'Travel insurance for Israel' }} />` near the FAQ or pre-trip section
   - `<ShabbatNotice variant="general" />` in "Jerusalem on Shabbat" H2
   - Inline images using next/image-style references resolved by MDX renderer; reference the 6 paths in `public/images/regions/jerusalem/`
   - AUD-009: AffiliateDisclosure (from task 1 renderer) appears DOM-before the first AffiliateCard — verify by inspecting page render; do NOT inline AffiliateDisclosure in MDX

3. **Update `app/sitemap.ts`**: add `/en/jerusalem` and `/jerusalem` to the static path enumeration if the sitemap is config-driven (per plan 08 SUMMARY it is — verify and add).

4. **Un-skip the Vitest test from task 1** and flesh out the 9 behavior assertions above. Use `regions` from `.velite` (will require `pnpm velite` to have run; add `prebuild` runs velite).

5. **Run validation pipeline:**

   ```
   pnpm velite               # regenerate .velite/
   pnpm qa:credits           # ledger green
   pnpm qa:schema            # JSON-LD on built page (run after pnpm build)
   pnpm qa:ner               # 0 unmonetized mentions on canonical
   pnpm build                # Next.js prerender succeeds
   pnpm qa:audit             # REGION_CANONICAL profile >= 85 on /en/jerusalem
   pnpm lint && pnpm test --run
   ```

   Specifically verify AUD-007 (word count), AUD-009 (FTC inline), AUD-012 (hero priority), AUD-017..020 (religious naming) all report 0 violations on `/en/jerusalem`.

6. **Append timing to `.planning/phases/02-pilot-region-jerusalem-m2/timing.log`**:
   ```
   2.1 EN canonical: <wall-clock-min>min
   ```
   (Used by pilot-checkpoint criterion 3 in plan 02-02.)

Avoid: literal "Wailing Wall" (AUD-017 fires); "Judea and Samaria" (AUD-018 biased framing); inline raw hex codes in any MDX style (AFF-05); hardcoding affiliate URLs (AFF-04 — MUST go through `<AffiliateCard>`); fewer than 5 distinct partners (Quality Gate criterion 4 needs ≥5 on region canonical).
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:ner</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const page=r.find(p=>p.slug==='jerusalem'&&p.lang==='en'); if(!page||page.score<85)process.exit(1); console.log('score',page.score)"</automated>
<automated>pnpm test --run tests/content/jerusalem-en-canonical.test.ts</automated>
<automated>pnpm lint && pnpm typecheck</automated>
</verify>
<done>content/en/regions/jerusalem.mdx exists with 1500-2500 words, 8-12 H2s, 5+ distinct AffiliateCard partners, 5-10 FAQ frontmatter entries; all 9 Vitest behavior assertions pass; pnpm qa:audit reports REGION_CANONICAL score >=85 on /en/jerusalem; AUD-007/009/012/017-020 all 0 violations; pnpm build succeeds; timing.log line appended.</done>
</task>

</tasks>

<verification>
- `pnpm qa:credits` exits 0 (6 new ledger entries; restricted-site fields populated)
- `pnpm qa:schema` exits 0 (TouristDestination + Breadcrumb + FAQ valid JSON-LD on built `/en/jerusalem/`)
- `pnpm qa:ner` exits 0 with 0 unmonetized mentions on `/en/jerusalem`
- `pnpm qa:audit` reports REGION_CANONICAL profile score >=85 on `/en/jerusalem`, with AUD-007/009/012/017/018/019/020/026/031 all 0 violations
- `pnpm test --run tests/content/jerusalem-en-canonical.test.ts` green (9 assertions)
- `pnpm build` succeeds prerendering `/en/jerusalem`
- `app/[locale]/[region]/page.tsx` exists and is consumed by future plans 02-02 and 02-03 (sub-dest renderer in 02-03 reuses similar shape)
- `.planning/phases/02-pilot-region-jerusalem-m2/timing.log` has the `2.1 EN canonical: <N>min` line for pilot-checkpoint consumption
</verification>

<success_criteria>
All `<verification>` items pass. `/en/jerusalem/` renders production-depth canonical with 1800-2200 words, 8-12 H2 sections, 5+ AffiliateCard placements across 5+ partners, AffiliateDisclosure DOM-before first card, schema TouristDestination + BreadcrumbList + FAQPage (inLanguage=en), hero with priority + fetchpriority=high, 6 ledgered images with restricted-site acknowledgments populated, all religious-naming AUD rules 0 violations, REGION_CANONICAL audit profile score >=85. Timing logged for pilot-checkpoint downstream.
</success_criteria>

<output>
After completion, create `.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md` summarizing:
- Route renderer scaffold (decisions on Velite import path, schema injection order, AffiliateDisclosure await pattern)
- Image sourcing decisions (Wikimedia URLs, IGPO archive entries, restrictedSiteAcknowledgment text used)
- Content authoring choices (section ordering deviations from template, FAQ topics chosen, partner mix per section)
- Audit score breakdown (per AUD rule)
- Wall-clock time (logged to timing.log)
- Any deviations from PITFALLS §4.1 template (none expected; if any, justify)
</output>
