/**
 * HIM-ARCH-0001: every retained root guide belongs to one hub, and every hub is linked from the
 * main navigation and the footer. Guides that redirect to an intent survivor are left out.
 */
import { allArticles } from "@/content/allArticles";
import { isRedirectedDuplicate } from "@/lib/seo/intent-canonicals";

export type GuideTopicId = "plan-your-trip" | "weather-and-seasons" | "getting-here" | "events-and-celebrations" | "stays";

export type GuideTopic = {
  id: GuideTopicId;
  title: string;
  intro: string;
};

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "plan-your-trip",
    title: "Plan Your Trip",
    intro: "Things to do, places to see, food, itineraries and practical advice for Murree, Bhurban and the Galyat.",
  },
  {
    id: "weather-and-seasons",
    title: "Weather and Seasons",
    intro: "What each month is like in the Murree Hills, when snow falls, and how to plan around the monsoon.",
  },
  {
    id: "getting-here",
    title: "Getting Here",
    intro: "Distances, drive times and routes to Bhurban from Islamabad, Rawalpindi, Lahore and further away.",
  },
  {
    id: "events-and-celebrations",
    title: "Events and Celebrations",
    intro: "Weddings, family functions, company offsites and private gatherings in Bhurban and Murree.",
  },
  {
    id: "stays",
    title: "Where to Stay",
    intro: "Hotels, villas and rates in Murree and Bhurban, and how a private villa estate compares.",
  },
];

const RULES: [GuideTopicId, RegExp][] = [
  ["weather-and-seasons", /weather|snow|season|winter|summer|monsoon|spring|autumn|temperature|best-time|climate|fog|rain|january|february|march|april|may-|june|july|august|september|october|november|december/],
  ["getting-here", /distance|-from-|^from-|-to-murree|-to-bhurban|islamabad-to|lahore-to|route|road|drive|reach|airport|motorway|transport|parking|getting-|how-far|travel-time|bhurban-for-(?:lahore|rawalpindi|faisalabad|karachi|multan|peshawar|islamabad|sialkot|gujranwala|quetta)/],
  ["events-and-celebrations", /wedding|mehndi|nikkah|nikah|walima|valima|barat|baraat|dholki|event|corporate|offsite|retreat|party|birthday|anniversary|proposal|conference|meeting|music|qawwali|concert|eid|ramadan|celebration|function|engagement|honeymoon|venue|shower|gathering|reunion|graduation|team-building/],
  ["stays", /hotel|resort|villa|stay|accommodation|room|booking|book-|guest-house|guesthouse|cottage|apartment|price|rate|package|pc-|alternative|luxury|budget|lodge|holiday-home|rent/],
];

export function guideTopicFor(slug: string): GuideTopicId {
  for (const [id, re] of RULES) if (re.test(slug)) return id;
  return "plan-your-trip";
}

export type GuideLink = { slug: string; href: string; title: string; topic: GuideTopicId };

function cleanTitle(title: string): string {
  return title.replace(/\s*[|]\s*Himalaya Villas.*$/i, "").trim();
}

/** Retained guides, grouped by topic, sorted by title for a stable order. */
export const GUIDES: GuideLink[] = allArticles
  .filter((article) => !isRedirectedDuplicate(`/${article.slug}`))
  .map((article) => ({
    slug: article.slug,
    href: `/${article.slug}`,
    title: cleanTitle(article.h1 || article.title),
    topic: guideTopicFor(article.slug),
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

export const GUIDES_BY_TOPIC: Record<GuideTopicId, GuideLink[]> = GUIDE_TOPICS.reduce(
  (acc, topic) => {
    acc[topic.id] = GUIDES.filter((guide) => guide.topic === topic.id);
    return acc;
  },
  {} as Record<GuideTopicId, GuideLink[]>,
);

export function guideTopic(id: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((topic) => topic.id === id);
}

export function guideHubPath(id: GuideTopicId): string {
  return `/guides/${id}`;
}

/**
 * Sibling guides for a guide page: the next and previous guides in the same hub, so every guide
 * receives links from several siblings as well as from its hub.
 */
export function relatedGuidesFor(slug: string, count = 6): GuideLink[] {
  const topic = guideTopicFor(slug);
  const list = GUIDES_BY_TOPIC[topic];
  const index = list.findIndex((guide) => guide.slug === slug);
  if (index === -1 || list.length < 2) return list.filter((guide) => guide.slug !== slug).slice(0, count);
  const picked: GuideLink[] = [];
  for (let step = 1; picked.length < count && step < list.length; step++) {
    const forward = list[(index + step) % list.length];
    const back = list[(index - step + list.length) % list.length];
    if (!picked.includes(forward) && forward.slug !== slug) picked.push(forward);
    if (picked.length < count && !picked.includes(back) && back.slug !== slug) picked.push(back);
  }
  return picked;
}

/** A stable pick of guides from one or more hubs for templates that are not guides (villa, event, blog). */
export function featuredGuides(topics: GuideTopicId[], seed: string, count = 6): GuideLink[] {
  const pool = topics.flatMap((topic) => GUIDES_BY_TOPIC[topic]);
  if (pool.length <= count) return pool;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const stride = Math.max(1, Math.floor(pool.length / count));
  return Array.from({ length: count }, (_, i) => pool[(hash + i * stride) % pool.length]);
}
