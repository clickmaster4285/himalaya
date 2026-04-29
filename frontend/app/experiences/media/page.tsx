import Link from "next/link";

const mediaServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Photography & Content Packages at Himalaya Villas",
  "description": "Professional photography and media services for weddings and brand campaigns. Expert coverage with drone aerial shots and video production.",
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
  "serviceType": "Photography and Media Services",
  "offers": {
    "@type": "Offer",
    "price": "75000",
    "priceCurrency": "PKR",
    "description": "Professional photography and media packages starting from PKR 75,000"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function MediaExperience() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaServiceSchema) }} />
      <div className="max-w-3xl mx-auto bg-[#faf7f1] rounded-2xl shadow-lg p-10">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide">MEDIA</span>
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 font-display">Photography & Content Packages</h1>
        <p className="text-lg text-neutral-700 mb-6">Professional coverage for weddings and brand campaigns. Capture your best moments with our expert media team.</p>
        <ul className="list-disc pl-6 mb-6 text-neutral-700">
          <li>Wedding and event photography</li>
          <li>Brand and lifestyle shoots</li>
          <li>Video production and editing</li>
          <li>Drone and aerial coverage</li>
        </ul>
        <Link href="/experiences" className="inline-block mt-4 text-[#c9a55b] font-semibold hover:underline">← Back to Experiences</Link>
      </div>
    </div>
  );
}
