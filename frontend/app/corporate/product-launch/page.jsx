"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Sparkles, Star,
    Heart, Calendar, Clock, MapPin, Gift, Megaphone,
    Camera, Video, ShoppingBag, Rocket, TrendingUp, Award,
    PartyPopper, Lightbulb, Speaker, Wine, Globe, Tv,
    Smartphone, Zap, Radio, Disc3, Mic2, Drum, Guitar
} from "lucide-react";

const heroSlides = [
    "/assets/product-launch1.webp",
    "/assets/product-launch2.webp",
    "/assets/conference2.webp",
];

const eventSpaces = [
    {
        title: "Grand Reveal Hall",
        text: "Dramatic indoor venue with hydraulic stage lift, premium lighting rig, and standing capacity for up to 300 guests. Perfect for flagship product launches.",
        icon: Rocket,
    },
    {
        title: "Brand Experience Lounge",
        text: "Immersive 100-seat multimedia space with 360° projection mapping capabilities, ideal for brand storytelling and VIP previews.",
        icon: Globe,
    },
    {
        title: "Showcase Plaza",
        text: "Modern outdoor terrace with LED video wall, covered demo stations, and capacity for 400+ guests. Perfect for automotive, tech, and lifestyle launches.",
        icon: Zap,
    },
];

const eventAmenities = [
    {
        title: "LED Video Walls",
        text: "Massive 4K LED walls for product reveals, brand films, and live social media integration",
        icon: Tv,
    },
    {
        title: "Professional Photography",
        text: "On-site photographer + photo-ready backdrops for media coverage and social content",
        icon: Camera,
    },
    {
        title: "Product Demonstration Zones",
        text: "Custom demo stations with power, lighting, and brandable displays",
        icon: ShoppingBag,
    },
    {
        title: "Livestream Ready",
        text: "Multi-camera setup with broadcast-quality streaming to reach global audiences",
        icon: Video,
    },
];

const eventPackages = [
    {
        name: "Product Reveal",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Grand Reveal Hall access",
            "Basic LED wall + sound system",
            "Stage with dramatic curtains",
            "Brand logo projection",
            "Event coordinator"
        ],
        icon: Gift,
    },
    {
        name: "Premium Launch Experience",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "Full venue access",
            "Massive LED video wall",
            "Custom branded environment",
            "Professional photography + video",
            "Livestream production",
            "VIP hospitality suite",
            "Media check-in area"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Immersive Brand Takeover",
        duration: "Full Day",
        price: "Upon Request",
        features: [
            "Complete venue transformation",
            "360° projection mapping",
            "Interactive product demos",
            "Full production crew",
            "Celebrity host option",
            "Post-event content package",
            "Nationwide media distribution"
        ],
        icon: Crown,
    },
];

const eventBenefits = [
    "Customizable brand environments and photo-ready backdrops",
    "State-of-the-art LED walls and projection mapping technology",
    "Professional livestream capabilities for global reach",
    "Dedicated brand experience coordinator",
    "VIP green room and hospitality suite",
    "Media check-in area with press kit distribution",
    "Product demo stations with technical support",
    "Post-event content package (photos + highlight reel)",
];

const technicalSpecs = [
    { category: "LED Video Wall", specs: "20' x 12' 4K main screen + two 9' x 5' side screens" },
    { category: "Projection Mapping", specs: "360° interior projection capability with 6 high-lumen projectors" },
    { category: "Sound System", specs: "Line array PA with wireless mics and ambient audio processing" },
    { category: "Livestream Setup", specs: "4-camera broadcast system with real-time graphics overlay" },
    { category: "Smart Display Integration", specs: "Interactive touchscreens and social media walls available" },
];

const eventSchedule = [
    { time: "Pre-Event", event: "Load-In & Setup", desc: "Brand installation, demo setup, and tech rehearsal" },
    { time: "Hour 1", event: "Media & VIP Arrival", desc: "Check-in, branded welcome, and hospitality" },
    { time: "Hour 2", event: "Main Reveal", desc: "Curtain drop / video launch + keynote presentation" },
    { time: "Hour 3", event: "Hands-On Demos", desc: "Interactive product experience + media interviews" },
    { time: "Hour 4-6", event: "Networking & Celebration", desc: "Cocktail reception, influencer content creation" },
    { time: "Hour 6-8", event: "Close & Load-Out", desc: "Guest departure and venue breakdown" },
];

const gallery = [
    "/assets/product-launch1.webp",
    "/assets/product-launch2.webp",
    "/assets/exibition1.webp",
    "/assets/conference1.webp",
];

const faqs = [
    { q: "Can we customize the venue with our branding?", a: "Absolutely! We transform the space with your logos, colors, and brand messaging across digital screens, signage, and physical installations." },
    { q: "Do you provide AV and production equipment?", a: "Yes, our packages include professional LED walls, sound systems, lighting rigs, and livestream capabilities." },
    { q: "Can we livestream our product launch?", a: "Yes! Our Premium and Immersive packages include full livestream production with multi-camera setup." },
    { q: "Is parking available for media and VIPs?", a: "Yes, dedicated VIP and media parking available with valet option upon request." },
    { q: "What is the venue capacity?", a: "Grand Reveal Hall: 300 guests, Brand Lounge: 100 guests, Showcase Plaza: 400+ guests." },
    
];

const testimonials = [
    {
        name: "Marcus Chen",
        event: "Tech Product Launch",
        text: "The LED wall and production quality blew us away. Our product reveal felt like an Apple event! The team handled every detail perfectly.",
        rating: 5,
    },
    {
        name: "Sophia Rodriguez",
        event: "Fashion Brand Launch",
        text: "They transformed the space into our brand world. The photo moments and influencer content turned out stunning. Highly recommend!",
        rating: 5,
    },
    {
        name: "David Okafor",
        event: "Automotive Reveal",
        text: "The Showcase Plaza was perfect for our car unveiling. The lighting, demo setup, and media coordination were world-class.",
        rating: 5,
    },
];

export default function BrandEventVenuePage() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
          
            {/* Hero Section */}
            <section className="relative min-h-[720px] overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, idx) => (
                        <Image
                            key={slide}
                            src={slide}
                            alt="Product launch venue"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                {/* Balanced dark overlay - 50% instead of 60% for better image visibility */}
                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

                {/* Soft gradient at bottom for extra text contrast without losing image detail */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />

                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <Sparkles className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Product Launches & Brand Events</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Make a Statement
                        <br />
                        With Your Launch
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                        Unveil your product in style with our premium event venue. From intimate brand
                        previews to large-scale productions, we deliver unforgettable launch experiences.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Launch
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Event Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Event Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Event Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Choose the perfect setting for your brand moment
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {eventSpaces.map((space) => {
                            const Icon = space.icon;
                            return (
                                <article key={space.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 shadow-sm hover:shadow-md transition group">
                                    <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2.5 text-[#9a7b3a] group-hover:bg-[#c9a55b] group-hover:text-white transition">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-900">{space.title}</h3>
                                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{space.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Event Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Production Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for a show-stopping launch</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {eventAmenities.map((amenity) => {
                            const Icon = amenity.icon;
                            return (
                                <div key={amenity.title} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-6 text-center hover:shadow-md transition">
                                    <div className="mb-4 inline-flex rounded-full bg-[#c9a55b]/10 p-3 text-[#c9a55b] mx-auto">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900">{amenity.title}</h3>
                                    <p className="mt-2 text-sm text-neutral-600">{amenity.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Event Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Launch Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Tailored experiences for every brand and budget</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {eventPackages.map((pkg) => {
                            const Icon = pkg.icon;
                            return (
                                <div key={pkg.name} className={`rounded-2xl border p-6 transition relative ${pkg.popular ? 'border-[#c9a55b] bg-white/10' : 'border-white/15 bg-white/5'} hover:bg-white/10`}>
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-[#c9a55b] text-white text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="mb-4 inline-flex rounded-full bg-white/10 p-2.5">
                                        <Icon className="h-5 w-5 text-[#c9a55b]" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                                    <p className="text-sm text-white/70 mt-1">{pkg.duration}</p>
                                    <p className="text-xl font-bold text-[#c9a55b] mt-3">{pkg.price}</p>
                                    <ul className="mt-4 space-y-2">
                                        {pkg.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                                                <CheckCircle2 className="h-4 w-4 text-[#c9a55b] mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits & Tech Specs Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premium Brand Event Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for impact, built for brands</p>
                            <ul className="mt-6 space-y-3">
                                {eventBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technical Specs */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Megaphone className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Production Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Technical Capabilities</h3>
                            {technicalSpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Additional production elements available upon request</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Flow Section */}
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Event Timeline</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">A typical product launch flow</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {eventSchedule.map((item, idx) => (
                            <div key={idx} className="flex gap-4 mb-6 last:mb-0 items-start">
                                <div className="w-28 flex-shrink-0">
                                    <span className="text-[#c9a55b] font-semibold text-sm">{item.time}</span>
                                </div>
                                <div className="flex-1 border-l border-white/20 pl-4 pb-6">
                                    <p className="font-semibold text-white">{item.event}</p>
                                    <p className="text-sm text-white/60 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-white/50 text-xs mt-4">*Fully customizable to your brand's needs</p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Event Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">See past brand moments at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Event gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Brand Success Stories</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">What our clients say about their launch experience</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-white p-6">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#c9a55b] text-[#c9a55b]" />
                                    ))}
                                </div>
                                <p className="text-sm text-neutral-700 italic">"{t.text}"</p>
                                <div className="mt-4">
                                    <p className="font-semibold text-neutral-900">{t.name}</p>
                                    <p className="text-xs text-neutral-500">{t.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-20 bg-white text-gray-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Event FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about launching at our venue
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:bg-gray-100 transition"
                            >
                                <div className="mb-3 inline-flex rounded-full bg-gray-100 p-2">
                                    <HelpCircle className="h-5 w-5 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {f.q}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {f.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-neutral-900 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 p-4 sm:p-6 md:p-8 lg:p-10">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Brand Event</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Tell us about your vision and we'll create a custom proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Brand / Company Name"
                            />
                            <input
                                type="email"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Email Address"
                            />
                            <input
                                type="tel"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Phone Number"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Event Type</option>
                                <option className="bg-neutral-900">Product Launch</option>
                                <option className="bg-neutral-900">Brand Anniversary / Celebration</option>
                                <option className="bg-neutral-900">Press Conference / Media Event</option>
                                <option className="bg-neutral-900">Influencer / VIP Preview</option>
                                <option className="bg-neutral-900">Pop-Up / Brand Activation</option>
                                <option className="bg-neutral-900">Corporate Milestone Event</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Venue Space</option>
                                <option className="bg-neutral-900">Grand Reveal Hall (up to 300 guests)</option>
                                <option className="bg-neutral-900">Brand Experience Lounge (up to 100 guests)</option>
                                <option className="bg-neutral-900">Showcase Plaza (400+ guests)</option>
                                <option className="bg-neutral-900">Full Venue Takeover</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Product Reveal (4 hours)</option>
                                <option className="bg-neutral-900">Premium Launch Experience (8 hours)</option>
                                <option className="bg-neutral-900">Immersive Brand Takeover (Full Day)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your product/brand, expected guest count, vision for the event, and any special production needs..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Launch Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our event specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}