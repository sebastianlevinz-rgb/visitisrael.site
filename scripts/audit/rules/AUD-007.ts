/**
 * AUD-007 — HE/EN word-count parity outside [0.85, 1.40] ratio.
 *
 * Detection: rule reads frontmatter `wordCount` (set by Velite at build
 * time) for the current page and compares to its sibling translation
 * (read from frontmatter `siblingWordCount`). If outside the ratio window,
 * flag. If sibling data unavailable, no-op (rule cannot fire without it).
 */
import type { Rule } from './types';

const MIN_RATIO = 0.85;
const MAX_RATIO = 1.4;

const rule: Rule = {
  id: 'AUD-007',
  severity: 'major',
  description: 'HE/EN word-count ratio outside the [0.85, 1.40] parity window.',
  scan(_html, _$, fm) {
    const wc = fm['wordCount'];
    const sibling = fm['siblingWordCount'];
    if (typeof wc !== 'number' || typeof sibling !== 'number') return [];
    if (wc === 0 || sibling === 0) return [];
    const ratio = wc / sibling;
    if (ratio < MIN_RATIO || ratio > MAX_RATIO) {
      return [
        {
          rule: 'AUD-007',
          severity: 'major' as const,
          message: `HE/EN word-count parity violated: ratio=${ratio.toFixed(2)} (need 0.85–1.40). Current: ${wc} vs sibling: ${sibling}.`,
        },
      ];
    }
    return [];
  },
};

export default rule;
