import path from "path";
import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import { intentRedirects } from "./lib/seo/intent-canonicals";
import { legacyRedirects, legacyRedirects301 } from "./lib/seo/legacy-redirects";

const cwd = process.cwd();
const repoRoot =
  path.basename(cwd).toLowerCase() === "frontend" ? path.resolve(cwd, "..") : cwd;

// Merge env so server/RSC see JWT_SECRET from backend or repo root (frontend/.env* can override).
loadEnvConfig(path.join(repoRoot, "Backend"));
loadEnvConfig(path.join(repoRoot, "backend"));
loadEnvConfig(repoRoot);
loadEnvConfig(cwd);

const backend = (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");

/** HIM-TECH-0010: transport and referrer headers on every response. */
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

/**
 * /erp-preview is framed by the ERP page editor, so it gets no X-Frame-Options;
 * middleware.ts sends `Content-Security-Policy: frame-ancestors 'self' <ERP_ADMIN_ORIGINS>`
 * at runtime instead. no-referrer keeps the preview token out of Referer headers.
 */
const ERP_PREVIEW_HEADERS = [
  ...SECURITY_HEADERS.filter((h) => h.key !== "X-Frame-Options" && h.key !== "Referrer-Policy"),
  { key: "Referrer-Policy", value: "no-referrer" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Turbopack resolves CSS imports from the monorepo root — hoist deps via root workspaces.
  turbopack: {
    root: repoRoot,
  },
  outputFileTracingRoot: repoRoot,
  experimental: {
    // Next.js 16 proxy truncates multipart bodies above ~1MB without this (breaks iPhone photos).
    proxyClientMaxBodySize: "15mb",
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/upload",
          destination: `${backend}/api/upload`,
        },
      ],
      afterFiles: [
        {
          source: "/uploads/:path*",
          destination: `${backend}/uploads/:path*`,
        },
      ],
    };
  },
  async headers() {
    return [
      // Every route except /erp-preview keeps the site's framing protection.
      { source: "/:path((?!erp-preview$).*)", headers: SECURITY_HEADERS },
      { source: "/erp-preview", headers: ERP_PREVIEW_HEADERS },
    ];
  },
  async redirects() {
    return [
      ...legacyRedirects301,
      // "/blog" itself (app/blog/page.tsx) and "/blog/..." (app/blog/[...path])
      // redirect to /blogs unless the ERP CMS has a page at that path.
      ...legacyRedirects,
      ...intentRedirects,
    ];
  },
};

export default nextConfig;
