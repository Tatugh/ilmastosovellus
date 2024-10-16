// Import necessary modules
import { expect } from "../src/deps.js";
import * as weatherAPI from "../routes/apis/weatherAPI.js";

//weather API test cases
describe("Fetching weather data and checking responses", () => {
  const LocationQuery = {
    //Mikkeli South-Savo coordinates
    Longitude: 27.2723,
    Latitude: 61.6886,
  };
  // fetch current data and check that response matches expected values
  it("should fetch latest temp, humidity, precipitation, rain and wind speed", async () => {
    LocationQuery["weatherType"] = "Current";
    const weatherData = await weatherAPI.fetchWeatherData(LocationQuery);
    expect(weatherData.current.temperature_2m).to.exist;
    expect(weatherData.current.relative_humidity_2m).to.exist;
    expect(weatherData.current.apparent_temperature).to.exist;
    expect(weatherData.current.precipitation).to.exist;
    expect(weatherData.current.rain).to.exist;
    expect(weatherData.current.wind_speed_10m).to.exist;
    expect(weatherData.current.weather_code).to.exist;
  });

  // fetch hourly data and check that response matches expected values
  it("should fetch hourly temp, humidity, precipitation, precipitation probability, wind speed", async () => {
    LocationQuery["weatherType"] = "Hourly";
    const weatherData = await weatherAPI.fetchWeatherData(LocationQuery);
    expect(weatherData.hourly.temperature_2m).to.exist;
    expect(weatherData.hourly.relative_humidity_2m).to.exist;
    expect(weatherData.hourly.precipitation_probability).to.exist;
    expect(weatherData.hourly.wind_speed_10m).to.exist;
  });

  // fetch daily data and check that response matches expected values
  it("should fetch daily temp max/min, humidity max/min, precipitation, precipitation probability, wind speed", async () => {
    LocationQuery["weatherType"] = "Daily";
    const weatherData = await weatherAPI.fetchWeatherData(LocationQuery);
    expect(weatherData.daily.temperature_2m_max).to.exist;
    expect(weatherData.daily.temperature_2m_min).to.exist;
    expect(weatherData.daily.precipitation_probability_max).to.exist;
    expect(weatherData.daily.wind_speed_10m_max).to.exist;
    expect(weatherData.daily.weather_code).to.exist;
  });
});
