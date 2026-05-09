import { useEffect, useState } from "react";

const useTheme = (): [boolean, () => void] => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const themeChange = () => {
    setDarkMode((prev) => !prev);
  };
  return [darkMode, themeChange];
};

export default useTheme;
