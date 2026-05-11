---
phase: 03-region-replication-m3
plan: 06
type: execute
wave: 3
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/nazareth.mdx
  - content/he/regions/nazareth.mdx
  - public/images/regions/nazareth/
  - content/en/sub-destinations/nazareth-basilica-of-the-annunciation.mdx
  - content/en/sub-destinations/nazareth-old-city.mdx
  - content/en/sub-destinations/nazareth-marys-well.mdx
  - content/en/sub-destinations/nazareth-mount-of-precipice.mdx
  - content/he/sub-destinations/nazareth-basilica-of-the-annunciation.mdx
  - content/he/sub-destinations/nazareth-old-city.mdx
  - content/he/sub-destinations/nazareth-marys-well.mdx
  - content/he/sub-destinations/nazareth-mount-of-precipice.mdx
  - public/images/sub-destinations/nazareth/
  - data/photo-credits.json
  - data/religious-sites.json
  - app/sitemap.ts
  - tests/content/nazareth-region.test.ts
  - data/region-gates/nazareth.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/nazareth/ and /nazareth/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Nazareth canonical 1500-2500w EN; HE 0.85-1.40 ratio (target 0.90-1.05)'
    - "4 Nazareth sub-destinations exist EN+HE (Basilica of the Annunciation, Old City market, Mary's Well, Mount of Precipice) — 8 MDX total"
    - 'Basilica of the Annunciation emits PlaceOfWorship schema (Catholic Franciscan; major Christian pilgrimage)'
    - "Mary's Well emits Place schema or TouristAttraction (varies — Greek Orthodox/Bright Source jurisdiction)"
    - 'Editorial tone: Arab-Israeli city; ecumenical (Christian + Muslim heritage); respectful'
    - 'pnpm qa:region-gate nazareth exits 0 with PASS verdict; AUD-017..020 0 violations'
  artifacts:
    - path: 'content/en/regions/nazareth.mdx'
      provides: 'Nazareth EN canonical; Christian-pilgrimage + Arab-Israeli editorial; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/nazareth.mdx'
      provides: 'Nazareth HE canonical native rewrite (נצרת)'
      min_lines: 150
    - path: 'data/region-gates/nazareth.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/sub-destinations/nazareth-basilica-of-the-annunciation.mdx'
      to: 'lib/schema/religiousBuilding.ts (PlaceOfWorship emission)'
      via: 'religiousSiteId: basilica-of-the-annunciation frontmatter'
      pattern: 'religiousSiteId:\\s*basilica-of-the-annunciation'
    - from: 'content/{en,he}/regions/nazareth.mdx'
      to: 'data/religious-sites.json'
      via: "Hebrew nameHe + Arabic nameAr for Basilica + Mary's Well"
      pattern: 'הבזיליקה של הבשורה|בזיליקת הבשורה'
---

<objective>
Plan 03-06 — Nazareth region canonical + 4 sub-destinations (Wave 3, parallel with Negev + Caesarea).

Per PITFALLS §4.7:

- **Christian-pilgrimage + Arab-Israeli editorial:** Nazareth is Israel's largest Arab city; respect Christian (Catholic Franciscan custody at Basilica + Greek Orthodox at Mary's Well + several other Christian denominations) + Muslim (mosque references) heritage
- **No contested-compound naming required** — Basilica of the Annunciation has no contested-naming issue; ecumenical Christian tone
- **Schema:** Basilica → PlaceOfWorship (major Catholic Franciscan); Mary's Well → varies (TouristAttraction OR Place depending on framing); Old City + Mount of Precipice → TouristAttraction
- **Affiliate angle:** Civitatis + GetYourGuide are strong for Christian-pilgrimage tour partners

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
@.planning/phases/03-region-replication-m3/03-galilee-PLAN.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@data/religious-sites.json
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_nazareth>
H1: Things to Do in Nazareth: Christian Pilgrimage Guide 2026

H2: When to Visit Nazareth
H3: Spring + Autumn (best); Christmas (December) major pilgrimage draw — book early

H2: Where to Stay in Nazareth
H3: Old City boutique vs new city hotels
Component: <WhereToStay partner="booking" city="Nazareth" />

H2: Top Things to Do in Nazareth
H3: Basilica of the Annunciation (Catholic Franciscan; largest in Middle East)
H3: Old City + Souq (Arab-Israeli market)
H3: Mary's Well + Greek Orthodox Church of the Annunciation
H3: Mount of Precipice (panorama + Christian site)
H3: Synagogue Church (where Jesus reportedly preached)

H2: Christian Pilgrimage Routes
H3: Annunciation traditions (Catholic Latin vs Greek Orthodox)
H3: Jesus Trail (4-day Nazareth to Capernaum hike)
H3: Day trips to Cana of Galilee + Mount Tabor (Transfiguration)
Component: <AffiliateCard partner="viator" destination="Nazareth" label="Nazareth Christian sites guided tour" />

H2: Arab-Israeli Culture in Nazareth
H3: Cuisine (knafeh, kebab houses, baklava)
H3: Old City artisans + souq

H2: Day Trips from Nazareth
H3: Sea of Galilee (30min — link to Galilee canonical)
H3: Mount Tabor + Cana (Christian pilgrimage circuit)
H3: Caesarea Maritima (1hr coast)
Component: <AffiliateCard partner="getYourGuide" destination="Nazareth" label="Galilee Christian sites day tour" />

H2: How to Get to Nazareth
Component: <TransportInfo partner="skyscanner" />
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Galilee + Nazareth" />
Tiberias-Nazareth shuttle; 2hr drive from TLV

H2: Where to Eat in Nazareth
H3: Knafeh institutions (Diana, Mahroum)
H3: Hummus + kebab

H2: FAQ (5-10)
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />
</pitfalls_h_tag_template_nazareth>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4 Nazareth images + add basilica-of-the-annunciation + marys-well to religious-sites.json + update ledger</name>
  <files>
    public/images/regions/nazareth/hero.jpg,
    public/images/regions/nazareth/basilica.jpg,
    public/images/regions/nazareth/old-city.jpg,
    public/images/regions/nazareth/mount-of-precipice.jpg,
    data/photo-credits.json,
    data/religious-sites.json
  </files>
  <action>
1. **Verify/add religious-sites.json entries:**
   - basilica-of-the-annunciation: `{"id":"basilica-of-the-annunciation","nameEn":"Basilica of the Annunciation","nameHe":"בזיליקת הבשורה","nameAr":"كنيسة البشارة","category":"religious-site","religion":"Christianity","coordinates":{"latitude":32.7019,"longitude":35.2978},"restrictedAccess":false,"pairedNamingRequired":false}`
   - marys-well (optional — if you want Place schema): `{"id":"marys-well","nameEn":"Mary's Well","nameHe":"מעיין מרים","nameAr":"عين العذراء","category":"religious-site","religion":"Christianity","coordinates":{"latitude":32.7039,"longitude":35.2986},"restrictedAccess":false,"pairedNamingRequired":false}`

2. **Source 4 Nazareth images** (Wikimedia 55-65% MEDIUM coverage per CONTEXT.md; Basilica well-covered):
   - hero.jpg: Nazareth Old City rooftops OR Basilica exterior — Wikimedia abundant
   - basilica.jpg: Basilica of the Annunciation facade — Wikimedia abundant
   - old-city.jpg: Souq stall OR alley — Wikimedia + Unsplash mix
   - mount-of-precipice.jpg: Panorama from cliff — Wikimedia

   Phase 2.1 pattern: Sharp placeholders + REAL URLs. Hero >=1600w; inline >=1200w.

3. **Update data/photo-credits.json** — 4 entries (region: 'nazareth').

Run `pnpm qa:credits` — MUST exit 0.
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>node -e "const r=require('./data/religious-sites.json'); if(!r.find(x=>x.id==='basilica-of-the-annunciation'))process.exit(1)"</automated>
</verify>
<done>religious-sites.json has basilica-of-the-annunciation; 4 Nazareth image ledger entries valid; pnpm qa:credits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/nazareth.mdx + content/he/regions/nazareth.mdx</name>
  <files>
    content/en/regions/nazareth.mdx,
    content/he/regions/nazareth.mdx,
    tests/content/nazareth-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 with "Nazareth"; 8-12 H2 per §4.7; word 1500-2500; ≥5 distinct AffiliateCard partners; Arab-Israeli + ecumenical Christian editorial tone; faqs 5-10
    HE: ratio 0.85-1.40; H1 "מה לעשות בנצרת" or native; ktiv maleh
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical:**

- title="Things to Do in Nazareth: Christian Pilgrimage Guide 2026" (50-60), primaryKeyword="things to do in Nazareth", secondaryKeywords=["Nazareth pilgrimage","Basilica of the Annunciation","Nazareth Old City","Mary's Well","Jesus Trail","Mount of Precipice"]
- Body 1800-2100w per `<pitfalls_h_tag_template_nazareth>` verbatim
- **Editorial tone:** Christian-pilgrimage respectful + ecumenical (acknowledge Catholic Franciscan custody at Basilica + Greek Orthodox at Mary's Well + Protestant pilgrimage traditions); ALSO acknowledge Arab-Israeli context (Nazareth is Israel's largest Arab city, ~75K residents, 30% Christian / 70% Muslim) — respectful, non-political
- **Affiliate placements (≥5):**
  - `<WhereToStay partner="booking" city="Nazareth" />`
  - `<AffiliateCard partner="viator" destination="Nazareth" label="Nazareth Christian sites guided tour" />`
  - `<AffiliateCard partner="getYourGuide" destination="Nazareth" label="Galilee Christian sites day tour" />`
  - `<AffiliateCard partner="civitatis" destination="Nazareth" label="Old City + Souq walking tour" />`
  - `<TransportInfo partner="skyscanner" />`
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Galilee + Nazareth" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Primary HE keyword: `מה לעשות בנצרת`
- Basilica = `בזיליקת הבשורה`; Old City = `העיר העתיקה`; Mary's Well = `מעיין מרים`; Mount of Precipice = `הר הקפיצה`
- 0.90-1.05 ratio
- AUD-024 Latin wrapping

Author tests + update sitemap. Validation standard.

Avoid: single-tradition Christian framing (be ecumenical); political framing of Arab-Israeli context (keep factual + respectful); raw partner URLs; HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='nazareth'&&p.lang==='en'); const he=r.find(p=>p.slug==='nazareth'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/nazareth-region.test.ts</automated>
</verify>
<done>EN + HE Nazareth canonicals exist; REGION_CANONICAL ≥80 both; AUD-007/017-020/024/025 all 0; ecumenical Christian + Arab-Israeli framing respectful; 5+ partners; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 4 paired sub-destinations (Basilica, Old City, Mary's Well, Mount of Precipice) — 8 MDX files</name>
  <files>
    content/en/sub-destinations/nazareth-basilica-of-the-annunciation.mdx,
    content/en/sub-destinations/nazareth-old-city.mdx,
    content/en/sub-destinations/nazareth-marys-well.mdx,
    content/en/sub-destinations/nazareth-mount-of-precipice.mdx,
    content/he/sub-destinations/nazareth-basilica-of-the-annunciation.mdx,
    content/he/sub-destinations/nazareth-old-city.mdx,
    content/he/sub-destinations/nazareth-marys-well.mdx,
    content/he/sub-destinations/nazareth-mount-of-precipice.mdx,
    public/images/sub-destinations/nazareth/,
    data/photo-credits.json,
    tests/content/nazareth-region.test.ts
  </files>
  <behavior>
    Per sub-dest: slug=nazareth-{short}; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; AUD rules 0
    Basilica of the Annunciation: religiousSiteId frontmatter set → PlaceOfWorship + TouristAttraction dual emission; ecumenical Catholic-Franciscan tone
    Mary's Well: optional religiousSiteId (decide per author; Greek Orthodox Church of the Annunciation is the actual church; well is symbolic)
    Old City + Mount of Precipice: TouristAttraction only (no religiousSiteId)
  </behavior>
  <action>
Author 4 EN + 4 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter:
   - nazareth-basilica-of-the-annunciation: `religiousSiteId: basilica-of-the-annunciation` → PlaceOfWorship
   - nazareth-marys-well: `religiousSiteId: marys-well` (if added to religious-sites.json) OR no religiousSiteId
   - nazareth-old-city: NO religiousSiteId (TouristAttraction)
   - nazareth-mount-of-precipice: NO religiousSiteId (TouristAttraction — secular outlook)
2. AffiliateCard per page:
   - nazareth-basilica-of-the-annunciation → viator "Basilica + Christian pilgrimage half-day"
   - nazareth-old-city → civitatis "Nazareth Old City + Souq walking tour"
   - nazareth-marys-well → getYourGuide "Mary's Well + Greek Orthodox Annunciation tour"
   - nazareth-mount-of-precipice → viator "Galilee panorama tour"
3. **Editorial — Basilica page:** Catholic Franciscan custody; 1969 design (Antonio Barluzzi); largest Christian church in Middle East; ecumenical respect for Catholic Latin tradition vs Greek Orthodox tradition (which has its own Mary's Well church)
4. **Editorial — Old City page:** Arab-Israeli market + Christian + Muslim residents; respectful + factual
5. Image: 1 hero each; Wikimedia + IGPO

**Per-page HE:** native rewrite via hebrew-content-writer; 0.93-1.03 ratio.

Update sitemap. Validation standard.

Avoid: single-Christian-tradition framing (ecumenical); biased framing for Arab-Israeli context; raw partner URLs; emitting PlaceOfWorship for Mount of Precipice (TouristAttraction only).
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['nazareth-basilica-of-the-annunciation','nazareth-old-city','nazareth-marys-well','nazareth-mount-of-precipice']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/nazareth-region.test.ts</automated>
</verify>
<done>8 Nazareth sub-destination MDX files exist; all SUB_DESTINATION ≥75; AUD rules 0; Basilica emits PlaceOfWorship; ecumenical Christian tone; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate nazareth</name>
  <files>
    data/region-gates/nazareth.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate nazareth` — expect exit 0
3. PASS → append row. FAIL → 3 fix attempts; halt Nazareth after 3 (does NOT cascade per CONTEXT.md).

Report row: 10 pages (2 canonical + 8 sub-dest); affiliate partners; PlaceOfWorship validated on Basilica; AUD-017..020 0 violations; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate nazareth</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/nazareth.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/nazareth.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*nazareth\s*\|.*PASS \|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate nazareth exits 0; Verdict: PASS; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Nazareth canonicals + 4 EN + 4 HE sub-destinations exist
- REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 8
- Basilica of the Annunciation emits PlaceOfWorship schema
- AUD-007/017..020 (esp. ecumenical religious-naming) 0 violations
- `pnpm qa:region-gate nazareth` exits 0 PASS
</verification>

<success_criteria>
Nazareth region replicated with respectful Christian-pilgrimage + Arab-Israeli framing; Basilica PlaceOfWorship schema validated; soft gate PASS.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/06-nazareth-SUMMARY.md` with editorial decisions (ecumenical Christian framing; Arab-Israeli context), sub-dest schema choices, audit scores, AUD-017..020 results, soft-gate verdict, wall-clock time.
</output>
</content>
</invoke>
