# SSR Migration Plan - Static to Server-Side Rendering

**Date**: 2025-10-08
**Project**: Agency Portfolio Website
**Migration Type**: SSG (Static Site Generation) → SSR (Server-Side Rendering)

---

## 📋 Executive Summary

### Current State (SSG)
- Static export enabled (`output: 'export'`)
- File-based content (JSON files)
- No backend/API routes
- Deployed to static hosting (Vercel/Netlify/S3)
- English (EN) as primary, Indonesian (ID) as secondary

### Target State (SSR)
- Server-side rendering with API routes
- MongoDB Atlas database
- Dynamic content from database
- Indonesian (ID) as primary, English (EN) as secondary
- Contact form submission to database
- SEO optimization per page

---

## 🎯 Migration Goals

1. ✅ Convert from SSG to SSR
2. ✅ Integrate MongoDB Atlas for dynamic content
3. ✅ Switch ID as primary language, EN as secondary
4. ✅ Implement server-side API routes
5. ✅ SEO optimization for all pages
6. ✅ Contact form with database persistence

---

## 📊 Phase 1: Configuration & Setup (Week 1)

### 1.1 Next.js Configuration Updates

**File**: `next.config.mjs`

**Changes**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVE: output: 'export' - This enables SSR

  // KEEP: Everything else
  images: {
    unoptimized: true, // Or configure for Next.js Image Optimization
  },

  // ADD: Environment variables
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
};

export default nextConfig;
```

**Why**: Removing `output: 'export'` enables server-side features like API routes and SSR.

---

### 1.2 Environment Variables Setup

**File**: `.env.local` (create new file, DO NOT COMMIT)

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=agency_portfolio

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Agency Portfolio

# Email Configuration (optional, for contact form notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=hello@youragency.com
```

**File**: `.env.example` (update existing)

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=agency_portfolio

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Agency Name

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=hello@youragency.com
```

---

### 1.3 Install Required Dependencies

```bash
# MongoDB driver
npm install mongodb

# For environment variable validation
npm install zod

# Email sending (optional, for contact form notifications)
npm install nodemailer
npm install -D @types/nodemailer

# For API rate limiting (recommended)
npm install lru-cache
```

---

## 📊 Phase 2: Language Priority Change (Week 1)

### 2.1 Update i18n Configuration

**File**: `src/i18n.ts`

**Current**:
```typescript
export const locales = ['en', 'id'] as const;
export const defaultLocale = 'en' as const;
```

**Change to**:
```typescript
export const locales = ['id', 'en'] as const; // ID first
export const defaultLocale = 'id' as const;    // ID as default
```

---

### 2.2 Update Middleware

**File**: `src/middleware.ts`

Update to prioritize Indonesian:

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id', // Indonesian as default
  localePrefix: 'as-needed', // Only show /en in URL, not /id
});

export const config = {
  matcher: ['/', '/(id|en)/:path*'],
};
```

---

### 2.3 Update Root Redirect

**File**: `src/app/page.tsx`

```typescript
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/id'); // Redirect to Indonesian by default
}
```

---

## 📊 Phase 3: MongoDB Schema Design (Week 1)

### 3.1 Database Structure

**Database Name**: `agency_portfolio`

**Collections**:

#### **Collection 1: `projects`**

```javascript
{
  _id: ObjectId,
  id: String,              // Unique slug (e.g., "ecommerce-platform")
  title: {
    id: String,            // Indonesian title
    en: String             // English title
  },
  category: {
    id: String,
    en: String
  },
  description: {
    id: String,
    en: String
  },
  content: {               // Full project details
    id: String,            // Rich text/markdown
    en: String
  },
  tags: [String],          // ["Next.js", "MongoDB", "TypeScript"]
  gradient: String,        // Tailwind gradient class
  thumbnail: String,       // Image URL (optional)
  images: [String],        // Array of image URLs (optional)
  github: String,          // GitHub URL (optional)
  demo: String,            // Demo URL (optional)
  featured: Boolean,       // Show in featured section
  published: Boolean,      // Draft/Published status
  date: Date,              // Project completion date
  createdAt: Date,         // Database timestamp
  updatedAt: Date          // Last modified
}
```

**Indexes**:
```javascript
db.projects.createIndex({ "id": 1 }, { unique: true })
db.projects.createIndex({ "featured": 1, "date": -1 })
db.projects.createIndex({ "published": 1 })
```

---

#### **Collection 2: `blog_posts`**

```javascript
{
  _id: ObjectId,
  slug: String,            // Unique slug (e.g., "modern-web-dev-2024")
  title: {
    id: String,
    en: String
  },
  excerpt: {
    id: String,
    en: String
  },
  content: {
    id: String,            // Full article content (markdown/HTML)
    en: String
  },
  category: {
    id: String,
    en: String
  },
  tags: [String],
  gradient: String,
  thumbnail: String,       // Featured image URL (optional)
  author: {
    name: String,
    avatar: String,        // Author avatar URL (optional)
    bio: {
      id: String,
      en: String
    }
  },
  readTime: Number,        // Minutes to read
  published: Boolean,
  featured: Boolean,
  date: Date,              // Publication date
  createdAt: Date,
  updatedAt: Date,
  views: Number,           // View count (optional)
  seo: {                   // SEO metadata
    metaTitle: {
      id: String,
      en: String
    },
    metaDescription: {
      id: String,
      en: String
    },
    ogImage: String        // Open Graph image URL
  }
}
```

**Indexes**:
```javascript
db.blog_posts.createIndex({ "slug": 1 }, { unique: true })
db.blog_posts.createIndex({ "published": 1, "date": -1 })
db.blog_posts.createIndex({ "featured": 1 })
db.blog_posts.createIndex({ "category.id": 1 })
```

---

#### **Collection 3: `contact_submissions`**

```javascript
{
  _id: ObjectId,
  name: String,            // Full name
  email: String,           // Email address
  phone: String,           // Phone number (optional)
  company: String,         // Company name (optional)
  message: String,         // Contact message
  subject: String,         // Message subject (optional)
  locale: String,          // Language used when submitting (id/en)
  status: String,          // "new", "read", "replied", "archived"
  source: String,          // "contact_form", "newsletter", etc.
  metadata: {
    userAgent: String,     // Browser info
    ip: String,            // IP address (optional, be GDPR compliant)
    referrer: String       // Where they came from
  },
  createdAt: Date,         // Submission timestamp
  readAt: Date,            // When marked as read (optional)
  repliedAt: Date          // When replied (optional)
}
```

**Indexes**:
```javascript
db.contact_submissions.createIndex({ "createdAt": -1 })
db.contact_submissions.createIndex({ "status": 1 })
db.contact_submissions.createIndex({ "email": 1 })
```

---

#### **Collection 4: `services` (Optional)**

```javascript
{
  _id: ObjectId,
  id: String,              // Unique ID
  title: {
    id: String,
    en: String
  },
  description: {
    id: String,
    en: String
  },
  icon: String,            // Icon name (lucide-react icon)
  features: [
    {
      title: { id: String, en: String },
      description: { id: String, en: String }
    }
  ],
  pricing: {               // Optional pricing info
    starting: Number,
    currency: String
  },
  order: Number,           // Display order
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

#### **Collection 5: `site_settings` (Optional)**

```javascript
{
  _id: ObjectId,
  key: String,             // Unique setting key
  value: Mixed,            // Any type of value
  category: String,        // "general", "seo", "contact", etc.
  description: String,
  updatedAt: Date
}

// Example documents:
{
  key: "site_name",
  value: { id: "Nama Agensi", en: "Agency Name" },
  category: "general"
}
{
  key: "contact_email",
  value: "hello@agency.com",
  category: "contact"
}
```

---

## 📊 Phase 4: Database Connection Setup (Week 1)

### 4.1 MongoDB Connection Utility

**File**: `src/lib/mongodb.ts` (create new)

```typescript
import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper to get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'agency_portfolio');
}
```

---

### 4.2 Database Models/Helpers

**File**: `src/lib/db/projects.ts` (create new)

```typescript
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

export async function getAllProjects(locale: 'id' | 'en' = 'id') {
  const db = await getDatabase();
  const projects = await db
    .collection<Project>('projects')
    .find({ published: true })
    .sort({ date: -1 })
    .toArray();

  return projects;
}

export async function getFeaturedProjects() {
  const db = await getDatabase();
  const projects = await db
    .collection<Project>('projects')
    .find({ published: true, featured: true })
    .sort({ date: -1 })
    .limit(4)
    .toArray();

  return projects;
}

export async function getProjectById(id: string) {
  const db = await getDatabase();
  const project = await db
    .collection<Project>('projects')
    .findOne({ id, published: true });

  return project;
}

export async function getProjectsByCategory(category: string, locale: 'id' | 'en' = 'id') {
  const db = await getDatabase();
  const projects = await db
    .collection<Project>('projects')
    .find({
      published: true,
      [`category.${locale}`]: category
    })
    .sort({ date: -1 })
    .toArray();

  return projects;
}
```

---

**File**: `src/lib/db/blog.ts` (create new)

```typescript
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

export async function getAllBlogPosts() {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({ published: true })
    .sort({ date: -1 })
    .toArray();

  return posts;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDatabase();
  const post = await db
    .collection<BlogPost>('blog_posts')
    .findOne({ slug, published: true });

  // Increment view count
  if (post) {
    await db
      .collection<BlogPost>('blog_posts')
      .updateOne(
        { slug },
        { $inc: { views: 1 } }
      );
  }

  return post;
}

export async function getFeaturedBlogPosts(limit: number = 3) {
  const db = await getDatabase();
  const posts = await db
    .collection<BlogPost>('blog_posts')
    .find({ published: true, featured: true })
    .sort({ date: -1 })
    .limit(limit)
    .toArray();

  return posts;
}
```

---

**File**: `src/lib/db/contact.ts` (create new)

```typescript
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface ContactSubmission {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
  locale: 'id' | 'en';
  status: 'new' | 'read' | 'replied' | 'archived';
  source: string;
  metadata?: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
  };
  createdAt: Date;
  readAt?: Date;
  repliedAt?: Date;
}

export async function createContactSubmission(data: Omit<ContactSubmission, '_id' | 'createdAt' | 'status'>) {
  const db = await getDatabase();

  const submission: ContactSubmission = {
    ...data,
    status: 'new',
    createdAt: new Date(),
  };

  const result = await db
    .collection<ContactSubmission>('contact_submissions')
    .insertOne(submission);

  return result;
}

export async function getContactSubmissions(status?: string) {
  const db = await getDatabase();

  const filter = status ? { status } : {};

  const submissions = await db
    .collection<ContactSubmission>('contact_submissions')
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return submissions;
}
```

---

## 📊 Phase 5: API Routes Implementation (Week 2)

### 5.1 Projects API

**File**: `src/app/api/projects/route.ts` (create new)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getFeaturedProjects } from '@/lib/db/projects';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    let projects;

    if (featured === 'true') {
      projects = await getFeaturedProjects();
    } else {
      projects = await getAllProjects();
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
```

---

**File**: `src/app/api/projects/[id]/route.ts` (create new)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '@/lib/db/projects';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectById(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
```

---

### 5.2 Blog API

**File**: `src/app/api/blog/route.ts` (create new)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/db/blog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let posts;

    if (featured === 'true') {
      posts = await getFeaturedBlogPosts(limit ? parseInt(limit) : 3);
    } else {
      posts = await getAllBlogPosts();
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
```

---

**File**: `src/app/api/blog/[slug]/route.ts` (create new)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/db/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
```

---

### 5.3 Contact Form API

**File**: `src/app/api/contact/route.ts` (create new)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createContactSubmission } from '@/lib/db/contact';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional(),
  locale: z.enum(['id', 'en']),
});

// Simple rate limiting (in-memory, use Redis in production)
const rateLimitMap = new Map<string, number[]>();

function rateLimit(ip: string, maxRequests: number = 3, windowMs: number = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter(t => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown';

    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Get metadata
    const metadata = {
      userAgent: request.headers.get('user-agent') || undefined,
      ip: ip !== 'unknown' ? ip : undefined,
      referrer: request.headers.get('referer') || undefined,
    };

    // Save to database
    const result = await createContactSubmission({
      ...validatedData,
      source: 'contact_form',
      metadata,
    });

    // TODO: Send email notification (optional)
    // await sendEmailNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertedId.toString(),
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
```

---

## 📊 Phase 6: Update Pages to Use SSR (Week 2)

### 6.1 Update Project Pages

**File**: `src/app/[locale]/work/page.tsx`

**Change from**: Client Component with JSON import
**Change to**: Server Component with database query

```typescript
// REMOVE 'use client' directive
import { getAllProjects } from '@/lib/db/projects';
import WorkPageClient from '@/components/work/WorkPageClient';

interface WorkPageProps {
  params: { locale: string };
}

export default async function WorkPage({ params: { locale } }: WorkPageProps) {
  // Fetch from database instead of JSON
  const projects = await getAllProjects();
  const currentLocale = locale as 'en' | 'id';

  return <WorkPageClient projects={projects} locale={currentLocale} />;
}
```

**Create**: `src/components/work/WorkPageClient.tsx` (move client logic here)

---

**File**: `src/app/[locale]/work/[id]/page.tsx`

**Remove** `generateStaticParams()` (not needed for SSR)

```typescript
import { getProjectById, getAllProjects } from '@/lib/db/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/work/ProjectDetailClient';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: { locale: string; id: string };
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectById(params.id);
  const locale = params.locale as 'id' | 'en';

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title[locale],
    description: project.description[locale],
    openGraph: {
      title: project.title[locale],
      description: project.description[locale],
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export default async function ProjectPage({ params: { locale, id } }: ProjectPageProps) {
  const project = await getProjectById(id);
  const currentLocale = locale as 'en' | 'id';

  if (!project) {
    notFound();
  }

  // Get related projects
  const allProjects = await getAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== id && p.category[currentLocale] === project.category[currentLocale])
    .slice(0, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} locale={currentLocale} />;
}
```

---

### 6.2 Update Blog Pages

**File**: `src/app/[locale]/blog/page.tsx`

```typescript
// Remove 'use client'
import { getAllBlogPosts } from '@/lib/db/blog';
import BlogPageClient from '@/components/blog/BlogPageClient';

interface BlogPageProps {
  params: { locale: string };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const posts = await getAllBlogPosts();
  const currentLocale = locale as 'en' | 'id';

  return <BlogPageClient posts={posts} locale={currentLocale} />;
}
```

---

**File**: `src/app/[locale]/blog/[slug]/page.tsx`

```typescript
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/db/blog';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  const locale = params.locale as 'id' | 'en';

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const metaTitle = post.seo?.metaTitle?.[locale] || post.title[locale];
  const metaDescription = post.seo?.metaDescription?.[locale] || post.excerpt[locale];

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: post.seo?.ogImage || post.thumbnail ? [post.seo?.ogImage || post.thumbnail] : [],
      type: 'article',
      publishedTime: post.date.toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: post.seo?.ogImage || post.thumbnail ? [post.seo?.ogImage || post.thumbnail] : [],
    },
  };
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(slug);
  const currentLocale = locale as 'en' | 'id';

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category[currentLocale] === post.category[currentLocale])
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale={currentLocale} />;
}
```

---

### 6.3 Update Contact Form

**File**: `src/components/ContactForm.tsx` (create or update)

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ContactFormProps {
  locale: 'id' | 'en';
}

export default function ContactForm({ locale }: ContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      locale,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSuccess(true);
      e.currentTarget.reset();

      // Optional: Show success message or redirect
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {locale === 'id' ? 'Nama' : 'Name'}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {locale === 'id' ? 'Pesan' : 'Message'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400">
          {locale === 'id'
            ? 'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.'
            : 'Message sent successfully! We will contact you soon.'}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50"
      >
        {loading
          ? (locale === 'id' ? 'Mengirim...' : 'Sending...')
          : (locale === 'id' ? 'Kirim Pesan' : 'Send Message')}
      </button>
    </form>
  );
}
```

---

## 📊 Phase 7: SEO Optimization (Week 3)

### 7.1 Root Layout SEO

**File**: `src/app/[locale]/layout.tsx`

```typescript
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'id' | 'en';

  const isID = locale === 'id';

  return {
    title: {
      default: isID
        ? 'Agency - Solusi Digital Premium untuk Bisnis Anda'
        : 'Agency - Premium Digital Solutions for Your Business',
      template: isID
        ? '%s | Agency - Solusi Digital Premium'
        : '%s | Agency - Premium Digital Solutions',
    },
    description: isID
      ? 'Kami adalah agensi digital yang mengkhususkan diri dalam pengembangan web, desain UI/UX, dan solusi digital inovatif untuk mengubah bisnis Anda.'
      : 'We are a digital agency specializing in web development, UI/UX design, and innovative digital solutions to transform your business.',
    keywords: isID
      ? ['pengembangan web', 'desain UI/UX', 'agensi digital', 'solusi digital', 'Indonesia']
      : ['web development', 'UI/UX design', 'digital agency', 'digital solutions'],
    authors: [{ name: 'Agency Team' }],
    creator: 'Agency',
    publisher: 'Agency',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      siteName: 'Agency',
      title: isID
        ? 'Agency - Solusi Digital Premium'
        : 'Agency - Premium Digital Solutions',
      description: isID
        ? 'Transformasikan kehadiran digital Anda dengan solusi web dan aplikasi premium kami.'
        : 'Transform your digital presence with our premium web and app solutions.',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isID
        ? 'Agency - Solusi Digital Premium'
        : 'Agency - Premium Digital Solutions',
      description: isID
        ? 'Transformasikan kehadiran digital Anda dengan solusi web dan aplikasi premium kami.'
        : 'Transform your digital presence with our premium web and app solutions.',
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      languages: {
        'id': `${process.env.NEXT_PUBLIC_SITE_URL}/id`,
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
      },
    },
  };
}
```

---

### 7.2 Add Structured Data (JSON-LD)

**File**: `src/components/StructuredData.tsx` (create new)

```typescript
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agency',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    description: 'Premium digital agency specializing in web development and design',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-xxx-xxxx-xxxx',
      contactType: 'Customer Service',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [
      'https://www.facebook.com/youragency',
      'https://www.twitter.com/youragency',
      'https://www.linkedin.com/company/youragency',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  author
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agency',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

Add to layout:
```typescript
import { OrganizationSchema } from '@/components/StructuredData';

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale}>
      <head>
        <OrganizationSchema />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### 7.3 Add Sitemap

**File**: `src/app/sitemap.ts` (create new)

```typescript
import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/db/projects';
import { getAllBlogPosts } from '@/lib/db/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const projects = await getAllProjects();
  const posts = await getAllBlogPosts();

  const locales = ['id', 'en'];

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/work',
    '/blog',
    '/contact',
  ];

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  // Project pages
  const projectUrls = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${baseUrl}/${locale}/work/${project.id}`,
      lastModified: project.updatedAt || project.createdAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Blog pages
  const blogUrls = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
```

---

### 7.4 Add Robots.txt

**File**: `src/app/robots.ts` (create new)

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 📊 Phase 8: Data Migration (Week 3)

### 8.1 Create Migration Script

**File**: `scripts/migrate-to-mongodb.ts` (create new)

```typescript
import { MongoClient } from 'mongodb';
import projectsData from '../src/data/projects.json';
import blogData from '../src/data/blog.json';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'agency_portfolio';

async function migrate() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db(dbName);

    // Migrate projects
    console.log('\nMigrating projects...');
    const projectsCollection = db.collection('projects');

    // Clear existing data
    await projectsCollection.deleteMany({});

    const projects = projectsData.map((project) => ({
      ...project,
      date: new Date(project.date),
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const projectResult = await projectsCollection.insertMany(projects);
    console.log(`✓ Inserted ${projectResult.insertedCount} projects`);

    // Create indexes
    await projectsCollection.createIndex({ id: 1 }, { unique: true });
    await projectsCollection.createIndex({ featured: 1, date: -1 });
    await projectsCollection.createIndex({ published: 1 });
    console.log('✓ Created project indexes');

    // Migrate blog posts
    console.log('\nMigrating blog posts...');
    const blogCollection = db.collection('blog_posts');

    // Clear existing data
    await blogCollection.deleteMany({});

    const posts = blogData.map((post) => ({
      ...post,
      date: new Date(post.date),
      published: true,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const blogResult = await blogCollection.insertMany(posts);
    console.log(`✓ Inserted ${blogResult.insertedCount} blog posts`);

    // Create indexes
    await blogCollection.createIndex({ slug: 1 }, { unique: true });
    await blogCollection.createIndex({ published: 1, date: -1 });
    await blogCollection.createIndex({ featured: 1 });
    console.log('✓ Created blog post indexes');

    console.log('\n✓ Migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
```

**Add to** `package.json`:
```json
{
  "scripts": {
    "migrate": "tsx scripts/migrate-to-mongodb.ts"
  }
}
```

**Install tsx**:
```bash
npm install -D tsx
```

**Run migration**:
```bash
npm run migrate
```

---

## 📊 Phase 9: Testing & Deployment (Week 4)

### 9.1 Testing Checklist

- [ ] All pages load correctly
- [ ] Database connections work
- [ ] API routes return correct data
- [ ] Contact form submissions save to database
- [ ] SEO metadata displays correctly
- [ ] Sitemap generates correctly
- [ ] Language switching works (ID ↔ EN)
- [ ] Indonesian is default language
- [ ] Related content displays correctly
- [ ] Mobile responsiveness maintained
- [ ] Performance acceptable (use Lighthouse)

---

### 9.2 Update Deployment Configuration

**For Vercel**:

1. Update project settings to use Node.js runtime
2. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `NEXT_PUBLIC_SITE_URL`

3. Deploy:
```bash
vercel --prod
```

**For Other Platforms**:
- Ensure Node.js 18+ runtime
- Add environment variables
- Ensure serverless functions are supported

---

## 📊 MongoDB Atlas Setup Instructions

### Step 1: Create Cluster

1. Go to https://cloud.mongodb.com
2. Sign up / Sign in
3. Create a new cluster (Free M0 tier available)
4. Choose cloud provider and region (closest to your users)
5. Name your cluster (e.g., `agency-portfolio`)

### Step 2: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose authentication method (username/password)
4. Set username and strong password
5. Set role to "Read and write to any database"

### Step 3: Whitelist IP Addresses

1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development
4. For production, add specific IPs or use Vercel's IP ranges

### Step 4: Get Connection String

1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your database user password

### Step 5: Create Database & Collections

Collections will be created automatically when you run the migration script, but you can create them manually:

1. Go to "Collections"
2. Click "Create Database"
3. Database name: `agency_portfolio`
4. Create collections:
   - `projects`
   - `blog_posts`
   - `contact_submissions`
   - `services` (optional)
   - `site_settings` (optional)

---

## 📊 Summary of Changes

### Files to Create (New)
- `.env.local` - Environment variables
- `src/lib/mongodb.ts` - Database connection
- `src/lib/db/projects.ts` - Project queries
- `src/lib/db/blog.ts` - Blog queries
- `src/lib/db/contact.ts` - Contact submissions
- `src/app/api/projects/route.ts` - Projects API
- `src/app/api/projects/[id]/route.ts` - Single project API
- `src/app/api/blog/route.ts` - Blog API
- `src/app/api/blog/[slug]/route.ts` - Single blog post API
- `src/app/api/contact/route.ts` - Contact form API
- `src/components/ContactForm.tsx` - Contact form component
- `src/components/StructuredData.tsx` - SEO structured data
- `src/app/sitemap.ts` - Dynamic sitemap
- `src/app/robots.ts` - Robots.txt
- `scripts/migrate-to-mongodb.ts` - Migration script
- Client component versions of pages (WorkPageClient, BlogPageClient, etc.)

### Files to Modify
- `next.config.mjs` - Remove static export
- `src/i18n.ts` - Change default locale to ID
- `src/middleware.ts` - Update locale priority
- `src/app/page.tsx` - Redirect to /id
- `src/app/[locale]/layout.tsx` - Enhanced SEO metadata
- `src/app/[locale]/work/page.tsx` - SSR with database
- `src/app/[locale]/work/[id]/page.tsx` - SSR, dynamic metadata
- `src/app/[locale]/blog/page.tsx` - SSR with database
- `src/app/[locale]/blog/[slug]/page.tsx` - SSR, dynamic metadata
- `src/app/[locale]/contact/page.tsx` - Add contact form
- `.env.example` - Add MongoDB variables
- `package.json` - Add migration script

### Files to Keep
- All component files (UI components remain the same)
- All styling (Tailwind, CSS)
- All client-side animations (Framer Motion)
- Translation files (messages/en.json, messages/id.json)

---

## 🎯 Migration Timeline

**Week 1**: Configuration & Database Setup
- Days 1-2: Update Next.js config, install dependencies
- Days 3-4: Set up MongoDB Atlas, create collections
- Days 5-7: Create database connection & helper functions

**Week 2**: API Routes & SSR Implementation
- Days 1-3: Create all API routes
- Days 4-5: Update pages to use SSR
- Days 6-7: Implement contact form

**Week 3**: SEO & Data Migration
- Days 1-2: Add SEO metadata to all pages
- Days 3-4: Create sitemap and structured data
- Days 5-7: Run migration script, test all data

**Week 4**: Testing & Deployment
- Days 1-3: Comprehensive testing
- Days 4-5: Fix bugs and optimize
- Days 6-7: Deploy to production

---

## ⚠️ Important Notes

1. **Backup**: Keep JSON files as backup until migration is confirmed successful
2. **Testing**: Test thoroughly in development before deploying
3. **Security**: Never commit `.env.local` to git
4. **Rate Limiting**: Implement proper rate limiting in production
5. **Error Handling**: Add comprehensive error logging
6. **Monitoring**: Set up MongoDB Atlas monitoring and alerts
7. **Performance**: Monitor query performance and add indexes as needed
8. **GDPR**: If storing user data (IPs, emails), ensure GDPR compliance

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Vercel Deployment](https://vercel.com/docs)

---

**Ready to start migration? Begin with Phase 1!** 🚀
