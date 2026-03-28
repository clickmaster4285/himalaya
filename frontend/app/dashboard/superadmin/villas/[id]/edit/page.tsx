"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import VillaEditorForm, { type VillaFormInitial } from "@/components/dashboard/VillaEditorForm";

export default function EditVillaPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [initial, setInitial] = useState<VillaFormInitial | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing villa id.");
      return;
    }
    fetch(`/api/admin/villas/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.villa) {
          setError(typeof d.error === "string" ? d.error : "Not found.");
          setInitial(null);
          return;
        }
        const v = d.villa as VillaFormInitial & { id: string };
        setInitial({
          slug: v.slug,
          title: v.title,
          category: v.category,
          description: v.description,
          price: v.price,
          image: v.image,
          gallery: v.gallery,
          bedrooms: v.bedrooms,
          guests: v.guests,
          size: v.size,
          highlights: v.highlights,
          amenities: v.amenities,
          content: v.content,
          published: v.published,
        });
        setError(null);
      })
      .catch(() => setError("Failed to load villa."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-10">
      <div>
        <Link
          href="/dashboard/superadmin/villas"
          className="font-sans text-[12px] font-semibold uppercase tracking-wide text-[#9a7b3a] hover:underline"
        >
          ← All villas
        </Link>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#1a1816]">Edit villa</h1>
      </div>

      {loading && (
        <div className="flex items-center gap-2 font-sans text-[#6b655c]">
          <Loader2 className="h-5 w-5 animate-spin text-[#c9a55b]" />
          Loading…
        </div>
      )}
      {error && !loading && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {!loading && initial && id && (
        <div className="rounded-3xl border border-[#e0d5c8] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(28,22,16,0.15)] md:p-9">
          <VillaEditorForm mode="edit" villaId={id} initial={initial} />
        </div>
      )}
    </div>
  );
}
