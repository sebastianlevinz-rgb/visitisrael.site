/**
 * AUD-018 — Biased framing detection ("Judea and Samaria" or
 * "occupied territories"). Use neutral "West Bank".
 *
 * Consumes `lib/seo/naming.ts` BIASED_FRAMING_REGEX (single source of truth).
 */
import { BIASED_FRAMING_REGEX } from '../../../lib/seo/naming';
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-018',
  severity: 'major',
  description: 'Biased framing — "Judea and Samaria" / "occupied territories".',
  scan(html) {
    const m = BIASED_FRAMING_REGEX.exec(html);
    if (m === null) return [];
    return [
      {
        rule: 'AUD-018',
        severity: 'major' as const,
        message:
          'Biased framing detected. Use neutral "West Bank" — avoid "Judea and Samaria" / "occupied territories".',
        match: m[0],
      },
    ];
  },
};

export default rule;
