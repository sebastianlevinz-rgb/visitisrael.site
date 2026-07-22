#!/usr/bin/env node
/**
 * Checks every src/content/guides/*.md frontmatter for title ≤65 chars
 * and description ≤160 chars. Exits 1 on any violation so pnpm check fails
 * before astro check runs, catching the most common recurring defect class.
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const GUIDES_DIR = 'src/content/guides';
const TITLE_MAX = 65;
const DESC_MAX = 160;

function extractFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
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

const files = readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'));
const violations = [];

for (const file of files) {
  const content = readFileSync(join(GUIDES_DIR, file), 'utf8');
  const fm = extractFrontmatter(content);
  if (!fm) continue;

  const title = extractField(fm, 'title');
  const desc = extractField(fm, 'description');

  if (title && title.length > TITLE_MAX) {
    violations.push(`  ${file}: title ${title.length} chars (max ${TITLE_MAX}) — "${title}"`);
  }
  if (desc && desc.length > DESC_MAX) {
    violations.push(`  ${file}: description ${desc.length} chars (max ${DESC_MAX}) — "${desc}"`);
  }
}

if (violations.length > 0) {
  console.error(`\n[lint-meta-length] ${violations.length} violation(s):\n`);
  for (const v of violations) console.error(v);
  console.error('\nFix these before committing.\n');
  process.exit(1);
}

console.log(`[lint-meta-length] OK — ${files.length} guides checked, 0 violations.`);
