/**
 * AUD-034 — Lighthouse mobile 3-run-median below profile threshold.
 *
 * Consumes `data/lighthouse-results.json` (plan 11 populates). In Phase 1
 * the file may not exist — rule emits an informational deferred entry.
 * Plan 11 wires the real check.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Rule } from './types';

interface LighthouseEntry {
  slug?: string;
  lang?: 'he' | 'en';
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
}

function loadLighthouse(): LighthouseEntry[] {
  const path = resolve(process.cwd(), 'data/lighthouse-results.json');
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as LighthouseEntry[];
  } catch {
    return [];
  }
}

const rule: Rule = {
  id: 'AUD-034',
  severity: 'major',
  description:
    'Lighthouse mobile 3-run-median below profile threshold (90/95/95/100).',
  scan(_html, _$, fm, lang) {
    const lhci = loadLighthouse();
    if (lhci.length === 0) {
      return [
        {
          rule: 'AUD-034',
          severity: 'info' as const,
          message:
            'Deferred: data/lighthouse-results.json absent. Plan 11 lhci populates this.',
        },
      ];
    }
    const slug = (fm['slug'] as string) || '';
    const entry = lhci.find((e) => e.slug === slug && e.lang === lang);
    if (!entry) return [];
    const issues = [];
    if (typeof entry.performance === 'number' && entry.performance < 0.9) {
      issues.push({
        rule: 'AUD-034',
        severity: 'major' as const,
        message: `Lighthouse perf=${entry.performance} below 0.90 threshold.`,
      });
    }
    if (typeof entry.accessibility === 'number' && entry.accessibility < 0.95) {
      issues.push({
        rule: 'AUD-034',
        severity: 'major' as const,
        message: `Lighthouse a11y=${entry.accessibility} below 0.95 threshold.`,
      });
    }
    if (typeof entry.bestPractices === 'number' && entry.bestPractices < 0.95) {
      issues.push({
        rule: 'AUD-034',
        severity: 'major' as const,
        message: `Lighthouse best-practices=${entry.bestPractices} below 0.95 threshold.`,
      });
    }
    if (typeof entry.seo === 'number' && entry.seo < 1) {
      issues.push({
        rule: 'AUD-034',
        severity: 'major' as const,
        message: `Lighthouse SEO=${entry.seo} below 1.00 threshold.`,
      });
    }
    return issues;
  },
};

export default rule;
