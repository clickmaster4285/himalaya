/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable server actions for sitemap generation
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml/route'
      },
      {
        source: '/robots.txt',
        destination: '/robots.txt/route'
      }
    ];
  },
};

module.exports = nextConfig;
