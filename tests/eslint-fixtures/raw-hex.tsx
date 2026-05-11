// INTENTIONAL VIOLATION — confirms ESLint Layer A (`no-restricted-syntax`
// regex against `className=".*\[#[0-9a-fA-F]{3,8}\]"`) fires.
//
// Spec: VALIDATION row AFF-05 (fixture fires).
// Plan:  01-02-design-tokens (Task 2).
//
// DO NOT FIX THIS FILE. The lint failure IS the test.
// `pnpm lint tests/eslint-fixtures/raw-hex.tsx` MUST exit non-zero.
//
// Companion clean fixture (proves rule is SPECIFIC, not over-broad) is
// synthesized at runtime by tests/eslint-fixtures/fixtures.test.ts using a
// temp file with `bg-[var(--color-primary)]` + `ms-4` + `text-start`.

export function RawHexViolator() {
  return (
    <div className="bg-[#abc123] text-[#fff]">
      Raw hex codes in className — should fail lint
    </div>
  );
}
