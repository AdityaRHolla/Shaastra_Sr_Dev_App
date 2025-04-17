import { Resolver, Query, Arg, Int } from "type-graphql";
import { TaskHistory } from "../entities/TaskHistory.js";
import { AppDataSource } from "../server.js";

const taskHistoryRepo = AppDataSource.getRepository(TaskHistory);

@Resolver()
export class TaskHistoryResolver {
  @Query(() => [TaskHistory])
  async taskHistory(@Arg("taskId", () => Int) taskId: number) {
    return taskHistoryRepo.find({
      where: { task: { id: taskId } },
      order: { timestamp: "DESC" },
    });
  }
}
