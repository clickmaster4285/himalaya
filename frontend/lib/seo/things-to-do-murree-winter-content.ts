export const WINTER_MURREE_PATH = "/things-to-do-in-murree-in-winter";

export type WinterFaq = { q: string; a: string };

export const winterAtAGlance = [
  { label: "Snowfall season", value: "December–February" },
  { label: "Peak snowfall", value: "January & February" },
  { label: "Bhurban advantage", value: "Earlier, deeper snow than Murree town" },
  { label: "Temperature", value: "-2°C to +8°C in Bhurban" },
  { label: "Property", value: "Fully heated · Private fire setup" },
  { label: "Booking", value: "Winter weekends fill fastest — book early" },
] as const;

export const winterActivities = [
  {
    id: "bonfire",
    title: "Private Bonfire Evening",
    badge: "Most requested",
    paragraphs: [
      "The bonfire at Himalaya Villas is arranged by the villa host on the private outdoor terrace — a fire in the pine trees, dinner served at the fireside by the villa kitchen, and the specific mountain silence that a Bhurban evening provides after snowfall. This is the most requested single experience among Himalaya Villas winter guests, consistently. Available on every stay, year-round, but most requested in the December–February window.",
    ],
    bullets: [
      "Arrangement: Include it in your WhatsApp booking message — it is set up before you arrive",
      "Timing: Typically 8pm–10:30pm | Earlier on snowfall evenings for maximum atmosphere",
      "Food: In-villa kitchen provides full fireside menu on request",
    ],
  },
  {
    id: "sledging",
    title: "Sledging — The Right Way to Experience It",
    paragraphs: [
      "Sledging in Murree town on a peak weekend means competing for slope space with hundreds of other visitors, hired wooden sledges from roadside vendors, and queues for every incline. Sledging in Bhurban for Himalaya Villas guests means the private property grounds after a fresh snowfall — safe, uncrowded, and at the specific pace that a family or couple sets for themselves.",
      "For those who want the full sledging scene, Patriata slopes and the Kashmir Point area provide the most activity — best visited on weekdays or early Saturday mornings when the professional sledging vendors are operational without the peak crowd. Himalaya Villas concierge advises on timing and can arrange transport.",
    ],
    bullets: [
      "Private grounds sledging: Available to all guests on snowfall days — no charge, no queue",
      "Patriata slopes: 25 min from property | Hired sledge PKR 200–400/hour | Best weekday mornings",
    ],
  },
  {
    id: "patriata",
    title: "Patriata Chairlift in Winter — The Snow Version",
    paragraphs: [
      "The Patriata chairlift in winter is a categorically different experience from its summer version. Snow-covered pine trees below the open cabin, white slopes in every direction, and the cold air at the upper ridge station create an experience that most Pakistani visitors associate with European ski destinations rather than a 25-minute drive from Bhurban.",
      "In winter, the upper station provides direct access to sledging slopes. The chairlift operates in most winter conditions; it may suspend during heavy active snowfall — the Himalaya Villas team confirms operational status before any guest departs.",
    ],
    bullets: [],
  },
  {
    id: "photography",
    title: "Snowfall Photography — The Best Locations From Himalaya Villas",
    paragraphs: [
      "Professional travel photographers who cover Pakistan's mountain landscape consistently identify the Bhurban forest at Himalaya Villas as one of the most under-photographed winter settings in the country. Snow-laden pine branches against grey morning sky, the ridgeline view from the property terrace in full winter white, the specific quality of light in the hour after a storm clears — these conditions produce images that Mall Road and Kashmir Point do not.",
      "For guests who photograph seriously: the optimal timing is 30 minutes after a snowfall ends, in the first light of the following morning. The villa kitchen has been asked, on multiple occasions, to have cameras charged and chai ready at 4:30am for guests determined to catch the right moment. It has never refused.",
    ],
    bullets: [
      "Best camera position: Himalaya Villas terrace — faces the ridgeline, pine forest foreground",
      "Best light: Dawn after overnight snowfall | Golden hour before storm clears",
      "Snow gear rental: Warm clothing layers at Mall Road shops | Snow chains from Expressway vendors",
    ],
  },
  {
    id: "stargazing",
    title: "Stargazing in Winter — The Mountain Night Nobody Tells You About",
    paragraphs: [
      "Between October and March, on clear nights when cloud cover lifts after a storm, the sky above Bhurban is dark enough for the Milky Way to be visible with the naked eye from the Himalaya Villas outdoor terrace. This is not a marketed activity — it requires no booking, no guide, no transport. It requires only being at the right place when the sky cooperates.",
      "Himalaya Villas guests are notified by the villa team when conditions are optimal for stargazing on their given night. A clear-sky snowfall evening — the mountain landscape white below a brilliant star field — is the specific visual that guests consistently describe as the unexpected highlight of their winter stay.",
    ],
    bullets: [],
  },
] as const;

export const packingList = [
  "Thermal base layers, top and bottom — Bhurban nights reach -2°C, wind chill makes it feel colder",
  "Waterproof outer jacket — snowfall is wet; a standard wool coat becomes heavy and cold quickly",
  "Waterproof boots or snow boots — standard leather shoes are uncomfortable within minutes on snow",
  "Gloves, warm hat — uncovered hands and ears are uncomfortable in Bhurban wind within ten minutes",
  "Power bank — cold temperatures drain phone batteries 2–3x faster than normal",
  "4x4 or AWD vehicle — strongly recommended for Bhurban road access during active snowfall",
] as const;

export const winterFaqs: WinterFaq[] = [
  {
    q: "When does it snow in Murree?",
    a: "Snowfall in Murree and Bhurban typically begins in mid to late December with the onset of western disturbances. January and February are the most reliable months — three to six separate snowfall events per month in an average year. First snowfall of the season usually occurs December 10–20. Bhurban at 6,500 ft receives snowfall slightly earlier than Murree town and holds it longer due to orientation and elevation. Himalaya Villas provides guests with real-time PMD snowfall forecast updates via WhatsApp for their specific dates.",
  },
  {
    q: "What is the difference between a Murree town winter stay and Himalaya Villas?",
    a: "A Murree town hotel winter stay means sharing the snowfall experience with hundreds of other guests, a crowded Mall Road, and a hotel room with a parking lot view or a corridor window. Himalaya Villas winter stay means private outdoor space with fresh snow, forest trails accessible from the property, a dedicated bonfire evening in the trees, and the specific quiet that only exists when you are not in the middle of a tourist town. Same snowfall. Different experience entirely.",
  },
  {
    q: "Is Murree safe to visit in winter?",
    a: "Yes, with the right preparation. The Murree Expressway may be temporarily restricted during heavy snowfall (road clearance operations typically last 4–12 hours). A 4x4 or AWD vehicle is recommended for Bhurban road access. Himalaya Villas provides guests with road condition briefings via WhatsApp before travel. The property itself is fully operational and heated throughout winter with no road access concerns for guests already on-site.",
  },
  {
    q: "Where should I stay in Murree in winter for the best snowfall experience?",
    a: "Himalaya Villas in Bhurban is the best accommodation for a winter snowfall experience in the Murree Hills — private outdoor space for snow walks and bonfire evenings, direct pine forest access from the property gate, mountain terrace with ridgeline snowfall views, and a villa team that anticipates the specific needs of winter guests. Book via WhatsApp directly — winter weekends fill earlier than any other season.",
  },
];

export const winterRelatedLinks = [
  { href: "/snowfall-in-murree", label: "Snowfall in Murree — full calendar & forecast guide" },
  { href: "/things-to-do-in-murree", label: "Things to do in Murree — complete 2026 guide" },
  { href: "/romantic-hotels-murree", label: "Couples & winter escapes" },
  { href: "/family-hotels-murree", label: "Family winter stays" },
  { href: "/murree-hotel-packages", label: "Winter packages & rates" },
] as const;
