"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  Mountain, 
  Calendar, 
  Users, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronDown,
  Play,
  Pause,
  Volume2,
  Maximize2
} from "lucide-react";

const premiumServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Premium Luxury Experience at Himalaya Villas",
  "description": "Exclusive premium luxury villa experience with personalized service, private accommodations, and world-class amenities in Bhurban, Murree Hills.",
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
  "serviceType": "Premium Luxury Accommodation",
  "offers": {
    "@type": "Offer",
    "price": "95000",
    "priceCurrency": "PKR",
    "description": "Premium luxury villa experience starting from PKR 95,000"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

const PremiumLandingPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  
  // Section refs for animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  // Floating elements animation
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 10 + 5
  }));

  // Premium features data
  const features = [
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Mountain Luxury",
      description: "Experience unparalleled luxury in the heart of the Himalayas with our premium villa accommodations.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "World-Class Service",
      description: "Our dedicated team provides 24/7 personalized service to exceed your expectations.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Romantic Escapes",
      description: "Perfect for honeymoons and romantic getaways with breathtaking mountain views.",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Retreats",
      description: "Spacious villas perfect for family gatherings and creating lasting memories.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Excellence",
      description: "Host spectacular weddings and corporate events in our stunning mountain venue.",
      color: "from-amber-400 to-amber-600"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Prime Location",
      description: "Strategically located in Bhurban with easy access from major cities.",
      color: "from-red-400 to-red-600"
    }
  ];

  // Gallery images
  const galleryImages = [
    { id: 1, title: "Mountain View Villa", category: "Accommodation", image: "https://picsum.photos/seed/villa1/400/300.jpg" },
    { id: 2, title: "Luxury Suite", category: "Accommodation", image: "https://picsum.photos/seed/suite2/400/300.jpg" },
    { id: 3, title: "Wedding Ceremony", category: "Events", image: "https://picsum.photos/seed/wedding3/400/300.jpg" },
    { id: 4, title: "Corporate Meeting", category: "Events", image: "https://picsum.photos/seed/meeting4/400/300.jpg" },
    { id: 5, title: "Spa Treatment", category: "Wellness", image: "https://picsum.photos/seed/spa5/400/300.jpg" },
    { id: 6, title: "Fine Dining", category: "Dining", image: "https://picsum.photos/seed/dining6/400/300.jpg" },
    { id: 7, title: "Pool Area", category: "Recreation", image: "https://picsum.photos/seed/pool7/400/300.jpg" },
    { id: 8, title: "Garden View", category: "Nature", image: "https://picsum.photos/seed/garden8/400/300.jpg" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Company",
      content: "The most incredible corporate retreat venue. Our team was blown away by the luxury and service.",
      rating: 5
    },
    {
      name: "Ahmed & Fatima",
      role: "Newlyweds",
      content: "Our wedding was magical! The team made every detail perfect. Highly recommend for destination weddings.",
      rating: 5
    },
    {
      name: "The Chen Family",
      role: "Annual Vacation",
      content: "We've been coming here for 5 years. It keeps getting better. Our kids love the activities!",
      rating: 5
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Mountain Escape",
      price: "PKR 45,000",
      period: "per night",
      features: [
        "Premium Villa Suite",
        "Mountain View",
        "Breakfast Included",
        "Wi-Fi & Amenities",
        "Concierge Service"
      ],
      highlighted: false
    },
    {
      name: "Luxury Retreat",
      price: "PKR 85,000",
      period: "per night",
      features: [
        "Grand Villa Suite",
        "Panoramic Views",
        "All Meals Included",
        "Spa Access",
        "Butler Service",
        "Airport Transfer"
      ],
      highlighted: true
    },
    {
      name: "Royal Experience",
      price: "PKR 150,000",
      period: "per night",
      features: [
        "Entire Villa Estate",
        "Private Chef",
        "All-Inclusive Package",
        "Helicopter Transfer",
        "Personal Staff",
        "Custom Experiences"
      ],
      highlighted: false
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(premiumServiceSchema) }} />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Mountain className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Himalaya Luxury
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'Gallery', 'Testimonials', 'Pricing', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          style={{ y: heroY }}
          className="text-center z-10 px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Premium Mountain Luxury</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
            <br />
            <span className="text-white">Mountain Paradise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Discover the ultimate luxury retreat in the heart of the Himalayas. 
            Where breathtaking views meet world-class hospitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Explore Luxury
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/30 hover:border-white/60 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Virtual Tour
            </button>
          </motion.div>
        </motion.div>

        {/* Parallax Mountain Background */}
        <motion.div 
          style={{ y: mountainY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-slate-900 to-transparent" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Premium Features
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the perfect blend of luxury, comfort, and natural beauty
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300" 
                     style={{ backgroundImage: `linear-gradient(to right, ${feature.color.split(' ').join(', ')})` }} />
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" ref={galleryRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Visual Gallery
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Take a visual journey through our luxury spaces and experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <img 
                  src={image.image} 
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                <div className="absolute inset-0 bg-slate-800/40 group-hover:bg-slate-800/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-white font-semibold">{image.title}</p>
                  <p className="text-white/70 text-sm">{image.category}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Guest Experiences
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hear what our guests have to say about their unforgettable stays
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Luxury Packages
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose the perfect package for your mountain escape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative ${plan.highlighted ? 'scale-105' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className={`bg-slate-800/30 backdrop-blur-sm border rounded-2xl p-8 h-full ${
                  plan.highlighted 
                    ? 'border-gradient-to-r from-yellow-400 to-orange-400 shadow-2xl' 
                    : 'border-white/10 hover:border-white/20'
                } transition-all duration-300`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/60">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 hover:from-yellow-500 hover:to-orange-500'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}>
                    Select Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Ready to experience mountain luxury? Contact us to plan your perfect escape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <select className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors">
                    <option value="">Select Package</option>
                    <option value="mountain">Mountain Escape</option>
                    <option value="luxury">Luxury Retreat</option>
                    <option value="royal">Royal Experience</option>
                  </select>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 rounded-lg font-semibold transition-all duration-300">
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Phone</p>
                      <p className="text-white font-semibold">+92 304 567 9000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white font-semibold">info@himalayavillas.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Location</p>
                      <p className="text-white font-semibold">Bhurban, Murree, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Saturday - Sunday</span>
                    <span className="text-white">10:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Mountain className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold">Himalaya Luxury</span>
            </div>
            <p className="text-white/60 text-sm">
              © 2024 Himalaya Luxury Villas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumLandingPage;
