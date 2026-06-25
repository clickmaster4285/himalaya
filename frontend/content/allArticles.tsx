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

import { articlesBySlugBatch22 } from "./articleSprint22";
import { articlesBySlugBatch23 } from "./articleSprint23";
import { articlesBySlugBatch24 } from "./articleSprint24";
import { articlesBySlugBatch25 } from "./articleSprint25";
import { articlesBySlugBatch26 } from "./articleSprint26";
import { articlesBySlugBatch27 } from "./articleSprint27";
import { articlesBySlugBatch28 } from "./articleSprint28";
import { articlesBySlugBatch29 } from "./articleSprint29";
import { articlesBySlugBatch30 } from "./articleSprint30";

import { articlesBySlugBatch31 } from "./articleSprint31";
import { articlesBySlugBatch32 } from "./articleSprint32";
import { articlesBySlugBatch33 } from "./articleSprint33";
import { articlesBySlugBatch34 } from "./articleSprint34";
import { articlesBySlugBatch35 } from "./articleSprint35";
import { articlesBySlugBatch36 } from "./articleSprint36";
import { articlesBySlugBatch37 } from "./articleSprint37";
import { articlesBySlugBatch38 } from "./articleSprint38";
import { articlesBySlugBatch39 } from "./articleSprint39";
import { articlesBySlugBatch40 } from "./articleSprint40";
import { articlesBySlugBatch41 } from "./articleSprint41";
import { articlesBySlugBatch42 } from "./articleSprint42";
import { articlesBySlugBatch43 } from "./articleSprint43";
import { articlesBySlugBatch44 } from "./articleSprint44";
import { articlesBySlugBatch45 } from "./articleSprint45";
import { articlesBySlugBatch46 } from "./articleSprint46";
import { articlesBySlugBatch47 } from "./articleSprint47";
import { articlesBySlugBatch48 } from "./articleSprint48";

import { articlesBySlugBatch49 } from "./articleSprint49";
import { articlesBySlugBatch50 } from "./articleSprint50";
import { articlesBySlugBatch51 } from "./articleSprint51";
 import { articlesBySlugBatch52 } from "./articles-batch52";



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
  ...articlesBySlugBatch22,
  ...articlesBySlugBatch23,
  ...articlesBySlugBatch24,
  ...articlesBySlugBatch25,
  ...articlesBySlugBatch26,
  ...articlesBySlugBatch27,
  ...articlesBySlugBatch28,
  ...articlesBySlugBatch29,
  ...articlesBySlugBatch30,

  ...articlesBySlugBatch31,
  ...articlesBySlugBatch32,
  ...articlesBySlugBatch33,
  ...articlesBySlugBatch34,
  ...articlesBySlugBatch35,
  ...articlesBySlugBatch36,
  ...articlesBySlugBatch37,
  ...articlesBySlugBatch38,
  ...articlesBySlugBatch39,
  ...articlesBySlugBatch40,
  ...articlesBySlugBatch41,
    ...articlesBySlugBatch42,
  ...articlesBySlugBatch43,
    ...articlesBySlugBatch44,
  ...articlesBySlugBatch45,

    ...articlesBySlugBatch46,
    ...articlesBySlugBatch47,
  ...articlesBySlugBatch48,


      ...articlesBySlugBatch49,
    ...articlesBySlugBatch50,
  ...articlesBySlugBatch51,
  
  ...articlesBySlugBatch52,
};

// helper for Next.js static generation
export const allSlugs = Object.keys(articlesBySlug);

// optional helper
export const allArticles = Object.values(articlesBySlug);