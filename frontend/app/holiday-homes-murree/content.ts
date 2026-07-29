export const AUTHOR = {
  name: "Amjad Khan",
  role: "Travel writer covering the Murree Hills",
  bio: "Amjad Khan has hosted and written about stays in the Murree hills since 2019, covering Bhurban, the Galyat, and the practical side of renting whole-property homes in Pakistan's hill stations.",
  lastReviewed: "July 2026",
} as const;

export const WHATSAPP_INLINE =
  "https://wa.me/923045679000?text=Hi%2C%20I%27m%20enquiring%20about%20availability&utm_source=organic&utm_medium=pillar&utm_campaign=holiday-homes-murree&utm_content=inline-cta";

export const WHATSAPP_CLOSING =
  "https://wa.me/923045679000?text=Hi%2C%20I%27m%20enquiring%20about%20availability&utm_source=organic&utm_medium=pillar&utm_campaign=holiday-homes-murree&utm_content=closing-cta";

export const TERMINOLOGY_ROWS = [
  {
    type: "Holiday home / villa",
    what: "The entire building, exclusive to your group, with kitchen and lounge",
    size: "2–6 bedrooms",
    best: "Families, multi-family groups, extended families",
  },
  {
    type: "Cottage",
    what: "Usually the whole structure, but smaller and often older stock",
    size: "1–3 bedrooms",
    best: "Couples, small families",
  },
  {
    type: "Guest house",
    what: "A private room, shared building, shared common areas",
    size: "Per room",
    best: "Couples, solo travellers, short stopovers",
  },
  {
    type: "Serviced apartment",
    what: "A self-contained flat inside a larger block",
    size: "1–3 bedrooms",
    best: "Longer stays, working visits",
  },
  {
    type: "Hotel",
    what: "A room with daily housekeeping and a restaurant",
    size: "Per room",
    best: "One or two nights, no self-catering",
  },
] as const;

export const RATE_ROWS = [
  {
    size: "1–2 bedroom cottage",
    offPeak: "PKR 12,000 – 20,000",
    season: "PKR 20,000 – 35,000",
    peak: "PKR 35,000 – 55,000",
  },
  {
    size: "3 bedroom house",
    offPeak: "PKR 22,000 – 38,000",
    season: "PKR 38,000 – 60,000",
    peak: "PKR 60,000 – 95,000",
  },
  {
    size: "4–5 bedroom villa",
    offPeak: "PKR 45,000 – 75,000",
    season: "PKR 75,000 – 120,000",
    peak: "PKR 120,000 – 190,000",
  },
  {
    size: "Private estate, multiple villas",
    offPeak: "On request",
    season: "On request",
    peak: "On request",
  },
] as const;

export const BOOKING_CHANNELS = [
  {
    channel: "Direct with the owner (usually WhatsApp)",
    strengths:
      "Best rate — no platform fee. You speak to whoever actually runs the house and can ask the infrastructure questions above.",
    watch: "Verify the property is real before transferring anything. Ask for a video call walkthrough.",
  },
  {
    channel: "Airbnb",
    strengths:
      "Photographs, verified reviews, payment protection, cancellation terms in writing.",
    watch: "Service fee. Murree inventory is thin at the luxury end and heavily weighted to small cottages.",
  },
  {
    channel: "Booking.com / Agoda",
    strengths:
      "Familiar interface, free-cancellation options, good for comparing.",
    watch: "Whole-property inventory is limited; most Murree listings are hotels and guest houses.",
  },
  {
    channel: "Local agents and Facebook groups",
    strengths: "Access to houses not listed anywhere online.",
    watch: "No recourse of any kind if the booking fails. Highest risk in this market.",
  },
] as const;

export const SEASON_ROWS = [
  {
    season: "March – April",
    conditions: "Cool, unsettled, occasional late snow at altitude. Blossom in the valleys.",
    good: "The best value in the calendar. Rates are at their floor and the town is empty.",
  },
  {
    season: "May – June",
    conditions: "Mild days, cold evenings, long clear views before the monsoon haze.",
    good: "The most reliably pleasant stretch of the year. Book four weeks ahead.",
  },
  {
    season: "July – August",
    conditions: "Monsoon. Warm, wet, frequently fogged in. Peak domestic tourism.",
    good: "Escaping plains heat. Expect crowds, traffic and peak pricing.",
  },
  {
    season: "September – October",
    conditions: "Clear, dry, cool. Arguably the finest weather Murree gets.",
    good: "Walking, views, photography. Underrated and underbooked.",
  },
  {
    season: "November",
    conditions: "Cold, bare, quiet. Snow not yet reliable.",
    good: "Solitude at low rates, if you do not mind grey.",
  },
  {
    season: "December – February",
    conditions: "Snow, sub-zero nights, road closures possible.",
    good: "The snowfall trip. Highest rates and highest risk of disruption.",
  },
] as const;

export const VETTING_POINTS = [
  {
    title: "Heating, and how it is actually powered",
    text: "Murree drops below freezing regularly from December to February and can be cold enough to need heating well into April. Ask specifically what the heating is: gas heaters, electric radiators, a wood stove, or central heating. Then ask the follow-up question — what happens when the gas pressure drops. Low winter gas pressure is a routine occurrence in the hills, and a house that relies solely on gas heating becomes uninhabitable on exactly the nights you most wanted to be there.",
  },
  {
    title: "Water storage",
    text: "Municipal supply is intermittent across the hills. Every serious property runs on stored water in overhead and underground tanks, topped up by tanker when required. The question to ask is capacity in litres and how frequently tankers come. A house with a small tank and a full occupancy of twelve people will run out on day two, and there is no fixing that mid-stay.",
  },
  {
    title: "Power backup",
    text: "Load-shedding is less severe than it was, but winter storms bring lines down and outages of several hours are normal. Ask whether the backup is a generator or a UPS, and what it actually runs. A UPS that keeps the lights on is not the same as a generator that keeps the water pump and the heaters running.",
  },
  {
    title: "Road access in snow",
    text: "The most common way a Murree booking goes wrong. Many houses sit on steep private approaches that a two-wheel-drive saloon cannot climb on snow or ice. Ask directly: can a normal car reach the door in January, and if not, how far is the walk and who carries the luggage. Reputable operators answer this honestly and arrange a 4×4 transfer.",
  },
  {
    title: "Who is actually there",
    text: "A holiday home with no staff on site means you cook, you clean, and you solve any problem yourself at ten at night. That suits some groups perfectly. Others expect a caretaker, a cook, and someone who answers the phone. Neither is better — but find out which one you are booking.",
  },
  {
    title: "The kitchen, in detail",
    text: "\"Fully equipped kitchen\" covers everything from a professional range to a two-burner hotplate and four mismatched plates. If you intend to cook for a group, ask for a photograph of the kitchen and confirm cookware, crockery for your group size, and whether there is a working oven.",
  },
] as const;

export const FAQS = [
  {
    q: "What are the best holiday homes to rent in Murree?",
    a: "The best option depends on group size. Families of four to eight are best served by a three-bedroom house in Bhurban or Kuldana. Larger groups need a villa or a whole estate. Prioritise heating, water storage and winter road access over photographs — those determine whether the stay works.",
  },
  {
    q: "What are the popular areas for holiday homes in Murree?",
    a: "Bhurban is the quietest and holds most of the better-built houses. Kashmir Point and Pindi Point offer the strongest views but the worst traffic. Patriata gets deeper snow. Kuldana and Sunny Bank are the practical mid-range. Ayubia and Nathia Gali sit higher and greener, an hour further on.",
  },
  {
    q: "Are there affordable holiday home rentals in Murree with mountain views?",
    a: "Yes. One and two-bedroom cottages with valley views run from about PKR 12,000 to 20,000 per night midweek off-peak. The best value is March to April and midweek in October. Rates in these bands rise sharply on weekends, over Eid and after the first heavy snowfall.",
  },
  {
    q: "Which websites are recommended for holiday home rentals in Murree?",
    a: "Airbnb carries the widest whole-property inventory with verified reviews and payment protection. Booking.com and Agoda list more hotels than houses. Booking direct with an owner over WhatsApp gives the best rate because no platform fee applies, but requires verifying the property first with a live video walkthrough.",
  },
  {
    q: "What are the top-rated holiday home options in Murree for family vacations?",
    a: "Families should look for whole-property rentals with a working kitchen, on-site staff, enclosed outdoor space and confirmed heating. Bhurban is the strongest area for family stays because road access holds year-round. For multi-family groups, an estate that books to one group at a time removes the scattering problem entirely.",
  },
  {
    q: "What is the average weekly rental cost for a three-bedroom holiday home in Murree?",
    a: "A three-bedroom house runs roughly PKR 22,000 to 38,000 per night off-peak, so a week falls between PKR 154,000 and 266,000. In-season weekly rates reach PKR 420,000, and peak Eid or snowfall weeks higher. Most owners discount thirty to forty per cent on stays of three nights or more.",
  },
  {
    q: "How do you book a luxury holiday home in Murree online?",
    a: "Either through a platform such as Airbnb, which handles payment and cancellation terms, or directly with the owner over WhatsApp, which avoids the service fee. For direct bookings, request a live video walkthrough, get an exact location pin, confirm the refund policy in writing and pay a partial deposit.",
  },
  {
    q: "Are there pet-friendly holiday homes in Murree?",
    a: "A small number of whole-property rentals accept pets, and they are far more common than pet-friendly hotels in the region. Policies are rarely stated on listings, so ask directly and get confirmation in writing. Expect a cleaning surcharge and restrictions on which rooms the animal may enter.",
  },
  {
    q: "Are there holiday homes in Murree with private gardens and parking?",
    a: "Yes, and both are more available outside Murree town than inside it. Bhurban and the Expressway corridor have space for enclosed lawns and off-road parking. Within Murree town, particularly around the Mall and Kashmir Point, private parking is scarce and worth confirming before booking in peak season.",
  },
  {
    q: "How do I book a holiday home in Murree for a family vacation?",
    a: "Set your group size first, then filter for whole-property rentals rather than rooms. Confirm bedroom count, heating type, water tank capacity and winter road access. Book at least four weeks ahead for May, June and October, and considerably further ahead for Eid weekends or snowfall dates.",
  },
  {
    q: 'Is "Holiday Homes Murree" a rental or a housing scheme?',
    a: "Both names exist. Holiday Homes Murree is also a residential plot development on the Murree Expressway, sold on instalment plans to investors. It is unrelated to short-term rentals. If you are searching to stay rather than to buy, look for whole-property holiday rentals or villas instead.",
  },
  {
    q: "How far is Murree from Islamabad?",
    a: "Murree is roughly sixty kilometres from Islamabad, about an hour to the Murree Expressway exit in clear conditions. The final climb takes considerably longer in peak season or snow. Bhurban sits nine kilometres below Murree town and is generally quicker to reach than the town centre itself.",
  },
  {
    q: "What is the minimum stay for a holiday home in Murree?",
    a: "Most owners require two nights on weekends and over Eid, and many accept single nights midweek off-peak. A two-night minimum is usually in the guest's interest anyway — a single night in a self-catering house is largely consumed by driving, check-in and check-out.",
  },
  {
    q: "Do holiday homes in Murree have backup power and heating in winter?",
    a: "The better ones do, but it varies enormously and is rarely stated on listings. Ask specifically whether backup is a generator or a UPS, and what it runs — a UPS that powers lights will not run water pumps or heaters. Also ask what happens when winter gas pressure drops.",
  },
] as const;

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Holiday Homes in Murree: What They Cost, Where to Find Them, and How to Book",
  description:
    "A practical guide to renting a holiday home in Murree - areas, nightly rates, seasonal timing, and how to book safely.",
  image: "https://himalayavillas.com/assets/gallery-exterior.jpg",
  author: {
    "@type": "Person",
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: "https://himalayavillas.com/about/amjad-khan",
  },
  publisher: {
    "@type": "Organization",
    name: "Himalaya Villas",
    logo: {
      "@type": "ImageObject",
      url: "https://himalayavillas.com/assets/himalaya-logo.png",
    },
  },
  datePublished: "2026-07-29",
  dateModified: "2026-07-29",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://himalayavillas.com/holiday-homes-murree",
  },
};

export const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://himalayavillas.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Murree Travel Guides",
      item: "https://himalayavillas.com/best-hotels-murree-pakistan",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Holiday Homes in Murree",
      item: "https://himalayavillas.com/holiday-homes-murree",
    },
  ],
};
