#!/usr/bin/env node
/**
 * Upgrades internal links in FR and DE guide files.
 *
 * When a FR/DE guide links to /<slug> and a localised version exists
 * at src/content/guides/<locale>/<slug>.md, the link is updated to
 * /<locale>/<slug> so readers stay in their language.
 *
 * Run:  node scripts/fix-locale-links.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');

function getSlugs(locale) {
  const dir = path.join(ROOT, 'src/content/guides', locale);
  return new Set(
    fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.slice(0, -3))
  );
}

/**
 * Replace markdown links in body text (after frontmatter).
 * Pattern: ]( /slug ) or ]( /slug#anchor ) where slug matches a locale guide.
 * Does NOT touch links already prefixed with /fr/, /de/, /en/, or external http.
 */
function upgradeLinks(content, locale, slugs) {
  // Split on frontmatter fence so we never touch YAML values
  const fmMatch = content.match(/^---[\s\S]*?---\n/);
  const frontmatter = fmMatch ? fmMatch[0] : '';
  const body = fmMatch ? content.slice(frontmatter.length) : content;

  const upgraded = body.replace(
    /\]\(\/([a-z0-9][a-z0-9-]*)([#?][^)*)]*?)?\)/g,
    (match, slug, suffix) => {
      if (slugs.has(slug)) {
        return `](/${locale}/${slug}${suffix ?? ''})`;
      }
      return match;
    }
  );

  return frontmatter + upgraded;
}

function processLocale(locale) {
  const slugs = getSlugs(locale);
  const dir = path.join(ROOT, 'src/content/guides', locale);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  let totalFiles = 0;
  let totalLinks = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const original = fs.readFileSync(filePath, 'utf-8');
    const updated = upgradeLinks(original, locale, slugs);

    if (updated !== original) {
      const diff = countDiff(original, updated);
      totalFiles++;
      totalLinks += diff;
      if (!DRY) {
        fs.writeFileSync(filePath, updated, 'utf-8');
      }
      console.log(`  [${locale}] ${file}: ${diff} link(s) upgraded${DRY ? ' (dry-run)' : ''}`);
    }
  }

  console.log(`  → ${locale}: ${totalFiles} files, ${totalLinks} links upgraded\n`);
  return { totalFiles, totalLinks };
}

function countDiff(a, b) {
  let count = 0;
  const reA = /\]\(\/([a-z0-9][a-z0-9-]*)([#?][^)*)]*?)?\)/g;
  const reB = /\]\(\/(fr|de)\/([a-z0-9][a-z0-9-]*)([#?][^)*)]*?)?\)/g;
  const aCount = (a.match(reA) || []).length;
  const bCount = (b.match(reB) || []).length;
  count = bCount - aCount;
  // Simpler: count replacements by line diff
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  count = 0;
  for (let i = 0; i < aLines.length; i++) {
    if (aLines[i] !== bLines[i]) count++;
  }
  return count;
}

console.log(`Locale link correction pass${DRY ? ' (DRY RUN)' : ''}\n`);
const fr = processLocale('fr');
const de = processLocale('de');
console.log(`Total: ${fr.totalFiles + de.totalFiles} files, ${fr.totalLinks + de.totalLinks} lines changed`);
