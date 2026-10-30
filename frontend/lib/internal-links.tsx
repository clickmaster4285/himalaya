import Link from "next/link";
import type { ReactNode, Key } from "react";
import { buildWhatsAppBookingUrl } from "./whatsapp";

/* ------------------------------------------------------------------ */
/* 1. Link map                                                         */
/* ------------------------------------------------------------------ */

export type InternalLink = {
  /** Exact phrase as it appears in content. Matched case-insensitively. */
  text: string;
  href: string;
  /** Optional: only apply on these post slugs. Omit = apply everywhere. */
  slugs?: string[];
  /** Optional: skip linking when current post slug matches any of these. */
  excludeSlugs?: string[];
};

export const INTERNAL_LINKS: InternalLink[] = [
  { text: "check availability at Himalaya Villas & Resort", href: "https://himalayavillas.com/contact" },
  { text: "Islamabad to Bhurban transport guide", href: "https://himalayavillas.com/islamabad-to-bhurban-guide" },
  { text: "family stay in Murree", href: "https://himalayavillas.com/blogs/what-makes-a-resort-family-friendly-in-murree" },
  { text: "best villas in Murree", href: "https://himalayavillas.com/villas" },
  { text: "Private Villas in Murree", href: "https://himalayavillas.com/villas" },
  { text: "best resort in Murree", href: "https://himalayavillas.com/blogs/resorts-in-murree-for-couples" },
  { text: "Himalaya Villas & Resort", href: "https://himalayavillas.com/villas" },
  { text: "villas in Murree", href: "https://himalayavillas.com/villas" },
  { text: "hotels in Murree", href: "https://himalayavillas.com/" },
  { text: "Murree for couples", href: "https://himalayavillas.com/murree-for-couples" },
  { text: "Murree's Mall Road", href: "https://himalayavillas.com/murree-mall-road-guide" },
  { text: "Kashmir Point", href: "https://himalayavillas.com/kashmir-point-murree-guide" },
  { text: "PC Hotel Bhurban", href: "https://himalayavillas.com/pc-hotel-bhurban-alternative" },
  { text: "Rates in Murree", href: "https://himalayavillas.com/pc-bhurban-rates-comparison" },
  { text: "wedding venue", href: "https://himalayavillas.com/wedding-venues-bhurban-murree" },
  { text: "family resort", href: "https://himalayavillas.com/family-villa-bhurban-murree" },
  { text: "Nathia Gali", href: "https://himalayavillas.com/best-hotels-nathia-gali" },
  { text: "summer trip", href: "https://himalayavillas.com/murree-in-summer" },
  { text: "Mall Road", href: "https://himalayavillas.com/murree-mall-road-hotels-guide" },
  { text: "snowfall", href: "https://himalayavillas.com/murree-snowfall-season" },
  { text: "experience", href: "https://himalayavillas.com/experience" },
  { text: "Amenities", href: "https://himalayavillas.com/blogs/amenities-that-matter" },
  { text: "booking", href: "https://himalayavillas.com/murree-hotel-booking-guide" },
  { text: "accommodation", href: "https://himalayavillas.com/bhurban-accommodation-guide" },
  { text: "villas", href: "https://himalayavillas.com/villas" },
  { text: "Explore Villas & Check Latest Prices at Himalaya Villas & Resorts", href: "https://himalayavillas.com/villas" },
   { text: "explore the villas at Himalaya Villas & Resorts", href: "https://himalayavillas.com/villas" },
   {
  text: "Message us on WhatsApp",
  href: buildWhatsAppBookingUrl(),
},
{text: "family accommodation in Murree", href: "https://himalayavillas.com/blogs/family-apartments-murree-booking-guide"},
   {
  text: "accommodation options at Himalaya Villas & Resorts",
  href: "https://himalayavillas.com/villas",
},

{
  text: "Rakaposhi complete villa",
  href: "https://himalayavillas.com/villas/rakaposhi-complete-villa",
},
{
  text: "Hotel prices in Murree",
  href: "https://himalayavillas.com/blogs/hotel-room-rent-in-murree",
},
{
  text: "budget-friendly Murree trip guide",
  href: "https://himalayavillas.com/blogs/budget-friendly-trip-to-murree",
},
{
  text: "family tour in Murree guide",
  href: "https://himalayavillas.com/blogs/family-tour-murree-himalaya-villas",
},
{
  text: "guide to seasons in the hills",
  href: "https://himalayavillas.com/blogs/seasons-in-the-hills",
},
{
  text: "Contact Himalaya Villas & Resorts",
  href: "https://himalayavillas.com/contact",
},
{
  text: "available stay options",
  href: "https://himalayavillas.com/villas",
},
{
  text: "Contact the reservations team",
  href: "https://himalayavillas.com/contact",
},
{
  text: "Murree villa booking guide",
  href: "https://himalayavillas.com/blogs/villas-in-murree-pakistan-booking-guide",
},
{
  text: "review the property's current accommodation details",
  href: "https://himalayavillas.com/villas",
},
{
  text: "currently available room or villa options",
  href: "https://himalayavillas.com/villas",
},
{
  text: "Contact Himalaya Villas & Resorts",
  href: "https://himalayavillas.com/contact",
},
{
  text: "booking in advance",
  href: "https://himalayavillas.com/book",
},
{
  text: "official contact details",
  href: "https://himalayavillas.com/contact",
},
{
  text: "booking channel",
  href: "https://himalayavillas.com/book",
},
{
  text: "explore the villa listings",
  href: "https://himalayavillas.com/villas",
},
{
  text: "guide to places to visit in Murree",
  href: "https://himalayavillas.com/blogs/best-places-to-visit-in-murree",
},
{
  text: "guide to things to do near Bhurban and Murree",
  href: "https://himalayavillas.com/blogs/thing-to-do-bhurban-murree",
},

{
  text: "family accommodation guide for Murree",
  href: "https://himalayavillas.com/blogs/where-to-stay-in-murree-with-family",
},
{
  text: "luxury private villas in Bhurban",
  href: "https://himalayavillas.com/luxury-private-villa-bhurban-murree",
},
{
  text: "Explore the property's current accommodation options",
  href: "https://himalayavillas.com/villas",
},

];

/* ------------------------------------------------------------------ */
/* 2. Config                                                           */
/* ------------------------------------------------------------------ */

export const LINK_CLASSNAME =
  "font-medium text-[#8b6914] underline underline-offset-4 transition-colors hover:text-[#6d5210]";

const MAX_LINKS_PER_PARAGRAPH = 2;
const SITE_HOST = "himalayavillas.com";

/* ------------------------------------------------------------------ */
/* 3. Matching helpers                                                 */
/* ------------------------------------------------------------------ */

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isInternalHref(href: string) {
  if (href.startsWith("/")) return true;
  try {
    return new URL(href).hostname.replace(/^www\./, "") === SITE_HOST;
  } catch {
    return false;
  }
}

/** Normalize a keyword so casing differences don't defeat deduplication. */
function normalizeKey(keyword: string): string {
  return keyword.trim().toLowerCase();
}

type Match = { start: number; end: number; link: InternalLink };

/**
 * Finds up to `max` keyword matches in `text`.
 *
 * If `usedKeywords` is provided:
 *   - Any keyword already in the set is SKIPPED (left as plain text).
 *   - Any keyword linked by this call is ADDED to the set, so later calls
 *     on the same page will skip it.
 */
function findMatches(
  text: string,
  slug: string | undefined,
  max: number,
  usedKeywords?: Set<string>
): Match[] {
  const candidates = INTERNAL_LINKS.filter((l) => {
    if (slug && l.slugs && !l.slugs.includes(slug)) return false;
    if (slug && l.excludeSlugs?.includes(slug)) return false;
    return true;
  }).sort((a, b) => b.text.length - a.text.length); // longest phrase first

  const matches: Match[] = [];

  for (const link of candidates) {
    if (matches.length >= max) break;

    // If this keyword was already linked somewhere on the page, skip it.
    const key = normalizeKey(link.text);
    if (usedKeywords?.has(key)) continue;

    // Word-boundary-aware, case-insensitive match.
    // Prevents "villas" from matching inside "villasite" and
    // "experience" from matching inside "experienced".
    const re = new RegExp(
      `(^|[^A-Za-z0-9])(${escapeRegex(link.text)})(?=[^A-Za-z0-9]|$)`,
      "i"
    );
    const m = re.exec(text);
    if (!m) continue;

    const prefixLen = m[1].length;
    const start = m.index + prefixLen;
    const end = start + m[2].length;

    // Skip if overlapping an earlier match
    if (matches.some((x) => start < x.end && end > x.start)) continue;

    matches.push({ start, end, link });

    // Mark as used for the rest of the page
    usedKeywords?.add(key);
  }

  return matches.sort((a, b) => a.start - b.start);
}

/* ------------------------------------------------------------------ */
/* 4. React renderer (for paragraph text)                              */
/* ------------------------------------------------------------------ */

export function autoLinkParagraph(
  text: string,
  key: Key,
  opts?: {
    slug?: string;
    maxLinks?: number;
    /** "p" (default) for paragraph blocks, "span" for inline (e.g. FAQ answers) */
    wrapper?: "p" | "span";
    /**
     * Page-wide set of keywords already linked. Pass the SAME Set instance
     * to every call on the page so each keyword is linked only ONCE per page.
     */
    usedKeywords?: Set<string>;
  }
): ReactNode {
  const max = opts?.maxLinks ?? MAX_LINKS_PER_PARAGRAPH;
  const matches = findMatches(text, opts?.slug, max, opts?.usedKeywords);

  let children: ReactNode = text;
  if (matches.length > 0) {
    const out: ReactNode[] = [];
    let cursor = 0;
    matches.forEach((m, i) => {
      if (m.start > cursor) out.push(text.slice(cursor, m.start));
      const internal = isInternalHref(m.link.href);
      out.push(
        <Link
          key={`l-${i}`}
          href={m.link.href}
          className={LINK_CLASSNAME}
          {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {text.slice(m.start, m.end)}
        </Link>
      );
      cursor = m.end;
    });
    if (cursor < text.length) out.push(text.slice(cursor));
    children = out;
  }

  const Wrapper = opts?.wrapper ?? "p";
  return <Wrapper key={key}>{children}</Wrapper>;
}

/* ------------------------------------------------------------------ */
/* 5. HTML-string processor (for articleHtml from CMS)                 */
/* ------------------------------------------------------------------ */

/**
 * Post-processes an HTML string, wrapping first occurrence(s) of each
 * internal-link phrase per paragraph in <a> tags. Skips text already
 * inside an <a> tag, inside headings/scripts/styles, and inside
 * attribute values.
 *
 * Pass `usedKeywords` to deduplicate across multiple HTML blocks
 * (e.g. all sections of one article).
 *
 * Usage: render with `dangerouslySetInnerHTML={{ __html: linkedHtml }}`
 */
export function autoLinkHtml(
  html: string,
  opts?: {
    slug?: string;
    maxLinksPerBlock?: number;
    /** Shared set so each keyword is linked only once per page. */
    usedKeywords?: Set<string>;
  }
): string {
  if (!html) return html;
  const max = opts?.maxLinksPerBlock ?? MAX_LINKS_PER_PARAGRAPH;

  // Split into block-level tags we link inside (p, li). Everything else passes through.
  // We deliberately avoid linking inside h1-h6, a, code, pre, script, style.
  const blockTagRe = /(<(p|li)\b[^>]*>)([\s\S]*?)(<\/\2>)/gi;

  return html.replace(blockTagRe, (full, openTag, _tag, inner) => {
    // Skip if inner already contains an anchor
    if (/<a\b/i.test(inner)) return full;
    const linkedInner = autoLinkHtmlFragment(
      inner,
      opts?.slug,
      max,
      opts?.usedKeywords
    );
    return openTag + linkedInner + `</${_tag}>`;
  });
}

function autoLinkHtmlFragment(
  fragment: string,
  slug: string | undefined,
  max: number,
  usedKeywords?: Set<string>
): string {
  // Tokenise fragment into tags and text so we never rewrite tag attributes.
  const tokenRe = /(<[^>]+>)/g;
  const parts = fragment.split(tokenRe);

  let linksPlaced = 0;

  for (let i = 0; i < parts.length; i++) {
    if (linksPlaced >= max) break;
    const part = parts[i];
    if (part.startsWith("<")) continue; // tag token, skip
    if (!part.trim()) continue;

    const matches = findMatches(
      part,
      slug,
      max - linksPlaced,
      usedKeywords
    );
    if (matches.length === 0) continue;

    let cursor = 0;
    let rebuilt = "";
    for (const m of matches) {
      rebuilt += part.slice(cursor, m.start);
      const internal = isInternalHref(m.link.href);
      const extra = internal ? "" : ' target="_blank" rel="noopener noreferrer"';
      rebuilt += `<a href="${m.link.href}" class="${LINK_CLASSNAME}"${extra}>${part.slice(m.start, m.end)}</a>`;
      cursor = m.end;
    }
    rebuilt += part.slice(cursor);
    parts[i] = rebuilt;
    linksPlaced += matches.length;
  }

  return parts.join("");
}