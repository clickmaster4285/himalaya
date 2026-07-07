// app/faq/FaqClient.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Plus, Minus, Search, PhoneCall, HelpCircle, Info, 
  Sliders, CalendarCheck, MapPin, Banknote, Heart, PartyPopper, Briefcase, 
  ConciergeBell, ShieldCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

type Faq = { question: string; answer: string; cta?: string };
type Category = { 
  id: string; 
  title: string; 
  icon: React.ReactNode; 
  desc: string; 
  faqs: Faq[] 
};

const CATEGORIES: Category[] = [
  {
    id: "popular",
    title: "Popular Questions",
    icon: <HelpCircle className="w-8 h-8 text-primary" />,
    desc: "Top inquiries about Bhurban and Himalaya Villas",
    faqs: [
      {
        question: "What is special in Bhurban?",
        answer: "Bhurban is Pakistan's most elevated luxury destination, perched at 5,000+ feet in the Murree Hills with dense pine forests and panoramic Himalayan views — just 45 minutes from Islamabad. What sets Bhurban apart is the rare combination of mountain cool, natural grandeur, and world-class hospitality infrastructure. Among Bhurban's properties, Himalaya Villas stands alone as the only private villa resort — offering genuine seclusion, named-room personalisation, and a curated experience that a hotel floor can never replicate.",
        cta: "Reserve your private mountain villa — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What is Bhurban known for?",
        answer: "Bhurban, Murree is known for its pine-forested hills, cool mountain climate, and status as Pakistan's premier hill station for luxury travel. Home to the country's most prestigious mountain retreats, Bhurban attracts Islamabad and Lahore's elite families, corporate leaders, and discerning travellers seeking a genuine escape from city heat. Himalaya Villas is Bhurban's standout private villa destination — recognised for curated service, mountain privacy, and some of the Murree Hills' finest views.",
        cta: "Enquire about availability — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What is the best time to visit Bhurban?",
        answer: "The best time to visit Bhurban for a resort stay is April through October — daytime temperatures range from 15°C to 25°C, ideal for outdoor mountain activities, scenic walks, and relaxed villa living. June to August is peak season when Bhurban is at its greenest and most vibrant. Winter visits from December to February offer a distinctly different beauty: snowfall, fireside evenings, and crisp mountain air that many guests find equally compelling. Himalaya Villas operates and is fully equipped year-round.",
        cta: "Book your preferred season now — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What is the ideal month to visit Murree?",
        answer: "June, July, and August are Murree and Bhurban's most popular months — lush green hillsides, comfortable temperatures, and peak resort experiences. For a more private and peaceful stay, September and October offer the same natural beauty with fewer visitors and calmer roads. At Himalaya Villas, every month is crafted around an exceptional guest experience — from summer garden dining to winter fireplace evenings.",
        cta: "Check availability for your preferred dates — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Which is the most beautiful place in Murree?",
        answer: "Bhurban consistently ranks as the most scenic area in the Murree Hills — its higher elevation, denser forests, and sweeping Himalayan panoramas set it apart from Murree town. Himalaya Villas is positioned at the heart of Bhurban's most prized viewpoints, offering private villas with unobstructed mountain vistas that guests return to year after year. If natural beauty is the priority, Bhurban — and specifically Himalaya Villas — is the answer.",
        cta: "See why Pakistan's most discerning guests choose us — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Is Bhurban safe for families and guests?",
        answer: "Yes — Bhurban is among Pakistan's safest leisure destinations. The area is well-developed, with a strong hospitality infrastructure, clearly maintained roads, and a consistent visitor base of Islamabad and Lahore's most established families. Himalaya Villas maintains 24/7 on-property security and attentive staff presence throughout, ensuring complete peace of mind for solo guests, couples, and families with children.",
        cta: "Your family's safety and comfort are our responsibility — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Which city is Bhurban near?",
        answer: "Bhurban is located in the Murree Tehsil of Rawalpindi District, Punjab, Pakistan. It sits at approximately 5,000 feet above sea level in the Murree Hills — around 55 km from Islamabad (roughly 45–60 minutes by road via the Murree Expressway) and approximately 270 km from Lahore (3.5–4 hours). Himalaya Villas is situated directly in Bhurban, with detailed route guidance provided upon booking confirmation.",
        cta: "We can also arrange a private transfer from Islamabad — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Is Nathia Gali colder than Murree?",
        answer: "Yes — Nathia Gali is consistently colder than Murree. Nathia Gali sits at approximately 2,500 metres above sea level compared to Murree's 2,130 metres and Bhurban's 1,850 metres. The higher elevation means lower temperatures year-round, heavier snowfall in winter, and cooler summers. Winter visits require 4WD vehicles on mountain roads.",
        cta: "For year-round heated villa accommodation in Bhurban — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "informational",
    title: "Resort Information",
    icon: <Info className="w-8 h-8 text-primary" />,
    desc: "Details about amenities & family options",
    faqs: [
      {
        question: "What are the top-rated resorts in Bhurban?",
        answer: "Bhurban's leading resort options include the long-established chain properties and, for guests seeking something genuinely private, Himalaya Villas — Bhurban's only true private villa resort. Unlike conventional hotel rooms, Himalaya Villas offers villa-style seclusion combined with personalised service standards typically found at international luxury properties. Our guests come to us specifically because they've exhausted what the larger properties offer and want something that feels personal. For independent reviews, Himalaya Villas maintains a verified presence on TripAdvisor, Booking.com, and Google — all ratings are publicly accessible.",
        cta: "Read our guest reviews or enquire directly — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there family-friendly luxury resorts in Bhurban?",
        answer: "Himalaya Villas is specifically designed for affluent families who expect comfort and exclusivity without compromise. Our larger villa configurations accommodate families of 4 to 10 guests comfortably within a single, private setting. Children's programming, safe outdoor spaces, family dining arrangements, and attentive staff who understand the needs of families with young children are all part of what we offer. Many of our guests are families from Islamabad and Lahore who return each season — a detail we consider our strongest endorsement.",
        cta: "Plan your family retreat — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What outdoor activities do Bhurban resorts provide?",
        answer: "Himalaya Villas guests have access to guided nature trails through Bhurban's pine-forested hillsides, scenic sunrise walks, curated viewpoint visits, and local excursions including Pindi Point, Patriata, and Murree town. For guests interested in golf, the Bhurban Golf Club is minutes from the property. All outdoor activities are arranged personally by our concierge team — we do not hand guests a brochure and leave them to it. The arrangement, transport, and scheduling are all managed on your behalf.",
        cta: "Ask our concierge about activity planning — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there resorts in Bhurban with private balconies and mountain views?",
        answer: "Every villa and suite at Himalaya Villas features a private balcony or outdoor terrace with direct, unobstructed views across the Himalayan foothills. This is a core design principle of the property — not a hotel corridor window, but a genuine private outdoor space where guests take morning tea with the mountains as their only backdrop. Morning on a Himalaya Villas terrace with fresh mountain air and freshly prepared breakfast is, consistently, what our guests describe first when they tell others about their stay.",
        cta: "Experience it yourself — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there resorts in Bhurban with fitness facilities?",
        answer: "Himalaya Villas provides a fully equipped fitness facility for guests who prefer to maintain their fitness routine during their mountain stay. Equipment includes cardio machines, free weights, and strength training apparatus in a clean, private environment. For guests who prefer outdoor fitness, guided morning walks and nature trails through the property and surrounding forest provide a natural and visually spectacular alternative to an indoor gym — and we'd argue the better option when in the mountains.",
        cta: "Enquire about our facilities — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "compare",
    title: "Compare Options",
    icon: <Sliders className="w-8 h-8 text-primary" />,
    desc: "Compare amenities, spaces & loyalty perks",
    faqs: [
      {
        question: "What amenities should I compare when choosing a Bhurban resort?",
        answer: "When evaluating Bhurban's premium properties, the key differentiators to compare are: accommodation type (private villa vs. hotel room), service personalisation (are you a named guest or a room number?), dining quality (plated vs. buffet), privacy level (number of total villas/rooms), and the breadth of concierge and in-stay services. Himalaya Villas leads on every one of these dimensions for guests who prioritise experience. Larger chain properties offer brand loyalty programmes and business-scale infrastructure. The choice depends on whether you are seeking a luxury experience or a familiar brand.",
        cta: "Experience the difference — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there Bhurban resorts with loyalty programs or VIP membership?",
        answer: "Himalaya Villas operates a relationship-based VIP guest programme for repeat visitors — not a points system, but a genuine commitment to recognising and rewarding guests who return. Benefits include priority booking access before public availability, complimentary upgrades where available, preferred direct rates, and personalised service that reflects your preferences on every stay. VIP guest status is extended based on booking history. Contact our reservations team directly to enquire.",
        cta: "Enquire about our VIP guest programme — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What room types are available at premium Bhurban resorts?",
        answer: "Himalaya Villas offers three villa configurations: a Premier Mountain Villa (ideal for couples and solo travellers), a Family Villa (accommodating families of 4–6 with separate living and sleeping areas), and a Grand Villa (our largest offering, suitable for extended families or groups of up to 10 guests requiring a single private property). All villas include private balconies or terraces, premium furnishings, en-suite bathrooms, climate control, and daily housekeeping. Specific villa details are available via our website or by contacting our reservations team.",
        cta: "View villa options and check availability — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "booking",
    title: "Villa Booking & Reservations",
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
    desc: "Direct booking, early check-in & group stays",
    faqs: [
      {
        question: "How do I book Himalaya Villas directly for the best rate?",
        answer: "Booking directly with Himalaya Villas is straightforward: contact us via WhatsApp with your preferred dates, number of guests, and any specific requirements. Our reservations team responds within 15 minutes during business hours (9 AM – 10 PM). We will confirm villa availability, share the current package options, and guide you through a simple booking process. Direct bookings receive our best available rate guarantee along with complimentary inclusions — typically a welcome amenity, flexible check-in/check-out consideration, and personalised pre-arrival coordination — none of which are available on OTA platforms.",
        cta: "WhatsApp us now — +92 304 567 9000"
      },
      {
        question: "How to book a luxury stay in Bhurban online?",
        answer: "Himalaya Villas can be booked through three channels: directly via our website (recommended), via WhatsApp for a fully personalised reservation experience, or through major OTAs including Booking.com, Airbnb, TripAdvisor, and Agoda. Direct bookings carry our best rate guarantee and include complimentary inclusions not offered through OTA platforms. WhatsApp bookings also allow you to specify preferences, dietary requirements, and special arrangements before arrival — making your stay feel considered from the moment you confirm.",
        cta: "Book directly for the best experience — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What are the best online platforms to book Bhurban resort stays?",
        answer: "Himalaya Villas is available on Booking.com, TripAdvisor, Airbnb, Agoda, and Google Hotels. However, the best experience — and the best rate — comes from booking directly with us via our website or WhatsApp. Direct bookings receive our best available rate guarantee, personalised pre-arrival coordination, and complimentary inclusions not visible or available on any OTA platform.",
        cta: "Book directly — WhatsApp: +92 304 567 9000 | Website: www.himalayavillas.com"
      },
      {
        question: "How do I check availability and book for group stays in Bhurban?",
        answer: "For groups of six or more guests, Himalaya Villas recommends contacting our reservations team directly rather than booking online. Group bookings require villa configuration planning, customised package pricing, and pre-arrival coordination that OTA platforms cannot accommodate. Send us your preferred dates, approximate group size, and the nature of the occasion (family gathering, corporate retreat, celebration) via WhatsApp. Our team will respond within 4 hours with tailored availability and a package proposal specific to your group.",
        cta: "Group booking enquiries — WhatsApp: +92 304 567 9000"
      },
      {
        question: "How do I get early check-in or late check-out at a Bhurban resort?",
        answer: "At Himalaya Villas, standard check-in is at 2:00 PM and check-out is at 12:00 noon. Early check-in from 10:00 AM and late check-out until 2:00 PM are available at no additional charge for direct bookings and returning guests, subject to villa availability on the day. To secure an early or late arrangement, contact our team via WhatsApp at least 48 hours before your arrival. We will confirm availability and ensure your villa is ready at the requested time.",
        cta: "Request early check-in or late check-out — WhatsApp: +92 304 567 9000"
      },
      {
        question: "How do I book a Bhurban resort stay for a family reunion?",
        answer: "Himalaya Villas accommodates extended family groups through full-property exclusive bookings — the entire property reserved for one family, with complete privacy, dedicated staff, and customised catering for groups of 15 to 60 guests. Family reunion packages include welcome arrangements, catered meals across all days, coordinated activity options, and a private dining setup for the group. These events require enquiry at least 6–8 weeks in advance. Contact our events team for a full proposal including pricing, inclusions, and available dates.",
        cta: "Enquire about exclusive family bookings — WhatsApp: +92 304 567 9000"
      },
      {
        question: "How do I reserve a suite for an anniversary celebration at a Bhurban resort?",
        answer: "Himalaya Villas is a favoured destination for anniversary celebrations among Pakistan's most private couples. To reserve your anniversary suite, contact us via WhatsApp with your preferred dates and any specific requests — flowers, preferred dining arrangements, cake, special decorations. We ask for as much advance notice as possible to allow our team to prepare something truly fitting. Our anniversary experiences are not templated. Every arrangement is made specifically for you. Availability for key dates — particularly around Eid and long weekends — should be confirmed 3–4 weeks in advance.",
        cta: "Plan your anniversary stay — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What are the best Bhurban resorts for honeymooners?",
        answer: "Himalaya Villas is Bhurban's foremost honeymoon destination. Our Honeymoon Sanctuary package is a fully curated experience: a private suite with mountain views, a candlelit romantic dinner, spa treatments for two, handwritten welcome amenities, and dedicated concierge attention throughout your stay. We intentionally limit our villa inventory to ensure privacy — you will not share your experience with hundreds of hotel guests. Availability for prime dates fills several weeks in advance. Contact us as early as possible to reserve your preferred dates.",
        cta: "Reserve your honeymoon suite — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "directions",
    title: "Directions & Contact",
    icon: <MapPin className="w-8 h-8 text-primary" />,
    desc: "Getting here, local area & contact info",
    faqs: [
      {
        question: "How do I get to Himalaya Villas, Bhurban from Islamabad?",
        answer: "Himalaya Villas is located in Bhurban, approximately 55 km from Islamabad. The recommended route is via the Murree Expressway — a dual-carriageway that takes approximately 45 to 60 minutes in regular traffic. Detailed gate access instructions and a property location pin are shared with all guests upon booking confirmation. For guests who prefer not to self-drive, our concierge can arrange a private luxury vehicle transfer from any Islamabad location, including Islamabad International Airport. Transfer booking requires 24 hours' advance notice.",
        cta: "Arrange a private transfer — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What are the transportation options to reach Bhurban from Lahore?",
        answer: "From Lahore, Himalaya Villas is approximately 270 km — a 3.5 to 4-hour drive via the Lahore–Islamabad Motorway (M2) and Murree Expressway. The drive is straightforward and well-signposted; the majority of our Lahore guests choose to self-drive. For guests who prefer arranged transport, our concierge can coordinate a private luxury vehicle transfer from Lahore. Transfer pricing is provided during the booking process and is based on vehicle type and one-way or return requirement.",
        cta: "Enquire about Lahore–Bhurban transfers — WhatsApp: +92 304 567 9000"
      },
      {
        question: "How do I find Bhurban resorts near popular tourist attractions?",
        answer: "Himalaya Villas is ideally positioned in Bhurban for access to the Murree Hills' key landmarks. Murree town is 15 minutes by road. Pindi Point, Patriata (Chair Lift), and the Kashmir Point viewpoints are all within a 20–30 minute drive. The Bhurban Golf Club is minutes from the property. Our concierge team pre-plans guest excursions upon request, so you spend your time experiencing the area rather than navigating it. All excursion transport can be arranged through us.",
        cta: "Let our concierge plan your Bhurban itinerary — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Where can I find contact and reservation details for Himalaya Villas?",
        answer: "Himalaya Villas reservations are available 7 days a week between 9:00 AM and 10:00 PM. WhatsApp / Phone: +92 304 567 9000 | Email: reservations@himalayavillas.com.pk | Website: www.himalayavillas.com | Location: Bhurban, Murree, Rawalpindi District, Punjab, Pakistan. For corporate enquiries, event bookings, or full-property exclusive reservations, direct your message to the WhatsApp number above and specify the nature of your enquiry. Our team responds within 15 minutes during business hours.",
        cta: "Contact us now — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "pricing",
    title: "Pricing & Packages",
    icon: <Banknote className="w-8 h-8 text-primary" />,
    desc: "Rates, seasonal offers & meal plans",
    faqs: [
      {
        question: "What is the average cost of a weekend stay at a premium Bhurban resort?",
        answer: "Premium weekend stays at Bhurban's leading properties range from PKR 35,000 to PKR 80,000+ per night depending on the property, room type, and season. At Himalaya Villas, private villa rates begin from PKR 45,000 per night with inclusions that go well beyond a standard hotel room — private terrace with mountain views, premium furnishings, and personalised service as standard. Direct bookings with Himalaya Villas include complimentary inclusions not available through OTAs. Contact us for current package rates and availability.",
        cta: "Get our best direct rate — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Which Bhurban resorts offer seasonal promotional packages?",
        answer: "Himalaya Villas releases curated seasonal packages aligned with Pakistan's key travel occasions: Eid holidays, summer peak season, long weekends, and winter getaways. Our seasonal packages bundle villa stays with dining, spa credits, and experience add-ons at rates that are not available on OTAs. To receive early access to seasonal packages before public announcement, contact us to be added to our priority guest list. Packages for Eid and peak summer typically sell out 3–4 weeks in advance.",
        cta: "Join our priority guest list — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there Bhurban resorts that offer all-inclusive meal plans?",
        answer: "Yes. Himalaya Villas offers curated all-inclusive dining packages covering full breakfast, a light lunch, and a three-course dinner prepared by our in-house culinary team. All-inclusive packages are available as an add-on to any villa booking at a supplementary per-person rate. Our all-inclusive dining uses fresh, locally sourced mountain produce. Unlike hotel buffet all-inclusive options, meals at Himalaya Villas are plated and served — the experience reflects the property's luxury positioning throughout.",
        cta: "Ask about our all-inclusive package — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "weddings",
    title: "Weddings",
    icon: <Heart className="w-8 h-8 text-primary" />,
    desc: "Custom celebrations & exclusive estate bookings",
    faqs: [
      {
        question: "Which Bhurban resorts offer customised wedding or event planning services?",
        answer: "Himalaya Villas specialises in small, intimate, ultra-premium wedding events and milestone celebrations for 10 to 80 guests. Our events team manages every element — floral arrangements, catering, venue setup, photography coordination, and personalised guest management from arrival to departure. We do not handle mass-market banquets. Our events are curated for guests who value detail, privacy, and a setting that makes the occasion genuinely memorable. Enquire at least 8 weeks in advance to secure your preferred date.",
        cta: "Discuss your wedding event with us — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Can I book the entire Himalaya Villas estate for a destination wedding?",
        answer: "Yes, Himalaya Villas is frequently booked exclusively for intimate mountain weddings. By reserving the entire estate, you ensure absolute privacy for your guests and total freedom in utilizing our outdoor gardens, terraces, and dining spaces. Our culinary team will work with you to design bespoke menus for multiple days of celebrations.",
        cta: "Request an exclusive estate wedding proposal — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "events",
    title: "Events",
    icon: <PartyPopper className="w-8 h-8 text-primary" />,
    desc: "Private gatherings, milestones & celebrations",
    faqs: [
      {
        question: "What type of private events can be hosted at Himalaya Villas?",
        answer: "We specialize in intimate gatherings, including anniversary dinners, birthday retreats, private family reunions, and curated luxury offsites. Rather than a large ballroom, we offer exclusive use of specific villa wings, terraced gardens, and our main dining room. Our events team provides full-service planning from the menu to the décor, ensuring a flawless experience.",
        cta: "Plan your private event — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there outdoor event spaces available?",
        answer: "Yes, our landscaped gardens and private villa terraces serve as stunning outdoor venues for evening bonfires, high teas, and scenic dinners. Surrounded by pine forests and offering sweeping valley views, these outdoor spaces provide a magical atmosphere for both daytime and evening events.",
        cta: "Enquire about our outdoor venues — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "corporate",
    title: "Corporate Bookings",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    desc: "Executive retreats, boardrooms & business facilities",
    faqs: [
      {
        question: "Which Bhurban resorts provide corporate retreat facilities?",
        answer: "Himalaya Villas is Bhurban's leading destination for senior executive corporate retreats. We offer private meeting rooms with full AV equipment, high-speed connectivity, all-day catering, and a mountain setting that creates the mental distance from the office that productive thinking requires. Our corporate packages cover accommodation for 10 to 50 executives, private dining, team activity options, and a dedicated events coordinator.",
        cta: "Request a corporate retreat proposal — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Find Bhurban resorts with conference and event facilities.",
        answer: "Himalaya Villas provides private conference and meeting facilities for corporate groups of 10 to 50 attendees. The setting — mountain air, natural light, and complete seclusion — is what distinguishes a Himalaya Villas offsite from a standard city boardroom rental at a hotel. Facilities include high-speed internet, presentation equipment, whiteboards, and full-day catering.",
        cta: "Request a conference package — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "services",
    title: "Services",
    icon: <ConciergeBell className="w-8 h-8 text-primary" />,
    desc: "Dining, transfers, spa & concierge offerings",
    faqs: [
      {
        question: "Which resorts in Bhurban offer spa and wellness packages?",
        answer: "Himalaya Villas offers a curated wellness experience for guests seeking genuine restoration alongside their mountain retreat. Our spa services include therapeutic massage, body treatments, and couples' wellness sessions — all available in a private, unhurried environment that prioritises your comfort over volume. Wellness packages can be added to any villa booking.",
        cta: "Book a spa package — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What vegetarian and halal food options are available at Bhurban resorts?",
        answer: "All menus at Himalaya Villas are fully halal-certified — this is not a dietary option but a standard across every item served on the property. Our kitchen sources meat and produce from verified halal suppliers, and our menus include a wide range of vegetarian and lighter options alongside main course selections.",
        cta: "Share your dietary preferences at booking — WhatsApp: +92 304 567 9000"
      },
      {
        question: "What dining options are available at luxury Bhurban resorts?",
        answer: "At Himalaya Villas, dining is treated as an experience in itself. Our in-house culinary team prepares daily menus using fresh, locally sourced ingredients. Guests can enjoy a full mountain breakfast on their private terrace, curated lunches, and multi-course dinners in the main dining room or in their villa. All menus are fully halal-certified.",
        cta: "Ask about our dining packages — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Are there Bhurban resorts offering adventure sports equipment and facilities?",
        answer: "Himalaya Villas concierge can arrange mountain biking, zip-lining access, trekking equipment, and local adventure activities through our curated partner network in the Murree Hills and surrounding areas. Rather than operating these facilities in-house, we pre-vet and arrange trusted local adventure operators, coordinate your session times, and manage logistics.",
        cta: "Plan your adventure itinerary with us — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Can I arrange airport transfers directly through a Bhurban resort?",
        answer: "Yes. Himalaya Villas offers private airport transfer services from Islamabad International Airport directly to the property. All transfers use premium vehicles appropriate to the property's luxury positioning. Airport transfer bookings require at least 24 hours' advance notice and flight details.",
        cta: "Book your airport transfer — WhatsApp: +92 304 567 9000"
      }
    ]
  },
  {
    id: "policies",
    title: "Policies / Refunds",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    desc: "Cancellations, modifications & property rules",
    faqs: [
      {
        question: "How do I cancel or modify a Bhurban resort reservation?",
        answer: "For direct bookings with Himalaya Villas, modifications and cancellations are accepted up to 72 hours before the scheduled arrival date at no charge. Cancellations made within 72 hours of arrival are subject to a one-night retention charge. Modifications to dates or villa type are accommodated subject to availability and are always handled with flexibility where possible. Contact our team via WhatsApp for the fastest resolution on any modification.",
        cta: "For booking changes — WhatsApp: +92 304 567 9000"
      },
      {
        question: "Luxury hotels in Murree with pet-friendly policies",
        answer: "Himalaya Villas Bhurban does not permit pets on the estate. To maintain a premium, allergen-controlled environment for all guests — including families with children and guests with sensitivities — no animals are permitted in the villas or on the grounds. Guests travelling with pets are advised to arrange suitable boarding in Rawalpindi or Islamabad prior to arrival.",
        cta: "Contact us directly at +92 304 567 9000 for recommendations."
      }
    ]
  }
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-300",
        isOpen
          ? "border-primary/50 bg-card shadow-[0_20px_50px_-30px_rgba(60,50,20,0.5)]"
          : "border-border bg-card/60 hover:border-primary/40"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
      >
        <span
          className={cn(
            "font-display text-lg leading-snug transition-colors sm:text-xl",
            isOpen ? "text-foreground" : "text-foreground/90"
          )}
        >
          {item.question}
        </span>
        <span
          className={cn(
            "ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
            isOpen
              ? "rotate-45 border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground/60"
          )}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
          {item.cta && (
  <a
    href={buildWhatsAppBookingUrl("a private villa tour")}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-4 border-l-2 border-primary hover:bg-muted/80 transition-colors"
  >
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
      <PhoneCall className="h-3.5 w-3.5 text-primary" />
    </div>
    <span className="text-sm font-medium text-foreground">
      {item.cta.replace("📞", "").trim()}
    </span>
  </a>
)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    if (activeCategory === id) {
      setActiveCategory(null);
    } else {
      setActiveCategory(id);
      setOpenKey(null);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (it) =>
          (activeCategory === null || activeCategory === cat.id) &&
          (q === "" ||
            it.question.toLowerCase().includes(q) ||
            it.answer.toLowerCase().includes(q))
      ),
    })).filter((cat) => cat.faqs.length > 0);
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-foreground">
        <Image
          src="/assets/faq-hero.jpg"
          alt="Misty Himalayan peaks at dawn above a pine forest"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-primary"></span>
              <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                SUPPORT & INFO
              </span>
              <span className="h-px w-10 bg-primary"></span>
            </div>
            <h1 className="mt-8 font-display text-5xl leading-[1.1] text-white sm:text-6xl md:text-7xl">
              Frequently Asked
              <span className="block italic text-primary font-light mt-2">Questions</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed text-white/75">
              Select a category below to find answers to your questions about bookings, amenities, location, and the Himalaya Villas experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-10">
          {/* Search */}
          <div className="relative mx-auto max-w-2xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-full border border-border bg-card py-4 pl-14 pr-5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Category pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "rounded-full border px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                activeCategory === null
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary hover:text-foreground"
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                  activeCategory === cat.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-muted-foreground hover:border-primary hover:text-foreground"
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Accordions */}
          <div className="mt-16 space-y-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((cat) => (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {cat.title}
                  </h2>
                  <div className="space-y-4">
                    {cat.faqs.map((item, i) => {
                      const key = `${cat.id}-${i}`;
                      return (
                        <AccordionItem
                          key={key}
                          item={item}
                          isOpen={openKey === key}
                          onToggle={() =>
                            setOpenKey(openKey === key ? null : key)
                          }
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="py-20 text-center font-display text-3xl text-muted-foreground/50">
                No questions match your search.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 pb-28 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-6xl rounded-[2rem] bg-foreground px-10 py-20 text-center text-background sm:px-20"
        >
          <div className="gap-14 items-center text-left">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-primary"></span>
                <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Still Have Questions?
                </span>
                <span className="h-px w-10 bg-primary"></span>
              </div>
              <h2 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">
                Can't Find What You're Looking For?
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-background/70">
                Our team is here to help. Send us your question and we'll get back to you within 15 minutes during business hours (9 AM - 10 PM).
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href={buildWhatsAppBookingUrl("a private villa tour")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 whitespace-nowrap rounded-sm"
                >
                  <span className="hidden xs:inline">Request Private Tour</span>
                  <span className="xs:hidden">Book Now</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}