---
phase: 03-region-replication-m3
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - scripts/qa/region-gate.mjs
  - package.json
  - tests/qa/region-gate.test.ts
  - data/region-gates/.gitkeep
  - data/region-replication-report.md
  - content/en/regions/tel-aviv.mdx
  - content/he/regions/tel-aviv.mdx
  - public/images/regions/tel-aviv/hero.jpg
  - public/images/regions/tel-aviv/jaffa.jpg
  - public/images/regions/tel-aviv/carmel-market.jpg
  - public/images/regions/tel-aviv/rothschild.jpg
  - public/images/regions/tel-aviv/beaches.jpg
  - content/en/sub-destinations/tel-aviv-old-jaffa.mdx
  - content/en/sub-destinations/tel-aviv-carmel-market.mdx
  - content/en/sub-destinations/tel-aviv-rothschild.mdx
  - content/en/sub-destinations/tel-aviv-tel-aviv-museum.mdx
  - content/en/sub-destinations/tel-aviv-florentin.mdx
  - content/en/sub-destinations/tel-aviv-tayelet.mdx
  - content/en/sub-destinations/tel-aviv-neve-tzedek.mdx
  - content/he/sub-destinations/tel-aviv-old-jaffa.mdx
  - content/he/sub-destinations/tel-aviv-carmel-market.mdx
  - content/he/sub-destinations/tel-aviv-rothschild.mdx
  - content/he/sub-destinations/tel-aviv-tel-aviv-museum.mdx
  - content/he/sub-destinations/tel-aviv-florentin.mdx
  - content/he/sub-destinations/tel-aviv-tayelet.mdx
  - content/he/sub-destinations/tel-aviv-neve-tzedek.mdx
  - public/images/sub-destinations/tel-aviv/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/tel-aviv-region.test.ts
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/tel-aviv/ and /tel-aviv/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema (inLanguage matches route)'
    - 'Tel Aviv canonical: 1500-2500 words EN; HE within 0.85-1.40 ratio of EN word count (AUD-007)'
    - '6-8 Tel Aviv sub-destinations exist in EN + HE pairs (12-16 total MDX); each at /tel-aviv/<short-slug>/'
    - 'Tel Aviv canonical has >=5 distinct AffiliateCard partners; each sub-dest has >=1'
    - 'pnpm qa:region-gate tel-aviv exits 0 with PASS verdict; data/region-gates/tel-aviv.md written'
    - 'scripts/qa/region-gate.mjs exists with pure helper evaluateRegion exported; reused by plans 02-11'
    - 'data/region-replication-report.md exists with Tel Aviv row populated'
    - 'AUD-017..020 (religious naming) 0 violations across all Tel Aviv pages'
    - 'AUD-024/025 (Hebrew editorial) 0 violations across HE Tel Aviv pages'
  artifacts:
    - path: 'scripts/qa/region-gate.mjs'
      provides: 'Per-region soft gate evaluator; filters audit-results by region prefix; checks ≥80 canonical / ≥75 sub-dest / 0 blocking / EN+HE parity; writes data/region-gates/{slug}.md'
      min_lines: 100
    - path: 'tests/qa/region-gate.test.ts'
      provides: 'Vitest unit tests for evaluateRegion pure helper (pass scenario, fail scenario, missing-region, parity check)'
      min_lines: 50
    - path: 'content/en/regions/tel-aviv.mdx'
      provides: 'Tel Aviv EN canonical 1500-2500 words, 8-12 H2 sections, 5+ distinct AffiliateCard partners, schema TouristDestination + BreadcrumbList + FAQPage'
      min_lines: 150
    - path: 'content/he/regions/tel-aviv.mdx'
      provides: 'Tel Aviv HE canonical native rewrite (NOT translation), ≥0.90 EN ratio mid-band, schema parity inLanguage=he'
      min_lines: 150
    - path: 'data/region-replication-report.md'
      provides: 'Phase 3 per-region aggregate table; Tel Aviv row populated on PASS'
      contains: 'tel-aviv'
  key_links:
    - from: 'scripts/qa/region-gate.mjs'
      to: 'data/audit-results.json + data/photo-credits.json + data/lighthouse-results.json'
      via: 'fs.readFileSync (reads 3 inputs, filters by region prefix, evaluates soft-gate)'
      pattern: 'readFileSync.*(audit-results|photo-credits|lighthouse-results)'
    - from: 'content/{en,he}/regions/tel-aviv.mdx'
      to: 'components/travel/AffiliateCard + WhereToStay + TransportInfo'
      via: 'MDX component invocations (helper-routed; no raw partner URLs)'
      pattern: '<AffiliateCard|<WhereToStay|<TransportInfo'
    - from: 'content/{en,he}/sub-destinations/tel-aviv-*.mdx'
      to: 'content/{en,he}/regions/tel-aviv.mdx'
      via: 'BreadcrumbList parent + frontmatter parentRegion: tel-aviv'
      pattern: "parentRegion:\\s*tel-aviv"
    - from: 'package.json scripts'
      to: 'scripts/qa/region-gate.mjs'
      via: 'npm script registration qa:region-gate'
      pattern: '"qa:region-gate":'
---

<objective>
Plan 03-01 — Tel Aviv-Jaffa canonical + sub-destinations + per-region gate infrastructure (Wave 1, solo — validates the replication template before parallelizing).

Tel Aviv is the second-highest composite score (8.7) after Jerusalem and reuses the Phase 2 pilot pattern almost identically. This plan ALSO ships the one-time `scripts/qa/region-gate.mjs` infrastructure that plans 02-11 reuse — the gate is small (~100 LOC) but needed by Task 4 of this plan, so it's amortized here.

Scope:

- **Wave 0:** Region-gate script + npm script + Vitest tests + per-region image sourcing (Wikimedia Commons CC-BY for Bauhaus White City + beaches + Carmel Market; supplement with Unsplash for abstract beach hero) + `data/region-replication-report.md` template
- **Task 1 (EN canonical):** `content/en/regions/tel-aviv.mdx` 1800-2200w mid-band, PITFALLS §4.2 H-tag scaffolding, 6+ affiliate partners (Tel Aviv has rich hotel + nightlife + day-trip inventory)
- **Task 2 (HE canonical):** native rewrite via hebrew-content-writer skill, 0.90-1.05 mid-band ratio
- **Task 3 (7 sub-dests EN+HE):** Old Jaffa, Carmel Market, Rothschild/Bauhaus White City, Tel Aviv Museum of Art, Florentin, Tayelet beach promenade, Neve Tzedek (CONTEXT.md target 6-8; selecting 7 to mirror Jerusalem pilot density)
- **Task 4 (soft gate):** `pnpm qa:region-gate tel-aviv` exits 0; report appended to `data/region-replication-report.md`

Purpose: Validate the replication template end-to-end (region-gate script firing correctly + audit-results filtering by region prefix + EN+HE parity check + sub-dest count band) BEFORE parallelizing waves 2-5. If Tel Aviv's soft gate fails, the template is broken; do NOT proceed to wave 2.

Output: 1 gate script + 2 canonicals (EN+HE) + 14 sub-dest MDX (7 EN + 7 HE) + 4-6 hero images + 7 sub-dest images + ledger entries + Vitest tests + region-replication-report row.
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
@.planning/phases/03-region-replication-m3/03-CONTEXT.md
@.planning/phases/03-region-replication-m3/03-RESEARCH.md
@.planning/phases/03-region-replication-m3/03-VALIDATION.md
@.planning/research/PITFALLS.md
@.planning/research/FEATURES.md
@.planning/phases/02-pilot-region-jerusalem-m2/01-en-canonical-PLAN.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-he-canonical-PLAN.md
@.planning/phases/02-pilot-region-jerusalem-m2/03-sub-destinations-PLAN.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-02-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-03-SUMMARY.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@.agents/skills/affiliate-page-generator/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@velite.config.ts
@scripts/qa/pilot-checkpoint.mjs
@lib/seo/naming.ts
@data/religious-sites.json

<interfaces>
<!-- Patterns proven in Phase 2 pilot — Tel Aviv inherits without modification. -->

Region renderer signature (app/[locale]/[region]/page.tsx — EXISTS from Phase 2.1):

```ts
export default async function RegionPage({
  params,
}: {
  params: Promise<{ locale: 'he' | 'en'; region: string }>;
});
// Reads regions from .velite/regions.json
// Emits TouristDestination + BreadcrumbList + FAQPage JsonLd
// Renders RegionHero + AffiliateDisclosure + MDX body
```

Sub-destination renderer (app/[locale]/[region]/[subdest]/page.tsx — EXISTS from Phase 2.3):

```ts
// Sub-dest slug stored region-prefixed in Velite (tel-aviv-old-jaffa) but URL uses short slug (/tel-aviv/old-jaffa/)
// toShortSlug() strips ^{parentRegion}- prefix
// Conditional ReligiousBuilding/PlaceOfWorship emission when religiousSiteId frontmatter matches data/religious-sites.json key
```

AffiliateCard usage (camelCase partner IDs per Phase 2.1 lesson):

```tsx
<AffiliateCard
  partner="booking"
  destination="Tel Aviv"
  label="Find hotels in Tel Aviv"
/>
// Valid partners: booking | civitatis | viator | getYourGuide | rentalcars | safetyWing | skyscanner | hostelworld | discoverCars
// klook + goCity stubs throw — do NOT use
```

Region-gate evaluator (NEW in this plan's Wave 0 — pseudocode):

```js
// scripts/qa/region-gate.mjs
export function evaluateRegion(
  audit,
  region,
  thresholds = { canonical: 80, subDest: 75 },
) {
  const entries = audit.filter((p) => {
    const path = p.slug.replace(/^en\//, '');
    return path === region || path.startsWith(`${region}/`);
  });
  // ...filter by profile, check thresholds, EN+HE parity
  return { entries, failures, missingHe, missingEn, verdict: 'PASS' | 'FAIL' };
}
```

AUD-007 word-count parity (HE/EN ratio):

- PASS: ratio in [0.85, 1.40]
- Phase 2 lesson: mid-band 0.90-1.05 is comfortable; expand HE first draft by ~150w if landing at 0.85

religious-naming (lib/seo/naming.ts):

- WAILING_WALL_REGEX (no false positives in Tel Aviv context; included by convention)
- BIASED_FRAMING_REGEX: avoid "Judea and Samaria" (not applicable to Tel Aviv)
- detectTempleMountPaired: not applicable to Tel Aviv
- Tel Aviv has Christian (St. Peter's in Jaffa) + Muslim (Mahmoudiya Mosque) heritage — respect names but no contested-compound issue
  </interfaces>

<pitfalls_h_tag_template_tel_aviv>

<!-- From PITFALLS §4.2 — verbatim H-tag scaffold the executor MUST use. -->

H1: Things to Do in Tel Aviv-Jaffa: A Complete 2026 Travel Guide

H2: When to Visit Tel Aviv
H3: Spring + Summer (peak beach season); Autumn shoulder; Winter mild
H3: Pride / Tel Aviv Pride week (June) — international LGBT-tourism draw
H3: Shabbat in Tel Aviv (more secular than Jerusalem — buses limited, but bars/restaurants stay open in city center)
Component: <ShabbatNotice variant="tel-aviv-secular" />

H2: Where to Stay in Tel Aviv-Jaffa
H3: City center (Rothschild / Dizengoff) vs Jaffa (boutique) vs Florentin (hipster) vs north Tel Aviv (family)
Component: <WhereToStay partner="booking" city="Tel Aviv" />

H2: Top Things to Do in Tel Aviv
H3: Old Jaffa Port + Flea Market (St. Peter's Church, Mahmoudiya Mosque — respect both)
H3: Carmel Market (Shuk HaCarmel)
H3: Rothschild Boulevard + Bauhaus White City (UNESCO)
H3: Tayelet (beach promenade) + 14km of beaches
H3: Tel Aviv Museum of Art

H2: Top Things to Do in South Tel Aviv
H3: Florentin (street art + nightlife)
H3: HaTachana (Neve Tzedek railway station complex)
H3: Levinsky Market (food)

H2: Top Day Trips from Tel Aviv
H3: Jerusalem (1hr train; link to Jerusalem canonical)
H3: Caesarea Maritima (45min north)
H3: Galilee (2hr; longer day-trip)
Component: <AffiliateCard partner="viator" destination="Tel Aviv" label="Day trips from Tel Aviv" />

H2: How to Get to Tel Aviv
Component: <TransportInfo partner="skyscanner" /> (flights TLV — Ben Gurion is THE Israel arrival)
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent a car at TLV" />
Mention sherut, taxi, light rail (2024 launch)

H2: Where to Eat in Tel Aviv
H3: Hummus institutions (Abu Hassan in Jaffa, Shlomo & Doron)
H3: Modern Israeli (Miznon, HaSalon)
H3: Carmel Market food crawl

H2: Tel Aviv Nightlife
(Light touch — keep editorial neutral on club specifics; reference Allenby + Rothschild + Florentin districts)

H2: FAQ
6-10 questions (consumed by faqSchema)
</pitfalls_h_tag_template_tel_aviv>

<image_sourcing_table_tel_aviv>

<!-- Per PITFALLS §5 and CONTEXT.md — Wikimedia 60-70% coverage (LOW gap). -->

| Image                                           | Source                | License              | Notes                                        |
| ----------------------------------------------- | --------------------- | -------------------- | -------------------------------------------- |
| hero.jpg (beachfront skyline OR Bauhaus aerial) | Wikimedia OR Unsplash | CC-BY-SA or Unsplash | >=1600px; Tel Aviv skyline well-photographed |
| jaffa.jpg (Old Jaffa Port at golden hour)       | Wikimedia             | CC-BY-SA             | >=1200px                                     |
| carmel-market.jpg (market stall colors)         | Wikimedia OR Pexels   | CC-BY or CC0         | >=1200px                                     |
| rothschild.jpg (Bauhaus building on Rothschild) | Wikimedia             | CC-BY-SA             | >=1200px; UNESCO White City                  |
| beaches.jpg (Tayelet wide shot)                 | Wikimedia OR Unsplash | CC-BY-SA or Unsplash | >=1200px                                     |

No restrictedSiteAcknowledgment required for Tel Aviv (no restricted-set subjects).
Synthetic Sharp placeholders OK with REAL ledger metadata (Phase 2.1 pattern); Phase 6 swaps actual binaries.
</image_sourcing_table_tel_aviv>

<sub_destination_targets>

<!-- 7 Tel Aviv sub-dests selected from CONTEXT.md (6-8 target). -->

| Slug                     | Entity                                            | Affiliate suggestion                  | Religious-site?                                       |
| ------------------------ | ------------------------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| tel-aviv-old-jaffa       | Old Jaffa Port + Flea Market                      | civitatis (Jaffa walking tour)        | No (St. Peter's mentioned; not religious-site schema) |
| tel-aviv-carmel-market   | Carmel Market / Shuk HaCarmel                     | viator (food tour)                    | No                                                    |
| tel-aviv-rothschild      | Rothschild Boulevard + Bauhaus White City         | getYourGuide (Bauhaus walking tour)   | No                                                    |
| tel-aviv-tel-aviv-museum | Tel Aviv Museum of Art                            | gyg (museum + city tour)              | No                                                    |
| tel-aviv-florentin       | Florentin (street art + nightlife)                | viator (street art tour)              | No                                                    |
| tel-aviv-tayelet         | Tayelet beach promenade                           | civitatis (bike tour)                 | No                                                    |
| tel-aviv-neve-tzedek     | Neve Tzedek (oldest TLV neighborhood + HaTachana) | gyg (Neve Tzedek + HaTachana walking) | No                                                    |

All TouristAttraction schema only. No PlaceOfWorship emission needed.
</sub_destination_targets>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Build scripts/qa/region-gate.mjs + register npm script + Vitest tests + source Tel Aviv images + create region-replication-report template</name>
  <files>
    scripts/qa/region-gate.mjs,
    package.json,
    tests/qa/region-gate.test.ts,
    data/region-gates/.gitkeep,
    data/region-replication-report.md,
    public/images/regions/tel-aviv/hero.jpg,
    public/images/regions/tel-aviv/jaffa.jpg,
    public/images/regions/tel-aviv/carmel-market.jpg,
    public/images/regions/tel-aviv/rothschild.jpg,
    public/images/regions/tel-aviv/beaches.jpg,
    data/photo-credits.json
  </files>
  <action>
Build the one-time region-gate infrastructure + Tel Aviv-specific image sourcing.

1. **`scripts/qa/region-gate.mjs`** — pure-helpers-exported pattern (Phase 1 plan 11 lock):
   - CLI: `node scripts/qa/region-gate.mjs <region-slug>` (e.g., `tel-aviv` or `west-bank/bethlehem`)
   - Reads `data/audit-results.json` + `data/lighthouse-results.json` (greenfield-tolerant: empty arrays OK)
   - Exports pure helpers (testable in Vitest):
     - `evaluateRegion(audit, region, thresholds = { canonical: 80, subDest: 75 })` → returns `{ entries, failures, missingHe, missingEn, verdict }`
     - `filterByRegionPrefix(audit, region)` — strips `^en/` prefix from slug, then matches `=== region || .startsWith(`${region}/`)`
     - `evaluateParity(entries)` — count EN slugs (strip `en/`) vs HE slugs (raw); return `{ missingHe, missingEn }`
     - `evaluateLighthouse(lh, region)` — filter by URL, treat `[]` as DEFERRED, treat absent file as DEFERRED with distinct message
     - `writeReport(result, region, outPath = `data/region-gates/${region.replace('/', '-')}.md`)` — writes verdict-bearing markdown
   - `main()` runs only when `import.meta.url === process.argv[1]` (Windows drive-letter case-normalized per Phase 1 plan 11 lock)
   - Exit 0 on PASS, 1 on FAIL
   - Report schema (similar to pilot-checkpoint.md):

     ```markdown
     # Region Gate Report: {region}

     **Evaluated:** {ISO date}
     **Verdict:** PASS | FAIL

     ## Pages Audited

     - EN canonical: {slug} — REGION_CANONICAL score {N} (threshold ≥80)
     - HE canonical: {slug} — REGION_CANONICAL score {N}
     - Sub-dests: {count} pages, all SUB_DESTINATION (threshold ≥75)

     ## Failures (if any)

     ...

     ## EN+HE Parity

     - EN pages: {count}
     - HE pages: {count}
     - Missing HE counterparts: {list}
     - Missing EN counterparts: {list}

     ## Lighthouse

     - Status: PASS | DEFERRED — CI owns | DEFERRED — file absent
     ```

2. **`package.json` script registration:**

   ```json
   "qa:region-gate": "node scripts/qa/region-gate.mjs"
   ```

   Invocable as `pnpm qa:region-gate tel-aviv`.

3. **`tests/qa/region-gate.test.ts`** — Vitest unit tests mirroring `tests/qa/pilot-checkpoint.test.ts` shape:
   - Test `evaluateRegion`: synthetic audit with 2 region pages + 7 sub-dests all ≥thresholds → PASS verdict
   - Test `evaluateRegion`: synthetic audit with 1 canonical at score=78 (below 80) → FAIL with details
   - Test `evaluateRegion`: synthetic audit with 1 blocking issue → FAIL
   - Test `evaluateParity`: 7 EN + 6 HE → missingHe array length 1; verdict reflects parity failure
   - Test `filterByRegionPrefix`: handles `en/tel-aviv` + `tel-aviv` + `tel-aviv/old-jaffa` + `en/tel-aviv/old-jaffa` all matching `region='tel-aviv'`; does NOT match `jerusalem` or `tel-aviv-2` (false prefix match guarded)
   - Test `filterByRegionPrefix` for nested `region='west-bank/bethlehem'`: matches `en/west-bank/bethlehem` + `west-bank/bethlehem`
   - Test `evaluateLighthouse`: empty array → DEFERRED-CI-owns; missing file → DEFERRED-file-absent
   - Test `writeReport` produces valid markdown with `Verdict:` line
   - Test `main()` PASS path exits 0; FAIL path exits 1

4. **Create `data/region-gates/.gitkeep`** so the directory exists for per-region reports.

5. **Create `data/region-replication-report.md` template:**

   ```markdown
   # Phase 3 Region Replication Report

   **Phase:** 03-region-replication-m3
   **Started:** 2026-05-11
   **Status:** in-progress

   | Region              | Pages Built | Affiliate Partners | Lighthouse | Audit Score (canonical EN/HE) | Religious Compliance | Soft Gate |
   | ------------------- | ----------- | ------------------ | ---------- | ----------------------------- | -------------------- | --------- |
   | tel-aviv            | —           | —                  | —          | —                             | —                    | pending   |
   | dead-sea            | —           | —                  | —          | —                             | —                    | pending   |
   | galilee             | —           | —                  | —          | —                             | —                    | pending   |
   | eilat               | —           | —                  | —          | —                             | —                    | pending   |
   | negev               | —           | —                  | —          | —                             | —                    | pending   |
   | nazareth            | —           | —                  | —          | —                             | —                    | pending   |
   | haifa               | —           | —                  | —          | —                             | —                    | pending   |
   | golan               | —           | —                  | —          | —                             | —                    | pending   |
   | caesarea            | —           | —                  | —          | —                             | —                    | pending   |
   | akko                | —           | —                  | —          | —                             | —                    | pending   |
   | west-bank/bethlehem | —           | —                  | —          | —                             | —                    | pending   |
   ```

   Each subsequent plan's Task 4 appends to this row.

6. **Source 5 Tel Aviv images** per `<image_sourcing_table_tel_aviv>`. Phase 2.1 pattern: Sharp-generated placeholder JPEGs at documented dimensions with REAL Wikimedia URLs in ledger; Phase 6 swaps binaries. Add 5 entries to `data/photo-credits.json` with `region: 'tel-aviv'`, `slug: 'tel-aviv'`, all width >=1200 (hero >=1600).

7. **Run `pnpm qa:credits`** — MUST exit 0 before commit.

Avoid: TypeScript in scripts (use .mjs); hardcoded paths (use `process.cwd()` + path.join); skipping pure-helper export pattern (breaks Vitest); installing chrome-launcher (we DEFER lighthouse to CI per Phase 2.6 lesson).
</action>
<verify>
<automated>pnpm test --run tests/qa/region-gate.test.ts</automated>
<automated>node -e "import('./scripts/qa/region-gate.mjs').then(()=>process.exit(0),(e)=>{console.error(e);process.exit(1)})"</automated>
<automated>node -e "const p=require('./package.json'); if(!p.scripts['qa:region-gate'])process.exit(1)"</automated>
<automated>pnpm qa:credits</automated>
<automated>pnpm lint scripts/qa/region-gate.mjs</automated>
</verify>
<done>scripts/qa/region-gate.mjs exists with pure helpers exported + main() guarded; package.json has qa:region-gate script; Vitest tests for evaluateRegion + filterByRegionPrefix + evaluateParity + evaluateLighthouse + writeReport all green; data/region-gates/.gitkeep + data/region-replication-report.md template committed; 5 Tel Aviv image ledger entries valid; pnpm qa:credits exits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/tel-aviv.mdx (1800-2200w mid-band) following PITFALLS §4.2 H-tag scaffolding + content/he/regions/tel-aviv.mdx native rewrite</name>
  <files>
    content/en/regions/tel-aviv.mdx,
    content/he/regions/tel-aviv.mdx,
    tests/content/tel-aviv-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN canonical assertions:
    - Test: frontmatter has lang=en, slug=tel-aviv, region=tel-aviv, title 50-60 chars, description 120-160 chars
    - Test: H1 contains "Tel Aviv" + qualifier; appears once
    - Test: 8-12 H2 sections matching PITFALLS §4.2 sequence (When to Visit / Where to Stay / Top Things / Top in South TLV / Day Trips / How to Get / Where to Eat / Nightlife / FAQ)
    - Test: ≥5 distinct AffiliateCard partners drawn from {booking, civitatis, viator, getYourGuide, rentalcars, safetyWing, skyscanner, discoverCars}
    - Test: word count 1500-2500 (mid-band 1800-2200)
    - Test: faqs frontmatter 5-10 entries
    - Test: NO "Wailing Wall" anywhere; NO "Judea and Samaria"
    - Test: AffiliateDisclosure provided by renderer (not inline in MDX)

    HE canonical assertions:
    - Test: frontmatter has lang=he, slug=tel-aviv, region=tel-aviv
    - Test: word count HE/EN ratio in [0.85, 1.40] (target mid-band 0.90-1.05)
    - Test: H1 starts with "מה לעשות בתל אביב" or equivalent native phrasing
    - Test: NO "כותל הדמעות" (would be AUD-017 HE-parallel; not applicable to TLV but rule still fires globally)
    - Test: same 5+ AffiliateCard partner mix as EN
    - Test: ktiv maleh consistency — pnpm qa:hebrew-content green
    - Test: Latin brand names wrapped <span dir="ltr"> (AUD-024)

  </behavior>
  <action>
**Invoke `copywriting` skill before EN drafting** (skill prescribes head-keyword density + section pacing). **Invoke `hebrew-content-writer` skill before HE drafting** (register: business-casual; gender Option C; ktiv maleh).

**Step A — EN canonical (`content/en/regions/tel-aviv.mdx`):**

1. **Frontmatter:**

   ```yaml
   ---
   lang: en
   title: 'Things to Do in Tel Aviv-Jaffa: 2026 Complete Guide' # 50-60 chars
   description: 'Plan your Tel Aviv trip: Bauhaus White City, Old Jaffa, beaches, Carmel Market, top hotels, day trips, food, nightlife.' # 120-160 chars
   slug: tel-aviv
   region: tel-aviv
   heroImage: '/images/regions/tel-aviv/hero.jpg'
   primaryKeyword: 'things to do in Tel Aviv'
   secondaryKeywords:
     [
       'Tel Aviv itinerary',
       'Tel Aviv hotels',
       'Tel Aviv beaches',
       'Bauhaus White City',
       'Old Jaffa',
       'Tel Aviv day trips',
     ]
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   faqs:
     - question: 'How many days should I spend in Tel Aviv?'
       answer: '...'
     - question: 'Is Tel Aviv safe for tourists?'
       answer: '...'
     # 5-10 total
   ---
   ```

2. **Body content:** follow `<pitfalls_h_tag_template_tel_aviv>` verbatim. MDX body has zero H1s (RegionHero owns the H1). Word count 1800-2200.

3. **AffiliateCard placements (≥5 partners; Tel Aviv has rich inventory, aim for 6):**
   - `<WhereToStay partner="booking" city="Tel Aviv" />` in Where to Stay H2
   - `<AffiliateCard partner="civitatis" destination="Tel Aviv" label="Old Jaffa walking tour" />` in Top Things H2
   - `<AffiliateCard partner="getYourGuide" destination="Tel Aviv" label="Bauhaus White City tour" />` in Top Things H2
   - `<AffiliateCard partner="viator" destination="Tel Aviv" label="Day trips from Tel Aviv" />` in Day Trips H2
   - `<TransportInfo partner="skyscanner" />` in How to Get H2 (flights TLV)
   - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent a car at TLV" />` in How to Get H2
   - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />` near FAQ or pre-trip section

4. **Religious-naming compliance:** Jaffa heritage section MUST mention St. Peter's Church + Mahmoudiya Mosque respectfully; no contested-compound naming required (PITFALLS §4.2 confirms low religious-naming density for Tel Aviv).

5. **Inline images:** reference 4-5 of the 5 sourced images at natural points in body (hero is rendered by RegionHero; reference inline images as `![alt](/images/regions/tel-aviv/jaffa.jpg)` MDX syntax).

**Step B — HE canonical (`content/he/regions/tel-aviv.mdx`):**

1. **Native Hebrew rewrite** working from EN STRUCTURE only (NOT translation). Primary HE keyword: `מה לעשות בתל אביב` (Phase 2.2 pattern). Morphological variants: לעשות / לבקר / לטייל / לראות / לחקור.

2. **H-tag scaffolding** mirrors EN (Hebrew section names per hebrew-content-writer skill):
   - H2: מתי לבקר בתל אביב
   - H2: היכן ללון בתל אביב
   - H2: הדברים הטובים ביותר לעשות בתל אביב
   - H2: טיולי יום מתל אביב
   - H2: איך להגיע לתל אביב
   - H2: היכן לאכול בתל אביב
   - H2: חיי לילה בתל אביב
   - H2: שאלות נפוצות

3. **Word-count target:** 0.90-1.05 mid-band ratio (Phase 2.2 lesson: aim mid-band, not floor; expand HE first draft by ~150w if landing at 0.85).

4. **Affiliate partner mix mirrors EN.** Hebrew labels: `label: 'מצא מלונות בתל אביב'`, `label: 'סיור הבאוהאוס'`, etc.

5. **Latin handling (AUD-024):** `<span dir="ltr" lang="en">Booking.com</span>`, `<span dir="ltr">TLV</span>`, `<span dir="ltr">+972-3-...</span>` where applicable.

6. **Ktiv maleh consistency:** תוכנה not תכנה; שירות not שרות; consistent throughout.

**Step C — Vitest tests + sitemap + run pipeline:**

1. Author `tests/content/tel-aviv-region.test.ts` with the behavior assertions above (EN + HE in same file, separate `describe` blocks).

2. Update `app/sitemap.ts` STATIC_PATHS to add `/en/tel-aviv` and `/tel-aviv`.

3. **Run full validation pipeline:**

   ```
   pnpm velite
   pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
   pnpm qa:hebrew-content
   pnpm build
   pnpm qa:audit
   pnpm test --run tests/content/tel-aviv-region.test.ts
   pnpm lint && pnpm typecheck
   ```

4. Verify in audit-results.json: `/en/tel-aviv` AND `/tel-aviv` both have REGION_CANONICAL score ≥80; AUD-007/009/012/017-020/024/025/031 all 0 violations.

Avoid: literal "Wailing Wall" (AUD-017 global rule; fires on any page); biased framing (AUD-018); raw hex codes (AFF-05); hardcoding partner URLs (AFF-04); fewer than 5 distinct affiliate partners on canonical; HE word-count below 0.85 (AUD-007 fails).
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:ner</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='tel-aviv'&&p.lang==='en'); const he=r.find(p=>p.slug==='tel-aviv'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1); console.log('EN',en.score,'HE',he.score)"</automated>
<automated>pnpm test --run tests/content/tel-aviv-region.test.ts</automated>
<automated>pnpm lint && pnpm typecheck</automated>
</verify>
<done>content/en/regions/tel-aviv.mdx (1800-2200w) + content/he/regions/tel-aviv.mdx (0.90-1.05 ratio) exist; REGION_CANONICAL score ≥80 on both /en/tel-aviv and /tel-aviv; AUD-007/009/012/017-020/024/025 all 0; ≥5 distinct affiliate partners; sitemap updated; Vitest content tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 7 paired sub-destinations (Old Jaffa, Carmel Market, Rothschild/Bauhaus, TLV Museum, Florentin, Tayelet, Neve Tzedek) — 14 MDX files EN+HE</name>
  <files>
    content/en/sub-destinations/tel-aviv-old-jaffa.mdx,
    content/en/sub-destinations/tel-aviv-carmel-market.mdx,
    content/en/sub-destinations/tel-aviv-rothschild.mdx,
    content/en/sub-destinations/tel-aviv-tel-aviv-museum.mdx,
    content/en/sub-destinations/tel-aviv-florentin.mdx,
    content/en/sub-destinations/tel-aviv-tayelet.mdx,
    content/en/sub-destinations/tel-aviv-neve-tzedek.mdx,
    content/he/sub-destinations/tel-aviv-old-jaffa.mdx,
    content/he/sub-destinations/tel-aviv-carmel-market.mdx,
    content/he/sub-destinations/tel-aviv-rothschild.mdx,
    content/he/sub-destinations/tel-aviv-tel-aviv-museum.mdx,
    content/he/sub-destinations/tel-aviv-florentin.mdx,
    content/he/sub-destinations/tel-aviv-tayelet.mdx,
    content/he/sub-destinations/tel-aviv-neve-tzedek.mdx,
    public/images/sub-destinations/tel-aviv/,
    data/photo-credits.json,
    tests/content/tel-aviv-region.test.ts
  </files>
  <behavior>
    Per sub-dest (×14 pages):
    - Test: frontmatter lang/slug/region/parentRegion match (slug = tel-aviv-{short})
    - Test: H1 has entity name + qualifier (AUD-006)
    - Test: word count 800-1200
    - Test: ≥1 AffiliateCard placement
    - Test: HE/EN word ratio per pair in [0.85, 1.40] (target mid-band 0.93-1.03)
    - Test: SUB_DESTINATION audit profile score ≥75 (Phase 3 relaxed threshold)
    - Test: BreadcrumbList resolves Home → Tel Aviv → {Entity}
    - Test: NO PlaceOfWorship/ReligiousBuilding schema emission (Tel Aviv sub-dests are all TouristAttraction only — no religiousSiteId frontmatter)
  </behavior>
  <action>
Author 7 EN + 7 HE sub-destination MDX files per `<sub_destination_targets>` table. Mirror Phase 2.3 plan structure.

**Per-page EN authoring (×7):**

1. **Frontmatter:**

   ```yaml
   ---
   lang: en
   title: '<Entity> — <qualifier>' # 50-60 chars
   description: '...' # 120-160 chars
   slug: tel-aviv-<short> # region-prefixed Velite slug
   region: tel-aviv
   parentRegion: tel-aviv
   heroImage: '/images/sub-destinations/tel-aviv/<short>.jpg'
   publishedAt: 2026-05-11
   updatedAt: 2026-05-11
   faqs:
     - question: ...
       answer: ...
     # 3-7 total
   ---
   ```

   **NO `religiousSiteId` frontmatter** (Tel Aviv sub-dests are all TouristAttraction only per `<sub_destination_targets>`).

2. **Body content:** 800-1200w following `<sub_destination_h_tag_template>` from Phase 2.3 (H2 sequence: What is X / Visiting Today / Top Things to See / Nearby Attractions / Tours / Practical Tips / FAQ).

3. **AffiliateCard per page (≥1) per `<sub_destination_targets>` mapping.**

4. **H1 per AUD-006:** entity + qualifier, e.g., "Old Jaffa Port — Tel Aviv's 4,000-Year-Old Harbor Quarter".

5. **Image:** 1 hero per sub-dest at `public/images/sub-destinations/tel-aviv/<short>.jpg`, width ≥1200. Wikimedia/Pexels sources. Add ledger entries.

**Per-page HE authoring (×7):** native rewrite via hebrew-content-writer (same skill register as canonical). Word count 0.93-1.03 ratio of paired EN; AUD-024 Latin handling; ktiv maleh.

**Suggested EN AffiliateCard placements (refine per affiliate-marketing skill):**
| Slug | Partner | Label (EN) |
|---|---|---|
| tel-aviv-old-jaffa | civitatis | "Old Jaffa walking tour" |
| tel-aviv-carmel-market | viator | "Tel Aviv food + Carmel Market tour" |
| tel-aviv-rothschild | getYourGuide | "Bauhaus White City walking tour" |
| tel-aviv-tel-aviv-museum | getYourGuide | "Tel Aviv Museum of Art guided visit" |
| tel-aviv-florentin | viator | "Florentin street-art tour" |
| tel-aviv-tayelet | civitatis | "Tel Aviv beachfront bike tour" |
| tel-aviv-neve-tzedek | getYourGuide | "Neve Tzedek + HaTachana walking tour" |

**Parallelism:** the 7 EN authoring tasks are independent. Executor MAY parallelize. EN→HE per pair is sequential.

**Per-batch validation after authoring complete:**

```
pnpm velite && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
pnpm qa:hebrew-content
pnpm build
pnpm qa:audit
pnpm test --run tests/content/tel-aviv-region.test.ts
```

Update `app/sitemap.ts` to add all 7 sub-dest paths (×2 locales = 14 URL entries).

Each page MUST score ≥75 on SUB_DESTINATION; AUD-007 per pair in band; AUD-006/017-020/024/025/031/032 all 0 violations.

Avoid: emitting ReligiousBuilding/PlaceOfWorship schema (Tel Aviv has no religious-sites.json entries — TouristAttraction only); slug naming inconsistency (region-prefixed Velite slug, short URL slug — pattern locked in Phase 2.3); HE word-count below 0.85 floor; using klook/goCity partners (stubs throw).
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const slugs=['tel-aviv-old-jaffa','tel-aviv-carmel-market','tel-aviv-rothschild','tel-aviv-tel-aviv-museum','tel-aviv-florentin','tel-aviv-tayelet','tel-aviv-neve-tzedek']; const bad=[]; for (const s of slugs) { for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } } if(bad.length){console.error('bad:',bad);process.exit(1);} console.log('all 14 sub-dest pages ≥75')"</automated>
<automated>pnpm test --run tests/content/tel-aviv-region.test.ts</automated>
</verify>
<done>14 Tel Aviv sub-destination MDX files (7 EN + 7 HE pairs) exist; all SUB_DESTINATION ≥75; AUD-007 per pair in band; AUD-006/017-020/024/025/031/032 all 0; sitemap updated; Vitest sub-dest tests green; 7 sub-dest images ledgered.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate tel-aviv — must PASS before wave 2 starts</name>
  <files>
    data/region-gates/tel-aviv.md,
    data/region-replication-report.md
  </files>
  <action>
This is the gate that validates the replication template end-to-end. Wave 2 (plans 02/03/04) MUST NOT start until this exits 0.

1. **Pre-check (ensure fresh audit data):**
   - `pnpm velite && pnpm build && pnpm qa:audit` produces fresh `data/audit-results.json`
   - All 16 Tel Aviv pages present (2 canonical + 14 sub-dest)

2. **Run the gate:**

   ```
   pnpm qa:region-gate tel-aviv
   ```

3. **Interpret outcome:**
   - **Exit 0 (PASS)** → `data/region-gates/tel-aviv.md` has `Verdict: PASS`. Append Tel Aviv row to `data/region-replication-report.md` with concrete numbers (audit scores, partner count, lighthouse status). Commit. Wave 2 is unblocked.
   - **Exit 1 (FAIL)** → `data/region-gates/tel-aviv.md` has `Verdict: FAIL` with per-page failures. Per CONTEXT.md: **3 fix attempts within this plan, then halt Tel Aviv.** Halting Tel Aviv halts the ENTIRE phase (subsequent plans depend on this template validation).
     - Fix attempt mechanics: identify the failing AUD rules + pages; auto-fix content (e.g., add HE words if AUD-007 fails; fix religious-naming if AUD-017-020 fires; populate restrictedSiteAcknowledgment if AUD-026 fires); re-run `pnpm qa:audit && pnpm qa:region-gate tel-aviv`.
     - After 3 failed attempts, exit with structured failure for user review.

4. **On PASS, populate the report row:**

   ```markdown
   | tel-aviv | 16 (2 canonical + 14 sub-dest) | {N} distinct ({list}) | {PASS|DEFERRED-CI} | EN={en_score}/HE={he_score} | AUD-017..020=0 violations | PASS |
   ```

5. **Commit `data/region-gates/tel-aviv.md` + updated `data/region-replication-report.md`** with message `feat(03-01): tel-aviv soft-gate PASS`.

6. **Verify Lighthouse status:** `data/lighthouse-results.json` is likely `[]` (Phase 2.6 lesson — CI owns real runs on Windows local). Gate accepts DEFERRED-CI-owns status; verify gate report's Lighthouse section reflects that distinct state.

Avoid: treating soft-gate FAIL as advisory (it's mechanical; gate firing means template is broken); skipping the report-row append (downstream plans reference this report); proceeding to wave 2 with exit-1 status.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate tel-aviv</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/tel-aviv.md'))process.exit(1); const c=fs.readFileSync('data/region-gates/tel-aviv.md','utf8'); if(!/Verdict:\s*PASS/.test(c))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); const r=fs.readFileSync('data/region-replication-report.md','utf8'); if(!/\|\s*tel-aviv\s*\|.*PASS\s\*\|/.test(r))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate tel-aviv exits 0 with Verdict: PASS; data/region-gates/tel-aviv.md written; data/region-replication-report.md tel-aviv row updated with concrete numbers + PASS verdict; Wave 2 (plans 02/03/04) is unblocked.</done>
</task>

</tasks>

<verification>
- `scripts/qa/region-gate.mjs` exists with pure helpers exported + main() guarded by `import.meta.url === process.argv[1]`
- `package.json` registers `qa:region-gate` script
- `tests/qa/region-gate.test.ts` Vitest tests for evaluateRegion + filterByRegionPrefix + evaluateParity + evaluateLighthouse + writeReport all green
- `data/region-replication-report.md` exists with all 11 region rows (tel-aviv populated on PASS)
- `content/en/regions/tel-aviv.mdx` (1800-2200w) + `content/he/regions/tel-aviv.mdx` (0.90-1.05 ratio) exist
- 7 EN + 7 HE sub-destination MDX files exist (14 total) paired by slug
- `pnpm qa:audit` reports REGION_CANONICAL ≥80 on /en/tel-aviv + /tel-aviv; SUB_DESTINATION ≥75 on all 14 sub-dest pages
- AUD-007/009/012/017..020/024/025/026/031/032 all 0 violations across all Tel Aviv pages
- `pnpm qa:hebrew-content` exits 0
- `pnpm qa:region-gate tel-aviv` exits 0 with Verdict: PASS
- `data/region-gates/tel-aviv.md` written with full per-page breakdown
- `app/sitemap.ts` updated with /tel-aviv + 7 sub-dest paths (×2 locales)
- `pnpm build` succeeds prerendering all 16 Tel Aviv pages
</verification>

<success_criteria>
Tel Aviv-Jaffa region replicated at production depth: 2 canonicals (EN+HE) + 14 sub-destinations (7 EN + 7 HE), all helper-routed affiliates, native HE rewrite (not translation), all AUD rules green, soft gate PASS. One-time region-gate infrastructure shipped + Vitest-pinned + reused by plans 02-11. The replication template is now validated; waves 2-5 may proceed in parallel.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/01-tel-aviv-SUMMARY.md` summarizing:
- Region-gate script architecture (pure-helpers-exported pattern, evaluateRegion contract, lighthouse DEFER semantics)
- Tel Aviv content authoring choices (sub-dest selection rationale; affiliate partner mix per page; image source decisions)
- Audit score breakdown (per page + per AUD rule)
- HE/EN word-count ratios per pair
- Soft-gate verdict + per-criterion details
- Wall-clock time vs Jerusalem pilot (Phase 2 plans 01+02+03 baseline)
- Any deviations from PITFALLS §4.2 template
- Lessons for plans 02-11 (e.g., parallelization signals, ledger-append patterns)
</output>
</content>
</invoke>
