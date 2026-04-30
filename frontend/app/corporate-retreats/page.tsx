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
  Users, 
  Briefcase, 
  Target, 
  Award, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Star,
  Shield,
  Clock,
  ChevronRight,
  Building,
  Coffee,
  Wifi,
  Car
} from "lucide-react";

export default function CorporateRetreatsPage() {
  const [selectedPackage, setSelectedPackage] = useState("executive");

  const retreatPackages = [
    {
      id: "executive",
      name: "Executive Leadership Retreat",
      duration: "2-3 Days",
      teamSize: "5-15 People",
      price: "180,000",
      features: [
        "Private Villa Accommodation",
        "Executive Meeting Room",
        "All Meals In-Villa",
        "Strategy Facilitation",
        "Team Building Activities"
      ],
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      id: "team",
      name: "Team Cohesion Retreat",
      duration: "3-4 Days",
      teamSize: "10-25 People",
      price: "250,000",
      features: [
        "Multiple Villas",
        "Conference Facilities",
        "Adventure Activities",
        "Evening Entertainment",
        "Professional Photography"
      ],
      icon: <Users className="w-6 h-6" />
    },
    {
      id: "strategy",
      name: "Strategic Planning Offsite",
      duration: "4-5 Days",
      teamSize: "8-20 People",
      price: "320,000",
      features: [
        "Board Room Setup",
        "Presentation Equipment",
        "One-on-One Coaching",
        "Wellness Activities",
        "Gala Dinner Event"
      ],
      icon: <Target className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Complete Privacy",
      description: "Exclusive venue ensures confidential discussions and strategic planning without external interruptions."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Enhanced Focus",
      description: "Mountain environment away from city distractions improves team concentration and decision-making quality."
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Premium Hospitality",
      description: "Executive-level accommodation and dining services that maintain professional standards throughout."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Measurable Outcomes",
      description: "Structured retreat programs designed to deliver specific business objectives and team alignment goals."
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      company: "Tech Solutions Ltd.",
      text: "The private villa setup was perfect for our executive strategy sessions. The team achieved more in 3 days than in 3 months of office meetings.",
      rating: 5
    },
    {
      name: "Sarah Malik",
      company: "Global Marketing Inc.",
      text: "Outstanding experience! The combination of professional facilities and natural setting created the ideal environment for our team building retreat.",
      rating: 5
    },
    {
      name: "Omar Khan",
      company: "Finance Partners",
      text: "From planning to execution, everything was handled professionally. Our leadership team returned with clear action items and renewed focus.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        items={[
          {
            id: "hv-jsonld-corporate-service",
            data: {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Corporate retreats at Himalaya Villas and Resort",
              serviceType: "Executive offsite and retreat hosting",
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
            src="/assets/conference1.webp" 
            alt="Corporate Retreat Venue"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-6 h-6 text-[#c9a55b]" />
              <span className="text-[#c9a55b] font-semibold tracking-wide">EXECUTIVE RETREATS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Corporate Retreats in Bhurban
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Transform your team's performance in a private mountain setting. 
              Executive-level venues designed for strategic planning, leadership development, and team cohesion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppBookingUrl("corporate retreat inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c9a55b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#b8944a] transition"
              >
                Plan Your Retreat
              </a>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                View Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1b261b] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">200+</div>
            <div className="text-sm">Corporate Events Hosted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">95%</div>
            <div className="text-sm">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">10+</div>
            <div className="text-sm">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c9a55b] mb-2">24/7</div>
            <div className="text-sm">Support Team</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why Himalaya Villas for Corporate Retreats</h2>
            <p className="text-lg text-neutral-600">Premium facilities designed for executive success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <div className="text-[#c9a55b] mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retreat Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Corporate Retreat Packages</h2>
            <p className="text-lg text-neutral-600">Tailored solutions for different team sizes and objectives</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {retreatPackages.map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`bg-white rounded-xl p-8 border-2 cursor-pointer transition-all ${
                  selectedPackage === pkg.id ? 'border-[#c9a55b] shadow-lg transform scale-105' : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[#c9a55b]">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-neutral-900">{pkg.name}</h3>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-[#c9a55b] mb-2">PKR {pkg.price}</div>
                  <div className="text-sm text-neutral-500">{pkg.duration} | {pkg.teamSize}</div>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition">
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-[#faf7f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Executive Facilities</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our corporate retreat venues are equipped with everything needed for productive executive sessions and comfortable stays.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">High-Speed Internet</h3>
                    <p className="text-sm text-neutral-600">Fiber connectivity throughout</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Executive Dining</h3>
                    <p className="text-sm text-neutral-600">Gourmet meals in-villa</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Transport Services</h3>
                    <p className="text-sm text-neutral-600">Airport transfers available</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#c9a55b] text-white p-2 rounded-lg">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">24/7 Security</h3>
                    <p className="text-sm text-neutral-600">Professional security team</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96">
              <Image 
                src="/assets/conference2.webp" 
                alt="Conference Facilities"
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Success Stories</h2>
            <p className="text-lg text-neutral-600">What our corporate clients say about their retreat experience</p>
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
                  <div className="text-sm text-neutral-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-[#1b261b] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Planning Process</h2>
            <p className="text-lg text-white/80">From inquiry to successful retreat execution</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Consultation</h3>
              <p className="text-white/80 text-sm">Discuss your retreat goals and requirements</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Custom Planning</h3>
              <p className="text-white/80 text-sm">Tailored program design and schedule</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Execution</h3>
              <p className="text-white/80 text-sm">Professional facilitation and support</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#c9a55b] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">Follow-up</h3>
              <p className="text-white/80 text-sm">Post-retreat support and evaluation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#c9a55b] to-[#b8944a] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Team?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let us help you plan an unforgettable corporate retreat that delivers real business results and team transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppBookingUrl("corporate retreat planning")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#c9a55b] px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              WhatsApp: +92 304 567 9000
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#c9a55b] transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

