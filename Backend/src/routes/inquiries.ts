import { Router } from "express";
import * as inquiriesController from "../controllers/inquiries.controller";

export const inquiriesRouter = Router();

inquiriesRouter.get("/", inquiriesController.listInquiries);
inquiriesRouter.post("/", inquiriesController.createInquiry);
