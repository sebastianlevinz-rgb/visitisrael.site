---
phase: 03-region-replication-m3
plan: 07
type: execute
wave: 4
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/haifa.mdx
  - content/he/regions/haifa.mdx
  - public/images/regions/haifa/
  - content/en/sub-destinations/haifa-bahai-gardens.mdx
  - content/en/sub-destinations/haifa-german-colony.mdx
  - content/en/sub-destinations/haifa-stella-maris.mdx
  - content/en/sub-destinations/haifa-wadi-nisnas.mdx
  - content/en/sub-destinations/haifa-carmel-national-park.mdx
  - content/he/sub-destinations/haifa-bahai-gardens.mdx
  - content/he/sub-destinations/haifa-german-colony.mdx
  - content/he/sub-destinations/haifa-stella-maris.mdx
  - content/he/sub-destinations/haifa-wadi-nisnas.mdx
  - content/he/sub-destinations/haifa-carmel-national-park.mdx
  - public/images/sub-destinations/haifa/
  - data/photo-credits.json
  - data/haifa-bahai-policy.md
  - data/religious-sites.json
  - app/sitemap.ts
  - tests/content/haifa-region.test.ts
  - data/region-gates/haifa.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
  - REG-05
must_haves:
  truths:
    - 'Visiting /en/haifa/ and /haifa/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Haifa canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - "5 Haifa sub-destinations exist EN+HE (Bahá'í Gardens, German Colony, Stella Maris Monastery, Wadi Nisnas, Carmel National Park) — 10 MDX total"
    - 'data/haifa-bahai-policy.md exists documenting Wikimedia-ONLY photo policy + press@bahai.org email gate for Phase 6 commissioning (REG-05)'
    - "ALL Bahá'í Gardens images carry restrictedSiteAcknowledgment field (AUD-026 enforced)"
    - "Bahá'í Gardens emits Place schema (NOT PlaceOfWorship per Bahá'í conventions — Shrine of the Báb is the holy site, gardens are landscape architecture)"
    - 'Stella Maris emits PlaceOfWorship (Carmelite monastery)'
    - 'pnpm qa:region-gate haifa exits 0 with PASS verdict'
  artifacts:
    - path: 'content/en/regions/haifa.mdx'
      provides: "Haifa EN canonical; Bahá'í World Centre + Mediterranean port editorial; 5+ affiliate partners"
      min_lines: 150
    - path: 'content/he/regions/haifa.mdx'
      provides: 'Haifa HE canonical native rewrite'
      min_lines: 150
    - path: 'data/haifa-bahai-policy.md'
      provides: "Bahá'í photography policy doc; Wikimedia-only constraint v1; Phase 6 commissioning gate at press@bahai.org"
      contains: 'press@bahai.org'
    - path: 'data/region-gates/haifa.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/sub-destinations/haifa-bahai-gardens.mdx'
      to: 'data/photo-credits.json (restrictedSiteAcknowledgment populated)'
      via: "AUD-026 enforcement — every Bahá'í image carries acknowledgment"
      pattern: 'restrictedSiteAcknowledgment'
    - from: 'content/{en,he}/sub-destinations/haifa-stella-maris.mdx'
      to: 'lib/schema/religiousBuilding.ts (PlaceOfWorship)'
      via: 'religiousSiteId: stella-maris frontmatter'
      pattern: 'religiousSiteId:\\s*stella-maris'
---

<objective>
Plan 03-07 — Haifa region canonical + 5 sub-destinations (Wave 4 — POLICY GAP CANARY for REG-05).

Per PITFALLS §3.7 / §4.10 / §5.4:

- **Bahá'í World Centre is sensitive** — Bahá'í International Community prohibits photography of pilgrims/worshippers; architectural/garden public-terrace shots OK; commercial commissioning requires press@bahai.org written permission
- **v1 strategy LOCKED in CONTEXT.md:** Wikimedia ONLY for Bahá'í imagery; DO NOT commission new shoots; document policy in `data/haifa-bahai-policy.md`; Phase 6 task is real commissioning if obtained
- **ALL Bahá'í Gardens images MUST have restrictedSiteAcknowledgment populated** (AUD-026 enforces)
- **Bahá'í Gardens = Place schema NOT PlaceOfWorship** per Bahá'í convention — the Shrine of the Báb (terrace 11) is the actual holy site (closed to non-Bahá'ís); the Gardens themselves are landscape architecture (UNESCO 2008)
- **Stella Maris Monastery = PlaceOfWorship** (Carmelite Catholic; active monastery)
- **German Colony, Wadi Nisnas, Carmel National Park = TouristAttraction only**
- **No restricted-site issues for non-Bahá'í Haifa subjects**

Output: 2 canonicals + 10 sub-destination MDX + 4-5 hero images + 5 sub-dest images + Wave 0 produces `data/haifa-bahai-policy.md` + soft-gate PASS.
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
@data/religious-sites.json
@data/photo-credits.json
@lib/photo-credits-schema.ts
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_haifa>
H1: Things to Do in Haifa: Bahá'í World Centre Travel Guide 2026

H2: When to Visit Haifa
H3: Spring + Autumn (best); Carmel National Park flora; mild Mediterranean climate year-round

H2: Where to Stay in Haifa
H3: German Colony (boutique + walkable) vs Carmel slopes (residential) vs port
Component: <WhereToStay partner="booking" city="Haifa" />

H2: Top Things to Do in Haifa
H3: Bahá'í Gardens (UNESCO terraces — public viewing levels)
H3: German Colony (Templer architecture + restaurants)
H3: Stella Maris Carmelite Monastery
H3: Wadi Nisnas Christian-Arab quarter
H3: Carmel National Park + Mount Carmel

H2: The Bahá'í World Centre
H3: UNESCO terraces (2008 inscription)
H3: Shrine of the Báb (terrace 11; closed to non-Bahá'ís — respect)
H3: Photography policy (architectural/garden public-terrace OK; pilgrims/worshippers prohibited)
H3: International Teaching Centre + Universal House of Justice (governance buildings)

H2: Day Trips from Haifa
H3: Akko (UNESCO Crusader Old City — 30min)
H3: Caesarea Maritima (45min south)
H3: Druze villages (Daliyat al-Karmel — Carmel mountain side trip)
Component: <AffiliateCard partner="viator" destination="Haifa" label="Haifa + Akko + Caesarea day tour" />

H2: How to Get to Haifa
Component: <TransportInfo partner="skyscanner" />
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Mediterranean coast drive" />
Train from TLV (1hr); Carmelit underground funicular

H2: Where to Eat in Haifa
H3: Wadi Nisnas hummus + falafel institutions
H3: German Colony brasseries
H3: Druze pita + labneh (Daliyat side trip)

H2: Practical Tips
H3: Bahá'í Gardens free public-tour 12:00 daily (English; check schedule)
H3: Respect Shrine of the Báb closure to non-Bahá'ís
H3: Sunday-Friday is the Israeli weekend cycle; Shabbat partial closures

H2: FAQ (5-10)
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />
</pitfalls_h_tag_template_haifa>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Create data/haifa-bahai-policy.md (REG-05) + source 4-5 Haifa images Wikimedia-ONLY for Bahá'í + add stella-maris/bahai-gardens to religious-sites.json + update ledger</name>
  <files>
    public/images/regions/haifa/hero.jpg,
    public/images/regions/haifa/bahai-gardens.jpg,
    public/images/regions/haifa/german-colony.jpg,
    public/images/regions/haifa/stella-maris.jpg,
    public/images/regions/haifa/carmel.jpg,
    data/photo-credits.json,
    data/haifa-bahai-policy.md,
    data/religious-sites.json
  </files>
  <action>
**Policy-gap canary — Wikimedia-only Bahá'í + document policy for Phase 6.**

1. **Create `data/haifa-bahai-policy.md`** documenting REG-05 policy:

   ```markdown
   # Haifa Bahá'í Photography Policy (REG-05)

   **Phase:** 03-region-replication-m3 / plan 07
   **Status:** v1 Wikimedia-only; Phase 6 commissioning gated on press@bahai.org written permission

   ## Bahá'í International Community Policy

   - Photography of pilgrims and worshippers is prohibited per Bahá'í convention
   - Architectural and garden public-terrace shots are permitted
   - Commercial commissioning (paid photography for monetized site) requires written permission from press@bahai.org
   - Reference: Bahá'í International Community public guidance; Shrine of the Báb on terrace 11 is closed to non-Bahá'ís

   ## v1 Decision (LOCKED in CONTEXT.md)

   - Use ONLY Wikimedia Commons CC-BY / CC-BY-SA architectural/garden public-terrace images
   - DO NOT commission new Bahá'í-related photography in v1
   - ALL Bahá'í Gardens images MUST carry restrictedSiteAcknowledgment field (AUD-026 enforces)
   - Schema: Bahá'í Gardens emits Place (landscape architecture); NOT PlaceOfWorship (Shrine of the Báb is the holy site, gardens are heritage architecture)

   ## Wikimedia Files Used (v1)

   | File                                  | Author             | License  | Source URL                                  | restrictedSiteAcknowledgment                                                                                                   |
   | ------------------------------------- | ------------------ | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
   | bahai-gardens.jpg                     | (Wikimedia author) | CC-BY-SA | https://commons.wikimedia.org/wiki/File:... | "Wikimedia Commons wide architectural shot — no identifiable worshippers; Bahá'í International Community photo policy honored" |
   | (additional inline images as sourced) | ...                | ...      | ...                                         | ...                                                                                                                            |

   ## Phase 6 Commissioning Gate

   1. Draft email to press@bahai.org explaining:
      - Commercial affiliate-marketing website (Discover Israel / visitisrael.site)
      - Specific photography needs (architectural exterior; garden terraces; NO worshippers; NO Shrine interior)
      - Photographer credentials
      - Intended publication scope
   2. Await written response (typical 4-6 weeks)
   3. If permission granted → commission per BIC guidelines; update photo-credits.json licenseProof field
   4. If denied → continue with Wikimedia-only indefinitely; document refusal in this file

   ## Last Reviewed

   2026-05-11 — Phase 3 plan 07 Wave 0
   ```

2. **Verify/add religious-sites.json entries:**
   - bahai-gardens: `{"id":"bahai-gardens","nameEn":"Bahá'í Gardens","nameHe":"הגנים הבהאיים","nameAr":"الحدائق البهائية","category":"religious-site","religion":"Baha-i","coordinates":{"latitude":32.8167,"longitude":34.9867},"restrictedAccess":true,"pairedNamingRequired":false}` — restrictedAccess:true triggers restrictedSiteAcknowledgment requirement
   - stella-maris: `{"id":"stella-maris","nameEn":"Stella Maris Carmelite Monastery","nameHe":"מנזר סטלה מאריס","nameAr":"دير ستيلا ماريس","category":"religious-site","religion":"Christianity","coordinates":{"latitude":32.8267,"longitude":34.9700},"restrictedAccess":false,"pairedNamingRequired":false}`

3. **Source 4-5 Haifa images** (Wikimedia 65-75% LOW-MEDIUM gap per CONTEXT.md):
   - hero.jpg: Bahá'í Gardens panorama from top terrace — Wikimedia abundant (architectural)
   - bahai-gardens.jpg: Garden terrace detail — Wikimedia (architectural, no worshippers)
   - german-colony.jpg: Templer house facade OR Ben-Gurion Avenue — Wikimedia
   - stella-maris.jpg: Carmelite monastery exterior — Wikimedia
   - carmel.jpg: Carmel National Park OR Mount Carmel overlook — Wikimedia

   Phase 2.1 pattern: Sharp placeholders with REAL Wikimedia URLs. Hero >=1600w. **ALL Bahá'í-subject ledger entries MUST have restrictedSiteAcknowledgment populated.**

4. **Update data/photo-credits.json:**
   - 4-5 entries with region: 'haifa', slug: 'haifa'
   - bahai-gardens.jpg + hero.jpg (if depicts Bahá'í Gardens): subjectType: 'religious-site'; restrictedSiteAcknowledgment: "Wikimedia Commons wide architectural shot — no identifiable worshippers; Bahá'í International Community photo policy honored; commercial commissioning requires press@bahai.org permission (deferred to Phase 6 — see data/haifa-bahai-policy.md)"
   - german-colony.jpg + carmel.jpg: subjectType: architecture / landscape; no restrictedSiteAcknowledgment

5. **Run `pnpm qa:credits`** — MUST exit 0; AUD-026 enforced.
   </action>
   <verify>
   <automated>pnpm qa:credits</automated>
   <automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/haifa-bahai-policy.md'))process.exit(1); if(!/press@bahai\\.org/.test(fs.readFileSync('data/haifa-bahai-policy.md','utf8')))process.exit(1)"</automated>
   <automated>node -e "const r=require('./data/religious-sites.json'); for (const id of ['bahai-gardens','stella-maris']) if(!r.find(x=>x.id===id))process.exit(1)"</automated>
   <automated>node -e "const c=require('./data/photo-credits.json'); const bahai=c.filter(p=>p.region==='haifa'&&/bahai|bahá|hero/i.test(p.src)); if(bahai.length===0)process.exit(1); for(const e of bahai) if(e.subjectType==='religious-site' && !e.restrictedSiteAcknowledgment){console.error('missing restrictedSiteAcknowledgment on',e.src);process.exit(1)}"</automated>
   </verify>
   <done>data/haifa-bahai-policy.md exists with press@bahai.org Phase 6 gate; religious-sites.json has bahai-gardens (restrictedAccess:true) + stella-maris; 4-5 Haifa image ledger entries valid; ALL Bahá'í-subject entries have restrictedSiteAcknowledgment populated; pnpm qa:credits 0.</done>
   </task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/haifa.mdx + content/he/regions/haifa.mdx</name>
  <files>
    content/en/regions/haifa.mdx,
    content/he/regions/haifa.mdx,
    tests/content/haifa-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 with "Haifa"; 8-12 H2 per §4.10; word 1500-2500; ≥5 distinct AffiliateCard partners; Bahá'í photography policy referenced respectfully; ecumenical (Bahá'í + Christian + Druze + Arab-Israeli)
    HE: ratio 0.85-1.40; H1 "מה לעשות בחיפה"; ktiv maleh
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical:**

- title="Things to Do in Haifa: Bahá'í World Centre Guide 2026" (50-60), primaryKeyword="things to do in Haifa", secondaryKeywords=["Bahá'í Gardens","German Colony Haifa","Stella Maris","Carmel National Park","Wadi Nisnas","Haifa Bahá'í World Centre"]
- Body 1800-2100w per `<pitfalls_h_tag_template_haifa>` verbatim
- **Editorial — Bahá'í section:** respectful + factual; mention free 12:00 public tour; explain Shrine of the Báb closure to non-Bahá'ís (not exclusion — Bahá'í convention); reference UNESCO 2008 inscription; photography policy mentioned (architectural OK; pilgrims/worshippers prohibited)
- **Editorial — Wadi Nisnas:** Christian-Arab quarter; respectful + culinary focus
- **Editorial — Druze side trip (Daliyat al-Karmel):** mention but DO NOT include as sub-dest in this plan (Phase 4 long-tail if SEO supports)
- **Affiliate placements (≥5):**
  - `<WhereToStay partner="booking" city="Haifa" />`
  - `<AffiliateCard partner="viator" destination="Haifa" label="Haifa + Akko + Caesarea day tour" />`
  - `<AffiliateCard partner="getYourGuide" destination="Haifa" label="Bahá'í Gardens + German Colony walking tour" />`
  - `<AffiliateCard partner="civitatis" destination="Haifa" label="Carmel National Park guided hike" />`
  - `<TransportInfo partner="skyscanner" />`
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Mediterranean coast" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Primary HE keyword: `מה לעשות בחיפה`
- Bahá'í Gardens = `הגנים הבהאיים`; German Colony = `המושבה הגרמנית`; Stella Maris = `סטלה מאריס`; Wadi Nisnas = `ואדי ניסנאס`
- 0.90-1.05 ratio
- AUD-024 Latin handling

Author tests + update sitemap. Validation standard.

Avoid: showing pilgrims/worshippers in Bahá'í images (covered by ledger acknowledgment + Wave 0 image sourcing); calling Shrine of the Báb closure "exclusive" (it's a Bahá'í convention); raw partner URLs; biased framing for Arab-Israeli/Druze context; HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='haifa'&&p.lang==='en'); const he=r.find(p=>p.slug==='haifa'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/haifa-region.test.ts</automated>
</verify>
<done>EN + HE Haifa canonicals exist; REGION_CANONICAL ≥80 both; AUD-026 (restrictedSiteAcknowledgment) + AUD-007/017-020/024/025 all 0; respectful Bahá'í + ecumenical framing; 5+ partners; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 5 paired sub-destinations (Bahá'í Gardens, German Colony, Stella Maris, Wadi Nisnas, Carmel National Park) — 10 MDX files</name>
  <files>
    content/en/sub-destinations/haifa-bahai-gardens.mdx,
    content/en/sub-destinations/haifa-german-colony.mdx,
    content/en/sub-destinations/haifa-stella-maris.mdx,
    content/en/sub-destinations/haifa-wadi-nisnas.mdx,
    content/en/sub-destinations/haifa-carmel-national-park.mdx,
    content/he/sub-destinations/haifa-bahai-gardens.mdx,
    content/he/sub-destinations/haifa-german-colony.mdx,
    content/he/sub-destinations/haifa-stella-maris.mdx,
    content/he/sub-destinations/haifa-wadi-nisnas.mdx,
    content/he/sub-destinations/haifa-carmel-national-park.mdx,
    public/images/sub-destinations/haifa/,
    data/photo-credits.json,
    tests/content/haifa-region.test.ts
  </files>
  <behavior>
    Per sub-dest: slug=haifa-{short}; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; AUD rules 0
    Bahá'í Gardens: religiousSiteId: bahai-gardens → renderer emits Place + TouristAttraction (NOT PlaceOfWorship per Bahá'í convention); hero image carries restrictedSiteAcknowledgment
    Stella Maris: religiousSiteId: stella-maris → PlaceOfWorship (Carmelite monastery)
    German Colony, Wadi Nisnas, Carmel National Park: NO religiousSiteId (TouristAttraction only)
    AUD-026 = 0 violations on all Bahá'í-subject images
  </behavior>
  <action>
Author 5 EN + 5 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter:
   - haifa-bahai-gardens: `religiousSiteId: bahai-gardens` → renderer emits Place (NOT PlaceOfWorship per Bahá'í convention — verify renderer respects category=religious-site + religion=Baha-i to emit Place not PlaceOfWorship; if renderer doesn't differentiate, fall back to TouristAttraction + manual Place schema injection)
   - haifa-stella-maris: `religiousSiteId: stella-maris` → PlaceOfWorship
   - haifa-german-colony / haifa-wadi-nisnas / haifa-carmel-national-park: NO religiousSiteId (TouristAttraction)
2. AffiliateCard per page:
   - haifa-bahai-gardens → getYourGuide "Bahá'í Gardens + German Colony walking tour"
   - haifa-german-colony → civitatis "German Colony Templer architecture tour"
   - haifa-stella-maris → viator "Stella Maris + Carmel monasteries"
   - haifa-wadi-nisnas → civitatis "Wadi Nisnas food + culture walk"
   - haifa-carmel-national-park → viator "Carmel National Park guided hike"
3. **Bahá'í Gardens page — special editorial:**
   - Public-tour 12:00 daily; reservation policy if changed
   - Shrine of the Báb closure to non-Bahá'ís — respect, not exclude
   - Photography policy: architectural OK; pilgrims/worshippers prohibited
   - Reference data/haifa-bahai-policy.md indirectly via "per Bahá'í International Community policy"
   - UNESCO 2008 inscription
   - Schema: Place (NOT PlaceOfWorship) — gardens are landscape architecture; Shrine is the actual holy site (separate, closed)
4. **Image sourcing:** ALL Bahá'í-subject images carry restrictedSiteAcknowledgment per Wave 0 ledger; non-Bahá'í images standard

**Per-page HE:** native rewrite via hebrew-content-writer; 0.93-1.03 ratio.

Update sitemap. Validation standard.

Avoid: emitting PlaceOfWorship for Bahá'í Gardens (Place per Bahá'í convention); showing pilgrims/worshippers; HE ratio below 0.85; raw partner URLs; missing restrictedSiteAcknowledgment on Bahá'í-subject images (AUD-026 fires).
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['haifa-bahai-gardens','haifa-german-colony','haifa-stella-maris','haifa-wadi-nisnas','haifa-carmel-national-park']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/haifa-region.test.ts</automated>
</verify>
<done>10 Haifa sub-destination MDX files exist; all SUB_DESTINATION ≥75; AUD-026 0 violations on all Bahá'í-subject images; Bahá'í Gardens emits Place schema; Stella Maris emits PlaceOfWorship; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate haifa</name>
  <files>
    data/region-gates/haifa.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate haifa` — expect exit 0
3. PASS → append row. FAIL → 3 fix attempts; halt Haifa after 3 (does NOT cascade per CONTEXT.md).

**Special verification:** confirm `data/haifa-bahai-policy.md` exists; AUD-026 = 0 on all Bahá'í-subject pages (REG-05 deliverable).

Report row: 12 pages (2 canonical + 10 sub-dest); 5+ affiliate partners; AUD-026 = 0; data/haifa-bahai-policy.md referenced; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate haifa</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/haifa.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/haifa.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/haifa-bahai-policy.md'))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*haifa\s*\|.*PASS \|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate haifa exits 0; Verdict: PASS; data/haifa-bahai-policy.md REG-05 policy doc exists with press@bahai.org Phase 6 gate; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Haifa canonicals + 5 EN + 5 HE sub-destinations exist
- REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 10
- `data/haifa-bahai-policy.md` exists with REG-05 Phase 6 commissioning gate
- AUD-026 (restrictedSiteAcknowledgment) 0 violations on all Bahá'í-subject pages
- Bahá'í Gardens emits Place schema (NOT PlaceOfWorship); Stella Maris emits PlaceOfWorship
- AUD-007/017..020/024/025/031/032 all 0
- `pnpm qa:region-gate haifa` exits 0 PASS
- Policy-gap canary validates: workflow handles restricted-source regions correctly
</verification>

<success_criteria>
Haifa region replicated with respectful Bahá'í + ecumenical Mediterranean editorial; REG-05 Bahá'í photography policy doc shipped; AUD-026 0 violations; Bahá'í Gardens correctly schema'd as Place; Stella Maris as PlaceOfWorship; soft gate PASS. Policy-gap canary validates: workflow handles restricted-source regions correctly.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/07-haifa-SUMMARY.md` with Bahá'í photography policy implementation, sub-dest schema decisions (Place vs PlaceOfWorship for Bahá'í Gardens), audit scores, AUD-026 enforcement validation, soft-gate verdict, wall-clock time, lessons for restricted-source regions.
</output>
</content>
</invoke>
