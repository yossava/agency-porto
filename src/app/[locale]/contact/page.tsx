import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import ContactPageClient from '@/components/pages/ContactPageClient';

interface ContactPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: ContactPageProps): Promise<Metadata> {
  return generatePageMetadata('contact', locale as 'id' | 'en');
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  return <ContactPageClient locale={locale} />;
}
