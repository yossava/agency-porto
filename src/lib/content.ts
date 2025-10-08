import projectsData from '@/data/projects.json';
import blogData from '@/data/blog.json';

export interface Project {
  id: string;
  title: {
    en: string;
    id: string;
  };
  category: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  tags: string[];
  gradient: string;
  github: string;
  demo: string;
  featured: boolean;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: {
    en: string;
    id: string;
  };
  excerpt: {
    en: string;
    id: string;
  };
  content: {
    en: string;
    id: string;
  };
  date: string;
  readTime: number;
  category: {
    en: string;
    id: string;
  };
  tags: string[];
  gradient: string;
  author: string;
  published: boolean;
}

// Projects
export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter((project) => project.featured) as Project[];
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((project) => project.id === id) as Project | undefined;
}

export function getProjectsByCategory(category: string, locale: 'en' | 'id' = 'en'): Project[] {
  if (category === 'All Projects' || category === 'Semua Proyek') {
    return projectsData as Project[];
  }
  return projectsData.filter((project) => {
    const proj = project as Project;
    return proj.category[locale] === category;
  }) as Project[];
}

// Blog Posts
export function getAllBlogPosts(): BlogPost[] {
  return blogData.filter((post) => post.published) as BlogPost[];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogData.find((post) => post.slug === slug) as BlogPost | undefined;
}

export function getBlogPostsByCategory(category: string, locale: 'en' | 'id' = 'en'): BlogPost[] {
  if (category === 'All Posts' || category === 'Semua Posting') {
    return blogData.filter((post) => post.published) as BlogPost[];
  }
  return blogData.filter((post) => {
    const blogPost = post as BlogPost;
    return blogPost.published && blogPost.category[locale] === category;
  }) as BlogPost[];
}

export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return blogData
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit) as BlogPost[];
}

// Helper function to format date
export function formatDate(dateString: string, locale: 'en' | 'id' = 'en'): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', options);
}
