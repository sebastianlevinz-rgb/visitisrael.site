/**
 * AUD-030 — className using physical CSS direction utilities
 * (ml-, pr-, pl-, mr-, left-, right-, text-left, text-right, border-l/r).
 *
 * Detection: scan all className values in the rendered HTML for physical
 * Tailwind utilities. Logical equivalents (ms-, me-, ps-, pe-, start-, end-,
 * text-start, text-end, border-s, border-e) are required per
 * hebrew-tailwind-preset + I18N-03.
 *
 * Note: lint (RULE 4 in eslint.config.js) is primary enforcement at commit
 * time. This rule emits findings to the dashboard for visibility.
 */
import type { Rule } from './types';

const PHYSICAL_UTIL = /\bclass(?:Name)?="[^"]*(?:\bml-\d|\bmr-\d|\bpl-\d|\bpr-\d|\bleft-\d|\bright-\d|\btext-left\b|\btext-right\b|\bborder-l\b|\bborder-r\b|\brounded-l\b|\brounded-r\b)[^"]*"/;

const rule: Rule = {
  id: 'AUD-030',
  severity: 'major',
  description: 'Physical Tailwind directional utility in className.',
  scan(html) {
    const m = PHYSICAL_UTIL.exec(html);
    if (m === null) return [];
    return [
      {
        rule: 'AUD-030',
        severity: 'major' as const,
        message:
          'Physical directional utility in className. Use logical equivalent (ms-/me-/ps-/pe-/start-/end-/text-start/end/border-s/e).',
        match: m[0],
      },
    ];
  },
};

export default rule;
