import React from "react";

import { Modal, Box, TextField, Button } from "@mui/material";
import { AddTodo, Todo } from "@/types/todo";

type TodoModalProps = {
  todo: Todo;
  open: boolean;
  handleClose: () => void;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (
    id: number,
    title: string,
    description: string,
    isCompleted: boolean
  ) => void;
  setEditTodo: React.Dispatch<React.SetStateAction<Todo>>;
};

const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  open,
  handleClose,
  handleEditTodo,
  handleDeleteTodo,
  setEditTodo,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <Modal keepMounted open={open} onClose={handleClose}>
      <Box sx={style}>
        {isEdit ? (
          <>
            <TextField
              variant="standard"
              placeholder="Title"
              sx={{ mb: 2, fontFamily: "Raleway" }}
              value={todo.title}
              onChange={(e) => {
                setEditTodo({
                  ...todo,
                  title: e.target.value,
                });
              }}
            />
            <TextField
              variant="standard"
              placeholder="Description (optional)"
              multiline
              sx={{ mb: 2 }}
              value={todo.description}
              onChange={(e) => {
                setEditTodo({
                  ...todo,
                  description: e.target.value,
                });
              }}
            />
          </>
        ) : (
          <>
            <Box sx={{ fontSize: "1.5rem", fontWeight: 500, mb: 2 }}>
              {todo.title}
            </Box>
            <Box
              sx={{ fontSize: "1rem", fontWeight: 400, mb: 2, lineHeight: 1.5 }}
            >
              {todo.description}
            </Box>
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          {isEdit ? (
            <Button
              variant="contained"
              sx={{
                height: "40px",
              }}
              onClick={() => {
                if (todo.title === "") {
                  handleEditTodo(
                    todo.id,
                    todo.title,
                    todo.description,
                    todo.isCompleted
                  );
                  return;
                }
                handleEditTodo(
                  todo.id,
                  todo.title,
                  todo.description,
                  todo.isCompleted
                );
                setIsEdit(false);
                handleClose();
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{
                height: "40px",
                ":hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </Button>
          )}

          <Button
            variant="outlined"
            color="error"
            sx={{
              height: "40px",
              ml: 2,
              ":hover": {
                bgcolor: "error.main",
                color: "white",
              },
            }}
            onClick={() => {
              handleDeleteTodo(todo.id);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  width: 500,
  bgcolor: "white",
  p: 4,
  borderRadius: "8px",
};

export default TodoModal;
