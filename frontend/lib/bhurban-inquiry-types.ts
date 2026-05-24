export type BhurbanInquiryPayload = {
  fullName: string;
  email: string;
  phone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: string;
  message?: string;
  source?: string;
};
