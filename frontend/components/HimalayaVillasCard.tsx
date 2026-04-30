"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Phone, Star, Calendar, Users, Wifi, Utensils, Car } from "lucide-react";

interface HimalayaVillasCardProps {
  className?: string;
}

export default function HimalayaVillasCard({ className = "" }: HimalayaVillasCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Card Header - Always Visible */}
      <div 
        className="bg-gradient-to-r from-[#1b261b] to-[#2a342a] text-white rounded-t-lg p-6 cursor-pointer hover:from-[#2a342a] hover:to-[#1b261b] transition-all duration-300"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#c9a55b]">
              Himalaya Villas Bhurban Murree Rest House
            </h2>
            <p className="text-lg text-gray-200">
              Pakistan's Premier Luxury Rest House & Private Villas
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#c9a55b]" />
                Bhurban, Murree Hills
              </span>
              <span className="flex items-center gap-1">
                <Car className="w-4 h-4 text-[#c9a55b]" />
                45 min from Islamabad
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#c9a55b]" />
                Luxury Private Villas
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-[#c9a55b]" />
            ) : (
              <ChevronDown className="w-6 h-6 text-[#c9a55b]" />
            )}
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div 
        className={`bg-white border-l border-r border-gray-200 overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isExpanded && (
          <div className="p-6">
            {/* Hero Section */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1b261b] mb-4">Private Mountain Luxury Experience</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Himalaya Villas is not a rest house in the conventional sense. It is a private luxury villa compound set within the pine-covered heights of Bhurban, Murree Hills - where every detail, from the panoramic mountain views to the personalized butler service, has been designed for guests who expect more than a room and a bed.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For families traveling from Islamabad, Rawalpindi, or Lahore - and for corporate teams seeking a high-altitude retreat that matches the caliber of their ambitions - Himalaya Villas represents a category of its own: the luxury private rest house that Bhurban has been missing.
              </p>
            </section>

            {/* Quick CTA */}
            <div className="bg-[#c9a55b] text-[#1b261b] p-6 rounded-lg mb-8">
              <h4 className="text-xl font-bold mb-3">Check Availability</h4>
              <p className="mb-4">Most weekends are fully reserved 2-3 weeks in advance.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://wa.me/923045679000" 
                  className="bg-[#1b261b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2a342a] transition-colors inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: +92-304-567-9000
                </a>
                <span className="flex items-center">Instant Response</span>
              </div>
            </div>

            {/* Key Features Grid */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1b261b] mb-6">Why Choose Himalaya Villas?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-[#c9a55b] p-2 rounded-full mt-1">
                    <Users className="w-5 h-5 text-[#1b261b]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1b261b]">Complete Privacy</h4>
                    <p className="text-gray-600 text-sm">Private villa exclusivity - no shared spaces with other guests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#c9a55b] p-2 rounded-full mt-1">
                    <Utensils className="w-5 h-5 text-[#1b261b]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1b261b]">Halal Certified</h4>
                    <p className="text-gray-600 text-sm">100% Halal kitchen - all meals, all times</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#c9a55b] p-2 rounded-full mt-1">
                    <Wifi className="w-5 h-5 text-[#1b261b]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1b261b]">Modern Amenities</h4>
                    <p className="text-gray-600 text-sm">High-speed WiFi, AC, heating, fireplace</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#c9a55b] p-2 rounded-full mt-1">
                    <Calendar className="w-5 h-5 text-[#1b261b]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1b261b]">Year-Round Access</h4>
                    <p className="text-gray-600 text-sm">All seasons including winter with snow views</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Package Overview */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1b261b] mb-6">Packages & Rates</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#c9a55b]">Family Mountain Escape</h4>
                  <p className="text-gray-600 text-sm">Families (4-8 guests) | 2-3 nights | PKR 80,000-150,000/stay</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#c9a55b]">Honeymoon & Couples Sanctuary</h4>
                  <p className="text-gray-600 text-sm">Couples | 2 nights | PKR 65,000-95,000/stay</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#c9a55b]">Corporate Retreat Package</h4>
                  <p className="text-gray-600 text-sm">Teams (10-50 guests) | 2 nights+ | PKR 180,000+ (10 pax)</p>
                </div>
              </div>
            </section>

            {/* FAQ Preview */}
            <section>
              <h3 className="text-xl font-bold text-[#1b261b] mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1b261b] mb-2">How far is Himalaya Villas from Islamabad?</h4>
                  <p className="text-gray-700 text-sm">Approximately 45-60 minutes by road from central Islamabad via M-1 Motorway and Murree road.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1b261b] mb-2">Is the food fully Halal?</h4>
                  <p className="text-gray-700 text-sm">Yes. All food preparation at Himalaya Villas is 100% Halal across all dining services.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#1b261b] mb-2">Can you accommodate corporate retreats?</h4>
                  <p className="text-gray-700 text-sm">Yes. We offer conference setup, AV equipment, group dining, and confidential private surroundings.</p>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <div className="mt-8 bg-[#1b261b] text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-3 text-[#c9a55b]">Ready to Book Your Stay?</h3>
              <p className="mb-4">Tell us your dates, group size, and occasion - we'll confirm availability instantly.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a 
                  href="https://wa.me/923045679000" 
                  className="bg-[#c9a55b] text-[#1b261b] px-6 py-2 rounded-lg font-semibold hover:bg-[#d4b06b] transition-colors inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Now
                </a>
                <a 
                  href="/contact" 
                  className="bg-white text-[#1b261b] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer - Always Visible */}
      <div className="bg-gradient-to-r from-[#1b261b] to-[#2a342a] text-white rounded-b-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-[#c9a55b]" />
              +92-304-567-9000
            </span>
            <span className="text-[#c9a55b]">|</span>
            <span>Bhurban, Murree Hills</span>
          </div>
          <button 
            onClick={toggleExpanded}
            className="text-[#c9a55b] hover:text-white transition-colors text-sm font-semibold"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
}
