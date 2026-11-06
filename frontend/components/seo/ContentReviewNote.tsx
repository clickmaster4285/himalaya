"use client";

import { CONTENT_REVIEW } from "@/lib/seo/intent-canonicals";

export function ContentReviewNote({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      Written by {CONTENT_REVIEW.author}. Reviewed by {CONTENT_REVIEW.reviewer}. Last reviewed{" "}
      {CONTENT_REVIEW.lastReviewedLabel}.
    </p>
  );
}
