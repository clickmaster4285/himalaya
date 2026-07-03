// app/experience/page.tsx
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import Image from "next/image";
import Link from "next/link";
import ExperienceClient from "./ExperienceClient";

// Metadata for the page
export const metadata: Metadata = createPageMetadata({
  title: "Luxury Experiences in Bhurban, Murree—Himalaya Villas ",
  description:
    "Discover premium experiences at our Bhurban estate. Explore unique experiences at Himalaya Villas, Bhurban. Perfect for families & couples.",
  path: "/experience",
  keywords: [
    "things to do in Bhurban Murree",
    "Bhurban travel experiences",
    "Murree activities guide",
    "luxury mountain getaway Pakistan",
  ],
  ogImage: "/assets/why-villa-view.jpg",
});

// Images data that can be shared
export const images = {
  dawn: "@/public/assets/experience-dawn.jpg",
  arrival: "@/public/assets/experience-arrival.jpg",
  hearth: "@/public/assets/experience-hearth.jpg",
  morning: "@/public/assets/experience-morning.jpg",
  night: "@/public/assets/experience-night.jpg",
  night2: "@/public/assets/experience4.jpg",
};

// Chapter data
export const chapters = [
  {
    n: "I",
    eyebrow: "Chapter One · The Arrival",
    title: "The road quiets, the deodars begin",
    body:
      "You leave the highway behind. The air thins, cools, sharpens with pine. The last bend reveals lantern light through the trees — and the villa, waiting. Your tires crunch on gravel. A dog barks once, then remembers itself. The smell of woodsmoke and wet earth rises to meet you. The world contracts to this narrow mountain road, to the warm glow ahead, to the promise that something unsaid has been waiting here all along.",
    image: "@/public/assets/experience-arrival.jpg",
  },
  {
    n: "II",
    eyebrow: "Chapter Two · The Hearth",
    title: "Tea by the fire, the valley below",
    body:
      "The door closes behind you and the mountain hush takes over. A fire is already lit — logs split and stacked, flames catching without haste. Cardamom tea arrives without asking, steam curling into the older air. Your hands warm around the cup. Outside, the pines lean in closer as darkness settles. The silence here is not empty; it's full of the small sounds of the house settling, the fire breathing, the valley breathing below. This is the kind of quiet that feels like permission.",
    image: "@/public/assets/experience4.jpg",
  },
  {
    n: "III",
    eyebrow: "Chapter Three · The Morning",
    title: "Breakfast above the clouds",
    body:
      "Mist sits in the valley like a second floor, thick and moving slowly. You eat warm paratha on the balcony — soft, still steaming, dusted with salt — while the sun works to lift the haze. Below, the mist parts like a curtain, revealing the slope of land, the small cluster of roofs, the temple on the ridge. And nothing — for a long, long while — needs your attention. No phone signal. No news. No one is looking for you. The butter is warm. The tea is hot. The morning is yours and asks nothing in return.",
    image: "@/public/assets/experience-morning.jpg",
  },
  {
    n: "IV",
    eyebrow: "Chapter Four · The Night",
    title: "More stars than you remember",
    body:
      "By eleven, the village has gone dark. The last lights have surrendered. The sky has not. Step onto the terrace and the Milky Way is there, casually, the way it has always been — spilled across the black like salt, like memory, like home. You stand long enough to forget why you were standing. The stars don't move. Your breathing slows. Somewhere far below, a stream sounds like it's saying your name. The night here is not lonely. It is full of light — the kind that asks you to stay very still and simply witness.",
    image: "@/public/assets/experience-night.jpg",
  },
];

export default function ExperiencePage() {
  return <ExperienceClient chapters={chapters} />;
}