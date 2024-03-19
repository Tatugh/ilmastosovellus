import  { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"; 
import {Chart as ChartJS} from "chart.js/auto";

function HourlyWeather() {
    const [time, setTime] = useState([]);
    const [temperatures, setTemperatures] = useState([]);
    const [rain, setRain] = useState([]);

    useEffect(() => {
        const fetchHourlyWeatherData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/weather/hourly');
                if (!response.ok) {
                  throw new Error('Network response error');
                }
                const curWeather = await response.json();
                setTime(curWeather.hourly.time);
                setTemperatures(curWeather.hourly.temperature_2m);
                setRain(curWeather.hourly.precipitation);
                console.log(curWeather.hourly);
            } catch (error) {
            console.error('Error fetching hourly weather:', error);
            }
        };
        fetchHourlyWeatherData();
    }, []);

    const chartOptions = {
        color: "white",
      
        scales: {
        x: {
          ticks: {
            color: 'white', // Change x-axis font color here
          },
        },
        y: {
          ticks: {
            color: 'white', // Change y-axis font color here
          },
        },
      },
    }

    return <div className = "weatherChart">
        <Line 
            options={chartOptions}
            // datasetIdKey='id'
            data={{
                labels: time,
                datasets: [
                { 
                    id: 1,
                    label: 'Temperature',
                    data: temperatures,
                    borderColor: 'red',
                    backgroundColor: 'red',
                },
                { 
                    id: 2,
                    label: 'Precipitation',
                    data: rain,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                }
                ],
            }
            }
        />
    </div>
}

export default HourlyWeather;