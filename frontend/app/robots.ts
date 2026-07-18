import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/api/",
          "/superadmin",
          " /admin",
        ],
      },
    ],
    sitemap: "https://himalayavillas.com/sitemap_index.xml",
  };
}