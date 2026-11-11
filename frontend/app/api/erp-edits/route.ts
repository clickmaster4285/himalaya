// app/api/erp-edits/route.ts
// Same-origin proxy for the ERP edited-pages API, so the browser never calls
// the ERP (CMS_API_URL stays server-only). Always 200 with an empty result
// when there is nothing to apply, so the console never shows a 404.
//   GET /api/erp-edits              -> { paths: string[] }
//   GET /api/erp-edits?path=/a/b    -> { edits: ErpEdit[] }
import { NextResponse, type NextRequest } from "next/server";
import { EDIT_PATH_REGEX, getEditedPage, getEditedPaths } from "@/lib/erp-edits";
import { normalizeEditPath } from "@/lib/erp-edits-shared";

// Never cached (not here, not on the server, not in the browser): every page
// view gets the edits as currently published in the ERP.
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (path === null) {
    return NextResponse.json({ paths: await getEditedPaths({ fresh: true }) }, { headers });
  }
  if (path.length > 1024 || !EDIT_PATH_REGEX.test(normalizeEditPath(path))) {
    return NextResponse.json({ edits: [] }, { headers });
  }
  const page = await getEditedPage(path, { fresh: true });
  return NextResponse.json({ edits: page?.edits ?? [] }, { headers });
}
