/**
 * scripts/audit/score.ts — per-page 0-100 score computation.
 *
 * Reads ProfileSpec from plan 07 + issues from plan 10's rule executor.
 * Each issue subtracts its profile-specific weight from a starting 100;
 * floor at 0 (never negative).
 *
 * Absent rules: profiles intentionally omit rules they don't apply to
 * (e.g. UTILITY omits AUD-009) — those issues contribute 0 to deduction.
 */
import type { ProfileSpec } from './profiles/types';
import type { Issue } from './rules/types';

export function computeScore(issues: Issue[], spec: ProfileSpec): number {
  let score = 100;
  for (const issue of issues) {
    // Skip info-severity entries (deferred-rule markers) — they don't deduct.
    if (issue.severity === 'info') continue;
    const w = spec.weights.find((entry) => entry.rule === issue.rule);
    if (w === undefined) continue; // rule not weighted on this profile
    score -= w.weight;
  }
  return Math.max(0, score);
}

/** Returns the issues whose rules are flagged `required: true` on the profile. */
export function blockingIssues(issues: Issue[], spec: ProfileSpec): Issue[] {
  return issues.filter((iss) => {
    const w = spec.weights.find((entry) => entry.rule === iss.rule);
    return w !== undefined && w.required && iss.severity !== 'info';
  });
}
