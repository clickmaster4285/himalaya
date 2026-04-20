export type UniversalFaq = {
  q: string;
  a: string;
};

export const UNIVERSAL_FAQS: UniversalFaq[] = [
  {
    q: "What is special in Bhurban?",
    a: "Bhurban sits high in the Murree Hills with pine forests, cool climate, and panoramic mountain views. Its biggest advantage is premium privacy close to Islamabad. Himalaya Villas offers a private villa-style experience instead of crowded hotel-floor travel. For bookings and personalized arrangements, contact us on WhatsApp: +92 304 567 9080.",
  },
  {
    q: "What is Bhurban known for?",
    a: "Bhurban is known for scenic hill landscapes, cooler weather, and premium mountain stays in the Murree region. Travelers choose it for family trips, couple escapes, and curated private retreats away from city pressure. Himalaya Villas is known for private accommodation and tailored guest support. Enquire on WhatsApp: +92 304 567 9080.",
  },
  {
    q: "What is the best time to visit Bhurban?",
    a: "April to October is best for outdoor views, pleasant temperatures, and smooth travel flow. Summer is green and lively, while winter offers cold-weather charm and occasional snow experience. Bhurban works year-round when the stay is planned around weather and trip type. For date guidance and booking support: +92 304 567 9080.",
  },
  {
    q: "What is the ideal month to visit Murree?",
    a: "June, July, and August are peak months for Murree and Bhurban because of lush scenery and mild weather. For quieter roads and more privacy, September and October are often preferred by premium travelers. Your best month depends on crowd preference and travel purpose. Check live availability: +92 304 567 9080.",
  },
  {
    q: "Which is the most beautiful place in Murree?",
    a: "Many travelers rank Bhurban among the most beautiful parts of the Murree Hills due to elevation, forest density, and wide valley views. It offers a calmer and more private environment than central crowded zones. For guests prioritizing scenery and comfort, Bhurban is often the strongest choice. Bookings: +92 304 567 9080.",
  },
  {
    q: "Is Bhurban safe for families and guests?",
    a: "Yes, Bhurban is generally considered safe for family travel and premium leisure stays. The area supports regular tourism and hospitality infrastructure, and private villa environments add another layer of comfort and control. At Himalaya Villas, on-property staff and support remain available throughout stay periods. Safety support: +92 304 567 9080.",
  },
  {
    q: "Which city is Bhurban near?",
    a: "Bhurban is in Murree Tehsil, Rawalpindi District, Punjab. It is roughly 55 km from Islamabad (about 45 to 60 minutes by road in regular conditions) and around 270 km from Lahore (about 3.5 to 4 hours depending on route and traffic). Route guidance is provided after booking confirmation.",
  },
  {
    q: "What dining options are available at luxury Bhurban resorts?",
    a: "Premium Bhurban stays usually offer private-style dining options including breakfast, lunch, and curated dinner experiences. At Himalaya Villas, guests can request mountain-view meals and customized planning based on stay profile. All menus are halal-oriented and can be adjusted for guest preferences. Dining enquiries: +92 304 567 9080.",
  },
  {
    q: "What are the top-rated resorts in Bhurban?",
    a: "Bhurban has established hospitality options, but the best fit depends on whether you want standard hotel convenience or private villa-style exclusivity. Travelers seeking space, privacy, and tailored support often prefer private stay formats. Always compare location quality, service responsiveness, and verified reviews before booking. Enquiries: +92 304 567 9080.",
  },
  {
    q: "Which resorts in Bhurban offer spa and wellness packages?",
    a: "Wellness availability varies by property and season. Premium guests usually look for private sessions, slower scheduling, and a calm environment rather than crowded facilities. If wellness is part of your trip goal, request package details before confirming dates so the experience matches your expectations. Plan your stay: +92 304 567 9080.",
  },
  {
    q: "What is the average cost of a weekend stay at a premium Bhurban resort?",
    a: "Weekend pricing in Bhurban depends on villa type, group size, season, and inclusions. Premium mountain stays generally range from mid to high segments, with private-villa options priced higher than standard rooms due to privacy and space value. For accurate rates, request direct pricing for your dates. WhatsApp: +92 304 567 9080.",
  },
  {
    q: "Are there family-friendly luxury resorts in Bhurban?",
    a: "Yes. Family-friendly luxury stays in Bhurban usually offer larger room configurations, safer movement spaces, and flexible dining and support flow. Private villa formats are especially suitable for families of different age groups because they combine comfort with control. For family package planning and availability checks, contact: +92 304 567 9080.",
  },
  {
    q: "How do I book a luxury stay in Bhurban online?",
    a: "You can book directly via WhatsApp or through the website contact flow. Direct booking is recommended because it allows date coordination, dietary requests, and pre-arrival planning in one conversation. For fastest response, send your dates and guest count on WhatsApp: +92 304 567 9080.",
  },
  {
    q: "What room types are available at premium Bhurban resorts?",
    a: "Premium Bhurban stays usually offer multiple configurations including couple suites, family villas, and larger private group options. The best room type depends on guest count, stay purpose, and privacy requirements. If you share your travel plan, the team can suggest the right fit quickly.",
  },
  {
    q: "Are all meal options halal and can dietary requests be handled?",
    a: "Yes, meal planning follows halal standards, and vegetarian or custom dietary preferences can be handled with prior notice. Sharing dietary needs before arrival helps the culinary team prepare smoothly and avoid service delays during your stay.",
  },
  {
    q: "Can I arrange airport transfer from Islamabad to Bhurban?",
    a: "Yes. Private transfer support can be arranged from Islamabad Airport and city pickup points. Travel time is usually around 45 to 90 minutes depending on weather and traffic. Confirm transfer details when finalizing your booking.",
  },
  {
    q: "Are corporate retreats available in Bhurban?",
    a: "Yes. Bhurban is a strong destination for executive offsites and strategy retreats because it combines privacy with practical accessibility. Teams usually book 2 to 4 day formats with meeting blocks, dining, and stay services in one plan.",
  },
  {
    q: "Can I host weddings or private events in Bhurban?",
    a: "Yes. Destination weddings, family celebrations, and private milestone events can be hosted with planning support for setup, hospitality, and guest flow. Early booking is recommended for prime seasonal dates.",
  },
  {
    q: "What amenities should I compare before selecting a resort?",
    a: "Compare privacy level, room configuration, mountain-view quality, support responsiveness, dining flexibility, and activity access. These factors impact trip quality more than marketing headlines and help avoid booking mismatches.",
  },
];

function sanitizeFaqs(list: UniversalFaq[]): UniversalFaq[] {
  const seen = new Set<string>();
  const out: UniversalFaq[] = [];

  for (const item of list) {
    const q = item.q.trim();
    const a = item.a.trim();
    if (!q || !a) continue;
    const key = q.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ q, a });
  }

  return out;
}

const FAQ_SET_BY_PATH: Record<string, string[]> = {
  home: [
    "What is special in Bhurban?",
    "What is Bhurban known for?",
    "What is the best time to visit Bhurban?",
    "Which is the most beautiful place in Murree?",
    "Is Bhurban safe for families and guests?",
  ],
  villas: [
    "Are there family-friendly luxury resorts in Bhurban?",
    "What room types are available at premium Bhurban resorts?",
    "What is the average cost of a weekend stay at a premium Bhurban resort?",
    "What amenities should I compare before selecting a resort?",
    "What dining options are available at luxury Bhurban resorts?",
  ],
  blog: [
    "What is the ideal month to visit Murree?",
    "Which city is Bhurban near?",
    "How do I book a luxury stay in Bhurban online?",
    "Can I arrange airport transfer from Islamabad to Bhurban?",
    "Are all meal options halal and can dietary requests be handled?",
  ],
  booking: [
    "How do I book a luxury stay in Bhurban online?",
    "What room types are available at premium Bhurban resorts?",
    "Are all meal options halal and can dietary requests be handled?",
    "Can I arrange airport transfer from Islamabad to Bhurban?",
    "What is the average cost of a weekend stay at a premium Bhurban resort?",
  ],
  experience: [
    "What is Bhurban known for?",
    "What is the best time to visit Bhurban?",
    "Are corporate retreats available in Bhurban?",
    "Can I host weddings or private events in Bhurban?",
    "What dining options are available at luxury Bhurban resorts?",
  ],
};

function detectFaqGroup(pathname: string): keyof typeof FAQ_SET_BY_PATH {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/villas")) return "villas";
  if (pathname.startsWith("/blog") || pathname.startsWith("/blogs")) return "blog";
  if (pathname.startsWith("/book")) return "booking";
  return "experience";
}

export function getValidatedUniversalFaqsForPath(pathname: string, limit = 5): UniversalFaq[] {
  const all = sanitizeFaqs(UNIVERSAL_FAQS);
  const group = detectFaqGroup(pathname);
  const selectedQuestions = FAQ_SET_BY_PATH[group];

  const selected = selectedQuestions
    .map((q) => all.find((faq) => faq.q === q))
    .filter((faq): faq is UniversalFaq => Boolean(faq))
    .slice(0, limit);

  if (selected.length >= limit) return selected;

  const selectedSet = new Set(selected.map((x) => x.q));
  for (const faq of all) {
    if (selectedSet.has(faq.q)) continue;
    selected.push(faq);
    selectedSet.add(faq.q);
    if (selected.length >= limit) break;
  }

  return selected;
}

