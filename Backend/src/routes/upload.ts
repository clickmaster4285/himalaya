import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as uploadController from "../controllers/upload.controller";

const uploadsDir = process.env.UPLOADS_DIR ?? path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed."));
  },
});

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), uploadController.uploadImage);

uploadRouter.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "Image must be 10 MB or smaller." });
    }
    return res.status(400).json({ error: "Upload failed." });
  }
  if (err instanceof Error && err.message === "Only image files are allowed.") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});
