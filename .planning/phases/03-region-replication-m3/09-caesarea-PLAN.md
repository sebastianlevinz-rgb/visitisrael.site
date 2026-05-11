---
phase: 03-region-replication-m3
plan: 09
type: execute
wave: 3
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/caesarea.mdx
  - content/he/regions/caesarea.mdx
  - public/images/regions/caesarea/
  - content/en/sub-destinations/caesarea-national-park.mdx
  - content/en/sub-destinations/caesarea-harbour.mdx
  - content/en/sub-destinations/caesarea-aqueduct-beach.mdx
  - content/en/sub-destinations/caesarea-ralli-museum.mdx
  - content/he/sub-destinations/caesarea-national-park.mdx
  - content/he/sub-destinations/caesarea-harbour.mdx
  - content/he/sub-destinations/caesarea-aqueduct-beach.mdx
  - content/he/sub-destinations/caesarea-ralli-museum.mdx
  - public/images/sub-destinations/caesarea/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/caesarea-region.test.ts
  - data/region-gates/caesarea.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/caesarea/ and /caesarea/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Caesarea canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - '4 Caesarea sub-destinations exist EN+HE (National Park/Roman ruins, Crusader Harbour, Aqueduct Beach, Ralli Museum) — 8 MDX total'
    - 'Caesarea Maritima vs Caesarea Philippi disambiguation: first reference clarifies this is "Caesarea Maritima (Mediterranean coast — Herodian Roman port)" NOT Banias / Caesarea Philippi (Golan — Plan 08)'
    - 'All sub-dests emit TouristAttraction + Place schema (UNESCO Roman+Crusader archaeology); NO PlaceOfWorship'
    - 'pnpm qa:region-gate caesarea exits 0 with PASS verdict'
  artifacts:
    - path: 'content/en/regions/caesarea.mdx'
      provides: 'Caesarea EN canonical; Herodian + Roman + Crusader archaeology editorial; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/caesarea.mdx'
      provides: 'Caesarea HE canonical native rewrite (קיסריה)'
      min_lines: 150
    - path: 'data/region-gates/caesarea.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/regions/caesarea.mdx'
      to: 'content/{en,he}/sub-destinations/golan-banias.mdx (Plan 08)'
      via: 'Caesarea Maritima / Caesarea Philippi first-reference disambiguation'
      pattern: 'Caesarea Maritima'
---

<objective>
Plan 03-09 — Caesarea region canonical + 4 sub-destinations (Wave 3, parallel with Negev + Nazareth).

Per PITFALLS §4.8:

- **Herodian Roman + Crusader archaeological focus** — UNESCO national park
- **Caesarea Maritima vs Caesarea Philippi disambiguation** — first reference clarifies this is the Mediterranean coast Herodian port (NOT Banias/Caesarea Philippi in the Golan, Plan 08)
- **Schema:** all sub-dests emit Place schema (archaeological UNESCO; NOT PlaceOfWorship — pre-Christian Roman/Crusader; even Roman Theatre + Crusader cathedral are archaeological reconstructions)
- **No religious-naming complexity** (Herodian + Roman period; no contested-compound)
- **Affiliate angle:** Civitatis archaeology day-tours; Booking for nearby Zichron Yaakov boutique stays

Output: 2 canonicals + 8 sub-destination MDX + 4 hero images + 4 sub-dest images + soft-gate PASS.
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
@.planning/phases/03-region-replication-m3/08-golan-PLAN.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_caesarea>
H1: Things to Do in Caesarea: Roman Port Travel Guide 2026

H2: When to Visit Caesarea
H3: Spring + Autumn (best); Summer Mediterranean swimming; Winter mild

H2: Where to Stay near Caesarea
H3: Caesarea (small boutique) vs Zichron Yaakov (nearby winery village) vs Haifa drive
Component: <WhereToStay partner="booking" city="Caesarea" />

H2: Top Things to Do in Caesarea
H3: Caesarea National Park (Roman + Crusader ruins on Mediterranean coast)
H3: Caesarea Maritima Harbour (Herodian engineering; first artificial deep-water port in antiquity)
H3: Roman Theatre + amphitheater + hippodrome
H3: Aqueduct Beach (Roman aqueduct + swimming)
H3: Ralli Museum (Latin American + European art)

H2: Caesarea Maritima — Disambiguation
H3: This is NOT Caesarea Philippi (Golan Heights — see Banias / Caesarea Philippi in Golan travel guide)
H3: Herod the Great founded this Mediterranean port (~25 BCE)
H3: Continuously inhabited Roman → Byzantine → Crusader → Mamluk → modern

H2: Caesarea Day Trips
H3: Haifa + Bahá'í Gardens (45min north)
H3: Akko (UNESCO Crusader Old City — 1hr north)
H3: Zichron Yaakov (winery village — 20min)
Component: <AffiliateCard partner="viator" destination="Caesarea" label="Caesarea + Haifa + Akko day tour" />

H2: How to Get to Caesarea
Component: <TransportInfo partner="skyscanner" />
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Mediterranean coast" />
45min drive from TLV; 30min from Haifa; train + shuttle option

H2: Where to Eat near Caesarea
H3: Zichron Yaakov winery restaurants
H3: Caesarea harbor seafood

H2: Practical Tips
H3: Combined ticket (national park + harbour + museum)
H3: Underwater archaeology snorkel tour (seasonal)

H2: FAQ (5-10)
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />
</pitfalls_h_tag_template_caesarea>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4 Caesarea images + update ledger</name>
  <files>
    public/images/regions/caesarea/hero.jpg,
    public/images/regions/caesarea/roman-theatre.jpg,
    public/images/regions/caesarea/harbour.jpg,
    public/images/regions/caesarea/aqueduct.jpg,
    data/photo-credits.json
  </files>
  <action>
Source 4 Caesarea images (Wikimedia 60-70% MEDIUM-LOW gap per CONTEXT.md; UNESCO archaeological coverage strong):

- hero.jpg: Caesarea Maritima coast + ruins panorama — Wikimedia abundant
- roman-theatre.jpg: Restored Roman amphitheater — Wikimedia
- harbour.jpg: Herodian harbor remains — Wikimedia
- aqueduct.jpg: Aqueduct Beach — Wikimedia

Phase 2.1 pattern: Sharp placeholders + REAL URLs. Hero >=1600w. NO restricted-site subjects.

Update data/photo-credits.json — 4 entries (region: 'caesarea'). Run `pnpm qa:credits`.
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>node -e "const c=require('./data/photo-credits.json'); const r=c.filter(p=>p.region==='caesarea'); if(r.length<3)process.exit(1); for(const e of r) if(e.width<1200)process.exit(1)"</automated>
</verify>
<done>4 Caesarea image ledger entries valid; pnpm qa:credits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/caesarea.mdx + content/he/regions/caesarea.mdx</name>
  <files>
    content/en/regions/caesarea.mdx,
    content/he/regions/caesarea.mdx,
    tests/content/caesarea-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 with "Caesarea"; 8-12 H2 per §4.8; word 1500-2500; ≥5 distinct AffiliateCard partners; "Caesarea Maritima" first-reference disambiguation present; faqs 5-10
    HE: ratio 0.85-1.40; H1 "מה לעשות בקיסריה"; ktiv maleh
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical:**

- title="Things to Do in Caesarea: Roman Port Guide 2026" (50-60), primaryKeyword="things to do in Caesarea", secondaryKeywords=["Caesarea Maritima","Caesarea National Park","Roman Theatre","Crusader Harbour","Aqueduct Beach"]
- Body 1800-2100w per `<pitfalls_h_tag_template_caesarea>` verbatim
- **CRITICAL disambiguation** in first reference: "Caesarea Maritima (Mediterranean coast Herodian Roman port — NOT to be confused with Banias / Caesarea Philippi in the Golan Heights, see Golan travel guide)"
- **Editorial:** Herodian + Roman + Crusader archaeological focus; UNESCO 2010 inscription; underwater archaeology snorkel option (seasonal)
- **Affiliate placements (≥5):**
  - `<WhereToStay partner="booking" city="Caesarea" />`
  - `<AffiliateCard partner="civitatis" destination="Caesarea" label="Caesarea archaeology guided tour" />`
  - `<AffiliateCard partner="viator" destination="Caesarea" label="Caesarea + Haifa + Akko day tour" />`
  - `<AffiliateCard partner="getYourGuide" destination="Caesarea" label="Caesarea + Zichron Yaakov winery day" />`
  - `<TransportInfo partner="skyscanner" />`
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Mediterranean coast" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Primary HE keyword: `מה לעשות בקיסריה`
- Caesarea = `קיסריה`; Caesarea Maritima HE = `קיסריה מאריטימה`; Roman Theatre = `התיאטרון הרומי`; Harbour = `הנמל`
- 0.90-1.05 ratio
- AUD-024 Latin wrapping for "Caesarea Maritima" / "Caesarea Philippi" if used directly in HE

Author tests + update sitemap. Validation standard.

Avoid: confusing Caesarea Maritima with Caesarea Philippi (Plan 08 Golan); raw partner URLs; HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='caesarea'&&p.lang==='en'); const he=r.find(p=>p.slug==='caesarea'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/caesarea-region.test.ts</automated>
</verify>
<done>EN + HE Caesarea canonicals exist; REGION_CANONICAL ≥80 both; Caesarea Maritima disambiguation present; AUD rules 0; 5+ partners; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 4 paired sub-destinations (National Park, Harbour, Aqueduct Beach, Ralli Museum) — 8 MDX files</name>
  <files>
    content/en/sub-destinations/caesarea-national-park.mdx,
    content/en/sub-destinations/caesarea-harbour.mdx,
    content/en/sub-destinations/caesarea-aqueduct-beach.mdx,
    content/en/sub-destinations/caesarea-ralli-museum.mdx,
    content/he/sub-destinations/caesarea-national-park.mdx,
    content/he/sub-destinations/caesarea-harbour.mdx,
    content/he/sub-destinations/caesarea-aqueduct-beach.mdx,
    content/he/sub-destinations/caesarea-ralli-museum.mdx,
    public/images/sub-destinations/caesarea/,
    data/photo-credits.json,
    tests/content/caesarea-region.test.ts
  </files>
  <behavior>
    Per sub-dest: slug=caesarea-{short}; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; AUD rules 0
    All sub-dests: TouristAttraction + Place schema (archaeological/cultural — NOT PlaceOfWorship)
    No religiousSiteId on any sub-dest
  </behavior>
  <action>
Author 4 EN + 4 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter standard; NO religiousSiteId
2. AffiliateCard per page:
   - caesarea-national-park → civitatis "Caesarea archaeology guided tour"
   - caesarea-harbour → getYourGuide "Caesarea Harbour + underwater archaeology"
   - caesarea-aqueduct-beach → viator "Caesarea aqueduct + beach day"
   - caesarea-ralli-museum → civitatis "Caesarea + Ralli Museum cultural tour"
3. **National Park page editorial:** Herod the Great founder; Continuously inhabited Roman → Byzantine → Crusader → Mamluk; restored amphitheater + hippodrome + Crusader cathedral ruins
4. **Harbour page editorial:** First artificial deep-water port in antiquity; Herodian engineering using hydraulic concrete; submerged remains today
5. **Aqueduct Beach page:** Roman aqueduct + swimming; combination CT
6. **Ralli Museum:** Latin American + European art (privately funded); free admission

**Per-page HE:** native rewrite via hebrew-content-writer; 0.93-1.03 ratio.

Update sitemap. Validation standard.

Avoid: emitting PlaceOfWorship (all archaeological/cultural — Place only); confusing with Caesarea Philippi; raw partner URLs; HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['caesarea-national-park','caesarea-harbour','caesarea-aqueduct-beach','caesarea-ralli-museum']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/caesarea-region.test.ts</automated>
</verify>
<done>8 Caesarea sub-destination MDX files exist; all SUB_DESTINATION ≥75; AUD rules 0; no PlaceOfWorship emission; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate caesarea</name>
  <files>
    data/region-gates/caesarea.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate caesarea` — expect exit 0
3. PASS → append row. FAIL → 3 fix attempts; halt Caesarea after 3 (does NOT cascade).

Report row: 10 pages (2 canonical + 8 sub-dest); 5+ partners; Caesarea Maritima disambiguation present; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate caesarea</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/caesarea.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/caesarea.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*caesarea\s*\|.*PASS \|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate caesarea exits 0; Verdict: PASS; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Caesarea canonicals + 4 EN + 4 HE sub-destinations exist
- REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 8
- Caesarea Maritima / Caesarea Philippi disambiguation paragraph present
- All sub-dests emit TouristAttraction + Place (NOT PlaceOfWorship)
- `pnpm qa:region-gate caesarea` exits 0 PASS
</verification>

<success_criteria>
Caesarea region replicated with archaeological Roman+Crusader editorial; Maritima/Philippi disambiguation locked; soft gate PASS.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/09-caesarea-SUMMARY.md` with sub-dest selection rationale, schema decisions (Place not PlaceOfWorship for archaeological), audit scores, disambiguation strategy from Plan 08, soft-gate verdict, wall-clock time.
</output>
</content>
</invoke>
