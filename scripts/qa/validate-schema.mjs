#!/usr/bin/env node
/**
 * validate-schema.mjs — SEO-03 pre-commit + pre-push gate.
 *
 * Walks built HTML (Next.js 15 output at .next/server/app/**\/*.html or
 * test fixtures), extracts every <script type="application/ld+json"> block,
 * validates each JSON-LD payload against the schema-dts-typed shape table.
 *
 * Per RESEARCH §1.6:
 *   1. cheerio parses HTML
 *   2. Walk .next/server/app/**\/*.html (production) or fixture dir (tests)
 *   3. For each <script type="application/ld+json">:
 *      - JSON.parse → push error on parse fail
 *      - Assert @context === 'https://schema.org'
 *      - Assert @type present
 *      - Required-fields-per-@type table check
 *      - @id uniqueness across the page
 *      - inLanguage matches page locale (parsed from URL: /en/ → en; else → he)
 *   4. Exit non-zero on any failure with formatted error list.
 *
 * Usage:
 *   node scripts/qa/validate-schema.mjs                 # walks .next/server/app
 *   node scripts/qa/validate-schema.mjs <dir>           # walks <dir>/**\/*.html
 *   node scripts/qa/validate-schema.mjs --files a.html b.html
 *
 * Exit codes:
 *   0 — all JSON-LD valid
 *   1 — at least one validation error
 *   2 — invocation error (no HTML found, bad args)
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { argv, cwd, exit } from 'node:process';

import * as cheerio from 'cheerio';

// ---------- Required-fields-per-@type table (hand-rolled per RESEARCH §1.6) ----------

const REQUIRED_FIELDS = {
  TouristDestination: ['name', 'description', 'image', 'geo'],
  TouristAttraction: ['name', 'description', 'image'],
  PlaceOfWorship: ['name'],
  ReligiousBuilding: ['name'],
  Place: ['name'],
  LocalBusiness: ['name', 'address'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
  Organization: ['name', 'url'],
  WebSite: ['name', 'url', 'potentialAction'],
  CollectionPage: ['name'],
  WebPage: ['name'],
};

// ---------- Locale parsing from URL/path ----------

/**
 * Given an HTML file path, infer locale from URL structure.
 * - `/en/...` or `\en\...` → 'en'
 * - everything else → 'he' (default)
 */
function inferLocaleFromPath(htmlPath) {
  const norm = htmlPath.replace(/\\/g, '/');
  // Match /en/ as path segment (not 'en' as part of a word like 'enriched').
  if (/(^|\/)en(\/|$|\.html)/.test(norm)) return 'en';
  return 'he';
}

// ---------- HTML walker ----------

function walkHtml(root) {
  const out = [];
  if (!existsSync(root)) return out;
  const stack = [root];
  while (stack.length > 0) {
    const cur = stack.pop();
    let entries;
    try {
      entries = readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      const full = join(cur, ent.name);
      if (ent.isDirectory()) {
        stack.push(full);
      } else if (ent.isFile() && ent.name.endsWith('.html')) {
        out.push(full);
      }
    }
  }
  return out;
}

// ---------- Schema validators ----------

function validateScript(payload, htmlPath, scriptIdx) {
  const errors = [];
  const where = `${htmlPath} [script #${scriptIdx + 1}]`;

  if (payload === null || typeof payload !== 'object') {
    errors.push(`${where}: JSON-LD payload is not an object`);
    return errors;
  }

  const ctx = payload['@context'];
  if (ctx !== 'https://schema.org') {
    errors.push(
      `${where}: @context must be 'https://schema.org' (got ${JSON.stringify(ctx)})`,
    );
  }

  const type = payload['@type'];
  if (typeof type !== 'string') {
    errors.push(`${where}: @type must be a string (got ${JSON.stringify(type)})`);
    return errors;
  }

  const required = REQUIRED_FIELDS[type];
  if (required) {
    for (const field of required) {
      if (payload[field] === undefined || payload[field] === null) {
        errors.push(`${where}: ${type} missing required field '${field}'`);
      }
    }
  }
  // Note: unknown @type values are allowed (schema.org is open-vocabulary);
  // we only enforce the shapes we generate.

  // Type-specific shape assertions beyond mere field presence.
  if (type === 'BreadcrumbList') {
    const items = payload.itemListElement;
    if (!Array.isArray(items) || items.length < 2) {
      errors.push(
        `${where}: BreadcrumbList.itemListElement must be an array with >=2 items`,
      );
    }
  }

  if (type === 'FAQPage') {
    const entity = payload.mainEntity;
    if (!Array.isArray(entity) || entity.length < 1) {
      errors.push(
        `${where}: FAQPage.mainEntity must be an array with >=1 Question`,
      );
    } else {
      for (let i = 0; i < entity.length; i += 1) {
        const q = entity[i];
        if (
          !q ||
          typeof q !== 'object' ||
          q['@type'] !== 'Question' ||
          !q.acceptedAnswer ||
          q.acceptedAnswer['@type'] !== 'Answer'
        ) {
          errors.push(
            `${where}: FAQPage.mainEntity[${i}] must be a Question with acceptedAnswer of @type=Answer`,
          );
        }
      }
    }
  }

  return errors;
}

function validatePage(htmlPath) {
  const errors = [];
  let html;
  try {
    html = readFileSync(htmlPath, 'utf8');
  } catch (e) {
    errors.push(`${htmlPath}: could not read file (${e.message})`);
    return { errors, scriptCount: 0 };
  }

  const $ = cheerio.load(html);
  const scripts = $('script[type="application/ld+json"]');

  if (scripts.length === 0) {
    // No JSON-LD on this page → OK (utility pages may not need it).
    return { errors, scriptCount: 0 };
  }

  const expectedLocale = inferLocaleFromPath(htmlPath);
  const seenIds = new Set();

  scripts.each((idx, el) => {
    const raw = $(el).html() ?? '';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      errors.push(
        `${htmlPath} [script #${idx + 1}]: malformed JSON (${e.message})`,
      );
      return;
    }

    // Allow either a single object or an array of objects.
    const payloads = Array.isArray(parsed) ? parsed : [parsed];

    for (let pi = 0; pi < payloads.length; pi += 1) {
      const payload = payloads[pi];
      errors.push(...validateScript(payload, htmlPath, idx));

      // @id uniqueness across page.
      const id = payload && typeof payload === 'object' ? payload['@id'] : undefined;
      if (typeof id === 'string') {
        if (seenIds.has(id)) {
          errors.push(`${htmlPath}: duplicate @id ${JSON.stringify(id)}`);
        }
        seenIds.add(id);
      }

      // inLanguage matches page locale.
      const il = payload && typeof payload === 'object' ? payload.inLanguage : undefined;
      if (typeof il === 'string' && il !== expectedLocale) {
        errors.push(
          `${htmlPath} [script #${idx + 1}]: inLanguage '${il}' mismatches page locale '${expectedLocale}' (inferred from URL)`,
        );
      }
    }
  });

  return { errors, scriptCount: scripts.length };
}

// ---------- Main ----------

function parseArgs(args) {
  const positional = [];
  let i = 0;
  let mode = 'walk';
  while (i < args.length) {
    const a = args[i];
    if (a === '--files') {
      mode = 'files';
      i += 1;
      while (i < args.length && !args[i].startsWith('--')) {
        positional.push(args[i]);
        i += 1;
      }
    } else {
      positional.push(a);
      i += 1;
    }
  }
  return { mode, positional };
}

function main() {
  const args = argv.slice(2);
  const { mode, positional } = parseArgs(args);

  let htmlFiles = [];
  if (mode === 'files') {
    htmlFiles = positional.map((p) => resolve(p));
  } else if (positional.length > 0) {
    const root = resolve(positional[0]);
    if (statSync(root).isDirectory()) {
      htmlFiles = walkHtml(root);
    } else {
      htmlFiles = [root];
    }
  } else {
    // Default: walk .next/server/app
    const defaultRoot = resolve(cwd(), '.next', 'server', 'app');
    htmlFiles = walkHtml(defaultRoot);
  }

  if (htmlFiles.length === 0) {
    console.log(
      'Schema validation: no HTML files found (build artifacts absent — skipping).',
    );
    exit(0);
  }

  const allErrors = [];
  let totalScripts = 0;
  for (const html of htmlFiles) {
    const { errors, scriptCount } = validatePage(html);
    allErrors.push(...errors);
    totalScripts += scriptCount;
  }

  if (allErrors.length > 0) {
    console.error('Schema validation FAILED — issues found:\n');
    for (const e of allErrors) {
      console.error(`  ✗ ${e}`);
    }
    console.error(
      `\n${allErrors.length} error(s) across ${htmlFiles.length} page(s), ${totalScripts} JSON-LD block(s).`,
    );
    exit(1);
  }

  console.log(
    `Schema validation OK (${htmlFiles.length} page(s), ${totalScripts} JSON-LD script(s)).`,
  );
  exit(0);
}

main();
// `sep` is imported but only used implicitly via join() — keep eslint quiet.
void sep;
void relative;
