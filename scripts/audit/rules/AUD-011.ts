/**
 * AUD-011 — Geo-tracked conversion-rate anomaly detection.
 *
 * DEFERRED to Phase 6 (monitoring infrastructure). Rule shell present;
 * dashboard shows "rule attempted, data not yet available".
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-011',
  severity: 'info',
  description:
    'Geo-tracked conversion-rate anomaly — deferred to Phase 6 monitoring.',
  scan() {
    return [
      {
        rule: 'AUD-011',
        severity: 'info' as const,
        message:
          'Deferred: geo-tracked conversion-rate anomaly detection lands in Phase 6 monitoring.',
      },
    ];
  },
};

export default rule;
