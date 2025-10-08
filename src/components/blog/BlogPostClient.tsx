'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/content';

interface BlogPost {
  slug: string;
  title: { en: string; id: string };
  excerpt: { en: string; id: string };
  content: { en: string; id: string };
  date: string;
  readTime: number;
  category: { en: string; id: string };
  tags: string[];
  gradient: string;
  author: string;
  published: boolean;
}

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: 'en' | 'id';
}

export default function BlogPostClient({ post, relatedPosts, locale }: BlogPostClientProps) {
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
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {locale === 'en' ? 'Back to Blog' : 'Kembali ke Blog'}
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
              {post.category[locale]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {post.title[locale]}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(post.date, locale)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime} {locale === 'en' ? 'min read' : 'menit baca'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">by</span>
              <span className="text-white font-medium">{post.author}</span>
            </div>
          </div>

          {/* Featured Image Placeholder */}
          <div
            className={`mt-8 h-96 rounded-3xl bg-gradient-to-br ${post.gradient} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/20 text-9xl font-bold">
                {post.title[locale].charAt(0)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-16"
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            {/* This is where the full article content would go */}
            <div className="text-gray-300 leading-relaxed space-y-6">
              <p className="text-xl text-gray-400 mb-8">{post.excerpt[locale]}</p>

              <div className="whitespace-pre-wrap">{post.content[locale]}</div>

              {/* Placeholder content for demo */}
              {post.content[locale].length < 100 && (
                <>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris.
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                    {locale === 'en' ? 'Key Takeaways' : 'Poin Penting'}
                  </h2>

                  <ul className="space-y-2">
                    <li>Important point about the topic</li>
                    <li>Another crucial insight to remember</li>
                    <li>Actionable advice for implementation</li>
                  </ul>

                  <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                    {locale === 'en' ? 'Conclusion' : 'Kesimpulan'}
                  </h2>

                  <p>
                    In conclusion, this topic represents an important aspect of modern web
                    development. By implementing these practices, you can significantly improve
                    your development workflow.
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.article>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag, index) => (
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

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'en' ? 'Related Articles' : 'Artikel Terkait'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group glass rounded-2xl p-6 hover:border-white/30 transition-all duration-300"
                >
                  <div className="text-sm text-blue-400 mb-2">
                    {relatedPost.category[locale]}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                    {relatedPost.title[locale]}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {relatedPost.excerpt[locale]}
                  </p>
                  <div className="text-xs text-gray-500">
                    {formatDate(relatedPost.date, locale)} •{' '}
                    {relatedPost.readTime} {locale === 'en' ? 'min' : 'menit'}
                  </div>
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
            {locale === 'en' ? 'Want to Work Together?' : 'Ingin Bekerja Sama?'}
          </h2>
          <p className="text-gray-400 mb-6">
            {locale === 'en'
              ? 'We are always open to discussing new projects and opportunities.'
              : 'Kami selalu terbuka untuk mendiskusikan proyek dan peluang baru.'}
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
