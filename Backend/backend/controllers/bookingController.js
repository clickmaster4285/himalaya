const crypto = require("crypto");
const Booking = require("../models/Booking");
const User = require("../models/User");

function generateReference() {
  return `HV-${Date.now().toString(36)}-${crypto.randomBytes(3).toString("hex")}`.toUpperCase();
}

const listBookings = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const filter =
      user && user.role === "admin" ? {} : { userId: req.user.userId };

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .populate("userId", "name email");
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error("List bookings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      experienceType,
      packageName,
      bookingDate,
      totalAmount,
      notes,
      status,
    } = req.body;

    if (!experienceType || !packageName || !bookingDate || totalAmount == null) {
      return res.status(400).json({
        success: false,
        message: "experienceType, packageName, bookingDate, and totalAmount are required",
      });
    }

    const booking = await Booking.create({
      reference: generateReference(),
      experienceType,
      packageName,
      bookingDate: new Date(bookingDate),
      totalAmount: Number(totalAmount),
      notes: notes || "",
      status: status && ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].includes(status)
        ? status
        : "PENDING",
      userId: req.user.userId,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { listBookings, createBooking };
