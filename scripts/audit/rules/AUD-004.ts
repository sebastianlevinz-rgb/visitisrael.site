/**
 * AUD-004 — Image width < 1200px (per the photo-credits ledger schema).
 *
 * Detection: for each ledger entry of an image referenced on the page, check
 * `width` field. The Zod schema in `lib/photo-credits-schema.ts` already
 * enforces `width >= 1200` at build time; this rule emits the same finding
 * to the dashboard so the gate has visibility.
 *
 * Build-time enforcement: `scripts/qa/check-credits.mjs` via lint-staged.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Rule, Issue } from './types';

interface LedgerEntry {
  width?: number;
}

function loadLedger(): Record<string, LedgerEntry> {
  try {
    const raw = readFileSync(
      resolve(process.cwd(), 'data/photo-credits.json'),
      'utf8',
    );
    return JSON.parse(raw) as Record<string, LedgerEntry>;
  } catch {
    return {};
  }
}

const rule: Rule = {
  id: 'AUD-004',
  severity: 'critical',
  description: 'Image width below 1200px (ledger violation).',
  scan(_html, $) {
    const ledger = loadLedger();
    const issues: Issue[] = [];
    $('img[src]').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (!src.startsWith('/images/')) return;
      const entry = ledger[src];
      if (entry && typeof entry.width === 'number' && entry.width < 1200) {
        issues.push({
          rule: 'AUD-004',
          severity: 'critical' as const,
          message: `Image ${src} width=${entry.width}px below the 1200px floor.`,
          match: src,
        });
      }
    });
    return issues;
  },
};

export default rule;
