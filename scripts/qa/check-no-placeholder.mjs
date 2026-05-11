#!/usr/bin/env node
/**
 * scripts/qa/check-no-placeholder.mjs
 *
 * Phase 2 plan 05 — pre-commit guard for the `__REQUIRES_USER_INPUT__`
 * placeholder sentinel in accessibility-statement MDX (A11Y-04 / IS 5568
 * statutory defense-in-depth).
 *
 * Reads `git diff --cached --name-only` to find staged MDX files matching
 * `content/.+/legal/accessibility-statement\.mdx$`, then scans the
 * full staged blob of each match for the literal `__REQUIRES_USER_INPUT__`.
 * If found, prints a structured error pointing at the resolution path and
 * exits 1. Otherwise exits 0.
 *
 * Pure Node — works on Windows, macOS and Linux. Invoked from
 * `.husky/pre-commit` BEFORE lint-staged.
 *
 * Greenfield-tolerant: not-a-git-repo OR no staged files = exit 0 silently.
 *
 * Plan 06 / Phase 3 may extend this to also catch placeholders in other
 * content files (e.g. partner-affiliate IDs) — the check shape is
 * generic.
 */
import { spawnSync } from 'node:child_process';

const PLACEHOLDER = '__REQUIRES_USER_INPUT__';
const ACCESSIBILITY_RE = /^content\/.+\/legal\/accessibility-statement\.mdx$/;

function listStagedFiles() {
  const r = spawnSync('git', ['diff', '--cached', '--name-only'], {
    encoding: 'utf8',
  });
  if (r.status !== 0) return [];
  return (r.stdout ?? '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function stagedFileContents(path) {
  // `git show :<path>` reads the staged version (index blob).
  const r = spawnSync('git', ['show', `:${path}`], { encoding: 'utf8' });
  if (r.status !== 0) return '';
  return r.stdout ?? '';
}

function main() {
  const staged = listStagedFiles();
  const targets = staged.filter((p) => ACCESSIBILITY_RE.test(p));
  if (targets.length === 0) {
    return 0;
  }

  const violators = [];
  for (const path of targets) {
    const content = stagedFileContents(path);
    if (content.includes(PLACEHOLDER)) {
      violators.push(path);
    }
  }

  if (violators.length === 0) {
    return 0;
  }

  console.error('');
  console.error('BLOCKED: accessibility-statement contains placeholder');
  console.error('');
  console.error(`  ${PLACEHOLDER}`);
  console.error('');
  console.error('Found in:');
  for (const p of violators) {
    console.error(`  - ${p}`);
  }
  console.error('');
  console.error(
    'IS 5568 / A11Y-04 mandates a NAMED accessibility coordinator with real',
  );
  console.error(
    'phone + email + last_audit_date. Statutory exposure: up to 50,000 NIS',
  );
  console.error('per violation.');
  console.error('');
  console.error('Resolution:');
  console.error(
    `  1. Replace every ${PLACEHOLDER} with real coordinator data.`,
  );
  console.error(
    '  2. Re-stage the file and commit. The hook will pass once the',
  );
  console.error('     literal sentinel is gone from the staged blob.');
  console.error('');
  return 1;
}

process.exit(main());
