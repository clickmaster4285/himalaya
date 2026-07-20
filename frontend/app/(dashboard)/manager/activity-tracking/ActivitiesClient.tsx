// app/activities/ActivitiesClient.tsx
"use client";

import { useState, useMemo } from "react";
import { Eye, MousePointer, Search, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Activity {
  _id: string;
  userId: string | null;
  sessionId: string;
  eventType: string;
  page: string | null;
  elementId: string | null;
  elementText: string | null;
  metadata: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ITEMS_PER_PAGE = 10;

const EVENT_TYPE_LABELS: Record<string, string> = {
  link_click: "Link Click",
  experience_reserve_stay_click: "Experience Reserve",
  plan_event_click: "Plan Event",
  book_stay_click: "Book Stay",
  blog_book_stay_click: "Blog Book Stay",
};

const EVENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  link_click: <MousePointer className="h-3.5 w-3.5" />,
  experience_reserve_stay_click: <Eye className="h-3.5 w-3.5" />,
  plan_event_click: <Eye className="h-3.5 w-3.5" />,
  book_stay_click: <Eye className="h-3.5 w-3.5" />,
  blog_book_stay_click: <Eye className="h-3.5 w-3.5" />,
};

function getEventTypeBadgeClass(eventType: string): string {
  const colors: Record<string, string> = {
    link_click: "bg-sky-100 text-sky-800",
    experience_reserve_stay_click: "bg-violet-100 text-violet-800",
    plan_event_click: "bg-emerald-100 text-emerald-800",
    book_stay_click: "bg-amber-100 text-amber-800",
    blog_book_stay_click: "bg-indigo-100 text-indigo-800",
  };
  return colors[eventType] || "bg-stone-100 text-stone-800";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function formatEventType(eventType: string): string {
  return EVENT_TYPE_LABELS[eventType] || eventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}


 function formatPage(page: string | null): string {
   if (!page || page === '/') return 'Landing Page';
   if (page === '/events') return 'Events Page';
   if (page === '/blogs') return 'Blog Page';
    if (page === '/contact') return 'Contact Page';
    if (page === '/virtual-tour') return 'Virtual Tour Page';
   if (page === '/villas') return 'Villa Page';


   if (page.startsWith("/villas/")) return "Villa Detail Page";

   return page.split('/').filter(Boolean).join(' / ') || page;
 }


// function formatPage(page: string | null): string {
//   if (!page) return '—';
  
//   if (page === '/' || page === '') {
//     return 'Landing Page';
//   }

//   return page.split('/').filter(Boolean).join(' / ') || page;
// }



function getSessionDisplay(sessionId: string): string {
  return sessionId.slice(0, 8) + '...' + sessionId.slice(-4);
}

// ==================== DEDUPLICATION ====================
function deduplicateActivities(activities: Activity[]): Activity[] {
  const seen = new Map<string, boolean>();

  return activities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // newest first
    .filter((activity) => {
      // Key based on actual data (not time)
      const key = [
        activity.sessionId,
        activity.eventType,
        activity.page,
        activity.elementId,
        activity.elementText,
      ].join('|');

      if (seen.has(key)) {
        return false; // duplicate → skip
      }

      seen.set(key, true);
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // final sort
}


export default function ActivitiesClient({ activities }: { activities: Activity[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "tomorrow" | "week" | "custom">("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // Deduplicate first
  const deduplicated = useMemo(() => deduplicateActivities(activities), [activities]);

const timeFilters = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Last 7 Days", value: "week" },
  { label: "Custom", value: "custom" },
] as const;


  
  // Then filter (search + time)
  const filteredActivities = useMemo(() => {
    let result = [...deduplicated];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter((a) =>
        a.eventType.toLowerCase().includes(term) ||
        (a.page && a.page.toLowerCase().includes(term)) ||
        (a.elementText && a.elementText.toLowerCase().includes(term)) ||
        (a.elementId && a.elementId.toLowerCase().includes(term)) ||
        a.sessionId.toLowerCase().includes(term) ||
        (a.ipAddress && a.ipAddress.includes(term))
      );
    }

    // Time filter logic (keep your existing time filter code here)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (timeFilter === "today") {
      result = result.filter((a) => {
        const d = new Date(a.createdAt);
        return d.getFullYear() === today.getFullYear() && 
               d.getMonth() === today.getMonth() && 
               d.getDate() === today.getDate();
      });
    } else if (timeFilter === "tomorrow") {
      result = result.filter((a) => {
        const d = new Date(a.createdAt);
        return d.getFullYear() === tomorrow.getFullYear() && 
               d.getMonth() === tomorrow.getMonth() && 
               d.getDate() === tomorrow.getDate();
      });
    } else if (timeFilter === "week") {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      result = result.filter((a) => new Date(a.createdAt) >= oneWeekAgo);
    } else if (timeFilter === "custom" && customFrom && customTo) {
      const from = new Date(customFrom);
      const to = new Date(customTo);
      to.setHours(23, 59, 59);
      result = result.filter((a) => {
        const d = new Date(a.createdAt);
        return d >= from && d <= to;
      });
    }

    return result;
  }, [deduplicated, searchTerm, timeFilter, customFrom, customTo]);



  const totalEvents = filteredActivities.length;
  const totalPages = Math.ceil(totalEvents / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetPagination = () => setCurrentPage(1);

  // Stats (based on original data)
  const uniqueSessions = new Set(activities.map(a => a.sessionId)).size;
  const uniqueEventTypes = new Set(activities.map(a => a.eventType)).size;

  const eventTypeCounts = activities.reduce((acc, activity) => {
    acc[activity.eventType] = (acc[activity.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topEvents = Object.entries(eventTypeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2);

  return (
    <div className="mx-auto space-y-8">
      {/* Header + Filters (same as previous version) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a]">Analytics</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2rem]">Activity Tracker</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9a7b3a]" />
            <Input
              placeholder="Search events, pages, elements..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); resetPagination(); }}
              className="pl-10 border-[#ebe4dc]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {timeFilters.map((f) => (
              <Button
                key={f.value}
                variant={timeFilter === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => { setTimeFilter(f.value ); resetPagination(); }}
                className={timeFilter === f.value ? "bg-[#9a7b3a] text-white" : ""}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {timeFilter === "custom" && (
          <div className="flex gap-4 items-end bg-[#faf8f5] p-4 rounded-xl border border-[#ebe4dc]">
            <div>
              <label className="text-xs text-[#7a6f62]">From</label>
              <Input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-[#7a6f62]">To</label>
              <Input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Total Events" value={totalEvents} tone="default" />
        <DashboardStatCard label="Unique Sessions" value={uniqueSessions} tone="amber" />
        <DashboardStatCard label="Event Types" value={uniqueEventTypes} tone="emerald" />
        {/* Top Events Card */}
        <div className="rounded-2xl border border-[#e5dcc8] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#7a6f62]">Top Events</p>
          </div>
          {topEvents.map(([name, count]) => (
            <div key={name} className="flex justify-between text-sm py-1">
              <span>{formatEventType(name)}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#ebe4dc] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#ebe4dc]">
            <thead className="bg-[#faf8f5]">
              <tr>
                <th className="px-5 py-3.5 text-left font-sans text-[11px] font-bold uppercase tracking-widest text-[#7a6f62]">Event Type</th>
                <th className="px-5 py-3.5 text-left font-sans text-[11px] font-bold uppercase tracking-widest text-[#7a6f62]">Page</th>
                <th className="px-5 py-3.5 text-left font-sans text-[11px] font-bold uppercase tracking-widest text-[#7a6f62]">Element</th>
                <th className="px-5 py-3.5 text-left font-sans text-[11px] font-bold uppercase tracking-widest text-[#7a6f62]">Session</th>
                <th className="px-5 py-3.5 text-left font-sans text-[11px] font-bold uppercase tracking-widest text-[#7a6f62]">Time</th>
                <th className="px-5 py-3.5 text-left font-sans text-[11px] font-bold uppercase tracking-widest text-[#7a6f62]">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ebe3]">
              {paginatedActivities.map((activity) => (
                <tr key={activity._id} className="hover:bg-[#faf8f5]/50">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[#9a7b3a]">
                        {EVENT_TYPE_ICONS[activity.eventType] || <MousePointer className="h-3.5 w-3.5" />}
                      </span>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", getEventTypeBadgeClass(activity.eventType))}>
                        {formatEventType(activity.eventType)}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-sans text-[13px] text-[#3d3830]">
                    {formatPage(activity.page)}
                  </td>
                  <td className="px-5 py-3.5 max-w-xs truncate font-sans text-[13px] text-[#3d3830]">
                    {activity.elementText || activity.elementId || '-'}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="rounded bg-[#f3eee4] px-2 py-0.5 font-mono text-[11px] text-[#5c564c]">
                      {getSessionDisplay(activity.sessionId)}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-sans text-[13px] text-[#5c564c]">
                    {formatDate(activity.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-sans text-[13px] text-[#5c564c]">
                    {activity.ipAddress || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedActivities.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-xl text-[#3d3830]">No activities found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#f0ebe3] bg-[#faf8f5] px-6 py-4">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            <div>Page {currentPage} of {totalPages}</div>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}