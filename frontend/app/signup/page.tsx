import Link from "next/link";
import SignupClient from "@/components/signup/SignupClient";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function SignupPage() {
  return (
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
  );
}
