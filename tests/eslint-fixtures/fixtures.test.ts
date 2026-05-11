/**
 * ESLint fixture contract — proves the 3 inviolable lint rules (Layer A
 * arbitrary-hex, Layer B inline-hex, RTL physical-util) actually fire on
 * intentional violations, AND that semantic `var(--color-...)` + logical
 * utilities (`ms-/me-/ps-/pe-`) lint clean.
 *
 * Spec from RESEARCH §1.2 + VALIDATION row AFF-05 + I18N-03.
 *
 * NOTE on the linter entry point:
 *   `pnpm lint <file>` is dispatched by `scripts/lint.mjs` — when args are
 *   provided, the wrapper runs `eslint --no-warn-ignored --max-warnings 0
 *   <args>` so explicitly-passed fixtures are NOT skipped even though
 *   `tests/eslint-fixtures/**` is in the global ignores (this keeps
 *   `pnpm lint` (no args) on the full repo green while letting an explicit
 *   fixture path produce the expected error).
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();
const isWindows = process.platform === 'win32';

function runLint(target: string) {
  const result = spawnSync(isWindows ? 'pnpm.cmd' : 'pnpm', ['lint', target], {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: false,
  });
  return {
    exitCode: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

describe('ESLint fixture contract', () => {
  it('raw-hex.tsx — `pnpm lint` exits NON-ZERO (Layer A: arbitrary hex in className)', () => {
    const r = runLint('tests/eslint-fixtures/raw-hex.tsx');
    expect(r.exitCode, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`).not.toBe(
      0,
    );
    expect(r.stdout).toMatch(/Arbitrary hex value in className banned/);
  });

  it('inline-hex.tsx — `pnpm lint` exits NON-ZERO (Layer B: inline style hex)', () => {
    const r = runLint('tests/eslint-fixtures/inline-hex.tsx');
    expect(r.exitCode, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`).not.toBe(
      0,
    );
    expect(r.stdout).toMatch(/Raw hex codes banned in inline styles/);
  });

  it('physical-util.tsx — `pnpm lint` exits NON-ZERO (RTL physical directional util)', () => {
    const r = runLint('tests/eslint-fixtures/physical-util.tsx');
    expect(r.exitCode, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`).not.toBe(
      0,
    );
    expect(r.stdout).toMatch(/Physical directional utility used/);
  });

  it('clean fixture (var() + logical utils) — `pnpm lint` exits 0 (rules are specific, not over-broad)', () => {
    // Create a temp clean fixture; live INSIDE the repo so eslint config applies.
    const dir = mkdtempSync(
      join(repoRoot, 'tests', 'eslint-fixtures', 'tmp-clean-'),
    );
    const file = join(dir, 'clean.tsx');
    writeFileSync(
      file,
      `export function Clean() {\n  return (\n    <div\n      className="bg-[var(--color-primary)] ms-4 ps-2 text-start"\n      style={{ color: 'var(--color-ink)' }}\n    >\n      ok\n    </div>\n  );\n}\n`,
      'utf8',
    );
    try {
      // pnpm-relative path so the wrapper sees the same target shape.
      const rel = file.substring(repoRoot.length + 1).replace(/\\/g, '/');
      const r = runLint(rel);
      expect(r.exitCode, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`).toBe(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
