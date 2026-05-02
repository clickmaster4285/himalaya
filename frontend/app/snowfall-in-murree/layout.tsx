import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snowfall in Murree 2025 — When It Snows, What to Expect & Luxury Winter Stays | Himalaya Villas",
  description: "Complete guide to snowfall in Murree — monthly snowfall calendar, weather forecast, snowfall pics from Bhurban, and when to book a luxury winter villa stay. Updated for 2025 season.",
  keywords: "snowfall in Murree, snowfall Murree, snowfall weather forecast, snowfall expected in Murree, snowfall pics, snow in Bhurban, Murree snowfall season, when does it snow in Murree, Murree winter, snowfall update Murree, Murree snow today",
  openGraph: {
    title: "Snowfall in Murree — Experience It from a Luxury Private Villa at Bhurban",
    description: "When does it snow in Murree? Full snowfall guide with calendar, forecast links, photos — and how to book the most exclusive snow experience in the Murree Hills.",
    type: "website",
    url: "https://himalayavillas.com/snowfall-in-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/snowfall-in-murree",
  },
};

export default function SnowfallInMurreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
