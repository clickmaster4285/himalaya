import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adventure Games Murree | Mountain Activities | Himalaya Villas Bhurban",
  description: "Adventure games and mountain activities in Murree at Himalaya Villas Bhurban. Enjoy thrilling outdoor adventures, guided hikes, zip-lining, rock climbing, and nature experiences for all ages. Book your adventure today!",
  keywords: "adventure games Murree, mountain activities Bhurban, outdoor adventures Murree Hills, Himalaya Villas adventure activities, zip-lining Murree, rock climbing Bhurban, hiking trails Murree, nature activities Pakistan",
  openGraph: {
    title: "Adventure Games Murree - Mountain Activities at Himalaya Villas",
    description: "Experience thrilling mountain adventures in Murree with guided activities, zip-lining, rock climbing, and nature experiences at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/adventure-games",
  },
  alternates: {
    canonical: "https://himalayavillas.com/adventure-games",
  },
};

export default function AdventureGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
