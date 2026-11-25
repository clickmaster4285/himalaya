"use client";
// components/SiteAnalytics.tsx
// Google Tag Manager, Google Ads gtag and click conversion tracking for every
// page except the ERP draft preview (/erp-preview?token=…): the preview is an
// editor tool inside an iframe, and its URL carries an access token that must
// never reach analytics.
import Script from "next/script";
import { usePathname } from "next/navigation";
import ConversionTracking from "@/components/ConversionTracking";
import { ERP_PREVIEW_PATH } from "@/lib/erp-preview";

export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname === ERP_PREVIEW_PATH) return null;
  return (
    <>
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18162243267" strategy="afterInteractive" />
      <Script id="google-ads-aw-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18162243267');
        `}
      </Script>
      <ConversionTracking />
    </>
  );
}
