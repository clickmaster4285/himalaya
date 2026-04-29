import Link from "next/link";

const creativeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Workshops & Creative Sessions at Himalaya Villas",
  "description": "Hands-on workshops for teams, families, and creators. Unleash your creativity in a beautiful, inspiring environment with guest instructors and artists.",
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
  "serviceType": "Creative Workshops",
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "PKR",
    "description": "Creative workshop sessions starting from PKR 15,000"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function CreativeExperience() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeServiceSchema) }} />
      <div className="max-w-3xl mx-auto bg-[#faf7f1] rounded-2xl shadow-lg p-10">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide">CREATIVE</span>
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 font-display">Workshops & Creative Sessions</h1>
        <p className="text-lg text-neutral-700 mb-6">Hands-on workshops for teams, families, and creators. Unleash your creativity in a beautiful, inspiring environment.</p>
        <ul className="list-disc pl-6 mb-6 text-neutral-700">
          <li>Art, music, and photography workshops</li>
          <li>Team-building creative sessions</li>
          <li>Family and kids’ activities</li>
          <li>Guest instructors and artists</li>
        </ul>
        <Link href="/experiences" className="inline-block mt-4 text-[#c9a55b] font-semibold hover:underline">← Back to Experiences</Link>
      </div>
    </div>
  );
}
