import { Router } from "express";
import * as adminUsersController from "../controllers/admin-users.controller";

export const adminUsersRouter = Router();

adminUsersRouter.get("/", adminUsersController.listUsers);
adminUsersRouter.patch("/:id/role", adminUsersController.updateRole);
