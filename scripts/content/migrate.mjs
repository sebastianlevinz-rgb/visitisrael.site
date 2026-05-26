/**
 * migrate.mjs — port the legacy English MDX prose into Astro content
 * collections.
 *
 * The legacy bodies embed Next.js/Velite custom components (ShabbatNotice,
 * AffiliateCard, KeyFacts, WhereToStay, …). The new architecture is decoupled:
 * the page TEMPLATE owns the dynamic conversion-first sections (tours, hotels,
 * FAQ, schema, byline) driven by frontmatter, while the collection body is
 * pure prose. So we strip those component tags and keep the writing.
 *
 * Frontmatter is preserved verbatim (valid YAML that src/content.config.ts
 * validates). Output: src/content/{regions,attractions,itineraries,legal}/.
 *
 * Usage: node scripts/content/migrate.mjs
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, basename } from 'node:path';

const MAP = [
  { from: 'content/en/regions', to: 'src/content/regions' },
  { from: 'content/en/sub-destinations', to: 'src/content/attractions' },
  { from: 'content/en/itineraries', to: 'src/content/itineraries' },
  { from: 'content/en/legal', to: 'src/content/legal' },
  { from: 'content/en/west-bank', to: 'src/content/attractions' },
];

// Block-level custom components to remove from prose bodies.
const COMPONENTS = [
  'ShabbatNotice', 'KeyFacts', 'AffiliateCard', 'AffiliateDisclosure',
  'WhereToStay', 'TransportInfo', 'BestTimeToVisit', 'AttractionGrid',
  'ItineraryCard', 'PhotoGallery', 'Price', 'RegionHero', 'InlineTourCTA',
  'FAQ', 'JsonLd', 'MDXContent', 'TourCTA', 'Callout', 'HotelCard',
];

function stripComponents(body) {
  let out = body;
  for (const name of COMPONENTS) {
    // Paired: <Name ...> ... </Name>
    out = out.replace(
      new RegExp(`<${name}[\\s\\S]*?</${name}>`, 'g'),
      '',
    );
    // Self-closing: <Name ... />
    out = out.replace(new RegExp(`<${name}[\\s\\S]*?/>`, 'g'), '');
  }
  // Strip any leftover import/export lines (MDX ESM).
  out = out.replace(/^\s*(import|export)\s.*$/gm, '');
  // Collapse 3+ blank lines.
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim() + '\n';
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: '', body: raw };
  return { fm: m[1], body: m[2] };
}

let count = 0;
for (const { from, to } of MAP) {
  let files;
  try {
    files = await readdir(from);
  } catch {
    continue;
  }
  await mkdir(to, { recursive: true });
  for (const f of files.filter((x) => x.endsWith('.mdx'))) {
    const raw = await readFile(join(from, f), 'utf8');
    const { fm, body } = splitFrontmatter(raw);
    const cleaned = stripComponents(body);
    const outName = basename(f, '.mdx') + '.md';
    await writeFile(join(to, outName), `---\n${fm}\n---\n\n${cleaned}`);
    count++;
  }
}
console.log(`migrated ${count} files → src/content/`);
