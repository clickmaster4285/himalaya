import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteOrigin();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/api/", "/login", "/signup"] },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site.replace(/^https:\/\//, ""),
  };
}
