import  { useEffect, useState } from 'react'
import axios from 'axios'
import aurinko from '../assets/aurinko.png'
import pilvi from '../assets/pilvi.png'
import pisara from '../assets/pisara.png'
import tuuli from '../assets/tuuli.png'

import { TiArrowUpThick } from "react-icons/ti";
import { TiArrowDownThick } from "react-icons/ti";
import { GiWaterDrop } from "react-icons/gi";
import { FiWind } from "react-icons/fi";

const DailyWeather = ({locationData}) => {
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
                let response;
                if (locationData.longitude !== undefined && locationData.latitude !== undefined){
                    response = await axios.get(`http://localhost:3001/api/weather/daily?name=${locationData.name}&longitude=${locationData.longitude}&latitude=${locationData.latitude}`)
                }
                else{
                    response = await axios.get(`http://localhost:3001/api/weather/daily?name=""`)
                }
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
                        <h3 className='pb-2 font-semibold'>{new Date(item).toLocaleDateString('fi-FI', {weekday: 'long'}).slice(0,2).toUpperCase()}</h3>
                        <img className="weather-icon" src={sunnyDay[index] ? aurinko : pilvi }></img>
                        <div className='weatherItems-content'>

                            <div className='rain-chance'>
                                <FiWind size={"1.5rem"}/>
                                <p className='pl-2'>{windSpeed[index]}<small>km/h</small></p>
                            </div>
                            <div className='rain-chance'>
                                <GiWaterDrop size={"1.5rem"} className='text-blue-200'/>
                                <p className='pl-2'>{rainChance[index]}<small>%</small></p>
                            </div>
                            <div className='rain-chance text-red-400'>
                                <TiArrowUpThick size={"1.5rem"}/>
                                <p className='pl-2 font-extrabold '>{Math.round(tempMax[index])} °C</p>
                            </div>
                            <div className='rain-chance text-sky-300'>
                                <TiArrowDownThick size={"1.5rem"}/>
                                <p className='pl-2 font-extrabold text-blue-400'>{Math.round(tempMin[index])} °C</p>
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DailyWeather
