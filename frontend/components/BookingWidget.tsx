"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildWhatsAppAvailabilityUrl } from "@/lib/whatsapp";

const BookingWidget = () => {
  // ✅ SINGLE RANGE STATE (correct way for react-calendar)
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [guests, setGuests] = useState("2");

  const checkIn = dateRange?.[0] || null;
  const checkOut = dateRange?.[1] || null;

  // ✅ Proper range handler
  const handleDateChange = (value: any) => {
    if (Array.isArray(value)) {
      setDateRange([value[0], value[1]]);
    } else {
      setDateRange([value, value]);
    }
  };

  return (
    <div className="booking-widget flex w-full min-w-0 max-w-2xl flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-2xl sm:flex-row sm:items-stretch">

      {/* DATE PICKER */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30 sm:px-5 sm:py-4"
          >
            <CalendarIcon className="h-5 w-5 shrink-0 text-muted-foreground" />

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                Check in – Check out
              </p>

              <p className="mt-0.5 text-xs font-medium sm:text-sm">
                {checkIn && checkOut
                  ? `${format(checkIn, "MMM d")} – ${format(checkOut, "MMM d")}`
                  : checkIn
                  ? `${format(checkIn, "MMM d")} – Select`
                  : "Select dates"}
              </p>
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3" align="start">
          <Calendar
            selectRange={true}
            onChange={handleDateChange}
            value={dateRange as any}
            minDate={new Date()}
            className="booking-calendar"
          />
        </PopoverContent>
      </Popover>

      {/* DIVIDER */}
      <div className="mx-auto hidden h-12 w-px self-center sm:block" />
      <div className="mx-auto h-px w-[90%] sm:hidden" />

      {/* GUESTS */}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <Users className="h-5 w-5 shrink-0 text-muted-foreground" />

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
            Guests
          </p>

          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-xs font-medium shadow-none focus:ring-0 sm:text-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">1 Adult</SelectItem>
              <SelectItem value="2">2 Adults</SelectItem>
              <SelectItem value="3">3 Adults</SelectItem>
              <SelectItem value="4">4 Adults</SelectItem>
              <SelectItem value="5">5+ Adults</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CTA */}
      <div className="flex w-full shrink-0 p-2 sm:max-w-[12.5rem] sm:flex-none">
        <a
         href={buildWhatsAppAvailabilityUrl(
  checkIn ?? undefined,
  checkOut ?? undefined,
  guests
)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-lg bg-neutral-950 px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-neutral-900 sm:text-[11px]"
        >
          Check availability
        </a>
      </div>
    </div>
  );
};

export default BookingWidget;