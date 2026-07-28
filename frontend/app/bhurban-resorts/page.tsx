import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Bhurban Resorts: The Complete 2026 Guide to Every Resort Tier & Rate",
  description:
    "Every resort tier in Bhurban compared — from Pearl Continental to cottage resorts and the ridge's only single-group private estate. Real 2026 rates, honest trade-offs, and how to choose.",
  path: "/bhurban-resorts",
  keywords: [
    "bhurban resorts",
    "resorts in bhurban",
    "best resort in bhurban",
    "bhurban resort murree",
    "luxury resorts bhurban",
    "family resort bhurban",
    "bhurban resorts prices",
    "private resort bhurban",
    "resorts near pc bhurban",
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
      "name": "Which is the best resort in Bhurban?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the trip. For full-service facilities, dining, and events at scale, Pearl Continental Bhurban is the ridge's five-star anchor. For privacy and groups, Himalaya Villas is Bhurban's only single-group private estate — twelve villas and all grounds reserved exclusively for one booking at a time."
      }
    },
    {
      "@type": "Question",
      "name": "How much do Bhurban resorts cost per night in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cottage resorts and lodges run PKR 8,000–18,000 per room on off-peak weekdays, select-service resorts PKR 15,000–25,000, and five-star rooms PKR 30,000–50,000, all rising 60–120 percent on peak dates. Exclusive-use private estate bookings start around PKR 45,000 for the whole property."
      }
    },
    {
      "@type": "Question",
      "name": "Are there private resorts in Bhurban?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — one. Himalaya Villas at Mohra Iswal near Kashmiri Bazar is a gated twelve-villa estate that books to a single group at a time, giving that group exclusive use of every villa, the café, bonfire terrace, BBQ areas, play area, and private hiking trails for the length of the stay."
      }
    },
    {
      "@type": "Question",
      "name": "Is Bhurban better than Murree for a resort stay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For resort stays, yes. Bhurban is quieter, greener, and purpose-built for two- to three-night stays, with the Murree Hills' premium properties concentrated on its ridge. Murree town and Mall Road suit one-night trips centred on the bazaar; Bhurban suits trips centred on the property itself."
      }
    },
    {
      "@type": "Question",
      "name": "Which Bhurban resort is best for a large family or group?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Groups of six or more should compare multi-room hotel bookings against exclusive use of Himalaya Villas' private estate. Four to five rooms at the five-star tier cost PKR 180,000–375,000 per night on season weekends; the whole twelve-villa estate books within and often below that range, with a villa per family."
      }
    },
    {
      "@type": "Question",
      "name": "Can you hold a wedding or private event at a Bhurban resort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pearl Continental Bhurban offers the ridge's largest formal banquet and conference facilities. For private family functions — mehndis, milestone birthdays, reunions — where guests are the entire booking, Himalaya Villas hosts events with exclusive use of the whole estate and no outside guests present."
      }
    },
    {
      "@type": "Question",
      "name": "How far is Bhurban from Islamabad, and is the road good?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhurban is roughly 60–70 km from Islamabad — about two to two and a half hours via the Murree Expressway in normal conditions. The main Bhurban road is paved and drivable year-round; individual resort access tracks vary, so confirm your specific property's approach in rain or snow."
      }
    },
    {
      "@type": "Question",
      "name": "When should I book a Bhurban resort for Eid or summer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Book three to four weeks ahead for five-star and select-service rooms on Eid weeks and summer weekends, and earlier for exclusive-use properties — a single-group estate sells exactly one booking per night, so its peak calendar closes before the room-based resorts fill."
      }
    }
  ]
};

// Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Bhurban Resorts: The Complete 2026 Guide to Choosing the Right One",
  "description": "Every resort tier in Bhurban compared — from Pearl Continental to cottage resorts and the ridge's only single-group private estate. Real 2026 rates, honest trade-offs, and how to choose.",
  "author": {
    "@type": "Person",
    "name": "Himalaya Villas Travel Team"
  },
  "datePublished": "2026-07-28",
  "dateModified": "2026-07-28",
  "publisher": {
    "@type": "Organization",
    "name": "Himalaya Villas"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": absoluteUrl("/bhurban-resorts")
  }
};

export default function BhurbanResortsPage() {
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
          alt="Bhurban Resorts - Mountain views and resort accommodation guide"
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
              Bhurban Resorts:
              <br />
              <span className="text-[#c9a55b]">The Complete 2026 Guide</span>
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-white/90 text-sm sm:text-base md:text-lg tracking-wide max-w-3xl mx-auto">
              Every resort tier compared — from Pearl Continental to cottage resorts
              <br className="hidden sm:block" />
              and the ridge's only single-group private estate
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Bhurban is where the Murree Hills go upmarket. While Mall Road trades in volume — hundreds of hotels stacked along a bazaar — this pine-covered ridge nine kilometres east of Murree town built its reputation on the opposite idea: fewer properties, more ground, and guests who come for two or three nights rather than one. It is the closest thing Pakistan has to a dedicated mountain resort district.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              But "resort" covers three very different products in Bhurban, and travellers who don't know the difference routinely book the wrong one. There is the full-service hotel-resort, built around one large building and a facilities list. There is the cottage-and-lodge tier, selling smaller buildings and lower rates on the same ridge. And there is the newest and rarest model — the private estate resort, where the booking unit is not a room but the entire property.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              This guide profiles all three tiers honestly: what each one is genuinely good at, what it costs in 2026, and which kind of trip each one serves best. By the end, choosing a Bhurban resort should take you ten minutes, not ten browser tabs.
            </p>
          </div>

          {/* Internal Link to Hotel Rooms */}
          <div className="mt-6 pt-6 border-t border-[#eadfce]">
            <p className="text-sm sm:text-base text-neutral-700">
              <span className="font-medium">Compare with:</span>{" "}
              <Link href="/hotel-rooms-in-murree" className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                Hotel rooms in Murree
              </Link>
              {" "}— see how Bhurban compares to other accommodation options in the region.
            </p>
          </div>
        </div>
      </section>

      {/* The Three Kinds Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The Three Kinds of Resort in Bhurban
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Before comparing properties, fix the categories. Every resort on this ridge fits one of three models, and the model predicts the experience far better than the star rating does.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Full-service hotel-resort
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                One large building, hundreds of rooms, and everything under its roof: restaurants, banquet halls, a spa, conference space. You share all of it with every other guest in the building. <span className="font-medium">Best at:</span> facilities, weddings, corporate events, and single-room stays where service depth matters.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Cottage and lodge resorts
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Clusters of smaller buildings — huts, lodges, suites — with a restaurant and grounds. Rates run well below the five-star tier for the same views. <span className="font-medium">Best at:</span> value on the ridge, short family stays. <span className="font-medium">Watch for:</span> wide quality variance and thin off-season staffing.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Private estate resort
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The whole property — villas, grounds, and amenities — is the booking unit, reserved for one group at a time. There is exactly one operating example of this model in Bhurban, covered in the final section. <span className="font-medium">Best at:</span> gatherings, occasions, and total privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resort Landscape Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Bhurban's Resort Landscape, Tier by Tier
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Pearl Continental Bhurban — The Five-Star Anchor
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Any honest guide to Bhurban resorts starts here. Pearl Continental Bhurban is the property that made the ridge a destination: 194 rooms above the Kashmir Valley, multiple restaurants, banquet and conference facilities, an amphitheatre, and the deepest service infrastructure in the Murree Hills. For a couple wanting a polished five-star weekend, or a company staging a large retreat, it remains the reference point — and its weekend availability sells out accordingly.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-3">
                Its trade-offs are the trade-offs of scale. A 194-room hotel is a busy small town in season: dining rooms fill, corridors carry wedding traffic, and the grounds — however handsome — are shared with several hundred other guests. Rates for standard and deluxe rooms sit in the premium bracket year-round, and suites climb well beyond it on peak dates. You are paying for the machine, and the machine is excellent; just know that privacy is not what it sells.
              </p>

              {/* Internal Link */}
              <div className="mt-4">
                <Link href="/pc-hotel-bhurban-alternative" className="text-sm sm:text-base text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                  Alternative to PC Bhurban →
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Hotel One Bhurban and the Select-Service Tier
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                A rung below the five-star anchor sits the select-service tier, led by Hotel One Bhurban — a collection of gable-roofed hill huts under the same parent group as Pearl Continental, trading the full facilities list for materially lower rates on the same ridge. Properties in this tier suit travellers who want a reliable brand, clean rooms, and Bhurban's climate without paying for banquet halls they'll never enter. Ramada's Lower Topa resort, a short drive away, competes for the same guest.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Cottage Resorts, Lodges and Suites
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The broadest tier on the ridge: family resorts, lodges, Swiss-style cottages, and suite-apartment properties scattered along the Bhurban road and the lanes around Kashmiri Bazar. The best of them offer balconies over the valley, home-style food, and family rooms at half the five-star rate. The worst share nothing with the best except the postcode. This is the tier where reviews and pre-payment verification matter most: read the most recent month of reviews, confirm road access for your car, and treat any request for full payment in advance as a reason to keep looking. Pay recorded advances only, and only after the checks in this guide's booking section.
              </p>

              {/* Internal Link */}
              <div className="mt-4">
                <Link href="/guest-house-murree" className="text-sm sm:text-base text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                  Guest house Murree →
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Private Estate Resorts
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The newest tier, and in Bhurban it currently has a single occupant: Himalaya Villas at Mohra Iswal, near Kashmiri Bazar — a gated cedar estate of twelve villas that books to one group at a time. It belongs in this landscape survey as a category of its own, because nothing else on the ridge — at any price — offers exclusive use of an entire resort property. The final section of this guide covers when that model is worth it and when it isn't.
              </p>

              {/* Internal Link */}
              <div className="mt-4">
                <Link href="/luxury-hotels-in-murree" className="text-sm sm:text-base text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
                  Luxury hotels in Murree →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rates Table Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Bhurban Resort Prices: What Each Tier Costs in 2026
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Bhurban pricing is steadier than Mall Road's — properties here depend less on walk-in panic buying — but the calendar still moves rates hard. Ranges below reflect actual booked rates across the tiers.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base md:text-lg border-collapse">
              <thead>
                <tr className="bg-[#c9a55b] text-white">
                  <th className="px-4 py-3 text-left font-medium">Tier</th>
                  <th className="px-4 py-3 text-left font-medium">Off-peak weekday</th>
                  <th className="px-4 py-3 text-left font-medium">Season weekend</th>
                  <th className="px-4 py-3 text-left font-medium">Peak (Eid / snowfall / summer holidays)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#eadfce]">
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">Five-star hotel-resort — standard/deluxe rooms</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 30,000–50,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 45,000–75,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 65,000–110,000+</td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">Select-service resorts (Hotel One tier)</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 15,000–25,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 22,000–38,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 35,000–60,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">Cottage resorts, lodges &amp; suites</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 8,000–18,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 15,000–30,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 28,000–50,000</td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">Private estate — exclusive use, entire property</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 45,000–80,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 70,000–120,000</td>
                  <td className="px-4 py-3 text-neutral-700">PKR 100,000–180,000+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-[#F6F1EA] border border-[#eadfce] rounded-lg">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Read the last row carefully, because it changes the comparison everyone gets wrong.</strong> Estate pricing is for the whole property, not per room. A group taking four or five rooms at the five-star tier on a season weekend is committing PKR 180,000 to 375,000 per night for rooms in a shared building; the same budget books an entire private estate with a villa per family. Per person, the exclusive-use model in Bhurban frequently costs less than the five-star model — a fact its category name, "luxury," tends to hide.
            </p>
          </div>
        </div>
      </section>

      {/* Which Resort Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Which Bhurban Resort for Which Trip
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Match the model to the trip and the decision mostly makes itself.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                A couple's weekend
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The five-star anchor for polish and dining, or a top cottage resort with a valley-facing balcony for half the price. Book the view category explicitly — non-view rooms exist at every tier.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                A corporate retreat or conference
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The five-star tier, without hesitation — this is what its conference and banquet infrastructure exists for. Book midweek for rates and availability. For leadership offsites of 10–25 people wanting privacy over facilities, the estate model is the stronger fit.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                One family, two nights
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Select-service or a well-reviewed cottage resort. Confirm the family-room bed count in writing and ask for the actual room's window photo.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                A wedding or large event
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Five-star banquet facilities remain unmatched on the ridge for formal events at scale. For mehndis, dholkis, and private family functions where the guest list is the whole booking, the estate model hosts the event without an audience.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Multiple families or a large group
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                This is the estate model's home ground: one booking, a villa per family, shared grounds no stranger enters. The rate table above explains why it usually wins on cost as well as experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Booking a Bhurban Resort: Channels and Cautions
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The five-star and select-service tiers book cleanly through their own websites and the major OTAs, with published rates and refund policies — nothing complicated. The cottage tier is where care pays. Many of its properties transact by phone and WhatsApp with an advance transfer, and Bhurban's review pages carry recurring complaints from travellers who paid large advances against verbal promises.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The protective habits are the same ones that work across Murree: recent photos or a video call, total price with taxes in writing, bed count confirmed, advance paid to a traceable business account, and never full payment before arrival.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              <strong>One Bhurban-specific check:</strong> access roads. Several properties sit below or above the main road on steep private tracks that a loaded sedan struggles with in rain and cannot climb in snow. Ask directly what vehicle reaches the property gate in the conditions you're travelling in — and if the answer is vague, the property is telling you to bring a 4x4 or book elsewhere.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              For peak dates — both Eids, summer weekends, and any forecast snowfall — book the five-star tier three to four weeks out and the estate tier earlier still: single-group properties have exactly one booking to sell per night, and their peak calendar closes first.
            </p>
          </div>
        </div>
      </section>

      {/* The Best Resort for Privacy Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The Best Resort in Bhurban for Privacy: The Case for the Estate Model
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Every property in this guide shares one assumption: that you will share the resort. The dining room, the grounds, the viewpoints, the bonfire — all of it is common space, and the price of the facilities list is the crowd using it. For most solo trips and couples' weekends, that trade is fine. But Bhurban's most common booking is not a solo trip — it is a family, or several, travelling together for something that matters. And for that booking, the shared-resort model is the wrong tool, however many stars it carries.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Himalaya Villas is the ridge's answer to that problem, and it is currently the only one. The estate — twelve private cedar villas at Mohra Iswal near Kashmiri Bazar, minutes from the five-star anchor — operates on a rule no hotel-resort can adopt: one group at a time, the whole property or nothing. When your booking is confirmed, the villas, café, bonfire terrace, BBQ pavilions, children's play area, and private hiking trails close to everyone else. There is no other guest to meet on the trail, no stranger at the next table, no wedding party in the corridor — because there is no corridor, and no other party.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              What makes it the best resort in Bhurban for its purpose is not the amenity list — the five-star anchor's list is longer — but the fact that every amenity it has is exclusively yours. A bonfire terrace shared with two hundred guests and a bonfire terrace reserved for your family are different products entirely, and only one of them exists anywhere else on this ridge. The same logic runs through the practical layer: residential-grade heating and hot water in every villa, food timed to your family rather than a buffet schedule, and a booking process that is one WhatsApp conversation with a written record.
            </p>
            <div className="bg-white p-6 rounded-lg border border-[#eadfce]">
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                <strong>The honest boundary:</strong> it is built for groups. A couple wanting a one-night stay with room service and a spa should book the five-star anchor and will be happier for it. But if your Bhurban trip involves six people or more — a family gathering, a friends' reunion, a private celebration, a leadership offsite — run the arithmetic from the rate table before booking rooms in a shared building. Then message Himalaya Villas on WhatsApp at +92 304 567 9000 with your dates and group size; the team replies with open villa-weeks, whole-estate rates, and photographs of the exact villas your group would occupy.
              </p>
            </div>
          </div>

          {/* CTA Block */}
          <div className="mt-8 bg-[#c9a55b] p-6 sm:p-8 rounded-lg text-center">
            <p className="text-white text-sm sm:text-base md:text-lg mb-4">
              <strong>Message Himalaya Villas on WhatsApp</strong> with your dates and group size, and the team will confirm availability, whole-estate rates, and photographs of the villas your group would stay in.
            </p>
            <a
              href="https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=bhurban_resorts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#8b6914] px-8 py-3 rounded-lg font-medium hover:bg-[#F6F1EA] transition-colors text-sm sm:text-base"
            >
              Check Availability on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean UI */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-[#1b1b1b]">
              Frequently Asked Questions About Bhurban Resorts
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Which is the best resort in Bhurban?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                It depends on the trip. For full-service facilities, dining, and events at scale, Pearl Continental Bhurban is the ridge's five-star anchor. For privacy and groups, Himalaya Villas is Bhurban's only single-group private estate — twelve villas and all grounds reserved exclusively for one booking at a time.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                How much do Bhurban resorts cost per night in 2026?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Cottage resorts and lodges run PKR 8,000–18,000 per room on off-peak weekdays, select-service resorts PKR 15,000–25,000, and five-star rooms PKR 30,000–50,000, all rising 60–120 percent on peak dates. Exclusive-use private estate bookings start around PKR 45,000 for the whole property.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Are there private resorts in Bhurban?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Yes — one. Himalaya Villas at Mohra Iswal near Kashmiri Bazar is a gated twelve-villa estate that books to a single group at a time, giving that group exclusive use of every villa, the café, bonfire terrace, BBQ areas, play area, and private hiking trails for the length of the stay.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Is Bhurban better than Murree for a resort stay?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                For resort stays, yes. Bhurban is quieter, greener, and purpose-built for two- to three-night stays, with the Murree Hills' premium properties concentrated on its ridge. Murree town and Mall Road suit one-night trips centred on the bazaar; Bhurban suits trips centred on the property itself.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Which Bhurban resort is best for a large family or group?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Groups of six or more should compare multi-room hotel bookings against exclusive use of Himalaya Villas' private estate. Four to five rooms at the five-star tier cost PKR 180,000–375,000 per night on season weekends; the whole twelve-villa estate books within and often below that range, with a villa per family.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Can you hold a wedding or private event at a Bhurban resort?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Pearl Continental Bhurban offers the ridge's largest formal banquet and conference facilities. For private family functions — mehndis, milestone birthdays, reunions — where guests are the entire booking, Himalaya Villas hosts events with exclusive use of the whole estate and no outside guests present.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                How far is Bhurban from Islamabad, and is the road good?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Bhurban is roughly 60–70 km from Islamabad — about two to two and a half hours via the Murree Expressway in normal conditions. The main Bhurban road is paved and drivable year-round; individual resort access tracks vary, so confirm your specific property's approach in rain or snow.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                When should I book a Bhurban resort for Eid or summer?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Book three to four weeks ahead for five-star and select-service rooms on Eid weeks and summer weekends, and earlier for exclusive-use properties — a single-group estate sells exactly one booking per night, so its peak calendar closes before the room-based resorts fill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <Image
          src="/assets/why-villa-garden.jpg"
          alt="Plan your Bhurban resort stay at Himalaya Villas"
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
              <span className="text-[#c9a55b]">Bhurban Resort Stay</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6">
              Whether you're looking for a five-star hotel, a cosy cottage,
              or a private villa estate for your group, start planning today.
            </p>
            <a
              href="https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=bhurban_resorts"
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