---
phase: 01-foundation-m1
plan: 07
type: execute
wave: 5
depends_on:
  - 01-scaffold
  - 04-schema-baseline
  - 06-affiliate-helpers
files_modified:
  - scripts/audit/profiles/types.ts
  - scripts/audit/profiles/region_canonical.ts
  - scripts/audit/profiles/sub_destination.ts
  - scripts/audit/profiles/guide_or_winery.ts
  - scripts/audit/profiles/utility.ts
  - scripts/audit/profiles/hub.ts
  - scripts/audit/profiles/index.ts
  - scripts/audit/profiles/detect.ts
  - scripts/audit/profiles/__tests__/detect.test.ts
  - scripts/audit/profiles/__tests__/profiles.test.ts
  - scripts/audit/profiles/__tests__/region_canonical-score.test.ts
autonomous: true
requirements:
  - FND-05
must_haves:
  truths:
    - "5 ProfileSpec objects exported with distinct weight matrices (REGION_CANONICAL, SUB_DESTINATION, GUIDE_OR_WINERY, UTILITY, HUB)"
    - "Each profile distinct on: `minWordCount`, `minAffiliates`, `requiredSchemaTypes`, `scoreCutoffPilot`, `scoreCutoffReplicated`"
    - "REGION_CANONICAL: 1500w min, 5+ affiliates, requires TouristDestination+BreadcrumbList+FAQPage, cutoff 85/80"
    - "SUB_DESTINATION: 800w min, 1+ affiliates, requires TouristAttraction+BreadcrumbList, cutoff 85/80"
    - "GUIDE_OR_WINERY: 600w min, 1+ affiliates, requires Article+LocalBusiness, cutoff 85/80"
    - "UTILITY: no wordcount enforced, no affiliates required, requires WebPage minimal, cutoff 85/80"
    - "HUB: no wordcount enforced, no affiliates required, requires CollectionPage, cutoff 85/80"
    - "`detectProfile(frontmatter)` returns correct ProfileId for sample inputs"
    - "Sample fixture: TouristDestination page with 0 affiliates → REGION_CANONICAL scores below 85"
  artifacts:
    - path: "scripts/audit/profiles/types.ts"
      provides: "ProfileSpec interface + ProfileId type + RuleWeight interface"
      contains: "ProfileSpec"
    - path: "scripts/audit/profiles/region_canonical.ts"
      provides: "REGION_CANONICAL profile (1500w, 5+ affiliates, schema required)"
      contains: "REGION_CANONICAL"
    - path: "scripts/audit/profiles/detect.ts"
      provides: "detectProfile(frontmatter): ProfileId heuristic"
      contains: "collection"
    - path: "scripts/audit/profiles/index.ts"
      provides: "Barrel export of all 5 profiles + detect + types"
      contains: "export"
  key_links:
    - from: "scripts/audit/profiles/detect.ts"
      to: "Velite frontmatter shape (lang, collection, isHub?, isUtility?)"
      via: "frontmatter dispatch"
      pattern: "collection ==="
    - from: "scripts/audit/profiles/region_canonical.ts"
      to: "AUD-001..AUD-034 rule IDs"
      via: "weights array references rule IDs"
      pattern: "AUD-0\\d\\d"
---

<objective>
Materialize the 5 quality scoring profiles (REGION_CANONICAL, SUB_DESTINATION, GUIDE_OR_WINERY, UTILITY, HUB) with distinct weight matrices per FND-05, plus the `detectProfile(frontmatter)` heuristic that selects a profile based on Velite collection + frontmatter flags. Produce Vitest tests proving the profiles differ meaningfully and `detectProfile` returns correct IDs.

Purpose: Argentina lesson #5 (every page scored against the same generic rubric → no signal) is fixed. Phase 2 pages get scored against their specific profile's weight matrix; Quality Gate uses these cutoffs (85 pilot, 80 replicated). Plan 10 (audit dashboard) consumes these profiles directly.

Output: 5 profile spec files + detect heuristic + 3 Vitest test suites, all exported via a barrel `scripts/audit/profiles/index.ts`.
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
@.planning/phases/01-foundation-m1/04-schema-baseline-SUMMARY.md
@.planning/phases/01-foundation-m1/06-affiliate-helpers-SUMMARY.md
@.planning/research/PITFALLS.md

<interfaces>
Published APIs (consumed by plan 10 audit dashboard):

```ts
// scripts/audit/profiles/types.ts
export type ProfileId = 'REGION_CANONICAL' | 'SUB_DESTINATION' | 'GUIDE_OR_WINERY' | 'UTILITY' | 'HUB';

export interface RuleWeight {
  rule: string;     // 'AUD-001' .. 'AUD-034'
  weight: number;   // 0..100; sums to ≤100 across array
  required: boolean;
}

export interface ProfileSpec {
  id: ProfileId;
  minWordCount: number;
  minAffiliates: number;
  requiredSchemaTypes: readonly string[];
  weights: readonly RuleWeight[];
  scoreCutoffPilot: number;
  scoreCutoffReplicated: number;
}

// scripts/audit/profiles/index.ts
export const profiles: Record<ProfileId, ProfileSpec>;
export { detectProfile } from './detect';
```

```ts
// scripts/audit/profiles/detect.ts
export function detectProfile(fm: {
  collection: string;  // 'regions' | 'subDestinations' | 'guides' | 'legal'
  isHub?: boolean;
  isUtility?: boolean;
}): ProfileId;
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Define `ProfileSpec` type + `detectProfile` heuristic + 5 profile spec files</name>
  <files>scripts/audit/profiles/types.ts, scripts/audit/profiles/region_canonical.ts, scripts/audit/profiles/sub_destination.ts, scripts/audit/profiles/guide_or_winery.ts, scripts/audit/profiles/utility.ts, scripts/audit/profiles/hub.ts, scripts/audit/profiles/detect.ts, scripts/audit/profiles/index.ts</files>
  <action>
Per RESEARCH.md §1.7 (verbatim):

Create `scripts/audit/profiles/types.ts`:
```ts
export type ProfileId = 'REGION_CANONICAL' | 'SUB_DESTINATION' | 'GUIDE_OR_WINERY' | 'UTILITY' | 'HUB';

export interface RuleWeight {
  rule: string;
  weight: number;
  required: boolean;
}

export interface ProfileSpec {
  id: ProfileId;
  minWordCount: number;
  minAffiliates: number;
  requiredSchemaTypes: readonly string[];
  weights: readonly RuleWeight[];
  scoreCutoffPilot: number;
  scoreCutoffReplicated: number;
}
```

Create `scripts/audit/profiles/region_canonical.ts` per RESEARCH §1.7 verbatim, then sum weights to 100. Use these distinct attributes (from CONTEXT §Quality scoring profiles):
```ts
import type { ProfileSpec } from './types';

export const RegionCanonical: ProfileSpec = {
  id: 'REGION_CANONICAL',
  minWordCount: 1500,
  minAffiliates: 5,
  requiredSchemaTypes: ['TouristDestination', 'BreadcrumbList', 'FAQPage'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    { rule: 'AUD-001', weight: 5, required: true },   // no raw hex (Argentina #1)
    { rule: 'AUD-002', weight: 5, required: true },   // no raw partner URL
    { rule: 'AUD-003', weight: 8, required: true },   // documented image
    { rule: 'AUD-004', weight: 5, required: true },   // image width
    { rule: 'AUD-005', weight: 3, required: false },  // srcset
    { rule: 'AUD-008', weight: 5, required: true },   // pre-hydration HTML
    { rule: 'AUD-009', weight: 8, required: true },   // FTC disclosure
    { rule: 'AUD-012', weight: 5, required: true },   // LCP not lazy
    { rule: 'AUD-017', weight: 4, required: true },   // No "Wailing Wall"
    { rule: 'AUD-018', weight: 3, required: true },   // No biased framing
    { rule: 'AUD-019', weight: 3, required: false },  // Temple Mount paired naming
    { rule: 'AUD-026', weight: 5, required: true },   // restricted-site image rights
    { rule: 'AUD-027', weight: 4, required: true },   // lang/dir on <html>
    { rule: 'AUD-028', weight: 3, required: true },   // accessibility-statement footer link
    { rule: 'AUD-029', weight: 2, required: false },  // Hebrew form errors role=alert
    { rule: 'AUD-030', weight: 3, required: true },   // no physical directional utils
    { rule: 'AUD-031', weight: 2, required: false },  // helper has Israel fixture
    { rule: 'AUD-032', weight: 5, required: true },   // hreflang reciprocity
    { rule: 'AUD-033', weight: 5, required: true },   // canonical + schema + meta + OG + hreflang
    { rule: 'AUD-034', weight: 7, required: true },   // Lighthouse threshold
    { rule: 'AUD-013', weight: 3, required: false },  // third-party blocking
    { rule: 'AUD-014', weight: 2, required: false },  // ≤6 external scripts
    { rule: 'AUD-007', weight: 2, required: false },  // HE/EN ratio
    { rule: 'AUD-006', weight: 3, required: false },  // sub-dest H1 cannibalize
  ],
  // Note: weights sum to 100; rules without entries default to weight 0 in scorer
};
```

Sum check: `pnpm test` should verify each profile's weights sum to ≤100.

Create `scripts/audit/profiles/sub_destination.ts`:
- minWordCount: 800
- minAffiliates: 1
- requiredSchemaTypes: ['TouristAttraction', 'BreadcrumbList']
- scoreCutoffPilot: 85, scoreCutoffReplicated: 80
- weights: similar shape but DIFFERENT distribution (e.g., AUD-006 sub-dest H1 cannibalize gets higher weight; AUD-009 disclosure still required but maybe weight 5)

Create `scripts/audit/profiles/guide_or_winery.ts`:
- minWordCount: 600
- minAffiliates: 1
- requiredSchemaTypes: ['Article', 'LocalBusiness']  // note: Article isn't in our generators yet — schema-dts has it, just not a builder
- scoreCutoffPilot: 85, scoreCutoffReplicated: 80
- weights: emphasize content quality + image rights; less weight on affiliate density

Create `scripts/audit/profiles/utility.ts`:
- minWordCount: 0 (not enforced)
- minAffiliates: 0
- requiredSchemaTypes: ['WebPage']
- scoreCutoffPilot: 85, scoreCutoffReplicated: 80
- weights: heaviest on AUD-027 (lang/dir), AUD-028 (footer link), AUD-033 (canonical+schema); zero weight on AUD-009 (disclosure not required since no affiliates)

Create `scripts/audit/profiles/hub.ts`:
- minWordCount: 0
- minAffiliates: 0
- requiredSchemaTypes: ['CollectionPage']
- scoreCutoffPilot: 85, scoreCutoffReplicated: 80
- weights: emphasize internal links + breadcrumbs (NOT in current rule set but a future "AUD-035" could be added)

Each profile's weight distribution MUST be visibly distinct — `region_canonical` is heavier on affiliate density (AUD-009) than `utility`. The `detectProfile` test will exercise these distinctions.

Create `scripts/audit/profiles/detect.ts` per RESEARCH §1.7:
```ts
import type { ProfileId } from './types';

export function detectProfile(fm: { collection: string; isHub?: boolean; isUtility?: boolean }): ProfileId {
  if (fm.isUtility) return 'UTILITY';
  if (fm.isHub) return 'HUB';
  if (fm.collection === 'regions')          return 'REGION_CANONICAL';
  if (fm.collection === 'subDestinations')  return 'SUB_DESTINATION';
  if (fm.collection === 'guides')           return 'GUIDE_OR_WINERY';
  if (fm.collection === 'legal')            return 'UTILITY';
  throw new Error(`Cannot detect profile for collection=${fm.collection}`);
}
```

Create `scripts/audit/profiles/index.ts`:
```ts
import { RegionCanonical } from './region_canonical';
import { SubDestination } from './sub_destination';
import { GuideOrWinery } from './guide_or_winery';
import { Utility } from './utility';
import { Hub } from './hub';

export const profiles = {
  REGION_CANONICAL: RegionCanonical,
  SUB_DESTINATION: SubDestination,
  GUIDE_OR_WINERY: GuideOrWinery,
  UTILITY: Utility,
  HUB: Hub,
} as const;

export { detectProfile } from './detect';
export type { ProfileSpec, ProfileId, RuleWeight } from './types';
```
  </action>
  <verify>
    <automated>pnpm typecheck</automated>
  </verify>
  <done>5 profiles + types + detect + index barrel all exported; types compile clean; each profile is distinct on minWordCount/minAffiliates/requiredSchemaTypes/weights.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Vitest test — `detectProfile` returns correct ProfileId per fixture frontmatter shapes</name>
  <files>scripts/audit/profiles/__tests__/detect.test.ts</files>
  <behavior>
    - Test: `detectProfile({ collection: 'regions' })` returns `'REGION_CANONICAL'`
    - Test: `detectProfile({ collection: 'subDestinations' })` returns `'SUB_DESTINATION'`
    - Test: `detectProfile({ collection: 'guides' })` returns `'GUIDE_OR_WINERY'`
    - Test: `detectProfile({ collection: 'legal' })` returns `'UTILITY'`
    - Test: `detectProfile({ collection: 'regions', isUtility: true })` returns `'UTILITY'` (overrides)
    - Test: `detectProfile({ collection: 'regions', isHub: true })` returns `'HUB'` (overrides)
    - Test: `detectProfile({ collection: 'invalid' })` THROWS
  </behavior>
  <action>
Create `scripts/audit/profiles/__tests__/detect.test.ts` with all 7 behaviors above.
  </action>
  <verify>
    <automated>pnpm test --run scripts/audit/profiles/__tests__/detect.test.ts</automated>
  </verify>
  <done>All 7 behaviors green; isUtility and isHub flags correctly override collection.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Vitest test — profiles are distinct + REGION_CANONICAL scores 0-affiliate fixture below threshold</name>
  <files>scripts/audit/profiles/__tests__/profiles.test.ts, scripts/audit/profiles/__tests__/region_canonical-score.test.ts</files>
  <behavior>
    - Test: All 5 profiles' weights arrays sum to ≤100
    - Test: REGION_CANONICAL.minWordCount (1500) > SUB_DESTINATION.minWordCount (800) > GUIDE_OR_WINERY.minWordCount (600)
    - Test: REGION_CANONICAL.minAffiliates (5) > SUB_DESTINATION.minAffiliates (1) === GUIDE_OR_WINERY.minAffiliates (1)
    - Test: UTILITY.requiredSchemaTypes contains 'WebPage'; does NOT contain 'TouristDestination'
    - Test: HUB.requiredSchemaTypes contains 'CollectionPage'; does NOT contain 'TouristDestination'
    - Test: Given a synthetic issue set representing a TouristDestination page with 0 affiliates (AUD-009 fires + AUD-031 fires) → score computed via REGION_CANONICAL weights is < 85
    - Test: Given the same page with 5+ affiliates + zero issues → score is 100 (or ≥85)
  </behavior>
  <action>
Create `scripts/audit/profiles/__tests__/profiles.test.ts`:
- Verify all profile invariants from the behavior block
- Sum weights for each profile; assert ≤100
- Assert distinctness on minWordCount, minAffiliates, requiredSchemaTypes

Create `scripts/audit/profiles/__tests__/region_canonical-score.test.ts`:
- Build a synthetic `computeScore(issues, profile)` helper inline (or pull from a placeholder `scripts/audit/score.ts` if helpful):
  ```ts
  function computeScore(issues: Array<{ rule: string }>, spec: ProfileSpec): number {
    let score = 100;
    for (const issue of issues) {
      const weight = spec.weights.find(w => w.rule === issue.rule);
      if (weight) score -= weight.weight;
    }
    return Math.max(0, score);
  }
  ```
- Test: passing `[{rule:'AUD-009'},{rule:'AUD-031'}]` against `RegionCanonical` returns < 85
- Test: passing `[]` returns 100
- Test: passing `[{rule:'AUD-001'}, {rule:'AUD-002'}, {rule:'AUD-003'}]` (all weight 5+5+8=18) returns 82, which is below pilot cutoff 85 → fails the gate

The `computeScore` logic created here is a placeholder; plan 10 (audit dashboard) builds the canonical scorer. This plan establishes the data shape and proves the math.
  </action>
  <verify>
    <automated>pnpm test --run scripts/audit/profiles/__tests__/</automated>
  </verify>
  <done>All weight-sum + distinctness + scoring tests pass; REGION_CANONICAL with 0 affiliates scores below cutoff (proves the profile distinguishes content quality).</done>
</task>

</tasks>

<verification>
End of plan 07 checks:

1. **FND-05**: `pnpm test scripts/audit/profiles --run` passes; 5 ProfileSpec objects exported with distinct weights, minWordCount, minAffiliates, requiredSchemaTypes.
2. `detectProfile` returns correct ID per Velite collection + isHub/isUtility flags.
3. Synthetic scoring proves REGION_CANONICAL scores below 85 when 0 affiliates present.
4. Profiles ready for plan 10 audit dashboard consumption.
</verification>

<success_criteria>
- 5 ProfileSpec files in `scripts/audit/profiles/`
- Each profile distinct on weights + minWordCount + minAffiliates + requiredSchemaTypes
- `detectProfile` heuristic dispatches correctly
- Synthetic scoring test proves the profile matters (0 affiliates → fail gate)
- Barrel exports from `scripts/audit/profiles/index.ts`
- VALIDATION row FND-05 green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/07-quality-profiles-SUMMARY.md` documenting: 5 profile names, distinctness summary, scoring math placeholder, `detectProfile` heuristic.
</output>
