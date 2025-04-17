import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { Task, NewTask, UpdateTaskInput } from "../Types";
import { completedFilterVar, priorityFilterVar } from "./localState";

// Queries
export const GET_TASKS = gql`
  query GetTasks($completed: Boolean, $priority: String) {
    tasks(completed: $completed, priority: $priority) {
      id
      title
      description
      priority
      completed
    }
  }
`;

// Mutations
export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $priority: String!
  ) {
    createTask(title: $title, description: $description, priority: $priority) {
      id
      title
      description
      priority
      completed
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: Float!
    $title: String
    $description: String
    $priority: String
    $completed: Boolean
  ) {
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
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Float!) {
    deleteTask(id: $id)
  }
`;

export const GET_TASK_HISTORY = gql`
  query GetTaskHistory($taskId: Int!) {
    taskHistory(taskId: $taskId) {
      id
      action
      details
      timestamp
    }
  }
`;

// Custom hooks for usage in components

export function useTasks() {
  const completed = useReactiveVar(completedFilterVar);
  const priority = useReactiveVar(priorityFilterVar);

  return useQuery(GET_TASKS, {
    variables: { completed, priority },
    fetchPolicy: "network-only",
  });
}

export function useCreateTask() {
  return useMutation<{ createTask: Task }, NewTask>(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
}

export function useUpdateTask() {
  return useMutation<{ updateTask: Task }, { id: number } & UpdateTaskInput>(
    UPDATE_TASK,
    {
      refetchQueries: [{ query: GET_TASKS }],
    }
  );
}

export function useDeleteTask() {
  return useMutation<{ deleteTask: boolean }, { id: number }>(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
}
