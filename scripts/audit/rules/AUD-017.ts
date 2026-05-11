/**
 * AUD-017 — "Wailing Wall" must not appear. Use "Western Wall" / "Kotel".
 *
 * Consumes `lib/seo/naming.ts` WAILING_WALL_REGEX (single source of truth).
 */
import { WAILING_WALL_REGEX } from '../../../lib/seo/naming';
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-017',
  severity: 'major',
  description: 'Banned phrasing "Wailing Wall" — use "Western Wall" / "Kotel".',
  scan(html) {
    const m = WAILING_WALL_REGEX.exec(html);
    if (m === null) return [];
    return [
      {
        rule: 'AUD-017',
        severity: 'major' as const,
        message: 'Found "Wailing Wall" — use "Western Wall" (or paired with "Kotel").',
        match: m[0],
      },
    ];
  },
};

export default rule;
