import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Users, Sparkles, Heart } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import EventQuoteForm from "@/components/EventQuoteForm";
import EventFAQs from "@/components/EventFAQs";

// Event data mapping
const eventDetails: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  category: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}> = {
  "nikah-wedding-reception": {
    title: "Nikah & Wedding Reception",
    description: "Complete setup from sacred ceremony to elegant reception.",
    longDescription: "Experience the perfect blend of tradition and luxury with our comprehensive Nikah and Wedding Reception packages. From the sacred ceremony to the grand reception, we handle every detail with precision and care, ensuring your special day is nothing short of magical.",
    features: [
      "Sacred Nikah ceremony setup with traditional decor",
      "Elegant reception hall with premium floral arrangements",
      "Professional photography and videography services",
      "Luxury accommodation for wedding party",
      "Gourmet catering with customizable menus",
      "Dedicated event coordinator throughout"
    ],
    image: "https://picsum.photos/seed/wedding1/800/600.jpg",
    category: "Weddings & Ceremonies",
    faqs: [
      {
        question: "What is included in the Nikah ceremony setup?",
        answer: "Our Nikah package includes a beautifully decorated ceremony area with traditional Islamic motifs, seating for guests, sound system for the Imam, and floral arrangements. We also provide a separate area for the bride and groom preparation."
      },
      {
        question: "How many guests can you accommodate for the wedding reception?",
        answer: "We can accommodate up to 300 guests for indoor receptions and up to 500 guests for outdoor receptions. Our flexible venue spaces allow for various seating arrangements and dining setups."
      },
      {
        question: "Do you provide catering services for the wedding events?",
        answer: "Yes, we offer comprehensive catering services with customizable menus ranging from traditional Pakistani cuisine to international dishes. Our culinary team can accommodate dietary restrictions and special requests."
      },
      {
        question: "What photography and videography services are included?",
        answer: "Our package includes professional photography coverage for both Nikah and reception events, with unlimited high-resolution images, cinematic video coverage, and a dedicated online gallery for sharing with family and friends."
      }
    ]
  },
  "mehndi": {
    title: "Mehndi",
    description: "Colorful mehndi celebrations with music, dance, and floral stage design.",
    longDescription: "Celebrate the joyous tradition of Mehndi with vibrant colors, lively music, and energetic dance performances. Our Mehndi celebrations are designed to create unforgettable memories with beautiful floral stage designs and festive atmosphere.",
    features: [
      "Colorful floral stage with traditional Mehndi theme",
      "Live DJ and dhol players for energetic atmosphere",
      "Professional mehndi artists available",
      "Traditional decor with modern lighting",
      "Catering with festive menu options",
      "Dedicated event management team"
    ],
    image: "https://picsum.photos/seed/mehndi2/800/600.jpg",
    category: "Weddings & Ceremonies",
    faqs: [
      {
        question: "How long does a typical Mehndi ceremony last?",
        answer: "Our Mehndi ceremonies typically last 4-6 hours, including setup, main ceremony, and celebration time. We can adjust the duration based on your preferences and guest count."
      },
      {
        question: "Do you provide mehndi artists or do we bring our own?",
        answer: "We can provide professional mehndi artists with various design styles, or you're welcome to bring your preferred artists. Our team will ensure proper setup and coordination either way."
      },
      {
        question: "What kind of music and entertainment is included?",
        answer: "Our package includes a DJ system, traditional dhol players, and a curated playlist of mehndi songs. We can also arrange for live performances or special entertainment based on your preferences."
      },
      {
        question: "Can you accommodate both indoor and outdoor mehndi setups?",
        answer: "Yes, we offer both indoor and outdoor mehndi setups with proper weather protection for outdoor events. Our team will ensure the venue is beautifully decorated regardless of the chosen setup."
      }
    ]
  },
  "baraat": {
    title: "Baraat",
    description: "Grand baraat entry and reception-style setup with premium event flow.",
    longDescription: "Make a grand entrance with our spectacular Baraat celebrations. From the majestic entry to the elegant reception, we create a seamless flow that honors tradition while providing luxury hospitality.",
    features: [
      "Grand baraat entry pathway with floral decor",
      "Premium reception setup with stage lighting",
      "Traditional dhol and band performers",
      "Luxury seating arrangements for guests",
      "Professional photography coverage",
      "Coordinated event timing and management"
    ],
    image: "https://picsum.photos/seed/baraat3/800/600.jpg",
    category: "Weddings & Ceremonies",
    faqs: [
      {
        question: "What does the Baraat entry setup include?",
        answer: "Our Baraat package includes a decorated entry pathway with traditional floral arches, horse-drawn carriage or luxury vehicle option, dhol players, and coordinated entry music for a grand arrival."
      },
      {
        question: "How do you coordinate the Baraat timing with the wedding schedule?",
        answer: "Our event coordinators work closely with your wedding planner to ensure perfect timing. We coordinate with all vendors and manage the Baraat entry to align seamlessly with your ceremony schedule."
      },
      {
        question: "What safety measures are in place for the Baraat procession?",
        answer: "We provide security personnel, crowd management, and clear pathways for safe Baraat entry. Our team ensures all safety protocols are followed while maintaining the celebratory atmosphere."
      },
      {
        question: "Can you customize the Baraat theme and decorations?",
        answer: "Absolutely! We offer customizable themes ranging from traditional to contemporary styles. Our design team works with you to create the perfect Baraat aesthetic that matches your wedding vision."
      }
    ]
  },
  "dholki-bridal-shower": {
    title: "Dholki & Bridal Shower",
    description: "Intimate pre-wedding celebrations tailored to your family style.",
    longDescription: "Create cherished memories with intimate Dholki and Bridal Shower celebrations. We design personalized experiences that reflect your family's unique style and traditions.",
    features: [
      "Intimate venue setup with personalized decor",
      "Traditional dholki instruments and music",
      "Bridal shower themes and activities",
      "Custom catering for family preferences",
      "Professional event coordination",
      "Photography and videography services"
    ],
    image: "https://picsum.photos/seed/dholki4/800/600.jpg",
    category: "Weddings & Ceremonies",
    faqs: [
      {
        question: "What is the difference between Dholki and Bridal Shower?",
        answer: "Dholki is a traditional pre-wedding celebration with music and dancing, while Bridal Shower is a more modern gift-giving ceremony. We can combine both traditions or celebrate them separately based on your preference."
      },
      {
        question: "How many guests can attend these intimate celebrations?",
        answer: "Our intimate venues can accommodate 20-50 guests for Dholki and Bridal Shower events. We offer both indoor and outdoor options depending on the season and your preference."
      },
      {
        question: "Do you provide decorations and themes for these events?",
        answer: "Yes, we offer full decoration services with themes ranging from traditional Pakistani to modern contemporary styles. Our team creates beautiful, personalized setups for each celebration."
      },
      {
        question: "What catering options are available for these events?",
        answer: "We provide customized catering menus including traditional sweets, savory snacks, and full meal options. Our culinary team can accommodate dietary restrictions and cultural preferences."
      }
    ]
  },
  "valima-wedding-dinner": {
    title: "Valima & Wedding Dinner",
    description: "Refined dining and stage styling for post-nikah celebration.",
    longDescription: "Celebrate your Valima with refined elegance and sophisticated dining. Our Valima packages combine traditional hospitality with modern luxury for the perfect post-nikah celebration.",
    features: [
      "Elegant dining hall with premium table settings",
      "Sophisticated stage design and lighting",
      "Gourmet multi-course dinner menu",
      "Professional service staff",
      "Decor coordination with wedding theme",
      "Dedicated event management"
    ],
    image: "https://picsum.photos/seed/valima5/800/600.jpg",
    category: "Weddings & Ceremonies",
    faqs: [
      {
        question: "What makes your Valima celebrations special?",
        answer: "Our Valima celebrations feature elegant dining setups, refined decor, and impeccable service. We create a sophisticated atmosphere perfect for hosting family and friends after your wedding ceremony."
      },
      {
        question: "How do you coordinate the Valima timing with other wedding events?",
        answer: "Our team works seamlessly with your wedding schedule to ensure smooth transitions. We handle all logistics so you can focus on enjoying your special day with guests."
      },
      {
        question: "What dining options are available for Valima?",
        answer: "We offer multi-course fine dining menus with both traditional Pakistani and international cuisine options. Our chefs can create customized menus based on your preferences and guest dietary needs."
      },
      {
        question: "Can you accommodate large guest lists for Valima dinners?",
        answer: "Yes, our venues can accommodate 100-300 guests for Valima dinners. We offer flexible seating arrangements and can scale our services based on your guest count."
      }
    ]
  },
  "engagement-ceremonies": {
    title: "Engagement Ceremonies",
    description: "Ring ceremony with floral stage, lights, and guest hospitality.",
    longDescription: "Mark the beginning of your journey with a beautiful engagement ceremony. Our engagement packages create the perfect setting for this special milestone with elegant decor and warm hospitality.",
    features: [
      "Beautiful floral stage design",
      "Professional lighting and sound setup",
      "Ring ceremony coordination",
      "Guest hospitality services",
      "Photography and videography",
      "Custom catering options"
    ],
    image: "https://picsum.photos/seed/engagement6/800/600.jpg",
    category: "Weddings & Ceremonies",
    faqs: [
      {
        question: "What is included in the engagement ceremony package?",
        answer: "Our engagement package includes a beautifully decorated stage, ring ceremony setup, floral arrangements, seating for guests, sound system, and coordination of the ring exchange ceremony."
      },
      {
        question: "How long do engagement ceremonies typically last?",
        answer: "Engagement ceremonies usually last 2-3 hours, including guest arrival, ceremony, and celebration time. We can adjust the duration based on your preferences and planned activities."
      },
      {
        question: "Can you accommodate both traditional and modern engagement styles?",
        answer: "Absolutely! We offer both traditional Pakistani engagement setups and modern contemporary styles. Our team can blend traditions or create a completely modern celebration based on your vision."
      },
      {
        question: "What photography and videography services are included?",
        answer: "Our package includes professional photography coverage of the ring ceremony, candid shots of guests, and cinematic videography. We provide edited photos and video highlights for sharing with family and friends."
      }
    ]
  },
  "sufi-qawwali-evenings": {
    title: "Sufi & Qawwali Evenings",
    description: "Live spiritual music nights with warm traditional atmosphere.",
    longDescription: "Immerse yourself in the spiritual ambiance of Sufi and Qawwali evenings. Experience soul-stirring performances in the serene mountain setting of Himalaya Villas.",
    features: [
      "Live Sufi and Qawwali performers",
      "Traditional seating arrangements",
      "Spiritual decor with candles and flowers",
      "Refreshments and traditional sweets",
      "Professional sound system",
      "Atmospheric lighting"
    ],
    image: "https://picsum.photos/seed/sufi7/800/600.jpg",
    category: "Music, Culture & Entertainment",
    faqs: [
      {
        question: "What time do Sufi evenings typically start?",
        answer: "Our Sufi evenings usually start at 8:00 PM and continue until midnight. The timing can be adjusted based on your preferences and the specific performers scheduled."
      },
      {
        question: "Are the Sufi performances suitable for all ages?",
        answer: "Yes, our Sufi and Qawwali evenings are family-friendly events. The spiritual music and poetry are appropriate for all age groups and create a peaceful, contemplative atmosphere."
      },
      {
        question: "Can we request specific Sufi songs or poets?",
        answer: "While we have a curated selection of traditional Sufi poetry and music, we can accommodate specific requests if made in advance. Our team will work with you to personalize the experience."
      },
      {
        question: "What refreshments are served during Sufi evenings?",
        answer: "We serve traditional Pakistani refreshments including tea, samosas, and sweets. The menu is designed to complement the spiritual atmosphere without being disruptive."
      }
    ]
  },
  "private-musical-concerts": {
    title: "Private Musical Concerts",
    description: "Exclusive classical and acoustic performances for private guests.",
    longDescription: "Enjoy exclusive musical performances in an intimate setting. Our private concerts feature talented artists performing classical and acoustic music for discerning audiences.",
    features: [
      "Professional musicians and performers",
      "Acoustic setup for optimal sound quality",
      "Intimate venue arrangement",
      "Premium seating for guests",
      "Catering services available",
      "Technical support and equipment"
    ],
    image: "https://picsum.photos/seed/concert8/800/600.jpg",
    category: "Music, Culture & Entertainment",
    faqs: [
      {
        question: "How many guests can attend private concerts?",
        answer: "Our intimate concert venue can accommodate 20-50 guests for private performances. This ensures an exclusive and personalized experience for all attendees."
      },
      {
        question: "Can we choose the type of music and performers?",
        answer: "Yes, we work with you to select the perfect performers and music style for your event. From classical to contemporary, we can arrange various musical genres."
      },
      {
        question: "What technical equipment is provided?",
        answer: "We provide professional sound systems, acoustic treatment, and stage equipment. Our technical team ensures optimal sound quality for the intimate setting."
      },
      {
        question: "Are refreshments included in the private concert package?",
        answer: "Yes, our package includes premium catering with customizable menus. From light refreshments to full dinner service, we can accommodate your preferences."
      }
    ]
  },
  "mushaira-poetry-evenings": {
    title: "Mushaira & Poetry Evenings",
    description: "Curated poetry gatherings in peaceful mountain ambiance.",
    longDescription: "Experience the beauty of Urdu poetry in our serene mountain setting. Our Mushaira evenings bring together renowned poets and literature enthusiasts for memorable cultural gatherings.",
    features: [
      "Renowned poets and speakers",
      "Traditional seating arrangement",
      "Poetry recitation setup",
      "Cultural decor elements",
      "Refreshments and tea service",
      "Professional event coordination"
    ],
    image: "https://picsum.photos/seed/poetry9/800/600.jpg",
    category: "Music, Culture & Entertainment",
    faqs: [
      {
        question: "Who are the featured poets at Mushaira evenings?",
        answer: "We feature renowned Urdu poets and emerging literary talents. Our curated selection includes both classical and contemporary poetry styles."
      },
      {
        question: "How long do Mushaira events typically last?",
        answer: "Our Mushaira evenings usually run for 3-4 hours, including multiple poetry sessions, breaks, and networking opportunities."
      },
      {
        question: "Can guests participate by reciting their own poetry?",
        answer: "Yes, we encourage audience participation and have open mic sessions where guests can share their poetry. This creates an interactive and engaging experience."
      },
      {
        question: "What is the dress code for poetry evenings?",
        answer: "The dress code is smart casual. We recommend comfortable yet elegant attire that respects the literary atmosphere of the event."
      }
    ]
  },
  "dj-nights-music-parties": {
    title: "DJ Nights & Music Parties",
    description: "Energetic dance nights with stage lighting and premium sound.",
    longDescription: "Dance the night away with our high-energy DJ parties. Featuring professional DJs, premium sound systems, and spectacular lighting effects for unforgettable celebrations.",
    features: [
      "Professional DJ services",
      "Premium sound system",
      "Dynamic stage lighting",
      "Dance floor setup",
      "Bar and catering services",
      "Security and event management"
    ],
    image: "https://picsum.photos/seed/dj10/800/600.jpg",
    category: "Music, Culture & Entertainment",
    faqs: [
      {
        question: "What time do DJ parties typically start and end?",
        answer: "Our DJ nights usually start at 9:00 PM and continue until 2:00 AM. The timing can be adjusted based on your event preferences and venue availability."
      },
      {
        question: "Can we request specific music genres or songs?",
        answer: "Absolutely! Our DJs can accommodate specific music requests and create custom playlists. We work with you to curate the perfect music mix for your event."
      },
      {
        question: "What safety measures are in place for late-night events?",
        answer: "We provide professional security staff, well-lit parking areas, and trained staff to ensure guest safety throughout the event."
      },
      {
        question: "Are food and drinks included in the DJ party package?",
        answer: "Yes, our packages include bar service and catering options. From light snacks to full dinner service, we can customize based on your needs."
      }
    ]
  },
  "live-band-performances": {
    title: "Live Band Performances",
    description: "Modern or fusion live band options for high-energy events.",
    longDescription: "Experience the energy of live band performances with our talented musicians. From modern rock to fusion jazz, we offer diverse musical experiences for every taste.",
    features: [
      "Professional live bands",
      "High-quality sound equipment",
      "Stage setup and lighting",
      "Performance coordination",
      "Guest accommodation options",
      "Catering and bar services"
    ],
    image: "https://picsum.photos/seed/band11/800/600.jpg",
    category: "Music, Culture & Entertainment",
    faqs: [
      {
        question: "What types of live bands do you offer?",
        answer: "We offer various band types including rock, jazz, fusion, and traditional bands. Our roster includes professional musicians with extensive performance experience."
      },
      {
        question: "How much space is needed for live band performances?",
        answer: "Our venues are designed to accommodate live bands with proper stage setup, sound equipment, and audience space. We can adapt the layout based on band size."
      },
      {
        question: "Can the band perform original songs or only covers?",
        answer: "Our bands can perform both original compositions and popular covers. We discuss your preferences and customize the performance accordingly."
      },
      {
        question: "What technical requirements do bands need?",
        answer: "We provide all necessary technical equipment including sound systems, lighting, and stage setup. Our technical team ensures everything is professionally configured."
      }
    ]
  },
  "cultural-shows-acts": {
    title: "Cultural Shows & Acts",
    description: "Traditional performances to enrich your celebration vibe.",
    longDescription: "Celebrate rich cultural traditions with our curated performances. From folk dances to traditional theater, we bring authentic cultural experiences to your events.",
    features: [
      "Traditional cultural performers",
      "Authentic folk dance shows",
      "Cultural decor and props",
      "Performance coordination",
      "Guest engagement activities",
      "Traditional catering options"
    ],
    image: "https://picsum.photos/seed/cultural12/800/600.jpg",
    category: "Music, Culture & Entertainment",
    faqs: [
      {
        question: "What types of cultural performances do you offer?",
        answer: "We offer traditional folk dances, theatrical performances, musical acts, and cultural ceremonies representing various Pakistani regional traditions."
      },
      {
        question: "Can performances be customized for specific cultural events?",
        answer: "Yes, we can tailor performances to match specific cultural celebrations, festivals, or themes. Our team works with cultural experts to ensure authenticity."
      },
      {
        question: "How long are cultural show performances?",
        answer: "Performances typically range from 30 minutes to 2 hours depending on the type and complexity of the show. We can schedule multiple performances for longer events."
      },
      {
        question: "Are costumes and props included in cultural shows?",
        answer: "Yes, our cultural performances include authentic costumes, traditional props, and professional performers trained in specific cultural art forms."
      }
    ]
  },
  "corporate-retreat-packages": {
    title: "Corporate Retreat Packages",
    description: "Strategic offsite planning with accommodation and activities.",
    longDescription: "Elevate your team's performance with our comprehensive corporate retreat packages. Combining strategic planning with luxury accommodation and team-building activities in the serene mountain environment.",
    features: [
      "Luxury villa accommodations",
      "Conference room facilities",
      "Team-building activities",
      "Strategic planning sessions",
      "Catering for all meals",
      "Recreational facilities"
    ],
    image: "https://picsum.photos/seed/corporate13/800/600.jpg",
    category: "Corporate Events",
    faqs: [
      {
        question: "How many team members can attend corporate retreats?",
        answer: "Our retreat packages can accommodate teams of 10-50 people. We offer flexible villa arrangements and can scale activities based on team size."
      },
      {
        question: "What types of team-building activities are included?",
        answer: "We offer strategic planning sessions, outdoor adventures, problem-solving exercises, and team bonding activities. All activities are customized to your team's goals."
      },
      {
        question: "Are meeting facilities equipped with modern technology?",
        answer: "Yes, our conference rooms feature high-speed internet, presentation equipment, video conferencing capabilities, and comfortable seating arrangements."
      },
      {
        question: "Can you customize retreat packages for specific company goals?",
        answer: "Absolutely! We work with your team to design custom retreat programs that align with your specific business objectives and team development goals."
      }
    ]
  },
  "product-launches-brand-events": {
    title: "Product Launches & Brand Events",
    description: "Premium venue for memorable product unveilings and showcases.",
    longDescription: "Launch your products in style with our premium event spaces. We provide the perfect backdrop for memorable brand events and product showcases that leave lasting impressions.",
    features: [
      "Premium event venues",
      "Professional AV equipment",
      "Brand customization options",
      "Media and press facilities",
      "Catering and hospitality",
      "Event coordination services"
    ],
    image: "https://picsum.photos/seed/launch14/800/600.jpg",
    category: "Corporate Events",
    faqs: [
      {
        question: "What venues are available for product launches?",
        answer: "We offer multiple venue options including indoor halls, outdoor terraces, and garden spaces. Each venue can be customized with branding and stage setups."
      },
      {
        question: "Can you handle media and press invitations for launches?",
        answer: "Yes, we provide media coordination services including press releases, media kits, and on-site press facilities to ensure maximum coverage."
      },
      {
        question: "What technical support is available for presentations?",
        answer: "We provide professional AV equipment, lighting systems, sound engineering, and technical staff to ensure smooth presentations throughout your event."
      },
      {
        question: "How early should we book for product launch events?",
        answer: "We recommend booking 2-3 months in advance for product launches to allow adequate time for planning, customization, and coordination."
      }
    ]
  },
  "award-dinners-gala-nights": {
    title: "Award Dinners & Gala Nights",
    description: "Elegant formal evenings with stage, dining, and protocol flow.",
    longDescription: "Host prestigious award ceremonies and gala nights with our elegant formal event packages. We ensure protocol-perfect execution with sophisticated dining and presentation.",
    features: [
      "Elegant dining setup",
      "Professional stage design",
      "Award ceremony coordination",
      "Protocol management",
      "Formal catering services",
      "Security and guest management"
    ],
    image: "https://picsum.photos/seed/award15/800/600.jpg",
    category: "Corporate Events",
    faqs: [
      {
        question: "What is included in the gala night package?",
        answer: "Our gala packages include elegant dining, stage setup, award presentation coordination, entertainment, and professional event management throughout the evening."
      },
      {
        question: "Can you accommodate award ceremonies of different sizes?",
        answer: "Yes, we can host intimate ceremonies for 50 guests or large galas for 300+ guests. Our flexible spaces adapt to your specific requirements."
      },
      {
        question: "Do you provide trophy and award presentation services?",
        answer: "We coordinate with award designers, provide presentation training, and ensure smooth award distribution protocols during the ceremony."
      },
      {
        question: "What entertainment options are available for gala nights?",
        answer: "We offer live bands, DJs, cultural performances, and guest speakers. All entertainment is professionally coordinated to match your event theme."
      }
    ]
  },
  "conferences-seminars": {
    title: "Conferences & Seminars",
    description: "Professional setup with presentation zones and hospitality.",
    longDescription: "Conduct successful conferences and seminars in our professional facilities. We provide comprehensive setup with presentation zones and exceptional hospitality for business events.",
    features: [
      "Conference facilities",
      "Presentation equipment",
      "Breakout session rooms",
      "Catering for coffee breaks",
      "Registration and reception area",
      "Technical support staff"
    ],
    image: "https://picsum.photos/seed/conference16/800/600.jpg",
    category: "Corporate Events",
    faqs: [
      {
        question: "What conference facilities are available?",
        answer: "We offer multiple conference rooms with varying capacities, all equipped with modern technology, comfortable seating, and professional presentation setups."
      },
      {
        question: "Can you handle multi-day conference arrangements?",
        answer: "Yes, we provide accommodation, catering, and venue management for multi-day conferences. Our team ensures seamless transitions between sessions."
      },
      {
        question: "What catering options are available for conferences?",
        answer: "We offer coffee breaks, buffet lunches, formal dinners, and refreshment stations. All menus can be customized based on your schedule and preferences."
      },
      {
        question: "Is parking available for conference attendees?",
        answer: "Yes, we provide ample parking space with valet services available for larger conferences. Our location is easily accessible from major roads."
      }
    ]
  },
  "team-building-retreats": {
    title: "Team Building Retreats",
    description: "Outdoor + indoor team activities for stronger collaboration.",
    longDescription: "Strengthen team bonds with our comprehensive team-building retreats. Combining outdoor adventures with indoor activities for enhanced collaboration and communication.",
    features: [
      "Team-building activities",
      "Outdoor adventure options",
      "Indoor workshop spaces",
      "Professional facilitators",
      "Accommodation for teams",
      "Catering and meals"
    ],
    image: "https://picsum.photos/seed/team17/800/600.jpg",
    category: "Corporate Events",
    faqs: [
      {
        question: "What types of team-building activities do you offer?",
        answer: "We provide outdoor adventures, problem-solving challenges, communication exercises, and strategic games. All activities are facilitated by professional trainers."
      },
      {
        question: "Can team-building activities be customized for specific goals?",
        answer: "Yes, we design custom programs based on your team's specific objectives, whether it's improving communication, leadership, or collaboration."
      },
      {
        question: "Are team-building activities suitable for all fitness levels?",
        answer: "We offer activities for all fitness levels and abilities. Our facilitators can adapt exercises to ensure everyone can participate comfortably."
      },
      {
        question: "How long are team-building retreat programs?",
        answer: "Programs range from single-day sessions to multi-day retreats. We recommend 2-3 days for comprehensive team development."
      }
    ]
  },
  "exhibitions-trade-meets": {
    title: "Exhibitions & Trade Meets",
    description: "Structured event space with guided attendee movement.",
    longDescription: "Host successful exhibitions and trade meets in our structured event spaces. We provide guided attendee movement and professional setup for optimal business networking.",
    features: [
      "Exhibition hall setup",
      "Trade booth arrangements",
      "Guided attendee flow",
      "Networking areas",
      "Registration facilities",
      "Catering services"
    ],
    image: "https://picsum.photos/seed/exhibition18/800/600.jpg",
    category: "Corporate Events",
    faqs: [
      {
        question: "What exhibition spaces are available?",
        answer: "We offer indoor exhibition halls and outdoor spaces that can accommodate 10-100 exhibition booths with proper lighting and utilities."
      },
      {
        question: "Can you help with booth setup and logistics?",
        answer: "Yes, we provide booth setup assistance, equipment rental, and logistics coordination to ensure smooth exhibition operations."
      },
      {
        question: "What facilities are available for trade meet attendees?",
        answer: "We provide registration areas, networking lounges, refreshment stations, and comfortable rest areas throughout the exhibition space."
      },
      {
        question: "Is security provided for exhibition events?",
        answer: "Yes, we provide professional security staff, surveillance systems, and controlled access to ensure safety for exhibitors and attendees."
      }
    ]
  },
  "milestone-birthdays": {
    title: "Milestone Birthdays",
    description: "Theme-based birthday celebrations for all age groups.",
    longDescription: "Celebrate milestone birthdays with our themed celebration packages. From children's parties to adult milestones, we create memorable experiences tailored to every age group.",
    features: [
      "Theme-based decorations",
      "Age-appropriate activities",
      "Catering for all preferences",
      "Entertainment options",
      "Photography services",
      "Gift coordination services"
    ],
    image: "https://picsum.photos/seed/birthday19/800/600.jpg",
    category: "Family & Social Celebrations",
    faqs: [
      {
        question: "What birthday themes do you offer?",
        answer: "We offer themes for all ages including princess parties, superhero themes, vintage celebrations, and elegant adult birthday themes. All themes are fully customizable."
      },
      {
        question: "How many guests can attend birthday celebrations?",
        answer: "Our venues can accommodate 20-100 guests depending on the package. We have both intimate spaces and larger celebration areas available."
      },
      {
        question: "Do you provide birthday cakes and decorations?",
        answer: "Yes, we include custom birthday cakes, themed decorations, balloons, and party favors. All decorations are tailored to your chosen theme."
      },
      {
        question: "What entertainment options are available for birthday parties?",
        answer: "We offer magicians, face painters, DJs, live bands, and character performers. Entertainment is selected based on age group and preferences."
      }
    ]
  },
  "eid-gatherings-family-reunions": {
    title: "Eid Gatherings & Family Reunions",
    description: "Large family experiences with full-villa coordination.",
    longDescription: "Celebrate Eid and family reunions in our spacious villas. We provide full coordination for large family gatherings with traditional hospitality and modern comfort.",
    features: [
      "Full villa accommodations",
      "Traditional Eid decorations",
      "Family-style catering",
      "Prayer facilities",
      "Children's activity areas",
      "Transportation coordination"
    ],
    image: "https://picsum.photos/seed/eid20/800/600.jpg",
    category: "Family & Social Celebrations",
    faqs: [
      {
        question: "How many family members can stay in the villas for Eid?",
        answer: "Our villas can accommodate 8-20 family members depending on the villa size. We offer multiple interconnected villas for larger families."
      },
      {
        question: "What special Eid arrangements do you provide?",
        answer: "We provide Eid prayer arrangements, special festive decorations, traditional Eid meals, and gift exchange setups for the entire family."
      },
      {
        question: "Can you accommodate multi-generational family reunions?",
        answer: "Yes, our facilities are designed for all ages with accessible rooms, quiet areas for elderly family members, and activity spaces for children."
      },
      {
        question: "What catering options are available for Eid gatherings?",
        answer: "We offer traditional Eid feasts including biryani, karahi, sweets, and special Eid dishes. All meals can be customized to family preferences."
      }
    ]
  },
  "baby-showers-gender-reveal": {
    title: "Baby Showers & Gender Reveal",
    description: "Soft floral themes and delightful family-focused arrangements.",
    longDescription: "Celebrate the upcoming arrival with our beautiful baby shower and gender reveal packages. Featuring soft floral themes and delightful family-focused arrangements.",
    features: [
      "Soft floral decorations",
      "Gender reveal props",
      "Baby shower games",
      "Gift coordination",
      "Catering for guests",
      "Photography services"
    ],
    image: "https://picsum.photos/seed/baby21/800/600.jpg",
    category: "Family & Social Celebrations",
    faqs: [
      {
        question: "What themes are available for baby showers?",
        answer: "We offer themes like 'Twinkle Twinkle Little Star', 'Safari Adventure', 'Garden Party', and gender reveal themes. All themes include matching decorations."
      },
      {
        question: "Do you provide gender reveal services?",
        answer: "Yes, we offer creative gender reveal options including confetti cannons, balloon pops, cake reveals, and smoke effects for memorable announcements."
      },
      {
        question: "How many guests can attend baby showers?",
        answer: "Our baby shower venues accommodate 15-40 guests comfortably. We provide both indoor and outdoor options depending on weather and preference."
      },
      {
        question: "What food and drinks are served at baby showers?",
        answer: "We serve light refreshments, finger foods, mocktails, and custom baby shower cakes. All menus are designed for the occasion."
      }
    ]
  },
  "graduation-parties": {
    title: "Graduation Parties",
    description: "Celebrate big achievements with stylish event staging.",
    longDescription: "Honor academic achievements with our stylish graduation parties. We create memorable celebrations with sophisticated staging and personalized touches.",
    features: [
      "Graduation theme decorations",
      "Achievement display areas",
      "Photo booth setup",
      "Catering for celebrations",
      "Entertainment options",
      "Gift presentation coordination"
    ],
    image: "https://picsum.photos/seed/graduation22/800/600.jpg",
    category: "Family & Social Celebrations",
    faqs: [
      {
        question: "What graduation party themes do you offer?",
        answer: "We offer themes like 'Future is Bright', 'Class of [Year]', 'Career Path', and subject-specific themes. All decorations match the graduate's field of study."
      },
      {
        question: "Can you accommodate large graduation parties?",
        answer: "Yes, we can host 50-150 guests for graduation celebrations. We offer both indoor halls and outdoor garden venues."
      },
      {
        question: "What entertainment is suitable for graduation parties?",
        answer: "We provide DJs, photo booths, memory walls, and live entertainment. All options are age-appropriate and celebration-focused."
      },
      {
        question: "Do you provide graduation ceremony setups?",
        answer: "Yes, we can create mini-ceremony setups with stages, podiums, and seating for small graduation ceremonies or award presentations."
      }
    ]
  },
  "retirement-celebrations": {
    title: "Retirement Celebrations",
    description: "Dignified events for honoring long professional journeys.",
    longDescription: "Honor distinguished careers with our dignified retirement celebrations. We create respectful events that celebrate long professional journeys and achievements.",
    features: [
      "Professional decor themes",
      "Achievement recognition setup",
      "Speech and presentation areas",
      "Formal dining arrangements",
      "Memory lane displays",
      "Guest coordination services"
    ],
    image: "https://picsum.photos/seed/retirement23/800/600.jpg",
    category: "Family & Social Celebrations",
    faqs: [
      {
        question: "What makes retirement celebrations special?",
        answer: "We create dignified celebrations with honor ceremonies, memory sharing, career highlights displays, and elegant dining to celebrate professional achievements."
      },
      {
        question: "Can you accommodate corporate retirement parties?",
        answer: "Yes, we offer both private family retirement celebrations and corporate retirement events with appropriate themes and setups for each."
      },
      {
        question: "What entertainment is appropriate for retirement parties?",
        answer: "We provide elegant entertainment including live bands, tribute performances, and speakers who can share career memories and well wishes."
      },
      {
        question: "How do you honor the retiree during the celebration?",
        answer: "We create special moments including award presentations, memory sharing sessions, career highlight videos, and personalized tribute ceremonies."
      }
    ]
  },
  "farewells-send-offs": {
    title: "Farewells & Send-offs",
    description: "Warm and memorable setups for meaningful goodbyes.",
    longDescription: "Create meaningful farewell memories with our warm send-off celebrations. We design heartfelt events that honor relationships and create lasting positive memories.",
    features: [
      "Warm decor themes",
      "Memory sharing setup",
      "Photo and video presentations",
      "Personalized touches",
      "Catering for comfort food",
      "Guest book and mementos"
    ],
    image: "https://picsum.photos/seed/farewell24/800/600.jpg",
    category: "Family & Social Celebrations",
    faqs: [
      {
        question: "What types of farewell events do you host?",
        answer: "We host going-away parties, retirement farewells, relocation celebrations, and goodbye gatherings for various life transitions and career changes."
      },
      {
        question: "How do you make farewell events emotional yet positive?",
        answer: "We balance emotional elements with positive future-focused activities, memory sharing, and celebration of achievements and relationships."
      },
      {
        question: "What activities are good for farewell parties?",
        answer: "We recommend memory sharing, photo displays, gift presentations, future planning activities, and entertainment that reflects the person's interests."
      },
      {
        question: "Can you help with video messages for the person leaving?",
        answer: "Yes, we can arrange video recording stations, coordinate video messages from absent friends, and create compilation videos as keepsakes."
      }
    ]
  },
  "bonfire-stargazing-nights": {
    title: "Bonfire & Stargazing Nights",
    description: "High-demand evening add-on for guests and families.",
    longDescription: "Experience magical evenings under the stars with our bonfire and stargazing nights. Perfect for creating intimate memories in the serene mountain environment.",
    features: [
      "Bonfire setup with safety measures",
      "Stargazing equipment",
      "Cozy seating arrangements",
      "Hot beverages and snacks",
      "Storytelling sessions",
      "Photography opportunities"
    ],
    image: "https://picsum.photos/seed/bonfire25/800/600.jpg",
    category: "Experiences & Activities",
    faqs: [
      {
        question: "What time do bonfire nights start?",
        answer: "Our bonfire nights typically begin at sunset and continue until 11:00 PM. We adjust timing based on season and weather conditions for optimal stargazing."
      },
      {
        question: "Is the bonfire safe for children?",
        answer: "Yes, we maintain strict safety measures with controlled fire areas, safety barriers, and trained staff supervision throughout the evening."
      },
      {
        question: "What equipment is provided for stargazing?",
        answer: "We provide telescopes, binoculars, star charts, and guided constellation tours. Our staff helps identify planets and major constellations."
      },
      {
        question: "What food and drinks are served during bonfire nights?",
        answer: "We serve hot beverages, marshmallows for roasting, light snacks, and comfort food. All items are designed for outdoor dining."
      }
    ]
  },
  "guided-trails-forest-walks": {
    title: "Guided Trails & Forest Walks",
    description: "Scenic nature experiences for groups and couples.",
    longDescription: "Explore the beauty of nature with our guided trails and forest walks. Perfect for groups and couples seeking scenic mountain experiences with expert guidance.",
    features: [
      "Expert trail guides",
      "Nature education sessions",
      "Photography opportunities",
      "Safety equipment provided",
      "Refreshments during walks",
      "Flexible difficulty levels"
    ],
    image: "https://picsum.photos/seed/trails26/800/600.jpg",
    category: "Experiences & Activities",
    faqs: [
      {
        question: "What difficulty levels are available for forest walks?",
        answer: "We offer easy, moderate, and challenging trails suitable for all fitness levels. Our guides assess group abilities and select appropriate routes."
      },
      {
        question: "How long are the guided trail walks?",
        answer: "Our trails range from 1-3 hour walks to full-day hikes. We customize duration based on group preferences and fitness levels."
      },
      {
        question: "What should participants wear for forest walks?",
        answer: "We recommend comfortable hiking shoes, weather-appropriate clothing, and small backpacks. We provide a detailed packing list upon booking."
      },
      {
        question: "Are the trails suitable for children and elderly participants?",
        answer: "Yes, we have family-friendly trails with gentle slopes and rest areas. Our guides adjust pace to accommodate all participants."
      }
    ]
  },
  "private-chef-dining-experiences": {
    title: "Private Chef & Dining Experiences",
    description: "Personalized dining themes and curated food journeys.",
    longDescription: "Indulge in exclusive dining experiences with our private chef services. Enjoy personalized themes and curated food journeys in intimate settings.",
    features: [
      "Private chef services",
      "Customized menus",
      "Wine pairing options",
      "Intimate dining settings",
      "Tableside service",
      "Dietary accommodations"
    ],
    image: "https://picsum.photos/seed/chef27/800/600.jpg",
    category: "Experiences & Activities",
    faqs: [
      {
        question: "What types of cuisine do private chefs specialize in?",
        answer: "Our chefs specialize in Pakistani, Continental, Chinese, and fusion cuisine. We can accommodate specific dietary preferences and cultural requirements."
      },
      {
        question: "Can private chef experiences be customized for special occasions?",
        answer: "Absolutely! We design menus for anniversaries, birthdays, or romantic dinners with personalized dishes and presentation styles."
      },
      {
        question: "How many guests can private chef experiences accommodate?",
        answer: "Our private chef services can accommodate 2-20 guests depending on the venue and menu complexity. We offer intimate and group dining options."
      },
      {
        question: "What is included in the private chef dining experience?",
        answer: "The experience includes custom menu planning, ingredient sourcing, cooking demonstration, table setting, and service. Wine pairing is available upon request."
      }
    ]
  },
  "adventure-outdoor-activities": {
    title: "Adventure & Outdoor Activities",
    description: "Thrilling mountain activities designed for safe fun.",
    longDescription: "Get your adrenaline pumping with our thrilling mountain activities. All adventures are designed with safety as the top priority while maximizing excitement and fun.",
    features: [
      "Professional adventure guides",
      "Safety equipment provided",
      "Multiple activity options",
      "Group coordination",
      "First aid support",
      "Weather contingency plans"
    ],
    image: "https://picsum.photos/seed/adventure28/800/600.jpg",
    category: "Experiences & Activities",
    faqs: [
      {
        question: "What adventure activities are available?",
        answer: "We offer rock climbing, zip-lining, hiking, mountain biking, and water sports. All activities are supervised by certified instructors."
      },
      {
        question: "Are adventure activities suitable for beginners?",
        answer: "Yes, we provide beginner-friendly options with comprehensive safety briefings and gradual progression to more challenging activities."
      },
      {
        question: "What safety measures are in place for adventure activities?",
        answer: "We provide professional instructors, safety equipment, emergency protocols, and first aid stations. All activities meet international safety standards."
      },
      {
        question: "What is the minimum age for adventure activities?",
        answer: "Age requirements vary by activity - typically 8+ for easier activities and 12+ for more challenging ones. Parental consent is required for minors."
      }
    ]
  },
  "workshops-creative-sessions": {
    title: "Workshops & Creative Sessions",
    description: "Hands-on workshops for teams, families, and creators.",
    longDescription: "Unleash creativity with our hands-on workshops and sessions. Perfect for teams, families, and creative individuals looking to learn and create together.",
    features: [
      "Professional instructors",
      "All materials provided",
      "Various workshop topics",
      "Group size accommodation",
      "Take-home creations",
      "Photography of process"
    ],
    image: "https://picsum.photos/seed/workshop29/800/600.jpg",
    category: "Experiences & Activities",
    faqs: [
      {
        question: "What types of workshops do you offer?",
        answer: "We offer art workshops, cooking classes, photography sessions, craft making, and creative writing workshops. All are taught by experienced instructors."
      },
      {
        question: "Can workshops be customized for corporate teams or families?",
        answer: "Yes, we design custom workshops for team building, family bonding, or skill development. We tailor content to your specific goals."
      },
      {
        question: "How long do creative sessions typically last?",
        answer: "Workshops range from 2-hour introductory sessions to full-day intensive workshops. We offer flexible scheduling based on your needs."
      },
      {
        question: "Do participants take home their creations?",
        answer: "Yes, all participants take home their completed projects. We provide packaging and care instructions for all creative works."
      }
    ]
  },
  "photography-content-packages": {
    title: "Photography & Content Packages",
    description: "Professional coverage for weddings and brand campaigns.",
    longDescription: "Capture your special moments with our professional photography and content packages. Perfect for weddings, events, and brand campaigns requiring high-quality visual content.",
    features: [
      "Professional photographers",
      "Videography services",
      "Drone footage options",
      "Post-production editing",
      "Same-day preview options",
      "Online gallery delivery"
    ],
    image: "https://picsum.photos/seed/photography30/800/600.jpg",
    category: "Experiences & Activities",
    faqs: [
      {
        question: "What photography services are included?",
        answer: "Our packages include professional photographers, videographers, editing services, and online galleries. We provide both candid and posed photography."
      },
      {
        question: "Can photography packages be customized for specific events?",
        answer: "Yes, we customize packages for weddings, corporate events, family portraits, and brand campaigns. We adapt to your specific needs."
      },
      {
        question: "How long does it take to receive edited photos and videos?",
        answer: "Standard delivery is 2-3 weeks for photos and 4-6 weeks for videos. Express delivery options are available for urgent needs."
      },
      {
        question: "Do you provide drone photography and videography?",
        answer: "Yes, we offer drone services for aerial photography and videography, weather permitting. All drone operations follow local regulations."
      }
    ]
  },
  "yoga-meditation-retreats": {
    title: "Yoga & Meditation Retreats",
    description: "Mindful sessions with serene mountain environments.",
    longDescription: "Find inner peace with our yoga and meditation retreats. Experience mindful sessions in the serene mountain environment that promotes relaxation and spiritual wellness.",
    features: [
      "Certified yoga instructors",
      "Meditation guidance",
      "Serene mountain locations",
      "Wellness amenities",
      "Healthy meal options",
      "Personalized sessions"
    ],
    image: "https://picsum.photos/seed/yoga31/800/600.jpg",
    category: "Wellness & Retreats",
    faqs: [
      {
        question: "What yoga styles are taught in the retreats?",
        answer: "We offer Hatha, Vinyasa, Restorative, and Meditation yoga. Our instructors can accommodate all levels from beginners to advanced practitioners."
      },
      {
        question: "How long are yoga and meditation retreat programs?",
        answer: "Our retreats range from weekend programs (2-3 days) to week-long immersive experiences. We also offer single-day workshops."
      },
      {
        question: "Do you provide yoga mats and equipment?",
        answer: "Yes, we provide all necessary equipment including yoga mats, blocks, straps, and meditation cushions. You can bring your own if preferred."
      },
      {
        question: "Are meals included in the yoga retreat packages?",
        answer: "Yes, all meals are included and focus on healthy, nourishing vegetarian options. We can accommodate dietary restrictions with advance notice."
      }
    ]
  },
  "digital-detox-experiences": {
    title: "Digital Detox Experiences",
    description: "Low-screen peaceful stays with curated routines.",
    longDescription: "Disconnect from digital noise with our detox experiences. Enjoy peaceful stays with curated routines designed to restore balance and mental clarity.",
    features: [
      "Screen-free environments",
      "Curated daily routines",
      "Nature immersion activities",
      "Mindfulness practices",
      "Healthy meal plans",
      "Reading and reflection spaces"
    ],
    image: "https://picsum.photos/seed/digital32/800/600.jpg",
    category: "Wellness & Retreats",
    faqs: [
      {
        question: "What does a digital detox experience include?",
        answer: "Our digital detox includes secure storage for devices, alternative activities, nature walks, meditation sessions, and creative workshops to replace screen time."
      },
      {
        question: "Can emergency calls be made during digital detox?",
        answer: "Yes, we provide emergency communication access. Guests can check important messages at designated times while maintaining the detox experience."
      },
      {
        question: "What activities replace digital entertainment?",
        answer: "We offer board games, reading, art therapy, nature exploration, meditation, and social activities that encourage face-to-face interaction."
      },
      {
        question: "How long are digital detox programs?",
        answer: "Programs range from weekend retreats to week-long experiences. We recommend minimum 3 days for meaningful digital disconnection."
      }
    ]
  },
  "spa-relaxation-escapes": {
    title: "Spa & Relaxation Escapes",
    description: "Rejuvenating body and mind with holistic comfort.",
    longDescription: "Rejuvenate your body and mind with our spa and relaxation escapes. Experience holistic comfort through professional spa treatments and wellness therapies.",
    features: [
      "Professional spa treatments",
      "Massage therapy options",
      "Aromatherapy sessions",
      "Relaxation lounges",
      "Wellness consultations",
      "Organic product usage"
    ],
    image: "https://picsum.photos/seed/spa33/800/600.jpg",
    category: "Wellness & Retreats",
    faqs: [
      {
        question: "What spa treatments are available?",
        answer: "We offer massages, facials, body treatments, hydrotherapy, and wellness consultations. All treatments use organic and natural products."
      },
      {
        question: "Are spa therapists certified and experienced?",
        answer: "Yes, all our therapists are certified professionals with extensive experience in various massage and wellness techniques."
      },
      {
        question: "How long are spa treatment sessions?",
        answer: "Treatments range from 30-minute express sessions to 2-hour comprehensive treatments. We also offer half-day and full-day spa packages."
      },
      {
        question: "Can spa treatments be customized for specific needs?",
        answer: "Absolutely! Our therapists customize treatments based on your preferences, health conditions, and wellness goals."
      }
    ]
  },
  "health-fitness-camps": {
    title: "Health & Fitness Camps",
    description: "Active wellness programs with guided outdoor workouts.",
    longDescription: "Boost your fitness with our health and fitness camps. Enjoy active wellness programs with guided outdoor workouts in the refreshing mountain air.",
    features: [
      "Certified fitness trainers",
      "Outdoor workout sessions",
      "Nutritional guidance",
      "Fitness assessments",
      "Group exercise classes",
      "Recovery facilities"
    ],
    image: "https://picsum.photos/seed/fitness34/800/600.jpg",
    category: "Wellness & Retreats",
    faqs: [
      {
        question: "What fitness activities are included in the camps?",
        answer: "Our fitness camps include yoga, strength training, cardio workouts, hiking, swimming, and group fitness classes suitable for all levels."
      },
      {
        question: "Are personal trainers available during fitness camps?",
        answer: "Yes, certified personal trainers provide guidance, create custom workout plans, and ensure proper form and technique throughout the camp."
      },
      {
        question: "What is the typical daily schedule for fitness camps?",
        answer: "Days include morning yoga, fitness classes, healthy meals, outdoor activities, and evening relaxation. Schedules are balanced for optimal results."
      },
      {
        question: "Can beginners join fitness camps?",
        answer: "Absolutely! Our camps accommodate all fitness levels with modified exercises and progressive intensity. Beginners receive extra guidance and support."
      }
    ]
  },
  "holistic-healing-programs": {
    title: "Holistic Healing Programs",
    description: "Balanced healing experiences for stress-free recovery.",
    longDescription: "Experience balanced healing with our holistic programs. Designed for stress-free recovery through integrated wellness approaches and natural therapies.",
    features: [
      "Holistic therapy sessions",
      "Natural healing methods",
      "Stress management techniques",
      "Energy balancing practices",
      "Nutritional counseling",
      "Mind-body integration"
    ],
    image: "https://picsum.photos/seed/healing35/800/600.jpg",
    category: "Wellness & Retreats",
    faqs: [
      {
        question: "What holistic healing modalities do you offer?",
        answer: "We offer Reiki, acupuncture, aromatherapy, sound healing, crystal therapy, and energy balancing sessions with certified practitioners."
      },
      {
        question: "Are holistic healing practitioners certified?",
        answer: "Yes, all our practitioners are certified and experienced in their respective modalities. They maintain professional standards and ethics."
      },
      {
        question: "How many sessions are recommended for optimal results?",
        answer: "We recommend initial assessment followed by 3-5 sessions for most conditions. Chronic issues may require longer treatment plans."
      },
      {
        question: "Can holistic healing be combined with conventional medicine?",
        answer: "Yes, our holistic programs complement conventional medicine. We encourage consulting with healthcare providers for integrated care."
      }
    ]
  },
  "luxury-honeymoon-packages": {
    title: "Luxury Honeymoon Packages",
    description: "Private and romantic stays with premium amenities.",
    longDescription: "Celebrate your new beginning with our luxury honeymoon packages. Enjoy private and romantic stays with premium amenities in the most beautiful mountain settings.",
    features: [
      "Private villa accommodations",
      "Romantic decor setup",
      "Couples spa treatments",
      "Private dining experiences",
      "Romantic excursions",
      "Butler service available"
    ],
    image: "https://picsum.photos/seed/honeymoon36/800/600.jpg",
    category: "Wellness & Retreats",
    faqs: [
      {
        question: "What is included in the luxury honeymoon package?",
        answer: "Our package includes private villa, couples spa treatments, romantic dinners, sunset activities, champagne, and personalized butler service."
      },
      {
        question: "Can honeymoon packages be customized?",
        answer: "Yes, we customize every aspect including activities, dining preferences, decorations, and special surprises based on the couple's preferences."
      },
      {
        question: "What romantic activities are available for honeymooners?",
        answer: "We offer private dinners, couples massages, sunset cruises, stargazing nights, and adventure activities designed for couples."
      },
      {
        question: "How long are honeymoon packages?",
        answer: "Packages range from 3 nights to 2 weeks. We recommend minimum 5 nights to fully enjoy all the romantic experiences and relaxation."
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = eventDetails[slug];
  
  if (!event) {
    return createPageMetadata({
      title: "Event Not Found | Himalaya Villas & Resorts",
      description: "The requested event could not be found.",
      path: `/events/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${event.title} | Himalaya Villas & Resorts`,
    description: event.longDescription,
    path: `/events/${slug}`,
    keywords: [event.title, event.category, "Himalaya Villas", "Bhurban", "Murree"],
    ogImage: event.image,
  });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventDetails[slug];

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">The requested event could not be found.</p>
            <Link href="/events" className="inline-block px-6 py-3 bg-[#c9a55b] text-white rounded-lg hover:bg-[#a98741] transition">
              Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.longDescription,
    image: absoluteUrl(event.image),
    url: absoluteUrl(`/events/${slug}`),
    location: {
      "@type": "Place",
      name: "Himalaya Villas & Resorts",
      address: "Bhurban, Murree, Pakistan"
    },
    offers: {
      "@type": "Offer",
      price: "Contact for pricing",
      priceCurrency: "PKR"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: `event-${slug}`, data: jsonLd }]} />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 flex items-center justify-center min-h-[600px] px-6">
          <div className="text-center text-white max-w-4xl">
            <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
              <span>{event.category}</span>
              <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
              {event.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {event.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-6">
                  About This Experience
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {event.longDescription}
                </p>
                
                <h3 className="font-display text-2xl text-neutral-900 mb-6">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {event.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#c9a55b] flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Form */}
            <div className="lg:col-span-1">
              <EventQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about {event.title}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <EventFAQs faqs={event.faqs} />
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Related Events
            </h2>
            <p className="text-gray-600">
              Explore more experiences from our {event.category} collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(eventDetails)
              .filter(([eventSlug, details]) => details.category === event.category && eventSlug !== slug)
              .slice(0, 3)
              .map(([slug, details]) => (
                <Link
                  key={slug}
                  href={`/events/${slug}`}
                  className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={details.image}
                      alt={details.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-[#c9a55b] transition-colors">
                      {details.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {details.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#c9a55b] group-hover:gap-2 transition-all">
                      Learn More
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
