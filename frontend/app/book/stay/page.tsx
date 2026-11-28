import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StayBookingPreview from "@/components/book-page/StayBookingPreview";
import { roomsBySlug } from "@/content/villas/villa-content";
import { ArrowRight } from "lucide-react";

type SearchValue = string | string[] | undefined;

interface BookStayPageProps {
  searchParams: Promise<{
    villa?: SearchValue;
    checkin_date?: SearchValue;
    checkout_date?: SearchValue;
    adults?: SearchValue;
    children?: SearchValue;
    rooms?: SearchValue;
  }>;
}

function firstValue(value: SearchValue): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function validDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year!, month! - 1, day!);
  return date.getFullYear() === year && date.getMonth() === month! - 1 && date.getDate() === day
    ? value
    : "";
}

function validCount(value: string, fallback: number, min: number, max: number): string {
  const parsed = Number(value);
  if (!value || !Number.isInteger(parsed)) return String(fallback);
  return String(Math.min(max, Math.max(min, parsed)));
}

export default async function BookStayPage({ searchParams }: BookStayPageProps) {
  const params = await searchParams;
  const villaSlug = firstValue(params.villa).trim().toLowerCase();
  const selectedVilla = roomsBySlug[villaSlug];

  return (
    <div className="min-h-screen bg-white">
      <Navbar solid />
      {selectedVilla ? (
        <StayBookingPreview
          key={selectedVilla.slug}
          room={selectedVilla}
          initialCheckIn={validDate(firstValue(params.checkin_date))}
          initialCheckOut={validDate(firstValue(params.checkout_date))}
          initialAdults={validCount(firstValue(params.adults), 1, 1, 10)}
          initialChildren={validCount(firstValue(params.children), 0, 0, 9)}
          initialRooms={validCount(firstValue(params.rooms), 1, 1, 10)}
        />
      ) : (
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 border-b border-[#e9e1d4] pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9b722d]">
                Himalaya Villas <span className="mx-1 text-[#c9a55b]">/</span> Bhurban
              </p>
              <h1 className="mt-2 font-display text-4xl font-medium leading-tight text-[#211f1a] sm:text-5xl">
                Choose your stay
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-neutral-600">
                Explore our rooms, apartments, suites, and villas. Select a stay to view its photos and details, then choose your dates and guests.
              </p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-[#e9e1d4] bg-white px-4 py-2 text-xs font-semibold text-neutral-600 shadow-sm">
              {Object.values(roomsBySlug).length} stays to explore
            </span>
          </div>
          {villaSlug && (
            <p role="status" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              That villa could not be found. Choose one of the available stays below.
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(roomsBySlug).map((villa) => (
              <Link
                key={villa.slug}
                href={`/book/stay?villa=${encodeURIComponent(villa.slug)}&adults=1&children=0&rooms=1`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e9e1d4] bg-white shadow-[0_8px_24px_rgba(37,31,20,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c9a55b]/70 hover:shadow-[0_18px_38px_rgba(37,31,20,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b6914]"
              >
                <div className="relative aspect-[1.55] overflow-hidden bg-neutral-100">
                  <Image
                    src={villa.images[0] ?? "/assets/villas/placeholder.jpg"}
                    alt={villa.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-80" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-800 shadow-sm backdrop-blur">
                    {villa.collection}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="font-display text-2xl leading-tight text-neutral-900 transition-colors group-hover:text-[#8b6914]">
                    {villa.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{villa.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#eee8de] pt-4">
                    <p className="text-sm">
                      <span className="text-xs text-neutral-500">From </span>
                      <span className="font-semibold text-neutral-900">PKR {villa.price}</span>
                      <span className="text-neutral-500"> / night</span>
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#8b6914]">
                      View details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
