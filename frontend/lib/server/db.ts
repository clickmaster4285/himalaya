import "server-only";
import mongoose from "mongoose";
import { getMongoUri } from "@/lib/server/config/env";

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global.__mongooseCache ?? { conn: null, promise: null };
global.__mongooseCache = cached;

/** Cached MongoDB connection for Next.js serverless / dev hot reload. */
export async function connectDb(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = getMongoUri();
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5_000,
        connectTimeoutMS: 5_000,
      })
      .then((m) => m)
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
