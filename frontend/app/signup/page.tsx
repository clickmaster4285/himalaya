import Link from "next/link";
import SignupClient from "@/components/signup/SignupClient";
import { AuthPageShell } from "@/components/AuthPageShell";

const signupPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sign Up | Himalaya Villas & Resorts",
  "description": "Create your Himalaya Villas account to start booking luxury villas, managing reservations, and accessing exclusive member benefits.",
  "url": "https://himalayavillas.com/signup",
  "provider": { "@id": "https://himalayavillas.com/#organization" },
  "dateModified": "2024-01-01"
};

export default function SignupPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(signupPageSchema) }} />
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
          href="/login"
          className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d4b87a] transition-colors hover:text-[#e8cf8a]"
        >
          Sign in
        </Link>
      }
    >
      <SignupClient />
    </AuthPageShell>
    </div>
  );
}
