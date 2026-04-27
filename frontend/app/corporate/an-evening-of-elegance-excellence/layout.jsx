import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "An Evening of Elegance & Excellence | Himalaya Villas & Resorts",
  description: "Host your an evening of elegance & excellence with us. Host an unforgettable award gala or formal dinner in our luxurious venue. From red carpet arrivals to champagne toasts, we handle every elegant detail.",
  path: "/corporate/an-evening-of-elegance-excellence",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
