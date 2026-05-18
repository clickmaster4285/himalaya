import { Router } from "express";
import * as expensesController from "../controllers/expenses.controller";

export const expensesRouter = Router();

expensesRouter.get("/", expensesController.listExpenses);
expensesRouter.post("/", expensesController.createExpense);
expensesRouter.patch("/:id", expensesController.updateExpense);
expensesRouter.delete("/:id", expensesController.deleteExpense);
