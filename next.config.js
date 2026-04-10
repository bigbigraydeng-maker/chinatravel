/** @type {import('next').NextConfig} */
const CANONICAL_HOST = 'www.ctstours.co.nz';

/** Hosts that should 308 to https://www.ctstours.co.nz (same Next.js app on Render). */
const LEGACY_HOSTS = [
  'chinatravel.co.nz',
  'www.chinatravel.co.nz',
  'ctstours.co.nz', // apex → www
];
// Optional: set REDIRECT_ONRENDER_HOST=chinatravel-zloe.onrender.com if that hostname still serves this app.
if (process.env.REDIRECT_ONRENDER_HOST) {
  LEGACY_HOSTS.push(process.env.REDIRECT_ONRENDER_HOST.trim());
}

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'qbturrydultenhlfmdcm.supabase.co',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    const hostRedirects = LEGACY_HOSTS.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: `https://${CANONICAL_HOST}/:path*`,
      permanent: true,
    }));

    const pathRedirects = [
      {
        source: '/guide/china-visa-guide-for-new-zealanders',
        destination: '/china-visa-guide-for-new-zealanders',
        permanent: true,
      },
    ];

    return [...hostRedirects, ...pathRedirects];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
