import { useDraggable } from "@dnd-kit/react";
import TaskCard from "../TaskCard";
import type { Task } from "../../types/task";

type DraggableTaskCardProps = {
  task: Task;
  onStatusChange: (id: string, value: string) => void;
  onTaskUpdate: (id: string, field: string, value: string) => void;
  onDeleteTask: (id: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
};

const DraggableTaskCard = ({
  task,
  onStatusChange,
  onTaskUpdate,
  onDeleteTask,
  handleKeyDown,
}: DraggableTaskCardProps) => {
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
        onStatusChange={onStatusChange}
        onTaskUpdate={onTaskUpdate}
        onDeleteTask={onDeleteTask}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default DraggableTaskCard;
