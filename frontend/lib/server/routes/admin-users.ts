import { Router } from "express";
import * as adminUsersController from "@/lib/server/controllers/admin-users.controller";

export const adminUsersRouter = Router();

adminUsersRouter.get("/", adminUsersController.listUsers);
adminUsersRouter.patch("/:id/role", adminUsersController.updateRole);
