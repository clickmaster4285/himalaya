import { getBookingById, patchBooking } from "@/Backend/controllers/booking.controller";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  return getBookingById(_req, id);
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  return patchBooking(req, id);
}
