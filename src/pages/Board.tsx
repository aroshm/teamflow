import { useState } from "react";
import Tasks from "../data/Tasks";
import { TASK_STATUSES, type Task, type TaskStatus } from "../types/task";
import BoardHeader from "../components/board/BoardHeader";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import DroppableColumn from "../components/board/DroppableColumn";
import DraggableTaskCard from "../components/board/DraggableTaskCard";

const Board = () => {
  const [tasks, setTasks] = useState(Tasks);

  const columns = TASK_STATUSES;

  const updateTaskStatus = (id: string, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: value as TaskStatus } : task,
      ),
    );
  };

  const addTask = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      priority: "Low",
      status: "To Do",
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (id: string, field: string, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const escapeFocus = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.currentTarget.blur();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const taskId = event.operation.source?.id;
    const newStatus = event.operation.target?.id;

    if (!taskId || !newStatus) return;

    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus as TaskStatus }
          : task,
      ),
    );
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex flex-1 flex-col gap-5 min-h-0 overflow-auto">
        <BoardHeader onAddTask={addTask} />
        <div className="flex flex-1 gap-5 min-h-0">
          {columns.map((status) => (
            <DroppableColumn key={status} status={status}>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <DraggableTaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={updateTaskStatus}
                    onTaskUpdate={updateTask}
                    onDeleteTask={deleteTask}
                    handleKeyDown={escapeFocus}
                  />
                ))}
            </DroppableColumn>
          ))}
        </div>
      </div>
    </DragDropProvider>
  );
};

export default Board;
