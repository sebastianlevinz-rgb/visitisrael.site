/**
 * AUD-002 — Partner domain href without affiliate helper wrapper.
 *
 * Detection: find every `<a href>` pointing at a known partner domain. Flag
 * if the anchor does NOT carry `data-aff-disclosed="true"` (set by
 * `<AffiliateCard>` and downstream helpers). Helper-wrapped links are
 * tagged at render time so this attribute is the reliable distinguisher
 * between intentional affiliate links and raw hardcoded partner URLs.
 */
import type { Rule, Issue } from './types';

const PARTNER_DOMAINS = [
  'booking.com',
  'civitatis.com',
  'getyourguide.com',
  'viator.com',
  'rentalcars.com',
  'safetywing.com',
  'skyscanner.', // matches skyscanner.com / .net / locale subdomains
  'hostelworld.com',
  'klook.com',
  'gocity.com',
  'discovercars.com',
];

const rule: Rule = {
  id: 'AUD-002',
  severity: 'critical',
  description: 'Partner-domain href without affiliate helper wrapper.',
  scan(_html, $) {
    const issues: Issue[] = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      const disclosed = $(el).attr('data-aff-disclosed');
      const isPartner = PARTNER_DOMAINS.some((d) => href.includes(d));
      if (isPartner && disclosed !== 'true') {
        issues.push({
          rule: 'AUD-002',
          severity: 'critical' as const,
          message:
            'Raw partner URL without lib/affiliate helper. Wrap with the helper so disclosure + UTM + AID flow consistently.',
          match: href,
        });
      }
    });
    return issues;
  },
};

export default rule;
