/**
 * scripts/audit/profiles/types.ts — FND-05 ProfileSpec contract
 *
 * The 5 quality-scoring profiles consumed by the audit dashboard (plan 10)
 * each conform to `ProfileSpec`. Each profile assigns weight + required-flag
 * to the AUD-001..AUD-034 rule set from PITFALLS §6 so the same audit rule
 * produces a DIFFERENT score contribution for a region canonical vs a hub
 * vs a utility page (Argentina lesson #5: uniform scoring → no signal).
 *
 * Contract is locked here so plan 10 can `import { profiles } from ...`
 * without further coordination.
 */

/**
 * 5 profiles cover every page archetype the site will produce in M1–M3:
 *   - REGION_CANONICAL  — top-of-funnel region landing (Jerusalem, Tel Aviv…)
 *   - SUB_DESTINATION   — attraction / neighborhood / sub-region page
 *   - GUIDE_OR_WINERY   — informational article or single LocalBusiness
 *   - UTILITY           — legal / accessibility-statement / privacy etc.
 *   - HUB               — index page listing many destinations
 */
export type ProfileId =
  | 'REGION_CANONICAL'
  | 'SUB_DESTINATION'
  | 'GUIDE_OR_WINERY'
  | 'UTILITY'
  | 'HUB';

/**
 * Per-rule contribution to a profile's 0–100 score.
 *
 * - `rule`     : matches the audit rule ID (AUD-001..AUD-034) defined in
 *                PITFALLS §6. Rules not present in a profile's `weights`
 *                array default to weight 0 in the plan-10 scorer.
 * - `weight`   : score points deducted when this rule fires. The sum of all
 *                `weight` values in a profile MUST be ≤ 100 so the worst
 *                possible score is 0, never negative.
 * - `required` : when true, the rule firing not only deducts `weight` but
 *                also fails the hard quality gate regardless of total score.
 *                Plan 10 will surface required-rule failures as blockers in
 *                the audit dashboard separately from the numeric score.
 */
export interface RuleWeight {
  rule: string;
  weight: number;
  required: boolean;
}

/**
 * Full profile contract.
 *
 * - `minWordCount`           : `0` means not enforced (utility/hub).
 * - `minAffiliates`          : `0` means not enforced (utility/hub).
 * - `requiredSchemaTypes`    : schema-dts type names that MUST appear in
 *                              the rendered JSON-LD for this profile.
 *                              Plan 10's schema scanner reads this list.
 * - `scoreCutoffPilot`       : threshold for the pilot region (Jerusalem,
 *                              Phase 2). Default 85.
 * - `scoreCutoffReplicated`  : threshold for replicated regions
 *                              (Phase 3). Default 80.
 */
export interface ProfileSpec {
  readonly id: ProfileId;
  readonly minWordCount: number;
  readonly minAffiliates: number;
  readonly requiredSchemaTypes: readonly string[];
  readonly weights: readonly RuleWeight[];
  readonly scoreCutoffPilot: number;
  readonly scoreCutoffReplicated: number;
}
