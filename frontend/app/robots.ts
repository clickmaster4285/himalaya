import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/superadmin",
        ],
      },
    ],
    sitemap: "https://himalayavillas.com/sitemap_index.xml",
  };
}