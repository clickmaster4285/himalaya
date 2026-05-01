import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Users, 
  Home, 
  TreePine, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Shield,
  Utensils,
  Car,
  Wifi,
  Baby,
  Gamepad2,
  Heart,
  Bed
} from "lucide-react";

export const metadata: Metadata = {
  title: "Family Hotels Murree | Kid-Friendly Hotels | Himalaya Villas Bhurban",
  description: "Family hotels in Murree with kid-friendly amenities, family suites, and children's activities at Himalaya Villas Bhurban. Safe environment, spacious rooms, family dining. Book your family vacation today!",
  keywords: "family hotels Murree, kid-friendly hotels Bhurban, family accommodation Murree Hills, children's activities Murree, family suites Himalaya Villas, safe family hotels Pakistan, family vacation Bhurban",
  openGraph: {
    title: "Family Hotels Murree - Kid-Friendly Hotels at Himalaya Villas",
    description: "Family-friendly hotels in Murree with kids' activities, family suites, and safe environment. Perfect family vacation at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/family-hotels-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/family-hotels-murree",
  },
};

const familyHotelSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Family Hotels in Murree - Himalaya Villas",
  "description": "Family-friendly accommodations in Murree with spacious villas, kids activities, and family dining options perfect for family vacations and getaways.",
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
  "serviceType": "Family Accommodation",
  "offers": {
    "@type": "Offer",
    "price": "75000",
    "priceCurrency": "PKR",
    "description": "Family villas starting from PKR 75,000 per night"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function FamilyHotelsMurreePage() {
  const [selectedPackage, setSelectedPackage] = useState("family");

  const familyPackages = [
    {
      id: "family",
      name: "Family Retreat Villa",
      description: "Spacious multi-bedroom villa perfect for families with children, featuring play areas and family dining.",
      price: "75,000",
      originalPrice: "95,000",
      image: "/assets/villa-presidential.jpg",
      features: [
        "3-4 Bedrooms",
        "Kids Play Area",
        "Family Dining Space",
        "Game Room",
        "Private Garden",
        "Kids Club Access"
      ],
      icon: <Home className="w-6 h-6" />,
      size: "1200 sq ft",
      capacity: "6-10 People"
    },
    {
      id: "deluxe",
      name: "Deluxe Family Suite",
      description: "Comfortable family suite with connecting rooms and family-friendly amenities for smaller families.",
      price: "55,000",
      originalPrice: "70,000",
      image: "/assets/villa-alpine.jpg",
      features: [
        "2 Connecting Rooms",
        "Kids Corner",
        "Mini Kitchen",
        "Balcony Views",
        "Family Entertainment",
        "Child Safety Features"
      ],
      icon: <Users className="w-6 h-6" />,
      size: "650 sq ft",
      capacity: "4-6 People"
    },
    {
      id: "premium",
      name: "Premium Family Estate",
      description: "Luxury family estate with multiple villas, private pool, and exclusive family activities.",
      price: "120,000",
      originalPrice: "150,000",
      image: "/assets/villa-presidential-real.jpg",
      features: [
        "2 Private Villas",
        "Swimming Pool",
        "Personal Chef",
        "Kids Activities",
        "Family Butler",
        "Private Transport"
      ],
      icon: <Star className="w-6 h-6" />,
      size: "2000 sq ft",
      capacity: "8-15 People"
    },
    {
      id: "budget",
      name: "Family Comfort Room",
      description: "Affordable family accommodation with essential amenities and access to family facilities.",
      price: "35,000",
      originalPrice: "45,000",
      image: "/assets/villa-alpine-real.jpg",
      features: [
        "Family Room",
        "Shared Facilities",
        "Kids Playground",
        "Breakfast Included",
        "Parking Space",
        "WiFi Access"
      ],
      icon: <Heart className="w-6 h-6" />,
      size: "400 sq ft",
      capacity: "4 People"
    }
  ];

  const familyActivities = [
    {
      title: "Kids Adventure Club",
      description: "Supervised activities including treasure hunts, nature walks, and educational games.",
      age: "4-12 years",
      image: "/assets/blog-bhurban-forest-nature-walk.png",
      icon: <Gamepad2 className="w-5 h-5" />
    },
    {
      title: "Family Nature Walks",
      description: "Guided forest walks perfect for families to explore nature together safely.",
      age: "All ages",
      image: "/assets/murree-forest-pines.jpg",
      icon: <TreePine className="w-5 h-5" />
    },
    {
      title: "Bonfire & Stories",
      description: "Evening bonfire with storytelling sessions and marshmallow roasting for families.",
      age: "All ages",
      image: "/assets/journal-bonfire.jpg",
      icon: <Star className="w-5 h-5" />
    },
    {
      title: "Indoor Game Room",
      description: "Climate-controlled game room with board games, video games, and family activities.",
      age: "5-16 years",
      image: "/assets/gallery-interior.jpg",
      icon: <Gamepad2 className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      name: "The Ahmed Family",
      text: "Perfect family vacation! The kids loved the play areas and we parents appreciated the spacious accommodation. Staff was very family-friendly.",
      rating: 5,
      package: "Family Retreat Villa"
    },
    {
      name: "Sarah & Family",
      text: "Our family weekend was amazing! The connecting rooms made it easy to keep an eye on the kids while having our own space.",
      rating: 5,
      package: "Deluxe Family Suite"
    },
    {
      name: "The Khan Family",
      text: "Best family resort in Murree! The kids activities kept children engaged while adults relaxed. Highly recommend for families.",
      rating: 5,
      package: "Premium Family Estate"
    }
  ];

  const familyAmenities = [
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Kids-Friendly",
      description: "Child-safe rooms, play areas, and supervised activities for children of all ages."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Family Dining",
      description: "Kid-friendly menus, high chairs, flexible meal times, and family-style dining."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Environment",
      description: "24/7 security, child-proof rooms, and safe play areas for complete peace of mind."
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Entertainment",
      description: "Game rooms, outdoor activities, and family entertainment options for all ages."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(familyHotelSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/gallery-garden.jpg" 
            alt="Family Hotels in Murree"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-green-300" />
              <span className="text-green-300 font-semibold tracking-wide">FAMILY GETAWAYS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Family Hotels in Murree
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover family-friendly accommodations with spacious rooms, kids activities, and family dining. 
              Perfect for family vacations, weekend getaways, and creating lasting memories together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition">
                Book Family Stay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
                View Family Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Family Stats */}
      <section className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-300 mb-2">1000+</div>
            <div className="text-sm">Happy Families</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-300 mb-2">4.8/5</div>
            <div className="text-sm">Family Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-300 mb-2">20+</div>
            <div className="text-sm">Kids Activities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-300 mb-2">24/7</div>
            <div className="text-sm">Family Support</div>
          </div>
        </div>
      </section>

      {/* Family Packages */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Family Accommodation Packages</h2>
            <p className="text-lg text-neutral-600">Choose the perfect family setup for your Murree getaway</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyPackages.map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedPackage === pkg.id ? 'ring-2 ring-green-500 shadow-lg transform scale-105' : 'shadow-md hover:shadow-lg'
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
                    <span className="text-green-600">Save {Math.round((1 - parseInt(pkg.price.replace(',', '')) / parseInt(pkg.originalPrice.replace(',', ''))) * 100)}%</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-green-500">{pkg.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{pkg.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">PKR {pkg.price}</div>
                    <div className="text-sm text-neutral-500 line-through">{pkg.originalPrice}</div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">{pkg.description}</p>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{pkg.size}</span>
                    <span>{pkg.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Family Activities & Fun</h2>
            <p className="text-lg text-neutral-600">Exciting activities for the whole family to enjoy together</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                <div className="relative h-40">
                  <Image 
                    src={activity.image} 
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-green-600">
                    {activity.age}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-green-500">{activity.icon}</div>
                    <h3 className="text-lg font-bold text-neutral-900">{activity.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Amenities */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Family-Friendly Amenities</h2>
            <p className="text-lg text-neutral-600">Everything designed for family comfort and convenience</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyAmenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <div className="text-green-500 mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{amenity.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Families */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Perfect For Every Family</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our family accommodations are designed to meet the needs of modern families, providing comfort, safety, and entertainment for all ages.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Weekend Family Getaways</h3>
                    <p className="text-neutral-600">Escape the city for quality family time with activities everyone will enjoy.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Summer Family Vacations</h3>
                    <p className="text-neutral-600">Beat the heat in the mountains with family-friendly activities and comfortable stays.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Special Family Occasions</h3>
                    <p className="text-neutral-600">Celebrate birthdays, anniversaries, and family milestones in style.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/blog-family-tour-featured-banner.png" 
                alt="Family Enjoying Resort"
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Happy Families</h2>
            <p className="text-lg text-neutral-600">Real experiences from families who stayed with us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-green-500 fill-current" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Easy Family Booking</h2>
            <p className="text-lg text-neutral-600">Plan your family vacation in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Choose Dates</h3>
              <p className="text-neutral-600 text-sm">Select your family vacation dates</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Family Size</h3>
              <p className="text-neutral-600 text-sm">Tell us about your family</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Select Package</h3>
              <p className="text-neutral-600 text-sm">Choose family accommodation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Enjoy Vacation</h3>
              <p className="text-neutral-600 text-sm">Create family memories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Family Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Plan the perfect family getaway in the mountains of Murree with activities and accommodations for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call: +92 304 567 9000
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
