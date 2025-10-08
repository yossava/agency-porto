import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('hero');
  const tCommon = useTranslations('common');

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-dark-900">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-dark-600 mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{t('cta')}</Button>
            </Link>
            <Link href={`/${locale}/work`}>
              <Button variant="outline" size="lg">
                {t('viewWork')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Services Preview Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'en' ? 'Our Services' : 'Layanan Kami'}
          </h2>
          <p className="text-xl text-dark-600">
            {locale === 'en'
              ? 'Comprehensive solutions for your digital needs'
              : 'Solusi komprehensif untuk kebutuhan digital Anda'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 border border-dark-200 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Service {i}</h3>
              <p className="text-dark-600">
                {locale === 'en'
                  ? 'Description of this service'
                  : 'Deskripsi layanan ini'}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
