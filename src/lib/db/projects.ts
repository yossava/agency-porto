import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Project {
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
}

/**
 * Get all published projects
 * @returns Array of projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const db = await getDatabase();
  const projects = await db
    .collection<Project>('projects')
    .find({ published: true })
    .sort({ date: -1 })
    .toArray();

  return projects;
}

/**
 * Get featured projects
 * @param limit - Maximum number of projects to return
 * @returns Array of featured projects
 */
export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  const db = await getDatabase();
  const projects = await db
    .collection<Project>('projects')
    .find({ published: true, featured: true })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return projects;
}

/**
 * Get a single project by ID
 * @param id - Project ID (slug)
 * @returns Project or null if not found
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const db = await getDatabase();
  const project = await db
    .collection<Project>('projects')
    .findOne({ id, published: true });

  return project;
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
    .collection<Project>('projects')
    .find({
      published: true,
      [`category.${locale}`]: category,
    })
    .sort({ date: -1 })
    .toArray();

  return projects;
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
    .collection<Project>('projects')
    .find({
      published: true,
      id: { $ne: projectId },
      [`category.${locale}`]: category,
    })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return projects;
}
