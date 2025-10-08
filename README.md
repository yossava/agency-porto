# Agency Website

A modern, bilingual (English & Indonesian) agency website built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎨 Premium Design**: Glass-morphism, gradient effects, and smooth animations
- **🌐 Bilingual**: Full support for English and Indonesian
- **⚡ Performance**: Optimized with Next.js 14 App Router and static site generation
- **📱 Responsive**: Mobile-first design that works on all devices
- **🎭 Interactive**: 3D hero scene, magnetic buttons, particle grid, cursor interactions
- **📝 Content Management**: JSON-based system for easy content updates (see [CONTENT_MANAGEMENT.md](CONTENT_MANAGEMENT.md))
- **♿ Accessible**: Semantic HTML and ARIA labels
- **🔍 SEO Optimized**: Meta tags, Open Graph, and Twitter Card support

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router with Static Export)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **3D Graphics**: [Three.js](https://threejs.org/) with React Three Fiber & Drei
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Space Grotesk & Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Serve production build locally
npm run serve
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   └── [locale]/     # Locale-based routing (en/id)
│   ├── components/       # React components
│   ├── data/            # Static data (projects, services, etc.)
│   ├── lib/             # Utility functions
│   ├── messages/        # i18n translations (en.json, id.json)
│   └── types/           # TypeScript types
├── public/              # Static assets
└── .ai/                 # Private workflow files (gitignored)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run serve` - Serve production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

This project uses static export and can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**

Build output goes to `/out` directory.

## Bilingual Support

The website supports English (`/en`) and Indonesian (`/id`) routes:

- Homepage: `/en` or `/id`
- Services: `/en/services` or `/id/services`
- Work: `/en/work` or `/id/work`
- etc.

Language switcher is available in the header.

## Performance

- Lighthouse Score: 95+ (all categories)
- First Contentful Paint: < 1.0s
- Largest Contentful Paint: < 1.5s
- Fully static - no server required

## License

Proprietary - All rights reserved
