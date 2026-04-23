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
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  compress: true,
  poweredByHeader: false,
  // pdfkit 自带 .afm 字体文件，走 fs.readFileSync 读取；
  // 必须把它从 webpack bundle 中排除，否则 Next.js 打包时不会把
  // data/*.afm 一并搬进 .next/server/vendor-chunks，运行时会 ENOENT。
  experimental: {
    serverComponentsExternalPackages: ['pdfkit'],
  },
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
      { source: '/marketing-plan', destination: '/marketing/campaign', permanent: true },
      { source: '/marketing-plan/login', destination: '/marketing/campaign/login', permanent: true },
      /** Short URL for organic social grid (same as /marketing/campaign/social; cookie applies after redirect). */
      { source: '/campaign/social', destination: '/marketing/campaign/social', permanent: true },
      {
        source: '/tours/china/discovery/beijing-shanghai',
        destination: '/tours/china/discovery/beijing-xian',
        permanent: true,
      },
      {
        source: '/tours/china/discovery/shanghai-beyond',
        destination: '/tours/china/discovery/shanghai-surroundings',
        permanent: true,
      },
      /** Legacy WordPress /wp-content/ → /tours (backlinks cleanup for SEO) */
      {
        source: '/wp-content/:path*',
        destination: '/tours',
        permanent: true,
      },
      /** Legacy WordPress /wp-json/ → /tours (REST API cleanup) */
      {
        source: '/wp-json/:path*',
        destination: '/tours',
        permanent: true,
      },
    ];

    return [...hostRedirects, ...pathRedirects];
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
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
