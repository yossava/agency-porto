'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { getAllProjects } from '@/lib/content';

interface WorkPageProps {
  params: { locale: string };
}

export default function WorkPage({ params: { locale } }: WorkPageProps) {
  const projects = getAllProjects();
  const currentLocale = locale as 'en' | 'id';

  const categories = [
    locale === 'en' ? 'All Projects' : 'Semua Proyek',
    locale === 'en' ? 'Web Development' : 'Pengembangan Web',
    locale === 'en' ? 'Mobile Development' : 'Pengembangan Mobile',
    locale === 'en' ? 'AI & Machine Learning' : 'AI & Machine Learning',
    locale === 'en' ? 'Data & Analytics' : 'Data & Analitik',
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            {locale === 'en' ? 'Our' : 'Karya'}
            <span className="block gradient-text">
              {locale === 'en' ? 'Work' : 'Kami'}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'en'
              ? 'A showcase of our recent projects and success stories. Each one represents our commitment to excellence and innovation.'
              : 'Showcase proyek terbaru dan kisah sukses kami. Setiap proyek merepresentasikan komitmen kami terhadap keunggulan dan inovasi.'}
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full glass transition-all duration-300 ${
                index === 0
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'hover:border-white/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/work/${project.id}`}
                className="block group glass rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500"
              >
                {/* Project Image Placeholder */}
                <div
                  className={`relative h-64 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/20 text-8xl font-bold">
                      {project.title[currentLocale].charAt(0)}
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && (
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {project.demo && (
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <div className="text-sm text-blue-400 mb-2">
                    {project.category[currentLocale]}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {project.title[currentLocale]}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                    {project.description[currentLocale]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 text-center glass rounded-3xl p-12"
        >
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en'
              ? 'Like What You See?'
              : 'Suka dengan yang Anda Lihat?'}
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Let us create something amazing together. Get in touch to start your project.'
              : 'Mari ciptakan sesuatu yang luar biasa bersama. Hubungi kami untuk memulai proyek Anda.'}
          </p>
          <Link href={`/${locale}/contact`}>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
              {locale === 'en' ? 'Start Your Project' : 'Mulai Proyek Anda'}
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
