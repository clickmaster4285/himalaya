"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Music, Mic,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Drama, Palette, Globe, Drum, Landmark, Ticket,
    Theater, Wand2, Flower2, Trees, Sun, Moon,
    Building2, Lamp, Armchair, Coffee, Wifi, ParkingCircle
} from "lucide-react";

const heroSlides = [
    "/assets/culture1.webp",
    "/assets/culture2.webp",
    "/assets/culture3.jpg",
    "/assets/culture4.webp",
];

const venueSpaces = [
    {
        title: "Heritage Hall",
        text: "Elegant indoor venue with traditional décor, elevated stage, and seating for up to 150 guests. Perfect for folk dance and music performances.",
        icon: Landmark,
    },
    {
        title: "Open Air Amphitheater",
        text: "Scenic outdoor venue with natural acoustics, tiered seating for 300 guests. Ideal for festivals and large cultural gatherings.",
        icon: Trees,
    },
    {
        title: "Cultural Lounge",
        text: "Cozy indoor space with traditional floor seating, warm ambiance, and capacity for 60 guests. Perfect for intimate storytelling and folk sessions.",
        icon: Armchair,
    },
];

const venueAmenities = [
    {
        title: "Traditional Stage",
        text: "Elevated stage with ethnic backdrop, traditional props, and space for 10+ performers",
        icon: Theater,
    },
    {
        title: "Cultural Décor",
        text: "Traditional seating options, ethnic fabrics, and heritage ambiance included",
        icon: Flower2,
    },
    {
        title: "Sound System",
        text: "Professional audio with mics suitable for folk instruments and vocal performances",
        icon: Music,
    },
    {
        title: "Artist Facilities",
        text: "Green room, changing areas, and hospitality for performers",
        icon: Coffee,
    },
];

const venuePackages = [
    {
        name: "Heritage Hour",
        duration: "3 Hours",
        price: "Upon Request",
        features: [
            "Cultural Lounge or Heritage Hall",
            "Basic sound & lighting",
            "Traditional stage setup",
            "Green room access",
            "Venue coordinator"
        ],
        icon: Heart,
    },
    {
        name: "Cultural Evening",
        duration: "6 Hours",
        price: "Upon Request",
        features: [
            "Heritage Hall (up to 150 guests)",
            "Premium sound system",
            "Traditional stage with décor",
            "Artist green room",
            "Parking for guests",
            "Catering coordination available"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Festival Buyout",
        duration: "Full Day",
        price: "Upon Request",
        features: [
            "All venue spaces",
            "Multiple stage setup",
            "Full production support",
            "Artist hospitality suite",
            "Marketing support",
            "Live recording option"
        ],
        icon: Crown,
    },
];

const venueBenefits = [
    "Acoustically optimized performance spaces",
    "Traditional stage and cultural décor included",
    "Professional sound system",
    "Dedicated venue coordinator",
    "Artist green room with amenities",
    "Ample on-site parking",
    "Flexible indoor/outdoor spaces",
    "Perfect for cultural festivals, weddings, and heritage events",
];

const technicalSpecs = [
    { category: "Stage Size", specs: "20' x 16' elevated stage with traditional backdrop" },
    { category: "Seating Options", specs: "Chairs, floor cushions, or traditional dastar-e-sufi" },
    { category: "Sound System", specs: "Professional speakers, wireless mics, monitors" },
    { category: "Lighting", specs: "Stage spotlights, ambient, and traditional mood lighting" },
    { category: "Backstage", specs: "Green room with seating, mirrors, and refreshments" },
];

const venueSchedule = [
    { time: "Pre-Event", event: "Venue Access", desc: "Early access for setup and artist sound check" },
    { time: "Hour 1", event: "Guest Arrival", desc: "Traditional welcome with music and tilak" },
    { time: "Hour 2", event: "Opening Performance", desc: "Grand entry with folk dance or musical procession" },
    { time: "Hour 3", event: "Main Show - Part 1", desc: "Featured cultural performances" },
    { time: "Hour 4", event: "Intermission", desc: "Break with refreshments and craft demonstrations" },
    { time: "Hour 5", event: "Main Show - Part 2", desc: "Continued performances and audience engagement" },
    { time: "Hour 6", event: "Grand Finale", desc: "Closing ceremony and venue breakdown" },
];

const gallery = [
    "/assets/culture1.webp",
    "/assets/culture2.webp",
    "/assets/culture3.jpg",
    "/assets/culture4.webp",
];

const faqs = [
    { q: "What is the venue capacity?", a: "Our Heritage Hall holds up to 150 guests. The Cultural Lounge holds 60, and Open Air Amphitheater can accommodate up to 300 guests." },
    { q: "Is sound equipment included?", a: "Yes, professional sound system with wireless microphones suitable for folk music and performances is included." },
    { q: "Can we bring our own performers?", a: "Yes, you're welcome to book your own artists. We can also recommend traditional performers from our roster." },
    { q: "Is parking available for guests?", a: "Yes, complimentary on-site parking for up to 50 vehicles with additional street parking nearby." },
    { q: "What are the rental hours?", a: "Standard rentals are 3-6 hours. Full day buyout (10 AM - 10 PM) available for festivals." },
  
];

const testimonials = [
    {
        name: "Priya Sharma",
        event: "Wedding Celebration",
        text: "The Heritage Hall was absolutely beautiful. The traditional décor and acoustics were perfect for our cultural performances. Our guests loved it!",
        rating: 5,
    },
    {
        name: "Imran Malik",
        event: "Corporate Gala",
        text: "Professional venue with world-class facilities. The outdoor amphitheater created a magical atmosphere for our cultural evening.",
        rating: 5,
    },
    {
        name: "Fatima Zafar",
        event: "Cultural Festival",
        text: "The perfect venue for showcasing our heritage. Spacious, beautifully decorated, and wonderful support staff.",
        rating: 5,
    },
];

export default function CulturalVenuePage() {
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
                            alt="Cultural venue"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <Globe className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Venue for Cultural Events</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
                        Reserve Our
                        <br />
                        Cultural Venue
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">Host your reserve our cultural venue with us. Host your cultural show, folk festival, or heritage event in our dedicated venue. We provide traditional ambiance, professional facilities, and authentic atmosphere for unforgettable cultural celebrations.</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center">
                            Check Availability
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition backdrop-blur-sm text-center">
                            View Venue Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Venue Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Cultural Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Choose the perfect setting for your cultural event
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
                        <p className="mt-3 text-sm md:text-base text-white/80">Choose the perfect rental option for your cultural event</p>
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
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premium Cultural Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for an authentic heritage experience</p>
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
                                <Theater className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Venue Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Technical Specifications</h3>
                            {technicalSpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Additional arrangements available upon request</p>
                        </div>
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

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Venue Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Experience our cultural spaces</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <img
                                    src={img}
                                    alt="Cultural venue gallery"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
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
                        <p className="mt-3 text-sm md:text-base text-white/80">Everything you need to know about booking our cultural venue</p>
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
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-xl sm:rounded-2xl border border-[#e8dfcf] bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left text-neutral-900">Reserve the Venue</h2>
                        <p className="mt-2 text-xs sm:text-sm text-neutral-600 text-center sm:text-left">Check availability for your preferred date</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-neutral-500 focus:bg-white text-neutral-900"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-neutral-500 focus:bg-white text-neutral-900"
                                placeholder="Phone Number"
                            />
                            <input
                                type="email"
                                className="col-span-1 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-neutral-500 focus:bg-white text-neutral-900"
                                placeholder="Email Address"
                            />
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white text-neutral-900"
                            />
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white text-neutral-900">
                                <option value="" className="bg-white">Select Venue Space</option>
                                <option className="bg-white">Heritage Hall (up to 150 guests)</option>
                                <option className="bg-white">Open Air Amphitheater (up to 300 guests)</option>
                                <option className="bg-white">Cultural Lounge (up to 60 guests)</option>
                                <option className="bg-white">Full Venue Buyout</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white text-neutral-900">
                                <option value="" className="bg-white">Select Rental Package</option>
                                <option className="bg-white">Heritage Hour (3 hours)</option>
                                <option className="bg-white">Cultural Evening (6 hours)</option>
                                <option className="bg-white">Festival Buyout (Full day)</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white text-neutral-900">
                                <option value="" className="bg-white">Expected Guest Count</option>
                                <option className="bg-white">20-50 guests (Intimate)</option>
                                <option className="bg-white">50-100 guests</option>
                                <option className="bg-white">100-150 guests</option>
                                <option className="bg-white">150-300 guests</option>
                                <option className="bg-white">300+ guests (Festival)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-[#e8dfcf] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-neutral-500 focus:bg-white resize-vertical text-neutral-900"
                                placeholder="Tell us about your event, preferred date flexibility, cultural theme, technical requirements, catering needs, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto shadow-md"
                            >
                                Send Venue Inquiry
                            </button>
                        </form>
                        <p className="mt-4 text-[10px] sm:text-xs text-neutral-500 text-center">
                            We'll respond within 24 hours with availability and pricing
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}