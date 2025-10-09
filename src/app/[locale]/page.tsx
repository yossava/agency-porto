import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import MetricsSection from '@/components/home/MetricsSection';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import CTASection from '@/components/home/CTASection';
import HomePageClient from '@/components/home/HomePageClient';
import { getFeaturedProjects } from '@/lib/content';
import { generatePageMetadata, generateOrganizationSchema } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata('home', locale as 'id' | 'en');
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  // Fetch featured projects server-side
  const featuredProjects = await getFeaturedProjects(4);

  // Generate organization schema
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <HomePageClient>
        <Hero locale={locale} />
        <MetricsSection locale={locale} />
        <ServicesSection locale={locale} />
        <FeaturedWork locale={locale} projects={featuredProjects} />
        <CTASection locale={locale} />
      </HomePageClient>
    </>
  );
}
