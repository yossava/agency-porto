import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use locale prefix (e.g., /en/about instead of /about)
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  // Exclude static files and Next.js internals
  matcher: ['/((?!_next|.*\\..*).*)']
};
