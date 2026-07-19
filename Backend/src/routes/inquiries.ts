import { Router } from "express";
import * as inquiriesController from "../controllers/inquiries.controller";

export const inquiriesRouter = Router();

inquiriesRouter.get("/", inquiriesController.listInquiries);
inquiriesRouter.post("/", inquiriesController.createInquiry);
inquiriesRouter.patch("/:id", inquiriesController.updateInquiry);
inquiriesRouter.delete("/:id", inquiriesController.deleteInquiry);
