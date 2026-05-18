type ColumnProps = {
  title: string;
  children: React.ReactNode;
};

const Column = ({ title, children }: ColumnProps) => {
  return (
    <div className="flex flex-col flex-1 gap-3.5 overflow-auto pr-3.5">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-100">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Column;
