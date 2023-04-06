import { createTheme, ThemeProvider } from "@mui/material";
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
    <ThemeProvider theme={theme}>
      <div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: `"Raleway", sans-serif`,
  },
});

export default App;
