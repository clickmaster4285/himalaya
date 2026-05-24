import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  murreeHotelClusterRelatedLinks,
  type MurreeHotelClusterPage,
} from "@/lib/seo/murree-hotel-cluster-links";

type Props = {
  page: MurreeHotelClusterPage;
};

export default function MurreeHotelRelatedLinks({ page }: Props) {
  const links = murreeHotelClusterRelatedLinks[page];

  return (
    <section className="py-14 px-6 border-t border-neutral-200 bg-[#faf7f1]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          Explore more at Himalaya Villas
        </h2>
        <p className="text-neutral-600 mb-8">
          Related guides, packages, and booking pages across our Murree & Bhurban estate.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center justify-between p-4 border border-neutral-200 bg-white rounded-lg hover:border-[#c9a55b] group transition-colors"
              >
                <span className="text-sm font-medium text-neutral-800 group-hover:text-[#c9a55b]">
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
