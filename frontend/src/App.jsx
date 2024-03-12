import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as weatherAPIHelper from './apis/WeatherAPIHelper.jsx'
import DailyWeather from './components/DailyWeather.jsx'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="content-container">
      <h1 className="">Sähkö</h1>
      <h2>Current Weather Information:</h2>
        <weatherAPIHelper.CurrentWeather/>
         
        <div className="content">
          <p>Tässä on muuta tekstiä ja tietoja</p>
          <p className=' text-gray-400'>apina</p>
          <DailyWeather></DailyWeather>
        </div>
      </div>
    </>
  )
}

export default App