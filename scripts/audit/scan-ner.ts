#!/usr/bin/env tsx
/**
 * scripts/audit/scan-ner.ts — Plan 09 Task 3 (FND-07).
 *
 * Walks Velite-built JSON output (`.velite/*.json`), runs detectMentions per
 * MDX body, and writes `data/ner-results.json` for plan 10's audit dashboard.
 *
 * Invoked via `pnpm qa:ner` (= `tsx scripts/audit/scan-ner.ts`).
 *
 * Phase 1 reality: `.velite/` does NOT exist yet (no content built). Exit 0
 * with `[]` so plan 10 dashboard handles the empty case gracefully and
 * `pnpm qa:ner` is safe to wire into pre-deploy CI now.
 *
 * Why `.ts` not `.mjs`:
 *   - detector.ts is TypeScript — a .mjs script can't import it without a
 *     compilation step or a hand-maintained .js shim.
 *   - tsx (devDep since plan 01) makes .ts scripts first-class.
 *   - Single source of truth for the Mention type; no detector.js artifact.
 *   - Filename and `pnpm qa:ner` invocation now agree (was: .mjs filename but
 *     `tsx ... .ts` script — broken, fixed in iteration-1 PLAN revision).
 *
 * Output shape (consumed by plan 10):
 *   Array<{ slug, lang, mentions: Mention[] }> — see lib/ner/types.ts
 *   NerResultEntry. Sorted by slug ascending for deterministic snapshots.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { glob } from 'glob';
import { detectMentions } from '../../lib/ner/detector';
import type { NerResultEntry } from '../../lib/ner/types';

const CWD = process.cwd();
const OUT_PATH = resolve(CWD, 'data', 'ner-results.json');

function isStringField(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

async function main(): Promise<void> {
  const out: NerResultEntry[] = [];

  // glob returns [] for nonexistent dirs — perfect for greenfield Phase 1.
  const veliteFiles = await glob('.velite/*.json', {
    cwd: CWD,
    absolute: true,
  });

  for (const file of veliteFiles) {
    let raw: string;
    try {
      raw = await readFile(file, 'utf8');
    } catch {
      // Unreadable file → skip (defensive; glob already filtered missing).
      continue;
    }

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      // Non-JSON or partial write → skip rather than crash audit.
      continue;
    }

    // Velite emits collections as arrays of objects. Anything else (object
    // maps, primitives) is not a content collection — skip it silently.
    if (!Array.isArray(data)) continue;

    for (const entry of data) {
      if (!isPlainObject(entry)) continue;
      const { slug, lang, body } = entry;
      if (!isStringField(slug)) continue;
      if (!isStringField(body)) continue;
      // lang must be 'he' or 'en' for the detector contract.
      if (lang !== 'he' && lang !== 'en') continue;

      const mentions = detectMentions(body, lang);
      out.push({ slug, lang, mentions });
    }
  }

  // Stable sort by slug for deterministic snapshots / clean diffs.
  out.sort((a, b) => a.slug.localeCompare(b.slug));

  // Ensure data/ exists before writing (script may be run from a fresh
  // checkout where the dir hasn't been populated by another tool yet).
  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2));

  const mentionTotal = out.reduce((acc, e) => acc + e.mentions.length, 0);
  console.log(
    `NER scan OK (${out.length} pages, ${mentionTotal} mentions) → ${OUT_PATH}`,
  );
}

// Guard against accidental empty cwd. (existsSync(CWD) defends against the
// rare case where the spawned process inherits a deleted cwd on Windows.)
if (!existsSync(CWD)) {
  console.error(`NER scan FAILED: cwd does not exist: ${CWD}`);
  process.exit(1);
}

void main().catch((err) => {
  console.error('NER scan FAILED:', err);
  process.exit(1);
});
