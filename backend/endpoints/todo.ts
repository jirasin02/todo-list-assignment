import axios from "axios";
import { Request, Response } from "express";
import { Todo } from "../types/todo";
import { sortByDate, sortByStatus, sortByTitle } from "../utils/sortBy";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await axios.get("http://localhost:3000/todos");
  let sortedTodos = todos.data;
  switch (req.query.sortBy) {
    case "title":
      sortedTodos = sortByTitle(todos.data);
      break;
    case "status":
      sortedTodos = sortByStatus(todos.data);
      break;
    case "date":
      sortedTodos = sortByDate(todos.data);
      break;
    default:
      break;
  }
  res.send(sortedTodos);
};

export const getTodo = async (req: Request, res: Response) => {
  const todo = await axios.get(`http://localhost:3000/todos/${req.params.id}`);

  res.send(todo.data);
};

export const createTodo = async (req: Request, res: Response) => {
  const todo = await axios.post("http://localhost:3000/todos", req.body);

  res.send(todo.data);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todo = await axios.delete(
    `http://localhost:3000/todos/${req.params.id}`
  );

  res.send(todo.data);
};

export const editTodo = async (req: Request, res: Response) => {
  const todo = await axios.put(
    `http://localhost:3000/todos/${req.params.id}`,
    req.body
  );

  res.send(todo.data);
};
