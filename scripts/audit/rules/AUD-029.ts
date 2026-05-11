/**
 * AUD-029 — Hebrew form `<input required>` without Hebrew `role="alert"` sibling.
 *
 * Detection: when `lang === 'he'`, every `<input required>` (or with `aria-required="true"`)
 * must be paired with a sibling element carrying `role="alert"` so screen
 * readers can announce validation errors in Hebrew.
 */
import type { Rule, Issue } from './types';

const rule: Rule = {
  id: 'AUD-029',
  severity: 'major',
  description:
    'Hebrew form input[required] without sibling role="alert" for error announce.',
  scan(_html, $, _fm, lang) {
    if (lang !== 'he') return [];
    const issues: Issue[] = [];
    $('input[required], input[aria-required="true"]').each((_, el) => {
      const $input = $(el);
      const $parent = $input.parent();
      const hasAlert = $parent.find('[role="alert"]').length > 0;
      if (!hasAlert) {
        issues.push({
          rule: 'AUD-029',
          severity: 'major' as const,
          message: `Hebrew form input[name="${$input.attr('name') || ''}"] missing sibling role="alert" for validation.`,
          match: $input.attr('name') || '',
        });
      }
    });
    return issues;
  },
};

export default rule;
