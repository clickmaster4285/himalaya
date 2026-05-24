import fs from "node:fs";
import path from "node:path";

const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js"]);

/** App Router folders that must never appear in the public sitemap. */
const EXCLUDED_SEGMENTS = new Set([
  "api",
  "dashboard",
  "login",
  "signup",
]);

/** Extra paths to omit (utility / internal screens). */
const EXCLUDED_PATHS = new Set(["/show-card", "/premium-page"]);

function isDynamicSegment(name: string): boolean {
  return name.includes("[") && name.includes("]");
}

function isRouteGroup(name: string): boolean {
  return name.startsWith("(") && name.endsWith(")");
}

function segmentsToPath(segments: string[]): string | null {
  const parts = segments.filter((s) => !isRouteGroup(s) && !isDynamicSegment(s));
  if (parts.length === 0) return "/";
  return `/${parts.join("/")}`;
}

function shouldSkipDirectory(segment: string): boolean {
  if (segment.startsWith("_")) return true;
  if (isDynamicSegment(segment)) return true;
  if (EXCLUDED_SEGMENTS.has(segment)) return true;
  return false;
}

// Discovers indexable routes from app/**/page files at build/request time.
// Dynamic [slug] routes are skipped here and added via slug providers.
export function discoverAppDirectoryRoutes(appDir = path.join(process.cwd(), "app")): string[] {
  if (!fs.existsSync(appDir)) return [];

  const routes: string[] = [];

  function walk(dir: string, segments: string[]) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    const hasPage = entries.some((e) => e.isFile() && PAGE_FILES.has(e.name));
    if (hasPage) {
      const routePath = segmentsToPath(segments);
      if (routePath && !EXCLUDED_PATHS.has(routePath)) {
        routes.push(routePath);
      }
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (shouldSkipDirectory(entry.name)) continue;
      walk(path.join(dir, entry.name), [...segments, entry.name]);
    }
  }

  walk(appDir, []);
  return [...new Set(routes)].sort((a, b) => a.localeCompare(b));
}
