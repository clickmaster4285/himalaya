import type { VillaBlogPost } from "@/lib/villa-blog-posts";
import { blogCanonicalPath } from "@/lib/blog-posts";
import { absoluteUrl, getSiteOrigin } from "@/lib/seo/site-config";
import type { JsonLdScript } from "@/lib/seo/himalaya-schema";

export function buildBlogPostingJsonLd(post: VillaBlogPost): JsonLdScript {
  const origin = getSiteOrigin();
  const url = absoluteUrl(blogCanonicalPath(post.slug));

  return {
    id: `hv-jsonld-blog-${post.slug}`,
    data: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      image: [absoluteUrl(post.coverImage)],
      url,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      author: {
        "@type": "Organization",
        name: "Himalaya Premium Villas",
        url: `${origin}/`,
      },
      publisher: {
        "@type": "Organization",
        name: "Himalaya Premium Villas",
        url: `${origin}/`,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/assets/himalaya-logo.png"),
        },
      },
    },
  };
}
