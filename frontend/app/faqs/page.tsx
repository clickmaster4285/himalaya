"use client";

import React, { useState } from "react";
import { 
  Plus, Minus, PhoneCall, ChevronRight, HelpCircle, Info, Sliders, CalendarCheck, MapPin, 
  Banknote, Heart, PartyPopper, Briefcase, ConciergeBell, ShieldCheck 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Frequently Asked Questions about Himalaya Villas",
  "description": "Comprehensive FAQ page covering all aspects of Himalaya Villas including booking, amenities, location, services, and policies.",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is special in Bhurban?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhurban is Pakistan's most elevated luxury destination, perched at 5,000+ feet in the Murree Hills with dense pine forests and panoramic Himalayan views — just 45 minutes from Islamabad. What sets Bhurban apart is the rare combination of mountain cool, natural grandeur, and world-class hospitality infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "What is Bhurban known for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhurban, Murree is known for its pine-forested hills, cool mountain climate, and status as Pakistan's premier hill station for luxury travel. Home to the country's most prestigious mountain retreats, Bhurban attracts Islamabad and Lahore's elite families, corporate leaders, and discerning travellers seeking a genuine escape from city heat."
      }
    },
    {
      "@type": "Question",
      "name": "How do I book at Himalaya Villas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book directly through our website, via WhatsApp at +92 304 567 9000, or by calling our reservations team. We offer guaranteed best rates on direct bookings."
      }
    }
  ]
};

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      id: "popular",
      title: "Popular Questions",
      icon: <HelpCircle className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
          question: "Where is Grand Taj Hotel in Murree? How many stars does it have?",
          answer: "Grand Taj Hotel Murree is located in Upper Murree, near the Kashmir Point area of Murree town. It is a mid-range property operating at a 3 to 4-star standard, positioned in the main Murree hill station area rather than in the quieter, higher-elevation Bhurban zone. For travellers specifically seeking 5-star private estate luxury in the Murree Hills, Himalaya Villas Bhurban is the highest-rated private villa destination in the region, with a 4.8/5 average across 127 verified guest reviews.",
          cta: "To compare options — WhatsApp: +92 304 567 9000"
        },
        {
          question: "Where is the Taj Mahal Hotel in Murree?",
          answer: "There are several guesthouses and smaller hotels in Murree that use 'Taj' in their name — these are local independent properties and are not affiliated with the international Taj Hotels group (Indian Hotels Company Limited). The internationally recognised Taj Hotels brand does not currently operate a property in Murree or the surrounding Murree Hills. The 'Taj Mahal Hotel' references seen in some Murree listings refer to locally-named guesthouses in Murree town.",
          cta: "For a genuine 5-star luxury experience in the Murree Hills — WhatsApp: +92 304 567 9000"
        },
        {
          question: "Is Nathia Gali colder than Murree?",
          answer: "Yes — Nathia Gali is consistently colder than Murree. Nathia Gali sits at approximately 2,500 metres above sea level compared to Murree's 2,130 metres and Bhurban's 1,850 metres. The higher elevation means lower temperatures year-round, heavier snowfall in winter, and cooler summers. Winter visits require 4WD vehicles on mountain roads.",
          cta: "For year-round heated villa accommodation in Bhurban — WhatsApp: +92 304 567 9000"
        },
        {
          question: "What is the best time to visit Nathia Gali?",
          answer: "The best time to visit Nathia Gali is from late April through October, when temperatures are mild (12–24°C) and the roads are clear and accessible. Peak season is June through August. Winter visits offer snow experiences but require 4WD vehicles as access can be challenging. By comparison, Himalaya Villas Bhurban sits at 1,850m with superior luxury accommodation, central heating, and a well-maintained road via the Murree Expressway.",
          cta: "Book your stay at Himalaya Villas — WhatsApp: +92 304 567 9000"
        },
        {
          question: "What is special in Nathia Gali?",
          answer: "Nathia Gali is known for the Miranjani Peak Trek, dense pine and deodar cedar forests, and a raw retreat character due to lower commercial development. While it offers raw natural beauty, it has very limited luxury accommodation. Himalaya Villas Bhurban provides the mountain setting with 5-star private villa facilities — spa, fine dining, butler service — that Nathia Gali cannot match.",
          cta: "Enquiries: +92 304 567 9000"
        },
        {
          question: "What are the top 3 hotel brands in the world? What are 5-star hotel brands?",
          answer: "The most widely recognised global 5-star hotel brands include Four Seasons, Aman Resorts, and The Ritz-Carlton. In Pakistan, dominant luxury hotel brands are Marriott, Serena Hotels, and Pearl Continental. For mountain luxury in the Murree Hills, Himalaya Villas Bhurban operates at a private 5-star estate standard — boutique in scale, personal in service, and rated 4.8/5.",
          cta: "Enquiries: +92 304 567 9000"
        },
        {
          question: "Are there any luxury hotels in Lahore?",
          answer: "Yes — Lahore has several luxury options including Pearl Continental Lahore, Avari Towers, and Lahore Serena Hotel. For travellers from Lahore planning a mountain retreat, Himalaya Villas Bhurban is approximately 350 km from Lahore (roughly 4 hours via the M-2 Motorway). It is one of Pakistan's most popular weekend destinations for affluent Lahore families seeking mountain luxury.",
          cta: "Book at +92 304 567 9000 or WhatsApp"
        },
        {
          question: "Who owns Marriott in Pakistan?",
          answer: "The Marriott Hotel in Islamabad is operated under a franchise agreement, but the underlying property is owned by the Hashoo Group, which also owns the Pearl Continental (PC) chain. PC Bhurban, 3.5 km from Himalaya Villas, is part of this portfolio. Himalaya Villas Bhurban is an independent private estate — not affiliated with any chain — which allows for unparalleled personalisation and exclusivity.",
          cta: "Book direct: +92 304 567 9000"
        }
      ]
    },
    {
      id: "informational",
      title: "Resort Information",
      icon: <Info className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
        },
        {
          question: "Are there Bhurban resorts with guided hiking or nature tours?",
          answer: "Himalaya Villas offers curated guided nature walks and hiking experiences through the Bhurban hillsides. Our guided walks include sunrise hikes to premier viewpoints, forest trail walks through the property's surrounding pine forest, and half-day excursions to local landmarks. All guides are knowledgeable about local flora, terrain, and seasonal conditions. Guided nature experiences are available as part of extended stay packages or as standalone add-ons. Contact our concierge to build this into your itinerary.",
          cta: "Enquire about our guided experiences — WhatsApp: +92 304 567 9000"
        },
        {
          question: "Which Bhurban resorts have accessible rooms and facilities for guests with disabilities?",
          answer: "Himalaya Villas is committed to ensuring a comfortable experience for all guests. We offer ground-level villa access and can configure room layouts and dining arrangements to suit mobility requirements. Guests with specific accessibility needs are strongly encouraged to contact us directly before booking so we can confirm suitable arrangements and ensure nothing is left to chance on arrival.",
          cta: "Discuss accessibility requirements with our team — WhatsApp: +92 304 567 9000"
        }
      ]
    },
    {
      id: "compare",
      title: "Compare Options",
      icon: <Sliders className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
      icon: <CalendarCheck className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
      icon: <MapPin className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
      icon: <Banknote className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
      icon: <Heart className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
      icon: <PartyPopper className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
      icon: <Briefcase className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
        },
        {
          question: "Luxury hotels in Murree with executive lounges and business centers",
          answer: "Himalaya Villas does not have a traditional shared executive lounge in the hotel sense. Instead, the executive experience is delivered privately — your villa is your lounge. For corporate and business guests, Himalaya Villas provides a private boardroom with full AV equipment, high-speed conference WiFi, all-inclusive catering for meeting sessions, and a dedicated event coordinator. Our corporate wing accommodates 10 to 50 people exclusively.",
          cta: "For corporate enquiries: WhatsApp +92 304 567 9000"
        }
      ]
    },
    {
      id: "services",
      title: "Services",
      icon: <ConciergeBell className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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
        },
        {
          question: "Murree luxury hotels with outdoor heated pools and rooftop infinity pools",
          answer: "Himalaya Villas does not currently have an outdoor swimming pool or rooftop infinity pool. At 1,850 metres elevation in Bhurban, the mountainous terrain and forested landscape are the defining outdoor features of the estate — not a pool. Guests seeking outdoor leisure will find that the private terraces on each villa, panoramic views, guided forest trails, bonfire evenings, and open-sky dining more than fulfil the outdoor experience.",
          cta: "For bookings and enquiries: +92 304 567 9000 or WhatsApp."
        },
        {
          question: "Murree luxury hotels with best in-room technology and entertainment",
          answer: "All twelve villas at Himalaya Villas Bhurban are equipped with high-speed WiFi, smart flat-screen televisions with streaming capability (Netflix, YouTube, and on-demand content), premium sound systems, and USB charging stations throughout. In-villa technology is designed for comfort rather than distraction. For corporate bookings requiring full AV, our private boardroom is fully equipped.",
          cta: "Contact us at +92 304 567 9000 to discuss requirements."
        },
        {
          question: "Best luxury hotels in Murree with multilingual staff and international guest services",
          answer: "The Himalaya Villas team is fully fluent in Urdu and English, and our reservations and concierge communications operate in both languages. We regularly host international guests — Pakistani diaspora from the UAE, UK, Saudi Arabia, Canada, and the USA — and are experienced in meeting international guest expectations for service, communication, and room standards.",
          cta: "For international booking enquiries: +92 304 567 9000 (WhatsApp internationally available)."
        },
        {
          question: "Where can I find luxury hotels in Murree with bespoke interior design themes?",
          answer: "Himalaya Villas Bhurban features individually appointed villas — each one decorated distinctly rather than as standardised hotel rooms. The design aesthetic draws from the natural landscape of Bhurban: warm earth tones, local woodwork, natural stone finishes, Kashmiri textile accents, and panoramic-facing windows that bring the mountain view into the interior.",
          cta: "Contact our reservations team on WhatsApp +92 304 567 9000 for a virtual tour."
        },
        {
          question: "How to book luxury hotels in Murree that offer helicopter transfer services?",
          answer: "Himalaya Villas does not currently offer helicopter transfer services. The road transfer from Islamabad to Bhurban (60 km, approximately 75 minutes via the Murree Expressway) is well-maintained and accessible year-round, making helicopter transfer unnecessary for the majority of guests. For all standard transfer bookings — private car from Islamabad International Airport, Islamabad city, or Rawalpindi — please reach out to us.",
          cta: "WhatsApp +92 304 567 9000 at least 24 hours before your arrival date."
        },
        {
          question: "List luxury hotels in Murree that provide chauffeured limousine services for guests",
          answer: "Himalaya Villas provides private car transfer services for guests rather than traditional limousine hire. Our transfer vehicles are executive-class, air-conditioned, and driven by vetted, experienced drivers who know the Murree Hills road network in all weather conditions. Transfer routes available: Islamabad International Airport, Islamabad city, and Rawalpindi Saddar to Bhurban.",
          cta: "WhatsApp +92 304 567 9000 with your travel dates and requirements."
        }
      ]
    },
    {
      id: "policies",
      title: "Policies / Refunds",
      icon: <ShieldCheck className="w-8 h-8 mb-4 text-[#c9a55b]" />,
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

  const handleCategoryClick = (id: string) => {
    if (activeCategory === id) {
      setActiveCategory(null); // Toggle off if already active
    } else {
      setActiveCategory(id);
      setOpenIndex(null); // Reset open accordion
      // Scroll a bit to show FAQs
      setTimeout(() => {
        const element = document.getElementById('faqs-container');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeCategoryData = faqData.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#fcfbf8] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-[#1b261b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,50 70,50 100,100 L100,0 L0,0 Z" fill="#c9a55b" />
          </svg>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>SUPPORT & INFO</span>
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-6">
            Frequently Asked
            <span className="block italic text-[#c9a55b] font-light mt-1">Questions</span>
          </h1>
          <p className="text-[15px] text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Select a category below to find answers to your questions about bookings, amenities, location, and the Himalaya Villas experience.
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="px-6 py-16 -mt-8 relative z-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {faqData.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`bg-white border text-left p-6 flex flex-col items-start transition-all duration-300 shadow-sm hover:shadow-md ${
                activeCategory === category.id 
                  ? 'border-[#c9a55b] ring-1 ring-[#c9a55b] -translate-y-2' 
                  : 'border-[#eae3d5] hover:border-[#c9a55b]'
              }`}
            >
              {category.icon}
              <h3 className="font-display text-xl text-[#1b261b] mb-2">{category.title}</h3>
              <p className="text-[13px] text-neutral-500 font-light leading-relaxed mb-4">
                {category.desc}
              </p>
              <div className={`mt-auto flex items-center text-[11px] font-bold uppercase tracking-wider ${
                activeCategory === category.id ? 'text-[#c9a55b]' : 'text-neutral-400'
              }`}>
                View Answers <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-[#1b261b] to-[#2a342a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 C25,30 75,70 100,50 L100,100 L0,100 Z" fill="#c9a55b" />
          </svg>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
                <span>Still Have Questions?</span>
                <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-[1.1] mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-[15px] text-white/70 font-light leading-relaxed mb-8">
                Our team is here to help. Send us your question and we'll get back to you within 15 minutes during business hours (9 AM - 10 PM).
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <PhoneCall className="w-5 h-5 text-[#c9a55b]" />
                  <span className="text-sm">WhatsApp: +92 304 567 9000</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm">Average response time: 15 minutes</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#c9a55b] focus:bg-white/15 transition"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#c9a55b] focus:bg-white/15 transition"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#c9a55b] focus:bg-white/15 transition"
                />
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#c9a55b] focus:bg-white/15 transition">
                  <option value="" className="bg-[#1b261b]">Select Topic</option>
                  <option value="booking" className="bg-[#1b261b]">Booking Inquiry</option>
                  <option value="villa" className="bg-[#1b261b]">Villa Information</option>
                  <option value="wedding" className="bg-[#1b261b]">Wedding/Event</option>
                  <option value="corporate" className="bg-[#1b261b]">Corporate Retreat</option>
                  <option value="other" className="bg-[#1b261b]">Other Question</option>
                </select>
                <textarea
                  placeholder="Type your question here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#c9a55b] focus:bg-white/15 transition resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#c9a55b] hover:bg-[#a98741] text-white font-bold uppercase tracking-wider text-sm py-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Your Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Active Category FAQs */}
      <section id="faqs-container" className="px-6 pb-24 flex-grow">
        <div className="max-w-[900px] mx-auto">
          {activeCategoryData ? (
            <div className="bg-white p-8 md:p-12 border border-[#eae3d5] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#eae3d5]">
                <div className="w-12 h-12 rounded-full bg-[#fcfbf8] border border-[#eae3d5] flex items-center justify-center shrink-0">
                  {React.cloneElement(activeCategoryData.icon as any, { className: "w-5 h-5 text-[#c9a55b] mb-0" })}
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-[#1b261b]">
                    {activeCategoryData.title}
                  </h2>
                  <p className="text-[14px] text-neutral-500 font-light mt-1">
                    {activeCategoryData.faqs.length} commonly asked questions
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {activeCategoryData.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-[#eae3d5] last:border-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <span className={`text-[15px] font-bold pr-8 transition-colors ${openIndex === index ? 'text-[#c9a55b]' : 'text-[#1b261b] group-hover:text-[#c9a55b]'}`}>
                        {faq.question}
                      </span>
                      <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${openIndex === index ? 'bg-[#c9a55b] border-[#c9a55b] text-white' : 'bg-[#fcfbf8] border-[#eae3d5] text-neutral-400 group-hover:border-[#c9a55b] group-hover:text-[#c9a55b]'}`}>
                        {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-[14px] text-neutral-600 leading-relaxed font-light mb-5">
                        {faq.answer}
                      </p>
                      {faq.cta && (
                        <div className="flex items-center gap-3 text-[13px] font-medium text-[#1b261b] bg-[#fcfbf8] p-4 border-l-2 border-[#c9a55b]">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <PhoneCall className="w-3.5 h-3.5 text-[#c9a55b]" />
                          </div>
                          <span>{faq.cta.replace('📞', '').trim()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
}
