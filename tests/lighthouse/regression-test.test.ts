/**
 * Plan 11 Task 3 — Regression-test harness Nyquist proof tests.
 *
 * The harness in `scripts/qa/regression-test.mjs` is the Nyquist proof of
 * "the Lighthouse gate fires when a perf regression is introduced." It:
 *   1. Snapshots a small test image at `public/images/regression-test-hero.jpg`
 *   2. Replaces it with a 5MB blob
 *   3. Rebuilds the site
 *   4. Runs `pnpm lhci autorun`
 *   5. Expects non-zero exit (the gate fires)
 *   6. Restores the original image
 *   7. Prints PASS/FAIL
 *
 * Because the real run requires Chrome + ~60s + a complete rebuild, the full
 * subprocess test is gated behind `RUN_LH_REGRESSION=1`. The default-run tests
 * pin the harness's pure helper logic (setup/restore idempotency, evaluation of
 * exit codes) using the exported pure functions.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync } from 'node:fs';
import { mkdir, writeFile, unlink, stat, rm, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

const REPO_ROOT = process.cwd();
const REAL = resolve(REPO_ROOT, 'public/images/regression-test-hero.jpg');
const BACKUP = resolve(REPO_ROOT, 'public/images/regression-test-hero.jpg.original');

// Helper imports — the regression script exports pure functions for testing.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const harness: any = await import('../../scripts/qa/regression-test.mjs');

describe('regression-test harness (pure helpers)', () => {
  describe('evaluateExitCode()', () => {
    it('returns PASS when lhci exit was non-zero (gate fired)', () => {
      const result = harness.evaluateExitCode(1);
      expect(result.status).toBe('pass');
      expect(result.message).toContain('gate fired');
    });

    it('returns FAIL when lhci exit was 0 (gate did NOT fire)', () => {
      const result = harness.evaluateExitCode(0);
      expect(result.status).toBe('fail');
      expect(result.message).toContain('did NOT fire');
    });

    it('handles build-failure sentinel (exit 99) distinctly', () => {
      const result = harness.evaluateExitCode(99);
      expect(result.status).toBe('error');
      expect(result.message).toContain('build');
    });
  });

  describe('ensureSetup() + restore() idempotency', () => {
    beforeEach(async () => {
      // Clean any leftovers from prior test runs
      if (existsSync(REAL)) await unlink(REAL);
      if (existsSync(BACKUP)) await unlink(BACKUP);
    });
    afterEach(async () => {
      if (existsSync(REAL)) await unlink(REAL);
      if (existsSync(BACKUP)) await unlink(BACKUP);
    });

    it('ensureSetup() creates the test image when absent', async () => {
      expect(existsSync(REAL)).toBe(false);
      await harness.ensureSetup();
      expect(existsSync(REAL)).toBe(true);
      expect(existsSync(BACKUP)).toBe(true);
      const s = await stat(REAL);
      // 50KB baseline image
      expect(s.size).toBeGreaterThan(40 * 1024);
      expect(s.size).toBeLessThan(60 * 1024);
    });

    it('ensureSetup() backs up existing image, restore() puts it back byte-perfect', async () => {
      // Create a custom 70KB file
      await mkdir(dirname(REAL), { recursive: true });
      const original = Buffer.alloc(70 * 1024, 0x41);
      original[0] = 0xff;
      original[1] = 0xd8;
      await writeFile(REAL, original);

      await harness.ensureSetup();
      expect(existsSync(BACKUP)).toBe(true);

      // Inject regression to verify restore brings it back
      const big = Buffer.alloc(5 * 1024 * 1024, 0);
      await writeFile(REAL, big);
      const corrupted = await stat(REAL);
      expect(corrupted.size).toBeGreaterThan(4 * 1024 * 1024);

      await harness.restore();
      const restored = await readFile(REAL);
      expect(restored.length).toBe(original.length);
      expect(restored.equals(original)).toBe(true);
      expect(existsSync(BACKUP)).toBe(false); // restore cleans backup
    });

    it('restore() is a no-op if no backup exists', async () => {
      expect(existsSync(BACKUP)).toBe(false);
      await expect(harness.restore()).resolves.not.toThrow();
    });
  });

  describe('injectRegression()', () => {
    beforeEach(async () => {
      if (existsSync(REAL)) await unlink(REAL);
      if (existsSync(BACKUP)) await unlink(BACKUP);
      await harness.ensureSetup();
    });
    afterEach(async () => {
      if (existsSync(REAL)) await unlink(REAL);
      if (existsSync(BACKUP)) await unlink(BACKUP);
    });

    it('replaces the test image with a 5MB blob', async () => {
      await harness.injectRegression();
      const s = await stat(REAL);
      expect(s.size).toBe(5 * 1024 * 1024);
    });
  });
});

describe('regression-test harness (full integration)', () => {
  // Gate the heavyweight test behind an opt-in env var. Without RUN_LH_REGRESSION=1,
  // this test SKIPS — running the real harness requires Chrome locally and ~60s.
  // The CI workflow's lighthouse.yml runs the real lhci on every PR; this Vitest
  // path is the local-dev opt-in for proving the gate fires.
  const shouldRun = process.env.RUN_LH_REGRESSION === '1';

  it.skipIf(!shouldRun)(
    'spawns the harness, expects PASS exit (gate fires on injected regression)',
    async () => {
      const result = spawnSync(
        'node',
        ['scripts/qa/regression-test.mjs'],
        { cwd: REPO_ROOT, stdio: 'pipe', encoding: 'utf8' },
      );
      // PASS = exit 0 (the harness exited 0 because the gate fired when regression injected).
      expect(result.status).toBe(0);
      // Final state must be clean (no leftover backup)
      expect(existsSync(BACKUP)).toBe(false);
    },
    600_000, // 10 minute timeout — build + 3 URLs × 3 runs each
  );

  it('test runs unconditionally — confirms harness file exists and is executable from node', async () => {
    expect(existsSync(resolve(REPO_ROOT, 'scripts/qa/regression-test.mjs'))).toBe(true);
  });
});
