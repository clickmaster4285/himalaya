export type FormSubmissionDataLayerEvent = {
  event: "form_submission";
  form_name: string;
  page_url: string;
  timestamp: string;
};

declare global {
  interface Window {
    dataLayer?: Array<FormSubmissionDataLayerEvent | Record<string, unknown>>;
  }
}

export {};
