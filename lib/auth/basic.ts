/**
 * Basic-auth helper for `/admin/*` middleware gating.
 *
 * Vercel-Hobby-compatible alternative to Vercel Deployment Protection
 * (which is a Pro feature). Reads `ADMIN_USER` + `ADMIN_PASS` env vars and
 * compares the `Authorization` header against the expected `Basic ...` value.
 *
 * Bypass policy (per RESEARCH.md §1.9 + PROJECT.md):
 *   - `NODE_ENV !== 'production'` → bypass (local dev never prompts)
 *   - missing env vars in production → DENY (closed-by-default — prevents
 *     accidental public exposure if Vercel env not configured)
 *
 * Single-line export shape so middleware.ts can import + call without
 * round-tripping through helpers.
 */

export interface AuthEnv {
  user?: string | undefined;
  pass?: string | undefined;
  nodeEnv?: string | undefined;
}

export type AuthOutcome = 'allow' | 'bypass-dev' | 'challenge';

/**
 * Decide the response policy for a request based on its `Authorization`
 * header and the configured `ADMIN_USER` / `ADMIN_PASS` env vars.
 *
 * Returns:
 *   - 'bypass-dev' : NODE_ENV is not production — allow without auth (local DX)
 *   - 'allow'      : credentials match
 *   - 'challenge'  : missing or invalid credentials — middleware returns 401
 *
 * Caller (middleware) maps 'challenge' to a NextResponse with the
 * `WWW-Authenticate: Basic realm="Admin"` header.
 */
export function evaluateBasicAuth(
  authHeader: string | null,
  env: AuthEnv,
): AuthOutcome {
  if (env.nodeEnv !== 'production') return 'bypass-dev';
  if (!env.user || !env.pass) return 'challenge';
  if (!authHeader || !authHeader.startsWith('Basic ')) return 'challenge';
  const expected =
    'Basic ' +
    Buffer.from(`${env.user}:${env.pass}`, 'utf8').toString('base64');
  return authHeader === expected ? 'allow' : 'challenge';
}

/**
 * Convenience: returns true when path should be gated by basic-auth.
 * Matches /admin/*, /<locale>/admin/*, and /api/admin/*.
 */
export function isAdminPath(pathname: string): boolean {
  if (pathname.startsWith('/admin')) return true;
  if (pathname.startsWith('/api/admin')) return true;
  // locale-prefixed admin: /he/admin, /en/admin, etc.
  if (/^\/[a-z]{2}\/admin(?:\/|$)/.test(pathname)) return true;
  return false;
}
