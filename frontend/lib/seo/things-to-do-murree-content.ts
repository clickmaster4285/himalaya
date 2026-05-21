export const THINGS_TO_DO_MURREE_PATH = "/things-to-do-in-murree";

export type ActivityRow = {
  activity: string;
  villasVersion: string;
  fromProperty: string;
  bestTime: string;
};

export type MurreeNathiagaliRow = {
  factor: string;
  murreeTown: string;
  nathiagali: string;
};

export type ThingsToDoFaq = { q: string; a: string };

export type ClusterLink = { href: string; label: string };

export const activityTableRows: ActivityRow[] = [
  {
    activity: "Kashmir Point sunrise",
    villasVersion: "5:30 AM from villa — empty viewpoint, full panorama",
    fromProperty: "20 min drive",
    bestTime: "All seasons | Best Oct–Nov",
  },
  {
    activity: "Mall Road + shopping",
    villasVersion: "Evenings or early mornings — avoid Sat afternoon",
    fromProperty: "15 min drive",
    bestTime: "Year-round",
  },
  {
    activity: "Patriata chairlift",
    villasVersion: "Weekday mornings — no queue, full experience",
    fromProperty: "25 min drive",
    bestTime: "Year-round",
  },
  {
    activity: "Bhurban forest trails",
    villasVersion: "Directly from property gate — no transport",
    fromProperty: "0 min",
    bestTime: "All seasons",
  },
  {
    activity: "Bhurban Golf Club",
    villasVersion: "18 mountain holes, visiting players welcome",
    fromProperty: "5 min drive",
    bestTime: "April–October",
  },
  {
    activity: "Private jeep safari",
    villasVersion: "Arranged by concierge — routes most guests never access",
    fromProperty: "Arranged on request",
    bestTime: "April–November",
  },
  {
    activity: "Nathiagali + Miranjani",
    villasVersion: "Full day trip — property departure 6am",
    fromProperty: "40 min drive",
    bestTime: "April–November",
  },
  {
    activity: "Ayubia cable car",
    villasVersion: "Combined with Nathiagali day — same route",
    fromProperty: "35 min drive",
    bestTime: "April–November",
  },
  {
    activity: "Bonfire evening",
    villasVersion: "Arranged by villa host — included in winter packages",
    fromProperty: "On property",
    bestTime: "Year-round",
  },
  {
    activity: "Snowfall experience",
    villasVersion: "Private terrace, forest walks, sledging in Bhurban",
    fromProperty: "On property + 15 min drive",
    bestTime: "December–February",
  },
  {
    activity: "Stargazing",
    villasVersion: "Mountain terrace — Milky Way visible Oct–March",
    fromProperty: "On property",
    bestTime: "Oct–March",
  },
  {
    activity: "In-villa private dining",
    villasVersion: "Chef-prepared meal, mountain view, your timing",
    fromProperty: "On property",
    bestTime: "Year-round",
  },
];

export const murreeVsNathiagaliRows: MurreeNathiagaliRow[] = [
  {
    factor: "Elevation",
    murreeTown: "7,500 ft — cooler than Islamabad",
    nathiagali: "8,700 ft — 3°C cooler than Murree | Genuinely cool all day in summer",
  },
  {
    factor: "Distance from Islamabad",
    murreeTown: "45–60 min",
    nathiagali: "75–90 min via Galliyat road",
  },
  {
    factor: "Crowd level",
    murreeTown: "Very high on peak weekends",
    nathiagali: "Significantly lower — more peaceful character",
  },
  {
    factor: "Best hike",
    murreeTown: "Pindi Point loop — 3 km, easy",
    nathiagali:
      "Miranjani Peak — 10 km, 700m gain | Nanga Parbat visible from summit on clear days",
  },
  {
    factor: "Best for",
    murreeTown: "First visits, families, short weekend trips, shopping",
    nathiagali: "Serious hikers, photographers, those escaping Murree crowds",
  },
  {
    factor: "From Himalaya Villas",
    murreeTown: "15 minutes — done before 10am",
    nathiagali: "40 minutes — full day trip, return by 6pm",
  },
];

export const mallRoadBuys = [
  "Kashmiri shawls and pashmina — genuine mountain textile, PKR 2,000–15,000 depending on quality",
  "Wild mountain honey — raw, from Murree Hills beekeepers, PKR 800–2,000 per kg",
  "Dry fruits — walnut, almond, dried apricot, significantly fresher and cheaper than city prices",
  "Hand-embroidered textiles — tablecloths, runners, cushion covers with local motifs",
  "Carved wooden handicrafts — boxes, frames, utensils produced locally",
];

export const adventureItems = [
  "Private jeep safari: Half day PKR 3,000–8,000 per vehicle (4–6 persons) | Arranged via Himalaya Villas concierge",
  "Zip-lining: Available at Patriata complex — PKR 500–1,500 per run",
  "Sozo Adventure Park: Zip-line, climbing wall, rope course — PKR 1,200–2,500 full entry",
  "Rock climbing: Local operators with equipment provision — PKR 1,500–3,000 per person",
  "Horse trekking: Multi-hour forest treks arranged through Himalaya Villas — PKR 2,000–5,000 per person",
];

export const dayTripBullets = [
  "Murree town: 15 min from property | Kashmir Point, Mall Road, Patriata",
  "Nathiagali: 40 min | Miranjani hike (10 km, 3–5 hrs), Ayubia cable car, St. Matthew's Church",
  "Ayubia National Park: 35 min | Cable car, forest trail network, birdwatching",
  "Abbottabad: 65 min | City amenities, Karakoram Highway access",
];

export const thingsToDoFaqs: ThingsToDoFaq[] = [
  {
    q: "What is special about Murree?",
    a: "Murree's speciality is the combination of sub-Himalayan mountain landscape, pine forest, colonial heritage, and accessibility from Islamabad that no other Pakistani destination replicates in under an hour. What separates a memorable Murree trip from a frustrating one is not the destination but where you base yourself within it. Himalaya Villas in Bhurban provides the setting that makes Murree's speciality accessible rather than obscured by crowds and traffic.",
  },
  {
    q: "What are the most famous things about Murree?",
    a: "Murree is famous for Mall Road (its colonial pedestrian street), Kashmir Point (its most-photographed viewpoint), the Patriata chairlift (its most popular attraction), and the winter snowfall season (December–February) that makes it Pakistan's most accessible snow experience from a major city. All four are within 25 minutes of Himalaya Villas.",
  },
  {
    q: "What is the famous dish of Murree?",
    a: "Three street foods define Murree's food identity: doodh patti chai (strong milky tea served in clay cups at coal-fire stalls), bhutta (corn roasted on coal, rubbed with salt and lime), and roadside karahi (mutton or chicken cooked fresh in woks at Mall Road dhabas). These are best experienced on Mall Road in the evening or early morning. Himalaya Villas guests who want the in-villa version — a full karahi prepared by the villa kitchen, served on a mountain terrace — find it a different experience from the dhaba version, but not a lesser one.",
  },
  {
    q: "How many days do you need in Murree?",
    a: "Two nights (three days) is the minimum to cover the essential experience: Murree town and Kashmir Point on Day 1, Nathiagali and the Galliyat on Day 2, Patriata and Bhurban on Day 3. A two-night stay at Himalaya Villas covers all of this without rushing and includes the bonfire evening that most guests identify as the highlight of the trip.",
  },
  {
    q: "What is the best hotel or villa to stay at in Bhurban?",
    a: "Himalaya Villas is the premier private villa accommodation in Bhurban — private estate, panoramic Himalayan views, dedicated host, in-villa dining, and direct forest trail access that no hotel in the area provides. The property is the base from which everything in this guide is best experienced. Book directly via WhatsApp for best availability and rate — OTA bookings are available but direct bookings receive priority confirmation and the lowest rate.",
  },
  {
    q: "What is the best time to visit Murree?",
    a: "Spring (April–May): wildflowers, clear skies, lush green landscape, light crowds. Summer (June–August): peak season for escaping Islamabad heat — book 4–6 weeks ahead at Himalaya Villas for summer weekends. Autumn (September–November): the best season for photography, Nathiagali hiking, and Nanga Parbat views — our most frequently sold-out period. Winter (December–February): snowfall season — bonfire evenings, forest snow walks, and the private snow experience that Himalaya Villas' outdoor spaces provide.",
  },
  {
    q: "Can you see Nanga Parbat from Nathiagali?",
    a: "Yes — from the Miranjani Peak summit (9,462 ft, accessed via a 5 km trail from Nathiagali bazaar), Nanga Parbat is visible at 26,660 feet to the north-northwest on clear days. The best visibility window is late October and November after monsoon dust has cleared. This is the view that drives many of our autumn bookings. October weekends at Himalaya Villas are typically full by mid-September — if this is your purpose, the time to check availability is now.",
  },
  {
    q: "How do I book Himalaya Villas?",
    a: "WhatsApp directly — include your dates, number of guests, and what you are planning and the team responds within 15 minutes during operating hours (9am–10pm daily). Online booking at the contact page. Direct bookings always receive the best available rate and priority availability confirmation.",
  },
];

/** Cluster links — mapped to live routes where dedicated pages are not yet published */
export const activityClusterLinks: ClusterLink[] = [
  { href: "/things-to-do-in-murree-for-couples", label: "Couples" },
  { href: "/things-to-do-in-murree-in-winter", label: "Winter & snowfall" },
  { href: "/things-to-do-in-murree-at-night", label: "Murree at night" },
  { href: "/family-things-to-do-murree", label: "Families" },
  { href: "/blog/thing-to-do-bhurban-murree", label: "Murree & Nathiagali combined" },
  { href: "/murree-3-day-itinerary", label: "3-day itinerary" },
  { href: "/best-restaurants-murree", label: "Restaurants & dining" },
  { href: "/places-to-visit-near-murree", label: "Day trips" },
  { href: "/outdoor-activities-murree", label: "Outdoor & hiking" },
  { href: "/things-to-do-bhurban-murree", label: "Bhurban specifically" },
];
