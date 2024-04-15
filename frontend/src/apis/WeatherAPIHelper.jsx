import { useState, useEffect } from "react";
import aurinko from '../assets/aurinko.png'
import pilvi from '../assets/pilvi.png'

//fetches from current weather data from backend
function CurrentWeather() {
  const [weather, setWeather] = useState(0);
  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const longitude = 27.27227;
        const latitude = 61.68857;
        const response = await fetch(`http://localhost:3001/api/weather/current?q={"longitude": ${longitude}, "latitude": ${latitude}}`);
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
  if (weather)
    return <>
       {/* <div className="relative mx-auto text-left bg-slate-400 p-2 w-fit h-fit box-border rounded-3xl border-1 border-slate-800 "> */}
        <div className="text-left">
        <div className="flex flex-row text-justify justify-end"><img className="w-14 mr-1 absolute" src={weather.sunshine_duration ? aurinko : pilvi}></img></div>
        Lämpöaste: {weather.temperature_2m} °C <br/>
        Kosteus: {weather.relative_humidity_2m} %<br/>
        Tuulen Nopeus: {weather.wind_speed_10m} km/h<br/>
        Precipitation: {weather.precipitation} mm<br/>
        </div>
    </>
  else
    return <div>Ei sää tietoa</div>;
}

export {CurrentWeather};