/** Local calendar day at 00:00 — avoids UTC drift for stay comparisons. */
export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export type OccupiedRange = { checkIn: string; checkOut: string };

/** A night is unavailable if it falls in [checkIn, checkOut) (checkout morning is free). */
export function isDayReserved(day: Date, ranges: OccupiedRange[]): boolean {
  const t = startOfLocalDay(day).getTime();
  for (const r of ranges) {
    const cin = startOfLocalDay(new Date(r.checkIn)).getTime();
    const cout = startOfLocalDay(new Date(r.checkOut)).getTime();
    if (t >= cin && t < cout) return true;
  }
  return false;
}

/** Same overlap rule as backend: [aIn, aOut) vs [bIn, bOut) — both ends exclusive. */
export function stayRangesOverlap(
  checkInA: Date,
  checkOutA: Date,
  checkInB: Date,
  checkOutB: Date,
): boolean {
  return checkInA.getTime() < checkOutB.getTime() && checkInB.getTime() < checkOutA.getTime();
}

/** Selected range (check-in & check-out dates from picker) conflicts with any booking. */
export function selectionOverlapsOccupied(
  from: Date,
  to: Date,
  ranges: OccupiedRange[],
): boolean {
  const newIn = startOfLocalDay(from);
  const newOut = startOfLocalDay(to);
  for (const r of ranges) {
    const exIn = startOfLocalDay(new Date(r.checkIn));
    const exOut = startOfLocalDay(new Date(r.checkOut));
    if (stayRangesOverlap(newIn, newOut, exIn, exOut)) return true;
  }
  return false;
}
