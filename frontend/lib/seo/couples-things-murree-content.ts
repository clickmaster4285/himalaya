import { SITE_CONTACT } from "@/lib/site-contact";

export const COUPLES_THINGS_MURREE_PATH = "/things-to-do-in-murree-for-couples";

export type CouplesFaq = { q: string; a: string };

export const couplesPackages = [
  {
    name: "Honeymoon Sanctuary",
    price: "From PKR 75,000",
    includes: "Suite with ridgeline view | Romantic dinner | Bonfire | Late checkout",
  },
  {
    name: "Couples Weekend Escape",
    price: "From PKR 55,000",
    includes: "Villa | Mountain terrace | In-villa dinner | Kashmir Point sunrise",
  },
  {
    name: "Anniversary Package",
    price: "From PKR 65,000",
    includes: "Personalized celebration setup | Bonfire | Sunrise portrait session",
  },
] as const;

export const kashmirPointDawn = [
  "Departure from villa: 5:15am | Arrival at Kashmir Point: 5:45am",
  "What to bring: Warm layers (cold before sunrise) | Camera | Chai thermos prepared by villa kitchen",
  "Return: Back for terrace breakfast by 8am",
] as const;

export const pindiPointSunset = [
  "From Himalaya Villas: 15 min drive | Depart 4pm for optimal golden hour timing",
  "Duration: 1.5–2 hours walk + viewpoint time",
  "Best months: April–May and October–November",
] as const;

export const inVillaDiningBullets = [
  "Menu: Full Pakistani and continental | Fully Halal | Customized on request",
  "Setting: Terrace with ridgeline view (summer/autumn) | Fireplace table (winter)",
  "Special setups: Floral arrangement | Candlelight | Anniversary/honeymoon specific décor on request",
] as const;

export const romanticExperienceCards = [
  {
    title: "Kashmir Point at dawn",
    description: "Empty viewpoint, horizontal gold light, chai thermos from the villa kitchen — back for breakfast before Expressway traffic.",
  },
  {
    title: "Mountain terrace sunrise",
    description: "Ridgeline light sequence from grey to rose to gold — earliest breakfast served on the terrace, no drive required.",
  },
  {
    title: "Private bonfire evening",
    description: "Fireside dinner at your pace, pine forest surround, no crowd noise — most powerful on snowfall evenings in Jan–Feb.",
  },
  {
    title: "Pindi Point at sunset",
    description: "Golden-hour forest loop for two, returning to the viewpoint as valley light fades — extraordinary in Oct–Nov.",
  },
] as const;

export const couplesWeekendTimeline = [
  { time: "Friday 6pm", event: "Arrive Bhurban — bonfire and in-villa dinner arranged before you reach the terrace." },
  { time: "Saturday 5:15am", event: "Drive to Kashmir Point — empty ridge, thermos chai, return for terrace breakfast by 8am." },
  { time: "Saturday 4pm", event: "Pindi Point forest walk at golden hour — photography light in autumn." },
  { time: "Saturday evening", event: "Custom in-villa dinner — chef consult completed before stay." },
  { time: "Sunday", event: "Terrace sunrise without alarm, late checkout on package bookings." },
] as const;

export const privacyComparison = [
  { aspect: "Morning viewpoint", hotel: "Shared access, vendors by 8am", villa: "Kashmir Point at 5:45am from Bhurban" },
  { aspect: "Evening dinner", hotel: "Restaurant floor, other tables", villa: "Terrace or fireplace table, just you two" },
  { aspect: "Outdoor evening", hotel: "Lobby or public lawn", villa: "Private bonfire on your terrace" },
  { aspect: "Forest walk", hotel: "Drive + car park logistics", villa: "Trails from the gate in five minutes" },
] as const;

export const winterCouplesAddOns = [
  "Snowfall forest walk from the property gate at dawn — pine branches in fresh snow",
  "Bonfire on snowfall evenings — the experience guests cite most in winter feedback",
  "Fireplace-table dinner when terrace weather is too cold",
] as const;

export const couplesFaqs: CouplesFaq[] = [
  {
    q: "What are the most romantic activities in Murree for couples?",
    a: "Sunrise at Kashmir Point before 6am (empty, golden, private), private bonfire evening at Himalaya Villas with in-villa dinner, Pindi Point sunset forest walk, mountain terrace stargazing, in-villa private dining, and — in winter — the snowfall forest walk from the property gate at dawn. Every activity on this list is accessible only from a base that provides private outdoor space. Himalaya Villas is that base.",
  },
  {
    q: "Where should a couple stay in Murree for a romantic trip?",
    a: `Himalaya Villas in Bhurban — private villa, mountain terrace, in-villa dining, bonfire evenings, and no shared spaces. The Honeymoon Sanctuary package includes the suite with ridgeline views, romantic dinner setup, bonfire, and late checkout. Book direct via WhatsApp ${SITE_CONTACT.phoneDisplay}.`,
  },
  {
    q: "What is the best romantic experience near Islamabad for couples?",
    a: "Himalaya Villas in Bhurban, Murree Hills — 45 minutes from Islamabad, private mountain estate, all the elements that make a couple's escape genuinely memorable rather than a hotel weekend that could have happened anywhere. The private bonfire, the Kashmir Point sunrise, the mountain terrace dinner: none of these require more than a single overnight booking to experience.",
  },
];

export const couplesRelatedLinks = [
  { href: "/romantic-hotels-murree", label: "Romantic hotels in Murree" },
  { href: "/outdoor-activities-murree", label: "Outdoor activities & hiking" },
  { href: "/best-restaurants-murree", label: "Dining guide" },
  { href: "/things-to-do-in-murree-in-winter", label: "Winter for couples" },
  { href: "/places-to-visit-near-murree", label: "Day trips from Bhurban" },
  { href: "/contact", label: "Contact & book" },
] as const;
