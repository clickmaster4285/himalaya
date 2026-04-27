"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Presentation, Wifi, Mic, Video, Laptop, Briefcase,
    PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Dumbbell, Car, Sun, Moon, ClipboardList, Plane, Award,
    Gift, Target, PenTool, Smile, ThermometerSun, Globe,
    Headphones, Projector, LayoutTemplate, FileText,
    Send, MoonStar, Flower2, Camera, Music, Utensils,
    Cake, Balloon, Trees, Tent, Drum, Film
} from "lucide-react";

const heroSlides = [
    "/assets/farewell1.webp",
    "/assets/farewell2.webp",
    "/assets/moments1.webp",
];

const farewellSpaces = [
    {
        title: "Sunset Terrace",
        text: "Open-air terrace with panoramic mountain views, perfect for golden hour farewells and intimate send-offs with up to 80 guests.",
        icon: Sun,
    },
    {
        title: "Pine Forest Glade",
        text: "Natural forest clearing surrounded by ancient pine trees, ideal for emotional goodbyes and memorable group photographs.",
        icon: Trees,
    },
    {
        title: "Cozy Firepit Lounge",
        text: "Warm and intimate evening setting with firepits, comfortable seating, and fairy lights for meaningful farewell conversations.",
        icon: MoonStar,
    },
];

const farewellAmenities = [
    {
        title: "Custom Decor Setup",
        text: "Personalized floral arrangements, themed backdrops, and ambient lighting tailored to your farewell theme",
        icon: Flower2,
    },
    {
        title: "Professional Photography",
        text: "On-site photographer to capture every emotional moment and group photo",
        icon: Camera,
    },
    {
        title: "Live Music Options",
        text: "Acoustic guitar, soft piano, or traditional dhol - choose your farewell soundtrack",
        icon: Music,
    },
    {
        title: "Custom Catering",
        text: "Finger foods, mocktails, desserts, or full dinner - designed for your gathering",
        icon: Utensils,
    },
];

const farewellPackages = [
    {
        name: "Intimate Send-off",
        duration: "2-3 Hours",
        price: "Upon Request",
        features: [
            "Private terrace or garden setting",
            "Custom floral arrangements",
            "Mocktail & dessert station",
            "Sound system for speeches",
            "Farewell favor for each guest"
        ],
        icon: Heart,
    },
    {
        name: "Celebration Farewell",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Pine forest glade setup",
            "Live acoustic musician",
            "Full catering with dinner",
            "Professional photographer (2 hours)",
            "Custom farewell backdrop",
            "Sparkler send-off moment"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Legacy Farewell Weekend",
        duration: "2 Days",
        price: "Upon Request",
        features: [
            "Full venue buyout",
            "Overnight villa accommodation",
            "Gala farewell dinner",
            "Sunset ceremony + campfire",
            "Full event coverage",
            "Custom video montage",
            "Guest accommodation available"
        ],
        icon: Crown,
    },
];

const farewellBenefits = [
    "Private, intimate settings for meaningful goodbyes",
    "Multiple venue options from forest to terrace to firepit",
    "Flexible timing - daytime farewells or sunset ceremonies",
    "Customizable themes - casual, elegant, festive, or traditional",
    "Professional event coordinator dedicated to your farewell",
    "On-site photography and videography options",
    "Catering from casual bites to formal dinner",
    "Group activities available (games, music, storytelling)",
];

const farewellThemes = [
    { theme: "Sunset Sparkler Send-off", desc: "Golden hour farewell with sparklers, fairy lights, and warm wishes", icon: Sparkles },
    { theme: "Forest Story Circle", desc: "Intimate gathering around a campfire with storytelling and acoustic music", icon: Trees },
    { theme: "Traditional Dhol Farewell", desc: "Energetic send-off with dhol, clapping, and celebratory atmosphere", icon: Drum },
    { theme: "Garden Tea Farewell", desc: "Elegant afternoon tea setting with pastries, floral arrangements, and soft piano", icon: Coffee },
    { theme: "Star Gazing Send-off", desc: "Nighttime farewell under the stars with telescopes and warm beverages", icon: MoonStar },
    { theme: "Breakfast Goodbye", desc: "Morning farewell brunch before guests depart", icon: Sun },
];

const farewellSchedule = [
    { time: "4:00 PM", event: "Guest Arrival", desc: "Welcome drinks and seating arrangement" },
    { time: "4:30 PM", event: "Farewell Speeches", desc: "Emotional tributes and thank yous" },
    { time: "5:00 PM", event: "Photo Session", desc: "Group photos and candid moments" },
    { time: "5:30 PM", event: "Refreshments", desc: "High tea or cocktail hour" },
    { time: "6:00 PM", event: "Sunset Moment", desc: "Golden hour photography and quiet reflection" },
    { time: "6:30 PM", event: "Main Send-off", desc: "Sparkler ceremony or traditional farewell" },
    { time: "7:00 PM", event: "Dinner / Campfire", desc: "Evening meal or fireside gathering" },
    { time: "8:30 PM", event: "Final Goodbyes", desc: "Guest departure with farewell favors" },
];

const gallery = [
    "/assets/farewell1.webp",
    "/assets/farewell2.webp",
    "/assets/moments1.webp",
    "/assets/moments2.webp",
];

const faqs = [
    { q: "What types of farewell events can you host?", a: "We host retirement send-offs, colleagues moving abroad, team member transitions, graduation celebrations, and personal milestone farewells. Each event is customized to the honoree and the group size." },
    { q: "How many guests can attend a farewell event?", a: "Farewell events can range from intimate gatherings of 10 people to larger celebrations of up to 120 guests, depending on the venue space selected." },
    { q: "Can you accommodate cultural farewell traditions?", a: "Absolutely. We've hosted traditional dhol farewells, prayer ceremonies, rose petal send-offs, and many other cultural traditions. Just let us know your requirements." },
    { q: "Is catering included for farewell events?", a: "Yes, all packages include catering from light refreshments to full dinner. Menu can be customized based on your preferences and budget." },
    { q: "Can we have a combined celebration (farewell + other event)?", a: "Yes, many clients combine farewells with welcome dinners, retirement parties, or milestone celebrations. We can create a blended schedule." },
    { q: "What is included in the professional photography?", a: "Our photography packages include group portraits, candid moments, detail shots of decor, and the main send-off moment. Edited digital photos delivered within 7 days." },
    { q: "Do you provide farewell favors for guests?", a: "Yes, we can arrange custom farewell favors including branded items, local specialties, flowers, or personalized keepsakes." },
    { q: "What happens in case of bad weather for outdoor events?", a: "We have covered indoor alternatives for every outdoor space. The venue coordinator will work with you on a weather contingency plan well in advance." },
];

const testimonials = [
    {
        name: "Sarah Ahmed",
        event: "Colleague Farewell",
        text: "The sunset terrace farewell was absolutely perfect. Our colleague felt so loved. The team handled everything - from decor to catering to the surprise video tribute.",
        rating: 5,
    },
    {
        name: "Michael Chen",
        event: "Retirement Send-off",
        text: "We hosted a 60-person retirement farewell in the pine forest glade. The campfire and storytelling session brought everyone to tears. Unforgettable experience.",
        rating: 5,
    },
    {
        name: "Fatima Khan",
        event: "Moving Abroad Farewell",
        text: "The sparkler send-off at sunset created the most beautiful photos. Our friend still talks about her farewell party months later. Highly recommend!",
        rating: 5,
    },
];

export default function FarewellMomentsPage() {
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
                            alt="Farewell moments"
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
                        <Send className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Moments | Farewells & Send-offs</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Warm & Memorable
                        <br />
                        Farewell Celebrations
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">Host your warm & memorable farewell celebrations with us. Create meaningful goodbyes for colleagues, friends, and loved ones in our beautiful mountain setting. From intimate send-offs to grand celebrations, we craft farewells that honor the moment.</p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan a Farewell
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Farewell Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Farewell Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Settings</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Farewell Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Beautiful backdrops for meaningful goodbyes
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {farewellSpaces.map((space) => {
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

            {/* Farewell Themes Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Farewell Themes</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Choose the perfect style for your send-off</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {farewellThemes.map((theme) => {
                            const Icon = theme.icon;
                            return (
                                <div key={theme.theme} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 hover:shadow-md transition">
                                    <div className="mb-3 inline-flex rounded-full bg-[#c9a55b]/10 p-2 text-[#c9a55b]">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-base font-semibold text-neutral-900">{theme.theme}</h3>
                                    <p className="mt-1 text-xs text-neutral-600">{theme.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Farewell Amenities Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Farewell Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for a perfect send-off</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {farewellAmenities.map((amenity) => {
                            const Icon = amenity.icon;
                            return (
                                <div key={amenity.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 text-center hover:shadow-md transition">
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

            {/* Farewell Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Farewell Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Customizable options for every goodbye</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {farewellPackages.map((pkg) => {
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

            {/* Benefits & Sample Schedule Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Meaningful Farewells</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed to honor the moment</p>
                            <ul className="mt-6 space-y-3">
                                {farewellBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sample Schedule */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Clock className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Sample Timeline</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Farewell Event Flow</h3>
                            <div className="space-y-3">
                                {farewellSchedule.slice(0, 6).map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <div className="w-20 flex-shrink-0">
                                            <span className="text-[#c9a55b] font-semibold text-xs">{item.time}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-neutral-900 text-sm">{item.event}</p>
                                            <p className="text-xs text-neutral-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-neutral-500 italic">*Timeline fully customizable to your needs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Farewell Moments Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Memorable send-offs at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Farewell gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What Our Guests Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from farewell celebrations</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-[#fbf7ee] p-6">
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
            <section className="py-16 md:py-20 bg-[#fbf7ee] text-gray-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Farewell FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting a farewell with us
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition"
                            >
                                <div className="mb-3 inline-flex rounded-full bg-[#c9a55b]/10 p-2">
                                    <HelpCircle className="h-5 w-5 text-[#c9a55b]" />
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan a Meaningful Farewell</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Tell us about your send-off and we'll create a custom proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Organization / Group Name"
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
                                <option value="" className="bg-neutral-900">Farewell Type</option>
                                <option className="bg-neutral-900">Retirement Send-off</option>
                                <option className="bg-neutral-900">Colleague Moving Abroad</option>
                                <option className="bg-neutral-900">Team Member Farewell</option>
                                <option className="bg-neutral-900">Graduation Celebration</option>
                                <option className="bg-neutral-900">Personal Milestone Farewell</option>
                                <option className="bg-neutral-900">Other Celebration</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Guests</option>
                                <option className="bg-neutral-900">10-25 guests</option>
                                <option className="bg-neutral-900">25-50 guests</option>
                                <option className="bg-neutral-900">50-80 guests</option>
                                <option className="bg-neutral-900">80-120 guests</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package Interest</option>
                                <option className="bg-neutral-900">Intimate Send-off (2-3 hours)</option>
                                <option className="bg-neutral-900">Celebration Farewell (4 hours)</option>
                                <option className="bg-neutral-900">Legacy Farewell Weekend (2 days)</option>
                                <option className="bg-neutral-900">Custom Package</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about the honoree, your desired theme, catering preferences, special requests, and any cultural traditions you'd like to include..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Farewell Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our events team will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}