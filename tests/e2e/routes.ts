import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Every page route in the built site, read from dist/ (the e2e gate runs
 * `pnpm build` first). The previous suite kept hand-written lists of 1,600+ routes
 * that went stale the moment pages were removed; reading the build keeps smoke and
 * a11y coverage exactly equal to what ships.
 */
function walk(dir: string, base: string, out: string[]): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === 'pagefind' || name === '_astro' || name === 'images') continue;
      walk(p, base, out);
    } else if (name === 'index.html') {
      const rel = p.slice(base.length).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '').replace(/^\/+/, '');
      out.push(rel === '' ? '/' : `/${rel}`);
    }
  }
  return out;
}

export const ROUTES: string[] = walk(join(process.cwd(), 'dist'), join(process.cwd(), 'dist'), []).sort();
