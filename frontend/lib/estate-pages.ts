/**
 * HIM-ARCH-0001: service and landing pages that were in the sitemap but had no internal link.
 * Listed on /guides so each one is reachable within three clicks of the homepage.
 */
export const ESTATE_PAGE_GROUPS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Weddings",
    links: [
      { href: "/weddings", label: "Weddings at the estate" },
      { href: "/weddings/mehndi-celebrations", label: "Mehndi celebrations" },
      { href: "/weddings/barat-celebrations", label: "Barat celebrations" },
      { href: "/weddings/walima-and-wedding-dinner", label: "Walima and wedding dinner" },
      { href: "/weddings/engagement-ceremonies", label: "Engagement ceremonies" },
      { href: "/weddings/dholki-and-bridal-shower", label: "Dholki and bridal shower" },
      { href: "/wedding-venue-near-islamabad", label: "Wedding venue near Islamabad" },
      { href: "/book/wedding", label: "Book a wedding" },
    ],
  },
  {
    title: "Company events",
    links: [
      { href: "/corporate-retreats", label: "Corporate retreats" },
      { href: "/corporate/plan-your-next-corporate-retreat", label: "Plan a corporate retreat" },
      { href: "/corporate/build-stronger-teams-together", label: "Team building" },
      { href: "/corporate/professional-conference-venue", label: "Conference venue" },
      { href: "/corporate/make-a-statement-with-your-launch", label: "Product launches" },
      { href: "/corporate/an-evening-of-elegance-excellence", label: "Award dinners" },
      { href: "/corporate/connect-showcase-at-our-expo-venue", label: "Exhibitions" },
      { href: "/corporate-hotels-murree-bhurban", label: "Corporate stays in Murree and Bhurban" },
      { href: "/book/meetings", label: "Book a meeting" },
    ],
  },
  {
    title: "Family celebrations",
    links: [
      { href: "/family-celebrations/celebrate-eid-with-your-whole-family", label: "Eid with the whole family" },
      { href: "/family-celebrations/celebrate-your-milestone-moment", label: "Milestone birthdays" },
      { href: "/family-celebrations/celebrate-your-big-achievement", label: "Graduations and achievements" },
      { href: "/family-celebrations/welcome-your-little-miracle", label: "Baby showers" },
      { href: "/family-celebrations/dignified-events-honoring-professional-journeys", label: "Retirement events" },
      { href: "/family-celebrations/warm-memorable-farewell-celebrations", label: "Farewells" },
      { href: "/book/event", label: "Book an event" },
    ],
  },
  {
    title: "Music and culture",
    links: [
      { href: "/live-music-venue-murree", label: "Live music venue in Murree" },
      { href: "/music/reserve-our-live-music-venue", label: "Live music evenings" },
      { href: "/music/reserve-our-concert-venue", label: "Private concerts" },
      { href: "/music/reserve-our-sufi-qawwali-venue", label: "Sufi qawwali nights" },
      { href: "/music/reserve-our-literary-venue", label: "Mushaira and literary evenings" },
      { href: "/music/reserve-our-cultural-venue", label: "Cultural shows" },
      { href: "/music/reserve-our-dj-party-venue", label: "DJ nights" },
    ],
  },
  {
    title: "Dining and experiences",
    links: [
      { href: "/dining", label: "Dining at the estate" },
      { href: "/experiences/dining", label: "Private dining" },
      { href: "/experiences/adventure", label: "Adventure experiences" },
      { href: "/experiences/creative", label: "Creative workshops" },
      { href: "/experiences/media", label: "Photo and video" },
      { href: "/adventure-games", label: "Adventure games" },
      { href: "/book/activities", label: "Book activities" },
    ],
  },
  {
    title: "Stays and rates",
    links: [
      { href: "/hotel-rooms-in-murree", label: "Hotel rooms in Murree" },
      { href: "/guest-house-murree", label: "Guest houses in Murree" },
      { href: "/holiday-homes-murree", label: "Holiday homes in Murree" },
      { href: "/bhurban-resorts", label: "Resorts in Bhurban" },
      { href: "/himalaya-villas-bhurban-murree-rest-house", label: "Bhurban rest house" },
      { href: "/murree-hotel-packages", label: "Murree hotel packages" },
      { href: "/book-murree-hotel", label: "Book a Murree hotel" },
      { href: "/snowfall-in-murree", label: "Snowfall in Murree" },
      { href: "/snowfall-in-murree/winter-villas", label: "Winter villas" },
      { href: "/luxury-travel-pakistan-murree-hills", label: "Luxury travel in the Murree Hills" },
      { href: "/blogs/why-villas-are-the-ultimate-luxury-stays-in-bhurban", label: "Why villas suit Bhurban" },
    ],
  },
];
