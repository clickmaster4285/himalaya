"use client";
import { useState } from "react";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [calendarMode, setCalendarMode] = useState<"checkin" | "checkout">("checkin");

  const handleDateSelect = (date: Date | undefined) => {
    if (calendarMode === "checkin") {
      setCheckIn(date);
      setCalendarMode("checkout");
    } else {
      setCheckOut(date);
    }
  };

  return (
    <div className="booking-widget flex w-full min-w-0 max-w-2xl flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-2xl sm:flex-row sm:items-stretch">
      {/* Date picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30 sm:min-w-0 sm:px-5 sm:py-4"
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
        <PopoverContent className="w-auto p-0" align="start">
          <div className="border-b p-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCalendarMode("checkin")}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  calendarMode === "checkin"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Check in {checkIn && `· ${format(checkIn, "MMM d")}`}
              </button>
              <button
                type="button"
                onClick={() => setCalendarMode("checkout")}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  calendarMode === "checkout"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Check out {checkOut && `· ${format(checkOut, "MMM d")}`}
              </button>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={calendarMode === "checkin" ? checkIn : checkOut}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (date < today) return true;
              if (calendarMode === "checkout" && checkIn && date <= checkIn) return true;
              return false;
            }}
            initialFocus
            className="pointer-events-auto p-3"
          />
        </PopoverContent>
      </Popover>

      <div className="booking-divider mx-auto hidden h-12 w-px self-center sm:block" />
      <div className="booking-divider mx-auto h-px w-[90%] sm:hidden" />

      {/* Guests */}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:min-w-0 sm:px-5 sm:py-4">
        <Users className="h-5 w-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">Guests</p>
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

      <div className="booking-divider mx-auto hidden h-12 w-px shrink-0 self-center sm:block" />
      <div className="booking-divider mx-auto h-px w-[90%] sm:hidden" />

      {/* Inset CTA so it never bleeds past rounded corners; flex min-w-0 prevents horizontal overflow */}
      <div className="box-border flex w-full min-w-0 shrink-0 p-2 sm:w-auto sm:max-w-[min(100%,12.5rem)] sm:flex-none sm:self-stretch sm:p-2">
        <a
          href={buildWhatsAppBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 w-full max-w-full items-center justify-center rounded-lg bg-neutral-950 px-2 py-2.5 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-white transition-colors hover:bg-neutral-900 sm:h-full sm:min-h-0 sm:flex-1 sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.16em]"
        >
          Check availability
        </a>
      </div>
    </div>
  );
};

export default BookingWidget;
