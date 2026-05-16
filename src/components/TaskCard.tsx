import {
  FaFaceFlushed,
  FaFaceGrimace,
  FaFaceSmileWink,
  FaRegTrashCan,
} from "react-icons/fa6";
import {
  TASK_STATUSES,
  type TaskPriority,
  type TaskStatus,
} from "../types/task";

type TaskCardProps = {
  id: string;
  priority: TaskPriority | string;
  title: string;
  description: string;
  status: TaskStatus | string;
  onStatusChange: (title: string, value: string) => void;
  onTaskUpdate: (id: string, field: string, value: string) => void;
  onDeleteTask: (id: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
};
const TaskCard = ({
  id,
  priority,
  title,
  description,
  status,
  onStatusChange,
  onTaskUpdate,
  onDeleteTask,
  handleKeyDown,
}: TaskCardProps) => {
  return (
    <div className="flex flex-col bg-violet-50 rounded-lg p-2.5 shadow border border-indigo-200 dark:border-indigo-400 dark:bg-gray-800 dark:text-indigo-100">
      <div className="flex justify-between">
        <div>
          <div
            className={`flex items-center mb-2.5 gap-1.5 ${priority === "High" ? "text-red-600 dark:text-red-300" : priority === "Medium" ? "text-yellow-600 dark:text-yellow-300" : "text-green-600 dark:text-green-300"}`}
          >
            {priority === "High" ? (
              <FaFaceFlushed className="h-6 w-6" />
            ) : priority === "Medium" ? (
              <FaFaceGrimace className="h-6 w-6" />
            ) : (
              <FaFaceSmileWink className="h-6 w-6" />
            )}
            <select
              value={priority}
              onChange={(e) => onTaskUpdate(id, "priority", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <option
                value="Low"
                className="bg-indigo-100 dark:bg-gray-900 text-black dark:text-white"
              >
                Low
              </option>
              <option
                value="Medium"
                className="bg-indigo-100 dark:bg-gray-900 text-black dark:text-white"
              >
                Medium
              </option>
              <option
                value="High"
                className="bg-indigo-100 dark:bg-gray-900 text-black dark:text-white"
              >
                High
              </option>
            </select>
          </div>
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(title, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            {TASK_STATUSES.map((item) => (
              <option className="bg-indigo-100 dark:bg-gray-900 text-black dark:text-white">
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="text"
        className="font-bold text-lg mb-2.5"
        name="task-title"
        value={title}
        onChange={(e) => onTaskUpdate(id, "title", e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="Add task title"
      />
      <textarea
        value={description}
        name="task-description"
        onChange={(e) => onTaskUpdate(id, "description", e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="Add task description"
      />
      <div className="flex justify-end mt-4">
        <FaRegTrashCan
          className="text-red-600 dark:text-red-300 cursor-pointer"
          onClick={() => onDeleteTask(id)}
        />
      </div>
    </div>
  );
};

export default TaskCard;
