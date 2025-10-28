import { AppDataSource } from "./datasource";
import { Country } from "./entities/Country";
import { City } from "./entities/City";
import { Airport } from "./entities/Airport";

async function seed() {
  await AppDataSource.initialize();

  const countryRepo = AppDataSource.getRepository(Country);
  const cityRepo = AppDataSource.getRepository(City);
  const airportRepo = AppDataSource.getRepository(Airport);

  // Clear existing
  await airportRepo.clear();
  await cityRepo.clear();
  await countryRepo.clear();

  const india = countryRepo.create({
    name: "India",
    country_code_two: "IN",
    country_code_three: "IND",
    mobile_code: 91,
    continent_id: 1
  });
  await countryRepo.save(india);

  const agraCity = cityRepo.create({
    name: "Agra",
    country: india,
    country_id: india.id,
    is_active: true,
    lat: 27.18,
    long: 78.02
  });
  await cityRepo.save(agraCity);

  const agrAirport = airportRepo.create({
    icao_code: "VIAG",
    iata_code: "AGR",
    name: "Agra Airport / Agra Air Force Station",
    type: "medium_airport",
    latitude_deg: 27.157683,
    longitude_deg: 77.960942,
    elevation_ft: 551,
    city: agraCity,
    city_id: agraCity.id
  });
  await airportRepo.save(agrAirport);

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
