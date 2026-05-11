#!/usr/bin/env node
/**
 * Photo credits CI gate — IMG-02.
 *
 * Walks every `<Image|HeroImage|PhotoGallery src="...">` reference in
 * `app/**`, `components/**`, `content/**`, cross-references against
 * `data/photo-credits.json`, walks `public/images/**` for orphans, and
 * Sharp-probes each ledger entry's actual file width. Exits non-zero on
 * ANY of these failure modes:
 *
 *   - UNDOCUMENTED: a `<Image src>` references an absent ledger entry
 *   - ORPHANED:     a file in `public/images/` is missing from the ledger
 *   - UNDERSIZED:   the actual image width is < 1200px
 *   - WIDTH MISMATCH: the ledger's `width` field disagrees with the file
 *   - SCHEMA:       Zod parse fails (e.g. westernWall without acknowledgment)
 *
 * Mirrors `lib/photo-credits-schema.ts` — the schema is duplicated here so
 * the CI gate has zero TypeScript runtime dependency. A schema-shape test
 * (`tests/photo-credits/schema.test.ts`) covers the canonical TS source;
 * any divergence will be caught by the cross-test below in
 * `tests/photo-credits/check-credits.test.ts`.
 *
 * Run via `pnpm qa:credits` (= `node scripts/qa/check-credits.mjs`).
 */
import { z } from 'zod';
import { glob } from 'glob';
import sharp from 'sharp';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// ============================================================
// Zod schema (mirror of lib/photo-credits-schema.ts)
// ============================================================

const License = z.enum([
  'CC0',
  'CC-BY-2.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'CC-BY-SA-3.0',
  'CC-BY-SA-4.0',
  'PD',
  'IGPO-CC',
  'OWN',
  'UNSPLASH',
  'PEXELS',
]);

const SubjectType = z.enum([
  'westernWall',
  'holySepulchre',
  'domeOfTheRock',
  'bahaiGardens',
  'religious-general',
  'landscape',
  'cityscape',
  'food',
  'people',
  'abstract',
]);

const RESTRICTED_SUBJECTS = new Set([
  'westernWall',
  'holySepulchre',
  'domeOfTheRock',
  'bahaiGardens',
]);

const CreditEntry = z
  .object({
    src: z
      .string()
      .regex(
        /^\/images\/.+\.(avif|webp|jpg|jpeg|png)$/,
        'src must be /images/... with .avif/.webp/.jpg/.jpeg/.png extension',
      ),
    author: z.string().min(1),
    license: License,
    sourceUrl: z.string().url(),
    region: z.string().min(1),
    slug: z.string().min(1),
    width: z.number().int().min(1200, 'width must be >= 1200px'),
    height: z.number().int().min(1),
    subjectType: SubjectType,
    restrictedSiteAcknowledgment: z.string().min(1).optional(),
    licenseProof: z.string().min(1).optional(),
  })
  .superRefine((entry, ctx) => {
    if (
      RESTRICTED_SUBJECTS.has(entry.subjectType) &&
      !entry.restrictedSiteAcknowledgment
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['restrictedSiteAcknowledgment'],
        message: `restrictedSiteAcknowledgment REQUIRED for subjectType=${entry.subjectType}`,
      });
    }
  });

const Ledger = z.record(z.string(), CreditEntry);

// ============================================================
// Main
// ============================================================

const CWD = process.cwd();
const errors = [];

function fail(msg) {
  errors.push(msg);
}

// --- 1. Load + Zod-parse ledger ---
const ledgerPath = resolve(CWD, 'data/photo-credits.json');
if (!existsSync(ledgerPath)) {
  console.error(
    `Photo credits check FAILED: data/photo-credits.json not found at ${ledgerPath}`,
  );
  process.exit(1);
}

let ledgerRaw;
try {
  ledgerRaw = JSON.parse(await readFile(ledgerPath, 'utf8'));
} catch (e) {
  console.error(
    `Photo credits check FAILED: data/photo-credits.json is not valid JSON: ${e.message}`,
  );
  process.exit(1);
}

const parsed = Ledger.safeParse(ledgerRaw);
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    const path = issue.path.join('.') || '<root>';
    fail(`SCHEMA ${path}: ${issue.message}`);
  }
}
const ledger = parsed.success ? parsed.data : {};

// --- 2. Walk source files for <Image|HeroImage|PhotoGallery src="..."> ---
const refRegex = /<(?:Image|HeroImage|PhotoGallery)[^>]+src=["']([^"']+)["']/g;
const sourceGlobs = [
  'app/**/*.{tsx,mdx}',
  'components/**/*.{tsx,mdx}',
  'content/**/*.mdx',
];
const referenced = new Set();
for (const pattern of sourceGlobs) {
  const files = await glob(pattern, { cwd: CWD, nodir: true });
  for (const f of files) {
    const txt = await readFile(resolve(CWD, f), 'utf8');
    for (const m of txt.matchAll(refRegex)) {
      // Only track local /images/... references; remote URLs go through next.config.ts remotePatterns
      if (m[1].startsWith('/images/')) referenced.add(m[1]);
    }
  }
}

// --- 3. Walk filesystem for orphans ---
const onDisk = await glob('public/images/**/*.{avif,webp,jpg,jpeg,png}', {
  cwd: CWD,
  nodir: true,
});

// --- 4. Cross-check references against ledger ---
for (const src of referenced) {
  if (!(src in ledger))
    fail(`UNDOCUMENTED: ${src} (referenced but not in ledger)`);
}

// --- 5. Cross-check disk against ledger (orphans) ---
for (const file of onDisk) {
  const webPath = '/' + file.replace(/\\/g, '/').replace(/^public\//, '');
  if (!(webPath in ledger))
    fail(`ORPHANED: ${webPath} (on disk but no ledger entry)`);
}

// --- 6. Sharp-probe each ledger entry's actual file ---
for (const [src, entry] of Object.entries(ledger)) {
  const fsPath = resolve(CWD, 'public' + src);
  try {
    await stat(fsPath);
  } catch {
    fail(`MISSING_FILE ${src}: ledger entry has no file at public${src}`);
    continue;
  }
  try {
    const meta = await sharp(fsPath).metadata();
    if (typeof meta.width !== 'number') {
      fail(`UNREADABLE ${src}: Sharp could not determine width`);
      continue;
    }
    if (meta.width < 1200) {
      fail(`UNDERSIZED ${src}: ${meta.width}px < 1200`);
    }
    if (meta.width !== entry.width) {
      fail(`WIDTH MISMATCH ${src}: ledger=${entry.width} actual=${meta.width}`);
    }
  } catch (e) {
    fail(`UNREADABLE ${src}: ${e.message}`);
  }
}

// --- 7. Report ---
if (errors.length > 0) {
  console.error('Photo credits check FAILED:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

console.log(
  `Photo credits check OK (${Object.keys(ledger).length} entr${Object.keys(ledger).length === 1 ? 'y' : 'ies'}).`,
);
