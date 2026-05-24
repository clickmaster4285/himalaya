import { Router } from "express";
import * as villasController from "@/lib/server/controllers/villas.controller";

export const publicVillasRouter = Router();

publicVillasRouter.get("/", villasController.listPublishedVillas);
publicVillasRouter.get("/:slug", villasController.getPublishedVillaBySlug);

export const adminVillasRouter = Router();

adminVillasRouter.get("/", villasController.listAdminVillas);
adminVillasRouter.post("/", villasController.createVilla);
adminVillasRouter.get("/:id", villasController.getAdminVilla);
adminVillasRouter.patch("/:id", villasController.updateVilla);
adminVillasRouter.delete("/:id", villasController.deleteVilla);
