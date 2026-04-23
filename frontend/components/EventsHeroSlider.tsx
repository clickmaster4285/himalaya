"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface EventsHeroSliderProps {
  alt: string;
  priority?: boolean;
  className?: string;
}

const eventImages = [
  "/assets/event-hero-1.png",
  "/assets/event-hero-2.png",
  "/assets/event-hero-3.png",
  "/assets/event-hero-4.png",
];

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
          alt={alt}
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
