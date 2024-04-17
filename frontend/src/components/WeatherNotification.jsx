import React, { useState, useEffect } from 'react';

const WeatherNotification = ({ weatherCode }) => {
    const [weatherNotification, setWeatherNotification] = useState("");
    useEffect(() => {

        const notif = async () =>{
                
            switch (weatherCode){
                case 0:
                    setWeatherNotification("Clear sky")
                    break;
                case 1:
                    setWeatherNotification("Mainly clear")
                    break;
                case 2:
                    setWeatherNotification("Partly cloudy")
                    break;
                case 3:
                    setWeatherNotification("Overcast")
                    break;
                case 45:
                    setWeatherNotification("Fog")
                    break;
                case 48:
                    setWeatherNotification("Depositing rime fog")
                    break;
                case 51:
                    setWeatherNotification("Light Drizzle")
                    break;
                case 53:
                    setWeatherNotification("Moderate Drizzle")
                    break;
                case 55:
                    setWeatherNotification("Dense drizzle")
                    break;
                case 56:
                    setWeatherNotification("Light freezing drizzle")
                    break;
                case 57:
                    setWeatherNotification("Dense freezing drizzle")
                    break;
                case 61:
                    setWeatherNotification("Slight rain")
                    break;
                case 63:
                    setWeatherNotification("Moderate rain")
                    break;
                case 65:
                    setWeatherNotification("Heavy rain")
                    break;
                case 66:
                    setWeatherNotification("Light freezing rain")
                    break;
                case 67:
                    setWeatherNotification("Dense freezing rain")
                    break;
                case 71:
                    setWeatherNotification("Slight snowfall")
                    break;
                case 73:
                    setWeatherNotification("Moderate snowfall")
                    break;
                case 75:
                    setWeatherNotification("Heavy snowfall")
                    break;
                case 77:
                    setWeatherNotification("Snow grains")
                    break;
                case 80:
                    setWeatherNotification("Slight rain showers")
                    break;
                case 81:
                    setWeatherNotification("Moderate rain showers")
                    break;
                case 82:
                    setWeatherNotification("Violent rain showers")
                    break;
                case 85:
                    setWeatherNotification("Slight snow showers")
                    break;
                case 86:
                    setWeatherNotification("Heavy snow showers")
                    break;
                case 95:
                    setWeatherNotification("Slight/Moderate thunderstorm")
                    break;
                case 96:
                    setWeatherNotification("Thunderstorm with slight hail")
                    break;
                case 99:
                    setWeatherNotification("Thunderstorm with heavy hail")
                    break;
                default:
                    setWeatherNotification("Excellent Weather")
                    break;
            }
        }
        notif();
      }, [weatherCode]); // Empty dependency array ensures this runs only once

  return (
    <div className='weatherItems'>
      <p>Weather Notification: {weatherNotification}</p>
    </div>
  );
};

export default WeatherNotification;
