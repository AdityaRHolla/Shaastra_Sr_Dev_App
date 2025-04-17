import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolver/TaskResolver.ts"; 

export const createSchema = () =>
  buildSchema({
    resolvers: [TaskResolver], 
    validate: true,
  });
