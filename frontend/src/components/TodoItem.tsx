import React from "react";
import axios from "axios";
import { Box, IconButton } from "@mui/material";
import { AddTodo, Todo } from "@/types/todo";
import { CheckOutlined, CircleOutlined, MoreVert } from "@mui/icons-material";
import TodoModal from "./TodoModal";

type TodoItemProps = {
  todo: Todo;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (
    id: number,
    title: string,
    description: string,
    isCompleted: boolean
  ) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  const [isCompleted, setIsCompleted] = React.useState(todo.isCompleted);

  const [open, setOpen] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState<Todo>({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    isCompleted: todo.isCompleted,
  });

  const handleOpen = () => {
    setEditTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (isCompleted: boolean) => {
    axios.put(`/api/todo/${todo.id}`, {
      title: todo.title,
      description: todo.description,
      isCompleted: isCompleted,
    });
    setIsCompleted(isCompleted);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isCompleted ? (
          <IconButton
            sx={{
              color: "#b5b5ba",
              mr: 0.5,
            }}
            disableRipple
            onClick={() => handleChange(!isCompleted)}
          >
            <CheckOutlined />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              color: "#210062",
              mr: 0.5,
            }}
            disableRipple
            onClick={() => handleChange(!isCompleted)}
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
          <Box
            sx={{
              color: isCompleted ? "#b5b5ba" : "black",
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </Box>
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
