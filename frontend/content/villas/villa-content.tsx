// Define the image configuration with slug-based mapping
const imagePaths: Record<string, string[]> = {
  'apartment-single-luxury': [
    '/images/villas/single-apt1.jpg',
    '/images/villas/single-apt2.jpg',
    '/images/villas/single-apt3.jpg',
    '/images/villas/single-apt4.jpg',
    '/images/villas/single-apt5.jpg',
  ],
  'apartment-complete': [
    '/images/villas/complete-apt.jpeg',
    '/images/villas/complete-apt2.jpeg',
    '/images/villas/complete-apt3.jpeg',
    '/images/villas/complete-apt4.jpg',
    '/images/villas/complete-apt5.jpg',
    '/images/villas/complete-apt6.jpg',
    '/images/villas/complete-apt7.jpeg',
    '/images/villas/complete-apt8.jpeg',
  ],
  'rakaposhi-single-executive': [
    '/images/villas/rak-single4.jpg',
    '/images/villas/rak-single2.jpg',
    '/images/villas/rak-single3.jpg',
    '/images/villas/rak-single.jpg',
  ],
  'rakaposhi-executive-suite': [
    '/images/villas/rak-suite.jpg',
    '/images/villas/rak-suite2.jpg',
    '/images/villas/rak-suite3.jpg',
    '/images/villas/rak-suite4.jpg',
    '/images/villas/rak-suite5.jpg',
    '/images/villas/rak-suite6.jpg',
    '/images/villas/rak-suite7.jpg',
    '/images/villas/rak-suite8.jpg',
    '/images/villas/rak-suite9.jpg',
  ],
  'rakaposhi-complete-villa': [
    '/images/villas/rak-complete.jpg',
    '/images/villas/rak-complete1.jpg',
    '/images/villas/rak-complete3.jpg',
    '/images/villas/rak-complete4.jpg',
    '/images/villas/rak-complete5.jpg',
    '/images/villas/rak-complete6.jpg',
    '/images/villas/rak-complete7.jpg',
    '/images/villas/rak-complete8.jpg',
    '/images/villas/rak-complete9.jpg',
    '/images/villas/rak-complete10.jpg',
  ],
  'luxury-attic': [
    '/images/villas/attic-room.jpg',
  ],
  'luxury-single': [
    '/images/villas/lux-single.jpg',
    '/images/villas/lux-single2.jpg',
    '/images/villas/lux-single3.jpg',
    '/images/villas/lux-single4.jpg',
    '/images/villas/lux-single5.jpg',
  ],
  'luxury-suite': [
    '/images/villas/lux-suite.jpg',
    '/images/villas/lux-suite2.jpg',
    '/images/villas/lux-suite3.jpg',
    '/images/villas/lux-suite1.jpg',
  ],
  'luxury-complete-villa': [
    '/images/villas/lux-complete4.jpg',
    '/images/villas/lux-complete2.jpg',
    '/images/villas/lux-complete3.jpg',
    '/images/villas/lux-complete.jpg',
    '/images/villas/lux-complete5.jpg',
    '/images/villas/lux-complete6.jpg',
  ],
};

export type Room = {
  slug: string;
  tag: string;
  name: string;
  description: string;
  price: string;
  images: string[];           
  collection: string;
  longDescription: string;
  highlights: string[];
  details: { label: string; value: string }[];
  amenities: string[];
  /** Optional H1 override for the detail page (defaults to `name`). */
  h1?: string;
  /** Optional SEO <title> override for the detail page. */
  seoTitle?: string;
  /** Optional meta description override for the detail page. */
  metaDescription?: string;
  /** Optional long-form SEO sections + FAQs rendered below the room details. */
  seoContent?: RoomSeoContent;
};

export type Collection = {
  title: string;
  subtitle: string;
  rooms: Room[];
};

/** Sub-heading (h3) block inside a room SEO section. */
export type RoomSeoSubsection = {
  type: "subsection";
  heading: string;
  paragraphs: string[];
};

export type RoomSeoParagraph = {
  type: "paragraph";
  text: string;
};

export type RoomSeoBullets = {
  type: "bullets";
  items: string[];
};

export type RoomSeoBlock = RoomSeoSubsection | RoomSeoParagraph | RoomSeoBullets;

export type RoomSeoSection = {
  heading: string;
  blocks: RoomSeoBlock[];
  /** Optional inline image shown right after the section heading. */
  image?: string;
};

export type RoomSeoFaq = { q: string; a: string };

/** Long-form SEO content rendered below the room details (per-room, optional). */
export type RoomSeoContent = {
  sections: RoomSeoSection[];
  faqs?: RoomSeoFaq[];
};


const commonAmenities = [
  "Complimentary breakfast for 2",
  "Mountain-facing windows",
  "Premium bedding & linens",
  "Complimentary Wi-Fi",
  "24/7 room service",
  "Daily housekeeping",
  "Private bathroom with hot water",
];

// Amenity icons / images
export const amenityImages: Record<string, string> = {
  "Complimentary breakfast for 2": "/images/villas/amenities1.jpg",
  "Mountain-facing windows": "/images/villas/amenities2.jpg",
  "Premium bedding & linens": "/images/villas/amenities7.jpg",
  "Complimentary Wi-Fi": "/images/villas/amenities4.jpg",
  "24/7 room service": "/images/villas/amenities5.jpg",
  "Daily housekeeping": "/images/villas/amenities6.jpg",
  "Private bathroom with hot water": "/images/villas/amenities7.jpg",
};

// Fallback image
const AMENITY_FALLBACK = "/images/villas/amenities1.jpg";

/** Long-form SEO content for the Rakaposhi Single Executive Room detail page. */
const rakaposhiSingleExecutiveSeoContent: RoomSeoContent = {
  sections: [
    {
      heading: "Rakaposhi Single Executive Room at Himalaya Villas",
      image: imagePaths['rakaposhi-single-executive'][1],
      blocks: [
        {
          type: "paragraph",
          text: "The Rakaposhi Single Executive Room is an executive-category room inside Rakaposhi Villa at Himalaya Villas & Resorts, set in the Bhurban hills of Murree. It's built for guests who want a quiet, well-appointed room in Murree without the scale or noise of a full villa stay — ideal for a solo business trip, a short couple's getaway, or anyone who simply wants a comfortable room with a mountain view.",
        },
      ],
    },
    {
      heading: "About the Rakaposhi Single Executive Room",
      image: imagePaths['rakaposhi-single-executive'][2],
      blocks: [
        {
          type: "paragraph",
          text: "This room takes a restrained approach to luxury. Rather than filling the space with decoration, it leans on a plush king bed, executive-tier linens, and warm, layered lighting that can be dimmed for sleep or left on for evening reading. Windows open onto the villa garden and the mountains beyond, so even at roughly 280 sq ft, the room doesn't feel closed in.",
        },
        {
          type: "paragraph",
          text: "It's designed to work for two different kinds of stays: a business traveler who needs to reset after a long day of meetings, and a couple who wants a private base to explore Murree's trails and viewpoints. Either way, the room's job is to stay out of the way — comfortable, quiet, and reliably well-kept — while the view does the rest.",
        },
      ],
    },
    {
      heading: "Room Features and Amenities",
      image: imagePaths['rakaposhi-single-executive'][3],
      blocks: [
        {
          type: "subsection",
          heading: "Comfortable King Bed",
          paragraphs: [
            "The room is furnished with one king bed dressed in premium bedding and executive-tier linens, suitable for single occupancy or a couple. Guests needing a third person can request one extra mattress for an additional charge, up to a maximum of 3 persons per room.",
          ],
        },
        {
          type: "subsection",
          heading: "Private Bathroom",
          paragraphs: [
            "Every Rakaposhi Single Executive Room comes with a private bathroom with hot water — a basic but essential expectation for any hotel room in Murree, especially given the hill station's cooler climate for much of the year.",
          ],
        },
        {
          type: "subsection",
          heading: "Room Furnishings and Facilities",
          paragraphs: [
            "Beyond the bed and bathroom, the room includes daily housekeeping and 24/7 room service, so guests aren't limited to fixed meal or cleaning windows. The interiors use warm tones and clean lines, with mountain-facing windows that bring in natural light and views of the villa garden.",
          ],
        },
        {
          type: "subsection",
          heading: "Wi-Fi and In-Room Amenities",
          paragraphs: [
            "Complimentary Wi-Fi is included, along with the ambient lighting setup that lets guests adjust the room's mood — dim for rest, warm for reading or working in the evening.",
          ],
        },
      ],
    },
    {
      heading: "What to Expect During Your Stay",
      blocks: [
        {
          type: "paragraph",
          text: "Guests can expect a calm, low-fuss stay: breakfast for two is included each morning, housekeeping runs daily, and room service is available at any hour. The room itself doesn't compete with the surroundings — it's designed so the garden and mountain view stay the visual focus, while the room quietly handles comfort and practicality. For a family-friendly accommodation option or a vacation stay with a partner, that combination of privacy and included breakfast covers most of what a short Murree trip needs.",
        },
      ],
    },
    {
      heading: "Room Size, Capacity and Sleeping Arrangement",
      blocks: [
        {
          type: "bullets",
          items: [
            "Size: ~280 sq ft",
            "Bed: 1 king bed",
            "Max guests: 2 adults (breakfast included for 2)",
            "Max occupancy: 3 persons with one extra mattress (additional charges apply)",
            "View: Villa garden and mountains",
          ],
        },
        {
          type: "paragraph",
          text: "This makes it best suited to single occupancy or two guests sharing a bed, with the extra-mattress option available for a third guest, such as a child traveling with parents.",
        },
      ],
    },
    {
      heading: "Why Choose Rakaposhi Single Executive Room?",
      blocks: [
        {
          type: "paragraph",
          text: "A few practical reasons this room stands out among executive rooms in Murree:",
        },
        {
          type: "bullets",
          items: [
            "Breakfast for 2 is already built into the PKR 16,500 nightly rate, so there's no separate meal cost to plan for.",
            "The king bed and executive linens put it a tier above a standard single room in Murree, without pricing it as a full suite.",
            "Mountain and garden views come standard, not as a paid upgrade.",
            "24/7 room service and daily housekeeping mean the room stays comfortable throughout the stay, not just at check-in.",
          ],
        },
      ],
    },
    {
      heading: "Stay in a Comfortable Room in Murree",
      blocks: [
        {
          type: "paragraph",
          text: "Murree's hill stations are known for cooler weather, pine forests, and mountain views, and Bhurban — where Himalaya Villas is located — is one of the quieter parts of that area. Choosing a comfortable room here means getting the scenery without the crowding that some of Murree's more central hotel strips can have. The Rakaposhi Single Executive Room fits that brief: a private room with a view, set slightly away from the busier tourist center.",
        },
      ],
    },
    {
      heading: "Location and Nearby Attractions",
      blocks: [
        {
          type: "subsection",
          heading: "Places to Visit Near Himalaya Villas",
          paragraphs: [
            "Bhurban and the wider Murree hills area give guests easy access to viewpoints, pine forest trails, and the town of Murree itself, known for its Mall Road and colonial-era architecture. Guests often use Himalaya Villas as a base for day trips rather than staying in Murree's town center directly.",
          ],
        },
        {
          type: "subsection",
          heading: "Exploring Murree From Your Stay",
          paragraphs: [
            "Because the villa sits in the Murree hills rather than in the town itself, guests get a quieter overnight base while still being a short drive from Murree's main attractions — useful for anyone who wants scenery and rest at the property, and sightseeing during the day.",
          ],
        },
      ],
    },
    {
      heading: "Dining and Guest Facilities at Himalaya Villas",
      blocks: [
        {
          type: "paragraph",
          text: "Breakfast for 2 guests is included with every night's stay in this room. Beyond that, Himalaya Villas offers on-site dining and 24/7 room service, so guests aren't dependent on nearby restaurants for every meal, particularly useful given Murree's hill-station roads and weather can make evening travel less convenient.",
        },
      ],
    },
    {
      heading: "Who Is This Room Suitable For?",
      blocks: [
        {
          type: "paragraph",
          text: "This room suits:",
        },
        {
          type: "bullets",
          items: [
            "Solo business travelers who need a quiet, well-equipped room in Murree for a night or two.",
            "Couples looking for a private, comfortable room rather than a larger multi-room villa.",
            "Small families, using the optional extra mattress for a third guest such as a child.",
          ],
        },
      ],
    },
    {
      heading: "Book Rakaposhi Single Executive Room in Murree",
      blocks: [
        {
          type: "paragraph",
          text: "The Rakaposhi Single Executive Room is priced at PKR 16,500 per night, breakfast for 2 included. Room booking can be done directly through Himalaya Villas via WhatsApp, where guests can confirm availability, ask about current offers, and review the booking process before paying.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How do I book the Rakaposhi Single Executive Room?",
      a: "You can book directly through Himalaya Villas via WhatsApp, using the \"Book Now\" option on the room page. This sends your room selection, category, and rate directly to the property so they can confirm availability.",
    },
    {
      q: "How many people can stay in this room?",
      a: "Up to 2 adults are included in the standard rate. A third person can stay with an extra mattress, for an additional charge, up to a maximum of 3 persons per room.",
    },
    {
      q: "Does the room include Wi-Fi and heating?",
      a: "Yes, the room comes with complimentary Wi-Fi and heating arrangements, which is particularly useful given Murree's cold weather for most of the year.",
    },
    {
      q: "Are single executive rooms often sold out during peak season?",
      a: "Yes, single executive rooms are in high demand during Murree's summer season (May–August) and major holidays due to limited inventory. Booking in advance is strongly recommended to avoid last-minute unavailability.",
    },
  ],
};

/** Long-form SEO content for the Luxury Complete Villa detail page. */
const luxuryCompleteVillaSeoContent: RoomSeoContent = {
  sections: [
    {
      heading: "Luxury Complete Villas in the Himalayas",
      image: imagePaths['luxury-complete-villa'][1],
      blocks: [
        {
          type: "paragraph",
          text: "Tucked against the pine-covered slopes of the Himalayas, our Luxury Complete Villas are designed for travelers who want more than a hotel room — they want a private home in the mountains, fully staffed, fully stocked, and fully theirs for the duration of their stay.",
        },
        {
          type: "paragraph",
          text: "At Himalaya Villas & Resorts, \"complete\" isn't a marketing word. It means the villa comes with everything: private chef, housekeeping, heated interiors, a dedicated caretaker, and 24/7 support, so the only thing you plan is what time to wake up to the mountain view.",
        },
      ],
    },
    {
      heading: "What Makes a Villa \"Complete\"",
      image: imagePaths['luxury-complete-villa'][2],
      blocks: [
        {
          type: "paragraph",
          text: "Most villa rentals hand you a keyless entry code and a list of nearby restaurants. A Complete Villa experience is different. Every booking includes:",
        },
        {
          type: "bullets",
          items: [
            "A private chef who prepares meals to your taste — local Himachali or Kumaoni dishes, North Indian classics, or continental menus on request",
            "Full housekeeping during your stay, not just a checkout clean",
            "In-house heating and hot water systems, essential at altitude where nights drop well below daytime temperatures",
            "A dedicated villa manager who handles everything from grocery restocking to arranging a bonfire or a local guide",
            "Private parking, backup power, and Wi-Fi, so remote work or a family emergency never becomes a logistics problem",
          ],
        },
        {
          type: "paragraph",
          text: "This staffing model matters more in the mountains than almost anywhere else. Power cuts, water supply timing, and road access all behave differently at 6,000–8,000 feet than they do in a city. A property that's genuinely equipped to manage these realities — not just decorated to look luxurious in photos — is what separates a good villa stay from a frustrating one.",
        },
      ],
    },
    {
      heading: "Who These Villas Are Built For",
      image: imagePaths['luxury-complete-villa'][3],
      blocks: [
        {
          type: "bullets",
          items: [
            "Multi-generational family trips. Complete Villas typically have 3–6 bedrooms with independent living areas, so grandparents get quiet and privacy while kids have room to run.",
            "Destination celebrations. Anniversaries, proposals, and small milestone gatherings work well here because you get an entire property, not a shared hotel floor.",
            "Remote workers extending a trip. With private Wi-Fi, a quiet workspace, and no shared common areas, a \"workation\" is genuinely workable, not just marketed as one.",
            "Privacy-focused travelers. No lobby, no shared elevators, no other guests walking past your door — the villa is the only thing on the property during your stay.",
          ],
        },
      ],
    },
    {
      heading: "Location and Setting",
      image: imagePaths['luxury-complete-villa'][4],
      blocks: [
        {
          type: "paragraph",
          text: "Our villas sit at elevations chosen for a balance of mountain views and accessibility — close enough to local markets and trekking trailheads to be convenient, far enough from the main road to stay quiet at night. Most units face either the valley or a forest ridge, and orientation is something worth asking about directly when booking, since it affects both the view and the amount of afternoon sun the villa gets.",
        },
        {
          type: "paragraph",
          text: "Nearby, guests typically have access to:",
        },
        {
          type: "bullets",
          items: [
            "Short treks and nature walks starting within a 10–20 minute drive",
            "Local markets for handicrafts, wool, and regional produce",
            "Temples, viewpoints, and heritage sites specific to the region",
            "Adventure activities such as paragliding, river rafting, or skiing, depending on season and altitude",
          ],
        },
      ],
    },
    {
      heading: "Amenities Inside the Villa",
      image: imagePaths['luxury-complete-villa'][5],
      blocks: [
        {
          type: "bullets",
          items: [
            "Fireplace or centrally heated living rooms",
            "Fully equipped kitchen (used by the private chef, but available to guests too)",
            "Private balconies or terraces with mountain-facing seating",
            "En-suite bathrooms with hot water geysers in every room",
            "Dining area suited for group meals",
            "Optional bonfire and barbecue setup on request",
          ],
        },
      ],
    },
    {
      heading: "Best Time to Book a Himalayan Villa Stay",
      blocks: [
        {
          type: "bullets",
          items: [
            "March to June: Pleasant daytime temperatures, clear mountain views, ideal for families and first-time hill visitors",
            "July to September: Monsoon season — lush greenery but higher chances of road delays; good for travelers who don't mind rain and want fewer crowds",
            "October to February: Crisp, clear air and (at higher elevations) snowfall; popular for New Year and winter getaways, but book heating and road-access details in advance",
          ],
        },
        {
          type: "paragraph",
          text: "Because mountain weather shifts quickly, we recommend confirming road conditions with your villa manager 24–48 hours before arrival, especially between December and February.",
        },
      ],
    },
    {
      heading: "Why Choose Himalaya Villas & Resorts",
      blocks: [
        {
          type: "paragraph",
          text: "We've operated in this region long enough to know that a beautiful villa photo means nothing if the heating fails on a cold night or the road access wasn't checked before a family arrives. Our Complete Villas are built around solving the problems that actually come up at altitude — staffing, weather, and access — not just around interior design.",
        },
        {
          type: "paragraph",
          text: "If you're planning a family trip, a private celebration, or an extended mountain stay, our team can help you pick the right villa for your group size, season, and view preference. Ready to book, or want help choosing between villas? Contact our reservations team for real-time availability and a personalized recommendation.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How many people can stay in one villa?",
      a: "Most Complete Villas comfortably sleep 8–12 guests across multiple bedrooms. Larger groups can often be accommodated by booking adjoining villas — ask our team for group rates.",
    },
    {
      q: "Do the villas have heating for winter stays?",
      a: "Yes. All villas are equipped with central or room-level heating and insulated interiors, which matters significantly for December–February bookings when outdoor temperatures can drop below freezing.",
    },
    {
      q: "Is it safe to drive up to the villa in winter?",
      a: "Access roads are maintained, but heavy snowfall can occasionally cause short delays. Our team monitors conditions and will advise on the best route or alternate transport if needed.",
    },
  ],
};

export const collections: Collection[] = [
  {
    title: "Himalaya Apartments",
    subtitle:
      "Warm, homely apartments for couples and small families — quiet nights, mountain-facing windows.",
    rooms: [
      {
        slug: "apartment-single-luxury",
        tag: "APARTMENT",
        name: "Single Luxury Room",
        description:
          "A cozy luxury room with mountain-facing windows and warm interiors.",
        price: "27,000",
        images: imagePaths['apartment-single-luxury'],
        collection: "Himalaya Apartments",
        longDescription:
          "Nestled within the Himalaya Apartments, this single luxury room offers a warm, homely retreat with soft lighting, plush bedding, and framed views of the surrounding pines and peaks. Designed for couples or a solo traveler seeking calm, every detail — from the reading nook to the crisp linens — is tuned for slow mornings and quiet nights. Step inside and the room settles around you like a favorite sweater: warm wood tones on the walls, soft textiles underfoot, and a hush that makes the outside world feel pleasantly far away. Mornings here begin with light filtering through the mountain-facing window, catching the mist as it lifts off the pines, while the reading nook tucked into the corner invites you to linger over a book or a cup of chai before the day properly begins. The king-size bed is dressed in premium linens chosen for both softness and warmth, ideal for the cooler Bhurban evenings, and every surface — from the bedside table to the wardrobe — has been finished with the same unhurried attention to detail. Whether you're passing through on a weekend escape or settling in for a longer stay, this room is built around one idea: rest, uninterrupted. It's a space that rewards slowing down, where the view outside changes with the hour but the comfort inside stays constant, making it a favorite among guests who want their Himalaya Apartments stay to feel less like a hotel room and more like a home away from home.",
        highlights: [
          "King-size bed with premium linens",
          "Mountain-facing window with reading nook",
          "Warm wood accents and ambient lighting",
        ],
        details: [
          { label: "Max Guests", value: "2 adults (+1 extra mattress)" },
          { label: "Bed", value: "1 King" },
          { label: "View", value: "Mountain & pine forest" },
          { label: "Size", value: "~ 320 sq ft" },
        ],
        amenities: commonAmenities,
      },
      {
        slug: "apartment-complete",
        tag: "APARTMENT",
        name: "Complete Apartment",
        description:
          "Two luxury bedrooms with a shared living area — perfect for families.",
        price: "60,000",
        images: imagePaths['apartment-complete'],
        collection: "Himalaya Apartments",
        longDescription:
          "The Complete Apartment is a self-contained sanctuary — two luxurious bedrooms sharing a warm living area with mountain views. Ideal for families or two couples traveling together, it balances privacy and togetherness with a homey, curated feel throughout. Each of the two king bedrooms functions as its own private retreat, with its own share of natural light and its own quiet corner to unwind, while the shared living area in between becomes the natural heart of the apartment — a place for morning coffee, card games in the evening, or simply catching up on the day while the mountains sit framed in the window behind you. The layout was designed with real family life in mind: enough separation that everyone gets their own space to recharge, and enough shared area that no one feels tucked away in a corner. Warm textiles, soft lighting, and consistent wood-toned furnishings tie the two bedrooms and the living area together into one cohesive, welcoming whole, so the apartment never feels like two rooms bolted together but rather one flowing home. It's especially suited to families with children who want to keep an eye on each other, or two couples traveling as a group who want their own space at night but a shared spot to gather during the day. With room enough for up to four adults and two extra mattresses if needed, the Complete Apartment comfortably scales from a small family weekend to a fuller group getaway, all without losing the warm, personal atmosphere that defines the Himalaya Apartments collection.",
        highlights: [
          "Two full bedrooms with king beds",
          "Shared living area with mountain views",
          "Ideal for families of 4–6",
        ],
        details: [
          { label: "Max Guests", value: "4 adults (+2 extra mattresses)" },
          { label: "Beds", value: "2 Kings" },
          { label: "Living Area", value: "Private, shared between rooms" },
          { label: "Size", value: "~ 780 sq ft" },
        ],
        amenities: commonAmenities,
      },
    ],
  },
  {
    title: "Rakaposhi Villa",
    subtitle:
      "Signature villa with executive suites and a full-villa option for groups who want the whole place to themselves.",
    rooms: [
      {
        slug: "rakaposhi-single-executive",
        tag: "EXECUTIVE",
        name: "Single Executive Room",
        h1: "Rakaposhi Single Executive Room",
        seoTitle:
          "Rakaposhi Single Executive Room in Murree - Himalaya Villas & Resorts",
        metaDescription:
          "Book the Rakaposhi Single Executive Room at Himalaya Villas, Murree – private bathroom, free Wi-Fi & heating. Comfortable stay, best rates. Reserve now!",
        description:
          "Refined executive room with king bed and warm ambient lighting.",
        price: "16,500",
        images: imagePaths['rakaposhi-single-executive'],
        collection: "Rakaposhi Villa",
        longDescription:
          "A refined executive room inside the signature Rakaposhi Villa. Designed for professionals and couples, it pairs understated luxury with warm, layered lighting and a plush king bed — a restful base to explore Bhurban and Murree. The room leans into a quieter, more composed kind of luxury — nothing shouts for attention, but every element, from the executive-tier linens to the softly layered lighting, has clearly been considered. It's the kind of space that works equally well after a long day of meetings or a long day of hiking: the lighting can be dimmed low for an early night, or left warm and ambient for reading through the evening. Windows open onto the villa's garden and the mountains beyond, giving the room a sense of openness even though it's designed for one or two guests rather than a larger group. For business travelers passing through Bhurban, it offers a genuinely restful place to reset overnight without sacrificing polish; for couples, it offers a calm, private base from which to explore the trails, viewpoints, and town of Murree nearby. The understated interiors — warm tones, clean lines, no unnecessary clutter — mean the room never competes with the view outside, letting the garden and mountains remain the visual centerpiece while the room itself simply does its job of being quietly, reliably comfortable.",
        highlights: [
          "King bed with executive-tier linens",
          "Ambient layered lighting",
          "Refined, understated interiors",
        ],
        details: [
          { label: "Max Guests", value: "2 adults" },
          { label: "Bed", value: "1 King" },
          { label: "View", value: "Villa garden & mountains" },
          { label: "Size", value: "~ 280 sq ft" },
        ],
        amenities: commonAmenities,
        seoContent: rakaposhiSingleExecutiveSeoContent,
      },
      {
        slug: "rakaposhi-executive-suite",
        tag: "SUITE",
        name: "Executive Suite",
        description:
          "Two rooms with a private TV lounge — space to gather and unwind.",
        price: "30,000",
        images: imagePaths['rakaposhi-executive-suite'],
        collection: "Rakaposhi Villa",
        longDescription:
          "The Executive Suite combines two bedrooms with a private TV lounge — a place to gather after a day on the trails or in the town. Warm textures, plush seating, and framed mountain views define the space. Unlike a standard two-room setup, the private lounge here is treated as a genuine third space rather than an afterthought — soft, plush seating arranged around the TV, layered lighting that shifts easily from bright and functional to warm and relaxed, and large windows that keep the surrounding mountains visible even once the sun has gone down. It's built for the rhythm of a family or small group trip: mornings might start separately in each bedroom, but evenings naturally pull everyone back into the shared lounge for a film, a conversation, or simply winding down together before bed. The two bedrooms themselves each carry the same warm, executive-tier finish found throughout Rakaposhi Villa, so neither room feels like the second bedroom — both are built to the same standard of comfort. With capacity for up to four adults and an extra mattress if needed, the suite suits small families or two couples who want their own rooms at night but don't want to lose the shared social space that makes a trip feel like a trip, rather than just a stay.",
        highlights: [
          "Two bedrooms + private TV lounge",
          "Plush seating for family evenings",
          "Layered lighting throughout",
        ],
        details: [
          { label: "Max Guests", value: "4 adults (+1 extra mattress)" },
          { label: "Beds", value: "2 Kings" },
          { label: "Living Area", value: "Private TV lounge" },
          { label: "Size", value: "~ 720 sq ft" },
        ],
        amenities: commonAmenities,
      },
      {
        slug: "rakaposhi-complete-villa",
        tag: "WHOLE VILLA",
        name: "Complete Villa",
        description:
          "The entire Rakaposhi Villa — five executive rooms for your group.",
        price: "70,000",
        images: imagePaths['rakaposhi-complete-villa'],
        collection: "Rakaposhi Villa",
        longDescription:
          "Take over the entire Rakaposhi Villa — five executive rooms, shared lounges, and private gardens, reserved exclusively for your group. Ideal for reunions, retreats, and celebrations that deserve a whole villa to themselves. Booking the Complete Villa means the entire property, top to bottom, is yours alone for the duration of your stay — no shared corridors, no other guests, just your group moving freely between five executive bedrooms, multiple shared lounges, and the villa's private gardens. It's a setup that suits gatherings where the time spent together matters as much as the individual rooms: extended families reuniting after time apart, groups of friends marking a milestone, or teams looking for a retreat setting away from the usual conference room. Each of the five executive rooms carries the villa's signature warm, layered interiors, so no matter who ends up where, everyone gets the same standard of comfort. The shared lounges give the group natural gathering points throughout the day, while the private gardens offer a quieter outdoor space for morning walks or evening conversations under the Bhurban sky. With room for up to ten adults and five extra mattresses if the group runs larger, the Complete Villa scales generously without losing the intimate, homely character that defines Rakaposhi Villa as a whole — making it one of the more requested options for groups who want both space and exclusivity in one booking.",
        highlights: [
          "Exclusive use of the whole villa",
          "Five executive rooms",
          "Private gardens and lounges",
        ],
        details: [
          { label: "Max Guests", value: "10 adults (+5 extra mattresses)" },
          { label: "Bedrooms", value: "5 Executive Rooms" },
          { label: "Living Areas", value: "Multiple lounges + gardens" },
          { label: "Best For", value: "Groups, retreats, reunions" },
        ],
        amenities: commonAmenities,
      },
    ],
  },
  {
    title: "Himalaya Luxury Villas",
    subtitle:
      "Our flagship residences — from cozy attic escapes to full four-bedroom villas designed for celebrations.",
    rooms: [
      {
        slug: "luxury-attic",
        tag: "COZY",
        name: "Attic Room",
        description:
          "A snug loft with sloped wooden ceilings and soft evening light.",
        price: "27,000",
        images: imagePaths['luxury-attic'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "A snug attic loft tucked beneath sloped wooden ceilings — soft evening light, warm textiles, and dormer windows that frame the peaks. A romantic hideaway with a timeless, storybook feel. There's something quietly theatrical about the way the sloped ceilings pull inward toward the dormer windows, framing the mountains like a painting rather than a plain view — the kind of detail that makes the Attic Room feel less like a hotel room and more like a hideaway from an old story. Warm textiles are layered throughout, from the soft throws on the queen bed to the rugs underfoot, softening the wooden angles of the roofline and keeping the space feeling intimate rather than cramped. As evening falls, the light through the dormer windows turns golden before fading into the room's own warm, low lighting, making it a favorite for couples looking for a romantic, low-key escape rather than a grand, formal suite. Its cozier footprint compared to other rooms in the Himalaya Luxury Villas collection is very much by design — this is a room meant for two, meant for slowing down, meant for evenings spent talking under sloped ceilings rather than large groups or big celebrations. It's the kind of room guests tend to describe as charming rather than luxurious in the traditional sense, though the comfort and finish are every bit as considered as the rest of the villa.",
        highlights: [
          "Sloped wooden ceilings",
          "Dormer windows with mountain views",
          "Warm textiles and layered lighting",
        ],
        details: [
          { label: "Max Guests", value: "2 adults" },
          { label: "Bed", value: "1 Queen" },
          { label: "View", value: "Dormer mountain view" },
          { label: "Size", value: "~ 300 sq ft" },
        ],
        amenities: commonAmenities,
      },
      {
        slug: "luxury-single",
        tag: "LUXURY",
        name: "Single Luxury Room",
        description:
          "Marble accents, elegant lighting, and sweeping mountain views.",
        price: "27,000",
        images: imagePaths['luxury-single'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "A single luxury room in our flagship villa collection — marble accents, elegant chandeliers, and sweeping windows opening onto the mountains. Every touch is chosen for a refined, restorative stay. Where the rest of the villa leans warm and homely, this room introduces a slightly more polished register — marble surfaces catching the chandelier's light, sweeping windows that pull the mountain view directly into the room rather than framing it in a small corner, and a plush king bed dressed in premium linens that anchors the whole space. It's designed for guests who want the comfort and warmth of the Himalaya Luxury Villas experience but with a touch more formality and shine, whether that's for a special occasion, an anniversary stay, or simply because a slightly more elevated room suits the trip. The chandelier lighting is layered rather than harsh, so the room still feels relaxed in the evenings, while the marble accents in the bath and around the room add a cool, clean counterpoint to the warmth of the linens and furnishings. With sweeping panoramic views of the surrounding mountains as the room's true centerpiece, it rewards guests who spend a little extra time at the window in the early morning or at dusk, when the light does most of the work and the room's understated elegance simply provides the frame.",
        highlights: [
          "Marble accents and chandelier lighting",
          "Sweeping mountain-facing windows",
          "Plush king bed with premium linens",
        ],
        details: [
          { label: "Max Guests", value: "2 adults (+1 extra mattress)" },
          { label: "Bed", value: "1 King" },
          { label: "View", value: "Panoramic mountain" },
          { label: "Size", value: "~ 380 sq ft" },
        ],
        amenities: commonAmenities,
      },
      {
        slug: "luxury-suite",
        tag: "SUITE",
        name: "Luxury Suite (1 & 2)",
        description:
          "A bedroom paired with a private sitting area under a chandelier.",
        price: "50,000",
        images: imagePaths['luxury-suite'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "The Luxury Suite pairs a serene bedroom with a private sitting area beneath a statement chandelier — a space to unwind, read, and take in the light as it shifts across the peaks. The sitting area is really what sets this suite apart: rather than a bed and bath alone, guests get a genuine second space, furnished for reading, working quietly, or simply sitting with a view as the chandelier casts a soft glow overhead. It's a room built around the idea of lingering — the kind of suite where you might spend a full afternoon without ever feeling the need to leave, moving between the bedroom and the sitting area as the light outside shifts from midday brightness to the softer gold of late afternoon over the mountains. The marble bath adds a further layer of polish, with premium fittings that match the room's overall sense of quiet indulgence rather than showiness. With space for up to three adults and an extra mattress if needed, it suits couples wanting a slightly larger footprint, or a small family wanting one child to share the space comfortably. Across both Suite 1 and Suite 2, the same layout and finish carry through, so the choice between them comes down largely to position within the villa rather than any difference in comfort or style.",
        highlights: [
          "Bedroom + private sitting area",
          "Statement chandelier lighting",
          "Marble bath with premium fittings",
        ],
        details: [
          { label: "Max Guests", value: "3 adults (+1 extra mattress)" },
          { label: "Bed", value: "1 King + sitting area" },
          { label: "Living Area", value: "Private sitting lounge" },
          { label: "Size", value: "~ 520 sq ft" },
        ],
        amenities: commonAmenities,
      },
      {
        slug: "luxury-complete-villa",
        tag: "WHOLE VILLA",
        name: "Complete Villa",
        h1: "Luxury Complete Villas in the Himalayas",
        seoTitle: "Book Luxury Complete Villa - Himalaya Villas & Resorts",
        metaDescription:
          "Book Luxury Complete Villas in the Himalayas — private chef, 24/7 staff, mountain views. Limited villas available. Reserve yours today!",
        description:
          "Four bedrooms, private gardens, and mountain vistas — yours entirely.",
        price: "99,000",
        images: imagePaths['luxury-complete-villa'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "Reserve the entire flagship villa — four luxurious bedrooms, private gardens, and unbroken mountain vistas. Designed for milestone celebrations, family gatherings, and weekends where the whole villa is yours. As the flagship of the entire Himalaya Villas & Resorts collection, the Complete Villa is built to be the setting for occasions that call for more than just a room — birthdays, anniversaries, reunions, or simply a family wanting an entire weekend where every corner of the property belongs to them. All four luxury bedrooms carry the same refined finish found in the individual Luxury Single and Suite rooms, so no matter which bedroom a guest ends up in, the standard of comfort stays consistent throughout. Beyond the bedrooms, the villa opens into multiple shared lounges and private gardens, giving large groups the flexibility to spread out during the day — some reading in the garden, others gathered in a lounge — before naturally regrouping for meals or evenings together. The unbroken mountain vistas that surround the property are a constant throughout the stay, visible from nearly every shared space and several of the bedrooms themselves, tying the whole villa together with a single, sweeping backdrop. With capacity for up to eight adults and four extra mattresses, it's sized for genuinely large gatherings, while still retaining the warmth and detail that define the Himalaya Luxury Villas name — making it less a large hotel booking and more like renting out a private family estate in the mountains for the weekend.",
        highlights: [
          "Exclusive use of the whole villa",
          "Four luxury bedrooms",
          "Private gardens with mountain vistas",
        ],
        details: [
          { label: "Max Guests", value: "8 adults (+4 extra mattresses)" },
          { label: "Bedrooms", value: "4 Luxury Rooms" },
          { label: "Living Areas", value: "Multiple lounges + gardens" },
          { label: "Best For", value: "Celebrations & family gatherings" },
        ],
        amenities: commonAmenities,
        seoContent: luxuryCompleteVillaSeoContent,
      },
    ],
  },
];

export const roomsBySlug: Record<string, Room> = Object.fromEntries(
  collections.flatMap((c) => c.rooms.map((r) => [r.slug, r])),
);

// Helper function to get image paths by slug
export const getImagePathsBySlug = (slug: string): string[] => {
  return imagePaths[slug] || ['/assets/villas/placeholder.jpg'];
};

export const getImagePathBySlug = (slug: string): string => {
  return imagePaths[slug]?.[0] || '/assets/villas/placeholder.jpg';
};

// ==================== AMENITY HELPERS ====================

export const getAmenityImage = (amenity: string): string => {
  return amenityImages[amenity] || AMENITY_FALLBACK;
};

export const getAmenitiesWithImages = (amenities: string[]) => {
  return amenities.map((amenity) => ({
    name: amenity,
    image: getAmenityImage(amenity),
  }));
};