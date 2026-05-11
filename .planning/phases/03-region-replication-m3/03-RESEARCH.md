# Phase 3: Region Replication (M3) — Research

**Researched:** 2026-05-11
**Domain:** Tourism content replication at scale (11 regions × bilingual EN+HE)
**Confidence:** HIGH (Phase 2 pilot proven; this phase inherits its template)

## Summary

Phase 3 is **execution-at-scale**, not new research. The Jerusalem pilot (Phase 2) proved the per-region content template: dynamic route renderer + Velite collection schema + MDX H-tag scaffold + 5-6 affiliate partners + paired religious naming + Hebrew-content-writer skill + audit-dashboard soft gate. Phase 3 replicates that template across 10 regions plus a distinct West Bank/Bethlehem variant. All "what-to-build" decisions are inherited.

**This RESEARCH.md focuses exclusively on the deltas:**

1. A single per-region task template the planner duplicates across 11 plans
2. Per-region customization deltas (sub-dest lists, religious sites, image caveats)
3. Wave-execution coordination (parallel plans modify shared files like `data/photo-credits.json`)
4. Soft-gate mechanics (per-region audit-results filtering vs Phase 2's site-wide gate)
5. Validation Architecture mapping REG-01..05 to runnable commands
6. New infrastructure (per-region gate script + `/west-bank/` route family + Bethlehem Velite collection)

**Primary recommendation:** Wave 0 of plan 03-01 (Tel Aviv) creates the per-region gate script, validates the template end-to-end, then unlocks waves 2-5 for parallel execution.

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Plan structure:** One plan per region (Strategy A) — 11 plans total
  - Plan 01 Tel Aviv solo first; plans 02-10 parallelizable within their wave; Plan 11 Bethlehem solo
- **Wave assignment:**
  - Wave 1: Tel Aviv (solo — template validation)
  - Wave 2: Dead Sea ‖ Galilee ‖ Eilat
  - Wave 3: Negev ‖ Nazareth ‖ Caesarea
  - Wave 4: Haifa ‖ Golan ‖ Akko
  - Wave 5: Bethlehem (solo — distinct `/west-bank/` route family)
- **Per-region content pattern** (inherited from Phase 2 pilot):
  - EN canonical at `/en/{region-slug}/` — 1500-2500 words, 8-12 H2 sections, REGION_CANONICAL profile
  - HE canonical at `/{region-slug}/` (root locale) — ≥85% EN word count (mid-band 0.90-1.05), schema parity
  - 3-8 sub-destinations EN+HE pairs at `/{region-slug}/{subdest}/` — each 800-1200w, SUB_DESTINATION profile
  - Affiliate placements: ≥5 for canonicals, ≥1 per sub-dest (helper-routed, no direct partner URLs)
- **Image sourcing strategy** (inherited):
  - Wikimedia Commons primary, IGPO secondary
  - Synthetic Sharp-generated placeholders OK for v1 with REAL ledger metadata (Phase 6 swap)
  - Haifa Bahá'í: Wikimedia ONLY; document policy in `data/haifa-bahai-policy.md`
  - Negev: accept thinner 3-4 photos; document gap in `data/negev-images.md`
- **Per-region soft gate criteria:**
  - REGION_CANONICAL profile pages: audit ≥80 (Phase 2 was ≥85 for pilot)
  - SUB_DESTINATION profile pages: audit ≥75
  - Lighthouse mobile ≥85 (3-run-median) — DEFERRED to CI if local Chrome unavailable
  - 0 critical bugs; EN+HE parity; schema validates; credits ledger entries for all images
- **Bethlehem treatment:**
  - Route: `/en/west-bank/bethlehem/` + `/west-bank/bethlehem/` (HE) — distinct from Israel-proper
  - Frontmatter `administrativeStatus: 'palestinian-authority'` REQUIRED (AUD-019/AUD-020)
  - Single canonical, no sub-destinations in v1
  - Neutral editorial tone; no political commentary

### Claude's Discretion

- **Specific sub-destinations chosen per region** — pick from CONTEXT.md suggestions OR substitute equivalents
- **Word count within band** — 1500-2500 region canonical, 800-1200 sub-dest
- **Image quantity per page** — 4-6 for canonicals (Jerusalem used 6), 1-2 per sub-dest
- **Per-region plan structure** — 2-3 tasks (Wave 0 / EN+HE / sub-dests) OR 4-5 tasks (split EN/HE/sub-dests/audit)
- **Wave boundary timing** — planner can collapse waves if executors return faster than expected

### Deferred Ideas (OUT OF SCOPE)

- Hebron coverage (PROJECT.md exclusion — too politically charged)
- Gaza-adjacent communities (Sderot, Ashkelon — travel-advisory framing risk)
- Real photography commissioning (Phase 6 budget $1,500-$3,000 for Negev/Galilee/Bahá'í)
- Bahá'í Gardens commissioned imagery (Phase 6 — requires `press@bahai.org` confirmation)
- Per-region itineraries beyond Jerusalem (Phase 4 long-tail sweep)
- Long-tail sub-destinations beyond 3-8 per region (Phase 4 sweep)
- Hebrew slug aliases for top regions (v2)
- FR locale content (filesystem-only scaffold remains; Phase 3 adds no FR)
- Manual SERP review for non-Jerusalem regions (Phase 6 post-launch monitoring)
- Production deploy (Phase 5/6)
  </user_constraints>

<phase_requirements>

## Phase Requirements

| ID     | Description                                                                 | Research Support                                                                                                                                                                  |
| ------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REG-01 | 10 additional region canonicals (EN+HE pairs) in composite-score order      | Phase 2 pilot template proves the EN+HE canonical pattern; section 1 below specifies per-region task template; section 6 lists sub-dest pick deltas                               |
| REG-02 | Per region 3-8 sub-destinations (EN+HE pairs); total 30-80                  | Phase 2 plan 03 (7 Jerusalem pairs) proves the sub-dest renderer + Velite schema; CONTEXT.md table assigns target counts per region                                               |
| REG-03 | Per-region soft gate (audit ≥80 canonical / ≥75 sub-dest, Lighthouse ≥85)   | Section 3 specifies region-scoped filtering of `data/audit-results.json`; section 5 specifies new `pnpm qa:region-gate {slug}` script needed in Wave 0 of plan 01                 |
| REG-04 | Bethlehem at `/west-bank/bethlehem/` + administrativeStatus framing         | Section 5 specifies new Velite West Bank collection + route family + AUD-019/AUD-020 enforcement; Section 6 plan-11 details                                                       |
| REG-05 | Region-specific image gaps addressed (Haifa Bahá'í policy + Negev fallback) | CONTEXT.md locks Wikimedia-only for Bahá'í + thinner gallery for Negev; deliverable is `data/haifa-bahai-policy.md` + `data/negev-images.md` documenting Phase 6 commission notes |

</phase_requirements>

---

## 1. Per-Region Task Template

The planner duplicates this template across 11 plans. Each plan customizes only the deltas in section 6.

### Wave 0 (per-region, in-plan): Region-Specific Setup

Each region's plan opens with a Wave 0 that scaffolds its specific image set + content directories. For **plan 03-01 (Tel Aviv)** Wave 0 additionally creates the per-region gate script (one-time infrastructure):

**Common Wave 0 actions per plan:**

1. **Source heroes from Wikimedia Commons** (4-6 images, 1600w minimum, ≥1200px required by IMG-02)
   - Search Commons category `Category:{Region name}` filtered by CC-BY / CC-BY-SA / PD-self
   - Note exact `commons.wikimedia.org/wiki/File:...` URLs + author + license for ledger
2. **Generate Sharp placeholder JPEGs** at documented dimensions if real-image download deferred
   - Script: `public/images/regions/{slug}/generate-images.mjs` (copy from Jerusalem pattern, plan 02-01)
   - Real ledger metadata references actual source URLs; on-disk binary is placeholder; Phase 6 swap
3. **Append entries to `data/photo-credits.json`** with `region: '{slug}'` field set
   - **Coordination warning** (see section 2.3): if multiple plans run in parallel, each plan touches this file
4. **Add region slug to `app/sitemap.ts`** `STATIC_PATHS` list
5. **Bethlehem ONLY** (plan 03-11 Wave 0):
   - Add `westBank` collection to `velite.config.ts` OR extend `regions` schema with `administrativeStatus` discriminator
   - Create `app/[locale]/west-bank/[slug]/page.tsx` route renderer (copy-adapt from `app/[locale]/[region]/page.tsx`)

**Plan 03-01 (Tel Aviv) Wave 0 ALSO creates** `scripts/qa/region-gate.mjs`:

- CLI: `pnpm qa:region-gate {region-slug}` (or `{west-bank/bethlehem}` for plan 11)
- Reads `data/audit-results.json`, filters entries where `slug.startsWith(`${region}/`) || slug === region`
- Validates: every entry score ≥ profile threshold (80 for REGION_CANONICAL, 75 for SUB_DESTINATION)
- Validates: 0 blocking issues across filtered set
- Validates: EN+HE parity (every EN slug has matching HE slug)
- Exit 0 = PASS / Exit 1 = FAIL, writes `data/region-gates/{slug}.md` report
- Lighthouse: parse `data/lighthouse-results.json` if present and non-empty; if empty/absent treat as DEFERRED (Phase 2.6 pattern — CI owns real runs)

### Task 1: EN Canonical Authoring

**Output:** `content/en/regions/{slug}.mdx` (or `content/en/west-bank/bethlehem.mdx` for plan 11)

**Mechanics (inherited from Phase 2 plan 02-01):**

- Frontmatter: `title` (40-70 chars), `description` (120-160 chars), `lang: 'en'`, `region: '{slug}'`, `heroImage: '/images/regions/{slug}/hero.jpg'`, `primaryKeyword`, `secondaryKeywords[]`, `lat/lng` (optional), `faqs[5-10]`
- **Single H1 owned by RegionHero** — MDX body has zero H1s (preserves AUD-008)
- **8-12 H2 sections** per PITFALLS §4.1 H-tag scaffolding (copy-adapt Jerusalem structure):
  1. When to Visit
  2. Where to Stay (Booking AffiliateCard)
  3. Top Things to Do (subcategorized by region)
  4. Top Day Trips
  5. How to Get There (Skyscanner + RentalCars/DiscoverCars AffiliateCards)
  6. Where to Eat
  7. Practical Information (or Shabbat-specific section for Israel-proper regions)
  8. Frequently Asked Questions
- **Affiliate placements ≥5** across ≥5 distinct partners: booking + (civitatis OR viator OR getYourGuide) + skyscanner + rentalcars + safetyWing
- **AffiliateCard contract** (lessons from plan 02-01 deviation #3): use `<AffiliateCard partner="booking" destination="Tel Aviv" label="..." />` with camelCase partner IDs (`safetyWing`, `getYourGuide`, `discoverCars`)
- **No inline `<AffiliateDisclosure>`** in MDX — renderer injects exactly once (AFF-06 / AUD-009)
- **Religious-naming compliance** when relevant (see section 6 per-region deltas)
- **Word count:** 1500-2500 (target mid-band ~1800-2100)

**Skills invoked:** `copywriting` for EN editorial register; `affiliate-marketing` for AffiliateCard placement density; `affiliate-page-generator` for partner-mix decisions

### Task 2: HE Canonical via hebrew-content-writer

**Output:** `content/he/regions/{slug}.mdx` (or `content/he/west-bank/bethlehem.mdx` for plan 11)

**Mechanics (inherited from Phase 2 plan 02-02):**

- **Native Hebrew rewrite, NOT translation** — per `hebrew-content-writer` SKILL.md
- **Register:** Business-Casual (Marketing/Ads row) — same as Jerusalem pilot
- **Ktiv maleh consistent** — vav/yod-full spelling throughout; `qa:hebrew-content` script enforces
- **Gender:** Option C neutral via infinitive (`יש ל...`) and passive (`ניתן ל...`) for CTAs
- **Smichut compliance** — first noun without ha-; only last noun takes ha-
- **HE/EN word-count ratio:** target mid-band 0.90-1.05 (NOT lower edge 0.85 — plan 02-02 lesson: too close to AUD-007 floor; first draft hitting 0.85 should be expanded ~150-200 words)
- **Paired religious naming** within 300-char HE_PAIRING_WINDOW where applicable (see section 6)
- **Latin-in-HE direction handling** (AUD-024): brand names + airport codes wrapped `<span dir="ltr" lang="en">Booking.com</span>`
- **Schema parity:** TouristDestination + BreadcrumbList + FAQPage emit with `inLanguage='he'`

**Skills invoked:** `hebrew-content-writer` (primary); `affiliate-marketing` (HE Business-Casual disclosure phrasing)

### Task 3: 3-8 Sub-Destinations (EN+HE Pairs)

**Outputs:**

- `content/en/sub-destinations/{slug}-{subdest}.mdx` (region-prefixed Velite slug; short slug in URL — `toShortSlug()` strips prefix)
- `content/he/sub-destinations/{slug}-{subdest}.mdx`
- `public/images/sub-destinations/{slug}/{subdest}.jpg` (one per sub-dest)
- `data/photo-credits.json` entries (region-tagged)

**Mechanics (inherited from Phase 2 plan 02-03):**

- **Velite schema:** `parentRegion: '{slug}'`, `region: '{slug}'`, `heroImage`, `religiousSiteId?` (opt-in), `faqs[3-10]`, `body: s.mdx()`
- **Renderer:** existing `app/[locale]/[region]/[subdest]/page.tsx` (NO new code needed for regions; Bethlehem uses no sub-dests)
- **6-section H-tag template** per Jerusalem plan 02-03:
  1. What is {site}?
  2. Visiting {site} Today
  3. Top Things to See
  4. Tours (1+ AffiliateCard — typically Viator OR Civitatis OR GetYourGuide)
  5. Practical Tips
  6. Nearby Attractions (internal links to sibling sub-dests)
- **Word count:** 800-1200 each (mid-band ~850-900)
- **HE/EN ratio mid-band 0.93-1.03** per pair (plan 02-03 lock; expand HE first draft if below floor)
- **Religious-site dual schema emission** — when `religiousSiteId` in frontmatter matches `data/religious-sites.json` key, renderer emits PlaceOfWorship/Place in addition to TouristAttraction (Bahá'í Gardens, Basilica of the Annunciation, Roman temples, Druze shrines if covered)
- **Paired religious naming** ALSO applies on sub-dest pages where the site requires it (see section 6 region-by-region)
- **Affiliate ≥1 per page** (typically a single CardWidget per page; avoid spam-density)
- **Restricted-site `restrictedSiteAcknowledgment`** for: Bahá'í Gardens images (plans 03-07 Haifa + 03-10 Akko Bahá'í Mansion), Holy Sepulchre-class sites if covered

**Skills invoked:** `copywriting` (EN); `hebrew-content-writer` (HE); `affiliate-page-generator` (per-page partner choice)

### Task 4: Per-Region Soft Gate Verification

**Command:** `pnpm qa:audit && pnpm qa:hebrew-content && pnpm qa:credits && pnpm qa:schema && pnpm qa:region-gate {slug}`

**Mechanics (new for Phase 3):**

- Runs full QA pipeline after content authoring complete
- `qa:region-gate {slug}` filters `data/audit-results.json` to entries for this region
- PASS criteria:
  - All EN+HE canonical pages: REGION_CANONICAL profile score ≥80
  - All sub-dest pages: SUB_DESTINATION profile score ≥75
  - 0 critical/blocking issues across all region pages
  - EN+HE parity (every EN slug has HE counterpart)
  - Credits ledger entries for all images
  - Hebrew content QA: 0 violations on AUD-007/AUD-017..020/AUD-024/AUD-025
- Writes `data/region-gates/{slug}.md` report
- On FAIL: 3 fix attempts within this plan, then halt this region (do NOT cascade to others in same wave per CONTEXT.md)
- Lighthouse criterion: DEFERRED if `data/lighthouse-results.json` empty (GH Actions CI owns real runs)

**Skills invoked:** none — pure mechanical verification

---

## 2. Wave-Execution Coordination

Wave 2/3/4 each schedule 3 parallel plans. Coordination issues surfaced in Phase 2 must be carried forward.

### 2.1 Shared lint-staged / Husky pre-commit race

**Issue from Phase 2 wave 2:** Two plans committing within 1-2 seconds of each other can race on the pre-commit hook (Husky runs `lint-staged` which runs ESLint + TypeScript + `qa:credits` + `qa:schema`). The race is non-destructive but produces interleaved console output that's hard to diagnose.

**Mitigation (accepted pattern from Phase 2):**

- Each plan commits atomically per task (not per file)
- Pre-commit failures retried in-place (executor's standard retry loop)
- No cross-plan synchronization needed at the git level — Git's lock-file handles it
- Document this pattern in plan must_haves: "If pre-commit fails with lint-staged interleave error, retry the commit; do NOT skip hooks"

### 2.2 Parallel git commits — atomicity per plan

**Convention:** each plan creates commits scoped by `feat(03-{NN}):` prefix matching its plan number. Cross-plan file modifications are forbidden EXCEPT:

- `data/photo-credits.json` (single shared ledger — section 2.3)
- `app/sitemap.ts` STATIC_PATHS (single shared list — section 2.4)
- `velite.config.ts` (only Bethlehem plan 11 modifies; not parallel-conflicted)

**Recovery from cross-plan conflict:** if two plans both modify `data/photo-credits.json`, the second commit's pre-commit hook will detect the staleness; resolve by `git pull --rebase origin main` + re-running `qa:credits` to validate the merged ledger.

### 2.3 `data/photo-credits.json` parallel append handling

**Issue from Phase 2 plan 03:** When sub-destination images batched, 7 entries appended to a single JSON file. If plans run in parallel, each appends ~5-10 entries → merge conflict risk.

**Mitigation:**

- Each plan **adds new entries** keyed by unique `src` paths (`/images/regions/{region-slug}/...` or `/images/sub-destinations/{region-slug}/...`)
- Entries do NOT modify existing rows
- Merge conflict resolution is trivially "take both sides" (since each plan's entries have unique src paths)
- `scripts/qa/check-credits.mjs` Zod schema validates the merged file structure
- **Recommended:** plan executor uses a small helper to append rather than rewrite:
  ```js
  // pseudo: read existing JSON, push new entries by unique src, write back
  // (avoids accidentally clobbering parallel plan's entries when conflict resolution happens)
  ```
- **Worst case:** if conflict resolution does clobber another plan's entries, `pnpm qa:audit` AUD-003 (image without ledger entry) will fire for the clobbered plan's region pages, surfacing immediately at the wave merge point

### 2.4 `app/sitemap.ts` STATIC_PATHS parallel append

Same pattern as 2.3: each plan adds 1 region slug (canonical) and 3-8 sub-dest slugs. Trivial merge conflict resolution (take both sides). Pre-commit `pnpm build` validates final state.

### 2.5 `pnpm qa:audit` timing

Each plan runs `qa:audit` at end of its Task 4 (per-region gate). This is fine — `qa:audit` reads `.next/server/app/**` static HTML output, which is the rebuilt set of pages from `pnpm build`. Running `qa:audit` from plan A while plan B is mid-build is safe BECAUSE the audit reads file artifacts, not live build state.

**Aggregate audit run:** Phase 3 ends with a single site-wide `pnpm qa:audit && pnpm qa:quality-gate` run (post-wave-5) that captures all 11 regions in one report — this is `data/phase-3-region-report.md` per CONTEXT.md.

### 2.6 Tel Aviv (plan 01) validates the template

**Critical:** plan 01 (Tel Aviv) MUST complete before waves 2-5 start. Tel Aviv is the second-highest composite score and reuses the Phase 2 pattern almost identically. If Tel Aviv's soft gate fails, the template is broken; remaining plans should not start until Tel Aviv passes.

**Wave 0 of plan 01** is fatter than subsequent plans:

1. Per-region image sourcing (Tel Aviv-specific)
2. Create `scripts/qa/region-gate.mjs` (one-time infrastructure for all 11 plans)
3. Validate the `qa:region-gate {slug}` flow end-to-end against Tel Aviv

**Wave 0 of plans 02-10** is lighter — just per-region image sourcing.

**Wave 0 of plan 11 (Bethlehem)** is moderately fat — `/west-bank/` route family + Velite collection change.

---

## 3. Soft Gate Mechanics

### 3.1 Region-Scoped `data/audit-results.json` Filtering

The audit dashboard writes per-page entries to `data/audit-results.json` with shape:

```ts
interface PageResult {
  slug: string; // e.g., 'jerusalem/western-wall' or 'en/tel-aviv'
  lang: 'he' | 'en';
  profile: ProfileId | 'UNKNOWN'; // REGION_CANONICAL | SUB_DESTINATION | ...
  score: number; // 0-100
  issues: Issue[]; // all detected violations
  blocking: Issue[]; // critical-severity subset
  totalRules: number;
  rulesFired: number;
}
```

**Region-scoped filter for `pnpm qa:region-gate {slug}`:**

```js
const all = JSON.parse(readFileSync('data/audit-results.json', 'utf-8'));
const regionEntries = all.filter((p) => {
  // Strip leading 'en/' for EN-locale routes, then match by region prefix
  const path = p.slug.replace(/^en\//, '');
  return path === regionSlug || path.startsWith(`${regionSlug}/`);
  // Bethlehem special case: regionSlug = 'west-bank/bethlehem'
});
```

### 3.2 Profile-Based Score Thresholds

| Profile          | Threshold | Applies To                                                                    |
| ---------------- | --------- | ----------------------------------------------------------------------------- |
| REGION_CANONICAL | ≥80       | `/{region}/` + `/en/{region}/` (and `/west-bank/bethlehem/` + EN counterpart) |
| SUB_DESTINATION  | ≥75       | `/{region}/{subdest}/` + EN counterparts                                      |

(Phase 2 pilot used ≥85 / ≥75 — Phase 3 relaxes canonical threshold to ≥80 since template is proven and per-region variance is expected.)

### 3.3 Lighthouse Handling

**Local-run path:** `data/lighthouse-results.json` parsed. Filter to region pages. Each entry must have mobile median: perf ≥0.85, a11y ≥0.95, best-practices ≥0.95, SEO 1.00.

**CI-owned path (Phase 2.6 lesson):** if `data/lighthouse-results.json` is `[]` (file exists, no runs), treat region's Lighthouse criterion as **DEFERRED — CI owns**. The `.github/workflows/lighthouse.yml` will own the real run on PR/push. Distinction between null (file absent — build never ran lhci) and `[]` (file present, no entries) preserved in DEFER detail message.

**Windows local development:** chrome-launcher EPERM on Windows tmpdir is expected (plan 02-06 lesson) — soft gate accepts CI-DEFERRED status.

### 3.4 Region "Pass" Definition

A region passes soft gate when **ALL** the following hold:

- [ ] EN canonical: REGION_CANONICAL score ≥80, 0 blocking
- [ ] HE canonical: REGION_CANONICAL score ≥80, 0 blocking
- [ ] Each sub-dest EN: SUB_DESTINATION score ≥75, 0 blocking
- [ ] Each sub-dest HE: SUB_DESTINATION score ≥75, 0 blocking
- [ ] EN+HE parity: count(EN pages for region) === count(HE pages for region)
- [ ] Lighthouse mobile ≥85 OR DEFERRED-to-CI
- [ ] AUD-007 (HE/EN word-count) 0 violations across region pages
- [ ] AUD-017..020 (religious naming + admin status) 0 violations across region pages
- [ ] AUD-024/025 (HE editorial) 0 violations across HE region pages
- [ ] AUD-026 (restricted-site acks) 0 violations where applicable
- [ ] AUD-032 (hreflang reciprocity) 0 violations across region pages

### 3.5 Failure Handling

Per CONTEXT.md: "3 fix attempts within the plan, then halt that region (don't cascade to others in same wave)."

Mechanically:

- The plan's Task 4 (per-region gate) is an idempotent verification step
- If it fails, the executor's auto-fix loop attempts up to 3 fixes (typically content tweaks for AUD violations, ratio expansion for AUD-007, image ledger corrections for AUD-003)
- After 3 failed attempts, the plan exits with structured failure; parallel plans in the same wave continue (their gates are independent)

---

## 4. Validation Architecture

**Test Framework:**

| Property           | Value                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Vitest 2.x + audit-dashboard scripts (tsx/node CLI scripts)                                                                |
| Config file        | `vitest.config.ts` (existing); audit scripts share `scripts/audit/run.ts` infra                                            |
| Quick run command  | `pnpm qa:audit` (~5-10s) OR `pnpm test --run tests/content/{region}` (~2s per region)                                      |
| Full suite command | `pnpm build && pnpm qa:audit && pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content && pnpm qa:region-gate {slug}` |

**Phase Requirements → Test Map:**

| Req ID    | Behavior                                                           | Test Type          | Automated Command                                                                                                                                                                                                                                                                                                                       | File Exists?                                                                   |
| --------- | ------------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| REG-01    | 10 region canonicals exist (EN+HE pairs)                           | content + audit    | `pnpm qa:audit \| node -e "const r=require('./data/audit-results.json'); const regions=['tel-aviv','dead-sea','galilee','eilat','negev','nazareth','haifa','golan','caesarea','akko']; const missing=regions.filter(s => !r.some(p => p.slug===s) \|\| !r.some(p => p.slug===\`en/\${s}\`)); process.exit(missing.length===0 ? 0 : 1)"` | ❌ Wave 0 plan 01 — `qa:region-gate {slug}` script needed to wrap this cleanly |
| REG-01    | Each canonical: REGION_CANONICAL score ≥80, 0 blocking             | audit              | `pnpm qa:region-gate tel-aviv` (per region)                                                                                                                                                                                                                                                                                             | ❌ Wave 0 plan 01                                                              |
| REG-02    | Each region has 3-8 sub-destinations                               | content + audit    | `pnpm qa:region-gate {slug}` checks count band                                                                                                                                                                                                                                                                                          | ❌ Wave 0 plan 01                                                              |
| REG-02    | Each sub-dest: SUB_DESTINATION score ≥75                           | audit              | `pnpm qa:region-gate {slug}` (same script)                                                                                                                                                                                                                                                                                              | ❌ Wave 0 plan 01                                                              |
| REG-03    | Per-region soft gate evaluates audit + lighthouse                  | gate script        | `pnpm qa:region-gate {slug}`                                                                                                                                                                                                                                                                                                            | ❌ Wave 0 plan 01                                                              |
| REG-04    | Bethlehem `/west-bank/bethlehem/` exists with administrativeStatus | route + audit      | `pnpm qa:audit \| grep west-bank/bethlehem` + `pnpm qa:region-gate west-bank/bethlehem` (AUD-019 + AUD-020 = 0 violations)                                                                                                                                                                                                              | ❌ Wave 0 plan 11 — `/west-bank/[slug]/page.tsx` needed                        |
| REG-04    | Hebron page absent from sitemap                                    | sitemap inspection | `grep -L 'hebron' app/sitemap.ts` (negative test — must NOT contain)                                                                                                                                                                                                                                                                    | ✅ existing                                                                    |
| REG-05    | `data/haifa-bahai-policy.md` exists with Phase 6 commission note   | file existence     | `test -f data/baha-i-photo-policy.md && grep -q "press@bahai.org" data/baha-i-photo-policy.md`                                                                                                                                                                                                                                          | ❌ plan 07 Wave 0                                                              |
| REG-05    | `data/negev-images.md` exists with Phase 6 budget note             | file existence     | `test -f data/negev-images.md && grep -q "\$1,500" data/negev-images.md`                                                                                                                                                                                                                                                                | ❌ plan 05 Wave 0                                                              |
| Aggregate | All regions pass + report generated                                | aggregate gate     | `pnpm qa:audit && pnpm qa:quality-gate` (existing) writes `data/phase-3-region-report.md`                                                                                                                                                                                                                                               | ❌ Wave 5 close-out task                                                       |

**Sampling Rate (per `.planning/config.json` nyquist_validation: true):**

- **Per task commit:** `pnpm qa:audit` (filters to changed region; ~5-10s)
- **Per wave merge:** `pnpm qa:audit && pnpm qa:credits && pnpm qa:schema && pnpm qa:hebrew-content` full site (~30s)
- **Phase gate:** Full suite + `pnpm qa:quality-gate` aggregate (writes `data/phase-3-region-report.md`)

**Wave 0 Gaps:**

- [ ] `scripts/qa/region-gate.mjs` — per-region soft gate evaluator (Wave 0 plan 01; reused by plans 02-11)
- [ ] `package.json` script `"qa:region-gate": "node scripts/qa/region-gate.mjs"` (Wave 0 plan 01)
- [ ] `tests/qa/region-gate.test.ts` — pure helpers tested (Wave 0 plan 01; mirrors `tests/qa/pilot-checkpoint.test.ts` structure)
- [ ] `data/region-gates/` directory created (Wave 0 plan 01; per-region report destination)
- [ ] `app/[locale]/west-bank/[slug]/page.tsx` — new route renderer for Bethlehem (Wave 0 plan 11)
- [ ] `velite.config.ts` extension — either new `westBank` collection OR `administrativeStatus?: string` discriminator on `regions` (Wave 0 plan 11)
- [ ] `data/region-replication-report.md` template — appended per region completion (created Wave 0 plan 01; populated incrementally)

_(If no gaps: not applicable — Phase 3 introduces 5 new infrastructure files that don't exist yet.)_

---

## 5. Wave 0 New Infrastructure

Created in plan 01 Wave 0 (general) and plan 11 Wave 0 (Bethlehem-specific):

### `scripts/qa/region-gate.mjs` (plan 01 Wave 0)

```js
// Pseudocode — pattern matches scripts/qa/pilot-checkpoint.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const REGION = process.argv[2]; // e.g. 'tel-aviv' or 'west-bank/bethlehem'
const audit = JSON.parse(readFileSync('data/audit-results.json', 'utf-8'));

// Pure helper exported for Vitest
export function evaluateRegion(
  audit,
  region,
  thresholds = { canonical: 80, subDest: 75 },
) {
  const entries = audit.filter((p) => {
    const path = p.slug.replace(/^en\//, '');
    return path === region || path.startsWith(`${region}/`);
  });
  const failures = [];
  for (const p of entries) {
    const threshold =
      p.profile === 'REGION_CANONICAL'
        ? thresholds.canonical
        : p.profile === 'SUB_DESTINATION'
          ? thresholds.subDest
          : null;
    if (threshold && p.score < threshold)
      failures.push({ ...p, expected: threshold });
    if (p.blocking.length > 0) failures.push({ ...p, blocking: p.blocking });
  }
  // EN+HE parity check
  const enSlugs = new Set(
    entries
      .filter((p) => p.lang === 'en')
      .map((p) => p.slug.replace(/^en\//, '')),
  );
  const heSlugs = new Set(
    entries.filter((p) => p.lang === 'he').map((p) => p.slug),
  );
  const missingHe = [...enSlugs].filter((s) => !heSlugs.has(s));
  const missingEn = [...heSlugs].filter((s) => !enSlugs.has(s));
  return {
    entries,
    failures,
    missingHe,
    missingEn,
    verdict:
      failures.length === 0 && missingHe.length === 0 && missingEn.length === 0
        ? 'PASS'
        : 'FAIL',
  };
}

// main() guarded by import.meta.url === process.argv[1] check per Phase 1 convention
```

### `app/[locale]/west-bank/[slug]/page.tsx` (plan 11 Wave 0)

Copy-adapt from `app/[locale]/[region]/page.tsx`. Differences:

- `generateStaticParams` reads `westBank` Velite collection (or `regions` filtered to `administrativeStatus === 'palestinian-authority'`)
- Frontmatter contract REQUIRES `administrativeStatus: 'palestinian-authority'`
- BreadcrumbList: Home → West Bank → Bethlehem (3 segments; needs new HE translation `הגדה המערבית`)
- Schema TouristDestination + BreadcrumbList + FAQPage (no PlaceOfWorship)
- Renderer otherwise identical (RegionHero + AffiliateDisclosure + MDXContent)

### `velite.config.ts` (plan 11 Wave 0)

Two options (plan picks one):

**Option A — Discriminator field on `regions`:**

```ts
const regions = defineCollection({
  // ...
  schema: s.object({
    // ...existing fields...
    administrativeStatus: s
      .enum(['israel', 'palestinian-authority'])
      .default('israel')
      .optional(),
  }),
});
```

Simpler; reuses existing collection + renderer with conditional URL prefix.

**Option B — Separate `westBank` collection:**

```ts
const westBank = defineCollection({
  name: 'WestBank',
  pattern: 'west-bank/**/*.mdx',
  schema: s.object({
    /* same as regions but with required administrativeStatus */
  }),
});
```

Cleaner separation; new renderer required (per above).

**Recommendation: Option B** — distinct collection mirrors distinct route family `/west-bank/bethlehem/`. Audit walker's `loadVeliteIndex` already loads multiple collections (regions, subDestinations, guides, legal); adding `westBank` is a one-line extension.

### `data/region-replication-report.md` (plan 01 Wave 0 stub; populated incrementally)

Template:

```markdown
# Phase 3 Region Replication Report

| Region   | Pages Built | Affiliate % | Lighthouse | Audit Score | Religious Compliance | Soft Gate |
| -------- | ----------- | ----------- | ---------- | ----------- | -------------------- | --------- |
| tel-aviv | —           | —           | —          | —           | —                    | —         |

| ...
```

Each plan's Task 4 appends its row on PASS.

### `data/haifa-bahai-policy.md` (plan 07 Wave 0)

Content per REG-05:

- Wikimedia-only policy for Bahá'í Gardens imagery in v1
- Phase 6 commission requires written permission from `press@bahai.org`
- List of Wikimedia files used (sourceUrl + author + license) — typically Bahá'í Gardens / Bahá'í Shrine architectural exterior shots
- Photography of pilgrims prohibited per Bahá'í International Community policy

### `data/negev-images.md` (plan 05 Wave 0)

Content per REG-05:

- Wikimedia 40-50% coverage estimate (PITFALLS §5.2)
- 3-4 photo gallery accepted for v1 vs Jerusalem's 6+
- Phase 6 commission budget $1,500-$3,000 for Mitzpe Ramon / Makhtesh Ramon / Bedouin hospitality scenes
- List of synthetic-placeholder entries flagged for real-image swap

---

## 6. Per-Region Customization Cheat Sheet

Plan-by-plan deltas from the template. Each block is ~10 lines.

### Plan 03-01: Tel Aviv-Jaffa (Wave 1)

- **Sub-dests (6-8):** Old Jaffa Port, Carmel Market, Rothschild Boulevard / Bauhaus White City, Tel Aviv Museum of Art, Florentin, Tayelet beach promenade, HaTachana, Neve Tzedek
- **Religious naming:** Low — Jaffa has Christian (St. Peter's) + Muslim (Mahmoudiya Mosque) heritage; respect "Jaffa" as standalone city-name (not "Tel Aviv-Jaffa" only)
- **Images:** Wikimedia coverage 60-70% (LOW gap); Bauhaus/White City UNESCO files abundant; supplement with Unsplash for beach hero
- **Religious-site dual schema:** None required (no contested compound)
- **Affiliate density:** very high — Tel Aviv has rich hotel + tour + nightlife inventory; aim for 6+ partners on canonical
- **Carries the template-validation responsibility** — also creates `qa:region-gate` script in its Wave 0

### Plan 03-02: Dead Sea (Wave 2)

- **Sub-dests (5-6):** **Masada** (deferred-to-sub-dest per FEATURES taxonomy), Ein Gedi nature reserve, Qumran (Dead Sea Scrolls), Mineral Beach, Ein Bokek resort strip
- **Religious naming:** Low — Qumran sensitivity for Jewish/Essene history (factual framing)
- **Images:** Wikimedia 65-75% (MEDIUM); Masada well-covered; Ein Bokek resort thinner; abstract "shrinking sea" climate imagery OK from Unsplash
- **Religious-site dual schema:** Masada — Place (not PlaceOfWorship); Qumran — Place
- **AUD-018 attention:** northern Dead Sea is in West Bank Area C — DO NOT use "Judea and Samaria" or "occupied territories"; framing as "Dead Sea northern shore" is neutral
- **Climate-change angle (sea shrinking) is editorially safe** per FEATURES §1

### Plan 03-03: Galilee (Sea of Galilee) (Wave 2)

- **Sub-dests (6-7):** Tiberias, Capernaum, Mount of Beatitudes, Magdala, Yardenit baptismal site, Mount Arbel, Tabgha (optional — Loaves & Fishes)
- **Religious naming:** Christian-pilgrimage tone; **paired naming NOT required** (no contested compound); "Sea of Galilee" preferred (vs "Lake Tiberias" / "Kinneret" — use Hebrew word in HE only)
- **Religious-site dual schema:** Capernaum (PlaceOfWorship), Mt of Beatitudes (PlaceOfWorship), Tabgha (PlaceOfWorship), Magdala (Place — archaeological site)
- **Images:** Wikimedia 50-60% (MEDIUM-HIGH); Christian sites well-covered (pilgrimage tradition); Tiberias urban thinner
- **Schema exercise:** plan validates BOTH TouristAttraction AND ReligiousBuilding/PlaceOfWorship schema emission paths

### Plan 03-04: Eilat (Wave 2)

- **Sub-dests (4-5):** Coral Beach Reserve, Underwater Observatory, Timna Park, Dolphin Reef, Red Canyon
- **Religious naming:** None — tourism enclave
- **Images:** Wikimedia 50-60% (MEDIUM); Red Sea diving thin — consider Unsplash/Pexels for diving heroes (uniqueness less critical for beach destinations)
- **Religious-site dual schema:** None
- **Affiliate angle:** Skyscanner heavy (separate airport ETM); RentalCars for Negev road-trip combo; SafetyWing for diving insurance — heavier transport affiliate density

### Plan 03-05: Negev Desert (Wave 3) — IMAGE GAP CANARY

- **Sub-dests (5-6):** Mitzpe Ramon (Makhtesh Ramon crater overlook), Avdat (Nabataean ruins), Sde Boker / Ben-Gurion's grave, Ein Avdat canyon, ALPACA farm, Bedouin hospitality experience (optional)
- **Religious naming:** Low — sensitivity only for Bedouin community framing (respectful, not "exotic")
- **Images:** Wikimedia 40-50% (HIGH gap) — accept thinner 3-4 photo gallery vs Jerusalem's 6; **Wave 0 produces `data/negev-images.md`** documenting Phase 6 commission gap ($1,500-$3,000)
- **Religious-site dual schema:** None
- **AUD attention:** Avdat carries UNESCO Nabataean Spice Route significance — TouristAttraction + Place schema dual

### Plan 03-06: Nazareth (Wave 3)

- **Sub-dests (4-5):** Basilica of the Annunciation, Old City market / Souq, Mary's Well, Mount of Precipice, Mount Tabor / Church of the Transfiguration (optional — short drive)
- **Religious naming:** Christian-pilgrimage; **PITFALLS §3.1** — Basilica of the Annunciation has no contested-naming issue; respect both Christian (Greek Orthodox + Catholic) and Muslim heritage in editorial tone; Arab-Israeli city
- **Religious-site dual schema:** Basilica of the Annunciation (PlaceOfWorship — major)
- **Images:** Wikimedia 55-65% (MEDIUM); Basilica well-covered
- **Affiliate angle:** Civitatis/GetYourGuide Christian-pilgrimage tour partners

### Plan 03-07: Haifa (Wave 4) — POLICY GAP CANARY

- **Sub-dests (4-6):** Bahá'í Gardens (UNESCO), German Colony, Stella Maris Monastery, Wadi Nisnas / Hadar, Carmel National Park, Druze villages (Daliyat al-Karmel / Isfiya — optional)
- **Religious naming:** Bahá'í World Centre is sensitive — see PITFALLS §3.7 / §5.4: **Bahá'í faithful photography prohibited**; architectural/garden public-terrace shots OK
- **Images:** Wikimedia 65-75% (LOW-MEDIUM gap) for Bahá'í; **Wave 0 produces `data/haifa-bahai-policy.md`** with Wikimedia-only constraint + Phase 6 commission requires `press@bahai.org` written permission
- **Religious-site dual schema:** Bahá'í Gardens (Place — not PlaceOfWorship per Bahá'í conventions); Stella Maris (PlaceOfWorship)
- **Restricted-site `restrictedSiteAcknowledgment`** required on all Bahá'í Gardens images per AUD-026

### Plan 03-08: Golan Heights (Wave 4)

- **Sub-dests (4-5):** Mount Bental, Banias waterfall + Caesarea Philippi spring, Nimrod Fortress, Druze villages (Majdal Shams), Mount Hermon (Israel's only ski resort)
- **Religious naming:** Internationally disputed territory — **use "Golan Heights" without political adjective**; mention Druze community respectfully
- **AUD-018 attention:** Do NOT use "Israeli-occupied territories" or "Judea and Samaria" framings
- **Images:** Wikimedia 45-55% (HIGH gap); filter military-installation backgrounds out; Mount Hermon ski + Banias waterfall well-covered
- **Religious-site dual schema:** Nimrod Fortress (Place — Crusader fortification); Banias has Pan grotto archaeological (Place)
- **Caesarea Philippi vs Caesarea Maritima distinction** — use "Banias / Caesarea Philippi" on first reference if covered (different site from Plan 03-09's Caesarea)

### Plan 03-09: Caesarea (Wave 3)

- **Sub-dests (3-4):** Caesarea National Park / Roman ruins, Caesarea Harbour (Crusader port), Aqueduct Beach, Ralli Museum
- **Religious naming:** Low — Herodian/Roman archaeology; clarify **Caesarea Maritima** vs **Caesarea Philippi** (Golan) on first reference to disambiguate
- **Images:** Wikimedia 60-70% (MEDIUM-LOW gap); UNESCO archaeological coverage strong
- **Religious-site dual schema:** Roman Theatre / amphitheater (Place); aqueduct (Place)
- **Affiliate angle:** Civitatis archaeology day-tours; Booking for nearby Zichron Yaakov boutique stays

### Plan 03-10: Akko (Wave 4)

- **Sub-dests (4-5):** Old City of Akko (UNESCO), Hospitaller Knights' Halls, Templar Tunnel, Khan al-Umdan / Turkish Bath, Bahá'í Mansion of Bahjí (separate Bahá'í site from Haifa)
- **Religious naming:** Mixed Arab-Jewish; UNESCO Crusader heritage; **"Akko (Acre)" first reference for the city** per FEATURES §1; respect layered Crusader/Ottoman/British/Israeli history
- **Religious-site dual schema:** Bahá'í Mansion (Place — second Bahá'í site after Haifa)
- **Images:** Wikimedia 50-60% (MEDIUM); underground tunnels limited CC inventory
- **Restricted-site `restrictedSiteAcknowledgment`** required on Bahá'í Mansion images (same Bahá'í community policy)

### Plan 03-11: Bethlehem (Wave 5) — DISTINCT ROUTE FAMILY

- **Sub-dests: NONE** (single canonical only in v1 per CONTEXT.md — Aida camp, Shepherd's Field deferred)
- **Route:** `/en/west-bank/bethlehem/` + `/west-bank/bethlehem/` (HE root)
- **Frontmatter REQUIRES** `administrativeStatus: 'palestinian-authority'` (AUD-019 enforcement) — **plan-11 Wave 0 creates new Velite `westBank` collection + `app/[locale]/west-bank/[slug]/page.tsx` route renderer**
- **Religious naming:** Church of the Nativity, Manger Square, separation barrier as **practical info only** (transport via Jerusalem checkpoint); **no political commentary**
- **Religious-site dual schema:** Church of the Nativity (PlaceOfWorship — UNESCO)
- **Editorial framing per PITFALLS §3.3:** "Bethlehem (in the West Bank, administered by the Palestinian Authority)" on first mention; checkpoint transport practicalities; foreign tourists may enter Area A; pre-booked tours handle crossing
- **Internal links:** from Jerusalem canonical's "Day Trips" section (already wired Phase 2.1) AND Jerusalem itinerary "Day 3" (Phase 2.4)
- **Images:** Wikimedia 60-70% (MEDIUM); Church of the Nativity + Manger Square abundant; filter Banksy wall / political graffiti for v1 neutrality
- **Hreflang reciprocity** with `x-default` to EN per I18N-05 / AUD-032

---

## 7. Open Questions

1. **Should plan 01 (Tel Aviv) Wave 0 create `qa:region-gate` OR should it be a phase-level pre-wave?**
   - What we know: CONTEXT.md doesn't explicitly say; plan-01-Wave-0 is the natural place since Tel Aviv first exercises the gate
   - What's unclear: whether the planner prefers separating infrastructure (gate script) from content (Tel Aviv) into two waves
   - Recommendation: Bundle into plan 01 Wave 0 (gate is small ~80 LOC; needed for plan 01 Task 4 anyway). If executor returns plan 01 faster than expected, the gate script is amortized.

2. **Velite collection: Option A (administrativeStatus discriminator) vs Option B (separate `westBank` collection)?**
   - What we know: both work; existing audit-walker `loadVeliteIndex` already loads multiple collections
   - What's unclear: whether future West Bank coverage (post-v1) will add Jericho/Aida/Shepherd's Field — if yes, distinct collection scales better
   - Recommendation: Option B (separate collection). Aligns with distinct `/west-bank/` route family; clean migration for v2 West Bank expansion.

3. **Should the per-region gate script also run Lighthouse locally, or always defer to CI?**
   - What we know: Phase 2.6 lesson — local Chrome EPERM on Windows; CI workflow is the real runtime
   - Recommendation: Region gate reads `data/lighthouse-results.json` if non-empty; treats empty/absent as DEFERRED. Does NOT spawn lhci locally. (CI workflow already runs on PR/push.)

---

## Sources

### Primary (HIGH confidence)

- `.planning/phases/03-region-replication-m3/03-CONTEXT.md` — locked decisions (11 plans, 5 waves, soft gates, Bethlehem framing)
- `.planning/REQUIREMENTS.md` — REG-01..05 traceability
- `.planning/ROADMAP.md` Phase 3 section — success criteria + plan list
- `.planning/phases/02-pilot-region-jerusalem-m2/{01,02,03,06}-*-SUMMARY.md` — Jerusalem pilot proven patterns, decisions, deviations, throughput data (15-min HE per region; 35-min full sub-dest batch)
- `.planning/research/PITFALLS.md` §3.1, §3.3, §5, §6 — religious naming + admin-status + image source map + AUD rules

### Secondary (MEDIUM confidence)

- `.planning/research/FEATURES.md` §1 — 12-region taxonomy with composite scores and sub-dest candidates
- `scripts/audit/run.ts` + `scripts/qa/pilot-checkpoint.mjs` — existing pure-helpers-exported-for-Vitest patterns to mirror in `region-gate.mjs`
- `package.json` `qa:*` scripts — existing pipeline structure

### Tertiary (LOW confidence — flagged for validation)

- Per-region affiliate inventory depth (Phase 2's Phase-1.4 affiliate-status.json is the runtime source of truth; assumed unchanged for Phase 3)

---

## Metadata

**Confidence breakdown:**

- Per-region template: HIGH — pattern proven across 4 Phase 2 plans (2.1 EN canonical, 2.2 HE canonical, 2.3 sub-dests, 2.4 itinerary)
- Wave coordination: HIGH — Phase 2 wave 2 surfaced the lint-staged + `data/photo-credits.json` patterns
- Soft gate mechanics: HIGH — `data/audit-results.json` shape verified at `scripts/audit/run.ts:124-133`; pilot-checkpoint pattern reusable
- New infrastructure (region-gate script + west-bank route): MEDIUM — design specified; first executor exercise validates
- Per-region customization: HIGH — PITFALLS §5 (image map) + FEATURES §1 (sub-dest taxonomy) + CONTEXT.md (locked sub-dest targets) cross-confirm

**Research date:** 2026-05-11
**Valid until:** 2026-06-10 (30 days — template stable, no fast-moving dependencies)

## RESEARCH COMPLETE
