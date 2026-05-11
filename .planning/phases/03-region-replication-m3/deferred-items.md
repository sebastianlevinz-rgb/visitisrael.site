# Phase 3 Wave 3 — Deferred Items

Out-of-scope discoveries surfaced by parallel-state qa:credits cross-region cascade.
Per execute-plan scope boundary: not fixed by the discovering agent.

## Wave 3 (Caesarea agent)

**1. Negev ledger entry license enum value:** `data/photo-credits.json` entry
`/images/regions/negev/desert.jpg` has `license: "CC-BY-SA-2.0"` which is NOT in
the Zod License enum (`CC0` | `CC-BY-2.0` | `CC-BY-3.0` | `CC-BY-4.0` |
`CC-BY-SA-3.0` | `CC-BY-SA-4.0` | `PD` | `IGPO-CC` | `OWN` | `UNSPLASH` | `PEXELS`).
Wikimedia's CC-BY-SA-2.0 is a real Creative Commons license but the project
schema only accepts CC-BY-SA-3.0+. Likely typo — should be `CC-BY-SA-3.0`.

- **Owner:** Phase 3 Wave 3 plan 05 Negev agent
- **Impact:** Cascades `qa:credits` to UI as "ORPHANED" for ALL entries
  (Zod parse failure → ledger replaced with `{}` → every disk image appears
  orphaned). Soft-gate region-gate.mjs is unaffected (reads
  `data/audit-results.json`, not photo-credits.json).
- **Caesarea sub-impact:** Caesarea's 8 ledger entries are valid by the
  plan-specific check (`r.length===8; all r.width>=1200`). Caesarea soft-gate
  unaffected. The shared `qa:credits` invariant is the only failure.
- **Fix:** Single character edit on the Negev entry. ~5 sec for the Negev agent
  in their own commit scope.

## Wave 3 (Negev HE TransportInfo blocker — Nazareth observation)

**3. Negev HE canonical `<TransportInfo partner="skyscanner" />` malformed:**
The Negev plan-05 HE canonical `content/he/regions/negev.mdx` invokes
`<TransportInfo partner="skyscanner" />` — but the `TransportInfo` component
contract requires `airport: { code: string; name: string }` and
`transportOptions: ReadonlyArray<TransportOption>` props (see
`components/travel/TransportInfo.tsx` interface `TransportInfoProps`).
The malformed invocation causes Next.js prerender to throw
`TypeError: Cannot read properties of undefined (reading 'code')` on
`/he/negev`, which **halts the entire `pnpm build`**.

- **Owner:** Phase 3 Wave 3 plan 05 Negev agent
- **Impact:** Phase 3 Wave 3 build completely blocked. ALL regions' Task 4
  (`pnpm qa:audit` + `pnpm qa:region-gate <region>`) cannot run because
  `data/audit-results.json` cannot be regenerated without a successful
  build. Nazareth's own MDX content compiles cleanly via Velite and
  `pnpm test --run tests/content/nazareth-region.test.ts` is 66/66 green.
- **Recommended fix:** Either (a) remove the partner-only `<TransportInfo>`
  call in Negev HE canonical (it's redundant — the EN canonical's
  TransportInfo provides the schema), or (b) provide the full
  `airport={{ code: 'TLV', name: 'שדה התעופה הבינלאומי בן גוריון' }}` +
  `transportOptions={[...]}` props as the Galilee + Tel Aviv canonicals do.
- **Scope:** Out of Nazareth plan-06 scope per scope-boundary policy;
  belongs to Negev plan-05 agent. Nazareth Task 4 soft gate is deferred
  pending Negev fix — Nazareth content audit cannot complete until the
  Phase 3 Wave 3 build is unblocked.

## Wave 3 (Nazareth agent — same observation as Caesarea)

The Nazareth (plan 06) agent observed the same Negev `CC-BY-SA-2.0` license-enum
failure described above. Nazareth's own 8 ledger entries (4 region images + 4
sub-destination images) are all valid CC-BY-SA-3.0 / CC-BY-4.0 / IGPO-CC and
pass the Zod schema when parsed in isolation. The Nazareth agent did NOT fix
the Negev entry — that fix belongs to the Negev plan 05 agent's own scope.

## Wave 2 (carryover — not addressed by Wave 3 agents)

These were noted in Wave 2 but should be tracked here for completeness:

**2. Orphan disk images for regions without complete ledger entries** —
multiple `/images/sub-destinations/*/` and `/images/regions/*/` files on disk
without corresponding entries in `data/photo-credits.json`. Likely from prior
parallel-agent staging. Each agent's own region ledger is intact; this is
cross-region orphan accumulation. Address in Phase 6 monitoring sweep.

## Wave 4 (Golan agent observation)

**4. Akko (plan 10) sub-dest + region images on disk without ledger entries:**
Parallel Wave 4 Akko agent placed 9 image files on disk
(`public/images/regions/akko/{hero,old-city,hospitaller,bahai-mansion}.jpg` +
`public/images/sub-destinations/akko/{old-city,hospitaller-knights,templar-tunnel,khan-al-umdan,bahai-mansion}.jpg`)
before adding the corresponding entries to `data/photo-credits.json`. This
fails the cross-agent `pnpm qa:credits` global check during my Wave 4 staging
window.

- **Owner:** Phase 3 Wave 4 plan 10 Akko agent
- **Impact:** My own 10 Golan ledger entries are individually valid (verified
  per-entry: width >= 1200, valid sourceUrl, license in Zod enum). The cross-
  region `qa:credits` failure is purely the Akko orphan accumulation; my
  Golan content is unaffected.
- **Caesarea / Wave 3 precedent:** Wave 3 agents shipped through identical
  parallel-state orphans (Wave 2 image-without-ledger from Galilee, etc.)
  and proved the soft-gate region-gate.mjs reads `data/audit-results.json`
  (not photo-credits.json), so my Golan soft-gate is unaffected.
- **Fix:** Akko agent's own Task 1 commit will resolve once they append
  their 9 ledger entries. Per the Wave 2 lesson, this self-resolves within
  the wave's atomic-merge window.
