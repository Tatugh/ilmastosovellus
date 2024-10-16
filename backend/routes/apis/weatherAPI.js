import { fetchUserLatLong } from "./userAPI.js";

const BASE_WEATHER_URL = "https://api.open-meteo.com/v1/forecast?";
const HARDCODED_WEATHER_QUERY =
  "https://api.open-meteo.com/v1/forecast?latitude=61.6886&longitude=27.2723&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FMoscow";
const userLocData = await fetchUserLatLong();
const BASE_LOCATION_URL = "https://geocoding-api.open-meteo.com/v1/search?";

//weather code is int, return a corresponding str equivalent for easy understanding
function _weatherCodeHandler(weather_code) {
  let weatherCondition;
  switch (weather_code) {
    case 0:
      weatherCondition = "Clear sky";
      break;
    case 1:
      weatherCondition = "Mainly clear";
      break;
    case 2:
      weatherCondition = "Partly cloudy";
      break;
    case 3:
      weatherCondition = "Overcast";
      break;
    case 45:
      weatherCondition = "Fog";
      break;
    case 48:
      weatherCondition = "Depositing rime fog";
      break;
    case 51:
      weatherCondition = "Light Drizzle";
      break;
    case 53:
      weatherCondition = "Moderate Drizzle";
      break;
    case 55:
      weatherCondition = "Dense drizzle";
      break;
    case 56:
      weatherCondition = "Light freezing drizzle";
      break;
    case 57:
      weatherCondition = "Dense freezing drizzle";
      break;
    case 61:
      weatherCondition = "Slight rain";
      break;
    case 63:
      weatherCondition = "Moderate rain";
      break;
    case 65:
      weatherCondition = "Heavy rain";
      break;
    case 66:
      weatherCondition = "Light freezing rain";
      break;
    case 67:
      weatherCondition = "Dense freezing rain";
      break;
    case 71:
      weatherCondition = "Slight snowfall";
      break;
    case 73:
      weatherCondition = "Moderate snowfall";
      break;
    case 75:
      weatherCondition = "Heavy snowfall";
      break;
    case 77:
      weatherCondition = "Snow grains";
      break;
    case 80:
      weatherCondition = "Slight rain showers";
      break;
    case 81:
      weatherCondition = "Moderate rain showers";
      break;
    case 82:
      weatherCondition = "Violent rain showers";
      break;
    case 85:
      weatherCondition = "Slight snow showers";
      break;
    case 86:
      weatherCondition = "Heavy snow showers";
      break;
    case 95:
      weatherCondition = "Slight/Moderate thunderstorm";
      break;
    case 96:
      weatherCondition = "Thunderstorm w/ slight hail";
      break;
    case 99:
      weatherCondition = "Thunderstorm w/ heavy hail";
      break;
    default:
      weatherCondition = "Excellent Weather";
      break;
  }
  return weatherCondition;
}

//fetches location data w/ given query and returns 5 locations matching the given name
export async function fetchLocations(query) {
  try {
    if (query == "") {
      return;
    }
    const params = {
      name: query,
    };
    const LOCATION_DATA_QUERY = await _URLParamAggregator(
      BASE_LOCATION_URL,
      params
    );
    const locationData = await _fetchData(LOCATION_DATA_QUERY);
    if (!locationData) {
      throw new Error("Could not find locations");
    }
    return locationData;
  } catch (error) {
    console.log(error);
  }
}
//private function which creates a weather query based on given url and parameters (see HARDCODED_WEATHER_QUERY for example)
async function _URLParamAggregator(url, params) {
  const queryString = new URLSearchParams(params).toString();
  const finalUrl = url + queryString;
  return finalUrl;
}

//private function which attempts to fetch weather data based on given query and return it
async function _fetchData(WEATHER_QUERY) {
  try {
    const response = await fetch(WEATHER_QUERY);
    if (!response.ok) {
      console.warn("First fetch failed. Trying fallback URL...");
      const fallbackResponse = await fetch(HARDCODED_WEATHER_QUERY);
      if (!fallbackResponse.ok) {
        throw new Error(
          "Critical ERROR: Fallback fetch failed, no data can be retrieved"
        );
      }
      console.log("Fallback weather data fetched succesfully");
      return await fallbackResponse.json();
    }
    console.log("Fetched weather data succesfully");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

function getParams(query) {
  const baseParams = {
    latitude: query.Latitude || userLocData.latitude,
    longitude: query.Longitude || userLocData.longitude,
  };

  switch (query.weatherType) {
    case "Current":
      return {
        ...baseParams,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "precipitation",
          "rain",
          "wind_speed_10m",
          "weather_code",
        ],
      };
    case "Hourly":
      return {
        ...baseParams,
        hourly: [
          "temperature_2m",
          "relative_humidity_2m",
          "precipitation_probability",
          "precipitation",
          "wind_speed_10m",
        ],
        forecast_days: 2,
      };
    case "Daily":
      return {
        ...baseParams,
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_probability_max",
          "wind_speed_10m_max",
          "weather_code",
        ],
      };
    default:
      throw new Error("Invalid weather data type");
  }
}

//fetches the most recent available weather data
export async function fetchCurrentWeatherData(query) {
  try {
    const params = getParams(query);
    const CURRENT_WEATHER_QUERY = await _URLParamAggregator(
      BASE_WEATHER_URL,
      params
    );
    const curWeatherData = await _fetchData(CURRENT_WEATHER_QUERY);
    if (!curWeatherData) {
      throw new Error("Could not fetch current weather data");
    }
    const weather_code = curWeatherData.current.weather_code;
    curWeatherData.current.weather_condition =
      _weatherCodeHandler(weather_code);
    return curWeatherData;
  } catch (error) {
    console.log(error);
  }
}

//should return weather data for a 24 hour (or other) period of time, currently returns hourly data for a 24 hour period of time for 7 days (including current day)
export async function fetchHourlyWeatherData(query) {
  try {
    const params = getParams(query);
    const HOURLY_WEATHER_QUERY = await _URLParamAggregator(
      BASE_WEATHER_URL,
      params
    );
    const hourlyWeatherData = await _fetchData(HOURLY_WEATHER_QUERY);
    if (!hourlyWeatherData) {
      throw new Error("Could not fetch hourly weather data");
    }
    return hourlyWeatherData;
  } catch (error) {
    console.log(error);
  }
}

//fetches weather data for 7 days (including current day), estimates are for whole day (NO HOURLY)
export async function fetchDailyWeatherData(query) {
  try {
    const params = getParams(query);
    const DAILY_WEATHER_QUERY = await _URLParamAggregator(
      BASE_WEATHER_URL,
      params
    );
    const dailyWeatherData = await _fetchData(DAILY_WEATHER_QUERY);
    if (!dailyWeatherData) {
      throw new Error("Could not fetch daily weather data");
    }
    return dailyWeatherData;
  } catch (error) {
    console.log(error);
  }
}

//single function to fetch Current/Hourly/Daily weather data based on given weather type
export async function fetchWeatherData(query) {
  try {
    switch (query.weatherType) {
      case "Current":
        return fetchCurrentWeatherData(query);
      case "Hourly":
        return fetchHourlyWeatherData(query);
      case "Daily":
        return fetchDailyWeatherData(query);
      default:
        throw new Error("Invalid weather data type");
    }
  } catch (error) {
    console.log(error);
  }
}
