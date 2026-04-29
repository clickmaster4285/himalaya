import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy | Himalaya Villas & Resorts",
  "description": "Privacy Policy for Himalaya Villas & Resorts - Learn how we protect your personal information.",
  "url": "https://himalayavillas.com/privacy-policy",
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
  title: "Privacy Policy | Himalaya Villas & Resorts",
  description: "Privacy Policy for Himalaya Villas & Resorts - Learn how we protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }} />
      <Navbar />
      <main className="min-h-screen py-20 px-8 md:px-16" style={{ background: "hsl(160 15% 14%)" }}>
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-display text-4xl md:text-5xl tracking-[0.1em] uppercase mb-8"
            style={{ color: "hsl(36 45% 55%)" }}
          >
            Privacy Policy
          </h1>
          
          <div className="space-y-8 font-body text-sm md:text-base" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Introduction
              </h2>
              <p>
                At Himalaya Villas & Resorts, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website 
                or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Personal information such as name, email address, and phone number</li>
                <li>Booking information including check-in dates and villa preferences</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Communication preferences and marketing opt-ins</li>
                <li>Device and usage information through cookies and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To process and manage your bookings</li>
                <li>To communicate with you about your reservations</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To send promotional offers and updates (with your consent)</li>
                <li>To improve our services and website experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Data Protection
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted during transmission 
                and storage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Third-Party Disclosure
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide 
                you with advance notice. This does not include website hosting partners and other parties who assist us in 
                operating our website, conducting our business, or serving you, so long as those parties agree to keep this 
                information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal information. You may also opt-out of receiving 
                marketing communications at any time by contacting us or using the unsubscribe link in our emails.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4" style={{ color: "hsl(36 45% 55%)" }}>
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
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