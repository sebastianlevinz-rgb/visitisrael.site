---
phase: 03-region-replication-m3
plan: 10
type: execute
wave: 4
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/akko.mdx
  - content/he/regions/akko.mdx
  - public/images/regions/akko/
  - content/en/sub-destinations/akko-old-city.mdx
  - content/en/sub-destinations/akko-hospitaller-knights.mdx
  - content/en/sub-destinations/akko-templar-tunnel.mdx
  - content/en/sub-destinations/akko-khan-al-umdan.mdx
  - content/en/sub-destinations/akko-bahai-mansion.mdx
  - content/he/sub-destinations/akko-old-city.mdx
  - content/he/sub-destinations/akko-hospitaller-knights.mdx
  - content/he/sub-destinations/akko-templar-tunnel.mdx
  - content/he/sub-destinations/akko-khan-al-umdan.mdx
  - content/he/sub-destinations/akko-bahai-mansion.mdx
  - public/images/sub-destinations/akko/
  - data/photo-credits.json
  - data/religious-sites.json
  - app/sitemap.ts
  - tests/content/akko-region.test.ts
  - data/region-gates/akko.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/akko/ and /akko/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Akko canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - "5 Akko sub-destinations exist EN+HE (Old City, Hospitaller Knights, Templar Tunnel, Khan al-Umdan, Bahá'í Mansion) — 10 MDX total"
    - '"Akko (Acre)" first-reference dual-naming consistent in EN per FEATURES §1'
    - "Bahá'í Mansion images carry restrictedSiteAcknowledgment (same Bahá'í community policy as Plan 07 Haifa)"
    - "Bahá'í Mansion emits Place schema (NOT PlaceOfWorship per Bahá'í convention — Bahjí is the holy site)"
    - 'Mixed Arab-Jewish editorial respectful; UNESCO Crusader heritage; Ottoman + British + Israeli history layered'
    - 'pnpm qa:region-gate akko exits 0 with PASS verdict'
  artifacts:
    - path: 'content/en/regions/akko.mdx'
      provides: 'Akko EN canonical; UNESCO Crusader + Ottoman + Arab-Jewish editorial; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/akko.mdx'
      provides: 'Akko HE canonical native rewrite (עכו)'
      min_lines: 150
    - path: 'data/region-gates/akko.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/sub-destinations/akko-bahai-mansion.mdx'
      to: 'data/photo-credits.json (restrictedSiteAcknowledgment populated)'
      via: "AUD-026 enforcement; same Bahá'í community policy as Haifa Plan 07"
      pattern: 'restrictedSiteAcknowledgment'
---

<objective>
Plan 03-10 — Akko (Acre) region canonical + 5 sub-destinations (Wave 4, parallel with Haifa + Golan).

Per PITFALLS §4.9:

- **UNESCO Crusader heritage city** — Old City inscribed 2001; layered Crusader / Ottoman / British / Israeli history
- **Dual-naming for the city itself:** **"Akko (Acre)" first reference per FEATURES §1** — both names used internationally; locked in CONTEXT.md
- **Mixed Arab-Jewish demographics** — respectful framing
- **Bahá'í Mansion of Bahjí (Bahá'í shrine outside Akko):** SECOND Bahá'í site after Haifa Plan 07 — same Bahá'í community photography policy applies; images carry restrictedSiteAcknowledgment; emits Place schema NOT PlaceOfWorship (per Bahá'í convention — Bahjí is the holy site/grave of Bahá'u'lláh; closed to non-Bahá'í tourists during pilgrimage hours)
- **Schema:** Old City + Hospitaller Knights + Templar Tunnel + Khan al-Umdan → Place (archaeological/heritage); Bahá'í Mansion → Place (per Bahá'í convention); NO PlaceOfWorship emissions

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
@.planning/phases/03-region-replication-m3/07-haifa-PLAN.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@data/religious-sites.json
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_akko>
H1: Things to Do in Akko (Acre): UNESCO Crusader City Guide 2026

H2: When to Visit Akko (Acre)
H3: Spring + Autumn (best); Summer Mediterranean swimming; Winter mild

H2: Where to Stay in Akko
H3: Akko Old City boutiques (Akkotel, Efendi) vs nearby Haifa
Component: <WhereToStay partner="booking" city="Akko" />

H2: Top Things to Do in Akko
H3: Old City (UNESCO Crusader walls + alleys)
H3: Hospitaller Knights' Halls (underground citadel)
H3: Templar Tunnel (12th-century engineering)
H3: Khan al-Umdan (Ottoman caravanserai + Turkish Bath / Hamam al-Pasha)
H3: Bahá'í Mansion of Bahjí (Bahá'í shrine — 4km north of Old City)

H2: Akko's Layered History
H3: Crusader period (1104-1291) — Hospitaller + Templar headquarters
H3: Ottoman period (1517-1917) — Khan al-Umdan caravanserai
H3: British Mandate (1917-1948) — prison + escape (Acre Prison Break)
H3: Modern Israeli mixed-city

H2: Bahá'í Mansion of Bahjí
H3: Holiest Bahá'í site (grave of Bahá'u'lláh; closed to non-Bahá'ís during pilgrimage hours)
H3: Architectural gardens (public terraces OK)
H3: Photography policy (same as Haifa — see Bahá'í Gardens travel info)

H2: Day Trips from Akko
H3: Haifa + Bahá'í Gardens (30min south)
H3: Rosh HaNikra (Lebanon border grottoes — 30min north)
H3: Nahariya beach (15min)
Component: <AffiliateCard partner="viator" destination="Akko" label="Akko + Haifa + Rosh HaNikra day tour" />

H2: How to Get to Akko (Acre)
Component: <TransportInfo partner="skyscanner" />
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Mediterranean coast" />
Train from TLV (90min); Haifa shuttle

H2: Where to Eat in Akko
H3: Hummus institutions (Hummus Said — line out the door)
H3: Knafeh + Arab-Israeli sweets
H3: Seafood (port-side)

H2: Practical Tips
H3: Combined ticket (Hospitaller Halls + Templar Tunnel + Turkish Bath)
H3: Bahá'í Mansion visiting hours + dress code
H3: Old City alleys narrow — wear walking shoes

H2: FAQ (5-10)
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />
</pitfalls_h_tag_template_akko>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4-5 Akko images + add bahai-mansion to religious-sites.json + update ledger with restrictedSiteAcknowledgment on Bahá'í images</name>
  <files>
    public/images/regions/akko/hero.jpg,
    public/images/regions/akko/old-city.jpg,
    public/images/regions/akko/hospitaller.jpg,
    public/images/regions/akko/bahai-mansion.jpg,
    data/photo-credits.json,
    data/religious-sites.json
  </files>
  <action>
1. **Verify/add religious-sites.json entry:**
   - bahai-mansion: `{"id":"bahai-mansion","nameEn":"Bahá'í Mansion of Bahjí","nameHe":"בית הבהאי בבהג'י","nameAr":"البهجة","category":"religious-site","religion":"Baha-i","coordinates":{"latitude":32.9434,"longitude":35.0925},"restrictedAccess":true,"pairedNamingRequired":false}` — restrictedAccess:true triggers AUD-026

2. **Source 4-5 Akko images** (Wikimedia 50-60% MEDIUM per CONTEXT.md; underground tunnels limited CC inventory):
   - hero.jpg: Akko Old City sea wall OR ramparts panorama — Wikimedia
   - old-city.jpg: Souq / alley / port wide — Wikimedia
   - hospitaller.jpg: Hospitaller Knights' Halls underground — Wikimedia THIN; Sharp placeholder OK
   - bahai-mansion.jpg: Bahá'í Mansion exterior + gardens (NOT shrine interior; NO pilgrims) — Wikimedia architectural

   Phase 2.1 pattern: Sharp placeholders + REAL URLs. Hero >=1600w. **Bahá'í Mansion image MUST carry restrictedSiteAcknowledgment** (same policy as Haifa Plan 07).

3. **Update data/photo-credits.json:**
   - 4-5 entries (region: 'akko', slug: 'akko')
   - bahai-mansion.jpg: subjectType: 'religious-site'; restrictedSiteAcknowledgment: "Wikimedia Commons wide architectural shot — no identifiable pilgrims/worshippers; Bahá'í International Community photo policy honored (same as Haifa — see data/haifa-bahai-policy.md); commercial commissioning gated on press@bahai.org permission"

4. Run `pnpm qa:credits` — MUST exit 0; AUD-026 0 violations.
   </action>
   <verify>
   <automated>pnpm qa:credits</automated>
   <automated>node -e "const r=require('./data/religious-sites.json'); if(!r.find(x=>x.id==='bahai-mansion'))process.exit(1)"</automated>
   <automated>node -e "const c=require('./data/photo-credits.json'); const b=c.find(p=>p.region==='akko' && /bahai|bahá|bahji|bahjí/i.test(p.src)); if(!b || !b.restrictedSiteAcknowledgment)process.exit(1)"</automated>
   </verify>
   <done>religious-sites.json has bahai-mansion; 4-5 Akko image ledger entries valid; Bahá'í Mansion image has restrictedSiteAcknowledgment; pnpm qa:credits 0.</done>
   </task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/akko.mdx + content/he/regions/akko.mdx</name>
  <files>
    content/en/regions/akko.mdx,
    content/he/regions/akko.mdx,
    tests/content/akko-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 with "Akko (Acre)"; 8-12 H2 per §4.9; word 1500-2500; ≥5 distinct AffiliateCard partners; "Akko (Acre)" dual-naming on first reference + appropriate context references; faqs 5-10
    HE: ratio 0.85-1.40; H1 "מה לעשות בעכו"; ktiv maleh
    Both: UNESCO Crusader heritage layered + Arab-Jewish mixed-city + Bahá'í shrine context respectful
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical:**

- title="Things to Do in Akko (Acre): UNESCO Crusader City 2026" (50-60), primaryKeyword="things to do in Akko", secondaryKeywords=["Akko UNESCO","Acre Crusader","Hospitaller Knights","Templar Tunnel","Bahá'í Mansion","Akko Old City"]
- Body 1800-2100w per `<pitfalls_h_tag_template_akko>` verbatim
- **"Akko (Acre)" dual-naming locked:** first reference in H1 + first paragraph; thereafter use "Akko" primarily with occasional "Acre" for English-speaker SEO; HE uses `עכו` consistently
- **Editorial — layered history:** Crusader (Hospitaller + Templar; 1104-1291) → Mamluk → Ottoman (Khan al-Umdan caravanserai 1785) → British Mandate (Acre Prison; 1947 escape) → modern Israeli mixed-city (~50K residents, ~30% Arab); respectful + factual
- **Editorial — Bahá'í Mansion of Bahjí:** holiest Bahá'í site (grave of Bahá'u'lláh; pilgrimage destination); architectural gardens public; Shrine interior closed to non-Bahá'ís during pilgrimage hours; reference Plan 07 Haifa policy (data/haifa-bahai-policy.md); SAME photo policy
- **Affiliate placements (≥5):**
  - `<WhereToStay partner="booking" city="Akko" />`
  - `<AffiliateCard partner="viator" destination="Akko" label="Akko + Haifa + Rosh HaNikra day tour" />`
  - `<AffiliateCard partner="civitatis" destination="Akko" label="Akko Old City + Hospitaller underground tour" />`
  - `<AffiliateCard partner="getYourGuide" destination="Akko" label="Crusader + Ottoman heritage tour" />`
  - `<TransportInfo partner="skyscanner" />`
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Mediterranean coast" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Primary HE keyword: `מה לעשות בעכו`
- Akko = `עכו`; Hospitaller = `אבירי בית החולים`; Templar = `הטמפלרים`; Khan al-Umdan = `ח'אן אל-עומדאן`; Bahá'í Mansion = `בית הבהאי בבהג'י`
- 0.90-1.05 ratio
- AUD-024 Latin wrapping for "Acre" and Crusader-era English terms used in HE

Author tests + update sitemap. Validation standard.

Avoid: showing pilgrims/worshippers in Bahá'í Mansion images (covered by ledger); single-narrative Arab-Jewish framing (be factual + respectful); raw partner URLs; HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='akko'&&p.lang==='en'); const he=r.find(p=>p.slug==='akko'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/akko-region.test.ts</automated>
</verify>
<done>EN + HE Akko canonicals exist; REGION_CANONICAL ≥80 both; "Akko (Acre)" dual-naming present; AUD-026 + AUD-007/017-020/024/025 all 0; respectful Bahá'í + Arab-Jewish framing; 5+ partners; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 5 paired sub-destinations (Old City, Hospitaller Knights, Templar Tunnel, Khan al-Umdan, Bahá'í Mansion) — 10 MDX files</name>
  <files>
    content/en/sub-destinations/akko-old-city.mdx,
    content/en/sub-destinations/akko-hospitaller-knights.mdx,
    content/en/sub-destinations/akko-templar-tunnel.mdx,
    content/en/sub-destinations/akko-khan-al-umdan.mdx,
    content/en/sub-destinations/akko-bahai-mansion.mdx,
    content/he/sub-destinations/akko-old-city.mdx,
    content/he/sub-destinations/akko-hospitaller-knights.mdx,
    content/he/sub-destinations/akko-templar-tunnel.mdx,
    content/he/sub-destinations/akko-khan-al-umdan.mdx,
    content/he/sub-destinations/akko-bahai-mansion.mdx,
    public/images/sub-destinations/akko/,
    data/photo-credits.json,
    tests/content/akko-region.test.ts
  </files>
  <behavior>
    Per sub-dest: slug=akko-{short}; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; AUD rules 0
    Bahá'í Mansion: religiousSiteId: bahai-mansion → renderer emits Place (NOT PlaceOfWorship per Bahá'í convention); image carries restrictedSiteAcknowledgment (AUD-026)
    Old City + Hospitaller + Templar Tunnel + Khan al-Umdan: TouristAttraction + Place (archaeological/heritage); NO religiousSiteId
  </behavior>
  <action>
Author 5 EN + 5 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter:
   - akko-bahai-mansion: `religiousSiteId: bahai-mansion` → renderer emits Place (NOT PlaceOfWorship); hero image carries restrictedSiteAcknowledgment
   - akko-old-city / akko-hospitaller-knights / akko-templar-tunnel / akko-khan-al-umdan: NO religiousSiteId (TouristAttraction + Place via separate path)
2. AffiliateCard per page:
   - akko-old-city → civitatis "Akko Old City + UNESCO walking tour"
   - akko-hospitaller-knights → getYourGuide "Hospitaller underground + Crusader history"
   - akko-templar-tunnel → viator "Templar Tunnel + Old City combined ticket"
   - akko-khan-al-umdan → civitatis "Khan al-Umdan + Turkish Bath cultural tour"
   - akko-bahai-mansion → getYourGuide "Bahá'í Mansion of Bahjí + Akko Old City"
3. **Old City page editorial:** UNESCO 2001 inscription; sea walls + alleys + souq + fishing port; mixed Arab-Jewish (~30% Arab); respectful
4. **Hospitaller page:** underground citadel; Knights Hospitaller HQ 1104-1291; Saladin siege 1187; recent restoration (1990s)
5. **Templar Tunnel page:** Templar HQ; 350m underground passage to port; 12th-century engineering
6. **Khan al-Umdan page:** Ottoman caravanserai 1785 (Ahmed Pasha al-Jazzar period); clock tower; Hamam al-Pasha Turkish Bath nearby
7. **Bahá'í Mansion page editorial:**
   - Holiest Bahá'í site (grave of Bahá'u'lláh; founder of Bahá'í Faith)
   - Gardens public-tour; Shrine interior closed to non-Bahá'ís during pilgrimage hours (respectful, not exclusion)
   - Photography policy: architectural OK; NO pilgrims/worshippers (same Bahá'í International Community policy as Haifa)
   - Schema: Place (NOT PlaceOfWorship per Bahá'í convention)
   - 4km north of Akko Old City; combined-ticket with Haifa Bahá'í Gardens possible

**Per-page HE:** native rewrite via hebrew-content-writer; 0.93-1.03 ratio.

Update sitemap. Validation standard.

Avoid: emitting PlaceOfWorship for Bahá'í Mansion (Place); showing pilgrims/worshippers; missing restrictedSiteAcknowledgment on Bahá'í images (AUD-026); HE ratio below 0.85; raw partner URLs.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['akko-old-city','akko-hospitaller-knights','akko-templar-tunnel','akko-khan-al-umdan','akko-bahai-mansion']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/akko-region.test.ts</automated>
</verify>
<done>10 Akko sub-destination MDX files exist; all SUB_DESTINATION ≥75; AUD-026 0 violations on Bahá'í Mansion; Bahá'í Mansion emits Place schema (NOT PlaceOfWorship); sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate akko</name>
  <files>
    data/region-gates/akko.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate akko` — expect exit 0
3. PASS → append row. FAIL → 3 fix attempts; halt Akko after 3 (does NOT cascade).

Report row: 12 pages (2 canonical + 10 sub-dest); 5+ partners; "Akko (Acre)" dual-naming present; Bahá'í Mansion schema validated; AUD-026 0 violations; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate akko</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/akko.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/akko.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*akko\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate akko exits 0; Verdict: PASS; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Akko canonicals + 5 EN + 5 HE sub-destinations exist
- REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 10
- "Akko (Acre)" dual-naming present on first reference
- Bahá'í Mansion emits Place schema (NOT PlaceOfWorship)
- AUD-026 0 violations on Bahá'í Mansion images (restrictedSiteAcknowledgment populated)
- `pnpm qa:region-gate akko` exits 0 PASS
</verification>

<success_criteria>
Akko (Acre) region replicated with UNESCO Crusader + Ottoman + Arab-Jewish editorial; "Akko (Acre)" dual-naming locked; Bahá'í Mansion schema correctly emitted as Place; soft gate PASS.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/10-akko-SUMMARY.md` with sub-dest selection rationale, dual-naming strategy ("Akko (Acre)"), Bahá'í Mansion policy implementation (cross-reference to Haifa Plan 07), audit scores, AUD-026 enforcement, soft-gate verdict, wall-clock time.
</output>
</content>
</invoke>
