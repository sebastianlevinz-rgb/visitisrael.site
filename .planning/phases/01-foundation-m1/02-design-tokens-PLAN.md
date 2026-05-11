---
phase: 01-foundation-m1
plan: 02
type: execute
wave: 2
depends_on:
  - 01-scaffold
files_modified:
  - app/globals.css
  - tailwind.config.ts
  - tests/eslint-fixtures/raw-hex.tsx
  - tests/eslint-fixtures/inline-hex.tsx
  - tests/eslint-fixtures/physical-util.tsx
  - tests/eslint-fixtures/README.md
  - app/[locale]/admin/tokens/page.tsx
  - tests/eslint-fixtures/fixtures.test.ts
autonomous: true
requirements:
  - FND-02
  - I18N-03
  - AFF-05
must_haves:
  truths:
    - "3-layer token system (foundation, semantic, component) is defined in `@theme`"
    - "Hebrew font stack + Hebrew leading scale present in foundation layer"
    - "`pnpm lint tests/eslint-fixtures/raw-hex.tsx` exits NON-ZERO (Layer A — tailwindcss/no-arbitrary-value fires)"
    - "`pnpm lint tests/eslint-fixtures/inline-hex.tsx` exits NON-ZERO (Layer B — inline style hex caught)"
    - "`pnpm lint tests/eslint-fixtures/physical-util.tsx` exits NON-ZERO (physical directional util caught)"
    - "`/admin/tokens/` route renders every semantic token visually for design review"
  artifacts:
    - path: "app/globals.css"
      provides: "3-layer Tailwind v4 `@theme` token system"
      contains: "@theme"
    - path: "tests/eslint-fixtures/raw-hex.tsx"
      provides: "Intentional violation file proving ESLint Layer A fires"
      contains: "bg-[#"
    - path: "tests/eslint-fixtures/inline-hex.tsx"
      provides: "Intentional violation file proving ESLint Layer B fires"
      contains: "style={{"
    - path: "tests/eslint-fixtures/physical-util.tsx"
      provides: "Intentional violation file proving RTL rule fires"
      contains: "ml-"
    - path: "app/[locale]/admin/tokens/page.tsx"
      provides: "Visual token review route (noindex)"
      contains: "color-primary"
  key_links:
    - from: "app/globals.css"
      to: "Hebrew Tailwind preset (hebrew-tailwind-preset skill)"
      via: "font-hebrew + leading-hebrew tokens"
      pattern: "--font-hebrew"
    - from: "semantic layer (--color-primary)"
      to: "foundation layer (--color-blue-700)"
      via: "CSS var indirection"
      pattern: "var\\(--color-blue-"
---

<objective>
Materialize the 3-layer Tailwind v4 `@theme` token system (foundation → semantic → component), apply the Hebrew Tailwind preset (font stack + leading-hebrew scale), and verify that ESLint Layer A (`tailwindcss/no-arbitrary-value`), Layer B (`no-restricted-syntax` inline hex), and the physical-directional-utility rule all fire on test fixtures.

Purpose: This fixes Argentina lessons #1 (raw hex codes everywhere) and #9 (physical directional utilities breaking RTL) at the linting layer — components written from plan 05 onward CANNOT use raw hex or physical directional utilities, by construction.

Output: Working 3-layer token system, three ESLint test fixtures that exit non-zero proving the rules fire, and a `/admin/tokens/` visual review route.
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
@.planning/research/ARCHITECTURE.md
@.agents/skills/hebrew-tailwind-preset/SKILL.md
@.agents/skills/hebrew-tailwind-preset/references/rtl-config.md
@.agents/skills/tailwind-design-system/SKILL.md
@.agents/skills/tailwind-design-system/references/advanced-patterns.md

<interfaces>
Tokens published by this plan, consumed by all components in plan 05:

```css
/* Semantic layer — components MUST consume these, not foundation directly */
--color-primary, --color-primary-hover
--color-accent
--color-surface, --color-surface-elevated
--color-ink, --color-ink-muted
--color-border
--color-success, --color-warning, --color-danger

/* Hebrew fonts */
--font-hebrew  (Heebo + Assistant + Noto Sans Hebrew)
--font-hebrew-serif  (Frank Ruhl Libre)

/* Hebrew leading */
--leading-hebrew-tight, --leading-hebrew, --leading-hebrew-relaxed
```

Components in plan 05 consume these via `bg-[var(--color-primary)]` or via CVA-mapped classes — never raw hex.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Populate `app/globals.css` 3-layer `@theme` block + minimal `tailwind.config.ts` stub</name>
  <files>app/globals.css, tailwind.config.ts</files>
  <action>
Per RESEARCH.md §1.2 "Concrete steps", populate `app/globals.css` with the COMPLETE 3-layer token block:

**Layer 1 — Foundation** (raw OKLCH ramps, no semantic meaning):
- `--color-stone-50` through `--color-stone-950` (11 stops)
- `--color-blue-50` through `--color-blue-950`
- `--color-sand-50` through `--color-sand-950` (Israeli earth-tone — see ARCHITECTURE §5.1)
- `--color-olive-50` through `--color-olive-950`
- Spacing scale: `--spacing-1` through `--spacing-12` + named: `--spacing-section`, `--spacing-card`, `--spacing-hero`
- Radius scale: `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`
- Hebrew fonts (verbatim from `hebrew-tailwind-preset/references/rtl-config.md`):
  - `--font-hebrew: 'Heebo', 'Assistant', 'Noto Sans Hebrew', sans-serif`
  - `--font-hebrew-serif: 'Frank Ruhl Libre', 'David Libre', serif`
  - `--font-mono: 'Fira Code', 'Source Code Pro', monospace`
- Hebrew leading scale:
  - `--leading-hebrew-tight: 1.4`
  - `--leading-hebrew: 1.7`
  - `--leading-hebrew-relaxed: 1.9`

**Layer 2 — Semantic** (purpose-driven; consumed by components):
- `--color-primary: var(--color-blue-700)`
- `--color-primary-hover: var(--color-blue-800)`
- `--color-accent: var(--color-sand-600)`
- `--color-surface: var(--color-stone-50)`
- `--color-surface-elevated: white`
- `--color-ink: var(--color-stone-900)`
- `--color-ink-muted: var(--color-stone-600)`
- `--color-border: var(--color-stone-200)`
- `--color-success: var(--color-olive-600)`
- `--color-warning: var(--color-sand-700)`
- `--color-danger: oklch(0.55 0.22 30)`

**Layer 3 — Component** (only where component has unique need):
- `--button-bg-primary: var(--color-primary)`
- `--button-text-primary: white`
- `--card-bg: var(--color-surface-elevated)`
- `--card-border: var(--color-border)`
- `--hero-overlay: oklch(0 0 0 / 0.35)`

CRITICAL: All color values in foundation layer use OKLCH (perceptual uniformity). Semantic + component layers reference foundation via `var(...)` — never raw hex or OKLCH at semantic/component layer.

Create `tailwind.config.ts` as a minimal stub:
```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  // Tailwind v4 reads tokens from @theme in CSS — config file holds content paths + plugin slots only
  plugins: [],
} satisfies Config;
```

(File exists as a stub to satisfy `eslint-plugin-tailwindcss` plugin compatibility per RESEARCH §5 Open Question 1.)
  </action>
  <verify>
    <automated>pnpm build &amp;&amp; node -e "const fs=require('fs'); const css=fs.readFileSync('app/globals.css','utf8'); if (!css.includes('--font-hebrew')) process.exit(1); if (!css.includes('--color-primary')) process.exit(1); if (!css.includes('var(--color-blue-')) process.exit(1); console.log('3-layer tokens OK');"</automated>
  </verify>
  <done>`app/globals.css` contains all 3 layers; foundation in OKLCH; semantic references foundation via `var()`; Hebrew font + leading tokens present; `pnpm build` succeeds.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Create ESLint failure fixtures proving Layer A + Layer B + RTL rule fire</name>
  <files>tests/eslint-fixtures/raw-hex.tsx, tests/eslint-fixtures/inline-hex.tsx, tests/eslint-fixtures/physical-util.tsx, tests/eslint-fixtures/README.md, tests/eslint-fixtures/fixtures.test.ts</files>
  <behavior>
    - Test: `pnpm lint tests/eslint-fixtures/raw-hex.tsx` exits NON-ZERO with rule `tailwindcss/no-arbitrary-value` triggered
    - Test: `pnpm lint tests/eslint-fixtures/inline-hex.tsx` exits NON-ZERO with rule `no-restricted-syntax` triggered (inline style hex)
    - Test: `pnpm lint tests/eslint-fixtures/physical-util.tsx` exits NON-ZERO with rule `no-restricted-syntax` triggered (physical util)
    - Test: A clean file using `bg-[var(--color-primary)]` and `ms-4` lints CLEAN (Vitest assertion via shell-out)
  </behavior>
  <action>
Per RESEARCH.md §1.2 "ESLint fixture verification commands":

Create `tests/eslint-fixtures/raw-hex.tsx`:
```tsx
// INTENTIONAL VIOLATION — confirms tailwindcss/no-arbitrary-value fires.
// `pnpm lint tests/eslint-fixtures/raw-hex.tsx` MUST exit non-zero.
export function RawHexViolator() {
  return <div className="bg-[#abc123] text-[#fff]">Should fail lint</div>;
}
```

Create `tests/eslint-fixtures/inline-hex.tsx`:
```tsx
// INTENTIONAL VIOLATION — confirms no-restricted-syntax inline-hex fires.
export function InlineHexViolator() {
  return <div style={{ color: '#fff', backgroundColor: '#abc' }}>Should fail lint</div>;
}
```

Create `tests/eslint-fixtures/physical-util.tsx`:
```tsx
// INTENTIONAL VIOLATION — confirms RTL physical directional util ban fires.
export function PhysicalUtilViolator() {
  return <div className="ml-4 pr-2 text-left border-l-2 rounded-l">Should fail lint</div>;
}
```

Create `tests/eslint-fixtures/README.md` documenting:
- Purpose: prove ESLint rules fire on violations
- Each fixture is intentionally broken
- Run `pnpm lint tests/eslint-fixtures/<file>` — expect NON-ZERO exit
- DO NOT fix these files; they are the lint contract proof
- Reference: VALIDATION.md rows for AFF-05 + I18N-03

Create `tests/eslint-fixtures/fixtures.test.ts` — Vitest test that:
- Spawns `pnpm lint tests/eslint-fixtures/raw-hex.tsx`, expects exit code !== 0
- Spawns `pnpm lint tests/eslint-fixtures/inline-hex.tsx`, expects exit code !== 0
- Spawns `pnpm lint tests/eslint-fixtures/physical-util.tsx`, expects exit code !== 0
- Spawns `pnpm lint` on a clean inline fixture using `bg-[var(--color-primary)]` + `ms-4`, expects exit code === 0 (confirms `var()` arbitrary values are allowed and logical utils pass)

CRITICAL: The clean-fixture assertion proves the rules are SPECIFIC (catch raw hex but allow `var(...)` references — see RESEARCH §1.3 "Note on `bg-[var(...)]`").

Add `tests/eslint-fixtures/**` to an ESLint ignore exception or use the existing escape hatch — fixtures must be lintable (not auto-excluded) for the test to work.
  </action>
  <verify>
    <automated>pnpm test --run tests/eslint-fixtures/fixtures.test.ts</automated>
  </verify>
  <done>All three fixtures cause ESLint to exit non-zero; clean fixture (using `var()` + logical utils) exits zero. VALIDATION rows AFF-05 + I18N-03 verification commands all pass.</done>
</task>

<task type="auto">
  <name>Task 3: Create `/admin/tokens/` visual token review route (noindex)</name>
  <files>app/[locale]/admin/tokens/page.tsx</files>
  <action>
Per RESEARCH.md §1.2: Create `app/[locale]/admin/tokens/page.tsx` as an RSC that visually renders EVERY semantic + component token:

- Color section: render swatches for `--color-primary`, `--color-accent`, `--color-surface`, `--color-surface-elevated`, `--color-ink`, `--color-ink-muted`, `--color-border`, `--color-success`, `--color-warning`, `--color-danger`. Each swatch shows the token name + computed color sample.
- Typography section: render samples in `--font-hebrew` (Heebo) and `--font-hebrew-serif` (Frank Ruhl Libre) at multiple sizes; show `--leading-hebrew-tight`, `--leading-hebrew`, `--leading-hebrew-relaxed` applied to Hebrew text samples (`לורם איפסום` paragraph).
- Spacing section: visualize `--spacing-1` through `--spacing-12` as horizontal bars.
- Component-layer section: render a sample button using `--button-bg-primary` and a sample card using `--card-bg` + `--card-border`.

Page-level metadata MUST emit `<meta name="robots" content="noindex">` via Next's `Metadata` export:
```ts
export const metadata = { robots: { index: false, follow: false } };
```

Use only logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) and semantic tokens — page itself must lint clean.

This route is part of the design-review workflow; it is NOT linked from any public navigation. It will gain basic-auth in plan 10 (audit dashboard middleware).
  </action>
  <verify>
    <automated>pnpm build &amp;&amp; pnpm lint app/[locale]/admin/tokens/page.tsx</automated>
  </verify>
  <done>Route renders without error; built HTML contains `<meta name="robots" content="noindex">`; page lints clean (no raw hex, no physical utils — proves the design system can be consumed correctly).</done>
</task>

</tasks>

<verification>
End of plan 02 checks (executed by gsd-verifier):

1. **FND-02**: `app/globals.css` contains 3 distinct layers; semantic tokens reference foundation via `var()`; zero raw hex outside foundation layer.
2. **I18N-03 (rule layer)**: `pnpm lint tests/eslint-fixtures/physical-util.tsx` exits non-zero.
3. **AFF-05**: `pnpm lint tests/eslint-fixtures/raw-hex.tsx` AND `pnpm lint tests/eslint-fixtures/inline-hex.tsx` both exit non-zero.
4. Clean fixture using `bg-[var(--color-primary)]` + `ms-4` exits 0 (proves rules are specific, not over-broad).
5. `/admin/tokens/` route reachable and emits noindex robots meta.
</verification>

<success_criteria>
- 3-layer token system in `app/globals.css` with foundation (OKLCH ramps), semantic (purpose-driven), component (button/card)
- Hebrew Tailwind preset applied (font + leading scale)
- Three ESLint fixtures exit non-zero (proves Layer A + Layer B + RTL rules fire)
- `/admin/tokens/` route renders all semantic + component tokens
- `pnpm lint app/` exits 0 (production code uses tokens correctly)
- VALIDATION rows FND-02, I18N-03, AFF-05 all green
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-m1/02-design-tokens-SUMMARY.md` summarizing: token names finalized (primary vs brand vs accent decision), fixture commands documented for downstream verification, and `/admin/tokens/` URL.
</output>
