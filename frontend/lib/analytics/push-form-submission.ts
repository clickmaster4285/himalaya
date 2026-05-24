/**
 * Pushes a GTM dataLayer event after a successful form submission.
 * Configure Google Ads conversion tags in GTM to listen for `form_submission`.
 */
export function pushFormSubmission(formName: string): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submission",
    form_name: formName,
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}
