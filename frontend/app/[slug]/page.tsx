import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

import ArticleClient from "./ArticleClient";
import { articlesBySlug, allSlugs } from "@/content/allArticles";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { RelatedGuides } from "@/components/seo/RelatedGuides";
import { GUIDE_TOPICS, guideHubPath, guideTopicFor, relatedGuidesFor } from "@/lib/guides";

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
    authorName: article.author,
    publishedTime: article.lastReviewed,
    modifiedTime: article.lastReviewed,
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

  const topicId = guideTopicFor(slugKey);
  const topic = GUIDE_TOPICS.find((item) => item.id === topicId)!;

  return (
    <ArticleClient article={article}>
      <RelatedGuides
        guides={relatedGuidesFor(slugKey)}
        hub={{ href: guideHubPath(topicId), title: topic.title }}
      />
    </ArticleClient>
  );
}