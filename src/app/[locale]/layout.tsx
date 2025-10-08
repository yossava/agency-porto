import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/../i18n/request';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGrid from '@/components/InteractiveGrid';
import ScrollProgress from '@/components/ScrollProgress';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Agency - Premium Web & App Development',
    template: '%s | Agency',
  },
  description:
    'Transform your digital presence with cutting-edge web development, stunning UI/UX design, and innovative solutions. Expert team delivering excellence.',
  keywords: [
    'web development',
    'app development',
    'UI/UX design',
    'Next.js',
    'React',
    'TypeScript',
    'frontend development',
    'full stack development',
    'digital agency',
  ],
  authors: [{ name: 'Agency' }],
  creator: 'Agency',
  publisher: 'Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'Agency - Premium Web & App Development',
    description:
      'Transform your digital presence with cutting-edge web development and innovative solutions.',
    siteName: 'Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency - Premium Web & App Development',
    description:
      'Transform your digital presence with cutting-edge web development and innovative solutions.',
    creator: '@youragency',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          <InteractiveGrid />
          <Header />
          <main className="min-h-screen relative">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
