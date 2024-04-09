import  { useEffect, useState } from 'react'
import axios from 'axios'
import aurinko from '../assets/aurinko.png'
import pilvi from '../assets/pilvi.png'
import pisara from '../assets/pisara.png'
import tuuli from '../assets/tuuli.png'

const DailyWeather = () => {
    const [date, setDate] = useState([])
    const [tempMax, setTempMax] = useState([])
    const [tempMin, setTempMin] = useState([])
    const [tempAvg, setTempAvg] = useState([])
    const [sunnyDay, setSunnyDay] = useState([])
    const [windSpeed, setWindSpeed] = useState([])
    const [rainChance, setRainChance] = useState([])
    
    useEffect(() => {
        const check = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/weather/daily")
                const responseResult = await response.data.daily
                setDate(responseResult.time)
                setTempMax(responseResult.temperature_2m_max)
                setTempMin(responseResult.temperature_2m_min)
                setSunnyDay(responseResult.sunshine_duration)
                setWindSpeed(responseResult.wind_speed_10m_max)
                setRainChance(responseResult.precipitation_probability_max)
            } catch (error) {
                console.log(error)
            }
        }
        check()
        console.log(sunnyDay)
        //temperatureAverage()
    }, [])
    

    // const calculateAverage = (a, b) => {
    //     return Math.ceil((a + b) / 2)
    // }

    // const temperatureAverage = () => {
    //     let arr = []
    //     for (let i = 0; i < 7; i++) {
    //         arr.push(calculateAverage(tempMin[i], tempMax[i]))
    //     }
    //     setTempAvg(arr)
    // }

    return (
        <div className='weatherTable'>
            {date.map((item, index) => {
                return (
                    <div key={item} className='weatherItems'>
                        <h3>{new Date(item).toLocaleDateString('fi-FI', {weekday: 'long'}).slice(0,2).toUpperCase()}</h3>
                        <img className="weather-icon" src={sunnyDay[index] ? aurinko : pilvi }></img>
                        <div className='rain-chance'>
                            <img className="raindrop" src={tuuli}></img>
                            <p>{windSpeed[index]} km/h</p>
                        </div>
                        <div className='rain-chance'>
                            <img className="raindrop" src={pisara}></img>
                            <p>{rainChance[index]} %</p>
                        </div>
                        <p>↑ {Math.round(tempMax[index])}°C</p>
                        <p>↓ {Math.round(tempMin[index])}°C</p>
                    </div>
                )
            })}
        </div>
    )
}

export default DailyWeather
