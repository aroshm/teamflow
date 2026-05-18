import { useDroppable } from "@dnd-kit/react";
import Column from "./Column";
import type { TaskStatus } from "../../types/task";

type DroppableColumnProps = {
  status: TaskStatus;
  children: React.ReactNode;
};

const DroppableColumn = ({ status, children }: DroppableColumnProps) => {
  const { ref, isDropTarget } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-1 rounded-lg shadow p-3.5 border bg-indigo-100 border-indigo-200 dark:border-indigo-400 dark:bg-gray-900 ${
        isDropTarget ? "ring-2 ring-indigo-400" : ""
      }`}
    >
      <Column title={status}>{children}</Column>
    </div>
  );
};

export default DroppableColumn;
