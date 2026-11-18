import Link from "next/link";

const GOLD = "hsl(36 45% 55%)";

const FOOTER_COLUMNS = [
  {
    title: "Stay",
    links: [
      { label: "View All Accommodation", href: "/accommodations" },
      { label: "Apartments", href: "/accommodations/apartments" },
      { label: "Villas", href: "/villas" },
      { label: "Rooms", href: "/accommodations/rooms" },
      { label: "Suites", href: "/accommodations/suites" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { label: "All Experiences", href: "/experience" },
      { label: "Meetings & Events", href: "/events" },
      { label: "Dining", href: "/dining" },
      { label: "Activities", href: "/adventure-games" },
      { label: "Entertainment", href: "/events" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Virtual Tour", href: "/virtual-tour" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Blog", href: "/blogs" },
      { label: "Guest Reviews", href: "/#testimonials" },
    ],
  },
  {
    title: "Resort",
    links: [
      { label: "About Us", href: "/about-himalaya-villas-bhurban" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Location & Directions", href: "/guides/getting-here" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const SOCIALS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@HimalayaVillasBhurban",
    icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12c0 1.9.2 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.9.5-5.8s-.2-3.9-.5-5.8ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/himalayavillas/",
    icon: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.6 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/himalayavillas",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

const Footer = () => {
  return (
    <>
      <footer
        className="relative py-16 md:py-20 px-8 md:px-16 overflow-hidden"
        style={{ background: "hsl(160 15% 14%)" }}
      >
      {/* Large background text */}
      <div
        className="absolute inset-0 mb-8 flex items-end justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-[30px] md:text-[60px] lg:text-[90px] tracking-[0.2em] uppercase whitespace-nowrap translate-y-6 md:translate-y-10"
          style={{ color: "hsl(0 0% 100% / 0.04)" }}
        >
          Himalaya Villas & Resorts
        </span>
      </div>
      <div className="relative max-w-7xl mx-auto">
        {/* Brand row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-12 mb-12" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.1)" }}>
          <div>
            <Link
              href="/"
              className="inline-block font-display font-bold text-[13px] md:text-[14px] tracking-[0.15em] uppercase mb-4 hover:opacity-90 whitespace-nowrap"
              style={{ color: GOLD }}
            >
              Himalaya Villas & Resorts
            </Link>
            <p className="max-w-full sm:max-w-[420px] text-sm leading-6 font-body" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
              A sanctuary of luxury nestled in the Himalayas. Experience breathtaking
              mountain views, private terraces, elegant accommodations, and warm
              hospitality designed to create an unforgettable escape in the heart of
              nature.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Himalaya Villas & Resorts ${s.label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-white/60 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Stay Updated */}
          <div className="lg:max-w-sm w-full">
            <h4 className="text-[11px] tracking-[0.25em] uppercase mb-4 font-body font-semibold" style={{ color: GOLD }}>
              Stay Updated
            </h4>
            <p className="text-sm mb-4 font-body" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
              Sign up for exclusive offers and hill-side stories.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-transparent border font-body focus:outline-none"
                style={{ borderColor: "hsl(0 0% 100% / 0.15)", color: "hsl(0 0% 100% / 0.8)" }}
              />
              <button
                className="px-4 py-2 text-xs tracking-wider uppercase font-body font-semibold"
                style={{ background: GOLD, color: "hsl(160 15% 14%)" }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.25em] uppercase mb-6 font-body font-semibold" style={{ color: GOLD }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-body transition-colors hover:text-white"
                      style={{ color: "hsl(0 0% 100% / 0.55)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid hsl(0 0% 100% / 0.1)" }}
        >
          <p
            className="text-xs font-body"
            style={{ color: "hsl(0 0% 100% / 0.35)" }}
          >
            Himalaya Villas & Resorts 2026. All rights reserved.
          </p>
          <Link
            href="/sitemap_index.xml"
            className="text-xs font-body transition-opacity hover:opacity-100"
            style={{ color: "hsl(0 0% 100% / 0.35)" }}
          >
            Sitemap
          </Link>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
