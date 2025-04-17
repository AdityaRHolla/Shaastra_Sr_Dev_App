import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Task } from "./src/entities/Task.js";

// const __filename = fileURLToPath(import.meta.url);  //Uncomment if you have any migrations
// const __dirname = dirname(__filename);

dotenv.config();

const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const DB_DATABASE = process.env.DB_DATABASE || "application";
const DB_USERNAME = process.env.DB_USERNAME || "postgres";

const config: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASS,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Task],
  // migrations: [__dirname + "src/migrations/*.{ts,js}"],   //I did not add this line because I do not have any migrations yet
};

export const AppDataSource = new DataSource(config);
