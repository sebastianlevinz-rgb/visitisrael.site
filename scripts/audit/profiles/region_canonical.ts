/**
 * REGION_CANONICAL — strictest profile.
 *
 * Applied to top-of-funnel region landing pages (Jerusalem canonical,
 * Tel Aviv canonical, Haifa canonical, …). These pages must:
 *   - be ≥ 1500 words (depth signals authority for navigational keywords)
 *   - link to ≥ 5 distinct affiliates (Argentina lesson #2: monetization
 *     diversity prevents single-partner over-dependence)
 *   - emit TouristDestination + BreadcrumbList + FAQPage JSON-LD
 *
 * Cutoff: 85 in pilot (Phase 2), 80 in replicated regions (Phase 3).
 *
 * Weight philosophy: critical-path rules (image rights, FTC disclosure,
 * Lighthouse threshold, hreflang reciprocity, religious-site naming) carry
 * the highest weights. Sum = 100. Rules not listed default to weight 0
 * in the plan-10 scorer.
 */
import type { ProfileSpec } from './types';

export const RegionCanonical: ProfileSpec = {
  id: 'REGION_CANONICAL',
  minWordCount: 1500,
  minAffiliates: 5,
  requiredSchemaTypes: ['TouristDestination', 'BreadcrumbList', 'FAQPage'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    // Argentina-inherited core (AUD-001..016)
    { rule: 'AUD-001', weight: 5, required: true }, // no raw hex (Argentina #1)
    { rule: 'AUD-002', weight: 5, required: true }, // no raw partner URL (Argentina #2)
    { rule: 'AUD-003', weight: 8, required: true }, // documented image in ledger (Argentina #3)
    { rule: 'AUD-004', weight: 5, required: true }, // image width ≥ 1200px
    { rule: 'AUD-005', weight: 3, required: false }, // srcset emits 4 widths
    { rule: 'AUD-006', weight: 3, required: false }, // sub-dest H1 cannibalize
    { rule: 'AUD-007', weight: 2, required: false }, // HE/EN parity ratio
    { rule: 'AUD-008', weight: 5, required: true }, // pre-hydration HTML (RSC)
    { rule: 'AUD-009', weight: 8, required: true }, // FTC disclosure within first viewport
    { rule: 'AUD-012', weight: 5, required: true }, // LCP image not lazy
    { rule: 'AUD-013', weight: 3, required: false }, // third-party blocking
    { rule: 'AUD-014', weight: 2, required: false }, // ≤6 external scripts
    // Israel-specific (AUD-017..034)
    { rule: 'AUD-017', weight: 4, required: true }, // no "Wailing Wall"
    { rule: 'AUD-018', weight: 3, required: true }, // no biased framing
    { rule: 'AUD-019', weight: 3, required: false }, // Temple Mount paired naming
    { rule: 'AUD-026', weight: 5, required: true }, // restricted-site image rights
    { rule: 'AUD-027', weight: 4, required: true }, // lang/dir on <html>
    { rule: 'AUD-028', weight: 3, required: true }, // accessibility-statement footer link
    { rule: 'AUD-029', weight: 2, required: false }, // Hebrew form errors role=alert
    { rule: 'AUD-030', weight: 3, required: true }, // no physical directional utilities
    { rule: 'AUD-031', weight: 2, required: false }, // affiliate helper Israel fixture
    { rule: 'AUD-032', weight: 5, required: true }, // hreflang reciprocity
    { rule: 'AUD-033', weight: 5, required: true }, // canonical + schema + meta + OG + hreflang
    { rule: 'AUD-034', weight: 7, required: true }, // Lighthouse threshold (90/95/95/100)
  ],
} as const;
// Sum check: 5+5+8+5+3+3+2+5+8+5+3+2+4+3+3+5+4+3+2+3+2+5+5+7 = 100
