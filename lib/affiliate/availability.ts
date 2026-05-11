/**
 * Affiliate availability state — single source of truth.
 *
 * Reads `data/affiliate-availability.json` at module-load, validates the
 * shape via Zod (throws at startup if drifted), and exposes a typed
 * lookup. AffiliateCard consults this to decide whether to render
 * (`'absent'` → null fallback) per Conflict D resolution.
 */
import { z } from 'zod';
import availability from '../../data/affiliate-availability.json';

export type State = 'pending' | 'applied' | 'active' | 'sparse' | 'absent';

const StateZ = z.enum(['pending', 'applied', 'active', 'sparse', 'absent']);

const Entry = z.object({
  state: StateZ,
  regions: z.array(z.string()),
  notes: z.string(),
});

const Availability = z.record(z.string(), Entry);

// Parse at module load — throws loudly if the JSON file ever drifts from the
// Zod shape (e.g., a missing partner or an unknown state value). This is the
// AFF-07 / AUD-031 contract: the data file is the source of truth, and
// running the test suite (or even importing this module) re-validates it.
const parsed = Availability.parse(availability);

export function affiliateAvailability(partner: string): State {
  return parsed[partner]?.state ?? 'absent';
}

export function allPartners(): readonly string[] {
  return Object.keys(parsed);
}
