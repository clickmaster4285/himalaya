import { SITE_CONTACT } from "@/lib/site-contact";

export const THINGS_TO_DO_BHURBAN_PATH = "/things-to-do-bhurban-murree";

export type BhurbanFaq = { q: string; a: string };

export const bhurbanAdvantages = [
  "Forest trails: Directly from Himalaya Villas property gate — no transport needed",
  "Golf: Bhurban Golf Club 5 min away — one of Pakistan's most scenic courses",
  "Privacy: No tourist crowd on your doorstep | Residential and resort zone",
  "Strategic position: Murree town 15 min | Nathiagali 40 min | Both without accommodation change",
  `Himalaya Villas is the reason to stay in Bhurban | WhatsApp ${SITE_CONTACT.phoneDisplay}`,
] as const;

export const golfBhurbanBullets = [
  "Green fees: PKR 3,000–5,000 per round for visiting players",
  "Caddies: Available and strongly recommended — PKR 500–800 per round",
  "Equipment hire: Clubs, bags, gloves available on site",
  "Booking: Advance booking recommended peak summer weekends | Walk-in weekdays",
  "From Himalaya Villas: 5 minutes by road | Villa kitchen can prepare packed lunch for the round",
] as const;

export const forestTrailBhurban = [
  "30-min loop: Directly from villa | Flat | All ages and fitness levels",
  "2-hr traverse: Moderate | Ridge views | Concierge briefing available",
  "4-hr ridge walk: Full Bhurban ridge | Staff accompaniment available for staying guests",
  "Winter version: Same trails in snowfall — most requested outdoor activity at Himalaya Villas",
] as const;

export const dayTripDistances = [
  { destination: "Murree town / Mall Road", drive: "15 min", note: "After-dinner impulse, not a day's planning" },
  { destination: "Patriata", drive: "25 min", note: "Chairlift morning activity" },
  { destination: "Ayubia National Park", drive: "35 min", note: "Cable car + forest trails" },
  { destination: "Nathiagali / Miranjani", drive: "40 min", note: "Morning hike, return same evening" },
  { destination: "Abbottabad", drive: "65 min", note: "City amenities, KKH access" },
] as const;

export const bhurbanFaqs: BhurbanFaq[] = [
  {
    q: "Why should I stay in Bhurban instead of Murree town?",
    a: "Bhurban offers private outdoor space and nature access that Murree town's hotel corridors cannot provide, plus the strategic advantage of being positioned between Murree town (15 min) and Nathiagali (40 min) — covering both destinations from one base. For guests at Himalaya Villas specifically: private villa accommodation, forest trails from the property gate, in-villa mountain dining, and the specific quiet of a non-tourist zone that Murree town's peak seasons do not provide.",
  },
  {
    q: "What is there to do in Bhurban specifically?",
    a: "Bhurban activities: pine forest trail walks directly from Himalaya Villas (30 min to 4+ hours); Bhurban Golf Club 18-hole mountain course (5 min, visiting players welcome); private mountain terrace viewpoint and stargazing at Himalaya Villas; private bonfire evenings in the villa grounds; and day trips to Murree town (15 min), Patriata (25 min), and Nathiagali (40 min) from the property as base.",
  },
  {
    q: "How far is Bhurban from Islamabad?",
    a: "Bhurban is approximately 45–55 minutes from central Islamabad via the M-1 Motorway and Murree Expressway — marginally closer than Murree town. From Rawalpindi, the drive is 40–50 minutes.",
  },
  {
    q: "What is the best place to stay in Bhurban?",
    a: `Himalaya Villas is the premier private villa accommodation in Bhurban — private estate, mountain terrace with Himalayan views, in-villa dining, forest trail access, and a villa team that manages activity logistics for guests. Book directly via WhatsApp ${SITE_CONTACT.phoneDisplay} for best rate and priority availability.`,
  },
];

export const bhurbanRelatedLinks = [
  { href: "/himalaya-villas-bhurban-murree-rest-house", label: "Himalaya Villas Bhurban rest house" },
  { href: "/murree-3-day-itinerary", label: "3-day Murree itinerary" },
  { href: "/outdoor-activities-murree", label: "Outdoor activities" },
  { href: "/hotels-in-bhurban", label: "Hotels in Bhurban guide" },
  { href: "/places-to-visit-near-murree", label: "Day trips from Bhurban" },
  { href: "/contact", label: "Contact & book" },
] as const;
