import path from "path";
import express from "express";
import { registerRoutes } from "./routes";

const uploadsDir = process.env.UPLOADS_DIR ?? path.join(process.cwd(), "uploads");

export function createApp() {
  const app = express();

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ].filter(Boolean) as string[];

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  app.use("/uploads", express.static(uploadsDir));
  app.use(express.json({ limit: "2mb" }));
  registerRoutes(app);
  return app;
}
