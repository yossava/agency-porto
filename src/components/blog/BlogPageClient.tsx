'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/db/blog';

// Helper function to format date (duplicated to avoid importing server code)
function formatDate(dateString: string, locale: 'en' | 'id' = 'en'): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', options);
}

interface BlogPageClientProps {
  locale: string;
  posts: BlogPost[];
}

export default function BlogPageClient({ locale, posts }: BlogPageClientProps) {
  const currentLocale = locale as 'en' | 'id';

  const categories = [
    locale === 'en' ? 'All Posts' : 'Semua Posting',
    locale === 'en' ? 'Development' : 'Pengembangan',
    locale === 'en' ? 'Design' : 'Desain',
    locale === 'en' ? 'Performance' : 'Performa',
    'React',
    'TypeScript',
    'CSS',
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
            {locale === 'en' ? 'Our' : 'Blog'}
            <span className="block gradient-text">{locale === 'en' ? 'Blog' : 'Kami'}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'en'
              ? 'Insights, tutorials, and thoughts on web development, design, and technology.'
              : 'Wawasan, tutorial, dan pemikiran tentang pengembangan web, desain, dan teknologi.'}
          </p>
        </motion.div>

        {/* Categories Filter */}
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500"
            >
              {/* Post Image */}
              <div
                className={`relative h-56 bg-gradient-to-br ${post.gradient} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/20 text-8xl font-bold">
                    {post.title[currentLocale].charAt(0)}
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full glass text-xs font-medium text-white border border-white/20">
                    {post.category[currentLocale]}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date, currentLocale)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} {locale === 'en' ? 'min read' : 'menit baca'}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                  {post.title[currentLocale]}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3">
                  {post.excerpt[currentLocale]}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-400 hover:gap-3 transition-all duration-300 text-sm font-medium"
                >
                  {locale === 'en' ? 'Read More' : 'Baca Selengkapnya'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 glass rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en' ? 'Stay Updated' : 'Tetap Update'}
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Subscribe to our newsletter to get the latest articles and insights delivered to your inbox.'
              : 'Berlangganan newsletter kami untuk mendapatkan artikel dan wawasan terbaru langsung ke inbox Anda.'}
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder={
                locale === 'en' ? 'Enter your email' : 'Masukkan email Anda'
              }
              className="flex-1 px-6 py-4 glass rounded-full border border-white/10 focus:border-blue-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 whitespace-nowrap"
            >
              {locale === 'en' ? 'Subscribe' : 'Berlangganan'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
