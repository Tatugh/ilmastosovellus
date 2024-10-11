import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //even though not used, it is required for the chart to work for unknown reasons

function HourlyWeather({ locationData, port }) {
  const [time, setTime] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [rain, setRain] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  useEffect(() => {
    const fetchHourlyWeatherData = async () => {
      try {
        let response;
        if (
          locationData.longitude !== undefined &&
          locationData.latitude !== undefined
        ) {
          response = await fetch(
            `http://localhost:${port}/api/weather/hourly?name=${locationData.name}&longitude=${locationData.longitude}&latitude=${locationData.latitude}`
          );
        } else {
          response = await fetch(
            `http://localhost:${port}/api/weather/hourly?name=""`
          );
        }
        if (!response.ok) {
          throw new Error("Network response error");
        }
        const curWeather = await response.json();
        const formattedTime = curWeather.hourly.time.map((str) =>
          str.slice(11, str.length)
        );
        setTime(formattedTime);
        setTemperatures(curWeather.hourly.temperature_2m);
        setRain(curWeather.hourly.precipitation);
        setWindSpeed(curWeather.hourly.wind_speed_10m);
      } catch (error) {
        console.error("Error fetching hourly weather:", error);
      }
    };
    fetchHourlyWeatherData();
  }, [locationData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    color: "white",
    scales: {
      x: {
        ticks: {
          color: "white", // Change x-axis font color here
        },
      },
      y: {
        title: {
          color: "white",
          display: true,
          text: "Celsius",
        },
        position: "left",
        ticks: {
          color: "white", // Change y-axis font color here
        },
      },
      y1: {
        title: {
          color: "white",
          display: true,
          text: "mm",
        },
        position: "right",
        ticks: {
          color: "white",
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
      y2: {
        title: {
          color: "white",
          display: true,
          text: "km/h",
        },
        position: "right",
        ticks: {
          color: "white",
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  return (
    <div className="weatherChart">
      <Line
        options={chartOptions} // datasetIdKey='id'
        data={{
          labels: time,
          datasets: [
            {
              id: 1,
              label: "Temperature",
              data: temperatures,
              borderColor: "#ff4726",
              backgroundColor: "#ff4726",
              yAxisID: "y",
            },
            {
              id: 2,
              label: "Precipitation",
              data: rain,
              borderColor: "#34b9f7",
              backgroundColor: "#34b9f7",
              type: "bar",
              yAxisID: "y1",
            },
            {
              id: 3,
              label: "Wind Speed",
              data: windSpeed,
              borderColor: "#DCDCDC",
              backgroundColor: "#DCDCDC",
              type: "line",
              yAxisID: "y2",
            },
          ],
        }}
      />
    </div>
  );
}

export default HourlyWeather;
