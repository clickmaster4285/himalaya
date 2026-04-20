import type { Metadata } from "next";
import { HomeStructuredData } from "@/components/seo/StructuredData";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import LiveWeatherMurree from "@/components/LiveWeatherMurree";
import VillasSection from "@/components/VillasSection";
import ServicesSection from "@/components/ServicesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import MomentsSection from "@/components/MomentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GlimpseSection from "@/components/GlimpseSection";
import JournalSection from "@/components/JournalSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ReserveSection from "@/components/ReserveSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { faqData } from "@/lib/faq-data";

export const metadata: Metadata = createPageMetadata({
  title: "Himalaya Premium Villas | Private Luxury Estate Bhurban",
  description:
    "Private luxury estate in Bhurban for exclusive stays, destination weddings, and curated mountain experiences.",
  path: "/",
  ogImage: "/assets/gallery-exterior.jpg",
});

const Index = () => {
  const visibleFaqs = faqData.flatMap((group) => group.questions).slice(0, 6);

  return (
    <div className="min-h-screen">
      <HomeStructuredData />
      <h1 className="sr-only">Himalaya Premium Villas in Bhurban</h1>
      <HeroSection />
      <PhilosophySection />
      <LiveWeatherMurree />
      <VillasSection />
      <ServicesSection />
      <AmenitiesSection />
      <MomentsSection />
      <GlimpseSection />
      <JournalSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <section className="mx-auto max-w-[1100px] px-6 py-16 md:px-12">
        <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
          Quick answers about luxury villas in Bhurban, bookings, and guest experience at Himalaya Premium Villas.
        </p>
        <div className="mt-8 space-y-4">
          {visibleFaqs.map((faq) => (
            <article key={faq.q} className="rounded-lg border border-[#eadfce] bg-white p-5">
              <h3 className="text-base font-semibold text-neutral-900">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
      <FAQSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default Index;
