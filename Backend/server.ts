/**
 * Himalaya Backend — main entry
 * Run: npm run dev
 */
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, ".env") });

import mongoose from "mongoose";
import { createApp } from "./src/app";
import { getMongoUri } from "./src/config/env";
import { ensureMongoBootstrap } from "./src/config/bootstrap";
import { API_ROUTES } from "./src/routes";

const app = createApp();

async function start() {
  const uri = getMongoUri();
  await mongoose.connect(uri);
  await ensureMongoBootstrap();

  const port = Number(process.env.PORT) || 5000;
  const host = process.env.HOST || "127.0.0.1";

  app.listen(port, host, () => {
    console.log("");
    console.log("  Himalaya API running");
    console.log(`  → http://${host}:${port}`);
    console.log(`  → http://${host}:${port}/api/health`);
    console.log("");
    console.log("  Routes:");
    Object.entries(API_ROUTES).forEach(([name, path]) => {
      console.log(`    ${name.padEnd(12)} ${path}`);
    });
    console.log("");
  });
}

start().catch((err) => {
  console.error("[server] Failed to start:", err);
  process.exit(1);
});
