// Locale types
export type Locale = 'en' | 'id';

// Bilingual content type
export interface BilingualContent {
  en: string;
  id: string;
}

// Project types
export interface Project {
  id: string;
  slug: string;
  title: BilingualContent;
  description: BilingualContent;
  longDescription: BilingualContent;
  category: string;
  tags: string[];
  image: string;
  images: string[];
  client: BilingualContent;
  year: number;
  duration: string;
  role: BilingualContent;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  results?: {
    metric: BilingualContent;
    value: string;
  }[];
}

// Service types
export interface Service {
  id: string;
  slug: string;
  title: BilingualContent;
  description: BilingualContent;
  longDescription: BilingualContent;
  icon: string;
  features: BilingualContent[];
  pricing?: {
    starting: string;
    currency: string;
  };
}

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  role: BilingualContent;
  bio: BilingualContent;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: BilingualContent;
  company: string;
  content: BilingualContent;
  avatar: string;
  rating: number;
}

// Blog post types
export interface BlogPost {
  slug: string;
  title: BilingualContent;
  description: BilingualContent;
  content: BilingualContent;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}

// Navigation types
export interface NavItem {
  label: BilingualContent;
  href: string;
  children?: NavItem[];
}

// SEO Metadata types
export interface SEOMetadata {
  title: BilingualContent;
  description: BilingualContent;
  keywords?: string[];
  openGraph?: {
    title: BilingualContent;
    description: BilingualContent;
    image: string;
  };
}
