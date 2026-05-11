/**
 * AUD-028 — Footer missing accessibility-statement link.
 *
 * Detection: every page MUST link to the locale-appropriate
 * `/accessibility-statement` (HE) or `/en/accessibility-statement` (EN)
 * URL — typically in the footer. Uses `accessibilityStatementHref()` from
 * `lib/seo/accessibility-link.ts` as the single source of truth so any drift
 * between footer rendering + audit scanner is impossible.
 *
 * IS-5568 mandate: accessibility statement reachable from every page.
 */
import { accessibilityStatementHref } from '../../../lib/seo/accessibility-link';
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-028',
  severity: 'critical',
  description: 'Footer missing link to accessibility-statement (IS-5568 mandate).',
  scan(_html, $, _fm, lang) {
    const expected = accessibilityStatementHref(lang);
    // Search all anchors — footer is conventional but rule is href-presence based.
    const found = $(`a[href="${expected}"]`).length > 0;
    if (!found) {
      return [
        {
          rule: 'AUD-028',
          severity: 'critical' as const,
          message: `Page missing link to ${expected} (IS-5568 footer link mandate).`,
          match: expected,
        },
      ];
    }
    return [];
  },
};

export default rule;
