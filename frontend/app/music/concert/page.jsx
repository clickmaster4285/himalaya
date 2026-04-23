"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Music, Mic,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Guitar, Piano, Headphones, Volume2, ListMusic, Award,
    Wifi, Coffee, ParkingCircle, Speaker, LampCeiling
} from "lucide-react";

const heroSlides = [
    "/assets/concert1.webp",
    "/assets/concert2.webp",
    "/assets/concert3.jpg",
];

const venueSpaces = [
    {
        title: "Intimate Recital Hall",
        text: "Our acoustic-optimized hall seats up to 80 guests with tiered seating, perfect for classical recitals and solo performances.",
        icon: Piano,
    },
    {
        title: "Jazz Lounge",
        text: "Cozy, sophisticated space with booth seating, mood lighting, and a dedicated stage for jazz trios and quartets.",
        icon: Headphones,
    },
    {
        title: "Outdoor Amphitheater",
        text: "Open-air venue with natural acoustics, ideal for sunset concerts and garden parties (seasonal).",
        icon: Guitar,
    },
];

const venueAmenities = [
    {
        title: "Professional Sound System",
        text: "High-end speakers, mixing console, and wireless microphones included",
        icon: Volume2,
    },
    {
        title: "Stage & Lighting",
        text: "Professional stage with theatrical lighting and spotlights",
        icon: LampCeiling,
    },
    {
        title: "Backstage Area",
        text: "Green room with seating, mirrors, and refreshments for artists",
        icon: Coffee,
    },
    {
        title: "Guest Amenities",
        text: "Complimentary WiFi, coat check, and parking for up to 50 vehicles",
        icon: Wifi,
    },
];

const venuePackages = [
    {
        name: "Recital Rental",
        duration: "3 Hours",
        price: "Upon Request",
        features: [
            "Intimate Hall (up to 80 guests)",
            "Basic sound system",
            "Stage lighting",
            "Green room access",
            "Event coordinator on-site"
        ],
        icon: Heart,
    },
    {
        name: "Evening Concert",
        duration: "5 Hours",
        price: "Upon Request",
        features: [
            "Jazz Lounge or Recital Hall",
            "Premium sound & lighting",
            "Full stage setup",
            "Green room & hospitality",
            "Parking for 50+ guests",
            "Catering coordination available"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Full Venue Buyout",
        duration: "Full Day",
        price: "Upon Request",
        features: [
            "All venue spaces",
            "Premium AV & lighting package",
            "Dedicated sound engineer",
            "Full staff support",
            "Catering kitchen access",
            "Marketing & ticketing support"
        ],
        icon: Crown,
    },
];

const venueBenefits = [
    "Acoustically treated performance spaces",
    "Professional sound and lighting equipment",
    "Flexible indoor and outdoor venues",
    "Dedicated event coordinator",
    "Green room for artists",
    "Ample on-site parking",
    "Catering-friendly spaces",
    "Perfect for recitals, jazz nights, and private concerts",
];

const technicalSpecs = [
    { category: "Sound", specs: "JBL Professional speakers, 16-channel mixer, 8 wireless mics" },
    { category: "Lighting", specs: "LED theatrical lights, spotlights, mood lighting system" },
    { category: "Stage", specs: "20' x 16' professional stage with dance floor" },
    { category: "Backline", specs: "Yamaha grand piano, guitar amps, drum kit available" },
    { category: "Recording", specs: "Multi-track recording option available" },
];

const sampleSchedule = [
    { time: "Pre-Event", event: "Venue Access for Setup", desc: "Early access for organizers and sound check" },
    { time: "Hour 1", event: "Guest Arrival & Prelude", desc: "Welcome music as guests arrive" },
    { time: "Hour 2", event: "Main Performance", desc: "Featured concert program" },
    { time: "Hour 3", event: "Intermission", desc: "Break with refreshment service" },
    { time: "Hour 4", event: "Second Set / Encore", desc: "Continued performance" },
    { time: "Hour 5", event: "Event End & Cleanup", desc: "Venue breakdown" },
];

const gallery = [
    "/assets/band1.jpg",
    "/assets/band2.jpg",
    "/assets/concert3.jpg",
    "/assets/concert2.webp",
];

const faqs = [
    { q: "What is the venue capacity?", a: "Our Intimate Recital Hall holds up to 80 guests. The Jazz Lounge holds 60, and the Outdoor Amphitheater can accommodate up to 120 guests." },
    { q: "Is sound equipment included?", a: "Yes, professional sound system, microphones, and speakers are included in all venue packages. Premium upgrades available." },
    { q: "Can we bring our own caterer?", a: "Yes, you may bring your own caterer. We have a prep kitchen available and preferred vendor recommendations." },
    { q: "Is parking available?", a: "Yes, we offer complimentary on-site parking for up to 50 vehicles with additional street parking nearby." },
    { q: "What are the rental hours?", a: "Standard rentals are 3-5 hours. Full day buyout (10 AM - 10 PM) is available for larger events." },
    { q: "Do you provide artists?", a: "We can recommend professional musicians from our roster, or you're welcome to book your own." },
    { q: "Can we host a ticketed event?", a: "Absolutely! We have box office and ticket scanning support available for public concerts." },
    { q: "Is the venue accessible?", a: "Yes, wheelchair accessible with reserved seating areas and accessible restrooms." },
];

const testimonials = [
    {
        name: "Sarah & David Khan",
        event: "Wedding Reception",
        text: "The Recital Hall was absolutely stunning. The acoustics were perfect and the staff was incredibly helpful. Our guests loved the intimate setting.",
        rating: 5,
    },
    {
        name: "Imran Ali",
        event: "Corporate Gala",
        text: "Professional venue from start to finish. The Jazz Lounge created the perfect sophisticated atmosphere for our client dinner.",
        rating: 5,
    },
    {
        name: "Ayesha Malik",
        event: "Private Concert",
        text: "The venue exceeded our expectations. Beautiful space, excellent sound, and seamless coordination. Will definitely book again!",
        rating: 5,
    },
];

export default function ConcertVenuePage() {
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
                            alt="Concert venue interior"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <Music className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Venue for Private Concerts</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
                        Reserve Our
                        <br />
                        Concert Venue
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
                        Host your private concert, recital, or jazz evening in our acoustically-optimized venue.
                        We provide the perfect space, professional sound, and elegant ambiance for unforgettable musical events.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center">
                            Check Availability
                        </a>
                        <a href="#venue-spaces" className="inline-block rounded-md border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition backdrop-blur-sm text-center">
                            View Venue Spaces
                        </a>
                    </div>
                </div>
            </section>

            {/* Venue Spaces Section */}
            <section id="venue-spaces" className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Performance Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Choose the perfect setting for your musical event
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {venueSpaces.map((space) => {
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

            {/* Venue Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Venue Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything included with your venue rental</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {venueAmenities.map((amenity) => {
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

            {/* Venue Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Venue Rental Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Choose the perfect rental option for your event</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {venuePackages.map((pkg) => {
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

            {/* Benefits & Technical Specs Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Our Venue</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premium Concert Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for a flawless performance</p>
                            <ul className="mt-6 space-y-3">
                                {venueBenefits.map((item) => (
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
                                <Speaker className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Tech Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Technical Specifications</h3>
                            {technicalSpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Additional equipment available upon request</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Venue Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Experience the ambiance of our concert spaces</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <img
                                    src={img}
                                    alt="Concert venue gallery"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What Our Clients Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from events at our venue</p>
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
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Venue FAQs</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Everything you need to know about booking our concert venue</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-6 hover:bg-white/10 transition">
                                <div className="mb-3 inline-flex rounded-full bg-white/10 p-2">
                                    <HelpCircle className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold">{f.q}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/80">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-neutral-900 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 p-4 sm:p-6 md:p-8 lg:p-10">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Reserve the Venue</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Check availability for your preferred date</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Phone Number"
                            />
                            <input
                                type="email"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Email Address"
                            />
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Venue Space</option>
                                <option className="bg-neutral-900">Intimate Recital Hall (up to 80 guests)</option>
                                <option className="bg-neutral-900">Jazz Lounge (up to 60 guests)</option>
                                <option className="bg-neutral-900">Outdoor Amphitheater (up to 120 guests)</option>
                                <option className="bg-neutral-900">Full Venue Buyout</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Rental Package</option>
                                <option className="bg-neutral-900">Recital Rental (3 hours)</option>
                                <option className="bg-neutral-900">Evening Concert (5 hours)</option>
                                <option className="bg-neutral-900">Full Venue Buyout (Full day)</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Guest Count</option>
                                <option className="bg-neutral-900">10-30 guests (Intimate)</option>
                                <option className="bg-neutral-900">30-60 guests</option>
                                <option className="bg-neutral-900">60-80 guests</option>
                                <option className="bg-neutral-900">80-120 guests</option>
                                <option className="bg-neutral-900">120+ guests (Full buyout)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your event, preferred date flexibility, any special requirements (catering, artist needs, etc.)..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Send Venue Inquiry
                            </button>
                        </form>
                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            We'll respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}