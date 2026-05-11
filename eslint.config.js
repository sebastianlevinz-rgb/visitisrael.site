/**
 * ESLint flat config (eslint@9) — the 3 inviolable rules from
 * RESEARCH §1.1 + STACK §7. Loaded by `pnpm lint`; runs on every
 * commit via Husky + lint-staged.
 *
 * Rule 1: tailwindcss/no-arbitrary-value      — bans bg-[#abc] etc.
 * Rule 2: no-restricted-syntax inline-hex     — bans style={{ color: '#fff' }}
 * Rule 3: no-restricted-syntax partner-URL    — bans direct booking.com etc.
 * Rule 4: no-restricted-syntax physical-util  — bans ml-/pr-/text-left etc.
 * Plus: @next/next/no-img-element + jsx-a11y recommended.
 * Escape hatch: lib/affiliate/**, tailwind.config.ts, app/globals.css.
 */

import next from 'eslint-config-next';
// NOTE: eslint-plugin-tailwindcss is intentionally NOT loaded here — its v3.x branch
// cannot resolve Tailwind v4's CSS-first @theme config and crashes at startup
// (see RESEARCH §1.1 fallback note). The 'no arbitrary value' check is implemented
// below as a no-restricted-syntax regex against `className=".*\[#.*\]"` patterns.
//
// jsx-a11y, react, react-hooks, @next/next, import are all registered by
// eslint-config-next ^16. Re-adding them triggers "Cannot redefine plugin".
// Rules that depend on those plugins must be applied in the SAME block that
// defines them — we patch the next 'next' config object below.

// Conflict D — all 11 partners covered (9 real + 2 stubs).
// hostname patterns intentionally lenient (subdomains/locales).
// Used inside ESQuery Literal[value=/.../] — escape dots once for the regex literal.
const partnerDomainRegex = String.raw`booking\.com|civitatis\.com|getyourguide\.com|viator\.com|rentalcars\.com|safetywing\.com|skyscanner\.|hostelworld\.com|klook\.com|gocity\.com|discovercars\.com`;

// Physical Tailwind directional utilities banned by I18N-03 / hebrew-tailwind-preset.
const physicalUtilRegex = String.raw`\b(ml-|mr-|pl-|pr-|left-|right-|border-l\b|border-r\b|rounded-l\b|rounded-r\b|text-left|text-right|scroll-ml-|scroll-mr-)\d?`;

// Augment the eslint-config-next 'next' block with our @next/next + react rules.
// Plugins (@next/next, react, jsx-a11y, import) are declared there; rules must live
// in the same block.
const nextWithAugments = next.map((block) => {
  if (block && typeof block === 'object' && block.name === 'next') {
    return {
      ...block,
      rules: {
        ...block.rules,
        '@next/next/no-img-element': 'error',
        'react/jsx-key': 'error',
      },
    };
  }
  if (block && typeof block === 'object' && block.name === 'next/typescript') {
    return {
      ...block,
      rules: {
        ...block.rules,
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    };
  }
  return block;
});

const config = [
  // eslint-config-next exports a flat config array in next ^15 / eslint-config-next ^16.
  ...nextWithAugments,

  {
    name: 'visitisrael/inviolable-rules',
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    rules: {
      // Rules 1 / 2 / 3 / 4 — no-restricted-syntax inviolables
      // (Rule 1 is implemented as a regex selector here because eslint-plugin-tailwindcss
      // does not yet support Tailwind v4's CSS-first @theme config.)
      'no-restricted-syntax': [
        'error',
        {
          // Rule 1: arbitrary hex in className (e.g., bg-[#abc] or text-[#fff])
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/\\[#[0-9a-fA-F]{3,8}\\]/]",
          message:
            'Arbitrary hex value in className banned (bg-[#abc] etc.). Use a Tailwind design token from @theme.',
        },
        {
          // Rule 2: inline-style hex (style={{ color: '#fff' }})
          selector:
            "JSXAttribute[name.name='style'] Property[key.name=/^(color|backgroundColor|borderColor|fill|stroke|background)$/] Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
          message:
            'Raw hex codes banned in inline styles. Use Tailwind design tokens from @theme.',
        },
        {
          // Rule 3: hard-coded partner URLs
          // ESQuery selector uses JS regex literal syntax — escape forward slashes
          // in the URL prefix; partnerDomainRegex already has escaped dots.
          selector: `Literal[value=/^https?:\\/\\/(www\\.)?(${partnerDomainRegex})/]`,
          message:
            'Hard-coded partner URL detected. Use lib/affiliate/{partner}.ts helper (escape hatch is lib/affiliate/**).',
        },
        {
          // Rule 4: physical Tailwind directional utilities in className
          selector: `JSXAttribute[name.name='className'] Literal[value=/${physicalUtilRegex}/]`,
          message:
            'Physical directional utility used. Use logical equivalent (ms-/me-/ps-/pe-/start-/end-/border-s/border-e/text-start/text-end). See hebrew-tailwind-preset.',
        },
      ],

      // NOTE: '@next/next/no-img-element', '@typescript-eslint/no-explicit-any',
      // and 'react/jsx-key' are owned by plugins registered inside eslint-config-next.
      // Flat config requires same-block plugin+rule; those rules are augmented above
      // via the nextWithAugments map.
    },
  },

  // Escape hatch — affiliate helpers + token files MAY use raw URLs / hex.
  {
    name: 'visitisrael/escape-hatch',
    files: [
      'lib/affiliate/**/*.ts',
      'lib/affiliate/**/*.tsx',
      'tailwind.config.ts',
      'app/globals.css',
      'velite.config.ts',
      'next.config.ts',
    ],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  // Test fixtures (created in plan 02 + plan 06) are intentionally violating.
  // The `pnpm lint tests/eslint-fixtures/` failure IS the test.
  // We do NOT ignore them globally — `pnpm lint tests/eslint-fixtures/foo.tsx`
  // must still produce the error. We only ignore the global crawl.
  {
    name: 'visitisrael/global-ignores',
    ignores: [
      '.next/**',
      '.velite/**',
      'node_modules/**',
      'coverage/**',
      'out/**',
      // ESLint shouldn't try to parse CSS — Tailwind handles app/globals.css.
      '**/*.css',
      // Test fixtures land in plans 02/06 — explicit invocation enforces the rule firing.
      // The default crawl skips them so global `pnpm lint` stays clean.
      'tests/eslint-fixtures/**',
    ],
  },
];

export default config;
