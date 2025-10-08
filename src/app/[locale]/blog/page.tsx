import { getAllBlogPosts } from '@/lib/content';
import BlogPageClient from '@/components/blog/BlogPageClient';

interface BlogPageProps {
  params: { locale: string };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const posts = await getAllBlogPosts();

  return <BlogPageClient locale={locale} posts={posts} />;
}
