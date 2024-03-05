import express from "express";
import * as weatherAPI from './apis/weatherAPI.js';

const router = express.Router();
  
//for current weather data
router.get('/api/weather/current', async(req, res) => {
    const weatherData = await weatherAPI.fetchCurrentWeatherData();
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


  export default router;