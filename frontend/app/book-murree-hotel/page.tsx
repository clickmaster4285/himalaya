"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  Heart, 
  Wifi,
  Car,
  Utensils,
  Coffee,
  Dumbbell,
  Bath,
  Shield,
  Clock,
  ChevronRight,
  Bed,
  Tv,
  Wind,
  Mountain
} from "lucide-react";

const hotelBookingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Book Murree Hotel - Himalaya Villas & Resorts",
  "description": "Luxury hotel booking in Murree with premium accommodations, world-class amenities, and breathtaking mountain views.",
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
  "serviceType": "Hotel Accommodation Booking",
  "offers": {
    "@type": "Offer",
    "price": "25000",
    "priceCurrency": "PKR",
    "description": "Luxury hotel rooms starting from PKR 25,000 per night"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function BookMurreeHotelPage() {
  const [selectedRoom, setSelectedRoom] = useState("deluxe");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(2);

  const roomTypes = [
    {
      id: "deluxe",
      name: "Deluxe Villa",
      price: "25,000",
      originalPrice: "35,000",
      image: "/assets/villa-alpine.jpg",
      features: ["King Size Bed", "Mountain View", "Mini Bar", "Work Desk"],
      size: "450 sq ft",
      capacity: "2 Adults",
      icon: <Bed className="w-5 h-5" />
    },
    {
      id: "presidential",
      name: "Presidential Suite",
      price: "45,000",
      originalPrice: "60,000",
      image: "/assets/villa-presidential.jpg",
      features: ["Master Bedroom", "Living Area", "Private Balcony", "Jacuzzi"],
      size: "850 sq ft",
      capacity: "4 Adults",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "honeymoon",
      name: "Honeymoon Villa",
      price: "35,000",
      originalPrice: "48,000",
      image: "/assets/villa-honeymoon.jpg",
      features: ["Romantic Setup", "Private Terrace", "Wine Bar", "Spa Bath"],
      size: "550 sq ft",
      capacity: "2 Adults",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "penthouse",
      name: "Penthouse Suite",
      price: "55,000",
      originalPrice: "75,000",
      image: "/assets/villa-penthouse.jpg",
      features: ["360° Views", "Private Kitchen", "Rooftop Access", "Butler Service"],
      size: "1200 sq ft",
      capacity: "6 Adults",
      icon: <Mountain className="w-5 h-5" />
    }
  ];

  const amenities = [
    { icon: <Wifi className="w-6 h-6" />, name: "High-Speed WiFi", description: "Complimentary high-speed internet throughout the property" },
    { icon: <Car className="w-6 h-6" />, name: "Valet Parking", description: "Secure valet parking service for all guests" },
    { icon: <Utensils className="w-6 h-6" />, name: "Fine Dining", description: "Multi-cuisine restaurants with mountain views" },
    { icon: <Coffee className="w-6 h-6" />, name: "Coffee Shop", description: "24/7 coffee shop and lounge area" },
    { icon: <Dumbbell className="w-6 h-6" />, name: "Fitness Center", description: "Modern gym with latest equipment" },
    { icon: <Bath className="w-6 h-6" />, name: "Spa & Wellness", description: "Full-service spa with massage treatments" }
  ];

  const testimonials = [
    {
      name: "Fatima Hassan",
      text: "Absolutely stunning property! The mountain views from our room were breathtaking. Service was impeccable.",
      rating: 5,
      roomType: "Presidential Suite"
    },
    {
      name: "Ahmed Raza",
      text: "Perfect honeymoon destination. The romantic setup and private terrace made our stay magical.",
      rating: 5,
      roomType: "Honeymoon Villa"
    },
    {
      name: "Sarah Khan",
      text: "Luxury at its finest! The penthouse suite exceeded all expectations. Will definitely return.",
      rating: 5,
      roomType: "Penthouse Suite"
    }
  ];

  const nearbyAttractions = [
    {
      name: "Patriata Chair Lift",
      distance: "15 minutes",
      description: "Scenic chair lift ride with panoramic views"
    },
    {
      name: "Kashmir Point",
      distance: "20 minutes", 
      description: "Famous viewpoint for stunning mountain vistas"
    },
    {
      name: "Mall Road Murree",
      distance: "25 minutes",
      description: "Shopping and dining in the heart of Murree"
    },
    {
      name: "Ayubia National Park",
      distance: "30 minutes",
      description: "Nature trails and wildlife sanctuary"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelBookingSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/murree-luxury-resort.jpg" 
            alt="Luxury Hotel in Murree"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-[#c9a55b]" />
              <span className="text-[#c9a55b] font-semibold tracking-wide">PREMIUM LUXURY HOTELS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Book Your Dream Stay in Murree
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience luxury and comfort in the heart of the Himalayan foothills. 
              Premium accommodations with world-class amenities and breathtaking mountain views.
            </p>
            
            {/* Quick Booking Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Check-in</label>
                  <input 
                    type="date" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/90 text-neutral-900 placeholder-neutral-500"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Check-out</label>
                  <input 
                    type="date" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/90 text-neutral-900 placeholder-neutral-500"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Guests</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-white/90 text-neutral-900"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-[#c9a55b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b8944a] transition">
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Stats */}
      <section className="bg-[#1b261b] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">50+</div>
            <div className="text-sm">Luxury Rooms</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">4.9/5</div>
            <div className="text-sm">Guest Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">15+</div>
            <div className="text-sm">Years Excellence</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">24/7</div>
            <div className="text-sm">Concierge Service</div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Choose Your Luxury Room</h2>
            <p className="text-lg text-neutral-600">Select from our premium accommodations designed for ultimate comfort</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomTypes.map((room) => (
              <div 
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedRoom === room.id ? 'ring-2 ring-[#c9a55b] transform scale-105' : 'hover:shadow-lg'
                }`}
              >
                <div className="relative h-48">
                  <Image 
                    src={room.image} 
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    -{Math.round((1 - parseInt(room.price.replace(',', '')) / parseInt(room.originalPrice.replace(',', ''))) * 100)}% OFF
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-[#c9a55b]">{room.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900">{room.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-[#c9a55b]">PKR {room.price}</span>
                    <span className="text-sm text-neutral-500 line-through">{room.originalPrice}</span>
                    <span className="text-xs text-neutral-500">/night</span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {room.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{room.size}</span>
                    <span>{room.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">World-Class Amenities</h2>
            <p className="text-lg text-neutral-600">Everything you need for a luxurious stay</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-[#c9a55b] text-white p-3 rounded-lg">
                  {amenity.icon}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">{amenity.name}</h3>
                  <p className="text-neutral-600 text-sm">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Simple Booking Process</h2>
            <p className="text-lg text-neutral-600">Reserve your luxury room in 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Select Dates</h3>
              <p className="text-neutral-600 text-sm">Choose your check-in and check-out dates</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bed className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Choose Room</h3>
              <p className="text-neutral-600 text-sm">Select from our luxury room options</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Secure Payment</h3>
              <p className="text-neutral-600 text-sm">Pay securely with our encrypted system</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Confirmation</h3>
              <p className="text-neutral-600 text-sm">Receive instant booking confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Special Offers & Packages</h2>
            <p className="text-lg text-neutral-600">Exclusive deals for your perfect stay</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#c9a55b] to-[#b8944a] text-white rounded-xl p-8">
              <div className="text-white/90 text-sm font-semibold mb-2">WEEKEND SPECIAL</div>
              <h3 className="text-2xl font-bold mb-4">Weekend Getaway</h3>
              <div className="text-3xl font-bold mb-4">Save 25%</div>
              <ul className="space-y-2 mb-6 text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>2 Nights Stay</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Complimentary Breakfast</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Late Checkout</span>
                </li>
              </ul>
              <button className="w-full bg-white text-[#c9a55b] py-3 rounded-lg font-semibold hover:bg-neutral-100 transition">
                Book Now
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-[#1b261b] to-[#2a342a] text-white rounded-xl p-8">
              <div className="text-white/90 text-sm font-semibold mb-2">ROMANCE PACKAGE</div>
              <h3 className="text-2xl font-bold mb-4">Honeymoon Special</h3>
              <div className="text-3xl font-bold mb-4">PKR 45,000</div>
              <ul className="space-y-2 mb-6 text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>3 Nights Honeymoon Villa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Romantic Dinner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Couples Spa Treatment</span>
                </li>
              </ul>
              <button className="w-full bg-white text-[#1b261b] py-3 rounded-lg font-semibold hover:bg-neutral-100 transition">
                Book Now
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 text-white rounded-xl p-8">
              <div className="text-white/90 text-sm font-semibold mb-2">FAMILY DEAL</div>
              <h3 className="text-2xl font-bold mb-4">Family Package</h3>
              <div className="text-3xl font-bold mb-4">Kids Stay Free</div>
              <ul className="space-y-2 mb-6 text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Connecting Rooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Kids Club Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Family Activities</span>
                </li>
              </ul>
              <button className="w-full bg-white text-neutral-900 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">What Our Guests Say</h2>
            <p className="text-lg text-neutral-600">Real experiences from our valued guests</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#c9a55b] fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">{testimonial.roomType}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Explore Nearby Attractions</h2>
            <p className="text-lg text-neutral-600">Discover the best of Murree and surrounding areas</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="bg-[#faf7f1] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-[#c9a55b]" />
                  <h3 className="font-bold text-neutral-900">{attraction.name}</h3>
                </div>
                <div className="text-sm text-[#c9a55b] font-semibold mb-2">{attraction.distance}</div>
                <p className="text-neutral-600 text-sm">{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1b261b] to-[#2a342a] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Luxury Stay?</h2>
          <p className="text-xl text-white/90 mb-8">
            Book your dream room at Himalaya Villas & Resorts and experience the perfect blend of luxury and nature.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#c9a55b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#b8944a] transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
