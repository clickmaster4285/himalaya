// components/cms/CmsComparisonTable.tsx
// ERP "Comparison Table" / "Difference Table" (Option A vs Option B), sent as a
// richText section with content.erpType and a structured content.table. Drawn
// in the site's pricing look: gold header band, bold row names, zebra rows,
// the recommended column highlighted with a badge. Scrolls sideways on phones.
// Cells are plain strings rendered as text (never HTML).
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import CmsRichText, { markTableSymbols } from "./CmsRichText";
import CmsSection, { toneText } from "./CmsSection";
import { DisplayHeading } from "./CmsSectionHeading";
import type { Content, SectionLayout } from "./cmsContent";

export type ComparisonTable = { columns: string[]; rows: string[][] };

const MAX_COLUMNS = 12;
const MAX_ROWS = 200;
const MAX_CELL_LENGTH = 500;

const isStrings = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === "string");

/** content.table when it is valid (arrays of strings, ≤ 12 columns, ≤ 200 rows), else null. */
export function comparisonTable(c: Content): ComparisonTable | null {
  const table = c.table as { columns?: unknown; rows?: unknown } | null | undefined;
  if (!table || typeof table !== "object") return null;
  const { columns, rows } = table;
  if (!isStrings(columns) || columns.length < 2 || columns.length > MAX_COLUMNS) return null;
  if (!Array.isArray(rows) || rows.length > MAX_ROWS || !rows.every(isStrings)) return null;
  const cell = (s: string) => s.trim().slice(0, MAX_CELL_LENGTH);
  return {
    columns: columns.map(cell),
    // Every row as wide as the header: extra cells dropped, missing ones empty.
    rows: rows.map((row) => columns.map((_, i) => cell(row[i] ?? ""))),
  };
}

/** The intro paragraphs of bodyHtml (everything before its first table). */
export function introHtml(bodyHtml: string): string {
  return bodyHtml.split(/<table[\s>]/i)[0] ?? "";
}

const CHECK = /^[✓✔✅]$/;
const CROSS = /^[✗✘✕✖❌]$/;

function CellValue({ value, onDark }: { value: string; onDark: boolean }) {
  if (CHECK.test(value)) {
    return (
      <>
        <Check className={cn("h-5 w-5", onDark ? "text-emerald-300" : "text-emerald-600")} strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (CROSS.test(value)) {
    return (
      <>
        <X className={cn("h-5 w-5", onDark ? "text-white/35" : "text-neutral-400")} aria-hidden />
        <span className="sr-only">No</span>
      </>
    );
  }
  return <>{markTableSymbols(value, onDark)}</>;
}

export default function CmsComparisonTable({
  data,
  layout,
}: {
  data: {
    heading?: string;
    intro?: string;
    table: ComparisonTable;
    highlight?: string;
    highlightLabel?: string;
    note?: string;
  };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  const { columns, rows } = data.table;
  const wanted = (data.highlight ?? "").trim().toLowerCase();
  // Never column 0 (the row names).
  const highlighted = wanted ? columns.findIndex((c, i) => i > 0 && c.toLowerCase() === wanted) : -1;
  const label = data.highlightLabel?.trim();
  const highlight = (i: number) => i === highlighted && (t.onDark ? "bg-white/10" : "bg-[#c9a55b]/10");

  return (
    <CmsSection layout={layout}>
      <div className="mx-auto max-w-5xl">
        {data.heading && <DisplayHeading text={data.heading} tone={layout.tone} className="text-3xl md:text-5xl mb-6" />}
        {data.intro && <CmsRichText html={data.intro} onDark={t.onDark} className="mb-8" />}
        <div className={cn("w-full overflow-x-auto rounded-sm border", t.onDark ? "border-white/15" : "border-[#eadfce] bg-white shadow-sm")}>
          <table className="w-full border-collapse text-left text-sm md:text-base" style={{ minWidth: `${Math.min(columns.length * 9, 96)}rem` }}>
            <thead>
              <tr className={cn("border-b", t.border)}>
                {columns.map((column, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={cn(
                      "px-4 py-4 align-bottom text-[11px] font-semibold uppercase tracking-[0.2em]",
                      t.onDark ? "bg-white/5 text-white" : "bg-[#c9a55b]/10 text-[#1a1816]",
                      i > 0 && "text-center",
                      i === highlighted && (t.onDark ? "!bg-white/15" : "!bg-[#c9a55b]/20"),
                    )}
                  >
                    {i === highlighted && label && (
                      <span className="mb-2 block w-max mx-auto bg-[#c9a55b] px-2.5 py-1 text-[10px] tracking-[0.25em] text-white">
                        {label}
                      </span>
                    )}
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr
                  key={r}
                  className={cn(
                    "border-b last:border-b-0",
                    t.border,
                    r % 2 === 1 && (t.onDark ? "bg-white/[0.03]" : "bg-[#faf7f2]"),
                  )}
                >
                  {row.map((value, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className={cn("px-4 py-3 align-top font-semibold", t.heading)}>
                        {value}
                      </th>
                    ) : (
                      <td key={i} className={cn("px-4 py-3 align-top text-center leading-relaxed", t.body, highlight(i))}>
                        <span className="inline-flex items-center justify-center">
                          <CellValue value={value} onDark={t.onDark} />
                        </span>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.note && <p className={cn("mt-4 text-sm leading-relaxed", t.body)}>{data.note}</p>}
      </div>
    </CmsSection>
  );
}
