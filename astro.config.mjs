// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';
import { scanDist, formatReport } from './scripts/qa/affiliate-guard.mjs';

const SITE = 'https://visitisrael.site';

// --- Affiliate guard -----------------------------------------------------------
// Reads the built HTML (what people receive, not the code) after every build.
// A placeholder ID like `aid=BOOKING_AID` fails the build in every mode; in
// production mode a partner link without an affiliate ID fails it too. In
// pre-approval mode it prints "MODO PRE-AFILIADO — N links sin monetizar".
/** PUBLIC_AFFILIATE_MODE from the environment (Vercel) or a local .env file. */
function affiliateMode() {
  let value = process.env.PUBLIC_AFFILIATE_MODE;
  if (value === undefined) {
    for (const file of ['.env.production', '.env']) {
      try {
        const m = readFileSync(file, 'utf8').match(/^PUBLIC_AFFILIATE_MODE\s*=\s*["']?([^"'\r\n]*)/m);
        if (m) {
          value = m[1];
          break;
        }
      } catch {
        // No such file: keep looking.
      }
    }
  }
  return value === 'production' ? 'production' : 'pre';
}

function affiliateGuard() {
  return {
    name: 'affiliate-guard',
    hooks: {
      /** @param {{ dir: URL, logger: import('astro').AstroIntegrationLogger }} ctx */
      'astro:build:done': ({ dir, logger }) => {
        const mode = affiliateMode();
        const report = scanDist(fileURLToPath(dir), mode);
        for (const line of formatReport(report)) {
          if (report.ok) logger.info(line);
          else logger.error(line);
        }
        if (!report.ok) throw new Error(`affiliate-guard: ${report.errors.join(' | ')}`);
      },
    },
  };
}

// --- Sitemap <lastmod> from content `updatedAt` -------------------------------
// @astrojs/sitemap emits no <lastmod> by default. We build a path → ISO-date map
// from each content file's `updatedAt` frontmatter and feed it through the
// `serialize` hook so crawlers see an accurate, honest last-modified per page.
// The map is built lazily (on the first serialize call, at astro:build:done),
// when the content files are present on disk. Routing mirrors the page routes:
//   guides|legal|regions/<id>.md → /<id>
//   itineraries/<id>.md          → /itineraries/<id>
const CONTENT = new URL('./src/content/', import.meta.url);
/** @param {string} coll */
const mdFiles = (coll) => {
  try {
    return readdirSync(new URL(`${coll}/`, CONTENT)).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
};
/** @param {string} coll @param {string} file */
const readBody = (coll, file) => readFileSync(new URL(`${coll}/${file}`, CONTENT), 'utf8');
/** @param {string} body */
const matchDate = (body) => {
  const m = body.match(/^updatedAt:\s*['"]?(\d{4}-\d{2}-\d{2})/m);
  return m ? m[1] : null;
};

/** @type {Map<string, string> | undefined} */
let _lastmodMap;
function lastmodMap() {
  if (_lastmodMap) return _lastmodMap;
  _lastmodMap = new Map();
  for (const coll of ['guides', 'legal', 'regions']) {
    for (const f of mdFiles(coll)) {
      const d = matchDate(readBody(coll, f));
      if (d) _lastmodMap.set(f.replace(/\.md$/, ''), d);
    }
  }
  for (const f of mdFiles('itineraries')) {
    const d = matchDate(readBody('itineraries', f));
    if (d) _lastmodMap.set(`itineraries/${f.replace(/\.md$/, '')}`, d);
  }
  return _lastmodMap;
}

// 100% static output — the whole site is content + images, no SSR needed.
// Sharp image service optimizes local /src and /public images at build time.
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  // English-first; French, German, Spanish added progressively.
  // prefixDefaultLocale:false keeps en at the root — see .loop/I18N-PLAN.md.
  i18n: {
    locales: ['en', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr', de: 'de', es: 'es' },
      },
      // Internal modules are noindex; keep them out of the sitemap.
      filter: (page) =>
        !/\/(dashboard|pitch|competitors|content-library|search)(\/|$)/.test(
          page
        ),
      // Attach an accurate <lastmod> from each page's content `updatedAt`.
      serialize(item) {
        try {
          const key = new URL(item.url).pathname.replace(/^\/+|\/+$/g, '');
          const date = lastmodMap().get(key);
          if (date) item.lastmod = new Date(`${date}T00:00:00Z`).toISOString();
        } catch {
          // Leave the entry untouched if anything goes wrong.
        }
        return item;
      },
    }),
    affiliateGuard(),
    pagefind(),
  ],
  image: {
    // Allow remote optimization only from Wikimedia (used by the photo pipeline
    // if we ever reference remote originals; local files are the default path).
    domains: ['upload.wikimedia.org'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
