import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as weatherAPIHelper from './apis/WeatherAPIHelper.jsx'
import Button from "react-bootstrap/Button";

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="content-container">
      <div className='location-container'>
      <h1 className='current-location'>Mikkeli</h1>
      <button className="btn-info">+</button>
      </div>
      <h2>Current Weather Information:</h2>
      <div className="weather-container">
          <weatherAPIHelper.CurrentWeather/>
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