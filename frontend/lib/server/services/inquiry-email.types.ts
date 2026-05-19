export type InquiryEmailPayload = {
  fullName: string;
  email: string;
  phone?: string | null;
  checkInDate?: string | null;
  checkOutDate?: string | null;
  numberOfGuests?: string | null;
  message?: string | null;
  source?: string | null;
};

export type InquiryEmailResult = {
  emailSent: boolean;
  staffEmailSent?: boolean;
  guestEmailSent?: boolean;
  method?: "gmail-oauth" | "smtp-gmail" | "smtp";
  detail?: string;
};
