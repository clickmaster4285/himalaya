import "server-only";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMocks } from "node-mocks-http";
import { createApp } from "@/lib/server/app";
import { connectDb } from "@/lib/server/db";

const app = createApp();

/** Run the in-process Express API against a Next.js request. */
export async function runExpressApi(req: NextRequest, slug: string[]): Promise<NextResponse> {
  try {
    await connectDb();
  } catch (err) {
    console.error("[api] MongoDB connection failed:", err);
    return NextResponse.json(
      {
        error:
          "Database unavailable. Start MongoDB and set DATABASE_URL in frontend/.env.local.",
      },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  const apiPath = `/api/${slug.map((s) => encodeURIComponent(s)).join("/")}`;

  let body: unknown;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const text = await req.text();
    if (text) {
      const ct = req.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        try {
          body = JSON.parse(text);
        } catch {
          body = text;
        }
      } else {
        body = text;
      }
    }
  }

  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => {
    headers[k] = v;
  });

  const { req: mockReq, res: mockRes } = createMocks({
    method: req.method as import("node-mocks-http").RequestMethod,
    url: `${apiPath}${url.search}`,
    headers,
    body: body as import("node-mocks-http").Body | undefined,
  });

  await new Promise<void>((resolve, reject) => {
    const done = () => resolve();
    mockRes.on("finish", done);
    mockRes.on("close", done);
    mockRes.on("error", reject);
    app(mockReq, mockRes);
    // Express 4 does not await async route handlers; poll until response is sent.
    const start = Date.now();
    const tick = () => {
      if (mockRes.headersSent || mockRes.writableEnded) {
        done();
        return;
      }
      if (Date.now() - start > 30_000) {
        reject(new Error("API handler timeout"));
        return;
      }
      setImmediate(tick);
    };
    setImmediate(tick);
  }).catch((err) => {
    console.error("[api] handler error:", err);
    if (!mockRes.headersSent) {
      mockRes.status(500).json({ error: "Request failed." });
    }
  });

  const status = mockRes.statusCode || 500;
  const contentType = String(mockRes.getHeader("content-type") ?? "application/json");
  const setCookie = mockRes.getHeader("set-cookie");

  let nextRes: NextResponse;
  if (typeof mockRes._isJSON === "function" && mockRes._isJSON()) {
    nextRes = NextResponse.json(mockRes._getJSONData(), { status });
  } else {
    const data = mockRes._getData();
    nextRes = new NextResponse(data, { status, headers: { "Content-Type": contentType } });
  }

  if (setCookie) {
    const list = Array.isArray(setCookie) ? setCookie : [setCookie];
    for (const c of list) {
      if (c) nextRes.headers.append("Set-Cookie", String(c));
    }
  }

  return nextRes;
}
