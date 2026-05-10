import { useRef, useState } from "react";
import {
  FaFaceFlushed,
  FaFaceGrimace,
  FaFaceSmileWink,
  FaAngleDown,
} from "react-icons/fa6";
import useClickOutside from "../hooks/useClickOutside";
const TaskCard = () => {
  //   const [importance, setImportance] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownValue, setdropDownValue] = useState("To Do");

  const dropDownRef = useRef<HTMLDivElement>(null);
  const toggleDropDown = () => setShowDropDown((prev) => !prev);
  useClickOutside(dropDownRef, () => setShowDropDown(false));

  const dropDownOptions = [
    { name: "To Do", value: "to-do" },
    { name: "In Progress", value: "in-progress" },
    { name: "Done", value: "done" },
  ];
  return (
    <div className="flex flex-col bg-violet-50 rounded-lg p-2.5 shadow border border-indigo-200 dark:border-indigo-400 dark:bg-gray-800 dark:text-indigo-100">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center text-red-600 dark:text-red-300 mb-2.5 gap-1.5">
            <FaFaceFlushed />
            High
          </div>
          {/* <div className="flex items-center text-yellow-600 dark:text-yellow-300 mb-2.5 gap-1.5">
            <FaFaceGrimace />
            Medium
          </div>
          <div className="flex items-center text-green-600 dark:text-green-300 mb-2.5 gap-1.5">
            <FaFaceSmileWink />
            Low
          </div> */}
        </div>

        <div className="relative" ref={dropDownRef}>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center justify-center gap-1.5 cursor-pointer"
            type="button"
            onClick={toggleDropDown}
          >
            {dropDownValue}
            <FaAngleDown />
          </button>

          <div
            id="dropdown"
            className={`${showDropDown ? "" : "hidden"} z-10 bg-violet-100 dark:bg-gray-700 border border-violet-300 dark:border-indigo-400 rounded shadow-lg w-44 absolute right-0`}
          >
            <ul
              className="p-2 text-sm text-body font-medium"
              aria-labelledby="dropdownDefaultButton"
            >
              {dropDownOptions.map((item) => (
                <li
                  className="p-1 hover:bg-violet-200 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    setdropDownValue(item.name);
                    setShowDropDown(false);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h4 className="font-bold text-lg mb-2.5">Lorem ipsum dolor sit.</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum,
        consequatur.
      </p>
    </div>
  );
};

export default TaskCard;
