// INTENTIONAL VIOLATION — confirms AFF-04 (no-restricted-syntax partner-URL)
// fires on hard-coded booking.com URLs outside lib/affiliate/**.
// Expected: `pnpm lint tests/eslint-fixtures/raw-partner-url-booking.tsx` exits NON-ZERO.
// Spec: VALIDATION row AFF-04 (full coverage — partner-specific fixture).
// DO NOT FIX. The lint failure IS the test.
export function BookingViolator() {
  return (
    <a href="https://www.booking.com/searchresults.html?ss=Jerusalem">
      Booking
    </a>
  );
}
