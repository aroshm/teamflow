export const TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = "Low" | "Medium" | "High";
