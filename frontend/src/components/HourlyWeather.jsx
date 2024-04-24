import  { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"; 
import {Chart as ChartJS} from "chart.js/auto";

function yScaleSize(array) {
  // Changes the scaling on the precipitation axis depending on the fetched data
  // If the precipitation values are less than 2mm then the min value on the y axis is limited to 2
  // Otherwise y axis is always larger by 1 than the highest precipitation value
  let k = 0;
  array.forEach(i => {
    if(i > k) {
      k = i;
    }
  });
  if (k < 2){
    k = 1
  }
  return (k + 1);
}

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
            // console.log(curWeather.hourly.time);
        } catch (error) {
        console.error('Error fetching hourly weather:', error);
        }
    };
    fetchHourlyWeatherData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    color: "white",
    scales: {
      x: {
        ticks: {
          color: 'white', // Change x-axis font color here
        },
      },
      y: {
        title:{
          color: "white",
          display: true,
          text: "C",
        },
        position: "left",
        ticks: {
          color: 'white', // Change y-axis font color here
        },
      },
      y1: {
        title:{
          color: "white",
          display: true,
          text: "mm",
        },
        position: "right",
        min: 0,
        max: yScaleSize(rain) ?? undefined,
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
      options={chartOptions}     // datasetIdKey='id'
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