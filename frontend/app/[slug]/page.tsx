import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

import ArticleClient from "./ArticleClient";
import { articlesBySlug, allSlugs } from "@/content/allArticles";
import { createPageMetadata } from "@/lib/seo/build-metadata";

type PageProps = {
  params: Promise<{
    slug?: string | string[];
  }>;
};

function getSlugKey(params: { slug?: string | string[] } | undefined): string {
  const slug = params?.slug;
  if (Array.isArray(slug)) return slug.join("/");
  if (typeof slug === "string") return slug;
  return "";
}

// ============================================
// STATIC PARAMS
// ============================================
export async function generateStaticParams() {
  return allSlugs.map((slug) => ({
    slug,
  }));
}

// ============================================
// SEO METADATA
// ============================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const slugKey = getSlugKey(awaitedParams);

  const article = articlesBySlug[slugKey];

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return createPageMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/${slugKey}`,
    keywords: article.keywords?.split(",").map((k) => k.trim()).filter(Boolean),
    ogImage: article.heroImage,
    ogType: "article",
    appendSiteBrand: false,
  });
}

// ============================================
// PAGE COMPONENT
// ============================================
export default function ArticlePage({ params }: PageProps) {
  const awaitedParams = use(params);
  const slugKey = getSlugKey(awaitedParams);

  const article = articlesBySlug[slugKey];

  if (!article) notFound();

  return <ArticleClient article={article} />;
}