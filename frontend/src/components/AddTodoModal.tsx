import React from "react";

import { Modal, Box, TextField, Button } from "@mui/material";
import { AddTodo, Todo } from "@/types/todo";

type AddTodoModalProps = {
  open: boolean;
  handleClose: () => void;
  addTodo: () => void;
  todo: AddTodo;
  setTodo: React.Dispatch<React.SetStateAction<AddTodo>>;
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open,
  handleClose,
  addTodo,
  todo,
  setTodo,
}) => {
  return (
    <Modal keepMounted open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ fontSize: "1.5rem", fontWeight: 500, mb: 2 }}>
          Add new list
        </Box>
        <TextField
          variant="standard"
          placeholder="Title"
          sx={{ my: 2 }}
          value={todo.title}
          onChange={(e) => {
            setTodo({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <TextField
          variant="standard"
          placeholder="Description (optional)"
          multiline
          sx={{ my: 2 }}
          value={todo.description}
          onChange={(e) => {
            setTodo({
              ...todo,
              description: e.target.value,
            });
          }}
        />
        <Button
          variant="outlined"
          sx={{
            height: "40px",
            mt: 2,
            ":hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
          onClick={addTodo}
        >
          Add!
        </Button>
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
  width: 400,
  bgcolor: "white",
  p: 4,
  borderRadius: "8px",
};

export default AddTodoModal;
