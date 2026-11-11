import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { HotelGraphStructuredData } from "@/components/seo/HotelGraphStructuredData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import ConversionTracking from "@/components/ConversionTracking";
import ErpPageEdits from "@/components/cms/ErpPageEdits";
import { BRAND, getSiteOrigin } from "@/lib/seo/site-config";

/** Clean UI type for body, forms, and nav */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/** Editorial headings — luxury villas tone */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: `${BRAND.name} | Private Villa Estate in Bhurban, Murree`,
    template: "%s",
  },
  // Resolved per route at build time, so every page carries a self-referencing canonical.
  alternates: { canonical: "./" },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description:
    "Himalaya Villas & Resorts is a private villa estate in Bhurban, Murree Hills: twelve villas for family stays, weddings and company offsites, booked for one group at a time.",
  openGraph: {
    title: `${BRAND.name} | Private Villa Estate in Bhurban`,
    description:
      "A private villa estate in Bhurban, Murree Hills, for stays, weddings and gatherings.",
    url: "./",
    siteName: BRAND.name,
    type: "website",
    images: [{ url: "/assets/gallery-exterior.jpg", alt: `${BRAND.name}, Bhurban` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Private Villa Estate in Bhurban`,
    description: "A private villa estate in Bhurban, Murree Hills, for stays, weddings and gatherings.",
    images: ["/assets/gallery-exterior.jpg"],
  },
  verification: {
    google: "_QECsDvX53vPNLld00dRcy0Ay9dA2bvaAZxmiz-DAkw",
    other: {
      "facebook-domain-verification": "s11kyssc5rh9kjer6xcnyw2yth7eok",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans antialiased", dmSans.variable, cormorant.variable)} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T4KVZ7PW');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) — Google Ads AW-18162243267 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18162243267"
          strategy="afterInteractive"
        />
        <Script id="google-ads-aw-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18162243267');
          `}
        </Script>
        <HotelGraphStructuredData />
        <BreadcrumbJsonLd />
      </head>
      <body className={`${geistMono.variable} min-h-dvh`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T4KVZ7PW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ConversionTracking />
        {/* Applies published ERP Page Editing changes; renders nothing. Must stay before {children}. */}
        <ErpPageEdits />
        {children}
      </body>
    </html>
  );
}
