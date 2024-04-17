import { useState, useEffect } from 'react';
import LocationDisplay from './location';
import CurrentWeather from '../apis/WeatherAPIHelper';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';

const ParentComponent = () => {

  const [locationData, setLocationData] = useState(() => {
    try {
      const storedData = localStorage.getItem("locationData");
      if (storedData) {
        console.log(typeof(storedData))
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
      <LocationDisplay locationData={locationData} onLocationChange={handleLocationChange} />
    <div className='flex'>
        <div className='weather-container w-fit mx-auto px-1 rounded-md '>
        {/* <h2 className=' mb-1'>Current Weather Information</h2>
        <div className='border-1 border-solid border-black w-full'></div> */}
        <CurrentWeather locationData={locationData} />
        </div>
    </div>
    <div className="content">
          <DailyWeather locationData={locationData}/>
        </div>
        <div className="content">
          <HourlyWeather locationData={locationData}/>
        </div>
    </div>
  );
};

export default ParentComponent;
