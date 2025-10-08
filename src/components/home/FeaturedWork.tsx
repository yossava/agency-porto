'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/lib/db/projects';

interface FeaturedWorkProps {
  locale: string;
  projects: Project[];
}

export default function FeaturedWork({ locale, projects }: FeaturedWorkProps) {
  const featuredProjects = projects;
  const currentLocale = locale as 'en' | 'id';

  // Assign sizes to featured projects for bento grid layout
  const projectsWithSizes = featuredProjects.slice(0, 4).map((project, index) => ({
    ...project,
    size: index === 0 ? 'large' : index === 3 ? 'small' : 'medium',
  }));

  const projectsOld = [
    {
      id: 1,
      title: locale === 'en' ? 'E-commerce Platform' : 'Platform E-commerce',
      category: locale === 'en' ? 'Web Development' : 'Pengembangan Web',
      description:
        locale === 'en'
          ? 'A modern, high-performance e-commerce platform with real-time inventory'
          : 'Platform e-commerce modern dan performa tinggi dengan inventori real-time',
      gradient: 'from-blue-500 to-cyan-500',
      size: 'large',
    },
    {
      id: 2,
      title: locale === 'en' ? 'FinTech Dashboard' : 'Dashboard FinTech',
      category: locale === 'en' ? 'UI/UX Design' : 'Desain UI/UX',
      description:
        locale === 'en'
          ? 'Intuitive dashboard for managing investments and portfolios'
          : 'Dashboard intuitif untuk mengelola investasi dan portofolio',
      gradient: 'from-purple-500 to-pink-500',
      size: 'medium',
    },
    {
      id: 3,
      title: locale === 'en' ? 'AI SaaS Platform' : 'Platform SaaS AI',
      category: locale === 'en' ? 'Full Stack' : 'Full Stack',
      description:
        locale === 'en'
          ? 'AI-powered analytics platform with real-time data processing'
          : 'Platform analitik bertenaga AI dengan pemrosesan data real-time',
      gradient: 'from-orange-500 to-red-500',
      size: 'medium',
    },
    {
      id: 4,
      title: locale === 'en' ? 'Healthcare App' : 'Aplikasi Kesehatan',
      category: locale === 'en' ? 'Mobile Design' : 'Desain Mobile',
      description:
        locale === 'en'
          ? 'Patient management system with telemedicine features'
          : 'Sistem manajemen pasien dengan fitur telemedicine',
      gradient: 'from-green-500 to-emerald-500',
      size: 'small',
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {locale === 'en' ? 'Featured Work' : 'Karya Unggulan'}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Explore our latest projects that showcase innovation, design excellence, and technical mastery'
              : 'Jelajahi proyek terbaru kami yang menampilkan inovasi, keunggulan desain, dan penguasaan teknis'}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsWithSizes.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                ${project.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''}
                ${project.size === 'medium' ? 'lg:col-span-2' : ''}
                ${project.size === 'small' ? 'lg:col-span-2 lg:row-span-1' : ''}
              `}
            >
              <Link href={`/${locale}/work/${project.id}`}>
                <div className="group relative glass rounded-3xl overflow-hidden h-full min-h-[300px] transition-all duration-500 hover:border-white/30">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                      backgroundSize: '40px 40px',
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-blue-300 mb-4">
                        {project.category[currentLocale]}
                      </div>
                      <h3 className="text-3xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                        {project.title[currentLocale]}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {project.description[currentLocale]}
                      </p>
                    </div>

                    {/* View Project Arrow */}
                    <div className="flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all duration-300">
                      <span className="font-medium">
                        {locale === 'en' ? 'View Project' : 'Lihat Proyek'}
                      </span>
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} blur-3xl opacity-20`} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href={`/${locale}/work`}>
            <button className="group px-8 py-4 glass rounded-full font-semibold text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
              <span className="flex items-center gap-2">
                {locale === 'en' ? 'View All Projects' : 'Lihat Semua Proyek'}
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
