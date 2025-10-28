import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import { City } from "./entities/City";
import { Airport } from "./entities/Airport";
import path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "../data/airports.db"),
  synchronize: true, // ok for dev; use migrations in prod
  logging: false,
  entities: [Country, City, Airport]
});
