import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null;
  loading: boolean;

  SignUpNewUser: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    data?: unknown;
    error?: unknown;
  }>;

  SignInUser: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    data?: unknown;
    error?: unknown;
  }>;

  SignOut: () => Promise<void>;

  ResetPassword: (email: string) => Promise<{
    success: boolean;
    data?: unknown;
    error?: unknown;
  }>;

  UpdatePassword: (password: string) => Promise<{
    success: boolean;
    data?: unknown;
    error?: unknown;
  }>;

  RetrieveUser: () => Promise<{
    success: boolean;
    data?: unknown;
    error?: unknown;
  }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
