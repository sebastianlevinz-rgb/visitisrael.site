/**
 * AUD-005 — `<img>` without srcset attribute.
 *
 * Detection: every `<img>` (NOT next/image — which always emits srcset
 * from its `sizes`) must carry a `srcset`. `next/image` rendered output
 * always has `srcset` in production builds, so this rule effectively fires
 * only on raw `<img>` tags that bypassed the component layer.
 */
import type { Rule, Issue } from './types';

const rule: Rule = {
  id: 'AUD-005',
  severity: 'major',
  description: '<img> tag missing srcset attribute (use next/image).',
  scan(_html, $) {
    const issues: Issue[] = [];
    $('img').each((_, el) => {
      const srcset = $(el).attr('srcset');
      const src = $(el).attr('src') || '';
      if (!srcset) {
        issues.push({
          rule: 'AUD-005',
          severity: 'major' as const,
          message: `Image ${src || '(unknown src)'} lacks srcset — use next/image or emit explicit widths.`,
          match: src,
        });
      }
    });
    return issues;
  },
};

export default rule;
