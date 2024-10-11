import { useEffect, useState } from "react";
import axios from "axios";
import aurinko from "../assets/aurinko.png";
import pilvi from "../assets/pilvi.png";
import { TiArrowUpThick } from "react-icons/ti";
import { TiArrowDownThick } from "react-icons/ti";
import { GiWaterDrop } from "react-icons/gi";
import { FiWind } from "react-icons/fi";

const DailyWeather = ({ locationData, port }) => {
  const [date, setDate] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [weatherCode, setWeatherCode] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [rainChance, setRainChance] = useState([]);

  useEffect(() => {
    const check = async () => {
      try {
        let response;
        if (
          locationData.longitude !== undefined &&
          locationData.latitude !== undefined
        ) {
          response = await axios.get(
            `http://localhost:${port}/api/weather/daily?name=${locationData.name}&longitude=${locationData.longitude}&latitude=${locationData.latitude}`
          );
        } else {
          response = await axios.get(
            `http://localhost:${port}/api/weather/daily?name=""`
          );
        }
        const responseResult = await response.data.daily;
        setDate(responseResult.time);
        setTempMax(responseResult.temperature_2m_max);
        setTempMin(responseResult.temperature_2m_min);
        setWeatherCode(responseResult.weather_code);
        setWindSpeed(responseResult.wind_speed_10m_max);
        setRainChance(responseResult.precipitation_probability_max);
      } catch (error) {
        console.log(error);
      }
    };
    check();
    //fetch data every 15 minutes to limit API calls and to keep user up-to-date on their current weather
    const INTERVAL = 60 * 60000; // 60 minutes in milliseconds
    const weatherUpdateInterval = setInterval(check, INTERVAL);
    return () => {
      clearInterval(weatherUpdateInterval); // Clean up the interval when the component unmounts
    };
  }, [locationData]); // locationData ensures proper updating on data changes

  return (
    <div className="weatherTable-container">
      <div className="weatherTable">
        {date.map((item, index) => {
          return (
            <div key={item} className="weatherItems">
              <h3 className="pb-2 font-semibold">
                {new Date(item)
                  .toLocaleDateString("en-EN", { weekday: "long" })
                  .slice(0, 2)
                  .toUpperCase()}
              </h3>
              <img
                className="weather-icon"
                src={weatherCode[index] <= 2 ? aurinko : pilvi}
              ></img>
              <div className="weatherItems-content">
                <div className="rain-chance">
                  <FiWind size={"1.5rem"} />
                  <p className="pl-2">
                    {windSpeed[index]}
                    <small>km/h</small>
                  </p>
                </div>
                <div className="rain-chance">
                  <GiWaterDrop size={"1.5rem"} className="text-blue-200" />
                  <p className="pl-2">
                    {rainChance[index]}
                    <small>%</small>
                  </p>
                </div>
                <div className="rain-chance text-red-400">
                  <TiArrowUpThick size={"1.5rem"} />
                  <p className="pl-2 font-extrabold ">
                    {Math.round(tempMax[index])} °C
                  </p>
                </div>
                <div className="rain-chance text-sky-300">
                  <TiArrowDownThick size={"1.5rem"} />
                  <p className="pl-2 font-extrabold text-blue-400">
                    {Math.round(tempMin[index])} °C
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyWeather;
