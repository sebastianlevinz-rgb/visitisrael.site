/**
 * lint-staged config — runs on every commit via Husky pre-commit hook.
 *
 * Validators are placeholders here; they're populated by later plans:
 *   - photo-credits validator -> plan 03 (data/photo-credits.json change triggers re-validation)
 *   - schema validator        -> plan 04 (.mdx change in content/ triggers re-validation)
 *
 * Per RESEARCH §4.2, those validators are APPENDED to this config — not
 * replacing the lint+prettier base.
 */
const config = {
  '*.{ts,tsx,mjs,cjs,js}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css}': ['prettier --write'],
};

export default config;
