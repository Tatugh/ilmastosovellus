import express from "express";
import * as weatherAPI from './apis/weatherAPI.js';

const router = express.Router();
  
router.get('/api/weather', async(req, res) => {
    const weatherData = await weatherAPI.fetchCurrentWeatherData();
    res.send(weatherData);
    //res.render("index");
})  


  export default router;