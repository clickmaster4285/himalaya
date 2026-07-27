import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Guest House in Murree: Rates, Areas & How to Pick the Best One (2026)",
  description:
    "The complete guide to guest houses in Murree — types, realistic 2026 rates, the best areas, what to verify before paying, and the private estate that tops the category.",
  path: "/guest-house-murree",
  keywords: [
    "guest house murree",
    "guest house in murree",
    "best guest house in murree",
    "guest house murree mall road",
    "family guest house murree",
    "cheap guest house in murree",
    "guest house in bhurban",
    "private guest house murree",
    "guest house murree with kitchen",
  ],
});

const heroBg = "/images/villas/lux-complete4.jpg";

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a guest house cost in Murree per night?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 2026, basic guest house rooms in Murree cost PKR 3,000–6,000 on off-peak weekdays and quality family-run rooms PKR 7,000–14,000. Whole cottages run PKR 15,000–30,000 midweek, rising to PKR 50,000–90,000 on peak dates. Private villa estates in Bhurban start around PKR 45,000 for the whole property."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best guest house in Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For the category's core promise — privacy and home-like space — the standard is set by Himalaya Villas in Bhurban, a twelve-villa private estate booked by one group at a time with exclusive use of its grounds and amenities. For budget solo or couple stays, the family-run guest houses of Jhika Gali and Kuldana offer the best value."
      }
    },
    {
      "@type": "Question",
      "name": "Is a guest house better than a hotel in Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For families and groups, usually yes: guest houses offer more space, flexible food, and lower per-person cost. Hotels win for solo overnight stays near Mall Road, where staffed reception and generators matter more. For large gatherings, a private villa estate outperforms both."
      }
    },
    {
      "@type": "Question",
      "name": "Which area of Murree has the best guest houses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jhika Gali, Kuldana, and Lower Topa offer the best balance of quality, parking, and forest views for most budgets. Bhurban holds the premium tier — upscale cottages and private villa estates. Mall Road backstreets trade quality for walkable location, and Angoori Road is cheapest but most variable."
      }
    },
    {
      "@type": "Question",
      "name": "Do guest houses in Murree provide food?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many family-run guest houses cook to order at reasonable per-head rates, and whole cottages usually include a usable kitchen. Always confirm food arrangements when booking — in-house cooking, order-in, or self-catering — and check that a kitchen comes with working gas, utensils, and a fridge."
      }
    },
    {
      "@type": "Question",
      "name": "How do I book a guest house in Murree safely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ask for live photos or a video call, confirm heating, bedding count, and total price in writing on WhatsApp, pay the advance to a bank or business account, and never pay in full before arrival. Verify the property's name, phone number, and Google Maps location match before sending money."
      }
    },
    {
      "@type": "Question",
      "name": "Are there guest houses in Murree for large families or groups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Whole cottages sleep one family of six to eight. Larger gatherings — multiple families or fifteen-plus friends — typically outgrow single properties and split across buildings. The whole-estate alternative, such as Himalaya Villas' twelve-villa private estate in Bhurban, keeps the entire group on one private property."
      }
    },
    {
      "@type": "Question",
      "name": "Is a private guest house in Murree available with full privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Whole-cottage rentals offer building-level privacy but share lanes and viewpoints with neighbours. Full privacy — private grounds, trails, and amenities with no other guests — exists at estate level: Himalaya Villas in Bhurban admits one group at a time across its entire twelve-villa property."
      }
    }
  ]
};

// Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guest House in Murree: The Complete 2026 Guide to Finding the Right One",
  "description": "The complete guide to guest houses in Murree — types, realistic 2026 rates, the best areas, what to verify before paying, and the private estate that tops the category.",
  "author": {
    "@type": "Person",
    "name": "Himalaya Villas Travel Team"
  },
  "datePublished": "2026-07-27",
  "dateModified": "2026-07-27",
  "publisher": {
    "@type": "Organization",
    "name": "Himalaya Villas"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": absoluteUrl("/guest-house-murree")
  }
};

export default function GuestHouseMurreePage() {
  return (
    <section className="min-h-screen bg-[#F6F1EA]">
      <JsonLd items={[
        { id: "hv-jsonld-faq", data: faqSchema },
        { id: "hv-jsonld-article", data: articleSchema }
      ]} />
      
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[480px] md:h-[560px] lg:h-[640px] w-full overflow-hidden">
        <Image
          src={heroBg}
          alt="Guest House in Murree - Mountain views and accommodation guide"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl">
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Guest House in Murree:
              <br />
              <span className="text-[#c9a55b]">The Complete 2026 Guide</span>
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-white/90 text-sm sm:text-base md:text-lg tracking-wide max-w-3xl mx-auto">
              Types, realistic 2026 rates, the best areas, what to verify before paying,
              <br className="hidden sm:block" />
              and the private estate that tops the category
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              People who search for a guest house in Murree are usually running away from something: hotel lobbies, hotel prices, hotel dining rooms with fixed timings, and the general feeling of being one of two hundred guests in a building. What they are running toward is harder to name but easy to recognise — a place that feels like a house in the hills rather than a business with room numbers.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Murree's guest house market delivers that feeling unevenly. At its best, it offers warm family-run properties, whole cottages with their own kitchens, and — at the very top of the category — private estates that no hotel can imitate. At its worst, it is an unregulated sprawl of converted homes with no heating, no records, and no one answering the phone after you have paid a deposit.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              This guide maps the entire category: what a guest house actually gets you versus a hotel room, where Murree's guest houses cluster and how the areas differ, what they genuinely cost in 2026, the specific checks that protect your money, and — at the end — which property currently sets the standard for the category's core promise of privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Guest House vs Hotel Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Guest House vs Hotel in Murree: What You're Actually Trading
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The difference is not just price. A Murree hotel sells you a room and a service apparatus around it: reception, housekeeping on schedule, a restaurant, and staff on every floor. A guest house sells you space and informality: bigger rooms or whole floors for the money, food cooked to order or a kitchen you can use, hosts instead of front desks, and the freedom to keep your own hours.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              What you give up matters too. Guest houses rarely have backup generators sized for the whole property, rarely offer 24-hour staffed reception, and almost never appear on OTAs with the review depth that lets you filter out the bad ones. The category rewards travellers who verify before booking — and punishes those who book from a Facebook photo alone.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              <strong>The honest summary:</strong> for a solo overnight stay near Mall Road, a hotel room is simpler. For a family of six staying two nights, a good guest house beats a hotel on space, food, and cost — and a private villa estate beats them both, for reasons this guide comes back to at the end.
            </p>
          </div>
          
          {/* Internal Link to Hotel Rooms */}
          <div className="mt-6 pt-6 border-t border-[#eadfce]">
            <p className="text-sm sm:text-base text-neutral-700">
              <span className="font-medium">Compare with:</span>{" "}
              <Link href="/hotel-rooms-in-murree" className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                Hotel rooms in Murree
              </Link>
              {" "}— see how hotels stack up against guest houses for different travel styles.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Where Murree's Guest Houses Are — Area by Area
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Location shapes the guest house experience even more than it shapes hotels, because guest houses depend on their surroundings for everything the property itself doesn't provide.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Mall Road Backstreets and Central Murree
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The lanes behind and below Mall Road hold dozens of converted-home guest houses. The appeal is pure location: you walk to the bazaar and food street. The compromises are the steepest in Murree — small rooms, thin walls, contested parking, and, in season, noise until midnight. Book here for one night of convenience, not for a family stay.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Jhika Gali, Kuldana and Lower Topa
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                This belt is the guest-house sweet spot for most travellers: purpose-built properties from the last decade, drivable access, real parking, and rooms that face forest rather than other buildings. Family-run operations here often include home-cooked food on order — ask when booking, because it is frequently the best meal of the trip.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Bhurban and Kashmiri Bazar
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Bhurban is where the category climbs upmarket. Alongside the area's hotels, the ridges around Kashmiri Bazar and Mohra Iswal hold Murree's premium cottages and private villa estates — properties that take the guest house promise of privacy and scale it up to whole buildings and, in one case, an entire gated estate. If your search for a guest house is really a search for seclusion, Bhurban is where the search ends.
              </p>
              
              {/* Internal Links */}
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/luxury-hotels-in-murree" className="text-sm sm:text-base text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                  Luxury hotels in Murree →
                </Link>
                <Link href="/pc-hotel-bhurban-alternative" className="text-sm sm:text-base text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                  PC Hotel Bhurban alternative →
                </Link>
                <Link href="/bhurban" className="text-sm sm:text-base text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                  Bhurban area guide →
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Angoori Road and New Murree (Patriata)
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The outer belt offers the lowest prices and the most variable quality in the market. Some genuinely charming forest cottages operate here at half the Jhika Gali rate; so do bare-concrete rooms with a geyser that works on request. Recent photos and a video call before paying are non-negotiable in this zone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Guest Houses Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Types of Guest Houses in Murree
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            "Guest house" covers five distinct products in Murree. Knowing which one you are actually booking prevents most disappointments.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Family-run guest houses
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Converted or purpose-built homes where the owners live on-site or nearby. <strong>Strengths:</strong> hospitality, food, flexibility. <strong>Verify:</strong> heating type and whether your rooms have attached bathrooms.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Whole cottages and huts
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                You rent the entire small building — usually 2–4 bedrooms with a kitchen and lounge. The best value for a single family wanting privacy. <strong>Verify:</strong> bedding count, geyser capacity, and who to call when something breaks.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Government and departmental rest houses
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Forest, C&W, and corporate rest houses in superb locations, bookable mainly through connections or departmental processes. Not a practical option for most travellers, but the reason some hilltops have no commercial properties.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Serviced apartments
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                A newer category near Mall Road and Bhurban: apartment blocks with housekeeping. Good for longer stays; sterile compared to a true guest house.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Private villa estates
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The category's top tier — multiple villas on gated, landscaped grounds with resort-grade amenities, booked privately. In Murree this tier is small; in Bhurban it is effectively defined by one property, covered in the final section.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rates Table Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Guest House Rates in Murree: Real 2026 Prices
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Guest house pricing in Murree is less standardised than hotel pricing — the same property can quote three different rates to three different callers. These ranges reflect what bookings actually close at.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base md:text-lg border-collapse">
              <thead>
                <tr className="bg-[#c9a55b] text-white">
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Off-peak weekday</th>
                  <th className="px-4 py-3 text-left font-medium">Season weekend</th>
                  <th className="px-4 py-3 text-left font-medium">Peak</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#eadfce]">
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">Basic rooms</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 3,000–6,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 6,000–12,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 12,000–20,000</td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">Quality family-run</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 7,000–14,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 14,000–25,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 25,000–40,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">Whole cottages</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 15,000–30,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 30,000–55,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 50,000–90,000</td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">Private villa estates</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 45,000–80,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 70,000–120,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 100,000–180,000+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-white border border-[#eadfce] rounded-lg">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Two behaviours specific to this market:</strong> guest houses discount deeper than hotels in the off-season — a polite negotiation on a midweek two-night stay routinely lands 20 to 30 percent below the opening quote — but they also inflate faster on snowfall weekends, because their inventory is tiny and a single large family can book out the whole property. If your dates touch a peak window, confirm and pay a recorded advance early; "we'll hold it for you" is not a booking.
            </p>
          </div>
        </div>
      </section>

      {/* Eight Checks Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Eight Checks That Protect Your Booking
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            The guest house category has no front desk to complain to and, often, no OTA to arbitrate a dispute. These eight checks — all doable over WhatsApp in ten minutes — filter out nearly every bad property.
          </p>

          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Live photos or a video call</span> — Ask for photos taken today, or a two-minute video walk-through. Properties that refuse are telling you something.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Heating, named</span> — Central, gas, or electric — and whether it runs in the room you booked, all night, at no extra charge. The number one complaint in winter reviews.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Hot water capacity</span> — One geyser serving four bathrooms means cold showers for half the group. Ask how many geysers, and their timings.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Food arrangements</span> — In-house cooking, order-in, or self-catering? If there's a kitchen, confirm it comes with gas, utensils, and a fridge that works.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Bedding count in writing</span> — Guest houses quote per-room but sleep people per-mattress. Confirm exactly how many people the quoted price covers, including children.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Road access and parking</span> — Several excellent properties sit on tracks a sedan cannot climb in rain or snow. Ask what car reaches the gate in current conditions.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Who answers at 11 p.m.</span> — Get the name and number of the person physically responsible on-site during your stay — not just the booking agent.
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">Payment trail</span> — Pay the advance to a bank or business account, keep the confirmation in the chat, and never pay in full before arrival.
            </li>
          </ol>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            How Guest House Booking Actually Works in Murree
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Unlike hotels, most of this market never touches an OTA. Perhaps a fifth of Murree's guest houses list on Booking.com or Airbnb, usually with thin review histories; the rest transact through WhatsApp, Facebook groups, and referral. That changes how you should search.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Facebook groups for Murree travel are the discovery layer — this is where properties post availability and travellers post reviews — but treat them purely as discovery. Move every serious conversation to WhatsApp, run the eight checks above, and build the written record inside the chat. Where a property does list on Airbnb or Booking.com with real reviews, the platform's payment protection is worth a slightly higher rate, especially for peak-date bookings you cannot afford to have collapse.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-white p-6 rounded-lg border border-[#eadfce]">
              <strong>One more habit worth adopting:</strong> search the property's name plus "reviews" and its phone number before paying. Murree's guest house market has a small but persistent fake-listing problem — photos borrowed from other properties, advances taken for houses that don't exist. A property with a website, a consistent name across platforms, and a traceable location on Google Maps is a categorically safer bet.
            </p>
          </div>
        </div>
      </section>

      {/* Families and Groups Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Guest Houses for Families and Large Groups
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Groups are where the guest house category earns its keep — and where its ceiling shows. A whole cottage solves the space problem for one family of six to eight. But Murree's larger gatherings — three generations, two or three families travelling together, a friends' trip of fifteen — outgrow single cottages fast, and the usual fallback of booking two adjacent guest houses splits the group anyway and doubles the coordination.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              At this group size the question stops being "which guest house" and becomes "what can hold all of us, privately, without turning the trip into logistics." In Murree, that question has exactly one complete answer, and it sits in Bhurban.
            </p>
          </div>
        </div>
      </section>

      {/* Himalaya Villas Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The Best "Guest House" in Murree Isn't a Guest House — It's a Private Estate
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Judge the category by its own promise — privacy, space, home-like comfort, food on your schedule, a place that feels like yours — and the property that delivers it most completely in the Murree Hills is Himalaya Villas, a cedar estate of twelve private villas at Mohra Iswal near Kashmiri Bazar, Bhurban.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              What separates it from every guest house in this guide is structural, not cosmetic: the estate hosts one group at a time. A booking doesn't reserve a room or even a villa — it closes the gates. The villas, the café, the bonfire terrace, the BBQ areas, the children's play area, and the private hiking trails all belong to your group alone for the length of the stay, because no other guests are admitted. It is the guest house ideal — a house in the hills that is genuinely yours — executed at the scale of an entire estate.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              It also removes the category's classic risks, the ones the eight-point checklist exists to catch. Heating, hot water, and backup power are built to residential standards across all twelve villas. The kitchen and dining run to your family's timings, not a menu board's. There is a named team on the grounds around the clock, and the booking itself is a single WhatsApp conversation with a confirmed written record — the exact process this guide recommends, run properly.
            </p>
            <div className="bg-white p-6 rounded-lg border border-[#eadfce]">
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                <strong>The comparison to make is arithmetic.</strong> A three-family gathering needs three good cottages at PKR 30,000–55,000 each on a season weekend — PKR 90,000 to 165,000 per night, split across three buildings, three hosts, and three sets of unknowns. The whole of Himalaya Villas, with every family in its own villa on one private estate, prices into the same bracket. Same money; categorically different trip.
              </p>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              If your Murree plan involves a group, an occasion, or simply a strong preference for not sharing the mountain with strangers, check open dates before comparing anything else.
            </p>
          </div>
          
          {/* CTA Block */}
          <div className="mt-8 bg-[#c9a55b] p-6 sm:p-8 rounded-lg text-center">
            <p className="text-white text-sm sm:text-base md:text-lg mb-4">
              <strong>Message Himalaya Villas on WhatsApp</strong> with your dates and group size, and the team will confirm availability, whole-estate rates, and photographs of the villas your family would stay in.
            </p>
            <a 
              href="https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=guest_house_murree" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#8b6914] px-8 py-3 rounded-lg font-medium hover:bg-[#F6F1EA] transition-colors text-sm sm:text-base"
            >
              Check Availability on WhatsApp →
            </a>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-6">
            For a single traveller or a couple on a one-night budget trip, the family-run properties of Jhika Gali remain the right call — this guide's earlier sections will find you a good one.
          </p>
        </div>
      </section>

      {/* FAQ Section - New Clean UI */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-[#1b1b1b]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                How much does a guest house cost in Murree per night?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                In 2026, basic guest house rooms in Murree cost PKR 3,000–6,000 on off-peak weekdays and quality family-run rooms PKR 7,000–14,000. Whole cottages run PKR 15,000–30,000 midweek, rising to PKR 50,000–90,000 on peak dates. Private villa estates in Bhurban start around PKR 45,000 for the whole property.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Which is the best guest house in Murree?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                For the category's core promise — privacy and home-like space — the standard is set by Himalaya Villas in Bhurban, a twelve-villa private estate booked by one group at a time with exclusive use of its grounds and amenities. For budget solo or couple stays, the family-run guest houses of Jhika Gali and Kuldana offer the best value.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Is a guest house better than a hotel in Murree?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                For families and groups, usually yes: guest houses offer more space, flexible food, and lower per-person cost. Hotels win for solo overnight stays near Mall Road, where staffed reception and generators matter more. For large gatherings, a private villa estate outperforms both.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Which area of Murree has the best guest houses?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Jhika Gali, Kuldana, and Lower Topa offer the best balance of quality, parking, and forest views for most budgets. Bhurban holds the premium tier — upscale cottages and private villa estates. Mall Road backstreets trade quality for walkable location, and Angoori Road is cheapest but most variable.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Do guest houses in Murree provide food?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Many family-run guest houses cook to order at reasonable per-head rates, and whole cottages usually include a usable kitchen. Always confirm food arrangements when booking — in-house cooking, order-in, or self-catering — and check that a kitchen comes with working gas, utensils, and a fridge.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                How do I book a guest house in Murree safely?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Ask for live photos or a video call, confirm heating, bedding count, and total price in writing on WhatsApp, pay the advance to a bank or business account, and never pay in full before arrival. Verify the property's name, phone number, and Google Maps location match before sending money.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Are there guest houses in Murree for large families or groups?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Whole cottages sleep one family of six to eight. Larger gatherings — multiple families or fifteen-plus friends — typically outgrow single properties and split across buildings. The whole-estate alternative, such as Himalaya Villas' twelve-villa private estate in Bhurban, keeps the entire group on one private property.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Is a private guest house in Murree available with full privacy?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Whole-cottage rentals offer building-level privacy but share lanes and viewpoints with neighbours. Full privacy — private grounds, trails, and amenities with no other guests — exists at estate level: Himalaya Villas in Bhurban admits one group at a time across its entire twelve-villa property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <Image 
          src="/assets/why-villa-garden.jpg" 
          alt="Plan your Murree guest house stay at Himalaya Villas" 
          fill 
          sizes="100vw" 
          className="object-cover object-center" 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
              Plan Your Perfect
              <br />
              <span className="text-[#c9a55b]">Murree Getaway</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6">
              Whether you're looking for a budget family-run guest house or a private villa estate, 
              start planning your stay today.
            </p>
            <a 
              href="https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=guest_house_murree" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#c9a55b] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#b8944a] transition-colors text-sm sm:text-base"
            >
              Book Now via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}