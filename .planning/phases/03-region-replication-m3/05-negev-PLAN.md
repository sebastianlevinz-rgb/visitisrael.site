---
phase: 03-region-replication-m3
plan: 05
type: execute
wave: 3
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/negev.mdx
  - content/he/regions/negev.mdx
  - public/images/regions/negev/
  - content/en/sub-destinations/negev-mitzpe-ramon.mdx
  - content/en/sub-destinations/negev-avdat.mdx
  - content/en/sub-destinations/negev-sde-boker.mdx
  - content/en/sub-destinations/negev-ein-avdat.mdx
  - content/en/sub-destinations/negev-bedouin-hospitality.mdx
  - content/he/sub-destinations/negev-mitzpe-ramon.mdx
  - content/he/sub-destinations/negev-avdat.mdx
  - content/he/sub-destinations/negev-sde-boker.mdx
  - content/he/sub-destinations/negev-ein-avdat.mdx
  - content/he/sub-destinations/negev-bedouin-hospitality.mdx
  - public/images/sub-destinations/negev/
  - data/photo-credits.json
  - data/negev-images.md
  - app/sitemap.ts
  - tests/content/negev-region.test.ts
  - data/region-gates/negev.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
  - REG-05
must_haves:
  truths:
    - 'Visiting /en/negev/ and /negev/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Negev canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - '5 Negev sub-destinations exist EN+HE (Mitzpe Ramon, Avdat, Sde Boker, Ein Avdat, Bedouin hospitality) — 10 MDX total'
    - 'data/negev-images.md exists documenting Wikimedia 40-50% coverage gap + Phase 6 commission budget $1,500-$3,000 (REG-05)'
    - 'Image gallery 3-4 photos accepted (vs Jerusalem 6+) — image-gap canary validation'
    - 'Avdat sub-dest emits Place schema (Nabataean Spice Route UNESCO archaeological — NOT PlaceOfWorship)'
    - 'pnpm qa:region-gate negev exits 0 with PASS verdict; lower image count is gate-acceptable'
    - 'Bedouin hospitality framing respectful (no "exotic" tone)'
  artifacts:
    - path: 'content/en/regions/negev.mdx'
      provides: 'Negev EN canonical; desert + Nabataean + Bedouin editorial; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/negev.mdx'
      provides: 'Negev HE canonical native rewrite'
      min_lines: 150
    - path: 'data/negev-images.md'
      provides: 'Negev image-gap policy doc; Wikimedia coverage estimate; Phase 6 commission budget $1,500-$3,000; list of synthetic placeholder entries for real-image swap'
      contains: '$1,500'
    - path: 'data/region-gates/negev.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/sub-destinations/negev-avdat.mdx'
      to: 'lib/schema/place.ts (Place schema for Nabataean UNESCO site)'
      via: 'TouristAttraction + Place dual emission via renderer'
      pattern: 'TouristAttraction'
    - from: 'data/negev-images.md'
      to: 'data/photo-credits.json (synthetic placeholder entries flagged for Phase 6 swap)'
      via: 'documentation cross-reference; lists slugs requiring real-image commission'
      pattern: 'placeholder|swap|Phase 6'
---

<objective>
Plan 03-05 — Negev Desert region canonical + 5 sub-destinations (Wave 3 — IMAGE GAP CANARY for REG-05).

Negev is the image-gap canary for the replication system. CONTEXT.md locks Wikimedia 40-50% coverage estimate; this plan accepts a thinner 3-4 photo gallery vs Jerusalem's 6+ and documents the gap in `data/negev-images.md` for Phase 6 commissioning ($1,500-$3,000 budget approved or IGPO archive sourcing).

Per PITFALLS §4.6:

- **Mitzpe Ramon = Makhtesh Ramon overlook** (largest erosion crater in world; geological feature)
- **Avdat = Nabataean UNESCO** (Spice Route; Place schema)
- **Sde Boker = Ben-Gurion's kibbutz + grave** (national-historical)
- **Ein Avdat canyon = hiking destination**
- **Bedouin hospitality = experiential** (respectful framing — community partnerships; NOT "exotic native experience")
- **No religious-naming complexity** (low sensitivity Bedouin community framing only)

Output: 2 canonicals + 10 sub-destination MDX + 3-4 hero images + 5 sub-dest images + Wave 0 produces `data/negev-images.md` + soft-gate PASS.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/03-region-replication-m3/03-CONTEXT.md
@.planning/phases/03-region-replication-m3/03-RESEARCH.md
@.planning/phases/03-region-replication-m3/03-VALIDATION.md
@.planning/research/PITFALLS.md
@.planning/research/FEATURES.md
@.planning/phases/03-region-replication-m3/01-tel-aviv-PLAN.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_negev>

<!-- From PITFALLS §4.6 — Negev H-tag scaffold. -->

H1: Things to Do in the Negev Desert: 2026 Travel Guide

H2: When to Visit the Negev
H3: Autumn + Spring (best); Winter clear nights (stargazing); Summer extreme heat — avoid mid-day

H2: Where to Stay in the Negev
H3: Mitzpe Ramon (boutique desert lodges) vs Sde Boker kibbutz guesthouses vs Bedouin tent experience
Component: <WhereToStay partner="booking" city="Mitzpe Ramon" />

H2: Top Things to Do in the Negev
H3: Mitzpe Ramon Crater (Makhtesh Ramon — largest erosion crater in world)
H3: Avdat Nabataean archaeological site (UNESCO Spice Route)
H3: Ein Avdat canyon hike
H3: Sde Boker + Ben-Gurion's grave + Midrasha academy

H2: Stargazing in the Negev
H3: Mitzpe Ramon dark-sky park (Ramon Crater)
H3: Bedouin desert hospitality + night-sky observation

H2: Day Trips from the Negev
H3: Eilat (2hr south)
H3: Dead Sea (Masada via Arad route)
Component: <AffiliateCard partner="viator" destination="Negev" label="Negev + Mitzpe Ramon day tour" />

H2: How to Get to the Negev
Component: <TransportInfo partner="skyscanner" /> (TLV — closest airport)
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Negev road trip" />
Car essential — public transport sparse

H2: Where to Eat in the Negev
H3: Bedouin pita + zaatar
H3: Mitzpe Ramon micro-brewery
H3: Kibbutz dining (Sde Boker)

H2: Practical Tips
H3: Water (1L per hour outdoors)
H3: Cell signal patchy outside towns
H3: Bedouin tour bookings — community-partnership operators preferred
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />

H2: FAQ (5-10)
</pitfalls_h_tag_template_negev>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 3-4 Negev images + create data/negev-images.md REG-05 policy doc + update ledger</name>
  <files>
    public/images/regions/negev/hero.jpg,
    public/images/regions/negev/mitzpe-ramon.jpg,
    public/images/regions/negev/avdat.jpg,
    public/images/regions/negev/desert.jpg,
    data/photo-credits.json,
    data/negev-images.md
  </files>
  <action>
**Image-gap canary — accept thinner gallery + document gap.**

1. **Source 3-4 Negev images** (CONTEXT.md estimates 40-50% Wikimedia coverage — HIGH gap):
   - hero.jpg: Makhtesh Ramon crater overlook — Wikimedia abundant
   - mitzpe-ramon.jpg: Crater + visitor center — Wikimedia
   - avdat.jpg: Nabataean ruins — Wikimedia (UNESCO well-covered)
   - desert.jpg: Generic Negev landscape OR Bedouin tent — Wikimedia THIN; Unsplash OK for landscape

   Phase 2.1 pattern: Sharp placeholders with REAL Wikimedia URLs in ledger; flag placeholder entries for Phase 6 swap. Hero >=1600w; inline >=1200w. No restricted-set subjects.

2. **Create `data/negev-images.md`** documenting the REG-05 image-gap policy:

   ```markdown
   # Negev Desert — Image Sourcing Policy (REG-05)

   **Phase:** 03-region-replication-m3 / plan 05
   **Status:** v1 thin-gallery acceptable; Phase 6 commission gap documented

   ## Wikimedia Coverage Estimate (CONTEXT.md / PITFALLS §5.2)

   - Mitzpe Ramon / Makhtesh Ramon: 70-80% (well-covered geological feature)
   - Avdat Nabataean UNESCO: 65-75% (well-covered)
   - Bedouin hospitality scenes: 20-30% (respectful coverage thin)
   - Sde Boker / Ben-Gurion grave: 50-60% (national-historical)
   - Generic Negev landscape: 60-70%
   - **Aggregate v1 coverage: 40-50%** (image-gap canary)

   ## v1 Decision

   - Accept thinner 3-4 photo gallery (vs Jerusalem's 6+)
   - Synthetic Sharp-generated placeholder JPEGs at documented dimensions with REAL Wikimedia URLs in `data/photo-credits.json` ledger
   - All ledger entries valid + audit passes

   ## Phase 6 Commission Budget

   - Budget approved: $1,500–$3,000 USD
   - Subjects requiring real-image commission:
     - Bedouin hospitality scenes (respectful + consensual portraiture; community-partnership photographer)
     - Mitzpe Ramon crater rim panorama at golden hour
     - Avdat ruins drone shot (where airspace permitted)
     - Sde Boker kibbutz + Ben-Gurion grave area
     - Ein Avdat canyon hike POV
   - Alternative path: IGPO archive sourcing (free; subject to availability + restrictedSiteAcknowledgment)

   ## Synthetic Placeholder Entries Flagged for Phase 6 Swap

   - public/images/regions/negev/hero.jpg
   - public/images/regions/negev/mitzpe-ramon.jpg
   - public/images/regions/negev/desert.jpg
   - public/images/sub-destinations/negev/bedouin-hospitality.jpg (especially — respectful real photography matters)
   - (any others flagged by qa:credits as license=commissioned but on-disk placeholder)

   ## Last Reviewed

   2026-05-11 — Phase 3 plan 05 Wave 0
   ```

3. **Update `data/photo-credits.json`** with 3-4 Negev entries (region: 'negev', slug: 'negev'). Mark synthetic placeholder entries with comment field if schema permits.

4. **Run `pnpm qa:credits`** — MUST exit 0.
   </action>
   <verify>
   <automated>pnpm qa:credits</automated>
   <automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/negev-images.md'))process.exit(1); const c=fs.readFileSync('data/negev-images.md','utf8'); if(!/\\\$1,500/.test(c))process.exit(1)"</automated>
   <automated>node -e "const c=require('./data/photo-credits.json'); const r=c.filter(p=>p.region==='negev'); if(r.length<3)process.exit(1); for(const e of r) if(e.width<1200)process.exit(1)"</automated>
   </verify>
   <done>data/negev-images.md exists with $1,500-$3,000 Phase 6 budget note + Wikimedia coverage estimate + placeholder swap list; 3-4 Negev image ledger entries valid; pnpm qa:credits 0.</done>
   </task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/negev.mdx + content/he/regions/negev.mdx</name>
  <files>
    content/en/regions/negev.mdx,
    content/he/regions/negev.mdx,
    tests/content/negev-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 with "Negev"; 8-12 H2 per §4.6; word 1500-2500 (mid-band 1800-2100); ≥5 distinct AffiliateCard partners; Bedouin community framing respectful
    HE: ratio 0.85-1.40; HE "מה לעשות בנגב"; ktiv maleh
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical:**

- title="Things to Do in the Negev Desert: 2026 Travel Guide" (50-60), primaryKeyword="things to do in the Negev", secondaryKeywords=["Mitzpe Ramon","Makhtesh Ramon","Avdat","Sde Boker","Negev stargazing","Bedouin hospitality"]
- Body 1800-2100w per `<pitfalls_h_tag_template_negev>` verbatim
- **Bedouin framing editorial guidance:** respectful + factual; emphasize community-partnership operators (Khan al-Sultan, Kfar Hanokdim) not "tourist-trap"; acknowledge Bedouin Israeli citizenship; avoid "exotic native experience" framing
- **Affiliate placements (≥5):**
  - `<WhereToStay partner="booking" city="Mitzpe Ramon" />`
  - `<AffiliateCard partner="viator" destination="Negev" label="Negev + Mitzpe Ramon day tour" />`
  - `<AffiliateCard partner="getYourGuide" destination="Negev" label="Bedouin desert experience + hospitality" />`
  - `<TransportInfo partner="skyscanner" />` (TLV)
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Negev road trip" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Primary HE keyword: `מה לעשות בנגב`
- Mitzpe Ramon = `מצפה רמון`; Makhtesh Ramon = `מכתש רמון`; Avdat = `עבדת`; Sde Boker = `שדה בוקר`
- Bedouin community = `הקהילה הבדואית` (respectful)
- 0.90-1.05 ratio

Author tests + update sitemap. Validation pipeline as standard.

Avoid: "exotic" Bedouin framing; biased framing (AUD-018); raw partner URLs; HE word-count below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='negev'&&p.lang==='en'); const he=r.find(p=>p.slug==='negev'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/negev-region.test.ts</automated>
</verify>
<done>EN + HE Negev canonicals exist; REGION_CANONICAL ≥80 both; AUD rules 0; respectful Bedouin framing; 5+ partners; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 5 paired sub-destinations (Mitzpe Ramon, Avdat, Sde Boker, Ein Avdat, Bedouin hospitality) — 10 MDX files</name>
  <files>
    content/en/sub-destinations/negev-mitzpe-ramon.mdx,
    content/en/sub-destinations/negev-avdat.mdx,
    content/en/sub-destinations/negev-sde-boker.mdx,
    content/en/sub-destinations/negev-ein-avdat.mdx,
    content/en/sub-destinations/negev-bedouin-hospitality.mdx,
    content/he/sub-destinations/negev-mitzpe-ramon.mdx,
    content/he/sub-destinations/negev-avdat.mdx,
    content/he/sub-destinations/negev-sde-boker.mdx,
    content/he/sub-destinations/negev-ein-avdat.mdx,
    content/he/sub-destinations/negev-bedouin-hospitality.mdx,
    public/images/sub-destinations/negev/,
    data/photo-credits.json,
    tests/content/negev-region.test.ts
  </files>
  <behavior>
    Per sub-dest: slug=negev-{short}; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; AUD rules 0
    Avdat: Place schema (Nabataean UNESCO archaeological; NOT PlaceOfWorship; no religiousSiteId frontmatter)
    Bedouin hospitality: respectful community framing; no "exotic" tone; community-partnership operator emphasis
    No religiousSiteId for any sub-dest
  </behavior>
  <action>
Author 5 EN + 5 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter standard; NO religiousSiteId for any sub-dest (Negev has no religious-sites.json entries)
2. AffiliateCard per page:
   - negev-mitzpe-ramon → viator "Mitzpe Ramon crater stargazing tour"
   - negev-avdat → getYourGuide "Avdat Nabataean UNESCO guided tour"
   - negev-sde-boker → civitatis "Sde Boker + Ben-Gurion historical tour"
   - negev-ein-avdat → viator "Ein Avdat canyon hike"
   - negev-bedouin-hospitality → getYourGuide "Bedouin desert hospitality experience" (community-partnership operator preferred)
3. **Editorial: Bedouin hospitality page deserves particular care** — emphasize community-partnership operators, fair-wage practices, consensual portraiture; mention Khan al-Sultan / Kfar Hanokdim style operators; respect Bedouin Israeli citizenship; avoid "exotic" framing
4. **Avdat page:** Nabataean Spice Route UNESCO context; archaeological — Place schema only (NOT PlaceOfWorship since it's pre-Christian archaeological ruins)
5. Image: 1 hero each (Bedouin page especially flagged in data/negev-images.md for Phase 6 real-photo commission)

**Per-page HE:** native rewrite; 0.93-1.03 ratio.

Update sitemap. Validation as standard.

Avoid: "exotic" Bedouin tone; emitting PlaceOfWorship for Avdat (Place schema only); HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['negev-mitzpe-ramon','negev-avdat','negev-sde-boker','negev-ein-avdat','negev-bedouin-hospitality']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/negev-region.test.ts</automated>
</verify>
<done>10 Negev sub-destination MDX files exist; all SUB_DESTINATION ≥75; AUD rules 0; respectful Bedouin framing; Avdat as Place schema only; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate negev</name>
  <files>
    data/region-gates/negev.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate negev` — expect exit 0 even with thinner image gallery (gate evaluates audit scores, not image count)
3. PASS → append row. FAIL → 3 fix attempts; halt Negev after 3 (does NOT cascade per CONTEXT.md).

**Special verification:** confirm `data/negev-images.md` exists and is referenced in gate report (REG-05 deliverable).

Report row: 12 pages (2 canonical + 10 sub-dest); 5+ affiliate partners; image-gap canary acknowledged in data/negev-images.md; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate negev</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/negev.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/negev.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/negev-images.md'))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*negev\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate negev exits 0; Verdict: PASS; data/negev-images.md REG-05 policy doc exists with $1,500-$3,000 Phase 6 budget; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Negev canonicals + 5 EN + 5 HE sub-destinations exist
- `pnpm qa:audit` REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 10
- `data/negev-images.md` exists with REG-05 Phase 6 commission policy
- `pnpm qa:region-gate negev` exits 0 PASS
- Avdat emits Place schema (NOT PlaceOfWorship)
- AUD-007/017..020/024/025/031/032 all 0
- Image-gap canary validates: thinner 3-4 photo gallery acceptable per soft-gate criteria
</verification>

<success_criteria>
Negev region replicated despite Wikimedia image-gap (40-50% coverage); REG-05 deliverable (data/negev-images.md) ships with Phase 6 commission budget; respectful Bedouin framing; soft gate PASS. The image-gap canary validates: workflow handles photo-poor regions correctly.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/05-negev-SUMMARY.md` with sub-dest selection rationale, image-gap canary validation results, REG-05 policy doc summary, audit scores, Bedouin framing editorial decisions, soft-gate verdict, wall-clock time, lessons for image-poor regions in future phases.
</output>
</content>
</invoke>
