/**
 * AUD-023 — URL with Gregorian year in slug missing canonical to evergreen.
 *
 * Detection: if frontmatter `slug` contains a `19xx` or `20xx` year token,
 * the page should declare a canonical pointing at an evergreen sibling.
 * Heuristic: read `<link rel="canonical">` href and ensure it does NOT
 * contain the year token (i.e. canonical points at evergreen URL).
 */
import type { Rule } from './types';

const YEAR_REGEX = /\b(19|20)\d{2}\b/;

const rule: Rule = {
  id: 'AUD-023',
  severity: 'minor',
  description:
    'Year-in-slug page missing canonical pointing to evergreen sibling.',
  scan(_html, $, fm) {
    const slug = fm['slug'];
    if (typeof slug !== 'string') return [];
    const slugYear = slug.match(YEAR_REGEX);
    if (!slugYear) return [];
    const canonical = $('link[rel="canonical"]').attr('href') || '';
    if (canonical.length === 0) {
      return [
        {
          rule: 'AUD-023',
          severity: 'minor' as const,
          message: `Slug "${slug}" contains year ${slugYear[0]} but no <link rel="canonical">.`,
        },
      ];
    }
    if (YEAR_REGEX.test(canonical)) {
      return [
        {
          rule: 'AUD-023',
          severity: 'minor' as const,
          message: `Slug "${slug}" year-in-URL canonical also contains year — should point to evergreen sibling.`,
          match: canonical,
        },
      ];
    }
    return [];
  },
};

export default rule;
