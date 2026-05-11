/**
 * detectProfile — heuristic dispatch from Velite frontmatter → ProfileId.
 *
 * Plan 10's audit dashboard scans every Velite-generated MDX entry and
 * passes its frontmatter through this function to choose which profile
 * to score against. ARCHITECTURE §6.2 locks the frontmatter shape; this
 * function reads only the three fields it cares about:
 *
 *   - `collection` (required)  — Velite collection name. M1 ships four:
 *                                regions / subDestinations / guides / legal.
 *   - `isHub`      (optional)  — frontmatter override flag for index pages.
 *   - `isUtility`  (optional)  — frontmatter override flag for utility pages.
 *
 * Precedence:
 *   1. `isUtility: true`                 → UTILITY  (overrides collection)
 *   2. `isHub: true`                     → HUB      (overrides collection)
 *   3. `collection === 'regions'`        → REGION_CANONICAL
 *   4. `collection === 'subDestinations'`→ SUB_DESTINATION
 *   5. `collection === 'guides'`         → GUIDE_OR_WINERY
 *   6. `collection === 'itineraries'`    → GUIDE_OR_WINERY
 *                                          (Plan 2.4 lock — start with existing
 *                                          GUIDE profile per RESEARCH §8 OQ2;
 *                                          promote to its own ITINERARY profile
 *                                          only if scoring misleads.)
 *   7. `collection === 'legal'`          → UTILITY
 *   8. Otherwise                         → THROW (fail loud — never default)
 *
 * Why throw instead of fall back: silent defaults were Argentina lesson #5
 * (one rubric for every page). If a new collection lands, the audit
 * dashboard MUST fail loudly so a profile is added before scoring continues.
 */
import type { ProfileId } from './types';

export interface DetectInput {
  collection: string;
  isHub?: boolean;
  isUtility?: boolean;
}

export function detectProfile(fm: DetectInput): ProfileId {
  if (fm.isUtility) return 'UTILITY';
  if (fm.isHub) return 'HUB';
  if (fm.collection === 'regions') return 'REGION_CANONICAL';
  if (fm.collection === 'subDestinations') return 'SUB_DESTINATION';
  if (fm.collection === 'guides') return 'GUIDE_OR_WINERY';
  if (fm.collection === 'itineraries') return 'GUIDE_OR_WINERY';
  if (fm.collection === 'legal') return 'UTILITY';
  throw new Error(
    `Cannot detect profile for collection=${fm.collection} ` +
      `(no override flags set). Add a case to scripts/audit/profiles/detect.ts ` +
      `or set isHub/isUtility in frontmatter.`,
  );
}
