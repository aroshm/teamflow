import Column from "../components/board/Column";
import TaskCard from "../components/TaskCard";

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
          <TaskCard />
        </Column>
      ))}
    </div>
  );
};

export default Board;
