import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, MapPin, Users, Camera, Shield, Heart, Clock, Utensils, BedDouble, Mountain } from "lucide-react";

export const metadata: Metadata = {
    title: "Wedding Venue Near Islamabad | Mountain Wedding | Bhurban | Himalaya Villas",
    description: "Wedding venue near Islamabad at Himalaya Villas Bhurban. Mountain wedding venue with pine forest setting, full catering, on-site accommodation. Perfect destination wedding 60 minutes from Islamabad. Book your dream wedding!",
    keywords: "wedding venue near Islamabad, mountain wedding Bhurban, destination wedding Murree Hills, outdoor wedding venue Pakistan, wedding resort Himalaya Villas, wedding ceremony Bhurban, wedding reception near Islamabad",
    openGraph: {
        title: "Wedding Venue Near Islamabad - Mountain Wedding at Himalaya Villas",
        description: "Exclusive mountain wedding venue near Islamabad with pine forest setting, full catering, and accommodation at Himalaya Villas Bhurban.",
        type: "website",
        url: "https://himalayavillas.com/wedding-venue-near-islamabad",
    },
    alternates: {
        canonical: "https://himalayavillas.com/wedding-venue-near-islamabad",
    },
};

const whatsappNumber = "+923045679000"; // Replace with actual
const buildWhatsAppBookingUrl = (message: string) => `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How far is Himalaya Villas from Islamabad for a wedding?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Himalaya Villas is 60–70 minutes from central Islamabad and 45–60 minutes from Rawalpindi. Private guest transport from Islamabad is arranged as part of wedding packages."
            }
        },
        {
            "@type": "Question",
            "name": "Can we have an outdoor nikkah ceremony at Himalaya Villas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Outdoor nikkah ceremonies in the property's pine forest setting are one of the most requested functions. Covered backup arrangements are provided for all outdoor ceremonies."
            }
        },
        {
            "@type": "Question",
            "name": "What is the cost of a wedding at Himalaya Villas?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wedding packages range from PKR 150,000 for an intimate elopement to PKR 1.2M+ for a full two-day Mountain Wedding Weekend. All packages include exclusive property use."
            }
        }
    ]
};

const eventVenueSchema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "name": "Himalaya Villas Wedding Venue",
    "description": "Private mountain wedding venue in Bhurban, Murree Hills. Exclusive pine forest estate for nikkah ceremonies, walima receptions, and destination weddings. 60 minutes from Islamabad.",
    "url": "https://himalayavillas.com/wedding-venue-near-islamabad",
    "telephone": "+92 304 567 9000",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bhurban",
        "addressLocality": "Murree",
        "addressRegion": "Punjab",
        "addressCountry": "PK"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "33.9346",
        "longitude": "73.4592"
    },
    "maximumAttendeeCapacity": 120,
    "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Outdoor Ceremony Space", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "On-Site Accommodation", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "In-House Catering", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Event Coordinator", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Exclusive Venue Hire", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Halal Catering", "value": true }
    ],
    "priceRange": "PKR 150,000 - PKR 1,200,000"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://himalayavillas.com" },
        { "@type": "ListItem", "position": 2, "name": "Wedding Venue Near Islamabad", "item": "https://himalayavillas.com/wedding-venue-near-islamabad" }
    ]
};

export default function WeddingVenuePage() {
    return (
        <div className="min-h-screen bg-[#F6F1EA]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventVenueSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <Navbar />

            {/* HERO SECTION */}
<section className="relative h-[70vh] min-h-[500px] flex items-center justify-start overflow-hidden">
    <Image
        src="/assets/wedding8.jpg"
        alt="Wedding Venue Near Islamabad"
        fill
        className="object-cover"
        priority
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
    <div className="relative z-10 text-left px-6 md:px-12 max-w-7xl text-white">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Wedding Venue Near Islamabad <br />
            <span className="text-[#c9a55b] italic font-normal">A Mountain Setting Your Guests Will Never Forget</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/90 max-w-3xl font-light leading-relaxed">
            Himalaya Villas, Bhurban — 60 minutes from Islamabad. Pakistan&apos;s most distinctive private wedding venue. Exclusive pine forest setting, in-villa accommodation, and complete privacy from arrival to the last guest&apos;s departure.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
            <a
                href={buildWhatsAppBookingUrl("I would like to arrange a site visit for a wedding at Himalaya Villas")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#c9a55b] hover:bg-[#b8944f] text-white rounded-full font-medium transition duration-300 shadow-lg text-sm md:text-base"
            >
                WhatsApp to Enquire + Book a Site Visit
            </a>
        </div>
    </div>
</section>

            {/* FEATURED SNIPPET / AEO ANSWER BLOCK */}
            <section className="py-16 px-6 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#eadfce] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#c9a55b]"></div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">What is the best wedding venue near Islamabad?</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Himalaya Villas in Bhurban, Murree Hills, is Pakistan&apos;s leading private destination wedding venue near Islamabad — 60–90 minutes from the capital by road. The venue offers exclusive use of a pine forest property for nikkah ceremonies, walima receptions, and intimate pre-wedding functions, with on-site villa accommodation for the wedding party. Guest capacity ranges from 20 to 120. The setting — natural pine forest, mountain views, complete privacy — provides a visual backdrop unmatched by any banquet hall or hotel ballroom in the region.
                    </p>
                </div>
            </section>

            {/* WHY COUPLES CHOOSE */}
            <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900 mb-8">
                    Why Couples from <span className="text-[#c9a55b] italic">Islamabad and Rawalpindi</span> Are Choosing Bhurban
                </h2>
                <div className="text-lg text-neutral-600 leading-relaxed space-y-6 max-w-4xl mx-auto text-left md:text-center">
                    <p>
                        Every wedding venue search eventually confronts the same shortlist: the hotel ballroom, the banquet hall, the Bahria farmhouse. They are competent options. They are not memorable ones. In a Pakistani wedding culture where the photography and the guest experience are remembered for decades, the venue that produces something genuinely different has a permanent advantage over one that could be any function room in any city.
                    </p>
                    <p>
                        Himalaya Villas in Bhurban occupies a position that no Islamabad banquet hall can replicate: a private pine forest estate on the Murree Hills, 60–90 minutes from the capital, with mountain views, clean air, and the kind of natural setting that does not need to be decorated — it simply needs to be used.
                    </p>
                    <p className="font-medium text-neutral-800">
                        For couples who have attended enough weddings in commercial banquet halls to know exactly what they do not want, Himalaya Villas is the alternative that makes the decision obvious.
                    </p>
                </div>
            </section>

            {/* DISTANCE SECTION */}
            <section className="py-16 md:py-24 bg-neutral-900 text-white px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <MapPin className="w-12 h-12 text-[#c9a55b] mx-auto mb-6" />
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-10">How Far Is Himalaya Villas from Islamabad?</h2>

                    <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-[#c9a55b] text-sm uppercase tracking-wider font-semibold mb-1">Islamabad (F-10 / Blue Area)</p>
                            <p className="text-2xl font-light">60–70 minutes</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-[#c9a55b] text-sm uppercase tracking-wider font-semibold mb-1">Rawalpindi (Saddar / Bahria Town)</p>
                            <p className="text-2xl font-light">45–60 minutes</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-[#c9a55b] text-sm uppercase tracking-wider font-semibold mb-1">Lahore (by road)</p>
                            <p className="text-2xl font-light">4.5–5 hours</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-[#c9a55b] text-sm uppercase tracking-wider font-semibold mb-1">Islamabad Int. Airport</p>
                            <p className="text-2xl font-light">75–90 minutes</p>
                        </div>
                    </div>
                    <p className="mt-10 text-white/80 max-w-2xl mx-auto italic">
                        We arrange private coaches and transport for wedding guests from Islamabad and Rawalpindi. No guest needs to drive themselves.
                    </p>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
                        Wedding Venue <span className="text-[#c9a55b] italic">Comparison</span>
                    </h2>
                    <p className="mt-4 text-neutral-600">Himalaya Villas vs Your Other Options accessible from Islamabad.</p>
                </div>

                <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-[#eadfce]">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-[#eadfce]">
                                <th className="p-5 font-semibold text-neutral-500 uppercase text-sm tracking-wider">Criterion</th>
                                <th className="p-5 font-bold text-neutral-900 bg-[#c9a55b]/10 text-base">Himalaya Villas</th>
                                <th className="p-5 font-semibold text-neutral-700 text-sm">Banquet Hall (ISB)</th>
                                <th className="p-5 font-semibold text-neutral-700 text-sm">Hotel Ballroom</th>
                                <th className="p-5 font-semibold text-neutral-700 text-sm">Farmhouse Venue</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm md:text-base">
                            {[
                                { label: "Setting", hv: "Pine Forest · Mountain", b1: "Commercial Hall", b2: "Hotel Interior", b3: "Flat Farmland" },
                                { label: "Privacy", hv: "Fully Exclusive", b1: "Shared Complex", b2: "Shared Building", b3: "Semi-Exclusive" },
                                { label: "Guest Capacity", hv: "20–120 guests", b1: "100–800 guests", b2: "50–300 guests", b3: "50–200 guests" },
                                { label: "Accommodation", hv: "On-site Villas", b1: "Not Available", b2: "Hotel Rooms", b3: "Limited / None" },
                                { label: "Outdoor Ceremony", hv: "Pine Forest Setting", b1: "Not Available", b2: "Rarely", b3: "Garden (flat)" },
                                { label: "Photography", hv: "Mountain Backdrop", b1: "Plain Backdrop", b2: "Indoor / Staged", b3: "Garden" },
                                { label: "Catering", hv: "In-Villa · Custom", b1: "Standardised", b2: "Hotel Menu", b3: "External" },
                                { label: "Distance from ISB", hv: "60–90 minutes", b1: "0–20 minutes", b2: "0–20 minutes", b3: "30–60 minutes" },
                                { label: "Exclusivity", hv: "Entire Property", b1: "Hall Only", b2: "Ballroom Only", b3: "Partial" },
                                { label: "Overnight Stay", hv: "Full Guest Accommodation", b1: "None", b2: "Hotel Rooms", b3: "Rare" },
                                { label: "Rate Range", hv: "PKR 300K–1.2M+ /event", b1: "PKR 150K–600K", b2: "PKR 250K–700K", b3: "PKR 100K–400K" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition">
                                    <td className="p-5 font-medium text-neutral-700">{row.label}</td>
                                    <td className="p-5 font-bold text-[#c9a55b] bg-[#c9a55b]/5">{row.hv}</td>
                                    <td className="p-5 text-neutral-600">{row.b1}</td>
                                    <td className="p-5 text-neutral-600">{row.b2}</td>
                                    <td className="p-5 text-neutral-600">{row.b3}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-neutral-500 italic max-w-4xl mx-auto">
                    *Rates are per event / function. Himalaya Villas rates include full venue exclusivity, not per-head catering. Guest transport from Islamabad arranged on request.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    <Link href="/luxury-hotel-murree" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
                        → View Himalaya Villas accommodation
                    </Link>
                    <Link href="/murree-hotel-packages" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
                        → See all packages and rates
                    </Link>
                </div>

                <div className="mt-16 text-center bg-white p-10 rounded-2xl border border-[#eadfce] shadow-sm max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-3">Book a Wedding Venue Site Visit</h3>
                    <p className="text-neutral-600 mb-6">Walk the property, experience the setting, meet our event team — before committing anything.</p>
                    <a
                        href={buildWhatsAppBookingUrl("I'd like to arrange a site visit for my wedding at Himalaya Villas")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-medium transition shadow-md"
                    >
                        WhatsApp to Arrange a Site Visit →
                    </a>
                </div>
            </section>

            {/* WHAT WE OFFER */}
            <section className="py-20 md:py-28 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
                            What Himalaya Villas <span className="text-[#c9a55b] italic">Offers</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Shield className="w-8 h-8 text-[#c9a55b]" />,
                                title: "Exclusive Use of the Entire Property",
                                desc: "When you book Himalaya Villas for a wedding function, the entire property is yours. No other guests. No other events running simultaneously. No shared car park, shared entrance, or shared facilities. From the moment your first guest arrives to the last departure, the pine forest estate is exclusively your family's. This is structurally impossible at a hotel ballroom or a multi-function banquet complex."
                            },
                            {
                                icon: <Mountain className="w-8 h-8 text-[#c9a55b]" />, // Need Mountain imported or replace. Let's use Camera for now or Tree? Will replace with Camera
                                title: "Natural Pine Forest Ceremony Setting",
                                desc: "The outdoor ceremony space at Himalaya Villas is not a constructed garden or a levelled courtyard. It is natural Himalayan pine forest — ancient trees, mountain air, the sound of the forest, and natural light that a tent or a chandelier cannot replicate. Nikkah ceremonies conducted under pine canopy at altitude produce photographs that no studio backdrop can imitate."
                            },
                            {
                                icon: <BedDouble className="w-8 h-8 text-[#c9a55b]" />,
                                title: "On-Site Villa Accommodation",
                                desc: "The wedding couple, immediate family, and close friends stay on-site across the property's villa accommodation — eliminating the hotel check-in, the late-night drive back to the city, and the fragmentation that turns wedding nights into logistics exercises. Bridal suite, family villas, and guest accommodation are all within the property."
                            },
                            {
                                icon: <Utensils className="w-8 h-8 text-[#c9a55b]" />,
                                title: "Fully Custom In-Villa Catering",
                                desc: "Wedding catering at Himalaya Villas is prepared by our kitchen team to a menu built with the family — not selected from a standardised banquet menu. Halal food is the default standard. Traditional Pakistani cuisine, regional specialties, and contemporary menus are all accommodated. The food is served in the setting, not carried from a distant kitchen."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-[#c9a55b]" />, // Reusing shield
                                title: "Complete Privacy — No Public",
                                desc: "Wedding functions at Himalaya Villas are not visible from public roads. The property is accessed via a private entry and the grounds are fully enclosed. There are no passing guests, no hotel residents walking through the lobby, and no other functions sharing the property. For families where the guest list is curated and discretion is expected, this is a baseline requirement."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-[#c9a55b]" />,
                                title: "Dedicated Wedding Coordinator",
                                desc: "Every Himalaya Villas wedding booking is assigned a dedicated event coordinator who manages the end-to-end logistics from venue planning to day-of execution. Décor, florals, lighting, music arrangement, catering timeline, guest transport co-ordination, and accommodation check-in are all handled through one point of contact. Your role is to be present."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-[#F6F1EA] border border-[#eadfce]/50 hover:border-[#c9a55b] transition duration-300">
                                <div className="mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PACKAGES */}
            <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
                        Wedding <span className="text-[#c9a55b] italic">Packages</span>
                    </h2>
                    <p className="mt-4 text-neutral-600 max-w-3xl mx-auto">
                        The packages below are starting frameworks. Every wedding at Himalaya Villas is customised — package inclusions, guest numbers, catering menus, and décor themes are built around each family's specific requirements and budget.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {[
                        {
                            name: "Nikkah Ceremony",
                            includes: "Ceremony setup · Floral arrangement · In-villa dining · Suite for couple · Photography access",
                            capacity: "20–50 guests",
                            price: "PKR 300K–500K"
                        },
                        {
                            name: "Intimate Reception",
                            includes: "Private reception space · Full catering · Décor · Accommodation (3 villas) · Dedicated event coordinator",
                            capacity: "30–80 guests",
                            price: "PKR 500K–800K"
                        },
                        {
                            name: "Mountain Wedding Weekend",
                            includes: "Nikkah + Walima across 2 days · Full venue exclusivity · Guest accommodation · All F&B · Photography backdrop access",
                            capacity: "50–120 guests",
                            price: "PKR 800K–1.2M+"
                        },
                        {
                            name: "Pre-Wedding Functions",
                            includes: "Dholki / Mehndi setup · Outdoor evening space · Custom F&B · Lighting · Music arrangement",
                            capacity: "30–80 guests",
                            price: "PKR 200K–400K"
                        },
                        {
                            name: "Destination Elopement",
                            includes: "Intimate ceremony · 2-night villa stay · Romantic dining · Floral setup · Total privacy",
                            capacity: "2–15 guests",
                            price: "PKR 150K–300K"
                        }
                    ].map((pkg, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-[#eadfce] shadow-sm hover:shadow-md transition flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{pkg.name}</h3>
                                <p className="text-[#c9a55b] font-bold text-xl mb-4">{pkg.price}</p>
                                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Includes:</p>
                                <p className="text-neutral-600 text-sm leading-relaxed mb-6">{pkg.includes}</p>
                            </div>
                            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
                                <span className="text-sm text-neutral-500 font-medium">Capacity: <span className="text-neutral-900">{pkg.capacity}</span></span>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-xs text-neutral-500 text-center italic">
                    *All packages include exclusive property use for the function duration. Accommodation charges for overnight guests are in addition to event package rates. Customisation available on all packages — contact us to discuss specific requirements.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    <Link href="/romantic-hotels-murree" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
                        → Honeymoon and romantic stays post-wedding
                    </Link>
                    <Link href="/family-hotels-murree" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
                        → Accommodation for wedding guests
                    </Link>
                    <Link href="/corporate-hotels-murree-bhurban" className="text-[#c9a55b] font-medium hover:underline flex items-center gap-2">
                        → Corporate event enquiries
                    </Link>
                </div>

                <div className="mt-16 text-center bg-[#c9a55b]/10 p-10 rounded-2xl border border-[#c9a55b]/20 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900">Request a Wedding Package Quote</h3>
                    <p className="text-neutral-600 mb-6">Share your function date, guest count, and requirements — we'll send a full proposal within 24 hours.</p>
                    <a
                        href={buildWhatsAppBookingUrl("I would like a quote for a wedding package at Himalaya Villas")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-[#c9a55b] hover:bg-[#b8944f] text-white rounded-full font-medium transition shadow-md"
                    >
                        WhatsApp Our Wedding Team →
                    </a>
                </div>
            </section>

            {/* IDEAL FOR / NOT IDEAL FOR */}
            <section className="py-20 bg-neutral-900 text-white px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                            Which Weddings Work Best at Himalaya Villas
                        </h2>
                        <p className="text-white/80 max-w-3xl mx-auto">
                            Himalaya Villas is the correct choice for specific types of wedding — and the wrong choice for others. This is deliberate. We are not a 500-guest banquet facility. We are a private estate for families who want an event that is exclusive, visually extraordinary, and entirely theirs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-[#c9a55b] mb-6 flex items-center gap-3">
                                <Check className="w-8 h-8" /> Ideal For:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Intimate weddings — 20 to 120 guests where quality of experience matters more than volume of attendance",
                                    "Nikkah ceremonies where the family wants a setting with natural spiritual significance rather than a commercial hall",
                                    "Destination weddings for couples who want their event to feel like a deliberate, curated experience rather than a standard function",
                                    "Pre-wedding functions (Dholki, Mehndi, Baraat) where the outdoor forest setting creates an evening atmosphere no hall can match",
                                    "Wedding weekends — couples who want to combine the Nikkah and Walima across two days with the family staying on-site",
                                    "Families from the Pakistani diaspora returning for a wedding who want a venue that genuinely impresses international guests"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-white/90">
                                        <Check className="w-5 h-5 text-[#c9a55b] flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                                <X className="w-8 h-8" /> Not Ideal For:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Weddings exceeding 150 guests — our property is designed for exclusivity, not volume",
                                    "Families requiring a dedicated on-site kitchen for bharat/barat functions of 300+ guests",
                                    "Families for whom location is strictly Islamabad or Rawalpindi city limits — Bhurban is 60–90 minutes away"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-white/90">
                                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOOKING PROCESS */}
            <section className="py-20 md:py-28 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
                        The Booking <span className="text-[#c9a55b] italic">Process</span>
                    </h2>
                    <p className="mt-4 text-neutral-600">From first enquiry to wedding day, the process is designed to remove uncertainty and keep the planning experience calm.</p>
                </div>

                <div className="space-y-8">
                    {[
                        "WhatsApp our wedding team with your date, approximate guest count, and the functions you are planning (Nikkah / Walima / Mehndi etc.)",
                        "We send a tailored package proposal within 24 hours, including venue, catering, accommodation, and event coordination.",
                        "Site visit — we arrange a private viewing of the property so the family can walk the ceremony space, the reception area, and the villa accommodation before confirming.",
                        "Package customisation — menu finalisation, décor discussion, guest transport co-ordination, accommodation allocation.",
                        "Booking confirmed with deposit. Date held exclusively for your family — no other events on your date.",
                        "Dedicated coordinator assigned 30 days before the event for detailed day-of planning.",
                        "Wedding day execution — our team manages all logistics. Your family's role is to be present."
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[#c9a55b] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
                                {i + 1}
                            </div>
                            <div className="pt-2">
                                <p className="text-neutral-800 text-lg">{step}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PHOTOGRAPHY ADVANTAGE */}
            <section className="py-20 px-6 bg-[#f0e6d6]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900 mb-6">
                            The <span className="text-[#c9a55b] italic">Photography</span> Advantage
                        </h2>
                        <p className="text-neutral-700 leading-relaxed mb-6">
                            Pine forest. Mountain light. Natural green canopy. Himalaya Villas&apos; setting produces wedding photographs and videos that are fundamentally different from anything shot in a banquet hall or hotel garden. In a culture where wedding photography is a primary measure of a successful event — shared across families, posted across platforms, preserved for decades — the visual distinctiveness of a mountain forest venue is a material decision, not an aesthetic preference.
                        </p>
                        <p className="text-neutral-900 font-medium italic border-l-4 border-[#c9a55b] pl-4">
                            Several of Pakistan&apos;s leading wedding photographers have cited Himalaya Villas as the location that produces their best-received work.
                        </p>
                        <div className="mt-8">
                            <Link href="/book-murree-hotel" className="inline-flex items-center gap-2 text-[#c9a55b] font-bold hover:underline">
                                <Camera className="w-5 h-5" /> Book your wedding venue →
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                        <Image src="/assets/wedding3.jpg" alt="Wedding Photography at Himalaya Villas" fill className="object-cover" />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 md:py-28 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
                        Frequently Asked <span className="text-[#c9a55b] italic">Questions</span>
                    </h2>
                    <p className="mt-4 text-neutral-600">Questions from couples and families in the early and mid stages of wedding venue decision-making.</p>
                </div>

                <div className="space-y-6">
                    {[
                        {
                            q: "How far is Himalaya Villas from Islamabad for a wedding?",
                            a: "Himalaya Villas is located in Bhurban, Murree Hills — 60–70 minutes from central Islamabad (F-10, Blue Area) and 45–60 minutes from Rawalpindi. We arrange private coaches for wedding guest transport from designated Islamabad and Rawalpindi pickup points, eliminating the need for individual guests to drive. The journey through the Murree Hills is part of the guest experience — many guests describe the approach to the venue as the moment the wedding weekend began."
                        },
                        {
                            q: "What is the maximum guest capacity at Himalaya Villas for a wedding?",
                            a: "Himalaya Villas accommodates 20 to 120 guests for wedding functions. The property is designed for intimate, exclusive events — not high-volume banquet functions. For families expecting 150+ guests, we recommend discussing your requirements directly with our team, as configuration options vary by function type. If your guest list exceeds our capacity, we will tell you honestly rather than over-promise."
                        },
                        {
                            q: "Can we have an outdoor nikkah ceremony at Himalaya Villas?",
                            a: "Yes. Outdoor nikkah ceremonies are one of the most requested functions at Himalaya Villas. The property's pine forest setting provides a natural outdoor ceremony space with tree canopy, mountain views, and the clean air of Bhurban at altitude. Weather considerations apply — we provide covered backup arrangements for all outdoor ceremonies and monitor conditions closely in the weeks before the function date."
                        },
                        {
                            q: "Does Himalaya Villas provide wedding catering?",
                            a: "Yes. In-villa catering is provided by Himalaya Villas' kitchen team for all wedding functions. Menus are custom-built with each family — traditional Pakistani cuisine, regional specialties, and contemporary menus are all available. Halal standards are the default. External caterers may be discussed for specific requirements on a case-by-case basis. We do not offer a standardised banquet menu — every wedding menu is built from scratch."
                        },
                        {
                            q: "Can wedding guests stay overnight at Himalaya Villas?",
                            a: "Yes, and on-site accommodation is one of the most significant advantages of Himalaya Villas as a wedding venue. The wedding couple, bridal party, and immediate family stay on-site in the property's villa accommodation. The wedding night and morning-after experience happens within the property — no city drive, no hotel check-in, no fragmented family experience. Additional guest accommodation can be arranged in nearby Bhurban properties as needed."
                        },
                        {
                            q: "What is the cost of a wedding at Himalaya Villas?",
                            a: "Wedding packages at Himalaya Villas range from PKR 150,000 for an intimate elopement ceremony to PKR 1.2M+ for a full two-day Mountain Wedding Weekend covering nikkah, walima, guest accommodation, all F&B, and event coordination. Packages are per event/function and include exclusive property use — not per-head charges. For most families, the cost compares favourably with premium Islamabad ballrooms once the per-head food, decoration, and venue hire are combined."
                        },
                        {
                            q: "Can we visit the venue before booking?",
                            a: "Yes — a site visit is strongly recommended before confirming any booking. We arrange private property viewings by appointment, typically within 3–5 days of enquiry. The visit covers the outdoor ceremony space, reception areas, villa accommodation, and a meeting with our event coordinator. Most families confirm their booking within 48 hours of the site visit. WhatsApp our team to arrange a viewing."
                        },
                        {
                            q: "Do you host multiple weddings on the same date?",
                            a: "No. Himalaya Villas hosts one wedding function at a time. When your date is confirmed, it is exclusively yours — no other family shares the property or the team on that day. This is a fundamental part of the Himalaya Villas model. We will never double-book or run concurrent events."
                        },
                        {
                            q: "Is Himalaya Villas suitable for Mehndi and Dholki functions?",
                            a: "Yes. Pre-wedding functions are among the most popular bookings at Himalaya Villas. The outdoor forest setting in the evening — with fire, ambient lighting, and the natural tree canopy — creates an atmosphere for a Mehndi or Dholki that no urban event space can replicate. The natural backdrop removes the need for extensive décor investment. Live dhol and musical arrangements are accommodated. Packages are available for single-function pre-wedding events."
                        },
                        {
                            q: "How do we book Himalaya Villas for a wedding?",
                            a: "Contact our wedding team via WhatsApp with your proposed date, approximate guest count, and the functions you are planning. We will send a tailored proposal within 24 hours and arrange a site visit at your convenience. Dates are confirmed with a deposit and held exclusively for your family from that point forward. Early enquiry is recommended — peak wedding season dates (October–December and March–May) book 3–6 months in advance."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#eadfce]">
                            <h3 className="text-xl font-bold text-neutral-900 mb-3">{faq.q}</h3>
                            <p className="text-neutral-700 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 bg-neutral-900 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image src="/assets/wedding1.jpg" alt="Wedding Venue" fill className="object-cover" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto text-white">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Reserve Your Wedding Date at Himalaya Villas</h2>
                    <p className="text-lg text-white/80 mb-10 tracking-wide font-light">Pine forest · Mountain views · Complete privacy · 60 minutes from Islamabad</p>
                    <a
                        href={buildWhatsAppBookingUrl("I would like to check date availability for a wedding at Himalaya Villas")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-5 bg-[#c9a55b] hover:bg-[#b8944f] text-white rounded-full font-bold text-lg transition shadow-2xl"
                    >
                        WhatsApp to Check Date Availability →
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}