import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import { formatRangeLabel, type DateRange } from "@/lib/inquiries/inquiry-date-filters";

export type InquiryExportRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  numberOfGuests: string | null;
  message: string | null;
  source: string | null;
  createdAt: string | null;
};

const LOGO_PATH = "/assets/himalaya-logo.png";
const BRAND = "Himalaya Villas & Resorts";
const TABLE_HEAD = ["#", "Date", "Name", "Email", "Phone", "Source", "Check-in", "Check-out", "Guests", "Message"];

function formatSource(source: string | null) {
  if (!source) return "Website";
  return source
    .split(/[-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  return format(parseISO(iso), "dd MMM yyyy, h:mm a");
}

function truncate(text: string | null, max = 120) {
  if (!text) return "—";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

function fileSuffix(from: string, to: string) {
  return `${from}_to_${to}`.replace(/[^\d_a-z-]/gi, "");
}

async function loadLogoBytes(): Promise<Uint8Array | null> {
  try {
    const res = await fetch(LOGO_PATH);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function loadLogoDataUrl(): Promise<string | null> {
  const bytes = await loadLogoBytes();
  if (!bytes) return null;
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
  return `data:image/png;base64,${btoa(binary)}`;
}

function filterRowsForExport(rows: InquiryExportRow[], exportFrom: string, exportTo: string) {
  const from = startOfDay(parseISO(exportFrom));
  const to = endOfDay(parseISO(exportTo));
  const range: DateRange = from <= to ? { from, to } : { from: to, to: from };

  return rows.filter((row) => {
    if (!row.createdAt) return false;
    const date = parseISO(row.createdAt);
    return date >= range.from! && date <= range.to!;
  });
}

function rowToCells(row: InquiryExportRow, index: number, messageLimit: number) {
  return [
    String(index + 1),
    formatWhen(row.createdAt),
    row.fullName,
    row.email,
    row.phone ?? "—",
    formatSource(row.source),
    row.checkInDate ?? "—",
    row.checkOutDate ?? "—",
    row.numberOfGuests ?? "—",
    truncate(row.message, messageLimit),
  ];
}

export async function exportInquiriesPdf(
  rows: InquiryExportRow[],
  exportFrom: string,
  exportTo: string,
) {
  const filtered = filterRowsForExport(rows, exportFrom, exportTo);
  const range: DateRange = {
    from: startOfDay(parseISO(exportFrom)),
    to: endOfDay(parseISO(exportTo)),
  };
  const rangeLabel = formatRangeLabel(range);
  const generatedAt = format(new Date(), "dd MMM yyyy, h:mm a");

  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const logo = await loadLogoDataUrl();

  if (logo) {
    pdf.addImage(logo, "PNG", 14, 10, 42, 16);
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(26, 24, 22);
  pdf.text("Inquiries Report", logo ? 62 : 14, 18);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(90, 86, 76);
  pdf.text(BRAND, logo ? 62 : 14, 24);
  pdf.text(`Period: ${rangeLabel}`, logo ? 62 : 14, 29);
  pdf.text(`Generated: ${generatedAt}`, logo ? 62 : 14, 34);
  pdf.text(`Total inquiries: ${filtered.length}`, logo ? 62 : 14, 39);

  autoTable(pdf, {
    startY: 46,
    head: [TABLE_HEAD],
    body: filtered.map((row, index) => rowToCells(row, index, 180)),
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: {
      fillColor: [122, 97, 41],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [250, 248, 245] },
    columnStyles: {
      0: { cellWidth: 8 },
      9: { cellWidth: 48 },
    },
    margin: { left: 14, right: 14 },
  });

  pdf.save(`himalaya-inquiries-report-${fileSuffix(exportFrom, exportTo)}.pdf`);
}

export async function exportInquiriesWord(
  rows: InquiryExportRow[],
  exportFrom: string,
  exportTo: string,
) {
  const filtered = filterRowsForExport(rows, exportFrom, exportTo);
  const range: DateRange = {
    from: startOfDay(parseISO(exportFrom)),
    to: endOfDay(parseISO(exportTo)),
  };
  const rangeLabel = formatRangeLabel(range);
  const generatedAt = format(new Date(), "dd MMM yyyy, h:mm a");
  const logoBytes = await loadLogoBytes();

  const headerChildren: Paragraph[] = [];

  if (logoBytes) {
    headerChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: logoBytes,
            transformation: { width: 180, height: 68 },
            type: "png",
          }),
        ],
      }),
    );
  }

  headerChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: "Inquiries Report", bold: true, size: 40, color: "1A1816" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: BRAND, size: 22, color: "7A6129" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Period: ${rangeLabel}`, size: 20, color: "5C564C" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Generated: ${generatedAt}  •  Total inquiries: ${filtered.length}`,
          size: 18,
          color: "6B655C",
        }),
      ],
    }),
    new Paragraph({ text: "" }),
  );

  const headerRow = new TableRow({
    children: TABLE_HEAD.map(
      (label) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: label, bold: true, color: "FFFFFF", size: 18 })],
            }),
          ],
          shading: { fill: "7A6129" },
        }),
    ),
  });

  const bodyRows = filtered.map((row, index) =>
    new TableRow({
      children: rowToCells(row, index, 500).map(
        (text) =>
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text, size: 16 })] })],
          }),
      ),
    }),
  );

  const doc = new Document({
    sections: [
      {
        children: [
          ...headerChildren,
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...bodyRows],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = globalThis.document.createElement("a");
  link.href = url;
  link.download = `himalaya-inquiries-report-${fileSuffix(exportFrom, exportTo)}.docx`;
  link.click();
  URL.revokeObjectURL(url);
}
