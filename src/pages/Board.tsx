import { useState } from "react";
import Column from "../components/board/Column";
import TaskCard from "../components/TaskCard";
import Tasks from "../data/Tasks";
import { TASK_STATUSES, type TaskStatus } from "../types/task";
import BoardHeader from "../components/board/BoardHeader";
import {
  DragDropProvider,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/react";

const Board = () => {
  const [tasks, setTasks] = useState(Tasks);

  const columns = TASK_STATUSES;

  const updateTaskStatus = (title: string, value: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.title === title ? { ...task, status: value } : task,
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

  const DraggableTaskCard = ({
    task,
    updateTaskStatus,
    updateTask,
    deleteTask,
    escapeFocus,
  }: {
    task: (typeof Tasks)[number];
    updateTaskStatus: (title: string, value: string) => void;
    updateTask: (id: string, field: string, value: string) => void;
    deleteTask: (id: string) => void;
    escapeFocus: (e: React.KeyboardEvent<HTMLElement>) => void;
  }) => {
    const { ref, isDragging } = useDraggable({
      id: task.id,
    });

    return (
      <div ref={ref} className={isDragging ? "opacity-50" : ""}>
        <TaskCard
          id={task.id}
          priority={task.priority}
          title={task.title}
          description={task.description}
          status={task.status}
          onStatusChange={updateTaskStatus}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          handleKeyDown={escapeFocus}
        />
      </div>
    );
  };

  const DroppableColumn = ({
    status,
    children,
  }: {
    status: TaskStatus;
    children: React.ReactNode;
  }) => {
    const { ref } = useDroppable({
      id: status,
    });

    return (
      <div
        ref={ref}
        className="flex flex-1 rounded-lg shadow p-3.5 border bg-indigo-100 border-indigo-200 dark:border-indigo-400 dark:bg-gray-900"
      >
        <Column title={status}>{children}</Column>
      </div>
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
                    updateTaskStatus={updateTaskStatus}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    escapeFocus={escapeFocus}
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
