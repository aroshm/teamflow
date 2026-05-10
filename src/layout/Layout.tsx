import Header from "./Header";
import { useUserAuth } from "../hooks/useUserAuth";
import { Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Layout = () => {
  const { session } = useUserAuth();
  const [darkMode, setDarkMode] = useTheme();
  return (
    <div className="flex flex-col h-screen">
      {session && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}

      <div className="flex flex-1">
        <main className="p-5 bg-violet-50 flex-1 overflow-y-auto dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
