"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { ContactStructuredData } from "@/components/seo/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink, Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { SITE_CONTACT, mailtoHref, telHref } from "@/lib/site-contact";
import { createPageMetadata } from "@/lib/seo/build-metadata";

const heroImage = "/assets/journal-group-new.jpg";

// Note: When using "use client", metadata export won't work
// You'll need to move metadata to a separate server component or use
// a different approach for SEO

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F3EEE4]">
      <ContactStructuredData />
      
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[340px] md:h-[380px] lg:h-[460px] overflow-hidden">
        <img
          src={heroImage}
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover object-[center_26%] scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[#0b1024]/52" />
        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center">
            <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl">Contact Us</h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-white/85 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide max-w-xs sm:max-w-md mx-auto px-4">
              We&apos;re here to help make your mountain escape unforgettable
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 bg-[#f5f2ed] border border-[#eadfce] p-4 sm:p-6 md:p-8">
            
            {/* Left Column - Contact Info Cards */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              {/* Visit Us Card */}
              <div className="bg-white border border-[#efe7d9] px-5 sm:px-6 md:px-7 py-5 sm:py-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b] flex-shrink-0">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl text-neutral-900">Visit Us</p>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-[13px] leading-6 sm:leading-7 text-neutral-600">
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
                      className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8b6914] hover:text-[#6d5210]"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Call/WhatsApp Card */}
              <div className="bg-white border border-[#efe7d9] px-5 sm:px-6 md:px-7 py-5 sm:py-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b] flex-shrink-0">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl text-neutral-900">Call / WhatsApp</p>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-[13px] leading-6 sm:leading-7 text-neutral-600">
                      <a href={telHref()} className="hover:text-[#8b6914] block sm:inline">
                        {SITE_CONTACT.phoneDisplay}
                      </a>
                      <br className="hidden sm:block" />
                      <a
                        href={SITE_CONTACT.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#8b6914] block sm:inline"
                      >
                        WhatsApp: {SITE_CONTACT.phoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border border-[#efe7d9] px-5 sm:px-6 md:px-7 py-5 sm:py-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b] flex-shrink-0">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl text-neutral-900">Email Us</p>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-[13px] leading-6 sm:leading-7 text-neutral-600">
                      <a href={mailtoHref("info")} className="hover:text-[#8b6914] block sm:inline break-all">
                        {SITE_CONTACT.emails.info}
                      </a>
                      <br className="hidden sm:block" />
                      <a href={mailtoHref("bookings")} className="hover:text-[#8b6914] block sm:inline break-all">
                        {SITE_CONTACT.emails.bookings}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Map Card */}
              <div className="overflow-hidden rounded-sm border border-[#efe7d9] bg-white">
                <p className="border-b border-[#efe7d9] px-3 sm:px-4 py-2.5 sm:py-3 font-display text-base sm:text-lg text-neutral-900">
                  Location
                </p>
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
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 text-center">
                  <a
                    href={SITE_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6914] hover:underline"
                  >
                    Google Maps — directions & reviews
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-7 bg-white border border-[#efe7d9] px-5 sm:px-6 md:px-7 lg:px-9 py-6 sm:py-7 md:py-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Send Us a Message</h2>
              <p className="mt-3 sm:mt-4 text-[11px] sm:text-[12px] tracking-[0.06em] text-neutral-500">
                Fill out the form below and our team will get back to you within 24 hours
              </p>

              {isSubmitted ? (
                <div className="mt-8 p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-sm text-green-700">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 md:mt-8 space-y-5 sm:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                      Full Name <span className="text-[#c9a55b]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="mt-2 w-full h-11 sm:h-12 px-3 sm:px-4 border border-[#eadfce] bg-[#f3efe7] text-xs sm:text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] transition-colors"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                        Email Address <span className="text-[#c9a55b]">*</span>
                      </label>
                      <div className="mt-2 h-11 sm:h-12 px-3 sm:px-4 border border-[#eadfce] bg-[#f3efe7] flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c9a55b] flex-shrink-0" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={SITE_CONTACT.emails.bookings}
                          className="w-full bg-transparent text-xs sm:text-[13px] text-neutral-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                        Phone Number <span className="text-[#c9a55b]">*</span>
                      </label>
                      <div className="mt-2 h-11 sm:h-12 px-3 sm:px-4 border border-[#eadfce] bg-[#f3efe7] flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c9a55b] flex-shrink-0" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder={SITE_CONTACT.phoneDisplay}
                          className="w-full bg-transparent text-xs sm:text-[13px] text-neutral-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                      Subject <span className="text-[#c9a55b]">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="mt-2 w-full h-11 sm:h-12 px-3 sm:px-4 border border-[#eadfce] bg-[#f3efe7] text-xs sm:text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                      Message <span className="text-[#c9a55b]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="mt-2 w-full px-3 sm:px-4 py-3 sm:py-4 border border-[#eadfce] bg-[#f3efe7] text-xs sm:text-[13px] text-neutral-800 resize-none focus:outline-none focus:border-[#c9a55b] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 bg-[#1a201d] text-white text-[10px] sm:text-[11px] tracking-[0.2em] uppercase hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F3EEE4]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-800 leading-relaxed">
            &quot;The perfect escape from the city.
            <br className="hidden sm:block" />
            Private villas. Unmatched tranquility.&quot;
          </p>
          <p className="mt-4 sm:mt-5 md:mt-6 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-neutral-700">
            Sarah Jenkins
          </p>
          <p className="mt-1 sm:mt-2 text-[11px] sm:text-[12px] italic text-neutral-500">Islamabad</p>
          
          {/* Rating Dots */}
          <div className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#111]" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d7d7d7]" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d7d7d7]" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d7d7d7]" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d7d7d7]" />
          </div>
        </div>
      </section>

      {/* Booking Help Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900">
            Booking help and stay support
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-[15px] leading-7 sm:leading-8 text-neutral-700">
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
          
          <h3 className="mt-6 sm:mt-7 md:mt-8 text-lg sm:text-xl font-semibold text-neutral-900">
            Frequently asked contact topics
          </h3>
          <ul className="mt-3 sm:mt-4 list-disc space-y-1.5 sm:space-y-2 pl-5 sm:pl-6 text-sm sm:text-[15px] leading-7 sm:leading-8 text-neutral-700">
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