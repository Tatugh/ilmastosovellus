import express from "express";
import * as weatherAPI from './apis/weatherAPI.js';

const router = express.Router();
  
//for current weather data
router.get('/api/weather/current', async(req, res) => {
    const Longitude = req.query.longitude;
    const Latitude = req.query.latitude;
    const Location = {Longitude, Latitude}
    const weatherData = await weatherAPI.fetchCurrentWeatherData(Location);
    res.send(weatherData);
    //res.render("index");
})

//for hourly weather data
router.get('/api/weather/hourly', async(req, res) => {
  const weatherData = await weatherAPI.fetchHourlyWeatherData();
  res.send(weatherData);
  //res.render("index");
})  

//for daily weather data
router.get('/api/weather/daily', async(req, res) => {
  const weatherData = await weatherAPI.fetchDailyWeatherData();
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