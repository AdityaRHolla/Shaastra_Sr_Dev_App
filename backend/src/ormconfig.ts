import { DataSource } from "typeorm";
import { Task } from "./entities/Task";
import { TaskHistory } from "./entities/TaskHistory";
import dotenv from "dotenv";

dotenv.config();

const DB_PASS = process.env.DB_PASS;

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: DB_PASS,
  database: process.env.DB_DATABASE || "application",
  entities: [Task, TaskHistory],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  logging: true,
});
