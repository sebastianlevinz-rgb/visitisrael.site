/**
 * Discovery helper for curating scripts/photos/manifest.json.
 *
 *   node scripts/photos/search.mjs pexels "Masada sunrise" [--n 15] [--page 2]
 *   node scripts/photos/search.mjs unsplash "Sea of Galilee"
 *   node scripts/photos/search.mjs commons "Makhtesh Ramon aerial" [--minw 2500]
 *   node scripts/photos/search.mjs resolve pexels 15442791
 *   node scripts/photos/search.mjs resolve commons "Haifa_BW_4.JPG"
 *
 * Prints one candidate per line: id · WxH · author · licence · title · url.
 * Nothing is downloaded; the manifest is written by hand from what you verify here.
 */
import { SOURCES } from './sources.mjs';

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : dflt;
};
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));

const line = (c) =>
  [
    c.sourceId,
    `${c.width}x${c.height}`,
    c.author,
    c.license + (c.premium ? ' [PREMIUM — no usar]' : ''),
    (c.location ? `[${c.location}] ` : '') + (c.title || '').slice(0, 110),
    c.sourceUrl,
  ].join(' · ');

if (positional[0] === 'resolve') {
  const [, source, id] = positional;
  const c = await SOURCES[source].resolve(id);
  console.log(JSON.stringify(c, null, 2));
} else {
  const [source, query] = positional;
  if (!SOURCES[source] || !query) {
    console.error('uso: search.mjs <pexels|unsplash|commons> "query" [--n 15] [--page 1] [--minw 2500]');
    process.exit(2);
  }
  const list = await SOURCES[source].search(query, {
    perPage: Number(flag('--n', 15)),
    page: Number(flag('--page', 1)),
    minWidth: Number(flag('--minw', 2500)),
  });
  for (const c of list) console.log(line(c));
  console.log(`— ${list.length} resultados (${source}: "${query}")`);
}
