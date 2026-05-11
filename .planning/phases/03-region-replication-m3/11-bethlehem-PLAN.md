---
phase: 03-region-replication-m3
plan: 11
type: execute
wave: 5
depends_on:
  - 01-tel-aviv
files_modified:
  - velite.config.ts
  - app/[locale]/west-bank/[slug]/page.tsx
  - content/en/west-bank/bethlehem.mdx
  - content/he/west-bank/bethlehem.mdx
  - public/images/west-bank/bethlehem/
  - data/photo-credits.json
  - data/religious-sites.json
  - app/sitemap.ts
  - tests/content/bethlehem-region.test.ts
  - tests/routes/west-bank-route.test.ts
  - data/region-gates/west-bank-bethlehem.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-04
  - REG-05
must_haves:
  truths:
    - 'velite.config.ts has new westBank collection (Option B per RESEARCH §5) with administrativeStatus required field'
    - 'app/[locale]/west-bank/[slug]/page.tsx route renderer exists; renders /en/west-bank/bethlehem/ + /west-bank/bethlehem/'
    - 'Bethlehem canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - 'NO sub-destinations in v1 (single canonical only per CONTEXT.md)'
    - 'frontmatter administrativeStatus: "palestinian-authority" is REQUIRED (AUD-019 enforcement)'
    - 'Church of the Nativity emits PlaceOfWorship schema (UNESCO; major Christian pilgrimage)'
    - 'AUD-019 + AUD-020 0 violations on /west-bank/bethlehem/ pages'
    - 'Editorial framing per PITFALLS §3.3: "Bethlehem (in the West Bank, administered by the Palestinian Authority)" first reference; checkpoint transport practicalities; foreign tourists may enter Area A; pre-booked tours handle crossing; NO political commentary'
    - 'Hreflang reciprocal with x-default to EN per I18N-05 / AUD-032'
    - 'Sitemap excludes Hebron (REG-04 out-of-scope exclusion validated)'
    - 'pnpm qa:region-gate west-bank/bethlehem exits 0 with PASS verdict'
  artifacts:
    - path: 'velite.config.ts'
      provides: 'westBank Velite collection (Option B from RESEARCH §5) with required administrativeStatus enum field'
      contains: 'westBank'
    - path: 'app/[locale]/west-bank/[slug]/page.tsx'
      provides: 'West Bank route renderer copy-adapted from app/[locale]/[region]/page.tsx; reads westBank Velite collection; BreadcrumbList Home → West Bank → {Slug}'
      min_lines: 80
    - path: 'content/en/west-bank/bethlehem.mdx'
      provides: 'Bethlehem EN canonical 1500-2500w; PITFALLS §4.12 H-tag scaffolding; administrativeStatus: palestinian-authority; ≥5 affiliate partners; Church of the Nativity PlaceOfWorship schema'
      min_lines: 150
    - path: 'content/he/west-bank/bethlehem.mdx'
      provides: 'Bethlehem HE canonical native rewrite (בית לחם); administrativeStatus frontmatter HE-side; mirror schema parity'
      min_lines: 150
    - path: 'tests/routes/west-bank-route.test.ts'
      provides: 'Vitest tests for /en/west-bank/bethlehem/ + /west-bank/bethlehem/ rendering; AUD-019 frontmatter validation; admin-status framing check'
      min_lines: 30
    - path: 'data/region-gates/west-bank-bethlehem.md'
      provides: 'Region-gate verdict report for /west-bank/bethlehem'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/west-bank/bethlehem.mdx'
      to: 'lib/seo/naming.ts (requiresAdministrativeStatus + AUD-019 + AUD-020)'
      via: 'frontmatter administrativeStatus enforced + first-reference framing per PITFALLS §3.3'
      pattern: "administrativeStatus:\\s*['\"]palestinian-authority['\"]"
    - from: 'app/[locale]/west-bank/[slug]/page.tsx'
      to: '.velite/westBank'
      via: 'Velite typed collection import'
      pattern: 'westBank.*from'
    - from: 'content/en/regions/jerusalem.mdx (Phase 2.1)'
      to: 'content/en/west-bank/bethlehem.mdx'
      via: 'Day Trips section internal link (Phase 2.1 mentioned Bethlehem without canonical; this plan SHIPS canonical — verify link resolves)'
      pattern: '/west-bank/bethlehem'
---

<objective>
Plan 03-11 — Bethlehem at `/west-bank/bethlehem/` (Wave 5 — DISTINCT ROUTE FAMILY for REG-04).

Per CONTEXT.md + PITFALLS §3.3 / §4.12 + RESEARCH §5 + REG-04:

**Distinct route family `/west-bank/` (NOT `/regions/`) at Israel-proper level:**

- Velite **westBank collection (Option B)** per RESEARCH §5 recommendation — cleaner separation; aligns with distinct `/west-bank/` route family; mirrors future v2 West Bank expansion (Jericho, Aida camp, Shepherd's Field if cleared)
- New route renderer `app/[locale]/west-bank/[slug]/page.tsx` copy-adapted from existing region renderer
- Frontmatter REQUIRES `administrativeStatus: 'palestinian-authority'` (AUD-019/AUD-020 enforce)
- BreadcrumbList: Home → West Bank → Bethlehem (3 segments — new HE translation `הגדה המערבית`)
- Schema TouristDestination + BreadcrumbList + FAQPage + PlaceOfWorship for Church of the Nativity (UNESCO 2012 inscription)
- **NO sub-destinations in v1** (CONTEXT.md locks: Aida camp + Shepherd's Field deferred; sensitivity beyond v1 scope)

**Editorial framing (LOCKED in CONTEXT.md + PITFALLS §3.3):**

- "Bethlehem (in the West Bank, administered by the Palestinian Authority)" on first reference (EN); HE equivalent `בית לחם (בגדה המערבית, תחת מינהל הרשות הפלסטינית)`
- Checkpoint transport: practical info ONLY — foreign tourists may enter Area A; pre-booked tours from Jerusalem handle crossing; passport required; ~30min checkpoint
- Separation barrier mentioned as **practical info only** — NO political commentary; NO Banksy graffiti emphasis (filter for v1 neutrality)
- NO political commentary on Israeli-Palestinian conflict
- Acknowledge factual demographics (~28K residents; majority Muslim with significant Palestinian Christian minority — Christian pilgrimage continues)

**Image strategy (Wikimedia 60-70% MEDIUM):**

- Church of the Nativity facade + Manger Square + Old City alleys — Wikimedia abundant
- Filter Banksy wall + political graffiti for v1 (CONTEXT.md decision; respect editorial-sensitivity scope)

**Output:** new Velite collection + new route renderer + 2 canonicals (EN+HE) + 4-5 hero images + Hebron-absence sitemap validation + soft-gate PASS.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/03-region-replication-m3/03-CONTEXT.md
@.planning/phases/03-region-replication-m3/03-RESEARCH.md
@.planning/phases/03-region-replication-m3/03-VALIDATION.md
@.planning/research/PITFALLS.md
@.planning/research/FEATURES.md
@.planning/phases/03-region-replication-m3/01-tel-aviv-PLAN.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-04-SUMMARY.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@velite.config.ts
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@app/sitemap.ts
@lib/seo/naming.ts
@data/religious-sites.json
@scripts/qa/region-gate.mjs
@scripts/audit/run.ts
@scripts/audit/rules/AUD-019.ts
@scripts/audit/rules/AUD-020.ts

<interfaces>
<!-- Bethlehem-specific infrastructure required. -->

Velite westBank collection (Option B from RESEARCH §5):

```ts
// velite.config.ts — add after existing regions/subDestinations/guides/legal/itineraries collections:
const westBank = defineCollection({
  name: 'WestBank',
  pattern: 'west-bank/**/*.mdx',
  schema: s.object({
    lang: s.enum(['he', 'en', 'fr']),
    title: s.string().max(70),
    description: s.string().min(50).max(160),
    slug: s.string(),
    region: s.string(), // semantic id, e.g., "bethlehem"
    administrativeStatus: s.enum(['palestinian-authority']), // REQUIRED for west-bank
    heroImage: s.string(),
    primaryKeyword: s.string().optional(),
    secondaryKeywords: s.array(s.string()).optional(),
    publishedAt: s.string().optional(),
    updatedAt: s.string().optional(),
    faqs: s
      .array(
        s.object({
          question: s.string(),
          answer: s.string(),
        }),
      )
      .min(5)
      .max(10),
    body: s.mdx(),
  }),
});

// Export westBank in defineConfig collections
```

audit-walker loadVeliteIndex extension (scripts/audit/run.ts):

- Add `.velite/westBank.json` to the loader; lookup key prefix is `west-bank/<slug>` for the audit walker

religious-sites.json — verify/add church-of-the-nativity entry if missing:

```json
{
  "id": "church-of-the-nativity",
  "nameEn": "Church of the Nativity",
  "nameHe": "כנסיית המולד",
  "nameAr": "كنيسة المهد",
  "wikidataId": "Q198228",
  "category": "religious-site",
  "religion": "Christianity",
  "coordinates": { "latitude": 31.7042, "longitude": 35.2076 },
  "restrictedAccess": false,
  "pairedNamingRequired": false
}
```

AUD-019 (administrativeStatus frontmatter): requiresAdministrativeStatus(slug) returns true for bethlehem/hebron/jericho — fires unless frontmatter has administrativeStatus
AUD-020 (palestinian-authority framing): scans body for first-reference paired framing per PITFALLS §3.3
</interfaces>

<pitfalls_h_tag_template_bethlehem>

<!-- From PITFALLS §4.12 — Bethlehem H-tag scaffold. -->

H1: Things to Do in Bethlehem: Visiting the Church of the Nativity (2026)

H2: About Bethlehem
H3: Located in the West Bank, administered by the Palestinian Authority
H3: Population ~28K — majority Muslim + significant Palestinian Christian minority
H3: Ancient continuous habitation; UNESCO World Heritage (Church of the Nativity + Pilgrimage Route, 2012)

H2: When to Visit Bethlehem
H3: Christmas (December — major pilgrimage; book lodging months ahead)
H3: Easter (variable date; Catholic + Greek Orthodox + Armenian celebrations)
H3: Spring + Autumn shoulder seasons (cooler; smaller crowds)

H2: Visiting from Jerusalem — Practical Info
H3: Distance: 10km south of Jerusalem (40min with checkpoint)
H3: Foreign tourists may enter Area A (Palestinian Authority civil control)
H3: Passport required at checkpoint (Israeli border police — typical 30min)
H3: Pre-booked tours from Jerusalem handle checkpoint logistics; sherut alternative
H3: Israeli citizens cannot legally enter Area A under most circumstances

H2: Where to Stay in Bethlehem
H3: Old City boutique hotels (Jacir Palace, Bethlehem Hotel)
H3: Manger Square area
H3: Day-trip from Jerusalem (most foreign tourists choose this)
Component: <WhereToStay partner="booking" city="Bethlehem" />

H2: Top Things to See in Bethlehem
H3: Church of the Nativity (4th-century basilica; UNESCO 2012; Catholic + Greek Orthodox + Armenian shared jurisdiction)
H3: Manger Square + Grotto of the Nativity
H3: Milk Grotto + St. Catherine's Church
H3: Bethlehem Old City + Star Street (pilgrimage route)
H3: Aida Refugee Camp + Shepherd's Field (deferred to Phase 4; not v1 sub-dests)

H2: The Church of the Nativity
H3: Original 4th-century Constantinian basilica (rebuilt 6th-century Justinian)
H3: Door of Humility (small entrance — symbolic)
H3: Greek Orthodox iconostasis + Catholic altar + Armenian chapel
H3: Grotto of the Nativity (silver star marking traditional birth site)
H3: Recent restoration (mosaics 2013-2019)

H2: Christian Pilgrimage Routes
H3: Star Street (pilgrim historical route)
H3: Mar Saba Monastery (Greek Orthodox; men-only; 30min drive)
H3: Herodion (Herod the Great's mountain fortress + tomb; 12min drive)
Component: <AffiliateCard partner="viator" destination="Bethlehem" label="Bethlehem + Church of the Nativity tour from Jerusalem" />

H2: Day Trips from Bethlehem
H3: Jerusalem (10km north — most visitors come from there)
H3: Hebron (40min south — out of v1 scope; mention factually if asked)
H3: Mar Saba Monastery (Greek Orthodox men-only)
Component: <AffiliateCard partner="getYourGuide" destination="Bethlehem" label="Bethlehem half-day tour from Jerusalem" />

H2: How to Get to Bethlehem
H3: From Jerusalem: pre-booked tour (recommended), sherut, or taxi
H3: From TLV: tour or rental car (~1hr; checkpoint required)
H3: No direct public bus from TLV; transit through Jerusalem
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Jerusalem + Bethlehem" />
Component: <TransportInfo partner="skyscanner" />

H2: Where to Eat in Bethlehem
H3: Palestinian cuisine (musakhan, maqluba, knafeh)
H3: Old City restaurants + Manger Square
H3: Bethlehem winery (Cremisan — Salesian)

H2: Practical Tips
H3: Cash (Israeli shekels accepted; some places take Jordanian dinar)
H3: Modest dress at religious sites
H3: Checkpoint timing — allow extra time
H3: Passport stamping considerations (some travelers request no stamp on exit)
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel + West Bank" />

H2: FAQ (5-10)

- "Is it safe to visit Bethlehem?"
- "Do I need a separate visa for the West Bank?"
- "Can Israelis enter Bethlehem?"
- "What is the best way to visit from Jerusalem?"
- (factual, non-political answers; cite Israeli + US + EU travel advisories)
  </pitfalls_h_tag_template_bethlehem>
  </context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Extend velite.config.ts with westBank collection + create app/[locale]/west-bank/[slug]/page.tsx route renderer + extend audit loadVeliteIndex + Vitest route tests</name>
  <files>
    velite.config.ts,
    app/[locale]/west-bank/[slug]/page.tsx,
    scripts/audit/run.ts,
    tests/routes/west-bank-route.test.ts
  </files>
  <action>
**One-time infrastructure for `/west-bank/` route family.**

1. **Extend `velite.config.ts`** — add westBank collection per `<interfaces>` Option B spec:
   - New `defineCollection` block named WestBank, pattern `west-bank/**/*.mdx`
   - Schema includes REQUIRED `administrativeStatus: s.enum(['palestinian-authority'])` field
   - `body: s.mdx()` matches regions collection pattern
   - Export `westBank` in defineConfig collections array
   - Velite codegen produces `.velite/westBank.json`

2. **Create `app/[locale]/west-bank/[slug]/page.tsx`** — copy-adapt from `app/[locale]/[region]/page.tsx`:
   - Signature: `export default async function WestBankPage({ params }: { params: Promise<{ locale: 'he' | 'en'; slug: string }> })`
   - Read `import { westBank } from '.velite'`
   - Lookup: `lang === locale && slug === params.slug`; if missing → `notFound()`
   - **CRITICAL** — extract entity id from slug for religious-sites.json lookup (e.g., slug `bethlehem` → check if any religious-sites entry has `region: 'bethlehem'` for church-of-the-nativity matching)
   - Schema injection order:
     1. `<JsonLd schema={touristDestinationSchema({..., inLanguage: locale})} />`
     2. `<JsonLd schema={breadcrumbSchema([{name:'Home',item:'/<locale>'}, {name:'West Bank',item:'/<locale>/west-bank'}, {name: page.title, item: '/<locale>/west-bank/<slug>'}])} />` — HE BreadcrumbList uses `הגדה המערבית` for "West Bank"
     3. `<JsonLd schema={faqSchema(faqs)} />`
     4. For bethlehem: also inject `<JsonLd schema={religiousBuildingSchema({...church-of-the-nativity..., religion:'Christianity', inLanguage: locale})} />` for the Church of the Nativity
   - Render order: schemas → RegionHero (with priority) → Disclosure → MDX body
   - Export `generateMetadata` (canonical URL `/<locale>/west-bank/<slug>` per locale; self-referential)
   - Export `generateStaticParams` enumerating westBank Velite entries

3. **Extend `scripts/audit/run.ts` loadVeliteIndex()** to load `.velite/westBank.json`:
   - Add line similar to existing collections: `westBank` collection entries get `collection: 'westBank'` injected; lookup-key prefix `west-bank/<slug>` so audit walker correctly maps `/en/west-bank/bethlehem/` → slug `west-bank/bethlehem` with profile detection
   - detectProfile (scripts/audit/profiles/index.ts) — verify westBank collection routes to REGION_CANONICAL profile (similar to regions); if not, extend the dispatch logic

4. **Vitest route tests `tests/routes/west-bank-route.test.ts`:**
   - Test: route file exists and exports default async function
   - Test: generateStaticParams returns array with at least one entry once Bethlehem MDX ships (initially skipped)
   - Test: AUD-019 frontmatter validator pinned — administrativeStatus is REQUIRED for westBank entries; missing administrativeStatus would fail Velite parse
   - Test: BreadcrumbList for /en/west-bank/bethlehem/ resolves Home → West Bank → Bethlehem (3 segments)

Avoid: skipping the religious-sites integration (Church of the Nativity needs PlaceOfWorship); using physical Tailwind utilities; deviating from existing region renderer order-of-operations (consistency matters for plan-checker).
</action>
<verify>
<automated>pnpm velite</automated>
<automated>pnpm typecheck</automated>
<automated>pnpm lint app/[locale]/west-bank/[slug]/page.tsx velite.config.ts scripts/audit/run.ts</automated>
<automated>pnpm test --run tests/routes/west-bank-route.test.ts</automated>
</verify>
<done>velite.config.ts has westBank collection with required administrativeStatus enum; app/[locale]/west-bank/[slug]/page.tsx route renderer exists; scripts/audit/run.ts loadVeliteIndex extended; Vitest route tests scaffolded; pnpm velite + pnpm typecheck + pnpm lint all green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/west-bank/bethlehem.mdx + content/he/west-bank/bethlehem.mdx + source 4-5 Bethlehem images + add church-of-the-nativity to religious-sites.json + Hebron sitemap-absence test</name>
  <files>
    content/en/west-bank/bethlehem.mdx,
    content/he/west-bank/bethlehem.mdx,
    public/images/west-bank/bethlehem/hero.jpg,
    public/images/west-bank/bethlehem/church-of-the-nativity.jpg,
    public/images/west-bank/bethlehem/manger-square.jpg,
    public/images/west-bank/bethlehem/old-city.jpg,
    data/photo-credits.json,
    data/religious-sites.json,
    app/sitemap.ts,
    tests/content/bethlehem-region.test.ts
  </files>
  <behavior>
    EN: frontmatter has lang=en, slug=bethlehem, region=bethlehem, administrativeStatus='palestinian-authority' (REQUIRED); H1 contains "Bethlehem"; 8-12 H2 per §4.12; word 1500-2500 (mid-band 1800-2100); ≥5 distinct AffiliateCard partners; faqs 5-10
    EN editorial: first reference "Bethlehem (in the West Bank, administered by the Palestinian Authority)"; checkpoint transport factual; NO political commentary; NO Banksy / wall-graffiti political framing; ecumenical Christian pilgrimage tone
    HE: lang=he; administrativeStatus='palestinian-authority'; H1 "בית לחם"; HE first-reference framing "בית לחם (בגדה המערבית, תחת מינהל הרשות הפלסטינית)"; ratio 0.85-1.40; ktiv maleh; AUD-024 Latin wrapping
    Hebron: NOT in sitemap (REG-04 out-of-scope exclusion validated)
    AUD-019 + AUD-020 0 violations on both EN + HE pages
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

1. **Verify/add religious-sites.json entry** for church-of-the-nativity per `<interfaces>` block.

2. **Source 4-5 Bethlehem images** (Wikimedia 60-70% MEDIUM per CONTEXT.md):
   - hero.jpg: Bethlehem Old City rooftops OR Church of the Nativity facade — Wikimedia abundant
   - church-of-the-nativity.jpg: Basilica facade — Wikimedia abundant
   - manger-square.jpg: Manger Square wide — Wikimedia
   - old-city.jpg: Star Street OR alley — Wikimedia

   **Filter:** EXCLUDE Banksy wall art / political graffiti / separation-barrier photography per CONTEXT.md (v1 neutrality). Tourism + religious-pilgrimage subjects only.

   Add 4 entries to `data/photo-credits.json` with `region: 'bethlehem'`, `slug: 'bethlehem'`. NO restrictedSiteAcknowledgment required (Church of the Nativity is not in restricted set; Bahá'í policy doesn't apply here).

3. **EN canonical** at `content/en/west-bank/bethlehem.mdx`:
   - Frontmatter:
     ```yaml
     ---
     lang: en
     title: 'Things to Do in Bethlehem: Church of the Nativity Guide 2026' # 50-60 chars
     description: 'Plan your Bethlehem visit: Church of the Nativity, Manger Square, checkpoint logistics from Jerusalem, day tours, hotels, FAQ.' # 120-160 chars
     slug: bethlehem
     region: bethlehem
     administrativeStatus: 'palestinian-authority' # REQUIRED — AUD-019 enforces
     heroImage: '/images/west-bank/bethlehem/hero.jpg'
     primaryKeyword: 'things to do in Bethlehem'
     secondaryKeywords:
       [
         'Church of the Nativity',
         'Manger Square',
         'Bethlehem from Jerusalem',
         'Bethlehem checkpoint',
         'Bethlehem Christmas',
         'Star Street',
       ]
     publishedAt: 2026-05-11
     updatedAt: 2026-05-11
     faqs: [...] # 5-10
     ---
     ```
   - Body 1800-2100w per `<pitfalls_h_tag_template_bethlehem>` verbatim
   - **CRITICAL first-reference framing:** "Bethlehem (in the West Bank, administered by the Palestinian Authority)" in first paragraph (AUD-020 enforces)
   - **Editorial — checkpoint:** factual practical info ONLY — foreign tourists may enter Area A; ~30min checkpoint; passport required; pre-booked tours handle logistics; Israeli citizens cannot legally enter Area A under most circumstances
   - **Editorial — separation barrier:** mentioned ONCE as practical info ("the separation barrier follows the route between Bethlehem and Jerusalem; foreign tourists pass through checkpoints"); NO Banksy/political commentary
   - **Editorial — ecumenical Christian:** Church of the Nativity shared jurisdiction (Catholic Franciscan custody + Greek Orthodox + Armenian Apostolic; 1852 Status Quo agreement); respectful of all 3 traditions
   - **Affiliate placements (≥5):**
     - `<WhereToStay partner="booking" city="Bethlehem" />`
     - `<AffiliateCard partner="viator" destination="Bethlehem" label="Bethlehem + Church of the Nativity tour from Jerusalem" />`
     - `<AffiliateCard partner="getYourGuide" destination="Bethlehem" label="Bethlehem half-day tour from Jerusalem" />`
     - `<AffiliateCard partner="civitatis" destination="Bethlehem" label="Bethlehem Christian heritage tour" />`
     - `<TransportInfo partner="skyscanner" />`
     - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Jerusalem + Bethlehem" />`
     - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel + West Bank" />`

4. **HE canonical** at `content/he/west-bank/bethlehem.mdx`:
   - Frontmatter mirrors EN (lang=he, slug=bethlehem, region=bethlehem, administrativeStatus='palestinian-authority')
   - Native rewrite via hebrew-content-writer skill (NOT translation)
   - Primary HE keyword: `מה לעשות בבית לחם`
   - HE first-reference framing: `בית לחם (בגדה המערבית, תחת מינהל הרשות הפלסטינית)`
   - Church of the Nativity = `כנסיית המולד`; Manger Square = `כיכר המולד`
   - 0.90-1.05 ratio
   - AUD-024 Latin wrapping for brand names + Christian-tradition English terms used
   - **HE editorial sensitivity:** Israelis face legal restrictions on Area A entry — frame factually + practically (e.g., "ביקור בבית לחם דורש מעבר ביקורת גבולות; תיירים זרים רשאים להיכנס; אזרחים ישראלים אינם רשאים על פי חוק במרבית המקרים") — no political commentary

5. **Update `app/sitemap.ts`** to add `/en/west-bank/bethlehem` + `/west-bank/bethlehem` to STATIC_PATHS. **CRITICAL:** verify Hebron path is NOT in sitemap (REG-04 out-of-scope exclusion holds — `grep -L 'hebron' app/sitemap.ts` returns no match).

6. **Vitest test `tests/content/bethlehem-region.test.ts`:**
   - Test: EN frontmatter has administrativeStatus='palestinian-authority'
   - Test: EN body first 500 chars contains "Bethlehem (in the West Bank, administered by the Palestinian Authority)" (AUD-020 mechanical check)
   - Test: EN body does NOT contain "Banksy" or "wall art" or "graffiti" (CONTEXT.md neutrality)
   - Test: EN body does NOT contain political-commentary keywords ("occupation", "apartheid", "settler") — neutral framing only
   - Test: 5+ distinct AffiliateCard partners
   - Test: 8-12 H2 sections
   - Test: word count 1500-2500
   - Test: HE frontmatter mirrors administrativeStatus
   - Test: HE body word count 0.85-1.40 ratio of EN
   - Test: HE first reference contains `בגדה המערבית` + `הרשות הפלסטינית`
   - Test: Hebron NOT in sitemap STATIC_PATHS
   - Test: PlaceOfWorship schema emitted for Church of the Nativity on built page

7. **Run validation pipeline:**
   ```
   pnpm velite              # regenerate .velite/westBank.json
   pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
   pnpm qa:hebrew-content
   pnpm build               # /en/west-bank/bethlehem + /west-bank/bethlehem prerender
   pnpm qa:audit            # AUD-019 + AUD-020 0; REGION_CANONICAL ≥80
   pnpm test --run tests/content/bethlehem-region.test.ts
   pnpm lint && pnpm typecheck
   ```

Avoid: missing `administrativeStatus: 'palestinian-authority'` frontmatter (Velite parse fails; AUD-019 also fires); political commentary or Banksy/wall-art references (CONTEXT.md neutrality); raw partner URLs (AFF-04); HE word-count below 0.85; including Hebron in sitemap (REG-04 exclusion).
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>(p.slug==='west-bank/bethlehem' || p.slug==='bethlehem')&&p.lang==='en'); const he=r.find(p=>(p.slug==='west-bank/bethlehem' || p.slug==='bethlehem')&&p.lang==='he'); if(!en||en.score<80){console.error('EN missing/low:',en);process.exit(1);} if(!he||he.score<80){console.error('HE missing/low:',he);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/bethlehem-region.test.ts</automated>
<automated>node -e "const fs=require('fs'); const s=fs.readFileSync('app/sitemap.ts','utf8'); if(/hebron/i.test(s)){console.error('Hebron must NOT be in sitemap (REG-04)');process.exit(1)}"</automated>
</verify>
<done>EN + HE Bethlehem canonicals exist at /west-bank/bethlehem; both have administrativeStatus='palestinian-authority'; REGION_CANONICAL ≥80 both; AUD-019 + AUD-020 0 violations; first-reference framing per PITFALLS §3.3; NO political commentary; NO Banksy references; 5+ distinct affiliate partners; Hebron NOT in sitemap; Church of the Nativity emits PlaceOfWorship schema; tests green.</done>
</task>

<task type="auto">
  <name>Task 3 (per-region soft gate): Run pnpm qa:region-gate west-bank/bethlehem</name>
  <files>
    data/region-gates/west-bank-bethlehem.md,
    data/region-replication-report.md
  </files>
  <action>
1. **Pre-check:** `pnpm velite && pnpm build && pnpm qa:audit` produces fresh data with /en/west-bank/bethlehem + /west-bank/bethlehem present in audit-results.

2. **Run gate** with nested region slug: `pnpm qa:region-gate west-bank/bethlehem`
   - Plan 01's region-gate script (Wave 0 of plan 01) handles nested slugs via `filterByRegionPrefix` — `region.replace('/', '-')` for the report filename → `data/region-gates/west-bank-bethlehem.md`
   - Audit filter: slugs matching `west-bank/bethlehem` (EN: `en/west-bank/bethlehem`; HE: `west-bank/bethlehem`)
   - Parity check: 1 EN + 1 HE page (no sub-dests in v1)

3. **PASS** (exit 0) → `data/region-gates/west-bank-bethlehem.md` Verdict: PASS. Append west-bank/bethlehem row to `data/region-replication-report.md`. Commit.

4. **FAIL** (exit 1) → 3 fix attempts within this plan; halt Bethlehem after 3 failures. **Wave 5 is the final wave — Bethlehem halt halts Phase 3 close**, so this gate is the highest-stakes per-region gate in Phase 3.
   - Likely failure modes: AUD-019 if administrativeStatus frontmatter missing (Velite parse already enforces — defense-in-depth); AUD-020 if first-reference framing missing; AUD-018 if biased framing creeps in; AUD-007 ratio if HE expansion missed; AUD-026 not applicable (no Bahá'í).

5. **On PASS, populate report row:**

   ```markdown
   | west-bank/bethlehem | 2 (canonical only — no sub-dests in v1 per CONTEXT.md) | {N} distinct ({list}) | {PASS|DEFERRED-CI} | EN={en_score}/HE={he_score} | AUD-019+AUD-020=0; admin-status framing validated | PASS |
   ```

6. **Phase 3 close** — after this plan's PASS, all 11 plans complete. Aggregate `data/region-replication-report.md` shows 11 PASS rows. No Phase 3 hard gate beyond this (Phase 2 was the hard gate; Phase 3 is execution at scale per CONTEXT.md).

Lighthouse: `data/lighthouse-results.json` likely empty/CI-owned — gate accepts DEFERRED-CI status per Phase 2.6 lesson.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate west-bank/bethlehem</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/west-bank-bethlehem.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/west-bank-bethlehem.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*west-bank\/bethlehem\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate west-bank/bethlehem exits 0 with Verdict: PASS; data/region-gates/west-bank-bethlehem.md written; data/region-replication-report.md west-bank/bethlehem row populated with concrete numbers; ALL 11 Phase 3 plans complete — Phase 3 close eligible.</done>
</task>

</tasks>

<verification>
- `velite.config.ts` has westBank collection with REQUIRED administrativeStatus enum field
- `app/[locale]/west-bank/[slug]/page.tsx` route renderer exists; renders /en/west-bank/bethlehem/ + /west-bank/bethlehem/
- `scripts/audit/run.ts` loadVeliteIndex extended for westBank collection
- `content/en/west-bank/bethlehem.mdx` (1800-2100w) + `content/he/west-bank/bethlehem.mdx` (0.90-1.05 ratio) exist
- Both have `administrativeStatus: 'palestinian-authority'` frontmatter
- `pnpm qa:audit` reports REGION_CANONICAL ≥80 on both /en/west-bank/bethlehem and /west-bank/bethlehem
- AUD-019 (administrativeStatus required) + AUD-020 (Palestinian-Authority framing) 0 violations on both pages
- AUD-018 (biased framing) 0 violations — NO political commentary
- Church of the Nativity emits PlaceOfWorship schema (UNESCO 2012)
- Hebron NOT in app/sitemap.ts (REG-04 out-of-scope exclusion validated)
- `pnpm qa:region-gate west-bank/bethlehem` exits 0 with Verdict: PASS
- `data/region-replication-report.md` shows all 11 regions with PASS verdicts
- `pnpm build` succeeds prerendering both /en/west-bank/bethlehem + /west-bank/bethlehem
</verification>

<success_criteria>
Bethlehem ships at distinct `/west-bank/bethlehem/` route family (REG-04). administrativeStatus frontmatter enforced; first-reference framing per PITFALLS §3.3 ("Bethlehem (in the West Bank, administered by the Palestinian Authority)"); NO political commentary; NO Banksy references; ecumenical Christian-pilgrimage editorial; Church of the Nativity PlaceOfWorship schema; Hebron sitemap-exclusion validated; soft gate PASS. All 11 Phase 3 plans complete; data/region-replication-report.md aggregates 11 PASS rows; Phase 3 close eligible (no separate Phase 3 hard gate per CONTEXT.md — execution-at-scale model).
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/11-bethlehem-SUMMARY.md` summarizing:
- westBank Velite collection design (Option B chosen; rationale; future v2 expansion path for Jericho / Aida camp / Shepherd's Field)
- `/west-bank/[slug]/` route renderer architecture (BreadcrumbList Home → West Bank → Bethlehem in HE/EN)
- administrativeStatus frontmatter enforcement (Velite + AUD-019 + AUD-020 + 3-layer defense)
- Editorial framing decisions (first-reference PA framing; checkpoint factual; separation barrier neutral; ecumenical Christian)
- Church of the Nativity PlaceOfWorship schema emission
- Image filtering decisions (no Banksy / no political graffiti)
- Hebron exclusion validation
- Audit score breakdown (per AUD rule on both pages)
- HE/EN word-count ratio achieved
- Soft-gate verdict + per-criterion details
- Wall-clock time
- **Phase 3 close:** all 11 plans PASS; data/region-replication-report.md aggregates 11 PASS rows; lessons for Phase 4 long-tail / future West Bank expansion in v2
</output>
</content>
</invoke>
