/**
 * AUD-012 — LCP-candidate image with `loading="lazy"`.
 *
 * Detection: the first `<img>` rendered on the page (heuristic for the
 * LCP element) must NOT carry `loading="lazy"`. RegionHero component
 * sets `priority + fetchpriority="high"` per IMG-04 — this rule catches
 * regressions where a hero or above-the-fold image is wrongly lazy-loaded.
 */
import type { Rule, Issue } from './types';

const rule: Rule = {
  id: 'AUD-012',
  severity: 'major',
  description: 'First-paint (LCP candidate) image marked loading="lazy".',
  scan(_html, $) {
    const issues: Issue[] = [];
    const firstImg = $('img').first();
    if (firstImg.length === 0) return issues;
    if (firstImg.attr('loading') === 'lazy') {
      issues.push({
        rule: 'AUD-012',
        severity: 'major' as const,
        message:
          'First image (LCP candidate) carries loading="lazy". Set priority + fetchPriority="high" for hero images.',
        match: firstImg.attr('src') || '',
      });
    }
    return issues;
  },
};

export default rule;
