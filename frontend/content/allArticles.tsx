// src/content/articles/index.ts

import type { Article } from "@/content/types";

import { articlesBySlugBatch1 } from "./articleSprint1";
import { articlesBySlugBatch2 } from "./articleSprint2";
import { articlesBySlugBatch3 } from "./articleSprint3";
import { articlesBySlugBatch4 } from "./articleSprint4";
import { articlesBySlugBatch5 } from "./articleSprint5";
import { articlesBySlugBatch6 } from "./articleSprint6";
import { articlesBySlugBatch7 } from "./articleSprint7";
import { articlesBySlugBatch8 } from "./articleSprint8";
import { articlesBySlugBatch9 } from "./articleSprint9";
import { articlesBySlugBatch10 } from "./articleSprint10";
import { articlesBySlugBatch11 } from "./articleSprint11";
import { articlesBySlugBatch12 } from "./articleSprint12";
import { articlesBySlugBatch13 } from "./articleSprint13";
import { articlesBySlugBatch14 } from "./articleSprint14";
import { articlesBySlugBatch15 } from "./articleSprint15";
import { articlesBySlugBatch16 } from "./articleSprint16";

import { articlesBySlugBatch17 } from "./articleSprint17";
import { articlesBySlugBatch18 } from "./articleSprint18";
import { articlesBySlugBatch19 } from "./articleSprint19";
import { articlesBySlugBatch20 } from "./articleSprint20";
import { articlesBySlugBatch21 } from "./articleSprint21";


// merge both batches
export const articlesBySlug: Record<string, Article> = {
  ...articlesBySlugBatch1,
  ...articlesBySlugBatch2,
  ...articlesBySlugBatch3,
  ...articlesBySlugBatch4,
  ...articlesBySlugBatch5,
  ...articlesBySlugBatch6,
  ...articlesBySlugBatch7,
  ...articlesBySlugBatch8,
  ...articlesBySlugBatch9,
  ...articlesBySlugBatch10,
  ...articlesBySlugBatch11,
  ...articlesBySlugBatch12,
  ...articlesBySlugBatch13,
  ...articlesBySlugBatch14,
   ...articlesBySlugBatch15,
  ...articlesBySlugBatch16,
  ...articlesBySlugBatch17,
  ...articlesBySlugBatch18,
  ...articlesBySlugBatch19,
  ...articlesBySlugBatch20,
  ...articlesBySlugBatch21,

};

// helper for Next.js static generation
export const allSlugs = Object.keys(articlesBySlug);

// optional helper
export const allArticles = Object.values(articlesBySlug);