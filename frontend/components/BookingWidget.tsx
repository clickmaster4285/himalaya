'use client';

import { useState } from "react";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="booking-widget flex flex-col sm:flex-row items-stretch sm:items-center rounded-sm shadow-2xl w-full max-w-2xl bg-white">
      {/* Date picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 sm:min-w-[240px] text-left hover:bg-muted/30 transition-colors">
            <CalendarIcon className="h-5 w-5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-muted-foreground">
                Check In - Check Out
              </p>
              <p className="text-xs sm:text-sm font-medium mt-0.5">
                {checkIn && checkOut
                  ? `${format(checkIn, "MMM d")} - ${format(checkOut, "MMM d")}`
                  : checkIn
                  ? `${format(checkIn, "MMM d")} - Select`
                  : "Select Dates"}
              </p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex gap-2">
              <button
                onClick={() => setCalendarMode("checkin")}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  calendarMode === "checkin"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Check In {checkIn && `· ${format(checkIn, "MMM d")}`}
              </button>
              <button
                onClick={() => setCalendarMode("checkout")}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  calendarMode === "checkout"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Check Out {checkOut && `· ${format(checkOut, "MMM d")}`}
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
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <div className="booking-divider hidden sm:block w-px h-12 self-center" />
      <div className="booking-divider sm:hidden h-px w-[90%] mx-auto" />

      {/* Guest selector */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 sm:min-w-[160px]">
        <Users className="h-5 w-5 text-muted-foreground shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Guests
          </p>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="border-0 p-0 h-auto text-xs sm:text-sm font-medium shadow-none focus:ring-0 bg-transparent">
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
<a
  href="https://wa.me/923045679000"
  target="_blank"
  rel="noopener noreferrer"
  className="ml-10 inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-sm font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5"
>
  {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.43 0 .06 5.37.06 11.98c0 2.11.55 4.17 1.6 6L0 24l6.17-1.62a11.92 11.92 0 005.87 1.5h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.2-3.51-8.42zM12.05 21.7a9.72 9.72 0 01-4.95-1.36l-.36-.21-3.66.96.98-3.57-.23-.37a9.7 9.7 0 01-1.49-5.16c0-5.37 4.37-9.74 9.75-9.74 2.6 0 5.04 1.01 6.87 2.84a9.66 9.66 0 012.84 6.88c-.01 5.38-4.38 9.73-9.75 9.73zm5.34-7.28c-.29-.15-1.72-.85-1.98-.94-.27-.1-.46-.15-.66.15-.19.29-.76.94-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44 0 1.43 1.03 2.82 1.17 3.01.15.19 2.01 3.07 4.87 4.31.68.29 1.21.46 1.63.59.68.21 1.29.18 1.77.11.54-.08 1.72-.7 1.96-1.37.24-.68.24-1.26.17-1.37-.07-.11-.27-.17-.56-.32z"/>
  </svg> */}

  Book Now
</a>
      </div>

    </div>
  );
};

export default BookingWidget;
