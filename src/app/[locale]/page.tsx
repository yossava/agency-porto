import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <ServicesSection locale={locale} />
    </>
  );
}
