import  { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"; 
// import {Chart as ChartJS} from "chart.js/auto";

const HourlyWeather = () => {
    const [weather, setWeather] = useState([]);
    useEffect(() => {
        const fetchHourlyWeatherData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/weather/hourly');
                if (!response.ok) {
                  throw new Error('Network response error');
                }
                const curWeather = await response.json();
                setWeather(curWeather.hourly)
            } catch (error) {
            console.error('Error fetching hourly weather:', error);
            }
        };
        fetchHourlyWeatherData();
    }, []);

    // Attempting to map the JSON data, does not work.
    const [chartData, setChartData] = useState({
        labels: weather.map((data) => data.time),
        datasets: [
            {
                label: "Temperature",
                data: weather.map((data) => data.temperature_2m),
                backgroundColor: "red",
                borderColor: "red",
                borderWidth: 1,
            },
        ]
    })

    return <div className = "weatherChart" style={{ width: 1000}}>
        <Line data={chartData}/>
    </div>
}

export default HourlyWeather;