import type { MouseEvent } from "react";
import { trackEvent } from "./track";

export const trackAndOpen = async (
  event: MouseEvent<HTMLAnchorElement>,
  url: string,
  metadata?: Record<string, unknown>
) => {
  event.preventDefault();

  const element = event.currentTarget;

  const elementText = element.textContent?.trim() || "unknown";

  const baseElementId =
    element.id ||
    elementText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_");

  // Detect the nearest page section
  const section =
    element.closest<HTMLElement>("section[id], header[id], footer[id], nav[id]")
      ?.id || "unknown";

  const elementId = `${section}_${baseElementId}`;

  await trackEvent({
    eventType: element.dataset.eventType || "link_click",
    page: window.location.pathname,
    elementId,
    elementText,
    metadata: {
      section,
      ...metadata,
    },
  });

  window.open(url, "_blank", "noopener,noreferrer");
};




export const trackClick = async (
  event: MouseEvent<HTMLElement>,
  options: {
    eventType: string;
    elementId?: string;
    elementText?: string;
    metadata?: Record<string, unknown>;
  }
) => {
  const element = event.currentTarget;

  const section =
    element.closest<HTMLElement>("section[id], header[id], footer[id], nav[id]")
      ?.id || "unknown";

  const actualElementId =
    options.elementId ||
    element.id ||
    element.textContent
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_") ||
    "unknown";

  await trackEvent({
    eventType: options.eventType,
    page: window.location.pathname,

    // Store the section here
    elementId: section,

    elementText:
      options.elementText ||
      element.textContent?.trim() ||
      "unknown",

    metadata: {
      element: actualElementId,
      ...options.metadata,
    },
  });
};