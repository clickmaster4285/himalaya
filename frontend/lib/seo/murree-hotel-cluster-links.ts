export type MurreeHotelClusterPage =
  | "romantic-hotels-murree"
  | "luxury-hotel-murree"
  | "corporate-hotels-murree-bhurban"
  | "family-hotels-murree"
  | "book-murree-hotel"
  | "murree-hotel-packages";

export type MurreeHotelRelatedLink = {
  href: string;
  label: string;
};

/** Cross-links between Murree hotel landing pages and core site guides. */
export const murreeHotelClusterRelatedLinks: Record<
  MurreeHotelClusterPage,
  readonly MurreeHotelRelatedLink[]
> = {
  "romantic-hotels-murree": [
    { href: "/things-to-do-in-murree-for-couples", label: "Things to do in Murree for couples" },
    { href: "/luxury-hotel-murree", label: "Luxury hotel in Murree" },
    { href: "/murree-hotel-packages", label: "Murree hotel packages" },
    { href: "/book-murree-hotel", label: "Book Murree hotel" },
    { href: "/villas", label: "Private villas & suites" },
    { href: "/things-to-do-in-murree-at-night", label: "Murree at night" },
    { href: "/best-restaurants-murree", label: "Best restaurants in Murree" },
    { href: "/contact", label: "Contact & availability" },
  ],
  "luxury-hotel-murree": [
    { href: "/romantic-hotels-murree", label: "Romantic hotels in Murree" },
    { href: "/luxury-hotels-in-murree", label: "Luxury hotels in Murree guide" },
    { href: "/murree-hotel-packages", label: "Murree hotel packages" },
    { href: "/book-murree-hotel", label: "Book Murree hotel" },
    { href: "/villas", label: "Presidential & luxury villas" },
    { href: "/experience", label: "Estate experiences" },
    { href: "/best-hotels-murree-pakistan", label: "Best hotels in Murree Pakistan" },
    { href: "/contact", label: "Contact concierge" },
  ],
  "corporate-hotels-murree-bhurban": [
    { href: "/corporate-retreats", label: "Corporate retreats in Murree" },
    { href: "/meetings-events", label: "Meetings & events venue" },
    { href: "/murree-hotel-packages", label: "Corporate hotel packages" },
    { href: "/book-murree-hotel", label: "Book Murree hotel" },
    { href: "/family-hotels-murree", label: "Family hotels in Murree" },
    { href: "/luxury-hotel-murree", label: "Luxury hotel in Murree" },
    { href: "/things-to-do-bhurban-murree", label: "Things to do in Bhurban" },
    { href: "/contact", label: "Request a proposal" },
  ],
  "family-hotels-murree": [
    { href: "/family-things-to-do-murree", label: "Family things to do in Murree" },
    { href: "/murree-hotel-packages", label: "Family hotel packages" },
    { href: "/book-murree-hotel", label: "Book Murree hotel" },
    { href: "/romantic-hotels-murree", label: "Romantic hotels in Murree" },
    { href: "/family-hotels-in-murree", label: "Family hotels in Murree guide" },
    { href: "/places-to-visit-near-murree", label: "Places to visit near Murree" },
    { href: "/villas", label: "Family villas & lodges" },
    { href: "/contact", label: "Plan your family stay" },
  ],
  "book-murree-hotel": [
    { href: "/murree-hotel-packages", label: "Murree hotel packages" },
    { href: "/villas", label: "Browse villas & suites" },
    { href: "/book/stay", label: "Book a villa stay" },
    { href: "/luxury-hotel-murree", label: "Luxury hotel in Murree" },
    { href: "/family-hotels-murree", label: "Family hotels in Murree" },
    { href: "/romantic-hotels-murree", label: "Romantic hotels in Murree" },
    { href: "/corporate-hotels-murree-bhurban", label: "Corporate hotels Bhurban" },
    { href: "/faqs", label: "Booking FAQs" },
  ],
  "murree-hotel-packages": [
    { href: "/book-murree-hotel", label: "Book Murree hotel" },
    { href: "/family-hotels-murree", label: "Family hotels in Murree" },
    { href: "/romantic-hotels-murree", label: "Romantic hotels in Murree" },
    { href: "/corporate-hotels-murree-bhurban", label: "Corporate hotels Bhurban" },
    { href: "/luxury-hotel-murree", label: "Luxury hotel in Murree" },
    { href: "/things-to-do-in-murree", label: "Things to do in Murree" },
    { href: "/murree-3-day-itinerary", label: "Murree 3-day itinerary" },
    { href: "/contact", label: "Customize your package" },
  ],
};
