import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Star, 
  Sparkles, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Shield,
  Crown,
  Wine,
  Car,
  Wifi,
  Bed,
  Utensils,
  Heart,
  Building
} from "lucide-react";

export const metadata: Metadata = {
  title: "5-Star Luxury Hotel Murree | Premium Suites | World-Class Service | Himalaya Villas",
  description: "5-star luxury hotel in Murree with premium suites and world-class service at Himalaya Villas Bhurban. Elegant accommodations, fine dining, spa services. Experience ultimate luxury hospitality in Murree Hills.",
  keywords: "5-star hotel Murree, luxury suites Bhurban, premium hotel Murree Hills, world-class hospitality Pakistan, deluxe accommodation Himalaya Villas, upscale rooms Murree, high-end suites Bhurban",
  openGraph: {
    title: "Luxury Hotel Murree - 5-Star Premium Accommodation at Himalaya Villas",
    description: "Experience ultimate luxury at our 5-star hotel in Murree with premium suites, fine dining, and world-class amenities at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/luxury-hotel-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/luxury-hotel-murree",
  },
};

const luxuryHotelSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Luxury Hotel in Murree - Himalaya Villas",
  "description": "Ultra-luxury accommodations in Murree with premium suites, butler service, fine dining, and exclusive amenities for discerning travelers.",
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
  "serviceType": "Luxury Accommodation",
  "offers": {
    "@type": "Offer",
    "price": "120000",
    "priceCurrency": "PKR",
    "description": "Luxury suites starting from PKR 120,000 per night"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function LuxuryHotelMurreePage() {
  const [selectedSuite, setSelectedSuite] = useState("presidential");

  const luxurySuites = [
    {
      id: "presidential",
      name: "Presidential Suite",
      description: "Ultimate luxury suite with panoramic mountain views, private butler service, and exclusive amenities.",
      price: "120,000",
      originalPrice: "150,000",
      image: "/assets/villa-presidential.jpg",
      features: [
        "Private Butler Service",
        "360° Mountain Views",
        "Private Jacuzzi & Spa",
        "Home Theater System",
        "Personal Chef Available",
        "Helicopter Transfer Option"
      ],
      icon: <Crown className="w-6 h-6" />,
      size: "1500 sq ft",
      capacity: "4 Adults"
    },
    {
      id: "royal",
      name: "Royal Villa",
      description: "Exclusive two-bedroom villa with private pool, garden, and royal treatment services.",
      price: "95,000",
      originalPrice: "120,000",
      image: "/assets/villa-presidential-real.jpg",
      features: [
        "Private Swimming Pool",
        "Royal Garden Access",
        "Two Master Suites",
        "Private Dining Room",
        "Dedicated Staff",
        "Premium Bar Setup"
      ],
      icon: <Star className="w-6 h-6" />,
      size: "2000 sq ft",
      capacity: "6 Adults"
    },
    {
      id: "penthouse",
      name: "Sky Penthouse",
      description: "Rooftop penthouse with outdoor terrace, infinity pool, and breathtaking sunset views.",
      price: "85,000",
      originalPrice: "110,000",
      image: "/assets/villa-penthouse.jpg",
      features: [
        "Rooftop Infinity Pool",
        "360° Views",
        "Outdoor Lounge",
        "Gourmet Kitchen",
        "Wine Cellar Access",
        "Concierge Service"
      ],
      icon: <Sparkles className="w-6 h-6" />,
      size: "1200 sq ft",
      capacity: "4 Adults"
    },
    {
      id: "executive",
      name: "Executive Suite",
      description: "Sophisticated business luxury suite with office space, meeting facilities, and premium services.",
      price: "75,000",
      originalPrice: "95,000",
      image: "/assets/villa-alpine.jpg",
      features: [
        "Private Office Space",
        "Meeting Room Setup",
        "High-Speed Internet",
        "Business Lounge Access",
        "Premium Workstation",
        "Secretary Services"
      ],
      icon: <Building className="w-6 h-6" />,
      size: "800 sq ft",
      capacity: "2 Adults"
    }
  ];

  const luxuryServices = [
    {
      title: "Personal Butler",
      description: "24/7 dedicated butler service for all your needs and requests.",
      image: "/assets/gallery-interior.jpg",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Private Chef",
      description: "Personal chef creating gourmet meals tailored to your preferences.",
      image: "/assets/blog-bhurban-terrace-dining-dusk.png",
      icon: <Utensils className="w-5 h-5" />
    },
    {
      title: "Luxury Transport",
      description: "Private helicopter, luxury vehicles, and chauffeur services available.",
      image: "/assets/gallery-exterior.jpg",
      icon: <Car className="w-5 h-5" />
    },
    {
      title: "Spa & Wellness",
      description: "Exclusive spa treatments, massage therapy, and wellness programs.",
      image: "/assets/gallery-sunlight.jpg",
      icon: <Heart className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      name: "Mr. Ahmed Khan",
      text: "The presidential suite exceeded all expectations. The butler service and attention to detail were simply outstanding. Truly 5-star luxury.",
      rating: 5,
      suite: "Presidential Suite",
      title: "CEO, Tech Corporation"
    },
    {
      name: "Mrs. Sarah Malik",
      text: "Our royal villa experience was magical. Every moment was filled with luxury and comfort. The private pool and garden were absolutely stunning.",
      rating: 5,
      suite: "Royal Villa",
      title: "Business Owner"
    },
    {
      name: "Mr. Omar Shah",
      text: "The sky penthouse offers the most breathtaking views I've ever seen. Perfect for a romantic getaway with unparalleled luxury.",
      rating: 5,
      suite: "Sky Penthouse",
      title: "Investment Banker"
    }
  ];

  const luxuryAmenities = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Butler Service",
      description: "Personal butler available 24/7 for all your needs and requests."
    },
    {
      icon: <Wine className="w-8 h-8" />,
      title: "Premium Bar",
      description: "Fully stocked premium bar with finest wines and spirits."
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Luxury Transport",
      description: "Private vehicles, helicopter transfers, and chauffeur services."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Exclusive Privacy",
      description: "Complete privacy with exclusive access and high-level security."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(luxuryHotelSchema) }} />
      
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-purple-300" />
              <span className="text-purple-300 font-semibold tracking-wide">ULTRA LUXURY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Luxury Hotel in Murree
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience unparalleled luxury with premium suites, personal butler service, fine dining, 
              and exclusive amenities in the heart of the Himalayan mountains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition">
                Book Luxury Suite
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Stats */}
      <section className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-300 mb-2">5-Star</div>
            <div className="text-sm">Luxury Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-300 mb-2">100%</div>
            <div className="text-sm">Exclusive Privacy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-300 mb-2">24/7</div>
            <div className="text-sm">Butler Service</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-300 mb-2">VIP</div>
            <div className="text-sm">Experience</div>
          </div>
        </div>
      </section>

      {/* Luxury Suites */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Exclusive Luxury Suites</h2>
            <p className="text-lg text-neutral-600">Choose from our collection of ultra-luxury accommodations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxurySuites.map((suite) => (
              <div 
                key={suite.id}
                onClick={() => setSelectedSuite(suite.id)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedSuite === suite.id ? 'ring-2 ring-purple-500 shadow-lg transform scale-105' : 'shadow-md hover:shadow-lg'
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
                    <span className="text-purple-600">Save {Math.round((1 - parseInt(suite.price.replace(',', '')) / parseInt(suite.originalPrice.replace(',', ''))) * 100)}%</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-purple-500">{suite.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{suite.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">PKR {suite.price}</div>
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

      {/* Luxury Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Exclusive Luxury Services</h2>
            <p className="text-lg text-neutral-600">Premium services designed for discerning guests</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                <div className="relative h-40">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-purple-500">{service.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Amenities */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Unmatched Luxury Amenities</h2>
            <p className="text-lg text-neutral-600">Every detail crafted for the ultimate luxury experience</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryAmenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <div className="text-purple-500 mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{amenity.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Luxury Travelers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">For the Discerning Traveler</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our luxury accommodations are designed for those who expect nothing less than perfection, 
                offering unparalleled comfort, privacy, and personalized service.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Business Executives</h3>
                    <p className="text-neutral-600">Premium suites with office space, high-speed internet, and business services.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Romantic Getaways</h3>
                    <p className="text-neutral-600">Intimate luxury suites with romantic setups and exclusive experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Luxury Seekers</h3>
                    <p className="text-neutral-600">Ultimate luxury experiences with butler service and premium amenities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/murree-snowy-peaks.jpg" 
                alt="Luxury Mountain View"
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Elite Guest Experiences</h2>
            <p className="text-lg text-neutral-600">Testimonials from our distinguished guests</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-purple-500 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">{testimonial.title}</div>
                  <div className="text-xs text-purple-600 mt-1">{testimonial.suite}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Exclusive Booking Process</h2>
            <p className="text-lg text-neutral-600">Personalized service from inquiry to check-in</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Personal Consultation</h3>
              <p className="text-neutral-600 text-sm">Dedicated luxury consultant</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Suite Selection</h3>
              <p className="text-neutral-600 text-sm">Choose your luxury suite</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Customization</h3>
              <p className="text-neutral-600 text-sm">Personalize your experience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Luxury Arrival</h3>
              <p className="text-neutral-600 text-sm">VIP check-in experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Ultimate Luxury</h2>
          <p className="text-xl text-white/90 mb-8">
            Allow us to create an unforgettable luxury experience tailored to your exact specifications in the pristine mountains of Murree.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              VIP Line: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
