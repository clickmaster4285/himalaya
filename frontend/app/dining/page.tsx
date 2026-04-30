"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { 
  Utensils, 
  Star, 
  Heart, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Coffee,
  ChefHat,
  Wine,
  Cake,
  Fish,
  Salad,
  Flame,
  Sparkles
} from "lucide-react";


export default function DiningPage() {
  const [selectedMenu, setSelectedMenu] = useState("all");

  const diningExperiences = [
    {
      id: "romantic",
      name: "Romantic Sunset Dinner",
      description: "Intimate dining experience with private chef, candlelight setup, and mountain sunset views.",
      price: "PKR 35,000",
      image: "/assets/blog-bhurban-terrace-dining-dusk.png",
      duration: "3 hours",
      capacity: "2 People",
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: "family",
      name: "Family Feast",
      description: "Multi-course family dining with kid-friendly options and comfortable private setting.",
      price: "PKR 25,000",
      image: "/assets/team-dinner1.webp",
      duration: "2-3 hours",
      capacity: "4-8 People",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: "corporate",
      name: "Executive Lunch",
      description: "Professional dining setup for business meetings with premium presentation and service.",
      price: "PKR 45,000",
      image: "/assets/blog-bhurban-pc-fine-dining-interior.png",
      duration: "2 hours",
      capacity: "6-12 People",
      icon: <Star className="w-6 h-6" />
    },
    {
      id: "celebration",
      name: "Celebration Banquet",
      description: "Grand dining experience for special occasions with custom menus and premium service.",
      price: "PKR 75,000",
      image: "/assets/wedding-reception-murree.png",
      duration: "4-5 hours",
      capacity: "10-30 People",
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  const menuCategories = [
    {
      id: "appetizers",
      name: "Appetizers",
      icon: <Coffee className="w-5 h-5" />,
      items: [
        "Mountain Greens Salad",
        "Smoked Salmon Platter",
        "Truffle Bruschetta",
        "Cheese & Charcuterie Board"
      ]
    },
    {
      id: "mains",
      name: "Main Courses",
      icon: <Utensils className="w-5 h-5" />,
      items: [
        "Grilled Himalayan Trout",
        "Prime Ribeye Steak",
        "Lamb Chops with Herbs",
        "Vegetarian Wellington"
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: <Cake className="w-5 h-5" />,
      items: [
        "Chocolate Soufflé",
        "Mountain Berry Tart",
        "Crème Brûlée",
        "Seasonal Fruit Medley"
      ]
    },
    {
      id: "beverages",
      name: "Beverages",
      icon: <Wine className="w-5 h-5" />,
      items: [
        "Premium Wine Selection",
        "Craft Cocktails",
        "Fresh Juices",
        "Mountain Spring Water"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Ahmed",
      text: "The sunset dinner was absolutely magical! The chef created a custom menu that exceeded our expectations.",
      rating: 5,
      experience: "Romantic Dinner"
    },
    {
      name: "The Khan Family",
      text: "Perfect family dining experience! Kids loved the food and the private setting made it so comfortable.",
      rating: 5,
      experience: "Family Feast"
    },
    {
      name: "Corporate Executive",
      text: "Impressive setup for our business lunch. Professional service and exceptional food quality.",
      rating: 5,
      experience: "Executive Lunch"
    }
  ];

  const filteredMenu = selectedMenu === "all" 
    ? menuCategories 
    : menuCategories.filter(cat => cat.id === selectedMenu);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        items={[
          {
            id: "hv-jsonld-dining-service",
            data: {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Private dining at Himalaya Villas and Resort",
              serviceType: "Curated in-villa dining and event catering",
              areaServed: "Bhurban, Murree, Pakistan",
            },
          },
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/gallery-dining-night.jpg" 
            alt="Luxury Dining in Bhurban"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-6 h-6 text-[#c9a55b]" />
              <span className="text-[#c9a55b] font-semibold tracking-wide">GOURMET DINING</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Luxury Dining in Bhurban
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience curated culinary journeys with private chefs, mountain views, and personalized service in the comfort of your villa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppBookingUrl("private dining experience")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c9a55b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#b8944a] transition"
              >
                Reserve Your Table
              </a>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1b261b] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">50+</div>
            <div className="text-sm">Gourmet Dishes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">4.9/5</div>
            <div className="text-sm">Dining Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">100%</div>
            <div className="text-sm">Private Settings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">24/7</div>
            <div className="text-sm">Chef Service</div>
          </div>
        </div>
      </section>

      {/* Dining Experiences */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Curated Dining Experiences</h2>
            <p className="text-lg text-neutral-600">Choose from our signature dining setups designed for every occasion</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diningExperiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image 
                    src={exp.image} 
                    alt={exp.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    PKR {exp.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-[#c9a55b]">{exp.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{exp.name}</h3>
                  </div>
                  <p className="text-neutral-600 mb-4 text-sm">{exp.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exp.duration}
                    </span>
                    <span>{exp.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Gourmet Menu</h2>
            <p className="text-lg text-neutral-600">Explore our curated selection of premium dishes</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'appetizers', 'mains', 'desserts', 'beverages'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedMenu(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedMenu === category 
                    ? 'bg-[#c9a55b] text-white' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMenu.map((category) => (
              <div key={category.id} className="bg-[#faf7f1] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[#c9a55b]">{category.icon}</div>
                  <h3 className="text-xl font-bold text-neutral-900">{category.name}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef & Service */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Expert Chefs & Premium Service</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our culinary team consists of expert chefs with years of experience in fine dining and international cuisine. 
                Each dish is prepared with the finest ingredients and presented with artistic precision.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Expert Chefs</h3>
                    <p className="text-sm text-neutral-600">Internationally trained culinary artists</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Premium Ingredients</h3>
                    <p className="text-sm text-neutral-600">Sourced from finest local suppliers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Custom Menus</h3>
                    <p className="text-sm text-neutral-600">Tailored to your preferences</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Wine className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Wine Pairing</h3>
                    <p className="text-sm text-neutral-600">Expert sommelier recommendations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/blog-bhurban-pc-fine-dining-interior.png" 
                alt="Fine Dining Interior"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Dining Experiences</h2>
            <p className="text-lg text-neutral-600">What our guests say about their dining journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#faf7f1] rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#c9a55b] fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">{testimonial.experience}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#c9a55b] to-[#b8944a] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Reserve Your Dining Experience</h2>
          <p className="text-xl text-white/90 mb-8">
            Let our culinary team create an unforgettable dining experience tailored to your preferences and special occasions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppBookingUrl("private dining reservation")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#c9a55b] px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              WhatsApp: +92 304 567 9000
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#c9a55b] transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Menu
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

