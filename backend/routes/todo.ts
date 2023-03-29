import express, { Application } from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodo,
  getTodos,
} from "../endpoints/todo";

export const todoRoutes: Application = express();

todoRoutes.get("/", getTodos);
todoRoutes.get("/:id", getTodo);
todoRoutes.post("/", createTodo);
todoRoutes.delete("/:id", deleteTodo);
todoRoutes.put("/:id", editTodo);
