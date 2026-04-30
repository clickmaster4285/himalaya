import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Simple schema data
const lodgingBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "Hotel"],
  "name": "Himalaya Villas",
  "description": "Luxury private villas and rest house in Bhurban, Murree Hills, Pakistan.",
  "url": "https://himalayavillas.com/himalaya-villas-bhurban-murree-rest-house",
  "telephone": "+92-304-567-9000",
  "priceRange": "PKR 40,000 - PKR 180,000",
  "address": { 
    "@type": "PostalAddress", 
    "addressLocality": "Bhurban", 
    "addressRegion": "Murree Hills", 
    "addressCountry": "PK" 
  },
  "geo": { 
    "@type": "GeoCoordinates", 
    "latitude": "33.9487", 
    "longitude": "73.4739" 
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Private Villa", "value": true }, 
    { "@type": "LocationFeatureSpecification", "name": "Halal Food", "value": true }, 
    { "@type": "LocationFeatureSpecification", "name": "Mountain Views", "value": true }
  ],
  "checkinTime": "15:00", 
  "checkoutTime": "12:00"
};

export const metadata: Metadata = {
  title: "Himalaya Villas Bhurban Murree | Luxury Rest House & Private Villas | Book Direct",
  description: "Himalaya Villas is Bhurban Murree's premier luxury rest house - private mountain villas with panoramic Himalayan views, butler service & premium dining. 45 min from Islamabad. WhatsApp to book.",
  keywords: "Himalaya Villas Bhurban Murree Rest House, luxury villas Bhurban, private villa Murree, rest house near Islamabad, luxury accommodation Bhurban, mountain villa Pakistan, premium rest house Murree Hills, villa rental Bhurban, family villa Murree, corporate retreat Bhurban",
  openGraph: {
    title: "Himalaya Villas Bhurban - Pakistan's Premier Luxury Mountain Rest House",
    description: "Private luxury villas in Bhurban, Murree Hills. Escape the city. Book direct for the best rate.",
    type: "website",
    url: "https://himalayavillas.com/himalaya-villas-bhurban-murree-rest-house",
    images: [
      {
        url: "https://himalayavillas.com/assets/gallery-exterior.jpg",
        alt: "Himalaya Villas Bhurban - luxury rest house with panoramic Murree Hills mountain views",
      },
    ],
  },
  alternates: {
    canonical: "https://himalayavillas.com/himalaya-villas-bhurban-murree-rest-house",
  },
};

export default function HimalayaVillasBhurbanMurreeRestHouse() {
  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      {/* Schema Markup */}
      <Script
        id="lodging-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#1b261b] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Himalaya Villas Bhurban Murree - Pakistan's Premier Luxury Rest House
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#c9a55b] font-semibold">
            Private Mountain Villas | Bhurban, Murree Hills | 45 Minutes from Islamabad
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto leading-relaxed">
            Himalaya Villas is a private luxury villa compound set within the pine-covered heights of Bhurban, Murree Hills - designed for guests who expect exclusivity, privacy, and elevated experiences.
          </p>
          
          {/* CTA Box */}
          <div className="bg-[#c9a55b] text-[#1b261b] p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Check Availability</h3>
            <p className="text-lg mb-6">Most weekends are fully reserved 2-3 weeks in advance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://wa.me/923045679000" 
                className="bg-[#1b261b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a342a] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +92-304-567-9000
              </a>
              <span className="text-lg">| Instant Response</span>
            </div>
            <p className="mt-4">Or visit: <a href="/contact" className="underline hover:no-underline">himalayavillas.com/contact</a></p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Why Choose Himalaya Villas?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Complete Privacy</h3>
              <p className="text-gray-700">Private villa exclusivity - no shared spaces with other guests</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Halal Certified</h3>
              <p className="text-gray-700">100% Halal kitchen - all meals, all times</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Modern Amenities</h3>
              <p className="text-gray-700">High-speed WiFi, AC, heating, fireplace</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Year-Round Access</h3>
              <p className="text-gray-700">All seasons including winter with snow views</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Property Overview
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Himalaya Villas is a premium luxury villa property located in Bhurban, Murree Hills, Pakistan - at an elevation that delivers cool mountain air, unobstructed Himalayan views, and natural pine forest surroundings year-round.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Location Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Bhurban, Murree Hills, Khyber Pakhtunkhwa, Pakistan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Elevation: 6,500+ feet above sea level</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Setting: Pine forest, Himalayan foothills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Best Seasons: Spring, Summer, Autumn, Winter</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Property Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Property Type: Luxury Private Villas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Check-In: 3:00 PM | Check-Out: 12:00 PM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Minimum Stay: 2 nights (peak season)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  <span>Food Policy: 100% Halal certified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Features & Amenities */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Villa Features & Amenities
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Every feature at Himalaya Villas has been selected to provide world-class mountain retreat experiences.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#c9a55b] mb-6">Accommodation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Private luxury villas with dedicated entrance
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Floor-to-ceiling mountain view windows
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Premium beds with luxury linen
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Modern kitchen in self-catering villas
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Fireplace and central heating
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-[#c9a55b] mb-6">Dining</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  In-villa private dining service
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Pakistani & Continental menus
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Private BBQ terrace with mountain views
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Fresh breakfast & afternoon tea
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  100% Halal certified kitchen
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-[#c9a55b] mb-6">Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Dedicated villa host service
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  24-hour concierge assistance
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Guided mountain walks & trails
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Private bonfire evenings
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a55b] mr-2">-</span>
                  Airport transfers available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Packages & Rates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Family Mountain Escape</h3>
              <p className="text-gray-700 mb-4">Families (4-8 guests) | 2-3 nights</p>
              <p className="text-2xl font-bold text-[#1b261b] mb-4">PKR 80,000-150,000/stay</p>
              <p className="text-gray-600 text-sm">Breakfast & dinner | Villa host | Kids' activities</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Honeymoon Sanctuary</h3>
              <p className="text-gray-700 mb-4">Couples | 2 nights</p>
              <p className="text-2xl font-bold text-[#1b261b] mb-4">PKR 65,000-95,000/stay</p>
              <p className="text-gray-600 text-sm">Suite with views | Romantic dinner | Bonfire</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Corporate Retreat</h3>
              <p className="text-gray-700 mb-4">Teams (10-50 guests) | 2 nights+</p>
              <p className="text-2xl font-bold text-[#1b261b] mb-4">PKR 180,000+ (10 pax)</p>
              <p className="text-gray-600 text-sm">Conference room | All meals | Team activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">How far is Himalaya Villas from Islamabad?</h3>
              <p className="text-gray-700">Approximately 45-60 minutes by road from central Islamabad via M-1 Motorway and Murree road.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">Is the food fully Halal?</h3>
              <p className="text-gray-700">Yes. All food preparation at Himalaya Villas is 100% Halal across all dining services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">Can you accommodate corporate retreats?</h3>
              <p className="text-gray-700">Yes. We offer conference setup, AV equipment, group dining, and confidential private surroundings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Access */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Location & Access
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Bhurban is located in the Murree Hills at approximately 6,500 feet above sea level - high enough for cool summer temperatures and reliable winter snowfall.
          </p>
          
          <h3 className="text-2xl font-bold text-[#1b261b] mb-6">Driving Distances</h3>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1b261b] text-white">
                  <th className="p-4 text-left">From</th>
                  <th className="p-4 text-left">Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Islamabad (F-6)</td>
                  <td className="p-4 text-gray-700">45-60 minutes</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">Rawalpindi (Saddar)</td>
                  <td className="p-4 text-gray-700">40-50 minutes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Lahore (Gulberg)</td>
                  <td className="p-4 text-gray-700">4-4.5 hours</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">Islamabad Airport</td>
                  <td className="p-4 text-gray-700">55-70 minutes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold">Abbottabad</td>
                  <td className="p-4 text-gray-700">2.5-3 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-6 bg-[#c9a55b] text-[#1b261b] rounded-lg">
            <p className="font-semibold mb-2">Travel Tips:</p>
            <p className="mb-2">Early departure recommended on Saturdays (before 8:00 AM)</p>
            <p>Real-time traffic guidance available via WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Guest Profiles */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Who Stays at Himalaya Villas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Affluent Families</h3>
              <p className="text-gray-700 mb-4">From Islamabad, Rawalpindi, and Lahore seeking safe, luxurious mountain retreats for school holidays and weekends.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Safe environment for children</li>
                <li>Spacious private villas</li>
                <li>Family-friendly activities</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Corporate Teams</h3>
              <p className="text-gray-700 mb-4">HR directors and CEOs using Himalaya Villas for annual offsites, strategy retreats, and leadership meetings.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Conference facilities</li>
                <li>Confidential environment</li>
                <li>Team building activities</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">HNW Couples</h3>
              <p className="text-gray-700 mb-4">High-net-worth couples and honeymooners valuing privacy and exclusive romantic mountain settings.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Private suites with views</li>
                <li>Romantic dining experiences</li>
                <li>Bonfire evenings</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Diaspora Visitors</h3>
              <p className="text-gray-700 mb-4">Families from UAE, UK, and Saudi Arabia including Bhurban in their Pakistan travel itinerary.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Premium mountain experience</li>
                <li>Cultural familiarity</li>
                <li>Group accommodations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-[#1b261b] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#c9a55b]">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg mb-8">Tell us your dates, group size, and occasion - we'll confirm availability instantly.</p>
          <div className="bg-[#c9a55b] text-[#1b261b] p-8 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Instant WhatsApp Response</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://wa.me/923045679000" 
                className="bg-[#1b261b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a342a] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Now
              </a>
              <a 
                href="/contact" 
                className="bg-white text-[#1b261b] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
