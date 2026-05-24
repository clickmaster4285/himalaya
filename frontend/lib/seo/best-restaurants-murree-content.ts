export const BEST_RESTAURANTS_MURREE_PATH = "/best-restaurants-murree";

export type DiningFaq = { q: string; a: string };

export const publicDiningOptions = [
  {
    id: "pc-bhurban",
    title: "Pearl Continental Bhurban",
    subtitle: "Chain fine dining · Most reliable public option in Bhurban",
    description:
      "For Himalaya Villas guests who want a comparison dining experience or a change from in-villa meals, Pearl Continental Bhurban is the Bhurban area's most reliable option — multiple outlets, consistent standards, and outdoor seating with mountain views on select tables.",
    bullets: [
      "Best for: One evening away from the villa · Guests who want full-service restaurant infrastructure",
      "Timing: Reserve for weekend dinners — peak-hour waits are common without booking",
      "View: Outdoor terrace seating available — request when reserving",
    ],
  },
  {
    id: "mall-road",
    title: "Mall Road Murree — Street Food & Dhabas",
    subtitle: "Murree's food identity · Best early morning or evening",
    description:
      "Mall Road is where Murree's famous street food lives — doodh patti chai at coal-fire stalls, bhutta vendors near Kashmir Point, and roadside karahi cooked fresh in woks. The best versions are in the early morning or evening, not Saturday afternoon when crowds peak.",
    bullets: [
      "Doodh patti chai: Clay cups, coal-fire stalls — the defining Murree beverage",
      "Bhutta: Coal-roasted corn with salt and lime",
      "Karahi: Mutton or chicken at Mall Road dhabas — PKR 800–2,000 per person typical",
      "Shopping: Raw mountain honey and Kashmiri dry fruits at bazaar prices",
    ],
  },
  {
    id: "bhurban-local",
    title: "Bhurban Road — Local Family Restaurants",
    subtitle: "Authentic staples · Quick lunch stops",
    description:
      "The Bhurban Road also has several family-run local restaurants serving fresh karahi, daal, and standard Pakistani staples — simpler in presentation but authentic in food quality, PKR 500–1,200 per person. These are best for a quick lunch stop rather than an occasion dinner.",
    bullets: [
      "Best for: Casual lunch between activities · Families wanting simple Pakistani food",
      "Not ideal for: Special-occasion dinners or private celebration meals",
    ],
  },
] as const;

export const inVillaDiningBlocks = [
  {
    title: "Morning on the terrace",
    description:
      "Hot breakfast served on the mountain terrace with the Himalayan ridgeline in front of you and the pine forest below. Paratha, eggs, fruit, chai — made when you want it, not when the kitchen's schedule permits.",
  },
  {
    title: "Evening at your table",
    description:
      "A multi-course dinner at the private table, or a fireside meal on the outdoor terrace if a bonfire is arranged, with the course order and timing entirely in the guests' control.",
  },
  {
    title: "Why guests compare it to Islamabad's best",
    description:
      "Guests who have eaten at the best restaurants in Islamabad and Lahore consistently identify an in-villa dinner at Himalaya Villas as a distinct category of experience — not because the food itself is necessarily better, but because the setting, the privacy, and the complete absence of restaurant logistics create something that no restaurant can sell.",
  },
] as const;

export const diningComparisonRows = [
  {
    factor: "Who is being served",
    restaurant: "Hundreds of guests at peak — volume-managed plates",
    inVilla: "One group only — menu agreed with head chef in advance",
  },
  {
    factor: "Timing",
    restaurant: "Restaurant kitchen schedule and reservation slots",
    inVilla: "Breakfast and dinner when your group is ready",
  },
  {
    factor: "Mountain view",
    restaurant: "Upgrade category or shared terrace at PC",
    inVilla: "270° ridgeline view from private terrace — baseline, not upgrade",
  },
  {
    factor: "Halal",
    restaurant: "Halal standard across Murree establishments",
    inVilla: "Fully Halal-certified — every menu, every occasion, no exception",
  },
  {
    factor: "Privacy",
    restaurant: "Shared dining room, other guests throughout",
    inVilla: "Private terrace or in-villa table — no restaurant logistics",
  },
] as const;

export const famousMurreeFoods = [
  {
    name: "Doodh patti chai",
    detail: "Strong milky tea in clay cups at coal-fire stalls on Mall Road — Murree's most iconic taste.",
  },
  {
    name: "Bhutta",
    detail: "Coal-roasted corn with salt and lime — best from vendors near Kashmir Point.",
  },
  {
    name: "Roadside karahi",
    detail: "Fresh mutton or chicken wok-cooked at Mall Road dhabas — lunch and dinner staple.",
  },
  {
    name: "Mountain honey & dry fruits",
    detail: "Murree bazaar prices for raw honey, walnuts, almonds, and dried apricot — fresher than city markets.",
  },
] as const;

export const diningFaqs: DiningFaq[] = [
  {
    q: "What is the famous food in Murree?",
    a: "Murree's food identity is defined by three street foods: doodh patti chai (strong milky tea served in clay cups at coal-fire stalls on Mall Road), bhutta (coal-roasted corn rubbed with salt and lime, sold by vendors near Kashmir Point), and roadside karahi (mutton or chicken cooked fresh in woks at dhaba restaurants). The best versions of all three are on Mall Road in the early morning or evening. In addition, Murree is one of the best places in Pakistan to buy raw mountain honey and authentic Kashmiri dry fruits.",
  },
  {
    q: "Is all food Halal in Murree?",
    a: "Yes. Virtually all food in Murree and Bhurban is Halal — the area is a conservative Muslim community and Halal compliance is standard across all food establishments. Himalaya Villas' in-villa dining is fully Halal-certified without exception across all menus, all meal occasions, and all guest configurations.",
  },
  {
    q: "What is the best restaurant in Murree with a mountain view?",
    a: "The best dining experience with a mountain view in the Murree Hills is the in-villa terrace at Himalaya Villas in Bhurban — private, Halal, full menu, served at your timing with a 270-degree Himalayan ridgeline view. This is not a public restaurant. It is the dining experience included with every Himalaya Villas stay. For public restaurants with views, Pearl Continental Bhurban's outdoor seating and several Mall Road terrace options are the most referenced options.",
  },
];

export const diningRelatedLinks = [
  { href: "/dining", label: "Himalaya Villas dining experiences" },
  { href: "/himalaya-villas-bhurban-murree-rest-house", label: "Himalaya Villas Bhurban rest house" },
  { href: "/things-to-do-in-murree", label: "Things to do in Murree — full guide" },
  { href: "/family-things-to-do-murree", label: "Family activities & meals" },
  { href: "/book/dining", label: "Book a dining experience" },
] as const;
