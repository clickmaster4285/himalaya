import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Himalaya Villas & Resorts",
  description: "Terms and Conditions for Himalaya Villas & Resorts - Understand our booking terms and guest policies.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 px-8 md:px-16" style={{ background: "hsl(160 15% 14%)" }}>
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-display text-4xl md:text-5xl tracking-[0.1em] uppercase mb-8"
            style={{ color: "hsl(36 45% 55%)" }}
          >
            Terms & Conditions
          </h1>
          
          <div className="space-y-8 font-body text-sm md:text-base" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Himalaya Villas & Resorts website or making a reservation, you agree to be 
                bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Booking and Reservations
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All reservations are subject to availability and confirmation</li>
                <li>A valid credit card is required to secure your booking</li>
                <li>Check-in time is 2:00 PM and check-out time is 12:00 PM</li>
                <li>Guests must present a valid ID at the time of check-in</li>
                <li>The primary guest must be at least 18 years of age</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Payment Terms
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Full payment is required at the time of booking unless otherwise specified</li>
                <li>We accept major credit cards, debit cards, and bank transfers</li>
                <li>Prices are listed in PKR (Pakistani Rupees) and are subject to change</li>
                <li>Additional charges may apply for extra guests or special requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Guest Policies
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Maximum occupancy limits must be strictly followed</li>
                <li>Pets are not allowed on the property unless specifically approved</li>
                <li>Quiet hours are observed from 10:00 PM to 7:00 AM</li>
                <li>Smoking is prohibited in all indoor areas</li>
                <li>Guests are responsible for any damage to property during their stay</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Liability
              </h2>
              <p>
                Himalaya Villas & Resorts shall not be liable for any injury, loss, or damage to guests or their property 
                during their stay. Guests are advised to secure their valuables. The resort is not responsible for any 
                items left behind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Force Majeure
              </h2>
              <p>
                We shall not be liable for any failure to perform our obligations due to circumstances beyond our reasonable 
                control, including but not limited to natural disasters, war, terrorism, or government actions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Intellectual Property
              </h2>
              <p>
                All content on this website, including images, text, logos, and designs, is the property of Himalaya Villas 
                & Resorts and is protected by copyright laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this 
                page and will take effect immediately upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Contact Information
              </h2>
              <p>
                For questions or concerns about these Terms and Conditions, please contact us at{" "}
                <a href="mailto:info@himalayavillas.com" className="underline" style={{ color: "hsl(36 45% 55%)" }}>
                  info@himalayavillas.com
                </a>
              </p>
            </section>

            <p className="pt-8 text-xs" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
              Last updated: April 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}