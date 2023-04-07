import { Todo } from "../types/todo";

export const sortByTitle = (todos: Todo[]) => {
  return todos.sort((a: Todo, b: Todo) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
};

export const sortByStatus = (todos: Todo[]) => {
  return todos
    .filter((todo: Todo) => todo.isCompleted)
    .concat(todos.filter((todo: Todo) => !todo.isCompleted));
};

export const sortByDate = (todos: Todo[]) => {
  return todos.sort((a: Todo, b: Todo) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
};
