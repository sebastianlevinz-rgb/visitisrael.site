/**
 * AUD-006 — Sub-destination H1 contains the parent region keyword without
 * an entity qualifier (Argentina lesson #4: Mendoza canonical out-ranked
 * by Mendoza-Wineries because the sub-page H1 was indistinguishable from
 * the canonical's H1).
 *
 * Detection: when frontmatter `collection === 'subDestinations'` and a
 * `parentRegion` field is present, require the H1 to contain a qualifying
 * noun phrase (anything beyond the bare region name). Heuristic: H1 must
 * contain at least one word OTHER than the parent-region tokens.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-006',
  severity: 'major',
  description:
    'Sub-destination H1 contains region head-keyword without an entity qualifier.',
  scan(_html, $, fm) {
    if (fm['collection'] !== 'subDestinations') return [];
    const parentRegion = fm['parentRegion'];
    if (typeof parentRegion !== 'string' || parentRegion.length === 0) return [];

    const h1Text = $('h1').first().text().trim();
    if (h1Text.length === 0) return [];

    // Tokenize the parent region (e.g. "Tel Aviv" → ["tel","aviv"]).
    const regionTokens = parentRegion
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    const h1Tokens = h1Text
      .toLowerCase()
      .split(/[\s\-—]+/)
      .filter(Boolean);

    // If H1 contains the region tokens but no other content tokens, fire.
    const hasRegion = regionTokens.every((t) => h1Tokens.includes(t));
    const extra = h1Tokens.filter((t) => !regionTokens.includes(t));
    if (hasRegion && extra.length === 0) {
      return [
        {
          rule: 'AUD-006',
          severity: 'major' as const,
          message: `Sub-destination H1 "${h1Text}" is indistinguishable from parent region "${parentRegion}". Add an entity qualifier.`,
          match: h1Text,
        },
      ];
    }
    return [];
  },
};

export default rule;
