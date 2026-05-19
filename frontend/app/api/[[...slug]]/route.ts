import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { runExpressApi } from "@/lib/server/http/run-express";

type Ctx = { params: Promise<{ slug?: string[] }> };

async function handle(req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;
  const parts = slug ?? [];
  if (parts.length === 0) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return runExpressApi(req, parts);
}

export async function GET(req: NextRequest, ctx: Ctx) {
  return handle(req, ctx);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  return handle(req, ctx);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handle(req, ctx);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  return handle(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handle(req, ctx);
}
