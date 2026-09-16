/**
 * Source adapters for the photo pipeline: Pexels, Unsplash and Wikimedia Commons.
 *
 * Same interface for all three:
 *   resolve(idOrTitle) → Candidate   (exact photo, used by fetch.mjs)
 *   search(query, opts) → Candidate[] (discovery, used by search.mjs)
 *
 * Candidate: { source, sourceId, sourceUrl, author, authorUrl, license, licenseUrl,
 *              width, height, title, downloadUrl, downloadLocation? }
 *
 * Rate limits (fotos.md §1): Pexels 200 req/h, Unsplash demo 50 req/h, Commons
 * ~1 req/s. Each adapter sleeps between its own requests. API keys come from
 * scripts/photos/env.mjs and are never logged.
 */
import { requireEnv } from './env.mjs';

const UA = 'VisitIsraelPhotoPipeline/2.0 (https://visitisrael.site; contact@visitisrael.site)';
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Closed list of licences the ledger accepts (fotos.md §4.3). */
export const LICENSES = {
  pexels: { license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' },
  unsplash: { license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
  'CC BY 4.0': { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' },
  'CC BY 3.0': { license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' },
  'CC BY 2.0': { license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
  'CC BY-SA 4.0': { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  'CC BY-SA 3.0': { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  'CC BY-SA 2.0': { license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' },
  CC0: { license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
};
export const ALLOWED_LICENSES = new Set(Object.values(LICENSES).map((l) => l.license));

async function getJson(url, headers = {}, what = url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json', ...headers } });
  if (!res.ok) throw new Error(`${what}: HTTP ${res.status}`);
  return res.json();
}

// --- Pexels -----------------------------------------------------------------
const PEXELS_DELAY = 2500; // ≤ 200 req/h with margin (fotos.md §1.1)
let pexelsKey;
const pexelsHeaders = () => ({ Authorization: (pexelsKey ??= requireEnv('PEXELS_API_KEY')) });

function pexelsCandidate(p) {
  return {
    source: 'pexels',
    sourceId: String(p.id),
    sourceUrl: p.url,
    author: p.photographer,
    authorUrl: p.photographer_url,
    ...LICENSES.pexels,
    width: p.width,
    height: p.height,
    title: p.alt ?? '',
    downloadUrl: p.src?.original,
  };
}

export const pexels = {
  async resolve(id) {
    await sleep(PEXELS_DELAY);
    const p = await getJson(`https://api.pexels.com/v1/photos/${encodeURIComponent(id)}`, pexelsHeaders(), `pexels ${id}`);
    return pexelsCandidate(p);
  },
  async search(query, { perPage = 15, orientation = 'landscape', page = 1 } = {}) {
    await sleep(PEXELS_DELAY);
    const qs = new URLSearchParams({ query, orientation, size: 'large', per_page: String(perPage), page: String(page) });
    const j = await getJson(`https://api.pexels.com/v1/search?${qs}`, pexelsHeaders(), `pexels search "${query}"`);
    return (j.photos ?? []).map(pexelsCandidate);
  },
};

// --- Unsplash ---------------------------------------------------------------
const UNSPLASH_DELAY = 4000; // demo apps: 50 req/h → ≤ 15 req/min with margin
let unsplashKey;
const unsplashHeaders = () => ({
  Authorization: `Client-ID ${(unsplashKey ??= requireEnv('UNSPLASH_ACCESS_KEY'))}`,
  'Accept-Version': 'v1',
});
const UTM = '?utm_source=visitisrael&utm_medium=referral';

function unsplashCandidate(p) {
  return {
    source: 'unsplash',
    sourceId: p.id,
    sourceUrl: `${p.links?.html}${UTM}`,
    author: p.user?.name,
    authorUrl: `${p.user?.links?.html}${UTM}`,
    ...LICENSES.unsplash,
    width: p.width,
    height: p.height,
    title: p.description ?? p.alt_description ?? '',
    location: p.location?.name ?? '',
    premium: Boolean(p.plus) || Boolean(p.premium),
    downloadUrl: p.urls?.raw,
    downloadLocation: p.links?.download_location,
  };
}

export const unsplash = {
  async resolve(id) {
    await sleep(UNSPLASH_DELAY);
    const p = await getJson(`https://api.unsplash.com/photos/${encodeURIComponent(id)}`, unsplashHeaders(), `unsplash ${id}`);
    return unsplashCandidate(p);
  },
  async search(query, { perPage = 15, orientation = 'landscape', page = 1 } = {}) {
    await sleep(UNSPLASH_DELAY);
    const qs = new URLSearchParams({ query, orientation, per_page: String(perPage), page: String(page) });
    const j = await getJson(`https://api.unsplash.com/search/photos?${qs}`, unsplashHeaders(), `unsplash search "${query}"`);
    return (j.results ?? []).map(unsplashCandidate);
  },
  /** Unsplash API guideline: hit download_location every time we download a photo. */
  async registerDownload(downloadLocation) {
    await sleep(UNSPLASH_DELAY);
    return getJson(downloadLocation, unsplashHeaders(), 'unsplash download');
  },
};

// --- Wikimedia Commons ------------------------------------------------------
const COMMONS_DELAY = 1000;
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

const stripHtml = (s) => (s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** Map Commons LicenseShortName → closed licence, or null when it is not commercial-safe. */
export function commonsLicense(shortName) {
  const s = (shortName ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (s === 'cc0') return LICENSES.CC0;
  const m = s.match(/^cc by(-sa)? (\d\.\d)/);
  if (!m) return null;
  const key = `CC BY${m[1] ? '-SA' : ''} ${m[2]}`;
  return LICENSES[key] ?? null;
}

function commonsAuthorUrl(meta, title) {
  const artist = meta.Artist?.value ?? '';
  const href = artist.match(/href="([^"]+)"/)?.[1];
  if (href) {
    if (href.startsWith('//')) return `https:${href}`;
    return href.startsWith('http') ? href : `https://commons.wikimedia.org${href}`;
  }
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title)}`;
}

function commonsCandidate(page) {
  const info = page.imageinfo?.[0];
  if (!info) return null;
  const meta = info.extmetadata ?? {};
  const title = page.title.replace(/^File:/, '').replace(/ /g, '_');
  const lic = commonsLicense(meta.LicenseShortName?.value);
  return {
    source: 'commons',
    sourceId: title,
    sourceUrl: info.descriptionurl ?? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title)}`,
    author: stripHtml(meta.Artist?.value) || info.user || 'Unknown',
    authorUrl: commonsAuthorUrl(meta, title),
    license: lic?.license ?? `UNSUPPORTED: ${meta.LicenseShortName?.value ?? 'none'}`,
    licenseUrl: lic?.licenseUrl ?? meta.LicenseUrl?.value ?? '',
    licenseOk: Boolean(lic),
    width: info.width,
    height: info.height,
    title: stripHtml(meta.ImageDescription?.value).slice(0, 200),
    downloadUrl: info.url,
  };
}

export const commons = {
  async resolve(title) {
    await sleep(COMMONS_DELAY);
    const t = title.replace(/^File:/, '').replace(/^https?:\/\/commons\.wikimedia\.org\/wiki\/File:/, '');
    const qs = new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: `File:${decodeURIComponent(t)}`,
      prop: 'imageinfo',
      iiprop: 'url|size|user|extmetadata',
      iiextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|ImageDescription|Credit',
    });
    const j = await getJson(`${COMMONS_API}?${qs}`, {}, `commons ${t}`);
    const page = Object.values(j.query?.pages ?? {})[0];
    if (!page || page.missing !== undefined) throw new Error(`commons: File:${t} no existe`);
    return commonsCandidate(page);
  },
  async search(query, { perPage = 15, minWidth = 2500 } = {}) {
    await sleep(COMMONS_DELAY);
    const qs = new URLSearchParams({
      action: 'query',
      format: 'json',
      generator: 'search',
      gsrsearch: `${query} filetype:bitmap filew:>${minWidth}`,
      gsrnamespace: '6',
      gsrlimit: String(perPage),
      prop: 'imageinfo',
      iiprop: 'url|size|user|extmetadata',
      iiextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|ImageDescription|Credit',
    });
    const j = await getJson(`${COMMONS_API}?${qs}`, {}, `commons search "${query}"`);
    return Object.values(j.query?.pages ?? {})
      .map(commonsCandidate)
      .filter(Boolean);
  },
};

export const SOURCES = { pexels, unsplash, commons };
