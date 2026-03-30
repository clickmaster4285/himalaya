/** Nights between calendar dates (exclusive end in hotel convention: nights = days between dates). */
export function countStayNights(checkIn: Date, checkOut: Date): number {
  const a = Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const b = Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
  const diff = Math.round((b - a) / 86400000);
  return Math.max(0, diff);
}

/** Parse first integer from villa price label (e.g. "PKR 39,000 / night"). */
export function parseNightlyPkr(priceLabel: string): number {
  const digits = priceLabel.replace(/[^\d]/g, "");
  const n = parseInt(digits, 10);
  return Number.isFinite(n) && n > 0 ? n : 39_000;
}

const DEFAULT_TAX = 0.16;

export function computeStayTotalPkr(nightly: number, nights: number, taxRate = DEFAULT_TAX) {
  const subtotal = nightly * nights;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;
  return { subtotal, taxes, total, nights };
}
