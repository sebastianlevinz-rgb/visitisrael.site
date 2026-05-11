/**
 * AUD-031 — Affiliate helper unit-test missing Israel-destination fixture.
 *
 * Detection: read `lib/affiliate/__tests__/*.test.ts` files; each MUST contain
 * at least one reference to Israel/Jerusalem/Tel Aviv/Haifa so the helper
 * is proven against the actual target market (not a generic e.g. Paris
 * placeholder).
 *
 * This rule is run once per audit (not per page) — emitted only on the
 * "homepage" pseudo-page so it appears in the dashboard summary.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Rule } from './types';

const ISRAEL_TOKENS = /(israel|jerusalem|tel\s*aviv|haifa|eilat|nazareth)/i;

const rule: Rule = {
  id: 'AUD-031',
  severity: 'major',
  description:
    'Affiliate helper unit-test missing Israel-destination fixture.',
  scan(_html, _$, fm) {
    // Run this rule only on the homepage to avoid spamming the dashboard.
    const slug = (fm['slug'] as string) || '';
    if (slug !== '' && slug !== 'index' && slug !== 'page') return [];

    const dir = resolve(process.cwd(), 'lib/affiliate/__tests__');
    if (!existsSync(dir)) return [];
    const issues = [];
    let files: string[] = [];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith('.test.ts'));
    } catch {
      return [];
    }
    // Skip data-contract tests that don't exercise a specific partner helper.
    const HELPER_TEST_ONLY = (f: string): boolean => !/affiliate-status/.test(f);
    for (const f of files.filter(HELPER_TEST_ONLY)) {
      const path = resolve(dir, f);
      try {
        const content = readFileSync(path, 'utf8');
        if (!ISRAEL_TOKENS.test(content)) {
          issues.push({
            rule: 'AUD-031',
            severity: 'major' as const,
            message: `lib/affiliate/__tests__/${f} has no Israel-destination fixture (Jerusalem/Tel Aviv/Haifa/Israel).`,
            match: f,
          });
        }
      } catch {
        // unreadable — skip
      }
    }
    return issues;
  },
};

export default rule;
