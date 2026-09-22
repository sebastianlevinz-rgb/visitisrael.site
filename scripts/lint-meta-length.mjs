#!/usr/bin/env node
/**
 * Revisa el frontmatter de todo src/content/** /*.md (guides, regions, itineraries,
 * legal, en los 5 idiomas): title ≤60 y description ≤155 caracteres. Sale con 1
 * ante cualquier violación para que `pnpm check` frene antes de `astro check`.
 *
 * Umbrales = los del on-page (scripts/seo/onpage.mjs: longTitles >60,
 * longDescriptions >155). Se miden sobre el frontmatter sin ajuste porque
 * `src/layouts/BaseLayout.astro` emite `<title>{title}</title>` tal cual, sin
 * sufijo de marca: el frontmatter ES el <title> final del HTML. Si algún día el
 * layout agrega " | Visit Israel" u otro sufijo, restar su largo a TITLE_MAX.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';

const CONTENT_DIR = 'src/content';
const TITLE_MAX = 60;
const DESC_MAX = 155;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

function parseYamlValue(raw) {
  raw = raw.trim();
  if (raw.startsWith("'")) {
    // Single-quoted: '' inside = literal apostrophe
    return raw.slice(1, raw.lastIndexOf("'")).replace(/''/g, "'");
  }
  if (raw.startsWith('"')) {
    // Double-quoted: handle \" and \\
    return raw.slice(1, raw.lastIndexOf('"')).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return raw;
}

function extractField(frontmatter, field) {
  const m = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return m ? parseYamlValue(m[1]) : null;
}

const files = walk(CONTENT_DIR);
const violations = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const fm = extractFrontmatter(content);
  if (!fm) continue;

  const rel = relative(CONTENT_DIR, file).replace(/\\/g, '/');
  const title = extractField(fm, 'title');
  const desc = extractField(fm, 'description');

  if (title && title.length > TITLE_MAX) {
    violations.push(`  ${rel}: title ${title.length} chars (max ${TITLE_MAX}) — "${title}"`);
  }
  if (desc && desc.length > DESC_MAX) {
    violations.push(`  ${rel}: description ${desc.length} chars (max ${DESC_MAX}) — "${desc}"`);
  }
}

if (violations.length > 0) {
  console.error(`\n[lint-meta-length] ${violations.length} violation(s):\n`);
  for (const v of violations) console.error(v);
  console.error('\nFix these before committing.\n');
  process.exit(1);
}

console.log(`[lint-meta-length] OK — ${files.length} content files checked, 0 violations.`);
