---
phase: 01-foundation-m1
plan: 03
type: execute
wave: 2
depends_on:
  - 01-scaffold
files_modified:
  - data/photo-credits.json
  - lib/photo-credits.ts
  - lib/photo-credits-schema.ts
  - scripts/qa/check-credits.mjs
  - package.json
  - lint-staged.config.js
  - tests/photo-credits/check-credits.test.ts
  - tests/photo-credits/schema.test.ts
  - tests/photo-credits/next-config.test.ts
  - data/photo-credits-fixtures/valid-1600w.jpg
  - data/photo-credits-fixtures/undersized-800w.jpg
  - data/photo-credits-fixtures/.gitkeep
autonomous: true
requirements:
  - IMG-01
  - IMG-02
  - IMG-03
  - IMG-06
must_haves:
  truths:
    - "`data/photo-credits.json` parses against the Zod schema; empty `{}` accepted at end of Phase 1"
    - "`pnpm qa:credits` exits NON-ZERO when an image is undocumented in the ledger"
    - "`pnpm qa:credits` exits NON-ZERO when an image file on disk has no ledger entry (orphan)"
    - "`pnpm qa:credits` exits NON-ZERO when an image file width is <1200px (Sharp probe)"
    - "`pnpm qa:credits` exits NON-ZERO when `subjectType` is restricted (westernWall/holySepulchre/domeOfTheRock/bahaiGardens) but `restrictedSiteAcknowledgment` missing"
    - "`getCredit(src)` helper throws when no ledger entry exists for `src`"
    - "`next.config.ts` remotePatterns allowlists Wikimedia + Unsplash + Pexels + IGPO (gpophotoeng.gov.il)"
    - "`next/image` `deviceSizes` is [320, 640, 1024, 1600]; formats are [avif, webp]"
  artifacts:
    - path: "lib/photo-credits-schema.ts"
      provides: "Zod schema with License enum + SubjectType enum + width≥1200 + restricted-site superRefine"
      contains: "z.enum"
    - path: "lib/photo-credits.ts"
      provides: "`getCredit(src)` throws on missing entry"
      contains: "throw new Error"
    - path: "scripts/qa/check-credits.mjs"
      provides: "CI gate — walks references, walks disk, cross-refs ledger, Sharp-probes widths"
      contains: "sharp"
    - path: "data/photo-credits.json"
      provides: "Ledger file (empty `{}` at end of Phase 1; populated in Phase 2)"
      contains: "{"
  key_links:
    - from: "scripts/qa/check-credits.mjs"
      to: "lib/photo-credits-schema.ts"
      via: "Zod schema import + parse"
      pattern: "Ledger.safeParse"
    - from: "scripts/qa/check-credits.mjs"
      to: "Sharp"
      via: "metadata().width probe"
      pattern: "sharp\\(.*\\)\\.metadata"
    - from: "lint-staged.config.js"
      to: "scripts/qa/check-credits.mjs"
      via: "runs on data/photo-credits.json staged changes"
      pattern: "check-credits"
---

<objective>
Stand up the photo-credits CI gate (the highest-leverage build per SUMMARY §1.8): walks every `<Image>` reference in the codebase, cross-references against `data/photo-credits.json`, probes each image file with Sharp, FAILS BUILD on undocumented / orphaned / undersized images or missing `restrictedSiteAcknowledgment` for restricted religious sites. Ship the `getCredit(src)` helper and lock the `next.config.ts` `remotePatterns` allowlist.

Purpose: Argentina lesson #3 (image rights chaos) is fixed structurally — Phase 2 cannot import a single image without a ledger entry that passes Zod validation including license attribution and minimum width.

Output: A functional CI gate with Vitest test fixtures proving each failure mode, `data/photo-credits.json` as empty `{}`, the schema + helper exports, and ledger source allowlist enforcement.
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
@.planning/research/STACK.md
@.planning/research/PITFALLS.md
@.agents/skills/image-optimization/SKILL.md
@.agents/skills/responsive-images/SKILL.md

<interfaces>
APIs published by this plan, consumed by `<PhotoGallery>` (plan 05) and Phase 2 MDX content:

```ts
// lib/photo-credits-schema.ts
export const License: z.ZodEnum<['CC0', 'CC-BY-2.0', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'PD', 'IGPO-CC', 'OWN', 'UNSPLASH', 'PEXELS']>;
export const SubjectType: z.ZodEnum<['westernWall','holySepulchre','domeOfTheRock','bahaiGardens','religious-general','landscape','cityscape','food','people','abstract']>;
export const CreditEntry: z.ZodObject<...>; // see RESEARCH §1.5 verbatim
export const Ledger: z.ZodRecord<z.ZodString, typeof CreditEntry>;
export type CreditEntry = z.infer<typeof CreditEntry>;
```

```ts
// lib/photo-credits.ts
export function getCredit(src: string): CreditEntry; // throws Error if missing
```

```bash
# CLI
pnpm qa:credits     # = node scripts/qa/check-credits.mjs (full sweep)
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Define Zod schema, `getCredit` helper, empty ledger, install Sharp</name>
  <files>lib/photo-credits-schema.ts, lib/photo-credits.ts, data/photo-credits.json, package.json, tests/photo-credits/schema.test.ts</files>
  <behavior>
    - Test: schema accepts a fully-valid entry (CC-BY-4.0, 1600w, subjectType=landscape, no acknowledgment)
    - Test: schema REJECTS width=800 (under 1200 minimum)
    - Test: schema REJECTS license="STOLEN" (not in enum)
    - Test: schema REJECTS subjectType=westernWall WITHOUT restrictedSiteAcknowledgment field present
    - Test: schema ACCEPTS subjectType=westernWall WITH a non-empty restrictedSiteAcknowledgment
    - Test: schema ACCEPTS subjectType=landscape WITHOUT restrictedSiteAcknowledgment (optional unless restricted)
    - Test: `getCredit('/images/missing.jpg')` THROWS Error
    - Test: `getCredit('/images/known.jpg')` returns the typed entry when present
  </behavior>
  <action>
Install Sharp: `pnpm add sharp glob` (glob v10+) and `pnpm add -D @types/node`.

Create `lib/photo-credits-schema.ts` VERBATIM from RESEARCH.md §1.5 "Concrete steps" (the Zod schema with License enum, SubjectType enum, CreditEntry object, superRefine for restricted sites, and Ledger as `z.record(z.string(), CreditEntry)`).

License enum exact set: `CC0, CC-BY-2.0, CC-BY-3.0, CC-BY-4.0, CC-BY-SA-3.0, CC-BY-SA-4.0, PD, IGPO-CC, OWN, UNSPLASH, PEXELS`. This is the allowlist (IMG-06 — Wikimedia primary, IGPO supplementary, Unsplash/Pexels for abstracts).

SubjectType enum: `westernWall, holySepulchre, domeOfTheRock, bahaiGardens, religious-general, landscape, cityscape, food, people, abstract`. The first four are RESTRICTED — the superRefine adds an issue if `restrictedSiteAcknowledgment` is missing.

Create `lib/photo-credits.ts`:
```ts
import ledger from '../data/photo-credits.json';
import type { CreditEntry } from './photo-credits-schema';

export function getCredit(src: string): CreditEntry {
  const entry = (ledger as Record<string, CreditEntry>)[src];
  if (!entry) {
    throw new Error(
      `Missing photo-credits entry for "${src}". Add it to data/photo-credits.json. ` +
      `Build will fail on next pnpm qa:credits run if this image is referenced.`
    );
  }
  return entry;
}
```

Create `data/photo-credits.json` as empty `{}` (populated in Phase 2).

Create `tests/photo-credits/schema.test.ts` with all 8 behaviors above.

DO NOT yet wire the CI gate script — that's task 2.
  </action>
  <verify>
    <automated>pnpm test --run tests/photo-credits/schema.test.ts</automated>
  </verify>
  <done>Schema accepts valid entries, rejects all 4 failure modes; `getCredit` throws on missing src; `data/photo-credits.json` is empty `{}` and parses against Ledger schema; Sharp installed.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Build `scripts/qa/check-credits.mjs` CI gate + Vitest tests for all 4 failure modes</name>
  <files>scripts/qa/check-credits.mjs, package.json, tests/photo-credits/check-credits.test.ts, data/photo-credits-fixtures/valid-1600w.jpg, data/photo-credits-fixtures/undersized-800w.jpg, data/photo-credits-fixtures/.gitkeep</files>
  <behavior>
    - Test: Given empty ledger + zero references + zero files in `public/images/` → script exits 0
    - Test: Given a reference to `/images/missing.jpg` in a fixture MDX + empty ledger → script exits NON-ZERO with `UNDOCUMENTED: /images/missing.jpg`
    - Test: Given a file `public/images/orphan.jpg` on disk + empty ledger → script exits NON-ZERO with `ORPHANED: /images/orphan.jpg`
    - Test: Given a ledger entry with width=1600 but actual file width=800 (Sharp probe) → script exits NON-ZERO with `WIDTH MISMATCH` or `UNDERSIZED`
    - Test: Given a ledger entry with subjectType=westernWall and NO restrictedSiteAcknowledgment → Zod parse fails → script exits NON-ZERO
  </behavior>
  <action>
Per RESEARCH.md §1.5 "Concrete steps", create `scripts/qa/check-credits.mjs` with the full outline from the research document:

1. Read + Zod-parse `data/photo-credits.json` — collect parse errors
2. Walk source files: `glob('app/**/*.{tsx,mdx}', 'content/**/*.mdx', 'components/**/*.tsx')`; regex-match `<(Image|HeroImage|PhotoGallery)[^>]+src=["']([^"']+)["']` to collect `referenced` Set
3. Walk filesystem: `glob('public/images/**/*.{avif,webp,jpg,jpeg,png}')` → `onDisk` Set
4. Cross-check:
   - For each `referenced` src: if not in ledger → push `UNDOCUMENTED: ${src}`
   - For each `onDisk` file: if web-path not in ledger → push `ORPHANED: ${webPath}`
5. Sharp-probe each ledger entry: open file via `sharp(fsPath).metadata()`, compare `meta.width` to `entry.width`, fail on mismatch or under-1200
6. Exit non-zero if `errs.length > 0`; print all errors with `- ` prefix; clean exit prints `Photo credits check OK (N entries)`

Add `qa:credits` script in `package.json`: `"qa:credits": "node scripts/qa/check-credits.mjs"`.

Add to `lint-staged.config.js`:
```js
export default {
  '*.{ts,tsx,mjs,cjs,js}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css}': ['prettier --write'],
  'data/photo-credits.json': ['node scripts/qa/check-credits.mjs'],
};
```

Update `.husky/pre-push` to include `pnpm qa:credits` (already present from plan 01 — verify).

Create test fixture images:
- `data/photo-credits-fixtures/valid-1600w.jpg` — a legitimately ≥1200px image (any photo; Sharp probes width)
- `data/photo-credits-fixtures/undersized-800w.jpg` — an 800px-wide image
- Commit BOTH files so the test is reproducible.

Create `tests/photo-credits/check-credits.test.ts` with the 5 behaviors above. Use temp directories or staged fixtures to set up: a fake `public/images/` tree + ledger + MDX file, run the script as a subprocess, assert exit code.

IMPORTANT: The script must walk the ACTUAL `public/images/` (greenfield = empty). For tests that need fake state, the test should:
- Create a temp working dir with its own `public/images/`, `data/photo-credits.json`, and source-file fixtures
- Spawn `node scripts/qa/check-credits.mjs` with `cwd` set to the temp dir
- Assert the right error message + exit code
  </action>
  <verify>
    <automated>pnpm test --run tests/photo-credits/check-credits.test.ts &amp;&amp; pnpm qa:credits</automated>
  </verify>
  <done>All 5 failure modes proven; empty greenfield passes `pnpm qa:credits` clean; fixture images committed; pre-commit + pre-push hooks wired.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: Verify `next.config.ts` image pipeline (deviceSizes + formats + remotePatterns)</name>
  <files>tests/photo-credits/next-config.test.ts</files>
  <behavior>
    - Test: `next.config.ts` parses; `images.deviceSizes` equals `[320, 640, 1024, 1600]` exactly
    - Test: `images.formats` equals `['image/avif', 'image/webp']` exactly
    - Test: `images.remotePatterns` includes hostnames `upload.wikimedia.org` (Wikimedia primary — IMG-06), `images.unsplash.com`, `images.pexels.com`, `gpophotoeng.gov.il` (IGPO supplementary)
    - Test: `images.minimumCacheTTL` is 31536000 (1 year)
  </behavior>
  <action>
Create `tests/photo-credits/next-config.test.ts` that:
1. Imports `next.config.ts` (use dynamic import or read+parse since it may be `.ts` and tests run in jsdom)
2. Asserts the shape of `images` block per the behavior above

This is the "infrastructure verification" test — proves the image pipeline contract (IMG-03 + IMG-06) is locked.

If parsing the .ts file at test time is awkward, use a child-process approach: `pnpm exec tsx next.config.ts` and assert the exported config shape. Alternative: build the app and inspect `.next/server/server-config.json` (auto-emitted) for the image config.

This task does NOT modify `next.config.ts` — that work was done in plan 01. This task adds verification.
  </action>
  <verify>
    <automated>pnpm test --run tests/photo-credits/next-config.test.ts</automated>
  </verify>
  <done>VALIDATION row IMG-03 verification command passes; `deviceSizes`, `formats`, `remotePatterns`, `minimumCacheTTL` all match locked spec.</done>
</task>

</tasks>

<verification>
End of plan 03 checks:

1. **IMG-01**: `pnpm test tests/photo-credits/schema.test.ts --run` passes; ledger schema rejects malformed entries.
2. **IMG-02**: `pnpm qa:credits` exits non-zero on each of: missing entry, orphaned file, sub-1200 width.
3. **IMG-03**: `next.config.ts` image block matches locked spec (deviceSizes 320/640/1024/1600; formats AVIF+WebP).
4. **IMG-06**: `restrictedSiteAcknowledgment` required when `subjectType ∈ {westernWall, holySepulchre, domeOfTheRock, bahaiGardens}` — Zod superRefine enforces; tested.
5. Empty greenfield: `pnpm qa:credits` exits 0 (no references, no files).
6. Lint-staged config updated to run check-credits on `data/photo-credits.json` changes.
</verification>

<success_criteria>
- Zod schema with License/SubjectType enums + width≥1200 + restricted-site superRefine
- `getCredit(src)` helper throws on missing entries
- `scripts/qa/check-credits.mjs` CI gate fails on UNDOCUMENTED / ORPHANED / WIDTH MISMATCH / UNDERSIZED / missing acknowledgment
- Sharp installed; image probes work
- 5 Vitest tests covering all failure modes pass
- `next.config.ts` image pipeline contract verified
- Source allowlist locked (Wikimedia + Unsplash + Pexels + IGPO)
- VALIDATION rows IMG-01, IMG-02, IMG-03, IMG-06 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/03-photo-credits-SUMMARY.md` documenting: schema enum members, fixture filenames, failure mode commands, and the CI gate's role as the highest-leverage build (SUMMARY §1.8).
</output>
