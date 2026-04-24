"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignupForm from "@/components/SignupForm";
import { hardNavigateAfterAuth } from "@/lib/auth-redirect";
import type { SafeUser } from "@/lib/user-public";

type Props = {
  triggerClassName?: string;
  children?: React.ReactNode;
  onSwitchToLogin?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function SignupDialog({ triggerClassName, children, onSwitchToLogin, open: openProp, onOpenChange }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  function handleSuccess(_user: SafeUser, redirectTo: string) {
    setOpen(false);
    hardNavigateAfterAuth(redirectTo);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <button
            type="button"
            className={
              triggerClassName ??
              "px-4 py-2 text-[10px] md:text-xs font-medium tracking-wider uppercase border border-white/70 text-white hover:bg-white/10 transition-colors"
            }
          >
            Sign up
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-[#eadfce] bg-[#fbf8f2]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Sign up</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-neutral-500">
          Create a guest account to book stays and experiences. Already registered?{" "}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#c9a55b] underline underline-offset-2"
            >
              Sign in
            </button>
          ) : (
            <Link href="/login" className="text-[#c9a55b] underline underline-offset-2" onClick={() => setOpen(false)}>
              Sign in
            </Link>
          )}
        </p>
        <SignupForm onSuccess={handleSuccess} onSwitchToLogin={onSwitchToLogin} className="pt-2" />
      </DialogContent>
    </Dialog>
  );
}

