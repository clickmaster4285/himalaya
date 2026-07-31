import { getSiteOrigin } from "@/lib/seo/site-config";
import fs from "fs";
import path from "path";

const DEFAULT_LASTMOD = "2026-07-31";

export const revalidate = 300;

// Paths to exclude (these have their own sitemaps or shouldn't be indexed)
const EXCLUDED_PATHS = new Set([
  "/villas",
  "/book",
  "/blogs",
  "/events",
  "/api",
  "/admin",
  "/manager",
  "/user",
  "/login",
  "/signup",
  "/dashboard",
]);

// File patterns to ignore
const IGNORED_FILES = new Set([
  "layout.tsx",
  "layout.jsx",
  "layout.ts",
  "layout.js",
  "loading.tsx",
  "loading.jsx",
  "error.tsx",
  "error.jsx",
  "head.tsx",
  "head.jsx",
  "not-found.tsx",
  "not-found.jsx",
  "globals.css",
  "route.ts",
  "route.js",
  "robots.ts",
  "robots.js",
  "favicon.ico",
]);

// Dynamic route patterns to ignore (catch-all routes)
function isDynamicRoute(segment: string): boolean {
  return segment.startsWith("[") && segment.endsWith("]");
}

function getAllPages(
  dir: string, 
  basePath: string = "",
  excludedPaths: Set<string>
): string[] {
  const pages: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return pages;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Check if current directory has a page file
  const hasPageFile = entries.some(
    (e) => 
      e.isFile() && 
      (e.name === "page.tsx" || e.name === "page.jsx" || e.name === "page.js" || e.name === "page.ts")
  );

  // If this directory has a page file and is not the root
  if (hasPageFile && basePath !== "") {
    // Check if this path should be excluded
    const pathSegments = basePath.split("/").filter(Boolean);
    const firstSegment = pathSegments[0] || "";
    
    // Skip if first segment is in excluded paths or starts with (dashboard)
    if (!excludedPaths.has("/" + firstSegment) && !firstSegment.startsWith("(")) {
      // Check if any segment is dynamic
      const hasDynamicSegment = pathSegments.some(seg => isDynamicRoute(seg));
      
      // If it's the root [slug] route, we'll handle it separately with generateStaticParams
      // Don't add the [slug] route itself, it will be handled by the dynamic slugs below
      if (!hasDynamicSegment) {
        pages.push(basePath);
      }
    }
  }

  // Special handling for [slug] route at root - get all article slugs dynamically
  const slugDir = path.join(dir, "[slug]");
  if (fs.existsSync(slugDir) && fs.existsSync(path.join(slugDir, "page.tsx"))) {
    try {
      // Import the articles data to get all slugs
      const { allSlugs } = require("@/content/allArticles");
      if (allSlugs && Array.isArray(allSlugs)) {
        for (const slug of allSlugs) {
          // Skip if this slug is in excluded paths or starts with (dashboard)
          const firstSegment = slug.split("/")[0];
          if (!excludedPaths.has("/" + firstSegment) && !firstSegment.startsWith("(")) {
            pages.push("/" + slug);
          }
        }
      }
    } catch (error) {
      console.error("Error loading article slugs:", error);
    }
  }

  // Recursively process subdirectories
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    if (entry.name === "api") continue;
    
    // Skip if this directory is in excluded paths or starts with (dashboard)
    const firstSegment = entry.name;
    if (excludedPaths.has("/" + firstSegment) || firstSegment.startsWith("(")) continue;

    const newPath = basePath === "" ? "/" + entry.name : basePath + "/" + entry.name;
    
    // Skip dynamic routes (except [slug] which we handle above)
    if (isDynamicRoute(entry.name) && entry.name !== "[slug]") continue;

    const subPages = getAllPages(
      path.join(dir, entry.name),
      newPath,
      excludedPaths
    );
    pages.push(...subPages);
  }

  return pages;
}

export async function GET() {
  const origin = getSiteOrigin();
  
  // Get all pages from the app directory
  const appDir = path.join(process.cwd(), "app");
  const allPages = getAllPages(appDir, "", EXCLUDED_PATHS);

  // Remove duplicates and sort
  const uniquePages = [...new Set(allPages)].sort();

  // Generate priority and changefreq based on path
  const getPriority = (path: string): number => {
    if (path === "/") return 1.0;
    if (path === "/experience") return 0.9;
    if (path === "/contact") return 0.85;
    if (path === "/faqs") return 0.8;
    if (path.startsWith("/weddings")) return 0.8;
    if (path.startsWith("/corporate")) return 0.8;
    if (path.startsWith("/family-celebrations")) return 0.8;
    if (path.startsWith("/music")) return 0.75;
    if (path.startsWith("/experiences")) return 0.8;
    if (path.startsWith("/dining")) return 0.8;
    if (path.startsWith("/virtual-tour")) return 0.75;
    return 0.7;
  };

  const getChangeFrequency = (path: string): string => {
    if (path === "/") return "daily";
    if (path === "/experience") return "weekly";
    if (path.startsWith("/weddings")) return "weekly";
    if (path.startsWith("/corporate")) return "monthly";
    if (path.startsWith("/family-celebrations")) return "monthly";
    if (path.startsWith("/music")) return "monthly";
    if (path.startsWith("/experiences")) return "weekly";
    if (path.startsWith("/contact")) return "monthly";
    if (path.startsWith("/faqs")) return "monthly";
    return "monthly";
  };

  const entries = uniquePages.map((path) => {
    const priority = getPriority(path);
    const changeFrequency = getChangeFrequency(path);
    
    return `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${DEFAULT_LASTMOD}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}