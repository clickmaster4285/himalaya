import { NextResponse } from "next/server";

export function forwardSetCookie(from: Response, to: NextResponse) {
  const headers = from.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof headers.getSetCookie === "function") {
    for (const c of headers.getSetCookie()) {
      to.headers.append("Set-Cookie", c);
    }
    return;
  }
  const single = from.headers.get("set-cookie");
  if (single) {
    to.headers.append("Set-Cookie", single);
  }
}
