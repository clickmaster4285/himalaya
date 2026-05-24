import express from "express";
import { registerRoutes } from "./routes";

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "2mb" }));
  registerRoutes(app);
  return app;
}
