import path from "path";
import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";

const cwd = process.cwd();
const repoRoot =
  path.basename(cwd).toLowerCase() === "frontend" ? path.resolve(cwd, "..") : cwd;

// Merge env so server/RSC see JWT_SECRET from backend or repo root (frontend/.env* can override).
loadEnvConfig(path.join(repoRoot, "backend"));
loadEnvConfig(repoRoot);
loadEnvConfig(cwd);

const backend = (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    domains: ["picsum.photos"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/villas-in-bhurban-murree",
        destination: "/Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban",
        permanent: true,
      },
      // Legacy public URLs from sitemap → current App Router paths
      { source: "/booking", destination: "/book", permanent: true },
      { source: "/book-now", destination: "/book", permanent: true },
      { source: "/journal", destination: "/blogs", permanent: true },
      { source: "/luxury-hotels-in-muree", destination: "/luxury-hotels-in-murree", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban", destination: "/blog/Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban", permanent: true },
      { source: "/family-tour-murree-himalaya-villas", destination: "/blog/family-tour-murree-himalaya-villas", permanent: true },
      { source: "/thing-to-do-bhurban-murree", destination: "/blog/thing-to-do-bhurban-murree", permanent: true },
      { source: "/thing-to-do-bhurban-murree2", destination: "/blog/thing-to-do-bhurban-murree", permanent: true },
    ];
  },
};

export default nextConfig;
