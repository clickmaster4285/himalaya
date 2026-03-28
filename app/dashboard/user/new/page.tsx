"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  Heart,
  Home,
  Loader2,
  Mountain,
  PartyPopper,
  Sparkles,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  EXPERIENCE_OPTIONS,
  GENERAL_VILLA_VALUE,
  PRICE_OPTIONS,
  getVillaSelectOptions,
  packageNameFromVillaValue,
} from "@/lib/booking-form-options";
import type { Villa } from "@/lib/villa-types";

const STEP_LABELS = ["Experience", "Villa", "Schedule & budget", "Review"] as const;

const EXPERIENCE_ICONS = {
  "Book Your Stay": Home,
  "Destination Weddings": Heart,
  Dining: UtensilsCrossed,
  Events: PartyPopper,
  "Fun Activities": Mountain,
  Meetings: UsersRound,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function NewBookingPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [catalogVillas, setCatalogVillas] = useState<Villa[]>([]);

  useEffect(() => {
    fetch("/api/villas")
      .then((r) => r.json())
      .then((d) => setCatalogVillas(Array.isArray(d.villas) ? d.villas : []))
      .catch(() => setCatalogVillas([]));
  }, []);

  const villaOptions = useMemo(() => getVillaSelectOptions(catalogVillas), [catalogVillas]);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const [experienceType, setExperienceType] = useState<string>(EXPERIENCE_OPTIONS[0].value);
  const [villaValue, setVillaValue] = useState<string>(GENERAL_VILLA_VALUE);
  const [priceValue, setPriceValue] = useState<string>(PRICE_OPTIONS[4].value);
  const [bookingDate, setBookingDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dur = reduceMotion ? 0 : 0.32;

  function goNext() {
    setDirection(1);
    setStep((s) => Math.min(STEP_LABELS.length - 1, s + 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  const variants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir >= 0 ? 36 : -36,
      opacity: reduceMotion ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir >= 0 ? -36 : 36,
      opacity: reduceMotion ? 1 : 0,
    }),
  };

  const selectedVillaLabel = villaOptions.find((v) => v.value === villaValue)?.label ?? "—";
  const selectedPriceLabel = PRICE_OPTIONS.find((p) => p.value === priceValue)?.label ?? "—";

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      const packageName = packageNameFromVillaValue(villaValue, catalogVillas);
      const totalAmount = Number(priceValue);
      if (Number.isNaN(totalAmount) || totalAmount < 0) {
        setError("Please select a valid budget.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          experienceType,
          packageName,
          bookingDate: bookingDate || new Date().toISOString(),
          totalAmount,
          notes: notes.trim() || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not create booking");
        return;
      }
      router.push("/dashboard/user");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl pb-10">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[#fdf9f6]" />
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[320px] w-[min(100%,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,165,91,0.12),transparent_65%)]"
      />

      <header className="mb-8 text-center md:text-left">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#e8dfd2] bg-white/80 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a] shadow-sm">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          Concierge request
        </div>
        <h1 className="font-display text-[2rem] font-bold leading-tight tracking-tight text-[#1a1816] md:text-[2.35rem]">
          New booking
        </h1>
        <p className="mx-auto mt-2 max-w-md font-sans text-[15px] leading-relaxed text-[#5c564c] md:mx-0">
          Four quick steps. Your request stays{" "}
          <strong className="font-semibold text-[#7a6129]">Pending</strong> until the booking manager confirms.
        </p>
      </header>

      {/* Stepper */}
      <div className="mb-8 flex gap-1 sm:gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="min-w-0 flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i < step ? "bg-[#9a7b3a]" : i === step ? "bg-[#c9a55b] shadow-[0_0_12px_rgba(201,165,91,0.45)]" : "bg-[#e8e0d4]",
              )}
            />
            <p
              className={cn(
                "mt-2 truncate font-sans text-[10px] font-semibold uppercase tracking-wider sm:text-[11px]",
                i === step ? "text-[#7a6129]" : i < step ? "text-[#8a7d6f]" : "text-[#b5a99a]",
              )}
            >
              {i + 1}. {label}
            </p>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#e8dfd2] bg-white shadow-[0_20px_60px_-24px_rgba(42,35,28,0.18)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a55b]/40 to-transparent" />

        <div className="relative min-h-[min(28rem,70vh)] p-6 sm:p-8 md:p-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: dur, ease }}
              className="space-y-6"
            >
              {step === 0 && (
                <>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">What are you planning?</h2>
                    <p className="mt-1 font-sans text-sm text-[#6b655c]">Pick the experience that best matches your stay.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {EXPERIENCE_OPTIONS.map((opt) => {
                      const Icon = EXPERIENCE_ICONS[opt.value as keyof typeof EXPERIENCE_ICONS];
                      const selected = experienceType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setExperienceType(opt.value)}
                          className={cn(
                            "group flex gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200",
                            selected
                              ? "border-[#9a7b3a] bg-gradient-to-br from-[#faf6ef] to-[#f5efe6] shadow-md ring-2 ring-[#c9a55b]/20"
                              : "border-[#ebe4dc] bg-[#fdfcfa] hover:border-[#d4cdc2] hover:shadow-sm",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                              selected ? "bg-[#9a7b3a]/15 text-[#7a6129]" : "bg-[#f0ebe4] text-[#8a7d6f] group-hover:bg-[#e8dfd4]",
                            )}
                          >
                            <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-base font-semibold leading-snug text-[#1a1816]">{opt.value}</span>
                            <span className="mt-0.5 block font-sans text-xs leading-relaxed text-[#6b655c]">{opt.subtitle}</span>
                          </span>
                          {selected && (
                            <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9a7b3a] text-white">
                              <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Villa or package</h2>
                    <p className="mt-1 font-sans text-sm text-[#6b655c]">Choose a residence — or let our team recommend one.</p>
                  </div>
                  <div className="max-h-[min(340px,50vh)] space-y-2 overflow-y-auto pr-1">
                    {villaOptions.map((opt) => {
                      const selected = villaValue === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setVillaValue(opt.value)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                            selected
                              ? "border-[#9a7b3a] bg-[#faf6ef] ring-1 ring-[#c9a55b]/25"
                              : "border-[#ebe4dc] bg-white hover:border-[#d4cdc2]",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              selected ? "border-[#9a7b3a] bg-[#9a7b3a]" : "border-[#cfc6b8]",
                            )}
                          >
                            {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-sans text-sm font-semibold text-[#1a1816]">{opt.label}</span>
                            <span className="block font-sans text-xs text-[#6b655c]">{opt.hint}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Schedule &amp; budget</h2>
                    <p className="mt-1 font-sans text-sm text-[#6b655c]">When would you like to join us, and what budget should we plan around?</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-sans text-sm font-semibold text-[#2c2824]">
                      <CalendarClock className="h-4 w-4 text-[#9a7b3a]" aria-hidden />
                      Preferred date &amp; time
                    </Label>
                    <Input
                      type="datetime-local"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="h-12 rounded-xl border-[#cfc6b8] bg-[#fafafa] font-sans text-[15px] text-[#1a1816]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Budget (PKR)</Label>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_OPTIONS.map((opt) => {
                        const active = priceValue === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setPriceValue(opt.value)}
                            className={cn(
                              "rounded-xl border-2 px-3 py-2 font-sans text-[13px] font-semibold transition-all",
                              active
                                ? "border-[#9a7b3a] bg-[#9a7b3a] text-white shadow-md"
                                : "border-[#e0d8cc] bg-white text-[#3d3830] hover:border-[#c9a55b]/50",
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Review &amp; send</h2>
                    <p className="mt-1 font-sans text-sm text-[#6b655c]">Add a note if you like, then submit to our booking team.</p>
                  </div>
                  <div className="rounded-2xl border border-[#ebe4dc] bg-gradient-to-b from-[#faf8f5] to-white p-5">
                    <dl className="space-y-3 font-sans text-sm">
                      <div className="flex justify-between gap-4 border-b border-[#ebe4dc] pb-3">
                        <dt className="text-[#6b655c]">Experience</dt>
                        <dd className="text-right font-semibold text-[#1a1816]">{experienceType}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-[#ebe4dc] pb-3">
                        <dt className="text-[#6b655c]">Villa / package</dt>
                        <dd className="max-w-[60%] text-right font-semibold text-[#1a1816]">{selectedVillaLabel}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-[#ebe4dc] pb-3">
                        <dt className="text-[#6b655c]">Budget</dt>
                        <dd className="text-right font-semibold text-[#7a6129]">{selectedPriceLabel}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#6b655c]">Preferred time</dt>
                        <dd className="text-right font-medium text-[#1a1816]">
                          {bookingDate
                            ? new Date(bookingDate).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "Flexible / ASAP"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes-wizard" className="font-sans text-sm font-semibold text-[#2c2824]">
                      Notes <span className="font-normal text-[#8a8278]">(optional)</span>
                    </Label>
                    <textarea
                      id="notes-wizard"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Guest count, dietary needs, celebration details…"
                      className="w-full resize-none rounded-xl border border-[#cfc6b8] bg-[#fafafa] px-4 py-3 font-sans text-[15px] text-[#1a1816] placeholder:text-[#8a8478] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a55b]/35"
                    />
                  </div>
                  {error && <p className="rounded-lg bg-red-50 px-3 py-2 font-sans text-sm font-medium text-red-800">{error}</p>}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="flex flex-col gap-3 border-t border-[#f0ebe4] bg-[#fdfbf8]/90 px-6 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={step === 0 || loading}
            className="order-2 font-sans text-[14px] font-semibold text-[#5c564c] hover:bg-[#ebe4dc]/50 sm:order-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="order-1 flex w-full gap-2 sm:order-2 sm:w-auto">
            {step < STEP_LABELS.length - 1 ? (
              <Button
                type="button"
                onClick={goNext}
                className="h-12 flex-1 rounded-xl bg-[#9a7b3a] font-sans text-[15px] font-bold text-white shadow-lg shadow-[#6b5428]/20 hover:bg-[#856a32] sm:flex-none sm:min-w-[160px]"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="h-12 flex-1 rounded-xl bg-[#9a7b3a] font-sans text-[15px] font-bold text-white shadow-lg shadow-[#6b5428]/20 hover:bg-[#856a32] sm:flex-none sm:min-w-[200px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit request
                    <Check className="ml-2 h-4 w-4" strokeWidth={2.5} />
                  </>
                )}
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
