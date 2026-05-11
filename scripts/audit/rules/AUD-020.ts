/**
 * AUD-020 — Bethlehem / Hebron / Jericho pages missing
 * `administrativeStatus` frontmatter.
 *
 * Consumes `lib/seo/naming.ts` requiresAdministrativeStatus (single source).
 */
import { requiresAdministrativeStatus } from '../../../lib/seo/naming';
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-020',
  severity: 'major',
  description:
    'Bethlehem / Hebron / Jericho page missing administrativeStatus frontmatter.',
  scan(_html, _$, fm) {
    const slug = fm['slug'];
    if (typeof slug !== 'string') return [];
    if (!requiresAdministrativeStatus(slug)) return [];
    const status = fm['administrativeStatus'];
    if (typeof status !== 'string' || status.length === 0) {
      return [
        {
          rule: 'AUD-020',
          severity: 'major' as const,
          message: `Page slug=${slug} requires administrativeStatus frontmatter (e.g. "west-bank-paa").`,
          match: slug,
        },
      ];
    }
    return [];
  },
};

export default rule;
