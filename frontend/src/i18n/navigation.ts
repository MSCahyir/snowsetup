import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export { locales, defaultLocale } from './config';
export type { Locale } from './config';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
});
