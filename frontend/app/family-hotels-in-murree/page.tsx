import type { Metadata } from "next";
import type { ReactNode } from "react";
import { absoluteSeoTitle } from "@/lib/seo/build-metadata";
import {
  Mountain, Home, Utensils, Clock,
  Phone, Mail, MapPin, Check, X,
  Sun, Snowflake, Flower2, Baby, MessageCircle, Star, Shield, Gamepad2
} from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { HeroSlider, Reveal, ParallaxBg } from "./FamilyHotelsInMurreeClient";

const MURREE_FAMILY_WHATSAPP_URL = buildWhatsAppBookingUrl(
  "a private family stay at Himalaya Premium Villas in Murree"
);

export const metadata: Metadata = {
  title: absoluteSeoTitle("Family Hotel in Murree"),
  description: "Tired of crowded hotels in Murree? Book Himalaya Villas — a private luxury estate in Bhurban for your whole family. Exclusive, safe & scenic. WhatsApp to reserve.",
  alternates: {
    canonical: "https://himalayavillas.com/family-hotels-in-murree"
  },
  openGraph: {
    title: "Family Hotel in Murree",
    description: "Tired of crowded hotels in Murree? Book Himalaya Villas — a private luxury estate in Bhurban for your whole family. Exclusive, safe & scenic. WhatsApp to reserve.",
    url: "https://himalayavillas.com/family-hotels-in-murree",
    type: "website"
  }
};

/* ============================================================
   FAMILY HOTELS IN MURREE - Himalaya Premium Villas
   ============================================================ */
const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.family-murree-page{
  --bg:40 38% 97%; --fg:165 35% 12%;
  --card:0 0% 100%; --muted:165 12% 38%;
  --primary:165 60% 18%; --primary-fg:40 38% 97%; --primary-glow:165 55% 32%;
  --accent:162 34% 37%; --accent-glow:162 38% 48%;
  --border:165 15% 86%;
  font-family:'Inter',system-ui,sans-serif;
  color:hsl(var(--fg));
  background:hsl(var(--bg));
  min-height:100vh;
}
.family-murree-page h1,.family-murree-page h2,.family-murree-page h3,.family-murree-page h4{font-family:'Playfair Display',Georgia,serif;}
.family-murree-grad-gold{background:linear-gradient(135deg,hsl(var(--accent)),hsl(var(--accent-glow)));}
.family-murree-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.family-murree-text-gold{color:#3E7E69;}
.family-murree-text-accent{color:#3E7E69;}
.family-murree-text-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.family-murree-check{color:hsl(165 60% 18%);}
.family-murree-hero,.family-murree-hero h1,.family-murree-hero h2{font-family:'Playfair Display',Georgia,serif;}
.family-murree-hero{font-family:'Inter',system-ui,sans-serif;min-height:100dvh;display:flex;flex-direction:column;background:hsl(var(--bg));overflow-x:clip;max-width:100vw;}
.family-murree-hero__body{position:relative;flex:1;min-width:0;}
.family-murree-hero__grid{display:grid;min-height:calc(100dvh - 4.5rem);}
@media(min-width:1024px){.family-murree-hero__grid{grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);min-height:calc(100vh - 4.75rem);}}
.family-murree-hero__left{background:hsl(var(--bg));display:flex;flex-direction:column;justify-content:center;padding:1.5rem 1.5rem 2rem;min-width:0;}
@media(min-width:768px){.family-murree-hero__left{padding:2rem 2.5rem 2.5rem;}}
@media(min-width:1024px){.family-murree-hero__left{padding:3rem 3rem 3.5rem 3.5rem;padding-right:min(12rem,28vw);}}
.family-murree-hero__right{position:relative;display:none;}
@media(min-width:1024px){.family-murree-hero__right{display:block;min-height:100%;}}
.family-murree-hero__right img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;}
.family-murree-hero__right::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,hsl(var(--bg)) 0%,transparent 28%);}
.family-murree-hero__form-wrap{position:relative;z-index:35;width:100%;max-width:100%;box-sizing:border-box;padding:0 1rem 2.5rem;margin-top:-3.5rem;}
@media(min-width:1024px){.family-murree-hero__form-wrap{position:absolute;left:50%;top:50%;transform:translate(-32%,-46%);width:400px;max-width:calc(100vw - 2rem);padding:0;margin:0;}}
.family-murree-hero__card{width:100%;max-width:100%;box-sizing:border-box;background:hsl(var(--card));border-radius:24px;padding:1.25rem 1rem 1.5rem;border:1px solid hsl(var(--border));box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);overflow:hidden;}
@media(min-width:640px){.family-murree-hero__card{padding:1.85rem 1.85rem 1.65rem;}}
.family-murree-hero__card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;margin-bottom:1.35rem;}
.family-murree-hero__card-title{font-family:'Playfair Display',Georgia,serif;font-size:1.55rem;font-weight:600;line-height:1.2;color:hsl(165 60% 18%);margin:0;}
.family-murree-hero__badge{font-size:.625rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#3E7E69;padding-top:.35rem;white-space:nowrap;}
.family-murree-hero__label{display:block;font-size:.625rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:hsl(var(--muted));margin-bottom:.4rem;}
.family-murree-hero__input,.family-murree-hero__select,.family-murree-hero__textarea{width:100%;max-width:100%;min-width:0;box-sizing:border-box;border:1px solid hsl(var(--border));background:#fff;border-radius:8px;padding:.7rem .85rem;font-size:.875rem;color:hsl(var(--fg));outline:none;font-family:inherit;transition:border-color .2s,box-shadow .2s;}
.family-murree-hero__input[type="date"]{display:block;-webkit-appearance:none;appearance:none;min-height:2.75rem;font-size:.8125rem;}
.family-murree-hero__input[type="date"]::-webkit-date-and-time-value{text-align:left;}
.family-murree-hero__input[type="date"]::-webkit-calendar-picker-indicator{cursor:pointer;opacity:.65;margin-left:0;}
.family-murree-hero__input:focus,.family-murree-hero__select:focus,.family-murree-hero__textarea:focus{border-color:hsl(165 55% 32%);box-shadow:0 0 0 3px hsl(165 60% 18% / .12);}
.family-murree-hero__textarea{resize:none;min-height:4.5rem;}
.family-murree-hero__select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .85rem center;padding-right:2rem;}
.family-murree-hero__submit{width:100%;display:flex;align-items:center;justify-content:center;gap:.5rem;background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));color:hsl(40 38% 97%);border-radius:8px;padding:.9rem 1rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-top:.25rem;transition:opacity .2s,transform .2s;}
.family-murree-hero__submit:hover:not(:disabled){opacity:.92;transform:scale(1.01);}
.family-murree-hero__submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
.family-murree-hero__form-success{border-radius:12px;border:1px solid hsl(165 40% 75%);background:hsl(165 40% 96%);padding:1.25rem;text-align:center;font-size:.875rem;color:hsl(165 50% 22%);}
.family-murree-hero__form-error{border-radius:8px;border:1px solid hsl(0 70% 88%);background:hsl(0 70% 97%);padding:.65rem .85rem;font-size:.8125rem;color:hsl(0 55% 35%);}
.family-murree-hero__form-wa{display:flex;width:100%;align-items:center;justify-content:center;gap:.5rem;border-radius:8px;border:1px solid hsl(165 60% 18%);background:#fff;padding:.7rem 1rem;font-size:.8125rem;font-weight:600;color:hsl(165 60% 18%);transition:background .2s;}
.family-murree-hero__form-wa:hover{background:hsl(165 60% 18% / .06);}
.family-murree-hero__form-note{margin-top:1rem;text-align:center;font-size:.6875rem;line-height:1.5;color:hsl(var(--muted));}
.family-murree-hero__field{margin-bottom:.85rem;min-width:0;}
.family-murree-hero__row{display:grid;grid-template-columns:1fr;gap:.65rem;min-width:0;}
@media(min-width:480px){.family-murree-hero__row{grid-template-columns:1fr 1fr;}}
.family-murree-hero__date-wrap{position:relative;min-width:0;width:100%;}
.family-murree-hero__date-icon{display:none;}
@media(min-width:1024px){
  .family-murree-hero__cta-primary,.family-murree-hero__cta-secondary{width:auto;}
}
@media(max-width:639px){
  .family-murree-hero__cta-primary,.family-murree-hero__cta-secondary{width:100%;max-width:100%;box-sizing:border-box;text-align:center;}
  .family-murree-hero__card-head{flex-wrap:wrap;}
  .family-murree-hero__badge{padding-top:0;}
}
.family-murree-hero__cta-primary{display:inline-flex;align-items:center;justify-content:center;gap:.35rem;border-radius:9999px;background:linear-gradient(135deg,hsl(var(--accent)),hsl(var(--accent-glow)));color:#fff;padding:.85rem 1.35rem;font-size:.8125rem;font-weight:600;box-shadow:0 15px 40px -10px hsl(162 34% 37% / .45);transition:transform .2s;}
.family-murree-hero__cta-primary:hover{transform:scale(1.03);}
.family-murree-hero__cta-secondary{display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;border:2px solid hsl(165 60% 18%);background:#fff;color:hsl(165 60% 18%);padding:.85rem 1.35rem;font-size:.8125rem;font-weight:600;transition:background .2s,border-color .2s;}
.family-murree-hero__cta-secondary:hover{background:hsl(165 60% 18% / .06);}
.family-murree-hero__kicker{color:#3E7E69;}
.family-murree-hero__headline{color:hsl(165 60% 18%);}
.family-murree-hero__sub{color:hsl(var(--muted));}
.family-murree-hero__logo{color:hsl(165 60% 18%);}
.family-murree-hero__logo-accent{font-style:italic;color:#3E7E69;}
.family-murree-hero__phone{color:hsl(var(--muted));transition:color .2s;}
.family-murree-hero__phone:hover{color:#3E7E69;}
.family-murree-hero__mobile-img{position:relative;height:14rem;width:100%;}
@media(min-width:1024px){.family-murree-hero__mobile-img{display:none;}}
.family-murree-page a{color:inherit;text-decoration:none;}
.family-murree-page button{font-family:inherit;cursor:pointer;border:0;}

.family-murree-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.family-murree-shadow-gold{box-shadow:0 15px 40px -10px hsl(162 34% 37% / .45);}

.family-murree-card{background:hsl(var(--card));border-radius:24px;}
.family-murree-border{border:1px solid hsl(var(--border));}
.family-murree-muted{color:hsl(var(--muted));}

.family-murree-reveal{opacity:0;transform:translateY(40px) translateZ(0);transition:opacity .9s ease-out,transform .9s ease-out;}
.family-murree-reveal.in{opacity:1;transform:translateY(0) translateZ(0);}

@keyframes family-murreeKenBurns{0%{transform:scale(1) translateZ(0)}100%{transform:scale(1.15) translateZ(0)}}
@keyframes family-murreeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes family-murreeScrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
@keyframes family-murreeHeartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.family-murree-ken{animation:family-murreeKenBurns 8s ease-out both;}
.family-murree-float{animation:family-murreeFloat 6s ease-in-out infinite;}
.family-murree-scroll-ind{animation:family-murreeScrollDown 1.5s ease-in-out infinite;}
.family-murree-heartbeat{animation:family-murreeHeartbeat 2s ease-in-out infinite;}

html{scroll-behavior:smooth;}
`;


function Section({ id, children, className = "", style }: { id?: string; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <section id={id} className={`relative overflow-hidden py-24 md:py-32 ${className}`} style={style}>{children}</section>;
}

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

const GALLERY_IMAGES = [
  { src: "/assets/gallery-exterior.jpg", label: "Private estate exterior" },
  { src: "/assets/gallery-garden.jpg", label: "Family garden & lawns" },
  { src: "/assets/gallery-interior.jpg", label: "Spacious living areas" },
  { src: "/assets/gallery-bbq.jpg", label: "Family BBQ evenings" },
  { src: "/assets/gallery-dining-night.jpg", label: "Private family dining" },
  { src: "/assets/murree-forest-pines.jpg", label: "Nature walks nearby" },
] as const;

const COMPARISON_ROWS = [
  { label: "Privacy", hotel: "Shared corridors & lobbies", estate: "Entire property — only your family" },
  { label: "Dining", hotel: "Fixed buffet hours", estate: "Private chef, your menu & timing" },
  { label: "Kids", hotel: "Limited safe outdoor space", estate: "Gated lawns, no traffic inside" },
  { label: "Capacity", hotel: "1–2 rooms for large families", estate: "Full estate for 6–15+ guests" },
  { label: "Location", hotel: "Crowded Murree ridge", estate: "Quiet Bhurban — 50 km from Islamabad" },
] as const;

const FAMILY_PACKAGES = [
  {
    name: "Family Retreat Villa",
    price: "75,000",
    capacity: "6–10 guests",
    image: "/assets/villa-presidential.jpg",
    perks: ["3–4 bedrooms", "Kids play area", "Private garden", "Family dining"],
  },
  {
    name: "Deluxe Family Suite",
    price: "55,000",
    capacity: "4–6 guests",
    image: "/assets/villa-alpine.jpg",
    perks: ["Connecting rooms", "Mountain views", "Kids corner", "Breakfast included"],
    featured: true,
  },
  {
    name: "Premium Family Estate",
    price: "120,000",
    capacity: "8–15 guests",
    image: "/assets/villa-presidential-real.jpg",
    perks: ["Full private estate", "Personal chef", "BBQ terrace", "24/7 concierge"],
  },
] as const;

const TESTIMONIALS = [
  {
    name: "Ahmed Family, Lahore",
    text: "We booked three rooms at a Murree hotel last year — kids were restless, breakfast was chaos. This time the whole estate was ours. Best family trip we've had.",
    rating: 5,
  },
  {
    name: "Sara & Family, Islamabad",
    text: "Gated property, safe lawns for the children, and meals whenever we wanted. Exactly what families need in Murree — not another crowded hotel.",
    rating: 5,
  },
  {
    name: "Khan Family, Karachi",
    text: "Eid gathering for 12 people — everyone had space, privacy, and mountain views. Our relatives are already asking for the WhatsApp number.",
    rating: 5,
  },
] as const;

function SectionHeader({ kicker, title, sub, light = false }: { kicker?: string; title: ReactNode; sub: string; light?: boolean }) {
  return (
    <Reveal>
      <div className="mx-auto mb-16 max-w-4xl text-center">
        {kicker && (
          <span
            className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: light ? "hsl(162 34% 37% / .25)" : "hsl(162 34% 37% / .12)",
              color: light ? "hsl(162 38% 72%)" : "hsl(165 60% 18%)",
            }}
          >
            {kicker}
          </span>
        )}
        <h2 className="text-4xl font-bold md:text-5xl" style={{ color: light ? "hsl(40 38% 97%)" : "hsl(165 60% 18%)" }}>
          {title}
        </h2>
        <p className="mt-4 text-lg" style={{ color: light ? "hsl(40 38% 97% / .8)" : "hsl(165 12% 38%)" }}>
          {sub}
        </p>
      </div>
    </Reveal>
  );
}

function Introduction() {
  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="FAMILY HOTELS IN MURREE" 
          title="Most Murree Hotels Aren't Built for Families" 
          sub="Shared corridors, strangers at breakfast, and fixed hotel schedules are not the family holiday your group deserves."
        />
        <Reveal>
          <div className="family-murree-card family-murree-shadow-lux p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-lg leading-relaxed md:text-xl" style={{ color: "hsl(165 35% 12%)" }}>
                Shared corridors. Strangers at breakfast. Kids running into unknown guests. Murree's popular hotels are built for volume — hundreds of check-ins a week, fixed schedules, and rooms that feel the same everywhere. That's not a family experience. That's just accommodation. Your family deserves more than a room with a mountain view.
              </p>
              <p className="mb-6 text-lg leading-relaxed md:text-xl" style={{ color: "hsl(165 35% 12%)" }}>
                Himalaya Villas is not a hotel. It's a fully private luxury estate in Bhurban — the most exclusive enclave of the Murree Hills — where the entire property is reserved exclusively for your family. No other guests. No shared spaces. No strangers. Just your family, the mountains, and complete peace of mind.
              </p>
              <p className="family-murree-text-gold mt-8 text-center text-xl font-semibold md:text-2xl">
                One booking. One family. The whole estate.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ComparisonSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          kicker="HOTEL VS ESTATE"
          title="Why Families Choose a Private Estate Over a Murree Hotel"
          sub="See the difference between a standard family hotel room and booking the entire Himalaya Villas estate."
        />
        <Reveal>
          <div className="family-murree-card family-murree-shadow-lux overflow-hidden">
            <div className="grid grid-cols-3 border-b border-stone-200 bg-emerald-950 px-4 py-4 text-center text-xs font-bold uppercase tracking-widest text-white sm:px-6 sm:text-sm">
              <span className="text-left">Feature</span>
              <span className="flex items-center justify-center gap-1 text-red-200/90">
                <X className="h-3.5 w-3.5" /> Murree Hotel
              </span>
              <span className="flex items-center justify-center gap-1 text-[#5a9d87]">
                <Check className="h-3.5 w-3.5" /> Himalaya Villas
              </span>
            </div>
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 gap-2 border-b border-stone-100 px-4 py-4 text-sm last:border-0 sm:px-6 sm:py-5 sm:text-base ${
                  idx % 2 === 0 ? "bg-white" : "bg-stone-50/80"
                }`}
              >
                <span className="font-semibold text-emerald-950">{row.label}</span>
                <span className="family-murree-muted text-center">{row.hotel}</span>
                <span className="text-center font-medium text-emerald-800">{row.estate}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function GallerySection() {
  return (
    <Section id="gallery">
      <Container>
        <SectionHeader
          kicker="THE ESTATE"
          title="A Family Hotel Alternative — See the Space Your Family Gets"
          sub="Private gardens, mountain-view terraces, and room to breathe — not a single hotel corridor in sight."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img, k) => (
            <Reveal key={img.src} delay={k * 80}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  {img.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FamilyPackagesSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          kicker="FAMILY PACKAGES"
          title="Family Stay Options in Bhurban — From Intimate to Full Estate"
          sub="Flexible packages for couples with kids, extended families, and large Eid or reunion groups."
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {FAMILY_PACKAGES.map((pkg, k) => (
            <Reveal key={pkg.name} delay={k * 100}>
              <div
                className={`family-murree-card family-murree-shadow-lux overflow-hidden transition hover:-translate-y-1 ${
                  "featured" in pkg && pkg.featured ? "ring-2 ring-[#3E7E69]" : ""
                }`}
              >
                {"featured" in pkg && pkg.featured && (
                  <div className="family-murree-grad-gold py-2 text-center text-xs font-bold uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                <div className="relative aspect-[16/10]">
                  <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">{pkg.capacity}</p>
                  <h3 className="mt-2 text-xl font-bold text-emerald-950">{pkg.name}</h3>
                  <p className="mt-2 font-serif text-3xl font-bold text-emerald-800">
                    ₨{pkg.price}
                    <span className="text-sm font-normal text-stone-500"> / night</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {pkg.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm family-murree-muted">
                        <Check className="h-4 w-4 shrink-0 family-murree-check" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={MURREE_FAMILY_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="family-murree-grad-gold family-murree-shadow-gold mt-6 block w-full rounded-xl py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:scale-[1.01]"
                    style={{ color: "hsl(40 38% 97%)" }}
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          kicker="FAMILY REVIEWS"
          title="What Pakistani Families Say About Their Stay"
          sub="Real feedback from families who chose a private Bhurban estate over crowded Murree hotels."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, k) => (
            <Reveal key={t.name} delay={k * 100}>
              <div className="family-murree-card family-murree-shadow-lux flex h-full flex-col p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#3E7E69] text-[#3E7E69]" />
                  ))}
                </div>
                <p className="flex-1 leading-relaxed text-stone-600">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-6 font-semibold text-emerald-900">{t.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FamilyAmenitiesStrip() {
  const items = [
    { icon: Shield, label: "Gated & 24/7 security" },
    { icon: Baby, label: "Child-safe grounds" },
    { icon: Utensils, label: "Private family chef" },
    { icon: Gamepad2, label: "Kids activities" },
  ];
  return (
    <Section className="family-murree-grad-emerald py-12 md:py-16" style={{ color: "hsl(40 38% 97%)" }}>
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {items.map((item, k) => (
            <Reveal key={item.label} delay={k * 80}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-white/30"
                  aria-hidden
                >
                  <item.icon className="h-7 w-7 text-[#3E7E69]" strokeWidth={2.25} />
                </div>
                <p className="max-w-[11rem] text-sm font-semibold leading-snug md:text-[15px]">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WhyPerfectForFamilies() {
  const features = [
    {
      icon: Home,
      title: "Entire Estate — Just Your Family",
      description: "No other guests share the property. Every room, every terrace, every garden, every corner — belongs entirely to your family for the duration of your stay."
    },
    {
      icon: Baby,
      title: "Safe & Spacious for Kids",
      description: "Gated, secured estate with open lawns, safe outdoor spaces, and no traffic. Children can run, explore, and breathe freely — parents can actually relax."
    },
    {
      icon: Utensils,
      title: "Private Family Dining — Your Menu, Your Time",
      description: "No fixed breakfast hours. No crowded hotel restaurant. A personal chef crafts meals around your family's preferences — from kid-friendly favorites to family BBQ evenings under the mountain sky."
    },
    {
      icon: Mountain,
      title: "Panoramic Himalayan Views from Every Room",
      description: "Every window in the estate opens to sweeping views of the Murree Hills and Himalayan foothills. Wake up to the mountains — every morning, without exception."
    },
    {
      icon: Clock,
      title: "24/7 Concierge — Dedicated to Your Family",
      description: "Our team is not managing hundreds of guests. They are managing one stay — yours. Anything your family needs, at any hour, is handled immediately."
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="THE ALTERNATIVE"
          title="Himalaya Villas Bhurban — Murree's Only Private Family Estate"
          sub="A fully private luxury estate reserved exclusively for your family, not a busy Murree hotel with shared spaces."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, k) => (
            <Reveal key={k} delay={k * 100}>
              <div className="family-murree-card family-murree-shadow-lux group h-full p-6 transition hover:-translate-y-2">
                <div className="family-murree-grad-emerald mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ color: "hsl(40 38% 97%)" }}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-emerald-950">{feature.title}</h3>
                <p className="family-murree-muted leading-relaxed">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FamilyPurposeSection() {
  const cards = [
    {
      title: "Extended Family Gatherings",
      description: "Book the estate for a family reunion, Eid gathering, or milestone celebration. Space, privacy, and a Himalayan backdrop that no banquet hall can match."
    },
    {
      title: "Family Vacations with Young Children",
      description: "Safe enclosed grounds, open-air dining, and personalized care make Himalaya Villas the most family-friendly stay in the Murree hills."
    },
    {
      title: "Multi-Generation Family Trips",
      description: "Grandparents need comfort. Parents need calm. Children need space. Himalaya Villas gives every generation exactly what they need — in one private estate."
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="WHO IT'S FOR"
          title="Perfect For Every Kind of Family Trip to Murree"
          sub="The estate is designed for family reunions, young children, and multigenerational groups who want space, privacy, and true convenience."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, k) => (
            <Reveal key={k} delay={k * 120}>
              <div className="family-murree-card family-murree-shadow-lux p-8">
                <h3 className="mb-4 text-2xl font-bold text-emerald-950">{card.title}</h3>
                <p className="family-murree-muted leading-relaxed">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function LocationSection() {
  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="LOCATION"
          title="Located in Bhurban — The Best Address in the Murree Hills"
          sub="Higher, quieter, and more scenic than Murree's main ridge — Bhurban is the location families choose for peace, privacy, and mountain views."
        />
        <Reveal>
          <div className="family-murree-card family-murree-shadow-lux p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  Just 50 km from Islamabad, Bhurban sits higher, quieter, and more scenic than Murree's main ridge. No bazaar crowds, no congestion — just cedar forests, clean mountain air, and complete calm. It is the address families return to, year after year.
                </p>
                <ul className="space-y-4">
                  {[
                    "More elevated than Murree town centre",
                    "Quieter and more exclusive atmosphere",
                    "Better Himalayan views and cleaner air",
                    "50 km from Islamabad with easy access"
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 family-murree-check" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4">
                {[
                  { icon: Sun, title: "Summer", detail: "Cool weather and lush green hills" },
                  { icon: Snowflake, title: "Winter", detail: "Snowfall in Bhurban for unforgettable family moments" },
                  { icon: Flower2, title: "Autumn", detail: "Golden foliage and quieter mountain days" },
                ].map((season, idx) => (
                  <div key={idx} className="family-murree-card family-murree-border p-6">
                    <div className="flex items-start gap-4">
                      <div className="family-murree-grad-emerald flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(40 38% 97%)" }}>
                        <season.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-emerald-950">{season.title}</h4>
                        <p className="family-murree-muted mt-2">{season.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Is Himalaya Villas suitable for large families?",
      answer: "Yes. The estate is designed for large groups and families of all sizes. From spacious bedrooms to grand living areas and outdoor event spaces, there is room for everyone — with privacy throughout."
    },
    {
      question: "Is the estate safe for young children?",
      answer: "Absolutely. The property is fully gated and secured, with enclosed grounds and no vehicle traffic inside. Children can play freely outdoors while parents relax in peace."
    },
    {
      question: "How far is Himalaya Villas from Islamabad?",
      answer: "The estate is located in Bhurban, approximately 50 kilometres from Islamabad — roughly a 1.5 to 2 hour drive, depending on traffic."
    },
    {
      question: "Can we arrange special family meals or celebrations?",
      answer: "Yes. Our private chef and dining team will prepare meals entirely around your family's preferences — including special occasion setups, BBQ evenings, birthday dinners, and more."
    },
    {
      question: "How do we book the family estate?",
      answer: "Contact us directly via WhatsApp at +92 304 567 9000. Our concierge team will discuss your family's needs, confirm availability, and customize your stay from there."
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="FREQUENTLY ASKED QUESTIONS"
          title="Family Hotel in Murree — Frequently Asked Questions"
          sub="Everything you need to know about Himalaya Villas and your private family stay in Bhurban."
        />
        <div className="space-y-6">
          {faqs.map((faq, k) => (
            <Reveal key={k} delay={k * 100}>
              <div className="family-murree-card family-murree-shadow-lux p-6">
                <h3 className="mb-3 text-xl font-bold text-emerald-950">{faq.question}</h3>
                <p className="family-murree-muted leading-relaxed">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SectionCTA() {
  return (
    <div className="py-8 md:py-12 px-6">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl family-murree-grad-emerald family-murree-shadow-lux text-white">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-800/50 blur-[40px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#3E7E69]/20 blur-[40px]" />
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-10 lg:p-12">
              <div className="text-center md:text-left max-w-xl">
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">Ready to secure your family's stay?</h3>
                <p className="text-base text-white/85">
                  Speak directly with our concierge team to customize your private family estate experience.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 w-full sm:flex-row sm:w-auto">
                <a
                  href={MURREE_FAMILY_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="family-murree-grad-gold family-murree-shadow-gold flex min-w-0 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition-transform hover:scale-105 sm:w-auto"
                  style={{ color: "hsl(40 38% 97%)" }}
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
                <a
                  href="tel:+923045679000"
                  className="flex min-w-0 w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-base font-bold transition hover:bg-white/10 sm:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="family-murree-page">
        <HeroSlider whatsappUrl={MURREE_FAMILY_WHATSAPP_URL} />
        <FamilyAmenitiesStrip />
        <Introduction />
        <ComparisonSection />
        <WhyPerfectForFamilies />
        <GallerySection />
        <FamilyPackagesSection />
        <FamilyPurposeSection />
        <TestimonialsSection />
        <LocationSection />
        <SectionCTA />
        <FAQSection />
        <FinalCTA />
      </main>
    </>
  );
}

function FinalCTA() {
  return (
    <Section id="contact" className="family-murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="/assets/gallery-exterior.jpg" speed={0.25} opacity={0.12} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl font-bold md:text-5xl mb-6">
                Give Your Family the Murree Trip They Will Never Stop Talking About
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Stop settling for hotel rooms when your family deserves an entire private estate. Himalaya Villas offers families something the Murree Hills have never seen before — complete exclusivity, breathtaking Himalayan views, and the kind of space and freedom that transforms a holiday into a memory that stays with your family forever.
              </p>
              <div className="mb-8">
                <p className="text-lg font-medium mb-4">
                  Bookings are strictly limited each month to preserve the exclusivity and quality of every stay. Reserve your family's private estate today.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <a 
                  href="tel:+923045679000" 
                  className="family-murree-grad-gold family-murree-shadow-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105 sm:w-auto"
                  style={{ color: "hsl(40 38% 97%)" }}
                >
                  <Phone className="h-5 w-5" />
                  +92 304 567 9000
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-base font-semibold transition-all hover:scale-105 hover:bg-white/10 sm:w-auto"
                >
                  <Mail className="h-5 w-5" />
                  info@himalayavillas.com
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5" />
                Bhurban, Murree, Pakistan
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}
