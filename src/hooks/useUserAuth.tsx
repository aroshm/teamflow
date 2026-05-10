import { useContext } from "react";
import { AuthContext } from "../context/authContextValue";

export const useUserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }

  return context;
};
