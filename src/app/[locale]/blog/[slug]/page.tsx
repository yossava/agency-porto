import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { generateBlogMetadata, generateBlogSchema } from '@/lib/seo';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({
  params: { locale, slug },
}: BlogPostPageProps): Promise<Metadata> {
  const currentLocale = locale as 'en' | 'id';
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogMetadata(post, currentLocale);
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

  // Generate JSON-LD structured data
  const blogSchema = generateBlogSchema(post, currentLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} locale={currentLocale} />
    </>
  );
}
