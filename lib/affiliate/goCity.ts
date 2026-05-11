/**
 * GoCity STUB (Conflict D — SUMMARY.md §3).
 *
 * GoCity has no Israel destination as of May 2026. Helper throws a
 * documented `NoIsraelInventoryError` so call sites surface loudly
 * rather than silently rendering broken affiliate links.
 *
 * Re-evaluate quarterly via `/admin/audit/affiliate-status` (plan 10).
 * Activation criterion: GoCity launches an Israel city pass.
 */
import { NoIsraelInventoryError } from './types';

export function goCityLink(): never {
  throw new NoIsraelInventoryError(
    'goCityLink() is stubbed: GoCity has no Israel destination as of May 2026. ' +
      'Per Conflict D resolution (SUMMARY.md §3), this helper is intentionally non-functional. ' +
      'Re-evaluate quarterly via data/affiliate-status.json. ' +
      'Activation criterion: GoCity launches Israel city pass.',
  );
}
