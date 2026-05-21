import { SITE_CONTACT } from "@/lib/site-contact";
import { format } from "date-fns";

export function buildWhatsAppBookingUrl(villaName?: string): string {
  const message = villaName ? `I want to book ${villaName}` : "I want to book a stay at Himalaya Villas & Resorts";
  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppAvailabilityUrl(
  checkIn?: Date,
  checkOut?: Date,
  guests?: string
): string {
  const message = `
I want to check availability at Himalaya Villas & Resorts.

Check-in: ${checkIn ? format(checkIn, "PPP") : "Not selected"}
Check-out: ${checkOut ? format(checkOut, "PPP") : "Not selected"}
Guests: ${guests || "Not selected"}
  `.trim();

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function buildBhurbanInquiryWhatsAppUrl(fields: {
  fullName: string;
  email: string;
  phone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: string;
  message?: string;
}) {
  const text = [
    "New inquiry from Hotels in Bhurban page:",
    "",
    `Name: ${fields.fullName}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "—"}`,
    `Check-in: ${fields.checkInDate || "—"}`,
    `Check-out: ${fields.checkOutDate || "—"}`,
    `Guests: ${fields.numberOfGuests || "—"}`,
    "",
    fields.message || "(no message)",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildThingsToDoMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  tripFocus?: string;
  activities?: string;
}) {
  const text = [
    "Enquiry from Things to Do in Murree guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Trip focus: ${fields.tripFocus || "—"}`,
    `Top activity: ${fields.activities || "—"}`,
    "",
    "Please confirm villa availability and help plan our Murree activities.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildWinterMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  tripFocus?: string;
  activities?: string;
}) {
  const text = [
    "Enquiry from Things to Do in Murree in Winter guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Trip focus: ${fields.tripFocus || "—"}`,
    `Winter experience: ${fields.activities || "—"}`,
    "",
    "Please confirm winter villa availability and snowfall-season arrangements.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildFamilyMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  childAges?: string;
  tripFocus?: string;
  topActivity?: string;
}) {
  const text = [
    "Enquiry from Family Things to Do in Murree guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Adults: ${fields.adults || "—"}`,
    `Children: ${fields.children || "—"}`,
    `Children ages: ${fields.childAges || "—"}`,
    `Trip focus: ${fields.tripFocus || "—"}`,
    `Top activity: ${fields.topActivity || "—"}`,
    "",
    "Please send a Family Mountain Escape package quote and activity plan.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildDiningMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  diningPreference?: string;
  dietaryNotes?: string;
}) {
  const text = [
    "Enquiry from Best Restaurants in Murree / dining guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Dining preference: ${fields.diningPreference || "—"}`,
    `Dietary notes: ${fields.dietaryNotes || "—"}`,
    "",
    "Please share the current seasonal in-villa menu and availability.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildPlacesNearMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  tripFocus?: string;
  mustSee?: string;
}) {
  const text = [
    "Enquiry from Places to Visit Near Murree guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Trip focus: ${fields.tripFocus || "—"}`,
    `Must-see destination: ${fields.mustSee || "—"}`,
    "",
    "Please help plan our day-trip itinerary from Himalaya Villas Bhurban.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildOutdoorMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  activityFocus?: string;
  activitiesToArrange?: string;
}) {
  const text = [
    "Enquiry from Outdoor Activities in Murree guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Activity focus: ${fields.activityFocus || "—"}`,
    `Arrange via concierge: ${fields.activitiesToArrange || "—"}`,
    "",
    "Please confirm villa availability and help arrange outdoor activities from Bhurban.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildCouplesMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  occasion?: string;
  packageInterest?: string;
  mustHave?: string;
}) {
  const text = [
    "Enquiry from Things to Do in Murree for Couples guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Occasion: ${fields.occasion || "—"}`,
    `Package interest: ${fields.packageInterest || "—"}`,
    `Must-have experience: ${fields.mustHave || "—"}`,
    "",
    "Please share couples package availability and help plan our romantic itinerary.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildMurreeNightWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  eveningFocus?: string;
  includeBonfire?: string;
}) {
  const text = [
    "Enquiry from Things to Do in Murree at Night guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Evening focus: ${fields.eveningFocus || "—"}`,
    `Include bonfire evening: ${fields.includeBonfire || "—"}`,
    "",
    "Please confirm availability and arrange bonfire / evening experiences.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildMurree3DayWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  tripMonth?: string;
  preArrange?: string;
}) {
  const text = [
    "Enquiry from Murree 3-Day Itinerary guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Planned month: ${fields.tripMonth || "—"}`,
    `Pre-arrange activities: ${fields.preArrange || "—"}`,
    "",
    "Please check 3-night availability at Himalaya Villas Bhurban and share package rates.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function buildBhurbanMurreeWhatsAppUrl(fields: {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  stayFocus?: string;
  activities?: string;
}) {
  const text = [
    "Enquiry from Things to Do in Bhurban Murree guide:",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone || "—"}`,
    `Email: ${fields.email || "—"}`,
    `Check-in: ${fields.checkIn || "—"}`,
    `Check-out: ${fields.checkOut || "—"}`,
    `Guests: ${fields.guests || "—"}`,
    `Stay focus: ${fields.stayFocus || "—"}`,
    `Activities of interest: ${fields.activities || "—"}`,
    "",
    "Please confirm Bhurban villa availability and help plan activities from the property.",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}