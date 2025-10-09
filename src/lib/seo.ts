import type { Metadata } from 'next';
import type { Project } from '@/lib/db/projects';
import type { BlogPost } from '@/lib/db/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebiru.com';
const SITE_NAME = 'codebiru';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  locale: 'id' | 'en';
  path?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate complete metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    locale,
    path = '',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = config;

  const url = `${SITE_URL}/${locale}${path}`;
  const canonicalUrl = url;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: author ? [{ name: author }] : undefined,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'id-ID': `${SITE_URL}/id${path}`,
        'en-US': `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      type: ogType,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? ['en_US'] : ['id_ID'],
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: `@${SITE_NAME}`,
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
    metadataBase: new URL(SITE_URL),
  };

  return metadata;
}

/**
 * Generate metadata for project detail page
 */
export function generateProjectMetadata(
  project: Project,
  locale: 'id' | 'en'
): Metadata {
  const title = project.seo?.metaTitle?.[locale] || project.title[locale];
  const description =
    project.seo?.metaDescription?.[locale] || project.description[locale];
  const keywords = project.seo?.keywords || project.tags;
  const ogImage = project.seo?.ogImage || project.thumbnail || project.images?.[0];

  return generateMetadata({
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,
    ogImage: ogImage ? `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}` : undefined,
    ogType: 'website',
    locale,
    path: `/work/${project.id}`,
    section: project.category[locale],
    tags: project.tags,
  });
}

/**
 * Generate metadata for blog post page
 */
export function generateBlogMetadata(post: BlogPost, locale: 'id' | 'en'): Metadata {
  const title = post.seo?.metaTitle?.[locale] || post.title[locale];
  const description = post.seo?.metaDescription?.[locale] || post.excerpt[locale];
  const keywords = post.seo?.keywords || post.tags;
  const ogImage = post.seo?.ogImage || post.thumbnail;

  return generateMetadata({
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,
    ogImage: ogImage ? `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}` : undefined,
    ogType: 'article',
    locale,
    path: `/blog/${post.slug}`,
    publishedTime: post.date,
    modifiedTime: post.updatedAt || post.date,
    author: post.author.name,
    section: post.category[locale],
    tags: post.tags,
  });
}

/**
 * Generate metadata for static pages from database
 */
export async function generatePageMetadata(
  page: 'home' | 'about' | 'services' | 'work' | 'blog' | 'contact',
  locale: 'id' | 'en'
): Promise<Metadata> {
  const { getPageSEO } = await import('@/lib/db/pages');
  const pageSEO = await getPageSEO(page);

  if (pageSEO) {
    const path = page === 'home' ? '' : `/${page}`;
    return generateMetadata({
      title: pageSEO.title[locale],
      description: pageSEO.description[locale],
      keywords: pageSEO.keywords,
      ogImage: pageSEO.ogImage,
      ogType: 'website',
      locale,
      path,
    });
  }

  // Fallback to default content if not found in database
  return generatePageMetadataFallback(page, locale);
}

/**
 * Fallback metadata for static pages (used if database is unavailable)
 */
function generatePageMetadataFallback(
  page: 'home' | 'about' | 'services' | 'work' | 'blog' | 'contact',
  locale: 'id' | 'en'
): Metadata {
  const content = {
    home: {
      id: {
        title: 'codebiru - Pengembangan Web & Aplikasi Premium',
        description:
          'Transformasikan kehadiran digital Anda dengan pengembangan web mutakhir, desain UI/UX yang menakjubkan, dan solusi inovatif. Tim ahli memberikan keunggulan.',
        keywords: [
          'pengembangan web',
          'pengembangan aplikasi',
          'desain UI/UX',
          'Next.js',
          'React',
          'TypeScript',
          'pengembangan frontend',
          'pengembangan full stack',
          'agensi digital',
          'codebiru',
        ],
      },
      en: {
        title: 'codebiru - Premium Web & App Development',
        description:
          'Transform your digital presence with cutting-edge web development, stunning UI/UX design, and innovative solutions. Expert team delivering excellence.',
        keywords: [
          'web development',
          'app development',
          'UI/UX design',
          'Next.js',
          'React',
          'TypeScript',
          'frontend development',
          'full stack development',
          'digital agency',
          'codebiru',
        ],
      },
    },
    about: {
      id: {
        title: 'Tentang Kami - Siapa Kami dan Apa yang Kami Lakukan',
        description:
          'Pelajari lebih lanjut tentang codebiru, tim ahli kami, dan bagaimana kami membantu bisnis berkembang melalui solusi digital inovatif.',
        keywords: ['tentang codebiru', 'tim', 'visi', 'misi', 'agensi digital'],
      },
      en: {
        title: 'About Us - Who We Are and What We Do',
        description:
          'Learn more about codebiru, our expert team, and how we help businesses thrive through innovative digital solutions.',
        keywords: ['about codebiru', 'team', 'vision', 'mission', 'digital agency'],
      },
    },
    services: {
      id: {
        title: 'Layanan Kami - Solusi Digital Komprehensif',
        description:
          'Dari pengembangan web dan aplikasi hingga desain UI/UX dan konsultasi digital - kami menawarkan layanan lengkap untuk transformasi digital Anda.',
        keywords: [
          'layanan pengembangan web',
          'layanan aplikasi',
          'desain UI/UX',
          'konsultasi digital',
          'pengembangan custom',
        ],
      },
      en: {
        title: 'Our Services - Comprehensive Digital Solutions',
        description:
          'From web and app development to UI/UX design and digital consulting - we offer complete services for your digital transformation.',
        keywords: [
          'web development services',
          'app services',
          'UI/UX design',
          'digital consulting',
          'custom development',
        ],
      },
    },
    work: {
      id: {
        title: 'Portofolio Kami - Proyek dan Kisah Sukses',
        description:
          'Jelajahi portofolio proyek kami yang beragam. Setiap proyek mewakili komitmen kami terhadap keunggulan dan inovasi dalam pengembangan digital.',
        keywords: ['portofolio', 'proyek', 'studi kasus', 'karya', 'klien'],
      },
      en: {
        title: 'Our Work - Projects and Success Stories',
        description:
          'Explore our diverse portfolio of projects. Each one represents our commitment to excellence and innovation in digital development.',
        keywords: ['portfolio', 'projects', 'case studies', 'work', 'clients'],
      },
    },
    blog: {
      id: {
        title: 'Blog - Insights, Tips, dan Berita Industri',
        description:
          'Baca artikel terbaru kami tentang pengembangan web, tren teknologi, best practices, dan insights industri dari tim ahli kami.',
        keywords: [
          'blog teknologi',
          'artikel pengembangan',
          'tutorial web',
          'tren industri',
          'tips programming',
        ],
      },
      en: {
        title: 'Blog - Insights, Tips, and Industry News',
        description:
          'Read our latest articles on web development, technology trends, best practices, and industry insights from our expert team.',
        keywords: [
          'tech blog',
          'development articles',
          'web tutorials',
          'industry trends',
          'programming tips',
        ],
      },
    },
    contact: {
      id: {
        title: 'Hubungi Kami - Mari Wujudkan Proyek Anda',
        description:
          'Siap memulai proyek Anda? Hubungi kami hari ini untuk konsultasi gratis dan diskusikan bagaimana kami dapat membantu bisnis Anda berkembang.',
        keywords: ['kontak', 'hubungi kami', 'konsultasi', 'quote', 'mulai proyek'],
      },
      en: {
        title: 'Contact Us - Let\'s Bring Your Project to Life',
        description:
          'Ready to start your project? Contact us today for a free consultation and discuss how we can help your business thrive.',
        keywords: ['contact', 'get in touch', 'consultation', 'quote', 'start project'],
      },
    },
  };

  const pageContent = content[page][locale];
  const path = page === 'home' ? '' : `/${page}`;

  return generateMetadata({
    title: pageContent.title,
    description: pageContent.description,
    keywords: pageContent.keywords,
    ogType: 'website',
    locale,
    path,
  });
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Transform your digital presence with cutting-edge web development, stunning UI/UX design, and innovative solutions.',
    sameAs: [
      'https://twitter.com/codebiru',
      'https://github.com/codebiru',
      'https://linkedin.com/company/codebiru',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Indonesian'],
    },
  };
}

/**
 * Generate JSON-LD structured data for project
 */
export function generateProjectSchema(project: Project, locale: 'id' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title[locale],
    description: project.description[locale],
    datePublished: project.date,
    dateModified: project.updatedAt || project.date,
    image: project.thumbnail || project.images?.[0],
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    keywords: project.tags.join(', '),
    url: `${SITE_URL}/${locale}/work/${project.id}`,
  };
}

/**
 * Generate JSON-LD structured data for blog post
 */
export function generateBlogSchema(post: BlogPost, locale: 'id' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: post.thumbnail,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    articleSection: post.category[locale],
    keywords: post.tags.join(', '),
    wordCount: post.content[locale].split(' ').length,
    timeRequired: `PT${post.readTime}M`,
    url: `${SITE_URL}/${locale}/blog/${post.slug}`,
  };
}

/**
 * Generate JSON-LD breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
