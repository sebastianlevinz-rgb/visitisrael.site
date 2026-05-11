/**
 * AUD-025 — Ktiv chaser variant detected against ktiv-maleh dictionary.
 *
 * Phase 1 ships a small starter dictionary (4 entries). Phase 2+ expands as
 * editorial patterns surface. Severity minor — informational normalization
 * nudge for Hebrew copy.
 *
 * Ktiv chaser (no matres lectionis) vs ktiv maleh (with mlmlm) — Hebrew
 * spelling convention. Modern Israeli usage prefers ktiv maleh (with vowels).
 */
import type { Rule } from './types';

const KTIV_CHASER_TO_MALEH: Record<string, string> = {
  אבן: 'אבן', // placeholder identity (single source); real entries below
  גדלות: 'גדולות', // chaser → maleh
  קטנם: 'קטנם', // identity placeholder
  ילדם: 'ילדים', // chaser → maleh (chaser drops yud)
};

const rule: Rule = {
  id: 'AUD-025',
  severity: 'minor',
  description: 'Ktiv chaser variant detected — prefer ktiv maleh for modern Hebrew.',
  scan(_html, $, _fm, lang) {
    if (lang !== 'he') return [];
    const bodyText = $('body').text();
    const issues = [];
    for (const [chaser, maleh] of Object.entries(KTIV_CHASER_TO_MALEH)) {
      if (chaser === maleh) continue;
      const re = new RegExp(`\\b${chaser}\\b`, 'g');
      if (re.test(bodyText)) {
        issues.push({
          rule: 'AUD-025',
          severity: 'minor' as const,
          message: `Hebrew ktiv chaser "${chaser}" detected — prefer ktiv maleh "${maleh}".`,
          match: chaser,
        });
      }
    }
    return issues;
  },
};

export default rule;
