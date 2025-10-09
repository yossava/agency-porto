import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Project {
  _id?: string;
  id: string;
  title: { id: string; en: string };
  category: { id: string; en: string };
  description: { id: string; en: string };
  content?: { id: string; en: string };
  tags: string[];
  gradient: string;
  thumbnail?: string;
  images?: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  published: boolean;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  seo?: {
    metaTitle?: { id: string; en: string };
    metaDescription?: { id: string; en: string };
    keywords?: string[];
    ogImage?: string;
    ogType?: string;
  };
}

interface ProjectDocument {
  _id?: ObjectId;
  id: string;
  title: { id: string; en: string };
  category: { id: string; en: string };
  description: { id: string; en: string };
  content?: { id: string; en: string };
  tags: string[];
  gradient: string;
  thumbnail?: string;
  images?: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  published: boolean;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  seo?: {
    metaTitle?: { id: string; en: string };
    metaDescription?: { id: string; en: string };
    keywords?: string[];
    ogImage?: string;
    ogType?: string;
  };
}

/**
 * Serialize MongoDB document to plain object for client components
 */
function serializeProject(doc: ProjectDocument): Project {
  return {
    ...doc,
    _id: doc._id?.toString(),
    date: doc.date.toISOString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

/**
 * Get all published projects
 * @returns Array of projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const db = await getDatabase();
  const projects = await db
    .collection<ProjectDocument>('projects')
    .find({ published: true })
    .sort({ date: -1 })
    .toArray();

  return projects.map(serializeProject);
}

/**
 * Get featured projects
 * @param limit - Maximum number of projects to return
 * @returns Array of featured projects
 */
export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  const db = await getDatabase();
  const projects = await db
    .collection<ProjectDocument>('projects')
    .find({ published: true, featured: true })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return projects.map(serializeProject);
}

/**
 * Get a single project by ID
 * @param id - Project ID (slug)
 * @returns Project or null if not found
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const db = await getDatabase();
  const project = await db
    .collection<ProjectDocument>('projects')
    .findOne({ id, published: true });

  return project ? serializeProject(project) : null;
}

/**
 * Get projects by category
 * @param category - Category name
 * @param locale - Language locale (id or en)
 * @returns Array of projects in the category
 */
export async function getProjectsByCategory(
  category: string,
  locale: 'id' | 'en' = 'id'
): Promise<Project[]> {
  const db = await getDatabase();
  const projects = await db
    .collection<ProjectDocument>('projects')
    .find({
      published: true,
      [`category.${locale}`]: category,
    })
    .sort({ date: -1 })
    .toArray();

  return projects.map(serializeProject);
}

/**
 * Get related projects (same category, excluding current project)
 * @param projectId - Current project ID to exclude
 * @param category - Category to match
 * @param locale - Language locale
 * @param limit - Maximum number of projects to return
 * @returns Array of related projects
 */
export async function getRelatedProjects(
  projectId: string,
  category: string,
  locale: 'id' | 'en' = 'id',
  limit: number = 3
): Promise<Project[]> {
  const db = await getDatabase();
  const projects = await db
    .collection<ProjectDocument>('projects')
    .find({
      published: true,
      id: { $ne: projectId },
      [`category.${locale}`]: category,
    })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return projects.map(serializeProject);
}
