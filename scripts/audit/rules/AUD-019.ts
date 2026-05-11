/**
 * AUD-019 — "Temple Mount" first reference must be paired with
 * "Haram al-Sharif" within a 300-character pairing window.
 *
 * Consumes `lib/seo/naming.ts` detectTempleMountPaired (single source of truth).
 */
import { detectTempleMountPaired } from '../../../lib/seo/naming';
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-019',
  severity: 'minor',
  description:
    '"Temple Mount" first reference unpaired with "Haram al-Sharif".',
  scan(html) {
    if (detectTempleMountPaired(html)) return [];
    return [
      {
        rule: 'AUD-019',
        severity: 'minor' as const,
        message:
          '"Temple Mount" used without pairing with "Haram al-Sharif" within 300 chars (PITFALLS §3.1).',
        match: 'Temple Mount',
      },
    ];
  },
};

export default rule;
