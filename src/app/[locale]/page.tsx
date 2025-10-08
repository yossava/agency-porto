import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import CTASection from '@/components/home/CTASection';
import { getFeaturedProjects } from '@/lib/content';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  // Fetch featured projects server-side
  const featuredProjects = await getFeaturedProjects(4);

  return (
    <>
      <Hero locale={locale} />
      <ServicesSection locale={locale} />
      <FeaturedWork locale={locale} projects={featuredProjects} />
      <CTASection locale={locale} />
    </>
  );
}
