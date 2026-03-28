"use client";

import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

const weekdayShort = ["su", "mo", "tu", "we", "th", "fr", "sa"];

export const defaultLuxuryRange: DateRange = {
  from: new Date(2026, 2, 28),
  to: new Date(2026, 2, 31),
};

export const defaultWeddingRange = defaultLuxuryRange;
export const defaultDiningRange = defaultLuxuryRange;

/** Default selected day for Event booking (single-date picker). */
export const defaultEventDate = new Date(2026, 2, 30);

function formatRangeLabel(range: DateRange | undefined) {
  if (!range?.from) return "Mar 28 – Mar 31, 2026";
  if (!range.to) {
    return range.from.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }
  const a = range.from.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const b = range.to.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  return `${a} – ${b}`;
}

export function formatRangeLong(range: DateRange | undefined) {
  if (!range?.from) return "Saturday, March 28 – Tuesday, March 31, 2026";
  if (!range.to) {
    return range.from.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  const fromS = range.from.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const toS = range.to.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return `${fromS} – ${toS}`;
}

export { formatRangeLabel };

type Props = {
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  defaultMonth?: Date;
};

const dualMonthNavHide =
  "[&>div:first-child_.nav_button_next]:hidden [&>div:last-child_.nav_button_previous]:hidden " +
  "[&>div:first-child_.button_next]:hidden [&>div:last-child_.button_previous]:hidden";

type SingleProps = {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  defaultMonth?: Date;
};

/** Dual-month calendar with single-day selection (black square), matching Event booking mocks. */
export function LuxurySingleDateCalendar({ date, onDateChange, defaultMonth }: SingleProps) {
  return (
    <div className="border border-[#e8e4dc] bg-[#F9F6F1] px-3 py-6 md:px-6 md:py-8">
      <Calendar
        mode="single"
        numberOfMonths={2}
        selected={date}
        onSelect={onDateChange}
        defaultMonth={defaultMonth ?? date}
        weekStartsOn={0}
        showOutsideDays
        formatters={{
          formatWeekdayName: (d) => weekdayShort[d.getDay()] ?? "",
        }}
        className="w-full !p-0"
        classNames={{
          months: "flex flex-col md:flex-row md:justify-center md:gap-10 lg:gap-16 gap-10 " + dualMonthNavHide,
          month: "space-y-3 w-full",
          caption: "flex justify-center pt-1 relative items-center mb-2",
          caption_label:
            "font-display text-[13px] md:text-[14px] font-normal tracking-wide text-neutral-900",
          nav: "flex items-center gap-1",
          nav_button:
            "inline-flex h-8 w-8 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-neutral-800 opacity-80 hover:opacity-100",
          nav_button_previous: "absolute left-0 top-1",
          nav_button_next: "absolute right-0 top-1",
          table: "w-full border-collapse",
          head_row: "flex w-full justify-between mt-1",
          head_cell:
            "text-neutral-900 font-normal w-9 text-center text-[10px] tracking-wide lowercase font-display",
          row: "flex w-full mt-1 justify-between",
          cell: "relative h-9 w-9 p-0 text-center text-[12px] font-display focus-within:relative focus-within:z-20",
          day: [
            "h-9 w-9 p-0 font-normal text-neutral-900 rounded-none border-0 bg-transparent",
            "hover:bg-neutral-900 hover:text-white",
            "aria-selected:opacity-100",
          ].join(" "),
          day_selected:
            "!bg-black !text-white !rounded-none hover:!bg-black hover:!text-white focus:!bg-black focus:!text-white",
          day_outside: "day-outside text-neutral-400/70 opacity-80",
          day_disabled: "text-neutral-300 opacity-40",
          day_today: "bg-transparent text-neutral-900 font-medium",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
}

export default function LuxuryBookingCalendar({ range, onRangeChange, defaultMonth }: Props) {
  return (
    <div className="border border-[#e8e4dc] bg-[#F9F6F1] px-3 py-6 md:px-6 md:py-8">
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={onRangeChange}
        defaultMonth={defaultMonth ?? range?.from}
        weekStartsOn={0}
        showOutsideDays
        formatters={{
          formatWeekdayName: (date) => weekdayShort[date.getDay()] ?? "",
        }}
        className="w-full !p-0"
        classNames={{
          months: "flex flex-col md:flex-row md:justify-center md:gap-10 lg:gap-16 gap-10 " + dualMonthNavHide,
          month: "space-y-3 w-full",
          caption: "flex justify-center pt-1 relative items-center mb-2",
          caption_label:
            "font-display text-[13px] md:text-[14px] font-normal tracking-wide text-neutral-900",
          nav: "flex items-center gap-1",
          nav_button:
            "inline-flex h-8 w-8 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-neutral-800 opacity-80 hover:opacity-100",
          nav_button_previous: "absolute left-0 top-1",
          nav_button_next: "absolute right-0 top-1",
          table: "w-full border-collapse",
          head_row: "flex w-full justify-between mt-1",
          head_cell:
            "text-neutral-900 font-normal w-9 text-center text-[10px] tracking-wide lowercase font-display",
          row: "flex w-full mt-1 justify-between",
          cell: [
            "relative h-9 w-9 p-0 text-center text-[12px] font-display",
            "[&:has([aria-selected].day-range-end)]:rounded-r-full",
            "[&:has([aria-selected].day-range-start)]:rounded-l-full",
            "[&:has([aria-selected])]:bg-black",
            "first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full",
            "focus-within:relative focus-within:z-20",
          ].join(" "),
          day: [
            "h-9 w-9 p-0 font-normal text-neutral-900 rounded-none border-0 bg-transparent",
            "hover:bg-neutral-900 hover:text-white",
            "aria-selected:opacity-100",
          ].join(" "),
          day_selected:
            "!bg-black !text-white hover:!bg-black hover:!text-white focus:!bg-black focus:!text-white",
          day_range_start:
            "!bg-black !text-white day-range-start !rounded-l-full !rounded-r-none",
          day_range_end: "!bg-black !text-white day-range-end !rounded-r-full !rounded-l-none",
          day_range_middle:
            "!bg-black !text-white !rounded-none aria-selected:!bg-black aria-selected:!text-white",
          day_outside:
            "day-outside text-neutral-400/70 opacity-80 aria-selected:not([data-selected-single]):bg-neutral-300 aria-selected:text-white",
          day_disabled: "text-neutral-300 opacity-40",
          day_today: "bg-transparent text-neutral-900 font-medium",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
}
