import type { Session } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/Supabase";
import { AuthContext } from "./authContextValue";

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
    try {
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
    } catch (error) {
      console.error("There was a problem signing up:", error);
      return { success: false, error };
    }
  };

  const SignInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
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

  const ResetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("There was a problem resetting password:", error);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      console.error("There was a problem resetting password:", error);
      return { success: false, error };
    }
  };

  const UpdatePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("There was a problem updating password:", error);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      console.error("There was a problem updating password:", error);
      return { success: false, error };
    }
  };

  const RetrieveUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching Profile:", error);
        return { success: false, error };
      }

      if (!user) return { success: false, error: "User Not Found" };

      return {
        success: true,
        data: {
          full_name: user.user_metadata.full_name,
          email: user.email,
        },
      };
    } catch (error) {
      console.error("Error fetching Profile:", error);
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        session,
        SignUpNewUser,
        SignInUser,
        SignOut,
        ResetPassword,
        UpdatePassword,
        RetrieveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
