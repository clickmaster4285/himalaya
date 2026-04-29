import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { AuthGlassCard } from "@/components/AuthGlassCard";
import { AuthPageShell } from "@/components/AuthPageShell";

const loginPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sign In | Himalaya Villas & Resorts",
  "description": "Sign in to your Himalaya Villas account to manage bookings, view reservations, and access exclusive member benefits.",
  "url": "https://himalayavillas.com/login",
  "provider": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort",
    "telephone": "+92 304 567 9000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhurban",
      "addressLocality": "Murree",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    }
  },
  "dateModified": "2024-01-01"
};

export default function LoginPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loginPageSchema) }} />
      <AuthPageShell
      headerStart={
        <Link
          href="/"
          className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e8dfd0] transition-colors hover:text-white"
        >
          ← Himalaya Villas & Resorts
        </Link>
      }
      headerEnd={
        <Link
          href="/signup"
          className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d4b87a] transition-colors hover:text-[#e8cf8a]"
        >
          Sign up
        </Link>
      }
    >
      <AuthGlassCard>
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#9a7b3a]">Himalaya Villas & Resorts</p>
        <h1 className="font-display mt-2 text-[2rem] font-bold leading-tight tracking-tight text-[#1a1816] md:text-[2.35rem]">
          Sign in
        </h1>

        <LoginForm className="mt-7" />
      </AuthGlassCard>
    </AuthPageShell>
  );
}
