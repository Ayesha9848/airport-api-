import { Router, Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { Airport } from "../entities/Airport";
import NodeCache from "node-cache";

const router = Router();
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 5min cache

// validate IATA: 3 letters (case-insensitive)
const iataRegex = /^[A-Za-z]{3}$/;

router.get("/:iata_code", async (req: Request, res: Response) => {
  try {
    const raw = req.params.iata_code;
    if (!raw || !iataRegex.test(raw)) {
      return res.status(400).json({ error: "Invalid iata_code. Expect 3 letters (e.g. 'AGR')." });
    }
    const iata = raw.toUpperCase();

    // caching
    const cached = cache.get(iata);
    if (cached) return res.json(cached);

    // SINGLE TYPEORM query using relations to fetch Airport -> City -> Country
    const repo = AppDataSource.getRepository(Airport);
    const airport = await repo.findOne({
      where: { iata_code: iata },
      relations: ["city", "city.country"]
    });

    if (!airport) {
      return res.status(404).json({ error: "Airport not found." });
    }

    // Build response shape as required
    const response = {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: airport.city
            ? {
                id: airport.city.id,
                name: airport.city.name,
                country_id: airport.city.country ? airport.city.country.id : airport.city.country_id,
                is_active: airport.city.is_active ?? true,
                lat: airport.city.lat,
                long: airport.city.long
              }
            : null,
          country: airport.city && airport.city.country
            ? {
                id: airport.city.country.id,
                name: airport.city.country.name,
                country_code_two: airport.city.country.country_code_two,
                country_code_three: airport.city.country.country_code_three,
                mobile_code: airport.city.country.mobile_code,
                continent_id: airport.city.country.continent_id
              }
            : null
        }
      }
    };

    cache.set(iata, response);
    return res.json(response);
  } catch (err) {
    console.error("GET /api/airport/:iata_code error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
