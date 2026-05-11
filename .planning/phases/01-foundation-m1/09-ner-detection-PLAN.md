---
phase: 01-foundation-m1
plan: 09
type: execute
wave: 6
depends_on:
  - 01-scaffold
  - 04-schema-baseline
  - 07-quality-profiles
  - 08-seo-config
files_modified:
  - data/entity-dict.json
  - lib/ner/types.ts
  - lib/ner/detector.ts
  - lib/ner/__tests__/detector.test.ts
  - lib/ner/__tests__/entity-dict.test.ts
  - scripts/audit/scan-ner.mjs
  - tests/ner/scan-ner.test.ts
autonomous: true
requirements:
  - FND-07
must_haves:
  truths:
    - "`data/entity-dict.json` exists with classes `tour | hotel | restaurant | museum | transport | religious_site` and ~30 starter entities each"
    - "`detectMentions(mdxBody, lang)` returns `Mention[]` with entity, class, span, suggestedAction"
    - "Sample MDX mentioning 'Abraham Hostel' WITHOUT `<AffiliateCard partner=\"hostelworld\">` nearby → emits `{ class: 'hotel', suggestedAction: 'add-affiliate' }`"
    - "Sample MDX mentioning 'Yad Vashem' WITHOUT `<Link>` to internal sub-dest → emits `{ class: 'museum', suggestedAction: 'add-internal-link' }`"
    - "`scripts/audit/scan-ner.mjs` runs detector across all built Velite output; writes `data/ner-results.json`"
    - "Detector handles both Hebrew and English text passages"
  artifacts:
    - path: "data/entity-dict.json"
      provides: "Entity seed dictionary with 6 classes × ~30 entities"
      contains: "Abraham Hostel"
    - path: "lib/ner/detector.ts"
      provides: "detectMentions(body, lang): Mention[]"
      contains: "matchAll"
    - path: "scripts/audit/scan-ner.mjs"
      provides: "Integration script — feeds plan 10 audit dashboard"
      contains: "ner-results.json"
  key_links:
    - from: "lib/ner/detector.ts"
      to: "data/entity-dict.json"
      via: "iterates classes × entities"
      pattern: "Object.entries\\(dict"
    - from: "scripts/audit/scan-ner.mjs"
      to: "lib/ner/detector.ts"
      via: "runs detector on each Velite output body"
      pattern: "detectMentions"
---

<objective>
Build the NER (Named Entity Recognition) mention-detection infrastructure: seed dictionary, regex-based detector, integration script that produces `data/ner-results.json` for plan 10's audit dashboard. Phase 1 ships the scaffolding + seed dictionary; Phase 2 content exercises it.

Purpose: Argentina lesson #6 (entity mentions buried in content but never monetized — "the page mentioned Hostelworld three times but never linked to it") is fixed. The detector scans MDX bodies, finds known entities, and surfaces unmonetized mentions to the audit dashboard with a `suggestedAction: 'add-affiliate' | 'add-internal-link' | 'no-action'`.

Output: Working detector with Vitest tests proving the suggestion heuristic, seed `data/entity-dict.json` with 6 classes, integration script ready for plan 10 audit dashboard consumption.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-foundation-m1/01-CONTEXT.md
@.planning/phases/01-foundation-m1/01-RESEARCH.md
@.planning/phases/01-foundation-m1/01-VALIDATION.md
@.planning/phases/01-foundation-m1/07-quality-profiles-SUMMARY.md
@.planning/phases/01-foundation-m1/08-seo-config-SUMMARY.md
@.planning/research/ARCHITECTURE.md

<interfaces>
Published APIs (consumed by plan 10 audit dashboard):

```ts
// lib/ner/types.ts
export type EntityClass = 'tour' | 'hotel' | 'restaurant' | 'museum' | 'transport' | 'religious_site';

export interface Mention {
  entity: string;
  class: EntityClass;
  span: [number, number];
  suggestedAction: 'add-affiliate' | 'add-internal-link' | 'no-action';
  contextSample: string;  // ±50 chars around mention
}

// lib/ner/detector.ts
export function detectMentions(body: string, lang: 'he' | 'en'): Mention[];
```

```bash
# CLI consumed by plan 10
node scripts/audit/scan-ner.mjs
# writes data/ner-results.json
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Author `data/entity-dict.json` seed dictionary (6 classes, ~30 entities each)</name>
  <files>data/entity-dict.json, lib/ner/__tests__/entity-dict.test.ts</files>
  <action>
Per RESEARCH.md §1.11 verbatim seed example, expand to ~30 entities per class:

Create `data/entity-dict.json`:
```json
{
  "tour": [
    "Abraham Tours", "Bein Harim", "Tourist Israel", "Israel Tours by Locals",
    "Sandemans New Tel Aviv", "Sandemans New Jerusalem", "Egged Tours",
    "United Tours", "City Pass Jerusalem", "Tour of Galilee with Egged",
    "Masada Sunrise Tour", "Dead Sea Day Trip", "Petra Day Trip", "Nazareth Day Trip"
  ],
  "hotel": [
    "Abraham Hostel", "Dan Tel Aviv", "King David Hotel", "Mamilla Hotel",
    "American Colony Hotel", "Waldorf Astoria Jerusalem", "Inbal Jerusalem",
    "Hotel Yehuda", "Ibis Tel Aviv", "Brown TLV Hotel", "Norman Tel Aviv",
    "Beresheet Hotel", "Setai Tel Aviv", "Ritz Carlton Herzliya",
    "Dan Carmel Haifa", "Bay Club Haifa", "Akko Yefet Hotel", "Galei Kinneret",
    "Sea of Galilee Hostel", "Eilat Royal Beach", "Dan Eilat", "Princess Eilat",
    "Crowne Plaza Tel Aviv", "David Citadel"
  ],
  "restaurant": [
    "Machneyuda", "Eucalyptus", "Adom", "Anna Italian Cafe",
    "Modern Cuisine", "Pinati", "Aroma", "Cofix", "Cafelix",
    "OCD Tel Aviv", "Toto", "Manta Ray", "Mizlala", "Rothschild Allenby",
    "Yaffo Tel Aviv", "Magdalena Galilee", "Uri Buri Akko", "Helena Caesarea",
    "Catit Tel Aviv", "North Abraxas", "Carousela"
  ],
  "museum": [
    "Yad Vashem", "Israel Museum", "Tower of David Museum",
    "Tel Aviv Museum of Art", "Bible Lands Museum", "L.A. Mayer Museum",
    "Eretz Israel Museum", "Beit Hatfutsot (ANU)", "Israel Aquarium",
    "Madatech Haifa", "Tikotin Museum of Japanese Art", "Hecht Museum Haifa",
    "Akko Underground Crusader City", "Bahá'í World Centre", "Yitzhak Rabin Center",
    "Palmach Museum", "Etzel Museum", "Bauhaus Foundation Museum"
  ],
  "transport": [
    "Egged", "Israel Railways", "Ben Gurion Airport", "Ramon Airport",
    "Dan Bus", "Light Rail Jerusalem", "Tel Aviv Light Rail",
    "Sherut shared taxi", "Gett", "Yango", "Hertz Israel", "Avis Israel",
    "Eldan", "Albar", "ICA car rental", "Sixt Israel"
  ],
  "religious_site": [
    "Western Wall", "Holy Sepulchre", "Dome of the Rock", "Al-Aqsa Mosque",
    "Mahane Yehuda", "Mount of Olives", "Garden Tomb", "Cenacle",
    "City of David", "Tower of David", "Cardo", "Hurva Synagogue",
    "Basilica of the Annunciation", "Church of the Multiplication",
    "Mount of Beatitudes", "Capernaum", "Church of the Nativity",
    "Bahá'í Gardens", "Stella Maris Monastery", "El-Jazzar Mosque",
    "Tomb of Maimonides", "Masada", "Qumran"
  ]
}
```

Create `lib/ner/__tests__/entity-dict.test.ts`:
- Test: Dictionary has all 6 classes
- Test: Each class has ≥10 entities (allows for seed-size flexibility per CONTEXT discretion)
- Test: Religious-site list overlaps with `data/religious-sites.json` site names (verifies coherence between dictionaries)

Note: Names match the religious-site canonical names from plan 04. Lowercase variants and Hebrew variants are handled by the detector's regex (case-insensitive, word boundary).
  </action>
  <verify>
    <automated>pnpm test --run lib/ner/__tests__/entity-dict.test.ts</automated>
  </verify>
  <done>`data/entity-dict.json` valid JSON; 6 classes; ≥10 entities each; total ~130+ entities; religious_site list overlaps with religious-sites.json.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Build `lib/ner/detector.ts` regex-based detector + suggestedAction heuristic</name>
  <files>lib/ner/types.ts, lib/ner/detector.ts, lib/ner/__tests__/detector.test.ts</files>
  <behavior>
    - Test: `detectMentions('We stayed at Abraham Hostel for two nights.', 'en')` returns at least one Mention with `entity: 'Abraham Hostel'`, `class: 'hotel'`, span pointing to the substring
    - Test: When MDX context within ±300 chars has `<AffiliateCard partner="hostelworld">`, the Mention's `suggestedAction` is 'no-action'
    - Test: When NO `<AffiliateCard>` nearby AND class is 'hotel' or 'tour' → suggestedAction = 'add-affiliate'
    - Test: When `<Link>` nearby AND class is 'museum' or 'religious_site' → suggestedAction = 'no-action'
    - Test: When NO `<Link>` nearby AND class is 'museum' → suggestedAction = 'add-internal-link'
    - Test: Detector handles Hebrew text — `detectMentions('האכסניה בא ברהם הוסטל', 'he')` operates without crashing (even if dictionary entities are English; future expansion adds Hebrew entities)
    - Test: Same entity mentioned twice → two Mention entries with different spans
    - Test: Empty body → returns []
    - Test: Body with no known entities → returns []
  </behavior>
  <action>
Create `lib/ner/types.ts` per the interfaces block above.

Create `lib/ner/detector.ts` per RESEARCH.md §1.11 outline:

```ts
import dict from '../../data/entity-dict.json';
import type { EntityClass, Mention } from './types';

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function detectMentions(body: string, lang: 'he' | 'en'): Mention[] {
  const found: Mention[] = [];

  for (const [klass, entities] of Object.entries(dict) as [EntityClass, string[]][]) {
    for (const ent of entities) {
      const re = new RegExp(`\\b${escapeRegex(ent)}\\b`, 'gi');
      for (const m of body.matchAll(re)) {
        if (m.index === undefined) continue;
        const span: [number, number] = [m.index, m.index + ent.length];

        // Heuristic: scan ±300 chars for <AffiliateCard or <Link
        const ctxStart = Math.max(0, span[0] - 300);
        const ctxEnd = Math.min(body.length, span[1] + 300);
        const ctx = body.slice(ctxStart, ctxEnd);
        const hasAffiliate = /<AffiliateCard\s+partner=/.test(ctx);
        const hasInternalLink = /<Link\s+href=["'][^"']+["']/.test(ctx);

        let suggestedAction: Mention['suggestedAction'];
        if ((klass === 'hotel' || klass === 'tour' || klass === 'transport') && !hasAffiliate) {
          suggestedAction = 'add-affiliate';
        } else if (!hasInternalLink && (klass === 'museum' || klass === 'religious_site' || klass === 'restaurant')) {
          suggestedAction = 'add-internal-link';
        } else {
          suggestedAction = 'no-action';
        }

        // ±50 char context sample
        const sampleStart = Math.max(0, span[0] - 50);
        const sampleEnd = Math.min(body.length, span[1] + 50);
        const contextSample = body.slice(sampleStart, sampleEnd);

        found.push({ entity: ent, class: klass, span, suggestedAction, contextSample });
      }
    }
  }

  return found;
}
```

Create `lib/ner/__tests__/detector.test.ts` with all 9 behaviors above.

For Hebrew test: dictionary currently has only English entries; the detector handles Hebrew text gracefully (no crashes) but returns no matches (expected at end of Phase 1). Phase 2 may extend the dict with Hebrew transliterations.
  </action>
  <verify>
    <automated>pnpm test --run lib/ner/__tests__/detector.test.ts</automated>
  </verify>
  <done>All 9 detector behaviors green; suggestedAction heuristic distinguishes add-affiliate vs add-internal-link vs no-action; Hebrew text handled gracefully.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Build `scripts/audit/scan-ner.mjs` integration script + Vitest test</name>
  <files>scripts/audit/scan-ner.mjs, package.json, tests/ner/scan-ner.test.ts</files>
  <behavior>
    - Test: Given a temp dir with `.velite/regions.json` (or similar) containing sample MDX bodies → script runs `detectMentions` per body → writes `data/ner-results.json`
    - Test: Output JSON has shape `Array<{ slug, lang, mentions: Mention[] }>`
    - Test: When no Velite output exists (Phase 1 greenfield) → script writes empty array `[]` and exits 0
    - Test: Output is sorted by slug for deterministic snapshots
  </behavior>
  <action>
Create `scripts/audit/scan-ner.mjs`:

```js
#!/usr/bin/env node
// scripts/audit/scan-ner.mjs — runs NER detector across Velite output and writes data/ner-results.json
import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'glob';
import { detectMentions } from '../../lib/ner/detector.js'; // adjust if compilation needed

const out = [];

// Phase 1: content is empty, so no Velite outputs exist. Script must NOT crash.
const veliteFiles = await glob('.velite/*.json');

for (const file of veliteFiles) {
  const data = JSON.parse(await readFile(file, 'utf8'));
  if (!Array.isArray(data)) continue;
  for (const entry of data) {
    if (!entry?.body || !entry?.lang || !entry?.slug) continue;
    const mentions = detectMentions(entry.body, entry.lang);
    out.push({ slug: entry.slug, lang: entry.lang, mentions });
  }
}

out.sort((a, b) => a.slug.localeCompare(b.slug));
await writeFile('data/ner-results.json', JSON.stringify(out, null, 2));
console.log(`NER scan OK (${out.length} pages, ${out.reduce((a, b) => a + b.mentions.length, 0)} mentions).`);
```

Important: The script imports from `lib/ner/detector.ts` — since the script is `.mjs` and detector is `.ts`, either:
- Use `pnpm exec tsx scripts/audit/scan-ner.mjs` (tsx handles TS imports in scripts)
- OR compile detector to JS first (more complex)
- Recommended: `pnpm add -D tsx`; change script to `tsx scripts/audit/scan-ner.ts`

Convert script to `.ts` if simpler with tsx; otherwise embed a minimal compiled JS detector for the script's use.

Add `qa:ner` script in `package.json`: `"qa:ner": "tsx scripts/audit/scan-ner.ts"`.

Create `tests/ner/scan-ner.test.ts`:
- Set up a temp `.velite/` with a fake `regions.json` containing sample MDX bodies
- Run the script via child_process
- Read `data/ner-results.json` (in temp dir)
- Assert shape + content

For Phase 1 greenfield reality: `.velite/` does NOT exist yet (Velite hasn't built any content). The script must handle this gracefully — exit 0, write `[]`.

DO NOT commit `data/ner-results.json` — it's regenerated; add to `.gitignore` (or commit as empty `[]` if preferred).
  </action>
  <verify>
    <automated>pnpm qa:ner &amp;&amp; pnpm test --run tests/ner/scan-ner.test.ts</automated>
  </verify>
  <done>Integration script writes `data/ner-results.json` (empty array on greenfield Phase 1); fixture tests pass; script ready for plan 10 audit dashboard.</done>
</task>

</tasks>

<verification>
End of plan 09 checks:

1. **FND-07**: `data/entity-dict.json` exists with 6 classes × ~10-30 entities each; `detectMentions` flags unmonetized mentions; integration script writes `data/ner-results.json`.
2. Detector test: Abraham Hostel without nearby `<AffiliateCard>` → suggestedAction='add-affiliate'.
3. Detector test: Yad Vashem without nearby `<Link>` → suggestedAction='add-internal-link'.
4. Integration script writes valid empty JSON on Phase 1 greenfield (no Velite output yet).
</verification>

<success_criteria>
- 6 entity classes × ≥10 entities each in `data/entity-dict.json`
- Detector exports `detectMentions(body, lang): Mention[]`
- Suggestion heuristic: add-affiliate (hotel/tour/transport without nearby AffiliateCard) vs add-internal-link (museum/religious_site/restaurant without nearby Link) vs no-action
- Integration script `scripts/audit/scan-ner.mjs` writes `data/ner-results.json`
- All Vitest tests pass (~15 NER tests across 3 files)
- VALIDATION row FND-07 green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/09-ner-detection-SUMMARY.md` documenting: dictionary class counts, detector contract, integration script invocation, output consumed by plan 10 audit dashboard.
</output>
