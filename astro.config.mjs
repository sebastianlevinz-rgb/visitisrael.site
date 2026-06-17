// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://visitisrael.site';

// 100% static output — the whole site is content + images, no SSR needed.
// Sharp image service optimizes local /src and /public images at build time.
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Internal modules are noindex; keep them out of the sitemap.
      filter: (page) =>
        !/\/(dashboard|pitch|competitors|content-library|search)(\/|$)/.test(
          page
        ),
    }),
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
