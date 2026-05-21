import { SITE_CONTACT } from "@/lib/site-contact";

export const MURREE_3_DAY_ITINERARY_PATH = "/murree-3-day-itinerary";

export type ItineraryFaq = { q: string; a: string };

export type ScheduleRow = { time: string; activity: string; notes: string };

export const tripAtGlance = {
  days: [
    "Day 1: Arrive → Kashmir Point sunset → Mall Road evening → Villa bonfire",
    "Day 2: Nathiagali day trip → Miranjani hike → Ayubia cable car → Fireside dinner",
    "Day 3: Patriata chairlift → Bhurban forest walk → Mall Road shopping → Depart",
  ],
  base: "Himalaya Villas, Bhurban | Check-in Day 1 | Late checkout Day 3 available on request",
  optimalMonths: "April–May | September–November",
} as const;

export const day1Schedule: ScheduleRow[] = [
  { time: "12:30–1:30 PM", activity: "Drive from Islamabad", notes: "Allow extra 30–45 min on Fridays or Saturday mornings | Leave before 8am to avoid Expressway queue" },
  { time: "2:00 PM", activity: "Arrive Himalaya Villas | Check-in", notes: "Welcome by villa host | Villa tour | Light lunch served on arrival" },
  { time: "3:30–5:30 PM", activity: "Kashmir Point", notes: "20 min drive | Afternoon crowd thinning by 4pm | Viewpoint + photography" },
  { time: "5:30–7:30 PM", activity: "Mall Road — first walk", notes: "East-to-west direction | Note shops for return | Reconnaissance pass" },
  { time: "7:30–9:00 PM", activity: "Mall Road dinner and food", notes: "Karahi dinner at dhaba | Bhutta | Kashmiri chai | Dry fruit and honey shopping" },
  { time: "9:30 PM", activity: "Return to villa", notes: "Optional bonfire if arranged in advance | Or early rest for Day 2 early start" },
];

export const day2Schedule: ScheduleRow[] = [
  { time: "5:30 AM", activity: "Hot breakfast at villa", notes: "Requested the night before — prepared by 5:30am" },
  { time: "6:30 AM", activity: "Depart for Nathiagali", notes: "40 min via Galliyat road | Arrive bazaar 7:10am" },
  { time: "7:10 AM", activity: "Register at Forest Dept. checkpost", notes: "Name and contact required | Guide PKR 800–1,500 optional" },
  { time: "7:10 AM – 12:00 PM", activity: "Miranjani hike", notes: "5 km up | 30 min at summit (Nanga Parbat on clear Oct/Nov) | Descent 1.5–2 hrs" },
  { time: "12:30 PM", activity: "Lunch in Nathiagali bazaar", notes: "Local restaurants | Rest and rehydrate" },
  { time: "2:00–3:30 PM", activity: "St. Matthew's Church + Khanspur option", notes: "Heritage church in forest | Khanspur 20 min further" },
  { time: "3:30–5:00 PM", activity: "Ayubia cable car — Dunga Gali", notes: "PKR 200–400 return | 10-min gondola | Forest views" },
  { time: "5:00–6:00 PM", activity: "Return to Himalaya Villas", notes: "40 min drive | Arrive by 6pm" },
  { time: "8:00–10:30 PM", activity: "Bonfire evening + in-villa dinner", notes: "Most guests name this the best evening of the trip" },
];

export const day3Schedule: ScheduleRow[] = [
  { time: "8:00–9:30 AM", activity: "Leisurely breakfast at villa", notes: "No early start | Pack bags after breakfast" },
  { time: "9:30 AM", activity: "Drive to Patriata", notes: "25 min | Park at base station" },
  { time: "9:45 AM – 12:00 PM", activity: "Patriata chairlift + ridge walk", notes: "PKR 300–500 return | Ridge walk 45 min | Food at upper station" },
  { time: "12:30–2:00 PM", activity: "Bhurban Golf Club (optional)", notes: "5 min from villa | PKR 3,000–5,000 green fee | Half-round or scenic walk" },
  { time: "2:00–3:00 PM", activity: "Bhurban forest walk — short loop", notes: "Directly from villa | 30–45 min | Low effort, high atmosphere" },
  { time: "3:00 PM", activity: "Check out", notes: "Late checkout to 3pm standard | 4pm on request" },
  { time: "3:30–5:30 PM", activity: "Depart Bhurban", notes: "Leave by 3:30pm weekday for traffic-free return | Add 1 hour for weekend" },
];

export const packingClothing = [
  "Warm fleece or jacket — mountain evenings 8–12°C colder than Islamabad after sunset",
  "Waterproof or wind-resistant outer layer — weather changes fast",
  "Comfortable trousers — hiking trousers or jeans; avoid formal wear for Day 2",
  "3 changes of clothes — pack light; villa provides all linen and towels",
] as const;

export const packingFootwear = [
  "Waterproof hiking boots — non-negotiable for Day 2 Miranjani (mud, ankle support)",
  "Casual walking shoes — Day 1 Mall Road and Day 3 Patriata",
] as const;

export const packingGear = [
  "Daypack 20–30L — water, snacks, layers for Day 2",
  "Water bottles — minimum 2L for Day 2; refill in Nathiagali",
  "Sunscreen and sunglasses — high-altitude UV significant",
  "Power bank — outdoor days drain phones faster",
  "Cash PKR 6,000–10,000 — chai, bhutta, chairlift, guide, bazaar; ATMs in Murree town",
] as const;

export const packingWinter = [
  "Thermal base layers top and bottom — Bhurban nights reach -2°C",
  "Waterproof boots specifically — snow is wet",
  "Gloves and warm hat — wind on exposed ridge uncomfortable within minutes",
  "4x4 or AWD vehicle — strongly recommended for active snowfall on Bhurban approach",
] as const;

export const trafficTips = [
  "Friday/Saturday morning Islamabad → Murree: leave before 8am or after 11am",
  "Day 1 arrival: add 30–45 min buffer on peak weekends",
  "Day 3 departure: leave Bhurban by 3:30pm weekday; +1 hour weekend",
] as const;

export const itineraryFaqs: ItineraryFaq[] = [
  {
    q: "How many days should I spend in Murree?",
    a: "Two nights (three days) is the minimum to cover the essential Murree Hills experience without rushing. The 3-day itinerary above — Murree town Day 1, Nathiagali Day 2, Bhurban and Patriata Day 3 — covers the range of the destination without compressing any part of it. Families with young children often find two nights ideal for managing children's routines away from home.",
  },
  {
    q: "What is the best time to do this Murree 3-day itinerary?",
    a: "April–May and September–November are the optimal months. Spring delivers green landscape and comfortable temperatures. Autumn delivers the clearest skies (best for Nanga Parbat view on Miranjani) and the lightest crowds. The July–August monsoon period makes the Miranjani hike inadvisable (mud, poor visibility) — adjust Day 2 to Ayubia cable car and forest walks rather than the full Miranjani summit.",
  },
  {
    q: "How do I book Himalaya Villas for a 3-day Murree trip?",
    a: `WhatsApp ${SITE_CONTACT.phoneDisplay} with your dates, group size, and whether you want activities pre-arranged (Day 2 guide, bonfire evenings, Kashmir Point chai thermos). A full booking confirmation and pre-arrival activity briefing is provided. 3-night packages start from PKR 120,000 for couples; family and group rates on inquiry.`,
  },
];

export const itineraryRelatedLinks = [
  { href: "/places-to-visit-near-murree", label: "Day trips & Nathiagali" },
  { href: "/outdoor-activities-murree", label: "Outdoor activities" },
  { href: "/things-to-do-in-murree-at-night", label: "Murree at night" },
  { href: "/things-to-do-bhurban-murree", label: "Things to do in Bhurban" },
  { href: "/himalaya-villas-bhurban-murree-rest-house", label: "Himalaya Villas Bhurban" },
  { href: "/contact", label: "Contact & book" },
] as const;
