#!/usr/bin/env node
/**
 * flip-affiliate-aid.mjs — placeholder.
 *
 * When an AID arrives (tracked in data/affiliate-status.json):
 *   1. Read partner key from CLI arg (e.g., `node scripts/codemods/flip-affiliate-aid.mjs booking`)
 *   2. Confirm env var is set in .env.local
 *   3. Update data/affiliate-status.json aidReceivedAt = ISO date
 *   4. Update data/affiliate-availability.json state = 'active'
 *
 * Implementation deferred to Phase 6 monitoring (DEP-04 cadence).
 * See data/post-launch-backlog.md for activation procedure.
 *
 * Until then: every helper is already AID-aware. Setting the env var
 * in production (Vercel project settings) automatically flips the
 * generated URL from "public" to "AID-tagged" with zero code change
 * — that's the codemod-ready pattern locked by plan 06.
 */
console.log(
  'TODO: implement in Phase 6 monitoring. See data/post-launch-backlog.md.\n' +
    'Until then: helpers auto-detect AID env vars; no code change needed.',
);
process.exit(0);
