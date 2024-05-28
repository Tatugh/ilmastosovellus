import { fetchUserLatLong } from "./userAPI.js";

const BASE_WEATHER_URL = "https://api.open-meteo.com/v1/forecast?";
const HARDCODED_WEATHER_QUERY =
  "https://geocoding-api.open-meteo.com/v1/search?name=Mikkeli&current=temperature_2m";
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

//fetches the most recent available weather data
export async function fetchCurrentWeatherData(query) {
  try {
    //url parameters to use for query
    let params = {
      latitude: userLocData.latitude,
      longitude: userLocData.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "sunshine_duration",
        "precipitation",
        "rain",
        "showers",
        "snowfall",
        "wind_speed_10m",
        "weather_code",
      ],
    };
    if (query.Longitude !== undefined || query.Latitude !== undefined) {
      params = {
        latitude: query.Latitude,
        longitude: query.Longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "sunshine_duration",
          "precipitation",
          "rain",
          "showers",
          "snowfall",
          "wind_speed_10m",
          "weather_code",
        ],
      };
    }
    const CURRENT_WEATHER_QUERY = await _URLParamAggregator(
      BASE_WEATHER_URL,
      params
    );
    const curWeatherData = await _fetchData(CURRENT_WEATHER_QUERY);
    if (!curWeatherData) {
      throw new Error("Could not fetch current weather data");
    }
    //create a weatherCondition variable and set its value to the corresponding str value of the weather_code variable
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
    //url parameters to use for query
    /*
        example url w/ location longitude and latitude query
        http://localhost:3001/api/weather/hourly?latitude=30.63445&longitude=24.23145 
        */
    let params = {
      latitude: userLocData.latitude,
      longitude: userLocData.longitude,
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation_probability",
        "precipitation",
        "wind_speed_10m",
      ],
      forecast_days: 2,
    };
    if (query.Longitude !== undefined && query.Latitude !== undefined) {
      params.latitude = query.Latitude;
      params.longitude = query.Longitude;
    }
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
    //url parameters to use for query
    let params = {
      latitude: userLocData.latitude,
      longitude: userLocData.longitude,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "daylight_duration",
        "sunshine_duration",
        "uv_index_max",
        "precipitation_probability_max",
        "wind_speed_10m_max",
        "weather_code",
      ],
    };
    if (query.Longitude !== undefined && query.Latitude !== undefined) {
      params.longitude = query.Longitude;
      params.latitude = query.Latitude;
    }
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
