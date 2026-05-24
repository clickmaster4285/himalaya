"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { EVENTS_HERO_SLIDES } from "@/lib/events/event-images";

interface EventsHeroSliderProps {
  alt: string;
  priority?: boolean;
  className?: string;
}

const eventImages = [...EVENTS_HERO_SLIDES];

const EVENTS_HERO_ALTS: Record<string, string> = {
  "/assets/hero-bhurban-static.png": "Himalaya Villas estate in Bhurban Murree",
  "/assets/murree-mountain-hero.jpg": "Murree Hills panorama from Bhurban",
  "/assets/blog-bhurban-forest-nature-walk.png": "Forest nature walk near Himalaya Villas",
  "/assets/gallery-exterior.jpg": "Luxury villa exterior at Himalaya Villas",
  "/assets/villa-honeymoon-real.jpg": "Romantic honeymoon villa in Murree Hills",
  "/assets/wedding8.jpg": "Destination wedding venue at Himalaya Villas",
  "/assets/journal-bonfire.jpg": "Evening bonfire at Himalaya Villas Bhurban",
};

export default function EventsHeroSlider({ alt, priority = false, className = "" }: EventsHeroSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {eventImages.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={EVENTS_HERO_ALTS[image] ?? alt}
          fill
          priority={priority && index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        />
      ))}
    </div>
  );
}
