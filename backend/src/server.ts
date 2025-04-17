import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createSchema } from "./schema.ts"; 
import { AppDataSource } from "../ormconfig.ts"; 


dotenv.config();

const PORT = process.env.PORT || 3000;

const main = async () => {
  // Initialize TypeORM DataSource
  await AppDataSource.initialize();
  console.log("Connected to PostgreSQL via TypeORM");

  // Build GraphQL schema
  const schema = await createSchema();

  // Set up Express and Apollo Server
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  // Optional: Log all incoming requests (for debugging purposes)
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method}${req.body} ${req.url}`);
    next();
  });

  // Apollo Server setup
  const server = new ApolloServer({ schema });
  await server.start();

  app.use(
    "/graphql",
    express.json(), // Needed for Apollo's express middleware
    expressMiddleware(server)
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

main().catch((err) => {
  console.error("Server failed to start:", err);
});

export { AppDataSource }; // Export for use in other files if needed