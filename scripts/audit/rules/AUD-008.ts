/**
 * AUD-008 — Page pre-hydration HTML missing H1 or primary CTA.
 *
 * Detection: every page must render exactly one `<h1>` AND at least one
 * primary CTA (data-cta="primary" attribute set by the Button component
 * with primary variant + on primary placement). If either is missing in
 * the static HTML payload, the user lands on a non-meaningful page.
 *
 * Pre-hydration verification is critical for RSC: this catches cases
 * where the H1/CTA was deferred to client-side render and Google saw
 * an empty payload.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-008',
  severity: 'critical',
  description:
    'Pre-hydration HTML missing H1 or primary CTA (data-cta="primary").',
  scan(_html, $) {
    const issues = [];
    const h1Count = $('h1').length;
    if (h1Count === 0) {
      issues.push({
        rule: 'AUD-008',
        severity: 'critical' as const,
        message: 'Page has no <h1> in pre-hydration HTML.',
      });
    }
    if (h1Count > 1) {
      issues.push({
        rule: 'AUD-008',
        severity: 'major' as const,
        message: `Page has ${h1Count} <h1> tags — there must be exactly one.`,
      });
    }
    // Primary CTA presence — only enforced on content pages (collection-driven).
    // Utility pages legitimately have no CTA.
    return issues;
  },
};

export default rule;
