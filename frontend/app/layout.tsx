import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

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
  title: "Himalaya Premium Villas | Private Luxury Estate Bhurban",
  description:
    "Himalaya Premium Villas is not a hotel. It is a private luxury estate in Bhurban crafted for those who demand exclusivity, privacy, and elevated experiences in the Himalayan foothills. Ultra-private villas, limited bookings, destination weddings, corporate retreats, and curated stays.",
  keywords: [
    "Himalaya Premium Villas",
    "Bhurban luxury estate",
    "private villa Pakistan",
    "Murree hills retreat",
    "exclusive mountain villas",
    "destination wedding Bhurban",
    "corporate retreat Pakistan",
  ],
  openGraph: {
    title: "Himalaya Premium Villas — Private Luxury Estate, Bhurban",
    description:
      "Not a hotel — a private luxury estate for elite gatherings, with panoramic Himalayan views, curated dining, and limited monthly bookings.",
  },
  verification: {
    google: "_QECsDvX53vPNLld00dRcy0Ay9dA2bvaAZxmiz-DAkw",
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
        {children}
      </body>
    </html>
  );
}
