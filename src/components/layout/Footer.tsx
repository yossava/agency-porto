'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('services'), href: `/${locale}/services` },
    { label: t('work'), href: `/${locale}/work` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="text-3xl font-bold gradient-text inline-block mb-4">
              AGENCY
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              {locale === 'en'
                ? 'We craft exceptional digital experiences that push the boundaries of design and technology.'
                : 'Kami menciptakan pengalaman digital luar biasa yang melampaui batas desain dan teknologi.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-white/30`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">
              {locale === 'en' ? 'Quick Links' : 'Tautan Cepat'}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-white">
              {locale === 'en' ? 'Get in Touch' : 'Hubungi Kami'}
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@agency.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 glass rounded-lg flex items-center justify-center group-hover:border-white/30 transition-all">
                  <Mail size={16} />
                </div>
                <span>hello@agency.com</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">
                {locale === 'en'
                  ? 'Available for freelance projects and full-time opportunities.'
                  : 'Tersedia untuk proyek freelance dan peluang full-time.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} AGENCY.{' '}
            {locale === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi.'}
          </p>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="glass w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </footer>
  );
}
