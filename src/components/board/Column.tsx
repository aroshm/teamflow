type ColumnProps = {
  title: string;
  children: React.ReactNode;
};

const Column = ({ title, children }: ColumnProps) => {
  return (
    <div className="flex flex-col flex-1 gap-3.5 rounded-lg shadow p-3.5 border bg-indigo-100 border-indigo-200 dark:border-indigo-400 dark:bg-gray-900">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-100">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Column;
