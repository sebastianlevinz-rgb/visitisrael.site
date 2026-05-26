/**
 * build-manifest.mjs — generate a photo manifest from attraction content.
 *
 * Reads src/content/attractions/*.md, derives a Commons search query from the
 * landmark name + region, and writes a manifest fetch-commons.mjs can consume.
 * The fetch step skips images already real (>80KB), so re-running is safe.
 *
 * Usage: node scripts/photos/build-manifest.mjs > scripts/photos/manifests/attractions-all.json
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const REGION_NAME = {
  jerusalem: 'Jerusalem', 'tel-aviv': 'Tel Aviv', 'dead-sea': 'Dead Sea',
  galilee: 'Galilee', eilat: 'Eilat', negev: 'Negev', nazareth: 'Nazareth',
  haifa: 'Haifa', golan: 'Golan Heights', caesarea: 'Caesarea', akko: 'Acre',
};

// Hand-tuned queries for landmarks whose name alone is ambiguous on Commons.
const OVERRIDE = {
  'tel-aviv-old-jaffa': 'Old Jaffa port Tel Aviv',
  'tel-aviv-carmel-market': 'Carmel Market Tel Aviv',
  'tel-aviv-rothschild': 'Rothschild Boulevard Tel Aviv Bauhaus',
  'tel-aviv-neve-tzedek': 'Neve Tzedek Tel Aviv',
  'tel-aviv-florentin': 'Florentin Tel Aviv street art',
  'tel-aviv-tayelet': 'Tel Aviv beach promenade tayelet',
  'tel-aviv-tel-aviv-museum': 'Tel Aviv Museum of Art building',
  'dead-sea-masada': 'Masada fortress Israel aerial',
  'dead-sea-ein-gedi': 'Ein Gedi nature reserve waterfall',
  'dead-sea-qumran': 'Qumran caves Dead Sea',
  'dead-sea-ein-bokek': 'Ein Bokek Dead Sea beach hotels',
  'dead-sea-mineral-beach': 'Dead Sea mud beach floating',
  'galilee-capernaum': 'Capernaum synagogue Sea of Galilee',
  'galilee-tiberias': 'Tiberias Sea of Galilee promenade',
  'galilee-mount-of-beatitudes': 'Mount of Beatitudes church Galilee',
  'galilee-mount-arbel': 'Mount Arbel cliff Sea of Galilee',
  'galilee-magdala': 'Magdala synagogue Galilee',
  'galilee-yardenit': 'Yardenit baptismal site Jordan River',
  'eilat-coral-beach': 'Eilat Coral Beach Red Sea',
  'eilat-dolphin-reef': 'Dolphin Reef Eilat',
  'eilat-underwater-observatory': 'Eilat Underwater Observatory marine park',
  'eilat-timna-park': 'Timna Park pillars Negev',
  'eilat-red-canyon': 'Red Canyon Eilat',
  'negev-mitzpe-ramon': 'Makhtesh Ramon crater Mitzpe Ramon',
  'negev-avdat': 'Avdat Nabatean ruins Negev',
  'negev-ein-avdat': 'Ein Avdat canyon spring Negev',
  'negev-sde-boker': 'Sde Boker Ben Gurion Negev',
  'negev-bedouin-hospitality': 'Bedouin tent Negev desert',
  'nazareth-basilica-of-the-annunciation': 'Basilica of the Annunciation Nazareth',
  'nazareth-marys-well': 'Marys Well Nazareth church',
  'nazareth-old-city': 'Nazareth old city market',
  'nazareth-mount-of-precipice': 'Mount Precipice Nazareth view',
  'haifa-bahai-gardens': 'Bahai Gardens Haifa terraces',
  'haifa-german-colony': 'German Colony Haifa Ben Gurion street',
  'haifa-stella-maris': 'Stella Maris monastery Haifa',
  'haifa-wadi-nisnas': 'Wadi Nisnas Haifa market',
  'haifa-carmel-national-park': 'Mount Carmel national park Haifa',
  'golan-banias': 'Banias waterfall Golan Heights',
  'golan-nimrod-fortress': 'Nimrod Fortress Golan Heights',
  'golan-mount-bental': 'Mount Bental Golan Heights view',
  'golan-mount-hermon': 'Mount Hermon Golan snow',
  'golan-druze-villages': 'Druze village Golan Heights',
  'caesarea-national-park': 'Caesarea Maritima Roman theatre',
  'caesarea-harbour': 'Caesarea harbour ruins Israel',
  'caesarea-aqueduct-beach': 'Caesarea Roman aqueduct beach',
  'caesarea-ralli-museum': 'Caesarea Israel sculpture',
  'akko-old-city': 'Acre Akko old city sea wall',
  'akko-hospitaller-knights': 'Acre Knights Hospitaller hall crusader',
  'akko-templar-tunnel': 'Acre Templar tunnel',
  'akko-khan-al-umdan': 'Khan al-Umdan Acre',
  'akko-bahai-mansion': 'Bahji Bahai gardens Acre',
};

const dir = 'src/content/attractions';
const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
const out = [];
for (const f of files) {
  const id = f.replace(/\.md$/, '');
  const raw = await readFile(join(dir, f), 'utf8');
  const hero = raw.match(/heroImage:\s*(\S+)/)?.[1];
  const title = raw.match(/title:\s*['"]?(.+?)['"]?\s*$/m)?.[1] ?? id;
  const region = raw.match(/^region:\s*(\S+)/m)?.[1] ?? id.split('-')[0];
  if (!hero) continue;
  const outPath = 'public' + hero;
  const name = title.split(/[:(]/)[0].trim();
  const regionName = REGION_NAME[region] ?? region;
  const query = OVERRIDE[id] ?? `${name} ${regionName} Israel`;
  out.push({ outPath, query, width: 1920, crop: { w: 1600, h: 1000 } });
}
process.stdout.write(JSON.stringify(out, null, 2) + '\n');
