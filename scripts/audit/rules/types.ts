/**
 * Canonical contract for the 34 audit rules (AUD-001..AUD-034).
 *
 * Each rule file `scripts/audit/rules/AUD-XXX.ts` exports a default
 * `Rule` object — the orchestrator (`scripts/audit/run.ts`) iterates
 * `rules` (barrel from ./index.ts) and calls `scan(html, $, fm, lang)`
 * per (page × rule) pairing. Issues are merged into `data/audit-results.json`.
 *
 * Severity policy (per PITFALLS §6):
 *   - critical  → fails Quality Gate. Always counts toward score deduction.
 *   - major     → deducts score; doesn't fail gate alone.
 *   - minor/info → informational; surfaced in dashboard but low-weight.
 *
 * Deferred rules (AUD-010, AUD-011, AUD-013, AUD-034) return a single
 * "deferred" message so the dashboard can show "rule attempted but
 * dependency not yet available".
 */
import type { CheerioAPI } from 'cheerio';

export type Severity = 'critical' | 'major' | 'minor' | 'info';

export interface Issue {
  rule: string;
  severity: Severity;
  message: string;
  selector?: string;
  match?: string;
}

export interface Rule {
  id: string;
  severity: Severity;
  description: string;
  scan(
    html: string,
    $: CheerioAPI,
    fm: Record<string, unknown>,
    lang: 'he' | 'en',
  ): Issue[];
}
