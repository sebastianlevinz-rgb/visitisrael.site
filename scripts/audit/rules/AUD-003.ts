/**
 * AUD-003 — Image (<img> or next/image rendered) without entry in
 * `data/photo-credits.json`.
 *
 * Detection: every `<img src="/images/...">` in built HTML must map to a
 * key in the photo-credits ledger. This rule mirrors `scripts/qa/check-credits.mjs`
 * but emits findings to the audit dashboard rather than failing the build —
 * the build-time gate is the primary enforcement; this is the visibility surface.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Rule, Issue } from './types';

function loadLedger(): Record<string, unknown> {
  try {
    const raw = readFileSync(
      resolve(process.cwd(), 'data/photo-credits.json'),
      'utf8',
    );
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

const rule: Rule = {
  id: 'AUD-003',
  severity: 'critical',
  description: 'Image rendered without entry in data/photo-credits.json.',
  scan(_html, $) {
    const ledger = loadLedger();
    const issues: Issue[] = [];
    $('img[src]').each((_, el) => {
      const src = $(el).attr('src') || '';
      // Only check ledger-eligible /images/ paths — external URLs + next/image
      // optimized URLs are out of scope.
      if (!src.startsWith('/images/')) return;
      if (!(src in ledger)) {
        issues.push({
          rule: 'AUD-003',
          severity: 'critical' as const,
          message: `Image ${src} not found in data/photo-credits.json ledger.`,
          match: src,
        });
      }
    });
    return issues;
  },
};

export default rule;
