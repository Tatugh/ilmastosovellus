import express from "express";
import * as weatherAPI from "./apis/weatherAPI.js";
import verifyCache, { cache } from "../middleware/VerifyCache.js";
const router = express.Router();

//single api endpoint for retrieving Current/Hourly/Daily weather data
router.get("/api/weather", verifyCache, async (req, res) => {
  const LocationQuery = {
    Longitude: req.query.longitude,
    Latitude: req.query.latitude,
    weatherType: req.query.weatherType,
  };
  const weatherData = await weatherAPI.fetchWeatherData(LocationQuery);
  cache.set(LocationQuery.weatherType, weatherData);
  res.send(weatherData);
});

//for list of locations in the app
router.post("/api/location/data", async (req, res) => {
  const searchTerm = req.query.q ?? "";
  const locationData = await weatherAPI.fetchLocations(searchTerm);
  res.send(locationData);
});

export default router;
