/** Internal Express API (dev: http://127.0.0.1:5000). */
export function getBackendInternalUrl(): string {
  return (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");
}
