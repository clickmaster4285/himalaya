import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

import ArticleClient from "./ArticleClient";
import { articlesBySlug, allSlugs } from "@/content/allArticles";

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
// STATIC PARAMS (ALL SLUGS)
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

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      images: [article.heroImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.heroImage],
    },
  };
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