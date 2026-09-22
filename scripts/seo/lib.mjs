/**
 * Utilidades compartidas de los scripts de auditoría SEO (scripts/seo/*.mjs).
 *
 * - readEnv()       → variables de .env (gitignored) fusionadas con process.env; nunca imprime valores.
 * - loadDist()      → todas las páginas HTML de dist/ con su ruta pública (trailingSlash: false).
 * - parseHtml(html) → árbol DOM de node-html-parser.
 * - writeJson(name, data) → escribe data/seo/<name>.json con `generatedAt` (ISO).
 * - readJson(name)  → lee data/seo/<name>.json o devuelve null si no existe.
 * - ROOT, DIST, DATA_DIR, SITE, sleep, textOf, pathOf.
 *
 * Las firmas de estas funciones son contrato: otros scripts las importan.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

/** Raíz del repo (con barra final). */
export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
/** Carpeta de build. */
export const DIST = join(ROOT, 'dist');
/** Carpeta de datos versionados de la auditoría SEO. */
export const DATA_DIR = join(ROOT, 'data', 'seo');
/** Dominio de producción (sin barra final). */
export const SITE = 'https://visitisrael.site';
/** Idiomas del sitio; `en` va en la raíz, el resto con prefijo. */
export const LOCALES = ['en', 'fr', 'de', 'es', 'he'];

/**
 * Lee .env y .env.local de la raíz (KEY=value) y devuelve el entorno fusionado.
 * Los valores ya presentes en process.env ganan. Este módulo no imprime ni escribe
 * ningún valor: quien lo llame tiene que mantener eso.
 * @returns {Record<string, string | undefined>}
 */
export function readEnv() {
  const out = { ...process.env };
  for (const file of ['.env', '.env.local']) {
    let text;
    try {
      text = readFileSync(join(ROOT, file), 'utf8');
    } catch {
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      let value = m[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (out[m[1]] === undefined) out[m[1]] = value;
    }
  }
  return out;
}

/**
 * Valor obligatorio de .env; el error nunca muestra el valor.
 * @param {string} name
 */
export function requireEnv(name) {
  const value = readEnv()[name];
  if (!value) throw new Error(`Falta ${name} en .env (raíz del repo, gitignored).`);
  return value;
}

/**
 * Ruta pública de un archivo HTML de dist/, respetando trailingSlash: false.
 *   dist/index.html            → /
 *   dist/jerusalem/index.html  → /jerusalem
 *   dist/es/index.html         → /es
 *   dist/404.html              → /404
 * @param {string} file ruta absoluta dentro de dist/
 */
export function pathOf(file) {
  let rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'/index.html'.length);
  else if (rel.endsWith('.html')) rel = rel.slice(0, -'.html'.length);
  return `/${rel}`;
}

/** Idioma de una ruta pública según su prefijo. @param {string} path */
export function localeOf(path) {
  const m = path.match(/^\/(fr|de|es|he)(\/|$)/);
  return m ? m[1] : 'en';
}

/**
 * Lista todas las páginas HTML de dist/ (incluye 404 e internas: filtrar afuera).
 * @returns {{ path: string, file: string, locale: string }[]} ordenadas por ruta
 */
export function loadDist() {
  if (!existsSync(DIST)) {
    throw new Error('No existe dist/: correr pnpm build antes.');
  }
  /** @type {string[]} */
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        if (name === '_astro' || name === 'pagefind' || name === 'images') continue;
        walk(full);
      } else if (name.endsWith('.html')) {
        files.push(full);
      }
    }
  };
  walk(DIST);
  return files
    .map((file) => {
      const path = pathOf(file);
      return { path, file, locale: localeOf(path) };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Parsea HTML a un árbol consultable (node-html-parser).
 * @param {string} html
 */
export function parseHtml(html) {
  return parse(html, {
    lowerCaseTagName: true,
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true, pre: true },
  });
}

/** Texto plano normalizado (espacios colapsados) de un nodo o string. */
export function textOf(node) {
  const raw = typeof node === 'string' ? node : node?.text ?? '';
  return raw.replace(/\s+/g, ' ').trim();
}

/** Cantidad de palabras de un texto (separadas por espacios; ignora símbolos sueltos). */
export function wordCount(text) {
  return textOf(text)
    .split(' ')
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/**
 * Escribe data/seo/<name>.json (o una ruta absoluta/relativa que termine en .json)
 * agregando `generatedAt`. Devuelve la ruta escrita.
 * @param {string} name  "onpage" | "onpage.json" | "data/seo/onpage.json"
 * @param {Record<string, unknown>} data
 */
export function writeJson(name, data) {
  const file = resolveJson(name);
  mkdirSync(dirname(file), { recursive: true });
  const out = { generatedAt: new Date().toISOString(), ...data };
  writeFileSync(file, JSON.stringify(out, null, 2) + '\n', 'utf8');
  return file;
}

/**
 * Lee data/seo/<name>.json; null si no existe o no parsea.
 * @param {string} name
 * @returns {any | null}
 */
export function readJson(name) {
  const file = resolveJson(name);
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

/** @param {string} name */
function resolveJson(name) {
  if (/[\\/]/.test(name)) return name.startsWith(ROOT) ? name : join(ROOT, name);
  return join(DATA_DIR, name.endsWith('.json') ? name : `${name}.json`);
}

/** Espera `ms` milisegundos. */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * fetch con timeout y un reintento opcional ante 429/5xx o error de red.
 * Devuelve la Response (aunque no sea ok) o lanza el último error.
 * @param {string} url
 * @param {{ retries?: number, timeoutMs?: number, waitMs?: number, init?: RequestInit }} [opts]
 */
export async function fetchRetry(url, opts = {}) {
  const { retries = 1, timeoutMs = 90_000, waitMs = 3000, init = {} } = opts;
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
      if ((res.status === 429 || res.status >= 500) && attempt < retries) {
        await sleep(waitMs);
        continue;
      }
      return res;
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(waitMs);
    }
  }
  throw lastErr ?? new Error(`fetch falló: ${url}`);
}
