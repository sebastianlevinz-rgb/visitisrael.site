---
phase: 03-region-replication-m3
plan: 02
type: execute
wave: 2
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/dead-sea.mdx
  - content/he/regions/dead-sea.mdx
  - public/images/regions/dead-sea/
  - content/en/sub-destinations/dead-sea-masada.mdx
  - content/en/sub-destinations/dead-sea-ein-gedi.mdx
  - content/en/sub-destinations/dead-sea-qumran.mdx
  - content/en/sub-destinations/dead-sea-mineral-beach.mdx
  - content/en/sub-destinations/dead-sea-ein-bokek.mdx
  - content/he/sub-destinations/dead-sea-masada.mdx
  - content/he/sub-destinations/dead-sea-ein-gedi.mdx
  - content/he/sub-destinations/dead-sea-qumran.mdx
  - content/he/sub-destinations/dead-sea-mineral-beach.mdx
  - content/he/sub-destinations/dead-sea-ein-bokek.mdx
  - public/images/sub-destinations/dead-sea/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/dead-sea-region.test.ts
  - data/region-gates/dead-sea.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/dead-sea/ and /dead-sea/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema (inLanguage matches)'
    - 'Dead Sea canonical 1500-2500 words EN; HE within 0.85-1.40 ratio (target mid-band 0.90-1.05)'
    - '5 Dead Sea sub-destinations exist in EN + HE pairs (Masada, Ein Gedi, Qumran, Mineral Beach, Ein Bokek) — 10 total MDX'
    - 'Each canonical has ≥5 distinct AffiliateCard partners; each sub-dest has ≥1'
    - 'AUD-018 (biased framing) 0 violations: NO "Judea and Samaria" or "occupied territories" framing (northern Dead Sea is West Bank Area C — neutral framing required)'
    - 'pnpm qa:region-gate dead-sea exits 0 with PASS verdict'
    - 'Masada page emits Place schema (NOT PlaceOfWorship — UNESCO archaeological site, not contemporary religious building)'
  artifacts:
    - path: 'content/en/regions/dead-sea.mdx'
      provides: 'Dead Sea EN canonical 1500-2500w; PITFALLS §4.3 H-tag scaffolding; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/dead-sea.mdx'
      provides: 'Dead Sea HE canonical native rewrite; 0.90-1.05 ratio'
      min_lines: 150
    - path: 'data/region-gates/dead-sea.md'
      provides: 'Region-gate verdict report (written by pnpm qa:region-gate dead-sea)'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/regions/dead-sea.mdx'
      to: 'components/travel/AffiliateCard'
      via: 'helper-routed affiliate placements (≥5 distinct partners)'
      pattern: '<AffiliateCard|<WhereToStay|<TransportInfo'
    - from: 'content/{en,he}/sub-destinations/dead-sea-*.mdx'
      to: 'content/{en,he}/regions/dead-sea.mdx'
      via: 'BreadcrumbList parent + frontmatter parentRegion: dead-sea'
      pattern: "parentRegion:\\s*dead-sea"
---

<objective>
Plan 03-02 — Dead Sea region canonical + 5 sub-destinations (Wave 2, parallel with Galilee + Eilat).

Replicates the Phase 2 pilot pattern adapted for Dead Sea per PITFALLS §4.3. Special considerations:

- **Masada deferred-to-sub-dest** per FEATURES taxonomy (CONTEXT.md decision); covered here as Dead Sea sub-dest, not a separate region
- **Editorial framing for northern Dead Sea (West Bank Area C):** PITFALLS §3.2 + AUD-018 — DO NOT use "Judea and Samaria" or "occupied territories"; "Dead Sea northern shore" is the neutral phrasing
- **Climate-change angle (Dead Sea shrinking ~1m/year) is editorially safe** per FEATURES §1 — factual, well-sourced
- **Schema:** Masada + Qumran emit Place (archaeological sites; NOT PlaceOfWorship — Place schema only)

Output: 2 canonicals (EN+HE) + 10 sub-destination MDX (5 EN + 5 HE) + 4-6 hero images + 5 sub-dest images + soft-gate PASS.

Sub-dests (5 — CONTEXT.md target 5-6):

- `dead-sea-masada` (UNESCO; Roman-era fortress; archaeological — Place schema)
- `dead-sea-ein-gedi` (nature reserve; David's hideout in 1 Samuel — light biblical references OK)
- `dead-sea-qumran` (Dead Sea Scrolls; Essene community — Place schema)
- `dead-sea-mineral-beach` (public mineral beach access)
- `dead-sea-ein-bokek` (hotel-resort strip; primary affiliate target for lodging)
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
@.planning/phases/02-pilot-region-jerusalem-m2/02-01-SUMMARY.md
@.planning/phases/02-pilot-region-jerusalem-m2/02-03-SUMMARY.md
@.planning/phases/03-region-replication-m3/01-tel-aviv-PLAN.md
@.planning/phases/03-region-replication-m3/01-tel-aviv-SUMMARY.md
@.agents/skills/copywriting/SKILL.md
@.agents/skills/hebrew-content-writer/SKILL.md
@.agents/skills/affiliate-marketing/SKILL.md
@app/[locale]/[region]/page.tsx
@app/[locale]/[region]/[subdest]/page.tsx
@lib/seo/naming.ts
@data/religious-sites.json
@scripts/qa/region-gate.mjs

<interfaces>
<!-- All interfaces locked by Phase 2 + Plan 01 (region-gate script). Inherit verbatim. -->

Region renderer: app/[locale]/[region]/page.tsx (EXISTS)
Sub-destination renderer: app/[locale]/[region]/[subdest]/page.tsx (EXISTS; auto-emits PlaceOfWorship when religiousSiteId frontmatter matches data/religious-sites.json — for Dead Sea sub-dests we do NOT use religiousSiteId since Masada + Qumran are archaeological, not religious buildings; renderer emits TouristAttraction + Place via lib/schema/place.ts conditionally — verify Phase 2 pattern)

AUD-018 biased framing regex (from lib/seo/naming.ts) — fires on any of:

- "Judea and Samaria"
- "occupied territories" (use "West Bank" neutrally)
- biased Israel-Palestinian framing
  </interfaces>

<pitfalls_h_tag_template_dead_sea>

<!-- From PITFALLS §4.3 — Dead Sea H-tag scaffold. -->

H1: Things to Do at the Dead Sea: A 2026 Travel Guide

H2: When to Visit the Dead Sea
H3: Spring + Autumn (best); Summer extremely hot (40+°C); Winter mild
H3: Salt-pillar formations + mineral chemistry (factual; unique earth-science draw)
H3: Floating + therapeutic mud — health-claim accuracy (cite Israel Ministry of Health if used)

H2: Where to Stay at the Dead Sea
H3: Ein Bokek resort strip (hotels) vs Neve Zohar boutique
Component: <WhereToStay partner="booking" city="Ein Bokek" />

H2: Top Things to Do at the Dead Sea
H3: Float in the sea (lowest point on Earth, -430m)
H3: Apply mineral mud
H3: Visit Masada (UNESCO Roman fortress) — link to sub-dest
H3: Hike Ein Gedi nature reserve
H3: Tour Qumran caves (Dead Sea Scrolls)

H2: The Shrinking Dead Sea — Environmental Context
(factual; 1m/year recession; Jordan River diversion + Israeli/Jordanian potash mining; tourism implications)

H2: Top Day Trips from the Dead Sea
H3: Jerusalem (1hr west)
H3: Eilat (3hr south — Negev corridor)
H3: Bethlehem (under Palestinian Authority administration — practical info only; no political commentary)
Component: <AffiliateCard partner="viator" destination="Dead Sea" label="Dead Sea + Masada day tour" />

H2: How to Get to the Dead Sea
Component: <TransportInfo partner="skyscanner" /> (TLV arrival)
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Dead Sea drive" />
Egged Bus 444 from Jerusalem; tour from TLV; ~1.5hr drive

H2: Where to Eat at the Dead Sea
(Hotel buffets dominate; Ein Bokek strip; light editorial)

H2: Practical Tips for Visiting the Dead Sea
H3: Bring water bottle (high evaporation)
H3: Do NOT shave 24h before; do NOT swallow water
H3: Sun protection mandatory
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />

H2: FAQ (5-10)
</pitfalls_h_tag_template_dead_sea>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4-5 Dead Sea images + update photo-credits ledger</name>
  <files>
    public/images/regions/dead-sea/hero.jpg,
    public/images/regions/dead-sea/masada.jpg,
    public/images/regions/dead-sea/ein-gedi.jpg,
    public/images/regions/dead-sea/qumran.jpg,
    public/images/regions/dead-sea/ein-bokek.jpg,
    data/photo-credits.json
  </files>
  <action>
Source 4-5 Dead Sea hero/inline images via Wikimedia Commons (CONTEXT.md estimates 65-75% Wikimedia coverage — MEDIUM gap).

Wikimedia survey candidates:

- hero.jpg: Dead Sea wide landscape (salt formations + horizon) — Wikimedia abundant
- masada.jpg: Masada plateau aerial OR view from top — Wikimedia abundant (UNESCO well-covered)
- ein-gedi.jpg: Waterfall + canyon — Wikimedia abundant
- qumran.jpg: Cave entrance OR scrolls museum exterior — Wikimedia MEDIUM
- ein-bokek.jpg: Resort strip / hotel facade — Wikimedia THIN; abstract "Dead Sea floating" Unsplash OK

Per Phase 2.1 pattern: Sharp-generated placeholder JPEGs at documented dimensions with REAL Wikimedia URLs in ledger; Phase 6 swaps actual binaries. Hero ≥1600w; inline ≥1200w.

Add 4-5 entries to `data/photo-credits.json` with `region: 'dead-sea'`, `slug: 'dead-sea'`. NO restrictedSiteAcknowledgment required (Dead Sea has no restricted subjects).

Run `pnpm qa:credits` — MUST exit 0.
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>node -e "const c=require('./data/photo-credits.json'); const tlv=c.filter(p=>p.region==='dead-sea'); if(tlv.length<4)process.exit(1); for(const e of tlv) if(e.width<1200)process.exit(1)"</automated>
</verify>
<done>4-5 Dead Sea image ledger entries valid (width >=1200, real Wikimedia URLs); pnpm qa:credits exits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/dead-sea.mdx + content/he/regions/dead-sea.mdx — both canonicals</name>
  <files>
    content/en/regions/dead-sea.mdx,
    content/he/regions/dead-sea.mdx,
    tests/content/dead-sea-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: frontmatter (lang/slug/region/title 50-60/desc 120-160); H1 once with "Dead Sea"; 8-12 H2 per §4.3 scaffold; word count 1500-2500 (mid-band 1800-2100); ≥5 distinct AffiliateCard partners; faqs 5-10
    EN: NO "Judea and Samaria"; NO "occupied territories"; NO "Wailing Wall" (global rule)
    HE: lang=he; ratio 0.85-1.40 (target 0.90-1.05); H1 starts with "מה לעשות בים המלח" or native equivalent; same 5+ partner mix; ktiv maleh consistent; Latin brand names wrapped <span dir="ltr">
  </behavior>
  <action>
**Invoke `copywriting` skill (EN) + `hebrew-content-writer` skill (HE business-casual, gender Option C, ktiv maleh).**

**EN canonical** at `content/en/regions/dead-sea.mdx`:

- Frontmatter: title="Things to Do at the Dead Sea: 2026 Complete Guide" (50-60 chars), description 120-160, slug=dead-sea, region=dead-sea, heroImage=/images/regions/dead-sea/hero.jpg, primaryKeyword="things to do at the Dead Sea", secondaryKeywords=["Dead Sea itinerary","Masada","Ein Gedi","Dead Sea hotels","Ein Bokek","Dead Sea floating"], faqs 5-10
- Body: follow `<pitfalls_h_tag_template_dead_sea>` verbatim. 1800-2100w mid-band.
- **CRITICAL editorial framing:** northern Dead Sea is West Bank Area C — use phrasing "northern Dead Sea shore" or "Israeli-administered northern shore"; NEVER "Judea and Samaria"; Qumran context is Essene/historical-archaeological, not contemporary political.
- **Climate change section** is factual: "The Dead Sea is shrinking ~1m/year due to Jordan River diversion + potash mining"; cite Israeli + Jordanian sources.
- **AffiliateCard placements (≥5 partners):**
  - `<WhereToStay partner="booking" city="Ein Bokek" />` (Ein Bokek is the hotel strip)
  - `<AffiliateCard partner="viator" destination="Dead Sea" label="Dead Sea + Masada day tour" />` (tours)
  - `<AffiliateCard partner="getYourGuide" destination="Dead Sea" label="Dead Sea + Ein Gedi half-day" />` (alternative tour)
  - `<TransportInfo partner="skyscanner" />` (flights TLV)
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Dead Sea drive" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical** at `content/he/regions/dead-sea.mdx`:

- Native rewrite via hebrew-content-writer skill (NOT translation)
- Primary HE keyword: `מה לעשות בים המלח`
- H2 sections in Hebrew: מתי לבקר בים המלח / היכן ללון / הדברים הטובים ביותר / ים המלח המתכווץ / טיולי יום / איך להגיע / היכן לאכול / טיפים מעשיים / שאלות נפוצות
- Word count: 0.90-1.05 ratio of EN
- Same 5+ AffiliateCard partner mix; HE labels
- AUD-024: Latin brand names + airport codes wrapped <span dir="ltr">
- Ktiv maleh consistent (תוכנה not תכנה)

Author `tests/content/dead-sea-region.test.ts` with the behavior assertions above (EN + HE describes). Update `app/sitemap.ts` to add `/en/dead-sea` + `/dead-sea`.

**Validation pipeline:**

```
pnpm velite && pnpm build
pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
pnpm qa:hebrew-content
pnpm qa:audit  # check REGION_CANONICAL ≥80 on both EN+HE
pnpm test --run tests/content/dead-sea-region.test.ts
```

Avoid: "Judea and Samaria" (AUD-018 fires); "Wailing Wall" (AUD-017 global); raw partner URLs (AFF-04); HE word-count below 0.85 floor (AUD-007); inline AffiliateDisclosure (renderer handles it).
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='dead-sea'&&p.lang==='en'); const he=r.find(p=>p.slug==='dead-sea'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1); console.log('EN',en.score,'HE',he.score)"</automated>
<automated>pnpm test --run tests/content/dead-sea-region.test.ts</automated>
</verify>
<done>EN + HE Dead Sea canonicals exist; both REGION_CANONICAL ≥80; AUD-007/017-020/024/025 all 0; 5+ distinct affiliate partners; sitemap updated; Vitest canonical tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 5 paired sub-destinations (Masada, Ein Gedi, Qumran, Mineral Beach, Ein Bokek) — 10 MDX files EN+HE</name>
  <files>
    content/en/sub-destinations/dead-sea-masada.mdx,
    content/en/sub-destinations/dead-sea-ein-gedi.mdx,
    content/en/sub-destinations/dead-sea-qumran.mdx,
    content/en/sub-destinations/dead-sea-mineral-beach.mdx,
    content/en/sub-destinations/dead-sea-ein-bokek.mdx,
    content/he/sub-destinations/dead-sea-masada.mdx,
    content/he/sub-destinations/dead-sea-ein-gedi.mdx,
    content/he/sub-destinations/dead-sea-qumran.mdx,
    content/he/sub-destinations/dead-sea-mineral-beach.mdx,
    content/he/sub-destinations/dead-sea-ein-bokek.mdx,
    public/images/sub-destinations/dead-sea/,
    data/photo-credits.json,
    tests/content/dead-sea-region.test.ts
  </files>
  <behavior>
    Per sub-dest (×10): frontmatter slug=dead-sea-{short}, parentRegion=dead-sea; H1 entity+qualifier (AUD-006); word count 800-1200; ≥1 AffiliateCard; SUB_DESTINATION audit ≥75; AUD-007 ratio per pair in [0.85,1.40]; BreadcrumbList Home→Dead Sea→{Entity}
    Masada page: emits TouristAttraction + Place schema (UNESCO archaeological — Place not PlaceOfWorship); discusses Roman siege + Jewish historical significance respectfully
    Qumran page: TouristAttraction + Place; Essene community + Dead Sea Scrolls factual framing
    HE pages: ktiv maleh; AUD-024 Latin wrapping; pnpm qa:hebrew-content green
  </behavior>
  <action>
Author 5 EN + 5 HE sub-destination MDX files following Phase 2.3 plan structure.

**Per-page EN authoring (×5):**

1. Frontmatter: lang=en, slug=dead-sea-{short}, region=dead-sea, parentRegion=dead-sea, heroImage=/images/sub-destinations/dead-sea/{short}.jpg, faqs 3-7
2. Body 800-1200w per `<sub_destination_h_tag_template>` (H2: What is X / Visiting Today / Top Things / Nearby Attractions / Tours / Practical Tips / FAQ)
3. ≥1 AffiliateCard per page:
   - dead-sea-masada → viator "Masada sunrise + Dead Sea tour"
   - dead-sea-ein-gedi → civitatis "Ein Gedi nature reserve + Dead Sea"
   - dead-sea-qumran → getYourGuide "Qumran caves + Dead Sea Scrolls tour"
   - dead-sea-mineral-beach → civitatis "Dead Sea beach day pass"
   - dead-sea-ein-bokek → booking via `<WhereToStay partner="booking" city="Ein Bokek" />` (hotel strip — lodging affiliate)
4. **NO `religiousSiteId` frontmatter** — Masada + Qumran are archaeological Place schema, NOT PlaceOfWorship (they're not religious-sites.json entries; respect lib/schema/place.ts for archaeological-historical context)
5. Image: 1 hero per sub-dest at public/images/sub-destinations/dead-sea/{short}.jpg, width >=1200
6. Add 5 ledger entries to data/photo-credits.json

**Per-page HE authoring (×5):** native rewrite via hebrew-content-writer; 0.93-1.03 ratio per pair; HE labels on affiliate cards.

**Special editorial notes:**

- **Masada (HE/EN):** Roman-era fortification; siege of 73 CE; Jewish-historical significance; "Masada shall not fall again" military pledge — factual, not political
- **Qumran (HE/EN):** Essene community + Dead Sea Scrolls; archaeological framing only; NO "Judea and Samaria" (Qumran is in West Bank Area C — use "Qumran archaeological site" or "northern Dead Sea region")
- **Ein Gedi (HE/EN):** light biblical references OK (David hideout 1 Samuel) but emphasize nature-reserve + waterfall hiking + protected ibex
- All sub-dest pages: respect Israel + Jordan + Palestinian shared geography of the Dead Sea basin

**Validation:**

```
pnpm velite && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
pnpm qa:hebrew-content
pnpm build && pnpm qa:audit
pnpm test --run tests/content/dead-sea-region.test.ts
```

Each page MUST: SUB_DESTINATION ≥75; AUD-007 per pair in band; AUD-006/017-020/024/025/031 all 0; AUD-018 specifically must be 0 (biased framing).

Update app/sitemap.ts to add 5 sub-dest paths ×2 locales.

Avoid: emitting PlaceOfWorship/ReligiousBuilding for Masada/Qumran (they're Place schema only); "Judea and Samaria" in Qumran context (AUD-018 fires); HE word-count below 0.85 (AUD-007 fires).
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['dead-sea-masada','dead-sea-ein-gedi','dead-sea-qumran','dead-sea-mineral-beach','dead-sea-ein-bokek']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/dead-sea-region.test.ts</automated>
</verify>
<done>10 Dead Sea sub-destination MDX files (5 EN + 5 HE pairs) exist; all SUB_DESTINATION ≥75; AUD-007 per pair in band; AUD-018 0 violations across all pages; sitemap updated; Vitest sub-dest tests green; 5 ledgered images.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate dead-sea</name>
  <files>
    data/region-gates/dead-sea.md,
    data/region-replication-report.md
  </files>
  <action>
1. Ensure fresh audit data: `pnpm velite && pnpm build && pnpm qa:audit`
2. Run gate: `pnpm qa:region-gate dead-sea`
3. **PASS** (exit 0) → `data/region-gates/dead-sea.md` Verdict: PASS; append Dead Sea row to `data/region-replication-report.md`. Commit.
4. **FAIL** (exit 1) → 3 fix attempts within this plan; halt Dead Sea after 3 failures. Other Wave 2 plans (Galilee, Eilat) continue independently per CONTEXT.md.
5. On PASS, append report row with concrete numbers.

Lighthouse: `data/lighthouse-results.json` likely empty/CI-owned per Phase 2.6 lesson — gate accepts DEFERRED-CI status.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate dead-sea</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/dead-sea.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/dead-sea.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*dead-sea\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate dead-sea exits 0; data/region-gates/dead-sea.md Verdict: PASS; data/region-replication-report.md dead-sea row populated.</done>
</task>

</tasks>

<verification>
- `content/en/regions/dead-sea.mdx` (1800-2100w) + `content/he/regions/dead-sea.mdx` (0.90-1.05 ratio) exist
- 5 EN + 5 HE sub-destination MDX files exist (10 total) paired by slug
- `pnpm qa:audit` reports REGION_CANONICAL ≥80 on /en/dead-sea + /dead-sea; SUB_DESTINATION ≥75 on all 10 sub-dest pages
- AUD-007/017..020 (esp. 018 — biased framing)/024/025/031/032 all 0 violations
- `pnpm qa:region-gate dead-sea` exits 0 with Verdict: PASS
- `data/region-gates/dead-sea.md` written; report row appended
- Masada + Qumran emit Place schema (NOT PlaceOfWorship)
- `pnpm build` succeeds prerendering all 12 Dead Sea pages
</verification>

<success_criteria>
Dead Sea region replicated at production depth: 2 canonicals + 10 sub-dests; Masada/Qumran archaeological framing; northern-shore West Bank context neutrally framed (AUD-018 0 violations); soft gate PASS. Wave 2 (Dead Sea/Galilee/Eilat) progresses in parallel.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/02-dead-sea-SUMMARY.md` summarizing:
- Sub-dest selection rationale
- Affiliate partner mix per page
- Audit score breakdown
- HE/EN ratios per pair
- AUD-018 framing check (Qumran + northern-shore phrasing)
- Soft-gate verdict + per-criterion details
- Wall-clock time vs Tel Aviv plan-01 baseline
</output>
</content>
</invoke>
