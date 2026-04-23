"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Music, Mic,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Guitar, Piano, Headphones, Volume2, ListMusic, Award,
    Disc3, PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Drum, Mic2, Zap, Radio, Smartphone, Tv
} from "lucide-react";

const heroSlides = [
    "/assets/band1.jpg",
    "/assets/band2.jpg",
    "/assets/band3.jpg",
];

const venueSpaces = [
    {
        title: "Main Concert Hall",
        text: "Spacious indoor venue with elevated stage, premium acoustics, and standing capacity for up to 250 guests. Perfect for rock, pop, and fusion concerts.",
        icon: Zap,
    },
    {
        title: "Acoustic Lounge",
        text: "Intimate 80-seat venue with warm ambiance, perfect for acoustic sets, jazz nights, and small gatherings.",
        icon: Guitar,
    },
    {
        title: "Outdoor Festival Grounds",
        text: "Open-air venue with covered stage, weather-ready sound system, and capacity for 500+ guests. Ideal for day festivals and summer concerts.",
        icon: Mic2,
    },
];

const venueAmenities = [
    {
        title: "Professional Stage",
        text: "Elevated stage with power supply, backline access, and capacity for 8+ musicians",
        icon: Music,
    },
    {
        title: "Premium Sound System",
        text: "Line array speakers, subwoofers, monitors, and professional sound engineer",
        icon: Volume2,
    },
    {
        title: "Concert Lighting",
        text: "Moving heads, LED washes, spotlights, haze machine, and lighting technician",
        icon: Lightbulb,
    },
    {
        title: "Production Team",
        text: "Sound engineer, lighting tech, stage manager, and venue coordinator included",
        icon: Users,
    },
];

const venuePackages = [
    {
        name: "Half-Day Rental",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Acoustic Lounge or Concert Hall",
            "Basic sound & lighting",
            "Stage setup included",
            "Green room access",
            "Venue staff support"
        ],
        icon: Heart,
    },
    {
        name: "Full Evening Concert",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "Main Concert Hall (250 guests)",
            "Full sound system with subs",
            "Complete concert lighting",
            "Dedicated production team",
            "Green room & hospitality",
            "Parking for 50+ vehicles"
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
            "Premium sound & lighting",
            "Multiple stage setup options",
            "Full production crew",
            "Artist hospitality suite",
            "Marketing & ticketing support",
            "Live recording option"
        ],
        icon: Crown,
    },
];

const venueBenefits = [
    "Acoustically treated performance spaces",
    "Professional sound and lighting equipment included",
    "Dedicated venue coordinator",
    "Artist green room with amenities",
    "Ample on-site parking",
    "Bar and catering options available",
    "Flexible indoor/outdoor spaces",
    "Perfect for concerts, album launches, and live events",
];

const technicalSpecs = [
    { category: "Sound System", specs: "Line array PA, dual 18\" subs, 8 monitors, digital console" },
    { category: "Lighting Rig", specs: "8 moving heads, LED washes, spotlights, haze machine" },
    { category: "Stage Size", specs: "24' x 20' elevated stage, power drops, backline access" },
    { category: "Backline Available", specs: "Drum kit, guitar/bass amps, keyboard stand, DI boxes" },
    { category: "Recording", specs: "Multi-track recording option available upon request" },
];

const venueSchedule = [
    { time: "Pre-Event", event: "Venue Access", desc: "Early access for band setup and sound check" },
    { time: "Hour 1", event: "Doors Open", desc: "Guest arrival with background music" },
    { time: "Hour 2-3", event: "Opening Act", desc: "Supporting artist performance (optional)" },
    { time: "Hour 3-4", event: "Main Performance - Set 1", desc: "45-60 minute first set" },
    { time: "Hour 4-5", event: "Intermission", desc: "Break with curated playlist" },
    { time: "Hour 5-6", event: "Main Performance - Set 2", desc: "45-60 minute second set" },
    { time: "Hour 6-8", event: "Encore & Close", desc: "Finale, cleanup, and venue breakdown" },
];

const gallery = [
    "/assets/band1.jpg",
    "/assets/dj1.jpg",
    "/assets/band2.jpg",
    "/assets/dj2.jpg",
];

const faqs = [
    { q: "What is the venue capacity?", a: "Our Main Concert Hall holds up to 250 guests. The Acoustic Lounge holds 80, and Outdoor Festival Grounds can accommodate 500+ guests." },
    { q: "Is sound equipment included?", a: "Yes, professional sound system with line array speakers, subwoofers, monitors, and mixing console is included in all packages." },
    { q: "Can we bring our own sound engineer?", a: "Yes, but our in-house engineer is available and familiar with the venue's acoustics for optimal sound." },
    { q: "Is parking available for guests?", a: "Yes, complimentary on-site parking for up to 50 vehicles with additional street parking nearby." },
    { q: "What are the rental hours?", a: "Standard rentals are 4-8 hours. Full day buyout (10 AM - 11 PM) available for festivals." },
    { q: "Do you provide bands?", a: "We can recommend bands from our roster, or you're welcome to book your own. Backline equipment available for rent." },
    { q: "Can we serve food and drinks?", a: "Yes, we have a bar area and catering kitchen. You can bring your own caterer or use our preferred vendors." },
    { q: "Is the venue wheelchair accessible?", a: "Yes, fully accessible with ramps, elevator, and designated viewing areas." },
];

const testimonials = [
    {
        name: "Sarah & Michael Chen",
        event: "Wedding Reception",
        text: "The Concert Hall was perfect for our reception. Incredible acoustics, amazing lighting, and the staff was fantastic. Our band sounded better than ever!",
        rating: 5,
    },
    {
        name: "Ahmed Raza",
        event: "Corporate Gala",
        text: "Professional venue with top-tier equipment. The outdoor stage created a festival vibe that our clients absolutely loved.",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        event: "Album Launch",
        text: "The perfect venue for a live concert. The acoustics are phenomenal, and the production team made everything seamless.",
        rating: 5,
    },
];

export default function LiveBandVenuePage() {
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
                            alt="Live music venue"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <Music className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Venue for Live Music</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
                        Reserve Our
                        <br />
                        Live Music Venue
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
                        Host your concert, album launch, or live music event in our professional venue.
                        We provide the stage, sound, lighting, and electrifying atmosphere for unforgettable performances.
                    </p>
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
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Performance Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Choose the perfect setting for your live music event
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
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premium Live Music Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for an electrifying show</p>
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
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-white">Venue Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Experience our live music spaces</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Venue gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
            <section className="py-16 md:py-20 bg-white text-gray-900">
                <div className="mx-auto max-w-5xl px-6">

                    {/* Heading */}
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Venue FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about booking our live music venue
                        </p>
                    </div>

                    {/* FAQ Grid */}
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
                                <option className="bg-neutral-900">Main Concert Hall (up to 250 guests)</option>
                                <option className="bg-neutral-900">Acoustic Lounge (up to 80 guests)</option>
                                <option className="bg-neutral-900">Outdoor Festival Grounds (500+ guests)</option>
                                <option className="bg-neutral-900">Full Venue Buyout</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Rental Package</option>
                                <option className="bg-neutral-900">Half-Day Rental (4 hours)</option>
                                <option className="bg-neutral-900">Full Evening Concert (8 hours)</option>
                                <option className="bg-neutral-900">Festival Buyout (Full day)</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Guest Count</option>
                                <option className="bg-neutral-900">20-50 guests (Intimate)</option>
                                <option className="bg-neutral-900">50-100 guests</option>
                                <option className="bg-neutral-900">100-200 guests</option>
                                <option className="bg-neutral-900">200-500 guests</option>
                                <option className="bg-neutral-900">500+ guests (Festival style)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your event, preferred date flexibility, technical requirements, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Send Venue Inquiry
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            We'll respond within 24 hours with availability and pricing
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}