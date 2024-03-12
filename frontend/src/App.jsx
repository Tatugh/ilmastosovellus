import { useState } from 'react'
import './App.css'
import * as weatherAPIHelper from './apis/WeatherAPIHelper.jsx'
import DailyWeather from './components/DailyWeather.jsx'
import HourlyWeather from './components/HourlyWeather.jsx'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="content-container">
      <h1>Sähkö</h1>
      <h2>Current Weather Information:</h2>
      <div className="weather-container">
          <weatherAPIHelper.CurrentWeather/>
         </div>
         
        <div className="content">
          <p>Tässä on muuta tekstiä ja tietoja</p>
          <p>apina</p>
          <DailyWeather></DailyWeather>
        </div>
        <div className="">
          <p>Aaaaa</p>
          <HourlyWeather/>
        </div>
      </div>
    </>
  )
}

export default App