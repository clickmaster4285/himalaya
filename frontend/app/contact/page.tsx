import type { Metadata } from "next";
import Link from "next/link";
import { ContactStructuredData } from "@/components/seo/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONTACT, mailtoHref, telHref } from "@/lib/site-contact";
import { createPageMetadata } from "@/lib/seo/build-metadata";

const heroImage = "/assets/journal-group-new.jpg";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Himalaya Villas Bhurban | Booking & Support",
  description:
    "Contact Himalaya Premium Villas for bookings, WhatsApp support, directions, and stay inquiries in Bhurban Murree. Fast response from our team.",
  path: "/contact",
  keywords: ["contact Himalaya Villas", "Bhurban villa booking", "Murree stay support"],
  ogImage: "/assets/journal-group-new.jpg",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F3EEE4]">
      <ContactStructuredData />
      <section className="relative h-[380px] md:h-[460px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover object-[center_26%] scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[#0b1024]/52" />
        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display text-white text-5xl md:text-6xl">Contact Us</h1>
            <p className="mt-5 text-white/85 text-[13px] md:text-[33px] tracking-wide">
              We&apos;re here to help make your mountain escape unforgettable
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#f5f2ed] border border-[#eadfce] p-6 md:p-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-[#efe7d9] px-7 py-6">
                <div className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-3xl text-neutral-900">Visit Us</p>
                    <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                      {SITE_CONTACT.businessName}
                      <br />
                      {SITE_CONTACT.addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    <a
                      href={SITE_CONTACT.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8b6914] hover:text-[#6d5210]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#efe7d9] px-7 py-6">
                <div className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-3xl text-neutral-900">Call / WhatsApp</p>
                    <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                      <a href={telHref()} className="hover:text-[#8b6914]">
                        {SITE_CONTACT.phoneDisplay}
                      </a>
                      <br />
                      <a
                        href={SITE_CONTACT.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#8b6914]"
                      >
                        WhatsApp: {SITE_CONTACT.phoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#efe7d9] px-7 py-6">
                <div className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-3xl text-neutral-900">Email Us</p>
                    <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                      <a href={mailtoHref("info")} className="hover:text-[#8b6914]">
                        {SITE_CONTACT.emails.info}
                      </a>
                      <br />
                      <a href={mailtoHref("bookings")} className="hover:text-[#8b6914]">
                        {SITE_CONTACT.emails.bookings}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-sm border border-[#efe7d9] bg-white">
                <p className="border-b border-[#efe7d9] px-4 py-3 font-display text-lg text-neutral-900">Location</p>
                <div className="aspect-video w-full bg-[#e8e4dc]">
                  <iframe
                    title="Himalaya Premium Villas on Google Maps"
                    src="https://www.google.com/maps?q=33.9562%2C73.3850&z=15&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="px-4 py-3 text-center">
                  <a
                    href={SITE_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6914] hover:underline"
                  >
                    Google Maps — directions & reviews
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#efe7d9] px-7 md:px-9 py-7 md:py-8">
              <h2 className="font-display text-5xl text-neutral-900">Send Us a Message</h2>
              <p className="mt-4 text-[12px] tracking-[0.06em] text-neutral-500">
                Fill out the form below and our team will get back to you within 24 hours
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                    Full Name <span className="text-[#c9a55b]">*</span>
                  </p>
                  <input
                    placeholder="Your name"
                    className="mt-2 w-full h-12 px-4 border border-[#eadfce] bg-[#f3efe7] text-[13px] text-neutral-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                      Email Address <span className="text-[#c9a55b]">*</span>
                    </p>
                    <div className="mt-2 h-12 px-4 border border-[#eadfce] bg-[#f3efe7] flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#c9a55b]" />
                      <input
                        type="email"
                        placeholder={SITE_CONTACT.emails.bookings}
                        className="w-full bg-transparent text-[13px] text-neutral-700 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                      Phone Number <span className="text-[#c9a55b]">*</span>
                    </p>
                    <div className="mt-2 h-12 px-4 border border-[#eadfce] bg-[#f3efe7] flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#c9a55b]" />
                      <input
                        type="tel"
                        placeholder={SITE_CONTACT.phoneDisplay}
                        className="w-full bg-transparent text-[13px] text-neutral-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                    Subject <span className="text-[#c9a55b]">*</span>
                  </p>
                  <input
                    placeholder="How can we help?"
                    className="mt-2 w-full h-12 px-4 border border-[#eadfce] bg-[#f3efe7] text-[13px] text-neutral-800 focus:outline-none"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                    Message <span className="text-[#c9a55b]">*</span>
                  </p>
                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    className="mt-2 w-full h-[180px] px-4 py-4 border border-[#eadfce] bg-[#f3efe7] text-[13px] text-neutral-800 resize-none focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-10 py-3 bg-[#1a201d] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-black transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F3EEE4]">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="font-display text-4xl md:text-5xl text-neutral-800 leading-relaxed">
            &quot;The perfect escape from the city. The private villas offer
            <br className="hidden md:block" />
            unmatched tranquility.&quot;
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-neutral-700">Sarah Jenkins</p>
          <p className="mt-2 text-[12px] italic text-neutral-500">Islamabad</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#111]" />
            <span className="h-2 w-2 rounded-full bg-[#d7d7d7]" />
            <span className="h-2 w-2 rounded-full bg-[#d7d7d7]" />
            <span className="h-2 w-2 rounded-full bg-[#d7d7d7]" />
            <span className="h-2 w-2 rounded-full bg-[#d7d7d7]" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">Booking help and stay support</h2>
          <p className="mt-6 max-w-4xl text-[15px] leading-8 text-neutral-700">
            Our team supports direct villa bookings, availability checks, guest preference requests, and pre-arrival
            planning for Bhurban stays. If you are comparing villa options, share your group size, travel dates, and
            trip purpose, and we will guide you to the most suitable residence. For faster response, WhatsApp is ideal
            for quick booking questions, while email is best for itinerary details, corporate requirements, and event
            coordination. You can also browse{" "}
            <Link href="/villas" className="font-medium text-[#8b6914] underline underline-offset-4">
              available villas
            </Link>{" "}
            and proceed to{" "}
            <Link href="/book/stay" className="font-medium text-[#8b6914] underline underline-offset-4">
              secure stay booking
            </Link>{" "}
            once dates are finalized.
          </p>
          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Frequently asked contact topics</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700">
            <li>Villa availability and pricing for weekdays, weekends, and seasonal travel dates.</li>
            <li>Check-in and check-out details, guest policies, and private request handling.</li>
            <li>Family stays, special occasions, and group booking assistance.</li>
            <li>Location support, directions, and arrival coordination for Bhurban Murree.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
