import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { AuthGlassCard } from "@/components/AuthGlassCard";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function LoginPage() {
  return (
    <AuthPageShell
      headerStart={
        <Link
          href="/"
          className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e8dfd0] transition-colors hover:text-white"
        >
          ← Himalaya Villas
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
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#9a7b3a]">Himalaya Villas</p>
        <h1 className="font-display mt-2 text-[2rem] font-bold leading-tight tracking-tight text-[#1a1816] md:text-[2.35rem]">
          Sign in
        </h1>

        <LoginForm className="mt-7" />
      </AuthGlassCard>
    </AuthPageShell>
  );
}
