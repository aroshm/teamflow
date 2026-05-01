import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SignIn from "../features/auth/SignIn";
import SignUp from "../features/auth/SignUp";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "projects",
        element: (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Projects - Coming Soon</h2>
          </div>
        ),
      },
      {
        path: "tasks",
        element: (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Tasks - Coming Soon</h2>
          </div>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
