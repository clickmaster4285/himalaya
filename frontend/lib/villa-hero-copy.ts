/** Marketing copy for key villas on the homepage catalog (SEO + brand voice). */
export function villaCardDescriptionOverride(slug: string): string | null {
  const s = slug.toLowerCase();
  if (s === "presidential-suite") {
    return "The flagship. A private terrace, jacuzzi with mountain views, and the kind of stillness Islamabad cannot offer. For guests who want the best of what the mountain has.";
  }
  if (s === "alpine-family-lodge" || s === "garden-villa-retreat") {
    return "Three bedrooms. One family. Enough space for everyone to breathe — and enough mountain outside to fill three days without repeating yourself.";
  }
  return null;
}
