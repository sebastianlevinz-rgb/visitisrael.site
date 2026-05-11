# ESLint Fixtures — Inviolable-Rule Contract Tests

These files are **intentionally broken**. They prove the three ESLint
inviolable rules from `eslint.config.js` actually fire on real-world
violations.

| Fixture             | Rule fired                                     | Layer        | Req IDs |
| ------------------- | ---------------------------------------------- | ------------ | ------- |
| `raw-hex.tsx`       | Arbitrary hex in className (`bg-[#abc]`)       | Layer A      | AFF-05  |
| `inline-hex.tsx`    | Raw hex in inline `style={{}}`                 | Layer B      | AFF-05  |
| `physical-util.tsx` | Physical directional utility (`ml-`, `pr-`, …) | RTL hardline | I18N-03 |

## Running the contract

```bash
# Each MUST exit NON-ZERO (the lint error IS the assertion):
pnpm lint tests/eslint-fixtures/raw-hex.tsx        # AFF-05 layer A
pnpm lint tests/eslint-fixtures/inline-hex.tsx     # AFF-05 layer B
pnpm lint tests/eslint-fixtures/physical-util.tsx  # I18N-03

# Or run the Vitest suite that spawns all three plus a CLEAN fixture
# (proves the rules are SPECIFIC — `bg-[var(--color-primary)]` + `ms-4`
# + `text-start` MUST exit 0):
pnpm test --run tests/eslint-fixtures/fixtures.test.ts
```

## Why this is wired differently from normal `pnpm lint`

`tests/eslint-fixtures/**` is on the **global ignores** list in
`eslint.config.js` so that `pnpm lint` (whole-project crawl) stays
green — the project repo MUST lint clean on every commit.

To still let an **explicit** `pnpm lint <fixture>` invocation produce
the expected error, the `lint` script is dispatched through
`scripts/lint.mjs`:

- `pnpm lint` (no args) ⇒ `eslint .` — whole-repo crawl, exits 0.
- `pnpm lint <file>` ⇒ `eslint --no-warn-ignored --no-ignore <file>`
  — single-file invocation that overrides the global ignore so the
  rule fires.

## Adding a new fixture

1. Create `tests/eslint-fixtures/<name>.tsx` with the intentional violation.
2. Document the violated rule + req-ID in this table.
3. Add a Vitest spec to `fixtures.test.ts` asserting `spawnSync` exit is non-zero AND stdout matches the rule's `message` text.
4. Run `pnpm test --run tests/eslint-fixtures/fixtures.test.ts` — must go RED before fixture exists, GREEN after.

## DO NOT

- "Fix" these files — that defeats their purpose.
- Move them outside `tests/eslint-fixtures/**` — they'd break `pnpm lint`.
- Add `eslint-disable` directives — that breaks the contract.

## See also

- `eslint.config.js` — the rule definitions and the `tests/eslint-fixtures/**` global-ignore entry.
- `scripts/lint.mjs` — the dispatcher that bypasses the global ignore on explicit single-file invocation.
- `.planning/phases/01-foundation-m1/01-VALIDATION.md` — the validation rows these fixtures satisfy.
- `.planning/phases/01-foundation-m1/02-design-tokens-PLAN.md` — the plan that introduced them.
