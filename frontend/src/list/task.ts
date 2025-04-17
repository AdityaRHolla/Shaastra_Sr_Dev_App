import { create } from "zustand";
import { Task, NewTask, TaskList, UpdateTaskInput } from "../Types";

export const useTaskList = create<TaskList>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),

  // src/list/task.ts
  fetchTasks: async (completed?: boolean, priority?: string) => {
    try {
      // Build variables object
      const variables: Record<string, any> = {};
      if (completed !== undefined) variables.completed = completed;
      if (priority && priority !== "all") variables.priority = priority;

      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query ($completed: Boolean, $priority: String) {
            tasks(completed: $completed, priority: $priority) {
              id
              title
              description
              priority
              completed
            }
          }
        `,
          // Omit variables key if empty
          ...(Object.keys(variables).length > 0 ? { variables } : {}),
        }),
      });

      const { data, errors } = await res.json();
      if (errors) throw new Error(errors[0].message);
      set({ tasks: data.tasks as Task[] });
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      // Optional: Update state to show error
      // set({ tasks: [] });
    }
  },

  createTask: async (newTask: NewTask) => {
    try {
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation ($title: String!, $description: String!, $priority: String!) {
              createTask(title: $title, description: $description, priority: $priority) {
                id
                title
                description
                priority
              }
            }
          `,
          variables: newTask,
        }),
      });

      const { data, errors } = await res.json();
      if (errors) throw new Error(errors[0].message);
      set((state) => ({
        tasks: [...state.tasks, data.createTask as Task],
      }));
      return { success: true, message: "Task created successfully" };
    } catch (error: any) {
      console.log("Creating task with description:", newTask.description);
      console.error("Creation failed:", error.message);
      return { success: false, message: error.message };
    }
  },

  deleteTask: async (id: number) => {
    try {
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation ($id: Float!) {
              deleteTask(id: $id) 
            }
          `,
          variables: { id },
        }),
      });
      const { data, errors } = await res.json();
      if (errors) throw new Error(errors[0].message);

      set((state) => ({
        tasks: state.tasks.filter((task: Task) => task.id !== id),
      }));
      return { success: true, message: "Task deleted successfully" };
    } catch (error: any) {
      console.error("Delete failed:", error.message);
      return { success: false, message: error.message };
    }
  },

  updateTask: async (id: number, updatedFields: UpdateTaskInput) => {
    try {
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // In your Zustand store
        body: JSON.stringify({
          query: `
            mutation ($id: Float!, $title: String, $description: String, $priority: String, $completed: Boolean) {
              updateTask(
                id: $id
                title: $title
                description: $description
                priority: $priority
                completed: $completed
              ) {
                id
                title
                description
                priority
                completed
              }
            }
          `,
          variables: { id, ...updatedFields },
        }),
      });
      const { data, errors } = await res.json();
      if (errors) throw new Error(errors[0].message);

      set((state) => ({
        tasks: state.tasks.map((task: Task) =>
          task.id === id ? (data.updateTask as Task) : task
        ),
      }));
      return { success: true, message: "Task updated successfully" };
    } catch (error: any) {
      console.error("Update failed:", error.message);
      return { success: false, message: error.message };
    }
  },
}));
