/**
 * `next.config.ts` image-pipeline contract — IMG-03 + IMG-06.
 *
 * Verifies the LOCKED image config that plan 01 wrote:
 *   - deviceSizes   = [320, 640, 1024, 1600]                 (IMG-03)
 *   - formats       = ['image/avif', 'image/webp']           (IMG-03)
 *   - remotePatterns hostnames include Wikimedia + Unsplash + Pexels + IGPO
 *     (IMG-06 source allowlist)
 *   - minimumCacheTTL >= 31_536_000  (1 year)
 *
 * Plan 03 does NOT modify `next.config.ts`; this test asserts the contract
 * locked in plan 01 so that any future plan that touches the image pipeline
 * breaks this test loudly.
 *
 * Strategy: parse the file as text and assert on string content. Importing
 * the `.ts` file directly would require evaluating it (it imports next-intl
 * plugin), and exporting a wrapped config makes runtime introspection
 * awkward. Source-text assertions are reliable and cheap.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let source: string;

beforeAll(() => {
  source = readFileSync(resolve(process.cwd(), 'next.config.ts'), 'utf8');
});

describe('next.config.ts image pipeline — IMG-03 / IMG-06', () => {
  it('deviceSizes equals [320, 640, 1024, 1600] exactly', () => {
    // Normalize whitespace then match the array
    const collapsed = source.replace(/\s+/g, ' ');
    expect(collapsed).toMatch(
      /deviceSizes:\s*\[\s*320\s*,\s*640\s*,\s*1024\s*,\s*1600\s*\]/,
    );
  });

  it("formats equals ['image/avif', 'image/webp'] in that order (AVIF preferred)", () => {
    const collapsed = source.replace(/\s+/g, ' ');
    expect(collapsed).toMatch(
      /formats:\s*\[\s*['"]image\/avif['"]\s*,\s*['"]image\/webp['"]\s*\]/,
    );
  });

  it('remotePatterns allowlists upload.wikimedia.org (IMG-06 primary)', () => {
    expect(source).toMatch(/hostname:\s*['"]upload\.wikimedia\.org['"]/);
  });

  it('remotePatterns allowlists images.unsplash.com (abstract heroes only)', () => {
    expect(source).toMatch(/hostname:\s*['"]images\.unsplash\.com['"]/);
  });

  it('remotePatterns allowlists images.pexels.com (abstract heroes only)', () => {
    expect(source).toMatch(/hostname:\s*['"]images\.pexels\.com['"]/);
  });

  it('remotePatterns allowlists gpophotoeng.gov.il (IGPO supplementary)', () => {
    expect(source).toMatch(/hostname:\s*['"]gpophotoeng\.gov\.il['"]/);
  });

  it('minimumCacheTTL is at least 31536000 (1 year)', () => {
    // Accept either 31536000 or the more-readable 31_536_000 separator
    expect(source).toMatch(/minimumCacheTTL:\s*31_?536_?000/);
  });

  it('all remotePatterns use https protocol (no http fallback for image sources)', () => {
    const patterns = [
      'upload.wikimedia.org',
      'images.unsplash.com',
      'images.pexels.com',
      'gpophotoeng.gov.il',
    ];
    // For each hostname, the preceding `protocol:` (within the same entry) must be 'https'
    for (const host of patterns) {
      const escapedHost = host.replace(/\./g, '\\.');
      const entryRegex = new RegExp(
        `\\{[^}]*protocol:\\s*['"]https['"][^}]*hostname:\\s*['"]${escapedHost}['"]`,
      );
      expect(source, `${host} must be protocol=https`).toMatch(entryRegex);
    }
  });
});
