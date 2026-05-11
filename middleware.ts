import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
});

export const config = {
  // Match everything except _next, api, favicon.ico, images, and files with extensions
  // Basic-auth for /admin/* is added in plan 10.
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\..*).*)'],
};
