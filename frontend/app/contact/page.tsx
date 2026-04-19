import { ContactStructuredData } from "@/components/seo/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const heroImage = "/assets/journal-group-new.jpg";

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
                      Himalaya Villas Resort
                      <br />
                      Mountain View Road, Nathia gali
                      <br />
                      Abbottabad, KPK 22200
                      <br />
                      Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#efe7d9] px-7 py-6">
                <div className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#f1ece2] flex items-center justify-center text-[#c9a55b]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-3xl text-neutral-900">Call Us</p>
                    <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                      +92 300 123 4567
                      <br />
                      +92 992 123 456
                      <br />
                      WhatsApp: +92 300 123 4567
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
                      info@himalayavillas.com
                      <br />
                      bookings@himalayavillas.com
                      <br />
                      support@himalayavillas.com
                    </p>
                  </div>
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
                    defaultValue="John"
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
                        defaultValue="john.doe@example.com"
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
                        defaultValue="+92 300 1234567"
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
                    defaultValue="How can we help you?"
                    className="mt-2 w-full h-12 px-4 border border-[#eadfce] bg-[#f3efe7] text-[13px] text-neutral-800 focus:outline-none"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                    Message <span className="text-[#c9a55b]">*</span>
                  </p>
                  <textarea
                    defaultValue="Tell us more about your inquiry..."
                    className="mt-2 w-full h-[180px] px-4 py-4 border border-[#eadfce] bg-[#f3efe7] text-[13px] text-neutral-800 resize-none focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="px-10 py-3 bg-[#1a201d] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-black transition-colors">
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

      <Footer />
    </div>
  );
}

