import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable SSR and API routes
  images: {
    unoptimized: true, // Can be removed if using Next.js Image Optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // trailingSlash: true, // Removed for SSR, can add back if needed
};

export default withNextIntl(nextConfig);
