// Re-export database functions for backward compatibility
// This allows existing pages to continue working without changes
export {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectsByCategory,
  getRelatedProjects,
  type Project,
} from './db/projects';

export {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getFeaturedBlogPosts,
  getRelatedBlogPosts,
  getRecentBlogPosts,
  type BlogPost,
} from './db/blog';

// Helper function to format date
export function formatDate(dateString: string | Date, locale: 'en' | 'id' = 'en'): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', options);
}
