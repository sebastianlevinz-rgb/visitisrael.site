/**
 * Photo credits accessor — IMG-01.
 *
 * `getCredit(src)` looks up an entry in `data/photo-credits.json` and THROWS
 * if the entry is missing. The error message names the offending src and
 * instructs the developer to add it to the ledger. The CI gate
 * (`pnpm qa:credits` — see `scripts/qa/check-credits.mjs`) catches this at
 * commit/push time, but `getCredit` throwing at runtime is the secondary
 * defence for content paths that escape static analysis.
 */
import ledger from '../data/photo-credits.json' with { type: 'json' };
import type { CreditEntry, Ledger } from './photo-credits-schema';

const LEDGER: Ledger = ledger as Ledger;

export function getCredit(src: string): CreditEntry {
  const entry = LEDGER[src];
  if (!entry) {
    throw new Error(
      `Missing photo-credits entry for "${src}". ` +
        `Add it to data/photo-credits.json (see lib/photo-credits-schema.ts for shape). ` +
        `pnpm qa:credits will fail on next run if this image is referenced anywhere.`,
    );
  }
  return entry;
}

/**
 * Returns the whole ledger (for tools/audit only; components must use
 * `getCredit` so the throw-on-missing contract is enforced).
 */
export function allCredits(): Ledger {
  return LEDGER;
}
