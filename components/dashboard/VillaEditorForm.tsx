"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ImageIcon, Loader2, Maximize2, Sparkles, Trash2, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VILLA_CATEGORIES, type VillaCategory } from "@/lib/villa-types";
import { cn } from "@/lib/utils";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const STEPS = [
  { key: "basics", label: "Basics", short: "Name & URL", icon: Type },
  { key: "space", label: "Space & rate", short: "Rooms & price", icon: Maximize2 },
  { key: "media", label: "Images", short: "Hero & gallery", icon: ImageIcon },
  { key: "details", label: "Story", short: "Highlights & copy", icon: Sparkles },
  { key: "review", label: "Review", short: "Publish", icon: CheckCircle2 },
] as const;

function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type VillaFormInitial = {
  slug?: string;
  title?: string;
  category?: VillaCategory;
  description?: string;
  price?: string;
  image?: string;
  gallery?: string[];
  bedrooms?: number;
  guests?: number;
  size?: string;
  highlights?: string[];
  amenities?: string[];
  content?: string;
  published?: boolean;
};

type Props = {
  mode: "create" | "edit";
  villaId?: string;
  initial?: VillaFormInitial;
  className?: string;
};

export default function VillaEditorForm({ mode, villaId, initial, className }: Props) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<VillaCategory>(initial?.category ?? "Suite");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [galleryText, setGalleryText] = useState((initial?.gallery ?? []).join("\n"));
  const [bedrooms, setBedrooms] = useState(String(initial?.bedrooms ?? 2));
  const [guests, setGuests] = useState(String(initial?.guests ?? 4));
  const [size, setSize] = useState(initial?.size ?? "");
  const [highlightsText, setHighlightsText] = useState((initial?.highlights ?? []).join("\n"));
  const [amenitiesText, setAmenitiesText] = useState((initial?.amenities ?? []).join("\n"));
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published !== false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dur = reduceMotion ? 0 : 0.28;
  const ease = [0.22, 1, 0.36, 1] as const;

  function splitLines(t: string) {
    return t
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function buildBody() {
    return {
      slug,
      title,
      category,
      description,
      price,
      image,
      gallery: splitLines(galleryText),
      bedrooms: Number(bedrooms),
      guests: Number(guests),
      size,
      highlights: splitLines(highlightsText),
      amenities: splitLines(amenitiesText),
      content,
      published,
    };
  }

  function validateStep(i: number): string | null {
    switch (i) {
      case 0:
        if (!title.trim()) return "Add a villa title.";
        if (!slug.trim() || !SLUG_RE.test(slug.trim())) return "Use a URL slug with lowercase letters, numbers, and hyphens only.";
        if (!description.trim()) return "Add a short description.";
        return null;
      case 1: {
        if (!price.trim()) return "Add a display price (e.g. PKR 55,000).";
        if (!size.trim()) return "Add size (e.g. 420m²).";
        const b = Number(bedrooms);
        const g = Number(guests);
        if (!Number.isFinite(b) || b < 0) return "Bedrooms must be a valid number.";
        if (!Number.isFinite(g) || g < 0) return "Max guests must be a valid number.";
        return null;
      }
      case 2:
        if (!image.trim()) return "Add a hero image URL.";
        return null;
      case 3:
        if (!content.trim()) return "Add the full villa story for the detail page.";
        return null;
      default:
        return null;
    }
  }

  function goNext() {
    setError(null);
    const msg = validateStep(step);
    if (msg) {
      setError(msg);
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    for (let i = 0; i <= 3; i++) {
      const msg = validateStep(i);
      if (msg) {
        setError(msg);
        setStep(i);
        return;
      }
    }
    setLoading(true);
    try {
      const body = buildBody();
      const url = mode === "create" ? "/api/admin/villas" : `/api/admin/villas/${villaId}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save villa.");
        return;
      }
      router.push("/dashboard/superadmin/villas");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!villaId || !confirm("Delete this villa permanently? This cannot be undone.")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/villas/${villaId}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(typeof data.error === "string" ? data.error : "Could not delete.");
        return;
      }
      router.push("/dashboard/superadmin/villas");
      router.refresh();
    } catch {
      setError("Could not delete.");
    } finally {
      setDeleting(false);
    }
  }

  /** Strong borders + tinted fill so fields read clearly on white cards */
  const fieldClass = cn(
    "w-full rounded-xl border-2 border-[#7d6e5a] bg-[#f2ebe0]",
    "px-3 font-sans text-[15px] leading-snug text-[#1a1612] caret-[#5c4a24]",
    "shadow-[inset_0_1px_4px_rgba(40,32,22,0.08)]",
    "placeholder:text-[#6b5e4d] placeholder:font-normal",
    "transition-[border-color,background-color,box-shadow] duration-150",
    "focus-visible:border-[#6b5428] focus-visible:bg-[#fffdf8]",
    "focus-visible:shadow-[inset_0_1px_3px_rgba(40,32,22,0.05),0_0_0_3px_rgba(201,165,91,0.28)]",
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
  );
  const inputClass = cn(fieldClass, "h-11 py-2");
  const textareaClass = cn(fieldClass, "min-h-[7.5rem] resize-y py-3");
  const selectClass = cn(fieldClass, "h-11 cursor-pointer py-0");

  const galleryCount = splitLines(galleryText).length;
  const highlightCount = splitLines(highlightsText).length;
  const amenityCount = splitLines(amenitiesText).length;

  return (
    <form onSubmit={handleSubmit} className={cn("relative text-[#1a1612]", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a55b]/45 to-transparent" />

      <div className="mb-8 rounded-2xl border border-[#d4c9b8] bg-[#f5f0e8] p-3 md:p-4">
        <p className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#5c4a32]">Steps</p>
        <div className="flex gap-2 overflow-x-auto pb-1 md:gap-3 [scrollbar-width:thin]">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            const locked = i > step;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  if (i <= step) {
                    setError(null);
                    setStep(i);
                  }
                }}
                disabled={locked}
                className={cn(
                  "flex min-w-[7.5rem] shrink-0 flex-col items-center gap-2 rounded-xl border-2 px-3 py-3 text-center shadow-sm transition-all md:min-w-[9rem] md:px-4",
                  active &&
                    "border-[#a08040] bg-white text-[#1a1612] shadow-[0_8px_24px_-8px_rgba(28,22,16,0.2)] ring-2 ring-[#c9a55b]/40",
                  done &&
                    !active &&
                    "cursor-pointer border-[#b8a88c] bg-[#fffefb] text-[#1a1612] hover:border-[#9a7b3a] hover:bg-white",
                  locked && "cursor-not-allowed border-[#cfc4b5] bg-[#ebe4da] opacity-95",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border",
                    active && "border-[#2a231c] bg-[#1c1916] text-[#f5e6c8]",
                    done && !active && "border-[#c9a55b]/60 bg-[#fdf6e8] text-[#5c4a24]",
                    locked && "border-[#b5aa9c] bg-[#ddd5cb] text-[#4a4036]",
                  )}
                >
                  {done && !active ? (
                    <CheckCircle2 className="h-[18px] w-[18px] text-[#5c4a24]" strokeWidth={2.25} />
                  ) : (
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
                  )}
                </span>
                <span
                  className={cn(
                    "font-sans text-[10px] font-extrabold uppercase leading-tight tracking-[0.12em]",
                    active && "text-[#1a1612]",
                    done && !active && "text-[#2c2419]",
                    locked && "text-[#4a4036]",
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "block max-w-[9.5rem] font-sans text-[10px] font-semibold leading-snug md:text-[11px]",
                    active && "text-[#3d362e]",
                    done && !active && "text-[#4d453c]",
                    locked && "text-[#4a4036]",
                  )}
                >
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full border border-[#c9b89e] bg-[#dcd2c4]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#6b5428] to-[#c9a55b]"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
          />
        </div>
      </div>

      <div className="relative min-h-[16rem] overflow-hidden md:min-h-[18rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
            transition={{ duration: dur, ease }}
            className="space-y-6"
          >
            {step === 0 && (
              <>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Identity</h2>
                  <p className="mt-1 font-sans text-sm font-medium text-[#4a4238]">How this villa appears in the catalog and in the URL.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      <Label className="font-sans text-sm font-semibold text-[#2c2824]">URL slug</Label>
                      <button
                        type="button"
                        className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#9a7b3a] hover:underline"
                        onClick={() => title && setSlug(slugifyTitle(title))}
                      >
                        From title
                      </button>
                    </div>
                    <Input
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                      placeholder="emerald-ridge-villa"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Category</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as VillaCategory)}
                      className={selectClass}
                    >
                      {VILLA_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Short description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={textareaClass} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Space &amp; rate</h2>
                  <p className="mt-1 font-sans text-sm font-medium text-[#4a4238]">Shown on the villa detail page and in listing cards.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Price (display)</Label>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="PKR 55,000" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Size</Label>
                    <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="420m²" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Bedrooms</Label>
                    <Input type="number" min={0} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans text-sm font-semibold text-[#2c2824]">Max guests</Label>
                    <Input type="number" min={0} value={guests} onChange={(e) => setGuests(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Images</h2>
                  <p className="mt-1 font-sans text-sm font-medium text-[#4a4238]">One hero plus optional gallery URLs.</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-sans text-sm font-semibold text-[#2c2824]">Hero image URL</Label>
                  <Input value={image} onChange={(e) => setImage(e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label className="font-sans text-sm font-semibold text-[#2c2824]">Gallery URLs</Label>
                  <Textarea
                    value={galleryText}
                    onChange={(e) => setGalleryText(e.target.value)}
                    rows={6}
                    placeholder="One URL per line"
                    className={textareaClass}
                  />
                  <p className="font-sans text-[12px] text-[#8a8278]">{galleryCount} image{galleryCount === 1 ? "" : "s"} in gallery</p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Story &amp; services</h2>
                  <p className="mt-1 font-sans text-sm font-medium text-[#4a4238]">Highlights, amenities, and the long-form description.</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-sans text-sm font-semibold text-[#2c2824]">Highlights</Label>
                  <Textarea
                    value={highlightsText}
                    onChange={(e) => setHighlightsText(e.target.value)}
                    rows={4}
                    placeholder="One per line or comma-separated"
                    className={textareaClass}
                  />
                  <p className="font-sans text-[12px] text-[#8a8278]">{highlightCount} highlight{highlightCount === 1 ? "" : "s"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-sans text-sm font-semibold text-[#2c2824]">Services &amp; amenities</Label>
                  <Textarea
                    value={amenitiesText}
                    onChange={(e) => setAmenitiesText(e.target.value)}
                    rows={5}
                    className={textareaClass}
                  />
                  <p className="font-sans text-[12px] text-[#8a8278]">{amenityCount} amenit{amenityCount === 1 ? "y" : "ies"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-sans text-sm font-semibold text-[#2c2824]">Full story</Label>
                  <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className={cn(textareaClass, "min-h-[12rem]")} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1a1816] md:text-2xl">Review &amp; publish</h2>
                  <p className="mt-1 font-sans text-sm font-medium text-[#4a4238]">Confirm details before saving to the catalog.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e8dfd2] bg-[#faf8f5] p-4">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9a7b3a]">Villa</p>
                    <p className="mt-1 font-display text-lg text-[#1a1816]">{title || "—"}</p>
                    <p className="mt-2 font-mono text-[12px] font-medium text-[#3d3830]">/{slug || "…"}</p>
                    <p className="mt-2 font-sans text-sm text-[#5c564c]">{category}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e8dfd2] bg-[#faf8f5] p-4">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9a7b3a]">Capacity</p>
                    <p className="mt-2 font-sans text-sm text-[#1a1816]">
                      {bedrooms} bd · {guests} guests · {size || "—"}
                    </p>
                    <p className="mt-3 font-display text-lg text-[#1a1816]">{price || "—"}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e8dfd2] bg-[#faf8f5] p-4 sm:col-span-2">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#9a7b3a]">Media</p>
                    <p className="mt-2 line-clamp-2 break-all font-sans text-[13px] text-[#5c564c]">{image || "—"}</p>
                    <p className="mt-2 font-sans text-[12px] text-[#8a8278]">
                      Gallery: {galleryCount} image{galleryCount === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[#e5dcc8] bg-white p-4">
                  <input
                    id="hv-published"
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#cfc6b8] text-[#9a7b3a] focus:ring-[#c9a55b]/40"
                  />
                  <div>
                    <Label htmlFor="hv-published" className="font-sans text-sm font-semibold text-[#2c2824]">
                      Published
                    </Label>
                    <p className="mt-1 font-sans text-[13px] font-medium leading-relaxed text-[#4a4238]">
                      When on, guests can open this villa on the site and pick it when booking.
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800">{error}</p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#efe8de] pt-6">
        {step > 0 ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-[#e0d5c8]"
            onClick={goBack}
            disabled={loading || deleting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-[#e0d5c8]"
            onClick={() => router.push("/dashboard/superadmin/villas")}
            disabled={loading || deleting}
          >
            Cancel
          </Button>
        )}

        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            className="rounded-xl bg-[#1c1916] text-white hover:bg-[#2a241c]"
            onClick={goNext}
            disabled={loading || deleting}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={loading || deleting} className="rounded-xl bg-[#c9a55b] text-[#1c1916] hover:bg-[#b8944a]">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : mode === "create" ? (
              "Create villa"
            ) : (
              "Save changes"
            )}
          </Button>
        )}

        {mode === "edit" && villaId && step === STEPS.length - 1 && (
          <Button
            type="button"
            variant="outline"
            className="ml-auto rounded-xl border-red-200 text-red-800 hover:bg-red-50"
            disabled={loading || deleting}
            onClick={handleDelete}
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            <span className="ml-2">Delete</span>
          </Button>
        )}
      </div>
    </form>
  );
}
