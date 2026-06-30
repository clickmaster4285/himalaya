// src/content/articles/index.ts

import type { Article } from "@/content/types";

import { articlesBySlugBatch1 } from "./articles-batch1";




// merge both batches
export const articlesBySlug: Record<string, Article> = {
  ...articlesBySlugBatch1,
  
  
};

// helper for Next.js static generation
export const allSlugs = Object.keys(articlesBySlug);

// optional helper
export const allArticles = Object.values(articlesBySlug);