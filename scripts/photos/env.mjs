/**
 * Minimal .env reader for the photo pipeline (no dotenv dependency).
 *
 * Reads KEY=value lines from the repo's .env (gitignored) and returns the merged
 * environment. Values already present in process.env win. Key VALUES are never
 * printed or written anywhere by this module — callers must keep it that way.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));

/** @returns {Record<string, string | undefined>} */
export function loadEnv() {
  const out = { ...process.env };
  for (const file of ['.env', '.env.local']) {
    let text;
    try {
      text = readFileSync(`${ROOT}${file}`, 'utf8');
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

/** The value of a required key, or a clear error that never echoes the value. */
export function requireEnv(name) {
  const value = loadEnv()[name];
  if (!value) throw new Error(`Falta ${name} en .env (ver gestion/auditoria/fotos.md §2 para crear la key).`);
  return value;
}
