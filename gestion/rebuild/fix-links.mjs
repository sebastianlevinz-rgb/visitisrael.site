/**
 * Arregla los links internos del contenido que apuntan a páginas dadas de baja.
 *
 * Para cada link markdown [texto](/ruta) de src/content que no existe en dist/:
 *   - si hay una página nueva que cubre esa intención (destinos.mjs, specific) y no es
 *     la misma página → se reescribe el destino (en el idioma de la página si existe);
 *   - si no hay equivalente, o el destino sería la propia página → se quita el link y
 *     queda el texto.
 *
 * Uso: node gestion/rebuild/fix-links.mjs   (después de `pnpm build`)
 * Escribe gestion/rebuild/links-arreglados.csv con cada cambio.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { targetFor } from './destinos.mjs';

const ROOT = new URL('../../', import.meta.url);
const toPath = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DIST = toPath(new URL('dist/', ROOT));
const CONTENT = toPath(new URL('src/content/', ROOT));

function walk(dir, pred) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, pred));
    else if (pred(name)) out.push(p);
  }
  return out;
}
const NEW = new Set(
  walk(DIST, (n) => n === 'index.html').map((p) => {
    const rel = p.slice(DIST.length).replace(/\\/g, '/').replace(/\/?index\.html$/, '');
    return rel === '' ? '/' : `/${rel}`.replace(/^\/\//, '/');
  }),
);

/** URL path of a content file. */
function pagePath(file) {
  const rel = file.slice(CONTENT.length).replace(/\\/g, '/').replace(/\.md$/, '');
  const [coll, ...rest] = rel.split('/');
  const lang = ['fr', 'de', 'es'].includes(rest[0]) ? rest.shift() : '';
  const slug = rest.join('/');
  const base = coll === 'itineraries' ? `/itineraries/${slug}` : `/${slug}`;
  return { lang, path: `${lang ? `/${lang}` : ''}${base}`, enPath: base };
}

const changes = [];
const LINK = /\[([^\]\n]+)\]\((\/[^)\s#?]*)([#?][^)\s]*)?(\s+"[^"]*")?\)/g;

for (const file of walk(CONTENT, (n) => n.endsWith('.md'))) {
  const src = readFileSync(file, 'utf8');
  const page = pagePath(file);
  const parts = src.split(/^---\s*$/m); // [ '', frontmatter, body... ]
  if (parts.length < 3) continue;
  const head = `${parts[0]}---${parts[1]}---`;
  let body = parts.slice(2).join('---');

  body = body.replace(LINK, (whole, text, rawPath, suffix = '', title = '') => {
    if (rawPath.startsWith('/images/')) return whole;
    const clean = rawPath.length > 1 ? rawPath.replace(/\/$/, '') : rawPath;
    if (NEW.has(clean)) return whole;

    const m = clean.match(/^\/(fr|de|es)(\/.*|$)/);
    const rest = m ? m[2] || '/' : clean;
    const { to, specific } = targetFor(rest);
    const lang = page.lang || (m ? m[1] : '');
    const localized = lang ? `/${lang}${to === '/' ? '' : to}` : to;
    const dest = NEW.has(localized) ? localized : to;

    if (!specific || !NEW.has(dest) || dest === page.path || to === page.enPath) {
      changes.push([page.path, clean, '(sin link)', text]);
      return text;
    }
    changes.push([page.path, clean, dest, text]);
    return `[${text}](${dest}${title})`;
  });

  const out = `${head}${body}`;
  if (out !== src) writeFileSync(file, out);
}

const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
writeFileSync(
  new URL('gestion/rebuild/links-arreglados.csv', ROOT),
  ['pagina,link_viejo,destino_nuevo,texto', ...changes.map((c) => c.map(esc).join(','))].join('\n') + '\n',
);
const unlinked = changes.filter((c) => c[2] === '(sin link)').length;
console.log(`Links arreglados: ${changes.length} · reescritos a una página nueva: ${changes.length - unlinked} · convertidos en texto: ${unlinked}`);
