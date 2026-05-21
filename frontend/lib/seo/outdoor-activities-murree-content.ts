import { SITE_CONTACT } from "@/lib/site-contact";

export const OUTDOOR_ACTIVITIES_MURREE_PATH = "/outdoor-activities-murree";

export type OutdoorFaq = { q: string; a: string };

export const outdoorActivityBase = [
  {
    title: "Forest trails",
    detail: "Directly from property gate — no transport required | 30 min to 4+ hours",
  },
  {
    title: "Bhurban Golf Club",
    detail: "5 minutes by road | 18 mountain holes | Visiting players welcome",
  },
  {
    title: "Private jeep safari",
    detail: "Arranged by concierge | Routes inaccessible to standard vehicles",
  },
  {
    title: "Miranjani Peak",
    detail: "40 min to trailhead | Pakistan's best accessible day hike",
  },
  {
    title: "Activity concierge",
    detail: `WhatsApp the team before arrival — everything arranged | ${SITE_CONTACT.phoneDisplay}`,
  },
] as const;

export const forestTrailOptions = [
  "30-minute loop: Flat, suitable for all fitness levels and families with children | No guide needed",
  "2-hour forest traverse: Moderate gradient, ridge views | Concierge briefing recommended",
  "4-hour extended ridge walk: Full Bhurban ridge section | Staff accompaniment available",
] as const;

export const miranjaniHikeTable = [
  { label: "Distance", value: "10 km round trip" },
  { label: "Elevation gain", value: "~700m from Nathiagali trailhead" },
  { label: "Duration", value: "3–5 hours total" },
  { label: "Difficulty", value: "Moderate — sustained uphill, no technical sections" },
  { label: "From Himalaya Villas", value: "40 min drive | Depart by 6:30am for summit by 10am" },
  { label: "Guide", value: "Available in Nathiagali bazaar — PKR 800–1,500" },
  {
    label: "Best dates",
    value: "April–June and September–November | October for Nanga Parbat visibility",
  },
] as const;

export const golfDetails = [
  "Green fees: PKR 3,000–5,000 per round visiting players",
  "Caddies: PKR 500–800 per round | Strongly recommended for first visit",
  "Equipment hire: Available on site | Advance booking recommended peak summer weekends",
] as const;

export const jeepSafariDetails = [
  "Duration: Half day (3–5 hours) or full day (6–8 hours)",
  "Rate: PKR 3,000–8,000 per vehicle (4–6 persons)",
  "Arrangement: Via Himalaya Villas concierge — WhatsApp your interest when booking the stay",
  "Best season: April–June and September–November | Monsoon tracks not advisable July–August",
] as const;

export const adventureSportsBullets = [
  "Zip-lining at Patriata complex and private operators on the Bhurban ridge — PKR 500–1,500 per run",
  "Rock climbing on natural outcrop faces — local operators with equipment at PKR 1,500–3,000 per person",
  "Sozo Adventure Park: zip-line, climbing wall, rope courses — PKR 1,200–2,500 full entry",
  "All arrangements through Himalaya Villas concierge before or during your stay",
] as const;

export const seasonGuide = [
  { activity: "Forest trails (gate)", best: "Year-round | Winter snow walks exceptional" },
  { activity: "Miranjani hike", best: "April–June, Sep–Nov | Oct for Nanga Parbat" },
  { activity: "Golf", best: "June–August (cool vs Islamabad heat)" },
  { activity: "Jeep safari", best: "April–June, Sep–Nov | Avoid Jul–Aug monsoon" },
  { activity: "Zip-line / Sozo", best: "Apr–May, Sep–Oct clear days" },
] as const;

export const sampleAdventureWeekend = [
  {
    day: "Day 1",
    title: "Forest + golf",
    plan: "Morning 30-min loop from the gate. Afternoon Bhurban Golf Club (5 min). In-villa lunch on return.",
  },
  {
    day: "Day 2",
    title: "Miranjani summit",
    plan: "Depart 6:30am for Nathiagali trailhead. Summit by 10am, lunch in bazaar, back at villa by 4pm.",
  },
  {
    day: "Day 3",
    title: "Jeep safari or Patriata",
    plan: "Half-day jeep via concierge, or zip-line at Patriata — concierge books either.",
  },
] as const;

export const packingEssentials = [
  "Trail shoes with grip (forest and Miranjani)",
  "Layers — 10–15°C cooler than Islamabad in summer",
  "Rain shell for monsoon months (Jul–Aug)",
  "Sun hat and SPF for ridge exposure",
  "Headlamp if starting Miranjani before dawn",
] as const;

export const outdoorFaqs: OutdoorFaq[] = [
  {
    q: "What is the best hike near Murree?",
    a: "Miranjani Peak from Nathiagali (40 min from Himalaya Villas) is the best hike accessible from the Murree Hills — 10 km round trip, summit at 9,462 ft, Nanga Parbat visible on clear October and November days. For shorter, easier hiking directly from accommodation, the Bhurban forest trails accessible from Himalaya Villas provide 30 minutes to 4 hours of forest walking without any transport.",
  },
  {
    q: "Is Bhurban Golf Club open to visitors?",
    a: "Yes. Bhurban Golf Club is open to visiting players without membership. Green fees are approximately PKR 3,000–5,000 per round; caddies are available at PKR 500–800; equipment hire is on site. The club is 5 minutes from Himalaya Villas. Advance booking is recommended for peak summer weekends.",
  },
  {
    q: "Where can I book a jeep safari in Murree?",
    a: `Private jeep safaris in the Murree Hills are arranged through the Himalaya Villas concierge for staying guests — covering off-road routes and ridge viewpoints inaccessible to standard vehicles. Mention it in your WhatsApp booking message and it will be arranged before arrival. Rate: PKR 3,000–8,000 per vehicle depending on route duration. WhatsApp ${SITE_CONTACT.phoneDisplay}.`,
  },
];

export const outdoorRelatedLinks = [
  { href: "/places-to-visit-near-murree", label: "Places to visit near Murree" },
  { href: "/things-to-do-in-murree", label: "Things to do in Murree 2026" },
  { href: "/things-to-do-in-murree-in-winter", label: "Winter & snowfall activities" },
  { href: "/family-things-to-do-murree", label: "Family activities guide" },
  { href: "/things-to-do-in-murree-for-couples", label: "Romantic guide for couples" },
  { href: "/contact", label: "Contact & book" },
] as const;
