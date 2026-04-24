"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { hvAuthInput, hvAuthInputWithToggle, hvAuthLabel, hvAuthPrimaryBtn } from "@/components/auth/hv-auth-styles";
import type { SafeUser } from "@/lib/user-public";
import { hardNavigateAfterAuth } from "@/lib/auth-redirect";
import { dashboardPathForRole } from "@/lib/dashboard-nav";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  onSuccess?: (user: SafeUser, redirectTo: string) => void;
  onSwitchToLogin?: () => void;
  className?: string;
};

export default function SignupForm({ onSuccess, onSwitchToLogin, className }: Props) {
  const reduce = useReducedMotion();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const d = reduce ? 0 : 0.32;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        user?: SafeUser;
        redirectTo?: string;
      };
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not create account.");
        return;
      }

      const redirectTo =
        (typeof data.redirectTo === "string" && data.redirectTo.startsWith("/") && data.redirectTo) ||
        (data.user?.role ? dashboardPathForRole(data.user.role) : "/dashboard/user");

      if (onSuccess && data.user) {
        onSuccess(data.user, redirectTo);
        return;
      }

      hardNavigateAfterAuth(redirectTo);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const fieldWrap = (delay: number, children: ReactNode) => (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: d, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-5">
        {fieldWrap(0.08, (
          <div className="space-y-2">
            <Label htmlFor="hv-su-name" className={hvAuthLabel}>
              Full name
            </Label>
            <Input
              id="hv-su-name"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="e.g. Ayesha Khan"
              className={hvAuthInput}
            />
          </div>
        ))}
        {fieldWrap(0.14, (
          <div className="space-y-2">
            <Label htmlFor="hv-su-email" className={hvAuthLabel}>
              Email
            </Label>
            <Input
              id="hv-su-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className={hvAuthInput}
            />
          </div>
        ))}
        {fieldWrap(0.2, (
          <div className="space-y-2">
            <Label htmlFor="hv-su-password" className={hvAuthLabel}>
              Password
            </Label>
            <div className="relative">
              <Input
                id="hv-su-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                className={hvAuthInputWithToggle}
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#6b6458] transition-colors hover:bg-[#ebe6df] hover:text-[#1a1816]"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" strokeWidth={1.75} /> : <Eye className="h-5 w-5" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        ))}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d, delay: reduce ? 0 : 0.28, ease }}
        >
          {error && <p className="mb-2 text-sm font-semibold text-red-700">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            variant="ghost"
            className={cn(hvAuthPrimaryBtn, "gap-2 hover:bg-[#856a32] hover:text-white [&_svg]:size-5")}
          >
            <UserPlus className="h-5 w-5 shrink-0 opacity-95" strokeWidth={2} />
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </motion.div>

        <motion.p
          className="text-center font-sans text-[14px] text-[#5c564c]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.34, duration: d }}
        >
          Already registered?{" "}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-[#9a7b3a] underline decoration-[#c9a55b]/50 underline-offset-[3px] hover:text-[#7a6129]"
            >
              Sign in
            </button>
          ) : (
            <Link href="/login" className="font-semibold text-[#9a7b3a] underline decoration-[#c9a55b]/50 underline-offset-[3px] hover:text-[#7a6129]">
              Sign in
            </Link>
          )}
        </motion.p>
      </div>
    </form>
  );
}
