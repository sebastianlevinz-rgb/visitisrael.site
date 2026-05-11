/**
 * AUD-013 — Third-party blocking time >250ms.
 *
 * Consumes `data/lighthouse-results.json` (plan 11 populates). In Phase 1
 * the file may not exist — rule emits an informational deferred entry so
 * the dashboard records that the rule attempted but had no data.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Rule } from './types';

interface LighthouseEntry {
  thirdPartyBlockingMs?: number;
  slug?: string;
  lang?: 'he' | 'en';
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
  id: 'AUD-013',
  severity: 'major',
  description: 'Third-party blocking time exceeds 250ms (Lighthouse-dependent).',
  scan(_html, _$, fm, lang) {
    const lhci = loadLighthouse();
    if (lhci.length === 0) {
      return [
        {
          rule: 'AUD-013',
          severity: 'info' as const,
          message:
            'Deferred: data/lighthouse-results.json absent. Run plan 11 lhci first.',
        },
      ];
    }
    const slug = (fm['slug'] as string) || '';
    const entry = lhci.find((e) => e.slug === slug && e.lang === lang);
    if (!entry || typeof entry.thirdPartyBlockingMs !== 'number') return [];
    if (entry.thirdPartyBlockingMs > 250) {
      return [
        {
          rule: 'AUD-013',
          severity: 'major' as const,
          message: `Third-party blocking time ${entry.thirdPartyBlockingMs}ms exceeds 250ms threshold.`,
        },
      ];
    }
    return [];
  },
};

export default rule;
