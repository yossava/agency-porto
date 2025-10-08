import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturedWork from '@/components/home/FeaturedWork';

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
      <FeaturedWork locale={locale} />
    </>
  );
}
