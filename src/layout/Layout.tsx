import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUserAuth } from "../hooks/useUserAuth";

const Layout = ({ children }: { children: ReactNode }) => {
  const { session } = useUserAuth();
  return (
    <div className="flex flex-col h-screen">
      {session && <Header />}

      <div className="flex flex-1">
        {session && <Sidebar />}
        <main className="p-5 bg-violet-50 flex-1 overflow-y-auto dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
