/**
 * AUD-015 — `<iframe>` (partner widget) without explicit width/height or
 * `aspect-ratio` style.
 *
 * Detection: iframes without dimensions cause layout shift (CLS regression).
 * Either width+height attrs OR an inline `aspect-ratio` style is required.
 */
import type { Rule, Issue } from './types';

const rule: Rule = {
  id: 'AUD-015',
  severity: 'major',
  description:
    '<iframe> without explicit width/height or aspect-ratio (causes CLS).',
  scan(_html, $) {
    const issues: Issue[] = [];
    $('iframe').each((_, el) => {
      const $el = $(el);
      const w = $el.attr('width');
      const h = $el.attr('height');
      const style = $el.attr('style') || '';
      const className = $el.attr('class') || '';
      const hasDims = (w && h) || /aspect-ratio/.test(style) || /aspect-/.test(className);
      if (!hasDims) {
        issues.push({
          rule: 'AUD-015',
          severity: 'major' as const,
          message: `<iframe src="${$el.attr('src') || '(none)'}" missing width/height/aspect-ratio — CLS risk.`,
          match: $el.attr('src') || '',
        });
      }
    });
    return issues;
  },
};

export default rule;
