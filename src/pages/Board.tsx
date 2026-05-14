import { useState } from "react";
import Column from "../components/board/Column";
import TaskCard from "../components/TaskCard";
import Tasks from "../data/Tasks";
import { TASK_STATUSES } from "../types/task";

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

  return (
    <div className="flex gap-5 h-full">
      {columns.map((status) => (
        <Column key={status} title={status}>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard
                key={task.title}
                priority={task.priority}
                title={task.title}
                description={task.description}
                status={task.status}
                onStatusChange={updateTaskStatus}
              />
            ))}
        </Column>
      ))}
    </div>
  );
};

export default Board;
