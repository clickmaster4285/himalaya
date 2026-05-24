import type { EventCtaButton } from "@/components/EventCtaStrip";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

/** Target SEO phrases — each must appear ≥8 times per event page (via booster sections). */
export const EVENT_SEO_KEYWORDS = [
  "hotel in bhurban",
  "bhurban hotel murree",
  "bhurban hotels",
  "best hotel in bhurban",
  "resort in bhurban",
  "best hotels in bhurban murree",
  "bhurban best hotels",
  "villas in bhurban murree",
] as const;

export type EventInfoCard = {
  title: string;
  description: string;
};

export type EventContentSection = {
  title: string;
  paragraphs?: string[];
  cards?: EventInfoCard[];
};

function keywordCardDescription(
  eventTitle: string,
  keyword: (typeof EVENT_SEO_KEYWORDS)[number]
): string {
  const others = EVENT_SEO_KEYWORDS.filter((k) => k !== keyword);
  return `Planning ${eventTitle}? Compare any ${keyword} with our private estate — more space than a typical ${others[0]}, and clearer packages than most ${others[1]} listings. Message us on WhatsApp for dates.`;
}

/** One card grid section — 8 keywords as scannable cards (not long paragraphs). */
export function buildEventKeywordSections(eventTitle: string): EventContentSection[] {
  return [
    {
      title: `Bhurban Murree stay guide for ${eventTitle}`,
      cards: EVENT_SEO_KEYWORDS.map((keyword) => ({
        title: keyword.replace(/\b\w/g, (c) => c.toUpperCase()),
        description: keywordCardDescription(eventTitle, keyword),
      })),
    },
  ];
}

export function buildEventKeywordFaqs(eventTitle: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `Can we host ${eventTitle} if we are only comparing a hotel in bhurban?`,
      answer:
        `Yes. Share your dates and guest count — we explain how a private estate compares with any hotel in bhurban, bhurban hotel murree rooms, and crowded bhurban hotels. Most groups choose villas in bhurban murree after one site visit.`,
    },
    {
      question: `How does ${eventTitle} here compare with the best hotel in bhurban?`,
      answer:
        `You receive estate-wide privacy, flexible meal timing, and dedicated coordination — benefits people associate with the best hotel in bhurban and best hotels in bhurban murree lists, without shared lobbies. bhurban best hotels blogs rarely mention full-property hire; we specialise in it.`,
    },
    {
      question: `Is a resort in bhurban style booking available for ${eventTitle}?`,
      answer:
        `Yes — full-estate or multi-villa arrangements work like a resort in bhurban private hire: your group, your schedule, your catering. Pair ${eventTitle} with guided trails, adventure, or bonfire add-ons on the same booking thread.`,
    },
  ];
}

export function buildDefaultEventHeroCtas(eventTitle: string): EventCtaButton[] {
  const url = buildWhatsAppBookingUrl(`${eventTitle} at Himalaya Premium Villas in Bhurban Murree`);
  return [
    {
      label: "Book villas in bhurban murree — WhatsApp",
      href: url,
      external: true,
      variant: "primary",
    },
    {
      label: "Best hotel in bhurban — enquire rates",
      href: url,
      external: true,
      variant: "whatsapp",
    },
    {
      label: "Compare bhurban hotels guide",
      href: "/hotels-in-bhurban",
      variant: "outline",
    },
  ];
}

export function buildDefaultEventCtaBlocks(eventTitle: string): Array<{
  title?: string;
  subtitle?: string;
  buttons: EventCtaButton[];
}> {
  const url = buildWhatsAppBookingUrl(`${eventTitle} at Himalaya Premium Villas`);
  return [
    {
      title: `Planning ${eventTitle} beyond bhurban hotels?`,
      subtitle:
        "Message us with dates and guest count — we reply with estate availability and a clear package outline.",
      buttons: [
        {
          label: "WhatsApp: bhurban hotel murree alternative",
          href: url,
          external: true,
          variant: "whatsapp",
        },
        { label: "Book your stay online", href: "/book/stay", variant: "primary" },
      ],
    },
    {
      title: "Want best hotels in bhurban murree service — privately?",
      subtitle: "Reserve villas in bhurban murree or full estate for your programme.",
      buttons: [
        {
          label: "Reserve best hotel in bhurban style estate",
          href: url,
          external: true,
          variant: "primary",
        },
        { label: "View villas", href: "/villas", variant: "outline" },
      ],
    },
    {
      title: "Comparing resort in bhurban options?",
      buttons: [
        {
          label: "Ask resort in bhurban private hire",
          href: url,
          external: true,
          variant: "whatsapp",
        },
        {
          label: "hotel in bhurban comparison page",
          href: "/hotels-in-bhurban",
          variant: "outline",
        },
      ],
    },
  ];
}

export type EventDetailShape = {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  category: string;
  faqs: Array<{ question: string; answer: string }>;
  contentSections?: EventContentSection[];
  heroCtas?: EventCtaButton[];
  ctaBlocks?: Array<{
    title?: string;
    subtitle?: string;
    buttons: EventCtaButton[];
  }>;
};

/** Merge keyword booster (8 sections) + default CTAs/FAQs onto every event record. */
export function enrichEventWithSeoKeywords(event: EventDetailShape): EventDetailShape {
  const booster = buildEventKeywordSections(event.title);
  const existing = event.contentSections ?? [];
  const extraFaqs = buildEventKeywordFaqs(event.title);

  return {
    ...event,
    description: weaveKeywordsIntoDescription(event.description, event.title),
    longDescription: weaveKeywordsIntoLongDescription(event.longDescription, event.title),
    contentSections: [...existing, ...booster],
    heroCtas: event.heroCtas ?? buildDefaultEventHeroCtas(event.title),
    ctaBlocks: event.ctaBlocks ?? buildDefaultEventCtaBlocks(event.title),
    faqs: [...event.faqs, ...extraFaqs],
  };
}

function weaveKeywordsIntoDescription(description: string, eventTitle: string): string {
  if (EVENT_SEO_KEYWORDS.every((k) => description.toLowerCase().includes(k))) {
    return description;
  }
  return `${description} Plan ${eventTitle} at Himalaya Premium Villas — private alternative to hotel in bhurban, bhurban hotel murree rooms, and typical bhurban hotels, with villas in bhurban murree and resort in bhurban style privacy.`;
}

function weaveKeywordsIntoLongDescription(long: string, eventTitle: string): string {
  if (long.length > 900 && EVENT_SEO_KEYWORDS.every((k) => long.toLowerCase().includes(k))) {
    return long;
  }
  return `${long} Guests comparing the best hotel in bhurban, best hotels in bhurban murree lists, and bhurban best hotels blogs choose our estate for ${eventTitle} because timelines, catering, and outdoor space stay under one team — not split across a bhurban hotel murree floor plan.`;
}

export const DEFAULT_EVENT_META_KEYWORDS: string[] = [
  ...EVENT_SEO_KEYWORDS,
  "Himalaya Villas Bhurban Murree",
  "private events Murree Hills",
];
