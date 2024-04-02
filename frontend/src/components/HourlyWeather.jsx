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
                const formattedTime = curWeather.hourly.time.map(str => str.slice(11, str.length));
                setTime(formattedTime);
                setTemperatures(curWeather.hourly.temperature_2m);
                setRain(curWeather.hourly.precipitation);
                console.log(curWeather.hourly.time);
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
          position: "left",
          ticks: {
            color: 'white', // Change y-axis font color here
          },
        },
        y1: {
          position: "right",
          ticks: {
            color: 'white', 
          },
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    }  

    return <div className = "weatherChart">
      <Line 
        options={chartOptions} width={"fit-content"} height={"fit-content"}      // datasetIdKey='id'
        data={{
          labels: time,
          datasets: [
          { 
            id: 1,
            label: 'Temperature',
            data: temperatures,
            borderColor: '#ff4726',
            backgroundColor: '#ff4726',
            yAxisID: 'y',
          },
          { 
            id: 2,
            label: 'Precipitation',
            data: rain,
            borderColor: '#34b9f7',
            backgroundColor: '#34b9f7',
            type: "bar",
            yAxisID: 'y1',
          }
          ],
        }
        }
      />
    </div>
}

export default HourlyWeather;