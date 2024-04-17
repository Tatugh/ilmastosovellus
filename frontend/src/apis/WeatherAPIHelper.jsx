import { useState, useEffect } from "react";
import aurinko from '../assets/aurinko.png'
import pilvi from '../assets/pilvi.png'

//fetches from current weather data from backend
function CurrentWeather({ locationData, setWeatherCode }) {
  const [weather, setWeather] = useState(0);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        //get location data
        let response;
        //if user has selected a location different from their geolocation, then get the selected location's weather data
        if (locationData.longitude !== undefined && locationData.latitude !== undefined){
          response = await fetch(`http://localhost:3001/api/weather/current?name=${locationData.name}&longitude=${locationData.longitude}&latitude=${locationData.latitude}`);          
        } else{
          response = await fetch(`http://localhost:3001/api/weather/current?name=""`);
        }
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const curWeather = await response.json();//get current weather from JSON
        setWeather(curWeather.current);
        setWeatherCode(curWeather.current.weather_code)
        console.log(curWeather.current.weather_code)
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
  }, [locationData]); // Empty dependency array ensures this runs only once

  if (weather)
    return <>
       {/* <div className="relative mx-auto text-left bg-slate-400 p-2 w-fit h-fit box-border rounded-3xl border-1 border-slate-800 "> */}
        <div className="text-center">
            <div className="flex flex-row text-justify justify-end"><img className="weather-icon w-24" src={weather.weather_code <= 1 ? aurinko : pilvi}></img></div>
            <p id="current-temperature">{weather.temperature_2m} °C </p>
            <p>Wind Speed: {weather.wind_speed_10m} km/h</p>
            <p className="">Precipitation: {weather.precipitation} mm</p>
            <p>Humidity: {weather.relative_humidity_2m} %</p>
        </div>
    </>
  else
    return <div>Ei sää tietoa</div>;
}

export default CurrentWeather;