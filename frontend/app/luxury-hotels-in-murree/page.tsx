"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Star, Plus, Minus, Check, MapPin } from "lucide-react";

const luxuryHotelsSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Himalaya Villas - Luxury Hotels in Murree",
  "description": "Premium private villa accommodation in Bhurban, Murree Hills. Luxury alternative to hotels with private villas, panoramic Himalayan views, in-villa spa treatments, and personalized service.",
  "url": "https://himalayavillas.com/luxury-hotels-in-muree",
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
    {"@type": "LocationFeatureSpecification", "name": "Private Villa", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "In-Villa Spa", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Panoramic Himalayan Views", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Private Chef", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "24/7 Concierge", "value": true}
  ],
  "servesCuisine": ["Pakistani", "Continental", "Halal"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book Himalaya Villas directly for the best rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contact us via WhatsApp with your preferred dates, number of guests, and requirements. Our team responds within 15 minutes during business hours (9 AM – 10 PM). Direct bookings receive best rate guarantee and complimentary inclusions."
      }
    },
    {
      "@type": "Question", 
      "name": "What makes Himalaya Villas different from other luxury hotels in Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer private villa estates instead of hotel rooms, complete privacy with no shared corridors, in-villa personalized spa treatments, private gourmet dining, and dedicated villa attendants throughout your stay."
      }
    },
    {
      "@type": "Question",
      "name": "Are meals included at Himalaya Villas?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "All packages include daily halal gourmet breakfast. Most packages include additional meals like private dinners. In-villa dining service is available 24/7 with personalized chef service."
      }
    }
  ]
};

export default function LuxuryHotelsMurreePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);

  const toggleFaq = (index: string) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2 Adults",
    occasion: "Any",
    name: "",
    phone: "",
    email: ""
  });

  const whatsappNumber = "+923045679000";

  return (
    <div className="min-h-screen bg-[#fcfbf8] flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(luxuryHotelsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative w-full bg-[#1b261b] px-6 py-16 md:py-24 overflow-hidden">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Side: Text Content */}
            <div className="max-w-xl text-left">
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
                <span>BHURBAN · MURREE HILLS · 5-STAR PRIVATE ESTATE</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] text-white leading-[1.05] tracking-tight">
                Luxury Hotels <br />
                in Murree <span className="text-[#c9a55b]">—</span><br />
                <span className="italic text-[#c9a55b] font-light">Redefined.</span>
              </h1>

              <p className="mt-8 text-[14px] md:text-[15px] text-[#869986] leading-relaxed font-light">
                When Pakistan's most discerning travellers search for luxury hotels in Murree, they end up here. Not a hotel — a private estate. Twelve villas, Himalayan panoramas, spa treatments, fine dining, adventure activities, and a team that exists solely to serve you. Sixty kilometres from Islamabad. A world apart from everything else.
              </p>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                <div>
                  <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1 flex items-center">4.8<span className="text-xl ml-1 text-[#c9a55b]">★</span></p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">AVERAGE RATING</p>
                </div>
                <div>
                  <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1">127+</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">VERIFIED REVIEWS</p>
                </div>
                <div>
                  <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1">#1</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">BHURBAN LUXURY</p>
                </div>
                <div>
                  <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1">12</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">PRIVATE VILLAS</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  className="bg-[#c9a55b] text-[#1b261b] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors inline-flex items-center gap-2"
                >
                  <span>▶</span> CHECK AVAILABILITY
                </button>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white/20 text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:border-white transition-colors"
                >
                  WHATSAPP ENQUIRY
                </a>
              </div>
            </div>

            {/* Right Side: Floating Booking Form */}
            <div className="bg-[#fcfbf8] p-8 lg:p-10 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="text-left mb-8">
                <h2 className="font-display text-[32px] text-[#1b261b] leading-tight">Check Availability</h2>
                <div className="flex items-center gap-2 text-[9px] text-[#8b8878] uppercase tracking-widest font-semibold mt-3">
                  <span>BEST RATE GUARANTEED</span>
                  <span>·</span>
                  <span>DIRECT BOOKING</span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                      CHECK-OUT
                    </label>
                    <input
                      type="date"
                      className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                      GUESTS
                    </label>
                    <div className="relative">
                      <select className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-600">
                        <option>2 Adults</option>
                        <option>1 Adult</option>
                        <option>3 Adults</option>
                        <option>4 Adults</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                      OCCASION
                    </label>
                    <div className="relative">
                      <select className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-600">
                        <option>Any</option>
                        <option>Honeymoon</option>
                        <option>Anniversary</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                      PHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 304 567 9000"
                      className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="Optional"
                      className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1b261b] text-white h-12 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    CHECK AVAILABILITY & RATES
                  </button>
                </div>

                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e5e1d8]"></div>
                  </div>
                  <div className="relative bg-[#fcfbf8] px-4 text-[9px] text-[#8b8878] tracking-widest uppercase">
                    or contact directly
                  </div>
                </div>

                <div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#40C351] text-white h-12 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#38b047] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WHATSAPP — REPLY IN 15 MIN
                  </a>
                  <p className="text-center text-[9px] text-[#8b8878] mt-3 tracking-wide">
                    Best rate guaranteed on direct booking<br />
                    Free cancellation 7+ days prior · No OTA fees
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-20 md:py-32 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-5xl text-[#c9a55b] italic">What You Are Actually Choosing Between</h2>
              <p className="mt-6 text-[#8b8878] max-w-3xl text-[15px] leading-relaxed">
                Not all luxury hotels in Murree deliver the same experience. Here is an honest comparison across the key factors that matter most to discerning guests.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-5 w-[25%]"></th>
                    <th className="p-5 font-bold text-[#c9a55b] bg-[#1b261b] text-xs tracking-widest uppercase w-[25%]">HIMALAYA VILLAS</th>
                    <th className="p-5 font-bold text-[#1b261b] text-xs tracking-widest uppercase w-[25%] border-b border-[#e5e1d8]">PC BHURBAN / CECIL</th>
                    <th className="p-5 font-bold text-[#1b261b] text-xs tracking-widest uppercase w-[25%] border-b border-[#e5e1d8]">OTHER MURREE HOTELS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] md:text-[14px]">
                  {[
                    { label: "Property Type", hv: "✓ Private villa estate", b1: "Large chain hotel", b2: "Standard hotel" },
                    { label: "Privacy", hv: "✓ Fully private — no shared corridors", b1: "Shared floors & common areas", b2: "Shared throughout" },
                    { label: "Spa & Wellness", hv: "✓ In-villa personalized spa treatments", b1: "Shared spa facility", b2: "Limited or none" },
                    { label: "Fine Dining", hv: "✓ Private in-villa gourmet dining & personalised chef", b1: "Shared restaurant", b2: "Standard dining" },
                    { label: "All-Inclusive Option", hv: "✓ Full all-inclusive packages available", b1: "Room-only or B&B", b2: "Rarely available" },
                    { label: "Family Amenities", hv: "✓ Children hamper, bonfire, trails, nannies on request", b1: "Standard kids facilities", b2: "Minimal" },
                    { label: "Honeymoon Package", hv: "✓ Private suite + candlelit dinner + spa for two", b1: "Available on request", b2: "Rarely available" },
                    { label: "Adventure Activities", hv: "✓ Guided treks, forest walks, cultural excursions", b1: "Limited in-house", b2: "None" },
                    { label: "Airport Transfer", hv: "✓ Private transfer from ISBA, Islamabad, Rawalpindi", b1: "Available via front desk", b2: "Rarely offered" },
                    { label: "Halal Certified", hv: "✓ 100% halal — all meals", b1: "Halal options available", b2: "Varies" },
                    { label: "Eco Practices", hv: "✓ Solar heating, no-plastic policy, local sourcing", b1: "Limited", b2: "Minimal" },
                    { label: "24-Hour Room Service", hv: "✓ In-villa round-the-clock service", b1: "Standard room service", b2: "Limited hours" },
                    { label: "Avg Guest Rating", hv: "✓ 4.8 / 5 (127 reviews)", b1: "4.2 - 4.5 / 5", b2: "3.5 - 4.2 / 5" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#e5e1d8] last:border-0 hover:bg-[#fcfbf8] transition">
                      <td className="p-5 font-semibold text-[#8b8878]">{row.label}</td>
                      <td className="p-5 font-medium text-[#1b261b] bg-[#fcfbf8]">{row.hv}</td>
                      <td className="p-5 text-[#8b8878]">{row.b1}</td>
                      <td className="p-5 text-[#8b8878]">{row.b2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* THE STANDARD THAT SETS US APART */}
        <section className="py-20 md:py-32 bg-[#fcfbf8] px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 text-[#8b8878] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#8b8878]"></span>
                <span>WHAT EVERY VILLA INCLUDES</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1b261b]">
                The Standard That Sets <br />
                <span className="text-[#c9a55b] italic">Himalaya Villas Apart</span>
              </h2>
              <p className="mt-6 text-[#8b8878] max-w-3xl text-[15px] leading-relaxed">
                Every villa is fully equipped and individually serviced. No room tiers. No upgrades required. These are baseline inclusions every guest receives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white border border-[#e5e1d8]">
              {[
                {
                  icon: "○",
                  title: "PANORAMIC HIMALAYAN VIEWS",
                  desc: "Unobstructed sightlines across Bhurban valley from every villa — private terraces positioned to face the mountain horizon at sunrise and sunset."
                },
                {
                  icon: "○",
                  title: "IN-VILLA SPA TREATMENTS",
                  desc: "Personalised spa services delivered to your villa — deep tissue massage, aromatherapy, hot stone therapy, and bespoke couples packages on request."
                },
                {
                  icon: "❖",
                  title: "DEDICATED VILLA ATTENDANT",
                  desc: "Your own assigned attendant throughout the stay — 24 hours for dining requests, housekeeping, local arrangements, and every need that arises."
                },
                {
                  icon: "☾",
                  title: "HALAL GOURMET DINING",
                  desc: "All meals are 100% halal. Pakistani haute cuisine and continental options, served in your villa at your chosen time or set up on your private terrace."
                },
                {
                  icon: "❄",
                  title: "CENTRAL HEATING & COOLING",
                  desc: "Full central heating for winter stays, air conditioning for summer. Open 365 days — never closed for seasonal maintenance or weather conditions."
                },
                {
                  icon: "□",
                  title: "PRIVATE TERRACE & BALCONY",
                  desc: "Every villa has a private outdoor space — terrace, balcony, or garden area for breakfast, sunsets, stargazing, or morning yoga undisturbed."
                },
                {
                  icon: "✦",
                  title: "24-HOUR ROOM SERVICE",
                  desc: "Round-the-clock in-villa service — meals, beverages, and housekeeping requests fulfilled at any hour throughout your stay."
                },
                {
                  icon: "⊕",
                  title: "CONCIERGE & PRE-ARRIVAL PLANNING",
                  desc: "Your concierge team contacts you before arrival — dietary requirements, decorations, activities, and transfers all arranged in advance."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 border-b md:border-r border-[#e5e1d8] hover:bg-[#fcfbf8] transition-colors">
                  <div className="text-xl mb-6 text-[#1b261b]">{item.icon}</div>
                  <h3 className="text-[11px] font-bold text-[#1b261b] mb-4 uppercase tracking-[0.15em]">{item.title}</h3>
                  <p className="text-[13px] text-[#8b8878] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCES */}
        <section className="py-20 md:py-32 bg-[#1b261b] px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#c9a55b]"></span>
                <span>EXPERIENCES AT HIMALAYA VILLAS</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white">
                Beyond the Villa — <br />
                <span className="text-[#c9a55b] italic">What To Do in Murree</span>
              </h2>
              <p className="mt-6 text-[#869986] max-w-3xl text-[15px] leading-relaxed">
                From spa and private dining to guided treks and cultural excursions — all private, all personalised, all arranged through your concierge team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "○",
                  title: "SPA & WELLNESS",
                  desc: "In-villa spa treatments by certified therapists. Deep tissue massage, hot stone therapy, aromatherapy, and personalised couples packages. Available as part of the Honeymoon Sanctuary or Mountain Wellness Retreat package, or as a standalone booking.",
                  tags: ["IN-VILLA", "COUPLES", "PERSONALISED"]
                },
                {
                  icon: "○",
                  title: "GUIDED NATURE & FOREST TRAILS",
                  desc: "Private guided treks through the Bhurban pine forests — morning birdwatching, sunset ridge walks, and full-day mountain trekking. All guided excursions are private to your group only with a knowledgeable local guide.",
                  tags: ["OUTDOOR", "GUIDED", "ADVENTURE"]
                },
                {
                  icon: "□",
                  title: "FINE DINING & PRIVATE CHEF",
                  desc: "Gourmet dining in your villa — Pakistani haute cuisine, continental breakfast, bonfire dinners under open sky, and candlelit terrace setups. Personalised chef service available for guests with specific culinary preferences or dietary requirements.",
                  tags: ["PRIVATE", "HALAL", "BESPOKE"]
                },
                {
                  icon: "✦",
                  title: "CULTURAL EXCURSIONS",
                  desc: "Day trips to Murree Mall Road, Kashmir Point, Pindi Point, and Patriata Chairlift arranged through your concierge. Heritage walks through old Murree hill station architecture. Shopping in Kashmiri Bazaar for local crafts, shawls, and dry fruits.",
                  tags: ["LOCAL CULTURE", "DAY TRIPS", "GUIDED"]
                },
                {
                  icon: "●",
                  title: "CORPORATE & EXECUTIVE RETREATS",
                  desc: "Private boardrooms with AV equipment, all-inclusive catering, executive villa accommodation, and team-building activity programmes for groups of 10 to 50. Corporate billing, GST invoicing, and dedicated event coordination included.",
                  tags: ["CORPORATE", "TEAM BUILDING", "GROUP 10-50"]
                },
                {
                  icon: "✧",
                  title: "FAMILY ACTIVITIES & CHILDREN",
                  desc: "Children welcome hampers, bonfire and s'mores evenings, guided junior nature trails, family portrait sessions, and seasonal activity programmes. Nannies available on advance request. Fully child-safe and 100% family-appropriate throughout.",
                  tags: ["FAMILY", "KIDS", "CHILDCARE AVAILABLE"]
                }
              ].map((item, i) => (
                <div key={i} className="bg-[#243324] p-10 flex flex-col h-full border border-[#2d402d] hover:border-[#405940] transition-colors">
                  <div className="text-xl mb-8 text-[#869986]">{item.icon}</div>
                  <h3 className="text-[11px] font-bold text-[#c9a55b] mb-4 uppercase tracking-[0.15em]">{item.title}</h3>
                  <p className="text-[13px] text-[#869986] leading-relaxed flex-grow mb-8">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="text-[8px] font-bold text-[#869986] uppercase tracking-widest border border-[#3b523b] px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="py-20 md:py-32 bg-[#fcfbf8] px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-5xl text-[#1b261b]">
                Luxury Hotels in Murree — <br />
                <span className="text-[#c9a55b] italic">Choose Your Package</span>
              </h2>
              <p className="mt-6 text-[#8b8878] max-w-3xl text-[15px] leading-relaxed">
                Every package is fully all-inclusive — accommodation, meals, spa, activities, and inbound transfers. No hidden charges. No extras to book separately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "COUPLES & LEISURE",
                  title: "Honeymoon Sanctuary",
                  desc: "2 Nights · Private Villa · All-Inclusive",
                  price: "PKR 65,000",
                  includes: [
                    "Private honeymoon villa with panoramic Himalayan view",
                    "Candlelit terrace dinner on arrival night",
                    "Spa treatment for two (60 min each)",
                    "Fresh flowers, fruit basket & welcome amenities",
                    "Daily halal gourmet breakfast in villa",
                    "Late check-out at 2 PM included"
                  ],
                  btn: "ENQUIRE VIA WHATSAPP"
                },
                {
                  category: "FAMILIES & GROUPS",
                  popular: true,
                  title: "Family Mountain Escape",
                  desc: "2-3 Nights · Grand Family Villa · All-Inclusive",
                  price: "PKR 80,000",
                  includes: [
                    "Grand family villa (sleeps 4 - 8)",
                    "Daily halal breakfast for all guests",
                    "One private family dinner in-villa",
                    "Guided nature trail in Bhurban pine forest",
                    "Bonfire & s'mores evening",
                    "Children welcome hamper on arrival",
                    "Family portrait photography session"
                  ],
                  btn: "CHECK AVAILABILITY",
                  primaryBtn: true
                },
                {
                  category: "SPA & WELLNESS",
                  title: "Mountain Wellness Retreat",
                  desc: "2 Nights · Signature Villa · Spa-Inclusive",
                  price: "PKR 70,000",
                  includes: [
                    "Private signature villa with valley view",
                    "Daily in-villa spa session (90 min)",
                    "Morning yoga on private terrace",
                    "Personalised wellness meal plan (halal)",
                    "Guided meditative forest walk",
                    "Herbal teas & wellness welcome pack"
                  ],
                  btn: "ENQUIRE VIA WHATSAPP"
                },
                {
                  category: "ADVENTURE & EXPLORATION",
                  title: "Himalayan Explorer",
                  desc: "3 Nights · Signature Villa · Activity-Inclusive",
                  price: "PKR 75,000",
                  includes: [
                    "Private villa with mountain view",
                    "2 private guided forest trekking sessions",
                    "Day trip to Pindi Point / Patriata Chairlift",
                    "Murree Mall Road & Kashmiri Bazaar excursion",
                    "Daily breakfast & packed trail lunches",
                    "Bonfire & stargazing evening"
                  ],
                  btn: "ENQUIRE VIA WHATSAPP"
                },
                {
                  category: "CORPORATE & BUSINESS",
                  title: "Executive Retreat",
                  desc: "2 Nights · Exclusive Villa Wing",
                  price: "PKR 180,000",
                  suffix: " / group",
                  includes: [
                    "Exclusive villa wing (10 - 50 guests)",
                    "Private boardroom with full AV equipment",
                    "All-inclusive catering for all sessions",
                    "Team-building activity programme",
                    "Corporate billing & GST invoicing",
                    "Dedicated event coordinator"
                  ],
                  btn: "REQUEST GROUP QUOTE"
                },
                {
                  category: "WEEKEND GETAWAY",
                  title: "The Weekend Connoisseur",
                  desc: "1-2 Nights · Signature Villa",
                  price: "PKR 40,000",
                  includes: [
                    "Private signature villa — Friday to Sunday",
                    "Saturday brunch served in-villa",
                    "Roaring bonfire on estate grounds",
                    "Scenic sunrise walk on Bhurban ridge",
                    "Premium welcome hamper on arrival",
                    "Late check-out to 2 PM included"
                  ],
                  btn: "CHECK AVAILABILITY"
                }
              ].map((pkg, i) => (
                <div key={i} className="flex flex-col bg-white border border-[#e5e1d8] h-full">
                  <div className="bg-[#1b261b] p-6 relative">
                    {pkg.popular && (
                      <span className="absolute top-6 right-6 bg-[#c9a55b] text-[#1b261b] text-[8px] font-bold uppercase tracking-widest px-2 py-1">
                        MOST POPULAR
                      </span>
                    )}
                    <p className="text-[#c9a55b] text-[9px] font-bold uppercase tracking-[0.2em] mb-2">{pkg.category}</p>
                    <h3 className="text-xl text-white font-display mb-2">{pkg.title}</h3>
                    <p className="text-[11px] text-[#869986]">{pkg.desc}</p>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="mb-6">
                      <p className="text-[10px] text-[#8b8878] uppercase tracking-widest mb-1">STARTING FROM</p>
                      <p className="font-display text-2xl text-[#1b261b]">{pkg.price} <span className="text-[13px] text-[#8b8878] font-sans italic">{pkg.suffix || "/ night"}</span></p>
                    </div>
                    
                    <div className="w-full h-[1px] bg-[#e5e1d8] mb-6"></div>
                    
                    <ul className="space-y-4 flex-grow mb-10">
                      {pkg.includes.map((inc, j) => (
                        <li key={j} className="flex items-start gap-3 text-[13px] text-[#8b8878]">
                          <span className="text-[#c9a55b] mt-0.5">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors border ${pkg.primaryBtn ? 'bg-[#1b261b] text-white border-[#1b261b] hover:bg-black' : 'bg-transparent text-[#1b261b] border-[#e5e1d8] hover:border-[#1b261b]'}`}>
                      {pkg.btn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVERY QUESTION ANSWERED - FAQ */}
        <section className="py-20 md:py-32 bg-white px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 text-[#8b8878] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#8b8878]"></span>
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1b261b]">
                Every Question About <br />
                <span className="text-[#c9a55b] italic">Luxury Hotels in Murree — Answered</span>
              </h2>
              <p className="mt-6 text-[#8b8878] text-[15px] leading-relaxed">
                Comprehensive answers to the questions guests ask most before choosing a luxury hotel in Murree or Bhurban for their stay.
              </p>
            </div>

            <div className="space-y-16">
              {[
                {
                  category: "VILLA BOOKING & RESERVATIONS",
                  faqs: [
                    { q: "How do I book Himalaya Villas directly for the best rate?", a: "Booking directly with Himalaya Villas is straightforward: contact us via WhatsApp with your preferred dates, number of guests, and any specific requirements. Our reservations team responds within 15 minutes during business hours (9 AM – 10 PM). We will confirm villa availability, share the current package options, and guide you through a simple booking process. Direct bookings receive our best available rate guarantee along with complimentary inclusions — typically a welcome amenity, flexible check-in/check-out consideration, and personalised pre-arrival coordination — none of which are available on OTA platforms." },
                    { q: "How to book a luxury stay in Bhurban online?", a: "Himalaya Villas can be booked through three channels: directly via our website (recommended), via WhatsApp for a fully personalised reservation experience, or through major OTAs including Booking.com, Airbnb, TripAdvisor, and Agoda. Direct bookings carry our best rate guarantee and include complimentary inclusions not offered through OTA platforms. WhatsApp bookings also allow you to specify preferences, dietary requirements, and special arrangements before arrival — making your stay feel considered from the moment you confirm." },
                    { q: "What are the best online platforms to book Bhurban resort stays?", a: "Himalaya Villas is available on Booking.com, TripAdvisor, Airbnb, Agoda, and Google Hotels. However, the best experience — and the best rate — comes from booking directly with us via our website or WhatsApp. Direct bookings receive our best available rate guarantee, personalised pre-arrival coordination, and complimentary inclusions not visible or available on any OTA platform." },
                    { q: "How do I check availability and book for group stays in Bhurban?", a: "For groups of six or more guests, Himalaya Villas recommends contacting our reservations team directly rather than booking online. Group bookings require villa configuration planning, customised package pricing, and pre-arrival coordination that OTA platforms cannot accommodate. Send us your preferred dates, approximate group size, and the nature of the occasion (family gathering, corporate retreat, celebration) via WhatsApp. Our team will respond within 4 hours with tailored availability and a package proposal specific to your group." },
                    { q: "How do I get early check-in or late check-out at a Bhurban resort?", a: "At Himalaya Villas, standard check-in is at 2:00 PM and check-out is at 12:00 noon. Early check-in from 10:00 AM and late check-out until 2:00 PM are available at no additional charge for direct bookings and returning guests, subject to villa availability on the day. To secure an early or late arrangement, contact our team via WhatsApp at least 48 hours before your arrival. We will confirm availability and ensure your villa is ready at the requested time." },
                    { q: "How do I book a Bhurban resort stay for a family reunion?", a: "Himalaya Villas accommodates extended family groups through full-property exclusive bookings — the entire property reserved for one family, with complete privacy, dedicated staff, and customised catering for groups of 15 to 60 guests. Family reunion packages include welcome arrangements, catered meals across all days, coordinated activity options, and a private dining setup for the group. These events require enquiry at least 6–8 weeks in advance. Contact our events team for a full proposal including pricing, inclusions, and available dates." },
                    { q: "How do I reserve a suite for an anniversary celebration at a Bhurban resort?", a: "Himalaya Villas is a favoured destination for anniversary celebrations among Pakistan's most private couples. To reserve your anniversary suite, contact us via WhatsApp with your preferred dates and any specific requests — flowers, preferred dining arrangements, cake, special decorations. We ask for as much advance notice as possible to allow our team to prepare something truly fitting. Our anniversary experiences are not templated. Every arrangement is made specifically for you. Availability for key dates — particularly around Eid and long weekends — should be confirmed 3–4 weeks in advance." },
                    { q: "What are the best Bhurban resorts for honeymooners?", a: "Himalaya Villas is Bhurban's foremost honeymoon destination. Our Honeymoon Sanctuary package is a fully curated experience: a private suite with mountain views, a candlelit romantic dinner, spa treatments for two, handwritten welcome amenities, and dedicated concierge attention throughout your stay. We intentionally limit our villa inventory to ensure privacy — you will not share your experience with hundreds of hotel guests. Availability for prime dates fills several weeks in advance. Contact us as early as possible to reserve your preferred dates." }
                  ]
                },
                {
                  category: "PRICING & PACKAGES",
                  faqs: [
                    { q: "What is the average cost of a weekend stay at a premium Bhurban resort?", a: "Premium weekend stays at Bhurban's leading properties range from PKR 35,000 to PKR 80,000+ per night depending on the property, room type, and season. At Himalaya Villas, private villa rates begin from PKR 45,000 per night with inclusions that go well beyond a standard hotel room — private terrace with mountain views, premium furnishings, and personalised service as standard. Direct bookings with Himalaya Villas include complimentary inclusions not available through OTAs. Contact us for current package rates and availability." },
                    { q: "Which Bhurban resorts offer seasonal promotional packages?", a: "Himalaya Villas releases curated seasonal packages aligned with Pakistan's key travel occasions: Eid holidays, summer peak season, long weekends, and winter getaways. Our seasonal packages bundle villa stays with dining, spa credits, and experience add-ons at rates that are not available on OTAs. To receive early access to seasonal packages before public announcement, contact us to be added to our priority guest list. Packages for Eid and peak summer typically sell out 3–4 weeks in advance." },
                    { q: "Are there Bhurban resorts that offer all-inclusive meal plans?", a: "Yes. Himalaya Villas offers curated all-inclusive dining packages covering full breakfast, a light lunch, and a three-course dinner prepared by our in-house culinary team. All-inclusive packages are available as an add-on to any villa booking at a supplementary per-person rate. Our all-inclusive dining uses fresh, locally sourced mountain produce. Unlike hotel buffet all-inclusive options, meals at Himalaya Villas are plated and served — the experience reflects the property's luxury positioning throughout." }
                  ]
                },
                {
                  category: "WEDDINGS",
                  faqs: [
                    { q: "Which Bhurban resorts offer customised wedding or event planning services?", a: "Himalaya Villas specialises in small, intimate, ultra-premium wedding events and milestone celebrations for 10 to 80 guests. Our events team manages every element — floral arrangements, catering, venue setup, photography coordination, and personalised guest management from arrival to departure. We do not handle mass-market banquets. Our events are curated for guests who value detail, privacy, and a setting that makes the occasion genuinely memorable. Enquire at least 8 weeks in advance to secure your preferred date." },
                    { q: "Can I book the entire Himalaya Villas estate for a destination wedding?", a: "Yes, Himalaya Villas is frequently booked exclusively for intimate mountain weddings. By reserving the entire estate, you ensure absolute privacy for your guests and total freedom in utilizing our outdoor gardens, terraces, and dining spaces. Our culinary team will work with you to design bespoke menus for multiple days of celebrations." }
                  ]
                },
                {
                  category: "EVENTS",
                  faqs: [
                    { q: "What type of private events can be hosted at Himalaya Villas?", a: "We specialize in intimate gatherings, including anniversary dinners, birthday retreats, private family reunions, and curated luxury offsites. Rather than a large ballroom, we offer exclusive use of specific villa wings, terraced gardens, and our main dining room. Our events team provides full-service planning from the menu to the décor, ensuring a flawless experience." },
                    { q: "Are there outdoor event spaces available?", a: "Yes, our landscaped gardens and private villa terraces serve as stunning outdoor venues for evening bonfires, high teas, and scenic dinners. Surrounded by pine forests and offering sweeping valley views, these outdoor spaces provide a magical atmosphere for both daytime and evening events." }
                  ]
                },
                {
                  category: "CORPORATE BOOKINGS",
                  faqs: [
                    { q: "Which Bhurban resorts provide corporate retreat facilities?", a: "Himalaya Villas is Bhurban's leading destination for senior executive corporate retreats. We offer private meeting rooms with full AV equipment, high-speed connectivity, all-day catering, and a mountain setting that creates the mental distance from the office that productive thinking requires. Our corporate packages cover accommodation for 10 to 50 executives, private dining, team activity options, and a dedicated events coordinator." },
                    { q: "Find Bhurban resorts with conference and event facilities.", a: "Himalaya Villas provides private conference and meeting facilities for corporate groups of 10 to 50 attendees. The setting — mountain air, natural light, and complete seclusion — is what distinguishes a Himalaya Villas offsite from a standard city boardroom rental at a hotel. Facilities include high-speed internet, presentation equipment, whiteboards, and full-day catering." },
                    { q: "Luxury hotels in Murree with executive lounges and business centers", a: "Himalaya Villas does not have a traditional shared executive lounge in the hotel sense. Instead, the executive experience is delivered privately — your villa is your lounge. For corporate and business guests, Himalaya Villas provides a private boardroom with full AV equipment, high-speed conference WiFi, all-inclusive catering for meeting sessions, and a dedicated event coordinator. Our corporate wing accommodates 10 to 50 people exclusively." }
                  ]
                },
                {
                  category: "SERVICES",
                  faqs: [
                    { q: "Which resorts in Bhurban offer spa and wellness packages?", a: "Himalaya Villas offers a curated wellness experience for guests seeking genuine restoration alongside their mountain retreat. Our spa services include therapeutic massage, body treatments, and couples' wellness sessions — all available in a private, unhurried environment that prioritises your comfort over volume. Wellness packages can be added to any villa booking." },
                    { q: "What vegetarian and halal food options are available at Bhurban resorts?", a: "All menus at Himalaya Villas are fully halal-certified — this is not a dietary option but a standard across every item served on the property. Our kitchen sources meat and produce from verified halal suppliers, and our menus include a wide range of vegetarian and lighter options alongside main course selections." },
                    { q: "What dining options are available at luxury Bhurban resorts?", a: "At Himalaya Villas, dining is treated as an experience in itself. Our in-house culinary team prepares daily menus using fresh, locally sourced ingredients. Guests can enjoy a full mountain breakfast on their private terrace, curated lunches, and multi-course dinners in the main dining room or in their villa. All menus are fully halal-certified." },
                    { q: "Are there Bhurban resorts offering adventure sports equipment and facilities?", a: "Himalaya Villas concierge can arrange mountain biking, zip-lining access, trekking equipment, and local adventure activities through our curated partner network in the Murree Hills and surrounding areas. Rather than operating these facilities in-house, we pre-vet and arrange trusted local adventure operators, coordinate your session times, and manage logistics." },
                    { q: "Can I arrange airport transfers directly through a Bhurban resort?", a: "Yes. Himalaya Villas offers private airport transfer services from Islamabad International Airport directly to the property. All transfers use premium vehicles appropriate to the property's luxury positioning. Airport transfer bookings require at least 24 hours' advance notice and flight details." },
                    { q: "Murree luxury hotels with outdoor heated pools and rooftop infinity pools", a: "Himalaya Villas does not currently have an outdoor swimming pool or rooftop infinity pool. At 1,850 metres elevation in Bhurban, the mountainous terrain and forested landscape are the defining outdoor features of the estate — not a pool. Guests seeking outdoor leisure will find that the private terraces on each villa, panoramic views, guided forest trails, bonfire evenings, and open-sky dining more than fulfil the outdoor experience." },
                    { q: "Murree luxury hotels with best in-room technology and entertainment", a: "All twelve villas at Himalaya Villas Bhurban are equipped with high-speed WiFi, smart flat-screen televisions with streaming capability (Netflix, YouTube, and on-demand content), premium sound systems, and USB charging stations throughout. In-villa technology is designed for comfort rather than distraction. For corporate bookings requiring full AV, our private boardroom is fully equipped." },
                    { q: "Best luxury hotels in Murree with multilingual staff and international guest services", a: "The Himalaya Villas team is fully fluent in Urdu and English, and our reservations and concierge communications operate in both languages. We regularly host international guests — Pakistani diaspora from the UAE, UK, Saudi Arabia, Canada, and the USA — and are experienced in meeting international guest expectations for service, communication, and room standards." },
                    { q: "Where can I find luxury hotels in Murree with bespoke interior design themes?", a: "Himalaya Villas Bhurban features individually appointed villas — each one decorated distinctly rather than as standardised hotel rooms. The design aesthetic draws from the natural landscape of Bhurban: warm earth tones, local woodwork, natural stone finishes, Kashmiri textile accents, and panoramic-facing windows that bring the mountain view into the interior." },
                    { q: "How to book luxury hotels in Murree that offer helicopter transfer services?", a: "Himalaya Villas does not currently offer helicopter transfer services. The road transfer from Islamabad to Bhurban (60 km, approximately 75 minutes via the Murree Expressway) is well-maintained and accessible year-round, making helicopter transfer unnecessary for the majority of guests. For all standard transfer bookings — private car from Islamabad International Airport, Islamabad city, or Rawalpindi — please reach out to us." },
                    { q: "List luxury hotels in Murree that provide chauffeured limousine services for guests", a: "Himalaya Villas provides private car transfer services for guests rather than traditional limousine hire. Our transfer vehicles are executive-class, air-conditioned, and driven by vetted, experienced drivers who know the Murree Hills road network in all weather conditions. Transfer routes available: Islamabad International Airport, Islamabad city, and Rawalpindi Saddar to Bhurban." }
                  ]
                },
                {
                  category: "POLICIES / REFUNDS",
                  faqs: [
                    { q: "How do I cancel or modify a Bhurban resort reservation?", a: "For direct bookings with Himalaya Villas, modifications and cancellations are accepted up to 72 hours before the scheduled arrival date at no charge. Cancellations made within 72 hours of arrival are subject to a one-night retention charge. Modifications to dates or villa type are accommodated subject to availability and are always handled with flexibility where possible. Contact our team via WhatsApp for the fastest resolution on any modification." },
                    { q: "Luxury hotels in Murree with pet-friendly policies", a: "Himalaya Villas Bhurban does not permit pets on the estate. To maintain a premium, allergen-controlled environment for all guests — including families with children and guests with sensitivities — no animals are permitted in the villas or on the grounds. Guests travelling with pets are advised to arrange suitable boarding in Rawalpindi or Islamabad prior to arrival." }
                  ]
                }
              ].map((section, idx) => (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                  <div>
                    <h3 className="text-[10px] font-bold text-[#c9a55b] uppercase tracking-widest sticky top-32">{section.category}</h3>
                  </div>
                  <div>
                    {section.faqs.map((faq, faqIdx) => {
                      const uid = `${idx}-${faqIdx}`;
                      return (
                        <div key={faqIdx} className="border-b border-[#e5e1d8]">
                          <button
                            onClick={() => toggleFaq(uid)}
                            className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                          >
                            <span className="text-[14px] font-bold text-[#1b261b] pr-8 leading-snug">
                              {faq.q}
                            </span>
                            <span className="shrink-0 w-6 h-6 border border-[#e5e1d8] bg-[#fcfbf8] flex items-center justify-center text-neutral-400">
                              {openFaqIndex === uid ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            </span>
                          </button>
                          <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === uid ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                          >
                            <p className="text-[14px] text-[#8b8878] leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHICH IS BETTER: MURREE VS NATHIA GALI */}
        <section className="py-20 md:py-32 bg-white px-6 border-t border-[#e5e1d8]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#c9a55b]"></span>
                <span>MURREE OR NATHIA GALI?</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1b261b]">
                Which Is Better for a <br />
                <span className="text-[#c9a55b] italic">Luxury Mountain Stay?</span>
              </h2>
              <p className="mt-6 text-[#8b8878] max-w-3xl text-[15px] leading-relaxed">
                One of the most searched travel questions in Pakistan — answered honestly from experience hosting guests who have stayed in both destinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div className="bg-[#f2efe9] p-10 border border-[#e5e1d8]">
                <h3 className="text-2xl font-display text-[#1b261b] mb-1">Murree / Bhurban</h3>
                <p className="text-[9px] font-bold text-[#8b8878] uppercase tracking-widest mb-8">RECOMMENDED FOR LUXURY TRAVEL</p>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="text-[#c9a55b] mt-1">✓</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Distance from Islamabad</p>
                      <p className="text-[13px] text-[#8b8878]">60 km - approx 70 min via Expressway</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#c9a55b] mt-1">✓</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Elevation</p>
                      <p className="text-[13px] text-[#8b8878]">1,500 - 1,900 m above sea level (Bhurban: 1,850 m)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#c9a55b] mt-1">✓</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Luxury Accommodation</p>
                      <p className="text-[13px] text-[#8b8878]">Himalaya Villas private estate, PC Bhurban, Cecil — all available</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#c9a55b] mt-1">✓</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Road Quality</p>
                      <p className="text-[13px] text-[#8b8878]">Well-maintained Expressway — accessible year-round including heavy winter snowfall</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#c9a55b] mt-1">✓</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Attractions Near</p>
                      <p className="text-[13px] text-[#8b8878]">Mall Road, Kashmir Point, Pindi Point, Patriata Chairlift, Kashmiri Bazaar</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#c9a55b] mt-1">✓</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Best For</p>
                      <p className="text-[13px] text-[#8b8878]">Families, couples, corporate groups — all traveller types seeking curated luxury</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-10">
                <h3 className="text-2xl font-display text-[#1b261b] mb-1">Nathia Gali</h3>
                <p className="text-[9px] font-bold text-[#8b8878] uppercase tracking-widest mb-8">THE ALTERNATIVE FOR SOLITUDE</p>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 border-b border-[#e5e1d8] pb-6">
                    <span className="text-neutral-400 mt-1">—</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Distance from Islamabad</p>
                      <p className="text-[13px] text-[#8b8878]">80+ km - approx 2 hrs via Abbottabad Road</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 border-b border-[#e5e1d8] pb-6">
                    <span className="text-neutral-400 mt-1">—</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Elevation</p>
                      <p className="text-[13px] text-[#8b8878]">2,500 m above sea level — higher, colder in winter</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 border-b border-[#e5e1d8] pb-6">
                    <span className="text-neutral-400 mt-1">—</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Luxury Accommodation</p>
                      <p className="text-[13px] text-[#8b8878]">Limited — mostly mid-tier guesthouses and government rest houses</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 border-b border-[#e5e1d8] pb-6">
                    <span className="text-neutral-400 mt-1">—</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Road Quality</p>
                      <p className="text-[13px] text-[#8b8878]">Narrower, more winding — challenging in winter ice conditions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 border-b border-[#e5e1d8] pb-6">
                    <span className="text-neutral-400 mt-1">—</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Attractions Near</p>
                      <p className="text-[13px] text-[#8b8878]">Miranjani Trek, Dunga Gali Forest walks — quieter, fewer developed attractions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-neutral-400 mt-1">—</span>
                    <div>
                      <p className="text-[11px] font-bold text-[#1b261b] uppercase tracking-widest mb-1">Best For</p>
                      <p className="text-[13px] text-[#8b8878]">Serious trekkers and guests seeking raw altitude at higher elevation — not curated 5-star luxury</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY BHURBAN IS WHERE LUXURY BEGINS */}
        <section className="py-20 md:py-32 bg-[#172017] px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#c9a55b]"></span>
                <span>THE BHURBAN DIFFERENCE</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
                Why Bhurban Is Where <br />
                <span className="text-[#c9a55b] italic">Luxury Begins in Murree</span>
              </h2>
              
              <div className="space-y-6 text-[#869986] text-[15px] leading-relaxed font-light">
                <p>
                  Murree is a broad geographic term. The town of Murree — Mall Road, Kashmir Point — is beautiful but crowded. The elevation is moderate and the experience, while charming, is distinctly urban for a hill station. <span className="text-white font-medium">Bhurban is different.</span>
                </p>
                <p>
                  Eight kilometres beyond Murree town and 300 metres higher in elevation, Bhurban sits in a genuinely different microclimate. The pine forests are denser. The air is colder and cleaner. The views extend further. The road narrows. The noise fades. This is why Pakistan's most discerning families, corporate leaders, and most private guests choose Bhurban over Murree town when seeking luxury accommodation.
                </p>
                <p>
                  The question &quot;what is the best luxury hotel in Murree?&quot; almost always leads to Bhurban. And within Bhurban, the question of private estate luxury leads to <span className="text-white font-medium">Himalaya Villas</span> — the only property in the Murree Hills offering twelve individually designed private villas, in-villa spa, private dining, and genuine exclusivity at a competitive all-inclusive rate.
                </p>
                
                <blockquote className="border-l-2 border-[#c9a55b] pl-6 my-10 py-2">
                  <p className="font-display text-2xl text-[#c9a55b] italic leading-relaxed">
                    &quot;The search for the best luxury hotel in Murree ends in Bhurban. In Bhurban, it ends at Himalaya Villas.&quot;
                  </p>
                </blockquote>
                
                <p>
                  We have hosted families from Islamabad seeking weekend refuge, couples from Lahore and Karachi celebrating milestones, corporate teams holding strategic offsites, and overseas Pakistan families from the UAE, UK, and Saudi Arabia who wanted the mountain memory of Pakistan without compromise on quality or halal standards.
                </p>
              </div>
            </div>

            <div className="bg-[#1b261b] border border-[#2d402d] p-8 md:p-12">
              <h3 className="text-xl font-display text-white mb-8 border-b border-[#2d402d] pb-6">The Estate — At a Glance</h3>
              
              <ul className="space-y-4">
                {[
                  { label: "LOCATION", val: "Malot Road, Bhurban, Murree Hills 47150" },
                  { label: "ELEVATION", val: "1,850 metres above sea level" },
                  { label: "DISTANCE", val: "60 km from Islamabad, 8 km from Murree Town" },
                  { label: "VILLAS", val: "12 private villas" },
                  { label: "CAPACITY", val: "2 - 8 guests per villa" },
                  { label: "RATES", val: "PKR 35,000 - 95,000 / night" },
                  { label: "CHECK-IN / OUT", val: "2 PM / 12 PM (early/late available)" },
                  { label: "SEASON", val: "Open 365 days per year" },
                  { label: "CANCELLATION", val: "Free — 7+ days before arrival" },
                  { label: "PAYMENT", val: "Bank Transfer · EasyPaisa · JazzCash" },
                  { label: "FOOD", val: "100% Halal — all meals" },
                  { label: "AIRPORT TRANSFER", val: "From ISBA, Islamabad, Rawalpindi" },
                  { label: "CONTACT", val: "+92 304 567 9000" }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-start py-3 border-b border-[#2d402d] last:border-0">
                    <span className="text-[10px] font-bold text-[#869986] uppercase tracking-widest w-1/3">{item.label}</span>
                    <span className="text-[13px] text-white text-right w-2/3">{item.val}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-10 bg-[#c9a55b] text-[#1b261b] py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors">
                CHECK AVAILABILITY NOW
              </button>
            </div>
          </div>
        </section>

        {/* IS THERE A 5 STAR HOTEL */}
        <section className="py-20 md:py-32 bg-[#fcfbf8] px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 text-[#8b8878] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#8b8878]"></span>
                <span>5-STAR HOTELS IN PAKISTAN</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1b261b] max-w-2xl">
                Is There a 5-Star Hotel <br />
                <span className="text-[#c9a55b] italic">in Murree?</span>
              </h2>
              <p className="mt-6 text-[#8b8878] max-w-3xl text-[15px] leading-relaxed">
                A common question from travellers planning luxury stays in the Murree Hills — answered honestly and completely.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-3 space-y-12">
                <p className="text-[15px] text-[#1b261b] leading-relaxed font-light">
                  Pakistan has 5-star hotels primarily in Islamabad, Lahore, and Karachi — including <span className="font-bold">Marriott Islamabad</span>, <span className="font-bold">Serena Hotels</span>, and the <span className="font-bold">Pearl Continental chain</span>. In the Murree Hills, the properties operating at 5-star standard are:
                </p>

                <div className="flex gap-6">
                  <div className="text-3xl font-display text-[#c9a55b] opacity-50">01</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b261b] mb-2">Himalaya Villas Bhurban</h3>
                    <p className="text-[14px] text-[#8b8878] leading-relaxed">
                      A private luxury villa estate at 1,850m elevation — twelve individually appointed villas with in-villa spa, private dining, butler service, all-inclusive packages, and panoramic Himalayan views. Rated 4.8/5 across 127 verified reviews. Pakistan's highest-rated mountain luxury property for private and family stays.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-3xl font-display text-[#e5e1d8]">02</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b261b] mb-2">Pearl Continental Bhurban</h3>
                    <p className="text-[14px] text-[#8b8878] leading-relaxed">
                      A large-format chain hotel from the PC group — the most established hotel brand in Pakistan. Full facilities including conference halls, restaurants, and brand loyalty recognition. Preferred by guests prioritizing chain hotel familiarity and large group infrastructure over privacy and personalization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-3xl font-display text-[#e5e1d8]">03</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1b261b] mb-2">Cecil by Pearl Continental</h3>
                    <p className="text-[14px] text-[#8b8878] leading-relaxed">
                      A heritage property in Murree town with classic hill station architecture. Well-regarded for historic character and established reputation, though less modern in amenities compared to private estate alternatives.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#e5e1d8]">
                  <p className="text-[15px] text-[#1b261b] leading-relaxed">
                    For guests specifically seeking <span className="font-bold">private villa luxury</span> — in-villa spa, personalised dining, 100% halal food, and genuine exclusivity — Himalaya Villas is the clear choice in the Murree Hills.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white p-10 border border-[#e5e1d8] shadow-lg">
                <h3 className="text-2xl font-display text-[#1b261b] mb-8">Why Guests Choose Himalaya Villas Over Chain Hotels</h3>
                <ul className="space-y-8">
                  <li>
                    <div className="flex items-start gap-4">
                      <span className="text-[#c9a55b] mt-1">✓</span>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1b261b] mb-1">No shared corridors or lobbies</h4>
                        <p className="text-[13px] text-[#8b8878] leading-relaxed">A private villa estate — your group is the only presence in your villa space.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-4">
                      <span className="text-[#c9a55b] mt-1">✓</span>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1b261b] mb-1">Personalised from day one</h4>
                        <p className="text-[13px] text-[#8b8878] leading-relaxed">Pre-arrival consultation, dedicated attendant, bespoke meals and activities.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-4">
                      <span className="text-[#c9a55b] mt-1">✓</span>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1b261b] mb-1">Higher guest review scores</h4>
                        <p className="text-[13px] text-[#8b8878] leading-relaxed">4.8/5 across 127 verified reviews — above chain hotel averages in the area.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-4">
                      <span className="text-[#c9a55b] mt-1">✓</span>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1b261b] mb-1">100% Halal — no exceptions</h4>
                        <p className="text-[13px] text-[#8b8878] leading-relaxed">Chain hotels offer halal options; Himalaya Villas is a completely halal estate.</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-4">
                      <span className="text-[#c9a55b] mt-1">✓</span>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1b261b] mb-1">In-villa spa vs shared spa</h4>
                        <p className="text-[13px] text-[#8b8878] leading-relaxed">Spa treatments happen in your villa — not a shared facility with other hotel guests.</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EVERYTHING NEAR HIMALAYA VILLAS */}
        <section className="py-20 md:py-32 bg-[#172017] px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="h-[1px] w-6 bg-[#c9a55b]"></span>
                <span>LOCATION & NEARBY ATTRACTIONS</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white">
                Everything Near <br />
                <span className="text-[#c9a55b] italic">Himalaya Villas Bhurban</span>
              </h2>
              <p className="mt-6 text-[#869986] max-w-3xl text-[15px] leading-relaxed">
                The estate is your haven — here is what lies within easy reach. All excursions arranged through our concierge team as private day trips.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-[#2d402d] border border-[#2d402d]">
              {[
                { dist: "60 km", name: "Islamabad City Centre", desc: "~70 min via Expressway — Transfer available" },
                { dist: "50 km", name: "Rawalpindi Saddar", desc: "~65 min — Transfer available on request" },
                { dist: "75 km", name: "Islamabad Airport (ISBA)", desc: "~90 min — Private airport transfer service" },
                { dist: "8 km", name: "Murree Mall Road", desc: "~15 min — Shopping, dining, local culture" },
                { dist: "10 km", name: "Pindi Point", desc: "~20 min — Panoramic valley viewpoint" },
                { dist: "15 km", name: "Patriata Chairlift", desc: "~35 min — New Murree — Popular day trip" },
                { dist: "9 km", name: "Kashmir Point", desc: "~15 min — Heritage hill station viewpoint" },
                { dist: "5 km", name: "Sunny Bank", desc: "~10 min — Classic hill station viewpoint" },
                { dist: "1 km", name: "Kashmiri Bazaar", desc: "Walking distance — Local crafts, shawls & dry fruits" },
                { dist: "3.5 km", name: "PC Bhurban Hotel", desc: "~5 min — Same hill, different experience" }
              ].map((loc, i) => (
                <div key={i} className="bg-[#1b261b] p-8 hover:bg-[#243324] transition-colors">
                  <p className="font-display text-2xl text-[#c9a55b] mb-2">{loc.dist}</p>
                  <p className="text-[12px] font-bold text-white uppercase tracking-wider mb-2">{loc.name}</p>
                  <p className="text-[11px] text-[#869986] leading-relaxed">{loc.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="#" className="inline-block bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors">
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}