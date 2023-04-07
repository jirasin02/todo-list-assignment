export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  date: string;
}

export interface AddTodo {
  id: number;
  title: string;
  description: string;
}
