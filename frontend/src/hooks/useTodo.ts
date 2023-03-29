import { Todo } from "@/types/todo";
import axios from "axios";
import { useEffect, useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/todo`);
      setTodos(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, isLoading };
};

export default useTodos;
