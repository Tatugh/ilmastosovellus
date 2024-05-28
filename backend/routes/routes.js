import express from "express";
import * as weatherAPI from "./apis/weatherAPI.js";
import verifyCache, { cache } from "../middleware/VerifyCache.js";
import { pathFinal } from "../utils/utils.js";
const router = express.Router();

//for current weather data
router.get("/api/weather/current", verifyCache, async (req, res) => {
  const LocationQuery = {
    Longitude: req.query.longitude,
    Latitude: req.query.latitude,
  };
  console.log(LocationQuery);
  const weatherData = await weatherAPI.fetchCurrentWeatherData(LocationQuery);
  const pathId = pathFinal(req.path) + req.query.name;
  cache.set(pathId, weatherData);
  res.send(weatherData);
});

//for hourly weather data
router.get("/api/weather/hourly", verifyCache, async (req, res) => {
  const LocationQuery = {
    Longitude: req.query.longitude,
    Latitude: req.query.latitude,
  };
  const pathId = pathFinal(req.path) + req.query.name;
  const weatherData = await weatherAPI.fetchHourlyWeatherData(LocationQuery);
  cache.set(pathId, weatherData);
  res.send(weatherData);
});

//for daily weather data
router.get("/api/weather/daily", verifyCache, async (req, res) => {
  const LocationQuery = {
    Longitude: req.query.longitude,
    Latitude: req.query.latitude,
  };
  const pathId = pathFinal(req.path) + req.query.name;
  const weatherData = await weatherAPI.fetchDailyWeatherData(LocationQuery);
  cache.set(pathId, weatherData);
  res.send(weatherData);
});

//for list of locations in the app
router.post("/api/location/data", async (req, res) => {
  const searchTerm = req.query.q ?? "";
  const locationData = await weatherAPI.fetchLocations(searchTerm);
  res.send(locationData);
});

export default router;
