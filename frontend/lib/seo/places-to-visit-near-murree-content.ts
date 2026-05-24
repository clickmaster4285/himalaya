export const PLACES_NEAR_MURREE_PATH = "/places-to-visit-near-murree";

export type DayTripFaq = { q: string; a: string };

export type DestinationRow = {
  destination: string;
  drive: string;
  activities: string;
};

export const dayTripDestinations: DestinationRow[] = [
  { destination: "Murree Town", drive: "15 min", activities: "Mall Road, Kashmir Point, Patriata, shopping" },
  { destination: "Pindi Point", drive: "15 min", activities: "Forest walk, viewpoint, photography" },
  { destination: "Patriata (New Murree)", drive: "25 min", activities: "Chairlift, snow slopes, ridge walks" },
  { destination: "Nathiagali", drive: "40 min", activities: "Miranjani hike, St. Matthew's Church, forest" },
  { destination: "Ayubia National Park", drive: "35 min", activities: "Cable car, trail network, birdwatching" },
  { destination: "Khanspur", drive: "45 min", activities: "Quiet village, intact forest, no crowds" },
  { destination: "Dungagali", drive: "40 min", activities: "Cable car upper station, forest walks" },
  { destination: "Abbottabad", drive: "65 min", activities: "City amenities, Karakoram Highway access" },
];

export const miranjaniHikeDetails = [
  { label: "Distance", value: "10 km round trip (5 km to summit, 5 km return)" },
  { label: "Elevation gain", value: "Approximately 700m from Nathiagali trailhead to summit" },
  { label: "Duration", value: "3–5 hours total depending on pace" },
  {
    label: "Difficulty",
    value: "Moderate — sustained uphill gradient. Achievable by most healthy adults.",
  },
  {
    label: "Start point",
    value: "Nathiagali bazaar — register at Forest Dept. checkpost before beginning",
  },
  {
    label: "Guide",
    value: "Available in Nathiagali bazaar — PKR 800–1,500 | Recommended for first-time visitors",
  },
  {
    label: "Best season",
    value: "April–June and September–November | Avoid July–August (monsoon trail mud)",
  },
  {
    label: "Nanga Parbat visibility",
    value: "October and November — clearest air of the year | Morning hours, before cloud build-up",
  },
] as const;

export const murreeVsNathiagaliPoints = [
  {
    title: "Murree town",
    description:
      "The accessible, commercial, heritage hill station — famous for Mall Road, Kashmir Point, and the Patriata chairlift.",
  },
  {
    title: "Nathiagali",
    description:
      "Quieter, higher, cooler in summer, and the base for the best hiking in the region — including Miranjani and Nanga Parbat views.",
  },
  {
    title: "Bhurban (Himalaya Villas)",
    description:
      "Sits between both — 15 minutes to Murree, 40 minutes to Nathiagali. One base, consecutive day trips, no hotel changes.",
  },
] as const;

export const suggestedItinerary = [
  {
    day: "Day 1",
    title: "Murree town & Patriata",
    plan: "Kashmir Point early morning, Mall Road shopping and street food, Patriata chairlift — return for in-villa dinner.",
  },
  {
    day: "Day 2",
    title: "Nathiagali & Miranjani",
    plan: "Depart 7am, Miranjani hike, lunch in Nathiagali bazaar, St. Matthew's Church — return by 6pm.",
  },
  {
    day: "Day 3",
    title: "Ayubia & Galliyat forest",
    plan: "Ayubia cable car, marked trails, optional Khanspur — birdwatching best in early morning spring/autumn.",
  },
] as const;

export const dayTripFaqs: DayTripFaq[] = [
  {
    q: "What is the best day trip from Murree?",
    a: "Nathiagali and Ayubia National Park combined is the strongest single day trip from the Murree Hills. Leave Himalaya Villas by 7am, reach Nathiagali by 7:40am, complete the Miranjani hike (return by 2pm), have lunch in Nathiagali bazaar, take the Ayubia cable car on the return route, and arrive back at the villa by 6pm. This covers the best of the Galliyat in a single day without any rushing.",
  },
  {
    q: "How far is Nathiagali from Murree?",
    a: "Nathiagali is approximately 45 km from Murree town and 40 km from Bhurban, reached via the Galliyat road. The drive from Himalaya Villas takes 35–40 minutes in normal conditions. The road is fully paved; a standard saloon car is adequate in good weather. In winter, 4x4 is recommended.",
  },
  {
    q: "Can you see Nanga Parbat from Nathiagali?",
    a: "Yes — from the Miranjani summit (9,462 ft) on clear days, Nanga Parbat (26,660 ft) is visible to the north-northwest. The best visibility is in October and November after monsoon dust clears. This is the view that drives our autumn bookings — October at Himalaya Villas is typically fully booked by mid-September.",
  },
  {
    q: "Is Nathiagali part of Abbottabad?",
    a: "Yes — administratively within Abbottabad district, Khyber Pakhtunkhwa, despite its geographic and touristic proximity to Murree and Islamabad. The drive from Himalaya Villas follows the Galliyat road through Ghora Gali and Dunga Gali.",
  },
];

export const placesRelatedLinks = [
  { href: "/things-to-do-in-murree", label: "Things to do in Murree — full guide" },
  { href: "/family-things-to-do-murree", label: "Family day trips" },
  { href: "/things-to-do-in-murree-in-winter", label: "Winter destinations" },
  { href: "/blog/best-places-to-visit-in-murree", label: "Extended places guide (blog)" },
  { href: "/himalaya-villas-bhurban-murree-rest-house", label: "Himalaya Villas Bhurban base" },
] as const;
