import Column from "../components/board/Column";
import TaskCard from "../components/TaskCard";
import Tasks from "../data/Tasks";

const Board = () => {
  const initialBoard = [
    { id: "to-do", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];
  return (
    <div className="flex gap-5 h-full">
      {initialBoard.map((column) => (
        <Column key={column.id} title={column.title}>
          {Tasks.filter((task) => task.status === column.id).map((task) => (
            <TaskCard
              priority={task.priority}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
        </Column>
      ))}
    </div>
  );
};

export default Board;
