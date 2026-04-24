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
  slug: "best-places-to-visit-in-murree",
  title: "Best places to visit in Murree",
  excerpt:
    "From lush green hills to scenic viewpoints and charming bazaars — discover the most beautiful spots in Murree for a perfect mountain getaway.",
  date: "2025-12-20",
  readMinutes: 6,
  coverImage: "/assets/best-murree-places.png",
  },
{
  slug: "best-hotels-in-murree-pakistan",
  title: "Best hotels in Murree, Pakistan",
  excerpt:
    "From luxury mountain resorts to cozy family guesthouses — explore the best hotels in Murree for a comfortable and scenic stay in Pakistan’s hill station.",
  date: "2025-12-20",
  readMinutes: 6,
  coverImage: "/assets/murree-hotels.jpeg",
},

  {
    slug: "luxury-hotels-and-villas-in-murree-2026-guide",
    title: "Luxury Hotels & Villas in Murree: The Definitive Guide for 2026",
    excerpt:
      "Discover the finest luxury hotels and villas in Murree — from private mountain villas in Bhurban to premium resorts. Rates, amenities, and booking guide inside.",
    date: "2026-04-21",
    readMinutes: 12,
    coverImage: "/assets/why-villa-private.jpg",
  },
  {
    slug: "hotels-in-bhurban-murree-why-bhurban-is-best",
    title: "Hotels in Bhurban Murree: Why Bhurban is Murree's Best-Kept Secret",
    excerpt:
      "Discover why travellers are choosing Bhurban over Mall Road for their Murree stay. Luxury villas, pine forests, panoramic views — the definitive guide to hotels and villas in Bhurban, Murree.",
    date: "2026-04-21",
    readMinutes: 11,
    coverImage: "/assets/gallery-reflection.jpg",
  },
  {
    slug: "best-hotels-in-murree-pakistan-2026-guide",
    title: "Best Hotels in Murree, Pakistan: The Complete 2026 Guide",
    excerpt:
      "Discover the best hotels in Murree, Pakistan — from 5-star luxury villas in Bhurban to family-friendly options near Mall Road. Rates, tips & booking guide inside.",
    date: "2026-04-21",
    readMinutes: 12,
    coverImage: "/assets/blog-bhurban-sunset-mountains.png",
  },
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


    {
  slug: "banquet-hall-in-murree-bhurban",
  title: "Best Banquet Halls in Murree & Bhurban for Weddings and Events",
  excerpt:
    "Explore top banquet halls in Murree and Bhurban for weddings, receptions, and private events — venues, capacity, and booking details included.",
  date: "2026-04-24",
  readMinutes: 10,
  coverImage: "/assets/banquet-hall-murree.png",
},
{
  slug: "wedding-reception-venues-near-me-bhurban-murree",
  title: "Wedding Reception Venues Near Murree & Bhurban (2026 Guide)",
  excerpt:
    "Find the best wedding reception venues near Murree and Bhurban — luxury setups, mountain views, and premium event spaces for unforgettable celebrations.",
  date: "2026-04-24",
  readMinutes: 11,
  coverImage: "/assets/wedding-reception-murree.png",
},
{
  slug: "resorts-in-murree-pakistan-2026-guide",
  title: "Best Resorts in Murree, Pakistan: Complete 2026 Guide",
  excerpt:
    "Discover the top resorts in Murree offering luxury stays, scenic views, family-friendly amenities, and premium mountain experiences.",
  date: "2026-04-24",
  readMinutes: 12,
  coverImage: "/assets/murree-resorts.png",
},
{
  slug: "himalaya-villas-function-hall-bhurban-murree",
  title: "Himalaya Villas Function Hall in Bhurban Murree",
  excerpt:
    "A premium event space at Himalaya Villas Bhurban — ideal for weddings, corporate events, private gatherings, and luxury mountain celebrations.",
  date: "2026-04-24",
  readMinutes: 10,
  coverImage: "/assets/himalaya-villas-function-hall.png",
},
{
  slug: "himalaya-banquet-hall-bhurban-murree",
  title: "Himalaya Banquet Hall Bhurban Murree: Luxury Event Venue",
  excerpt:
    "Host weddings and events at Himalaya Banquet Hall in Bhurban Murree — elegant setup, mountain views, and full event management services.",
  date: "2026-04-24",
  readMinutes: 9,
  coverImage: "/assets/himalaya-banquet.png",
},
{
  slug: "events-venue-himalaya-villas-murree-bhurban",
  title: "Events Venue at Himalaya Villas Murree & Bhurban",
  excerpt:
    "Premium event venue at Himalaya Villas offering wedding, corporate, and private event hosting in the heart of Bhurban Murree.",
  date: "2026-04-24",
  readMinutes: 10,
  coverImage: "/assets/himalaya-events-venue.png",
}
    
];
