import { Router } from "express";
import * as packagesController from "../controllers/packages.controller";

export const packagesRouter = Router();

packagesRouter.get("/", packagesController.listPackages);
packagesRouter.post("/", packagesController.createPackage);
packagesRouter.patch("/:id", packagesController.updatePackage);
packagesRouter.delete("/:id", packagesController.deletePackage);
