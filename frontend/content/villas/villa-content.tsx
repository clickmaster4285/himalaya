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
  'serene-valley-cabin': [
    '/assets/gallery-interior.jpg',
    '/assets/gallery-reflection.jpg',
    '/assets/gallery-exterior.jpg',
    '/assets/gallery-sunlight.jpg',
    '/assets/villa-honeymoon-real.jpg',
  ],
  'sunset-suite': [
    '/assets/gallery-interior.jpg',
    '/assets/gallery-exterior.jpg',
    '/assets/gallery-reflection.jpg',
    '/assets/gallery-sunlight.jpg',
    '/assets/villa-presidential-real.jpg',
  ],
  'garden-villa-retreat': [
    '/assets/gallery-garden.jpg',
    '/assets/gallery-exterior.jpg',
    '/assets/gallery-interior.jpg',
    '/assets/gallery-sunlight.jpg',
    '/assets/villa-alpine-real.jpg',
  ],
  'himalayan-penthouse': [
    '/assets/villa-penthouse.jpg',
    '/assets/gallery-exterior.jpg',
    '/assets/gallery-sunlight.jpg',
    '/assets/gallery-interior.jpg',
    '/assets/villa-presidential-real.jpg',
  ],
  'presidential-suite': [
    '/assets/villa-presidential-real.jpg',
    '/assets/villa-presidential.jpg',
    '/assets/gallery-exterior.jpg',
    '/assets/gallery-interior.jpg',
    '/assets/gallery-sunlight.jpg',
  ],
  'alpine-family-lodge': [
    '/assets/gallery-garden.jpg',
    '/assets/gallery-exterior.jpg',
    '/assets/gallery-interior.jpg',
    '/assets/gallery-sunlight.jpg',
    '/assets/villa-alpine-real.jpg',
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
};

export type Collection = {
  title: string;
  subtitle: string;
  rooms: Room[];
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
        slug: "serene-valley-cabin",
        tag: "CABIN",
        name: "Serene Valley Cabin",
        description:
          "A serene cabin retreat with panoramic windows, a private terrace, and peaceful valley views.",
        price: "45,000",
        images: imagePaths['serene-valley-cabin'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "Serene Valley Cabin is designed for quiet luxury and slow mountain mornings. Floor-to-ceiling windows open the cabin to the valley beyond, while the private terrace becomes the perfect place to enjoy tea, sunrise, or a peaceful evening under the stars. The interior balances warm wood tones, soft lighting, and refined textures to create a calm retreat that feels both elegant and intimate. It is ideal for couples, small families, or anyone looking for a private mountain hideaway with comfort at the center of the experience. Every detail has been shaped to feel restful — from the richly layered bedding to the open lounge area that invites you to linger and take in the changing landscape outside. Whether you are staying for a weekend escape or a longer break, this cabin offers a timeless setting for rest, conversation, and the kind of quiet that is hard to find elsewhere.",
        highlights: [
          "Panoramic valley-facing windows",
          "Private terrace for sunrise and sunset",
          "Warm cabin interiors with premium comfort",
        ],
        details: [
          { label: "Max Guests", value: "4 adults" },
          { label: "Bed", value: "2 Queen / 1 King" },
          { label: "View", value: "Valley & pine-covered hills" },
          { label: "Size", value: "~ 400 sq ft" },
        ],
        amenities: [
          ...commonAmenities,
          "Private terrace",
          "Fireplace",
          "Panoramic valley views",
        ],
      },
      {
        slug: "sunset-suite",
        tag: "SUITE",
        name: "Sunset Suite",
        description:
          "A warm suite with sunset-facing windows, cozy interiors, and a calm mountain atmosphere.",
        price: "49,000",
        images: imagePaths['sunset-suite'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "Sunset Suite captures the softer side of mountain luxury: golden evening light, intimate interiors, and a peaceful setting that feels like a private retreat. The room is designed around comfort and calm, with spacious windows that frame the valley at different times of day and bring in the changing colors of the sky. Whether you are winding down after a day in Murree or enjoying a quiet evening in, the suite offers a balanced mix of elegance, warmth, and simplicity. Its cozy layout makes it ideal for couples who want more than a standard room, without needing the footprint of a full villa. The atmosphere is gentle and restorative, from the soft lighting to the curated textures that make the space feel welcoming from the first moment you step inside.",
        highlights: [
          "Sunset-facing windows",
          "Cozy mountain retreat feel",
          "Premium comfort and intimate layout",
        ],
        details: [
          { label: "Max Guests", value: "2 adults" },
          { label: "Bed", value: "1 King" },
          { label: "View", value: "Valley sunset & pine hills" },
          { label: "Size", value: "~ 360 sq ft" },
        ],
        amenities: [
          ...commonAmenities,
          "Sunset-facing windows",
          "Cozy lounge corner",
          "Private mountain retreat feel",
        ],
      },
      {
        slug: "garden-villa-retreat",
        tag: "RETREAT",
        name: "Garden Villa Retreat",
        description:
          "A spacious family-friendly villa with mountain views, a private garden, and room to breathe.",
        price: "39,000",
        images: imagePaths['garden-villa-retreat'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "Garden Villa Retreat is designed for families and groups who want the feeling of a private mountain home without giving up comfort or style. With three bedrooms, a generous living space, and a private garden that opens up to the surrounding hills, the villa offers plenty of space for shared moments and quiet downtime alike. The layout suits families traveling together, groups of friends, or anyone who wants a more relaxed stay with room to gather, unwind, and enjoy the outdoors. The garden gives the villa a softer, more personal character, while the mountain views and open interiors keep the setting feeling expansive and welcoming. It is a home-like retreat where mornings can begin slowly with tea outside, afternoons can be spent together in the garden, and evenings can end with the cool mountain air and a calm sense of privacy.",
        highlights: [
          "Three-bedroom family layout",
          "Private garden with mountain views",
          "Ideal for groups and family stays",
        ],
        details: [
          { label: "Max Guests", value: "6 adults" },
          { label: "Bedrooms", value: "3 Bedrooms" },
          { label: "View", value: "Mountain & garden panorama" },
          { label: "Size", value: "~ 700 sq ft" },
        ],
        amenities: [
          ...commonAmenities,
          "Private garden",
          "Family-friendly layout",
          "Spacious living areas",
        ],
      },
      {
        slug: "himalayan-penthouse",
        tag: "PENTHOUSE",
        name: "Himalayan Penthouse",
        description:
          "A luxe penthouse stay with a broad balcony, skyline views, and refined mountain comfort.",
        price: "70,000",
        images: imagePaths['himalayan-penthouse'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "Himalayan Penthouse brings elevated mountain living to a new level with sweeping views, elegant interiors, and a spacious balcony that turns every sunrise and sunset into part of the experience. Designed for guests who want a premium stay with a more dramatic sense of presence, it pairs contemporary comfort with the calm atmosphere that defines the villa experience. The open layout makes it ideal for couples seeking a more luxurious escape, or for travelers who want a high-end base from which to enjoy the surrounding hills and the atmosphere of Bhurban. Large windows and the expansive balcony ensure that the views remain the centerpiece, while soft textures and thoughtful finishes keep the space refined and restful rather than overly formal.",
        highlights: [
          "Expansive balcony with skyline views",
          "Luxury penthouse setting",
          "Elegant, airy interiors",
        ],
        details: [
          { label: "Max Guests", value: "3 adults" },
          { label: "Bed", value: "1 King + lounge" },
          { label: "View", value: "Skyline & mountain panorama" },
          { label: "Size", value: "~ 600 sq ft" },
        ],
        amenities: [
          ...commonAmenities,
          "Expansive balcony",
          "Skyline views",
          "Premium penthouse comfort",
        ],
      },
      {
        slug: "presidential-suite",
        tag: "PRESIDENTIAL",
        name: "Presidential Suite",
        description:
          "The flagship suite with a private terrace, jacuzzi, and elevated mountain views.",
        price: "65,000",
        images: imagePaths['presidential-suite'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "The Presidential Suite is the signature expression of luxury in the villa collection — a grand, private retreat designed to feel both indulgent and deeply restful. With a private terrace, jacuzzi, and panoramic mountain views, it offers the kind of setting that turns a stay into a memorable experience from the moment you arrive. The suite balances rich comfort with elegant simplicity, giving you a spacious environment for slow mornings, long evenings, and quiet time taken in the view. It is the perfect choice for guests who want the most elevated experience in the property, whether for a special celebration, a romantic escape, or simply a luxurious break in the hills.",
        highlights: [
          "Private terrace and jacuzzi",
          "Flagship luxury suite",
          "Panoramics mountain views",
        ],
        details: [
          { label: "Max Guests", value: "4 adults" },
          { label: "Bed", value: "1 King + lounge" },
          { label: "View", value: "Mountain panorama & terrace" },
          { label: "Size", value: "~ 650 sq ft" },
        ],
        amenities: [
          ...commonAmenities,
          "Private terrace",
          "Jacuzzi",
          "Flagship luxury setting",
        ],
      },
      {
        slug: "alpine-family-lodge",
        tag: "LODGE",
        name: "Alpine Family Lodge",
        description:
          "A three-bedroom family lodge surrounded by cedar forests, mountain air, and open outdoor space.",
        price: "39,000",
        images: imagePaths['alpine-family-lodge'],
        collection: "Himalaya Luxury Villas",
        longDescription:
          "Alpine Family Lodge is made for families who want a mountain stay that feels welcoming, spacious, and rooted in nature. With three bedrooms, generous shared areas, and a setting wrapped by cedar forest and open views, it offers the comfort of a private lodge with enough room for everyone to settle in. The design leans toward togetherness — morning coffee in the common areas, afternoon downtime with the family, and evenings spent enjoying the cool air and peaceful surroundings. It is a strong fit for multi-generational travel, family weekends, or anyone looking for a calm retreat where children, adults, and grandparents can all have space without feeling separated from the experience.",
        highlights: [
          "Three-bedroom family-friendly layout",
          "Cedar forest surroundings",
          "Open spaces for shared family time",
        ],
        details: [
          { label: "Max Guests", value: "6 adults" },
          { label: "Bedrooms", value: "3 Bedrooms" },
          { label: "View", value: "Forest & mountain panorama" },
          { label: "Size", value: "~ 760 sq ft" },
        ],
        amenities: [
          ...commonAmenities,
          "Family-friendly lodge",
          "Cedar forest setting",
          "Spacious shared living areas",
        ],
      },
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