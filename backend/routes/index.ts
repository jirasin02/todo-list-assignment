import express, { Application } from "express";
import { todoRoutes } from "./todo";

export const router: Application = express();

router.use("/todo", todoRoutes);
