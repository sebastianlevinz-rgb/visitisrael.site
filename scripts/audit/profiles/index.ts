/**
 * scripts/audit/profiles/index.ts — barrel export.
 *
 * Plan 10 (audit dashboard) imports everything from this single surface:
 *
 *   import { profiles, detectProfile, type ProfileSpec } from
 *     '@/scripts/audit/profiles';
 *
 * The `profiles` record is keyed by ProfileId so plan 10 can do:
 *
 *   const profile = profiles[detectProfile(frontmatter)];
 *
 * `as const` widening is intentional — the record literal types are
 * preserved so plan 10's scorer gets precise weight typing per profile.
 */

import { RegionCanonical } from './region_canonical';
import { SubDestination } from './sub_destination';
import { GuideOrWinery } from './guide_or_winery';
import { Utility } from './utility';
import { Hub } from './hub';
import type { ProfileSpec, ProfileId } from './types';

export const profiles: Record<ProfileId, ProfileSpec> = {
  REGION_CANONICAL: RegionCanonical,
  SUB_DESTINATION: SubDestination,
  GUIDE_OR_WINERY: GuideOrWinery,
  UTILITY: Utility,
  HUB: Hub,
} as const;

export { RegionCanonical } from './region_canonical';
export { SubDestination } from './sub_destination';
export { GuideOrWinery } from './guide_or_winery';
export { Utility } from './utility';
export { Hub } from './hub';
export { detectProfile, type DetectInput } from './detect';
export type { ProfileSpec, ProfileId, RuleWeight } from './types';
