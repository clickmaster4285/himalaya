"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CheckCircle2, Crown, HelpCircle, Users, Music, Mic, Sparkles, Moon, Star, Heart, Calendar, Clock, MapPin, Coffee, Wifi, ParkingCircle, Wine } from "lucide-react";

const heroSlides = [
    "/assets/qawwali.jpg",
    "/assets/qawwali1.jpg",
    "/assets/qawwali2.jpg",

];

const venueHighlights = [
    {
        title: "Purpose-Built Sufi Space",
        text: "Our venue features a dedicated mehfil-e-sama hall with exceptional acoustics, traditional dastar-e-sufi floor seating, and ambient mood lighting designed specifically for qawwali and Sufi music.",
        icon: Sparkles,
    },
    {
        title: "Authentic Atmosphere",
        text: "Step into a world of spirituality with our carefully curated décor including traditional carpets, floor cushions, ambient lanterns, and a stage designed for the qawwal party.",
        icon: Moon,
    },
    {
        title: "Complete Amenities",
        text: "Enjoy complimentary tea service, dedicated sound system, private changing areas, and a separate dining space for dinner service before or after the performance.",
        icon: Heart,
    },
];

const venueFeatures = [
    {
        title: "Main Sufi Hall",
        text: "Capacity up to 80 guests with floor seating",
        icon: Users,
    },
    {
        title: "Private Majlis Room",
        text: "Intimate setting for 10-30 guests",
        icon: Crown,
    },
    {
        title: "Outdoor Courtyard",
        text: "Open-air setting for summer Sufi nights",
        icon: Star,
    },
];

const packageBenefits = [
    "Dedicated Sufi hall with traditional floor seating",
    "Professional sound system and wireless microphones",
    "Complimentary tea and refreshments service",
    "Customizable performance setlist",
    "2-hour qawwali performance by professional artists",
    "Photo-friendly ambient lighting",
    "Private parking for guests",
    "Event coordinator on-site",
];

const venueSchedule = [
    { time: "6:30 PM", event: "Venue Access & Setup", desc: "Early access for event organizers" },
    { time: "7:00 PM", event: "Guest Arrival & Tea Service", desc: "Welcome drinks in the courtyard" },
    { time: "7:30 PM", event: "Opening Kalam (Hamd & Naat)", desc: "Sufi invocation" },
    { time: "8:00 PM", event: "First Qawwali Set", desc: "Traditional classics" },
    { time: "8:45 PM", event: "Interval & Refreshments", desc: "Tea, snacks, and social break" },
    { time: "9:15 PM", event: "Second Qawwali Set", desc: "High-energy performance" },
    { time: "10:00 PM", event: "Closing & Dhamal", desc: "Spiritual conclusion" },
    { time: "10:30 PM", event: "Event Ends", desc: "Venue closes" },
];

const gallery = [
    "/assets/qawali-gallery1.png",
    "/assets/qawali-gallery2.png",
    "/assets/qawwali1.jpg",
    "/assets/qawwali2.jpg",
];

const faqs = [
    { q: "What is the venue capacity?", a: "Our main Sufi hall can accommodate up to 80 guests with traditional floor seating. For standing events or dining setup, capacity varies." },
    { q: "Is the sound system included?", a: "Yes, our venue comes equipped with a professional-grade sound system and wireless microphones suitable for live qawwali performances." },
    { q: "Can we bring our own catering?", a: "Yes, you may bring your own caterer. We also have a preferred vendor list if needed. Dinner service can be arranged before or after the performance." },
    // { q: "Is parking available?", a: "Yes, we have on-site private parking for up to 20 vehicles, with additional street parking available nearby." },
    // { q: "What are the venue rental hours?", a: "Standard rental is 4 hours (6:30 PM - 10:30 PM). Extended hours available on request at an additional cost." },
    // { q: "Do you provide the qawwali artists?", a: "Yes, our venue packages include professional qawwal parties. You can choose from our roster of experienced artists." },
];

const testimonials = [
    {
        name: "Fatima Ahmed",
        event: "Private Family Mehfil",
        text: "The venue was absolutely perfect for our family gathering. The acoustics were incredible, and the ambiance transported us to a different era. Highly recommended!",
        rating: 5,
    },
    {
        name: "Omar Hassan",
        event: "Corporate Dinner",
        text: "We hosted a client appreciation event here, and everyone was impressed. The traditional setup and professional qawwali made it unforgettable.",
        rating: 5,
    },
];

export default function QawwaliPage() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Slider */}
            <section className="relative min-h-[720px] overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, idx) => (
                        <Image
                            key={slide}
                            src={slide}
                            alt="Sufi Qawwali venue interior"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-32 sm:pt-36 pb-16 sm:pb-20 md:pt-44">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                            <Music className="h-3.5 w-3.5 text-[#c9a55b]" />
                            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Venue for Sufi Nights</span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                            Reserve Our
                            <br />
                            Sufi Qawwali Venue
                        </h1>
                        <p className="mt-4 sm:mt-5 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                            Host your private mehfil, corporate event, or cultural gathering in our dedicated Sufi space.
                            We provide the authentic ambiance, professional sound, and renowned qawwali artists for an unforgettable evening.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <a href="#book" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c9a55b] px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition">
                                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                Check Venue Availability
                            </a>
                            <a href="#venue-info" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition">
                                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                View Venue Details
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
                        <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Venue Highlights Section */}
            <section id="venue-info" className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-8 sm:mb-10 text-center">
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Space</p>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">A Venue Built for Sufi Nights</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
                            Every detail designed to create the perfect spiritual atmosphere
                        </p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {venueHighlights.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition group">
                                    <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2.5 text-[#9a7b3a] group-hover:bg-[#c9a55b] group-hover:text-white transition">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">{item.title}</h3>
                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">{item.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Venue Spaces */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Venue Spaces</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Flexible areas for every type of gathering</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {venueFeatures.map((space) => {
                            const Icon = space.icon;
                            return (
                                <div key={space.title} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 sm:p-6 text-center hover:shadow-md transition">
                                    <div className="mb-4 inline-flex rounded-full bg-[#c9a55b]/10 p-3 text-[#c9a55b] mx-auto">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">{space.title}</h3>
                                    <p className="mt-2 text-xs sm:text-sm text-neutral-600">{space.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Package Benefits / What's Included */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 px-3 sm:px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Venue Package</span>
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">What's Included</h2>
                            <p className="mt-4 text-sm sm:text-base text-white/80">Your complete Sufi night venue rental package</p>
                            <ul className="mt-6 space-y-3">
                                {packageBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl border border-white/20">
                            <Image src="/assets/qawwali2.jpg" alt="Sufi venue interior" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            {/* <section id="schedule" className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Sample Venue Schedule</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Typical evening flow for a venue rental</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {venueSchedule.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-4 border-b border-[#e8dfcf] last:border-0">
                                <div className="sm:w-32">
                                    <span className="inline-block bg-[#c9a55b]/10 text-[#c9a55b] font-semibold px-3 py-1 rounded-full text-xs sm:text-sm text-center">
                                        {item.time}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-base sm:text-lg text-neutral-900">{item.event}</h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4" />
                            Standard rental: 4 hours (flexible timing available)
                        </p>
                    </div>
                </div>
            </section> */}

            {/* Gallery Section */}
          
            <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Venue Gallery</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Experience the ambiance of our Sufi space</p>
                    </div>
                    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-40 sm:h-48 md:h-52 overflow-hidden rounded-xl border border-neutral-200 shadow-sm group">
                                {/* Use regular img tag instead of Next.js Image */}
                                <img
                                    src={img}
                                    alt="Sufi venue gallery"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">What Our Guests Say</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Memories from events at our venue</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 sm:p-6">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#c9a55b] text-[#c9a55b]" />
                                    ))}
                                </div>
                                <p className="text-sm sm:text-base text-neutral-700 italic">"{t.text}"</p>
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
            <section className="py-12 sm:py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Venue FAQs</h2>
                        <p className="mt-3 text-sm sm:text-base text-white/80">Everything you need to know about booking our Sufi venue</p>
                    </div>
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6 hover:bg-white/10 transition">
                                <div className="mb-3 inline-flex rounded-full bg-white/10 p-2">
                                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold">{f.q}</h3>
                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            {/* Booking Section */}
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-white text-gray-900">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 md:p-10 shadow-sm">

                        {/* Heading */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900">
                                Reserve the Venue
                            </h2>
                            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
                                Check availability for your preferred date
                            </p>
                        </div>

                        {/* Form */}
                        <form className="mt-6 grid gap-4 md:grid-cols-2">

                            <input
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition placeholder:text-gray-500"
                                placeholder="Full Name"
                            />

                            <input
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition placeholder:text-gray-500"
                                placeholder="Phone Number"
                            />

                            <input
                                type="email"
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition placeholder:text-gray-500"
                                placeholder="Email Address"
                            />

                            <input
                                type="date"
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition"
                            />

                            <select className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition md:col-span-2">
                                <option value="">Select Package</option>
                                <option>Main Sufi Hall (up to 80 guests)</option>
                                <option>Private Majlis Room (10-30 guests)</option>
                                <option>Outdoor Courtyard (up to 50 guests)</option>
                                <option>Full Venue Buyout</option>
                            </select>

                            <select className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition md:col-span-2">
                                <option value="">Expected Guest Count</option>
                                <option>10-30 guests (Intimate)</option>
                                <option>30-60 guests</option>
                                <option>60-80 guests</option>
                                <option>80+ guests (Full buyout)</option>
                            </select>

                            <textarea
                                rows={4}
                                className="md:col-span-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition placeholder:text-gray-500"
                                placeholder="Tell us about your event, preferred date flexibility, and any special requests (catering, extended hours, specific qawwali artists)..."
                            />

                            <button
                                type="submit"
                                className="md:col-span-2 rounded-lg bg-[#c9a55b] px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741]"
                            >
                                Send Venue Inquiry
                            </button>

                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}