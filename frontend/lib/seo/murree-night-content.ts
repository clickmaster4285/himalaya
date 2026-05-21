import { SITE_CONTACT } from "@/lib/site-contact";

export const MURREE_NIGHT_PATH = "/things-to-do-in-murree-at-night";

export type NightFaq = { q: string; a: string };

export const murreeAfterDark = [
  "Mall Road shops and food stalls: Active until 10–11pm in peak season",
  "Stargazing: Best from Himalaya Villas terrace | Milky Way visible Oct–March on clear nights",
  "Private bonfire: Arranged by Himalaya Villas villa host | Year-round | Most atmospheric in winter",
  "Temperature after sunset: Drops 8–12°C — always bring warm layers for evening outdoor time",
  `Booking: WhatsApp ${SITE_CONTACT.phoneDisplay} — request bonfire evening in your booking message`,
] as const;

export const bonfireNightBullets = [
  "Arrangement: Include 'bonfire evening' in your WhatsApp booking message — set up before arrival",
  "Timing: Typically 8pm–11pm | Earlier in winter for maximum atmosphere",
  "Food: Full fireside menu from villa kitchen on request — snacks to multi-course",
  "Best season: Winter (January–February snowfall evenings) and autumn (October–November clear nights)",
] as const;

export const stargazingBullets = [
  "Best months: October, November, December, January, February, March — in order of typical clarity",
  "Best conditions: New moon phase + no cloud cover + the night after a storm has cleared",
  "Equipment: No telescope needed for Milky Way visibility | Binoculars enhance star clusters",
  "From Himalaya Villas: Directly from the outdoor terrace — no transport required",
] as const;

export const mallRoadNightBullets = [
  "Best timing: 6:30pm–9:30pm in summer | 5:30pm–8:30pm in autumn and winter",
  "From Himalaya Villas: 15 min drive | Return by 9:30–10pm for bonfire/stargazing evening",
] as const;

export const kashmirSunsetBullets = [
  "Best sunset months: October and November — clearest atmosphere, most dramatic light angle",
  "Crowd status at sunset: Significantly lower than midday",
  "From Himalaya Villas: 20 min drive | Depart 45 min before sunset for optimal timing",
] as const;

export const eveningTimeline = [
  { time: "6:00pm", title: "Expressway clears", detail: "Day-trippers leave; viewpoints and Mall Road shift to evening pace." },
  { time: "6:30–9:00pm", title: "Mall Road evening", detail: "Chai at coal-fire stalls, dry fruit and honey, slow walk church end to bazaar end." },
  { time: "5:30–6:30pm", title: "Kashmir Point sunset", detail: "Golden hour with fewer crowds — depart villa 45 min before sunset." },
  { time: "9:00pm+", title: "Bhurban — bonfire & stars", detail: "Private fire on terrace; Milky Way on clear Oct–Mar nights without leaving the property." },
] as const;

export const eveningComparison = [
  { place: "Mall Road evening", vibe: "Food culture, vendors, architecture in evening light", bestFor: "Street food, shopping, people-watching" },
  { place: "Himalaya Villas Bhurban", vibe: "Pine forest silence, private fire, terrace stargazing", bestFor: "The mountain after dark — what most visitors never get" },
] as const;

export const nightFaqs: NightFaq[] = [
  {
    q: "What is there to do in Murree at night?",
    a: "The best Murree night activities: private bonfire at Himalaya Villas (arranged on request, year-round), Mall Road evening walk and street food (active until 10–11pm in peak season), stargazing from the Himalaya Villas mountain terrace (October–March), sunset at Kashmir Point (arrive 45 minutes before sunset), and in-villa dinner served on the mountain terrace. Murree does not have nightclubs or late-night entertainment — its evening character is defined by mountain silence, private fire, and food culture that works in cool air.",
  },
  {
    q: "Does Murree have nightlife?",
    a: "Murree has evening activity — Mall Road food and shop culture until 10pm, restaurant dining, and for guests at Himalaya Villas, bonfire evenings and stargazing that constitute a private version of nightlife more memorable than any urban equivalent. It does not have clubs or late entertainment venues. If that is what you are looking for, Murree is not that destination. If a mountain evening with a private fire is what you are looking for, Murree — from Himalaya Villas — provides it exactly.",
  },
  {
    q: "Is Murree safe at night?",
    a: "Yes. Mall Road is well-lit and actively patrolled, busy with vendors and visitors until late in peak season. The Bhurban area is quiet at night — appropriate to a private villa setting — and safe for outdoor activity on the property grounds. Standard precautions apply for any unfamiliar area.",
  },
];

export const nightRelatedLinks = [
  { href: "/things-to-do-in-murree-for-couples", label: "Romantic guide for couples" },
  { href: "/things-to-do-in-murree", label: "Things to do in Murree 2026" },
  { href: "/best-restaurants-murree", label: "Dining & Mall Road food" },
  { href: "/murree-3-day-itinerary", label: "3-day itinerary" },
  { href: "/things-to-do-in-murree-in-winter", label: "Winter evenings & snow" },
  { href: "/contact", label: "Contact & book" },
] as const;
