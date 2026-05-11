/**
 * AFF-04 ESLint fixture contract — per-partner coverage.
 *
 * Spec: VALIDATION row AFF-04 (full):
 *   "pnpm lint tests/eslint-fixtures/raw-partner-url-{booking,civitatis,viator,
 *    gyg,rentalcars,safetywing,skyscanner,hostelworld,discovercars}.tsx
 *    — all 9 fail"
 *
 * Plus escape-hatch verification:
 *   - lib/affiliate/booking.ts contains the same raw partner URL and MUST
 *     lint clean (escape hatch in eslint.config.js scoped to lib/affiliate/**).
 *
 * The `pnpm lint <file>` dispatcher (`scripts/lint.mjs`) uses
 * `--no-warn-ignored --no-ignore` for explicit paths so the global ignore
 * on `tests/eslint-fixtures/**` is bypassed when the fixture is passed
 * directly — this is what allows the rule to fire.
 */
import { spawnSync } from 'node:child_process';
import { describe, it, expect } from 'vitest';

const repoRoot = process.cwd();
const isWindows = process.platform === 'win32';

function runLint(target: string) {
  const result = spawnSync(isWindows ? 'pnpm.cmd' : 'pnpm', ['lint', target], {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: isWindows,
  });
  return {
    exitCode: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

const partners = [
  'booking',
  'civitatis',
  'viator',
  'gyg',
  'rentalcars',
  'safetywing',
  'skyscanner',
  'hostelworld',
  'discovercars',
] as const;

describe('AFF-04 — raw partner URL fixtures fire ESLint rule (9 partners)', () => {
  for (const partner of partners) {
    it(`raw-partner-url-${partner}.tsx — pnpm lint exits NON-ZERO (rule fires outside escape hatch)`, () => {
      const path = `tests/eslint-fixtures/raw-partner-url-${partner}.tsx`;
      const r = runLint(path);
      expect(r.exitCode, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`).not.toBe(
        0,
      );
      expect(r.stdout).toMatch(/Hard-coded partner URL detected/);
    });
  }

  it('lib/affiliate/booking.ts — pnpm lint exits ZERO (escape hatch active for real helper)', () => {
    // The booking helper file legitimately contains "https://www.booking.com/..."
    // (the public URL constructor). The escape-hatch override in eslint.config.js
    // (`files: ['lib/affiliate/**/*.ts', ...]` → `'no-restricted-syntax': 'off'`)
    // MUST allow this to lint clean.
    const r = runLint('lib/affiliate/booking.ts');
    expect(r.exitCode, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`).toBe(0);
  });
});
