/**
 * `scripts/qa/check-credits.mjs` CI-gate tests — IMG-02.
 *
 * Each test stages an isolated tempdir with its own `public/images/`,
 * `data/photo-credits.json`, source-file fixtures, and a copy of the script
 * + its lib dependency, then spawns `node scripts/qa/check-credits.mjs` with
 * `cwd` pointed at the tempdir and asserts on stdout/stderr/exit code.
 *
 * Covers the 5 failure modes mandated by the plan:
 *   1. Empty greenfield → exit 0
 *   2. <Image src="/images/missing.jpg"/> reference + empty ledger → UNDOCUMENTED
 *   3. public/images/orphan.jpg on disk + empty ledger     → ORPHANED
 *   4. Ledger width=1600 but actual file width=800         → UNDERSIZED/MISMATCH
 *   5. subjectType=westernWall without acknowledgment      → Zod schema error
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  copyFileSync,
  rmSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(fileURLToPath(import.meta.url), '../../..');
const SCRIPT_REL = 'scripts/qa/check-credits.mjs';
const VALID_FIXTURE = join(
  REPO_ROOT,
  'data/photo-credits-fixtures/valid-1600w.jpg',
);
const UNDERSIZED_FIXTURE = join(
  REPO_ROOT,
  'data/photo-credits-fixtures/undersized-800w.jpg',
);

interface SandboxOpts {
  ledger: Record<string, unknown>;
  /** Map of relative source-file paths -> their text content. */
  sourceFiles?: Record<string, string>;
  /** Map of `public/images/<rel>` -> absolute path to a fixture file to copy. */
  publicImages?: Record<string, string>;
}

/**
 * Build a sandbox directory with a freshly-written ledger, optional source
 * files (for reference-walking), and optional public/images fixtures (for
 * filesystem-walking + Sharp probes).
 *
 * The script itself is NOT copied — instead we run it from its repo location
 * with `cwd` pointed at the sandbox. The script uses `process.cwd()`-relative
 * paths throughout, so this gives full ESM-resolution of zod/sharp/glob
 * via the repo's node_modules (NODE_PATH doesn't work for ESM imports).
 */
function makeSandbox(opts: SandboxOpts): string {
  const root = mkdtempSync(join(tmpdir(), 'check-credits-'));

  // Write the ledger.
  mkdirSync(join(root, 'data'), { recursive: true });
  writeFileSync(
    join(root, 'data/photo-credits.json'),
    JSON.stringify(opts.ledger, null, 2),
  );

  // Source files (for reference walking).
  for (const [rel, text] of Object.entries(opts.sourceFiles ?? {})) {
    const abs = join(root, rel);
    mkdirSync(join(abs, '..'), { recursive: true });
    writeFileSync(abs, text);
  }

  // Public images (for filesystem walking + Sharp probes).
  for (const [rel, srcPath] of Object.entries(opts.publicImages ?? {})) {
    const dest = join(root, 'public/images', rel);
    mkdirSync(join(dest, '..'), { recursive: true });
    copyFileSync(srcPath, dest);
  }

  return root;
}

function runScript(cwd: string): {
  status: number | null;
  stdout: string;
  stderr: string;
} {
  // Use the absolute path to the script so module resolution stays in the
  // repo's node_modules (ESM doesn't honor NODE_PATH). The script itself is
  // CWD-relative for all data/source/public paths.
  const scriptAbs = join(REPO_ROOT, SCRIPT_REL);
  const result = spawnSync(process.execPath, [scriptAbs], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env },
  });
  return {
    status: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

const VALID_BASE = {
  src: '/images/jerusalem/old.jpg',
  author: 'Test Author',
  license: 'CC-BY-SA-4.0' as const,
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:Test.jpg',
  region: 'jerusalem',
  slug: 'old',
  width: 1600,
  height: 900,
  subjectType: 'landscape' as const,
};

const sandboxes: string[] = [];
function track(s: string): string {
  sandboxes.push(s);
  return s;
}
afterAll(() => {
  for (const s of sandboxes) {
    if (existsSync(s)) rmSync(s, { recursive: true, force: true });
  }
});

beforeAll(() => {
  expect(existsSync(VALID_FIXTURE), 'valid fixture must exist').toBe(true);
  expect(existsSync(UNDERSIZED_FIXTURE), 'undersized fixture must exist').toBe(
    true,
  );
});

describe('scripts/qa/check-credits.mjs — IMG-02 CI gate', () => {
  it('1) empty greenfield → exits 0 with success message', () => {
    const sandbox = track(makeSandbox({ ledger: {} }));
    const { status, stdout, stderr } = runScript(sandbox);
    expect(stderr, 'no errors expected').toBe('');
    expect(stdout).toMatch(/Photo credits check OK/);
    expect(status).toBe(0);
  });

  it('2) referenced /images/missing.jpg + empty ledger → exits non-zero with UNDOCUMENTED', () => {
    const sandbox = track(
      makeSandbox({
        ledger: {},
        sourceFiles: {
          'content/he/sample.mdx':
            '# sample\n\n<Image src="/images/missing.jpg" alt="x" />\n',
        },
      }),
    );
    const { status, stderr } = runScript(sandbox);
    expect(status, 'should fail with non-zero exit').not.toBe(0);
    expect(stderr).toMatch(/UNDOCUMENTED.*\/images\/missing\.jpg/);
  });

  it('3) public/images/orphan.jpg on disk + empty ledger → exits non-zero with ORPHANED', () => {
    const sandbox = track(
      makeSandbox({
        ledger: {},
        publicImages: { 'orphan.jpg': VALID_FIXTURE },
      }),
    );
    const { status, stderr } = runScript(sandbox);
    expect(status).not.toBe(0);
    expect(stderr).toMatch(/ORPHANED.*\/images\/orphan\.jpg/);
  });

  it('4) ledger width=1600 but actual file width=800 → exits non-zero (UNDERSIZED or WIDTH MISMATCH)', () => {
    const sandbox = track(
      makeSandbox({
        ledger: {
          '/images/wrong-width.jpg': {
            ...VALID_BASE,
            src: '/images/wrong-width.jpg',
            slug: 'wrong-width',
            width: 1600,
          },
        },
        publicImages: { 'wrong-width.jpg': UNDERSIZED_FIXTURE },
      }),
    );
    const { status, stderr } = runScript(sandbox);
    expect(status).not.toBe(0);
    expect(stderr).toMatch(/(WIDTH MISMATCH|UNDERSIZED).*wrong-width/);
  });

  it('5) ledger entry subjectType=westernWall WITHOUT restrictedSiteAcknowledgment → exits non-zero (Zod parse failure)', () => {
    const sandbox = track(
      makeSandbox({
        ledger: {
          '/images/wall.jpg': {
            ...VALID_BASE,
            src: '/images/wall.jpg',
            slug: 'wall',
            subjectType: 'westernWall',
            // restrictedSiteAcknowledgment intentionally omitted
          },
        },
        publicImages: { 'wall.jpg': VALID_FIXTURE },
      }),
    );
    const { status, stderr } = runScript(sandbox);
    expect(status).not.toBe(0);
    expect(stderr).toMatch(/restrictedSiteAcknowledgment/);
  });

  it('6) valid ledger entry pointing to actual valid 1600w fixture → exits 0', () => {
    const sandbox = track(
      makeSandbox({
        ledger: {
          '/images/sample.jpg': {
            ...VALID_BASE,
            src: '/images/sample.jpg',
            slug: 'sample',
          },
        },
        publicImages: { 'sample.jpg': VALID_FIXTURE },
        sourceFiles: {
          'app/page.tsx':
            'export default () => <Image src="/images/sample.jpg" alt="x" />',
        },
      }),
    );
    const { status, stdout, stderr } = runScript(sandbox);
    expect(stderr, 'no errors expected on valid ledger').toBe('');
    expect(stdout).toMatch(/Photo credits check OK \(1 entr/);
    expect(status).toBe(0);
  });
});
