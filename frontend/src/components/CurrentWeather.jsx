import { useState, useEffect } from "react";
import aurinko from "../assets/aurinko.png";
import pilvi from "../assets/pilvi.png";

//fetches from current weather data from backend
function CurrentWeather({ locationData, port }) {
  const [weather, setWeather] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState("");

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        //get location data
        let response;
        //if user has selected a location different from their geolocation, then get the selected location's weather data
        if (
          locationData.longitude !== undefined &&
          locationData.latitude !== undefined
        ) {
          response = await fetch(
            `http://localhost:${port}/api/weather?name=${locationData.name}&longitude=${locationData.longitude}&latitude=${locationData.latitude}&weatherType=Current`
          );
        } else {
          response = await fetch(
            `http://localhost:${port}/api/weather?name=""&weatherType=Current`
          );
        }
        if (!response.ok) {
          throw new Error("Network response error");
        }
        const curWeather = await response.json(); //get current weather from JSON
        setWeather(curWeather.current);
        setWeatherCondition(curWeather.current.weather_condition);
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    };
    fetchCurrentWeather();
    //fetch data every 15 minutes to limit API calls and to keep user up-to-date on their current weather
    const INTERVAL = 15 * 60000; // 15 minutes in milliseconds
    const weatherUpdateInterval = setInterval(fetchCurrentWeather, INTERVAL);
    return () => {
      clearInterval(weatherUpdateInterval); // Clean up the interval when the component unmounts
    };
  }, [locationData]); // locationData ensures proper updating on data changes

  if (weather)
    return (
      <>
        {/* <div className="relative mx-auto text-left bg-slate-400 p-2 w-fit h-fit box-border rounded-3xl border-1 border-slate-800 "> */}
        <div className="text-center">
          <div className="flex flex-row text-justify justify-end">
            <img
              className="weather-icon w-24"
              src={weather.weather_code <= 2 ? aurinko : pilvi}
            ></img>
          </div>
          <p id="current-temperature">{weather.temperature_2m} °C </p>
          <p>Condition: {weatherCondition}</p>
          <p>Wind Speed: {weather.wind_speed_10m} km/h</p>
          <p className="">Precipitation: {weather.precipitation} mm</p>
          <p>Humidity: {weather.relative_humidity_2m} %</p>
        </div>
      </>
    );
  else return <div>No weather data!</div>;
}

export default CurrentWeather;
