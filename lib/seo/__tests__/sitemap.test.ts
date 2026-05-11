/**
 * sitemap() — Phase 1.8 contract.
 *
 * - MUST iterate `locales` (REGISTERED set: he, en), NEVER `allowedLangs`
 *   (filesystem-ready set: he, en, fr). Conflict A enforced.
 * - HE URLs have NO locale prefix (`/`, `/jerusalem`).
 * - EN URLs ARE prefixed (`/en`, `/en/jerusalem`).
 * - Each entry carries `alternates.languages` keyed by `he` + `en`.
 * - Sitemap NEVER scans the filesystem (so dummy `content/fr/` files leak NOTHING).
 *
 * Phase 1: empty content; Phase 2+ extends via Velite output.
 */
import { describe, it, expect } from 'vitest';

import sitemap from '../../../app/sitemap';

describe('app/sitemap.ts — Phase 1.8 contract (FND-06, I18N-05)', () => {
  it('returns only URLs for registered locales (he + en); zero FR', async () => {
    const entries = await sitemap();
    for (const e of entries) {
      expect(e.url).not.toMatch(/\/fr(\/|$)/);
    }
  });

  it('HE URLs have NO locale prefix; EN URLs ARE prefixed', async () => {
    const entries = await sitemap();
    // Both locales emit AT LEAST a homepage.
    const heHome = entries.find(
      (e) => e.url === 'https://visitisrael.site/',
    );
    const enHome = entries.find(
      (e) => e.url === 'https://visitisrael.site/en',
    );
    expect(heHome).toBeDefined();
    expect(enHome).toBeDefined();
  });

  it('every entry has alternates.languages with he + en keys', async () => {
    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(0);
    for (const e of entries) {
      expect(e.alternates).toBeDefined();
      expect(e.alternates?.languages).toBeDefined();
      const langs = e.alternates!.languages as Record<string, string>;
      expect(Object.keys(langs).sort()).toEqual(['en', 'he']);
    }
  });

  it('NEVER emits an fr entry in alternates.languages', async () => {
    const entries = await sitemap();
    for (const e of entries) {
      const langs = e.alternates!.languages as Record<string, string>;
      expect(langs['fr']).toBeUndefined();
    }
  });

  it('includes the homepage in both locales', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://visitisrael.site/');
    expect(urls).toContain('https://visitisrael.site/en');
  });

  it('does not scan the filesystem (sitemap is computed from i18n-config only)', async () => {
    // The generator must produce the same output whether or not `content/fr/`
    // exists on disk. We assert this indirectly by verifying that NO entry's
    // URL or `alternates.languages` value contains `/fr/` — even though
    // `content/fr/` is allowed to exist per Conflict A.
    const entries = await sitemap();
    for (const e of entries) {
      expect(e.url).not.toMatch(/\/fr\//);
      const langs = e.alternates!.languages as Record<string, string>;
      for (const href of Object.values(langs)) {
        expect(href).not.toMatch(/\/fr(\/|$)/);
      }
    }
  });
});
