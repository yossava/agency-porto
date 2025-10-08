'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Zap, Search, Wrench, Users, TrendingUp } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import Link from 'next/link';

interface ServicesPageProps {
  params: { locale: string };
}

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  const services = [
    {
      icon: Code,
      title: locale === 'en' ? 'Web Development' : 'Pengembangan Web',
      description:
        locale === 'en'
          ? 'From simple landing pages to complex enterprise applications, we build websites that work'
          : 'Dari landing page sederhana hingga aplikasi enterprise kompleks, kami membangun website yang berfungsi',
      features: [
        locale === 'en' ? 'Simple to Complex Projects' : 'Proyek Sederhana hingga Kompleks',
        locale === 'en' ? 'Custom Web Applications' : 'Aplikasi Web Kustom',
        locale === 'en' ? 'E-commerce Solutions' : 'Solusi E-commerce',
        locale === 'en' ? 'CMS Development' : 'Pengembangan CMS',
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: locale === 'en' ? 'Mobile App Development' : 'Pengembangan Aplikasi Mobile',
      description:
        locale === 'en'
          ? 'Native and cross-platform apps for Android, iOS, and smart watches'
          : 'Aplikasi native dan cross-platform untuk Android, iOS, dan smart watch',
      features: [
        locale === 'en' ? 'Android Development' : 'Pengembangan Android',
        locale === 'en' ? 'iOS Development' : 'Pengembangan iOS',
        locale === 'en' ? 'Smart Watch Apps' : 'Aplikasi Smart Watch',
        locale === 'en' ? 'Cross-Platform Solutions' : 'Solusi Cross-Platform',
      ],
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Palette,
      title: locale === 'en' ? 'UI Design' : 'Desain UI',
      description:
        locale === 'en'
          ? 'Beautiful, intuitive interfaces that users love to interact with'
          : 'Antarmuka yang indah dan intuitif yang disukai pengguna',
      features: [
        locale === 'en' ? 'User Interface Design' : 'Desain Antarmuka Pengguna',
        locale === 'en' ? 'Responsive Design' : 'Desain Responsif',
        locale === 'en' ? 'Design Systems' : 'Sistem Desain',
        locale === 'en' ? 'Prototyping' : 'Prototyping',
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: locale === 'en' ? 'Performance Optimization' : 'Optimasi Performa',
      description:
        locale === 'en'
          ? 'Lightning-fast websites that score 95+ on performance metrics'
          : 'Website super cepat dengan skor 95+ pada metrik performa',
      features: [
        locale === 'en' ? 'Speed Optimization' : 'Optimasi Kecepatan',
        locale === 'en' ? 'Core Web Vitals' : 'Core Web Vitals',
        locale === 'en' ? 'Image & Asset Optimization' : 'Optimasi Gambar & Aset',
        locale === 'en' ? 'Performance Audits' : 'Audit Performa',
      ],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Search,
      title: locale === 'en' ? 'SEO' : 'SEO',
      description:
        locale === 'en'
          ? 'Boost your visibility and rank higher in search engine results'
          : 'Tingkatkan visibilitas dan peringkat Anda di hasil mesin pencari',
      features: [
        locale === 'en' ? 'Technical SEO' : 'SEO Teknis',
        locale === 'en' ? 'On-Page Optimization' : 'Optimasi On-Page',
        locale === 'en' ? 'SEO Audits' : 'Audit SEO',
        locale === 'en' ? 'Search Console Setup' : 'Pengaturan Search Console',
      ],
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Wrench,
      title: locale === 'en' ? 'Maintenance' : 'Pemeliharaan',
      description:
        locale === 'en'
          ? 'Keep your website running smoothly with ongoing support and updates'
          : 'Jaga website Anda berjalan lancar dengan dukungan dan update berkelanjutan',
      features: [
        locale === 'en' ? 'Regular Updates' : 'Update Berkala',
        locale === 'en' ? 'Bug Fixes' : 'Perbaikan Bug',
        locale === 'en' ? 'Security Patches' : 'Patch Keamanan',
        locale === 'en' ? 'Technical Support' : 'Dukungan Teknis',
      ],
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Users,
      title: locale === 'en' ? 'Consulting & Strategy' : 'Konsultasi & Strategi',
      description:
        locale === 'en'
          ? 'Expert guidance on technology choices and digital strategy'
          : 'Panduan ahli tentang pilihan teknologi dan strategi digital',
      features: [
        locale === 'en' ? 'Technology Consulting' : 'Konsultasi Teknologi',
        locale === 'en' ? 'Digital Strategy' : 'Strategi Digital',
        locale === 'en' ? 'Architecture Planning' : 'Perencanaan Arsitektur',
        locale === 'en' ? 'Best Practices' : 'Praktik Terbaik',
      ],
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            {locale === 'en' ? 'Our' : 'Layanan'}
            <span className="block gradient-text">
              {locale === 'en' ? 'Services' : 'Kami'}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'en'
              ? 'We offer comprehensive digital solutions to help your business thrive in the modern web.'
              : 'Kami menawarkan solusi digital komprehensif untuk membantu bisnis Anda berkembang.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass rounded-3xl p-8 hover:border-white/30 transition-all duration-500"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass rounded-3xl p-12"
        >
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en' ? 'Ready to Start Your Project?' : 'Siap Memulai Proyek Anda?'}
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? "Let's discuss how we can help bring your vision to life."
              : 'Mari diskusikan bagaimana kami dapat membantu mewujudkan visi Anda.'}
          </p>
          <MagneticButton>
            <Link href={`/${locale}/contact`}>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
                {locale === 'en' ? 'Get in Touch' : 'Hubungi Kami'}
              </button>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
