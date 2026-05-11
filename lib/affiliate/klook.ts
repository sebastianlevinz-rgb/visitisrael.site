/**
 * Klook STUB (Conflict D — SUMMARY.md §3).
 *
 * Klook has thin Israel SKU coverage (<10 tours as of May 2026). Rather
 * than silently rendering broken affiliate links, this helper throws a
 * documented `NoIsraelInventoryError` so call sites surface loudly.
 *
 * Re-evaluate quarterly via `/admin/audit/affiliate-status` (plan 10).
 * Activation criterion: SKU breadth >50 Israel tours OR a tour-ID-gated
 * variant once partner adds inventory.
 */
import { NoIsraelInventoryError } from './types';

export function klookLink(): never {
  throw new NoIsraelInventoryError(
    'klookLink() is stubbed: Klook Israel SKU coverage is thin (<10 tours). ' +
      'Per Conflict D resolution (SUMMARY.md §3), this helper is intentionally non-functional. ' +
      'Re-evaluate quarterly via data/affiliate-status.json. ' +
      'Activation criterion: SKU breadth >50 tours OR a tour-ID-gated helper variant.',
  );
}
