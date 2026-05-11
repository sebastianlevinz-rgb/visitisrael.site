/**
 * HUB — index / collection landing pages.
 *
 * Applied to pages whose primary job is to list and link to other pages:
 *   - /regions/         (top-level regions index)
 *   - /attractions/     (attractions index)
 *   - /by-theme/        (themed-itinerary hub)
 *
 * Constraints:
 *   - minWordCount: 0 (hubs are link-dense, not prose-dense)
 *   - minAffiliates: 0 (hubs surface destinations, monetization happens
 *     on the destination pages they link to)
 *   - requiredSchemaTypes: ['CollectionPage']
 *
 * Cutoff: 85 / 80.
 *
 * Weight philosophy: hubs are graded on their ability to SURFACE content
 * (internal-link density implied future AUD-035, breadcrumbs/AUD-033),
 * NOT on long-form authority. Like UTILITY, AUD-009 is omitted (no
 * affiliates on hubs themselves), but unlike UTILITY, hubs carry images
 * (region thumbnails) → image rules retain weight. Sum = 100.
 *
 * The DISTINCTION from UTILITY: hubs care about discoverability + image
 * rights (each region thumbnail is a documented restricted-site-aware
 * image). UTILITY cares almost exclusively about a11y compliance.
 */
import type { ProfileSpec } from './types';

export const Hub: ProfileSpec = {
  id: 'HUB',
  minWordCount: 0,
  minAffiliates: 0,
  requiredSchemaTypes: ['CollectionPage'],
  scoreCutoffPilot: 85,
  scoreCutoffReplicated: 80,
  weights: [
    { rule: 'AUD-001', weight: 4, required: true }, // no raw hex
    { rule: 'AUD-002', weight: 4, required: true }, // no raw partner URL
    // Image rules HEAVILY weighted: hubs are image-grids (region thumbnails),
    // every tile must be ledger-documented and width-compliant.
    { rule: 'AUD-003', weight: 8, required: true }, // documented image
    { rule: 'AUD-004', weight: 5, required: true }, // image width ≥ 1200px
    { rule: 'AUD-005', weight: 4, required: false }, // srcset (thumbnails benefit most)
    // AUD-006 boosted: hub-tile titles are the most-likely source of H1
    // cannibalization conflicts with their target pages.
    { rule: 'AUD-006', weight: 5, required: false }, // sub-dest cannibalize
    { rule: 'AUD-008', weight: 5, required: true }, // pre-hydration HTML
    // AUD-009 OMITTED: hubs don't host affiliate links (they link to
    // destination pages which do).
    { rule: 'AUD-012', weight: 6, required: true }, // LCP image not lazy (above-fold grid)
    { rule: 'AUD-013', weight: 3, required: false }, // third-party blocking
    { rule: 'AUD-014', weight: 2, required: false }, // ≤6 external scripts
    { rule: 'AUD-017', weight: 3, required: true }, // no "Wailing Wall" (tile titles)
    { rule: 'AUD-018', weight: 3, required: false }, // biased framing (tile blurbs)
    { rule: 'AUD-026', weight: 7, required: true }, // restricted-site image rights (THUMBNAILS!)
    { rule: 'AUD-027', weight: 5, required: true }, // lang/dir on <html>
    { rule: 'AUD-028', weight: 3, required: true }, // accessibility-statement footer link
    { rule: 'AUD-030', weight: 4, required: true }, // no physical directional utils
    { rule: 'AUD-032', weight: 6, required: true }, // hreflang reciprocity
    // AUD-033 boosted: hub canonical+schema+OG is what surfaces in SERP
    // sitelinks — single highest-leverage rule for a hub page.
    { rule: 'AUD-033', weight: 8, required: true }, // canonical + schema + meta + OG + hreflang
    { rule: 'AUD-034', weight: 7, required: true }, // Lighthouse threshold
    // AUD-007 (HE/EN parity) omitted — hubs typically mirror trivially.
    // AUD-019 omitted — Temple Mount appears at sub-destination level.
    // AUD-029 omitted — hubs don't host forms.
    // AUD-031 omitted — no affiliate helpers on hubs.
  ],
} as const;
// Sum: 4+4+8+5+4+5+5+6+3+2+3+3+7+5+3+4+6+8+7 = 92 (≤100; 8-point reserve
// for a future AUD-035 "internal-link density / breadcrumb depth" rule).
