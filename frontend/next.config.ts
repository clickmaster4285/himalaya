import path from "path";
import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import { securityHeaders } from "./lib/security-headers";

const cwd = process.cwd();
const repoRoot =
  path.basename(cwd).toLowerCase() === "frontend" ? path.resolve(cwd, "..") : cwd;

loadEnvConfig(repoRoot);
loadEnvConfig(cwd);

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose", "bcryptjs"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    domains: ["picsum.photos"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/villas-in-bhurban-murree",
        destination: "/blog/why-villas-are-the-ultimate-luxury-stays-in-bhurban",
        permanent: true,
      },
      { source: "/booking", destination: "/book", permanent: true },
      { source: "/book-now", destination: "/book", permanent: true },
      { source: "/journal", destination: "/blogs", permanent: true },
      { source: "/luxury-hotels-in-muree", destination: "/luxury-hotels-in-murree", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/packages", destination: "/murree-hotel-packages", permanent: true },
      { source: "/rooms-villas", destination: "/villas", permanent: true },
      {
        source: "/why-villas-are-the-ultimate-luxury-stays-in-bhurban",
        destination: "/blog/why-villas-are-the-ultimate-luxury-stays-in-bhurban",
        permanent: true,
      },
      {
        source: "/Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban",
        destination: "/blog/why-villas-are-the-ultimate-luxury-stays-in-bhurban",
        permanent: true,
      },
      { source: "/family-tour-murree-himalaya-villas", destination: "/blog/family-tour-murree-himalaya-villas", permanent: true },
      { source: "/thing-to-do-bhurban-murree", destination: "/blog/thing-to-do-bhurban-murree", permanent: true },
      { source: "/thing-to-do-bhurban-murree2", destination: "/blog/thing-to-do-bhurban-murree", permanent: true },
      { source: "/adventure-games/", destination: "/adventure-games", permanent: true },
      { source: "/meetings-events/", destination: "/meetings-events", permanent: true },
      { source: "/meetings-events-2", destination: "/meetings-events", permanent: true },
      { source: "/meetings-events-2/", destination: "/meetings-events", permanent: true },
      { source: "/weather-forecast/", destination: "/weather-forecast", permanent: true },
      { source: "/weddings-celebrations/", destination: "/weddings-celebrations", permanent: true },
      { source: "/weddings/nikah/", destination: "/weddings/nikah", permanent: true },
    ];
  },
};

export default nextConfig;
