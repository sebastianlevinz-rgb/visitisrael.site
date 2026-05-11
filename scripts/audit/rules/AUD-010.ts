/**
 * AUD-010 — Affiliate URL weekly health check (4xx/5xx).
 *
 * DEFERRED to Phase 6 (monitoring cron). This rule emits an informational
 * "deferred" entry so the dashboard reports that the rule was attempted
 * but its data source (weekly link-check cron) is not yet running.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-010',
  severity: 'info',
  description: 'Affiliate URL health (4xx/5xx weekly check) — deferred to Phase 6.',
  scan() {
    return [
      {
        rule: 'AUD-010',
        severity: 'info' as const,
        message:
          'Deferred: weekly affiliate-URL health monitor lands in Phase 6 (DEP-04).',
      },
    ];
  },
};

export default rule;
