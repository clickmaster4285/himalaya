"use client";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Package, 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Shield,
  Utensils,
  Car,
  Wifi,
  Bed,
  Heart,
  TreePine,
  Coffee,
  Sunset,
  Sparkles,
  ArrowRight,
  Mountain,
  Camera
} from "lucide-react";

import villaInterior from "@/public/assets/villa-interior.jpg";
import villaTerrace from "@/public/images/villas/lux-complete4.jpg";
import VillasAccommodations from "@/components/VillasAccommodations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hotelPackagesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Murree Hotel Packages - Himalaya Villas",
  "description": "All-inclusive hotel packages in Murree with accommodation, dining, activities, and transport options for families, couples, and corporate groups.",
  "provider": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort",
    "telephone": "+92 304 567 9000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhurban",
      "addressLocality": "Murree",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    }
  },
  "serviceType": "Hotel Packages",
  "offers": {
    "@type": "Offer",
    "price": "45000",
    "priceCurrency": "PKR",
    "description": "All-inclusive packages starting from PKR 45,000 per night"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function MurreeHotelPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState("weekend");

  const hotelPackages = [
    {
      id: "weekend",
      name: "Weekend Escape Package",
      description: "Perfect 2-day weekend getaway with accommodation, meals, and activities for couples and small families.",
      price: "45,000",
      originalPrice: "65,000",
      duration: "2 Nights",
      image: "/assets/gallery-exterior.jpg",
      features: [
        "2 Nights Luxury Accommodation",
        "Daily Breakfast & Dinner",
        "Guided Nature Walk",
        "Bonfire Evening",
        "Welcome Drinks",
        "Late Checkout"
      ],
      icon: <Sunset className="w-6 h-6" />,
      includes: "2 Adults",
      bestFor: "Couples & Small Families"
    },
    {
      id: "family",
      name: "Family Fun Package",
      description: "Complete family vacation package with kids activities, family dining, and entertainment for all ages.",
      price: "85,000",
      originalPrice: "120,000",
      duration: "3 Nights",
      image: "/assets/blog-family-tour-featured-banner.png",
      features: [
        "3 Nights Family Villa",
        "All Meals Included",
        "Kids Club Activities",
        "Family Game Night",
        "Mountain Picnic",
        "Airport Transfer"
      ],
      icon: <Users className="w-6 h-6" />,
      includes: "2 Adults + 2 Kids",
      bestFor: "Families with Children"
    },
    {
      id: "honeymoon",
      name: "Honeymoon Paradise Package",
      description: "Romantic honeymoon package with luxury suite, private dining, spa treatments, and romantic experiences.",
      price: "125,000",
      originalPrice: "180,000",
      duration: "3 Nights",
      image: "/assets/villa-honeymoon-real.jpg",
      features: [
        "3 Nights Honeymoon Suite",
        "Candlelight Dinners",
        "Couples Spa Treatment",
        "Romantic Room Setup",
        "Photography Session",
        "Champagne & Chocolates"
      ],
      icon: <Heart className="w-6 h-6" />,
      includes: "2 Adults",
      bestFor: "Newlyweds & Couples"
    },
    {
      id: "corporate",
      name: "Corporate Retreat Package",
      description: "All-inclusive corporate package with meeting facilities, team activities, and executive accommodation.",
      price: "180,000",
      originalPrice: "250,000",
      duration: "2 Nights",
      image: "/assets/conference1.webp",
      features: [
        "2 Nights Executive Suites",
        "Meeting Room Access",
        "Team Building Activities",
        "All Meals & Coffee",
        "Presentation Equipment",
        "Business Center Access"
      ],
      icon: <Shield className="w-6 h-6" />,
      includes: "10-15 People",
      bestFor: "Corporate Teams"
    },
    {
      id: "adventure",
      name: "Adventure Seeker Package",
      description: "Action-packed adventure package with hiking, outdoor activities, and nature experiences for thrill-seekers.",
      price: "65,000",
      originalPrice: "90,000",
      duration: "3 Nights",
      image: "/assets/blog-bhurban-forest-nature-walk.png",
      features: [
        "3 Nights Adventure Lodge",
        "Guided Mountain Trek",
        "Bonfire & BBQ Night",
        "Adventure Sports",
        "Nature Photography",
        "Equipment Provided"
      ],
      icon: <TreePine className="w-6 h-6" />,
      includes: "2-4 Adults",
      bestFor: "Adventure Enthusiasts"
    },
    {
      id: "wellness",
      name: "Wellness & Spa Package",
      description: "Relaxing wellness package with spa treatments, yoga sessions, healthy meals, and meditation activities.",
      price: "95,000",
      originalPrice: "130,000",
      duration: "3 Nights",
      image: "/assets/gallery-sunlight.jpg",
      features: [
        "3 Nights Spa Suite",
        "Daily Spa Treatment",
        "Yoga & Meditation",
        "Healthy Gourmet Meals",
        "Wellness Consultation",
        "Fitness Center Access"
      ],
      icon: <Sparkles className="w-6 h-6" />,
      includes: "2 Adults",
      bestFor: "Wellness Seekers"
    }
  ];

  const seasonalOffers = [
    {
      title: "Summer Special",
      description: "Beat the heat with our summer package including extra activities and extended stay options.",
      discount: "25% OFF",
      valid: "June - August",
      image: "/assets/dining-outdoor.jpg"
    },
    {
      title: "Winter Wonderland",
      description: "Experience magical winter with snow activities, hot beverages, and cozy fireplace evenings.",
      discount: "30% OFF",
      valid: "December - February",
      image: "/assets/murree-snowy-peaks.jpg"
    },
    {
      title: "Spring Blossom",
      description: "Enjoy spring flowers and pleasant weather with special outdoor activities and nature walks.",
      discount: "20% OFF",
      valid: "March - May",
      image: "/assets/gallery-reflection.jpg"
    }
  ];

  const testimonials = [
    {
      name: "The Malik Family",
      text: "The family package was perfect! Kids loved the activities and we parents enjoyed the relaxation. Everything was well-organized.",
      rating: 5,
      package: "Family Fun Package"
    },
    {
      name: "Ayesha & Omar",
      text: "Our honeymoon package exceeded expectations! The romantic setup, spa treatments, and private dining were absolutely magical.",
      rating: 5,
      package: "Honeymoon Paradise Package"
    },
    {
      name: "Tech Corp Team",
      text: "Excellent corporate retreat package! Meeting facilities were professional and team activities really helped us bond.",
      rating: 5,
      package: "Corporate Retreat Package"
    }
  ];

  const packageBenefits = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "All-Inclusive",
      description: "One price covers accommodation, meals, and selected activities."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Best Value",
      description: "Save up to 35% compared to booking individual services."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Hassle-Free",
      description: "Everything arranged for you - just arrive and enjoy."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Experience",
      description: "Curated experiences with top-rated services and amenities."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbf7ee]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelPackagesSchema) }} />
      <Navbar />
   
   
<section className="relative min-h-[780px] overflow-hidden pt-36 md:pt-44">
  {/* Background */}
  <div className="absolute inset-0">
    <Image
      src={villaTerrace}
      alt="Himalaya Villas Terrace"
      fill
      priority
      className="object-cover"
    />

    <div className="absolute inset-0 bg-black/55" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/55" />
  </div>

  {/* Content */}
<div className="relative z-10 flex min-h-[780px] items-center justify-center px-6 pb-20">
  <div className="mx-auto max-w-5xl text-center">
    {/* Label */}
    <div className="mb-8 flex items-center justify-center gap-4">
      <div className="h-px w-16 bg-[#c9a55b]" />

      <span className="text-xs font-medium uppercase tracking-[0.4em] text-[#d4b46a]">
        Exclusive Hotel Packages
      </span>

      <div className="h-px w-16 bg-[#c9a55b]" />
    </div>

    {/* Heading */}
    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-white">
      Luxury Packages{" "}
      <span className="font-light text-[#c9a55b]">
        in Murree Hills
      </span>
    </h1>

    {/* Content */}
    <div className="mx-auto mt-8 max-w-3xl">
      {/* Description */}
      <p className="text-base md:text-xl leading-8 text-white/80">
        Discover thoughtfully curated stays featuring elegant villas,
        breathtaking mountain views, private dining experiences, and
        exceptional hospitality for every occasion.
      </p>

      {/* Buttons */}
      <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
        <a
          href="#packages"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9a55b] px-10 py-4 font-semibold text-[#1b1b1b] transition-all duration-300 hover:bg-[#b8944a]"
        >
          View Packages
          <ArrowRight className="h-5 w-5" />
        </a>

        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-10 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
        >
          <Phone className="h-5 w-5" />
          Contact Us
        </a>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4">
        {[
          ["15+", "Luxury Villas"],
          ["24/7", "Concierge"],
          ["100%", "Private Stay"],
          ["4.9★", "Guest Rating"],
        ].map(([value, label]) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-light text-[#c9a55b]">
              {value}
            </div>

            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


  
</section>





    
    
<VillasAccommodations />


      {/* Package Benefits with Primary Colors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#a68b3b] mb-3 font-medium">
              Benefits
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b] mb-4">
              Why Choose Our Packages
            </h2>
            <div className="w-16 h-1 bg-[#c9a55b] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packageBenefits.map((benefit, index) => (
              <div key={index} className="bg-[#fbf7ee] rounded-2xl p-8 border border-[#e5dfcf] hover:border-[#c9a55b] transition">
                <div className="text-[#c9a55b] mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#1b1b1b] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-[#fbf7ee]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#a68b3b] mb-3 font-medium">
              Special Offers
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b] mb-4">
              Seasonal Specials
            </h2>
            <div className="w-16 h-1 bg-[#c9a55b] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {seasonalOffers.map((offer, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#e5dfcf] hover:shadow-xl transition">
                <div className="relative h-56">
                  <Image 
                    src={offer.image} 
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#c9a55b] text-[#1b1b1b] px-4 py-1.5 rounded-lg text-sm font-bold">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1b1b1b] mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Valid: {offer.valid}</span>
                  
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Every Traveler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#a68b3b] mb-3 font-medium">
                For Everyone
              </p>
              <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b] mb-6">
                Perfect For Every Traveler
              </h2>
              <div className="w-16 h-1 bg-[#c9a55b] mb-6"></div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our packages are designed to meet different travel needs, ensuring everyone finds their perfect Murree experience.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#fbf7ee] text-[#c9a55b] p-3 rounded-xl border border-[#e5dfcf]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1b1b1b] mb-1">Family Vacations</h3>
                    <p className="text-gray-600 text-sm">Kid-friendly activities, family accommodations, and meals for all ages.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#fbf7ee] text-[#c9a55b] p-3 rounded-xl border border-[#e5dfcf]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1b1b1b] mb-1">Romantic Getaways</h3>
                    <p className="text-gray-600 text-sm">Intimate settings, romantic dinners, and special experiences for couples.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#fbf7ee] text-[#c9a55b] p-3 rounded-xl border border-[#e5dfcf]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1b1b1b] mb-1">Corporate Groups</h3>
                    <p className="text-gray-600 text-sm">Business facilities, team activities, and professional services.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-[#e5dfcf]">
              <Image 
                src={villaInterior}
                alt="Villa Interior Experience"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-sm font-semibold">Experience luxury in every detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#fbf7ee]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#a68b3b] mb-3 font-medium">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b] mb-4">
              What Our Guests Say
            </h2>
            <div className="w-16 h-1 bg-[#c9a55b] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-[#e5dfcf] hover:border-[#c9a55b] transition">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#c9a55b] fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-[#1b1b1b]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.package}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#a68b3b] mb-3 font-medium">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b] mb-4">
              Simple Package Booking
            </h2>
            <div className="w-16 h-1 bg-[#c9a55b] mx-auto"></div>
            <p className="text-gray-600 mt-4">Book your complete Murree experience in 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Calendar />, title: "Select Package", desc: "Choose your ideal package" },
              { icon: <Users />, title: "Group Details", desc: "Provide guest information" },
              { icon: <Package />, title: "Customize", desc: "Add special requests" },
              { icon: <CheckCircle />, title: "Confirm", desc: "Receive confirmation" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#fbf7ee] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#e5dfcf] text-[#c9a55b]">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[#1b1b1b] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1b1b1b] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-gradient-to-l from-[#c9a55b] to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display mb-6">
            Ready for Your <span className="text-[#c9a55b]">Murree Adventure</span>?
          </h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed">
            Let our team help you choose the perfect package for an unforgettable 
            Murree experience with significant savings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923045679000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c9a55b] text-[#1b1b1b] px-8 py-4 rounded-lg font-semibold hover:bg-[#b8944a] transition flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call: +92 304 567 9000
            </a>
            <a
              href="mailto:info@himalayavillas.com"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              Email Packages
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}