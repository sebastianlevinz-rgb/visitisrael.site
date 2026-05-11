/**
 * SUB_DESTINATION — second-tier attraction / neighborhood pages.
 *
 * Applied to sub-region or single-attraction pages (Old City, Mahane
 * Yehuda Market, Yad Vashem, …). These pages must:
 *   - be ≥ 800 words (less than canonical, but still deeply researched)
 *   - link to ≥ 1 affiliate (a single relevant booking surface)
 *   - emit TouristAttraction + BreadcrumbList JSON-LD
 *
 * Cutoff: 85 / 80 (same as REGION_CANONICAL — the bar is high, but the
 * surface area is smaller).
 *
 * Weight philosophy: vs REGION_CANONICAL, MORE weight on AUD-006
 * (H1 cannibalization with parent region) and AUD-018 (biased framing,
 * because sub-destinations are where contested-site descriptions live).
 * LESS weight on AUD-009 (single affiliate is fine, not a portfolio).
 * Sum = 100.
 */
import type { ProfileSpec } from './types';

export const SubDestination: ProfileSpec = {
  id: 'SUB_DESTINATION',
  minWordCount: 800,
  minAffiliates: 1,
  requiredSchemaTypes: ['TouristAttraction', 'BreadcrumbList'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    { rule: 'AUD-001', weight: 4, required: true }, // no raw hex
    { rule: 'AUD-002', weight: 4, required: true }, // no raw partner URL
    { rule: 'AUD-003', weight: 7, required: true }, // documented image
    { rule: 'AUD-004', weight: 4, required: true }, // image width ≥ 1200px
    { rule: 'AUD-005', weight: 3, required: false }, // srcset
    // Boosted vs REGION_CANONICAL: sub-dest cannibalization is the #1 SEO
    // failure mode for second-tier pages (Argentina lesson #4).
    { rule: 'AUD-006', weight: 7, required: true }, // sub-dest H1 cannibalize
    { rule: 'AUD-007', weight: 2, required: false }, // HE/EN parity ratio
    { rule: 'AUD-008', weight: 5, required: true }, // pre-hydration HTML
    // Reduced vs REGION_CANONICAL: 1 affiliate suffices, disclosure still required.
    { rule: 'AUD-009', weight: 5, required: true }, // FTC disclosure
    { rule: 'AUD-012', weight: 5, required: true }, // LCP not lazy
    { rule: 'AUD-013', weight: 2, required: false }, // third-party blocking
    { rule: 'AUD-014', weight: 2, required: false }, // ≤6 external scripts
    { rule: 'AUD-017', weight: 4, required: true }, // no "Wailing Wall"
    // Boosted vs REGION_CANONICAL: contested-site framing surfaces at the
    // sub-destination level (Bethlehem, Temple Mount, etc.).
    { rule: 'AUD-018', weight: 5, required: true }, // no biased framing
    { rule: 'AUD-019', weight: 4, required: true }, // Temple Mount paired naming (required here)
    { rule: 'AUD-026', weight: 6, required: true }, // restricted-site image rights
    { rule: 'AUD-027', weight: 4, required: true }, // lang/dir on <html>
    { rule: 'AUD-028', weight: 3, required: true }, // accessibility-statement footer link
    { rule: 'AUD-029', weight: 2, required: false }, // Hebrew form errors role=alert
    { rule: 'AUD-030', weight: 3, required: true }, // no physical directional utils
    { rule: 'AUD-031', weight: 2, required: false }, // affiliate helper Israel fixture
    { rule: 'AUD-032', weight: 5, required: true }, // hreflang reciprocity
    { rule: 'AUD-033', weight: 5, required: true }, // canonical + schema + meta + OG + hreflang
    { rule: 'AUD-034', weight: 7, required: true }, // Lighthouse threshold
  ],
} as const;
// Sum: 4+4+7+4+3+7+2+5+5+5+2+2+4+5+4+6+4+3+2+3+2+5+5+7 = 100
