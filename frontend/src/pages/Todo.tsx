import React from "react";
import "@/styles/todo.css";
import axios from "axios";
import TodoItem from "@/components/TodoItem";
import { Alert, Button, Snackbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AddTodo, Todo } from "@/types/todo";
import AddTodoModal from "@/components/AddTodoModal";

const TodoPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<Todo[]>();
  const [open, setOpen] = React.useState(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [addTodo, setAddTodo] = React.useState<AddTodo>({
    id: 0,
    title: "",
    description: "",
  });

  const handleOpen = () => {
    setAddTodo({
      id: 0,
      title: "",
      description: "",
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`/api/todo`);
      setTodos(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddTodo = async () => {
    if (addTodo.title == "") {
      setIsError(true);
      return;
    }
    await axios.post("/api/todo", {
      title: addTodo.title,
      description: addTodo.description,
      isCompleted: false,
    });
    fetchTodos();
    setOpen(false);
  };

  const handleDeleteTodo = async (id: number) => {
    await axios.delete(`/api/todo/${id}`);
    fetchTodos();
  };

  const handleEditTodo = async (
    id: number,
    title: string,
    description: string,
    isCompleted: boolean
  ) => {
    if (title == "") {
      setIsError(true);
      return;
    }
    await axios.put(`/api/todo/${id}`, {
      title: title,
      description: description,
      isCompleted: isCompleted,
    });
    fetchTodos();
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchTodos();
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <div>
      <div className="container">
        <div style={{ width: "60%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                fontWeight: 500,
              }}
            >
              Todo List
            </div>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ height: "40px" }}
              onClick={handleOpen}
            >
              Add
            </Button>
          </div>
          <div className="todo-list">
            {todos?.map((todo) => (
              <TodoItem
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            ))}
          </div>
        </div>
      </div>

      <AddTodoModal
        open={open}
        handleClose={handleClose}
        addTodo={handleAddTodo}
        todo={addTodo}
        setTodo={setAddTodo}
      />
      <Snackbar
        open={isError}
        autoHideDuration={5000}
        onClose={() => setIsError(false)}
      >
        <Alert severity="error" variant="filled">
          Title cannot be empty!
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default TodoPage;
