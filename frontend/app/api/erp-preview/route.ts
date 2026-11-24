// app/api/erp-preview/route.ts
// Support check for the ERP page editor's live preview: the ERP backend calls
// this to learn that /erp-preview exists on this site. No auth, no data.
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ erpPreview: true }, { headers: { "Cache-Control": "no-store" } });
}
