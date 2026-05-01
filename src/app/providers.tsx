import { type ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { router } from "./router";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export function AppProviders() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
