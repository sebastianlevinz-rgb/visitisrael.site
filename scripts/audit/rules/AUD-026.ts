/**
 * AUD-026 — Image of restricted religious site without
 * `restrictedSiteAcknowledgment` ledger field.
 *
 * Detection: for each image rendered on the page, look up its ledger entry
 * in `data/photo-credits.json`. If the entry's `subjectType` is in the
 * RESTRICTED set AND `restrictedSiteAcknowledgment` is missing, flag.
 *
 * This mirrors the Zod superRefine in `lib/photo-credits-schema.ts` — the
 * build-time gate is primary enforcement; this rule emits the same finding
 * to the dashboard for visibility.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Rule, Issue } from './types';

interface LedgerEntry {
  subjectType?: string;
  restrictedSiteAcknowledgment?: string;
}

const RESTRICTED_SUBJECTS = new Set([
  'westernWall',
  'holySepulchre',
  'domeOfTheRock',
  'bahaiGardens',
]);

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
  id: 'AUD-026',
  severity: 'critical',
  description:
    'Restricted-site image without restrictedSiteAcknowledgment in ledger.',
  scan(_html, $) {
    const ledger = loadLedger();
    const issues: Issue[] = [];
    $('img[src]').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (!src.startsWith('/images/')) return;
      const entry = ledger[src];
      if (!entry || typeof entry.subjectType !== 'string') return;
      if (!RESTRICTED_SUBJECTS.has(entry.subjectType)) return;
      if (
        !entry.restrictedSiteAcknowledgment ||
        entry.restrictedSiteAcknowledgment.length === 0
      ) {
        issues.push({
          rule: 'AUD-026',
          severity: 'critical' as const,
          message: `Image ${src} of restricted site (subjectType=${entry.subjectType}) missing restrictedSiteAcknowledgment.`,
          match: src,
        });
      }
    });
    return issues;
  },
};

export default rule;
