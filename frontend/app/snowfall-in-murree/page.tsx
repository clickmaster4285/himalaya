"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Snowflake, 
  Calendar, 
  Thermometer, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Clock, 
  Star, 
  Shield, 
  Wifi, 
  Car, 
  Utensils,
  TreePine,
  Mountain,
  Camera,
  Home,
  Flame,
  Check
} from "lucide-react";

const snowfallSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Snowfall in Murree — Complete Guide for 2025 & 2026",
  "description": "Monthly snowfall calendar, weather forecast guide, snowfall pics and luxury winter stays in Bhurban, Murree Hills.",
  "author": { "@type": "Organization", "name": "Himalaya Villas" },
  "publisher": { "@type": "Organization", "name": "Himalaya Villas", "url": "https://himalayavillas.com" },
  "about": { "@type": "Place", "name": "Murree Hills", "geo": { "@type": "GeoCoordinates", "latitude": "33.9032", "longitude": "73.3932" } },
  "dateModified": "2025-11-01"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When does snowfall start in Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snowfall in Murree typically begins in late November to mid-December, depending on the arrival of western disturbances from the west. The first significant snowfall of the season usually occurs between December 10–20. At Bhurban (6,500 ft elevation), snowfall often arrives slightly earlier than at Murree town (7,500 ft) due to elevation differences in accumulation patterns. The peak snowfall season in Murree runs from December 15 through the end of February."
      }
    },
    {
      "@type": "Question",
      "name": "Which months have the most snowfall in Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "January and February are the months with the highest snowfall frequency and accumulation in Murree and Bhurban. January typically sees 3–6 separate snowfall events from western disturbances crossing the region. February delivers similar frequency with slightly increasing daytime temperatures toward month-end, resulting in faster melt. December (last 2 weeks) and early March can also produce snowfall, but with lower probability than January–February."
      }
    },
    {
      "@type": "Question",
      "name": "What is the snowfall weather forecast for Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Real-time snowfall forecasts for Murree are published by the Pakistan Meteorological Department (PMD) at pmd.gov.pk. PMD issues winter weather advisories 48–72 hours before significant snowfall events covering the Murree Hills and Galliyat region. For real-time tracking, Accuweather (search 'Bhurban Pakistan weather') and Windy.com provide detailed short-range snowfall probability maps. During active winter disturbances, Pakistani TV channels (Geo, ARY, Dawn) broadcast regular weather updates."
      }
    },
    {
      "@type": "Question",
      "name": "Is Bhurban better than Murree for snowfall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bhurban receives comparable snowfall to Murree but offers a substantially different experience of it. Murree town is the most crowded snowfall destination in Pakistan — during peak snowfall weekends, traffic can back up 4–8 hours on the Murree Expressway and the town itself becomes extremely congested. Bhurban, 15 minutes further from Murree town, receives the same snowfall events with a fraction of the visitor volume, higher-quality accommodation options, and private outdoor space that makes the snowfall experience accessible rather than observational."
      }
    },
    {
      "@type": "Question",
      "name": "How long does snowfall last in Murree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A typical western disturbance snowfall event in Murree lasts 12–36 hours of active snowfall. Ground accumulation from a single event typically ranges from 2–12 inches depending on storm intensity. Snow remains on the ground in Bhurban for 2–5 days after a heavy event before melting at lower elevations (1–2 days in Murree town center). January events tend to produce the longest-lasting snow cover due to lower overall temperatures and reduced solar radiation."
      }
    }
  ]
};

export default function SnowfallInMurreePage() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const snowfallCalendar = [
    { month: "January", snowfall: "Heavy Snow", temp: "-2°C to +5°C", description: "Peak season" },
    { month: "February", snowfall: "Heavy Snow", temp: "-1°C to +7°C", description: "Peak season" },
    { month: "March", snowfall: "Light Snow", temp: "+3°C to +13°C", description: "Early spring" },
    { month: "April", snowfall: "Rare", temp: "+8°C to +18°C", description: "Spring begins" },
    { month: "May", snowfall: "None", temp: "+12°C to +22°C", description: "Green season" },
    { month: "June", snowfall: "None", temp: "+16°C to +26°C", description: "Peak summer" },
    { month: "July", snowfall: "None", temp: "+17°C to +27°C", description: "Monsoon" },
    { month: "August", snowfall: "None", temp: "+16°C to +26°C", description: "Monsoon peak" },
    { month: "September", snowfall: "None", temp: "+13°C to +23°C", description: "Post-monsoon" },
    { month: "October", snowfall: "Rare", temp: "+8°C to +18°C", description: "Autumn clear" },
    { month: "November", snowfall: "Early Snow", temp: "+2°C to +11°C", description: "Season begins" },
    { month: "December", snowfall: "Regular Snow", temp: "-1°C to +7°C", description: "Winter opens" }
  ];

  const packages = [
    {
      name: "Winter Snow Escape",
      bestFor: "Couples & Small Groups",
      duration: "2 nights",
      price: "PKR 65,000–90,000/stay",
      features: ["Private villa with mountain views", "In-villa fireplace", "Hot breakfast daily", "Evening bonfire on snowfall nights", "Dedicated villa host"]
    },
    {
      name: "Family Snow Weekend",
      bestFor: "Families (4–8 guests)",
      duration: "2–3 nights",
      price: "PKR 90,000–150,000/stay",
      features: ["Full family villa", "In-villa dining all meals", "Winter outdoor activities", "Snowfall morning walk", "Hot chocolate & bonfire service"]
    },
    {
      name: "Honeymoon Snow Sanctuary",
      bestFor: "Newlywed Couples",
      duration: "2 nights",
      price: "PKR 75,000–100,000/stay",
      features: ["Premium suite with ridgeline views", "Romantic winter dinner", "Fireplace setup", "Snowfall morning room service", "Late checkout"]
    },
    {
      name: "Corporate Winter Retreat",
      bestFor: "Teams (10–30 guests)",
      duration: "2 nights+",
      price: "PKR 200,000+ (10 pax)",
      features: ["Conference setup", "All-inclusive meals", "Team evening bonfire", "Private mountain snowfall briefing environment"]
    }
  ];

  const faqs = [
    {
      question: "When does snowfall start in Murree?",
      answer: "Snowfall in Murree typically begins in late November to mid-December, depending on the arrival of western disturbances from the west. The first significant snowfall of the season usually occurs between December 10–20. At Bhurban (6,500 ft elevation), snowfall often arrives slightly earlier than at Murree town (7,500 ft) due to elevation differences in accumulation patterns. The peak snowfall season in Murree runs from December 15 through the end of February."
    },
    {
      question: "Which months have the most snowfall in Murree?",
      answer: "January and February are the months with the highest snowfall frequency and accumulation in Murree and Bhurban. January typically sees 3–6 separate snowfall events from western disturbances crossing the region. February delivers similar frequency with slightly increasing daytime temperatures toward month-end, resulting in faster melt. December (last 2 weeks) and early March can also produce snowfall, but with lower probability than January–February."
    },
    {
      question: "What is the snowfall weather forecast for Murree?",
      answer: "Real-time snowfall forecasts for Murree are published by the Pakistan Meteorological Department (PMD) at pmd.gov.pk. PMD issues winter weather advisories 48–72 hours before significant snowfall events covering the Murree Hills and Galliyat region. For real-time tracking, Accuweather (search 'Bhurban Pakistan weather') and Windy.com provide detailed short-range snowfall probability maps. During active winter disturbances, Pakistani TV channels (Geo, ARY, Dawn) broadcast regular weather updates."
    },
    {
      question: "Is Bhurban better than Murree for snowfall?",
      answer: "Bhurban receives comparable snowfall to Murree but offers a substantially different experience of it. Murree town is the most crowded snowfall destination in Pakistan — during peak snowfall weekends, traffic can back up 4–8 hours on the Murree Expressway and the town itself becomes extremely congested. Bhurban, 15 minutes further from Murree town, receives the same snowfall events with a fraction of the visitor volume, higher-quality accommodation options, and private outdoor space that makes the snowfall experience accessible rather than observational."
    },
    {
      question: "How long does snowfall last in Murree?",
      answer: "A typical western disturbance snowfall event in Murree lasts 12–36 hours of active snowfall. Ground accumulation from a single event typically ranges from 2–12 inches depending on storm intensity. Snow remains on the ground in Bhurban for 2–5 days after a heavy event before melting at lower elevations (1–2 days in Murree town center). January events tend to produce the longest-lasting snow cover due to lower overall temperatures and reduced solar radiation."
    }
  ];

  const snowfallImages = [
    {
      src: "/assets/murree-snowy-peaks.jpg",
      alt: "Snowfall in Bhurban Murree — Himalaya Villas luxury villa covered in fresh snow with pine forest backdrop"
    },
    {
      src: "/assets/gallery-balcony.jpg",
      alt: "Murree snowfall view from luxury villa terrace — Bhurban Himalayan mountain winter landscape"
    },
    {
      src: "/assets/murree-forest-pines.jpg",
      alt: "Snowfall in Murree Bhurban 2024 — pine forest covered in snow, Murree Hills winter"
    },
    {
      src: "/assets/gallery-interior.jpg",
      alt: "Luxury winter villa Bhurban Murree — fireplace interior with snowfall view, Himalaya Villas"
    },
    {
      src: "/assets/gallery-garden.jpg",
      alt: "Morning snowfall walk Bhurban Murree Hills — private villa grounds in winter snow"
    },
    {
      src: "/assets/murree-mountain-hero.jpg",
      alt: "Snowfall at night in Bhurban Murree — luxury villa winter evening, Himalaya Villas Pakistan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(snowfallSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Snowflake className="w-8 h-8 text-blue-200" />
              <span className="text-blue-200 font-semibold">Complete Guide for 2025 & 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Snowfall in Murree
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              When It Snows | What to Expect | Snowfall Pics from Bhurban | Luxury Winter Stays
            </p>
            
            <p className="text-lg mb-8 text-blue-100 max-w-3xl">
              Murree and its higher elevation sister, Bhurban, are Pakistan's most visited snowfall destinations — drawing hundreds of thousands of visitors from Islamabad, Rawalpindi, and Lahore every winter season.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact" className="bg-[#c9a55b] hover:bg-[#b09452] text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
                <Phone className="inline-block w-5 h-5 mr-2" />
                Book Winter Snow Stay
              </Link>
              <Link href="/rooms-villas" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all border border-white/30">
                <Home className="inline-block w-5 h-5 mr-2" />
                View Winter Villas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900">First Snowfall Expected</h3>
              </div>
              <p className="text-blue-700">Late November to mid-December (elevation-dependent)</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Snowflake className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Peak Snowfall Season</h3>
              </div>
              <p className="text-blue-700">December 15 — February 28 (Heavy snowfall in Jan & Feb)</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Thermometer className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Bhurban Temperature</h3>
              </div>
              <p className="text-blue-700">-2°C to +8°C (December–February)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Snowfall Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Monthly Snowfall Calendar</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Murree & Bhurban (Annual Averages) - Historical snowfall patterns across the Murree Hills
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Month</th>
                  <th className="px-6 py-4 text-left">Snowfall</th>
                  <th className="px-6 py-4 text-left">Temperature</th>
                  <th className="px-6 py-4 text-left">Season</th>
                </tr>
              </thead>
              <tbody>
                {snowfallCalendar.map((month, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{month.month}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        month.snowfall === 'Heavy Snow' ? 'bg-blue-100 text-blue-800' :
                        month.snowfall === 'Light Snow' || month.snowfall === 'Early Snow' || month.snowfall === 'Regular Snow' ? 'bg-blue-50 text-blue-700' :
                        month.snowfall === 'Rare' ? 'bg-gray-100 text-gray-700' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {month.snowfall}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{month.temp}</td>
                    <td className="px-6 py-4 text-gray-600">{month.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3">When Is Snowfall Most Reliable?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-blue-800 mb-1">December (Late)</p>
                <p className="text-blue-700 text-sm">Moderate–High | December 15–31 | First heavy snowfall typically arrives</p>
              </div>
              <div>
                <p className="font-medium text-blue-800 mb-1">January</p>
                <p className="text-blue-700 text-sm">Very High | Entire month | Most reliable with 3-6 snowfall events</p>
              </div>
              <div>
                <p className="font-medium text-blue-800 mb-1">February</p>
                <p className="text-blue-700 text-sm">High | Entire month | Photogenic snowfall with bright skies</p>
              </div>
              <div>
                <p className="font-medium text-blue-800 mb-1">March (Early)</p>
                <p className="text-blue-700 text-sm">Low–Moderate | March 1–15 | Late-season unpredictable snowfall</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snowfall Forecast & Real-Time Updates Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Snowfall Weather Forecast — Murree & Bhurban</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most accurate real-time snowfall forecast for Murree and Bhurban comes from the Pakistan Meteorological Department (PMD)
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">How to Track Snowfall Expected in Murree</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Pakistan Meteorological Department (PMD)</p>
                    <p className="text-blue-700 text-sm">pmd.gov.pk — Official government weather authority. Issues winter weather advisories and snowfall warnings for Murree Hills.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Accuweather.com (Bhurban Search)</p>
                    <p className="text-blue-700 text-sm">Provides hour-by-hour and 15-day extended forecasts for Bhurban specifically — useful for week-ahead planning.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Windy.com (Advanced)</p>
                    <p className="text-blue-700 text-sm">Visual snow accumulation maps showing western disturbance movement across Pakistan.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-800">Himalaya Villas WhatsApp Updates</p>
                    <p className="text-blue-700 text-sm">Guests and enquirers can message +92-304-567-9000 for direct snowfall updates from the property team.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-8 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-orange-900">Road Conditions & Safety During Murree Snowfall</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-800">Check Road Status</p>
                    <p className="text-orange-700 text-sm">Via PDMA Punjab's official social media accounts before departure during snowfall events</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-800">Early Departure</p>
                    <p className="text-orange-700 text-sm">Departing Islamabad before 7:00 AM on snowfall days significantly reduces traffic and road risk</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-800">4x4 Recommended</p>
                    <p className="text-orange-700 text-sm">4x4 or AWD vehicles are strongly recommended for Bhurban access during active snowfall</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-800">Property Updates</p>
                    <p className="text-orange-700 text-sm">Himalaya Villas guests receive road condition briefings via WhatsApp prior to travel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">IMPORTANT: Snowfall Forecast vs. Snowfall Experience</h4>
                <p className="text-yellow-800">Weather forecasts predict probability, not guarantee. A '70% snowfall probability' for Murree does not mean the entire region will be covered — snowfall distribution varies significantly with elevation. Bhurban at 6,500 feet consistently receives snowfall when Murree town (7,500 ft) does, and often when lower-elevation areas around Murree do not.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Snowfall Experience in Bhurban Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">The Snowfall Experience in Bhurban</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What Snowfall in Bhurban Actually Looks and Feels Like
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Most visitors experience Murree snowfall from a car window, a roadside vendor stall, or a crowded hotel lobby. The snowfall itself — the silence after a heavy fall, the weight of snow on pine branches, the blue-grey light of a Himalayan winter morning — is extraordinary. But it is almost entirely inaccessible to guests in shared hotel environments where hundreds of other visitors are competing for the same terrace view.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Bhurban sits at a higher elevation than Murree town, which means snowfall arrives earlier, accumulates more deeply, and stays longer. At Himalaya Villas, the snowfall experience is shaped by private outdoor space, unobstructed ridgeline views, and the absence of crowds — the only footprints in the snow after a fresh fall are your own.
              </p>
            </div>
            
            <div className="relative">
              <Image
                src="/assets/murree-sunrise-mountains.jpg"
                alt="Snowfall experience at Himalaya Villas Bhurban"
                width={500}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-6">The Himalaya Villas Winter Snow Experience — What Guests Describe</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Waking to fresh snowfall on a private terrace — no crowds, no noise beyond the weight of snow on pine branches</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Fireplace-lit evenings with in-villa dining — served at your pace, not a hotel restaurant's schedule</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Morning snowfall walks through the Bhurban pine forest directly from the villa grounds</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">The view from the villa's primary terrace across the Himalayan ridgeline in full winter white</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Hot breakfast served while snowfall continues outside — prepared by the villa's kitchen team</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <p className="text-blue-100">Evening bonfire in the private outdoor space — arranged by the villa host on snowfall nights</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h4 className="font-semibold text-orange-900 mb-3">WHY THE SNOWFALL EXPERIENCE AT BHURBAN IS DIFFERENT FROM MURREE TOWN</h4>
            <p className="text-orange-800">
              Murree town's snowfall experience on a peak weekend involves: traffic queues of 4–8 hours, shared viewpoints with hundreds of visitors, roadside photography stops, and a hotel room that looks identical to any other winter weekend in Pakistan. The snowfall is the same. The experience of it is not.
            </p>
            <p className="text-orange-800 mt-2">
              Bhurban at Himalaya Villas: 45 minutes from Islamabad, no queue, private grounds, mountain views from your own terrace, staff who have prepared for your arrival specifically. The difference is not incremental — it is categorical.
            </p>
          </div>
        </div>
      </section>

      {/* Winter Trip Planning Guide Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How to Plan a Snowfall Trip to Murree & Bhurban</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Buyer's Planning Guide — The 5 Decisions That Make or Break a Murree Snowfall Trip
            </p>
          </div>
          
          <div className="overflow-x-auto mb-12">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Decision</th>
                  <th className="px-6 py-4 text-left">Priority</th>
                  <th className="px-6 py-4 text-left">Strategic Guidance</th>
                  <th className="px-6 py-4 text-left">Himalaya Villas Advantage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">1. Timing</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">HIGH</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">Book for a weekday if possible — weekend snowfall trips from Islamabad involve 4–8 hour traffic queues</td>
                  <td className="px-6 py-4 text-gray-600">Book 2–3 weeks ahead for weekend snow trips | Midweek has 40% less traffic</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-semibold text-gray-900">2. Elevation</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">CRITICAL</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">Not all of Murree is equal in winter. Bhurban, at 6,500 feet, is higher, quieter, and has deeper accumulation</td>
                  <td className="px-6 py-4 text-gray-600">Book accommodation in Bhurban, not central Murree town</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">3. Accommodation Type</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">CRITICAL</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">Shared hotel rooms mean competing for terrace views, crowded dining rooms, and parking area views</td>
                  <td className="px-6 py-4 text-gray-600">Himalaya Villas private villa — book direct for best availability</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-semibold text-gray-900">4. Transport</td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">HIGH</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">A 4x4 or AWD vehicle is strongly recommended for Bhurban access during active snowfall</td>
                  <td className="px-6 py-4 text-gray-600">4x4 recommended | Transfer service available from Himalaya Villas</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">5. Duration</td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">HIGH</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">A single-night visit is often insufficient — minimum 2-night stay allows for full snowfall experience</td>
                  <td className="px-6 py-4 text-gray-600">Minimum 2 nights recommended for winter snowfall visits</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">What to Pack for a Snowfall Trip to Murree Bhurban</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800">Thermal base layers</p>
                    <p className="text-blue-700 text-sm">Bhurban temperatures drop to -2°C at night in January and February</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800">Waterproof outer layer</p>
                    <p className="text-blue-700 text-sm">Snowfall is wet; a windproof and waterproof jacket is essential</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800">Waterproof boots or snow boots</p>
                    <p className="text-blue-700 text-sm">Standard shoes become uncomfortable on snow-covered paths</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800">Gloves and warm headwear</p>
                    <p className="text-blue-700 text-sm">Wind chill makes uncovered hands and ears uncomfortable quickly</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800">Power bank</p>
                    <p className="text-blue-700 text-sm">Cold temperatures drain phone batteries 2–3x faster</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Note for Himalaya Villas guests:</strong> All indoor areas are centrally heated. Thermal layers are needed for outdoor time only — the villa itself is warm from arrival.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-8 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-green-900">Plan Your Bhurban Snow Stay</h3>
              </div>
              
              <p className="text-green-800 mb-6">
                Tell us your dates, group size, and what you're planning — we'll handle the rest.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">WhatsApp: +92-304-567-9000</p>
                    <p className="text-green-700 text-sm">Open 9 AM – 10 PM | 15-minute response</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Flexible Booking</p>
                    <p className="text-green-700 text-sm">Snowfall Chaser package available</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Road Updates</p>
                    <p className="text-green-700 text-sm">Real-time road condition briefings</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Weather Alerts</p>
                    <p className="text-green-700 text-sm">Direct WhatsApp snowfall notifications</p>
                  </div>
                </div>
              </div>
              
              <Link href="/contact" className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center block mt-6">
                Plan Your Snow Trip Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your Murree Snowfall Experience</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Peak snowfall weekends (December–February) fill 3–4 weeks in advance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-[#c9a55b] hover:bg-[#b09452] text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
              <Phone className="inline-block w-5 h-5 mr-2" />
              WhatsApp: +92-304-567-9000
            </Link>
            <Link href="/packages" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all border border-white/30">
              View Winter Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Snowfall Pics Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Snowfall Pics: Bhurban & Murree Hills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional snowfall photography from Himalaya Villas Bhurban
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {snowfallImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
                <div className="aspect-w-16 aspect-h-12">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Luxury Winter Snowfall Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Himalaya Villas offers dedicated winter packages designed around the snowfall season
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">Best for: {pkg.bestFor}</p>
                <p className="text-gray-600 mb-4">Duration: {pkg.duration}</p>
                <p className="text-xl font-semibold text-[#c9a55b] mb-6">{pkg.price}</p>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/contact" className="w-full bg-[#c9a55b] hover:bg-[#b09452] text-white px-6 py-3 rounded-lg font-semibold transition-all text-center block">
                  Book This Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about snowfall in Murree
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-all border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Snowfall in Bhurban</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Private Villa. Mountain Views. No Crowds. Book your Bhurban winter stay direct.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-[#c9a55b] hover:bg-[#b09452] text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
              <Phone className="inline-block w-5 h-5 mr-2" />
              WhatsApp Now: +92-304-567-9000
            </Link>
            <Link href="/himalaya-villas-bhurban-murree-rest-house" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all border border-white/30">
              View Property Details
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
