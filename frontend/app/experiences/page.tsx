import Link from "next/link";

const experiencesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Experiences at Himalaya Villas",
  "description": "Discover curated experiences at Himalaya Villas including private dining, adventure activities, creative workshops, and professional media services.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Private Chef & Dining Experiences",
        "description": "Personalized dining themes and curated food journeys",
        "url": "https://himalayavillas.com/experiences/dining"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Adventure & Outdoor Activities",
        "description": "Thrilling mountain activities designed for safe fun",
        "url": "https://himalayavillas.com/experiences/adventure"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Workshops & Creative Sessions",
        "description": "Hands-on workshops for teams, families, and creators",
        "url": "https://himalayavillas.com/experiences/creative"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Photography & Content Packages",
        "description": "Professional coverage for weddings and brand campaigns",
        "url": "https://himalayavillas.com/experiences/media"
      }
    }
  ]
};

const experiences = [
  {
    slug: "dining",
    label: "DINING",
    title: "Private Chef & Dining Experiences",
    description: "Personalized dining themes and curated food journeys.",
  },
  {
    slug: "adventure",
    label: "ADVENTURE",
    title: "Adventure & Outdoor Activities",
    description: "Thrilling mountain activities designed for safe fun.",
  },
  {
    slug: "creative",
    label: "CREATIVE",
    title: "Workshops & Creative Sessions",
    description: "Hands-on workshops for teams, families, and creators.",
  },
  {
    slug: "media",
    label: "MEDIA",
    title: "Photography & Content Packages",
    description: "Professional coverage for weddings and brand campaigns.",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#faf7f1] py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(experiencesSchema) }} />
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-neutral-900 font-display">Experiences & Activities</h1>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {experiences.map((exp) => (
          <Link key={exp.slug} href={`/experiences/${exp.slug}`}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-md hover:shadow-xl transition group flex flex-col justify-between min-h-[260px]">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide group-hover:bg-green-200 transition">{exp.label}</span>
            <h2 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-[#c9a55b] transition">{exp.title}</h2>
            <p className="text-sm text-neutral-600 mb-4 flex-1">{exp.description}</p>
            <span className="text-[#c9a55b] text-xs font-semibold mt-auto group-hover:underline">LEARN MORE →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
