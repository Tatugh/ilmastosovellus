import { useState, useEffect } from "react";

//fetches from current weather data from backend
function currentWeatherUpdater() {
  const [weather, setWeather] = useState(0);
  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/weather/current');
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const curWeather = await response.json();//get current weather from JSON
        setWeather(curWeather.current);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    };
    fetchCurrentWeather();
    //fetch data every 15 minutes to limit API calls and to keep user up-to-date on their current weather
    const INTERVAL = 15*60000; // 15 minutes in milliseconds
    const priceUpdateInterval = setInterval(fetchCurrentWeather, INTERVAL);
    return () => {
      clearInterval(priceUpdateInterval); // Clean up the interval when the component unmounts
    }
  }, []); // Empty dependency array ensures this runs only once
  return weather;
}

export {currentWeatherUpdater};