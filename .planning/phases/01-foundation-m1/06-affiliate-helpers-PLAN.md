---
phase: 01-foundation-m1
plan: 06
type: execute
wave: 4
depends_on:
  - 01-scaffold
  - 05-component-lib
files_modified:
  - lib/affiliate/index.ts
  - lib/affiliate/types.ts
  - lib/affiliate/availability.ts
  - lib/affiliate/booking.ts
  - lib/affiliate/civitatis.ts
  - lib/affiliate/viator.ts
  - lib/affiliate/getYourGuide.ts
  - lib/affiliate/rentalcars.ts
  - lib/affiliate/safetyWing.ts
  - lib/affiliate/skyscanner.ts
  - lib/affiliate/hostelworld.ts
  - lib/affiliate/discoverCars.ts
  - lib/affiliate/klook.ts
  - lib/affiliate/goCity.ts
  - lib/affiliate/__tests__/booking.test.ts
  - lib/affiliate/__tests__/civitatis.test.ts
  - lib/affiliate/__tests__/viator.test.ts
  - lib/affiliate/__tests__/getYourGuide.test.ts
  - lib/affiliate/__tests__/rentalcars.test.ts
  - lib/affiliate/__tests__/safetyWing.test.ts
  - lib/affiliate/__tests__/skyscanner.test.ts
  - lib/affiliate/__tests__/hostelworld.test.ts
  - lib/affiliate/__tests__/discoverCars.test.ts
  - lib/affiliate/__tests__/klook.test.ts
  - lib/affiliate/__tests__/goCity.test.ts
  - lib/affiliate/__tests__/affiliate-status.test.ts
  - data/affiliate-availability.json
  - data/affiliate-status.json
  - .env.example
  - scripts/codemods/flip-affiliate-aid.mjs
  - components/travel/AffiliateCard.tsx
  - tests/eslint-fixtures/raw-partner-url.tsx
  - tests/eslint-fixtures/affiliate-helper-allowed.ts
  - tests/eslint-fixtures/affiliate-fixtures.test.ts
autonomous: true
requirements:
  - AFF-01
  - AFF-02
  - AFF-03
  - AFF-04
  - AFF-06
  - AFF-07
  - AFF-08
must_haves:
  truths:
    - "9 real affiliate helpers exported from `lib/affiliate/index.ts`: booking, civitatis, viator, getYourGuide, rentalcars, safetyWing, skyscanner, hostelworld, discoverCars"
    - "2 stub helpers exist: klookLink and goCityLink — each throws `NoIsraelInventoryError` with documented message (Conflict D)"
    - "Each real helper has ≥4 Vitest tests (AID-tagged URL ok, graceful degrade without AID, URL-encodes input, Zod rejects invalid input) — 36 tests minimum"
    - "Each stub has 4 Vitest tests (throws on call, throws specific error type, error message documented, intent recorded) — 8 stub tests"
    - "Total ≥44 helper tests + ≥4 stub tests = ≥48 tests pass (AFF-03)"
    - "`data/affiliate-availability.json` lists all 11 partners with state ∈ {pending, applied, active, sparse, absent}; klook+goCity = absent"
    - "`data/affiliate-status.json` lists all 11 partners with {aidReceivedAt, appliedAt, lastReviewedAt} schema"
    - "Travelpayouts fallback marker present in `.env.example` (AFF-08)"
    - "`tests/eslint-fixtures/raw-partner-url.tsx` (outside `lib/affiliate/**`) lints NON-ZERO (AFF-04)"
    - "Same content inside `lib/affiliate/booking.ts` lints zero (escape hatch works)"
    - "`<AffiliateCard>` wires partner helpers (no more `#TODO-PLAN-06`); `<AffiliateDisclosure>` DOM-precedes the affiliate `<a>` (AFF-06)"
  artifacts:
    - path: "lib/affiliate/booking.ts"
      provides: "bookingLink({destination, checkin?, checkout?, label?}) → URL string"
      contains: "NEXT_PUBLIC_BOOKING_AID"
    - path: "lib/affiliate/klook.ts"
      provides: "klookLink() throws NoIsraelInventoryError"
      contains: "NoIsraelInventoryError"
    - path: "data/affiliate-availability.json"
      provides: "11-partner state table"
      contains: "absent"
    - path: "data/affiliate-status.json"
      provides: "11-partner AID receipt tracker"
      contains: "lastReviewedAt"
    - path: "components/travel/AffiliateCard.tsx"
      provides: "Wired AffiliateCard consuming partner helpers + rendering AffiliateDisclosure"
      contains: "bookingLink"
  key_links:
    - from: "components/travel/AffiliateCard.tsx"
      to: "lib/affiliate/index.ts (9 real helpers + 2 stubs)"
      via: "switch on `partner` prop calls correct helper"
      pattern: "switch\\s*\\(\\s*partner"
    - from: "lib/affiliate/*.ts"
      to: "process.env.NEXT_PUBLIC_*"
      via: "AID env var read"
      pattern: "process\\.env\\.NEXT_PUBLIC_"
    - from: "components/travel/AffiliateCard.tsx"
      to: "components/travel/AffiliateDisclosure.tsx"
      via: "DOM-precedes the link (AFF-06)"
      pattern: "AffiliateDisclosure"
---

<objective>
Build 9 real affiliate helpers (Booking, Civitatis, Viator, GetYourGuide, Rentalcars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars) + 2 stub helpers (Klook, GoCity) per Conflict D resolution, each with ≥4 Vitest tests. Ship `data/affiliate-availability.json` + `data/affiliate-status.json`, scaffold the Travelpayouts aggregator (AFF-08), verify the ESLint `no-restricted-syntax` partner-URL rule fires outside `lib/affiliate/**` but NOT inside (escape hatch), and wire `<AffiliateCard>` to dispatch by `partner` prop with `<AffiliateDisclosure>` DOM-preceding the affiliate `<a>` (AFF-06).

Purpose: Argentina lesson #2 (one affiliate dominated at 92%, another at 18%) is fixed by mandating helper-first integration. ESLint blocks raw partner URLs site-wide. Klook + GoCity are explicit stubs (Conflict D resolution — SUMMARY §3) rather than silently absent — gives Phase 2 content authors a clean signal.

Output: A tested, lintable affiliate infrastructure with 48+ passing tests, JSON state files initialized, AffiliateCard wired, and ESLint fixtures proving the escape hatch works both ways.
</objective>

<execution_context>
@C:/Users/admin/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/admin/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-foundation-m1/01-CONTEXT.md
@.planning/phases/01-foundation-m1/01-RESEARCH.md
@.planning/phases/01-foundation-m1/01-VALIDATION.md
@.planning/phases/01-foundation-m1/01-scaffold-SUMMARY.md
@.planning/phases/01-foundation-m1/05-component-lib-SUMMARY.md
@.planning/research/STACK.md
@.planning/research/PITFALLS.md
@.agents/skills/affiliate-marketing/SKILL.md
@.agents/skills/affiliate-page-generator/SKILL.md

<conflict_resolutions>
Conflict D (affiliate helpers) — LOCKED:
- 9 verified-operational helpers ARE real: Booking, Civitatis, Viator, GetYourGuide, Rentalcars, SafetyWing, Skyscanner, Hostelworld, DiscoverCars
- 2 stubs throw `NoIsraelInventoryError` with documented message: Klook (thin Israel SKU), GoCity (no Israel destination as of May 2026)
- Placeholder env vars in `.env.example` for stubs (so codemod path is uniform when activation comes)
- `data/affiliate-availability.json` marks Klook+GoCity as `'absent'`; quarterly review documented

Source: SUMMARY.md §3 Conflict D.
</conflict_resolutions>

<interfaces>
This plan publishes (consumed by `<AffiliateCard>` and Phase 2):

```ts
// lib/affiliate/index.ts (barrel)
export { bookingLink, type BookingLinkOpts } from './booking';
export { civitatisLink, type CivitatisLinkOpts } from './civitatis';
// ... etc for 9 real helpers
export { klookLink } from './klook';       // throws NoIsraelInventoryError
export { goCityLink } from './goCity';      // throws NoIsraelInventoryError
export { NoIsraelInventoryError } from './types';
export { affiliateAvailability, type State } from './availability';

// Each helper signature:
// type Helper<Opts> = (opts: Opts) => string;  // returns AID-tagged URL or public URL
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Build 9 real affiliate helpers with Zod input validation + 4 tests each (36 tests)</name>
  <files>lib/affiliate/types.ts, lib/affiliate/booking.ts, lib/affiliate/civitatis.ts, lib/affiliate/viator.ts, lib/affiliate/getYourGuide.ts, lib/affiliate/rentalcars.ts, lib/affiliate/safetyWing.ts, lib/affiliate/skyscanner.ts, lib/affiliate/hostelworld.ts, lib/affiliate/discoverCars.ts, lib/affiliate/__tests__/booking.test.ts, lib/affiliate/__tests__/civitatis.test.ts, lib/affiliate/__tests__/viator.test.ts, lib/affiliate/__tests__/getYourGuide.test.ts, lib/affiliate/__tests__/rentalcars.test.ts, lib/affiliate/__tests__/safetyWing.test.ts, lib/affiliate/__tests__/skyscanner.test.ts, lib/affiliate/__tests__/hostelworld.test.ts, lib/affiliate/__tests__/discoverCars.test.ts</files>
  <behavior>
    For each of 9 helpers, 4 tests:
    - Test 1: Returns URL containing AID/PID query param when env var set
    - Test 2: Gracefully degrades to public partner URL (no AID param) when env var absent
    - Test 3: URL-encodes free-text input (destination, city, etc.)
    - Test 4: Zod rejects invalid input (empty string, missing required field)
  </behavior>
  <action>
Per RESEARCH.md §1.4 "Concrete steps — booking helper" (verbatim pattern for all 9):

Create `lib/affiliate/types.ts`:
```ts
export class NoIsraelInventoryError extends Error {
  constructor(message: string) { super(message); this.name = 'NoIsraelInventoryError'; }
}
```

Build each of 9 helpers using the booking.ts pattern from RESEARCH §1.4:
1. Define `Opts` via Zod
2. Export `type LinkOpts = z.infer<typeof Opts>`
3. Export named function `partnerLink(opts: LinkOpts): string`
4. Inside: parse opts via Zod (throws on invalid input — covers test 4)
5. Read `NEXT_PUBLIC_<PARTNER>_<AID|PID|MARKER>` env var
6. Construct URL via `new URL(...)` + `searchParams.set(...)`
7. If env present, set AID + label/marker params; else return public URL

Per-partner env var convention (use what RESEARCH §1.4 + STACK §3.1 indicates):
- `bookingLink` → `NEXT_PUBLIC_BOOKING_AID`, public base `https://www.booking.com/searchresults.html`; params: `ss` (destination), `checkin`, `checkout`, `aid`, `label`
- `civitatisLink` → `NEXT_PUBLIC_CIVITATIS_AID`, base `https://www.civitatis.com/en/`; param: city + product
- `viatorLink` → `NEXT_PUBLIC_VIATOR_PID` + `NEXT_PUBLIC_VIATOR_MCID`, base `https://www.viator.com/`; params: pid, mcid, destinationCode, productCode
- `getYourGuideLink` → `NEXT_PUBLIC_GYG_PARTNER_ID`, base `https://www.getyourguide.com/`; params: partner_id, locationCode
- `rentalcarsLink` → `NEXT_PUBLIC_RENTALCARS_AID`, base `https://www.rentalcars.com/`; params: affiliateCode, pickupLocation
- `safetyWingLink` → `NEXT_PUBLIC_SAFETYWING_REF`, base `https://safetywing.com/nomad-insurance`; param: referenceID
- `skyscannerLink` → `NEXT_PUBLIC_SKYSCANNER_AID`, base `https://www.skyscanner.com/`; params: origin, destination, AID via Impact link
- `hostelworldLink` → `NEXT_PUBLIC_HOSTELWORLD_AID`, base `https://www.hostelworld.com/`; params: city, affiliateID
- `discoverCarsLink` → `NEXT_PUBLIC_DISCOVERCARS_AID`, base `https://www.discovercars.com/`; param: aid + city

For each helper write `lib/affiliate/__tests__/{helper}.test.ts` per RESEARCH §1.4 verbatim booking example:
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookingLink } from '../booking';

beforeEach(() => { vi.unstubAllEnvs(); });

describe('bookingLink', () => {
  it('returns URL with aid when env var present', () => {
    vi.stubEnv('NEXT_PUBLIC_BOOKING_AID', '1234567');
    const url = bookingLink({ destination: 'Jerusalem', label: 'jerusalem-canonical' });
    expect(url).toContain('aid=1234567');
    expect(url).toContain('label=jerusalem-canonical');
  });
  it('gracefully degrades without aid', () => {
    const url = bookingLink({ destination: 'Jerusalem' });
    expect(url).not.toContain('aid=');
    expect(url).toContain('ss=Jerusalem');
  });
  it('URL-encodes destination', () => {
    const url = bookingLink({ destination: 'Tel Aviv' });
    expect(url).toMatch(/ss=Tel(\+|%20)Aviv/);
  });
  it('rejects empty destination via Zod', () => {
    expect(() => bookingLink({ destination: '' } as any)).toThrow();
  });
});
```

Replicate this 4-test pattern for ALL 9 helpers, adapting the field names per partner. Total: 36 tests minimum.

Add AUD-031 hint: tests must include at least one Israel-destination fixture (Jerusalem / Tel Aviv / Israel) — already covered by the example.
  </action>
  <verify>
    <automated>pnpm test --run lib/affiliate</automated>
  </verify>
  <done>9 real helpers exported; 36 tests pass; each helper handles env-present + env-absent + URL-encoding + Zod validation; AUD-031 (Israel fixture in every helper test) covered.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Build 2 stub helpers (Klook, GoCity) per Conflict D + 8 stub tests + JSON state files + Travelpayouts + index barrel</name>
  <files>lib/affiliate/klook.ts, lib/affiliate/goCity.ts, lib/affiliate/__tests__/klook.test.ts, lib/affiliate/__tests__/goCity.test.ts, lib/affiliate/availability.ts, lib/affiliate/__tests__/affiliate-status.test.ts, lib/affiliate/index.ts, data/affiliate-availability.json, data/affiliate-status.json, .env.example, scripts/codemods/flip-affiliate-aid.mjs</files>
  <behavior>
    For each stub (klook, goCity), 4 tests:
    - Test 1: Calling the function THROWS NoIsraelInventoryError
    - Test 2: The thrown error message documents the Conflict D rationale
    - Test 3: Function does NOT crash if env var is present (still throws explicitly — confirms intent over silent activation)
    - Test 4: Error type is recoverable (instanceof check works for downstream catch blocks)
    Plus 1 test:
    - Test: `data/affiliate-availability.json` parses against Zod schema; 11 partners present; klook + goCity have state='absent'
    - Test: `data/affiliate-status.json` parses; 11 partners with {aidReceivedAt, appliedAt, lastReviewedAt} schema
  </behavior>
  <action>
Per RESEARCH.md §1.4:

Create `lib/affiliate/klook.ts`:
```ts
import { NoIsraelInventoryError } from './types';

export function klookLink(): never {
  throw new NoIsraelInventoryError(
    'klookLink() is stubbed: Klook Israel SKU coverage is thin (<10 tours). ' +
    'Per Conflict D resolution (SUMMARY.md §3), this helper is intentionally non-functional. ' +
    'Re-evaluate quarterly via data/affiliate-status.json. ' +
    'Activation criterion: SKU breadth >50 tours OR a tour-ID-gated helper variant.'
  );
}
```

Create `lib/affiliate/goCity.ts`:
```ts
import { NoIsraelInventoryError } from './types';

export function goCityLink(): never {
  throw new NoIsraelInventoryError(
    'goCityLink() is stubbed: GoCity has no Israel destination as of May 2026. ' +
    'Per Conflict D resolution (SUMMARY.md §3), this helper is intentionally non-functional. ' +
    'Re-evaluate quarterly via data/affiliate-status.json. ' +
    'Activation criterion: GoCity launches Israel pass.'
  );
}
```

Create `data/affiliate-availability.json` VERBATIM from RESEARCH §1.4 (11 partners, state per Conflict D):
```json
{
  "booking":      { "state": "pending", "regions": [], "notes": "..." },
  "civitatis":    { "state": "pending", "regions": [], "notes": "..." },
  "viator":       { "state": "pending", "regions": [], "notes": "..." },
  "getYourGuide": { "state": "pending", "regions": [], "notes": "..." },
  "rentalcars":   { "state": "pending", "regions": [], "notes": "..." },
  "safetyWing":   { "state": "pending", "regions": [], "notes": "..." },
  "skyscanner":   { "state": "pending", "regions": [], "notes": "..." },
  "hostelworld":  { "state": "pending", "regions": [], "notes": "..." },
  "discoverCars": { "state": "pending", "regions": [], "notes": "..." },
  "klook":        { "state": "absent",  "regions": [], "notes": "Conflict D — thin Israel SKU" },
  "goCity":       { "state": "absent",  "regions": [], "notes": "Conflict D — no Israel destination as of May 2026" },
  "travelpayouts":{ "state": "pending", "regions": [], "notes": "AFF-08 aggregator fallback for traffic-minimum partners (Skyscanner 5K mo)" }
}
```

Create `data/affiliate-status.json`:
```json
{
  "booking":      { "aidReceivedAt": null, "appliedAt": null, "lastReviewedAt": "2026-05-11" },
  ...  // all 12 entries (11 + travelpayouts marker)
}
```

Create `lib/affiliate/availability.ts`:
```ts
import availability from '../../data/affiliate-availability.json';
import { z } from 'zod';

export type State = 'pending' | 'applied' | 'active' | 'sparse' | 'absent';

const StateZ = z.enum(['pending', 'applied', 'active', 'sparse', 'absent']);
const Entry = z.object({ state: StateZ, regions: z.array(z.string()), notes: z.string() });
const Availability = z.record(z.string(), Entry);

const parsed = Availability.parse(availability); // throws at startup if shape wrong

export function affiliateAvailability(partner: string): State {
  return parsed[partner]?.state ?? 'absent';
}
```

Create `lib/affiliate/index.ts` barrel exporting all 11 helpers + types + availability.

Create `lib/affiliate/__tests__/klook.test.ts` (and goCity.test.ts mirror) with 4 tests per behavior block.

Create `lib/affiliate/__tests__/affiliate-status.test.ts`:
- Load `data/affiliate-availability.json`; assert 12 keys (11 partners + travelpayouts); klook + goCity have `state === 'absent'`
- Load `data/affiliate-status.json`; assert 12 entries with the {aidReceivedAt, appliedAt, lastReviewedAt} shape
- Assert `affiliateAvailability('klook') === 'absent'`

Update `.env.example` final form (built on plan 01 stub) to confirm:
- 11 env vars per partner
- Travelpayouts marker: `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER=` with documenting comment "AFF-08 aggregator fallback for Skyscanner 5K visitors/mo gate"
- Add header comment block at top: `# Affiliate config — Conflict D: 9 real + 2 stubs (Klook, GoCity)`

Create `scripts/codemods/flip-affiliate-aid.mjs` placeholder:
```js
#!/usr/bin/env node
// scripts/codemods/flip-affiliate-aid.mjs — placeholder.
// When an AID arrives (tracked in data/affiliate-status.json):
// 1. Read partner key from CLI arg
// 2. Confirm env var is set in .env.local
// 3. Update data/affiliate-status.json aidReceivedAt
// 4. Update data/affiliate-availability.json state to 'active'
// Implementation deferred to Phase 6 monitoring.
console.log('TODO: implement in Phase 6 monitoring. See data/post-launch-backlog.md.');
process.exit(0);
```
  </action>
  <verify>
    <automated>pnpm test --run lib/affiliate</automated>
  </verify>
  <done>Stubs throw NoIsraelInventoryError with documented Conflict D messages; 8 stub tests pass; JSON state files parse against Zod schema; barrel exports all 11 helpers; `.env.example` finalized with Travelpayouts marker (AFF-08); codemod placeholder exists.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Verify ESLint AFF-04 rule fires outside `lib/affiliate/**` AND escape hatch works; wire `<AffiliateCard>` to real helpers with disclosure DOM-precedence</name>
  <files>tests/eslint-fixtures/raw-partner-url.tsx, tests/eslint-fixtures/affiliate-helper-allowed.ts, tests/eslint-fixtures/affiliate-fixtures.test.ts, components/travel/AffiliateCard.tsx</files>
  <behavior>
    - Test: `pnpm lint tests/eslint-fixtures/raw-partner-url.tsx` exits NON-ZERO (rule fires outside `lib/affiliate/**`)
    - Test: Place the SAME raw URL string inside `lib/affiliate/` — lint exits ZERO (escape hatch works)
    - Test: `<AffiliateCard partner="booking" destination="Jerusalem">` renders with `<a href>` containing `booking.com` + `<AffiliateDisclosure>` DOM-precedes the `<a>` (AFF-06)
    - Test: `<AffiliateCard partner="klook">` renders ONLY the disclosure + a "currently unavailable" notice (does NOT throw at render — the stub error is caught and translated to a soft fallback)
    - Test: `affiliateAvailability('klook') === 'absent'` → `<AffiliateCard partner="klook">` returns null or fallback UI
  </behavior>
  <action>
Create `tests/eslint-fixtures/raw-partner-url.tsx`:
```tsx
// INTENTIONAL VIOLATION — confirms AFF-04 no-restricted-syntax rule fires outside lib/affiliate/**.
// Expected: pnpm lint exits NON-ZERO with "Hard-coded partner URL detected. Use lib/affiliate/ helper."
export function PartnerUrlViolator() {
  return (
    <div>
      <a href="https://www.booking.com/searchresults.html?ss=Jerusalem">Booking</a>
      <a href="https://www.civitatis.com/en/jerusalem/">Civitatis</a>
    </div>
  );
}
```

Create `tests/eslint-fixtures/affiliate-helper-allowed.ts` — note `.ts` extension and "fake" path that the escape-hatch glob CANNOT MATCH (we want to prove the rule fires here, NOT the escape hatch):
```ts
// This file is INTENTIONALLY at tests/eslint-fixtures/, NOT lib/affiliate/.
// Even though it looks like a helper, the escape hatch only applies to lib/affiliate/**.
// Expected: pnpm lint exits NON-ZERO.
export const BOOKING_PUBLIC = 'https://www.booking.com/searchresults.html';
```

Then create `tests/eslint-fixtures/affiliate-fixtures.test.ts`:
- Test 1: `pnpm lint tests/eslint-fixtures/raw-partner-url.tsx` exits non-zero (rule fires)
- Test 2: `pnpm lint tests/eslint-fixtures/affiliate-helper-allowed.ts` exits non-zero (escape hatch is path-specific — doesn't match `tests/`)
- Test 3 (escape hatch verification): `pnpm lint lib/affiliate/booking.ts` exits ZERO (real helper file with raw partner URL string is allowed)

These tests prove the AFF-04 rule is correctly scoped via the `eslint.config.js` override block.

**Wire `<AffiliateCard>` to real helpers (the swap-out from plan 05's STUB):**

Update `components/travel/AffiliateCard.tsx` (currently has `href="#TODO-PLAN-06"`):

```tsx
import { bookingLink, civitatisLink, viatorLink, getYourGuideLink, rentalcarsLink, safetyWingLink, skyscannerLink, hostelworldLink, discoverCarsLink, klookLink, goCityLink, affiliateAvailability } from '@/lib/affiliate';
import { AffiliateDisclosure } from './AffiliateDisclosure';
// ... CVA etc.

type Partner = 'booking' | 'civitatis' | 'viator' | 'getYourGuide' | 'rentalcars' | 'safetyWing' | 'skyscanner' | 'hostelworld' | 'discoverCars' | 'klook' | 'goCity';

interface Props {
  partner: Partner;
  destination: string;
  productId?: string;
  label?: string;
  // ... per-partner extras
}

export function AffiliateCard({ partner, destination, productId, label }: Props) {
  // Hide UI for absent partners (Klook, GoCity per Conflict D)
  if (affiliateAvailability(partner) === 'absent') {
    return null; // or a graceful "currently unavailable" UI per A/B test
  }

  let href: string;
  try {
    switch (partner) {
      case 'booking':       href = bookingLink({ destination, label });               break;
      case 'civitatis':     href = civitatisLink({ city: destination, productId });    break;
      case 'viator':        href = viatorLink({ destinationCode: destination, productId }); break;
      case 'getYourGuide':  href = getYourGuideLink({ locationCode: destination, productId }); break;
      case 'rentalcars':    href = rentalcarsLink({ pickupLocation: destination });    break;
      case 'safetyWing':    href = safetyWingLink({});                                  break;
      case 'skyscanner':    href = skyscannerLink({ origin: 'ANYWHERE', destination }); break;
      case 'hostelworld':   href = hostelworldLink({ city: destination });              break;
      case 'discoverCars':  href = discoverCarsLink({ city: destination });             break;
      default: return null;
    }
  } catch (e) {
    if (e instanceof Error && e.name === 'NoIsraelInventoryError') return null;
    throw e;
  }

  return (
    <Card variant="elevated">
      <AffiliateDisclosure />  {/* DOM-precedes link per AFF-06 */}
      <a href={href} rel="sponsored noopener nofollow" target="_blank" data-aff-disclosed="true" data-partner={partner}>
        {/* card content */}
      </a>
    </Card>
  );
}
```

Update the existing `components/__tests__/affiliatecard-stub.test.tsx` from plan 05 → rename to `affiliatecard.test.tsx` and assert:
- DOM-precedence: `AffiliateDisclosure` appears before the `<a>` (per AFF-06)
- For `partner: 'klook'`, the component returns null (stub → absent state)
- For `partner: 'booking'`, the `<a href>` contains `booking.com`
- `data-aff-disclosed="true"` attribute present on the link
  </action>
  <verify>
    <automated>pnpm test --run tests/eslint-fixtures/affiliate-fixtures.test.ts &amp;&amp; pnpm test --run components/__tests__/affiliatecard.test.tsx</automated>
  </verify>
  <done>AFF-04 rule fires outside escape hatch; escape hatch works in `lib/affiliate/**`; AffiliateCard wires real helpers; Klook/GoCity gracefully return null; disclosure DOM-precedes link (AFF-06 contract met).</done>
</task>

</tasks>

<verification>
End of plan 06 checks:

1. **AFF-01**: 9 real helpers export; `pnpm test lib/affiliate --run --coverage` shows 100% of exports exercised.
2. **AFF-02**: Klook + GoCity throw `NoIsraelInventoryError` with documented Conflict D message.
3. **AFF-03**: ≥48 helper tests pass: 9 real × 4 = 36, 2 stubs × 4 = 8, +4 availability/status tests = 48.
4. **AFF-04**: ESLint fires on `tests/eslint-fixtures/raw-partner-url.tsx` (outside escape hatch); zero on `lib/affiliate/booking.ts` (inside escape hatch).
5. **AFF-06**: `<AffiliateCard>` renders `<AffiliateDisclosure>` DOM-preceding the affiliate `<a>` — verified via `compareDocumentPosition`.
6. **AFF-07**: `data/affiliate-status.json` parses; 11 partners (+ travelpayouts) present with full schema.
7. **AFF-08**: `grep -i travelpayouts .env.example` succeeds; `data/affiliate-availability.json` includes travelpayouts entry.
8. AUD-031 (every helper test has an Israel-destination fixture) covered: all test sample inputs use "Jerusalem" or "Tel Aviv".
</verification>

<success_criteria>
- 9 real helpers + 2 stubs (Conflict D)
- ≥44 helper tests + ≥4 stub tests = ≥48 passing
- `data/affiliate-availability.json` (11 partners + travelpayouts marker) + `data/affiliate-status.json`
- Klook + GoCity throw documented errors
- Travelpayouts AFF-08 fallback marker in `.env.example`
- ESLint escape hatch verified both ways
- `<AffiliateCard>` wired to real helpers; FTC disclosure DOM-precedes link (AFF-06)
- VALIDATION rows AFF-01..AFF-08 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/06-affiliate-helpers-SUMMARY.md` documenting: 11 partners listed with state, test count, Travelpayouts position, AffiliateCard wired (no more `#TODO-PLAN-06`), and the AFF-06 disclosure DOM-precedence contract.
</output>
