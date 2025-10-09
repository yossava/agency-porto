import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export type PageSlug = 'home' | 'about' | 'services' | 'work' | 'blog' | 'contact';

export interface PageSEO {
  _id?: string;
  slug: PageSlug;
  title: { id: string; en: string };
  description: { id: string; en: string };
  keywords: string[];
  ogImage?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PageSEODocument {
  _id?: ObjectId;
  slug: PageSlug;
  title: { id: string; en: string };
  description: { id: string; en: string };
  keywords: string[];
  ogImage?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Serialize MongoDB document to plain object for client components
 */
function serializePageSEO(doc: PageSEODocument): PageSEO {
  return {
    ...doc,
    _id: doc._id?.toString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

/**
 * Get SEO data for a specific page
 * @param slug - Page slug (home, about, services, etc.)
 * @returns Page SEO data or null if not found
 */
export async function getPageSEO(slug: PageSlug): Promise<PageSEO | null> {
  const db = await getDatabase();
  const page = await db
    .collection<PageSEODocument>('page_seo')
    .findOne({ slug, published: true });

  return page ? serializePageSEO(page) : null;
}

/**
 * Get all page SEO data
 * @returns Array of all page SEO data
 */
export async function getAllPagesSEO(): Promise<PageSEO[]> {
  const db = await getDatabase();
  const pages = await db
    .collection<PageSEODocument>('page_seo')
    .find({ published: true })
    .toArray();

  return pages.map(serializePageSEO);
}
