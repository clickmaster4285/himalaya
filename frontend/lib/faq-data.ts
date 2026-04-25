export type FaqPair = { q: string; a: string };

export type FaqCategory = { category: string; questions: FaqPair[] };

/** Single source of truth for FAQ UI + FAQPage JSON-LD (keep in sync with on-page content). */
export const faqData: FaqCategory[] = [
  {
    category: "General & Brand Positioning",
    questions: [
      {
        q: "What is Himalaya Villas & Resorts?",
        a: "Himalaya Villas & Resorts is a luxury private villa resort located in Bhurban, Murree Hills, Pakistan. It offers exclusive villa rentals with panoramic mountain views, premium interiors, personalized service, and dedicated event hosting — designed for families, couples, corporate groups, and destination weddings.",
      },
      {
        q: "What are the best luxury villas in Murree?",
        a: "Himalaya Villas & Resorts is widely regarded as one of the finest luxury villa experiences in Murree, offering private villa rentals with panoramic Himalayan views, premium furnishings, and fully personalized hospitality — setting it apart from conventional hotel accommodation.",
      },
      {
        q: "Is Himalaya Villas & Resorts a hotel or a private villa rental?",
        a: "Himalaya Villas & Resorts is a private luxury villa resort — not a standard hotel. Guests rent exclusive villa accommodation, ensuring complete privacy, dedicated service, and a bespoke experience not possible in a shared hotel environment.",
      },
      {
        q: "Where is Himalaya Villas & Resorts located?",
        a: "Himalaya Villas & Resorts is located in Bhurban, Murree Hills, Pakistan — approximately 60 km from Islamabad, only one hour and thirty minutes drive from Islamabad. The property sits at high altitude in the pine-forested hills of Bhurban forest, offering a cool mountain climate and spectacular natural surroundings.",
      },
      {
        q: "Why choose Himalaya Villas & Resorts over other Murree resorts?",
        a: "Unlike large chain hotels, Himalaya Villas & Resorts offers genuine privacy, personalized service tailored to each guest, and an intimate mountain atmosphere. The combination of exclusive villa accommodation, curated experiences, scenic Himalayan views, and dedicated event capability creates an experience that standardized hotels cannot replicate.",
      },
      {
        q: "Is Himalaya Villas & Resorts suitable for both leisure and business guests?",
        a: "Yes. Himalaya Villas & Resorts caters to a wide range of guests including leisure travellers, families, honeymooning couples, corporate teams, and event hosts. The property offers tailored experiences and packages for each guest profile.",
      },
    ],
  },
  {
    category: "Bookings & Availability",
    questions: [
      {
        q: "How can I book a villa at Himalaya Villas & Resorts, Murree?",
        a: "You can book directly through our official website, by calling our reservations team, or via WhatsApp. Advance booking is strongly recommended, particularly for weekends, peak seasons, and event dates.",
      },
      {
        q: "Is advance booking required?",
        a: "Yes. Due to the limited number of private villas and consistently high demand — especially during Eid holidays, summer (June–August), and long weekends — we recommend booking at least 2–4 weeks in advance. For weddings and corporate retreats, a minimum of 4–8 weeks advance booking is advised.",
      },
      {
        q: "What is the minimum stay at Himalaya Villas & Resorts?",
        a: "A minimum of one night is available for most dates. During peak season (Eid, summer, major long weekends), a minimum two-night stay may apply. Contact our reservations team for specific availability.",
      },
      {
        q: "Are short stays available at Himalaya Villas & Resorts?",
        a: "Yes, one-night stays are available subject to availability during standard periods. We also accommodate extended stays and multi-week bookings for guests seeking a longer mountain retreat.",
      },
      {
        q: "What are the check-in and check-out times at Himalaya Villas & Resorts?",
        a: "Standard check-in is at 2:00 PM and check-out is at 12:00 PM (noon). Early check-in and late check-out can be arranged subject to availability — please contact us in advance to make arrangements.",
      },
      {
        q: "What is the cancellation and refund policy?",
        a: "Our cancellation policy varies by season and package type. Please confirm the specific terms at the time of booking. We recommend reviewing cancellation conditions before confirming your reservation, particularly for peak season and event bookings.",
      },
      {
        q: "Can I visit the property before making a booking?",
        a: "Yes, site visits can be arranged by appointment. This is particularly recommended for prospective wedding and event clients. Please contact our team to schedule a visit.",
      },
    ],
  },
  {
    category: "Location & Accessibility",
    questions: [
      {
        q: "How far is Bhurban from Islamabad?",
        a: "Bhurban is approximately 55–65 km from central Islamabad, typically a 1.5 to 2-hour drive via the Murree Expressway. The route is well-maintained and accessible year-round, making Himalaya Villas & Resorts an ideal weekend escape from the twin cities.",
      },
      {
        q: "How far is Himalaya Villas & Resorts from Rawalpindi?",
        a: "Himalaya Villas & Resorts is approximately 55 km from Rawalpindi — around 1.5 to 2 hours by road via the Murree Expressway. It is a straightforward and well-signposted route from Pindi.",
      },
      {
        q: "How far is Himalaya Villas & Resorts from Lahore?",
        a: "Lahore is approximately 280–300 km from Bhurban, making it a scenic 3.5 to 4.5-hour drive. Many guests from Lahore travel up for weekends and Eid holidays. Advance booking is essential for Lahore-based guests during peak periods.",
      },
      {
        q: "Is parking available at Himalaya Villas & Resorts?",
        a: "Yes, secure on-site parking is available for all guests. Our team can assist with vehicle arrangements if required.",
      },
      {
        q: "Is Himalaya Villas & Resorts accessible during winter and snow season?",
        a: "Bhurban is generally accessible year-round. During heavy snowfall (typically December–February), road conditions can be affected. We advise guests to check road conditions before travelling in winter months and to carry appropriate vehicle preparations. Our team will always advise on conditions prior to your arrival.",
      },
      {
        q: "What is the nearest airport to Himalaya Villas & Resorts?",
        a: "The nearest airport is Islamabad International Airport (IATA: ISB), approximately 75–80 km from Bhurban — around a 2-hour drive. Airport pickup or transfer arrangements can be discussed with our team.",
      },
      {
        q: "Are there local attractions near Himalaya Villas & Resorts in Bhurban?",
        a: "Bhurban and the surrounding Murree Hills offer a range of attractions including scenic viewpoints, forest walks, the famous Mall Road Murree, Ayubia National Park, and the PC Golf Course. Our team can provide recommendations and assist with local arrangements.",
      },
    ],
  },
  {
    category: "Accommodation & Facilities",
    questions: [
      {
        q: "What is included in the villa rental at Himalaya Villas & Resorts?",
        a: "Each villa includes fully furnished luxury interiors, premium bedding, private living and dining spaces, mountain view terraces or outdoor areas, high-speed WiFi, smart entertainment systems, housekeeping, and access to shared resort facilities. Specific inclusions vary by villa type — please confirm at the time of booking.",
      },
      {
        q: "Are the villas fully furnished?",
        a: "Yes. All villas at Himalaya Villas & Resorts are fully furnished to a premium standard, featuring contemporary luxury interiors, quality furnishings, premium linens, and thoughtfully designed spaces that reflect the mountain setting.",
      },
      {
        q: "Is WiFi available at Himalaya Villas & Resorts?",
        a: "Yes, high-speed internet and WiFi are available throughout the property. This also supports guests using the facilities for corporate retreats, remote working, and business meetings.",
      },
      {
        q: "Is heating available during cold months?",
        a: "Yes. All villas are equipped with heating for the cooler months, ensuring comfort during the winter season and cooler evenings throughout the year. Bhurban's altitude means even summer evenings can be cool — our villas are designed for year-round comfort.",
      },
      {
        q: "Are the villas air-conditioned for summer?",
        a: "Bhurban's natural mountain altitude (approximately 1,800–2,000 metres above sea level) provides a naturally cool climate throughout the summer, making it one of the most popular escapes from lowland heat. Cooling systems are also available where required.",
      },
      {
        q: "Is professional staff available on-site at Himalaya Villas & Resorts?",
        a: "Yes. A dedicated hospitality team including housekeeping, concierge, and guest services staff is available to assist guests throughout their stay. Our team is trained to deliver a premium, discreet service that respects guest privacy while ensuring every requirement is met.",
      },
      {
        q: "What outdoor spaces and activities are available?",
        a: "Guests can enjoy private outdoor terraces, landscaped gardens, scenic viewpoints, forest walking paths, and outdoor event areas. Additional activities including nature walks and curated experiences can be arranged through our concierge team.",
      },
      {
        q: "How many villas are available at Himalaya Villas & Resorts?",
        a: "Himalaya Villas & Resorts maintains a deliberately limited number of private villas to preserve the exclusivity and intimacy of the experience. Please contact our team directly for current availability and capacity details.",
      },
    ],
  },
  {
    category: "Dining & Catering",
    questions: [
      {
        q: "Is food and dining available at Himalaya Villas & Resorts?",
        a: "Yes. In-villa dining and catering services are available for guests. We offer a range of dining options from private in-villa meals to catered event dining. Please contact our team to discuss your dining preferences and requirements.",
      },
      {
        q: "Is halal food available at Himalaya Villas & Resorts?",
        a: "Yes, all food served at Himalaya Villas & Resorts is halal, prepared and handled in accordance with Islamic dietary standards.",
      },
      {
        q: "Can catering be arranged for weddings and large events?",
        a: "Yes. Our team coordinates professional catering for weddings, corporate dinners, and large group events. Full-service catering packages can be arranged, including multi-course meals, traditional Pakistani cuisine, and custom menus. Please contact us for event catering quotations.",
      },
      {
        q: "Can dietary requirements and special requests be accommodated?",
        a: "Yes. We accommodate dietary requirements including vegetarian and other preferences with advance notice. Please inform our team of any dietary needs or special requests at the time of booking.",
      },
    ],
  },
  {
    category: "Events, Weddings & Corporate",
    questions: [
      {
        q: "Is Himalaya Villas & Resorts a wedding venue in Murree?",
        a: "Yes. Himalaya Villas & Resorts is one of the most sought-after destination wedding venues in Murree and Bhurban. The property offers scenic outdoor ceremony spaces, mountain backdrops, luxury accommodation for the wedding party, and coordinated event services — all within an exclusively private setting.",
      },
      {
        q: "What types of events can be hosted at Himalaya Villas & Resorts?",
        a: "Himalaya Villas & Resorts hosts a range of private events including destination weddings, mehndi and wedding-related celebrations, milestone birthday gatherings, corporate retreats and team off-sites, executive board meetings, product launches, and private family celebrations.",
      },
      {
        q: "What is the guest capacity for events at Himalaya Villas & Resorts?",
        a: "Himalaya Villas & Resorts can accommodate events of varying sizes. For specific capacity figures for your event type and layout, please contact our events team directly. We work closely with clients to design events within the property's natural spaces.",
      },
      {
        q: "Are Himalaya Villas & Resorts suitable for corporate retreats?",
        a: "Yes. Himalaya Villas & Resorts is an ideal setting for executive retreats, leadership off-sites, strategy sessions, and team-building programmes. The property offers private meeting spaces, high-speed WiFi, catering, and full accommodation — away from urban distractions in a setting that inspires clear thinking and productive discussion.",
      },
      {
        q: "Is event management and coordination available?",
        a: "Yes. Our events team works with clients from initial consultation through to event day, coordinating venue setup, catering, décor arrangements, and hospitality logistics. We can also work with your preferred external vendors and event planners.",
      },
      {
        q: "Can we exclusively book Himalaya Villas & Resorts for our event?",
        a: "Yes. Exclusive buyout of the property is available for weddings and major private events, ensuring complete privacy and uninterrupted use of all facilities. Please contact our team to discuss exclusive booking arrangements and pricing.",
      },
      {
        q: "Is Himalaya Villas & Resorts available for birthday parties and private celebrations?",
        a: "Yes. Himalaya Villas & Resorts hosts private birthday celebrations, anniversary dinners, engagement parties, and family gatherings. Our team can assist with customized decoration, catering, and entertainment arrangements.",
      },
    ],
  },
  {
    category: "Guest Experience & Suitability",
    questions: [
      {
        q: "Are Himalaya Villas & Resorts suitable for families with children?",
        a: "Yes. Himalaya Villas & Resorts is a family-friendly property with spacious villa layouts, safe outdoor areas, and a private environment ideal for families travelling with children. The mountain setting and natural surroundings also offer a refreshing and engaging environment for younger guests.",
      },
      {
        q: "Is Himalaya Villas & Resorts suitable for couples and honeymoons?",
        a: "Yes. Himalaya Villas & Resorts is a popular choice for honeymoons and couples' retreats. The combination of private villa accommodation, intimate mountain setting, and the ability to arrange romantic dining and personalized touches makes it an ideal destination for couples seeking privacy and luxury.",
      },
      {
        q: "Is Himalaya Villas & Resorts suitable for large groups?",
        a: "Yes. The property can accommodate large groups including extended family gatherings, corporate teams, and wedding parties. Multiple villas can be reserved together for group bookings. Please contact our reservations team to discuss group accommodation arrangements.",
      },
      {
        q: "Is Himalaya Villas & Resorts good for a weekend getaway from Islamabad?",
        a: "Absolutely. At approximately 1.5–2 hours from Islamabad, Himalaya Villas & Resorts is one of the most accessible and rewarding weekend escapes from the capital. Guests frequently book Friday-to-Sunday stays to decompress in the mountains without a long journey.",
      },
      {
        q: "Is the environment peaceful and private?",
        a: "Yes. Unlike the main Murree strip which can be very crowded, particularly during peak summer and holiday periods, Bhurban offers a quieter and more refined environment. Himalaya Villas & Resorts is specifically designed around privacy — guests are not sharing corridors, lobbies, or common areas with large numbers of strangers.",
      },
      {
        q: "Is Himalaya Villas & Resorts safe and secure?",
        a: "Yes. The property maintains security on-site. The gated and private nature of the villa resort means guests can relax with confidence. The environment is safe for families including those with young children.",
      },
    ],
  },
  {
    category: "Seasonal & Best Time to Visit",
    questions: [
      {
        q: "What is the best time to visit Himalaya Villas & Resorts, Murree?",
        a: "Himalaya Villas & Resorts is a year-round destination. The peak leisure season is May through August when temperatures are 15–25°C — a refreshing contrast to the lowland heat. The monsoon period (July–August) brings lush greenery and dramatic cloud landscapes. Winter (November–February) offers a crisp, serene atmosphere and occasional snowfall. Spring (March–April) is particularly beautiful with blossoming scenery.",
      },
      {
        q: "How is the weather in Bhurban during summer?",
        a: "Summer in Bhurban (June–August) is pleasantly cool, with daytime temperatures typically ranging from 18–26°C. This contrasts dramatically with temperatures exceeding 40°C in Islamabad, Lahore, and Karachi during the same period — making Himalaya Villas & Resorts an extremely popular escape during these months.",
      },
      {
        q: "Does Himalaya Villas & Resorts get snow in winter?",
        a: "Yes. Bhurban typically receives snowfall between December and February, occasionally as early as November. Many guests specifically visit during this period for the snow experience. Road access is generally maintained but guests are advised to check conditions and travel in appropriate vehicles during heavy snowfall periods.",
      },
      {
        q: "Is Himalaya Villas & Resorts available during Eid holidays?",
        a: "Yes, Himalaya Villas & Resorts operates during all Eid holidays (Eid ul Fitr and Eid ul Adha). These are among our busiest periods and villas typically book out weeks in advance. We strongly recommend early booking to secure your preferred Eid dates. Special Eid packages are available — contact our team for details.",
      },
    ],
  },
  {
    category: "Pricing & Packages",
    questions: [
      {
        q: "How much does it cost to stay at Himalaya Villas & Resorts?",
        a: "Rates vary by villa type, season, and the number of guests. Himalaya Villas & Resorts is positioned as a premium luxury property with pricing to match the exclusivity and quality of the experience. For current availability and pricing, please contact our reservations team directly or visit our official website.",
      },
      {
        q: "Are there packages available for families, couples, or corporate groups?",
        a: "Yes. We offer tailored packages for families, couples, honeymooners, and corporate groups. Packages may include accommodation, dining, activities, and event services bundled for convenience and value. Please enquire with our team for current package options.",
      },
      {
        q: "Do you offer corporate rate agreements for frequent bookings?",
        a: "Yes. Corporate rate agreements are available for organisations that require regular accommodation for executive travel, client entertainment, or team retreats. Please contact our sales team to discuss corporate rates and terms.",
      },
    ],
  },
];
