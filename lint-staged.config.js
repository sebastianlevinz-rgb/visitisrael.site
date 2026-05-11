/**
 * lint-staged config — runs on every commit via Husky pre-commit hook.
 *
 * Validators wired into staged changes:
 *   - photo-credits validator -> plan 03 (any change touching data/photo-credits.json,
 *     content/**, app/**, components/**, or public/images/** re-runs the CI gate)
 *   - schema validator        -> plan 04 (.mdx change in content/ triggers re-validation)
 *
 * The photo-credits validator runs as a `() => 'pnpm qa:credits'` function so it
 * scans the whole repo (full sweep), not just the staged files — UNDOCUMENTED /
 * ORPHANED / WIDTH MISMATCH errors are cross-file by nature and a partial scan
 * would miss them.
 */
const config = {
  '*.{ts,tsx,mjs,cjs,js}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css}': ['prettier --write'],
  // Trigger a full credits sweep when any image/ledger/MDX-reference touch lands
  'data/photo-credits.json': () => 'pnpm qa:credits',
  'public/images/**/*.{avif,webp,jpg,jpeg,png}': () => 'pnpm qa:credits',
  '{app,components,content}/**/*.{tsx,mdx}': () => 'pnpm qa:credits',
  // Schema validator runs whenever schema generators or the religious-sites
  // dictionary change (plan 04). Function form ensures full sweep regardless
  // of which file in the set was staged.
  'lib/schema/**/*.ts': () => 'pnpm qa:schema',
  'data/religious-sites.json': () => 'pnpm qa:schema',
};

export default config;
