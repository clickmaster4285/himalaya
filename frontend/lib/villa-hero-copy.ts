/** Marketing copy for key villas on catalog cards (SEO + brand voice). */
export function villaCardDescriptionOverride(slug: string): string | null {
  const s = slug.toLowerCase();
  if (s === "luxury-complete-villa" || s === "rakaposhi-complete-villa") {
    return "Book the entire villa for your group — private gardens, multiple bedrooms, and no shared corridors. Ideal for families, weddings, and reunions.";
  }
  if (s === "apartment-complete") {
    return "Two bedrooms and a shared living area — enough space for everyone to breathe, with mountain views from every window.";
  }
  if (s === "rakaposhi-single-executive") {
    return "Our most accessible luxury option — private terrace, mountain views, and breakfast included from PKR 16,500/night.";
  }
  return null;
}
