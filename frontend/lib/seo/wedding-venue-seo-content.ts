export type WeddingFaq = { q: string; a: string };

export type WeddingTable = {
  title: string;
  description?: string;
  headers: string[];
  rows: string[][];
  note?: string;
  highlightColumn?: number;
};

export type WeddingVenueSpace = {
  title: string;
  description: string;
  bullets: string[];
};

export type WeddingSubsection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  link?: { href: string; label: string };
};

export type WeddingSection = {
  title: string;
  paragraphs: string[];
  subsections?: WeddingSubsection[];
  link?: { href: string; label: string };
};

export type WeddingCta = {
  eyebrow: string;
  title: string;
  subtitle: string;
  whatsappMessage: string;
};

export type ClusterLink = {
  href: string;
  title: string;
  description: string;
};

export type WeddingPageConfig = {
  path: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    h1ImageAlt: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    h1Accent?: string;
    subtitle: string;
    stats?: { value: string; label: string }[];
  };
  heroImage: string;
  quickFacts?: { label: string; value: string }[];
  intro?: string[];
  sections: WeddingSection[];
  tables?: WeddingTable[];
  venueSpaces?: WeddingVenueSpace[];
  ctas: WeddingCta[];
  faqs: WeddingFaq[];
  clusterLinks?: ClusterLink[];
  clusterSectionTitle?: string;
  pillarBackLink?: { href: string; label: string };
  schema: {
    breadcrumbName: string;
    eventName: string;
    eventType?: string;
    includeLodging?: boolean;
    includeOffers?: boolean;
  };
};

export const weddingClusterLinks: ClusterLink[] = [
  {
    href: "/outdoor-wedding-venue-murree",
    title: "Outdoor Wedding Venue Murree",
    description: "Mountain terrace ceremonies, private lawn receptions, and full outdoor setups with Himalayan views.",
  },
  {
    href: "/wedding-packages-murree-prices",
    title: "Wedding Packages & Prices",
    description: "Complete pricing for nikkah, walima, mehndi, and multi-day wedding bundles at Himalaya Villas.",
  },
  {
    href: "/nikah-venue-bhurban",
    title: "Nikah Venue Bhurban Murree",
    description: "Private mountain nikkah ceremonies — intimate terrace settings 45 minutes from Islamabad.",
  },
  {
    href: "/walima-hall-murree",
    title: "Walima Hall Murree",
    description: "Luxury walima receptions for up to 300 guests with full Halal catering and marquee provision.",
  },
];

const sharedStats = [
  { value: "45 min", label: "From Islamabad" },
  { value: "6,500 ft", label: "Elevation" },
  { value: "300+", label: "Max guests" },
];

export const marriageHallPillarConfig: WeddingPageConfig = {
  path: "/marriage-hall-bhurban-murree",
  meta: {
    title:
      "Marriage Hall Bhurban Murree | Luxury Wedding Venue in Murree Hills | Himalaya Villas",
    description:
      "Himalaya Villas — Bhurban Murree's most exclusive marriage hall and wedding venue. Private mountain setting, panoramic Himalayan views, full event management. 45 minutes from Islamabad. WhatsApp to check dates.",
    keywords: [
      "marriage hall Bhurban Murree",
      "wedding venue Murree",
      "wedding hall near Islamabad",
      "outdoor wedding venue Murree Hills",
      "mountain wedding Pakistan",
      "marriage hall near Islamabad",
      "event hall Bhurban",
      "luxury wedding venue Pakistan",
      "wedding ceremony venue Murree",
      "wedding hall Bhurban",
    ],
    h1ImageAlt:
      "Marriage hall Bhurban Murree — Himalaya Villas luxury outdoor wedding venue with Himalayan mountain views",
  },
  hero: {
    eyebrow: "Himalaya Villas · Bhurban, Murree Hills · Wedding Hub",
    h1: "Marriage Hall Bhurban Murree —",
    h1Accent: "Pakistan's Most Exclusive Mountain Wedding Venue",
    subtitle:
      "Private Venues for Nikkah, Walima & Celebrations — panoramic Himalayan views, dedicated event spaces, 45 minutes from Islamabad.",
    stats: sharedStats,
  },
  heroImage: "/assets/gallery-exterior.jpg",
  quickFacts: [
    { label: "Setting", value: "Private mountain estate, Bhurban — 6,500 ft" },
    { label: "Capacity", value: "20 guests (intimate) to 300+ (full marquee)" },
    { label: "Venues", value: "Outdoor terrace · Private lawn · Indoor banquet" },
    { label: "Events", value: "Nikkah · Walima · Mehndi · Engagement · Corporate" },
    { label: "Distance", value: "45–60 min Islamabad · 40–50 min Rawalpindi" },
  ],
  intro: [
    "When you imagine the perfect wedding — the one guests remember for years, photographs unlike any other Pakistani wedding, a ceremony that feels earned rather than staged — the setting is almost always the deciding factor. Himalaya Villas is the marriage hall and wedding venue in Bhurban, Murree Hills that makes that vision possible: a private mountain property with panoramic Himalayan views, dedicated event spaces, and an environment no city banquet hall can replicate.",
    "Forty-five minutes from Islamabad. On the pine-forested ridgeline of the Murree Hills. At an elevation where the air is cleaner, the photographs are different, and the only backdrop for your wedding is the sub-Himalayan range stretching to the horizon.",
  ],
  sections: [
    {
      title: "Why Choose Bhurban Murree as Your Wedding Venue",
      paragraphs: [
        "Pakistani weddings are among the most visually elaborate celebrations in the world. The mehendi, the nikkah, the baraat, the walima — each occasion has its own aesthetic language. What the Himalaya Villas marriage hall offers is a setting that elevates every occasion without competing with it: the mountain environment becomes the frame, not the subject.",
        "The case for a Bhurban mountain wedding is practical and specific. The photographs are different because the light at 6,500 feet is different — softer in summer, more dramatic in winter. The experience for guests is different because arriving at a mountain estate is an arrival, not a walk through a hotel lobby. The privacy is different because Himalaya Villas is a private property — your event does not share its setting with other events on the floor below.",
      ],
    },
    {
      title: "Wedding & Event Spaces at Himalaya Villas",
      paragraphs: [
        "Himalaya Villas offers multiple venue configurations across indoor and outdoor spaces — allowing each wedding occasion to be staged in the environment that best serves it. The outdoor mountain terrace and private lawn are the primary venues; indoor setup is available for inclement weather contingencies and intimate gatherings.",
      ],
    },
    {
      title: "What Himalaya Villas Provides — Wedding Services & Inclusions",
      paragraphs: [
        "The Himalaya Villas wedding package is not a venue rental with a list of things you need to source externally. The property provides comprehensive event infrastructure covering the logistics most couples and families do not realise they need to manage until they are managing them badly — venue setup, Halal catering, décor, accommodation, coordination, and private photography locations across the estate.",
      ],
    },
    {
      title: "Wedding Occasions at Himalaya Villas — Every Ceremony, One Venue",
      paragraphs: [
        "Pakistani wedding celebrations span multiple occasions — each with its own setting requirements, guest list size, and aesthetic. Himalaya Villas is configured to host every occasion across a multi-day wedding event, which means the wedding party can stay on property throughout.",
      ],
      subsections: [
        {
          heading: "Nikkah Ceremony",
          paragraphs: [
            "The nikkah at Himalaya Villas is typically held on the mountain terrace or in the indoor banquet space for winter events. The intimate nature of the nikkah — often 20–80 guests — makes the private terrace venue ideal: the mountain backdrop, the absence of other events, and the natural quiet of Bhurban elevate the ceremony without overwhelming it.",
          ],
          link: { href: "/nikah-venue-bhurban", label: "See the dedicated Nikah Venue page" },
        },
        {
          heading: "Walima Reception",
          paragraphs: [
            "The walima is the largest celebration in the Pakistani wedding sequence — and the occasion for which the Himalaya Villas private lawn is most suitable. Full marquee setup, multi-course dinner, live music or nasheed performance, and up to 300 guests in a setting no city ballroom can approximate.",
          ],
          link: { href: "/walima-hall-murree", label: "See the dedicated Walima Hall page" },
        },
        {
          heading: "Mehndi & Engagement",
          paragraphs: [
            "Mehndi events at Himalaya Villas take full advantage of the property's outdoor spaces — the private lawn staged for music, dance, and celebration against a mountain backdrop. Evening lighting transforms the outdoor space into a photographic environment that makes social media coverage effortless. Engagement ceremonies use the mountain terrace for intimate setups.",
          ],
        },
        {
          heading: "Outdoor Mountain Wedding Ceremonies",
          paragraphs: [
            "For couples seeking a fully outdoor mountain wedding — ceremony, reception, and photography all in a single outdoor mountain setting — Himalaya Villas is the only dedicated luxury venue in the Bhurban area that can deliver this experience end-to-end.",
          ],
          link: { href: "/outdoor-wedding-venue-murree", label: "See the Outdoor Wedding Venue page" },
        },
      ],
    },
    {
      title: "Planning a Mountain Wedding in Murree — Guide for Couples & Families",
      paragraphs: [
        "A mountain wedding at Himalaya Villas requires planning considerations that differ from a city venue booking. Peak wedding season — April to June and September to November — books 4–6 months in advance. Eid periods can book 6–8 months ahead.",
      ],
      subsections: [
        {
          heading: "How Far in Advance Should You Book?",
          paragraphs: [
            "Walima bookings for large guest counts (200+) should be initiated at least 5–6 months before the date to allow for full setup planning. Direct WhatsApp inquiry is always the first step — availability is confirmed within 24 hours.",
          ],
        },
        {
          heading: "What Happens If It Rains?",
          paragraphs: [
            "All Himalaya Villas outdoor event bookings include a weather contingency plan. The indoor banquet space provides immediate backup capacity. For large outdoor events (100+ guests), a marquee structure is recommended as standard practice — not as a contingency.",
          ],
        },
        {
          heading: "Can Out-of-City Guests Stay On-Property?",
          paragraphs: [
            "Yes. One of the primary advantages of Himalaya Villas as a wedding venue is its accommodation capacity — the wedding party, immediate family, and key outstation guests can all stay on-property across the event days.",
          ],
        },
        {
          heading: "How Do Guests Travel to Bhurban from Islamabad?",
          paragraphs: [
            "Bhurban is 45–60 minutes from central Islamabad via the Murree Expressway. Himalaya Villas' event coordination team can arrange shuttle bus transfers from designated Islamabad pickup points for large events.",
          ],
        },
      ],
    },
  ],
  tables: [
    {
      title: "The Bhurban Advantage — Compared to City Venues",
      headers: ["Factor", "Himalaya Villas — Bhurban", "City Banquet Hall — Islamabad/Lahore"],
      rows: [
        ["Setting", "Open pine forest · Himalayan ridgeline views", "Climate-controlled banquet halls — artificial environment"],
        ["Privacy", "Private estate — your event, your guests, your timeline", "Shared hotel events floor — multiple events simultaneously"],
        ["Photography", "Natural light · Mountain backdrop · Forest trails", "Lobby backdrops, stage setups — standardized aesthetic"],
        ["Guest Experience", "Drive through Murree Hills — arrival is part of the occasion", "Hotel entrance, valet, elevator to event floor"],
        ["Air & Atmosphere", "6,500 ft — cooler summer (18–24°C vs 35°C+ in Islamabad)", "City summer — outdoor events uncomfortable June–August"],
        ["Exclusivity", "Private venue — capacity limited by design", "Large hotels host multiple events per day"],
      ],
      highlightColumn: 1,
    },
    {
      title: "Wedding Venue Capacity & Pricing — Himalaya Villas",
      description:
        "Indicative starting ranges — all packages confirmed with a bespoke quote following direct inquiry.",
      headers: ["Event Type", "Capacity", "Venue", "Rate From", "Inclusions"],
      rows: [
        ["Intimate Nikkah", "20–60 guests", "Mountain Terrace / Indoor", "PKR 150,000–300,000", "Venue · Ceremony setup · Catering · Bridal suite"],
        ["Mehndi Celebration", "50–150 guests", "Private Lawn", "PKR 250,000–500,000", "Venue · Décor · Catering · Entertainment · Lighting"],
        ["Walima Reception", "100–300 guests", "Private Lawn + Marquee", "PKR 500,000–1,200,000", "Full venue · Marquee · Multi-course dinner · Coordination"],
        ["Outdoor Mountain Wedding", "30–120 guests", "Mountain Terrace + Lawn", "PKR 350,000–800,000", "Full outdoor setup · Ceremony + reception · Catering"],
        ["Full Wedding Package (Multi-Day)", "Variable", "All Venues", "PKR 1,200,000+", "All 3–4 occasions · Accommodation · End-to-end management"],
      ],
      note: "Peak season (Eid, summer weekends, autumn) carries a premium. Multi-occasion bookings receive preferential pricing. Direct WhatsApp inquiry provides fastest custom quote.",
      highlightColumn: 0,
    },
    {
      title: "What Himalaya Villas Provides",
      headers: ["Service Category", "What Himalaya Villas Provides"],
      rows: [
        ["Venue & Setup", "Private venue exclusive use · Professional setup · Event furniture · Stage or ceremony structure"],
        ["Catering", "Full Halal menu · Multi-course dinners · Live cooking stations · Custom menu with head chef"],
        ["Décor", "In-house decoration team · Floral arrangements · Lighting design · Photography backdrops"],
        ["Accommodation", "Villa accommodation for wedding party · Guest rooms · Bridal suite · Wedding night villa"],
        ["Event Management", "Dedicated coordinator · Timeline management · Vendor coordination · Day-of logistics"],
        ["Photography Locations", "Private mountain trails · Pine forest · Terrace with Himalayan view · Sunrise/sunset sessions"],
      ],
      highlightColumn: 0,
    },
  ],
  venueSpaces: [
    {
      title: "The Mountain Terrace — Primary Outdoor Venue",
      description:
        "The flagship event space: a private outdoor event floor with direct panoramic views across the Murree Hills ridgeline and sub-Himalayan range. Nothing between your guests and the Himalayan view.",
      bullets: [
        "Capacity: Up to 150 guests seated · 200+ standing reception",
        "Natural backdrop: Pine forest and Himalayan ridgeline — no artificial backdrop required",
        "Lighting: Professional event lighting — fairy lights, candlelight, uplighting to mountain landscape",
        "Best for: Nikkah ceremony · Walima reception · Engagement · Intimate mehndi",
        "Season: Optimal April–October · Winter setups available with heating provision",
      ],
    },
    {
      title: "The Private Lawn — Garden Ceremony Venue",
      description:
        "The property's garden event space — enclosed by pine trees, level ground, and accessible from the main villa accommodation block.",
      bullets: [
        "Capacity: Up to 300 guests with full marquee setup",
        "Configuration: Round tables, long banquet layout, ceremony seating with aisle",
        "Marquee: Professional marquee setup available through event management partners",
        "Best for: Walima reception · Mehndi · Large family celebrations",
      ],
    },
    {
      title: "Indoor Banquet Space — Climate-Controlled Venue",
      description:
        "Climate-controlled alternative for winter events, inclement weather contingencies, and intimate gatherings.",
      bullets: [
        "Capacity: Up to 80 guests seated · Private dining for smaller celebrations",
        "Features: Mountain-view windows · Fireplace · Full AV · Private bar/beverage station",
        "Best for: Intimate nikkah · Corporate event · Winter celebrations · Small family gatherings",
      ],
    },
  ],
  ctas: [
    {
      eyebrow: "Discuss Your Wedding Dates",
      title: "Available for nikkah, walima, mehndi, engagement & private celebrations",
      subtitle: "15-minute response · Direct inquiry receives best availability",
      whatsappMessage:
        "I would like to inquire about wedding dates at Himalaya Villas Bhurban. Event type: [nikkah/walima/mehndi]. Approximate guest count: [ ]. Preferred date(s): [ ].",
    },
    {
      eyebrow: "Book Your Wedding Date",
      title: "Peak season (March–May, September–November) books 3–6 months ahead",
      subtitle: "Include dates, event type, and guest count for fastest confirmation",
      whatsappMessage:
        "I would like to book a wedding event at Himalaya Villas. Dates: [ ]. Event type: [ ]. Guest count: [ ].",
    },
    {
      eyebrow: "Begin Your Wedding Inquiry",
      title: "Tell us your date, event type, and approximate guest count",
      subtitle: "We respond within 15 minutes · Open daily 9 AM – 10 PM",
      whatsappMessage:
        "Wedding inquiry — Himalaya Villas Bhurban. Date: [ ]. Event: [ ]. Guests: [ ].",
    },
  ],
  faqs: [
    {
      q: "Is Himalaya Villas a marriage hall in Bhurban Murree?",
      a: "Yes. Himalaya Villas functions as both a luxury resort and a dedicated wedding and events venue in Bhurban, Murree Hills. The property hosts nikkah ceremonies, walima receptions, mehndi events, engagements, and private celebrations across indoor and outdoor spaces with capacities ranging from 20 to 300+ guests.",
    },
    {
      q: "How far is the Himalaya Villas wedding venue from Islamabad?",
      a: "Himalaya Villas is approximately 45–60 minutes from central Islamabad (Blue Area, F-6) via the M-1 Motorway and Murree road. From Rawalpindi, the drive is approximately 40–50 minutes. Guest transfer services from Islamabad are available for wedding events on request.",
    },
    {
      q: "What is the capacity of the marriage hall at Himalaya Villas?",
      a: "Himalaya Villas can accommodate 20 to 60 guests for intimate indoor ceremonies, 100–150 guests on the outdoor mountain terrace, and 200–300+ guests on the private lawn with full marquee setup. Capacity configurations are discussed during the initial inquiry.",
    },
    {
      q: "What types of wedding events does Himalaya Villas host?",
      a: "Himalaya Villas hosts all major Pakistani wedding occasions: nikkah ceremonies, walima receptions, mehndi and dholki celebrations, engagement events, and combined multi-day wedding packages. The property also hosts corporate events and private celebrations.",
    },
    {
      q: "Is the food at Himalaya Villas Halal for wedding events?",
      a: "Yes. All food preparation and catering at Himalaya Villas is 100% Halal — across all wedding event types, all meal occasions, and all catering configurations. There are no exceptions to this policy.",
    },
    {
      q: "What is the price of a wedding venue in Bhurban Murree?",
      a: "Wedding venue pricing at Himalaya Villas ranges from approximately PKR 150,000 for an intimate nikkah ceremony to PKR 1,200,000+ for a multi-day full wedding package including all occasions, catering, décor, and accommodation. A bespoke quote is provided following direct inquiry via WhatsApp.",
    },
    {
      q: "Is an outdoor mountain wedding possible at Himalaya Villas?",
      a: "Yes. Himalaya Villas' mountain terrace and private lawn are both configured for fully outdoor wedding events. The outdoor mountain terrace, with its panoramic Himalayan ridgeline views, is the property's signature wedding setting. See the dedicated outdoor wedding venue page for complete details.",
    },
  ],
  clusterLinks: weddingClusterLinks,
  clusterSectionTitle: "Explore Specific Wedding Occasions — Cluster Pages",
  schema: {
    breadcrumbName: "Marriage Hall Bhurban Murree",
    eventName: "Wedding & Events at Himalaya Villas Bhurban",
    includeLodging: true,
  },
};

export const outdoorWeddingConfig: WeddingPageConfig = {
  path: "/outdoor-wedding-venue-murree",
  meta: {
    title: "Outdoor Wedding Venue Murree — Mountain Ceremonies & Receptions | Himalaya Villas Bhurban",
    description:
      "Pakistan's most scenic outdoor wedding venue — Himalaya Villas Bhurban. Open-air nikkah, walima & ceremonies with panoramic Himalayan views. 45 min from Islamabad. WhatsApp for dates.",
    keywords: [
      "outdoor wedding venue Murree",
      "mountain wedding venue near Islamabad",
      "outdoor wedding venue near Islamabad",
      "outdoor nikkah venue Murree",
      "garden wedding venue Bhurban",
      "open air wedding Pakistan",
      "destination wedding Murree",
      "outdoor marriage hall Murree Hills",
    ],
    h1ImageAlt: "Outdoor wedding venue Murree — Himalaya Villas mountain terrace ceremony with Himalayan views",
  },
  hero: {
    eyebrow: "Outdoor Wedding Venue · Bhurban, Murree Hills",
    h1: "Outdoor Wedding Venue Murree —",
    h1Accent: "Pakistan's Most Scenic Mountain Ceremony Setting",
    subtitle:
      "Private Open-Air Ceremonies · Himalayan Ridgeline Views · 45 minutes from Islamabad — no city venue can replicate this setting.",
    stats: sharedStats,
  },
  heroImage: "/assets/murree-mountain-hero.jpg",
  quickFacts: [
    { label: "Mountain Terrace", value: "Up to 150 seated · 200+ reception" },
    { label: "Private Lawn", value: "Up to 300 guests with marquee" },
    { label: "Distance", value: "45–60 min from Islamabad" },
    { label: "Best Season", value: "April–June · September–November" },
    { label: "Catering", value: "Fully Halal · Complete décor & setup" },
  ],
  intro: [
    "An outdoor wedding in Pakistan has a problem: the available settings do not match the ambition of the occasion. City gardens are hemmed in by walls, hotel lawns overlook parking structures, and the heat of Islamabad or Lahore makes outdoor summer events physically uncomfortable. Himalaya Villas is the outdoor wedding venue in Murree Hills that resolves all three — a private mountain estate at 6,500 feet, where the outdoor setting genuinely earns the word spectacular.",
    "For couples who want a ceremony that photographs differently from every other Pakistani wedding they have attended, and for families organizing a nikkah or walima that guests will discuss for years, the Bhurban mountain setting at Himalaya Villas is the outdoor wedding venue they have been looking for.",
  ],
  sections: [
    {
      title: "The Outdoor Wedding Spaces — Himalaya Villas",
      paragraphs: [
        "Himalaya Villas offers two primary outdoor venues — the mountain terrace for ceremonies with a Himalayan backdrop, and the private lawn for larger garden receptions with full marquee provision.",
      ],
    },
    {
      title: "Why a Mountain Outdoor Wedding Near Islamabad Outperforms a City Venue",
      paragraphs: [
        "Islamabad's outdoor wedding venues share a fundamental limitation: they exist within the city environment. The air quality, ambient noise, sight lines, and temperature all carry the character of an urban setting regardless of how well the garden is maintained. Bhurban at Himalaya Villas is categorically outside this constraint.",
      ],
    },
    {
      title: "Outdoor Wedding Planning at Himalaya Villas",
      paragraphs: [
        "The optimal outdoor wedding season at Bhurban runs from mid-March through early June and from September through late November — stable weather, comfortable temperatures (18–26°C), clear skies, and natural greenery at its peak.",
      ],
      subsections: [
        {
          heading: "Season Guidance",
          paragraphs: [
            "Summer monsoon (July–August) is manageable with full marquee provision but is not recommended for uncovered outdoor ceremonies. Winter outdoor events (December–February) are possible with heating provision and have a distinct, dramatic aesthetic.",
          ],
        },
        {
          heading: "Weather Contingency",
          paragraphs: [
            "All outdoor bookings include a weather contingency protocol. The indoor banquet space provides immediate covered backup for ceremonies of up to 80 guests. For larger events, a marquee structure is installed as standard.",
          ],
        },
        {
          heading: "Guest Transport from Islamabad",
          paragraphs: [
            "Himalaya Villas can coordinate group shuttle services from central Islamabad pickup points — ensuring guests arrive together and the event timeline is maintained regardless of Murree Expressway traffic.",
          ],
        },
      ],
    },
  ],
  tables: [
    {
      title: "Mountain Outdoor Venue vs City Outdoor Venue",
      headers: ["Factor", "Islamabad City Outdoor Venue", "Himalaya Villas Bhurban"],
      rows: [
        ["Summer Temperature", "35–42°C — genuinely uncomfortable July–August", "18–25°C — outdoor events genuinely pleasant"],
        ["Photography", "City skyline or garden wall — heavy post-production", "Himalayan ridgeline, pine forest — distinctive without editing"],
        ["Noise", "Urban ambient noise — traffic, construction", "Mountain quiet — birdsong, wind in pine trees"],
        ["Guest Journey", "30-minute city commute — routine", "45-minute mountain drive — elevated sense of occasion"],
        ["Privacy", "Shared hotel or garden — adjacent events", "Private estate — your event, your guests only"],
      ],
      highlightColumn: 2,
    },
  ],
  venueSpaces: [
    {
      title: "The Mountain Terrace — Ceremony with a Himalayan Backdrop",
      description:
        "An open-air event platform on the Bhurban ridgeline with unobstructed 270-degree views across pine forest and sub-Himalayan range. The Himalayan horizon is the backdrop — nothing added to it.",
      bullets: [
        "Capacity: 50–150 guests seated ceremony · 200 standing reception",
        "Setup: Ceremony arch · Floral arrangements · Seating facing mountain view · Aisle runner",
        "Lighting: Fairy lights · Uplighting · Candlelight for evening events",
        "Best for: Nikkah · Engagement · Intimate walima · Sunset ceremony",
      ],
    },
    {
      title: "The Private Lawn — Garden Reception for Larger Celebrations",
      description:
        "Large-format outdoor venue bordered by pine trees with full catering and service infrastructure.",
      bullets: [
        "Capacity: 150–300 guests with full marquee provision",
        "Setup: Round table or banquet seating · Stage · Dance area · Live cooking stations",
        "Marquee: Professional installation — shade and light rain protection",
        "Best for: Walima reception · Mehndi · Dholki · Large family celebrations",
      ],
    },
  ],
  ctas: [
    {
      eyebrow: "Check Outdoor Venue Availability",
      title: "Peak wedding season books 4–6 months ahead",
      subtitle: "Early inquiry secures preferred dates · Response within 24 hours",
      whatsappMessage:
        "I would like to check outdoor wedding venue availability at Himalaya Villas Bhurban. Date(s): [ ]. Guest count: [ ]. Event type: [ ].",
    },
    {
      eyebrow: "Book Your Outdoor Mountain Wedding",
      title: "Exclusive mountain venue · 45 min from Islamabad",
      subtitle: "No city venue can replicate this setting",
      whatsappMessage:
        "I would like to book an outdoor mountain wedding at Himalaya Villas. Date: [ ]. Guests: [ ].",
    },
  ],
  faqs: [
    {
      q: "Is an outdoor nikkah ceremony possible at Himalaya Villas?",
      a: "Yes. The mountain terrace at Himalaya Villas is specifically configured for outdoor nikkah ceremonies — ceremony seating facing the Himalayan view, ceremony arch with floral decoration, and a private setting without public access. Outdoor nikkah ceremonies are among the most requested event types at the property.",
    },
    {
      q: "What is the best month for an outdoor wedding in Murree?",
      a: "April, May, October, and November are the optimal months for outdoor weddings at Himalaya Villas Bhurban. These months deliver stable weather, temperatures of 18–26°C, clear skies, and natural greenery. September is also excellent.",
    },
    {
      q: "How many guests can the outdoor venue accommodate?",
      a: "The mountain terrace accommodates up to 150 seated guests or 200+ standing reception. The private lawn accommodates 150–300 guests with full marquee setup.",
    },
    {
      q: "Is the outdoor venue exclusively ours for the event?",
      a: "Yes. Himalaya Villas does not host multiple concurrent events. When you book the outdoor venue, the entire property is exclusively yours for the event period.",
    },
  ],
  pillarBackLink: { href: "/marriage-hall-bhurban-murree", label: "Back to Marriage Hall Hub" },
  schema: {
    breadcrumbName: "Outdoor Wedding Venue Murree",
    eventName: "Outdoor Wedding at Himalaya Villas Bhurban",
    eventType: "MixedEventAttendanceMode",
  },
};

export const weddingPackagesConfig: WeddingPageConfig = {
  path: "/wedding-packages-murree-prices",
  meta: {
    title: "Wedding Packages Murree Prices — Himalaya Villas Bhurban | Nikkah, Walima & Full Wedding",
    description:
      "Wedding packages at Himalaya Villas Bhurban — full pricing for nikkah, walima, mehndi & outdoor ceremonies. From PKR 150,000. Mountain venue 45 min from Islamabad. WhatsApp for custom quote.",
    keywords: [
      "wedding packages Murree prices",
      "wedding venue packages Bhurban",
      "marriage hall charges Murree",
      "walima package Murree",
      "nikkah package Bhurban",
      "wedding ceremony cost Pakistan mountain",
      "event packages Bhurban Murree Hills",
    ],
    h1ImageAlt: "Wedding packages Murree prices — Himalaya Villas Bhurban mountain wedding venue",
  },
  hero: {
    eyebrow: "Wedding Packages · Price Guide · Himalaya Villas Bhurban",
    h1: "Wedding Packages Murree —",
    h1Accent: "Himalaya Villas Bhurban Price Guide",
    subtitle:
      "Full Pricing for Nikkah · Walima · Outdoor Ceremonies · Multi-Day Wedding Packages — transparent bundles, bespoke quotes within 24 hours.",
    stats: [
      { value: "From PKR 150K", label: "Intimate Nikkah" },
      { value: "From PKR 500K", label: "Walima reception" },
      { value: "PKR 1.4M+", label: "Full 3-day bundle" },
    ],
  },
  heroImage: "/assets/gallery-exterior.jpg",
  intro: [
    "Most wedding venues in Pakistan make it deliberately difficult to understand what a booking actually costs. Himalaya Villas prices its wedding packages differently: each package is a comprehensive bundle covering venue, setup, catering, and coordination in a single rate — with supplementary add-ons transparent at the point of inquiry, not the point of invoice.",
    "This page provides the complete pricing guide for Himalaya Villas wedding packages in Murree — across every event type, every capacity tier, and every season.",
  ],
  sections: [
    {
      title: "Pricing Principles — Himalaya Villas",
      paragraphs: [
        "All packages include: Venue exclusive use · Professional setup · Event coordination · Halal catering · Basic décor. Packages do not include photographer (referrals provided) or external entertainment. Direct inquiry always receives the most accurate pricing — all rates shown are indicative starting points.",
      ],
    },
    {
      title: "What Affects the Final Price",
      paragraphs: [
        "Five factors determine your final wedding package quote at Himalaya Villas.",
      ],
      subsections: [
        {
          heading: "1. Guest Count",
          paragraphs: [
            "The most significant pricing variable — catering, seating, linen, staff, and marquee size all scale with headcount. Himalaya Villas prices in three tiers: Intimate (under 80), Standard (80–200), and Grand (200–300). Moving between tiers changes the base price by 30–50%.",
          ],
        },
        {
          heading: "2. Season & Date",
          paragraphs: [
            "Peak wedding season (April–June, September–November) and Eid periods carry a 20–30% premium. Midweek bookings (Tuesday–Thursday) receive a 10–15% discount versus weekends.",
          ],
        },
        {
          heading: "3. Catering Selection",
          paragraphs: [
            "Base catering covers a standard multi-course Halal dinner. Premium upgrades include live cooking stations, extended menu courses, custom dessert displays, and branded welcome drinks — priced per head.",
          ],
        },
        {
          heading: "4. Décor Level",
          paragraphs: [
            "Base package includes standard event décor. Premium upgrades include custom floral installations, chandelier setups, fairy light canopies, and themed colour coordination.",
          ],
        },
        {
          heading: "5. Accommodation",
          paragraphs: [
            "Wedding party accommodation is priced separately unless specified in a full bundle. Multiple villa units are available for the bridal suite, groom's suite, and family villas.",
          ],
        },
      ],
    },
    {
      title: "How to Get a Custom Wedding Quote",
      paragraphs: [
        "The fastest way to get a full wedding package quote is a direct WhatsApp inquiry. Provide event date (or range), event type(s), approximate guest count, preferred venue space, and any specific requirements. A comprehensive quote document is provided within 24 hours — no consultation fee.",
      ],
    },
  ],
  tables: [
    {
      title: "Complete Wedding Package Price Guide — Himalaya Villas 2025",
      headers: ["Package Name", "Capacity", "Venue", "Rate From", "Key Inclusions"],
      rows: [
        ["Intimate Nikkah Package", "20–60", "Indoor / Terrace", "PKR 150,000–300,000", "Venue · Ceremony setup · Floral arch · Catering · Bridal suite · Coordinator"],
        ["Garden Mehndi Package", "50–120", "Private Lawn", "PKR 200,000–400,000", "Venue · Stage · Mehndi décor · Catering · Entertainment area · Lighting"],
        ["Outdoor Mountain Ceremony", "40–120", "Mountain Terrace", "PKR 300,000–600,000", "Full outdoor setup · Ceremony arch · Catering · Photography access · Coordinator"],
        ["Walima Reception Package", "100–200", "Private Lawn", "PKR 500,000–900,000", "Full venue · Marquee · Multi-course dinner · Full décor · Stage · Coordinator"],
        ["Grand Walima Package", "200–300", "Private Lawn + Marquee", "PKR 900,000–1,400,000", "Full-property exclusive · Premium dinner · Live stations · VIP coordination"],
        ["Full Wedding Bundle (3-Day)", "Variable", "All Venues", "PKR 1,400,000+", "Mehndi + Nikkah + Walima · All catering · Accommodation · End-to-end management"],
      ],
      highlightColumn: 0,
    },
  ],
  ctas: [
    {
      eyebrow: "Get Your Custom Wedding Quote",
      title: "Share your dates, event type, and guest count",
      subtitle: "Full quote document provided free within 24 hours",
      whatsappMessage:
        "I would like a custom wedding package quote from Himalaya Villas. Date: [ ]. Event type: [ ]. Guest count: [ ]. Venue preference: [ ].",
    },
  ],
  faqs: [
    {
      q: "What is included in the wedding package price at Himalaya Villas?",
      a: "All packages include exclusive venue use, professional event setup, a dedicated event coordinator, and full Halal catering for the specified guest count. Bridal suite accommodation is included in nikkah packages.",
    },
    {
      q: "Is the wedding venue priced per person or per event?",
      a: "Himalaya Villas wedding packages are priced per event at the base level, with per-person catering rates applied for the confirmed headcount confirmed 2–3 weeks before the event date.",
    },
    {
      q: "Is there a minimum booking requirement?",
      a: "The minimum booking for a standalone wedding event is the Intimate Nikkah Package (minimum 20 guests). Multi-day wedding bundles have a minimum 3-occasion requirement.",
    },
    {
      q: "Does the wedding package price include a photographer?",
      a: "No. Himalaya Villas provides photography locations and coordinates access for your chosen photographer. A list of recommended professionals familiar with the Bhurban mountain setting is provided upon request.",
    },
    {
      q: "Can the wedding package price be negotiated?",
      a: "Multi-occasion bookings receive preferential pricing vs. booking each occasion separately. Midweek bookings receive a standard discount. Direct WhatsApp inquirers receive the best available rate.",
    },
  ],
  pillarBackLink: { href: "/marriage-hall-bhurban-murree", label: "Full venue details — Marriage Hall Hub" },
  schema: {
    breadcrumbName: "Wedding Packages Murree Prices",
    eventName: "Wedding Packages at Himalaya Villas Bhurban",
    includeOffers: true,
  },
};

export const nikahVenueConfig: WeddingPageConfig = {
  path: "/nikah-venue-bhurban",
  meta: {
    title: "Nikah Venue Bhurban Murree — Private Mountain Ceremony | Himalaya Villas",
    description:
      "Himalaya Villas — the most exclusive nikah venue in Bhurban Murree. Private outdoor terrace, panoramic Himalayan views, intimate ceremonies 20–80 guests, 45 min from Islamabad. WhatsApp your date.",
    keywords: [
      "nikah venue Bhurban",
      "nikah venue Murree",
      "nikkah ceremony venue near Islamabad",
      "outdoor nikah venue Murree",
      "mountain nikkah Pakistan",
      "private nikah ceremony Murree Hills",
      "intimate wedding venue near Islamabad",
    ],
    h1ImageAlt: "Nikah venue Bhurban Murree — Himalaya Villas private mountain terrace nikkah ceremony",
  },
  hero: {
    eyebrow: "Nikah Venue · Bhurban, Murree Hills",
    h1: "Nikah Venue Bhurban Murree —",
    h1Accent: "Private Mountain Ceremony at Himalaya Villas",
    subtitle:
      "Intimate Nikkah Ceremony Setting · Panoramic Himalayan Views · 45 Minutes from Islamabad",
    stats: [
      { value: "20–80", label: "Intimate guests" },
      { value: "From PKR 150K", label: "Nikah package" },
      { value: "45 min", label: "From Islamabad" },
    ],
  },
  heroImage: "/assets/murree-mountain-hero.jpg",
  quickFacts: [
    { label: "Capacity", value: "20–80 guests (intimate) · Up to 120 extended" },
    { label: "Primary Venue", value: "Mountain terrace — outdoor nikkah with Himalayan backdrop" },
    { label: "Alternate", value: "Indoor banquet — winter or weather contingency" },
    { label: "Package", value: "From PKR 150,000 — venue · setup · catering · bridal suite" },
    { label: "Distance", value: "45–60 min Islamabad · 4 hrs from Lahore" },
  ],
  intro: [
    "The nikkah is the most significant moment in the Islamic marriage ceremony — a private, sacred exchange witnessed by family, not an event staged for a crowd. The setting for a nikkah should reflect that character: intimate, dignified, and memorable without being theatrical. Himalaya Villas offers a nikkah venue in Bhurban, Murree Hills where the ceremony is framed by the Himalayan horizon and the focus remains entirely on the couple and the occasion.",
    "For couples in Islamabad and Rawalpindi who want a nikkah different from every hotel ballroom they have attended, Bhurban is 45 minutes away.",
  ],
  sections: [
    {
      title: "Why Himalaya Villas Is the Right Nikah Venue in Bhurban",
      paragraphs: [
        "The difference between a nikkah at Himalaya Villas and a nikkah at a city hotel is a matter of setting and atmosphere — the two factors photographs cannot manufacture but a mountain venue naturally provides.",
      ],
      subsections: [
        {
          heading: "Privacy — The Most Important Requirement for a Nikkah",
          paragraphs: [
            "When you book a nikkah at Himalaya Villas, the property is exclusively yours — no other events, no other wedding parties, no public foot traffic. The intimacy required for a meaningful nikkah ceremony is structurally protected.",
          ],
        },
        {
          heading: "The Mountain Terrace — Nikkah Setting",
          paragraphs: [
            "Ceremony seating is arranged in an intimate arc facing the view; the nikah setup is positioned so the couple's backdrop is the Himalayan horizon. Mountain light, pine forest, and the clean ridgeline produce images immediately distinctive.",
          ],
        },
        {
          heading: "The Bridal Suite",
          paragraphs: [
            "The nikkah package includes the property's bridal suite — premium villa accommodation with mountain views, separate preparation areas, and private outdoor terrace from check-in through checkout the following day.",
          ],
        },
      ],
    },
    {
      title: "Planning Your Nikah at Himalaya Villas",
      paragraphs: [
        "Nikkah ceremonies at Himalaya Villas work beautifully across all four seasons — each with a distinct character.",
      ],
      subsections: [
        {
          heading: "Best Time for a Nikkah in Bhurban",
          paragraphs: [
            "Spring (April–May) delivers warm outdoor conditions. Autumn (September–November) offers the clearest skies and most dramatic photographic light. Winter (December–February) provides snowfall-season settings with indoor venue available.",
          ],
        },
        {
          heading: "Timing the Nikkah During the Day",
          paragraphs: [
            "Late afternoon ceremonies (4:00–5:30 PM) maximize golden hour light on the mountain terrace. Sunset in Bhurban during peak season occurs between 6:30 and 7:30 PM.",
          ],
        },
        {
          heading: "The Qazi / Islamic Official",
          paragraphs: [
            "Himalaya Villas can assist in coordinating a qualified Islamic qazi on request. Couples who prefer their own family scholar are entirely welcome; the venue provides all necessary setup for the nikkah paperwork and signing ceremony.",
          ],
        },
      ],
    },
  ],
  tables: [
    {
      title: "Nikah Ceremony Setup — What Himalaya Villas Provides",
      headers: ["Service", "Inclusions"],
      rows: [
        ["Venue", "Mountain terrace exclusive use · Setup and breakdown · All furniture"],
        ["Ceremony Setup", "Ceremony arch · Floral decoration · Aisle · Signing table"],
        ["Catering", "Post-nikkah dinner · Welcome refreshments · Chai/beverage station · Custom menu"],
        ["Décor", "Standard décor package · Premium floral upgrade · Evening lighting"],
        ["Accommodation", "Bridal suite (1 night) · Preparation room · Additional villa rooms on request"],
        ["Coordination", "Dedicated coordinator · Day-of timeline · Vendor and transport coordination"],
        ["Photography Access", "Mountain terrace portraits · Pine forest trails · Sunrise/sunset sessions"],
      ],
      highlightColumn: 0,
    },
  ],
  ctas: [
    {
      eyebrow: "Reserve Your Nikah Date",
      title: "Tell us your date, guest count, and requirements",
      subtitle: "Availability confirmed within 24 hours",
      whatsappMessage:
        "I would like to reserve a nikah ceremony at Himalaya Villas Bhurban. Date: [ ]. Guest count: [ ]. Requirements: [ ].",
    },
    {
      eyebrow: "Book Your Mountain Nikkah",
      title: "Private terrace · Himalayan views · Exclusive venue",
      subtitle: "45 min from Islamabad · Dates confirmed within 24 hours",
      whatsappMessage:
        "Nikah booking inquiry — Himalaya Villas. Date: [ ]. Guests: [ ].",
    },
  ],
  faqs: [
    {
      q: "Is an outdoor nikkah possible at Himalaya Villas Bhurban?",
      a: "Yes. The outdoor nikkah on Himalaya Villas' mountain terrace is the property's most-requested event configuration — intimate ceremony arc, floral arch, qazi's table, and seating facing the Himalayan ridgeline view. Conducted for 20–120 guests depending on seating configuration.",
    },
    {
      q: "What is the minimum guest count for a nikah ceremony?",
      a: "Himalaya Villas hosts nikah ceremonies from a minimum of 20 guests. The intimate seated nikkah setup is optimized for 20–80 guests. Larger gatherings can be accommodated on the private lawn.",
    },
    {
      q: "Can family members stay on-property for the nikkah?",
      a: "Yes. The nikkah package includes the bridal suite; additional villa rooms for parents, siblings, and close family are bookable as an add-on.",
    },
    {
      q: "How far in advance should I book a nikah venue?",
      a: "For peak season nikkah dates (April–June, September–November, Eid periods), 3–5 months advance booking is recommended. Weekday nikkah dates are often available within 4–6 weeks of inquiry.",
    },
    {
      q: "Is there a Maulana or Qazi available through Himalaya Villas?",
      a: "Yes. Himalaya Villas can assist in arranging a qualified local qazi on request — subject to date and availability. Couples who prefer their own family scholar are entirely welcome.",
    },
  ],
  pillarBackLink: { href: "/marriage-hall-bhurban-murree", label: "Back to Wedding Venue Hub" },
  schema: {
    breadcrumbName: "Nikah Venue Bhurban Murree",
    eventName: "Nikkah Ceremony at Himalaya Villas Bhurban",
    eventType: "ReligiousEvent",
  },
};

export const walimaHallConfig: WeddingPageConfig = {
  path: "/walima-hall-murree",
  meta: {
    title: "Walima Hall Murree — Luxury Mountain Reception Venue | Himalaya Villas Bhurban",
    description:
      "Walima reception at Himalaya Villas Bhurban — the most exclusive walima hall near Islamabad. Private mountain venue, up to 300 guests, full catering, panoramic views, 45 min from Islamabad. WhatsApp for dates.",
    keywords: [
      "walima hall Murree",
      "walima venue Murree",
      "walima reception venue Bhurban",
      "walima dinner venue near Islamabad",
      "outdoor walima venue Murree Hills",
      "luxury walima venue Pakistan",
    ],
    h1ImageAlt: "Walima hall Murree — Himalaya Villas Bhurban luxury mountain walima reception",
  },
  hero: {
    eyebrow: "Walima Hall · Bhurban, Murree Hills",
    h1: "Walima Hall Murree —",
    h1Accent: "Himalaya Villas Bhurban's Luxury Mountain Reception",
    subtitle:
      "Private Mountain Walima Venue · Up to 300 Guests · Full Catering & Décor · 45 Min from Islamabad",
    stats: [
      { value: "300", label: "Max guests" },
      { value: "From PKR 500K", label: "Walima package" },
      { value: "100% Halal", label: "Catering" },
    ],
  },
  heroImage: "/assets/gallery-exterior.jpg",
  quickFacts: [
    { label: "Capacity", value: "100–200 open lawn · 200–300 full marquee" },
    { label: "Venue", value: "Private lawn · Mountain terrace · Indoor banquet" },
    { label: "Catering", value: "Full multi-course Halal walima dinner · Live stations" },
    { label: "Package", value: "From PKR 500,000 — venue · décor · catering · coordination" },
    { label: "Distance", value: "45–60 min from Islamabad · Shuttle available" },
  ],
  intro: [
    "The walima is the public celebration of a marriage — a dinner of thanksgiving and hospitality where the family receives guests with generosity. The walima at Himalaya Villas is not an event held in a city function hall while 200 guests eat under fluorescent lighting.",
    "The walima hall at Himalaya Villas is a private mountain estate in Bhurban, Murree Hills — fully exclusive to your event, with the Himalayan ridgeline as the view from every outdoor table.",
  ],
  sections: [
    {
      title: "The Walima Venue at Himalaya Villas — Spaces & Configurations",
      paragraphs: [
        "Himalaya Villas offers three walima configurations — the private lawn for large receptions, the mountain terrace for intimate curated guest lists, and combined indoor-outdoor setups for the most complete experience.",
      ],
    },
    {
      title: "Walima Catering — Full Halal Dinner at Himalaya Villas",
      paragraphs: [
        "The walima dinner is prepared by the property's in-house culinary team — all Halal, freshly prepared on the event day, and fully customizable in consultation with the head chef.",
      ],
      subsections: [
        {
          heading: "Standard Walima Dinner — Inclusions",
          bullets: [
            "Welcome refreshments for arriving guests (sharbat, juices, water)",
            "Starter course: Soup and salad bar",
            "Main course: 4–6 main dishes with rice and breads",
            "Dessert: Traditional Pakistani mithai spread, kheer, fruit platter",
            "Tea and coffee service for all guests",
          ],
          paragraphs: [],
        },
        {
          heading: "Premium Catering Add-Ons",
          bullets: [
            "Live BBQ station: Seekh kebab, chapli kebab, tikka — prepared fresh in guest view",
            "Live karahi station: Mutton and chicken karahi made to order",
            "Continental carving station alongside traditional menu",
            "Premium dessert display with custom cake and extended mithai selection",
          ],
          paragraphs: [],
        },
      ],
    },
    {
      title: "Guest Experience — What Makes the Himalaya Villas Walima Different",
      paragraphs: [
        "The walima is an experience for every guest who attends. The impression a walima creates reflects on the host family — the Himalaya Villas setting is chosen because it creates an impression a city function hall structurally cannot.",
      ],
    },
  ],
  tables: [
    {
      title: "Walima Guest Experience at Himalaya Villas",
      headers: ["Element", "Guest Experience"],
      rows: [
        ["The Arrival", "45 minutes through Murree Hills — the journey signals this walima is different"],
        ["The Setting", "Pine forest perimeter · Mountain horizon · Evening lighting at 6,500 feet"],
        ["The Exclusivity", "No other events on property · No sound from adjacent functions"],
        ["The Food", "Multi-course Halal dinner freshly prepared — not delivered from off-site"],
        ["The Memory", "Photographs show the difference clearly — an occasion, not just an evening"],
      ],
      highlightColumn: 0,
    },
  ],
  venueSpaces: [
    {
      title: "The Private Lawn — Primary Walima Venue",
      description:
        "Bordered by pine trees on level ground — configured for multi-table dinner, stage, entertainment, and live cooking stations.",
      bullets: [
        "Capacity: 100–200 guests open · 200–300 with full marquee",
        "Layout: Round tables · Long banquet · Mixed configurations",
        "Stage: Professional setup for speeches, nasheed, or entertainment",
        "Live stations: BBQ · Karahi · Continental carving · Dessert display",
      ],
    },
    {
      title: "Mountain Terrace — Intimate Walima Option",
      description:
        "For walima events with 60–120 guests — Himalayan ridgeline view as backdrop to every table, open air, pine forest framing.",
      bullets: [
        "Best for: Smaller, curated guest lists prioritising experience per guest",
        "Setting: Open-air private dinner rather than large reception scale",
      ],
    },
    {
      title: "Combined Indoor-Outdoor Configuration",
      description:
        "Guest arrivals and welcome reception on the mountain terrace; dinner service on the private lawn — the most complete walima experience.",
      bullets: [
        "Uses all outdoor spaces sequentially across the event timeline",
        "Ideal for multi-hour walima events spanning reception and dinner",
      ],
    },
  ],
  ctas: [
    {
      eyebrow: "Check Walima Dates",
      title: "Peak season books 4–6 months ahead · Large events need 5–6 months",
      subtitle: "Full quote within 24 hours",
      whatsappMessage:
        "I would like to check walima dates at Himalaya Villas Bhurban. Date: [ ]. Guest count: [ ].",
    },
    {
      eyebrow: "Host Your Walima at Himalaya Villas",
      title: "Private mountain estate · Full Halal catering · Up to 300 guests",
      subtitle: "45 min from Islamabad · Full quote within 24 hours",
      whatsappMessage:
        "Walima booking inquiry — Himalaya Villas. Date: [ ]. Guests: [ ]. Catering preferences: [ ].",
    },
  ],
  faqs: [
    {
      q: "What is the capacity of the walima hall at Himalaya Villas?",
      a: "Himalaya Villas can accommodate 100–200 guests on the private lawn in open configuration, and 200–300 guests with full professional marquee setup. Smaller walima events (60–120 guests) can be hosted on the mountain terrace.",
    },
    {
      q: "Is the walima venue exclusively ours on the event day?",
      a: "Yes. Himalaya Villas does not host multiple concurrent events. Your walima is the only event on the property — guests have full access to all outdoor spaces.",
    },
    {
      q: "How far is the walima venue from Islamabad and Lahore?",
      a: "Approximately 45–60 minutes from central Islamabad and 40–50 minutes from Rawalpindi. From Lahore, approximately 4–4.5 hours via the M-2 Motorway. Guest shuttle services from Islamabad can be arranged.",
    },
    {
      q: "Is the walima catering fully Halal?",
      a: "Yes. All catering at Himalaya Villas is 100% Halal without exception. The kitchen is Halal-certified and full menu documentation is available on request.",
    },
    {
      q: "Can we hold the walima at Himalaya Villas in winter?",
      a: "Yes. Winter walima events use professional marquee structures with integrated heating. Indoor banquet space is available for smaller winter walima events (up to 80 guests). Winter dates are less in demand and offer distinctive snowfall-season settings.",
    },
    {
      q: "Does Himalaya Villas provide event decoration for the walima?",
      a: "Yes. Standard décor is included — floral centrepieces, table linen, stage floral setup, and perimeter lighting. Premium upgrades include chandelier installations, fairy light canopies, and full-property lighting design.",
    },
  ],
  pillarBackLink: { href: "/marriage-hall-bhurban-murree", label: "Full wedding venue — Marriage Hall Hub" },
  schema: {
    breadcrumbName: "Walima Hall Murree",
    eventName: "Walima Reception at Himalaya Villas Bhurban",
    eventType: "SocialEvent",
  },
};

export const weddingPageConfigs = {
  pillar: marriageHallPillarConfig,
  outdoor: outdoorWeddingConfig,
  packages: weddingPackagesConfig,
  nikah: nikahVenueConfig,
  walima: walimaHallConfig,
} as const;
