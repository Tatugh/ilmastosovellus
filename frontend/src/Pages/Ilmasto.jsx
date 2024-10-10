import { useState, useEffect } from "react";
import LocationDisplay from "../components/Location";
import CurrentWeather from "../components/CurrentWeather";
import HourlyWeather from "../components/HourlyWeather";
import DailyWeather from "../components/DailyWeather";
const Ilmasto = () => {
  const port = 3001; //for api end points
  const [locationData, setLocationData] = useState(() => {
    try {
      const storedData = localStorage.getItem("locationData");
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Error parsing location data:", error);
    }

    // Default value if parsing fails or data is not found in localStorage
    return { name: "Mikkeli" };
  });

  useEffect(() => {
    // Clean out location out of localStorage every 1 hour
    const intervalId = setInterval(() => {
      if (locationData && locationData.expiration < Date.now()) {
        localStorage.removeItem("locationData");
        setLocationData({}); // Clear state as well
      }
    }, 60 * 60 * 1000); // Every 1 hour

    return () => clearInterval(intervalId);
  }, [locationData]);

  const handleLocationChange = (newLocationData) => {
    setLocationData(newLocationData);
  };
  return (
    <div>
      <LocationDisplay onLocationChange={handleLocationChange} port={port} />
      <div className="flex">
        <div className="weather-container w-fit mx-auto px-1 rounded-md ">
          {/* <h2 className=' mb-1'>Current Weather Information</h2>
        <div className='border-1 border-solid border-black w-full'></div> */}
          <CurrentWeather locationData={locationData} port={port} />
        </div>
      </div>
      <div className="content">
        <DailyWeather locationData={locationData} port={port} />
      </div>
      <div className="content">
        <HourlyWeather locationData={locationData} port={port} />
      </div>
    </div>
  );
};

export default Ilmasto;
