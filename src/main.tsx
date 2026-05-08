import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import Layout from "./layout/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Layout>
        <RouterProvider router={router}></RouterProvider>
      </Layout>
    </AuthContextProvider>
  </StrictMode>,
);
