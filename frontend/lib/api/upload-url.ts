/** Upload endpoint — same-origin proxy locally; optional direct backend URL in production. */
export function getUploadApiUrl(): string {
  const direct = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (direct) return `${direct}/api/upload`;
  return "/api/upload";
}
