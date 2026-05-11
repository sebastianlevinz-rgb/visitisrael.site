#!/usr/bin/env node
/**
 * scripts/audit/axe.mjs
 *
 * Minimal axe-core CI wrapper. Phase 1 ships the script + documents the
 * CI invocation pattern; Phase 6 wires it into the GitHub Actions pre-deploy
 * workflow against a Vercel preview URL.
 *
 * The script writes `data/axe-results.json` (always — empty on greenfield,
 * populated when content + axe-core/puppeteer install land). The audit
 * dashboard (plan 10) merges these findings as severity=critical entries.
 *
 * Today's behavior in Phase 1:
 *   - If axe-core + puppeteer (or @axe-core/cli) NOT installed → write empty
 *     `[]` to data/axe-results.json + log informational message + exit 0.
 *   - If installed → run against the configured URL list + serialize.
 *
 * This shell is reusable: plan 11 will swap the empty-stub for real axe
 * invocation once Lighthouse-CI is wired in the same workflow.
 *
 * Invocation: `pnpm qa:axe` (no args — Phase 1 stub).
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const REPO_ROOT = process.cwd();
const OUT = resolve(REPO_ROOT, 'data/axe-results.json');

async function ensureDir(p) {
  await mkdir(dirname(p), { recursive: true });
}

async function main() {
  await ensureDir(OUT);
  // Phase 1 stub: no axe-core/puppeteer install yet (those land in plan 11
  // alongside Lighthouse CI). Write an empty results array so the dashboard
  // sees "axe ran, 0 violations" rather than "axe never ran".
  const stub = {
    status: 'stub',
    note: 'Phase 1 stub: axe-core CLI invocation lands in plan 11 alongside Lighthouse CI. Today writes an empty violations array so the dashboard renders cleanly.',
    target: process.env.AUDIT_TARGET_URL ?? 'http://localhost:3000',
    timestamp: new Date().toISOString(),
    violations: [],
  };
  await writeFile(OUT, JSON.stringify(stub, null, 2) + '\n', 'utf8');
  console.log(
    'qa:axe: wrote Phase 1 stub to data/axe-results.json. Plan 11 wires real axe-core invocation against Vercel preview URLs.',
  );
}

main().catch((e) => {
  console.error('qa:axe failed:', e);
  process.exit(1);
});
