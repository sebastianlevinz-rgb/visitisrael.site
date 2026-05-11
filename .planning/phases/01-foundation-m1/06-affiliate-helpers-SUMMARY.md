---
phase: 01-foundation-m1
plan: 06
subsystem: affiliate
tags:
  [
    affiliate,
    aff-01,
    aff-02,
    aff-03,
    aff-04,
    aff-06,
    aff-07,
    aff-08,
    conflict-d,
    zod,
    travelpayouts,
    ftc-disclosure,
    eslint-escape-hatch,
  ]

requires:
  - phase: 01-foundation-m1/01-scaffold
    provides: 'ESLint flat config with `no-restricted-syntax` partner-URL rule (Rule 3) + `lib/affiliate/**` escape hatch; `.env.example` baseline 11 AID slots'
  - phase: 01-foundation-m1/02-design-tokens
    provides: '3-layer @theme tokens + `--color-primary` / `--color-border` / `--color-surface` (consumed by AffiliateCard link styling)'
  - phase: 01-foundation-m1/05-component-lib
    provides: '`<AffiliateCard>` STUB with `#TODO-PLAN-06` sentinel, `<AffiliateDisclosure>` with `data-component` attribute, `PartnerId` type, async-resolve-at-consumer pattern'

provides:
  - '9 real affiliate helpers in `lib/affiliate/`: bookingLink, civitatisLink, viatorLink, getYourGuideLink, rentalcarsLink, safetyWingLink, skyscannerLink, hostelworldLink, discoverCarsLink — each Zod-validated, AID-aware (codemod-ready)'
  - '2 stub helpers per Conflict D: klookLink + goCityLink — throw NoIsraelInventoryError with documented rationale + quarterly re-review pointer'
  - '`lib/affiliate/index.ts` barrel — single import surface for all 11 helpers + types + availability lookup'
  - '`lib/affiliate/availability.ts` — Zod-validated state loader exposing `affiliateAvailability(partner): State` + `allPartners()`'
  - '`data/affiliate-availability.json` — 12 entries (9 real "pending" + Klook/GoCity "absent" + Travelpayouts marker)'
  - '`data/affiliate-status.json` — 12 AID-tracking entries with `{aidEnvVar, aidReceivedAt, appliedAt, lastReviewedAt}` for Phase 6 codemod'
  - '`scripts/codemods/flip-affiliate-aid.mjs` — placeholder for Phase 6 monitoring activation'
  - '`<AffiliateCard>` WIRED (no more `#TODO-PLAN-06` sentinel) — partner-prop dispatches to all 11 helpers; AFF-06 disclosure DOM-precedence preserved; Klook/GoCity render null via availability short-circuit + defense-in-depth error catch'
  - '9 partner-specific ESLint fixtures in `tests/eslint-fixtures/raw-partner-url-{booking,civitatis,viator,gyg,rentalcars,safetywing,skyscanner,hostelworld,discovercars}.tsx` — each fires the AFF-04 no-restricted-syntax rule outside the `lib/affiliate/**` escape hatch'
  - '48 affiliate tests + 7 wired-AffiliateCard tests + 10 fixture tests = 65 new test cases; 249/249 total project tests pass'

affects:
  [
    07-quality-profiles,
    08-seo-config,
    09-ner-detection,
    10-audit-dashboard,
    11-lighthouse-ci,
    02-pilot-jerusalem (Phase 2),
  ]

tech-stack:
  added:
    - '(none — zod 4.4.3 already in deps from plan 03)'
  patterns:
    - 'Codemod-ready AID pattern: every real helper reads `process.env.NEXT_PUBLIC_<PARTNER>_<AID|PID|REF>` at call time. Empty/unset → public URL. Set → AID-tagged URL. No code change needed at call sites when an AID arrives — only an env var update in Vercel project settings + a `data/affiliate-status.json` cron flip.'
    - 'Zod-at-helper-boundary pattern: each helper Zod-parses its opts BEFORE constructing the URL, so invalid input (empty destination, missing required field) throws at the call site rather than silently producing a broken URL. Test 4 in every helper test asserts this.'
    - "Stub-throws-loud pattern (Conflict D): klookLink/goCityLink throw `NoIsraelInventoryError` with documented rationale + activation criterion + re-review cadence. AffiliateCard catches the error AND short-circuits earlier via `affiliateAvailability(partner) === 'absent'`. Two layers of fallback prevent any broken-link UI from leaking to production."
    - 'Zod-validated JSON state files: `lib/affiliate/availability.ts` parses `data/affiliate-availability.json` at module load via Zod; if a partner is added to the JSON without updating the Zod enum (e.g., a new state value), module load throws. Plan 10 audit dashboard will consume the parsed state via `affiliateAvailability(partner)`.'
    - 'Per-partner fixture pattern (AFF-04): instead of one mega-fixture that exercises every partner URL on one line, each partner gets its own fixture file. Lint is invoked per-fixture, asserting the rule fires on EACH partner domain independently (catches the case where one domain regex group breaks while others still match).'
    - 'Escape-hatch dual-verification pattern: AFF-04 fixture test ALSO runs `pnpm lint lib/affiliate/booking.ts` (the same raw partner URL string lives there legitimately) and asserts exit 0 — proves the escape hatch in `eslint.config.js` works AND no over-broad rule is firing.'
    - "Availability-aware component dispatch: `<AffiliateCard>` checks `affiliateAvailability(partner)` BEFORE calling the helper. State === 'absent' → render null (no Klook/GoCity link ever reaches the DOM). The stub error throw is a second line of defense if availability JSON ever drifts."

key-files:
  created:
    - lib/affiliate/types.ts
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
    - lib/affiliate/availability.ts
    - lib/affiliate/index.ts
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
    - scripts/codemods/flip-affiliate-aid.mjs
    - tests/eslint-fixtures/raw-partner-url-booking.tsx
    - tests/eslint-fixtures/raw-partner-url-civitatis.tsx
    - tests/eslint-fixtures/raw-partner-url-viator.tsx
    - tests/eslint-fixtures/raw-partner-url-gyg.tsx
    - tests/eslint-fixtures/raw-partner-url-rentalcars.tsx
    - tests/eslint-fixtures/raw-partner-url-safetywing.tsx
    - tests/eslint-fixtures/raw-partner-url-skyscanner.tsx
    - tests/eslint-fixtures/raw-partner-url-hostelworld.tsx
    - tests/eslint-fixtures/raw-partner-url-discovercars.tsx
    - tests/eslint-fixtures/affiliate-fixtures.test.ts
    - components/__tests__/affiliatecard.test.tsx
  modified:
    - components/travel/AffiliateCard.tsx (wired real helpers; removed #TODO-PLAN-06)
    - components/__tests__/composites.test.tsx (asserts booking.com URL, not stub sentinel)
    - app/[locale]/admin/components/page.tsx (title updated)
    - app/[locale]/admin/components/[component]/page.tsx (return type widened to ReactElement | null)
    - .env.example (Conflict D header comment block)
  removed:
    - components/__tests__/affiliatecard-stub.test.tsx (superseded by affiliatecard.test.tsx)

key-decisions:
  - 'Codemod-ready AID-aware pattern over feature-flag: each helper reads `process.env.NEXT_PUBLIC_<PARTNER>_<AID>` at call time. When an AID arrives, set the env var in Vercel project settings — every helper invocation site automatically starts emitting AID-tagged URLs without a code deploy. The `scripts/codemods/flip-affiliate-aid.mjs` placeholder exists only to update the `data/affiliate-status.json` tracking record (Phase 6 monitoring concern), NOT to rewrite source files. This avoids the failure mode where a partial codemod run leaves some call sites untagged.'
  - "Klook + GoCity short-circuit at availability check, NOT at helper call: AffiliateCard reads `affiliateAvailability(partner)` BEFORE dispatching. If state === 'absent', the component returns null without ever calling the stub helper. The stub error throw is still wired as defense in depth (defends against availability JSON drift), but the primary path is the data-driven render gate. Rationale: catches absent partners even if a future developer wires a non-throwing stub by mistake."
  - "Per-partner fixture files instead of one omnibus: 9 separate `raw-partner-url-{partner}.tsx` files rather than one with all 9 anchors. Each file is lint-ed independently by the fixture test, so if one domain group breaks out of the regex (e.g., `skyscanner.` is the lenient match for skyscanner.* subdomains), the broken group's test fails distinctly. Faster diagnostic than parsing a multi-violation lint output."
  - "Travelpayouts as 12th entry in availability JSON (not a 'partner' but a marker): Travelpayouts is an aggregator, not a direct affiliate program. It belongs in the same data file because AFF-08 contract is that Phase 6 monitoring can read `data/affiliate-availability.json` and see ALL revenue-touching state in one place, including the aggregator fallback for traffic-gated partners (Skyscanner)."
  - "AffiliateCard return type widened to ReactElement | null: signaling 'this component may legitimately render nothing' is preferable to silently rendering an unavailable-partner card. Consumers (admin playground, future Phase 2 region MDX) opt-in to the null check by typing `Promise<ReactElement | null>`. Rule 3 (blocking) auto-fix during this plan: typecheck flagged the admin drill-down page; widened its return type to match."
  - "Skyscanner helper public-URL fallback documented inline: skyscannerLink's docstring explicitly calls out the 5K visitors/mo partner-program gate AND points at `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER` (AFF-08) as the documented aggregator alternative. Future Phase 2 region authors picking up a flight CTA know the fallback path without re-reading research docs."

patterns-established:
  - 'Helper-first affiliate integration: every partner URL goes through `lib/affiliate/{partner}.ts`. The escape-hatch override in `eslint.config.js` scopes the no-restricted-syntax exemption to `lib/affiliate/**/*.{ts,tsx}` ONLY — every other file in the repo (components, content MDX, scripts) lints non-zero if it contains a raw partner URL. Plan 06 fixture coverage proves this for all 9 real partners.'
  - "Conflict-D-style stub: when a partner has thin/no inventory, ship the helper as a throwing stub with documented rationale rather than omitting it. Three benefits: (a) Phase 2 content authors get a clean error if they accidentally invoke an absent partner; (b) `data/affiliate-availability.json` enumerates every partner ever considered (transparency for AUD audit dashboard); (c) re-activation later is a simple flip — change `state: 'absent'` → `state: 'pending'` and rewrite the stub body."
  - 'Zod-validated state files: any JSON file consumed by runtime code (`affiliate-availability.json`, `affiliate-status.json`, future `religious-sites.json` references) is parsed at module load via Zod. Drift between hand-edited JSON and the consumer schema fails fast at startup or test time — never at user request time.'
  - 'Two-layer availability gate: state file gates rendering (`<AffiliateCard>` returns null on absent), stub error gates execution (helper throws NoIsraelInventoryError). Either layer alone is sufficient; both layered together survive single-point-of-truth drift.'

requirements-completed:
  - AFF-01
  - AFF-02
  - AFF-03
  - AFF-04
  - AFF-06
  - AFF-07
  - AFF-08

duration: 12min
completed: 2026-05-11
---

# Phase 1 Plan 06: Affiliate Helpers Summary

**11 affiliate helpers shipped (9 real + 2 stubs per Conflict D), 65 new test cases, AffiliateCard wired with FTC inline disclosure DOM-precedence preserved, 9 partner-specific ESLint fixtures prove AFF-04 fires per partner outside the `lib/affiliate/**`escape hatch.** Plan-05 sentinel`#TODO-PLAN-06`is gone; every partner-prop value on`<AffiliateCard>`either dispatches to a real helper (booking, civitatis, viator, getYourGuide, rentalcars, safetyWing, skyscanner, hostelworld, discoverCars) returning an AID-aware URL, or short-circuits to`null`for absent partners (Klook, GoCity). Codemod-ready: when an AID arrives, set`NEXT*PUBLIC*<PARTNER>\_<AID>` in Vercel — every call site begins emitting tagged URLs with zero code change.

## Performance

- **Duration:** ~12 min
- **Started:** 2026-05-11T02:12:18Z
- **Completed:** 2026-05-11T02:24:35Z
- **Tasks:** 3 (all TDD-style, each committed atomically)
- **Files created:** 41 (14 source + 13 test + 9 fixtures + 2 data JSON + 1 codemod + 2 misc)
- **Files modified:** 5 (AffiliateCard, composites test, admin playground × 2, .env.example)
- **Files removed:** 1 (affiliatecard-stub.test.tsx superseded)
- **Total commits:** 3 (1 per task) — `76e7688`, `5d4b7d5`, `324ca1f`

## Accomplishments

- **9 real affiliate helpers** in `lib/affiliate/` with Zod-validated opts + AID-aware URL construction. Each follows the same shape: parse opts → build URL with `new URL()` + `searchParams.set()` → conditionally append AID-tagged params when `process.env.NEXT_PUBLIC_<PARTNER>_<AID>` is set, else return public URL. AUD-031 covered: every helper test uses an Israel-destination fixture (Jerusalem, Tel Aviv, Eilat, d919, TLV, israel-l169033, israel).
- **2 stub helpers** (`klook.ts`, `goCity.ts`) per Conflict D resolution. Each throws `NoIsraelInventoryError` with a message that names the partner, states the rationale (thin SKU / no Israel destination), points at the quarterly re-review cadence (`data/affiliate-status.json`), and documents the activation criterion.
- **`lib/affiliate/types.ts`** exports the shared `NoIsraelInventoryError` class. Both stubs throw instances; AffiliateCard catches via `instanceof` for the defense-in-depth fallback.
- **`lib/affiliate/availability.ts`** loads `data/affiliate-availability.json` via Zod, throws at module-load if the JSON shape drifts (a new state value or a missing required field). Exposes `affiliateAvailability(partner): State` and `allPartners()` — consumed by AffiliateCard's render gate.
- **`lib/affiliate/index.ts`** barrel re-exports all 11 helpers, their Opts types, the error class, the availability lookup, and the `State` type — single import surface for AffiliateCard and Phase 2 region MDX.
- **`data/affiliate-availability.json`** enumerates 12 entries (9 real "pending" + 2 stubs "absent" + 1 Travelpayouts "pending" marker). Each entry: `{state, regions, notes}` where the `notes` field documents the partner's rationale for its state value.
- **`data/affiliate-status.json`** parallel 12-entry file tracking `{aidEnvVar, aidReceivedAt, appliedAt, lastReviewedAt}`. The Phase 6 monitoring codemod (placeholder) will read this to know which partner just got an AID and trigger the availability flip.
- **`scripts/codemods/flip-affiliate-aid.mjs`** placeholder — documents the activation procedure (set env var → cron updates the JSON tracker → availability re-parses). No actual codemod logic needed because helpers are env-aware at runtime.
- **`<AffiliateCard>` wired**: `#TODO-PLAN-06` is gone. Component now reads `affiliateAvailability(partner)`; if `'absent'` returns `null`; otherwise dispatches via `switch (partner)` to the correct helper. The `try`/`catch` on `NoIsraelInventoryError` is a defense-in-depth layer that survives JSON drift. AFF-06 contract preserved: `await AffiliateDisclosure({})` resolved inline so the disclosure DOM-precedes the affiliate `<a>` on every render.
- **9 partner-specific ESLint fixtures** in `tests/eslint-fixtures/raw-partner-url-{booking,civitatis,viator,gyg,rentalcars,safetywing,skyscanner,hostelworld,discovercars}.tsx`. Each is a deliberately-failing component containing one raw partner URL anchor. Run `pnpm lint tests/eslint-fixtures/raw-partner-url-<partner>.tsx` → exits non-zero with "Hard-coded partner URL detected" message.
- **`tests/eslint-fixtures/affiliate-fixtures.test.ts`** — 10-case Vitest suite spawning `pnpm lint` for each of the 9 fixtures (asserts non-zero exit + rule message) + 1 escape-hatch verification (`pnpm lint lib/affiliate/booking.ts` exits 0 even though it contains the same raw URL).
- **65 new test cases**: 36 real-helper tests (4 × 9) + 8 stub tests (4 × 2) + 4 availability/status tests + 10 partner-URL fixture tests + 7 wired-AffiliateCard tests. The 7 wired-AffiliateCard tests replace the 4 original stub tests for a net +3.
- **Project total: 249/249 tests pass** (was 188; +61 net new = 65 new − 4 removed). `pnpm lint` exits 0 on the full repo; `pnpm typecheck` clean; `pnpm build` succeeds with 49 static pages (unchanged from plan 05).
- **`.env.example`** carries the Conflict D header block + 11 AID slots + the AFF-08 Travelpayouts marker (`NEXT_PUBLIC_TRAVELPAYOUTS_MARKER=`). Plan 01 already laid down the env-var rows; plan 06 added the documentation header explaining the Conflict D rationale.

## Task Commits

1. **Task 1: 9 real affiliate helpers + 36 tests** — `76e7688` (feat) — types.ts + 9 helper files + 9 test files. Each helper: Zod-parsed opts, env-var-aware URL construction, public URL fallback. Each test: AID-set / AID-unset / URL-encoded / Zod-rejects (4 tests × 9 helpers = 36).
2. **Task 2: Klook/GoCity stubs + availability/status JSON + barrel + codemod placeholder** — `5d4b7d5` (feat) — klook.ts + goCity.ts + availability.ts + index.ts + 2 stub tests + 1 availability test + 2 data JSON files + flip-affiliate-aid.mjs placeholder + .env.example header block. 12 tests pass.
3. **Task 3: AffiliateCard wired + 9 partner-URL fixtures (AFF-04 full + AFF-06)** — `324ca1f` (feat) — AffiliateCard.tsx (real-helper switch + availability gate + defense-in-depth error catch), affiliatecard.test.tsx (7 new tests replacing stub test), 9 fixture files, affiliate-fixtures.test.ts (10 tests), admin playground title update + return type widening, composites.test.tsx updated. Old `affiliatecard-stub.test.tsx` removed.

**Plan-metadata commit:** appended after this SUMMARY.md lands (covers SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md).

## Files Created/Modified

### Created (41)

**Affiliate library (14 source files)**

- `lib/affiliate/types.ts`
- `lib/affiliate/booking.ts`
- `lib/affiliate/civitatis.ts`
- `lib/affiliate/viator.ts`
- `lib/affiliate/getYourGuide.ts`
- `lib/affiliate/rentalcars.ts`
- `lib/affiliate/safetyWing.ts`
- `lib/affiliate/skyscanner.ts`
- `lib/affiliate/hostelworld.ts`
- `lib/affiliate/discoverCars.ts`
- `lib/affiliate/klook.ts`
- `lib/affiliate/goCity.ts`
- `lib/affiliate/availability.ts`
- `lib/affiliate/index.ts`

**Affiliate tests (13 test files)**

- `lib/affiliate/__tests__/booking.test.ts`
- `lib/affiliate/__tests__/civitatis.test.ts`
- `lib/affiliate/__tests__/viator.test.ts`
- `lib/affiliate/__tests__/getYourGuide.test.ts`
- `lib/affiliate/__tests__/rentalcars.test.ts`
- `lib/affiliate/__tests__/safetyWing.test.ts`
- `lib/affiliate/__tests__/skyscanner.test.ts`
- `lib/affiliate/__tests__/hostelworld.test.ts`
- `lib/affiliate/__tests__/discoverCars.test.ts`
- `lib/affiliate/__tests__/klook.test.ts`
- `lib/affiliate/__tests__/goCity.test.ts`
- `lib/affiliate/__tests__/affiliate-status.test.ts`
- `components/__tests__/affiliatecard.test.tsx`

**Data + scripts**

- `data/affiliate-availability.json`
- `data/affiliate-status.json`
- `scripts/codemods/flip-affiliate-aid.mjs`

**ESLint fixtures (9 partner + 1 test)**

- `tests/eslint-fixtures/raw-partner-url-booking.tsx`
- `tests/eslint-fixtures/raw-partner-url-civitatis.tsx`
- `tests/eslint-fixtures/raw-partner-url-viator.tsx`
- `tests/eslint-fixtures/raw-partner-url-gyg.tsx`
- `tests/eslint-fixtures/raw-partner-url-rentalcars.tsx`
- `tests/eslint-fixtures/raw-partner-url-safetywing.tsx`
- `tests/eslint-fixtures/raw-partner-url-skyscanner.tsx`
- `tests/eslint-fixtures/raw-partner-url-hostelworld.tsx`
- `tests/eslint-fixtures/raw-partner-url-discovercars.tsx`
- `tests/eslint-fixtures/affiliate-fixtures.test.ts`

### Modified (5)

- `components/travel/AffiliateCard.tsx` — wired all 11 helpers via switch; removed `#TODO-PLAN-06`; added availability gate + NoIsraelInventoryError catch; return type now `Promise<ReactElement | null>`.
- `components/__tests__/composites.test.tsx` — AffiliateCard test now asserts `booking.com` URL (was `#TODO-PLAN-06` sentinel).
- `app/[locale]/admin/components/page.tsx` — section title updated.
- `app/[locale]/admin/components/[component]/page.tsx` — `renderComponent` return type widened to `ReactElement | null` to accept AffiliateCard's new nullable signature.
- `.env.example` — Conflict D header block added above the affiliate env-var rows.

### Removed (1)

- `components/__tests__/affiliatecard-stub.test.tsx` — superseded by `affiliatecard.test.tsx` which asserts the wired contract.

## Decisions Made

1. **Codemod-ready AID pattern over per-deploy code edits.** Every helper reads `process.env.NEXT_PUBLIC_<PARTNER>_<AID>` at call time. Setting the value in Vercel project settings flips every helper invocation site from "public URL" to "AID-tagged URL" without a code deploy or a codemod sweep. The `scripts/codemods/flip-affiliate-aid.mjs` placeholder exists only to update the `data/affiliate-status.json` activation date; it does NOT modify source. Rationale: a partial codemod sweep is a worse failure mode than env-driven runtime detection. The Argentina lesson #2 (one affiliate dominating, another barely used) is fixed by keeping every helper symmetric and AID-aware so adding/removing partners is a config change.

2. **Conflict D stubs throw with documented messages, never silently return.** klookLink and goCityLink both throw `NoIsraelInventoryError` with a 4-part message: partner name + rationale + quarterly review pointer + activation criterion. This makes the resolution self-documenting — anyone tracing a runtime error lands on the message and immediately understands the rationale without reading SUMMARY.md §3. Tests assert the message structure stays stable.

3. **Availability gate at component, error throw at helper — two layers.** `<AffiliateCard>` checks `affiliateAvailability(partner)` FIRST. If `'absent'`, returns `null` without invoking the helper. The stub error throw is the second line of defense (if availability JSON ever drifts so an absent partner slips through, the throw catches it). Either layer alone is sufficient; both layered are robust against single-source drift.

4. **Per-partner fixture files for AFF-04 (9 fixtures, not 1 omnibus).** Each `raw-partner-url-{partner}.tsx` exercises ONE partner URL. Lint runs per-file. If the regex group for `skyscanner.` breaks tomorrow but `booking.com` still matches, only the Skyscanner test fails — fast diagnostic. Plus the explicit per-partner naming (`raw-partner-url-rentalcars.tsx`) makes the AFF-04 coverage matrix obvious from the file listing.

5. **Travelpayouts as 12th entry in availability JSON, not as a partner.** AFF-08 calls out Travelpayouts as the aggregator fallback for traffic-gated partners (Skyscanner's 5K visitors/mo gate). It belongs in the availability state file because Phase 6 monitoring needs to see ALL revenue-touching state in one view, including the aggregator. Helper file is intentionally absent — Travelpayouts is configured via dashboard, not a direct URL helper.

6. **AffiliateCard return type widened to `ReactElement | null`.** AffiliateCard now legitimately renders nothing for absent partners. Consumers opt-in to the null check via the return type. The admin drill-down page (`app/[locale]/admin/components/[component]/page.tsx`) was updated to match — its `renderComponent` function widened to the same nullable type (Rule 3 — blocking auto-fix; typecheck error TS2322 caught it).

7. **Skyscanner Travelpayouts fallback documented inline in helper docstring.** Rather than burying the AFF-08 fallback in research docs, the skyscanner.ts file's header comment names the gate (5K visitors/mo) and points at `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER` (`.env.example`). Any Phase 2 region author picking up a flight CTA sees the fallback path inline.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Existing `composites.test.tsx` asserted the now-obsolete `#TODO-PLAN-06` stub sentinel**

- **Found during:** Task 3 — after wiring `<AffiliateCard>`, the existing component test at `components/__tests__/composites.test.tsx` (line 262) asserted `link.getAttribute('href')).toBe('#TODO-PLAN-06')` which no longer holds.
- **Issue:** Plan 05's stub test now incorrectly asserts the old sentinel.
- **Fix:** Updated the assertion to `expect(link.getAttribute('href')).toContain('booking.com')` plus a negative assertion that the sentinel is gone. Documentation comment also updated to "plan 06 wired" instead of "stub".
- **Files modified:** `components/__tests__/composites.test.tsx`.
- **Verification:** Test re-run; passes alongside the new affiliatecard.test.tsx.
- **Committed in:** `324ca1f` (Task 3).

**2. [Rule 3 - Blocking] `renderComponent` return type in admin drill-down page mismatched widened AffiliateCard signature**

- **Found during:** Task 3 `pnpm typecheck` after wiring `<AffiliateCard>`.
- **Issue:** AffiliateCard now returns `Promise<ReactElement | null>` (absent partners render null). `app/[locale]/admin/components/[component]/page.tsx`'s `renderComponent` was typed `Promise<ReactElement>` — TypeScript error TS2322 on the `case 'affiliate-card': return await AffiliateCard(...)` line.
- **Fix:** Widened `renderComponent` return type to `Promise<React.ReactElement | null>`. The drill-down page itself doesn't render any absent partners (uses `partner: 'booking'`), but the type widening is correct and prevents silent breakage if a future case uses an absent partner.
- **Files modified:** `app/[locale]/admin/components/[component]/page.tsx`.
- **Verification:** `pnpm typecheck` exits 0; `pnpm build` succeeds with 49 static pages unchanged.
- **Committed in:** `324ca1f` (Task 3).

**3. [Rule 1 - Bug] Removed superseded test file `affiliatecard-stub.test.tsx`**

- **Found during:** Task 3 planning — plan-05's stub test made assertions that contradict the wired contract.
- **Issue:** Keeping the old test would either break (`#TODO-PLAN-06` no longer exists) or silently pass on a half-truth.
- **Fix:** Deleted `components/__tests__/affiliatecard-stub.test.tsx` and replaced it with `components/__tests__/affiliatecard.test.tsx` (7 tests asserting the wired contract: booking URL, viator URL, AFF-06 DOM-order, rel/target/data-aff-disclosed attrs, Klook → null, GoCity → null, no `#TODO-PLAN-06` anywhere).
- **Files modified:** removed `components/__tests__/affiliatecard-stub.test.tsx`; created `components/__tests__/affiliatecard.test.tsx`.
- **Verification:** New test file passes 7/7; old file no longer in git tree.
- **Committed in:** `324ca1f` (Task 3).

---

**Total deviations:** 3 auto-fixed (1 blocking on typecheck, 2 bugs from upstream stub contract).

**Plan-architecture impact:** None. The deviations are all consequences of properly wiring the stub — every fix sharpens the plan's locked design (AffiliateCard wired to real helpers, returns null for absent partners, AFF-06 DOM-order preserved). No scope creep; no new dependencies.

## Issues Encountered

- **DEP0190 deprecation warning** continues from plans 02/03/05 (Vitest fixture test spawns `pnpm lint` with `shell: true` on Windows). Unchanged here. Cleanup target for plan 11.
- **CRLF line-ending warnings** on every commit. Inherited from plans 02-05. Not blocking. Same plan-11 cleanup target.
- **AFF-04 fixture test runtime: ~73s** for the 10 cases (each spawns `pnpm lint` subprocess on Windows). Acceptable for `pnpm test --run` (single batch). Watch-mode would amortize. The cost is in the pnpm shim → eslint binary startup × 10, not the lint itself.
- **Existing AID env vars in `.env.example` carry placeholder/empty values** — correct day-1 state; helpers gracefully return public URLs.

## User Setup Required

- **None for development.** Every helper works in the default (env-unset) configuration: returns public URLs. AffiliateCard renders the public URL with `rel="sponsored nofollow noopener"` so disclosure attribution remains FTC-compliant even before AIDs arrive.
- **For production AID activation** (Phase 6+ task): apply to each partner program (Booking via CJ/Awin, Civitatis direct, Viator via Impact, GetYourGuide direct, Rentalcars via Awin, SafetyWing direct, Skyscanner Impact when 5K visitors/mo reached, Hostelworld via Partnerize, DiscoverCars direct). When an AID arrives, set the corresponding `NEXT_PUBLIC_<PARTNER>_<AID>` in Vercel project settings, update `data/affiliate-status.json` aidReceivedAt + appliedAt, and flip `data/affiliate-availability.json` state to `'active'`. The codemod placeholder (`scripts/codemods/flip-affiliate-aid.mjs`) is wired to do steps 2-3 in Phase 6 monitoring.
- **For Klook + GoCity re-activation:** Quarterly review per `data/affiliate-status.json` lastReviewedAt. When SKU coverage materializes (Klook >50 Israel tours, GoCity launches Israel pass), rewrite the stub bodies to real helpers, flip state to `'pending'`, and add 4 tests per the AFF-03 contract.

## Next Phase Readiness

**Wave 4 complete. Wave 5 (plans 07 quality-profiles + 08 seo-config) is unblocked.**

**Ready for downstream plans:**

- **Plan 07 (quality profiles):** the 5 profile objects can now reference affiliate count thresholds (`REGION_CANONICAL: 5+ affiliates`, `SUB_DESTINATION: 1+`). The audit dashboard rule that counts affiliates per page (plan 10 AUD-009 territory) will use `document.querySelectorAll('[data-component="affiliate-card"]')` to find them — every wired card carries that data-attribute.
- **Plan 08 (SEO config):** sitemap + canonical generators can ignore affiliate URLs entirely (they're external `<a href>` not internal routes). No coupling required.
- **Plan 09 (NER detection):** can `import { allPartners } from '@/lib/affiliate'` if it ever needs to disambiguate partner-name mentions in MDX (e.g., distinguish "Hostelworld" the partner from "hostel world" the noun phrase). Not strictly required for v1 NER scope.
- **Plan 10 (audit dashboard):**
  - AUD-009 scanner: `document.querySelectorAll('[data-component="affiliate-card"]')` finds every monetized card; cross-references the immediately-preceding `[data-component="affiliate-disclosure"]` element to verify AFF-06 DOM-precedence.
  - AUD-031 affiliate-coverage rule: counts unique partner values from `[data-partner]` attribute per page; compares against quality profile threshold (REGION_CANONICAL ≥5).
  - AUD-032 affiliate-status drift rule: reads `data/affiliate-status.json` + `data/affiliate-availability.json`; flags any entry where `appliedAt` is >30 days old without an `aidReceivedAt` value (drives quarterly Klook/GoCity re-review).
- **Plan 11 (Lighthouse CI):** affiliate links carry `rel="sponsored nofollow noopener"` already; Lighthouse SEO category passes the "links have descriptive text" check because AffiliateCard's default label includes partner + destination.

**Notes for Phase 2:**

- **Region MDX:** can now import `{ bookingLink, civitatisLink, ... }` from `@/lib/affiliate` and pass URLs to `<AffiliateCard partner=... destination=...>` props. The MDX author NEVER writes a raw partner URL — ESLint rule 3 blocks it site-wide except in `lib/affiliate/**`.
- **Argentina lesson #2 fixed:** helpers are symmetric. Each region MDX can mix-and-match all 9 real partners without code changes. The 92%-domination failure mode is structurally prevented because every partner has the same helper contract and the same data-component-attribute footprint for audit scanning.

## Self-Check

Verifications performed:

| Check                                                                           | Command                                                                                                               | Result                      |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Task 1 commit exists                                                            | git log --oneline                                                                                                     | FOUND `76e7688`             |
| Task 2 commit exists                                                            | git log --oneline                                                                                                     | FOUND `5d4b7d5`             |
| Task 3 commit exists                                                            | git log --oneline                                                                                                     | FOUND `324ca1f`             |
| 9 real helper source files exist                                                | ls lib/affiliate/{booking,civitatis,viator,getYourGuide,rentalcars,safetyWing,skyscanner,hostelworld,discoverCars}.ts | FOUND 9/9                   |
| 2 stub helper source files exist                                                | ls lib/affiliate/{klook,goCity}.ts                                                                                    | FOUND 2/2                   |
| types.ts + availability.ts + index.ts exist                                     | ls lib/affiliate/{types,availability,index}.ts                                                                        | FOUND 3/3                   |
| 12 helper test files exist (9 real + 2 stub + 1 availability)                   | ls lib/affiliate/\_\_tests\_\_/                                                                                       | FOUND 12/12                 |
| data/affiliate-availability.json + data/affiliate-status.json exist             | ls data/affiliate-\*.json                                                                                             | FOUND 2/2                   |
| 9 partner-URL fixtures exist                                                    | ls tests/eslint-fixtures/raw-partner-url-\*.tsx                                                                       | FOUND 9/9                   |
| affiliate-fixtures.test.ts exists                                               | ls tests/eslint-fixtures/affiliate-fixtures.test.ts                                                                   | FOUND                       |
| AffiliateCard.tsx no longer contains `#TODO-PLAN-06`                            | grep `#TODO-PLAN-06` components/travel/AffiliateCard.tsx                                                              | NOT FOUND (correct)         |
| AffiliateCard.tsx imports from `@/lib/affiliate`                                | grep `@/lib/affiliate` components/travel/AffiliateCard.tsx                                                            | FOUND                       |
| scripts/codemods/flip-affiliate-aid.mjs placeholder exists                      | ls scripts/codemods/flip-affiliate-aid.mjs                                                                            | FOUND                       |
| .env.example carries Conflict D header                                          | grep `Conflict D` .env.example                                                                                        | FOUND                       |
| .env.example carries Travelpayouts marker (AFF-08)                              | grep `TRAVELPAYOUTS_MARKER` .env.example                                                                              | FOUND                       |
| `pnpm test --run lib/affiliate` — 48/48 pass                                    | manual run                                                                                                            | PASS                        |
| `pnpm test --run tests/eslint-fixtures/affiliate-fixtures.test.ts` — 10/10 pass | manual run                                                                                                            | PASS                        |
| `pnpm test --run` (full suite) — 249/249 pass                                   | manual run                                                                                                            | PASS (was 188; +61 net new) |
| `pnpm lint` exits 0 (full repo)                                                 | manual run                                                                                                            | PASS                        |
| `pnpm typecheck` exits 0                                                        | manual run                                                                                                            | PASS                        |
| `pnpm build` exits 0 with 49 static pages                                       | manual run                                                                                                            | PASS                        |
| AffiliateDisclosure renders inline (AFF-06)                                     | affiliatecard.test.tsx — `compareDocumentPosition` assertion                                                          | PASS                        |
| Klook + GoCity render null (Conflict D)                                         | affiliatecard.test.tsx — `partner='klook'` / `partner='goCity'` → null                                                | PASS                        |

## Self-Check: PASSED

All 22 checks pass.

---

_Phase: 01-foundation-m1_
_Plan: 06 (affiliate-helpers)_
_Completed: 2026-05-11_
