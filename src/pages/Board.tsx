import Column from "../components/board/Column";

const Board = () => {
  const initialBoard = [
    { id: "col-1", title: "To Do" },
    { id: "col-2", title: "In Progress" },
    { id: "col-3", title: "Done" },
  ];
  return (
    <div className="flex gap-5 h-full">
      {initialBoard.map((column) => (
        <Column key={column.id} title={column.title} />
      ))}
    </div>
  );
};

export default Board;
