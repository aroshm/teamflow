import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Board from "./pages/Board";
import PrivateRoute from "./components/auth/PrivateRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Layout from "./layout/Layout";

export const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    element: <Layout />,
    children: [
      {
        path: "/board",
        element: (
          <PrivateRoute>
            <Board />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
