import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as weatherAPIHelper from './apis/WeatherAPIHelper.jsx'

function App() {
  const [count, setCount] = useState(0)
  const curWeather = weatherAPIHelper.currentWeatherUpdater();
  return (
    <>
      <div className="content-container">
      <h1>Sähkö</h1>
      {console.log(curWeather)}
      <h2>Current Weather Information:</h2>
      <div className="weather-container">
         Temperature: {curWeather.temperature_2m} °C <br/>
         Humidity: {curWeather.relative_humidity_2m} %<br/>
         Wind Speed: {curWeather.wind_speed_10m} km/h<br/>
         Precipitation: {curWeather.precipitation} mm<br/>
         </div>
        <div className="content">
          <p> Tässä on muuta tekstiä ja tietoja</p>
          <p>apina</p>
        </div>
      </div>
    </>
  )
}

export default App