/**
 * AUD-032 — Hreflang reciprocity: every emitted hreflang locale MUST have
 * a registered route. FR specifically must NEVER appear in hreflang despite
 * `content/fr/` being filesystem-ready.
 *
 * Detection: parse `<link rel="alternate" hreflang>` tags; assert every
 * hreflang value is in the registered locale set (he, en) + `x-default`.
 */
import { locales } from '../../../i18n-config';
import type { Rule, Issue } from './types';

const ALLOWED_HREFLANG: ReadonlySet<string> = new Set([...locales, 'x-default']);

const rule: Rule = {
  id: 'AUD-032',
  severity: 'major',
  description:
    'Hreflang references locale not in registered set (he/en/x-default).',
  scan(_html, $) {
    const issues: Issue[] = [];
    $('link[rel="alternate"][hreflang]').each((_, el) => {
      const lang = $(el).attr('hreflang') || '';
      if (!ALLOWED_HREFLANG.has(lang)) {
        issues.push({
          rule: 'AUD-032',
          severity: 'major' as const,
          message: `Hreflang "${lang}" emitted but not in registered locales (he, en, x-default).`,
          match: lang,
        });
      }
    });
    return issues;
  },
};

export default rule;
