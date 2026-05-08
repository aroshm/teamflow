import { useEffect, useState } from "react";
import LogoLight from "../assets/logo-light.svg";
// import LogoDark from "../assets/logo-dark.svg";
import { FaCircleUser } from "react-icons/fa6";
import { useUserAuth } from "../hooks/useUserAuth";

const Header = () => {
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
    <nav className="bg-indigo-100 w-full z-20 top-0 inset-s-0 border-b border-indigo-300">
      <div className="flex flex-wrap items-center justify-between mx-auto px-5 py-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={LogoLight} className="" alt="Flowbite Logo" />
        </a>
        <div className="flex items-center relative space-x-3 md:space-x-0">
          <button
            type="button"
            className="flex text-indigo-600 cursor-pointer"
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
            className={`${openMenu ? "" : "hidden"} absolute top-full right-0 mt-1.5 z-50 bg-indigo-100 rounded-2xl shadow-lg w-64 border border-indigo-300`}
            id="user-dropdown"
          >
            <div className="px-4 py-3 text-sm border-b border-indigo-300">
              <span className="block text-heading font-medium">
                {userProfile?.full_name || null}
              </span>
              <span className="block text-body truncate">
                {userProfile?.email || null}
              </span>
            </div>
            <ul
              className="p-2 text-sm text-body font-medium"
              aria-labelledby="user-menu-button"
            >
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Earnings
                </a>
              </li>
              <li>
                <p
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded cursor-pointer"
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
