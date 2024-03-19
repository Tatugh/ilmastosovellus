import { fetchUserLatLong } from "./userAPI.js";

const BASE_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?';
const HARDCODED_WEATHER_QUERY = 'https://geocoding-api.open-meteo.com/v1/search?name=Mikkeli&current=temperature_2m';
const userLocData = await fetchUserLatLong();

//private function which creates a weather query based on given url and parameters (see HARDCODED_WEATHER_QUERY for example)
async function _URLParamAggregator(url, params){
    const queryString = new URLSearchParams(params).toString();
    const finalUrl = url + queryString;
    return finalUrl;
}

//private function which attempts to fetch weather data based on given query and return it
async function _fetchData(WEATHER_QUERY){
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

//fetches the most recent available weather data
export async function fetchCurrentWeatherData() {
    try {
        //url parameters to use for query
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "wind_speed_10m"],
        };
        const CURRENT_WEATHER_QUERY = await _URLParamAggregator(BASE_WEATHER_URL, params);
        const curWeatherData = await _fetchData(CURRENT_WEATHER_QUERY) ;
        if (!curWeatherData){
            throw new Error("Could not fetch current weather data");
        }
        return curWeatherData;
    } catch (error) {
        console.log(error);
    }
}

//should return weather data for a 24 hour (or other) period of time, currently returns hourly data for a 24 hour period of time for 7 days (including current day) 
export async function fetchHourlyWeatherData() {
    try {
        //url parameters to use for query
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "wind_speed_10m"],
          "forecast_days": 2
        };
        const HOURLY_WEATHER_QUERY = await _URLParamAggregator(BASE_WEATHER_URL, params);
        const hourlyWeatherData = await _fetchData(HOURLY_WEATHER_QUERY);
        if (!hourlyWeatherData){
            throw new Error("Could not fetch hourly weather data");
        }
        return hourlyWeatherData;
    } catch (error) {
        console.log(error);
    }
}


//fetches weather data for 7 days (including current day), estimates are for whole day (NO HOURLY)
export async function fetchDailyWeatherData() {
    try {
        //url parameters to use for query
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "daily": ["temperature_2m_max", "temperature_2m_min", ,"sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "precipitation_probability_max","wind_speed_10m_max"]
        };
        const DAILY_WEATHER_QUERY = await _URLParamAggregator(BASE_WEATHER_URL, params);
        const dailyWeatherData = await _fetchData(DAILY_WEATHER_QUERY);
        if (!dailyWeatherData){
            throw new Error("Could not fetch daily weather data");
        }
        return dailyWeatherData;
    } catch (error) {
        console.log(error);
    }
}