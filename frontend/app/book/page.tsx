import Link from "next/link";
import DetailNavbar from "@/components/DetailNavbar";
import { Heart, Home, Mountain, PartyPopper, Users, Utensils } from "lucide-react";

type SearchParams = { villa?: string };

const cards = [
  { title: "Book Your Stay", subtitle: "Your home in the mountains", href: "/book/stay", Icon: Home },
  { title: "Destination Weddings", subtitle: "Where dreams come true", href: "/book/wedding", Icon: Heart },
  { title: "Dining", subtitle: "Savor the finest flavors", href: "/book/dining", Icon: Utensils },
  { title: "Events", subtitle: "Perfect venue for every occasion", href: "/book/event", Icon: PartyPopper },
  { title: "Fun Activities", subtitle: "Unforgettable experiences await", href: "/book/activities", Icon: Mountain },
  { title: "Meetings", subtitle: "Where business meets tranquility", href: "/book/meetings", Icon: Users },
];

export default async function BookPage({ searchParams }: { searchParams: Promise<SearchParams> | SearchParams }) {
  const sp = await searchParams;
  const villa = (sp?.villa ?? "").toString();

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <DetailNavbar />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-14">
        <div className="flex items-center gap-3 text-neutral-700">
          <span className="text-base">↩</span>
          <Link href={villa ? `/villas/${villa}` : "/villas"} className="text-[12px] tracking-wide hover:underline">
            Back To Home
          </Link>
        </div>

        <h1 className="mt-6 font-display text-[44px] leading-[1.05] md:text-[56px] text-neutral-900">
          Book Your Experience
        </h1>
        <p className="mt-3 text-[12px] md:text-[13px] text-neutral-500/90 max-w-2xl">
          Choose the perfect experience and let us create unforgettable memories for you
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={villa ? `${c.href}?villa=${encodeURIComponent(villa)}` : c.href}
              className="group bg-[#fbf8f2] border border-[#eadfce] p-6 hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full border border-[#eadfce] bg-white flex items-center justify-center transition-colors">
                  <c.Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                    style={{ color: "#c9a55b" }}
                  />
                </div>
                <div>
                  <p className="text-[13px] md:text-[14px] text-neutral-900">{c.title}</p>
                  <p className="text-[11px] md:text-[12px] text-neutral-500/90 mt-1">{c.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

