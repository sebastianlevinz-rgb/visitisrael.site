/**
 * Plan 09 — Task 3: scripts/audit/scan-ner.ts integration tests (FND-07).
 *
 * Behaviors pinned (PLAN.md Task 3 <behavior>):
 *   1. With temp .velite/regions.json containing sample MDX bodies → script
 *      runs detectMentions per body → writes data/ner-results.json with the
 *      Array<NerResultEntry> shape (slug, lang, mentions).
 *   2. When no .velite/ output exists (Phase 1 greenfield reality) → writes
 *      [] and exits 0 (NOT non-zero — empty is the success case at this stage).
 *   3. Output is sorted by slug ascending for deterministic snapshots.
 *
 * Strategy: each test spawns the real script in a temp working directory via
 *           pnpm exec tsx with the absolute script path; we read the produced
 *           data/ner-results.json from that sandbox. This mirrors how plan 10
 *           will invoke `pnpm qa:ner` in CI.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  rmSync,
  writeFileSync,
  mkdirSync,
  readFileSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// Vitest runs with cwd=repo root (see vitest.config.ts). We resolve absolute
// paths from there rather than via import.meta.url, because the Vite test
// transform doesn't always yield a file: URL for ESM-loaded specs under jsdom.
const REPO_ROOT = process.cwd();
const SCRIPT_PATH = resolve(REPO_ROOT, 'scripts', 'audit', 'scan-ner.ts');
const TSX_BIN = resolve(
  REPO_ROOT,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'tsx.cmd' : 'tsx',
);

let sandbox: string;

beforeEach(() => {
  sandbox = mkdtempSync(join(tmpdir(), 'scan-ner-'));
  // Both scripts/audit/scan-ner.ts and the data/ output need a `data/`
  // directory in the sandbox cwd.
  mkdirSync(join(sandbox, 'data'), { recursive: true });
});

afterEach(() => {
  if (sandbox && existsSync(sandbox)) {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

function runScanNer(): { status: number; stdout: string; stderr: string } {
  // Spawn `tsx <absolute-script-path>` with cwd=<sandbox> so the script
  // reads `.velite/` from the sandbox and writes `data/ner-results.json`
  // into the sandbox. ESM does not honor NODE_PATH, so the absolute script
  // path lets Node resolve the script's own imports back through the repo's
  // node_modules (same pattern plan 03 used for check-credits sandbox tests).
  const result = spawnSync(TSX_BIN, [SCRIPT_PATH], {
    cwd: sandbox,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
  return {
    status: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

describe('scripts/audit/scan-ner.ts integration', () => {
  it('writes empty [] and exits 0 when no .velite/ output exists (Phase 1 greenfield)', () => {
    const result = runScanNer();
    expect(result.status, `stderr: ${result.stderr}`).toBe(0);

    const outPath = join(sandbox, 'data', 'ner-results.json');
    expect(existsSync(outPath), 'ner-results.json must exist').toBe(true);

    const parsed = JSON.parse(readFileSync(outPath, 'utf8'));
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toEqual([]);
  });

  it('runs detector on every entry in .velite/*.json and writes Array<{slug,lang,mentions}>', () => {
    // Synthesize a tiny .velite/ output mimicking what Velite produces post-
    // Phase 2: an array of objects each with at least { slug, lang, body }.
    const velitePath = join(sandbox, '.velite');
    mkdirSync(velitePath, { recursive: true });

    const veliteData = [
      {
        slug: 'jerusalem',
        lang: 'en',
        body: 'We stayed at Abraham Hostel for two nights. Then visited Yad Vashem.',
      },
      {
        slug: 'tel-aviv',
        lang: 'en',
        body: 'Dinner at Machneyuda was the highlight. Egged bus 405 from Tel Aviv to Jerusalem.',
      },
    ];
    writeFileSync(
      join(velitePath, 'regions.json'),
      JSON.stringify(veliteData),
      'utf8',
    );

    const result = runScanNer();
    expect(result.status, `stderr: ${result.stderr}`).toBe(0);

    const parsed = JSON.parse(
      readFileSync(join(sandbox, 'data', 'ner-results.json'), 'utf8'),
    );
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(2);

    for (const entry of parsed) {
      expect(entry).toHaveProperty('slug');
      expect(entry).toHaveProperty('lang');
      expect(entry).toHaveProperty('mentions');
      expect(Array.isArray(entry.mentions)).toBe(true);
    }

    // Jerusalem entry: 2 known mentions (Abraham Hostel + Yad Vashem)
    const jerusalem = parsed.find(
      (p: { slug: string }) => p.slug === 'jerusalem',
    );
    expect(jerusalem).toBeDefined();
    const jerusalemEntities = jerusalem.mentions.map(
      (m: { entity: string }) => m.entity,
    );
    expect(jerusalemEntities).toContain('Abraham Hostel');
    expect(jerusalemEntities).toContain('Yad Vashem');

    // Mentions carry full Mention shape — span as 2-tuple, class, suggestedAction.
    const yadVashemMention = jerusalem.mentions.find(
      (m: { entity: string }) => m.entity === 'Yad Vashem',
    );
    expect(yadVashemMention).toMatchObject({
      entity: 'Yad Vashem',
      class: 'museum',
      suggestedAction: 'add-internal-link',
    });
    expect(Array.isArray(yadVashemMention.span)).toBe(true);
    expect(yadVashemMention.span).toHaveLength(2);
  });

  it('output is sorted by slug ascending (deterministic snapshots)', () => {
    const velitePath = join(sandbox, '.velite');
    mkdirSync(velitePath, { recursive: true });

    // Deliberately write entries out of slug order to verify the sort.
    const veliteData = [
      { slug: 'tel-aviv', lang: 'en', body: 'Some text.' },
      { slug: 'akko', lang: 'en', body: 'Some text.' },
      { slug: 'jerusalem', lang: 'en', body: 'Some text.' },
    ];
    writeFileSync(
      join(velitePath, 'regions.json'),
      JSON.stringify(veliteData),
      'utf8',
    );

    const result = runScanNer();
    expect(result.status, `stderr: ${result.stderr}`).toBe(0);

    const parsed = JSON.parse(
      readFileSync(join(sandbox, 'data', 'ner-results.json'), 'utf8'),
    ) as Array<{ slug: string }>;
    const slugs = parsed.map((p) => p.slug);
    const sorted = [...slugs].sort((a, b) => a.localeCompare(b));
    expect(slugs).toEqual(sorted);
    expect(slugs).toEqual(['akko', 'jerusalem', 'tel-aviv']);
  });

  it('skips malformed entries (missing slug/lang/body) without crashing', () => {
    // Defense-in-depth: future Velite collections may have heterogeneous
    // shapes; the scan-ner script should silently skip entries lacking the
    // three required fields rather than crashing the audit pipeline.
    const velitePath = join(sandbox, '.velite');
    mkdirSync(velitePath, { recursive: true });

    const veliteData = [
      { slug: 'good', lang: 'en', body: 'Yad Vashem is worth a visit.' },
      { foo: 'no slug here' },
      { slug: 'no-body', lang: 'en' },
      'a top-level string, not an object',
    ];
    writeFileSync(
      join(velitePath, 'regions.json'),
      JSON.stringify(veliteData),
      'utf8',
    );

    const result = runScanNer();
    expect(result.status, `stderr: ${result.stderr}`).toBe(0);

    const parsed = JSON.parse(
      readFileSync(join(sandbox, 'data', 'ner-results.json'), 'utf8'),
    ) as Array<{ slug: string }>;
    expect(parsed.length).toBe(1);
    expect(parsed[0]!.slug).toBe('good');
  });

  it('handles non-array .velite/*.json files gracefully (skips them)', () => {
    const velitePath = join(sandbox, '.velite');
    mkdirSync(velitePath, { recursive: true });

    // Some Velite collection output is an object map, not an array. Script
    // should skip those files rather than crash.
    writeFileSync(
      join(velitePath, 'guides.json'),
      JSON.stringify({ someKey: 'someValue' }),
      'utf8',
    );
    writeFileSync(
      join(velitePath, 'regions.json'),
      JSON.stringify([
        { slug: 'jerusalem', lang: 'en', body: 'Abraham Hostel stay.' },
      ]),
      'utf8',
    );

    const result = runScanNer();
    expect(result.status, `stderr: ${result.stderr}`).toBe(0);

    const parsed = JSON.parse(
      readFileSync(join(sandbox, 'data', 'ner-results.json'), 'utf8'),
    ) as Array<{ slug: string }>;
    expect(parsed.length).toBe(1);
    expect(parsed[0]!.slug).toBe('jerusalem');
  });
});
