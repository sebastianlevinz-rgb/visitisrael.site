#!/usr/bin/env node
/**
 * scripts/audit_a11y_wrapper.mjs
 *
 * Spawns the `audit_a11y.py` script from the
 * `.agents/skills/israeli-accessibility-compliance/scripts/` skill bundle
 * against a target URL (default: http://localhost:3000) and writes IS-5568
 * audit results to `data/a11y-il-results.json`.
 *
 * Invocation: `pnpm qa:audit-a11y` (or AUDIT_TARGET_URL=https://preview.url pnpm qa:audit-a11y)
 *
 * STANDALONE — never spawned from inside an RSC render path. The script
 * writes a JSON file; the audit dashboard (plan 10 task 2) reads that file.
 *
 * Failure policy: non-zero Python exit → write a stub JSON with
 * status='fail' and exit 0 so CI can surface the issue via the dashboard
 * rather than crashing the pipeline. The dashboard treats this as a
 * "tool unavailable" state.
 *
 * Prerequisites (documented in data/dev-prereqs.md):
 *   - Python ≥3.9
 *   - pip install requests beautifulsoup4 selenium
 *   - .agents/skills/israeli-accessibility-compliance/ installed
 */
import { spawnSync } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const REPO_ROOT = process.cwd();
const SCRIPT = resolve(
  REPO_ROOT,
  '.agents/skills/israeli-accessibility-compliance/scripts/audit_a11y.py',
);
const OUT = resolve(REPO_ROOT, 'data/a11y-il-results.json');
const url = process.env.AUDIT_TARGET_URL ?? 'http://localhost:3000';

async function ensureDir(p) {
  await mkdir(dirname(p), { recursive: true });
}

async function writeStub(detail) {
  await ensureDir(OUT);
  const payload = {
    status: 'fail',
    detail,
    target: url,
    timestamp: new Date().toISOString(),
  };
  await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
}

async function main() {
  if (!existsSync(SCRIPT)) {
    await writeStub(
      'audit_a11y.py not found at .agents/skills/israeli-accessibility-compliance/scripts/audit_a11y.py — install the skill bundle.',
    );
    console.error(
      'qa:audit-a11y: skill script absent — wrote stub to data/a11y-il-results.json.',
    );
    return;
  }

  const pythonBin = process.platform === 'win32' ? 'python' : 'python3';
  const result = spawnSync(
    pythonBin,
    [SCRIPT, '--url', url, '--output', 'json'],
    { encoding: 'utf8' },
  );

  if (result.error || result.status !== 0) {
    const detail =
      result.error?.message ||
      result.stderr ||
      `audit_a11y.py exited with status=${result.status}`;
    await writeStub(detail);
    console.error(
      `qa:audit-a11y: ${detail.split('\n')[0]} — wrote stub. Install python3 + requests + beautifulsoup4 to enable.`,
    );
    return;
  }

  await ensureDir(OUT);
  await writeFile(OUT, result.stdout, 'utf8');
  console.log(
    `qa:audit-a11y: IS-5568 audit complete → data/a11y-il-results.json (target=${url}).`,
  );
}

main().catch(async (e) => {
  await writeStub(e.message ?? String(e));
  console.error('qa:audit-a11y: wrapper crashed —', e.message ?? e);
  process.exit(0); // surface via dashboard, don't crash CI
});
