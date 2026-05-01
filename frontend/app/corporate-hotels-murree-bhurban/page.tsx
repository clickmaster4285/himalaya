import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Building, 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Shield,
  Wifi,
  Car,
  Coffee,
  Award,
  Target,
  Briefcase,
  Monitor,
  Video,
  Presentation,
  Trophy,
  Headphones,
  Utensils,
  Bed,
  TreePine,
  Sunset
} from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Hotels Murree Bhurban | Business Meetings | Himalaya Villas",
  description: "Corporate hotels in Murree Bhurban for business meetings, conferences, and corporate retreats. Premium facilities, conference rooms, team building activities at Himalaya Villas. Book your corporate event.",
  keywords: "corporate hotels Murree, business hotels Bhurban, corporate retreats Murree, conference facilities Bhurban, business meetings Murree Hills, team building Pakistan, corporate events Himalaya Villas",
  openGraph: {
    title: "Corporate Hotels Murree Bhurban - Business Meetings at Himalaya Villas",
    description: "Premium corporate hotels in Murree Bhurban with conference facilities, business meeting rooms, and corporate retreat packages at Himalaya Villas.",
    type: "website",
    url: "https://himalayavillas.com/corporate-hotels-murree-bhurban",
  },
  alternates: {
    canonical: "https://himalayavillas.com/corporate-hotels-murree-bhurban",
  },
};

const corporateHotelSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Corporate Hotels in Murree Bhurban - Himalaya Villas",
  "description": "Premium corporate hotels in Murree Bhurban with business facilities, conference rooms, executive accommodations, and professional services for corporate events and meetings.",
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
  "serviceType": "Corporate Accommodation",
  "offers": {
    "@type": "Offer",
    "price": "85000",
    "priceCurrency": "PKR",
    "description": "Corporate hotel packages starting from PKR 85,000 per night"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function CorporateHotelsMurreeBhurbanPage() {
  const [selectedHotel, setSelectedHotel] = useState("executive");

  const corporateHotels = [
    {
      id: "executive",
      name: "Executive Business Hotel",
      description: "Premium business hotel with state-of-the-art conference facilities and executive accommodations for corporate professionals.",
      price: "85,000",
      originalPrice: "110,000",
      image: "/assets/villa-presidential.jpg",
      features: [
        "Executive Boardroom",
        "High-Speed WiFi",
        "Business Center",
        "24/7 Room Service",
        "Airport Transfer",
        "Dedicated Staff"
      ],
      icon: <Building className="w-6 h-6" />,
      rooms: "50 Executive Rooms",
      capacity: "100 Guests",
      rating: "4.9/5"
    },
    {
      id: "conference",
      name: "Conference Center Hotel",
      description: "Full-service conference hotel with multiple meeting rooms, banquet halls, and comprehensive event management services.",
      price: "120,000",
      originalPrice: "150,000",
      image: "/assets/conference1.webp",
      features: [
        "5 Conference Halls",
        "AV Equipment",
        "Catering Services",
        "Event Planning",
        "Parking for 100 Cars",
        "Technical Support"
      ],
      icon: <Monitor className="w-6 h-6" />,
      rooms: "80 Conference Rooms",
      capacity: "500 Guests",
      rating: "4.8/5"
    },
    {
      id: "luxury",
      name: "Luxury Corporate Resort",
      description: "Ultra-luxury resort with premium amenities, spa facilities, and exclusive services for high-level corporate delegations.",
      price: "180,000",
      originalPrice: "220,000",
      image: "/assets/murree-luxury-resort.jpg",
      features: [
        "Presidential Suites",
        "Private Meeting Spaces",
        "Butler Service",
        "Executive Spa",
        "Helicopter Pad",
        "VIP Security"
      ],
      icon: <Award className="w-6 h-6" />,
      rooms: "30 Luxury Suites",
      capacity: "60 VIP Guests",
      rating: "5.0/5"
    },
    {
      id: "budget",
      name: "Corporate Budget Hotel",
      description: "Affordable corporate accommodation with essential business facilities and comfortable rooms for corporate teams on budget.",
      price: "45,000",
      originalPrice: "60,000",
      image: "/assets/villa-alpine.jpg",
      features: [
        "Standard Business Rooms",
        "Basic WiFi",
        "Meeting Room Access",
        "Continental Breakfast",
        "Parking Available",
        "24/7 Reception"
      ],
      icon: <Briefcase className="w-6 h-6" />,
      rooms: "40 Budget Rooms",
      capacity: "80 Guests",
      rating: "4.5/5"
    }
  ];

  const businessFacilities = [
    {
      title: "Conference Rooms",
      description: "State-of-the-art meeting spaces with advanced audiovisual equipment and flexible seating arrangements.",
      image: "/assets/conference2.webp",
      icon: <Presentation className="w-5 h-5" />
    },
    {
      title: "Business Center",
      description: "Fully equipped business center with high-speed internet, printing, and secretarial services.",
      image: "/assets/gallery-interior.jpg",
      icon: <Monitor className="w-5 h-5" />
    },
    {
      title: "Executive Lounge",
      description: "Exclusive lounge for business executives with premium amenities and networking opportunities.",
      image: "/assets/why-villa-lounge.jpg",
      icon: <Coffee className="w-5 h-5" />
    },
    {
      title: "Video Conferencing",
      description: "Professional video conferencing facilities with global connectivity and technical support.",
      image: "/assets/gallery-exterior.jpg",
      icon: <Video className="w-5 h-5" />
    }
  ];

  const corporateServices = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Event Planning",
      description: "Professional event planning and coordination for corporate meetings, conferences, and special events."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Corporate Catering",
      description: "Customized catering services with gourmet menus for business meetings and corporate events."
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Transport Services",
      description: "Airport transfers, corporate transportation, and chauffeur services for business delegates."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Services",
      description: "24/7 security and VIP protection services for high-profile corporate guests and events."
    }
  ];

  const testimonials = [
    {
      name: "Muhammad Ali Khan",
      company: "Tech Solutions Pakistan",
      text: "Excellent corporate facilities! The conference rooms were well-equipped and the staff was extremely professional. Our annual conference was a huge success.",
      rating: 5,
      hotel: "Executive Business Hotel"
    },
    {
      name: "Sarah Johnson",
      company: "Global Marketing Ltd.",
      text: "Perfect venue for our corporate retreat. The combination of business facilities and natural setting created an ideal environment for strategic planning.",
      rating: 5,
      hotel: "Conference Center Hotel"
    },
    {
      name: "Ahmed Hassan",
      company: "Finance Corporation",
      text: "Outstanding service and facilities. The luxury resort exceeded our expectations for hosting our international business partners.",
      rating: 5,
      hotel: "Luxury Corporate Resort"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateHotelSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/conference1.webp" 
            alt="Corporate Hotels in Murree Bhurban"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-6 h-6 text-blue-300" />
              <span className="text-blue-300 font-semibold tracking-wide">CORPORATE EXCELLENCE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Corporate Hotels in Murree Bhurban
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Premier business hotels with world-class conference facilities, executive accommodations, 
              and professional services designed for corporate success in the heart of the mountains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                Book Corporate Stay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                View Facilities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Stats */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8">
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">15+</div>
            <div className="text-sm">Corporate Hotels</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">1000+</div>
            <div className="text-sm">Corporate Events</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">4.8/5</div>
            <div className="text-sm">Business Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
            <div className="text-sm">Business Support</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <div className="text-center">
              <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-xs text-blue-700 font-semibold">Modern Facilities</span>
            </div>
          </div>
          <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <div className="text-center">
              <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-xs text-blue-700 font-semibold">Tech Ready</span>
            </div>
          </div>
          <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-xs text-blue-700 font-semibold">Award Winning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Hotels */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Corporate Hotel Options</h2>
            <p className="text-lg text-neutral-600">Choose from our selection of business-friendly accommodations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateHotels.map((hotel) => (
              <div 
                key={hotel.id}
                onClick={() => setSelectedHotel(hotel.id)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedHotel === hotel.id ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' : 'shadow-md hover:shadow-lg'
                }`}
              >
                <div className="relative h-48">
                  <Image 
                    src={hotel.image} 
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    <span className="text-blue-600">Save {Math.round((1 - parseInt(hotel.price.replace(',', '')) / parseInt(hotel.originalPrice.replace(',', ''))) * 100)}%</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-blue-500">{hotel.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{hotel.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">PKR {hotel.price}</div>
                    <div className="text-sm text-neutral-500 line-through">{hotel.originalPrice}</div>
                    <div className="text-xs text-blue-600 font-semibold">{hotel.rating}</div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">{hotel.description}</p>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{hotel.rooms}</span>
                    <span>{hotel.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Facilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Business Facilities</h2>
            <p className="text-lg text-neutral-600">State-of-the-art facilities for corporate success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessFacilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                <div className="relative h-40">
                  <Image 
                    src={facility.image} 
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-blue-500">{facility.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900">{facility.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Services */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Corporate Services</h2>
            <p className="text-lg text-neutral-600">Comprehensive services for business travelers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="relative h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-blue-500">{service.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Corporate */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Perfect For Corporate Events</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our corporate hotels are designed to meet the diverse needs of modern businesses, 
                providing the perfect environment for success and growth.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Business Conferences</h3>
                    <p className="text-neutral-600">Professional conference facilities with advanced technology and support services.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Corporate Training</h3>
                    <p className="text-neutral-600">Dedicated training rooms and comfortable accommodations for corporate programs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Award Ceremonies</h3>
                    <p className="text-neutral-600">Elegant venues and professional services for corporate recognition events.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/banquet-hall-murree.png" 
                alt="Corporate Event Hall"
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Corporate Client Testimonials</h2>
            <p className="text-lg text-neutral-600">What our corporate clients say about us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <span className="text-xs text-blue-700 font-semibold">Corporate Client</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-blue-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-bold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{testimonial.company}</div>
                    <div className="text-xs text-blue-600 mt-1">{testimonial.hotel}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Corporate Booking Process</h2>
            <p className="text-lg text-neutral-600">Simple and efficient booking for corporate clients</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Select Dates</h3>
              <p className="text-neutral-600 text-sm">Choose your corporate event dates</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Choose Hotel</h3>
              <p className="text-neutral-600 text-sm">Select your preferred corporate hotel</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Specify Needs</h3>
              <p className="text-neutral-600 text-sm">Detail your business requirements</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Confirm Booking</h3>
              <p className="text-neutral-600 text-sm">Receive confirmation and details</p>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-blue-700 font-semibold">Conference</span>
              </div>
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <Coffee className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-blue-700 font-semibold">Business</span>
              </div>
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <Wifi className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-blue-700 font-semibold">Connected</span>
              </div>
            </div>
            <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs text-blue-700 font-semibold">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Corporate Event?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let our professional team help you organize the perfect corporate event or business stay in the beautiful mountains of Murree.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Corporate Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
