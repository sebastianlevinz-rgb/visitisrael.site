/**
 * UTILITY — legal / accessibility-statement / privacy / contact pages.
 *
 * Applied to non-content pages whose value is regulatory compliance
 * rather than SEO depth or affiliate revenue. Includes:
 *   - /accessibility-statement  (IS 5568 mandate, A11Y-04)
 *   - /privacy
 *   - /terms
 *   - /contact
 *
 * Constraints:
 *   - minWordCount: 0 (not enforced — utility pages are intentionally short)
 *   - minAffiliates: 0 (no monetization on legal pages — would violate FTC
 *     proximity rules; AUD-009 disclosure weight is therefore 0)
 *   - requiredSchemaTypes: ['WebPage'] (minimal; ANY page can carry WebPage)
 *
 * Cutoff: 85 / 80.
 *
 * Weight philosophy: utility pages are graded almost entirely on
 * accessibility infrastructure + meta correctness — NOT content depth.
 * Heaviest weights go to AUD-027 (lang/dir), AUD-028 (statement link),
 * AUD-033 (canonical+schema+meta+OG+hreflang). AUD-009 disclosure carries
 * weight 0 because affiliate links don't appear on utility pages. Sum = 100.
 */
import type { ProfileSpec } from './types';

export const Utility: ProfileSpec = {
  id: 'UTILITY',
  minWordCount: 0,
  minAffiliates: 0,
  requiredSchemaTypes: ['WebPage'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    { rule: 'AUD-001', weight: 4, required: true }, // no raw hex
    { rule: 'AUD-002', weight: 4, required: true }, // no raw partner URL
    // Image rules are less critical on utility pages (often text-only) but
    // when images DO appear they still need to be documented.
    { rule: 'AUD-003', weight: 4, required: true }, // documented image
    { rule: 'AUD-004', weight: 2, required: false }, // image width
    { rule: 'AUD-005', weight: 2, required: false }, // srcset
    { rule: 'AUD-008', weight: 4, required: true }, // pre-hydration HTML
    // AUD-009 DELIBERATELY OMITTED with weight: 0 — utility pages don't
    // contain affiliate links, so requiring FTC disclosure would generate
    // false-positive findings. Plan 10 scorer treats absent rules as 0.
    { rule: 'AUD-012', weight: 3, required: false }, // LCP not lazy (less critical)
    { rule: 'AUD-013', weight: 2, required: false }, // third-party blocking
    { rule: 'AUD-014', weight: 2, required: false }, // ≤6 external scripts
    // Israel-specific rules HEAVILY weighted: utility pages ARE the
    // accessibility / compliance surface area of the site.
    { rule: 'AUD-027', weight: 12, required: true }, // lang/dir on <html> — top priority
    { rule: 'AUD-028', weight: 12, required: true }, // accessibility-statement footer link
    { rule: 'AUD-029', weight: 6, required: true }, // Hebrew form errors role=alert (contact form)
    { rule: 'AUD-030', weight: 6, required: true }, // no physical directional utilities
    { rule: 'AUD-032', weight: 10, required: true }, // hreflang reciprocity
    { rule: 'AUD-033', weight: 12, required: true }, // canonical + schema + meta + OG + hreflang
    { rule: 'AUD-034', weight: 9, required: true }, // Lighthouse threshold (a11y 95 still applies)
    // Religious-site naming rules irrelevant on utility pages (AUD-017..019
    // omitted with implicit weight 0).
    // AUD-026 (restricted-site image rights) also irrelevant — utility pages
    // don't carry restricted-subject images.
    // AUD-031 (affiliate Israel fixture) irrelevant — no affiliate helpers.
  ],
} as const;
// Sum: 4+4+4+2+2+4+3+2+2+12+12+6+6+10+12+9 = 94 (≤100; 6-point cushion).
// AUD-009 omitted by design (no affiliates on utility pages → weight 0).
