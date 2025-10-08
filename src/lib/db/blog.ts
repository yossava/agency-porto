import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface BlogPost {
  _id?: ObjectId;
  slug: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  content: { id: string; en: string };
  category: { id: string; en: string };
  tags: string[];
  gradient: string;
  thumbnail?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: { id: string; en: string };
  };
  readTime: number;
  published: boolean;
  featured: boolean;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  seo?: {
    metaTitle?: { id: string; en: string };
    metaDescription?: { id: string; en: string };
    ogImage?: string;
  };
}

/**
 * Get all published blog posts
 * @returns Array of blog posts sorted by date
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({ published: true })
    .sort({ date: -1 })
    .toArray();

  return posts;
}

/**
 * Get a single blog post by slug
 * @param slug - Post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDatabase();
  const post = await db
    .collection<BlogPost>('blog_posts')
    .findOne({ slug, published: true });

  // Increment view count
  if (post) {
    await db
      .collection<BlogPost>('blog_posts')
      .updateOne({ slug }, { $inc: { views: 1 } });
  }

  return post;
}

/**
 * Get featured blog posts
 * @param limit - Maximum number of posts to return
 * @returns Array of featured blog posts
 */
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({ published: true, featured: true })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return posts;
}

/**
 * Get blog posts by category
 * @param category - Category name
 * @param locale - Language locale (id or en)
 * @returns Array of blog posts in the category
 */
export async function getBlogPostsByCategory(
  category: string,
  locale: 'id' | 'en' = 'id'
): Promise<BlogPost[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({
      published: true,
      [`category.${locale}`]: category,
    })
    .sort({ date: -1 })
    .toArray();

  return posts;
}

/**
 * Get related blog posts (same category, excluding current post)
 * @param slug - Current post slug to exclude
 * @param category - Category to match
 * @param locale - Language locale
 * @param limit - Maximum number of posts to return
 * @returns Array of related posts
 */
export async function getRelatedBlogPosts(
  slug: string,
  category: string,
  locale: 'id' | 'en' = 'id',
  limit: number = 3
): Promise<BlogPost[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({
      published: true,
      slug: { $ne: slug },
      [`category.${locale}`]: category,
    })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return posts;
}

/**
 * Get recent blog posts
 * @param limit - Maximum number of posts to return
 * @returns Array of recent blog posts
 */
export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({ published: true })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return posts;
}
