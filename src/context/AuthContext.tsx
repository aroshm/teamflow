import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/Supabase";

type AuthContextType = {
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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const SignUpNewUser = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const { data, error } = await supabase.auth.signUp({
      options: {
        data: {
          full_name: name,
        },
      },
      email: email,
      password: password,
    });

    if (error) {
      console.error("There was a problem signing up:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  const SignInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error("An error occurred:", error);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      console.error("An error occurred:", error);
      return { success: false, error };
    }
  };

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("There was an error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loading, session, SignUpNewUser, SignInUser, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }

  return context;
};
