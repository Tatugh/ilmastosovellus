import { fetchUserLatLong } from "./userAPI.js";

const BASE_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?';
const HARDCODED_WEATHER_QUERY = 'https://geocoding-api.open-meteo.com/v1/search?name=Mikkeli&current=temperature_2m';
const userLocData = await fetchUserLatLong();

async function URLParamAggregator(url, params){
    const queryString = new URLSearchParams(params).toString();
    const finalUrl = url + queryString;
    return finalUrl;
}

async function fetchData(WEATHER_QUERY){
    try {
        const response = await fetch(WEATHER_QUERY);
        if (!response.ok){
            console.warn('First fetch failed. Trying fallback URL...');
            const fallbackResponse = await fetch(HARDCODED_WEATHER_QUERY);
            if (!fallbackResponse.ok){
                throw new Error("Critical ERROR: Fallback fetch failed, no data can be retrieved");
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

export async function fetchCurrentWeatherData() {
    try {
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "wind_speed_10m"],
        };
        const CURRENT_WEATHER_QUERY = await URLParamAggregator(BASE_WEATHER_URL, params);
        const curWeatherData = fetchData(CURRENT_WEATHER_QUERY) ;
        if (!curWeatherData){
            throw new Error("Could not fetch current weather data");
        }
        return curWeatherData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchHourlyWeatherData() {
    try {
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "pressure_msl", "surface_pressure", "visibility", "wind_speed_10m", "wind_speed_80m", "uv_index", "is_day", "sunshine_duration"],
        };
        const HOURLY_WEATHER_QUERY = await URLParamAggregator(BASE_WEATHER_URL, params);
        const hourlyWeatherData = fetchData(HOURLY_WEATHER_QUERY);
        if (!hourlyWeatherData){
            throw new Error("Could not fetch hourly weather data");
        }
        return hourlyWeatherData;
    } catch (error) {
        console.log(error);
    }
}



export async function fetchDailyWeatherData() {
    try {
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "daily": ["temperature_2m_max", "temperature_2m_min", ,"sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "precipitation_probability_max","wind_speed_10m_max"]
        };
        const DAILY_WEATHER_QUERY = await URLParamAggregator(BASE_WEATHER_URL, params);
        const dailyWeatherData = fetchData(DAILY_WEATHER_QUERY);
        if (!dailyWeatherData){
            throw new Error("Could not fetch daily weather data");
        }
        return dailyWeatherData;
    } catch (error) {
        console.log(error);
    }
}