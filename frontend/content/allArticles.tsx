// src/content/articles/index.ts

import type { Article } from "@/content/types";
import { CONTENT_REVIEW } from "@/lib/seo/intent-canonicals";

import { articlesBySlugBatch1 } from "./articles-batch1";

const REVIEWED_SLUGS = new Set([
  "things-to-do-in-murree",
  "murree-bhurban-itinerary",
  "bhurban-murree-all-distances",
  "pc-hotel-bhurban-alternative",
  "patriata-chairlift-bhurban",
]);

function stripGuideYear(value: string): string {
  return value
    .replace(/\s*\(?\b20(?:1\d|2[0-6])\b\)?/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.:;!?])/g, "$1")
    .replace(/([—–-])\s*$/, "")
    .trim();
}

/**
 * HIM-CONTENT-0008: no page carries a live feed, so no title, H1 or description may claim one.
 */
function stripLiveClaim(value: string): string {
  return value
    .replace(/\blive\s+(?=(?:weather|check|conditions|reference|updates?|data|feed|temperature|forecast|sources|snow))/gi, "")
    .replace(/\b(weather|snowfall|temperature)\s+live\b/gi, "$1")
    .replace(/\breal[- ]time\s+/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function cleanHeading(value: string): string {
  return stripLiveClaim(stripGuideYear(value));
}

function publishArticle(article: Article): Article {
  const next: Article = {
    ...article,
    title: cleanHeading(article.title),
    h1: cleanHeading(article.h1),
    metaDescription: stripLiveClaim(article.metaDescription),
  };

  if (article.slug === "murree-wedding-cost-guide") {
    next.title = "Murree and Bhurban Wedding Cost Guide";
    next.metaDescription =
      "What a destination wedding in Murree or Bhurban costs, from estate buyout and functions to catering. A budgeting guide from Himalaya Villas.";
  }

  if (article.slug === "things-to-do-in-murree") {
    next.title = "Things to Do in Murree";
    next.h1 = "Things to Do in Murree and Bhurban";
  }

  if (REVIEWED_SLUGS.has(article.slug)) {
    next.author = CONTENT_REVIEW.author;
    next.reviewer = CONTENT_REVIEW.reviewer;
    next.lastReviewed = CONTENT_REVIEW.lastReviewedIso;
  }

  return next;
}

export const articlesBySlug: Record<string, Article> = Object.fromEntries(
  Object.entries(articlesBySlugBatch1).map(([slug, article]) => [slug, publishArticle(article)]),
);

// helper for Next.js static generation
export const allSlugs = Object.keys(articlesBySlug);

// optional helper
export const allArticles = Object.values(articlesBySlug);