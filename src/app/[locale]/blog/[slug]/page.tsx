import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const currentLocale = locale as 'en' | 'id';
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category)
  const relatedPosts = await getRelatedBlogPosts(
    slug,
    post.category[currentLocale],
    currentLocale,
    3
  );

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale={currentLocale} />;
}
