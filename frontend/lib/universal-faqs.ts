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
];

export function getValidatedUniversalFaqs(limit = 12): UniversalFaq[] {
  const seen = new Set<string>();
  const out: UniversalFaq[] = [];

  for (const item of UNIVERSAL_FAQS) {
    const q = item.q.trim();
    const a = item.a.trim();
    if (!q || !a) continue;
    const key = q.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ q, a });
    if (out.length >= limit) break;
  }

  return out;
}

