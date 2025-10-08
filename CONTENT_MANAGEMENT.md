# Content Management Guide

This project uses JSON files for content management, making it easy to update projects, blog posts, and manage translations without needing a CMS.

## Structure

```
src/
├── data/
│   ├── projects.json    # Projects/Portfolio items
│   └── blog.json        # Blog posts
└── lib/
    └── content.ts       # Helper functions to read data
```

## Managing Projects

Edit `src/data/projects.json` to add, update, or remove projects.

### Project Schema

```json
{
  "id": "unique-project-id",
  "title": {
    "en": "Project Title in English",
    "id": "Judul Proyek dalam Bahasa Indonesia"
  },
  "category": {
    "en": "Web Development",
    "id": "Pengembangan Web"
  },
  "description": {
    "en": "Project description in English",
    "id": "Deskripsi proyek dalam Bahasa Indonesia"
  },
  "tags": ["Next.js", "TypeScript", "Tailwind"],
  "gradient": "from-blue-500 to-cyan-500",
  "github": "https://github.com/username/repo",
  "demo": "https://demo.example.com",
  "featured": true,
  "date": "2024-12-01"
}
```

### Available Gradients

- `from-blue-500 to-cyan-500`
- `from-purple-500 to-pink-500`
- `from-orange-500 to-red-500`
- `from-green-500 to-emerald-500`
- `from-indigo-500 to-purple-500`
- `from-pink-500 to-rose-500`

## Managing Blog Posts

Edit `src/data/blog.json` to add, update, or remove blog posts.

### Blog Post Schema

```json
{
  "slug": "url-friendly-post-slug",
  "title": {
    "en": "Post Title in English",
    "id": "Judul Post dalam Bahasa Indonesia"
  },
  "excerpt": {
    "en": "Short description in English",
    "id": "Deskripsi singkat dalam Bahasa Indonesia"
  },
  "content": {
    "en": "Full article content in English...",
    "id": "Konten artikel lengkap dalam Bahasa Indonesia..."
  },
  "date": "2024-12-15",
  "readTime": 5,
  "category": {
    "en": "Development",
    "id": "Pengembangan"
  },
  "tags": ["Web Development", "Trends", "AI"],
  "gradient": "from-blue-500 to-cyan-500",
  "author": "Your Name",
  "published": true
}
```

## Helper Functions

The `src/lib/content.ts` file provides helper functions:

### Projects
- `getAllProjects()` - Get all projects
- `getFeaturedProjects()` - Get only featured projects
- `getProjectById(id)` - Get specific project by ID
- `getProjectsByCategory(category, locale)` - Filter by category

### Blog Posts
- `getAllBlogPosts()` - Get all published posts
- `getBlogPostBySlug(slug)` - Get specific post by slug
- `getBlogPostsByCategory(category, locale)` - Filter by category
- `getRecentBlogPosts(limit)` - Get recent posts (default 3)
- `formatDate(dateString, locale)` - Format date for display

## Usage Example

```typescript
import { getAllProjects, getAllBlogPosts } from '@/lib/content';

// In your component
const projects = getAllProjects();
const posts = getAllBlogPosts();
const currentLocale = locale as 'en' | 'id';

// Access localized content
projects.map((project) => (
  <div>
    <h3>{project.title[currentLocale]}</h3>
    <p>{project.description[currentLocale]}</p>
  </div>
));
```

## When to Use CMS vs JSON

### Use JSON files when:
✅ Small to medium portfolio/agency site
✅ Infrequent content updates
✅ Technical team managing content
✅ Want version control for content
✅ No need for non-technical editors
✅ Static site generation (SSG)

### Consider a CMS when:
- Large content volume (100+ posts)
- Frequent content updates by non-technical users
- Need media management
- Require content scheduling/workflows
- Want draft/publish workflows
- Need user roles and permissions

## Recommended CMS Options (if needed later)

1. **Sanity.io** - Best for flexibility
2. **Contentful** - Enterprise-grade
3. **Strapi** - Self-hosted, open-source
4. **Payload CMS** - Modern, TypeScript-based
5. **Ghost** - Best for blogs

## Build Process

The JSON files are imported at build time:
- Changes require rebuilding the site (`npm run build`)
- For development, restart dev server after JSON changes
- Perfect for static site deployment (Vercel, Netlify)

## Tips

1. **Keep backups** - Git tracks changes, but keep backups before major edits
2. **Validate JSON** - Use a JSON validator to avoid syntax errors
3. **Date format** - Always use YYYY-MM-DD format
4. **Slugs** - Use lowercase, hyphens, no special characters
5. **Images** - Store in `public/` folder and reference with `/image.jpg`
