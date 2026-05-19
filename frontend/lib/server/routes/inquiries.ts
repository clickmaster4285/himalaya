import { Router } from "express";
import * as inquiriesController from "@/lib/server/controllers/inquiries.controller";

export const inquiriesRouter = Router();

inquiriesRouter.post("/", inquiriesController.createInquiry);
