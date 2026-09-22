/**
 * pnpm seo:refresh — corre toda la auditoría SEO en orden y tolera scripts ausentes.
 *
 *   1. onpage.mjs       (local, lee dist/: requiere pnpm build antes)
 *   2. psi.mjs          (PageSpeed Insights, API pública)
 *   3. keywords.mjs     (si existe)
 *   4. competitors.mjs  (si existe)
 *   5. backlinks.mjs    (si existe)
 *
 * Un script que falla no corta los demás: se informa al final y el proceso sale con 1.
 * Los argumentos se pasan tal cual a cada script (p. ej. `--desktop` para psi).
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('./', import.meta.url));
const STEPS = ['onpage', 'psi', 'keywords', 'competitors', 'backlinks'];
const args = process.argv.slice(2);

const failed = [];
const skipped = [];
for (const step of STEPS) {
  const file = `${here}${step}.mjs`;
  if (!existsSync(file)) {
    skipped.push(step);
    console.log(`\n== seo:${step} — no existe scripts/seo/${step}.mjs, se salta`);
    continue;
  }
  console.log(`\n== seo:${step}`);
  const res = spawnSync(process.execPath, [file, ...args], { stdio: 'inherit' });
  if (res.status !== 0) failed.push(step);
}

console.log('\n== seo:refresh');
console.log(`  ok: ${STEPS.filter((s) => !failed.includes(s) && !skipped.includes(s)).join(', ') || '—'}`);
if (skipped.length) console.log(`  sin script: ${skipped.join(', ')}`);
if (failed.length) {
  console.log(`  FALLARON: ${failed.join(', ')}`);
  process.exit(1);
}
