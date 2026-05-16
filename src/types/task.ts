export const TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
};
