import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Task } from "../entities/Task.ts";
import { GraphQLError } from "graphql";
import { AppDataSource } from "../../ormconfig.ts";

const taskRepo = AppDataSource.getRepository(Task);

@Resolver()
export class TaskResolver {
  // Get all tasks based on filters
  @Query(() => [Task])
  async tasks(
    @Arg("completed", () => Boolean, { nullable: true }) completed?: boolean,
    @Arg("priority", () => String, { nullable: true }) priority?: string
  ): Promise<Task[]> {
    const where: any = {};

    if (completed !== undefined) where.completed = completed;
    if (priority) where.priority = priority;

    return taskRepo.find({ where });
  }

  // Create task
  @Mutation(() => Task)
  async createTask(
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string,
    @Arg("priority", () => String) priority: string,
    @Arg("completed", () => Boolean, { defaultValue: false }) completed: boolean
  ): Promise<Task> {
    if (!title || !description || !priority || completed === undefined) {
      throw new GraphQLError("All fields are required", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }

    try {
      const task = taskRepo.create({ title, description, priority, completed });
      await taskRepo.save(task);
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new GraphQLError("Failed to create task", {
        extensions: { code: "DATABASE_ERROR" },
      });
    }
  }

  // Update task
  @Mutation(() => Task)
  async updateTask(
    @Arg("id", () => Number) id: number,
    @Arg("title", () => String, { nullable: true }) title?: string,
    @Arg("description", () => String, { nullable: true }) description?: string,
    @Arg("priority", () => String, { nullable: true }) priority?: string,
    @Arg("completed", () => Boolean, { nullable: true }) completed?: boolean
  ): Promise<Task> {
    try {
      const task = await taskRepo.findOneBy({ id });
      if (!task) throw new GraphQLError("Task not found");

      // Update fields only if provided
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (priority !== undefined) task.priority = priority;
      if (completed !== undefined) task.completed = completed;

      await taskRepo.save(task);
      return task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new GraphQLError("Failed to update task");
    }
  }

  // Delete task
  @Mutation(() => Boolean)
  async deleteTask(@Arg("id", () => Number) id: number): Promise<boolean> {
    try {
      const result = await taskRepo.delete(id);
      if (result.affected === 0) {
        throw new GraphQLError("Task not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new GraphQLError("Failed to delete task", {
        extensions: { code: "DATABASE_ERROR" },
      });
    }
  }
}
