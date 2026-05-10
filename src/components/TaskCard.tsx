import {
  FaFaceFlushed,
  FaFaceGrimace,
  FaFaceSmileWink,
  FaAngleDown,
} from "react-icons/fa6";
const TaskCard = () => {
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

        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="inline-flex items-center justify-center gap-1.5"
          type="button"
        >
          To do
          <FaAngleDown />
        </button>

        <div
          id="dropdown"
          className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
        >
          <ul
            className="p-2 text-sm text-body font-medium"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>To Do</li>
            <li>In Progress</li>
            <li>Done</li>
          </ul>
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
