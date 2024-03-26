import express from "express";
import { nodeCache } from "../src/deps.js"
import * as weatherAPI from './apis/weatherAPI.js';
import verifyCache, {cache} from '../middleware/VerifyCache.js'
import { pathFinal } from "../utils/utils.js";
const router = express.Router();


//for current weather data
router.get('/api/weather/current', verifyCache, async(req, res) => {
    const LocationQuery = {
      "Longitude": req.query.longitude,
      "Latitude": req.query.latitude
    }
    const weatherData = await weatherAPI.fetchCurrentWeatherData(LocationQuery);
    const pathId = pathFinal(req.path);
    cache.set(pathId, weatherData);
    res.send(weatherData);
    //res.render("index");
  })
  
  //for hourly weather data
  router.get('/api/weather/hourly', verifyCache, async(req, res) => {
  const LocationQuery = {
    "Longitude": req.query.longitude,
    "Latitude": req.query.latitude,
  }
    const pathId = pathFinal(req.path);
    const weatherData = await weatherAPI.fetchHourlyWeatherData(LocationQuery);
    cache.set(pathId, weatherData);
    res.send(weatherData);
    //res.render("index");
  })  
  
  
  //for daily weather data
  router.get('/api/weather/daily', verifyCache, async(req, res) => {
  const LocationQuery = {
    "Longitude": req.query.longitude,
    "Latitude": req.query.latitude,
  }
    const pathId = pathFinal(req.path);
    const weatherData = await weatherAPI.fetchDailyWeatherData(LocationQuery);
    cache.set(pathId,weatherData)
    res.send(weatherData);
    //res.render("index");
    
})  

//for list of locations in the app
router.get('/api/location/data', async(req, res) => {
  const searchTerm = req.query.q ?? ""
  const locationData = await weatherAPI.fetchLocations(searchTerm);
  res.send(locationData);
})

  export default router;