import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const refundSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Refund Policy | Himalaya Villas & Resorts",
  "description": "Refund Policy for Himalaya Villas & Resorts - Learn about our cancellation and refund terms.",
  "url": "https://himalayavillas.com/refund-policy",
  "provider": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort",
    "telephone": "+92 304 567 9000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhurban",
      "addressLocality": "Murree",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    }
  },
  "dateModified": "2024-01-01"
};

export const metadata: Metadata = {
  title: "Refund Policy | Himalaya Villas & Resorts",
  description: "Refund Policy for Himalaya Villas & Resorts - Learn about our cancellation and refund terms.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(refundSchema) }} />
      <Navbar />
      <main className="min-h-screen py-20 px-8 md:px-16" style={{ background: "hsl(160 15% 14%)" }}>
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-display text-4xl md:text-5xl tracking-[0.1em] uppercase mb-8"
            style={{ color: "hsl(36 45% 55%)" }}
          >
            Refund Policy
          </h1>
          
          <div className="space-y-8 font-body text-sm md:text-base" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Booking Cancellation
              </h2>
              <p>
                We understand that plans can change. Our cancellation policy is designed to be fair while ensuring we can 
                maintain our high standards of service for all guests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Cancellation Terms
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Free Cancellation:</strong> Cancel at least 7 days before check-in for a full refund</li>
                <li><strong>Partial Refund:</strong> Cancel 3-6 days before check-in for a 50% refund</li>
                <li><strong>No Refund:</strong> Cancellations made less than 3 days before check-in are non-refundable</li>
                <li><strong>No-Show:</strong> Guests who do not arrive will not receive a refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Refund Process
              </h2>
              <p>
                Approved refunds will be processed within 7-14 business days. The refund will be credited to the original 
                payment method used during booking. Please note that depending on your bank or payment provider, it may 
                take an additional 5-10 business days for the refund to appear in your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Modification of Bookings
              </h2>
              <p>
                Date modifications are subject to availability and may incur a fee of PKR 5,000 for changes made within 
                3 days of the original check-in date. Modifications requested 7 or more days in advance are free of charge 
                based on availability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Force Majeure
              </h2>
              <p>
                In case of circumstances beyond our control such as natural disasters, extreme weather conditions, or 
                government-imposed travel restrictions, we will work with you to reschedule your booking or provide a 
                full refund at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Early Departure
              </h2>
              <p>
                If you need to check out early, please note that the remaining nights will not be refunded unless there 
                is a valid emergency or medical reason. A partial refund may be considered on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                How to Request a Refund
              </h2>
              <p>
                To request a refund, please contact us at{" "}
                <a href="mailto:reservations@himalayavillas.com" className="underline" style={{ color: "hsl(36 45% 55%)" }}>
                  reservations@himalayavillas.com
                </a>{" "}
                or call our reservations team. Please include your booking confirmation number and the reason for your 
                cancellation.
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