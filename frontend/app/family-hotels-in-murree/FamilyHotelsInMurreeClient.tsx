"use client";

import { useEffect, useRef, useState, ReactNode, FormEvent, ChangeEvent } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildBhurbanInquiryWhatsAppUrl } from "@/lib/whatsapp";

const HERO_IMAGE = "/assets/gallery-exterior.jpg";

const EMPTY_INQUIRY_FORM = {
  familyName: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: "5-8",
  message: "",
};

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`family-murree-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

type InquiryFormState = typeof EMPTY_INQUIRY_FORM;

function HeroBookingForm({
  form,
  onChange,
  onSubmit,
  submitting,
  submitStatus,
  submitError,
  successNote,
  onReset,
}: {
  form: InquiryFormState;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  submitStatus: "idle" | "success" | "error";
  submitError: string;
  successNote: string;
  onReset: () => void;
}) {
  const whatsappFallbackUrl = buildBhurbanInquiryWhatsAppUrl({
    fullName: form.familyName,
    email: form.email,
    phone: form.phone,
    checkInDate: form.checkIn,
    checkOutDate: form.checkOut,
    numberOfGuests: form.guests,
    message: form.message
      ? `Family estate inquiry (Murree page). Special requests: ${form.message}`
      : "Family estate inquiry — Himalaya Villas Murree",
  });

  return (
    <div className="family-murree-hero__card">
      <div className="family-murree-hero__card-head">
        <h2 className="family-murree-hero__card-title">Reserve the Estate</h2>
        <span className="family-murree-hero__badge">Limited Dates</span>
      </div>

      {submitStatus === "success" ? (
        <div className="family-murree-hero__form-success">
          <p className="font-semibold">Thank you — inquiry received!</p>
          <p className="mt-2">
            {successNote ||
              "We will reply to your email shortly. For urgent bookings, WhatsApp us anytime."}
          </p>
          <button type="button" onClick={onReset} className="mt-4 text-sm font-semibold text-[#3E7E69] underline">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate={false}>
          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-family-name">
              Family Name *
            </label>
            <input
              id="hero-family-name"
              name="familyName"
              value={form.familyName}
              onChange={onChange}
              required
              placeholder="Khan Family"
              className="family-murree-hero__input"
            />
          </div>

          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-email">
              Email *
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="your.email@example.com"
              className="family-murree-hero__input"
            />
          </div>

          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-phone">
              Phone
            </label>
            <input
              id="hero-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+92 300 0000000"
              className="family-murree-hero__input"
            />
          </div>

          <div className="family-murree-hero__row">
            <div className="family-murree-hero__field">
              <label className="family-murree-hero__label" htmlFor="hero-arrival">
                Arrival
              </label>
              <div className="family-murree-hero__date-wrap">
                <input
                  id="hero-arrival"
                  name="checkIn"
                  type="date"
                  value={form.checkIn}
                  onChange={onChange}
                  className="family-murree-hero__input"
                />
              </div>
            </div>
            <div className="family-murree-hero__field">
              <label className="family-murree-hero__label" htmlFor="hero-departure">
                Departure
              </label>
              <div className="family-murree-hero__date-wrap">
                <input
                  id="hero-departure"
                  name="checkOut"
                  type="date"
                  value={form.checkOut}
                  onChange={onChange}
                  className="family-murree-hero__input"
                />
              </div>
            </div>
          </div>

          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-family-size">
              Family Size
            </label>
            <select
              id="hero-family-size"
              name="guests"
              value={form.guests}
              onChange={onChange}
              className="family-murree-hero__select"
            >
              <option value="2-4">2–4 People</option>
              <option value="5-8">5–8 People</option>
              <option value="9-12">9–12 People</option>
              <option value="12+">12+ People</option>
            </select>
          </div>

          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-requests">
              Special Requests
            </label>
            <textarea
              id="hero-requests"
              name="message"
              value={form.message}
              onChange={onChange}
              rows={3}
              placeholder="e.g. Baby cot, BBQ evening, birthday setup..."
              className="family-murree-hero__textarea"
            />
          </div>

          {submitStatus === "error" && submitError ? (
            <div className="mb-3 space-y-2" role="alert">
              <p className="family-murree-hero__form-error">{submitError}</p>
              <a
                href={whatsappFallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="family-murree-hero__form-wa"
              >
                <MessageCircle className="h-4 w-4" />
                Send via WhatsApp instead
              </a>
            </div>
          ) : null}

          <button type="submit" className="family-murree-hero__submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send"}
            {!submitting && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
          </button>
        </form>
      )}

      <p className="family-murree-hero__form-note">
        {submitStatus === "success"
          ? "Need a faster reply? WhatsApp or call us anytime."
          : "Submit sends your inquiry by email — we reply shortly."}
      </p>
    </div>
  );
}

export function HeroSlider({ whatsappUrl }: { whatsappUrl: string }) {
  const [form, setForm] = useState(EMPTY_INQUIRY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [successNote, setSuccessNote] = useState("");

  const onFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitError("");
    }
  };

  const submitInquiry = async () => {
    setSuccessNote("");

    const inquiryMessage = form.message.trim()
      ? `Family estate inquiry (Murree). Special requests: ${form.message.trim()}`
      : "Family estate inquiry — Himalaya Villas Murree";

    const res = await fetch("/api/bhurban-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.familyName,
        email: form.email,
        phone: form.phone,
        checkInDate: form.checkIn,
        checkOutDate: form.checkOut,
        numberOfGuests: form.guests,
        message: inquiryMessage,
        source: "family-hotels-in-murree-hero",
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      emailSent?: boolean;
      saved?: boolean;
      emailPending?: boolean;
      guestEmailSent?: boolean;
    };

    if (!res.ok) {
      setSubmitStatus("error");
      setSubmitError(
        data.error ?? "Could not send your message. Please use WhatsApp below — we will reply quickly."
      );
      return;
    }

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submitted",
      });
    }

    setSubmitStatus("success");
    const email = form.email.trim();
    if (data.saved && (data.guestEmailSent || data.emailPending || data.emailSent)) {
      setSuccessNote(
        `Thank you! Your inquiry is saved. A confirmation email was sent to ${email}. We will reply shortly.`
      );
    } else if (data.saved) {
      setSuccessNote(
        "Thank you — your inquiry is saved. We could not send email right now; our team will contact you soon."
      );
    } else {
      setSuccessNote("Thank you — we received your inquiry.");
    }
    setForm(EMPTY_INQUIRY_FORM);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");
    void submitInquiry()
      .catch(() => {
        setSubmitStatus("error");
        setSubmitError("Could not send. Tap WhatsApp below to send your details instantly.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleReset = () => {
    setSubmitStatus("idle");
    setSuccessNote("");
    setSubmitError("");
    setForm(EMPTY_INQUIRY_FORM);
  };

  return (
    <section id="book" className="family-murree-hero relative overflow-hidden">
      <header className="relative z-40 flex items-center justify-between px-6 py-5 md:px-10 lg:px-12 xl:px-14">
        <a href="/" className="family-murree-hero__logo font-serif text-xl tracking-tight md:text-[1.35rem]">
          Himalaya <span className="family-murree-hero__logo-accent">Villas</span>
        </a>
        <a href="tel:+923045679000" className="family-murree-hero__phone text-xs font-medium md:text-[13px]">
          +92 304 567 9000
        </a>
      </header>

      <div className="family-murree-hero__body">
        <div className="family-murree-hero__grid">
          <div className="family-murree-hero__left">
            <p className="family-murree-hero__kicker mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]">
              A Private Bhurban Estate
            </p>

            <h1 className="family-murree-hero__headline max-w-[520px] font-serif text-[1.85rem] font-semibold leading-[1.14] sm:text-[2.15rem] lg:text-[2.45rem] xl:text-[2.65rem]">
              Best Family Hotel in Murree —{" "}
              <span className="family-murree-text-accent italic font-normal">
                A Private Estate That Belongs Only to You
              </span>
            </h1>

            <p className="family-murree-hero__sub mt-5 max-w-[440px] text-[15px] leading-[1.65]">
              Tired of crowded hotels in Murree? Himalaya Villas is a fully private luxury estate in Bhurban — reserved
              exclusively for one family at a time. No shared spaces. No strangers. Just your family and the Himalayas.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="family-murree-hero__cta-primary">
                <span className="text-[9px] leading-none">●</span>
                Book Family Stay in Murree — WhatsApp
              </a>
              <a href="tel:+923045679000" className="family-murree-hero__cta-secondary">
                Call to Book Family Villa
              </a>
            </div>
          </div>

          <div className="family-murree-hero__right">
            <img src={HERO_IMAGE} alt="Himalaya Villas private estate in Bhurban pine forest" />
          </div>
        </div>

        <div className="family-murree-hero__mobile-img lg:hidden">
          <img src={HERO_IMAGE} alt="Himalaya Villas private estate in Bhurban pine forest" className="h-full w-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(40,38%,97%)] via-transparent to-transparent" />
        </div>

        <div className="family-murree-hero__form-wrap">
          <HeroBookingForm
            form={form}
            onChange={onFormChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitStatus={submitStatus}
            submitError={submitError}
            successNote={successNote}
            onReset={handleReset}
          />
        </div>
      </div>
    </section>
  );
}

export function ParallaxBg({ src, speed = 0.3, opacity = 0.15 }: { src: string; speed?: number; opacity?: number }) {
  const y = useScrollY();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${src})`,
        transform: y > 0 ? `translateY(${y * speed}px)` : undefined,
        opacity,
        zIndex: 0,
      }}
    />
  );
}
