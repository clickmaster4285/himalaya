import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type AccommodationType = {
  id: string;
  name: string;
  paragraphs: string[];
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export const accommodationTypes: AccommodationType[] = [
  {
    id: "rooms",
    name: "Rooms in Murree",
    paragraphs: [
      "Book a private room for a comfortable short stay at Himalaya Villas and Resort. Rooms are suitable for solo travellers, couples and smaller bookings that do not require the additional space of an apartment, suite or complete villa.",
      "View the available rooms to check guest capacity, bed arrangement, features, photos, rates and availability.",
    ],
    cta: "View Rooms",
    href: "/accommodations/rooms",
    image: "/images/villas/lux-single.jpg",
    alt: "Private room at Himalaya Villas and Resort, Murree",
  },
  {
    id: "apartments",
    name: "Apartments in Murree",
    paragraphs: [
      "Choose an apartment when you want additional space for a family or small group staying together.",
      "Compare the available apartment options by layout, guest capacity, features, photos, current rates and availability for your travel dates.",
    ],
    cta: "View Apartments",
    href: "/accommodations/apartments",
    image: "/images/villas/complete-apt3.jpeg",
    alt: "Apartment at Himalaya Villas and Resort, Murree",
  },
  {
    id: "suites",
    name: "Suites in Murree",
    paragraphs: [
      "Book a suite when you prefer more space than a standard room during your short stay in Murree.",
      "Depending on the suite, the accommodation may include additional sitting or living space. Review each available suite for its layout, guest capacity, features, photos, rates and availability.",
    ],
    cta: "View Suites",
    href: "/accommodations/suites",
    image: "/images/villas/lux-suite1.jpg",
    alt: "Suite with sitting area at Himalaya Villas and Resort, Murree",
  },
  {
    id: "villas",
    name: "Villas in Murree",
    paragraphs: [
      "Book a complete villa when your family or group wants more privacy and space to stay together.",
      "Complete villas provide multiple private and shared spaces under one booking, making them suitable for guests travelling together for a short stay in Murree.",
      "Check each villa for its layout, guest capacity, features, photos, current rates and availability.",
    ],
    cta: "View Villas",
    href: "/villas",
    image: "/images/villas/rak-complete-villa.jpg",
    alt: "Complete villa at Himalaya Villas and Resort, Murree",
  },
];

/** The four accommodation-type cards (Rooms, Apartments, Suites, Villas). Shared by /accommodations and the home page. */
export default function AccommodationTypeCards({ withAnchors = false }: { withAnchors?: boolean }) {
  return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accommodationTypes.map((item) => (
              <article
                key={item.id}
                id={withAnchors ? item.id : undefined}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-60 md:h-72 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="font-display text-2xl text-neutral-900 mb-4">{item.name}</h3>
                  <div className="space-y-3 mb-6">
                    {item.paragraphs.map((text) => (
                      <p key={text} className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {text}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
  );
}
