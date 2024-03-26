import express from "express";
import { nodeCache } from "../src/deps.js"
import * as weatherAPI from './apis/weatherAPI.js';
import verifyCache, {cache} from '../middleware/VerifyCache.js'
import { pathFinal } from "../utils/utils.js";
const router = express.Router();


//for current weather data
router.get('/api/weather/current/', verifyCache, async(req, res) => {
    const weatherData = await weatherAPI.fetchCurrentWeatherData();
    const pathId = pathFinal(req.path);
    cache.set(pathId)
    res.send(weatherData);
    //res.render("index");
  })
  
  //for hourly weather data
  router.get('/api/weather/hourly', verifyCache, async(req, res) => {
    const pathId = pathFinal(req.path);
    const weatherData = await weatherAPI.fetchHourlyWeatherData();
    cache.set(pathId, weatherData);
    res.send(weatherData);
    //res.render("index");
  })  
  
  
  //for daily weather data
  router.get('/api/weather/daily/:id', verifyCache, async(req, res) => {
    const pathId = pathFinal(req.path);
    const weatherData = await weatherAPI.fetchDailyWeatherData();
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