import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { SOCIAL_LINKS, SITE_NAME } from '@/lib/constants';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');

  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('services'), href: `/${locale}/services` },
    { label: t('work'), href: `/${locale}/work` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('blog'), href: `/${locale}/blog` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">{SITE_NAME}</h3>
            <p className="text-dark-300 mb-4">
              {locale === 'en'
                ? 'Building digital experiences that matter'
                : 'Membangun pengalaman digital yang bermakna'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-dark-300 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{tFooter('followUs')}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700 pt-8 text-center text-dark-400 text-sm">
          <p>© {currentYear} {SITE_NAME}. {tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
