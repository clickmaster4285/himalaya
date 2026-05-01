import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Mountain, 
  MapPin, 
  Users, 
  Shield, 
  Clock, 
  Star, 
  Heart, 
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  ChevronRight,
  Zap,
  Compass,
  TreePine,
  Flame,
  Camera
} from "lucide-react";

export const metadata: Metadata = {
  title: "Adventure Games Murree | Mountain Activities | Himalaya Villas Bhurban",
  description: "Adventure games and mountain activities in Murree at Himalaya Villas Bhurban. Enjoy thrilling outdoor adventures, guided hikes, zip-lining, rock climbing, and nature experiences for all ages. Book your adventure today!",
  keywords: "adventure games Murree, mountain activities Bhurban, outdoor adventures Murree Hills, Himalaya Villas adventure activities, zip-lining Murree, rock climbing Bhurban, hiking trails Murree, nature activities Pakistan",
  openGraph: {
    title: "Adventure Games Murree - Mountain Activities at Himalaya Villas",
    description: "Experience thrilling mountain adventures in Murree with guided activities, zip-lining, rock climbing, and nature experiences at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/adventure-games",
  },
  alternates: {
    canonical: "https://himalayavillas.com/adventure-games",
  },
};

const adventureServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Adventure & Outdoor Activities at Himalaya Villas",
  "description": "Thrilling mountain activities designed for safe fun. Explore the outdoors with guided adventures for all ages and skill levels in Bhurban, Murree Hills.",
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
  "serviceType": "Adventure Activities",
  "offers": {
    "@type": "Offer",
    "price": "10000",
    "priceCurrency": "PKR",
    "description": "Adventure activities starting from PKR 10,000"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function AdventureGamesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const activities = [
    {
      id: 1,
      title: "Guided Mountain Trekking",
      description: "Expert-led treks through Himalayan trails with stunning views and local wildlife spotting.",
      duration: "3-4 hours",
      difficulty: "Moderate",
      price: "8,000",
      image: "/assets/murree-forest-pines.jpg",
      category: "trekking",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Bonfire & Stargazing Nights",
      description: "Cozy bonfire evenings with storytelling, music, and guided stargazing in the clear mountain sky.",
      duration: "2-3 hours",
      difficulty: "Easy",
      price: "5,000",
      image: "/assets/journal-bonfire.jpg",
      category: "night",
      icon: <Flame className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Forest Adventure Games",
      description: "Team-building outdoor games, treasure hunts, and adventure challenges in pine forests.",
      duration: "2-3 hours",
      difficulty: "Easy",
      price: "6,000",
      image: "/assets/blog-bhurban-forest-nature-walk.png",
      category: "games",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Nature Photography Walks",
      description: "Guided photography tours capturing mountain landscapes, wildlife, and scenic viewpoints.",
      duration: "2-3 hours",
      difficulty: "Easy",
      price: "4,000",
      image: "/assets/gallery-sunlight.jpg",
      category: "nature",
      icon: <Camera className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Rock Climbing & Rappelling",
      description: "Safe rock climbing experiences with professional equipment and certified instructors.",
      duration: "4-5 hours",
      difficulty: "Advanced",
      price: "12,000",
      image: "/assets/murree-mountain-hero.jpg",
      category: "extreme",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Mountain Biking Trails",
      description: "Exciting biking trails through varied terrain with bikes and safety gear provided.",
      duration: "3-4 hours",
      difficulty: "Moderate",
      price: "7,000",
      image: "/assets/murree-sunrise-mountains.jpg",
      category: "sports",
      icon: <Compass className="w-6 h-6" />
    }
  ];

  const filteredActivities = activeTab === "all" 
    ? activities 
    : activities.filter(activity => activity.category === activeTab);

  const testimonials = [
    {
      name: "Ahmed Khan",
      text: "The guided trekking was amazing! Our guide was knowledgeable and the views were breathtaking.",
      rating: 5,
      activity: "Mountain Trekking"
    },
    {
      name: "Sarah Malik",
      text: "Bonfire night was magical! The kids loved the stories and the stargazing was incredible.",
      rating: 5,
      activity: "Bonfire Night"
    },
    {
      name: "Usman Ali",
      text: "Perfect team building experience! Our group had so much fun with the adventure games.",
      rating: 5,
      activity: "Adventure Games"
    }
  ];

  const faqs = [
    {
      question: "Are the adventure activities safe for beginners?",
      answer: "Yes! All our activities are designed with safety as the top priority. We provide professional guides, safety equipment, and thorough briefings for all skill levels."
    },
    {
      question: "What should I wear for adventure activities?",
      answer: "We recommend comfortable outdoor clothing, sturdy walking shoes, and weather-appropriate layers. We provide any specialized equipment needed for specific activities."
    },
    {
      question: "Can children participate in these activities?",
      answer: "Most activities are suitable for children aged 8 and above when accompanied by adults. We have family-friendly options with adjusted difficulty levels."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 24-48 hours in advance to ensure availability, especially for weekend activities and larger groups."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(adventureServiceSchema) }} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/assets/murree-snowy-peaks.jpg" 
            alt="Adventure Activities Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6 text-[#c9a55b]" />
              <span className="text-[#c9a55b] font-semibold tracking-wide">ADVENTURE & OUTDOOR FUN</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Thrilling Mountain Adventures
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience the ultimate outdoor adventures in the Himalayan foothills. From guided treks to bonfire nights, create unforgettable memories in nature's playground.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#c9a55b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#b8944a] transition">
                Book Adventure Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                View All Activities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-[#1b261b] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">15+</div>
            <div className="text-sm">Adventure Activities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">100%</div>
            <div className="text-sm">Safety Record</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">5000+</div>
            <div className="text-sm">Happy Adventurers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">24/7</div>
            <div className="text-sm">Expert Guides</div>
          </div>
        </div>
      </section>

      {/* Activities Filter */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Choose Your Adventure</h2>
            <p className="text-lg text-neutral-600">Select from our range of exciting outdoor activities</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'trekking', 'night', 'games', 'nature', 'extreme', 'sports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  activeTab === tab 
                    ? 'bg-[#c9a55b] text-white' 
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image 
                    src={activity.image} 
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    PKR {activity.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-[#c9a55b]">{activity.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900">{activity.title}</h3>
                  </div>
                  <p className="text-neutral-600 mb-4">{activity.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {activity.duration}
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">
                      {activity.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Equipment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Your Safety is Our Priority</h2>
              <p className="text-lg text-neutral-600 mb-8">
                All our adventure activities are conducted with the highest safety standards. 
                We provide professional equipment, certified guides, and comprehensive safety briefings.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">Professional Equipment</h3>
                    <p className="text-neutral-600">High-quality, regularly inspected gear for all activities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">Expert Guides</h3>
                    <p className="text-neutral-600">Certified professionals with extensive local knowledge</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">First Aid Ready</h3>
                    <p className="text-neutral-600">Medical support and emergency protocols in place</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/philosophy-interior.jpg" 
                alt="Safety Equipment"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Adventure Packages</h2>
            <p className="text-lg text-neutral-600">Choose the perfect package for your adventure needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border-2 border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Solo Explorer</h3>
              <div className="text-3xl font-bold text-[#c9a55b] mb-6">PKR 15,000</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>1 Activity of Choice</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Personal Guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Equipment Included</span>
                </li>
              </ul>
              <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition">
                Book Now
              </button>
            </div>
            
            <div className="bg-[#c9a55b] text-white rounded-xl p-8 transform scale-105">
              <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Group Adventure</h3>
              <div className="text-3xl font-bold mb-6">PKR 35,000</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>3 Activities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Group Guide (5-10 people)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Equipment & Snacks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Photography Service</span>
                </li>
              </ul>
              <button className="w-full bg-white text-[#c9a55b] py-3 rounded-lg font-semibold hover:bg-neutral-100 transition">
                Book Now
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-8 border-2 border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Family Package</h3>
              <div className="text-3xl font-bold text-[#c9a55b] mb-6">PKR 45,000</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Family-Friendly Activities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Up to 6 Members</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Kid-Friendly Options</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Meals Included</span>
                </li>
              </ul>
              <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">What Our Adventurers Say</h2>
            <p className="text-lg text-neutral-600">Real experiences from real customers</p>
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
                  <div className="text-sm text-neutral-500">{testimonial.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-[#1b261b] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Booking Process</h2>
            <p className="text-lg text-white/80">From inquiry to adventure in 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Choose Activity</h3>
              <p className="text-white/80 text-sm">Select your preferred adventure from our range</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Check Availability</h3>
              <p className="text-white/80 text-sm">Confirm dates and group size</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Secure Booking</h3>
              <p className="text-white/80 text-sm">Pay deposit and receive confirmation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Enjoy Adventure</h3>
              <p className="text-white/80 text-sm">Show up and experience the thrill!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600">Everything you need to know about our adventures</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-neutral-900 mb-3">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1b261b] to-[#2a342a] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join us for an unforgettable experience in the Himalayan foothills. 
            Book your adventure today and create memories that will last a lifetime.
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

      {/* Back Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/experiences" className="inline-flex items-center gap-2 text-[#c9a55b] font-semibold hover:text-[#6e5527] transition">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Experiences
          </Link>
        </div>
      </section>
    </div>
  );
}
