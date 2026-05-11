/**
 * AUD-027 — `<html>` missing `lang` and/or `dir` attribute.
 *
 * Detection: every page must declare both. HE pages: `lang="he" dir="rtl"`;
 * EN pages: `lang="en" dir="ltr"`. The locale layout sets these per route
 * (plan 01 + 05). Rule fires when the rendered HTML payload lacks one.
 *
 * Critical: this is the WCAG 3.1.1 + IS-5568 §3.1 contract for screen
 * readers to choose the correct voice + bidi engine.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-027',
  severity: 'critical',
  description: '<html> missing lang and/or dir attribute.',
  scan(html, $, _fm, lang) {
    const $html = $('html');
    const issues = [];
    const langAttr = $html.attr('lang');
    const dirAttr = $html.attr('dir');
    if (!langAttr) {
      issues.push({
        rule: 'AUD-027',
        severity: 'critical' as const,
        message: '<html> missing `lang` attribute (WCAG 3.1.1 + IS-5568 §3.1).',
      });
    } else if (lang === 'he' && !langAttr.startsWith('he')) {
      issues.push({
        rule: 'AUD-027',
        severity: 'critical' as const,
        message: `Hebrew page declares lang="${langAttr}" — expected lang="he".`,
      });
    } else if (lang === 'en' && !langAttr.startsWith('en')) {
      issues.push({
        rule: 'AUD-027',
        severity: 'critical' as const,
        message: `English page declares lang="${langAttr}" — expected lang="en".`,
      });
    }
    if (!dirAttr) {
      issues.push({
        rule: 'AUD-027',
        severity: 'critical' as const,
        message: '<html> missing `dir` attribute (RTL/LTR engine selector).',
      });
    } else if (lang === 'he' && dirAttr !== 'rtl') {
      issues.push({
        rule: 'AUD-027',
        severity: 'critical' as const,
        message: `Hebrew page declares dir="${dirAttr}" — expected dir="rtl".`,
      });
    } else if (lang === 'en' && dirAttr !== 'ltr') {
      issues.push({
        rule: 'AUD-027',
        severity: 'critical' as const,
        message: `English page declares dir="${dirAttr}" — expected dir="ltr".`,
      });
    }
    // Avoid unused-html-arg lint when only used for hint
    void html;
    return issues;
  },
};

export default rule;
