import { motion } from "framer-motion";


const Footer = () => {
  return (
    <footer
      className="relative py-16 md:py-20 px-8 md:px-16 overflow-hidden"
      style={{ background: "hsl(160 15% 14%)" }}
    >
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-[30px] md:text-[60px] lg:text-[90px] tracking-[0.2em] uppercase whitespace-nowrap translate-y-6 md:translate-y-10"
          style={{ color: "hsl(0 0% 100% / 0.04)" }}
        >
          HIMALAYA VILLAS
        </span>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <h3
              className="font-display text-lg tracking-[0.15em] uppercase mb-4"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Himalaya Villas
            </h3>
            <p
              className="text-sm leading-relaxed font-body"
              style={{ color: "hsl(0 0% 100% / 0.5)" }}
            >
              A sanctuary of luxury
              <br />
              nestled in the Himalayas.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4
              className="text-[11px] tracking-[0.25em] uppercase mb-6 font-body font-semibold"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Discover
            </h4>
            <ul className="space-y-3">
              {["Our Villas", "Amenities", "Dining", "Experiences"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-body transition-opacity hover:opacity-100"
                    style={{ color: "hsl(0 0% 100% / 0.55)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="text-[11px] tracking-[0.25em] uppercase mb-6 font-body font-semibold"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {["Contact Us", "Instagram", "Facebook", "WhatsApp"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-body transition-opacity hover:opacity-100"
                    style={{ color: "hsl(0 0% 100% / 0.55)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h4
              className="text-[11px] tracking-[0.25em] uppercase mb-6 font-body font-semibold"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Stay Updated
            </h4>
            <p
              className="text-sm mb-4 font-body"
              style={{ color: "hsl(0 0% 100% / 0.5)" }}
            >
              Sign up for exclusive offers and hill-side stories.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 text-sm bg-transparent border font-body focus:outline-none"
                style={{
                  borderColor: "hsl(0 0% 100% / 0.15)",
                  color: "hsl(0 0% 100% / 0.8)",
                }}
              />
              <button
                className="px-4 py-2 text-xs tracking-wider uppercase font-body font-semibold"
                style={{
                  background: "hsl(36 45% 55%)",
                  color: "hsl(160 15% 14%)",
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid hsl(0 0% 100% / 0.1)" }}
        >
          <p
            className="text-xs font-body"
            style={{ color: "hsl(0 0% 100% / 0.35)" }}
          >
            Himalaya Villas 2026. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs font-body" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
              II
            </a>
            <a href="#" className="text-xs font-body" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
              ✦
            </a>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-body transition-opacity hover:opacity-100"
                style={{ color: "hsl(0 0% 100% / 0.35)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
