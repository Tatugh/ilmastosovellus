const USER_LOCATION = 'https://api.ipregistry.co/?key=d9tj0m8blqg53opj&pretty=true'

//useful for fetching accurate weather data based on user's current geolocation
const fetchUserLatLong = async () =>{
    try {
        //return {latitude: null, longitude: null}; //temporary testing purposes
        const response = await fetch(USER_LOCATION);
        const contentType = response.headers.get("content-type");
        if (!contentType) {
          throw new TypeError("Could not retrieve user location data");
        }
        const jsonData = await response.json();
        const latitude = jsonData["location"].latitude;
        const longitude = jsonData["location"].longitude;

        //console.log(longitude, latitude);
        return {latitude: latitude, longitude: longitude};
      } catch (error) {
        console.error("Error:", error);
      }
}
export {fetchUserLatLong}