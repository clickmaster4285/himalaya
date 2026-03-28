import Link from "next/link";
import VillaEditorForm from "@/components/dashboard/VillaEditorForm";

export default function NewVillaPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-10">
      <div>
        <Link
          href="/dashboard/superadmin/villas"
          className="font-sans text-[12px] font-semibold uppercase tracking-wide text-[#9a7b3a] hover:underline"
        >
          ← All villas
        </Link>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2.15rem]">New villa</h1>
      </div>
      <div className="rounded-3xl border border-[#e0d5c8] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(28,22,16,0.15)] md:p-9">
        <VillaEditorForm mode="create" />
      </div>
    </div>
  );
}
