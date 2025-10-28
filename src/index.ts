import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./datasource";
import airportRouter from "./routes/airport";
import path from "path";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function start() {
  await AppDataSource.initialize();
  console.log("DataSource initialized");

  const app = express();
  app.use(express.json());
  app.use(morgan("combined"));

  app.use("/api/airport", airportRouter);

  app.get("/", (_, res) => res.send("Airport API running"));

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
