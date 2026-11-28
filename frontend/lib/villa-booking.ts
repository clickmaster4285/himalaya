const BOOK_STAY_PATH = "/book/stay";

export function getVillaBookingHref(villaSlug: string): string {
  const params = new URLSearchParams({
    villa: villaSlug,
    adults: "1",
    children: "0",
    rooms: "1",
  });
  return `${BOOK_STAY_PATH}?${params.toString()}`;
}
