/**
 * AUD-024 — Hebrew page title containing Latin chars outside a `<bdo dir="ltr">`
 * wrapper.
 *
 * Detection: when `lang === 'he'`, scan `<title>` for runs of Latin characters
 * that are NOT inside a `<bdo dir="ltr">` element. Bidi-isolated runs are
 * legitimate (brand names, dates, prices); unisolated Latin runs cause
 * RTL rendering artifacts.
 */
import type { Rule } from './types';

const LATIN_RUN = /[A-Za-z]{2,}/;

const rule: Rule = {
  id: 'AUD-024',
  severity: 'major',
  description:
    'Hebrew page title with Latin chars not wrapped in <bdo dir="ltr">.',
  scan(_html, $, _fm, lang) {
    if (lang !== 'he') return [];
    const titleHtml = $('title').html() || '';
    // Strip bdo[dir="ltr"]…</bdo> spans before checking for Latin runs.
    const stripped = titleHtml.replace(
      /<bdo\s+dir="ltr">[\s\S]*?<\/bdo>/gi,
      '',
    );
    if (LATIN_RUN.test(stripped)) {
      return [
        {
          rule: 'AUD-024',
          severity: 'major' as const,
          message:
            'Hebrew page <title> contains Latin chars not wrapped in <bdo dir="ltr"> — bidi rendering artifact.',
          match: titleHtml,
        },
      ];
    }
    return [];
  },
};

export default rule;
