---
phase: 03-region-replication-m3
plan: 04
type: execute
wave: 2
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/eilat.mdx
  - content/he/regions/eilat.mdx
  - public/images/regions/eilat/
  - content/en/sub-destinations/eilat-coral-beach.mdx
  - content/en/sub-destinations/eilat-underwater-observatory.mdx
  - content/en/sub-destinations/eilat-timna-park.mdx
  - content/en/sub-destinations/eilat-dolphin-reef.mdx
  - content/en/sub-destinations/eilat-red-canyon.mdx
  - content/he/sub-destinations/eilat-coral-beach.mdx
  - content/he/sub-destinations/eilat-underwater-observatory.mdx
  - content/he/sub-destinations/eilat-timna-park.mdx
  - content/he/sub-destinations/eilat-dolphin-reef.mdx
  - content/he/sub-destinations/eilat-red-canyon.mdx
  - public/images/sub-destinations/eilat/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/eilat-region.test.ts
  - data/region-gates/eilat.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/eilat/ and /eilat/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Eilat canonical 1500-2500w EN; HE 0.85-1.40 ratio'
    - '5 Eilat sub-destinations exist EN+HE (Coral Beach, Underwater Observatory, Timna Park, Dolphin Reef, Red Canyon) — 10 MDX total'
    - 'All Eilat sub-dests emit TouristAttraction only (no religious sites in Eilat)'
    - 'Affiliate density heavy on transport — Skyscanner (separate Eilat ETM airport ramat-david/ovda) + RentalCars for Negev road-trip combo + SafetyWing for diving insurance'
    - 'pnpm qa:region-gate eilat exits 0 with PASS verdict'
  artifacts:
    - path: 'content/en/regions/eilat.mdx'
      provides: 'Eilat EN canonical; tourism-enclave + Red Sea diving framing; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/eilat.mdx'
      provides: 'Eilat HE canonical native rewrite'
      min_lines: 150
    - path: 'data/region-gates/eilat.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/regions/eilat.mdx'
      to: 'components/travel/TransportInfo (Skyscanner — Eilat has separate airport ETM)'
      via: 'TransportInfo composite invocation'
      pattern: '<TransportInfo'
    - from: 'content/{en,he}/sub-destinations/eilat-*.mdx'
      to: 'content/{en,he}/regions/eilat.mdx'
      via: 'BreadcrumbList parent'
      pattern: "parentRegion:\\s*eilat"
---

<objective>
Plan 03-04 — Eilat region canonical + 5 sub-destinations (Wave 2, parallel with Dead Sea + Galilee).

Eilat is the southern Red Sea tourism enclave. Per PITFALLS §4.4:

- **No religious-naming complexity** — pure tourism destination (Coral Beach, Red Sea diving, Timna Park geology)
- **Image strategy:** Wikimedia 50-60% MEDIUM gap; Red Sea diving photography thin — supplement with Unsplash/Pexels (uniqueness less critical for beach destinations)
- **Heavy transport affiliate density:** Skyscanner has separate Eilat ETM/Ovda airport routing; RentalCars for Negev road-trip combo (Mitzpe Ramon → Eilat 2hr drive); SafetyWing for Red Sea diving insurance
- **Schema:** all sub-dests TouristAttraction only

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
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-03-SUMMARY.md
@.planning/phases/03-region-replication-m3/01-tel-aviv-PLAN.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@scripts/qa/region-gate.mjs

<pitfalls_h_tag_template_eilat>

<!-- From PITFALLS §4.4 — Eilat H-tag scaffold. -->

H1: Things to Do in Eilat: Red Sea Travel Guide 2026

H2: When to Visit Eilat
H3: Autumn + Spring (best — 25-30°C); Winter mild (20-25°C — best escape from European winter); Summer extremely hot (40°C+)
H3: Red Sea coral reef + year-round swimming temperature

H2: Where to Stay in Eilat
H3: North Beach (resort hotels) vs Coral Beach (boutique + diving) vs city center (budget)
Component: <WhereToStay partner="booking" city="Eilat" />

H2: Top Things to Do in Eilat
H3: Coral Beach Reserve (Israel's only reef-protected snorkel beach)
H3: Underwater Observatory Marine Park
H3: Dolphin Reef (interactive marine sanctuary)
H3: Timna Park (Solomon's Pillars + Bronze Age copper mining)
H3: Red Canyon (geology hike)

H2: Red Sea Diving
H3: Coral Beach Nature Reserve diving sites
H3: Japanese Gardens (advanced)
H3: Diving certification + insurance considerations
Component: <AffiliateCard partner="safetyWing" label="Diving + travel insurance for Israel" />

H2: Day Trips from Eilat
H3: Timna Park (15min)
H3: Petra, Jordan (border crossing day-tour — visa-on-arrival)
H3: Negev (Mitzpe Ramon 2hr north)
Component: <AffiliateCard partner="viator" destination="Eilat" label="Petra from Eilat day tour" />

H2: How to Get to Eilat
Component: <TransportInfo partner="skyscanner" airport="ETM" /> (Eilat Ramon Airport — separate from TLV)
Component: <AffiliateCard partner="rentalcars" destination="Eilat" label="Rent car in Eilat" />
Bus from TLV (5hr); flight from TLV (50min); Negev road-trip combo

H2: Where to Eat in Eilat
H3: Seafood (Red Sea provenance)
H3: Hummus institutions

H2: Practical Tips for Eilat
H3: Sun protection (Negev sun + Red Sea reflection)
H3: Visa for Petra side trip
H3: Reef-safe sunscreen (Coral Beach Reserve enforcement)

H2: FAQ (5-10)
</pitfalls_h_tag_template_eilat>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4-5 Eilat images + update ledger</name>
  <files>
    public/images/regions/eilat/hero.jpg,
    public/images/regions/eilat/coral-beach.jpg,
    public/images/regions/eilat/red-sea.jpg,
    public/images/regions/eilat/timna-park.jpg,
    data/photo-credits.json
  </files>
  <action>
Source 4-5 Eilat images per CONTEXT.md (50-60% Wikimedia MEDIUM; Red Sea diving thin — supplement Unsplash/Pexels).

Survey candidates:

- hero.jpg: Eilat skyline at sunset / Red Sea horizon — Unsplash + Wikimedia mix
- coral-beach.jpg: Coral Beach reserve underwater — Wikimedia THIN; Pexels OK
- red-sea.jpg: Wide Red Sea + Sinai mountains backdrop — Wikimedia
- timna-park.jpg: Solomon's Pillars OR mushroom rock — Wikimedia abundant
- (optional) dolphins-reef.jpg

Phase 2.1 pattern: Sharp placeholders with REAL source URLs. Hero >=1600w. Add 4-5 ledger entries (region: 'eilat'). No restricted subjects.

Run `pnpm qa:credits`.
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>node -e "const c=require('./data/photo-credits.json'); const r=c.filter(p=>p.region==='eilat'); if(r.length<4)process.exit(1); for(const e of r) if(e.width<1200)process.exit(1)"</automated>
</verify>
<done>4-5 Eilat image ledger entries valid; pnpm qa:credits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/eilat.mdx + content/he/regions/eilat.mdx</name>
  <files>
    content/en/regions/eilat.mdx,
    content/he/regions/eilat.mdx,
    tests/content/eilat-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: H1 once with "Eilat"; 8-12 H2 per §4.4; word 1500-2500 (mid-band 1800-2100); ≥5 distinct AffiliateCard partners (heavy transport mix); faqs 5-10
    HE: ratio 0.85-1.40 (target 0.90-1.05); H1 "מה לעשות באילת"; HE labels on affiliate cards; ktiv maleh; AUD-024 Latin wrapping
  </behavior>
  <action>
**Invoke `copywriting` + `hebrew-content-writer` skills.**

**EN canonical** (`content/en/regions/eilat.mdx`):

- title="Things to Do in Eilat: Red Sea Travel Guide 2026" (50-60), primaryKeyword="things to do in Eilat", secondaryKeywords=["Eilat Red Sea","Coral Beach Eilat","Timna Park","Eilat diving","Petra from Eilat","Eilat hotels"]
- Body 1800-2100w per `<pitfalls_h_tag_template_eilat>` verbatim
- **Affiliate placements (≥5 partners — Eilat is transport-heavy):**
  - `<WhereToStay partner="booking" city="Eilat" />`
  - `<TransportInfo partner="skyscanner" />` (TLV + ETM separate routing)
  - `<AffiliateCard partner="rentalcars" destination="Eilat" label="Rent car in Eilat" />`
  - `<AffiliateCard partner="viator" destination="Eilat" label="Petra from Eilat day tour" />` (Petra border crossing)
  - `<AffiliateCard partner="civitatis" destination="Eilat" label="Coral reef snorkel + glass-boat tour" />`
  - `<AffiliateCard partner="safetyWing" label="Diving + travel insurance for Israel" />`
  - Optional 6th: `<AffiliateCard partner="discoverCars" destination="Eilat" />` for transport diversity

**HE canonical** (`content/he/regions/eilat.mdx`):

- Native rewrite; primary HE keyword `מה לעשות באילת`
- Red Sea = `ים סוף` in HE
- Coral Beach Reserve = `שמורת חוף האלמוגים`
- Timna Park = `פארק תמנע`
- 0.90-1.05 ratio
- AUD-024: `<span dir="ltr">ETM</span>`, `<span dir="ltr">TLV</span>`, brand names

Author tests/content/eilat-region.test.ts (EN+HE assertions). Update sitemap.

Validation pipeline:

```
pnpm velite && pnpm build && pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content && pnpm qa:audit
pnpm test --run tests/content/eilat-region.test.ts
```

Avoid: contested-naming framing (Eilat has no contested compound); raw partner URLs; HE ratio below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='eilat'&&p.lang==='en'); const he=r.find(p=>p.slug==='eilat'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/eilat-region.test.ts</automated>
</verify>
<done>EN + HE Eilat canonicals exist; REGION_CANONICAL ≥80 both; 5+ distinct affiliate partners (transport-heavy mix); AUD rules 0; sitemap updated; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 5 paired sub-destinations (Coral Beach, Underwater Observatory, Timna Park, Dolphin Reef, Red Canyon) — 10 MDX files</name>
  <files>
    content/en/sub-destinations/eilat-coral-beach.mdx,
    content/en/sub-destinations/eilat-underwater-observatory.mdx,
    content/en/sub-destinations/eilat-timna-park.mdx,
    content/en/sub-destinations/eilat-dolphin-reef.mdx,
    content/en/sub-destinations/eilat-red-canyon.mdx,
    content/he/sub-destinations/eilat-coral-beach.mdx,
    content/he/sub-destinations/eilat-underwater-observatory.mdx,
    content/he/sub-destinations/eilat-timna-park.mdx,
    content/he/sub-destinations/eilat-dolphin-reef.mdx,
    content/he/sub-destinations/eilat-red-canyon.mdx,
    public/images/sub-destinations/eilat/,
    data/photo-credits.json,
    tests/content/eilat-region.test.ts
  </files>
  <behavior>
    Per sub-dest (×10): slug=eilat-{short}, parentRegion=eilat; H1 entity+qualifier; 800-1200w; ≥1 AffiliateCard; SUB_DESTINATION ≥75; HE/EN ratio per pair [0.85,1.40]; TouristAttraction schema only (no religiousSiteId)
  </behavior>
  <action>
Author 5 EN + 5 HE sub-destinations per Phase 2.3 pattern.

**Per-page EN authoring:**

1. Frontmatter: lang=en, slug=eilat-{short}, region=eilat, parentRegion=eilat, heroImage, faqs 3-7. NO religiousSiteId (Eilat has zero religious sites).
2. Body 800-1200w
3. AffiliateCard per page:
   - eilat-coral-beach → civitatis "Coral Beach reef snorkel"
   - eilat-underwater-observatory → getYourGuide "Underwater Observatory ticket + tour"
   - eilat-timna-park → viator "Timna Park geology + Solomon's Pillars"
   - eilat-dolphin-reef → civitatis "Dolphin Reef interactive experience"
   - eilat-red-canyon → viator "Red Canyon hike from Eilat"
4. Image: 1 hero each; Wikimedia + Pexels supplements OK

**Per-page HE authoring:** native rewrite via hebrew-content-writer; 0.93-1.03 ratio.

Update sitemap with 5 sub-dest paths ×2 locales.

Validation:

```
pnpm velite && pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content
pnpm build && pnpm qa:audit
pnpm test --run tests/content/eilat-region.test.ts
```

Each page: SUB_DESTINATION ≥75; AUD-006/007/024/025/031 all 0.

Avoid: emitting PlaceOfWorship (Eilat sub-dests are all TouristAttraction); raw partner URLs.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['eilat-coral-beach','eilat-underwater-observatory','eilat-timna-park','eilat-dolphin-reef','eilat-red-canyon']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/eilat-region.test.ts</automated>
</verify>
<done>10 Eilat sub-destination MDX files (5 EN + 5 HE pairs) exist; all SUB_DESTINATION ≥75; AUD rules 0; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate eilat</name>
  <files>
    data/region-gates/eilat.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate eilat` — expect exit 0
3. PASS → append row to report. FAIL → 3 fix attempts; halt Eilat after 3 failures (does NOT cascade per CONTEXT.md).
4. Lighthouse: DEFERRED-CI-owns acceptable.

Report row: 12 pages (2 canonical + 10 sub-dest); 5+ affiliate partners (transport-heavy); Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate eilat</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/eilat.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/eilat.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*eilat\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate eilat exits 0; Verdict: PASS; report row populated.</done>
</task>

</tasks>

<verification>
- EN + HE Eilat canonicals + 5 EN + 5 HE sub-destinations exist
- `pnpm qa:audit` REGION_CANONICAL ≥80 on both; SUB_DESTINATION ≥75 on all 10
- AUD-007/017..020/024/025/031/032 all 0
- `pnpm qa:region-gate eilat` exits 0 PASS
- All sub-dests TouristAttraction only (no PlaceOfWorship emission)
</verification>

<success_criteria>
Eilat region replicated; tourism-enclave editorial; transport-heavy affiliate mix; soft gate PASS. Wave 2 (Dead Sea + Galilee + Eilat) all PASS → Wave 3 unblocked.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/04-eilat-SUMMARY.md` with sub-dest selection rationale, affiliate transport-mix decisions (Skyscanner ETM vs TLV split; RentalCars Eilat pickup; SafetyWing diving angle), audit scores, HE/EN ratios, soft-gate verdict, wall-clock time.
</output>
</content>
</invoke>
