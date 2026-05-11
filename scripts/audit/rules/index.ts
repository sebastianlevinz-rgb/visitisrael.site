/**
 * Barrel — 34 audit rules (AUD-001..AUD-034) in source-id order.
 *
 * Plan 10 orchestrator imports `rules` and iterates per page. The barrel
 * also re-exports types so consumers have a single import surface:
 *
 *   import { rules, type Rule, type Issue } from './rules';
 */
import AUD_001 from './AUD-001';
import AUD_002 from './AUD-002';
import AUD_003 from './AUD-003';
import AUD_004 from './AUD-004';
import AUD_005 from './AUD-005';
import AUD_006 from './AUD-006';
import AUD_007 from './AUD-007';
import AUD_008 from './AUD-008';
import AUD_009 from './AUD-009';
import AUD_010 from './AUD-010';
import AUD_011 from './AUD-011';
import AUD_012 from './AUD-012';
import AUD_013 from './AUD-013';
import AUD_014 from './AUD-014';
import AUD_015 from './AUD-015';
import AUD_016 from './AUD-016';
import AUD_017 from './AUD-017';
import AUD_018 from './AUD-018';
import AUD_019 from './AUD-019';
import AUD_020 from './AUD-020';
import AUD_021 from './AUD-021';
import AUD_022 from './AUD-022';
import AUD_023 from './AUD-023';
import AUD_024 from './AUD-024';
import AUD_025 from './AUD-025';
import AUD_026 from './AUD-026';
import AUD_027 from './AUD-027';
import AUD_028 from './AUD-028';
import AUD_029 from './AUD-029';
import AUD_030 from './AUD-030';
import AUD_031 from './AUD-031';
import AUD_032 from './AUD-032';
import AUD_033 from './AUD-033';
import AUD_034 from './AUD-034';

import type { Rule } from './types';

export const rules: readonly Rule[] = [
  AUD_001,
  AUD_002,
  AUD_003,
  AUD_004,
  AUD_005,
  AUD_006,
  AUD_007,
  AUD_008,
  AUD_009,
  AUD_010,
  AUD_011,
  AUD_012,
  AUD_013,
  AUD_014,
  AUD_015,
  AUD_016,
  AUD_017,
  AUD_018,
  AUD_019,
  AUD_020,
  AUD_021,
  AUD_022,
  AUD_023,
  AUD_024,
  AUD_025,
  AUD_026,
  AUD_027,
  AUD_028,
  AUD_029,
  AUD_030,
  AUD_031,
  AUD_032,
  AUD_033,
  AUD_034,
] as const;

/** Rule IDs flagged as deferred — return a single info-severity entry from scan(). */
export const DEFERRED_RULES: ReadonlySet<string> = new Set([
  'AUD-010',
  'AUD-011',
  'AUD-013', // deferred ONLY when data/lighthouse-results.json absent
  'AUD-034', // deferred ONLY when data/lighthouse-results.json absent
]);

export type { Rule, Issue, Severity } from './types';
