"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SignupForm from "@/components/SignupForm";
import { AuthGlassCard } from "@/components/AuthGlassCard";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  onSwitchToLogin?: () => void;
};

export default function SignupClient({ onSwitchToLogin }: Props) {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 0.45;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur, ease }}
    >
      <AuthGlassCard>
        <div className="relative">
          <motion.p
            className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#9a7b3a]"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur * 0.85, delay: reduce ? 0 : 0.05, ease }}
          >
            Himalaya Villas
          </motion.p>
          <motion.h1
            className="font-display mt-2 text-[2rem] font-bold leading-tight tracking-tight text-[#1a1816] md:text-[2.35rem]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur * 0.9, delay: reduce ? 0 : 0.1, ease }}
          >
            Guest signup
          </motion.h1>
          <motion.p
            className="mt-2 font-sans text-[15px] font-normal leading-relaxed text-[#5c564c]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur * 0.75, delay: reduce ? 0 : 0.18, ease }}
          >
            Create a guest account to book stays and experiences. After signup you&apos;ll land on the guest dashboard. Estate staff (superadmin / booking manager) use{" "}
            <Link href="/login" className="font-semibold text-[#9a7b3a] underline underline-offset-2 hover:text-[#7a6129]">
              Sign in
            </Link>{" "}
            — staff accounts are not created on this page.
          </motion.p>
          <div className="mt-5 h-px w-14 rounded-full bg-[#c9a55b]/70" aria-hidden />

          <SignupForm onSwitchToLogin={onSwitchToLogin} className="mt-7" />

          <motion.p
            className="mt-6 text-center font-sans text-[12px] text-[#6b655c]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.4, duration: dur * 0.6 }}
          >
            Encrypted password · Same security as concierge login
          </motion.p>
        </div>
      </AuthGlassCard>
    </motion.div>
  );
}
