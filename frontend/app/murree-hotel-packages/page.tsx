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
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Murree Hotel Packages | All-Inclusive Deals | Holiday Packages | Himalaya Villas",
  description: "Murree hotel packages with all-inclusive deals, holiday packages, and special offers at Himalaya Villas Bhurban. Family packages, honeymoon deals, corporate retreats. Best rates guaranteed!",
  keywords: "Murree hotel packages, all-inclusive hotel deals Murree, holiday packages Bhurban, family vacation packages Murree Hills, honeymoon packages Himalaya Villas, corporate retreat packages Pakistan, weekend getaways Murree",
  openGraph: {
    title: "Murree Hotel Packages - All-Inclusive Deals at Himalaya Villas",
    description: "Best hotel packages in Murree with all-inclusive deals, family packages, honeymoon offers, and corporate retreat packages at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/murree-hotel-packages",
  },
  alternates: {
    canonical: "https://himalayavillas.com/murree-hotel-packages",
  },
};

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
      image: "/assets/murree-summer.jpg"
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
      image: "/assets/murree-spring.jpg"
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
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelPackagesSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/murree-panoramic-view.jpg" 
            alt="Murree Hotel Packages"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6 text-blue-300" />
              <span className="text-blue-300 font-semibold tracking-wide">ALL-INCLUSIVE PACKAGES</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Murree Hotel Packages
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our curated all-inclusive packages with accommodation, dining, activities, and transport. 
              Perfect for families, couples, corporate groups, and adventure seekers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                View All Packages
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Custom Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Package Stats */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">6+</div>
            <div className="text-sm">Package Options</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">35%</div>
            <div className="text-sm">Average Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">2000+</div>
            <div className="text-sm">Happy Guests</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300 mb-2">4.9/5</div>
            <div className="text-sm">Package Rating</div>
          </div>
        </div>
      </section>

      {/* Hotel Packages */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">All-Inclusive Hotel Packages</h2>
            <p className="text-lg text-neutral-600">Choose the perfect package for your Murree getaway</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelPackages.map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedPackage === pkg.id ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' : 'shadow-md hover:shadow-lg'
                }`}
              >
                <div className="relative h-48">
                  <Image 
                    src={pkg.image} 
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    <span className="text-blue-600">Save {Math.round((1 - parseInt(pkg.price.replace(',', '')) / parseInt(pkg.originalPrice.replace(',', ''))) * 100)}%</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-blue-500">{pkg.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{pkg.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">PKR {pkg.price}</div>
                    <div className="text-sm text-neutral-500 line-through">{pkg.originalPrice}</div>
                    <div className="text-xs text-blue-600 font-semibold">{pkg.duration}</div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">{pkg.description}</p>
                  <div className="mb-4">
                    <div className="text-xs text-neutral-500 mb-2">Includes:</div>
                    <ul className="space-y-1">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-neutral-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500 border-t pt-2">
                    <span>{pkg.includes}</span>
                    <span className="text-blue-600 font-semibold">{pkg.bestFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why Choose Our Packages</h2>
            <p className="text-lg text-neutral-600">Benefits of our all-inclusive hotel packages</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packageBenefits.map((benefit, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <div className="text-blue-500 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Seasonal Special Offers</h2>
            <p className="text-lg text-neutral-600">Limited-time packages with extra savings</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {seasonalOffers.map((offer, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image 
                    src={offer.image} 
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{offer.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Valid: {offer.valid}</span>
                    <button className="text-blue-600 font-semibold text-sm hover:underline">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Every Traveler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Perfect For Every Traveler</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our packages are designed to meet different travel needs, ensuring everyone finds their perfect Murree experience.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Family Vacations</h3>
                    <p className="text-neutral-600">Kid-friendly activities, family accommodations, and meals for all ages.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Romantic Getaways</h3>
                    <p className="text-neutral-600">Intimate settings, romantic dinners, and special experiences for couples.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Corporate Groups</h3>
                    <p className="text-neutral-600">Business facilities, team activities, and professional services.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/team-dinner1.webp" 
                alt="Group Enjoying Package"
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Package Experiences</h2>
            <p className="text-lg text-neutral-600">What our guests say about our packages</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">{testimonial.package}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Simple Package Booking</h2>
            <p className="text-lg text-neutral-600">Book your complete Murree experience in 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Select Package</h3>
              <p className="text-neutral-600 text-sm">Choose your ideal package</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Group Details</h3>
              <p className="text-neutral-600 text-sm">Provide guest information</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Customize</h3>
              <p className="text-neutral-600 text-sm">Add special requests</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Confirm & Enjoy</h3>
              <p className="text-neutral-600 text-sm">Receive confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Murree Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let our team help you choose the perfect package for an unforgettable Murree experience with significant savings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Packages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
