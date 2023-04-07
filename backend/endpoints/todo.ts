import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { Todo } from "../types/todo";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await axios.get("http://localhost:3000/todos");
  let sortedTodos = todos.data;
  switch (req.query.sortBy) {
    case "title":
      sortedTodos = todos.data.sort((a: Todo, b: Todo) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      break;
    case "status":
      sortedTodos = todos.data.filter((todo: Todo) => todo.isCompleted);
      sortedTodos = sortedTodos.concat(
        todos.data.filter((todo: Todo) => !todo.isCompleted)
      );
      break;
    case "date":
      sortedTodos = todos.data.sort((a: Todo, b: Todo) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
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
