// lib/erp-preview.ts
// Shared by proxy.ts (framing header) and app/erp-preview (live-refresh
// bridge), so it must not import server-only modules.

/** The only route the ERP page editor may frame. */
export const ERP_PREVIEW_PATH = "/erp-preview";

/**
 * ERP admin origins allowed to frame /erp-preview, from ERP_ADMIN_ORIGINS
 * (comma-separated). Normalized to bare origins; invalid entries are dropped.
 * Not secret: they are also passed to the browser for postMessage.
 */
export function erpAdminOrigins(): string[] {
  const origins = (process.env.ERP_ADMIN_ORIGINS ?? "").split(",").flatMap((raw) => {
    if (!raw.trim()) return [];
    try {
      const url = new URL(raw.trim());
      return url.protocol === "https:" || url.protocol === "http:" ? [url.origin] : [];
    } catch {
      return [];
    }
  });
  return [...new Set(origins)];
}

/** frame-ancestors for /erp-preview: this site plus the ERP admin origins. */
export const erpPreviewFrameAncestors = () => ["'self'", ...erpAdminOrigins()].join(" ");
