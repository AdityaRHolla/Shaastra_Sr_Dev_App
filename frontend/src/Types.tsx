// src/types.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export interface NewTask {
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: string;
  completed?: boolean;
}

export interface TaskCardProps {
  task: Task;
}

// For Zustand product store actions/results
export interface TaskList {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  fetchTasks: (completed?: boolean, priority?: string) => Promise<void>;
  createTask: (task: NewTask) => Promise<{ success: boolean; message: string }>;
  updateTask: (
    id: number,
    task: UpdateTaskInput
  ) => Promise<{ success: boolean; message: string }>;
  deleteTask: (id: number) => Promise<{ success: boolean; message: string }>;
}
