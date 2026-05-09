import { type ReactNode } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useUserAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center bg-neutral-secondary-soft h-dvh w-full font-medium rounded-base bg-indigo-50">
        <div className="px-5 py-2 ring-1 ring-inset ring-indigo-500 text-xs text-indigo-500 bg-indigo-100 font-medium rounded-sm animate-pulse">
          Loading...
        </div>
      </div>
    );
  if (!session) return <Navigate to="/signin" />;
  return <>{children}</>;
};

export default PrivateRoute;
