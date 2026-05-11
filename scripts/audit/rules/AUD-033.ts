/**
 * AUD-033 — Page missing one of: canonical link, JSON-LD schema, meta
 * description, OG tags, hreflang.
 *
 * Detection: SEO-essential 5-tuple presence. Each missing element produces
 * a separate issue so the dashboard surfaces all gaps in one scan.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-033',
  severity: 'major',
  description:
    'Page missing canonical, JSON-LD schema, meta description, OG tags, or hreflang.',
  scan(_html, $) {
    const issues = [];
    if ($('link[rel="canonical"]').length === 0) {
      issues.push({
        rule: 'AUD-033',
        severity: 'major' as const,
        message: 'Missing <link rel="canonical">.',
      });
    }
    if ($('script[type="application/ld+json"]').length === 0) {
      issues.push({
        rule: 'AUD-033',
        severity: 'major' as const,
        message: 'Missing JSON-LD schema (<script type="application/ld+json">).',
      });
    }
    if ($('meta[name="description"]').length === 0) {
      issues.push({
        rule: 'AUD-033',
        severity: 'major' as const,
        message: 'Missing <meta name="description">.',
      });
    }
    if ($('meta[property^="og:"]').length === 0) {
      issues.push({
        rule: 'AUD-033',
        severity: 'major' as const,
        message: 'Missing OpenGraph meta tags (<meta property="og:*">).',
      });
    }
    if ($('link[rel="alternate"][hreflang]').length === 0) {
      issues.push({
        rule: 'AUD-033',
        severity: 'major' as const,
        message: 'Missing hreflang alternates (<link rel="alternate" hreflang>).',
      });
    }
    return issues;
  },
};

export default rule;
