import { createBooking, listBookings } from "@/Backend/controllers/booking.controller";

export async function GET() {
  return listBookings();
}

export async function POST(req: Request) {
  return createBooking(req);
}
