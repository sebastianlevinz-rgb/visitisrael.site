/**
 * robots() — Phase 1.8 contract.
 *
 * - Disallows `/admin/` AND `/api/`.
 * - Sitemap URL points to https://visitisrael.site/sitemap.xml.
 */
import { describe, it, expect } from 'vitest';

import robots from '../../../app/robots';

describe('app/robots.ts — Phase 1.8 contract (FND-06)', () => {
  it('disallows /admin/ and /api/ for all user agents', () => {
    const r = robots();
    // rules can be a single object or an array; normalize.
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules.length).toBeGreaterThan(0);
    const all = rules.find((rule) => rule.userAgent === '*');
    expect(all).toBeDefined();
    const disallow = Array.isArray(all!.disallow)
      ? all!.disallow
      : [all!.disallow as string];
    expect(disallow).toContain('/admin/');
    expect(disallow).toContain('/api/');
  });

  it('points sitemap to https://visitisrael.site/sitemap.xml', () => {
    const r = robots();
    const sitemap = Array.isArray(r.sitemap) ? r.sitemap[0] : r.sitemap;
    expect(sitemap).toBe('https://visitisrael.site/sitemap.xml');
  });
});
