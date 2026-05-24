export const FAMILY_THINGS_MURREE_PATH = "/family-things-to-do-murree";

export type FamilyFaq = { q: string; a: string };

export const familyVillaHighlights = [
  {
    title: "Private outdoor grounds",
    description: "Safe for children — no road traffic on property. Play and explore on your schedule.",
  },
  {
    title: "Multi-bedroom villas",
    description: "Configurations for families of 4–12 — everyone under one roof, not scattered hotel rooms.",
  },
  {
    title: "In-villa dining",
    description: "Meals at the children's schedule, prepared by the villa kitchen — not the restaurant's.",
  },
  {
    title: "Concierge logistics",
    description: "Patriata timing, transport, packed lunches — arranged before arrival, not day-of scramble.",
  },
] as const;

export const familyActivities = [
  {
    id: "patriata",
    title: "The Patriata Chairlift — The Activity Every Murree Family Remembers",
    badge: "All ages",
    paragraphs: [
      "The Patriata chairlift is the activity that children talk about on the drive home from Murree. The open double cabin ascending over pine-covered slopes, the 20-minute view of the hills opening in every direction, the combination of mild altitude anxiety and genuine exhilaration — it is one of the most distinctively memorable accessible activities in Pakistan.",
      "Himalaya Villas families who visit Patriata on a weekday morning or arrive before 10am on weekends skip the queues that turn the peak Saturday version into a 90-minute wait for a 20-minute experience. The difference is a 25-minute drive from the property at the right time — which the villa team plans around each family's specific schedule.",
    ],
    bullets: [
      "Age: Gondola option for children under 5 or those uncomfortable with the open cabin | Open chairlift suitable ages 5+",
      "Ticket: PKR 300–500 return per person | Children under 3 often complimentary",
      "Best timing from Himalaya Villas: Depart 9am weekday or 7:30am weekend — arrive before the queue forms",
      "In winter: Snow-covered slopes from the chairlift are the most photographed family moment in Murree",
    ],
  },
  {
    id: "sozo",
    title: "Sozo Adventure Park — Structured Activity for Teenagers",
    paragraphs: [
      "For families with teenagers or children aged 10 and above who want structured adventure activity rather than natural trail exploration, Sozo Adventure Park provides a managed multi-activity environment accessible from Bhurban. The park operates zip-lining, climbing walls, rope courses, and seasonal activities in a safe, supervised environment — the opposite of the unmanaged adventure the Bhurban forest trails provide, and the right option for families where the teenagers want structure and the parents want clear safety oversight.",
    ],
    bullets: [
      "Activities: Zip-line | Climbing wall | Rope course | Paintball (seasonal)",
      "Entry: PKR 1,200–2,500 per person depending on activity selection",
      "Age: Best for ages 10+ | Some activities ages 6+ with adult supervision",
      "Transport from Himalaya Villas: Arranged on request by concierge",
    ],
  },
  {
    id: "ayubia",
    title: "Ayubia National Park — The Family Full-Day Trip",
    paragraphs: [
      "A Nathiagali and Ayubia day trip from Himalaya Villas is the best full-day family outing in the Murree Hills. The Ayubia cable car — an enclosed gondola crossing the valley between Dunga Gali and Ayubia — is universally enjoyed by children of all ages: safe, enclosed, and with forest views below that produce the same reaction as the Patriata chairlift but with less altitude anxiety.",
      "After the cable car, the marked forest trail network between Dunga Gali, Ayubia, and Khanspur is suitable for families with children aged 7 and above.",
    ],
    bullets: [
      "Cable car: Enclosed gondola | PKR 200–400 return | All ages | 10 minutes each way",
      "Trail: Easy marked paths between villages | Suitable ages 7+ | 2–4 hour walk options",
      "Picnic: Multiple designated picnic sites within the park — villa kitchen can prepare a packed lunch",
      "Distance from Himalaya Villas: 35 minutes | Depart by 9am for a full day with time to spare",
    ],
  },
  {
    id: "horses",
    title: "Horse Riding — A Murree Ritual for Children",
    paragraphs: [
      "Horse riding near Kashmir Point is a Murree ritual that has not changed in decades — short led rides of 20–30 minutes around the Kashmir Point area, managed by local horse owners, universally enjoyed by children aged 4 and above.",
      "For families wanting longer horse trekking through the Bhurban forest rather than a short led ride in the Kashmir Point area, Himalaya Villas arranges multi-hour forest treks through the Bhurban trail network for families with older children and teenagers.",
    ],
    bullets: [
      "Short ride: PKR 500–800 per 30 minutes | Kashmir Point area | Ages 4+",
      "Forest trekking: 2–3 hour forest trek | PKR 2,000–5,000 per person | Arranged by Himalaya Villas concierge",
    ],
  },
  {
    id: "grounds",
    title: "The Private Grounds — Where Family Holidays Actually Happen",
    paragraphs: [
      "The most undervalued element of a Himalaya Villas family stay is the private outdoor grounds. Children do not need programmed activities for every hour of a mountain trip — they need safe, open outdoor space with nature, and the freedom to use it without parents managing road access or shared hotel logistics.",
      "In winter, the private grounds are where the best children's snow activities happen — snowman building, snowball fights, sledging on the private slope — without the crowded Mall Road competition for snow space. This is the specific advantage of private villa accommodation over hotel rooms that face inward onto a building.",
      "Children whose first mountain memory happens at Himalaya Villas come back as adults. We see it every year.",
    ],
    bullets: [],
  },
] as const;

export const ageGuideRows = [
  {
    activity: "Patriata chairlift (gondola)",
    ages: "All ages / under 5",
    fromProperty: "25 min",
    bestFor: "First-time mountain families",
  },
  {
    activity: "Patriata open chairlift",
    ages: "5+",
    fromProperty: "25 min",
    bestFor: "School-age children",
  },
  {
    activity: "Ayubia cable car",
    ages: "All ages",
    fromProperty: "35 min",
    bestFor: "Toddlers & young children",
  },
  {
    activity: "Ayubia forest trails",
    ages: "7+",
    fromProperty: "35 min",
    bestFor: "Active families",
  },
  {
    activity: "Horse riding (short)",
    ages: "4+",
    fromProperty: "20 min to Kashmir Point",
    bestFor: "Young children",
  },
  {
    activity: "Sozo Adventure Park",
    ages: "10+ (some 6+)",
    fromProperty: "Concierge arranges",
    bestFor: "Teenagers",
  },
  {
    activity: "Private villa grounds",
    ages: "All ages",
    fromProperty: "On property",
    bestFor: "Unstructured play & snow",
  },
] as const;

export const familyFaqs: FamilyFaq[] = [
  {
    q: "What are the best things to do in Murree with children under 10?",
    a: "Patriata chairlift (gondola for under 5s), Ayubia cable car, horse riding near Kashmir Point (ages 4+), private grounds play and snow activities at Himalaya Villas, and the easy forest trail loops in Bhurban (suitable ages 6+ with appropriate footwear). The Himalaya Villas family package includes concierge planning for all of these — the logistics are arranged before you arrive so the trip runs without day-of problem solving.",
  },
  {
    q: "Is Murree suitable for a family with a baby or toddler?",
    a: "Yes, with the right base. Himalaya Villas' private villa configuration means toddlers can sleep, eat, and rest on their own schedule without managing around hotel check-in times or shared dining rooms. The outdoor grounds are safely enclosed. The villa kitchen prepares any meal at any hour. For families with babies, the in-villa environment at Himalaya Villas removes the primary friction points of travelling with very young children.",
  },
  {
    q: "How do I book a family package at Himalaya Villas Bhurban?",
    a: "WhatsApp directly with your dates, number of adults, number of children (and ages), and any specific activity or dietary requirements. A bespoke family package quote covering villa configuration, catering, and activity logistics is provided within 24 hours. The Family Mountain Escape package starts from PKR 80,000 per stay.",
  },
];

export const familyRelatedLinks = [
  { href: "/family-hotels-murree", label: "Family hotels in Murree — villa vs hotel" },
  { href: "/family-tour-murree-himalaya-villas", label: "Family tour at Himalaya Villas" },
  { href: "/things-to-do-in-murree", label: "Complete Murree activities guide" },
  { href: "/things-to-do-in-murree-in-winter", label: "Winter family snow activities" },
  { href: "/murree-hotel-packages", label: "Family Mountain Escape packages" },
] as const;
