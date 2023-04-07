import React from "react";
import "@/styles/todo.css";
import axios from "axios";
import TodoItem from "@/components/TodoItem";
import { Alert, Button, Menu, MenuItem, Snackbar } from "@mui/material";
import { Add, Sort } from "@mui/icons-material";
import { AddTodo, Todo } from "@/types/todo";
import AddTodoModal from "@/components/AddTodoModal";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

let sortByOptions = [
  {
    value: "title",
    label: "Title",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "date",
    label: "Date edited",
  },
];

const TodoPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<Todo[]>();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [addTodo, setAddTodo] = React.useState<AddTodo>({
    id: 0,
    title: "",
    description: "",
  });
  const openSortBy = Boolean(anchorEl);
  const [sortBy, setSortBy] = React.useState<string>("default");

  const handleOpen = () => {
    setAddTodo({
      id: 0,
      title: "",
      description: "",
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchTodos = async (sortBy: string) => {
    try {
      const response = await axios.get(`/api/todo?sortBy=${sortBy}`);
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
      date: new Date(),
    });
    fetchTodos(sortBy);
    setOpen(false);
  };

  const handleChangeTodoState = (todo: Todo) => {
    axios.put(`/api/todo/${todo.id}`, {
      title: todo.title,
      description: todo.description,
      isCompleted: !todo.isCompleted,
      date: todo.date,
    });
    fetchTodos(sortBy);
  };

  const handleDeleteTodo = async (id: number) => {
    await axios.delete(`/api/todo/${id}`);
    fetchTodos(sortBy);
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
      date: new Date(),
    });
    fetchTodos(sortBy);
  };

  const handleOpenSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSortBy = () => {
    setAnchorEl(null);
  };

  const handleSelectSortBy = (value: string) => {
    setSortBy(value);
    handleCloseSortBy();
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchTodos(sortBy);
    setIsLoading(false);
  }, [sortBy]);

  const particlesInit = React.useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = React.useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return !isLoading ? (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          particles: {
            color: {
              value: "#1876d1",
            },
            links: {
              color: "#1876d1",
              distance: 80,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
        }}
      />
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
          <div>
            <Button
              variant="text"
              startIcon={<Sort />}
              onClick={handleOpenSortBy}
              sx={{ mb: 2 }}
            >
              Sort by
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openSortBy}
              onClose={handleCloseSortBy}
            >
              {sortByOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleSelectSortBy(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="todo-list">
            {todos?.map((todo) => (
              <TodoItem
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
                handleChangeTodoState={handleChangeTodoState}
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
