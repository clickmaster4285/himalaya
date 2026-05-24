/**
 * HTTP security headers for Next.js `headers()` config.
 * Tuned for GTM, Google Ads, Google Fonts, Maps embeds, and WhatsApp links.
 */

const isProd = process.env.NODE_ENV === "production";

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self' https://wa.me",
  "frame-ancestors 'self'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    ...(isProd ? [] : ["'unsafe-eval'"]),
    "https://www.googletagmanager.com",
    "https://www.google.com",
    "https://www.gstatic.com",
    "https://googleads.g.doubleclick.net",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
    "https://static.cloudflareinsights.com",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https: http:",
  [
    "connect-src",
    "'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://www.googletagmanager.com",
    "https://www.google.com",
    "https://googleads.g.doubleclick.net",
    "https://www.googleadservices.com",
    "https://oauth2.googleapis.com",
    "https://api.open-meteo.com",
    "https://www.clarity.ms",
    "https://*.clarity.ms",
    "https://cloudflareinsights.com",
  ].join(" "),
  [
    "frame-src",
    "'self'",
    "https://www.googletagmanager.com",
    "https://www.google.com",
    "https://maps.google.com",
    "https://www.google.com/maps",
  ].join(" "),
  ...(isProd ? ["upgrade-insecure-requests"] : []),
];

export const contentSecurityPolicy = cspDirectives.join("; ");

const baseSecurityHeaders: { key: string; value: string }[] = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** HSTS only on production (HTTPS). Scanners on himalayavillas.com need a prod build/deploy. */
export const securityHeaders: { key: string; value: string }[] = isProd
  ? [
      ...baseSecurityHeaders,
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
    ]
  : baseSecurityHeaders;
