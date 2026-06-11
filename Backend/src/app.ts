import path from "path";
import express from "express";
import { registerRoutes } from "./routes";

const uploadsDir = process.env.UPLOADS_DIR ?? path.join(process.cwd(), "uploads");

export function createApp() {
  const app = express();
  app.use("/uploads", express.static(uploadsDir));
  app.use(express.json({ limit: "2mb" }));
  registerRoutes(app);
  return app;
}
