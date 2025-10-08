'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '../MagneticButton';

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            {/* Icon */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">
                {locale === 'en' ? 'Ready to Start?' : 'Siap Memulai?'}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {locale === 'en' ? 'Let Us Build Something' : 'Mari Bangun Sesuatu'}
              <span className="block gradient-text mt-2">
                {locale === 'en' ? 'Amazing Together' : 'Luar Biasa Bersama'}
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {locale === 'en'
                ? 'Have a project in mind? We would love to help bring your vision to life with cutting-edge technology and exceptional design.'
                : 'Punya proyek dalam pikiran? Kami ingin membantu mewujudkan visi Anda dengan teknologi terkini dan desain luar biasa.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton>
                <Link href={`/${locale}/contact`}>
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2">
                    {locale === 'en' ? 'Start Your Project' : 'Mulai Proyek Anda'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link href={`/${locale}/work`}>
                  <button className="px-8 py-4 glass border border-white/20 rounded-full font-semibold text-white hover:border-white/40 transition-all duration-300">
                    {locale === 'en' ? 'View Our Work' : 'Lihat Karya Kami'}
                  </button>
                </Link>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-400">
                  {locale === 'en' ? 'Projects' : 'Proyek'}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  30+
                </div>
                <div className="text-sm text-gray-400">
                  {locale === 'en' ? 'Clients' : 'Klien'}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  95+
                </div>
                <div className="text-sm text-gray-400">
                  {locale === 'en' ? 'Quality Score' : 'Skor Kualitas'}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
