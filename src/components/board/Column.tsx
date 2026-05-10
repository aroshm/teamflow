
type ColumnProps = {
    title: string
}

const Column = ({title}: ColumnProps) => {
  return (
    <div className="flex flex-1 rounded shadow p-2.5 border border-indigo-200 dark:border-indigo-400 dark:bg-gray-900">
      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-100">
        {title}
      </h3>
    </div>
  );
}

export default Column