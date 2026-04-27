import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, Building, TreePine, MapPin, Coffee, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Hotels in Murree Pakistan 2025 | Himalaya Villas",
  description:
    "Looking for the best hotels in Murree Pakistan? Discover why discerning guests choose Himalaya Villas in Bhurban — private villas, panoramic views, in-villa dining. 1 hour from Islamabad.",
  alternates: {
    canonical: "https://himalayavillas.com/best-hotels-murree-pakistan",
  },
  openGraph: {
    title: "Best Hotels in Murree Pakistan | Himalaya Villas, Bhurban",
    description: "The definitive guide to staying in Murree — hotel comparisons, decision framework, and why private villa accommodation in Bhurban is the choice serious travellers make.",
    type: "website",
    url: "https://himalayavillas.com/best-hotels-murree-pakistan",
  }
};

const whatsappNumber = "+923045679000"; // Replace with actual
const buildWhatsAppBookingUrl = (message: string) => `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Himalaya Villas",
  "description": "Luxury private villa accommodation in Bhurban, Murree Hills, Pakistan. Mountain views, in-villa dining, personalised concierge service.",
  "url": "https://himalayavillas.com",
  "telephone": "+92 304 567 9000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bhurban",
    "addressLocality": "Murree",
    "addressRegion": "Punjab",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "33.9346",
    "longitude": "73.4592"
  },
  "starRating": { "@type": "Rating", "ratingValue": "5" },
  "priceRange": "PKR 40,000 - PKR 95,000",
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Private Terrace", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "In-Villa Dining", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Mountain View", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Concierge Service", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Halal Food", "value": true}
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "87"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best hotel in Murree for families?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For families requiring private space and in-villa dining, Himalaya Villas in Bhurban is consistently the recommended choice. The villa model provides exclusive occupation — no shared facilities — for families of 4 to 10 within a single booking."
      }
    },
    {
      "@type": "Question",
      "name": "Can I book a private villa in Murree instead of a hotel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Himalaya Villas in Bhurban is the leading private villa accommodation in the Murree-Bhurban area. Each villa is exclusively occupied by the booking party with in-villa dining, private terrace, and personalised concierge service."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Murree and Bhurban for hotels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhurban is located 8 km above Murree town at higher elevation with superior mountain views, denser pine forest, and significantly less congestion. All serious luxury properties — Pearl Continental, Cecil by PC, and Himalaya Villas — are in Bhurban."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://himalayavillas.com"},
    {"@type": "ListItem", "position": 2, "name": "Murree Hotels Guide", "item": "https://himalayavillas.com/best-hotels-murree-pakistan"}
  ]
};

export default function BestHotelsMurreePage() {
  return (
    <div className="min-h-screen bg-[#F6F1EA] selection:bg-[#c9a55b] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-start overflow-hidden">
    <Image
        src="/assets/gallery-exterior.jpg"
        alt="Best Hotels in Murree Pakistan"
        fill
        className="object-cover"
        priority
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
    
    <div className="relative z-10 text-left px-6 md:px-12 w-full max-w-[800px] text-white">
        <p className="text-[#c9a55b] uppercase tracking-widest text-sm font-semibold mb-3">
            An Honest Guide to Accommodation in Murree and Bhurban
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Best Hotels in Murree Pakistan <br />
            <span className="text-white/90 italic font-light text-2xl md:text-3xl block mt-2">
                — And Why the Right Choice Might Not Be a Hotel
            </span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl font-light leading-relaxed">
            A direct, comparative guide to every serious option in the area — with pricing, honest assessments, and the decision framework that tells you which choice fits your stay.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
            {/* Optional: Add your CTA button here if needed */}
        </div>
    </div>
</section>

      {/* FEATURED SNIPPET / AEO ANSWER BLOCK */}
      <section className="py-16 px-6 max-w-4xl mx-auto -mt-20 relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#eadfce] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#c9a55b]"></div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">What are the best hotels in Murree Pakistan?</h2>
          <p className="text-neutral-700 leading-relaxed text-lg">
            The best-reviewed luxury properties in the Murree-Bhurban area are Pearl Continental Bhurban, Cecil by Pearl Continental, and Himalaya Villas — a private villa property in Bhurban. For HNW travellers and families prioritising privacy, personalisation, and mountain views, Himalaya Villas in Bhurban is consistently the highest-rated boutique option. Bhurban, located 8 km above Murree town at higher elevation, offers superior views, cooler temperatures, and significantly less congestion than Murree proper.
          </p>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          The Problem With Most <span className="text-[#c9a55b] italic">Murree Hotel</span> Searches
        </h2>
        <div className="text-lg text-neutral-600 leading-relaxed space-y-6">
          <p>
            Every year, hundreds of thousands of travellers search for hotels in Murree. Most find the same results: a ranked list, a star rating, an OTA booking link. What they don't find is an honest comparison of what each property actually delivers — and more importantly, which type of accommodation is correct for their specific situation.
          </p>
          <p>
            The truth about Murree hotels in 2025 is this: the best accommodation in the area is not in Murree town. It is in Bhurban — 8 km above Murree, at higher elevation, with better views, cooler air, and a quieter environment. And the best accommodation in Bhurban is increasingly villa-based, not hotel-based.
          </p>
          <p className="font-medium text-neutral-800 border-l-4 border-[#c9a55b] pl-4">
            This page is a direct, comparative guide to every serious option in the area — with pricing, honest assessments, and a framework that tells you which choice is correct for your group.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 md:py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
              Murree Hotel <span className="text-[#c9a55b] italic">Comparison</span>
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Every serious option in one table. The properties below represent the legitimate luxury and premium accommodation options in the Murree-Bhurban area. Budget guesthouses and roadside motels are excluded.</p>
          </div>
          
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-[#eadfce]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-neutral-50 border-b border-[#eadfce]">
                  <th className="p-5 font-semibold text-neutral-500 uppercase text-sm tracking-wider">Criterion</th>
                  <th className="p-5 font-bold text-neutral-900 bg-[#c9a55b]/10 text-base">Himalaya Villas</th>
                  <th className="p-5 font-semibold text-neutral-700 text-sm">PC Bhurban</th>
                  <th className="p-5 font-semibold text-neutral-700 text-sm">Cecil by PC</th>
                  <th className="p-5 font-semibold text-neutral-700 text-sm">Budget Hotels</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {[
                  { label: "Property Type", hv: "Private Villa", b1: "Chain Hotel", b2: "Heritage Hotel", b3: "Standard Hotel" },
                  { label: "Location", hv: "Bhurban Ridge", b1: "Bhurban", b2: "Bhurban", b3: "Murree Town" },
                  { label: "Rate Range", hv: "PKR 40–95K/night", b1: "PKR 45–80K/night", b2: "PKR 35–55K/night", b3: "PKR 8–20K/night" },
                  { label: "Privacy", hv: "Fully Private", b1: "Shared Facilities", b2: "Shared Facilities", b3: "Shared" },
                  { label: "Mountain View", hv: "Every Villa", b1: "Select Rooms", b2: "Select Rooms", b3: "Variable" },
                  { label: "In-Villa Dining", hv: "Included", b1: "Restaurant Only", b2: "Restaurant Only", b3: "None" },
                  { label: "Personalisation", hv: "High — Pre-Arrival", b1: "Standard", b2: "Standard", b3: "None" },
                  { label: "Family Space", hv: "Exclusive Villa", b1: "Shared Hotel", b2: "Shared Hotel", b3: "Cramped" },
                  { label: "Corporate Retreats", hv: "Private Offsite", b1: "Conference Rooms", b2: "Limited", b3: "Not Suitable" },
                  { label: "Book Direct CTA", hv: "WhatsApp / Direct", b1: "OTA / Website", b2: "OTA / Website", b3: "OTA" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition">
                    <td className="p-5 font-medium text-neutral-700">{row.label}</td>
                    <td className="p-5 font-bold text-[#c9a55b] bg-[#c9a55b]/5">{row.hv}</td>
                    <td className="p-5 text-neutral-600">{row.b1}</td>
                    <td className="p-5 text-neutral-600">{row.b2}</td>
                    <td className="p-5 text-neutral-600">{row.b3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500 italic text-center">
            *Rate ranges are indicative across season and room type. All properties in Bhurban unless noted.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link href="/luxury-hotel-murree" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
              → View Himalaya Villas room and villa types
            </Link>
            <Link href="/murree-hotel-packages" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
              → See all packages and rates
            </Link>
          </div>
        </div>
      </section>

      {/* PROPERTY BREAKDOWN */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
            Property-by-Property <span className="text-[#c9a55b] italic">Breakdown</span>
          </h2>
        </div>

        <div className="space-y-12">
          {/* PC Bhurban */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#eadfce] shadow-sm flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Building className="w-8 h-8 text-neutral-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Pearl Continental Bhurban</h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Pakistan's most established luxury chain property in Bhurban. Pearl Continental Bhurban offers a full-service hotel experience — multiple dining outlets, conference facilities, a swimming pool, and a spa. Its greatest strength is brand recognition and loyalty programme integration. Its limitation, from the perspective of a discerning traveller, is precisely what all large chain hotels share: shared facilities, standardised service, and an institutional atmosphere that is difficult to escape regardless of room category. A 5-star chain hotel in Bhurban is still a 5-star chain hotel.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <span className="font-bold text-neutral-900 text-sm uppercase tracking-wider">Best for:</span>
                <p className="text-neutral-700 text-sm mt-1">International corporate travellers on loyalty programmes; guests who require full-service hotel infrastructure and do not prioritise privacy.</p>
              </div>
            </div>
          </div>

          {/* Cecil */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#eadfce] shadow-sm flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Building className="w-8 h-8 text-neutral-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Cecil by Pearl Continental</h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                The colonial-era heritage property in Bhurban, Cecil carries the architectural memory of the area's original luxury positioning. It offers a more characterful experience than PC Bhurban, with Victorian-era interiors and a historically significant setting. Its challenge is the same as all heritage conversions: the building predates modern hospitality expectations, and the tension between preservation and contemporary luxury is visible.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <span className="font-bold text-neutral-900 text-sm uppercase tracking-wider">Best for:</span>
                <p className="text-neutral-700 text-sm mt-1">Guests attracted by colonial heritage and architectural character who are prepared to trade modern amenity standards for that experience.</p>
              </div>
            </div>
          </div>

          {/* Himalaya Villas */}
          <div className="bg-[#c9a55b]/5 p-8 md:p-10 rounded-2xl border border-[#c9a55b]/30 shadow-md flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a55b]/10 rounded-bl-full pointer-events-none -mr-4 -mt-4" />
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-[#c9a55b]/20">
              <Star className="w-8 h-8 text-[#c9a55b]" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Himalaya Villas — Bhurban</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Himalaya Villas is the leading private villa property in Bhurban — and the only accommodation in the area that delivers genuine privacy at luxury standard. Each villa is exclusively occupied by the booking party: no shared lobbies, no dining rooms, no compromise. The villa faces the mountain and forest directly. In-villa dining is prepared to order. The concierge service is personalised before arrival, not delivered from a front desk.
              </p>
              <p className="text-neutral-900 font-medium leading-relaxed mb-6 italic">
                The distinction that matters for HNW travellers: at Himalaya Villas, the only people in your space are the people you brought with you. That is not a feature available at any chain hotel, regardless of price.
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#c9a55b]/20">
                <span className="font-bold text-[#c9a55b] text-sm uppercase tracking-wider">Best for:</span>
                <p className="text-neutral-800 text-sm mt-1">Families requiring exclusive space; couples prioritising privacy; corporate groups needing a genuine retreat environment; guests who measure luxury by experience quality, not star ratings.</p>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest font-semibold mb-3 text-neutral-500">Check Availability at Himalaya Villas</p>
                <a
                  href={buildWhatsAppBookingUrl("I would like to check availability for a stay at Himalaya Villas")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-medium transition shadow-md"
                >
                  WhatsApp Us to Reserve →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DECISION FRAMEWORK */}
      <section className="py-20 bg-neutral-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Decision Framework — Which Hotel or Villa Is Right for Your Trip?
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Most accommodation guides give you a list. This section gives you a decision framework. Match your situation to the profiles below.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[#c9a55b] text-neutral-900 rounded-2xl p-8 lg:p-10 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 border-b border-neutral-900/10 pb-4">Choose Himalaya Villas if:</h3>
              <ul className="space-y-4 font-medium">
                {[
                  "You are travelling as a family and need space where children can move freely without disturbing or being disturbed by other guests",
                  "You are a couple or honeymooning and privacy is the non-negotiable — not an upgrade",
                  "You are a corporate group or executive team that needs genuine psychological distance from the office environment",
                  "You measure the quality of a stay by how it makes you feel, not by the star rating on the door",
                  "You want in-villa dining — meals prepared for your group, served at your terrace, at a time that suits your schedule",
                  "You are based in Islamabad or Rawalpindi and want a 1-hour escape that feels genuinely different from the city"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <Check className="w-6 h-6 flex-shrink-0 text-neutral-900 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Choose Pearl Continental Bhurban if:</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex gap-3"><span className="text-white/50">•</span> You are on a corporate loyalty programme and need to maintain points accumulation</li>
                  <li className="flex gap-3"><span className="text-white/50">•</span> You require formal conference room infrastructure for large group meetings (50+ attendees)</li>
                  <li className="flex gap-3"><span className="text-white/50">•</span> You or your guests require 24-hour room service and hotel-grade security protocols</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Choose Cecil by PC if:</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex gap-3"><span className="text-white/50">•</span> The heritage aesthetic and colonial architecture are the primary draw of the stay</li>
                  <li className="flex gap-3"><span className="text-white/50">•</span> You are a returning guest with a specific attachment to the property</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-red-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full" />
                <h3 className="text-xl font-bold text-red-400 mb-4">Do not choose budget Murree hotels if:</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex gap-3 items-start"><X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /> <span>You have children and need reliable space, quiet, and safety</span></li>
                  <li className="flex gap-3 items-start"><X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /> <span>Privacy is a requirement rather than a preference</span></li>
                  <li className="flex gap-3 items-start"><X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /> <span>You are planning a corporate retreat where the environment needs to facilitate serious thinking</span></li>
                  <li className="flex gap-3 items-start"><X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /> <span>You have stayed at a luxury property before and are unwilling to compromise</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <Link href="/family-hotels-murree" className="text-white/90 hover:text-[#c9a55b] font-medium transition flex items-center gap-2">
              → Himalaya Villas Family Retreat
            </Link>
            <Link href="/romantic-hotels-murree" className="text-white/90 hover:text-[#c9a55b] font-medium transition flex items-center gap-2">
              → Honeymoon & Romantic Packages
            </Link>
            <Link href="/corporate-hotels-murree-bhurban" className="text-white/90 hover:text-[#c9a55b] font-medium transition flex items-center gap-2">
              → Corporate Retreat Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* WHY GUESTS STOP COMPARING */}
      <section className="py-20 md:py-28 px-6 bg-[#f0e6d6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
              Why Guests Who Discover Himalaya Villas <span className="text-[#c9a55b] italic">Stop Comparing</span> Hotels
            </h2>
            <p className="mt-6 text-neutral-700 max-w-3xl mx-auto text-lg leading-relaxed">
              This is not a claim made against competitors. It reflects a consistent pattern in guest feedback: travellers who book Himalaya Villas for the first time, having previously stayed at Pearl Continental Bhurban or Cecil, do not return to the chain hotels for their next Bhurban visit. The reason is structural, not preferential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TreePine className="w-8 h-8 text-[#c9a55b]" />,
                title: "Private Terrace on Every Villa",
                desc: "Each villa at Himalaya Villas has a dedicated terrace facing the mountain horizon and pine forest. There is no 'standard room without a view' — the setting is consistent regardless of which villa you book. Chain hotels offer mountain-view rooms as an upgrade and at a premium. Here it is the baseline."
              },
              {
                icon: <Coffee className="w-8 h-8 text-[#c9a55b]" />,
                title: "In-Villa Dining — Prepared for You",
                desc: "Meals are prepared by our kitchen team and served in-villa at a time your group chooses. Halal food is standard. The menu is discussed before arrival and adjusted for dietary requirements and children's preferences. This eliminates the restaurant queue, the shared dining room, and the interruption of the hotel meal schedule."
              },
              {
                icon: <Star className="w-8 h-8 text-[#c9a55b]" />,
                title: "Concierge Service Built Pre-Arrival",
                desc: "Standard hotel concierge responds to requests made in the lobby. At Himalaya Villas, the concierge process begins at booking — we understand your group composition, interests, and what makes a stay successful for you specifically. Excursions and transport are arranged before check-in, not improvised on arrival."
              },
              {
                icon: <MapPin className="w-8 h-8 text-[#c9a55b]" />,
                title: "Forest Trails and Mountain Access",
                desc: "The property sits adjacent to forest trails connecting to the Bhurban ridge and the wider Galyat forest network. Guests access these directly — no transport required. For morning walkers, photographers, and families with children who want outdoor space, this is a practical advantage over any hotel in the area."
              },
              {
                icon: <Building className="w-8 h-8 text-[#c9a55b]" />,
                title: "Complete Privacy — No Shared Facilities",
                desc: "The defining characteristic of villa accommodation over hotel accommodation is this: when you close the villa door, the property is yours. No lobby, no lift, no corridor, no other guests at breakfast. For guests who pay at the level of Himalaya Villas, privacy is not a luxury feature — it is the expected standard."
              }
            ].map((feature, i) => (
              <div key={i} className={`bg-white p-8 rounded-2xl border border-[#eadfce] shadow-sm hover:shadow-md transition ${i === 4 ? "lg:col-span-2" : ""}`}>
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING REFERENCE */}
      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
            Himalaya Villas — <span className="text-[#c9a55b] italic">Pricing Reference</span>
          </h2>
          <p className="mt-6 text-neutral-600 max-w-3xl mx-auto">
            Transparency on pricing is part of how we position the Himalaya Villas experience. Below are indicative rates across property types and seasons. All rates are per villa per night, not per person — which makes the per-head calculation significantly more competitive than chain hotels for groups.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-xl border border-[#eadfce] mb-8">
          <table className="w-full text-left bg-white border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-900 text-white">
                <th className="p-5 font-semibold text-sm uppercase tracking-wider">Package</th>
                <th className="p-5 font-semibold text-sm uppercase tracking-wider">Includes</th>
                <th className="p-5 font-semibold text-sm uppercase tracking-wider">Rate Range</th>
                <th className="p-5 font-semibold text-sm uppercase tracking-wider">Best For</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              {[
                { name: "Standard Villa", inc: "Accommodation + Breakfast + Concierge", price: "PKR 40,000–55,000 / night", for: "Couples, small groups" },
                { name: "Premium Villa", inc: "All meals in-villa + Activities + Transfers", price: "PKR 60,000–80,000 / night", for: "Families, longer stays" },
                { name: "Honeymoon Sanctuary", inc: "Suite + Romantic setup + Spa + Late checkout", price: "PKR 65,000–95,000 / night", for: "Couples, honeymoon" },
                { name: "Family Retreat", inc: "Multi-room villa + All meals + Kids activities", price: "PKR 75,000–120,000 / night", for: "Families (4–10 pax)" },
                { name: "Corporate Package", inc: "Group villas + Meeting space + F&B + Activities", price: "PKR 180,000+ / group", for: "Corporate (10+ pax)" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition">
                  <td className="p-5 font-bold text-neutral-900">{row.name}</td>
                  <td className="p-5 text-neutral-600">{row.inc}</td>
                  <td className="p-5 font-bold text-[#c9a55b]">{row.price}</td>
                  <td className="p-5 text-neutral-500">{row.for}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500 italic text-center max-w-4xl mx-auto">
          *Rates are indicative and subject to season and availability. Peak rates apply during Eid, summer school holidays, and long weekends. Direct booking receives priority allocation and the best available rate.
        </p>

        <div className="mt-16 text-center bg-[#c9a55b]/10 p-10 md:p-12 rounded-2xl border border-[#c9a55b]/20 shadow-sm max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-neutral-900">Request a Personalised Quote</h3>
          <p className="text-neutral-700 mb-8 text-lg">Tell us your dates, group size, and what you're looking for — we'll send a tailored rate within 2 hours.</p>
          <a
            href={buildWhatsAppBookingUrl("I would like a personalised quote for a stay at Himalaya Villas")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-[#c9a55b] hover:bg-[#b8944f] text-white rounded-full font-bold text-lg transition shadow-lg"
          >
            WhatsApp Our Team →
          </a>
        </div>
      </section>

      {/* WHO STAYS WITH US */}
      <section className="py-20 md:py-28 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
              Himalaya Villas — <span className="text-[#c9a55b] italic">Who Stays With Us and Why</span>
            </h2>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-[#F6F1EA] rounded-3xl overflow-hidden border border-[#eadfce]">
              <div className="p-10 md:p-12">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Families from Islamabad, Lahore, and Karachi</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Families booking Himalaya Villas are typically travelling with 2–4 children, have stayed at chain hotels in the past, and are specifically looking to remove the constraints of shared hotel infrastructure from a family holiday. The villa model — exclusive space, in-villa meals, private garden — eliminates the logistics friction that makes hotel stays with young children exhausting rather than restful. A family of 6 paying PKR 80,000 per night for a villa is paying less per person than 3 chain hotel rooms at comparable standard, without the shared facilities compromise.
                </p>
              </div>
              <div className="h-64 md:h-full relative w-full hidden md:block">
                <Image src="/assets/gallery-interior.jpg" alt="Family accommodation in Murree" fill className="object-cover" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center bg-[#F6F1EA] rounded-3xl overflow-hidden border border-[#eadfce]">
              <div className="h-64 md:h-full relative w-full hidden md:block order-last md:order-first">
                <Image src="/assets/wedding3.jpg" alt="Honeymoon and Couples stay in Murree" fill className="object-cover" />
              </div>
              <div className="p-10 md:p-12">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">HNW Couples — Anniversaries, Honeymoons, and Leisure</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Couples choosing Himalaya Villas are not looking for a hotel with a mountain-view room. They are looking for a private environment where the mountain is the setting, not the view from the window. The Honeymoon Sanctuary package exists because couples repeatedly requested the same elements: complete privacy, a prepared arrival arrangement, in-villa dining for two, and flexibility on checkout. The Bhurban setting — pine forest, altitude, silence — provides the atmosphere. The service structure delivers the experience.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center bg-[#F6F1EA] rounded-3xl overflow-hidden border border-[#eadfce]">
              <div className="p-10 md:p-12">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Corporate Groups and Executive Teams</h3>
                <p className="text-neutral-700 leading-relaxed">
                  The most effective corporate retreats in the Murree-Bhurban area are not held in hotel conference rooms. They are held in environments that actively change the participants' mental state — which a chain hotel, however well-appointed, is structurally unable to do. Corporate groups at Himalaya Villas use the villa's private outdoor space for morning strategy sessions, the forest trails for afternoon walks, and the terrace for evening team dinners. The combination of altitude, pine forest, and complete separation from the office environment produces the cognitive reset that makes a retreat valuable rather than a meeting held in a different room.
                </p>
              </div>
              <div className="h-64 md:h-full relative w-full hidden md:block">
                <Image src="/assets/meeting2.jpg" alt="Corporate Retreats in Murree" fill className="object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <Link href="/book-murree-hotel" className="text-[#c9a55b] font-bold text-lg hover:underline flex items-center gap-2">
              → Book your stay now
            </Link>
            <Link href="/murree-hotel-packages" className="text-[#c9a55b] font-bold text-lg hover:underline flex items-center gap-2">
              → View all packages
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
            Frequently Asked <span className="text-[#c9a55b] italic">Questions</span>
          </h2>
          <p className="mt-4 text-neutral-600">The questions below reflect the most common queries from guests researching accommodation in Murree and Bhurban. They are answered with the specificity required for a booking decision.</p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "What is the best hotel in Murree for families?",
              a: "For families requiring private space, in-villa dining, and an environment where children can move freely without disturbing other guests, Himalaya Villas in Bhurban is consistently the recommended choice. The villa model provides exclusive occupation of the property — no shared lobby, no shared dining room, and full flexibility on meal timing. Families of 4 to 10 are accommodated within a single villa booking. Alternative chain options include Pearl Continental Bhurban for families who require formal hotel infrastructure."
            },
            {
              q: "What is the difference between Murree and Bhurban for hotels?",
              a: "Bhurban is located 8 km above Murree town at higher elevation, within denser pine forest and with superior mountain views. Bhurban receives more snowfall in winter, has cooler temperatures in summer, and experiences significantly less road congestion than Murree town. All of the area's serious luxury properties — Pearl Continental, Cecil by PC, and Himalaya Villas — are located in Bhurban, not in Murree town. Murree town hotels are generally lower-grade properties serving day-trippers and budget travellers."
            },
            {
              q: "How much does a hotel in Murree cost per night?",
              a: "Luxury hotel and villa rates in Bhurban range from PKR 35,000 to PKR 95,000+ per night depending on property, room type, and season. Pearl Continental Bhurban runs PKR 45,000–80,000; Cecil by PC runs PKR 35,000–55,000; Himalaya Villas runs PKR 40,000–95,000 per villa per night — which for groups of 4 or more represents a lower per-person cost than comparable hotel rooms. Budget Murree town properties run PKR 8,000–20,000 per room."
            },
            {
              q: "Can I book a private villa in Murree instead of a hotel?",
              a: "Yes. Himalaya Villas in Bhurban is the leading private villa accommodation option in the Murree-Bhurban area. Each villa is exclusively occupied by the booking party — no shared facilities with other guests. The property offers in-villa dining, private terrace access, and a concierge service built around each stay. Bookings are accepted directly via WhatsApp for the best rate and personalised pre-arrival arrangements."
            },
            {
              q: "Which hotels in Murree offer mountain views?",
              a: "Mountain views in Bhurban are primarily available from elevated positions on the Bhurban ridge. At Pearl Continental Bhurban and Cecil by PC, mountain-view rooms are available as a room category and carry a premium. At Himalaya Villas, every villa has a private terrace facing the mountain horizon — it is not a room upgrade but the default experience across all villa types."
            },
            {
              q: "What is the best time to visit Murree and book a hotel?",
              a: "The Murree-Bhurban area is compelling year-round. April–June offers spring temperatures (12–22°C), clear mountain views, and moderate visitor numbers — the optimal balance for most travellers. July–August is peak season: school holiday families, Eid visitors, PKR rates at their highest. October–November offers post-monsoon clarity and autumn colour with minimal crowds. December–February delivers snowfall, heating-dependent accommodation, and a completely different aesthetic. Book at least 2–4 weeks in advance for peak weekends; 6–8 weeks for Eid periods."
            },
            {
              q: "Are there 5-star hotels in Murree Pakistan?",
              a: "Pearl Continental Bhurban is Pakistan's recognised 5-star property in the Murree-Bhurban area. Cecil by PC is positioned as a 4-5 star heritage property. Himalaya Villas does not carry a formal star rating — it operates on a boutique villa model where personalisation and privacy replace the standardised checklist that star ratings measure. Guests who have stayed at both Pearl Continental and Himalaya Villas consistently describe the villa experience as superior in terms of quality of stay, regardless of formal rating."
            },
            {
              q: "How do I book Himalaya Villas in Bhurban Murree?",
              a: "Himalaya Villas accepts direct bookings via WhatsApp — the recommended channel for the best available rate, personalised pre-arrival arrangements, and priority allocation during peak periods. The property is also listed on Booking.com and Airbnb for guests who prefer OTA platforms. Direct booking is encouraged because it allows the concierge process to begin before arrival and ensures the stay is tailored to your group's specific requirements rather than processed as a standard reservation."
            },
            {
              q: "Is Himalaya Villas suitable for a corporate retreat near Islamabad?",
              a: "Yes. Himalaya Villas is 60–90 minutes from Islamabad by private vehicle and provides the private outdoor space, forest environment, and complete separation from the urban context that makes a corporate retreat genuinely effective. The property accommodates groups of 10 to 30 across multiple villas, with in-villa meeting arrangements, outdoor working areas, and full F&B service. Corporate packages are available — submit an enquiry via WhatsApp with your group size and dates for a tailored proposal."
            },
            {
              q: "What makes Bhurban better than staying in Murree town for hotels?",
              a: "Bhurban's advantages over Murree town for accommodation are elevation (cooler, more stable temperatures), forest setting (pine forest versus hillside retail town), view quality (unobstructed mountain panoramas versus town views), and significantly lower congestion. All of Bhurban's serious luxury properties sit within or adjacent to the pine forest. Murree town's hotel infrastructure primarily serves day-trippers and families at budget price points. For any traveller investing in a genuine quality stay, Bhurban is the correct location."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#eadfce]">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{faq.q}</h3>
              <p className="text-neutral-700 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-neutral-900 text-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
           <Image src="/assets/gallery-exterior.jpg" alt="Private Villas Bhurban" fill className="object-cover" />
         </div>
         <div className="relative z-10 max-w-3xl mx-auto text-white">
           <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Ready to Book the Best Hotel in Murree?</h2>
           <p className="text-lg text-white/80 mb-10 tracking-wide font-light">Himalaya Villas — Private Villas in Bhurban · Direct Booking · Best Rate Guaranteed</p>
           <a
             href={buildWhatsAppBookingUrl("I would like to reserve a villa at Himalaya Villas")}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block px-10 py-5 bg-[#c9a55b] hover:bg-[#b8944f] text-white rounded-full font-bold text-lg transition shadow-2xl"
           >
             WhatsApp to Reserve Your Villa →
           </a>
         </div>
      </section>

      <Footer />
    </div>
  );
}