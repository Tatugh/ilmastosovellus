import { nodeCache } from "../src/deps.js";
export const cache = new nodeCache({ stdTTl: 60 * 15 });

//checks if cached weather data exists already, and returns it
const verifyCache = async (req, res, next) => {
  try {
    //weather type key can be Current/Hourly/Daily
    const weatherType = req.query.weatherType;
    if (
      cache.get(weatherType) !== undefined &&
      cache.get(weatherType) === weatherType
    ) {
      const data = await cache.get(weatherType);
      return res.send(data);
    }

    return next();
  } catch (error) {
    res.send({ error: error });
  }
};

export default verifyCache;
