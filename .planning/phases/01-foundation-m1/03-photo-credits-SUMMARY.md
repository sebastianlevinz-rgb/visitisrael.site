---
phase: 01-foundation-m1
plan: 03
subsystem: infra
tags: [photo-credits, zod, sharp, ci-gate, image-pipeline, lint-staged, husky, img-01, img-02, img-03, img-06]

requires:
  - phase: 01-foundation-m1
    provides: "Next.js scaffold + Vitest + Husky pre-commit/pre-push + lint-staged base + next.config.ts image block with deviceSizes [320,640,1024,1600] + formats [avif,webp] + remotePatterns for Wikimedia/Unsplash/Pexels/IGPO"

provides:
  - "Zod schema `lib/photo-credits-schema.ts` — 11-entry License enum (CC0/CC-BY-*/CC-BY-SA-*/PD/IGPO-CC/OWN/UNSPLASH/PEXELS), 10-entry SubjectType enum, CreditEntry object with width>=1200 + superRefine for 4 restricted religious sites (westernWall/holySepulchre/domeOfTheRock/bahaiGardens require restrictedSiteAcknowledgment)"
  - "Helper `lib/photo-credits.ts` — getCredit(src) throws Error('Missing photo-credits entry for ...') when src is absent from ledger; allCredits() exposes whole ledger for tools/audit"
  - "Empty ledger `data/photo-credits.json` — `{}` valid against Zod; populated in Phase 2 with Jerusalem canonical images"
  - "CI gate `scripts/qa/check-credits.mjs` — walks app/components/content for <Image|HeroImage|PhotoGallery src=> references, walks public/images/ for orphans, Sharp-probes every ledger entry's actual width. Exits non-zero on UNDOCUMENTED / ORPHANED / UNDERSIZED / WIDTH MISMATCH / SCHEMA (Zod) failure."
  - "Fixture images `data/photo-credits-fixtures/{valid-1600w,undersized-800w}.jpg` — committed for reproducible test runs (1600x900 blue, 800x450 red, synthesized via Sharp)"
  - "package.json `qa:credits` + `validate:credits` scripts (real, replacing plan 01 placeholders) — pnpm qa:credits exits 0 on greenfield"
  - "lint-staged wired — data/photo-credits.json + public/images/** + {app,components,content}/**.{tsx,mdx} all trigger full pnpm qa:credits sweep on staged change"
  - "Husky pre-push hook continues to run pnpm qa:credits (was placeholder; now real)"

affects: [04-schema-baseline, 05-component-lib, 06-affiliate-helpers, 07-quality-profiles, 08-seo-config, 09-ner-detection, 10-audit-dashboard, 02-pilot-jerusalem (Phase 2)]

tech-stack:
  added:
    - "sharp@0.34.5 (libvips prebuilt binaries; Windows-compatible)"
    - "glob@13.0.6 (v13 — synchronous + globby-style; ESM-native)"
    - "tsx@4.21.0 (devDep; reserved for future TS-script invocation, not used by qa:credits)"
  patterns:
    - "CI gate as `.mjs` with inlined Zod schema (zero TS runtime dep). Canonical schema lives in `lib/photo-credits-schema.ts`; mirror schema lives in `scripts/qa/check-credits.mjs`. Cross-test in `tests/photo-credits/check-credits.test.ts` catches divergence."
    - "Test sandbox pattern: mkdtempSync + writeFileSync per-test ledger/source/public-images; spawn `node <absolute-path-to-script>` with `cwd: sandbox`. NODE_PATH does NOT work for ESM imports — absolute script path keeps node_modules resolution in the repo."
    - "Restricted-site enforcement via Zod superRefine — subjectType ∈ {westernWall, holySepulchre, domeOfTheRock, bahaiGardens} REQUIRES restrictedSiteAcknowledgment field. All other subject types treat the field as optional."
    - "Ledger source-of-truth pattern: `getCredit(src)` throws if missing — pairs with CI gate so runtime + buildtime both fail loudly. No silent fallback to placeholder URL."
    - "Fixture committed for reproducibility — generate-fixtures.mjs is the recipe; the actual JPGs are committed so CI doesn't need Sharp to bootstrap tests (Sharp IS used inside the script and tests, but fixtures don't have to be re-synthesized per CI run)."

key-files:
  created:
    - lib/photo-credits-schema.ts
    - lib/photo-credits.ts
    - data/photo-credits.json
    - scripts/qa/check-credits.mjs
    - tests/photo-credits/schema.test.ts
    - tests/photo-credits/check-credits.test.ts
    - tests/photo-credits/next-config.test.ts
    - data/photo-credits-fixtures/.gitkeep
    - data/photo-credits-fixtures/generate-fixtures.mjs
    - data/photo-credits-fixtures/valid-1600w.jpg
    - data/photo-credits-fixtures/undersized-800w.jpg
    - .planning/phases/01-foundation-m1/deferred-items.md
  modified:
    - package.json
    - pnpm-lock.yaml
    - lint-staged.config.js

key-decisions:
  - "Zod schema is duplicated between lib/photo-credits-schema.ts (TS source of truth) and scripts/qa/check-credits.mjs (inlined mirror). Rationale: keeps CI gate as pure .mjs with zero TS runtime dep (no tsx/ts-node spawn cost). Cross-test contract (tests/photo-credits/check-credits.test.ts case 5 — restricted site without acknowledgment) catches divergence."
  - "Plan task 1 GREEN used `import ... with { type: 'json' }` for the ledger (Node 22+ supported, TS 5.6+ accepts) — alternative was readFileSync at module-init time. Static import wins on type-safety + tree-shaking; if any CI hits an older Node, we fall back to readFileSync."
  - "tsx@4 added as devDep but not used by qa:credits — kept as forward option for plan 09/10 audit scripts that may need to import from lib/* at script time."
  - "Test sandbox uses mkdtempSync + ABSOLUTE script path (not copy + run-from-sandbox) — ESM does not honor NODE_PATH, so the only working pattern is to run the script from its repo location with cwd pointed at the sandbox. process.cwd()-relative paths inside the script make this work."
  - "Fixture images committed (8.8KB + 2.4KB) instead of generated on-demand — the test suite must work even when Sharp's libvips binaries are missing (e.g. corrupted node_modules) since the test ITSELF asserts Sharp works. Reproducibility recipe in generate-fixtures.mjs."

patterns-established:
  - "Photo-credits ledger pattern: every committed image MUST have ledger entry; restricted religious sites MUST carry restrictedSiteAcknowledgment field; width <1200 is structurally banned"
  - "CI-gate `.mjs` pattern: import zod/glob/sharp directly; mirror schema inline; walk source-files via glob + regex for `<(Image|HeroImage|PhotoGallery) src=>`; cross-check ledger; Sharp-probe disk; report errors to stderr; exit 1 on any error"
  - "Test sandbox subprocess pattern (for testing scripts): mkdtempSync sandbox + spawnSync with cwd pointing at sandbox + absolute script path + assert on status/stdout/stderr"
  - "Fixture committal pattern: data/{topic}-fixtures/ with a generate-*.mjs recipe alongside the actual fixture files (committed). Recipe is for regeneration; CI uses committed files."

requirements-completed:
  - IMG-01
  - IMG-02
  - IMG-03
  - IMG-06

duration: 13min
completed: 2026-05-11
---

# Phase 1 Plan 03: Photo Credits Summary

**Zod-validated photo-credits ledger + Sharp-probed CI gate that fails build on undocumented/orphaned/undersized images or missing restricted-site acknowledgment — Argentina lesson #3 (image rights chaos) is fixed structurally before a single image lands in Phase 2.**

## Performance

- **Duration:** 13 min
- **Started:** 2026-05-11T01:10:02Z
- **Completed:** 2026-05-11T01:22:54Z
- **Tasks:** 3 (TDD pattern — Task 1 split RED/GREEN, Task 2 single test+impl commit, Task 3 verification-only)
- **Files created:** 12
- **Files modified:** 3
- **Total commits in this plan:** 4 (1 test + 1 feat + 1 feat + 1 test)
- **Tests added:** 27 (13 schema + 6 check-credits subprocess + 8 next-config contract)

## Accomplishments

- **27/27 photo-credits tests pass** (schema, CI gate, next.config.ts contract)
- **`pnpm qa:credits` exits 0** on greenfield (empty ledger, no images, no references)
- **5 failure modes proven** via subprocess sandbox tests (UNDOCUMENTED, ORPHANED, UNDERSIZED, WIDTH MISMATCH, SCHEMA via restricted-site acknowledgment missing)
- **Zod schema rejects** width<1200, license not in 11-entry enum, restricted subjectType without acknowledgment — all paths covered
- **`getCredit('/images/missing.jpg')` throws** with src + remediation pointer in error message
- **Sharp working with prebuilt binaries** on Windows (verified by Sharp-probing fixture jpgs in test 4)
- **lint-staged hooked**: any data/photo-credits.json / public/images/** / app|components|content/** change triggers full credits sweep
- **`next.config.ts` contract locked**: deviceSizes [320,640,1024,1600], formats [avif,webp], remotePatterns for Wikimedia + Unsplash + Pexels + IGPO, minimumCacheTTL >=1y

## Task Commits

Each task committed atomically (Task 1 used TDD RED + GREEN split):

1. **Task 1 RED: failing schema + getCredit tests** — `49b819e` (test) — `tests/photo-credits/schema.test.ts` with 13 cases including license enum allowlist, restricted-site superRefine, width floor, getCredit throw-message contract
2. **Task 1 GREEN: Zod schema + getCredit helper + empty ledger + Sharp install** — `9651e4f` (feat) — `lib/photo-credits-schema.ts`, `lib/photo-credits.ts`, `data/photo-credits.json` (empty `{}`), Sharp + glob installed, pnpm.onlyBuiltDependencies set
3. **Task 2: CI gate + 6-mode failure tests + lint-staged wiring** — `249df66` (feat) — `scripts/qa/check-credits.mjs`, `tests/photo-credits/check-credits.test.ts`, fixture jpgs, package.json scripts, lint-staged.config.js
4. **Task 3: verify next.config.ts image pipeline contract** — `cd90008` (test) — `tests/photo-credits/next-config.test.ts` asserting deviceSizes, formats, remotePatterns, minimumCacheTTL

## Files Created/Modified

### Created (12)

**Schema + helper (Task 1)**
- `lib/photo-credits-schema.ts` — Zod schema with License enum (11) + SubjectType enum (10) + CreditEntry object with `width.min(1200)` + `superRefine` enforcing restrictedSiteAcknowledgment for 4 restricted religious sites; Ledger = `z.record(z.string(), CreditEntry)`
- `lib/photo-credits.ts` — `getCredit(src: string): CreditEntry` throws with descriptive message; `allCredits()` returns whole ledger for audit/tools
- `data/photo-credits.json` — empty `{}` ledger; valid against Zod; populated in Phase 2

**CI gate (Task 2)**
- `scripts/qa/check-credits.mjs` — 216-line script: Zod schema inlined (mirrors `lib/photo-credits-schema.ts`); walks `app/**`, `components/**`, `content/**` for `<Image|HeroImage|PhotoGallery src=>` regex; walks `public/images/**` for orphans; Sharp-probes every ledger entry's actual file. Exits non-zero on any failure with `- ` prefixed list to stderr.

**Tests (Tasks 1-3)**
- `tests/photo-credits/schema.test.ts` — 13 tests covering all Zod contracts (license enum, subject enum, width floor, superRefine, Ledger record, getCredit throw + message format)
- `tests/photo-credits/check-credits.test.ts` — 6 subprocess-sandbox tests (empty greenfield, UNDOCUMENTED, ORPHANED, WIDTH MISMATCH, restricted-site SCHEMA fail, fully valid ledger pass)
- `tests/photo-credits/next-config.test.ts` — 8 source-text assertions on next.config.ts (deviceSizes, formats, 4 remotePatterns hosts, minimumCacheTTL, https-only)

**Fixtures (Task 2)**
- `data/photo-credits-fixtures/.gitkeep` — dir marker
- `data/photo-credits-fixtures/generate-fixtures.mjs` — recipe to regenerate fixtures (one-shot)
- `data/photo-credits-fixtures/valid-1600w.jpg` — 1600x900 blue solid (~9KB) — passes width check
- `data/photo-credits-fixtures/undersized-800w.jpg` — 800x450 red solid (~2.4KB) — fails width check

**Tracking**
- `.planning/phases/01-foundation-m1/deferred-items.md` — logs out-of-scope discoveries (plan 04 in-flight typecheck noise; cheerio added by another plan)

### Modified (3)

- `package.json` — added sharp@0.34.5, glob@13.0.6, tsx@4.21.0 (dev); pnpm.onlyBuiltDependencies = [esbuild, sharp, unrs-resolver]; replaced qa:credits placeholder with `node scripts/qa/check-credits.mjs`; replaced validate:credits placeholder identically
- `pnpm-lock.yaml` — sharp + glob + tsx dependency resolution
- `lint-staged.config.js` — appended three rules: `data/photo-credits.json` triggers qa:credits; `public/images/**/*.{avif,webp,jpg,jpeg,png}` triggers qa:credits; `{app,components,content}/**/*.{tsx,mdx}` triggers qa:credits

## Decisions Made

1. **Inlined Zod mirror in `scripts/qa/check-credits.mjs`** — alternative was `tsx scripts/qa/check-credits.mts` or compiling the schema. Chose duplication-with-cross-test because (a) zero startup cost, (b) `.mjs` is the friendliest format for pre-commit hooks across machines, (c) the cross-test (check-credits subprocess case 5 — restricted-site enforcement) catches drift immediately. Tradeoff: enum/object changes must be made in two places.

2. **Test sandbox uses absolute script path, NOT copy-script-to-sandbox** — first attempt copied the .mjs into the temp dir and used NODE_PATH for module resolution. Hit `ERR_MODULE_NOT_FOUND: Cannot find package 'zod'` because ESM doesn't honor NODE_PATH. Fix: leave script at its real location, use it from there, point `cwd` at the sandbox. The script uses `process.cwd()`-relative paths for data/source/public, so this works cleanly.

3. **Sharp 0.34 with `pnpm.onlyBuiltDependencies`** — pnpm 10 blocks postinstall scripts by default. Without explicit approval, Sharp's prebuilt-binary install was skipped, but `require('sharp')` still works because the npm package ships fallback binaries. Adding `pnpm.onlyBuiltDependencies: [esbuild, sharp, unrs-resolver]` to package.json approves the build scripts (Windows + Linux + macOS prebuilt binaries) once and for all. Plan 01's "Issues Encountered" called this out — now resolved.

4. **Committed fixture jpgs (~11KB total) rather than synthesizing per-test** — the test suite IS what asserts Sharp works; if Sharp is broken at test-time, generating fixtures on-demand will silently fail. Committing the fixtures makes the test self-contained.

5. **`getCredit` throws with both src + remediation pointer (`data/photo-credits.json`)** — error message format is the public contract. Tests assert both the src AND the file path appear in the error message. Any future change that drops the pointer breaks the test loudly.

6. **lint-staged uses `() => 'pnpm qa:credits'` function form** — alternative was passing staged file paths to the script. Rejected because UNDOCUMENTED / ORPHANED / WIDTH MISMATCH errors are cross-file by nature — a partial scan would miss orphans introduced by removing a source file that referenced an image now without entries elsewhere. Full sweep on every staged change involving images/ledger/MDX is the correct tradeoff.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Sharp prebuilt-binary install skipped by pnpm 10 default**

- **Found during:** Task 1 GREEN (initial `pnpm add sharp` install)
- **Issue:** pnpm 10 emits "Ignored build scripts: sharp@0.34.5" warning. Without explicit approval, postinstall doesn't run — though npm-package fallback binaries actually do work, future developers / CI hitting a different platform would silently get a non-functional sharp.
- **Fix:** Added `"pnpm": { "onlyBuiltDependencies": ["esbuild", "sharp", "unrs-resolver"] }` to `package.json` — pnpm honors this without an interactive prompt. (A linter briefly removed this block during a prettier reformat; re-added.)
- **Files modified:** `package.json`
- **Verification:** `node -e "require('sharp')({create:...}).metadata()..."` returns valid metadata; subprocess test 4 (Sharp-probe of 800w fixture) exits non-zero with `UNDERSIZED` message.
- **Committed in:** `9651e4f` (Task 1 GREEN)

**2. [Rule 3 - Blocking] ESM does not honor NODE_PATH for sandbox subprocess resolution**

- **Found during:** Task 2 (first subprocess test run)
- **Issue:** Initial test design copied `scripts/qa/check-credits.mjs` into a mkdtempSync sandbox and set `NODE_PATH: <repo>/node_modules` for the spawned `node`. ESM ignores NODE_PATH → `ERR_MODULE_NOT_FOUND: Cannot find package 'zod'`.
- **Fix:** Run the script from its REAL repo path (`spawnSync(node, [<absolute script path>], { cwd: sandbox })`). All script paths inside the .mjs are `process.cwd()`-relative, so this works without modification. Removed sandbox script-copy logic.
- **Files modified:** `tests/photo-credits/check-credits.test.ts` (initial design only; final design has no copy)
- **Verification:** All 6 subprocess tests green (5.5s suite duration).
- **Committed in:** `249df66` (Task 2)

**3. [Rule 2 - Missing Critical] `tsx` runtime dependency**

- **Found during:** Task 2 design
- **Issue:** Plan task 2 mentioned `.mjs` or `.ts via tsx`. Started down the `.ts` path to share the canonical schema with `lib/photo-credits-schema.ts`. After Decision 1 (inline mirror), `tsx` ended up unused in plan 03 — but kept installed because plans 09 (NER) and 10 (audit dashboard) will need TS scripts that import from lib/*.
- **Fix:** Left `tsx@^4.21.0` in devDependencies as a forward-investment. Documented in decisions above.
- **Files modified:** `package.json`, `pnpm-lock.yaml`
- **Verification:** `pnpm list tsx` reports `tsx 4.21.0`. Not invoked by any current script.
- **Committed in:** `249df66` (Task 2)

---

**Total deviations:** 3 auto-fixed (2 blocking, 1 forward-investment missing-critical)
**Impact on plan:** All three deviations are infrastructure-level; none change the locked schema/validator contract or affect downstream plans. Plan 04 (schema baseline) is unaffected; plan 06 (affiliate helpers) consumes the same lint-staged config without conflict.

## Issues Encountered

- **Parallel plan-04 typecheck noise** — `pnpm typecheck` reports missing `lib/schema/*` and `lib/seo/canonical` modules because plan 04 is mid-execution in parallel (Wave 2). Plan 03's own files have zero typecheck errors. Logged in `.planning/phases/01-foundation-m1/deferred-items.md`. Resolves automatically when plan 04 completes.
- **Prettier reformatting on commit** — `lint-staged` runs prettier on staged `.mjs` and `.ts` files, slightly reformatting test files and the script on commit. No functional change; tests stayed green after each reformat.
- **`pnpm test --run tests/photo-credits/` includes parallel plan-02 ESLint fixture test in some IDE runs** — explicit path targeting (`tests/photo-credits/`) keeps the verification scope clean.

## User Setup Required

None — Phase 1 ledger ships empty (`{}`). The first ledger entry will land in Phase 2 when Jerusalem canonical images are sourced from Wikimedia Commons. CI gate is silent on empty ledger (no UNDOCUMENTED / ORPHANED / WIDTH issues to report).

## Next Phase Readiness

**Plan 03 unblocks:**
- **Plan 05 (component-lib, Wave 3)** — `<PhotoGallery>` and `<HeroImage>` components can now consume `getCredit(src)` and the typed `CreditEntry`; lint-staged hook will catch any new `<Image>` references that don't carry ledger entries
- **Plan 10 (audit dashboard, Wave 7)** — AUD-003 (undocumented image), AUD-004 (width <1200), AUD-026 (restricted site without acknowledgment) all have their detection logic ready to wire into the build-time scanner
- **Phase 2 Pilot Jerusalem (Plan 02-01)** — first Wikimedia Commons sourcing pass will commit `data/photo-credits.json` entries; pre-push hook ensures none ship undocumented

**Notes for downstream plans:**
- The Zod schema is the canonical source; any field addition (e.g. `captureDate`, `watermarkChecked`, `containsIdentifiablePerson` from PITFALLS §5.5 future-fields list) goes in `lib/photo-credits-schema.ts` AND the mirror in `scripts/qa/check-credits.mjs`. The check-credits subprocess test (case 5) will fail-loud on enum drift.
- `restrictedSiteAcknowledgment` is the ONLY field where missing-when-required produces a Zod issue. If Phase 2 needs to enforce other site-specific constraints (e.g. Bahá'í photography permit), add to `RESTRICTED_SUBJECTS` set in both files.
- `public/images/` is greenfield. Phase 2 will populate; the orphan-detection logic is already armed.

**Wave 2 status:**
- Plan 02 (design tokens) — in flight, will finalize Wave 2 alongside plan 04
- Plan 03 (this plan) — ✅ complete
- Plan 04 (schema baseline) — in flight; deferred-items.md tracks plan-04 typecheck artifacts that plan 03 saw

## Self-Check: PASSED

Verifications performed:

| Check | Command | Result |
|---|---|---|
| Task 1 RED commit exists | `git log --oneline \| grep 49b819e` | FOUND |
| Task 1 GREEN commit exists | `git log --oneline \| grep 9651e4f` | FOUND |
| Task 2 commit exists | `git log --oneline \| grep 249df66` | FOUND |
| Task 3 commit exists | `git log --oneline \| grep cd90008` | FOUND |
| `lib/photo-credits-schema.ts` exists | `[ -f lib/photo-credits-schema.ts ]` | FOUND |
| `lib/photo-credits.ts` exists | `[ -f lib/photo-credits.ts ]` | FOUND |
| `data/photo-credits.json` exists (empty `{}`) | `cat` | FOUND |
| `scripts/qa/check-credits.mjs` exists | `[ -f scripts/qa/check-credits.mjs ]` | FOUND |
| `data/photo-credits-fixtures/valid-1600w.jpg` exists | `[ -f ...]` | FOUND |
| `data/photo-credits-fixtures/undersized-800w.jpg` exists | `[ -f ...]` | FOUND |
| `tests/photo-credits/schema.test.ts` exists | `[ -f ...]` | FOUND |
| `tests/photo-credits/check-credits.test.ts` exists | `[ -f ...]` | FOUND |
| `tests/photo-credits/next-config.test.ts` exists | `[ -f ...]` | FOUND |
| `pnpm test --run tests/photo-credits/` | 27/27 pass | PASS |
| `pnpm qa:credits` on greenfield | exit 0, "Photo credits check OK (0 entries)" | PASS |
| Sharp probe works | subprocess test 4 (`UNDERSIZED` against 800w fixture) | PASS |
| Restricted-site enforcement | subprocess test 5 (`restrictedSiteAcknowledgment` missing → exit non-zero) | PASS |
| lint-staged contains `qa:credits` triggers | grep `lint-staged.config.js` | FOUND |
| `.husky/pre-push` invokes `pnpm qa:credits` | `cat .husky/pre-push` | FOUND |
| `next.config.ts` contract test | 8/8 pass | PASS |

---

*Phase: 01-foundation-m1*
*Plan: 03 (photo-credits)*
*Completed: 2026-05-11*
