/**
 * AUD-009 — FTC affiliate disclosure DOM-precedence rule.
 *
 * Detection: when a page contains any link with `data-aff-disclosed="true"`
 * (i.e. an AffiliateCard-rendered link), the page MUST also contain an
 * AffiliateDisclosure element (carrying `data-component="affiliate-disclosure"`)
 * that appears BEFORE the first affiliate link in source order. This is the
 * FTC DOM-precedence requirement — the disclosure must be visible without
 * scrolling past the link.
 *
 * Approximation of "within first viewport-height" = appears earlier in the
 * source order than the first affiliate link. Plan 11 (Lighthouse) adds the
 * real viewport-height visual check.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-009',
  severity: 'critical',
  description:
    'Affiliate disclosure must DOM-precede the first affiliate link (FTC AFF-06).',
  scan(html, $) {
    // Find first affiliate link.
    const firstAff = $('a[data-aff-disclosed="true"]').first();
    if (firstAff.length === 0) return []; // no affiliate links → rule N/A

    const firstDisclosure = $('[data-component="affiliate-disclosure"]').first();
    if (firstDisclosure.length === 0) {
      return [
        {
          rule: 'AUD-009',
          severity: 'critical' as const,
          message:
            'Page has affiliate links but no <AffiliateDisclosure> in DOM. FTC AFF-06 violation.',
        },
      ];
    }

    // Compare source positions: find each element's index in html string.
    const linkHref = firstAff.attr('href') || '';
    const linkIdx = html.indexOf(`href="${linkHref}"`);
    // Disclosure is harder to locate by attr — search for the literal attribute string.
    const disclosureIdx = html.indexOf('data-component="affiliate-disclosure"');
    if (disclosureIdx === -1 || linkIdx === -1) return []; // can't determine; skip
    if (disclosureIdx > linkIdx) {
      return [
        {
          rule: 'AUD-009',
          severity: 'critical' as const,
          message:
            'Affiliate disclosure appears AFTER the first affiliate link in DOM order. Move disclosure before link.',
        },
      ];
    }
    return [];
  },
};

export default rule;
