"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Utensils, 
  Mountain, 
  Palette, 
  Camera, 
  Star, 
  Heart, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  ChevronRight,
  Sparkles,
  Coffee,
  TreePine,
  Flame,
  Shield
} from "lucide-react";

const experiencesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Experiences at Himalaya Villas",
  "description": "Discover curated experiences at Himalaya Villas including private dining, adventure activities, creative workshops, and professional media services.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Private Chef & Dining Experiences",
        "description": "Personalized dining themes and curated food journeys",
        "url": "https://himalayavillas.com/experiences/dining"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Adventure & Outdoor Activities",
        "description": "Thrilling mountain activities designed for safe fun",
        "url": "https://himalayavillas.com/experiences/adventure"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Workshops & Creative Sessions",
        "description": "Hands-on workshops for teams, families, and creators",
        "url": "https://himalayavillas.com/experiences/creative"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Photography & Content Packages",
        "description": "Professional coverage for weddings and brand campaigns",
        "url": "https://himalayavillas.com/experiences/media"
      }
    }
  ]
};

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const experiences = [
    {
      slug: "dining",
      label: "DINING",
      title: "Private Chef & Dining Experiences",
      description: "Personalized dining themes and curated food journeys prepared by expert chefs in the comfort of your villa.",
      image: "/assets/gallery-dining-night.jpg",
      icon: <Utensils className="w-6 h-6" />,
      price: "From PKR 25,000",
      duration: "2-4 hours",
      category: "dining"
    },
    {
      slug: "adventure",
      label: "ADVENTURE",
      title: "Adventure & Outdoor Activities",
      description: "Thrilling mountain activities including guided trekking, bonfire nights, and nature walks designed for safe fun.",
      image: "/assets/journal-bonfire.jpg",
      icon: <Mountain className="w-6 h-6" />,
      price: "From PKR 10,000",
      duration: "2-5 hours",
      category: "adventure"
    },
    {
      slug: "creative",
      label: "CREATIVE",
      title: "Workshops & Creative Sessions",
      description: "Hands-on workshops for teams, families, and creators including art, music, photography, and team-building activities.",
      image: "/assets/gallery-sunlight.jpg",
      icon: <Palette className="w-6 h-6" />,
      price: "From PKR 15,000",
      duration: "3-6 hours",
      category: "creative"
    },
    {
      slug: "media",
      label: "MEDIA",
      title: "Photography & Content Packages",
      description: "Professional coverage for weddings, brand campaigns, and special events with drone and video services.",
      image: "/assets/gallery-reflection.jpg",
      icon: <Camera className="w-6 h-6" />,
      price: "From PKR 75,000",
      duration: "Full day",
      category: "media"
    }
  ];

  const featuredExperiences = [
    {
      title: "Romantic Sunset Dinner",
      description: "Intimate dining experience with private chef, candlelight setup, and mountain sunset views.",
      image: "/assets/blog-bhurban-terrace-dining-dusk.png",
      price: "PKR 35,000",
      rating: 5,
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "Family Adventure Day",
      description: "Complete day of activities including treasure hunt, nature walk, and bonfire evening.",
      image: "/assets/blog-bhurban-forest-nature-walk.png",
      price: "PKR 45,000",
      rating: 5,
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Corporate Creative Workshop",
      description: "Team-building workshop with art activities, problem-solving challenges, and collaborative projects.",
      image: "/assets/team-dinner1.webp",
      price: "PKR 55,000",
      rating: 5,
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      name: "Ayesha & Omar",
      text: "The private dining experience was absolutely magical! The chef created a custom menu that exceeded our expectations.",
      rating: 5,
      experience: "Private Dining"
    },
    {
      name: "Tech Team Pakistan",
      text: "Our corporate workshop was perfectly organized. The team returned more creative and connected than ever.",
      rating: 5,
      experience: "Creative Workshop"
    },
    {
      name: "The Ahmed Family",
      text: "The adventure day was the highlight of our vacation! Kids loved every activity and the guides were amazing.",
      rating: 5,
      experience: "Adventure Activities"
    }
  ];

  const filteredExperiences = activeCategory === "all" 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(experiencesSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/murree-sunrise-mountains.jpg" 
            alt="Experiences at Himalaya Villas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#c9a55b]" />
              <span className="text-[#c9a55b] font-semibold tracking-wide">CURATED EXPERIENCES</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Unforgettable Himalayan Experiences
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover curated activities and experiences designed to create lasting memories in the heart of the mountains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#c9a55b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#b8944a] transition">
                Explore All Experiences
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                Custom Experience
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
            <div className="text-sm">Unique Experiences</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">1000+</div>
            <div className="text-sm">Happy Guests</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">4.9/5</div>
            <div className="text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">24/7</div>
            <div className="text-sm">Experience Support</div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Featured Experiences</h2>
            <p className="text-lg text-neutral-600">Our most popular curated experiences</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredExperiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image 
                    src={exp.image} 
                    alt={exp.title}
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
                    <h3 className="text-xl font-bold text-neutral-900">{exp.title}</h3>
                  </div>
                  <p className="text-neutral-600 mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(exp.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#c9a55b] fill-current" />
                      ))}
                    </div>
                    <button className="text-[#c9a55b] font-semibold hover:underline">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Explore by Category</h2>
            <p className="text-lg text-neutral-600">Choose from our curated experience categories</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'dining', 'adventure', 'creative', 'media'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  activeCategory === category 
                    ? 'bg-[#c9a55b] text-white' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredExperiences.map((exp) => (
              <Link key={exp.slug} href={`/experiences/${exp.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image 
                    src={exp.image} 
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold">
                      {exp.label}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-[#c9a55b]">{exp.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#c9a55b] transition">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#c9a55b] font-semibold">{exp.price}</span>
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exp.duration}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Experiences */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why Choose Our Experiences</h2>
            <p className="text-lg text-neutral-600">Expertly curated activities with exceptional service</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-[#c9a55b] mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Expert Curation</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Each experience is carefully designed by experts to ensure maximum enjoyment and safety.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-[#c9a55b] mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Personalized Service</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Tailored experiences based on your preferences, group size, and special requirements.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-[#c9a55b] mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Safety First</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Professional equipment, certified guides, and comprehensive safety protocols for all activities.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-[#c9a55b] mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Memorable Moments</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Creating lasting memories with unique experiences that you'll cherish forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Guest Experiences</h2>
            <p className="text-lg text-neutral-600">What our guests say about their experiences</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create Your Perfect Experience</h2>
          <p className="text-xl text-white/90 mb-8">
            Let us help you design a customized experience that matches your interests and creates unforgettable memories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#c9a55b] px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#c9a55b] transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
