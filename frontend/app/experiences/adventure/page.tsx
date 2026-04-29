import Link from "next/link";

const adventureServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Adventure & Outdoor Activities at Himalaya Villas",
  "description": "Thrilling mountain activities designed for safe fun. Explore the outdoors with guided adventures for all ages and skill levels in Bhurban, Murree Hills.",
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
  "serviceType": "Adventure Activities",
  "offers": {
    "@type": "Offer",
    "price": "10000",
    "priceCurrency": "PKR",
    "description": "Adventure activities starting from PKR 10,000"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function AdventureExperience() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(adventureServiceSchema) }} />
      <div className="max-w-3xl mx-auto bg-[#faf7f1] rounded-2xl shadow-lg p-10">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide">ADVENTURE</span>
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 font-display">Adventure & Outdoor Activities</h1>
        <p className="text-lg text-neutral-700 mb-6">Thrilling mountain activities designed for safe fun. Explore the outdoors with guided adventures for all ages and skill levels.</p>
        <ul className="list-disc pl-6 mb-6 text-neutral-700">
          <li>Guided hiking and trekking tours</li>
          <li>Bonfire nights and stargazing</li>
          <li>Outdoor games and team-building</li>
          <li>Nature walks and bird watching</li>
        </ul>
        <Link href="/experiences" className="inline-block mt-4 text-[#c9a55b] font-semibold hover:underline">← Back to Experiences</Link>
      </div>
    </div>
  );
}
