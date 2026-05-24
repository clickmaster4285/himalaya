import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import MurreeWeatherPage from "@/app/murree-weather/page";

export const metadata: Metadata = createPageMetadata({
  title: "Murree Weather Forecast | Seasonal Guide & Best Time to Visit",
  description:
    "Murree weather forecast and seasonal guide — current conditions, snowfall windows, summer travel tips, and the best months to stay at Himalaya Villas Bhurban.",
  path: "/weather-forecast",
  keywords: [
    "Murree weather forecast",
    "weather forecast Murree",
    "Bhurban weather",
    "Murree snowfall forecast",
    "best time to visit Murree",
    "Murree temperature today",
  ],
  ogImage: "/assets/murree-mountain-hero.jpg",
});

/** Legacy URL from the previous site — same guide as /murree-weather. */
export default MurreeWeatherPage;
