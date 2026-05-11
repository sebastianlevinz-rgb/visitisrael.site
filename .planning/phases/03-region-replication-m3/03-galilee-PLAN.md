---
phase: 03-region-replication-m3
plan: 03
type: execute
wave: 2
depends_on:
  - 01-tel-aviv
files_modified:
  - content/en/regions/galilee.mdx
  - content/he/regions/galilee.mdx
  - public/images/regions/galilee/
  - content/en/sub-destinations/galilee-tiberias.mdx
  - content/en/sub-destinations/galilee-capernaum.mdx
  - content/en/sub-destinations/galilee-mount-of-beatitudes.mdx
  - content/en/sub-destinations/galilee-magdala.mdx
  - content/en/sub-destinations/galilee-yardenit.mdx
  - content/en/sub-destinations/galilee-mount-arbel.mdx
  - content/he/sub-destinations/galilee-tiberias.mdx
  - content/he/sub-destinations/galilee-capernaum.mdx
  - content/he/sub-destinations/galilee-mount-of-beatitudes.mdx
  - content/he/sub-destinations/galilee-magdala.mdx
  - content/he/sub-destinations/galilee-yardenit.mdx
  - content/he/sub-destinations/galilee-mount-arbel.mdx
  - public/images/sub-destinations/galilee/
  - data/photo-credits.json
  - app/sitemap.ts
  - tests/content/galilee-region.test.ts
  - data/region-gates/galilee.md
  - data/region-replication-report.md
autonomous: true
requirements:
  - REG-01
  - REG-02
  - REG-03
must_haves:
  truths:
    - 'Visiting /en/galilee/ and /galilee/ both return 200 with TouristDestination + BreadcrumbList + FAQPage schema'
    - 'Galilee canonical 1500-2500w EN; HE 0.85-1.40 ratio (target 0.90-1.05)'
    - '6 Galilee sub-destinations exist EN+HE (Tiberias, Capernaum, Mount of Beatitudes, Magdala, Yardenit, Mount Arbel) — 12 MDX total'
    - 'Capernaum + Mount of Beatitudes + Yardenit (Tabgha optional) emit PlaceOfWorship schema (Christian-pilgrimage religious sites)'
    - 'Magdala emits Place schema only (archaeological — not active worship site)'
    - 'Mount Arbel + Tiberias emit TouristAttraction only'
    - 'pnpm qa:region-gate galilee exits 0 with PASS verdict'
    - 'AUD-017..020 0 violations (paired naming NOT required for Galilee per CONTEXT — no contested compound)'
  artifacts:
    - path: 'content/en/regions/galilee.mdx'
      provides: 'Galilee EN canonical; Christian-pilgrimage editorial tone; 5+ affiliate partners'
      min_lines: 150
    - path: 'content/he/regions/galilee.mdx'
      provides: 'Galilee HE canonical native rewrite (Kinneret in HE; Sea of Galilee in EN)'
      min_lines: 150
    - path: 'data/region-gates/galilee.md'
      provides: 'Region-gate verdict report'
      contains: 'Verdict:'
  key_links:
    - from: 'content/{en,he}/sub-destinations/galilee-capernaum.mdx + galilee-mount-of-beatitudes.mdx + galilee-yardenit.mdx'
      to: 'lib/schema/religiousBuilding.ts (PlaceOfWorship emission via religiousSiteId frontmatter)'
      via: 'religiousSiteId frontmatter → renderer conditional schema'
      pattern: 'religiousSiteId:\\s*(capernaum|mount-of-beatitudes|yardenit)'
    - from: 'content/{en,he}/regions/galilee.mdx'
      to: 'content/{en,he}/sub-destinations/galilee-*.mdx'
      via: 'AttractionGrid pulls sub-dests by parentRegion'
      pattern: "parentRegion:\\s*galilee"
---

<objective>
Plan 03-03 — Galilee (Sea of Galilee) region canonical + 6 sub-destinations (Wave 2, parallel with Dead Sea + Eilat).

Replicates pilot pattern adapted for Galilee per PITFALLS §4.5. Key considerations:

- **Christian-pilgrimage editorial tone** — Capernaum, Mount of Beatitudes, Tabgha, Yardenit are major NT sites; respectful + factual + ecumenical (acknowledge Christian + Jewish + Druze contexts where present)
- **Sea of Galilee / Lake Tiberias / Kinneret** — use "Sea of Galilee" in EN, "כינרת" in HE; no paired-naming required (no contested compound per CONTEXT.md)
- **Schema diversity:** validates BOTH TouristAttraction AND PlaceOfWorship emission paths
  - Capernaum → PlaceOfWorship (synagogue + Peter's house; active pilgrimage)
  - Mount of Beatitudes → PlaceOfWorship (Catholic church; Sermon on the Mount tradition)
  - Yardenit → PlaceOfWorship (baptismal site; Greek Orthodox jurisdiction)
  - Magdala → Place (archaeological; recent excavation)
  - Mount Arbel → TouristAttraction (nature/hiking)
  - Tiberias → TouristAttraction (urban)

Output: 2 canonicals + 12 sub-destination MDX (6 EN + 6 HE) + 4-5 hero images + 6 sub-dest images + soft-gate PASS.
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
@data/religious-sites.json
@scripts/qa/region-gate.mjs

<interfaces>
<!-- religious-sites.json entries used by Galilee sub-dests for PlaceOfWorship schema emission. -->

Sub-destinations with religiousSiteId frontmatter (renderer auto-emits PlaceOfWorship):

- galilee-capernaum → data/religious-sites.json key "capernaum" (Christianity; synagogue + Peter's house)
- galilee-mount-of-beatitudes → key "mount-of-beatitudes" (Christianity; Catholic Franciscan)
- galilee-yardenit → key "yardenit" (Christianity; baptismal site Greek Orthodox jurisdiction)

If religious-sites.json lacks these entries, executor MUST add them in Task 1 with:

- nameEn / nameHe / nameAr / coordinates / category: "religious-site" / religion: "Christianity" / restrictedAccess: false / pairedNamingRequired: false

Sub-destinations WITHOUT religiousSiteId (TouristAttraction only OR Place via separate schema):

- galilee-tiberias (urban TouristAttraction)
- galilee-magdala (archaeological Place — recent Mary Magdalene excavation)
- galilee-mount-arbel (nature/hiking TouristAttraction)
  </interfaces>

<pitfalls_h_tag_template_galilee>

<!-- From PITFALLS §4.5 — Galilee H-tag scaffold. -->

H1: Things to Do in the Galilee: Sea of Galilee Travel Guide 2026

H2: When to Visit the Galilee
H3: Spring (best — wildflowers); Summer (hot but Sea of Galilee swimming); Autumn shoulder; Winter mild + occasional snow on Mount Hermon

H2: Where to Stay in the Galilee
H3: Tiberias (lakeside hotels) vs Tabgha/Capernaum boutique vs kibbutz guesthouses
Component: <WhereToStay partner="booking" city="Tiberias" />

H2: Christian Pilgrimage Sites Around the Sea of Galilee
H3: Capernaum (synagogue + Peter's house)
H3: Mount of Beatitudes (Sermon on the Mount)
H3: Tabgha (Loaves & Fishes mosaic — optional sub-dest)
H3: Yardenit (Jordan River baptismal site)
H3: Magdala (Mary Magdalene's hometown; recent archaeological excavation)

H2: Nature + Hiking in the Galilee
H3: Mount Arbel (cliff hike + panorama)
H3: Banias waterfall (technically Golan but day-trip from Galilee)
H3: Jesus Trail (4-day hike Nazareth to Capernaum)

H2: Top Things to Do in Tiberias
H3: Lakeside promenade
H3: Hot springs (Hamat Tiberias)
H3: Maimonides tomb (Rambam)

H2: Top Day Trips from the Galilee
H3: Nazareth (link to Nazareth canonical)
H3: Golan Heights (link to Golan canonical)
H3: Akko (Mediterranean coast; 1.5hr drive)
Component: <AffiliateCard partner="viator" destination="Galilee" label="Sea of Galilee Christian sites tour" />

H2: How to Get to the Galilee
Component: <TransportInfo partner="skyscanner" /> (TLV arrival)
Component: <AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Galilee road trip" />
Tiberias is 2hr drive from TLV; bus possible but car essential for sub-dests

H2: Where to Eat in the Galilee
H3: St. Peter's fish (lakeside)
H3: Druze hospitality (Daliyat al-Karmel side trip)
H3: Kibbutz dairies (Tnuva origins)

H2: FAQ (5-10)
Component: <AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />
</pitfalls_h_tag_template_galilee>
</context>

<tasks>

<task type="auto">
  <name>Task 1 (Wave 0): Source 4-5 Galilee images + add religious-sites.json entries for Capernaum/Beatitudes/Yardenit if missing + update ledger</name>
  <files>
    public/images/regions/galilee/hero.jpg,
    public/images/regions/galilee/sea-of-galilee.jpg,
    public/images/regions/galilee/capernaum.jpg,
    public/images/regions/galilee/mount-of-beatitudes.jpg,
    public/images/regions/galilee/tiberias.jpg,
    data/photo-credits.json,
    data/religious-sites.json
  </files>
  <action>
1. **Verify `data/religious-sites.json` has entries for** capernaum + mount-of-beatitudes + yardenit. If absent, add them with:
   ```json
   {"id":"capernaum","nameEn":"Capernaum","nameHe":"כפר נחום","nameAr":"كفر ناحوم","wikidataId":"Q83478","category":"religious-site","religion":"Christianity","coordinates":{"latitude":32.881,"longitude":35.575},"restrictedAccess":false,"pairedNamingRequired":false}
   {"id":"mount-of-beatitudes","nameEn":"Mount of Beatitudes","nameHe":"הר האושר","nameAr":"جبل التطويبات","wikidataId":"Q1232815","category":"religious-site","religion":"Christianity","coordinates":{"latitude":32.881,"longitude":35.55},"restrictedAccess":false,"pairedNamingRequired":false}
   {"id":"yardenit","nameEn":"Yardenit","nameHe":"ירדנית","wikidataId":"Q2625555","category":"religious-site","religion":"Christianity","coordinates":{"latitude":32.7167,"longitude":35.5667},"restrictedAccess":false,"pairedNamingRequired":false}
   ```
   These trigger PlaceOfWorship schema emission in the sub-dest renderer when matching `religiousSiteId` frontmatter is set.

2. **Source 4-5 Galilee images** (Wikimedia 50-60% MEDIUM-HIGH gap per CONTEXT.md; Christian sites well-covered via pilgrimage tradition):
   - hero.jpg: Sea of Galilee wide shot — Wikimedia abundant
   - sea-of-galilee.jpg: Lake from Mount Arbel POV — Wikimedia
   - capernaum.jpg: Synagogue ruins exterior — Wikimedia
   - mount-of-beatitudes.jpg: Catholic church on hill — Wikimedia
   - tiberias.jpg: Promenade or lakeside hotel strip — Wikimedia THIN; Unsplash OK

   Per Phase 2.1 pattern: Sharp placeholders with REAL Wikimedia URLs in ledger. Hero >=1600w; inline >=1200w. NO restrictedSiteAcknowledgment required (no restricted-set subjects in Galilee).

3. **Update data/photo-credits.json** with 4-5 entries (region: 'galilee', slug: 'galilee').

Run `pnpm qa:credits` — MUST exit 0.
</action>
<verify>
<automated>pnpm qa:credits</automated>
<automated>node -e "const r=require('./data/religious-sites.json'); const ids=r.map(x=>x.id); for (const id of ['capernaum','mount-of-beatitudes','yardenit']) if(!ids.includes(id)){console.error('missing '+id);process.exit(1)}"</automated>
</verify>
<done>data/religious-sites.json has capernaum + mount-of-beatitudes + yardenit entries; 4-5 Galilee image ledger entries valid; pnpm qa:credits 0.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Author content/en/regions/galilee.mdx + content/he/regions/galilee.mdx — both canonicals</name>
  <files>
    content/en/regions/galilee.mdx,
    content/he/regions/galilee.mdx,
    tests/content/galilee-region.test.ts,
    app/sitemap.ts
  </files>
  <behavior>
    EN: lang/slug/region/title 50-60/desc 120-160; H1 once with "Galilee" + qualifier; 8-12 H2 per §4.5; word count 1500-2500 (mid-band 1800-2100); ≥5 distinct AffiliateCard partners; faqs 5-10
    EN: "Sea of Galilee" preferred (NOT "Lake Tiberias" in EN); respectful Christian-pilgrimage framing; ecumenical tone (acknowledge Catholic + Greek Orthodox + Protestant traditions)
    HE: lang=he; ratio 0.85-1.40 (target 0.90-1.05); H1 native HE (e.g., "מה לעשות בגליל"); Sea of Galilee = "ים כינרת" in HE; ktiv maleh; AUD-024 Latin wrapping
  </behavior>
  <action>
**Invoke `copywriting` skill + `hebrew-content-writer` skill.**

**EN canonical:**

- Frontmatter: title="Things to Do in the Galilee: Sea of Galilee Guide 2026" (50-60 chars), primaryKeyword="things to do in Galilee", secondaryKeywords=["Sea of Galilee","Capernaum","Mount of Beatitudes","Tiberias","Galilee Christian sites","Mount Arbel hike"], heroImage=/images/regions/galilee/hero.jpg, faqs 5-10
- Body 1800-2100w following `<pitfalls_h_tag_template_galilee>` verbatim
- **Editorial register:** Christian-pilgrimage respectful + factual; ecumenical (acknowledge Catholic Franciscan custody at Beatitudes/Tabgha + Greek Orthodox at Capernaum/Yardenit + recent Magdala excavation)
- **"Sea of Galilee" naming:** Use "Sea of Galilee" consistently in EN; mention "also known as Lake Tiberias or Kinneret" once on first reference for context
- **AffiliateCard placements (≥5 partners):**
  - `<WhereToStay partner="booking" city="Tiberias" />` (Tiberias = lakeside hotel cluster)
  - `<AffiliateCard partner="viator" destination="Galilee" label="Sea of Galilee Christian sites tour" />` (pilgrimage tours)
  - `<AffiliateCard partner="getYourGuide" destination="Galilee" label="Capernaum + Mount of Beatitudes half-day" />` (alternative tour)
  - `<TransportInfo partner="skyscanner" />` (TLV arrival)
  - `<AffiliateCard partner="rentalcars" destination="Tel Aviv" label="Rent car for Galilee road trip" />`
  - `<AffiliateCard partner="safetyWing" label="Travel insurance for Israel" />`

**HE canonical:**

- Native rewrite via hebrew-content-writer skill
- Primary HE keyword: `מה לעשות בגליל`
- Sea of Galilee = `ים כינרת` (or `הכינרת`) in HE consistently
- HE Christian-pilgrimage terms: כנסיית האושר (Mount of Beatitudes church), כפר נחום (Capernaum)
- 0.90-1.05 ratio mid-band
- Same 5+ partner mix; HE labels
- AUD-024 Latin handling

Author `tests/content/galilee-region.test.ts` (EN + HE behavior assertions). Update `app/sitemap.ts` to add `/en/galilee` + `/galilee`.

**Validation:**

```
pnpm velite && pnpm build
pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
pnpm qa:hebrew-content
pnpm qa:audit  # REGION_CANONICAL ≥80 on both
pnpm test --run tests/content/galilee-region.test.ts
```

Avoid: "Lake Tiberias" as primary EN reference (use "Sea of Galilee"); raw partner URLs; "Wailing Wall" / "Judea and Samaria" (global rules); single-tradition Christian framing (be ecumenical); HE word-count below 0.85.
</action>
<verify>
<automated>pnpm velite && pnpm build</automated>
<automated>pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content</automated>
<automated>pnpm qa:audit && node -e "const r=require('./data/audit-results.json'); const en=r.find(p=>p.slug==='galilee'&&p.lang==='en'); const he=r.find(p=>p.slug==='galilee'&&p.lang==='he'); if(!en||en.score<80||!he||he.score<80)process.exit(1)"</automated>
<automated>pnpm test --run tests/content/galilee-region.test.ts</automated>
</verify>
<done>EN + HE Galilee canonicals exist; REGION_CANONICAL ≥80 both; AUD-007/017-020/024/025 all 0; 5+ distinct affiliate partners; sitemap updated; tests green.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Author 6 paired sub-destinations (Tiberias, Capernaum, Mount of Beatitudes, Magdala, Yardenit, Mount Arbel) — 12 MDX files</name>
  <files>
    content/en/sub-destinations/galilee-tiberias.mdx,
    content/en/sub-destinations/galilee-capernaum.mdx,
    content/en/sub-destinations/galilee-mount-of-beatitudes.mdx,
    content/en/sub-destinations/galilee-magdala.mdx,
    content/en/sub-destinations/galilee-yardenit.mdx,
    content/en/sub-destinations/galilee-mount-arbel.mdx,
    content/he/sub-destinations/galilee-tiberias.mdx,
    content/he/sub-destinations/galilee-capernaum.mdx,
    content/he/sub-destinations/galilee-mount-of-beatitudes.mdx,
    content/he/sub-destinations/galilee-magdala.mdx,
    content/he/sub-destinations/galilee-yardenit.mdx,
    content/he/sub-destinations/galilee-mount-arbel.mdx,
    public/images/sub-destinations/galilee/,
    data/photo-credits.json,
    tests/content/galilee-region.test.ts
  </files>
  <behavior>
    Per sub-dest (×12): frontmatter slug=galilee-{short}, parentRegion=galilee; H1 entity+qualifier; word count 800-1200; ≥1 AffiliateCard; SUB_DESTINATION ≥75; HE/EN ratio per pair [0.85,1.40]
    Capernaum + Mount of Beatitudes + Yardenit: religiousSiteId frontmatter set → PlaceOfWorship schema emitted (validate via schema audit)
    Magdala: NO religiousSiteId (recent archaeological excavation; Place schema only via separate path or TouristAttraction)
    Tiberias + Mount Arbel: NO religiousSiteId (TouristAttraction only)
    All pages: AUD-017..020 0 violations; HE pages AUD-024/025 0 violations
  </behavior>
  <action>
Author 6 EN + 6 HE sub-destination MDX following Phase 2.3 pattern.

**Per-page EN authoring (×6):**

1. Frontmatter (3 religious-pilgrimage sub-dests use religiousSiteId; 3 do not):
   - galilee-capernaum: `religiousSiteId: capernaum` → PlaceOfWorship emission
   - galilee-mount-of-beatitudes: `religiousSiteId: mount-of-beatitudes` → PlaceOfWorship
   - galilee-yardenit: `religiousSiteId: yardenit` → PlaceOfWorship
   - galilee-magdala: NO religiousSiteId (TouristAttraction only — archaeological excavation, not active worship)
   - galilee-tiberias: NO religiousSiteId (TouristAttraction only — urban)
   - galilee-mount-arbel: NO religiousSiteId (TouristAttraction only — hiking/nature)
2. Body 800-1200w; H2 sequence per `<sub_destination_h_tag_template>` from Phase 2.3
3. AffiliateCard per page (≥1):
   - galilee-tiberias → booking via `<WhereToStay partner="booking" city="Tiberias" />`
   - galilee-capernaum → viator "Capernaum + Tabgha Christian sites half-day"
   - galilee-mount-of-beatitudes → getYourGuide "Sermon on the Mount + Beatitudes tour"
   - galilee-magdala → civitatis "Magdala + Sea of Galilee day"
   - galilee-yardenit → getYourGuide "Yardenit baptism + Sea of Galilee tour"
   - galilee-mount-arbel → viator "Mount Arbel cliff hike"
4. H1 per AUD-006: entity + qualifier
5. **Editorial tone for Christian sites:**
   - Capernaum: synagogue ruins (Jewish-historical) + Peter's house (Christian-traditional); respectful ecumenical
   - Mount of Beatitudes: Catholic Franciscan custody; Sermon on the Mount tradition (Matthew 5); octagonal church 1938 design
   - Yardenit: Jordan River baptismal pool; Greek Orthodox; symbolic for many Protestant traditions
   - Magdala: 2009 excavation; Mary Magdalene's hometown; first-century synagogue
6. Image: 1 hero per sub-dest; Wikimedia/IGPO

**Per-page HE authoring (×6):** native rewrite via hebrew-content-writer skill; 0.93-1.03 ratio; HE Christian-pilgrimage terminology accurate (כנסיית האושר, כפר נחום, הירדנית, מגדלא).

Update sitemap with 6 sub-dest paths ×2 locales.

**Validation:**

```
pnpm velite && pnpm qa:credits && pnpm qa:schema && pnpm qa:ner
pnpm qa:hebrew-content
pnpm build && pnpm qa:audit
pnpm test --run tests/content/galilee-region.test.ts
```

Each page: SUB_DESTINATION ≥75; AUD-006/007/017-020/024/025/031 all 0.

Avoid: emitting PlaceOfWorship for Magdala (it's TouristAttraction + Place; renderer auto-handles via absence of religiousSiteId); raw partner URLs; HE word-count below 0.85; single-tradition framing for Christian sites.
</action>
<verify>
<automated>pnpm velite && pnpm qa:credits && pnpm qa:schema</automated>
<automated>pnpm qa:hebrew-content</automated>
<automated>pnpm build && pnpm qa:audit</automated>
<automated>node -e "const r=require('./data/audit-results.json'); const slugs=['galilee-tiberias','galilee-capernaum','galilee-mount-of-beatitudes','galilee-magdala','galilee-yardenit','galilee-mount-arbel']; const bad=[]; for (const s of slugs) for (const lang of ['en','he']) { const p=r.find(x=>x.slug===s&&x.lang===lang); if(!p||p.score<75) bad.push(`${lang}/${s}=${p?p.score:'missing'}`); } if(bad.length){console.error(bad);process.exit(1);}"</automated>
<automated>pnpm test --run tests/content/galilee-region.test.ts</automated>
</verify>
<done>12 Galilee sub-destination MDX files (6 EN + 6 HE pairs) exist; all SUB_DESTINATION ≥75; AUD-007 per pair in band; 3 religious-pilgrimage pages emit PlaceOfWorship; 3 others emit TouristAttraction only; sitemap updated; tests green.</done>
</task>

<task type="auto">
  <name>Task 4 (per-region soft gate): Run pnpm qa:region-gate galilee</name>
  <files>
    data/region-gates/galilee.md,
    data/region-replication-report.md
  </files>
  <action>
1. `pnpm velite && pnpm build && pnpm qa:audit`
2. `pnpm qa:region-gate galilee` — expect exit 0
3. PASS → append Galilee row to data/region-replication-report.md
4. FAIL → 3 fix attempts; halt Galilee after 3 failures (does NOT cascade to Dead Sea/Eilat per CONTEXT.md)
5. Verify Lighthouse status DEFERRED-CI-owns

On PASS, report row records: 14 pages (2 canonical + 12 sub-dest); affiliate partner count; PlaceOfWorship schema validated on 3 pages; Verdict: PASS.
</action>
<verify>
<automated>pnpm qa:audit</automated>
<automated>pnpm qa:region-gate galilee</automated>
<automated>node -e "const fs=require('fs'); if(!fs.existsSync('data/region-gates/galilee.md'))process.exit(1); if(!/Verdict:\s*PASS/.test(fs.readFileSync('data/region-gates/galilee.md','utf8')))process.exit(1)"</automated>
<automated>node -e "const fs=require('fs'); if(!/\|\s*galilee\s*\|.*PASS\s\*\|/.test(fs.readFileSync('data/region-replication-report.md','utf8')))process.exit(1)"</automated>
</verify>
<done>pnpm qa:region-gate galilee exits 0; data/region-gates/galilee.md Verdict: PASS; data/region-replication-report.md galilee row populated; PlaceOfWorship schema emission validated.</done>
</task>

</tasks>

<verification>
- `content/en/regions/galilee.mdx` + `content/he/regions/galilee.mdx` exist
- 6 EN + 6 HE sub-destination MDX (12 total) exist paired
- `pnpm qa:audit` reports REGION_CANONICAL ≥80 on both canonicals; SUB_DESTINATION ≥75 on all 12 sub-dest pages
- `pnpm qa:schema` confirms PlaceOfWorship emitted on capernaum/mount-of-beatitudes/yardenit
- AUD-007/017..020/024/025/031/032 all 0 violations
- `pnpm qa:region-gate galilee` exits 0 with Verdict: PASS
- `data/religious-sites.json` has 3 new entries (capernaum, mount-of-beatitudes, yardenit) if not pre-existing
</verification>

<success_criteria>
Galilee region replicated; 2 canonicals + 12 sub-dests; PlaceOfWorship schema validated for 3 Christian-pilgrimage sub-dests; soft gate PASS. Wave 2 progresses in parallel with Dead Sea + Eilat.
</success_criteria>

<output>
After completion, create `.planning/phases/03-region-replication-m3/03-galilee-SUMMARY.md` with sub-dest selection rationale, schema emission validation per page (TouristAttraction vs PlaceOfWorship), affiliate partner mix, audit scores, AUD-018 framing check (Christian-pilgrimage editorial tone), HE/EN ratios, soft-gate verdict, wall-clock time.
</output>
</content>
</invoke>
