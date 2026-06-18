# TODO

## Fix Next.js dynamic route params sync-dynamic-apis warning + 404

1. Update `frontend/app/[slug]/page.tsx`:
   - Ensure slug extraction is resilient when `params` is undefined.
   - Next: adjust `generateMetadata` / `ArticlePage` to satisfy Next `sync-dynamic-apis` (await params when required).
2. Re-run dev build / open the failing article route to confirm no 404.
3. If still failing, add defensive slug fallback and verify `generateStaticParams` keys match `articlesBySlug`.


