import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

export default function VillaConfigurations() {
  const plans = [
    {
      title: "SUITE - 1",
      bookingName: "Suite 1",
      price: "50,000/- Rs",
      features: [
        "2 LUXURY BEDROOMS (ATTACHED BATHROOMS)",
        "LARGE SHARED LIVING ROOM",
        "PRIVATE LOUNGE",
        "KITCHEN WITH ASSISTANT",
      ],
    },
    {
      title: "SUITE - 2",
      bookingName: "Suite 2",
      price: "50,000/- Rs",
      features: [
        "1 EXECUTIVE BEDROOM",
        "1 LUXURY BEDROOM (ATTACHED BATHROOMS)",
        "LARGE SHARED LIVING ROOM",
        "TERRACE AREA",
        "KITCHEN WITH ASSISTANT",
      ],
    },
    {
      title: "COMPLETE VILLA",
      bookingName: "Complete Villa",
      price: "100,000/- Rs",
      features: [
        "1 EXECUTIVE BEDROOM",
        "3 LUXURY BEDROOMS (ATTACHED BATHROOMS)",
        "LARGE LIVING ROOM",
        "PRIVATE LOUNGE",
        "TERRACE AREA",
        "KITCHEN WITH ASSISTANT",
      ],
    },
  ];

  return (
    <section className="bg-[#fdfaf6] py-24 px-6 relative border-b border-[#e8dfd2]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a55b]/20 to-transparent" />
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-normal italic text-[#1a1816] md:text-5xl lg:text-6xl">
            Accommodation Options
          </h2>
          <p className="mt-6 text-muted-foreground font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Choose between individual luxury suites or reserve the entire complete villa experience, 
            each thoughtfully designed for maximum comfort and privacy on your getaway.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className="bg-white rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-8 border border-[#e8dfd2] relative overflow-hidden group hover:border-[#c9a55b]/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(201,165,91,0.08)]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 scale-150 transform translate-x-4 -translate-y-4">
                <svg className="w-32 h-32 text-[#5c4a24]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-sans text-sm font-black tracking-widest text-[#9a7b3a] mb-3 uppercase">{plan.title}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="font-display text-4xl text-[#1a1816]">{plan.price}</span>
                  <span className="text-sm font-medium text-[#8a8278] ml-2">/ night</span>
                </div>
                
                <ul className="space-y-4 min-h-[220px]">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start group/item">
                      <div className="mt-0.5 relative flex-shrink-0 flex items-center justify-center w-5 h-5 mr-3">
                        <CheckCircle2 className="w-5 h-5 text-[#c9a55b] absolute inset-0 z-10 group-hover/item:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-[#c9a55b]/20 blur rounded-full scale-110 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                      </div>
                      <span className="font-sans text-[13px] text-[#4a4238] uppercase tracking-wide leading-relaxed font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-8 border-t border-[#f0eadf]/60">
                   <a
                     href={buildWhatsAppBookingUrl(plan.bookingName)}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block text-center w-full bg-[#fdfaf6] text-[#3d362e] border border-[#d4c9b8] py-3.5 rounded-xl font-sans text-sm font-bold tracking-widest uppercase hover:bg-[#1c1916] hover:text-white hover:border-[#1c1916] transition-all duration-300 shadow-sm hover:shadow-md"
                   >
                      Book Now
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
