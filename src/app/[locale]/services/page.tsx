import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import ServicesPageClient from '@/components/pages/ServicesPageClient';

interface ServicesPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: ServicesPageProps): Promise<Metadata> {
  return generatePageMetadata('services', locale as 'id' | 'en');
}

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  return <ServicesPageClient locale={locale} />;
}
