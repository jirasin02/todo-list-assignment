import React from "react";
import { Box, IconButton } from "@mui/material";
import { Todo } from "@/types/todo";
import { CheckOutlined, CircleOutlined, MoreVert } from "@mui/icons-material";
import TodoModal from "./TodoModal";

export type TodoItemProps = {
  todo: Todo;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (
    id: number,
    title: string,
    description: string,
    isCompleted: boolean
  ) => void;
  handleChangeTodoState: (todo: Todo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleDeleteTodo,
  handleEditTodo,
  handleChangeTodoState,
}) => {
  const [open, setOpen] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState<Todo>({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    isCompleted: todo.isCompleted,
    date: todo.date,
  });

  const handleOpen = () => {
    setEditTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
      date: todo.date,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {todo.isCompleted ? (
          <IconButton
            id="todo-checked"
            sx={{
              color: "#b5b5ba",
              mr: 0.5,
            }}
            disableRipple
            onClick={() => handleChangeTodoState(todo)}
          >
            <CheckOutlined />
          </IconButton>
        ) : (
          <IconButton
            id="todo-unchecked"
            sx={{
              color: "#210062",
              mr: 0.5,
            }}
            disableRipple
            onClick={() => handleChangeTodoState(todo)}
          >
            <CircleOutlined />
          </IconButton>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            id="todo-title"
            style={{
              color: todo.isCompleted ? "#b5b5ba" : "black",
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </div>
          <IconButton
            sx={{
              color: "#210062",
            }}
            disableRipple
            onClick={handleOpen}
          >
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
      <TodoModal
        todo={editTodo}
        open={open}
        handleClose={handleClose}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        setEditTodo={setEditTodo}
      />
    </div>
  );
};

export default TodoItem;
