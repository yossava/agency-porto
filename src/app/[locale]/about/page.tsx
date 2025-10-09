import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import AboutPageClient from '@/components/pages/AboutPageClient';

interface AboutPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: AboutPageProps): Promise<Metadata> {
  return generatePageMetadata('about', locale as 'id' | 'en');
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  return <AboutPageClient locale={locale} />;
}
