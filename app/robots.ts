/**
 * robots.txt generator.
 *
 * Disallows `/admin/` (audit dashboard, components playground, future admin
 * surfaces) and `/api/` (Next.js route handlers). Points crawlers at the
 * sitemap at the canonical origin.
 *
 * Per RESEARCH §1.8 and FND-06.
 */
import type { MetadataRoute } from 'next';

const ORIGIN = 'https://visitisrael.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  };
}
