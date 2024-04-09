import './App.css'
import * as weatherAPIHelper from './apis/WeatherAPIHelper.jsx'
import LocationDisplay from './components/location.jsx'
import DailyWeather from './components/DailyWeather.jsx'
import HourlyWeather from './components/HourlyWeather.jsx'


function App() {
  return (
    <>
      <div className="content-container">
      <LocationDisplay />
      <div className='content weatherItems w-fit mx-auto px-1 rounded-md '>
        <h2 className=' mb-1'>Current Weather Information</h2>
        <div className='border-1 border-solid border-black w-full'></div>
        <weatherAPIHelper.CurrentWeather/>
      </div>
        <div className="content">
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