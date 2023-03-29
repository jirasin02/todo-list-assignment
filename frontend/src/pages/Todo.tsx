import React from "react";
import "@/styles/todo.css";
import useTodos from "@/hooks/useTodo";
import TodoItem from "@/components/TodoItem";

const TodoPage = () => {
  const { todos } = useTodos();
  return (
    <div>
      <div className="container">
        <div
          style={{
            fontSize: "3rem",
          }}
        >
          Todo List
        </div>
        <div className="todo-list">
          {todos?.map((todo) => (
            <TodoItem />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
