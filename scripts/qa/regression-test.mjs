#!/usr/bin/env node
/**
 * scripts/qa/regression-test.mjs — Nyquist proof of the Lighthouse gate.
 *
 * The Phase 1 Quality Gate criterion 1 (Lighthouse mobile 3-run-median
 * perf >= 0.90 / a11y >= 0.95 / bp >= 0.95 / seo = 1.00) is only credible
 * if we can demonstrate the gate FIRES when a regression is introduced.
 * This script is the proof.
 *
 * Flow:
 *   1. ensureSetup() — guarantee `public/images/regression-test-hero.jpg`
 *      exists at the small (~50KB) baseline; back it up.
 *   2. injectRegression() — replace the image with a 5MB blob (perf regression).
 *   3. runLhci() — rebuild + run `pnpm lhci autorun`.
 *   4. restore() — put the baseline image back (idempotent).
 *   5. evaluateExitCode() — PASS if lhci exited non-zero (the gate fired);
 *      FAIL if lhci exited 0 (the gate is BROKEN); error if build itself failed.
 *
 * Cross-platform: pure node, no shell, no `||` / `&` / `sleep`. Runs on
 * Windows + macOS + Linux. Designed to be re-runnable on demand (CI can
 * invoke `pnpm qa:regression` whenever, and the cleanup is byte-perfect).
 *
 * Pure helpers (ensureSetup, restore, injectRegression, evaluateExitCode)
 * are exported for Vitest. main() runs only when this is the entrypoint
 * (so importing in a test does not invoke a real lhci run).
 */

import { readFile, writeFile, copyFile, unlink, stat, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import { resolve, dirname } from 'node:path';
import process from 'node:process';

const REPO_ROOT = process.cwd();
const REAL = resolve(REPO_ROOT, 'public/images/regression-test-hero.jpg');
const BACKUP = resolve(REPO_ROOT, 'public/images/regression-test-hero.jpg.original');

// Exit-code sentinels used by evaluateExitCode().
const EXIT_BUILD_FAILED = 99;

/**
 * Ensure the test image exists at the baseline (~50KB), and back it up to
 * BACKUP so restore() can recover after the regression injection.
 *
 * Creates the file if absent (with a minimal JPEG SOI header so any
 * downstream image probing doesn't crash) — Phase 1 has no real
 * hero images in `public/images/` yet, so the harness is self-bootstrapping.
 */
export async function ensureSetup() {
  await mkdir(dirname(REAL), { recursive: true });
  if (!existsSync(REAL)) {
    // 50KB baseline — JPEG SOI marker + filler. Not a valid renderable
    // image but Lighthouse measures download cost regardless of validity,
    // which is all this harness needs to prove the gate behavior.
    const small = Buffer.alloc(50 * 1024, 0);
    small[0] = 0xff;
    small[1] = 0xd8;
    await writeFile(REAL, small);
  }
  await copyFile(REAL, BACKUP);
}

/**
 * Replace REAL with a 5MB blob (large enough to push Lighthouse perf score
 * below 0.90 by adding ~5MB to network transfer on a throttled mobile
 * connection — Moto G4 1.6 Mbps down).
 */
export async function injectRegression() {
  const big = Buffer.alloc(5 * 1024 * 1024, 0);
  big[0] = 0xff;
  big[1] = 0xd8;
  await writeFile(REAL, big);
  const s = await stat(REAL);
  console.log(
    `injectRegression: ${REAL} is now ${(s.size / 1024 / 1024).toFixed(2)}MB.`,
  );
}

/**
 * Restore REAL from BACKUP (byte-perfect) and remove the backup file.
 * Idempotent — if BACKUP does not exist, returns without error.
 */
export async function restore() {
  if (!existsSync(BACKUP)) return;
  await copyFile(BACKUP, REAL);
  await unlink(BACKUP);
}

/**
 * Classify the lhci exit code into a PASS/FAIL/error result with a human
 * message. PASS is "the gate fired correctly when regression was injected";
 * FAIL is "the gate did NOT fire — Quality Gate is broken"; error is
 * "could not evaluate (build failed or environment issue)".
 *
 * @param {number} exitCode
 * @returns {{ status: 'pass' | 'fail' | 'error', message: string }}
 */
export function evaluateExitCode(exitCode) {
  if (exitCode === EXIT_BUILD_FAILED) {
    return {
      status: 'error',
      message:
        'Build failed before lhci could evaluate — fix the build error and re-run. Result inconclusive.',
    };
  }
  if (exitCode !== 0) {
    return {
      status: 'pass',
      message:
        'REGRESSION TEST: PASS — Lighthouse gate fired (lhci exit non-zero) when 5MB regression was injected.',
    };
  }
  return {
    status: 'fail',
    message:
      'REGRESSION TEST: FAIL — Lighthouse gate did NOT fire (lhci exit 0) despite injected regression. Quality gate is BROKEN.',
  };
}

/**
 * Run `pnpm build` then `pnpm lhci autorun`. Returns the lhci exit code,
 * or EXIT_BUILD_FAILED if the build step failed.
 *
 * Uses spawnSync (synchronous) because the script is a one-shot CI step.
 */
function runLhci() {
  console.log('regression-test: running `pnpm build`...');
  // shell:true is needed on Windows to find pnpm.cmd from PATH.
  const build = spawnSync('pnpm', ['build'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (build.status !== 0) {
    console.error('regression-test: build failed. Cannot proceed.');
    return EXIT_BUILD_FAILED;
  }
  console.log('regression-test: running `pnpm lhci`...');
  const lhci = spawnSync('pnpm', ['lhci'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  return lhci.status ?? 1;
}

/**
 * Main flow — called only when this script is the entrypoint.
 */
async function main() {
  console.log('regression-test: Nyquist proof of Lighthouse gate firing.');
  console.log(`regression-test: target asset = ${REAL}`);

  let exitCode = EXIT_BUILD_FAILED;
  try {
    await ensureSetup();
    await injectRegression();
    exitCode = runLhci();
  } finally {
    // Always restore — even if a step threw.
    await restore();
  }

  const result = evaluateExitCode(exitCode);
  if (result.status === 'pass') {
    console.log(result.message);
    process.exit(0);
  } else if (result.status === 'fail') {
    console.error(result.message);
    process.exit(1);
  } else {
    console.error(result.message);
    process.exit(2);
  }
}

// Only invoke main when this is the entrypoint (not when imported by tests).
const isMain = (() => {
  try {
    const argv1 = process.argv[1] ? resolve(process.argv[1]) : '';
    const here = resolve(new URL(import.meta.url).pathname.replace(/^\//, ''));
    return argv1.toLowerCase() === here.toLowerCase();
  } catch {
    return false;
  }
})();

if (isMain) {
  main().catch((e) => {
    console.error('regression-test: unexpected error:', e);
    // Best-effort restore even on unexpected failures.
    restore().finally(() => process.exit(3));
  });
}
