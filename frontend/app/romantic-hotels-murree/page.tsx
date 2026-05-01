import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Heart, 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Sparkles,
  Coffee,
  TreePine,
  Sunset,
  Flame,
  Bed,
  Camera,
  Wine,
  Home,
  Building
} from "lucide-react";

export const metadata: Metadata = {
  title: "Romantic Hotels Murree | Couples Retreat | Honeymoon Hotels | Himalaya Villas",
  description: "Romantic hotels in Murree for couples and honeymoon at Himalaya Villas Bhurban. Private suites, romantic dining, couples spa services, intimate settings. Perfect for romantic getaways and anniversaries.",
  keywords: "romantic hotels Murree, couples retreat Bhurban, honeymoon hotels Murree Hills, romantic getaways Pakistan, couples spa services, intimate hotels Himalaya Villas, anniversary packages Murree, romantic dining Bhurban",
  openGraph: {
    title: "Romantic Hotels Murree - Couples Retreat at Himalaya Villas",
    description: "Romantic hotels in Murree with private suites, couples spa, romantic dining, and intimate settings perfect for honeymoons and romantic getaways at Himalaya Villas.",
    type: "website",
    url: "https://himalayavillas.com/romantic-hotels-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/romantic-hotels-murree",
  },
};

const romanticHotelSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Romantic Hotels in Murree - Himalaya Villas",
  "description": "Luxury romantic accommodations in Murree with private suites, mountain views, and intimate dining experiences perfect for couples and honeymooners.",
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
  "serviceType": "Romantic Accommodation",
  "offers": {
    "@type": "Offer",
    "price": "65000",
    "priceCurrency": "PKR",
    "description": "Romantic honeymoon suites starting from PKR 65,000 per night"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function RomanticHotelsMurreePage() {
  const [selectedSuite, setSelectedSuite] = useState("honeymoon");

  const romanticSuites = [
    {
      id: "honeymoon",
      name: "Honeymoon Sanctuary",
      description: "Ultimate romantic retreat with private terrace, jacuzzi, and panoramic mountain views designed for newlyweds.",
      price: "65,000",
      originalPrice: "85,000",
      image: "/assets/villa-honeymoon.jpg",
      features: [
        "King Size Bed with Premium Linens",
        "Private Jacuzzi & Spa Bath",
        "Romantic Terrace Setup",
        "Champagne & Chocolates Welcome",
        "Couples Spa Treatment",
        "Private Butler Service"
      ],
      icon: <Heart className="w-6 h-6" />,
      size: "550 sq ft",
      capacity: "2 Adults"
    },
    {
      id: "deluxe",
      name: "Deluxe Romance Suite",
      description: "Elegant suite with fireplace, mountain views, and intimate dining area perfect for romantic getaways.",
      price: "45,000",
      originalPrice: "60,000",
      image: "/assets/villa-alpine.jpg",
      features: [
        "Cozy Fireplace",
        "Mountain View Balcony",
        "In-Room Dining Area",
        "Premium Mini Bar",
        "Romantic Lighting",
        "24/7 Room Service"
      ],
      icon: <Sparkles className="w-6 h-6" />,
      size: "450 sq ft",
      capacity: "2 Adults"
    },
    {
      id: "presidential",
      name: "Presidential Romance Villa",
      description: "Luxurious two-bedroom villa with private pool, garden, and exclusive services for the ultimate romantic escape.",
      price: "95,000",
      originalPrice: "120,000",
      image: "/assets/villa-presidential.jpg",
      features: [
        "Private Swimming Pool",
        "Personal Garden",
        "Two Master Suites",
        "Private Kitchen",
        "Home Theater System",
        "Dedicated Staff"
      ],
      icon: <Star className="w-6 h-6" />,
      size: "1200 sq ft",
      capacity: "2-4 Adults"
    },
    {
      id: "penthouse",
      name: "Sky Romance Penthouse",
      description: "Rooftop penthouse with 360° views, outdoor terrace, and luxury amenities for unforgettable romantic moments.",
      price: "75,000",
      originalPrice: "95,000",
      image: "/assets/villa-penthouse.jpg",
      features: [
        "360° Mountain Views",
        "Rooftop Terrace",
        "Outdoor Hot Tub",
        "Private Lounge",
        "Gourmet Kitchen",
        "Concierge Service"
      ],
      icon: <Sunset className="w-6 h-6" />,
      size: "850 sq ft",
      capacity: "2 Adults"
    }
  ];

  const romanticExperiences = [
    {
      title: "Sunset Dinner for Two",
      description: "Intimate candlelit dinner on your private terrace with gourmet cuisine and mountain sunset views.",
      price: "PKR 25,000",
      image: "/assets/blog-bhurban-terrace-dining-dusk.png",
      icon: <Sunset className="w-5 h-5" />
    },
    {
      title: "Couples Spa Retreat",
      description: "Rejuvenating spa treatments for two including massage therapy and wellness rituals.",
      price: "PKR 30,000",
      image: "/assets/gallery-sunlight.jpg",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      title: "Romantic Nature Walk",
      description: "Guided nature walk through pine forests with picnic setup and photography session.",
      price: "PKR 15,000",
      image: "/assets/blog-bhurban-forest-nature-walk.png",
      icon: <TreePine className="w-5 h-5" />
    },
    {
      title: "Private Movie Night",
      description: "Outdoor movie screening under the stars with cozy blankets and gourmet snacks.",
      price: "PKR 20,000",
      image: "/assets/journal-bonfire.jpg",
      icon: <Camera className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      name: "Ayesha & Omar",
      text: "Our honeymoon was absolutely magical! The suite was perfect, the service impeccable, and the mountain views breathtaking. Best decision ever!",
      rating: 5,
      suite: "Honeymoon Sanctuary"
    },
    {
      name: "Sarah & Ahmed",
      text: "Celebrated our anniversary here and it exceeded all expectations. The romantic dinner setup was incredibly thoughtful and beautiful.",
      rating: 5,
      suite: "Deluxe Romance Suite"
    },
    {
      name: "Fatima & Ali",
      text: "The perfect romantic getaway! Private, luxurious, and so romantic. We felt like we were in paradise. Highly recommend for couples!",
      rating: 5,
      suite: "Presidential Romance Villa"
    }
  ];

  const amenities = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Romantic Setup",
      description: "Rose petals, candles, and romantic decorations in your suite upon arrival."
    },
    {
      icon: <Wine className="w-8 h-8" />,
      title: "Premium Bar",
      description: "Selection of fine wines, champagne, and premium spirits in your private bar."
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "In-Room Dining",
      description: "24/7 private dining service with gourmet meals delivered to your suite."
    },
    {
      icon: <Bed className="w-8 h-8" />,
      title: "Luxury Bedding",
      description: "Premium king-size beds with Egyptian cotton linens and plush pillows."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(romanticHotelSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/murree-sunset-mountains.jpg" 
            alt="Romantic Hotels in Murree"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-pink-800/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-300" />
              <span className="text-pink-300 font-semibold tracking-wide">ROMANTIC ESCAPES</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Romantic Hotels in Murree
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover intimate luxury suites with mountain views, private terraces, and personalized service. 
              Perfect for honeymoons, anniversaries, and romantic getaways in the heart of the Himalayas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition">
                Book Romantic Suite
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition">
                View Suites
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Romantic Stats */}
      <section className="bg-pink-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8">
            <div>
              <div className="text-3xl font-bold text-pink-300 mb-2">500+</div>
              <div className="text-sm">Romantic Stays</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-300 mb-2">4.9/5</div>
              <div className="text-sm">Couples Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-300 mb-2">100%</div>
              <div className="text-sm">Privacy Guaranteed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-300 mb-2">24/7</div>
              <div className="text-sm">Romantic Service</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <span className="text-xs text-pink-700 font-semibold">Romantic Setup</span>
              </div>
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
              <div className="text-center">
                <Sunset className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <span className="text-xs text-pink-700 font-semibold">Sunset Views</span>
              </div>
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
              <div className="text-center">
                <TreePine className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <span className="text-xs text-pink-700 font-semibold">Nature Walks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Romantic Suites */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Romantic Suites & Villas</h2>
            <p className="text-lg text-neutral-600">Choose from our collection of intimate luxury accommodations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {romanticSuites.map((suite) => (
              <div 
                key={suite.id}
                onClick={() => setSelectedSuite(suite.id)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedSuite === suite.id ? 'ring-2 ring-pink-500 shadow-lg transform scale-105' : 'shadow-md hover:shadow-lg'
                }`}
              >
                <div className="relative h-48">
                  <Image 
                    src={suite.image} 
                    alt={suite.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    <span className="text-pink-600">Save {Math.round((1 - parseInt(suite.price.replace(',', '')) / parseInt(suite.originalPrice.replace(',', ''))) * 100)}%</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-pink-500">{suite.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{suite.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-pink-600 mb-1">PKR {suite.price}</div>
                    <div className="text-sm text-neutral-500 line-through">{suite.originalPrice}</div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">{suite.description}</p>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{suite.size}</span>
                    <span>{suite.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Romantic Experiences */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Romantic Experiences</h2>
            <p className="text-lg text-neutral-600">Curated activities and services for unforgettable moments</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {romanticExperiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                <div className="relative h-40">
                  <Image 
                    src={exp.image} 
                    alt={exp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-pink-600">
                    {exp.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-pink-500">{exp.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900">{exp.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Romantic Amenities */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Romantic Amenities</h2>
            <p className="text-lg text-neutral-600">Every detail designed for romance and intimacy</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="relative h-32 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                  <div className="text-pink-500">{amenity.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{amenity.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Perfect For Every Romantic Occasion</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our romantic suites and experiences are designed to create unforgettable memories for every special moment in your journey together.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Honeymoon & Newlyweds</h3>
                    <p className="text-neutral-600">Start your forever in paradise with our specially curated honeymoon packages and romantic setups.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Anniversary Celebrations</h3>
                    <p className="text-neutral-600">Rekindle the romance with special anniversary packages including dinner, flowers, and surprises.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-lg">
                    <Sunset className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Romantic Getaways</h3>
                    <p className="text-neutral-600">Escape to the mountains for quality time together in our private, luxurious suites.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/villa-honeymoon-real.jpg" 
                alt="Romantic Suite Interior"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Love Stories</h2>
            <p className="text-lg text-neutral-600">Real experiences from couples who found romance here</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-32 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <span className="text-xs text-pink-700 font-semibold">Happy Couple</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-pink-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-bold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{testimonial.suite}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Simple Booking Process</h2>
            <p className="text-lg text-neutral-600">From inquiry to romantic getaway in 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Select Dates</h3>
              <p className="text-neutral-600 text-sm">Choose your romantic escape dates</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Choose Suite</h3>
              <p className="text-neutral-600 text-sm">Select your perfect romantic suite</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Add Experiences</h3>
              <p className="text-neutral-600 text-sm">Customize romantic activities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Confirm & Enjoy</h3>
              <p className="text-neutral-600 text-sm">Receive confirmation and enjoy</p>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <Building className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <span className="text-xs text-pink-700 font-semibold">Resort</span>
              </div>
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <Star className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <span className="text-xs text-pink-700 font-semibold">Luxury</span>
              </div>
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <TreePine className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <span className="text-xs text-pink-700 font-semibold">Mountains</span>
              </div>
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <Sunset className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <span className="text-xs text-pink-700 font-semibold">Valley</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Romantic Escape?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let us create the perfect romantic getaway for you and your loved one in the beautiful mountains of Murree.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
