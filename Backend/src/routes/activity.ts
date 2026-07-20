import { Router } from "express";
import { trackActivity , getActivities} from "../controllers/activity.controller";

export const activityRouter = Router();

activityRouter.post("/", trackActivity);
activityRouter.get("/get-all", getActivities);