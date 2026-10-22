
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Mainlayout from "./components/Mainlayout";
import About from "./pages/About";
import FlipCard from "./components/FlipCard";
import Home from "./components/Home";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      // Public routes: login/register page
      {
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <FlipCard />,
          },
          {
            path: "login",
            element: <FlipCard />,
          },
        ],
      },

      // Protected routes: authenticated users only
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
