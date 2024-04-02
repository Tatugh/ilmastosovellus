import  { useEffect, useState } from 'react'
import axios from 'axios'
import aurinko from '../assets/aurinko.png'
import pilvi from '../assets/pilvi.png'

const DailyWeather = () => {
    const [date, setDate] = useState([])
    const [tempMax, setTempMax] = useState([])
    const [tempMin, setTempMin] = useState([])
    const [tempAvg, setTempAvg] = useState([])
    const [sunnyDay, setSunnyDay] = useState([])    
    
    useEffect(() => {
        const check = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/weather/daily")
                const responseResult = await response.data.daily
                setDate(responseResult.time)
                setTempMax(responseResult.temperature_2m_max)
                setTempMin(responseResult.temperature_2m_min)
                setSunnyDay(responseResult.sunshine_duration)
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
                        <img className="max" src={sunnyDay[index] ? aurinko : pilvi }></img>
                        <p>{Math.round(tempMin[index])} | {Math.round(tempMax[index])}°C</p>
                    </div>
                )
            })}
        </div>
    )
}

export default DailyWeather
