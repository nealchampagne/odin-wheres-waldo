import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";

// Your real app pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

// Dev-only tools
import DevIndex from "../dev/DevIndex";
import CaptureRoute from "../dev/CaptureRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },

      // --- DEV ROUTES (only included in development) ---
      ...(import.meta.env.DEV
        ? [
            {
              path: "dev",
              element: <DevIndex />,
            },
            {
              path: "dev/capture",
              element: <CaptureRoute />,
            },
          ]
        : []),

      // Catch-all
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
