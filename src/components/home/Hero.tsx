'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/MagneticButton';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />,
});

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8 inline-block">
          <div className="glass px-6 py-2 rounded-full text-sm font-medium text-blue-300 border border-blue-400/30">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            {locale === 'en' ? 'Available for new projects' : 'Tersedia untuk proyek baru'}
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block mb-2">
            {locale === 'en' ? 'Crafting Digital' : 'Menciptakan'}
          </span>
          <span className="block gradient-text">
            {locale === 'en' ? 'Experiences' : 'Pengalaman Digital'}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {locale === 'en'
            ? 'We design and develop innovative web experiences that push the boundaries of what is possible. Every pixel, every interaction, meticulously crafted.'
            : 'Kami merancang dan mengembangkan pengalaman web inovatif yang melampaui batas kemungkinan. Setiap pixel, setiap interaksi, dibuat dengan cermat.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton>
            <Link href={`/${locale}/contact`}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50">
                <span className="relative z-10 flex items-center gap-2">
                  {locale === 'en' ? 'Let Us Talk' : 'Mari Bicara'}
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link href={`/${locale}/work`}>
              <button className="group px-8 py-4 glass rounded-full font-semibold text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
                <span className="flex items-center gap-2">
                  {locale === 'en' ? 'View Work' : 'Lihat Karya'}
                  <svg
                    className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-sm font-medium">
              {locale === 'en' ? 'Scroll to explore' : 'Gulir untuk menjelajah'}
            </span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </section>
  );
}
