import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export type DateFilterPreset = "all" | "today" | "week" | "month" | "custom";

export type DateRange = {
  from: Date | null;
  to: Date | null;
};

export function toDateInputValue(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function getRangeForPreset(
  preset: DateFilterPreset,
  customFrom?: string,
  customTo?: string,
): DateRange {
  const now = new Date();

  switch (preset) {
    case "today":
      return { from: startOfDay(now), to: endOfDay(now) };
    case "week":
      return {
        from: startOfWeek(now, { weekStartsOn: 1 }),
        to: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case "month":
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case "custom": {
      if (!customFrom?.trim() || !customTo?.trim()) return { from: null, to: null };
      const fromRaw = startOfDay(parseISO(customFrom));
      const toRaw = endOfDay(parseISO(customTo));
      return fromRaw <= toRaw ? { from: fromRaw, to: toRaw } : { from: toRaw, to: fromRaw };
    }
    default:
      return { from: null, to: null };
  }
}

export function inquiryInRange(createdAt: string | null, range: DateRange) {
  if (!range.from || !range.to) return true;
  if (!createdAt) return false;
  const date = parseISO(createdAt);
  return isWithinInterval(date, { start: range.from, end: range.to });
}

export function formatRangeLabel(range: DateRange) {
  if (!range.from || !range.to) return "All time";
  return `${format(range.from, "dd MMM yyyy")} – ${format(range.to, "dd MMM yyyy")}`;
}

export function defaultExportRange(range: DateRange) {
  if (range.from && range.to) {
    return {
      from: toDateInputValue(range.from),
      to: toDateInputValue(range.to),
    };
  }
  const now = new Date();
  return {
    from: toDateInputValue(startOfMonth(now)),
    to: toDateInputValue(now),
  };
}
