import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoPage from "./pages/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
