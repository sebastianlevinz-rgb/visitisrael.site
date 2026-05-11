---
phase: 03-region-replication-m3
plan: 08
type: execute
wave: 4
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/golan.mdx
  - content/he/regions/golan.mdx
  - public/images/regions/golan/
  - content/en/sub-destinations/golan-mount-bental.mdx
  - content/en/sub-destinations/golan-banias.mdx
  - content/en/sub-destinations/golan-nimrod-fortress.mdx
  - content/en/sub-destinations/golan-druze-villages.mdx
  - content/en/sub-destinations/golan-mount-hermon.mdx
  - content/he/sub-destinations/golan-mount-bental.mdx
  - content/he/sub-destinations/golan-banias.mdx
  - content/he/sub-destinations/golan-nimrod-fortress.mdx
  - content/he/sub-destinations/golan-druze-villages.mdx
  - content/he/sub-destinations/golan-mount-hermon.mdx
  - public/images/sub-destinations/golan/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/golan-region.test.ts
  - data/region-gates/golan.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/golan/ and /golan/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Golan Heights canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - '5 Golan sub-destinations exist EN+HE (Mount Bental, Banias, Nimrod Fortress, Druze villages, Mount Hermon) — 10 MDX total'
    - 'AUD-018 (biased framing) 0 violations: "Golan Heights" used WITHOUT political adjective; NO "Israeli-occupied" or "Judea and Samaria"'
    - 'Druze community framing respectful; mention Druze Israeli citizenship + cultural distinctiveness'
    - 'Banias / Caesarea Philippi disambiguation: first reference distinguishes from Caesarea Maritima (Plan 03-09)'
    - 'pnpm qa:region-gate golan exits 0 with PASS verdict'
    - 'Banias emits Place schema (archaeological Pan grotto); Nimrod Fortress emits Place (Crusader fortification)'
  artifacts:
    - path: 'content/en/regions/golan.mdx'
      provides: 'Golan EN canonical; nature + Druze + Crusader-archaeological editorial; 5+ affiliate partners; neutral political framing'
      min_lines: 150
    - path: 'content/he/regions/golan.mdx'
      provides: 'Golan HE canonical native rewrite (רמת הגולן)'
      min_lines: 150
    - path: 'data/region-gates/golan.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/regions/golan.mdx'
      to: 'lib/seo/naming.ts (AUD-018 biased-framing detector)'
      via: 'audit scans for "Israeli-occupied" / "Judea and Samaria" / contested adjectives — must be 0'
      pattern: 'Golan Heights'
    - from: 'content/{en,he}/sub-destinations/golan-banias.mdx'
      to: 'content/{en,he}/sub-destinations/caesarea-* (plan 09)'
      via: 'first-reference disambiguation: Banias / Caesarea Philippi vs Caesarea Maritima'
      pattern: 'Caesarea Philippi'
---

<objective>
Plan 03-08 — Golan Heights region canonical + 5 sub-destinations (Wave 4, parallel with Haifa + Akko).

Per PITFALLS §4.11:

- **Politically sensitive region** — internationally disputed; **use "Golan Heights" WITHOUT political adjective**; AUD-018 detector enforces no "Israeli-occupied" or "Judea and Samaria" (latter is West Bank framing — different region; still forbidden globally)
- **Druze community** — respectful framing; Druze are Israeli citizens with distinctive culture; Daliyat al-Karmel + Majdal Shams are major Druze villages
- **Schema:** Banias (archaeological Pan grotto) → Place; Nimrod Fortress (Crusader fortification) → Place; Mount Bental, Druze villages, Mount Hermon → TouristAttraction
- **Banias / Caesarea Philippi disambiguation** — Banias is the modern name; Caesarea Philippi is the Roman-era name; clarify on first reference to disambiguate from Caesarea Maritima (Plan 03-09)
- **Mount Hermon = Israel's only ski resort** (December-March); seasonal CTA

Output: 2 canonicals + 10 sub-destination MDX + 4-5 hero images + 5 sub-dest images + soft-gate PASS.
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
@.planning/phases/03-region-replication-m3/09-caesarea-PLAN.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@lib/seo/naming.ts
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_golan>
H1: Things to Do in the Golan Heights: Travel Guide 2026

H2: When to Visit the Golan Heights
H3: Spring + Autumn (best); Summer cool relative to coast; Winter — Mount Hermon ski season (Dec-Mar)

H2: Where to Stay in the Golan Heights
H3: Katzrin (regional center) vs Druze village guesthouses vs kibbutz tzimmer
Component: <WhereToStay partner="booking" city="Katzrin" />

H2: Top Things to Do in the Golan
H3: Mount Bental (volcanic crater + UN observation post)
H3: Banias / Caesarea Philippi (waterfall + Pan grotto archaeology)
H3: Nimrod Fortress (largest Crusader castle in Israel)
H3: Druze villages (Majdal Shams, Mas'ade)
H3: Mount Hermon (Israel's only ski resort; Dec-Mar)

H2: Druze Culture in the Golan
H3: Druze cuisine + hospitality (community-partnership operators)
H3: Druze identity in Israel (respectful framing)
H3: Daliyat al-Karmel side trip (Carmel mountain, technically Haifa area)

H2: Banias / Caesarea Philippi — Disambiguation
H3: This is NOT Caesarea Maritima (Mediterranean coast — see Caesarea travel guide)
H3: Banias is the modern name; Caesarea Philippi is the Roman-era name
H3: Pan grotto + Greek-Roman temple ruins

H2: Day Trips from the Golan
H3: Galilee (Sea of Galilee — link to Galilee canonical)
H3: Mount of Beatitudes / Capernaum (1hr drive)
H3: Akko (UNESCO — coast drive)
Component: <AffiliateCard partner="viator" destination="Golan Heights" label="Golan + Galilee day tour" />

H2: How to Get to the Golan
Component: <TransportInfo partner="skyscanner" />
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Golan + Galilee road trip" />
2.5hr drive from TLV; car essential

H2: Where to Eat in the Golan
H3: Druze pita + labneh (Majdal Shams)
H3: Kibbutz dining (Ein Zivan, Merom Golan)
H3: Golan winery experiences

H2: Practical Tips
H3: Mount Hermon ski-season chains/equipment
H3: Border-zone respect (no photography of military installations)
H3: Druze community visit etiquette
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />

H2: FAQ (5-10)
</pitfalls_h_tag_template_golan>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4-5 Golan images + update ledger</name>
  <files>
    public/images/regions/golan/hero.jpg,
    public/images/regions/golan/mount-bental.jpg,
    public/images/regions/golan/banias.jpg,
    public/images/regions/golan/nimrod-fortress.jpg,
    public/images/regions/golan/druze-villages.jpg,
    data/photo-credits.json
  </files>
  <action>
Source 4-5 Golan images (Wikimedia 45-55% HIGH gap per CONTEXT.md; filter military-installation backgrounds out):

- hero.jpg: Mount Hermon ski OR Banias waterfall — Wikimedia
- mount-bental.jpg: Volcanic crater + UN observation post — Wikimedia
- banias.jpg: Waterfall — Wikimedia abundant
- nimrod-fortress.jpg: Crusader fortification — Wikimedia
- druze-villages.jpg: Village rooftops / Majdal Shams — Wikimedia THIN; Unsplash respectful

Phase 2.1 pattern: Sharp placeholders + REAL URLs. Hero >=1600w. NO restricted-site subjects.

**CRITICAL:** Filter Wikimedia search results — exclude any image with military installations, soldiers, IDF tanks, or fortification photography near contested border zones. Tourist landscape only.

Update data/photo-credits.json — 4-5 entries (region: 'golan'). Run `pnpm qa:credits`.
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>node -e "const c=require('./data/photo-credits.json'); const r=c.filter(p=>p.region==='golan'); if(r.length<4)process.exit(1); for(const e of r) if(e.width<1200)process.exit(1)"</automated>
</verify>
<done>4-5 Golan image ledger entries valid (tourism subjects only — no military); pnpm qa:credits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/golan.mdx + content/he/regions/golan.mdx</name>
  <files>
    content/en/regions/golan.mdx,
    content/he/regions/golan.mdx,
    tests/content/golan-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 with "Golan Heights"; 8-12 H2 per §4.11; word 1500-2500; ≥5 distinct AffiliateCard partners; AUD-018 0 violations (no "Israeli-occupied" or "Judea and Samaria"); ecumenical Druze framing; faqs 5-10
    HE: ratio 0.85-1.40; H1 "מה לעשות ברמת הגולן"; ktiv maleh
    Banias disambiguation: first reference paired with "Caesarea Philippi" to distinguish from Caesarea Maritima
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical:**

- title="Things to Do in the Golan Heights: 2026 Travel Guide" (50-60), primaryKeyword="things to do in the Golan", secondaryKeywords=["Golan Heights","Mount Hermon ski","Banias waterfall","Nimrod Fortress","Druze villages","Mount Bental"]
- Body 1800-2100w per `<pitfalls_h_tag_template_golan>` verbatim
- **AUD-018 enforcement:** use "Golan Heights" WITHOUT political adjective consistently; describe geography neutrally (volcanic plateau in northern Israel); DO NOT use "Israeli-occupied" or "Judea and Samaria" (latter is West Bank, different region — still globally forbidden); mention internationally disputed status factually in 1 sentence if context demands, otherwise neutral
- **Druze framing:** respectful; mention Druze Israeli citizenship + cultural distinctiveness; community-partnership operators preferred; Majdal Shams + Mas'ade as major villages
- **Banias section:** include disambiguation paragraph "Banias / Caesarea Philippi" — NOT to be confused with Caesarea Maritima (Mediterranean coast — see Caesarea travel guide)
- **Affiliate placements (≥5):**
  - `<WhereToStay partner="booking" city="Katzrin" />` (regional center)
  - `<AffiliateCard partner="viator" destination="Golan Heights" label="Golan + Galilee day tour" />`
  - `<AffiliateCard partner="getYourGuide" destination="Golan Heights" label="Mount Hermon + Druze villages tour" />`
  - `<TransportInfo partner="skyscanner" />`
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Golan + Galilee road trip" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Primary HE keyword: `מה לעשות ברמת הגולן`
- Mount Bental = `הר בנטל`; Banias = `בניאס`; Nimrod Fortress = `מצודת נמרוד`; Druze = `דרוזי` / `הקהילה הדרוזית`; Mount Hermon = `החרמון`
- 0.90-1.05 ratio
- AUD-018 enforcement in HE: avoid `יהודה ושומרון` (Judea and Samaria HE equivalent)

Author tests + update sitemap. Validation standard.

Avoid: "Israeli-occupied territories" (AUD-018 fires); "Judea and Samaria" (global rule); single-narrative Druze framing; raw partner URLs; HE ratio below 0.85; military photography references.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='golan'&&p.lang==='en'); const he=r.find(p=>p.slug==='golan'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/golan-region.test.ts</automated>
</verify>
<done>EN + HE Golan canonicals exist; REGION_CANONICAL ≥80 both; AUD-018 0 violations (no biased framing); AUD-007/017-020/024/025 all 0; respectful Druze framing; 5+ partners; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 5 paired sub-destinations (Mount Bental, Banias, Nimrod Fortress, Druze villages, Mount Hermon) — 10 MDX files</name>
  <files>
    content/en/sub-destinations/golan-mount-bental.mdx,
    content/en/sub-destinations/golan-banias.mdx,
    content/en/sub-destinations/golan-nimrod-fortress.mdx,
    content/en/sub-destinations/golan-druze-villages.mdx,
    content/en/sub-destinations/golan-mount-hermon.mdx,
    content/he/sub-destinations/golan-mount-bental.mdx,
    content/he/sub-destinations/golan-banias.mdx,
    content/he/sub-destinations/golan-nimrod-fortress.mdx,
    content/he/sub-destinations/golan-druze-villages.mdx,
    content/he/sub-destinations/golan-mount-hermon.mdx,
    public/images/sub-destinations/golan/,
    data/photo-credits.json,
    tests/content/golan-region.test.ts
  </files>
  <behavior>
    Per sub-dest: slug=golan-{short}; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; AUD-018 0 (no biased framing); AUD-007 per pair in band
    Banias: TouristAttraction + Place (archaeological Pan grotto); first reference paired "Banias / Caesarea Philippi"
    Nimrod Fortress: TouristAttraction + Place (Crusader)
    Mount Bental, Druze villages, Mount Hermon: TouristAttraction only
    No religiousSiteId on any sub-dest (no PlaceOfWorship emission)
  </behavior>
  <action>
Author 5 EN + 5 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter standard; NO religiousSiteId for any sub-dest
2. AffiliateCard per page:
   - golan-mount-bental → viator "Golan Heights Mount Bental day tour"
   - golan-banias → civitatis "Banias waterfall + Caesarea Philippi archaeology" (use "Banias / Caesarea Philippi" disambiguation)
   - golan-nimrod-fortress → getYourGuide "Nimrod Fortress Crusader history tour"
   - golan-druze-villages → getYourGuide "Druze villages hospitality experience" (community-partnership operator preferred)
   - golan-mount-hermon → viator "Mount Hermon ski + summit cable car"
3. **Banias page editorial:**
   - **First reference paired:** "Banias / Caesarea Philippi (not to be confused with Caesarea Maritima on the Mediterranean coast)"
   - Pan grotto archaeology (Roman-Greek)
   - New Testament reference (Mark 8:27 — Peter's confession; light biblical context OK)
   - Schema: TouristAttraction + Place (NOT PlaceOfWorship — archaeological)
4. **Druze villages page editorial:**
   - Respectful + factual
   - Druze Israeli citizenship + military service participation
   - Community-partnership operators (avoid "exotic native" framing)
   - Majdal Shams + Mas'ade as villages; mention but DO NOT discuss internal Syrian-Druze identity politics
5. **Mount Hermon page:** seasonal ski (Dec-Mar); summer cable car; only Israeli ski resort

**Per-page HE:** native rewrite via hebrew-content-writer; 0.93-1.03 ratio.

Update sitemap. Validation standard.

Avoid: emitting PlaceOfWorship anywhere; "Israeli-occupied" framing (AUD-018); single-narrative Druze framing; HE ratio below 0.85; military references; raw partner URLs.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['golan-mount-bental','golan-banias','golan-nimrod-fortress','golan-druze-villages','golan-mount-hermon']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/golan-region.test.ts</automated>
</verify>
<done>10 Golan sub-destination MDX files exist; all SUB_DESTINATION ≥75; AUD-018 0 violations; Banias / Caesarea Philippi disambiguation present; Druze framing respectful; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate golan</name>
  <files>
    data/region-gates/golan.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate golan` — expect exit 0
3. PASS → append row. FAIL → 3 fix attempts; halt Golan after 3 (does NOT cascade per CONTEXT.md).

Report row: 12 pages (2 canonical + 10 sub-dest); 5+ partners; AUD-018 0 violations (neutral framing validated); Banias disambiguation present; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate golan</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/golan.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/golan.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*golan\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate golan exits 0; Verdict: PASS; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Golan canonicals + 5 EN + 5 HE sub-destinations exist
- REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 10
- AUD-018 0 violations across all pages (no "Israeli-occupied" / "Judea and Samaria")
- Banias / Caesarea Philippi disambiguation paragraph present in golan-banias page
- Banias + Nimrod Fortress emit Place schema (NOT PlaceOfWorship)
- `pnpm qa:region-gate golan` exits 0 PASS
</verification>

<success_criteria>
Golan Heights region replicated with neutral political framing (AUD-018 0 violations) + respectful Druze community framing + Banias/Caesarea Philippi disambiguation; soft gate PASS.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/08-golan-SUMMARY.md` with editorial decisions (neutral political framing; Druze community framing; Banias disambiguation strategy), audit scores, AUD-018 results, soft-gate verdict, wall-clock time.
</output>
</content>
</invoke>
