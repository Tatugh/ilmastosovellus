import { nodeCache } from "../src/deps.js";
import { pathFinal } from "../utils/utils.js";

export const cache = new nodeCache({ stdTTl: 60 * 15 });

const verifyCache = async (req, res, next) => {
  try {
    const pathId = pathFinal(req.path) + req.query.name;

    if (cache.get(pathId) !== undefined) {
      const data = await cache.get(pathId);
      return res.send(data);
    }

    return next();
  } catch (error) {
    res.send({ error: error });
  }
};

export default verifyCache;
