import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Hotels Murree Bhurban | Business Meetings | Himalaya Villas",
  description: "Corporate hotels in Murree Bhurban for business meetings, conferences, and corporate retreats. Premium facilities, conference rooms, team building activities at Himalaya Villas. Book your corporate event.",
  keywords: "corporate hotels Murree, business hotels Bhurban, corporate retreats Murree, conference facilities Bhurban, business meetings Murree Hills, team building Pakistan, corporate events Himalaya Villas",
  openGraph: {
    title: "Corporate Hotels Murree Bhurban - Business Meetings at Himalaya Villas",
    description: "Premium corporate hotels in Murree Bhurban with conference facilities, business meeting rooms, and corporate retreat packages at Himalaya Villas.",
    type: "website",
    url: "https://himalayavillas.com/corporate-hotels-murree-bhurban",
  },
  alternates: {
    canonical: "https://himalayavillas.com/corporate-hotels-murree-bhurban",
  },
};

export default function CorporateHotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
