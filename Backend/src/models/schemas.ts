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
    /** Villa stay flow — optional for legacy / non-stay bookings */
    villaSlug: { type: String, default: null },
    checkOutDate: { type: Date, default: null },
    adults: { type: Number, default: null },
    children: { type: Number, default: null },
    guestPhone: { type: String, default: null },
    guestFirstName: { type: String, default: null },
    guestLastName: { type: String, default: null },
    guestContactEmail: { type: String, default: null },
    paymentMethod: { type: String, default: null },
    /** Extra items the guest requested outside the package (record visible to staff). */
    extras: {
      type: [
        new mongoose.Schema(
          {
            title: { type: String, required: true, trim: true },
            quantity: { type: Number, default: 1 },
            amount: { type: Number, default: 0 },
            notes: { type: String, default: null },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
    /** Optional free-text summary for extra/outside requests. */
    extrasNote: { type: String, default: null },
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

const PackageSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => createId() },
    name: { type: String, required: true, trim: true },
    experienceType: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    priceLabel: { type: String, default: null },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "Package" },
);

PackageSchema.index({ active: 1 });
PackageSchema.index({ experienceType: 1 });

const ExpenseSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => createId() },
    bookingId: { type: String, required: true, index: true },
    customerUserId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true },
    notes: { type: String, default: null },
    createdByUserId: { type: String, required: true, index: true },
  },
  { timestamps: true, collection: "Expense" },
);

ExpenseSchema.index({ createdAt: -1 });

export const UserM = mongoose.models.User || mongoose.model("User", UserSchema);
export const BookingM = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export const VillaM = mongoose.models.Villa || mongoose.model("Villa", VillaSchema);
export const PackageM = mongoose.models.Package || mongoose.model("Package", PackageSchema);
export const ExpenseM = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
