import { type ReactNode } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading } = UserAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center bg-neutral-secondary-soft h-dvh w-full font-medium rounded-base bg-blue-50">
        <div className="px-5 py-2 ring-1 ring-inset ring-blue-500 text-xs text-blue-500 bg-blue-100 font-medium rounded-sm animate-pulse">
          Loading...
        </div>
      </div>
    );
  if (!session) return <Navigate to="/signin" />;
  return <>{children}</>;
};

export default PrivateRoute;
