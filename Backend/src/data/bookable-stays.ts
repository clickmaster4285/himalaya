// Keep these server-verified rates synchronized with frontend/content/villas/villa-content.tsx.
export const BOOKABLE_STAYS: Record<string, { name: string; nightlyRate: number }> = {
  "apartment-single-luxury": { name: "Single Luxury Room", nightlyRate: 27_000 },
  "apartment-complete": { name: "Complete Apartment", nightlyRate: 60_000 },
  "rakaposhi-single-executive": { name: "Single Executive Room", nightlyRate: 16_500 },
  "rakaposhi-executive-suite": { name: "Executive Suite", nightlyRate: 30_000 },
  "rakaposhi-complete-villa": { name: "Complete Villa", nightlyRate: 70_000 },
  "luxury-attic": { name: "Attic Room", nightlyRate: 27_000 },
  "luxury-single": { name: "Single Luxury Room", nightlyRate: 27_000 },
  "luxury-suite": { name: "Luxury Suite (1 & 2)", nightlyRate: 50_000 },
  "luxury-complete-villa": { name: "Complete Villa", nightlyRate: 99_000 },
};
