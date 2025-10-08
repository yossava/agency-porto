'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/content';

interface Project {
  id: string;
  title: { en: string; id: string };
  category: { en: string; id: string };
  description: { en: string; id: string };
  tags: string[];
  gradient: string;
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
}

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
  locale: 'en' | 'id';
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
  locale,
}: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {locale === 'en' ? 'Back to Work' : 'Kembali ke Karya'}
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="mb-6">
            <span className="px-4 py-2 rounded-full glass text-sm font-medium text-blue-400 border border-blue-400/20">
              {project.category[locale]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {project.title[locale]}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(project.date, locale)}
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8">{project.description[locale]}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                {locale === 'en' ? 'View Demo' : 'Lihat Demo'}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass rounded-full font-semibold text-white border border-white/20 hover:border-white/40 transition-all inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                {locale === 'en' ? 'View Source' : 'Lihat Kode'}
              </a>
            )}
          </div>

          {/* Featured Image Placeholder */}
          <div
            className={`mt-8 h-96 rounded-3xl bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/20 text-9xl font-bold">
                {project.title[locale].charAt(0)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'en' ? 'Project Overview' : 'Ringkasan Proyek'}
            </h2>

            <div className="text-gray-300 leading-relaxed space-y-6">
              <p>{project.description[locale]}</p>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {locale === 'en' ? 'Key Features' : 'Fitur Utama'}
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    {locale === 'en'
                      ? 'Modern, responsive user interface'
                      : 'Antarmuka pengguna modern dan responsif'}
                  </li>
                  <li>
                    {locale === 'en'
                      ? 'Optimized for performance and accessibility'
                      : 'Dioptimalkan untuk performa dan aksesibilitas'}
                  </li>
                  <li>
                    {locale === 'en'
                      ? 'Built with industry-standard technologies'
                      : 'Dibangun dengan teknologi standar industri'}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {locale === 'en' ? 'Technologies Used' : 'Teknologi yang Digunakan'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {locale === 'en' ? 'Challenges & Solutions' : 'Tantangan & Solusi'}
                </h3>
                <p>
                  {locale === 'en'
                    ? 'This project presented unique challenges that required innovative solutions. We approached each challenge with a focus on user experience, performance, and maintainability.'
                    : 'Proyek ini menghadirkan tantangan unik yang memerlukan solusi inovatif. Kami mendekati setiap tantangan dengan fokus pada pengalaman pengguna, performa, dan kemudahan pemeliharaan.'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {locale === 'en' ? 'Results & Impact' : 'Hasil & Dampak'}
                </h3>
                <p>
                  {locale === 'en'
                    ? 'The project successfully met all requirements and delivered exceptional value to stakeholders. The solution continues to serve users effectively and efficiently.'
                    : 'Proyek ini berhasil memenuhi semua persyaratan dan memberikan nilai luar biasa kepada stakeholder. Solusi ini terus melayani pengguna secara efektif dan efisien.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 glass rounded-full text-sm text-gray-300 border border-white/10 hover:border-white/30 transition-all"
              >
                <Tag className="w-4 h-4 inline mr-2" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'en' ? 'Related Projects' : 'Proyek Terkait'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/${locale}/work/${relatedProject.id}`}
                  className="group glass rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
                >
                  <div
                    className={`h-32 rounded-xl bg-gradient-to-br ${relatedProject.gradient} mb-4 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/40 text-5xl font-bold">
                        {relatedProject.title[locale].charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400 mb-2">
                    {relatedProject.category[locale]}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                    {relatedProject.title[locale]}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {relatedProject.description[locale]}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 glass rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'en' ? 'Have a Project in Mind?' : 'Punya Proyek dalam Pikiran?'}
          </h2>
          <p className="text-gray-400 mb-6">
            {locale === 'en'
              ? 'Let us help you bring your vision to life with our expertise.'
              : 'Biarkan kami membantu mewujudkan visi Anda dengan keahlian kami.'}
          </p>
          <Link href={`/${locale}/contact`}>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
              {locale === 'en' ? 'Get in Touch' : 'Hubungi Kami'}
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
