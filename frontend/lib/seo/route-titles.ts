import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

/** Titles for public routes that do not export their own metadata. */
const PAGE_SEO: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/contact": {
    title: "Contact Himalaya Villas in Bhurban",
    description: "Phone, WhatsApp, email and the Mohra Iswal address for Himalaya Villas in Bhurban.",
  },
  "/book/stay": {
    title: "Book a Villa Stay in Bhurban | Himalaya Villas",
    description: "Choose dates and a villa at Himalaya Villas, Bhurban. The quote confirms the rate.",
  },
  "/book/dining": {
    title: "Book Private Dining in Bhurban | Himalaya Villas",
    description: "Arrange in-villa dining at Himalaya Villas, Bhurban.",
  },
  "/book/wedding": {
    title: "Book a Wedding in Bhurban | Himalaya Villas",
    description: "Enquire about a wedding on the Himalaya Villas estate in Bhurban.",
  },
  "/book/meetings": {
    title: "Book a Meeting in Bhurban | Himalaya Villas",
    description: "Enquire about a meeting or offsite at Himalaya Villas, Bhurban.",
  },
  "/book/event": {
    title: "Book an Event in Bhurban | Himalaya Villas",
    description: "Enquire about a private event at Himalaya Villas, Bhurban.",
  },
  "/book/activities": {
    title: "Book Activities in Bhurban | Himalaya Villas",
    description: "Enquire about activities for a stay at Himalaya Villas, Bhurban.",
  },
  "/login": {
    title: "Sign In | Himalaya Villas",
    description: "Sign in to a Himalaya Villas account.",
    noindex: true,
  },
  "/signup": {
    title: "Create an Account | Himalaya Villas",
    description: "Create a Himalaya Villas account.",
    noindex: true,
  },
  "/show-card": {
    title: "Villa Card Preview | Himalaya Villas",
    description: "Internal preview of a Himalaya Villas card.",
    noindex: true,
  },
  "/experiences/dining": {
    title: "Private Dining Experiences | Himalaya Villas Bhurban",
    description: "Private dining arranged for guests staying at Himalaya Villas, Bhurban.",
  },
  "/experiences/adventure": {
    title: "Adventure Experiences | Himalaya Villas Bhurban",
    description: "Outdoor activities arranged around a stay at Himalaya Villas, Bhurban.",
  },
  "/experiences/creative": {
    title: "Creative Workshops | Himalaya Villas Bhurban",
    description: "Workshops arranged for a group staying at Himalaya Villas, Bhurban.",
  },
  "/experiences/media": {
    title: "Photo and Video Experiences | Himalaya Villas Bhurban",
    description: "Photography arranged around a stay at Himalaya Villas, Bhurban.",
  },
  "/weddings": {
    title: "Weddings at Himalaya Villas in Bhurban",
    description: "Nikkah, mehndi, baraat and walima gatherings on the Himalaya Villas estate in Bhurban.",
  },
  "/weddings/nikkah-and-wedding-celebrations-in-the-hills": {
    title: "Nikkah in the Murree Hills | Himalaya Villas",
    description: "A nikkah gathering at Himalaya Villas, Bhurban, for one group at a time.",
  },
  "/dining": {
    title: "Dining at Himalaya Villas in Bhurban",
    description: "In-villa dining at Himalaya Villas, Bhurban.",
  },
  "/corporate-retreats": {
    title: "Corporate Retreats at Himalaya Villas Bhurban",
    description: "A private offsite for one company at Himalaya Villas, Bhurban.",
  },
  "/family-hotels-in-murree": {
    title: "Family Stays in Murree | Himalaya Villas Bhurban",
    description: "Family villa stays at Himalaya Villas in Bhurban, Murree.",
  },
  "/himalaya-villas-bhurban-murree-rest-house": {
    title: "Bhurban Rest House | Himalaya Villas",
    description: "The Himalaya Villas estate in Bhurban, Murree.",
  },
  "/premium-page": {
    title: "Premium Stay at Himalaya Villas Bhurban",
    description: "A private stay at Himalaya Villas, Bhurban.",
    noindex: true,
  },
};

export function routeSeo(pathname: string): { title: string; description: string; noindex?: boolean } | undefined {
  return PAGE_SEO[pathname];
}

/** Metadata for a route segment layout. Every public route gets a self-canonical. */
export function routeMetadata(pathname: string): Metadata {
  const route = PAGE_SEO[pathname];
  if (!route) throw new Error(`No route SEO entry for ${pathname}`);
  return createPageMetadata({
    title: route.title,
    description: route.description,
    path: pathname,
    appendSiteBrand: false,
    noindex: route.noindex,
  });
}

export const ROUTE_SEO_PATHS = Object.keys(PAGE_SEO);

export const ROUTE_NOINDEX_PATHS = new Set(
  Object.entries(PAGE_SEO)
    .filter(([, route]) => route.noindex)
    .map(([path]) => path),
);
