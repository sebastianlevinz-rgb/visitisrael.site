/**
 * scripts/qa/validate-schema.mjs — SEO-03 CI gate behavior tests.
 *
 * Spawns the validator script as a child process against fixtures, asserts
 * exit code + stderr/stdout substrings per the plan-04 Task 3 behavior block.
 *
 * Fixtures live at `tests/schema/fixtures/`.
 *
 * Per RESEARCH §1.6 + plan 04 Task 3:
 *   1. valid TouristDestination          → exit 0
 *   2. malformed JSON                    → exit non-zero
 *   3. missing @context                  → exit non-zero
 *   4. missing required field (name)     → exit non-zero
 *   5. duplicate @id                     → exit non-zero
 *   6. inLanguage=he on /en/ page        → exit non-zero (locale mismatch)
 */
import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const SCRIPT = resolve(__dirname, '..', '..', 'scripts', 'qa', 'validate-schema.mjs');
const FIXTURES = resolve(__dirname, 'fixtures');

function runValidator(args: string[]) {
  const result = spawnSync('node', [SCRIPT, ...args], {
    encoding: 'utf8',
    timeout: 30_000,
  });
  return {
    status: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

describe('scripts/qa/validate-schema.mjs — SEO-03 CI gate', () => {
  it('1) valid TouristDestination fixture → exits 0', () => {
    const r = runValidator(['--files', join(FIXTURES, 'en', 'jerusalem.html')]);
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/Schema validation OK/);
  });

  it('2) malformed JSON in <script> → exits non-zero', () => {
    const r = runValidator(['--files', join(FIXTURES, 'malformed-json.html')]);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/malformed JSON/);
  });

  it('3) missing @context → exits non-zero', () => {
    const r = runValidator(['--files', join(FIXTURES, 'missing-context.html')]);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/@context must be 'https:\/\/schema\.org'/);
  });

  it('4) TouristDestination missing required name → exits non-zero', () => {
    const r = runValidator(['--files', join(FIXTURES, 'missing-name.html')]);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/missing required field 'name'/);
  });

  it('5) duplicate @id across blocks → exits non-zero', () => {
    const r = runValidator(['--files', join(FIXTURES, 'duplicate-id.html')]);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/duplicate @id/);
  });

  it('6) inLanguage=he on /en/ page → exits non-zero (locale mismatch)', () => {
    const r = runValidator([
      '--files',
      join(FIXTURES, 'en', 'locale-mismatch.html'),
    ]);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/inLanguage 'he' mismatches page locale 'en'/);
  });

  it('walks a directory of HTML files', () => {
    const r = runValidator([FIXTURES]);
    // The fixture directory CONTAINS failing fixtures alongside the valid one,
    // so exit MUST be non-zero. This proves the walker traverses the tree.
    expect(r.status).not.toBe(0);
  });

  it('empty walk (no .next/ build) → exits 0 with skip message', () => {
    // Point at a directory we know is empty of HTML.
    const r = runValidator([resolve(__dirname, '..', '..', 'messages')]);
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/no HTML files found/);
  });
});
