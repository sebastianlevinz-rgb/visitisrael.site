import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';
import { evaluateBasicAuth, isAdminPath } from './lib/auth/basic';

/**
 * 301 redirect map.
 *
 * Phase 1 baseline: empty. Phases 2+ populate as slugs change (e.g. when
 * Phase 2.1 renames a placeholder URL or Phase 3 moves a region under a
 * different parent). Old URLs MUST 301 to the new canonical so link equity
 * + bookmarks survive.
 *
 * Per RESEARCH §1.8 / FND-06.
 */
const REDIRECTS: Record<string, string> = {
  // Phase 2+ adds entries here, e.g.:
  // '/old-jerusalem-page': '/jerusalem',
};

const intl = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
});

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1) 301 redirects (highest priority — runs before locale negotiation).
  if (REDIRECTS[path]) {
    return NextResponse.redirect(new URL(REDIRECTS[path], req.url), 301);
  }

  // 2) Basic-auth gate for /admin/* (plan 10 / FND-04). Bypassed in dev so
  //    pnpm dev never prompts; in production, missing env vars = closed.
  if (isAdminPath(path)) {
    const outcome = evaluateBasicAuth(req.headers.get('authorization'), {
      user: process.env.ADMIN_USER,
      pass: process.env.ADMIN_PASS,
      nodeEnv: process.env.NODE_ENV,
    });
    if (outcome === 'challenge') {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"',
        },
      });
    }
    // 'allow' or 'bypass-dev' → fall through to i18n.
  }

  // 3) i18n locale routing.
  return intl(req);
}

export const config = {
  // Match everything except _next, favicon, images, files with extensions.
  // /api/admin/* IS matched (the negative `api(?!/admin)` carve-out lets the
  // admin API routes go through middleware while regular /api/* bypasses it).
  matcher: ['/((?!_next|api(?!/admin)|favicon.ico|images|.*\\..*).*)'],
};
