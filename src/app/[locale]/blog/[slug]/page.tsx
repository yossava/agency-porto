import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  const locales = ['en', 'id'];

  return locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export default function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const post = getBlogPostBySlug(slug);
  const currentLocale = locale as 'en' | 'id';

  if (!post) {
    notFound();
  }

  // Get related posts (same category)
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category[currentLocale] === post.category[currentLocale])
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale={currentLocale} />;
}
