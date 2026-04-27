'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll indicator when user scrolls down
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    // Scroll to the next section (approximately one screen height)
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-fade-up-delay-3">
      <button
        onClick={scrollToNext}
        className="group flex flex-col items-center text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Scroll to next section"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll
        </span>
        <div className="relative">
          <div className="w-10 h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
            <ChevronDown 
              className="h-5 w-5 animate-bounce text-white/90 group-hover:text-white transition-colors duration-300" 
              strokeWidth={2}
            />
          </div>
          {/* Animated dot */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;
