/**
 * Vitest contract for lib/auth/basic.ts — basic-auth helper.
 *
 * Covers:
 *   - Dev bypass (NODE_ENV !== 'production')
 *   - Production with valid Basic credentials → 'allow'
 *   - Production with invalid creds → 'challenge'
 *   - Production with missing env vars → 'challenge' (closed-by-default)
 *   - isAdminPath matching /admin, /he/admin, /api/admin
 */
import { describe, it, expect } from 'vitest';
import { evaluateBasicAuth, isAdminPath } from '../basic';

function basicHeader(user: string, pass: string): string {
  return 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
}

describe('evaluateBasicAuth', () => {
  it('bypasses auth in development', () => {
    expect(
      evaluateBasicAuth(null, {
        user: 'admin',
        pass: 'secret',
        nodeEnv: 'development',
      }),
    ).toBe('bypass-dev');
  });

  it('bypasses auth in test', () => {
    expect(
      evaluateBasicAuth(null, { user: 'a', pass: 'b', nodeEnv: 'test' }),
    ).toBe('bypass-dev');
  });

  it('allows production request with valid credentials', () => {
    expect(
      evaluateBasicAuth(basicHeader('admin', 'hunter2'), {
        user: 'admin',
        pass: 'hunter2',
        nodeEnv: 'production',
      }),
    ).toBe('allow');
  });

  it('challenges production request with wrong password', () => {
    expect(
      evaluateBasicAuth(basicHeader('admin', 'wrong'), {
        user: 'admin',
        pass: 'hunter2',
        nodeEnv: 'production',
      }),
    ).toBe('challenge');
  });

  it('challenges production request missing Authorization header', () => {
    expect(
      evaluateBasicAuth(null, {
        user: 'admin',
        pass: 'hunter2',
        nodeEnv: 'production',
      }),
    ).toBe('challenge');
  });

  it('challenges production request with non-Basic header', () => {
    expect(
      evaluateBasicAuth('Bearer abc.def.ghi', {
        user: 'admin',
        pass: 'hunter2',
        nodeEnv: 'production',
      }),
    ).toBe('challenge');
  });

  it('challenges when ADMIN_USER env missing in production (closed-by-default)', () => {
    expect(
      evaluateBasicAuth(basicHeader('admin', 'hunter2'), {
        user: undefined,
        pass: 'hunter2',
        nodeEnv: 'production',
      }),
    ).toBe('challenge');
  });

  it('challenges when ADMIN_PASS env missing in production', () => {
    expect(
      evaluateBasicAuth(basicHeader('admin', 'hunter2'), {
        user: 'admin',
        pass: undefined,
        nodeEnv: 'production',
      }),
    ).toBe('challenge');
  });
});

describe('isAdminPath', () => {
  it('matches /admin', () => {
    expect(isAdminPath('/admin')).toBe(true);
    expect(isAdminPath('/admin/audit')).toBe(true);
    expect(isAdminPath('/admin/components')).toBe(true);
  });

  it('matches locale-prefixed admin', () => {
    expect(isAdminPath('/he/admin')).toBe(true);
    expect(isAdminPath('/en/admin/audit')).toBe(true);
  });

  it('matches /api/admin/*', () => {
    expect(isAdminPath('/api/admin/audit')).toBe(true);
  });

  it('does NOT match content paths', () => {
    expect(isAdminPath('/')).toBe(false);
    expect(isAdminPath('/jerusalem')).toBe(false);
    expect(isAdminPath('/en/jerusalem')).toBe(false);
    expect(isAdminPath('/api/whatever')).toBe(false);
  });
});
