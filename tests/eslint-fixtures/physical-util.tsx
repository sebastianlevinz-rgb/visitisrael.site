// INTENTIONAL VIOLATION — confirms ESLint rule 4 (`no-restricted-syntax`
// against physical Tailwind directional utilities like `ml-`, `pr-`,
// `text-left`, `border-l`, `rounded-l`) fires.
//
// Spec: VALIDATION row I18N-03 (rule fires on fixture).
// Plan:  01-02-design-tokens (Task 2).
//
// DO NOT FIX THIS FILE. The lint failure IS the test.
// `pnpm lint tests/eslint-fixtures/physical-util.tsx` MUST exit non-zero.
//
// Fix-it guidance for downstream components:
//   ml-4    -> ms-4
//   pr-2    -> pe-2
//   text-left -> text-start
//   border-l-2 -> border-s-2
//   rounded-l -> rounded-s

export function PhysicalUtilViolator() {
  return (
    <div className="ml-4 rounded-l border-l-2 pr-2 text-left">
      Physical directional utilities — should fail lint in RTL
    </div>
  );
}
