import { useState } from "react";
import Column from "../components/board/Column";
import TaskCard from "../components/TaskCard";
import Tasks from "../data/Tasks";
import { TASK_STATUSES } from "../types/task";
import BoardHeader from "../components/board/BoardHeader";

const Board = () => {
  const [tasks, setTasks] = useState(Tasks);

  const columns = TASK_STATUSES;

  const updateTaskStatus = (title: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.title === title ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const addTask = () => {
    const newTask = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      priority: "",
      status: "To Do",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, field: string, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task,
      ),
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-5 min-h-0 overflow-auto">
      <BoardHeader onAddTask={addTask} />
      <div className="flex flex-1 gap-5 min-h-0">
        {columns.map((status) => (
          <Column key={status} title={status}>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  id={task.id}
                  key={task.id}
                  priority={task.priority}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onStatusChange={updateTaskStatus}
                  onTaskUpdate={updateTask}
                />
              ))}
          </Column>
        ))}
      </div>
    </div>
  );
};

export default Board;
