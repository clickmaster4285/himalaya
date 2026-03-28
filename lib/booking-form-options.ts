import type { Villa } from "@/lib/villa-types";

/** Matches homepage / book widget categories */
export const EXPERIENCE_OPTIONS = [
  { value: "Book Your Stay", subtitle: "Your home in the mountains" },
  { value: "Destination Weddings", subtitle: "Where dreams come true" },
  { value: "Dining", subtitle: "Savor the finest flavors" },
  { value: "Events", subtitle: "Perfect venue for every occasion" },
  { value: "Fun Activities", subtitle: "Unforgettable experiences await" },
  { value: "Meetings", subtitle: "Where business meets tranquility" },
] as const;

export const GENERAL_VILLA_VALUE = "_general";

export type VillaSelectOption = { value: string; label: string; hint: string };

export function getVillaSelectOptions(villas: Villa[]): VillaSelectOption[] {
  const fromCatalog: VillaSelectOption[] = villas.map((v) => ({
    value: v.slug,
    label: v.title,
    hint: v.price,
  }));
  return [
    {
      value: GENERAL_VILLA_VALUE,
      label: "All villas — let the estate advise",
      hint: "We’ll match you to the best fit",
    },
    ...fromCatalog,
  ];
}

export function packageNameFromVillaValue(slugOrGeneral: string, villas: Villa[]): string {
  if (slugOrGeneral === GENERAL_VILLA_VALUE) {
    return "Villa / package — to be assigned by estate";
  }
  const v = villas.find((x) => x.slug === slugOrGeneral);
  return v ? `${v.title} (${v.slug})` : slugOrGeneral;
}

/** Budget tiers (PKR) — guest picks one; manager can adjust on confirm */
export const PRICE_OPTIONS = [
  { value: "100000", label: "PKR 100,000" },
  { value: "150000", label: "PKR 150,000" },
  { value: "200000", label: "PKR 200,000" },
  { value: "250000", label: "PKR 250,000" },
  { value: "350000", label: "PKR 350,000" },
  { value: "500000", label: "PKR 500,000" },
  { value: "750000", label: "PKR 750,000" },
  { value: "1000000", label: "PKR 1,000,000" },
  { value: "1500000", label: "PKR 1,500,000+" },
] as const;
