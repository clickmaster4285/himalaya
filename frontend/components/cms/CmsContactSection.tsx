// components/cms/CmsContactSection.tsx
// ERP "contact": contact details from the ERP plus the estate's own WhatsApp
// booking link (lib/whatsapp). ERP form actions are not rendered: the site
// takes enquiries through its own booking flows.
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { CmsButton } from "./CmsButton";
import { isExternal, type SectionLayout } from "./cmsContent";

type Data = {
  heading?: string;
  description?: string;
  image?: string;
  email?: string;
  phone?: string;
  address?: string;
  buttonLabel?: string;
};

const EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i;

export default function CmsContactSection({ data, layout }: { data: Data; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  const email = data.email && EMAIL.test(data.email) ? data.email : "";
  const phoneDigits = (data.phone ?? "").replace(/[^\d+]/g, "");
  const rows = [
    email && { icon: Mail, label: email, href: `mailto:${email}` },
    data.phone && { icon: Phone, label: data.phone, href: phoneDigits.length >= 7 ? `tel:${phoneDigits}` : "" },
    data.address && { icon: MapPin, label: data.address, href: "" },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href: string }[];

  return (
    <CmsSection layout={layout}>
      <div className={cn("grid gap-10 md:gap-16 items-center", data.image && "md:grid-cols-2")}>
        <div className={cn(!data.image && "mx-auto max-w-2xl text-center")}>
          <CmsSectionHeading heading={data.heading} description={data.description} tone={layout.tone} align={data.image ? "left" : "center"} />
          {rows.length > 0 && (
            <ul className={cn("space-y-4", !data.image && "inline-block text-left")}>
              {rows.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#c9a55b] text-white">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {href ? (
                    <a href={href} className={cn("pt-1.5 text-sm md:text-base hover:text-[#c9a55b] transition-colors", t.heading)}>
                      {label}
                    </a>
                  ) : (
                    <span className={cn("pt-1.5 text-sm md:text-base whitespace-pre-line", t.heading)}>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {data.buttonLabel && (
            <div className={cn("mt-10", !data.image && "flex justify-center")}>
              <CmsButton cta={{ text: data.buttonLabel, link: buildWhatsAppBookingUrl() }} tone={layout.tone} />
            </div>
          )}
        </div>
        {data.image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image src={data.image} alt={data.heading || "Himalaya Villas & Resorts"} fill unoptimized={isExternal(data.image)} sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
          </div>
        )}
      </div>
    </CmsSection>
  );
}
