import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

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

  // 2) (Basic-auth for /admin/* added in plan 10.)

  // 3) i18n locale routing.
  return intl(req);
}

export const config = {
  // Match everything except _next, api, favicon.ico, images, and files with extensions
  // Basic-auth for /admin/* is added in plan 10.
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\..*).*)'],
};
