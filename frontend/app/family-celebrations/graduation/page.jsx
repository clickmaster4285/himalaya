"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    GraduationCap, Gift, Music, Camera, Trophy, Award,
    PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Dumbbell, Car, Sun, Moon, ClipboardList, Plane,
    Film, Headphones, LayoutTemplate, FileText, Mic,
    Video, Laptop, Briefcase, Smile, Globe, Cake
} from "lucide-react";

const heroSlides = [
    "/assets/graduation1.webp",
    "/assets/graduation-party2.webp",
    "/assets/grad-celebration.webp",
];

const celebrationSpaces = [
    {
        title: "The Cap & Gown Hall",
        text: "Modern auditorium with stage, backdrop for photos, and capacity for up to 200 guests. Perfect for graduation ceremonies and reception parties.",
        icon: GraduationCap,
    },
    {
        title: "Urban Loft Lounge",
        text: "Trendy industrial-chic space with neon signs, lounge seating, and DJ booth. Ideal for after-parties and young graduate celebrations up to 120 guests.",
        icon: PartyPopper,
    },
    {
        title: "Garden Pavillion",
        text: "Outdoor covered space with string lights, photo op areas, and fire pits. Great for summer grad parties and casual family gatherings (up to 150 guests).",
        icon: Sun,
    },
];

const gradAmenities = [
    {
        title: "Graduation Staging",
        text: "Professional stage, podium, backdrop, and red carpet for diploma presentations",
        icon: Trophy,
    },
    {
        title: "Photo & Video Setup",
        text: "360 photo booth, step-and-repeat backdrop, and social media sharing station",
        icon: Camera,
    },
    {
        title: "Sound & Lighting",
        text: "Premium sound system, dance floor lighting, and wireless mics for speeches",
        icon: Speaker,
    },
    {
        title: "Award & Gift Area",
        text: "Styled gift table, diploma display case, and memory board for photos",
        icon: Gift,
    },
];

const gradPackages = [
    {
        name: "Diploma Ceremony",
        duration: "3 Hours",
        price: "Upon Request",
        features: [
            "Private event space (3 hours)",
            "Stage & graduation backdrop",
            "Basic sound system + 2 mics",
            "Classic seating arrangement",
            "Light refreshments & water",
            "Graduation cap toss moment"
        ],
        icon: Heart,
    },
    {
        name: "Grad Bash Celebration",
        duration: "5 Hours",
        price: "Upon Request",
        features: [
            "Full venue access (5 hours)",
            "Red carpet entrance & photo wall",
            "DJ with dance floor lighting",
            "Buffet dinner + dessert station",
            "360 video booth included",
            "Personalized grad signage",
            "Party favors for guests"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Ultimate Grad Fest",
        duration: "6 Hours+",
        price: "Upon Request",
        features: [
            "Full venue buyout (6+ hours)",
            "Live musician or DJ + MC",
            "Premium open bar (select hours)",
            "Custom neon sign with grad's name",
            "Late-night snack station",
            "Professional photographer",
            "Fireworks or sparkler farewell"
        ],
        icon: Crown,
    },
];

const gradBenefits = [
    "Stylish event staging with custom grad backdrop and class year signage",
    "Red carpet entrance for memorable photos and social moments",
    "Professional AV setup for speeches, slideshows, and music",
    "Flexible layouts for ceremony, dining, and dancing",
    "On-site coordinator to manage timeline and vendors",
    "Ample parking and easy venue access",
    "Graduation cap and gown hanging station",
    "Social media wall with real-time photo printing",
];

const celebrationSchedule = [
    { time: "4:00 PM", event: "Venue Setup & Decor", desc: "Backdrop installation, seating arrangement, and grad signage" },
    { time: "5:00 PM", event: "Guest Arrival & Red Carpet", desc: "Photo ops, guest book signing, and mingling" },
    { time: "5:30 PM", event: "Graduate Procession", desc: "Walk down the aisle with diploma and music" },
    { time: "6:00 PM", event: "Speeches & Toast", desc: "Family, friends, and graduate share memories" },
    { time: "6:30 PM", event: "Dinner Buffet", desc: "Celebratory meal and cake cutting" },
    { time: "7:30 PM", event: "Dancing & Celebration", desc: "DJ, party games, and social media sharing" },
    { time: "9:00 PM", event: "Sparkler Send-off", desc: "Grand exit with glowing farewell" },
];

const gallery = [
    "/assets/grad-ceremony.webp",
    "/assets/grad-party-dancefloor.webp",
    "/assets/grad-photo-booth.webp",
    "/assets/grad-cap-toss.webp",
];

const faqs = [
    { q: "What's the maximum capacity for a graduation party?", a: "Our Cap & Gown Hall holds up to 200 guests. With outdoor pavilion combined, we can host up to 300 for larger celebrations." },
    { q: "Can we have both a ceremony and party at the venue?", a: "Absolutely! Many families combine a short diploma ceremony followed by a reception. We'll help transition the space seamlessly." },
    { q: "Do you provide graduation decorations?", a: "Yes, we offer staging, backdrops, class year banners, and table decor. You can also bring your own school colors and theme." },
    { q: "Is AV equipment included for speeches and slideshows?", a: "All packages include basic AV. Premium packages add a large screen, slideshow display, and dedicated AV tech." },
    { q: "Can we bring a DJ or live band?", a: "Yes, outside entertainment is welcome. Our sound system can connect to their equipment, or they can use our premium setup." },
    { q: "Is there space for a photo booth?", a: "Yes, we have dedicated photo booth areas. We can also provide a 360 video booth upon request." },
    { q: "What about catering options?", a: "We offer flexible catering — buffet, food stations, or plated dinners. You can also bring your own caterer for family recipes." },
    { q: "Can guests stay overnight?", a: "We have partnerships with nearby hotels offering discounted rates for graduation party guests. Ask our coordinator for details." },
];

const testimonials = [
    {
        name: "Jennifer & Mark Thompson",
        event: "High School Graduation",
        text: "The Cap & Gown Hall was perfect for our daughter's celebration. The red carpet and photo wall made it feel so special. The DJ kept everyone dancing!",
        rating: 5,
    },
    {
        name: "David Kim",
        event: "College Graduation Bash",
        text: "Best grad party ever! The Urban Loft had amazing vibes, and the 360 video booth was a hit. Highly recommend for young adult celebrations.",
        rating: 5,
    },
    {
        name: "The Rodriguez Family",
        event: "Medical School Graduation",
        text: "Professional, elegant, and stress-free. The AV setup for speeches was flawless, and the catering was delicious. Thank you for making this milestone unforgettable.",
        rating: 5,
    },
];

export default function GraduationPartiesPage() {
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
                            alt="Graduation party celebration"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />

                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <GraduationCap className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Youth | Graduation Parties</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Celebrate Your
                        <br />
                        <span className="text-[#c9a55b]">Big Achievement</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                        Celebrate big achievements with stylish event staging. From high school to college and beyond,
                        host an unforgettable graduation party in our modern venue.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Grad Party
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Grad Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Celebration Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Graduation Celebration Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Stylish spaces designed for honoring achievements
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {celebrationSpaces.map((space) => {
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

            {/* Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Graduation Party Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Stylish staging for milestone achievements</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {gradAmenities.map((amenity) => {
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

            {/* Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Graduation Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Celebrate achievements in style</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {gradPackages.map((pkg) => {
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

            {/* Benefits & Schedule Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Stylish Grad Celebrations</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for memory-making moments</p>
                            <ul className="mt-6 space-y-3">
                                {gradBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Schedule */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Clock className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Sample Timeline</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Grad Party Schedule</h3>
                            {celebrationSchedule.map((item) => (
                                <div key={item.time} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{item.time}</p>
                                    <p className="text-sm text-neutral-800 font-medium">{item.event}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Timeline fully customizable to your celebration</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Grad Party Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Unforgettable graduation celebrations at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Graduation gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Happy Grads & Families Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Celebrating achievements together</p>
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
                            Graduation Party FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting your grad celebration with us
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Grad Party</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry and we'll create a custom proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Graduate's Name"
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
                                <option value="" className="bg-neutral-900">Education Level</option>
                                <option className="bg-neutral-900">High School Graduation</option>
                                <option className="bg-neutral-900">College / University</option>
                                <option className="bg-neutral-900">Graduate School / Masters</option>
                                <option className="bg-neutral-900">Medical / Law School</option>
                                <option className="bg-neutral-900">PhD / Doctorate</option>
                                <option className="bg-neutral-900">Trade / Technical School</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Number of Guests</option>
                                <option className="bg-neutral-900">20-50 guests (Intimate)</option>
                                <option className="bg-neutral-900">50-100 guests</option>
                                <option className="bg-neutral-900">100-150 guests</option>
                                <option className="bg-neutral-900">150-200 guests</option>
                                <option className="bg-neutral-900">200-300 guests</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Diploma Ceremony (3 hours)</option>
                                <option className="bg-neutral-900">Grad Bash Celebration (5 hours)</option>
                                <option className="bg-neutral-900">Ultimate Grad Fest (6+ hours)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your graduate — school name, achievements, party theme, entertainment preferences, catering needs, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Grad Party Proposal
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