/**
 * GUIDE_OR_WINERY — informational articles + single-LocalBusiness pages.
 *
 * Applied to "best of" guides, themed itineraries, and single-winery /
 * single-restaurant deep-dives. These pages must:
 *   - be ≥ 600 words (shortest content profile; quality over quantity)
 *   - link to ≥ 1 affiliate
 *   - emit Article + LocalBusiness JSON-LD
 *
 * Note on Article schema: schema-dts v2 ships the type; plan 04 didn't
 * build an `Article` generator (only TouristDestination/Place/etc.).
 * Plan 10's audit dashboard will report a `requiredSchemaTypes` miss
 * when GUIDE_OR_WINERY pages first land — that drives the Phase 3 task
 * to add the Article generator to lib/schema/.
 *
 * Cutoff: 85 / 80.
 *
 * Weight philosophy: vs SUB_DESTINATION, MORE weight on content quality
 * (AUD-007 HE/EN parity, AUD-018 biased framing) because guides are
 * editorial-voice pages where bias creeps in. LESS weight on AUD-006
 * cannibalization (guides aren't competing with their parent region for
 * the same keyword set). LESS on affiliate density (a single relevant
 * link beats five tangential ones). Sum = 100.
 */
import type { ProfileSpec } from './types';

export const GuideOrWinery: ProfileSpec = {
  id: 'GUIDE_OR_WINERY',
  minWordCount: 600,
  minAffiliates: 1,
  requiredSchemaTypes: ['Article', 'LocalBusiness'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    { rule: 'AUD-001', weight: 4, required: true }, // no raw hex
    { rule: 'AUD-002', weight: 4, required: true }, // no raw partner URL
    { rule: 'AUD-003', weight: 6, required: true }, // documented image
    { rule: 'AUD-004', weight: 4, required: true }, // image width ≥ 1200px
    { rule: 'AUD-005', weight: 2, required: false }, // srcset
    { rule: 'AUD-006', weight: 2, required: false }, // sub-dest cannibalize (low — guides aren't dest pages)
    // Boosted vs REGION/SUB: guides are where HE/EN parity breaks down because
    // editorial voice doesn't translate 1:1 — explicit weight enforces parity.
    { rule: 'AUD-007', weight: 4, required: false }, // HE/EN parity ratio
    { rule: 'AUD-008', weight: 5, required: true }, // pre-hydration HTML
    // Reduced vs REGION: single affiliate is fine; disclosure still required.
    { rule: 'AUD-009', weight: 5, required: true }, // FTC disclosure
    { rule: 'AUD-012', weight: 4, required: true }, // LCP not lazy
    { rule: 'AUD-013', weight: 2, required: false }, // third-party blocking
    { rule: 'AUD-014', weight: 2, required: false }, // ≤6 external scripts
    { rule: 'AUD-017', weight: 4, required: true }, // no "Wailing Wall"
    // Boosted vs REGION: editorial guides have the highest bias risk.
    { rule: 'AUD-018', weight: 6, required: true }, // no biased framing
    { rule: 'AUD-019', weight: 3, required: false }, // Temple Mount paired naming
    { rule: 'AUD-026', weight: 6, required: true }, // restricted-site image rights
    { rule: 'AUD-027', weight: 4, required: true }, // lang/dir on <html>
    { rule: 'AUD-028', weight: 3, required: true }, // accessibility-statement footer link
    { rule: 'AUD-029', weight: 2, required: false }, // Hebrew form errors role=alert
    { rule: 'AUD-030', weight: 3, required: true }, // no physical directional utils
    { rule: 'AUD-031', weight: 2, required: false }, // affiliate helper Israel fixture
    { rule: 'AUD-032', weight: 5, required: true }, // hreflang reciprocity
    { rule: 'AUD-033', weight: 6, required: true }, // canonical + schema + meta + OG + hreflang
    { rule: 'AUD-034', weight: 7, required: true }, // Lighthouse threshold
  ],
} as const;
// Sum: 4+4+6+4+2+2+4+5+5+4+2+2+4+6+3+6+4+3+2+3+2+5+6+7 = 95 (≤100; 5 points
// reserved for future GUIDE-specific rules around editorial-voice signals).
