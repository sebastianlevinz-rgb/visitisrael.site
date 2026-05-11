// INTENTIONAL VIOLATION — confirms ESLint Layer B (`no-restricted-syntax`
// against `style={{ color: '#fff' }}`-style inline hex properties) fires.
//
// Spec: VALIDATION row AFF-05 (fixture fires).
// Plan:  01-02-design-tokens (Task 2).
//
// DO NOT FIX THIS FILE. The lint failure IS the test.
// `pnpm lint tests/eslint-fixtures/inline-hex.tsx` MUST exit non-zero.

export function InlineHexViolator() {
  return (
    <div style={{ color: '#fff', backgroundColor: '#abc' }}>
      Inline-style hex — should fail lint
    </div>
  );
}
