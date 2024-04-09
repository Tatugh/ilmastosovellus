import { useState } from 'react'
import './App.css'
import * as weatherAPIHelper from './apis/WeatherAPIHelper.jsx'
import LocationDisplay from './components/location.jsx'
import DailyWeather from './components/DailyWeather.jsx'
import HourlyWeather from './components/HourlyWeather.jsx'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="content-container">
      <LocationDisplay />
      <h2>Current Weather Information:</h2>
        <weatherAPIHelper.CurrentWeather/>
         
        <div className="content">
          <p>Tässä on muuta tekstiä ja tietoja</p>
          <p className=' text-gray-400'>apina</p>
          <DailyWeather></DailyWeather>
        </div>
        <div className="content">
          <HourlyWeather/>
        </div>
      </div>
    </>
  )
}

export default App