#!/usr/bin/env node
/**
 * `pnpm lint` dispatcher.
 *
 * Two modes:
 *
 *   1. No args:  `pnpm lint`
 *      -> `eslint .`        (whole-repo crawl honoring eslint.config.js ignores)
 *
 *   2. With path args:  `pnpm lint tests/eslint-fixtures/raw-hex.tsx`
 *      -> `eslint --no-warn-ignored --no-ignore <args>`
 *         Bypasses the `tests/eslint-fixtures/**` global ignore so the
 *         deliberately-broken fixture files actually produce the rule
 *         violations they're designed to test (VALIDATION rows AFF-05,
 *         I18N-03).
 *
 * Without this dispatcher, the contract `pnpm lint <fixture>` exits non-zero
 * cannot hold: ESLint flat config `ignores` skips files even when they're
 * passed explicitly, falling back to a "File ignored" warning (exit 0).
 *
 * Stays cross-platform (Windows + Unix) by going through `node` rather than
 * shell metaprogramming.
 *
 * Used by:
 *   - package.json `"lint": "node scripts/lint.mjs"`
 *   - tests/eslint-fixtures/fixtures.test.ts (spawns `pnpm lint <file>`).
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const args = process.argv.slice(2);

// eslint binary — resolve from local node_modules so we don't depend on PATH.
const eslintBin = resolve(
  repoRoot,
  'node_modules',
  'eslint',
  'bin',
  'eslint.js',
);

const eslintArgs =
  args.length === 0 ? ['.'] : ['--no-warn-ignored', '--no-ignore', ...args];

const child = spawn(process.execPath, [eslintBin, ...eslintArgs], {
  cwd: repoRoot,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
