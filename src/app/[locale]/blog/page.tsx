import { getAllBlogPosts } from '@/lib/content';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { generatePageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

interface BlogPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: BlogPageProps): Promise<Metadata> {
  return generatePageMetadata('blog', locale as 'id' | 'en');
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const posts = await getAllBlogPosts();

  return <BlogPageClient locale={locale} posts={posts} />;
}
