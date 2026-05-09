import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUserAuth } from "../hooks/useUserAuth";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { session } = useUserAuth();
  return (
    <div className="flex flex-col h-screen">
      {session && <Header />}

      <div className="flex flex-1">
        {session && <Sidebar />}
        <main className="p-5 bg-violet-50 flex-1 overflow-y-auto dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
