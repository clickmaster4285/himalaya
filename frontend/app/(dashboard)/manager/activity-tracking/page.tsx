// app/activities/page.tsx  (or wherever your route is)
import { cookies } from "next/headers";
import { getBackendInternalUrl } from "@/lib/api/backend-url";
import ActivitiesClient from "./ActivitiesClient";

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

interface ActivityResponse {
  ok: boolean;
  data: Activity[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

async function getActivities(): Promise<ActivityResponse | null> {
  try {
    const cookieStore = await cookies();
    const url = `${getBackendInternalUrl()}/api/activity/get-all`;

    const res = await fetch(url, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch activities:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching activities:", error);
    return null;
  }
}

export default async function ActivitiesPage() {
  const activitiesData = await getActivities();

  if (!activitiesData || !activitiesData.ok) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 font-sans text-[14px] text-rose-800">
          Failed to load activities. Please try again later.
        </div>
      </div>
    );
  }

  const activities = activitiesData.data || [];

  return <ActivitiesClient activities={activities} />;
}