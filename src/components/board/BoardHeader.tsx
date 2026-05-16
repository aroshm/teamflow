import { FaPlus } from "react-icons/fa6";

type BoardHeaderProps = {
  onAddTask: () => void;
};

const BoardHeader = ({ onAddTask }: BoardHeaderProps) => {
  return (
    <div className="flex justify-end rounded-lg shadow p-3.5 border bg-indigo-100 border-indigo-200 dark:border-indigo-400 dark:bg-gray-900">
      <button
        className="flex items-center gap-1.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 cursor-pointer"
        type="button"
        onClick={onAddTask}
      >
        <FaPlus />
        Add Task
      </button>
    </div>
  );
};

export default BoardHeader;
