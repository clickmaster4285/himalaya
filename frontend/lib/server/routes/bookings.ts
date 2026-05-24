import { Router } from "express";
import * as bookingsController from "@/lib/server/controllers/bookings.controller";

export const bookingsRouter = Router();

bookingsRouter.get("/", bookingsController.listBookings);
bookingsRouter.get("/villa-availability", bookingsController.villaAvailability);
bookingsRouter.post("/", bookingsController.createBooking);
bookingsRouter.post("/:id/send-email", bookingsController.sendBookingEmailRoute);
bookingsRouter.get("/:id", bookingsController.getBooking);
bookingsRouter.patch("/:id", bookingsController.patchBooking);
