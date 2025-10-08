import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Only show /en in URL, hide /id (since ID is default)
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  // Exclude static files and Next.js internals
  matcher: ['/((?!_next|.*\\..*).*)']
};
