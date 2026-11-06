import Link from "next/link";

const diningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Private Chef & Dining Experiences at Himalaya Villas",
  "description": "Personalized dining themes and curated food journeys with gourmet meals prepared by top chefs in a stunning mountain setting.",
  "provider": { "@id": "https://himalayavillas.com/#organization" },
  "serviceType": "Private Dining Services",
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

export default function DiningExperience() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(diningServiceSchema) }} />
      <div className="max-w-3xl mx-auto bg-[#faf7f1] rounded-2xl shadow-lg p-10">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide">DINING</span>
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 font-display">Private Chef & Dining Experiences</h1>
        <p className="text-lg text-neutral-700 mb-6">Personalized dining themes and curated food journeys. Enjoy gourmet meals prepared by top chefs in a stunning mountain setting.</p>
        <ul className="list-disc pl-6 mb-6 text-neutral-700">
          <li>Customizable menus for every occasion</li>
          <li>Private dining setups (indoor & outdoor)</li>
          <li>Live cooking stations and chef’s table</li>
          <li>Locally sourced, fresh ingredients</li>
        </ul>
        <Link href="/experience" className="inline-block mt-4 text-[#c9a55b] font-semibold hover:underline">← Back to Experiences</Link>
      </div>
    </div>
  );
}
