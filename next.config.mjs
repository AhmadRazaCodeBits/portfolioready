/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Performance: compress responses
  compress: true,
  // Performance: optimize packages for serverless
  serverExternalPackages: ['mongoose'],
  // Cache static pages and enable ISR
  async headers() {
    return [
      {
        // Cache all static assets with immutable header
        source: '/:path*.{ico,png,jpg,jpeg,svg,webp,gif,woff,woff2}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
