/**
 * middleware.ts — basic-auth gate for /admin/* (plan 10 task 3).
 *
 * Source-level + runtime contract proving:
 *   - middleware.ts imports `evaluateBasicAuth` + `isAdminPath` from lib/auth/basic
 *   - matcher carves out api/admin so the API route is gated too
 *   - production NODE_ENV + missing auth header → 401 + WWW-Authenticate
 *   - dev NODE_ENV → fall-through (next-intl spy called)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('middleware.ts — basic-auth for /admin/* (plan 10)', () => {
  it('imports evaluateBasicAuth + isAdminPath from lib/auth/basic', () => {
    const src = readFileSync(
      join(process.cwd(), 'middleware.ts'),
      'utf8',
    );
    expect(src).toContain('evaluateBasicAuth');
    expect(src).toContain('isAdminPath');
    expect(src).toContain("from './lib/auth/basic'");
  });

  it('matcher excludes api except /api/admin (so admin API is gated)', () => {
    const src = readFileSync(
      join(process.cwd(), 'middleware.ts'),
      'utf8',
    );
    // Negative carve-out: api(?!/admin) — gates /api/admin/* but not /api/*.
    expect(src).toMatch(/api\(\?!\/admin\)/);
  });

  it('emits WWW-Authenticate header on challenge', () => {
    const src = readFileSync(
      join(process.cwd(), 'middleware.ts'),
      'utf8',
    );
    expect(src).toContain('WWW-Authenticate');
    expect(src).toContain('Basic realm');
  });
});

describe('middleware.ts — runtime basic-auth behavior', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('dev mode: /admin requests fall through to next-intl', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const intlSpy = vi.fn(() => undefined);
    vi.doMock('next-intl/middleware', () => ({ default: () => intlSpy }));

    const mw = await import('../../middleware');
    const req = {
      nextUrl: { pathname: '/admin/audit' },
      url: 'https://visitisrael.site/admin/audit',
      headers: { get: () => null },
    };
    const out = mw.default(req as never);
    // In dev mode, the gate bypasses → next-intl spy is called → undefined returned.
    // In production with valid auth, same behavior.
    expect(out).toBeUndefined();
    expect(intlSpy).toHaveBeenCalledTimes(1);
  });

  it('production + missing auth → 401 with WWW-Authenticate', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('ADMIN_USER', 'admin');
    vi.stubEnv('ADMIN_PASS', 'secret');
    const intlSpy = vi.fn(() => undefined);
    vi.doMock('next-intl/middleware', () => ({ default: () => intlSpy }));

    const mw = await import('../../middleware');
    const req = {
      nextUrl: { pathname: '/admin/audit' },
      url: 'https://visitisrael.site/admin/audit',
      headers: { get: () => null },
    };
    const out = mw.default(req as never);
    expect(out).toBeDefined();
    // NextResponse — status 401, contains WWW-Authenticate header.
    expect(out!.status).toBe(401);
    expect(out!.headers.get('WWW-Authenticate')).toMatch(/Basic/);
    expect(intlSpy).not.toHaveBeenCalled();
  });

  it('production + valid creds → fall-through to next-intl', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('ADMIN_USER', 'admin');
    vi.stubEnv('ADMIN_PASS', 'hunter2');
    const intlSpy = vi.fn(() => undefined);
    vi.doMock('next-intl/middleware', () => ({ default: () => intlSpy }));

    const mw = await import('../../middleware');
    const expected =
      'Basic ' + Buffer.from('admin:hunter2').toString('base64');
    const req = {
      nextUrl: { pathname: '/admin/audit' },
      url: 'https://visitisrael.site/admin/audit',
      headers: {
        get: (name: string) =>
          name.toLowerCase() === 'authorization' ? expected : null,
      },
    };
    const out = mw.default(req as never);
    expect(out).toBeUndefined();
    expect(intlSpy).toHaveBeenCalledTimes(1);
  });

  it('production + non-admin path → bypass auth, fall-through to next-intl', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const intlSpy = vi.fn(() => undefined);
    vi.doMock('next-intl/middleware', () => ({ default: () => intlSpy }));

    const mw = await import('../../middleware');
    const req = {
      nextUrl: { pathname: '/jerusalem' },
      url: 'https://visitisrael.site/jerusalem',
      headers: { get: () => null },
    };
    mw.default(req as never);
    expect(intlSpy).toHaveBeenCalledTimes(1);
  });
});
