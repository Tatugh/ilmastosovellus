import { json } from "express";
import { fetchUserLatLong } from "./userAPI.js";

const BASE_WEATHER_QUERY = 'https://api.open-meteo.com/v1/forecast?current=temperature_2m&';
const HARDCODED_WEATHER_QUERY = 'https://geocoding-api.open-meteo.com/v1/search?name=Mikkeli&current=temperature_2m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,pressure_msl,surface_pressure,visibility,wind_speed_10m,wind_speed_80m,uv_index,is_day,sunshine_duration&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max';

async function fetchFallbackWeatherData() {
    const fallbackResponse = await fetch(HARDCODED_WEATHER_QUERY);
    if (!fallbackResponse.ok) {
        throw new Error('Both fetch attempts failed.');
    }
    console.log("Fallback fetch successful!");
    return await fallbackResponse.json();
}

async function URLParamAggregator(url, params){
    const queryString = new URLSearchParams(params).toString();
    const finalUrl = url + queryString;
    return finalUrl;
}

export async function fetchCurrentWeatherData() {
    try {
        const userLocData = await fetchUserLatLong();
        const params = {
          "latitude": userLocData.latitude,
          "longitude": userLocData.longitude,
          "current": "temperature_2m",
          "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "pressure_msl", "surface_pressure", "visibility", "wind_speed_10m", "wind_speed_80m", "uv_index", "is_day", "sunshine_duration"],
          "daily": ["sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max"]
        };
        //const l = ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "pressure_msl", "surface_pressure", "visibility", "wind_speed_10m", "wind_speed_80m", "uv_index", "is_day", "sunshine_duration"].join()
        //console.log(params.hourly);
        const url = "https://api.open-meteo.com/v1/forecast?";

        const USER_WEATHER_QUERY = await URLParamAggregator(url, params);
        const response = await fetch(USER_WEATHER_QUERY);
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
