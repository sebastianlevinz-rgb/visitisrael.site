/**
 * AUD-016 — Page `lastReviewed` frontmatter > 9 months old.
 *
 * Detection: read `lastReviewed` (ISO date string) from frontmatter; if older
 * than 9 months, flag. Drives editorial review cadence (Argentina lesson #7:
 * stale-content drift). Severity minor — informational nudge, not a blocker.
 */
import type { Rule } from './types';

const NINE_MONTHS_MS = 9 * 30 * 24 * 60 * 60 * 1000;

const rule: Rule = {
  id: 'AUD-016',
  severity: 'minor',
  description: 'Frontmatter lastReviewed > 9 months old.',
  scan(_html, _$, fm) {
    const lastReviewed = fm['lastReviewed'];
    if (typeof lastReviewed !== 'string') return [];
    const ts = Date.parse(lastReviewed);
    if (isNaN(ts)) return [];
    const age = Date.now() - ts;
    if (age > NINE_MONTHS_MS) {
      return [
        {
          rule: 'AUD-016',
          severity: 'minor' as const,
          message: `Page lastReviewed=${lastReviewed} is older than 9 months. Refresh editorial content.`,
        },
      ];
    }
    return [];
  },
};

export default rule;
