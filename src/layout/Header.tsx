import { useEffect, useState } from "react";
import LogoLight from "../assets/logo-light.svg";
import LogoDark from "../assets/logo-dark.svg";
import { FaCircleUser, FaRegMoon, FaRegSun } from "react-icons/fa6";
import { useUserAuth } from "../hooks/useUserAuth";
import { Link } from "react-router-dom";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: () => void;
};

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    full_name?: string;
    email?: string;
  } | null>(null);

  const { RetrieveUser, SignOut } = useUserAuth();

  useEffect(() => {
    const getUser = async () => {
      const result = await RetrieveUser();

      if (result.success) {
        setUserProfile(result.data as { full_name?: string; email?: string });
      }
    };

    getUser();
  }, [RetrieveUser]);

  return (
    <nav className="bg-indigo-100 w-full z-20 top-0 inset-s-0 border-b border-indigo-300 dark:bg-gray-900 dark:border-indigo-400">
      <div className="flex flex-wrap items-center justify-between mx-auto px-5 py-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={darkMode ? LogoDark : LogoLight}
            className=""
            alt="Flowbite Logo"
          />
        </a>
        <div className="flex items-center relative space-x-3 md:space-x-0">
          <button
            aria-label="Toggle theme"
            className="p-2 mr-2.5 rounded cursor-pointer text-indigo-600 dark:text-indigo-100"
            type="button"
            onClick={setDarkMode}
          >
            {darkMode ? <FaRegSun /> : <FaRegMoon />}
          </button>

          <button
            type="button"
            className="flex text-indigo-600 cursor-pointer dark:text-indigo-100"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className="sr-only">Open user menu</span>
            <FaCircleUser className="w-7 h-7 " />
          </button>

          <div
            className={`${openMenu ? "" : "hidden"} absolute top-full right-0 mt-1.5 z-50 bg-indigo-100 rounded-2xl shadow-lg w-64 border border-indigo-300 dark:bg-gray-900 dark:border-indigo-400`}
            id="user-dropdown"
          >
            <div className="px-4 py-3 text-sm border-b border-indigo-300 dark:border-indigo-400">
              <span className="block font-semibold text-indigo-600 cursor-default dark:text-indigo-200">
                {userProfile?.full_name || null}
              </span>
              <span className="block truncate text-indigo-600 cursor-default dark:text-indigo-200">
                {userProfile?.email || null}
              </span>
            </div>
            <ul
              className="p-2 text-sm text-body font-medium"
              aria-labelledby="user-menu-button"
            >
              <li>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-indigo-200 rounded transition dark:text-indigo-100 dark:hover:bg-indigo-900"
                >
                  Dashboard
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-indigo-200 rounded transition"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-indigo-200 rounded transition"
                >
                  Earnings
                </a>
              </li> */}
              <li>
                <p
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-indigo-200 rounded transition cursor-pointer dark:text-indigo-100 dark:hover:bg-indigo-900"
                  onClick={SignOut}
                >
                  Sign out
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
