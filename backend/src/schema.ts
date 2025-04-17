import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolver/TaskResolver.js";
import { TaskHistoryResolver } from "./resolver/TaskHistoryResolver.js";

export const createSchema = () =>
  buildSchema({
    resolvers: [TaskResolver, TaskHistoryResolver],
    validate: true,
  });
