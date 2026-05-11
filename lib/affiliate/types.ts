/**
 * Shared affiliate types.
 *
 * `NoIsraelInventoryError` is thrown by stub helpers (klookLink, goCityLink)
 * per Conflict D resolution (SUMMARY.md §3): Klook + GoCity have thin / no
 * Israel inventory; their helpers are intentionally non-functional so call
 * sites surface loudly rather than silently rendering broken affiliate links.
 *
 * Catch sites (e.g., `<AffiliateCard>`) translate the error into a soft
 * fallback UI (return null, render unavailable notice).
 */
export class NoIsraelInventoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoIsraelInventoryError';
  }
}
