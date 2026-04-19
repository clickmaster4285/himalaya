/** Editorial posts — all focused on the villa experience at Himalaya. */
export type VillaBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  coverImage: string;
  /** Optional direct article URL, e.g. /Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban */
  href?: string;
  /** When set, primary CTA links to this villa detail page */
  relatedVillaSlug?: string;
};

export const VILLA_BLOG_POSTS: VillaBlogPost[] = [
  {
    slug: "thing-to-do-bhurban-murree",
    href: "/thing-to-do-bhurban-murree",
    title: "Things to Do Near Bhurban Murree — A Complete Activity Guide",
    excerpt:
      "Patriata, Ayubia, Mall Road, hiking trails, and scenic viewpoints — the essential travel guide for families and guests staying at Himalaya Villas.",
    date: "2026-04-11",
    readMinutes: 10,
    coverImage: "/assets/blog-bhurban-things-to-do-featured-v2.png",
  },
  {
    slug: "Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban",
    href: "/Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban",
    title: "Why Villas Are the Ultimate Luxury Stay in Bhurban & Murree",
    excerpt:
      "Discover why private villas in Bhurban Murree deliver unmatched privacy, space, and exclusivity compared to hotels.",
    date: "2026-04-18",
    readMinutes: 14,
    coverImage: "/assets/blog-villas-bhurban-murree-luxury-featured.png",
  },
  {
    slug: "family-tour-murree-himalaya-villas",
    href: "/family-tour-murree-himalaya-villas",
    title: "Why Himalaya Villas & Resorts in Murree Are Best for a Family Tour",
    excerpt:
      "Planning a family tour to Murree or Bhurban? Discover why Himalaya Premium Villas is the perfect family stay — private, safe, spacious & activities for all ages.",
    date: "2026-04-18",
    readMinutes: 12,
    coverImage: "/assets/blog-family-tour-featured-banner.png",
  },
  {
    slug: "bhurban-mountain-escape",
    title: "Why Bhurban is Pakistan’s most sought-after mountain escape",
    excerpt:
      "Elevation, clean air, and privacy — how our estate pairs alpine calm with five-star hospitality, minutes from Murree.",
    date: "2026-02-12",
    readMinutes: 6,
    coverImage: "/assets/why-villa-view.jpg",
  },
  {
    slug: "choosing-the-right-villa",
    title: "Choosing the right villa: suites, family lodges, and presidential stays",
    excerpt:
      "Bedrooms, guest capacity, and layout — a practical guide to matching your group with the perfect residence.",
    date: "2026-02-05",
    readMinutes: 8,
    coverImage: "/assets/villa-presidential-real.jpg",
  },
  {
    slug: "amenities-that-matter",
    title: "Amenities that matter: what sets a luxury villa apart from a hotel",
    excerpt:
      "Private kitchens, terraces, dedicated hosts, and space to breathe — the details guests remember long after checkout.",
    date: "2026-01-28",
    readMinutes: 5,
    coverImage: "/assets/amenities-interior-real.jpg",
  },
  {
    slug: "seasons-in-the-hills",
    title: "Seasons in the hills: when to book your stay",
    excerpt:
      "Spring blooms, summer cool, autumn gold, and winter quiet — planning dates around weather and local rhythm.",
    date: "2026-01-18",
    readMinutes: 7,
    coverImage: "/assets/why-villa-garden.jpg",
  },
  {
    slug: "private-tours-and-walkthroughs",
    title: "Private tours & virtual previews before you commit",
    excerpt:
      "How we help you see the property — in person or remotely — so your booking decision feels confident and calm.",
    date: "2026-01-08",
    readMinutes: 4,
    coverImage: "/assets/gallery-interior.jpg",
  },
  {
    slug: "extended-stays-and-remote-work",
    title: "Extended stays & remote work from the mountains",
    excerpt:
      "Wi‑Fi, quiet workspaces, and housekeeping — making multi-night villa life as productive as it is restorative.",
    date: "2025-12-20",
    readMinutes: 6,
    coverImage: "/assets/journal-bonfire.jpg",
  },
];
