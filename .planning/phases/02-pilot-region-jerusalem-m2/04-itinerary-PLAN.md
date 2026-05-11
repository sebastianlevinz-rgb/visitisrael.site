---
phase: 02-pilot-region-jerusalem-m2
plan: 04
type: execute
wave: 4
depends_on:
  - 02-03-sub-destinations
files_modified:
  - app/[locale]/itineraries/[slug]/page.tsx
  - velite.config.ts
  - lib/schema/itinerary.ts
  - lib/schema/index.ts
  - content/en/itineraries/3-days-in-jerusalem.mdx
  - content/he/itineraries/3-days-in-jerusalem.mdx
  - public/images/itineraries/jerusalem/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/jerusalem-itinerary.test.ts
  - tests/schema/itinerary-schema.test.ts
autonomous: true
requirements:
  - CNT-05
must_haves:
  truths:
    - 'Itinerary route at /en/itineraries/3-days-in-jerusalem/ and /itineraries/3-days-in-jerusalem/ renders 200 with TouristTrip schema (or ItemList of TouristAttraction)'
    - 'Velite has an Itinerary collection (added to velite.config.ts) with required fields durationDays, regions, startRegion'
    - 'Itinerary content has Day 1 / Day 2 / Day 3 H2 structure (durationDays=3)'
    - 'Page links to ≥3 Jerusalem sub-destinations from plan 02-03 (internal-link wiring)'
    - '≥3 AffiliateCard placements per CONTEXT.md (lodging + transport + tour minimum)'
    - 'Bethlehem mentioned in day-trips section with administrative-status framing (PITFALLS §3.3); NO link to a Bethlehem canonical (deferred to Phase 3)'
    - 'AUD-007 word count ratio HE/EN in [0.85, 1.40]'
    - 'pnpm qa:audit reports score ≥85 on both itinerary pages against GUIDE_OR_WINERY profile (planner decision: use existing profile, not new ITINERARY profile)'
    - 'lib/schema/itinerary.ts exports itinerarySchema() that produces schema-dts-typed TouristTrip with no `any`'
  artifacts:
    - path: 'app/[locale]/itineraries/[slug]/page.tsx'
      provides: 'Dynamic RSC itinerary renderer; reads Velite Itinerary by slug+lang; injects TouristTrip + BreadcrumbList schemas'
      min_lines: 60
    - path: 'lib/schema/itinerary.ts'
      provides: 'itinerarySchema(input) generator returning WithContext<TouristTrip>'
      min_lines: 40
    - path: 'velite.config.ts'
      provides: 'Itinerary collection added (durationDays + regions[] + startRegion)'
      contains: 'itineraries'
    - path: 'content/en/itineraries/3-days-in-jerusalem.mdx'
      provides: 'EN itinerary: 3-day Jerusalem itinerary with morning/afternoon/evening per day, ≥3 affiliates, internal links to ≥3 sub-dests'
      min_lines: 100
    - path: 'content/he/itineraries/3-days-in-jerusalem.mdx'
      provides: 'HE itinerary paired by slug'
      min_lines: 100
  key_links:
    - from: 'app/[locale]/itineraries/[slug]/page.tsx'
      to: 'lib/schema/itinerary.ts + breadcrumb'
      via: 'schema injection'
      pattern: 'itinerarySchema|breadcrumbSchema'
    - from: 'content/{en,he}/itineraries/3-days-in-jerusalem.mdx'
      to: '/<locale>/jerusalem/<sub-dest>/'
      via: 'Markdown link or component reference'
      pattern: '/jerusalem/(western-wall|old-city|holy-sepulchre|yad-vashem|mahane-yehuda|mount-of-olives|city-of-david)'
    - from: 'velite.config.ts'
      to: 'content/{he,en}/itineraries/**/*.mdx'
      via: 'Velite collection pattern'
      pattern: "itineraries/\\*\\*/\\*\\.mdx"
---

<objective>
Plan 02-04 — Jerusalem itinerary content (Wave 4).

Author ≥1 itinerary page (EN+HE) tying the Jerusalem canonical to its sub-destinations and to day-trip neighbors (Dead Sea, Bethlehem-flagged-with-admin-status, Tel Aviv). Selected itinerary: **"3 Days in Jerusalem"** — fits the available 7 sub-destinations from plan 02-03 (1 day Old City; 1 day West Jerusalem; 1 day day-trip), validates the BreadcrumbList + internal-link graph density.

Wave 0 work: (a) add `itineraries` collection to `velite.config.ts`; (b) build `lib/schema/itinerary.ts` generator (TouristTrip + ItemList of TouristAttraction); (c) scaffold `app/[locale]/itineraries/[slug]/page.tsx` renderer. CONTEXT.md decision: use existing GUIDE_OR_WINERY profile for audit scoring (do NOT add an ITINERARY profile yet — promote only if GUIDE feels wrong).

Purpose: Prove the internal-link graph density wiring (itinerary → sub-dests; sub-dests already breadcrumb to canonical) and exercise the third-tier audit profile (GUIDE_OR_WINERY). Demonstrates Phase 4 long-tail authoring can ride this same renderer.

Output: 1 new Velite collection + 1 new schema generator + 1 route renderer + 2 paired MDX files + 1-3 itinerary images.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-RESEARCH.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-VALIDATION.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-03-SUMMARY.md
@.planning/research/PITFALLS.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@velite.config.ts
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@lib/schema/index.ts
@lib/schema/touristAttraction.ts
@lib/schema/breadcrumb.ts
@components/travel/ItineraryCard.tsx
@content/en/regions/jerusalem.mdx
@scripts/audit/profiles/guide_or_winery.ts

<interfaces>
<!-- New Itinerary collection schema + TouristTrip generator contract. -->

Add to velite.config.ts:

```ts
const itineraries = defineCollection({
  name: 'Itinerary',
  pattern: '{he,en,fr}/itineraries/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    durationDays: s.number().int().positive(),
    regions: s.array(s.string()).min(1),
    startRegion: s.string().min(1),
  }),
});
// And include in `collections: { regions, subDestinations, guides, legal, itineraries }`
```

New schema generator lib/schema/itinerary.ts (schema-dts v2 typed):

```ts
import type { WithContext, TouristTrip, ItemList } from 'schema-dts';

export function itinerarySchema(input: {
  name: string;
  description: string;
  url: string;
  inLanguage: 'en' | 'he';
  itinerary: Array<{
    name: string;
    description: string;
    url: string;
    latitude?: number;
    longitude?: number;
  }>;
  durationDays: number;
}): WithContext<TouristTrip> {
  // Use TouristTrip with hasPart: ItemList of TouristAttraction OR Place items
  // Apply the `as unknown as WithContext<TouristTrip>` cast pattern per plan 04 decision (schema-dts v2 quirks)
}
```

Audit profile GUIDE_OR_WINERY (from scripts/audit/profiles/guide_or_winery.ts):

- Pass threshold: ≥85
- Required schema: WebPage + BreadcrumbList (loose — itinerary may use TouristTrip without breaking)
- Affiliate minimum: 3 per page (matches CONTEXT.md itinerary requirement)
- Word count band: 1200-2500 (itineraries lean longer than sub-dests)
- AUD-007 word-count parity gate still applies

Internal-link rule: itinerary MUST link to ≥3 of plan 02-03's sub-dest pages. Use markdown link syntax:

```mdx
On Day 1 morning, walk to the [Western Wall](/jerusalem/western-wall/) ...
```

NEVER hardcode the full domain — relative paths only (next/link handles locale prefix automatically).
</interfaces>

<itinerary_template>

<!-- Standard "X Days in Jerusalem" structure. Earth Trekkers reference pattern from FEATURES.md §2 Tier 3. -->

H1: 3 Days in Jerusalem: A Complete Itinerary

Intro paragraph: who this is for + Shabbat heads-up

H2: Before You Go (Practical Tips)

- Where to stay (Mamilla / German Colony / outside Old City)
- <WhereToStay partner="booking" city="Jerusalem" /> ← affiliate #1
- How to get to Jerusalem (Skyscanner flights to TLV + car/sherut/light-rail to Jerusalem)
- <TransportInfo partner="skyscanner" /> ← affiliate #2

H2: Day 1 — The Old City (full day)
H3: Morning - [Western Wall](/jerusalem/western-wall/) (1-2 hrs) - [Church of the Holy Sepulchre](/jerusalem/holy-sepulchre/) (1 hr)
H3: Afternoon - [Old City Quarters](/jerusalem/old-city/) walking tour - <AffiliateCard partner="civitatis" data={{ city: 'Jerusalem', label: 'Old City walking tour' }} /> ← affiliate #3
H3: Evening - Dinner at Mahane Yehuda area (link to [Mahane Yehuda](/jerusalem/mahane-yehuda/))

H2: Day 2 — West Jerusalem + Holocaust Memorial
H3: Morning - [Yad Vashem](/jerusalem/yad-vashem/) (3-4 hrs)
H3: Afternoon - [Israel Museum] (if Phase 4 page exists; else just narrative) - [Mount of Olives](/jerusalem/mount-of-olives/) at sunset for panorama
H3: Evening - Mahane Yehuda food tour - <AffiliateCard partner="viator" data={{ city: 'Jerusalem', label: 'Mahane Yehuda food tour' }} /> ← affiliate #4

H2: Day 3 — Day Trip Options
H3: Option A — Dead Sea & Masada (recommended) - <AffiliateCard partner="gyg" data={{ city: 'Jerusalem', label: 'Dead Sea & Masada day tour' }} /> ← affiliate #5
H3: Option B — Bethlehem - Carry passport; under Palestinian Authority administration; visited via day-tour from Jerusalem - NO direct link to a Bethlehem canonical (deferred to Phase 3 — /west-bank/bethlehem/) - Framing per PITFALLS §3.3 ("West Bank — practical notes")
H3: Option C — Tel Aviv - 1 hour by train; possible same-day return

H2: What to Skip on a 3-Day Trip

- Honest editorial: e.g., "If you only have 3 days, skip <X> in favor of <Y>"

H2: When to Visit (linked to canonical)

- One-paragraph reference; full guidance at [Jerusalem main guide](/jerusalem/)

H2: FAQ
5-7 itinerary-specific questions
</itinerary_template>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Add Itinerary collection to velite.config.ts + write lib/schema/itinerary.ts + scaffold route renderer</name>
  <files>
    velite.config.ts,
    lib/schema/itinerary.ts,
    lib/schema/index.ts,
    app/[locale]/itineraries/[slug]/page.tsx,
    tests/schema/itinerary-schema.test.ts,
    tests/content/jerusalem-itinerary.test.ts
  </files>
  <action>
**1. Add `itineraries` collection to `velite.config.ts`:**

Append the collection definition per `<interfaces>`:

```ts
const itineraries = defineCollection({
  name: 'Itinerary',
  pattern: '{he,en,fr}/itineraries/**/*.mdx',
  schema: s.object({
    ...baseFrontmatter,
    durationDays: s.number().int().positive(),
    regions: s.array(s.string()).min(1),
    startRegion: s.string().min(1),
  }),
});
```

Update the `collections` export: `{ regions, subDestinations, guides, legal, itineraries }`.

Run `pnpm velite` to verify the collection compiles cleanly (will produce empty array initially — no MDX yet — but the typed `.velite/itineraries.d.ts` must exist).

**2. Build `lib/schema/itinerary.ts`:**

Implement the contract from `<interfaces>`. Use `schema-dts` v2 types. Apply the `as unknown as WithContext<TouristTrip>` cast pattern per Phase 1 plan 04 decision.

Shape:

```ts
import type { WithContext, TouristTrip } from 'schema-dts';

export function itinerarySchema(input: {
  name: string;
  description: string;
  url: string;
  inLanguage: 'en' | 'he';
  itinerary: Array<{
    name: string;
    description: string;
    url: string;
    latitude?: number;
    longitude?: number;
  }>;
  durationDays: number;
}): WithContext<TouristTrip> {
  const trip = {
    '@context': 'https://schema.org' as const,
    '@type': 'TouristTrip' as const,
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.inLanguage,
    itinerary: input.itinerary.map((i) => ({
      '@type': 'TouristAttraction' as const,
      name: i.name,
      description: i.description,
      url: i.url,
      ...(i.latitude && i.longitude
        ? {
            geo: {
              '@type': 'GeoCoordinates' as const,
              latitude: i.latitude,
              longitude: i.longitude,
            },
          }
        : {}),
    })),
    additionalProperty: [
      {
        '@type': 'PropertyValue' as const,
        name: 'durationDays',
        value: input.durationDays,
      },
    ],
  };
  return trip as unknown as WithContext<TouristTrip>;
}
```

Add re-export to `lib/schema/index.ts` so callers can do `import { itinerarySchema } from '@/lib/schema'`.

**3. Scaffold `app/[locale]/itineraries/[slug]/page.tsx`:**

Async RSC mirroring plan 02-03's sub-dest renderer pattern:

- Read `import { itineraries } from '.velite'`
- Lookup by `lang === locale && slug === params.slug`; `notFound()` if missing
- Build TouristTrip schema via `itinerarySchema({...})` — extract the `itinerary[]` entries from the MDX body by parsing markdown links matching `/jerusalem/<short-slug>/` patterns AND/OR from a frontmatter field `stops: [{ slug, day, period }]` (planner choice — parsing markdown is fragile; frontmatter is cleaner). Recommend: add frontmatter `stops: array of objects` so the schema generator can build TouristTrip without parsing body.
- Build BreadcrumbList: Home → Itineraries (or Jerusalem) → <Itinerary>
- Render order: schemas → hero → `await AffiliateDisclosure({})` → MDX body
- `generateMetadata` + `generateStaticParams` enumerating itineraries collection

**4. Vitest test `tests/schema/itinerary-schema.test.ts`** (TDD — write before implementation):

- Test: `itinerarySchema({...})` returns valid TouristTrip with `@context: 'https://schema.org'`, `@type: 'TouristTrip'`
- Test: `itinerary` array contains TouristAttraction entries
- Test: `inLanguage` matches input
- Test: `additionalProperty` includes `durationDays`
- Test: throws or returns sensible result on empty `itinerary[]`

**5. Vitest test `tests/content/jerusalem-itinerary.test.ts`** (scaffold; un-skipped in task 2):

- Test groups for EN + HE itinerary
- Assertions per `<itinerary_template>` (Day 1/2/3 structure, ≥3 affiliates, ≥3 internal links to sub-dests, Bethlehem framing, no broken sub-dest links)

Avoid: skipping the `as unknown as WithContext<T>` cast (Phase 1 lock); parsing MDX body in the renderer to extract stops (fragile — use frontmatter); adding a new ITINERARY audit profile (CONTEXT.md says start with GUIDE_OR_WINERY; promote only if scoring misleads).
</action>
<verify>
<automated>pnpm velite</automated>
<automated>pnpm typecheck</automated>
<automated>pnpm test --run tests/schema/itinerary-schema.test.ts</automated>
<automated>pnpm lint lib/schema/itinerary.ts app/[locale]/itineraries/[slug]/page.tsx velite.config.ts</automated>
</verify>
<done>velite.config.ts has Itinerary collection registered; .velite/ regenerates without error; lib/schema/itinerary.ts exists with TouristTrip generator and `as unknown as WithContext<TouristTrip>` cast; schema test green; route renderer scaffolded with same RSC pattern as plan 02-01 + 02-03; content test scaffolded with skipped groups.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author EN + HE "3 Days in Jerusalem" itinerary MDX files</name>
  <files>
    content/en/itineraries/3-days-in-jerusalem.mdx,
    content/he/itineraries/3-days-in-jerusalem.mdx,
    public/images/itineraries/jerusalem/,
    data/photo-credits.json,
    tests/content/jerusalem-itinerary.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    For EN itinerary:
    - Test: frontmatter has lang=en, slug=3-days-in-jerusalem, durationDays=3, regions includes "jerusalem", startRegion=jerusalem
    - Test: H1 = "3 Days in Jerusalem: A Complete Itinerary"
    - Test: body has exactly 3 H2 sections matching "Day 1", "Day 2", "Day 3" (case-insensitive contains)
    - Test: body has ≥3 markdown links to /jerusalem/<sub-dest>/ paths from plan 02-03 set
    - Test: body has ≥3 <AffiliateCard partner="..." invocations across at least 3 partners (lodging + transport + tour)
    - Test: word count between 1500 and 2500
    - Test: Bethlehem mention includes "Palestinian Authority" framing (PITFALLS §3.3); NO link to /west-bank/bethlehem/ (deferred)
    - Test: GUIDE_OR_WINERY profile score ≥85
    For HE itinerary:
    - Test: frontmatter has lang=he, same slug, same durationDays/regions
    - Test: 3 H2 sections matching "יום 1", "יום 2", "יום 3"
    - Test: HE/EN word count ratio in [0.85, 1.40] (AUD-007)
    - Test: ≥3 markdown links to /jerusalem/<sub-dest>/ (paths same — next-intl handles locale prefix at link time)
    - Test: ≥3 AffiliateCard placements (same partner mix)
    - Test: ktiv maleh consistent — pnpm qa:hebrew-content green
    - Test: Bethlehem framing in Hebrew: "תחת מינהל הרשות הפלסטינית"
    - Test: GUIDE_OR_WINERY profile score ≥85 on /itineraries/3-days-in-jerusalem
  </behavior>
  <action>
**1. Author EN itinerary** following `<itinerary_template>`. Use `copywriting` + `affiliate-marketing` skills.

Frontmatter:

```yaml
---
lang: en
title: '3 Days in Jerusalem: The Complete Itinerary' # 50-60 chars
description: 'A complete 3-day Jerusalem itinerary covering the Old City, West Jerusalem, and one day-trip option, with tours, hotels, and transport tips.' # 120-160 chars
slug: 3-days-in-jerusalem
publishedAt: 2026-05-11
updatedAt: 2026-05-11
durationDays: 3
regions: [jerusalem]
startRegion: jerusalem
stops:
  - slug: jerusalem-western-wall
    day: 1
    period: morning
  - slug: jerusalem-holy-sepulchre
    day: 1
    period: morning
  - slug: jerusalem-old-city
    day: 1
    period: afternoon
  - slug: jerusalem-yad-vashem
    day: 2
    period: morning
  - slug: jerusalem-mount-of-olives
    day: 2
    period: afternoon
  - slug: jerusalem-mahane-yehuda
    day: 2
    period: evening
---
```

Body follows `<itinerary_template>` verbatim:

- 5-8 internal links to plan 02-03 sub-destination pages
- 5+ affiliate placements (canonical CONTEXT minimum is 3; aim higher to lift internal-link graph density score)
- Bethlehem mention in Day 3 Option B with `<span>Palestinian Authority</span>` framing; NO link to a Bethlehem page
- Word count 1800-2200 (mid-band of 1500-2500)

**2. Source 1-2 itinerary hero/inline images:**

- Hero: skyline shot or composite (Wikimedia)
- Optional inline: panorama from Mount of Olives or sunset over Old City
- Width ≥1200px (hero ≥1600px); ledger entries added

**3. Author HE itinerary** via `hebrew-content-writer` skill:

- Same H2/H3 structure with Hebrew labels (יום 1 / בוקר / אחר הצהריים / ערב)
- Same internal-link paths (next-intl rewrites at link time)
- Bethlehem framing in HE: "בית לחם — תחת מינהל הרשות הפלסטינית. הביאו דרכון. ביקור באמצעות סיור יום."
- Word count ≥85% of EN

**4. Update `app/sitemap.ts`** with itinerary paths.

**5. Validation:**

```
pnpm velite
pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
pnpm qa:hebrew-content
pnpm build
pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='3-days-in-jerusalem'&&p.lang==='en'); const he=r.find(p=>p.slug==='3-days-in-jerusalem'&&p.lang==='he'); if(!en||en.score<85||!he||he.score<85)process.exit(1); console.log('en',en.score,'he',he.score)"
pnpm test --run tests/content/jerusalem-itinerary.test.ts
```

**6. Internal-link integrity check:** Run `pnpm qa:audit` and inspect AUD-001 (broken-link rule) — every `/jerusalem/<sub-dest>/` link MUST resolve to an actual page. The 7 sub-dest slugs are: old-city, western-wall, holy-sepulchre, yad-vashem, mahane-yehuda, mount-of-olives, city-of-david. Quality Gate criterion 10 (0 broken internal links) is enforced.

Avoid: linking to non-existent sub-destinations (Israel Museum, Tower of David, Mount Zion are NOT in plan 02-03 set — mention by name only, no link); linking to `/west-bank/bethlehem/` (deferred to Phase 3); fewer than 3 distinct affiliate partners; missing Bethlehem admin-status framing.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='3-days-in-jerusalem'&&p.lang==='en'); const he=r.find(p=>p.slug==='3-days-in-jerusalem'&&p.lang==='he'); if(!en||en.score<85)process.exit(1); if(!he||he.score<85)process.exit(1); const ratio=he.wordCount/en.wordCount; if(ratio<0.85||ratio>1.40)process.exit(1); console.log('en',en.score,'he',he.score,'ratio',ratio.toFixed(2))"</automated>
<automated>pnpm test --run tests/content/jerusalem-itinerary.test.ts</automated>
</verify>
<done>Both itinerary MDX files exist, score ≥85 on GUIDE_OR_WINERY, AUD-007 ratio in band, ≥3 affiliates per page, ≥3 internal links to plan 02-03 sub-dests, Bethlehem admin-status framing present without canonical link, ktiv maleh consistent on HE, all behavior tests pass.</done>
</task>

</tasks>

<verification>
- `velite.config.ts` registers `itineraries` collection; `.velite/itineraries.json` regenerates without errors
- `lib/schema/itinerary.ts` exists with `itinerarySchema()` typed against schema-dts TouristTrip; unit tests green
- `app/[locale]/itineraries/[slug]/page.tsx` exists and serves both EN+HE
- Both itinerary MDX files exist at the EN and HE paths
- `pnpm qa:audit` reports GUIDE_OR_WINERY profile score ≥85 on both itinerary pages
- `pnpm qa:audit` reports AUD-001 (broken-link) = 0 violations — all internal sub-dest links resolve
- `pnpm qa:audit` reports AUD-007 (word-count parity) = 0 violations on the itinerary pair
- `pnpm qa:audit` reports AUD-031 (affiliate coverage) = ≥3 per page
- `pnpm qa:hebrew-content` exits 0
- `pnpm qa:schema` exits 0 — TouristTrip + BreadcrumbList valid on both itinerary pages
- `pnpm build` succeeds
- Vitest tests for itinerary content + schema both green
</verification>

<success_criteria>
1 itinerary page pair ("3 Days in Jerusalem") shipped at production depth: 1500-2500 words EN, ≥85% HE, ≥3 affiliates, ≥3 internal links to plan 02-03 sub-destinations, schema TouristTrip + BreadcrumbList, Bethlehem mention with admin-status framing (no link), GUIDE_OR_WINERY audit score ≥85, broken-link audit 0. The Velite Itinerary collection + lib/schema/itinerary.ts + route renderer are reusable for Phase 4 long-tail itinerary expansion.
</success_criteria>

<output>
After completion, create `.planning/phases/02-pilot-region-jerusalem-m2/02-04-SUMMARY.md` summarizing:
- Itinerary topic chosen ("3 Days in Jerusalem") + rationale
- Schema generator implementation notes (TouristTrip via schema-dts v2; cast escape hatch usage)
- Velite Itinerary collection shape decisions
- GUIDE_OR_WINERY profile fit (did it score the page sensibly; promote to ITINERARY profile in Phase 4? — note for future)
- Internal-link wiring decisions (which sub-dests linked from which day/period)
- Affiliate partner mix per day
- Audit score breakdown (EN + HE)
- Wall-clock time
- Any second itinerary considered ("7 Days in Israel anchored on Jerusalem") — note for Phase 4
</output>
