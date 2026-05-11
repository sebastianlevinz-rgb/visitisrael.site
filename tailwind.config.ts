import type { Config } from 'tailwindcss';

/**
 * Tailwind v4 config — minimal stub.
 *
 * Tailwind v4 reads design tokens from the `@theme {}` block in
 * `app/globals.css`. This config file exists only to:
 *  - Declare `content` paths for any tooling that still expects them
 *    (e.g., `eslint-plugin-tailwindcss` once it gains v4 support).
 *  - Provide a future-proof slot for plugins.
 *
 * The 3-layer token system (foundation / semantic / component) lives in
 * `app/globals.css` under `@theme {}`. See plan 02 design-tokens for the
 * full token contract.
 *
 * NOTE: This file is in the ESLint escape-hatch list (eslint.config.js)
 * because it is framework config — no inviolable rules apply.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  plugins: [],
};

export default config;
