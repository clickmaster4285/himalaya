import mongoose from "mongoose";
import { createId } from "@paralleldrive/cuid2";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => createId() },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPERADMIN", "BOOKING_MANAGER", "USER"],
      default: "USER",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "User" },
);

const BookingSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => createId() },
    reference: { type: String, required: true, unique: true },
    experienceType: { type: String, required: true },
    packageName: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
    notes: { type: String, default: null },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true, collection: "Booking" },
);

BookingSchema.index({ status: 1 });

const VillaSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => createId() },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    bedrooms: { type: Number, required: true },
    guests: { type: Number, required: true },
    size: { type: String, required: true },
    highlights: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    content: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "Villa" },
);

VillaSchema.index({ published: 1 });
VillaSchema.index({ category: 1 });

export const UserM = mongoose.models.User || mongoose.model("User", UserSchema);
export const BookingM = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export const VillaM = mongoose.models.Villa || mongoose.model("Villa", VillaSchema);
