---
phase: 02-pilot-region-jerusalem-m2
plan: 03
type: execute
wave: 3
depends_on:
  - 02-01-en-canonical
  - 02-02-he-canonical
files_modified:
  - app/[locale]/[region]/[subdest]/page.tsx
  - content/en/sub-destinations/jerusalem-old-city.mdx
  - content/en/sub-destinations/jerusalem-western-wall.mdx
  - content/en/sub-destinations/jerusalem-holy-sepulchre.mdx
  - content/en/sub-destinations/jerusalem-yad-vashem.mdx
  - content/en/sub-destinations/jerusalem-mahane-yehuda.mdx
  - content/en/sub-destinations/jerusalem-mount-of-olives.mdx
  - content/en/sub-destinations/jerusalem-city-of-david.mdx
  - content/he/sub-destinations/jerusalem-old-city.mdx
  - content/he/sub-destinations/jerusalem-western-wall.mdx
  - content/he/sub-destinations/jerusalem-holy-sepulchre.mdx
  - content/he/sub-destinations/jerusalem-yad-vashem.mdx
  - content/he/sub-destinations/jerusalem-mahane-yehuda.mdx
  - content/he/sub-destinations/jerusalem-mount-of-olives.mdx
  - content/he/sub-destinations/jerusalem-city-of-david.mdx
  - public/images/sub-destinations/jerusalem/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/jerusalem-sub-destinations.test.ts
autonomous: true
requirements:
  - CNT-04
must_haves:
  truths:
    - '7 Jerusalem sub-destination pages exist in EN + 7 in HE (14 total MDX) — paired by slug'
    - 'Each sub-dest renders at /en/jerusalem/<slug>/ and /jerusalem/<slug>/ via app/[locale]/[region]/[subdest]/page.tsx'
    - 'Each page has schema TouristAttraction + BreadcrumbList; restricted sites (Western Wall, Holy Sepulchre) additionally emit ReligiousBuilding (or PlaceOfWorship per schema-dts v2)'
    - 'Each page has >=1 AffiliateCard placement'
    - 'Each page word count between 800 and 1200'
    - 'All paired EN/HE pages pass AUD-007 word-count ratio (HE/EN in [0.85, 1.40])'
    - 'BreadcrumbList resolves: <subdest> → /<locale>/jerusalem/ (parent region canonical)'
    - 'pnpm qa:audit reports SUB_DESTINATION profile score >=85 on every Jerusalem sub-dest page'
    - 'AUD-017..020 (religious naming) report 0 violations across all 14 sub-dest pages'
  artifacts:
    - path: 'app/[locale]/[region]/[subdest]/page.tsx'
      provides: 'Dynamic RSC sub-destination renderer; reads Velite SubDestination by slug+region+lang; injects TouristAttraction + Breadcrumb + (ReligiousBuilding when category=religious-site)'
      min_lines: 70
    - path: 'content/en/sub-destinations/'
      provides: '7 EN sub-destination MDX files (jerusalem-{old-city, western-wall, holy-sepulchre, yad-vashem, mahane-yehuda, mount-of-olives, city-of-david})'
    - path: 'content/he/sub-destinations/'
      provides: '7 HE sub-destination MDX files paired by slug'
    - path: 'tests/content/jerusalem-sub-destinations.test.ts'
      provides: 'Per-page Vitest assertions: word count band, ≥1 AffiliateCard, breadcrumb back to canonical, paired-naming where applicable'
      min_lines: 60
  key_links:
    - from: 'app/[locale]/[region]/[subdest]/page.tsx'
      to: 'lib/schema/touristAttraction + religiousBuilding + breadcrumb'
      via: 'schema generator imports + conditional ReligiousBuilding for restricted sites'
      pattern: 'touristAttractionSchema|religiousBuildingSchema|breadcrumbSchema'
    - from: 'content/{en,he}/sub-destinations/jerusalem-*.mdx'
      to: 'content/{en,he}/regions/jerusalem.mdx'
      via: 'BreadcrumbList parent + frontmatter parentRegion: jerusalem'
      pattern: "parentRegion:\\s*jerusalem"
    - from: 'app/[locale]/[region]/[subdest]/page.tsx'
      to: '.velite/subDestinations'
      via: 'Velite typed collection import'
      pattern: 'subDestinations.*from'
---

<objective>
Plan 02-03 — Jerusalem sub-destinations (Wave 3, runs only after pilot-checkpoint PASS).

Author 7 paired sub-destination pages (EN + HE = 14 MDX files) covering the highest-priority Jerusalem entities per PITFALLS §4.1.1 Top 30 and CONTEXT.md discretion (7±2 selection target). Each page is 800-1200 words, has TouristAttraction schema (plus ReligiousBuilding/PlaceOfWorship for the 2 restricted sites), at least 1 AffiliateCard placement, and a BreadcrumbList pointing back to `/<locale>/jerusalem/`.

Selected sub-destinations (locked by planner per CONTEXT discretion):

1. **Old City Quarters** (`jerusalem-old-city`) — overview of 4 quarters; high search volume; affiliate: walking tour
2. **Western Wall** (`jerusalem-western-wall`) — restricted-site, ReligiousBuilding schema; affiliate: nearby hotel or tour
3. **Church of the Holy Sepulchre** (`jerusalem-holy-sepulchre`) — restricted-site, ReligiousBuilding schema; affiliate: Christian-themed tour
4. **Yad Vashem** (`jerusalem-yad-vashem`) — TouristAttraction; affiliate: half-day tour
5. **Mahane Yehuda Market** (`jerusalem-mahane-yehuda`) — TouristAttraction; affiliate: food tour
6. **Mount of Olives** (`jerusalem-mount-of-olives`) — TouristAttraction; affiliate: panorama tour
7. **City of David** (`jerusalem-city-of-david`) — TouristAttraction with paired naming City of David / Silwan when discussing neighborhood; affiliate: archaeology tour

Internal parallelism: each sub-destination is an independent vertical slice (EN→HE per pair is sequential, but pairs run in parallel). The executor may parallelize the 7 pairs after the Wave 0 route renderer ships.

Purpose: Exercise the SUB_DESTINATION quality profile + ReligiousBuilding schema generator + BreadcrumbList → canonical wiring at production volume.

Output: 1 route renderer + 7 EN MDX + 7 HE MDX + 1 Vitest test + 7-14 new ledgered images.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/02-pilot-region-jerusalem-m2/02-CONTEXT.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-RESEARCH.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-VALIDATION.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-02-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/data/pilot-checkpoint.md
@.planning/research/PITFALLS.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@content/en/regions/jerusalem.mdx
@content/he/regions/jerusalem.mdx
@data/religious-sites.json
@lib/schema/touristAttraction.ts
@lib/schema/religiousBuilding.ts
@lib/schema/breadcrumb.ts
@scripts/audit/profiles/sub_destination.ts

<interfaces>
<!-- Sub-destination schema generators + Velite collection contract. -->

Velite SubDestination collection (existing in velite.config.ts):

```ts
type SubDestination = {
  lang: 'he' | 'en' | 'fr';
  title: string;
  description: string;
  slug: string; // e.g. "jerusalem-western-wall"
  region: string; // "jerusalem"
  parentRegion: string; // "jerusalem"
  publishedAt?: string;
  updatedAt?: string;
  body: string;
};
import { subDestinations } from '.velite';
```

Schema generators (from lib/schema/):

```ts
touristAttractionSchema(input: {
  name: string;
  description: string;
  image: string | string[];
  geo: { latitude: number; longitude: number };
  inLanguage: 'en' | 'he';
  url: string;
  isAccessibleForFree?: boolean;
  publicAccess?: boolean;
}): WithContext<TouristAttraction>;

// schema-dts v2: ReligiousBuilding dropped → PlaceOfWorship (plan 04 decision)
religiousBuildingSchema(input: {
  name: string;
  alternateName?: string[];   // paired names (HE / AR transliteration)
  description: string;
  image: string | string[];
  geo: { latitude: number; longitude: number };
  inLanguage: 'en' | 'he';
  url: string;
  religion?: 'Christianity' | 'Judaism' | 'Islam' | 'Baha-i';
  additionalProperty?: PropertyValue[];   // administrativeStatus etc.
}): WithContext<PlaceOfWorship>;

breadcrumbSchema(crumbs: Array<{ name: string; item: string }>);  // <subdest> → jerusalem canonical → home
```

religious-sites.json entry shape:

```json
{
  "id": "western-wall",
  "nameEn": "Western Wall",
  "nameHe": "הכותל המערבי",
  "nameAr": "حائط البراق",
  "wikidataId": "Q134821",
  "category": "religious-site", // signals: use religiousBuildingSchema
  "religion": "Judaism",
  "coordinates": { "latitude": 31.7767, "longitude": 35.2345 },
  "restrictedAccess": true, // signals: requires restrictedSiteAcknowledgment on images
  "pairedNamingRequired": false // only Temple Mount requires paired naming
}
```

SUB_DESTINATION audit profile (from scripts/audit/profiles/sub_destination.ts):

- Requires schema: TouristAttraction + BreadcrumbList (+ PlaceOfWorship/ReligiousBuilding for category=religious-site)
- Pass threshold: score >= 85
- Affiliate minimum: 1 per page (vs 5 on canonical)
- Word count band: 800-1200
- AUD-006 enforced: head-keyword + entity qualifier in H1 (e.g., "Western Wall (Kotel) — Visitor's Guide to Jerusalem's Holiest Site")
  </interfaces>

<sub_destination_h_tag_template>

<!-- Standard sub-destination scaffolding. Apply per page; planner picks specifics. -->

H1: <Entity Name> [(local-language alias)] — <qualifier> [Visitor's Guide / Travel Tips / etc.]
Examples:

- "Western Wall (Kotel) — A Visitor's Guide to Jerusalem's Holiest Site"
- "Mahane Yehuda Market — Jerusalem's Iconic Open-Air Shuk"
- "Yad Vashem — Visiting the World Holocaust Remembrance Center"

H2: What is <Entity>? [history, significance, paired naming where applicable]
H2: Visiting <Entity> Today [hours, entry fee, dress code, accessibility]
H2: Top Things to Do / See [3-7 H3 bullets]
H2: Nearby Attractions [breadcrumb links to other sub-dests]
H2: Tours of <Entity> [<AffiliateCard partner="viator/civitatis/gyg" />]
H2: Practical Tips [insurance, transport, what to bring]
H2: FAQ [3-7 questions]

Breadcrumb (rendered via BreadcrumbList schema + visible UI):
Home → Jerusalem → <Entity>
</sub_destination_h_tag_template>

<image_guidance>

<!-- Per CONTEXT.md and PITFALLS §5.4. -->

For each sub-destination: 1-2 images (hero + optional inline). Sources:

- Wikimedia Commons CC-BY/CC-BY-SA wide architectural shots
- IGPO archive for restricted sites (Western Wall, Holy Sepulchre)
- DO NOT commission new shoots
- Width >=1200px (Sharp gate enforces); hero >=1600px

Restricted sites (Western Wall, Holy Sepulchre) MUST have `restrictedSiteAcknowledgment` populated. Reuse text patterns from plan 02-01 ledger.
</image_guidance>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Scaffold app/[locale]/[region]/[subdest]/page.tsx + write Vitest test scaffold</name>
  <files>
    app/[locale]/[region]/[subdest]/page.tsx,
    tests/content/jerusalem-sub-destinations.test.ts
  </files>
  <action>
Create the dynamic sub-destination route renderer (Phase 1 + plan 02-01 did NOT ship this).

1. **Scaffold `app/[locale]/[region]/[subdest]/page.tsx`** as async RSC. Mirror plan 02-01's region renderer pattern.
   - Signature: `export default async function SubDestinationPage({ params }: { params: Promise<{ locale: 'he' | 'en'; region: string; subdest: string }> })`
   - Read `import { subDestinations } from '.velite'`
   - Lookup: `lang === locale && region === params.region && slug === <full-slug>` where full-slug includes the region prefix (e.g., `jerusalem-western-wall`); if missing → `notFound()`
   - Match the sub-dest to `data/religious-sites.json` by deriving entity id (e.g., slug `jerusalem-western-wall` → `western-wall`); if found, treat as religious-site (emit PlaceOfWorship/ReligiousBuilding schema in addition to TouristAttraction)
   - Schema injection order:
     1. `<JsonLd schema={touristAttractionSchema({ ..., inLanguage: locale })} />`
     2. If religious-site: `<JsonLd schema={religiousBuildingSchema({ name, alternateName: [nameHe, nameAr-transliteration].filter(Boolean), religion, ..., inLanguage: locale })} />`
     3. `<JsonLd schema={breadcrumbSchema([{ name: 'Home', item: '/<locale-prefix>' }, { name: 'Jerusalem', item: '/<locale-prefix>/jerusalem' }, { name: title, item: '/<locale-prefix>/jerusalem/<short-slug>' }])} />`
   - Render order: schemas → `<RegionHero>` (sub-dest hero, NOT priority — sub-dest pages are deeper-funnel, hero priority reserved for canonical) → `const Disclosure = await AffiliateDisclosure({}); {Disclosure}` (still required because sub-dests carry affiliate placements) → MDX body
   - Export `generateMetadata` and `generateStaticParams` enumerating all sub-dest entries from Velite

2. **Decision:** sub-dest slugs are stored as `jerusalem-western-wall` (region-prefixed) in Velite to keep collection flat, but the URL path uses just `/jerusalem/western-wall/`. The renderer derives the short slug by stripping `^jerusalem-` from the Velite slug for routing. Document this in code comment.

3. **Vitest test scaffold** at `tests/content/jerusalem-sub-destinations.test.ts`:
   - 7 paired test groups (one per sub-dest)
   - Each group asserts: word count 800-1200, ≥1 AffiliateCard match, BreadcrumbList contains parent jerusalem, religious-naming compliance (per-page applicable), HE/EN ratio in [0.85, 1.40], AUD-006 H1 has entity + qualifier
   - Initial state: `it.skip` until task 2-N content ships; un-skip incrementally
   - Helper: `function expectSubDest(slug: string, lang: 'en'|'he', isReligiousSite: boolean)`

Avoid: re-implementing route renderer logic differently from plan 02-01 (mirror the pattern; consistency matters for plan-checker); using physical Tailwind utilities; emitting ReligiousBuilding for non-religious-site sub-dests (Mahane Yehuda, Yad Vashem are NOT in religious-sites.json — TouristAttraction only).
</action>
<verify>
<automated>pnpm typecheck</automated>
<automated>pnpm lint app/[locale]/[region]/[subdest]/page.tsx</automated>
<automated>test -f tests/content/jerusalem-sub-destinations.test.ts</automated>
</verify>
<done>app/[locale]/[region]/[subdest]/page.tsx exists with parameterized signature, dual schema injection for religious-site sub-dests, Velite typed import; Vitest test scaffold with 7 skipped test groups present.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author 7 EN sub-destination MDX files (parallel-eligible per pair) + source images + update ledger</name>
  <files>
    content/en/sub-destinations/jerusalem-old-city.mdx,
    content/en/sub-destinations/jerusalem-western-wall.mdx,
    content/en/sub-destinations/jerusalem-holy-sepulchre.mdx,
    content/en/sub-destinations/jerusalem-yad-vashem.mdx,
    content/en/sub-destinations/jerusalem-mahane-yehuda.mdx,
    content/en/sub-destinations/jerusalem-mount-of-olives.mdx,
    content/en/sub-destinations/jerusalem-city-of-david.mdx,
    public/images/sub-destinations/jerusalem/,
    data/photo-credits.json,
    tests/content/jerusalem-sub-destinations.test.ts
  </files>
  <behavior>
    For EACH of the 7 EN sub-destinations:
    - Test: frontmatter has lang=en, slug=jerusalem-<short>, region=jerusalem, parentRegion=jerusalem, title 50-60 chars, description 120-160 chars
    - Test: H1 contains the entity name + qualifier (AUD-006); H1 appears exactly once
    - Test: word count between 800 and 1200
    - Test: ≥1 `<AffiliateCard partner="X"` invocation
    - Test: For religious-sites (western-wall, holy-sepulchre): hero image has restrictedSiteAcknowledgment in credits ledger
    - Test: For western-wall: contains "Western Wall" + parenthetical "(Kotel)"; does NOT contain "Wailing Wall"
    - Test: For city-of-david: discusses both archaeology AND neighborhood Silwan — paired naming applies when neighborhood discussed
    - Test: For mahane-yehuda: TouristAttraction only (NOT religious-site); affiliate is food tour partner
    - Test: For yad-vashem: respectful tone; no inline AffiliateDisclosure on this specific page if affiliate is omitted out of editorial sensitivity (planner decision: keep ≥1 affiliate but place it in "Practical Tips" not "Tours" — Yad Vashem itself is free; affiliate is e.g., insurance or guided half-day tour)
  </behavior>
  <action>
Invoke `copywriting` skill for headlines/CTAs and `affiliate-marketing` skill for partner-mix choice. Author 7 EN sub-destination MDX files following `<sub_destination_h_tag_template>`.

**Per-page authoring rules:**

1. **Frontmatter:**

   ```yaml
   ---
   lang: en
   title: '<entity> — <qualifier>' # 50-60 chars
   description: '...' # 120-160 chars
   slug: jerusalem-<short> # e.g. jerusalem-western-wall
   region: jerusalem
   parentRegion: jerusalem
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   ---
   ```

2. **Body content rules:**
   - 800-1200 words
   - H1 per AUD-006: `<Entity> [(local alias)] — <qualifier>`
   - Follow `<sub_destination_h_tag_template>` H2 sequence
   - ≥1 `<AffiliateCard partner="...">` placement (most natural: Tours H2 section); pick partner per `affiliate-marketing` skill
   - Religious-naming compliance:
     - Western Wall page: `Western Wall (Kotel)` in H1 + body; NEVER "Wailing Wall"
     - Holy Sepulchre page: `Church of the Holy Sepulchre`
     - City of David page: when discussing the archaeological park use "City of David"; when discussing the surrounding neighborhood use "Silwan / City of David" paired
     - No biased framing ("Judea and Samaria" etc. — AUD-018)
   - BreadcrumbList: Home → Jerusalem → <Entity> (rendered via task 1's renderer)

3. **Image sourcing (per `<image_guidance>`):** 1-2 images per sub-dest, in `public/images/sub-destinations/jerusalem/<short-slug>/{hero,inline-1}.jpg`. Width ≥1200px (hero ≥1600px ideal). Wikimedia / IGPO sources. For Western Wall + Holy Sepulchre: populate `restrictedSiteAcknowledgment` in ledger.

4. **Update `data/photo-credits.json`:** 7-14 new entries. Same shape as plan 02-01 ledger.

5. **Per-page sub-destination → AffiliateCard partner pairings (suggested by affiliate-marketing skill):**
   | Sub-dest | Suggested partner | data props |
   |---|---|---|
   | jerusalem-old-city | civitatis | `{ city: 'Jerusalem', label: 'Old City walking tour' }` |
   | jerusalem-western-wall | viator or gyg | `{ city: 'Jerusalem', label: 'Jerusalem Old City + Western Wall tour' }` |
   | jerusalem-holy-sepulchre | viator | `{ city: 'Jerusalem', label: 'Christian holy sites tour' }` |
   | jerusalem-yad-vashem | gyg | `{ city: 'Jerusalem', label: 'Yad Vashem half-day tour' }` |
   | jerusalem-mahane-yehuda | civitatis or viator | `{ city: 'Jerusalem', label: 'Mahane Yehuda food tour' }` |
   | jerusalem-mount-of-olives | viator | `{ city: 'Jerusalem', label: 'Mount of Olives panorama tour' }` |
   | jerusalem-city-of-david | gyg | `{ city: 'Jerusalem', label: 'City of David archaeology tour' }` |
   Adjust if affiliate-marketing skill suggests better matches.

6. **Per-page validation after each commit:**

   ```
   pnpm velite && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner && pnpm qa:audit
   pnpm test --run tests/content/jerusalem-sub-destinations.test.ts
   ```

   Each EN page MUST score ≥85 on SUB_DESTINATION profile.

7. **Un-skip the corresponding Vitest test group** as each EN MDX ships.

Parallel execution note: the 7 EN authoring tasks are independent (different files, no shared mutable state) — the executor MAY parallelize them. Image sourcing is also parallel per sub-dest. Credit-ledger appends are atomic; use sorted JSON insertion to avoid merge conflicts when paralleled.

Avoid: literal "Wailing Wall"; mixing affiliate-disclosure inline (renderer handles it); bloating sub-dest beyond 1200w (split into Phase 4 long-tail page instead); hardcoding affiliate URLs.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner</automated>
<automated>pnpm build</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const slugs=['jerusalem-old-city','jerusalem-western-wall','jerusalem-holy-sepulchre','jerusalem-yad-vashem','jerusalem-mahane-yehuda','jerusalem-mount-of-olives','jerusalem-city-of-david']; const bad=slugs.filter(s=>{const p=r.find(x=>x.slug===s&&x.lang==='en');return !p||p.score<85;}); if(bad.length)process.exit(1); console.log('all 7 EN pages >=85')"</automated>
<automated>pnpm test --run tests/content/jerusalem-sub-destinations.test.ts -t "en"</automated>
</verify>
<done>7 EN sub-destination MDX files exist; all have SUB_DESTINATION score ≥85; each has ≥1 AffiliateCard; religious-naming compliant (AUD-017..020 = 0); restricted-site images have restrictedSiteAcknowledgment populated; Vitest EN test groups all green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 7 paired HE sub-destination MDX files via hebrew-content-writer skill</name>
  <files>
    content/he/sub-destinations/jerusalem-old-city.mdx,
    content/he/sub-destinations/jerusalem-western-wall.mdx,
    content/he/sub-destinations/jerusalem-holy-sepulchre.mdx,
    content/he/sub-destinations/jerusalem-yad-vashem.mdx,
    content/he/sub-destinations/jerusalem-mahane-yehuda.mdx,
    content/he/sub-destinations/jerusalem-mount-of-olives.mdx,
    content/he/sub-destinations/jerusalem-city-of-david.mdx,
    tests/content/jerusalem-sub-destinations.test.ts
  </files>
  <behavior>
    For EACH of the 7 HE sub-destinations:
    - Test: frontmatter has lang=he, slug=jerusalem-<short> (same slug as EN), region=jerusalem, parentRegion=jerusalem
    - Test: word count HE/EN ratio in [0.85, 1.40] (AUD-007)
    - Test: HE-specific religious naming: הכותל המערבי (NOT כותל הדמעות), כנסיית הקבר, הר הבית / חראם א-שריף (paired where Temple Mount referenced)
    - Test: ≥1 AffiliateCard placement (mirrors EN partner mix)
    - Test: ktiv maleh consistency — pnpm qa:hebrew-content green
    - Test: Latin brand names wrapped with <span dir="ltr"> (AUD-024)
    - Test: SUB_DESTINATION audit score ≥85 on /jerusalem/<short>
  </behavior>
  <action>
Invoke `hebrew-content-writer` skill for each HE page. Skill SKILL.md already established register (business-casual) in plan 02-02 — apply consistently here.

Per HE page:

1. **Read the paired EN MDX** for structure ONLY (NOT for translation)
2. **Native Hebrew rewrite** following the same H2/H3 sequence, with:
   - Hebrew names from `data/religious-sites.json` (הכותל המערבי, כנסיית הקבר, הר הבית, etc.)
   - Ktiv maleh throughout
   - Gender-inclusive (Option C for CTAs; Option B acceptable in body)
   - Morphological keyword variants (לבקר / לראות / לטייל / לחקור)
3. **Word count target:** ≥85% of paired EN word count (e.g., EN 1000w → HE 850-1400w)
4. **Frontmatter:** lang=he, same slug as EN, parentRegion=jerusalem
5. **Affiliate placements:** same partners as EN; data labels in Hebrew (e.g., `label: 'סיור הכותל המערבי'`)
6. **Latin handling (AUD-024):** brand names like "Booking.com" → `<span dir="ltr" lang="en">Booking.com</span>`; phone/digit-runs → `<span dir="ltr">…</span>`

**Parallelism:** EN→HE per pair is sequential; pairs are independent. Executor may parallelize the 7 HE-authoring tasks.

**Per-page validation:**

```
pnpm velite && pnpm qa:hebrew-content && pnpm qa:credits && pnpm qa:schema && pnpm qa:audit
pnpm test --run tests/content/jerusalem-sub-destinations.test.ts -t "he"
```

Each HE page MUST: score ≥85 on SUB_DESTINATION; AUD-007 ratio in [0.85, 1.40] vs paired EN; AUD-017..020 + AUD-024 + AUD-025 all 0 violations.

Un-skip the corresponding Vitest HE test groups.

Avoid: literal translation; כותל הדמעות anywhere; raw Latin brand names without dir="ltr" wrap; ktiv chaser inconsistency.
</action>
<verify>
<automated>pnpm velite && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:ner</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['jerusalem-old-city','jerusalem-western-wall','jerusalem-holy-sepulchre','jerusalem-yad-vashem','jerusalem-mahane-yehuda','jerusalem-mount-of-olives','jerusalem-city-of-david']; const bad=slugs.filter(s=>{const p=r.find(x=>x.slug===s&&x.lang==='he');return !p||p.score<85;}); if(bad.length){console.error('bad:',bad);process.exit(1);} console.log('all 7 HE pages >=85')"</automated>
<automated>pnpm test --run tests/content/jerusalem-sub-destinations.test.ts</automated>
</verify>
<done>7 HE sub-destination MDX files exist paired by slug with EN; all score ≥85 on SUB_DESTINATION; AUD-007 ratio in band for every pair; AUD-017..020/024/025 all 0; pnpm qa:hebrew-content green; all 14 Vitest test groups (7 EN + 7 HE) un-skipped and green.</done>
</task>

</tasks>

<verification>
- `pnpm qa:audit` reports SUB_DESTINATION profile score ≥85 on all 14 Jerusalem sub-dest pages (7 EN + 7 HE)
- `pnpm qa:credits` exits 0 with all new sub-dest images ledgered; restricted-site entries (Western Wall, Holy Sepulchre) have `restrictedSiteAcknowledgment` populated
- `pnpm qa:schema` exits 0 — TouristAttraction + BreadcrumbList on all pages; ReligiousBuilding/PlaceOfWorship additionally on western-wall and holy-sepulchre pages
- AUD-017..020 report 0 violations across all 14 pages
- AUD-024 + AUD-025 report 0 violations on HE pages
- AUD-006 (head-keyword + entity qualifier in H1) reports 0 violations
- AUD-007 (word-count ratio) reports 0 violations on all 7 pairs
- AUD-031 (affiliate placement) reports ≥1 per page on all 14 pages
- `pnpm build` succeeds with `/en/jerusalem/<7-slugs>/` and `/jerusalem/<7-slugs>/` prerendered
- Vitest `tests/content/jerusalem-sub-destinations.test.ts` 14 test groups green
- `app/[locale]/[region]/[subdest]/page.tsx` is consumed by all 14 pages
</verification>

<success_criteria>
14 Jerusalem sub-destination pages (7 EN + 7 HE pairs) shipped at production depth: each 800-1200 words, ≥1 affiliate, breadcrumb to canonical, schema TouristAttraction (+ ReligiousBuilding for restricted sites), SUB_DESTINATION audit profile ≥85, AUD-007 word-count parity, religious naming compliant. Route renderer at `app/[locale]/[region]/[subdest]/page.tsx` exists and is reusable for Phase 3 region sub-dests without modification.
</success_criteria>

<output>
After completion, create `.planning/phases/02-pilot-region-jerusalem-m2/02-03-SUMMARY.md` summarizing:
- 7 sub-destinations selected + rationale (volume / inventory / editorial fit)
- Per-page affiliate partner mix decisions
- Restricted-site sourcing decisions (Wikimedia vs IGPO per image)
- Audit score breakdown per page (EN + HE)
- AUD-007 ratios achieved per pair
- Wall-clock time (logged for future-phase capacity planning)
- Any sub-dests deferred to Phase 4 long-tail (Mount Zion, Tower of David, Israel Museum, Armenian Quarter — note for Phase 4 planning)
</output>
